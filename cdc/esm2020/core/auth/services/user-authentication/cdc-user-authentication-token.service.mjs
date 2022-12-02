/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class CdcUserAuthenticationTokenService {
    constructor(http, authConfigService) {
        this.http = http;
        this.authConfigService = authConfigService;
    }
    /**
     * Load User token using custom oauth flow
     *
     * @param UID - UID received from CDC on login event
     * @param UIDSignature - UIDSignature received from CDC on login event
     * @param signatureTimestamp - signatureTimestamp received from CDC on login event
     * @param idToken - idToken received from CDC on login event
     * @param baseSite - baseSite received from CDC on login event
     */
    loadTokenUsingCustomFlow(UID, UIDSignature, signatureTimestamp, idToken, baseSite) {
        const url = this.authConfigService.getTokenEndpoint();
        const params = new HttpParams()
            .set('client_id', this.authConfigService.getClientId())
            .set('client_secret', this.authConfigService.getClientSecret())
            .set('grant_type', 'custom')
            .set('UID', encodeURIComponent(UID))
            .set('UIDSignature', encodeURIComponent(UIDSignature))
            .set('signatureTimestamp', encodeURIComponent(signatureTimestamp))
            .set('id_token', encodeURIComponent(idToken))
            .set('baseSite', encodeURIComponent(baseSite));
        return this.http
            .post(url, params)
            .pipe(catchError((error) => throwError(error)));
    }
}
CdcUserAuthenticationTokenService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserAuthenticationTokenService, deps: [{ token: i1.HttpClient }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserAuthenticationTokenService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserAuthenticationTokenService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserAuthenticationTokenService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItYXV0aGVudGljYXRpb24tdG9rZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL2NvcmUvYXV0aC9zZXJ2aWNlcy91c2VyLWF1dGhlbnRpY2F0aW9uL2NkYy11c2VyLWF1dGhlbnRpY2F0aW9uLXRva2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzVDLE1BQU0sT0FBTyxpQ0FBaUM7SUFDNUMsWUFDWSxJQUFnQixFQUNoQixpQkFBb0M7UUFEcEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzdDLENBQUM7SUFFSjs7Ozs7Ozs7T0FRRztJQUNILHdCQUF3QixDQUN0QixHQUFXLEVBQ1gsWUFBb0IsRUFDcEIsa0JBQTBCLEVBQzFCLE9BQWUsRUFDZixRQUFnQjtRQUVoQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0RCxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTthQUM1QixHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0RCxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUM5RCxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQzthQUMzQixHQUFHLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDckQsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDakUsR0FBRyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1QyxHQUFHLENBQUMsVUFBVSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBK0MsR0FBRyxFQUFFLE1BQU0sQ0FBQzthQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OzhIQXBDVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQUQ3QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhDb25maWdTZXJ2aWNlLCBBdXRoVG9rZW4gfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENkY1VzZXJBdXRoZW50aWNhdGlvblRva2VuU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBhdXRoQ29uZmlnU2VydmljZTogQXV0aENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBMb2FkIFVzZXIgdG9rZW4gdXNpbmcgY3VzdG9tIG9hdXRoIGZsb3dcbiAgICpcbiAgICogQHBhcmFtIFVJRCAtIFVJRCByZWNlaXZlZCBmcm9tIENEQyBvbiBsb2dpbiBldmVudFxuICAgKiBAcGFyYW0gVUlEU2lnbmF0dXJlIC0gVUlEU2lnbmF0dXJlIHJlY2VpdmVkIGZyb20gQ0RDIG9uIGxvZ2luIGV2ZW50XG4gICAqIEBwYXJhbSBzaWduYXR1cmVUaW1lc3RhbXAgLSBzaWduYXR1cmVUaW1lc3RhbXAgcmVjZWl2ZWQgZnJvbSBDREMgb24gbG9naW4gZXZlbnRcbiAgICogQHBhcmFtIGlkVG9rZW4gLSBpZFRva2VuIHJlY2VpdmVkIGZyb20gQ0RDIG9uIGxvZ2luIGV2ZW50XG4gICAqIEBwYXJhbSBiYXNlU2l0ZSAtIGJhc2VTaXRlIHJlY2VpdmVkIGZyb20gQ0RDIG9uIGxvZ2luIGV2ZW50XG4gICAqL1xuICBsb2FkVG9rZW5Vc2luZ0N1c3RvbUZsb3coXG4gICAgVUlEOiBzdHJpbmcsXG4gICAgVUlEU2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgc2lnbmF0dXJlVGltZXN0YW1wOiBzdHJpbmcsXG4gICAgaWRUb2tlbjogc3RyaW5nLFxuICAgIGJhc2VTaXRlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxQYXJ0aWFsPEF1dGhUb2tlbj4gJiB7IGV4cGlyZXNfaW4/OiBudW1iZXIgfT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludCgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgIC5zZXQoJ2NsaWVudF9pZCcsIHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0Q2xpZW50SWQoKSlcbiAgICAgIC5zZXQoJ2NsaWVudF9zZWNyZXQnLCB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldENsaWVudFNlY3JldCgpKVxuICAgICAgLnNldCgnZ3JhbnRfdHlwZScsICdjdXN0b20nKVxuICAgICAgLnNldCgnVUlEJywgZW5jb2RlVVJJQ29tcG9uZW50KFVJRCkpXG4gICAgICAuc2V0KCdVSURTaWduYXR1cmUnLCBlbmNvZGVVUklDb21wb25lbnQoVUlEU2lnbmF0dXJlKSlcbiAgICAgIC5zZXQoJ3NpZ25hdHVyZVRpbWVzdGFtcCcsIGVuY29kZVVSSUNvbXBvbmVudChzaWduYXR1cmVUaW1lc3RhbXApKVxuICAgICAgLnNldCgnaWRfdG9rZW4nLCBlbmNvZGVVUklDb21wb25lbnQoaWRUb2tlbikpXG4gICAgICAuc2V0KCdiYXNlU2l0ZScsIGVuY29kZVVSSUNvbXBvbmVudChiYXNlU2l0ZSkpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8UGFydGlhbDxBdXRoVG9rZW4+ICYgeyBleHBpcmVzX2luPzogbnVtYmVyIH0+KHVybCwgcGFyYW1zKVxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3I6IGFueSkgPT4gdGhyb3dFcnJvcihlcnJvcikpKTtcbiAgfVxufVxuIl19