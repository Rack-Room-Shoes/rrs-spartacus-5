/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { CartAddEntryEvent, CartAddEntryFailEvent, CartAddEntrySuccessEvent, CartRemoveEntryFailEvent, CartRemoveEntrySuccessEvent, CartUpdateEntryFailEvent, CartUpdateEntrySuccessEvent, CreateCartEvent, CreateCartFailEvent, CreateCartSuccessEvent, DeleteCartEvent, DeleteCartFailEvent, DeleteCartSuccessEvent, } from '@spartacus/cart/base/root';
import { createFrom, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CartActions } from '../store/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
/**
 * Registers events for the active cart
 */
export class CartEventBuilder {
    constructor(actionsSubject, event, activeCartService, stateEventService) {
        this.actionsSubject = actionsSubject;
        this.event = event;
        this.activeCartService = activeCartService;
        this.stateEventService = stateEventService;
        this.register();
    }
    /**
     * Registers events for the active cart
     */
    register() {
        this.registerCreateCart();
        this.registerAddEntry();
        this.registerRemoveEntry();
        this.registerUpdateEntry();
        this.registerDeleteCart();
    }
    /**
     * Register events for adding entry to the active cart
     */
    registerAddEntry() {
        this.registerMapped({
            action: CartActions.CART_ADD_ENTRY,
            event: CartAddEntryEvent,
        });
        this.registerMapped({
            action: CartActions.CART_ADD_ENTRY_SUCCESS,
            event: CartAddEntrySuccessEvent,
        });
        this.registerMapped({
            action: CartActions.CART_ADD_ENTRY_FAIL,
            event: CartAddEntryFailEvent,
        });
    }
    registerRemoveEntry() {
        this.registerMapped({
            action: CartActions.CART_REMOVE_ENTRY_SUCCESS,
            event: CartRemoveEntrySuccessEvent,
        });
        this.registerMapped({
            action: CartActions.CART_REMOVE_ENTRY_FAIL,
            event: CartRemoveEntryFailEvent,
        });
    }
    registerUpdateEntry() {
        this.registerMapped({
            action: CartActions.CART_UPDATE_ENTRY_SUCCESS,
            event: CartUpdateEntrySuccessEvent,
        });
        this.registerMapped({
            action: CartActions.CART_UPDATE_ENTRY_FAIL,
            event: CartUpdateEntryFailEvent,
        });
    }
    registerCreateCart() {
        this.stateEventService.register({
            action: CartActions.CREATE_CART,
            event: CreateCartEvent,
        });
        this.stateEventService.register({
            action: CartActions.CREATE_CART_SUCCESS,
            event: CreateCartSuccessEvent,
        });
        this.stateEventService.register({
            action: CartActions.CREATE_CART_FAIL,
            event: CreateCartFailEvent,
        });
    }
    /**
     * Registers delete cart events
     */
    registerDeleteCart() {
        this.stateEventService.register({
            action: CartActions.DELETE_CART,
            event: DeleteCartEvent,
            factory: (action) => createFrom(DeleteCartEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: CartActions.DELETE_CART_SUCCESS,
            event: DeleteCartSuccessEvent,
            factory: (action) => createFrom(DeleteCartSuccessEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: CartActions.DELETE_CART_FAIL,
            event: DeleteCartFailEvent,
            factory: (action) => createFrom(DeleteCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
    }
    /**
     * Registers a stream of target events mapped from the source actions that contain the cart id equal to the active cart id.
     *
     * @param mapping mapping declaration - from `action` string type to `event` class type
     *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
     */
    registerMapped(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => {
            // SwitchMap was used instead of withLatestFrom, because we only want to subscribe to cart stream when action is dispatched.
            // Using withLatestFrom would trigger subscription to cart observables on event subscription and that causes side effects,
            // such as loading cart when we don't yet need it.
            return of(action).pipe(withLatestFrom(this.activeCartService.getActive(), this.activeCartService.getActiveCartId()));
        }), filter(([action, _activeCart, activeCartId]) => action.payload['cartId'] === activeCartId), map(([action, activeCart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: activeCart.code,
            entry: action.payload.entry
                ? action.payload.entry
                : activeCart.entries?.[Number(action.payload.entryNumber)],
        })));
        return this.event.register(mapping.event, eventStream$);
    }
    /**
     * Returns a stream of actions only of a given type(s)
     *
     * @param actionType type(s) of actions
     */
    getAction(actionType) {
        return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
    }
}
CartEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartEventBuilder, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }, { token: i3.ActiveCartFacade }, { token: i2.StateEventService }], target: i0.ɵɵFactoryTarget.Injectable });
CartEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartEventBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }, { type: i3.ActiveCartFacade }, { type: i2.StateEventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1ldmVudC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL2V2ZW50L2NhcnQtZXZlbnQuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLHdCQUF3QixFQUN4Qix3QkFBd0IsRUFDeEIsMkJBQTJCLEVBQzNCLHdCQUF3QixFQUN4QiwyQkFBMkIsRUFDM0IsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixzQkFBc0IsR0FDdkIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBRUwsVUFBVSxHQUdYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUU3Qzs7R0FFRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFDWSxjQUE4QixFQUM5QixLQUFtQixFQUNuQixpQkFBbUMsRUFDbkMsaUJBQW9DO1FBSHBDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUU5QyxJQUFJLENBQUMsUUFBUSxFQUFFLENB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LElBQUk7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFDekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFDdEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3RCxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLFNBQVMsQ0FDakIsVUFBNkI7UUFFN0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLEdBQUksRUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUMvQyxDQUFDO0lBQ0osQ0FBQzs7NkdBOUpVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBREgsTUFBTTsyRkFDbkIsZ0JBQWdCO2tCQUQ1QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0QWRkRW50cnlFdmVudCxcbiAgQ2FydEFkZEVudHJ5RmFpbEV2ZW50LFxuICBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQsXG4gIENhcnRSZW1vdmVFbnRyeUZhaWxFdmVudCxcbiAgQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50LFxuICBDYXJ0VXBkYXRlRW50cnlGYWlsRXZlbnQsXG4gIENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCxcbiAgQ3JlYXRlQ2FydEV2ZW50LFxuICBDcmVhdGVDYXJ0RmFpbEV2ZW50LFxuICBDcmVhdGVDYXJ0U3VjY2Vzc0V2ZW50LFxuICBEZWxldGVDYXJ0RXZlbnQsXG4gIERlbGV0ZUNhcnRGYWlsRXZlbnQsXG4gIERlbGV0ZUNhcnRTdWNjZXNzRXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQWN0aW9uVG9FdmVudE1hcHBpbmcsXG4gIGNyZWF0ZUZyb20sXG4gIEV2ZW50U2VydmljZSxcbiAgU3RhdGVFdmVudFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJ0QWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2luZGV4JztcblxuLyoqXG4gKiBSZWdpc3RlcnMgZXZlbnRzIGZvciB0aGUgYWN0aXZlIGNhcnRcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDYXJ0RXZlbnRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGlvbnNTdWJqZWN0OiBBY3Rpb25zU3ViamVjdCxcbiAgICBwcm90ZWN0ZWQgZXZlbnQ6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydFNlcnZpY2U6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHN0YXRlRXZlbnRTZXJ2aWNlOiBTdGF0ZUV2ZW50U2VydmljZVxuICApIHtcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGV2ZW50cyBmb3IgdGhlIGFjdGl2ZSBjYXJ0XG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5yZWdpc3RlckNyZWF0ZUNhcnQoKTtcbiAgICB0aGlzLnJlZ2lzdGVyQWRkRW50cnkoKTtcbiAgICB0aGlzLnJlZ2lzdGVyUmVtb3ZlRW50cnkoKTtcbiAgICB0aGlzLnJlZ2lzdGVyVXBkYXRlRW50cnkoKTtcbiAgICB0aGlzLnJlZ2lzdGVyRGVsZXRlQ2FydCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGV2ZW50cyBmb3IgYWRkaW5nIGVudHJ5IHRvIHRoZSBhY3RpdmUgY2FydFxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQWRkRW50cnkoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3Rlck1hcHBlZCh7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfQUREX0VOVFJZLFxuICAgICAgZXZlbnQ6IENhcnRBZGRFbnRyeUV2ZW50LFxuICAgIH0pO1xuICAgIHRoaXMucmVnaXN0ZXJNYXBwZWQoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX0FERF9FTlRSWV9TVUNDRVNTLFxuICAgICAgZXZlbnQ6IENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlZ2lzdGVyTWFwcGVkKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ0FSVF9BRERfRU5UUllfRkFJTCxcbiAgICAgIGV2ZW50OiBDYXJ0QWRkRW50cnlGYWlsRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJSZW1vdmVFbnRyeSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyTWFwcGVkKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ0FSVF9SRU1PVkVfRU5UUllfU1VDQ0VTUyxcbiAgICAgIGV2ZW50OiBDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnQsXG4gICAgfSk7XG4gICAgdGhpcy5yZWdpc3Rlck1hcHBlZCh7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfUkVNT1ZFX0VOVFJZX0ZBSUwsXG4gICAgICBldmVudDogQ2FydFJlbW92ZUVudHJ5RmFpbEV2ZW50LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyVXBkYXRlRW50cnkoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3Rlck1hcHBlZCh7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfVVBEQVRFX0VOVFJZX1NVQ0NFU1MsXG4gICAgICBldmVudDogQ2FydFVwZGF0ZUVudHJ5U3VjY2Vzc0V2ZW50LFxuICAgIH0pO1xuICAgIHRoaXMucmVnaXN0ZXJNYXBwZWQoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX1VQREFURV9FTlRSWV9GQUlMLFxuICAgICAgZXZlbnQ6IENhcnRVcGRhdGVFbnRyeUZhaWxFdmVudCxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWdpc3RlckNyZWF0ZUNhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNSRUFURV9DQVJULFxuICAgICAgZXZlbnQ6IENyZWF0ZUNhcnRFdmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ1JFQVRFX0NBUlRfU1VDQ0VTUyxcbiAgICAgIGV2ZW50OiBDcmVhdGVDYXJ0U3VjY2Vzc0V2ZW50LFxuICAgIH0pO1xuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DUkVBVEVfQ0FSVF9GQUlMLFxuICAgICAgZXZlbnQ6IENyZWF0ZUNhcnRGYWlsRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGRlbGV0ZSBjYXJ0IGV2ZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyRGVsZXRlQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuREVMRVRFX0NBUlQsXG4gICAgICBldmVudDogRGVsZXRlQ2FydEV2ZW50LFxuICAgICAgZmFjdG9yeTogKGFjdGlvbjogQ2FydEFjdGlvbnMuRGVsZXRlQ2FydCkgPT5cbiAgICAgICAgY3JlYXRlRnJvbShEZWxldGVDYXJ0RXZlbnQsIHtcbiAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBjYXJ0Q29kZTogYWN0aW9uLnBheWxvYWQuY2FydElkLFxuICAgICAgICB9KSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5ERUxFVEVfQ0FSVF9TVUNDRVNTLFxuICAgICAgZXZlbnQ6IERlbGV0ZUNhcnRTdWNjZXNzRXZlbnQsXG4gICAgICBmYWN0b3J5OiAoYWN0aW9uOiBDYXJ0QWN0aW9ucy5EZWxldGVDYXJ0U3VjY2VzcykgPT5cbiAgICAgICAgY3JlYXRlRnJvbShEZWxldGVDYXJ0U3VjY2Vzc0V2ZW50LCB7XG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgY2FydENvZGU6IGFjdGlvbi5wYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgfSksXG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuREVMRVRFX0NBUlRfRkFJTCxcbiAgICAgIGV2ZW50OiBEZWxldGVDYXJ0RmFpbEV2ZW50LFxuICAgICAgZmFjdG9yeTogKGFjdGlvbjogQ2FydEFjdGlvbnMuRGVsZXRlQ2FydEZhaWwpID0+XG4gICAgICAgIGNyZWF0ZUZyb20oRGVsZXRlQ2FydEZhaWxFdmVudCwge1xuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgIGNhcnRDb2RlOiBhY3Rpb24ucGF5bG9hZC5jYXJ0SWQsXG4gICAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIHN0cmVhbSBvZiB0YXJnZXQgZXZlbnRzIG1hcHBlZCBmcm9tIHRoZSBzb3VyY2UgYWN0aW9ucyB0aGF0IGNvbnRhaW4gdGhlIGNhcnQgaWQgZXF1YWwgdG8gdGhlIGFjdGl2ZSBjYXJ0IGlkLlxuICAgKlxuICAgKiBAcGFyYW0gbWFwcGluZyBtYXBwaW5nIGRlY2xhcmF0aW9uIC0gZnJvbSBgYWN0aW9uYCBzdHJpbmcgdHlwZSB0byBgZXZlbnRgIGNsYXNzIHR5cGVcbiAgICogICAoYW4gd2l0aCBvcHRpb25hbCBgZmFjdG9yeWAgZnVuY3Rpb24gLSBieSBkZWZhdWx0IGBhY3Rpb24ucGF5bG9hZGAgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgcHJvcGVydGllcyBvZiB0aGUgZXZlbnQgaW5zdGFuY2UpLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyTWFwcGVkPFQ+KG1hcHBpbmc6IEFjdGlvblRvRXZlbnRNYXBwaW5nPFQ+KTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgZXZlbnRTdHJlYW0kID0gdGhpcy5nZXRBY3Rpb24obWFwcGluZy5hY3Rpb24pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbikgPT4ge1xuICAgICAgICAvLyBTd2l0Y2hNYXAgd2FzIHVzZWQgaW5zdGVhZCBvZiB3aXRoTGF0ZXN0RnJvbSwgYmVjYXVzZSB3ZSBvbmx5IHdhbnQgdG8gc3Vic2NyaWJlIHRvIGNhcnQgc3RyZWFtIHdoZW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQuXG4gICAgICAgIC8vIFVzaW5nIHdpdGhMYXRlc3RGcm9tIHdvdWxkIHRyaWdnZXIgc3Vic2NyaXB0aW9uIHRvIGNhcnQgb2JzZXJ2YWJsZXMgb24gZXZlbnQgc3Vic2NyaXB0aW9uIGFuZCB0aGF0IGNhdXNlcyBzaWRlIGVmZmVjdHMsXG4gICAgICAgIC8vIHN1Y2ggYXMgbG9hZGluZyBjYXJ0IHdoZW4gd2UgZG9uJ3QgeWV0IG5lZWQgaXQuXG4gICAgICAgIHJldHVybiBvZihhY3Rpb24pLnBpcGUoXG4gICAgICAgICAgd2l0aExhdGVzdEZyb20oXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgICAgICAgICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5nZXRBY3RpdmVDYXJ0SWQoKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoW2FjdGlvbiwgX2FjdGl2ZUNhcnQsIGFjdGl2ZUNhcnRJZF0pID0+XG4gICAgICAgICAgYWN0aW9uLnBheWxvYWRbJ2NhcnRJZCddID09PSBhY3RpdmVDYXJ0SWRcbiAgICAgICksXG4gICAgICBtYXAoKFthY3Rpb24sIGFjdGl2ZUNhcnRdKSA9PlxuICAgICAgICBjcmVhdGVGcm9tKG1hcHBpbmcuZXZlbnQgYXMgVHlwZTxUPiwge1xuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgIGNhcnRDb2RlOiBhY3RpdmVDYXJ0LmNvZGUsXG4gICAgICAgICAgZW50cnk6IGFjdGlvbi5wYXlsb2FkLmVudHJ5XG4gICAgICAgICAgICA/IGFjdGlvbi5wYXlsb2FkLmVudHJ5XG4gICAgICAgICAgICA6IGFjdGl2ZUNhcnQuZW50cmllcz8uW051bWJlcihhY3Rpb24ucGF5bG9hZC5lbnRyeU51bWJlcildLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnQucmVnaXN0ZXIobWFwcGluZy5ldmVudCBhcyBUeXBlPFQ+LCBldmVudFN0cmVhbSQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJlYW0gb2YgYWN0aW9ucyBvbmx5IG9mIGEgZ2l2ZW4gdHlwZShzKVxuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uVHlwZSB0eXBlKHMpIG9mIGFjdGlvbnNcbiAgICovXG4gIHByb3RlY3RlZCBnZXRBY3Rpb24oXG4gICAgYWN0aW9uVHlwZTogc3RyaW5nIHwgc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTx7IHR5cGU6IHN0cmluZzsgcGF5bG9hZD86IGFueSB9PiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uc1N1YmplY3QucGlwZShcbiAgICAgIG9mVHlwZSguLi4oW10gYXMgc3RyaW5nW10pLmNvbmNhdChhY3Rpb25UeXBlKSlcbiAgICApO1xuICB9XG59XG4iXX0=