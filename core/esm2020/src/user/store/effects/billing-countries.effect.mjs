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
export class BillingCountriesEffect {
    constructor(actions$, siteConnector) {
        this.actions$ = actions$;
        this.siteConnector = siteConnector;
        this.loadBillingCountries$ = createEffect(() => this.actions$.pipe(ofType(UserActions.LOAD_BILLING_COUNTRIES), switchMap(() => {
            return this.siteConnector.getCountries(CountryType.BILLING).pipe(map((countries) => new UserActions.LoadBillingCountriesSuccess(countries)), catchError((error) => of(new UserActions.LoadBillingCountriesFail(normalizeHttpError(error)))));
        })));
    }
}
BillingCountriesEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BillingCountriesEffect, deps: [{ token: i1.Actions }, { token: i2.SiteConnector }], target: i0.ɵɵFactoryTarget.Injectable });
BillingCountriesEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BillingCountriesEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BillingCountriesEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.SiteConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlsbGluZy1jb3VudHJpZXMuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXNlci9zdG9yZS9lZmZlY3RzL2JpbGxpbmctY291bnRyaWVzLmVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVcsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFHL0MsTUFBTSxPQUFPLHNCQUFzQjtJQXVCakMsWUFDVSxRQUFpQixFQUNqQixhQUE0QjtRQUQ1QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBeEJ0QywwQkFBcUIsR0FDbkIsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxFQUMxQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5RCxHQUFHLENBQ0QsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUNaLElBQUksV0FBVyxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUN6RCxFQUNELFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25CLEVBQUUsQ0FDQSxJQUFJLFdBQVcsQ0FBQyx3QkFBd0IsQ0FDdEMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQzFCLENBQ0YsQ0FDRixDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFLRCxDQUFDOzttSEExQk8sc0JBQXNCO3VIQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIGNyZWF0ZUVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb3VudHJ5VHlwZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2FkZHJlc3MubW9kZWwnO1xuaW1wb3J0IHsgU2l0ZUNvbm5lY3RvciB9IGZyb20gJy4uLy4uLy4uL3NpdGUtY29udGV4dC9jb25uZWN0b3JzL3NpdGUuY29ubmVjdG9yJztcbmltcG9ydCB7IG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL3V0aWwvbm9ybWFsaXplLWh0dHAtZXJyb3InO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJpbGxpbmdDb3VudHJpZXNFZmZlY3Qge1xuICBsb2FkQmlsbGluZ0NvdW50cmllcyQ6IE9ic2VydmFibGU8VXNlckFjdGlvbnMuQmlsbGluZ0NvdW50cmllc0FjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoVXNlckFjdGlvbnMuTE9BRF9CSUxMSU5HX0NPVU5UUklFUyksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZUNvbm5lY3Rvci5nZXRDb3VudHJpZXMoQ291bnRyeVR5cGUuQklMTElORykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgKGNvdW50cmllcykgPT5cbiAgICAgICAgICAgICAgICBuZXcgVXNlckFjdGlvbnMuTG9hZEJpbGxpbmdDb3VudHJpZXNTdWNjZXNzKGNvdW50cmllcylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgICAgbmV3IFVzZXJBY3Rpb25zLkxvYWRCaWxsaW5nQ291bnRyaWVzRmFpbChcbiAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIHNpdGVDb25uZWN0b3I6IFNpdGVDb25uZWN0b3JcbiAgKSB7fVxufVxuIl19