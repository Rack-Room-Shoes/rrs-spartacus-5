/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../config/configurator-ui-settings.config";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/forms";
import * as i4 from "@spartacus/core";
export class ConfiguratorAttributeInputFieldComponent extends ConfiguratorAttributeBaseComponent {
    constructor(config) {
        super();
        this.config = config;
        this.attributeInputForm = new UntypedFormControl('');
        this.inputChange = new EventEmitter();
        /**
         * In case no config is injected, or when the debounce time is not configured at all,
         * this value will be used as fallback.
         */
        this.FALLBACK_DEBOUNCE_TIME = 500;
    }
    ngOnInit() {
        this.attributeInputForm.setValue(this.attribute.userInput);
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    onChange() {
        const event = {
            ownerKey: this.ownerKey,
            changedAttribute: {
                ...this.attribute,
                userInput: this.attributeInputForm.value,
            },
        };
        if (!this.attributeInputForm.invalid) {
            this.inputChange.emit(event);
        }
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    /**
     * Checks if the component needs to be marked as required.
     * This is never the case if it is used as sub component for an attribute type which allows an additional value
     * @returns Required?
     */
    get isRequired() {
        const isNonDomainAttributeType = this.attribute.uiType === Configurator.UiType.STRING ||
            this.attribute.uiType === Configurator.UiType.NUMERIC;
        return isNonDomainAttributeType ? this.attribute.required ?? false : false;
    }
}
ConfiguratorAttributeInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldComponent, deps: [{ token: i1.ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field", inputs: { ownerType: "ownerType", attribute: "attribute", group: "group", ownerKey: "ownerKey" }, outputs: { inputChange: "inputChange" }, usesInheritance: true, ngImport: i0, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    attr.required=\"{{ attribute.required }}\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"\n      attribute.userInput === undefined || attribute.userInput.length === 0\n        ? ('configurator.a11y.valueOfAttributeBlank'\n          | cxTranslate\n            : {\n                attribute: attribute.label\n              })\n        : ('configurator.a11y.valueOfAttributeFull'\n          | cxTranslate\n            : {\n                value: attribute.userInput,\n                attribute: attribute.label\n              })\n    \"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n", dependencies: [{ kind: "directive", type: i2.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    attr.required=\"{{ attribute.required }}\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"\n      attribute.userInput === undefined || attribute.userInput.length === 0\n        ? ('configurator.a11y.valueOfAttributeBlank'\n          | cxTranslate\n            : {\n                attribute: attribute.label\n              })\n        : ('configurator.a11y.valueOfAttributeFull'\n          | cxTranslate\n            : {\n                value: attribute.userInput,\n                attribute: attribute.label\n              })\n    \"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorUISettingsConfig }]; }, propDecorators: { ownerType: [{
                type: Input
            }], attribute: [{
                type: Input
            }], group: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], inputChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1pbnB1dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL2lucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWlucHV0LWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQWdCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBR3pFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLCtDQUErQyxDQUFDOzs7Ozs7QUFPbkcsTUFBTSxPQUFPLHdDQUNYLFNBQVEsa0NBQWtDO0lBbUIxQyxZQUFzQixNQUFvQztRQUN4RCxLQUFLLEVBQUUsQ0FBQztRQURZLFdBQU0sR0FBTixNQUFNLENBQThCO1FBaEIxRCx1QkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBUXRDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFFbEU7OztXQUdHO1FBQ2dCLDJCQUFzQixHQUFHLEdBQUcsQ0FBQztJQUloRCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUNFLElBQUksQ0FBQyxTQUFTLEtBQUssa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQVU7WUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTtZQUN6QixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQzlCO1lBQ0EsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWTthQUM1QyxJQUFJLENBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUNaLEtBQUssQ0FDSCxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLEtBQUs7WUFDeEQsSUFBSSxDQUFDLHNCQUFzQixDQUM5QixDQUNGLENBQ0Y7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBMEI7WUFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGdCQUFnQixFQUFFO2dCQUNoQixHQUFHLElBQUksQ0FBQyxTQUFTO2dCQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7YUFDekM7U0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksVUFBVTtRQUNaLE1BQU0sd0JBQXdCLEdBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4RCxPQUFPLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM3RSxDQUFDOztxSUE1RVUsd0NBQXdDO3lIQUF4Qyx3Q0FBd0MsK09DN0JyRCwyNkJBMkJBOzJGREVhLHdDQUF3QztrQkFMcEQsU0FBUzsrQkFDRSx1Q0FBdUMsbUJBRWhDLHVCQUF1QixDQUFDLE1BQU07bUhBU3RDLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcvY29uZmlndXJhdG9yLXVpLXNldHRpbmdzLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25maWdGb3JtVXBkYXRlRXZlbnQgfSBmcm9tICcuLi8uLi8uLi9mb3JtL2NvbmZpZ3VyYXRvci1mb3JtLmV2ZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtYmFzZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLWlucHV0LWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtaW5wdXQtZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZENvbXBvbmVudFxuICBleHRlbmRzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICBhdHRyaWJ1dGVJbnB1dEZvcm0gPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKTtcbiAgcHJvdGVjdGVkIHN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIEBJbnB1dCgpIG93bmVyVHlwZTogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZTtcbiAgQElucHV0KCkgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlO1xuICBASW5wdXQoKSBncm91cDogc3RyaW5nO1xuICBASW5wdXQoKSBvd25lcktleTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBpbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q29uZmlnRm9ybVVwZGF0ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBJbiBjYXNlIG5vIGNvbmZpZyBpcyBpbmplY3RlZCwgb3Igd2hlbiB0aGUgZGVib3VuY2UgdGltZSBpcyBub3QgY29uZmlndXJlZCBhdCBhbGwsXG4gICAqIHRoaXMgdmFsdWUgd2lsbCBiZSB1c2VkIGFzIGZhbGxiYWNrLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IEZBTExCQUNLX0RFQk9VTkNFX1RJTUUgPSA1MDA7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogQ29uZmlndXJhdG9yVUlTZXR0aW5nc0NvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmF0dHJpYnV0ZUlucHV0Rm9ybS5zZXRWYWx1ZSh0aGlzLmF0dHJpYnV0ZS51c2VySW5wdXQpO1xuICAgIGlmIChcbiAgICAgIHRoaXMub3duZXJUeXBlID09PSBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLkNBUlRfRU5UUlkgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlLnJlcXVpcmVkICYmXG4gICAgICB0aGlzLmF0dHJpYnV0ZS5pbmNvbXBsZXRlICYmXG4gICAgICAhdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0udmFsdWVcbiAgICApIHtcbiAgICAgIHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLm1hcmtBc1RvdWNoZWQoKTtcbiAgICB9XG4gICAgdGhpcy5zdWIgPSB0aGlzLmF0dHJpYnV0ZUlucHV0Rm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZSgoKSA9PlxuICAgICAgICAgIHRpbWVyKFxuICAgICAgICAgICAgdGhpcy5jb25maWcucHJvZHVjdENvbmZpZ3VyYXRvcj8udXBkYXRlRGVib3VuY2VUaW1lPy5pbnB1dCA/P1xuICAgICAgICAgICAgICB0aGlzLkZBTExCQUNLX0RFQk9VTkNFX1RJTUVcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkNoYW5nZSgpKTtcbiAgfVxuXG4gIG9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50OiBDb25maWdGb3JtVXBkYXRlRXZlbnQgPSB7XG4gICAgICBvd25lcktleTogdGhpcy5vd25lcktleSxcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGU6IHtcbiAgICAgICAgLi4udGhpcy5hdHRyaWJ1dGUsXG4gICAgICAgIHVzZXJJbnB1dDogdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0udmFsdWUsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAoIXRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLmludmFsaWQpIHtcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3ViKSB7XG4gICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGNvbXBvbmVudCBuZWVkcyB0byBiZSBtYXJrZWQgYXMgcmVxdWlyZWQuXG4gICAqIFRoaXMgaXMgbmV2ZXIgdGhlIGNhc2UgaWYgaXQgaXMgdXNlZCBhcyBzdWIgY29tcG9uZW50IGZvciBhbiBhdHRyaWJ1dGUgdHlwZSB3aGljaCBhbGxvd3MgYW4gYWRkaXRpb25hbCB2YWx1ZVxuICAgKiBAcmV0dXJucyBSZXF1aXJlZD9cbiAgICovXG4gIGdldCBpc1JlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzTm9uRG9tYWluQXR0cmlidXRlVHlwZSA9XG4gICAgICB0aGlzLmF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuU1RSSU5HIHx8XG4gICAgICB0aGlzLmF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuTlVNRVJJQztcbiAgICByZXR1cm4gaXNOb25Eb21haW5BdHRyaWJ1dGVUeXBlID8gdGhpcy5hdHRyaWJ1dGUucmVxdWlyZWQgPz8gZmFsc2UgOiBmYWxzZTtcbiAgfVxufVxuIiwiPGRpdiBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSkgfX1cIiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgPGlucHV0XG4gICAgW2Zvcm1Db250cm9sXT1cImF0dHJpYnV0ZUlucHV0Rm9ybVwiXG4gICAgW3JlcXVpcmVkXT1cImlzUmVxdWlyZWRcIlxuICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICBhdHRyLnJlcXVpcmVkPVwie3sgYXR0cmlidXRlLnJlcXVpcmVkIH19XCJcbiAgICBtYXhsZW5ndGg9XCJ7eyBhdHRyaWJ1dGUubWF4bGVuZ3RoIH19XCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgYXR0cmlidXRlLnVzZXJJbnB1dCA9PT0gdW5kZWZpbmVkIHx8IGF0dHJpYnV0ZS51c2VySW5wdXQubGVuZ3RoID09PSAwXG4gICAgICAgID8gKCdjb25maWd1cmF0b3IuYTExeS52YWx1ZU9mQXR0cmlidXRlQmxhbmsnXG4gICAgICAgICAgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUubGFiZWxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgOiAoJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlT2ZBdHRyaWJ1dGVGdWxsJ1xuICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBhdHRyaWJ1dGUudXNlcklucHV0LFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLmxhYmVsXG4gICAgICAgICAgICAgIH0pXG4gICAgXCJcbiAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdsYWJlbCcsIGF0dHJpYnV0ZS5uYW1lKVwiXG4gICAgW2N4Rm9jdXNdPVwie1xuICAgICAga2V5OiBjcmVhdGVBdHRyaWJ1dGVJZEZvckNvbmZpZ3VyYXRvcihhdHRyaWJ1dGUpXG4gICAgfVwiXG4gIC8+XG48L2Rpdj5cbiJdfQ==