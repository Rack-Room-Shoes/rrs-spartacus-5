/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BPaymentTypeEnum, CheckoutPaymentTypeSetEvent, CheckoutPaymentTypesQueryReloadEvent, CheckoutPaymentTypesQueryResetEvent, } from '@spartacus/checkout/b2b/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-payment-type/checkout-payment-type.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutPaymentTypeService {
    constructor(activeCartFacade, userIdService, queryService, commandService, paymentTypeConnector, eventService, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.paymentTypeConnector = paymentTypeConnector;
        this.eventService = eventService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.paymentTypesQuery = this.queryService.create(() => this.paymentTypeConnector.getPaymentTypes(), {
            reloadOn: this.getCheckoutPaymentTypesQueryReloadEvents(),
            resetOn: this.getCheckoutPaymentTypesQueryResetEvents(),
        });
        this.setPaymentTypeCommand = this.commandService.create(({ paymentTypeCode, purchaseOrderNumber }) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.paymentTypeConnector
            .setPaymentType(userId, cartId, paymentTypeCode, purchaseOrderNumber)
            .pipe(tap(() => this.eventService.dispatch({
            userId,
            cartId,
            paymentTypeCode,
            purchaseOrderNumber,
        }, CheckoutPaymentTypeSetEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    getCheckoutPaymentTypesQueryReloadEvents() {
        return [CheckoutPaymentTypesQueryReloadEvent];
    }
    getCheckoutPaymentTypesQueryResetEvents() {
        return [CheckoutPaymentTypesQueryResetEvent];
    }
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getPaymentTypesState() {
        return this.paymentTypesQuery.getState();
    }
    getPaymentTypes() {
        return this.getPaymentTypesState().pipe(map((state) => state.data ?? []));
    }
    setPaymentType(paymentTypeCode, purchaseOrderNumber) {
        return this.setPaymentTypeCommand.execute({
            paymentTypeCode,
            purchaseOrderNumber,
        });
    }
    getSelectedPaymentTypeState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.paymentType })));
    }
    isAccountPayment() {
        return this.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT));
    }
    getPurchaseOrderNumberState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.purchaseOrderNumber })));
    }
}
CheckoutPaymentTypeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentTypeService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i3.CheckoutPaymentTypeConnector }, { token: i2.EventService }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentTypeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentTypeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i3.CheckoutPaymentTypeConnector }, { type: i2.EventService }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC10eXBlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvcmUvZmFjYWRlL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsMkJBQTJCLEVBQzNCLG9DQUFvQyxFQUNwQyxtQ0FBbUMsR0FDcEMsTUFBTSw4QkFBOEIsQ0FBQztBQUV0QyxPQUFPLEVBR0wsZUFBZSxFQUVmLHFCQUFxQixHQU10QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBSW5FLE1BQU0sT0FBTywwQkFBMEI7SUFxRHJDLFlBQ1ksZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLGNBQThCLEVBQzlCLG9CQUFrRCxFQUNsRCxZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE4QjtRQUNsRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBcEQxQyxzQkFBaUIsR0FBeUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQzFFLEdBQUcsRUFB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QUMsSUFBSSxDQUM1QyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNqQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUN4RSxDQUFDO0lBQ0osQ0FBQztJQUVELDJCQUEyQjtRQUN6QixPQUFPLElBQUksQ0FBQyxtQkFBbUI7YUFDNUIsdUJBQXVCLEVBQUU7YUFDekIsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUN0RSxDQUFDO0lBQ04sQ0FBQzs7dUhBMUhVLDBCQUEwQjsySEFBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlLCBQYXltZW50VHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQjJCUGF5bWVudFR5cGVFbnVtLFxuICBDaGVja291dFBheW1lbnRUeXBlRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRUeXBlU2V0RXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZWxvYWRFdmVudCxcbiAgQ2hlY2tvdXRQYXltZW50VHlwZXNRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYjJiL3Jvb3QnO1xuaW1wb3J0IHsgQ2hlY2tvdXRRdWVyeUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIEV2ZW50U2VydmljZSxcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBRdWVyeSxcbiAgUXVlcnlOb3RpZmllcixcbiAgUXVlcnlTZXJ2aWNlLFxuICBRdWVyeVN0YXRlLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50VHlwZUNvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMvY2hlY2tvdXQtcGF5bWVudC10eXBlL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50VHlwZVNlcnZpY2UgaW1wbGVtZW50cyBDaGVja291dFBheW1lbnRUeXBlRmFjYWRlIHtcbiAgcHJvdGVjdGVkIGdldENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZWxvYWRFdmVudHMoKTogUXVlcnlOb3RpZmllcltdIHtcbiAgICByZXR1cm4gW0NoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZWxvYWRFdmVudF07XG4gIH1cbiAgcHJvdGVjdGVkIGdldENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZXNldEV2ZW50cygpOiBRdWVyeU5vdGlmaWVyW10ge1xuICAgIHJldHVybiBbQ2hlY2tvdXRQYXltZW50VHlwZXNRdWVyeVJlc2V0RXZlbnRdO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBheW1lbnRUeXBlc1F1ZXJ5OiBRdWVyeTxQYXltZW50VHlwZVtdPiA9IHRoaXMucXVlcnlTZXJ2aWNlLmNyZWF0ZShcbiAgICAoKSA9PiB0aGlzLnBheW1lbnRUeXBlQ29ubmVjdG9yLmdldFBheW1lbnRUeXBlcygpLFxuICAgIHtcbiAgICAgIHJlbG9hZE9uOiB0aGlzLmdldENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZWxvYWRFdmVudHMoKSxcbiAgICAgIHJlc2V0T246IHRoaXMuZ2V0Q2hlY2tvdXRQYXltZW50VHlwZXNRdWVyeVJlc2V0RXZlbnRzKCksXG4gICAgfVxuICApO1xuXG4gIHByb3RlY3RlZCBzZXRQYXltZW50VHlwZUNvbW1hbmQ6IENvbW1hbmQ8XG4gICAgeyBwYXltZW50VHlwZUNvZGU6IHN0cmluZzsgcHVyY2hhc2VPcmRlck51bWJlcj86IHN0cmluZyB9LFxuICAgIHVua25vd25cbiAgPiA9IHRoaXMuY29tbWFuZFNlcnZpY2UuY3JlYXRlPHtcbiAgICBwYXltZW50VHlwZUNvZGU6IHN0cmluZztcbiAgICBwdXJjaGFzZU9yZGVyTnVtYmVyPzogc3RyaW5nO1xuICB9PihcbiAgICAoeyBwYXltZW50VHlwZUNvZGUsIHB1cmNoYXNlT3JkZXJOdW1iZXIgfSkgPT5cbiAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgIHRoaXMucGF5bWVudFR5cGVDb25uZWN0b3JcbiAgICAgICAgICAgIC5zZXRQYXltZW50VHlwZShcbiAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgIHBheW1lbnRUeXBlQ29kZSxcbiAgICAgICAgICAgICAgcHVyY2hhc2VPcmRlck51bWJlclxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRhcCgoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgcGF5bWVudFR5cGVDb2RlLFxuICAgICAgICAgICAgICAgICAgICBwdXJjaGFzZU9yZGVyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIENoZWNrb3V0UGF5bWVudFR5cGVTZXRFdmVudFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApLFxuICAgIHtcbiAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgfVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZFNlcnZpY2U6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwYXltZW50VHlwZUNvbm5lY3RvcjogQ2hlY2tvdXRQYXltZW50VHlwZUNvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UXVlcnlGYWNhZGU6IENoZWNrb3V0UXVlcnlGYWNhZGVcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBjaGVja291dFByZWNvbmRpdGlvbnMoKTogT2JzZXJ2YWJsZTxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlQ2FydElkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgoW3VzZXJJZCwgY2FydElkLCBpc0d1ZXN0Q2FydF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF1c2VySWQgfHxcbiAgICAgICAgICAhY2FydElkIHx8XG4gICAgICAgICAgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmICFpc0d1ZXN0Q2FydClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVja291dCBjb25kaXRpb25zIG5vdCBtZXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3VzZXJJZCwgY2FydElkXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldFBheW1lbnRUeXBlc1N0YXRlKCk6IE9ic2VydmFibGU8UXVlcnlTdGF0ZTxQYXltZW50VHlwZVtdIHwgdW5kZWZpbmVkPj4ge1xuICAgIHJldHVybiB0aGlzLnBheW1lbnRUeXBlc1F1ZXJ5LmdldFN0YXRlKCk7XG4gIH1cblxuICBnZXRQYXltZW50VHlwZXMoKTogT2JzZXJ2YWJsZTxQYXltZW50VHlwZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGF5bWVudFR5cGVzU3RhdGUoKS5waXBlKG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEgPz8gW10pKTtcbiAgfVxuXG4gIHNldFBheW1lbnRUeXBlKFxuICAgIHBheW1lbnRUeXBlQ29kZTogQjJCUGF5bWVudFR5cGVFbnVtLFxuICAgIHB1cmNoYXNlT3JkZXJOdW1iZXI/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuc2V0UGF5bWVudFR5cGVDb21tYW5kLmV4ZWN1dGUoe1xuICAgICAgcGF5bWVudFR5cGVDb2RlLFxuICAgICAgcHVyY2hhc2VPcmRlck51bWJlcixcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkUGF5bWVudFR5cGVTdGF0ZSgpOiBPYnNlcnZhYmxlPFxuICAgIFF1ZXJ5U3RhdGU8UGF5bWVudFR5cGUgfCB1bmRlZmluZWQ+XG4gID4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UXVlcnlGYWNhZGVcbiAgICAgIC5nZXRDaGVja291dERldGFpbHNTdGF0ZSgpXG4gICAgICAucGlwZShtYXAoKHN0YXRlKSA9PiAoeyAuLi5zdGF0ZSwgZGF0YTogc3RhdGUuZGF0YT8ucGF5bWVudFR5cGUgfSkpKTtcbiAgfVxuXG4gIGlzQWNjb3VudFBheW1lbnQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2VsZWN0ZWRQYXltZW50VHlwZVN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGE/LmNvZGUgPT09IEIyQlBheW1lbnRUeXBlRW51bS5BQ0NPVU5UX1BBWU1FTlQpXG4gICAgKTtcbiAgfVxuXG4gIGdldFB1cmNoYXNlT3JkZXJOdW1iZXJTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPj4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UXVlcnlGYWNhZGVcbiAgICAgIC5nZXRDaGVja291dERldGFpbHNTdGF0ZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChzdGF0ZSkgPT4gKHsgLi4uc3RhdGUsIGRhdGE6IHN0YXRlLmRhdGE/LnB1cmNoYXNlT3JkZXJOdW1iZXIgfSkpXG4gICAgICApO1xuICB9XG59XG4iXX0=