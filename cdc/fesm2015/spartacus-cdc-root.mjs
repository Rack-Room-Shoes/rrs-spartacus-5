import * as i0 from '@angular/core';
import { Injectable, PLATFORM_ID, Inject, APP_INITIALIZER, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { Config, facadeFactory, GlobalMessageType, provideDefaultConfigFactory, ConfigInitializerService, CxEvent } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { take, tap } from 'rxjs/operators';
import * as i2$1 from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ReplaySubject, Subscription, combineLatest, Observable } from 'rxjs';
import * as i4 from '@spartacus/user/profile/root';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CDC_FEATURE = 'cdc';
const CDC_CORE_FEATURE = 'cdcCore';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @override
 *
 * CDC version of logout guard. In addition to token revocation we invoke logout method from CDC JS lib.
 */
class CdcLogoutGuard extends LogoutGuard {
    constructor(auth, cms, semanticPathService, protectedRoutes, router, winRef) {
        super(auth, cms, semanticPathService, protectedRoutes, router);
        this.auth = auth;
        this.cms = cms;
        this.semanticPathService = semanticPathService;
        this.protectedRoutes = protectedRoutes;
        this.router = router;
        this.winRef = winRef;
    }
    /**
     * Logout user from CDC
     */
    logoutFromCdc() {
        var _a, _b, _c;
        (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a['gigya']) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.logout();
    }
    /**
     * @override
     * @returns promise to resolve after complete logout
     */
    logout() {
        return Promise.all([super.logout(), this.logoutFromCdc()]);
    }
}
CdcLogoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLogoutGuard, deps: [{ token: i2.AuthService }, { token: i2.CmsService }, { token: i2.SemanticPathService }, { token: i2.ProtectedRoutesService }, { token: i2$1.Router }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLogoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLogoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLogoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.AuthService }, { type: i2.CmsService }, { type: i2.SemanticPathService }, { type: i2.ProtectedRoutesService }, { type: i2$1.Router }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcConfig {
}
CdcConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcAuthFacade {
}
CdcAuthFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdcAuthFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CdcAuthFacade,
        feature: CDC_CORE_FEATURE,
        methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CdcAuthFacade,
                        feature: CDC_CORE_FEATURE,
                        methods: ['loginWithCustomCdcFlow', 'loginWithToken'],
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcJsService {
    constructor(cdcConfig, baseSiteService, languageService, scriptLoader, winRef, cdcAuth, auth, zone, userProfileFacade, platform, globalMessageService) {
        this.cdcConfig = cdcConfig;
        this.baseSiteService = baseSiteService;
        this.languageService = languageService;
        this.scriptLoader = scriptLoader;
        this.winRef = winRef;
        this.cdcAuth = cdcAuth;
        this.auth = auth;
        this.zone = zone;
        this.userProfileFacade = userProfileFacade;
        this.platform = platform;
        this.globalMessageService = globalMessageService;
        this.loaded$ = new ReplaySubject(1);
        this.errorLoading$ = new ReplaySubject(1);
        this.subscription = new Subscription();
    }
    /**
     * Initialize CDC script
     */
    initialize() {
        this.loadCdcJavascript();
    }
    /**
     * Returns observable with the information if CDC script is loaded.
     */
    didLoad() {
        return this.loaded$.asObservable();
    }
    /**
     * Returns observable with the information if CDC script failed to load.
     */
    didScriptFailToLoad() {
        return this.errorLoading$.asObservable();
    }
    /**
     * Method which loads the CDC Script
     */
    loadCdcJavascript() {
        // Only load the script on client side (no SSR)
        if (isPlatformBrowser(this.platform)) {
            this.subscription.add(combineLatest([
                this.baseSiteService.getActive(),
                this.languageService.getActive(),
            ])
                .pipe(take(1))
                .subscribe(([baseSite, language]) => {
                var _a;
                const scriptForBaseSite = this.getJavascriptUrlForCurrentSite(baseSite);
                if (scriptForBaseSite) {
                    const javascriptUrl = `${scriptForBaseSite}&lang=${language}`;
                    this.scriptLoader.embedScript({
                        src: javascriptUrl,
                        params: undefined,
                        attributes: { type: 'text/javascript' },
                        callback: () => {
                            this.registerEventListeners(baseSite);
                            this.loaded$.next(true);
                            this.errorLoading$.next(false);
                        },
                        errorCallback: () => {
                            this.errorLoading$.next(true);
                            this.loaded$.next(false);
                        },
                    });
                    if (((_a = this.winRef) === null || _a === void 0 ? void 0 : _a.nativeWindow) !== undefined) {
                        this.winRef.nativeWindow['__gigyaConf'] = {
                            include: 'id_token',
                        };
                    }
                }
            }));
        }
    }
    getJavascriptUrlForCurrentSite(baseSite) {
        var _a;
        const filteredConfigs = ((_a = this.cdcConfig.cdc) !== null && _a !== void 0 ? _a : []).filter((conf) => conf.baseSite === baseSite);
        if (filteredConfigs && filteredConfigs.length > 0) {
            return filteredConfigs[0].javascriptUrl;
        }
        return '';
    }
    /**
     * Register login event listeners for CDC login
     *
     * @param baseSite
     */
    registerEventListeners(baseSite) {
        this.addCdcEventHandlers(baseSite);
    }
    /**
     * Method to register CDC event handlers
     *
     * @param baseSite
     */
    addCdcEventHandlers(baseSite) {
        var _a, _b, _c;
        (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a['gigya']) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.addEventHandlers({
            onLogin: (...params) => {
                this.zone.run(() => this.onLoginEventHandler(baseSite, ...params));
            },
        });
    }
    /**
     * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
     *
     * @param baseSite
     * @param response
     */
    onLoginEventHandler(baseSite, response) {
        if (response) {
            this.cdcAuth.loginWithCustomCdcFlow(response.UID, response.UIDSignature, response.signatureTimestamp, response.id_token !== undefined ? response.id_token : '', baseSite);
        }
    }
    /**
     * Trigger CDC User registration and log in using CDC APIs.
     *
     * @param user: UserSignUp
     */
    registerUserWithoutScreenSet(user) {
        return new Observable((initRegistration) => {
            var _a, _b, _c;
            if (!user.uid || !user.password) {
                initRegistration.error(null);
            }
            else {
                (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a['gigya']) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.initRegistration({
                    callback: (response) => {
                        this.zone.run(() => {
                            this.onInitRegistrationHandler(user, response).subscribe({
                                next: (result) => {
                                    initRegistration.next(result);
                                    initRegistration.complete();
                                },
                                error: (error) => initRegistration.error(error),
                            });
                        });
                    },
                });
            }
        });
    }
    /**
     * Trigger CDC User registration using CDC APIs.
     *
     * @param response
     */
    onInitRegistrationHandler(user, response) {
        return new Observable((isRegistered) => {
            var _a, _b, _c;
            if (response && response.regToken && user.uid && user.password) {
                (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a['gigya']) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.register({
                    email: user.uid,
                    password: user.password,
                    profile: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    regToken: response.regToken,
                    finalizeRegistration: true,
                    callback: (response) => {
                        this.zone.run(() => {
                            if ((response === null || response === void 0 ? void 0 : response.status) === 'OK') {
                                isRegistered.next(response);
                                isRegistered.complete();
                            }
                            else {
                                this.handleRegisterError(response);
                                isRegistered.error(response);
                            }
                        });
                    },
                });
            }
        });
    }
    /**
     * Trigger CDC User log in using CDC APIs.
     *
     * @param response
     */
    loginUserWithoutScreenSet(email, password) {
        return new Observable((isLoggedIn) => {
            var _a, _b, _c;
            (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a['gigya']) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.login({
                loginID: email,
                password: password,
                callback: (response) => {
                    this.zone.run(() => {
                        if ((response === null || response === void 0 ? void 0 : response.status) === 'OK') {
                            isLoggedIn.next({ status: response.status });
                            isLoggedIn.complete();
                        }
                        else {
                            this.handleLoginError(response);
                            isLoggedIn.error(response);
                        }
                    });
                },
            });
        });
    }
    /**
     * Show failure message to the user in case registration fails.
     *
     * @param response
     */
    handleRegisterError(response) {
        if (response && response.status === 'FAIL') {
            let errorMessage = (response.validationErrors &&
                response.validationErrors.length > 0 &&
                response.validationErrors[response.validationErrors.length - 1]
                    .message) ||
                'Error';
            this.globalMessageService.add(errorMessage, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    /**
     * Show failure message to the user in case login fails.
     *
     * @param response
     */
    handleLoginError(response) {
        if (response && response.status === 'FAIL') {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestPleaseLoginAgain',
                params: {
                    errorMessage: response.statusMessage,
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    /**
     * Trigger CDC forgot password using CDC APIs.
     *
     * @param email
     * @param password
     */
    resetPasswordWithoutScreenSet(email) {
        return new Observable((isResetPassword) => {
            var _a, _b, _c;
            if (email && email.length > 0) {
                (_c = (_b = (_a = this.winRef.nativeWindow) === null || _a === void 0 ? void 0 : _a['gigya']) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.resetPassword({
                    loginID: email,
                    callback: (response) => {
                        this.zone.run(() => {
                            this.handleResetPassResponse(response);
                            if ((response === null || response === void 0 ? void 0 : response.status) === 'OK') {
                                isResetPassword.next({ status: response.status });
                                isResetPassword.complete();
                            }
                            else {
                                isResetPassword.error(response);
                            }
                        });
                    },
                });
            }
        });
    }
    handleResetPassResponse(response) {
        if (response && response.status === 'OK') {
            this.globalMessageService.add({ key: 'forgottenPassword.passwordResetEmailSent' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
        else {
            this.globalMessageService.add({
                key: 'httpHandlers.unknownError',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    /**
     * Updates user details using the existing User API
     *
     * @param response
     */
    onProfileUpdateEventHandler(response) {
        if (response) {
            const userDetails = {};
            userDetails.firstName = response.profile.firstName;
            userDetails.lastName = response.profile.lastName;
            this.userProfileFacade.update(userDetails);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
CdcJsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcJsService, deps: [{ token: CdcConfig }, { token: i2.BaseSiteService }, { token: i2.LanguageService }, { token: i2.ScriptLoader }, { token: i2.WindowRef }, { token: CdcAuthFacade }, { token: i2.AuthService }, { token: i0.NgZone }, { token: i4.UserProfileFacade }, { token: PLATFORM_ID }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcJsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcJsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcJsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: CdcConfig }, { type: i2.BaseSiteService }, { type: i2.LanguageService }, { type: i2.ScriptLoader }, { type: i2.WindowRef }, { type: CdcAuthFacade }, { type: i2.AuthService }, { type: i0.NgZone }, { type: i4.UserProfileFacade }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: i2.GlobalMessageService }];
    } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function cdcJsFactory(cdcJsService, configInit) {
    const func = () => configInit
        .getStable('context', 'cdc')
        .pipe(tap(() => {
        cdcJsService.initialize();
    }))
        .toPromise();
    return func;
}
function defaultCdcComponentsConfig() {
    const config = {
        featureModules: {
            [CDC_FEATURE]: {
                cmsComponents: ['GigyaRaasComponent'],
            },
            // by default core is bundled together with components
            [CDC_CORE_FEATURE]: CDC_FEATURE,
        },
    };
    return config;
}
class CdcRootModule {
}
CdcRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule });
CdcRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule, providers: [
        provideDefaultConfigFactory(defaultCdcComponentsConfig),
        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
        {
            provide: APP_INITIALIZER,
            useFactory: cdcJsFactory,
            deps: [CdcJsService, ConfigInitializerService],
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultCdcComponentsConfig),
                        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: cdcJsFactory,
                            deps: [CdcJsService, ConfigInitializerService],
                            multi: true,
                        },
                    ],
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
 * Indicates the failure during the loading of the user token.
 */
class CdcLoadUserTokenFailEvent extends CxEvent {
}
/**
 * Event's type
 */
CdcLoadUserTokenFailEvent.type = 'CdcLoadUserTokenFailEvent';

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

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CDC_CORE_FEATURE, CDC_FEATURE, CdcAuthFacade, CdcConfig, CdcJsService, CdcLoadUserTokenFailEvent, CdcLogoutGuard, CdcRootModule, cdcJsFactory, defaultCdcComponentsConfig };
//# sourceMappingURL=spartacus-cdc-root.mjs.map
