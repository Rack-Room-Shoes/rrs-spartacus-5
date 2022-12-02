/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { take } from 'rxjs/operators';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../components/config/configurator-ui-settings.config";
export class OccConfiguratorVariantNormalizer {
    constructor(config, translation, uiSettingsConfig) {
        this.config = config;
        this.translation = translation;
        this.uiSettingsConfig = uiSettingsConfig;
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            owner: target?.owner ?? ConfiguratorModelUtils.createInitialOwner(),
            interactionState: target?.interactionState ?? {},
            configId: source.configId,
            complete: source.complete,
            consistent: source.consistent,
            totalNumberOfIssues: source.totalNumberOfIssues,
            productCode: source.rootProduct,
            groups: [],
            flatGroups: [],
        };
        const flatGroups = [];
        source.groups?.forEach((group) => this.convertGroup(group, resultTarget.groups, flatGroups));
        resultTarget.flatGroups = flatGroups;
        return resultTarget;
    }
    convertGroup(source, groupList, flatGroupList) {
        const attributes = [];
        if (source.attributes) {
            source.attributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, attributes));
        }
        const group = {
            description: source.description,
            configurable: source.configurable,
            complete: source.complete,
            consistent: source.consistent,
            groupType: this.convertGroupType(source.groupType),
            name: source.name,
            id: source.id,
            attributes: attributes,
            subGroups: [],
        };
        this.setGroupDescription(group);
        if (source.subGroups) {
            source.subGroups.forEach((sourceSubGroup) => this.convertGroup(sourceSubGroup, group.subGroups, flatGroupList));
        }
        if (group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP ||
            group.groupType === Configurator.GroupType.CONFLICT_GROUP) {
            flatGroupList.push(group);
        }
        groupList.push(group);
    }
    getGroupId(key, name) {
        return key.replace('@' + name, '');
    }
    convertAttribute(sourceAttribute, attributeList) {
        const numberOfConflicts = sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length
            : 0;
        const attributeImages = [];
        const attributeValues = [];
        if (sourceAttribute.images) {
            sourceAttribute.images.forEach((occImage) => this.convertImage(occImage, attributeImages));
        }
        this.addRetractValue(sourceAttribute, attributeValues);
        if (sourceAttribute.domainValues) {
            sourceAttribute.domainValues.forEach((value) => this.convertValue(value, attributeValues));
        }
        const uiType = this.convertAttributeType(sourceAttribute);
        const attribute = {
            name: sourceAttribute.name,
            label: sourceAttribute.langDepName,
            required: sourceAttribute.required,
            uiType: uiType,
            groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
            userInput: uiType === Configurator.UiType.NUMERIC ||
                uiType === Configurator.UiType.STRING
                ? sourceAttribute.formattedValue
                    ? sourceAttribute.formattedValue
                    : ''
                : undefined,
            maxlength: (sourceAttribute.maxlength ?? 0) +
                (sourceAttribute.negativeAllowed ? 1 : 0),
            numDecimalPlaces: sourceAttribute.numberScale,
            negativeAllowed: sourceAttribute.negativeAllowed,
            numTotalLength: sourceAttribute.typeLength,
            selectedSingleValue: undefined,
            hasConflicts: numberOfConflicts > 0,
            images: attributeImages,
            values: attributeValues,
            intervalInDomain: sourceAttribute.intervalInDomain,
            key: sourceAttribute.key,
            validationType: sourceAttribute.validationType,
        };
        this.setSelectedSingleValue(attribute);
        //Has to be called after setSelectedSingleValue because it depends on the value of this property
        this.compileAttributeIncomplete(attribute);
        attributeList.push(attribute);
    }
    setSelectedSingleValue(attribute) {
        if (attribute.values) {
            const selectedValues = attribute.values
                .map((entry) => entry)
                .filter((entry) => entry.selected);
            if (selectedValues && selectedValues.length === 1) {
                attribute.selectedSingleValue = selectedValues[0].valueCode;
            }
        }
    }
    isRetractValueSelected(sourceAttribute) {
        return sourceAttribute.domainValues &&
            sourceAttribute.domainValues.filter((value) => value.selected).length
            ? false
            : true;
    }
    setRetractValueDisplay(attributeType, value) {
        if (attributeType === Configurator.UiType.DROPDOWN ||
            attributeType === Configurator.UiType.RADIOBUTTON) {
            if (attributeType === Configurator.UiType.DROPDOWN && value.selected) {
                this.translation
                    .translate('configurator.attribute.dropDownSelectMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
            else {
                this.translation
                    .translate('configurator.attribute.noOptionSelectedMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
        }
    }
    hasSourceAttributeConflicts(sourceAttribute) {
        return sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length > 0
            : false;
    }
    isSourceAttributeTypeReadOnly(sourceAttribute) {
        return sourceAttribute.type === OccConfigurator.UiType.READ_ONLY;
    }
    isRetractBlocked(sourceAttribute) {
        return sourceAttribute.retractBlocked
            ? sourceAttribute.retractBlocked
            : false;
    }
    addRetractValue(sourceAttribute, values) {
        const isRetractBlocked = this.isRetractBlocked(sourceAttribute);
        const isConflicting = this.hasSourceAttributeConflicts(sourceAttribute);
        if (!isRetractBlocked) {
            if (this.uiSettingsConfig?.productConfigurator?.addRetractOption ||
                (this.isSourceAttributeTypeReadOnly(sourceAttribute) && isConflicting)) {
                const attributeType = this.convertAttributeType(sourceAttribute);
                if (attributeType === Configurator.UiType.RADIOBUTTON ||
                    attributeType === Configurator.UiType.DROPDOWN) {
                    const value = {
                        valueCode: OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE,
                        selected: this.isRetractValueSelected(sourceAttribute),
                    };
                    this.setRetractValueDisplay(attributeType, value);
                    values.push(value);
                }
            }
        }
    }
    convertValue(occValue, values) {
        const valueImages = [];
        if (occValue.images) {
            occValue.images.forEach((occImage) => this.convertImage(occImage, valueImages));
        }
        const value = {
            valueCode: occValue.key,
            valueDisplay: occValue.langDepName,
            name: occValue.name,
            selected: occValue.selected,
            images: valueImages,
        };
        values.push(value);
    }
    convertImage(occImage, images) {
        const image = {
            /**
             * Traditionally, in an on-prem world, medias and other backend related calls
             * are hosted at the same platform, but in a cloud setup, applications are
             * typically distributed cross different environments. For media, we use the
             * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
             * if none provided.
             */
            url: (this.config?.backend?.media?.baseUrl ||
                this.config?.backend?.occ?.baseUrl ||
                '') + occImage.url,
            altText: occImage.altText,
            galleryIndex: occImage.galleryIndex,
            type: this.convertImageType(occImage.imageType),
            format: this.convertImageFormatType(occImage.format),
        };
        images.push(image);
    }
    convertAttributeType(sourceAttribute) {
        let uiType;
        switch (sourceAttribute.type) {
            case OccConfigurator.UiType.RADIO_BUTTON: {
                uiType = Configurator.UiType.RADIOBUTTON;
                break;
            }
            case OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT: {
                uiType = Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
                break;
            }
            case OccConfigurator.UiType.DROPDOWN: {
                uiType = Configurator.UiType.DROPDOWN;
                break;
            }
            case OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
                uiType = Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
                break;
            }
            case OccConfigurator.UiType.STRING: {
                uiType = Configurator.UiType.STRING;
                break;
            }
            case OccConfigurator.UiType.NUMERIC: {
                uiType = Configurator.UiType.NUMERIC;
                break;
            }
            case OccConfigurator.UiType.READ_ONLY: {
                uiType =
                    !sourceAttribute.retractBlocked &&
                        this.hasSourceAttributeConflicts(sourceAttribute)
                        ? Configurator.UiType.RADIOBUTTON
                        : Configurator.UiType.READ_ONLY;
                break;
            }
            case OccConfigurator.UiType.CHECK_BOX_LIST: {
                uiType = Configurator.UiType.CHECKBOXLIST;
                break;
            }
            case OccConfigurator.UiType.CHECK_BOX: {
                uiType = Configurator.UiType.CHECKBOX;
                break;
            }
            case OccConfigurator.UiType.MULTI_SELECTION_IMAGE: {
                uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
                break;
            }
            case OccConfigurator.UiType.SINGLE_SELECTION_IMAGE: {
                uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
                break;
            }
            default: {
                uiType = Configurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    convertGroupType(groupType) {
        switch (groupType) {
            case OccConfigurator.GroupType.CSTIC_GROUP:
                return Configurator.GroupType.ATTRIBUTE_GROUP;
            case OccConfigurator.GroupType.INSTANCE:
                return Configurator.GroupType.SUB_ITEM_GROUP;
            case OccConfigurator.GroupType.CONFLICT_HEADER:
                return Configurator.GroupType.CONFLICT_HEADER_GROUP;
            case OccConfigurator.GroupType.CONFLICT:
                return Configurator.GroupType.CONFLICT_GROUP;
        }
    }
    setGroupDescription(group) {
        switch (group.groupType) {
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                this.translation
                    .translate('configurator.group.conflictHeader')
                    .pipe(take(1))
                    .subscribe((conflictHeaderText) => (group.description = conflictHeaderText));
                break;
            case Configurator.GroupType.CONFLICT_GROUP:
                const conflictDescription = group.description;
                this.translation
                    .translate('configurator.group.conflictGroup', {
                    attribute: group.name,
                })
                    .pipe(take(1))
                    .subscribe((conflictGroupText) => (group.description = conflictGroupText));
                group.name = conflictDescription;
                break;
            default:
                if (group.name !== '_GEN') {
                    return;
                }
                this.translation
                    .translate('configurator.group.general')
                    .pipe(take(1))
                    .subscribe((generalText) => (group.description = generalText));
        }
    }
    convertImageType(imageType) {
        switch (imageType) {
            case OccConfigurator.ImageType.GALLERY:
                return Configurator.ImageType.GALLERY;
            case OccConfigurator.ImageType.PRIMARY:
                return Configurator.ImageType.PRIMARY;
        }
    }
    convertImageFormatType(formatType) {
        switch (formatType) {
            case OccConfigurator.ImageFormatType.VALUE_IMAGE:
                return Configurator.ImageFormatType.VALUE_IMAGE;
            case OccConfigurator.ImageFormatType.CSTIC_IMAGE:
                return Configurator.ImageFormatType.ATTRIBUTE_IMAGE;
        }
    }
    compileAttributeIncomplete(attribute) {
        //Default value for incomplete is false
        attribute.incomplete = false;
        switch (attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN: {
                if (!attribute.selectedSingleValue ||
                    attribute.selectedSingleValue ===
                        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                if (!attribute.selectedSingleValue) {
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
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                const isOneValueSelected = attribute.values?.find((value) => value.selected) !== undefined;
                attribute.incomplete = !isOneValueSelected;
                break;
            }
        }
    }
}
OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantNormalizer, deps: [{ token: i1.OccConfig }, { token: i1.TranslationService }, { token: i2.ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i1.TranslationService }, { type: i2.ConfiguratorUISettingsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7Ozs7QUFHeEUsTUFBTSxPQUFPLGdDQUFnQztJQU0zQyxZQUNZLE1BQWlCLEVBQ2pCLFdBQStCLEVBQy9CLGdCQUE4QztRQUY5QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQThCO0lBQ3ZELENBQUM7SUFFSixPQUFPLENBQ0wsTUFBcUMsRUFDckMsTUFBbUM7UUFFbkMsTUFBTSxZQUFZLEdBQStCO1lBQy9DLEdBQUcsTUFBTTtZQUNULEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxJQUFJLHNCQUFzQixDQUFDLGtCQUFrQixFQUFFO1lBQ25FLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsSUFBSSxFQUFFO1lBQ2hELFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFV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Q0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2pDLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7b0JBQ3hCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUM3QjtnQkFDRCxNQUFNO2FBQ1A7WUFFRCxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1lBQ3RDLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbEMsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQzlDLE1BQU0sa0JBQWtCLEdBQ3RCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxDQUFDO2dCQUNsRSxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsa0JBQWtCLENBQUM7Z0JBQzNDLE1BQU07YUFDUDtTQUNGO0lBQ0gsQ0FBQzs7QUFsY2UsbURBQWtCLEdBQUcsMEJBQTBCLENBQUM7NkhBSnJELGdDQUFnQztpSUFBaEMsZ0NBQWdDLGNBRG5CLE1BQU07MkZBQ25CLGdDQUFnQztrQkFENUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIsIE9jY0NvbmZpZywgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck1vZGVsVXRpbHMgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVUlTZXR0aW5nc0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29uZmlnL2NvbmZpZ3VyYXRvci11aS1zZXR0aW5ncy5jb25maWcnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vdmFyaWFudC1jb25maWd1cmF0b3Itb2NjLm1vZGVscyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPY2NDb25maWd1cmF0b3JWYXJpYW50Tm9ybWFsaXplclxuICBpbXBsZW1lbnRzXG4gICAgQ29udmVydGVyPE9jY0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uLCBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj5cbntcbiAgc3RhdGljIHJlYWRvbmx5IFJFVFJBQ1RfVkFMVUVfQ09ERSA9ICcjIyNSRVRSQUNUX1ZBTFVFX0NPREUjIyMnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IE9jY0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdWlTZXR0aW5nc0NvbmZpZzogQ29uZmlndXJhdG9yVUlTZXR0aW5nc0NvbmZpZ1xuICApIHt9XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jY0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uLFxuICAgIHRhcmdldD86IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uIHtcbiAgICBjb25zdCByZXN1bHRUYXJnZXQ6IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgb3duZXI6IHRhcmdldD8ub3duZXIgPz8gQ29uZmlndXJhdG9yTW9kZWxVdGlscy5jcmVhdGVJbml0aWFsT3duZXIoKSxcbiAgICAgIGludGVyYWN0aW9uU3RhdGU6IHRhcmdldD8uaW50ZXJhY3Rpb25TdGF0ZSA/PyB7fSxcbiAgICAgIGNvbmZpZ0lkOiBzb3VyY2UuY29uZmlnSWQsXG4gICAgICBjb21wbGV0ZTogc291cmNlLmNvbXBsZXRlLFxuICAgICAgY29uc2lzdGVudDogc291cmNlLmNvbnNpc3RlbnQsXG4gICAgICB0b3RhbE51bWJlck9mSXNzdWVzOiBzb3VyY2UudG90YWxOdW1iZXJPZklzc3VlcyxcbiAgICAgIHByb2R1Y3RDb2RlOiBzb3VyY2Uucm9vdFByb2R1Y3QsXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgZmxhdEdyb3VwczogW10sXG4gICAgfTtcbiAgICBjb25zdCBmbGF0R3JvdXBzOiBDb25maWd1cmF0b3IuR3JvdXBbXSA9IFtdO1xuICAgIHNvdXJjZS5ncm91cHM/LmZvckVhY2goKGdyb3VwKSA9PlxuICAgICAgdGhpcy5jb252ZXJ0R3JvdXAoZ3JvdXAsIHJlc3VsdFRhcmdldC5ncm91cHMsIGZsYXRHcm91cHMpXG4gICAgKTtcbiAgICByZXN1bHRUYXJnZXQuZmxhdEdyb3VwcyA9IGZsYXRHcm91cHM7XG5cbiAgICByZXR1cm4gcmVzdWx0VGFyZ2V0O1xuICB9XG5cbiAgY29udmVydEdyb3VwKFxuICAgIHNvdXJjZTogT2NjQ29uZmlndXJhdG9yLkdyb3VwLFxuICAgIGdyb3VwTGlzdDogQ29uZmlndXJhdG9yLkdyb3VwW10sXG4gICAgZmxhdEdyb3VwTGlzdDogQ29uZmlndXJhdG9yLkdyb3VwW11cbiAgKSB7XG4gICAgY29uc3QgYXR0cmlidXRlczogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVtdID0gW107XG4gICAgaWYgKHNvdXJjZS5hdHRyaWJ1dGVzKSB7XG4gICAgICBzb3VyY2UuYXR0cmlidXRlcy5mb3JFYWNoKChzb3VyY2VBdHRyaWJ1dGUpID0+XG4gICAgICAgIHRoaXMuY29udmVydEF0dHJpYnV0ZShzb3VyY2VBdHRyaWJ1dGUsIGF0dHJpYnV0ZXMpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAgPSB7XG4gICAgICBkZXNjcmlwdGlvbjogc291cmNlLmRlc2NyaXB0aW9uLFxuICAgICAgY29uZmlndXJhYmxlOiBzb3VyY2UuY29uZmlndXJhYmxlLFxuICAgICAgY29tcGxldGU6IHNvdXJjZS5jb21wbGV0ZSxcbiAgICAgIGNvbnNpc3RlbnQ6IHNvdXJjZS5jb25zaXN0ZW50LFxuICAgICAgZ3JvdXBUeXBlOiB0aGlzLmNvbnZlcnRHcm91cFR5cGUoc291cmNlLmdyb3VwVHlwZSksXG4gICAgICBuYW1lOiBzb3VyY2UubmFtZSxcbiAgICAgIGlkOiBzb3VyY2UuaWQsXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgc3ViR3JvdXBzOiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRHcm91cERlc2NyaXB0aW9uKGdyb3VwKTtcblxuICAgIGlmIChzb3VyY2Uuc3ViR3JvdXBzKSB7XG4gICAgICBzb3VyY2Uuc3ViR3JvdXBzLmZvckVhY2goKHNvdXJjZVN1Ykdyb3VwKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRHcm91cChzb3VyY2VTdWJHcm91cCwgZ3JvdXAuc3ViR3JvdXBzLCBmbGF0R3JvdXBMaXN0KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBncm91cC5ncm91cFR5cGUgPT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQIHx8XG4gICAgICBncm91cC5ncm91cFR5cGUgPT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVBcbiAgICApIHtcbiAgICAgIGZsYXRHcm91cExpc3QucHVzaChncm91cCk7XG4gICAgfVxuXG4gICAgZ3JvdXBMaXN0LnB1c2goZ3JvdXApO1xuICB9XG5cbiAgZ2V0R3JvdXBJZChrZXk6IHN0cmluZywgbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4ga2V5LnJlcGxhY2UoJ0AnICsgbmFtZSwgJycpO1xuICB9XG5cbiAgY29udmVydEF0dHJpYnV0ZShcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IE9jY0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGUsXG4gICAgYXR0cmlidXRlTGlzdDogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVtdXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG51bWJlck9mQ29uZmxpY3RzID0gc291cmNlQXR0cmlidXRlLmNvbmZsaWN0c1xuICAgICAgPyBzb3VyY2VBdHRyaWJ1dGUuY29uZmxpY3RzLmxlbmd0aFxuICAgICAgOiAwO1xuXG4gICAgY29uc3QgYXR0cmlidXRlSW1hZ2VzOiBDb25maWd1cmF0b3IuSW1hZ2VbXSA9IFtdO1xuICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW10gPSBbXTtcblxuICAgIGlmIChzb3VyY2VBdHRyaWJ1dGUuaW1hZ2VzKSB7XG4gICAgICBzb3VyY2VBdHRyaWJ1dGUuaW1hZ2VzLmZvckVhY2goKG9jY0ltYWdlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRJbWFnZShvY2NJbWFnZSwgYXR0cmlidXRlSW1hZ2VzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZFJldHJhY3RWYWx1ZShzb3VyY2VBdHRyaWJ1dGUsIGF0dHJpYnV0ZVZhbHVlcyk7XG5cbiAgICBpZiAoc291cmNlQXR0cmlidXRlLmRvbWFpblZhbHVlcykge1xuICAgICAgc291cmNlQXR0cmlidXRlLmRvbWFpblZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT5cbiAgICAgICAgdGhpcy5jb252ZXJ0VmFsdWUodmFsdWUsIGF0dHJpYnV0ZVZhbHVlcylcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHVpVHlwZSA9IHRoaXMuY29udmVydEF0dHJpYnV0ZVR5cGUoc291cmNlQXR0cmlidXRlKTtcbiAgICBjb25zdCBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUgPSB7XG4gICAgICBuYW1lOiBzb3VyY2VBdHRyaWJ1dGUubmFtZSxcbiAgICAgIGxhYmVsOiBzb3VyY2VBdHRyaWJ1dGUubGFuZ0RlcE5hbWUsXG4gICAgICByZXF1aXJlZDogc291cmNlQXR0cmlidXRlLnJlcXVpcmVkLFxuICAgICAgdWlUeXBlOiB1aVR5cGUsXG4gICAgICBncm91cElkOiB0aGlzLmdldEdyb3VwSWQoc291cmNlQXR0cmlidXRlLmtleSwgc291cmNlQXR0cmlidXRlLm5hbWUpLFxuICAgICAgdXNlcklucHV0OlxuICAgICAgICB1aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuTlVNRVJJQyB8fFxuICAgICAgICB1aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuU1RSSU5HXG4gICAgICAgICAgPyBzb3VyY2VBdHRyaWJ1dGUuZm9ybWF0dGVkVmFsdWVcbiAgICAgICAgICAgID8gc291cmNlQXR0cmlidXRlLmZvcm1hdHRlZFZhbHVlXG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICBtYXhsZW5ndGg6XG4gICAgICAgIChzb3VyY2VBdHRyaWJ1dGUubWF4bGVuZ3RoID8/IDApICtcbiAgICAgICAgKHNvdXJjZUF0dHJpYnV0ZS5uZWdhdGl2ZUFsbG93ZWQgPyAxIDogMCksXG4gICAgICBudW1EZWNpbWFsUGxhY2VzOiBzb3VyY2VBdHRyaWJ1dGUubnVtYmVyU2NhbGUsXG4gICAgICBuZWdhdGl2ZUFsbG93ZWQ6IHNvdXJjZUF0dHJpYnV0ZS5uZWdhdGl2ZUFsbG93ZWQsXG4gICAgICBudW1Ub3RhbExlbmd0aDogc291cmNlQXR0cmlidXRlLnR5cGVMZW5ndGgsXG4gICAgICBzZWxlY3RlZFNpbmdsZVZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBoYXNDb25mbGljdHM6IG51bWJlck9mQ29uZmxpY3RzID4gMCxcbiAgICAgIGltYWdlczogYXR0cmlidXRlSW1hZ2VzLFxuICAgICAgdmFsdWVzOiBhdHRyaWJ1dGVWYWx1ZXMsXG4gICAgICBpbnRlcnZhbEluRG9tYWluOiBzb3VyY2VBdHRyaWJ1dGUuaW50ZXJ2YWxJbkRvbWFpbixcbiAgICAgIGtleTogc291cmNlQXR0cmlidXRlLmtleSxcbiAgICAgIHZhbGlkYXRpb25UeXBlOiBzb3VyY2VBdHRyaWJ1dGUudmFsaWRhdGlvblR5cGUsXG4gICAgfTtcblxuICAgIHRoaXMuc2V0U2VsZWN0ZWRTaW5nbGVWYWx1ZShhdHRyaWJ1dGUpO1xuXG4gICAgLy9IYXMgdG8gYmUgY2FsbGVkIGFmdGVyIHNldFNlbGVjdGVkU2luZ2xlVmFsdWUgYmVjYXVzZSBpdCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiB0aGlzIHByb3BlcnR5XG4gICAgdGhpcy5jb21waWxlQXR0cmlidXRlSW5jb21wbGV0ZShhdHRyaWJ1dGUpO1xuICAgIGF0dHJpYnV0ZUxpc3QucHVzaChhdHRyaWJ1dGUpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRTaW5nbGVWYWx1ZShhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUpIHtcbiAgICBpZiAoYXR0cmlidXRlLnZhbHVlcykge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSBhdHRyaWJ1dGUudmFsdWVzXG4gICAgICAgIC5tYXAoKGVudHJ5KSA9PiBlbnRyeSlcbiAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LnNlbGVjdGVkKTtcbiAgICAgIGlmIChzZWxlY3RlZFZhbHVlcyAmJiBzZWxlY3RlZFZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWUgPSBzZWxlY3RlZFZhbHVlc1swXS52YWx1ZUNvZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGlzUmV0cmFjdFZhbHVlU2VsZWN0ZWQoXG4gICAgc291cmNlQXR0cmlidXRlOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzb3VyY2VBdHRyaWJ1dGUuZG9tYWluVmFsdWVzICYmXG4gICAgICBzb3VyY2VBdHRyaWJ1dGUuZG9tYWluVmFsdWVzLmZpbHRlcigodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKS5sZW5ndGhcbiAgICAgID8gZmFsc2VcbiAgICAgIDogdHJ1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRSZXRyYWN0VmFsdWVEaXNwbGF5KFxuICAgIGF0dHJpYnV0ZVR5cGU6IENvbmZpZ3VyYXRvci5VaVR5cGUsXG4gICAgdmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZVxuICApIHtcbiAgICBpZiAoXG4gICAgICBhdHRyaWJ1dGVUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOIHx8XG4gICAgICBhdHRyaWJ1dGVUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OXG4gICAgKSB7XG4gICAgICBpZiAoYXR0cmlidXRlVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTiAmJiB2YWx1ZS5zZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5kcm9wRG93blNlbGVjdE1zZycpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodmFsdWUudmFsdWVEaXNwbGF5ID0gdGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUubm9PcHRpb25TZWxlY3RlZE1zZycpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodmFsdWUudmFsdWVEaXNwbGF5ID0gdGV4dCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNTb3VyY2VBdHRyaWJ1dGVDb25mbGljdHMoXG4gICAgc291cmNlQXR0cmlidXRlOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzb3VyY2VBdHRyaWJ1dGUuY29uZmxpY3RzXG4gICAgICA/IHNvdXJjZUF0dHJpYnV0ZS5jb25mbGljdHMubGVuZ3RoID4gMFxuICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1NvdXJjZUF0dHJpYnV0ZVR5cGVSZWFkT25seShcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IE9jY0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNvdXJjZUF0dHJpYnV0ZS50eXBlID09PSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLlJFQURfT05MWTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1JldHJhY3RCbG9ja2VkKFxuICAgIHNvdXJjZUF0dHJpYnV0ZTogT2NjQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gc291cmNlQXR0cmlidXRlLnJldHJhY3RCbG9ja2VkXG4gICAgICA/IHNvdXJjZUF0dHJpYnV0ZS5yZXRyYWN0QmxvY2tlZFxuICAgICAgOiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRSZXRyYWN0VmFsdWUoXG4gICAgc291cmNlQXR0cmlidXRlOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIHZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW11cbiAgKSB7XG4gICAgY29uc3QgaXNSZXRyYWN0QmxvY2tlZCA9IHRoaXMuaXNSZXRyYWN0QmxvY2tlZChzb3VyY2VBdHRyaWJ1dGUpO1xuICAgIGNvbnN0IGlzQ29uZmxpY3RpbmcgPSB0aGlzLmhhc1NvdXJjZUF0dHJpYnV0ZUNvbmZsaWN0cyhzb3VyY2VBdHRyaWJ1dGUpO1xuXG4gICAgaWYgKCFpc1JldHJhY3RCbG9ja2VkKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudWlTZXR0aW5nc0NvbmZpZz8ucHJvZHVjdENvbmZpZ3VyYXRvcj8uYWRkUmV0cmFjdE9wdGlvbiB8fFxuICAgICAgICAodGhpcy5pc1NvdXJjZUF0dHJpYnV0ZVR5cGVSZWFkT25seShzb3VyY2VBdHRyaWJ1dGUpICYmIGlzQ29uZmxpY3RpbmcpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVHlwZSA9IHRoaXMuY29udmVydEF0dHJpYnV0ZVR5cGUoc291cmNlQXR0cmlidXRlKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGF0dHJpYnV0ZVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT04gfHxcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWUgPSB7XG4gICAgICAgICAgICB2YWx1ZUNvZGU6IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnROb3JtYWxpemVyLlJFVFJBQ1RfVkFMVUVfQ09ERSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLmlzUmV0cmFjdFZhbHVlU2VsZWN0ZWQoc291cmNlQXR0cmlidXRlKSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5zZXRSZXRyYWN0VmFsdWVEaXNwbGF5KGF0dHJpYnV0ZVR5cGUsIHZhbHVlKTtcblxuICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRWYWx1ZShcbiAgICBvY2NWYWx1ZTogT2NjQ29uZmlndXJhdG9yLlZhbHVlLFxuICAgIHZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW11cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWVJbWFnZXM6IENvbmZpZ3VyYXRvci5JbWFnZVtdID0gW107XG4gICAgaWYgKG9jY1ZhbHVlLmltYWdlcykge1xuICAgICAgb2NjVmFsdWUuaW1hZ2VzLmZvckVhY2goKG9jY0ltYWdlKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRJbWFnZShvY2NJbWFnZSwgdmFsdWVJbWFnZXMpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlOiBDb25maWd1cmF0b3IuVmFsdWUgPSB7XG4gICAgICB2YWx1ZUNvZGU6IG9jY1ZhbHVlLmtleSxcbiAgICAgIHZhbHVlRGlzcGxheTogb2NjVmFsdWUubGFuZ0RlcE5hbWUsXG4gICAgICBuYW1lOiBvY2NWYWx1ZS5uYW1lLFxuICAgICAgc2VsZWN0ZWQ6IG9jY1ZhbHVlLnNlbGVjdGVkLFxuICAgICAgaW1hZ2VzOiB2YWx1ZUltYWdlcyxcbiAgICB9O1xuXG4gICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICB9XG5cbiAgY29udmVydEltYWdlKFxuICAgIG9jY0ltYWdlOiBPY2NDb25maWd1cmF0b3IuSW1hZ2UsXG4gICAgaW1hZ2VzOiBDb25maWd1cmF0b3IuSW1hZ2VbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBpbWFnZTogQ29uZmlndXJhdG9yLkltYWdlID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUcmFkaXRpb25hbGx5LCBpbiBhbiBvbi1wcmVtIHdvcmxkLCBtZWRpYXMgYW5kIG90aGVyIGJhY2tlbmQgcmVsYXRlZCBjYWxsc1xuICAgICAgICogYXJlIGhvc3RlZCBhdCB0aGUgc2FtZSBwbGF0Zm9ybSwgYnV0IGluIGEgY2xvdWQgc2V0dXAsIGFwcGxpY2F0aW9ucyBhcmVcbiAgICAgICAqIHR5cGljYWxseSBkaXN0cmlidXRlZCBjcm9zcyBkaWZmZXJlbnQgZW52aXJvbm1lbnRzLiBGb3IgbWVkaWEsIHdlIHVzZSB0aGVcbiAgICAgICAqIGBiYWNrZW5kLm1lZGlhLmJhc2VVcmxgIGJ5IGRlZmF1bHQsIGJ1dCBmYWxsYmFjayB0byBgYmFja2VuZC5vY2MuYmFzZVVybGBcbiAgICAgICAqIGlmIG5vbmUgcHJvdmlkZWQuXG4gICAgICAgKi9cbiAgICAgIHVybDpcbiAgICAgICAgKHRoaXMuY29uZmlnPy5iYWNrZW5kPy5tZWRpYT8uYmFzZVVybCB8fFxuICAgICAgICAgIHRoaXMuY29uZmlnPy5iYWNrZW5kPy5vY2M/LmJhc2VVcmwgfHxcbiAgICAgICAgICAnJykgKyBvY2NJbWFnZS51cmwsXG4gICAgICBhbHRUZXh0OiBvY2NJbWFnZS5hbHRUZXh0LFxuICAgICAgZ2FsbGVyeUluZGV4OiBvY2NJbWFnZS5nYWxsZXJ5SW5kZXgsXG4gICAgICB0eXBlOiB0aGlzLmNvbnZlcnRJbWFnZVR5cGUob2NjSW1hZ2UuaW1hZ2VUeXBlKSxcbiAgICAgIGZvcm1hdDogdGhpcy5jb252ZXJ0SW1hZ2VGb3JtYXRUeXBlKG9jY0ltYWdlLmZvcm1hdCksXG4gICAgfTtcbiAgICBpbWFnZXMucHVzaChpbWFnZSk7XG4gIH1cblxuICBjb252ZXJ0QXR0cmlidXRlVHlwZShcbiAgICBzb3VyY2VBdHRyaWJ1dGU6IE9jY0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogQ29uZmlndXJhdG9yLlVpVHlwZSB7XG4gICAgbGV0IHVpVHlwZTogQ29uZmlndXJhdG9yLlVpVHlwZTtcbiAgICBzd2l0Y2ggKHNvdXJjZUF0dHJpYnV0ZS50eXBlKSB7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9fQlVUVE9OOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT047XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPX0JVVFRPTl9BRERJVElPTkFMX0lOUFVUOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05fQURESVRJT05BTF9JTlBVVDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV046IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fQURESVRJT05BTF9JTlBVVDoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX0FERElUSU9OQUxfSU5QVVQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLlNUUklORzoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLlNUUklORztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuTlVNRVJJQzoge1xuICAgICAgICB1aVR5cGUgPSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLlJFQURfT05MWToge1xuICAgICAgICB1aVR5cGUgPVxuICAgICAgICAgICFzb3VyY2VBdHRyaWJ1dGUucmV0cmFjdEJsb2NrZWQgJiZcbiAgICAgICAgICB0aGlzLmhhc1NvdXJjZUF0dHJpYnV0ZUNvbmZsaWN0cyhzb3VyY2VBdHRyaWJ1dGUpXG4gICAgICAgICAgICA/IENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05cbiAgICAgICAgICAgIDogQ29uZmlndXJhdG9yLlVpVHlwZS5SRUFEX09OTFk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLX0JPWF9MSVNUOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS19CT1g6IHtcbiAgICAgICAgdWlUeXBlID0gQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuTVVMVElfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuTVVMVElfU0VMRUNUSU9OX0lNQUdFO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5TSU5HTEVfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuU0lOR0xFX1NFTEVDVElPTl9JTUFHRTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHVpVHlwZSA9IENvbmZpZ3VyYXRvci5VaVR5cGUuTk9UX0lNUExFTUVOVEVEO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdWlUeXBlO1xuICB9XG5cbiAgY29udmVydEdyb3VwVHlwZShcbiAgICBncm91cFR5cGU6IE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGVcbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwVHlwZSB7XG4gICAgc3dpdGNoIChncm91cFR5cGUpIHtcbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DU1RJQ19HUk9VUDpcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQO1xuICAgICAgY2FzZSBPY2NDb25maWd1cmF0b3IuR3JvdXBUeXBlLklOU1RBTkNFOlxuICAgICAgICByZXR1cm4gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5TVUJfSVRFTV9HUk9VUDtcbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVI6XG4gICAgICAgIHJldHVybiBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUDtcbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVDpcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVA7XG4gICAgfVxuICB9XG5cbiAgc2V0R3JvdXBEZXNjcmlwdGlvbihncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogdm9pZCB7XG4gICAgc3dpdGNoIChncm91cC5ncm91cFR5cGUpIHtcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVJfR1JPVVA6XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25cbiAgICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuZ3JvdXAuY29uZmxpY3RIZWFkZXInKVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChjb25mbGljdEhlYWRlclRleHQpID0+IChncm91cC5kZXNjcmlwdGlvbiA9IGNvbmZsaWN0SGVhZGVyVGV4dClcbiAgICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9HUk9VUDpcbiAgICAgICAgY29uc3QgY29uZmxpY3REZXNjcmlwdGlvbiA9IGdyb3VwLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmdyb3VwLmNvbmZsaWN0R3JvdXAnLCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGU6IGdyb3VwLm5hbWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoY29uZmxpY3RHcm91cFRleHQpID0+IChncm91cC5kZXNjcmlwdGlvbiA9IGNvbmZsaWN0R3JvdXBUZXh0KVxuICAgICAgICAgICk7XG4gICAgICAgIGdyb3VwLm5hbWUgPSBjb25mbGljdERlc2NyaXB0aW9uO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChncm91cC5uYW1lICE9PSAnX0dFTicpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAgIC50cmFuc2xhdGUoJ2NvbmZpZ3VyYXRvci5ncm91cC5nZW5lcmFsJylcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGdlbmVyYWxUZXh0KSA9PiAoZ3JvdXAuZGVzY3JpcHRpb24gPSBnZW5lcmFsVGV4dCkpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRJbWFnZVR5cGUoXG4gICAgaW1hZ2VUeXBlOiBPY2NDb25maWd1cmF0b3IuSW1hZ2VUeXBlXG4gICk6IENvbmZpZ3VyYXRvci5JbWFnZVR5cGUge1xuICAgIHN3aXRjaCAoaW1hZ2VUeXBlKSB7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5JbWFnZVR5cGUuR0FMTEVSWTpcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5JbWFnZVR5cGUuR0FMTEVSWTtcbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLkltYWdlVHlwZS5QUklNQVJZOlxuICAgICAgICByZXR1cm4gQ29uZmlndXJhdG9yLkltYWdlVHlwZS5QUklNQVJZO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRJbWFnZUZvcm1hdFR5cGUoXG4gICAgZm9ybWF0VHlwZTogT2NjQ29uZmlndXJhdG9yLkltYWdlRm9ybWF0VHlwZVxuICApOiBDb25maWd1cmF0b3IuSW1hZ2VGb3JtYXRUeXBlIHtcbiAgICBzd2l0Y2ggKGZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgT2NjQ29uZmlndXJhdG9yLkltYWdlRm9ybWF0VHlwZS5WQUxVRV9JTUFHRTpcbiAgICAgICAgcmV0dXJuIENvbmZpZ3VyYXRvci5JbWFnZUZvcm1hdFR5cGUuVkFMVUVfSU1BR0U7XG4gICAgICBjYXNlIE9jY0NvbmZpZ3VyYXRvci5JbWFnZUZvcm1hdFR5cGUuQ1NUSUNfSU1BR0U6XG4gICAgICAgIHJldHVybiBDb25maWd1cmF0b3IuSW1hZ2VGb3JtYXRUeXBlLkFUVFJJQlVURV9JTUFHRTtcbiAgICB9XG4gIH1cblxuICBjb21waWxlQXR0cmlidXRlSW5jb21wbGV0ZShhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUpIHtcbiAgICAvL0RlZmF1bHQgdmFsdWUgZm9yIGluY29tcGxldGUgaXMgZmFsc2VcbiAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgc3dpdGNoIChhdHRyaWJ1dGUudWlUeXBlKSB7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT046XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05fQURESVRJT05BTF9JTlBVVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9BRERJVElPTkFMX0lOUFVUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOOiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWUgfHxcbiAgICAgICAgICBhdHRyaWJ1dGUuc2VsZWN0ZWRTaW5nbGVWYWx1ZSA9PT1cbiAgICAgICAgICAgIE9jY0NvbmZpZ3VyYXRvclZhcmlhbnROb3JtYWxpemVyLlJFVFJBQ1RfVkFMVUVfQ09ERVxuICAgICAgICApIHtcbiAgICAgICAgICBhdHRyaWJ1dGUuaW5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuU0lOR0xFX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZS5zZWxlY3RlZFNpbmdsZVZhbHVlKSB7XG4gICAgICAgICAgYXR0cmlidXRlLmluY29tcGxldGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUM6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuU1RSSU5HOiB7XG4gICAgICAgIGlmICghYXR0cmlidXRlLnVzZXJJbnB1dCkge1xuICAgICAgICAgIGF0dHJpYnV0ZS5pbmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YTElTVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5NVUxUSV9TRUxFQ1RJT05fSU1BR0U6IHtcbiAgICAgICAgY29uc3QgaXNPbmVWYWx1ZVNlbGVjdGVkID1cbiAgICAgICAgICBhdHRyaWJ1dGUudmFsdWVzPy5maW5kKCh2YWx1ZSkgPT4gdmFsdWUuc2VsZWN0ZWQpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGF0dHJpYnV0ZS5pbmNvbXBsZXRlID0gIWlzT25lVmFsdWVTZWxlY3RlZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=