/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../product-card/configurator-attribute-product-card.component";
import * as i3 from "../../quantity/configurator-attribute-quantity.component";
import * as i4 from "../../../price/configurator-price.component";
export class ConfiguratorAttributeMultiSelectionBundleComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
    constructor() {
        super(...arguments);
        this.preventAction$ = new BehaviorSubject(false);
        this.multipleSelectionValues = [];
    }
    ngOnInit() {
        this.initialize();
    }
    /**
     * Initializes selection values and peventAction observable
     */
    initialize() {
        if (this.attribute.values && this.attribute.values.length > 0) {
            this.multipleSelectionValues = this.attribute.values.map(({ name, quantity, selected, valueCode }) => ({
                name,
                quantity,
                selected,
                valueCode,
            }));
        }
        if (this.attribute.required &&
            this.multipleSelectionValues.filter((value) => value.selected).length < 2) {
            this.preventAction$.next(true);
        }
    }
    /**
     * Updates the value dependent on the provided state
     *
     * @param  {any} valueCode - value code to be updated
     * @param  {any} state - selected state
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValues(valueCode, state) {
        const index = this.multipleSelectionValues.findIndex((value) => value.valueCode === valueCode);
        this.multipleSelectionValues[index] = {
            ...this.multipleSelectionValues[index],
            selected: state,
        };
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: this.multipleSelectionValues,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        return event;
    }
    /**
     * Updates the quantity of the given value
     *
     * @param  eventValue - event value
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValuesQuantity(eventValue) {
        const value = this.multipleSelectionValues.find((selectionValue) => selectionValue.valueCode === eventValue.valueCode);
        if (!value) {
            return;
        }
        value.quantity = eventValue.quantity;
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [value],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.VALUE_QUANTITY,
        };
        return event;
    }
    onSelect(eventValue) {
        this.loading$.next(true);
        this.selectionChange.emit(this.updateMultipleSelectionValues(eventValue, true));
    }
    onDeselect(eventValue) {
        this.loading$.next(true);
        this.selectionChange.emit(this.updateMultipleSelectionValues(eventValue, false));
    }
    onDeselectAll() {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        this.selectionChange.emit(event);
    }
    onChangeValueQuantity(eventValue) {
        this.loading$.next(true);
        this.selectionChange.emit(this.updateMultipleSelectionValuesQuantity(eventValue));
    }
    onChangeAttributeQuantity(eventObject) {
        this.loading$.next(true);
        if (!eventObject) {
            this.onDeselectAll();
        }
        else {
            this.onHandleAttributeQuantity(eventObject);
        }
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding product card parameters
     * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading
     * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(disableAllButtons, hideRemoveButton, value, index) {
        return {
            disableAllButtons: disableAllButtons ?? false,
            hideRemoveButton: hideRemoveButton ?? false,
            productBoundValue: value,
            multiSelect: true,
            withQuantity: this.withQuantity,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeLabel: this.attribute.label,
            attributeName: this.attribute.name,
            itemCount: this.attribute.values?.length
                ? this.attribute.values.length
                : 0,
            itemIndex: index,
        };
    }
}
ConfiguratorAttributeMultiSelectionBundleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeMultiSelectionBundleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeMultiSelectionBundleComponent, selector: "cx-configurator-attribute-multi-selection-bundle", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{\n      createAttributeValueIdForConfigurator(attribute, value?.valueCode)\n    }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "component", type: i3.ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: i4.ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-multi-selection-bundle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{\n      createAttributeValueIdForConfigurator(attribute, value?.valueCode)\n    }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYnVuZGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9tdWx0aS1zZWxlY3Rpb24tYnVuZGxlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUl6RSxPQUFPLEVBQUUsZ0RBQWdELEVBQUUsTUFBTSwrREFBK0QsQ0FBQzs7Ozs7O0FBY2pJLE1BQU0sT0FBTyxrREFDWCxTQUFRLGdEQUFnRDtJQU4xRDs7UUFTRSxtQkFBYyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ3JELDRCQUF1QixHQUFxQixFQUFFLENBQUM7S0EyTGhEO0lBekxDLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sVUFBVTtRQUNsQixJQUFJLElB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QUFpQyxFQUNqQyxnQkFBZ0MsRUFDaEMsS0FBeUIsRUFDekIsS0FBYTtRQUViLE9BQU87WUFDTCxpQkFBaUIsRUFBRSxpQkFBaUIsSUFBSSxLQUFLO1lBQzdDLGdCQUFnQixFQUFFLGdCQUFnQixJQUFJLEtBQUs7WUFDM0MsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsSUFBSTtZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsRCxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1lBQ3BDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU07Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUM5QixDQUFDLENBQUMsQ0FBQztZQUNMLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7SUFDSixDQUFDOzsrSUEvTFUsa0RBQWtEO21JQUFsRCxrREFBa0QsK0dDMUIvRCxnbkNBcUNBOzJGRFhhLGtEQUFrRDtrQkFMOUQsU0FBUzsrQkFDRSxrREFBa0QsbUJBRTNDLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmlnRm9ybVVwZGF0ZUV2ZW50IH0gZnJvbSAnLi4vLi4vLi4vZm9ybS9jb25maWd1cmF0b3ItZm9ybS5ldmVudCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZUNvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVByb2R1Y3RDYXJkQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uL3Byb2R1Y3QtY2FyZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLXByb2R1Y3QtY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1iYXNlLmNvbXBvbmVudCc7XG5cbmludGVyZmFjZSBTZWxlY3Rpb25WYWx1ZSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHF1YW50aXR5PzogbnVtYmVyO1xuICBzZWxlY3RlZD86IGJvb2xlYW47XG4gIHZhbHVlQ29kZTogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYnVuZGxlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uQnVuZGxlQ29tcG9uZW50XG4gIGV4dGVuZHMgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CYXNlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0XG57XG4gIHByZXZlbnRBY3Rpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIG11bHRpcGxlU2VsZWN0aW9uVmFsdWVzOiBTZWxlY3Rpb25WYWx1ZVtdID0gW107XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgc2VsZWN0aW9uIHZhbHVlcyBhbmQgcGV2ZW50QWN0aW9uIG9ic2VydmFibGVcbiAgICovXG4gIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZS52YWx1ZXMgJiYgdGhpcy5hdHRyaWJ1dGUudmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Rpb25WYWx1ZXMgPSB0aGlzLmF0dHJpYnV0ZS52YWx1ZXMubWFwKFxuICAgICAgICAoeyBuYW1lLCBxdWFudGl0eSwgc2VsZWN0ZWQsIHZhbHVlQ29kZSB9KSA9PiAoe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgcXVhbnRpdHksXG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICAgdmFsdWVDb2RlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmF0dHJpYnV0ZS5yZXF1aXJlZCAmJlxuICAgICAgdGhpcy5tdWx0aXBsZVNlbGVjdGlvblZhbHVlcy5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZS5zZWxlY3RlZCkubGVuZ3RoIDwgMlxuICAgICkge1xuICAgICAgdGhpcy5wcmV2ZW50QWN0aW9uJC5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2YWx1ZSBkZXBlbmRlbnQgb24gdGhlIHByb3ZpZGVkIHN0YXRlXG4gICAqXG4gICAqIEBwYXJhbSAge2FueX0gdmFsdWVDb2RlIC0gdmFsdWUgY29kZSB0byBiZSB1cGRhdGVkXG4gICAqIEBwYXJhbSAge2FueX0gc3RhdGUgLSBzZWxlY3RlZCBzdGF0ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtDb25maWdGb3JtVXBkYXRlRXZlbnR9IC0gZm9ybSB1cGRhdGUgZXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCB1cGRhdGVNdWx0aXBsZVNlbGVjdGlvblZhbHVlcyhcbiAgICB2YWx1ZUNvZGU6IGFueSxcbiAgICBzdGF0ZTogYW55XG4gICk6IENvbmZpZ0Zvcm1VcGRhdGVFdmVudCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm11bHRpcGxlU2VsZWN0aW9uVmFsdWVzLmZpbmRJbmRleChcbiAgICAgICh2YWx1ZSkgPT4gdmFsdWUudmFsdWVDb2RlID09PSB2YWx1ZUNvZGVcbiAgICApO1xuXG4gICAgdGhpcy5tdWx0aXBsZVNlbGVjdGlvblZhbHVlc1tpbmRleF0gPSB7XG4gICAgICAuLi50aGlzLm11bHRpcGxlU2VsZWN0aW9uVmFsdWVzW2luZGV4XSxcbiAgICAgIHNlbGVjdGVkOiBzdGF0ZSxcbiAgICB9O1xuXG4gICAgY29uc3QgZXZlbnQ6IENvbmZpZ0Zvcm1VcGRhdGVFdmVudCA9IHtcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGU6IHtcbiAgICAgICAgLi4udGhpcy5hdHRyaWJ1dGUsXG4gICAgICAgIHZhbHVlczogdGhpcy5tdWx0aXBsZVNlbGVjdGlvblZhbHVlcyxcbiAgICAgIH0sXG4gICAgICBvd25lcktleTogdGhpcy5vd25lcktleSxcbiAgICAgIHVwZGF0ZVR5cGU6IENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLkFUVFJJQlVURSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHF1YW50aXR5IG9mIHRoZSBnaXZlbiB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gIGV2ZW50VmFsdWUgLSBldmVudCB2YWx1ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtDb25maWdGb3JtVXBkYXRlRXZlbnR9IC0gZm9ybSB1cGRhdGUgZXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCB1cGRhdGVNdWx0aXBsZVNlbGVjdGlvblZhbHVlc1F1YW50aXR5KGV2ZW50VmFsdWU6IHtcbiAgICB2YWx1ZUNvZGU6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICB9KTogQ29uZmlnRm9ybVVwZGF0ZUV2ZW50IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlIHwgdW5kZWZpbmVkID1cbiAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Rpb25WYWx1ZXMuZmluZChcbiAgICAgICAgKHNlbGVjdGlvblZhbHVlKSA9PiBzZWxlY3Rpb25WYWx1ZS52YWx1ZUNvZGUgPT09IGV2ZW50VmFsdWUudmFsdWVDb2RlXG4gICAgICApO1xuXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhbHVlLnF1YW50aXR5ID0gZXZlbnRWYWx1ZS5xdWFudGl0eTtcblxuICAgIGNvbnN0IGV2ZW50OiBDb25maWdGb3JtVXBkYXRlRXZlbnQgPSB7XG4gICAgICBjaGFuZ2VkQXR0cmlidXRlOiB7XG4gICAgICAgIC4uLnRoaXMuYXR0cmlidXRlLFxuICAgICAgICB2YWx1ZXM6IFt2YWx1ZV0sXG4gICAgICB9LFxuICAgICAgb3duZXJLZXk6IHRoaXMub3duZXJLZXksXG4gICAgICB1cGRhdGVUeXBlOiBDb25maWd1cmF0b3IuVXBkYXRlVHlwZS5WQUxVRV9RVUFOVElUWSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgb25TZWxlY3QoZXZlbnRWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoXG4gICAgICB0aGlzLnVwZGF0ZU11bHRpcGxlU2VsZWN0aW9uVmFsdWVzKGV2ZW50VmFsdWUsIHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIG9uRGVzZWxlY3QoZXZlbnRWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoXG4gICAgICB0aGlzLnVwZGF0ZU11bHRpcGxlU2VsZWN0aW9uVmFsdWVzKGV2ZW50VmFsdWUsIGZhbHNlKVxuICAgICk7XG4gIH1cblxuICBvbkRlc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcbiAgICBjb25zdCBldmVudDogQ29uZmlnRm9ybVVwZGF0ZUV2ZW50ID0ge1xuICAgICAgY2hhbmdlZEF0dHJpYnV0ZToge1xuICAgICAgICAuLi50aGlzLmF0dHJpYnV0ZSxcbiAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgIH0sXG4gICAgICBvd25lcktleTogdGhpcy5vd25lcktleSxcbiAgICAgIHVwZGF0ZVR5cGU6IENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLkFUVFJJQlVURSxcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25DaGFuZ2VWYWx1ZVF1YW50aXR5KGV2ZW50VmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KFxuICAgICAgdGhpcy51cGRhdGVNdWx0aXBsZVNlbGVjdGlvblZhbHVlc1F1YW50aXR5KGV2ZW50VmFsdWUpXG4gICAgKTtcbiAgfVxuXG4gIG9uQ2hhbmdlQXR0cmlidXRlUXVhbnRpdHkoZXZlbnRPYmplY3Q6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcblxuICAgIGlmICghZXZlbnRPYmplY3QpIHtcbiAgICAgIHRoaXMub25EZXNlbGVjdEFsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uSGFuZGxlQXR0cmlidXRlUXVhbnRpdHkoZXZlbnRPYmplY3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRyYWN0IGNvcnJlc3BvbmRpbmcgcHJpY2UgZm9ybXVsYSBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9uc30gLSBOZXcgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZXh0cmFjdFByaWNlRm9ybXVsYVBhcmFtZXRlcnMoKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVhbnRpdHk6IDAsXG4gICAgICBwcmljZToge1xuICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgY3VycmVuY3lJc286ICcnLFxuICAgICAgfSxcbiAgICAgIHByaWNlVG90YWw6IHRoaXMuYXR0cmlidXRlLmF0dHJpYnV0ZVByaWNlVG90YWwsXG4gICAgICBpc0xpZ2h0ZWRVcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgY29ycmVzcG9uZGluZyBwcm9kdWN0IGNhcmQgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVBbGxCdXR0b25zIC0gUHJldmVudCBhbGwgYWN0aW9ucywgZS5nLiB3aGlsZSBsb2FkaW5nXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlkZVJlbW92ZUJ1dHRvbiAtIGhpZGUgcmVtb3ZlIGFjdGlvbiwgZS5nLiBpZiBvbmx5IHZhbHVlIHJlcXVpcmVkIGF0dHJpYnV0ZVxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5WYWx1ZX0gdmFsdWUgLSBWYWx1ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBpbmRleCBvZiBjdXJyZW50IHZhbHVlIGluIGxpc3Qgb2YgdmFsdWVzIG9mIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3JBdHRyaWJ1dGVQcm9kdWN0Q2FyZENvbXBvbmVudE9wdGlvbnN9IC0gTmV3IHByb2R1Y3QgY2FyZCBvcHRpb25zXG4gICAqL1xuICBleHRyYWN0UHJvZHVjdENhcmRQYXJhbWV0ZXJzKFxuICAgIGRpc2FibGVBbGxCdXR0b25zOiBib29sZWFuIHwgbnVsbCxcbiAgICBoaWRlUmVtb3ZlQnV0dG9uOiBib29sZWFuIHwgbnVsbCxcbiAgICB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlLFxuICAgIGluZGV4OiBudW1iZXJcbiAgKTogQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzYWJsZUFsbEJ1dHRvbnM6IGRpc2FibGVBbGxCdXR0b25zID8/IGZhbHNlLFxuICAgICAgaGlkZVJlbW92ZUJ1dHRvbjogaGlkZVJlbW92ZUJ1dHRvbiA/PyBmYWxzZSxcbiAgICAgIHByb2R1Y3RCb3VuZFZhbHVlOiB2YWx1ZSxcbiAgICAgIG11bHRpU2VsZWN0OiB0cnVlLFxuICAgICAgd2l0aFF1YW50aXR5OiB0aGlzLndpdGhRdWFudGl0eSxcbiAgICAgIGxvYWRpbmckOiB0aGlzLmxvYWRpbmckLFxuICAgICAgYXR0cmlidXRlSWQ6IHRoaXMuZ2V0QXR0cmlidXRlQ29kZSh0aGlzLmF0dHJpYnV0ZSksXG4gICAgICBhdHRyaWJ1dGVMYWJlbDogdGhpcy5hdHRyaWJ1dGUubGFiZWwsXG4gICAgICBhdHRyaWJ1dGVOYW1lOiB0aGlzLmF0dHJpYnV0ZS5uYW1lLFxuICAgICAgaXRlbUNvdW50OiB0aGlzLmF0dHJpYnV0ZS52YWx1ZXM/Lmxlbmd0aFxuICAgICAgICA/IHRoaXMuYXR0cmlidXRlLnZhbHVlcy5sZW5ndGhcbiAgICAgICAgOiAwLFxuICAgICAgaXRlbUluZGV4OiBpbmRleCxcbiAgICB9O1xuICB9XG59XG4iLCI8ZGl2XG4gIGlkPVwie3sgY3JlYXRlQXR0cmlidXRlSWRGb3JDb25maWd1cmF0b3IoYXR0cmlidXRlKSB9fVwiXG4gICpuZ0lmPVwiYXR0cmlidXRlPy52YWx1ZXM/Lmxlbmd0aFwiXG4+XG4gIDxkaXZcbiAgICAqbmdJZj1cIndpdGhRdWFudGl0eU9uQXR0cmlidXRlTGV2ZWxcIlxuICAgIGNsYXNzPVwiY3gtYXR0cmlidXRlLWxldmVsLXF1YW50aXR5LXByaWNlXCJcbiAgPlxuICAgIDxjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5XG4gICAgICAoY2hhbmdlUXVhbnRpdHkpPVwib25DaGFuZ2VBdHRyaWJ1dGVRdWFudGl0eSgkZXZlbnQpXCJcbiAgICAgIFtxdWFudGl0eU9wdGlvbnNdPVwiZXh0cmFjdFF1YW50aXR5UGFyYW1ldGVycyhhdHRyaWJ1dGUucXVhbnRpdHkpXCJcbiAgICA+PC9jeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLXF1YW50aXR5PlxuXG4gICAgPGN4LWNvbmZpZ3VyYXRvci1wcmljZVxuICAgICAgW2Zvcm11bGFdPVwiZXh0cmFjdFByaWNlRm9ybXVsYVBhcmFtZXRlcnMoKVwiXG4gICAgPjwvY3gtY29uZmlndXJhdG9yLXByaWNlPlxuICA8L2Rpdj5cblxuICA8Y3gtY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1wcm9kdWN0LWNhcmRcbiAgICBpZD1cInt7XG4gICAgICBjcmVhdGVBdHRyaWJ1dGVWYWx1ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSwgdmFsdWU/LnZhbHVlQ29kZSlcbiAgICB9fVwiXG4gICAgKGhhbmRsZURlc2VsZWN0KT1cIm9uRGVzZWxlY3QoJGV2ZW50KVwiXG4gICAgKGhhbmRsZVF1YW50aXR5KT1cIm9uQ2hhbmdlVmFsdWVRdWFudGl0eSgkZXZlbnQpXCJcbiAgICAoaGFuZGxlU2VsZWN0KT1cIm9uU2VsZWN0KCRldmVudClcIlxuICAgICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBhdHRyaWJ1dGU/LnZhbHVlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgW3Byb2R1Y3RDYXJkT3B0aW9uc109XCJcbiAgICAgIGV4dHJhY3RQcm9kdWN0Q2FyZFBhcmFtZXRlcnMoXG4gICAgICAgIGxvYWRpbmckIHwgYXN5bmMsXG4gICAgICAgIHByZXZlbnRBY3Rpb24kIHwgYXN5bmMsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBpXG4gICAgICApXG4gICAgXCJcbiAgPlxuICA8L2N4LWNvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkPlxuPC9kaXY+XG4iXX0=