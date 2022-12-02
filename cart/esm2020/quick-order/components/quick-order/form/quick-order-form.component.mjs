/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ICON_TYPE } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, take, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/quick-order/root";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@angular/forms";
export class QuickOrderFormComponent {
    constructor(config, cd, quickOrderService, winRef) {
        this.config = config;
        this.cd = cd;
        this.quickOrderService = quickOrderService;
        this.winRef = winRef;
        this.iconTypes = ICON_TYPE;
        this.isSearching = false;
        this.noResults = false;
        this.results = [];
        this.subscription = new Subscription();
        this.searchSubscription = new Subscription();
    }
    ngOnInit() {
        this.buildForm();
        this.subscription.add(this.watchProductAdd());
        this.subscription.add(this.watchQueryChange());
    }
    onBlur(event) {
        // Use timeout to detect changes
        setTimeout(() => {
            if (!this.isSuggestionFocused()) {
                this.blurSuggestionBox(event);
            }
        });
    }
    clear(event) {
        event?.preventDefault();
        if (this.isResultsBoxOpen()) {
            this.toggleBodyClass('quick-order-searchbox-is-active', false);
        }
        let product = this.form.get('product')?.value;
        if (!!product) {
            this.form.reset();
        }
        // We have to call 'close' method every time to make sure results list is empty and call detectChanges to change icon type in form
        this.close();
        this.cd?.detectChanges();
    }
    add(product, event) {
        event?.preventDefault();
        // TODO change to nonpurchasable flag once we will support multidimensional products in search and when the purchasable flag will be available in search product response
        // Check if product is purchasable / non multidimensional
        if (product.multidimensional) {
            this.quickOrderService.setNonPurchasableProductError(product);
            this.clear();
            return;
        }
        else {
            this.quickOrderService.clearNonPurchasableProductError();
        }
        this.quickOrderService.addProduct(product);
    }
    addProduct(event) {
        this.quickOrderService
            .canAdd()
            .pipe(take(1))
            .subscribe((canAdd) => {
            if (canAdd) {
                // Add product if there is only one in the result list
                if (this.results.length === 1) {
                    this.add(this.results[0], event);
                    // Add product if there is focus on it
                }
                else if (this.getFocusedIndex() !== -1) {
                    const product = this.results[this.getFocusedIndex()];
                    this.add(product, event);
                }
            }
        });
    }
    focusNextChild(event) {
        event.preventDefault(); // Negate normal keyscroll
        if (!this.results.length) {
            return;
        }
        const [results, focusedIndex] = [
            this.getResultElements(),
            this.getFocusedIndex(),
        ];
        // Focus on first index moving to last
        if (results.length) {
            if (focusedIndex >= results.length - 1) {
                results[0].focus();
            }
            else {
                results[focusedIndex + 1].focus();
            }
        }
    }
    focusPreviousChild(event) {
        event.preventDefault(); // Negate normal keyscroll
        if (!this.results.length) {
            return;
        }
        const [results, focusedIndex] = [
            this.getResultElements(),
            this.getFocusedIndex(),
        ];
        // Focus on last index moving to first
        if (results.length) {
            if (focusedIndex < 1) {
                results[results.length - 1].focus();
            }
            else {
                results[focusedIndex - 1].focus();
            }
        }
    }
    isResultsBoxOpen() {
        return this.winRef
            ? !!this.winRef.document.querySelector('.quick-order-searchbox-is-active')
            : false;
    }
    canAddProduct() {
        return this.quickOrderService.canAdd();
    }
    open() {
        this.toggleBodyClass('quick-order-searchbox-is-active', true);
    }
    // Return result list as HTMLElement array
    getResultElements() {
        if (this.winRef) {
            return Array.from(this.winRef.document.querySelectorAll('.quick-order-results-products > li button'));
        }
        else {
            return [];
        }
    }
    blurSuggestionBox(event) {
        this.toggleBodyClass('quick-order-searchbox-is-active', false);
        if (event && event.target) {
            event.target.blur();
        }
    }
    // Return focused element as HTMLElement
    getFocusedElement() {
        if (this.winRef) {
            return this.winRef.document.activeElement;
        }
    }
    getFocusedIndex() {
        return this.getResultElements().indexOf(this.getFocusedElement());
    }
    isSuggestionFocused() {
        return this.getResultElements().includes(this.getFocusedElement());
    }
    toggleBodyClass(className, add) {
        // TODO(#14058): Remove condition
        if (this.winRef) {
            if (add === undefined) {
                this.winRef.document.body.classList.toggle(className);
            }
            else {
                add
                    ? this.winRef.document.body.classList.add(className)
                    : this.winRef.document.body.classList.remove(className);
            }
        }
    }
    buildForm() {
        const form = new UntypedFormGroup({});
        form.setControl('product', new UntypedFormControl(null));
        this.form = form;
    }
    isEmpty(string) {
        return string?.trim() === '' || string == null;
    }
    watchQueryChange() {
        return this.form.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300), filter((value) => {
            if (this.config?.quickOrder?.searchForm) {
                //Check if input to quick order is an empty after deleting input manually
                if (this.isEmpty(value.product)) {
                    //Clear recommendation results on empty string
                    this.clear();
                    return false;
                }
                return (!!value.product &&
                    value.product.length >=
                        this.config.quickOrder?.searchForm?.minCharactersBeforeRequest);
            }
            return value;
        }))
            .subscribe((value) => {
            this.searchProducts(value.product);
        });
    }
    searchProducts(query) {
        this.searchSubscription.add(this.canAddProduct()
            .pipe(filter(Boolean), switchMap(() => this.quickOrderService
            .searchProducts(query, this.config?.quickOrder?.searchForm?.maxProducts)
            .pipe(take(1))))
            .subscribe((products) => {
            this.results = products;
            if (this.results.length) {
                this.noResults = false;
                this.open();
            }
            else {
                this.noResults = true;
            }
            this.cd?.detectChanges();
        }));
    }
    clearResults() {
        this.results = [];
    }
    close() {
        this.resetSearchSubscription();
        this.clearResults();
        this.noResults = false;
    }
    resetSearchSubscription() {
        this.searchSubscription.unsubscribe();
        this.searchSubscription = new Subscription();
    }
    watchProductAdd() {
        return this.quickOrderService
            .getProductAdded()
            .subscribe(() => this.clear());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
QuickOrderFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderFormComponent, deps: [{ token: i1.Config }, { token: i0.ChangeDetectorRef }, { token: i2.QuickOrderFacade }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
QuickOrderFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: QuickOrderFormComponent, selector: "cx-quick-order-form", inputs: { limit: "limit" }, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"quick-order-form-container\">\n  <div\n    class=\"quick-order-form-input\"\n    role=\"search\"\n    [attr.aria-label]=\"'quickOrderForm.quickOrderSearch' | cxTranslate\"\n  >\n    <input\n      (blur)=\"onBlur($event)\"\n      (focus)=\"open()\"\n      (keydown.arrowdown)=\"focusNextChild($event)\"\n      (keydown.arrowup)=\"focusPreviousChild($event)\"\n      (keydown.enter)=\"addProduct($event)\"\n      (keydown.escape)=\"clear($event)\"\n      [attr.aria-label]=\"\n        'quickOrderForm.searchBoxLabel' | cxTranslate: { limit: limit }\n      \"\n      aria-controls=\"results\"\n      aria-describedby=\"quickOrderFormInitialDescription\"\n      class=\"form-control\"\n      formControlName=\"product\"\n      placeholder=\"{{ 'quickOrderForm.placeholder' | cxTranslate }}\"\n      type=\"text\"\n    />\n\n    <button\n      *ngIf=\"form.get('product')?.value; else searchIcon\"\n      (click)=\"clear($event)\"\n      (keydown.enter)=\"clear($event)\"\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      class=\"quick-order-form-reset-icon\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <ng-template #searchIcon>\n      <button\n        [attr.aria-label]=\"'common.search' | cxTranslate\"\n        class=\"quick-order-form-search-icon\"\n        tabindex=\"-1\"\n      >\n        <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n      </button>\n    </ng-template>\n\n    <span\n      *ngIf=\"!(canAddProduct() | async) && form.get('product')?.dirty\"\n      class=\"list-limit-reached-text\"\n      role=\"alert\"\n    >\n      {{ 'quickOrderForm.listLimitReached' | cxTranslate }}\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"isResultsBoxOpen()\"\n    class=\"quick-order-results\"\n    role=\"dialog\"\n    id=\"results\"\n  >\n    <ul\n      *ngIf=\"results.length\"\n      class=\"quick-order-results-products\"\n      role=\"listbox\"\n    >\n      <li\n        *ngFor=\"let product of results; let i = index\"\n        class=\"quick-order-results-product-container\"\n      >\n        <button\n          (blur)=\"onBlur($event)\"\n          (click)=\"add(product, $event)\"\n          (keydown.arrowdown)=\"focusNextChild($event)\"\n          (keydown.arrowup)=\"focusPreviousChild($event)\"\n          (keydown.enter)=\"add(product, $event)\"\n          (keydown.escape)=\"clear($event)\"\n          [class.has-media]=\"\n            config?.quickOrder?.searchForm?.displayProductImages\n          \"\n          class=\"quick-order-results-product\"\n          role=\"option\"\n        >\n          <cx-media\n            *ngIf=\"config?.quickOrder?.searchForm?.displayProductImages\"\n            [alt]=\"product.name\"\n            [container]=\"product.images?.PRIMARY\"\n            class=\"media\"\n            format=\"thumbnail\"\n            role=\"presentation\"\n          ></cx-media>\n          <div class=\"name\" [innerHTML]=\"product.name\"></div>\n          <span class=\"id\">\n            {{\n              'quickOrderForm.id'\n                | cxTranslate\n                  : {\n                      id: product.code\n                    }\n            }}\n          </span>\n          <span class=\"price\">{{ product.price?.formattedValue }}</span>\n        </button>\n      </li>\n    </ul>\n\n    <span *ngIf=\"noResults\" class=\"quick-order-no-results\">\n      {{ 'quickOrderForm.noResults' | cxTranslate }}\n    </span>\n  </div>\n</form>\n\n<label\n  aria-live=\"polite\"\n  id=\"quickOrderFormInitialDescription\"\n  aria-atomic=\"true\"\n  class=\"cx-visually-hidden\"\n>\n  {{\n    results.length\n      ? ('quickOrderForm.productsResults'\n        | cxTranslate: { count: results.length })\n      : ''\n  }}\n  {{ 'quickOrderForm.initialDescription' | cxTranslate }}\n</label>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i4.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-quick-order-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form [formGroup]=\"form\" class=\"quick-order-form-container\">\n  <div\n    class=\"quick-order-form-input\"\n    role=\"search\"\n    [attr.aria-label]=\"'quickOrderForm.quickOrderSearch' | cxTranslate\"\n  >\n    <input\n      (blur)=\"onBlur($event)\"\n      (focus)=\"open()\"\n      (keydown.arrowdown)=\"focusNextChild($event)\"\n      (keydown.arrowup)=\"focusPreviousChild($event)\"\n      (keydown.enter)=\"addProduct($event)\"\n      (keydown.escape)=\"clear($event)\"\n      [attr.aria-label]=\"\n        'quickOrderForm.searchBoxLabel' | cxTranslate: { limit: limit }\n      \"\n      aria-controls=\"results\"\n      aria-describedby=\"quickOrderFormInitialDescription\"\n      class=\"form-control\"\n      formControlName=\"product\"\n      placeholder=\"{{ 'quickOrderForm.placeholder' | cxTranslate }}\"\n      type=\"text\"\n    />\n\n    <button\n      *ngIf=\"form.get('product')?.value; else searchIcon\"\n      (click)=\"clear($event)\"\n      (keydown.enter)=\"clear($event)\"\n      [attr.aria-label]=\"'common.reset' | cxTranslate\"\n      class=\"quick-order-form-reset-icon\"\n    >\n      <cx-icon [type]=\"iconTypes.RESET\"></cx-icon>\n    </button>\n\n    <ng-template #searchIcon>\n      <button\n        [attr.aria-label]=\"'common.search' | cxTranslate\"\n        class=\"quick-order-form-search-icon\"\n        tabindex=\"-1\"\n      >\n        <cx-icon [type]=\"iconTypes.SEARCH\"></cx-icon>\n      </button>\n    </ng-template>\n\n    <span\n      *ngIf=\"!(canAddProduct() | async) && form.get('product')?.dirty\"\n      class=\"list-limit-reached-text\"\n      role=\"alert\"\n    >\n      {{ 'quickOrderForm.listLimitReached' | cxTranslate }}\n    </span>\n  </div>\n\n  <div\n    *ngIf=\"isResultsBoxOpen()\"\n    class=\"quick-order-results\"\n    role=\"dialog\"\n    id=\"results\"\n  >\n    <ul\n      *ngIf=\"results.length\"\n      class=\"quick-order-results-products\"\n      role=\"listbox\"\n    >\n      <li\n        *ngFor=\"let product of results; let i = index\"\n        class=\"quick-order-results-product-container\"\n      >\n        <button\n          (blur)=\"onBlur($event)\"\n          (click)=\"add(product, $event)\"\n          (keydown.arrowdown)=\"focusNextChild($event)\"\n          (keydown.arrowup)=\"focusPreviousChild($event)\"\n          (keydown.enter)=\"add(product, $event)\"\n          (keydown.escape)=\"clear($event)\"\n          [class.has-media]=\"\n            config?.quickOrder?.searchForm?.displayProductImages\n          \"\n          class=\"quick-order-results-product\"\n          role=\"option\"\n        >\n          <cx-media\n            *ngIf=\"config?.quickOrder?.searchForm?.displayProductImages\"\n            [alt]=\"product.name\"\n            [container]=\"product.images?.PRIMARY\"\n            class=\"media\"\n            format=\"thumbnail\"\n            role=\"presentation\"\n          ></cx-media>\n          <div class=\"name\" [innerHTML]=\"product.name\"></div>\n          <span class=\"id\">\n            {{\n              'quickOrderForm.id'\n                | cxTranslate\n                  : {\n                      id: product.code\n                    }\n            }}\n          </span>\n          <span class=\"price\">{{ product.price?.formattedValue }}</span>\n        </button>\n      </li>\n    </ul>\n\n    <span *ngIf=\"noResults\" class=\"quick-order-no-results\">\n      {{ 'quickOrderForm.noResults' | cxTranslate }}\n    </span>\n  </div>\n</form>\n\n<label\n  aria-live=\"polite\"\n  id=\"quickOrderFormInitialDescription\"\n  aria-atomic=\"true\"\n  class=\"cx-visually-hidden\"\n>\n  {{\n    results.length\n      ? ('quickOrderForm.productsResults'\n        | cxTranslate: { count: results.length })\n      : ''\n  }}\n  {{ 'quickOrderForm.initialDescription' | cxTranslate }}\n</label>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Config }, { type: i0.ChangeDetectorRef }, { type: i2.QuickOrderFacade }, { type: i1.WindowRef }]; }, propDecorators: { limit: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb21wb25lbnRzL3F1aWNrLW9yZGVyL2Zvcm0vcXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb21wb25lbnRzL3F1aWNrLW9yZGVyL2Zvcm0vcXVpY2stb3JkZXItZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFDTCxZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixTQUFTLEVBQ1QsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFPeEIsTUFBTSxPQUFPLHVCQUF1QjtJQVlsQyxZQUNTLE1BQWMsRUFDWCxFQUFxQixFQUNyQixpQkFBbUMsRUFDbkMsTUFBaUI7UUFIcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNYLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQWQ3QixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGNBQVMsR0FBWSxLQUFLLENBQUM7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R0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLFlBQVk7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLEtBQUs7UUFDYixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVTLHVCQUF1QjtRQUMvQixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCO2FBQzFCLGVBQWUsRUFBRTthQUNqQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O29IQTNSVSx1QkFBdUI7d0dBQXZCLHVCQUF1Qix1RkNoQ3BDLGl2SEE0SEE7MkZENUZhLHVCQUF1QjtrQkFMbkMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBRWQsdUJBQXVCLENBQUMsTUFBTTtvTEFTdEMsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBRdWlja09yZGVyRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3F1aWNrLW9yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgQ29uZmlnLCBQcm9kdWN0LCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcXVpY2stb3JkZXItZm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9xdWljay1vcmRlci1mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFF1aWNrT3JkZXJGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG4gIGlzU2VhcmNoaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIG5vUmVzdWx0czogYm9vbGVhbiA9IGZhbHNlO1xuICByZXN1bHRzOiBQcm9kdWN0W10gPSBbXTtcblxuICBASW5wdXQoKSBsaW1pdDogbnVtYmVyO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByb3RlY3RlZCBzZWFyY2hTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlnLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHF1aWNrT3JkZXJTZXJ2aWNlOiBRdWlja09yZGVyRmFjYWRlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5idWlsZEZvcm0oKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy53YXRjaFByb2R1Y3RBZGQoKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMud2F0Y2hRdWVyeUNoYW5nZSgpKTtcbiAgfVxuXG4gIG9uQmx1cihldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIC8vIFVzZSB0aW1lb3V0IHRvIGRldGVjdCBjaGFuZ2VzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaXNTdWdnZXN0aW9uRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMuYmx1clN1Z2dlc3Rpb25Cb3goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2xlYXIoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50Py5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRoaXMuaXNSZXN1bHRzQm94T3BlbigpKSB7XG4gICAgICB0aGlzLnRvZ2dsZUJvZHlDbGFzcygncXVpY2stb3JkZXItc2VhcmNoYm94LWlzLWFjdGl2ZScsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBsZXQgcHJvZHVjdCA9IHRoaXMuZm9ybS5nZXQoJ3Byb2R1Y3QnKT8udmFsdWU7XG5cbiAgICBpZiAoISFwcm9kdWN0KSB7XG4gICAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBoYXZlIHRvIGNhbGwgJ2Nsb3NlJyBtZXRob2QgZXZlcnkgdGltZSB0byBtYWtlIHN1cmUgcmVzdWx0cyBsaXN0IGlzIGVtcHR5IGFuZCBjYWxsIGRldGVjdENoYW5nZXMgdG8gY2hhbmdlIGljb24gdHlwZSBpbiBmb3JtXG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuY2Q/LmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGFkZChwcm9kdWN0OiBQcm9kdWN0LCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIFRPRE8gY2hhbmdlIHRvIG5vbnB1cmNoYXNhYmxlIGZsYWcgb25jZSB3ZSB3aWxsIHN1cHBvcnQgbXVsdGlkaW1lbnNpb25hbCBwcm9kdWN0cyBpbiBzZWFyY2ggYW5kIHdoZW4gdGhlIHB1cmNoYXNhYmxlIGZsYWcgd2lsbCBiZSBhdmFpbGFibGUgaW4gc2VhcmNoIHByb2R1Y3QgcmVzcG9uc2VcblxuICAgIC8vIENoZWNrIGlmIHByb2R1Y3QgaXMgcHVyY2hhc2FibGUgLyBub24gbXVsdGlkaW1lbnNpb25hbFxuICAgIGlmIChwcm9kdWN0Lm11bHRpZGltZW5zaW9uYWwpIHtcbiAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2Uuc2V0Tm9uUHVyY2hhc2FibGVQcm9kdWN0RXJyb3IocHJvZHVjdCk7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2UuY2xlYXJOb25QdXJjaGFzYWJsZVByb2R1Y3RFcnJvcigpO1xuICAgIH1cblxuICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2UuYWRkUHJvZHVjdChwcm9kdWN0KTtcbiAgfVxuXG4gIGFkZFByb2R1Y3QoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5xdWlja09yZGVyU2VydmljZVxuICAgICAgLmNhbkFkZCgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY2FuQWRkOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChjYW5BZGQpIHtcbiAgICAgICAgICAvLyBBZGQgcHJvZHVjdCBpZiB0aGVyZSBpcyBvbmx5IG9uZSBpbiB0aGUgcmVzdWx0IGxpc3RcbiAgICAgICAgICBpZiAodGhpcy5yZXN1bHRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5hZGQodGhpcy5yZXN1bHRzWzBdLCBldmVudCk7XG4gICAgICAgICAgICAvLyBBZGQgcHJvZHVjdCBpZiB0aGVyZSBpcyBmb2N1cyBvbiBpdFxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXRGb2N1c2VkSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLnJlc3VsdHNbdGhpcy5nZXRGb2N1c2VkSW5kZXgoKV07XG4gICAgICAgICAgICB0aGlzLmFkZChwcm9kdWN0LCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGZvY3VzTmV4dENoaWxkKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gTmVnYXRlIG5vcm1hbCBrZXlzY3JvbGxcbiAgICBpZiAoIXRoaXMucmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbcmVzdWx0cywgZm9jdXNlZEluZGV4XSA9IFtcbiAgICAgIHRoaXMuZ2V0UmVzdWx0RWxlbWVudHMoKSxcbiAgICAgIHRoaXMuZ2V0Rm9jdXNlZEluZGV4KCksXG4gICAgXTtcblxuICAgIC8vIEZvY3VzIG9uIGZpcnN0IGluZGV4IG1vdmluZyB0byBsYXN0XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICBpZiAoZm9jdXNlZEluZGV4ID49IHJlc3VsdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICByZXN1bHRzWzBdLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRzW2ZvY3VzZWRJbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9jdXNQcmV2aW91c0NoaWxkKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gTmVnYXRlIG5vcm1hbCBrZXlzY3JvbGxcbiAgICBpZiAoIXRoaXMucmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbcmVzdWx0cywgZm9jdXNlZEluZGV4XSA9IFtcbiAgICAgIHRoaXMuZ2V0UmVzdWx0RWxlbWVudHMoKSxcbiAgICAgIHRoaXMuZ2V0Rm9jdXNlZEluZGV4KCksXG4gICAgXTtcblxuICAgIC8vIEZvY3VzIG9uIGxhc3QgaW5kZXggbW92aW5nIHRvIGZpcnN0XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICBpZiAoZm9jdXNlZEluZGV4IDwgMSkge1xuICAgICAgICByZXN1bHRzW3Jlc3VsdHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdHNbZm9jdXNlZEluZGV4IC0gMV0uZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc1Jlc3VsdHNCb3hPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndpblJlZlxuICAgICAgPyAhIXRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWljay1vcmRlci1zZWFyY2hib3gtaXMtYWN0aXZlJylcbiAgICAgIDogZmFsc2U7XG4gIH1cblxuICBjYW5BZGRQcm9kdWN0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlLmNhbkFkZCgpO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZUJvZHlDbGFzcygncXVpY2stb3JkZXItc2VhcmNoYm94LWlzLWFjdGl2ZScsIHRydWUpO1xuICB9XG5cbiAgLy8gUmV0dXJuIHJlc3VsdCBsaXN0IGFzIEhUTUxFbGVtZW50IGFycmF5XG4gIHByb3RlY3RlZCBnZXRSZXN1bHRFbGVtZW50cygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICBpZiAodGhpcy53aW5SZWYpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgICB0aGlzLndpblJlZi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICcucXVpY2stb3JkZXItcmVzdWx0cy1wcm9kdWN0cyA+IGxpIGJ1dHRvbidcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBibHVyU3VnZ2VzdGlvbkJveChldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlQm9keUNsYXNzKCdxdWljay1vcmRlci1zZWFyY2hib3gtaXMtYWN0aXZlJywgZmFsc2UpO1xuXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCkge1xuICAgICAgKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLmJsdXIoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm4gZm9jdXNlZCBlbGVtZW50IGFzIEhUTUxFbGVtZW50XG4gIHByb3RlY3RlZCBnZXRGb2N1c2VkRWxlbWVudCgpOiBIVE1MRWxlbWVudCB8IGFueSB7XG4gICAgaWYgKHRoaXMud2luUmVmKSB7XG4gICAgICByZXR1cm4gPEhUTUxFbGVtZW50PnRoaXMud2luUmVmLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZvY3VzZWRJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldFJlc3VsdEVsZW1lbnRzKCkuaW5kZXhPZih0aGlzLmdldEZvY3VzZWRFbGVtZW50KCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzU3VnZ2VzdGlvbkZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVzdWx0RWxlbWVudHMoKS5pbmNsdWRlcyh0aGlzLmdldEZvY3VzZWRFbGVtZW50KCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRvZ2dsZUJvZHlDbGFzcyhjbGFzc05hbWU6IHN0cmluZywgYWRkPzogYm9vbGVhbikge1xuICAgIC8vIFRPRE8oIzE0MDU4KTogUmVtb3ZlIGNvbmRpdGlvblxuICAgIGlmICh0aGlzLndpblJlZikge1xuICAgICAgaWYgKGFkZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMud2luUmVmLmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXG4gICAgICAgICAgPyB0aGlzLndpblJlZi5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgICAgIDogdGhpcy53aW5SZWYuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkRm9ybSgpIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIGZvcm0uc2V0Q29udHJvbCgncHJvZHVjdCcsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wobnVsbCkpO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0VtcHR5KHN0cmluZz86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzdHJpbmc/LnRyaW0oKSA9PT0gJycgfHwgc3RyaW5nID09IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgd2F0Y2hRdWVyeUNoYW5nZSgpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgIGZpbHRlcigodmFsdWUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWc/LnF1aWNrT3JkZXI/LnNlYXJjaEZvcm0pIHtcbiAgICAgICAgICAgIC8vQ2hlY2sgaWYgaW5wdXQgdG8gcXVpY2sgb3JkZXIgaXMgYW4gZW1wdHkgYWZ0ZXIgZGVsZXRpbmcgaW5wdXQgbWFudWFsbHlcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkodmFsdWUucHJvZHVjdCkpIHtcbiAgICAgICAgICAgICAgLy9DbGVhciByZWNvbW1lbmRhdGlvbiByZXN1bHRzIG9uIGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICEhdmFsdWUucHJvZHVjdCAmJlxuICAgICAgICAgICAgICB2YWx1ZS5wcm9kdWN0Lmxlbmd0aCA+PVxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnF1aWNrT3JkZXI/LnNlYXJjaEZvcm0/Lm1pbkNoYXJhY3RlcnNCZWZvcmVSZXF1ZXN0XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoUHJvZHVjdHModmFsdWUucHJvZHVjdCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZWFyY2hQcm9kdWN0cyhxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hTdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5jYW5BZGRQcm9kdWN0KClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKEJvb2xlYW4pLFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgICAgdGhpcy5xdWlja09yZGVyU2VydmljZVxuICAgICAgICAgICAgICAuc2VhcmNoUHJvZHVjdHMoXG4gICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWc/LnF1aWNrT3JkZXI/LnNlYXJjaEZvcm0/Lm1heFByb2R1Y3RzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgocHJvZHVjdHMpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc3VsdHMgPSBwcm9kdWN0cztcblxuICAgICAgICAgIGlmICh0aGlzLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5vUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9SZXN1bHRzID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNkPy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjbGVhclJlc3VsdHMoKTogdm9pZCB7XG4gICAgdGhpcy5yZXN1bHRzID0gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldFNlYXJjaFN1YnNjcmlwdGlvbigpO1xuICAgIHRoaXMuY2xlYXJSZXN1bHRzKCk7XG4gICAgdGhpcy5ub1Jlc3VsdHMgPSBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXNldFNlYXJjaFN1YnNjcmlwdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc2VhcmNoU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHdhdGNoUHJvZHVjdEFkZCgpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlXG4gICAgICAuZ2V0UHJvZHVjdEFkZGVkKClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhcigpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxmb3JtIFtmb3JtR3JvdXBdPVwiZm9ybVwiIGNsYXNzPVwicXVpY2stb3JkZXItZm9ybS1jb250YWluZXJcIj5cbiAgPGRpdlxuICAgIGNsYXNzPVwicXVpY2stb3JkZXItZm9ybS1pbnB1dFwiXG4gICAgcm9sZT1cInNlYXJjaFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCIncXVpY2tPcmRlckZvcm0ucXVpY2tPcmRlclNlYXJjaCcgfCBjeFRyYW5zbGF0ZVwiXG4gID5cbiAgICA8aW5wdXRcbiAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICAgIChmb2N1cyk9XCJvcGVuKClcIlxuICAgICAgKGtleWRvd24uYXJyb3dkb3duKT1cImZvY3VzTmV4dENoaWxkKCRldmVudClcIlxuICAgICAgKGtleWRvd24uYXJyb3d1cCk9XCJmb2N1c1ByZXZpb3VzQ2hpbGQoJGV2ZW50KVwiXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJhZGRQcm9kdWN0KCRldmVudClcIlxuICAgICAgKGtleWRvd24uZXNjYXBlKT1cImNsZWFyKCRldmVudClcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgJ3F1aWNrT3JkZXJGb3JtLnNlYXJjaEJveExhYmVsJyB8IGN4VHJhbnNsYXRlOiB7IGxpbWl0OiBsaW1pdCB9XG4gICAgICBcIlxuICAgICAgYXJpYS1jb250cm9scz1cInJlc3VsdHNcIlxuICAgICAgYXJpYS1kZXNjcmliZWRieT1cInF1aWNrT3JkZXJGb3JtSW5pdGlhbERlc2NyaXB0aW9uXCJcbiAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIGZvcm1Db250cm9sTmFtZT1cInByb2R1Y3RcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJ7eyAncXVpY2tPcmRlckZvcm0ucGxhY2Vob2xkZXInIHwgY3hUcmFuc2xhdGUgfX1cIlxuICAgICAgdHlwZT1cInRleHRcIlxuICAgIC8+XG5cbiAgICA8YnV0dG9uXG4gICAgICAqbmdJZj1cImZvcm0uZ2V0KCdwcm9kdWN0Jyk/LnZhbHVlOyBlbHNlIHNlYXJjaEljb25cIlxuICAgICAgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIlxuICAgICAgKGtleWRvd24uZW50ZXIpPVwiY2xlYXIoJGV2ZW50KVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24ucmVzZXQnIHwgY3hUcmFuc2xhdGVcIlxuICAgICAgY2xhc3M9XCJxdWljay1vcmRlci1mb3JtLXJlc2V0LWljb25cIlxuICAgID5cbiAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5SRVNFVFwiPjwvY3gtaWNvbj5cbiAgICA8L2J1dHRvbj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjc2VhcmNoSWNvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLnNlYXJjaCcgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICAgIGNsYXNzPVwicXVpY2stb3JkZXItZm9ybS1zZWFyY2gtaWNvblwiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgPlxuICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuU0VBUkNIXCI+PC9jeC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxzcGFuXG4gICAgICAqbmdJZj1cIiEoY2FuQWRkUHJvZHVjdCgpIHwgYXN5bmMpICYmIGZvcm0uZ2V0KCdwcm9kdWN0Jyk/LmRpcnR5XCJcbiAgICAgIGNsYXNzPVwibGlzdC1saW1pdC1yZWFjaGVkLXRleHRcIlxuICAgICAgcm9sZT1cImFsZXJ0XCJcbiAgICA+XG4gICAgICB7eyAncXVpY2tPcmRlckZvcm0ubGlzdExpbWl0UmVhY2hlZCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPGRpdlxuICAgICpuZ0lmPVwiaXNSZXN1bHRzQm94T3BlbigpXCJcbiAgICBjbGFzcz1cInF1aWNrLW9yZGVyLXJlc3VsdHNcIlxuICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgIGlkPVwicmVzdWx0c1wiXG4gID5cbiAgICA8dWxcbiAgICAgICpuZ0lmPVwicmVzdWx0cy5sZW5ndGhcIlxuICAgICAgY2xhc3M9XCJxdWljay1vcmRlci1yZXN1bHRzLXByb2R1Y3RzXCJcbiAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICA+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IHByb2R1Y3Qgb2YgcmVzdWx0czsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwicXVpY2stb3JkZXItcmVzdWx0cy1wcm9kdWN0LWNvbnRhaW5lclwiXG4gICAgICA+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgKGNsaWNrKT1cImFkZChwcm9kdWN0LCAkZXZlbnQpXCJcbiAgICAgICAgICAoa2V5ZG93bi5hcnJvd2Rvd24pPVwiZm9jdXNOZXh0Q2hpbGQoJGV2ZW50KVwiXG4gICAgICAgICAgKGtleWRvd24uYXJyb3d1cCk9XCJmb2N1c1ByZXZpb3VzQ2hpbGQoJGV2ZW50KVwiXG4gICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiYWRkKHByb2R1Y3QsICRldmVudClcIlxuICAgICAgICAgIChrZXlkb3duLmVzY2FwZSk9XCJjbGVhcigkZXZlbnQpXCJcbiAgICAgICAgICBbY2xhc3MuaGFzLW1lZGlhXT1cIlxuICAgICAgICAgICAgY29uZmlnPy5xdWlja09yZGVyPy5zZWFyY2hGb3JtPy5kaXNwbGF5UHJvZHVjdEltYWdlc1xuICAgICAgICAgIFwiXG4gICAgICAgICAgY2xhc3M9XCJxdWljay1vcmRlci1yZXN1bHRzLXByb2R1Y3RcIlxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICA+XG4gICAgICAgICAgPGN4LW1lZGlhXG4gICAgICAgICAgICAqbmdJZj1cImNvbmZpZz8ucXVpY2tPcmRlcj8uc2VhcmNoRm9ybT8uZGlzcGxheVByb2R1Y3RJbWFnZXNcIlxuICAgICAgICAgICAgW2FsdF09XCJwcm9kdWN0Lm5hbWVcIlxuICAgICAgICAgICAgW2NvbnRhaW5lcl09XCJwcm9kdWN0LmltYWdlcz8uUFJJTUFSWVwiXG4gICAgICAgICAgICBjbGFzcz1cIm1lZGlhXCJcbiAgICAgICAgICAgIGZvcm1hdD1cInRodW1ibmFpbFwiXG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICA+PC9jeC1tZWRpYT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiIFtpbm5lckhUTUxdPVwicHJvZHVjdC5uYW1lXCI+PC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJpZFwiPlxuICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgJ3F1aWNrT3JkZXJGb3JtLmlkJ1xuICAgICAgICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9kdWN0LmNvZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZVwiPnt7IHByb2R1Y3QucHJpY2U/LmZvcm1hdHRlZFZhbHVlIH19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cblxuICAgIDxzcGFuICpuZ0lmPVwibm9SZXN1bHRzXCIgY2xhc3M9XCJxdWljay1vcmRlci1uby1yZXN1bHRzXCI+XG4gICAgICB7eyAncXVpY2tPcmRlckZvcm0ubm9SZXN1bHRzJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbjwvZm9ybT5cblxuPGxhYmVsXG4gIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gIGlkPVwicXVpY2tPcmRlckZvcm1Jbml0aWFsRGVzY3JpcHRpb25cIlxuICBhcmlhLWF0b21pYz1cInRydWVcIlxuICBjbGFzcz1cImN4LXZpc3VhbGx5LWhpZGRlblwiXG4+XG4gIHt7XG4gICAgcmVzdWx0cy5sZW5ndGhcbiAgICAgID8gKCdxdWlja09yZGVyRm9ybS5wcm9kdWN0c1Jlc3VsdHMnXG4gICAgICAgIHwgY3hUcmFuc2xhdGU6IHsgY291bnQ6IHJlc3VsdHMubGVuZ3RoIH0pXG4gICAgICA6ICcnXG4gIH19XG4gIHt7ICdxdWlja09yZGVyRm9ybS5pbml0aWFsRGVzY3JpcHRpb24nIHwgY3hUcmFuc2xhdGUgfX1cbjwvbGFiZWw+XG4iXX0=