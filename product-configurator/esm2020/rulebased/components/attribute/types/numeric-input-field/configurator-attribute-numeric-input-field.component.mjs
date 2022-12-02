/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { getLocaleId } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, isDevMode, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import * as i0 from "@angular/core";
import * as i1 from "./configurator-attribute-numeric-input-field.component.service";
import * as i2 from "../../../config/configurator-ui-settings.config";
import * as i3 from "@spartacus/core";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/common";
class DefaultSettings {
}
export class ConfiguratorAttributeNumericInputFieldComponent extends ConfiguratorAttributeInputFieldComponent {
    constructor(configAttributeNumericInputFieldService, config, translation) {
        super(config);
        this.configAttributeNumericInputFieldService = configAttributeNumericInputFieldService;
        this.config = config;
        this.translation = translation;
        this.iconType = ICON_TYPE;
        this.intervals = [];
    }
    /**
     * Do we need to display a validation message
     */
    mustDisplayValidationMessage() {
        const wrongFormat = (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
            this.attributeInputForm.errors?.wrongFormat;
        return wrongFormat;
    }
    ngOnInit() {
        //locales are available as 'languages' in the commerce backend
        this.locale = this.getInstalledLocale(this.language);
        let numDecimalPlaces = this.attribute.numDecimalPlaces;
        let numTotalLength = this.attribute.numTotalLength;
        let negativeAllowed = this.attribute.negativeAllowed;
        if (numDecimalPlaces === undefined ||
            numTotalLength === undefined ||
            negativeAllowed === undefined) {
            //This won't happen in environments with the standard configurators deployed, as numeric
            //attributes do carry these settings. We still introduce default values to ease development
            //of extension use cases, but log a warning
            const defaultSettings = this.getDefaultSettings();
            numDecimalPlaces = defaultSettings.numDecimalPlaces;
            numTotalLength = defaultSettings.numTotalLength;
            negativeAllowed = defaultSettings.negativeAllowed;
            if (isDevMode()) {
                console.warn('Meta data for numeric attribute not present, falling back to defaults');
            }
        }
        this.attributeInputForm = new UntypedFormControl('', [
            this.configAttributeNumericInputFieldService.getNumberFormatValidator(this.locale, numDecimalPlaces, numTotalLength, negativeAllowed),
        ]);
        this.numericFormatPattern =
            this.configAttributeNumericInputFieldService.getPatternForValidationMessage(numDecimalPlaces, numTotalLength, negativeAllowed, this.locale);
        if (this.attribute.userInput) {
            this.attributeInputForm.setValue(this.attribute.userInput);
        }
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        if (this.attribute.intervalInDomain) {
            this.intervals =
                this.configAttributeNumericInputFieldService.getIntervals(this.attribute.values);
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    /**
     * Returns a concatenated help text for multiple intervals.
     */
    getHelpTextForInterval() {
        let intervalText = '';
        let concatenatedIntervalText = '';
        this.intervals.forEach((interval, index) => {
            intervalText = this.getIntervalText(interval);
            if (index > 0) {
                intervalText =
                    intervalText.charAt(0).toLowerCase() + intervalText.slice(1);
                this.translation
                    .translate('configurator.a11y.combinedIntervalsText', {
                    combinedInterval: concatenatedIntervalText,
                    newInterval: intervalText,
                })
                    .pipe(take(1))
                    .subscribe((text) => (concatenatedIntervalText = text));
            }
            else {
                concatenatedIntervalText = intervalText;
            }
        });
        return concatenatedIntervalText.trim();
    }
    /**
     * Returns the combined aria text for attribute and value and the interval help text
     */
    getAriaLabelComplete() {
        let completeAriaText = '';
        if (this.attribute.userInput?.length === 0) {
            this.translation
                .translate('configurator.a11y.valueOfAttributeBlank', {
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.valueOfAttributeFull', {
                value: this.attribute.userInput,
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        completeAriaText += ' ';
        completeAriaText += this.getHelpTextForInterval();
        return completeAriaText;
    }
    getIntervalText(interval) {
        let intervalText = '';
        let formattedMinValue = '';
        let formattedMaxValue = '';
        if (interval.minValue) {
            formattedMinValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.minValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.maxValue) {
            formattedMaxValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.maxValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.minValue && interval.maxValue) {
            if (interval.minValue === interval.maxValue) {
                this.translation
                    .translate('configurator.a11y.numericIntervalSingleValue', {
                    value: formattedMinValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (intervalText = text));
                return intervalText;
            }
            this.translation
                .translate('configurator.a11y.numericIntervalStandard', {
                minValue: formattedMinValue,
                maxValue: formattedMaxValue,
            })
                .pipe(take(1))
                .subscribe((text) => (intervalText = text));
            if (!interval.minValueIncluded || !interval.maxValueIncluded) {
                if (!interval.minValueIncluded && !interval.maxValueIncluded) {
                    intervalText += ' ';
                    intervalText += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardOpen');
                }
                else {
                    if (!interval.minValueIncluded) {
                        intervalText += ' ';
                        intervalText += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded');
                    }
                    if (!interval.maxValueIncluded) {
                        intervalText += ' ';
                        intervalText += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded');
                    }
                }
            }
        }
        else {
            if (interval.minValue) {
                if (interval.minValueIncluded) {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValueIncluded', formattedMinValue);
                }
                else {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValue', formattedMinValue);
                }
            }
            else {
                if (interval.maxValue) {
                    if (interval.maxValueIncluded) {
                        intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValueIncluded', formattedMaxValue);
                    }
                    else {
                        intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValue', formattedMaxValue);
                    }
                }
            }
        }
        return intervalText;
    }
    getAdditionalIntervalText(key) {
        let intervalText = '';
        this.translation
            .translate(key)
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getInfiniteIntervalText(key, value) {
        let intervalText = '';
        this.translation
            .translate(key, {
            value: value,
        })
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getDefaultSettings() {
        return { numDecimalPlaces: 2, numTotalLength: 6, negativeAllowed: false };
    }
    getInstalledLocale(locale) {
        try {
            getLocaleId(locale);
            return locale;
        }
        catch {
            this.reportMissingLocaleData(locale);
            return 'en';
        }
    }
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            console.warn(`ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
ConfiguratorAttributeNumericInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, deps: [{ token: i1.ConfiguratorAttributeNumericInputFieldService }, { token: i2.ConfiguratorUISettingsConfig }, { token: i3.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeNumericInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", inputs: { language: "language" }, usesInheritance: true, ngImport: i0, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    [attr.aria-describedby]=\"\n      mustDisplayValidationMessage()\n        ? createAttributeUiKey('label', attribute.name) +\n          ' ' +\n          createAttributeUiKey('attribute-msg', attribute.name)\n        : createAttributeUiKey('label', attribute.name)\n    \"\n    attr.role=\"{{ attribute.dataType }}\"\n    attr.required=\"{{ attribute.required }}\"\n    (change)=\"onChange()\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"getAriaLabelComplete()\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n  {{\n    'configurator.attribute.wrongNumericFormat'\n      | cxTranslate: { pattern: numericFormatPattern }\n  }}\n</div>\n", dependencies: [{ kind: "directive", type: i4.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-numeric-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    [attr.aria-describedby]=\"\n      mustDisplayValidationMessage()\n        ? createAttributeUiKey('label', attribute.name) +\n          ' ' +\n          createAttributeUiKey('attribute-msg', attribute.name)\n        : createAttributeUiKey('label', attribute.name)\n    \"\n    attr.role=\"{{ attribute.dataType }}\"\n    attr.required=\"{{ attribute.required }}\"\n    (change)=\"onChange()\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"getAriaLabelComplete()\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n  {{\n    'configurator.attribute.wrongNumericFormat'\n      | cxTranslate: { pattern: numericFormatPattern }\n  }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorAttributeNumericInputFieldService }, { type: i2.ConfiguratorUISettingsConfig }, { type: i3.TranslationService }]; }, propDecorators: { language: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbnVtZXJpYy1pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9udW1lcmljLWlucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbnVtZXJpYy1pbnB1dC1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEdBR1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSw2REFBNkQsQ0FBQzs7Ozs7Ozs7QUFNdkgsTUFBTSxlQUFl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TixJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFUyx1QkFBdUIsQ0FBQyxJQUFZO1FBQzVDLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsSUFBSSxDQUNWLDZFQUE2RSxJQUFJLDJEQUEyRCxDQUM3SSxDQUFDO1NBQ0g7SUFDSCxDQUFDOzs0SUEzU1UsK0NBQStDO2dJQUEvQywrQ0FBK0MsOElDdkM1RCw4eENBdUNBOzJGREFhLCtDQUErQztrQkFMM0QsU0FBUzsrQkFDRSwrQ0FBK0MsbUJBRXhDLHVCQUF1QixDQUFDLE1BQU07Z05BV3RDLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBnZXRMb2NhbGVJZCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgaXNEZXZNb2RlLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcvY29uZmlndXJhdG9yLXVpLXNldHRpbmdzLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVJbnB1dEZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi4vaW5wdXQtZmllbGQvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1pbnB1dC1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLFxuICBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWwsXG59IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLmNvbXBvbmVudC5zZXJ2aWNlJztcblxuY2xhc3MgRGVmYXVsdFNldHRpbmdzIHtcbiAgbnVtRGVjaW1hbFBsYWNlczogbnVtYmVyO1xuICBudW1Ub3RhbExlbmd0aDogbnVtYmVyO1xuICBuZWdhdGl2ZUFsbG93ZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbnVtZXJpYy1pbnB1dC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRDb21wb25lbnRcbiAgZXh0ZW5kcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVJbnB1dEZpZWxkQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgbnVtZXJpY0Zvcm1hdFBhdHRlcm46IHN0cmluZztcbiAgbG9jYWxlOiBzdHJpbmc7XG4gIGljb25UeXBlID0gSUNPTl9UWVBFO1xuICBpbnRlcnZhbHM6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbFtdID0gW107XG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlndXJhdG9yVUlTZXR0aW5nc0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZVxuICApIHtcbiAgICBzdXBlcihjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERvIHdlIG5lZWQgdG8gZGlzcGxheSBhIHZhbGlkYXRpb24gbWVzc2FnZVxuICAgKi9cbiAgbXVzdERpc3BsYXlWYWxpZGF0aW9uTWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCB3cm9uZ0Zvcm1hdDogYm9vbGVhbiA9XG4gICAgICAodGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0uZGlydHkgfHwgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0udG91Y2hlZCkgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLmVycm9ycz8ud3JvbmdGb3JtYXQ7XG5cbiAgICByZXR1cm4gd3JvbmdGb3JtYXQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL2xvY2FsZXMgYXJlIGF2YWlsYWJsZSBhcyAnbGFuZ3VhZ2VzJyBpbiB0aGUgY29tbWVyY2UgYmFja2VuZFxuICAgIHRoaXMubG9jYWxlID0gdGhpcy5nZXRJbnN0YWxsZWRMb2NhbGUodGhpcy5sYW5ndWFnZSk7XG5cbiAgICBsZXQgbnVtRGVjaW1hbFBsYWNlcyA9IHRoaXMuYXR0cmlidXRlLm51bURlY2ltYWxQbGFjZXM7XG4gICAgbGV0IG51bVRvdGFsTGVuZ3RoID0gdGhpcy5hdHRyaWJ1dGUubnVtVG90YWxMZW5ndGg7XG4gICAgbGV0IG5lZ2F0aXZlQWxsb3dlZCA9IHRoaXMuYXR0cmlidXRlLm5lZ2F0aXZlQWxsb3dlZDtcblxuICAgIGlmIChcbiAgICAgIG51bURlY2ltYWxQbGFjZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgbnVtVG90YWxMZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgbmVnYXRpdmVBbGxvd2VkID09PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIC8vVGhpcyB3b24ndCBoYXBwZW4gaW4gZW52aXJvbm1lbnRzIHdpdGggdGhlIHN0YW5kYXJkIGNvbmZpZ3VyYXRvcnMgZGVwbG95ZWQsIGFzIG51bWVyaWNcbiAgICAgIC8vYXR0cmlidXRlcyBkbyBjYXJyeSB0aGVzZSBzZXR0aW5ncy4gV2Ugc3RpbGwgaW50cm9kdWNlIGRlZmF1bHQgdmFsdWVzIHRvIGVhc2UgZGV2ZWxvcG1lbnRcbiAgICAgIC8vb2YgZXh0ZW5zaW9uIHVzZSBjYXNlcywgYnV0IGxvZyBhIHdhcm5pbmdcbiAgICAgIGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHRoaXMuZ2V0RGVmYXVsdFNldHRpbmdzKCk7XG4gICAgICBudW1EZWNpbWFsUGxhY2VzID0gZGVmYXVsdFNldHRpbmdzLm51bURlY2ltYWxQbGFjZXM7XG4gICAgICBudW1Ub3RhbExlbmd0aCA9IGRlZmF1bHRTZXR0aW5ncy5udW1Ub3RhbExlbmd0aDtcbiAgICAgIG5lZ2F0aXZlQWxsb3dlZCA9IGRlZmF1bHRTZXR0aW5ncy5uZWdhdGl2ZUFsbG93ZWQ7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdNZXRhIGRhdGEgZm9yIG51bWVyaWMgYXR0cmlidXRlIG5vdCBwcmVzZW50LCBmYWxsaW5nIGJhY2sgdG8gZGVmYXVsdHMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0gPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICB0aGlzLmNvbmZpZ0F0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZS5nZXROdW1iZXJGb3JtYXRWYWxpZGF0b3IoXG4gICAgICAgIHRoaXMubG9jYWxlLFxuICAgICAgICBudW1EZWNpbWFsUGxhY2VzLFxuICAgICAgICBudW1Ub3RhbExlbmd0aCxcbiAgICAgICAgbmVnYXRpdmVBbGxvd2VkXG4gICAgICApLFxuICAgIF0pO1xuXG4gICAgdGhpcy5udW1lcmljRm9ybWF0UGF0dGVybiA9XG4gICAgICB0aGlzLmNvbmZpZ0F0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZS5nZXRQYXR0ZXJuRm9yVmFsaWRhdGlvbk1lc3NhZ2UoXG4gICAgICAgIG51bURlY2ltYWxQbGFjZXMsXG4gICAgICAgIG51bVRvdGFsTGVuZ3RoLFxuICAgICAgICBuZWdhdGl2ZUFsbG93ZWQsXG4gICAgICAgIHRoaXMubG9jYWxlXG4gICAgICApO1xuICAgIGlmICh0aGlzLmF0dHJpYnV0ZS51c2VySW5wdXQpIHtcbiAgICAgIHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLnNldFZhbHVlKHRoaXMuYXR0cmlidXRlLnVzZXJJbnB1dCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5vd25lclR5cGUgPT09IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclR5cGUuQ0FSVF9FTlRSWSAmJlxuICAgICAgdGhpcy5hdHRyaWJ1dGUucmVxdWlyZWQgJiZcbiAgICAgIHRoaXMuYXR0cmlidXRlLmluY29tcGxldGUgJiZcbiAgICAgICF0aGlzLmF0dHJpYnV0ZUlucHV0Rm9ybS52YWx1ZVxuICAgICkge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVJbnB1dEZvcm0ubWFya0FzVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmF0dHJpYnV0ZS5pbnRlcnZhbEluRG9tYWluKSB7XG4gICAgICB0aGlzLmludGVydmFscyA9XG4gICAgICAgIHRoaXMuY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLmdldEludGVydmFscyhcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZS52YWx1ZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YiA9IHRoaXMuYXR0cmlidXRlSW5wdXRGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlKCgpID0+XG4gICAgICAgICAgdGltZXIoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5wcm9kdWN0Q29uZmlndXJhdG9yPy51cGRhdGVEZWJvdW5jZVRpbWU/LmlucHV0ID8/XG4gICAgICAgICAgICAgIHRoaXMuRkFMTEJBQ0tfREVCT1VOQ0VfVElNRVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uQ2hhbmdlKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY29uY2F0ZW5hdGVkIGhlbHAgdGV4dCBmb3IgbXVsdGlwbGUgaW50ZXJ2YWxzLlxuICAgKi9cbiAgZ2V0SGVscFRleHRGb3JJbnRlcnZhbCgpOiBzdHJpbmcge1xuICAgIGxldCBpbnRlcnZhbFRleHQgPSAnJztcbiAgICBsZXQgY29uY2F0ZW5hdGVkSW50ZXJ2YWxUZXh0ID0gJyc7XG5cbiAgICB0aGlzLmludGVydmFscy5mb3JFYWNoKChpbnRlcnZhbCwgaW5kZXgpID0+IHtcbiAgICAgIGludGVydmFsVGV4dCA9IHRoaXMuZ2V0SW50ZXJ2YWxUZXh0KGludGVydmFsKTtcbiAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgaW50ZXJ2YWxUZXh0ID1cbiAgICAgICAgICBpbnRlcnZhbFRleHQuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBpbnRlcnZhbFRleHQuc2xpY2UoMSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYTExeS5jb21iaW5lZEludGVydmFsc1RleHQnLCB7XG4gICAgICAgICAgICBjb21iaW5lZEludGVydmFsOiBjb25jYXRlbmF0ZWRJbnRlcnZhbFRleHQsXG4gICAgICAgICAgICBuZXdJbnRlcnZhbDogaW50ZXJ2YWxUZXh0LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoY29uY2F0ZW5hdGVkSW50ZXJ2YWxUZXh0ID0gdGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uY2F0ZW5hdGVkSW50ZXJ2YWxUZXh0ID0gaW50ZXJ2YWxUZXh0O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbmNhdGVuYXRlZEludGVydmFsVGV4dC50cmltKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tYmluZWQgYXJpYSB0ZXh0IGZvciBhdHRyaWJ1dGUgYW5kIHZhbHVlIGFuZCB0aGUgaW50ZXJ2YWwgaGVscCB0ZXh0XG4gICAqL1xuICBnZXRBcmlhTGFiZWxDb21wbGV0ZSgpOiBzdHJpbmcge1xuICAgIGxldCBjb21wbGV0ZUFyaWFUZXh0ID0gJyc7XG4gICAgaWYgKHRoaXMuYXR0cmlidXRlLnVzZXJJbnB1dD8ubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hMTF5LnZhbHVlT2ZBdHRyaWJ1dGVCbGFuaycsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IHRoaXMuYXR0cmlidXRlLmxhYmVsLFxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAoY29tcGxldGVBcmlhVGV4dCA9IHRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYTExeS52YWx1ZU9mQXR0cmlidXRlRnVsbCcsIHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy5hdHRyaWJ1dGUudXNlcklucHV0LFxuICAgICAgICAgIGF0dHJpYnV0ZTogdGhpcy5hdHRyaWJ1dGUubGFiZWwsXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChjb21wbGV0ZUFyaWFUZXh0ID0gdGV4dCkpO1xuICAgIH1cblxuICAgIGNvbXBsZXRlQXJpYVRleHQgKz0gJyAnO1xuICAgIGNvbXBsZXRlQXJpYVRleHQgKz0gdGhpcy5nZXRIZWxwVGV4dEZvckludGVydmFsKCk7XG5cbiAgICByZXR1cm4gY29tcGxldGVBcmlhVGV4dDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbnRlcnZhbFRleHQoXG4gICAgaW50ZXJ2YWw6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbFxuICApOiBzdHJpbmcge1xuICAgIGxldCBpbnRlcnZhbFRleHQgPSAnJztcbiAgICBsZXQgZm9ybWF0dGVkTWluVmFsdWUgPSAnJztcbiAgICBsZXQgZm9ybWF0dGVkTWF4VmFsdWUgPSAnJztcblxuICAgIGlmIChpbnRlcnZhbC5taW5WYWx1ZSkge1xuICAgICAgZm9ybWF0dGVkTWluVmFsdWUgPVxuICAgICAgICB0aGlzLmNvbmZpZ0F0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZS5mb3JtYXRJbnRlcnZhbFZhbHVlKFxuICAgICAgICAgIGludGVydmFsLm1pblZhbHVlLFxuICAgICAgICAgIHRoaXMuYXR0cmlidXRlLm51bURlY2ltYWxQbGFjZXMsXG4gICAgICAgICAgdGhpcy5sb2NhbGVcbiAgICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGludGVydmFsLm1heFZhbHVlKSB7XG4gICAgICBmb3JtYXR0ZWRNYXhWYWx1ZSA9XG4gICAgICAgIHRoaXMuY29uZmlnQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRTZXJ2aWNlLmZvcm1hdEludGVydmFsVmFsdWUoXG4gICAgICAgICAgaW50ZXJ2YWwubWF4VmFsdWUsXG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGUubnVtRGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICB0aGlzLmxvY2FsZVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlmIChpbnRlcnZhbC5taW5WYWx1ZSAmJiBpbnRlcnZhbC5tYXhWYWx1ZSkge1xuICAgICAgaWYgKGludGVydmFsLm1pblZhbHVlID09PSBpbnRlcnZhbC5tYXhWYWx1ZSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0ludGVydmFsU2luZ2xlVmFsdWUnLCB7XG4gICAgICAgICAgICB2YWx1ZTogZm9ybWF0dGVkTWluVmFsdWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChpbnRlcnZhbFRleHQgPSB0ZXh0KSk7XG4gICAgICAgIHJldHVybiBpbnRlcnZhbFRleHQ7XG4gICAgICB9XG4gICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hMTF5Lm51bWVyaWNJbnRlcnZhbFN0YW5kYXJkJywge1xuICAgICAgICAgIG1pblZhbHVlOiBmb3JtYXR0ZWRNaW5WYWx1ZSxcbiAgICAgICAgICBtYXhWYWx1ZTogZm9ybWF0dGVkTWF4VmFsdWUsXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChpbnRlcnZhbFRleHQgPSB0ZXh0KSk7XG5cbiAgICAgIGlmICghaW50ZXJ2YWwubWluVmFsdWVJbmNsdWRlZCB8fCAhaW50ZXJ2YWwubWF4VmFsdWVJbmNsdWRlZCkge1xuICAgICAgICBpZiAoIWludGVydmFsLm1pblZhbHVlSW5jbHVkZWQgJiYgIWludGVydmFsLm1heFZhbHVlSW5jbHVkZWQpIHtcbiAgICAgICAgICBpbnRlcnZhbFRleHQgKz0gJyAnO1xuICAgICAgICAgIGludGVydmFsVGV4dCArPSB0aGlzLmdldEFkZGl0aW9uYWxJbnRlcnZhbFRleHQoXG4gICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0ludGVydmFsU3RhbmRhcmRPcGVuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgICBpbnRlcnZhbFRleHQgKz0gJyAnO1xuICAgICAgICAgICAgaW50ZXJ2YWxUZXh0ICs9IHRoaXMuZ2V0QWRkaXRpb25hbEludGVydmFsVGV4dChcbiAgICAgICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lm51bWVyaWNJbnRlcnZhbFN0YW5kYXJkTG93ZXJFbmRwb2ludE5vdEluY2x1ZGVkJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgICBpbnRlcnZhbFRleHQgKz0gJyAnO1xuICAgICAgICAgICAgaW50ZXJ2YWxUZXh0ICs9IHRoaXMuZ2V0QWRkaXRpb25hbEludGVydmFsVGV4dChcbiAgICAgICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lm51bWVyaWNJbnRlcnZhbFN0YW5kYXJkVXBwZXJFbmRwb2ludE5vdEluY2x1ZGVkJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGludGVydmFsLm1pblZhbHVlKSB7XG4gICAgICAgIGlmIChpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgaW50ZXJ2YWxUZXh0ID0gdGhpcy5nZXRJbmZpbml0ZUludGVydmFsVGV4dChcbiAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5udW1lcmljSW5maW5pdGVJbnRlcnZhbE1pblZhbHVlSW5jbHVkZWQnLFxuICAgICAgICAgICAgZm9ybWF0dGVkTWluVmFsdWVcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGludGVydmFsVGV4dCA9IHRoaXMuZ2V0SW5maW5pdGVJbnRlcnZhbFRleHQoXG4gICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0luZmluaXRlSW50ZXJ2YWxNaW5WYWx1ZScsXG4gICAgICAgICAgICBmb3JtYXR0ZWRNaW5WYWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpbnRlcnZhbC5tYXhWYWx1ZSkge1xuICAgICAgICAgIGlmIChpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkKSB7XG4gICAgICAgICAgICBpbnRlcnZhbFRleHQgPSB0aGlzLmdldEluZmluaXRlSW50ZXJ2YWxUZXh0KFxuICAgICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkubnVtZXJpY0luZmluaXRlSW50ZXJ2YWxNYXhWYWx1ZUluY2x1ZGVkJyxcbiAgICAgICAgICAgICAgZm9ybWF0dGVkTWF4VmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGludGVydmFsVGV4dCA9IHRoaXMuZ2V0SW5maW5pdGVJbnRlcnZhbFRleHQoXG4gICAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5udW1lcmljSW5maW5pdGVJbnRlcnZhbE1heFZhbHVlJyxcbiAgICAgICAgICAgICAgZm9ybWF0dGVkTWF4VmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnRlcnZhbFRleHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0QWRkaXRpb25hbEludGVydmFsVGV4dChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGludGVydmFsVGV4dCA9ICcnO1xuICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgIC50cmFuc2xhdGUoa2V5KVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IChpbnRlcnZhbFRleHQgPSB0ZXh0KSk7XG4gICAgcmV0dXJuIGludGVydmFsVGV4dDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJbmZpbml0ZUludGVydmFsVGV4dChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGludGVydmFsVGV4dCA9ICcnO1xuICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgIC50cmFuc2xhdGUoa2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIH0pXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4gKGludGVydmFsVGV4dCA9IHRleHQpKTtcbiAgICByZXR1cm4gaW50ZXJ2YWxUZXh0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERlZmF1bHRTZXR0aW5ncygpOiBEZWZhdWx0U2V0dGluZ3Mge1xuICAgIHJldHVybiB7IG51bURlY2ltYWxQbGFjZXM6IDIsIG51bVRvdGFsTGVuZ3RoOiA2LCBuZWdhdGl2ZUFsbG93ZWQ6IGZhbHNlIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SW5zdGFsbGVkTG9jYWxlKGxvY2FsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB0cnkge1xuICAgICAgZ2V0TG9jYWxlSWQobG9jYWxlKTtcbiAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aGlzLnJlcG9ydE1pc3NpbmdMb2NhbGVEYXRhKGxvY2FsZSk7XG4gICAgICByZXR1cm4gJ2VuJztcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVwb3J0TWlzc2luZ0xvY2FsZURhdGEobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBDb25maWdBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZENvbXBvbmVudDogTm8gbG9jYWxlIGRhdGEgcmVnaXN0ZXJlZCBmb3IgJyR7bGFuZ30nIChzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vcmVnaXN0ZXJMb2NhbGVEYXRhKS5gXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiPGxhYmVsICpuZ0lmPVwiYXR0cmlidXRlLmludGVydmFsSW5Eb21haW5cIiBjbGFzcz1cImN4LWludGVydmFsSGVscFRleHRcIj57e1xuICB0aGlzLmdldEhlbHBUZXh0Rm9ySW50ZXJ2YWwoKVxufX08L2xhYmVsPlxuPGRpdiBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSkgfX1cIiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgPGlucHV0XG4gICAgW2Zvcm1Db250cm9sXT1cImF0dHJpYnV0ZUlucHV0Rm9ybVwiXG4gICAgW3JlcXVpcmVkXT1cImlzUmVxdWlyZWRcIlxuICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIlxuICAgICAgbXVzdERpc3BsYXlWYWxpZGF0aW9uTWVzc2FnZSgpXG4gICAgICAgID8gY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2xhYmVsJywgYXR0cmlidXRlLm5hbWUpICtcbiAgICAgICAgICAnICcgK1xuICAgICAgICAgIGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpXG4gICAgICAgIDogY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2xhYmVsJywgYXR0cmlidXRlLm5hbWUpXG4gICAgXCJcbiAgICBhdHRyLnJvbGU9XCJ7eyBhdHRyaWJ1dGUuZGF0YVR5cGUgfX1cIlxuICAgIGF0dHIucmVxdWlyZWQ9XCJ7eyBhdHRyaWJ1dGUucmVxdWlyZWQgfX1cIlxuICAgIChjaGFuZ2UpPVwib25DaGFuZ2UoKVwiXG4gICAgbWF4bGVuZ3RoPVwie3sgYXR0cmlidXRlLm1heGxlbmd0aCB9fVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRBcmlhTGFiZWxDb21wbGV0ZSgpXCJcbiAgICBbY3hGb2N1c109XCJ7XG4gICAgICBrZXk6IGNyZWF0ZUF0dHJpYnV0ZUlkRm9yQ29uZmlndXJhdG9yKGF0dHJpYnV0ZSlcbiAgICB9XCJcbiAgLz5cbjwvZGl2PlxuPGRpdlxuICBjbGFzcz1cImN4LXZhbGlkYXRpb24tbXNnXCJcbiAgaWQ9XCJ7eyBjcmVhdGVBdHRyaWJ1dGVVaUtleSgnYXR0cmlidXRlLW1zZycsIGF0dHJpYnV0ZS5uYW1lKSB9fVwiXG4gICpuZ0lmPVwibXVzdERpc3BsYXlWYWxpZGF0aW9uTWVzc2FnZSgpXCJcbiAgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCJcbiAgYXJpYS1hdG9taWM9XCJ0cnVlXCJcbiAgcm9sZT1cImFsZXJ0XCJcbj5cbiAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGUuV0FSTklOR1wiPjwvY3gtaWNvbj5cbiAge3tcbiAgICAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS53cm9uZ051bWVyaWNGb3JtYXQnXG4gICAgICB8IGN4VHJhbnNsYXRlOiB7IHBhdHRlcm46IG51bWVyaWNGb3JtYXRQYXR0ZXJuIH1cbiAgfX1cbjwvZGl2PlxuIl19