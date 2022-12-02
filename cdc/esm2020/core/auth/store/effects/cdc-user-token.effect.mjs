/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { GlobalMessageType, normalizeHttpError, } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CdcAuthActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../services/user-authentication/cdc-user-authentication-token.service";
import * as i3 from "@spartacus/core";
import * as i4 from "../../facade/cdc-auth.service";
export class CdcUserTokenEffects {
    constructor(actions$, userTokenService, globalMessageService, cdcAuthService) {
        this.actions$ = actions$;
        this.userTokenService = userTokenService;
        this.globalMessageService = globalMessageService;
        this.cdcAuthService = cdcAuthService;
        this.loadCdcUserToken$ = createEffect(() => this.actions$.pipe(ofType(CdcAuthActions.LOAD_CDC_USER_TOKEN), map((action) => action.payload), mergeMap((payload) => this.userTokenService
            .loadTokenUsingCustomFlow(payload.UID, payload.UIDSignature, payload.signatureTimestamp, payload.idToken, payload.baseSite)
            .pipe(switchMap((token) => {
            this.cdcAuthService.loginWithToken(token);
            return EMPTY;
        }), catchError((error) => {
            this.globalMessageService.add({ key: 'httpHandlers.badGateway' }, GlobalMessageType.MSG_TYPE_ERROR);
            return of(new CdcAuthActions.LoadCdcUserTokenFail({
                error: normalizeHttpError(error),
                initialActionPayload: payload,
            }));
        })))));
    }
}
CdcUserTokenEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserTokenEffects, deps: [{ token: i1.Actions }, { token: i2.CdcUserAuthenticationTokenService }, { token: i3.GlobalMessageService }, { token: i4.CdcAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserTokenEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserTokenEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserTokenEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CdcUserAuthenticationTokenService }, { type: i3.GlobalMessageService }, { type: i4.CdcAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItdG9rZW4uZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvY29yZS9hdXRoL3N0b3JlL2VmZmVjdHMvY2RjLXVzZXItdG9rZW4uZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsa0JBQWtCLEdBQ25CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7O0FBR2xELE1BQU0sT0FBTyxtQkFBbUI7SUFxQzlCLFlBQ1UsUUFBaUIsRUFDakIsZ0JBQW1ELEVBQ25ELG9CQUEwQyxFQUMxQyxjQUE4QjtRQUg5QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUM7UUFDbkQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF4Q3hDLHNCQUFpQixHQUNmLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsRUFDMUMsR0FBRyxDQUFDLENBQUMsTUFBdUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNoRSxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNuQixJQUFJLENBQUMsZ0JBQWdCO2FBQ2xCLHdCQUF3QixDQUN2QixPQUFPLENBQUMsR0FBRyxFQUNYLE9BQU8sQ0FBQyxZQUFZLEVBQ3BCLE9BQU8sQ0FBQyxrQkFBa0IsRUFDMUIsT0FBTyxDQUFDLE9BQU8sRUFDZixPQUFPLENBQUMsUUFBUSxDQUNqQjthQUNBLElBQUksQ0FDSCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFFLEVBQ2xDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztZQUNGLE9BQU8sRUFBRSxDQUNQLElBQUksY0FBYyxDQUFDLG9CQUFvQixDQUFDO2dCQUN0QyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDO2dCQUNoQyxvQkFBb0IsRUFBRSxPQUFPO2FBQzlCLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDSixDQUNGLENBQ0YsQ0FBQztJQU9ELENBQUM7O2dIQTFDTyxtQkFBbUI7b0hBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDZGNBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL2ZhY2FkZS9jZGMtYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IENkY1VzZXJBdXRoZW50aWNhdGlvblRva2VuU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXItYXV0aGVudGljYXRpb24vY2RjLXVzZXItYXV0aGVudGljYXRpb24tdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDZGNBdXRoQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2RjVXNlclRva2VuRWZmZWN0cyB7XG4gIGxvYWRDZGNVc2VyVG9rZW4kOiBPYnNlcnZhYmxlPENkY0F1dGhBY3Rpb25zLkNkY1VzZXJUb2tlbkFjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoQ2RjQXV0aEFjdGlvbnMuTE9BRF9DRENfVVNFUl9UT0tFTiksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBDZGNBdXRoQWN0aW9ucy5Mb2FkQ2RjVXNlclRva2VuKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PlxuICAgICAgICAgIHRoaXMudXNlclRva2VuU2VydmljZVxuICAgICAgICAgICAgLmxvYWRUb2tlblVzaW5nQ3VzdG9tRmxvdyhcbiAgICAgICAgICAgICAgcGF5bG9hZC5VSUQsXG4gICAgICAgICAgICAgIHBheWxvYWQuVUlEU2lnbmF0dXJlLFxuICAgICAgICAgICAgICBwYXlsb2FkLnNpZ25hdHVyZVRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgcGF5bG9hZC5pZFRva2VuLFxuICAgICAgICAgICAgICBwYXlsb2FkLmJhc2VTaXRlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2RjQXV0aFNlcnZpY2UubG9naW5XaXRoVG9rZW4odG9rZW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICAgICAgICB7IGtleTogJ2h0dHBIYW5kbGVycy5iYWRHYXRld2F5JyB9LFxuICAgICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgICAgICAgIG5ldyBDZGNBdXRoQWN0aW9ucy5Mb2FkQ2RjVXNlclRva2VuRmFpbCh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsQWN0aW9uUGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIHVzZXJUb2tlblNlcnZpY2U6IENkY1VzZXJBdXRoZW50aWNhdGlvblRva2VuU2VydmljZSxcbiAgICBwcml2YXRlIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcml2YXRlIGNkY0F1dGhTZXJ2aWNlOiBDZGNBdXRoU2VydmljZVxuICApIHt9XG59XG4iXX0=