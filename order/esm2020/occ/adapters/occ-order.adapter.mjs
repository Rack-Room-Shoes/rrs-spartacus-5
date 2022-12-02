/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backOff, InterceptorUtil, isJaloError, normalizeHttpError, OCC_USER_ID_ANONYMOUS, USE_CLIENT_TOKEN, } from '@spartacus/core';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    placeOrder(userId, cartId, termsChecked) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        if (userId === OCC_USER_ID_ANONYMOUS) {
            headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        }
        return this.http
            .post(this.getPlaceOrderEndpoint(userId, cartId, termsChecked.toString()), {}, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(ORDER_NORMALIZER));
    }
    getPlaceOrderEndpoint(userId, cartId, termsChecked) {
        return this.occEndpoints.buildUrl('placeOrder', {
            urlParams: { userId },
            queryParams: { cartId, termsChecked },
        });
    }
}
OccOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccOrderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLW9yZGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvb2NjL2FkYXB0ZXJzL29jYy1vcmRlci5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsT0FBTyxFQUVQLGVBQWUsRUFDZixXQUFXLEVBQ1gsa0JBQWtCLEVBR2xCLHFCQUFxQixFQUNyQixnQkFBZ0IsR0FDakIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQVMsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFRyxVQUFVLENBQ2YsTUFBYyxFQUNkLE1BQWMsRUFDZCxZQUFxQjtRQUVyQixJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUM1QixjQUFjLEVBQUUsbUNBQW1DO1NBQ3BELENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxLQUFLLHFCQUFxQixFQUFFO1lBQ3BDLE9BQU8sR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6RTtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQ0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQ25FLEVBQUUsRUFDRixFQUFFLE9BQU8sRUFBRSxDQUNaO2FBQ0EsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDNUQsT0FBTyxDQUFDO1lBQ04sV0FBVyxFQUFFLFdBQVc7U0FDekIsQ0FBQyxFQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQzFDLENBQUM7SUFDTixDQUFDO0lBRVMscUJBQXFCLENBQzdCLE1BQWMsRUFDZCxNQUFjLEVBQ2QsWUFBb0I7UUFFcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDOUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQ3JCLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUU7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NEdBNUNVLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBiYWNrT2ZmLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBJbnRlcmNlcHRvclV0aWwsXG4gIGlzSmFsb0Vycm9yLFxuICBub3JtYWxpemVIdHRwRXJyb3IsXG4gIE9jYyxcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBVU0VfQ0xJRU5UX1RPS0VOLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9jb3JlJztcbmltcG9ydCB7IE9yZGVyLCBPUkRFUl9OT1JNQUxJWkVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NPcmRlckFkYXB0ZXIgaW1wbGVtZW50cyBPcmRlckFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBwbGFjZU9yZGVyKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHRlcm1zQ2hlY2tlZDogYm9vbGVhblxuICApOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgIH0pO1xuXG4gICAgaWYgKHVzZXJJZCA9PT0gT0NDX1VTRVJfSURfQU5PTllNT1VTKSB7XG4gICAgICBoZWFkZXJzID0gSW50ZXJjZXB0b3JVdGlsLmNyZWF0ZUhlYWRlcihVU0VfQ0xJRU5UX1RPS0VOLCB0cnVlLCBoZWFkZXJzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdDxPY2MuT3JkZXI+KFxuICAgICAgICB0aGlzLmdldFBsYWNlT3JkZXJFbmRwb2ludCh1c2VySWQsIGNhcnRJZCwgdGVybXNDaGVja2VkLnRvU3RyaW5nKCkpLFxuICAgICAgICB7fSxcbiAgICAgICAgeyBoZWFkZXJzIH1cbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKSksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKE9SREVSX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBsYWNlT3JkZXJFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICB0ZXJtc0NoZWNrZWQ6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncGxhY2VPcmRlcicsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGNhcnRJZCwgdGVybXNDaGVja2VkIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==