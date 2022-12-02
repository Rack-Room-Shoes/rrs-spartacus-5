/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { AddressFormModule, CardModule, SpinnerModule, } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';
import * as i0 from "@angular/core";
export class CheckoutDeliveryAddressModule {
}
CheckoutDeliveryAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutDeliveryAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, declarations: [CheckoutDeliveryAddressComponent], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule], exports: [CheckoutDeliveryAddressComponent] });
CheckoutDeliveryAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryAddress: {
                    component: CheckoutDeliveryAddressComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        AddressFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryAddress: {
                                    component: CheckoutDeliveryAddressComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutDeliveryAddressComponent],
                    exports: [CheckoutDeliveryAddressComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0FBd0J6RixNQUFNLE9BQU8sNkJBQTZCOzswSEFBN0IsNkJBQTZCOzJIQUE3Qiw2QkFBNkIsaUJBSHpCLGdDQUFnQyxhQWpCN0MsWUFBWTtRQUNaLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsVUFBVTtRQUNWLGFBQWE7UUFDYixVQUFVLGFBYUYsZ0NBQWdDOzJIQUUvQiw2QkFBNkIsYUFiN0I7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsdUJBQXVCLEVBQUU7b0JBQ3ZCLFNBQVMsRUFBRSxnQ0FBZ0M7b0JBQzNDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDO2lCQUNwRTthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaEJDLFlBQVk7UUFDWixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLFVBQVU7UUFDVixhQUFhO1FBQ2IsVUFBVTsyRkFlRCw2QkFBNkI7a0JBdEJ6QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsVUFBVTtxQkFDWDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYix1QkFBdUIsRUFBRTtvQ0FDdkIsU0FBUyxFQUFFLGdDQUFnQztvQ0FDM0MsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUM7aUNBQ3BFOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7b0JBQ2hELE9BQU8sRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uR3VhcmQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWRkcmVzc0Zvcm1Nb2R1bGUsXG4gIENhcmRNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDYXJ0Tm90RW1wdHlHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9jYXJ0LW5vdC1lbXB0eS5ndWFyZCc7XG5pbXBvcnQgeyBDaGVja291dEF1dGhHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9jaGVja291dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIEFkZHJlc3NGb3JtTW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3M6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0NoZWNrb3V0QXV0aEd1YXJkLCBDYXJ0Tm90RW1wdHlHdWFyZCwgQ2FydFZhbGlkYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzTW9kdWxlIHt9XG4iXX0=