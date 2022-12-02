import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i4 from '@spartacus/cdc/root';
import { CdcLoadUserTokenFailEvent, CdcJsService } from '@spartacus/cdc/root';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, UrlModule, I18nModule, provideDefaultConfig, CommandService, GlobalMessageService, AuthService, EventService, RoutingService, AuthConfigService } from '@spartacus/core';
import { RegisterComponentService, ForgotPasswordComponentService, ForgotPasswordComponent } from '@spartacus/user/profile/components';
import { throwError, merge, Subscription } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import * as i1 from '@spartacus/user/profile/root';
import { UserRegisterFacade, UserPasswordFacade } from '@spartacus/user/profile/root';
import * as i3 from '@ngrx/store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule, FormErrorsModule, NgSelectA11yModule } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCRegisterComponentService extends RegisterComponentService {
    constructor(userRegisterFacade, command, store, cdcJSService, globalMessageService, authService, eventService) {
        super(userRegisterFacade, globalMessageService);
        this.userRegisterFacade = userRegisterFacade;
        this.command = command;
        this.store = store;
        this.cdcJSService = cdcJSService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.eventService = eventService;
        this.registerCommand = this.command.create(({ user }) => 
        // Registering user through CDC Gigya SDK
        this.cdcJSService.registerUserWithoutScreenSet(user));
        this.loadUserTokenFailed$ = this.eventService
            .get(CdcLoadUserTokenFailEvent)
            .pipe(map((event) => !!event), tap((failed) => {
            if (failed) {
                throw new Error(`User token failed to load.`);
            }
        }));
        this.isLoggedIn$ = this.authService
            .isUserLoggedIn()
            .pipe(filter((loggedIn) => loggedIn));
    }
    /**
     * Register a new user using CDC SDK.
     *
     * @param user as UserSignUp
     */
    register(user) {
        if (!user.firstName || !user.lastName || !user.uid || !user.password) {
            return throwError(`The provided user is not valid: ${user}`);
        }
        return this.cdcJSService.didLoad().pipe(tap((cdcLoaded) => {
            if (!cdcLoaded) {
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                throw new Error(`CDC script didn't load.`);
            }
        }), switchMap(() => 
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })), switchMap((user) => merge(this.loadUserTokenFailed$, this.isLoggedIn$).pipe(map(() => user))));
    }
    // @override
    postRegisterMessage() {
        // don't show the message
    }
}
CDCRegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.CommandService }, { token: i3.Store }, { token: i4.CdcJsService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCRegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.CommandService }, { type: i3.Store }, { type: i4.CdcJsService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCRegisterModule {
}
CDCRegisterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCRegisterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
CDCRegisterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                RegisterCustomerComponent: {
                    providers: [
                        {
                            provide: RegisterComponentService,
                            useClass: CDCRegisterComponentService,
                            deps: [
                                UserRegisterFacade,
                                CommandService,
                                Store,
                                CdcJsService,
                                GlobalMessageService,
                                AuthService,
                                EventService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        FormErrorsModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                RegisterCustomerComponent: {
                                    providers: [
                                        {
                                            provide: RegisterComponentService,
                                            useClass: CDCRegisterComponentService,
                                            deps: [
                                                UserRegisterFacade,
                                                CommandService,
                                                Store,
                                                CdcJsService,
                                                GlobalMessageService,
                                                AuthService,
                                                EventService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
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
class CDCForgotPasswordComponentService extends ForgotPasswordComponentService {
    constructor(userPasswordService, routingService, authConfigService, globalMessage, cdcJsService) {
        super(userPasswordService, routingService, authConfigService, globalMessage);
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.authConfigService = authConfigService;
        this.globalMessage = globalMessage;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    /**
     * Sends an email to through CDC SDK to reset the password.
     */
    requestEmail() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Reset password using CDC Gigya SDK
                this.cdcJsService
                    .resetPasswordWithoutScreenSet(this.form.value.userEmail)
                    .subscribe({
                    next: (response) => {
                        this.busy$.next(false);
                        if (response.status === 'OK') {
                            this.redirect();
                        }
                    },
                    error: () => this.busy$.next(false),
                });
            }
            else {
                this.busy$.next(false);
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessage.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CDCForgotPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.AuthConfigService }, { token: i2.GlobalMessageService }, { token: i4.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCForgotPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.AuthConfigService }, { type: i2.GlobalMessageService }, { type: i4.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCForgotPasswordModule {
}
CDCForgotPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCForgotPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
CDCForgotPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ForgotPasswordComponent: {
                    component: ForgotPasswordComponent,
                    providers: [
                        {
                            provide: ForgotPasswordComponentService,
                            useClass: CDCForgotPasswordComponentService,
                            deps: [
                                UserPasswordFacade,
                                RoutingService,
                                AuthConfigService,
                                GlobalMessageService,
                                CdcJsService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ForgotPasswordComponent: {
                                    component: ForgotPasswordComponent,
                                    providers: [
                                        {
                                            provide: ForgotPasswordComponentService,
                                            useClass: CDCForgotPasswordComponentService,
                                            deps: [
                                                UserPasswordFacade,
                                                RoutingService,
                                                AuthConfigService,
                                                GlobalMessageService,
                                                CdcJsService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
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
class CDCUserProfileModule {
}
CDCUserProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUserProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule, CDCForgotPasswordModule] });
CDCUserProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule, CDCForgotPasswordModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CDCRegisterModule, CDCForgotPasswordModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CDCForgotPasswordComponentService, CDCForgotPasswordModule, CDCRegisterComponentService, CDCRegisterModule, CDCUserProfileModule };
//# sourceMappingURL=spartacus-cdc-user-profile.mjs.map
