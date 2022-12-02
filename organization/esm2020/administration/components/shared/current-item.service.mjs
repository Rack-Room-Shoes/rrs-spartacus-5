/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Abstract Base class for all organization entities. This class simplifies
 * the various entity implementation, that only differ by dependencies and
 * data model.
 */
export class CurrentItemService {
    constructor(routingService) {
        this.routingService = routingService;
        /**
         * Observes the key for the active organization item. The active key is observed
         * from the list of route parameters. The full route parameter list is evaluated,
         * including child routes.
         *
         * To allow for specific ("semantic") route parameters, the route parameter _key_ is
         * retrieved from the `getParamKey`.
         */
        this.key$ = this.routingService
            .getParams()
            .pipe(pluck(this.getParamKey()), distinctUntilChanged());
        /**
         * Observes the active item.
         *
         * The active item is loaded by the active `key$`.
         */
        this.item$ = this.key$.pipe(switchMap((code) => (code ? this.getItem(code) : of(undefined))));
        /**
         * Observes the b2bUnit based on the unitCode route parameter.
         */
        this.b2bUnit$ = this.routingService
            .getParams()
            .pipe(pluck(ROUTE_PARAMS.unitCode), distinctUntilChanged());
    }
    getRouterParam(paramKey) {
        return this.routingService
            .getParams()
            .pipe(map((params) => params[paramKey]));
    }
}
CurrentItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CurrentItemService, deps: [{ token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CurrentItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CurrentItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2N1cnJlbnQtaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFN0U7Ozs7R0FJRztBQUVILE1BQU0sT0FBZ0Isa0JBQWtCO0lBQ3RDLFlBQXNCLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUVwRDs7Ozs7OztXQU9HO1FBQ00sU0FBSSxHQUF1QixJQUFJLENBQUMsY0FBYzthQUNwRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUUzRDs7OztXQUlHO1FBQ00sVUFBSyxHQUE4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDeEQsU0FBUyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FDekUsQ0FBQztRQUVGOztXQUVHO1FBQ00sYUFBUSxHQUF1QixJQUFJLENBQUMsY0FBYzthQUN4RCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUE1QlAsQ0FBQztJQXlDeEQsY0FBYyxDQUFDLFFBQWdCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWM7YUFDdkIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDOzsrR0E5Q21CLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRHZDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBwbHVjaywgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEFic3RyYWN0IEJhc2UgY2xhc3MgZm9yIGFsbCBvcmdhbml6YXRpb24gZW50aXRpZXMuIFRoaXMgY2xhc3Mgc2ltcGxpZmllc1xuICogdGhlIHZhcmlvdXMgZW50aXR5IGltcGxlbWVudGF0aW9uLCB0aGF0IG9ubHkgZGlmZmVyIGJ5IGRlcGVuZGVuY2llcyBhbmRcbiAqIGRhdGEgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDdXJyZW50SXRlbVNlcnZpY2U8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUga2V5IGZvciB0aGUgYWN0aXZlIG9yZ2FuaXphdGlvbiBpdGVtLiBUaGUgYWN0aXZlIGtleSBpcyBvYnNlcnZlZFxuICAgKiBmcm9tIHRoZSBsaXN0IG9mIHJvdXRlIHBhcmFtZXRlcnMuIFRoZSBmdWxsIHJvdXRlIHBhcmFtZXRlciBsaXN0IGlzIGV2YWx1YXRlZCxcbiAgICogaW5jbHVkaW5nIGNoaWxkIHJvdXRlcy5cbiAgICpcbiAgICogVG8gYWxsb3cgZm9yIHNwZWNpZmljIChcInNlbWFudGljXCIpIHJvdXRlIHBhcmFtZXRlcnMsIHRoZSByb3V0ZSBwYXJhbWV0ZXIgX2tleV8gaXNcbiAgICogcmV0cmlldmVkIGZyb20gdGhlIGBnZXRQYXJhbUtleWAuXG4gICAqL1xuICByZWFkb25seSBrZXkkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLnJvdXRpbmdTZXJ2aWNlXG4gICAgLmdldFBhcmFtcygpXG4gICAgLnBpcGUocGx1Y2sodGhpcy5nZXRQYXJhbUtleSgpKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBhY3RpdmUgaXRlbS5cbiAgICpcbiAgICogVGhlIGFjdGl2ZSBpdGVtIGlzIGxvYWRlZCBieSB0aGUgYWN0aXZlIGBrZXkkYC5cbiAgICovXG4gIHJlYWRvbmx5IGl0ZW0kOiBPYnNlcnZhYmxlPFQgfCB1bmRlZmluZWQ+ID0gdGhpcy5rZXkkLnBpcGUoXG4gICAgc3dpdGNoTWFwKChjb2RlOiBzdHJpbmcpID0+IChjb2RlID8gdGhpcy5nZXRJdGVtKGNvZGUpIDogb2YodW5kZWZpbmVkKSkpXG4gICk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBiMmJVbml0IGJhc2VkIG9uIHRoZSB1bml0Q29kZSByb3V0ZSBwYXJhbWV0ZXIuXG4gICAqL1xuICByZWFkb25seSBiMmJVbml0JDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5yb3V0aW5nU2VydmljZVxuICAgIC5nZXRQYXJhbXMoKVxuICAgIC5waXBlKHBsdWNrKFJPVVRFX1BBUkFNUy51bml0Q29kZSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb3V0ZSBwYXJhbWV0ZXIga2V5IGZvciB0aGUgaXRlbS4gVGhlIHJvdXRlIHBhcmFtZXRlciBrZXkgZGlmZmVyc1xuICAgKiBwZXIgaXRlbSwgc28gdGhhdCByb3V0ZSBwYXJhbWV0ZXJzIGFyZSBkaXN0aW5ndWlzaGVkIGluIHRoZSByb3V0ZSBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdldFBhcmFtS2V5KCk6IHN0cmluZztcblxuICAvKipcbiAgICogRW1pdHMgdGhlIGN1cnJlbnQgbW9kZWwgb3IgdW5kZWZpbmVkLCBpZiB0aGVyZSBpcyBubyBtb2RlbCBhdmFpbGFibGVcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRJdGVtKC4uLnBhcmFtczogYW55W10pOiBPYnNlcnZhYmxlPFQgfCB1bmRlZmluZWQ+O1xuXG4gIGdldFJvdXRlclBhcmFtKHBhcmFtS2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdTZXJ2aWNlXG4gICAgICAuZ2V0UGFyYW1zKClcbiAgICAgIC5waXBlKG1hcCgocGFyYW1zKSA9PiBwYXJhbXNbcGFyYW1LZXldKSk7XG4gIH1cblxuICBhYnN0cmFjdCBnZXRFcnJvcihfa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuIl19