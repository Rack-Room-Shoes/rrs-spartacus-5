/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TokenTarget } from '@spartacus/asm/root';
import { AuthActions, GlobalMessageType, OCC_USER_ID_CURRENT, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CdcAuthActions } from '../store/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
/**
 * Service to support custom CDC OAuth flow.
 */
export class CdcAuthService {
    constructor(store, authStorageService, userIdService, globalMessageService, authRedirectService) {
        this.store = store;
        this.authStorageService = authStorageService;
        this.userIdService = userIdService;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
    }
    /**
     * Loads a new user token using custom oauth flow
     *
     * @param UID
     * @param UIDSignature
     * @param signatureTimestamp
     * @param idToken
     * @param baseSite
     */
    loginWithCustomCdcFlow(UID, UIDSignature, signatureTimestamp, idToken, baseSite) {
        this.store.dispatch(new CdcAuthActions.LoadCdcUserToken({
            UID: UID,
            UIDSignature: UIDSignature,
            signatureTimestamp: signatureTimestamp,
            idToken: idToken,
            baseSite: baseSite,
        }));
    }
    /**
     * Utility to differentiate between AuthStorageService and AsmAuthStorageService
     */
    isAsmAuthStorageService(service) {
        return 'getTokenTarget' in service;
    }
    /**
     * Transform and store the token received from custom flow to library format and login user.
     *
     * @param token
     */
    loginWithToken(token) {
        let stream$ = of(true);
        if (this.isAsmAuthStorageService(this.authStorageService)) {
            stream$ = combineLatest([
                this.authStorageService.getToken(),
                this.authStorageService.getTokenTarget(),
            ]).pipe(take(1), map(([currentToken, tokenTarget]) => {
                return (!!currentToken?.access_token && tokenTarget === TokenTarget.CSAgent);
            }), tap((isAsmAgentLoggedIn) => {
                if (isAsmAgentLoggedIn) {
                    this.globalMessageService.add({
                        key: 'asm.auth.agentLoggedInError',
                    }, GlobalMessageType.MSG_TYPE_ERROR);
                }
            }), map((isAsmAgentLoggedIn) => !isAsmAgentLoggedIn));
        }
        stream$.pipe(take(1)).subscribe((canLogin) => {
            if (canLogin) {
                // Code mostly based on auth lib we use and the way it handles token properties
                this.authStorageService.setItem('access_token', token.access_token);
                if (token.granted_scopes && Array.isArray(token.granted_scopes)) {
                    this.authStorageService.setItem('granted_scopes', JSON.stringify(token.granted_scopes));
                }
                this.authStorageService.setItem('access_token_stored_at', '' + Date.now());
                if (token.expires_in) {
                    const expiresInMilliseconds = token.expires_in * 1000;
                    const now = new Date();
                    const expiresAt = now.getTime() + expiresInMilliseconds;
                    this.authStorageService.setItem('expires_at', '' + expiresAt);
                }
                if (token.refresh_token) {
                    this.authStorageService.setItem('refresh_token', token.refresh_token);
                }
                // OCC specific code
                this.userIdService.setUserId(OCC_USER_ID_CURRENT);
                this.store.dispatch(new AuthActions.Login());
                // Remove any global errors and redirect user on successful login
                this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
                this.authRedirectService.redirect();
            }
        });
    }
}
CdcAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthService, deps: [{ token: i1.Store }, { token: i2.AuthStorageService }, { token: i2.UserIdService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AuthStorageService }, { type: i2.UserIdService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL2NvcmUvYXV0aC9mYWNhZGUvY2RjLWF1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQXlCLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxXQUFXLEVBS1gsaUJBQWlCLEVBQ2pCLG1CQUFtQixHQUVwQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUd4RDs7R0FFRztBQUVILE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQ1ksS0FBWSxFQUNaLGtCQUFzQyxFQUN0QyxhQUE0QixFQUM1QixvQkFBMEMsRUFDMUMsbUJBQXdDO1FBSnhDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUNqRCxDQUFDO0lBRUo7Ozs7Ozs7O09BUUc7SUFDSCxzQkFBc0IsQ0FDcEIsR0FBVyxFQUNYLFlBQW9CLEVBQ3BCLGtCQUEwQixFQUMxQixPQUFlLEVBQ2YsUUFBZ0I7UUFFaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLElBQUksY0FBYyxDQUFDLGdCQUFnQixD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SSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFFbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFN0MsaUVBQWlFO2dCQUNqRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzJHQW5IVSxjQUFjOytHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLCBUb2tlblRhcmdldCB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aEFjdGlvbnMsXG4gIEF1dGhSZWRpcmVjdFNlcnZpY2UsXG4gIEF1dGhTdG9yYWdlU2VydmljZSxcbiAgQXV0aFRva2VuLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIE9DQ19VU0VSX0lEX0NVUlJFTlQsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDZGNBdXRoQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgQ2RjQXV0aEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gc3VwcG9ydCBjdXN0b20gQ0RDIE9BdXRoIGZsb3cuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZGNBdXRoU2VydmljZSBpbXBsZW1lbnRzIENkY0F1dGhGYWNhZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoUmVkaXJlY3RTZXJ2aWNlOiBBdXRoUmVkaXJlY3RTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgdXNlciB0b2tlbiB1c2luZyBjdXN0b20gb2F1dGggZmxvd1xuICAgKlxuICAgKiBAcGFyYW0gVUlEXG4gICAqIEBwYXJhbSBVSURTaWduYXR1cmVcbiAgICogQHBhcmFtIHNpZ25hdHVyZVRpbWVzdGFtcFxuICAgKiBAcGFyYW0gaWRUb2tlblxuICAgKiBAcGFyYW0gYmFzZVNpdGVcbiAgICovXG4gIGxvZ2luV2l0aEN1c3RvbUNkY0Zsb3coXG4gICAgVUlEOiBzdHJpbmcsXG4gICAgVUlEU2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgc2lnbmF0dXJlVGltZXN0YW1wOiBzdHJpbmcsXG4gICAgaWRUb2tlbjogc3RyaW5nLFxuICAgIGJhc2VTaXRlOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDZGNBdXRoQWN0aW9ucy5Mb2FkQ2RjVXNlclRva2VuKHtcbiAgICAgICAgVUlEOiBVSUQsXG4gICAgICAgIFVJRFNpZ25hdHVyZTogVUlEU2lnbmF0dXJlLFxuICAgICAgICBzaWduYXR1cmVUaW1lc3RhbXA6IHNpZ25hdHVyZVRpbWVzdGFtcCxcbiAgICAgICAgaWRUb2tlbjogaWRUb2tlbixcbiAgICAgICAgYmFzZVNpdGU6IGJhc2VTaXRlLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgdG8gZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIEF1dGhTdG9yYWdlU2VydmljZSBhbmQgQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIGlzQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlKFxuICAgIHNlcnZpY2U6IEF1dGhTdG9yYWdlU2VydmljZSB8IEFzbUF1dGhTdG9yYWdlU2VydmljZVxuICApOiBzZXJ2aWNlIGlzIEFzbUF1dGhTdG9yYWdlU2VydmljZSB7XG4gICAgcmV0dXJuICdnZXRUb2tlblRhcmdldCcgaW4gc2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gYW5kIHN0b3JlIHRoZSB0b2tlbiByZWNlaXZlZCBmcm9tIGN1c3RvbSBmbG93IHRvIGxpYnJhcnkgZm9ybWF0IGFuZCBsb2dpbiB1c2VyLlxuICAgKlxuICAgKiBAcGFyYW0gdG9rZW5cbiAgICovXG4gIGxvZ2luV2l0aFRva2VuKHRva2VuOiBQYXJ0aWFsPEF1dGhUb2tlbj4gJiB7IGV4cGlyZXNfaW4/OiBudW1iZXIgfSk6IHZvaWQge1xuICAgIGxldCBzdHJlYW0kID0gb2YodHJ1ZSk7XG4gICAgaWYgKHRoaXMuaXNBc21BdXRoU3RvcmFnZVNlcnZpY2UodGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UpKSB7XG4gICAgICBzdHJlYW0kID0gY29tYmluZUxhdGVzdChbXG4gICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuKCksXG4gICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldFRva2VuVGFyZ2V0KCksXG4gICAgICBdKS5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBtYXAoKFtjdXJyZW50VG9rZW4sIHRva2VuVGFyZ2V0XSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhIWN1cnJlbnRUb2tlbj8uYWNjZXNzX3Rva2VuICYmIHRva2VuVGFyZ2V0ID09PSBUb2tlblRhcmdldC5DU0FnZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRhcCgoaXNBc21BZ2VudExvZ2dlZEluKSA9PiB7XG4gICAgICAgICAgaWYgKGlzQXNtQWdlbnRMb2dnZWRJbikge1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdhc20uYXV0aC5hZ2VudExvZ2dlZEluRXJyb3InLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKGlzQXNtQWdlbnRMb2dnZWRJbikgPT4gIWlzQXNtQWdlbnRMb2dnZWRJbilcbiAgICAgICk7XG4gICAgfVxuXG4gICAgc3RyZWFtJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoY2FuTG9naW4pID0+IHtcbiAgICAgIGlmIChjYW5Mb2dpbikge1xuICAgICAgICAvLyBDb2RlIG1vc3RseSBiYXNlZCBvbiBhdXRoIGxpYiB3ZSB1c2UgYW5kIHRoZSB3YXkgaXQgaGFuZGxlcyB0b2tlbiBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLnNldEl0ZW0oJ2FjY2Vzc190b2tlbicsIHRva2VuLmFjY2Vzc190b2tlbik7XG5cbiAgICAgICAgaWYgKHRva2VuLmdyYW50ZWRfc2NvcGVzICYmIEFycmF5LmlzQXJyYXkodG9rZW4uZ3JhbnRlZF9zY29wZXMpKSB7XG4gICAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0SXRlbShcbiAgICAgICAgICAgICdncmFudGVkX3Njb3BlcycsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0b2tlbi5ncmFudGVkX3Njb3BlcylcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0SXRlbShcbiAgICAgICAgICAnYWNjZXNzX3Rva2VuX3N0b3JlZF9hdCcsXG4gICAgICAgICAgJycgKyBEYXRlLm5vdygpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRva2VuLmV4cGlyZXNfaW4pIHtcbiAgICAgICAgICBjb25zdCBleHBpcmVzSW5NaWxsaXNlY29uZHMgPSB0b2tlbi5leHBpcmVzX2luICogMTAwMDtcbiAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IG5vdy5nZXRUaW1lKCkgKyBleHBpcmVzSW5NaWxsaXNlY29uZHM7XG4gICAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0SXRlbSgnZXhwaXJlc19hdCcsICcnICsgZXhwaXJlc0F0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2tlbi5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0SXRlbSgncmVmcmVzaF90b2tlbicsIHRva2VuLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT0NDIHNwZWNpZmljIGNvZGVcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnNldFVzZXJJZChPQ0NfVVNFUl9JRF9DVVJSRU5UKTtcblxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dpbigpKTtcblxuICAgICAgICAvLyBSZW1vdmUgYW55IGdsb2JhbCBlcnJvcnMgYW5kIHJlZGlyZWN0IHVzZXIgb24gc3VjY2Vzc2Z1bCBsb2dpblxuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLnJlbW92ZShHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUik7XG4gICAgICAgIHRoaXMuYXV0aFJlZGlyZWN0U2VydmljZS5yZWRpcmVjdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=