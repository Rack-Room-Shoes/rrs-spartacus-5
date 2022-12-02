/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountryType } from '../../../model/address.model';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../../site-context/connectors/site.connector";
export class DeliveryCountriesEffects {
    constructor(actions$, siteConnector) {
        this.actions$ = actions$;
        this.siteConnector = siteConnector;
        this.loadDeliveryCountries$ = createEffect(() => this.actions$.pipe(ofType(UserActions.LOAD_DELIVERY_COUNTRIES), switchMap(() => {
            return this.siteConnector.getCountries(CountryType.SHIPPING).pipe(map((countries) => new UserActions.LoadDeliveryCountriesSuccess(countries)), catchError((error) => of(new UserActions.LoadDeliveryCountriesFail(normalizeHttpError(error)))));
        })));
    }
}
DeliveryCountriesEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: DeliveryCountriesEffects, deps: [{ token: i1.Actions }, { token: i2.SiteConnector }], target: i0.ɵɵFactoryTarget.Injectable });
DeliveryCountriesEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: DeliveryCountriesEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: DeliveryCountriesEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.SiteConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsaXZlcnktY291bnRyaWVzLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3VzZXIvc3RvcmUvZWZmZWN0cy9kZWxpdmVyeS1jb3VudHJpZXMuZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUcvQyxNQUFNLE9BQU8sd0JBQXdCO0lBdUJuQyxZQUNVLFFBQWlCLEVBQ2pCLGFBQTRCO1FBRDVCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUF4QnRDLDJCQUFzQixHQUNwQixZQUFZLENBQUMsR0FBRyxFQUFFLENBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLEVBQzNDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQy9ELEdBQUcsQ0FDRCxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ1osSUFBSSxXQUFXLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQzFELEVBQ0QsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsRUFBRSxDQUNBLElBQUksV0FBVyxDQUFDLHlCQUF5QixDQUN2QyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FDMUIsQ0FDRixDQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQUtELENBQUM7O3FIQTFCTyx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvdW50cnlUeXBlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvYWRkcmVzcy5tb2RlbCc7XG5pbXBvcnQgeyBTaXRlQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vc2l0ZS1jb250ZXh0L2Nvbm5lY3RvcnMvc2l0ZS5jb25uZWN0b3InO1xuaW1wb3J0IHsgbm9ybWFsaXplSHR0cEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9ub3JtYWxpemUtaHR0cC1lcnJvcic7XG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVsaXZlcnlDb3VudHJpZXNFZmZlY3RzIHtcbiAgbG9hZERlbGl2ZXJ5Q291bnRyaWVzJDogT2JzZXJ2YWJsZTxVc2VyQWN0aW9ucy5EZWxpdmVyeUNvdW50cmllc0FjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoVXNlckFjdGlvbnMuTE9BRF9ERUxJVkVSWV9DT1VOVFJJRVMpLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNpdGVDb25uZWN0b3IuZ2V0Q291bnRyaWVzKENvdW50cnlUeXBlLlNISVBQSU5HKS5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAoY291bnRyaWVzKSA9PlxuICAgICAgICAgICAgICAgIG5ldyBVc2VyQWN0aW9ucy5Mb2FkRGVsaXZlcnlDb3VudHJpZXNTdWNjZXNzKGNvdW50cmllcylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgICAgbmV3IFVzZXJBY3Rpb25zLkxvYWREZWxpdmVyeUNvdW50cmllc0ZhaWwoXG4gICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzaXRlQ29ubmVjdG9yOiBTaXRlQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==