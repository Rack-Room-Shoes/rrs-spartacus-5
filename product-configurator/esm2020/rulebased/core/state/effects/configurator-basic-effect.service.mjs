/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
export class ConfiguratorBasicEffectService {
    /**
     * Finds first group with attributes for a configuration. Throws error if such a group does not exist,
     * as this is an illegal state
     * @param configuration
     * @returns Group id
     */
    getFirstGroupWithAttributes(configuration) {
        const id = this.getFirstGroupWithAttributesForList(configuration.groups);
        if (id) {
            return id;
        }
        else {
            throw new Error('Configuration does not have any attributes');
        }
    }
    /**
     * Finds first group with attributes in a list of groups
     * @param groups
     * @returns Group or undefined if such a group does not exist
     */
    getFirstGroupWithAttributesForList(groups) {
        const groupWithAttributes = groups
            .filter((currentGroup) => currentGroup.attributes && currentGroup.attributes.length > 0)
            .pop();
        let id;
        if (groupWithAttributes) {
            id = groupWithAttributes.id;
        }
        else {
            id = groups
                .filter((currentGroup) => currentGroup.subGroups && currentGroup.subGroups.length > 0)
                .flatMap((currentGroup) => this.getFirstGroupWithAttributesForList(currentGroup.subGroups))
                .filter((groupId) => groupId) //Filter undefined strings
                .pop();
        }
        return id;
    }
}
ConfiguratorBasicEffectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffectService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorBasicEffectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffectService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWJhc2ljLWVmZmVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL3N0YXRlL2VmZmVjdHMvY29uZmlndXJhdG9yLWJhc2ljLWVmZmVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQzs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDOzs7OztPQUtHO0lBQ0gsMkJBQTJCLENBQ3pCLGFBQXlDO1FBRXpDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsSUFBSSxFQUFFLEVBQUU7WUFDTixPQUFPLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDL0Q7SUFDSCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNPLGtDQUFrQyxDQUMxQyxNQUE0QjtRQUU1QixNQUFNLG1CQUFtQixHQUFtQyxNQUFNO2FBQy9ELE1BQU0sQ0FDTCxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ2YsWUFBWSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQ2hFO2FBQ0EsR0FBRyxFQUFFLENBQUM7UUFDVCxJQUFJLEVBQXNCLENBQUM7UUFDM0IsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixFQUFFLEdBQUcsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxFQUFFLEdBQUcsTUFBTTtpQkFDUixNQUFNLENBQ0wsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUNmLFlBQVksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUM5RDtpQkFDQSxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUN4QixJQUFJLENBQUMsa0NBQWtDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUNoRTtpQkFDQSxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLDBCQUEwQjtpQkFDdkQsR0FBRyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7MkhBL0NVLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRGpCLE1BQU07MkZBQ25CLDhCQUE4QjtrQkFEMUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG4vKipcbiAqIFNlcnZpY2UgdGhhdCBwcm92aWRlcyBoZWxwZXIgbWV0aG9kcyBmb3IgdGhlIGJhc2ljIGNvbmZpZ3VyYXRvciBlZmZlY3RzLFxuICogaW4gb3JkZXIgdG8gZW5oYW5jZSB0aGVtIHdpdGhvdXQgdGhlIG5lZWQgdG8gaW50cm9kdWNlIG5ldyBlZmZlY3RzXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQmFzaWNFZmZlY3RTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEZpbmRzIGZpcnN0IGdyb3VwIHdpdGggYXR0cmlidXRlcyBmb3IgYSBjb25maWd1cmF0aW9uLiBUaHJvd3MgZXJyb3IgaWYgc3VjaCBhIGdyb3VwIGRvZXMgbm90IGV4aXN0LFxuICAgKiBhcyB0aGlzIGlzIGFuIGlsbGVnYWwgc3RhdGVcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMgR3JvdXAgaWRcbiAgICovXG4gIGdldEZpcnN0R3JvdXBXaXRoQXR0cmlidXRlcyhcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZXRGaXJzdEdyb3VwV2l0aEF0dHJpYnV0ZXNGb3JMaXN0KGNvbmZpZ3VyYXRpb24uZ3JvdXBzKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25maWd1cmF0aW9uIGRvZXMgbm90IGhhdmUgYW55IGF0dHJpYnV0ZXMnKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRzIGZpcnN0IGdyb3VwIHdpdGggYXR0cmlidXRlcyBpbiBhIGxpc3Qgb2YgZ3JvdXBzXG4gICAqIEBwYXJhbSBncm91cHNcbiAgICogQHJldHVybnMgR3JvdXAgb3IgdW5kZWZpbmVkIGlmIHN1Y2ggYSBncm91cCBkb2VzIG5vdCBleGlzdFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEZpcnN0R3JvdXBXaXRoQXR0cmlidXRlc0Zvckxpc3QoXG4gICAgZ3JvdXBzOiBDb25maWd1cmF0b3IuR3JvdXBbXVxuICApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdyb3VwV2l0aEF0dHJpYnV0ZXM6IENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZCA9IGdyb3Vwc1xuICAgICAgLmZpbHRlcihcbiAgICAgICAgKGN1cnJlbnRHcm91cCkgPT5cbiAgICAgICAgICBjdXJyZW50R3JvdXAuYXR0cmlidXRlcyAmJiBjdXJyZW50R3JvdXAuYXR0cmlidXRlcy5sZW5ndGggPiAwXG4gICAgICApXG4gICAgICAucG9wKCk7XG4gICAgbGV0IGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGdyb3VwV2l0aEF0dHJpYnV0ZXMpIHtcbiAgICAgIGlkID0gZ3JvdXBXaXRoQXR0cmlidXRlcy5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBncm91cHNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoY3VycmVudEdyb3VwKSA9PlxuICAgICAgICAgICAgY3VycmVudEdyb3VwLnN1Ykdyb3VwcyAmJiBjdXJyZW50R3JvdXAuc3ViR3JvdXBzLmxlbmd0aCA+IDBcbiAgICAgICAgKVxuICAgICAgICAuZmxhdE1hcCgoY3VycmVudEdyb3VwKSA9PlxuICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RHcm91cFdpdGhBdHRyaWJ1dGVzRm9yTGlzdChjdXJyZW50R3JvdXAuc3ViR3JvdXBzKVxuICAgICAgICApXG4gICAgICAgIC5maWx0ZXIoKGdyb3VwSWQpID0+IGdyb3VwSWQpIC8vRmlsdGVyIHVuZGVmaW5lZCBzdHJpbmdzXG4gICAgICAgIC5wb3AoKTtcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9XG59XG4iXX0=