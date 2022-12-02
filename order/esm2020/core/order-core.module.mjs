/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OrderHistoryConnector } from './connectors/order-history.connector';
import { OrderConnector } from './connectors/order.connector';
import { ReplenishmentOrderHistoryConnector } from './connectors/replenishment-order-history.connector';
import { ScheduledReplenishmentOrderConnector } from './connectors/scheduled-replenishment-order.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';
import * as i0 from "@angular/core";
export class OrderCoreModule {
}
OrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderCoreModule, imports: [OrderStoreModule] });
OrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCoreModule, providers: [
        ...facadeProviders,
        OrderHistoryConnector,
        ReplenishmentOrderHistoryConnector,
        OrderConnector,
        ScheduledReplenishmentOrderConnector,
    ], imports: [OrderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrderStoreModule],
                    providers: [
                        ...facadeProviders,
                        OrderHistoryConnector,
                        ReplenishmentOrderHistoryConnector,
                        OrderConnector,
                        ScheduledReplenishmentOrderConnector,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29yZS9vcmRlci1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDeEcsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDNUcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQVk5RCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLFlBVGhCLGdCQUFnQjs2R0FTZixlQUFlLGFBUmY7UUFDVCxHQUFHLGVBQWU7UUFDbEIscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxjQUFjO1FBQ2Qsb0NBQW9DO0tBQ3JDLFlBUFMsZ0JBQWdCOzJGQVNmLGVBQWU7a0JBVjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNCLFNBQVMsRUFBRTt3QkFDVCxHQUFHLGVBQWU7d0JBQ2xCLHFCQUFxQjt3QkFDckIsa0NBQWtDO3dCQUNsQyxjQUFjO3dCQUNkLG9DQUFvQztxQkFDckM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJIaXN0b3J5Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL29yZGVyLWhpc3RvcnkuY29ubmVjdG9yJztcbmltcG9ydCB7IE9yZGVyQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL29yZGVyLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL3JlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS5jb25uZWN0b3InO1xuaW1wb3J0IHsgU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL3NjaGVkdWxlZC1yZXBsZW5pc2htZW50LW9yZGVyLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzJztcbmltcG9ydCB7IE9yZGVyU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL29yZGVyLXN0b3JlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPcmRlclN0b3JlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uZmFjYWRlUHJvdmlkZXJzLFxuICAgIE9yZGVySGlzdG9yeUNvbm5lY3RvcixcbiAgICBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5Q29ubmVjdG9yLFxuICAgIE9yZGVyQ29ubmVjdG9yLFxuICAgIFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckNvbm5lY3RvcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDb3JlTW9kdWxlIHt9XG4iXX0=