/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { normalizeHttpError } from '../../../../util/normalize-http-error';
import { ClientAuthActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../services/client-authentication-token.service";
export class ClientTokenEffect {
    constructor(actions$, clientAuthenticationTokenService) {
        this.actions$ = actions$;
        this.clientAuthenticationTokenService = clientAuthenticationTokenService;
        this.loadClientToken$ = createEffect(() => this.actions$.pipe(ofType(ClientAuthActions.LOAD_CLIENT_TOKEN), exhaustMap(() => {
            return this.clientAuthenticationTokenService
                .loadClientAuthenticationToken()
                .pipe(map((token) => {
                return new ClientAuthActions.LoadClientTokenSuccess(token);
            }), catchError((error) => of(new ClientAuthActions.LoadClientTokenFail(normalizeHttpError(error)))));
        })));
    }
}
ClientTokenEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ClientTokenEffect, deps: [{ token: i1.Actions }, { token: i2.ClientAuthenticationTokenService }], target: i0.ɵɵFactoryTarget.Injectable });
ClientTokenEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ClientTokenEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ClientTokenEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.ClientAuthenticationTokenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LXRva2VuLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvY2xpZW50LWF1dGgvc3RvcmUvZWZmZWN0cy9jbGllbnQtdG9rZW4uZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFHM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFHckQsTUFBTSxPQUFPLGlCQUFpQjtJQXdCNUIsWUFDVSxRQUFpQixFQUNqQixnQ0FBa0U7UUFEbEUsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixxQ0FBZ0MsR0FBaEMsZ0NBQWdDLENBQWtDO1FBekI1RSxxQkFBZ0IsR0FDZCxZQUFZLENBQUMsR0FBRyxFQUFFLENBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsRUFDM0MsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGdDQUFnQztpQkFDekMsNkJBQTZCLEVBQUU7aUJBQy9CLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFrQixFQUFFLEVBQUU7Z0JBQ3pCLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixFQUFFLENBQ0EsSUFBSSxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FDdkMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQzFCLENBQ0YsQ0FDRixDQUNGLENBQUM7UUFDTixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFLRCxDQUFDOzs4R0EzQk8saUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIGNyZWF0ZUVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZXhoYXVzdE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgbm9ybWFsaXplSHR0cEVycm9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9ub3JtYWxpemUtaHR0cC1lcnJvcic7XG5pbXBvcnQgeyBDbGllbnRUb2tlbiB9IGZyb20gJy4uLy4uLy4uL2NsaWVudC1hdXRoL21vZGVscy9jbGllbnQtdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgQ2xpZW50QXV0aGVudGljYXRpb25Ub2tlblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbGllbnQtYXV0aGVudGljYXRpb24tdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDbGllbnRBdXRoQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xpZW50VG9rZW5FZmZlY3Qge1xuICBsb2FkQ2xpZW50VG9rZW4kOiBPYnNlcnZhYmxlPENsaWVudEF1dGhBY3Rpb25zLkNsaWVudFRva2VuQWN0aW9uPiA9XG4gICAgY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShDbGllbnRBdXRoQWN0aW9ucy5MT0FEX0NMSUVOVF9UT0tFTiksXG4gICAgICAgIGV4aGF1c3RNYXAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNsaWVudEF1dGhlbnRpY2F0aW9uVG9rZW5TZXJ2aWNlXG4gICAgICAgICAgICAubG9hZENsaWVudEF1dGhlbnRpY2F0aW9uVG9rZW4oKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgodG9rZW46IENsaWVudFRva2VuKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRBdXRoQWN0aW9ucy5Mb2FkQ2xpZW50VG9rZW5TdWNjZXNzKHRva2VuKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICAgICAgbmV3IENsaWVudEF1dGhBY3Rpb25zLkxvYWRDbGllbnRUb2tlbkZhaWwoXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgY2xpZW50QXV0aGVudGljYXRpb25Ub2tlblNlcnZpY2U6IENsaWVudEF1dGhlbnRpY2F0aW9uVG9rZW5TZXJ2aWNlXG4gICkge31cbn1cbiJdfQ==