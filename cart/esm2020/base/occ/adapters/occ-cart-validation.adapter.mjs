import { Injectable } from '@angular/core';
import { CART_VALIDATION_NORMALIZER, } from '@spartacus/cart/base/core';
import { normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCartValidationAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    validate(cartId, userId) {
        const url = this.occEndpoints.buildUrl('validate', {
            urlParams: { cartId, userId },
        });
        return this.http.post(url, null).pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(CART_VALIDATION_NORMALIZER));
    }
}
OccCartValidationAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCartValidationAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartValidationAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCartValidationAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCartValidationAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNhcnQtdmFsaWRhdGlvbi5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9vY2MvYWRhcHRlcnMvb2NjLWNhcnQtdmFsaWRhdGlvbi5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLDBCQUEwQixHQUMzQixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFFTCxrQkFBa0IsR0FFbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVKLFFBQVEsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUNyQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDakQsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUM5QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3hDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FDcEQsQ0FBQztJQUNKLENBQUM7O3FIQWhCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhcnRWYWxpZGF0aW9uQWRhcHRlcixcbiAgQ0FSVF9WQUxJREFUSU9OX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL2NvcmUnO1xuaW1wb3J0IHsgQ2FydE1vZGlmaWNhdGlvbkxpc3QgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NDYXJ0VmFsaWRhdGlvbkFkYXB0ZXIgaW1wbGVtZW50cyBDYXJ0VmFsaWRhdGlvbkFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHZhbGlkYXRlKGNhcnRJZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbkxpc3Q+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgndmFsaWRhdGUnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgY2FydElkLCB1c2VySWQgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHVybCwgbnVsbCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKENBUlRfVkFMSURBVElPTl9OT1JNQUxJWkVSKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==