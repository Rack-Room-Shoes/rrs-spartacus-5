/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { SiteContextActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/site.connector";
export class BaseSiteEffects {
    constructor(actions$, siteConnector) {
        this.actions$ = actions$;
        this.siteConnector = siteConnector;
        this.loadBaseSite$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LOAD_BASE_SITE), exhaustMap(() => {
            return this.siteConnector.getBaseSite().pipe(map((baseSite) => {
                if (baseSite) {
                    return new SiteContextActions.LoadBaseSiteSuccess(baseSite);
                }
                else {
                    throw new Error('BaseSite is not found');
                }
            }), catchError((error) => of(new SiteContextActions.LoadBaseSiteFail(normalizeHttpError(error)))));
        })));
        this.loadBaseSites$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LOAD_BASE_SITES), exhaustMap(() => {
            return this.siteConnector.getBaseSites().pipe(map((baseSites) => new SiteContextActions.LoadBaseSitesSuccess(baseSites)), catchError((error) => of(new SiteContextActions.LoadBaseSitesFail(normalizeHttpError(error)))));
        })));
    }
}
BaseSiteEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BaseSiteEffects, deps: [{ token: i1.Actions }, { token: i2.SiteConnector }], target: i0.ɵɵFactoryTarget.Injectable });
BaseSiteEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BaseSiteEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BaseSiteEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.SiteConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zaXRlLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9zdG9yZS9lZmZlY3RzL2Jhc2Utc2l0ZS5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUd0RCxNQUFNLE9BQU8sZUFBZTtJQWlEMUIsWUFDVSxRQUFpQixFQUNqQixhQUE0QjtRQUQ1QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBbER0QyxrQkFBYSxHQUVULFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFDekMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQzFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNmLElBQUksUUFBUSxFQUFFO29CQUNaLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDN0Q7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUMxQztZQUNILENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25CLEVBQUUsQ0FDQSxJQUFJLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ25FLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBRUYsbUJBQWMsR0FHVixZQUFZLENBQUMsR0FBRyxFQUFFLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLEVBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUMzQyxHQUFHLENBQ0QsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUNaLElBQUksa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQ3pELEVBQ0QsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsRUFBRSxDQUNBLElBQUksa0JBQWtCLENBQUMsaUJBQWlCLENBQ3RDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUMxQixDQUNGLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO0lBS0MsQ0FBQzs7NEdBcERPLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBleGhhdXN0TWFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBub3JtYWxpemVIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi8uLi91dGlsL25vcm1hbGl6ZS1odHRwLWVycm9yJztcbmltcG9ydCB7IFNpdGVDb25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL3NpdGUuY29ubmVjdG9yJztcbmltcG9ydCB7IFNpdGVDb250ZXh0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzZVNpdGVFZmZlY3RzIHtcbiAgbG9hZEJhc2VTaXRlJDogT2JzZXJ2YWJsZTxcbiAgICBTaXRlQ29udGV4dEFjdGlvbnMuTG9hZEJhc2VTaXRlU3VjY2VzcyB8IFNpdGVDb250ZXh0QWN0aW9ucy5Mb2FkQmFzZVNpdGVGYWlsXG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoU2l0ZUNvbnRleHRBY3Rpb25zLkxPQURfQkFTRV9TSVRFKSxcbiAgICAgIGV4aGF1c3RNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlQ29ubmVjdG9yLmdldEJhc2VTaXRlKCkucGlwZShcbiAgICAgICAgICBtYXAoKGJhc2VTaXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoYmFzZVNpdGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTaXRlQ29udGV4dEFjdGlvbnMuTG9hZEJhc2VTaXRlU3VjY2VzcyhiYXNlU2l0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jhc2VTaXRlIGlzIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgIG5ldyBTaXRlQ29udGV4dEFjdGlvbnMuTG9hZEJhc2VTaXRlRmFpbChub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xuXG4gIGxvYWRCYXNlU2l0ZXMkOiBPYnNlcnZhYmxlPFxuICAgIHwgU2l0ZUNvbnRleHRBY3Rpb25zLkxvYWRCYXNlU2l0ZXNTdWNjZXNzXG4gICAgfCBTaXRlQ29udGV4dEFjdGlvbnMuTG9hZEJhc2VTaXRlc0ZhaWxcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShTaXRlQ29udGV4dEFjdGlvbnMuTE9BRF9CQVNFX1NJVEVTKSxcbiAgICAgIGV4aGF1c3RNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXRlQ29ubmVjdG9yLmdldEJhc2VTaXRlcygpLnBpcGUoXG4gICAgICAgICAgbWFwKFxuICAgICAgICAgICAgKGJhc2VTaXRlcykgPT5cbiAgICAgICAgICAgICAgbmV3IFNpdGVDb250ZXh0QWN0aW9ucy5Mb2FkQmFzZVNpdGVzU3VjY2VzcyhiYXNlU2l0ZXMpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICBuZXcgU2l0ZUNvbnRleHRBY3Rpb25zLkxvYWRCYXNlU2l0ZXNGYWlsKFxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzaXRlQ29ubmVjdG9yOiBTaXRlQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==