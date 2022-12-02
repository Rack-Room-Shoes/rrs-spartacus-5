/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CpqConfiguratorUtils } from './../cpq-configurator-utils';
import * as i0 from "@angular/core";
export class CpqConfiguratorValueSerializer {
    convert(source) {
        const attribute = CpqConfiguratorUtils.findFirstChangedAttribute(source);
        const updateValue = this.convertAttribute(attribute, source.configId);
        return updateValue;
    }
    convertAttribute(attribute, configurationId) {
        const updateInfo = CpqConfiguratorUtils.getUpdateInformation(attribute);
        const value = this.findFirstChangedValue(attribute);
        const updateAttribute = {
            configurationId: configurationId,
            standardAttributeCode: updateInfo.standardAttributeCode,
            attributeValueId: value.valueCode,
            quantity: value.quantity ?? 1,
            tabId: updateInfo.tabId,
        };
        return updateAttribute;
    }
    findFirstChangedValue(attribute) {
        if (attribute.values && attribute.values.length > 0) {
            return attribute.values[0];
        }
        else {
            throw new Error('No values present');
        }
    }
}
CpqConfiguratorValueSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorValueSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorValueSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorValueSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorValueSerializer, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci12YWx1ZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvcmVzdC9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3ItdmFsdWUtc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFHbkUsTUFBTSxPQUFPLDhCQUE4QjtJQUd6QyxPQUFPLENBQUMsTUFBa0M7UUFDeEMsTUFBTSxTQUFTLEdBQ2Isb0JBQW9CLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsTUFBTSxXQUFXLEdBQW9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FDeEQsU0FBUyxFQUNULE1BQU0sQ0FBQyxRQUFRLENBQ2hCLENBQUM7UUFDRixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRVMsZ0JBQWdCLENBQ3hCLFNBQWlDLEVBQ2pDLGVBQXVCO1FBRXZCLE1BQU0sVUFBVSxHQUFHLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxNQUFNLGVBQWUsR0FBb0I7WUFDdkMsZUFBZSxFQUFFLGVBQWU7WUFDaEMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLHFCQUFxQjtZQUN2RCxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsU0FBUztZQUNqQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDO1lBQzdCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztTQUN4QixDQUFDO1FBRUYsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVTLHFCQUFxQixDQUM3QixTQUFpQztRQUVqQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7MkhBdENVLDhCQUE4QjsrSEFBOUIsOEJBQThCOzJGQUE5Qiw4QkFBOEI7a0JBRDFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQnO1xuaW1wb3J0IHsgQ3BxIH0gZnJvbSAnLi4vY3BxLm1vZGVscyc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JVdGlscyB9IGZyb20gJy4vLi4vY3BxLWNvbmZpZ3VyYXRvci11dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JWYWx1ZVNlcmlhbGl6ZXJcbiAgaW1wbGVtZW50cyBDb252ZXJ0ZXI8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24sIENwcS5VcGRhdGVWYWx1ZT5cbntcbiAgY29udmVydChzb3VyY2U6IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uKTogQ3BxLlVwZGF0ZVZhbHVlIHtcbiAgICBjb25zdCBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUgPVxuICAgICAgQ3BxQ29uZmlndXJhdG9yVXRpbHMuZmluZEZpcnN0Q2hhbmdlZEF0dHJpYnV0ZShzb3VyY2UpO1xuICAgIGNvbnN0IHVwZGF0ZVZhbHVlOiBDcHEuVXBkYXRlVmFsdWUgPSB0aGlzLmNvbnZlcnRBdHRyaWJ1dGUoXG4gICAgICBhdHRyaWJ1dGUsXG4gICAgICBzb3VyY2UuY29uZmlnSWRcbiAgICApO1xuICAgIHJldHVybiB1cGRhdGVWYWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0QXR0cmlidXRlKFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICBjb25maWd1cmF0aW9uSWQ6IHN0cmluZ1xuICApOiBDcHEuVXBkYXRlVmFsdWUge1xuICAgIGNvbnN0IHVwZGF0ZUluZm8gPSBDcHFDb25maWd1cmF0b3JVdGlscy5nZXRVcGRhdGVJbmZvcm1hdGlvbihhdHRyaWJ1dGUpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5maW5kRmlyc3RDaGFuZ2VkVmFsdWUoYXR0cmlidXRlKTtcbiAgICBjb25zdCB1cGRhdGVBdHRyaWJ1dGU6IENwcS5VcGRhdGVWYWx1ZSA9IHtcbiAgICAgIGNvbmZpZ3VyYXRpb25JZDogY29uZmlndXJhdGlvbklkLFxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVDb2RlOiB1cGRhdGVJbmZvLnN0YW5kYXJkQXR0cmlidXRlQ29kZSxcbiAgICAgIGF0dHJpYnV0ZVZhbHVlSWQ6IHZhbHVlLnZhbHVlQ29kZSxcbiAgICAgIHF1YW50aXR5OiB2YWx1ZS5xdWFudGl0eSA/PyAxLFxuICAgICAgdGFiSWQ6IHVwZGF0ZUluZm8udGFiSWQsXG4gICAgfTtcblxuICAgIHJldHVybiB1cGRhdGVBdHRyaWJ1dGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZmluZEZpcnN0Q2hhbmdlZFZhbHVlKFxuICAgIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBDb25maWd1cmF0b3IuVmFsdWUge1xuICAgIGlmIChhdHRyaWJ1dGUudmFsdWVzICYmIGF0dHJpYnV0ZS52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGF0dHJpYnV0ZS52YWx1ZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gdmFsdWVzIHByZXNlbnQnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==