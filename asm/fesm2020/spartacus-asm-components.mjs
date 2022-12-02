import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, ViewChild, Pipe, HostBinding, NgModule } from '@angular/core';
import * as i1$1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@spartacus/core';
import { GlobalMessageType, I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i3$1 from '@spartacus/storefront';
import { FormErrorsModule, PasswordVisibilityToggleModule } from '@spartacus/storefront';
import { Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, take } from 'rxjs/operators';
import * as i2 from '@spartacus/asm/root';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '@spartacus/asm/root';
import * as i2$1 from '@spartacus/asm/core';
import * as i2$2 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmComponentService {
    constructor(authService, csAgentAuthService, winRef) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.winRef = winRef;
    }
    logoutCustomerSupportAgentAndCustomer() {
        this.csAgentAuthService.logoutCustomerSupportAgent();
    }
    logoutCustomer() {
        this.authService.logout();
    }
    isCustomerEmulationSessionInProgress() {
        return this.csAgentAuthService.isCustomerEmulated();
    }
    /**
     * We're currently only removing the persisted storage in the browser
     * to ensure the ASM experience isn't loaded on the next visit. There are a few
     * optimizations we could think of:
     * - drop the `asm` parameter from the URL, in case it's still there
     * - remove the generated UI from the DOM (outlets currently do not support this)
     */
    unload() {
        if (this.winRef.localStorage) {
            this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
        }
    }
}
AsmComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentService, deps: [{ token: i1.AuthService }, { token: i2.CsAgentAuthService }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
AsmComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.CsAgentAuthService }, { type: i1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CSAgentLoginFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.csAgentTokenLoading = false;
        this.submitEvent = new EventEmitter();
    }
    ngOnInit() {
        this.csAgentLoginForm = this.fb.group({
            userId: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
    onSubmit() {
        if (this.csAgentLoginForm.valid) {
            this.submitEvent.emit({
                userId: this.csAgentLoginForm.get('userId')?.value,
                password: this.csAgentLoginForm.get('password')?.value,
            });
        }
        else {
            this.csAgentLoginForm.markAllAsTouched();
        }
    }
}
CSAgentLoginFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CSAgentLoginFormComponent, deps: [{ token: i1$1.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
CSAgentLoginFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CSAgentLoginFormComponent, selector: "cx-csagent-login-form", inputs: { csAgentTokenLoading: "csAgentTokenLoading" }, outputs: { submitEvent: "submitEvent" }, ngImport: i0, template: "<form\n  (ngSubmit)=\"onSubmit()\"\n  [formGroup]=\"csAgentLoginForm\"\n  *ngIf=\"!csAgentTokenLoading\"\n>\n  <label>\n    <input\n      required=\"true\"\n      type=\"text\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'asm.loginForm.userId.label' | cxTranslate }}\"\n    />\n    <cx-form-errors [control]=\"csAgentLoginForm.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <input\n      required=\"true\"\n      type=\"password\"\n      placeholder=\"{{ 'asm.loginForm.password.label' | cxTranslate }}\"\n      formControlName=\"password\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors\n      [control]=\"csAgentLoginForm.get('password')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.loginForm.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div\n  *ngIf=\"csAgentTokenLoading\"\n  class=\"spinner\"\n  aria-hidden=\"false\"\n  [attr.aria-label]=\"'common.loading' | cxTranslate\"\n>\n  <div></div>\n  <div></div>\n  <div></div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i3$1.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CSAgentLoginFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-csagent-login-form', template: "<form\n  (ngSubmit)=\"onSubmit()\"\n  [formGroup]=\"csAgentLoginForm\"\n  *ngIf=\"!csAgentTokenLoading\"\n>\n  <label>\n    <input\n      required=\"true\"\n      type=\"text\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'asm.loginForm.userId.label' | cxTranslate }}\"\n    />\n    <cx-form-errors [control]=\"csAgentLoginForm.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <input\n      required=\"true\"\n      type=\"password\"\n      placeholder=\"{{ 'asm.loginForm.password.label' | cxTranslate }}\"\n      formControlName=\"password\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors\n      [control]=\"csAgentLoginForm.get('password')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.loginForm.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div\n  *ngIf=\"csAgentTokenLoading\"\n  class=\"spinner\"\n  aria-hidden=\"false\"\n  [attr.aria-label]=\"'common.loading' | cxTranslate\"\n>\n  <div></div>\n  <div></div>\n  <div></div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.UntypedFormBuilder }]; }, propDecorators: { csAgentTokenLoading: [{
                type: Input
            }], submitEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerSelectionComponent {
    constructor(fb, asmService, config) {
        this.fb = fb;
        this.asmService = asmService;
        this.config = config;
        this.subscription = new Subscription();
        this.submitEvent = new EventEmitter();
    }
    ngOnInit() {
        this.customerSelectionForm = this.fb.group({
            searchTerm: ['', Validators.required],
        });
        this.asmService.customerSearchReset();
        this.searchResultsLoading$ =
            this.asmService.getCustomerSearchResultsLoading();
        this.searchResults = this.asmService.getCustomerSearchResults();
        this.subscription.add(this.customerSelectionForm.controls.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((searchTermValue) => {
            this.handleSearchTerm(searchTermValue);
        }));
    }
    handleSearchTerm(searchTermValue) {
        if (!!this.selectedCustomer &&
            searchTermValue !== this.selectedCustomer.name) {
            this.selectedCustomer = undefined;
        }
        if (Boolean(this.selectedCustomer)) {
            return;
        }
        this.asmService.customerSearchReset();
        if (searchTermValue.trim().length >= 3) {
            this.asmService.customerSearch({
                query: searchTermValue,
                pageSize: this.config.asm?.customerSearch?.maxResults,
            });
        }
    }
    selectCustomerFromList(customer) {
        this.selectedCustomer = customer;
        this.customerSelectionForm.controls.searchTerm.setValue(this.selectedCustomer.name);
        this.asmService.customerSearchReset();
    }
    onSubmit() {
        if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
            this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
        }
        else {
            this.customerSelectionForm.markAllAsTouched();
        }
    }
    onDocumentClick(event) {
        if (Boolean(this.resultList)) {
            if (this.resultList.nativeElement.contains(event.target) ||
                this.searchTerm.nativeElement.contains(event.target)) {
                return;
            }
            else {
                this.asmService.customerSearchReset();
            }
        }
    }
    closeResults() {
        this.asmService.customerSearchReset();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.asmService.customerSearchReset();
    }
}
CustomerSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerSelectionComponent, deps: [{ token: i1$1.UntypedFormBuilder }, { token: i2$1.AsmService }, { token: i2$1.AsmConfig }], target: i0.ɵɵFactoryTarget.Component });
CustomerSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: { submitEvent: "submitEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "resultList", first: true, predicate: ["resultList"], descendants: true }, { propertyName: "searchTerm", first: true, predicate: ["searchTerm"], descendants: true }], ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    *ngFor=\"let result of results.entries\"\n    (click)=\"selectCustomerFromList(result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    (click)=\"closeResults()\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <div\n    class=\"spinner\"\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  >\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerSelectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-selection', host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    *ngFor=\"let result of results.entries\"\n    (click)=\"selectCustomerFromList(result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    (click)=\"closeResults()\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <div\n    class=\"spinner\"\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  >\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.UntypedFormBuilder }, { type: i2$1.AsmService }, { type: i2$1.AsmConfig }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], resultList: [{
                type: ViewChild,
                args: ['resultList']
            }], searchTerm: [{
                type: ViewChild,
                args: ['searchTerm']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FormatTimerPipe {
    transform(totalSeconds) {
        if (totalSeconds < 0) {
            totalSeconds = 0;
        }
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let zeroPaddedMinutes;
        if (minutes < 10) {
            zeroPaddedMinutes = ('00' + minutes).slice(-2);
        }
        else {
            zeroPaddedMinutes = minutes + '';
        }
        const zeroPaddedSeconds = ('00' + seconds).slice(-2);
        return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
    }
}
FormatTimerPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FormatTimerPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormatTimerPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: FormatTimerPipe, name: "formatTimer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FormatTimerPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatTimer',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmSessionTimerComponent {
    constructor(config, asmComponentService, routingService, changeDetectorRef, userIdService) {
        this.config = config;
        this.asmComponentService = asmComponentService;
        this.routingService = routingService;
        this.changeDetectorRef = changeDetectorRef;
        this.userIdService = userIdService;
        this.subscriptions = new Subscription();
        this.maxStartDelayInSeconds = 60000;
    }
    ngOnInit() {
        this.timeLeft = this.getTimerStartDelayInSeconds();
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            }
            else {
                clearInterval(this.interval);
                this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
            }
            this.changeDetectorRef.markForCheck();
        }, 1000);
        this.resetOnNavigate();
        this.resetOnCustomerSessionChange();
    }
    resetOnNavigate() {
        this.subscriptions.add(this.routingService.isNavigating().subscribe((isNavigating) => {
            if (isNavigating) {
                this.resetTimer();
            }
        }));
    }
    resetOnCustomerSessionChange() {
        this.subscriptions.add(this.userIdService
            .getUserId()
            .pipe(distinctUntilChanged())
            .subscribe(() => this.resetTimer()));
    }
    resetTimer() {
        if (this.timeLeft > 0) {
            this.timeLeft = this.getTimerStartDelayInSeconds();
        }
    }
    getTimerStartDelayInSeconds() {
        if (this.config.asm?.agentSessionTimer?.startingDelayInSeconds === undefined) {
            return 600;
        }
        if (this.config.asm.agentSessionTimer.startingDelayInSeconds >
            this.maxStartDelayInSeconds) {
            return this.maxStartDelayInSeconds;
        }
        else {
            return this.config.asm.agentSessionTimer.startingDelayInSeconds;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
AsmSessionTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmSessionTimerComponent, deps: [{ token: i2$1.AsmConfig }, { token: AsmComponentService }, { token: i1.RoutingService }, { token: i0.ChangeDetectorRef }, { token: i1.UserIdService }], target: i0.ɵɵFactoryTarget.Component });
AsmSessionTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer", ngImport: i0, template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n", dependencies: [{ kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: FormatTimerPipe, name: "formatTimer" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmSessionTimerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-session-timer', template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.AsmConfig }, { type: AsmComponentService }, { type: i1.RoutingService }, { type: i0.ChangeDetectorRef }, { type: i1.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerEmulationComponent {
    constructor(asmComponentService, userAccountFacade) {
        this.asmComponentService = asmComponentService;
        this.userAccountFacade = userAccountFacade;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.userAccountFacade.get().subscribe((user) => {
            if (user) {
                this.customer = user;
            }
        }));
        this.isCustomerEmulationSessionInProgress$ =
            this.asmComponentService.isCustomerEmulationSessionInProgress();
    }
    logoutCustomer() {
        this.asmComponentService.logoutCustomer();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CustomerEmulationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEmulationComponent, deps: [{ token: AsmComponentService }, { token: i2$2.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
CustomerEmulationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CustomerEmulationComponent, selector: "cx-customer-emulation", ngImport: i0, template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <input\n    formcontrolname=\"customer\"\n    type=\"text\"\n    disabled=\"true\"\n    placeholder=\"{{ customer?.name }}, {{ customer?.uid }}\"\n  />\n  <button (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEmulationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-emulation', template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <input\n    formcontrolname=\"customer\"\n    type=\"text\"\n    disabled=\"true\"\n    placeholder=\"{{ customer?.name }}, {{ customer?.uid }}\"\n  />\n  <button (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: AsmComponentService }, { type: i2$2.UserAccountFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmToggleUiComponent {
    constructor(asmService) {
        this.asmService = asmService;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.asmService.getAsmUiState().subscribe((uiState) => {
            this.isCollapsed =
                uiState.collapsed === undefined ? false : uiState.collapsed;
        }));
    }
    toggleUi() {
        this.asmService.updateAsmUiState({ collapsed: !this.isCollapsed });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmToggleUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmToggleUiComponent, deps: [{ token: i2$1.AsmService }], target: i0.ɵɵFactoryTarget.Component });
AsmToggleUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui", ngImport: i0, template: "<a class=\"toggleUi\" (click)=\"toggleUi()\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmToggleUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-toggle-ui', template: "<a class=\"toggleUi\" (click)=\"toggleUi()\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.AsmService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmMainUiComponent {
    constructor(authService, csAgentAuthService, asmComponentService, globalMessageService, routingService, asmService, userAccountFacade) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.asmComponentService = asmComponentService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.asmService = asmService;
        this.userAccountFacade = userAccountFacade;
        this.disabled = false;
        this.startingCustomerSession = false;
    }
    ngOnInit() {
        this.customerSupportAgentLoggedIn$ =
            this.csAgentAuthService.isCustomerSupportAgentLoggedIn();
        this.csAgentTokenLoading$ =
            this.csAgentAuthService.getCustomerSupportAgentTokenLoading();
        this.customer$ = this.authService.isUserLoggedIn().pipe(switchMap((isLoggedIn) => {
            if (isLoggedIn) {
                this.handleCustomerSessionStartRedirection();
                return this.userAccountFacade.get();
            }
            else {
                return of(undefined);
            }
        }));
        this.isCollapsed$ = this.asmService
            .getAsmUiState()
            .pipe(map((uiState) => uiState.collapsed === undefined ? false : uiState.collapsed));
    }
    handleCustomerSessionStartRedirection() {
        this.asmComponentService
            .isCustomerEmulationSessionInProgress()
            .pipe(take(1))
            .subscribe((isCustomerEmulated) => {
            if (this.startingCustomerSession && isCustomerEmulated) {
                this.startingCustomerSession = false;
                this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
                this.routingService.go('/');
            }
        });
    }
    loginCustomerSupportAgent({ userId, password, }) {
        this.csAgentAuthService.authorizeCustomerSupportAgent(userId, password);
    }
    logout() {
        this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
    }
    startCustomerEmulationSession({ customerId }) {
        if (customerId) {
            this.csAgentAuthService.startCustomerEmulationSession(customerId);
            this.startingCustomerSession = true;
        }
        else {
            this.globalMessageService.add({ key: 'asm.error.noCustomerId' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    hideUi() {
        this.disabled = true;
        this.asmComponentService.unload();
    }
}
AsmMainUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmMainUiComponent, deps: [{ token: i1.AuthService }, { token: i2.CsAgentAuthService }, { token: AsmComponentService }, { token: i1.GlobalMessageService }, { token: i1.RoutingService }, { token: i2$1.AsmService }, { token: i2$2.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
AsmMainUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AsmMainUiComponent, selector: "cx-asm-main-ui", host: { properties: { "class.hidden": "this.disabled" } }, ngImport: i0, template: "<div class=\"asm-bar\">\n  <div class=\"asm-bar-branding\">\n    <img\n      class=\"logo\"\n      src=\"data:image/png;base64,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\"\n      width=\"48\"\n      height=\"24\"\n      alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n    />\n\n    <div class=\"asm-title\">\n      {{ 'asm.mainTitle' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"asm-bar-actions\">\n    <cx-asm-toggle-ui></cx-asm-toggle-ui>\n\n    <cx-asm-session-timer\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    ></cx-asm-session-timer>\n\n    <button\n      class=\"close\"\n      title=\"{{ 'asm.hideUi' | cxTranslate }}\"\n      *ngIf=\"\n        !(customerSupportAgentLoggedIn$ | async) &&\n        !(csAgentTokenLoading$ | async)\n      \"\n      (click)=\"hideUi()\"\n    ></button>\n\n    <button\n      class=\"logout\"\n      title=\"{{ 'asm.logout' | cxTranslate }}\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n      (click)=\"logout()\"\n    ></button>\n  </div>\n</div>\n\n<ng-container *ngIf=\"!(isCollapsed$ | async) as notCollapsed\">\n  <ng-container\n    *ngIf=\"customerSupportAgentLoggedIn$ | async; else showLoginForm\"\n  >\n    <ng-container *ngIf=\"customer$ | async; else showCustomerSelection\">\n      <cx-customer-emulation *ngIf=\"notCollapsed\"></cx-customer-emulation>\n    </ng-container>\n    <ng-template #showCustomerSelection>\n      <cx-customer-selection\n        *ngIf=\"notCollapsed\"\n        (submitEvent)=\"startCustomerEmulationSession($event)\"\n      ></cx-customer-selection>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #showLoginForm>\n    <cx-csagent-login-form\n      *ngIf=\"notCollapsed\"\n      (submitEvent)=\"loginCustomerSupportAgent($event)\"\n      [csAgentTokenLoading]=\"csAgentTokenLoading$ | async\"\n    ></cx-csagent-login-form>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CSAgentLoginFormComponent, selector: "cx-csagent-login-form", inputs: ["csAgentTokenLoading"], outputs: ["submitEvent"] }, { kind: "component", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: ["submitEvent"] }, { kind: "component", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer" }, { kind: "component", type: CustomerEmulationComponent, selector: "cx-customer-emulation" }, { kind: "component", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui" }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmMainUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-main-ui', template: "<div class=\"asm-bar\">\n  <div class=\"asm-bar-branding\">\n    <img\n      class=\"logo\"\n      src=\"data:image/png;base64,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\"\n      width=\"48\"\n      height=\"24\"\n      alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n    />\n\n    <div class=\"asm-title\">\n      {{ 'asm.mainTitle' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"asm-bar-actions\">\n    <cx-asm-toggle-ui></cx-asm-toggle-ui>\n\n    <cx-asm-session-timer\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    ></cx-asm-session-timer>\n\n    <button\n      class=\"close\"\n      title=\"{{ 'asm.hideUi' | cxTranslate }}\"\n      *ngIf=\"\n        !(customerSupportAgentLoggedIn$ | async) &&\n        !(csAgentTokenLoading$ | async)\n      \"\n      (click)=\"hideUi()\"\n    ></button>\n\n    <button\n      class=\"logout\"\n      title=\"{{ 'asm.logout' | cxTranslate }}\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n      (click)=\"logout()\"\n    ></button>\n  </div>\n</div>\n\n<ng-container *ngIf=\"!(isCollapsed$ | async) as notCollapsed\">\n  <ng-container\n    *ngIf=\"customerSupportAgentLoggedIn$ | async; else showLoginForm\"\n  >\n    <ng-container *ngIf=\"customer$ | async; else showCustomerSelection\">\n      <cx-customer-emulation *ngIf=\"notCollapsed\"></cx-customer-emulation>\n    </ng-container>\n    <ng-template #showCustomerSelection>\n      <cx-customer-selection\n        *ngIf=\"notCollapsed\"\n        (submitEvent)=\"startCustomerEmulationSession($event)\"\n      ></cx-customer-selection>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #showLoginForm>\n    <cx-csagent-login-form\n      *ngIf=\"notCollapsed\"\n      (submitEvent)=\"loginCustomerSupportAgent($event)\"\n      [csAgentTokenLoading]=\"csAgentTokenLoading$ | async\"\n    ></cx-csagent-login-form>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.CsAgentAuthService }, { type: AsmComponentService }, { type: i1.GlobalMessageService }, { type: i1.RoutingService }, { type: i2$1.AsmService }, { type: i2$2.UserAccountFacade }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['class.hidden']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmLayoutConfig = {
    launch: {
        ASM: {
            outlet: 'cx-storefront',
            component: AsmMainUiComponent,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmComponentsModule {
}
AsmComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, declarations: [AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule], exports: [AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent] });
AsmComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, providers: [provideDefaultConfig(defaultAsmLayoutConfig)], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        FormErrorsModule,
                        PasswordVisibilityToggleModule,
                    ],
                    declarations: [
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                    ],
                    exports: [
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                    ],
                    providers: [provideDefaultConfig(defaultAsmLayoutConfig)],
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

export { AsmComponentService, AsmComponentsModule, AsmMainUiComponent, AsmSessionTimerComponent, AsmToggleUiComponent, CSAgentLoginFormComponent, CustomerEmulationComponent, CustomerSelectionComponent, FormatTimerPipe };
//# sourceMappingURL=spartacus-asm-components.mjs.map
