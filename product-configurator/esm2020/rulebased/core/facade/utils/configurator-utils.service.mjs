/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Configurator } from '../../model/configurator.model';
import * as i0 from "@angular/core";
/**
 * Utility service for the facade layer. Supposed to be accessed by facade services
 */
export class ConfiguratorUtilsService {
    /**
     * Determines the direct parent group for an attribute group
     * @param {Configurator.Group[]} groups - List of groups where we search for parent
     * @param {Configurator.Group} group - If already part of groups, no further search is needed, and we return the provided parent group
     * @param {Configurator.Group} parentGroup - Optional parent group.
     * @returns {Configurator.Group | undefined} - Parent group. Might be undefined
     */
    getParentGroup(groups, group, parentGroup) {
        if (groups.includes(group)) {
            return parentGroup;
        }
        return groups
            .map((currentGroup) => {
            return currentGroup.subGroups
                ? this.getParentGroup(currentGroup.subGroups, group, currentGroup)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
    }
    /**
     * Finds group identified by its ID, and ensures that we always get a valid group.
     * If nothing is found in the configuration group list, this methods returns the first group.
     *
     * The exceptional case can happen if e.g. an edit in a conflict was done that
     * resolved the conflict, or if a group vanished due to object dependencies.
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group} - Group identified by its id, if available. Otherwise first group
     */
    getGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        const groupFound = this.getGroupFromSubGroups(groups, groupId);
        return groupFound ? groupFound : groups[0];
    }
    /**
     * Finds group identified by its ID. If nothing is found, this
     * methods returns undefined
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group | undefined} - Group identified by its id, if available. Otherwise undefined
     */
    getOptionalGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        return currentGroup
            ? currentGroup
            : this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupByIdIfPresent(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        return this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupFromSubGroups(groups, groupId) {
        const groupFound = groups
            .map((group) => {
            return group.subGroups
                ? this.getGroupByIdIfPresent(group.subGroups, groupId)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
        return groupFound;
    }
    /**
     * Verifies whether the current group has a subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the current group has any subgroups, otherwise 'false'
     */
    hasSubGroups(group) {
        return group.subGroups ? group.subGroups.length > 0 : false;
    }
    /**
     * Verifies whether the configuration has been created.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {boolean} - 'True' if the configuration hass been created, otherwise 'false'
     */
    isConfigurationCreated(configuration) {
        const configId = configuration?.configId;
        return (configId !== undefined &&
            configId.length !== 0 &&
            configuration !== undefined &&
            (configuration.flatGroups.length > 0 ||
                configuration.overview !== undefined));
    }
    /**
     * Creates configuration extract.
     *
     * @param {Configurator.Attribute} changedAttribute - changed configuration
     * @param {Configurator.Configuration} configuration - configuration
     * @param {Configurator.UpdateType} updateType - updated type
     * @return {Configurator.Configuration} - Configuration
     */
    createConfigurationExtract(changedAttribute, configuration, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        const newConfiguration = {
            configId: configuration.configId,
            groups: [],
            flatGroups: [],
            interactionState: {},
            owner: configuration.owner,
            productCode: configuration.productCode,
            updateType,
        };
        const groupPath = [];
        if (changedAttribute.groupId) {
            this.buildGroupPath(changedAttribute.groupId, configuration.groups, groupPath);
        }
        else {
            throw Error('GroupId must be available at attribute level during update');
        }
        const groupPathLength = groupPath.length;
        if (groupPathLength === 0) {
            throw new Error('At this point we expect that group is available in the configuration: ' +
                changedAttribute.groupId +
                ', ' +
                JSON.stringify(configuration.groups.map((cGroup) => cGroup.id)));
        }
        let currentGroupInExtract = this.buildGroupForExtract(groupPath[groupPathLength - 1]);
        let currentLeafGroupInExtract = currentGroupInExtract;
        newConfiguration.groups.push(currentGroupInExtract);
        for (let index = groupPath.length - 1; index > 0; index--) {
            currentLeafGroupInExtract = this.buildGroupForExtract(groupPath[index - 1]);
            currentGroupInExtract.subGroups = [currentLeafGroupInExtract];
            currentGroupInExtract = currentLeafGroupInExtract;
        }
        currentLeafGroupInExtract.attributes = [changedAttribute];
        return newConfiguration;
    }
    /**
     * Builds group path.
     *
     * @param {string} groupId - Group ID
     * @param { Configurator.Group[]} groupList - List of groups
     * @param { Configurator.Group[]} groupPath - Path of groups
     * @return {boolean} - 'True' if the group has been found, otherwise 'false'
     */
    buildGroupPath(groupId, groupList, groupPath) {
        let haveFoundGroup = false;
        const group = groupList.find((currentGroup) => currentGroup.id === groupId);
        if (group) {
            groupPath.push(group);
            haveFoundGroup = true;
        }
        else {
            groupList
                .filter((currentGroup) => currentGroup.subGroups)
                .forEach((currentGroup) => {
                if (currentGroup.subGroups &&
                    this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)) {
                    groupPath.push(currentGroup);
                    haveFoundGroup = true;
                }
            });
        }
        return haveFoundGroup;
    }
    /**
     * Retrieves the configuration from state, and throws an error in case the configuration is
     * not available
     * @param {StateUtils.ProcessesLoaderState<Configurator.Configuration>} configurationState - Process loader state containing product configuration
     * @returns {Configurator.Configuration} - The actual product configuration
     */
    getConfigurationFromState(configurationState) {
        const configuration = configurationState.value;
        if (configuration) {
            return configuration;
        }
        else {
            throw new Error('Configuration must be defined at this point');
        }
    }
    buildGroupForExtract(group) {
        const changedGroup = {
            groupType: group.groupType,
            id: group.id,
            subGroups: [],
        };
        return changedGroup;
    }
}
ConfiguratorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvcmUvZmFjYWRlL3V0aWxzL2NvbmZpZ3VyYXRvci11dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFOUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FDWixNQUE0QixFQUM1QixLQUF5QixFQUN6QixXQUFnQztRQUVoQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxPQUFPLE1BQU07YUFDVixHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNwQixPQUFPLFlBQVksQ0FBQyxTQUFTO2dCQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUM7Z0JBQ2xFLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDbEMsR0FBRyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxDQUNWLE1BQTRCLEVBQzVCLE9BQWU7UUFFZixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8s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QztTQUNoRTtJQUNILENBQUM7SUFFUyxvQkFBb0IsQ0FDNUIsS0FBeUI7UUFFekIsTUFBTSxZQUFZLEdBQXVCO1lBQ3ZDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztZQUMxQixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDWixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFDRixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOztxSEExUFUsd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FEWCxNQUFNOzJGQUNuQix3QkFBd0I7a0JBRHBDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RhdGVVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG4vKipcbiAqIFV0aWxpdHkgc2VydmljZSBmb3IgdGhlIGZhY2FkZSBsYXllci4gU3VwcG9zZWQgdG8gYmUgYWNjZXNzZWQgYnkgZmFjYWRlIHNlcnZpY2VzXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIGRpcmVjdCBwYXJlbnQgZ3JvdXAgZm9yIGFuIGF0dHJpYnV0ZSBncm91cFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cFtdfSBncm91cHMgLSBMaXN0IG9mIGdyb3VwcyB3aGVyZSB3ZSBzZWFyY2ggZm9yIHBhcmVudFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBJZiBhbHJlYWR5IHBhcnQgb2YgZ3JvdXBzLCBubyBmdXJ0aGVyIHNlYXJjaCBpcyBuZWVkZWQsIGFuZCB3ZSByZXR1cm4gdGhlIHByb3ZpZGVkIHBhcmVudCBncm91cFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gcGFyZW50R3JvdXAgLSBPcHRpb25hbCBwYXJlbnQgZ3JvdXAuXG4gICAqIEByZXR1cm5zIHtDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWR9IC0gUGFyZW50IGdyb3VwLiBNaWdodCBiZSB1bmRlZmluZWRcbiAgICovXG4gIGdldFBhcmVudEdyb3VwKFxuICAgIGdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwW10sXG4gICAgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCxcbiAgICBwYXJlbnRHcm91cD86IENvbmZpZ3VyYXRvci5Hcm91cFxuICApOiBDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGlmIChncm91cHMuaW5jbHVkZXMoZ3JvdXApKSB7XG4gICAgICByZXR1cm4gcGFyZW50R3JvdXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3Vwc1xuICAgICAgLm1hcCgoY3VycmVudEdyb3VwKSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50R3JvdXAuc3ViR3JvdXBzXG4gICAgICAgICAgPyB0aGlzLmdldFBhcmVudEdyb3VwKGN1cnJlbnRHcm91cC5zdWJHcm91cHMsIGdyb3VwLCBjdXJyZW50R3JvdXApXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoZm91bmRHcm91cCkgPT4gZm91bmRHcm91cClcbiAgICAgIC5wb3AoKTtcbiAgfVxuICAvKipcbiAgICogRmluZHMgZ3JvdXAgaWRlbnRpZmllZCBieSBpdHMgSUQsIGFuZCBlbnN1cmVzIHRoYXQgd2UgYWx3YXlzIGdldCBhIHZhbGlkIGdyb3VwLlxuICAgKiBJZiBub3RoaW5nIGlzIGZvdW5kIGluIHRoZSBjb25maWd1cmF0aW9uIGdyb3VwIGxpc3QsIHRoaXMgbWV0aG9kcyByZXR1cm5zIHRoZSBmaXJzdCBncm91cC5cbiAgICpcbiAgICogVGhlIGV4Y2VwdGlvbmFsIGNhc2UgY2FuIGhhcHBlbiBpZiBlLmcuIGFuIGVkaXQgaW4gYSBjb25mbGljdCB3YXMgZG9uZSB0aGF0XG4gICAqIHJlc29sdmVkIHRoZSBjb25mbGljdCwgb3IgaWYgYSBncm91cCB2YW5pc2hlZCBkdWUgdG8gb2JqZWN0IGRlcGVuZGVuY2llcy5cbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXBbXX0gZ3JvdXBzIC0gTGlzdCBvZiBncm91cHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBHcm91cCBpZFxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLkdyb3VwfSAtIEdyb3VwIGlkZW50aWZpZWQgYnkgaXRzIGlkLCBpZiBhdmFpbGFibGUuIE90aGVyd2lzZSBmaXJzdCBncm91cFxuICAgKi9cbiAgZ2V0R3JvdXBCeUlkKFxuICAgIGdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwW10sXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IENvbmZpZ3VyYXRvci5Hcm91cCB7XG4gICAgY29uc3QgY3VycmVudEdyb3VwID0gZ3JvdXBzLmZpbmQoKGdyb3VwKSA9PiBncm91cC5pZCA9PT0gZ3JvdXBJZCk7XG4gICAgaWYgKGN1cnJlbnRHcm91cCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRHcm91cDtcbiAgICB9XG4gICAgY29uc3QgZ3JvdXBGb3VuZCA9IHRoaXMuZ2V0R3JvdXBGcm9tU3ViR3JvdXBzKGdyb3VwcywgZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGdyb3VwRm91bmQgPyBncm91cEZvdW5kIDogZ3JvdXBzWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGdyb3VwIGlkZW50aWZpZWQgYnkgaXRzIElELiBJZiBub3RoaW5nIGlzIGZvdW5kLCB0aGlzXG4gICAqIG1ldGhvZHMgcmV0dXJucyB1bmRlZmluZWRcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXBbXX0gZ3JvdXBzIC0gTGlzdCBvZiBncm91cHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBHcm91cCBpZFxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkfSAtIEdyb3VwIGlkZW50aWZpZWQgYnkgaXRzIGlkLCBpZiBhdmFpbGFibGUuIE90aGVyd2lzZSB1bmRlZmluZWRcbiAgICovXG4gIGdldE9wdGlvbmFsR3JvdXBCeUlkKFxuICAgIGdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwW10sXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY3VycmVudEdyb3VwID0gZ3JvdXBzLmZpbmQoKGdyb3VwKSA9PiBncm91cC5pZCA9PT0gZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGN1cnJlbnRHcm91cFxuICAgICAgPyBjdXJyZW50R3JvdXBcbiAgICAgIDogdGhpcy5nZXRHcm91cEZyb21TdWJHcm91cHMoZ3JvdXBzLCBncm91cElkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRHcm91cEJ5SWRJZlByZXNlbnQoXG4gICAgZ3JvdXBzOiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBncm91cElkOiBzdHJpbmdcbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjdXJyZW50R3JvdXAgPSBncm91cHMuZmluZCgoZ3JvdXApID0+IGdyb3VwLmlkID09PSBncm91cElkKTtcbiAgICBpZiAoY3VycmVudEdyb3VwKSB7XG4gICAgICByZXR1cm4gY3VycmVudEdyb3VwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEdyb3VwRnJvbVN1Ykdyb3Vwcyhncm91cHMsIGdyb3VwSWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEdyb3VwRnJvbVN1Ykdyb3VwcyhcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGdyb3VwSWQ6IHN0cmluZ1xuICApOiBDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdyb3VwRm91bmQgPSBncm91cHNcbiAgICAgIC5tYXAoKGdyb3VwKSA9PiB7XG4gICAgICAgIHJldHVybiBncm91cC5zdWJHcm91cHNcbiAgICAgICAgICA/IHRoaXMuZ2V0R3JvdXBCeUlkSWZQcmVzZW50KGdyb3VwLnN1Ykdyb3VwcywgZ3JvdXBJZClcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKChmb3VuZEdyb3VwKSA9PiBmb3VuZEdyb3VwKVxuICAgICAgLnBvcCgpO1xuICAgIHJldHVybiBncm91cEZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgZ3JvdXAgaGFzIGEgc3ViZ3JvdXBzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ1RydWUnIGlmIHRoZSBjdXJyZW50IGdyb3VwIGhhcyBhbnkgc3ViZ3JvdXBzLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgaGFzU3ViR3JvdXBzKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ3JvdXAuc3ViR3JvdXBzID8gZ3JvdXAuc3ViR3JvdXBzLmxlbmd0aCA+IDAgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjb25maWd1cmF0aW9uIGhhcyBiZWVuIGNyZWF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gJ1RydWUnIGlmIHRoZSBjb25maWd1cmF0aW9uIGhhc3MgYmVlbiBjcmVhdGVkLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgaXNDb25maWd1cmF0aW9uQ3JlYXRlZChjb25maWd1cmF0aW9uPzogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24pOiBib29sZWFuIHtcbiAgICBjb25zdCBjb25maWdJZCA9IGNvbmZpZ3VyYXRpb24/LmNvbmZpZ0lkO1xuICAgIHJldHVybiAoXG4gICAgICBjb25maWdJZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBjb25maWdJZC5sZW5ndGggIT09IDAgJiZcbiAgICAgIGNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgKGNvbmZpZ3VyYXRpb24uZmxhdEdyb3Vwcy5sZW5ndGggPiAwIHx8XG4gICAgICAgIGNvbmZpZ3VyYXRpb24ub3ZlcnZpZXcgIT09IHVuZGVmaW5lZClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgY29uZmlndXJhdGlvbiBleHRyYWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGV9IGNoYW5nZWRBdHRyaWJ1dGUgLSBjaGFuZ2VkIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuVXBkYXRlVHlwZX0gdXBkYXRlVHlwZSAtIHVwZGF0ZWQgdHlwZVxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gLSBDb25maWd1cmF0aW9uXG4gICAqL1xuICBjcmVhdGVDb25maWd1cmF0aW9uRXh0cmFjdChcbiAgICBjaGFuZ2VkQXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uLFxuICAgIHVwZGF0ZVR5cGU/OiBDb25maWd1cmF0b3IuVXBkYXRlVHlwZVxuICApOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiB7XG4gICAgaWYgKCF1cGRhdGVUeXBlKSB7XG4gICAgICB1cGRhdGVUeXBlID0gQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGUuQVRUUklCVVRFO1xuICAgIH1cbiAgICBjb25zdCBuZXdDb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIGNvbmZpZ0lkOiBjb25maWd1cmF0aW9uLmNvbmZpZ0lkLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIGZsYXRHcm91cHM6IFtdLFxuICAgICAgaW50ZXJhY3Rpb25TdGF0ZToge30sXG4gICAgICBvd25lcjogY29uZmlndXJhdGlvbi5vd25lcixcbiAgICAgIHByb2R1Y3RDb2RlOiBjb25maWd1cmF0aW9uLnByb2R1Y3RDb2RlLFxuICAgICAgdXBkYXRlVHlwZSxcbiAgICB9O1xuXG4gICAgY29uc3QgZ3JvdXBQYXRoOiBDb25maWd1cmF0b3IuR3JvdXBbXSA9IFtdO1xuXG4gICAgaWYgKGNoYW5nZWRBdHRyaWJ1dGUuZ3JvdXBJZCkge1xuICAgICAgdGhpcy5idWlsZEdyb3VwUGF0aChcbiAgICAgICAgY2hhbmdlZEF0dHJpYnV0ZS5ncm91cElkLFxuICAgICAgICBjb25maWd1cmF0aW9uLmdyb3VwcyxcbiAgICAgICAgZ3JvdXBQYXRoXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignR3JvdXBJZCBtdXN0IGJlIGF2YWlsYWJsZSBhdCBhdHRyaWJ1dGUgbGV2ZWwgZHVyaW5nIHVwZGF0ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwUGF0aExlbmd0aCA9IGdyb3VwUGF0aC5sZW5ndGg7XG5cbiAgICBpZiAoZ3JvdXBQYXRoTGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdCB0aGlzIHBvaW50IHdlIGV4cGVjdCB0aGF0IGdyb3VwIGlzIGF2YWlsYWJsZSBpbiB0aGUgY29uZmlndXJhdGlvbjogJyArXG4gICAgICAgICAgY2hhbmdlZEF0dHJpYnV0ZS5ncm91cElkICtcbiAgICAgICAgICAnLCAnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uLmdyb3Vwcy5tYXAoKGNHcm91cCkgPT4gY0dyb3VwLmlkKSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnRHcm91cEluRXh0cmFjdDogQ29uZmlndXJhdG9yLkdyb3VwID0gdGhpcy5idWlsZEdyb3VwRm9yRXh0cmFjdChcbiAgICAgIGdyb3VwUGF0aFtncm91cFBhdGhMZW5ndGggLSAxXVxuICAgICk7XG5cbiAgICBsZXQgY3VycmVudExlYWZHcm91cEluRXh0cmFjdDogQ29uZmlndXJhdG9yLkdyb3VwID0gY3VycmVudEdyb3VwSW5FeHRyYWN0O1xuXG4gICAgbmV3Q29uZmlndXJhdGlvbi5ncm91cHMucHVzaChjdXJyZW50R3JvdXBJbkV4dHJhY3QpO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSBncm91cFBhdGgubGVuZ3RoIC0gMTsgaW5kZXggPiAwOyBpbmRleC0tKSB7XG4gICAgICBjdXJyZW50TGVhZkdyb3VwSW5FeHRyYWN0ID0gdGhpcy5idWlsZEdyb3VwRm9yRXh0cmFjdChcbiAgICAgICAgZ3JvdXBQYXRoW2luZGV4IC0gMV1cbiAgICAgICk7XG4gICAgICBjdXJyZW50R3JvdXBJbkV4dHJhY3Quc3ViR3JvdXBzID0gW2N1cnJlbnRMZWFmR3JvdXBJbkV4dHJhY3RdO1xuICAgICAgY3VycmVudEdyb3VwSW5FeHRyYWN0ID0gY3VycmVudExlYWZHcm91cEluRXh0cmFjdDtcbiAgICB9XG5cbiAgICBjdXJyZW50TGVhZkdyb3VwSW5FeHRyYWN0LmF0dHJpYnV0ZXMgPSBbY2hhbmdlZEF0dHJpYnV0ZV07XG4gICAgcmV0dXJuIG5ld0NvbmZpZ3VyYXRpb247XG4gIH1cblxuICAvKipcbiAgICogQnVpbGRzIGdyb3VwIHBhdGguXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSURcbiAgICogQHBhcmFtIHsgQ29uZmlndXJhdG9yLkdyb3VwW119IGdyb3VwTGlzdCAtIExpc3Qgb2YgZ3JvdXBzXG4gICAqIEBwYXJhbSB7IENvbmZpZ3VyYXRvci5Hcm91cFtdfSBncm91cFBhdGggLSBQYXRoIG9mIGdyb3Vwc1xuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgZ3JvdXAgaGFzIGJlZW4gZm91bmQsIG90aGVyd2lzZSAnZmFsc2UnXG4gICAqL1xuICBidWlsZEdyb3VwUGF0aChcbiAgICBncm91cElkOiBzdHJpbmcsXG4gICAgZ3JvdXBMaXN0OiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBncm91cFBhdGg6IENvbmZpZ3VyYXRvci5Hcm91cFtdXG4gICk6IGJvb2xlYW4ge1xuICAgIGxldCBoYXZlRm91bmRHcm91cCA9IGZhbHNlO1xuICAgIGNvbnN0IGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQgPSBncm91cExpc3QuZmluZChcbiAgICAgIChjdXJyZW50R3JvdXApID0+IGN1cnJlbnRHcm91cC5pZCA9PT0gZ3JvdXBJZFxuICAgICk7XG5cbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGdyb3VwUGF0aC5wdXNoKGdyb3VwKTtcbiAgICAgIGhhdmVGb3VuZEdyb3VwID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JvdXBMaXN0XG4gICAgICAgIC5maWx0ZXIoKGN1cnJlbnRHcm91cCkgPT4gY3VycmVudEdyb3VwLnN1Ykdyb3VwcylcbiAgICAgICAgLmZvckVhY2goKGN1cnJlbnRHcm91cCkgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5zdWJHcm91cHMgJiZcbiAgICAgICAgICAgIHRoaXMuYnVpbGRHcm91cFBhdGgoZ3JvdXBJZCwgY3VycmVudEdyb3VwLnN1Ykdyb3VwcywgZ3JvdXBQYXRoKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgZ3JvdXBQYXRoLnB1c2goY3VycmVudEdyb3VwKTtcbiAgICAgICAgICAgIGhhdmVGb3VuZEdyb3VwID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaGF2ZUZvdW5kR3JvdXA7XG4gIH1cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY29uZmlndXJhdGlvbiBmcm9tIHN0YXRlLCBhbmQgdGhyb3dzIGFuIGVycm9yIGluIGNhc2UgdGhlIGNvbmZpZ3VyYXRpb24gaXNcbiAgICogbm90IGF2YWlsYWJsZVxuICAgKiBAcGFyYW0ge1N0YXRlVXRpbHMuUHJvY2Vzc2VzTG9hZGVyU3RhdGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+fSBjb25maWd1cmF0aW9uU3RhdGUgLSBQcm9jZXNzIGxvYWRlciBzdGF0ZSBjb250YWluaW5nIHByb2R1Y3QgY29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IC0gVGhlIGFjdHVhbCBwcm9kdWN0IGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldENvbmZpZ3VyYXRpb25Gcm9tU3RhdGUoXG4gICAgY29uZmlndXJhdGlvblN0YXRlOiBTdGF0ZVV0aWxzLlByb2Nlc3Nlc0xvYWRlclN0YXRlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPlxuICApOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiB7XG4gICAgY29uc3QgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25TdGF0ZS52YWx1ZTtcbiAgICBpZiAoY29uZmlndXJhdGlvbikge1xuICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlndXJhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXQgdGhpcyBwb2ludCcpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZEdyb3VwRm9yRXh0cmFjdChcbiAgICBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwXG4gICk6IENvbmZpZ3VyYXRvci5Hcm91cCB7XG4gICAgY29uc3QgY2hhbmdlZEdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAgPSB7XG4gICAgICBncm91cFR5cGU6IGdyb3VwLmdyb3VwVHlwZSxcbiAgICAgIGlkOiBncm91cC5pZCxcbiAgICAgIHN1Ykdyb3VwczogW10sXG4gICAgfTtcbiAgICByZXR1cm4gY2hhbmdlZEdyb3VwO1xuICB9XG59XG4iXX0=