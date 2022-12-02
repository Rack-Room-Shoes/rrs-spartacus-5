/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADDRESS_NORMALIZER, ADDRESS_SERIALIZER, backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutDeliveryAddressAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    createAddress(userId, cartId, address) {
        address = this.converter.convert(address, ADDRESS_SERIALIZER);
        return this.http
            .post(this.getCreateDeliveryAddressEndpoint(userId, cartId), address, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(ADDRESS_NORMALIZER));
    }
    getCreateDeliveryAddressEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('createDeliveryAddress', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
    setAddress(userId, cartId, addressId) {
        return this.http
            .put(this.getSetDeliveryAddressEndpoint(userId, cartId, addressId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetDeliveryAddressEndpoint(userId, cartId, addressId) {
        return this.occEndpoints.buildUrl('setDeliveryAddress', {
            urlParams: { userId, cartId },
            queryParams: { addressId },
        });
    }
    clearCheckoutDeliveryAddress(userId, cartId) {
        return this.http
            .delete(this.getRemoveDeliveryAddressEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getRemoveDeliveryAddressEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('removeDeliveryAddress', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
}
OccCheckoutDeliveryAddressAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutDeliveryAddressAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL29jYy9hZGFwdGVycy9vY2MtY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixPQUFPLEVBRVAsV0FBVyxFQUNYLGtCQUFrQixHQUduQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzVDLE1BQU0sT0FBTyxpQ0FBaUM7SUFHNUMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUNwQyxDQUFDO0lBRUcsYUFBYSxDQUNsQixNQUFjLEVBQ2QsTUFBYyxFQUNkLE9BQWdCO1FBRWhCLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUU5RCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUNILElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQ3JELE9BQU8sRUFDUDtZQUNFLE9BQU8sRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7U0FDbkUsQ0FDRjthQUNBLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsRUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUM1QyxDQUFDO0lBQ04sQ0FBQztJQUVTLGdDQUFnQyxDQUN4QyxNQUFjLEVBQ2QsTUFBYztRQUVkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDekQsU0FBUyxFQUFFO2dCQUNULE1BQU07Z0JBQ04sTUFBTTthQUNQO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFVBQVUsQ0FDZixNQUFjLEVBQ2QsTUFBYyxFQUNkLFNBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQ0YsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQzdELEVBQUUsQ0FDSDthQUNBLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVTLDZCQUE2QixDQUNyQyxNQUFjLEVBQ2QsTUFBYyxFQUNkLFNBQWtCO1FBRWxCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7WUFDdEQsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtZQUM3QixXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRCQUE0QixDQUMxQixNQUFjLEVBQ2QsTUFBYztRQUVkLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixNQUFNLENBQVUsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN0RSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxPQUFPLENBQUM7WUFDTixXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFUyxnQ0FBZ0MsQ0FDeEMsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ3pELFNBQVMsRUFBRTtnQkFDVCxNQUFNO2dCQUNOLE1BQU07YUFDUDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7OzhIQWxHVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQUQ3QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0FkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBBZGRyZXNzLFxuICBBRERSRVNTX05PUk1BTElaRVIsXG4gIEFERFJFU1NfU0VSSUFMSVpFUixcbiAgYmFja09mZixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgaXNKYWxvRXJyb3IsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY0NoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQWRhcHRlclxuICBpbXBsZW1lbnRzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQWRhcHRlclxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGVBZGRyZXNzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGFkZHJlc3M6IEFkZHJlc3NcbiAgKTogT2JzZXJ2YWJsZTxBZGRyZXNzPiB7XG4gICAgYWRkcmVzcyA9IHRoaXMuY29udmVydGVyLmNvbnZlcnQoYWRkcmVzcywgQUREUkVTU19TRVJJQUxJWkVSKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0PE9jYy5BZGRyZXNzPihcbiAgICAgICAgdGhpcy5nZXRDcmVhdGVEZWxpdmVyeUFkZHJlc3NFbmRwb2ludCh1c2VySWQsIGNhcnRJZCksXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyksXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKSksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKEFERFJFU1NfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q3JlYXRlRGVsaXZlcnlBZGRyZXNzRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ2NyZWF0ZURlbGl2ZXJ5QWRkcmVzcycsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0QWRkcmVzcyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBhZGRyZXNzSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucHV0PHVua25vd24+KFxuICAgICAgICB0aGlzLmdldFNldERlbGl2ZXJ5QWRkcmVzc0VuZHBvaW50KHVzZXJJZCwgY2FydElkLCBhZGRyZXNzSWQpLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgICAgYmFja09mZih7XG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZXREZWxpdmVyeUFkZHJlc3NFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBhZGRyZXNzSWQ/OiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3NldERlbGl2ZXJ5QWRkcmVzcycsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQsIGNhcnRJZCB9LFxuICAgICAgcXVlcnlQYXJhbXM6IHsgYWRkcmVzc0lkIH0sXG4gICAgfSk7XG4gIH1cblxuICBjbGVhckNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5kZWxldGU8dW5rbm93bj4odGhpcy5nZXRSZW1vdmVEZWxpdmVyeUFkZHJlc3NFbmRwb2ludCh1c2VySWQsIGNhcnRJZCkpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSkpLFxuICAgICAgICBiYWNrT2ZmKHtcbiAgICAgICAgICBzaG91bGRSZXRyeTogaXNKYWxvRXJyb3IsXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFJlbW92ZURlbGl2ZXJ5QWRkcmVzc0VuZHBvaW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdyZW1vdmVEZWxpdmVyeUFkZHJlc3MnLCB7XG4gICAgICB1cmxQYXJhbXM6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjYXJ0SWQsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=