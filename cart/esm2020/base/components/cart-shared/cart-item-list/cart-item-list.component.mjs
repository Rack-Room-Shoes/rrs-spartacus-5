/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Optional, } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PromotionLocation, } from '@spartacus/cart/base/root';
import { Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
import * as i5 from "../cart-item-list-row/cart-item-list-row.component";
export class CartItemListComponent {
    constructor(activeCartService, selectiveCartService, userIdService, multiCartService, cd, outlet) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.cd = cd;
        this.outlet = outlet;
        this.subscription = new Subscription();
        this.readonly = false;
        this.hasHeader = true;
        this.options = {
            isSaveForLater: false,
            optionalBtn: null,
            displayAddToCart: false,
        };
        this._items = [];
        this.form = new UntypedFormGroup({});
        this.promotionLocation = PromotionLocation.ActiveCart;
    }
    set items(items) {
        this.resolveItems(items);
        this.createForm();
    }
    get items() {
        return this._items;
    }
    set setLoading(value) {
        if (!this.readonly) {
            // Whenever the cart is loading, we disable the complete form
            // to avoid any user interaction with the cart.
            value
                ? this.form.disable({ emitEvent: false })
                : this.form.enable({ emitEvent: false });
            this.cd.markForCheck();
        }
    }
    ngOnInit() {
        this.subscription.add(this.getInputsFromContext());
        this.subscription.add(this.userIdService
            ?.getUserId()
            .subscribe((userId) => (this.userId = userId)));
    }
    getInputsFromContext() {
        return this.outlet?.context$.subscribe((context) => {
            if (context.readonly !== undefined) {
                this.readonly = context.readonly;
            }
            if (context.hasHeader !== undefined) {
                this.hasHeader = context.hasHeader;
            }
            if (context.options !== undefined) {
                this.options = context.options;
            }
            if (context.cartId !== undefined) {
                this.cartId = context.cartId;
            }
            if (context.items !== undefined) {
                this.items = context.items;
            }
            if (context.promotionLocation !== undefined) {
                this.promotionLocation = context.promotionLocation;
            }
            if (context.cartIsLoading !== undefined) {
                this.setLoading = context.cartIsLoading;
            }
        });
    }
    /**
     * Resolves items passed to component input and updates 'items' field
     */
    resolveItems(items) {
        if (!items) {
            this._items = [];
            return;
        }
        // The items we're getting from the input do not have a consistent model.
        // In case of a `consignmentEntry`, we need to normalize the data from the orderEntry.
        if (items.every((item) => item.hasOwnProperty('orderEntry'))) {
            this._items = items.map((consignmentEntry) => {
                const entry = Object.assign({}, consignmentEntry.orderEntry);
                entry.quantity = consignmentEntry.quantity;
                return entry;
            });
        }
        else {
            // We'd like to avoid the unnecessary re-renders of unchanged cart items after the data reload.
            // OCC cart entries don't have any unique identifier that we could use in Angular `trackBy`.
            // So we update each array element to the new object only when it's any different to the previous one.
            for (let i = 0; i < Math.max(items.length, this._items.length); i++) {
                if (JSON.stringify(this._items?.[i]) !== JSON.stringify(items[i])) {
                    if (this._items[i] && this.form) {
                        this.form.removeControl(this.getControlName(this._items[i]));
                    }
                    if (!items[i]) {
                        this._items.splice(i, 1);
                        i--;
                    }
                    else {
                        this._items[i] = items[i];
                    }
                }
            }
        }
    }
    /**
     * Creates form models for list items
     */
    createForm() {
        this._items.forEach((item) => {
            const controlName = this.getControlName(item);
            const control = this.form.get(controlName);
            if (control) {
                if (control.get('quantity')?.value !== item.quantity) {
                    control.patchValue({ quantity: item.quantity }, { emitEvent: false });
                }
            }
            else {
                const group = new UntypedFormGroup({
                    entryNumber: new UntypedFormControl(item.entryNumber),
                    quantity: new UntypedFormControl(item.quantity, { updateOn: 'blur' }),
                });
                this.form.addControl(controlName, group);
            }
            // If we disable form group before adding, disabled status will reset
            // Which forces us to disable control after including to form object
            if (!item.updateable || this.readonly) {
                this.form.controls[controlName].disable();
            }
        });
    }
    getControlName(item) {
        return item.entryNumber?.toString() || '';
    }
    removeEntry(item) {
        if (this.options.isSaveForLater) {
            this.selectiveCartService.removeEntry(item);
        }
        else if (this.cartId && this.userId) {
            this.multiCartService.removeEntry(this.userId, this.cartId, item.entryNumber);
        }
        else {
            this.activeCartService.removeEntry(item);
        }
        delete this.form.controls[this.getControlName(item)];
    }
    getControl(item) {
        return this.form.get(this.getControlName(item))?.valueChanges.pipe(
        // eslint-disable-next-line import/no-deprecated
        startWith(null), tap((value) => {
            if (item.updateable && value && !this.readonly) {
                if (this.options.isSaveForLater) {
                    this.selectiveCartService.updateEntry(value.entryNumber, value.quantity);
                }
                else if (this.cartId && this.userId) {
                    this.multiCartService.updateEntry(this.userId, this.cartId, value.entryNumber, value.quantity);
                }
                else {
                    this.activeCartService.updateEntry(value.entryNumber, value.quantity);
                }
            }
        }), map(() => this.form.get(this.getControlName(item))));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CartItemListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartItemListComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i1.SelectiveCartFacade }, { token: i2.UserIdService }, { token: i1.MultiCartFacade }, { token: i0.ChangeDetectorRef }, { token: i3.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CartItemListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CartItemListComponent, selector: "cx-cart-item-list", inputs: { readonly: "readonly", hasHeader: "hasHeader", options: "options", cartId: "cartId", items: "items", promotionLocation: "promotionLocation", setLoading: ["cartIsLoading", "setLoading"] }, ngImport: i0, template: "<table role=\"table\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'cartItems.caption' | cxTranslate\n    }}\n  </caption>\n  <thead *ngIf=\"hasHeader\">\n    <tr role=\"row\" class=\"cx-item-list-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'cartItems.description' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'cartItems.quantity' | cxTranslate }}\n      </th>\n      <ng-container *ngIf=\"options.isSaveForLater; else totalHeader\">\n        <th role=\"columnheader\" class=\"cx-item-list-total\">\n          {{ 'saveForLaterItems.stock' | cxTranslate }}\n        </th>\n      </ng-container>\n      <ng-container\n        *ngIf=\"!readonly || options.isSaveForLater || options.displayAddToCart\"\n      >\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </ng-container>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <ng-container *ngFor=\"let item of items; let i = index\">\n      <ng-container\n        *ngIf=\"getControl(item) | async as control\"\n        [class.is-changed]=\"control.get('quantity').disabled\"\n      >\n        <tr\n          cx-cart-item-list-row\n          role=\"row\"\n          class=\"cx-item-list-row\"\n          [item]=\"item\"\n          [quantityControl]=\"control.get('quantity')\"\n          [readonly]=\"readonly\"\n          [promotionLocation]=\"promotionLocation\"\n          [options]=\"options\"\n        ></tr>\n      </ng-container>\n    </ng-container>\n  </tbody>\n</table>\n\n<ng-template #totalHeader>\n  <th role=\"columnheader\" class=\"cx-item-list-total\">\n    {{ 'cartItems.total' | cxTranslate }}\n  </th>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.CartItemListRowComponent, selector: "[cx-cart-item-list-row], cx-cart-item-list-row" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartItemListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-item-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table role=\"table\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'cartItems.caption' | cxTranslate\n    }}\n  </caption>\n  <thead *ngIf=\"hasHeader\">\n    <tr role=\"row\" class=\"cx-item-list-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'cartItems.description' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'cartItems.quantity' | cxTranslate }}\n      </th>\n      <ng-container *ngIf=\"options.isSaveForLater; else totalHeader\">\n        <th role=\"columnheader\" class=\"cx-item-list-total\">\n          {{ 'saveForLaterItems.stock' | cxTranslate }}\n        </th>\n      </ng-container>\n      <ng-container\n        *ngIf=\"!readonly || options.isSaveForLater || options.displayAddToCart\"\n      >\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </ng-container>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <ng-container *ngFor=\"let item of items; let i = index\">\n      <ng-container\n        *ngIf=\"getControl(item) | async as control\"\n        [class.is-changed]=\"control.get('quantity').disabled\"\n      >\n        <tr\n          cx-cart-item-list-row\n          role=\"row\"\n          class=\"cx-item-list-row\"\n          [item]=\"item\"\n          [quantityControl]=\"control.get('quantity')\"\n          [readonly]=\"readonly\"\n          [promotionLocation]=\"promotionLocation\"\n          [options]=\"options\"\n        ></tr>\n      </ng-container>\n    </ng-container>\n  </tbody>\n</table>\n\n<ng-template #totalHeader>\n  <th role=\"columnheader\" class=\"cx-item-list-total\">\n    {{ 'cartItems.total' | cxTranslate }}\n  </th>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i1.SelectiveCartFacade }, { type: i2.UserIdService }, { type: i1.MultiCartFacade }, { type: i0.ChangeDetectorRef }, { type: i3.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { readonly: [{
                type: Input
            }], hasHeader: [{
                type: Input
            }], options: [{
                type: Input
            }], cartId: [{
                type: Input
            }], items: [{
                type: Input,
                args: ['items']
            }], promotionLocation: [{
                type: Input
            }], setLoading: [{
                type: Input,
                args: ['cartIsLoading']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1pdGVtLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtc2hhcmVkL2NhcnQtaXRlbS1saXN0L2NhcnQtaXRlbS1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXNoYXJlZC9jYXJ0LWl0ZW0tbGlzdC9jYXJ0LWl0ZW0tbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBTUwsaUJBQWlCLEdBRWxCLE1BQU0sMkJBQTJCLENBQUM7QUFHbkMsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQWlCckQsTUFBTSxPQUFPLHFCQUFxQjtJQXlDaEMsWUFDWSxpQkFBbUMsRUFDbkMsb0JBQXlDLEVBQ3pDLGFBQTRCLEVBQzVCLGdCQUFpQyxFQUNqQyxFQUFxQixFQUNULE1BQTJDO1FBTHZELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUN6QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ1QsV0FBTSxHQUFOLE1BQU0s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QkFBaEIsS0FBSztnQkFFRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLE9BQU87c0JBQWYsS0FBSztnQkFNRyxNQUFNO3NCQUFkLEtBQUs7Z0JBTUYsS0FBSztzQkFEUixLQUFLO3VCQUFDLE9BQU87Z0JBU0wsaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVzQixVQUFVO3NCQUFyQyxLQUFLO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0SXRlbUNvbXBvbmVudE9wdGlvbnMsXG4gIENvbnNpZ25tZW50RW50cnksXG4gIE11bHRpQ2FydEZhY2FkZSxcbiAgT3JkZXJFbnRyeSxcbiAgUHJvbW90aW9uTG9jYXRpb24sXG4gIFNlbGVjdGl2ZUNhcnRGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgVXNlcklkU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRDb250ZXh0RGF0YSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmludGVyZmFjZSBJdGVtTGlzdENvbnRleHQge1xuICByZWFkb25seT86IGJvb2xlYW47XG4gIGhhc0hlYWRlcj86IGJvb2xlYW47XG4gIG9wdGlvbnM/OiBDYXJ0SXRlbUNvbXBvbmVudE9wdGlvbnM7XG4gIGNhcnRJZD86IHN0cmluZztcbiAgaXRlbXM/OiBPcmRlckVudHJ5W107XG4gIHByb21vdGlvbkxvY2F0aW9uPzogUHJvbW90aW9uTG9jYXRpb247XG4gIGNhcnRJc0xvYWRpbmc/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jYXJ0LWl0ZW0tbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJ0LWl0ZW0tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0SXRlbUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByb3RlY3RlZCB1c2VySWQ6IHN0cmluZztcblxuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGhhc0hlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgb3B0aW9uczogQ2FydEl0ZW1Db21wb25lbnRPcHRpb25zID0ge1xuICAgIGlzU2F2ZUZvckxhdGVyOiBmYWxzZSxcbiAgICBvcHRpb25hbEJ0bjogbnVsbCxcbiAgICBkaXNwbGF5QWRkVG9DYXJ0OiBmYWxzZSxcbiAgfTtcblxuICBASW5wdXQoKSBjYXJ0SWQ6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgX2l0ZW1zOiBPcmRlckVudHJ5W10gPSBbXTtcbiAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcblxuICBASW5wdXQoJ2l0ZW1zJylcbiAgc2V0IGl0ZW1zKGl0ZW1zOiBPcmRlckVudHJ5W10pIHtcbiAgICB0aGlzLnJlc29sdmVJdGVtcyhpdGVtcyk7XG4gICAgdGhpcy5jcmVhdGVGb3JtKCk7XG4gIH1cbiAgZ2V0IGl0ZW1zKCk6IE9yZGVyRW50cnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG5cbiAgQElucHV0KCkgcHJvbW90aW9uTG9jYXRpb246IFByb21vdGlvbkxvY2F0aW9uID0gUHJvbW90aW9uTG9jYXRpb24uQWN0aXZlQ2FydDtcblxuICBASW5wdXQoJ2NhcnRJc0xvYWRpbmcnKSBzZXQgc2V0TG9hZGluZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgLy8gV2hlbmV2ZXIgdGhlIGNhcnQgaXMgbG9hZGluZywgd2UgZGlzYWJsZSB0aGUgY29tcGxldGUgZm9ybVxuICAgICAgLy8gdG8gYXZvaWQgYW55IHVzZXIgaW50ZXJhY3Rpb24gd2l0aCB0aGUgY2FydC5cbiAgICAgIHZhbHVlXG4gICAgICAgID8gdGhpcy5mb3JtLmRpc2FibGUoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pXG4gICAgICAgIDogdGhpcy5mb3JtLmVuYWJsZSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc2VsZWN0aXZlQ2FydFNlcnZpY2U6IFNlbGVjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydFNlcnZpY2U6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBvdXRsZXQ/OiBPdXRsZXRDb250ZXh0RGF0YTxJdGVtTGlzdENvbnRleHQ+XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5nZXRJbnB1dHNGcm9tQ29udGV4dCgpKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICA/LmdldFVzZXJJZCgpXG4gICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4gKHRoaXMudXNlcklkID0gdXNlcklkKSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldElucHV0c0Zyb21Db250ZXh0KCk6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGV0Py5jb250ZXh0JC5zdWJzY3JpYmUoKGNvbnRleHQpID0+IHtcbiAgICAgIGlmIChjb250ZXh0LnJlYWRvbmx5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yZWFkb25seSA9IGNvbnRleHQucmVhZG9ubHk7XG4gICAgICB9XG4gICAgICBpZiAoY29udGV4dC5oYXNIZWFkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmhhc0hlYWRlciA9IGNvbnRleHQuaGFzSGVhZGVyO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRleHQub3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGNvbnRleHQub3B0aW9ucztcbiAgICAgIH1cbiAgICAgIGlmIChjb250ZXh0LmNhcnRJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuY2FydElkID0gY29udGV4dC5jYXJ0SWQ7XG4gICAgICB9XG4gICAgICBpZiAoY29udGV4dC5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBjb250ZXh0Lml0ZW1zO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRleHQucHJvbW90aW9uTG9jYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnByb21vdGlvbkxvY2F0aW9uID0gY29udGV4dC5wcm9tb3Rpb25Mb2NhdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmIChjb250ZXh0LmNhcnRJc0xvYWRpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNldExvYWRpbmcgPSBjb250ZXh0LmNhcnRJc0xvYWRpbmc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgaXRlbXMgcGFzc2VkIHRvIGNvbXBvbmVudCBpbnB1dCBhbmQgdXBkYXRlcyAnaXRlbXMnIGZpZWxkXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZUl0ZW1zKGl0ZW1zOiBPcmRlckVudHJ5W10pOiB2b2lkIHtcbiAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRoZSBpdGVtcyB3ZSdyZSBnZXR0aW5nIGZyb20gdGhlIGlucHV0IGRvIG5vdCBoYXZlIGEgY29uc2lzdGVudCBtb2RlbC5cbiAgICAvLyBJbiBjYXNlIG9mIGEgYGNvbnNpZ25tZW50RW50cnlgLCB3ZSBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgZGF0YSBmcm9tIHRoZSBvcmRlckVudHJ5LlxuICAgIGlmIChpdGVtcy5ldmVyeSgoaXRlbSkgPT4gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnb3JkZXJFbnRyeScpKSkge1xuICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcy5tYXAoKGNvbnNpZ25tZW50RW50cnkpID0+IHtcbiAgICAgICAgY29uc3QgZW50cnkgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIChjb25zaWdubWVudEVudHJ5IGFzIENvbnNpZ25tZW50RW50cnkpLm9yZGVyRW50cnlcbiAgICAgICAgKTtcbiAgICAgICAgZW50cnkucXVhbnRpdHkgPSBjb25zaWdubWVudEVudHJ5LnF1YW50aXR5O1xuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UnZCBsaWtlIHRvIGF2b2lkIHRoZSB1bm5lY2Vzc2FyeSByZS1yZW5kZXJzIG9mIHVuY2hhbmdlZCBjYXJ0IGl0ZW1zIGFmdGVyIHRoZSBkYXRhIHJlbG9hZC5cbiAgICAgIC8vIE9DQyBjYXJ0IGVudHJpZXMgZG9uJ3QgaGF2ZSBhbnkgdW5pcXVlIGlkZW50aWZpZXIgdGhhdCB3ZSBjb3VsZCB1c2UgaW4gQW5ndWxhciBgdHJhY2tCeWAuXG4gICAgICAvLyBTbyB3ZSB1cGRhdGUgZWFjaCBhcnJheSBlbGVtZW50IHRvIHRoZSBuZXcgb2JqZWN0IG9ubHkgd2hlbiBpdCdzIGFueSBkaWZmZXJlbnQgdG8gdGhlIHByZXZpb3VzIG9uZS5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5tYXgoaXRlbXMubGVuZ3RoLCB0aGlzLl9pdGVtcy5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMuX2l0ZW1zPy5baV0pICE9PSBKU09OLnN0cmluZ2lmeShpdGVtc1tpXSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5faXRlbXNbaV0gJiYgdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbCh0aGlzLmdldENvbnRyb2xOYW1lKHRoaXMuX2l0ZW1zW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXRlbXNbaV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXRlbXNbaV0gPSBpdGVtc1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBmb3JtIG1vZGVscyBmb3IgbGlzdCBpdGVtc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY29udHJvbE5hbWUgPSB0aGlzLmdldENvbnRyb2xOYW1lKGl0ZW0pO1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybS5nZXQoY29udHJvbE5hbWUpO1xuICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wuZ2V0KCdxdWFudGl0eScpPy52YWx1ZSAhPT0gaXRlbS5xdWFudGl0eSkge1xuICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh7IHF1YW50aXR5OiBpdGVtLnF1YW50aXR5IH0sIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgICAgZW50cnlOdW1iZXI6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woaXRlbS5lbnRyeU51bWJlciksXG4gICAgICAgICAgcXVhbnRpdHk6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woaXRlbS5xdWFudGl0eSwgeyB1cGRhdGVPbjogJ2JsdXInIH0pLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2woY29udHJvbE5hbWUsIGdyb3VwKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgZGlzYWJsZSBmb3JtIGdyb3VwIGJlZm9yZSBhZGRpbmcsIGRpc2FibGVkIHN0YXR1cyB3aWxsIHJlc2V0XG4gICAgICAvLyBXaGljaCBmb3JjZXMgdXMgdG8gZGlzYWJsZSBjb250cm9sIGFmdGVyIGluY2x1ZGluZyB0byBmb3JtIG9iamVjdFxuICAgICAgaWYgKCFpdGVtLnVwZGF0ZWFibGUgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbY29udHJvbE5hbWVdLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDb250cm9sTmFtZShpdGVtOiBPcmRlckVudHJ5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5lbnRyeU51bWJlcj8udG9TdHJpbmcoKSB8fCAnJztcbiAgfVxuXG4gIHJlbW92ZUVudHJ5KGl0ZW06IE9yZGVyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzU2F2ZUZvckxhdGVyKSB7XG4gICAgICB0aGlzLnNlbGVjdGl2ZUNhcnRTZXJ2aWNlLnJlbW92ZUVudHJ5KGl0ZW0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0SWQgJiYgdGhpcy51c2VySWQpIHtcbiAgICAgIHRoaXMubXVsdGlDYXJ0U2VydmljZS5yZW1vdmVFbnRyeShcbiAgICAgICAgdGhpcy51c2VySWQsXG4gICAgICAgIHRoaXMuY2FydElkLFxuICAgICAgICBpdGVtLmVudHJ5TnVtYmVyIGFzIG51bWJlclxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5yZW1vdmVFbnRyeShpdGVtKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuZm9ybS5jb250cm9sc1t0aGlzLmdldENvbnRyb2xOYW1lKGl0ZW0pXTtcbiAgfVxuXG4gIGdldENvbnRyb2woaXRlbTogT3JkZXJFbnRyeSk6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Hcm91cD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KHRoaXMuZ2V0Q29udHJvbE5hbWUoaXRlbSkpPy52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVwcmVjYXRlZFxuICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgdGFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoaXRlbS51cGRhdGVhYmxlICYmIHZhbHVlICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc1NhdmVGb3JMYXRlcikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RpdmVDYXJ0U2VydmljZS51cGRhdGVFbnRyeShcbiAgICAgICAgICAgICAgdmFsdWUuZW50cnlOdW1iZXIsXG4gICAgICAgICAgICAgIHZhbHVlLnF1YW50aXR5XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJ0SWQgJiYgdGhpcy51c2VySWQpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlDYXJ0U2VydmljZS51cGRhdGVFbnRyeShcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgIHRoaXMuY2FydElkLFxuICAgICAgICAgICAgICB2YWx1ZS5lbnRyeU51bWJlcixcbiAgICAgICAgICAgICAgdmFsdWUucXVhbnRpdHlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UudXBkYXRlRW50cnkoXG4gICAgICAgICAgICAgIHZhbHVlLmVudHJ5TnVtYmVyLFxuICAgICAgICAgICAgICB2YWx1ZS5xdWFudGl0eVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKCgpID0+IDxVbnR5cGVkRm9ybUdyb3VwPnRoaXMuZm9ybS5nZXQodGhpcy5nZXRDb250cm9sTmFtZShpdGVtKSkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8dGFibGUgcm9sZT1cInRhYmxlXCI+XG4gIDxjYXB0aW9uIGNsYXNzPVwiY3gtdmlzdWFsbHktaGlkZGVuXCI+XG4gICAge3tcbiAgICAgICdjYXJ0SXRlbXMuY2FwdGlvbicgfCBjeFRyYW5zbGF0ZVxuICAgIH19XG4gIDwvY2FwdGlvbj5cbiAgPHRoZWFkICpuZ0lmPVwiaGFzSGVhZGVyXCI+XG4gICAgPHRyIHJvbGU9XCJyb3dcIiBjbGFzcz1cImN4LWl0ZW0tbGlzdC1oZWFkZXJcIj5cbiAgICAgIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtZGVzY1wiPlxuICAgICAgICB7eyAnY2FydEl0ZW1zLmRlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L3RoPlxuICAgICAgPHRoIHJvbGU9XCJjb2x1bW5oZWFkZXJcIiBjbGFzcz1cImN4LWl0ZW0tbGlzdC1xdHlcIj5cbiAgICAgICAge3sgJ2NhcnRJdGVtcy5xdWFudGl0eScgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC90aD5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJvcHRpb25zLmlzU2F2ZUZvckxhdGVyOyBlbHNlIHRvdGFsSGVhZGVyXCI+XG4gICAgICAgIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtdG90YWxcIj5cbiAgICAgICAgICB7eyAnc2F2ZUZvckxhdGVySXRlbXMuc3RvY2snIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgPC90aD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cIiFyZWFkb25seSB8fCBvcHRpb25zLmlzU2F2ZUZvckxhdGVyIHx8IG9wdGlvbnMuZGlzcGxheUFkZFRvQ2FydFwiXG4gICAgICA+XG4gICAgICAgIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtYWN0aW9uc1wiPlxuICAgICAgICAgIHt7ICdjYXJ0SXRlbXMuYWN0aW9ucycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L3RoPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5IGNsYXNzPVwiY3gtaXRlbS1saXN0LWl0ZW1zXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbmdJZj1cImdldENvbnRyb2woaXRlbSkgfCBhc3luYyBhcyBjb250cm9sXCJcbiAgICAgICAgW2NsYXNzLmlzLWNoYW5nZWRdPVwiY29udHJvbC5nZXQoJ3F1YW50aXR5JykuZGlzYWJsZWRcIlxuICAgICAgPlxuICAgICAgICA8dHJcbiAgICAgICAgICBjeC1jYXJ0LWl0ZW0tbGlzdC1yb3dcbiAgICAgICAgICByb2xlPVwicm93XCJcbiAgICAgICAgICBjbGFzcz1cImN4LWl0ZW0tbGlzdC1yb3dcIlxuICAgICAgICAgIFtpdGVtXT1cIml0ZW1cIlxuICAgICAgICAgIFtxdWFudGl0eUNvbnRyb2xdPVwiY29udHJvbC5nZXQoJ3F1YW50aXR5JylcIlxuICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgW3Byb21vdGlvbkxvY2F0aW9uXT1cInByb21vdGlvbkxvY2F0aW9uXCJcbiAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCJcbiAgICAgICAgPjwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG5cbjxuZy10ZW1wbGF0ZSAjdG90YWxIZWFkZXI+XG4gIDx0aCByb2xlPVwiY29sdW1uaGVhZGVyXCIgY2xhc3M9XCJjeC1pdGVtLWxpc3QtdG90YWxcIj5cbiAgICB7eyAnY2FydEl0ZW1zLnRvdGFsJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvdGg+XG48L25nLXRlbXBsYXRlPlxuIl19