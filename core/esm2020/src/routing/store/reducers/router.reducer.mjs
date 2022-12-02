/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, InjectionToken } from '@angular/core';
import * as fromNgrxRouter from '@ngrx/router-store';
import { PageType } from '../../../model/cms.model';
import { HOME_PAGE_CONTEXT, SMART_EDIT_CONTEXT, } from '../../models/page-context.model';
import { CHANGE_NEXT_PAGE_CONTEXT } from '../actions/router.action';
import * as i0 from "@angular/core";
import * as i1 from "../../configurable-routes/routing-config.service";
export const initialState = {
    navigationId: 0,
    state: {
        url: '',
        queryParams: {},
        params: {},
        context: {
            id: '',
        },
        cmsRequired: false,
        semanticRoute: undefined,
    },
    nextState: undefined,
};
export function getReducers() {
    return {
        router: reducer,
    };
}
export function reducer(state = initialState, action) {
    switch (action.type) {
        case fromNgrxRouter.ROUTER_NAVIGATION: {
            return {
                ...state,
                nextState: action.payload.routerState,
                navigationId: action.payload.event.id,
            };
        }
        case fromNgrxRouter.ROUTER_ERROR:
        case fromNgrxRouter.ROUTER_CANCEL: {
            return {
                ...state,
                nextState: undefined,
            };
        }
        case CHANGE_NEXT_PAGE_CONTEXT: {
            return state.nextState
                ? {
                    ...state,
                    nextState: { ...state.nextState, context: action.payload },
                }
                : state;
        }
        case fromNgrxRouter.ROUTER_NAVIGATED: {
            return {
                state: {
                    ...action.payload.routerState,
                    context: 
                    // we want to preserve already resolved context,
                    // in case it was changed while navigating
                    state.nextState?.context ?? action.payload.routerState.context,
                },
                navigationId: action.payload.event.id,
                nextState: undefined,
            };
        }
        default: {
            return state;
        }
    }
}
export const reducerToken = new InjectionToken('RouterReducers');
export const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};
/* The serializer is there to parse the RouterStateSnapshot,
and to reduce the amount of properties to be passed to the reducer.
 */
