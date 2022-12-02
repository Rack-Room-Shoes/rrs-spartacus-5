import { Injectable } from '@angular/core';
import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutCostCenterAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    setCostCenter(userId, cartId, costCenterId) {
        return this.http
            .put(this.getSetCartCostCenterEndpoint(userId, cartId, costCenterId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({ shouldRetry: isJaloError }), this.converter.pipeable(CART_NORMALIZER));
    }
    getSetCartCostCenterEndpoint(userId, cartId, costCenterId) {
        return this.occEndpoints.buildUrl('setCartCostCenter', {
            urlParams: { userId, cartId },
            queryParams: { costCenterId },
        });
    }
}
OccCheckoutCostCenterAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutCostCenterAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutCostCenterAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutCostCenterAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutCostCenterAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LWNvc3QtY2VudGVyLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL29jYy9hZGFwdGVycy9vY2MtY2hlY2tvdXQtY29zdC1jZW50ZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBUSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFdBQVcsRUFDWCxrQkFBa0IsR0FFbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVKLGFBQWEsQ0FDWCxNQUFjLEVBQ2QsTUFBYyxFQUNkLFlBQW9CO1FBRXBCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ3hFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFUyw0QkFBNEIsQ0FDcEMsTUFBYyxFQUNkLE1BQWMsRUFDZCxZQUFvQjtRQUVwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQ3JELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7WUFDN0IsV0FBVyxFQUFFLEVBQUUsWUFBWSxFQUFFO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7O3lIQTlCVSw0QkFBNEI7NkhBQTVCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUR4QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnQsIENBUlRfTk9STUFMSVpFUiB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb3N0Q2VudGVyQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYjJiL2NvcmUnO1xuaW1wb3J0IHtcbiAgYmFja09mZixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgaXNKYWxvRXJyb3IsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NDaGVja291dENvc3RDZW50ZXJBZGFwdGVyIGltcGxlbWVudHMgQ2hlY2tvdXRDb3N0Q2VudGVyQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgc2V0Q29zdENlbnRlcihcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBjb3N0Q2VudGVySWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucHV0KHRoaXMuZ2V0U2V0Q2FydENvc3RDZW50ZXJFbmRwb2ludCh1c2VySWQsIGNhcnRJZCwgY29zdENlbnRlcklkKSwge30pXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSkpLFxuICAgICAgICBiYWNrT2ZmKHsgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yIH0pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZShDQVJUX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNldENhcnRDb3N0Q2VudGVyRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgY29zdENlbnRlcklkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3NldENhcnRDb3N0Q2VudGVyJywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgICBxdWVyeVBhcmFtczogeyBjb3N0Q2VudGVySWQgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19