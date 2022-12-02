/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutPaymentCardTypesQueryReloadEvent, CheckoutPaymentCardTypesQueryResetEvent, CheckoutPaymentDetailsCreatedEvent, CheckoutPaymentDetailsSetEvent, } from '@spartacus/checkout/base/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-payment/checkout-payment.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutPaymentService {
    constructor(activeCartFacade, userIdService, queryService, commandService, eventService, checkoutPaymentConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.eventService = eventService;
        this.checkoutPaymentConnector = checkoutPaymentConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.paymentCardTypesQuery = this.queryService.create(() => this.checkoutPaymentConnector.getPaymentCardTypes(), {
            reloadOn: this.getCheckoutPaymentCardTypesQueryReloadEvents(),
            resetOn: this.getCheckoutPaymentCardTypesQueryResetEvents(),
        });
        this.createPaymentMethodCommand = this.commandService.create((paymentDetails) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutPaymentConnector
            .createPaymentDetails(userId, cartId, paymentDetails)
            .pipe(tap((response) => this.eventService.dispatch({ userId, cartId, paymentDetails: response }, CheckoutPaymentDetailsCreatedEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.setPaymentMethodCommand = this.commandService.create((paymentDetails) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            const paymentDetailsId = paymentDetails?.id;
            if (!paymentDetailsId) {
                throw new Error('Checkout conditions not met');
            }
            return this.checkoutPaymentConnector
                .setPaymentDetails(userId, cartId, paymentDetailsId)
                .pipe(tap(() => this.eventService.dispatch({
                userId,
                cartId,
                paymentDetailsId,
            }, CheckoutPaymentDetailsSetEvent)));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Returns the reload events for the cardTypes query
     */
    getCheckoutPaymentCardTypesQueryReloadEvents() {
        return [CheckoutPaymentCardTypesQueryReloadEvent];
    }
    /**
     * Returns the reset events for the cardTypes query
     */
    getCheckoutPaymentCardTypesQueryResetEvents() {
        return [CheckoutPaymentCardTypesQueryResetEvent];
    }
    /**
     * Performs the necessary checkout preconditions.
     */
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
    getPaymentCardTypesState() {
        return this.paymentCardTypesQuery.getState();
    }
    getPaymentCardTypes() {
        return this.getPaymentCardTypesState().pipe(map((state) => state.data ?? []));
    }
    getPaymentDetailsState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.paymentInfo })));
    }
    createPaymentDetails(paymentDetails) {
        return this.createPaymentMethodCommand.execute(paymentDetails);
    }
    setPaymentDetails(paymentDetails) {
        return this.setPaymentMethodCommand.execute(paymentDetails);
    }
}
CheckoutPaymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i2.EventService }, { token: i3.CheckoutPaymentConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i2.EventService }, { type: i3.CheckoutPaymentConnector }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29yZS9mYWNhZGUvY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFDTCx3Q0FBd0MsRUFDeEMsdUNBQXVDLEVBQ3ZDLGtDQUFrQyxFQUNsQyw4QkFBOEIsR0FHL0IsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBR0wsZUFBZSxFQUVmLHFCQUFxQixHQU10QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFJM0QsTUFBTSxPQUFPLHNCQUFzQjtJQTJFakMsWUFDWSxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsY0FBOEIsRUFDOUIsWUFBMEIsRUFDMUIsd0JBQWtELEVBQ2xELG1CQUF3QztRQU54QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFuRTFDLDBCQUFxQixHQUFzQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FFM0UsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHdC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QUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsSUFBSSxDQUN6QyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQjthQUM1Qix1QkFBdUIsRUFBRTthQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELG9CQUFvQixDQUFDLGNBQThCO1FBQ2pELE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsaUJBQWlCLENBQUMsY0FBOEI7UUFDOUMsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlELENBQUM7O21IQWxJVSxzQkFBc0I7dUhBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FyZFR5cGUsXG4gIFBheW1lbnREZXRhaWxzLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVzZXRFdmVudCxcbiAgQ2hlY2tvdXRQYXltZW50RGV0YWlsc0NyZWF0ZWRFdmVudCxcbiAgQ2hlY2tvdXRQYXltZW50RGV0YWlsc1NldEV2ZW50LFxuICBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gIENoZWNrb3V0UXVlcnlGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIEV2ZW50U2VydmljZSxcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBRdWVyeSxcbiAgUXVlcnlOb3RpZmllcixcbiAgUXVlcnlTZXJ2aWNlLFxuICBRdWVyeVN0YXRlLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudENvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMvY2hlY2tvdXQtcGF5bWVudC9jaGVja291dC1wYXltZW50LmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGVja291dFBheW1lbnRTZXJ2aWNlIGltcGxlbWVudHMgQ2hlY2tvdXRQYXltZW50RmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlbG9hZCBldmVudHMgZm9yIHRoZSBjYXJkVHlwZXMgcXVlcnlcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGVja291dFBheW1lbnRDYXJkVHlwZXNRdWVyeVJlbG9hZEV2ZW50cygpOiBRdWVyeU5vdGlmaWVyW10ge1xuICAgIHJldHVybiBbQ2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZWxvYWRFdmVudF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVzZXQgZXZlbnRzIGZvciB0aGUgY2FyZFR5cGVzIHF1ZXJ5XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZXNldEV2ZW50cygpOiBRdWVyeU5vdGlmaWVyW10ge1xuICAgIHJldHVybiBbQ2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZXNldEV2ZW50XTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXltZW50Q2FyZFR5cGVzUXVlcnk6IFF1ZXJ5PENhcmRUeXBlW10+ID0gdGhpcy5xdWVyeVNlcnZpY2UuY3JlYXRlPFxuICAgIENhcmRUeXBlW11cbiAgPigoKSA9PiB0aGlzLmNoZWNrb3V0UGF5bWVudENvbm5lY3Rvci5nZXRQYXltZW50Q2FyZFR5cGVzKCksIHtcbiAgICByZWxvYWRPbjogdGhpcy5nZXRDaGVja291dFBheW1lbnRDYXJkVHlwZXNRdWVyeVJlbG9hZEV2ZW50cygpLFxuICAgIHJlc2V0T246IHRoaXMuZ2V0Q2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZXNldEV2ZW50cygpLFxuICB9KTtcblxuICBwcm90ZWN0ZWQgY3JlYXRlUGF5bWVudE1ldGhvZENvbW1hbmQ6IENvbW1hbmQ8UGF5bWVudERldGFpbHMsIHVua25vd24+ID1cbiAgICB0aGlzLmNvbW1hbmRTZXJ2aWNlLmNyZWF0ZTxQYXltZW50RGV0YWlscz4oXG4gICAgICAocGF5bWVudERldGFpbHMpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFt1c2VySWQsIGNhcnRJZF0pID0+XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0UGF5bWVudENvbm5lY3RvclxuICAgICAgICAgICAgICAuY3JlYXRlUGF5bWVudERldGFpbHModXNlcklkLCBjYXJ0SWQsIHBheW1lbnREZXRhaWxzKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKHJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIHsgdXNlcklkLCBjYXJ0SWQsIHBheW1lbnREZXRhaWxzOiByZXNwb25zZSB9LFxuICAgICAgICAgICAgICAgICAgICBDaGVja291dFBheW1lbnREZXRhaWxzQ3JlYXRlZEV2ZW50XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAge1xuICAgICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzLFxuICAgICAgfVxuICAgICk7XG5cbiAgcHJvdGVjdGVkIHNldFBheW1lbnRNZXRob2RDb21tYW5kOiBDb21tYW5kPFBheW1lbnREZXRhaWxzLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGU8UGF5bWVudERldGFpbHM+KFxuICAgICAgKHBheW1lbnREZXRhaWxzKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXltZW50RGV0YWlsc0lkID0gcGF5bWVudERldGFpbHM/LmlkO1xuICAgICAgICAgICAgaWYgKCFwYXltZW50RGV0YWlsc0lkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2tvdXQgY29uZGl0aW9ucyBub3QgbWV0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UGF5bWVudENvbm5lY3RvclxuICAgICAgICAgICAgICAuc2V0UGF5bWVudERldGFpbHModXNlcklkLCBjYXJ0SWQsIHBheW1lbnREZXRhaWxzSWQpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgICAgICAgICAgIHBheW1lbnREZXRhaWxzSWQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIENoZWNrb3V0UGF5bWVudERldGFpbHNTZXRFdmVudFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAge1xuICAgICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzLFxuICAgICAgfVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb21tYW5kU2VydmljZTogQ29tbWFuZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dFBheW1lbnRDb25uZWN0b3I6IENoZWNrb3V0UGF5bWVudENvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRRdWVyeUZhY2FkZTogQ2hlY2tvdXRRdWVyeUZhY2FkZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBuZWNlc3NhcnkgY2hlY2tvdXQgcHJlY29uZGl0aW9ucy5cbiAgICovXG4gIHByb3RlY3RlZCBjaGVja291dFByZWNvbmRpdGlvbnMoKTogT2JzZXJ2YWJsZTxbc3RyaW5nLCBzdHJpbmddPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlQ2FydElkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIG1hcCgoW3VzZXJJZCwgY2FydElkLCBpc0d1ZXN0Q2FydF0pID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF1c2VySWQgfHxcbiAgICAgICAgICAhY2FydElkIHx8XG4gICAgICAgICAgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmICFpc0d1ZXN0Q2FydClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaGVja291dCBjb25kaXRpb25zIG5vdCBtZXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3VzZXJJZCwgY2FydElkXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldFBheW1lbnRDYXJkVHlwZXNTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8Q2FyZFR5cGVbXSB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5wYXltZW50Q2FyZFR5cGVzUXVlcnkuZ2V0U3RhdGUoKTtcbiAgfVxuXG4gIGdldFBheW1lbnRDYXJkVHlwZXMoKTogT2JzZXJ2YWJsZTxDYXJkVHlwZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGF5bWVudENhcmRUeXBlc1N0YXRlKCkucGlwZShcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEgPz8gW10pXG4gICAgKTtcbiAgfVxuXG4gIGdldFBheW1lbnREZXRhaWxzU3RhdGUoKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPFBheW1lbnREZXRhaWxzIHwgdW5kZWZpbmVkPj4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UXVlcnlGYWNhZGVcbiAgICAgIC5nZXRDaGVja291dERldGFpbHNTdGF0ZSgpXG4gICAgICAucGlwZShtYXAoKHN0YXRlKSA9PiAoeyAuLi5zdGF0ZSwgZGF0YTogc3RhdGUuZGF0YT8ucGF5bWVudEluZm8gfSkpKTtcbiAgfVxuXG4gIGNyZWF0ZVBheW1lbnREZXRhaWxzKHBheW1lbnREZXRhaWxzOiBQYXltZW50RGV0YWlscyk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVBheW1lbnRNZXRob2RDb21tYW5kLmV4ZWN1dGUocGF5bWVudERldGFpbHMpO1xuICB9XG5cbiAgc2V0UGF5bWVudERldGFpbHMocGF5bWVudERldGFpbHM6IFBheW1lbnREZXRhaWxzKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuc2V0UGF5bWVudE1ldGhvZENvbW1hbmQuZXhlY3V0ZShwYXltZW50RGV0YWlscyk7XG4gIH1cbn1cbiJdfQ==