/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
export class ConfiguratorPriceComponent {
    /**
     * Retrieves price.
     *
     * @return {string} - value price formula
     */
    get price() {
        if (this.formula.priceTotal) {
            return this.priceTotal;
        }
        else {
            return '+ ' + this.formula.price?.formattedValue;
        }
    }
    /**
     * Retrieves the total price.
     *
     * @return {string} - total price formula
     */
    get priceTotal() {
        return '+ ' + this.formula.priceTotal?.formattedValue;
    }
    /**
     * Verifies whether quantity with price should be displayed.
     *
     * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
     */
    displayQuantityAndPrice() {
        const quantity = this.formula.quantity;
        return quantity ? this.formula.price?.value !== 0 && quantity >= 1 : false;
    }
    /**
     * Verifies whether only price should be displayed.
     *
     * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
     */
    displayPriceOnly() {
        const priceValue = this.formula.price?.value ?? 0;
        const priceTotalValue = this.formula.priceTotal?.value ?? 0;
        return ((priceValue !== 0 || priceTotalValue !== 0) &&
            !this.displayQuantityAndPrice());
    }
    /**
     * Verifies whether the price formula should be displayed.
     *
     * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
     */
    displayFormula() {
        const displayFormula = (this.formula.quantity && this.formula.quantity !== 0) ||
            (this.formula.price && this.formula.price?.value !== 0) ||
            (this.formula.priceTotal && this.formula.priceTotal?.value !== 0);
        return displayFormula ?? false;
    }
    /**
     * Retrieves formula for quantity with price.
     *
     * @param {string} formattedQuantity- formatted quantity
     * @return {string} - price formula
     */
    quantityWithPrice(formattedQuantity) {
        return formattedQuantity + 'x(' + this.formula.price?.formattedValue + ')';
    }
    /**
     * Verifies whether the price is lighted up.
     *
     * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
     */
    isPriceLightedUp() {
        return this.formula.isLightedUp ?? false;
    }
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @return {string} - corresponding style class
     */
    get styleClass() {
        let styleClass = 'cx-price';
        if (!this.isPriceLightedUp()) {
            styleClass += ' cx-greyed-out';
        }
        return styleClass;
    }
}
ConfiguratorPriceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPriceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: { formula: "formula" }, ngImport: i0, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-price', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n" }]
        }], propDecorators: { formula: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXByaWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFlMUUsTUFBTSxPQUFPLDBCQUEwQjtJQUdyQzs7OztPQUlHO0lBQ0gsSUFBSSxLQUFLO1FBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7YUFBTTtZQUNMLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdUJBQXVCO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEtBQUssQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM3RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdCQUFnQjtRQUNkLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDbEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQ0wsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLGVBQWUsS0FBSyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FDaEMsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYztRQUNaLE1BQU0sY0FBYyxHQUNsQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQztZQUN0RCxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUM7WUFDdkQsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEUsT0FBTyxjQUFjLElBQUksS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlCQUFpQixDQUFDLGlCQUFnQztRQUNoRCxPQUFPLGlCQUFpQixHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxjQUFjLEdBQUcsR0FBRyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLFVBQVU7UUFDWixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQzVCLFVBQVUsSUFBSSxnQkFBZ0IsQ0FBQztTQUNoQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7O3VIQTdGVSwwQkFBMEI7MkdBQTFCLDBCQUEwQiw2RkNyQnZDLDZtQkFtQkE7MkZERWEsMEJBQTBCO2tCQUx0QyxTQUFTOytCQUNFLHVCQUF1QixtQkFFaEIsdUJBQXVCLENBQUMsTUFBTTs4QkFHdEMsT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnMge1xuICBxdWFudGl0eT86IG51bWJlcjtcbiAgcHJpY2U/OiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzO1xuICBwcmljZVRvdGFsPzogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscztcbiAgaXNMaWdodGVkVXA/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItcHJpY2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLXByaWNlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZm9ybXVsYTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgcHJpY2UuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSB2YWx1ZSBwcmljZSBmb3JtdWxhXG4gICAqL1xuICBnZXQgcHJpY2UoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5mb3JtdWxhLnByaWNlVG90YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnByaWNlVG90YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnKyAnICsgdGhpcy5mb3JtdWxhLnByaWNlPy5mb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSB0b3RhbCBwcmljZS5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIHRvdGFsIHByaWNlIGZvcm11bGFcbiAgICovXG4gIGdldCBwcmljZVRvdGFsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcrICcgKyB0aGlzLmZvcm11bGEucHJpY2VUb3RhbD8uZm9ybWF0dGVkVmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciBxdWFudGl0eSB3aXRoIHByaWNlIHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ3RydWUnIGlmIHF1YW50aXR5IGFuZCBwcmljZSBzaG91bGQgYmUgZGlzcGxheWVkLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgZGlzcGxheVF1YW50aXR5QW5kUHJpY2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcXVhbnRpdHkgPSB0aGlzLmZvcm11bGEucXVhbnRpdHk7XG4gICAgcmV0dXJuIHF1YW50aXR5ID8gdGhpcy5mb3JtdWxhLnByaWNlPy52YWx1ZSAhPT0gMCAmJiBxdWFudGl0eSA+PSAxIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciBvbmx5IHByaWNlIHNob3VsZCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ3RydWUnIGlmIG9ubHkgcHJpY2Ugc2hvdWxkIGJlIGRpc3BsYXllZCwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGRpc3BsYXlQcmljZU9ubHkoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJpY2VWYWx1ZSA9IHRoaXMuZm9ybXVsYS5wcmljZT8udmFsdWUgPz8gMDtcbiAgICBjb25zdCBwcmljZVRvdGFsVmFsdWUgPSB0aGlzLmZvcm11bGEucHJpY2VUb3RhbD8udmFsdWUgPz8gMDtcbiAgICByZXR1cm4gKFxuICAgICAgKHByaWNlVmFsdWUgIT09IDAgfHwgcHJpY2VUb3RhbFZhbHVlICE9PSAwKSAmJlxuICAgICAgIXRoaXMuZGlzcGxheVF1YW50aXR5QW5kUHJpY2UoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgcHJpY2UgZm9ybXVsYSBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiBwcmljZSBmb3JtdWxhIHNob3VsZCBiZSBkaXNwbGF5ZWQsIG90aGVyd2lzZSAnZmFsc2UnXG4gICAqL1xuICBkaXNwbGF5Rm9ybXVsYSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkaXNwbGF5Rm9ybXVsYSA9XG4gICAgICAodGhpcy5mb3JtdWxhLnF1YW50aXR5ICYmIHRoaXMuZm9ybXVsYS5xdWFudGl0eSAhPT0gMCkgfHxcbiAgICAgICh0aGlzLmZvcm11bGEucHJpY2UgJiYgdGhpcy5mb3JtdWxhLnByaWNlPy52YWx1ZSAhPT0gMCkgfHxcbiAgICAgICh0aGlzLmZvcm11bGEucHJpY2VUb3RhbCAmJiB0aGlzLmZvcm11bGEucHJpY2VUb3RhbD8udmFsdWUgIT09IDApO1xuICAgIHJldHVybiBkaXNwbGF5Rm9ybXVsYSA/PyBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgZm9ybXVsYSBmb3IgcXVhbnRpdHkgd2l0aCBwcmljZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFF1YW50aXR5LSBmb3JtYXR0ZWQgcXVhbnRpdHlcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIHByaWNlIGZvcm11bGFcbiAgICovXG4gIHF1YW50aXR5V2l0aFByaWNlKGZvcm1hdHRlZFF1YW50aXR5OiBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVhbnRpdHkgKyAneCgnICsgdGhpcy5mb3JtdWxhLnByaWNlPy5mb3JtYXR0ZWRWYWx1ZSArICcpJztcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBwcmljZSBpcyBsaWdodGVkIHVwLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICd0cnVlJyBpZiBwcmljZSBzaG91bGQgYmUgbGlnaHRlZCB1cCwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzUHJpY2VMaWdodGVkVXAoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybXVsYS5pc0xpZ2h0ZWRVcCA/PyBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHN0eWxpbmcgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnQuXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBjb3JyZXNwb25kaW5nIHN0eWxlIGNsYXNzXG4gICAqL1xuICBnZXQgc3R5bGVDbGFzcygpOiBzdHJpbmcge1xuICAgIGxldCBzdHlsZUNsYXNzID0gJ2N4LXByaWNlJztcbiAgICBpZiAoIXRoaXMuaXNQcmljZUxpZ2h0ZWRVcCgpKSB7XG4gICAgICBzdHlsZUNsYXNzICs9ICcgY3gtZ3JleWVkLW91dCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5Rm9ybXVsYSgpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNwbGF5UHJpY2VPbmx5KClcIj5cbiAgICA8ZGl2XG4gICAgICBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlU3VyY2hhcmdlJyB8IGN4VHJhbnNsYXRlXCJcbiAgICA+XG4gICAgICB7eyBwcmljZSB9fVxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXlRdWFudGl0eUFuZFByaWNlKClcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImN4LXF1YW50aXR5LXByaWNlXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlU3VyY2hhcmdlJyB8IGN4VHJhbnNsYXRlXCJcbiAgICA+XG4gICAgICB7eyBxdWFudGl0eVdpdGhQcmljZShmb3JtdWxhPy5xdWFudGl0eSB8IGN4TnVtZXJpYykgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtcHJpY2UtdG90YWxcIj57eyBwcmljZVRvdGFsIH19PC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=