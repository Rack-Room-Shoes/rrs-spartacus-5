import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { GlobalMessageType, UrlModule, I18nModule, provideDefaultConfig, AuthService, GlobalMessageService, WindowRef } from '@spartacus/core';
import { LoginFormComponentService, LoginFormComponent } from '@spartacus/user/account/components';
import { Subscription } from 'rxjs';
import * as i2 from '@spartacus/cdc/root';
import { CdcJsService } from '@spartacus/cdc/root';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcLoginFormComponentService extends LoginFormComponentService {
    constructor(auth, globalMessageService, winRef, cdcJsService) {
        super(auth, globalMessageService, winRef);
        this.auth = auth;
        this.globalMessageService = globalMessageService;
        this.winRef = winRef;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Logging in using CDC Gigya SDK
                this.cdcJsService
                    .loginUserWithoutScreenSet(this.form.value.userId.toLowerCase(), this.form.value.password)
                    .subscribe({
                    next: () => this.busy$.next(false),
                    error: () => this.busy$.next(false),
                });
            }
            else {
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                this.busy$.next(false);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcLoginFormComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLoginFormComponentService, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.WindowRef }, { token: i2.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLoginFormComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLoginFormComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLoginFormComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.WindowRef }, { type: i2.CdcJsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CDCLoginFormModule {
}
CDCLoginFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCLoginFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
CDCLoginFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerLoginComponent: {
                    component: LoginFormComponent,
                    providers: [
                        {
                            provide: LoginFormComponentService,
                            useClass: CdcLoginFormComponentService,
                            deps: [
                                AuthService,
                                GlobalMessageService,
                                WindowRef,
                                CdcJsService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
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
                                ReturningCustomerLoginComponent: {
                                    component: LoginFormComponent,
                                    providers: [
                                        {
                                            provide: LoginFormComponentService,
                                            useClass: CdcLoginFormComponentService,
                                            deps: [
                                                AuthService,
                                                GlobalMessageService,
                                                WindowRef,
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
class CDCUserAccountModule {
}
CDCUserAccountModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserAccountModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUserAccountModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCUserAccountModule, imports: [CDCLoginFormModule] });
CDCUserAccountModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserAccountModule, imports: [CDCLoginFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserAccountModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CDCLoginFormModule],
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

export { CDCLoginFormModule, CDCUserAccountModule, CdcLoginFormComponentService };
//# sourceMappingURL=spartacus-cdc-user-account.mjs.map
