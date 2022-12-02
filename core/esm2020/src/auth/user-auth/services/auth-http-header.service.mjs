import { Injectable } from '@angular/core';
import { combineLatest, defer, EMPTY, queueScheduler, Subject, Subscription, using, } from 'rxjs';
import { filter, map, observeOn, pairwise, shareReplay, skipWhile, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import * as i0 from "@angular/core";
import * as i1 from "../facade/auth.service";
import * as i2 from "./auth-storage.service";
import * as i3 from "./oauth-lib-wrapper.service";
import * as i4 from "../../../routing/facade/routing.service";
import * as i5 from "../../../occ/services/occ-endpoints.service";
import * as i6 from "../../../global-message/facade/global-message.service";
import * as i7 from "./auth-redirect.service";
/**
 * Extendable service for `AuthInterceptor`.
 */
export class AuthHttpHeaderService {
    constructor(authService, authStorageService, oAuthLibWrapperService, routingService, occEndpoints, globalMessageService, authRedirectService) {
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.routingService = routingService;
        this.occEndpoints = occEndpoints;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        /**
         * Starts the refresh of the access token
         */
        this.refreshTokenTrigger$ = new Subject();
        /**
         * Internal token streams which reads the latest from the storage.
         * Emits the token or `undefined`
         */
        this.token$ = this.authStorageService
            .getToken()
            .pipe(map((token) => (token?.access_token ? token : undefined)));
        /**
         * Compares the previous and the new token in order to stop the refresh or logout processes
         */
        this.stopProgress$ = this.token$.pipe(
        // Keeps the previous and the new token
        pairwise(), tap(([oldToken, newToken]) => {
            // if we got the new token we know that either the refresh or logout finished
            if (oldToken?.access_token !== newToken?.access_token) {
                this.authService.setLogoutProgress(false);
                this.authService.setRefreshProgress(false);
            }
        }));
        /**
         * Refreshes the token only if currently there's no refresh nor logout in progress.
         * If the refresh token is not present, it triggers the logout process
         */
        this.refreshToken$ = this.refreshTokenTrigger$.pipe(withLatestFrom(this.authService.refreshInProgress$, this.authService.logoutInProgress$), filter(([, refreshInProgress, logoutInProgress]) => !refreshInProgress && !logoutInProgress), tap(([token]) => {
            if (token?.refresh_token) {
                this.oAuthLibWrapperService.refreshToken();
                this.authService.setRefreshProgress(true);
            }
            else {
                this.handleExpiredRefreshToken();
            }
        }));
        /**
         * Kicks of the process by listening to the new token and refresh token processes.
         * This token should be used when retrying the failed http request.
         */
        this.tokenToRetryRequest$ = using(() => this.refreshToken$.subscribe(), () => this.getStableToken()).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        this.subscriptions = new Subscription();
        // We need to have stopProgress$ stream active for the whole time,
        // so when the logout finishes we finish it's process.
        // It could happen when retryToken$ is not active.
        this.subscriptions.add(this.stopProgress$.subscribe());
    }
    /**
     * Checks if request should be handled by this service (if it's OCC call).
     */
    shouldCatchError(request) {
        return this.isOccUrl(request.url);
    }
    shouldAddAuthorizationHeader(request) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isOccUrl = this.isOccUrl(request.url);
        return !hasAuthorizationHeader && isOccUrl;
    }
    /**
     * Adds `Authorization` header for OCC calls.
     */
    alterRequest(request, token) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isOccUrl = this.isOccUrl(request.url);
        if (!hasAuthorizationHeader && isOccUrl) {
            return request.clone({
                setHeaders: {
                    ...this.createAuthorizationHeader(token),
                },
            });
        }
        return request;
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
    getAuthorizationHeader(request) {
        const rawValue = request.headers.get('Authorization');
        return rawValue;
    }
    createAuthorizationHeader(token) {
        if (token?.access_token) {
            return {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            };
        }
        let currentToken;
        this.authStorageService
            .getToken()
            .subscribe((authToken) => (currentToken = authToken))
            .unsubscribe();
        if (currentToken?.access_token) {
            return {
                Authorization: `${currentToken.token_type || 'Bearer'} ${currentToken.access_token}`,
            };
        }
        return {};
    }
    /**
     * Refreshes access_token and then retries the call with the new token.
     */
    handleExpiredAccessToken(request, next, initialToken) {
        return this.getValidToken(initialToken).pipe(switchMap((token) => 
        // we break the stream with EMPTY when we don't have the token. This prevents sending the requests with `Authorization: bearer undefined` header
        token
            ? next.handle(this.createNewRequestWithNewToken(request, token))
            : EMPTY));
    }
    /**
     * Logout user, redirected to login page and informs about expired session.
     */
    handleExpiredRefreshToken() {
        // There might be 2 cases:
        // 1. when user is already on some page (router is stable) and performs an UI action
        // that triggers http call (i.e. button click to save data in backend)
        // 2. when user is navigating to some page and a route guard triggers the http call
        // (i.e. guard loading cms page data)
        //
        // In the second case, we want to remember the anticipated url before we navigate to
        // the login page, so we can redirect back to that URL after user authenticates.
        this.authRedirectService.saveCurrentNavigationUrl();
        // Logout user
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService.coreLogout().finally(() => {
            this.routingService.go({ cxRoute: 'login' });
            this.globalMessageService.add({
                key: 'httpHandlers.sessionExpired',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    /**
     * Emits the token or `undefined` only when the refresh or the logout processes are finished.
     */
    getStableToken() {
        return combineLatest([
            this.token$,
            this.authService.refreshInProgress$,
            this.authService.logoutInProgress$,
        ]).pipe(observeOn(queueScheduler), filter(([_, refreshInProgress, logoutInProgress]) => !refreshInProgress && !logoutInProgress), switchMap(() => this.token$));
    }
    /**
     * Returns a valid access token.
     * It will attempt to refresh it if the current one expired; emits after the new one is retrieved.
     */
    getValidToken(requestToken) {
        return defer(() => {
            // flag to only refresh token only on first emission
            let refreshTriggered = false;
            return this.tokenToRetryRequest$.pipe(tap((token) => {
                // we want to refresh the access token only when it is old.
                // this is a guard for the case when there are multiple parallel http calls
                if (token?.access_token === requestToken?.access_token &&
                    !refreshTriggered) {
                    this.refreshTokenTrigger$.next(token);
                }
                refreshTriggered = true;
            }), skipWhile((token) => token?.access_token === requestToken?.access_token), take(1));
        });
    }
    createNewRequestWithNewToken(request, token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            },
        });
        return request;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
AuthHttpHeaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthHttpHeaderService, deps: [{ token: i1.AuthService }, { token: i2.AuthStorageService }, { token: i3.OAuthLibWrapperService }, { token: i4.RoutingService }, { token: i5.OccEndpointsService }, { token: i6.GlobalMessageService }, { token: i7.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthHttpHeaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthHttpHeaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthHttpHeaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.AuthStorageService }, { type: i3.OAuthLibWrapperService }, { type: i4.RoutingService }, { type: i5.OccEndpointsService }, { type: i6.GlobalMessageService }, { type: i7.AuthRedirectService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLGFBQWEsRUFDYixLQUFLLEVBQ0wsS0FBSyxFQUVMLGNBQWMsRUFDZCxPQUFPLEVBQ1AsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUNKLEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQzs7Ozs7Ozs7O0FBU3hGOztHQUVHO0FBSUgsTUFBTSxPQUFPLHFCQUFxQjtJQStEaEMsWUFDWSxXQUF3QixFQUN4QixrQkFBc0MsRUFDdEMsc0JBQThDLEVBQzlDLGNBQThCLEVBQzlCLFlBQWlDLEVBQ2pDLG9CQUEwQyxFQUMxQyxtQkFBd0M7UUFOeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBckVwRDs7V0FFRztRQUNPLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7UUFFMUQ7OztXQUdHO1FBQ08sV0FBTSxHQUFzQyxJQUFJLENBQUMsa0JBQWtCO2FBQzFFLFFBQVEsRUFBRTthQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkU7O1dBRUc7UUFDTyxrQkFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtRQUN4Qyx1Q0FBdUM7UUFDdkMsUUFBUSxFQUFFLEVBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUMzQiw2RUFBNkU7WUFDN0UsSUFBSSxRQUFRLEVBQUUsWUFBWSxLQUFLLFFBQVEsRUFBRSxZQUFZLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUY7OztXQUdHO1FBQ08sa0JBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUN0RCxjQUFjLENBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FDbkMsRUFDRCxNQUFNLENBQ0osQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLENBQzFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FDMUMsRUFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDZCxJQUFJLEtBQUssRUFBRSxhQUFhLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDTCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzthQUNsQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRjs7O1dBR0c7UUFDTyx5QkFBb0IsR0FBRyxLQUFLLENBQ3BDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEVBQ3BDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FDNUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTdDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVczQyxrRUFBa0U7UUFDbEUsc0RBQXNEO1FBQ3RELGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksZ0JBQWdCLENBQUMsT0FBeUI7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sNEJBQTRCLENBQUMsT0FBeUI7UUFDM0QsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxzQkFBc0IsSUFBSSxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksWUFBWSxDQUNqQixPQUF5QixFQUN6QixLQUFpQjtRQUVqQixNQUFNLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLFFBQVEsRUFBRTtZQUN2QyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ25CLFVBQVUsRUFBRTtvQkFDVixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUM7aUJBQ3pDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRVMsUUFBUSxDQUFDLEdBQVc7UUFDNUIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRVMsc0JBQXNCLENBQUMsT0FBeUI7UUFDeEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVTLHlCQUF5QixDQUNqQyxLQUFpQjtRQUVqQixJQUFJLEtBQUssRUFBRSxZQUFZLEVBQUU7WUFDdkIsT0FBTztnQkFDTCxhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO2FBQ3ZFLENBQUM7U0FDSDtRQUNELElBQUksWUFBbUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUM7YUFDcEQsV0FBVyxFQUFFLENBQUM7UUFFakIsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFO1lBQzlCLE9BQU87Z0JBQ0wsYUFBYSxFQUFFLEdBQUcsWUFBWSxDQUFDLFVBQVUsSUFBSSxRQUFRLElBQ25ELFlBQVksQ0FBQyxZQUNmLEVBQUU7YUFDSCxDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUNJLHdCQUF3QixDQUM3QixPQUF5QixFQUN6QixJQUFpQixFQUNqQixZQUFtQztRQUVuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUMxQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNsQixnSkFBZ0o7UUFDaEosS0FBSztZQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLEtBQUssQ0FDVixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSx5QkFBeUI7UUFDOUIsMEJBQTBCO1FBQzFCLG9GQUFvRjtRQUNwRixzRUFBc0U7UUFDdEUsbUZBQW1GO1FBQ25GLHFDQUFxQztRQUNyQyxFQUFFO1FBQ0Ysb0ZBQW9GO1FBQ3BGLGdGQUFnRjtRQUNoRixJQUFJLENBQUMsbUJBQW1CLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUVwRCxjQUFjO1FBQ2QsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCO2dCQUNFLEdBQUcsRUFBRSw2QkFBNkI7YUFDbkMsRUFDRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixPQUFPLGFBQWEsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCO1NBQ25DLENBQUMsQ0FBQyxJQUFJLENBQ0wsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUN6QixNQUFNLENBQ0osQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsQ0FDM0MsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGdCQUFnQixDQUMxQyxFQUNELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sYUFBYSxDQUNyQixZQUFtQztRQUVuQyxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDaEIsb0RBQW9EO1lBQ3BELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDbkMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1osMkRBQTJEO2dCQUMzRCwyRUFBMkU7Z0JBQzNFLElBQ0UsS0FBSyxFQUFFLFlBQVksS0FBSyxZQUFZLEVBQUUsWUFBWTtvQkFDbEQsQ0FBQyxnQkFBZ0IsRUFDakI7b0JBQ0EsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkM7Z0JBQ0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FDUCxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksS0FBSyxZQUFZLEVBQUUsWUFBWSxDQUM5RCxFQUNELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsNEJBQTRCLENBQ3BDLE9BQXlCLEVBQ3pCLEtBQWdCO1FBRWhCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3RCLFVBQVUsRUFBRTtnQkFDVixhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFO2FBQ3ZFO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O2tIQTNQVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCxcbiAgZGVmZXIsXG4gIEVNUFRZLFxuICBPYnNlcnZhYmxlLFxuICBxdWV1ZVNjaGVkdWxlcixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxuICB1c2luZyxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBmaWx0ZXIsXG4gIG1hcCxcbiAgb2JzZXJ2ZU9uLFxuICBwYWlyd2lzZSxcbiAgc2hhcmVSZXBsYXksXG4gIHNraXBXaGlsZSxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2dsb2JhbC1tZXNzYWdlL2ZhY2FkZS9nbG9iYWwtbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vLi4vLi4vZ2xvYmFsLW1lc3NhZ2UvbW9kZWxzL2dsb2JhbC1tZXNzYWdlLm1vZGVsJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9vY2Mvc2VydmljZXMvb2NjLWVuZHBvaW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcm91dGluZy9mYWNhZGUvcm91dGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vZmFjYWRlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoVG9rZW4gfSBmcm9tICcuLi9tb2RlbHMvYXV0aC10b2tlbi5tb2RlbCc7XG5pbXBvcnQgeyBBdXRoUmVkaXJlY3RTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLXJlZGlyZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPQXV0aExpYldyYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1saWItd3JhcHBlci5zZXJ2aWNlJztcblxuLyoqXG4gKiBFeHRlbmRhYmxlIHNlcnZpY2UgZm9yIGBBdXRoSW50ZXJjZXB0b3JgLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgcmVmcmVzaCBvZiB0aGUgYWNjZXNzIHRva2VuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVmcmVzaFRva2VuVHJpZ2dlciQgPSBuZXcgU3ViamVjdDxBdXRoVG9rZW4+KCk7XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHRva2VuIHN0cmVhbXMgd2hpY2ggcmVhZHMgdGhlIGxhdGVzdCBmcm9tIHRoZSBzdG9yYWdlLlxuICAgKiBFbWl0cyB0aGUgdG9rZW4gb3IgYHVuZGVmaW5lZGBcbiAgICovXG4gIHByb3RlY3RlZCB0b2tlbiQ6IE9ic2VydmFibGU8QXV0aFRva2VuIHwgdW5kZWZpbmVkPiA9IHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlXG4gICAgLmdldFRva2VuKClcbiAgICAucGlwZShtYXAoKHRva2VuKSA9PiAodG9rZW4/LmFjY2Vzc190b2tlbiA/IHRva2VuIDogdW5kZWZpbmVkKSkpO1xuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0aGUgcHJldmlvdXMgYW5kIHRoZSBuZXcgdG9rZW4gaW4gb3JkZXIgdG8gc3RvcCB0aGUgcmVmcmVzaCBvciBsb2dvdXQgcHJvY2Vzc2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RvcFByb2dyZXNzJCA9IHRoaXMudG9rZW4kLnBpcGUoXG4gICAgLy8gS2VlcHMgdGhlIHByZXZpb3VzIGFuZCB0aGUgbmV3IHRva2VuXG4gICAgcGFpcndpc2UoKSxcbiAgICB0YXAoKFtvbGRUb2tlbiwgbmV3VG9rZW5dKSA9PiB7XG4gICAgICAvLyBpZiB3ZSBnb3QgdGhlIG5ldyB0b2tlbiB3ZSBrbm93IHRoYXQgZWl0aGVyIHRoZSByZWZyZXNoIG9yIGxvZ291dCBmaW5pc2hlZFxuICAgICAgaWYgKG9sZFRva2VuPy5hY2Nlc3NfdG9rZW4gIT09IG5ld1Rva2VuPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5zZXRMb2dvdXRQcm9ncmVzcyhmYWxzZSk7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uuc2V0UmVmcmVzaFByb2dyZXNzKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIHRva2VuIG9ubHkgaWYgY3VycmVudGx5IHRoZXJlJ3Mgbm8gcmVmcmVzaCBub3IgbG9nb3V0IGluIHByb2dyZXNzLlxuICAgKiBJZiB0aGUgcmVmcmVzaCB0b2tlbiBpcyBub3QgcHJlc2VudCwgaXQgdHJpZ2dlcnMgdGhlIGxvZ291dCBwcm9jZXNzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVmcmVzaFRva2VuJCA9IHRoaXMucmVmcmVzaFRva2VuVHJpZ2dlciQucGlwZShcbiAgICB3aXRoTGF0ZXN0RnJvbShcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVmcmVzaEluUHJvZ3Jlc3MkLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXRJblByb2dyZXNzJFxuICAgICksXG4gICAgZmlsdGVyKFxuICAgICAgKFssIHJlZnJlc2hJblByb2dyZXNzLCBsb2dvdXRJblByb2dyZXNzXSkgPT5cbiAgICAgICAgIXJlZnJlc2hJblByb2dyZXNzICYmICFsb2dvdXRJblByb2dyZXNzXG4gICAgKSxcbiAgICB0YXAoKFt0b2tlbl0pID0+IHtcbiAgICAgIGlmICh0b2tlbj8ucmVmcmVzaF90b2tlbikge1xuICAgICAgICB0aGlzLm9BdXRoTGliV3JhcHBlclNlcnZpY2UucmVmcmVzaFRva2VuKCk7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uuc2V0UmVmcmVzaFByb2dyZXNzKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFeHBpcmVkUmVmcmVzaFRva2VuKCk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICAvKipcbiAgICogS2lja3Mgb2YgdGhlIHByb2Nlc3MgYnkgbGlzdGVuaW5nIHRvIHRoZSBuZXcgdG9rZW4gYW5kIHJlZnJlc2ggdG9rZW4gcHJvY2Vzc2VzLlxuICAgKiBUaGlzIHRva2VuIHNob3VsZCBiZSB1c2VkIHdoZW4gcmV0cnlpbmcgdGhlIGZhaWxlZCBodHRwIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgdG9rZW5Ub1JldHJ5UmVxdWVzdCQgPSB1c2luZyhcbiAgICAoKSA9PiB0aGlzLnJlZnJlc2hUb2tlbiQuc3Vic2NyaWJlKCksXG4gICAgKCkgPT4gdGhpcy5nZXRTdGFibGVUb2tlbigpXG4gICkucGlwZShzaGFyZVJlcGxheSh7IHJlZkNvdW50OiB0cnVlLCBidWZmZXJTaXplOiAxIH0pKTtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb0F1dGhMaWJXcmFwcGVyU2VydmljZTogT0F1dGhMaWJXcmFwcGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZVxuICApIHtcbiAgICAvLyBXZSBuZWVkIHRvIGhhdmUgc3RvcFByb2dyZXNzJCBzdHJlYW0gYWN0aXZlIGZvciB0aGUgd2hvbGUgdGltZSxcbiAgICAvLyBzbyB3aGVuIHRoZSBsb2dvdXQgZmluaXNoZXMgd2UgZmluaXNoIGl0J3MgcHJvY2Vzcy5cbiAgICAvLyBJdCBjb3VsZCBoYXBwZW4gd2hlbiByZXRyeVRva2VuJCBpcyBub3QgYWN0aXZlLlxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5zdG9wUHJvZ3Jlc3MkLnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgcmVxdWVzdCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGlzIHNlcnZpY2UgKGlmIGl0J3MgT0NDIGNhbGwpLlxuICAgKi9cbiAgcHVibGljIHNob3VsZENhdGNoRXJyb3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzT2NjVXJsKHJlcXVlc3QudXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRBZGRBdXRob3JpemF0aW9uSGVhZGVyKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICBjb25zdCBoYXNBdXRob3JpemF0aW9uSGVhZGVyID0gISF0aGlzLmdldEF1dGhvcml6YXRpb25IZWFkZXIocmVxdWVzdCk7XG4gICAgY29uc3QgaXNPY2NVcmwgPSB0aGlzLmlzT2NjVXJsKHJlcXVlc3QudXJsKTtcbiAgICByZXR1cm4gIWhhc0F1dGhvcml6YXRpb25IZWFkZXIgJiYgaXNPY2NVcmw7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBgQXV0aG9yaXphdGlvbmAgaGVhZGVyIGZvciBPQ0MgY2FsbHMuXG4gICAqL1xuICBwdWJsaWMgYWx0ZXJSZXF1ZXN0KFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgdG9rZW4/OiBBdXRoVG9rZW5cbiAgKTogSHR0cFJlcXVlc3Q8YW55PiB7XG4gICAgY29uc3QgaGFzQXV0aG9yaXphdGlvbkhlYWRlciA9ICEhdGhpcy5nZXRBdXRob3JpemF0aW9uSGVhZGVyKHJlcXVlc3QpO1xuICAgIGNvbnN0IGlzT2NjVXJsID0gdGhpcy5pc09jY1VybChyZXF1ZXN0LnVybCk7XG4gICAgaWYgKCFoYXNBdXRob3JpemF0aW9uSGVhZGVyICYmIGlzT2NjVXJsKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdC5jbG9uZSh7XG4gICAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgICAuLi50aGlzLmNyZWF0ZUF1dGhvcml6YXRpb25IZWFkZXIodG9rZW4pLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzT2NjVXJsKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHVybC5pbmNsdWRlcyh0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEF1dGhvcml6YXRpb25IZWFkZXIocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IHJhd1ZhbHVlID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpO1xuICAgIHJldHVybiByYXdWYWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVBdXRob3JpemF0aW9uSGVhZGVyKFxuICAgIHRva2VuPzogQXV0aFRva2VuXG4gICk6IHsgQXV0aG9yaXphdGlvbjogc3RyaW5nIH0gfCB7fSB7XG4gICAgaWYgKHRva2VuPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGAke3Rva2VuLnRva2VuX3R5cGUgfHwgJ0JlYXJlcid9ICR7dG9rZW4uYWNjZXNzX3Rva2VufWAsXG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgY3VycmVudFRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWQ7XG4gICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2VcbiAgICAgIC5nZXRUb2tlbigpXG4gICAgICAuc3Vic2NyaWJlKChhdXRoVG9rZW4pID0+IChjdXJyZW50VG9rZW4gPSBhdXRoVG9rZW4pKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG5cbiAgICBpZiAoY3VycmVudFRva2VuPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGAke2N1cnJlbnRUb2tlbi50b2tlbl90eXBlIHx8ICdCZWFyZXInfSAke1xuICAgICAgICAgIGN1cnJlbnRUb2tlbi5hY2Nlc3NfdG9rZW5cbiAgICAgICAgfWAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIGFjY2Vzc190b2tlbiBhbmQgdGhlbiByZXRyaWVzIHRoZSBjYWxsIHdpdGggdGhlIG5ldyB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBoYW5kbGVFeHBpcmVkQWNjZXNzVG9rZW4oXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlcixcbiAgICBpbml0aWFsVG9rZW46IEF1dGhUb2tlbiB8IHVuZGVmaW5lZFxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxBdXRoVG9rZW4+PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWRUb2tlbihpbml0aWFsVG9rZW4pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHRva2VuKSA9PlxuICAgICAgICAvLyB3ZSBicmVhayB0aGUgc3RyZWFtIHdpdGggRU1QVFkgd2hlbiB3ZSBkb24ndCBoYXZlIHRoZSB0b2tlbi4gVGhpcyBwcmV2ZW50cyBzZW5kaW5nIHRoZSByZXF1ZXN0cyB3aXRoIGBBdXRob3JpemF0aW9uOiBiZWFyZXIgdW5kZWZpbmVkYCBoZWFkZXJcbiAgICAgICAgdG9rZW5cbiAgICAgICAgICA/IG5leHQuaGFuZGxlKHRoaXMuY3JlYXRlTmV3UmVxdWVzdFdpdGhOZXdUb2tlbihyZXF1ZXN0LCB0b2tlbikpXG4gICAgICAgICAgOiBFTVBUWVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9nb3V0IHVzZXIsIHJlZGlyZWN0ZWQgdG8gbG9naW4gcGFnZSBhbmQgaW5mb3JtcyBhYm91dCBleHBpcmVkIHNlc3Npb24uXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpOiB2b2lkIHtcbiAgICAvLyBUaGVyZSBtaWdodCBiZSAyIGNhc2VzOlxuICAgIC8vIDEuIHdoZW4gdXNlciBpcyBhbHJlYWR5IG9uIHNvbWUgcGFnZSAocm91dGVyIGlzIHN0YWJsZSkgYW5kIHBlcmZvcm1zIGFuIFVJIGFjdGlvblxuICAgIC8vIHRoYXQgdHJpZ2dlcnMgaHR0cCBjYWxsIChpLmUuIGJ1dHRvbiBjbGljayB0byBzYXZlIGRhdGEgaW4gYmFja2VuZClcbiAgICAvLyAyLiB3aGVuIHVzZXIgaXMgbmF2aWdhdGluZyB0byBzb21lIHBhZ2UgYW5kIGEgcm91dGUgZ3VhcmQgdHJpZ2dlcnMgdGhlIGh0dHAgY2FsbFxuICAgIC8vIChpLmUuIGd1YXJkIGxvYWRpbmcgY21zIHBhZ2UgZGF0YSlcbiAgICAvL1xuICAgIC8vIEluIHRoZSBzZWNvbmQgY2FzZSwgd2Ugd2FudCB0byByZW1lbWJlciB0aGUgYW50aWNpcGF0ZWQgdXJsIGJlZm9yZSB3ZSBuYXZpZ2F0ZSB0b1xuICAgIC8vIHRoZSBsb2dpbiBwYWdlLCBzbyB3ZSBjYW4gcmVkaXJlY3QgYmFjayB0byB0aGF0IFVSTCBhZnRlciB1c2VyIGF1dGhlbnRpY2F0ZXMuXG4gICAgdGhpcy5hdXRoUmVkaXJlY3RTZXJ2aWNlLnNhdmVDdXJyZW50TmF2aWdhdGlvblVybCgpO1xuXG4gICAgLy8gTG9nb3V0IHVzZXJcbiAgICAvLyBUT0RPKCM5NjM4KTogVXNlIGxvZ291dCByb3V0ZSB3aGVuIGl0IHdpbGwgc3VwcG9ydCBwYXNzaW5nIHJlZGlyZWN0IHVybFxuICAgIHRoaXMuYXV0aFNlcnZpY2UuY29yZUxvZ291dCgpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdsb2dpbicgfSk7XG5cbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnaHR0cEhhbmRsZXJzLnNlc3Npb25FeHBpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgdGhlIHRva2VuIG9yIGB1bmRlZmluZWRgIG9ubHkgd2hlbiB0aGUgcmVmcmVzaCBvciB0aGUgbG9nb3V0IHByb2Nlc3NlcyBhcmUgZmluaXNoZWQuXG4gICAqL1xuICBnZXRTdGFibGVUb2tlbigpOiBPYnNlcnZhYmxlPEF1dGhUb2tlbiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudG9rZW4kLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWZyZXNoSW5Qcm9ncmVzcyQsXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dEluUHJvZ3Jlc3MkLFxuICAgIF0pLnBpcGUoXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoW18sIHJlZnJlc2hJblByb2dyZXNzLCBsb2dvdXRJblByb2dyZXNzXSkgPT5cbiAgICAgICAgICAhcmVmcmVzaEluUHJvZ3Jlc3MgJiYgIWxvZ291dEluUHJvZ3Jlc3NcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy50b2tlbiQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmFsaWQgYWNjZXNzIHRva2VuLlxuICAgKiBJdCB3aWxsIGF0dGVtcHQgdG8gcmVmcmVzaCBpdCBpZiB0aGUgY3VycmVudCBvbmUgZXhwaXJlZDsgZW1pdHMgYWZ0ZXIgdGhlIG5ldyBvbmUgaXMgcmV0cmlldmVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFZhbGlkVG9rZW4oXG4gICAgcmVxdWVzdFRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWRcbiAgKTogT2JzZXJ2YWJsZTxBdXRoVG9rZW4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgLy8gZmxhZyB0byBvbmx5IHJlZnJlc2ggdG9rZW4gb25seSBvbiBmaXJzdCBlbWlzc2lvblxuICAgICAgbGV0IHJlZnJlc2hUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuVG9SZXRyeVJlcXVlc3QkLnBpcGUoXG4gICAgICAgIHRhcCgodG9rZW4pID0+IHtcbiAgICAgICAgICAvLyB3ZSB3YW50IHRvIHJlZnJlc2ggdGhlIGFjY2VzcyB0b2tlbiBvbmx5IHdoZW4gaXQgaXMgb2xkLlxuICAgICAgICAgIC8vIHRoaXMgaXMgYSBndWFyZCBmb3IgdGhlIGNhc2Ugd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFyYWxsZWwgaHR0cCBjYWxsc1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRva2VuPy5hY2Nlc3NfdG9rZW4gPT09IHJlcXVlc3RUb2tlbj8uYWNjZXNzX3Rva2VuICYmXG4gICAgICAgICAgICAhcmVmcmVzaFRyaWdnZXJlZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW5UcmlnZ2VyJC5uZXh0KHRva2VuKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVmcmVzaFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIH0pLFxuICAgICAgICBza2lwV2hpbGUoXG4gICAgICAgICAgKHRva2VuKSA9PiB0b2tlbj8uYWNjZXNzX3Rva2VuID09PSByZXF1ZXN0VG9rZW4/LmFjY2Vzc190b2tlblxuICAgICAgICApLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld1JlcXVlc3RXaXRoTmV3VG9rZW4oXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICB0b2tlbjogQXV0aFRva2VuXG4gICk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYCR7dG9rZW4udG9rZW5fdHlwZSB8fCAnQmVhcmVyJ30gJHt0b2tlbi5hY2Nlc3NfdG9rZW59YCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19