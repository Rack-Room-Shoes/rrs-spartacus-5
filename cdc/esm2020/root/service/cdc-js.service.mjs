/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { combineLatest, Observable, ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/cdc-config";
import * as i2 from "@spartacus/core";
import * as i3 from "../facade/cdc-auth.facade";
import * as i4 from "@spartacus/user/profile/root";
export class CdcJsService {
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
                    if (this.winRef?.nativeWindow !== undefined) {
                        this.winRef.nativeWindow['__gigyaConf'] = {
                            include: 'id_token',
                        };
                    }
                }
            }));
        }
    }
    getJavascriptUrlForCurrentSite(baseSite) {
        const filteredConfigs = (this.cdcConfig.cdc ?? []).filter((conf) => conf.baseSite === baseSite);
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
        this.winRef.nativeWindow?.['gigya']?.accounts?.addEventHandlers({
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
            if (!user.uid || !user.password) {
                initRegistration.error(null);
            }
            else {
                this.winRef.nativeWindow?.['gigya']?.accounts?.initRegistration({
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
            if (response && response.regToken && user.uid && user.password) {
                this.winRef.nativeWindow?.['gigya']?.accounts?.register({
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
                            if (response?.status === 'OK') {
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
            this.winRef.nativeWindow?.['gigya']?.accounts?.login({
                loginID: email,
                password: password,
                callback: (response) => {
                    this.zone.run(() => {
                        if (response?.status === 'OK') {
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
            if (email && email.length > 0) {
                this.winRef.nativeWindow?.['gigya']?.accounts?.resetPassword({
                    loginID: email,
                    callback: (response) => {
                        this.zone.run(() => {
                            this.handleResetPassResponse(response);
                            if (response?.status === 'OK') {
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
CdcJsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcJsService, deps: [{ token: i1.CdcConfig }, { token: i2.BaseSiteService }, { token: i2.LanguageService }, { token: i2.ScriptLoader }, { token: i2.WindowRef }, { token: i3.CdcAuthFacade }, { token: i2.AuthService }, { token: i0.NgZone }, { token: i4.UserProfileFacade }, { token: PLATFORM_ID }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcJsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcJsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcJsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CdcConfig }, { type: i2.BaseSiteService }, { type: i2.LanguageService }, { type: i2.ScriptLoader }, { type: i2.WindowRef }, { type: i3.CdcAuthFacade }, { type: i2.AuthService }, { type: i0.NgZone }, { type: i4.UserProfileFacade }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWpzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9yb290L3NlcnZpY2UvY2RjLWpzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUdWLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBSUwsaUJBQWlCLEdBS2xCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU90QyxNQUFNLE9BQU8sWUFBWTtJQUt2QixZQUNZLFNBQW9CLEVBQ3BCLGVBQWdDLEVBQ2hDLGVBQWdDLEVBQ2hDLFlBQTBCLEVBQzFCLE1BQWlCLEVBQ2pCLE9BQXNCLEVBQ3RCLElBQWlCLEVBQ2pCLElBQVksRUFDWixpQkFBb0MsRUFDZixRQUFhLEVBQ2xDLG9CQUEwQztRQVYxQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2xDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFmNUMsWUFBTyxHQUFHLElBQUksYUFBYSxDQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLGtCQUFhLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7UUFDOUMsaUJBQVksR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWN2RCxDQUFDO0lBRUo7O09BRUc7SUFDSCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILGlCQUFpQjtRQUNmLCtDQUErQztRQUMvQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsYUFBYSxDQUFDO2dCQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTthQUNqQyxDQUFDO2lCQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsTUFBTSxpQkFBaUIsR0FDckIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLGlCQUFpQixFQUFFO29CQUNyQixNQUFNLGFBQWEsR0FBRyxHQUFHLGlCQUFpQixTQUFTLFFBQVEsRUFBRSxDQUFDO29CQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQzt3QkFDNUIsR0FBRyxFQUFFLGFBQWE7d0JBQ2xCLE1BQU0sRUFBRSxTQUFTO3dCQUNqQixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7d0JBQ3ZDLFFBQVEsRUFBRSxHQUFHLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2pDLENBQUM7d0JBQ0QsYUFBYSxFQUFFLEdBQUcsRUFBRTs0QkFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzQixDQUFDO3FCQUNGLENBQUMsQ0FBQztvQkFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxLQUFLLFNBQVMsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUF1QyxDQUNsRCxhQUFhLENBQ2QsR0FBRzs0QkFDRixPQUFPLEVBQUUsVUFBVTt5QkFDcEIsQ0FBQztxQkFDSDtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUNMLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTyw4QkFBOEIsQ0FBQyxRQUFnQjtRQUNyRCxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FDdkQsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUNyQyxDQUFDO1FBQ0YsSUFBSSxlQUFlLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakQsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1NBQ3pDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLHNCQUFzQixDQUFDLFFBQWdCO1FBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLG1CQUFtQixDQUFDLFFBQWdCO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBdUMsRUFBRSxDQUNwRCxPQUFPLENBQ1IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUM7WUFDNUIsT0FBTyxFQUFFLENBQUMsR0FBRyxNQUFhLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsUUFBYztRQUM1RCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQ2pDLFFBQVEsQ0FBQyxHQUFHLEVBQ1osUUFBUSxDQUFDLFlBQVksRUFDckIsUUFBUSxDQUFDLGtCQUFrQixFQUMzQixRQUFRLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUN4RCxRQUFRLENBQ1QsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw0QkFBNEIsQ0FDMUIsSUFBZ0I7UUFFaEIsT0FBTyxJQUFJLFVBQVUsQ0FBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDL0IsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBdUMsRUFBRSxDQUNwRCxPQUFPLENBQ1IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUM7b0JBQzVCLFFBQVEsRUFBRSxDQUFDLFFBQWEsRUFBRSxFQUFFO3dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7NEJBQ2pCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDO2dDQUN2RCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQ0FDZixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0NBQzlCLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUM5QixDQUFDO2dDQUNELEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs2QkFDaEQsQ0FBQyxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUM7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ08seUJBQXlCLENBQ2pDLElBQWdCLEVBQ2hCLFFBQWE7UUFFYixPQUFPLElBQUksVUFBVSxDQUFxQixDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3pELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQXVDLEVBQUUsQ0FDcEQsT0FBTyxDQUNSLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztvQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsT0FBTyxFQUFFO3dCQUNQLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzt3QkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3FCQUN4QjtvQkFDRCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7b0JBQzNCLG9CQUFvQixFQUFFLElBQUk7b0JBQzFCLFFBQVEsRUFBRSxDQUFDLFFBQWEsRUFBRSxFQUFFO3dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7NEJBQ2pCLElBQUksUUFBUSxFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0NBQzdCLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzVCLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs2QkFDekI7aUNBQU07Z0NBQ0wsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNuQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzZCQUM5Qjt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO2lCQUNGLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHlCQUF5QixDQUN2QixLQUFhLEVBQ2IsUUFBZ0I7UUFFaEIsT0FBTyxJQUFJLFVBQVUsQ0FBcUIsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQXVDLEVBQUUsQ0FDcEQsT0FBTyxDQUNSLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztnQkFDakIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxDQUFDLFFBQWEsRUFBRSxFQUFFO29CQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7d0JBQ2pCLElBQUksUUFBUSxFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7NEJBQzdDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDdkI7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNoQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUM1QjtvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLG1CQUFtQixDQUFDLFFBQWE7UUFDekMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7WUFDMUMsSUFBSSxZQUFZLEdBQ2QsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCO2dCQUN4QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3BDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztxQkFDNUQsT0FBTyxDQUFDO2dCQUNiLE9BQU8sQ0FBQztZQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLFlBQVksRUFDWixpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ08sZ0JBQWdCLENBQUMsUUFBYTtRQUN0QyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQjtnQkFDRSxHQUFHLEVBQUUseUNBQXlDO2dCQUM5QyxNQUFNLEVBQUU7b0JBQ04sWUFBWSxFQUFFLFFBQVEsQ0FBQyxhQUFhO2lCQUNyQzthQUNGLEVBQ0QsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw2QkFBNkIsQ0FBQyxLQUFhO1FBQ3pDLE9BQU8sSUFBSSxVQUFVLENBQXFCLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBdUMsRUFBRSxDQUNwRCxPQUFPLENBQ1IsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDO29CQUN6QixPQUFPLEVBQUUsS0FBSztvQkFDZCxRQUFRLEVBQUUsQ0FBQyxRQUFhLEVBQUUsRUFBRTt3QkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFOzRCQUNqQixJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBRXZDLElBQUksUUFBUSxFQUFFLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0NBQzdCLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0NBQ2xELGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs2QkFDNUI7aUNBQU07Z0NBQ0wsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDakM7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztpQkFDRixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLHVCQUF1QixDQUFDLFFBQWE7UUFDN0MsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsMENBQTBDLEVBQUUsRUFDbkQsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7Z0JBQ0UsR0FBRyxFQUFFLDJCQUEyQjthQUNqQyxFQUNELGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyQkFBMkIsQ0FBQyxRQUFjO1FBQ3hDLElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxXQUFXLEdBQVMsRUFBRSxDQUFDO1lBQzdCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDbkQsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7O3lHQWxWVSxZQUFZLDZRQWViLFdBQVc7NkdBZlYsWUFBWSxjQUZYLE1BQU07MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWdCSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBdXRoU2VydmljZSxcbiAgQmFzZVNpdGVTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIExhbmd1YWdlU2VydmljZSxcbiAgU2NyaXB0TG9hZGVyLFxuICBVc2VyLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSwgVXNlclNpZ25VcCB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2RjQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NkYy1jb25maWcnO1xuaW1wb3J0IHsgQ2RjQXV0aEZhY2FkZSB9IGZyb20gJy4uL2ZhY2FkZS9jZGMtYXV0aC5mYWNhZGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjSnNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIGxvYWRlZCQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcbiAgcHJvdGVjdGVkIGVycm9yTG9hZGluZyQgPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigxKTtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjZGNDb25maWc6IENkY0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgYmFzZVNpdGVTZXJ2aWNlOiBCYXNlU2l0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlcixcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIGNkY0F1dGg6IENkY0F1dGhGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHVzZXJQcm9maWxlRmFjYWRlOiBVc2VyUHJvZmlsZUZhY2FkZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm06IGFueSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBDREMgc2NyaXB0XG4gICAqL1xuICBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZENkY0phdmFzY3JpcHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9ic2VydmFibGUgd2l0aCB0aGUgaW5mb3JtYXRpb24gaWYgQ0RDIHNjcmlwdCBpcyBsb2FkZWQuXG4gICAqL1xuICBkaWRMb2FkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmxvYWRlZCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBvYnNlcnZhYmxlIHdpdGggdGhlIGluZm9ybWF0aW9uIGlmIENEQyBzY3JpcHQgZmFpbGVkIHRvIGxvYWQuXG4gICAqL1xuICBkaWRTY3JpcHRGYWlsVG9Mb2FkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmVycm9yTG9hZGluZyQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHdoaWNoIGxvYWRzIHRoZSBDREMgU2NyaXB0XG4gICAqL1xuICBsb2FkQ2RjSmF2YXNjcmlwdCgpOiB2b2lkIHtcbiAgICAvLyBPbmx5IGxvYWQgdGhlIHNjcmlwdCBvbiBjbGllbnQgc2lkZSAobm8gU1NSKVxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICB0aGlzLmJhc2VTaXRlU2VydmljZS5nZXRBY3RpdmUoKSxcbiAgICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5nZXRBY3RpdmUoKSxcbiAgICAgICAgXSlcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKFtiYXNlU2l0ZSwgbGFuZ3VhZ2VdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHRGb3JCYXNlU2l0ZSA9XG4gICAgICAgICAgICAgIHRoaXMuZ2V0SmF2YXNjcmlwdFVybEZvckN1cnJlbnRTaXRlKGJhc2VTaXRlKTtcbiAgICAgICAgICAgIGlmIChzY3JpcHRGb3JCYXNlU2l0ZSkge1xuICAgICAgICAgICAgICBjb25zdCBqYXZhc2NyaXB0VXJsID0gYCR7c2NyaXB0Rm9yQmFzZVNpdGV9Jmxhbmc9JHtsYW5ndWFnZX1gO1xuICAgICAgICAgICAgICB0aGlzLnNjcmlwdExvYWRlci5lbWJlZFNjcmlwdCh7XG4gICAgICAgICAgICAgICAgc3JjOiBqYXZhc2NyaXB0VXJsLFxuICAgICAgICAgICAgICAgIHBhcmFtczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKGJhc2VTaXRlKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkJC5uZXh0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmckLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmckLm5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCQubmV4dChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLndpblJlZj8ubmF0aXZlV2luZG93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pW1xuICAgICAgICAgICAgICAgICAgJ19fZ2lneWFDb25mJ1xuICAgICAgICAgICAgICAgIF0gPSB7XG4gICAgICAgICAgICAgICAgICBpbmNsdWRlOiAnaWRfdG9rZW4nLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEphdmFzY3JpcHRVcmxGb3JDdXJyZW50U2l0ZShiYXNlU2l0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBmaWx0ZXJlZENvbmZpZ3MgPSAodGhpcy5jZGNDb25maWcuY2RjID8/IFtdKS5maWx0ZXIoXG4gICAgICAoY29uZikgPT4gY29uZi5iYXNlU2l0ZSA9PT0gYmFzZVNpdGVcbiAgICApO1xuICAgIGlmIChmaWx0ZXJlZENvbmZpZ3MgJiYgZmlsdGVyZWRDb25maWdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWx0ZXJlZENvbmZpZ3NbMF0uamF2YXNjcmlwdFVybDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGxvZ2luIGV2ZW50IGxpc3RlbmVycyBmb3IgQ0RDIGxvZ2luXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlU2l0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoYmFzZVNpdGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ2RjRXZlbnRIYW5kbGVycyhiYXNlU2l0ZSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIHJlZ2lzdGVyIENEQyBldmVudCBoYW5kbGVyc1xuICAgKlxuICAgKiBAcGFyYW0gYmFzZVNpdGVcbiAgICovXG4gIHByb3RlY3RlZCBhZGRDZGNFdmVudEhhbmRsZXJzKGJhc2VTaXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pPy5bXG4gICAgICAnZ2lneWEnXG4gICAgXT8uYWNjb3VudHM/LmFkZEV2ZW50SGFuZGxlcnMoe1xuICAgICAgb25Mb2dpbjogKC4uLnBhcmFtczogYW55W10pID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLm9uTG9naW5FdmVudEhhbmRsZXIoYmFzZVNpdGUsIC4uLnBhcmFtcykpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGxvZ2luIHRvIENvbW1lcmNlIG9uY2UgYW4gb25Mb2dpbiBldmVudCBpcyB0cmlnZ2VyZWQgYnkgQ0RDIFNjcmVlbiBTZXQuXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlU2l0ZVxuICAgKiBAcGFyYW0gcmVzcG9uc2VcbiAgICovXG4gIHByb3RlY3RlZCBvbkxvZ2luRXZlbnRIYW5kbGVyKGJhc2VTaXRlOiBzdHJpbmcsIHJlc3BvbnNlPzogYW55KSB7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICB0aGlzLmNkY0F1dGgubG9naW5XaXRoQ3VzdG9tQ2RjRmxvdyhcbiAgICAgICAgcmVzcG9uc2UuVUlELFxuICAgICAgICByZXNwb25zZS5VSURTaWduYXR1cmUsXG4gICAgICAgIHJlc3BvbnNlLnNpZ25hdHVyZVRpbWVzdGFtcCxcbiAgICAgICAgcmVzcG9uc2UuaWRfdG9rZW4gIT09IHVuZGVmaW5lZCA/IHJlc3BvbnNlLmlkX3Rva2VuIDogJycsXG4gICAgICAgIGJhc2VTaXRlXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBVc2VyIHJlZ2lzdHJhdGlvbiBhbmQgbG9nIGluIHVzaW5nIENEQyBBUElzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcjogVXNlclNpZ25VcFxuICAgKi9cbiAgcmVnaXN0ZXJVc2VyV2l0aG91dFNjcmVlblNldChcbiAgICB1c2VyOiBVc2VyU2lnblVwXG4gICk6IE9ic2VydmFibGU8eyBzdGF0dXM6IHN0cmluZyB9PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHsgc3RhdHVzOiBzdHJpbmcgfT4oKGluaXRSZWdpc3RyYXRpb24pID0+IHtcbiAgICAgIGlmICghdXNlci51aWQgfHwgIXVzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgaW5pdFJlZ2lzdHJhdGlvbi5lcnJvcihudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICh0aGlzLndpblJlZi5uYXRpdmVXaW5kb3cgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfSk/LltcbiAgICAgICAgICAnZ2lneWEnXG4gICAgICAgIF0/LmFjY291bnRzPy5pbml0UmVnaXN0cmF0aW9uKHtcbiAgICAgICAgICBjYWxsYmFjazogKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9uSW5pdFJlZ2lzdHJhdGlvbkhhbmRsZXIodXNlciwgcmVzcG9uc2UpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgbmV4dDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaW5pdFJlZ2lzdHJhdGlvbi5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICBpbml0UmVnaXN0cmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiBpbml0UmVnaXN0cmF0aW9uLmVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBVc2VyIHJlZ2lzdHJhdGlvbiB1c2luZyBDREMgQVBJcy5cbiAgICpcbiAgICogQHBhcmFtIHJlc3BvbnNlXG4gICAqL1xuICBwcm90ZWN0ZWQgb25Jbml0UmVnaXN0cmF0aW9uSGFuZGxlcihcbiAgICB1c2VyOiBVc2VyU2lnblVwLFxuICAgIHJlc3BvbnNlOiBhbnlcbiAgKTogT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8eyBzdGF0dXM6IHN0cmluZyB9PigoaXNSZWdpc3RlcmVkKSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVnVG9rZW4gJiYgdXNlci51aWQgJiYgdXNlci5wYXNzd29yZCkge1xuICAgICAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pPy5bXG4gICAgICAgICAgJ2dpZ3lhJ1xuICAgICAgICBdPy5hY2NvdW50cz8ucmVnaXN0ZXIoe1xuICAgICAgICAgIGVtYWlsOiB1c2VyLnVpZCxcbiAgICAgICAgICBwYXNzd29yZDogdXNlci5wYXNzd29yZCxcbiAgICAgICAgICBwcm9maWxlOiB7XG4gICAgICAgICAgICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWdUb2tlbjogcmVzcG9uc2UucmVnVG9rZW4sXG4gICAgICAgICAgZmluYWxpemVSZWdpc3RyYXRpb246IHRydWUsXG4gICAgICAgICAgY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlPy5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgICAgICBpc1JlZ2lzdGVyZWQubmV4dChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaXNSZWdpc3RlcmVkLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZWdpc3RlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBpc1JlZ2lzdGVyZWQuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIENEQyBVc2VyIGxvZyBpbiB1c2luZyBDREMgQVBJcy5cbiAgICpcbiAgICogQHBhcmFtIHJlc3BvbnNlXG4gICAqL1xuICBsb2dpblVzZXJXaXRob3V0U2NyZWVuU2V0KFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgcGFzc3dvcmQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHsgc3RhdHVzOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+KChpc0xvZ2dlZEluKSA9PiB7XG4gICAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pPy5bXG4gICAgICAgICdnaWd5YSdcbiAgICAgIF0/LmFjY291bnRzPy5sb2dpbih7XG4gICAgICAgIGxvZ2luSUQ6IGVtYWlsLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgIGNhbGxiYWNrOiAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlPy5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgICAgaXNMb2dnZWRJbi5uZXh0KHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSk7XG4gICAgICAgICAgICAgIGlzTG9nZ2VkSW4uY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaGFuZGxlTG9naW5FcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgIGlzTG9nZ2VkSW4uZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBmYWlsdXJlIG1lc3NhZ2UgdG8gdGhlIHVzZXIgaW4gY2FzZSByZWdpc3RyYXRpb24gZmFpbHMuXG4gICAqXG4gICAqIEBwYXJhbSByZXNwb25zZVxuICAgKi9cbiAgcHJvdGVjdGVkIGhhbmRsZVJlZ2lzdGVyRXJyb3IocmVzcG9uc2U6IGFueSkge1xuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09ICdGQUlMJykge1xuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9XG4gICAgICAgIChyZXNwb25zZS52YWxpZGF0aW9uRXJyb3JzICYmXG4gICAgICAgICAgcmVzcG9uc2UudmFsaWRhdGlvbkVycm9ycy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgcmVzcG9uc2UudmFsaWRhdGlvbkVycm9yc1tyZXNwb25zZS52YWxpZGF0aW9uRXJyb3JzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAubWVzc2FnZSkgfHxcbiAgICAgICAgJ0Vycm9yJztcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IGZhaWx1cmUgbWVzc2FnZSB0byB0aGUgdXNlciBpbiBjYXNlIGxvZ2luIGZhaWxzLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzcG9uc2VcbiAgICovXG4gIHByb3RlY3RlZCBoYW5kbGVMb2dpbkVycm9yKHJlc3BvbnNlOiBhbnkpIHtcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAnRkFJTCcpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnaHR0cEhhbmRsZXJzLmJhZFJlcXVlc3RQbGVhc2VMb2dpbkFnYWluJyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2Uuc3RhdHVzTWVzc2FnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBDREMgZm9yZ290IHBhc3N3b3JkIHVzaW5nIENEQyBBUElzLlxuICAgKlxuICAgKiBAcGFyYW0gZW1haWxcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICByZXNldFBhc3N3b3JkV2l0aG91dFNjcmVlblNldChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTx7IHN0YXR1czogc3RyaW5nIH0+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8eyBzdGF0dXM6IHN0cmluZyB9PigoaXNSZXNldFBhc3N3b3JkKSA9PiB7XG4gICAgICBpZiAoZW1haWwgJiYgZW1haWwubGVuZ3RoID4gMCkge1xuICAgICAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pPy5bXG4gICAgICAgICAgJ2dpZ3lhJ1xuICAgICAgICBdPy5hY2NvdW50cz8ucmVzZXRQYXNzd29yZCh7XG4gICAgICAgICAgbG9naW5JRDogZW1haWwsXG4gICAgICAgICAgY2FsbGJhY2s6IChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZXNldFBhc3NSZXNwb25zZShyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlPy5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgICAgICBpc1Jlc2V0UGFzc3dvcmQubmV4dCh7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pO1xuICAgICAgICAgICAgICAgIGlzUmVzZXRQYXNzd29yZC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlzUmVzZXRQYXNzd29yZC5lcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVJlc2V0UGFzc1Jlc3BvbnNlKHJlc3BvbnNlOiBhbnkpIHtcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAnT0snKSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgeyBrZXk6ICdmb3Jnb3R0ZW5QYXNzd29yZC5wYXNzd29yZFJlc2V0RW1haWxTZW50JyB9LFxuICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnaHR0cEhhbmRsZXJzLnVua25vd25FcnJvcicsXG4gICAgICAgIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHVzZXIgZGV0YWlscyB1c2luZyB0aGUgZXhpc3RpbmcgVXNlciBBUElcbiAgICpcbiAgICogQHBhcmFtIHJlc3BvbnNlXG4gICAqL1xuICBvblByb2ZpbGVVcGRhdGVFdmVudEhhbmRsZXIocmVzcG9uc2U/OiBhbnkpIHtcbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIGNvbnN0IHVzZXJEZXRhaWxzOiBVc2VyID0ge307XG4gICAgICB1c2VyRGV0YWlscy5maXJzdE5hbWUgPSByZXNwb25zZS5wcm9maWxlLmZpcnN0TmFtZTtcbiAgICAgIHVzZXJEZXRhaWxzLmxhc3ROYW1lID0gcmVzcG9uc2UucHJvZmlsZS5sYXN0TmFtZTtcbiAgICAgIHRoaXMudXNlclByb2ZpbGVGYWNhZGUudXBkYXRlKHVzZXJEZXRhaWxzKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=