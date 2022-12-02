/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryModeComponent } from './checkout-delivery-mode.component';
import * as i0 from "@angular/core";
export class CheckoutDeliveryModeModule {
}
CheckoutDeliveryModeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutDeliveryModeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, declarations: [CheckoutDeliveryModeComponent], imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule], exports: [CheckoutDeliveryModeComponent] });
CheckoutDeliveryModeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryMode: {
                    component: CheckoutDeliveryModeComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryMode: {
                                    component: CheckoutDeliveryModeComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutDeliveryModeComponent],
                    exports: [CheckoutDeliveryModeComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktbW9kZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGUvY2hlY2tvdXQtZGVsaXZlcnktbW9kZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBYSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBaUJuRixNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsaUJBSHRCLDZCQUE2QixhQVhsQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLGFBQWEsYUFZNUQsNkJBQTZCO3dIQUU1QiwwQkFBMEIsYUFiMUI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isb0JBQW9CLEVBQUU7b0JBQ3BCLFNBQVMsRUFBRSw2QkFBNkI7b0JBQ3hDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2lCQUMvQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVlMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxhQUFhOzJGQWMzRCwwQkFBMEI7a0JBZnRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7b0JBQ3ZFLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLG9CQUFvQixFQUFFO29DQUNwQixTQUFTLEVBQUUsNkJBQTZCO29DQUN4QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztpQ0FDL0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztvQkFDN0MsT0FBTyxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhcnROb3RFbXB0eUd1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL2NhcnQtbm90LWVtcHR5Lmd1YXJkJztcbmltcG9ydCB7IENoZWNrb3V0QXV0aEd1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL2NoZWNrb3V0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ2hlY2tvdXREZWxpdmVyeU1vZGVDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgSTE4bk1vZHVsZSwgU3Bpbm5lck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDaGVja291dERlbGl2ZXJ5TW9kZToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ2hlY2tvdXREZWxpdmVyeU1vZGVDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQ2hlY2tvdXRBdXRoR3VhcmQsIENhcnROb3RFbXB0eUd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NoZWNrb3V0RGVsaXZlcnlNb2RlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NoZWNrb3V0RGVsaXZlcnlNb2RlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeU1vZGVNb2R1bGUge31cbiJdfQ==