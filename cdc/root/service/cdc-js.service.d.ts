import { NgZone, OnDestroy } from '@angular/core';
import { AuthService, BaseSiteService, GlobalMessageService, LanguageService, ScriptLoader, WindowRef } from '@spartacus/core';
import { UserProfileFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { CdcConfig } from '../config/cdc-config';
import { CdcAuthFacade } from '../facade/cdc-auth.facade';
import * as i0 from "@angular/core";
export declare class CdcJsService implements OnDestroy {
    protected cdcConfig: CdcConfig;
    protected baseSiteService: BaseSiteService;
    protected languageService: LanguageService;
    protected scriptLoader: ScriptLoader;
    protected winRef: WindowRef;
    protected cdcAuth: CdcAuthFacade;
    protected auth: AuthService;
    protected zone: NgZone;
    protected userProfileFacade: UserProfileFacade;
    protected platform: any;
    protected globalMessageService: GlobalMessageService;
    protected loaded$: ReplaySubject<boolean>;
    protected errorLoading$: ReplaySubject<boolean>;
    protected subscription: Subscription;
    constructor(cdcConfig: CdcConfig, baseSiteService: BaseSiteService, languageService: LanguageService, scriptLoader: ScriptLoader, winRef: WindowRef, cdcAuth: CdcAuthFacade, auth: AuthService, zone: NgZone, userProfileFacade: UserProfileFacade, platform: any, globalMessageService: GlobalMessageService);
    /**
     * Initialize CDC script
     */
    initialize(): void;
    /**
     * Returns observable with the information if CDC script is loaded.
     */
    didLoad(): Observable<boolean>;
    /**
     * Returns observable with the information if CDC script failed to load.
     */
    didScriptFailToLoad(): Observable<boolean>;
    /**
     * Method which loads the CDC Script
     */
    loadCdcJavascript(): void;
    private getJavascriptUrlForCurrentSite;
    /**
     * Register login event listeners for CDC login
     *
     * @param baseSite
     */
    protected registerEventListeners(baseSite: string): void;
    /**
     * Method to register CDC event handlers
     *
     * @param baseSite
     */
    protected addCdcEventHandlers(baseSite: string): void;
    /**
     * Trigger login to Commerce once an onLogin event is triggered by CDC Screen Set.
     *
     * @param baseSite
     * @param response
     */
    protected onLoginEventHandler(baseSite: string, response?: any): void;
    /**
     * Trigger CDC User registration and log in using CDC APIs.
     *
     * @param user: UserSignUp
     */
    registerUserWithoutScreenSet(user: UserSignUp): Observable<{
        status: string;
    }>;
    /**
     * Trigger CDC User registration using CDC APIs.
     *
     * @param response
     */
    protected onInitRegistrationHandler(user: UserSignUp, response: any): Observable<{
        status: string;
    }>;
    /**
     * Trigger CDC User log in using CDC APIs.
     *
     * @param response
     */
    loginUserWithoutScreenSet(email: string, password: string): Observable<{
        status: string;
    }>;
    /**
     * Show failure message to the user in case registration fails.
     *
     * @param response
     */
    protected handleRegisterError(response: any): void;
    /**
     * Show failure message to the user in case login fails.
     *
     * @param response
     */
    protected handleLoginError(response: any): void;
    /**
     * Trigger CDC forgot password using CDC APIs.
     *
     * @param email
     * @param password
     */
    resetPasswordWithoutScreenSet(email: string): Observable<{
        status: string;
    }>;
    protected handleResetPassResponse(response: any): void;
    /**
     * Updates user details using the existing User API
     *
     * @param response
     */
    onProfileUpdateEventHandler(response?: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcJsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcJsService>;
}