export class CustomSerializer {
    constructor(routingConfig) {
        this.routingConfig = routingConfig;
    }
    serialize(routerState) {
        let state = routerState.root;
        let cmsRequired = false;
        let context;
        let semanticRoute;
        let urlString = '';
        while (state.firstChild) {
            state = state.firstChild;
            urlString +=
                '/' + state.url.map((urlSegment) => urlSegment.path).join('/');
            // we use semantic route information embedded from any parent route
            if (state.data?.cxRoute) {
                semanticRoute = state.data?.cxRoute;
            }
            // we use context information embedded in Cms driven routes from any parent route
            if (state.data && state.data.cxCmsRouteContext) {
                context = state.data.cxCmsRouteContext;
            }
            // we assume, that any route that has CmsPageGuard or it's child
            // is cmsRequired
            if (!cmsRequired &&
                (context ||
                    (state.routeConfig &&
                        state.routeConfig.canActivate &&
                        state.routeConfig.canActivate.find((x) => x && x.guardName === 'CmsPageGuard')))) {
                cmsRequired = true;
            }
        }
        // If `semanticRoute` couldn't be already recognized using `data.cxRoute` property
        // let's lookup the routing configuration to find the semantic route that has exactly the same configured path as the current URL.
        // This will work only for simple URLs without any dynamic routing parameters.
        semanticRoute = semanticRoute || this.lookupSemanticRoute(urlString);
        const { params } = state;
        // we give smartedit preview page a PageContext
        if (state.url.length > 0 && state.url[0].path === 'cx-preview') {
            context = {
                id: SMART_EDIT_CONTEXT,
                type: PageType.CONTENT_PAGE,
            };
        }
        else {
            if (params['productCode']) {
                context = { id: params['productCode'], type: PageType.PRODUCT_PAGE };
            }
            else if (params['categoryCode']) {
                context = { id: params['categoryCode'], type: PageType.CATEGORY_PAGE };
            }
            else if (params['brandCode']) {
                context = { id: params['brandCode'], type: PageType.CATEGORY_PAGE };
            }
            else if (state.data.pageLabel !== undefined) {
                context = { id: state.data.pageLabel, type: PageType.CONTENT_PAGE };
            }
            else if (!context) {
                if (state.url.length > 0) {
                    const pageLabel = '/' + state.url.map((urlSegment) => urlSegment.path).join('/');
                    context = {
                        id: pageLabel,
                        type: PageType.CONTENT_PAGE,
                    };
                }
                else {
                    context = {
                        // We like URLs to be driven by the backend, the CMS actually returns the homepage
                        // if no page label is given. Our logic however requires an id. undefined doesn't work.
                        id: HOME_PAGE_CONTEXT,
                        // We currently need to support a hardcoded page type, since the internal store uses the page
                        // type to store the content.
                        type: PageType.CONTENT_PAGE,
                    };
                }
            }
        }
        return {
            url: routerState.url,
            queryParams: routerState.root.queryParams,
            params,
            context,
            cmsRequired,
            semanticRoute,
        };
    }
    /**
     * Returns the semantic route name for given page label.
     *
     * *NOTE*: It works only for simple static urls that are equal to the page label
     * of cms-driven content page. For example: `/my-account/address-book`.
     *
     * It doesn't work for URLs with dynamic parameters. But such case can be handled
     * by reading the defined `data.cxRoute` from the Angular Routes.
     *
     * @param path path to be found in the routing config
     */
    lookupSemanticRoute(path) {
        // Page label is assumed to start with `/`, but Spartacus configured paths
        // don't start with slash. So we remove the leading slash:
        return this.routingConfig.getRouteName(path.substr(1));
    }
}
CustomSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomSerializer, deps: [{ token: i1.RoutingConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CustomSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomSerializer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RoutingConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9yb3V0aW5nL3N0b3JlL3JlZHVjZXJzL3JvdXRlci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEtBQUssY0FBYyxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdwRCxPQUFPLEVBQ0wsaUJBQWlCLEVBRWpCLGtCQUFrQixHQUNuQixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFPcEUsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFnQjtJQUN2QyxZQUFZLEVBQUUsQ0FBQztJQUNmLEtBQUssRUFBRTtRQUNMLEdBQUcsRUFBRSxFQUFFO1FBQ1AsV0FBVyxFQUFFLEVBQUU7UUFDZixNQUFNLEVBQUUsRUFBRTtRQUNWLE9BQU8sRUFBRTtZQUNQLEVBQUUsRUFBRSxFQUFFO1NBQ1A7UUFDRCxXQUFXLEVBQUUsS0FBSztRQUNsQixhQUFhLEVBQUUsU0FBUztLQUN6QjtJQUNELFNBQVMsRUFBRSxTQUFTO0NBQ3JCLENBQUM7QUFFRixNQUFNLFVBQVUsV0FBVztJQUN6QixPQUFPO1FBQ0wsTUFBTSxFQUFFLE9BQU87S0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUNyQixRQUFxQixZQUFZLEVBQ2pDLE1BQVc7SUFFWCxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNyQyxPQUFPO2dCQUNMLEdBQUcsS0FBSztnQkFDUixTQUFTLEVBQUUs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VSxnQkFBZ0I7aUhBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCAqIGFzIGZyb21OZ3J4Um91dGVyIGZyb20gJ0BuZ3J4L3JvdXRlci1zdG9yZSc7XG5pbXBvcnQgeyBBY3Rpb25SZWR1Y2VyTWFwIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgUGFnZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9jbXMubW9kZWwnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWd1cmFibGUtcm91dGVzL3JvdXRpbmctY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ21zQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB9IGZyb20gJy4uLy4uL21vZGVscy9jbXMtcm91dGUnO1xuaW1wb3J0IHtcbiAgSE9NRV9QQUdFX0NPTlRFWFQsXG4gIFBhZ2VDb250ZXh0LFxuICBTTUFSVF9FRElUX0NPTlRFWFQsXG59IGZyb20gJy4uLy4uL21vZGVscy9wYWdlLWNvbnRleHQubW9kZWwnO1xuaW1wb3J0IHsgQ0hBTkdFX05FWFRfUEFHRV9DT05URVhUIH0gZnJvbSAnLi4vYWN0aW9ucy9yb3V0ZXIuYWN0aW9uJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3QsXG4gIFJvdXRlclN0YXRlLFxuICBTdGF0ZSxcbn0gZnJvbSAnLi4vcm91dGluZy1zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsU3RhdGU6IFJvdXRlclN0YXRlID0ge1xuICBuYXZpZ2F0aW9uSWQ6IDAsXG4gIHN0YXRlOiB7XG4gICAgdXJsOiAnJyxcbiAgICBxdWVyeVBhcmFtczoge30sXG4gICAgcGFyYW1zOiB7fSxcbiAgICBjb250ZXh0OiB7XG4gICAgICBpZDogJycsXG4gICAgfSxcbiAgICBjbXNSZXF1aXJlZDogZmFsc2UsXG4gICAgc2VtYW50aWNSb3V0ZTogdW5kZWZpbmVkLFxuICB9LFxuICBuZXh0U3RhdGU6IHVuZGVmaW5lZCxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWR1Y2VycygpOiBBY3Rpb25SZWR1Y2VyTWFwPFN0YXRlPiB7XG4gIHJldHVybiB7XG4gICAgcm91dGVyOiByZWR1Y2VyLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJvdXRlclN0YXRlID0gaW5pdGlhbFN0YXRlLFxuICBhY3Rpb246IGFueVxuKTogUm91dGVyU3RhdGUge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBmcm9tTmdyeFJvdXRlci5ST1VURVJfTkFWSUdBVElPTjoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5leHRTdGF0ZTogYWN0aW9uLnBheWxvYWQucm91dGVyU3RhdGUsXG4gICAgICAgIG5hdmlnYXRpb25JZDogYWN0aW9uLnBheWxvYWQuZXZlbnQuaWQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNhc2UgZnJvbU5ncnhSb3V0ZXIuUk9VVEVSX0VSUk9SOlxuICAgIGNhc2UgZnJvbU5ncnhSb3V0ZXIuUk9VVEVSX0NBTkNFTDoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG5leHRTdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjYXNlIENIQU5HRV9ORVhUX1BBR0VfQ09OVEVYVDoge1xuICAgICAgcmV0dXJuIHN0YXRlLm5leHRTdGF0ZVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgbmV4dFN0YXRlOiB7IC4uLnN0YXRlLm5leHRTdGF0ZSwgY29udGV4dDogYWN0aW9uLnBheWxvYWQgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogc3RhdGU7XG4gICAgfVxuXG4gICAgY2FzZSBmcm9tTmdyeFJvdXRlci5ST1VURVJfTkFWSUdBVEVEOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0ZToge1xuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLnJvdXRlclN0YXRlLFxuICAgICAgICAgIGNvbnRleHQ6XG4gICAgICAgICAgICAvLyB3ZSB3YW50IHRvIHByZXNlcnZlIGFscmVhZHkgcmVzb2x2ZWQgY29udGV4dCxcbiAgICAgICAgICAgIC8vIGluIGNhc2UgaXQgd2FzIGNoYW5nZWQgd2hpbGUgbmF2aWdhdGluZ1xuICAgICAgICAgICAgc3RhdGUubmV4dFN0YXRlPy5jb250ZXh0ID8/IGFjdGlvbi5wYXlsb2FkLnJvdXRlclN0YXRlLmNvbnRleHQsXG4gICAgICAgIH0sXG4gICAgICAgIG5hdmlnYXRpb25JZDogYWN0aW9uLnBheWxvYWQuZXZlbnQuaWQsXG4gICAgICAgIG5leHRTdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyVG9rZW46IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8U3RhdGU+PiA9XG4gIG5ldyBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFN0YXRlPj4oJ1JvdXRlclJlZHVjZXJzJyk7XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyUHJvdmlkZXI6IFByb3ZpZGVyID0ge1xuICBwcm92aWRlOiByZWR1Y2VyVG9rZW4sXG4gIHVzZUZhY3Rvcnk6IGdldFJlZHVjZXJzLFxufTtcblxuLyogVGhlIHNlcmlhbGl6ZXIgaXMgdGhlcmUgdG8gcGFyc2UgdGhlIFJvdXRlclN0YXRlU25hcHNob3QsXG5hbmQgdG8gcmVkdWNlIHRoZSBhbW91bnQgb2YgcHJvcGVydGllcyB0byBiZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDdXN0b21TZXJpYWxpemVyXG4gIGltcGxlbWVudHMgZnJvbU5ncnhSb3V0ZXIuUm91dGVyU3RhdGVTZXJpYWxpemVyPEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3Q+XG57XG4gIHNlcmlhbGl6ZShyb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3Qge1xuICAgIGxldCBzdGF0ZTogQ21zQWN0aXZhdGVkUm91dGVTbmFwc2hvdCA9XG4gICAgICByb3V0ZXJTdGF0ZS5yb290IGFzIENtc0FjdGl2YXRlZFJvdXRlU25hcHNob3Q7XG4gICAgbGV0IGNtc1JlcXVpcmVkID0gZmFsc2U7XG4gICAgbGV0IGNvbnRleHQ6IFBhZ2VDb250ZXh0IHwgdW5kZWZpbmVkO1xuICAgIGxldCBzZW1hbnRpY1JvdXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IHVybFN0cmluZyA9ICcnO1xuXG4gICAgd2hpbGUgKHN0YXRlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0YXRlID0gc3RhdGUuZmlyc3RDaGlsZCBhcyBDbXNBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90O1xuICAgICAgdXJsU3RyaW5nICs9XG4gICAgICAgICcvJyArIHN0YXRlLnVybC5tYXAoKHVybFNlZ21lbnQpID0+IHVybFNlZ21lbnQucGF0aCkuam9pbignLycpO1xuXG4gICAgICAvLyB3ZSB1c2Ugc2VtYW50aWMgcm91dGUgaW5mb3JtYXRpb24gZW1iZWRkZWQgZnJvbSBhbnkgcGFyZW50IHJvdXRlXG4gICAgICBpZiAoc3RhdGUuZGF0YT8uY3hSb3V0ZSkge1xuICAgICAgICBzZW1hbnRpY1JvdXRlID0gc3RhdGUuZGF0YT8uY3hSb3V0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gd2UgdXNlIGNvbnRleHQgaW5mb3JtYXRpb24gZW1iZWRkZWQgaW4gQ21zIGRyaXZlbiByb3V0ZXMgZnJvbSBhbnkgcGFyZW50IHJvdXRlXG4gICAgICBpZiAoc3RhdGUuZGF0YSAmJiBzdGF0ZS5kYXRhLmN4Q21zUm91dGVDb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQgPSBzdGF0ZS5kYXRhLmN4Q21zUm91dGVDb250ZXh0O1xuICAgICAgfVxuXG4gICAgICAvLyB3ZSBhc3N1bWUsIHRoYXQgYW55IHJvdXRlIHRoYXQgaGFzIENtc1BhZ2VHdWFyZCBvciBpdCdzIGNoaWxkXG4gICAgICAvLyBpcyBjbXNSZXF1aXJlZFxuICAgICAgaWYgKFxuICAgICAgICAhY21zUmVxdWlyZWQgJiZcbiAgICAgICAgKGNvbnRleHQgfHxcbiAgICAgICAgICAoc3RhdGUucm91dGVDb25maWcgJiZcbiAgICAgICAgICAgIHN0YXRlLnJvdXRlQ29uZmlnLmNhbkFjdGl2YXRlICYmXG4gICAgICAgICAgICBzdGF0ZS5yb3V0ZUNvbmZpZy5jYW5BY3RpdmF0ZS5maW5kKFxuICAgICAgICAgICAgICAoeCkgPT4geCAmJiB4Lmd1YXJkTmFtZSA9PT0gJ0Ntc1BhZ2VHdWFyZCdcbiAgICAgICAgICAgICkpKVxuICAgICAgKSB7XG4gICAgICAgIGNtc1JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBgc2VtYW50aWNSb3V0ZWAgY291bGRuJ3QgYmUgYWxyZWFkeSByZWNvZ25pemVkIHVzaW5nIGBkYXRhLmN4Um91dGVgIHByb3BlcnR5XG4gICAgLy8gbGV0J3MgbG9va3VwIHRoZSByb3V0aW5nIGNvbmZpZ3VyYXRpb24gdG8gZmluZCB0aGUgc2VtYW50aWMgcm91dGUgdGhhdCBoYXMgZXhhY3RseSB0aGUgc2FtZSBjb25maWd1cmVkIHBhdGggYXMgdGhlIGN1cnJlbnQgVVJMLlxuICAgIC8vIFRoaXMgd2lsbCB3b3JrIG9ubHkgZm9yIHNpbXBsZSBVUkxzIHdpdGhvdXQgYW55IGR5bmFtaWMgcm91dGluZyBwYXJhbWV0ZXJzLlxuICAgIHNlbWFudGljUm91dGUgPSBzZW1hbnRpY1JvdXRlIHx8IHRoaXMubG9va3VwU2VtYW50aWNSb3V0ZSh1cmxTdHJpbmcpO1xuXG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHN0YXRlO1xuICAgIC8vIHdlIGdpdmUgc21hcnRlZGl0IHByZXZpZXcgcGFnZSBhIFBhZ2VDb250ZXh0XG4gICAgaWYgKHN0YXRlLnVybC5sZW5ndGggPiAwICYmIHN0YXRlLnVybFswXS5wYXRoID09PSAnY3gtcHJldmlldycpIHtcbiAgICAgIGNvbnRleHQgPSB7XG4gICAgICAgIGlkOiBTTUFSVF9FRElUX0NPTlRFWFQsXG4gICAgICAgIHR5cGU6IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJhbXNbJ3Byb2R1Y3RDb2RlJ10pIHtcbiAgICAgICAgY29udGV4dCA9IHsgaWQ6IHBhcmFtc1sncHJvZHVjdENvZGUnXSwgdHlwZTogUGFnZVR5cGUuUFJPRFVDVF9QQUdFIH07XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtc1snY2F0ZWdvcnlDb2RlJ10pIHtcbiAgICAgICAgY29udGV4dCA9IHsgaWQ6IHBhcmFtc1snY2F0ZWdvcnlDb2RlJ10sIHR5cGU6IFBhZ2VUeXBlLkNBVEVHT1JZX1BBR0UgfTtcbiAgICAgIH0gZWxzZSBpZiAocGFyYW1zWydicmFuZENvZGUnXSkge1xuICAgICAgICBjb250ZXh0ID0geyBpZDogcGFyYW1zWydicmFuZENvZGUnXSwgdHlwZTogUGFnZVR5cGUuQ0FURUdPUllfUEFHRSB9O1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5kYXRhLnBhZ2VMYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRleHQgPSB7IGlkOiBzdGF0ZS5kYXRhLnBhZ2VMYWJlbCwgdHlwZTogUGFnZVR5cGUuQ09OVEVOVF9QQUdFIH07XG4gICAgICB9IGVsc2UgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgIGlmIChzdGF0ZS51cmwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHBhZ2VMYWJlbCA9XG4gICAgICAgICAgICAnLycgKyBzdGF0ZS51cmwubWFwKCh1cmxTZWdtZW50KSA9PiB1cmxTZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcbiAgICAgICAgICBjb250ZXh0ID0ge1xuICAgICAgICAgICAgaWQ6IHBhZ2VMYWJlbCxcbiAgICAgICAgICAgIHR5cGU6IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSxcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRleHQgPSB7XG4gICAgICAgICAgICAvLyBXZSBsaWtlIFVSTHMgdG8gYmUgZHJpdmVuIGJ5IHRoZSBiYWNrZW5kLCB0aGUgQ01TIGFjdHVhbGx5IHJldHVybnMgdGhlIGhvbWVwYWdlXG4gICAgICAgICAgICAvLyBpZiBubyBwYWdlIGxhYmVsIGlzIGdpdmVuLiBPdXIgbG9naWMgaG93ZXZlciByZXF1aXJlcyBhbiBpZC4gdW5kZWZpbmVkIGRvZXNuJ3Qgd29yay5cbiAgICAgICAgICAgIGlkOiBIT01FX1BBR0VfQ09OVEVYVCxcblxuICAgICAgICAgICAgLy8gV2UgY3VycmVudGx5IG5lZWQgdG8gc3VwcG9ydCBhIGhhcmRjb2RlZCBwYWdlIHR5cGUsIHNpbmNlIHRoZSBpbnRlcm5hbCBzdG9yZSB1c2VzIHRoZSBwYWdlXG4gICAgICAgICAgICAvLyB0eXBlIHRvIHN0b3JlIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgdHlwZTogUGFnZVR5cGUuQ09OVEVOVF9QQUdFLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdXJsOiByb3V0ZXJTdGF0ZS51cmwsXG4gICAgICBxdWVyeVBhcmFtczogcm91dGVyU3RhdGUucm9vdC5xdWVyeVBhcmFtcyxcbiAgICAgIHBhcmFtcyxcbiAgICAgIGNvbnRleHQsXG4gICAgICBjbXNSZXF1aXJlZCxcbiAgICAgIHNlbWFudGljUm91dGUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzZW1hbnRpYyByb3V0ZSBuYW1lIGZvciBnaXZlbiBwYWdlIGxhYmVsLlxuICAgKlxuICAgKiAqTk9URSo6IEl0IHdvcmtzIG9ubHkgZm9yIHNpbXBsZSBzdGF0aWMgdXJscyB0aGF0IGFyZSBlcXVhbCB0byB0aGUgcGFnZSBsYWJlbFxuICAgKiBvZiBjbXMtZHJpdmVuIGNvbnRlbnQgcGFnZS4gRm9yIGV4YW1wbGU6IGAvbXktYWNjb3VudC9hZGRyZXNzLWJvb2tgLlxuICAgKlxuICAgKiBJdCBkb2Vzbid0IHdvcmsgZm9yIFVSTHMgd2l0aCBkeW5hbWljIHBhcmFtZXRlcnMuIEJ1dCBzdWNoIGNhc2UgY2FuIGJlIGhhbmRsZWRcbiAgICogYnkgcmVhZGluZyB0aGUgZGVmaW5lZCBgZGF0YS5jeFJvdXRlYCBmcm9tIHRoZSBBbmd1bGFyIFJvdXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHBhdGggcGF0aCB0byBiZSBmb3VuZCBpbiB0aGUgcm91dGluZyBjb25maWdcbiAgICovXG4gIHByaXZhdGUgbG9va3VwU2VtYW50aWNSb3V0ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIFBhZ2UgbGFiZWwgaXMgYXNzdW1lZCB0byBzdGFydCB3aXRoIGAvYCwgYnV0IFNwYXJ0YWN1cyBjb25maWd1cmVkIHBhdGhzXG4gICAgLy8gZG9uJ3Qgc3RhcnQgd2l0aCBzbGFzaC4gU28gd2UgcmVtb3ZlIHRoZSBsZWFkaW5nIHNsYXNoOlxuICAgIHJldHVybiB0aGlzLnJvdXRpbmdDb25maWcuZ2V0Um91dGVOYW1lKHBhdGguc3Vic3RyKDEpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGluZ0NvbmZpZzogUm91dGluZ0NvbmZpZ1NlcnZpY2UpIHt9XG59XG4iXX0=