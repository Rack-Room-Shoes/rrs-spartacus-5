/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DeleteUserAddressEvent, GlobalMessageType, LoadUserAddressesEvent, OCC_USER_ID_ANONYMOUS, UpdateUserAddressEvent, UserAddressEvent, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CheckoutDeliveryAddressClearedEvent, CheckoutDeliveryAddressCreatedEvent, CheckoutDeliveryAddressSetEvent, CheckoutQueryResetEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from './checkout.events';
import * as i0 from "@angular/core";
import * as i1 from "../facade/checkout-delivery-address.facade";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
/**
 * Checkout delivery address event listener.
 */
export class CheckoutDeliveryAddressEventListener {
    constructor(checkoutDeliveryAddressFacade, eventService, globalMessageService, activeCartFacade) {
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.subscriptions = new Subscription();
        this.onDeliveryAddressCreated();
        this.onDeliveryAddressSet();
        this.onDeliveryAddressCleared();
        this.onUserAddressChange();
    }
    /**
     * Registers listeners for the User address events.
     */
    onUserAddressChange() {
        this.subscriptions.add(this.eventService
            .get(UserAddressEvent)
            .pipe(filter((event) => event instanceof UpdateUserAddressEvent ||
            event instanceof DeleteUserAddressEvent), switchMap(({ userId }) => this.activeCartFacade
            .takeActiveCartId()
            .pipe(map((cartId) => ({ cartId, userId })))))
            .subscribe(({ cartId, userId }) => {
            // we want to LL the checkout (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
            this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress();
            this.eventService.dispatch({ cartId, userId }, CheckoutSupportedDeliveryModesQueryResetEvent);
        }));
    }
    onDeliveryAddressCreated() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressCreatedEvent)
            .subscribe(({ cartId, userId }) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                this.eventService.dispatch({ userId }, LoadUserAddressesEvent);
            }
            this.globalMessageService.add({ key: 'addressForm.userAddressAddSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onDeliveryAddressSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressSetEvent)
            .subscribe(({ userId, cartId }) => {
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onDeliveryAddressCleared() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressClearedEvent)
            .subscribe(() => this.eventService.dispatch({}, CheckoutQueryResetEvent)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutDeliveryAddressEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressEventListener, deps: [{ token: i1.CheckoutDeliveryAddressFacade }, { token: i2.EventService }, { token: i2.GlobalMessageService }, { token: i3.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutDeliveryAddressFacade }, { type: i2.EventService }, { type: i2.GlobalMessageService }, { type: i3.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL3Jvb3QvZXZlbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MtZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUNMLHNCQUFzQixFQUd0QixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIsZ0JBQWdCLEdBQ2pCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQ0wsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQywrQkFBK0IsRUFDL0IsdUJBQXVCLEVBQ3ZCLDZDQUE2QyxHQUM5QyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUUzQjs7R0FFRztBQUlILE1BQU0sT0FBTyxvQ0FBb0M7SUFHL0MsWUFDWSw2QkFBNEQsRUFDNUQsWUFBMEIsRUFDMUIsb0JBQTBDLEVBQzFDLGdCQUFrQztRQUhsQyxrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQStCO1FBQzVELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU5wQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRM0MsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLG9CQUFvQixFQUFF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QUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2lJQWxHVSxvQ0FBb0M7cUlBQXBDLG9DQUFvQyxjQUZuQyxNQUFNOzJGQUVQLG9DQUFvQztrQkFIaEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIERlbGV0ZVVzZXJBZGRyZXNzRXZlbnQsXG4gIEV2ZW50U2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBMb2FkVXNlckFkZHJlc3Nlc0V2ZW50LFxuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFVwZGF0ZVVzZXJBZGRyZXNzRXZlbnQsXG4gIFVzZXJBZGRyZXNzRXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSB9IGZyb20gJy4uL2ZhY2FkZS9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmZhY2FkZSc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NsZWFyZWRFdmVudCxcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDcmVhdGVkRXZlbnQsXG4gIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2V0RXZlbnQsXG4gIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50LFxuICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJy4vY2hlY2tvdXQuZXZlbnRzJztcblxuLyoqXG4gKiBDaGVja291dCBkZWxpdmVyeSBhZGRyZXNzIGV2ZW50IGxpc3RlbmVyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NFdmVudExpc3RlbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZVxuICApIHtcbiAgICB0aGlzLm9uRGVsaXZlcnlBZGRyZXNzQ3JlYXRlZCgpO1xuICAgIHRoaXMub25EZWxpdmVyeUFkZHJlc3NTZXQoKTtcbiAgICB0aGlzLm9uRGVsaXZlcnlBZGRyZXNzQ2xlYXJlZCgpO1xuXG4gICAgdGhpcy5vblVzZXJBZGRyZXNzQ2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGxpc3RlbmVycyBmb3IgdGhlIFVzZXIgYWRkcmVzcyBldmVudHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgb25Vc2VyQWRkcmVzc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgICAgLmdldChVc2VyQWRkcmVzc0V2ZW50KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAoZXZlbnQpID0+XG4gICAgICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgVXBkYXRlVXNlckFkZHJlc3NFdmVudCB8fFxuICAgICAgICAgICAgICBldmVudCBpbnN0YW5jZW9mIERlbGV0ZVVzZXJBZGRyZXNzRXZlbnRcbiAgICAgICAgICApLFxuICAgICAgICAgIHN3aXRjaE1hcCgoeyB1c2VySWQgfSkgPT5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZVxuICAgICAgICAgICAgICAudGFrZUFjdGl2ZUNhcnRJZCgpXG4gICAgICAgICAgICAgIC5waXBlKG1hcCgoY2FydElkKSA9PiAoeyBjYXJ0SWQsIHVzZXJJZCB9KSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKHsgY2FydElkLCB1c2VySWQgfSkgPT4ge1xuICAgICAgICAgIC8vIHdlIHdhbnQgdG8gTEwgdGhlIGNoZWNrb3V0IChpZiBub3QgYWxyZWFkeSBsb2FkZWQpLCBpbiBvcmRlciB0byBjbGVhciB0aGUgY2hlY2tvdXQgZGF0YSB0aGF0J3MgcG90ZW50aWFsbHkgc2V0IG9uIHRoZSBiYWNrLWVuZFxuICAgICAgICAgIHRoaXMuY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUuY2xlYXJDaGVja291dERlbGl2ZXJ5QWRkcmVzcygpO1xuXG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICB7IGNhcnRJZCwgdXNlcklkIH0sXG4gICAgICAgICAgICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnRcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25EZWxpdmVyeUFkZHJlc3NDcmVhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ3JlYXRlZEV2ZW50KVxuICAgICAgICAuc3Vic2NyaWJlKCh7IGNhcnRJZCwgdXNlcklkIH0pID0+IHtcbiAgICAgICAgICBpZiAodXNlcklkICE9PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHsgdXNlcklkIH0sIExvYWRVc2VyQWRkcmVzc2VzRXZlbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAgeyBrZXk6ICdhZGRyZXNzRm9ybS51c2VyQWRkcmVzc0FkZFN1Y2Nlc3MnIH0sXG4gICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgICAgICAgICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50KTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRGVsaXZlcnlBZGRyZXNzU2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2V0RXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKHsgdXNlcklkLCBjYXJ0SWQgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgeyB1c2VySWQsIGNhcnRJZCB9LFxuICAgICAgICAgICAgQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHt9LCBDaGVja291dFF1ZXJ5UmVzZXRFdmVudCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkRlbGl2ZXJ5QWRkcmVzc0NsZWFyZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAgIC5nZXQoQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDbGVhcmVkRXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaCh7fSwgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQpXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==