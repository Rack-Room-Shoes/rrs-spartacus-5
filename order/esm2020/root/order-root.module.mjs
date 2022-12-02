/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE, ORDER_ENTRIES_CONTEXT, } from '@spartacus/cart/base/root';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultOrderRoutingConfig } from './config/default-order-routing-config';
import { ORDER_CORE_FEATURE, ORDER_FEATURE } from './feature-name';
import { OrderConfirmationOrderEntriesContextToken, OrderDetailsOrderEntriesContextToken, } from './tokens/context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrderComponentsConfig() {
    const config = {
        featureModules: {
            [ORDER_FEATURE]: {
                cmsComponents: [
                    'CancelOrderComponent',
                    'CancelOrderConfirmationComponent',
                    'ReturnOrderComponent',
                    'ReturnOrderConfirmationComponent',
                    'AccountOrderDetailsActionsComponent',
                    'AccountOrderDetailsItemsComponent',
                    'AccountOrderDetailsTotalsComponent',
                    'AccountOrderDetailsShippingComponent',
                    'AccountOrderHistoryComponent',
                    'ReplenishmentDetailItemsComponent',
                    'ReplenishmentDetailTotalsComponent',
                    'ReplenishmentDetailShippingComponent',
                    'ReplenishmentDetailActionsComponent',
                    'ReplenishmentDetailOrderHistoryComponent',
                    'AccountReplenishmentHistoryComponent',
                    'ReturnRequestOverviewComponent',
                    'ReturnRequestItemsComponent',
                    'ReturnRequestTotalsComponent',
                    'OrderReturnRequestListComponent',
                    'OrderConfirmationThankMessageComponent',
                    'OrderConfirmationItemsComponent',
                    'OrderConfirmationTotalsComponent',
                    'OrderConfirmationOverviewComponent',
                    'ReplenishmentConfirmationMessageComponent',
                    'ReplenishmentConfirmationOverviewComponent',
                    'ReplenishmentConfirmationItemsComponent',
                    'ReplenishmentConfirmationTotalsComponent',
                ],
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [ORDER_CORE_FEATURE]: ORDER_FEATURE,
        },
    };
    return config;
}
export class OrderRootModule {
}
OrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderRootModule, imports: [i1.RouterModule] });
OrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderRootModule, providers: [
        provideDefaultConfigFactory(defaultOrderComponentsConfig),
        provideDefaultConfig(defaultOrderRoutingConfig),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { pageLabel: 'order', cxRoute: 'orderGuest' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'orderDetails',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: OrderDetailsOrderEntriesContextToken,
                    },
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderCancel' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderCancelConfirmation' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderReturn' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderReturnConfirmation' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'replenishmentDetails' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'replenishmentOrders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'returnRequestDetails' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'orderConfirmation',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { pageLabel: 'order', cxRoute: 'orderGuest' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'orderDetails',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: OrderDetailsOrderEntriesContextToken,
                                    },
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderCancel' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderCancelConfirmation' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderReturn' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderReturnConfirmation' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'replenishmentDetails' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'replenishmentOrders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'returnRequestDetails' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'orderConfirmation',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultOrderComponentsConfig),
                        provideDefaultConfig(defaultOrderRoutingConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvcm9vdC9vcmRlci1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsU0FBUyxFQUVULG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFDTCx5Q0FBeUMsRUFDekMsb0NBQW9DLEdBQ3JDLE1BQU0sa0JBQWtCLENBQUM7OztBQUUxQiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNmLGFBQWEsRUFBRTtvQkFDYixzQkFBc0I7b0JBQ3RCLGtDQUFrQztvQkFDbEMsc0JBQXNCO29CQUN0QixrQ0FBa0M7b0JBQ2xDLHFDQUFxQztvQkFDckMsbUNBQW1DO29CQUNuQyxvQ0FBb0M7b0JBQ3BDLHNDQUFzQztvQkFDdEMsOEJBQThCO29CQUM5QixtQ0FBbUM7b0JBQ25DLG9DQUFvQztvQkFDcEMsc0NBQXNDO29CQUN0QyxxQ0FBcUM7b0JBQ3JDLDBDQUEw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QUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFOzZCQUN6Qzs0QkFDRDtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs2QkFDMUM7NEJBQ0Q7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0NBQzNCLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsbUJBQW1CO29DQUM1QixTQUFTLEVBQUU7d0NBQ1QsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLHlDQUF5QztxQ0FDbkU7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQUMsNEJBQTRCLENBQUM7d0JBQ3pELG9CQUFvQixDQUFDLHlCQUF5QixDQUFDO3FCQUNoRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ0FSVF9CQVNFX0ZFQVRVUkUsXG4gIE9SREVSX0VOVFJJRVNfQ09OVEVYVCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENtc1BhZ2VHdWFyZCwgUGFnZUxheW91dENvbXBvbmVudCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBkZWZhdWx0T3JkZXJSb3V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vcmRlci1yb3V0aW5nLWNvbmZpZyc7XG5pbXBvcnQgeyBPUkRFUl9DT1JFX0ZFQVRVUkUsIE9SREVSX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQge1xuICBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgT3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxufSBmcm9tICcuL3Rva2Vucy9jb250ZXh0JztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdE9yZGVyQ29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW09SREVSX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFtcbiAgICAgICAgICAnQ2FuY2VsT3JkZXJDb21wb25lbnQnLFxuICAgICAgICAgICdDYW5jZWxPcmRlckNvbmZpcm1hdGlvbkNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVybk9yZGVyQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmV0dXJuT3JkZXJDb25maXJtYXRpb25Db21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJEZXRhaWxzQWN0aW9uc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNJdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNUb3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJEZXRhaWxzU2hpcHBpbmdDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJIaXN0b3J5Q29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudERldGFpbEl0ZW1zQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudERldGFpbFRvdGFsc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxTaGlwcGluZ0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxBY3Rpb25zQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudERldGFpbE9yZGVySGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRSZXBsZW5pc2htZW50SGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVyblJlcXVlc3RPdmVydmlld0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVyblJlcXVlc3RJdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVyblJlcXVlc3RUb3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlclJldHVyblJlcXVlc3RMaXN0Q29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25UaGFua01lc3NhZ2VDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckNvbmZpcm1hdGlvbkl0ZW1zQ29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckNvbmZpcm1hdGlvbk92ZXJ2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudENvbmZpcm1hdGlvbk1lc3NhZ2VDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uT3ZlcnZpZXdDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50JyxcbiAgICAgICAgXSxcbiAgICAgICAgZGVwZW5kZW5jaWVzOiBbQ0FSVF9CQVNFX0ZFQVRVUkVdLFxuICAgICAgfSxcbiAgICAgIC8vIGJ5IGRlZmF1bHQgY29yZSBpcyBidW5kbGVkIHRvZ2V0aGVyIHdpdGggY29tcG9uZW50c1xuICAgICAgW09SREVSX0NPUkVfRkVBVFVSRV06IE9SREVSX0ZFQVRVUkUsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBwYWdlTGFiZWw6ICdvcmRlcicsIGN4Um91dGU6ICdvcmRlckd1ZXN0JyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ29yZGVyRGV0YWlscycsXG4gICAgICAgICAgY3hDb250ZXh0OiB7XG4gICAgICAgICAgICBbT1JERVJfRU5UUklFU19DT05URVhUXTogT3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlckNhbmNlbCcgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ29yZGVyQ2FuY2VsQ29uZmlybWF0aW9uJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0Ntc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnb3JkZXJSZXR1cm4nIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlclJldHVybkNvbmZpcm1hdGlvbicgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnb3JkZXJzJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdyZXBsZW5pc2htZW50RGV0YWlscycgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAncmVwbGVuaXNobWVudE9yZGVycycgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAncmV0dXJuUmVxdWVzdERldGFpbHMnIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ29yZGVyQ29uZmlybWF0aW9uJyxcbiAgICAgICAgICBjeENvbnRleHQ6IHtcbiAgICAgICAgICAgIFtPUkRFUl9FTlRSSUVTX0NPTlRFWFRdOiBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRPcmRlckNvbXBvbmVudHNDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPcmRlclJvdXRpbmdDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclJvb3RNb2R1bGUge31cbiJdfQ==