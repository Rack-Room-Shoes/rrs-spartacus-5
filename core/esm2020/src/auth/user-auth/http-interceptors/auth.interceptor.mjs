/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth-http-header.service";
import * as i2 from "../services/auth-config.service";
/**
 * Responsible for catching auth errors and providing `Authorization` header for API calls.
 * Uses AuthHttpHeaderService for request manipulation and error handling. Interceptor only hooks into request send/received events.
 */
export class AuthInterceptor {
    constructor(authHttpHeaderService, authConfigService) {
        this.authHttpHeaderService = authHttpHeaderService;
        this.authConfigService = authConfigService;
    }
    intercept(httpRequest, next) {
        const shouldCatchError = this.authHttpHeaderService.shouldCatchError(httpRequest);
        const shouldAddAuthorizationHeader = this.authHttpHeaderService.shouldAddAuthorizationHeader(httpRequest);
        const token$ = shouldAddAuthorizationHeader
            ? // emits sync, unless there is refresh or logout in progress, in which case it emits async
                this.authHttpHeaderService.getStableToken().pipe(take(1))
            : of(undefined);
        const requestAndToken$ = token$.pipe(map((token) => ({
            token,
            request: this.authHttpHeaderService.alterRequest(httpRequest, token),
        })));
        return requestAndToken$.pipe(switchMap(({ request, token }) => next.handle(request).pipe(catchError((errResponse) => {
            if (errResponse instanceof HttpErrorResponse) {
                switch (errResponse.status) {
                    case 401: // Unauthorized
                        if (this.isExpiredToken(errResponse) && shouldCatchError) {
                            // request failed because of the expired access token
                            // we should get refresh the token and retry the request, or logout if the refresh is missing / expired
                            return this.authHttpHeaderService.handleExpiredAccessToken(request, next, token);
                        }
                        else if (
                        // Refresh the expired token
                        // Check if the OAuth endpoint was called and the error is because the refresh token expired
                        errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
                            errResponse.error.error === 'invalid_token') {
                            this.authHttpHeaderService.handleExpiredRefreshToken();
                            return of();
                        }
                        break;
                    case 400: // Bad Request
                        if (errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
                            errResponse.error.error === 'invalid_grant') {
                            if (request.body.get('grant_type') === 'refresh_token') {
                                this.authHttpHeaderService.handleExpiredRefreshToken();
                            }
                        }
                        break;
                }
            }
            return throwError(errResponse);
        }))));
    }
    isExpiredToken(resp) {
        return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
    }
}
AuthInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthInterceptor, deps: [{ token: i1.AuthHttpHeaderService }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.AuthHttpHeaderService }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxpQkFBaUIsR0FLbEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlsRTs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUNZLHFCQUE0QyxFQUM1QyxpQkFBb0M7UUFEcEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQzdDLENBQUM7SUFFSixTQUFTLENBQ1AsV0FBNkIsRUFDN0IsSUFBaUI7UUFFakIsTUFBTSxnQkFBZ0IsR0FDcEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELE1BQU0sNEJBQTRCLEdBQ2hDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RSxNQUFNLE1BQU0sR0FBRyw0QkFBNEI7WUFDekMsQ0FBQyxDQUFDLDBGQUEwRjtnQkFDMUYsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQ2xDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNkLEtBQUs7WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDO1NBQ3JFLENBQUMsQ0FBQyxDQUNKLENBQUM7UUFFRixPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FDMUIsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDdkIsVUFBVSxDQUFDLENBQUMsV0FBZ0IsRUFBRSxFQUFFO1lBQzlCLElBQUksV0FBVyxZQUFZLGlCQUFpQixFQUFFO2dCQUM1QyxRQUFRLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQzFCLEtBQUssR0FBRyxFQUFFLGVBQWU7d0JBQ3ZCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxnQkFBZ0IsRUFBRTs0QkFDeEQscURBQXFEOzRCQUNyRCx1R0FBdUc7NEJBQ3ZHLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLHdCQUF3QixDQUN4RCxPQUFPLEVBQ1AsSUFBSSxFQUNKLEtBQUssQ0FDTixDQUFDO3lCQUNIOzZCQUFNO3dCQUNMLDRCQUE0Qjt3QkFDNUIsNEZBQTRGO3dCQUM1RixXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQzFDOzRCQUNELFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLGVBQWUsRUFDM0M7NEJBQ0EsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixFQUFFLENBQUM7NEJBQ3ZELE9BQU8sRUFBRSxFQUFrQixDQUFDO3lCQUM3Qjt3QkFFRCxNQUFNO29CQUNSLEtBQUssR0FBRyxFQUFFLGNBQWM7d0JBQ3RCLElBQ0UsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUMxQzs0QkFDRCxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxlQUFlLEVBQzNDOzRCQUNBLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssZUFBZSxFQUFFO2dDQUN0RCxJQUFJLENBQUMscUJBQXFCLENBQUMseUJBQXlCLEVBQUUsQ0FBQzs2QkFDeEQ7eUJBQ0Y7d0JBQ0QsTUFBTTtpQkFDVDthQUNGO1lBQ0QsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRVMsY0FBYyxDQUFDLElBQXVCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssbUJBQW1CLENBQUM7SUFDL0QsQ0FBQzs7NEdBN0VVLGVBQWU7Z0hBQWYsZUFBZSxjQURGLE1BQU07MkZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEF1dGhDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoSHR0cEhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLWh0dHAtaGVhZGVyLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciBjYXRjaGluZyBhdXRoIGVycm9ycyBhbmQgcHJvdmlkaW5nIGBBdXRob3JpemF0aW9uYCBoZWFkZXIgZm9yIEFQSSBjYWxscy5cbiAqIFVzZXMgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlIGZvciByZXF1ZXN0IG1hbmlwdWxhdGlvbiBhbmQgZXJyb3IgaGFuZGxpbmcuIEludGVyY2VwdG9yIG9ubHkgaG9va3MgaW50byByZXF1ZXN0IHNlbmQvcmVjZWl2ZWQgZXZlbnRzLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoSHR0cEhlYWRlclNlcnZpY2U6IEF1dGhIdHRwSGVhZGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZ1NlcnZpY2U6IEF1dGhDb25maWdTZXJ2aWNlXG4gICkge31cblxuICBpbnRlcmNlcHQoXG4gICAgaHR0cFJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHNob3VsZENhdGNoRXJyb3IgPVxuICAgICAgdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2Uuc2hvdWxkQ2F0Y2hFcnJvcihodHRwUmVxdWVzdCk7XG4gICAgY29uc3Qgc2hvdWxkQWRkQXV0aG9yaXphdGlvbkhlYWRlciA9XG4gICAgICB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5zaG91bGRBZGRBdXRob3JpemF0aW9uSGVhZGVyKGh0dHBSZXF1ZXN0KTtcblxuICAgIGNvbnN0IHRva2VuJCA9IHNob3VsZEFkZEF1dGhvcml6YXRpb25IZWFkZXJcbiAgICAgID8gLy8gZW1pdHMgc3luYywgdW5sZXNzIHRoZXJlIGlzIHJlZnJlc2ggb3IgbG9nb3V0IGluIHByb2dyZXNzLCBpbiB3aGljaCBjYXNlIGl0IGVtaXRzIGFzeW5jXG4gICAgICAgIHRoaXMuYXV0aEh0dHBIZWFkZXJTZXJ2aWNlLmdldFN0YWJsZVRva2VuKCkucGlwZSh0YWtlKDEpKVxuICAgICAgOiBvZih1bmRlZmluZWQpO1xuICAgIGNvbnN0IHJlcXVlc3RBbmRUb2tlbiQgPSB0b2tlbiQucGlwZShcbiAgICAgIG1hcCgodG9rZW4pID0+ICh7XG4gICAgICAgIHRva2VuLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5hbHRlclJlcXVlc3QoaHR0cFJlcXVlc3QsIHRva2VuKSxcbiAgICAgIH0pKVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVxdWVzdEFuZFRva2VuJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKCh7IHJlcXVlc3QsIHRva2VuIH0pID0+XG4gICAgICAgIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVyclJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChlcnJSZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDQwMTogLy8gVW5hdXRob3JpemVkXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V4cGlyZWRUb2tlbihlcnJSZXNwb25zZSkgJiYgc2hvdWxkQ2F0Y2hFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGZhaWxlZCBiZWNhdXNlIG9mIHRoZSBleHBpcmVkIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgZ2V0IHJlZnJlc2ggdGhlIHRva2VuIGFuZCByZXRyeSB0aGUgcmVxdWVzdCwgb3IgbG9nb3V0IGlmIHRoZSByZWZyZXNoIGlzIG1pc3NpbmcgLyBleHBpcmVkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5oYW5kbGVFeHBpcmVkQWNjZXNzVG9rZW4oXG4gICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0LFxuICAgICAgICAgICAgICAgICAgICAgIHRva2VuXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSBleHBpcmVkIHRva2VuXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBPQXV0aCBlbmRwb2ludCB3YXMgY2FsbGVkIGFuZCB0aGUgZXJyb3IgaXMgYmVjYXVzZSB0aGUgcmVmcmVzaCB0b2tlbiBleHBpcmVkXG4gICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlLnVybD8uaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KClcbiAgICAgICAgICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgICAgICAgICBlcnJSZXNwb25zZS5lcnJvci5lcnJvciA9PT0gJ2ludmFsaWRfdG9rZW4nXG4gICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2UuaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Y8SHR0cEV2ZW50PGFueT4+KCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDAwOiAvLyBCYWQgUmVxdWVzdFxuICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBlcnJSZXNwb25zZS51cmw/LmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0VG9rZW5FbmRwb2ludCgpXG4gICAgICAgICAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UuZXJyb3IuZXJyb3IgPT09ICdpbnZhbGlkX2dyYW50J1xuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmJvZHkuZ2V0KCdncmFudF90eXBlJykgPT09ICdyZWZyZXNoX3Rva2VuJykge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aEh0dHBIZWFkZXJTZXJ2aWNlLmhhbmRsZUV4cGlyZWRSZWZyZXNoVG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVyclJlc3BvbnNlKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0V4cGlyZWRUb2tlbihyZXNwOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZXNwLmVycm9yPy5lcnJvcnM/LlswXT8udHlwZSA9PT0gJ0ludmFsaWRUb2tlbkVycm9yJztcbiAgfVxufVxuIl19