/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { getProcessErrorFactory, getProcessLoadingFactory, getProcessSuccessFactory, } from '../../process/store/selectors/process.selectors';
import { isNotUndefined } from '../../util';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { CLAIM_CUSTOMER_COUPON_PROCESS_ID, SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID, UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID, } from '../store/user-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../auth/user-auth/facade/user-id.service";
export class CustomerCouponService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    /**
     * Retrieves customer's coupons
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadCustomerCoupons(pageSize, currentPage, sort) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.LoadCustomerCoupons({
                userId,
                pageSize: pageSize,
                currentPage: currentPage,
                sort: sort,
            }));
        });
    }
    /**
     * Returns customer coupon search result
     * @param pageSize page size
     */
    getCustomerCoupons(pageSize) {
        return combineLatest([
            this.store.pipe(select(UsersSelectors.getCustomerCouponsState)),
            this.getClaimCustomerCouponResultLoading(),
        ]).pipe(filter(([, loading]) => !loading), tap(([customerCouponsState]) => {
            const attemptedLoad = customerCouponsState.loading ||
                customerCouponsState.success ||
                customerCouponsState.error;
            if (!attemptedLoad) {
                this.loadCustomerCoupons(pageSize);
            }
        }), map(([customerCouponsState]) => customerCouponsState.value), filter(isNotUndefined));
    }
    /**
     * Returns a loaded flag for customer coupons
     */
    getCustomerCouponsLoaded() {
        return this.store.pipe(select(UsersSelectors.getCustomerCouponsLoaded));
    }
    /**
     * Returns a loading flag for customer coupons
     */
    getCustomerCouponsLoading() {
        return this.store.pipe(select(UsersSelectors.getCustomerCouponsLoading));
    }
    /**
     * Subscribe a CustomerCoupon Notification
     * @param couponCode a customer coupon code
     */
    subscribeCustomerCoupon(couponCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.SubscribeCustomerCoupon({
                userId,
                couponCode: couponCode,
            }));
        });
    }
    /**
     * Returns the subscribe customer coupon notification process loading flag
     */
    getSubscribeCustomerCouponResultLoading() {
        return this.store.pipe(select(getProcessLoadingFactory(SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Returns the subscribe customer coupon notification process success flag
     */
    getSubscribeCustomerCouponResultSuccess() {
        return this.store.pipe(select(getProcessSuccessFactory(SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Returns the subscribe customer coupon notification process error flag
     */
    getSubscribeCustomerCouponResultError() {
        return this.store.pipe(select(getProcessErrorFactory(SUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Unsubscribe a CustomerCoupon Notification
     * @param couponCode a customer coupon code
     */
    unsubscribeCustomerCoupon(couponCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.UnsubscribeCustomerCoupon({
                userId,
                couponCode: couponCode,
            }));
        });
    }
    /**
     * Returns the unsubscribe customer coupon notification process loading flag
     */
    getUnsubscribeCustomerCouponResultLoading() {
        return this.store.pipe(select(getProcessLoadingFactory(UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Returns the unsubscribe customer coupon notification process success flag
     */
    getUnsubscribeCustomerCouponResultSuccess() {
        return this.store.pipe(select(getProcessSuccessFactory(UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Returns the unsubscribe customer coupon notification process error flag
     */
    getUnsubscribeCustomerCouponResultError() {
        return this.store.pipe(select(getProcessErrorFactory(UNSUBSCRIBE_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Claim a CustomerCoupon
     * @param couponCode a customer coupon code
     */
    claimCustomerCoupon(couponCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.ClaimCustomerCoupon({
                userId,
                couponCode,
            }));
        });
    }
    /**
     * Returns the claim customer coupon notification process success flag
     */
    getClaimCustomerCouponResultSuccess() {
        return this.store.pipe(select(getProcessSuccessFactory(CLAIM_CUSTOMER_COUPON_PROCESS_ID)));
    }
    /**
     * Returns the claim customer coupon notification process loading flag
     */
    getClaimCustomerCouponResultLoading() {
        return this.store.pipe(select(getProcessLoadingFactory(CLAIM_CUSTOMER_COUPON_PROCESS_ID)));
    }
}
CustomerCouponService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerCouponService, deps: [{ token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerCouponService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerCouponService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerCouponService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItY291cG9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91c2VyL2ZhY2FkZS9jdXN0b21lci1jb3Vwb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJbEQsT0FBTyxFQUNMLHNCQUFzQixFQUN0Qix3QkFBd0IsRUFDeEIsd0JBQXdCLEdBQ3pCLE1BQU0saURBQWlELENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFDTCxnQ0FBZ0MsRUFFaEMsb0NBQW9DLEVBQ3BDLHNDQUFzQyxHQUN2QyxNQUFNLHFCQUFxQixDQUFDOzs7O0FBSzdCLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDWSxLQUFvRCxFQUNwRCxhQUE0QjtRQUQ1QixVQUFLLEdBQUwsS0FBSyxDQUErQztRQUNwRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNyQyxDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxtQkFBbUIsQ0FDakIsUUFBZ0IsRUFDaEIsV0FBb0IsRUFDcEIsSUFBYTtRQUViLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFD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QUFDLEtBQU0sQ0FBQyxJQUFJLENBQ3JELE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDOztrSEE1TFUscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYXV0aC91c2VyLWF1dGgvZmFjYWRlL3VzZXItaWQuc2VydmljZSc7XG5pbXBvcnQgeyBDdXN0b21lckNvdXBvblNlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uL21vZGVsL2N1c3RvbWVyLWNvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhQcm9jZXNzIH0gZnJvbSAnLi4vLi4vcHJvY2Vzcy9zdG9yZS9wcm9jZXNzLXN0YXRlJztcbmltcG9ydCB7XG4gIGdldFByb2Nlc3NFcnJvckZhY3RvcnksXG4gIGdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeSxcbiAgZ2V0UHJvY2Vzc1N1Y2Nlc3NGYWN0b3J5LFxufSBmcm9tICcuLi8uLi9wcm9jZXNzL3N0b3JlL3NlbGVjdG9ycy9wcm9jZXNzLnNlbGVjdG9ycyc7XG5pbXBvcnQgeyBpc05vdFVuZGVmaW5lZCB9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFVzZXJzU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7XG4gIENMQUlNX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lELFxuICBTdGF0ZVdpdGhVc2VyLFxuICBTVUJTQ1JJQkVfQ1VTVE9NRVJfQ09VUE9OX1BST0NFU1NfSUQsXG4gIFVOU1VCU0NSSUJFX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lELFxufSBmcm9tICcuLi9zdG9yZS91c2VyLXN0YXRlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyQ291cG9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoVXNlciB8IFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0cmlldmVzIGN1c3RvbWVyJ3MgY291cG9uc1xuICAgKiBAcGFyYW0gcGFnZVNpemUgcGFnZSBzaXplXG4gICAqIEBwYXJhbSBjdXJyZW50UGFnZSBjdXJyZW50IHBhZ2VcbiAgICogQHBhcmFtIHNvcnQgc29ydFxuICAgKi9cbiAgbG9hZEN1c3RvbWVyQ291cG9ucyhcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIGN1cnJlbnRQYWdlPzogbnVtYmVyLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKS5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgbmV3IFVzZXJBY3Rpb25zLkxvYWRDdXN0b21lckNvdXBvbnMoe1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIHNvcnQ6IHNvcnQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VzdG9tZXIgY291cG9uIHNlYXJjaCByZXN1bHRcbiAgICogQHBhcmFtIHBhZ2VTaXplIHBhZ2Ugc2l6ZVxuICAgKi9cbiAgZ2V0Q3VzdG9tZXJDb3Vwb25zKHBhZ2VTaXplOiBudW1iZXIpOiBPYnNlcnZhYmxlPEN1c3RvbWVyQ291cG9uU2VhcmNoUmVzdWx0PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgKDxTdG9yZTxTdGF0ZVdpdGhVc2VyPj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgICBzZWxlY3QoVXNlcnNTZWxlY3RvcnMuZ2V0Q3VzdG9tZXJDb3Vwb25zU3RhdGUpXG4gICAgICApLFxuICAgICAgdGhpcy5nZXRDbGFpbUN1c3RvbWVyQ291cG9uUmVzdWx0TG9hZGluZygpLFxuICAgIF0pLnBpcGUoXG4gICAgICBmaWx0ZXIoKFssIGxvYWRpbmddKSA9PiAhbG9hZGluZyksXG4gICAgICB0YXAoKFtjdXN0b21lckNvdXBvbnNTdGF0ZV0pID0+IHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdGVkTG9hZCA9XG4gICAgICAgICAgY3VzdG9tZXJDb3Vwb25zU3RhdGUubG9hZGluZyB8fFxuICAgICAgICAgIGN1c3RvbWVyQ291cG9uc1N0YXRlLnN1Y2Nlc3MgfHxcbiAgICAgICAgICBjdXN0b21lckNvdXBvbnNTdGF0ZS5lcnJvcjtcbiAgICAgICAgaWYgKCFhdHRlbXB0ZWRMb2FkKSB7XG4gICAgICAgICAgdGhpcy5sb2FkQ3VzdG9tZXJDb3Vwb25zKHBhZ2VTaXplKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtYXAoKFtjdXN0b21lckNvdXBvbnNTdGF0ZV0pID0+IGN1c3RvbWVyQ291cG9uc1N0YXRlLnZhbHVlKSxcbiAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsb2FkZWQgZmxhZyBmb3IgY3VzdG9tZXIgY291cG9uc1xuICAgKi9cbiAgZ2V0Q3VzdG9tZXJDb3Vwb25zTG9hZGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFVzZXI+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoVXNlcnNTZWxlY3RvcnMuZ2V0Q3VzdG9tZXJDb3Vwb25zTG9hZGVkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxvYWRpbmcgZmxhZyBmb3IgY3VzdG9tZXIgY291cG9uc1xuICAgKi9cbiAgZ2V0Q3VzdG9tZXJDb3Vwb25zTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhVc2VyPj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFVzZXJzU2VsZWN0b3JzLmdldEN1c3RvbWVyQ291cG9uc0xvYWRpbmcpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgYSBDdXN0b21lckNvdXBvbiBOb3RpZmljYXRpb25cbiAgICogQHBhcmFtIGNvdXBvbkNvZGUgYSBjdXN0b21lciBjb3Vwb24gY29kZVxuICAgKi9cbiAgc3Vic2NyaWJlQ3VzdG9tZXJDb3Vwb24oY291cG9uQ29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKS5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgbmV3IFVzZXJBY3Rpb25zLlN1YnNjcmliZUN1c3RvbWVyQ291cG9uKHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY291cG9uQ29kZTogY291cG9uQ29kZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3Vic2NyaWJlIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldFN1YnNjcmliZUN1c3RvbWVyQ291cG9uUmVzdWx0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KGdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShTVUJTQ1JJQkVfQ1VTVE9NRVJfQ09VUE9OX1BST0NFU1NfSUQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3Vic2NyaWJlIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBzdWNjZXNzIGZsYWdcbiAgICovXG4gIGdldFN1YnNjcmliZUN1c3RvbWVyQ291cG9uUmVzdWx0U3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KGdldFByb2Nlc3NTdWNjZXNzRmFjdG9yeShTVUJTQ1JJQkVfQ1VTVE9NRVJfQ09VUE9OX1BST0NFU1NfSUQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3Vic2NyaWJlIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBlcnJvciBmbGFnXG4gICAqL1xuICBnZXRTdWJzY3JpYmVDdXN0b21lckNvdXBvblJlc3VsdEVycm9yKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoZ2V0UHJvY2Vzc0Vycm9yRmFjdG9yeShTVUJTQ1JJQkVfQ1VTVE9NRVJfQ09VUE9OX1BST0NFU1NfSUQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgYSBDdXN0b21lckNvdXBvbiBOb3RpZmljYXRpb25cbiAgICogQHBhcmFtIGNvdXBvbkNvZGUgYSBjdXN0b21lciBjb3Vwb24gY29kZVxuICAgKi9cbiAgdW5zdWJzY3JpYmVDdXN0b21lckNvdXBvbihjb3Vwb25Db2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLnN1YnNjcmliZSgodXNlcklkKSA9PiB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICBuZXcgVXNlckFjdGlvbnMuVW5zdWJzY3JpYmVDdXN0b21lckNvdXBvbih7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNvdXBvbkNvZGU6IGNvdXBvbkNvZGUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVuc3Vic2NyaWJlIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldFVuc3Vic2NyaWJlQ3VzdG9tZXJDb3Vwb25SZXN1bHRMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoZ2V0UHJvY2Vzc0xvYWRpbmdGYWN0b3J5KFVOU1VCU0NSSUJFX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVuc3Vic2NyaWJlIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBzdWNjZXNzIGZsYWdcbiAgICovXG4gIGdldFVuc3Vic2NyaWJlQ3VzdG9tZXJDb3Vwb25SZXN1bHRTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoZ2V0UHJvY2Vzc1N1Y2Nlc3NGYWN0b3J5KFVOU1VCU0NSSUJFX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVuc3Vic2NyaWJlIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBlcnJvciBmbGFnXG4gICAqL1xuICBnZXRVbnN1YnNjcmliZUN1c3RvbWVyQ291cG9uUmVzdWx0RXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChnZXRQcm9jZXNzRXJyb3JGYWN0b3J5KFVOU1VCU0NSSUJFX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsYWltIGEgQ3VzdG9tZXJDb3Vwb25cbiAgICogQHBhcmFtIGNvdXBvbkNvZGUgYSBjdXN0b21lciBjb3Vwb24gY29kZVxuICAgKi9cbiAgY2xhaW1DdXN0b21lckNvdXBvbihjb3Vwb25Db2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLnN1YnNjcmliZSgodXNlcklkKSA9PiB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICBuZXcgVXNlckFjdGlvbnMuQ2xhaW1DdXN0b21lckNvdXBvbih7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNvdXBvbkNvZGUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNsYWltIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBzdWNjZXNzIGZsYWdcbiAgICovXG4gIGdldENsYWltQ3VzdG9tZXJDb3Vwb25SZXN1bHRTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoZ2V0UHJvY2Vzc1N1Y2Nlc3NGYWN0b3J5KENMQUlNX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNsYWltIGN1c3RvbWVyIGNvdXBvbiBub3RpZmljYXRpb24gcHJvY2VzcyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldENsYWltQ3VzdG9tZXJDb3Vwb25SZXN1bHRMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoZ2V0UHJvY2Vzc0xvYWRpbmdGYWN0b3J5KENMQUlNX0NVU1RPTUVSX0NPVVBPTl9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG59XG4iXX0=