/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, shareReplay, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/order/root";
import * as i2 from "@spartacus/core";
export class OrderDetailsService {
    constructor(orderHistoryFacade, routingService) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.routingService = routingService;
        this.orderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.orderCode), distinctUntilChanged());
        this.orderLoad$ = this.orderCode$.pipe(tap((orderCode) => {
            if (orderCode) {
                this.orderHistoryFacade.loadOrderDetails(orderCode);
            }
            else {
                this.orderHistoryFacade.clearOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getOrderDetails() {
        return this.orderLoad$.pipe(switchMap(() => this.orderHistoryFacade.getOrderDetails()));
    }
}
OrderDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsService, deps: [{ token: i1.OrderHistoryFacade }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }, { type: i2.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixHQUFHLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUt4QixNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQ1Usa0JBQXNDLEVBQ3RDLGNBQThCO1FBRDlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQ3pELEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQ3hELG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoQixJQUFJLFNBQVMsRUFBRTtnQkFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDN0M7UUFDSCxDQUFDLENBQUMsRUFDRixXQUFXLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUMvQyxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN6QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQzNELENBQUM7SUFDSixDQUFDOztnSEE3QlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXIsIE9yZGVySGlzdG9yeUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyRGV0YWlsc1NlcnZpY2Uge1xuICBvcmRlckNvZGUkOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIG9yZGVyTG9hZCQ6IE9ic2VydmFibGU8e30+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3JkZXJIaXN0b3J5RmFjYWRlOiBPcmRlckhpc3RvcnlGYWNhZGUsXG4gICAgcHJpdmF0ZSByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5vcmRlckNvZGUkID0gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRSb3V0ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICBtYXAoKHJvdXRpbmdEYXRhKSA9PiByb3V0aW5nRGF0YS5zdGF0ZS5wYXJhbXMub3JkZXJDb2RlKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApO1xuXG4gICAgdGhpcy5vcmRlckxvYWQkID0gdGhpcy5vcmRlckNvZGUkLnBpcGUoXG4gICAgICB0YXAoKG9yZGVyQ29kZSkgPT4ge1xuICAgICAgICBpZiAob3JkZXJDb2RlKSB7XG4gICAgICAgICAgdGhpcy5vcmRlckhpc3RvcnlGYWNhZGUubG9hZE9yZGVyRGV0YWlscyhvcmRlckNvZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlLmNsZWFyT3JkZXJEZXRhaWxzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cblxuICBnZXRPcmRlckRldGFpbHMoKTogT2JzZXJ2YWJsZTxPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLm9yZGVyTG9hZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm9yZGVySGlzdG9yeUZhY2FkZS5nZXRPcmRlckRldGFpbHMoKSlcbiAgICApO1xuICB9XG59XG4iXX0=