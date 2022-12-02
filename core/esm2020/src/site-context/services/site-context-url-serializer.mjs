/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "./site-context-params.service";
/**
 * Angular URL Serializer aware of Spartacus site context parameters
 * encoded in the URL.
 */
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
    constructor(siteContextParams) {
        super();
        this.siteContextParams = siteContextParams;
        /**
         * Splits the URL into 2 parts: path and the query/fragment part
         */
        this.URL_SPLIT = /(^[^#?]*)(.*)/;
    }
    /**
     * Names of site context parameters encoded in the URL
     */
    get urlEncodingParameters() {
        return this.siteContextParams.getUrlEncodingParameters();
    }
    /**
     * Tells whether any site context parameters should be encoded in the URL
     */
    get hasContextInRoutes() {
        return this.urlEncodingParameters.length > 0;
    }
    /**
     * @override Recognizes the site context parameters encoded in the prefix segments
     * of the given URL.
     *
     * It returns the UrlTree for the given URL shortened by the recognized params, but saves
     * the params' values in the custom property of UrlTree: `siteContext`.
     */
    parse(url) {
        if (this.hasContextInRoutes) {
            const urlWithParams = this.urlExtractContextParameters(url);
            const parsed = super.parse(urlWithParams.url);
            this.urlTreeIncludeContextParameters(parsed, urlWithParams.params);
            return parsed;
        }
        else {
            return super.parse(url);
        }
    }
    /**
     * Recognizes the site context parameters encoded in the prefix segments of the given URL.
     *
     * It returns the recognized site context params as well as the
     * URL shortened by the recognized params.
     */
    urlExtractContextParameters(url) {
        const [, urlPart, queryPart] = url.match(this.URL_SPLIT) ?? [, '', ''];
        const segments = urlPart?.split('/') ?? [];
        if (segments[0] === '') {
            segments.shift();
        }
        const params = {};
        let paramId = 0;
        let segmentId = 0;
        while (paramId < this.urlEncodingParameters.length &&
            segmentId < segments.length) {
            const paramName = this.urlEncodingParameters[paramId];
            const paramValues = this.siteContextParams.getParamValues(paramName);
            if (paramValues.includes(segments[segmentId])) {
                params[paramName] = segments[segmentId];
                segmentId++;
            }
            paramId++;
        }
        url = segments.slice(segmentId).join('/') + queryPart;
        return { url, params };
    }
    /**
     * Saves the given site context parameters in the custom property
     * of the given UrlTree: `siteContext`.
     */
    urlTreeIncludeContextParameters(urlTree, params) {
        urlTree.siteContext = params;
    }
    /**
     * @override Serializes the given UrlTree to a string and prepends
     *  to it the current values of the site context parameters.
     */
    serialize(tree) {
        const params = this.urlTreeExtractContextParameters(tree);
        const url = super.serialize(tree);
        const serialized = this.urlIncludeContextParameters(url, params);
        return serialized;
    }
    /**
     * Returns the site context parameters stored in the custom property
     * of the UrlTree: `siteContext`.
     */
    urlTreeExtractContextParameters(urlTree) {
        return urlTree.siteContext ? urlTree.siteContext : {};
    }
    /**
     * Prepends the current values of the site context parameters to the given URL.
     */
    urlIncludeContextParameters(url, params) {
        const contextRoutePart = this.urlEncodingParameters
            .map((param) => {
            return params[param]
                ? params[param]
                : this.siteContextParams.getValue(param);
        })
            .join('/');
        return contextRoutePart + url;
    }
}
SiteContextUrlSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextUrlSerializer, deps: [{ token: i1.SiteContextParamsService }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextUrlSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextUrlSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextUrlSerializer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.SiteContextParamsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LXVybC1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc2l0ZS1jb250ZXh0L3NlcnZpY2VzL3NpdGUtY29udGV4dC11cmwtc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQVcsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBa0JoRTs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsb0JBQW9CO0lBb0JoRSxZQUFvQixpQkFBMkM7UUFDN0QsS0FBSyxFQUFFLENBQUM7UUFEVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBbkIvRDs7V0FFRztRQUNnQixjQUFTLEdBQVcsZUFBZSxDQUFDO0lBa0J2RCxDQUFDO0lBaEJEOztPQUVHO0lBQ0gsSUFBYyxxQkFBcUI7UUFDakMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFjLGtCQUFrQjtRQUM5QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFNRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsR0FBVztRQUNmLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQTJCLENBQUM7WUFDeEUsSUFBSSxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENB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R0FBRyxHQUFHLENBQUM7SUFDaEMsQ0FBQzs7cUhBaElVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWZhdWx0VXJsU2VyaWFsaXplciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTaXRlQ29udGV4dFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NpdGUtY29udGV4dC1wYXJhbXMuc2VydmljZSc7XG5cbi8qKlxuICogVmFsdWVzIG9mIHRoZSBzaXRlIGNvbnRleHQgcGFyYW1ldGVycyBlbmNvZGVkIGluIHRoZSBVUkwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2l0ZUNvbnRleHRVcmxQYXJhbXMge1xuICBbbmFtZTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFVybFRyZWUgZGVjb3JhdGVkIHdpdGggYSBjdXN0b20gcHJvcGVydHkgYHNpdGVDb250ZXh0YFxuICogZm9yIHN0b3JpbmcgdGhlIHZhbHVlcyBvZiB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXJsVHJlZVdpdGhTaXRlQ29udGV4dCBleHRlbmRzIFVybFRyZWUge1xuICBzaXRlQ29udGV4dD86IFNpdGVDb250ZXh0VXJsUGFyYW1zO1xufVxuXG4vKipcbiAqIEFuZ3VsYXIgVVJMIFNlcmlhbGl6ZXIgYXdhcmUgb2YgU3BhcnRhY3VzIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzXG4gKiBlbmNvZGVkIGluIHRoZSBVUkwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaXRlQ29udGV4dFVybFNlcmlhbGl6ZXIgZXh0ZW5kcyBEZWZhdWx0VXJsU2VyaWFsaXplciB7XG4gIC8qKlxuICAgKiBTcGxpdHMgdGhlIFVSTCBpbnRvIDIgcGFydHM6IHBhdGggYW5kIHRoZSBxdWVyeS9mcmFnbWVudCBwYXJ0XG4gICAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgVVJMX1NQTElUOiBSZWdFeHAgPSAvKF5bXiM/XSopKC4qKS87XG5cbiAgLyoqXG4gICAqIE5hbWVzIG9mIHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzIGVuY29kZWQgaW4gdGhlIFVSTFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldCB1cmxFbmNvZGluZ1BhcmFtZXRlcnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnNpdGVDb250ZXh0UGFyYW1zLmdldFVybEVuY29kaW5nUGFyYW1ldGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGxzIHdoZXRoZXIgYW55IHNpdGUgY29udGV4dCBwYXJhbWV0ZXJzIHNob3VsZCBiZSBlbmNvZGVkIGluIHRoZSBVUkxcbiAgICovXG4gIHByb3RlY3RlZCBnZXQgaGFzQ29udGV4dEluUm91dGVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnVybEVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPiAwO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaXRlQ29udGV4dFBhcmFtczogU2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGUgUmVjb2duaXplcyB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMgZW5jb2RlZCBpbiB0aGUgcHJlZml4IHNlZ21lbnRzXG4gICAqIG9mIHRoZSBnaXZlbiBVUkwuXG4gICAqXG4gICAqIEl0IHJldHVybnMgdGhlIFVybFRyZWUgZm9yIHRoZSBnaXZlbiBVUkwgc2hvcnRlbmVkIGJ5IHRoZSByZWNvZ25pemVkIHBhcmFtcywgYnV0IHNhdmVzXG4gICAqIHRoZSBwYXJhbXMnIHZhbHVlcyBpbiB0aGUgY3VzdG9tIHByb3BlcnR5IG9mIFVybFRyZWU6IGBzaXRlQ29udGV4dGAuXG4gICAqL1xuICBwYXJzZSh1cmw6IHN0cmluZyk6IFVybFRyZWVXaXRoU2l0ZUNvbnRleHQge1xuICAgIGlmICh0aGlzLmhhc0NvbnRleHRJblJvdXRlcykge1xuICAgICAgY29uc3QgdXJsV2l0aFBhcmFtcyA9IHRoaXMudXJsRXh0cmFjdENvbnRleHRQYXJhbWV0ZXJzKHVybCk7XG4gICAgICBjb25zdCBwYXJzZWQgPSBzdXBlci5wYXJzZSh1cmxXaXRoUGFyYW1zLnVybCkgYXMgVXJsVHJlZVdpdGhTaXRlQ29udGV4dDtcbiAgICAgIHRoaXMudXJsVHJlZUluY2x1ZGVDb250ZXh0UGFyYW1ldGVycyhwYXJzZWQsIHVybFdpdGhQYXJhbXMucGFyYW1zKTtcbiAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5wYXJzZSh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNvZ25pemVzIHRoZSBzaXRlIGNvbnRleHQgcGFyYW1ldGVycyBlbmNvZGVkIGluIHRoZSBwcmVmaXggc2VnbWVudHMgb2YgdGhlIGdpdmVuIFVSTC5cbiAgICpcbiAgICogSXQgcmV0dXJucyB0aGUgcmVjb2duaXplZCBzaXRlIGNvbnRleHQgcGFyYW1zIGFzIHdlbGwgYXMgdGhlXG4gICAqIFVSTCBzaG9ydGVuZWQgYnkgdGhlIHJlY29nbml6ZWQgcGFyYW1zLlxuICAgKi9cbiAgdXJsRXh0cmFjdENvbnRleHRQYXJhbWV0ZXJzKHVybDogc3RyaW5nKToge1xuICAgIHVybDogc3RyaW5nO1xuICAgIHBhcmFtczogU2l0ZUNvbnRleHRVcmxQYXJhbXM7XG4gIH0ge1xuICAgIGNvbnN0IFssIHVybFBhcnQsIHF1ZXJ5UGFydF0gPSB1cmwubWF0Y2godGhpcy5VUkxfU1BMSVQpID8/IFssICcnLCAnJ107XG5cbiAgICBjb25zdCBzZWdtZW50cyA9IHVybFBhcnQ/LnNwbGl0KCcvJykgPz8gW107XG4gICAgaWYgKHNlZ21lbnRzWzBdID09PSAnJykge1xuICAgICAgc2VnbWVudHMuc2hpZnQoKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBTaXRlQ29udGV4dFVybFBhcmFtcyA9IHt9O1xuXG4gICAgbGV0IHBhcmFtSWQgPSAwO1xuICAgIGxldCBzZWdtZW50SWQgPSAwO1xuICAgIHdoaWxlIChcbiAgICAgIHBhcmFtSWQgPCB0aGlzLnVybEVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggJiZcbiAgICAgIHNlZ21lbnRJZCA8IHNlZ21lbnRzLmxlbmd0aFxuICAgICkge1xuICAgICAgY29uc3QgcGFyYW1OYW1lID0gdGhpcy51cmxFbmNvZGluZ1BhcmFtZXRlcnNbcGFyYW1JZF07XG4gICAgICBjb25zdCBwYXJhbVZhbHVlcyA9IHRoaXMuc2l0ZUNvbnRleHRQYXJhbXMuZ2V0UGFyYW1WYWx1ZXMocGFyYW1OYW1lKTtcblxuICAgICAgaWYgKHBhcmFtVmFsdWVzLmluY2x1ZGVzKHNlZ21lbnRzW3NlZ21lbnRJZF0pKSB7XG4gICAgICAgIHBhcmFtc1twYXJhbU5hbWVdID0gc2VnbWVudHNbc2VnbWVudElkXTtcbiAgICAgICAgc2VnbWVudElkKys7XG4gICAgICB9XG4gICAgICBwYXJhbUlkKys7XG4gICAgfVxuXG4gICAgdXJsID0gc2VnbWVudHMuc2xpY2Uoc2VnbWVudElkKS5qb2luKCcvJykgKyBxdWVyeVBhcnQ7XG4gICAgcmV0dXJuIHsgdXJsLCBwYXJhbXMgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlcyB0aGUgZ2l2ZW4gc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMgaW4gdGhlIGN1c3RvbSBwcm9wZXJ0eVxuICAgKiBvZiB0aGUgZ2l2ZW4gVXJsVHJlZTogYHNpdGVDb250ZXh0YC5cbiAgICovXG4gIHByb3RlY3RlZCB1cmxUcmVlSW5jbHVkZUNvbnRleHRQYXJhbWV0ZXJzKFxuICAgIHVybFRyZWU6IFVybFRyZWVXaXRoU2l0ZUNvbnRleHQsXG4gICAgcGFyYW1zOiBTaXRlQ29udGV4dFVybFBhcmFtc1xuICApOiB2b2lkIHtcbiAgICB1cmxUcmVlLnNpdGVDb250ZXh0ID0gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZSBTZXJpYWxpemVzIHRoZSBnaXZlbiBVcmxUcmVlIHRvIGEgc3RyaW5nIGFuZCBwcmVwZW5kc1xuICAgKiAgdG8gaXQgdGhlIGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBzaXRlIGNvbnRleHQgcGFyYW1ldGVycy5cbiAgICovXG4gIHNlcmlhbGl6ZSh0cmVlOiBVcmxUcmVlV2l0aFNpdGVDb250ZXh0KTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnVybFRyZWVFeHRyYWN0Q29udGV4dFBhcmFtZXRlcnModHJlZSk7XG4gICAgY29uc3QgdXJsID0gc3VwZXIuc2VyaWFsaXplKHRyZWUpO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSB0aGlzLnVybEluY2x1ZGVDb250ZXh0UGFyYW1ldGVycyh1cmwsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMgc3RvcmVkIGluIHRoZSBjdXN0b20gcHJvcGVydHlcbiAgICogb2YgdGhlIFVybFRyZWU6IGBzaXRlQ29udGV4dGAuXG4gICAqL1xuICB1cmxUcmVlRXh0cmFjdENvbnRleHRQYXJhbWV0ZXJzKFxuICAgIHVybFRyZWU6IFVybFRyZWVXaXRoU2l0ZUNvbnRleHRcbiAgKTogU2l0ZUNvbnRleHRVcmxQYXJhbXMge1xuICAgIHJldHVybiB1cmxUcmVlLnNpdGVDb250ZXh0ID8gdXJsVHJlZS5zaXRlQ29udGV4dCA6IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBlbmRzIHRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgc2l0ZSBjb250ZXh0IHBhcmFtZXRlcnMgdG8gdGhlIGdpdmVuIFVSTC5cbiAgICovXG4gIHByb3RlY3RlZCB1cmxJbmNsdWRlQ29udGV4dFBhcmFtZXRlcnMoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcGFyYW1zOiBTaXRlQ29udGV4dFVybFBhcmFtc1xuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbnRleHRSb3V0ZVBhcnQgPSB0aGlzLnVybEVuY29kaW5nUGFyYW1ldGVyc1xuICAgICAgLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcmFtc1twYXJhbV1cbiAgICAgICAgICA/IHBhcmFtc1twYXJhbV1cbiAgICAgICAgICA6IHRoaXMuc2l0ZUNvbnRleHRQYXJhbXMuZ2V0VmFsdWUocGFyYW0pO1xuICAgICAgfSlcbiAgICAgIC5qb2luKCcvJyk7XG5cbiAgICByZXR1cm4gY29udGV4dFJvdXRlUGFydCArIHVybDtcbiAgfVxufVxuIl19