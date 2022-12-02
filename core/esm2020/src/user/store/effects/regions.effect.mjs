/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StateUtils } from '../../../state/utils/index';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';
import { REGIONS } from '../user-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../../site-context/connectors/site.connector";
export class RegionsEffects {
    constructor(actions$, siteConnector) {
        this.actions$ = actions$;
        this.siteConnector = siteConnector;
        this.loadRegions$ = createEffect(() => this.actions$.pipe(ofType(UserActions.LOAD_REGIONS), map((action) => {
            return action.payload;
        }), switchMap((countryCode) => {
            return this.siteConnector.getRegions(countryCode).pipe(map((regions) => new UserActions.LoadRegionsSuccess({
                entities: regions,
                country: countryCode,
            })), catchError((error) => of(new UserActions.LoadRegionsFail(normalizeHttpError(error)))));
        })));
        this.resetRegions$ = createEffect(() => this.actions$.pipe(ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_REGIONS), map(() => {
            return new StateUtils.LoaderResetAction(REGIONS);
        })));
    }
}
RegionsEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegionsEffects, deps: [{ token: i1.Actions }, { token: i2.SiteConnector }], target: i0.ɵɵFactoryTarget.Injectable });
RegionsEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegionsEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegionsEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.SiteConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy5lZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91c2VyL3N0b3JlL2VmZmVjdHMvcmVnaW9ucy5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFHeEMsTUFBTSxPQUFPLGNBQWM7SUFpQ3pCLFlBQ1UsUUFBaUIsRUFDakIsYUFBNEI7UUFENUIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWxDdEMsaUJBQVksR0FBMEMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFDaEMsR0FBRyxDQUFDLENBQUMsTUFBK0IsRUFBRSxFQUFFO1lBQ3RDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3BELEdBQUcsQ0FDRCxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsSUFBSSxXQUFXLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2pDLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixPQUFPLEVBQUUsV0FBVzthQUNyQixDQUFDLENBQ0wsRUFDRCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDL0QsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBRUYsa0JBQWEsR0FBdUIsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQ3BFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxPQUFPLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQUtDLENBQUM7OzJHQXBDTyxjQUFjOytHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIGNyZWF0ZUVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTaXRlQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vLi4vc2l0ZS1jb250ZXh0L2Nvbm5lY3RvcnMvc2l0ZS5jb25uZWN0b3InO1xuaW1wb3J0IHsgU3RhdGVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3V0aWxzL2luZGV4JztcbmltcG9ydCB7IG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL3V0aWwvbm9ybWFsaXplLWh0dHAtZXJyb3InO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFJFR0lPTlMgfSBmcm9tICcuLi91c2VyLXN0YXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlZ2lvbnNFZmZlY3RzIHtcbiAgbG9hZFJlZ2lvbnMkOiBPYnNlcnZhYmxlPFVzZXJBY3Rpb25zLlJlZ2lvbnNBY3Rpb24+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKFVzZXJBY3Rpb25zLkxPQURfUkVHSU9OUyksXG4gICAgICBtYXAoKGFjdGlvbjogVXNlckFjdGlvbnMuTG9hZFJlZ2lvbnMpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbi5wYXlsb2FkO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKGNvdW50cnlDb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l0ZUNvbm5lY3Rvci5nZXRSZWdpb25zKGNvdW50cnlDb2RlKS5waXBlKFxuICAgICAgICAgIG1hcChcbiAgICAgICAgICAgIChyZWdpb25zKSA9PlxuICAgICAgICAgICAgICBuZXcgVXNlckFjdGlvbnMuTG9hZFJlZ2lvbnNTdWNjZXNzKHtcbiAgICAgICAgICAgICAgICBlbnRpdGllczogcmVnaW9ucyxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiBjb3VudHJ5Q29kZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgb2YobmV3IFVzZXJBY3Rpb25zLkxvYWRSZWdpb25zRmFpbChub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIClcbiAgKTtcblxuICByZXNldFJlZ2lvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoVXNlckFjdGlvbnMuQ0xFQVJfVVNFUl9NSVNDU19EQVRBLCBVc2VyQWN0aW9ucy5DTEVBUl9SRUdJT05TKSxcbiAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdGVVdGlscy5Mb2FkZXJSZXNldEFjdGlvbihSRUdJT05TKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzaXRlQ29ubmVjdG9yOiBTaXRlQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==