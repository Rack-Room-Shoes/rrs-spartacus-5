/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../service/configurator-storefront-utils.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/core";
export class ConfiguratorAttributeFooterComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils) {
        super();
        this.configUtils = configUtils;
        this.iconType = ICON_TYPE;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute is a
         * free input field
         */
        this.showRequiredMessageForUserInput$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => (result ? this.needsUserInputMessage() : false)));
    }
    /**
     * Checks if attribute is a user input typed attribute with empty value.
     * Method will return false for domain based attributes
     * @param {string} input - user input
     */
    isUserInputEmpty(input) {
        return input !== undefined && (!input.trim() || 0 === input.length);
    }
    needsUserInputMessage() {
        const uiType = this.attribute.uiType;
        const needsMessage = this.attribute.required &&
            this.attribute.incomplete &&
            (uiType === Configurator.UiType.STRING ||
                uiType === Configurator.UiType.NUMERIC) &&
            this.isUserInputEmpty(this.attribute.userInput);
        return needsMessage ?? false;
    }
}
ConfiguratorAttributeFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterComponent, deps: [{ token: i1.ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeFooterComponent, selector: "cx-configurator-attribute-footer", inputs: { attribute: "attribute", owner: "owner", groupId: "groupId" }, usesInheritance: true, ngImport: i0, template: "<div\n  *ngIf=\"showRequiredMessageForUserInput$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"\n    'configurator.attribute.defaultRequiredMessage' | cxTranslate\n  \"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"showRequiredMessageForUserInput$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"\n    'configurator.attribute.defaultRequiredMessage' | cxTranslate\n  \"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorStorefrontUtilsService }]; }, propDecorators: { attribute: [{
                type: Input
            }], owner: [{
                type: Input
            }], groupId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1mb290ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9mb290ZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1mb290ZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9mb290ZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1mb290ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUV0RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxxREFBcUQsQ0FBQzs7Ozs7O0FBT3pHLE1BQU0sT0FBTyxvQ0FDWCxTQUFRLGtDQUFrQztJQU8xQyxZQUFzQixXQUErQztRQUNuRSxLQUFLLEVBQUUsQ0FBQztRQURZLGdCQUFXLEdBQVgsV0FBVyxDQUFvQztRQUlyRSxhQUFRLEdBQUcsU0FBUyxDQUFDO0lBRnJCLENBQUM7SUFLRCxRQUFRO1FBQ047OztXQUdHO1FBQ0gsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLElBQUksQ0FBQyxXQUFXO2FBQ3JELHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdCQUFnQixDQUFDLEtBQWM7UUFDN0IsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRVMscUJBQXFCO1FBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVO1lBQ3pCLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDcEMsTUFBTSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sWUFBWSxJQUFJLEtBQUssQ0FBQztJQUMvQixDQUFDOztpSUEzQ1Usb0NBQW9DO3FIQUFwQyxvQ0FBb0MsdUtDekJqRCxnZEFjQTsyRkRXYSxvQ0FBb0M7a0JBTGhELFNBQVM7K0JBQ0Usa0NBQWtDLG1CQUUzQix1QkFBdUIsQ0FBQyxNQUFNO3lIQU10QyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbkNvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9jb25maWd1cmF0b3Itc3RvcmVmcm9udC11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcy9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtYmFzZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLWZvb3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWZvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVGb290ZXJDb21wb25lbnRcbiAgZXh0ZW5kcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0XG57XG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZTtcbiAgQElucHV0KCkgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcjtcbiAgQElucHV0KCkgZ3JvdXBJZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb25maWdVdGlsczogQ29uZmlndXJhdG9yU3RvcmVmcm9udFV0aWxzU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBpY29uVHlwZSA9IElDT05fVFlQRTtcbiAgc2hvd1JlcXVpcmVkTWVzc2FnZUZvclVzZXJJbnB1dCQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICogU2hvdyBtZXNzYWdlIHRoYXQgaW5kaWNhdGVzIHRoYXQgYXR0cmlidXRlIGlzIHJlcXVpcmVkIGluIGNhc2UgYXR0cmlidXRlIGlzIGFcbiAgICAgKiBmcmVlIGlucHV0IGZpZWxkXG4gICAgICovXG4gICAgdGhpcy5zaG93UmVxdWlyZWRNZXNzYWdlRm9yVXNlcklucHV0JCA9IHRoaXMuY29uZmlnVXRpbHNcbiAgICAgIC5pc0NhcnRFbnRyeU9yR3JvdXBWaXNpdGVkKHRoaXMub3duZXIsIHRoaXMuZ3JvdXBJZClcbiAgICAgIC5waXBlKG1hcCgocmVzdWx0KSA9PiAocmVzdWx0ID8gdGhpcy5uZWVkc1VzZXJJbnB1dE1lc3NhZ2UoKSA6IGZhbHNlKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhdHRyaWJ1dGUgaXMgYSB1c2VyIGlucHV0IHR5cGVkIGF0dHJpYnV0ZSB3aXRoIGVtcHR5IHZhbHVlLlxuICAgKiBNZXRob2Qgd2lsbCByZXR1cm4gZmFsc2UgZm9yIGRvbWFpbiBiYXNlZCBhdHRyaWJ1dGVzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCAtIHVzZXIgaW5wdXRcbiAgICovXG4gIGlzVXNlcklucHV0RW1wdHkoaW5wdXQ/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5wdXQgIT09IHVuZGVmaW5lZCAmJiAoIWlucHV0LnRyaW0oKSB8fCAwID09PSBpbnB1dC5sZW5ndGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5lZWRzVXNlcklucHV0TWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCB1aVR5cGUgPSB0aGlzLmF0dHJpYnV0ZS51aVR5cGU7XG4gICAgY29uc3QgbmVlZHNNZXNzYWdlID1cbiAgICAgIHRoaXMuYXR0cmlidXRlLnJlcXVpcmVkICYmXG4gICAgICB0aGlzLmF0dHJpYnV0ZS5pbmNvbXBsZXRlICYmXG4gICAgICAodWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLlNUUklORyB8fFxuICAgICAgICB1aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuTlVNRVJJQykgJiZcbiAgICAgIHRoaXMuaXNVc2VySW5wdXRFbXB0eSh0aGlzLmF0dHJpYnV0ZS51c2VySW5wdXQpO1xuICAgIHJldHVybiBuZWVkc01lc3NhZ2UgPz8gZmFsc2U7XG4gIH1cbn1cbiIsIjxkaXZcbiAgKm5nSWY9XCJzaG93UmVxdWlyZWRNZXNzYWdlRm9yVXNlcklucHV0JCB8IGFzeW5jXCJcbiAgY2xhc3M9XCJjeC1yZXF1aXJlZC1lcnJvci1tc2dcIlxuICBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpIH19XCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5kZWZhdWx0UmVxdWlyZWRNZXNzYWdlJyB8IGN4VHJhbnNsYXRlXG4gIFwiXG4gIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiXG4gIGFyaWEtYXRvbWljPVwidHJ1ZVwiXG4gIHJvbGU9XCJhbGVydFwiXG4+XG4gIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLkVSUk9SXCI+PC9jeC1pY29uPlxuICB7eyAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5kZWZhdWx0UmVxdWlyZWRNZXNzYWdlJyB8IGN4VHJhbnNsYXRlIH19XG48L2Rpdj5cbiJdfQ==