/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OrderConfirmationOrderEntriesContextToken, OrderFacade, } from '@spartacus/order/root';
import { CardModule, FormErrorsModule, OutletModule, PromotionsModule, PwaModule, PasswordVisibilityToggleModule, } from '@spartacus/storefront';
import { OrderConfirmationGuard } from '../guards/order-confirmation.guard';
import { OrderDetailShippingComponent } from '../order-details/order-detail-shipping/order-detail-shipping.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderOverviewModule } from '../order-details/order-overview/order-overview.module';
import { OrderConfirmationOrderEntriesContext } from '../page-context/order-confirmation-order-entries.context';
import { OrderConfirmationItemsComponent } from './order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals/order-confirmation-totals.component';
import { OrderGuestRegisterFormComponent } from './order-guest-register-form/order-guest-register-form.component';
import * as i0 from "@angular/core";
const orderConfirmationComponents = [
    OrderConfirmationItemsComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
    OrderGuestRegisterFormComponent,
];
export class OrderConfirmationModule {
}
OrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, declarations: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OrderOverviewModule,
        OutletModule,
        PasswordVisibilityToggleModule], exports: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent] });
OrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderConfirmationThankMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationOverviewComponent: {
                    component: OrderDetailShippingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationOverviewComponent: {
                    component: OrderDetailShippingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
            },
        }),
        {
            provide: OrderConfirmationOrderEntriesContextToken,
            useExisting: OrderConfirmationOrderEntriesContext,
        },
    ], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OrderOverviewModule,
        OutletModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        PwaModule,
                        PromotionsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        OrderOverviewModule,
                        OutletModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderConfirmationThankMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationOverviewComponent: {
                                    component: OrderDetailShippingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationOverviewComponent: {
                                    component: OrderDetailShippingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                            },
                        }),
                        {
                            provide: OrderConfirmationOrderEntriesContextToken,
                            useExisting: OrderConfirmationOrderEntriesContext,
                        },
                    ],
                    declarations: [...orderConfirmationComponents],
                    exports: [...orderConfirmationComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29uZmlybWF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL29yZGVyLWNvbmZpcm1hdGlvbi9vcmRlci1jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlDQUF5QyxFQUN6QyxXQUFXLEdBQ1osTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQ0wsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCw4QkFBOEIsR0FDL0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUN0SCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNoSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUNoSCxPQUFPLEVBQUUseUNBQXlDLEVBQUUsTUFBTSx1RkFBdUYsQ0FBQztBQUNsSixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxp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QUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgT3JkZXJGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQge1xuICBDYXJkTW9kdWxlLFxuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBPdXRsZXRNb2R1bGUsXG4gIFByb21vdGlvbnNNb2R1bGUsXG4gIFB3YU1vZHVsZSxcbiAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25HdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9vcmRlci1jb25maXJtYXRpb24uZ3VhcmQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxTaGlwcGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlsLXNoaXBwaW5nL29yZGVyLWRldGFpbC1zaGlwcGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyT3ZlcnZpZXdNb2R1bGUgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzL29yZGVyLW92ZXJ2aWV3L29yZGVyLW92ZXJ2aWV3Lm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHQgfSBmcm9tICcuLi9wYWdlLWNvbnRleHQvb3JkZXItY29uZmlybWF0aW9uLW9yZGVyLWVudHJpZXMuY29udGV4dCc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvbkl0ZW1zQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1jb25maXJtYXRpb24taXRlbXMvb3JkZXItY29uZmlybWF0aW9uLWl0ZW1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvblRoYW5rWW91TWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItY29uZmlybWF0aW9uLXRoYW5rLXlvdS1tZXNzYWdlL29yZGVyLWNvbmZpcm1hdGlvbi10aGFuay15b3UtbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWNvbmZpcm1hdGlvbi10b3RhbHMvb3JkZXItY29uZmlybWF0aW9uLXRvdGFscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJHdWVzdFJlZ2lzdGVyRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZ3Vlc3QtcmVnaXN0ZXItZm9ybS9vcmRlci1ndWVzdC1yZWdpc3Rlci1mb3JtLmNvbXBvbmVudCc7XG5cbmNvbnN0IG9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50cyA9IFtcbiAgT3JkZXJDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCxcbiAgT3JkZXJDb25maXJtYXRpb25UaGFua1lvdU1lc3NhZ2VDb21wb25lbnQsXG4gIE9yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50LFxuICBPcmRlckd1ZXN0UmVnaXN0ZXJGb3JtQ29tcG9uZW50LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFB3YU1vZHVsZSxcbiAgICBQcm9tb3Rpb25zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIE9yZGVyT3ZlcnZpZXdNb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uVGhhbmtNZXNzYWdlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckNvbmZpcm1hdGlvblRoYW5rWW91TWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgUmVwbGVuaXNobWVudENvbmZpcm1hdGlvbk1lc3NhZ2VDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uVGhhbmtZb3VNZXNzYWdlQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuXG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnRDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcblxuICAgICAgICBPcmRlckNvbmZpcm1hdGlvblRvdGFsc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnRDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuXG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uT3ZlcnZpZXdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsU2hpcHBpbmdDb21wb25lbnQsXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBPcmRlckZhY2FkZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgUmVwbGVuaXNobWVudENvbmZpcm1hdGlvbk92ZXJ2aWV3Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbFNoaXBwaW5nQ29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogT3JkZXJGYWNhZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9yZGVyQ29uZmlybWF0aW9uT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyQ29uZmlybWF0aW9uT3JkZXJFbnRyaWVzQ29udGV4dCxcbiAgICB9LFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5vcmRlckNvbmZpcm1hdGlvbkNvbXBvbmVudHNdLFxuICBleHBvcnRzOiBbLi4ub3JkZXJDb25maXJtYXRpb25Db21wb25lbnRzXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDb25maXJtYXRpb25Nb2R1bGUge31cbiJdfQ==