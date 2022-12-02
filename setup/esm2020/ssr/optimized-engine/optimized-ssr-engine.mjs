/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'fs';
import { getRequestUrl } from '../util/request-url';
import { RenderingCache } from './rendering-cache';
import { RenderingStrategy, } from './ssr-optimization-options';
/**
 * Returns the full url for the given SSR Request.
 */
export const getDefaultRenderKey = getRequestUrl;
/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
export class OptimizedSsrEngine {
    constructor(expressEngine, ssrOptions) {
        this.expressEngine = expressEngine;
        this.ssrOptions = ssrOptions;
        this.currentConcurrency = 0;
        this.renderingCache = new RenderingCache(this.ssrOptions);
        this.templateCache = new Map();
        /**
         * When the config `reuseCurrentRendering` is enabled, we want perform
         * only one render for one rendering key and reuse the html result
         * for all the pending requests for the same rendering key.
         * Therefore we need to store the callbacks for all the pending requests
         * and invoke them with the html after the render completes.
         *
         * This Map should be used only when `reuseCurrentRendering` config is enabled.
         * It's indexed by the rendering keys.
         */
        this.renderCallbacks = new Map();
    }
    get engineInstance() {
        return this.renderResponse.bind(this);
    }
    /**
     * When SSR page can not be returned in time, we're returning index.html of
     * the CSR application.
     * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
     */
    fallbackToCsr(response, filePath, callback) {
        response.set('Cache-Control', 'no-store');
        callback(undefined, this.getDocument(filePath));
    }
    getRenderingKey(request) {
        return this.ssrOptions?.renderKeyResolver
            ? this.ssrOptions.renderKeyResolver(request)
            : getDefaultRenderKey(request);
    }
    getRenderingStrategy(request) {
        return this.ssrOptions?.renderingStrategyResolver
            ? this.ssrOptions.renderingStrategyResolver(request)
            : RenderingStrategy.DEFAULT;
    }
    /**
     * When returns true, the server side rendering should be performed.
     * When returns false, the CSR fallback should be returned.
     *
     * We should not render, when there is already
     * a pending rendering for the same rendering key
     * (unless the `reuseCurrentRendering` config option is enabled)
     * OR when the concurrency limit is exceeded.
     */
    shouldRender(request) {
        const renderingKey = this.getRenderingKey(request);
        const concurrencyLimitExceeded = this.isConcurrencyLimitExceeded(renderingKey);
        const fallBack = this.renderingCache.isRendering(renderingKey) &&
            !this.ssrOptions?.reuseCurrentRendering;
        if (fallBack) {
            this.log(`CSR fallback: rendering in progress (${request?.originalUrl})`);
        }
        else if (concurrencyLimitExceeded) {
            this.log(`CSR fallback: Concurrency limit exceeded (${this.ssrOptions?.concurrency})`);
        }
        return ((!fallBack &&
            !concurrencyLimitExceeded &&
            this.getRenderingStrategy(request) !== RenderingStrategy.ALWAYS_CSR) ||
            this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR);
    }
    /**
     * Checks for the concurrency limit
     *
     * @returns true if rendering this request would exceed the concurrency limit
     */
    isConcurrencyLimitExceeded(renderingKey) {
        // If we can reuse a pending render for this request, we don't take up a new concurrency slot.
        // In that case we don't exceed the concurrency limit even if the `currentConcurrency`
        // already reaches the limit.
        if (this.ssrOptions?.reuseCurrentRendering &&
            this.renderingCache.isRendering(renderingKey)) {
            return false;
        }
        return this.ssrOptions?.concurrency
            ? this.currentConcurrency >= this.ssrOptions.concurrency
            : false;
    }
    /**
     * Returns true, when the `timeout` option has been configured to non-zero value OR
     * when the rendering strategy for the given request is ALWAYS_SSR.
     * Otherwise, it returns false.
     */
    shouldTimeout(request) {
        return (!!this.ssrOptions?.timeout ||
            this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR);
    }
    /**
     * Returns the timeout value.
     *
     * In case of the rendering strategy ALWAYS_SSR, it returns the config `forcedSsrTimeout`.
     * Otherwise, it returns the config `timeout`.
     */
    getTimeout(request) {
        return this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
            ? this.ssrOptions?.forcedSsrTimeout ?? 60000
            : this.ssrOptions?.timeout ?? 0;
    }
    /**
     * If there is an available cached response for this rendering key,
     * it invokes the given render callback with the response and returns true.
     *
     * Otherwise, it returns false.
     */
    returnCachedRender(request, callback) {
        const key = this.getRenderingKey(request);
        if (this.renderingCache.isReady(key)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const cached = this.renderingCache.get(key);
            callback(cached.err, cached.html);
            if (!this.ssrOptions?.cache) {
                // we drop cached rendering if caching is disabled
                this.renderingCache.clear(key);
            }
            return true;
        }
        return false;
    }
    /**
     * Handles the request and invokes the given `callback` with the result html / error.
     *
     * The result might be ether:
     * - a CSR fallback with a basic `index.html` content
     * - a result rendered by the original Angular Universal express engine
     * - a result from the in-memory cache (which was previously rendered by Angular Universal express engine).
     */
    renderResponse(filePath, options, callback) {
        const request = options.req;
        const response = options.res || options.req.res;
        if (this.returnCachedRender(request, callback)) {
            this.log(`Render from cache (${request?.originalUrl})`);
            return;
        }
        if (!this.shouldRender(request)) {
            this.fallbackToCsr(response, filePath, callback);
            return;
        }
        let requestTimeout;
        if (this.shouldTimeout(request)) {
            // establish timeout for rendering
            const timeout = this.getTimeout(request);
            requestTimeout = setTimeout(() => {
                requestTimeout = undefined;
                this.fallbackToCsr(response, filePath, callback);
                this.log(`SSR rendering exceeded timeout ${timeout}, fallbacking to CSR for ${request?.originalUrl}`, false);
            }, timeout);
        }
        else {
            // Here we respond with the fallback to CSR, but we don't `return`.
            // We let the actual rendering task to happen in the background
            // to eventually store the rendered result in the cache.
            this.fallbackToCsr(response, filePath, callback);
        }
        const renderingKey = this.getRenderingKey(request);
        const renderCallback = (err, html) => {
            if (requestTimeout) {
                // if request is still waiting for render, return it
                clearTimeout(requestTimeout);
                callback(err, html);
                this.log(`Request is resolved with the SSR rendering result (${request?.originalUrl})`);
                // store the render only if caching is enabled
                if (this.ssrOptions?.cache) {
                    this.renderingCache.store(renderingKey, err, html);
                }
                else {
                    this.renderingCache.clear(renderingKey);
                }
            }
            else {
                // store the render for future use
                this.renderingCache.store(renderingKey, err, html);
            }
        };
        this.handleRender({
            filePath,
            options,
            renderCallback,
            request,
        });
    }
    log(message, debug = true) {
        if (!debug || this.ssrOptions?.debug) {
            console.log(message);
        }
    }
    /** Retrieve the document from the cache or the filesystem */
    getDocument(filePath) {
        let doc = this.templateCache.get(filePath);
        if (!doc) {
            // fs.readFileSync could be missing in a browser, specifically
            // in a unit tests with { node: { fs: 'empty' } } webpack configuration
            doc = fs?.readFileSync ? fs.readFileSync(filePath, 'utf-8') : '';
            this.templateCache.set(filePath, doc);
        }
        return doc;
    }
    /**
     * Delegates the render to the original _Angular Universal express engine_.
     *
     * In case when the config `reuseCurrentRendering` is enabled and **if there is already a pending
     * render task for the same rendering key**, it doesn't delegate a new render to Angular Universal.
     * Instead, it waits for the current rendering to complete and then reuse the result for all waiting requests.
     */
    handleRender({ filePath, options, renderCallback, request, }) {
        if (!this.ssrOptions?.reuseCurrentRendering) {
            this.startRender({
                filePath,
                options,
                renderCallback,
                request,
            });
            return;
        }
        const renderingKey = this.getRenderingKey(request);
        if (!this.renderCallbacks.has(renderingKey)) {
            this.renderCallbacks.set(renderingKey, []);
        }
        this.renderCallbacks.get(renderingKey)?.push(renderCallback);
        if (!this.renderingCache.isRendering(renderingKey)) {
            this.startRender({
                filePath,
                options,
                request,
                renderCallback: (err, html) => {
                    // Share the result of the render with all awaiting requests for the same key:
                    // Note: we access the Map at the moment of the render finished (don't store value in a local variable),
                    //       because in the meantime something might have deleted the value (i.e. when `maxRenderTime` passed).
                    this.renderCallbacks
                        .get(renderingKey)
                        ?.forEach((cb) => cb(err, html)); // pass the shared result to all waiting rendering callbacks
                    this.renderCallbacks.delete(renderingKey);
                },
            });
        }
        this.log(`Request is waiting for the SSR rendering to complete (${request?.originalUrl})`);
    }
    /**
     * Delegates the render to the original _Angular Universal express engine_.
     *
     * There is no way to abort the running render of Angular Universal.
     * So if the render doesn't complete in the configured `maxRenderTime`,
     * we just consider the render task as hanging (note: it's a potential memory leak!).
     * Later on, even if the render completes somewhen in the future, we will ignore
     * its result.
     */
    startRender({ filePath, options, renderCallback, request, }) {
        const renderingKey = this.getRenderingKey(request);
        // Setting the timeout for hanging renders that might not ever finish due to various reasons.
        // After the configured `maxRenderTime` passes, we consider the rendering task as hanging,
        // and release the concurrency slot and forget all callbacks waiting for the render's result.
        let maxRenderTimeout = setTimeout(() => {
            this.renderingCache.clear(renderingKey);
            maxRenderTimeout = undefined;
            this.currentConcurrency--;
            if (this.ssrOptions?.reuseCurrentRendering) {
                this.renderCallbacks.delete(renderingKey);
            }
            this.log(`Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`, false);
        }, this.ssrOptions?.maxRenderTime ?? 300000); // 300000ms == 5 minutes
        this.log(`Rendering started (${request?.originalUrl})`);
        this.renderingCache.setAsRendering(renderingKey);
        this.currentConcurrency++;
        this.expressEngine(filePath, options, (err, html) => {
            if (!maxRenderTimeout) {
                // ignore this render's result because it exceeded maxRenderTimeout
                this.log(`Rendering of ${request.originalUrl} completed after the specified maxRenderTime, therefore it was ignored.`, false);
                return;
            }
            clearTimeout(maxRenderTimeout);
            this.log(`Rendering completed (${request?.originalUrl})`);
            this.currentConcurrency--;
            renderCallback(err, html);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW1pemVkLXNzci1lbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlLWxpYnMvc2V0dXAvc3NyL29wdGltaXplZC1lbmdpbmUvb3B0aW1pemVkLXNzci1lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUNMLGlCQUFpQixHQUVsQixNQUFNLDRCQUE0QixDQUFDO0FBRXBDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsYUFBYSxDQUFDO0FBYWpEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFxQjdCLFlBQ1ksYUFBc0MsRUFDdEMsVUFBbUM7UUFEbkMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBQ3RDLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBdEJyQyx1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUVsRDs7Ozs7Ozs7O1dBU0c7UUFDSyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0lBUzFELENBQUM7SUFQSixJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBT0Q7Ozs7T0FJRztJQUNPLGFBQWEsQ0FDckIsUUFBa0IsRUFDbEIsUUFBZ0IsRUFDaEIsUUFBdUI7UUFFdkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFB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LE9BQU87YUFDUjtZQUNELFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLE9BQU8sRUFBRSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRTFCLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG4vKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgTmdFeHByZXNzRW5naW5lSW5zdGFuY2UgfSBmcm9tICcuLi9lbmdpbmUtZGVjb3JhdG9yL25nLWV4cHJlc3MtZW5naW5lLWRlY29yYXRvcic7XG5pbXBvcnQgeyBnZXRSZXF1ZXN0VXJsIH0gZnJvbSAnLi4vdXRpbC9yZXF1ZXN0LXVybCc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDYWNoZSB9IGZyb20gJy4vcmVuZGVyaW5nLWNhY2hlJztcbmltcG9ydCB7XG4gIFJlbmRlcmluZ1N0cmF0ZWd5LFxuICBTc3JPcHRpbWl6YXRpb25PcHRpb25zLFxufSBmcm9tICcuL3Nzci1vcHRpbWl6YXRpb24tb3B0aW9ucyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZnVsbCB1cmwgZm9yIHRoZSBnaXZlbiBTU1IgUmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRSZW5kZXJLZXkgPSBnZXRSZXF1ZXN0VXJsO1xuXG5leHBvcnQgdHlwZSBTc3JDYWxsYmFja0ZuID0gKFxuICAvKipcbiAgICogRXJyb3IgdGhhdCBtaWdodCd2ZSBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcuXG4gICAqL1xuICBlcnI/OiBFcnJvciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIC8qKlxuICAgKiBIVE1MIHJlc3BvbnNlLlxuICAgKi9cbiAgaHRtbD86IHN0cmluZyB8IHVuZGVmaW5lZFxuKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRoZSByZW5kZXJlZCBwYWdlcyBhcmUga2VwdCBpbiBtZW1vcnkgdG8gYmUgc2VydmVkIG9uIG5leHQgcmVxdWVzdC4gSWYgdGhlIGBjYWNoZWAgaXMgc2V0IHRvIGBmYWxzZWAsIHRoZVxuICogcmVzcG9uc2UgaXMgZXZpY3RlZCBhcyBzb29uIGFzIHRoZSBmaXJzdCBzdWNjZXNzZnVsIHJlc3BvbnNlIGlzIHN1Y2Nlc3NmdWxseSByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE9wdGltaXplZFNzckVuZ2luZSB7XG4gIHByb3RlY3RlZCBjdXJyZW50Q29uY3VycmVuY3kgPSAwO1xuICBwcm90ZWN0ZWQgcmVuZGVyaW5nQ2FjaGUgPSBuZXcgUmVuZGVyaW5nQ2FjaGUodGhpcy5zc3JPcHRpb25zKTtcbiAgcHJpdmF0ZSB0ZW1wbGF0ZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICAvKipcbiAgICogV2hlbiB0aGUgY29uZmlnIGByZXVzZUN1cnJlbnRSZW5kZXJpbmdgIGlzIGVuYWJsZWQsIHdlIHdhbnQgcGVyZm9ybVxuICAgKiBvbmx5IG9uZSByZW5kZXIgZm9yIG9uZSByZW5kZXJpbmcga2V5IGFuZCByZXVzZSB0aGUgaHRtbCByZXN1bHRcbiAgICogZm9yIGFsbCB0aGUgcGVuZGluZyByZXF1ZXN0cyBmb3IgdGhlIHNhbWUgcmVuZGVyaW5nIGtleS5cbiAgICogVGhlcmVmb3JlIHdlIG5lZWQgdG8gc3RvcmUgdGhlIGNhbGxiYWNrcyBmb3IgYWxsIHRoZSBwZW5kaW5nIHJlcXVlc3RzXG4gICAqIGFuZCBpbnZva2UgdGhlbSB3aXRoIHRoZSBodG1sIGFmdGVyIHRoZSByZW5kZXIgY29tcGxldGVzLlxuICAgKlxuICAgKiBUaGlzIE1hcCBzaG91bGQgYmUgdXNlZCBvbmx5IHdoZW4gYHJldXNlQ3VycmVudFJlbmRlcmluZ2AgY29uZmlnIGlzIGVuYWJsZWQuXG4gICAqIEl0J3MgaW5kZXhlZCBieSB0aGUgcmVuZGVyaW5nIGtleXMuXG4gICAqL1xuICBwcml2YXRlIHJlbmRlckNhbGxiYWNrcyA9IG5ldyBNYXA8c3RyaW5nLCBTc3JDYWxsYmFja0ZuW10+KCk7XG5cbiAgZ2V0IGVuZ2luZUluc3RhbmNlKCk6IE5nRXhwcmVzc0VuZ2luZUluc3RhbmNlIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJSZXNwb25zZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGV4cHJlc3NFbmdpbmU6IE5nRXhwcmVzc0VuZ2luZUluc3RhbmNlLFxuICAgIHByb3RlY3RlZCBzc3JPcHRpb25zPzogU3NyT3B0aW1pemF0aW9uT3B0aW9uc1xuICApIHt9XG5cbiAgLyoqXG4gICAqIFdoZW4gU1NSIHBhZ2UgY2FuIG5vdCBiZSByZXR1cm5lZCBpbiB0aW1lLCB3ZSdyZSByZXR1cm5pbmcgaW5kZXguaHRtbCBvZlxuICAgKiB0aGUgQ1NSIGFwcGxpY2F0aW9uLlxuICAgKiBUaGUgQ1NSIGFwcGxpY2F0aW9uIGlzIHJldHVybmVkIHdpdGggdGhlIFwiQ2FjaGUtQ29udHJvbDogbm8tc3RvcmVcIiByZXNwb25zZS1oZWFkZXIuIFRoaXMgbm90aWZpZXMgZXh0ZXJuYWwgY2FjaGUgc3lzdGVtcyB0byBub3QgdXNlIHRoZSBDU1IgYXBwbGljYXRpb24gZm9yIHRoZSBzdWJzZXF1ZW50IHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgZmFsbGJhY2tUb0NzcihcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXG4gICAgZmlsZVBhdGg6IHN0cmluZyxcbiAgICBjYWxsYmFjazogU3NyQ2FsbGJhY2tGblxuICApOiB2b2lkIHtcbiAgICByZXNwb25zZS5zZXQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBjYWxsYmFjayh1bmRlZmluZWQsIHRoaXMuZ2V0RG9jdW1lbnQoZmlsZVBhdGgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSZW5kZXJpbmdLZXkocmVxdWVzdDogUmVxdWVzdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3NyT3B0aW9ucz8ucmVuZGVyS2V5UmVzb2x2ZXJcbiAgICAgID8gdGhpcy5zc3JPcHRpb25zLnJlbmRlcktleVJlc29sdmVyKHJlcXVlc3QpXG4gICAgICA6IGdldERlZmF1bHRSZW5kZXJLZXkocmVxdWVzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UmVuZGVyaW5nU3RyYXRlZ3kocmVxdWVzdDogUmVxdWVzdCk6IFJlbmRlcmluZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5zc3JPcHRpb25zPy5yZW5kZXJpbmdTdHJhdGVneVJlc29sdmVyXG4gICAgICA/IHRoaXMuc3NyT3B0aW9ucy5yZW5kZXJpbmdTdHJhdGVneVJlc29sdmVyKHJlcXVlc3QpXG4gICAgICA6IFJlbmRlcmluZ1N0cmF0ZWd5LkRFRkFVTFQ7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiByZXR1cm5zIHRydWUsIHRoZSBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgc2hvdWxkIGJlIHBlcmZvcm1lZC5cbiAgICogV2hlbiByZXR1cm5zIGZhbHNlLCB0aGUgQ1NSIGZhbGxiYWNrIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICpcbiAgICogV2Ugc2hvdWxkIG5vdCByZW5kZXIsIHdoZW4gdGhlcmUgaXMgYWxyZWFkeVxuICAgKiBhIHBlbmRpbmcgcmVuZGVyaW5nIGZvciB0aGUgc2FtZSByZW5kZXJpbmcga2V5XG4gICAqICh1bmxlc3MgdGhlIGByZXVzZUN1cnJlbnRSZW5kZXJpbmdgIGNvbmZpZyBvcHRpb24gaXMgZW5hYmxlZClcbiAgICogT1Igd2hlbiB0aGUgY29uY3VycmVuY3kgbGltaXQgaXMgZXhjZWVkZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgc2hvdWxkUmVuZGVyKHJlcXVlc3Q6IFJlcXVlc3QpOiBib29sZWFuIHtcbiAgICBjb25zdCByZW5kZXJpbmdLZXkgPSB0aGlzLmdldFJlbmRlcmluZ0tleShyZXF1ZXN0KTtcbiAgICBjb25zdCBjb25jdXJyZW5jeUxpbWl0RXhjZWVkZWQgPVxuICAgICAgdGhpcy5pc0NvbmN1cnJlbmN5TGltaXRFeGNlZWRlZChyZW5kZXJpbmdLZXkpO1xuICAgIGNvbnN0IGZhbGxCYWNrID1cbiAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuaXNSZW5kZXJpbmcocmVuZGVyaW5nS2V5KSAmJlxuICAgICAgIXRoaXMuc3NyT3B0aW9ucz8ucmV1c2VDdXJyZW50UmVuZGVyaW5nO1xuXG4gICAgaWYgKGZhbGxCYWNrKSB7XG4gICAgICB0aGlzLmxvZyhgQ1NSIGZhbGxiYWNrOiByZW5kZXJpbmcgaW4gcHJvZ3Jlc3MgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWApO1xuICAgIH0gZWxzZSBpZiAoY29uY3VycmVuY3lMaW1pdEV4Y2VlZGVkKSB7XG4gICAgICB0aGlzLmxvZyhcbiAgICAgICAgYENTUiBmYWxsYmFjazogQ29uY3VycmVuY3kgbGltaXQgZXhjZWVkZWQgKCR7dGhpcy5zc3JPcHRpb25zPy5jb25jdXJyZW5jeX0pYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgKCFmYWxsQmFjayAmJlxuICAgICAgICAhY29uY3VycmVuY3lMaW1pdEV4Y2VlZGVkICYmXG4gICAgICAgIHRoaXMuZ2V0UmVuZGVyaW5nU3RyYXRlZ3kocmVxdWVzdCkgIT09IFJlbmRlcmluZ1N0cmF0ZWd5LkFMV0FZU19DU1IpIHx8XG4gICAgICB0aGlzLmdldFJlbmRlcmluZ1N0cmF0ZWd5KHJlcXVlc3QpID09PSBSZW5kZXJpbmdTdHJhdGVneS5BTFdBWVNfU1NSXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgZm9yIHRoZSBjb25jdXJyZW5jeSBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHJlbmRlcmluZyB0aGlzIHJlcXVlc3Qgd291bGQgZXhjZWVkIHRoZSBjb25jdXJyZW5jeSBsaW1pdFxuICAgKi9cbiAgcHJpdmF0ZSBpc0NvbmN1cnJlbmN5TGltaXRFeGNlZWRlZChyZW5kZXJpbmdLZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIElmIHdlIGNhbiByZXVzZSBhIHBlbmRpbmcgcmVuZGVyIGZvciB0aGlzIHJlcXVlc3QsIHdlIGRvbid0IHRha2UgdXAgYSBuZXcgY29uY3VycmVuY3kgc2xvdC5cbiAgICAvLyBJbiB0aGF0IGNhc2Ugd2UgZG9uJ3QgZXhjZWVkIHRoZSBjb25jdXJyZW5jeSBsaW1pdCBldmVuIGlmIHRoZSBgY3VycmVudENvbmN1cnJlbmN5YFxuICAgIC8vIGFscmVhZHkgcmVhY2hlcyB0aGUgbGltaXQuXG4gICAgaWYgKFxuICAgICAgdGhpcy5zc3JPcHRpb25zPy5yZXVzZUN1cnJlbnRSZW5kZXJpbmcgJiZcbiAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuaXNSZW5kZXJpbmcocmVuZGVyaW5nS2V5KVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNzck9wdGlvbnM/LmNvbmN1cnJlbmN5XG4gICAgICA/IHRoaXMuY3VycmVudENvbmN1cnJlbmN5ID49IHRoaXMuc3NyT3B0aW9ucy5jb25jdXJyZW5jeVxuICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUsIHdoZW4gdGhlIGB0aW1lb3V0YCBvcHRpb24gaGFzIGJlZW4gY29uZmlndXJlZCB0byBub24temVybyB2YWx1ZSBPUlxuICAgKiB3aGVuIHRoZSByZW5kZXJpbmcgc3RyYXRlZ3kgZm9yIHRoZSBnaXZlbiByZXF1ZXN0IGlzIEFMV0FZU19TU1IuXG4gICAqIE90aGVyd2lzZSwgaXQgcmV0dXJucyBmYWxzZS5cbiAgICovXG4gIHByb3RlY3RlZCBzaG91bGRUaW1lb3V0KHJlcXVlc3Q6IFJlcXVlc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISF0aGlzLnNzck9wdGlvbnM/LnRpbWVvdXQgfHxcbiAgICAgIHRoaXMuZ2V0UmVuZGVyaW5nU3RyYXRlZ3kocmVxdWVzdCkgPT09IFJlbmRlcmluZ1N0cmF0ZWd5LkFMV0FZU19TU1JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRpbWVvdXQgdmFsdWUuXG4gICAqXG4gICAqIEluIGNhc2Ugb2YgdGhlIHJlbmRlcmluZyBzdHJhdGVneSBBTFdBWVNfU1NSLCBpdCByZXR1cm5zIHRoZSBjb25maWcgYGZvcmNlZFNzclRpbWVvdXRgLlxuICAgKiBPdGhlcndpc2UsIGl0IHJldHVybnMgdGhlIGNvbmZpZyBgdGltZW91dGAuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0VGltZW91dChyZXF1ZXN0OiBSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSZW5kZXJpbmdTdHJhdGVneShyZXF1ZXN0KSA9PT0gUmVuZGVyaW5nU3RyYXRlZ3kuQUxXQVlTX1NTUlxuICAgICAgPyB0aGlzLnNzck9wdGlvbnM/LmZvcmNlZFNzclRpbWVvdXQgPz8gNjAwMDBcbiAgICAgIDogdGhpcy5zc3JPcHRpb25zPy50aW1lb3V0ID8/IDA7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlcmUgaXMgYW4gYXZhaWxhYmxlIGNhY2hlZCByZXNwb25zZSBmb3IgdGhpcyByZW5kZXJpbmcga2V5LFxuICAgKiBpdCBpbnZva2VzIHRoZSBnaXZlbiByZW5kZXIgY2FsbGJhY2sgd2l0aCB0aGUgcmVzcG9uc2UgYW5kIHJldHVybnMgdHJ1ZS5cbiAgICpcbiAgICogT3RoZXJ3aXNlLCBpdCByZXR1cm5zIGZhbHNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJldHVybkNhY2hlZFJlbmRlcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGNhbGxiYWNrOiBTc3JDYWxsYmFja0ZuXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0UmVuZGVyaW5nS2V5KHJlcXVlc3QpO1xuXG4gICAgaWYgKHRoaXMucmVuZGVyaW5nQ2FjaGUuaXNSZWFkeShrZXkpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgY29uc3QgY2FjaGVkID0gdGhpcy5yZW5kZXJpbmdDYWNoZS5nZXQoa2V5KSE7XG4gICAgICBjYWxsYmFjayhjYWNoZWQuZXJyLCBjYWNoZWQuaHRtbCk7XG5cbiAgICAgIGlmICghdGhpcy5zc3JPcHRpb25zPy5jYWNoZSkge1xuICAgICAgICAvLyB3ZSBkcm9wIGNhY2hlZCByZW5kZXJpbmcgaWYgY2FjaGluZyBpcyBkaXNhYmxlZFxuICAgICAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLmNsZWFyKGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHJlcXVlc3QgYW5kIGludm9rZXMgdGhlIGdpdmVuIGBjYWxsYmFja2Agd2l0aCB0aGUgcmVzdWx0IGh0bWwgLyBlcnJvci5cbiAgICpcbiAgICogVGhlIHJlc3VsdCBtaWdodCBiZSBldGhlcjpcbiAgICogLSBhIENTUiBmYWxsYmFjayB3aXRoIGEgYmFzaWMgYGluZGV4Lmh0bWxgIGNvbnRlbnRcbiAgICogLSBhIHJlc3VsdCByZW5kZXJlZCBieSB0aGUgb3JpZ2luYWwgQW5ndWxhciBVbml2ZXJzYWwgZXhwcmVzcyBlbmdpbmVcbiAgICogLSBhIHJlc3VsdCBmcm9tIHRoZSBpbi1tZW1vcnkgY2FjaGUgKHdoaWNoIHdhcyBwcmV2aW91c2x5IHJlbmRlcmVkIGJ5IEFuZ3VsYXIgVW5pdmVyc2FsIGV4cHJlc3MgZW5naW5lKS5cbiAgICovXG4gIHByb3RlY3RlZCByZW5kZXJSZXNwb25zZShcbiAgICBmaWxlUGF0aDogc3RyaW5nLFxuICAgIG9wdGlvbnM6IGFueSxcbiAgICBjYWxsYmFjazogU3NyQ2FsbGJhY2tGblxuICApOiB2b2lkIHtcbiAgICBjb25zdCByZXF1ZXN0OiBSZXF1ZXN0ID0gb3B0aW9ucy5yZXE7XG4gICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gb3B0aW9ucy5yZXMgfHwgb3B0aW9ucy5yZXEucmVzO1xuXG4gICAgaWYgKHRoaXMucmV0dXJuQ2FjaGVkUmVuZGVyKHJlcXVlc3QsIGNhbGxiYWNrKSkge1xuICAgICAgdGhpcy5sb2coYFJlbmRlciBmcm9tIGNhY2hlICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcihyZXF1ZXN0KSkge1xuICAgICAgdGhpcy5mYWxsYmFja1RvQ3NyKHJlc3BvbnNlLCBmaWxlUGF0aCwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0VGltZW91dDogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuc2hvdWxkVGltZW91dChyZXF1ZXN0KSkge1xuICAgICAgLy8gZXN0YWJsaXNoIHRpbWVvdXQgZm9yIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dChyZXF1ZXN0KTtcbiAgICAgIHJlcXVlc3RUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlcXVlc3RUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZhbGxiYWNrVG9Dc3IocmVzcG9uc2UsIGZpbGVQYXRoLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgIGBTU1IgcmVuZGVyaW5nIGV4Y2VlZGVkIHRpbWVvdXQgJHt0aW1lb3V0fSwgZmFsbGJhY2tpbmcgdG8gQ1NSIGZvciAke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfWAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIZXJlIHdlIHJlc3BvbmQgd2l0aCB0aGUgZmFsbGJhY2sgdG8gQ1NSLCBidXQgd2UgZG9uJ3QgYHJldHVybmAuXG4gICAgICAvLyBXZSBsZXQgdGhlIGFjdHVhbCByZW5kZXJpbmcgdGFzayB0byBoYXBwZW4gaW4gdGhlIGJhY2tncm91bmRcbiAgICAgIC8vIHRvIGV2ZW50dWFsbHkgc3RvcmUgdGhlIHJlbmRlcmVkIHJlc3VsdCBpbiB0aGUgY2FjaGUuXG4gICAgICB0aGlzLmZhbGxiYWNrVG9Dc3IocmVzcG9uc2UsIGZpbGVQYXRoLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyaW5nS2V5ID0gdGhpcy5nZXRSZW5kZXJpbmdLZXkocmVxdWVzdCk7XG4gICAgY29uc3QgcmVuZGVyQ2FsbGJhY2s6IFNzckNhbGxiYWNrRm4gPSAoZXJyLCBodG1sKTogdm9pZCA9PiB7XG4gICAgICBpZiAocmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgLy8gaWYgcmVxdWVzdCBpcyBzdGlsbCB3YWl0aW5nIGZvciByZW5kZXIsIHJldHVybiBpdFxuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVvdXQpO1xuICAgICAgICBjYWxsYmFjayhlcnIsIGh0bWwpO1xuXG4gICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgIGBSZXF1ZXN0IGlzIHJlc29sdmVkIHdpdGggdGhlIFNTUiByZW5kZXJpbmcgcmVzdWx0ICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbmRlciBvbmx5IGlmIGNhY2hpbmcgaXMgZW5hYmxlZFxuICAgICAgICBpZiAodGhpcy5zc3JPcHRpb25zPy5jYWNoZSkge1xuICAgICAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuc3RvcmUocmVuZGVyaW5nS2V5LCBlcnIsIGh0bWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuY2xlYXIocmVuZGVyaW5nS2V5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc3RvcmUgdGhlIHJlbmRlciBmb3IgZnV0dXJlIHVzZVxuICAgICAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLnN0b3JlKHJlbmRlcmluZ0tleSwgZXJyLCBodG1sKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5oYW5kbGVSZW5kZXIoe1xuICAgICAgZmlsZVBhdGgsXG4gICAgICBvcHRpb25zLFxuICAgICAgcmVuZGVyQ2FsbGJhY2ssXG4gICAgICByZXF1ZXN0LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGRlYnVnID0gdHJ1ZSk6IHZvaWQge1xuICAgIGlmICghZGVidWcgfHwgdGhpcy5zc3JPcHRpb25zPy5kZWJ1Zykge1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJldHJpZXZlIHRoZSBkb2N1bWVudCBmcm9tIHRoZSBjYWNoZSBvciB0aGUgZmlsZXN5c3RlbSAqL1xuICBwcm90ZWN0ZWQgZ2V0RG9jdW1lbnQoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGRvYyA9IHRoaXMudGVtcGxhdGVDYWNoZS5nZXQoZmlsZVBhdGgpO1xuXG4gICAgaWYgKCFkb2MpIHtcbiAgICAgIC8vIGZzLnJlYWRGaWxlU3luYyBjb3VsZCBiZSBtaXNzaW5nIGluIGEgYnJvd3Nlciwgc3BlY2lmaWNhbGx5XG4gICAgICAvLyBpbiBhIHVuaXQgdGVzdHMgd2l0aCB7IG5vZGU6IHsgZnM6ICdlbXB0eScgfSB9IHdlYnBhY2sgY29uZmlndXJhdGlvblxuICAgICAgZG9jID0gZnM/LnJlYWRGaWxlU3luYyA/IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0Zi04JykgOiAnJztcbiAgICAgIHRoaXMudGVtcGxhdGVDYWNoZS5zZXQoZmlsZVBhdGgsIGRvYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvYztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgdGhlIHJlbmRlciB0byB0aGUgb3JpZ2luYWwgX0FuZ3VsYXIgVW5pdmVyc2FsIGV4cHJlc3MgZW5naW5lXy5cbiAgICpcbiAgICogSW4gY2FzZSB3aGVuIHRoZSBjb25maWcgYHJldXNlQ3VycmVudFJlbmRlcmluZ2AgaXMgZW5hYmxlZCBhbmQgKippZiB0aGVyZSBpcyBhbHJlYWR5IGEgcGVuZGluZ1xuICAgKiByZW5kZXIgdGFzayBmb3IgdGhlIHNhbWUgcmVuZGVyaW5nIGtleSoqLCBpdCBkb2Vzbid0IGRlbGVnYXRlIGEgbmV3IHJlbmRlciB0byBBbmd1bGFyIFVuaXZlcnNhbC5cbiAgICogSW5zdGVhZCwgaXQgd2FpdHMgZm9yIHRoZSBjdXJyZW50IHJlbmRlcmluZyB0byBjb21wbGV0ZSBhbmQgdGhlbiByZXVzZSB0aGUgcmVzdWx0IGZvciBhbGwgd2FpdGluZyByZXF1ZXN0cy5cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlUmVuZGVyKHtcbiAgICBmaWxlUGF0aCxcbiAgICBvcHRpb25zLFxuICAgIHJlbmRlckNhbGxiYWNrLFxuICAgIHJlcXVlc3QsXG4gIH06IHtcbiAgICBmaWxlUGF0aDogc3RyaW5nO1xuICAgIG9wdGlvbnM6IGFueTtcbiAgICByZW5kZXJDYWxsYmFjazogU3NyQ2FsbGJhY2tGbjtcbiAgICByZXF1ZXN0OiBSZXF1ZXN0O1xuICB9KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNzck9wdGlvbnM/LnJldXNlQ3VycmVudFJlbmRlcmluZykge1xuICAgICAgdGhpcy5zdGFydFJlbmRlcih7XG4gICAgICAgIGZpbGVQYXRoLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICByZW5kZXJDYWxsYmFjayxcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmluZ0tleSA9IHRoaXMuZ2V0UmVuZGVyaW5nS2V5KHJlcXVlc3QpO1xuICAgIGlmICghdGhpcy5yZW5kZXJDYWxsYmFja3MuaGFzKHJlbmRlcmluZ0tleSkpIHtcbiAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2tzLnNldChyZW5kZXJpbmdLZXksIFtdKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJDYWxsYmFja3MuZ2V0KHJlbmRlcmluZ0tleSk/LnB1c2gocmVuZGVyQ2FsbGJhY2spO1xuXG4gICAgaWYgKCF0aGlzLnJlbmRlcmluZ0NhY2hlLmlzUmVuZGVyaW5nKHJlbmRlcmluZ0tleSkpIHtcbiAgICAgIHRoaXMuc3RhcnRSZW5kZXIoe1xuICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgcmVuZGVyQ2FsbGJhY2s6IChlcnIsIGh0bWwpID0+IHtcbiAgICAgICAgICAvLyBTaGFyZSB0aGUgcmVzdWx0IG9mIHRoZSByZW5kZXIgd2l0aCBhbGwgYXdhaXRpbmcgcmVxdWVzdHMgZm9yIHRoZSBzYW1lIGtleTpcblxuICAgICAgICAgIC8vIE5vdGU6IHdlIGFjY2VzcyB0aGUgTWFwIGF0IHRoZSBtb21lbnQgb2YgdGhlIHJlbmRlciBmaW5pc2hlZCAoZG9uJ3Qgc3RvcmUgdmFsdWUgaW4gYSBsb2NhbCB2YXJpYWJsZSksXG4gICAgICAgICAgLy8gICAgICAgYmVjYXVzZSBpbiB0aGUgbWVhbnRpbWUgc29tZXRoaW5nIG1pZ2h0IGhhdmUgZGVsZXRlZCB0aGUgdmFsdWUgKGkuZS4gd2hlbiBgbWF4UmVuZGVyVGltZWAgcGFzc2VkKS5cbiAgICAgICAgICB0aGlzLnJlbmRlckNhbGxiYWNrc1xuICAgICAgICAgICAgLmdldChyZW5kZXJpbmdLZXkpXG4gICAgICAgICAgICA/LmZvckVhY2goKGNiKSA9PiBjYihlcnIsIGh0bWwpKTsgLy8gcGFzcyB0aGUgc2hhcmVkIHJlc3VsdCB0byBhbGwgd2FpdGluZyByZW5kZXJpbmcgY2FsbGJhY2tzXG4gICAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFja3MuZGVsZXRlKHJlbmRlcmluZ0tleSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZyhcbiAgICAgIGBSZXF1ZXN0IGlzIHdhaXRpbmcgZm9yIHRoZSBTU1IgcmVuZGVyaW5nIHRvIGNvbXBsZXRlICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgdGhlIHJlbmRlciB0byB0aGUgb3JpZ2luYWwgX0FuZ3VsYXIgVW5pdmVyc2FsIGV4cHJlc3MgZW5naW5lXy5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gd2F5IHRvIGFib3J0IHRoZSBydW5uaW5nIHJlbmRlciBvZiBBbmd1bGFyIFVuaXZlcnNhbC5cbiAgICogU28gaWYgdGhlIHJlbmRlciBkb2Vzbid0IGNvbXBsZXRlIGluIHRoZSBjb25maWd1cmVkIGBtYXhSZW5kZXJUaW1lYCxcbiAgICogd2UganVzdCBjb25zaWRlciB0aGUgcmVuZGVyIHRhc2sgYXMgaGFuZ2luZyAobm90ZTogaXQncyBhIHBvdGVudGlhbCBtZW1vcnkgbGVhayEpLlxuICAgKiBMYXRlciBvbiwgZXZlbiBpZiB0aGUgcmVuZGVyIGNvbXBsZXRlcyBzb21ld2hlbiBpbiB0aGUgZnV0dXJlLCB3ZSB3aWxsIGlnbm9yZVxuICAgKiBpdHMgcmVzdWx0LlxuICAgKi9cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcih7XG4gICAgZmlsZVBhdGgsXG4gICAgb3B0aW9ucyxcbiAgICByZW5kZXJDYWxsYmFjayxcbiAgICByZXF1ZXN0LFxuICB9OiB7XG4gICAgZmlsZVBhdGg6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnk7XG4gICAgcmVuZGVyQ2FsbGJhY2s6IFNzckNhbGxiYWNrRm47XG4gICAgcmVxdWVzdDogUmVxdWVzdDtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHJlbmRlcmluZ0tleSA9IHRoaXMuZ2V0UmVuZGVyaW5nS2V5KHJlcXVlc3QpO1xuXG4gICAgLy8gU2V0dGluZyB0aGUgdGltZW91dCBmb3IgaGFuZ2luZyByZW5kZXJzIHRoYXQgbWlnaHQgbm90IGV2ZXIgZmluaXNoIGR1ZSB0byB2YXJpb3VzIHJlYXNvbnMuXG4gICAgLy8gQWZ0ZXIgdGhlIGNvbmZpZ3VyZWQgYG1heFJlbmRlclRpbWVgIHBhc3Nlcywgd2UgY29uc2lkZXIgdGhlIHJlbmRlcmluZyB0YXNrIGFzIGhhbmdpbmcsXG4gICAgLy8gYW5kIHJlbGVhc2UgdGhlIGNvbmN1cnJlbmN5IHNsb3QgYW5kIGZvcmdldCBhbGwgY2FsbGJhY2tzIHdhaXRpbmcgZm9yIHRoZSByZW5kZXIncyByZXN1bHQuXG4gICAgbGV0IG1heFJlbmRlclRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLmNsZWFyKHJlbmRlcmluZ0tleSk7XG4gICAgICBtYXhSZW5kZXJUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5jdXJyZW50Q29uY3VycmVuY3ktLTtcbiAgICAgIGlmICh0aGlzLnNzck9wdGlvbnM/LnJldXNlQ3VycmVudFJlbmRlcmluZykge1xuICAgICAgICB0aGlzLnJlbmRlckNhbGxiYWNrcy5kZWxldGUocmVuZGVyaW5nS2V5KTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9nKFxuICAgICAgICBgUmVuZGVyaW5nIG9mICR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9IHdhcyBub3QgYWJsZSB0byBjb21wbGV0ZS4gVGhpcyBtaWdodCBjYXVzZSBtZW1vcnkgbGVha3MhYCxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfSwgdGhpcy5zc3JPcHRpb25zPy5tYXhSZW5kZXJUaW1lID8/IDMwMDAwMCk7IC8vIDMwMDAwMG1zID09IDUgbWludXRlc1xuXG4gICAgdGhpcy5sb2coYFJlbmRlcmluZyBzdGFydGVkICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgKTtcbiAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLnNldEFzUmVuZGVyaW5nKHJlbmRlcmluZ0tleSk7XG4gICAgdGhpcy5jdXJyZW50Q29uY3VycmVuY3krKztcblxuICAgIHRoaXMuZXhwcmVzc0VuZ2luZShmaWxlUGF0aCwgb3B0aW9ucywgKGVyciwgaHRtbCkgPT4ge1xuICAgICAgaWYgKCFtYXhSZW5kZXJUaW1lb3V0KSB7XG4gICAgICAgIC8vIGlnbm9yZSB0aGlzIHJlbmRlcidzIHJlc3VsdCBiZWNhdXNlIGl0IGV4Y2VlZGVkIG1heFJlbmRlclRpbWVvdXRcbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgYFJlbmRlcmluZyBvZiAke3JlcXVlc3Qub3JpZ2luYWxVcmx9IGNvbXBsZXRlZCBhZnRlciB0aGUgc3BlY2lmaWVkIG1heFJlbmRlclRpbWUsIHRoZXJlZm9yZSBpdCB3YXMgaWdub3JlZC5gLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dChtYXhSZW5kZXJUaW1lb3V0KTtcblxuICAgICAgdGhpcy5sb2coYFJlbmRlcmluZyBjb21wbGV0ZWQgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWApO1xuICAgICAgdGhpcy5jdXJyZW50Q29uY3VycmVuY3ktLTtcblxuICAgICAgcmVuZGVyQ2FsbGJhY2soZXJyLCBodG1sKTtcbiAgICB9KTtcbiAgfVxufVxuIl19