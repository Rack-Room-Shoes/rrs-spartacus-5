/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { OrderFacade, OrderHistoryFacade, OrderReturnRequestFacade, ReplenishmentOrderHistoryFacade, ScheduledReplenishmentOrderFacade, } from '@spartacus/order/root';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import { OrderService } from './order.service';
import { ReplenishmentOrderHistoryService } from './replenishment-order-history.service';
import { ScheduledReplenishmentOrderService } from './scheduled-replenishment-order.service';
export const facadeProviders = [
    OrderReturnRequestService,
    {
        provide: OrderReturnRequestFacade,
        useExisting: OrderReturnRequestService,
    },
    OrderHistoryService,
    {
        provide: OrderHistoryFacade,
        useExisting: OrderHistoryService,
    },
    ReplenishmentOrderHistoryService,
    {
        provide: ReplenishmentOrderHistoryFacade,
        useExisting: ReplenishmentOrderHistoryService,
    },
    ScheduledReplenishmentOrderService,
    {
        provide: ScheduledReplenishmentOrderFacade,
        useExisting: ScheduledReplenishmentOrderService,
    },
    OrderService,
    {
        provide: OrderFacade,
        useExisting: OrderService,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjYWRlLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb3JlL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQ0wsV0FBVyxFQUNYLGtCQUFrQixFQUNsQix3QkFBd0IsRUFDeEIsK0JBQStCLEVBQy9CLGlDQUFpQyxHQUNsQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWU7SUFDekMseUJBQXlCO0lBQ3pCO1FBQ0UsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxXQUFXLEVBQUUseUJBQXlCO0tBQ3ZDO0lBQ0QsbUJBQW1CO0lBQ25CO1FBQ0UsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixXQUFXLEVBQUUsbUJBQW1CO0tBQ2pDO0lBQ0QsZ0NBQWdDO0lBQ2hDO1FBQ0UsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxXQUFXLEVBQUUsZ0NBQWdDO0tBQzlDO0lBQ0Qsa0NBQWtDO0lBQ2xDO1FBQ0UsT0FBTyxFQUFFLGlDQUFpQztRQUMxQyxXQUFXLEVBQUUsa0NBQWtDO0tBQ2hEO0lBQ0QsWUFBWTtJQUNaO1FBQ0UsT0FBTyxFQUFFLFdBQVc7UUFDcEIsV0FBVyxFQUFFLFlBQVk7S0FDMUI7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE9yZGVyRmFjYWRlLFxuICBPcmRlckhpc3RvcnlGYWNhZGUsXG4gIE9yZGVyUmV0dXJuUmVxdWVzdEZhY2FkZSxcbiAgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUZhY2FkZSxcbiAgU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT3JkZXJIaXN0b3J5U2VydmljZSB9IGZyb20gJy4vb3JkZXItaGlzdG9yeS5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyUmV0dXJuUmVxdWVzdFNlcnZpY2UgfSBmcm9tICcuL29yZGVyLXJldHVybi1yZXF1ZXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi9vcmRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlTZXJ2aWNlIH0gZnJvbSAnLi9yZXBsZW5pc2htZW50LW9yZGVyLWhpc3Rvcnkuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IGZhY2FkZVByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtcbiAgT3JkZXJSZXR1cm5SZXF1ZXN0U2VydmljZSxcbiAge1xuICAgIHByb3ZpZGU6IE9yZGVyUmV0dXJuUmVxdWVzdEZhY2FkZSxcbiAgICB1c2VFeGlzdGluZzogT3JkZXJSZXR1cm5SZXF1ZXN0U2VydmljZSxcbiAgfSxcbiAgT3JkZXJIaXN0b3J5U2VydmljZSxcbiAge1xuICAgIHByb3ZpZGU6IE9yZGVySGlzdG9yeUZhY2FkZSxcbiAgICB1c2VFeGlzdGluZzogT3JkZXJIaXN0b3J5U2VydmljZSxcbiAgfSxcbiAgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeVNlcnZpY2UsXG4gIHtcbiAgICBwcm92aWRlOiBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5RmFjYWRlLFxuICAgIHVzZUV4aXN0aW5nOiBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5U2VydmljZSxcbiAgfSxcbiAgU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyU2VydmljZSxcbiAge1xuICAgIHByb3ZpZGU6IFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckZhY2FkZSxcbiAgICB1c2VFeGlzdGluZzogU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyU2VydmljZSxcbiAgfSxcbiAgT3JkZXJTZXJ2aWNlLFxuICB7XG4gICAgcHJvdmlkZTogT3JkZXJGYWNhZGUsXG4gICAgdXNlRXhpc3Rpbmc6IE9yZGVyU2VydmljZSxcbiAgfSxcbl07XG4iXX0=