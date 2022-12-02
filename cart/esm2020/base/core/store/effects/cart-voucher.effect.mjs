/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { GlobalMessageType, normalizeHttpError, } from '@spartacus/core';
import { from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/voucher/cart-voucher.connector";
import * as i3 from "@spartacus/core";
export class CartVoucherEffects {
    constructor(actions$, cartVoucherConnector, messageService) {
        this.actions$ = actions$;
        this.cartVoucherConnector = cartVoucherConnector;
        this.messageService = messageService;
        this.addCartVoucher$ = createEffect(() => this.actions$.pipe(ofType(CartActions.CART_ADD_VOUCHER), map((action) => action.payload), mergeMap((payload) => {
            return this.cartVoucherConnector
                .add(payload.userId, payload.cartId, payload.voucherId)
                .pipe(map(() => {
                this.showGlobalMessage('voucher.applyVoucherSuccess', payload.voucherId, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                return new CartActions.CartAddVoucherSuccess({
                    ...payload,
                });
            }), catchError((error) => from([
                new CartActions.CartAddVoucherFail({
                    ...payload,
                    error: normalizeHttpError(error),
                }),
                new CartActions.CartProcessesDecrement(payload.cartId),
                new CartActions.LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ])));
        })));
        this.removeCartVoucher$ = createEffect(() => this.actions$.pipe(ofType(CartActions.CART_REMOVE_VOUCHER), map((action) => action.payload), mergeMap((payload) => {
            return this.cartVoucherConnector
                .remove(payload.userId, payload.cartId, payload.voucherId)
                .pipe(map(() => {
                this.showGlobalMessage('voucher.removeVoucherSuccess', payload.voucherId, GlobalMessageType.MSG_TYPE_INFO);
                return new CartActions.CartRemoveVoucherSuccess({
                    userId: payload.userId,
                    cartId: payload.cartId,
                    voucherId: payload.voucherId,
                });
            }), catchError((error) => from([
                new CartActions.CartRemoveVoucherFail({
                    error: normalizeHttpError(error),
                    cartId: payload.cartId,
                    userId: payload.userId,
                    voucherId: payload.voucherId,
                }),
                new CartActions.LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ])));
        })));
    }
    showGlobalMessage(text, param, messageType) {
        this.messageService.add({ key: text, params: { voucherCode: param } }, messageType);
    }
}
CartVoucherEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartVoucherEffects, deps: [{ token: i1.Actions }, { token: i2.CartVoucherConnector }, { token: i3.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartVoucherEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartVoucherEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CartVoucherConnector }, { type: i3.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12b3VjaGVyLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29yZS9zdG9yZS9lZmZlY3RzL2NhcnQtdm91Y2hlci5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFHL0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUNVLFFBQWlCLEVBQ2pCLG9CQUEwQyxFQUMxQyxjQUFvQztRQUZwQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBRzlDLG9CQUFlLEdBSVgsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNwQyxHQUFHLENBQUMsQ0FBQyxNQUFrQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzNELFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLG9CQUFvQjtpQkFDN0IsR0FBRyxDQUFDLE9B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LFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQzs7K0dBakdVLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zLCBjcmVhdGVFZmZlY3QsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBub3JtYWxpemVIdHRwRXJyb3IsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FydFZvdWNoZXJDb25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL3ZvdWNoZXIvY2FydC12b3VjaGVyLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBDYXJ0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FydFZvdWNoZXJFZmZlY3RzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIGNhcnRWb3VjaGVyQ29ubmVjdG9yOiBDYXJ0Vm91Y2hlckNvbm5lY3RvcixcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgYWRkQ2FydFZvdWNoZXIkOiBPYnNlcnZhYmxlPFxuICAgIHwgQ2FydEFjdGlvbnMuQ2FydFZvdWNoZXJBY3Rpb25cbiAgICB8IENhcnRBY3Rpb25zLkxvYWRDYXJ0XG4gICAgfCBDYXJ0QWN0aW9ucy5DYXJ0UHJvY2Vzc2VzRGVjcmVtZW50XG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoQ2FydEFjdGlvbnMuQ0FSVF9BRERfVk9VQ0hFUiksXG4gICAgICBtYXAoKGFjdGlvbjogQ2FydEFjdGlvbnMuQ2FydEFkZFZvdWNoZXIpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnRWb3VjaGVyQ29ubmVjdG9yXG4gICAgICAgICAgLmFkZChwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5jYXJ0SWQsIHBheWxvYWQudm91Y2hlcklkKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93R2xvYmFsTWVzc2FnZShcbiAgICAgICAgICAgICAgICAndm91Y2hlci5hcHBseVZvdWNoZXJTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnZvdWNoZXJJZCxcbiAgICAgICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDYXJ0QWN0aW9ucy5DYXJ0QWRkVm91Y2hlclN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgZnJvbShbXG4gICAgICAgICAgICAgICAgbmV3IENhcnRBY3Rpb25zLkNhcnRBZGRWb3VjaGVyRmFpbCh7XG4gICAgICAgICAgICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IENhcnRBY3Rpb25zLkNhcnRQcm9jZXNzZXNEZWNyZW1lbnQocGF5bG9hZC5jYXJ0SWQpLFxuICAgICAgICAgICAgICAgIG5ldyBDYXJ0QWN0aW9ucy5Mb2FkQ2FydCh7XG4gICAgICAgICAgICAgICAgICB1c2VySWQ6IHBheWxvYWQudXNlcklkLFxuICAgICAgICAgICAgICAgICAgY2FydElkOiBwYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgcmVtb3ZlQ2FydFZvdWNoZXIkOiBPYnNlcnZhYmxlPFxuICAgIENhcnRBY3Rpb25zLkNhcnRWb3VjaGVyQWN0aW9uIHwgQ2FydEFjdGlvbnMuTG9hZENhcnRcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShDYXJ0QWN0aW9ucy5DQVJUX1JFTU9WRV9WT1VDSEVSKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDYXJ0QWN0aW9ucy5DYXJ0UmVtb3ZlVm91Y2hlcikgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgICAgbWVyZ2VNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FydFZvdWNoZXJDb25uZWN0b3JcbiAgICAgICAgICAucmVtb3ZlKHBheWxvYWQudXNlcklkLCBwYXlsb2FkLmNhcnRJZCwgcGF5bG9hZC52b3VjaGVySWQpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNob3dHbG9iYWxNZXNzYWdlKFxuICAgICAgICAgICAgICAgICd2b3VjaGVyLnJlbW92ZVZvdWNoZXJTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnZvdWNoZXJJZCxcbiAgICAgICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9JTkZPXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgQ2FydEFjdGlvbnMuQ2FydFJlbW92ZVZvdWNoZXJTdWNjZXNzKHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHBheWxvYWQudXNlcklkLFxuICAgICAgICAgICAgICAgIGNhcnRJZDogcGF5bG9hZC5jYXJ0SWQsXG4gICAgICAgICAgICAgICAgdm91Y2hlcklkOiBwYXlsb2FkLnZvdWNoZXJJZCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgICBmcm9tKFtcbiAgICAgICAgICAgICAgICBuZXcgQ2FydEFjdGlvbnMuQ2FydFJlbW92ZVZvdWNoZXJGYWlsKHtcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICAgY2FydElkOiBwYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgICAgICAgICAgIHVzZXJJZDogcGF5bG9hZC51c2VySWQsXG4gICAgICAgICAgICAgICAgICB2b3VjaGVySWQ6IHBheWxvYWQudm91Y2hlcklkLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBDYXJ0QWN0aW9ucy5Mb2FkQ2FydCh7XG4gICAgICAgICAgICAgICAgICB1c2VySWQ6IHBheWxvYWQudXNlcklkLFxuICAgICAgICAgICAgICAgICAgY2FydElkOiBwYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgcHJpdmF0ZSBzaG93R2xvYmFsTWVzc2FnZShcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICAgcGFyYW06IHN0cmluZyxcbiAgICBtZXNzYWdlVHlwZTogR2xvYmFsTWVzc2FnZVR5cGVcbiAgKSB7XG4gICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7IGtleTogdGV4dCwgcGFyYW1zOiB7IHZvdWNoZXJDb2RlOiBwYXJhbSB9IH0sXG4gICAgICBtZXNzYWdlVHlwZVxuICAgICk7XG4gIH1cbn1cbiJdfQ==