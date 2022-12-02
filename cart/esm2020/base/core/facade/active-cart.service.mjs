/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartType, } from '@spartacus/cart/base/root';
import { getLastValueSync, OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_GUEST, } from '@spartacus/core';
import { combineLatest, of, Subscription, using } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, shareReplay, switchMap, switchMapTo, take, tap, withLatestFrom, } from 'rxjs/operators';
import { getCartIdByUserId, isEmail, isEmpty, isJustLoggedIn, isTempCartId, } from '../utils/utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class ActiveCartService {
    constructor(multiCartFacade, userIdService) {
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.subscription = new Subscription();
        // This stream is used for referencing carts in API calls.
        this.activeCartId$ = this.userIdService.getUserId().pipe(
        // We want to wait the initialization of cartId until the userId is initialized
        // We have take(1) to not trigger this stream, when userId changes.
        take(1), switchMapTo(this.multiCartFacade.getCartIdByType(CartType.ACTIVE)), 
        // We also wait until we initialize cart from localStorage
        filter((cartId) => cartId !== undefined), 
        // fallback to current when we don't have particular cart id
        map((cartId) => (cartId === '' ? OCC_CART_ID_CURRENT : cartId)));
        // Stream with active cart entity
        this.cartEntity$ = this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getCartEntity(cartId)));
        // When the function `requireLoadedCart` is first called, the init cart loading for login user may not be done
        this.checkInitLoad = undefined;
        this.initActiveCart();
        this.detectUserChange();
    }
    initActiveCart() {
        // Stream for getting the cart value
        const cartValue$ = this.cartEntity$.pipe(map((cartEntity) => {
            return {
                cart: cartEntity.value,
                isStable: !cartEntity.loading && cartEntity.processesCount === 0,
                loaded: Boolean((cartEntity.error || cartEntity.success) && !cartEntity.loading),
            };
        }), 
        // we want to emit empty carts even if those are not stable
        // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
        // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
        filter(({ isStable, cart }) => isStable || isEmpty(cart)));
        // Responsible for loading cart when it does not exist (eg. app initialization when we have only cartId)
        const loading = cartValue$.pipe(withLatestFrom(this.activeCartId$, this.userIdService.getUserId()), tap(([{ cart, loaded, isStable }, cartId, userId]) => {
            if (isStable && isEmpty(cart) && !loaded && !isTempCartId(cartId)) {
                this.load(cartId, userId);
            }
        }));
        this.activeCart$ = using(() => loading.subscribe(), () => cartValue$).pipe(
        // Normalization for empty cart value returned as empty object.
        map(({ cart }) => (cart ? cart : {})), distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));
    }
    detectUserChange() {
        // Any changes of userId is interesting for us, because we have to merge/load/switch cart in those cases.
        this.subscription.add(this.userIdService
            .getUserId()
            .pipe(
        // We never trigger cart merge/load on app initialization here and that's why we wait with pairwise for a change of userId.
        pairwise(), 
        // We need cartId once we have the previous and current userId. We don't want to subscribe to cartId stream before.
        withLatestFrom(this.activeCartId$))
            .subscribe(([[previousUserId, userId], cartId]) => {
            // Only change of user and not logout (current userId !== anonymous) should trigger loading mechanism
            if (isJustLoggedIn(userId, previousUserId)) {
                this.loadOrMerge(cartId, userId, previousUserId);
            }
        }));
    }
    /**
     * Returns active cart
     */
    getActive() {
        return this.activeCart$;
    }
    /**
     * Waits for the cart to be stable before returning the active cart.
     */
    takeActive() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActive()), filter((cart) => !!cart), take(1));
    }
    /**
     * Returns active cart id
     */
    getActiveCartId() {
        return this.activeCart$.pipe(withLatestFrom(this.userIdService.getUserId()), map(([cart, userId]) => getCartIdByUserId(cart, userId)), distinctUntilChanged());
    }
    /**
     * Waits for the cart to be stable before returning the active cart's ID.
     */
    takeActiveCartId() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActiveCartId()), filter((cartId) => !!cartId), take(1));
    }
    /**
     * Returns cart entries
     */
    getEntries() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntries(cartId)), distinctUntilChanged());
    }
    /**
     * Returns last cart entry for provided product code.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param productCode
     */
    getLastEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getLastEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Returns cart loading state
     */
    getLoading() {
        return this.cartEntity$.pipe(map((cartEntity) => Boolean(cartEntity.loading)), distinctUntilChanged());
    }
    /**
     * Returns true when cart is stable (not loading and not pending processes on cart)
     */
    isStable() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.isStable(cartId)));
    }
    /**
     * Loads cart in every case except anonymous user and current cart combination
     */
    load(cartId, userId) {
        if (!(userId === OCC_USER_ID_ANONYMOUS && cartId === OCC_CART_ID_CURRENT)) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    /**
     * Loads cart upon login, whenever there's an existing cart, merge it into the current user cart
     * cartId will be defined (not '', null, undefined)
     */
    loadOrMerge(cartId, userId, previousUserId) {
        if (cartId === OCC_CART_ID_CURRENT ||
            // It covers the case when you are logged in and then asm user login, you don't want to merge, but only load emulated user cart
            // Similarly when you are logged in as asm user and you logout and want to resume previous user session
            previousUserId !== OCC_USER_ID_ANONYMOUS) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
        else if (Boolean(getLastValueSync(this.isGuestCart()))) {
            this.guestCartMerge(cartId);
        }
        else {
            // We have particular cart locally, but we logged in, so we need to combine this with current cart or make it ours.
            this.multiCartFacade.mergeToCurrentCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    // TODO: Remove once backend is updated
    /**
     * Temporary method to merge guest cart with user cart because of backend limitation
     * This is for an edge case
     */
    guestCartMerge(cartId) {
        this.getEntries()
            .pipe(take(1))
            .subscribe((entries) => {
            this.multiCartFacade.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);
            this.addEntriesGuestMerge(entries);
        });
    }
    /**
     * Adds entries from guest cart to user cart
     */
    addEntriesGuestMerge(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart(true)
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
        });
    }
    isCartCreating(cartState, cartId) {
        // cart creating is always represented with loading flags
        // when all loading flags are false it means that we restored wrong cart id
        // could happen on context change or reload right in the middle on cart create call
        return (isTempCartId(cartId) &&
            (cartState.loading || cartState.success || cartState.error));
    }
    requireLoadedCart(forGuestMerge = false) {
        this.checkInitLoad = this.checkInitLoad === undefined;
        // For guest cart merge we want to filter guest cart in the whole stream
        // We have to wait with load/create/addEntry after guest cart will be deleted.
        const cartSelector$ = (forGuestMerge
            ? this.cartEntity$.pipe(filter(() => !Boolean(getLastValueSync(this.isGuestCart()))))
            : this.cartEntity$).pipe(filter((cartState) => !cartState.loading || !!this.checkInitLoad));
        return this.activeCartId$.pipe(
        // Avoid load/create call when there are new cart creating at the moment
        withLatestFrom(cartSelector$), filter(([cartId, cartState]) => !this.isCartCreating(cartState, cartId)), map(([, cartState]) => cartState), take(1), withLatestFrom(this.userIdService.getUserId()), tap(([cartState, userId]) => {
            // Try to load the cart, because it might have been created on another device between our login and add entry call
            if (isEmpty(cartState.value) &&
                userId !== OCC_USER_ID_ANONYMOUS &&
                !cartState.loading) {
                this.load(OCC_CART_ID_CURRENT, userId);
            }
            this.checkInitLoad = false;
        }), switchMapTo(cartSelector$), 
        // create cart can happen to anonymous user if it is empty or to any other user if it is loaded and empty
        withLatestFrom(this.userIdService.getUserId()), filter(([cartState, userId]) => Boolean(userId === OCC_USER_ID_ANONYMOUS ||
            cartState.success ||
            cartState.error)), take(1), tap(([cartState, userId]) => {
            if (isEmpty(cartState.value)) {
                this.multiCartFacade.createCart({
                    userId,
                    extraData: {
                        active: true,
                    },
                });
            }
        }), switchMapTo(cartSelector$), filter((cartState) => cartState.success || cartState.error), 
        // wait for active cart id to point to code/guid to avoid some work on temp cart entity
        withLatestFrom(this.activeCartId$), filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)), map(([cartState]) => cartState.value), filter((cart) => !isEmpty(cart)), take(1));
    }
    /**
     * Add entry to active cart
     *
     * @param productCode
     * @param quantity
     */
    addEntry(productCode, quantity) {
        // TODO(#13645): Support multiple, simultaneous invocation of this function, when cart is not loaded/created
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntry(userId, getCartIdByUserId(cart, userId), productCode, quantity);
        });
    }
    /**
     * Remove entry
     *
     * @param entry
     */
    removeEntry(entry) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.removeEntry(userId, cartId, entry.entryNumber);
        });
    }
    /**
     * Update entry
     *
     * @param entryNumber
     * @param quantity
     */
    updateEntry(entryNumber, quantity) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.updateEntry(userId, cartId, entryNumber, quantity);
        });
    }
    /**
     * Returns cart entry
     *
     * @param productCode
     */
    getEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Assign email to cart
     *
     * @param email
     */
    addEmail(email) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.assignEmail(cartId, userId, email);
        });
    }
    /**
     * Get assigned user to cart
     */
    getAssignedUser() {
        return this.activeCart$.pipe(map((cart) => cart.user));
    }
    // TODO: Make cart required param in 4.0
    /**
     * Returns observable of true for guest cart
     */
    isGuestCart(cart) {
        return cart
            ? of(this.isCartUserGuest(cart))
            : this.activeCart$.pipe(map((activeCart) => this.isCartUserGuest(activeCart)), distinctUntilChanged());
    }
    isCartUserGuest(cart) {
        const cartUser = cart.user;
        return Boolean(cartUser &&
            (cartUser.name === OCC_USER_ID_GUEST ||
                isEmail(cartUser.uid?.split('|').slice(1).join('|'))));
    }
    /**
     * Add multiple entries to a cart
     *
     * @param cartEntries : list of entries to add (OrderEntry[])
     */
    addEntries(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            if (cart) {
                this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
            }
        });
    }
    /**
     * Reloads active cart
     */
    reloadActiveCart() {
        combineLatest([this.getActiveCartId(), this.userIdService.takeUserId()])
            .pipe(take(1), map(([cartId, userId]) => {
            this.multiCartFacade.loadCart({
                cartId,
                userId,
                extraData: { active: true },
            });
        }))
            .subscribe();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ActiveCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveCartService, deps: [{ token: i1.MultiCartFacade }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MultiCartFacade }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWNhcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29yZS9mYWNhZGUvYWN0aXZlLWNhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBR0wsUUFBUSxHQUdULE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGlCQUFpQixHQUlsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxJQUFJLEVBQ0osR0FBRyxFQUNILGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsT0FBTyxFQUNQLE9BQU8sRUFDUCxjQUFjLEVBQ2QsWUFBWSxHQUNiLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHeEIsTUFBTSxPQUFPLGlCQUFpQjtJQXFCNUIsWUFDWSxlQUFnQyxFQUNoQyxhQUE0QjtRQUQ1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFyQjlCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QywwREFBMEQ7UUFDaEQsa0JBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUk7UUFDM0QsK0VBQStFO1FBQy9FLG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSwwREFBMEQ7UUFDMUQsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDO1FBQ3hDLDREQUE0RDtRQUM1RCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ2hFLENBQUM7UUFFRixpQ0FBaUM7UUFDdkIsZ0JBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDN0MsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNsRSxDQUFDO1FBNlBGLDhHQUE4RztRQUN0RyxrQkFBYSxHQUF3QixTQUFTLENBQUM7UUF4UHJELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRVMsY0FBYztRQUN0QixvQ0FBb0M7UUFDcEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3RDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2pCLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLO2dCQUN0QixRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxjQUFjLEtBQUssQ0FBQztnQkFDaEUsTUFBTSxFQUFFLE9BQU8sQ0FDYixDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FDaEU7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBQ0YsMkRBQTJEO1FBQzNELG9IQUFvSDtRQUNwSCxzRkFBc0Y7UUFDdEYsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztRQUVGLHdHQUF3RztRQUN4RyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUM3QixjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQ2xFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ25ELElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQ3RCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFDekIsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUNqQixDQUFDLElBQUk7UUFDSiwrREFBK0Q7UUFDL0QsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDckMsb0JBQW9CLEVBQUUsRUFDdEIsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztJQUNKLENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIseUdBQXlHO1FBQ3pHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsYUFBYTthQUNmLFNBQVMsRUFBRTthQUNYLElBQUk7UUFDSCwySEFBMkg7UUFDM0gsUUFBUSxFQUFFO1FBQ1YsbUhBQW1IO1FBQ25ILGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQ25DO2FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ2hELHFHQUFxRztZQUNyRyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQ3pCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQzFCLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzlDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFDeEQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FDekIsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFDOUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUN2QyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFDNUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDNUIsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUM5RCxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFlBQVksQ0FBQyxXQUFtQjtRQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUM1QixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQ3ZELEVBQ0Qsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUMxQixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDaEQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUM1QixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQzdELENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDTyxJQUFJLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDM0MsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLHFCQUFxQixJQUFJLE1BQU0sS0FBSyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3pFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2dCQUM1QixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sU0FBUyxFQUFFO29CQUNULE1BQU0sRUFBRSxJQUFJO2lCQUNiO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sV0FBVyxDQUNuQixNQUFjLEVBQ2QsTUFBYyxFQUNkLGNBQXNCO1FBRXRCLElBQ0UsTUFBTSxLQUFLLG1CQUFtQjtZQUM5QiwrSEFBK0g7WUFDL0gsdUdBQXVHO1lBQ3ZHLGNBQWMsS0FBSyxxQkFBcUIsRUFDeEM7WUFDQSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztnQkFDNUIsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFNBQVMsRUFBRTtvQkFDVCxNQUFNLEVBQUUsSUFBSTtpQkFDYjthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxtSEFBbUg7WUFDbkgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdEMsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFNBQVMsRUFBRTtvQkFDVCxNQUFNLEVBQUUsSUFBSTtpQkFDYjthQUNGLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELHVDQUF1QztJQUN2Qzs7O09BR0c7SUFDTyxjQUFjLENBQUMsTUFBYztRQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO2FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNPLG9CQUFvQixDQUFDLFdBQXlCO1FBQ3RELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDdEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQztTQUM5QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7YUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7YUFDcEQsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDN0IsTUFBTSxFQUNOLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFDL0IsWUFBWSxDQUNiLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxjQUFjLENBQ3RCLFNBQTRELEVBQzVELE1BQWM7UUFFZCx5REFBeUQ7UUFDekQsMkVBQTJFO1FBQzNFLG1GQUFtRjtRQUNuRixPQUFPLENBQ0wsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUNwQixDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQzVELENBQUM7SUFDSixDQUFDO0lBS0QsaUJBQWlCLENBQUMsYUFBYSxHQUFHLEtBQUs7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQztRQUV0RCx3RUFBd0U7UUFDeEUsOEVBQThFO1FBQzlFLE1BQU0sYUFBYSxHQUFHLENBQ3BCLGFBQWE7WUFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25CLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQzdEO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQ3JCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUUxRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSTtRQUM1Qix3RUFBd0U7UUFDeEUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUN4RSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDOUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUMxQixrSEFBa0g7WUFDbEgsSUFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsTUFBTSxLQUFLLHFCQUFxQjtnQkFDaEMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUNsQjtnQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLEVBQ0YsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUMxQix5R0FBeUc7UUFDekcsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUM3QixPQUFPLENBQ0wsTUFBTSxLQUFLLHFCQUFxQjtZQUM5QixTQUFTLENBQUMsT0FBTztZQUNqQixTQUFTLENBQUMsS0FBSyxDQUNsQixDQUNGLEVBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztvQkFDOUIsTUFBTTtvQkFDTixTQUFTLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUk7cUJBQ2I7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsRUFDRixXQUFXLENBQUMsYUFBYSxDQUFDLEVBQzFCLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzNELHVGQUF1RjtRQUN2RixjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUN4RSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ3JDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxRQUFRLENBQUMsV0FBbUIsRUFBRSxRQUFnQjtRQUM1Qyw0R0FBNEc7UUFDNUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQ3BELFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQzNCLE1BQU0sRUFDTixpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQy9CLFdBQVcsRUFDWCxRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsS0FBaUI7UUFDM0IsSUFBSSxDQUFDLGFBQWE7YUFDZixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDOUIsTUFBTSxFQUNOLE1BQU0sRUFDTixLQUFLLENBQUMsV0FBcUIsQ0FDNUIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7UUFDL0MsSUFBSSxDQUFDLGFBQWE7YUFDZixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0QsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLFdBQW1CO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQzVCLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQ3pFLG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxhQUFhO2FBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdELFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQVksQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHdDQUF3QztJQUN4Qzs7T0FFRztJQUNILFdBQVcsQ0FBQyxJQUFXO1FBQ3JCLE9BQU8sSUFBSTtZQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25CLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUNyRCxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0lBQ1IsQ0FBQztJQUVTLGVBQWUsQ0FBQyxJQUFVO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDM0IsT0FBTyxPQUFPLENBQ1osUUFBUTtZQUNOLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxpQkFBaUI7Z0JBQ2xDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLFdBQXlCO1FBQ2xDLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDdEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQztTQUM5QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxpQkFBaUIsRUFBRTthQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUNwRCxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUM3QixNQUFNLEVBQ04saUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUMvQixZQUFZLENBQ2IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDZCxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ3JFLElBQUksQ0FDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztnQkFDNUIsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7YUFDNUIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OEdBdGVVLGlCQUFpQjtrSEFBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIENhcnQsXG4gIENhcnRUeXBlLFxuICBNdWx0aUNhcnRGYWNhZGUsXG4gIE9yZGVyRW50cnksXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgZ2V0TGFzdFZhbHVlU3luYyxcbiAgT0NDX0NBUlRfSURfQ1VSUkVOVCxcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBPQ0NfVVNFUl9JRF9HVUVTVCxcbiAgU3RhdGVVdGlscyxcbiAgVXNlcixcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24sIHVzaW5nIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHBhaXJ3aXNlLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxuICBzd2l0Y2hNYXBUbyxcbiAgdGFrZSxcbiAgdGFwLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgZ2V0Q2FydElkQnlVc2VySWQsXG4gIGlzRW1haWwsXG4gIGlzRW1wdHksXG4gIGlzSnVzdExvZ2dlZEluLFxuICBpc1RlbXBDYXJ0SWQsXG59IGZyb20gJy4uL3V0aWxzL3V0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGl2ZUNhcnRTZXJ2aWNlIGltcGxlbWVudHMgQWN0aXZlQ2FydEZhY2FkZSwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIGFjdGl2ZUNhcnQkOiBPYnNlcnZhYmxlPENhcnQ+O1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIC8vIFRoaXMgc3RyZWFtIGlzIHVzZWQgZm9yIHJlZmVyZW5jaW5nIGNhcnRzIGluIEFQSSBjYWxscy5cbiAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRJZCQgPSB0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkucGlwZShcbiAgICAvLyBXZSB3YW50IHRvIHdhaXQgdGhlIGluaXRpYWxpemF0aW9uIG9mIGNhcnRJZCB1bnRpbCB0aGUgdXNlcklkIGlzIGluaXRpYWxpemVkXG4gICAgLy8gV2UgaGF2ZSB0YWtlKDEpIHRvIG5vdCB0cmlnZ2VyIHRoaXMgc3RyZWFtLCB3aGVuIHVzZXJJZCBjaGFuZ2VzLlxuICAgIHRha2UoMSksXG4gICAgc3dpdGNoTWFwVG8odGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0Q2FydElkQnlUeXBlKENhcnRUeXBlLkFDVElWRSkpLFxuICAgIC8vIFdlIGFsc28gd2FpdCB1bnRpbCB3ZSBpbml0aWFsaXplIGNhcnQgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICBmaWx0ZXIoKGNhcnRJZCkgPT4gY2FydElkICE9PSB1bmRlZmluZWQpLFxuICAgIC8vIGZhbGxiYWNrIHRvIGN1cnJlbnQgd2hlbiB3ZSBkb24ndCBoYXZlIHBhcnRpY3VsYXIgY2FydCBpZFxuICAgIG1hcCgoY2FydElkKSA9PiAoY2FydElkID09PSAnJyA/IE9DQ19DQVJUX0lEX0NVUlJFTlQgOiBjYXJ0SWQpKVxuICApO1xuXG4gIC8vIFN0cmVhbSB3aXRoIGFjdGl2ZSBjYXJ0IGVudGl0eVxuICBwcm90ZWN0ZWQgY2FydEVudGl0eSQgPSB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICBzd2l0Y2hNYXAoKGNhcnRJZCkgPT4gdGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0Q2FydEVudGl0eShjYXJ0SWQpKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBtdWx0aUNhcnRGYWNhZGU6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZVxuICApIHtcbiAgICB0aGlzLmluaXRBY3RpdmVDYXJ0KCk7XG4gICAgdGhpcy5kZXRlY3RVc2VyQ2hhbmdlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdEFjdGl2ZUNhcnQoKSB7XG4gICAgLy8gU3RyZWFtIGZvciBnZXR0aW5nIHRoZSBjYXJ0IHZhbHVlXG4gICAgY29uc3QgY2FydFZhbHVlJCA9IHRoaXMuY2FydEVudGl0eSQucGlwZShcbiAgICAgIG1hcCgoY2FydEVudGl0eSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNhcnQ6IGNhcnRFbnRpdHkudmFsdWUsXG4gICAgICAgICAgaXNTdGFibGU6ICFjYXJ0RW50aXR5LmxvYWRpbmcgJiYgY2FydEVudGl0eS5wcm9jZXNzZXNDb3VudCA9PT0gMCxcbiAgICAgICAgICBsb2FkZWQ6IEJvb2xlYW4oXG4gICAgICAgICAgICAoY2FydEVudGl0eS5lcnJvciB8fCBjYXJ0RW50aXR5LnN1Y2Nlc3MpICYmICFjYXJ0RW50aXR5LmxvYWRpbmdcbiAgICAgICAgICApLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICAvLyB3ZSB3YW50IHRvIGVtaXQgZW1wdHkgY2FydHMgZXZlbiBpZiB0aG9zZSBhcmUgbm90IHN0YWJsZVxuICAgICAgLy8gb24gbWVyZ2UgY2FydCBhY3Rpb24gd2Ugd2FudCB0byBzd2l0Y2ggdG8gZW1wdHkgY2FydCBzbyBubyBvbmUgd291bGQgdXNlIG9sZCBjYXJ0SWQgd2hpY2ggY2FuIGJlIGFscmVhZHkgb2Jzb2xldGVcbiAgICAgIC8vIHNvIG9uIG1lcmdlIGFjdGlvbiB0aGUgcmVzdWx0aW5nIHN0cmVhbSBsb29rcyBsaWtlIHRoaXM6IG9sZF9jYXJ0IC0+IHt9IC0+IG5ld19jYXJ0XG4gICAgICBmaWx0ZXIoKHsgaXNTdGFibGUsIGNhcnQgfSkgPT4gaXNTdGFibGUgfHwgaXNFbXB0eShjYXJ0KSlcbiAgICApO1xuXG4gICAgLy8gUmVzcG9uc2libGUgZm9yIGxvYWRpbmcgY2FydCB3aGVuIGl0IGRvZXMgbm90IGV4aXN0IChlZy4gYXBwIGluaXRpYWxpemF0aW9uIHdoZW4gd2UgaGF2ZSBvbmx5IGNhcnRJZClcbiAgICBjb25zdCBsb2FkaW5nID0gY2FydFZhbHVlJC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5hY3RpdmVDYXJ0SWQkLCB0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgdGFwKChbeyBjYXJ0LCBsb2FkZWQsIGlzU3RhYmxlIH0sIGNhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICBpZiAoaXNTdGFibGUgJiYgaXNFbXB0eShjYXJ0KSAmJiAhbG9hZGVkICYmICFpc1RlbXBDYXJ0SWQoY2FydElkKSkge1xuICAgICAgICAgIHRoaXMubG9hZChjYXJ0SWQsIHVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuYWN0aXZlQ2FydCQgPSB1c2luZyhcbiAgICAgICgpID0+IGxvYWRpbmcuc3Vic2NyaWJlKCksXG4gICAgICAoKSA9PiBjYXJ0VmFsdWUkXG4gICAgKS5waXBlKFxuICAgICAgLy8gTm9ybWFsaXphdGlvbiBmb3IgZW1wdHkgY2FydCB2YWx1ZSByZXR1cm5lZCBhcyBlbXB0eSBvYmplY3QuXG4gICAgICBtYXAoKHsgY2FydCB9KSA9PiAoY2FydCA/IGNhcnQgOiB7fSkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRldGVjdFVzZXJDaGFuZ2UoKSB7XG4gICAgLy8gQW55IGNoYW5nZXMgb2YgdXNlcklkIGlzIGludGVyZXN0aW5nIGZvciB1cywgYmVjYXVzZSB3ZSBoYXZlIHRvIG1lcmdlL2xvYWQvc3dpdGNoIGNhcnQgaW4gdGhvc2UgY2FzZXMuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgIC5nZXRVc2VySWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBXZSBuZXZlciB0cmlnZ2VyIGNhcnQgbWVyZ2UvbG9hZCBvbiBhcHAgaW5pdGlhbGl6YXRpb24gaGVyZSBhbmQgdGhhdCdzIHdoeSB3ZSB3YWl0IHdpdGggcGFpcndpc2UgZm9yIGEgY2hhbmdlIG9mIHVzZXJJZC5cbiAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgIC8vIFdlIG5lZWQgY2FydElkIG9uY2Ugd2UgaGF2ZSB0aGUgcHJldmlvdXMgYW5kIGN1cnJlbnQgdXNlcklkLiBXZSBkb24ndCB3YW50IHRvIHN1YnNjcmliZSB0byBjYXJ0SWQgc3RyZWFtIGJlZm9yZS5cbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmFjdGl2ZUNhcnRJZCQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoW1twcmV2aW91c1VzZXJJZCwgdXNlcklkXSwgY2FydElkXSkgPT4ge1xuICAgICAgICAgIC8vIE9ubHkgY2hhbmdlIG9mIHVzZXIgYW5kIG5vdCBsb2dvdXQgKGN1cnJlbnQgdXNlcklkICE9PSBhbm9ueW1vdXMpIHNob3VsZCB0cmlnZ2VyIGxvYWRpbmcgbWVjaGFuaXNtXG4gICAgICAgICAgaWYgKGlzSnVzdExvZ2dlZEluKHVzZXJJZCwgcHJldmlvdXNVc2VySWQpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRPck1lcmdlKGNhcnRJZCwgdXNlcklkLCBwcmV2aW91c1VzZXJJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhY3RpdmUgY2FydFxuICAgKi9cbiAgZ2V0QWN0aXZlKCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnQkO1xuICB9XG5cbiAgLyoqXG4gICAqIFdhaXRzIGZvciB0aGUgY2FydCB0byBiZSBzdGFibGUgYmVmb3JlIHJldHVybmluZyB0aGUgYWN0aXZlIGNhcnQuXG4gICAqL1xuICB0YWtlQWN0aXZlKCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmlzU3RhYmxlKCkucGlwZShcbiAgICAgIGZpbHRlcigoaXNTdGFibGUpID0+IGlzU3RhYmxlKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmdldEFjdGl2ZSgpKSxcbiAgICAgIGZpbHRlcigoY2FydCkgPT4gISFjYXJ0KSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWN0aXZlIGNhcnQgaWRcbiAgICovXG4gIGdldEFjdGl2ZUNhcnRJZCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnQkLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgbWFwKChbY2FydCwgdXNlcklkXSkgPT4gZ2V0Q2FydElkQnlVc2VySWQoY2FydCwgdXNlcklkKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhcnQgdG8gYmUgc3RhYmxlIGJlZm9yZSByZXR1cm5pbmcgdGhlIGFjdGl2ZSBjYXJ0J3MgSUQuXG4gICAqL1xuICB0YWtlQWN0aXZlQ2FydElkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuaXNTdGFibGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChpc1N0YWJsZSkgPT4gaXNTdGFibGUpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuZ2V0QWN0aXZlQ2FydElkKCkpLFxuICAgICAgZmlsdGVyKChjYXJ0SWQpID0+ICEhY2FydElkKSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FydCBlbnRyaWVzXG4gICAqL1xuICBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydElkJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjYXJ0SWQpID0+IHRoaXMubXVsdGlDYXJ0RmFjYWRlLmdldEVudHJpZXMoY2FydElkKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxhc3QgY2FydCBlbnRyeSBmb3IgcHJvdmlkZWQgcHJvZHVjdCBjb2RlLlxuICAgKiBOZWVkZWQgdG8gY292ZXIgcHJvY2Vzc2VzIHdoZXJlIG11bHRpcGxlIGVudHJpZXMgY2FuIHNoYXJlIHRoZSBzYW1lIHByb2R1Y3QgY29kZVxuICAgKiAoZS5nLiBwcm9tb3Rpb25zIG9yIGNvbmZpZ3VyYWJsZSBwcm9kdWN0cylcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqL1xuICBnZXRMYXN0RW50cnkocHJvZHVjdENvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8T3JkZXJFbnRyeSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkKSA9PlxuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5nZXRMYXN0RW50cnkoY2FydElkLCBwcm9kdWN0Q29kZSlcbiAgICAgICksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0RW50aXR5JC5waXBlKFxuICAgICAgbWFwKChjYXJ0RW50aXR5KSA9PiBCb29sZWFuKGNhcnRFbnRpdHkubG9hZGluZykpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gY2FydCBpcyBzdGFibGUgKG5vdCBsb2FkaW5nIGFuZCBub3QgcGVuZGluZyBwcm9jZXNzZXMgb24gY2FydClcbiAgICovXG4gIGlzU3RhYmxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkKSA9PiB0aGlzLm11bHRpQ2FydEZhY2FkZS5pc1N0YWJsZShjYXJ0SWQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgY2FydCBpbiBldmVyeSBjYXNlIGV4Y2VwdCBhbm9ueW1vdXMgdXNlciBhbmQgY3VycmVudCBjYXJ0IGNvbWJpbmF0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgbG9hZChjYXJ0SWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoISh1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJiBjYXJ0SWQgPT09IE9DQ19DQVJUX0lEX0NVUlJFTlQpKSB7XG4gICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgY2FydCB1cG9uIGxvZ2luLCB3aGVuZXZlciB0aGVyZSdzIGFuIGV4aXN0aW5nIGNhcnQsIG1lcmdlIGl0IGludG8gdGhlIGN1cnJlbnQgdXNlciBjYXJ0XG4gICAqIGNhcnRJZCB3aWxsIGJlIGRlZmluZWQgKG5vdCAnJywgbnVsbCwgdW5kZWZpbmVkKVxuICAgKi9cbiAgcHJvdGVjdGVkIGxvYWRPck1lcmdlKFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHByZXZpb3VzVXNlcklkOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY2FydElkID09PSBPQ0NfQ0FSVF9JRF9DVVJSRU5UIHx8XG4gICAgICAvLyBJdCBjb3ZlcnMgdGhlIGNhc2Ugd2hlbiB5b3UgYXJlIGxvZ2dlZCBpbiBhbmQgdGhlbiBhc20gdXNlciBsb2dpbiwgeW91IGRvbid0IHdhbnQgdG8gbWVyZ2UsIGJ1dCBvbmx5IGxvYWQgZW11bGF0ZWQgdXNlciBjYXJ0XG4gICAgICAvLyBTaW1pbGFybHkgd2hlbiB5b3UgYXJlIGxvZ2dlZCBpbiBhcyBhc20gdXNlciBhbmQgeW91IGxvZ291dCBhbmQgd2FudCB0byByZXN1bWUgcHJldmlvdXMgdXNlciBzZXNzaW9uXG4gICAgICBwcmV2aW91c1VzZXJJZCAhPT0gT0NDX1VTRVJfSURfQU5PTllNT1VTXG4gICAgKSB7XG4gICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKEJvb2xlYW4oZ2V0TGFzdFZhbHVlU3luYyh0aGlzLmlzR3Vlc3RDYXJ0KCkpKSkge1xuICAgICAgdGhpcy5ndWVzdENhcnRNZXJnZShjYXJ0SWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBoYXZlIHBhcnRpY3VsYXIgY2FydCBsb2NhbGx5LCBidXQgd2UgbG9nZ2VkIGluLCBzbyB3ZSBuZWVkIHRvIGNvbWJpbmUgdGhpcyB3aXRoIGN1cnJlbnQgY2FydCBvciBtYWtlIGl0IG91cnMuXG4gICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5tZXJnZVRvQ3VycmVudENhcnQoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgICAgZXh0cmFEYXRhOiB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogUmVtb3ZlIG9uY2UgYmFja2VuZCBpcyB1cGRhdGVkXG4gIC8qKlxuICAgKiBUZW1wb3JhcnkgbWV0aG9kIHRvIG1lcmdlIGd1ZXN0IGNhcnQgd2l0aCB1c2VyIGNhcnQgYmVjYXVzZSBvZiBiYWNrZW5kIGxpbWl0YXRpb25cbiAgICogVGhpcyBpcyBmb3IgYW4gZWRnZSBjYXNlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ3Vlc3RDYXJ0TWVyZ2UoY2FydElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmdldEVudHJpZXMoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGVudHJpZXMpID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuZGVsZXRlQ2FydChjYXJ0SWQsIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyk7XG4gICAgICAgIHRoaXMuYWRkRW50cmllc0d1ZXN0TWVyZ2UoZW50cmllcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGVudHJpZXMgZnJvbSBndWVzdCBjYXJ0IHRvIHVzZXIgY2FydFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZEVudHJpZXNHdWVzdE1lcmdlKGNhcnRFbnRyaWVzOiBPcmRlckVudHJ5W10pIHtcbiAgICBjb25zdCBlbnRyaWVzVG9BZGQgPSBjYXJ0RW50cmllcy5tYXAoKGVudHJ5KSA9PiAoe1xuICAgICAgcHJvZHVjdENvZGU6IGVudHJ5LnByb2R1Y3Q/LmNvZGUgPz8gJycsXG4gICAgICBxdWFudGl0eTogZW50cnkucXVhbnRpdHkgPz8gMCxcbiAgICB9KSk7XG4gICAgdGhpcy5yZXF1aXJlTG9hZGVkQ2FydCh0cnVlKVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0LCB1c2VySWRdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmFkZEVudHJpZXMoXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGdldENhcnRJZEJ5VXNlcklkKGNhcnQsIHVzZXJJZCksXG4gICAgICAgICAgZW50cmllc1RvQWRkXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NhcnRDcmVhdGluZyhcbiAgICBjYXJ0U3RhdGU6IFN0YXRlVXRpbHMuUHJvY2Vzc2VzTG9hZGVyU3RhdGU8Q2FydCB8IHVuZGVmaW5lZD4sXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKSB7XG4gICAgLy8gY2FydCBjcmVhdGluZyBpcyBhbHdheXMgcmVwcmVzZW50ZWQgd2l0aCBsb2FkaW5nIGZsYWdzXG4gICAgLy8gd2hlbiBhbGwgbG9hZGluZyBmbGFncyBhcmUgZmFsc2UgaXQgbWVhbnMgdGhhdCB3ZSByZXN0b3JlZCB3cm9uZyBjYXJ0IGlkXG4gICAgLy8gY291bGQgaGFwcGVuIG9uIGNvbnRleHQgY2hhbmdlIG9yIHJlbG9hZCByaWdodCBpbiB0aGUgbWlkZGxlIG9uIGNhcnQgY3JlYXRlIGNhbGxcbiAgICByZXR1cm4gKFxuICAgICAgaXNUZW1wQ2FydElkKGNhcnRJZCkgJiZcbiAgICAgIChjYXJ0U3RhdGUubG9hZGluZyB8fCBjYXJ0U3RhdGUuc3VjY2VzcyB8fCBjYXJ0U3RhdGUuZXJyb3IpXG4gICAgKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIGZ1bmN0aW9uIGByZXF1aXJlTG9hZGVkQ2FydGAgaXMgZmlyc3QgY2FsbGVkLCB0aGUgaW5pdCBjYXJ0IGxvYWRpbmcgZm9yIGxvZ2luIHVzZXIgbWF5IG5vdCBiZSBkb25lXG4gIHByaXZhdGUgY2hlY2tJbml0TG9hZDogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICByZXF1aXJlTG9hZGVkQ2FydChmb3JHdWVzdE1lcmdlID0gZmFsc2UpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICB0aGlzLmNoZWNrSW5pdExvYWQgPSB0aGlzLmNoZWNrSW5pdExvYWQgPT09IHVuZGVmaW5lZDtcblxuICAgIC8vIEZvciBndWVzdCBjYXJ0IG1lcmdlIHdlIHdhbnQgdG8gZmlsdGVyIGd1ZXN0IGNhcnQgaW4gdGhlIHdob2xlIHN0cmVhbVxuICAgIC8vIFdlIGhhdmUgdG8gd2FpdCB3aXRoIGxvYWQvY3JlYXRlL2FkZEVudHJ5IGFmdGVyIGd1ZXN0IGNhcnQgd2lsbCBiZSBkZWxldGVkLlxuICAgIGNvbnN0IGNhcnRTZWxlY3RvciQgPSAoXG4gICAgICBmb3JHdWVzdE1lcmdlXG4gICAgICAgID8gdGhpcy5jYXJ0RW50aXR5JC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+ICFCb29sZWFuKGdldExhc3RWYWx1ZVN5bmModGhpcy5pc0d1ZXN0Q2FydCgpKSkpXG4gICAgICAgICAgKVxuICAgICAgICA6IHRoaXMuY2FydEVudGl0eSRcbiAgICApLnBpcGUoZmlsdGVyKChjYXJ0U3RhdGUpID0+ICFjYXJ0U3RhdGUubG9hZGluZyB8fCAhIXRoaXMuY2hlY2tJbml0TG9hZCkpO1xuXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydElkJC5waXBlKFxuICAgICAgLy8gQXZvaWQgbG9hZC9jcmVhdGUgY2FsbCB3aGVuIHRoZXJlIGFyZSBuZXcgY2FydCBjcmVhdGluZyBhdCB0aGUgbW9tZW50XG4gICAgICB3aXRoTGF0ZXN0RnJvbShjYXJ0U2VsZWN0b3IkKSxcbiAgICAgIGZpbHRlcigoW2NhcnRJZCwgY2FydFN0YXRlXSkgPT4gIXRoaXMuaXNDYXJ0Q3JlYXRpbmcoY2FydFN0YXRlLCBjYXJ0SWQpKSxcbiAgICAgIG1hcCgoWywgY2FydFN0YXRlXSkgPT4gY2FydFN0YXRlKSxcbiAgICAgIHRha2UoMSksXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgdGFwKChbY2FydFN0YXRlLCB1c2VySWRdKSA9PiB7XG4gICAgICAgIC8vIFRyeSB0byBsb2FkIHRoZSBjYXJ0LCBiZWNhdXNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBjcmVhdGVkIG9uIGFub3RoZXIgZGV2aWNlIGJldHdlZW4gb3VyIGxvZ2luIGFuZCBhZGQgZW50cnkgY2FsbFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNFbXB0eShjYXJ0U3RhdGUudmFsdWUpICYmXG4gICAgICAgICAgdXNlcklkICE9PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgJiZcbiAgICAgICAgICAhY2FydFN0YXRlLmxvYWRpbmdcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5sb2FkKE9DQ19DQVJUX0lEX0NVUlJFTlQsIHVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0luaXRMb2FkID0gZmFsc2U7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcFRvKGNhcnRTZWxlY3RvciQpLFxuICAgICAgLy8gY3JlYXRlIGNhcnQgY2FuIGhhcHBlbiB0byBhbm9ueW1vdXMgdXNlciBpZiBpdCBpcyBlbXB0eSBvciB0byBhbnkgb3RoZXIgdXNlciBpZiBpdCBpcyBsb2FkZWQgYW5kIGVtcHR5XG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgZmlsdGVyKChbY2FydFN0YXRlLCB1c2VySWRdKSA9PlxuICAgICAgICBCb29sZWFuKFxuICAgICAgICAgIHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTIHx8XG4gICAgICAgICAgICBjYXJ0U3RhdGUuc3VjY2VzcyB8fFxuICAgICAgICAgICAgY2FydFN0YXRlLmVycm9yXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICB0YWtlKDEpLFxuICAgICAgdGFwKChbY2FydFN0YXRlLCB1c2VySWRdKSA9PiB7XG4gICAgICAgIGlmIChpc0VtcHR5KGNhcnRTdGF0ZS52YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5jcmVhdGVDYXJ0KHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGV4dHJhRGF0YToge1xuICAgICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcFRvKGNhcnRTZWxlY3RvciQpLFxuICAgICAgZmlsdGVyKChjYXJ0U3RhdGUpID0+IGNhcnRTdGF0ZS5zdWNjZXNzIHx8IGNhcnRTdGF0ZS5lcnJvciksXG4gICAgICAvLyB3YWl0IGZvciBhY3RpdmUgY2FydCBpZCB0byBwb2ludCB0byBjb2RlL2d1aWQgdG8gYXZvaWQgc29tZSB3b3JrIG9uIHRlbXAgY2FydCBlbnRpdHlcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuYWN0aXZlQ2FydElkJCksXG4gICAgICBmaWx0ZXIoKFtjYXJ0U3RhdGUsIGNhcnRJZF0pID0+ICF0aGlzLmlzQ2FydENyZWF0aW5nKGNhcnRTdGF0ZSwgY2FydElkKSksXG4gICAgICBtYXAoKFtjYXJ0U3RhdGVdKSA9PiBjYXJ0U3RhdGUudmFsdWUpLFxuICAgICAgZmlsdGVyKChjYXJ0KSA9PiAhaXNFbXB0eShjYXJ0KSksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZW50cnkgdG8gYWN0aXZlIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqIEBwYXJhbSBxdWFudGl0eVxuICAgKi9cbiAgYWRkRW50cnkocHJvZHVjdENvZGU6IHN0cmluZywgcXVhbnRpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIFRPRE8oIzEzNjQ1KTogU3VwcG9ydCBtdWx0aXBsZSwgc2ltdWx0YW5lb3VzIGludm9jYXRpb24gb2YgdGhpcyBmdW5jdGlvbiwgd2hlbiBjYXJ0IGlzIG5vdCBsb2FkZWQvY3JlYXRlZFxuICAgIHRoaXMucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0LCB1c2VySWRdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmFkZEVudHJ5KFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBnZXRDYXJ0SWRCeVVzZXJJZChjYXJ0LCB1c2VySWQpLFxuICAgICAgICAgIHByb2R1Y3RDb2RlLFxuICAgICAgICAgIHF1YW50aXR5XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIGVudHJ5XG4gICAqL1xuICByZW1vdmVFbnRyeShlbnRyeTogT3JkZXJFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydElkJFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSwgdGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUucmVtb3ZlRW50cnkoXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICBlbnRyeS5lbnRyeU51bWJlciBhcyBudW1iZXJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gZW50cnlOdW1iZXJcbiAgICogQHBhcmFtIHF1YW50aXR5XG4gICAqL1xuICB1cGRhdGVFbnRyeShlbnRyeU51bWJlcjogbnVtYmVyLCBxdWFudGl0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0SWQkXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLCB0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoW2NhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS51cGRhdGVFbnRyeSh1c2VySWQsIGNhcnRJZCwgZW50cnlOdW1iZXIsIHF1YW50aXR5KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FydCBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICovXG4gIGdldEVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnkgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0SWQkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnRJZCkgPT4gdGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0RW50cnkoY2FydElkLCBwcm9kdWN0Q29kZSkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQXNzaWduIGVtYWlsIHRvIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqL1xuICBhZGRFbWFpbChlbWFpbDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0SWQkXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLCB0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoW2NhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5hc3NpZ25FbWFpbChjYXJ0SWQsIHVzZXJJZCwgZW1haWwpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFzc2lnbmVkIHVzZXIgdG8gY2FydFxuICAgKi9cbiAgZ2V0QXNzaWduZWRVc2VyKCk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnQkLnBpcGUobWFwKChjYXJ0KSA9PiBjYXJ0LnVzZXIgYXMgVXNlcikpO1xuICB9XG5cbiAgLy8gVE9ETzogTWFrZSBjYXJ0IHJlcXVpcmVkIHBhcmFtIGluIDQuMFxuICAvKipcbiAgICogUmV0dXJucyBvYnNlcnZhYmxlIG9mIHRydWUgZm9yIGd1ZXN0IGNhcnRcbiAgICovXG4gIGlzR3Vlc3RDYXJ0KGNhcnQ/OiBDYXJ0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGNhcnRcbiAgICAgID8gb2YodGhpcy5pc0NhcnRVc2VyR3Vlc3QoY2FydCkpXG4gICAgICA6IHRoaXMuYWN0aXZlQ2FydCQucGlwZShcbiAgICAgICAgICBtYXAoKGFjdGl2ZUNhcnQpID0+IHRoaXMuaXNDYXJ0VXNlckd1ZXN0KGFjdGl2ZUNhcnQpKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDYXJ0VXNlckd1ZXN0KGNhcnQ6IENhcnQpOiBib29sZWFuIHtcbiAgICBjb25zdCBjYXJ0VXNlciA9IGNhcnQudXNlcjtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIGNhcnRVc2VyICYmXG4gICAgICAgIChjYXJ0VXNlci5uYW1lID09PSBPQ0NfVVNFUl9JRF9HVUVTVCB8fFxuICAgICAgICAgIGlzRW1haWwoY2FydFVzZXIudWlkPy5zcGxpdCgnfCcpLnNsaWNlKDEpLmpvaW4oJ3wnKSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbXVsdGlwbGUgZW50cmllcyB0byBhIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGNhcnRFbnRyaWVzIDogbGlzdCBvZiBlbnRyaWVzIHRvIGFkZCAoT3JkZXJFbnRyeVtdKVxuICAgKi9cbiAgYWRkRW50cmllcyhjYXJ0RW50cmllczogT3JkZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgY29uc3QgZW50cmllc1RvQWRkID0gY2FydEVudHJpZXMubWFwKChlbnRyeSkgPT4gKHtcbiAgICAgIHByb2R1Y3RDb2RlOiBlbnRyeS5wcm9kdWN0Py5jb2RlID8/ICcnLFxuICAgICAgcXVhbnRpdHk6IGVudHJ5LnF1YW50aXR5ID8/IDAsXG4gICAgfSkpO1xuICAgIHRoaXMucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0LCB1c2VySWRdKSA9PiB7XG4gICAgICAgIGlmIChjYXJ0KSB7XG4gICAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuYWRkRW50cmllcyhcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGdldENhcnRJZEJ5VXNlcklkKGNhcnQsIHVzZXJJZCksXG4gICAgICAgICAgICBlbnRyaWVzVG9BZGRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWRzIGFjdGl2ZSBjYXJ0XG4gICAqL1xuICByZWxvYWRBY3RpdmVDYXJ0KCkge1xuICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMuZ2V0QWN0aXZlQ2FydElkKCksIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCldKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcCgoW2NhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmxvYWRDYXJ0KHtcbiAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGV4dHJhRGF0YTogeyBhY3RpdmU6IHRydWUgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==