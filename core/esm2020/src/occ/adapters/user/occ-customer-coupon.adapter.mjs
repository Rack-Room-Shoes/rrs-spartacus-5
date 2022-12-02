/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER } from '../../../user/connectors/customer-coupon/converters';
import { OCC_USER_ID_ANONYMOUS } from '../../utils/occ-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccCustomerCouponAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    getCustomerCoupons(userId, pageSize, currentPage, sort) {
        // Currently OCC only supports calls for customer coupons in case of logged users
        if (userId === OCC_USER_ID_ANONYMOUS) {
            return of({});
        }
        const url = this.occEndpoints.buildUrl('customerCoupons', {
            urlParams: { userId },
        });
        let params = new HttpParams().set('sort', sort ? sort : 'startDate:asc');
        if (pageSize) {
            params = params.set('pageSize', pageSize.toString());
        }
        if (currentPage) {
            params = params.set('currentPage', currentPage.toString());
        }
        const headers = this.newHttpHeader();
        return this.http
            .get(url, { headers, params })
            .pipe(this.converter.pipeable(CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER));
    }
    turnOffNotification(userId, couponCode) {
        const url = this.occEndpoints.buildUrl('couponNotification', {
            urlParams: { userId, couponCode },
        });
        const headers = this.newHttpHeader();
        return this.http.delete(url, { headers });
    }
    turnOnNotification(userId, couponCode) {
        const url = this.occEndpoints.buildUrl('couponNotification', {
            urlParams: { userId, couponCode },
        });
        const headers = this.newHttpHeader();
        return this.http.post(url, { headers });
    }
    claimCustomerCoupon(userId, couponCode) {
        const url = this.occEndpoints.buildUrl('claimCoupon', {
            urlParams: { userId, couponCode },
        });
        const headers = this.newHttpHeader();
        return this.http.post(url, { headers });
    }
    newHttpHeader() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }
}
OccCustomerCouponAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCustomerCouponAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCustomerCouponAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCustomerCouponAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCustomerCouponAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWN1c3RvbWVyLWNvdXBvbi5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL2FkYXB0ZXJzL3VzZXIvb2NjLWN1c3RvbWVyLWNvdXBvbi5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU10QyxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUsvRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFHbEUsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFSixrQkFBa0IsQ0FDaEIsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLFdBQW9CLEVBQ3BCLElBQWE7UUFFYixpRkFBaUY7UUFDakYsSUFBSSxNQUFNLEtBQUsscUJBQXFCLEVBQUU7WUFDcEMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZjtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRTtTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXpFLElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDNUQ7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBaUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQWMsRUFBRSxVQUFrQjtRQUNwRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUMzRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO1NBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGtCQUFrQixDQUNoQixNQUFjLEVBQ2QsVUFBa0I7UUFFbEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7WUFDM0QsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRTtTQUNsQyxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsTUFBYyxFQUNkLFVBQWtCO1FBRWxCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUNwRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO1NBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLGFBQWE7UUFDbkIsT0FBTyxJQUFJLFdBQVcsQ0FBQztZQUNyQixjQUFjLEVBQUUsa0JBQWtCO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7O3FIQTNFVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQ3VzdG9tZXJDb3Vwb24yQ3VzdG9tZXIsXG4gIEN1c3RvbWVyQ291cG9uTm90aWZpY2F0aW9uLFxuICBDdXN0b21lckNvdXBvblNlYXJjaFJlc3VsdCxcbn0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvY3VzdG9tZXItY291cG9uLm1vZGVsJztcbmltcG9ydCB7IENVU1RPTUVSX0NPVVBPTl9TRUFSQ0hfUkVTVUxUX05PUk1BTElaRVIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvY3VzdG9tZXItY291cG9uL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ3VzdG9tZXJDb3Vwb25BZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXNlci9jb25uZWN0b3JzL2N1c3RvbWVyLWNvdXBvbi9jdXN0b21lci1jb3Vwb24uYWRhcHRlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPY2MgfSBmcm9tICcuLi8uLi9vY2MtbW9kZWxzL29jYy5tb2RlbHMnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5pbXBvcnQgeyBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgfSBmcm9tICcuLi8uLi91dGlscy9vY2MtY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY0N1c3RvbWVyQ291cG9uQWRhcHRlciBpbXBsZW1lbnRzIEN1c3RvbWVyQ291cG9uQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgZ2V0Q3VzdG9tZXJDb3Vwb25zKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgY3VycmVudFBhZ2U/OiBudW1iZXIsXG4gICAgc29ydD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEN1c3RvbWVyQ291cG9uU2VhcmNoUmVzdWx0PiB7XG4gICAgLy8gQ3VycmVudGx5IE9DQyBvbmx5IHN1cHBvcnRzIGNhbGxzIGZvciBjdXN0b21lciBjb3Vwb25zIGluIGNhc2Ugb2YgbG9nZ2VkIHVzZXJzXG4gICAgaWYgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTKSB7XG4gICAgICByZXR1cm4gb2Yoe30pO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdjdXN0b21lckNvdXBvbnMnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkIH0sXG4gICAgfSk7XG5cbiAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ3NvcnQnLCBzb3J0ID8gc29ydCA6ICdzdGFydERhdGU6YXNjJyk7XG5cbiAgICBpZiAocGFnZVNpemUpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ3BhZ2VTaXplJywgcGFnZVNpemUudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGlmIChjdXJyZW50UGFnZSkge1xuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgnY3VycmVudFBhZ2UnLCBjdXJyZW50UGFnZS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5uZXdIdHRwSGVhZGVyKCk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE9jYy5DdXN0b21lckNvdXBvblNlYXJjaFJlc3VsdD4odXJsLCB7IGhlYWRlcnMsIHBhcmFtcyB9KVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoQ1VTVE9NRVJfQ09VUE9OX1NFQVJDSF9SRVNVTFRfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgdHVybk9mZk5vdGlmaWNhdGlvbih1c2VySWQ6IHN0cmluZywgY291cG9uQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdjb3Vwb25Ob3RpZmljYXRpb24nLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCBjb3Vwb25Db2RlIH0sXG4gICAgfSk7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXMubmV3SHR0cEhlYWRlcigpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodXJsLCB7IGhlYWRlcnMgfSk7XG4gIH1cblxuICB0dXJuT25Ob3RpZmljYXRpb24oXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY291cG9uQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q3VzdG9tZXJDb3Vwb25Ob3RpZmljYXRpb24+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnY291cG9uTm90aWZpY2F0aW9uJywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgY291cG9uQ29kZSB9LFxuICAgIH0pO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLm5ld0h0dHBIZWFkZXIoKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIHsgaGVhZGVycyB9KTtcbiAgfVxuXG4gIGNsYWltQ3VzdG9tZXJDb3Vwb24oXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY291cG9uQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q3VzdG9tZXJDb3Vwb24yQ3VzdG9tZXI+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnY2xhaW1Db3Vwb24nLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCBjb3Vwb25Db2RlIH0sXG4gICAgfSk7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXMubmV3SHR0cEhlYWRlcigpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgeyBoZWFkZXJzIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXdIdHRwSGVhZGVyKCkge1xuICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9KTtcbiAgfVxufVxuIl19