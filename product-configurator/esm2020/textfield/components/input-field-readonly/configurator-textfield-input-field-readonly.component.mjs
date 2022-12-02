/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ConfiguratorTextfieldInputFieldReadonlyComponent {
    constructor() {
        this.PREFIX_TEXTFIELD = 'cx-configurator-textfield';
    }
    /**
     * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
     * @param {ConfiguratorTextfield.ConfigurationInfo} attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns {string} ID
     */
    getIdLabel(attribute) {
        return (this.PREFIX_TEXTFIELD + 'label' + this.getLabelForIdGeneration(attribute));
    }
    getLabelForIdGeneration(attribute) {
        //replace white spaces with an empty string
        return attribute.configurationLabel.replace(/\s/g, '');
    }
}
ConfiguratorTextfieldInputFieldReadonlyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTextfieldInputFieldReadonlyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldInputFieldReadonlyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorTextfieldInputFieldReadonlyComponent, selector: "cx-configurator-textfield-input-field-readonly", inputs: { attribute: "attribute" }, ngImport: i0, template: "<span id=\"{{ getIdLabel(attribute) }}\" class=\"cx-visually-hidden\">\n  {{\n    'configurator.a11y.valueOfAttributeFull'\n      | cxTranslate\n        : {\n            value: attribute.configurationValue,\n            attribute: attribute.configurationLabel\n          }\n  }}\n</span>\n<label aria-hidden=\"true\" attr.aria-describedby=\"{{ getIdLabel(attribute) }}\">{{\n  attribute.configurationLabel\n}}</label>\n<div aria-hidden=\"true\">\n  {{ attribute.configurationValue }}\n</div>\n", dependencies: [{ kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTextfieldInputFieldReadonlyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-input-field-readonly', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span id=\"{{ getIdLabel(attribute) }}\" class=\"cx-visually-hidden\">\n  {{\n    'configurator.a11y.valueOfAttributeFull'\n      | cxTranslate\n        : {\n            value: attribute.configurationValue,\n            attribute: attribute.configurationLabel\n          }\n  }}\n</span>\n<label aria-hidden=\"true\" attr.aria-describedby=\"{{ getIdLabel(attribute) }}\">{{\n  attribute.configurationLabel\n}}</label>\n<div aria-hidden=\"true\">\n  {{ attribute.configurationValue }}\n</div>\n" }]
        }], propDecorators: { attribute: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC1yZWFkb25seS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL2NvbXBvbmVudHMvaW5wdXQtZmllbGQtcmVhZG9ubHkvY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC1yZWFkb25seS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL2NvbXBvbmVudHMvaW5wdXQtZmllbGQtcmVhZG9ubHkvY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC1yZWFkb25seS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVMxRSxNQUFNLE9BQU8sZ0RBQWdEO0lBTDdEO1FBTUUscUJBQWdCLEdBQUcsMkJBQTJCLENBQUM7S0FxQmhEO0lBakJDOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsU0FBa0Q7UUFDM0QsT0FBTyxDQUNMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVTLHVCQUF1QixDQUMvQixTQUFrRDtRQUVsRCwyQ0FBMkM7UUFDM0MsT0FBTyxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs2SUFyQlUsZ0RBQWdEO2lJQUFoRCxnREFBZ0QsMEhDZjdELCtlQWdCQTsyRkREYSxnREFBZ0Q7a0JBTDVELFNBQVM7K0JBQ0UsZ0RBQWdELG1CQUV6Qyx1QkFBdUIsQ0FBQyxNQUFNOzhCQUt0QyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29uZmlndXJhdG9yVGV4dGZpZWxkIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3ItdGV4dGZpZWxkLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uZmlndXJhdG9yLXRleHRmaWVsZC1pbnB1dC1maWVsZC1yZWFkb25seScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItdGV4dGZpZWxkLWlucHV0LWZpZWxkLXJlYWRvbmx5LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclRleHRmaWVsZElucHV0RmllbGRSZWFkb25seUNvbXBvbmVudCB7XG4gIFBSRUZJWF9URVhURklFTEQgPSAnY3gtY29uZmlndXJhdG9yLXRleHRmaWVsZCc7XG5cbiAgQElucHV0KCkgYXR0cmlidXRlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm87XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIGFuIElEIGZvciB0aGUgYXR0cmlidXRlIGxhYmVsIGJ5IHVzaW5nIHRoZSBsYWJlbCBmcm9tIHRoZSBiYWNrZW5kIGFuZCBhIHByZWZpeCAnbGFiZWwnXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvfSBhdHRyaWJ1dGUgVGV4dGZpZWxkIGNvbmZpZ3VyYXRvciBhdHRyaWJ1dGUuIENhcnJpZXMgdGhlIGF0dHJpYnV0ZSBsYWJlbCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBiYWNrZW5kXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IElEXG4gICAqL1xuICBnZXRJZExhYmVsKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5QUkVGSVhfVEVYVEZJRUxEICsgJ2xhYmVsJyArIHRoaXMuZ2V0TGFiZWxGb3JJZEdlbmVyYXRpb24oYXR0cmlidXRlKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0TGFiZWxGb3JJZEdlbmVyYXRpb24oXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm9cbiAgKTogc3RyaW5nIHtcbiAgICAvL3JlcGxhY2Ugd2hpdGUgc3BhY2VzIHdpdGggYW4gZW1wdHkgc3RyaW5nXG4gICAgcmV0dXJuIGF0dHJpYnV0ZS5jb25maWd1cmF0aW9uTGFiZWwucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgfVxufVxuIiwiPHNwYW4gaWQ9XCJ7eyBnZXRJZExhYmVsKGF0dHJpYnV0ZSkgfX1cIiBjbGFzcz1cImN4LXZpc3VhbGx5LWhpZGRlblwiPlxuICB7e1xuICAgICdjb25maWd1cmF0b3IuYTExeS52YWx1ZU9mQXR0cmlidXRlRnVsbCdcbiAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgOiB7XG4gICAgICAgICAgICB2YWx1ZTogYXR0cmlidXRlLmNvbmZpZ3VyYXRpb25WYWx1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLmNvbmZpZ3VyYXRpb25MYWJlbFxuICAgICAgICAgIH1cbiAgfX1cbjwvc3Bhbj5cbjxsYWJlbCBhcmlhLWhpZGRlbj1cInRydWVcIiBhdHRyLmFyaWEtZGVzY3JpYmVkYnk9XCJ7eyBnZXRJZExhYmVsKGF0dHJpYnV0ZSkgfX1cIj57e1xuICBhdHRyaWJ1dGUuY29uZmlndXJhdGlvbkxhYmVsXG59fTwvbGFiZWw+XG48ZGl2IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICB7eyBhdHRyaWJ1dGUuY29uZmlndXJhdGlvblZhbHVlIH19XG48L2Rpdj5cbiJdfQ==