/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../quantity/configurator-attribute-quantity.service";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService) {
        super();
        this.quantityService = quantityService;
        this.loading$ = new BehaviorSubject(false);
        this.selectionChange = new EventEmitter();
    }
    /**
     * Checks if we are supposed to render a quantity control on attribute level, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker on attribute level?
     */
    get withQuantityOnAttributeLevel() {
        return this.quantityService.withQuantityOnAttributeLevel(this.attribute);
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
        return this.quantityService.disableQuantityActionsMultiSelection(this.attribute);
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {number} initialQuantity - Initial quantity
     * @param {boolean} allowZero - Allow zero
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(initialQuantity, allowZero) {
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: allowZero ?? !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    onHandleAttributeQuantity(quantity) {
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
    /**
     * Extract corresponding price formula parameters.
     * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
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
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeMultiSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, deps: [{ token: i1.ConfiguratorAttributeQuantityService }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeMultiSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeMultiSelectionBaseComponent, inputs: { attribute: "attribute", ownerKey: "ownerKey" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorAttributeQuantityService }]; }, propDecorators: { attribute: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL2Jhc2UvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYmFzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBS3pFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7QUFHN0Ysa0VBQWtFO0FBQ2xFLE1BQU0sT0FBZ0IsZ0RBQWlELFNBQVEsa0NBQWtDO0lBTy9HLFlBQXNCLGVBQXFEO1FBQ3pFLEtBQUssRUFBRSxDQUFDO1FBRFksb0JBQWUsR0FBZixlQUFlLENBQXNDO1FBTjNFLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUlyQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUF5QixDQUFDO0lBSXRFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUksNEJBQTRCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsb0NBQW9DLENBQzlELElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCx5QkFBeUIsQ0FDdkIsZUFBd0IsRUFDeEIsU0FBbUI7UUFFbkIsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEQsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPLE9BQU8sSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE9BQU87WUFDTCxTQUFTLEVBQUUsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO1lBQ2hELGVBQWUsRUFBRSxlQUFlO1lBQ2hDLHVCQUF1QixFQUFFLHVCQUF1QjtTQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUVTLHlCQUF5QixDQUFDLFFBQWdCO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUEwQjtZQUNuQyxnQkFBZ0IsRUFBRTtnQkFDaEIsR0FBRyxJQUFJLENBQUMsU0FBUztnQkFDakIsUUFBUTthQUNUO1lBQ0QsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQjtTQUN2RCxDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNkJBQTZCO1FBQzNCLE9BQU87WUFDTCxRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsQ0FBQztnQkFDUixXQUFXLEVBQUUsRUFBRTthQUNoQjtZQUNELFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQjtZQUM5QyxXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGtDQUFrQyxDQUNoQyxLQUF5QjtRQUV6QixPQUFPO1lBQ0wsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLEtBQUssRUFBRSxLQUFLLENBQUMsVUFBVTtZQUN2QixVQUFVLEVBQUUsS0FBSyxDQUFDLGVBQWU7WUFDakMsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRO1NBQzVCLENBQUM7SUFDSixDQUFDOzs2SUF0SG1CLGdEQUFnRDtpSUFBaEQsZ0RBQWdEOzJGQUFoRCxnREFBZ0Q7a0JBRnJFLFNBQVM7MkhBS0MsU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLGVBQWU7c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWdGb3JtVXBkYXRlRXZlbnQgfSBmcm9tICcuLi8uLi8uLi9mb3JtL2NvbmZpZ3VyYXRvci1mb3JtLmV2ZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlDb21wb25lbnRPcHRpb25zIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtYmFzZS5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKClcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uQmFzZUNvbXBvbmVudCBleHRlbmRzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQge1xuICBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZTtcbiAgQElucHV0KCkgb3duZXJLZXk6IHN0cmluZztcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q29uZmlnRm9ybVVwZGF0ZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBxdWFudGl0eVNlcnZpY2U6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5U2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHdlIGFyZSBzdXBwb3NlZCB0byByZW5kZXIgYSBxdWFudGl0eSBjb250cm9sIG9uIGF0dHJpYnV0ZSBsZXZlbCwgd2hpY2hcbiAgICogY2FuIGJlIGRlcml2ZWQgZnJvbSB0aGUgYXR0cmlidXRlIG1ldGEgZGF0YVxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc3BsYXkgcXVhbnRpdHkgcGlja2VyIG9uIGF0dHJpYnV0ZSBsZXZlbD9cbiAgICovXG4gIGdldCB3aXRoUXVhbnRpdHlPbkF0dHJpYnV0ZUxldmVsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnF1YW50aXR5U2VydmljZS53aXRoUXVhbnRpdHlPbkF0dHJpYnV0ZUxldmVsKHRoaXMuYXR0cmlidXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgd2UgYXJlIHN1cHBvc2VkIHRvIHJlbmRlciBhIHF1YW50aXR5IGNvbnRyb2wsIHdoaWNoXG4gICAqIGNhbiBiZSBkZXJpdmVkIGZyb20gdGhlIGF0dHJpYnV0ZSBtZXRhIGRhdGFcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSBEaXNwbGF5IHF1YW50aXR5IHBpY2tlcj9cbiAgICovXG4gIGdldCB3aXRoUXVhbnRpdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHlTZXJ2aWNlLndpdGhRdWFudGl0eShcbiAgICAgIHRoaXMuYXR0cmlidXRlLmRhdGFUeXBlID8/IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5OT1RfSU1QTEVNRU5URUQsXG4gICAgICB0aGlzLmF0dHJpYnV0ZS51aVR5cGUgPz8gQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URURcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBxdWFudGl0eSBjb250cm9sIHNob3VsZCBiZSBkaXNhYmxlZFxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIERpc2FibGUgcXVhbnRpdHkgcGlja2VyP1xuICAgKi9cbiAgZ2V0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucXVhbnRpdHlTZXJ2aWNlLmRpc2FibGVRdWFudGl0eUFjdGlvbnNNdWx0aVNlbGVjdGlvbihcbiAgICAgIHRoaXMuYXR0cmlidXRlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgRXh0cmFjdCBjb3JyZXNwb25kaW5nIHF1YW50aXR5IHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluaXRpYWxRdWFudGl0eSAtIEluaXRpYWwgcXVhbnRpdHlcbiAgICogQHBhcmFtIHtib29sZWFufSBhbGxvd1plcm8gLSBBbGxvdyB6ZXJvXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5Q29tcG9uZW50T3B0aW9uc30gLSBOZXcgcXVhbnRpdHkgb3B0aW9uc1xuICAgKi9cbiAgZXh0cmFjdFF1YW50aXR5UGFyYW1ldGVycyhcbiAgICBpbml0aWFsUXVhbnRpdHk/OiBudW1iZXIsXG4gICAgYWxsb3daZXJvPzogYm9vbGVhblxuICApOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudE9wdGlvbnMge1xuICAgIGNvbnN0IGRpc2FibGVRdWFudGl0eUFjdGlvbnMkID0gdGhpcy5sb2FkaW5nJC5waXBlKFxuICAgICAgbWFwKChsb2FkaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2FkaW5nIHx8IHRoaXMuZGlzYWJsZVF1YW50aXR5QWN0aW9ucztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGxvd1plcm86IGFsbG93WmVybyA/PyAhdGhpcy5hdHRyaWJ1dGUucmVxdWlyZWQsXG4gICAgICBpbml0aWFsUXVhbnRpdHk6IGluaXRpYWxRdWFudGl0eSxcbiAgICAgIGRpc2FibGVRdWFudGl0eUFjdGlvbnMkOiBkaXNhYmxlUXVhbnRpdHlBY3Rpb25zJCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uSGFuZGxlQXR0cmlidXRlUXVhbnRpdHkocXVhbnRpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZyQubmV4dCh0cnVlKTtcblxuICAgIGNvbnN0IGV2ZW50OiBDb25maWdGb3JtVXBkYXRlRXZlbnQgPSB7XG4gICAgICBjaGFuZ2VkQXR0cmlidXRlOiB7XG4gICAgICAgIC4uLnRoaXMuYXR0cmlidXRlLFxuICAgICAgICBxdWFudGl0eSxcbiAgICAgIH0sXG4gICAgICBvd25lcktleTogdGhpcy5vd25lcktleSxcbiAgICAgIHVwZGF0ZVR5cGU6IENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLkFUVFJJQlVURV9RVUFOVElUWSxcbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBjb3JyZXNwb25kaW5nIHByaWNlIGZvcm11bGEgcGFyYW1ldGVycy5cbiAgICogRm9yIHRoZSBtdWx0aS1zZWxlY3Rpb24gYXR0cmlidXRlIHR5cGVzIG9ubHkgdG90YWwgcHJpY2Ugb2YgdGhlIGF0dHJpYnV0ZSBzaG91bGQgYmUgZGlzcGxheWVkIGF0IHRoZSBhdHRyaWJ1dGUgbGV2ZWwuXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9uc30gLSBOZXcgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZXh0cmFjdFByaWNlRm9ybXVsYVBhcmFtZXRlcnMoKTogQ29uZmlndXJhdG9yUHJpY2VDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVhbnRpdHk6IDAsXG4gICAgICBwcmljZToge1xuICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgY3VycmVuY3lJc286ICcnLFxuICAgICAgfSxcbiAgICAgIHByaWNlVG90YWw6IHRoaXMuYXR0cmlidXRlLmF0dHJpYnV0ZVByaWNlVG90YWwsXG4gICAgICBpc0xpZ2h0ZWRVcDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgY29ycmVzcG9uZGluZyB2YWx1ZSBwcmljZSBmb3JtdWxhIHBhcmFtZXRlcnMuXG4gICAqIEZvciB0aGUgbXVsdGktc2VsZWN0aW9uIGF0dHJpYnV0ZSB0eXBlcyB0aGUgY29tcGxldGUgcHJpY2UgZm9ybXVsYSBzaG91bGQgYmUgZGlzcGxheWVkIGF0IHRoZSB2YWx1ZSBsZXZlbC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuVmFsdWV9IHZhbHVlIC0gQ29uZmlndXJhdG9yIHZhbHVlXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9uc30gLSBOZXcgcHJpY2UgZm9ybXVsYVxuICAgKi9cbiAgZXh0cmFjdFZhbHVlUHJpY2VGb3JtdWxhUGFyYW1ldGVycyhcbiAgICB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlXG4gICk6IENvbmZpZ3VyYXRvclByaWNlQ29tcG9uZW50T3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1YW50aXR5OiB2YWx1ZS5xdWFudGl0eSxcbiAgICAgIHByaWNlOiB2YWx1ZS52YWx1ZVByaWNlLFxuICAgICAgcHJpY2VUb3RhbDogdmFsdWUudmFsdWVQcmljZVRvdGFsLFxuICAgICAgaXNMaWdodGVkVXA6IHZhbHVlLnNlbGVjdGVkLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==