/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { formatCurrency, getCurrencySymbol, getLocaleId, } from '@angular/common';
import { Injectable, isDevMode } from '@angular/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Utilities for CPQ configuration
 */
export class CpqConfiguratorNormalizerUtilsService {
    constructor(languageService) {
        this.languageService = languageService;
    }
    /**
     * Converts quantity to be shown in the overview page
     *
     * @param {Cpq.Value} value - CPQ Value
     * @param {Cpq.Attribute} attribute - CPQ Attribute
     * @returns {number} - Quantity
     */
    convertQuantity(value, attribute) {
        if (!value.selected) {
            return undefined;
        }
        const configuratorDataType = this.convertDataType(attribute);
        let quantity;
        switch (configuratorDataType) {
            case Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL:
                quantity = Number(attribute.quantity);
                break;
            case Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL:
                quantity = Number(value.quantity);
                break;
            default:
                quantity = undefined;
        }
        return quantity;
    }
    /**
     * Converts value price
     *
     * @param { Cpq.Value} value - CPQ Value
     * @param {string} currency - Currency code ISO
     * @returns {Configurator.PriceDetails}
     */
    convertValuePrice(value, currency) {
        let price;
        if (value.price) {
            price = {
                currencyIso: currency,
                value: parseFloat(value.price),
            };
            this.formatPriceForLocale(price, this.getLanguage());
        }
        return price;
    }
    /**
     * Calculates total value price
     *
     * @param {number} quantity - Quantity
     * @param {Configurator.PriceDetails} valuePrice - PriceDetails of the single value price
     * @returns {Configurator.PriceDetails } - total value price
     */
    calculateValuePriceTotal(quantity, valuePrice) {
        let valuePriceTotal;
        if (valuePrice) {
            const calculationQuantity = quantity ? quantity : 1;
            valuePriceTotal = {
                currencyIso: valuePrice.currencyIso,
                value: calculationQuantity * valuePrice.value,
            };
            this.formatPriceForLocale(valuePriceTotal, this.getLanguage());
        }
        return valuePriceTotal;
    }
    /**
     * Calculates total attribute price
     *
     * @param {Configurator.Attribute} attribute - Configurator Attribute
     * @param {string} currency - Currency
     * @returns {Configurator.PriceDetails} - total attribute price
     */
    calculateAttributePriceTotal(attribute, currency) {
        const priceTotal = attribute.values
            ?.filter((entry) => entry.selected && entry.valuePriceTotal)
            .reduce((total, item) => total + (item.valuePriceTotal?.value ?? 0), 0);
        const attributePriceTotal = {
            currencyIso: currency,
            value: priceTotal ?? 0,
        };
        this.formatPriceForLocale(attributePriceTotal, this.getLanguage());
        return attributePriceTotal;
    }
    /**
     * Formats price for given PriceDetails object and Locale
     *
     * @param {Configurator.PriceDetails} price - Price details
     * @param {string} availableLocale - Original locale
     */
    formatPriceForLocale(price, availableLocale) {
        const currencySymbol = getCurrencySymbol(price.currencyIso, 'narrow', availableLocale);
        price.formattedValue = formatCurrency(price.value, availableLocale, currencySymbol, price.currencyIso);
    }
    /**
     * Converts the CPQ Attribute data type into the Configurator Attribute data type
     *
     * @param {Cpq.Attribute} cpqAttribute - CPQ Attribute
     * @returns {Configurator.DataType} Data type of the configurator attribute
     */
    convertDataType(cpqAttribute) {
        let dataType;
        switch (cpqAttribute.dataType) {
            case Cpq.DataType.INPUT_STRING: {
                dataType = Configurator.DataType.INPUT_STRING;
                break;
            }
            case Cpq.DataType.INPUT_NUMBER: {
                dataType = Configurator.DataType.INPUT_NUMBER;
                break;
            }
            case Cpq.DataType.N_A: {
                dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
                break;
            }
            case Cpq.DataType.QTY_ATTRIBUTE_LEVEL: {
                dataType = Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
                break;
            }
            case Cpq.DataType.QTY_VALUE_LEVEL: {
                if (cpqAttribute.displayAs === Cpq.DisplayAs.RADIO_BUTTON ||
                    cpqAttribute.displayAs === Cpq.DisplayAs.DROPDOWN) {
                    dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
                }
                else if (cpqAttribute.displayAs === Cpq.DisplayAs.CHECK_BOX &&
                    !cpqAttribute.isLineItem) {
                    dataType = Configurator.DataType.USER_SELECTION_NO_QTY;
                }
                else {
                    dataType = Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL;
                }
                break;
            }
            default: {
                dataType = Configurator.DataType.NOT_IMPLEMENTED;
            }
        }
        return dataType;
    }
    /**
     * Converts price summary
     *
     * @param {cpqConfiguration: Cpq.Configuration} cpqConfiguration - CPQ configuration
     * @returns {Configurator.PriceSummary} - price summary
     */
    convertPriceSummary(cpqConfiguration) {
        const priceSummary = {};
        if (cpqConfiguration.currencyISOCode) {
            const currency = cpqConfiguration.currencyISOCode;
            if (cpqConfiguration?.responder?.totalPrice &&
                cpqConfiguration?.currencySign) {
                const currencySign = cpqConfiguration?.currencySign;
                const totalPriceAsString = cpqConfiguration.responder.totalPrice.replace(currencySign, '');
                const totalPrice = {
                    currencyIso: currency,
                    value: parseFloat(totalPriceAsString),
                };
                this.formatPriceForLocale(totalPrice, this.getLanguage());
                priceSummary.currentTotal = totalPrice;
            }
            if (cpqConfiguration?.responder?.baseProductPrice) {
                const basePriceAsString = cpqConfiguration.responder.baseProductPrice;
                const basePrice = {
                    currencyIso: currency,
                    value: parseFloat(basePriceAsString),
                };
                this.formatPriceForLocale(basePrice, this.getLanguage());
                priceSummary.basePrice = basePrice;
            }
            if (priceSummary.currentTotal && priceSummary.basePrice) {
                const selectedOptionsPrice = {
                    currencyIso: currency,
                    value: priceSummary.currentTotal.value - priceSummary.basePrice.value,
                };
                this.formatPriceForLocale(selectedOptionsPrice, this.getLanguage());
                priceSummary.selectedOptions = selectedOptionsPrice;
            }
        }
        return priceSummary;
    }
    /**
     * Verifies whether at least one value of a CPQ Attribute has an assigned product
     *
     * @param {Cpq.Value[]} attributeValues - CPQ Attribute values
     * @returns {boolean} - true, if at least one value of a CPQ Attribute has an assigned product
     */
    hasAnyProducts(attributeValues) {
        return attributeValues.some((value) => value?.productSystemId);
    }
    /**
     * Convert attribute label
     *
     * @param {attribute: Cpq.Attribute} attribute - CPQ Attribute
     * @returns {string} - attribute label
     */
    convertAttributeLabel(attribute) {
        return attribute.label
            ? attribute.label
            : attribute.name
                ? attribute.name
                : '';
    }
    /**
     * Gets the current language.
     *
     * @return {string} - current language
     */
    getLanguage() {
        const lang = this.getActiveLanguage();
        try {
            getLocaleId(lang);
            return lang;
        }
        catch {
            this.reportMissingLocaleData(lang);
            return 'en';
        }
    }
    /**
     * Gets the active language.
     *
     * @return {string} - active language
     */
    getActiveLanguage() {
        let result;
        this.languageService
            .getActive()
            .subscribe((lang) => (result = lang))
            .unsubscribe();
        return result ?? 'en';
    }
    /**
     * Logs the message for the missing local data.
     *
     * @param {string} lang - Active language
     */
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            console.warn(`CpqConfiguratorNormalizerUtilsService: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
CpqConfiguratorNormalizerUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, deps: [{ token: i1.LanguageService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorNormalizerUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorNormalizerUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NwcS9yZXN0L2NvbnZlcnRlcnMvY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFFcEM7O0dBRUc7QUFFSCxNQUFNLE9BQU8scUNBQXFDO0lBQ2hELFlBQXNCLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7SUFFMUQ7Ozs7OztPQU1HO0lBQ0gsZUFBZSxDQUNiLEtBQWdCLEVBQ2hCLFNBQXdCO1FBRXhCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ25CLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsTUFBTSxvQkFBb0IsR0FDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxJQUFJLFFBQVEsQ0FBQztRQUNiLFFBQVEsb0JBQW9CLEVBQUU7WUFDNUIsS0FBSyxZQUFZLENBQUMsUUFBUSxDQUFDLGtDQUFrQztnQkFDM0QsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMs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SUFBSSxDQUFDLENBQUM7YUFDcEMsV0FBVyxFQUFFLENBQUM7UUFFakIsT0FBTyxNQUFNLElBQUksSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sdUJBQXVCLENBQUMsSUFBWTtRQUM1QyxJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FDVix5RUFBeUUsSUFBSSwyREFBMkQsQ0FDekksQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7a0lBN1JVLHFDQUFxQztzSUFBckMscUNBQXFDLGNBRHhCLE1BQU07MkZBQ25CLHFDQUFxQztrQkFEakQsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBmb3JtYXRDdXJyZW5jeSxcbiAgZ2V0Q3VycmVuY3lTeW1ib2wsXG4gIGdldExvY2FsZUlkLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQnO1xuaW1wb3J0IHsgQ3BxIH0gZnJvbSAnLi4vY3BxLm1vZGVscyc7XG5cbi8qKlxuICogVXRpbGl0aWVzIGZvciBDUFEgY29uZmlndXJhdGlvblxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENwcUNvbmZpZ3VyYXRvck5vcm1hbGl6ZXJVdGlsc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHF1YW50aXR5IHRvIGJlIHNob3duIGluIHRoZSBvdmVydmlldyBwYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7Q3BxLlZhbHVlfSB2YWx1ZSAtIENQUSBWYWx1ZVxuICAgKiBAcGFyYW0ge0NwcS5BdHRyaWJ1dGV9IGF0dHJpYnV0ZSAtIENQUSBBdHRyaWJ1dGVcbiAgICogQHJldHVybnMge251bWJlcn0gLSBRdWFudGl0eVxuICAgKi9cbiAgY29udmVydFF1YW50aXR5KFxuICAgIHZhbHVlOiBDcHEuVmFsdWUsXG4gICAgYXR0cmlidXRlOiBDcHEuQXR0cmlidXRlXG4gICk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF2YWx1ZS5zZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgY29uZmlndXJhdG9yRGF0YVR5cGU6IENvbmZpZ3VyYXRvci5EYXRhVHlwZSA9XG4gICAgICB0aGlzLmNvbnZlcnREYXRhVHlwZShhdHRyaWJ1dGUpO1xuICAgIGxldCBxdWFudGl0eTtcbiAgICBzd2l0Y2ggKGNvbmZpZ3VyYXRvckRhdGFUeXBlKSB7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5EYXRhVHlwZS5VU0VSX1NFTEVDVElPTl9RVFlfQVRUUklCVVRFX0xFVkVMOlxuICAgICAgICBxdWFudGl0eSA9IE51bWJlcihhdHRyaWJ1dGUucXVhbnRpdHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX1FUWV9WQUxVRV9MRVZFTDpcbiAgICAgICAgcXVhbnRpdHkgPSBOdW1iZXIodmFsdWUucXVhbnRpdHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHF1YW50aXR5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gcXVhbnRpdHk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdmFsdWUgcHJpY2VcbiAgICpcbiAgICogQHBhcmFtIHsgQ3BxLlZhbHVlfSB2YWx1ZSAtIENQUSBWYWx1ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVuY3kgLSBDdXJyZW5jeSBjb2RlIElTT1xuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLlByaWNlRGV0YWlsc31cbiAgICovXG4gIGNvbnZlcnRWYWx1ZVByaWNlKFxuICAgIHZhbHVlOiBDcHEuVmFsdWUsXG4gICAgY3VycmVuY3k6IHN0cmluZ1xuICApOiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgcHJpY2U7XG4gICAgaWYgKHZhbHVlLnByaWNlKSB7XG4gICAgICBwcmljZSA9IHtcbiAgICAgICAgY3VycmVuY3lJc286IGN1cnJlbmN5LFxuICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdCh2YWx1ZS5wcmljZSksXG4gICAgICB9O1xuICAgICAgdGhpcy5mb3JtYXRQcmljZUZvckxvY2FsZShwcmljZSwgdGhpcy5nZXRMYW5ndWFnZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHByaWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdG90YWwgdmFsdWUgcHJpY2VcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHF1YW50aXR5IC0gUXVhbnRpdHlcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzfSB2YWx1ZVByaWNlIC0gUHJpY2VEZXRhaWxzIG9mIHRoZSBzaW5nbGUgdmFsdWUgcHJpY2VcbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5QcmljZURldGFpbHMgfSAtIHRvdGFsIHZhbHVlIHByaWNlXG4gICAqL1xuICBjYWxjdWxhdGVWYWx1ZVByaWNlVG90YWwoXG4gICAgcXVhbnRpdHk6IG51bWJlcixcbiAgICB2YWx1ZVByaWNlPzogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlsc1xuICApOiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgdmFsdWVQcmljZVRvdGFsO1xuICAgIGlmICh2YWx1ZVByaWNlKSB7XG4gICAgICBjb25zdCBjYWxjdWxhdGlvblF1YW50aXR5OiBudW1iZXIgPSBxdWFudGl0eSA/IHF1YW50aXR5IDogMTtcbiAgICAgIHZhbHVlUHJpY2VUb3RhbCA9IHtcbiAgICAgICAgY3VycmVuY3lJc286IHZhbHVlUHJpY2UuY3VycmVuY3lJc28sXG4gICAgICAgIHZhbHVlOiBjYWxjdWxhdGlvblF1YW50aXR5ICogdmFsdWVQcmljZS52YWx1ZSxcbiAgICAgIH07XG4gICAgICB0aGlzLmZvcm1hdFByaWNlRm9yTG9jYWxlKHZhbHVlUHJpY2VUb3RhbCwgdGhpcy5nZXRMYW5ndWFnZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlUHJpY2VUb3RhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRvdGFsIGF0dHJpYnV0ZSBwcmljZVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGV9IGF0dHJpYnV0ZSAtIENvbmZpZ3VyYXRvciBBdHRyaWJ1dGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbmN5IC0gQ3VycmVuY3lcbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5QcmljZURldGFpbHN9IC0gdG90YWwgYXR0cmlidXRlIHByaWNlXG4gICAqL1xuICBjYWxjdWxhdGVBdHRyaWJ1dGVQcmljZVRvdGFsKFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICBjdXJyZW5jeTogc3RyaW5nXG4gICk6IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHMge1xuICAgIGNvbnN0IHByaWNlVG90YWwgPSBhdHRyaWJ1dGUudmFsdWVzXG4gICAgICA/LmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNlbGVjdGVkICYmIGVudHJ5LnZhbHVlUHJpY2VUb3RhbClcbiAgICAgIC5yZWR1Y2UoKHRvdGFsLCBpdGVtKSA9PiB0b3RhbCArIChpdGVtLnZhbHVlUHJpY2VUb3RhbD8udmFsdWUgPz8gMCksIDApO1xuICAgIGNvbnN0IGF0dHJpYnV0ZVByaWNlVG90YWw6IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHMgPSB7XG4gICAgICBjdXJyZW5jeUlzbzogY3VycmVuY3ksXG4gICAgICB2YWx1ZTogcHJpY2VUb3RhbCA/PyAwLFxuICAgIH07XG4gICAgdGhpcy5mb3JtYXRQcmljZUZvckxvY2FsZShhdHRyaWJ1dGVQcmljZVRvdGFsLCB0aGlzLmdldExhbmd1YWdlKCkpO1xuICAgIHJldHVybiBhdHRyaWJ1dGVQcmljZVRvdGFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgcHJpY2UgZm9yIGdpdmVuIFByaWNlRGV0YWlscyBvYmplY3QgYW5kIExvY2FsZVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5QcmljZURldGFpbHN9IHByaWNlIC0gUHJpY2UgZGV0YWlsc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gYXZhaWxhYmxlTG9jYWxlIC0gT3JpZ2luYWwgbG9jYWxlXG4gICAqL1xuICBwcm90ZWN0ZWQgZm9ybWF0UHJpY2VGb3JMb2NhbGUoXG4gICAgcHJpY2U6IENvbmZpZ3VyYXRvci5QcmljZURldGFpbHMsXG4gICAgYXZhaWxhYmxlTG9jYWxlOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVuY3lTeW1ib2w6IHN0cmluZyA9IGdldEN1cnJlbmN5U3ltYm9sKFxuICAgICAgcHJpY2UuY3VycmVuY3lJc28sXG4gICAgICAnbmFycm93JyxcbiAgICAgIGF2YWlsYWJsZUxvY2FsZVxuICAgICk7XG4gICAgcHJpY2UuZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXRDdXJyZW5jeShcbiAgICAgIHByaWNlLnZhbHVlLFxuICAgICAgYXZhaWxhYmxlTG9jYWxlLFxuICAgICAgY3VycmVuY3lTeW1ib2wsXG4gICAgICBwcmljZS5jdXJyZW5jeUlzb1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIENQUSBBdHRyaWJ1dGUgZGF0YSB0eXBlIGludG8gdGhlIENvbmZpZ3VyYXRvciBBdHRyaWJ1dGUgZGF0YSB0eXBlXG4gICAqXG4gICAqIEBwYXJhbSB7Q3BxLkF0dHJpYnV0ZX0gY3BxQXR0cmlidXRlIC0gQ1BRIEF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLkRhdGFUeXBlfSBEYXRhIHR5cGUgb2YgdGhlIGNvbmZpZ3VyYXRvciBhdHRyaWJ1dGVcbiAgICovXG4gIGNvbnZlcnREYXRhVHlwZShjcHFBdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGUpOiBDb25maWd1cmF0b3IuRGF0YVR5cGUge1xuICAgIGxldCBkYXRhVHlwZTogQ29uZmlndXJhdG9yLkRhdGFUeXBlO1xuICAgIHN3aXRjaCAoY3BxQXR0cmlidXRlLmRhdGFUeXBlKSB7XG4gICAgICBjYXNlIENwcS5EYXRhVHlwZS5JTlBVVF9TVFJJTkc6IHtcbiAgICAgICAgZGF0YVR5cGUgPSBDb25maWd1cmF0b3IuRGF0YVR5cGUuSU5QVVRfU1RSSU5HO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ3BxLkRhdGFUeXBlLklOUFVUX05VTUJFUjoge1xuICAgICAgICBkYXRhVHlwZSA9IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5JTlBVVF9OVU1CRVI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDcHEuRGF0YVR5cGUuTl9BOiB7XG4gICAgICAgIGRhdGFUeXBlID0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX05PX1FUWTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENwcS5EYXRhVHlwZS5RVFlfQVRUUklCVVRFX0xFVkVMOiB7XG4gICAgICAgIGRhdGFUeXBlID0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX1FUWV9BVFRSSUJVVEVfTEVWRUw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDcHEuRGF0YVR5cGUuUVRZX1ZBTFVFX0xFVkVMOiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjcHFBdHRyaWJ1dGUuZGlzcGxheUFzID09PSBDcHEuRGlzcGxheUFzLlJBRElPX0JVVFRPTiB8fFxuICAgICAgICAgIGNwcUF0dHJpYnV0ZS5kaXNwbGF5QXMgPT09IENwcS5EaXNwbGF5QXMuRFJPUERPV05cbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0YVR5cGUgPSBDb25maWd1cmF0b3IuRGF0YVR5cGUuVVNFUl9TRUxFQ1RJT05fTk9fUVRZO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGNwcUF0dHJpYnV0ZS5kaXNwbGF5QXMgPT09IENwcS5EaXNwbGF5QXMuQ0hFQ0tfQk9YICYmXG4gICAgICAgICAgIWNwcUF0dHJpYnV0ZS5pc0xpbmVJdGVtXG4gICAgICAgICkge1xuICAgICAgICAgIGRhdGFUeXBlID0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLlVTRVJfU0VMRUNUSU9OX05PX1FUWTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhVHlwZSA9IENvbmZpZ3VyYXRvci5EYXRhVHlwZS5VU0VSX1NFTEVDVElPTl9RVFlfVkFMVUVfTEVWRUw7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGRhdGFUeXBlID0gQ29uZmlndXJhdG9yLkRhdGFUeXBlLk5PVF9JTVBMRU1FTlRFRDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGFUeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHByaWNlIHN1bW1hcnlcbiAgICpcbiAgICogQHBhcmFtIHtjcHFDb25maWd1cmF0aW9uOiBDcHEuQ29uZmlndXJhdGlvbn0gY3BxQ29uZmlndXJhdGlvbiAtIENQUSBjb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtDb25maWd1cmF0b3IuUHJpY2VTdW1tYXJ5fSAtIHByaWNlIHN1bW1hcnlcbiAgICovXG4gIGNvbnZlcnRQcmljZVN1bW1hcnkoXG4gICAgY3BxQ29uZmlndXJhdGlvbjogQ3BxLkNvbmZpZ3VyYXRpb25cbiAgKTogQ29uZmlndXJhdG9yLlByaWNlU3VtbWFyeSB7XG4gICAgY29uc3QgcHJpY2VTdW1tYXJ5OiBDb25maWd1cmF0b3IuUHJpY2VTdW1tYXJ5ID0ge307XG4gICAgaWYgKGNwcUNvbmZpZ3VyYXRpb24uY3VycmVuY3lJU09Db2RlKSB7XG4gICAgICBjb25zdCBjdXJyZW5jeTogc3RyaW5nID0gY3BxQ29uZmlndXJhdGlvbi5jdXJyZW5jeUlTT0NvZGU7XG4gICAgICBpZiAoXG4gICAgICAgIGNwcUNvbmZpZ3VyYXRpb24/LnJlc3BvbmRlcj8udG90YWxQcmljZSAmJlxuICAgICAgICBjcHFDb25maWd1cmF0aW9uPy5jdXJyZW5jeVNpZ25cbiAgICAgICkge1xuICAgICAgICBjb25zdCBjdXJyZW5jeVNpZ246IHN0cmluZyA9IGNwcUNvbmZpZ3VyYXRpb24/LmN1cnJlbmN5U2lnbjtcbiAgICAgICAgY29uc3QgdG90YWxQcmljZUFzU3RyaW5nOiBzdHJpbmcgPVxuICAgICAgICAgIGNwcUNvbmZpZ3VyYXRpb24ucmVzcG9uZGVyLnRvdGFsUHJpY2UucmVwbGFjZShjdXJyZW5jeVNpZ24sICcnKTtcbiAgICAgICAgY29uc3QgdG90YWxQcmljZTogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscyA9IHtcbiAgICAgICAgICBjdXJyZW5jeUlzbzogY3VycmVuY3ksXG4gICAgICAgICAgdmFsdWU6IHBhcnNlRmxvYXQodG90YWxQcmljZUFzU3RyaW5nKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mb3JtYXRQcmljZUZvckxvY2FsZSh0b3RhbFByaWNlLCB0aGlzLmdldExhbmd1YWdlKCkpO1xuICAgICAgICBwcmljZVN1bW1hcnkuY3VycmVudFRvdGFsID0gdG90YWxQcmljZTtcbiAgICAgIH1cbiAgICAgIGlmIChjcHFDb25maWd1cmF0aW9uPy5yZXNwb25kZXI/LmJhc2VQcm9kdWN0UHJpY2UpIHtcbiAgICAgICAgY29uc3QgYmFzZVByaWNlQXNTdHJpbmc6IHN0cmluZyA9XG4gICAgICAgICAgY3BxQ29uZmlndXJhdGlvbi5yZXNwb25kZXIuYmFzZVByb2R1Y3RQcmljZTtcbiAgICAgICAgY29uc3QgYmFzZVByaWNlOiBDb25maWd1cmF0b3IuUHJpY2VEZXRhaWxzID0ge1xuICAgICAgICAgIGN1cnJlbmN5SXNvOiBjdXJyZW5jeSxcbiAgICAgICAgICB2YWx1ZTogcGFyc2VGbG9hdChiYXNlUHJpY2VBc1N0cmluZyksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZm9ybWF0UHJpY2VGb3JMb2NhbGUoYmFzZVByaWNlLCB0aGlzLmdldExhbmd1YWdlKCkpO1xuICAgICAgICBwcmljZVN1bW1hcnkuYmFzZVByaWNlID0gYmFzZVByaWNlO1xuICAgICAgfVxuICAgICAgaWYgKHByaWNlU3VtbWFyeS5jdXJyZW50VG90YWwgJiYgcHJpY2VTdW1tYXJ5LmJhc2VQcmljZSkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnNQcmljZTogQ29uZmlndXJhdG9yLlByaWNlRGV0YWlscyA9IHtcbiAgICAgICAgICBjdXJyZW5jeUlzbzogY3VycmVuY3ksXG4gICAgICAgICAgdmFsdWU6IHByaWNlU3VtbWFyeS5jdXJyZW50VG90YWwudmFsdWUgLSBwcmljZVN1bW1hcnkuYmFzZVByaWNlLnZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZvcm1hdFByaWNlRm9yTG9jYWxlKHNlbGVjdGVkT3B0aW9uc1ByaWNlLCB0aGlzLmdldExhbmd1YWdlKCkpO1xuICAgICAgICBwcmljZVN1bW1hcnkuc2VsZWN0ZWRPcHRpb25zID0gc2VsZWN0ZWRPcHRpb25zUHJpY2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcmljZVN1bW1hcnk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciBhdCBsZWFzdCBvbmUgdmFsdWUgb2YgYSBDUFEgQXR0cmlidXRlIGhhcyBhbiBhc3NpZ25lZCBwcm9kdWN0XG4gICAqXG4gICAqIEBwYXJhbSB7Q3BxLlZhbHVlW119IGF0dHJpYnV0ZVZhbHVlcyAtIENQUSBBdHRyaWJ1dGUgdmFsdWVzXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIHRydWUsIGlmIGF0IGxlYXN0IG9uZSB2YWx1ZSBvZiBhIENQUSBBdHRyaWJ1dGUgaGFzIGFuIGFzc2lnbmVkIHByb2R1Y3RcbiAgICovXG4gIGhhc0FueVByb2R1Y3RzKGF0dHJpYnV0ZVZhbHVlczogQ3BxLlZhbHVlW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0cmlidXRlVmFsdWVzLnNvbWUoKHZhbHVlOiBDcHEuVmFsdWUpID0+IHZhbHVlPy5wcm9kdWN0U3lzdGVtSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYXR0cmlidXRlIGxhYmVsXG4gICAqXG4gICAqIEBwYXJhbSB7YXR0cmlidXRlOiBDcHEuQXR0cmlidXRlfSBhdHRyaWJ1dGUgLSBDUFEgQXR0cmlidXRlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gYXR0cmlidXRlIGxhYmVsXG4gICAqL1xuICBjb252ZXJ0QXR0cmlidXRlTGFiZWwoYXR0cmlidXRlOiBDcHEuQXR0cmlidXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYXR0cmlidXRlLmxhYmVsXG4gICAgICA/IGF0dHJpYnV0ZS5sYWJlbFxuICAgICAgOiBhdHRyaWJ1dGUubmFtZVxuICAgICAgPyBhdHRyaWJ1dGUubmFtZVxuICAgICAgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGxhbmd1YWdlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gY3VycmVudCBsYW5ndWFnZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldExhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgY29uc3QgbGFuZyA9IHRoaXMuZ2V0QWN0aXZlTGFuZ3VhZ2UoKTtcbiAgICB0cnkge1xuICAgICAgZ2V0TG9jYWxlSWQobGFuZyk7XG4gICAgICByZXR1cm4gbGFuZztcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRoaXMucmVwb3J0TWlzc2luZ0xvY2FsZURhdGEobGFuZyk7XG4gICAgICByZXR1cm4gJ2VuJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgYWN0aXZlIGxhbmd1YWdlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gYWN0aXZlIGxhbmd1YWdlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0QWN0aXZlTGFuZ3VhZ2UoKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlXG4gICAgICAuZ2V0QWN0aXZlKClcbiAgICAgIC5zdWJzY3JpYmUoKGxhbmcpID0+IChyZXN1bHQgPSBsYW5nKSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIHJlc3VsdCA/PyAnZW4nO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgdGhlIG1lc3NhZ2UgZm9yIHRoZSBtaXNzaW5nIGxvY2FsIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gQWN0aXZlIGxhbmd1YWdlXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVwb3J0TWlzc2luZ0xvY2FsZURhdGEobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBDcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlOiBObyBsb2NhbGUgZGF0YSByZWdpc3RlcmVkIGZvciAnJHtsYW5nfScgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9yZWdpc3RlckxvY2FsZURhdGEpLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=