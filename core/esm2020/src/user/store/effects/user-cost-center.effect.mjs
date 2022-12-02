/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/cost-center/user-cost-center.connector";
export class UserCostCenterEffects {
    constructor(actions$, userCostCenterConnector) {
        this.actions$ = actions$;
        this.userCostCenterConnector = userCostCenterConnector;
        this.loadActiveCostCenters$ = createEffect(() => this.actions$.pipe(ofType(UserActions.LOAD_ACTIVE_COST_CENTERS), map((action) => action.payload), switchMap((payload) => this.userCostCenterConnector.getActiveList(payload).pipe(
        // TODO(#8875): Should we use here serialize utils?
        map((data) => new UserActions.LoadActiveCostCentersSuccess(data.values)), catchError((error) => of(new UserActions.LoadActiveCostCentersFail(normalizeHttpError(error))))))));
    }
}
UserCostCenterEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserCostCenterEffects, deps: [{ token: i1.Actions }, { token: i2.UserCostCenterConnector }], target: i0.ɵɵFactoryTarget.Injectable });
UserCostCenterEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserCostCenterEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserCostCenterEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.UserCostCenterConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb3N0LWNlbnRlci5lZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91c2VyL3N0b3JlL2VmZmVjdHMvdXNlci1jb3N0LWNlbnRlci5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc1RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFHL0MsTUFBTSxPQUFPLHFCQUFxQjtJQXlCaEMsWUFDVSxRQUFpQixFQUNqQix1QkFBZ0Q7UUFEaEQsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBMUIxRCwyQkFBc0IsR0FDcEIsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUM1QyxHQUFHLENBQUMsQ0FBQyxNQUF5QyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ2xFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ3BCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtRQUN0RCxtREFBbUQ7UUFDbkQsR0FBRyxDQUNELENBQUMsSUFBK0IsRUFBRSxFQUFFLENBQ2xDLElBQUksV0FBVyxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDNUQsRUFDRCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixFQUFFLENBQ0EsSUFBSSxXQUFXLENBQUMseUJBQXlCLENBQ3ZDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUMxQixDQUNGLENBQ0YsQ0FDRixDQUNGLENBQ0YsQ0FDRixDQUFDO0lBS0QsQ0FBQzs7a0hBNUJPLHFCQUFxQjtzSEFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zLCBjcmVhdGVFZmZlY3QsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCB9IGZyb20gJy4uLy4uLy4uL21vZGVsL21pc2MubW9kZWwnO1xuaW1wb3J0IHsgQ29zdENlbnRlciB9IGZyb20gJy4uLy4uLy4uL21vZGVsL29yZy11bml0Lm1vZGVsJztcbmltcG9ydCB7IG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL3V0aWwvbm9ybWFsaXplLWh0dHAtZXJyb3InO1xuaW1wb3J0IHsgVXNlckNvc3RDZW50ZXJDb25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL2Nvc3QtY2VudGVyL3VzZXItY29zdC1jZW50ZXIuY29ubmVjdG9yJztcbmltcG9ydCB7IFVzZXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyQ29zdENlbnRlckVmZmVjdHMge1xuICBsb2FkQWN0aXZlQ29zdENlbnRlcnMkOiBPYnNlcnZhYmxlPFVzZXJBY3Rpb25zLlVzZXJDb3N0Q2VudGVyQWN0aW9uPiA9XG4gICAgY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShVc2VyQWN0aW9ucy5MT0FEX0FDVElWRV9DT1NUX0NFTlRFUlMpLFxuICAgICAgICBtYXAoKGFjdGlvbjogVXNlckFjdGlvbnMuTG9hZEFjdGl2ZUNvc3RDZW50ZXJzKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICAgIHN3aXRjaE1hcCgocGF5bG9hZCkgPT5cbiAgICAgICAgICB0aGlzLnVzZXJDb3N0Q2VudGVyQ29ubmVjdG9yLmdldEFjdGl2ZUxpc3QocGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIC8vIFRPRE8oIzg4NzUpOiBTaG91bGQgd2UgdXNlIGhlcmUgc2VyaWFsaXplIHV0aWxzP1xuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAoZGF0YTogRW50aXRpZXNNb2RlbDxDb3N0Q2VudGVyPikgPT5cbiAgICAgICAgICAgICAgICBuZXcgVXNlckFjdGlvbnMuTG9hZEFjdGl2ZUNvc3RDZW50ZXJzU3VjY2VzcyhkYXRhLnZhbHVlcylcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgICAgbmV3IFVzZXJBY3Rpb25zLkxvYWRBY3RpdmVDb3N0Q2VudGVyc0ZhaWwoXG4gICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgdXNlckNvc3RDZW50ZXJDb25uZWN0b3I6IFVzZXJDb3N0Q2VudGVyQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==