/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map, pluck, shareReplay, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../core/services/order-approval.service";
export class OrderApprovalDetailService {
    constructor(routingService, orderApprovalService) {
        this.routingService = routingService;
        this.orderApprovalService = orderApprovalService;
        this.approvalCode$ = this.routingService
            .getRouterState()
            .pipe(map((routingData) => routingData.state.params.approvalCode));
        this.orderApproval$ = this.approvalCode$.pipe(filter((approvalCode) => Boolean(approvalCode)), tap((approvalCode) => this.orderApprovalService.loadOrderApproval(approvalCode)), switchMap((approvalCode) => this.orderApprovalService.get(approvalCode)), shareReplay({ bufferSize: 1, refCount: true }));
        this.order$ = this.orderApproval$.pipe(pluck('order'));
    }
    /**
     * Returns a string that represents the approval code
     * found in the page url.
     */
    getOrderApprovalCodeFromRoute() {
        return this.approvalCode$;
    }
    /**
     * Returns the order data from the approval details that have been
     * retrieved from the approval code in the page url.
     */
    getOrderDetails() {
        return this.order$;
    }
    /**
     * Returns the approval details that have been retrieved from the
     * approval code in the page url.
     */
    getOrderApproval() {
        return this.orderApproval$;
    }
}
OrderApprovalDetailService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderApprovalDetailService, deps: [{ token: i1.RoutingService }, { token: i2.OrderApprovalService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalDetailService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderApprovalDetailService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderApprovalDetailService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.OrderApprovalService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtZGV0YWlsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL2NvbXBvbmVudHMvZGV0YWlscy9vcmRlci1hcHByb3ZhbC1kZXRhaWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQ0wsTUFBTSxFQUNOLEdBQUcsRUFDSCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU94QixNQUFNLE9BQU8sMEJBQTBCO0lBb0JyQyxZQUNZLGNBQThCLEVBQzlCLG9CQUEwQztRQUQxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQXJCNUMsa0JBQWEsR0FBRyxJQUFJLENBQUMsY0FBYzthQUMxQyxjQUFjLEVBQUU7YUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUUzRCxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNoRCxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUMvQyxHQUFHLENBQUMsQ0FBQyxZQUFvQixFQUFFLEVBQUUsQ0FDM0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUMxRCxFQUNELFNBQVMsQ0FBQyxDQUFDLFlBQW9CLEVBQUUsRUFBRSxDQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUM1QyxFQUNELFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQy9DLENBQUM7UUFFUSxXQUFNLEdBQXNCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM1RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQ2YsQ0FBQztJQUtDLENBQUM7SUFFSjs7O09BR0c7SUFDSCw2QkFBNkI7UUFDM0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQzs7dUhBL0NVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGZpbHRlcixcbiAgbWFwLFxuICBwbHVjayxcbiAgc2hhcmVSZXBsYXksXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9vcmRlci1hcHByb3ZhbC5tb2RlbCc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvb3JkZXItYXBwcm92YWwuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckFwcHJvdmFsRGV0YWlsU2VydmljZSB7XG4gIHByb3RlY3RlZCBhcHByb3ZhbENvZGUkID0gdGhpcy5yb3V0aW5nU2VydmljZVxuICAgIC5nZXRSb3V0ZXJTdGF0ZSgpXG4gICAgLnBpcGUobWFwKChyb3V0aW5nRGF0YSkgPT4gcm91dGluZ0RhdGEuc3RhdGUucGFyYW1zLmFwcHJvdmFsQ29kZSkpO1xuXG4gIHByb3RlY3RlZCBvcmRlckFwcHJvdmFsJCA9IHRoaXMuYXBwcm92YWxDb2RlJC5waXBlKFxuICAgIGZpbHRlcigoYXBwcm92YWxDb2RlKSA9PiBCb29sZWFuKGFwcHJvdmFsQ29kZSkpLFxuICAgIHRhcCgoYXBwcm92YWxDb2RlOiBzdHJpbmcpID0+XG4gICAgICB0aGlzLm9yZGVyQXBwcm92YWxTZXJ2aWNlLmxvYWRPcmRlckFwcHJvdmFsKGFwcHJvdmFsQ29kZSlcbiAgICApLFxuICAgIHN3aXRjaE1hcCgoYXBwcm92YWxDb2RlOiBzdHJpbmcpID0+XG4gICAgICB0aGlzLm9yZGVyQXBwcm92YWxTZXJ2aWNlLmdldChhcHByb3ZhbENvZGUpXG4gICAgKSxcbiAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICk7XG5cbiAgcHJvdGVjdGVkIG9yZGVyJDogT2JzZXJ2YWJsZTxPcmRlcj4gPSB0aGlzLm9yZGVyQXBwcm92YWwkLnBpcGUoXG4gICAgcGx1Y2soJ29yZGVyJylcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmRlckFwcHJvdmFsU2VydmljZTogT3JkZXJBcHByb3ZhbFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUgYXBwcm92YWwgY29kZVxuICAgKiBmb3VuZCBpbiB0aGUgcGFnZSB1cmwuXG4gICAqL1xuICBnZXRPcmRlckFwcHJvdmFsQ29kZUZyb21Sb3V0ZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmFwcHJvdmFsQ29kZSQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgb3JkZXIgZGF0YSBmcm9tIHRoZSBhcHByb3ZhbCBkZXRhaWxzIHRoYXQgaGF2ZSBiZWVuXG4gICAqIHJldHJpZXZlZCBmcm9tIHRoZSBhcHByb3ZhbCBjb2RlIGluIHRoZSBwYWdlIHVybC5cbiAgICovXG4gIGdldE9yZGVyRGV0YWlscygpOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMub3JkZXIkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFwcHJvdmFsIGRldGFpbHMgdGhhdCBoYXZlIGJlZW4gcmV0cmlldmVkIGZyb20gdGhlXG4gICAqIGFwcHJvdmFsIGNvZGUgaW4gdGhlIHBhZ2UgdXJsLlxuICAgKi9cbiAgZ2V0T3JkZXJBcHByb3ZhbCgpOiBPYnNlcnZhYmxlPE9yZGVyQXBwcm92YWwgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5vcmRlckFwcHJvdmFsJDtcbiAgfVxufVxuIl19