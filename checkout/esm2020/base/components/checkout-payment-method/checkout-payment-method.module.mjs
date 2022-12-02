/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutPaymentFormModule } from './checkout-payment-form/checkout-payment-form.module';
import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';
import * as i0 from "@angular/core";
export class CheckoutPaymentMethodModule {
}
CheckoutPaymentMethodModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentMethodModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, declarations: [CheckoutPaymentMethodComponent], imports: [CommonModule,
        RouterModule,
        CheckoutPaymentFormModule,
        CardModule,
        SpinnerModule,
        I18nModule], exports: [CheckoutPaymentMethodComponent] });
CheckoutPaymentMethodModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutPaymentDetails: {
                    component: CheckoutPaymentMethodComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        CheckoutPaymentFormModule,
        CardModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        CheckoutPaymentFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutPaymentDetails: {
                                    component: CheckoutPaymentMethodComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutPaymentMethodComponent],
                    exports: [CheckoutPaymentMethodComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC1tZXRob2QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cy9jaGVja291dC1wYXltZW50LW1ldGhvZC9jaGVja291dC1wYXltZW50LW1ldGhvZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUF3QnJGLE1BQU0sT0FBTywyQkFBMkI7O3dIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixpQkFIdkIsOEJBQThCLGFBakIzQyxZQUFZO1FBQ1osWUFBWTtRQUNaLHlCQUF5QjtRQUN6QixVQUFVO1FBQ1YsYUFBYTtRQUNiLFVBQVUsYUFhRiw4QkFBOEI7eUhBRTdCLDJCQUEyQixhQWIzQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixzQkFBc0IsRUFBRTtvQkFDdEIsU0FBUyxFQUFFLDhCQUE4QjtvQkFDekMsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFoQkMsWUFBWTtRQUNaLFlBQVk7UUFDWix5QkFBeUI7UUFDekIsVUFBVTtRQUNWLGFBQWE7UUFDYixVQUFVOzJGQWVELDJCQUEyQjtrQkF0QnZDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWix5QkFBeUI7d0JBQ3pCLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixVQUFVO3FCQUNYO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHNCQUFzQixFQUFFO29DQUN0QixTQUFTLEVBQUUsOEJBQThCO29DQUN6QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztpQ0FDL0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDOUMsT0FBTyxFQUFFLENBQUMsOEJBQThCLENBQUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlLCBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhcnROb3RFbXB0eUd1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL2NhcnQtbm90LWVtcHR5Lmd1YXJkJztcbmltcG9ydCB7IENoZWNrb3V0QXV0aEd1YXJkIH0gZnJvbSAnLi4vZ3VhcmRzL2NoZWNrb3V0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50Rm9ybU1vZHVsZSB9IGZyb20gJy4vY2hlY2tvdXQtcGF5bWVudC1mb3JtL2NoZWNrb3V0LXBheW1lbnQtZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50TWV0aG9kQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja291dC1wYXltZW50LW1ldGhvZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBDaGVja291dFBheW1lbnRGb3JtTW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2hlY2tvdXRQYXltZW50RGV0YWlsczoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ2hlY2tvdXRQYXltZW50TWV0aG9kQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0NoZWNrb3V0QXV0aEd1YXJkLCBDYXJ0Tm90RW1wdHlHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDaGVja291dFBheW1lbnRNZXRob2RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXRQYXltZW50TWV0aG9kQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50TWV0aG9kTW9kdWxlIHt9XG4iXX0=