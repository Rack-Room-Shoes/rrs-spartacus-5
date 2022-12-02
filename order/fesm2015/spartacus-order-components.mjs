import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, HostBinding, NgModule, Injectable, ViewChild, HostListener } from '@angular/core';
import * as i1 from '@spartacus/core';
import { UrlModule, I18nModule, FeaturesConfigModule, GlobalMessageType, provideDefaultConfig, AuthGuard, isNotUndefined } from '@spartacus/core';
import * as i2 from '@angular/common';
import { CommonModule, formatCurrency, getCurrencySymbol } from '@angular/common';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3$2 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { map, distinctUntilChanged, tap, shareReplay, switchMap, filter, first, take, withLatestFrom, startWith } from 'rxjs/operators';
import * as i1$1 from '@spartacus/order/root';
import { OrderFacade, OrderConfirmationOrderEntriesContextToken, OrderDetailsOrderEntriesContextToken } from '@spartacus/order/root';
import * as i3$1 from '@spartacus/storefront';
import { MediaModule, ItemCounterModule, FormErrorsModule, MessageComponentModule, CardModule, CustomFormValidators, PwaModule, PromotionsModule, OutletModule, PasswordVisibilityToggleModule, DIALOG_TYPE, SpinnerModule, KeyboardFocusModule, ListNavigationModule } from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { OrderEntriesSource, CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import * as i1$2 from '@spartacus/user/profile/root';
import * as i4 from '@spartacus/cart/base/components/add-to-cart';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { NgSelectModule } from '@ng-select/ng-select';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmendOrderActionsComponent {
    constructor(routingService) {
        this.routingService = routingService;
        this.styles = 'row';
    }
    continue(event) {
        if (this.amendOrderForm.valid) {
            this.routingService.go({
                cxRoute: this.forwardRoute,
                params: { code: this.orderCode },
            });
        }
        else {
            this.amendOrderForm.markAllAsTouched();
            event.stopPropagation();
        }
    }
}
AmendOrderActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderActionsComponent, deps: [{ token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Component });
AmendOrderActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: { orderCode: "orderCode", amendOrderForm: "amendOrderForm", backRoute: "backRoute", forwardRoute: "forwardRoute" }, host: { properties: { "class": "this.styles" } }, ngImport: i0, template: "<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <a\n    [routerLink]=\"\n      {\n        cxRoute: backRoute,\n        params: { code: orderCode }\n      } | cxUrl\n    \"\n    class=\"btn btn-block btn-action\"\n  >\n    {{ 'common.back' | cxTranslate }}\n  </a>\n</div>\n<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <button\n    *ngIf=\"forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    (click)=\"continue($event)\"\n  >\n    {{ 'common.continue' | cxTranslate }}\n  </button>\n\n  <button\n    *ngIf=\"!forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    type=\"submit\"\n    [attr.aria-label]=\"\n      'orderDetails.cancellationAndReturn.submitDescription' | cxTranslate\n    \"\n  >\n    {{ 'orderDetails.cancellationAndReturn.submit' | cxTranslate }}\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-amend-order-actions', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <a\n    [routerLink]=\"\n      {\n        cxRoute: backRoute,\n        params: { code: orderCode }\n      } | cxUrl\n    \"\n    class=\"btn btn-block btn-action\"\n  >\n    {{ 'common.back' | cxTranslate }}\n  </a>\n</div>\n<div class=\"col-xs-12 col-md-4 col-lg-3\">\n  <button\n    *ngIf=\"forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    (click)=\"continue($event)\"\n  >\n    {{ 'common.continue' | cxTranslate }}\n  </button>\n\n  <button\n    *ngIf=\"!forwardRoute\"\n    class=\"btn btn-block btn-primary\"\n    type=\"submit\"\n    [attr.aria-label]=\"\n      'orderDetails.cancellationAndReturn.submitDescription' | cxTranslate\n    \"\n  >\n    {{ 'orderDetails.cancellationAndReturn.submit' | cxTranslate }}\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }]; }, propDecorators: { orderCode: [{
                type: Input
            }], amendOrderForm: [{
                type: Input
            }], backRoute: [{
                type: Input
            }], forwardRoute: [{
                type: Input
            }], styles: [{
                type: HostBinding,
                args: ['class']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmendOrderActionsModule {
}
AmendOrderActionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderActionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmendOrderActionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderActionsModule, declarations: [AmendOrderActionsComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule], exports: [AmendOrderActionsComponent] });
AmendOrderActionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderActionsModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderActionsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule],
                    declarations: [AmendOrderActionsComponent],
                    exports: [AmendOrderActionsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var AmendOrderType;
(function (AmendOrderType) {
    AmendOrderType[AmendOrderType["CANCEL"] = 0] = "CANCEL";
    AmendOrderType[AmendOrderType["RETURN"] = 1] = "RETURN";
})(AmendOrderType || (AmendOrderType = {}));

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailsService {
    constructor(orderHistoryFacade, routingService) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.routingService = routingService;
        this.orderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.orderCode), distinctUntilChanged());
        this.orderLoad$ = this.orderCode$.pipe(tap((orderCode) => {
            if (orderCode) {
                this.orderHistoryFacade.loadOrderDetails(orderCode);
            }
            else {
                this.orderHistoryFacade.clearOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getOrderDetails() {
        return this.orderLoad$.pipe(switchMap(() => this.orderHistoryFacade.getOrderDetails()));
    }
}
OrderDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsService, deps: [{ token: i1$1.OrderHistoryFacade }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderHistoryFacade }, { type: i1.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function ValidateQuantityToCancel(control) {
    if (!control.value) {
        return null;
    }
    const quantity = Object.values(control.value).reduce((acc, val) => acc + val, 0);
    return quantity > 0 ? null : { cxNoSelectedItemToCancel: true };
}
class OrderAmendService {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    /**
     * Returns entries with an amended quantity.
     */
    getAmendedEntries() {
        return this.getForm().pipe(switchMap((form) => {
            return this.getEntries().pipe(map((entries) => entries.filter((entry) => this.getFormControl(form, entry).value > 0)));
        }));
    }
    getOrder() {
        return this.orderDetailsService.getOrderDetails();
    }
    /**
     * returns the form with form data at runtime
     */
    getForm() {
        return this.getOrder().pipe(tap((order) => {
            var _a;
            if (!this.form || ((_a = this.form.get('orderCode')) === null || _a === void 0 ? void 0 : _a.value) !== order.code) {
                this.buildForm(order);
            }
        }), map(() => this.form));
    }
    buildForm(order) {
        this.form = new UntypedFormGroup({});
        this.form.addControl('orderCode', new UntypedFormControl(order.code));
        const entryGroup = new UntypedFormGroup({}, { validators: [ValidateQuantityToCancel] });
        this.form.addControl('entries', entryGroup);
        (order.entries || []).forEach((entry) => {
            var _a, _b;
            const key = (_b = (_a = entry === null || entry === void 0 ? void 0 : entry.entryNumber) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
            entryGroup.addControl(key, new UntypedFormControl(0, {
                validators: [
                    Validators.min(0),
                    Validators.max(this.getMaxAmendQuantity(entry)),
                ],
            }));
        });
    }
    getFormControl(form, entry) {
        var _a, _b, _c;
        return ((_a = form.get('entries')) === null || _a === void 0 ? void 0 : _a.get((_c = (_b = entry.entryNumber) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : ''));
    }
    /**
     * As discussed, this calculation is moved to SPA side.
     * The calculation and validation should be in backend facade layer.
     */
    getAmendedPrice(entry) {
        var _a, _b, _c;
        const amendedQuantity = this.getFormControl(this.form, entry).value;
        const amendedPrice = Object.assign({}, entry.basePrice);
        amendedPrice.value =
            Math.round(((_b = (_a = entry.basePrice) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) * amendedQuantity * 100) / 100;
        amendedPrice.formattedValue = formatCurrency(amendedPrice.value, 
        // TODO: user current language
        'en', getCurrencySymbol((_c = amendedPrice.currencyIso) !== null && _c !== void 0 ? _c : '', 'narrow'), amendedPrice.currencyIso);
        return amendedPrice;
    }
    getMaxAmendQuantity(entry) {
        return ((this.isCancellation()
            ? entry.cancellableQuantity
            : entry.returnableQuantity) ||
            entry.quantity ||
            0);
    }
    isCancellation() {
        return this.amendType === AmendOrderType.CANCEL;
    }
}
OrderAmendService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderAmendService, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderAmendService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderAmendService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderAmendService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrReturnItemsComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.isConfirmation = false;
        this.form$ = this.orderAmendService.getForm();
    }
    getControl(form, entry) {
        var _a, _b, _c;
        const control = ((_a = form.get('entries')) === null || _a === void 0 ? void 0 : _a.get((_c = (_b = entry.entryNumber) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : ''));
        return control;
    }
    setAll(form) {
        this.entries.forEach((entry) => this.getControl(form, entry).setValue(this.getMaxAmendQuantity(entry)));
    }
    getItemPrice(entry) {
        return this.orderAmendService.getAmendedPrice(entry);
    }
    getMaxAmendQuantity(entry) {
        return this.orderAmendService.getMaxAmendQuantity(entry);
    }
    isCancellation() {
        return this.orderAmendService.isCancellation();
    }
}
CancelOrReturnItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrReturnItemsComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
CancelOrReturnItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: { entries: "entries", isConfirmation: "isConfirmation" }, ngImport: i0, template: "<div *ngIf=\"form$ | async as form\">\n  <button\n    *ngIf=\"!isConfirmation\"\n    class=\"btn btn-link cx-action-link\"\n    (click)=\"setAll(form)\"\n  >\n    {{ 'orderDetails.cancellationAndReturn.setAll' | cxTranslate }}\n  </button>\n\n  <table class=\"cx-amend-order-items\">\n    <caption class=\"cx-visually-hidden\">\n      {{\n        'orderDetails.caption' | cxTranslate\n      }}\n    </caption>\n    <thead>\n      <tr>\n        <th role=\"columnheader\" class=\"cx-item-list-desc\">\n          {{ 'orderDetails.cancellationAndReturn.item' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-price\">\n          {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n        </th>\n        <th\n          *ngIf=\"!isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-amend-qty\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-qty\">\n          {{\n            (isCancellation()\n              ? 'orderDetails.cancellationAndReturn.cancelQty'\n              : 'orderDetails.cancellationAndReturn.returnQty'\n            ) | cxTranslate\n          }}\n        </th>\n        <th\n          *ngIf=\"isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-total\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"cx-item-list-items\">\n      <!--    TODO: This should be a separate component-->\n      <tr\n        *ngFor=\"let item of entries; let i = index\"\n        class=\"cx-item-list-row cx-amend-order-item-row\"\n      >\n        <td role=\"cell\">\n          <div class=\"cx-table-item-container\">\n            <cx-media\n              [container]=\"item.product.images?.PRIMARY\"\n              format=\"thumbnail\"\n            ></cx-media>\n\n            <div class=\"cx-info\">\n              <div class=\"cx-name\">\n                {{ item.product.name }}\n              </div>\n\n              <div *ngIf=\"item.product.code\" class=\"cx-code\">\n                {{ 'cartItems.id' | cxTranslate }} {{ item.product.code }}\n              </div>\n            </div>\n\n            <ng-container *ngIf=\"item.product.baseOptions?.length\">\n              <div\n                *ngFor=\"\n                  let variant of item.product.baseOptions[0]?.selected\n                    ?.variantOptionQualifiers\n                \"\n                class=\"cx-property\"\n              >\n                <div class=\"cx-label\" *ngIf=\"variant.name\">\n                  {{ variant.name }}:\n                </div>\n                <div class=\"cx-value\" *ngIf=\"variant.value\">\n                  {{ variant.value }}\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-price\" *ngIf=\"item.basePrice\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"!isConfirmation\" class=\"cx-request-qty\">\n          <div\n            class=\"cx-mobile-header\"\n            title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n          >\n            {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ getMaxAmendQuantity(item) }}\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-quantity\">\n          <div class=\"cx-mobile-header\">\n            {{\n              (isCancellation()\n                ? 'orderDetails.cancellationAndReturn.cancelQty'\n                : 'orderDetails.cancellationAndReturn.returnQty'\n              ) | cxTranslate\n            }}\n          </div>\n          <div class=\"cx-value\">\n            <ng-container *ngIf=\"isConfirmation\">\n              {{ getControl(form, item).value }}\n            </ng-container>\n            <cx-item-counter\n              *ngIf=\"!isConfirmation\"\n              [min]=\"0\"\n              [max]=\"getMaxAmendQuantity(item)\"\n              [control]=\"getControl(form, item)\"\n            ></cx-item-counter>\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"isConfirmation\" class=\"cx-total\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">{{ getItemPrice(item)?.formattedValue }}</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i3$1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrReturnItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-amend-order-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"form$ | async as form\">\n  <button\n    *ngIf=\"!isConfirmation\"\n    class=\"btn btn-link cx-action-link\"\n    (click)=\"setAll(form)\"\n  >\n    {{ 'orderDetails.cancellationAndReturn.setAll' | cxTranslate }}\n  </button>\n\n  <table class=\"cx-amend-order-items\">\n    <caption class=\"cx-visually-hidden\">\n      {{\n        'orderDetails.caption' | cxTranslate\n      }}\n    </caption>\n    <thead>\n      <tr>\n        <th role=\"columnheader\" class=\"cx-item-list-desc\">\n          {{ 'orderDetails.cancellationAndReturn.item' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-price\">\n          {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n        </th>\n        <th\n          *ngIf=\"!isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-amend-qty\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-qty\">\n          {{\n            (isCancellation()\n              ? 'orderDetails.cancellationAndReturn.cancelQty'\n              : 'orderDetails.cancellationAndReturn.returnQty'\n            ) | cxTranslate\n          }}\n        </th>\n        <th\n          *ngIf=\"isConfirmation\"\n          role=\"columnheader\"\n          class=\"cx-item-list-total\"\n        >\n          {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"cx-item-list-items\">\n      <!--    TODO: This should be a separate component-->\n      <tr\n        *ngFor=\"let item of entries; let i = index\"\n        class=\"cx-item-list-row cx-amend-order-item-row\"\n      >\n        <td role=\"cell\">\n          <div class=\"cx-table-item-container\">\n            <cx-media\n              [container]=\"item.product.images?.PRIMARY\"\n              format=\"thumbnail\"\n            ></cx-media>\n\n            <div class=\"cx-info\">\n              <div class=\"cx-name\">\n                {{ item.product.name }}\n              </div>\n\n              <div *ngIf=\"item.product.code\" class=\"cx-code\">\n                {{ 'cartItems.id' | cxTranslate }} {{ item.product.code }}\n              </div>\n            </div>\n\n            <ng-container *ngIf=\"item.product.baseOptions?.length\">\n              <div\n                *ngFor=\"\n                  let variant of item.product.baseOptions[0]?.selected\n                    ?.variantOptionQualifiers\n                \"\n                class=\"cx-property\"\n              >\n                <div class=\"cx-label\" *ngIf=\"variant.name\">\n                  {{ variant.name }}:\n                </div>\n                <div class=\"cx-value\" *ngIf=\"variant.value\">\n                  {{ variant.value }}\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-price\" *ngIf=\"item.basePrice\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.itemPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"!isConfirmation\" class=\"cx-request-qty\">\n          <div\n            class=\"cx-mobile-header\"\n            title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n          >\n            {{ 'orderDetails.cancellationAndReturn.quantity' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">\n            {{ getMaxAmendQuantity(item) }}\n          </div>\n        </td>\n\n        <td role=\"cell\" class=\"cx-quantity\">\n          <div class=\"cx-mobile-header\">\n            {{\n              (isCancellation()\n                ? 'orderDetails.cancellationAndReturn.cancelQty'\n                : 'orderDetails.cancellationAndReturn.returnQty'\n              ) | cxTranslate\n            }}\n          </div>\n          <div class=\"cx-value\">\n            <ng-container *ngIf=\"isConfirmation\">\n              {{ getControl(form, item).value }}\n            </ng-container>\n            <cx-item-counter\n              *ngIf=\"!isConfirmation\"\n              [min]=\"0\"\n              [max]=\"getMaxAmendQuantity(item)\"\n              [control]=\"getControl(form, item)\"\n            ></cx-item-counter>\n          </div>\n        </td>\n\n        <td role=\"cell\" *ngIf=\"isConfirmation\" class=\"cx-total\">\n          <div class=\"cx-mobile-header\">\n            {{ 'orderDetails.cancellationAndReturn.totalPrice' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\">{{ getItemPrice(item)?.formattedValue }}</div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; }, propDecorators: { entries: [{
                type: Input
            }], isConfirmation: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmendOrderItemsModule {
}
AmendOrderItemsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderItemsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AmendOrderItemsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderItemsModule, declarations: [CancelOrReturnItemsComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        MediaModule,
        ItemCounterModule,
        FeaturesConfigModule,
        FormErrorsModule], exports: [CancelOrReturnItemsComponent] });
AmendOrderItemsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderItemsModule, imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        MediaModule,
        ItemCounterModule,
        FeaturesConfigModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AmendOrderItemsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        MediaModule,
                        ItemCounterModule,
                        FeaturesConfigModule,
                        FormErrorsModule,
                    ],
                    declarations: [CancelOrReturnItemsComponent],
                    exports: [CancelOrReturnItemsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderConfirmationComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getAmendedEntries();
    }
    submit(form) {
        if (form.valid) {
            this.orderAmendService.save();
        }
        else {
            form.markAllAsTouched();
        }
    }
}
CancelOrderConfirmationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderConfirmationComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
CancelOrderConfirmationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CancelOrderConfirmationComponent, selector: "cx-cancel-order-confirmation", ngImport: i0, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderCancel\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderConfirmationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cancel-order-confirmation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderCancel\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCancellationService extends OrderAmendService {
    constructor(orderDetailsService, orderHistoryFacade, routing, globalMessageService) {
        super(orderDetailsService);
        this.orderDetailsService = orderDetailsService;
        this.orderHistoryFacade = orderHistoryFacade;
        this.routing = routing;
        this.globalMessageService = globalMessageService;
        this.amendType = AmendOrderType.CANCEL;
    }
    /**
     * Return cancellable order entries.
     */
    getEntries() {
        return this.getOrder().pipe(filter((order) => !!(order === null || order === void 0 ? void 0 : order.entries)), map((order) => {
            var _a, _b;
            return (_b = (_a = order.entries) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry.entryNumber !== -1 &&
                entry.cancellableQuantity &&
                entry.cancellableQuantity > 0)) !== null && _b !== void 0 ? _b : [];
        }));
    }
    save() {
        const orderCode = this.form.value.orderCode;
        const entries = this.form.value.entries;
        const inputs = Object.keys(entries)
            .filter((entryNumber) => entries[entryNumber] > 0)
            .map((entryNumber) => ({
            orderEntryNumber: Number(entryNumber),
            quantity: entries[entryNumber],
        }));
        this.form.reset();
        this.orderHistoryFacade.cancelOrder(orderCode, {
            cancellationRequestEntryInputs: inputs,
        });
        this.orderHistoryFacade
            .getCancelOrderSuccess()
            .pipe(first(Boolean))
            .subscribe(() => this.afterSave(orderCode));
    }
    afterSave(orderCode) {
        this.orderHistoryFacade.resetCancelOrderProcessState();
        this.globalMessageService.add({
            key: 'orderDetails.cancellationAndReturn.cancelSuccess',
            params: { orderCode },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.routing.go({
            cxRoute: 'orders',
        });
    }
}
OrderCancellationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationService, deps: [{ token: OrderDetailsService }, { token: i1$1.OrderHistoryFacade }, { token: i1.RoutingService }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderCancellationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i1$1.OrderHistoryFacade }, { type: i1.RoutingService }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCancellationGuard {
    constructor(orderAmendService, semanticPathService, router) {
        this.orderAmendService = orderAmendService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return this.orderAmendService.getForm().pipe(map((form) => {
            var _a;
            if (!form.valid) {
                // the order code is not available in the route
                // as long as we're inside a guard, hence we redirect
                // to the common orders page.
                return this.router.parseUrl((_a = this.semanticPathService.get('orders')) !== null && _a !== void 0 ? _a : '');
            }
            else {
                return true;
            }
        }));
    }
}
OrderCancellationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationGuard, deps: [{ token: OrderCancellationService }, { token: i1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
OrderCancellationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderCancellationService }, { type: i1.SemanticPathService }, { type: i3.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderConfirmationModule {
}
CancelOrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CancelOrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderConfirmationModule, declarations: [CancelOrderConfirmationComponent], imports: [CommonModule,
        ReactiveFormsModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule], exports: [CancelOrderConfirmationComponent] });
CancelOrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CancelOrderConfirmationComponent: {
                    component: CancelOrderConfirmationComponent,
                    guards: [AuthGuard, OrderCancellationGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderCancellationService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CancelOrderConfirmationComponent: {
                                    component: CancelOrderConfirmationComponent,
                                    guards: [AuthGuard, OrderCancellationGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderCancellationService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [CancelOrderConfirmationComponent],
                    exports: [CancelOrderConfirmationComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.globalMessageType = GlobalMessageType;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getEntries();
    }
}
CancelOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
CancelOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CancelOrderComponent, selector: "cx-cancel-order", ngImport: i0, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <cx-message\n    role=\"alert\"\n    *ngIf=\"!form.get('entries').valid && form.get('entries').touched\"\n    [text]=\"'formErrors.cxNoSelectedItemToCancel' | cxTranslate\"\n    [isVisibleCloseButton]=\"false\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n  >\n  </cx-message>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderCancelConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "component", type: i3$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i3$1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cancel-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <cx-message\n    role=\"alert\"\n    *ngIf=\"!form.get('entries').valid && form.get('entries').touched\"\n    [text]=\"'formErrors.cxNoSelectedItemToCancel' | cxTranslate\"\n    [isVisibleCloseButton]=\"false\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n  >\n  </cx-message>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderCancelConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CancelOrderModule {
}
CancelOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CancelOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderModule, declarations: [CancelOrderComponent], imports: [CommonModule,
        I18nModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule,
        MessageComponentModule], exports: [CancelOrderComponent] });
CancelOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CancelOrderComponent: {
                    component: CancelOrderComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderCancellationService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule,
        MessageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CancelOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                        FormErrorsModule,
                        MessageComponentModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CancelOrderComponent: {
                                    component: CancelOrderComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderCancellationService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [CancelOrderComponent],
                    exports: [CancelOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCancellationModule {
}
OrderCancellationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderCancellationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationModule, imports: [CancelOrderModule, CancelOrderConfirmationModule] });
OrderCancellationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationModule, imports: [CancelOrderModule, CancelOrderConfirmationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderCancellationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CancelOrderModule, CancelOrderConfirmationModule],
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
class OrderReturnService extends OrderAmendService {
    constructor(orderDetailsService, returnRequestService, routing, globalMessageService) {
        super(orderDetailsService);
        this.orderDetailsService = orderDetailsService;
        this.returnRequestService = returnRequestService;
        this.routing = routing;
        this.globalMessageService = globalMessageService;
        this.amendType = AmendOrderType.RETURN;
    }
    getEntries() {
        return this.getOrder().pipe(filter((order) => !!order.entries), map((order) => {
            var _a, _b;
            return (_b = (_a = order.entries) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry.entryNumber !== -1 &&
                entry.returnableQuantity &&
                entry.returnableQuantity > 0)) !== null && _b !== void 0 ? _b : [];
        }));
    }
    save() {
        const orderCode = this.form.value.orderCode;
        const entries = this.form.value.entries;
        const inputs = Object.keys(entries)
            .filter((entryNumber) => entries[entryNumber] > 0)
            .map((entryNumber) => ({
            orderEntryNumber: Number(entryNumber),
            quantity: entries[entryNumber],
        }));
        this.form.reset();
        this.returnRequestService.createOrderReturnRequest({
            orderCode,
            returnRequestEntryInputs: inputs,
        });
        this.returnRequestService
            .getReturnRequestSuccess()
            .pipe(first(Boolean))
            .subscribe(() => this.afterSave());
    }
    afterSave() {
        this.returnRequestService
            .getOrderReturnRequest()
            .pipe(first((r) => !!r))
            .subscribe((returnRequest) => {
            const rma = returnRequest.rma;
            this.globalMessageService.add({
                key: 'orderDetails.cancellationAndReturn.returnSuccess',
                params: { rma },
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.routing.go({
                cxRoute: 'returnRequestDetails',
                params: { rma },
            });
        });
    }
}
OrderReturnService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnService, deps: [{ token: OrderDetailsService }, { token: i1$1.OrderReturnRequestFacade }, { token: i1.RoutingService }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i1$1.OrderReturnRequestFacade }, { type: i1.RoutingService }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnGuard {
    constructor(orderAmendService, semanticPathService, router) {
        this.orderAmendService = orderAmendService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        return this.orderAmendService.getForm().pipe(map((form) => {
            var _a;
            if (!form.valid) {
                // the order code is not available in the route
                // as long as we're inside a guard, hence we redirect
                // to the common orders page.
                return this.router.parseUrl((_a = this.semanticPathService.get('orders')) !== null && _a !== void 0 ? _a : '');
            }
            else {
                return true;
            }
        }));
    }
}
OrderReturnGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnGuard, deps: [{ token: OrderReturnService }, { token: i1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrderReturnService }, { type: i1.SemanticPathService }, { type: i3.Router }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderConfirmationComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getAmendedEntries();
    }
    submit(form) {
        form.disable();
        this.orderAmendService.save();
    }
}
ReturnOrderConfirmationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderConfirmationComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
ReturnOrderConfirmationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReturnOrderConfirmationComponent, selector: "cx-return-order-confirmation", ngImport: i0, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderReturn\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "directive", type: i3$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderConfirmationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-order-confirmation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form\n  *ngIf=\"form$ | async as form\"\n  [formGroup]=\"form\"\n  (ngSubmit)=\"submit(form)\"\n>\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items\n    *ngIf=\"entries$ | async as entries\"\n    [entries]=\"entries\"\n    [isConfirmation]=\"true\"\n  >\n  </cx-amend-order-items>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderReturn\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderConfirmationModule {
}
ReturnOrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnOrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderConfirmationModule, declarations: [ReturnOrderConfirmationComponent], imports: [CommonModule,
        AmendOrderItemsModule,
        I18nModule,
        ReactiveFormsModule,
        AmendOrderActionsModule], exports: [ReturnOrderConfirmationComponent] });
ReturnOrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnOrderConfirmationComponent: {
                    component: ReturnOrderConfirmationComponent,
                    guards: [AuthGuard, OrderReturnGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderReturnService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        AmendOrderItemsModule,
        I18nModule,
        ReactiveFormsModule,
        AmendOrderActionsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AmendOrderItemsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        AmendOrderActionsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnOrderConfirmationComponent: {
                                    component: ReturnOrderConfirmationComponent,
                                    guards: [AuthGuard, OrderReturnGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderReturnService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ReturnOrderConfirmationComponent],
                    exports: [ReturnOrderConfirmationComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderComponent {
    constructor(orderAmendService) {
        this.orderAmendService = orderAmendService;
        this.form$ = this.orderAmendService
            .getForm()
            .pipe(tap((form) => (this.orderCode = form.value.orderCode)));
        this.entries$ = this.orderAmendService.getEntries();
    }
}
ReturnOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderComponent, deps: [{ token: OrderAmendService }], target: i0.ɵɵFactoryTarget.Component });
ReturnOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReturnOrderComponent, selector: "cx-return-order", ngImport: i0, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderReturnConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CancelOrReturnItemsComponent, selector: "cx-amend-order-items", inputs: ["entries", "isConfirmation"] }, { kind: "component", type: AmendOrderActionsComponent, selector: "cx-amend-order-actions", inputs: ["orderCode", "amendOrderForm", "backRoute", "forwardRoute"] }, { kind: "component", type: i3$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"form$ | async as form\">\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <cx-amend-order-items *ngIf=\"entries$ | async as entries\" [entries]=\"entries\">\n  </cx-amend-order-items>\n\n  <cx-form-errors [control]=\"form.get('entries')\"></cx-form-errors>\n\n  <ng-container *ngTemplateOutlet=\"actions\"></ng-container>\n\n  <ng-template #actions>\n    <cx-amend-order-actions\n      *ngIf=\"orderCode\"\n      [orderCode]=\"orderCode\"\n      [amendOrderForm]=\"form\"\n      backRoute=\"orderDetails\"\n      forwardRoute=\"orderReturnConfirmation\"\n    ></cx-amend-order-actions>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderAmendService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnOrderModule {
}
ReturnOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderModule, declarations: [ReturnOrderComponent], imports: [CommonModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule], exports: [ReturnOrderComponent] });
ReturnOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnOrderComponent: {
                    component: ReturnOrderComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: OrderAmendService,
                            useExisting: OrderReturnService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        AmendOrderItemsModule,
        AmendOrderActionsModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AmendOrderItemsModule,
                        AmendOrderActionsModule,
                        FormErrorsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnOrderComponent: {
                                    component: ReturnOrderComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: OrderAmendService,
                                            useExisting: OrderReturnService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [ReturnOrderComponent],
                    exports: [ReturnOrderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnModule {
}
OrderReturnModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderReturnModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnModule, imports: [ReturnOrderModule, ReturnOrderConfirmationModule] });
OrderReturnModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnModule, imports: [ReturnOrderModule, ReturnOrderConfirmationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ReturnOrderModule, ReturnOrderConfirmationModule],
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
class OrderConfirmationGuard {
    constructor(orderFacade, router, semanticPathService) {
        this.orderFacade = orderFacade;
        this.router = router;
        this.semanticPathService = semanticPathService;
    }
    canActivate() {
        return this.orderFacade.getOrderDetails().pipe(map((orderDetails) => {
            var _a;
            if (orderDetails && Object.keys(orderDetails).length !== 0) {
                return true;
            }
            else {
                return this.router.parseUrl((_a = this.semanticPathService.get('orders')) !== null && _a !== void 0 ? _a : '');
            }
        }));
    }
}
OrderConfirmationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationGuard, deps: [{ token: i1$1.OrderFacade }, { token: i3.Router }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderConfirmationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderFacade }, { type: i3.Router }, { type: i1.SemanticPathService }]; } });

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
class OrderOverviewComponent {
    constructor(translation) {
        this.translation = translation;
    }
    set setOrder(order) {
        this.order = order;
    }
    getReplenishmentCodeCardContent(orderCode) {
        return this.translation.translate('orderDetails.replenishmentId').pipe(filter(() => Boolean(orderCode)), map((textTitle) => ({
            title: textTitle,
            text: [orderCode],
        })));
    }
    getReplenishmentActiveCardContent(active) {
        return combineLatest([
            this.translation.translate('orderDetails.status'),
            this.translation.translate('orderDetails.active'),
            this.translation.translate('orderDetails.cancelled'),
        ]).pipe(map(([textTitle, textActive, textCancelled]) => ({
            title: textTitle,
            text: [active ? textActive : textCancelled],
        })));
    }
    getReplenishmentStartOnCardContent(isoDate) {
        return this.translation.translate('orderDetails.startOn').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getReplenishmentFrequencyCardContent(frequency) {
        return this.translation.translate('orderDetails.frequency').pipe(filter(() => Boolean(frequency)), map((textTitle) => ({
            title: textTitle,
            text: [frequency],
        })));
    }
    getReplenishmentNextDateCardContent(isoDate) {
        return this.translation.translate('orderDetails.nextOrderDate').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getOrderCodeCardContent(orderCode) {
        return this.translation.translate('orderDetails.orderNumber').pipe(filter(() => Boolean(orderCode)), map((textTitle) => ({
            title: textTitle,
            text: [orderCode],
        })));
    }
    getOrderCurrentDateCardContent(isoDate) {
        return this.translation.translate('orderDetails.placedOn').pipe(filter(() => Boolean(isoDate)), map((textTitle) => {
            return {
                title: textTitle,
                text: [isoDate],
            };
        }));
    }
    getOrderStatusCardContent(status) {
        return combineLatest([
            this.translation.translate('orderDetails.status'),
            this.translation.translate('orderDetails.statusDisplay_' + status),
        ]).pipe(map(([textTitle, textStatus]) => ({
            title: textTitle,
            text: [textStatus],
        })));
    }
    getPurchaseOrderNumber(poNumber) {
        return combineLatest([
            this.translation.translate('orderDetails.purchaseOrderNumber'),
            this.translation.translate('orderDetails.emptyPurchaseOrderId'),
        ]).pipe(map(([textTitle, noneTextTitle]) => ({
            title: textTitle,
            text: [poNumber ? poNumber : noneTextTitle],
        })));
    }
    getMethodOfPaymentCardContent(hasPaymentInfo) {
        return combineLatest([
            this.translation.translate('orderDetails.methodOfPayment'),
            this.translation.translate('paymentTypes.paymentType_ACCOUNT'),
            this.translation.translate('paymentTypes.paymentType_CARD'),
        ]).pipe(map(([textTitle, textAccount, textCard]) => ({
            title: textTitle,
            text: [Boolean(hasPaymentInfo) ? textCard : textAccount],
        })));
    }
    getCostCenterCardContent(costCenter) {
        return this.translation.translate('orderDetails.costCenter').pipe(filter(() => Boolean(costCenter)), map((textTitle) => {
            var _a;
            return ({
                title: textTitle,
                textBold: costCenter === null || costCenter === void 0 ? void 0 : costCenter.name,
                text: ['(' + ((_a = costCenter === null || costCenter === void 0 ? void 0 : costCenter.unit) === null || _a === void 0 ? void 0 : _a.name) + ')'],
            });
        }));
    }
    getAddressCardContent(deliveryAddress) {
        return this.translation.translate('addressCard.shipTo').pipe(filter(() => Boolean(deliveryAddress)), map((textTitle) => {
            var _a, _b;
            const formattedAddress = this.normalizeFormattedAddress((_a = deliveryAddress.formattedAddress) !== null && _a !== void 0 ? _a : '');
            return {
                title: textTitle,
                textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
                text: [formattedAddress, (_b = deliveryAddress.country) === null || _b === void 0 ? void 0 : _b.name],
            };
        }));
    }
    getDeliveryModeCardContent(deliveryMode) {
        return this.translation.translate('orderDetails.shippingMethod').pipe(filter(() => Boolean(deliveryMode)), map((textTitle) => {
            var _a, _b;
            return ({
                title: textTitle,
                textBold: deliveryMode.name,
                text: [
                    deliveryMode.description,
                    ((_a = deliveryMode.deliveryCost) === null || _a === void 0 ? void 0 : _a.formattedValue)
                        ? (_b = deliveryMode.deliveryCost) === null || _b === void 0 ? void 0 : _b.formattedValue
                        : '',
                ],
            });
        }));
    }
    getPaymentInfoCardContent(payment) {
        return combineLatest([
            this.translation.translate('paymentForm.payment'),
            this.translation.translate('paymentCard.expires', {
                month: Boolean(payment) ? payment.expiryMonth : '',
                year: Boolean(payment) ? payment.expiryYear : '',
            }),
        ]).pipe(filter(() => Boolean(payment)), map(([textTitle, textExpires]) => ({
            title: textTitle,
            textBold: payment.accountHolderName,
            text: [payment.cardNumber, textExpires],
        })));
    }
    getBillingAddressCardContent(billingAddress) {
        return this.translation.translate('paymentForm.billingAddress').pipe(filter(() => Boolean(billingAddress)), map((textTitle) => {
            var _a;
            return ({
                title: textTitle,
                textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
                text: [
                    billingAddress.formattedAddress,
                    (_a = billingAddress.country) === null || _a === void 0 ? void 0 : _a.name,
                ],
            });
        }));
    }
    normalizeFormattedAddress(formattedAddress) {
        const addresses = formattedAddress
            .split(',')
            .map((address) => address.trim());
        const newFormattedAddress = addresses.filter(Boolean).join(', ');
        return newFormattedAddress;
    }
}
OrderOverviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewComponent, deps: [{ token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderOverviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderOverviewComponent, selector: "cx-order-overview", inputs: { setOrder: ["order", "setOrder"] }, ngImport: i0, template: "<div class=\"cx-order-summary\">\n  <div class=\"container\">\n    <ng-container *ngIf=\"order.replenishmentOrderCode; else otherOrder\">\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getReplenishmentCodeCardContent(order?.replenishmentOrderCode)\n              | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getReplenishmentActiveCardContent(order?.active) | async\"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getReplenishmentStartOnCardContent(order?.firstDate | cxDate)\n              | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getReplenishmentFrequencyCardContent(\n              order?.trigger?.displayTimeTable\n            ) | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getReplenishmentNextDateCardContent(\n              order?.trigger?.activationTime | cxDate\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n    </ng-container>\n\n    <ng-template #otherOrder>\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getOrderCodeCardContent(order?.code) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getOrderCurrentDateCardContent(order?.created | cxDate) | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n        ></cx-card>\n      </div>\n    </ng-template>\n\n    <ng-container\n      *ngIf=\"order.purchaseOrderNumber || order.purchaseOrderNumber === ''\"\n    >\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getPurchaseOrderNumber(order?.purchaseOrderNumber) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getMethodOfPaymentCardContent(order.paymentInfo) | async\"\n        ></cx-card>\n\n        <ng-container *ngIf=\"order.costCenter\">\n          <cx-card\n            [content]=\"getCostCenterCardContent(order?.costCenter) | async\"\n          ></cx-card>\n        </ng-container>\n      </div>\n    </ng-container>\n\n    <div class=\"cx-summary-card\">\n      <ng-container *ngIf=\"order.deliveryAddress\">\n        <cx-card\n          [content]=\"getAddressCardContent(order?.deliveryAddress) | async\"\n        ></cx-card>\n      </ng-container>\n\n      <ng-container *ngIf=\"order.deliveryMode\">\n        <cx-card\n          [content]=\"getDeliveryModeCardContent(order?.deliveryMode) | async\"\n        ></cx-card>\n      </ng-container>\n    </div>\n\n    <ng-container *ngIf=\"order.paymentInfo\">\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getPaymentInfoCardContent(order?.paymentInfo) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getBillingAddressCardContent(order?.paymentInfo?.billingAddress)\n              | async\n          \"\n        ></cx-card>\n      </div>\n    </ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-overview', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-summary\">\n  <div class=\"container\">\n    <ng-container *ngIf=\"order.replenishmentOrderCode; else otherOrder\">\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getReplenishmentCodeCardContent(order?.replenishmentOrderCode)\n              | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getReplenishmentActiveCardContent(order?.active) | async\"\n        ></cx-card>\n      </div>\n\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"\n            getReplenishmentStartOnCardContent(order?.firstDate | cxDate)\n              | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getReplenishmentFrequencyCardContent(\n              order?.trigger?.displayTimeTable\n            ) | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getReplenishmentNextDateCardContent(\n              order?.trigger?.activationTime | cxDate\n            ) | async\n          \"\n        ></cx-card>\n      </div>\n    </ng-container>\n\n    <ng-template #otherOrder>\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getOrderCodeCardContent(order?.code) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getOrderCurrentDateCardContent(order?.created | cxDate) | async\n          \"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getOrderStatusCardContent(order.statusDisplay) | async\"\n        ></cx-card>\n      </div>\n    </ng-template>\n\n    <ng-container\n      *ngIf=\"order.purchaseOrderNumber || order.purchaseOrderNumber === ''\"\n    >\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getPurchaseOrderNumber(order?.purchaseOrderNumber) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"getMethodOfPaymentCardContent(order.paymentInfo) | async\"\n        ></cx-card>\n\n        <ng-container *ngIf=\"order.costCenter\">\n          <cx-card\n            [content]=\"getCostCenterCardContent(order?.costCenter) | async\"\n          ></cx-card>\n        </ng-container>\n      </div>\n    </ng-container>\n\n    <div class=\"cx-summary-card\">\n      <ng-container *ngIf=\"order.deliveryAddress\">\n        <cx-card\n          [content]=\"getAddressCardContent(order?.deliveryAddress) | async\"\n        ></cx-card>\n      </ng-container>\n\n      <ng-container *ngIf=\"order.deliveryMode\">\n        <cx-card\n          [content]=\"getDeliveryModeCardContent(order?.deliveryMode) | async\"\n        ></cx-card>\n      </ng-container>\n    </div>\n\n    <ng-container *ngIf=\"order.paymentInfo\">\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getPaymentInfoCardContent(order?.paymentInfo) | async\"\n        ></cx-card>\n\n        <cx-card\n          [content]=\"\n            getBillingAddressCardContent(order?.paymentInfo?.billingAddress)\n              | async\n          \"\n        ></cx-card>\n      </div>\n    </ng-container>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }]; }, propDecorators: { setOrder: [{
                type: Input,
                args: ['order']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailShippingComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailShippingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailShippingComponent, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailShippingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderDetailShippingComponent, selector: "cx-order-details-shipping", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <cx-order-overview [order]=\"order\"></cx-order-overview>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: OrderOverviewComponent, selector: "cx-order-overview", inputs: ["order"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailShippingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-shipping', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <cx-order-overview [order]=\"order\"></cx-order-overview>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderOverviewModule {
}
OrderOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, declarations: [OrderOverviewComponent], imports: [CommonModule, I18nModule, CardModule], exports: [OrderOverviewComponent] });
OrderOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, imports: [CommonModule, I18nModule, CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, CardModule],
                    declarations: [OrderOverviewComponent],
                    exports: [OrderOverviewComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationOrderEntriesContext {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.type = OrderEntriesSource.ORDER_CONFIRMATION;
    }
    getEntries() {
        return this.orderFacade
            .getOrderDetails()
            .pipe(map((order) => { var _a; return (_a = order === null || order === void 0 ? void 0 : order.entries) !== null && _a !== void 0 ? _a : []; }));
    }
}
OrderConfirmationOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationOrderEntriesContext, deps: [{ token: i1$1.OrderFacade }], target: i0.ɵɵFactoryTarget.Injectable });
OrderConfirmationOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationItemsComponent {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.cartOutlets = CartOutlets;
        this.promotionLocation = PromotionLocation.Checkout;
        this.order$ = this.orderFacade.getOrderDetails();
    }
    ngOnDestroy() {
        this.orderFacade.clearPlacedOrder();
    }
}
OrderConfirmationItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationItemsComponent, deps: [{ token: i1$1.OrderFacade }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderConfirmationItemsComponent, selector: "cx-order-confirmation-items", ngImport: i0, template: "<div class=\"cx-order-items container\" *ngIf=\"order$ | async as order\">\n  <h4 class=\"cx-order-items-header\">\n    {{ 'checkoutOrderConfirmation.orderItems' | cxTranslate }}\n  </h4>\n\n  <cx-promotions\n    [promotions]=\"order.appliedOrderPromotions || []\"\n  ></cx-promotions>\n\n  <ng-template\n    [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n    [cxOutletContext]=\"{\n      items: order.entries,\n      readonly: true,\n      promotionLocation: promotionLocation\n    }\"\n  >\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "directive", type: i3$1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-items container\" *ngIf=\"order$ | async as order\">\n  <h4 class=\"cx-order-items-header\">\n    {{ 'checkoutOrderConfirmation.orderItems' | cxTranslate }}\n  </h4>\n\n  <cx-promotions\n    [promotions]=\"order.appliedOrderPromotions || []\"\n  ></cx-promotions>\n\n  <ng-template\n    [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n    [cxOutletContext]=\"{\n      items: order.entries,\n      readonly: true,\n      promotionLocation: promotionLocation\n    }\"\n  >\n  </ng-template>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderGuestRegisterFormComponent {
    constructor(userRegisterFacade, routingService, authService, fb) {
        this.userRegisterFacade = userRegisterFacade;
        this.routingService = routingService;
        this.authService = authService;
        this.fb = fb;
        this.guestRegisterForm = this.fb.group({
            password: [
                '',
                [Validators.required, CustomFormValidators.passwordValidator],
            ],
            passwordconf: ['', Validators.required],
        }, {
            validators: CustomFormValidators.passwordsMustMatch('password', 'passwordconf'),
        });
    }
    submit() {
        if (this.guestRegisterForm.valid) {
            this.userRegisterFacade.registerGuest(this.guid, this.guestRegisterForm.value.password);
            if (!this.subscription) {
                this.subscription = this.authService
                    .isUserLoggedIn()
                    .subscribe((isLoggedIn) => {
                    if (isLoggedIn) {
                        this.routingService.go({ cxRoute: 'home' });
                    }
                });
            }
        }
        else {
            this.guestRegisterForm.markAllAsTouched();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
OrderGuestRegisterFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderGuestRegisterFormComponent, deps: [{ token: i1$2.UserRegisterFacade }, { token: i1.RoutingService }, { token: i1.AuthService }, { token: i3$2.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OrderGuestRegisterFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderGuestRegisterFormComponent, selector: "cx-guest-register-form", inputs: { guid: "guid", email: "email" }, ngImport: i0, template: "<div class=\"register-guest\">\n  <div class=\"col-md-6 col-lg-4\">\n    <h3>{{ 'checkoutOrderConfirmation.createAccount' | cxTranslate }}</h3>\n    <p>\n      {{\n        'checkoutOrderConfirmation.createAccountForNext'\n          | cxTranslate: { email: email }\n      }}\n    </p>\n\n    <form (ngSubmit)=\"submit()\" [formGroup]=\"guestRegisterForm\">\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.password.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"password\"\n            placeholder=\"{{ 'register.password.placeholder' | cxTranslate }}\"\n            formControlName=\"password\"\n            [attr.aria-label]=\"'register.password.placeholder' | cxTranslate\"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('password')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.confirmPassword.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"passwordconf\"\n            placeholder=\"{{\n              'register.confirmPassword.placeholder' | cxTranslate\n            }}\"\n            formControlName=\"passwordconf\"\n            [attr.aria-label]=\"\n              'register.confirmPassword.placeholder' | cxTranslate\n            \"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('passwordconf')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-block btn-primary\">\n        {{ 'common.submit' | cxTranslate }}\n      </button>\n    </form>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3$2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i3$1.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderGuestRegisterFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-guest-register-form', template: "<div class=\"register-guest\">\n  <div class=\"col-md-6 col-lg-4\">\n    <h3>{{ 'checkoutOrderConfirmation.createAccount' | cxTranslate }}</h3>\n    <p>\n      {{\n        'checkoutOrderConfirmation.createAccountForNext'\n          | cxTranslate: { email: email }\n      }}\n    </p>\n\n    <form (ngSubmit)=\"submit()\" [formGroup]=\"guestRegisterForm\">\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.password.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"password\"\n            placeholder=\"{{ 'register.password.placeholder' | cxTranslate }}\"\n            formControlName=\"password\"\n            [attr.aria-label]=\"'register.password.placeholder' | cxTranslate\"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('password')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <div class=\"form-group\">\n        <label>\n          <span class=\"label-content\">{{\n            'register.confirmPassword.label' | cxTranslate\n          }}</span>\n          <input\n            required=\"true\"\n            class=\"form-control\"\n            type=\"password\"\n            name=\"passwordconf\"\n            placeholder=\"{{\n              'register.confirmPassword.placeholder' | cxTranslate\n            }}\"\n            formControlName=\"passwordconf\"\n            [attr.aria-label]=\"\n              'register.confirmPassword.placeholder' | cxTranslate\n            \"\n            cxPasswordVisibilitySwitch\n          />\n          <cx-form-errors\n            [control]=\"guestRegisterForm.get('passwordconf')\"\n          ></cx-form-errors>\n        </label>\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-block btn-primary\">\n        {{ 'common.submit' | cxTranslate }}\n      </button>\n    </form>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.UserRegisterFacade }, { type: i1.RoutingService }, { type: i1.AuthService }, { type: i3$2.UntypedFormBuilder }]; }, propDecorators: { guid: [{
                type: Input
            }], email: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationThankYouMessageComponent {
    constructor(orderFacade, globalMessageService, translationService) {
        this.orderFacade = orderFacade;
        this.globalMessageService = globalMessageService;
        this.translationService = translationService;
        this.isGuestCustomer = false;
    }
    ngOnInit() {
        this.order$ = this.orderFacade.getOrderDetails().pipe(tap((order) => {
            var _a;
            this.isGuestCustomer =
                order && 'guestCustomer' in order
                    ? (_a = order.guestCustomer) !== null && _a !== void 0 ? _a : false
                    : false;
            this.orderGuid = order === null || order === void 0 ? void 0 : order.guid;
        }));
    }
    ngAfterViewInit() {
        this.addThankYouMessage();
    }
    ngOnDestroy() {
        this.orderFacade.clearPlacedOrder();
    }
    addThankYouMessage() {
        this.getThankYouAssistiveMessage()
            .pipe(take(1))
            .subscribe(([order, confirmationOfOrderMessage, thankYouMessage, invoiceHasBeenSentByEmailMessage,]) => {
            var _a;
            const code = (_a = order.replenishmentOrderCode) !== null && _a !== void 0 ? _a : order.code;
            const message = `${confirmationOfOrderMessage} ${code}. ${thankYouMessage} ${invoiceHasBeenSentByEmailMessage}`;
            this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ASSISTIVE);
        });
    }
    getThankYouAssistiveMessage() {
        const confirmationOfOrderMessage$ = this.translationService.translate('checkoutOrderConfirmation.confirmationOfOrder');
        const thankYouMessage$ = this.translationService.translate('checkoutOrderConfirmation.thankYou');
        const invoiceHasBeenSentByEmailMessage$ = this.translationService.translate('checkoutOrderConfirmation.invoiceHasBeenSentByEmail');
        return this.order$.pipe(filter((order) => !!order), withLatestFrom(confirmationOfOrderMessage$, thankYouMessage$, invoiceHasBeenSentByEmailMessage$));
    }
}
OrderConfirmationThankYouMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationThankYouMessageComponent, deps: [{ token: i1$1.OrderFacade }, { token: i1.GlobalMessageService }, { token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationThankYouMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderConfirmationThankYouMessageComponent, selector: "cx-order-confirmation-thank-you-message", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-page-header\">\n    <span class=\"cx-page-title\">\n      {{ 'checkoutOrderConfirmation.confirmationOfOrder' | cxTranslate }}\n      {{ order.replenishmentOrderCode ?? order.code }}\n    </span>\n  </div>\n\n  <div class=\"cx-order-confirmation-message\">\n    <h2>{{ 'checkoutOrderConfirmation.thankYou' | cxTranslate }}</h2>\n    <p>\n      {{ 'checkoutOrderConfirmation.invoiceHasBeenSentByEmail' | cxTranslate }}\n    </p>\n  </div>\n\n  <div *ngIf=\"isGuestCustomer\">\n    <cx-guest-register-form\n      [guid]=\"orderGuid\"\n      [email]=\"order.paymentInfo.billingAddress.email\"\n    ></cx-guest-register-form>\n  </div>\n\n  <cx-add-to-home-screen-banner></cx-add-to-home-screen-banner>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.AddToHomeScreenBannerComponent, selector: "cx-add-to-home-screen-banner" }, { kind: "component", type: OrderGuestRegisterFormComponent, selector: "cx-guest-register-form", inputs: ["guid", "email"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationThankYouMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-thank-you-message', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-page-header\">\n    <span class=\"cx-page-title\">\n      {{ 'checkoutOrderConfirmation.confirmationOfOrder' | cxTranslate }}\n      {{ order.replenishmentOrderCode ?? order.code }}\n    </span>\n  </div>\n\n  <div class=\"cx-order-confirmation-message\">\n    <h2>{{ 'checkoutOrderConfirmation.thankYou' | cxTranslate }}</h2>\n    <p>\n      {{ 'checkoutOrderConfirmation.invoiceHasBeenSentByEmail' | cxTranslate }}\n    </p>\n  </div>\n\n  <div *ngIf=\"isGuestCustomer\">\n    <cx-guest-register-form\n      [guid]=\"orderGuid\"\n      [email]=\"order.paymentInfo.billingAddress.email\"\n    ></cx-guest-register-form>\n  </div>\n\n  <cx-add-to-home-screen-banner></cx-add-to-home-screen-banner>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderFacade }, { type: i1.GlobalMessageService }, { type: i1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConfirmationTotalsComponent {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.cartOutlets = CartOutlets;
        this.order$ = this.orderFacade.getOrderDetails();
    }
    ngOnDestroy() {
        this.orderFacade.clearPlacedOrder();
    }
}
OrderConfirmationTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationTotalsComponent, deps: [{ token: i1$1.OrderFacade }], target: i0.ɵɵFactoryTarget.Component });
OrderConfirmationTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderConfirmationTotalsComponent, selector: "cx-order-confirmation-totals", ngImport: i0, template: "<div class=\"cx-order-summary container\" *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-confirmation-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-summary container\" *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const orderConfirmationComponents = [
    OrderConfirmationItemsComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
    OrderGuestRegisterFormComponent,
];
class OrderConfirmationModule {
}
OrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, declarations: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OrderOverviewModule,
        OutletModule,
        PasswordVisibilityToggleModule], exports: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent] });
OrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderConfirmationThankMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationOverviewComponent: {
                    component: OrderDetailShippingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationOverviewComponent: {
                    component: OrderDetailShippingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
            },
        }),
        {
            provide: OrderConfirmationOrderEntriesContextToken,
            useExisting: OrderConfirmationOrderEntriesContext,
        },
    ], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OrderOverviewModule,
        OutletModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        PwaModule,
                        PromotionsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        OrderOverviewModule,
                        OutletModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderConfirmationThankMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationOverviewComponent: {
                                    component: OrderDetailShippingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationOverviewComponent: {
                                    component: OrderDetailShippingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                            },
                        }),
                        {
                            provide: OrderConfirmationOrderEntriesContextToken,
                            useExisting: OrderConfirmationOrderEntriesContext,
                        },
                    ],
                    declarations: [...orderConfirmationComponents],
                    exports: [...orderConfirmationComponents],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailActionsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailActionsComponent, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderDetailActionsComponent, selector: "cx-order-details-actions", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n        class=\"btn btn-block btn-action\"\n      >\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <a\n        *ngIf=\"order.cancellable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderCancel',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-action\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.cancelAction' | cxTranslate }}\n      </a>\n\n      <a\n        *ngIf=\"order.returnable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderReturn',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-action\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.returnAction' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-actions', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n        class=\"btn btn-block btn-action\"\n      >\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <a\n        *ngIf=\"order.cancellable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderCancel',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-action\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.cancelAction' | cxTranslate }}\n      </a>\n\n      <a\n        *ngIf=\"order.returnable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderReturn',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-action\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.returnAction' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConsignmentTrackingComponent {
    constructor(orderHistoryFacade, launchDialogService, vcr) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.consignmentStatus = [
            'SHIPPED',
            'IN_TRANSIT',
            'DELIVERY_COMPLETED',
            'DELIVERY_REJECTED',
            'DELIVERING',
        ];
    }
    ngOnInit() {
        this.consignmentTracking$ =
            this.orderHistoryFacade.getConsignmentTracking();
    }
    openTrackingDialog(consignment) {
        if (consignment.code) {
            this.orderHistoryFacade.loadConsignmentTracking(this.orderCode, consignment.code);
        }
        let modalInstanceData = {
            tracking$: this.consignmentTracking$,
            shipDate: consignment.statusDate,
        };
        const dialog = this.launchDialogService.openDialog("CONSIGNMENT_TRACKING" /* LAUNCH_CALLER.CONSIGNMENT_TRACKING */, this.element, this.vcr, modalInstanceData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearConsignmentTracking();
    }
}
ConsignmentTrackingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsignmentTrackingComponent, deps: [{ token: i1$1.OrderHistoryFacade }, { token: i3$1.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ConsignmentTrackingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConsignmentTrackingComponent, selector: "cx-consignment-tracking", inputs: { consignment: "consignment", orderCode: "orderCode" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-action btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsignmentTrackingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-consignment-tracking', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-action btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderHistoryFacade }, { type: i3$1.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }], consignment: [{
                type: Input
            }], orderCode: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class TrackingEventsComponent {
    constructor(orderHistoryFacade, launchDialogService, el) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.subscription = new Subscription();
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe((data) => {
            this.init(data.tracking$, data.shipDate);
        }));
    }
    ngOnDestroy() {
        var _a;
        this.orderHistoryFacade.clearConsignmentTracking();
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    init(tracking$, shipDate) {
        this.tracking$ = tracking$;
        this.shipDate = shipDate;
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
}
TrackingEventsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TrackingEventsComponent, deps: [{ token: i1$1.OrderHistoryFacade }, { token: i3$1.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TrackingEventsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: TrackingEventsComponent, selector: "cx-tracking-events", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  class=\"cx-consignment-tracking-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n>\n  <div class=\"cx-consignment-tracking-container\">\n    <ng-container\n      *ngIf=\"tracking$ | async as consignmentTracking; else loading\"\n    >\n      <!-- Modal Header -->\n      <div class=\"cx-modal-header\">\n        <div class=\"cx-consignment-tracking-title modal-title\">\n          {{ 'orderDetails.consignmentTracking.dialog.header' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"close('Cross click')\"\n        >\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <!-- Modal Body -->\n      <!-- shipment header -->\n      <ng-container\n        *ngIf=\"\n          consignmentTracking?.carrierDetails &&\n            consignmentTracking?.trackingID;\n          else noTracking\n        \"\n      >\n        <div class=\"cx-shipment-heading\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.shipped'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ shipDate | cxDate: 'medium' }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.estimate'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.targetArrivalDate | cxDate: 'medium' }}\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.carrier'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.carrierDetails?.name }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.trackingId'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                <ng-container *ngIf=\"consignmentTracking?.trackingUrl\">\n                  <a\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    [href]=\"consignmentTracking.trackingUrl\"\n                    >{{ consignmentTracking?.trackingID }}</a\n                  >\n                </ng-container>\n                <ng-container *ngIf=\"!consignmentTracking?.trackingUrl\">\n                  <label>\n                    {{ consignmentTracking?.trackingID }}\n                  </label>\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- tracking events -->\n      <div class=\"cx-tracking-events modal-body\">\n        <ng-container\n          *ngFor=\"let consignmentEvent of consignmentTracking.trackingEvents\"\n        >\n          <div class=\"cx-tracking-event-body\">\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.eventDate | cxDate: 'medium' }}\n            </div>\n            <div class=\"cx-tracking-event-title\">\n              {{ consignmentEvent.referenceCode }}\n            </div>\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.detail }}\n            </div>\n            <div class=\"cx-tracking-event-city\">\n              location: {{ consignmentEvent.location }}\n            </div>\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>\n\n    <ng-template #noTracking>\n      <div class=\"cx-no-tracking-heading\">\n        <div class=\"cx-shipment-content\">\n          {{\n            'orderDetails.consignmentTracking.dialog.noTracking' | cxTranslate\n          }}\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #loading>\n      <div class=\"cx-tracking-loading\">\n        <div class=\"header modal-header\">\n          <div class=\"title modal-title\">\n            {{\n              'orderDetails.consignmentTracking.dialog.loadingHeader'\n                | cxTranslate\n            }}\n          </div>\n          <button\n            type=\"button\"\n            class=\"close btn-dismiss\"\n            [attr.aria-label]=\"'common.close' | cxTranslate\"\n            (click)=\"close('Cross click')\"\n          >\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <!-- Modal Body -->\n        <div class=\"body modal-body\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <cx-spinner></cx-spinner>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i3$1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TrackingEventsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-tracking-events', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"cx-consignment-tracking-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n>\n  <div class=\"cx-consignment-tracking-container\">\n    <ng-container\n      *ngIf=\"tracking$ | async as consignmentTracking; else loading\"\n    >\n      <!-- Modal Header -->\n      <div class=\"cx-modal-header\">\n        <div class=\"cx-consignment-tracking-title modal-title\">\n          {{ 'orderDetails.consignmentTracking.dialog.header' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"close('Cross click')\"\n        >\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <!-- Modal Body -->\n      <!-- shipment header -->\n      <ng-container\n        *ngIf=\"\n          consignmentTracking?.carrierDetails &&\n            consignmentTracking?.trackingID;\n          else noTracking\n        \"\n      >\n        <div class=\"cx-shipment-heading\">\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.shipped'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ shipDate | cxDate: 'medium' }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.estimate'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.targetArrivalDate | cxDate: 'medium' }}\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.carrier'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                {{ consignmentTracking?.carrierDetails?.name }}\n              </div>\n            </div>\n            <div class=\"col-sm-12 col-md-6\">\n              <div class=\"cx-shipment-title\">\n                {{\n                  'orderDetails.consignmentTracking.dialog.trackingId'\n                    | cxTranslate\n                }}\n              </div>\n              <div class=\"cx-shipment-content\">\n                <ng-container *ngIf=\"consignmentTracking?.trackingUrl\">\n                  <a\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    [href]=\"consignmentTracking.trackingUrl\"\n                    >{{ consignmentTracking?.trackingID }}</a\n                  >\n                </ng-container>\n                <ng-container *ngIf=\"!consignmentTracking?.trackingUrl\">\n                  <label>\n                    {{ consignmentTracking?.trackingID }}\n                  </label>\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- tracking events -->\n      <div class=\"cx-tracking-events modal-body\">\n        <ng-container\n          *ngFor=\"let consignmentEvent of consignmentTracking.trackingEvents\"\n        >\n          <div class=\"cx-tracking-event-body\">\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.eventDate | cxDate: 'medium' }}\n            </div>\n            <div class=\"cx-tracking-event-title\">\n              {{ consignmentEvent.referenceCode }}\n            </div>\n            <div class=\"cx-tracking-event-content\">\n              {{ consignmentEvent.detail }}\n            </div>\n            <div class=\"cx-tracking-event-city\">\n              location: {{ consignmentEvent.location }}\n            </div>\n          </div>\n        </ng-container>\n      </div>\n    </ng-container>\n\n    <ng-template #noTracking>\n      <div class=\"cx-no-tracking-heading\">\n        <div class=\"cx-shipment-content\">\n          {{\n            'orderDetails.consignmentTracking.dialog.noTracking' | cxTranslate\n          }}\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #loading>\n      <div class=\"cx-tracking-loading\">\n        <div class=\"header modal-header\">\n          <div class=\"title modal-title\">\n            {{\n              'orderDetails.consignmentTracking.dialog.loadingHeader'\n                | cxTranslate\n            }}\n          </div>\n          <button\n            type=\"button\"\n            class=\"close btn-dismiss\"\n            [attr.aria-label]=\"'common.close' | cxTranslate\"\n            (click)=\"close('Cross click')\"\n          >\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <!-- Modal Body -->\n        <div class=\"body modal-body\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <cx-spinner></cx-spinner>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderHistoryFacade }, { type: i3$1.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConsignmentTrackingLayoutConfig = {
    launch: {
        CONSIGNMENT_TRACKING: {
            inlineRoot: true,
            component: TrackingEventsComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConsignedEntriesComponent {
    constructor() {
        this.promotionLocation = PromotionLocation.Order;
        this.CartOutlets = CartOutlets;
    }
    getConsignmentProducts(consignment) {
        var _a;
        const products = [];
        (_a = consignment.entries) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
            if (element.orderEntry) {
                products.push(element.orderEntry);
            }
        });
        return products;
    }
}
OrderConsignedEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConsignedEntriesComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
OrderConsignedEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderConsignedEntriesComponent, selector: "cx-order-consigned-entries", inputs: { consignments: "consignments", order: "order", enableAddToCart: "enableAddToCart", buyItAgainTranslation: "buyItAgainTranslation" }, ngImport: i0, template: "<div *ngFor=\"let consignment of consignments\" class=\"cx-list row\">\n  <div class=\"cx-list-header col-12\">\n    <div class=\"cx-list-status\">\n      <span *ngIf=\"consignment\">\n        {{ 'orderDetails.deliveryStatus_' + consignment?.status | cxTranslate }}\n      </span>\n    </div>\n    <div *ngIf=\"consignment?.statusDate\" class=\"cx-list-date\">\n      <div>{{ consignment?.statusDate | cxDate }}</div>\n    </div>\n\n    <cx-consignment-tracking\n      [orderCode]=\"order.code\"\n      [consignment]=\"consignment\"\n      *cxFeature=\"'consignmentTracking'\"\n    >\n    </cx-consignment-tracking>\n  </div>\n  <div class=\"cx-list-item col-12\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n      [cxOutletContext]=\"{\n        items: consignment.entries,\n        readonly: true,\n        promotionLocation: promotionLocation,\n        options: {\n          displayAddToCart: enableAddToCart,\n          addToCartString: buyItAgainTranslation,\n          optionalBtn: addToCartBtn\n        }\n      }\"\n    >\n    </ng-template>\n  </div>\n</div>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    class=\"add-to-cart\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[cxFeature]", inputs: ["cxFeature"] }, { kind: "directive", type: i3$1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "component", type: i4.AddToCartComponent, selector: "cx-add-to-cart", inputs: ["productCode", "showQuantity", "options", "product"] }, { kind: "component", type: ConsignmentTrackingComponent, selector: "cx-consignment-tracking", inputs: ["consignment", "orderCode"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderConsignedEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-consigned-entries', template: "<div *ngFor=\"let consignment of consignments\" class=\"cx-list row\">\n  <div class=\"cx-list-header col-12\">\n    <div class=\"cx-list-status\">\n      <span *ngIf=\"consignment\">\n        {{ 'orderDetails.deliveryStatus_' + consignment?.status | cxTranslate }}\n      </span>\n    </div>\n    <div *ngIf=\"consignment?.statusDate\" class=\"cx-list-date\">\n      <div>{{ consignment?.statusDate | cxDate }}</div>\n    </div>\n\n    <cx-consignment-tracking\n      [orderCode]=\"order.code\"\n      [consignment]=\"consignment\"\n      *cxFeature=\"'consignmentTracking'\"\n    >\n    </cx-consignment-tracking>\n  </div>\n  <div class=\"cx-list-item col-12\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n      [cxOutletContext]=\"{\n        items: consignment.entries,\n        readonly: true,\n        promotionLocation: promotionLocation,\n        options: {\n          displayAddToCart: enableAddToCart,\n          addToCartString: buyItAgainTranslation,\n          optionalBtn: addToCartBtn\n        }\n      }\"\n    >\n    </ng-template>\n  </div>\n</div>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    class=\"add-to-cart\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n" }]
        }], propDecorators: { consignments: [{
                type: Input
            }], order: [{
                type: Input
            }], enableAddToCart: [{
                type: Input
            }], buyItAgainTranslation: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const completedValues = ['DELIVERY_COMPLETED', 'PICKUP_COMPLETE'];
const cancelledValues = ['CANCELLED'];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailItemsComponent {
    constructor(orderDetailsService, component, translation) {
        this.orderDetailsService = orderDetailsService;
        this.component = component;
        this.translation = translation;
        this.CartOutlets = CartOutlets;
        this.promotionLocation = PromotionLocation.Order;
        this.order$ = this.orderDetailsService.getOrderDetails();
        this.enableAddToCart$ = this.component.data$.pipe(map((data) => data.enableAddToCart));
    }
    ngOnInit() {
        this.others$ = this.getOtherStatus(...completedValues, ...cancelledValues);
        this.completed$ = this.getExactStatus(completedValues);
        this.cancel$ = this.getExactStatus(cancelledValues);
        this.buyItAgainTranslation$ = this.translation.translate('addToCart.buyItAgain');
    }
    getExactStatus(consignmentStatus) {
        return this.order$.pipe(map((order) => {
            var _a;
            if (Boolean(order.consignments)) {
                return (_a = order.consignments) === null || _a === void 0 ? void 0 : _a.filter((consignment) => consignment.status &&
                    consignmentStatus.includes(consignment.status));
            }
        }));
    }
    getOtherStatus(...consignmentStatus) {
        return this.order$.pipe(map((order) => {
            var _a;
            if (Boolean(order.consignments)) {
                return (_a = order.consignments) === null || _a === void 0 ? void 0 : _a.filter((consignment) => consignment.status &&
                    !consignmentStatus.includes(consignment.status));
            }
        }));
    }
}
OrderDetailItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailItemsComponent, deps: [{ token: OrderDetailsService }, { token: i3$1.CmsComponentData }, { token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderDetailItemsComponent, selector: "cx-order-details-items", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container\n    *ngIf=\"\n      order.consignments?.length ||\n      order.unconsignedEntries?.length ||\n      order.replenishmentOrderCode\n    \"\n  >\n    <cx-promotions\n      [promotions]=\"order.appliedOrderPromotions || []\"\n    ></cx-promotions>\n  </ng-container>\n\n  <!-- consigned entries -->\n  <ng-container *ngIf=\"order.consignments?.length\">\n    <cx-order-consigned-entries\n      *ngIf=\"others$ | async as others\"\n      [order]=\"order\"\n      [consignments]=\"others\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"buyItAgainTranslation$ | async\"\n    ></cx-order-consigned-entries>\n\n    <cx-order-consigned-entries\n      *ngIf=\"completed$ | async as completed\"\n      [order]=\"order\"\n      [consignments]=\"completed\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"buyItAgainTranslation$ | async\"\n    ></cx-order-consigned-entries>\n\n    <cx-order-consigned-entries\n      *ngIf=\"cancel$ | async as cancel\"\n      [order]=\"order\"\n      [consignments]=\"cancel\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"buyItAgainTranslation$ | async\"\n    ></cx-order-consigned-entries>\n  </ng-container>\n\n  <!-- unconsigned entries OR any entries -->\n  <ng-container\n    *ngIf=\"\n      order?.unconsignedEntries?.length ||\n      (order?.entries && order?.replenishmentOrderCode)\n    \"\n  >\n    <div class=\"cx-list row\">\n      <div *ngIf=\"order?.statusDisplay\" class=\"cx-list-header col-12\">\n        <div class=\"cx-list-status\">\n          {{\n            'orderDetails.statusDisplay_' + order?.statusDisplay | cxTranslate\n          }}\n        </div>\n      </div>\n      <div class=\"cx-list-item col-12\">\n        <ng-template\n          [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n          [cxOutletContext]=\"{\n            items: order?.unconsignedEntries\n              ? order.unconsignedEntries\n              : order.entries,\n            readonly: true,\n            promotionLocation: promotionLocation,\n            options: {\n              displayAddToCart: enableAddToCart$ | async,\n              addToCartString: (buyItAgainTranslation$ | async),\n              optionalBtn: addToCartBtn\n            }\n          }\"\n        >\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    class=\"add-to-cart\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "directive", type: i3$1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "component", type: i4.AddToCartComponent, selector: "cx-add-to-cart", inputs: ["productCode", "showQuantity", "options", "product"] }, { kind: "component", type: OrderConsignedEntriesComponent, selector: "cx-order-consigned-entries", inputs: ["consignments", "order", "enableAddToCart", "buyItAgainTranslation"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-items', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <ng-container\n    *ngIf=\"\n      order.consignments?.length ||\n      order.unconsignedEntries?.length ||\n      order.replenishmentOrderCode\n    \"\n  >\n    <cx-promotions\n      [promotions]=\"order.appliedOrderPromotions || []\"\n    ></cx-promotions>\n  </ng-container>\n\n  <!-- consigned entries -->\n  <ng-container *ngIf=\"order.consignments?.length\">\n    <cx-order-consigned-entries\n      *ngIf=\"others$ | async as others\"\n      [order]=\"order\"\n      [consignments]=\"others\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"buyItAgainTranslation$ | async\"\n    ></cx-order-consigned-entries>\n\n    <cx-order-consigned-entries\n      *ngIf=\"completed$ | async as completed\"\n      [order]=\"order\"\n      [consignments]=\"completed\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"buyItAgainTranslation$ | async\"\n    ></cx-order-consigned-entries>\n\n    <cx-order-consigned-entries\n      *ngIf=\"cancel$ | async as cancel\"\n      [order]=\"order\"\n      [consignments]=\"cancel\"\n      [enableAddToCart]=\"enableAddToCart$ | async\"\n      [buyItAgainTranslation]=\"buyItAgainTranslation$ | async\"\n    ></cx-order-consigned-entries>\n  </ng-container>\n\n  <!-- unconsigned entries OR any entries -->\n  <ng-container\n    *ngIf=\"\n      order?.unconsignedEntries?.length ||\n      (order?.entries && order?.replenishmentOrderCode)\n    \"\n  >\n    <div class=\"cx-list row\">\n      <div *ngIf=\"order?.statusDisplay\" class=\"cx-list-header col-12\">\n        <div class=\"cx-list-status\">\n          {{\n            'orderDetails.statusDisplay_' + order?.statusDisplay | cxTranslate\n          }}\n        </div>\n      </div>\n      <div class=\"cx-list-item col-12\">\n        <ng-template\n          [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n          [cxOutletContext]=\"{\n            items: order?.unconsignedEntries\n              ? order.unconsignedEntries\n              : order.entries,\n            readonly: true,\n            promotionLocation: promotionLocation,\n            options: {\n              displayAddToCart: enableAddToCart$ | async,\n              addToCartString: (buyItAgainTranslation$ | async),\n              optionalBtn: addToCartBtn\n            }\n          }\"\n        >\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    class=\"add-to-cart\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }, { type: i3$1.CmsComponentData }, { type: i1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailTotalsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.CartOutlets = CartOutlets;
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailTotalsComponent, deps: [{ token: OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderDetailTotalsComponent, selector: "cx-order-details-totals", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-totals', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: OrderDetailsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const moduleComponents$1 = [
    OrderDetailActionsComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailShippingComponent,
    TrackingEventsComponent,
    ConsignmentTrackingComponent,
    OrderConsignedEntriesComponent,
];
class OrderDetailsModule {
}
OrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, declarations: [OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailShippingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        OrderOverviewModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule], exports: [OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailShippingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent] });
OrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderDetailsActionsComponent: {
                    component: OrderDetailActionsComponent,
                },
                AccountOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    data: {
                        enableAddToCart: true,
                    },
                },
                AccountOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                },
                AccountOrderDetailsShippingComponent: {
                    component: OrderDetailShippingComponent,
                },
            },
            features: {
                consignmentTracking: '1.2',
            },
        }),
        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        OrderOverviewModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        PromotionsModule,
                        OrderOverviewModule,
                        UrlModule,
                        SpinnerModule,
                        RouterModule,
                        OutletModule,
                        AddToCartModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderDetailsActionsComponent: {
                                    component: OrderDetailActionsComponent,
                                },
                                AccountOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    data: {
                                        enableAddToCart: true,
                                    },
                                },
                                AccountOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                },
                                AccountOrderDetailsShippingComponent: {
                                    component: OrderDetailShippingComponent,
                                },
                            },
                            features: {
                                consignmentTracking: '1.2',
                            },
                        }),
                        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
                    ],
                    declarations: [...moduleComponents$1],
                    exports: [...moduleComponents$1],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderHistoryComponent {
    constructor(routing, orderHistoryFacade, translation, replenishmentOrderHistoryFacade) {
        this.routing = routing;
        this.orderHistoryFacade = orderHistoryFacade;
        this.translation = translation;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.PAGE_SIZE = 5;
        this.orders$ = this.orderHistoryFacade
            .getOrderHistoryList(this.PAGE_SIZE)
            .pipe(tap((orders) => {
            var _a;
            if ((_a = orders === null || orders === void 0 ? void 0 : orders.pagination) === null || _a === void 0 ? void 0 : _a.sort) {
                this.sortType = orders.pagination.sort;
            }
        }));
        this.hasReplenishmentOrder$ = this.replenishmentOrderHistoryFacade
            .getReplenishmentOrderDetails()
            .pipe(map((order) => order && Object.keys(order).length !== 0));
        this.isLoaded$ = this.orderHistoryFacade.getOrderHistoryListLoaded();
        /**
         * When "Order Return" feature is enabled, this component becomes one tab in
         * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
         */
        this.tabTitleParam$ = this.orders$.pipe(map((order) => { var _a; return (_a = order === null || order === void 0 ? void 0 : order.pagination) === null || _a === void 0 ? void 0 : _a.totalResults; }), filter(isNotUndefined), take(1));
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearOrderList();
    }
    changeSortCode(sortCode) {
        const event = {
            sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchOrders(event);
    }
    pageChange(page) {
        const event = {
            sortCode: this.sortType,
            currentPage: page,
        };
        this.fetchOrders(event);
    }
    goToOrderDetail(order) {
        this.routing.go({
            cxRoute: 'orderDetails',
            params: order,
        });
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.orderNumber'),
        ]).pipe(map(([textByDate, textByOrderNumber]) => {
            return {
                byDate: textByDate,
                byOrderNumber: textByOrderNumber,
            };
        }));
    }
    fetchOrders(event) {
        this.orderHistoryFacade.loadOrderList(this.PAGE_SIZE, event.currentPage, event.sortCode);
    }
}
OrderHistoryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryComponent, deps: [{ token: i1.RoutingService }, { token: i1$1.OrderHistoryFacade }, { token: i1.TranslationService }, { token: i1$1.ReplenishmentOrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Component });
OrderHistoryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderHistoryComponent, selector: "cx-order-history", ngImport: i0, template: "<ng-container\n  *ngIf=\"{\n    orderHistory: orders$ | async,\n    replenishmentOrder: hasReplenishmentOrder$ | async\n  } as type\"\n>\n  <ng-container *ngIf=\"type.orderHistory\">\n    <div>\n      <!-- HEADER -->\n      <div\n        [ngClass]=\"\n          type.replenishmentOrder\n            ? 'cx-replenishment-details-order-history-header'\n            : 'cx-order-history-header'\n        \"\n      >\n        <h4 *ngIf=\"type.replenishmentOrder\">\n          {{ 'orderHistory.replenishmentHistory' | cxTranslate }}\n        </h4>\n        <h2 *ngIf=\"!type.replenishmentOrder\">\n          {{ 'orderHistory.orderHistory' | cxTranslate }}\n        </h2>\n      </div>\n\n      <!-- BODY -->\n      <div class=\"cx-order-history-body\">\n        <ng-container\n          *ngIf=\"type.orderHistory.pagination.totalResults > 0; else noOrder\"\n        >\n          <!-- Select Form and Pagination Top -->\n          <div class=\"cx-order-history-sort top\">\n            <label class=\"cx-order-history-form-group form-group\"\n              ><span>\n                {{ 'orderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"type.orderHistory.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"type.orderHistory.pagination.sort\"\n                placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n          <!-- TABLE -->\n          <table id=\"order-history-table\" class=\"table cx-order-history-table\">\n            <thead class=\"cx-order-history-thead-mobile\">\n              <th scope=\"col\">\n                {{ 'orderHistory.orderId' | cxTranslate }}\n              </th>\n              <th scope=\"col\">{{ 'orderHistory.date' | cxTranslate }}</th>\n              <th scope=\"col\">\n                {{ 'orderHistory.status' | cxTranslate }}\n              </th>\n              <th scope=\"col\">{{ 'orderHistory.total' | cxTranslate }}</th>\n            </thead>\n            <tbody>\n              <tr\n                *ngFor=\"let order of type.orderHistory.orders\"\n                (click)=\"goToOrderDetail(order)\"\n              >\n                <td class=\"cx-order-history-code\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.orderId' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.code }}</a\n                  >\n                </td>\n                <td class=\"cx-order-history-placed\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.date' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                    >{{ order?.placed | cxDate: 'longDate' }}</a\n                  >\n                </td>\n                <td class=\"cx-order-history-status\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.status' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{\n                      'orderDetails.statusDisplay_' + order?.statusDisplay\n                        | cxTranslate\n                    }}</a\n                  >\n                </td>\n                <td class=\"cx-order-history-total\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.total' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.total.formattedValue }}</a\n                  >\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <!-- Select Form and Pagination Bottom -->\n          <div class=\"cx-order-history-sort bottom\">\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- NO ORDER CONTAINER -->\n        <ng-template #noOrder>\n          <div\n            *ngIf=\"isLoaded$ | async\"\n            [ngClass]=\"\n              type.replenishmentOrder\n                ? 'cx-replenishment-details-order-history-no-order'\n                : 'cx-order-history-no-order'\n            \"\n          >\n            <div>\n              <ng-container *ngIf=\"type.replenishmentOrder; else otherOrder\">\n                <div>{{ 'orderHistory.notFound' | cxTranslate }}</div>\n              </ng-container>\n\n              <ng-template #otherOrder>\n                <div>{{ 'orderHistory.noOrders' | cxTranslate }}</div>\n                <a\n                  [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n                  routerLinkActive=\"active\"\n                  class=\"btn btn-primary btn-block\"\n                  >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n                >\n              </ng-template>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i3$1.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3$1.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-history', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container\n  *ngIf=\"{\n    orderHistory: orders$ | async,\n    replenishmentOrder: hasReplenishmentOrder$ | async\n  } as type\"\n>\n  <ng-container *ngIf=\"type.orderHistory\">\n    <div>\n      <!-- HEADER -->\n      <div\n        [ngClass]=\"\n          type.replenishmentOrder\n            ? 'cx-replenishment-details-order-history-header'\n            : 'cx-order-history-header'\n        \"\n      >\n        <h4 *ngIf=\"type.replenishmentOrder\">\n          {{ 'orderHistory.replenishmentHistory' | cxTranslate }}\n        </h4>\n        <h2 *ngIf=\"!type.replenishmentOrder\">\n          {{ 'orderHistory.orderHistory' | cxTranslate }}\n        </h2>\n      </div>\n\n      <!-- BODY -->\n      <div class=\"cx-order-history-body\">\n        <ng-container\n          *ngIf=\"type.orderHistory.pagination.totalResults > 0; else noOrder\"\n        >\n          <!-- Select Form and Pagination Top -->\n          <div class=\"cx-order-history-sort top\">\n            <label class=\"cx-order-history-form-group form-group\"\n              ><span>\n                {{ 'orderHistory.sortBy' | cxTranslate }}\n              </span>\n              <cx-sorting\n                [sortOptions]=\"type.orderHistory.sorts\"\n                [sortLabels]=\"getSortLabels() | async\"\n                (sortListEvent)=\"changeSortCode($event)\"\n                [selectedOption]=\"type.orderHistory.pagination.sort\"\n                placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n                [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n                ariaControls=\"order-history-table\"\n              ></cx-sorting>\n            </label>\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n          <!-- TABLE -->\n          <table id=\"order-history-table\" class=\"table cx-order-history-table\">\n            <thead class=\"cx-order-history-thead-mobile\">\n              <th scope=\"col\">\n                {{ 'orderHistory.orderId' | cxTranslate }}\n              </th>\n              <th scope=\"col\">{{ 'orderHistory.date' | cxTranslate }}</th>\n              <th scope=\"col\">\n                {{ 'orderHistory.status' | cxTranslate }}\n              </th>\n              <th scope=\"col\">{{ 'orderHistory.total' | cxTranslate }}</th>\n            </thead>\n            <tbody>\n              <tr\n                *ngFor=\"let order of type.orderHistory.orders\"\n                (click)=\"goToOrderDetail(order)\"\n              >\n                <td class=\"cx-order-history-code\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.orderId' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.code }}</a\n                  >\n                </td>\n                <td class=\"cx-order-history-placed\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.date' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                    >{{ order?.placed | cxDate: 'longDate' }}</a\n                  >\n                </td>\n                <td class=\"cx-order-history-status\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.status' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{\n                      'orderDetails.statusDisplay_' + order?.statusDisplay\n                        | cxTranslate\n                    }}</a\n                  >\n                </td>\n                <td class=\"cx-order-history-total\">\n                  <div class=\"cx-order-history-label\">\n                    {{ 'orderHistory.total' | cxTranslate }}\n                  </div>\n                  <a\n                    [routerLink]=\"\n                      {\n                        cxRoute: 'orderDetails',\n                        params: order\n                      } | cxUrl\n                    \"\n                    class=\"cx-order-history-value\"\n                  >\n                    {{ order?.total.formattedValue }}</a\n                  >\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <!-- Select Form and Pagination Bottom -->\n          <div class=\"cx-order-history-sort bottom\">\n            <div\n              *ngIf=\"type.orderHistory.pagination.totalPages > 1\"\n              class=\"cx-order-history-pagination\"\n            >\n              <cx-pagination\n                [pagination]=\"type.orderHistory.pagination\"\n                (viewPageEvent)=\"pageChange($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- NO ORDER CONTAINER -->\n        <ng-template #noOrder>\n          <div\n            *ngIf=\"isLoaded$ | async\"\n            [ngClass]=\"\n              type.replenishmentOrder\n                ? 'cx-replenishment-details-order-history-no-order'\n                : 'cx-order-history-no-order'\n            \"\n          >\n            <div>\n              <ng-container *ngIf=\"type.replenishmentOrder; else otherOrder\">\n                <div>{{ 'orderHistory.notFound' | cxTranslate }}</div>\n              </ng-container>\n\n              <ng-template #otherOrder>\n                <div>{{ 'orderHistory.noOrders' | cxTranslate }}</div>\n                <a\n                  [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n                  routerLinkActive=\"active\"\n                  class=\"btn btn-primary btn-block\"\n                  >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n                >\n              </ng-template>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1$1.OrderHistoryFacade }, { type: i1.TranslationService }, { type: i1$1.ReplenishmentOrderHistoryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderHistoryModule {
}
OrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, declarations: [OrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [OrderHistoryComponent] });
OrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        NgSelectModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    declarations: [OrderHistoryComponent],
                    exports: [OrderHistoryComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                    guards: [AuthGuard],
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
class OrderDetailsOrderEntriesContext {
    constructor(orderHistoryFacade) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.type = OrderEntriesSource.ORDER_DETAILS;
    }
    getEntries() {
        return this.orderHistoryFacade
            .getOrderDetails()
            .pipe(map((order) => { var _a; return (_a = order === null || order === void 0 ? void 0 : order.entries) !== null && _a !== void 0 ? _a : []; }));
    }
}
OrderDetailsOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsOrderEntriesContext, deps: [{ token: i1$1.OrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailsOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderHistoryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderCancellationDialogComponent {
    constructor(replenishmentOrderHistoryFacade, globalMessageService, launchDialogService, el) {
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.globalMessageService = globalMessageService;
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.subscription = new Subscription();
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    ngOnInit() {
        this.subscription.add(combineLatest([
            this.replenishmentOrderHistoryFacade
                .getReplenishmentOrderDetails()
                .pipe(startWith(null)),
            this.launchDialogService.data$,
        ]).subscribe(([replenishmentOrder, code]) => {
            this.replenishmentOrderCode =
                code || (replenishmentOrder === null || replenishmentOrder === void 0 ? void 0 : replenishmentOrder.replenishmentOrderCode);
        }));
        this.subscription.add(this.replenishmentOrderHistoryFacade
            .getCancelReplenishmentOrderSuccess()
            .subscribe((value) => this.onSuccess(value)));
    }
    onSuccess(value) {
        if (value) {
            this.launchDialogService.closeDialog('Successffully cancelled replenishment');
            this.globalMessageService.add({
                key: 'orderDetails.cancelReplenishment.cancelSuccess',
                params: {
                    replenishmentOrderCode: this.replenishmentOrderCode,
                },
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
        this.replenishmentOrderHistoryFacade.clearCancelReplenishmentOrderProcessState();
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    cancelReplenishment() {
        this.replenishmentOrderHistoryFacade.cancelReplenishmentOrder(this.replenishmentOrderCode);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ReplenishmentOrderCancellationDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogComponent, deps: [{ token: i1$1.ReplenishmentOrderHistoryFacade }, { token: i1.GlobalMessageService }, { token: i3$1.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ReplenishmentOrderCancellationDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReplenishmentOrderCancellationDialogComponent, selector: "cx-replenishment-order-cancellation-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-cancel-replenishment-dialog-foreground\"\n>\n  <div class=\"cx-cancel-replenishment-dialog-content\">\n    <div class=\"cx-cancel-replenishment-dialog-header\">\n      <h3>\n        {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n      </h3>\n    </div>\n    <div class=\"cx-cancel-replenishment-dialog-description\">\n      {{ 'orderDetails.cancelReplenishment.description' | cxTranslate }}\n    </div>\n\n    <div class=\"cx-cancel-replenishment-dialog-body\">\n      <div class=\"cx-cancel-replenishment-btns row\">\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-action\"\n            (click)=\"close('Close Replenishment Dialog')\"\n          >\n            {{ 'orderDetails.cancelReplenishment.reject' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"cancelReplenishment()\"\n          >\n            {{ 'orderDetails.cancelReplenishment.accept' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-replenishment-order-cancellation-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-cancel-replenishment-dialog-foreground\"\n>\n  <div class=\"cx-cancel-replenishment-dialog-content\">\n    <div class=\"cx-cancel-replenishment-dialog-header\">\n      <h3>\n        {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n      </h3>\n    </div>\n    <div class=\"cx-cancel-replenishment-dialog-description\">\n      {{ 'orderDetails.cancelReplenishment.description' | cxTranslate }}\n    </div>\n\n    <div class=\"cx-cancel-replenishment-dialog-body\">\n      <div class=\"cx-cancel-replenishment-btns row\">\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-action\"\n            (click)=\"close('Close Replenishment Dialog')\"\n          >\n            {{ 'orderDetails.cancelReplenishment.reject' | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-6\">\n          <button\n            class=\"btn btn-block btn-primary\"\n            (click)=\"cancelReplenishment()\"\n          >\n            {{ 'orderDetails.cancelReplenishment.accept' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ReplenishmentOrderHistoryFacade }, { type: i1.GlobalMessageService }, { type: i3$1.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderCancellationDialogModule {
}
ReplenishmentOrderCancellationDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderCancellationDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, declarations: [ReplenishmentOrderCancellationDialogComponent], imports: [CommonModule, I18nModule, KeyboardFocusModule], exports: [ReplenishmentOrderCancellationDialogComponent] });
ReplenishmentOrderCancellationDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, imports: [CommonModule, I18nModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, KeyboardFocusModule],
                    declarations: [ReplenishmentOrderCancellationDialogComponent],
                    exports: [ReplenishmentOrderCancellationDialogComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultReplenishmentOrderCancellationLayoutConfig = {
    launch: {
        REPLENISHMENT_ORDER: {
            inline: true,
            component: ReplenishmentOrderCancellationDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderCancellationComponent {
    constructor(replenishmentOrderHistoryFacade, vcr, launchDialogService) {
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.replenishmentOrder$ = this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails();
    }
    openDialog() {
        const dialog = this.launchDialogService.openDialog("REPLENISHMENT_ORDER" /* LAUNCH_CALLER.REPLENISHMENT_ORDER */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
    }
}
ReplenishmentOrderCancellationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationComponent, deps: [{ token: i1$1.ReplenishmentOrderHistoryFacade }, { token: i0.ViewContainerRef }, { token: i3$1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ReplenishmentOrderCancellationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReplenishmentOrderCancellationComponent, selector: "cx-replenishment-order-cancellation", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<div class=\"cx-cancel-replenishment-btns row\">\n  <div class=\"col-xs-12 col-md-5 col-lg-4\">\n    <a\n      class=\"btn btn-block btn-action\"\n      [routerLink]=\"\n        {\n          cxRoute: 'replenishmentOrders'\n        } | cxUrl\n      \"\n    >\n      {{ 'common.back' | cxTranslate }}\n    </a>\n  </div>\n  <div\n    *ngIf=\"(replenishmentOrder$ | async)?.active\"\n    class=\"col-xs-12 col-md-5 col-lg-4\"\n  >\n    <button #element class=\"btn btn-block btn-action\" (click)=\"openDialog()\">\n      {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n    </button>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-replenishment-order-cancellation', template: "<div class=\"cx-cancel-replenishment-btns row\">\n  <div class=\"col-xs-12 col-md-5 col-lg-4\">\n    <a\n      class=\"btn btn-block btn-action\"\n      [routerLink]=\"\n        {\n          cxRoute: 'replenishmentOrders'\n        } | cxUrl\n      \"\n    >\n      {{ 'common.back' | cxTranslate }}\n    </a>\n  </div>\n  <div\n    *ngIf=\"(replenishmentOrder$ | async)?.active\"\n    class=\"col-xs-12 col-md-5 col-lg-4\"\n  >\n    <button #element class=\"btn btn-block btn-action\" (click)=\"openDialog()\">\n      {{ 'orderDetails.cancelReplenishment.title' | cxTranslate }}\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ReplenishmentOrderHistoryFacade }, { type: i0.ViewContainerRef }, { type: i3$1.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderDetailsService {
    constructor(routingService, replenishmentOrderHistoryFacade) {
        this.routingService = routingService;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.replenishmentOrderCode$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.replenishmentOrderCode), distinctUntilChanged());
        this.replenishmentOrderLoad$ = this.replenishmentOrderCode$.pipe(tap((replenishmentOrderCode) => {
            if (Boolean(replenishmentOrderCode)) {
                this.replenishmentOrderHistoryFacade.loadReplenishmentOrderDetails(replenishmentOrderCode);
            }
            else {
                this.replenishmentOrderHistoryFacade.clearReplenishmentOrderDetails();
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getOrderDetails() {
        return this.replenishmentOrderLoad$.pipe(switchMap((_) => this.replenishmentOrderHistoryFacade.getReplenishmentOrderDetails()));
    }
}
ReplenishmentOrderDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsService, deps: [{ token: i1.RoutingService }, { token: i1$1.ReplenishmentOrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1$1.ReplenishmentOrderHistoryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const moduleComponents = [ReplenishmentOrderCancellationComponent];
class ReplenishmentOrderDetailsModule {
}
ReplenishmentOrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, declarations: [ReplenishmentOrderCancellationComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule], exports: [ReplenishmentOrderCancellationComponent] });
ReplenishmentOrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                ReplenishmentDetailItemsComponent: {
                    component: OrderDetailItemsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailShippingComponent: {
                    component: OrderDetailShippingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailActionsComponent: {
                    component: ReplenishmentOrderCancellationComponent,
                },
                ReplenishmentDetailOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                },
            },
        }),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        PromotionsModule,
                        UrlModule,
                        ReplenishmentOrderCancellationDialogModule,
                        SpinnerModule,
                        ListNavigationModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                ReplenishmentDetailItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailShippingComponent: {
                                    component: OrderDetailShippingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailActionsComponent: {
                                    component: ReplenishmentOrderCancellationComponent,
                                },
                                ReplenishmentDetailOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryComponent {
    constructor(routing, replenishmentOrderHistoryFacade, translation, vcr, launchDialogService) {
        this.routing = routing;
        this.replenishmentOrderHistoryFacade = replenishmentOrderHistoryFacade;
        this.translation = translation;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.PAGE_SIZE = 5;
        this.replenishmentOrders$ = this.replenishmentOrderHistoryFacade
            .getReplenishmentOrderHistoryList(this.PAGE_SIZE)
            .pipe(tap((replenishmentOrders) => {
            var _a;
            if ((_a = replenishmentOrders === null || replenishmentOrders === void 0 ? void 0 : replenishmentOrders.pagination) === null || _a === void 0 ? void 0 : _a.sort) {
                this.sortType = replenishmentOrders.pagination.sort;
            }
        }));
        this.isLoaded$ = this.replenishmentOrderHistoryFacade.getReplenishmentOrderHistoryListSuccess();
    }
    changeSortCode(sortCode) {
        const event = {
            sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchReplenishmentOrders(event);
    }
    pageChange(page) {
        const event = {
            sortCode: this.sortType,
            currentPage: page,
        };
        this.fetchReplenishmentOrders(event);
    }
    goToOrderDetail(order) {
        this.routing.go({
            cxRoute: 'replenishmentDetails',
            params: order,
        });
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.replenishmentNumber'),
            this.translation.translate('sorting.nextOrderDate'),
        ]).pipe(map(([textByDate, textByOrderNumber, textbyNextOrderDate]) => {
            return {
                byDate: textByDate,
                byReplenishmentNumber: textByOrderNumber,
                byNextOrderDate: textbyNextOrderDate,
            };
        }));
    }
    openDialog(event, replenishmentOrderCode) {
        const dialog = this.launchDialogService.openDialog("REPLENISHMENT_ORDER" /* LAUNCH_CALLER.REPLENISHMENT_ORDER */, this.element, this.vcr, replenishmentOrderCode);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
        event.stopPropagation();
    }
    fetchReplenishmentOrders(event) {
        this.replenishmentOrderHistoryFacade.loadReplenishmentOrderList(this.PAGE_SIZE, event.currentPage, event.sortCode);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.replenishmentOrderHistoryFacade.clearReplenishmentOrderList();
    }
}
ReplenishmentOrderHistoryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryComponent, deps: [{ token: i1.RoutingService }, { token: i1$1.ReplenishmentOrderHistoryFacade }, { token: i1.TranslationService }, { token: i0.ViewContainerRef }, { token: i3$1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ReplenishmentOrderHistoryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReplenishmentOrderHistoryComponent, selector: "cx-replenishment-order-history", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"replenishmentOrders$ | async as replenishmentOrders\">\n  <div class=\"container\">\n    <!-- HEADER -->\n    <div class=\"cx-replenishment-order-history-header\">\n      <h3>\n        {{ 'orderHistory.replenishmentOrderHistory' | cxTranslate }}\n      </h3>\n    </div>\n\n    <!-- BODY -->\n    <div class=\"cx-replenishment-order-history-body\">\n      <ng-container\n        *ngIf=\"replenishmentOrders.pagination.totalResults > 0; else noOrder\"\n      >\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-replenishment-order-history-sort top row\">\n          <label\n            class=\"\n              cx-replenishment-order-history-form-group\n              form-group\n              col-sm-12 col-md-4 col-lg-4\n            \"\n          >\n            <span>{{ 'orderHistory.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"replenishmentOrders.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"replenishmentOrders.pagination.sort\"\n              placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n              ariaControls=\"replenishment-order-history-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-replenishment-order-history-pagination\"\n            *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n          >\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table\n          id=\"replenishment-order-history-table\"\n          class=\"table cx-replenishment-order-history-table\"\n        >\n          <thead class=\"cx-replenishment-order-history-thead-mobile\">\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.startOn' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.frequency' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\" class=\"cx-replenishment-order-history-total\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.total' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\"></th>\n          </thead>\n          <tbody>\n            <tr\n              *ngFor=\"let order of replenishmentOrders.replenishmentOrders\"\n              (click)=\"goToOrderDetail(order)\"\n            >\n              <td class=\"cx-replenishment-order-history-code\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.replenishmentOrderCode }}</a\n                >\n              </td>\n              <td>\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value\n                    cx-purchase-order-number\n                  \"\n                >\n                  {{\n                    order?.purchaseOrderNumber?.length > 0\n                      ? order?.purchaseOrderNumber\n                      : ('orderHistory.emptyPurchaseOrderId' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td>\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.startOn' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.firstDate | cxDate: 'M/d/yyyy' }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-frequency\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.frequency' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.trigger.displayTimeTable | slice: 0:-12 }}\n                </a>\n              </td>\n              <td>\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n                </div>\n\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value cx-next-order-date\n                  \"\n                >\n                  {{\n                    order?.active\n                      ? (order?.trigger.activationTime | cxDate: 'M/d/yyyy')\n                      : ('orderHistory.cancelled' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td class=\"cx-replenishment-order-history-total\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.total' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.totalPriceWithTax.formattedValue }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-cancel\">\n                <div\n                  class=\"d-md-none cx-replenishment-order-history-label\"\n                ></div>\n                <button\n                  (click)=\"openDialog($event, order?.replenishmentOrderCode)\"\n                  class=\"cx-order-cancel btn btn-link\"\n                  #element\n                  *ngIf=\"order?.active\"\n                >\n                  {{ 'orderHistory.cancel' | cxTranslate }}\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-replenishment-order-history-sort bottom row\">\n          <div class=\"cx-replenishment-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n              *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- NO ORDER CONTAINER -->\n      <ng-template #noOrder>\n        <div\n          class=\"cx-replenishment-order-history-no-order row\"\n          *ngIf=\"isLoaded$ | async\"\n        >\n          <div class=\"col-sm-12 col-md-6 col-lg-4\">\n            <div>{{ 'orderHistory.noReplenishmentOrders' | cxTranslate }}</div>\n            <a\n              [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n              routerLinkActive=\"active\"\n              class=\"btn btn-primary btn-block\"\n              >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n            >\n          </div>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i3.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i3$1.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3$1.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.SlicePipe, name: "slice" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-replenishment-order-history', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"replenishmentOrders$ | async as replenishmentOrders\">\n  <div class=\"container\">\n    <!-- HEADER -->\n    <div class=\"cx-replenishment-order-history-header\">\n      <h3>\n        {{ 'orderHistory.replenishmentOrderHistory' | cxTranslate }}\n      </h3>\n    </div>\n\n    <!-- BODY -->\n    <div class=\"cx-replenishment-order-history-body\">\n      <ng-container\n        *ngIf=\"replenishmentOrders.pagination.totalResults > 0; else noOrder\"\n      >\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-replenishment-order-history-sort top row\">\n          <label\n            class=\"\n              cx-replenishment-order-history-form-group\n              form-group\n              col-sm-12 col-md-4 col-lg-4\n            \"\n          >\n            <span>{{ 'orderHistory.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"replenishmentOrders.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"replenishmentOrders.pagination.sort\"\n              placeholder=\"{{ 'orderHistory.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'orderHistory.sortOrders' | cxTranslate\"\n              ariaControls=\"replenishment-order-history-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-replenishment-order-history-pagination\"\n            *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n          >\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table\n          id=\"replenishment-order-history-table\"\n          class=\"table cx-replenishment-order-history-table\"\n        >\n          <thead class=\"cx-replenishment-order-history-thead-mobile\">\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.startOn' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.frequency' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\" class=\"cx-replenishment-order-history-total\">\n              <span class=\"cx-replenishment-order-history-ellipses\">\n                {{ 'orderHistory.total' | cxTranslate }}\n              </span>\n            </th>\n            <th scope=\"col\"></th>\n          </thead>\n          <tbody>\n            <tr\n              *ngFor=\"let order of replenishmentOrders.replenishmentOrders\"\n              (click)=\"goToOrderDetail(order)\"\n            >\n              <td class=\"cx-replenishment-order-history-code\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.replenishmentOrderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.replenishmentOrderCode }}</a\n                >\n              </td>\n              <td>\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.purchaseOrderNumber' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value\n                    cx-purchase-order-number\n                  \"\n                >\n                  {{\n                    order?.purchaseOrderNumber?.length > 0\n                      ? order?.purchaseOrderNumber\n                      : ('orderHistory.emptyPurchaseOrderId' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td>\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.startOn' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.firstDate | cxDate: 'M/d/yyyy' }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-frequency\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.frequency' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.trigger.displayTimeTable | slice: 0:-12 }}\n                </a>\n              </td>\n              <td>\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.nextOrderDate' | cxTranslate }}\n                </div>\n\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"\n                    cx-replenishment-order-history-value cx-next-order-date\n                  \"\n                >\n                  {{\n                    order?.active\n                      ? (order?.trigger.activationTime | cxDate: 'M/d/yyyy')\n                      : ('orderHistory.cancelled' | cxTranslate)\n                  }}\n                </a>\n              </td>\n              <td class=\"cx-replenishment-order-history-total\">\n                <div class=\"d-md-none cx-replenishment-order-history-label\">\n                  {{ 'orderHistory.total' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'replenishmentDetails',\n                      params: order\n                    } | cxUrl\n                  \"\n                  class=\"cx-replenishment-order-history-value\"\n                >\n                  {{ order?.totalPriceWithTax.formattedValue }}</a\n                >\n              </td>\n              <td class=\"cx-replenishment-order-history-cancel\">\n                <div\n                  class=\"d-md-none cx-replenishment-order-history-label\"\n                ></div>\n                <button\n                  (click)=\"openDialog($event, order?.replenishmentOrderCode)\"\n                  class=\"cx-order-cancel btn btn-link\"\n                  #element\n                  *ngIf=\"order?.active\"\n                >\n                  {{ 'orderHistory.cancel' | cxTranslate }}\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-replenishment-order-history-sort bottom row\">\n          <div class=\"cx-replenishment-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"replenishmentOrders.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n              *ngIf=\"replenishmentOrders.pagination.totalPages > 1\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n\n      <!-- NO ORDER CONTAINER -->\n      <ng-template #noOrder>\n        <div\n          class=\"cx-replenishment-order-history-no-order row\"\n          *ngIf=\"isLoaded$ | async\"\n        >\n          <div class=\"col-sm-12 col-md-6 col-lg-4\">\n            <div>{{ 'orderHistory.noReplenishmentOrders' | cxTranslate }}</div>\n            <a\n              [routerLink]=\"{ cxRoute: 'home' } | cxUrl\"\n              routerLinkActive=\"active\"\n              class=\"btn btn-primary btn-block\"\n              >{{ 'orderHistory.startShopping' | cxTranslate }}</a\n            >\n          </div>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1$1.ReplenishmentOrderHistoryFacade }, { type: i1.TranslationService }, { type: i0.ViewContainerRef }, { type: i3$1.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryModule {
}
ReplenishmentOrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryModule, declarations: [ReplenishmentOrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [ReplenishmentOrderHistoryComponent] });
ReplenishmentOrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                AccountReplenishmentHistoryComponent: {
                    component: ReplenishmentOrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountReplenishmentHistoryComponent: {
                                    component: ReplenishmentOrderHistoryComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [ReplenishmentOrderHistoryComponent],
                    exports: [ReplenishmentOrderHistoryComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestService {
    constructor(routingService, returnRequestService, globalMessageService) {
        this.routingService = routingService;
        this.returnRequestService = returnRequestService;
        this.globalMessageService = globalMessageService;
    }
    get isCancelling$() {
        return this.returnRequestService.getCancelReturnRequestLoading();
    }
    get isCancelSuccess$() {
        return this.returnRequestService.getCancelReturnRequestSuccess();
    }
    getReturnRequest() {
        return combineLatest([
            this.routingService.getRouterState(),
            this.returnRequestService.getOrderReturnRequest(),
            this.returnRequestService.getReturnRequestLoading(),
        ]).pipe(map(([routingState, returnRequest, isLoading]) => [
            routingState.state.params['returnCode'],
            returnRequest,
            isLoading,
        ]), filter(([returnCode]) => Boolean(returnCode)), tap(([returnCode, returnRequest, isLoading]) => {
            if ((returnRequest === undefined || returnRequest.rma !== returnCode) &&
                !isLoading) {
                this.returnRequestService.loadOrderReturnRequestDetail(returnCode);
            }
        }), map(([_, returnRequest]) => returnRequest), filter((returnRequest) => Boolean(returnRequest)), distinctUntilChanged());
    }
    clearReturnRequest() {
        this.returnRequestService.clearOrderReturnRequestDetail();
    }
    cancelReturnRequest(returnRequestCode) {
        this.returnRequestService.cancelOrderReturnRequest(returnRequestCode, {
            status: 'CANCELLING',
        });
    }
    cancelSuccess(rma) {
        this.returnRequestService.resetCancelReturnRequestProcessState();
        this.globalMessageService.add({
            key: 'returnRequest.cancelSuccess',
            params: { rma },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.routingService.go({
            cxRoute: 'orders',
        });
    }
    backToList() {
        this.routingService.go({ cxRoute: 'orders' }, {
            state: {
                activeTab: 1,
            },
        });
    }
}
ReturnRequestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestService, deps: [{ token: i1.RoutingService }, { token: i1$1.OrderReturnRequestFacade }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ReturnRequestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1$1.OrderReturnRequestFacade }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestItemsComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService.getReturnRequest();
    }
}
ReturnRequestItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestItemsComponent, deps: [{ token: ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReturnRequestItemsComponent, selector: "cx-return-request-items", ngImport: i0, template: "<table\n  class=\"cx-return-request-items\"\n  *ngIf=\"returnRequest$ | async as returnRequest\"\n>\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'returnRequest.caption' | cxTranslate\n    }}\n  </caption>\n  <thead>\n    <tr>\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'returnRequest.item' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-price\">\n        {{ 'returnRequest.itemPrice' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'returnRequest.returnQty' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-total\">\n        {{ 'returnRequest.total' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n\n  <tbody class=\"cx-item-list-items\">\n    <!-- TODO: This should be a separate component-->\n    <tr\n      class=\"cx-item-list-row cx-return-request-item-row\"\n      *ngFor=\"let returnEntry of returnRequest.returnEntries; let i = index\"\n    >\n      <td role=\"cell\">\n        <!-- Item Image -->\n        <div class=\"cx-table-item-container\">\n          <cx-media\n            [container]=\"returnEntry.orderEntry?.product.images?.PRIMARY\"\n            format=\"thumbnail\"\n          ></cx-media>\n          <!-- Item Description -->\n          <div class=\"cx-info\">\n            <div *ngIf=\"returnEntry.orderEntry?.product.name\" class=\"cx-name\">\n              {{ returnEntry.orderEntry?.product.name }}\n            </div>\n            <div *ngIf=\"returnEntry.orderEntry?.product.code\" class=\"cx-code\">\n              {{ 'cartItems.id' | cxTranslate }}\n              {{ returnEntry.orderEntry?.product.code }}\n            </div>\n            <!-- Variants -->\n            <div\n              *ngFor=\"\n                let variant of (returnEntry.orderEntry?.product.baseOptions)[0]\n                  ?.selected?.variantOptionQualifiers\n              \"\n              class=\"cx-property\"\n            >\n              <div class=\"cx-label\" *ngIf=\"variant.name\">\n                {{ variant.name }}:\n              </div>\n              <div class=\"cx-value\" *ngIf=\"variant.value\">\n                {{ variant.value }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </td>\n      <!-- Item Price -->\n      <td\n        role=\"cell\"\n        class=\"cx-price\"\n        *ngIf=\"returnEntry.orderEntry?.basePrice\"\n      >\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.itemPrice' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.orderEntry?.basePrice?.formattedValue }}\n        </div>\n      </td>\n      <!-- return Quantity -->\n      <td role=\"cell\" class=\"cx-quantity\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.returnQty' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.expectedQuantity }}\n        </div>\n      </td>\n      <!-- Total Price -->\n      <td role=\"cell\" class=\"cx-total\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.total' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.refundAmount?.formattedValue }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table\n  class=\"cx-return-request-items\"\n  *ngIf=\"returnRequest$ | async as returnRequest\"\n>\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'returnRequest.caption' | cxTranslate\n    }}\n  </caption>\n  <thead>\n    <tr>\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'returnRequest.item' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-price\">\n        {{ 'returnRequest.itemPrice' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'returnRequest.returnQty' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-total\">\n        {{ 'returnRequest.total' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n\n  <tbody class=\"cx-item-list-items\">\n    <!-- TODO: This should be a separate component-->\n    <tr\n      class=\"cx-item-list-row cx-return-request-item-row\"\n      *ngFor=\"let returnEntry of returnRequest.returnEntries; let i = index\"\n    >\n      <td role=\"cell\">\n        <!-- Item Image -->\n        <div class=\"cx-table-item-container\">\n          <cx-media\n            [container]=\"returnEntry.orderEntry?.product.images?.PRIMARY\"\n            format=\"thumbnail\"\n          ></cx-media>\n          <!-- Item Description -->\n          <div class=\"cx-info\">\n            <div *ngIf=\"returnEntry.orderEntry?.product.name\" class=\"cx-name\">\n              {{ returnEntry.orderEntry?.product.name }}\n            </div>\n            <div *ngIf=\"returnEntry.orderEntry?.product.code\" class=\"cx-code\">\n              {{ 'cartItems.id' | cxTranslate }}\n              {{ returnEntry.orderEntry?.product.code }}\n            </div>\n            <!-- Variants -->\n            <div\n              *ngFor=\"\n                let variant of (returnEntry.orderEntry?.product.baseOptions)[0]\n                  ?.selected?.variantOptionQualifiers\n              \"\n              class=\"cx-property\"\n            >\n              <div class=\"cx-label\" *ngIf=\"variant.name\">\n                {{ variant.name }}:\n              </div>\n              <div class=\"cx-value\" *ngIf=\"variant.value\">\n                {{ variant.value }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </td>\n      <!-- Item Price -->\n      <td\n        role=\"cell\"\n        class=\"cx-price\"\n        *ngIf=\"returnEntry.orderEntry?.basePrice\"\n      >\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.itemPrice' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.orderEntry?.basePrice?.formattedValue }}\n        </div>\n      </td>\n      <!-- return Quantity -->\n      <td role=\"cell\" class=\"cx-quantity\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.returnQty' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.expectedQuantity }}\n        </div>\n      </td>\n      <!-- Total Price -->\n      <td role=\"cell\" class=\"cx-total\">\n        <div class=\"cx-mobile-header\">\n          {{ 'returnRequest.total' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\">\n          {{ returnEntry.refundAmount?.formattedValue }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n" }]
        }], ctorParameters: function () { return [{ type: ReturnRequestService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestOverviewComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService
            .getReturnRequest()
            .pipe(tap((returnRequest) => { var _a; return (this.rma = (_a = returnRequest.rma) !== null && _a !== void 0 ? _a : ''); }));
        this.isCancelling$ = this.returnRequestService.isCancelling$;
    }
    ngOnInit() {
        this.subscription = this.returnRequestService.isCancelSuccess$.subscribe((success) => {
            if (success) {
                this.returnRequestService.cancelSuccess(this.rma);
            }
        });
    }
    cancelReturn(returnRequestCode) {
        this.returnRequestService.cancelReturnRequest(returnRequestCode);
    }
    back() {
        this.returnRequestService.backToList();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ReturnRequestOverviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestOverviewComponent, deps: [{ token: ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestOverviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReturnRequestOverviewComponent, selector: "cx-return-request-overview", ngImport: i0, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button (click)=\"back()\" class=\"btn btn-block btn-action\">\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        *ngIf=\"returnRequest.cancellable\"\n        class=\"btn btn-block btn-primary\"\n        (click)=\"cancelReturn(returnRequest.rma)\"\n        [disabled]=\"isCancelling$ | async\"\n      >\n        {{ 'returnRequest.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cx-header row\">\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.returnRequestId' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.rma }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.orderCode' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.order?.code }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.status' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">\n        {{\n          'returnRequestList.statusDisplay_' + returnRequest?.status\n            | cxTranslate\n        }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestOverviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-overview', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button (click)=\"back()\" class=\"btn btn-block btn-action\">\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        *ngIf=\"returnRequest.cancellable\"\n        class=\"btn btn-block btn-primary\"\n        (click)=\"cancelReturn(returnRequest.rma)\"\n        [disabled]=\"isCancelling$ | async\"\n      >\n        {{ 'returnRequest.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n  <div class=\"cx-header row\">\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.returnRequestId' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.rma }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.orderCode' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">{{ returnRequest.order?.code }}</div>\n    </div>\n    <div class=\"cx-detail col-sm-12 col-md-4\">\n      <div class=\"cx-detail-label\">\n        {{ 'returnRequest.status' | cxTranslate }}\n      </div>\n      <div class=\"cx-detail-value\">\n        {{\n          'returnRequestList.statusDisplay_' + returnRequest?.status\n            | cxTranslate\n        }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ReturnRequestService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestTotalsComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService.getReturnRequest();
    }
    ngOnDestroy() {
        this.returnRequestService.clearReturnRequest();
    }
}
ReturnRequestTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestTotalsComponent, deps: [{ token: ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ReturnRequestTotalsComponent, selector: "cx-return-request-totals", ngImport: i0, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <h4>{{ 'returnRequest.summary' | cxTranslate }}</h4>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.subtotal' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.subTotal?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.deliveryCode' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.deliveryCost?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-summary-total\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.estimatedRefund' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.totalPrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-footnote\">\n        {{ 'returnRequest.note' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <h4>{{ 'returnRequest.summary' | cxTranslate }}</h4>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.subtotal' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.subTotal?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.deliveryCode' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.deliveryCost?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-summary-total\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.estimatedRefund' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.totalPrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-footnote\">\n        {{ 'returnRequest.note' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ReturnRequestService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const components = [
    ReturnRequestOverviewComponent,
    ReturnRequestItemsComponent,
    ReturnRequestTotalsComponent,
];
class ReturnRequestDetailModule {
}
ReturnRequestDetailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestDetailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnRequestDetailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestDetailModule, declarations: [ReturnRequestOverviewComponent,
        ReturnRequestItemsComponent,
        ReturnRequestTotalsComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        MediaModule,
        FeaturesConfigModule], exports: [ReturnRequestOverviewComponent,
        ReturnRequestItemsComponent,
        ReturnRequestTotalsComponent] });
ReturnRequestDetailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestDetailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturnRequestOverviewComponent: {
                    component: ReturnRequestOverviewComponent,
                },
                ReturnRequestItemsComponent: {
                    component: ReturnRequestItemsComponent,
                },
                ReturnRequestTotalsComponent: {
                    component: ReturnRequestTotalsComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        MediaModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestDetailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        MediaModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturnRequestOverviewComponent: {
                                    component: ReturnRequestOverviewComponent,
                                },
                                ReturnRequestItemsComponent: {
                                    component: ReturnRequestItemsComponent,
                                },
                                ReturnRequestTotalsComponent: {
                                    component: ReturnRequestTotalsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...components],
                    exports: [...components],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnRequestListComponent {
    constructor(returnRequestService, translation) {
        this.returnRequestService = returnRequestService;
        this.translation = translation;
        this.PAGE_SIZE = 5;
        this.returnRequests$ = this.returnRequestService.getOrderReturnRequestList(this.PAGE_SIZE).pipe(tap((requestList) => {
            var _a;
            if ((_a = requestList === null || requestList === void 0 ? void 0 : requestList.pagination) === null || _a === void 0 ? void 0 : _a.sort) {
                this.sortType = requestList.pagination.sort;
            }
        }));
        /**
         * When "Order Return" feature is enabled, this component becomes one tab in
         * TabParagraphContainerComponent. This can be read from TabParagraphContainer.
         */
        this.tabTitleParam$ = this.returnRequests$.pipe(map((returnRequests) => { var _a; return (_a = returnRequests === null || returnRequests === void 0 ? void 0 : returnRequests.pagination) === null || _a === void 0 ? void 0 : _a.totalResults; }), filter(isNotUndefined), take(1));
    }
    ngOnDestroy() {
        this.returnRequestService.clearOrderReturnRequestList();
    }
    changeSortCode(sortCode) {
        const event = {
            sortCode,
            currentPage: 0,
        };
        this.sortType = sortCode;
        this.fetchReturnRequests(event);
    }
    pageChange(page) {
        const event = {
            sortCode: this.sortType,
            currentPage: page,
        };
        this.fetchReturnRequests(event);
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('sorting.date'),
            this.translation.translate('sorting.rma'),
        ]).pipe(map(([textByDate, textByRma]) => {
            return {
                byDate: textByDate,
                byRMA: textByRma,
            };
        }));
    }
    fetchReturnRequests(event) {
        this.returnRequestService.loadOrderReturnRequestList(this.PAGE_SIZE, event.currentPage, event.sortCode);
    }
}
OrderReturnRequestListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnRequestListComponent, deps: [{ token: i1$1.OrderReturnRequestFacade }, { token: i1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderReturnRequestListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderReturnRequestListComponent, selector: "cx-order-return-request-list", ngImport: i0, template: "<ng-container *ngIf=\"returnRequests$ | async as returnRequests\">\n  <div class=\"container\">\n    <!-- BODY -->\n    <div class=\"cx-order-history-body\">\n      <ng-container *ngIf=\"returnRequests.pagination.totalResults > 0\">\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-order-history-sort top\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n              [ariaLabel]=\"'returnRequestList.sortReturns' | cxTranslate\"\n              ariaControls=\"order-return-table\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table id=\"order-return-table\" class=\"table cx-order-history-table\">\n          <thead class=\"cx-order-history-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.orderId' | cxTranslate }}</th>\n            <th scope=\"col\">\n              {{ 'returnRequestList.date' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.status' | cxTranslate }}</th>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let return of returnRequests.returnRequests\">\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'returnRequestDetails',\n                      params: return\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.rma }}</a\n                >\n              </td>\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.orderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'orderDetails',\n                      params: return?.order\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.order?.code }}</a\n                >\n              </td>\n\n              <td class=\"cx-order-history-placed\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.date' | cxTranslate }}\n                </div>\n                {{ return?.creationTime | cxDate: 'longDate' }}\n              </td>\n              <td class=\"cx-order-history-status\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.status' | cxTranslate }}\n                </div>\n                {{\n                  'returnRequestList.statusDisplay_' + return?.status\n                    | cxTranslate\n                }}\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-order-history-sort bottom\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3$1.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3$1.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderReturnRequestListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-return-request-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequests$ | async as returnRequests\">\n  <div class=\"container\">\n    <!-- BODY -->\n    <div class=\"cx-order-history-body\">\n      <ng-container *ngIf=\"returnRequests.pagination.totalResults > 0\">\n        <!-- Select Form and Pagination Top -->\n        <div class=\"cx-order-history-sort top\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n              [ariaLabel]=\"'returnRequestList.sortReturns' | cxTranslate\"\n              ariaControls=\"order-return-table\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n        <!-- TABLE -->\n        <table id=\"order-return-table\" class=\"table cx-order-history-table\">\n          <thead class=\"cx-order-history-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.orderId' | cxTranslate }}</th>\n            <th scope=\"col\">\n              {{ 'returnRequestList.date' | cxTranslate }}\n            </th>\n            <th scope=\"col\">{{ 'returnRequestList.status' | cxTranslate }}</th>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let return of returnRequests.returnRequests\">\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.returnRequestId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'returnRequestDetails',\n                      params: return\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.rma }}</a\n                >\n              </td>\n              <td class=\"cx-order-history-code\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.orderId' | cxTranslate }}\n                </div>\n                <a\n                  [routerLink]=\"\n                    {\n                      cxRoute: 'orderDetails',\n                      params: return?.order\n                    } | cxUrl\n                  \"\n                  class=\"cx-order-history-value\"\n                >\n                  {{ return?.order?.code }}</a\n                >\n              </td>\n\n              <td class=\"cx-order-history-placed\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.date' | cxTranslate }}\n                </div>\n                {{ return?.creationTime | cxDate: 'longDate' }}\n              </td>\n              <td class=\"cx-order-history-status\">\n                <div class=\"cx-order-history-label\">\n                  {{ 'returnRequestList.status' | cxTranslate }}\n                </div>\n                {{\n                  'returnRequestList.statusDisplay_' + return?.status\n                    | cxTranslate\n                }}\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-order-history-sort bottom\">\n          <label class=\"cx-order-history-form-group form-group\"\n            ><span>{{ 'returnRequestList.sortBy' | cxTranslate }}</span>\n            <cx-sorting\n              [sortOptions]=\"returnRequests.sorts\"\n              [sortLabels]=\"getSortLabels() | async\"\n              (sortListEvent)=\"changeSortCode($event)\"\n              [selectedOption]=\"returnRequests.pagination.sort\"\n            ></cx-sorting>\n          </label>\n          <div class=\"cx-order-history-pagination\">\n            <cx-pagination\n              [pagination]=\"returnRequests.pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.OrderReturnRequestFacade }, { type: i1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReturnRequestListModule {
}
ReturnRequestListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnRequestListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestListModule, declarations: [OrderReturnRequestListComponent], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [OrderReturnRequestListComponent] });
ReturnRequestListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderReturnRequestListComponent: {
                    component: OrderReturnRequestListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReturnRequestListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderReturnRequestListComponent: {
                                    component: OrderReturnRequestListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [OrderReturnRequestListComponent],
                    exports: [OrderReturnRequestListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderComponentsModule {
}
OrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule] });
OrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, providers: [
        {
            provide: OrderDetailsOrderEntriesContextToken,
            useExisting: OrderDetailsOrderEntriesContext,
        },
    ], imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrderHistoryModule,
                        OrderDetailsModule,
                        ReplenishmentOrderDetailsModule,
                        OrderCancellationModule,
                        OrderReturnModule,
                        ReplenishmentOrderHistoryModule,
                        ReturnRequestListModule,
                        ReturnRequestDetailModule,
                        OrderConfirmationModule,
                    ],
                    providers: [
                        {
                            provide: OrderDetailsOrderEntriesContextToken,
                            useExisting: OrderDetailsOrderEntriesContext,
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

export { AmendOrderActionsComponent, AmendOrderActionsModule, AmendOrderItemsModule, AmendOrderType, CancelOrReturnItemsComponent, CancelOrderComponent, CancelOrderConfirmationComponent, CancelOrderConfirmationModule, CancelOrderModule, ConsignmentTrackingComponent, OrderAmendService, OrderCancellationGuard, OrderCancellationModule, OrderCancellationService, OrderComponentsModule, OrderConfirmationGuard, OrderConfirmationOrderEntriesContext, OrderConsignedEntriesComponent, OrderDetailActionsComponent, OrderDetailItemsComponent, OrderDetailShippingComponent, OrderDetailTotalsComponent, OrderDetailsModule, OrderDetailsOrderEntriesContext, OrderDetailsService, OrderHistoryComponent, OrderHistoryModule, OrderOverviewComponent, OrderOverviewModule, OrderReturnGuard, OrderReturnModule, OrderReturnRequestListComponent, OrderReturnService, ReplenishmentOrderCancellationComponent, ReplenishmentOrderCancellationDialogComponent, ReplenishmentOrderCancellationDialogModule, ReplenishmentOrderDetailsModule, ReplenishmentOrderDetailsService, ReplenishmentOrderHistoryComponent, ReplenishmentOrderHistoryModule, ReturnOrderComponent, ReturnOrderConfirmationComponent, ReturnOrderConfirmationModule, ReturnOrderModule, ReturnRequestDetailModule, ReturnRequestItemsComponent, ReturnRequestListModule, ReturnRequestOverviewComponent, ReturnRequestTotalsComponent, TrackingEventsComponent, defaultReplenishmentOrderCancellationLayoutConfig };
//# sourceMappingURL=spartacus-order-components.mjs.map
