/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { isNotUndefined } from '../../../util/type-guards';
import { CmsActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/component/cms-component.connector";
import * as i3 from "../../../routing/index";
export class NavigationEntryItemEffects {
    constructor(actions$, cmsComponentConnector, routingService) {
        this.actions$ = actions$;
        this.cmsComponentConnector = cmsComponentConnector;
        this.routingService = routingService;
        this.loadNavigationItems$ = createEffect(() => this.actions$.pipe(ofType(CmsActions.LOAD_CMS_NAVIGATION_ITEMS), map((action) => action.payload), map((payload) => {
            return {
                ids: this.getIdListByItemType(payload.items),
                nodeId: payload.nodeId,
            };
        }), mergeMap((data) => {
            if (data.ids.componentIds.length > 0) {
                return this.routingService.getRouterState().pipe(filter(isNotUndefined), map((routerState) => routerState.state.context), take(1), mergeMap((pageContext) => 
                // download all items in one request
                this.cmsComponentConnector
                    .getList(data.ids.componentIds, pageContext)
                    .pipe(map((components) => new CmsActions.LoadCmsNavigationItemsSuccess({
                    nodeId: data.nodeId,
                    components: components,
                })), catchError((error) => of(new CmsActions.LoadCmsNavigationItemsFail(data.nodeId, normalizeHttpError(error)))))));
                //} else if (data.ids.pageIds.length > 0) {
                // TODO: future work
                // dispatch action to load cms page one by one
                //} else if (data.ids.mediaIds.length > 0) {
                // TODO: future work
                // send request to get list of media
            }
            else {
                return of(new CmsActions.LoadCmsNavigationItemsFail(data.nodeId, 'navigation nodes are empty'));
            }
        })));
    }
    // We only consider 3 item types: cms page, cms component, and media.
    getIdListByItemType(itemList) {
        const pageIds = [];
        const componentIds = [];
        const mediaIds = [];
        itemList.forEach((item) => {
            if (item.superType === 'AbstractCMSComponent') {
                componentIds.push(item.id);
            }
            else if (item.superType === 'AbstractPage') {
                pageIds.push(item.id);
            }
            else if (item.superType === 'AbstractMedia') {
                mediaIds.push(item.id);
            }
        });
        return { pageIds: pageIds, componentIds: componentIds, mediaIds: mediaIds };
    }
}
NavigationEntryItemEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationEntryItemEffects, deps: [{ token: i1.Actions }, { token: i2.CmsComponentConnector }, { token: i3.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationEntryItemEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationEntryItemEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationEntryItemEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CmsComponentConnector }, { type: i3.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1lbnRyeS1pdGVtLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Ntcy9zdG9yZS9lZmZlY3RzL25hdmlnYXRpb24tZW50cnktaXRlbS5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBRzlDLE1BQU0sT0FBTywwQkFBMEI7SUFtRnJDLFlBQ1UsUUFBaUIsRUFDakIscUJBQTRDLEVBQzVDLGNBQThCO1FBRjlCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFyRnhDLHlCQUFvQixHQUdoQixZQUFZLENBQUMsR0FBRyxFQUFFLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQzVDLEdBQUcsQ0FBQyxDQUFDLE1BQXlDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDbEUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPO2dCQUNMLEdBQUcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDNUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2FBQ3ZCLENBQUM7UUFDSixDQUFDLENBQUMsRUFDRixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUMvQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3ZCLG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLHFCQUFxQjtxQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztxQkFDM0MsSUFBSSxDQUNILEdBQUcsQ0FDRCxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQ2IsSUFBSSxVQUFVLENBQUMsNkJBQTZCLENBQUM7b0JBQzNDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsVUFBVSxFQUFFLFVBQVU7aUJBQ3ZCLENBQUMsQ0FDTCxFQUNELFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25CLEVBQUUsQ0FDQSxJQUFJLFVBQVUsQ0FBQywwQkFBMEIsQ0FDdkMsSUFBSSxDQUFDLE1BQU0sRUFDWCxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FDMUIsQ0FDRixDQUNGLENBQ0YsQ0FDSixDQUNGLENBQUM7Z0JBQ0YsMkNBQTJDO2dCQUMzQyxvQkFBb0I7Z0JBQ3BCLDhDQUE4QztnQkFDOUMsNENBQTRDO2dCQUM1QyxvQkFBb0I7Z0JBQ3BCLG9DQUFvQzthQUNyQztpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FDUCxJQUFJLFVBQVUsQ0FBQywwQkFBMEIsQ0FDdkMsSUFBSSxDQUFDLE1BQU0sRUFDWCw0QkFBNEIsQ0FDN0IsQ0FDRixDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUE0QkMsQ0FBQztJQTFCSixxRUFBcUU7SUFDckUsbUJBQW1CLENBQUMsUUFBZTtRQUtqQyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUU5QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLHNCQUFzQixFQUFFO2dCQUM3QyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssY0FBYyxFQUFFO2dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QjtpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssZUFBZSxFQUFFO2dCQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDOUUsQ0FBQzs7dUhBakZVLDBCQUEwQjsySEFBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zLCBjcmVhdGVFZmZlY3QsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpbHRlciwgbWFwLCBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcm91dGluZy9pbmRleCc7XG5pbXBvcnQgeyBub3JtYWxpemVIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi8uLi91dGlsL25vcm1hbGl6ZS1odHRwLWVycm9yJztcbmltcG9ydCB7IGlzTm90VW5kZWZpbmVkIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC90eXBlLWd1YXJkcyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRDb25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL2NvbXBvbmVudC9jbXMtY29tcG9uZW50LmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBDbXNBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uRW50cnlJdGVtRWZmZWN0cyB7XG4gIGxvYWROYXZpZ2F0aW9uSXRlbXMkOiBPYnNlcnZhYmxlPFxuICAgIHwgQ21zQWN0aW9ucy5Mb2FkQ21zTmF2aWdhdGlvbkl0ZW1zU3VjY2Vzc1xuICAgIHwgQ21zQWN0aW9ucy5Mb2FkQ21zTmF2aWdhdGlvbkl0ZW1zRmFpbFxuICA+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKENtc0FjdGlvbnMuTE9BRF9DTVNfTkFWSUdBVElPTl9JVEVNUyksXG4gICAgICBtYXAoKGFjdGlvbjogQ21zQWN0aW9ucy5Mb2FkQ21zTmF2aWdhdGlvbkl0ZW1zKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICBtYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZHM6IHRoaXMuZ2V0SWRMaXN0QnlJdGVtVHlwZShwYXlsb2FkLml0ZW1zKSxcbiAgICAgICAgICBub2RlSWQ6IHBheWxvYWQubm9kZUlkLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5pZHMuY29tcG9uZW50SWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRSb3V0ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgICAgICAgbWFwKChyb3V0ZXJTdGF0ZSkgPT4gcm91dGVyU3RhdGUuc3RhdGUuY29udGV4dCksXG4gICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgbWVyZ2VNYXAoKHBhZ2VDb250ZXh0KSA9PlxuICAgICAgICAgICAgICAvLyBkb3dubG9hZCBhbGwgaXRlbXMgaW4gb25lIHJlcXVlc3RcbiAgICAgICAgICAgICAgdGhpcy5jbXNDb21wb25lbnRDb25uZWN0b3JcbiAgICAgICAgICAgICAgICAuZ2V0TGlzdChkYXRhLmlkcy5jb21wb25lbnRJZHMsIHBhZ2VDb250ZXh0KVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAoY29tcG9uZW50cykgPT5cbiAgICAgICAgICAgICAgICAgICAgICBuZXcgQ21zQWN0aW9ucy5Mb2FkQ21zTmF2aWdhdGlvbkl0ZW1zU3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlSWQ6IGRhdGEubm9kZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50czogY29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgICAgICAgICBuZXcgQ21zQWN0aW9ucy5Mb2FkQ21zTmF2aWdhdGlvbkl0ZW1zRmFpbChcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubm9kZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplSHR0cEVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vfSBlbHNlIGlmIChkYXRhLmlkcy5wYWdlSWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBUT0RPOiBmdXR1cmUgd29ya1xuICAgICAgICAgIC8vIGRpc3BhdGNoIGFjdGlvbiB0byBsb2FkIGNtcyBwYWdlIG9uZSBieSBvbmVcbiAgICAgICAgICAvL30gZWxzZSBpZiAoZGF0YS5pZHMubWVkaWFJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIFRPRE86IGZ1dHVyZSB3b3JrXG4gICAgICAgICAgLy8gc2VuZCByZXF1ZXN0IHRvIGdldCBsaXN0IG9mIG1lZGlhXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKFxuICAgICAgICAgICAgbmV3IENtc0FjdGlvbnMuTG9hZENtc05hdmlnYXRpb25JdGVtc0ZhaWwoXG4gICAgICAgICAgICAgIGRhdGEubm9kZUlkLFxuICAgICAgICAgICAgICAnbmF2aWdhdGlvbiBub2RlcyBhcmUgZW1wdHknXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgLy8gV2Ugb25seSBjb25zaWRlciAzIGl0ZW0gdHlwZXM6IGNtcyBwYWdlLCBjbXMgY29tcG9uZW50LCBhbmQgbWVkaWEuXG4gIGdldElkTGlzdEJ5SXRlbVR5cGUoaXRlbUxpc3Q6IGFueVtdKToge1xuICAgIHBhZ2VJZHM6IHN0cmluZ1tdO1xuICAgIGNvbXBvbmVudElkczogc3RyaW5nW107XG4gICAgbWVkaWFJZHM6IHN0cmluZ1tdO1xuICB9IHtcbiAgICBjb25zdCBwYWdlSWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGNvbXBvbmVudElkczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBtZWRpYUlkczogc3RyaW5nW10gPSBbXTtcblxuICAgIGl0ZW1MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLnN1cGVyVHlwZSA9PT0gJ0Fic3RyYWN0Q01TQ29tcG9uZW50Jykge1xuICAgICAgICBjb21wb25lbnRJZHMucHVzaChpdGVtLmlkKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5zdXBlclR5cGUgPT09ICdBYnN0cmFjdFBhZ2UnKSB7XG4gICAgICAgIHBhZ2VJZHMucHVzaChpdGVtLmlkKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5zdXBlclR5cGUgPT09ICdBYnN0cmFjdE1lZGlhJykge1xuICAgICAgICBtZWRpYUlkcy5wdXNoKGl0ZW0uaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7IHBhZ2VJZHM6IHBhZ2VJZHMsIGNvbXBvbmVudElkczogY29tcG9uZW50SWRzLCBtZWRpYUlkczogbWVkaWFJZHMgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBjbXNDb21wb25lbnRDb25uZWN0b3I6IENtc0NvbXBvbmVudENvbm5lY3RvcixcbiAgICBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZVxuICApIHt9XG59XG4iXX0=