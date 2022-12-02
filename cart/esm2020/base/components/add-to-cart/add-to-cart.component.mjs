/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Optional, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CartUiEventAddToCart, } from '@spartacus/cart/base/root';
import { isNotNullable, } from '@spartacus/core';
import { filter, map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
export class AddToCartComponent {
    constructor(currentProductService, cd, activeCartService, component, eventService, productListItemContext) {
        this.currentProductService = currentProductService;
        this.cd = cd;
        this.activeCartService = activeCartService;
        this.component = component;
        this.eventService = eventService;
        this.productListItemContext = productListItemContext;
        this.showQuantity = true;
        this.hasStock = false;
        this.inventoryThreshold = false;
        this.showInventory$ = this.component?.data$.pipe(map((data) => data.inventoryDisplay));
        this.quantity = 1;
        this.addToCartForm = new UntypedFormGroup({
            quantity: new UntypedFormControl(1, { updateOn: 'blur' }),
        });
    }
    ngOnInit() {
        if (this.product) {
            this.productCode = this.product.code ?? '';
            this.setStockInfo(this.product);
            this.cd.markForCheck();
        }
        else if (this.productCode) {
            // force hasStock and quantity for the time being, as we do not have more info:
            this.quantity = 1;
            this.hasStock = true;
            this.cd.markForCheck();
        }
        else {
            this.subscription = (this.productListItemContext
                ? this.productListItemContext.product$
                : this.currentProductService.getProduct())
                .pipe(filter(isNotNullable))
                .subscribe((product) => {
                this.productCode = product.code ?? '';
                this.setStockInfo(product);
                this.cd.markForCheck();
            });
        }
    }
    setStockInfo(product) {
        this.quantity = 1;
        this.hasStock = Boolean(product.stock?.stockLevelStatus !== 'outOfStock');
        this.inventoryThreshold = product.stock?.isValueRounded ?? false;
        if (this.hasStock && product.stock?.stockLevel) {
            this.maxQuantity = product.stock.stockLevel;
        }
        if (this.productListItemContext) {
            this.showQuantity = false;
        }
    }
    /**
     * In specific scenarios, we need to omit displaying the stock level or append a plus to the value.
     * When backoffice forces a product to be in stock, omit showing the stock level.
     * When product stock level is limited by a threshold value, append '+' at the end.
     * When out of stock, display no numerical value.
     */
    getInventory() {
        if (this.hasStock) {
            const quantityDisplay = this.maxQuantity
                ? this.maxQuantity.toString()
                : '';
            return this.inventoryThreshold ? quantityDisplay + '+' : quantityDisplay;
        }
        else {
            return '';
        }
    }
    updateCount(value) {
        this.quantity = value;
    }
    addToCart() {
        const quantity = this.addToCartForm.get('quantity')?.value;
        if (!this.productCode || quantity <= 0) {
            return;
        }
        this.activeCartService
            .getEntries()
            .pipe(take(1))
            .subscribe((cartEntries) => {
            this.activeCartService.addEntry(this.productCode, quantity);
            // A CartUiEventAddToCart is dispatched.  This event is intended for the UI
            // responsible to provide feedback about what was added to the cart, like
            // the added to cart dialog.
            //
            // Because we call activeCartService.getEntries() before, we can be sure the
            // cart library is loaded already and that the event listener exists.
            this.eventService.dispatch(this.createCartUiEventAddToCart(this.productCode, quantity, cartEntries.length));
        });
    }
    createCartUiEventAddToCart(productCode, quantity, numberOfEntriesBeforeAdd) {
        const newEvent = new CartUiEventAddToCart();
        newEvent.productCode = productCode;
        newEvent.quantity = quantity;
        newEvent.numberOfEntriesBeforeAdd = numberOfEntriesBeforeAdd;
        return newEvent;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
AddToCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddToCartComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.ChangeDetectorRef }, { token: i2.ActiveCartFacade }, { token: i1.CmsComponentData }, { token: i3.EventService }, { token: i1.ProductListItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AddToCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AddToCartComponent, selector: "cx-add-to-cart", inputs: { productCode: "productCode", showQuantity: "showQuantity", options: "options", product: "product" }, ngImport: i0, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'link cx-action-link'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddToCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'link cx-action-link'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.ChangeDetectorRef }, { type: i2.ActiveCartFacade }, { type: i1.CmsComponentData }, { type: i3.EventService }, { type: i1.ProductListItemContext, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { productCode: [{
                type: Input
            }], showQuantity: [{
                type: Input
            }], options: [{
                type: Input
            }], product: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWNhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2FkZC10by1jYXJ0L2FkZC10by1jYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9hZGQtdG8tY2FydC9hZGQtdG8tY2FydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBR0wsb0JBQW9CLEdBQ3JCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUdMLGFBQWEsR0FFZCxNQUFNLGlCQUFpQixDQUFDO0FBT3pCLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBT25ELE1BQU0sT0FBTyxrQkFBa0I7SUEwQjdCLFlBQ1kscUJBQTRDLEVBQzVDLEVBQXFCLEVBQ3JCLGlCQUFtQyxFQUNuQyxTQUFrRCxFQUNsRCxZQUEwQixFQUNkLHNCQUErQztRQUwzRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsY0FBUyxHQUFULFNBQVMsQ0FBeUM7UUFDbEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDZCwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1FBOUI5RCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQVU3QixhQUFR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QUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzsrR0E1SVUsa0JBQWtCO21HQUFsQixrQkFBa0Isb0tDeEMvQixzaENBa0NBOzJGRE1hLGtCQUFrQjtrQkFMOUIsU0FBUzsrQkFDRSxnQkFBZ0IsbUJBRVQsdUJBQXVCLENBQUMsTUFBTTs7MEJBa0M1QyxRQUFROzRDQS9CRixXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUtHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIENhcnRJdGVtQ29tcG9uZW50T3B0aW9ucyxcbiAgQ2FydFVpRXZlbnRBZGRUb0NhcnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ21zQWRkVG9DYXJ0Q29tcG9uZW50LFxuICBFdmVudFNlcnZpY2UsXG4gIGlzTm90TnVsbGFibGUsXG4gIFByb2R1Y3QsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb21wb25lbnREYXRhLFxuICBDdXJyZW50UHJvZHVjdFNlcnZpY2UsXG4gIFByb2R1Y3RMaXN0SXRlbUNvbnRleHQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1hZGQtdG8tY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hZGQtdG8tY2FydC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRUb0NhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHByb2R1Y3RDb2RlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3dRdWFudGl0eSA9IHRydWU7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENhcnRJdGVtQ29tcG9uZW50T3B0aW9ucztcbiAgLyoqXG4gICAqIEFzIGxvbmcgYXMgd2UgZG8gbm90IHN1cHBvcnQgIzUwMjYsIHdlIHJlcXVpcmUgcHJvZHVjdCBpbnB1dCwgYXMgd2UgbmVlZFxuICAgKiAgYSByZWZlcmVuY2UgdG8gdGhlIHByb2R1Y3QgbW9kZWwgdG8gZmV0Y2ggdGhlIHN0b2NrIGRhdGEuXG4gICAqL1xuICBASW5wdXQoKSBwcm9kdWN0OiBQcm9kdWN0O1xuXG4gIG1heFF1YW50aXR5OiBudW1iZXI7XG5cbiAgaGFzU3RvY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW52ZW50b3J5VGhyZXNob2xkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgc2hvd0ludmVudG9yeSQ6IE9ic2VydmFibGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD4gfCB1bmRlZmluZWQgPVxuICAgIHRoaXMuY29tcG9uZW50Py5kYXRhJC5waXBlKG1hcCgoZGF0YSkgPT4gZGF0YS5pbnZlbnRvcnlEaXNwbGF5KSk7XG5cbiAgcXVhbnRpdHkgPSAxO1xuXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGFkZFRvQ2FydEZvcm0gPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgcXVhbnRpdHk6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woMSwgeyB1cGRhdGVPbjogJ2JsdXInIH0pLFxuICB9KTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VycmVudFByb2R1Y3RTZXJ2aWNlOiBDdXJyZW50UHJvZHVjdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydFNlcnZpY2U6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudDogQ21zQ29tcG9uZW50RGF0YTxDbXNBZGRUb0NhcnRDb21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgcHJvZHVjdExpc3RJdGVtQ29udGV4dD86IFByb2R1Y3RMaXN0SXRlbUNvbnRleHRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnByb2R1Y3QpIHtcbiAgICAgIHRoaXMucHJvZHVjdENvZGUgPSB0aGlzLnByb2R1Y3QuY29kZSA/PyAnJztcbiAgICAgIHRoaXMuc2V0U3RvY2tJbmZvKHRoaXMucHJvZHVjdCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9kdWN0Q29kZSkge1xuICAgICAgLy8gZm9yY2UgaGFzU3RvY2sgYW5kIHF1YW50aXR5IGZvciB0aGUgdGltZSBiZWluZywgYXMgd2UgZG8gbm90IGhhdmUgbW9yZSBpbmZvOlxuICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgICB0aGlzLmhhc1N0b2NrID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gKFxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0SXRlbUNvbnRleHRcbiAgICAgICAgICA/IHRoaXMucHJvZHVjdExpc3RJdGVtQ29udGV4dC5wcm9kdWN0JFxuICAgICAgICAgIDogdGhpcy5jdXJyZW50UHJvZHVjdFNlcnZpY2UuZ2V0UHJvZHVjdCgpXG4gICAgICApXG4gICAgICAgIC5waXBlKGZpbHRlcihpc05vdE51bGxhYmxlKSlcbiAgICAgICAgLnN1YnNjcmliZSgocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvZHVjdENvZGUgPSBwcm9kdWN0LmNvZGUgPz8gJyc7XG4gICAgICAgICAgdGhpcy5zZXRTdG9ja0luZm8ocHJvZHVjdCk7XG4gICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHNldFN0b2NrSW5mbyhwcm9kdWN0OiBQcm9kdWN0KTogdm9pZCB7XG4gICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgdGhpcy5oYXNTdG9jayA9IEJvb2xlYW4ocHJvZHVjdC5zdG9jaz8uc3RvY2tMZXZlbFN0YXR1cyAhPT0gJ291dE9mU3RvY2snKTtcblxuICAgIHRoaXMuaW52ZW50b3J5VGhyZXNob2xkID0gcHJvZHVjdC5zdG9jaz8uaXNWYWx1ZVJvdW5kZWQgPz8gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5oYXNTdG9jayAmJiBwcm9kdWN0LnN0b2NrPy5zdG9ja0xldmVsKSB7XG4gICAgICB0aGlzLm1heFF1YW50aXR5ID0gcHJvZHVjdC5zdG9jay5zdG9ja0xldmVsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb2R1Y3RMaXN0SXRlbUNvbnRleHQpIHtcbiAgICAgIHRoaXMuc2hvd1F1YW50aXR5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluIHNwZWNpZmljIHNjZW5hcmlvcywgd2UgbmVlZCB0byBvbWl0IGRpc3BsYXlpbmcgdGhlIHN0b2NrIGxldmVsIG9yIGFwcGVuZCBhIHBsdXMgdG8gdGhlIHZhbHVlLlxuICAgKiBXaGVuIGJhY2tvZmZpY2UgZm9yY2VzIGEgcHJvZHVjdCB0byBiZSBpbiBzdG9jaywgb21pdCBzaG93aW5nIHRoZSBzdG9jayBsZXZlbC5cbiAgICogV2hlbiBwcm9kdWN0IHN0b2NrIGxldmVsIGlzIGxpbWl0ZWQgYnkgYSB0aHJlc2hvbGQgdmFsdWUsIGFwcGVuZCAnKycgYXQgdGhlIGVuZC5cbiAgICogV2hlbiBvdXQgb2Ygc3RvY2ssIGRpc3BsYXkgbm8gbnVtZXJpY2FsIHZhbHVlLlxuICAgKi9cbiAgZ2V0SW52ZW50b3J5KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaGFzU3RvY2spIHtcbiAgICAgIGNvbnN0IHF1YW50aXR5RGlzcGxheSA9IHRoaXMubWF4UXVhbnRpdHlcbiAgICAgICAgPyB0aGlzLm1heFF1YW50aXR5LnRvU3RyaW5nKClcbiAgICAgICAgOiAnJztcbiAgICAgIHJldHVybiB0aGlzLmludmVudG9yeVRocmVzaG9sZCA/IHF1YW50aXR5RGlzcGxheSArICcrJyA6IHF1YW50aXR5RGlzcGxheTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNvdW50KHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnF1YW50aXR5ID0gdmFsdWU7XG4gIH1cblxuICBhZGRUb0NhcnQoKSB7XG4gICAgY29uc3QgcXVhbnRpdHkgPSB0aGlzLmFkZFRvQ2FydEZvcm0uZ2V0KCdxdWFudGl0eScpPy52YWx1ZTtcbiAgICBpZiAoIXRoaXMucHJvZHVjdENvZGUgfHwgcXVhbnRpdHkgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgIC5nZXRFbnRyaWVzKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChjYXJ0RW50cmllcykgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmFkZEVudHJ5KHRoaXMucHJvZHVjdENvZGUsIHF1YW50aXR5KTtcblxuICAgICAgICAvLyBBIENhcnRVaUV2ZW50QWRkVG9DYXJ0IGlzIGRpc3BhdGNoZWQuICBUaGlzIGV2ZW50IGlzIGludGVuZGVkIGZvciB0aGUgVUlcbiAgICAgICAgLy8gcmVzcG9uc2libGUgdG8gcHJvdmlkZSBmZWVkYmFjayBhYm91dCB3aGF0IHdhcyBhZGRlZCB0byB0aGUgY2FydCwgbGlrZVxuICAgICAgICAvLyB0aGUgYWRkZWQgdG8gY2FydCBkaWFsb2cuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEJlY2F1c2Ugd2UgY2FsbCBhY3RpdmVDYXJ0U2VydmljZS5nZXRFbnRyaWVzKCkgYmVmb3JlLCB3ZSBjYW4gYmUgc3VyZSB0aGVcbiAgICAgICAgLy8gY2FydCBsaWJyYXJ5IGlzIGxvYWRlZCBhbHJlYWR5IGFuZCB0aGF0IHRoZSBldmVudCBsaXN0ZW5lciBleGlzdHMuXG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgIHRoaXMuY3JlYXRlQ2FydFVpRXZlbnRBZGRUb0NhcnQoXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RDb2RlLFxuICAgICAgICAgICAgcXVhbnRpdHksXG4gICAgICAgICAgICBjYXJ0RW50cmllcy5sZW5ndGhcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDYXJ0VWlFdmVudEFkZFRvQ2FydChcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHF1YW50aXR5OiBudW1iZXIsXG4gICAgbnVtYmVyT2ZFbnRyaWVzQmVmb3JlQWRkOiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgbmV3RXZlbnQgPSBuZXcgQ2FydFVpRXZlbnRBZGRUb0NhcnQoKTtcbiAgICBuZXdFdmVudC5wcm9kdWN0Q29kZSA9IHByb2R1Y3RDb2RlO1xuICAgIG5ld0V2ZW50LnF1YW50aXR5ID0gcXVhbnRpdHk7XG4gICAgbmV3RXZlbnQubnVtYmVyT2ZFbnRyaWVzQmVmb3JlQWRkID0gbnVtYmVyT2ZFbnRyaWVzQmVmb3JlQWRkO1xuICAgIHJldHVybiBuZXdFdmVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxmb3JtICpuZ0lmPVwicHJvZHVjdENvZGVcIiBbZm9ybUdyb3VwXT1cImFkZFRvQ2FydEZvcm1cIiAoc3VibWl0KT1cImFkZFRvQ2FydCgpXCI+XG4gIDxkaXYgY2xhc3M9XCJxdWFudGl0eVwiICpuZ0lmPVwic2hvd1F1YW50aXR5XCI+XG4gICAgPGxhYmVsPnt7ICdhZGRUb0NhcnQucXVhbnRpdHknIHwgY3hUcmFuc2xhdGUgfX08L2xhYmVsPlxuICAgIDxkaXYgY2xhc3M9XCJjeC1jb3VudGVyLXN0b2NrXCI+XG4gICAgICA8Y3gtaXRlbS1jb3VudGVyXG4gICAgICAgICpuZ0lmPVwiaGFzU3RvY2tcIlxuICAgICAgICBbbWF4XT1cIm1heFF1YW50aXR5XCJcbiAgICAgICAgW2NvbnRyb2xdPVwiYWRkVG9DYXJ0Rm9ybS5nZXQoJ3F1YW50aXR5JylcIlxuICAgICAgPjwvY3gtaXRlbS1jb3VudGVyPlxuXG4gICAgICA8c3BhbiBjbGFzcz1cImluZm9cIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93SW52ZW50b3J5JCB8IGFzeW5jXCI+e3sgZ2V0SW52ZW50b3J5KCkgfX08L3NwYW4+XG4gICAgICAgIHt7XG4gICAgICAgICAgaGFzU3RvY2tcbiAgICAgICAgICAgID8gKCdhZGRUb0NhcnQuaW5TdG9jaycgfCBjeFRyYW5zbGF0ZSlcbiAgICAgICAgICAgIDogKCdhZGRUb0NhcnQub3V0T2ZTdG9jaycgfCBjeFRyYW5zbGF0ZSlcbiAgICAgICAgfX08L3NwYW5cbiAgICAgID5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGJ1dHRvblxuICAgICpuZ0lmPVwiaGFzU3RvY2tcIlxuICAgIFtuZ0NsYXNzXT1cIlxuICAgICAgb3B0aW9ucz8uZGlzcGxheUFkZFRvQ2FydFxuICAgICAgICA/ICdsaW5rIGN4LWFjdGlvbi1saW5rJ1xuICAgICAgICA6ICdidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrJ1xuICAgIFwiXG4gICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgW2Rpc2FibGVkXT1cInF1YW50aXR5IDw9IDAgfHwgcXVhbnRpdHkgPiBtYXhRdWFudGl0eVwiXG4gID5cbiAgICB7eyBvcHRpb25zPy5hZGRUb0NhcnRTdHJpbmcgPz8gKCdhZGRUb0NhcnQuYWRkVG9DYXJ0JyB8IGN4VHJhbnNsYXRlKSB9fVxuICA8L2J1dHRvbj5cbjwvZm9ybT5cbiJdfQ==