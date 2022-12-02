/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { DeleteCartSuccessEvent, DeleteCartFailEvent, } from '@spartacus/cart/base/root';
import { mapTo, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { merge } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
export class ClearCartDialogComponentService {
    constructor(launchDialogService, globalMessageService, activeCartFacade, multiCartFacade, userIdService, eventService) {
        this.launchDialogService = launchDialogService;
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
    }
    /**
     * Clear the cart by deleting the active cart.
     */
    deleteActiveCart() {
        this.activeCartFacade
            .getActiveCartId()
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1), tap(([cartId, userId]) => {
            this.multiCartFacade.deleteCart(cartId, userId);
        }), switchMap(() => merge(this.eventService.get(DeleteCartSuccessEvent).pipe(mapTo(true)), this.eventService.get(DeleteCartFailEvent).pipe(mapTo(false))).pipe(take(1))), tap(() => this.closeDialog('Close dialog after cart cleared')))
            .subscribe((success) => {
            this.displayGlobalMessage(success);
        });
    }
    /**
     * Close clear cart modal dialog
     *
     * @param reason to close dialog
     */
    closeDialog(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    /**
     * Display global message after clearing cart.
     * By default, only message displayed is of type `Success`. A negative scenario
     * related to cart has been handled in the occ layer already.
     *
     * @param success result of clear cart action
     */
    displayGlobalMessage(success) {
        if (success) {
            this.globalMessageService.add({ key: 'clearCart.cartClearedSuccessfully' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
}
ClearCartDialogComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ClearCartDialogComponentService, deps: [{ token: i1.LaunchDialogService }, { token: i2.GlobalMessageService }, { token: i3.ActiveCartFacade }, { token: i3.MultiCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
ClearCartDialogComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ClearCartDialogComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ClearCartDialogComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i2.GlobalMessageService }, { type: i3.ActiveCartFacade }, { type: i3.MultiCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItY2FydC1kaWFsb2ctY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvbXBvbmVudHMvY2xlYXItY2FydC9jbGVhci1jYXJ0LWRpYWxvZy9jbGVhci1jYXJ0LWRpYWxvZy1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUdMLHNCQUFzQixFQUN0QixtQkFBbUIsR0FDcEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBSzdCLE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDWSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLGdCQUFrQyxFQUNsQyxlQUFnQyxFQUNoQyxhQUE0QixFQUM1QixZQUEwQjtRQUwxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDbkMsQ0FBQztJQUVKOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQjthQUNsQixlQUFlLEVBQUU7YUFDakIsSUFBSSxDQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsR0FBRyxFQUFFLENBQ2IsS0FBSyxDQUNILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDOUQsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2hCLEVBQ0QsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUMvRDthQUNBLFNBQVMsQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxNQUFjO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLG9CQUFvQixDQUFDLE9BQWdCO1FBQzdDLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsbUNBQW1DLEVBQUUsRUFDNUMsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7U0FDSDtJQUNILENBQUM7OzRIQTFEVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQUY5QixNQUFNOzJGQUVQLCtCQUErQjtrQkFIM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFdmVudFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIE11bHRpQ2FydEZhY2FkZSxcbiAgRGVsZXRlQ2FydFN1Y2Nlc3NFdmVudCxcbiAgRGVsZXRlQ2FydEZhaWxFdmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBtYXBUbywgc3dpdGNoTWFwLCB0YWtlLCB0YXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xlYXJDYXJ0RGlhbG9nQ29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydEZhY2FkZTogTXVsdGlDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjYXJ0IGJ5IGRlbGV0aW5nIHRoZSBhY3RpdmUgY2FydC5cbiAgICovXG4gIGRlbGV0ZUFjdGl2ZUNhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlXG4gICAgICAuZ2V0QWN0aXZlQ2FydElkKClcbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICB0YXAoKFtjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5kZWxldGVDYXJ0KGNhcnRJZCwgdXNlcklkKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KERlbGV0ZUNhcnRTdWNjZXNzRXZlbnQpLnBpcGUobWFwVG8odHJ1ZSkpLFxuICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KERlbGV0ZUNhcnRGYWlsRXZlbnQpLnBpcGUobWFwVG8oZmFsc2UpKVxuICAgICAgICAgICkucGlwZSh0YWtlKDEpKVxuICAgICAgICApLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5jbG9zZURpYWxvZygnQ2xvc2UgZGlhbG9nIGFmdGVyIGNhcnQgY2xlYXJlZCcpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoc3VjY2VzczogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmRpc3BsYXlHbG9iYWxNZXNzYWdlKHN1Y2Nlc3MpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgY2xlYXIgY2FydCBtb2RhbCBkaWFsb2dcbiAgICpcbiAgICogQHBhcmFtIHJlYXNvbiB0byBjbG9zZSBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGlhbG9nKHJlYXNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheSBnbG9iYWwgbWVzc2FnZSBhZnRlciBjbGVhcmluZyBjYXJ0LlxuICAgKiBCeSBkZWZhdWx0LCBvbmx5IG1lc3NhZ2UgZGlzcGxheWVkIGlzIG9mIHR5cGUgYFN1Y2Nlc3NgLiBBIG5lZ2F0aXZlIHNjZW5hcmlvXG4gICAqIHJlbGF0ZWQgdG8gY2FydCBoYXMgYmVlbiBoYW5kbGVkIGluIHRoZSBvY2MgbGF5ZXIgYWxyZWFkeS5cbiAgICpcbiAgICogQHBhcmFtIHN1Y2Nlc3MgcmVzdWx0IG9mIGNsZWFyIGNhcnQgYWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgZGlzcGxheUdsb2JhbE1lc3NhZ2Uoc3VjY2VzczogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgeyBrZXk6ICdjbGVhckNhcnQuY2FydENsZWFyZWRTdWNjZXNzZnVsbHknIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==