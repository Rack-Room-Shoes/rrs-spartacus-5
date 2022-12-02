/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../quantity/configurator-attribute-quantity.service";
import * as i2 from "@spartacus/core";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService, translation) {
        super();
        this.quantityService = quantityService;
        this.translation = translation;
        this.loading$ = new BehaviorSubject(false);
        this.selectionChange = new EventEmitter();
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActions(this.attribute.selectedSingleValue);
    }
    onSelect(value) {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                selectedSingleValue: value,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        this.selectionChange.emit(event);
    }
    onSelectAdditionalValue(event) {
        const userInput = event.changedAttribute.userInput;
        if (userInput) {
            this.loading$.next(true);
            event.changedAttribute.selectedSingleValue = userInput;
            this.selectionChange.emit(event);
        }
    }
    onHandleQuantity(quantity) {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                quantity,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        };
        this.selectionChange.emit(event);
    }
    onChangeQuantity(eventObject, form) {
        if (!eventObject) {
            if (form) {
                form.setValue('0');
            }
            this.onSelect('');
        }
        else {
            this.onHandleQuantity(eventObject);
        }
    }
    getInitialQuantity(form) {
        const quantity = this.attribute.quantity ?? 0;
        if (form) {
            return form.value !== '0' ? quantity : 0;
        }
        else {
            return this.attribute.selectedSingleValue ? quantity : 0;
        }
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {FormControl} form - Form control
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(form) {
        const initialQuantity = this.getInitialQuantity(form);
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    /**
     * Extract corresponding price formula parameters.
     * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attribute.quantity,
            price: this.getSelectedValuePrice(),
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the single-selection attribute types only value price should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        if (value) {
            return {
                price: value.valuePrice,
                isLightedUp: value.selected,
            };
        }
    }
    getSelectedValuePrice() {
        return this.attribute.values?.find((value) => value.selected)?.valuePrice;
    }
    get isAdditionalValueNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NUMERIC);
    }
    get isAdditionalValueAlphaNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NONE);
    }
    getAriaLabel(value, attribute) {
        let ariaLabel = this.getAriaLabelWithoutAdditionalValue(value, attribute);
        if (this.isWithAdditionalValues(this.attribute)) {
            let ariaLabelWithAdditionalValue = this.getAdditionalValueAriaLabel();
            return ariaLabel + ' ' + ariaLabelWithAdditionalValue;
        }
        else {
            return ariaLabel;
        }
    }
    getAdditionalValueAriaLabel() {
        let ariaLabel = '';
        this.translation
            .translate('configurator.a11y.additionalValue')
            .pipe(take(1))
            .subscribe((text) => (ariaLabel = text));
        return ariaLabel;
    }
    getAriaLabelWithoutAdditionalValue(value, attribute) {
        let ariaLabel = '';
        if (value.valuePrice && value.valuePrice?.value !== 0) {
            if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePriceTotal.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePrice.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.selectedValueOfAttributeFull', {
                value: value.valueDisplay,
                attribute: attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (ariaLabel = text));
        }
        return ariaLabel;
    }
}
ConfiguratorAttributeSingleSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, deps: [{ token: i1.ConfiguratorAttributeQuantityService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeSingleSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeSingleSelectionBaseComponent, inputs: { attribute: "attribute", ownerKey: "ownerKey", language: "language", ownerType: "ownerType" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorAttributeQuantityService }, { type: i2.TranslationService }]; }, propDecorators: { attribute: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], language: [{
                type: Input
            }], ownerType: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1iYXNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBS3pFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBRzdGLGtFQUFrRTtBQUNsRSxNQUFNLE9BQWdCLGlEQUFrRCxTQUFRLGtDQUFrQztJQVNoSCxZQUNZLGVBQXFELEVBQ3JELFdBQStCO1FBRXpDLEtBQUssRUFBRSxDQUFDO1FBSEUsb0JBQWUsR0FBZixlQUFlLENBQXNDO1FBQ3JELGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQVYzQyxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFNckMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztJQU90RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFB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NEpBS0MsU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDSSxlQUFlO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ0Zvcm1VcGRhdGVFdmVudCB9IGZyb20gJy4uLy4uLy4uL2Zvcm0vY29uZmlndXJhdG9yLWZvcm0uZXZlbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vcHJpY2UvY29uZmlndXJhdG9yLXByaWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9xdWFudGl0eS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1iYXNlLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoKVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uQmFzZUNvbXBvbmVudCBleHRlbmRzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQge1xuICBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZTtcbiAgQElucHV0KCkgb3duZXJLZXk6IHN0cmluZztcbiAgQElucHV0KCkgbGFuZ3VhZ2U6IHN0cmluZztcbiAgQElucHV0KCkgb3duZXJUeXBlOiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENvbmZpZ0Zvcm1VcGRhdGVFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlTZXJ2aWNlOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgd2UgYXJlIHN1cHBvc2VkIHRvIHJlbmRlciBhIHF1YW50aXR5IGNvbnRyb2wsIHdoaWNoXG4gICAqIGNhbiBiZSBkZXJpdmVkIGZyb20gdGhlIGF0dHJpYnV0ZSBtZXRhIGRhdGFcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBEaXNwbGF5IHF1YW50aXR5IHBpY2tlcj9cbiAgICovXG4gIGdldCB3aXRoUXVhbnRpdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHlTZXJ2aWNlLndpdGhRdWFudGl0eShcbiAgICAgIHRoaXMuYXR0cmlidXRlLmRhdGFUeXBlID8/IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5OT1RfSU1QTEVNRU5URUQsXG4gICAgICB0aGlzLmF0dHJpYnV0ZS51aVR5cGUgPz8gQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URURcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBxdWFudGl0eSBjb250cm9sIHNob3VsZCBiZSBkaXNhYmxlZFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc2FibGUgcXVhbnRpdHkgcGlja2VyP1xuICAgKi9cbiAgZ2V0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHlTZXJ2aWNlLmRpc2FibGVRdWFudGl0eUFjdGlvbnMoXG4gICAgICB0aGlzLmF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlXG4gICAgKTtcbiAgfVxuXG4gIG9uU2VsZWN0KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG5cbiAgICBjb25zdCBldmVudDogQ29uZmlnRm9ybVVwZGF0ZUV2ZW50ID0ge1xuICAgICAgY2hhbmdlZEF0dHJpYnV0ZToge1xuICAgICAgICAuLi50aGlzLmF0dHJpYnV0ZSxcbiAgICAgICAgc2VsZWN0ZWRTaW5nbGVWYWx1ZTogdmFsdWUsXG4gICAgICB9LFxuICAgICAgb3duZXJLZXk6IHRoaXMub3duZXJLZXksXG4gICAgICB1cGRhdGVUeXBlOiBDb25maWd1cmF0b3IuVXBkYXRlVHlwZS5BVFRSSUJVVEUsXG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25TZWxlY3RBZGRpdGlvbmFsVmFsdWUoZXZlbnQ6IENvbmZpZ0Zvcm1VcGRhdGVFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHVzZXJJbnB1dCA9IGV2ZW50LmNoYW5nZWRBdHRyaWJ1dGUudXNlcklucHV0O1xuXG4gICAgaWYgKHVzZXJJbnB1dCkge1xuICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgICAgZXZlbnQuY2hhbmdlZEF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlID0gdXNlcklucHV0O1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgb25IYW5kbGVRdWFudGl0eShxdWFudGl0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuXG4gICAgY29uc3QgZXZlbnQ6IENvbmZpZ0Zvcm1VcGRhdGVFdmVudCA9IHtcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGU6IHtcbiAgICAgICAgLi4udGhpcy5hdHRyaWJ1dGUsXG4gICAgICAgIHF1YW50aXR5LFxuICAgICAgfSxcbiAgICAgIG93bmVyS2V5OiB0aGlzLm93bmVyS2V5LFxuICAgICAgdXBkYXRlVHlwZTogQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGUuQVRUUklCVVRFX1FVQU5USVRZLFxuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9uQ2hhbmdlUXVhbnRpdHkoZXZlbnRPYmplY3Q6IGFueSwgZm9ybT86IFVudHlwZWRGb3JtQ29udHJvbCk6IHZvaWQge1xuICAgIGlmICghZXZlbnRPYmplY3QpIHtcbiAgICAgIGlmIChmb3JtKSB7XG4gICAgICAgIGZvcm0uc2V0VmFsdWUoJzAnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25TZWxlY3QoJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uSGFuZGxlUXVhbnRpdHkoZXZlbnRPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbml0aWFsUXVhbnRpdHkoZm9ybT86IFVudHlwZWRGb3JtQ29udHJvbCk6IG51bWJlciB7XG4gICAgY29uc3QgcXVhbnRpdHk6IG51bWJlciA9IHRoaXMuYXR0cmlidXRlLnF1YW50aXR5ID8/IDA7XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgIHJldHVybiBmb3JtLnZhbHVlICE9PSAnMCcgPyBxdWFudGl0eSA6IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlID8gcXVhbnRpdHkgOiAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgRXh0cmFjdCBjb3JyZXNwb25kaW5nIHF1YW50aXR5IHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtGb3JtQ29udHJvbH0gZm9ybSAtIEZvcm0gY29udHJvbFxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHF1YW50aXR5IG9wdGlvbnNcbiAgICovXG4gIGV4dHJhY3RRdWFudGl0eVBhcmFtZXRlcnMoXG4gICAgZm9ybT86IFVudHlwZWRGb3JtQ29udHJvbFxuICApOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnMge1xuICAgIGNvbnN0IGluaXRpYWxRdWFudGl0eSA9IHRoaXMuZ2V0SW5pdGlhbFF1YW50aXR5KGZvcm0pO1xuICAgIGNvbnN0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMkID0gdGhpcy5sb2FkaW5nJC5waXBlKFxuICAgICAgbWFwKChsb2FkaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2FkaW5nIHx8IHRoaXMuZGlzYWJsZVF1YW50aXR5QWN0aW9ucztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1plcm86ICF0aGlzLmF0dHJpYnV0ZS5yZXF1aXJlZCxcbiAgICAgIGluaXRpYWxRdWFudGl0eTogaW5pdGlhbFF1YW50aXR5LFxuICAgICAgZGlzYWJsZVF1YW50aXR5QWN0aW9ucyQ6IGRpc2FibGVRdWFudGl0eUFjdGlvbnMkLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBjb3JyZXNwb25kaW5nIHByaWNlIGZvcm11bGEgcGFyYW1ldGVycy5cbiAgICogRm9yIHRoZSBzaW5nbGUtc2VsZWN0aW9uIGF0dHJpYnV0ZSB0eXBlcyB0aGUgY29tcGxldGUgcHJpY2UgZm9ybXVsYSBzaG91bGQgYmUgZGlzcGxheWVkIGF0IHRoZSBhdHRyaWJ1dGUgbGV2ZWwuXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9uc30gLSBOZXcgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZXh0cmFjdFByaWNlRm9ybXVsYVBhcmFtZXRlcnMoKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVhbnRpdHk6IHRoaXMuYXR0cmlidXRlLnF1YW50aXR5LFxuICAgICAgcHJpY2U6IHRoaXMuZ2V0U2VsZWN0ZWRWYWx1ZVByaWNlKCksXG4gICAgICBwcmljZVRvdGFsOiB0aGlzLmF0dHJpYnV0ZS5hdHRyaWJ1dGVQcmljZVRvdGFsLFxuICAgICAgaXNMaWdodGVkVXA6IHRydWUsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGNvcnJlc3BvbmRpbmcgdmFsdWUgcHJpY2UgZm9ybXVsYSBwYXJhbWV0ZXJzLlxuICAgKiBGb3IgdGhlIHNpbmdsZS1zZWxlY3Rpb24gYXR0cmlidXRlIHR5cGVzIG9ubHkgdmFsdWUgcHJpY2Ugc2hvdWxkIGJlIGRpc3BsYXllZCBhdCB0aGUgdmFsdWUgbGV2ZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLlZhbHVlfSB2YWx1ZSAtIENvbmZpZ3VyYXRvciB2YWx1ZVxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHByaWNlIGZvcm11bGFcbiAgICovXG4gIGV4dHJhY3RWYWx1ZVByaWNlRm9ybXVsYVBhcmFtZXRlcnMoXG4gICAgdmFsdWU/OiBDb25maWd1cmF0b3IuVmFsdWVcbiAgKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByaWNlOiB2YWx1ZS52YWx1ZVByaWNlLFxuICAgICAgICBpc0xpZ2h0ZWRVcDogdmFsdWUuc2VsZWN0ZWQsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTZWxlY3RlZFZhbHVlUHJpY2UoKTogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlLnZhbHVlcz8uZmluZCgodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKT8udmFsdWVQcmljZTtcbiAgfVxuXG4gIGdldCBpc0FkZGl0aW9uYWxWYWx1ZU51bWVyaWMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuaXNXaXRoQWRkaXRpb25hbFZhbHVlcyh0aGlzLmF0dHJpYnV0ZSkgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlLnZhbGlkYXRpb25UeXBlID09PSBDb25maWd1cmF0b3IuVmFsaWRhdGlvblR5cGUuTlVNRVJJQ1xuICAgICk7XG4gIH1cblxuICBnZXQgaXNBZGRpdGlvbmFsVmFsdWVBbHBoYU51bWVyaWMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuaXNXaXRoQWRkaXRpb25hbFZhbHVlcyh0aGlzLmF0dHJpYnV0ZSkgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlLnZhbGlkYXRpb25UeXBlID09PSBDb25maWd1cmF0b3IuVmFsaWRhdGlvblR5cGUuTk9ORVxuICAgICk7XG4gIH1cblxuICBnZXRBcmlhTGFiZWwoXG4gICAgdmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZSxcbiAgICBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgYXJpYUxhYmVsID0gdGhpcy5nZXRBcmlhTGFiZWxXaXRob3V0QWRkaXRpb25hbFZhbHVlKHZhbHVlLCBhdHRyaWJ1dGUpO1xuICAgIGlmICh0aGlzLmlzV2l0aEFkZGl0aW9uYWxWYWx1ZXModGhpcy5hdHRyaWJ1dGUpKSB7XG4gICAgICBsZXQgYXJpYUxhYmVsV2l0aEFkZGl0aW9uYWxWYWx1ZSA9IHRoaXMuZ2V0QWRkaXRpb25hbFZhbHVlQXJpYUxhYmVsKCk7XG4gICAgICByZXR1cm4gYXJpYUxhYmVsICsgJyAnICsgYXJpYUxhYmVsV2l0aEFkZGl0aW9uYWxWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFyaWFMYWJlbDtcbiAgICB9XG4gIH1cblxuICBnZXRBZGRpdGlvbmFsVmFsdWVBcmlhTGFiZWwoKTogc3RyaW5nIHtcbiAgICBsZXQgYXJpYUxhYmVsID0gJyc7XG4gICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuYWRkaXRpb25hbFZhbHVlJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoYXJpYUxhYmVsID0gdGV4dCkpO1xuICAgIHJldHVybiBhcmlhTGFiZWw7XG4gIH1cblxuICBnZXRBcmlhTGFiZWxXaXRob3V0QWRkaXRpb25hbFZhbHVlKFxuICAgIHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWUsXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IGFyaWFMYWJlbCA9ICcnO1xuICAgIGlmICh2YWx1ZS52YWx1ZVByaWNlICYmIHZhbHVlLnZhbHVlUHJpY2U/LnZhbHVlICE9PSAwKSB7XG4gICAgICBpZiAodmFsdWUudmFsdWVQcmljZVRvdGFsICYmIHZhbHVlLnZhbHVlUHJpY2VUb3RhbD8udmFsdWUgIT09IDApIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoXG4gICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkuc2VsZWN0ZWRWYWx1ZU9mQXR0cmlidXRlRnVsbFdpdGhQcmljZScsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS52YWx1ZURpc3BsYXksXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLmxhYmVsLFxuICAgICAgICAgICAgICBwcmljZTogdmFsdWUudmFsdWVQcmljZVRvdGFsLmZvcm1hdHRlZFZhbHVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChhcmlhTGFiZWwgPSB0ZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZShcbiAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5zZWxlY3RlZFZhbHVlT2ZBdHRyaWJ1dGVGdWxsV2l0aFByaWNlJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLnZhbHVlRGlzcGxheSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUubGFiZWwsXG4gICAgICAgICAgICAgIHByaWNlOiB2YWx1ZS52YWx1ZVByaWNlLmZvcm1hdHRlZFZhbHVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChhcmlhTGFiZWwgPSB0ZXh0KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuc2VsZWN0ZWRWYWx1ZU9mQXR0cmlidXRlRnVsbCcsIHtcbiAgICAgICAgICB2YWx1ZTogdmFsdWUudmFsdWVEaXNwbGF5LFxuICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLmxhYmVsLFxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoYXJpYUxhYmVsID0gdGV4dCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJpYUxhYmVsO1xuICB9XG59XG4iXX0=