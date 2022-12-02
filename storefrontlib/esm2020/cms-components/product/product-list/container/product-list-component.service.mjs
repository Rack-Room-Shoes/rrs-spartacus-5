/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, using } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, shareReplay, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/router";
import * as i3 from "../../../../shared/config/view-config";
/**
 * The `ProductListComponentService` is used to search products. The service is used
 * on the Product Listing Page, for listing products and the facet navigation.
 *
 * The service exposes the product search results based on the category and search
 * route parameters. The route parameters are used to query products by the help of
 * the `ProductSearchService`.
 */
export class ProductListComponentService {
    constructor(productSearchService, routing, activatedRoute, currencyService, languageService, router, config) {
        this.productSearchService = productSearchService;
        this.routing = routing;
        this.activatedRoute = activatedRoute;
        this.currencyService = currencyService;
        this.languageService = languageService;
        this.router = router;
        this.config = config;
        this.RELEVANCE_ALLCATEGORIES = ':relevance:allCategories:';
        /**
         * Emits the search results for the current search query.
         *
         * The `searchResults$` is _not_ concerned with querying, it only observes the
         * `productSearchService.getResults()`
         */
        this.searchResults$ = this.productSearchService
            .getResults()
            .pipe(filter((searchResult) => Object.keys(searchResult).length > 0));
        /**
         * Observes the route and performs a search on each route change.
         *
         * Context changes, such as language and currencies are also taken
         * into account, so that the search is performed again.
         */
        this.searchByRouting$ = combineLatest([
            this.routing.getRouterState().pipe(distinctUntilChanged((x, y) => {
                // router emits new value also when the anticipated `nextState` changes
                // but we want to perform search only when current url changes
                return x.state.url === y.state.url;
            })),
            ...this.siteContext,
        ]).pipe(debounceTime(0), map(([routerState, ..._context]) => routerState.state), tap((state) => {
            const criteria = this.getCriteriaFromRoute(state.params, state.queryParams);
            this.search(criteria);
        }));
        /**
         * This stream is used for the Product Listing and Product Facets.
         *
         * It not only emits search results, but also performs a search on every change
         * of the route (i.e. route params or query params).
         *
         * When a user leaves the PLP route, the PLP component unsubscribes from this stream
         * so no longer the search is performed on route change.
         */
        this.model$ = using(() => this.searchByRouting$.subscribe(), () => this.searchResults$).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Expose the `SearchCriteria`. The search criteria are driven by the route parameters.
     *
     * This search route configuration is not yet configurable
     * (see https://github.com/SAP/spartacus/issues/7191).
     */
    getCriteriaFromRoute(routeParams, queryParams) {
        return {
            query: queryParams.query || this.getQueryFromRouteParams(routeParams),
            pageSize: queryParams.pageSize || this.config.view?.defaultPageSize,
            currentPage: queryParams.currentPage,
            sortCode: queryParams.sortCode,
        };
    }
    /**
     * Resolves the search query from the given `ProductListRouteParams`.
     */
    getQueryFromRouteParams({ query, categoryCode, brandCode, }) {
        if (query) {
            return query;
        }
        if (categoryCode) {
            return this.RELEVANCE_ALLCATEGORIES + categoryCode;
        }
        // TODO: drop support for brands as they should be treated
        // similarly as any category.
        if (brandCode) {
            return this.RELEVANCE_ALLCATEGORIES + brandCode;
        }
    }
    /**
     * Performs a search based on the given search criteria.
     *
     * The search is delegated to the `ProductSearchService`.
     */
    search(criteria) {
        const currentPage = criteria.currentPage;
        const pageSize = criteria.pageSize;
        const sort = criteria.sortCode;
        this.productSearchService.search(criteria.query, 
        // TODO: consider dropping this complex passing of cleaned object
        Object.assign({}, currentPage && { currentPage }, pageSize && { pageSize }, sort && { sort }));
    }
    /**
     * Get items from a given page without using navigation
     */
    getPageItems(pageNumber) {
        this.routing
            .getRouterState()
            .subscribe((route) => {
            const routeCriteria = this.getCriteriaFromRoute(route.state.params, route.state.queryParams);
            const criteria = {
                ...routeCriteria,
                currentPage: pageNumber,
            };
            this.search(criteria);
        })
            .unsubscribe();
    }
    /**
     * Sort the search results by the given sort code.
     */
    sort(sortCode) {
        this.route({ sortCode });
    }
    /**
     * Routes to the next product listing page, using the given `queryParams`. The
     * `queryParams` support sorting, pagination and querying.
     *
     * The `queryParams` are delegated to the Angular router `NavigationExtras`.
     */
    route(queryParams) {
        this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'merge',
            relativeTo: this.activatedRoute,
        });
    }
    /**
     * The site context is used to update the search query in case of a
     * changing context. The context will typically influence the search data.
     *
     * We keep this private for now, as we're likely refactoring this in the next
     * major version.
     */
    get siteContext() {
        // TODO: we should refactor this so that custom context will be taken
        // into account automatically. Ideally, we drop the specific context
        // from the constructor, and query a ContextService for all contexts.
        return [this.languageService.getActive(), this.currencyService.getActive()];
    }
}
ProductListComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductListComponentService, deps: [{ token: i1.ProductSearchService }, { token: i1.RoutingService }, { token: i2.ActivatedRoute }, { token: i1.CurrencyService }, { token: i1.LanguageService }, { token: i2.Router }, { token: i3.ViewConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ProductListComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductListComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductListComponentService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ProductSearchService }, { type: i1.RoutingService }, { type: i2.ActivatedRoute }, { type: i1.CurrencyService }, { type: i1.LanguageService }, { type: i2.Router }, { type: i3.ViewConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0LWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9jb250YWluZXIvcHJvZHVjdC1saXN0LWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBVzNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsV0FBVyxFQUNYLEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7OztBQUl4Qjs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLDJCQUEyQjtJQUd0QyxZQUNZLG9CQUEwQyxFQUMxQyxPQUF1QixFQUN2QixjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxlQUFnQyxFQUNoQyxNQUFjLEVBQ2QsTUFBa0I7UUFObEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQVRYLDRCQUF1QixHQUFHLDJCQUEyQixDQUFDO1FBWXpFOzs7OztXQUtHO1FBQ08sbUJBQWMsR0FDdEIsSUFBSSxDQUFDLG9CQUFvQjthQUN0QixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FB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QjtrQkFEdkMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3QsXG4gIEN1cnJlbmN5U2VydmljZSxcbiAgTGFuZ3VhZ2VTZXJ2aWNlLFxuICBQcm9kdWN0U2VhcmNoUGFnZSxcbiAgUHJvZHVjdFNlYXJjaFNlcnZpY2UsXG4gIFJvdXRlclN0YXRlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIHVzaW5nIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc2hhcmVSZXBsYXksXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVmlld0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb25maWcvdmlldy1jb25maWcnO1xuaW1wb3J0IHsgUHJvZHVjdExpc3RSb3V0ZVBhcmFtcywgU2VhcmNoQ3JpdGVyaWEgfSBmcm9tICcuL3Byb2R1Y3QtbGlzdC5tb2RlbCc7XG5cbi8qKlxuICogVGhlIGBQcm9kdWN0TGlzdENvbXBvbmVudFNlcnZpY2VgIGlzIHVzZWQgdG8gc2VhcmNoIHByb2R1Y3RzLiBUaGUgc2VydmljZSBpcyB1c2VkXG4gKiBvbiB0aGUgUHJvZHVjdCBMaXN0aW5nIFBhZ2UsIGZvciBsaXN0aW5nIHByb2R1Y3RzIGFuZCB0aGUgZmFjZXQgbmF2aWdhdGlvbi5cbiAqXG4gKiBUaGUgc2VydmljZSBleHBvc2VzIHRoZSBwcm9kdWN0IHNlYXJjaCByZXN1bHRzIGJhc2VkIG9uIHRoZSBjYXRlZ29yeSBhbmQgc2VhcmNoXG4gKiByb3V0ZSBwYXJhbWV0ZXJzLiBUaGUgcm91dGUgcGFyYW1ldGVycyBhcmUgdXNlZCB0byBxdWVyeSBwcm9kdWN0cyBieSB0aGUgaGVscCBvZlxuICogdGhlIGBQcm9kdWN0U2VhcmNoU2VydmljZWAuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdExpc3RDb21wb25lbnRTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFJFTEVWQU5DRV9BTExDQVRFR09SSUVTID0gJzpyZWxldmFuY2U6YWxsQ2F0ZWdvcmllczonO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBwcm9kdWN0U2VhcmNoU2VydmljZTogUHJvZHVjdFNlYXJjaFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmc6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJvdGVjdGVkIGN1cnJlbmN5U2VydmljZTogQ3VycmVuY3lTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogVmlld0NvbmZpZ1xuICApIHt9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBzZWFyY2ggcmVzdWx0cyBmb3IgdGhlIGN1cnJlbnQgc2VhcmNoIHF1ZXJ5LlxuICAgKlxuICAgKiBUaGUgYHNlYXJjaFJlc3VsdHMkYCBpcyBfbm90XyBjb25jZXJuZWQgd2l0aCBxdWVyeWluZywgaXQgb25seSBvYnNlcnZlcyB0aGVcbiAgICogYHByb2R1Y3RTZWFyY2hTZXJ2aWNlLmdldFJlc3VsdHMoKWBcbiAgICovXG4gIHByb3RlY3RlZCBzZWFyY2hSZXN1bHRzJDogT2JzZXJ2YWJsZTxQcm9kdWN0U2VhcmNoUGFnZT4gPVxuICAgIHRoaXMucHJvZHVjdFNlYXJjaFNlcnZpY2VcbiAgICAgIC5nZXRSZXN1bHRzKClcbiAgICAgIC5waXBlKGZpbHRlcigoc2VhcmNoUmVzdWx0KSA9PiBPYmplY3Qua2V5cyhzZWFyY2hSZXN1bHQpLmxlbmd0aCA+IDApKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIHJvdXRlIGFuZCBwZXJmb3JtcyBhIHNlYXJjaCBvbiBlYWNoIHJvdXRlIGNoYW5nZS5cbiAgICpcbiAgICogQ29udGV4dCBjaGFuZ2VzLCBzdWNoIGFzIGxhbmd1YWdlIGFuZCBjdXJyZW5jaWVzIGFyZSBhbHNvIHRha2VuXG4gICAqIGludG8gYWNjb3VudCwgc28gdGhhdCB0aGUgc2VhcmNoIGlzIHBlcmZvcm1lZCBhZ2Fpbi5cbiAgICovXG4gIHByb3RlY3RlZCBzZWFyY2hCeVJvdXRpbmckOiBPYnNlcnZhYmxlPEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3Q+ID1cbiAgICBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucm91dGluZy5nZXRSb3V0ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgLy8gcm91dGVyIGVtaXRzIG5ldyB2YWx1ZSBhbHNvIHdoZW4gdGhlIGFudGljaXBhdGVkIGBuZXh0U3RhdGVgIGNoYW5nZXNcbiAgICAgICAgICAvLyBidXQgd2Ugd2FudCB0byBwZXJmb3JtIHNlYXJjaCBvbmx5IHdoZW4gY3VycmVudCB1cmwgY2hhbmdlc1xuICAgICAgICAgIHJldHVybiB4LnN0YXRlLnVybCA9PT0geS5zdGF0ZS51cmw7XG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgLi4udGhpcy5zaXRlQ29udGV4dCxcbiAgICBdKS5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDApLFxuICAgICAgbWFwKChbcm91dGVyU3RhdGUsIC4uLl9jb250ZXh0XSkgPT4gKHJvdXRlclN0YXRlIGFzIFJvdXRlclN0YXRlKS5zdGF0ZSksXG4gICAgICB0YXAoKHN0YXRlOiBBY3RpdmF0ZWRSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiB7XG4gICAgICAgIGNvbnN0IGNyaXRlcmlhID0gdGhpcy5nZXRDcml0ZXJpYUZyb21Sb3V0ZShcbiAgICAgICAgICBzdGF0ZS5wYXJhbXMsXG4gICAgICAgICAgc3RhdGUucXVlcnlQYXJhbXNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZWFyY2goY3JpdGVyaWEpO1xuICAgICAgfSlcbiAgICApO1xuXG4gIC8qKlxuICAgKiBUaGlzIHN0cmVhbSBpcyB1c2VkIGZvciB0aGUgUHJvZHVjdCBMaXN0aW5nIGFuZCBQcm9kdWN0IEZhY2V0cy5cbiAgICpcbiAgICogSXQgbm90IG9ubHkgZW1pdHMgc2VhcmNoIHJlc3VsdHMsIGJ1dCBhbHNvIHBlcmZvcm1zIGEgc2VhcmNoIG9uIGV2ZXJ5IGNoYW5nZVxuICAgKiBvZiB0aGUgcm91dGUgKGkuZS4gcm91dGUgcGFyYW1zIG9yIHF1ZXJ5IHBhcmFtcykuXG4gICAqXG4gICAqIFdoZW4gYSB1c2VyIGxlYXZlcyB0aGUgUExQIHJvdXRlLCB0aGUgUExQIGNvbXBvbmVudCB1bnN1YnNjcmliZXMgZnJvbSB0aGlzIHN0cmVhbVxuICAgKiBzbyBubyBsb25nZXIgdGhlIHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gcm91dGUgY2hhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgbW9kZWwkOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWFyY2hQYWdlPiA9IHVzaW5nKFxuICAgICgpID0+IHRoaXMuc2VhcmNoQnlSb3V0aW5nJC5zdWJzY3JpYmUoKSxcbiAgICAoKSA9PiB0aGlzLnNlYXJjaFJlc3VsdHMkXG4gICkucGlwZShzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pKTtcblxuICAvKipcbiAgICogRXhwb3NlIHRoZSBgU2VhcmNoQ3JpdGVyaWFgLiBUaGUgc2VhcmNoIGNyaXRlcmlhIGFyZSBkcml2ZW4gYnkgdGhlIHJvdXRlIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIFRoaXMgc2VhcmNoIHJvdXRlIGNvbmZpZ3VyYXRpb24gaXMgbm90IHlldCBjb25maWd1cmFibGVcbiAgICogKHNlZSBodHRwczovL2dpdGh1Yi5jb20vU0FQL3NwYXJ0YWN1cy9pc3N1ZXMvNzE5MSkuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q3JpdGVyaWFGcm9tUm91dGUoXG4gICAgcm91dGVQYXJhbXM6IFByb2R1Y3RMaXN0Um91dGVQYXJhbXMsXG4gICAgcXVlcnlQYXJhbXM6IFNlYXJjaENyaXRlcmlhXG4gICk6IFNlYXJjaENyaXRlcmlhIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6IHF1ZXJ5UGFyYW1zLnF1ZXJ5IHx8IHRoaXMuZ2V0UXVlcnlGcm9tUm91dGVQYXJhbXMocm91dGVQYXJhbXMpLFxuICAgICAgcGFnZVNpemU6IHF1ZXJ5UGFyYW1zLnBhZ2VTaXplIHx8IHRoaXMuY29uZmlnLnZpZXc/LmRlZmF1bHRQYWdlU2l6ZSxcbiAgICAgIGN1cnJlbnRQYWdlOiBxdWVyeVBhcmFtcy5jdXJyZW50UGFnZSxcbiAgICAgIHNvcnRDb2RlOiBxdWVyeVBhcmFtcy5zb3J0Q29kZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBzZWFyY2ggcXVlcnkgZnJvbSB0aGUgZ2l2ZW4gYFByb2R1Y3RMaXN0Um91dGVQYXJhbXNgLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFF1ZXJ5RnJvbVJvdXRlUGFyYW1zKHtcbiAgICBxdWVyeSxcbiAgICBjYXRlZ29yeUNvZGUsXG4gICAgYnJhbmRDb2RlLFxuICB9OiBQcm9kdWN0TGlzdFJvdXRlUGFyYW1zKSB7XG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIGlmIChjYXRlZ29yeUNvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFTEVWQU5DRV9BTExDQVRFR09SSUVTICsgY2F0ZWdvcnlDb2RlO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGRyb3Agc3VwcG9ydCBmb3IgYnJhbmRzIGFzIHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWRcbiAgICAvLyBzaW1pbGFybHkgYXMgYW55IGNhdGVnb3J5LlxuICAgIGlmIChicmFuZENvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFTEVWQU5DRV9BTExDQVRFR09SSUVTICsgYnJhbmRDb2RlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaCBiYXNlZCBvbiB0aGUgZ2l2ZW4gc2VhcmNoIGNyaXRlcmlhLlxuICAgKlxuICAgKiBUaGUgc2VhcmNoIGlzIGRlbGVnYXRlZCB0byB0aGUgYFByb2R1Y3RTZWFyY2hTZXJ2aWNlYC5cbiAgICovXG4gIHByb3RlY3RlZCBzZWFyY2goY3JpdGVyaWE6IFNlYXJjaENyaXRlcmlhKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSBjcml0ZXJpYS5jdXJyZW50UGFnZTtcbiAgICBjb25zdCBwYWdlU2l6ZSA9IGNyaXRlcmlhLnBhZ2VTaXplO1xuICAgIGNvbnN0IHNvcnQgPSBjcml0ZXJpYS5zb3J0Q29kZTtcblxuICAgIHRoaXMucHJvZHVjdFNlYXJjaFNlcnZpY2Uuc2VhcmNoKFxuICAgICAgY3JpdGVyaWEucXVlcnksXG4gICAgICAvLyBUT0RPOiBjb25zaWRlciBkcm9wcGluZyB0aGlzIGNvbXBsZXggcGFzc2luZyBvZiBjbGVhbmVkIG9iamVjdFxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIGN1cnJlbnRQYWdlICYmIHsgY3VycmVudFBhZ2UgfSxcbiAgICAgICAgcGFnZVNpemUgJiYgeyBwYWdlU2l6ZSB9LFxuICAgICAgICBzb3J0ICYmIHsgc29ydCB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRlbXMgZnJvbSBhIGdpdmVuIHBhZ2Ugd2l0aG91dCB1c2luZyBuYXZpZ2F0aW9uXG4gICAqL1xuICBnZXRQYWdlSXRlbXMocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0aW5nXG4gICAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgICAgLnN1YnNjcmliZSgocm91dGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm91dGVDcml0ZXJpYSA9IHRoaXMuZ2V0Q3JpdGVyaWFGcm9tUm91dGUoXG4gICAgICAgICAgcm91dGUuc3RhdGUucGFyYW1zLFxuICAgICAgICAgIHJvdXRlLnN0YXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNyaXRlcmlhID0ge1xuICAgICAgICAgIC4uLnJvdXRlQ3JpdGVyaWEsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VhcmNoKGNyaXRlcmlhKTtcbiAgICAgIH0pXG4gICAgICAudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0IHRoZSBzZWFyY2ggcmVzdWx0cyBieSB0aGUgZ2l2ZW4gc29ydCBjb2RlLlxuICAgKi9cbiAgc29ydChzb3J0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZSh7IHNvcnRDb2RlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdXRlcyB0byB0aGUgbmV4dCBwcm9kdWN0IGxpc3RpbmcgcGFnZSwgdXNpbmcgdGhlIGdpdmVuIGBxdWVyeVBhcmFtc2AuIFRoZVxuICAgKiBgcXVlcnlQYXJhbXNgIHN1cHBvcnQgc29ydGluZywgcGFnaW5hdGlvbiBhbmQgcXVlcnlpbmcuXG4gICAqXG4gICAqIFRoZSBgcXVlcnlQYXJhbXNgIGFyZSBkZWxlZ2F0ZWQgdG8gdGhlIEFuZ3VsYXIgcm91dGVyIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICovXG4gIHByb3RlY3RlZCByb3V0ZShxdWVyeVBhcmFtczogU2VhcmNoQ3JpdGVyaWEpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXSwge1xuICAgICAgcXVlcnlQYXJhbXMsXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiAnbWVyZ2UnLFxuICAgICAgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2l0ZSBjb250ZXh0IGlzIHVzZWQgdG8gdXBkYXRlIHRoZSBzZWFyY2ggcXVlcnkgaW4gY2FzZSBvZiBhXG4gICAqIGNoYW5naW5nIGNvbnRleHQuIFRoZSBjb250ZXh0IHdpbGwgdHlwaWNhbGx5IGluZmx1ZW5jZSB0aGUgc2VhcmNoIGRhdGEuXG4gICAqXG4gICAqIFdlIGtlZXAgdGhpcyBwcml2YXRlIGZvciBub3csIGFzIHdlJ3JlIGxpa2VseSByZWZhY3RvcmluZyB0aGlzIGluIHRoZSBuZXh0XG4gICAqIG1ham9yIHZlcnNpb24uXG4gICAqL1xuICBwcml2YXRlIGdldCBzaXRlQ29udGV4dCgpOiBPYnNlcnZhYmxlPHN0cmluZz5bXSB7XG4gICAgLy8gVE9ETzogd2Ugc2hvdWxkIHJlZmFjdG9yIHRoaXMgc28gdGhhdCBjdXN0b20gY29udGV4dCB3aWxsIGJlIHRha2VuXG4gICAgLy8gaW50byBhY2NvdW50IGF1dG9tYXRpY2FsbHkuIElkZWFsbHksIHdlIGRyb3AgdGhlIHNwZWNpZmljIGNvbnRleHRcbiAgICAvLyBmcm9tIHRoZSBjb25zdHJ1Y3RvciwgYW5kIHF1ZXJ5IGEgQ29udGV4dFNlcnZpY2UgZm9yIGFsbCBjb250ZXh0cy5cblxuICAgIHJldHVybiBbdGhpcy5sYW5ndWFnZVNlcnZpY2UuZ2V0QWN0aXZlKCksIHRoaXMuY3VycmVuY3lTZXJ2aWNlLmdldEFjdGl2ZSgpXTtcbiAgfVxufVxuIl19