/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isEmpty } from '@spartacus/cart/base/core';
import { combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/cart/base/core";
export class CartPageLayoutHandler {
    constructor(activeCartService, selectiveCartService, cartConfig) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.cartConfig = cartConfig;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === 'CartPageTemplate' && !section) {
            return combineLatest([
                slots$,
                this.activeCartService.getActive(),
                this.cartConfig.isSelectiveCartEnabled()
                    ? this.selectiveCartService.getCart().pipe(startWith(null))
                    : of({}),
                this.activeCartService.getLoading(),
            ]).pipe(map(([slots, cart, selectiveCart, loadingCart]) => {
                const exclude = (arr, args) => arr.filter((item) => args.every((arg) => arg !== item));
                return isEmpty(cart) && loadingCart
                    ? exclude(slots, [
                        'TopContent',
                        'CenterRightContentSlot',
                        'EmptyCartMiddleContent',
                    ])
                    : cart.totalItems
                        ? exclude(slots, ['EmptyCartMiddleContent'])
                        : selectiveCart?.totalItems
                            ? exclude(slots, [
                                'EmptyCartMiddleContent',
                                'CenterRightContentSlot',
                            ])
                            : exclude(slots, ['TopContent', 'CenterRightContentSlot']);
            }));
        }
        return slots$;
    }
}
CartPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartPageLayoutHandler, deps: [{ token: i1.ActiveCartFacade }, { token: i1.SelectiveCartFacade }, { token: i2.CartConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CartPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i1.SelectiveCartFacade }, { type: i2.CartConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wYWdlLWxheW91dC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtcGFnZS1sYXlvdXQtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXFCLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3ZFLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLaEQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNZLGlCQUFtQyxFQUNuQyxvQkFBeUMsRUFDekMsVUFBNkI7UUFGN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQ3RDLENBQUM7SUFFSixNQUFNLENBQ0osTUFBNEIsRUFDNUIsWUFBcUIsRUFDckIsT0FBZ0I7UUFFaEIsSUFBSSxZQUFZLEtBQUssa0JBQWtCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkQsT0FBTyxhQUFhLENBQUM7Z0JBQ25CLE1BQU07Z0JBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRTtvQkFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzRCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQVUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRTthQUNwQyxDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFhLEVBQUUsSUFBYyxFQUFFLEVBQUUsQ0FDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVc7b0JBQ2pDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO3dCQUNiLFlBQVk7d0JBQ1osd0JBQXdCO3dCQUN4Qix3QkFBd0I7cUJBQ3pCLENBQUM7b0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO3dCQUNqQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLHdCQUF3QixDQUFDLENBQUM7d0JBQzVDLENBQUMsQ0FBQyxhQUFhLEVBQUUsVUFBVTs0QkFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0NBQ2Isd0JBQXdCO2dDQUN4Qix3QkFBd0I7NkJBQ3pCLENBQUM7NEJBQ0osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxZQUFZLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2tIQTFDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJ0Q29uZmlnU2VydmljZSwgaXNFbXB0eSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FydCxcbiAgU2VsZWN0aXZlQ2FydEZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBQYWdlTGF5b3V0SGFuZGxlciB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0UGFnZUxheW91dEhhbmRsZXIgaW1wbGVtZW50cyBQYWdlTGF5b3V0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc2VsZWN0aXZlQ2FydFNlcnZpY2U6IFNlbGVjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNhcnRDb25maWc6IENhcnRDb25maWdTZXJ2aWNlXG4gICkge31cblxuICBoYW5kbGUoXG4gICAgc2xvdHMkOiBPYnNlcnZhYmxlPHN0cmluZ1tdPixcbiAgICBwYWdlVGVtcGxhdGU/OiBzdHJpbmcsXG4gICAgc2VjdGlvbj86IHN0cmluZ1xuICApIHtcbiAgICBpZiAocGFnZVRlbXBsYXRlID09PSAnQ2FydFBhZ2VUZW1wbGF0ZScgJiYgIXNlY3Rpb24pIHtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgc2xvdHMkLFxuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgICAgICB0aGlzLmNhcnRDb25maWcuaXNTZWxlY3RpdmVDYXJ0RW5hYmxlZCgpXG4gICAgICAgICAgPyB0aGlzLnNlbGVjdGl2ZUNhcnRTZXJ2aWNlLmdldENhcnQoKS5waXBlKHN0YXJ0V2l0aChudWxsKSlcbiAgICAgICAgICA6IG9mKHt9IGFzIENhcnQpLFxuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmdldExvYWRpbmcoKSxcbiAgICAgIF0pLnBpcGUoXG4gICAgICAgIG1hcCgoW3Nsb3RzLCBjYXJ0LCBzZWxlY3RpdmVDYXJ0LCBsb2FkaW5nQ2FydF0pID0+IHtcbiAgICAgICAgICBjb25zdCBleGNsdWRlID0gKGFycjogc3RyaW5nW10sIGFyZ3M6IHN0cmluZ1tdKSA9PlxuICAgICAgICAgICAgYXJyLmZpbHRlcigoaXRlbSkgPT4gYXJncy5ldmVyeSgoYXJnKSA9PiBhcmcgIT09IGl0ZW0pKTtcbiAgICAgICAgICByZXR1cm4gaXNFbXB0eShjYXJ0KSAmJiBsb2FkaW5nQ2FydFxuICAgICAgICAgICAgPyBleGNsdWRlKHNsb3RzLCBbXG4gICAgICAgICAgICAgICAgJ1RvcENvbnRlbnQnLFxuICAgICAgICAgICAgICAgICdDZW50ZXJSaWdodENvbnRlbnRTbG90JyxcbiAgICAgICAgICAgICAgICAnRW1wdHlDYXJ0TWlkZGxlQ29udGVudCcsXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IGNhcnQudG90YWxJdGVtc1xuICAgICAgICAgICAgPyBleGNsdWRlKHNsb3RzLCBbJ0VtcHR5Q2FydE1pZGRsZUNvbnRlbnQnXSlcbiAgICAgICAgICAgIDogc2VsZWN0aXZlQ2FydD8udG90YWxJdGVtc1xuICAgICAgICAgICAgPyBleGNsdWRlKHNsb3RzLCBbXG4gICAgICAgICAgICAgICAgJ0VtcHR5Q2FydE1pZGRsZUNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICdDZW50ZXJSaWdodENvbnRlbnRTbG90JyxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogZXhjbHVkZShzbG90cywgWydUb3BDb250ZW50JywgJ0NlbnRlclJpZ2h0Q29udGVudFNsb3QnXSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gc2xvdHMkO1xuICB9XG59XG4iXX0=