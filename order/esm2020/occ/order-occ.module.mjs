/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderAdapter, OrderHistoryAdapter, ReplenishmentOrderHistoryAdapter, ScheduledReplenishmentOrderAdapter, } from '@spartacus/order/core';
import { ORDER_NORMALIZER, ORDER_RETURN_REQUEST_NORMALIZER, REPLENISHMENT_ORDER_FORM_SERIALIZER, REPLENISHMENT_ORDER_NORMALIZER, } from '@spartacus/order/root';
import { OccOrderNormalizer } from './adapters/converters/occ-order-normalizer';
import { OccReplenishmentOrderNormalizer } from './adapters/converters/occ-replenishment-order-normalizer';
import { OccReturnRequestNormalizer } from './adapters/converters/occ-return-request-normalizer';
import { OccScheduledReplenishmentOrderFormSerializer } from './adapters/converters/occ-scheduled-replenishment-order-form-serializer';
import { OccOrderHistoryAdapter } from './adapters/occ-order-history.adapter';
import { OccOrderAdapter } from './adapters/occ-order.adapter';
import { OccReplenishmentOrderHistoryAdapter } from './adapters/occ-replenishment-order-history.adapter';
import { OccScheduledReplenishmentOrderAdapter } from './adapters/occ-scheduled-replenishment-order.adapter';
import { defaultOccOrderConfig } from './config/default-occ-order-config';
import * as i0 from "@angular/core";
export class OrderOccModule {
}
OrderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderOccModule, imports: [CommonModule] });
OrderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOccModule, providers: [
        provideDefaultConfig(defaultOccOrderConfig),
        { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
        {
            provide: ReplenishmentOrderHistoryAdapter,
            useClass: OccReplenishmentOrderHistoryAdapter,
        },
        {
            provide: OrderAdapter,
            useClass: OccOrderAdapter,
        },
        {
            provide: ScheduledReplenishmentOrderAdapter,
            useClass: OccScheduledReplenishmentOrderAdapter,
        },
        {
            provide: ORDER_RETURN_REQUEST_NORMALIZER,
            useExisting: OccReturnRequestNormalizer,
            multi: true,
        },
        {
            provide: ORDER_NORMALIZER,
            useExisting: OccOrderNormalizer,
            multi: true,
        },
        {
            provide: REPLENISHMENT_ORDER_NORMALIZER,
            useExisting: OccReplenishmentOrderNormalizer,
            multi: true,
        },
        {
            provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
            useExisting: OccScheduledReplenishmentOrderFormSerializer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrderConfig),
                        { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
                        {
                            provide: ReplenishmentOrderHistoryAdapter,
                            useClass: OccReplenishmentOrderHistoryAdapter,
                        },
                        {
                            provide: OrderAdapter,
                            useClass: OccOrderAdapter,
                        },
                        {
                            provide: ScheduledReplenishmentOrderAdapter,
                            useClass: OccScheduledReplenishmentOrderAdapter,
                        },
                        {
                            provide: ORDER_RETURN_REQUEST_NORMALIZER,
                            useExisting: OccReturnRequestNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_NORMALIZER,
                            useExisting: OccOrderNormalizer,
                            multi: true,
                        },
                        {
                            provide: REPLENISHMENT_ORDER_NORMALIZER,
                            useExisting: OccReplenishmentOrderNormalizer,
                            multi: true,
                        },
                        {
                            provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
                            useExisting: OccScheduledReplenishmentOrderFormSerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9vY2Mvb3JkZXItb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUNMLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsZ0NBQWdDLEVBQ2hDLGtDQUFrQyxHQUNuQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsK0JBQStCLEVBQy9CLG1DQUFtQyxFQUNuQyw4QkFBOEIsR0FDL0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUMzRyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDekcsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDN0csT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBeUMxRSxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLFlBdENmLFlBQVk7NEdBc0NYLGNBQWMsYUFyQ2Q7UUFDVCxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7UUFDbEU7WUFDRSxPQUFPLEVBQUUsZ0NBQWdDO1lBQ3pDLFFBQVEsRUFBRSxtQ0FBbUM7U0FDOUM7UUFDRDtZQUNFLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxlQUFlO1NBQzFCO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLFFBQVEsRUFBRSxxQ0FBcUM7U0FDaEQ7UUFDRDtZQUNFLE9BQU8sRUFBRSwrQkFBK0I7WUFDeEMsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxXQUFXLEVBQUUsK0JBQStCO1lBQzVDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxtQ0FBbUM7WUFDNUMsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFwQ1MsWUFBWTsyRkFzQ1gsY0FBYztrQkF2QzFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMscUJBQXFCLENBQUM7d0JBQzNDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTt3QkFDbEU7NEJBQ0UsT0FBTyxFQUFFLGdDQUFnQzs0QkFDekMsUUFBUSxFQUFFLG1DQUFtQzt5QkFDOUM7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLFlBQVk7NEJBQ3JCLFFBQVEsRUFBRSxlQUFlO3lCQUMxQjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsa0NBQWtDOzRCQUMzQyxRQUFRLEVBQUUscUNBQXFDO3lCQUNoRDt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsK0JBQStCOzRCQUN4QyxXQUFXLEVBQUUsMEJBQTBCOzRCQUN2QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsZ0JBQWdCOzRCQUN6QixXQUFXLEVBQUUsa0JBQWtCOzRCQUMvQixLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsOEJBQThCOzRCQUN2QyxXQUFXLEVBQUUsK0JBQStCOzRCQUM1QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsbUNBQW1DOzRCQUM1QyxXQUFXLEVBQUUsNENBQTRDOzRCQUN6RCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JkZXJBZGFwdGVyLFxuICBPcmRlckhpc3RvcnlBZGFwdGVyLFxuICBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5QWRhcHRlcixcbiAgU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyQWRhcHRlcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9jb3JlJztcbmltcG9ydCB7XG4gIE9SREVSX05PUk1BTElaRVIsXG4gIE9SREVSX1JFVFVSTl9SRVFVRVNUX05PUk1BTElaRVIsXG4gIFJFUExFTklTSE1FTlRfT1JERVJfRk9STV9TRVJJQUxJWkVSLFxuICBSRVBMRU5JU0hNRU5UX09SREVSX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPY2NPcmRlck5vcm1hbGl6ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLW9yZGVyLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjUmVwbGVuaXNobWVudE9yZGVyTm9ybWFsaXplciB9IGZyb20gJy4vYWRhcHRlcnMvY29udmVydGVycy9vY2MtcmVwbGVuaXNobWVudC1vcmRlci1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY1JldHVyblJlcXVlc3ROb3JtYWxpemVyIH0gZnJvbSAnLi9hZGFwdGVycy9jb252ZXJ0ZXJzL29jYy1yZXR1cm4tcmVxdWVzdC1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY1NjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckZvcm1TZXJpYWxpemVyIH0gZnJvbSAnLi9hZGFwdGVycy9jb252ZXJ0ZXJzL29jYy1zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci1mb3JtLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgT2NjT3JkZXJIaXN0b3J5QWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLW9yZGVyLWhpc3RvcnkuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NPcmRlckFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1vcmRlci5hZGFwdGVyJztcbmltcG9ydCB7IE9jY1JlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtcmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5LmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLXNjaGVkdWxlZC1yZXBsZW5pc2htZW50LW9yZGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY09yZGVyQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1vY2Mtb3JkZXItY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NPcmRlckNvbmZpZyksXG4gICAgeyBwcm92aWRlOiBPcmRlckhpc3RvcnlBZGFwdGVyLCB1c2VDbGFzczogT2NjT3JkZXJIaXN0b3J5QWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY1JlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlBZGFwdGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogT3JkZXJBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY09yZGVyQWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyQWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9SREVSX1JFVFVSTl9SRVFVRVNUX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjUmV0dXJuUmVxdWVzdE5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9SREVSX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjT3JkZXJOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBSRVBMRU5JU0hNRU5UX09SREVSX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjUmVwbGVuaXNobWVudE9yZGVyTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogUkVQTEVOSVNITUVOVF9PUkRFUl9GT1JNX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyRm9ybVNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlck9jY01vZHVsZSB7fVxuIl19