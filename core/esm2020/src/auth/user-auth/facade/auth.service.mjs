/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { AuthActions } from '../store/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "./user-id.service";
import * as i3 from "../services/oauth-lib-wrapper.service";
import * as i4 from "../services/auth-storage.service";
import * as i5 from "../services/auth-redirect.service";
import * as i6 from "../../../routing/facade/routing.service";
/**
 * Auth service for normal user authentication.
 * Use to check auth status, login/logout with different OAuth flows.
 */
export class AuthService {
    constructor(store, userIdService, oAuthLibWrapperService, authStorageService, authRedirectService, routingService) {
        this.store = store;
        this.userIdService = userIdService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.authStorageService = authStorageService;
        this.authRedirectService = authRedirectService;
        this.routingService = routingService;
        /**
         * Indicates whether the access token is being refreshed
         */
        this.refreshInProgress$ = new BehaviorSubject(false);
        /**
         * Indicates whether the logout is being performed
         */
        this.logoutInProgress$ = new BehaviorSubject(false);
    }
    /**
     * Check params in url and if there is an code/token then try to login with those.
     */
    async checkOAuthParamsInUrl() {
        try {
            const loginResult = await this.oAuthLibWrapperService.tryLogin();
            const token = this.authStorageService.getItem('access_token');
            // We get the value `true` of `result` in the _code flow_ even if we did not log in successfully
            // (see source code https://github.com/manfredsteyer/angular-oauth2-oidc/blob/d95d7da788e2c1390346c66de62dc31f10d2b852/projects/lib/src/oauth-service.ts#L1711),
            // that why we also need to check if we have access_token
            if (loginResult.result && token) {
                this.userIdService.setUserId(OCC_USER_ID_CURRENT);
                this.store.dispatch(new AuthActions.Login());
                // We check if the token was received during the `tryLogin()` attempt.
                // If so, we will redirect as we can deduce we are returning from the authentication server.
                // Redirection should not be done in cases we get the token from storage (eg. refreshing the page).
                if (loginResult.tokenReceived) {
                    this.authRedirectService.redirect();
                }
            }
        }
        catch { }
    }
    /**
     * Initialize Implicit/Authorization Code flow by redirecting to OAuth server.
     */
    loginWithRedirect() {
        this.oAuthLibWrapperService.initLoginFlow();
        return true;
    }
    /**
     * Loads a new user token with Resource Owner Password Flow.
     * @param userId
     * @param password
     */
    async loginWithCredentials(userId, password) {
        try {
            await this.oAuthLibWrapperService.authorizeWithPasswordFlow(userId, password);
            // OCC specific user id handling. Customize when implementing different backend
            this.userIdService.setUserId(OCC_USER_ID_CURRENT);
            this.store.dispatch(new AuthActions.Login());
            this.authRedirectService.redirect();
        }
        catch { }
    }
    /**
     * Revokes tokens and clears state for logged user (tokens, userId).
     * To perform logout it is best to use `logout` method. Use this method with caution.
     */
    coreLogout() {
        this.setLogoutProgress(true);
        this.userIdService.clearUserId();
        return new Promise((resolve) => {
            this.oAuthLibWrapperService.revokeAndLogout().finally(() => {
                this.store.dispatch(new AuthActions.Logout());
                this.setLogoutProgress(false);
                resolve();
            });
        });
    }
    /**
     * Returns `true` if the user is logged in; and `false` if the user is anonymous.
     */
    isUserLoggedIn() {
        return this.authStorageService.getToken().pipe(map((userToken) => Boolean(userToken?.access_token)), distinctUntilChanged());
    }
    /**
     * Logout a storefront customer. It will initialize logout procedure by redirecting to the `logout` endpoint.
     */
    logout() {
        this.routingService.go({ cxRoute: 'logout' });
    }
    /**
     * Start or stop the refresh process
     */
    setRefreshProgress(progress) {
        this.refreshInProgress$.next(progress);
    }
    /**
     * Start or stop the logout process
     */
    setLogoutProgress(progress) {
        this.logoutInProgress$.next(progress);
    }
}
AuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i3.OAuthLibWrapperService }, { token: i4.AuthStorageService }, { token: i5.AuthRedirectService }, { token: i6.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i3.OAuthLibWrapperService }, { type: i4.AuthStorageService }, { type: i5.AuthRedirectService }, { type: i6.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvZmFjYWRlL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU92RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7O0FBR3JEOzs7R0FHRztBQUlILE1BQU0sT0FBTyxXQUFXO0lBV3RCLFlBQ1ksS0FBaUMsRUFDakMsYUFBNEIsRUFDNUIsc0JBQThDLEVBQzlDLGtCQUFzQyxFQUN0QyxtQkFBd0MsRUFDeEMsY0FBOEI7UUFMOUIsVUFBSyxHQUFMLEtBQUssQ0FBNEI7UUFDakMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBaEIxQzs7V0FFRztRQUNILHVCQUFrQixHQUF3QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUU5RTs7V0FFRztRQUNILHNCQUFpQixHQUF3QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQVMxRSxDQUFDO0lBRUo7O09BRUc7SUFDSCxLQUFLLENBQUMscUJBQXFCO1FBQ3pCLElBQUk7WUFDRixNQUFNLFdBQVcsR0FDZixNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUvQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTlELGdHQUFnRztZQUNoRyxnS0FBZ0s7WUFDaEsseURBQXlEO1lBQ3pELElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTdDLHNFQUFzRTtnQkFDdEUsNEZBQTRGO2dCQUM1RixtR0FBbUc7Z0JBQ25HLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtvQkFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNyQzthQUNGO1NBQ0Y7UUFBQyxNQUFNLEdBQUU7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFDZixJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0I7UUFDekQsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLHlCQUF5QixDQUN6RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUM7WUFDRiwrRUFBK0U7WUFDL0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyQztRQUFDLE1BQU0sR0FBRTtJQUNaLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQzVDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUNwRCxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCLENBQUMsUUFBaUI7UUFDakMsSUFBSSxDQUFDLGtCQUErQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUIsQ0FBQyxRQUFpQjtRQUNoQyxJQUFJLENBQUMsaUJBQThDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O3dHQXhIVSxXQUFXOzRHQUFYLFdBQVcsY0FGVixNQUFNOzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPQ0NfVVNFUl9JRF9DVVJSRU5UIH0gZnJvbSAnLi4vLi4vLi4vb2NjL3V0aWxzL29jYy1jb25zdGFudHMnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL2ZhY2FkZS9yb3V0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGVXaXRoQ2xpZW50QXV0aCB9IGZyb20gJy4uLy4uL2NsaWVudC1hdXRoL3N0b3JlL2NsaWVudC1hdXRoLXN0YXRlJztcbmltcG9ydCB7IE9BdXRoVHJ5TG9naW5SZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvb2F1dGgtdHJ5LWxvZ2luLXJlc3BvbnNlJztcbmltcG9ydCB7IEF1dGhSZWRpcmVjdFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLXJlZGlyZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT0F1dGhMaWJXcmFwcGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL29hdXRoLWxpYi13cmFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aEFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFVzZXJJZFNlcnZpY2UgfSBmcm9tICcuL3VzZXItaWQuc2VydmljZSc7XG5cbi8qKlxuICogQXV0aCBzZXJ2aWNlIGZvciBub3JtYWwgdXNlciBhdXRoZW50aWNhdGlvbi5cbiAqIFVzZSB0byBjaGVjayBhdXRoIHN0YXR1cywgbG9naW4vbG9nb3V0IHdpdGggZGlmZmVyZW50IE9BdXRoIGZsb3dzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFjY2VzcyB0b2tlbiBpcyBiZWluZyByZWZyZXNoZWRcbiAgICovXG4gIHJlZnJlc2hJblByb2dyZXNzJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgbG9nb3V0IGlzIGJlaW5nIHBlcmZvcm1lZFxuICAgKi9cbiAgbG9nb3V0SW5Qcm9ncmVzcyQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENsaWVudEF1dGg+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ2hlY2sgcGFyYW1zIGluIHVybCBhbmQgaWYgdGhlcmUgaXMgYW4gY29kZS90b2tlbiB0aGVuIHRyeSB0byBsb2dpbiB3aXRoIHRob3NlLlxuICAgKi9cbiAgYXN5bmMgY2hlY2tPQXV0aFBhcmFtc0luVXJsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsb2dpblJlc3VsdDogT0F1dGhUcnlMb2dpblJlc3VsdCA9XG4gICAgICAgIGF3YWl0IHRoaXMub0F1dGhMaWJXcmFwcGVyU2VydmljZS50cnlMb2dpbigpO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuXG4gICAgICAvLyBXZSBnZXQgdGhlIHZhbHVlIGB0cnVlYCBvZiBgcmVzdWx0YCBpbiB0aGUgX2NvZGUgZmxvd18gZXZlbiBpZiB3ZSBkaWQgbm90IGxvZyBpbiBzdWNjZXNzZnVsbHlcbiAgICAgIC8vIChzZWUgc291cmNlIGNvZGUgaHR0cHM6Ly9naXRodWIuY29tL21hbmZyZWRzdGV5ZXIvYW5ndWxhci1vYXV0aDItb2lkYy9ibG9iL2Q5NWQ3ZGE3ODhlMmMxMzkwMzQ2YzY2ZGU2MmRjMzFmMTBkMmI4NTIvcHJvamVjdHMvbGliL3NyYy9vYXV0aC1zZXJ2aWNlLnRzI0wxNzExKSxcbiAgICAgIC8vIHRoYXQgd2h5IHdlIGFsc28gbmVlZCB0byBjaGVjayBpZiB3ZSBoYXZlIGFjY2Vzc190b2tlblxuICAgICAgaWYgKGxvZ2luUmVzdWx0LnJlc3VsdCAmJiB0b2tlbikge1xuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2Uuc2V0VXNlcklkKE9DQ19VU0VSX0lEX0NVUlJFTlQpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dpbigpKTtcblxuICAgICAgICAvLyBXZSBjaGVjayBpZiB0aGUgdG9rZW4gd2FzIHJlY2VpdmVkIGR1cmluZyB0aGUgYHRyeUxvZ2luKClgIGF0dGVtcHQuXG4gICAgICAgIC8vIElmIHNvLCB3ZSB3aWxsIHJlZGlyZWN0IGFzIHdlIGNhbiBkZWR1Y2Ugd2UgYXJlIHJldHVybmluZyBmcm9tIHRoZSBhdXRoZW50aWNhdGlvbiBzZXJ2ZXIuXG4gICAgICAgIC8vIFJlZGlyZWN0aW9uIHNob3VsZCBub3QgYmUgZG9uZSBpbiBjYXNlcyB3ZSBnZXQgdGhlIHRva2VuIGZyb20gc3RvcmFnZSAoZWcuIHJlZnJlc2hpbmcgdGhlIHBhZ2UpLlxuICAgICAgICBpZiAobG9naW5SZXN1bHQudG9rZW5SZWNlaXZlZCkge1xuICAgICAgICAgIHRoaXMuYXV0aFJlZGlyZWN0U2VydmljZS5yZWRpcmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgSW1wbGljaXQvQXV0aG9yaXphdGlvbiBDb2RlIGZsb3cgYnkgcmVkaXJlY3RpbmcgdG8gT0F1dGggc2VydmVyLlxuICAgKi9cbiAgbG9naW5XaXRoUmVkaXJlY3QoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLmluaXRMb2dpbkZsb3coKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyB1c2VyIHRva2VuIHdpdGggUmVzb3VyY2UgT3duZXIgUGFzc3dvcmQgRmxvdy5cbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIGFzeW5jIGxvZ2luV2l0aENyZWRlbnRpYWxzKHVzZXJJZDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMub0F1dGhMaWJXcmFwcGVyU2VydmljZS5hdXRob3JpemVXaXRoUGFzc3dvcmRGbG93KFxuICAgICAgICB1c2VySWQsXG4gICAgICAgIHBhc3N3b3JkXG4gICAgICApO1xuICAgICAgLy8gT0NDIHNwZWNpZmljIHVzZXIgaWQgaGFuZGxpbmcuIEN1c3RvbWl6ZSB3aGVuIGltcGxlbWVudGluZyBkaWZmZXJlbnQgYmFja2VuZFxuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnNldFVzZXJJZChPQ0NfVVNFUl9JRF9DVVJSRU5UKTtcblxuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9naW4oKSk7XG5cbiAgICAgIHRoaXMuYXV0aFJlZGlyZWN0U2VydmljZS5yZWRpcmVjdCgpO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZva2VzIHRva2VucyBhbmQgY2xlYXJzIHN0YXRlIGZvciBsb2dnZWQgdXNlciAodG9rZW5zLCB1c2VySWQpLlxuICAgKiBUbyBwZXJmb3JtIGxvZ291dCBpdCBpcyBiZXN0IHRvIHVzZSBgbG9nb3V0YCBtZXRob2QuIFVzZSB0aGlzIG1ldGhvZCB3aXRoIGNhdXRpb24uXG4gICAqL1xuICBjb3JlTG9nb3V0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2V0TG9nb3V0UHJvZ3Jlc3ModHJ1ZSk7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLmNsZWFyVXNlcklkKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLm9BdXRoTGliV3JhcHBlclNlcnZpY2UucmV2b2tlQW5kTG9nb3V0KCkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEF1dGhBY3Rpb25zLkxvZ291dCgpKTtcbiAgICAgICAgdGhpcy5zZXRMb2dvdXRQcm9ncmVzcyhmYWxzZSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbjsgYW5kIGBmYWxzZWAgaWYgdGhlIHVzZXIgaXMgYW5vbnltb3VzLlxuICAgKi9cbiAgaXNVc2VyTG9nZ2VkSW4oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuKCkucGlwZShcbiAgICAgIG1hcCgodXNlclRva2VuKSA9PiBCb29sZWFuKHVzZXJUb2tlbj8uYWNjZXNzX3Rva2VuKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dvdXQgYSBzdG9yZWZyb250IGN1c3RvbWVyLiBJdCB3aWxsIGluaXRpYWxpemUgbG9nb3V0IHByb2NlZHVyZSBieSByZWRpcmVjdGluZyB0byB0aGUgYGxvZ291dGAgZW5kcG9pbnQuXG4gICAqL1xuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdsb2dvdXQnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IG9yIHN0b3AgdGhlIHJlZnJlc2ggcHJvY2Vzc1xuICAgKi9cbiAgc2V0UmVmcmVzaFByb2dyZXNzKHByb2dyZXNzOiBib29sZWFuKTogdm9pZCB7XG4gICAgKHRoaXMucmVmcmVzaEluUHJvZ3Jlc3MkIGFzIEJlaGF2aW9yU3ViamVjdDxib29sZWFuPikubmV4dChwcm9ncmVzcyk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgb3Igc3RvcCB0aGUgbG9nb3V0IHByb2Nlc3NcbiAgICovXG4gIHNldExvZ291dFByb2dyZXNzKHByb2dyZXNzOiBib29sZWFuKTogdm9pZCB7XG4gICAgKHRoaXMubG9nb3V0SW5Qcm9ncmVzcyQgYXMgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KS5uZXh0KHByb2dyZXNzKTtcbiAgfVxufVxuIl19