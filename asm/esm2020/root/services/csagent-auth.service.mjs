/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AuthActions, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenTarget } from './asm-auth-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./asm-auth-storage.service";
import * as i3 from "@ngrx/store";
import * as i4 from "@spartacus/user/profile/root";
/**
 * Auth service for CS agent. Useful to login/logout agent, start emulation
 * or get information about the status of emulation.
 */
export class CsAgentAuthService {
    constructor(authService, authStorageService, userIdService, oAuthLibWrapperService, store, userProfileFacade) {
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.userIdService = userIdService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.store = store;
        this.userProfileFacade = userProfileFacade;
    }
    /**
     * Loads access token for a customer support agent.
     * @param userId
     * @param password
     */
    async authorizeCustomerSupportAgent(userId, password) {
        let userToken;
        this.authStorageService
            .getToken()
            .subscribe((token) => (userToken = token))
            .unsubscribe();
        this.authStorageService.switchTokenTargetToCSAgent();
        try {
            await this.oAuthLibWrapperService.authorizeWithPasswordFlow(userId, password);
            // Start emulation for currently logged in user
            let customerId;
            this.userProfileFacade
                .get()
                .subscribe((user) => (customerId = user?.customerId))
                .unsubscribe();
            this.store.dispatch(new AuthActions.Logout());
            if (customerId !== undefined && userToken !== undefined) {
                // OCC specific user id handling. Customize when implementing different backend
                this.userIdService.setUserId(customerId);
                this.authStorageService.setEmulatedUserToken(userToken);
                this.store.dispatch(new AuthActions.Login());
            }
            else {
                // When we can't get the customerId just end all current sessions
                this.userIdService.setUserId(OCC_USER_ID_ANONYMOUS);
                this.authStorageService.clearEmulatedUserToken();
            }
        }
        catch {
            this.authStorageService.switchTokenTargetToUser();
        }
    }
    /**
     * Starts an ASM customer emulation session.
     * A customer emulation session is stopped by calling logout().
     * @param customerId
     */
    startCustomerEmulationSession(customerId) {
        this.authStorageService.clearEmulatedUserToken();
        // OCC specific user id handling. Customize when implementing different backend
        this.store.dispatch(new AuthActions.Logout());
        this.userIdService.setUserId(customerId);
        this.store.dispatch(new AuthActions.Login());
    }
    /**
     * Check if CS agent is currently logged in.
     *
     * @returns observable emitting true when CS agent is logged in or false when not.
     */
    isCustomerSupportAgentLoggedIn() {
        return combineLatest([
            this.authStorageService.getToken(),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([token, tokenTarget]) => Boolean(token?.access_token && tokenTarget === TokenTarget.CSAgent)));
    }
    /**
     * Utility function to determine if customer is emulated.
     *
     * @returns observable emitting true when there is active emulation session or false when not.
     */
    isCustomerEmulated() {
        return this.userIdService.isEmulated();
    }
    /**
     * Returns the customer support agent's token loading status
     */
    getCustomerSupportAgentTokenLoading() {
        // TODO(#8248): Create new loading state outside of store
        return of(false);
    }
    /**
     * Logout a customer support agent.
     */
    async logoutCustomerSupportAgent() {
        const emulatedToken = this.authStorageService.getEmulatedUserToken();
        let isCustomerEmulated;
        this.userIdService
            .isEmulated()
            .subscribe((emulated) => (isCustomerEmulated = emulated))
            .unsubscribe();
        await this.oAuthLibWrapperService.revokeAndLogout();
        this.store.dispatch({ type: '[Auth] Logout Customer Support Agent' });
        this.authStorageService.setTokenTarget(TokenTarget.User);
        if (isCustomerEmulated && emulatedToken) {
            this.store.dispatch(new AuthActions.Logout());
            this.authStorageService.setToken(emulatedToken);
            this.userIdService.setUserId(OCC_USER_ID_CURRENT);
            this.authStorageService.clearEmulatedUserToken();
            this.store.dispatch(new AuthActions.Login());
        }
        else {
            this.authService.logout();
        }
    }
}
CsAgentAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CsAgentAuthService, deps: [{ token: i1.AuthService }, { token: i2.AsmAuthStorageService }, { token: i1.UserIdService }, { token: i1.OAuthLibWrapperService }, { token: i3.Store }, { token: i4.UserProfileFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CsAgentAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CsAgentAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CsAgentAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.AsmAuthStorageService }, { type: i1.UserIdService }, { type: i1.OAuthLibWrapperService }, { type: i3.Store }, { type: i4.UserProfileFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NhZ2VudC1hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL3Jvb3Qvc2VydmljZXMvY3NhZ2VudC1hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLFdBQVcsRUFJWCxxQkFBcUIsRUFDckIsbUJBQW1CLEdBRXBCLE1BQU0saUJBQWlCLENBQUM7QUFHekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBeUIsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7OztBQUVoRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQ1ksV0FBd0IsRUFDeEIsa0JBQXlDLEVBQ3pDLGFBQTRCLEVBQzVCLHNCQUE4QyxFQUM5QyxLQUFZLEVBQ1osaUJBQW9DO1FBTHBDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBdUI7UUFDekMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUM3QyxDQUFDO0lBRUo7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyw2QkFBNkIsQ0FDakMsTUFBYyxFQUNkLFFBQWdCO1FBRWhCLElBQUksU0FBZ0MsQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFT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RSxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsQ0FBQzthQUN4RCxXQUFXLEVBQUUsQ0FBQztRQUVqQixNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxzQ0FBc0MsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekQsSUFBSSxrQkFBa0IsSUFBSSxhQUFhLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7OytHQS9IVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIEF1dGhBY3Rpb25zLFxuICBBdXRoU2VydmljZSxcbiAgQXV0aFRva2VuLFxuICBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIE9DQ19VU0VSX0lEX0NVUlJFTlQsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmltcG9ydCB7IFVzZXJQcm9maWxlRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLCBUb2tlblRhcmdldCB9IGZyb20gJy4vYXNtLWF1dGgtc3RvcmFnZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBBdXRoIHNlcnZpY2UgZm9yIENTIGFnZW50LiBVc2VmdWwgdG8gbG9naW4vbG9nb3V0IGFnZW50LCBzdGFydCBlbXVsYXRpb25cbiAqIG9yIGdldCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc3RhdHVzIG9mIGVtdWxhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENzQWdlbnRBdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhTdG9yYWdlU2VydmljZTogQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmUsXG4gICAgcHJvdGVjdGVkIHVzZXJQcm9maWxlRmFjYWRlOiBVc2VyUHJvZmlsZUZhY2FkZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIExvYWRzIGFjY2VzcyB0b2tlbiBmb3IgYSBjdXN0b21lciBzdXBwb3J0IGFnZW50LlxuICAgKiBAcGFyYW0gdXNlcklkXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgYXN5bmMgYXV0aG9yaXplQ3VzdG9tZXJTdXBwb3J0QWdlbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFzc3dvcmQ6IHN0cmluZ1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXNlclRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWQ7XG4gICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2VcbiAgICAgIC5nZXRUb2tlbigpXG4gICAgICAuc3Vic2NyaWJlKCh0b2tlbikgPT4gKHVzZXJUb2tlbiA9IHRva2VuKSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc3dpdGNoVG9rZW5UYXJnZXRUb0NTQWdlbnQoKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLmF1dGhvcml6ZVdpdGhQYXNzd29yZEZsb3coXG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgcGFzc3dvcmRcbiAgICAgICk7XG4gICAgICAvLyBTdGFydCBlbXVsYXRpb24gZm9yIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlclxuICAgICAgbGV0IGN1c3RvbWVySWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudXNlclByb2ZpbGVGYWNhZGVcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC5zdWJzY3JpYmUoKHVzZXIpID0+IChjdXN0b21lcklkID0gdXNlcj8uY3VzdG9tZXJJZCkpXG4gICAgICAgIC51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9nb3V0KCkpO1xuXG4gICAgICBpZiAoY3VzdG9tZXJJZCAhPT0gdW5kZWZpbmVkICYmIHVzZXJUb2tlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIE9DQyBzcGVjaWZpYyB1c2VyIGlkIGhhbmRsaW5nLiBDdXN0b21pemUgd2hlbiBpbXBsZW1lbnRpbmcgZGlmZmVyZW50IGJhY2tlbmRcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnNldFVzZXJJZChjdXN0b21lcklkKTtcbiAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0RW11bGF0ZWRVc2VyVG9rZW4odXNlclRva2VuKTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9naW4oKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXaGVuIHdlIGNhbid0IGdldCB0aGUgY3VzdG9tZXJJZCBqdXN0IGVuZCBhbGwgY3VycmVudCBzZXNzaW9uc1xuICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2Uuc2V0VXNlcklkKE9DQ19VU0VSX0lEX0FOT05ZTU9VUyk7XG4gICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmNsZWFyRW11bGF0ZWRVc2VyVG9rZW4oKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLnN3aXRjaFRva2VuVGFyZ2V0VG9Vc2VyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhbiBBU00gY3VzdG9tZXIgZW11bGF0aW9uIHNlc3Npb24uXG4gICAqIEEgY3VzdG9tZXIgZW11bGF0aW9uIHNlc3Npb24gaXMgc3RvcHBlZCBieSBjYWxsaW5nIGxvZ291dCgpLlxuICAgKiBAcGFyYW0gY3VzdG9tZXJJZFxuICAgKi9cbiAgcHVibGljIHN0YXJ0Q3VzdG9tZXJFbXVsYXRpb25TZXNzaW9uKGN1c3RvbWVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmNsZWFyRW11bGF0ZWRVc2VyVG9rZW4oKTtcblxuICAgIC8vIE9DQyBzcGVjaWZpYyB1c2VyIGlkIGhhbmRsaW5nLiBDdXN0b21pemUgd2hlbiBpbXBsZW1lbnRpbmcgZGlmZmVyZW50IGJhY2tlbmRcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dvdXQoKSk7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnNldFVzZXJJZChjdXN0b21lcklkKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dpbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBDUyBhZ2VudCBpcyBjdXJyZW50bHkgbG9nZ2VkIGluLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIGVtaXR0aW5nIHRydWUgd2hlbiBDUyBhZ2VudCBpcyBsb2dnZWQgaW4gb3IgZmFsc2Ugd2hlbiBub3QuXG4gICAqL1xuICBwdWJsaWMgaXNDdXN0b21lclN1cHBvcnRBZ2VudExvZ2dlZEluKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuKCksXG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRUb2tlblRhcmdldCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFt0b2tlbiwgdG9rZW5UYXJnZXRdKSA9PlxuICAgICAgICBCb29sZWFuKHRva2VuPy5hY2Nlc3NfdG9rZW4gJiYgdG9rZW5UYXJnZXQgPT09IFRva2VuVGFyZ2V0LkNTQWdlbnQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiBjdXN0b21lciBpcyBlbXVsYXRlZC5cbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSBlbWl0dGluZyB0cnVlIHdoZW4gdGhlcmUgaXMgYWN0aXZlIGVtdWxhdGlvbiBzZXNzaW9uIG9yIGZhbHNlIHdoZW4gbm90LlxuICAgKi9cbiAgcHVibGljIGlzQ3VzdG9tZXJFbXVsYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRTZXJ2aWNlLmlzRW11bGF0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXN0b21lciBzdXBwb3J0IGFnZW50J3MgdG9rZW4gbG9hZGluZyBzdGF0dXNcbiAgICovXG4gIHB1YmxpYyBnZXRDdXN0b21lclN1cHBvcnRBZ2VudFRva2VuTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAvLyBUT0RPKCM4MjQ4KTogQ3JlYXRlIG5ldyBsb2FkaW5nIHN0YXRlIG91dHNpZGUgb2Ygc3RvcmVcbiAgICByZXR1cm4gb2YoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ291dCBhIGN1c3RvbWVyIHN1cHBvcnQgYWdlbnQuXG4gICAqL1xuICBhc3luYyBsb2dvdXRDdXN0b21lclN1cHBvcnRBZ2VudCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBlbXVsYXRlZFRva2VuID0gdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuZ2V0RW11bGF0ZWRVc2VyVG9rZW4oKTtcblxuICAgIGxldCBpc0N1c3RvbWVyRW11bGF0ZWQ7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAuaXNFbXVsYXRlZCgpXG4gICAgICAuc3Vic2NyaWJlKChlbXVsYXRlZCkgPT4gKGlzQ3VzdG9tZXJFbXVsYXRlZCA9IGVtdWxhdGVkKSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuXG4gICAgYXdhaXQgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLnJldm9rZUFuZExvZ291dCgpO1xuXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6ICdbQXV0aF0gTG9nb3V0IEN1c3RvbWVyIFN1cHBvcnQgQWdlbnQnIH0pO1xuICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLnNldFRva2VuVGFyZ2V0KFRva2VuVGFyZ2V0LlVzZXIpO1xuXG4gICAgaWYgKGlzQ3VzdG9tZXJFbXVsYXRlZCAmJiBlbXVsYXRlZFRva2VuKSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dvdXQoKSk7XG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5zZXRUb2tlbihlbXVsYXRlZFRva2VuKTtcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS5zZXRVc2VySWQoT0NDX1VTRVJfSURfQ1VSUkVOVCk7XG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5jbGVhckVtdWxhdGVkVXNlclRva2VuKCk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dpbigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==