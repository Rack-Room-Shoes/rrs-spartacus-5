/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../util/glob.service";
export class UrlMatcherService {
    constructor(globService) {
        this.globService = globService;
    }
    /**
     * Returns a matcher that is always fails
     */
    getFalsy() {
        return function falsyUrlMatcher() {
            return null;
        };
    }
    /**
     * Returns a matcher for given list of paths
     */
    getFromPaths(paths) {
        const matchers = paths.map((path) => this.getFromPath(path));
        const matcher = this.getCombined(matchers);
        if (isDevMode()) {
            matcher['_paths'] = paths; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Returns a matcher that combines the given matchers
     * */
    getCombined(matchers) {
        const matcher = function combinedUrlMatchers(segments, segmentGroup, route) {
            for (let i = 0; i < matchers.length; i++) {
                const result = matchers[i](segments, segmentGroup, route);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        if (isDevMode()) {
            matcher['_matchers'] = matchers; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Similar to Angular's defaultUrlMatcher. Differences:
     * - the `path` comes from function's argument, not from `route.path`
     * - the empty path `''` is handled here, but in Angular is handled one level higher in the match() function
     */
    getFromPath(path = '') {
        const matcher = function pathUrlMatcher(segments, segmentGroup, route) {
            /**
             * @license
             * The MIT License
             * Copyright (c) 2010-2019 Google LLC. http://angular.io/license
             *
             * See:
             * - https://github.com/angular/angular/blob/6f5f481fdae03f1d8db36284b64c7b82d9519d85/packages/router/src/shared.ts#L121
             */
            // use function's argument, not the `route.path`
            if (path === '') {
                if (route.pathMatch === 'full' &&
                    (segmentGroup.hasChildren() || segments.length > 0)) {
                    return null;
                }
                return { consumed: [], posParams: {} };
            }
            const parts = path.split('/'); // use function's argument, not the `route.path`
            if (parts.length > segments.length) {
                // The actual URL is shorter than the config, no match
                return null;
            }
            if (route.pathMatch === 'full' &&
                (segmentGroup.hasChildren() || parts.length < segments.length)) {
                // The config is longer than the actual URL but we are looking for a full match, return null
                return null;
            }
            const posParams = {};
            // Check each config part against the actual URL
            for (let index = 0; index < parts.length; index++) {
                const part = parts[index];
                const segment = segments[index];
                const isParameter = part.startsWith(':');
                if (isParameter) {
                    posParams[part.substring(1)] = segment;
                }
                else if (part !== segment.path) {
                    // The actual URL part does not match the config, no match
                    return null;
                }
            }
            return { consumed: segments.slice(0, parts.length), posParams };
        };
        if (isDevMode()) {
            matcher['_path'] = path; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Returns URL matcher that accepts almost everything (like `**` route), but not paths accepted by the given matcher
     */
    getOpposite(originalMatcher) {
        const matcher = function oppositeUrlMatcher(segments, group, route) {
            return originalMatcher(segments, group, route)
                ? null
                : { consumed: segments, posParams: {} };
        };
        if (isDevMode()) {
            matcher['_originalMatcher'] = originalMatcher; // property added for easier debugging of routes
        }
        return matcher;
    }
    /**
     * Returns URL matcher for the given list of glob-like patterns. Each pattern must start with `/` or `!/`.
     */
    getFromGlob(globPatterns) {
        const globValidator = this.globService.getValidator(globPatterns);
        const matcher = function globUrlMatcher(segments) {
            const fullPath = `/${segments.map((s) => s.path).join('/')}`;
            return globValidator(fullPath)
                ? { consumed: segments, posParams: {} }
                : null;
        };
        if (isDevMode()) {
            matcher['_globPatterns'] = globPatterns; // property added for easier debugging of routes
        }
        return matcher;
    }
}
UrlMatcherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UrlMatcherService, deps: [{ token: i1.GlobService }], target: i0.ɵɵFactoryTarget.Injectable });
UrlMatcherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UrlMatcherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UrlMatcherService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.GlobService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLW1hdGNoZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvc2VydmljZXMvdXJsLW1hdGNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVd0RCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQXNCLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVsRDs7T0FFRztJQUNILFFBQVE7UUFDTixPQUFPLFNBQVMsZUFBZTtZQUM3QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVksQ0FBQyxLQUFlO1FBQzFCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDVCxPQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsZ0RBQWdEO1NBQ25GO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVEOztTQUVLO0lBQ0wsV0FBVyxDQUFDLFFBQXNCO1FBQ2hDLE1BQU0sT0FBTyxHQUFHLFNBQVMsbUJBQW1CLENBQzFDLFFBQXNCLEVBQ3RCLFlBQTZCLEVBQzdCLEtBQVk7WUFFWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMs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QyxDQUFDLENBQUMsSUFBSTtnQkFDTixDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM1QyxDQUFDLENBQUM7UUFDRixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsZ0RBQWdEO1NBQ2hHO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLFlBQXNCO1FBQ2hDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxFLE1BQU0sT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUNyQyxRQUFzQjtZQUV0QixNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUU3RCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtnQkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLENBQUMsQ0FBQztRQUNGLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsZ0RBQWdEO1NBQzFGO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7OEdBMUpVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBREosTUFBTTsyRkFDbkIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUm91dGUsXG4gIFVybE1hdGNoZXIsXG4gIFVybE1hdGNoUmVzdWx0LFxuICBVcmxTZWdtZW50LFxuICBVcmxTZWdtZW50R3JvdXAsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBHbG9iU2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWwvZ2xvYi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBVcmxNYXRjaGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBnbG9iU2VydmljZTogR2xvYlNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXRjaGVyIHRoYXQgaXMgYWx3YXlzIGZhaWxzXG4gICAqL1xuICBnZXRGYWxzeSgpOiBVcmxNYXRjaGVyIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmFsc3lVcmxNYXRjaGVyKCk6IG51bGwge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbWF0Y2hlciBmb3IgZ2l2ZW4gbGlzdCBvZiBwYXRoc1xuICAgKi9cbiAgZ2V0RnJvbVBhdGhzKHBhdGhzOiBzdHJpbmdbXSk6IFVybE1hdGNoZXIge1xuICAgIGNvbnN0IG1hdGNoZXJzID0gcGF0aHMubWFwKChwYXRoKSA9PiB0aGlzLmdldEZyb21QYXRoKHBhdGgpKTtcbiAgICBjb25zdCBtYXRjaGVyID0gdGhpcy5nZXRDb21iaW5lZChtYXRjaGVycyk7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAoPGFueT5tYXRjaGVyKVsnX3BhdGhzJ10gPSBwYXRoczsgLy8gcHJvcGVydHkgYWRkZWQgZm9yIGVhc2llciBkZWJ1Z2dpbmcgb2Ygcm91dGVzXG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBtYXRjaGVyIHRoYXQgY29tYmluZXMgdGhlIGdpdmVuIG1hdGNoZXJzXG4gICAqICovXG4gIGdldENvbWJpbmVkKG1hdGNoZXJzOiBVcmxNYXRjaGVyW10pOiBVcmxNYXRjaGVyIHtcbiAgICBjb25zdCBtYXRjaGVyID0gZnVuY3Rpb24gY29tYmluZWRVcmxNYXRjaGVycyhcbiAgICAgIHNlZ21lbnRzOiBVcmxTZWdtZW50W10sXG4gICAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCxcbiAgICAgIHJvdXRlOiBSb3V0ZVxuICAgICk6IFVybE1hdGNoUmVzdWx0IHwgbnVsbCB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG1hdGNoZXJzW2ldKHNlZ21lbnRzLCBzZWdtZW50R3JvdXAsIHJvdXRlKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBtYXRjaGVyWydfbWF0Y2hlcnMnXSA9IG1hdGNoZXJzOyAvLyBwcm9wZXJ0eSBhZGRlZCBmb3IgZWFzaWVyIGRlYnVnZ2luZyBvZiByb3V0ZXNcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXI7XG4gIH1cblxuICAvKipcbiAgICogU2ltaWxhciB0byBBbmd1bGFyJ3MgZGVmYXVsdFVybE1hdGNoZXIuIERpZmZlcmVuY2VzOlxuICAgKiAtIHRoZSBgcGF0aGAgY29tZXMgZnJvbSBmdW5jdGlvbidzIGFyZ3VtZW50LCBub3QgZnJvbSBgcm91dGUucGF0aGBcbiAgICogLSB0aGUgZW1wdHkgcGF0aCBgJydgIGlzIGhhbmRsZWQgaGVyZSwgYnV0IGluIEFuZ3VsYXIgaXMgaGFuZGxlZCBvbmUgbGV2ZWwgaGlnaGVyIGluIHRoZSBtYXRjaCgpIGZ1bmN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RnJvbVBhdGgocGF0aDogc3RyaW5nID0gJycpOiBVcmxNYXRjaGVyIHtcbiAgICBjb25zdCBtYXRjaGVyID0gZnVuY3Rpb24gcGF0aFVybE1hdGNoZXIoXG4gICAgICBzZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsXG4gICAgICByb3V0ZTogUm91dGVcbiAgICApOiBVcmxNYXRjaFJlc3VsdCB8IG51bGwge1xuICAgICAgLyoqXG4gICAgICAgKiBAbGljZW5zZVxuICAgICAgICogVGhlIE1JVCBMaWNlbnNlXG4gICAgICAgKiBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxOSBHb29nbGUgTExDLiBodHRwOi8vYW5ndWxhci5pby9saWNlbnNlXG4gICAgICAgKlxuICAgICAgICogU2VlOlxuICAgICAgICogLSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvNmY1ZjQ4MWZkYWUwM2YxZDhkYjM2Mjg0YjY0YzdiODJkOTUxOWQ4NS9wYWNrYWdlcy9yb3V0ZXIvc3JjL3NoYXJlZC50cyNMMTIxXG4gICAgICAgKi9cblxuICAgICAgLy8gdXNlIGZ1bmN0aW9uJ3MgYXJndW1lbnQsIG5vdCB0aGUgYHJvdXRlLnBhdGhgXG4gICAgICBpZiAocGF0aCA9PT0gJycpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJvdXRlLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnICYmXG4gICAgICAgICAgKHNlZ21lbnRHcm91cC5oYXNDaGlsZHJlbigpIHx8IHNlZ21lbnRzLmxlbmd0aCA+IDApXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGNvbnN1bWVkOiBbXSwgcG9zUGFyYW1zOiB7fSB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTsgLy8gdXNlIGZ1bmN0aW9uJ3MgYXJndW1lbnQsIG5vdCB0aGUgYHJvdXRlLnBhdGhgXG5cbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiBzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gVGhlIGFjdHVhbCBVUkwgaXMgc2hvcnRlciB0aGFuIHRoZSBjb25maWcsIG5vIG1hdGNoXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHJvdXRlLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnICYmXG4gICAgICAgIChzZWdtZW50R3JvdXAuaGFzQ2hpbGRyZW4oKSB8fCBwYXJ0cy5sZW5ndGggPCBzZWdtZW50cy5sZW5ndGgpXG4gICAgICApIHtcbiAgICAgICAgLy8gVGhlIGNvbmZpZyBpcyBsb25nZXIgdGhhbiB0aGUgYWN0dWFsIFVSTCBidXQgd2UgYXJlIGxvb2tpbmcgZm9yIGEgZnVsbCBtYXRjaCwgcmV0dXJuIG51bGxcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvc1BhcmFtczogeyBba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50IH0gPSB7fTtcblxuICAgICAgLy8gQ2hlY2sgZWFjaCBjb25maWcgcGFydCBhZ2FpbnN0IHRoZSBhY3R1YWwgVVJMXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGFydHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF07XG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpbmRleF07XG4gICAgICAgIGNvbnN0IGlzUGFyYW1ldGVyID0gcGFydC5zdGFydHNXaXRoKCc6Jyk7XG4gICAgICAgIGlmIChpc1BhcmFtZXRlcikge1xuICAgICAgICAgIHBvc1BhcmFtc1twYXJ0LnN1YnN0cmluZygxKV0gPSBzZWdtZW50O1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnQgIT09IHNlZ21lbnQucGF0aCkge1xuICAgICAgICAgIC8vIFRoZSBhY3R1YWwgVVJMIHBhcnQgZG9lcyBub3QgbWF0Y2ggdGhlIGNvbmZpZywgbm8gbWF0Y2hcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjb25zdW1lZDogc2VnbWVudHMuc2xpY2UoMCwgcGFydHMubGVuZ3RoKSwgcG9zUGFyYW1zIH07XG4gICAgfTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIG1hdGNoZXJbJ19wYXRoJ10gPSBwYXRoOyAvLyBwcm9wZXJ0eSBhZGRlZCBmb3IgZWFzaWVyIGRlYnVnZ2luZyBvZiByb3V0ZXNcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBVUkwgbWF0Y2hlciB0aGF0IGFjY2VwdHMgYWxtb3N0IGV2ZXJ5dGhpbmcgKGxpa2UgYCoqYCByb3V0ZSksIGJ1dCBub3QgcGF0aHMgYWNjZXB0ZWQgYnkgdGhlIGdpdmVuIG1hdGNoZXJcbiAgICovXG4gIGdldE9wcG9zaXRlKG9yaWdpbmFsTWF0Y2hlcjogVXJsTWF0Y2hlcik6IFVybE1hdGNoZXIge1xuICAgIGNvbnN0IG1hdGNoZXIgPSBmdW5jdGlvbiBvcHBvc2l0ZVVybE1hdGNoZXIoXG4gICAgICBzZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgZ3JvdXA6IFVybFNlZ21lbnRHcm91cCxcbiAgICAgIHJvdXRlOiBSb3V0ZVxuICAgICkge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsTWF0Y2hlcihzZWdtZW50cywgZ3JvdXAsIHJvdXRlKVxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiB7IGNvbnN1bWVkOiBzZWdtZW50cywgcG9zUGFyYW1zOiB7fSB9O1xuICAgIH07XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBtYXRjaGVyWydfb3JpZ2luYWxNYXRjaGVyJ10gPSBvcmlnaW5hbE1hdGNoZXI7IC8vIHByb3BlcnR5IGFkZGVkIGZvciBlYXNpZXIgZGVidWdnaW5nIG9mIHJvdXRlc1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIFVSTCBtYXRjaGVyIGZvciB0aGUgZ2l2ZW4gbGlzdCBvZiBnbG9iLWxpa2UgcGF0dGVybnMuIEVhY2ggcGF0dGVybiBtdXN0IHN0YXJ0IHdpdGggYC9gIG9yIGAhL2AuXG4gICAqL1xuICBnZXRGcm9tR2xvYihnbG9iUGF0dGVybnM6IHN0cmluZ1tdKTogVXJsTWF0Y2hlciB7XG4gICAgY29uc3QgZ2xvYlZhbGlkYXRvciA9IHRoaXMuZ2xvYlNlcnZpY2UuZ2V0VmFsaWRhdG9yKGdsb2JQYXR0ZXJucyk7XG5cbiAgICBjb25zdCBtYXRjaGVyID0gZnVuY3Rpb24gZ2xvYlVybE1hdGNoZXIoXG4gICAgICBzZWdtZW50czogVXJsU2VnbWVudFtdXG4gICAgKTogVXJsTWF0Y2hSZXN1bHQgfCBudWxsIHtcbiAgICAgIGNvbnN0IGZ1bGxQYXRoID0gYC8ke3NlZ21lbnRzLm1hcCgocykgPT4gcy5wYXRoKS5qb2luKCcvJyl9YDtcblxuICAgICAgcmV0dXJuIGdsb2JWYWxpZGF0b3IoZnVsbFBhdGgpXG4gICAgICAgID8geyBjb25zdW1lZDogc2VnbWVudHMsIHBvc1BhcmFtczoge30gfVxuICAgICAgICA6IG51bGw7XG4gICAgfTtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIG1hdGNoZXJbJ19nbG9iUGF0dGVybnMnXSA9IGdsb2JQYXR0ZXJuczsgLy8gcHJvcGVydHkgYWRkZWQgZm9yIGVhc2llciBkZWJ1Z2dpbmcgb2Ygcm91dGVzXG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVyO1xuICB9XG59XG4iXX0=