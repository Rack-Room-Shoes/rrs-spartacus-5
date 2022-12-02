/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "angular-oauth2-oidc";
import * as i2 from "./auth-config.service";
import * as i3 from "../../../window/window-ref";
/**
 * Wrapper service on the library OAuthService. Normalizes the lib API for services.
 * Use this service when you want to access low level OAuth library methods.
 */
export class OAuthLibWrapperService {
    // TODO: Remove platformId dependency in 4.0
    constructor(oAuthService, authConfigService, platformId, winRef) {
        this.oAuthService = oAuthService;
        this.authConfigService = authConfigService;
        this.platformId = platformId;
        this.winRef = winRef;
        this.events$ = this.oAuthService.events;
        this.initialize();
    }
    initialize() {
        const isSSR = !this.winRef.isBrowser();
        this.oAuthService.configure({
            tokenEndpoint: this.authConfigService.getTokenEndpoint(),
            loginUrl: this.authConfigService.getLoginUrl(),
            clientId: this.authConfigService.getClientId(),
            dummyClientSecret: this.authConfigService.getClientSecret(),
            revocationEndpoint: this.authConfigService.getRevokeEndpoint(),
            logoutUrl: this.authConfigService.getLogoutUrl(),
            userinfoEndpoint: this.authConfigService.getUserinfoEndpoint(),
            issuer: this.authConfigService.getOAuthLibConfig()?.issuer ??
                this.authConfigService.getBaseUrl(),
            redirectUri: this.authConfigService.getOAuthLibConfig()?.redirectUri ??
                (!isSSR
                    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this.winRef.nativeWindow.location.origin
                    : ''),
            ...this.authConfigService.getOAuthLibConfig(),
        });
    }
    /**
     * Authorize with ResourceOwnerPasswordFlow.
     *
     * @param userId
     * @param password
     *
     * @return token response from the lib
     */
    authorizeWithPasswordFlow(userId, password) {
        return this.oAuthService.fetchTokenUsingPasswordFlow(userId, password);
    }
    /**
     * Refresh access_token.
     */
    refreshToken() {
        this.oAuthService.refreshToken();
    }
    /**
     * Revoke access tokens and clear tokens in lib state.
     */
    revokeAndLogout() {
        return new Promise((resolve) => {
            this.oAuthService
                .revokeTokenAndLogout()
                .catch(() => {
                // when there would be some kind of error during revocation we can't do anything else, so at least we logout user.
                this.oAuthService.logOut();
            })
                .finally(() => {
                resolve();
            });
        });
    }
    /**
     * Clear tokens in library state (no revocation).
     */
    logout() {
        this.oAuthService.logOut();
    }
    /**
     * Returns Open Id token. Might be empty, when it was not requested with the `responseType` config.
     *
     * @return id token
     */
    getIdToken() {
        return this.oAuthService.getIdToken();
    }
    /**
     * Initialize Implicit Flow or Authorization Code flows with the redirect to OAuth login url.
     */
    initLoginFlow() {
        return this.oAuthService.initLoginFlow();
    }
    /**
     * Tries to login user based on `code` or `token` present in the url.
     *
     * @param result The result returned by `OAuthService.tryLogin()`.
     *
     * @param tokenReceived Whether the event 'token_received' is emitted during `OAuthService.tryLogin()`.
     * We can use this identify that we have returned from an external authorization page to Spartacus).
     * In cases where we don't receive this event, the token has been obtained from storage.
     */
    tryLogin() {
        return new Promise((resolve) => {
            // We use the 'token_received' event to check if we have returned
            // from the auth server.
            let tokenReceivedEvent;
            const subscription = this.events$
                .pipe(filter((event) => event.type === 'token_received'), take(1))
                .subscribe((event) => (tokenReceivedEvent = event));
            this.oAuthService
                .tryLogin({
                // We don't load discovery document, because it doesn't contain revoke endpoint information
                disableOAuth2StateCheck: true,
            })
                .then((result) => {
                resolve({
                    result: result,
                    tokenReceived: !!tokenReceivedEvent,
                });
            })
                .finally(() => {
                subscription.unsubscribe();
            });
        });
    }
}
OAuthLibWrapperService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OAuthLibWrapperService, deps: [{ token: i1.OAuthService }, { token: i2.AuthConfigService }, { token: PLATFORM_ID }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OAuthLibWrapperService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OAuthLibWrapperService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OAuthLibWrapperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OAuthService }, { type: i2.AuthConfigService }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i3.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtbGliLXdyYXBwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL3NlcnZpY2VzL29hdXRoLWxpYi13cmFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUs5Qzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sc0JBQXNCO0lBR2pDLDRDQUE0QztJQUM1QyxZQUNZLFlBQTBCLEVBQzFCLGlCQUFvQyxFQUNmLFVBQWtCLEVBQ3ZDLE1BQWlCO1FBSGpCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDZixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFQN0IsWUFBTyxHQUEyQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQVN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLFVBQVU7UUFDbEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQzFCLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEQsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDOUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUU7WUFDOUMsaUJBQWlCLEVBQUUsSUFB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QUFrQjtpQkFDcEMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzttSEF0SVUsc0JBQXNCLCtFQU92QixXQUFXO3VIQVBWLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVFJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9BdXRoRXZlbnQsIE9BdXRoU2VydmljZSwgVG9rZW5SZXNwb25zZSB9IGZyb20gJ2FuZ3VsYXItb2F1dGgyLW9pZGMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vLi4vd2luZG93L3dpbmRvdy1yZWYnO1xuaW1wb3J0IHsgT0F1dGhUcnlMb2dpblJlc3VsdCB9IGZyb20gJy4uL21vZGVscy9vYXV0aC10cnktbG9naW4tcmVzcG9uc2UnO1xuaW1wb3J0IHsgQXV0aENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2F1dGgtY29uZmlnLnNlcnZpY2UnO1xuXG4vKipcbiAqIFdyYXBwZXIgc2VydmljZSBvbiB0aGUgbGlicmFyeSBPQXV0aFNlcnZpY2UuIE5vcm1hbGl6ZXMgdGhlIGxpYiBBUEkgZm9yIHNlcnZpY2VzLlxuICogVXNlIHRoaXMgc2VydmljZSB3aGVuIHlvdSB3YW50IHRvIGFjY2VzcyBsb3cgbGV2ZWwgT0F1dGggbGlicmFyeSBtZXRob2RzLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT0F1dGhMaWJXcmFwcGVyU2VydmljZSB7XG4gIGV2ZW50cyQ6IE9ic2VydmFibGU8T0F1dGhFdmVudD4gPSB0aGlzLm9BdXRoU2VydmljZS5ldmVudHM7XG5cbiAgLy8gVE9ETzogUmVtb3ZlIHBsYXRmb3JtSWQgZGVwZW5kZW5jeSBpbiA0LjBcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG9BdXRoU2VydmljZTogT0F1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoQ29uZmlnU2VydmljZTogQXV0aENvbmZpZ1NlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBpc1NTUiA9ICF0aGlzLndpblJlZi5pc0Jyb3dzZXIoKTtcbiAgICB0aGlzLm9BdXRoU2VydmljZS5jb25maWd1cmUoe1xuICAgICAgdG9rZW5FbmRwb2ludDogdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRUb2tlbkVuZHBvaW50KCksXG4gICAgICBsb2dpblVybDogdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRMb2dpblVybCgpLFxuICAgICAgY2xpZW50SWQ6IHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0Q2xpZW50SWQoKSxcbiAgICAgIGR1bW15Q2xpZW50U2VjcmV0OiB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldENsaWVudFNlY3JldCgpLFxuICAgICAgcmV2b2NhdGlvbkVuZHBvaW50OiB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldFJldm9rZUVuZHBvaW50KCksXG4gICAgICBsb2dvdXRVcmw6IHRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0TG9nb3V0VXJsKCksXG4gICAgICB1c2VyaW5mb0VuZHBvaW50OiB0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldFVzZXJpbmZvRW5kcG9pbnQoKSxcbiAgICAgIGlzc3VlcjpcbiAgICAgICAgdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRPQXV0aExpYkNvbmZpZygpPy5pc3N1ZXIgPz9cbiAgICAgICAgdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRCYXNlVXJsKCksXG4gICAgICByZWRpcmVjdFVyaTpcbiAgICAgICAgdGhpcy5hdXRoQ29uZmlnU2VydmljZS5nZXRPQXV0aExpYkNvbmZpZygpPy5yZWRpcmVjdFVyaSA/P1xuICAgICAgICAoIWlzU1NSXG4gICAgICAgICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgdGhpcy53aW5SZWYubmF0aXZlV2luZG93IS5sb2NhdGlvbi5vcmlnaW5cbiAgICAgICAgICA6ICcnKSxcbiAgICAgIC4uLnRoaXMuYXV0aENvbmZpZ1NlcnZpY2UuZ2V0T0F1dGhMaWJDb25maWcoKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRob3JpemUgd2l0aCBSZXNvdXJjZU93bmVyUGFzc3dvcmRGbG93LlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKlxuICAgKiBAcmV0dXJuIHRva2VuIHJlc3BvbnNlIGZyb20gdGhlIGxpYlxuICAgKi9cbiAgYXV0aG9yaXplV2l0aFBhc3N3b3JkRmxvdyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwYXNzd29yZDogc3RyaW5nXG4gICk6IFByb21pc2U8VG9rZW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLm9BdXRoU2VydmljZS5mZXRjaFRva2VuVXNpbmdQYXNzd29yZEZsb3codXNlcklkLCBwYXNzd29yZCk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCBhY2Nlc3NfdG9rZW4uXG4gICAqL1xuICByZWZyZXNoVG9rZW4oKTogdm9pZCB7XG4gICAgdGhpcy5vQXV0aFNlcnZpY2UucmVmcmVzaFRva2VuKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV2b2tlIGFjY2VzcyB0b2tlbnMgYW5kIGNsZWFyIHRva2VucyBpbiBsaWIgc3RhdGUuXG4gICAqL1xuICByZXZva2VBbmRMb2dvdXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLm9BdXRoU2VydmljZVxuICAgICAgICAucmV2b2tlVG9rZW5BbmRMb2dvdXQoKVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIC8vIHdoZW4gdGhlcmUgd291bGQgYmUgc29tZSBraW5kIG9mIGVycm9yIGR1cmluZyByZXZvY2F0aW9uIHdlIGNhbid0IGRvIGFueXRoaW5nIGVsc2UsIHNvIGF0IGxlYXN0IHdlIGxvZ291dCB1c2VyLlxuICAgICAgICAgIHRoaXMub0F1dGhTZXJ2aWNlLmxvZ091dCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0b2tlbnMgaW4gbGlicmFyeSBzdGF0ZSAobm8gcmV2b2NhdGlvbikuXG4gICAqL1xuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5vQXV0aFNlcnZpY2UubG9nT3V0KCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBPcGVuIElkIHRva2VuLiBNaWdodCBiZSBlbXB0eSwgd2hlbiBpdCB3YXMgbm90IHJlcXVlc3RlZCB3aXRoIHRoZSBgcmVzcG9uc2VUeXBlYCBjb25maWcuXG4gICAqXG4gICAqIEByZXR1cm4gaWQgdG9rZW5cbiAgICovXG4gIGdldElkVG9rZW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vQXV0aFNlcnZpY2UuZ2V0SWRUb2tlbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgSW1wbGljaXQgRmxvdyBvciBBdXRob3JpemF0aW9uIENvZGUgZmxvd3Mgd2l0aCB0aGUgcmVkaXJlY3QgdG8gT0F1dGggbG9naW4gdXJsLlxuICAgKi9cbiAgaW5pdExvZ2luRmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy5vQXV0aFNlcnZpY2UuaW5pdExvZ2luRmxvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIGxvZ2luIHVzZXIgYmFzZWQgb24gYGNvZGVgIG9yIGB0b2tlbmAgcHJlc2VudCBpbiB0aGUgdXJsLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzdWx0IFRoZSByZXN1bHQgcmV0dXJuZWQgYnkgYE9BdXRoU2VydmljZS50cnlMb2dpbigpYC5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuUmVjZWl2ZWQgV2hldGhlciB0aGUgZXZlbnQgJ3Rva2VuX3JlY2VpdmVkJyBpcyBlbWl0dGVkIGR1cmluZyBgT0F1dGhTZXJ2aWNlLnRyeUxvZ2luKClgLlxuICAgKiBXZSBjYW4gdXNlIHRoaXMgaWRlbnRpZnkgdGhhdCB3ZSBoYXZlIHJldHVybmVkIGZyb20gYW4gZXh0ZXJuYWwgYXV0aG9yaXphdGlvbiBwYWdlIHRvIFNwYXJ0YWN1cykuXG4gICAqIEluIGNhc2VzIHdoZXJlIHdlIGRvbid0IHJlY2VpdmUgdGhpcyBldmVudCwgdGhlIHRva2VuIGhhcyBiZWVuIG9idGFpbmVkIGZyb20gc3RvcmFnZS5cbiAgICovXG4gIHRyeUxvZ2luKCk6IFByb21pc2U8T0F1dGhUcnlMb2dpblJlc3VsdD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgLy8gV2UgdXNlIHRoZSAndG9rZW5fcmVjZWl2ZWQnIGV2ZW50IHRvIGNoZWNrIGlmIHdlIGhhdmUgcmV0dXJuZWRcbiAgICAgIC8vIGZyb20gdGhlIGF1dGggc2VydmVyLlxuICAgICAgbGV0IHRva2VuUmVjZWl2ZWRFdmVudDogT0F1dGhFdmVudCB8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZXZlbnRzJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC50eXBlID09PSAndG9rZW5fcmVjZWl2ZWQnKSxcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+ICh0b2tlblJlY2VpdmVkRXZlbnQgPSBldmVudCkpO1xuXG4gICAgICB0aGlzLm9BdXRoU2VydmljZVxuICAgICAgICAudHJ5TG9naW4oe1xuICAgICAgICAgIC8vIFdlIGRvbid0IGxvYWQgZGlzY292ZXJ5IGRvY3VtZW50LCBiZWNhdXNlIGl0IGRvZXNuJ3QgY29udGFpbiByZXZva2UgZW5kcG9pbnQgaW5mb3JtYXRpb25cbiAgICAgICAgICBkaXNhYmxlT0F1dGgyU3RhdGVDaGVjazogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICB0b2tlblJlY2VpdmVkOiAhIXRva2VuUmVjZWl2ZWRFdmVudCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19