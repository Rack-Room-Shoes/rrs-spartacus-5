/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import { BASE_SITE_CONTEXT_ID, StorageSyncType, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, takeWhile, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class MiniCartComponentService {
    constructor(activeCartFacade, authService, statePersistenceService, siteContextParamsService, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.authService = authService;
        this.statePersistenceService = statePersistenceService;
        this.siteContextParamsService = siteContextParamsService;
        this.eventService = eventService;
    }
    /**
     * This function supports lazy loading of the cart functoinality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getQuantity() {
        return this.activeCartRequired().pipe(switchMap((activeCartRequired) => {
            if (activeCartRequired) {
                return this.activeCartFacade.getActive().pipe(startWith({ deliveryItemsQuantity: 0 }), map((cart) => cart.deliveryItemsQuantity || 0));
            }
            else {
                return of(0);
            }
        }));
    }
    /**
     * This function supports lazy loading of the cart functoinality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getTotalPrice() {
        return this.activeCartRequired().pipe(switchMap((activeCartRequired) => {
            if (activeCartRequired) {
                return this.activeCartFacade
                    .getActive()
                    .pipe(map((cart) => cart.totalPrice?.formattedValue ?? ''));
            }
            else {
                return of('');
            }
        }));
    }
    /**
     * This function determines if it is required to get active cart data from ActiveCartFacade.
     * It is required to call the ActiveCartFacade if one of these criteria is met:
     * - There is an active cart id in the browser local storage
     * - A user is authenticated
     * - The cart library code chunk with the ActiveCartFacade implementation is already loaded.
     *
     * Once the observable returned by activeCartRequired emits true, it completes.
     * activeCartRequired helps to make the mini cart compatible with some level of lazy loading.
     */
    activeCartRequired() {
        return combineLatest([
            this.hasActiveCartInStorage(),
            this.authService.isUserLoggedIn(),
            this.isCartCreated(),
        ]).pipe(map(([hasCartInStorage, isUserLoggedIn, isCartCreated]) => hasCartInStorage || isUserLoggedIn || isCartCreated), distinctUntilChanged(), takeWhile((hasCart) => !hasCart, true));
    }
    hasActiveCartInStorage() {
        return this.getCartStateFromBrowserStorage().pipe(map((state) => Boolean(state?.active)));
    }
    isCartCreated() {
        return this.eventService.get(CreateCartEvent).pipe(map((_) => true), startWith(false));
    }
    getCartStateFromBrowserStorage() {
        return this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]).pipe(map((context) => {
            return this.statePersistenceService.readStateFromStorage({
                key: 'cart',
                context: context,
                storageType: StorageSyncType.LOCAL_STORAGE,
            });
        }));
    }
}
MiniCartComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MiniCartComponentService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.AuthService }, { token: i2.StatePersistenceService }, { token: i2.SiteContextParamsService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
MiniCartComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MiniCartComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MiniCartComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.AuthService }, { type: i2.StatePersistenceService }, { type: i2.SiteContextParamsService }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1jYXJ0LWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL21pbmktY2FydC9taW5pLWNhcnQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFvQixlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBRUwsb0JBQW9CLEVBSXBCLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGdCQUFnQixDQUFDOzs7O0FBS3hCLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDWSxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsdUJBQWdELEVBQ2hELHdCQUFrRCxFQUNsRCxZQUEwQjtRQUoxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNuQyxDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ25DLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDL0IsSUFBSSxrQkFBa0IsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUMzQyxTQUFTLENBQUMsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FDL0MsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUNuQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQy9CLElBQUksa0JBQWtCLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQjtxQkFDekIsU0FBUyxFQUFFO3FCQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ08sa0JBQWtCO1FBQzFCLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFO1NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUNELENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUNwRCxnQkFBZ0IsSUFBSSxjQUFjLElBQUksYUFBYSxDQUN0RCxFQUNELG9CQUFvQixFQUFFLEVBQ3RCLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQ3ZDLENBQUM7SUFDSixDQUFDO0lBRVMsc0JBQXNCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUMsSUFBSSxDQUMvQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFUyxhQUFhO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUNoRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUNoQixTQUFTLENBQUMsS0FBSyxDQUFDLENBQ2pCLENBQUM7SUFDSixDQUFDO0lBRVMsOEJBQThCO1FBR3RDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3ZELEdBQUcsRUFBRSxNQUFNO2dCQUNYLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixXQUFXLEVBQUUsZUFBZSxDQUFDLGFBQWE7YUFDM0MsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O3FIQXBHVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlLCBDcmVhdGVDYXJ0RXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBCQVNFX1NJVEVfQ09OVEVYVF9JRCxcbiAgRXZlbnRTZXJ2aWNlLFxuICBTaXRlQ29udGV4dFBhcmFtc1NlcnZpY2UsXG4gIFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICBTdG9yYWdlU3luY1R5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG1hcCxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHRha2VXaGlsZSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWluaUNhcnRDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzaXRlQ29udGV4dFBhcmFtc1NlcnZpY2U6IFNpdGVDb250ZXh0UGFyYW1zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHN1cHBvcnRzIGxhenkgbG9hZGluZyBvZiB0aGUgY2FydCBmdW5jdG9pbmFsaXR5J3MgY29kZS4gV2Ugb25seSBjYWxsXG4gICAqIHRoZSBhY3RpdmVDYXJ0RmFjYWRlIGlmIHdlIGtub3cgdGhlcmUgaXMgYWN0dWFsbHkgYSBjYXJ0LlxuICAgKiBXaXRob3V0IGEgY2FydCwgd2UgY2FuIHJldHVybiBhIGRlZmF1bHQgdmFsdWUgYW5kXG4gICAqIGF2b2lkIGxvYWRpbmcgdGhlIGNhcnQgbGlicmFyeSBjb2RlLlxuICAgKi9cbiAgZ2V0UXVhbnRpdHkoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0UmVxdWlyZWQoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChhY3RpdmVDYXJ0UmVxdWlyZWQpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZUNhcnRSZXF1aXJlZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuZ2V0QWN0aXZlKCkucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCh7IGRlbGl2ZXJ5SXRlbXNRdWFudGl0eTogMCB9KSxcbiAgICAgICAgICAgIG1hcCgoY2FydCkgPT4gY2FydC5kZWxpdmVyeUl0ZW1zUXVhbnRpdHkgfHwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZigwKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc3VwcG9ydHMgbGF6eSBsb2FkaW5nIG9mIHRoZSBjYXJ0IGZ1bmN0b2luYWxpdHkncyBjb2RlLiBXZSBvbmx5IGNhbGxcbiAgICogdGhlIGFjdGl2ZUNhcnRGYWNhZGUgaWYgd2Uga25vdyB0aGVyZSBpcyBhY3R1YWxseSBhIGNhcnQuXG4gICAqIFdpdGhvdXQgYSBjYXJ0LCB3ZSBjYW4gcmV0dXJuIGEgZGVmYXVsdCB2YWx1ZSBhbmRcbiAgICogYXZvaWQgbG9hZGluZyB0aGUgY2FydCBsaWJyYXJ5IGNvZGUuXG4gICAqL1xuICBnZXRUb3RhbFByaWNlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydFJlcXVpcmVkKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoYWN0aXZlQ2FydFJlcXVpcmVkKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmVDYXJ0UmVxdWlyZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0RmFjYWRlXG4gICAgICAgICAgICAuZ2V0QWN0aXZlKClcbiAgICAgICAgICAgIC5waXBlKG1hcCgoY2FydCkgPT4gY2FydC50b3RhbFByaWNlPy5mb3JtYXR0ZWRWYWx1ZSA/PyAnJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZignJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgaXQgaXMgcmVxdWlyZWQgdG8gZ2V0IGFjdGl2ZSBjYXJ0IGRhdGEgZnJvbSBBY3RpdmVDYXJ0RmFjYWRlLlxuICAgKiBJdCBpcyByZXF1aXJlZCB0byBjYWxsIHRoZSBBY3RpdmVDYXJ0RmFjYWRlIGlmIG9uZSBvZiB0aGVzZSBjcml0ZXJpYSBpcyBtZXQ6XG4gICAqIC0gVGhlcmUgaXMgYW4gYWN0aXZlIGNhcnQgaWQgaW4gdGhlIGJyb3dzZXIgbG9jYWwgc3RvcmFnZVxuICAgKiAtIEEgdXNlciBpcyBhdXRoZW50aWNhdGVkXG4gICAqIC0gVGhlIGNhcnQgbGlicmFyeSBjb2RlIGNodW5rIHdpdGggdGhlIEFjdGl2ZUNhcnRGYWNhZGUgaW1wbGVtZW50YXRpb24gaXMgYWxyZWFkeSBsb2FkZWQuXG4gICAqXG4gICAqIE9uY2UgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgYWN0aXZlQ2FydFJlcXVpcmVkIGVtaXRzIHRydWUsIGl0IGNvbXBsZXRlcy5cbiAgICogYWN0aXZlQ2FydFJlcXVpcmVkIGhlbHBzIHRvIG1ha2UgdGhlIG1pbmkgY2FydCBjb21wYXRpYmxlIHdpdGggc29tZSBsZXZlbCBvZiBsYXp5IGxvYWRpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWN0aXZlQ2FydFJlcXVpcmVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuaGFzQWN0aXZlQ2FydEluU3RvcmFnZSgpLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5pc1VzZXJMb2dnZWRJbigpLFxuICAgICAgdGhpcy5pc0NhcnRDcmVhdGVkKCksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKFtoYXNDYXJ0SW5TdG9yYWdlLCBpc1VzZXJMb2dnZWRJbiwgaXNDYXJ0Q3JlYXRlZF0pID0+XG4gICAgICAgICAgaGFzQ2FydEluU3RvcmFnZSB8fCBpc1VzZXJMb2dnZWRJbiB8fCBpc0NhcnRDcmVhdGVkXG4gICAgICApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHRha2VXaGlsZSgoaGFzQ2FydCkgPT4gIWhhc0NhcnQsIHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNBY3RpdmVDYXJ0SW5TdG9yYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmdldENhcnRTdGF0ZUZyb21Ccm93c2VyU3RvcmFnZSgpLnBpcGUoXG4gICAgICBtYXAoKHN0YXRlKSA9PiBCb29sZWFuKHN0YXRlPy5hY3RpdmUpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDYXJ0Q3JlYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENyZWF0ZUNhcnRFdmVudCkucGlwZShcbiAgICAgIG1hcCgoXykgPT4gdHJ1ZSksXG4gICAgICBzdGFydFdpdGgoZmFsc2UpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDYXJ0U3RhdGVGcm9tQnJvd3NlclN0b3JhZ2UoKTogT2JzZXJ2YWJsZTxcbiAgICB7IGFjdGl2ZTogc3RyaW5nIH0gfCB1bmRlZmluZWRcbiAgPiB7XG4gICAgcmV0dXJuIHRoaXMuc2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlLmdldFZhbHVlcyhbQkFTRV9TSVRFX0NPTlRFWFRfSURdKS5waXBlKFxuICAgICAgbWFwKChjb250ZXh0KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnJlYWRTdGF0ZUZyb21TdG9yYWdlKHtcbiAgICAgICAgICBrZXk6ICdjYXJ0JyxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlU3luY1R5cGUuTE9DQUxfU1RPUkFHRSxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==