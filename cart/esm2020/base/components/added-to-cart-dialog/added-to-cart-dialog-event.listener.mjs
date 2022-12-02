/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartAddEntryFailEvent, CartUiEventAddToCart, } from '@spartacus/cart/base/root';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/storefront";
export class AddedToCartDialogEventListener {
    constructor(eventService, launchDialogService) {
        this.eventService = eventService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.onAddToCart();
    }
    onAddToCart() {
        this.subscription.add(this.eventService.get(CartUiEventAddToCart).subscribe((event) => {
            this.openModal(event);
        }));
        this.subscription.add(this.eventService.get(CartAddEntryFailEvent).subscribe((event) => {
            this.closeModal(event);
        }));
    }
    openModal(event) {
        const addToCartData = {
            productCode: event.productCode,
            quantity: event.quantity,
            numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
        };
        const dialog = this.launchDialogService.openDialog("ADDED_TO_CART" /* LAUNCH_CALLER.ADDED_TO_CART */, undefined, undefined, addToCartData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
AddedToCartDialogEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddedToCartDialogEventListener, deps: [{ token: i1.EventService }, { token: i2.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
AddedToCartDialogEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddedToCartDialogEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddedToCartDialogEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.LaunchDialogService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkZWQtdG8tY2FydC1kaWFsb2ctZXZlbnQubGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvbXBvbmVudHMvYWRkZWQtdG8tY2FydC1kaWFsb2cvYWRkZWQtdG8tY2FydC1kaWFsb2ctZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLHFCQUFxQixFQUNyQixvQkFBb0IsR0FDckIsTUFBTSwyQkFBMkIsQ0FBQztBQUduQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUt0QyxNQUFNLE9BQU8sOEJBQThCO0lBR3pDLFlBQ1ksWUFBMEIsRUFDMUIsbUJBQXdDO1FBRHhDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKMUMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRVMsV0FBVztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRVMsU0FBUyxDQUFDLEtBQTJCO1FBQzdDLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLHdCQUF3QjtTQUN6RCxDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsb0RBRWhELFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxDQUNkLENBQUM7UUFFRixJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRVMsVUFBVSxDQUFDLE1BQVk7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7MkhBakRVLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRjdCLE1BQU07MkZBRVAsOEJBQThCO2tCQUgxQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FydEFkZEVudHJ5RmFpbEV2ZW50LFxuICBDYXJ0VWlFdmVudEFkZFRvQ2FydCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRlZFRvQ2FydERpYWxvZ0V2ZW50TGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZVxuICApIHtcbiAgICB0aGlzLm9uQWRkVG9DYXJ0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25BZGRUb0NhcnQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENhcnRVaUV2ZW50QWRkVG9DYXJ0KS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub3Blbk1vZGFsKGV2ZW50KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0QWRkRW50cnlGYWlsRXZlbnQpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKGV2ZW50KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvcGVuTW9kYWwoZXZlbnQ6IENhcnRVaUV2ZW50QWRkVG9DYXJ0KTogdm9pZCB7XG4gICAgY29uc3QgYWRkVG9DYXJ0RGF0YSA9IHtcbiAgICAgIHByb2R1Y3RDb2RlOiBldmVudC5wcm9kdWN0Q29kZSxcbiAgICAgIHF1YW50aXR5OiBldmVudC5xdWFudGl0eSxcbiAgICAgIG51bWJlck9mRW50cmllc0JlZm9yZUFkZDogZXZlbnQubnVtYmVyT2ZFbnRyaWVzQmVmb3JlQWRkLFxuICAgIH07XG5cbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2Uub3BlbkRpYWxvZyhcbiAgICAgIExBVU5DSF9DQUxMRVIuQURERURfVE9fQ0FSVCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIGFkZFRvQ2FydERhdGFcbiAgICApO1xuXG4gICAgaWYgKGRpYWxvZykge1xuICAgICAgZGlhbG9nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNsb3NlTW9kYWwocmVhc29uPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19