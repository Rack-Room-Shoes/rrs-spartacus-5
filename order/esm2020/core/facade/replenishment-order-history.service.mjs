/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { ProcessSelectors, } from '@spartacus/core';
import { map, tap } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import { CANCEL_REPLENISHMENT_ORDER_PROCESS_ID, } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
export class ReplenishmentOrderHistoryService {
    constructor(store, processStateStore, userIdService) {
        this.store = store;
        this.processStateStore = processStateStore;
        this.userIdService = userIdService;
    }
    /**
     * Returns replenishment order details for a given 'current' user
     *
     * @param replenishmentOrderCode a replenishment order code
     */
    loadReplenishmentOrderDetails(replenishmentOrderCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            this.store.dispatch(new OrderActions.LoadReplenishmentOrderDetails({
                userId,
                replenishmentOrderCode,
            }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Returns a replenishment order details
     */
    getReplenishmentOrderDetails() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsValue));
    }
    /**
     * Returns a replenishment order details loading flag
     */
    getReplenishmentOrderDetailsLoading() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsLoading));
    }
    /**
     * Returns a replenishment order details success flag
     */
    getReplenishmentOrderDetailsSuccess() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsSuccess));
    }
    /**
     * Returns a replenishment order details error flag
     */
    getReplenishmentOrderDetailsError() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsError));
    }
    /**
     * Clears the replenishment orders details state
     */
    clearReplenishmentOrderDetails() {
        this.store.dispatch(new OrderActions.ClearReplenishmentOrderDetails());
    }
    /**
     * Cancels a specific replenishment order for a given 'current' user
     *
     * @param replenishmentOrderCode a replenishment order code
     */
    cancelReplenishmentOrder(replenishmentOrderCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            this.store.dispatch(new OrderActions.CancelReplenishmentOrder({
                userId,
                replenishmentOrderCode,
            }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Returns the cancel replenishment order loading flag
     */
    getCancelReplenishmentOrderLoading() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessLoadingFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel replenishment order success flag
     */
    getCancelReplenishmentOrderSuccess() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessSuccessFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel replenishment order error flag
     */
    getCancelReplenishmentOrderError() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessErrorFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Clears the cancel replenishment order processing state
     */
    clearCancelReplenishmentOrderProcessState() {
        this.store.dispatch(new OrderActions.ClearCancelReplenishmentOrder());
    }
    /**
     * Returns replenishment order history list
     */
    getReplenishmentOrderHistoryList(pageSize) {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersState), tap((replenishmentOrderListState) => {
            const attemptedLoad = replenishmentOrderListState.loading ||
                replenishmentOrderListState.success ||
                replenishmentOrderListState.error;
            if (!attemptedLoad) {
                this.loadReplenishmentOrderList(pageSize);
            }
        }), map((replenishmentOrderListState) => replenishmentOrderListState.value));
    }
    /**
     * Returns a loading flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListLoading() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersLoading));
    }
    /**
     * Returns a error flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListError() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersError));
    }
    /**
     * Returns a success flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListSuccess() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersSuccess));
    }
    /**
     * Retrieves a replenishment order list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadReplenishmentOrderList(pageSize, currentPage, sort) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            this.store.dispatch(new OrderActions.LoadUserReplenishmentOrders({
                userId,
                pageSize,
                currentPage,
                sort,
            }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Cleaning replenishment order list
     */
    clearReplenishmentOrderList() {
        this.store.dispatch(new OrderActions.ClearUserReplenishmentOrders());
    }
}
ReplenishmentOrderHistoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryService, deps: [{ token: i1.Store }, { token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderHistoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29yZS9mYWNhZGUvcmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQ0wsZ0JBQWdCLEdBR2pCLE1BQU0saUJBQWlCLENBQUM7QUFPekIsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUNMLHFDQUFxQyxHQUV0QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUcxRCxNQUFNLE9BQU8sZ0NBQWdDO0lBRzNDLFlBQ1ksS0FBNEIsRUFDNUIsaUJBQWdELEVBQ2hELGFBQTRCO1FBRjVCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBK0I7UUFDaEQsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDckMsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCw2QkFBNkIsQ0FBQyxzQkFBOEI7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUMzQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLElBQUksWUFBWSxDQUFDLDZCQUE2QixDQUFDO2dCQUM3QyxNQUFNO2dCQUNOLHNCQUFzQjthQUN2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OzZIQTNOVSxnQ0FBZ0M7aUlBQWhDLGdDQUFnQzsyRkFBaEMsZ0NBQWdDO2tCQUQ1QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIFByb2Nlc3NTZWxlY3RvcnMsXG4gIFN0YXRlV2l0aFByb2Nlc3MsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBSZXBsZW5pc2htZW50T3JkZXIsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlGYWNhZGUsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckxpc3QsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ0FOQ0VMX1JFUExFTklTSE1FTlRfT1JERVJfUFJPQ0VTU19JRCxcbiAgU3RhdGVXaXRoT3JkZXIsXG59IGZyb20gJy4uL3N0b3JlL29yZGVyLXN0YXRlJztcbmltcG9ydCB7IE9yZGVyU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlTZXJ2aWNlXG4gIGltcGxlbWVudHMgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUZhY2FkZVxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aE9yZGVyPixcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc1N0YXRlU3RvcmU6IFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyByZXBsZW5pc2htZW50IG9yZGVyIGRldGFpbHMgZm9yIGEgZ2l2ZW4gJ2N1cnJlbnQnIHVzZXJcbiAgICpcbiAgICogQHBhcmFtIHJlcGxlbmlzaG1lbnRPcmRlckNvZGUgYSByZXBsZW5pc2htZW50IG9yZGVyIGNvZGVcbiAgICovXG4gIGxvYWRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzKHJlcGxlbmlzaG1lbnRPcmRlckNvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZShcbiAgICAgICh1c2VySWQpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgT3JkZXJBY3Rpb25zLkxvYWRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzKHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIHJlcGxlbmlzaG1lbnRPcmRlckNvZGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmVwbGVuaXNobWVudCBvcmRlciBkZXRhaWxzXG4gICAqL1xuICBnZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzKCk6IE9ic2VydmFibGU8UmVwbGVuaXNobWVudE9yZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzVmFsdWUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmVwbGVuaXNobWVudCBvcmRlciBkZXRhaWxzIGxvYWRpbmcgZmxhZ1xuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzTG9hZGluZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByZXBsZW5pc2htZW50IG9yZGVyIGRldGFpbHMgc3VjY2VzcyBmbGFnXG4gICAqL1xuICBnZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzU3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KE9yZGVyU2VsZWN0b3JzLmdldFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNTdWNjZXNzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHJlcGxlbmlzaG1lbnQgb3JkZXIgZGV0YWlscyBlcnJvciBmbGFnXG4gICAqL1xuICBnZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzRXJyb3IpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHJlcGxlbmlzaG1lbnQgb3JkZXJzIGRldGFpbHMgc3RhdGVcbiAgICovXG4gIGNsZWFyUmVwbGVuaXNobWVudE9yZGVyRGV0YWlscygpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBPcmRlckFjdGlvbnMuQ2xlYXJSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgYSBzcGVjaWZpYyByZXBsZW5pc2htZW50IG9yZGVyIGZvciBhIGdpdmVuICdjdXJyZW50JyB1c2VyXG4gICAqXG4gICAqIEBwYXJhbSByZXBsZW5pc2htZW50T3JkZXJDb2RlIGEgcmVwbGVuaXNobWVudCBvcmRlciBjb2RlXG4gICAqL1xuICBjYW5jZWxSZXBsZW5pc2htZW50T3JkZXIocmVwbGVuaXNobWVudE9yZGVyQ29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKHVzZXJJZCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIG5ldyBPcmRlckFjdGlvbnMuQ2FuY2VsUmVwbGVuaXNobWVudE9yZGVyKHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIHJlcGxlbmlzaG1lbnRPcmRlckNvZGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYW5jZWwgcmVwbGVuaXNobWVudCBvcmRlciBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldENhbmNlbFJlcGxlbmlzaG1lbnRPcmRlckxvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1N0YXRlU3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzTG9hZGluZ0ZhY3RvcnkoXG4gICAgICAgICAgQ0FOQ0VMX1JFUExFTklTSE1FTlRfT1JERVJfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYW5jZWwgcmVwbGVuaXNobWVudCBvcmRlciBzdWNjZXNzIGZsYWdcbiAgICovXG4gIGdldENhbmNlbFJlcGxlbmlzaG1lbnRPcmRlclN1Y2Nlc3MoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1N0YXRlU3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzU3VjY2Vzc0ZhY3RvcnkoXG4gICAgICAgICAgQ0FOQ0VMX1JFUExFTklTSE1FTlRfT1JERVJfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYW5jZWwgcmVwbGVuaXNobWVudCBvcmRlciBlcnJvciBmbGFnXG4gICAqL1xuICBnZXRDYW5jZWxSZXBsZW5pc2htZW50T3JkZXJFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhdGVTdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NFcnJvckZhY3RvcnkoXG4gICAgICAgICAgQ0FOQ0VMX1JFUExFTklTSE1FTlRfT1JERVJfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhbmNlbCByZXBsZW5pc2htZW50IG9yZGVyIHByb2Nlc3Npbmcgc3RhdGVcbiAgICovXG4gIGNsZWFyQ2FuY2VsUmVwbGVuaXNobWVudE9yZGVyUHJvY2Vzc1N0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IE9yZGVyQWN0aW9ucy5DbGVhckNhbmNlbFJlcGxlbmlzaG1lbnRPcmRlcigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlcGxlbmlzaG1lbnQgb3JkZXIgaGlzdG9yeSBsaXN0XG4gICAqL1xuICBnZXRSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5TGlzdChcbiAgICBwYWdlU2l6ZTogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8UmVwbGVuaXNobWVudE9yZGVyTGlzdCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyc1N0YXRlKSxcbiAgICAgIHRhcCgocmVwbGVuaXNobWVudE9yZGVyTGlzdFN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dGVtcHRlZExvYWQgPVxuICAgICAgICAgIHJlcGxlbmlzaG1lbnRPcmRlckxpc3RTdGF0ZS5sb2FkaW5nIHx8XG4gICAgICAgICAgcmVwbGVuaXNobWVudE9yZGVyTGlzdFN0YXRlLnN1Y2Nlc3MgfHxcbiAgICAgICAgICByZXBsZW5pc2htZW50T3JkZXJMaXN0U3RhdGUuZXJyb3I7XG4gICAgICAgIGlmICghYXR0ZW1wdGVkTG9hZCkge1xuICAgICAgICAgIHRoaXMubG9hZFJlcGxlbmlzaG1lbnRPcmRlckxpc3QocGFnZVNpemUpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG1hcCgocmVwbGVuaXNobWVudE9yZGVyTGlzdFN0YXRlKSA9PiByZXBsZW5pc2htZW50T3JkZXJMaXN0U3RhdGUudmFsdWUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbG9hZGluZyBmbGFnIGZvciByZXBsZW5pc2htZW50IG9yZGVyIGhpc3RvcnkgbGlzdFxuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUxpc3RMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyc0xvYWRpbmcpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgZXJyb3IgZmxhZyBmb3IgcmVwbGVuaXNobWVudCBvcmRlciBoaXN0b3J5IGxpc3RcbiAgICovXG4gIGdldFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlMaXN0RXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyc0Vycm9yKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN1Y2Nlc3MgZmxhZyBmb3IgcmVwbGVuaXNobWVudCBvcmRlciBoaXN0b3J5IGxpc3RcbiAgICovXG4gIGdldFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlMaXN0U3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KE9yZGVyU2VsZWN0b3JzLmdldFJlcGxlbmlzaG1lbnRPcmRlcnNTdWNjZXNzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgcmVwbGVuaXNobWVudCBvcmRlciBsaXN0XG4gICAqIEBwYXJhbSBwYWdlU2l6ZSBwYWdlIHNpemVcbiAgICogQHBhcmFtIGN1cnJlbnRQYWdlIGN1cnJlbnQgcGFnZVxuICAgKiBAcGFyYW0gc29ydCBzb3J0XG4gICAqL1xuICBsb2FkUmVwbGVuaXNobWVudE9yZGVyTGlzdChcbiAgICBwYWdlU2l6ZT86IG51bWJlcixcbiAgICBjdXJyZW50UGFnZT86IG51bWJlcixcbiAgICBzb3J0Pzogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZShcbiAgICAgICh1c2VySWQpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgT3JkZXJBY3Rpb25zLkxvYWRVc2VyUmVwbGVuaXNobWVudE9yZGVycyh7XG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuaW5nIHJlcGxlbmlzaG1lbnQgb3JkZXIgbGlzdFxuICAgKi9cbiAgY2xlYXJSZXBsZW5pc2htZW50T3JkZXJMaXN0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IE9yZGVyQWN0aW9ucy5DbGVhclVzZXJSZXBsZW5pc2htZW50T3JkZXJzKCkpO1xuICB9XG59XG4iXX0=