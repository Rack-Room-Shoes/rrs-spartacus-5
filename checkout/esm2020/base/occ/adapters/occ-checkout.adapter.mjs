import { Injectable } from '@angular/core';
import { CHECKOUT_NORMALIZER, } from '@spartacus/checkout/base/core';
import { backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    getCheckoutDetails(userId, cartId) {
        return this.http
            .get(this.getGetCheckoutDetailsEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(CHECKOUT_NORMALIZER));
    }
    getGetCheckoutDetailsEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('getCheckoutDetails', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
}
OccCheckoutAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9vY2MvYWRhcHRlcnMvb2NjLWNoZWNrb3V0LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsbUJBQW1CLEdBQ3BCLE1BQU0sK0JBQStCLENBQUM7QUFFdkMsT0FBTyxFQUNMLE9BQU8sRUFFUCxXQUFXLEVBQ1gsa0JBQWtCLEdBRW5CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHNUMsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFSixrQkFBa0IsQ0FDaEIsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFnQixJQUFJLENBQUMsNkJBQTZCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3RFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsRUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUM3QyxDQUFDO0lBQ04sQ0FBQztJQUVTLDZCQUE2QixDQUNyQyxNQUFjLEVBQ2QsTUFBYztRQUVkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7WUFDdEQsU0FBUyxFQUFFO2dCQUNULE1BQU07Z0JBQ04sTUFBTTthQUNQO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7K0dBaENVLGtCQUFrQjttSEFBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRDlCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRBZGFwdGVyLFxuICBDSEVDS09VVF9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dFN0YXRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgYmFja09mZixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgaXNKYWxvRXJyb3IsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NDaGVja291dEFkYXB0ZXIgaW1wbGVtZW50cyBDaGVja291dEFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldENoZWNrb3V0RGV0YWlscyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENoZWNrb3V0U3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PENoZWNrb3V0U3RhdGU+KHRoaXMuZ2V0R2V0Q2hlY2tvdXREZXRhaWxzRW5kcG9pbnQodXNlcklkLCBjYXJ0SWQpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgICAgYmFja09mZih7XG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yLFxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoQ0hFQ0tPVVRfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0R2V0Q2hlY2tvdXREZXRhaWxzRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ2dldENoZWNrb3V0RGV0YWlscycsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==