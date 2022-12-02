import { __decorate } from "tslib";
/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';
import { CartType } from '@spartacus/cart/base/root';
import { isNotUndefined, OCC_CART_ID_CURRENT } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { isSelectiveCart } from '../../utils/utils';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
export class MultiCartEffects {
    constructor(actions$) {
        this.actions$ = actions$;
        // TODO(#7241): Remove when we drop ADD_VOUCHER process and we sort out checkout and cart dependencies
        this.processesIncrement$ = this.actions$.pipe(ofType(CartActions.CART_ADD_VOUCHER), map((action) => action.payload), map((payload) => new CartActions.CartProcessesIncrement(payload.cartId)));
        this.setSelectiveId$ = this.actions$.pipe(ofType(CartActions.LOAD_CART_SUCCESS), map((action) => {
            switch (action.type) {
                case CartActions.LOAD_CART_SUCCESS: {
                    const payload = action.payload;
                    if (isSelectiveCart(payload.cartId)) {
                        return new CartActions.SetCartTypeIndex({
                            cartType: CartType.SELECTIVE,
                            cartId: payload.cartId,
                        });
                    }
                    break;
                }
            }
        }), filter(isNotUndefined));
        this.setActiveCartId$ = this.actions$.pipe(ofType(CartActions.LOAD_CART_SUCCESS, CartActions.LOAD_CART, CartActions.CREATE_CART_SUCCESS, CartActions.CREATE_CART, CartActions.SET_ACTIVE_CART_ID), map((action) => {
            switch (action.type) {
                case CartActions.LOAD_CART: {
                    if (action?.payload?.cartId === OCC_CART_ID_CURRENT) {
                        return new CartActions.SetCartTypeIndex({
                            cartType: CartType.ACTIVE,
                            cartId: '',
                        });
                    }
                    break;
                }
                case CartActions.LOAD_CART_SUCCESS:
                // point to `temp-${uuid}` when we are creating/merging cart
                case CartActions.CREATE_CART: {
                    if (action?.payload?.extraData?.active) {
                        return new CartActions.SetCartTypeIndex({
                            cartType: CartType.ACTIVE,
                            cartId: action.meta.entityId,
                        });
                    }
                    break;
                }
                case CartActions.CREATE_CART_SUCCESS: {
                    return new CartActions.SetCartTypeIndex({
                        cartType: action?.payload?.extraData?.active
                            ? CartType.ACTIVE
                            : CartType.NEW_CREATED,
                        cartId: action.meta.entityId,
                    });
                }
                case CartActions.SET_ACTIVE_CART_ID:
                    return new CartActions.SetCartTypeIndex({
                        cartType: CartType.ACTIVE,
                        cartId: action.payload,
                    });
            }
        }), filter(isNotUndefined));
    }
}
MultiCartEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiCartEffects, deps: [{ token: i1.Actions }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiCartEffects });
__decorate([
    Effect()
], MultiCartEffects.prototype, "processesIncrement$", void 0);
__decorate([
    Effect()
], MultiCartEffects.prototype, "setSelectiveId$", void 0);
__decorate([
    Effect()
], MultiCartEffects.prototype, "setActiveCartId$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiCartEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }]; }, propDecorators: { processesIncrement$: [], setSelectiveId$: [], setActiveCartId$: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC5lZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvc3RvcmUvZWZmZWN0cy9tdWx0aS1jYXJ0LmVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQUcvQyxNQUFNLE9BQU8sZ0JBQWdCO0lBOEUzQixZQUFvQixRQUFpQjtRQUFqQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBN0VyQyxzR0FBc0c7UUFFdEcsd0JBQW1CLEdBQW1ELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN0RixNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQ3BDLEdBQUcsQ0FBQyxDQUFDLE1BQWtDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDM0QsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDekUsQ0FBQztRQUdGLG9CQUFlLEdBQTZDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUM1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QixNQU9uQixlQUFlLE1Bb0JmLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIEVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBDYXJ0VHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgaXNOb3RVbmRlZmluZWQsIE9DQ19DQVJUX0lEX0NVUlJFTlQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1NlbGVjdGl2ZUNhcnQgfSBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBDYXJ0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTXVsdGlDYXJ0RWZmZWN0cyB7XG4gIC8vIFRPRE8oIzcyNDEpOiBSZW1vdmUgd2hlbiB3ZSBkcm9wIEFERF9WT1VDSEVSIHByb2Nlc3MgYW5kIHdlIHNvcnQgb3V0IGNoZWNrb3V0IGFuZCBjYXJ0IGRlcGVuZGVuY2llc1xuICBARWZmZWN0KClcbiAgcHJvY2Vzc2VzSW5jcmVtZW50JDogT2JzZXJ2YWJsZTxDYXJ0QWN0aW9ucy5DYXJ0UHJvY2Vzc2VzSW5jcmVtZW50PiA9IHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICBvZlR5cGUoQ2FydEFjdGlvbnMuQ0FSVF9BRERfVk9VQ0hFUiksXG4gICAgbWFwKChhY3Rpb246IENhcnRBY3Rpb25zLkNhcnRBZGRWb3VjaGVyKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgbWFwKChwYXlsb2FkKSA9PiBuZXcgQ2FydEFjdGlvbnMuQ2FydFByb2Nlc3Nlc0luY3JlbWVudChwYXlsb2FkLmNhcnRJZCkpXG4gICk7XG5cbiAgQEVmZmVjdCgpXG4gIHNldFNlbGVjdGl2ZUlkJDogT2JzZXJ2YWJsZTxDYXJ0QWN0aW9ucy5TZXRDYXJ0VHlwZUluZGV4PiA9IHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICBvZlR5cGUoQ2FydEFjdGlvbnMuTE9BRF9DQVJUX1NVQ0NFU1MpLFxuICAgIG1hcCgoYWN0aW9uOiBBY3Rpb24pID0+IHtcbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDYXJ0QWN0aW9ucy5MT0FEX0NBUlRfU1VDQ0VTUzoge1xuICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSAoYWN0aW9uIGFzIENhcnRBY3Rpb25zLkxvYWRDYXJ0U3VjY2VzcykucGF5bG9hZDtcbiAgICAgICAgICBpZiAoaXNTZWxlY3RpdmVDYXJ0KHBheWxvYWQuY2FydElkKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDYXJ0QWN0aW9ucy5TZXRDYXJ0VHlwZUluZGV4KHtcbiAgICAgICAgICAgICAgY2FydFR5cGU6IENhcnRUeXBlLlNFTEVDVElWRSxcbiAgICAgICAgICAgICAgY2FydElkOiBwYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZClcbiAgKTtcblxuICBARWZmZWN0KClcbiAgc2V0QWN0aXZlQ2FydElkJDogT2JzZXJ2YWJsZTxDYXJ0QWN0aW9ucy5TZXRDYXJ0VHlwZUluZGV4PiA9IHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICBvZlR5cGUoXG4gICAgICBDYXJ0QWN0aW9ucy5MT0FEX0NBUlRfU1VDQ0VTUyxcbiAgICAgIENhcnRBY3Rpb25zLkxPQURfQ0FSVCxcbiAgICAgIENhcnRBY3Rpb25zLkNSRUFURV9DQVJUX1NVQ0NFU1MsXG4gICAgICBDYXJ0QWN0aW9ucy5DUkVBVEVfQ0FSVCxcbiAgICAgIENhcnRBY3Rpb25zLlNFVF9BQ1RJVkVfQ0FSVF9JRFxuICAgICksXG4gICAgbWFwKChhY3Rpb246IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIENhcnRBY3Rpb25zLkxPQURfQ0FSVDoge1xuICAgICAgICAgIGlmIChhY3Rpb24/LnBheWxvYWQ/LmNhcnRJZCA9PT0gT0NDX0NBUlRfSURfQ1VSUkVOVCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDYXJ0QWN0aW9ucy5TZXRDYXJ0VHlwZUluZGV4KHtcbiAgICAgICAgICAgICAgY2FydFR5cGU6IENhcnRUeXBlLkFDVElWRSxcbiAgICAgICAgICAgICAgY2FydElkOiAnJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENhcnRBY3Rpb25zLkxPQURfQ0FSVF9TVUNDRVNTOlxuICAgICAgICAvLyBwb2ludCB0byBgdGVtcC0ke3V1aWR9YCB3aGVuIHdlIGFyZSBjcmVhdGluZy9tZXJnaW5nIGNhcnRcbiAgICAgICAgY2FzZSBDYXJ0QWN0aW9ucy5DUkVBVEVfQ0FSVDoge1xuICAgICAgICAgIGlmIChhY3Rpb24/LnBheWxvYWQ/LmV4dHJhRGF0YT8uYWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENhcnRBY3Rpb25zLlNldENhcnRUeXBlSW5kZXgoe1xuICAgICAgICAgICAgICBjYXJ0VHlwZTogQ2FydFR5cGUuQUNUSVZFLFxuICAgICAgICAgICAgICBjYXJ0SWQ6IGFjdGlvbi5tZXRhLmVudGl0eUlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENhcnRBY3Rpb25zLkNSRUFURV9DQVJUX1NVQ0NFU1M6IHtcbiAgICAgICAgICByZXR1cm4gbmV3IENhcnRBY3Rpb25zLlNldENhcnRUeXBlSW5kZXgoe1xuICAgICAgICAgICAgY2FydFR5cGU6IGFjdGlvbj8ucGF5bG9hZD8uZXh0cmFEYXRhPy5hY3RpdmVcbiAgICAgICAgICAgICAgPyBDYXJ0VHlwZS5BQ1RJVkVcbiAgICAgICAgICAgICAgOiBDYXJ0VHlwZS5ORVdfQ1JFQVRFRCxcbiAgICAgICAgICAgIGNhcnRJZDogYWN0aW9uLm1ldGEuZW50aXR5SWQgYXMgc3RyaW5nLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2FydEFjdGlvbnMuU0VUX0FDVElWRV9DQVJUX0lEOlxuICAgICAgICAgIHJldHVybiBuZXcgQ2FydEFjdGlvbnMuU2V0Q2FydFR5cGVJbmRleCh7XG4gICAgICAgICAgICBjYXJ0VHlwZTogQ2FydFR5cGUuQUNUSVZFLFxuICAgICAgICAgICAgY2FydElkOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSxcbiAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpXG4gICk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucykge31cbn1cbiJdfQ==