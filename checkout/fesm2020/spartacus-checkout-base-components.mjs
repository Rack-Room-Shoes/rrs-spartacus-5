import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, NgModule, EventEmitter, Input, Output, isDevMode, Pipe } from '@angular/core';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import * as i1$1 from '@spartacus/core';
import { getLastValueSync, GlobalMessageType, I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import * as i4 from '@spartacus/storefront';
import { AddressFormModule, CardModule, SpinnerModule, CustomFormValidators, FormErrorsModule, OutletModule, ICON_TYPE, NgSelectA11yModule, IconModule, SpinnerComponent, DIALOG_TYPE, AtMessageModule, PromotionsModule } from '@spartacus/storefront';
import { map, filter, switchMap, distinctUntilChanged, tap, withLatestFrom, debounceTime, take, catchError } from 'rxjs/operators';
import * as i1 from '@spartacus/cart/base/root';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { combineLatest, BehaviorSubject, Subscription, of } from 'rxjs';
import * as i2 from '@spartacus/checkout/base/root';
import { DeliveryModePreferences } from '@spartacus/checkout/base/root';
import * as i3$1 from '@angular/forms';
import { Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as i6$1 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i1$2 from '@spartacus/order/root';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartNotEmptyGuard {
    constructor(activeCartFacade, semanticPathService, router) {
        this.activeCartFacade = activeCartFacade;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return this.activeCartFacade.takeActive().pipe(map((cart) => {
            if (this.isEmpty(cart)) {
                return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
            }
            return true;
        }));
    }
    isEmpty(cart) {
        return cart && !cart.totalItems;
    }
}
CartNotEmptyGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartNotEmptyGuard, deps: [{ token: i1.ActiveCartFacade }, { token: i1$1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
CartNotEmptyGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartNotEmptyGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartNotEmptyGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i1$1.SemanticPathService }, { type: i3.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutConfigService {
    constructor(checkoutConfig) {
        this.checkoutConfig = checkoutConfig;
        this.express = this.checkoutConfig.checkout?.express ?? false;
        this.guest = this.checkoutConfig.checkout?.guest ?? false;
        this.defaultDeliveryMode = this.checkoutConfig.checkout?.defaultDeliveryMode || [];
    }
    compareDeliveryCost(deliveryMode1, deliveryMode2) {
        if (deliveryMode1.deliveryCost?.value &&
            deliveryMode2.deliveryCost?.value) {
            if (deliveryMode1.deliveryCost.value > deliveryMode2.deliveryCost.value) {
                return 1;
            }
            else if (deliveryMode1.deliveryCost.value < deliveryMode2.deliveryCost.value) {
                return -1;
            }
        }
        return 0;
    }
    findMatchingDeliveryMode(deliveryModes, index = 0) {
        switch (this.defaultDeliveryMode[index]) {
            case DeliveryModePreferences.FREE:
                if (deliveryModes[0].deliveryCost?.value === 0) {
                    return deliveryModes[0].code;
                }
                break;
            case DeliveryModePreferences.LEAST_EXPENSIVE:
                const leastExpensiveFound = deliveryModes.find((deliveryMode) => deliveryMode.deliveryCost?.value !== 0);
                if (leastExpensiveFound) {
                    return leastExpensiveFound.code;
                }
                break;
            case DeliveryModePreferences.MOST_EXPENSIVE:
                return deliveryModes[deliveryModes.length - 1].code;
            default:
                const codeFound = deliveryModes.find((deliveryMode) => deliveryMode.code === this.defaultDeliveryMode[index]);
                if (codeFound) {
                    return codeFound.code;
                }
        }
        const lastMode = this.defaultDeliveryMode.length - 1 <= index;
        return lastMode
            ? deliveryModes[0].code
            : this.findMatchingDeliveryMode(deliveryModes, index + 1);
    }
    getPreferredDeliveryMode(deliveryModes) {
        deliveryModes.sort(this.compareDeliveryCost);
        return this.findMatchingDeliveryMode(deliveryModes);
    }
    isExpressCheckout() {
        return this.express;
    }
    isGuestCheckout() {
        return this.guest;
    }
}
CheckoutConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutConfigService, deps: [{ token: i2.CheckoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.CheckoutConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutAuthGuard {
    constructor(authService, authRedirectService, checkoutConfigService, activeCartFacade, semanticPathService, router) {
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.checkoutConfigService = checkoutConfigService;
        this.activeCartFacade = activeCartFacade;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return combineLatest([
            this.authService.isUserLoggedIn(),
            this.activeCartFacade.isGuestCart(),
            this.activeCartFacade.isStable(),
        ]).pipe(map(([isLoggedIn, isGuestCart, isStable]) => ({
            isLoggedIn,
            isGuestCart,
            isStable,
        })), filter((data) => data.isStable), map((data) => {
            if (!data.isLoggedIn) {
                return data.isGuestCart ? true : this.handleAnonymousUser();
            }
            return data.isLoggedIn;
        }));
    }
    handleAnonymousUser() {
        this.authRedirectService.saveCurrentNavigationUrl();
        if (this.checkoutConfigService.isGuestCheckout()) {
            return this.router.createUrlTree([this.semanticPathService.get('login')], { queryParams: { forced: true } });
        }
        else {
            return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
        }
    }
}
CheckoutAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutAuthGuard, deps: [{ token: i1$1.AuthService }, { token: i1$1.AuthRedirectService }, { token: CheckoutConfigService }, { token: i1.ActiveCartFacade }, { token: i1$1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i1$1.AuthRedirectService }, { type: CheckoutConfigService }, { type: i1.ActiveCartFacade }, { type: i1$1.SemanticPathService }, { type: i3.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutStepService {
    constructor(routingService, checkoutConfig, routingConfigService) {
        this.routingService = routingService;
        this.checkoutConfig = checkoutConfig;
        this.routingConfigService = routingConfigService;
        this.steps$ = new BehaviorSubject([]);
        this.activeStepIndex$ = this.routingService
            .getRouterState()
            .pipe(switchMap((router) => {
            const activeStepUrl = router.state.context.id;
            return this.steps$.pipe(map((steps) => {
                let activeIndex = 0;
                steps.forEach((step, index) => {
                    const routeUrl = `/${this.routingConfigService.getRouteConfig(step.routeName)
                        ?.paths?.[0]}`;
                    if (routeUrl === activeStepUrl) {
                        activeIndex = index;
                    }
                });
                return activeIndex;
            }));
        }));
        this.resetSteps();
    }
    back(activatedRoute) {
        const previousUrl = this.getPreviousCheckoutStepUrl(activatedRoute);
        this.routingService.go(previousUrl === null ? 'cart' : previousUrl);
    }
    next(activatedRoute) {
        const nextUrl = this.getNextCheckoutStepUrl(activatedRoute);
        this.routingService.go(nextUrl);
    }
    goToStepWithIndex(stepIndex) {
        this.routingService.go(this.getStepUrlFromStepRoute(this.allSteps[stepIndex].routeName));
    }
    getBackBntText(activatedRoute) {
        if (this.getPreviousCheckoutStepUrl(activatedRoute) === null) {
            return 'checkout.backToCart';
        }
        return 'common.back';
    }
    resetSteps() {
        this.allSteps = (this.checkoutConfig.checkout?.steps ?? [])
            .filter((step) => !step.disabled)
            .map((x) => Object.assign({}, x));
        this.steps$.next(this.allSteps);
    }
    disableEnableStep(currentStepType, disabled) {
        const currentStep = this.allSteps.find((step) => step.type.includes(currentStepType));
        if (currentStep && currentStep.disabled !== disabled) {
            currentStep.disabled = disabled;
            this.steps$.next(this.allSteps.filter((step) => !step.disabled));
        }
    }
    getCheckoutStep(currentStepType) {
        const index = this.getCheckoutStepIndex('type', currentStepType);
        if (index !== null) {
            return this.allSteps[index];
        }
    }
    getCheckoutStepRoute(currentStepType) {
        return this.getCheckoutStep(currentStepType)?.routeName;
    }
    getFirstCheckoutStepRoute() {
        return this.allSteps[0].routeName;
    }
    getNextCheckoutStepUrl(activatedRoute) {
        const stepIndex = this.getCurrentStepIndex(activatedRoute);
        if (stepIndex !== null && stepIndex >= 0) {
            let i = 1;
            while (this.allSteps[stepIndex + i] &&
                this.allSteps[stepIndex + i].disabled) {
                i++;
            }
            const nextStep = this.allSteps[stepIndex + i];
            if (nextStep) {
                return this.getStepUrlFromStepRoute(nextStep.routeName);
            }
        }
        return null;
    }
    getPreviousCheckoutStepUrl(activatedRoute) {
        const stepIndex = this.getCurrentStepIndex(activatedRoute);
        if (stepIndex !== null && stepIndex >= 0) {
            let i = 1;
            while (this.allSteps[stepIndex - i] &&
                this.allSteps[stepIndex - i].disabled) {
                i++;
            }
            const previousStep = this.allSteps[stepIndex - i];
            if (previousStep) {
                return this.getStepUrlFromStepRoute(previousStep.routeName);
            }
        }
        return null;
    }
    getCurrentStepIndex(activatedRoute) {
        const currentStepUrl = this.getStepUrlFromActivatedRoute(activatedRoute);
        const stepIndex = this.allSteps.findIndex((step) => currentStepUrl === `/${this.getStepUrlFromStepRoute(step.routeName)}`);
        return stepIndex === -1 ? null : stepIndex;
    }
    getStepUrlFromActivatedRoute(activatedRoute) {
        return activatedRoute &&
            activatedRoute.snapshot &&
            activatedRoute.snapshot.url
            ? `/${activatedRoute.snapshot.url.join('/')}`
            : null;
    }
    getStepUrlFromStepRoute(stepRoute) {
        return (this.routingConfigService.getRouteConfig(stepRoute)?.paths?.[0] ?? null);
    }
    getCheckoutStepIndex(key, value) {
        return key && value
            ? this.allSteps.findIndex((step) => {
                const propertyVal = step[key];
                return propertyVal instanceof Array
                    ? propertyVal.includes(value)
                    : propertyVal === value;
            })
            : null;
    }
}
CheckoutStepService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepService, deps: [{ token: i1$1.RoutingService }, { token: i2.CheckoutConfig }, { token: i1$1.RoutingConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutStepService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }, { type: i2.CheckoutConfig }, { type: i1$1.RoutingConfigService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryAddressComponent {
    constructor(userAddressService, checkoutDeliveryAddressFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, checkoutDeliveryModesFacade, globalMessageService) {
        this.userAddressService = userAddressService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.activatedRoute = activatedRoute;
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.globalMessageService = globalMessageService;
        this.busy$ = new BehaviorSubject(false);
        this.addressFormOpened = false;
        this.doneAutoSelect = false;
    }
    get isGuestCheckout() {
        return !!getLastValueSync(this.activeCartFacade.isGuestCart());
    }
    get backBtnText() {
        return this.checkoutStepService.getBackBntText(this.activatedRoute);
    }
    get selectedAddress$() {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data), distinctUntilChanged((prev, curr) => prev?.id === curr?.id));
    }
    ngOnInit() {
        this.loadAddresses();
        this.cards$ = this.createCards();
        this.isUpdating$ = this.createIsUpdating();
    }
    getCardContent(address, selected, textDefaultDeliveryAddress, textShipToThisAddress, textSelected) {
        let region = '';
        if (address.region && address.region.isocode) {
            region = address.region.isocode + ', ';
        }
        return {
            role: 'region',
            title: address.defaultAddress ? textDefaultDeliveryAddress : '',
            textBold: address.firstName + ' ' + address.lastName,
            text: [
                address.line1,
                address.line2,
                address.town + ', ' + region + address.country?.isocode,
                address.postalCode,
                address.phone,
            ],
            actions: [{ name: textShipToThisAddress, event: 'send' }],
            header: selected && selected.id === address.id ? textSelected : '',
            label: address.defaultAddress
                ? 'addressBook.defaultDeliveryAddress'
                : 'addressBook.additionalDeliveryAddress',
        };
    }
    selectAddress(address) {
        if (address?.id === getLastValueSync(this.selectedAddress$)?.id) {
            return;
        }
        this.globalMessageService.add({
            key: 'checkoutAddress.deliveryAddressSelected',
        }, GlobalMessageType.MSG_TYPE_INFO);
        this.setAddress(address);
    }
    addAddress(address) {
        if (!address) {
            return;
        }
        this.busy$.next(true);
        this.checkoutDeliveryAddressFacade
            .createAndSetAddress(address)
            .pipe(switchMap(() => this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()))
            .subscribe({
            complete: () => {
                // we don't call onSuccess here, because it can cause a spinner flickering
                this.next();
            },
            error: () => {
                this.onError();
            },
        });
    }
    showNewAddressForm() {
        this.addressFormOpened = true;
    }
    hideNewAddressForm(goPrevious = false) {
        this.addressFormOpened = false;
        if (goPrevious) {
            this.back();
        }
    }
    next() {
        this.checkoutStepService.next(this.activatedRoute);
    }
    back() {
        this.checkoutStepService.back(this.activatedRoute);
    }
    loadAddresses() {
        if (!this.isGuestCheckout) {
            this.userAddressService.loadAddresses();
        }
    }
    createCards() {
        return combineLatest([
            this.getSupportedAddresses(),
            this.selectedAddress$,
            this.translationService.translate('checkoutAddress.defaultDeliveryAddress'),
            this.translationService.translate('checkoutAddress.shipToThisAddress'),
            this.translationService.translate('addressCard.selected'),
        ]).pipe(tap(([addresses, selected]) => this.selectDefaultAddress(addresses, selected)), map(([addresses, selected, textDefault, textShipTo, textSelected]) => addresses.map((address) => ({
            address,
            card: this.getCardContent(address, selected, textDefault, textShipTo, textSelected),
        }))));
    }
    selectDefaultAddress(addresses, selected) {
        if (!this.doneAutoSelect &&
            addresses?.length &&
            (!selected || Object.keys(selected).length === 0)) {
            selected = addresses.find((address) => address.defaultAddress);
            if (selected) {
                this.setAddress(selected);
            }
            this.doneAutoSelect = true;
        }
    }
    getSupportedAddresses() {
        return this.userAddressService.getAddresses();
    }
    createIsUpdating() {
        return combineLatest([
            this.busy$,
            this.userAddressService.getAddressesLoading(),
            this.getAddressLoading(),
        ]).pipe(map(([busy, userAddressLoading, deliveryAddressLoading]) => busy || userAddressLoading || deliveryAddressLoading), distinctUntilChanged());
    }
    getAddressLoading() {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(map((state) => state.loading), distinctUntilChanged());
    }
    setAddress(address) {
        this.busy$.next(true);
        this.checkoutDeliveryAddressFacade
            .setDeliveryAddress(address)
            .pipe(switchMap(() => this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()))
            .subscribe({
            complete: () => {
                this.onSuccess();
            },
            error: () => {
                this.onError();
            },
        });
    }
    onSuccess() {
        this.busy$.next(false);
    }
    onError() {
        this.busy$.next(false);
    }
}
CheckoutDeliveryAddressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressComponent, deps: [{ token: i1$1.UserAddressService }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i3.ActivatedRoute }, { token: i1$1.TranslationService }, { token: i1.ActiveCartFacade }, { token: CheckoutStepService }, { token: i2.CheckoutDeliveryModesFacade }, { token: i1$1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutDeliveryAddressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutDeliveryAddressComponent, selector: "cx-delivery-address", ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.deliveryAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        cards?.length && !addressFormOpened;\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-action\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-action\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.AddressFormComponent, selector: "cx-address-form", inputs: ["addressData", "actionBtnLabel", "cancelBtnLabel", "setAsDefaultField", "showTitleCode", "showCancelBtn"], outputs: ["submitAddress", "backToAddress"] }, { kind: "component", type: i4.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-delivery-address', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.deliveryAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        cards?.length && !addressFormOpened;\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-action\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-action\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.UserAddressService }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i3.ActivatedRoute }, { type: i1$1.TranslationService }, { type: i1.ActiveCartFacade }, { type: CheckoutStepService }, { type: i2.CheckoutDeliveryModesFacade }, { type: i1$1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryAddressModule {
}
CheckoutDeliveryAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutDeliveryAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, declarations: [CheckoutDeliveryAddressComponent], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule], exports: [CheckoutDeliveryAddressComponent] });
CheckoutDeliveryAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryAddress: {
                    component: CheckoutDeliveryAddressComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        AddressFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryAddress: {
                                    component: CheckoutDeliveryAddressComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutDeliveryAddressComponent],
                    exports: [CheckoutDeliveryAddressComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryModeComponent {
    constructor(fb, checkoutConfigService, activatedRoute, checkoutStepService, checkoutDeliveryModesFacade) {
        this.fb = fb;
        this.checkoutConfigService = checkoutConfigService;
        this.activatedRoute = activatedRoute;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.subscriptions = new Subscription();
        this.busy$ = new BehaviorSubject(false);
        this.backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);
        this.mode = this.fb.group({
            deliveryModeId: ['', Validators.required],
        });
        this.isUpdating$ = combineLatest([
            this.busy$,
            this.checkoutDeliveryModesFacade
                .getSelectedDeliveryModeState()
                .pipe(map((state) => state.loading)),
        ]).pipe(map(([busy, loading]) => busy || loading), distinctUntilChanged());
    }
    get deliveryModeInvalid() {
        return this.mode.controls['deliveryModeId'].invalid;
    }
    ngOnInit() {
        this.supportedDeliveryModes$ = this.checkoutDeliveryModesFacade
            .getSupportedDeliveryModes()
            .pipe(filter((deliveryModes) => !!deliveryModes?.length), distinctUntilChanged((current, previous) => {
            return JSON.stringify(current) === JSON.stringify(previous);
        }));
        this.selectedDeliveryModeCode$ = this.checkoutDeliveryModesFacade
            .getSelectedDeliveryModeState()
            .pipe(filter((state) => !state.loading), map((state) => state.data), map((deliveryMode) => deliveryMode?.code));
        this.subscriptions.add(this.supportedDeliveryModes$
            .pipe(withLatestFrom(this.selectedDeliveryModeCode$))
            .subscribe(([deliveryModes, code]) => {
            if (!(code &&
                !!deliveryModes.find((deliveryMode) => deliveryMode.code === code))) {
                code =
                    this.checkoutConfigService.getPreferredDeliveryMode(deliveryModes);
            }
            if (code) {
                this.mode.controls['deliveryModeId'].setValue(code);
                this.changeMode(code);
            }
        }));
    }
    changeMode(code) {
        this.busy$.next(true);
        this.checkoutDeliveryModesFacade.setDeliveryMode(code).subscribe({
            complete: () => this.onSuccess(),
            error: () => this.onError(),
        });
    }
    next() {
        if (this.mode.valid && this.mode.value) {
            this.checkoutStepService.next(this.activatedRoute);
        }
    }
    back() {
        this.checkoutStepService.back(this.activatedRoute);
    }
    getAriaChecked(code) {
        return code === this.mode.controls['deliveryModeId'].value;
    }
    onSuccess() {
        this.busy$.next(false);
    }
    onError() {
        this.busy$.next(false);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutDeliveryModeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeComponent, deps: [{ token: i3$1.UntypedFormBuilder }, { token: CheckoutConfigService }, { token: i3.ActivatedRoute }, { token: CheckoutStepService }, { token: i2.CheckoutDeliveryModesFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutDeliveryModeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutDeliveryModeComponent, selector: "cx-delivery-mode", ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutMode.deliveryMethod' | cxTranslate }}\n</h2>\n\n<ng-container\n  *ngIf=\"\n    (supportedDeliveryModes$ | async)?.length && !(isUpdating$ | async);\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div [formGroup]=\"mode\">\n    <div class=\"row\">\n      <div class=\"col-md-12 col-lg-9\" role=\"radiogroup\">\n        <div\n          class=\"form-check\"\n          *ngFor=\"let mode of supportedDeliveryModes$ | async\"\n        >\n          <input\n            [attr.aria-checked]=\"getAriaChecked(mode.code)\"\n            class=\"form-check-input\"\n            role=\"radio\"\n            type=\"radio\"\n            id=\"deliveryMode-{{ mode.code }}\"\n            (change)=\"changeMode(mode.code)\"\n            [value]=\"mode.code\"\n            formControlName=\"deliveryModeId\"\n          />\n          <label\n            class=\"cx-delivery-label form-check-label form-radio-label\"\n            for=\"deliveryMode-{{ mode.code }}\"\n          >\n            <div class=\"cx-delivery-mode\">{{ mode.name }}</div>\n            <div class=\"cx-delivery-price\">\n              {{ mode.deliveryCost.formattedValue }}\n            </div>\n            <div class=\"cx-delivery-details\">{{ mode.description }}</div>\n          </label>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row cx-checkout-btns\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-action\" (click)=\"back()\">\n          {{ backBtnText | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button\n          class=\"btn btn-block btn-primary\"\n          [disabled]=\"deliveryModeInvalid\"\n          (click)=\"next()\"\n        >\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-delivery-mode', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutMode.deliveryMethod' | cxTranslate }}\n</h2>\n\n<ng-container\n  *ngIf=\"\n    (supportedDeliveryModes$ | async)?.length && !(isUpdating$ | async);\n    else loading\n  \"\n>\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div [formGroup]=\"mode\">\n    <div class=\"row\">\n      <div class=\"col-md-12 col-lg-9\" role=\"radiogroup\">\n        <div\n          class=\"form-check\"\n          *ngFor=\"let mode of supportedDeliveryModes$ | async\"\n        >\n          <input\n            [attr.aria-checked]=\"getAriaChecked(mode.code)\"\n            class=\"form-check-input\"\n            role=\"radio\"\n            type=\"radio\"\n            id=\"deliveryMode-{{ mode.code }}\"\n            (change)=\"changeMode(mode.code)\"\n            [value]=\"mode.code\"\n            formControlName=\"deliveryModeId\"\n          />\n          <label\n            class=\"cx-delivery-label form-check-label form-radio-label\"\n            for=\"deliveryMode-{{ mode.code }}\"\n          >\n            <div class=\"cx-delivery-mode\">{{ mode.name }}</div>\n            <div class=\"cx-delivery-price\">\n              {{ mode.deliveryCost.formattedValue }}\n            </div>\n            <div class=\"cx-delivery-details\">{{ mode.description }}</div>\n          </label>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row cx-checkout-btns\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-action\" (click)=\"back()\">\n          {{ backBtnText | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button\n          class=\"btn btn-block btn-primary\"\n          [disabled]=\"deliveryModeInvalid\"\n          (click)=\"next()\"\n        >\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i3$1.UntypedFormBuilder }, { type: CheckoutConfigService }, { type: i3.ActivatedRoute }, { type: CheckoutStepService }, { type: i2.CheckoutDeliveryModesFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryModeModule {
}
CheckoutDeliveryModeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutDeliveryModeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, declarations: [CheckoutDeliveryModeComponent], imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule], exports: [CheckoutDeliveryModeComponent] });
CheckoutDeliveryModeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryMode: {
                    component: CheckoutDeliveryModeComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutDeliveryModeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ReactiveFormsModule, I18nModule, SpinnerModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryMode: {
                                    component: CheckoutDeliveryModeComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutDeliveryModeComponent],
                    exports: [CheckoutDeliveryModeComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class NotCheckoutAuthGuard {
    constructor(authService, activeCartFacade, semanticPathService, router) {
        this.authService = authService;
        this.activeCartFacade = activeCartFacade;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return this.authService.isUserLoggedIn().pipe(map((isLoggedIn) => {
            if (isLoggedIn) {
                return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
            }
            else if (!!getLastValueSync(this.activeCartFacade.isGuestCart())) {
                return this.router.parseUrl(this.semanticPathService.get('cart') ?? '');
            }
            return !isLoggedIn;
        }));
    }
}
NotCheckoutAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NotCheckoutAuthGuard, deps: [{ token: i1$1.AuthService }, { token: i1.ActiveCartFacade }, { token: i1$1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
NotCheckoutAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NotCheckoutAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NotCheckoutAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i1.ActiveCartFacade }, { type: i1$1.SemanticPathService }, { type: i3.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutLoginComponent {
    constructor(formBuilder, authRedirectService, activeCartFacade) {
        this.formBuilder = formBuilder;
        this.authRedirectService = authRedirectService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutLoginForm = this.formBuilder.group({
            email: ['', [Validators.required, CustomFormValidators.emailValidator]],
            emailConfirmation: ['', [Validators.required]],
        }, {
            validators: CustomFormValidators.emailsMustMatch('email', 'emailConfirmation'),
        });
    }
    onSubmit() {
        if (this.checkoutLoginForm.valid) {
            const email = this.checkoutLoginForm.get('email')?.value;
            this.activeCartFacade.addEmail(email);
            if (!this.sub) {
                this.sub = this.activeCartFacade.isGuestCart().subscribe((isGuest) => {
                    if (isGuest) {
                        this.authRedirectService.redirect();
                    }
                });
            }
        }
        else {
            this.checkoutLoginForm.markAllAsTouched();
        }
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
CheckoutLoginComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutLoginComponent, deps: [{ token: i3$1.UntypedFormBuilder }, { token: i1$1.AuthRedirectService }, { token: i1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutLoginComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutLoginComponent, selector: "cx-checkout-login", ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"checkoutLoginForm\">\n  <div class=\"form-group\">\n    <label>\n      <span class=\"label-content\">{{\n        'checkoutLogin.emailAddress.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"email\"\n        name=\"email\"\n        class=\"form-control\"\n        formControlName=\"email\"\n        placeholder=\"{{\n          'checkoutLogin.emailAddress.placeholder' | cxTranslate\n        }}\"\n      />\n      <cx-form-errors\n        [control]=\"checkoutLoginForm.get('email')\"\n      ></cx-form-errors>\n    </label>\n  </div>\n\n  <div class=\"form-group\">\n    <label>\n      <span class=\"label-content\">{{\n        'checkoutLogin.confirmEmail.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"email\"\n        name=\"emailConfirmation\"\n        class=\"form-control\"\n        formControlName=\"emailConfirmation\"\n        placeholder=\"{{\n          'checkoutLogin.confirmEmail.placeholder' | cxTranslate\n        }}\"\n      />\n      <cx-form-errors\n        [control]=\"checkoutLoginForm.get('emailConfirmation')\"\n      ></cx-form-errors>\n    </label>\n  </div>\n\n  <button type=\"submit\" class=\"btn btn-block btn-primary\">\n    {{ 'checkoutLogin.continue' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutLoginComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-checkout-login', template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"checkoutLoginForm\">\n  <div class=\"form-group\">\n    <label>\n      <span class=\"label-content\">{{\n        'checkoutLogin.emailAddress.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"email\"\n        name=\"email\"\n        class=\"form-control\"\n        formControlName=\"email\"\n        placeholder=\"{{\n          'checkoutLogin.emailAddress.placeholder' | cxTranslate\n        }}\"\n      />\n      <cx-form-errors\n        [control]=\"checkoutLoginForm.get('email')\"\n      ></cx-form-errors>\n    </label>\n  </div>\n\n  <div class=\"form-group\">\n    <label>\n      <span class=\"label-content\">{{\n        'checkoutLogin.confirmEmail.label' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"email\"\n        name=\"emailConfirmation\"\n        class=\"form-control\"\n        formControlName=\"emailConfirmation\"\n        placeholder=\"{{\n          'checkoutLogin.confirmEmail.placeholder' | cxTranslate\n        }}\"\n      />\n      <cx-form-errors\n        [control]=\"checkoutLoginForm.get('emailConfirmation')\"\n      ></cx-form-errors>\n    </label>\n  </div>\n\n  <button type=\"submit\" class=\"btn btn-block btn-primary\">\n    {{ 'checkoutLogin.continue' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i3$1.UntypedFormBuilder }, { type: i1$1.AuthRedirectService }, { type: i1.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutLoginModule {
}
CheckoutLoginModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutLoginModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutLoginModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutLoginModule, declarations: [CheckoutLoginComponent], imports: [CommonModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule], exports: [CheckoutLoginComponent] });
CheckoutLoginModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutLoginModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                GuestCheckoutLoginComponent: {
                    component: CheckoutLoginComponent,
                    guards: [NotCheckoutAuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutLoginModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                GuestCheckoutLoginComponent: {
                                    component: CheckoutLoginComponent,
                                    guards: [NotCheckoutAuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutLoginComponent],
                    exports: [CheckoutLoginComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ExpressCheckoutService {
    constructor(userAddressService, userPaymentService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutConfigService, checkoutDeliveryModesFacade) {
        this.userAddressService = userAddressService;
        this.userPaymentService = userPaymentService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutConfigService = checkoutConfigService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.setDeliveryAddress();
        this.setDeliveryMode();
        this.setPaymentMethod();
    }
    setDeliveryAddress() {
        this.deliveryAddressSet$ = combineLatest([
            this.userAddressService.getAddresses(),
            this.userAddressService.getAddressesLoadedSuccess(),
        ]).pipe(debounceTime(0), tap(([, addressesLoadedSuccess]) => {
            if (!addressesLoadedSuccess) {
                this.userAddressService.loadAddresses();
            }
        }), filter(([, addressesLoadedSuccess]) => addressesLoadedSuccess), take(1), switchMap(([addresses]) => {
            const defaultAddress = addresses.find((address) => address.defaultAddress) || addresses[0];
            if (defaultAddress && Object.keys(defaultAddress).length) {
                return this.checkoutDeliveryAddressFacade
                    .setDeliveryAddress(defaultAddress)
                    .pipe(switchMap(() => this.checkoutDeliveryAddressFacade.getDeliveryAddressState()), filter((state) => !state.error && !state.loading), map((state) => state.data), map((data) => !!(data && Object.keys(data).length)), catchError(() => of(false)));
            }
            return of(false);
        }), distinctUntilChanged());
    }
    setDeliveryMode() {
        this.deliveryModeSet$ = combineLatest([
            this.deliveryAddressSet$,
            this.checkoutDeliveryModesFacade.getSupportedDeliveryModesState(),
        ]).pipe(debounceTime(0), switchMap(([addressSet, supportedDeliveryModesState]) => {
            if (!addressSet) {
                return of(false);
            }
            return of([supportedDeliveryModesState]).pipe(filter(([supportedDeliveryModesStateObject]) => !supportedDeliveryModesStateObject.loading &&
                !!supportedDeliveryModesStateObject.data?.length), switchMap(([deliveryModesState]) => {
                if (!deliveryModesState.data) {
                    return of(false);
                }
                const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(deliveryModesState.data);
                return of([preferredDeliveryMode]).pipe(switchMap(([deliveryMode]) => {
                    if (!deliveryMode) {
                        return of(false);
                    }
                    return this.checkoutDeliveryModesFacade
                        .setDeliveryMode(deliveryMode)
                        .pipe(switchMap(() => this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()), filter((state) => !state.error && !state.loading), map((state) => state.data), map((data) => !!(data && Object.keys(data).length)), catchError(() => of(false)));
                }));
            }));
        }), distinctUntilChanged());
    }
    setPaymentMethod() {
        this.paymentMethodSet$ = combineLatest([
            this.deliveryModeSet$,
            this.userPaymentService.getPaymentMethods(),
            this.userPaymentService.getPaymentMethodsLoadedSuccess(),
        ]).pipe(debounceTime(0), tap(([, , paymentMethodsLoadedSuccess]) => {
            if (!paymentMethodsLoadedSuccess) {
                this.userPaymentService.loadPaymentMethods();
            }
        }), filter(([, , success]) => success), switchMap(([deliveryModeSet, payments]) => {
            if (!deliveryModeSet) {
                return of(false);
            }
            const defaultPayment = payments.find((address) => address.defaultPayment) || payments[0];
            if (!defaultPayment || Object.keys(defaultPayment).length === 0) {
                return of(false);
            }
            return this.checkoutPaymentFacade
                .setPaymentDetails(defaultPayment)
                .pipe(switchMap(() => this.checkoutPaymentFacade.getPaymentDetailsState()), filter((state) => !state.error && !state.loading), map((state) => state.data), map((data) => !!(data && Object.keys(data).length)), catchError(() => of(false)));
        }), distinctUntilChanged());
    }
    trySetDefaultCheckoutDetails() {
        return this.paymentMethodSet$.pipe(map((paymentMethodSet) => !!paymentMethodSet));
    }
}
ExpressCheckoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExpressCheckoutService, deps: [{ token: i1$1.UserAddressService }, { token: i1$1.UserPaymentService }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i2.CheckoutPaymentFacade }, { token: CheckoutConfigService }, { token: i2.CheckoutDeliveryModesFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ExpressCheckoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExpressCheckoutService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExpressCheckoutService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.UserAddressService }, { type: i1$1.UserPaymentService }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i2.CheckoutPaymentFacade }, { type: CheckoutConfigService }, { type: i2.CheckoutDeliveryModesFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutGuard {
    constructor(router, routingConfigService, checkoutConfigService, expressCheckoutService, activeCartFacade, checkoutStepService) {
        this.router = router;
        this.routingConfigService = routingConfigService;
        this.checkoutConfigService = checkoutConfigService;
        this.expressCheckoutService = expressCheckoutService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.firstStep$ = of(this.router.parseUrl(this.routingConfigService.getRouteConfig(this.checkoutStepService.getFirstCheckoutStepRoute())?.paths?.[0]));
    }
    canActivate() {
        const expressCheckout$ = this.expressCheckoutService
            .trySetDefaultCheckoutDetails()
            .pipe(switchMap((expressCheckoutPossible) => {
            const reviewOrderRoute = this.checkoutStepService.getCheckoutStepRoute("reviewOrder" /* CheckoutStepType.REVIEW_ORDER */);
            return expressCheckoutPossible && reviewOrderRoute
                ? of(this.router.parseUrl(this.routingConfigService.getRouteConfig(reviewOrderRoute)
                    ?.paths?.[0]))
                : this.firstStep$;
        }));
        return this.activeCartFacade
            .isGuestCart()
            .pipe(switchMap((isGuestCart) => this.checkoutConfigService.isExpressCheckout() && !isGuestCart
            ? expressCheckout$
            : this.firstStep$));
    }
}
CheckoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutGuard, deps: [{ token: i3.Router }, { token: i1$1.RoutingConfigService }, { token: CheckoutConfigService }, { token: ExpressCheckoutService }, { token: i1.ActiveCartFacade }, { token: CheckoutStepService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.Router }, { type: i1$1.RoutingConfigService }, { type: CheckoutConfigService }, { type: ExpressCheckoutService }, { type: i1.ActiveCartFacade }, { type: CheckoutStepService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutOrchestratorComponent {
    constructor() {
        // Intentional empty constructor
    }
}
CheckoutOrchestratorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrchestratorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CheckoutOrchestratorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutOrchestratorComponent, selector: "cx-checkout-orchestrator", ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrchestratorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-checkout-orchestrator',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutOrchestratorModule {
}
CheckoutOrchestratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrchestratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutOrchestratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrchestratorModule, declarations: [CheckoutOrchestratorComponent], imports: [CommonModule], exports: [CheckoutOrchestratorComponent] });
CheckoutOrchestratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrchestratorModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutOrchestrator: {
                    component: CheckoutOrchestratorComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutGuard],
                },
            },
        }),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrchestratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutOrchestrator: {
                                    component: CheckoutOrchestratorComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutOrchestratorComponent],
                    exports: [CheckoutOrchestratorComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutOrderSummaryComponent {
    constructor(activeCartFacade) {
        this.activeCartFacade = activeCartFacade;
        this.cartOutlets = CartOutlets;
        this.cart$ = this.activeCartFacade.getActive();
    }
}
CheckoutOrderSummaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrderSummaryComponent, deps: [{ token: i1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutOrderSummaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutOrderSummaryComponent, selector: "cx-checkout-order-summary", ngImport: i0, template: "<ng-template\n  [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n  [cxOutletContext]=\"cart$ | async\"\n>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrderSummaryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-checkout-order-summary', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template\n  [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n  [cxOutletContext]=\"cart$ | async\"\n>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutOrderSummaryModule {
}
CheckoutOrderSummaryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrderSummaryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutOrderSummaryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrderSummaryModule, declarations: [CheckoutOrderSummaryComponent], imports: [CommonModule, OutletModule], exports: [CheckoutOrderSummaryComponent] });
CheckoutOrderSummaryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrderSummaryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutOrderSummary: {
                    component: CheckoutOrderSummaryComponent,
                },
            },
        }),
    ], imports: [CommonModule, OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutOrderSummaryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OutletModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutOrderSummary: {
                                    component: CheckoutOrderSummaryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutOrderSummaryComponent],
                    exports: [CheckoutOrderSummaryComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentFormComponent {
    constructor(checkoutPaymentFacade, checkoutDeliveryAddressFacade, userPaymentService, globalMessageService, fb, userAddressService, launchDialogService) {
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.userPaymentService = userPaymentService;
        this.globalMessageService = globalMessageService;
        this.fb = fb;
        this.userAddressService = userAddressService;
        this.launchDialogService = launchDialogService;
        this.iconTypes = ICON_TYPE;
        this.months = [];
        this.years = [];
        this.sameAsDeliveryAddress = true;
        this.selectedCountry$ = new BehaviorSubject('');
        this.goBack = new EventEmitter();
        this.closeForm = new EventEmitter();
        this.setPaymentDetails = new EventEmitter();
        this.paymentForm = this.fb.group({
            cardType: this.fb.group({
                code: [null, Validators.required],
            }),
            accountHolderName: ['', Validators.required],
            cardNumber: ['', Validators.required],
            expiryMonth: [null, Validators.required],
            expiryYear: [null, Validators.required],
            cvn: ['', Validators.required],
            defaultPayment: [false],
        });
        this.billingAddressForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            line1: ['', Validators.required],
            line2: [''],
            town: ['', Validators.required],
            region: this.fb.group({
                isocodeShort: [null, Validators.required],
            }),
            country: this.fb.group({
                isocode: [null, Validators.required],
            }),
            postalCode: ['', Validators.required],
        });
    }
    ngOnInit() {
        if (this.paymentDetails) {
            this.paymentForm.patchValue(this.paymentDetails);
        }
        this.expMonthAndYear();
        this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(tap((countries) => {
            // If the store is empty fetch countries. This is also used when changing language.
            if (Object.keys(countries).length === 0) {
                this.userPaymentService.loadBillingCountries();
            }
        }));
        this.cardTypes$ = this.checkoutPaymentFacade.getPaymentCardTypes();
        this.deliveryAddress$ = this.checkoutDeliveryAddressFacade
            .getDeliveryAddressState()
            .pipe(filter((state) => !state.loading), map((state) => state.data));
        this.showSameAsDeliveryAddressCheckbox$ = combineLatest([
            this.countries$,
            this.deliveryAddress$,
        ]).pipe(map(([countries, address]) => {
            return ((address?.country &&
                !!countries.filter((country) => country.isocode === address.country?.isocode).length) ??
                false);
        }), tap((shouldShowCheckbox) => {
            this.sameAsDeliveryAddress = shouldShowCheckbox;
        }));
        this.regions$ = this.selectedCountry$.pipe(switchMap((country) => this.userAddressService.getRegions(country)), tap((regions) => {
            const regionControl = this.billingAddressForm.get('region.isocodeShort');
            if (regions.length > 0) {
                regionControl?.enable();
            }
            else {
                regionControl?.disable();
            }
        }));
    }
    expMonthAndYear() {
        const year = new Date().getFullYear();
        for (let i = 0; i < 10; i++) {
            this.years.push(year + i);
        }
        for (let j = 1; j <= 12; j++) {
            if (j < 10) {
                this.months.push(`0${j}`);
            }
            else {
                this.months.push(j.toString());
            }
        }
    }
    toggleDefaultPaymentMethod() {
        this.paymentForm.value.defaultPayment =
            !this.paymentForm.value.defaultPayment;
    }
    toggleSameAsDeliveryAddress() {
        this.sameAsDeliveryAddress = !this.sameAsDeliveryAddress;
    }
    getAddressCardContent(address) {
        let region = '';
        if (address.region && address.region.isocode) {
            region = address.region.isocode + ', ';
        }
        return {
            textBold: address.firstName + ' ' + address.lastName,
            text: [
                address.line1,
                address.line2,
                address.town + ', ' + region + address.country?.isocode,
                address.postalCode,
                address.phone,
            ],
        };
    }
    //TODO: Add elementRef to trigger button when verifyAddress is used.
    openSuggestedAddress(results) {
        this.launchDialogService.openDialogAndSubscribe("SUGGESTED_ADDRESSES" /* LAUNCH_CALLER.SUGGESTED_ADDRESSES */, undefined, {
            enteredAddress: this.billingAddressForm.value,
            suggestedAddresses: results.suggestedAddresses,
        });
        //TODO: Add logic that handle dialog's actions. Scope of CXSPA-1276
    }
    close() {
        this.closeForm.emit();
    }
    back() {
        this.goBack.emit();
    }
    /**
     *TODO: This method is not used, but should be. It triggers suggested addresses modal under the hood.
     *
     * See ticket CXSPA-1276
     */
    verifyAddress() {
        if (this.sameAsDeliveryAddress) {
            this.next();
        }
        else {
            this.userAddressService
                .verifyAddress(this.billingAddressForm.value)
                .subscribe((result) => {
                this.handleAddressVerificationResults(result);
            });
        }
    }
    handleAddressVerificationResults(results) {
        if (results.decision === 'ACCEPT') {
            this.next();
        }
        else if (results.decision === 'REJECT') {
            this.globalMessageService.add({ key: 'addressForm.invalidAddress' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
        else if (results.decision === 'REVIEW') {
            this.openSuggestedAddress(results);
        }
    }
    countrySelected(country) {
        this.billingAddressForm.get('country.isocode')?.setValue(country.isocode);
        this.selectedCountry$.next(country.isocode);
    }
    next() {
        if (this.paymentForm.valid) {
            if (this.sameAsDeliveryAddress) {
                this.setPaymentDetails.emit({
                    paymentDetails: this.paymentForm.value,
                    billingAddress: null,
                });
            }
            else {
                if (this.billingAddressForm.valid) {
                    this.setPaymentDetails.emit({
                        paymentDetails: this.paymentForm.value,
                        billingAddress: this.billingAddressForm.value,
                    });
                }
                else {
                    this.billingAddressForm.markAllAsTouched();
                }
            }
        }
        else {
            this.paymentForm.markAllAsTouched();
            if (!this.sameAsDeliveryAddress) {
                this.billingAddressForm.markAllAsTouched();
            }
        }
    }
}
CheckoutPaymentFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentFormComponent, deps: [{ token: i2.CheckoutPaymentFacade }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i1$1.UserPaymentService }, { token: i1$1.GlobalMessageService }, { token: i3$1.UntypedFormBuilder }, { token: i1$1.UserAddressService }, { token: i4.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutPaymentFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutPaymentFormComponent, selector: "cx-payment-form", inputs: { loading: "loading", setAsDefaultField: "setAsDefaultField", paymentMethodsCount: "paymentMethodsCount", paymentDetails: "paymentDetails" }, outputs: { goBack: "goBack", closeForm: "closeForm", setPaymentDetails: "setPaymentDetails" }, ngImport: i0, template: "<!-- FORM -->\n<ng-container *ngIf=\"!loading; else spinner\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <form (ngSubmit)=\"next()\" [formGroup]=\"paymentForm\">\n    <div class=\"row\">\n      <div class=\"col-md-12 col-xl-10\">\n        <div class=\"form-group\" formGroupName=\"cardType\">\n          <ng-container *ngIf=\"cardTypes$ | async as cardTypes\">\n            <div *ngIf=\"cardTypes.length !== 0\">\n              <label>\n                <span class=\"label-content required\">{{\n                  'paymentForm.paymentType' | cxTranslate\n                }}</span>\n                <ng-select\n                  [inputAttrs]=\"{ required: 'true' }\"\n                  [searchable]=\"true\"\n                  [clearable]=\"false\"\n                  [items]=\"cardTypes\"\n                  bindLabel=\"name\"\n                  bindValue=\"code\"\n                  placeholder=\"{{ 'paymentForm.selectOne' | cxTranslate }}\"\n                  formControlName=\"code\"\n                  id=\"card-type-select\"\n                  [cxNgSelectA11y]=\"{\n                    ariaLabel: 'paymentForm.paymentType' | cxTranslate\n                  }\"\n                >\n                </ng-select>\n                <cx-form-errors\n                  [control]=\"paymentForm.get('cardType.code')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n          </ng-container>\n        </div>\n\n        <div class=\"form-group\">\n          <label>\n            <span class=\"label-content\">{{\n              'paymentForm.accountHolderName.label' | cxTranslate\n            }}</span>\n            <input\n              required=\"true\"\n              class=\"form-control\"\n              type=\"text\"\n              placeholder=\"{{\n                'paymentForm.accountHolderName.placeholder' | cxTranslate\n              }}\"\n              formControlName=\"accountHolderName\"\n            />\n            <cx-form-errors\n              [control]=\"paymentForm.get('accountHolderName')\"\n            ></cx-form-errors>\n          </label>\n        </div>\n\n        <div class=\"form-group\">\n          <label>\n            <span class=\"label-content\">{{\n              'paymentForm.cardNumber' | cxTranslate\n            }}</span>\n            <input\n              required=\"true\"\n              type=\"text\"\n              class=\"form-control\"\n              formControlName=\"cardNumber\"\n            />\n            <cx-form-errors\n              [control]=\"paymentForm.get('cardNumber')\"\n            ></cx-form-errors>\n          </label>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"form-group col-md-8\">\n            <fieldset class=\"cx-payment-form-exp-date\">\n              <legend class=\"label-content\">\n                {{ 'paymentForm.expirationDate' | cxTranslate }}\n              </legend>\n              <label class=\"cx-payment-form-exp-date-wrapper\">\n                <ng-select\n                  [inputAttrs]=\"{ required: 'true' }\"\n                  [searchable]=\"true\"\n                  [clearable]=\"false\"\n                  [items]=\"months\"\n                  placeholder=\"{{ 'paymentForm.monthMask' | cxTranslate }}\"\n                  formControlName=\"expiryMonth\"\n                  id=\"month-select\"\n                  [cxNgSelectA11y]=\"{\n                    ariaLabel:\n                      'paymentForm.expirationMonth'\n                      | cxTranslate\n                        : { selected: paymentForm.get('expiryMonth')?.value }\n                  }\"\n                >\n                </ng-select>\n                <cx-form-errors\n                  [control]=\"paymentForm.get('expiryMonth')\"\n                ></cx-form-errors>\n              </label>\n              <label class=\"cx-payment-form-exp-date-wrapper\">\n                <ng-select\n                  [inputAttrs]=\"{ required: 'true' }\"\n                  [searchable]=\"true\"\n                  [clearable]=\"false\"\n                  [items]=\"years\"\n                  placeholder=\"{{ 'paymentForm.yearMask' | cxTranslate }}\"\n                  id=\"year-select\"\n                  [cxNgSelectA11y]=\"{\n                    ariaLabel:\n                      'paymentForm.expirationYear'\n                      | cxTranslate\n                        : { selected: paymentForm.get('expiryYear')?.value }\n                  }\"\n                  formControlName=\"expiryYear\"\n                >\n                </ng-select>\n                <cx-form-errors\n                  [control]=\"paymentForm.get('expiryYear')\"\n                ></cx-form-errors>\n              </label>\n            </fieldset>\n          </div>\n\n          <div class=\"form-group col-md-4\">\n            <label>\n              <span class=\"label-content\">\n                {{ 'paymentForm.securityCode' | cxTranslate }}\n                <cx-icon\n                  [type]=\"iconTypes.INFO\"\n                  class=\"cx-payment-form-tooltip\"\n                  placement=\"right\"\n                  title=\"{{ 'paymentForm.securityCodeTitle' | cxTranslate }}\"\n                  alt=\"\"\n                ></cx-icon>\n              </span>\n              <input\n                required=\"true\"\n                type=\"text\"\n                class=\"form-control\"\n                id=\"cVVNumber\"\n                formControlName=\"cvn\"\n              />\n              <cx-form-errors\n                [control]=\"paymentForm.get('cvn')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n        </div>\n\n        <div class=\"form-group\" *ngIf=\"setAsDefaultField\">\n          <div class=\"form-check\">\n            <label>\n              <input\n                type=\"checkbox\"\n                class=\"form-check-input\"\n                (change)=\"toggleDefaultPaymentMethod()\"\n              />\n              <span class=\"form-check-label\">{{\n                'paymentForm.setAsDefault' | cxTranslate\n              }}</span>\n            </label>\n          </div>\n        </div>\n\n        <!-- BILLING -->\n        <div class=\"cx-payment-form-billing\">\n          <div class=\"cx-payment-form-billing-address\">\n            {{ 'paymentForm.billingAddress' | cxTranslate }}\n          </div>\n\n          <!-- SAME AS SHIPPING CHECKBOX -->\n          <ng-container *ngIf=\"showSameAsDeliveryAddressCheckbox$ | async\">\n            <div class=\"form-group\">\n              <div class=\"form-check\">\n                <label>\n                  <input\n                    type=\"checkbox\"\n                    class=\"form-check-input\"\n                    [checked]=\"sameAsDeliveryAddress\"\n                    (change)=\"toggleSameAsDeliveryAddress()\"\n                    [attr.aria-label]=\"\n                      'paymentForm.billingAddressSameAsShipping' | cxTranslate\n                    \"\n                  />\n                  <span class=\"form-check-label\">{{\n                    'paymentForm.sameAsDeliveryAddress' | cxTranslate\n                  }}</span>\n                </label>\n              </div>\n            </div>\n          </ng-container>\n\n          <!-- BILLING INFO COMPONENT -->\n          <ng-container\n            *ngIf=\"\n              sameAsDeliveryAddress &&\n                (deliveryAddress$ | async) as deliveryAddress;\n              else billingAddress\n            \"\n          >\n            <cx-card\n              [content]=\"getAddressCardContent(deliveryAddress)\"\n            ></cx-card>\n          </ng-container>\n\n          <!-- TODO:#future-checkout do we really want this? We can always pass more inputs to the copied address form component to make it more modular -->\n          <ng-template #billingAddress>\n            <div [formGroup]=\"billingAddressForm\">\n              <div class=\"form-group\" formGroupName=\"country\">\n                <ng-container *ngIf=\"countries$ | async as countries\">\n                  <div *ngIf=\"countries.length !== 0\">\n                    <label>\n                      <span class=\"label-content required\">{{\n                        'addressForm.country' | cxTranslate\n                      }}</span>\n                      <ng-select\n                        [inputAttrs]=\"{ required: 'true' }\"\n                        [searchable]=\"true\"\n                        [clearable]=\"false\"\n                        [items]=\"countries\"\n                        bindLabel=\"name\"\n                        bindValue=\"isocode\"\n                        placeholder=\"{{\n                          'addressForm.selectOne' | cxTranslate\n                        }}\"\n                        (change)=\"countrySelected($event)\"\n                        formControlName=\"isocode\"\n                        id=\"country-payment-select\"\n                        [cxNgSelectA11y]=\"{\n                          ariaLabel: 'addressForm.country' | cxTranslate\n                        }\"\n                      >\n                      </ng-select>\n                      <cx-form-errors\n                        [control]=\"billingAddressForm.get('country.isocode')\"\n                      ></cx-form-errors>\n                    </label>\n                  </div>\n                </ng-container>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content required\">{{\n                    'addressForm.firstName.label' | cxTranslate\n                  }}</span>\n                  <input\n                    required=\"true\"\n                    class=\"form-control\"\n                    type=\"text\"\n                    placeholder=\"{{\n                      'addressForm.firstName.placeholder' | cxTranslate\n                    }}\"\n                    formControlName=\"firstName\"\n                  />\n                  <cx-form-errors\n                    [control]=\"billingAddressForm.get('firstName')\"\n                  ></cx-form-errors>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content required\">{{\n                    'addressForm.lastName.label' | cxTranslate\n                  }}</span>\n                  <input\n                    required=\"true\"\n                    type=\"text\"\n                    class=\"form-control\"\n                    placeholder=\"{{\n                      'addressForm.lastName.placeholder' | cxTranslate\n                    }}\"\n                    formControlName=\"lastName\"\n                  />\n                  <cx-form-errors\n                    [control]=\"billingAddressForm.get('lastName')\"\n                  ></cx-form-errors>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content required\">{{\n                    'addressForm.address1' | cxTranslate\n                  }}</span>\n                  <input\n                    required=\"true\"\n                    type=\"text\"\n                    class=\"form-control\"\n                    placeholder=\"{{\n                      'addressForm.streetAddress' | cxTranslate\n                    }}\"\n                    formControlName=\"line1\"\n                  />\n                  <cx-form-errors\n                    [control]=\"billingAddressForm.get('line1')\"\n                  ></cx-form-errors>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content\">{{\n                    'addressForm.address2' | cxTranslate\n                  }}</span>\n                  <input\n                    type=\"text\"\n                    class=\"form-control\"\n                    placeholder=\"{{ 'addressForm.aptSuite' | cxTranslate }}\"\n                    formControlName=\"line2\"\n                  />\n                </label>\n              </div>\n              <div class=\"row\">\n                <div class=\"form-group col-md-6\">\n                  <label>\n                    <span class=\"label-content required\">{{\n                      'addressForm.city.label' | cxTranslate\n                    }}</span>\n                    <input\n                      required=\"true\"\n                      type=\"text\"\n                      class=\"form-control\"\n                      placeholder=\"{{\n                        'addressForm.city.placeholder' | cxTranslate\n                      }}\"\n                      formControlName=\"town\"\n                    />\n                    <cx-form-errors\n                      [control]=\"billingAddressForm.get('town')\"\n                    ></cx-form-errors>\n                  </label>\n                </div>\n                <div class=\"form-group col-md-6\">\n                  <label>\n                    <span class=\"label-content required\">{{\n                      'addressForm.zipCode.label' | cxTranslate\n                    }}</span>\n                    <input\n                      required=\"true\"\n                      type=\"text\"\n                      class=\"form-control\"\n                      placeholder=\"{{\n                        'addressForm.zipCode.placeholder' | cxTranslate\n                      }}\"\n                      formControlName=\"postalCode\"\n                    />\n                    <cx-form-errors\n                      [control]=\"billingAddressForm.get('postalCode')\"\n                    ></cx-form-errors>\n                  </label>\n                </div>\n                <ng-container\n                  *ngIf=\"regions$ | async as regions\"\n                  formGroupName=\"region\"\n                >\n                  <ng-container *ngIf=\"regions.length !== 0\">\n                    <div class=\"form-group col-md-6\">\n                      <label>\n                        <span class=\"label-content required\">{{\n                          'addressForm.state' | cxTranslate\n                        }}</span>\n                        <ng-select\n                          [inputAttrs]=\"{ required: 'true' }\"\n                          class=\"region-select\"\n                          formControlName=\"isocodeShort\"\n                          [searchable]=\"true\"\n                          [clearable]=\"false\"\n                          [items]=\"regions\"\n                          bindLabel=\"{{\n                            regions[0].name ? 'name' : 'isocodeShort'\n                          }}\"\n                          bindValue=\"{{\n                            regions[0].name ? 'isocodeShort' : 'region'\n                          }}\"\n                          placeholder=\"{{\n                            'addressForm.selectOne' | cxTranslate\n                          }}\"\n                          id=\"region-select\"\n                          [cxNgSelectA11y]=\"{\n                            ariaLabel: 'addressForm.state' | cxTranslate\n                          }\"\n                        >\n                        </ng-select>\n                        <cx-form-errors\n                          [control]=\"\n                            billingAddressForm.get('region.isocodeShort')\n                          \"\n                        ></cx-form-errors>\n                      </label>\n                    </div>\n                  </ng-container>\n                </ng-container>\n              </div>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n\n    <!-- BUTTON SECTION -->\n    <div class=\"cx-checkout-btns row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button\n          *ngIf=\"paymentMethodsCount === 0\"\n          class=\"btn btn-block btn-action\"\n          (click)=\"back()\"\n        >\n          {{ 'common.back' | cxTranslate }}\n        </button>\n        <button\n          *ngIf=\"paymentMethodsCount > 0\"\n          class=\"btn btn-block btn-action\"\n          (click)=\"close()\"\n        >\n          {{ 'paymentForm.changePayment' | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-primary\" type=\"submit\">\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </form>\n</ng-container>\n\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3$1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "component", type: i6$1.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "component", type: i4.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-payment-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- FORM -->\n<ng-container *ngIf=\"!loading; else spinner\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <form (ngSubmit)=\"next()\" [formGroup]=\"paymentForm\">\n    <div class=\"row\">\n      <div class=\"col-md-12 col-xl-10\">\n        <div class=\"form-group\" formGroupName=\"cardType\">\n          <ng-container *ngIf=\"cardTypes$ | async as cardTypes\">\n            <div *ngIf=\"cardTypes.length !== 0\">\n              <label>\n                <span class=\"label-content required\">{{\n                  'paymentForm.paymentType' | cxTranslate\n                }}</span>\n                <ng-select\n                  [inputAttrs]=\"{ required: 'true' }\"\n                  [searchable]=\"true\"\n                  [clearable]=\"false\"\n                  [items]=\"cardTypes\"\n                  bindLabel=\"name\"\n                  bindValue=\"code\"\n                  placeholder=\"{{ 'paymentForm.selectOne' | cxTranslate }}\"\n                  formControlName=\"code\"\n                  id=\"card-type-select\"\n                  [cxNgSelectA11y]=\"{\n                    ariaLabel: 'paymentForm.paymentType' | cxTranslate\n                  }\"\n                >\n                </ng-select>\n                <cx-form-errors\n                  [control]=\"paymentForm.get('cardType.code')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n          </ng-container>\n        </div>\n\n        <div class=\"form-group\">\n          <label>\n            <span class=\"label-content\">{{\n              'paymentForm.accountHolderName.label' | cxTranslate\n            }}</span>\n            <input\n              required=\"true\"\n              class=\"form-control\"\n              type=\"text\"\n              placeholder=\"{{\n                'paymentForm.accountHolderName.placeholder' | cxTranslate\n              }}\"\n              formControlName=\"accountHolderName\"\n            />\n            <cx-form-errors\n              [control]=\"paymentForm.get('accountHolderName')\"\n            ></cx-form-errors>\n          </label>\n        </div>\n\n        <div class=\"form-group\">\n          <label>\n            <span class=\"label-content\">{{\n              'paymentForm.cardNumber' | cxTranslate\n            }}</span>\n            <input\n              required=\"true\"\n              type=\"text\"\n              class=\"form-control\"\n              formControlName=\"cardNumber\"\n            />\n            <cx-form-errors\n              [control]=\"paymentForm.get('cardNumber')\"\n            ></cx-form-errors>\n          </label>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"form-group col-md-8\">\n            <fieldset class=\"cx-payment-form-exp-date\">\n              <legend class=\"label-content\">\n                {{ 'paymentForm.expirationDate' | cxTranslate }}\n              </legend>\n              <label class=\"cx-payment-form-exp-date-wrapper\">\n                <ng-select\n                  [inputAttrs]=\"{ required: 'true' }\"\n                  [searchable]=\"true\"\n                  [clearable]=\"false\"\n                  [items]=\"months\"\n                  placeholder=\"{{ 'paymentForm.monthMask' | cxTranslate }}\"\n                  formControlName=\"expiryMonth\"\n                  id=\"month-select\"\n                  [cxNgSelectA11y]=\"{\n                    ariaLabel:\n                      'paymentForm.expirationMonth'\n                      | cxTranslate\n                        : { selected: paymentForm.get('expiryMonth')?.value }\n                  }\"\n                >\n                </ng-select>\n                <cx-form-errors\n                  [control]=\"paymentForm.get('expiryMonth')\"\n                ></cx-form-errors>\n              </label>\n              <label class=\"cx-payment-form-exp-date-wrapper\">\n                <ng-select\n                  [inputAttrs]=\"{ required: 'true' }\"\n                  [searchable]=\"true\"\n                  [clearable]=\"false\"\n                  [items]=\"years\"\n                  placeholder=\"{{ 'paymentForm.yearMask' | cxTranslate }}\"\n                  id=\"year-select\"\n                  [cxNgSelectA11y]=\"{\n                    ariaLabel:\n                      'paymentForm.expirationYear'\n                      | cxTranslate\n                        : { selected: paymentForm.get('expiryYear')?.value }\n                  }\"\n                  formControlName=\"expiryYear\"\n                >\n                </ng-select>\n                <cx-form-errors\n                  [control]=\"paymentForm.get('expiryYear')\"\n                ></cx-form-errors>\n              </label>\n            </fieldset>\n          </div>\n\n          <div class=\"form-group col-md-4\">\n            <label>\n              <span class=\"label-content\">\n                {{ 'paymentForm.securityCode' | cxTranslate }}\n                <cx-icon\n                  [type]=\"iconTypes.INFO\"\n                  class=\"cx-payment-form-tooltip\"\n                  placement=\"right\"\n                  title=\"{{ 'paymentForm.securityCodeTitle' | cxTranslate }}\"\n                  alt=\"\"\n                ></cx-icon>\n              </span>\n              <input\n                required=\"true\"\n                type=\"text\"\n                class=\"form-control\"\n                id=\"cVVNumber\"\n                formControlName=\"cvn\"\n              />\n              <cx-form-errors\n                [control]=\"paymentForm.get('cvn')\"\n              ></cx-form-errors>\n            </label>\n          </div>\n        </div>\n\n        <div class=\"form-group\" *ngIf=\"setAsDefaultField\">\n          <div class=\"form-check\">\n            <label>\n              <input\n                type=\"checkbox\"\n                class=\"form-check-input\"\n                (change)=\"toggleDefaultPaymentMethod()\"\n              />\n              <span class=\"form-check-label\">{{\n                'paymentForm.setAsDefault' | cxTranslate\n              }}</span>\n            </label>\n          </div>\n        </div>\n\n        <!-- BILLING -->\n        <div class=\"cx-payment-form-billing\">\n          <div class=\"cx-payment-form-billing-address\">\n            {{ 'paymentForm.billingAddress' | cxTranslate }}\n          </div>\n\n          <!-- SAME AS SHIPPING CHECKBOX -->\n          <ng-container *ngIf=\"showSameAsDeliveryAddressCheckbox$ | async\">\n            <div class=\"form-group\">\n              <div class=\"form-check\">\n                <label>\n                  <input\n                    type=\"checkbox\"\n                    class=\"form-check-input\"\n                    [checked]=\"sameAsDeliveryAddress\"\n                    (change)=\"toggleSameAsDeliveryAddress()\"\n                    [attr.aria-label]=\"\n                      'paymentForm.billingAddressSameAsShipping' | cxTranslate\n                    \"\n                  />\n                  <span class=\"form-check-label\">{{\n                    'paymentForm.sameAsDeliveryAddress' | cxTranslate\n                  }}</span>\n                </label>\n              </div>\n            </div>\n          </ng-container>\n\n          <!-- BILLING INFO COMPONENT -->\n          <ng-container\n            *ngIf=\"\n              sameAsDeliveryAddress &&\n                (deliveryAddress$ | async) as deliveryAddress;\n              else billingAddress\n            \"\n          >\n            <cx-card\n              [content]=\"getAddressCardContent(deliveryAddress)\"\n            ></cx-card>\n          </ng-container>\n\n          <!-- TODO:#future-checkout do we really want this? We can always pass more inputs to the copied address form component to make it more modular -->\n          <ng-template #billingAddress>\n            <div [formGroup]=\"billingAddressForm\">\n              <div class=\"form-group\" formGroupName=\"country\">\n                <ng-container *ngIf=\"countries$ | async as countries\">\n                  <div *ngIf=\"countries.length !== 0\">\n                    <label>\n                      <span class=\"label-content required\">{{\n                        'addressForm.country' | cxTranslate\n                      }}</span>\n                      <ng-select\n                        [inputAttrs]=\"{ required: 'true' }\"\n                        [searchable]=\"true\"\n                        [clearable]=\"false\"\n                        [items]=\"countries\"\n                        bindLabel=\"name\"\n                        bindValue=\"isocode\"\n                        placeholder=\"{{\n                          'addressForm.selectOne' | cxTranslate\n                        }}\"\n                        (change)=\"countrySelected($event)\"\n                        formControlName=\"isocode\"\n                        id=\"country-payment-select\"\n                        [cxNgSelectA11y]=\"{\n                          ariaLabel: 'addressForm.country' | cxTranslate\n                        }\"\n                      >\n                      </ng-select>\n                      <cx-form-errors\n                        [control]=\"billingAddressForm.get('country.isocode')\"\n                      ></cx-form-errors>\n                    </label>\n                  </div>\n                </ng-container>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content required\">{{\n                    'addressForm.firstName.label' | cxTranslate\n                  }}</span>\n                  <input\n                    required=\"true\"\n                    class=\"form-control\"\n                    type=\"text\"\n                    placeholder=\"{{\n                      'addressForm.firstName.placeholder' | cxTranslate\n                    }}\"\n                    formControlName=\"firstName\"\n                  />\n                  <cx-form-errors\n                    [control]=\"billingAddressForm.get('firstName')\"\n                  ></cx-form-errors>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content required\">{{\n                    'addressForm.lastName.label' | cxTranslate\n                  }}</span>\n                  <input\n                    required=\"true\"\n                    type=\"text\"\n                    class=\"form-control\"\n                    placeholder=\"{{\n                      'addressForm.lastName.placeholder' | cxTranslate\n                    }}\"\n                    formControlName=\"lastName\"\n                  />\n                  <cx-form-errors\n                    [control]=\"billingAddressForm.get('lastName')\"\n                  ></cx-form-errors>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content required\">{{\n                    'addressForm.address1' | cxTranslate\n                  }}</span>\n                  <input\n                    required=\"true\"\n                    type=\"text\"\n                    class=\"form-control\"\n                    placeholder=\"{{\n                      'addressForm.streetAddress' | cxTranslate\n                    }}\"\n                    formControlName=\"line1\"\n                  />\n                  <cx-form-errors\n                    [control]=\"billingAddressForm.get('line1')\"\n                  ></cx-form-errors>\n                </label>\n              </div>\n              <div class=\"form-group\">\n                <label>\n                  <span class=\"label-content\">{{\n                    'addressForm.address2' | cxTranslate\n                  }}</span>\n                  <input\n                    type=\"text\"\n                    class=\"form-control\"\n                    placeholder=\"{{ 'addressForm.aptSuite' | cxTranslate }}\"\n                    formControlName=\"line2\"\n                  />\n                </label>\n              </div>\n              <div class=\"row\">\n                <div class=\"form-group col-md-6\">\n                  <label>\n                    <span class=\"label-content required\">{{\n                      'addressForm.city.label' | cxTranslate\n                    }}</span>\n                    <input\n                      required=\"true\"\n                      type=\"text\"\n                      class=\"form-control\"\n                      placeholder=\"{{\n                        'addressForm.city.placeholder' | cxTranslate\n                      }}\"\n                      formControlName=\"town\"\n                    />\n                    <cx-form-errors\n                      [control]=\"billingAddressForm.get('town')\"\n                    ></cx-form-errors>\n                  </label>\n                </div>\n                <div class=\"form-group col-md-6\">\n                  <label>\n                    <span class=\"label-content required\">{{\n                      'addressForm.zipCode.label' | cxTranslate\n                    }}</span>\n                    <input\n                      required=\"true\"\n                      type=\"text\"\n                      class=\"form-control\"\n                      placeholder=\"{{\n                        'addressForm.zipCode.placeholder' | cxTranslate\n                      }}\"\n                      formControlName=\"postalCode\"\n                    />\n                    <cx-form-errors\n                      [control]=\"billingAddressForm.get('postalCode')\"\n                    ></cx-form-errors>\n                  </label>\n                </div>\n                <ng-container\n                  *ngIf=\"regions$ | async as regions\"\n                  formGroupName=\"region\"\n                >\n                  <ng-container *ngIf=\"regions.length !== 0\">\n                    <div class=\"form-group col-md-6\">\n                      <label>\n                        <span class=\"label-content required\">{{\n                          'addressForm.state' | cxTranslate\n                        }}</span>\n                        <ng-select\n                          [inputAttrs]=\"{ required: 'true' }\"\n                          class=\"region-select\"\n                          formControlName=\"isocodeShort\"\n                          [searchable]=\"true\"\n                          [clearable]=\"false\"\n                          [items]=\"regions\"\n                          bindLabel=\"{{\n                            regions[0].name ? 'name' : 'isocodeShort'\n                          }}\"\n                          bindValue=\"{{\n                            regions[0].name ? 'isocodeShort' : 'region'\n                          }}\"\n                          placeholder=\"{{\n                            'addressForm.selectOne' | cxTranslate\n                          }}\"\n                          id=\"region-select\"\n                          [cxNgSelectA11y]=\"{\n                            ariaLabel: 'addressForm.state' | cxTranslate\n                          }\"\n                        >\n                        </ng-select>\n                        <cx-form-errors\n                          [control]=\"\n                            billingAddressForm.get('region.isocodeShort')\n                          \"\n                        ></cx-form-errors>\n                      </label>\n                    </div>\n                  </ng-container>\n                </ng-container>\n              </div>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n\n    <!-- BUTTON SECTION -->\n    <div class=\"cx-checkout-btns row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button\n          *ngIf=\"paymentMethodsCount === 0\"\n          class=\"btn btn-block btn-action\"\n          (click)=\"back()\"\n        >\n          {{ 'common.back' | cxTranslate }}\n        </button>\n        <button\n          *ngIf=\"paymentMethodsCount > 0\"\n          class=\"btn btn-block btn-action\"\n          (click)=\"close()\"\n        >\n          {{ 'paymentForm.changePayment' | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-primary\" type=\"submit\">\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </form>\n</ng-container>\n\n<ng-template #spinner>\n  <cx-spinner></cx-spinner>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i2.CheckoutPaymentFacade }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i1$1.UserPaymentService }, { type: i1$1.GlobalMessageService }, { type: i3$1.UntypedFormBuilder }, { type: i1$1.UserAddressService }, { type: i4.LaunchDialogService }]; }, propDecorators: { loading: [{
                type: Input
            }], setAsDefaultField: [{
                type: Input
            }], paymentMethodsCount: [{
                type: Input
            }], paymentDetails: [{
                type: Input
            }], goBack: [{
                type: Output
            }], closeForm: [{
                type: Output
            }], setPaymentDetails: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentFormModule {
}
CheckoutPaymentFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentFormModule, declarations: [CheckoutPaymentFormComponent], imports: [NgSelectA11yModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        CardModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        FormErrorsModule], exports: [CheckoutPaymentFormComponent] });
CheckoutPaymentFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentFormModule, imports: [NgSelectA11yModule,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        CardModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NgSelectA11yModule,
                        CommonModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CardModule,
                        I18nModule,
                        IconModule,
                        SpinnerModule,
                        FormErrorsModule,
                    ],
                    declarations: [CheckoutPaymentFormComponent],
                    exports: [CheckoutPaymentFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentMethodComponent {
    constructor(userPaymentService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, globalMessageService) {
        this.userPaymentService = userPaymentService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.activatedRoute = activatedRoute;
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.globalMessageService = globalMessageService;
        this.subscriptions = new Subscription();
        this.busy$ = new BehaviorSubject(false);
        this.iconTypes = ICON_TYPE;
        this.isGuestCheckout = false;
        this.newPaymentFormManuallyOpened = false;
        this.doneAutoSelect = false;
        this.isUpdating$ = combineLatest([
            this.busy$,
            this.userPaymentService.getPaymentMethodsLoading(),
            this.checkoutPaymentFacade
                .getPaymentDetailsState()
                .pipe(map((state) => state.loading)),
        ]).pipe(map(([busy, userPaymentLoading, paymentMethodLoading]) => busy || userPaymentLoading || paymentMethodLoading), distinctUntilChanged());
    }
    get backBtnText() {
        return this.checkoutStepService.getBackBntText(this.activatedRoute);
    }
    get existingPaymentMethods$() {
        return this.userPaymentService.getPaymentMethods();
    }
    get selectedMethod$() {
        return this.checkoutPaymentFacade.getPaymentDetailsState().pipe(filter((state) => !state.loading), map((state) => state.data), distinctUntilChanged((prev, curr) => prev?.id === curr?.id));
    }
    ngOnInit() {
        if (!getLastValueSync(this.activeCartFacade.isGuestCart())) {
            this.userPaymentService.loadPaymentMethods();
        }
        else {
            this.isGuestCheckout = true;
        }
        this.checkoutDeliveryAddressFacade
            .getDeliveryAddressState()
            .pipe(filter((state) => !state.loading), take(1), map((state) => state.data))
            .subscribe((address) => {
            this.deliveryAddress = address;
        });
        this.cards$ = combineLatest([
            this.existingPaymentMethods$.pipe(switchMap((methods) => {
                return !methods?.length
                    ? of([])
                    : combineLatest(methods.map((method) => combineLatest([
                        of(method),
                        this.translationService.translate('paymentCard.expires', {
                            month: method.expiryMonth,
                            year: method.expiryYear,
                        }),
                    ]).pipe(map(([payment, translation]) => ({
                        payment,
                        expiryTranslation: translation,
                    })))));
            })),
            this.selectedMethod$,
            this.translationService.translate('paymentForm.useThisPayment'),
            this.translationService.translate('paymentCard.defaultPaymentMethod'),
            this.translationService.translate('paymentCard.selected'),
        ]).pipe(tap(([paymentMethods, selectedMethod]) => this.selectDefaultPaymentMethod(paymentMethods, selectedMethod)), map(([paymentMethods, selectedMethod, textUseThisPayment, textDefaultPaymentMethod, textSelected,]) => paymentMethods.map((payment) => ({
            content: this.createCard(payment.payment, {
                textExpires: payment.expiryTranslation,
                textUseThisPayment,
                textDefaultPaymentMethod,
                textSelected,
            }, selectedMethod),
            paymentMethod: payment.payment,
        }))));
    }
    selectDefaultPaymentMethod(paymentMethods, selectedMethod) {
        if (!this.doneAutoSelect &&
            paymentMethods?.length &&
            (!selectedMethod || Object.keys(selectedMethod).length === 0)) {
            const defaultPaymentMethod = paymentMethods.find((paymentMethod) => paymentMethod.payment.defaultPayment);
            if (defaultPaymentMethod) {
                selectedMethod = defaultPaymentMethod.payment;
                this.savePaymentMethod(selectedMethod);
            }
            this.doneAutoSelect = true;
        }
    }
    selectPaymentMethod(paymentDetails) {
        if (paymentDetails?.id === getLastValueSync(this.selectedMethod$)?.id) {
            return;
        }
        this.globalMessageService.add({
            key: 'paymentMethods.paymentMethodSelected',
        }, GlobalMessageType.MSG_TYPE_INFO);
        this.savePaymentMethod(paymentDetails);
    }
    showNewPaymentForm() {
        this.newPaymentFormManuallyOpened = true;
    }
    hideNewPaymentForm() {
        this.newPaymentFormManuallyOpened = false;
    }
    setPaymentDetails({ paymentDetails, billingAddress, }) {
        this.paymentDetails = paymentDetails;
        const details = { ...paymentDetails };
        details.billingAddress = billingAddress ?? this.deliveryAddress;
        this.busy$.next(true);
        this.subscriptions.add(this.checkoutPaymentFacade.createPaymentDetails(details).subscribe({
            complete: () => {
                // we don't call onSuccess here, because it can cause a spinner flickering
                this.next();
            },
            error: () => {
                this.onError();
            },
        }));
    }
    next() {
        this.checkoutStepService.next(this.activatedRoute);
    }
    back() {
        this.checkoutStepService.back(this.activatedRoute);
    }
    savePaymentMethod(paymentDetails) {
        this.busy$.next(true);
        this.subscriptions.add(this.checkoutPaymentFacade.setPaymentDetails(paymentDetails).subscribe({
            complete: () => this.onSuccess(),
            error: () => this.onError(),
        }));
    }
    getCardIcon(code) {
        let ccIcon;
        if (code === 'visa') {
            ccIcon = this.iconTypes.VISA;
        }
        else if (code === 'master' || code === 'mastercard_eurocard') {
            ccIcon = this.iconTypes.MASTER_CARD;
        }
        else if (code === 'diners') {
            ccIcon = this.iconTypes.DINERS_CLUB;
        }
        else if (code === 'amex') {
            ccIcon = this.iconTypes.AMEX;
        }
        else {
            ccIcon = this.iconTypes.CREDIT_CARD;
        }
        return ccIcon;
    }
    createCard(paymentDetails, cardLabels, selected) {
        return {
            role: 'region',
            title: paymentDetails.defaultPayment
                ? cardLabels.textDefaultPaymentMethod
                : '',
            textBold: paymentDetails.accountHolderName,
            text: [paymentDetails.cardNumber ?? '', cardLabels.textExpires],
            img: this.getCardIcon(paymentDetails.cardType?.code),
            actions: [{ name: cardLabels.textUseThisPayment, event: 'send' }],
            header: selected?.id === paymentDetails.id
                ? cardLabels.textSelected
                : undefined,
            label: paymentDetails.defaultPayment
                ? 'paymentCard.defaultPaymentLabel'
                : 'paymentCard.additionalPaymentLabel',
        };
    }
    onSuccess() {
        this.busy$.next(false);
    }
    onError() {
        this.busy$.next(false);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutPaymentMethodComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodComponent, deps: [{ token: i1$1.UserPaymentService }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i2.CheckoutPaymentFacade }, { token: i3.ActivatedRoute }, { token: i1$1.TranslationService }, { token: i1.ActiveCartFacade }, { token: CheckoutStepService }, { token: i1$1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutPaymentMethodComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutPaymentMethodComponent, selector: "cx-payment-method", ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'paymentForm.payment' | cxTranslate }}\n</h2>\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        cards?.length && !newPaymentFormManuallyOpened;\n        then hasExistingPaymentMethods;\n        else newPaymentForm\n      \"\n    >\n    </ng-container>\n  </ng-container>\n\n  <ng-template #hasExistingPaymentMethods>\n    <p class=\"cx-checkout-text\">\n      {{ 'paymentForm.choosePaymentMethod' | cxTranslate }}\n    </p>\n    <div class=\"cx-checkout-btns row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-action\" (click)=\"showNewPaymentForm()\">\n          {{ 'paymentForm.addNewPayment' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"cx-checkout-body row\">\n      <div\n        class=\"cx-payment-card col-md-12 col-lg-6\"\n        *ngFor=\"let card of cards; let i = index\"\n      >\n        <div\n          class=\"cx-payment-card-inner\"\n          (click)=\"selectPaymentMethod(card.paymentMethod)\"\n        >\n          <cx-card\n            [border]=\"true\"\n            [fitToContainer]=\"true\"\n            [content]=\"card.content\"\n            [index]=\"i\"\n            (sendCard)=\"selectPaymentMethod(card.paymentMethod)\"\n          ></cx-card>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row cx-checkout-btns\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-action\" (click)=\"back()\">\n          {{ backBtnText | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button\n          class=\"btn btn-block btn-primary\"\n          [disabled]=\"!(selectedMethod$ | async)?.id\"\n          (click)=\"next()\"\n        >\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-template>\n\n  <ng-template #newPaymentForm>\n    <cx-payment-form\n      (setPaymentDetails)=\"setPaymentDetails($event)\"\n      (closeForm)=\"hideNewPaymentForm()\"\n      (goBack)=\"back()\"\n      [paymentMethodsCount]=\"cards?.length || 0\"\n      [setAsDefaultField]=\"!isGuestCheckout && !!cards?.length\"\n      [loading]=\"isUpdating$ | async\"\n      [paymentDetails]=\"paymentDetails\"\n    ></cx-payment-form>\n  </ng-template>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CheckoutPaymentFormComponent, selector: "cx-payment-form", inputs: ["loading", "setAsDefaultField", "paymentMethodsCount", "paymentDetails"], outputs: ["goBack", "closeForm", "setPaymentDetails"] }, { kind: "component", type: i4.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i4.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-payment-method', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'paymentForm.payment' | cxTranslate }}\n</h2>\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        cards?.length && !newPaymentFormManuallyOpened;\n        then hasExistingPaymentMethods;\n        else newPaymentForm\n      \"\n    >\n    </ng-container>\n  </ng-container>\n\n  <ng-template #hasExistingPaymentMethods>\n    <p class=\"cx-checkout-text\">\n      {{ 'paymentForm.choosePaymentMethod' | cxTranslate }}\n    </p>\n    <div class=\"cx-checkout-btns row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-action\" (click)=\"showNewPaymentForm()\">\n          {{ 'paymentForm.addNewPayment' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n\n    <div class=\"cx-checkout-body row\">\n      <div\n        class=\"cx-payment-card col-md-12 col-lg-6\"\n        *ngFor=\"let card of cards; let i = index\"\n      >\n        <div\n          class=\"cx-payment-card-inner\"\n          (click)=\"selectPaymentMethod(card.paymentMethod)\"\n        >\n          <cx-card\n            [border]=\"true\"\n            [fitToContainer]=\"true\"\n            [content]=\"card.content\"\n            [index]=\"i\"\n            (sendCard)=\"selectPaymentMethod(card.paymentMethod)\"\n          ></cx-card>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row cx-checkout-btns\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-action\" (click)=\"back()\">\n          {{ backBtnText | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button\n          class=\"btn btn-block btn-primary\"\n          [disabled]=\"!(selectedMethod$ | async)?.id\"\n          (click)=\"next()\"\n        >\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-template>\n\n  <ng-template #newPaymentForm>\n    <cx-payment-form\n      (setPaymentDetails)=\"setPaymentDetails($event)\"\n      (closeForm)=\"hideNewPaymentForm()\"\n      (goBack)=\"back()\"\n      [paymentMethodsCount]=\"cards?.length || 0\"\n      [setAsDefaultField]=\"!isGuestCheckout && !!cards?.length\"\n      [loading]=\"isUpdating$ | async\"\n      [paymentDetails]=\"paymentDetails\"\n    ></cx-payment-form>\n  </ng-template>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.UserPaymentService }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i2.CheckoutPaymentFacade }, { type: i3.ActivatedRoute }, { type: i1$1.TranslationService }, { type: i1.ActiveCartFacade }, { type: CheckoutStepService }, { type: i1$1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentMethodModule {
}
CheckoutPaymentMethodModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentMethodModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, declarations: [CheckoutPaymentMethodComponent], imports: [CommonModule,
        RouterModule,
        CheckoutPaymentFormModule,
        CardModule,
        SpinnerModule,
        I18nModule], exports: [CheckoutPaymentMethodComponent] });
CheckoutPaymentMethodModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutPaymentDetails: {
                    component: CheckoutPaymentMethodComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        CheckoutPaymentFormModule,
        CardModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPaymentMethodModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        CheckoutPaymentFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutPaymentDetails: {
                                    component: CheckoutPaymentMethodComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutPaymentMethodComponent],
                    exports: [CheckoutPaymentMethodComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPlaceOrderComponent {
    constructor(orderFacade, routingService, fb, launchDialogService, vcr) {
        this.orderFacade = orderFacade;
        this.routingService = routingService;
        this.fb = fb;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.checkoutSubmitForm = this.fb.group({
            termsAndConditions: [false, Validators.requiredTrue],
        });
    }
    get termsAndConditionInvalid() {
        return this.checkoutSubmitForm.invalid;
    }
    submitForm() {
        if (this.checkoutSubmitForm.valid) {
            this.placedOrder = this.launchDialogService.launch("PLACE_ORDER_SPINNER" /* LAUNCH_CALLER.PLACE_ORDER_SPINNER */, this.vcr);
            this.orderFacade.placeOrder(this.checkoutSubmitForm.valid).subscribe({
                error: () => {
                    if (!this.placedOrder) {
                        return;
                    }
                    this.placedOrder
                        .subscribe((component) => {
                        this.launchDialogService.clear("PLACE_ORDER_SPINNER" /* LAUNCH_CALLER.PLACE_ORDER_SPINNER */);
                        if (component) {
                            component.destroy();
                        }
                    })
                        .unsubscribe();
                },
                next: () => this.onSuccess(),
            });
        }
        else {
            this.checkoutSubmitForm.markAllAsTouched();
        }
    }
    onSuccess() {
        this.routingService.go({ cxRoute: 'orderConfirmation' });
    }
    ngOnDestroy() {
        this.launchDialogService.clear("PLACE_ORDER_SPINNER" /* LAUNCH_CALLER.PLACE_ORDER_SPINNER */);
    }
}
CheckoutPlaceOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPlaceOrderComponent, deps: [{ token: i1$2.OrderFacade }, { token: i1$1.RoutingService }, { token: i3$1.UntypedFormBuilder }, { token: i4.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
CheckoutPlaceOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutPlaceOrderComponent, selector: "cx-place-order", ngImport: i0, template: "<form class=\"cx-place-order-form form-check\" [formGroup]=\"checkoutSubmitForm\">\n  <div class=\"form-group\">\n    <label>\n      <input\n        formControlName=\"termsAndConditions\"\n        class=\"scaled-input form-check-input\"\n        type=\"checkbox\"\n      />\n      <span class=\"form-check-label\">\n        {{ 'checkoutReview.confirmThatRead' | cxTranslate }}\n        <a\n          [routerLink]=\"{ cxRoute: 'termsAndConditions' } | cxUrl\"\n          class=\"cx-tc-link\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n        >\n          {{ 'checkoutReview.termsAndConditions' | cxTranslate }}\n        </a>\n      </span>\n    </label>\n  </div>\n\n  <button\n    (click)=\"submitForm()\"\n    class=\"btn btn-primary btn-block\"\n    [disabled]=\"termsAndConditionInvalid\"\n    [cxAtMessage]=\"'checkoutReview.orderInProcess' | cxTranslate\"\n  >\n    {{ 'checkoutReview.placeOrder' | cxTranslate }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i4.AtMessageDirective, selector: "[cxAtMessage]", inputs: ["cxAtMessage"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i3$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i3$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPlaceOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-place-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"cx-place-order-form form-check\" [formGroup]=\"checkoutSubmitForm\">\n  <div class=\"form-group\">\n    <label>\n      <input\n        formControlName=\"termsAndConditions\"\n        class=\"scaled-input form-check-input\"\n        type=\"checkbox\"\n      />\n      <span class=\"form-check-label\">\n        {{ 'checkoutReview.confirmThatRead' | cxTranslate }}\n        <a\n          [routerLink]=\"{ cxRoute: 'termsAndConditions' } | cxUrl\"\n          class=\"cx-tc-link\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n        >\n          {{ 'checkoutReview.termsAndConditions' | cxTranslate }}\n        </a>\n      </span>\n    </label>\n  </div>\n\n  <button\n    (click)=\"submitForm()\"\n    class=\"btn btn-primary btn-block\"\n    [disabled]=\"termsAndConditionInvalid\"\n    [cxAtMessage]=\"'checkoutReview.orderInProcess' | cxTranslate\"\n  >\n    {{ 'checkoutReview.placeOrder' | cxTranslate }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.OrderFacade }, { type: i1$1.RoutingService }, { type: i3$1.UntypedFormBuilder }, { type: i4.LaunchDialogService }, { type: i0.ViewContainerRef }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultPlaceOrderSpinnerLayoutConfig = {
    launch: {
        PLACE_ORDER_SPINNER: {
            inline: true,
            component: SpinnerComponent,
            dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPlaceOrderModule {
}
CheckoutPlaceOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPlaceOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPlaceOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPlaceOrderModule, declarations: [CheckoutPlaceOrderComponent], imports: [AtMessageModule,
        CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule], exports: [CheckoutPlaceOrderComponent] });
CheckoutPlaceOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPlaceOrderModule, providers: [
        provideDefaultConfig(defaultPlaceOrderSpinnerLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                CheckoutPlaceOrder: {
                    component: CheckoutPlaceOrderComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutPlaceOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultPlaceOrderSpinnerLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutPlaceOrder: {
                                    component: CheckoutPlaceOrderComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutPlaceOrderComponent],
                    exports: [CheckoutPlaceOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router) {
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return this.checkoutStepService.steps$.pipe(take(1), switchMap((steps) => {
            currentIndex = steps.findIndex((step) => {
                const stepRouteUrl = `/${this.routingConfigService.getRouteConfig(step.routeName)?.paths?.[0]}`;
                return stepRouteUrl === currentRouteUrl;
            });
            // get current step
            let currentStep;
            if (currentIndex >= 0) {
                currentStep = steps[currentIndex];
            }
            if (Boolean(currentStep)) {
                return this.isStepSet(steps[currentIndex - 1]);
            }
            else {
                if (isDevMode()) {
                    console.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isStepSet(step) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddress(step);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isDeliveryAddress(step) {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data), map((deliveryAddress) => {
            if (deliveryAddress && Object.keys(deliveryAddress).length) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryModeSet(step) {
        return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((mode) => (mode ? true : this.getUrl(step.routeName))));
    }
    isPaymentDetailsSet(step) {
        return this.checkoutPaymentFacade.getPaymentDetailsState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentDetails) => paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.getUrl(step.routeName)));
    }
    getUrl(routeName) {
        return this.router.parseUrl(this.routingConfigService.getRouteConfig(routeName)?.paths?.[0]);
    }
}
CheckoutStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepsSetGuard, deps: [{ token: CheckoutStepService }, { token: i1$1.RoutingConfigService }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i2.CheckoutPaymentFacade }, { token: i2.CheckoutDeliveryModesFacade }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CheckoutStepService }, { type: i1$1.RoutingConfigService }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i2.CheckoutPaymentFacade }, { type: i2.CheckoutDeliveryModesFacade }, { type: i3.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutProgressMobileBottomComponent {
    constructor(checkoutStepService) {
        this.checkoutStepService = checkoutStepService;
        this._steps$ = this.checkoutStepService.steps$;
        this.activeStepIndex$ = this.checkoutStepService.activeStepIndex$.pipe(tap((index) => (this.activeStepIndex = index)));
    }
    get steps$() {
        return this._steps$.asObservable();
    }
}
CheckoutProgressMobileBottomComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileBottomComponent, deps: [{ token: CheckoutStepService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutProgressMobileBottomComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutProgressMobileBottomComponent, selector: "cx-checkout-progress-mobile-bottom", ngImport: i0, template: "<div *ngIf=\"(activeStepIndex$ | async) !== undefined\">\n  <div class=\"cx-media\">\n    <div *ngFor=\"let step of steps$ | async; let i = index\">\n      <div class=\"cx-list-media\" *ngIf=\"i > activeStepIndex\">\n        <div>{{ i + 1 }}. {{ step.name | cxTranslate }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileBottomComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-checkout-progress-mobile-bottom', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"(activeStepIndex$ | async) !== undefined\">\n  <div class=\"cx-media\">\n    <div *ngFor=\"let step of steps$ | async; let i = index\">\n      <div class=\"cx-list-media\" *ngIf=\"i > activeStepIndex\">\n        <div>{{ i + 1 }}. {{ step.name | cxTranslate }}</div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: CheckoutStepService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutProgressMobileBottomModule {
}
CheckoutProgressMobileBottomModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileBottomModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutProgressMobileBottomModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileBottomModule, declarations: [CheckoutProgressMobileBottomComponent], imports: [CommonModule, UrlModule, I18nModule, RouterModule], exports: [CheckoutProgressMobileBottomComponent] });
CheckoutProgressMobileBottomModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileBottomModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutProgressMobileBottom: {
                    component: CheckoutProgressMobileBottomComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
                },
            },
        }),
    ], imports: [CommonModule, UrlModule, I18nModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileBottomModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UrlModule, I18nModule, RouterModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutProgressMobileBottom: {
                                    component: CheckoutProgressMobileBottomComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutProgressMobileBottomComponent],
                    exports: [CheckoutProgressMobileBottomComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutProgressMobileTopComponent {
    constructor(activeCartFacade, checkoutStepService) {
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this._steps$ = this.checkoutStepService.steps$;
        this.cart$ = this.activeCartFacade.getActive();
        this.activeStepIndex$ = this.checkoutStepService.activeStepIndex$.pipe(tap((index) => (this.activeStepIndex = index)));
    }
    get steps$() {
        return this._steps$.asObservable();
    }
}
CheckoutProgressMobileTopComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileTopComponent, deps: [{ token: i1.ActiveCartFacade }, { token: CheckoutStepService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutProgressMobileTopComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutProgressMobileTopComponent, selector: "cx-checkout-progress-mobile-top", ngImport: i0, template: "<div *ngIf=\"(activeStepIndex$ | async) !== undefined\">\n  <div *ngIf=\"cart$ | async as cart\">\n    <div class=\"cx-media\">\n      <div class=\"cx-list-media\" *ngIf=\"cart?.totalItems && cart?.subTotal\">\n        {{ 'cartItems.cartTotal' | cxTranslate: { count: cart.totalItems } }}:\n        {{ cart.subTotal.formattedValue }}\n      </div>\n      <div *ngFor=\"let step of steps$ | async; let i = index\">\n        <div class=\"cx-list-media\" *ngIf=\"i < activeStepIndex\">\n          <div>{{ i + 1 }}. {{ step.name | cxTranslate }}</div>\n          <button\n            class=\"btn btn-link\"\n            [routerLink]=\"{ cxRoute: step.routeName } | cxUrl\"\n          >\n            {{ 'common.edit' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"cx-list-media is-active\" *ngIf=\"i === activeStepIndex\">\n          <div>{{ i + 1 }}. {{ step.name | cxTranslate }}</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileTopComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-checkout-progress-mobile-top', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"(activeStepIndex$ | async) !== undefined\">\n  <div *ngIf=\"cart$ | async as cart\">\n    <div class=\"cx-media\">\n      <div class=\"cx-list-media\" *ngIf=\"cart?.totalItems && cart?.subTotal\">\n        {{ 'cartItems.cartTotal' | cxTranslate: { count: cart.totalItems } }}:\n        {{ cart.subTotal.formattedValue }}\n      </div>\n      <div *ngFor=\"let step of steps$ | async; let i = index\">\n        <div class=\"cx-list-media\" *ngIf=\"i < activeStepIndex\">\n          <div>{{ i + 1 }}. {{ step.name | cxTranslate }}</div>\n          <button\n            class=\"btn btn-link\"\n            [routerLink]=\"{ cxRoute: step.routeName } | cxUrl\"\n          >\n            {{ 'common.edit' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"cx-list-media is-active\" *ngIf=\"i === activeStepIndex\">\n          <div>{{ i + 1 }}. {{ step.name | cxTranslate }}</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: CheckoutStepService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutProgressMobileTopModule {
}
CheckoutProgressMobileTopModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileTopModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutProgressMobileTopModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileTopModule, declarations: [CheckoutProgressMobileTopComponent], imports: [CommonModule, UrlModule, I18nModule, RouterModule], exports: [CheckoutProgressMobileTopComponent] });
CheckoutProgressMobileTopModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileTopModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutProgressMobileTop: {
                    component: CheckoutProgressMobileTopComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
                },
            },
        }),
    ], imports: [CommonModule, UrlModule, I18nModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressMobileTopModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UrlModule, I18nModule, RouterModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutProgressMobileTop: {
                                    component: CheckoutProgressMobileTopComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutProgressMobileTopComponent],
                    exports: [CheckoutProgressMobileTopComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MultiLinePipe {
    transform(value) {
        const lastIndex = value.lastIndexOf(' ');
        if (lastIndex === -1) {
            return value;
        }
        return (value.substring(0, lastIndex) +
            '<br />' +
            value.substring(lastIndex, value.length).trim());
    }
}
MultiLinePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiLinePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
MultiLinePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: MultiLinePipe, name: "cxMultiLine" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiLinePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cxMultiLine',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutProgressComponent {
    constructor(checkoutStepService) {
        this.checkoutStepService = checkoutStepService;
        this._steps$ = this.checkoutStepService.steps$;
        this.activeStepIndex$ = this.checkoutStepService.activeStepIndex$.pipe(tap((index) => (this.activeStepIndex = index)));
    }
    get steps$() {
        return this._steps$.asObservable();
    }
    getTabIndex(stepIndex) {
        return !this.isActive(stepIndex) && !this.isDisabled(stepIndex) ? 0 : -1;
    }
    isActive(index) {
        return index === this.activeStepIndex;
    }
    isDisabled(index) {
        return index > this.activeStepIndex;
    }
}
CheckoutProgressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressComponent, deps: [{ token: CheckoutStepService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutProgressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutProgressComponent, selector: "cx-checkout-progress", ngImport: i0, template: "<nav\n  [attr.aria-label]=\"'checkoutProgress.label' | cxTranslate\"\n  *ngIf=\"(activeStepIndex$ | async) !== undefined\"\n>\n  <div class=\"cx-nav d-none d-lg-block d-xl-block\">\n    <ul class=\"cx-list\">\n      <ng-container *ngFor=\"let step of steps$ | async; let i = index\">\n        <li\n          class=\"cx-item\"\n          [class.active]=\"isActive(i)\"\n          [class.disabled]=\"isDisabled(i)\"\n        >\n          <a\n            [routerLink]=\"{ cxRoute: step.routeName } | cxUrl\"\n            class=\"cx-link\"\n            [class.active]=\"isActive(i)\"\n            [class.disabled]=\"isDisabled(i)\"\n            [tabindex]=\"getTabIndex(i)\"\n            [innerHTML]=\"step.name | cxTranslate | cxMultiLine\"\n          >\n          </a>\n        </li>\n      </ng-container>\n    </ul>\n  </div>\n</nav>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: MultiLinePipe, name: "cxMultiLine" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-checkout-progress', changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav\n  [attr.aria-label]=\"'checkoutProgress.label' | cxTranslate\"\n  *ngIf=\"(activeStepIndex$ | async) !== undefined\"\n>\n  <div class=\"cx-nav d-none d-lg-block d-xl-block\">\n    <ul class=\"cx-list\">\n      <ng-container *ngFor=\"let step of steps$ | async; let i = index\">\n        <li\n          class=\"cx-item\"\n          [class.active]=\"isActive(i)\"\n          [class.disabled]=\"isDisabled(i)\"\n        >\n          <a\n            [routerLink]=\"{ cxRoute: step.routeName } | cxUrl\"\n            class=\"cx-link\"\n            [class.active]=\"isActive(i)\"\n            [class.disabled]=\"isDisabled(i)\"\n            [tabindex]=\"getTabIndex(i)\"\n            [innerHTML]=\"step.name | cxTranslate | cxMultiLine\"\n          >\n          </a>\n        </li>\n      </ng-container>\n    </ul>\n  </div>\n</nav>\n" }]
        }], ctorParameters: function () { return [{ type: CheckoutStepService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutProgressModule {
}
CheckoutProgressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutProgressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressModule, declarations: [CheckoutProgressComponent, MultiLinePipe], imports: [CommonModule, UrlModule, I18nModule, RouterModule], exports: [CheckoutProgressComponent] });
CheckoutProgressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutProgress: {
                    component: CheckoutProgressComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
                },
            },
        }),
    ], imports: [CommonModule, UrlModule, I18nModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutProgressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UrlModule, I18nModule, RouterModule],
                    declarations: [CheckoutProgressComponent, MultiLinePipe],
                    exports: [CheckoutProgressComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutProgress: {
                                    component: CheckoutProgressComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CheckoutStepsSetGuard],
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
class CheckoutReviewSubmitComponent {
    constructor(checkoutDeliveryAddressFacade, checkoutPaymentFacade, activeCartFacade, translationService, checkoutStepService, checkoutDeliveryModesFacade) {
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.activeCartFacade = activeCartFacade;
        this.translationService = translationService;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.cartOutlets = CartOutlets;
        this.iconTypes = ICON_TYPE;
        this.checkoutStepTypeDeliveryAddress = "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */;
        this.checkoutStepTypePaymentDetails = "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */;
        this.checkoutStepTypeDeliveryMode = "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */;
        this.promotionLocation = PromotionLocation.ActiveCart;
        this.steps$ = this.checkoutStepService.steps$;
        this.deliveryAddress$ = this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading && !state.error), map((state) => state.data));
        this.deliveryMode$ = this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(filter((state) => !state.loading && !state.error), map((state) => state.data));
        this.paymentDetails$ = this.checkoutPaymentFacade.getPaymentDetailsState().pipe(filter((state) => !state.loading && !state.error), map((state) => state.data));
    }
    get cart$() {
        return this.activeCartFacade.getActive();
    }
    get entries$() {
        return this.activeCartFacade.getEntries();
    }
    getCheckoutDeliverySteps() {
        return ["deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */, "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */];
    }
    getCheckoutPaymentSteps() {
        return [
            "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */,
            "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */,
        ];
    }
    getDeliveryAddressCard(deliveryAddress, countryName) {
        return this.translationService.translate('addressCard.shipTo').pipe(map((textTitle) => {
            if (!countryName) {
                countryName = deliveryAddress?.country?.name;
            }
            let region = '';
            if (deliveryAddress &&
                deliveryAddress.region &&
                deliveryAddress.region.isocode) {
                region = deliveryAddress.region.isocode + ', ';
            }
            return {
                title: textTitle,
                textBold: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
                text: [
                    deliveryAddress.line1,
                    deliveryAddress.line2,
                    deliveryAddress.town + ', ' + region + countryName,
                    deliveryAddress.postalCode,
                    deliveryAddress.phone,
                ],
            };
        }));
    }
    getDeliveryModeCard(deliveryMode) {
        return combineLatest([
            this.translationService.translate('checkoutMode.deliveryMethod'),
        ]).pipe(map(([textTitle]) => {
            return {
                title: textTitle,
                textBold: deliveryMode.name,
                text: [
                    deliveryMode.description,
                    deliveryMode.deliveryCost?.formattedValue
                        ? deliveryMode.deliveryCost?.formattedValue
                        : '',
                ],
            };
        }));
    }
    getPaymentMethodCard(paymentDetails) {
        return combineLatest([
            this.translationService.translate('paymentForm.payment'),
            this.translationService.translate('paymentCard.expires', {
                month: paymentDetails.expiryMonth,
                year: paymentDetails.expiryYear,
            }),
            this.translationService.translate('paymentForm.billingAddress'),
        ]).pipe(map(([textTitle, textExpires, billingAddress]) => {
            const region = paymentDetails.billingAddress?.region?.isocode
                ? paymentDetails.billingAddress?.region?.isocode + ', '
                : '';
            return {
                title: textTitle,
                textBold: paymentDetails.accountHolderName,
                text: [paymentDetails.cardNumber, textExpires],
                paragraphs: [
                    {
                        title: billingAddress + ':',
                        text: [
                            paymentDetails.billingAddress?.firstName +
                                ' ' +
                                paymentDetails.billingAddress?.lastName,
                            paymentDetails.billingAddress?.line1,
                            paymentDetails.billingAddress?.town +
                                ', ' +
                                region +
                                paymentDetails.billingAddress?.country?.isocode,
                            paymentDetails.billingAddress?.postalCode,
                        ],
                    },
                ],
            };
        }));
    }
    getCheckoutStepUrl(stepType) {
        const step = this.checkoutStepService.getCheckoutStep(stepType);
        return step?.routeName;
    }
    deliverySteps(steps) {
        return steps.filter((step) => this.getCheckoutDeliverySteps().includes(step.type[0]));
    }
    paymentSteps(steps) {
        return steps.filter((step) => this.getCheckoutPaymentSteps().includes(step.type[0]));
    }
}
CheckoutReviewSubmitComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitComponent, deps: [{ token: i2.CheckoutDeliveryAddressFacade }, { token: i2.CheckoutPaymentFacade }, { token: i1.ActiveCartFacade }, { token: i1$1.TranslationService }, { token: CheckoutStepService }, { token: i2.CheckoutDeliveryModesFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutReviewSubmitComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CheckoutReviewSubmitComponent, selector: "cx-review-submit", ngImport: i0, template: "<div class=\"cx-review\">\n  <!-- TITLE -->\n  <h2 class=\"cx-review-title d-none d-lg-block d-xl-block\">\n    {{ 'checkoutReview.review' | cxTranslate }}\n  </h2>\n\n  <div class=\"cx-review-summary row\">\n    <ng-container *ngIf=\"(steps$ | async)?.slice(0, -1) as steps\">\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-payment-col\">\n        <ng-container *ngFor=\"let step of paymentSteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentDetails\">\n              <ng-container *ngTemplateOutlet=\"paymentMethod\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-shipping-col\">\n        <ng-container *ngFor=\"let step of deliverySteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryAddress\">\n              <ng-container *ngTemplateOutlet=\"deliveryAddress\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryMode\">\n              <ng-container *ngTemplateOutlet=\"deliveryMode\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </ng-container>\n  </div>\n\n  <!-- DELIVERY ADDRESS SECTION -->\n  <ng-template #deliveryAddress>\n    <div\n      *ngIf=\"deliveryAddress$ | async as deliveryAddress\"\n      class=\"cx-review-summary-card cx-review-card-address\"\n    >\n      <cx-card\n        [content]=\"getDeliveryAddressCard(deliveryAddress) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"\n            'checkoutReview.editDeliveryAddressDetails' | cxTranslate\n          \"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryAddress)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- DELIVERY MODE SECTION -->\n  <ng-template #deliveryMode>\n    <div class=\"cx-review-summary-card cx-review-card-shipping\">\n      <cx-card\n        *ngIf=\"deliveryMode$ | async as deliveryMode\"\n        [content]=\"getDeliveryModeCard(deliveryMode) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editDeliveryMode' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryMode) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- PAYMENT METHOD SECTION -->\n  <ng-template #paymentMethod>\n    <div class=\"cx-review-summary-card cx-review-card-payment\">\n      <div>\n        <cx-card\n          *ngIf=\"paymentDetails$ | async as paymentDetails\"\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentDetails' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentDetails) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- CART ITEM SECTION -->\n  <ng-container *ngIf=\"cart$ | async as cart\">\n    <div class=\"cx-review-cart-total d-none d-lg-block d-xl-block\">\n      {{\n        'cartItems.cartTotal'\n          | cxTranslate: { count: cart.deliveryItemsQuantity }\n      }}:\n      {{ cart.totalPrice?.formattedValue }}\n    </div>\n    <div class=\"cx-review-cart-heading d-block d-lg-none d-xl-none\">\n      {{ 'checkoutReview.placeOrder' | cxTranslate }}\n    </div>\n    <div\n      class=\"cx-review-cart-item col-md-12\"\n      *ngIf=\"entries$ | async as entries\"\n    >\n      <cx-promotions\n        [promotions]=\"\n          (cart.appliedOrderPromotions || []).concat(\n            cart.potentialOrderPromotions || []\n          )\n        \"\n      ></cx-promotions>\n\n      <ng-template\n        [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          items: entries,\n          readonly: true,\n          promotionLocation: promotionLocation\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i4.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i4.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-review-submit', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-review\">\n  <!-- TITLE -->\n  <h2 class=\"cx-review-title d-none d-lg-block d-xl-block\">\n    {{ 'checkoutReview.review' | cxTranslate }}\n  </h2>\n\n  <div class=\"cx-review-summary row\">\n    <ng-container *ngIf=\"(steps$ | async)?.slice(0, -1) as steps\">\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-payment-col\">\n        <ng-container *ngFor=\"let step of paymentSteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentDetails\">\n              <ng-container *ngTemplateOutlet=\"paymentMethod\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-shipping-col\">\n        <ng-container *ngFor=\"let step of deliverySteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryAddress\">\n              <ng-container *ngTemplateOutlet=\"deliveryAddress\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryMode\">\n              <ng-container *ngTemplateOutlet=\"deliveryMode\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </ng-container>\n  </div>\n\n  <!-- DELIVERY ADDRESS SECTION -->\n  <ng-template #deliveryAddress>\n    <div\n      *ngIf=\"deliveryAddress$ | async as deliveryAddress\"\n      class=\"cx-review-summary-card cx-review-card-address\"\n    >\n      <cx-card\n        [content]=\"getDeliveryAddressCard(deliveryAddress) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"\n            'checkoutReview.editDeliveryAddressDetails' | cxTranslate\n          \"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryAddress)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- DELIVERY MODE SECTION -->\n  <ng-template #deliveryMode>\n    <div class=\"cx-review-summary-card cx-review-card-shipping\">\n      <cx-card\n        *ngIf=\"deliveryMode$ | async as deliveryMode\"\n        [content]=\"getDeliveryModeCard(deliveryMode) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editDeliveryMode' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryMode) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- PAYMENT METHOD SECTION -->\n  <ng-template #paymentMethod>\n    <div class=\"cx-review-summary-card cx-review-card-payment\">\n      <div>\n        <cx-card\n          *ngIf=\"paymentDetails$ | async as paymentDetails\"\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentDetails' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentDetails) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- CART ITEM SECTION -->\n  <ng-container *ngIf=\"cart$ | async as cart\">\n    <div class=\"cx-review-cart-total d-none d-lg-block d-xl-block\">\n      {{\n        'cartItems.cartTotal'\n          | cxTranslate: { count: cart.deliveryItemsQuantity }\n      }}:\n      {{ cart.totalPrice?.formattedValue }}\n    </div>\n    <div class=\"cx-review-cart-heading d-block d-lg-none d-xl-none\">\n      {{ 'checkoutReview.placeOrder' | cxTranslate }}\n    </div>\n    <div\n      class=\"cx-review-cart-item col-md-12\"\n      *ngIf=\"entries$ | async as entries\"\n    >\n      <cx-promotions\n        [promotions]=\"\n          (cart.appliedOrderPromotions || []).concat(\n            cart.potentialOrderPromotions || []\n          )\n        \"\n      ></cx-promotions>\n\n      <ng-template\n        [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          items: entries,\n          readonly: true,\n          promotionLocation: promotionLocation\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i2.CheckoutDeliveryAddressFacade }, { type: i2.CheckoutPaymentFacade }, { type: i1.ActiveCartFacade }, { type: i1$1.TranslationService }, { type: CheckoutStepService }, { type: i2.CheckoutDeliveryModesFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutReviewSubmitModule {
}
CheckoutReviewSubmitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutReviewSubmitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, declarations: [CheckoutReviewSubmitComponent], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule], exports: [CheckoutReviewSubmitComponent] });
CheckoutReviewSubmitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutReviewOrder: {
                    component: CheckoutReviewSubmitComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                        PromotionsModule,
                        IconModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutReviewOrder: {
                                    component: CheckoutReviewSubmitComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutReviewSubmitComponent],
                    exports: [CheckoutReviewSubmitComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutComponentsModule {
}
CheckoutComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutComponentsModule, imports: [CheckoutOrchestratorModule,
        CheckoutOrderSummaryModule,
        CheckoutProgressModule,
        CheckoutProgressMobileTopModule,
        CheckoutProgressMobileBottomModule,
        CheckoutDeliveryModeModule,
        CheckoutPaymentMethodModule,
        CheckoutPlaceOrderModule,
        CheckoutReviewSubmitModule,
        CheckoutDeliveryAddressModule,
        CheckoutLoginModule] });
CheckoutComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutComponentsModule, imports: [CheckoutOrchestratorModule,
        CheckoutOrderSummaryModule,
        CheckoutProgressModule,
        CheckoutProgressMobileTopModule,
        CheckoutProgressMobileBottomModule,
        CheckoutDeliveryModeModule,
        CheckoutPaymentMethodModule,
        CheckoutPlaceOrderModule,
        CheckoutReviewSubmitModule,
        CheckoutDeliveryAddressModule,
        CheckoutLoginModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CheckoutOrchestratorModule,
                        CheckoutOrderSummaryModule,
                        CheckoutProgressModule,
                        CheckoutProgressMobileTopModule,
                        CheckoutProgressMobileBottomModule,
                        CheckoutDeliveryModeModule,
                        CheckoutPaymentMethodModule,
                        CheckoutPlaceOrderModule,
                        CheckoutReviewSubmitModule,
                        CheckoutDeliveryAddressModule,
                        CheckoutLoginModule,
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

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CartNotEmptyGuard, CheckoutAuthGuard, CheckoutComponentsModule, CheckoutConfigService, CheckoutDeliveryAddressComponent, CheckoutDeliveryAddressModule, CheckoutDeliveryModeComponent, CheckoutDeliveryModeModule, CheckoutGuard, CheckoutLoginComponent, CheckoutLoginModule, CheckoutOrchestratorComponent, CheckoutOrchestratorModule, CheckoutOrderSummaryComponent, CheckoutOrderSummaryModule, CheckoutPaymentFormComponent, CheckoutPaymentFormModule, CheckoutPaymentMethodComponent, CheckoutPaymentMethodModule, CheckoutPlaceOrderComponent, CheckoutPlaceOrderModule, CheckoutProgressComponent, CheckoutProgressMobileBottomComponent, CheckoutProgressMobileBottomModule, CheckoutProgressMobileTopComponent, CheckoutProgressMobileTopModule, CheckoutProgressModule, CheckoutReviewSubmitComponent, CheckoutReviewSubmitModule, CheckoutStepService, CheckoutStepsSetGuard, ExpressCheckoutService, NotCheckoutAuthGuard };
//# sourceMappingURL=spartacus-checkout-base-components.mjs.map
