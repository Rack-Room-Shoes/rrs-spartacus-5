/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./customer-coupon.adapter";
export class CustomerCouponConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getCustomerCoupons(userId, pageSize, currentPage, sort) {
        return this.adapter.getCustomerCoupons(userId, pageSize, currentPage, sort);
    }
    turnOnNotification(userId, couponCode) {
        return this.adapter.turnOnNotification(userId, couponCode);
    }
    turnOffNotification(userId, couponCode) {
        return this.adapter.turnOffNotification(userId, couponCode);
    }
    claimCustomerCoupon(userId, couponCode) {
        return this.adapter.claimCustomerCoupon(userId, couponCode);
    }
}
CustomerCouponConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerCouponConnector, deps: [{ token: i1.CustomerCouponAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerCouponConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerCouponConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerCouponConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CustomerCouponAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItY291cG9uLmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3VzZXIvY29ubmVjdG9ycy9jdXN0b21lci1jb3Vwb24vY3VzdG9tZXItY291cG9uLmNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBWTNDLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBc0IsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7SUFBRyxDQUFDO0lBRXhELGtCQUFrQixDQUNoQixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsV0FBb0IsRUFDcEIsSUFBYTtRQUViLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsa0JBQWtCLENBQ2hCLE1BQWMsRUFDZCxVQUFrQjtRQUVsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsVUFBa0I7UUFDcEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLE1BQWMsRUFDZCxVQUFrQjtRQUVsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7O29IQTVCVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQUZ0QixNQUFNOzJGQUVQLHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDdXN0b21lckNvdXBvbjJDdXN0b21lcixcbiAgQ3VzdG9tZXJDb3Vwb25Ob3RpZmljYXRpb24sXG4gIEN1c3RvbWVyQ291cG9uU2VhcmNoUmVzdWx0LFxufSBmcm9tICcuLi8uLi8uLi9tb2RlbC9jdXN0b21lci1jb3Vwb24ubW9kZWwnO1xuaW1wb3J0IHsgQ3VzdG9tZXJDb3Vwb25BZGFwdGVyIH0gZnJvbSAnLi9jdXN0b21lci1jb3Vwb24uYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lckNvdXBvbkNvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBDdXN0b21lckNvdXBvbkFkYXB0ZXIpIHt9XG5cbiAgZ2V0Q3VzdG9tZXJDb3Vwb25zKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgY3VycmVudFBhZ2U/OiBudW1iZXIsXG4gICAgc29ydD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEN1c3RvbWVyQ291cG9uU2VhcmNoUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXRDdXN0b21lckNvdXBvbnModXNlcklkLCBwYWdlU2l6ZSwgY3VycmVudFBhZ2UsIHNvcnQpO1xuICB9XG5cbiAgdHVybk9uTm90aWZpY2F0aW9uKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNvdXBvbkNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEN1c3RvbWVyQ291cG9uTm90aWZpY2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci50dXJuT25Ob3RpZmljYXRpb24odXNlcklkLCBjb3Vwb25Db2RlKTtcbiAgfVxuXG4gIHR1cm5PZmZOb3RpZmljYXRpb24odXNlcklkOiBzdHJpbmcsIGNvdXBvbkNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8e30+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnR1cm5PZmZOb3RpZmljYXRpb24odXNlcklkLCBjb3Vwb25Db2RlKTtcbiAgfVxuXG4gIGNsYWltQ3VzdG9tZXJDb3Vwb24oXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY291cG9uQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q3VzdG9tZXJDb3Vwb24yQ3VzdG9tZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmNsYWltQ3VzdG9tZXJDb3Vwb24odXNlcklkLCBjb3Vwb25Db2RlKTtcbiAgfVxufVxuIl19