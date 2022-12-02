/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { filter, map, pluck, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../container/product-list-component.service";
/**
 * Provides access to all the facets and active facets for the Product Listing Page.
 */
export class ProductFacetService {
    constructor(routing, productListComponentService) {
        this.routing = routing;
        this.productListComponentService = productListComponentService;
        this.routeState$ = this.routing
            .getRouterState()
            .pipe(pluck('state'));
        /**
         * Returns the search results for the current page.
         */
        this.searchResult$ = this.routeState$.pipe(switchMap((state) => this.productListComponentService.model$.pipe(filter((page) => this.filterForPage(state, page)), map((page) => ({
            ...page,
            breadcrumbs: this.filterBreadcrumbs(page?.breadcrumbs ?? [], state.params),
        })))));
        /**
         * Observes the facets and active facets for the given page. The facet data
         * is provided in a `FacetList`.
         */
        this.facetList$ = this.searchResult$.pipe(map((result) => ({
            facets: result.facets,
            activeFacets: result.breadcrumbs,
        })));
    }
    /**
     * Filters the current result by verifying if the result is related to the page.
     * This is done to avoid a combination of the next page and the current search results.
     */
    filterForPage(state, page) {
        if (!page.currentQuery?.query?.value) {
            return false;
        }
        if (state.context.type === PageType.CATEGORY_PAGE) {
            return (page.currentQuery.query.value.indexOf(`allCategories:${state.context.id}`) > -1);
        }
        if (state.context.type === PageType.CONTENT_PAGE &&
            state.context.id === 'search') {
            return page.freeTextSearch === state.params.query.split(':')[0];
        }
        return false;
    }
    /**
     * Filter breadcrumbs which are not actively selected but coming from
     * the route navigation.
     *
     * The breadcrumbs might include the active category page code, which is not actively
     * selected by the user.
     */
    filterBreadcrumbs(breadcrumbs, params) {
        return breadcrumbs
            ? breadcrumbs.filter((breadcrumb) => !(breadcrumb.facetCode === 'allCategories' &&
                (breadcrumb.facetValueCode === params.categoryCode ||
                    breadcrumb.facetValueCode === params.brandCode)))
            : [];
    }
}
ProductFacetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductFacetService, deps: [{ token: i1.RoutingService }, { token: i2.ProductListComponentService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductFacetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductFacetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductFacetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.ProductListComponentService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1mYWNldC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24vc2VydmljZXMvcHJvZHVjdC1mYWNldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFHTCxRQUFRLEdBR1QsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJL0Q7O0dBRUc7QUFJSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ1ksT0FBdUIsRUFDdkIsMkJBQXdEO1FBRHhELFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFHakQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsT0FBTzthQUMxQyxjQUFjLEVBQUU7YUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXhCOztXQUVHO1FBQ2dCLGtCQUFhLEdBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNuQixTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNsQixJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUNqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDYixHQUFHLElBQUk7WUFDUCxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUNqQyxJQUFJLEVBQUUsV0FBVyxJQUFJLEVBQUUsRUFDdkIsS0FBSyxDQUFDLE1BQU0sQ0FDYjtTQUNGLENBQUMsQ0FBQyxDQUNKLENBQ0YsQ0FDRixDQUFDO1FBRUo7OztXQUdHO1FBQ00sZUFBVSxHQUEwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDbEUsR0FBRyxDQUNELENBQUMsTUFBeUIsRUFBRSxFQUFFLENBQzVCLENBQUM7WUFDQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxXQUFXO1NBQ25CLENBQUEsQ0FDbEIsQ0FDRixDQUFDO0lBckNDLENBQUM7SUF1Q0o7OztPQUdHO0lBQ08sYUFBYSxDQUNyQixLQUFtQyxFQUNuQyxJQUF1QjtRQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDakQsT0FBTyxDQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ25DLGlCQUFpQixLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxDQUNQLENBQUM7U0FDSDtRQUVELElBQ0UsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLFlBQVk7WUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUM3QjtZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxpQkFBaUIsQ0FDekIsV0FBeUIsRUFDekIsTUFBYztRQUVkLE9BQU8sV0FBVztZQUNoQixDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDaEIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUNiLENBQUMsQ0FDQyxVQUFVLENBQUMsU0FBUyxLQUFLLGVBQWU7Z0JBQ3hDLENBQUMsVUFBVSxDQUFDLGNBQWMsS0FBSyxNQUFNLENBQUMsWUFBWTtvQkFDaEQsVUFBVSxDQUFDLGNBQWMsS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQ2xELENBQ0o7WUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQzs7Z0hBNUZVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBY3RpdmF0ZWRSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICBCcmVhZGNydW1iLFxuICBQYWdlVHlwZSxcbiAgUHJvZHVjdFNlYXJjaFBhZ2UsXG4gIFJvdXRpbmdTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHBsdWNrLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9kdWN0TGlzdENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250YWluZXIvcHJvZHVjdC1saXN0LWNvbXBvbmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEZhY2V0TGlzdCB9IGZyb20gJy4uL2ZhY2V0Lm1vZGVsJztcblxuLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gYWxsIHRoZSBmYWNldHMgYW5kIGFjdGl2ZSBmYWNldHMgZm9yIHRoZSBQcm9kdWN0IExpc3RpbmcgUGFnZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RGYWNldFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZzogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RMaXN0Q29tcG9uZW50U2VydmljZTogUHJvZHVjdExpc3RDb21wb25lbnRTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcm91dGVTdGF0ZSQgPSB0aGlzLnJvdXRpbmdcbiAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgIC5waXBlKHBsdWNrKCdzdGF0ZScpKTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2VhcmNoIHJlc3VsdHMgZm9yIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2VhcmNoUmVzdWx0JDogT2JzZXJ2YWJsZTxQcm9kdWN0U2VhcmNoUGFnZT4gPVxuICAgIHRoaXMucm91dGVTdGF0ZSQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc3RhdGUpID0+XG4gICAgICAgIHRoaXMucHJvZHVjdExpc3RDb21wb25lbnRTZXJ2aWNlLm1vZGVsJC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGFnZSkgPT4gdGhpcy5maWx0ZXJGb3JQYWdlKHN0YXRlLCBwYWdlKSksXG4gICAgICAgICAgbWFwKChwYWdlKSA9PiAoe1xuICAgICAgICAgICAgLi4ucGFnZSxcbiAgICAgICAgICAgIGJyZWFkY3J1bWJzOiB0aGlzLmZpbHRlckJyZWFkY3J1bWJzKFxuICAgICAgICAgICAgICBwYWdlPy5icmVhZGNydW1icyA/PyBbXSxcbiAgICAgICAgICAgICAgc3RhdGUucGFyYW1zXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0pKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIGZhY2V0cyBhbmQgYWN0aXZlIGZhY2V0cyBmb3IgdGhlIGdpdmVuIHBhZ2UuIFRoZSBmYWNldCBkYXRhXG4gICAqIGlzIHByb3ZpZGVkIGluIGEgYEZhY2V0TGlzdGAuXG4gICAqL1xuICByZWFkb25seSBmYWNldExpc3QkOiBPYnNlcnZhYmxlPEZhY2V0TGlzdD4gPSB0aGlzLnNlYXJjaFJlc3VsdCQucGlwZShcbiAgICBtYXAoXG4gICAgICAocmVzdWx0OiBQcm9kdWN0U2VhcmNoUGFnZSkgPT5cbiAgICAgICAgKHtcbiAgICAgICAgICBmYWNldHM6IHJlc3VsdC5mYWNldHMsXG4gICAgICAgICAgYWN0aXZlRmFjZXRzOiByZXN1bHQuYnJlYWRjcnVtYnMsXG4gICAgICAgIH0gYXMgRmFjZXRMaXN0KVxuICAgIClcbiAgKTtcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY3VycmVudCByZXN1bHQgYnkgdmVyaWZ5aW5nIGlmIHRoZSByZXN1bHQgaXMgcmVsYXRlZCB0byB0aGUgcGFnZS5cbiAgICogVGhpcyBpcyBkb25lIHRvIGF2b2lkIGEgY29tYmluYXRpb24gb2YgdGhlIG5leHQgcGFnZSBhbmQgdGhlIGN1cnJlbnQgc2VhcmNoIHJlc3VsdHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZmlsdGVyRm9yUGFnZShcbiAgICBzdGF0ZTogQWN0aXZhdGVkUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgICBwYWdlOiBQcm9kdWN0U2VhcmNoUGFnZVxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIXBhZ2UuY3VycmVudFF1ZXJ5Py5xdWVyeT8udmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0YXRlLmNvbnRleHQudHlwZSA9PT0gUGFnZVR5cGUuQ0FURUdPUllfUEFHRSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcGFnZS5jdXJyZW50UXVlcnkucXVlcnkudmFsdWUuaW5kZXhPZihcbiAgICAgICAgICBgYWxsQ2F0ZWdvcmllczoke3N0YXRlLmNvbnRleHQuaWR9YFxuICAgICAgICApID4gLTFcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgc3RhdGUuY29udGV4dC50eXBlID09PSBQYWdlVHlwZS5DT05URU5UX1BBR0UgJiZcbiAgICAgIHN0YXRlLmNvbnRleHQuaWQgPT09ICdzZWFyY2gnXG4gICAgKSB7XG4gICAgICByZXR1cm4gcGFnZS5mcmVlVGV4dFNlYXJjaCA9PT0gc3RhdGUucGFyYW1zLnF1ZXJ5LnNwbGl0KCc6JylbMF07XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgYnJlYWRjcnVtYnMgd2hpY2ggYXJlIG5vdCBhY3RpdmVseSBzZWxlY3RlZCBidXQgY29taW5nIGZyb21cbiAgICogdGhlIHJvdXRlIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIFRoZSBicmVhZGNydW1icyBtaWdodCBpbmNsdWRlIHRoZSBhY3RpdmUgY2F0ZWdvcnkgcGFnZSBjb2RlLCB3aGljaCBpcyBub3QgYWN0aXZlbHlcbiAgICogc2VsZWN0ZWQgYnkgdGhlIHVzZXIuXG4gICAqL1xuICBwcm90ZWN0ZWQgZmlsdGVyQnJlYWRjcnVtYnMoXG4gICAgYnJlYWRjcnVtYnM6IEJyZWFkY3J1bWJbXSxcbiAgICBwYXJhbXM6IFBhcmFtc1xuICApOiBCcmVhZGNydW1iW10ge1xuICAgIHJldHVybiBicmVhZGNydW1ic1xuICAgICAgPyBicmVhZGNydW1icy5maWx0ZXIoXG4gICAgICAgICAgKGJyZWFkY3J1bWIpID0+XG4gICAgICAgICAgICAhKFxuICAgICAgICAgICAgICBicmVhZGNydW1iLmZhY2V0Q29kZSA9PT0gJ2FsbENhdGVnb3JpZXMnICYmXG4gICAgICAgICAgICAgIChicmVhZGNydW1iLmZhY2V0VmFsdWVDb2RlID09PSBwYXJhbXMuY2F0ZWdvcnlDb2RlIHx8XG4gICAgICAgICAgICAgICAgYnJlYWRjcnVtYi5mYWNldFZhbHVlQ29kZSA9PT0gcGFyYW1zLmJyYW5kQ29kZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgOiBbXTtcbiAgfVxufVxuIl19