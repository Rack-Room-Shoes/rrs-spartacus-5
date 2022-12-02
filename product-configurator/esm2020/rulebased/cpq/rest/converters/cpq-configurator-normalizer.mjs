/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { take } from 'rxjs/operators';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-configurator-normalizer-utils.service";
import * as i2 from "@spartacus/core";
export class CpqConfiguratorNormalizer {
    constructor(cpqConfiguratorNormalizerUtilsService, translation) {
        this.cpqConfiguratorNormalizerUtilsService = cpqConfiguratorNormalizerUtilsService;
        this.translation = translation;
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            configId: '',
            complete: !source.incompleteAttributes?.length,
            consistent: !source.invalidMessages?.length &&
                !source.failedValidations?.length &&
                !source.incompleteMessages?.length &&
                !source.errorMessages?.length,
            totalNumberOfIssues: this.generateTotalNumberOfIssues(source),
            productCode: source.productSystemId,
            priceSummary: this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source),
            groups: [],
            flatGroups: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
            interactionState: {},
            errorMessages: this.generateErrorMessages(source),
            warningMessages: this.generateWarningMessages(source),
        };
        source.tabs?.forEach((tab) => this.convertGroup(tab, source.attributes ?? [], source.currencyISOCode, resultTarget.groups, resultTarget.flatGroups));
        if (!resultTarget.groups || resultTarget.groups.length === 0) {
            this.convertGenericGroup(source.attributes ?? [], source.incompleteAttributes ?? [], source.currencyISOCode, resultTarget.groups, resultTarget.flatGroups);
        }
        return resultTarget;
    }
    generateTotalNumberOfIssues(source) {
        let numberOfIssues = (source.incompleteAttributes?.length ?? 0) +
            (source.incompleteMessages?.length ?? 0) +
            (source.invalidMessages?.length ?? 0) +
            (source.failedValidations?.length ?? 0) +
            (source.errorMessages?.length ?? 0);
        return numberOfIssues;
    }
    generateWarningMessages(source) {
        let warnMsgs = [];
        warnMsgs = warnMsgs.concat(source.failedValidations ?? []);
        warnMsgs = warnMsgs.concat(source.incompleteMessages ?? []);
        return warnMsgs;
    }
    generateErrorMessages(source) {
        let errorMsgs = [];
        errorMsgs = errorMsgs.concat(source.errorMessages ?? []);
        errorMsgs = errorMsgs.concat(source.invalidMessages ?? []);
        return errorMsgs;
    }
    convertGroup(source, sourceAttributes, currency, groupList, flatGroupList) {
        const attributes = [];
        if (source.isSelected) {
            sourceAttributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, source.id, currency, attributes));
        }
        const group = {
            id: source.id.toString(),
            name: source.name,
            description: source.displayName,
            configurable: true,
            complete: !source.isIncomplete,
            consistent: true,
            groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
            attributes: attributes,
            subGroups: [],
        };
        flatGroupList.push(group);
        groupList.push(group);
    }
    convertGenericGroup(sourceAttributes, incompleteAttributes, currency, groupList, flatGroupList) {
        const attributes = [];
        sourceAttributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, 0, currency, attributes));
        const group = {
            id: '0',
            name: '_GEN',
            configurable: true,
            complete: incompleteAttributes && incompleteAttributes.length > 0,
            consistent: true,
            groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
            attributes: attributes,
            subGroups: [],
        };
        this.translation
            .translate('configurator.group.general')
            .pipe(take(1))
            .subscribe((generalText) => (group.description = generalText));
        groupList.push(group);
        flatGroupList.push(group);
    }
    convertAttribute(sourceAttribute, groupId, currency, attributeList) {
        const attribute = {
            attrCode: sourceAttribute.stdAttrCode,
            name: sourceAttribute.pA_ID.toString(),
            description: sourceAttribute.description,
            label: this.cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(sourceAttribute),
            required: sourceAttribute.required,
            isLineItem: sourceAttribute.isLineItem,
            uiType: this.convertAttributeType(sourceAttribute),
            dataType: this.cpqConfiguratorNormalizerUtilsService.convertDataType(sourceAttribute),
            quantity: Number(sourceAttribute.quantity),
            groupId: groupId.toString(),
            userInput: sourceAttribute.userInput,
            hasConflicts: sourceAttribute.hasConflict,
            selectedSingleValue: undefined,
            images: [],
        };
        if (sourceAttribute.values &&
            sourceAttribute.displayAs !== Cpq.DisplayAs.INPUT) {
            const values = [];
            sourceAttribute.values.forEach((value) => this.convertValue(value, sourceAttribute, currency, values));
            attribute.values = values;
            this.setSelectedSingleValue(attribute);
        }
        attribute.attributePriceTotal =
            this.cpqConfiguratorNormalizerUtilsService.calculateAttributePriceTotal(attribute, currency);
        this.compileAttributeIncomplete(attribute);
        attributeList.push(attribute);
    }
    setSelectedSingleValue(attribute) {
        const selectedValues = attribute.values
            ?.map((entry) => entry)
            .filter((entry) => entry.selected);
        if (selectedValues && selectedValues.length === 1) {
            attribute.selectedSingleValue = selectedValues[0].valueCode;
        }
    }
    convertValueDisplay(sourceValue, sourceAttribute, value) {
        sourceAttribute?.displayAs === Cpq.DisplayAs.DROPDOWN &&
            sourceValue?.selected &&
            sourceValue.paV_ID === 0
            ? this.translation
                .translate('configurator.attribute.dropDownSelectMsg')
                .pipe(take(1))
                .subscribe((text) => (value.valueDisplay = text))
            : value.valueDisplay;
    }
    convertValue(sourceValue, sourceAttribute, currency, values) {
        if (this.hasValueToBeIgnored(sourceAttribute, sourceValue)) {
            return;
        }
        const value = {
            valueCode: sourceValue.paV_ID.toString(),
            name: sourceValue.valueCode,
            valueDisplay: sourceValue.valueDisplay,
            description: sourceValue.description,
            productSystemId: sourceValue.productSystemId,
            selected: sourceValue.selected,
            quantity: this.cpqConfiguratorNormalizerUtilsService.convertQuantity(sourceValue, sourceAttribute),
            valuePrice: this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(sourceValue, currency),
            images: [],
        };
        this.convertValueDisplay(sourceValue, sourceAttribute, value);
        value.valuePriceTotal =
            this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(value.quantity ?? 1, value.valuePrice);
        values.push(value);
    }
    convertAttributeTypeOld(displayAs, displayAsProduct = false) {
        let uiType;
        switch (displayAs) {
            case Cpq.DisplayAs.RADIO_BUTTON: {
                if (displayAsProduct) {
                    uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
                }
                else {
                    uiType = Configurator.UiType.RADIOBUTTON;
                }
                break;
            }
            case Cpq.DisplayAs.DROPDOWN: {
                if (displayAsProduct) {
                    uiType = Configurator.UiType.DROPDOWN_PRODUCT;
                }
                else {
                    uiType = Configurator.UiType.DROPDOWN;
                }
                break;
            }
            case Cpq.DisplayAs.CHECK_BOX: {
                if (displayAsProduct) {
                    uiType = Configurator.UiType.CHECKBOXLIST_PRODUCT;
                }
                else {
                    uiType = Configurator.UiType.CHECKBOXLIST;
                }
                break;
            }
            case Cpq.DisplayAs.INPUT: {
                uiType = Configurator.UiType.STRING;
                break;
            }
            case Cpq.DisplayAs.READ_ONLY: {
                uiType = Configurator.UiType.READ_ONLY;
                break;
            }
            default: {
                uiType = Configurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    convertAttributeType(sourceAttribute) {
        const displayAs = sourceAttribute.displayAs;
        const displayAsProduct = sourceAttribute?.values &&
            this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(sourceAttribute?.values)
            ? true
            : false;
        const isEnabled = sourceAttribute.isEnabled ?? false;
        if (!isEnabled &&
            (displayAs === Cpq.DisplayAs.RADIO_BUTTON ||
                displayAs === Cpq.DisplayAs.DROPDOWN ||
                displayAs === Cpq.DisplayAs.CHECK_BOX ||
                displayAs === Cpq.DisplayAs.INPUT)) {
            return Configurator.UiType.READ_ONLY;
        }
        let uiType;
        switch (displayAs) {
            case Cpq.DisplayAs.RADIO_BUTTON: {
                if (displayAsProduct) {
                    uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
                }
                else {
                    uiType = Configurator.UiType.RADIOBUTTON;
                }
                break;
            }
            case Cpq.DisplayAs.DROPDOWN: {
                if (displayAsProduct) {
                    uiType = Configurator.UiType.DROPDOWN_PRODUCT;
                }
                else {
                    uiType = Configurator.UiType.DROPDOWN;
                }
                break;
            }
            case Cpq.DisplayAs.CHECK_BOX: {
                if (displayAsProduct) {
                    uiType = Configurator.UiType.CHECKBOXLIST_PRODUCT;
                }
                else {
                    uiType = Configurator.UiType.CHECKBOXLIST;
                }
                break;
            }
            case Cpq.DisplayAs.INPUT: {
                if (sourceAttribute?.dataType === Cpq.DataType.INPUT_STRING) {
                    uiType = Configurator.UiType.STRING;
                }
                else {
                    uiType = Configurator.UiType.NOT_IMPLEMENTED;
                }
                break;
            }
            default: {
                uiType = Configurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    compileAttributeIncomplete(attribute) {
        //Default value for incomplete is false
        attribute.incomplete = false;
        switch (attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                if (!attribute.selectedSingleValue ||
                    attribute.selectedSingleValue === '0') {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.STRING: {
                if (!attribute.userInput) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                const isOneValueSelected = attribute.values?.find((value) => value.selected) !== undefined
                    ? true
                    : false;
                if (!isOneValueSelected) {
                    attribute.incomplete = true;
                }
                break;
            }
        }
    }
    hasValueToBeIgnored(attribute, value) {
        const selectedValues = attribute.values
            ?.map((entry) => entry)
            .filter((entry) => entry.selected && entry.paV_ID !== 0);
        return ((attribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
            attribute.required &&
            selectedValues &&
            selectedValues.length > 0 &&
            value.paV_ID === 0) ??
            false);
    }
}
CpqConfiguratorNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorNormalizer, deps: [{ token: i1.CpqConfiguratorNormalizerUtilsService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorNormalizer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorNormalizer, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CpqConfiguratorNormalizerUtilsService }, { type: i2.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvcmVzdC9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDekUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFJcEMsTUFBTSxPQUFPLHlCQUF5QjtJQUdwQyxZQUNZLHFDQUE0RSxFQUM1RSxXQUErQjtRQUQvQiwwQ0FBcUMsR0FBckMscUNBQXFDLENBQXVDO1FBQzVFLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUN4QyxDQUFDO0lBRUosT0FBTyxDQUNMLE1BQXlCLEVBQ3pCLE1BQW1DO1FBRW5DLE1BQU0sWUFBWSxHQUErQjtZQUMvQyxHQUFHLE1BQU07WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxNQUFNO1lBQzlDLFVBQVUsRUFDUixDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTTtnQkFDL0IsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsTUFBTTtnQkFDakMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTTtnQkFDbEMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE1BQU07WUFDL0IsbUJBQW1CLEVBQUUsSUFBSSxDQUFD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QUssU0FBUztvQkFDN0QsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFFWixJQUFJLENBQUMsa0JBQWtCLEVBQUU7b0JBQ3ZCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUM3QjtnQkFDRCxNQUFNO2FBQ1A7U0FDRjtJQUNILENBQUM7SUFFUyxtQkFBbUIsQ0FDM0IsU0FBd0IsRUFDeEIsS0FBZ0I7UUFFaEIsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLE1BQU07WUFDckMsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQzthQUN0QixNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQ0wsQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUM3QyxTQUFTLENBQUMsUUFBUTtZQUNsQixjQUFjO1lBQ2QsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FDTixDQUFDO0lBQ0osQ0FBQzs7c0hBamJVLHlCQUF5QjswSEFBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRHJDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIsIFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JNb2RlbFV0aWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENwcSB9IGZyb20gJy4uL2NwcS5tb2RlbHMnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZSB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1ub3JtYWxpemVyLXV0aWxzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxDcHEuQ29uZmlndXJhdGlvbiwgQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+XG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlOiBDcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb25TZXJ2aWNlXG4gICkge31cblxuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogQ3BxLkNvbmZpZ3VyYXRpb24sXG4gICAgdGFyZ2V0PzogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0IHJlc3VsdFRhcmdldDogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAuLi50YXJnZXQsXG4gICAgICBjb25maWdJZDogJycsIC8vd2lsbCBsYXRlciBiZSBwb3B1bGF0ZWQgd2l0aCBmaW5hbCB2YWx1ZVxuICAgICAgY29tcGxldGU6ICFzb3VyY2UuaW5jb21wbGV0ZUF0dHJpYnV0ZXM/Lmxlbmd0aCxcbiAgICAgIGNvbnNpc3RlbnQ6XG4gICAgICAgICFzb3VyY2UuaW52YWxpZE1lc3NhZ2VzPy5sZW5ndGggJiZcbiAgICAgICAgIXNvdXJjZS5mYWlsZWRWYWxpZGF0aW9ucz8ubGVuZ3RoICYmXG4gICAgICAgICFzb3VyY2UuaW5jb21wbGV0ZU1lc3NhZ2VzPy5sZW5ndGggJiZcbiAgICAgICAgIXNvdXJjZS5lcnJvck1lc3NhZ2VzPy5sZW5ndGgsXG4gICAgICB0b3RhbE51bWJlck9mSXNzdWVzOiB0aGlzLmdlbmVyYXRlVG90YWxOdW1iZXJPZklzc3Vlcyhzb3VyY2UpLFxuICAgICAgcHJvZHVjdENvZGU6IHNvdXJjZS5wcm9kdWN0U3lzdGVtSWQsXG4gICAgICBwcmljZVN1bW1hcnk6XG4gICAgICAgIHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5jb252ZXJ0UHJpY2VTdW1tYXJ5KHNvdXJjZSksXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgZmxhdEdyb3VwczogW10sXG4gICAgICBvd25lcjogQ29uZmlndXJhdG9yTW9kZWxVdGlscy5jcmVhdGVJbml0aWFsT3duZXIoKSxcbiAgICAgIGludGVyYWN0aW9uU3RhdGU6IHt9LFxuICAgICAgZXJyb3JNZXNzYWdlczogdGhpcy5nZW5lcmF0ZUVycm9yTWVzc2FnZXMoc291cmNlKSxcbiAgICAgIHdhcm5pbmdNZXNzYWdlczogdGhpcy5nZW5lcmF0ZVdhcm5pbmdNZXNzYWdlcyhzb3VyY2UpLFxuICAgIH07XG4gICAgc291cmNlLnRhYnM/LmZvckVhY2goKHRhYikgPT5cbiAgICAgIHRoaXMuY29udmVydEdyb3VwKFxuICAgICAgICB0YWIsXG4gICAgICAgIHNvdXJjZS5hdHRyaWJ1dGVzID8/IFtdLFxuICAgICAgICBzb3VyY2UuY3VycmVuY3lJU09Db2RlLFxuICAgICAgICByZXN1bHRUYXJnZXQuZ3JvdXBzLFxuICAgICAgICByZXN1bHRUYXJnZXQuZmxhdEdyb3Vwc1xuICAgICAgKVxuICAgICk7XG5cbiAgICBpZiAoIXJlc3VsdFRhcmdldC5ncm91cHMgfHwgcmVzdWx0VGFyZ2V0Lmdyb3Vwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY29udmVydEdlbmVyaWNHcm91cChcbiAgICAgICAgc291cmNlLmF0dHJpYnV0ZXMgPz8gW10sXG4gICAgICAgIHNvdXJjZS5pbmNvbXBsZXRlQXR0cmlidXRlcyA/PyBbXSxcbiAgICAgICAgc291cmNlLmN1cnJlbmN5SVNPQ29kZSxcbiAgICAgICAgcmVzdWx0VGFyZ2V0Lmdyb3VwcyxcbiAgICAgICAgcmVzdWx0VGFyZ2V0LmZsYXRHcm91cHNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFRhcmdldDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZW5lcmF0ZVRvdGFsTnVtYmVyT2ZJc3N1ZXMoc291cmNlOiBDcHEuQ29uZmlndXJhdGlvbik6IG51bWJlciB7XG4gICAgbGV0IG51bWJlck9mSXNzdWVzOiBudW1iZXIgPVxuICAgICAgKHNvdXJjZS5pbmNvbXBsZXRlQXR0cmlidXRlcz8ubGVuZ3RoID8/IDApICtcbiAgICAgIChzb3VyY2UuaW5jb21wbGV0ZU1lc3NhZ2VzPy5sZW5ndGggPz8gMCkgK1xuICAgICAgKHNvdXJjZS5pbnZhbGlkTWVzc2FnZXM/Lmxlbmd0aCA/PyAwKSArXG4gICAgICAoc291cmNlLmZhaWxlZFZhbGlkYXRpb25zPy5sZW5ndGggPz8gMCkgK1xuICAgICAgKHNvdXJjZS5lcnJvck1lc3NhZ2VzPy5sZW5ndGggPz8gMCk7XG4gICAgcmV0dXJuIG51bWJlck9mSXNzdWVzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlV2FybmluZ01lc3NhZ2VzKHNvdXJjZTogQ3BxLkNvbmZpZ3VyYXRpb24pOiBzdHJpbmdbXSB7XG4gICAgbGV0IHdhcm5Nc2dzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdhcm5Nc2dzID0gd2Fybk1zZ3MuY29uY2F0KHNvdXJjZS5mYWlsZWRWYWxpZGF0aW9ucyA/PyBbXSk7XG4gICAgd2Fybk1zZ3MgPSB3YXJuTXNncy5jb25jYXQoc291cmNlLmluY29tcGxldGVNZXNzYWdlcyA/PyBbXSk7XG4gICAgcmV0dXJuIHdhcm5Nc2dzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlRXJyb3JNZXNzYWdlcyhzb3VyY2U6IENwcS5Db25maWd1cmF0aW9uKTogc3RyaW5nW10ge1xuICAgIGxldCBlcnJvck1zZ3M6IHN0cmluZ1tdID0gW107XG4gICAgZXJyb3JNc2dzID0gZXJyb3JNc2dzLmNvbmNhdChzb3VyY2UuZXJyb3JNZXNzYWdlcyA/PyBbXSk7XG4gICAgZXJyb3JNc2dzID0gZXJyb3JNc2dzLmNvbmNhdChzb3VyY2UuaW52YWxpZE1lc3NhZ2VzID8/IFtdKTtcbiAgICByZXR1cm4gZXJyb3JNc2dzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRHcm91cChcbiAgICBzb3VyY2U6IENwcS5UYWIsXG4gICAgc291cmNlQXR0cmlidXRlczogQ3BxLkF0dHJpYnV0ZVtdLFxuICAgIGN1cnJlbmN5OiBzdHJpbmcsXG4gICAgZ3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBmbGF0R3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXVxuICApIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlW10gPSBbXTtcbiAgICBpZiAoc291cmNlLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHNvdXJjZUF0dHJpYnV0ZXMuZm9yRWFjaCgoc291cmNlQXR0cmlidXRlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRBdHRyaWJ1dGUoc291cmNlQXR0cmlidXRlLCBzb3VyY2UuaWQsIGN1cnJlbmN5LCBhdHRyaWJ1dGVzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwID0ge1xuICAgICAgaWQ6IHNvdXJjZS5pZC50b1N0cmluZygpLFxuICAgICAgbmFtZTogc291cmNlLm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlLmRpc3BsYXlOYW1lLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgY29tcGxldGU6ICFzb3VyY2UuaXNJbmNvbXBsZXRlLFxuICAgICAgY29uc2lzdGVudDogdHJ1ZSxcbiAgICAgIGdyb3VwVHlwZTogQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5BVFRSSUJVVEVfR1JPVVAsXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgc3ViR3JvdXBzOiBbXSxcbiAgICB9O1xuXG4gICAgZmxhdEdyb3VwTGlzdC5wdXNoKGdyb3VwKTtcbiAgICBncm91cExpc3QucHVzaChncm91cCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydEdlbmVyaWNHcm91cChcbiAgICBzb3VyY2VBdHRyaWJ1dGVzOiBDcHEuQXR0cmlidXRlW10sXG4gICAgaW5jb21wbGV0ZUF0dHJpYnV0ZXM6IHN0cmluZ1tdLFxuICAgIGN1cnJlbmN5OiBzdHJpbmcsXG4gICAgZ3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBmbGF0R3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXVxuICApIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlW10gPSBbXTtcbiAgICBzb3VyY2VBdHRyaWJ1dGVzLmZvckVhY2goKHNvdXJjZUF0dHJpYnV0ZSkgPT5cbiAgICAgIHRoaXMuY29udmVydEF0dHJpYnV0ZShzb3VyY2VBdHRyaWJ1dGUsIDAsIGN1cnJlbmN5LCBhdHRyaWJ1dGVzKVxuICAgICk7XG4gICAgY29uc3QgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCA9IHtcbiAgICAgIGlkOiAnMCcsXG4gICAgICBuYW1lOiAnX0dFTicsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBjb21wbGV0ZTogaW5jb21wbGV0ZUF0dHJpYnV0ZXMgJiYgaW5jb21wbGV0ZUF0dHJpYnV0ZXMubGVuZ3RoID4gMCxcbiAgICAgIGNvbnNpc3RlbnQ6IHRydWUsXG4gICAgICBncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQLFxuICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyxcbiAgICAgIHN1Ykdyb3VwczogW10sXG4gICAgfTtcblxuICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5ncm91cC5nZW5lcmFsJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChnZW5lcmFsVGV4dCkgPT4gKGdyb3VwLmRlc2NyaXB0aW9uID0gZ2VuZXJhbFRleHQpKTtcblxuICAgIGdyb3VwTGlzdC5wdXNoKGdyb3VwKTtcbiAgICBmbGF0R3JvdXBMaXN0LnB1c2goZ3JvdXApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRBdHRyaWJ1dGUoXG4gICAgc291cmNlQXR0cmlidXRlOiBDcHEuQXR0cmlidXRlLFxuICAgIGdyb3VwSWQ6IG51bWJlcixcbiAgICBjdXJyZW5jeTogc3RyaW5nLFxuICAgIGF0dHJpYnV0ZUxpc3Q6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUgPSB7XG4gICAgICBhdHRyQ29kZTogc291cmNlQXR0cmlidXRlLnN0ZEF0dHJDb2RlLFxuICAgICAgbmFtZTogc291cmNlQXR0cmlidXRlLnBBX0lELnRvU3RyaW5nKCksXG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlQXR0cmlidXRlLmRlc2NyaXB0aW9uLFxuICAgICAgbGFiZWw6XG4gICAgICAgIHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5jb252ZXJ0QXR0cmlidXRlTGFiZWwoXG4gICAgICAgICAgc291cmNlQXR0cmlidXRlXG4gICAgICAgICksXG4gICAgICByZXF1aXJlZDogc291cmNlQXR0cmlidXRlLnJlcXVpcmVkLFxuICAgICAgaXNMaW5lSXRlbTogc291cmNlQXR0cmlidXRlLmlzTGluZUl0ZW0sXG4gICAgICB1aVR5cGU6IHRoaXMuY29udmVydEF0dHJpYnV0ZVR5cGUoc291cmNlQXR0cmlidXRlKSxcbiAgICAgIGRhdGFUeXBlOlxuICAgICAgICB0aGlzLmNwcUNvbmZpZ3VyYXRvck5vcm1hbGl6ZXJVdGlsc1NlcnZpY2UuY29udmVydERhdGFUeXBlKFxuICAgICAgICAgIHNvdXJjZUF0dHJpYnV0ZVxuICAgICAgICApLFxuICAgICAgcXVhbnRpdHk6IE51bWJlcihzb3VyY2VBdHRyaWJ1dGUucXVhbnRpdHkpLFxuICAgICAgZ3JvdXBJZDogZ3JvdXBJZC50b1N0cmluZygpLFxuICAgICAgdXNlcklucHV0OiBzb3VyY2VBdHRyaWJ1dGUudXNlcklucHV0LFxuICAgICAgaGFzQ29uZmxpY3RzOiBzb3VyY2VBdHRyaWJ1dGUuaGFzQ29uZmxpY3QsXG4gICAgICBzZWxlY3RlZFNpbmdsZVZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBpbWFnZXM6IFtdLFxuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICBzb3VyY2VBdHRyaWJ1dGUudmFsdWVzICYmXG4gICAgICBzb3VyY2VBdHRyaWJ1dGUuZGlzcGxheUFzICE9PSBDcHEuRGlzcGxheUFzLklOUFVUXG4gICAgKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IENvbmZpZ3VyYXRvci5WYWx1ZVtdID0gW107XG4gICAgICBzb3VyY2VBdHRyaWJ1dGUudmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRWYWx1ZSh2YWx1ZSwgc291cmNlQXR0cmlidXRlLCBjdXJyZW5jeSwgdmFsdWVzKVxuICAgICAgKTtcbiAgICAgIGF0dHJpYnV0ZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkU2luZ2xlVmFsdWUoYXR0cmlidXRlKTtcbiAgICB9XG4gICAgYXR0cmlidXRlLmF0dHJpYnV0ZVByaWNlVG90YWwgPVxuICAgICAgdGhpcy5jcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLmNhbGN1bGF0ZUF0dHJpYnV0ZVByaWNlVG90YWwoXG4gICAgICAgIGF0dHJpYnV0ZSxcbiAgICAgICAgY3VycmVuY3lcbiAgICAgICk7XG4gICAgdGhpcy5jb21waWxlQXR0cmlidXRlSW5jb21wbGV0ZShhdHRyaWJ1dGUpO1xuICAgIGF0dHJpYnV0ZUxpc3QucHVzaChhdHRyaWJ1dGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFNlbGVjdGVkU2luZ2xlVmFsdWUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSBhdHRyaWJ1dGUudmFsdWVzXG4gICAgICA/Lm1hcCgoZW50cnkpID0+IGVudHJ5KVxuICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNlbGVjdGVkKTtcbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZXMgJiYgc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBhdHRyaWJ1dGUuc2VsZWN0ZWRTaW5nbGVWYWx1ZSA9IHNlbGVjdGVkVmFsdWVzWzBdLnZhbHVlQ29kZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydFZhbHVlRGlzcGxheShcbiAgICBzb3VyY2VWYWx1ZTogQ3BxLlZhbHVlLFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogQ3BxLkF0dHJpYnV0ZSxcbiAgICB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlXG4gICk6IHZvaWQge1xuICAgIHNvdXJjZUF0dHJpYnV0ZT8uZGlzcGxheUFzID09PSBDcHEuRGlzcGxheUFzLkRST1BET1dOICYmXG4gICAgc291cmNlVmFsdWU/LnNlbGVjdGVkICYmXG4gICAgc291cmNlVmFsdWUucGFWX0lEID09PSAwXG4gICAgICA/IHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYXR0cmlidXRlLmRyb3BEb3duU2VsZWN0TXNnJylcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+ICh2YWx1ZS52YWx1ZURpc3BsYXkgPSB0ZXh0KSlcbiAgICAgIDogdmFsdWUudmFsdWVEaXNwbGF5O1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRWYWx1ZShcbiAgICBzb3VyY2VWYWx1ZTogQ3BxLlZhbHVlLFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogQ3BxLkF0dHJpYnV0ZSxcbiAgICBjdXJyZW5jeTogc3RyaW5nLFxuICAgIHZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW11cbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzVmFsdWVUb0JlSWdub3JlZChzb3VyY2VBdHRyaWJ1dGUsIHNvdXJjZVZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZTogQ29uZmlndXJhdG9yLlZhbHVlID0ge1xuICAgICAgdmFsdWVDb2RlOiBzb3VyY2VWYWx1ZS5wYVZfSUQudG9TdHJpbmcoKSxcbiAgICAgIG5hbWU6IHNvdXJjZVZhbHVlLnZhbHVlQ29kZSxcbiAgICAgIHZhbHVlRGlzcGxheTogc291cmNlVmFsdWUudmFsdWVEaXNwbGF5LFxuICAgICAgZGVzY3JpcHRpb246IHNvdXJjZVZhbHVlLmRlc2NyaXB0aW9uLFxuICAgICAgcHJvZHVjdFN5c3RlbUlkOiBzb3VyY2VWYWx1ZS5wcm9kdWN0U3lzdGVtSWQsXG4gICAgICBzZWxlY3RlZDogc291cmNlVmFsdWUuc2VsZWN0ZWQsXG4gICAgICBxdWFudGl0eTogdGhpcy5jcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLmNvbnZlcnRRdWFudGl0eShcbiAgICAgICAgc291cmNlVmFsdWUsXG4gICAgICAgIHNvdXJjZUF0dHJpYnV0ZVxuICAgICAgKSxcbiAgICAgIHZhbHVlUHJpY2U6IHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5jb252ZXJ0VmFsdWVQcmljZShcbiAgICAgICAgc291cmNlVmFsdWUsXG4gICAgICAgIGN1cnJlbmN5XG4gICAgICApLFxuICAgICAgaW1hZ2VzOiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy5jb252ZXJ0VmFsdWVEaXNwbGF5KHNvdXJjZVZhbHVlLCBzb3VyY2VBdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICB2YWx1ZS52YWx1ZVByaWNlVG90YWwgPVxuICAgICAgdGhpcy5jcHFDb25maWd1cmF0b3JOb3JtYWxpemVyVXRpbHNTZXJ2aWNlLmNhbGN1bGF0ZVZhbHVlUHJpY2VUb3RhbChcbiAgICAgICAgdmFsdWUucXVhbnRpdHkgPz8gMSxcbiAgICAgICAgdmFsdWUudmFsdWVQcmljZVxuICAgICAgKTtcblxuICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0QXR0cmlidXRlVHlwZU9sZChcbiAgICBkaXNwbGF5QXM6IENwcS5EaXNwbGF5QXMsXG4gICAgZGlzcGxheUFzUHJvZHVjdCA9IGZhbHNlXG4gICk6IENvbmZpZ3VyYXRvci5VaVR5cGUge1xuICAgIGxldCB1aVR5cGU6IENvbmZpZ3VyYXRvci5VaVR5cGU7XG4gICAgc3dpdGNoIChkaXNwbGF5QXMpIHtcbiAgICAgIGNhc2UgQ3BxLkRpc3BsYXlBcy5SQURJT19CVVRUT046IHtcbiAgICAgICAgaWYgKGRpc3BsYXlBc1Byb2R1Y3QpIHtcbiAgICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX1BST0RVQ1Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIENwcS5EaXNwbGF5QXMuRFJPUERPV046IHtcbiAgICAgICAgaWYgKGRpc3BsYXlBc1Byb2R1Y3QpIHtcbiAgICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX1BST0RVQ1Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIENwcS5EaXNwbGF5QXMuQ0hFQ0tfQk9YOiB7XG4gICAgICAgIGlmIChkaXNwbGF5QXNQcm9kdWN0KSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1RfUFJPRFVDVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YTElTVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIENwcS5EaXNwbGF5QXMuSU5QVVQ6IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlIENwcS5EaXNwbGF5QXMuUkVBRF9PTkxZOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuUkVBRF9PTkxZO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLk5PVF9JTVBMRU1FTlRFRDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVpVHlwZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0QXR0cmlidXRlVHlwZShcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IENwcS5BdHRyaWJ1dGVcbiAgKTogQ29uZmlndXJhdG9yLlVpVHlwZSB7XG4gICAgY29uc3QgZGlzcGxheUFzID0gc291cmNlQXR0cmlidXRlLmRpc3BsYXlBcztcblxuICAgIGNvbnN0IGRpc3BsYXlBc1Byb2R1Y3Q6IGJvb2xlYW4gPVxuICAgICAgc291cmNlQXR0cmlidXRlPy52YWx1ZXMgJiZcbiAgICAgIHRoaXMuY3BxQ29uZmlndXJhdG9yTm9ybWFsaXplclV0aWxzU2VydmljZS5oYXNBbnlQcm9kdWN0cyhcbiAgICAgICAgc291cmNlQXR0cmlidXRlPy52YWx1ZXNcbiAgICAgIClcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogZmFsc2U7XG4gICAgY29uc3QgaXNFbmFibGVkOiBib29sZWFuID0gc291cmNlQXR0cmlidXRlLmlzRW5hYmxlZCA/PyBmYWxzZTtcblxuICAgIGlmIChcbiAgICAgICFpc0VuYWJsZWQgJiZcbiAgICAgIChkaXNwbGF5QXMgPT09IENwcS5EaXNwbGF5QXMuUkFESU9fQlVUVE9OIHx8XG4gICAgICAgIGRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5EUk9QRE9XTiB8fFxuICAgICAgICBkaXNwbGF5QXMgPT09IENwcS5EaXNwbGF5QXMuQ0hFQ0tfQk9YIHx8XG4gICAgICAgIGRpc3BsYXlBcyA9PT0gQ3BxLkRpc3BsYXlBcy5JTlBVVClcbiAgICApIHtcbiAgICAgIHJldHVybiBDb25maWd1cmF0b3IuVWlUeXBlLlJFQURfT05MWTtcbiAgICB9XG5cbiAgICBsZXQgdWlUeXBlOiBDb25maWd1cmF0b3IuVWlUeXBlO1xuICAgIHN3aXRjaCAoZGlzcGxheUFzKSB7XG4gICAgICBjYXNlIENwcS5EaXNwbGF5QXMuUkFESU9fQlVUVE9OOiB7XG4gICAgICAgIGlmIChkaXNwbGF5QXNQcm9kdWN0KSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTl9QUk9EVUNUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT047XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBDcHEuRGlzcGxheUFzLkRST1BET1dOOiB7XG4gICAgICAgIGlmIChkaXNwbGF5QXNQcm9kdWN0KSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9QUk9EVUNUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV047XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBDcHEuRGlzcGxheUFzLkNIRUNLX0JPWDoge1xuICAgICAgICBpZiAoZGlzcGxheUFzUHJvZHVjdCkge1xuICAgICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUX1BST0RVQ1Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1Q7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBDcHEuRGlzcGxheUFzLklOUFVUOiB7XG4gICAgICAgIGlmIChzb3VyY2VBdHRyaWJ1dGU/LmRhdGFUeXBlID09PSBDcHEuRGF0YVR5cGUuSU5QVVRfU1RSSU5HKSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URUQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URUQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1aVR5cGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29tcGlsZUF0dHJpYnV0ZUluY29tcGxldGUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKSB7XG4gICAgLy9EZWZhdWx0IHZhbHVlIGZvciBpbmNvbXBsZXRlIGlzIGZhbHNlXG4gICAgYXR0cmlidXRlLmluY29tcGxldGUgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoYXR0cmlidXRlLnVpVHlwZSkge1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX1BST0RVQ1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV046XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fUFJPRFVDVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5TSU5HTEVfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWUgfHxcbiAgICAgICAgICBhdHRyaWJ1dGUuc2VsZWN0ZWRTaW5nbGVWYWx1ZSA9PT0gJzAnXG4gICAgICAgICkge1xuICAgICAgICAgIGF0dHJpYnV0ZS5pbmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5OVU1FUklDOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlNUUklORzoge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZS51c2VySW5wdXQpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWExJU1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUX1BST0RVQ1Q6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1g6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuTVVMVElfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIGNvbnN0IGlzT25lVmFsdWVTZWxlY3RlZCA9XG4gICAgICAgICAgYXR0cmlidXRlLnZhbHVlcz8uZmluZCgodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgaWYgKCFpc09uZVZhbHVlU2VsZWN0ZWQpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGhhc1ZhbHVlVG9CZUlnbm9yZWQoXG4gICAgYXR0cmlidXRlOiBDcHEuQXR0cmlidXRlLFxuICAgIHZhbHVlOiBDcHEuVmFsdWVcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSBhdHRyaWJ1dGUudmFsdWVzXG4gICAgICA/Lm1hcCgoZW50cnkpID0+IGVudHJ5KVxuICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNlbGVjdGVkICYmIGVudHJ5LnBhVl9JRCAhPT0gMCk7XG4gICAgcmV0dXJuIChcbiAgICAgIChhdHRyaWJ1dGUuZGlzcGxheUFzID09PSBDcHEuRGlzcGxheUFzLkRST1BET1dOICYmXG4gICAgICAgIGF0dHJpYnV0ZS5yZXF1aXJlZCAmJlxuICAgICAgICBzZWxlY3RlZFZhbHVlcyAmJlxuICAgICAgICBzZWxlY3RlZFZhbHVlcy5sZW5ndGggPiAwICYmXG4gICAgICAgIHZhbHVlLnBhVl9JRCA9PT0gMCkgPz9cbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxufVxuIl19