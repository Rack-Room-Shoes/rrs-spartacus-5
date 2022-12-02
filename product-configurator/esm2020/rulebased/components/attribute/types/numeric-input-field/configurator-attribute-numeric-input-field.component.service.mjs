/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { formatNumber, getLocaleNumberSymbol, NumberSymbol, } from '@angular/common';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Provides validation and formatting of numeric input
 */
export class ConfiguratorAttributeNumericInputFieldService {
    /**
     * Validates numeric input according to settings that are not derived from the locale but from the attribute
     * meta data like the total number of digits and the maximum number of decimal places.
     *
     * @param input Numeric user input, formatted according to session locale
     * @param groupingSeparator Separator for grouping, e.g. ',' for 'en' locale. We allow the grouping separator but
     *   do not check exactly on the position of it in the numerical input. This e.g. is ok: '12,12,12', will be converted
     *   to '121,212' after the next roundtrip
     * @param decimalSeparator  Decimal separator, e.g. '.' for 'en' locale. Must not occur more that 1 time in the input.
     * @param numberTotalPlaces  Total number of places e.g. 10
     * @param numberDecimalPlaces  Number of decimal places e.g. 2
     *  @returns {boolean} Did we see a validation error?
     */
    performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces, numberDecimalPlaces) {
        const escape = '\\';
        const search = new RegExp(escape + groupingSeparator, 'g');
        const woGrouping = input.replace(search, '');
        const splitParts = woGrouping.split(decimalSeparator);
        if (splitParts.length > 2) {
            return true;
        }
        if (splitParts.length === 1) {
            return woGrouping.length > numberTotalPlaces - numberDecimalPlaces;
        }
        return (splitParts[0].length > numberTotalPlaces - numberDecimalPlaces ||
            splitParts[1].length > numberDecimalPlaces);
    }
    formatIntervalValue(intervalValue, decimalPlaces, locale) {
        if (decimalPlaces === undefined) {
            decimalPlaces = 0;
        }
        let formatted = formatNumber(intervalValue, locale, '1.' + decimalPlaces + '-' + decimalPlaces);
        return formatted;
    }
    /**
     * Parses the value names and returns the intervals.
     *
     * @param values values of the attribute
     * @returns {ConfiguratorAttributeNumericInterval[]} parsed intervals
     */
    getIntervals(values) {
        const intervals = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                let interval = this.getInterval(value);
                if (interval && Object.keys(interval).length !== 0) {
                    intervals.push(interval);
                }
            });
        }
        return intervals;
    }
    /**
     * Parses the value name and returns the interval structure.
     * Valid interval strings:
     * Standard Interval
     * 5 - 10
     * 5 - <10
     * >5 - 10
     * >5 - <10
     * -10 - -5
     * 1.25 - 1.35
     *
     * Infinite Interval
     * >5
     * >=5
     * <5
     * <=5
     * >-5
     *
     * @param value value which will be parsed
     * @returns {ConfiguratorAttributeNumericInterval} parsed interval
     */
    getInterval(value) {
        let interval = {
            minValue: undefined,
            maxValue: undefined,
            minValueIncluded: false,
            maxValueIncluded: false,
        };
        if (!value || !value.name || value.selected) {
            return undefined;
        }
        let minVal = '';
        let maxVal = '';
        // standard interval a - b
        if (value.name.includes(' - ')) {
            let index = value.name.indexOf(' - ');
            minVal = value.name.substring(0, index);
            maxVal = value.name.substring(index + 3, value.name.length);
            interval.minValueIncluded = true;
            interval.maxValueIncluded = true;
            if (minVal.includes('>')) {
                interval.minValueIncluded = false;
                minVal = minVal.replace('>', '');
            }
            if (maxVal.includes('<')) {
                interval.maxValueIncluded = false;
                maxVal = maxVal.replace('<', '');
            }
            // infinite interval or single value
        }
        else {
            if (value.name.includes('>')) {
                minVal = value.name;
                interval.minValueIncluded = false;
                minVal = minVal.replace('>', '');
            }
            if (value.name.includes('<')) {
                maxVal = value.name;
                interval.maxValueIncluded = false;
                maxVal = maxVal.replace('<', '');
            }
            if (value.name.includes('≥')) {
                minVal = value.name;
                interval.minValueIncluded = true;
                minVal = minVal.replace('≥', '');
            }
            if (value.name.includes('≤')) {
                maxVal = value.name;
                interval.maxValueIncluded = true;
                maxVal = maxVal.replace('≤', '');
            }
            if (!value.name.includes('>') &&
                !value.name.includes('<') &&
                !value.name.includes('≤') &&
                !value.name.includes('≥')) {
                minVal = value.name;
                maxVal = value.name;
            }
        }
        if (minVal && minVal.length > 0) {
            interval.minValue = +minVal;
        }
        if (maxVal && maxVal.length > 0) {
            interval.maxValue = +maxVal;
        }
        return interval;
    }
    /**
     * Get pattern for the message that is displayed when the validation fails. This message e.g. looks like
     * 'Wrong format, this numerical attribute should be entered according to pattern ##,###,###.##'
     * for the 'en' locale for an attribute with total length of 10 and 2 decimal places.
     *
     * @param decimalPlaces Number of decimal places
     * @param totalLength Total number of digits
     * @param negativeAllowed Do we allow negative input?
     * @param locale  Locale
     *  @returns {string} The pattern that we display in the validation message
     */
    getPatternForValidationMessage(decimalPlaces, totalLength, negativeAllowed, locale) {
        let input = (10 ** totalLength - 1).toString();
        if (decimalPlaces > 0) {
            input =
                input.substring(0, totalLength - decimalPlaces) +
                    '.' +
                    input.substring(totalLength - decimalPlaces, totalLength);
        }
        const inputAsNumber = Number(input);
        let formatted = formatNumber(inputAsNumber, locale, '1.' + decimalPlaces + '-' + decimalPlaces).replace(/9/g, '#');
        if (negativeAllowed) {
            formatted = '-' + formatted;
        }
        return formatted;
    }
    /**
     * Returns the validator for the input component that represents numeric input.
     * The validator only allows the grouping separator, the decimal separator, an optional '-' sign,
     * and the digits between 0..9. This validator does not support the scientific notation of
     * attributes.
     *
     * @param locale The locale
     * @param numberDecimalPlaces Number of decimal places
     * @param numberTotalPlaces  Total number of digits
     * @param negativeAllowed: Do we allow negative input?
     * @returns {ValidatorFn} The validator
     */
    getNumberFormatValidator(locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) {
        return (control) => {
            const input = control.value;
            if (input) {
                //allowed: only numbers and separators
                const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
                const decimalSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Decimal);
                const expressionPrefix = negativeAllowed ? '^-?' : '^';
                const expressionOnlyNumericalInput = new RegExp(expressionPrefix +
                    '[0123456789' +
                    groupingSeparator +
                    decimalSeparator +
                    ']*$');
                if (!expressionOnlyNumericalInput.test(input)) {
                    return this.createValidationError(true);
                }
                return this.createValidationError(this.performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces + (input.includes('-') ? 1 : 0), numberDecimalPlaces));
            }
            return null;
        };
    }
    createValidationError(isError) {
        return isError ? { wrongFormat: {} } : null;
    }
}
ConfiguratorAttributeNumericInputFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeNumericInputFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1udW1lcmljLWlucHV0LWZpZWxkLmNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9udW1lcmljLWlucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbnVtZXJpYy1pbnB1dC1maWVsZC5jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFlBQVksRUFDWixxQkFBcUIsRUFDckIsWUFBWSxHQUNiLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFXM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sNkNBQTZDO0lBQ3hEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILG9DQUFvQyxDQUNsQyxLQUFhLEVBQ2IsaUJBQXlCLEVBQ3pCLGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsbUJBQTJCO1FBRTNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLE1BQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkUsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXRELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVB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aUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakQsbUJBQW1CLENBQ3BCLENBQ0YsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRVMscUJBQXFCLENBQzdCLE9BQWdCO1FBRWhCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzlDLENBQUM7OzBJQS9RVSw2Q0FBNkM7OElBQTdDLDZDQUE2QyxjQURoQyxNQUFNOzJGQUNuQiw2Q0FBNkM7a0JBRHpELFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgZm9ybWF0TnVtYmVyLFxuICBnZXRMb2NhbGVOdW1iZXJTeW1ib2wsXG4gIE51bWJlclN5bWJvbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsIHtcbiAgbWluVmFsdWU/OiBudW1iZXI7XG4gIG1heFZhbHVlPzogbnVtYmVyO1xuICBtaW5WYWx1ZUluY2x1ZGVkOiBib29sZWFuO1xuICBtYXhWYWx1ZUluY2x1ZGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIHZhbGlkYXRpb24gYW5kIGZvcm1hdHRpbmcgb2YgbnVtZXJpYyBpbnB1dFxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkU2VydmljZSB7XG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgbnVtZXJpYyBpbnB1dCBhY2NvcmRpbmcgdG8gc2V0dGluZ3MgdGhhdCBhcmUgbm90IGRlcml2ZWQgZnJvbSB0aGUgbG9jYWxlIGJ1dCBmcm9tIHRoZSBhdHRyaWJ1dGVcbiAgICogbWV0YSBkYXRhIGxpa2UgdGhlIHRvdGFsIG51bWJlciBvZiBkaWdpdHMgYW5kIHRoZSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcy5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0IE51bWVyaWMgdXNlciBpbnB1dCwgZm9ybWF0dGVkIGFjY29yZGluZyB0byBzZXNzaW9uIGxvY2FsZVxuICAgKiBAcGFyYW0gZ3JvdXBpbmdTZXBhcmF0b3IgU2VwYXJhdG9yIGZvciBncm91cGluZywgZS5nLiAnLCcgZm9yICdlbicgbG9jYWxlLiBXZSBhbGxvdyB0aGUgZ3JvdXBpbmcgc2VwYXJhdG9yIGJ1dFxuICAgKiAgIGRvIG5vdCBjaGVjayBleGFjdGx5IG9uIHRoZSBwb3NpdGlvbiBvZiBpdCBpbiB0aGUgbnVtZXJpY2FsIGlucHV0LiBUaGlzIGUuZy4gaXMgb2s6ICcxMiwxMiwxMicsIHdpbGwgYmUgY29udmVydGVkXG4gICAqICAgdG8gJzEyMSwyMTInIGFmdGVyIHRoZSBuZXh0IHJvdW5kdHJpcFxuICAgKiBAcGFyYW0gZGVjaW1hbFNlcGFyYXRvciAgRGVjaW1hbCBzZXBhcmF0b3IsIGUuZy4gJy4nIGZvciAnZW4nIGxvY2FsZS4gTXVzdCBub3Qgb2NjdXIgbW9yZSB0aGF0IDEgdGltZSBpbiB0aGUgaW5wdXQuXG4gICAqIEBwYXJhbSBudW1iZXJUb3RhbFBsYWNlcyAgVG90YWwgbnVtYmVyIG9mIHBsYWNlcyBlLmcuIDEwXG4gICAqIEBwYXJhbSBudW1iZXJEZWNpbWFsUGxhY2VzICBOdW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgZS5nLiAyXG4gICAqICBAcmV0dXJucyB7Ym9vbGVhbn0gRGlkIHdlIHNlZSBhIHZhbGlkYXRpb24gZXJyb3I/XG4gICAqL1xuICBwZXJmb3JtVmFsaWRhdGlvbkFjY29yZGluZ1RvTWV0YURhdGEoXG4gICAgaW5wdXQ6IHN0cmluZyxcbiAgICBncm91cGluZ1NlcGFyYXRvcjogc3RyaW5nLFxuICAgIGRlY2ltYWxTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBudW1iZXJUb3RhbFBsYWNlczogbnVtYmVyLFxuICAgIG51bWJlckRlY2ltYWxQbGFjZXM6IG51bWJlclxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBlc2NhcGUgPSAnXFxcXCc7XG4gICAgY29uc3Qgc2VhcmNoOiBSZWdFeHAgPSBuZXcgUmVnRXhwKGVzY2FwZSArIGdyb3VwaW5nU2VwYXJhdG9yLCAnZycpO1xuICAgIGNvbnN0IHdvR3JvdXBpbmcgPSBpbnB1dC5yZXBsYWNlKHNlYXJjaCwgJycpO1xuICAgIGNvbnN0IHNwbGl0UGFydHMgPSB3b0dyb3VwaW5nLnNwbGl0KGRlY2ltYWxTZXBhcmF0b3IpO1xuXG4gICAgaWYgKHNwbGl0UGFydHMubGVuZ3RoID4gMikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChzcGxpdFBhcnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHdvR3JvdXBpbmcubGVuZ3RoID4gbnVtYmVyVG90YWxQbGFjZXMgLSBudW1iZXJEZWNpbWFsUGxhY2VzO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBzcGxpdFBhcnRzWzBdLmxlbmd0aCA+IG51bWJlclRvdGFsUGxhY2VzIC0gbnVtYmVyRGVjaW1hbFBsYWNlcyB8fFxuICAgICAgc3BsaXRQYXJ0c1sxXS5sZW5ndGggPiBudW1iZXJEZWNpbWFsUGxhY2VzXG4gICAgKTtcbiAgfVxuXG4gIGZvcm1hdEludGVydmFsVmFsdWUoXG4gICAgaW50ZXJ2YWxWYWx1ZTogbnVtYmVyLFxuICAgIGRlY2ltYWxQbGFjZXM6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBsb2NhbGU6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIGlmIChkZWNpbWFsUGxhY2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlY2ltYWxQbGFjZXMgPSAwO1xuICAgIH1cbiAgICBsZXQgZm9ybWF0dGVkID0gZm9ybWF0TnVtYmVyKFxuICAgICAgaW50ZXJ2YWxWYWx1ZSxcbiAgICAgIGxvY2FsZSxcbiAgICAgICcxLicgKyBkZWNpbWFsUGxhY2VzICsgJy0nICsgZGVjaW1hbFBsYWNlc1xuICAgICk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHZhbHVlIG5hbWVzIGFuZCByZXR1cm5zIHRoZSBpbnRlcnZhbHMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZXMgdmFsdWVzIG9mIHRoZSBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbFtdfSBwYXJzZWQgaW50ZXJ2YWxzXG4gICAqL1xuICBnZXRJbnRlcnZhbHMoXG4gICAgdmFsdWVzOiBDb25maWd1cmF0b3IuVmFsdWVbXSB8IHVuZGVmaW5lZFxuICApOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWxbXSB7XG4gICAgY29uc3QgaW50ZXJ2YWxzOiBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW50ZXJ2YWxbXSA9IFtdO1xuICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSB0aGlzLmdldEludGVydmFsKHZhbHVlKTtcbiAgICAgICAgaWYgKGludGVydmFsICYmIE9iamVjdC5rZXlzKGludGVydmFsKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBpbnRlcnZhbHMucHVzaChpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgdmFsdWUgbmFtZSBhbmQgcmV0dXJucyB0aGUgaW50ZXJ2YWwgc3RydWN0dXJlLlxuICAgKiBWYWxpZCBpbnRlcnZhbCBzdHJpbmdzOlxuICAgKiBTdGFuZGFyZCBJbnRlcnZhbFxuICAgKiA1IC0gMTBcbiAgICogNSAtIDwxMFxuICAgKiA+NSAtIDEwXG4gICAqID41IC0gPDEwXG4gICAqIC0xMCAtIC01XG4gICAqIDEuMjUgLSAxLjM1XG4gICAqXG4gICAqIEluZmluaXRlIEludGVydmFsXG4gICAqID41XG4gICAqID49NVxuICAgKiA8NVxuICAgKiA8PTVcbiAgICogPi01XG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB3aGljaCB3aWxsIGJlIHBhcnNlZFxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsfSBwYXJzZWQgaW50ZXJ2YWxcbiAgICovXG4gIGdldEludGVydmFsKFxuICAgIHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWVcbiAgKTogQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0ludGVydmFsIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgaW50ZXJ2YWw6IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnRlcnZhbCA9IHtcbiAgICAgIG1pblZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBtYXhWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgbWluVmFsdWVJbmNsdWRlZDogZmFsc2UsXG4gICAgICBtYXhWYWx1ZUluY2x1ZGVkOiBmYWxzZSxcbiAgICB9O1xuICAgIGlmICghdmFsdWUgfHwgIXZhbHVlLm5hbWUgfHwgdmFsdWUuc2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbGV0IG1pblZhbDogc3RyaW5nID0gJyc7XG4gICAgbGV0IG1heFZhbDogc3RyaW5nID0gJyc7XG5cbiAgICAvLyBzdGFuZGFyZCBpbnRlcnZhbCBhIC0gYlxuICAgIGlmICh2YWx1ZS5uYW1lLmluY2x1ZGVzKCcgLSAnKSkge1xuICAgICAgbGV0IGluZGV4ID0gdmFsdWUubmFtZS5pbmRleE9mKCcgLSAnKTtcbiAgICAgIG1pblZhbCA9IHZhbHVlLm5hbWUuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgIG1heFZhbCA9IHZhbHVlLm5hbWUuc3Vic3RyaW5nKGluZGV4ICsgMywgdmFsdWUubmFtZS5sZW5ndGgpO1xuICAgICAgaW50ZXJ2YWwubWluVmFsdWVJbmNsdWRlZCA9IHRydWU7XG4gICAgICBpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkID0gdHJ1ZTtcbiAgICAgIGlmIChtaW5WYWwuaW5jbHVkZXMoJz4nKSkge1xuICAgICAgICBpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIG1pblZhbCA9IG1pblZhbC5yZXBsYWNlKCc+JywgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWF4VmFsLmluY2x1ZGVzKCc8JykpIHtcbiAgICAgICAgaW50ZXJ2YWwubWF4VmFsdWVJbmNsdWRlZCA9IGZhbHNlO1xuICAgICAgICBtYXhWYWwgPSBtYXhWYWwucmVwbGFjZSgnPCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5maW5pdGUgaW50ZXJ2YWwgb3Igc2luZ2xlIHZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWx1ZS5uYW1lLmluY2x1ZGVzKCc+JykpIHtcbiAgICAgICAgbWluVmFsID0gdmFsdWUubmFtZTtcbiAgICAgICAgaW50ZXJ2YWwubWluVmFsdWVJbmNsdWRlZCA9IGZhbHNlO1xuICAgICAgICBtaW5WYWwgPSBtaW5WYWwucmVwbGFjZSgnPicsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZS5uYW1lLmluY2x1ZGVzKCc8JykpIHtcbiAgICAgICAgbWF4VmFsID0gdmFsdWUubmFtZTtcbiAgICAgICAgaW50ZXJ2YWwubWF4VmFsdWVJbmNsdWRlZCA9IGZhbHNlO1xuICAgICAgICBtYXhWYWwgPSBtYXhWYWwucmVwbGFjZSgnPCcsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZS5uYW1lLmluY2x1ZGVzKCfiiaUnKSkge1xuICAgICAgICBtaW5WYWwgPSB2YWx1ZS5uYW1lO1xuICAgICAgICBpbnRlcnZhbC5taW5WYWx1ZUluY2x1ZGVkID0gdHJ1ZTtcbiAgICAgICAgbWluVmFsID0gbWluVmFsLnJlcGxhY2UoJ+KJpScsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZS5uYW1lLmluY2x1ZGVzKCfiiaQnKSkge1xuICAgICAgICBtYXhWYWwgPSB2YWx1ZS5uYW1lO1xuICAgICAgICBpbnRlcnZhbC5tYXhWYWx1ZUluY2x1ZGVkID0gdHJ1ZTtcbiAgICAgICAgbWF4VmFsID0gbWF4VmFsLnJlcGxhY2UoJ+KJpCcsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgIXZhbHVlLm5hbWUuaW5jbHVkZXMoJz4nKSAmJlxuICAgICAgICAhdmFsdWUubmFtZS5pbmNsdWRlcygnPCcpICYmXG4gICAgICAgICF2YWx1ZS5uYW1lLmluY2x1ZGVzKCfiiaQnKSAmJlxuICAgICAgICAhdmFsdWUubmFtZS5pbmNsdWRlcygn4omlJylcbiAgICAgICkge1xuICAgICAgICBtaW5WYWwgPSB2YWx1ZS5uYW1lO1xuICAgICAgICBtYXhWYWwgPSB2YWx1ZS5uYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtaW5WYWwgJiYgbWluVmFsLmxlbmd0aCA+IDApIHtcbiAgICAgIGludGVydmFsLm1pblZhbHVlID0gK21pblZhbDtcbiAgICB9XG4gICAgaWYgKG1heFZhbCAmJiBtYXhWYWwubGVuZ3RoID4gMCkge1xuICAgICAgaW50ZXJ2YWwubWF4VmFsdWUgPSArbWF4VmFsO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGF0dGVybiBmb3IgdGhlIG1lc3NhZ2UgdGhhdCBpcyBkaXNwbGF5ZWQgd2hlbiB0aGUgdmFsaWRhdGlvbiBmYWlscy4gVGhpcyBtZXNzYWdlIGUuZy4gbG9va3MgbGlrZVxuICAgKiAnV3JvbmcgZm9ybWF0LCB0aGlzIG51bWVyaWNhbCBhdHRyaWJ1dGUgc2hvdWxkIGJlIGVudGVyZWQgYWNjb3JkaW5nIHRvIHBhdHRlcm4gIyMsIyMjLCMjIy4jIydcbiAgICogZm9yIHRoZSAnZW4nIGxvY2FsZSBmb3IgYW4gYXR0cmlidXRlIHdpdGggdG90YWwgbGVuZ3RoIG9mIDEwIGFuZCAyIGRlY2ltYWwgcGxhY2VzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVjaW1hbFBsYWNlcyBOdW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAgICogQHBhcmFtIHRvdGFsTGVuZ3RoIFRvdGFsIG51bWJlciBvZiBkaWdpdHNcbiAgICogQHBhcmFtIG5lZ2F0aXZlQWxsb3dlZCBEbyB3ZSBhbGxvdyBuZWdhdGl2ZSBpbnB1dD9cbiAgICogQHBhcmFtIGxvY2FsZSAgTG9jYWxlXG4gICAqICBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0dGVybiB0aGF0IHdlIGRpc3BsYXkgaW4gdGhlIHZhbGlkYXRpb24gbWVzc2FnZVxuICAgKi9cbiAgZ2V0UGF0dGVybkZvclZhbGlkYXRpb25NZXNzYWdlKFxuICAgIGRlY2ltYWxQbGFjZXM6IG51bWJlcixcbiAgICB0b3RhbExlbmd0aDogbnVtYmVyLFxuICAgIG5lZ2F0aXZlQWxsb3dlZDogYm9vbGVhbixcbiAgICBsb2NhbGU6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIGxldCBpbnB1dDogc3RyaW5nID0gKDEwICoqIHRvdGFsTGVuZ3RoIC0gMSkudG9TdHJpbmcoKTtcbiAgICBpZiAoZGVjaW1hbFBsYWNlcyA+IDApIHtcbiAgICAgIGlucHV0ID1cbiAgICAgICAgaW5wdXQuc3Vic3RyaW5nKDAsIHRvdGFsTGVuZ3RoIC0gZGVjaW1hbFBsYWNlcykgK1xuICAgICAgICAnLicgK1xuICAgICAgICBpbnB1dC5zdWJzdHJpbmcodG90YWxMZW5ndGggLSBkZWNpbWFsUGxhY2VzLCB0b3RhbExlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGlucHV0QXNOdW1iZXI6IG51bWJlciA9IE51bWJlcihpbnB1dCk7XG4gICAgbGV0IGZvcm1hdHRlZCA9IGZvcm1hdE51bWJlcihcbiAgICAgIGlucHV0QXNOdW1iZXIsXG4gICAgICBsb2NhbGUsXG4gICAgICAnMS4nICsgZGVjaW1hbFBsYWNlcyArICctJyArIGRlY2ltYWxQbGFjZXNcbiAgICApLnJlcGxhY2UoLzkvZywgJyMnKTtcbiAgICBpZiAobmVnYXRpdmVBbGxvd2VkKSB7XG4gICAgICBmb3JtYXR0ZWQgPSAnLScgKyBmb3JtYXR0ZWQ7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsaWRhdG9yIGZvciB0aGUgaW5wdXQgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBudW1lcmljIGlucHV0LlxuICAgKiBUaGUgdmFsaWRhdG9yIG9ubHkgYWxsb3dzIHRoZSBncm91cGluZyBzZXBhcmF0b3IsIHRoZSBkZWNpbWFsIHNlcGFyYXRvciwgYW4gb3B0aW9uYWwgJy0nIHNpZ24sXG4gICAqIGFuZCB0aGUgZGlnaXRzIGJldHdlZW4gMC4uOS4gVGhpcyB2YWxpZGF0b3IgZG9lcyBub3Qgc3VwcG9ydCB0aGUgc2NpZW50aWZpYyBub3RhdGlvbiBvZlxuICAgKiBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiBAcGFyYW0gbG9jYWxlIFRoZSBsb2NhbGVcbiAgICogQHBhcmFtIG51bWJlckRlY2ltYWxQbGFjZXMgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXG4gICAqIEBwYXJhbSBudW1iZXJUb3RhbFBsYWNlcyAgVG90YWwgbnVtYmVyIG9mIGRpZ2l0c1xuICAgKiBAcGFyYW0gbmVnYXRpdmVBbGxvd2VkOiBEbyB3ZSBhbGxvdyBuZWdhdGl2ZSBpbnB1dD9cbiAgICogQHJldHVybnMge1ZhbGlkYXRvckZufSBUaGUgdmFsaWRhdG9yXG4gICAqL1xuXG4gIGdldE51bWJlckZvcm1hdFZhbGlkYXRvcihcbiAgICBsb2NhbGU6IHN0cmluZyxcbiAgICBudW1iZXJEZWNpbWFsUGxhY2VzOiBudW1iZXIsXG4gICAgbnVtYmVyVG90YWxQbGFjZXM6IG51bWJlcixcbiAgICBuZWdhdGl2ZUFsbG93ZWQ6IGJvb2xlYW5cbiAgKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgaW5wdXQ6IHN0cmluZyA9IGNvbnRyb2wudmFsdWU7XG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgLy9hbGxvd2VkOiBvbmx5IG51bWJlcnMgYW5kIHNlcGFyYXRvcnNcblxuICAgICAgICBjb25zdCBncm91cGluZ1NlcGFyYXRvciA9IGdldExvY2FsZU51bWJlclN5bWJvbChcbiAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgTnVtYmVyU3ltYm9sLkdyb3VwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRlY2ltYWxTZXBhcmF0b3IgPSBnZXRMb2NhbGVOdW1iZXJTeW1ib2woXG4gICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgIE51bWJlclN5bWJvbC5EZWNpbWFsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb25QcmVmaXggPSBuZWdhdGl2ZUFsbG93ZWQgPyAnXi0/JyA6ICdeJztcbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbk9ubHlOdW1lcmljYWxJbnB1dDogUmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICBleHByZXNzaW9uUHJlZml4ICtcbiAgICAgICAgICAgICdbMDEyMzQ1Njc4OScgK1xuICAgICAgICAgICAgZ3JvdXBpbmdTZXBhcmF0b3IgK1xuICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvciArXG4gICAgICAgICAgICAnXSokJ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICghZXhwcmVzc2lvbk9ubHlOdW1lcmljYWxJbnB1dC50ZXN0KGlucHV0KSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVZhbGlkYXRpb25FcnJvcih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVWYWxpZGF0aW9uRXJyb3IoXG4gICAgICAgICAgdGhpcy5wZXJmb3JtVmFsaWRhdGlvbkFjY29yZGluZ1RvTWV0YURhdGEoXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGdyb3VwaW5nU2VwYXJhdG9yLFxuICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIG51bWJlclRvdGFsUGxhY2VzICsgKGlucHV0LmluY2x1ZGVzKCctJykgPyAxIDogMCksXG4gICAgICAgICAgICBudW1iZXJEZWNpbWFsUGxhY2VzXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVWYWxpZGF0aW9uRXJyb3IoXG4gICAgaXNFcnJvcjogYm9vbGVhblxuICApOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XG4gICAgcmV0dXJuIGlzRXJyb3IgPyB7IHdyb25nRm9ybWF0OiB7fSB9IDogbnVsbDtcbiAgfVxufVxuIl19