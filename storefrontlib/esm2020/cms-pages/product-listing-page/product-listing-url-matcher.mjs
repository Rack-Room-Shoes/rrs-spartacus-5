/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, InjectionToken } from '@angular/core';
import { DEFAULT_URL_MATCHER, UrlMatcherService, } from '@spartacus/core';
import { getSuffixUrlMatcher } from '../../cms-structure/routing/suffix-routes/suffix-url-matcher';
export function getProductListingUrlMatcherFactory(service, defaultMatcherFactory) {
    const factory = (route) => {
        const defaultMatcher = defaultMatcherFactory(route);
        const suffixPLPMatcher = getSuffixUrlMatcher({
            marker: 'c',
            paramName: 'categoryCode',
        });
        return service.getCombined([defaultMatcher, suffixPLPMatcher]);
    };
    return factory;
}
/**
 * Injection token with url matcher factory for PLP.
 * The provided url matcher matches both:
 * - the configured `paths` from routing config and
 * - custom pattern  `** / c / :categoryCode`
 *
 * If the this matcher doesn't fit the requirements, it can be replaced with the DEFAULT_URL_MATCHER
 * or additional matchers can be added for a specific route.
 *
 * Note: Matchers will "match" a route, but do not contribute to the creation of the route, nor do they guard routes.
 */
export const PRODUCT_LISTING_URL_MATCHER = new InjectionToken('PRODUCT_LISTING_URL_MATCHER', {
    providedIn: 'root',
    factory: () => getProductListingUrlMatcherFactory(inject(UrlMatcherService), inject(DEFAULT_URL_MATCHER)),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0aW5nLXVybC1tYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtcGFnZXMvcHJvZHVjdC1saXN0aW5nLXBhZ2UvcHJvZHVjdC1saXN0aW5nLXVybC1tYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQ0wsbUJBQW1CLEVBRW5CLGlCQUFpQixHQUNsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBRW5HLE1BQU0sVUFBVSxrQ0FBa0MsQ0FDaEQsT0FBMEIsRUFDMUIscUJBQXdDO0lBRXhDLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7UUFDL0IsTUFBTSxjQUFjLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztZQUMzQyxNQUFNLEVBQUUsR0FBRztZQUNYLFNBQVMsRUFBRSxjQUFjO1NBQzFCLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FDdEMsSUFBSSxjQUFjLENBQW9CLDZCQUE2QixFQUFFO0lBQ25FLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FDWixrQ0FBa0MsQ0FDaEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQ3pCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUM1QjtDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGluamVjdCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIERFRkFVTFRfVVJMX01BVENIRVIsXG4gIFVybE1hdGNoZXJGYWN0b3J5LFxuICBVcmxNYXRjaGVyU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGdldFN1ZmZpeFVybE1hdGNoZXIgfSBmcm9tICcuLi8uLi9jbXMtc3RydWN0dXJlL3JvdXRpbmcvc3VmZml4LXJvdXRlcy9zdWZmaXgtdXJsLW1hdGNoZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZHVjdExpc3RpbmdVcmxNYXRjaGVyRmFjdG9yeShcbiAgc2VydmljZTogVXJsTWF0Y2hlclNlcnZpY2UsXG4gIGRlZmF1bHRNYXRjaGVyRmFjdG9yeTogVXJsTWF0Y2hlckZhY3Rvcnlcbik6IFVybE1hdGNoZXJGYWN0b3J5IHtcbiAgY29uc3QgZmFjdG9yeSA9IChyb3V0ZTogUm91dGUpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0TWF0Y2hlciA9IGRlZmF1bHRNYXRjaGVyRmFjdG9yeShyb3V0ZSk7XG4gICAgY29uc3Qgc3VmZml4UExQTWF0Y2hlciA9IGdldFN1ZmZpeFVybE1hdGNoZXIoe1xuICAgICAgbWFya2VyOiAnYycsXG4gICAgICBwYXJhbU5hbWU6ICdjYXRlZ29yeUNvZGUnLFxuICAgIH0pO1xuICAgIHJldHVybiBzZXJ2aWNlLmdldENvbWJpbmVkKFtkZWZhdWx0TWF0Y2hlciwgc3VmZml4UExQTWF0Y2hlcl0pO1xuICB9O1xuICByZXR1cm4gZmFjdG9yeTtcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gd2l0aCB1cmwgbWF0Y2hlciBmYWN0b3J5IGZvciBQTFAuXG4gKiBUaGUgcHJvdmlkZWQgdXJsIG1hdGNoZXIgbWF0Y2hlcyBib3RoOlxuICogLSB0aGUgY29uZmlndXJlZCBgcGF0aHNgIGZyb20gcm91dGluZyBjb25maWcgYW5kXG4gKiAtIGN1c3RvbSBwYXR0ZXJuICBgKiogLyBjIC8gOmNhdGVnb3J5Q29kZWBcbiAqXG4gKiBJZiB0aGUgdGhpcyBtYXRjaGVyIGRvZXNuJ3QgZml0IHRoZSByZXF1aXJlbWVudHMsIGl0IGNhbiBiZSByZXBsYWNlZCB3aXRoIHRoZSBERUZBVUxUX1VSTF9NQVRDSEVSXG4gKiBvciBhZGRpdGlvbmFsIG1hdGNoZXJzIGNhbiBiZSBhZGRlZCBmb3IgYSBzcGVjaWZpYyByb3V0ZS5cbiAqXG4gKiBOb3RlOiBNYXRjaGVycyB3aWxsIFwibWF0Y2hcIiBhIHJvdXRlLCBidXQgZG8gbm90IGNvbnRyaWJ1dGUgdG8gdGhlIGNyZWF0aW9uIG9mIHRoZSByb3V0ZSwgbm9yIGRvIHRoZXkgZ3VhcmQgcm91dGVzLlxuICovXG5leHBvcnQgY29uc3QgUFJPRFVDVF9MSVNUSU5HX1VSTF9NQVRDSEVSID1cbiAgbmV3IEluamVjdGlvblRva2VuPFVybE1hdGNoZXJGYWN0b3J5PignUFJPRFVDVF9MSVNUSU5HX1VSTF9NQVRDSEVSJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiAoKSA9PlxuICAgICAgZ2V0UHJvZHVjdExpc3RpbmdVcmxNYXRjaGVyRmFjdG9yeShcbiAgICAgICAgaW5qZWN0KFVybE1hdGNoZXJTZXJ2aWNlKSxcbiAgICAgICAgaW5qZWN0KERFRkFVTFRfVVJMX01BVENIRVIpXG4gICAgICApLFxuICB9KTtcbiJdfQ==