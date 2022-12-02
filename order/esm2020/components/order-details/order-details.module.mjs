/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, KeyboardFocusModule, OutletModule, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { OrderDetailActionsComponent } from './order-detail-actions/order-detail-actions.component';
import { ConsignmentTrackingComponent } from './order-detail-items/consignment-tracking/consignment-tracking.component';
import { TrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { defaultConsignmentTrackingLayoutConfig } from './order-detail-items/default-consignment-tracking-layout.config';
import { OrderConsignedEntriesComponent } from './order-detail-items/order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderOverviewModule } from './order-overview/order-overview.module';
import * as i0 from "@angular/core";
const moduleComponents = [
    OrderDetailActionsComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailShippingComponent,
    TrackingEventsComponent,
    ConsignmentTrackingComponent,
    OrderConsignedEntriesComponent,
];
export class OrderDetailsModule {
}
OrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, declarations: [OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailShippingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        OrderOverviewModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule], exports: [OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailShippingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent] });
OrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderDetailsActionsComponent: {
                    component: OrderDetailActionsComponent,
                },
                AccountOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    data: {
                        enableAddToCart: true,
                    },
                },
                AccountOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                },
                AccountOrderDetailsShippingComponent: {
                    component: OrderDetailShippingComponent,
                },
            },
            features: {
                consignmentTracking: '1.2',
            },
        }),
        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        OrderOverviewModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        PromotionsModule,
                        OrderOverviewModule,
                        UrlModule,
                        SpinnerModule,
                        RouterModule,
                        OutletModule,
                        AddToCartModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderDetailsActionsComponent: {
                                    component: OrderDetailActionsComponent,
                                },
                                AccountOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    data: {
                                        enableAddToCart: true,
                                    },
                                },
                                AccountOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                },
                                AccountOrderDetailsShippingComponent: {
                                    component: OrderDetailShippingComponent,
                                },
                            },
                            features: {
                                consignmentTracking: '1.2',
                            },
                        }),
                        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzlFLE9BQU8sRUFHTCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsVUFBVSxFQUNWLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3hILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFGQUFxRixDQUFDO0FBQzlILE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3pILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGdGQUFnRixDQUFDO0FBQ2hJLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQUU3RSxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLDJCQUEyQjtJQUMzQix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLDRCQUE0QjtJQUM1Qix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLDhCQUE4QjtDQUMvQixDQUFDO0FBOENGLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFyRDdCLDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDRCQUE0QjtRQUM1Qix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLDhCQUE4QixhQUs1QixVQUFVO1FBQ1YsWUFBWTtRQUNaLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixTQUFTO1FBQ1QsYUFBYTtRQUNiLFlBQVk7UUFDWixZQUFZO1FBQ1osZUFBZTtRQUNmLG1CQUFtQixhQXRCckIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUN2Qiw0QkFBNEI7UUFDNUIsOEJBQThCO2dIQStDbkIsa0JBQWtCLGFBN0JsQjtRQUNULG9CQUFvQixDQUE2QjtZQUMvQyxhQUFhLEVBQUU7Z0JBQ2IsbUNBQW1DLEVBQUU7b0JBQ25DLFNBQVMsRUFBRSwyQkFBMkI7aUJBQ3ZDO2dCQUNELGlDQUFpQyxFQUFFO29CQUNqQyxTQUFTLEVBQUUseUJBQXlCO29CQUNwQyxJQUFJLEVBQUU7d0JBQ0osZUFBZSxFQUFFLElBQUk7cUJBQ3RCO2lCQUNGO2dCQUNELGtDQUFrQyxFQUFFO29CQUNsQyxTQUFTLEVBQUUsMEJBQTBCO2lCQUN0QztnQkFDRCxvQ0FBb0MsRUFBRTtvQkFDcEMsU0FBUyxFQUFFLDRCQUE0QjtpQkFDeEM7YUFDRjtZQUNELFFBQVEsRUFBRTtnQkFDUixtQkFBbUIsRUFBRSxLQUFLO2FBQzNCO1NBQ0YsQ0FBQztRQUVGLG9CQUFvQixDQUFDLHNDQUFzQyxDQUFDO0tBQzdELFlBdENDLFVBQVU7UUFDVixZQUFZO1FBQ1osVUFBVTtRQUNWLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLFNBQVM7UUFDVCxhQUFhO1FBQ2IsWUFBWTtRQUNaLFlBQVk7UUFDWixlQUFlO1FBQ2YsbUJBQW1COzJGQStCVixrQkFBa0I7a0JBNUM5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixTQUFTO3dCQUNULGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQTZCOzRCQUMvQyxhQUFhLEVBQUU7Z0NBQ2IsbUNBQW1DLEVBQUU7b0NBQ25DLFNBQVMsRUFBRSwyQkFBMkI7aUNBQ3ZDO2dDQUNELGlDQUFpQyxFQUFFO29DQUNqQyxTQUFTLEVBQUUseUJBQXlCO29DQUNwQyxJQUFJLEVBQUU7d0NBQ0osZUFBZSxFQUFFLElBQUk7cUNBQ3RCO2lDQUNGO2dDQUNELGtDQUFrQyxFQUFFO29DQUNsQyxTQUFTLEVBQUUsMEJBQTBCO2lDQUN0QztnQ0FDRCxvQ0FBb0MsRUFBRTtvQ0FDcEMsU0FBUyxFQUFFLDRCQUE0QjtpQ0FDeEM7NkJBQ0Y7NEJBQ0QsUUFBUSxFQUFFO2dDQUNSLG1CQUFtQixFQUFFLEtBQUs7NkJBQzNCO3lCQUNGLENBQUM7d0JBRUYsb0JBQW9CLENBQUMsc0NBQXNDLENBQUM7cUJBQzdEO29CQUNELFlBQVksRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ25DLE9BQU8sRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWRkVG9DYXJ0TW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9hZGQtdG8tY2FydCc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEZlYXR1cmVzQ29uZmlnLFxuICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhcmRNb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIE91dGxldE1vZHVsZSxcbiAgUHJvbW90aW9uc01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9yZGVyRGV0YWlsQWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLWFjdGlvbnMvb3JkZXItZGV0YWlsLWFjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnNpZ25tZW50VHJhY2tpbmdDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1pdGVtcy9jb25zaWdubWVudC10cmFja2luZy9jb25zaWdubWVudC10cmFja2luZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhY2tpbmdFdmVudHNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1pdGVtcy9jb25zaWdubWVudC10cmFja2luZy90cmFja2luZy1ldmVudHMvdHJhY2tpbmctZXZlbnRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWZhdWx0Q29uc2lnbm1lbnRUcmFja2luZ0xheW91dENvbmZpZyB9IGZyb20gJy4vb3JkZXItZGV0YWlsLWl0ZW1zL2RlZmF1bHQtY29uc2lnbm1lbnQtdHJhY2tpbmctbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBPcmRlckNvbnNpZ25lZEVudHJpZXNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1pdGVtcy9vcmRlci1jb25zaWduZWQtZW50cmllcy9vcmRlci1jb25zaWduZWQtZW50cmllcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLWl0ZW1zL29yZGVyLWRldGFpbC1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxTaGlwcGluZ0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLXNoaXBwaW5nL29yZGVyLWRldGFpbC1zaGlwcGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC10b3RhbHMvb3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJPdmVydmlld01vZHVsZSB9IGZyb20gJy4vb3JkZXItb3ZlcnZpZXcvb3JkZXItb3ZlcnZpZXcubW9kdWxlJztcblxuY29uc3QgbW9kdWxlQ29tcG9uZW50cyA9IFtcbiAgT3JkZXJEZXRhaWxBY3Rpb25zQ29tcG9uZW50LFxuICBPcmRlckRldGFpbEl0ZW1zQ29tcG9uZW50LFxuICBPcmRlckRldGFpbFRvdGFsc0NvbXBvbmVudCxcbiAgT3JkZXJEZXRhaWxTaGlwcGluZ0NvbXBvbmVudCxcbiAgVHJhY2tpbmdFdmVudHNDb21wb25lbnQsXG4gIENvbnNpZ25tZW50VHJhY2tpbmdDb21wb25lbnQsXG4gIE9yZGVyQ29uc2lnbmVkRW50cmllc0NvbXBvbmVudCxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYXJkTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICAgIFByb21vdGlvbnNNb2R1bGUsXG4gICAgT3JkZXJPdmVydmlld01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICAgIEFkZFRvQ2FydE1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnIHwgRmVhdHVyZXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzQWN0aW9uc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJEZXRhaWxBY3Rpb25zQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZW5hYmxlQWRkVG9DYXJ0OiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNUb3RhbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsVG90YWxzQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzU2hpcHBpbmdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsU2hpcHBpbmdDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZmVhdHVyZXM6IHtcbiAgICAgICAgY29uc2lnbm1lbnRUcmFja2luZzogJzEuMicsXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENvbnNpZ25tZW50VHJhY2tpbmdMYXlvdXRDb25maWcpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5tb2R1bGVDb21wb25lbnRzXSxcbiAgZXhwb3J0czogWy4uLm1vZHVsZUNvbXBvbmVudHNdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckRldGFpbHNNb2R1bGUge31cbiJdfQ==