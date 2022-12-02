/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export class OccConfiguratorVariantSerializer {
    convert(source, target) {
        const resultGroups = [];
        source.groups.forEach((group) => this.convertGroup(group, resultGroups));
        const resultTarget = {
            ...target,
            configId: source.configId,
            rootProduct: source.productCode,
            complete: source.complete,
            groups: resultGroups,
        };
        return resultTarget;
    }
    convertGroup(source, occGroups) {
        const resultSubGroups = [];
        const resultAttributes = [];
        if (source.attributes) {
            source.attributes.forEach((attribute) => this.convertAttribute(attribute, resultAttributes));
        }
        if (source.subGroups) {
            source.subGroups.forEach((subGroup) => this.convertGroup(subGroup, resultSubGroups));
        }
        const group = {
            name: source.name,
            id: source.id,
            configurable: source.configurable,
            groupType: this.convertGroupType(source.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP),
            description: source.description,
            attributes: resultAttributes,
            subGroups: resultSubGroups,
        };
        occGroups.push(group);
    }
    isRetractValue(attribute) {
        return (attribute.selectedSingleValue ===
            OccConfiguratorVariantSerializer.RETRACT_VALUE_CODE);
    }
    getRetractedValue(attribute) {
        return attribute.values?.find((value) => value.selected)?.valueCode;
    }
    retractValue(attribute, targetAttribute) {
        if (!this.isRetractValue(attribute)) {
            targetAttribute.value = attribute.selectedSingleValue;
        }
        else {
            targetAttribute.value = this.getRetractedValue(attribute);
            targetAttribute.retractTriggered = true;
        }
    }
    convertAttribute(attribute, occAttributes) {
        const targetAttribute = {
            key: attribute.name,
            name: attribute.name,
            langDepName: attribute.label,
            required: attribute.required,
            retractTriggered: attribute.retractTriggered,
            type: this.convertCharacteristicType(attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED),
        };
        if (attribute.uiType === Configurator.UiType.DROPDOWN ||
            attribute.uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            attribute.uiType === Configurator.UiType.SINGLE_SELECTION_IMAGE) {
            this.retractValue(attribute, targetAttribute);
        }
        else if (attribute.uiType === Configurator.UiType.STRING) {
            targetAttribute.value = attribute.userInput;
        }
        else if (attribute.uiType === Configurator.UiType.NUMERIC) {
            targetAttribute.formattedValue = attribute.userInput;
        }
        else if (attribute.uiType === Configurator.UiType.CHECKBOXLIST ||
            attribute.uiType === Configurator.UiType.CHECKBOX ||
            attribute.uiType === Configurator.UiType.MULTI_SELECTION_IMAGE) {
            const domainValues = [];
            if (attribute.values) {
                attribute.values.forEach((value) => {
                    this.convertValue(value, domainValues);
                });
            }
            targetAttribute.domainValues = domainValues;
        }
        occAttributes.push(targetAttribute);
    }
    convertValue(value, values) {
        values.push({
            key: value.valueCode,
            langDepName: value.valueDisplay,
            name: value.name,
            selected: value.selected,
        });
    }
    convertCharacteristicType(type) {
        let uiType;
        switch (type) {
            case Configurator.UiType.RADIOBUTTON: {
                uiType = OccConfigurator.UiType.RADIO_BUTTON;
                break;
            }
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT: {
                uiType = OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT;
                break;
            }
            case Configurator.UiType.DROPDOWN: {
                uiType = OccConfigurator.UiType.DROPDOWN;
                break;
            }
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
                uiType = OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
                break;
            }
            case Configurator.UiType.STRING: {
                uiType = OccConfigurator.UiType.STRING;
                break;
            }
            case Configurator.UiType.NUMERIC: {
                uiType = OccConfigurator.UiType.NUMERIC;
                break;
            }
            case Configurator.UiType.CHECKBOX: {
                uiType = OccConfigurator.UiType.CHECK_BOX;
                break;
            }
            case Configurator.UiType.CHECKBOXLIST: {
                uiType = OccConfigurator.UiType.CHECK_BOX_LIST;
                break;
            }
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                uiType = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
                break;
            }
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                uiType = OccConfigurator.UiType.SINGLE_SELECTION_IMAGE;
                break;
            }
            default: {
                uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    convertGroupType(groupType) {
        switch (groupType) {
            case Configurator.GroupType.ATTRIBUTE_GROUP:
                return OccConfigurator.GroupType.CSTIC_GROUP;
            case Configurator.GroupType.SUB_ITEM_GROUP:
                return OccConfigurator.GroupType.INSTANCE;
            case Configurator.GroupType.CONFLICT_GROUP:
                return OccConfigurator.GroupType.CONFLICT;
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                return OccConfigurator.GroupType.CONFLICT_HEADER;
        }
    }
}
OccConfiguratorVariantSerializer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFHeEUsTUFBTSxPQUFPLGdDQUFnQztJQU0zQyxPQUFPLENBQ0wsTUFBa0MsRUFDbEMsTUFBc0M7UUFFdEMsTUFBTSxZQUFZLEdBQTRCLEVBQUUsQ0FBQztRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUV6RSxNQUFNLFlBQVksR0FBa0M7WUFDbEQsR0FBRyxNQUFNO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztZQUMvQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsTUFBTSxFQUFFLFlBQVk7U0FDckIsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBMEIsRUFBRSxTQUFrQztRQUN6RSxNQUFNLGVBQWUsR0FBNEIsRUFBRSxDQUFDO1FBQ3BELE1BQU0sZ0JBQWdCLEdBQWdDLEVBQUUsQ0FBQztRQUV6RCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVB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QUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQzlDLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO2dCQUN0RCxNQUFNO2FBQ1A7WUFDRCxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7Z0JBQ3ZELE1BQU07YUFDUDtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNQLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzthQUNqRDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGdCQUFnQixDQUNkLFNBQWlDO1FBRWpDLFFBQVEsU0FBUyxFQUFFO1lBQ2pCLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlO2dCQUN6QyxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1lBQy9DLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjO2dCQUN4QyxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzVDLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjO2dCQUN4QyxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQzVDLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7Z0JBQy9DLE9BQU8sZUFBZSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7U0FDcEQ7SUFDSCxDQUFDOztBQS9MZSxtREFBa0IsR0FBRywwQkFBMEIsQ0FBQzs2SEFKckQsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0MsY0FEbkIsTUFBTTsyRkFDbkIsZ0NBQWdDO2tCQUQ1QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3IgfSBmcm9tICcuLi92YXJpYW50LWNvbmZpZ3VyYXRvci1vY2MubW9kZWxzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRTZXJpYWxpemVyXG4gIGltcGxlbWVudHNcbiAgICBDb252ZXJ0ZXI8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24sIE9jY0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPlxue1xuICBzdGF0aWMgcmVhZG9ubHkgUkVUUkFDVF9WQUxVRV9DT0RFID0gJyMjI1JFVFJBQ1RfVkFMVUVfQ09ERSMjIyc7XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uLFxuICAgIHRhcmdldD86IE9jY0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IE9jY0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uIHtcbiAgICBjb25zdCByZXN1bHRHcm91cHM6IE9jY0NvbmZpZ3VyYXRvci5Hcm91cFtdID0gW107XG4gICAgc291cmNlLmdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4gdGhpcy5jb252ZXJ0R3JvdXAoZ3JvdXAsIHJlc3VsdEdyb3VwcykpO1xuXG4gICAgY29uc3QgcmVzdWx0VGFyZ2V0OiBPY2NDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIC4uLnRhcmdldCxcbiAgICAgIGNvbmZpZ0lkOiBzb3VyY2UuY29uZmlnSWQsXG4gICAgICByb290UHJvZHVjdDogc291cmNlLnByb2R1Y3RDb2RlLFxuICAgICAgY29tcGxldGU6IHNvdXJjZS5jb21wbGV0ZSxcbiAgICAgIGdyb3VwczogcmVzdWx0R3JvdXBzLFxuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0VGFyZ2V0O1xuICB9XG5cbiAgY29udmVydEdyb3VwKHNvdXJjZTogQ29uZmlndXJhdG9yLkdyb3VwLCBvY2NHcm91cHM6IE9jY0NvbmZpZ3VyYXRvci5Hcm91cFtdKSB7XG4gICAgY29uc3QgcmVzdWx0U3ViR3JvdXBzOiBPY2NDb25maWd1cmF0b3IuR3JvdXBbXSA9IFtdO1xuICAgIGNvbnN0IHJlc3VsdEF0dHJpYnV0ZXM6IE9jY0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGVbXSA9IFtdO1xuXG4gICAgaWYgKHNvdXJjZS5hdHRyaWJ1dGVzKSB7XG4gICAgICBzb3VyY2UuYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+XG4gICAgICAgIHRoaXMuY29udmVydEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHJlc3VsdEF0dHJpYnV0ZXMpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnN1Ykdyb3Vwcykge1xuICAgICAgc291cmNlLnN1Ykdyb3Vwcy5mb3JFYWNoKChzdWJHcm91cCkgPT5cbiAgICAgICAgdGhpcy5jb252ZXJ0R3JvdXAoc3ViR3JvdXAsIHJlc3VsdFN1Ykdyb3VwcylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXA6IE9jY0NvbmZpZ3VyYXRvci5Hcm91cCA9IHtcbiAgICAgIG5hbWU6IHNvdXJjZS5uYW1lLFxuICAgICAgaWQ6IHNvdXJjZS5pZCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogc291cmNlLmNvbmZpZ3VyYWJsZSxcbiAgICAgIGdyb3VwVHlwZTogdGhpcy5jb252ZXJ0R3JvdXBUeXBlKFxuICAgICAgICBzb3VyY2UuZ3JvdXBUeXBlID8/IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQXG4gICAgICApLFxuICAgICAgZGVzY3JpcHRpb246IHNvdXJjZS5kZXNjcmlwdGlvbixcbiAgICAgIGF0dHJpYnV0ZXM6IHJlc3VsdEF0dHJpYnV0ZXMsXG4gICAgICBzdWJHcm91cHM6IHJlc3VsdFN1Ykdyb3VwcyxcbiAgICB9O1xuXG4gICAgb2NjR3JvdXBzLnB1c2goZ3JvdXApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzUmV0cmFjdFZhbHVlKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBhdHRyaWJ1dGUuc2VsZWN0ZWRTaW5nbGVWYWx1ZSA9PT1cbiAgICAgIE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRTZXJpYWxpemVyLlJFVFJBQ1RfVkFMVUVfQ09ERVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UmV0cmFjdGVkVmFsdWUoXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZS52YWx1ZXM/LmZpbmQoKHZhbHVlKSA9PiB2YWx1ZS5zZWxlY3RlZCk/LnZhbHVlQ29kZTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXRyYWN0VmFsdWUoXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIHRhcmdldEF0dHJpYnV0ZTogT2NjQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApIHtcbiAgICBpZiAoIXRoaXMuaXNSZXRyYWN0VmFsdWUoYXR0cmlidXRlKSkge1xuICAgICAgdGFyZ2V0QXR0cmlidXRlLnZhbHVlID0gYXR0cmlidXRlLnNlbGVjdGVkU2luZ2xlVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldEF0dHJpYnV0ZS52YWx1ZSA9IHRoaXMuZ2V0UmV0cmFjdGVkVmFsdWUoYXR0cmlidXRlKTtcbiAgICAgIHRhcmdldEF0dHJpYnV0ZS5yZXRyYWN0VHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0QXR0cmlidXRlKFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICBvY2NBdHRyaWJ1dGVzOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlW11cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0QXR0cmlidXRlOiBPY2NDb25maWd1cmF0b3IuQXR0cmlidXRlID0ge1xuICAgICAga2V5OiBhdHRyaWJ1dGUubmFtZSxcbiAgICAgIG5hbWU6IGF0dHJpYnV0ZS5uYW1lLFxuICAgICAgbGFuZ0RlcE5hbWU6IGF0dHJpYnV0ZS5sYWJlbCxcbiAgICAgIHJlcXVpcmVkOiBhdHRyaWJ1dGUucmVxdWlyZWQsXG4gICAgICByZXRyYWN0VHJpZ2dlcmVkOiBhdHRyaWJ1dGUucmV0cmFjdFRyaWdnZXJlZCxcbiAgICAgIHR5cGU6IHRoaXMuY29udmVydENoYXJhY3RlcmlzdGljVHlwZShcbiAgICAgICAgYXR0cmlidXRlLnVpVHlwZSA/PyBDb25maWd1cmF0b3IuVWlUeXBlLk5PVF9JTVBMRU1FTlRFRFxuICAgICAgKSxcbiAgICB9O1xuXG4gICAgaWYgKFxuICAgICAgYXR0cmlidXRlLnVpVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTiB8fFxuICAgICAgYXR0cmlidXRlLnVpVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9BRERJVElPTkFMX0lOUFVUIHx8XG4gICAgICBhdHRyaWJ1dGUudWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OIHx8XG4gICAgICBhdHRyaWJ1dGUudWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX0FERElUSU9OQUxfSU5QVVQgfHxcbiAgICAgIGF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuU0lOR0xFX1NFTEVDVElPTl9JTUFHRVxuICAgICkge1xuICAgICAgdGhpcy5yZXRyYWN0VmFsdWUoYXR0cmlidXRlLCB0YXJnZXRBdHRyaWJ1dGUpO1xuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlLnVpVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkcpIHtcbiAgICAgIHRhcmdldEF0dHJpYnV0ZS52YWx1ZSA9IGF0dHJpYnV0ZS51c2VySW5wdXQ7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUudWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUMpIHtcbiAgICAgIHRhcmdldEF0dHJpYnV0ZS5mb3JtYXR0ZWRWYWx1ZSA9IGF0dHJpYnV0ZS51c2VySW5wdXQ7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGF0dHJpYnV0ZS51aVR5cGUgPT09IENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUIHx8XG4gICAgICBhdHRyaWJ1dGUudWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YIHx8XG4gICAgICBhdHRyaWJ1dGUudWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRVxuICAgICkge1xuICAgICAgY29uc3QgZG9tYWluVmFsdWVzOiBPY2NDb25maWd1cmF0b3IuVmFsdWVbXSA9IFtdO1xuICAgICAgaWYgKGF0dHJpYnV0ZS52YWx1ZXMpIHtcbiAgICAgICAgYXR0cmlidXRlLnZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuY29udmVydFZhbHVlKHZhbHVlLCBkb21haW5WYWx1ZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRhcmdldEF0dHJpYnV0ZS5kb21haW5WYWx1ZXMgPSBkb21haW5WYWx1ZXM7XG4gICAgfVxuXG4gICAgb2NjQXR0cmlidXRlcy5wdXNoKHRhcmdldEF0dHJpYnV0ZSk7XG4gIH1cblxuICBjb252ZXJ0VmFsdWUodmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZSwgdmFsdWVzOiBPY2NDb25maWd1cmF0b3IuVmFsdWVbXSkge1xuICAgIHZhbHVlcy5wdXNoKHtcbiAgICAgIGtleTogdmFsdWUudmFsdWVDb2RlLFxuICAgICAgbGFuZ0RlcE5hbWU6IHZhbHVlLnZhbHVlRGlzcGxheSxcbiAgICAgIG5hbWU6IHZhbHVlLm5hbWUsXG4gICAgICBzZWxlY3RlZDogdmFsdWUuc2VsZWN0ZWQsXG4gICAgfSk7XG4gIH1cblxuICBjb252ZXJ0Q2hhcmFjdGVyaXN0aWNUeXBlKHR5cGU6IENvbmZpZ3VyYXRvci5VaVR5cGUpOiBPY2NDb25maWd1cmF0b3IuVWlUeXBlIHtcbiAgICBsZXQgdWlUeXBlOiBPY2NDb25maWd1cmF0b3IuVWlUeXBlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OOiB7XG4gICAgICAgIHVpVHlwZSA9IE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9fQlVUVE9OO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTl9BRERJVElPTkFMX0lOUFVUOiB7XG4gICAgICAgIHVpVHlwZSA9IE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9fQlVUVE9OX0FERElUSU9OQUxfSU5QVVQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOOiB7XG4gICAgICAgIHVpVHlwZSA9IE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV047XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX0FERElUSU9OQUxfSU5QVVQ6IHtcbiAgICAgICAgdWlUeXBlID0gT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9BRERJVElPTkFMX0lOUFVUO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc6IHtcbiAgICAgICAgdWlUeXBlID0gT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUM6IHtcbiAgICAgICAgdWlUeXBlID0gT2NjQ29uZmlndXJhdG9yLlVpVHlwZS5OVU1FUklDO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5DSEVDS0JPWDoge1xuICAgICAgICB1aVR5cGUgPSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLX0JPWDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUOiB7XG4gICAgICAgIHVpVHlwZSA9IE9jY0NvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tfQk9YX0xJU1Q7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICB1aVR5cGUgPSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuU0lOR0xFX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICB1aVR5cGUgPSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLlNJTkdMRV9TRUxFQ1RJT05fSU1BR0U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB1aVR5cGUgPSBPY2NDb25maWd1cmF0b3IuVWlUeXBlLk5PVF9JTVBMRU1FTlRFRDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVpVHlwZTtcbiAgfVxuXG4gIGNvbnZlcnRHcm91cFR5cGUoXG4gICAgZ3JvdXBUeXBlOiBDb25maWd1cmF0b3IuR3JvdXBUeXBlXG4gICk6IE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGUge1xuICAgIHN3aXRjaCAoZ3JvdXBUeXBlKSB7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQOlxuICAgICAgICByZXR1cm4gT2NjQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DU1RJQ19HUk9VUDtcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5TVUJfSVRFTV9HUk9VUDpcbiAgICAgICAgcmV0dXJuIE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGUuSU5TVEFOQ0U7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVA6XG4gICAgICAgIHJldHVybiBPY2NDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUO1xuICAgICAgY2FzZSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUDpcbiAgICAgICAgcmV0dXJuIE9jY0NvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfSEVBREVSO1xuICAgIH1cbiAgfVxufVxuIl19