/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { isSelectiveCart } from '@spartacus/cart/base/core';
import { DeleteCartEvent as DeleteSavedCartEvent, } from '@spartacus/cart/base/root';
import { ProcessSelectors, } from '@spartacus/core';
import { combineLatest, EMPTY, queueScheduler } from 'rxjs';
import { distinctUntilChanged, filter, map, observeOn, pluck, shareReplay, startWith, tap, withLatestFrom, } from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';
import { SAVED_CART_CLONE_CART_PROCESS_ID, SAVED_CART_LIST_PROCESS_ID, SAVED_CART_RESTORE_CART_PROCESS_ID, SAVED_CART_SAVE_CART_PROCESS_ID, } from '../store/saved-cart-constants';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/user/account/root";
import * as i4 from "@spartacus/cart/base/root";
export class SavedCartService {
    constructor(store, userIdService, userAccountFacade, multiCartService, eventService) {
        this.store = store;
        this.userIdService = userIdService;
        this.userAccountFacade = userAccountFacade;
        this.multiCartService = multiCartService;
        this.eventService = eventService;
    }
    /**
     * Loads a single saved cart
     */
    loadSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.store.dispatch(new SavedCartActions.LoadSavedCart({ userId, cartId }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Gets a single saved cart
     * it won't emit if the delete saved cart event gets triggered to avoid race condition between actions
     *
     * @param cartId
     * @returns observable with cart
     */
    get(cartId) {
        return this.getSavedCart(cartId).pipe(observeOn(queueScheduler), withLatestFrom(this.eventService.get(DeleteSavedCartEvent).pipe(startWith({}))), filter(([state, _event]) => !!state), tap(([state, event]) => {
            if (Object.keys(event).length > 0) {
                return EMPTY;
            }
            if (!(state.loading || state.success || state.error)) {
                this.loadSavedCart(cartId);
            }
        }), filter(([state]) => state.success || !!state.error), map(([state]) => state.value));
    }
    /**
     * Gets the selected cart state
     *
     * @param cartId
     * @returns observable of selected cart with loader state
     */
    getSavedCart(cartId) {
        return this.multiCartService.getCartEntity(cartId);
    }
    /**
     * Returns true when there are no operations on that in progress and it is not currently loading
     *
     * @param cartId
     */
    isStable(cartId) {
        return this.multiCartService.isStable(cartId);
    }
    /**
     * Loads a list of saved carts
     */
    loadSavedCarts() {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.store.dispatch(new SavedCartActions.LoadSavedCarts({ userId }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Gets a list of saved carts
     *
     * @returns observable with list of saved carts
     */
    getList() {
        return this.getSavedCartList().pipe(withLatestFrom(this.getSavedCartListProcess()), tap(([_, state]) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadSavedCarts();
            }
        }), pluck(0), shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Gets a list of saved carts from all carts in the state
     * by filtering through the carts that are not wishlist and not saved cart
     *
     * @returns observable with list of saved carts
     */
    getSavedCartList() {
        return combineLatest([
            this.multiCartService.getCarts(),
            this.userAccountFacade.get(),
        ]).pipe(distinctUntilChanged(), map(([carts, user]) => carts.filter((cart) => (user?.customerId !== undefined
            ? cart?.name !== `wishlist${user?.customerId}`
            : true) &&
            !isSelectiveCart(cart?.code) &&
            cart?.saveTime)));
    }
    /**
     * Gets the loading flag of getting a list of saved carts
     *
     * @returns observable with boolean of the loading state
     */
    getSavedCartListProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_LIST_PROCESS_ID)));
    }
    /**
     * Gets the loading state of getting a list of saved carts
     *
     * @returns observable with boolean of the loader state
     */
    getSavedCartListProcess() {
        return this.store.pipe(select(ProcessSelectors.getProcessStateFactory(SAVED_CART_LIST_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a saved cart
     */
    clearSavedCarts() {
        this.store.dispatch(new SavedCartActions.ClearSavedCarts());
    }
    /**
     * Triggers a restore saved cart
     *
     * @param cartId
     */
    restoreSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.store.dispatch(new SavedCartActions.RestoreSavedCart({
                userId,
                cartId,
            }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Gets the loading state of restoring saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getRestoreSavedCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of restoring saved cart
     *
     * @returns observable with boolean of the success state
     */
    getRestoreSavedCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of restoring saved cart
     *
     * @returns observable with boolean of the error state
     */
    getRestoreSavedCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a restore saved cart
     */
    clearRestoreSavedCart() {
        this.store.dispatch(new SavedCartActions.ClearRestoreSavedCart());
    }
    /**
     * Triggers delete saved cart
     * @param cartId
     */
    deleteSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.multiCartService.deleteCart(cartId, userId);
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Triggers a saved cart
     *
     */
    saveCart({ cartId, saveCartName, saveCartDescription, }) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.store.dispatch(new SavedCartActions.SaveCart({
                userId,
                cartId,
                saveCartName,
                saveCartDescription,
            }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Gets the loading state of saving a cart
     *
     * @returns observable with boolean of the loading state
     */
    getSaveCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of saving a cart
     *
     * @returns observable with boolean of the success state
     */
    getSaveCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of saving a cart
     *
     * @returns observable with boolean of the error state
     */
    getSaveCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a save cart
     */
    clearSaveCart() {
        this.store.dispatch(new SavedCartActions.ClearSaveCart());
    }
    /**
     * Triggers an edit saved cart
     *
     */
    editSavedCart({ cartId, saveCartName, saveCartDescription, }) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.store.dispatch(new SavedCartActions.EditSavedCart({
                userId,
                cartId,
                saveCartName,
                saveCartDescription,
            }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Triggers a clone saved cart
     *
     * @param cartId
     */
    cloneSavedCart(cartId, saveCartName) {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            return this.store.dispatch(new SavedCartActions.CloneSavedCart({ userId, cartId, saveCartName }));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Gets the loading state of cloning a saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getCloneSavedCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of cloning a saved cart
     *
     * @returns observable with boolean of the success state
     */
    getCloneSavedCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of cloning a saved cart
     *
     * @returns observable with boolean of the error state
     */
    getCloneSavedCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of cloning a saved cart
     */
    clearCloneSavedCart() {
        this.store.dispatch(new SavedCartActions.ClearCloneSavedCart());
    }
}
SavedCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SavedCartService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i3.UserAccountFacade }, { token: i4.MultiCartFacade }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SavedCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SavedCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i3.UserAccountFacade }, { type: i4.MultiCartFacade }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb3JlL2ZhY2FkZS9zYXZlZC1jYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFzQixNQUFNLDJCQUEyQixDQUFDO0FBQ2hGLE9BQU8sRUFFTCxlQUFlLElBQUksb0JBQW9CLEdBRXhDLE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsT0FBTyxFQUVMLGdCQUFnQixHQUlqQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUNULEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsZ0NBQWdDLEVBQ2hDLDBCQUEwQixFQUMxQixrQ0FBa0MsRUFDbEMsK0JBQStCLEdBQ2hDLE1BQU0sK0JBQStCLENBQUM7Ozs7OztBQUd2QyxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ1ksS0FBeUQsRUFDekQsYUFBNEIsRUFDNUIsaUJBQW9DLEVBQ3BDLGdCQUFpQyxFQUNqQyxZQUEwQjtRQUoxQixVQUFLLEdBQUwsS0FBSyxDQUFvRDtRQUN6RCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixzQkFBaUIsR0FB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QWMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FDdEUsQ0FBQztRQUNKLENBQUMsRUFDRCxHQUFHLEVBQUU7WUFDSCxpRUFBaUU7UUFDbkUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtCQUErQjtRQUM3QixPQUF1QyxJQUFJLENBQUMsS0FBTSxDQUFDLElBQUksQ0FDckQsTUFBTSxDQUNKLGdCQUFnQixDQUFDLHdCQUF3QixDQUN2QyxnQ0FBZ0MsQ0FDakMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtCQUErQjtRQUM3QixPQUF1QyxJQUFJLENBQUMsS0FBTSxDQUFDLElBQUksQ0FDckQsTUFBTSxDQUNKLGdCQUFnQixDQUFDLHdCQUF3QixDQUN2QyxnQ0FBZ0MsQ0FDakMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDZCQUE2QjtRQUMzQixPQUF1QyxJQUFJLENBQUMsS0FBTSxDQUFDLElBQUksQ0FDckQsTUFBTSxDQUNKLGdCQUFnQixDQUFDLHNCQUFzQixDQUNyQyxnQ0FBZ0MsQ0FDakMsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7NkdBaGJVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgaXNTZWxlY3RpdmVDYXJ0LCBTdGF0ZVdpdGhNdWx0aUNhcnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9jb3JlJztcbmltcG9ydCB7XG4gIENhcnQsXG4gIERlbGV0ZUNhcnRFdmVudCBhcyBEZWxldGVTYXZlZENhcnRFdmVudCxcbiAgTXVsdGlDYXJ0RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFNhdmVkQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9zYXZlZC1jYXJ0L3Jvb3QnO1xuaW1wb3J0IHtcbiAgRXZlbnRTZXJ2aWNlLFxuICBQcm9jZXNzU2VsZWN0b3JzLFxuICBTdGF0ZVV0aWxzLFxuICBTdGF0ZVdpdGhQcm9jZXNzLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVXNlckFjY291bnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIEVNUFRZLCBPYnNlcnZhYmxlLCBxdWV1ZVNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBvYnNlcnZlT24sXG4gIHBsdWNrLFxuICBzaGFyZVJlcGxheSxcbiAgc3RhcnRXaXRoLFxuICB0YXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTYXZlZENhcnRBY3Rpb25zIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQge1xuICBTQVZFRF9DQVJUX0NMT05FX0NBUlRfUFJPQ0VTU19JRCxcbiAgU0FWRURfQ0FSVF9MSVNUX1BST0NFU1NfSUQsXG4gIFNBVkVEX0NBUlRfUkVTVE9SRV9DQVJUX1BST0NFU1NfSUQsXG4gIFNBVkVEX0NBUlRfU0FWRV9DQVJUX1BST0NFU1NfSUQsXG59IGZyb20gJy4uL3N0b3JlL3NhdmVkLWNhcnQtY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNhdmVkQ2FydFNlcnZpY2UgaW1wbGVtZW50cyBTYXZlZENhcnRGYWNhZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aE11bHRpQ2FydCB8IFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyQWNjb3VudEZhY2FkZTogVXNlckFjY291bnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydFNlcnZpY2U6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIHNpbmdsZSBzYXZlZCBjYXJ0XG4gICAqL1xuICBsb2FkU2F2ZWRDYXJ0KGNhcnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKHVzZXJJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5Mb2FkU2F2ZWRDYXJ0KHsgdXNlcklkLCBjYXJ0SWQgfSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgc2luZ2xlIHNhdmVkIGNhcnRcbiAgICogaXQgd29uJ3QgZW1pdCBpZiB0aGUgZGVsZXRlIHNhdmVkIGNhcnQgZXZlbnQgZ2V0cyB0cmlnZ2VyZWQgdG8gYXZvaWQgcmFjZSBjb25kaXRpb24gYmV0d2VlbiBhY3Rpb25zXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGNhcnRcbiAgICovXG4gIGdldChjYXJ0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FydCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdldFNhdmVkQ2FydChjYXJ0SWQpLnBpcGUoXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpLFxuICAgICAgd2l0aExhdGVzdEZyb20oXG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChEZWxldGVTYXZlZENhcnRFdmVudCkucGlwZShzdGFydFdpdGgoe30pKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcigoW3N0YXRlLCBfZXZlbnRdKSA9PiAhIXN0YXRlKSxcbiAgICAgIHRhcCgoW3N0YXRlLCBldmVudF0pID0+IHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGV2ZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoc3RhdGUubG9hZGluZyB8fCBzdGF0ZS5zdWNjZXNzIHx8IHN0YXRlLmVycm9yKSkge1xuICAgICAgICAgIHRoaXMubG9hZFNhdmVkQ2FydChjYXJ0SWQpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcigoW3N0YXRlXSkgPT4gc3RhdGUuc3VjY2VzcyB8fCAhIXN0YXRlLmVycm9yKSxcbiAgICAgIG1hcCgoW3N0YXRlXSkgPT4gc3RhdGUudmFsdWUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzZWxlY3RlZCBjYXJ0IHN0YXRlXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSBvZiBzZWxlY3RlZCBjYXJ0IHdpdGggbG9hZGVyIHN0YXRlXG4gICAqL1xuICBnZXRTYXZlZENhcnQoXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxTdGF0ZVV0aWxzLlByb2Nlc3Nlc0xvYWRlclN0YXRlPENhcnQgfCB1bmRlZmluZWQ+PiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlDYXJ0U2VydmljZS5nZXRDYXJ0RW50aXR5KGNhcnRJZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlcmUgYXJlIG5vIG9wZXJhdGlvbnMgb24gdGhhdCBpbiBwcm9ncmVzcyBhbmQgaXQgaXMgbm90IGN1cnJlbnRseSBsb2FkaW5nXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICovXG4gIGlzU3RhYmxlKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlDYXJ0U2VydmljZS5pc1N0YWJsZShjYXJ0SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgbGlzdCBvZiBzYXZlZCBjYXJ0c1xuICAgKi9cbiAgbG9hZFNhdmVkQ2FydHMoKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKHVzZXJJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5Mb2FkU2F2ZWRDYXJ0cyh7IHVzZXJJZCB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqL1xuICBnZXRMaXN0KCk6IE9ic2VydmFibGU8Q2FydFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2F2ZWRDYXJ0TGlzdCgpLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldFNhdmVkQ2FydExpc3RQcm9jZXNzKCkpLFxuICAgICAgdGFwKChbXywgc3RhdGVdKSA9PiB7XG4gICAgICAgIGlmICghKHN0YXRlLmxvYWRpbmcgfHwgc3RhdGUuc3VjY2VzcyB8fCBzdGF0ZS5lcnJvcikpIHtcbiAgICAgICAgICB0aGlzLmxvYWRTYXZlZENhcnRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgcGx1Y2soMCksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBzYXZlZCBjYXJ0cyBmcm9tIGFsbCBjYXJ0cyBpbiB0aGUgc3RhdGVcbiAgICogYnkgZmlsdGVyaW5nIHRocm91Z2ggdGhlIGNhcnRzIHRoYXQgYXJlIG5vdCB3aXNobGlzdCBhbmQgbm90IHNhdmVkIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGxpc3Qgb2Ygc2F2ZWQgY2FydHNcbiAgICovXG4gIGdldFNhdmVkQ2FydExpc3QoKTogT2JzZXJ2YWJsZTxDYXJ0W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLm11bHRpQ2FydFNlcnZpY2UuZ2V0Q2FydHMoKSxcbiAgICAgIHRoaXMudXNlckFjY291bnRGYWNhZGUuZ2V0KCksXG4gICAgXSkucGlwZShcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBtYXAoKFtjYXJ0cywgdXNlcl0pID0+XG4gICAgICAgIGNhcnRzLmZpbHRlcihcbiAgICAgICAgICAoY2FydCkgPT5cbiAgICAgICAgICAgICh1c2VyPy5jdXN0b21lcklkICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBjYXJ0Py5uYW1lICE9PSBgd2lzaGxpc3Qke3VzZXI/LmN1c3RvbWVySWR9YFxuICAgICAgICAgICAgICA6IHRydWUpICYmXG4gICAgICAgICAgICAhaXNTZWxlY3RpdmVDYXJ0KGNhcnQ/LmNvZGUpICYmXG4gICAgICAgICAgICBjYXJ0Py5zYXZlVGltZVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsb2FkaW5nIGZsYWcgb2YgZ2V0dGluZyBhIGxpc3Qgb2Ygc2F2ZWQgY2FydHNcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIGxvYWRpbmcgc3RhdGVcbiAgICovXG4gIGdldFNhdmVkQ2FydExpc3RQcm9jZXNzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShTQVZFRF9DQVJUX0xJU1RfUFJPQ0VTU19JRClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxvYWRpbmcgc3RhdGUgb2YgZ2V0dGluZyBhIGxpc3Qgb2Ygc2F2ZWQgY2FydHNcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIGxvYWRlciBzdGF0ZVxuICAgKi9cbiAgZ2V0U2F2ZWRDYXJ0TGlzdFByb2Nlc3MoKTogT2JzZXJ2YWJsZTxTdGF0ZVV0aWxzLkxvYWRlclN0YXRlPGFueT4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NTdGF0ZUZhY3RvcnkoU0FWRURfQ0FSVF9MSVNUX1BST0NFU1NfSUQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHByb2Nlc3Mgc3RhdGUgb2YgcGVyZm9ybWluZyBhIHNhdmVkIGNhcnRcbiAgICovXG4gIGNsZWFyU2F2ZWRDYXJ0cygpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTYXZlZENhcnRBY3Rpb25zLkNsZWFyU2F2ZWRDYXJ0cygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIHJlc3RvcmUgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gY2FydElkXG4gICAqL1xuICByZXN0b3JlU2F2ZWRDYXJ0KGNhcnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKHVzZXJJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5SZXN0b3JlU2F2ZWRDYXJ0KHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxvYWRpbmcgc3RhdGUgb2YgcmVzdG9yaW5nIHNhdmVkIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIGxvYWRpbmcgc3RhdGVcbiAgICovXG4gIGdldFJlc3RvcmVTYXZlZENhcnRQcm9jZXNzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX1JFU1RPUkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHN1Y2Nlc3Mgc3RhdGUgb2YgcmVzdG9yaW5nIHNhdmVkIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIHN1Y2Nlc3Mgc3RhdGVcbiAgICovXG4gIGdldFJlc3RvcmVTYXZlZENhcnRQcm9jZXNzU3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NTdWNjZXNzRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX1JFU1RPUkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGVycm9yIHN0YXRlIG9mIHJlc3RvcmluZyBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgZ2V0UmVzdG9yZVNhdmVkQ2FydFByb2Nlc3NFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NFcnJvckZhY3RvcnkoXG4gICAgICAgICAgU0FWRURfQ0FSVF9SRVNUT1JFX0NBUlRfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHByb2Nlc3Mgc3RhdGUgb2YgcGVyZm9ybWluZyBhIHJlc3RvcmUgc2F2ZWQgY2FydFxuICAgKi9cbiAgY2xlYXJSZXN0b3JlU2F2ZWRDYXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFNhdmVkQ2FydEFjdGlvbnMuQ2xlYXJSZXN0b3JlU2F2ZWRDYXJ0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGRlbGV0ZSBzYXZlZCBjYXJ0XG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICovXG4gIGRlbGV0ZVNhdmVkQ2FydChjYXJ0SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZShcbiAgICAgICh1c2VySWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlDYXJ0U2VydmljZS5kZWxldGVDYXJ0KGNhcnRJZCwgdXNlcklkKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIHNhdmVkIGNhcnRcbiAgICpcbiAgICovXG4gIHNhdmVDYXJ0KHtcbiAgICBjYXJ0SWQsXG4gICAgc2F2ZUNhcnROYW1lLFxuICAgIHNhdmVDYXJ0RGVzY3JpcHRpb24sXG4gIH06IHtcbiAgICBjYXJ0SWQ6IHN0cmluZztcbiAgICBzYXZlQ2FydE5hbWU/OiBzdHJpbmc7XG4gICAgc2F2ZUNhcnREZXNjcmlwdGlvbj86IHN0cmluZztcbiAgfSk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZShcbiAgICAgICh1c2VySWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IFNhdmVkQ2FydEFjdGlvbnMuU2F2ZUNhcnQoe1xuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgc2F2ZUNhcnROYW1lLFxuICAgICAgICAgICAgc2F2ZUNhcnREZXNjcmlwdGlvbixcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxvYWRpbmcgc3RhdGUgb2Ygc2F2aW5nIGEgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0U2F2ZUNhcnRQcm9jZXNzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX1NBVkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHN1Y2Nlc3Mgc3RhdGUgb2Ygc2F2aW5nIGEgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgc3VjY2VzcyBzdGF0ZVxuICAgKi9cbiAgZ2V0U2F2ZUNhcnRQcm9jZXNzU3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NTdWNjZXNzRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX1NBVkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGVycm9yIHN0YXRlIG9mIHNhdmluZyBhIGNhcnRcbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGJvb2xlYW4gb2YgdGhlIGVycm9yIHN0YXRlXG4gICAqL1xuICBnZXRTYXZlQ2FydFByb2Nlc3NFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NFcnJvckZhY3RvcnkoU0FWRURfQ0FSVF9TQVZFX0NBUlRfUFJPQ0VTU19JRClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgcHJvY2VzcyBzdGF0ZSBvZiBwZXJmb3JtaW5nIGEgc2F2ZSBjYXJ0XG4gICAqL1xuICBjbGVhclNhdmVDYXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFNhdmVkQ2FydEFjdGlvbnMuQ2xlYXJTYXZlQ2FydCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhbiBlZGl0IHNhdmVkIGNhcnRcbiAgICpcbiAgICovXG4gIGVkaXRTYXZlZENhcnQoe1xuICAgIGNhcnRJZCxcbiAgICBzYXZlQ2FydE5hbWUsXG4gICAgc2F2ZUNhcnREZXNjcmlwdGlvbixcbiAgfToge1xuICAgIGNhcnRJZDogc3RyaW5nO1xuICAgIHNhdmVDYXJ0TmFtZT86IHN0cmluZztcbiAgICBzYXZlQ2FydERlc2NyaXB0aW9uPzogc3RyaW5nO1xuICB9KTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKHVzZXJJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgU2F2ZWRDYXJ0QWN0aW9ucy5FZGl0U2F2ZWRDYXJ0KHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgIHNhdmVDYXJ0TmFtZSxcbiAgICAgICAgICAgIHNhdmVDYXJ0RGVzY3JpcHRpb24sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIGNsb25lIHNhdmVkIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgY2xvbmVTYXZlZENhcnQoY2FydElkOiBzdHJpbmcsIHNhdmVDYXJ0TmFtZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZShcbiAgICAgICh1c2VySWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IFNhdmVkQ2FydEFjdGlvbnMuQ2xvbmVTYXZlZENhcnQoeyB1c2VySWQsIGNhcnRJZCwgc2F2ZUNhcnROYW1lIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBmb3IgZnV0dXJlIHJlbGVhc2VzLCByZWZhY3RvciB0aGlzIHBhcnQgdG8gdGhyb3duIGVycm9yc1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBzdGF0ZSBvZiBjbG9uaW5nIGEgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShcbiAgICAgICAgICBTQVZFRF9DQVJUX0NMT05FX0NBUlRfUFJPQ0VTU19JRFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzdWNjZXNzIHN0YXRlIG9mIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBzdWNjZXNzIHN0YXRlXG4gICAqL1xuICBnZXRDbG9uZVNhdmVkQ2FydFByb2Nlc3NTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2Nlc3NTZWxlY3RvcnMuZ2V0UHJvY2Vzc1N1Y2Nlc3NGYWN0b3J5KFxuICAgICAgICAgIFNBVkVEX0NBUlRfQ0xPTkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGVycm9yIHN0YXRlIG9mIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvY2Vzc1NlbGVjdG9ycy5nZXRQcm9jZXNzRXJyb3JGYWN0b3J5KFxuICAgICAgICAgIFNBVkVEX0NBUlRfQ0xPTkVfQ0FSVF9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgcHJvY2VzcyBzdGF0ZSBvZiBjbG9uaW5nIGEgc2F2ZWQgY2FydFxuICAgKi9cbiAgY2xlYXJDbG9uZVNhdmVkQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTYXZlZENhcnRBY3Rpb25zLkNsZWFyQ2xvbmVTYXZlZENhcnQoKSk7XG4gIH1cbn1cbiJdfQ==