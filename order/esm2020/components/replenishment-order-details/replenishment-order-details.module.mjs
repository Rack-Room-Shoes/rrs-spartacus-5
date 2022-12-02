/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, ListNavigationModule, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { OrderDetailItemsComponent } from '../order-details/order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from '../order-details/order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from '../order-details/order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { ReplenishmentOrderCancellationDialogModule } from '../replenishment-order-cancellation-dialog/replenishment-order-cancellation-dialog.module';
import { defaultReplenishmentOrderCancellationLayoutConfig } from './default-replenishment-order-cancellation-layout.config';
import { ReplenishmentOrderCancellationComponent } from './replenishment-order-cancellation/replenishment-order-cancellation.component';
import { ReplenishmentOrderDetailsService } from './replenishment-order-details.service';
import * as i0 from "@angular/core";
const moduleComponents = [ReplenishmentOrderCancellationComponent];
export class ReplenishmentOrderDetailsModule {
}
ReplenishmentOrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, declarations: [ReplenishmentOrderCancellationComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule], exports: [ReplenishmentOrderCancellationComponent] });
ReplenishmentOrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                ReplenishmentDetailItemsComponent: {
                    component: OrderDetailItemsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailShippingComponent: {
                    component: OrderDetailShippingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailActionsComponent: {
                    component: ReplenishmentOrderCancellationComponent,
                },
                ReplenishmentDetailOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                },
            },
        }),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        PromotionsModule,
                        UrlModule,
                        ReplenishmentOrderCancellationDialogModule,
                        SpinnerModule,
                        ListNavigationModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                ReplenishmentDetailItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailShippingComponent: {
                                    component: OrderDetailShippingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailActionsComponent: {
                                    component: ReplenishmentOrderCancellationComponent,
                                },
                                ReplenishmentDetailOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JlcGxlbmlzaG1lbnQtb3JkZXItZGV0YWlscy9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3RILE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDJGQUEyRixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxpREFBaUQsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQzdILE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFN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XG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhcmRNb2R1bGUsXG4gIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlsLWl0ZW1zL29yZGVyLWRldGFpbC1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxTaGlwcGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlsLXNoaXBwaW5nL29yZGVyLWRldGFpbC1zaGlwcGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC10b3RhbHMvb3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVySGlzdG9yeUNvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLWhpc3Rvcnkvb3JkZXItaGlzdG9yeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi4vcmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24tZGlhbG9nL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgZGVmYXVsdFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkxheW91dENvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1yZXBsZW5pc2htZW50LW9yZGVyLWNhbmNlbGxhdGlvbi1sYXlvdXQuY29uZmlnJztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24vcmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNTZXJ2aWNlIH0gZnJvbSAnLi9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMuc2VydmljZSc7XG5cbmNvbnN0IG1vZHVsZUNvbXBvbmVudHMgPSBbUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uQ29tcG9uZW50XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENhcmRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUHJvbW90aW9uc01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uRGlhbG9nTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0UmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uTGF5b3V0Q29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgUmVwbGVuaXNobWVudERldGFpbEl0ZW1zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogUmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnREZXRhaWxUb3RhbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsVG90YWxzQ29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogUmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnREZXRhaWxTaGlwcGluZ0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJEZXRhaWxTaGlwcGluZ0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBSZXBsZW5pc2htZW50RGV0YWlsQWN0aW9uc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBSZXBsZW5pc2htZW50RGV0YWlsT3JkZXJIaXN0b3J5Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckhpc3RvcnlDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5tb2R1bGVDb21wb25lbnRzXSxcbiAgZXhwb3J0czogWy4uLm1vZHVsZUNvbXBvbmVudHNdLFxufSlcbmV4cG9ydCBjbGFzcyBSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzTW9kdWxlIHt9XG4iXX0=