/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutDeliveryModeClearedErrorEvent, CheckoutDeliveryModeClearedEvent, CheckoutDeliveryModeSetEvent, CheckoutSupportedDeliveryModesQueryReloadEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from '@spartacus/checkout/base/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-delivery-modes/checkout-delivery-modes.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutDeliveryModesService {
    constructor(activeCartFacade, userIdService, eventService, queryService, commandService, checkoutDeliveryModesConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.checkoutDeliveryModesConnector = checkoutDeliveryModesConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.supportedDeliveryModesQuery = this.queryService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector.getSupportedModes(userId, cartId))), {
            reloadOn: this.getCheckoutSupportedDeliveryModesQueryReloadEvents(),
            resetOn: this.getCheckoutSupportedDeliveryModesQueryResetEvents(),
        });
        this.setDeliveryModeCommand = this.commandService.create((deliveryModeCode) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector
            .setMode(userId, cartId, deliveryModeCode)
            .pipe(tap(() => {
            this.eventService.dispatch({ userId, cartId, cartCode: cartId, deliveryModeCode }, CheckoutDeliveryModeSetEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.clearDeliveryModeCommand = this.commandService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector
            .clearCheckoutDeliveryMode(userId, cartId)
            .pipe(tap(() => {
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
            }, CheckoutDeliveryModeClearedEvent);
        }), catchError((error) => {
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
            }, CheckoutDeliveryModeClearedErrorEvent);
            return throwError(error);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Returns the reload events for the supportedDeliveryModes query
     */
    getCheckoutSupportedDeliveryModesQueryReloadEvents() {
        return [CheckoutSupportedDeliveryModesQueryReloadEvent];
    }
    /**
     * Return the reset events for the supportedDeliveryModes query
     */
    getCheckoutSupportedDeliveryModesQueryResetEvents() {
        return [CheckoutSupportedDeliveryModesQueryResetEvent];
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
    getSupportedDeliveryModesState() {
        return this.supportedDeliveryModesQuery.getState();
    }
    getSupportedDeliveryModes() {
        return this.getSupportedDeliveryModesState().pipe(map((state) => state.data ?? []));
    }
    getSelectedDeliveryModeState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.deliveryMode })));
    }
    setDeliveryMode(mode) {
        return this.setDeliveryModeCommand.execute(mode);
    }
    clearCheckoutDeliveryMode() {
        return this.clearDeliveryModeCommand.execute();
    }
}
CheckoutDeliveryModesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModesService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i3.CheckoutDeliveryModesConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i3.CheckoutDeliveryModesConnector }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktbW9kZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvcmUvZmFjYWRlL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLHFDQUFxQyxFQUNyQyxnQ0FBZ0MsRUFDaEMsNEJBQTRCLEVBRzVCLDhDQUE4QyxFQUM5Qyw2Q0FBNkMsR0FDOUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBR0wsZUFBZSxFQUVmLHFCQUFxQixHQU10QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUl2RSxNQUFNLE9BQU8sNEJBQTRCO0lBcUd2QyxZQUNZLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixZQUEwQixFQUMxQixjQUE4QixFQUM5Qiw4QkFBOEQsRUFDOUQsbUJBQXdDO1FBTnhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7UUFDOUQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQTVGMUMsZ0NBQTJCLEdBQ25DLElBQUksQ0FBQyxZ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b250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIERlbGl2ZXJ5TW9kZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVDbGVhcmVkRXJyb3JFdmVudCxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVDbGVhcmVkRXZlbnQsXG4gIENoZWNrb3V0RGVsaXZlcnlNb2RlU2V0RXZlbnQsXG4gIENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgQ2hlY2tvdXRRdWVyeUZhY2FkZSxcbiAgQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZWxvYWRFdmVudCxcbiAgQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50LFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgQ29tbWFuZFN0cmF0ZWd5LFxuICBFdmVudFNlcnZpY2UsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgUXVlcnksXG4gIFF1ZXJ5Tm90aWZpZXIsXG4gIFF1ZXJ5U2VydmljZSxcbiAgUXVlcnlTdGF0ZSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5TW9kZXNDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLmNvbm5lY3Rvcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGVja291dERlbGl2ZXJ5TW9kZXNTZXJ2aWNlXG4gIGltcGxlbWVudHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlXG57XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWxvYWQgZXZlbnRzIGZvciB0aGUgc3VwcG9ydGVkRGVsaXZlcnlNb2RlcyBxdWVyeVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVsb2FkRXZlbnRzKCk6IFF1ZXJ5Tm90aWZpZXJbXSB7XG4gICAgcmV0dXJuIFtDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlbG9hZEV2ZW50XTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZXNldCBldmVudHMgZm9yIHRoZSBzdXBwb3J0ZWREZWxpdmVyeU1vZGVzIHF1ZXJ5XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50cygpOiBRdWVyeU5vdGlmaWVyW10ge1xuICAgIHJldHVybiBbQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50XTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnk6IFF1ZXJ5PERlbGl2ZXJ5TW9kZVtdPiA9XG4gICAgdGhpcy5xdWVyeVNlcnZpY2UuY3JlYXRlPERlbGl2ZXJ5TW9kZVtdPihcbiAgICAgICgpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFt1c2VySWQsIGNhcnRJZF0pID0+XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlNb2Rlc0Nvbm5lY3Rvci5nZXRTdXBwb3J0ZWRNb2RlcyhcbiAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICBjYXJ0SWRcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHJlbG9hZE9uOiB0aGlzLmdldENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVsb2FkRXZlbnRzKCksXG4gICAgICAgIHJlc2V0T246IHRoaXMuZ2V0Q2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50cygpLFxuICAgICAgfVxuICAgICk7XG5cbiAgcHJvdGVjdGVkIHNldERlbGl2ZXJ5TW9kZUNvbW1hbmQ6IENvbW1hbmQ8c3RyaW5nLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGU8c3RyaW5nPihcbiAgICAgIChkZWxpdmVyeU1vZGVDb2RlKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jaGVja291dERlbGl2ZXJ5TW9kZXNDb25uZWN0b3JcbiAgICAgICAgICAgICAgLnNldE1vZGUodXNlcklkLCBjYXJ0SWQsIGRlbGl2ZXJ5TW9kZUNvZGUpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgICAgeyB1c2VySWQsIGNhcnRJZCwgY2FydENvZGU6IGNhcnRJZCwgZGVsaXZlcnlNb2RlQ29kZSB9LFxuICAgICAgICAgICAgICAgICAgICBDaGVja291dERlbGl2ZXJ5TW9kZVNldEV2ZW50XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBwcm90ZWN0ZWQgY2xlYXJEZWxpdmVyeU1vZGVDb21tYW5kOiBDb21tYW5kPHZvaWQsIHVua25vd24+ID1cbiAgICB0aGlzLmNvbW1hbmRTZXJ2aWNlLmNyZWF0ZTx2b2lkPihcbiAgICAgICgpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFt1c2VySWQsIGNhcnRJZF0pID0+XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlNb2Rlc0Nvbm5lY3RvclxuICAgICAgICAgICAgICAuY2xlYXJDaGVja291dERlbGl2ZXJ5TW9kZSh1c2VySWQsIGNhcnRJZClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgKiBBcyB3ZSBrbm93IHRoZSBjYXJ0IGlzIG5vdCBhbm9ueW1vdXMgKHByZWNvbmRpdGlvbiBjaGVja2VkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgKiB3ZSBjYW4gc2FmZWx5IHVzZSB0aGUgY2FydElkLCB3aGljaCBpcyBhY3R1YWxseSB0aGUgY2FydC5jb2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgIGNhcnRDb2RlOiBjYXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIENoZWNrb3V0RGVsaXZlcnlNb2RlQ2xlYXJlZEV2ZW50XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICogQXMgd2Uga25vdyB0aGUgY2FydCBpcyBub3QgYW5vbnltb3VzIChwcmVjb25kaXRpb24gY2hlY2tlZCksXG4gICAgICAgICAgICAgICAgICAgICAgICogd2UgY2FuIHNhZmVseSB1c2UgdGhlIGNhcnRJZCwgd2hpY2ggaXMgYWN0dWFsbHkgdGhlIGNhcnQuY29kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0Q29kZTogY2FydElkLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFcnJvckV2ZW50XG4gICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIHtcbiAgICAgICAgc3RyYXRlZ3k6IENvbW1hbmRTdHJhdGVneS5DYW5jZWxQcmV2aW91cyxcbiAgICAgIH1cbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbW1hbmRTZXJ2aWNlOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeU1vZGVzQ29ubmVjdG9yOiBDaGVja291dERlbGl2ZXJ5TW9kZXNDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UXVlcnlGYWNhZGU6IENoZWNrb3V0UXVlcnlGYWNhZGVcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgbmVjZXNzYXJ5IGNoZWNrb3V0IHByZWNvbmRpdGlvbnMuXG4gICAqL1xuICBwcm90ZWN0ZWQgY2hlY2tvdXRQcmVjb25kaXRpb25zKCk6IE9ic2VydmFibGU8W3N0cmluZywgc3RyaW5nXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUudGFrZUFjdGl2ZUNhcnRJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmlzR3Vlc3RDYXJ0KCksXG4gICAgXSkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKFt1c2VySWQsIGNhcnRJZCwgaXNHdWVzdENhcnRdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdXNlcklkIHx8XG4gICAgICAgICAgIWNhcnRJZCB8fFxuICAgICAgICAgICh1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJiAhaXNHdWVzdENhcnQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2tvdXQgY29uZGl0aW9ucyBub3QgbWV0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt1c2VySWQsIGNhcnRJZF07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzU3RhdGUoKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPERlbGl2ZXJ5TW9kZVtdPj4ge1xuICAgIHJldHVybiB0aGlzLnN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeS5nZXRTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0U3VwcG9ydGVkRGVsaXZlcnlNb2RlcygpOiBPYnNlcnZhYmxlPERlbGl2ZXJ5TW9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1N0YXRlKCkucGlwZShcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEgPz8gW10pXG4gICAgKTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkRGVsaXZlcnlNb2RlU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPERlbGl2ZXJ5TW9kZSB8IHVuZGVmaW5lZD5cbiAgPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXRRdWVyeUZhY2FkZVxuICAgICAgLmdldENoZWNrb3V0RGV0YWlsc1N0YXRlKClcbiAgICAgIC5waXBlKG1hcCgoc3RhdGUpID0+ICh7IC4uLnN0YXRlLCBkYXRhOiBzdGF0ZS5kYXRhPy5kZWxpdmVyeU1vZGUgfSkpKTtcbiAgfVxuXG4gIHNldERlbGl2ZXJ5TW9kZShtb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5zZXREZWxpdmVyeU1vZGVDb21tYW5kLmV4ZWN1dGUobW9kZSk7XG4gIH1cblxuICBjbGVhckNoZWNrb3V0RGVsaXZlcnlNb2RlKCk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmNsZWFyRGVsaXZlcnlNb2RlQ29tbWFuZC5leGVjdXRlKCk7XG4gIH1cbn1cbiJdfQ==