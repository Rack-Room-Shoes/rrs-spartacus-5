/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CART_MODIFICATION_NORMALIZER, } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCartEntryAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    add(userId, cartId, productCode, quantity = 1) {
        const url = this.occEndpointsService.buildUrl('addEntries', {
            urlParams: { userId, cartId, quantity },
        });
        // Handle b2b case where the x-www-form-urlencoded is still used
        if (url.includes(`quantity=${quantity}`)) {
            const httpHeaders = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            });
            return this.http
                .post(url, {}, { headers: httpHeaders, params: { code: productCode } })
                .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
        }
        const toAdd = {
            quantity,
            product: { code: productCode },
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post(url, toAdd, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    update(userId, cartId, entryNumber, qty, pickupStore) {
        let params = {};
        if (pickupStore) {
            params = {
                deliveryPointOfService: {
                    name: pickupStore,
                },
            };
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = this.occEndpointsService.buildUrl('updateEntries', {
            urlParams: {
                userId,
                cartId,
                entryNumber,
            },
        });
        return this.http
            .patch(url, { quantity: qty, ...params }, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    remove(userId, cartId, entryNumber) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const url = this.occEndpointsService.buildUrl('removeEntries', {
            urlParams: {
                userId,
                cartId,
                entryNumber,
            },
        });
        return this.http.delete(url, { headers });
    }
}
OccCartEntryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCartEntryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartEntryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCartEntryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCartEntryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNhcnQtZW50cnkuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvb2NjL2FkYXB0ZXJzL29jYy1jYXJ0LWVudHJ5LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCw0QkFBNEIsR0FDN0IsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQUtuQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ1ksSUFBZ0IsRUFDaEIsbUJBQXdDLEVBQ3hDLGdCQUFrQztRQUZsQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUMzQyxDQUFDO0lBRUcsR0FBRyxDQUNSLE1BQWMsRUFDZCxNQUFjLEVBQ2QsV0FBbUIsRUFDbkIsV0FBbUIsQ0FBQztRQUVwQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUMxRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtTQUN4QyxDQUFDLENBQUM7UUFFSCxnRUFBZ0U7UUFDaEUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksUUFBUSxFQUFFLENBQUMsRUFBRTtZQUN4QyxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDbEMsY0FBYyxFQUFFLG1DQUFtQzthQUNwRCxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQyxJQUFJO2lCQUNiLElBQUksQ0FDSCxHQUFHLEVBQ0gsRUFBRSxFQUNGLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FDeEQ7aUJBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsTUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRO1lBQ1IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtTQUMvQixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDOUIsY0FBYyxFQUFFLGtCQUFrQjtTQUNuQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUFtQixHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxNQUFNLENBQ1gsTUFBYyxFQUNkLE1BQWMsRUFDZCxXQUFtQixFQUNuQixHQUFXLEVBQ1gsV0FBb0I7UUFFcEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksV0FBVyxFQUFFO1lBQ2YsTUFBTSxHQUFHO2dCQUNQLHNCQUFzQixFQUFFO29CQUN0QixJQUFJLEVBQUUsV0FBVztpQkFDbEI7YUFDRixDQUFDO1NBQ0g7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUM5QixjQUFjLEVBQUUsa0JBQWtCO1NBQ25DLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQzdELFNBQVMsRUFBRTtnQkFDVCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sV0FBVzthQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEtBQUssQ0FBbUIsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUM7YUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxNQUFNLENBQ1gsTUFBYyxFQUNkLE1BQWMsRUFDZCxXQUFtQjtRQUVuQixNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUM5QixjQUFjLEVBQUUsbUNBQW1DO1NBQ3BELENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQzdELFNBQVMsRUFBRTtnQkFDVCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sV0FBVzthQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7O2dIQWpHVSxtQkFBbUI7b0hBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJ0RW50cnlBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBDYXJ0TW9kaWZpY2F0aW9uLFxuICBDQVJUX01PRElGSUNBVElPTl9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UsIE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2NjQ2FydEVudHJ5QWRhcHRlciBpbXBsZW1lbnRzIENhcnRFbnRyeUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzU2VydmljZTogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIGFkZChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHF1YW50aXR5OiBudW1iZXIgPSAxXG4gICk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybCgnYWRkRW50cmllcycsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQsIGNhcnRJZCwgcXVhbnRpdHkgfSxcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBiMmIgY2FzZSB3aGVyZSB0aGUgeC13d3ctZm9ybS11cmxlbmNvZGVkIGlzIHN0aWxsIHVzZWRcbiAgICBpZiAodXJsLmluY2x1ZGVzKGBxdWFudGl0eT0ke3F1YW50aXR5fWApKSB7XG4gICAgICBjb25zdCBodHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgIC5wb3N0PENhcnRNb2RpZmljYXRpb24+KFxuICAgICAgICAgIHVybCxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICB7IGhlYWRlcnM6IGh0dHBIZWFkZXJzLCBwYXJhbXM6IHsgY29kZTogcHJvZHVjdENvZGUgfSB9XG4gICAgICAgIClcbiAgICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENBUlRfTU9ESUZJQ0FUSU9OX05PUk1BTElaRVIpKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b0FkZCA9IHtcbiAgICAgIHF1YW50aXR5LFxuICAgICAgcHJvZHVjdDogeyBjb2RlOiBwcm9kdWN0Q29kZSB9LFxuICAgIH07XG5cbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdDxDYXJ0TW9kaWZpY2F0aW9uPih1cmwsIHRvQWRkLCB7IGhlYWRlcnMgfSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShDQVJUX01PRElGSUNBVElPTl9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGVudHJ5TnVtYmVyOiBzdHJpbmcsXG4gICAgcXR5OiBudW1iZXIsXG4gICAgcGlja3VwU3RvcmU/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0TW9kaWZpY2F0aW9uPiB7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgIGlmIChwaWNrdXBTdG9yZSkge1xuICAgICAgcGFyYW1zID0ge1xuICAgICAgICBkZWxpdmVyeVBvaW50T2ZTZXJ2aWNlOiB7XG4gICAgICAgICAgbmFtZTogcGlja3VwU3RvcmUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybCgndXBkYXRlRW50cmllcycsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgICAgZW50cnlOdW1iZXIsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBhdGNoPENhcnRNb2RpZmljYXRpb24+KHVybCwgeyBxdWFudGl0eTogcXR5LCAuLi5wYXJhbXMgfSwgeyBoZWFkZXJzIH0pXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ0FSVF9NT0RJRklDQVRJT05fTk9STUFMSVpFUikpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBlbnRyeU51bWJlcjogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50c1NlcnZpY2UuYnVpbGRVcmwoJ3JlbW92ZUVudHJpZXMnLCB7XG4gICAgICB1cmxQYXJhbXM6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjYXJ0SWQsXG4gICAgICAgIGVudHJ5TnVtYmVyLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCwgeyBoZWFkZXJzIH0pO1xuICB9XG59XG4iXX0=