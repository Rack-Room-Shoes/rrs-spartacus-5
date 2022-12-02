/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AsmActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/asm.connector";
export class CustomerEffects {
    constructor(actions$, asmConnector) {
        this.actions$ = actions$;
        this.asmConnector = asmConnector;
        this.customerSearch$ = createEffect(() => this.actions$.pipe(ofType(AsmActions.CUSTOMER_SEARCH), map((action) => action.payload), switchMap((options) => this.asmConnector.customerSearch(options).pipe(map((customerSearchResults) => {
            return new AsmActions.CustomerSearchSuccess(customerSearchResults);
        }), catchError((error) => of(new AsmActions.CustomerSearchFail(normalizeHttpError(error))))))));
    }
}
CustomerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEffects, deps: [{ token: i1.Actions }, { token: i2.AsmConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.AsmConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb3JlL3N0b3JlL2VmZmVjdHMvY3VzdG9tZXIuZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBRzlDLE1BQU0sT0FBTyxlQUFlO0lBa0IxQixZQUFvQixRQUFpQixFQUFVLFlBQTBCO1FBQXJELGFBQVEsR0FBUixRQUFRLENBQVM7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWpCekUsb0JBQWUsR0FBMEMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFDbEMsR0FBRyxDQUFDLENBQUMsTUFBaUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUMxRCxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzVDLEdBQUcsQ0FBQyxDQUFDLHFCQUF5QyxFQUFFLEVBQUU7WUFDaEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25CLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ2pFLENBQ0YsQ0FDRixDQUNGLENBQ0YsQ0FBQztJQUUwRSxDQUFDOzs0R0FsQmxFLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBc21Db25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL2FzbS5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ3VzdG9tZXJTZWFyY2hQYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2FzbS5tb2RlbHMnO1xuaW1wb3J0IHsgQXNtQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJFZmZlY3RzIHtcbiAgY3VzdG9tZXJTZWFyY2gkOiBPYnNlcnZhYmxlPEFzbUFjdGlvbnMuQ3VzdG9tZXJBY3Rpb24+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKEFzbUFjdGlvbnMuQ1VTVE9NRVJfU0VBUkNIKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBBc21BY3Rpb25zLkN1c3RvbWVyU2VhcmNoKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICBzd2l0Y2hNYXAoKG9wdGlvbnMpID0+XG4gICAgICAgIHRoaXMuYXNtQ29ubmVjdG9yLmN1c3RvbWVyU2VhcmNoKG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgbWFwKChjdXN0b21lclNlYXJjaFJlc3VsdHM6IEN1c3RvbWVyU2VhcmNoUGFnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBc21BY3Rpb25zLkN1c3RvbWVyU2VhcmNoU3VjY2VzcyhjdXN0b21lclNlYXJjaFJlc3VsdHMpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgb2YobmV3IEFzbUFjdGlvbnMuQ3VzdG9tZXJTZWFyY2hGYWlsKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLCBwcml2YXRlIGFzbUNvbm5lY3RvcjogQXNtQ29ubmVjdG9yKSB7fVxufVxuIl19