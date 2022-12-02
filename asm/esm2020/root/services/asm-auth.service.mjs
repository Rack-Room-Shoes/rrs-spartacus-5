/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AuthActions, AuthService, GlobalMessageType, } from '@spartacus/core';
import { combineLatest, from, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { TokenTarget } from './asm-auth-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "./asm-auth-storage.service";
/**
 * Version of AuthService that is working for both user na CS agent.
 * Overrides AuthService when ASM module is enabled.
 */
export class AsmAuthService extends AuthService {
    constructor(store, userIdService, oAuthLibWrapperService, authStorageService, authRedirectService, globalMessageService, routingService) {
        super(store, userIdService, oAuthLibWrapperService, authStorageService, authRedirectService, routingService);
        this.store = store;
        this.userIdService = userIdService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.authStorageService = authStorageService;
        this.authRedirectService = authRedirectService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
    }
    canUserLogin() {
        let tokenTarget;
        let token;
        this.authStorageService
            .getToken()
            .subscribe((tok) => (token = tok))
            .unsubscribe();
        this.authStorageService
            .getTokenTarget()
            .subscribe((tokTarget) => (tokenTarget = tokTarget))
            .unsubscribe();
        return !(Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent);
    }
    warnAboutLoggedCSAgent() {
        this.globalMessageService.add({
            key: 'asm.auth.agentLoggedInError',
        }, GlobalMessageType.MSG_TYPE_ERROR);
    }
    /**
     * Loads a new user token with Resource Owner Password Flow when CS agent is not logged in.
     * @param userId
     * @param password
     */
    async loginWithCredentials(userId, password) {
        if (this.canUserLogin()) {
            await super.loginWithCredentials(userId, password);
        }
        else {
            this.warnAboutLoggedCSAgent();
        }
    }
    /**
     * Initialize Implicit/Authorization Code flow by redirecting to OAuth server when CS agent is not logged in.
     */
    loginWithRedirect() {
        if (this.canUserLogin()) {
            super.loginWithRedirect();
            return true;
        }
        else {
            this.warnAboutLoggedCSAgent();
            return false;
        }
    }
    /**
     * Revokes tokens and clears state for logged user (tokens, userId).
     * To perform logout it is best to use `logout` method. Use this method with caution.
     */
    coreLogout() {
        return this.userIdService
            .isEmulated()
            .pipe(take(1), switchMap((isEmulated) => {
            if (isEmulated) {
                this.authStorageService.clearEmulatedUserToken();
                this.userIdService.clearUserId();
                this.store.dispatch(new AuthActions.Logout());
                return of(true);
            }
            else {
                return from(super.coreLogout());
            }
        }))
            .toPromise();
    }
    /**
     * Returns `true` if user is logged in or being emulated.
     */
    isUserLoggedIn() {
        return combineLatest([
            this.authStorageService.getToken(),
            this.userIdService.isEmulated(),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([token, isEmulated, tokenTarget]) => Boolean(token?.access_token) &&
            (tokenTarget === TokenTarget.User ||
                (tokenTarget === TokenTarget.CSAgent && isEmulated))));
    }
}
AsmAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmAuthService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i2.OAuthLibWrapperService }, { token: i3.AsmAuthStorageService }, { token: i2.AuthRedirectService }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i2.OAuthLibWrapperService }, { type: i3.AsmAuthStorageService }, { type: i2.AuthRedirectService }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vcm9vdC9zZXJ2aWNlcy9hc20tYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxXQUFXLEVBRVgsV0FBVyxFQUdYLGlCQUFpQixHQUtsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQXlCLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQUVoRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQVc7SUFDN0MsWUFDWSxLQUFpQyxFQUNqQyxhQUE0QixFQUM1QixzQkFBOEMsRUFDOUMsa0JBQXlDLEVBQ3pDLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsY0FBOEI7UUFFeEMsS0FBSyxDQUNILEtBQUssRUFDTCxhQUFhLEVBQ2Isc0JBQXNCLEVBQ3RCLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsY0FBYyxDQUNmLENBQUM7UUFmUSxVQUFLLEdBQUwsS0FBSyxDQUE0QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBdUI7UUFDekMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQVUxQyxDQUFDO0lBRVMsWUFBWTtRQUNwQixJQUFJLFdBQW9DLENBQUM7UUFDekMsSUFBSSxLQUE0QixDQUFDO1FBRWpDLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsUUFBUSxFQUFFO2FBQ1YsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNqQyxXQUFXLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLGNBQWMsRUFBRTthQUNoQixTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxDQUFDO2FBQ25ELFdBQVcsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxDQUNOLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksV0FBVyxLQUFLLFdBQVcsQ0FBQyxPQUFPLENBQ3BFLENBQUM7SUFDSixDQUFDO0lBRVMsc0JBQXNCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCO1lBQ0UsR0FBRyxFQUFFLDZCQUE2QjtTQUNuQyxFQUNELGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE1BQWMsRUFBRSxRQUFnQjtRQUN6RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUN2QixNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdkIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYTthQUN0QixVQUFVLEVBQUU7YUFDWixJQUFJLENBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3ZCLElBQUksVUFBVSxFQUFFO2dCQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtTQUN6QyxDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FDRCxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQ25DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDO1lBQzVCLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUMvQixDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQ3pELENBQ0YsQ0FBQztJQUNKLENBQUM7OzJHQS9HVSxjQUFjOytHQUFkLGNBQWMsY0FGYixNQUFNOzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBBdXRoQWN0aW9ucyxcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIEF1dGhUb2tlbixcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgU3RhdGVXaXRoQ2xpZW50QXV0aCxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzbUF1dGhTdG9yYWdlU2VydmljZSwgVG9rZW5UYXJnZXQgfSBmcm9tICcuL2FzbS1hdXRoLXN0b3JhZ2Uuc2VydmljZSc7XG5cbi8qKlxuICogVmVyc2lvbiBvZiBBdXRoU2VydmljZSB0aGF0IGlzIHdvcmtpbmcgZm9yIGJvdGggdXNlciBuYSBDUyBhZ2VudC5cbiAqIE92ZXJyaWRlcyBBdXRoU2VydmljZSB3aGVuIEFTTSBtb2R1bGUgaXMgZW5hYmxlZC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUF1dGhTZXJ2aWNlIGV4dGVuZHMgQXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENsaWVudEF1dGg+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEFzbUF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICBzdG9yZSxcbiAgICAgIHVzZXJJZFNlcnZpY2UsXG4gICAgICBvQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgICAgYXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgYXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICAgIHJvdXRpbmdTZXJ2aWNlXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYW5Vc2VyTG9naW4oKTogYm9vbGVhbiB7XG4gICAgbGV0IHRva2VuVGFyZ2V0OiBUb2tlblRhcmdldCB8IHVuZGVmaW5lZDtcbiAgICBsZXQgdG9rZW46IEF1dGhUb2tlbiB8IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlXG4gICAgICAuZ2V0VG9rZW4oKVxuICAgICAgLnN1YnNjcmliZSgodG9rKSA9PiAodG9rZW4gPSB0b2spKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2VcbiAgICAgIC5nZXRUb2tlblRhcmdldCgpXG4gICAgICAuc3Vic2NyaWJlKCh0b2tUYXJnZXQpID0+ICh0b2tlblRhcmdldCA9IHRva1RhcmdldCkpXG4gICAgICAudW5zdWJzY3JpYmUoKTtcbiAgICByZXR1cm4gIShcbiAgICAgIEJvb2xlYW4odG9rZW4/LmFjY2Vzc190b2tlbikgJiYgdG9rZW5UYXJnZXQgPT09IFRva2VuVGFyZ2V0LkNTQWdlbnRcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHdhcm5BYm91dExvZ2dlZENTQWdlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7XG4gICAgICAgIGtleTogJ2FzbS5hdXRoLmFnZW50TG9nZ2VkSW5FcnJvcicsXG4gICAgICB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IHVzZXIgdG9rZW4gd2l0aCBSZXNvdXJjZSBPd25lciBQYXNzd29yZCBGbG93IHdoZW4gQ1MgYWdlbnQgaXMgbm90IGxvZ2dlZCBpbi5cbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICovXG4gIGFzeW5jIGxvZ2luV2l0aENyZWRlbnRpYWxzKHVzZXJJZDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuY2FuVXNlckxvZ2luKCkpIHtcbiAgICAgIGF3YWl0IHN1cGVyLmxvZ2luV2l0aENyZWRlbnRpYWxzKHVzZXJJZCwgcGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhcm5BYm91dExvZ2dlZENTQWdlbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBJbXBsaWNpdC9BdXRob3JpemF0aW9uIENvZGUgZmxvdyBieSByZWRpcmVjdGluZyB0byBPQXV0aCBzZXJ2ZXIgd2hlbiBDUyBhZ2VudCBpcyBub3QgbG9nZ2VkIGluLlxuICAgKi9cbiAgbG9naW5XaXRoUmVkaXJlY3QoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY2FuVXNlckxvZ2luKCkpIHtcbiAgICAgIHN1cGVyLmxvZ2luV2l0aFJlZGlyZWN0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53YXJuQWJvdXRMb2dnZWRDU0FnZW50KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldm9rZXMgdG9rZW5zIGFuZCBjbGVhcnMgc3RhdGUgZm9yIGxvZ2dlZCB1c2VyICh0b2tlbnMsIHVzZXJJZCkuXG4gICAqIFRvIHBlcmZvcm0gbG9nb3V0IGl0IGlzIGJlc3QgdG8gdXNlIGBsb2dvdXRgIG1ldGhvZC4gVXNlIHRoaXMgbWV0aG9kIHdpdGggY2F1dGlvbi5cbiAgICovXG4gIGNvcmVMb2dvdXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAuaXNFbXVsYXRlZCgpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKChpc0VtdWxhdGVkKSA9PiB7XG4gICAgICAgICAgaWYgKGlzRW11bGF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmNsZWFyRW11bGF0ZWRVc2VyVG9rZW4oKTtcbiAgICAgICAgICAgIHRoaXMudXNlcklkU2VydmljZS5jbGVhclVzZXJJZCgpO1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9nb3V0KCkpO1xuICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbShzdXBlci5jb3JlTG9nb3V0KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB1c2VyIGlzIGxvZ2dlZCBpbiBvciBiZWluZyBlbXVsYXRlZC5cbiAgICovXG4gIGlzVXNlckxvZ2dlZEluKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuKCksXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UuaXNFbXVsYXRlZCgpLFxuICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5UYXJnZXQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoW3Rva2VuLCBpc0VtdWxhdGVkLCB0b2tlblRhcmdldF0pID0+XG4gICAgICAgICAgQm9vbGVhbih0b2tlbj8uYWNjZXNzX3Rva2VuKSAmJlxuICAgICAgICAgICh0b2tlblRhcmdldCA9PT0gVG9rZW5UYXJnZXQuVXNlciB8fFxuICAgICAgICAgICAgKHRva2VuVGFyZ2V0ID09PSBUb2tlblRhcmdldC5DU0FnZW50ICYmIGlzRW11bGF0ZWQpKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==