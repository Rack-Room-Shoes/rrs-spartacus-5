/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OrderDetailsOrderEntriesContextToken } from '@spartacus/order/root';
import { OrderCancellationModule, OrderReturnModule, } from './amend-order/index';
import { OrderConfirmationModule } from './order-confirmation/order-confirmation.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsOrderEntriesContext } from './page-context/order-details-order-entries.context';
import { ReplenishmentOrderDetailsModule } from './replenishment-order-details/replenishment-order-details.module';
import { ReplenishmentOrderHistoryModule } from './replenishment-order-history/replenishment-order-history.module';
import { ReturnRequestDetailModule } from './return-request-detail/return-request-detail.module';
import { ReturnRequestListModule } from './return-request-list/order-return-request-list.module';
import * as i0 from "@angular/core";
export class OrderComponentsModule {
}
OrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule] });
OrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, providers: [
        {
            provide: OrderDetailsOrderEntriesContextToken,
            useExisting: OrderDetailsOrderEntriesContext,
        },
    ], imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrderHistoryModule,
                        OrderDetailsModule,
                        ReplenishmentOrderDetailsModule,
                        OrderCancellationModule,
                        OrderReturnModule,
                        ReplenishmentOrderHistoryModule,
                        ReturnRequestListModule,
                        ReturnRequestDetailModule,
                        OrderConfirmationModule,
                    ],
                    providers: [
                        {
                            provide: OrderDetailsOrderEntriesContextToken,
                            useExisting: OrderDetailsOrderEntriesContext,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixHQUNsQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ25ILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ25ILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDOztBQXFCakcsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLFlBakI5QixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHVCQUF1QjttSEFTZCxxQkFBcUIsYUFQckI7UUFDVDtZQUNFLE9BQU8sRUFBRSxvQ0FBb0M7WUFDN0MsV0FBVyxFQUFFLCtCQUErQjtTQUM3QztLQUNGLFlBZkMsa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQiwrQkFBK0I7UUFDL0IsdUJBQXVCO1FBQ3ZCLGlCQUFpQjtRQUNqQiwrQkFBK0I7UUFDL0IsdUJBQXVCO1FBQ3ZCLHlCQUF5QjtRQUN6Qix1QkFBdUI7MkZBU2QscUJBQXFCO2tCQW5CakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLCtCQUErQjt3QkFDL0IsdUJBQXVCO3dCQUN2QixpQkFBaUI7d0JBQ2pCLCtCQUErQjt3QkFDL0IsdUJBQXVCO3dCQUN2Qix5QkFBeUI7d0JBQ3pCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxvQ0FBb0M7NEJBQzdDLFdBQVcsRUFBRSwrQkFBK0I7eUJBQzdDO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHRUb2tlbiB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQge1xuICBPcmRlckNhbmNlbGxhdGlvbk1vZHVsZSxcbiAgT3JkZXJSZXR1cm5Nb2R1bGUsXG59IGZyb20gJy4vYW1lbmQtb3JkZXIvaW5kZXgnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25Nb2R1bGUgfSBmcm9tICcuL29yZGVyLWNvbmZpcm1hdGlvbi9vcmRlci1jb25maXJtYXRpb24ubW9kdWxlJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsc01vZHVsZSB9IGZyb20gJy4vb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlckhpc3RvcnlNb2R1bGUgfSBmcm9tICcuL29yZGVyLWhpc3Rvcnkvb3JkZXItaGlzdG9yeS5tb2R1bGUnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dCB9IGZyb20gJy4vcGFnZS1jb250ZXh0L29yZGVyLWRldGFpbHMtb3JkZXItZW50cmllcy5jb250ZXh0JztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNNb2R1bGUgfSBmcm9tICcuL3JlcGxlbmlzaG1lbnQtb3JkZXItZGV0YWlscy9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMubW9kdWxlJztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlNb2R1bGUgfSBmcm9tICcuL3JlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS9yZXBsZW5pc2htZW50LW9yZGVyLWhpc3RvcnkubW9kdWxlJztcbmltcG9ydCB7IFJldHVyblJlcXVlc3REZXRhaWxNb2R1bGUgfSBmcm9tICcuL3JldHVybi1yZXF1ZXN0LWRldGFpbC9yZXR1cm4tcmVxdWVzdC1kZXRhaWwubW9kdWxlJztcbmltcG9ydCB7IFJldHVyblJlcXVlc3RMaXN0TW9kdWxlIH0gZnJvbSAnLi9yZXR1cm4tcmVxdWVzdC1saXN0L29yZGVyLXJldHVybi1yZXF1ZXN0LWxpc3QubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE9yZGVySGlzdG9yeU1vZHVsZSxcbiAgICBPcmRlckRldGFpbHNNb2R1bGUsXG4gICAgUmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc01vZHVsZSxcbiAgICBPcmRlckNhbmNlbGxhdGlvbk1vZHVsZSxcbiAgICBPcmRlclJldHVybk1vZHVsZSxcbiAgICBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5TW9kdWxlLFxuICAgIFJldHVyblJlcXVlc3RMaXN0TW9kdWxlLFxuICAgIFJldHVyblJlcXVlc3REZXRhaWxNb2R1bGUsXG4gICAgT3JkZXJDb25maXJtYXRpb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgIHVzZUV4aXN0aW5nOiBPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0LFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ29tcG9uZW50c01vZHVsZSB7fVxuIl19