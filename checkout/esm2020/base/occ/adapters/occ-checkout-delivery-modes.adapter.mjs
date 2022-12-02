import { Injectable } from '@angular/core';
import { DELIVERY_MODE_NORMALIZER, } from '@spartacus/checkout/base/core';
import { backOff, isJaloError, normalizeHttpError, } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCheckoutDeliveryModesAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    setMode(userId, cartId, deliveryModeId) {
        return this.http
            .put(this.getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId) {
        return this.occEndpoints.buildUrl('setDeliveryMode', {
            urlParams: {
                userId,
                cartId,
            },
            queryParams: { deliveryModeId },
        });
    }
    getSupportedModes(userId, cartId) {
        return this.http
            .get(this.getDeliveryModesEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }), pluck('deliveryModes'), map((modes) => modes ?? []), this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER));
    }
    getDeliveryModesEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('deliveryModes', {
            urlParams: { userId, cartId },
        });
    }
    clearCheckoutDeliveryMode(userId, cartId) {
        return this.http
            .delete(this.getClearDeliveryModeEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getClearDeliveryModeEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('clearDeliveryMode', {
            urlParams: { userId, cartId },
        });
    }
}
OccCheckoutDeliveryModesAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutDeliveryModesAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutDeliveryModesAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutDeliveryModesAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCheckoutDeliveryModesAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9vY2MvYWRhcHRlcnMvb2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsd0JBQXdCLEdBQ3pCLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUNMLE9BQU8sRUFFUCxXQUFXLEVBQ1gsa0JBQWtCLEdBR25CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUd4RCxNQUFNLE9BQU8sK0JBQStCO0lBRzFDLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVHLE9BQU8sQ0FDWixNQUFjLEVBQ2QsTUFBYyxFQUNkLGNBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ3hFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVTLDBCQUEwQixDQUNsQyxNQUFjLEVBQ2QsTUFBYyxFQUNkLGNBQXVCO1FBRXZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDbkQsU0FBUyxFQUFFO2dCQUNULE1BQU07Z0JBQ04sTUFBTTthQUNQO1lBQ0QsV0FBVyxFQUFFLEVBQUUsY0FBYyxFQUFFO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxpQkFBaUIsQ0FDdEIsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUF1QixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3hFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELE9BQU8sQ0FBQztZQUNOLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUMsRUFDRixLQUFLLENBQUMsZUFBZSxDQUFDLEVBQ3RCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUN0RCxDQUFDO0lBQ04sQ0FBQztJQUVTLHdCQUF3QixDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQ2pELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUF5QixDQUN2QixNQUFjLEVBQ2QsTUFBYztRQUVkLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixNQUFNLENBQVUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNsRSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxPQUFPLENBQUM7WUFDTixXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFUyw0QkFBNEIsQ0FDcEMsTUFBYyxFQUNkLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQ3JELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NEhBbEZVLCtCQUErQjtnSUFBL0IsK0JBQStCOzJGQUEvQiwrQkFBK0I7a0JBRDNDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVsaXZlcnlNb2RlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5TW9kZXNBZGFwdGVyLFxuICBERUxJVkVSWV9NT0RFX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9jb3JlJztcbmltcG9ydCB7XG4gIGJhY2tPZmYsXG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIGlzSmFsb0Vycm9yLFxuICBub3JtYWxpemVIdHRwRXJyb3IsXG4gIE9jYyxcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NDaGVja291dERlbGl2ZXJ5TW9kZXNBZGFwdGVyXG4gIGltcGxlbWVudHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVzQWRhcHRlclxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBzZXRNb2RlKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGRlbGl2ZXJ5TW9kZUlkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnB1dCh0aGlzLmdldFNldERlbGl2ZXJ5TW9kZUVuZHBvaW50KHVzZXJJZCwgY2FydElkLCBkZWxpdmVyeU1vZGVJZCksIHt9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgICAgYmFja09mZih7XG4gICAgICAgICAgc2hvdWxkUmV0cnk6IGlzSmFsb0Vycm9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZXREZWxpdmVyeU1vZGVFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBkZWxpdmVyeU1vZGVJZD86IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnc2V0RGVsaXZlcnlNb2RlJywge1xuICAgICAgdXJsUGFyYW1zOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGRlbGl2ZXJ5TW9kZUlkIH0sXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3VwcG9ydGVkTW9kZXMoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxEZWxpdmVyeU1vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLkRlbGl2ZXJ5TW9kZUxpc3Q+KHRoaXMuZ2V0RGVsaXZlcnlNb2Rlc0VuZHBvaW50KHVzZXJJZCwgY2FydElkKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKSksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSksXG4gICAgICAgIHBsdWNrKCdkZWxpdmVyeU1vZGVzJyksXG4gICAgICAgIG1hcCgobW9kZXMpID0+IG1vZGVzID8/IFtdKSxcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIucGlwZWFibGVNYW55KERFTElWRVJZX01PREVfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGVsaXZlcnlNb2Rlc0VuZHBvaW50KHVzZXJJZDogc3RyaW5nLCBjYXJ0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdkZWxpdmVyeU1vZGVzJywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgfSk7XG4gIH1cblxuICBjbGVhckNoZWNrb3V0RGVsaXZlcnlNb2RlKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5kZWxldGU8dW5rbm93bj4odGhpcy5nZXRDbGVhckRlbGl2ZXJ5TW9kZUVuZHBvaW50KHVzZXJJZCwgY2FydElkKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKSksXG4gICAgICAgIGJhY2tPZmYoe1xuICAgICAgICAgIHNob3VsZFJldHJ5OiBpc0phbG9FcnJvcixcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q2xlYXJEZWxpdmVyeU1vZGVFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnY2xlYXJEZWxpdmVyeU1vZGUnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCBjYXJ0SWQgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19