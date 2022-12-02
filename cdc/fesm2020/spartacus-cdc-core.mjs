import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, OCC_USER_ID_CURRENT, AuthActions, normalizeHttpError, AuthModule } from '@spartacus/core';
import * as i1 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { throwError, of, combineLatest, EMPTY } from 'rxjs';
import { catchError, take, map, tap, mergeMap, switchMap } from 'rxjs/operators';
import * as i1$2 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { TokenTarget } from '@spartacus/asm/root';
import * as i1$1 from '@ngrx/store';
import { CdcAuthFacade, CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcUserAuthenticationTokenService {
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

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_CDC_USER_TOKEN = '[Auth] Load CDC User Token';
const LOAD_CDC_USER_TOKEN_FAIL = '[Auth] Load CDC User Token Fail';
class LoadCdcUserTokenFail {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_CDC_USER_TOKEN_FAIL;
    }
}
class LoadCdcUserToken {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_CDC_USER_TOKEN;
    }
}

var cdcUserToken_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_CDC_USER_TOKEN: LOAD_CDC_USER_TOKEN,
    LOAD_CDC_USER_TOKEN_FAIL: LOAD_CDC_USER_TOKEN_FAIL,
    LoadCdcUserTokenFail: LoadCdcUserTokenFail,
    LoadCdcUserToken: LoadCdcUserToken
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to support custom CDC OAuth flow.
 */
class CdcAuthService {
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
        this.store.dispatch(new LoadCdcUserToken({
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
CdcAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthService, deps: [{ token: i1$1.Store }, { token: i2.AuthStorageService }, { token: i2.UserIdService }, { token: i2.GlobalMessageService }, { token: i2.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.AuthStorageService }, { type: i2.UserIdService }, { type: i2.GlobalMessageService }, { type: i2.AuthRedirectService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcUserTokenEffects {
    constructor(actions$, userTokenService, globalMessageService, cdcAuthService) {
        this.actions$ = actions$;
        this.userTokenService = userTokenService;
        this.globalMessageService = globalMessageService;
        this.cdcAuthService = cdcAuthService;
        this.loadCdcUserToken$ = createEffect(() => this.actions$.pipe(ofType(LOAD_CDC_USER_TOKEN), map((action) => action.payload), mergeMap((payload) => this.userTokenService
            .loadTokenUsingCustomFlow(payload.UID, payload.UIDSignature, payload.signatureTimestamp, payload.idToken, payload.baseSite)
            .pipe(switchMap((token) => {
            this.cdcAuthService.loginWithToken(token);
            return EMPTY;
        }), catchError((error) => {
            this.globalMessageService.add({ key: 'httpHandlers.badGateway' }, GlobalMessageType.MSG_TYPE_ERROR);
            return of(new LoadCdcUserTokenFail({
                error: normalizeHttpError(error),
                initialActionPayload: payload,
            }));
        })))));
    }
}
CdcUserTokenEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserTokenEffects, deps: [{ token: i1$2.Actions }, { token: CdcUserAuthenticationTokenService }, { token: i2.GlobalMessageService }, { token: CdcAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcUserTokenEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserTokenEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcUserTokenEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: CdcUserAuthenticationTokenService }, { type: i2.GlobalMessageService }, { type: CdcAuthService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcAuthStoreModule {
}
CdcAuthStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcAuthStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthStoreModule, imports: [CommonModule, i1$2.EffectsFeatureModule] });
CdcAuthStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthStoreModule, imports: [CommonModule, EffectsModule.forFeature([CdcUserTokenEffects])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, EffectsModule.forFeature([CdcUserTokenEffects])],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcAuthModule {
}
CdcAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, imports: [CommonModule, AuthModule, CdcAuthStoreModule] });
CdcAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, providers: [CdcUserAuthenticationTokenService], imports: [CommonModule, AuthModule, CdcAuthStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AuthModule, CdcAuthStoreModule],
                    providers: [CdcUserAuthenticationTokenService],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    CdcAuthService,
    {
        provide: CdcAuthFacade,
        useExisting: CdcAuthService,
    },
];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcEventBuilder {
    constructor(stateEventService, eventService) {
        this.stateEventService = stateEventService;
        this.eventService = eventService;
        this.register();
    }
    /**
     * Registers CDC events
     */
    register() {
        this.registerLoadUserTokenFail();
    }
    /**
     * Register the load user token fail event.
     */
    registerLoadUserTokenFail() {
        this.stateEventService.register({
            action: LOAD_CDC_USER_TOKEN_FAIL,
            event: CdcLoadUserTokenFailEvent,
        });
    }
}
CdcEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventBuilder, deps: [{ token: i2.StateEventService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.StateEventService }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcEventModule {
    constructor(_cdcEventBuilder) {
        // Intentional empty constructor
    }
}
CdcEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventModule, deps: [{ token: CdcEventBuilder }], target: i0.ɵɵFactoryTarget.NgModule });
CdcEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcEventModule });
CdcEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CdcEventBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcCoreModule {
}
CdcCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, imports: [CdcAuthModule, CdcEventModule] });
CdcCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, providers: [...facadeProviders], imports: [CdcAuthModule, CdcEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdcAuthModule, CdcEventModule],
                    providers: [...facadeProviders],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CdcCoreModule };
//# sourceMappingURL=spartacus-cdc-core.mjs.map
