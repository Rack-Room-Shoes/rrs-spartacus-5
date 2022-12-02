/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "./configurator-commons.service";
import * as i3 from "./utils/configurator-utils.service";
import * as i4 from "./configurator-group-status.service";
/**
 * Service for handling configuration groups
 */
export class ConfiguratorGroupsService {
    constructor(store, configuratorCommonsService, configuratorUtilsService, configuratorGroupStatusService) {
        this.store = store;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorUtilsService = configuratorUtilsService;
        this.configuratorGroupStatusService = configuratorGroupStatusService;
    }
    /**
     * Returns the current group Id.
     * In case no group Id is being set before returns the first group of the configuration.
     * Return null when configuration contains no groups.
     *
     * @param {CommonConfigurator.Owner} owner configuration owner
     * @returns {Observable<string>} Group ID
     */
    getCurrentGroupId(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            if (configuration?.interactionState.currentGroup) {
                return configuration.interactionState.currentGroup;
            }
            else {
                return configuration?.groups[0]?.id;
            }
        }));
    }
    /**
     * Return the first conflict group of a configuration or undefined
     * if not present
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Configurator.Group} Conflict group
     */
    getFirstConflictGroup(configuration) {
        return configuration.flatGroups.find((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
    /**
     * Navigates to the first non-conflict group of the configuration which is not completed.
     * This method assumes that the configuration has incomplete groups,
     * the caller has to verify this prior to calling this method. In case no incomplete group is
     * present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     */
    navigateToFirstIncompleteGroup(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.configuratorGroupStatusService.getFirstIncompleteGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true);
            }
        });
    }
    /**
     * Navigates to the first conflict group and sets the conflict header as parent group.
     * This method assumes that the configuration has conflicts,
     * the caller has to verify this prior to calling this method. In case no conflict group
     * is present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner Configuration Owner
     */
    navigateToConflictSolver(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.getFirstConflictGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true);
            }
        });
    }
    /**
     * Returns the parent group of the subgroup that is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @returns {Observable<Configurator.Group>} Group
     */
    getMenuParentGroup(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            const menuParentGroup = configuration.interactionState.menuParentGroup;
            return menuParentGroup
                ? this.configuratorUtilsService.getOptionalGroupById(configuration.groups, menuParentGroup)
                : undefined;
        }));
    }
    /**
     * Set the parent group, specified by the group ID, which is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID. Can be ommitted, in this case parent group will be cleared, in case we are on root level
     */
    setMenuParentGroup(owner, groupId) {
        this.store.dispatch(new ConfiguratorActions.SetMenuParentGroup({
            entityKey: owner.key,
            menuParentGroup: groupId,
        }));
    }
    /**
     * Returns the group that is currently visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group>} Current group
     */
    getCurrentGroup(owner) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService
                .getConfiguration(owner)
                .pipe(map((configuration) => this.configuratorUtilsService.getGroupById(configuration.groups, currentGroupId)));
        }));
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(owner, groupId) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(map((configuration) => this.configuratorGroupStatusService.setGroupStatusVisited(configuration, groupId)), take(1))
            .subscribe();
    }
    /**
     * Navigates to the group, specified by its group ID.
     *
     * @param {Configurator.Configuration}configuration - Configuration
     * @param {string} groupId - Group ID
     * @param {boolean} setStatus - Group status will be set for previous group, default true
     */
    navigateToGroup(configuration, groupId, setStatus = true) {
        if (setStatus) {
            //Set Group status for current group
            this.getCurrentGroup(configuration.owner)
                .pipe(take(1))
                .subscribe((currentGroup) => {
                this.configuratorGroupStatusService.setGroupStatusVisited(configuration, currentGroup.id);
            });
        }
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        this.store.dispatch(new ConfiguratorActions.ChangeGroup({
            configuration: configuration,
            groupId: groupId,
            parentGroupId: parentGroup ? parentGroup.id : undefined,
        }));
    }
    /**
     * Returns the group ID of the group that is coming after the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string> | undefined} ID of next group
     */
    getNextGroupId(owner) {
        return this.getNeighboringGroupId(owner, 1);
    }
    /**
     * Returns the group ID of the group that is preceding the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string | undefined >} ID of previous group
     */
    getPreviousGroupId(owner) {
        return this.getNeighboringGroupId(owner, -1);
    }
    /**
     * Verifies whether the group has been visited
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} Has been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
    }
    /**
     * Returns a parent group for the given group.
     *
     * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
     * @param {Configurator.Group} group - Given group
     * @return {Configurator.Group} Parent group or undefined if group is a top-level group
     */
    getParentGroup(groups, group) {
        return this.configuratorUtilsService.getParentGroup(groups, group);
    }
    /**
     * Verifies whether the given group has sub groups.
     *
     * @param {Configurator.Group} group - Given group
     * @return {boolean} Sub groups available?
     */
    hasSubGroups(group) {
        return this.configuratorUtilsService.hasSubGroups(group);
    }
    /**
     * Retrieves a group ID of the neighboring group.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {number} neighboringIndex - Index of neighboring group
     * @return {Observable<string>} group ID of the neighboring group
     */
    getNeighboringGroupId(owner, neighboringIndex) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
                let nextGroup;
                configuration?.flatGroups.forEach((group, index) => {
                    if (group.id === currentGroupId &&
                        configuration?.flatGroups &&
                        configuration?.flatGroups[index + neighboringIndex] //Check if neighboring group exists
                    ) {
                        nextGroup =
                            configuration?.flatGroups[index + neighboringIndex].id;
                    }
                });
                return nextGroup;
            }), take(1));
        }));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return (groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP ||
            groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
}
ConfiguratorGroupsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupsService, deps: [{ token: i1.Store }, { token: i2.ConfiguratorCommonsService }, { token: i3.ConfiguratorUtilsService }, { token: i4.ConfiguratorGroupStatusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ConfiguratorCommonsService }, { type: i3.ConfiguratorUtilsService }, { type: i4.ConfiguratorGroupStatusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItZ3JvdXBzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7QUFNN0Q7O0dBRUc7QUFFSCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQ1ksS0FBbUMsRUFDbkMsMEJBQXNELEVBQ3RELHdCQUFrRCxFQUNsRCw4QkFBOEQ7UUFIOUQsVUFBSyxHQUFMLEtBQUssQ0FBOEI7UUFDbkMsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUN0RCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7SUFDdkUsQ0FBQztJQUVKOzs7Ozs7O09BT0c7SUFDSCxpQkFBaUIsQ0FBQyxLQUErQjtRQUMvQyxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ2pFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3BCLElBQUksYUFBYSxFQUFFLGdCQUFnQixDQUFDLFlBQVksRUFBRTtnQkFDaEQsT0FBTyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNMLE9BQU8sYUFBYSxF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Q2pFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNwQixJQUFJLFNBQVMsQ0FBQztnQkFDZCxhQUFhLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDakQsSUFDRSxLQUFLLENBQUMsRUFBRSxLQUFLLGNBQWM7d0JBQzNCLGFBQWEsRUFBRSxVQUFVO3dCQUN6QixhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLG1DQUFtQztzQkFDdkY7d0JBQ0EsU0FBUzs0QkFDUCxhQUFhLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDMUQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQyxDQUFDLEVBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsU0FBaUM7UUFDbkQsT0FBTyxDQUNMLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLHFCQUFxQjtZQUMxRCxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQ3BELENBQUM7SUFDSixDQUFDOztzSEE3VFUseUJBQXlCOzBIQUF6Qix5QkFBeUIsY0FEWixNQUFNOzJGQUNuQix5QkFBeUI7a0JBRHJDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBY3Rpb25zIH0gZnJvbSAnLi4vc3RhdGUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhDb25maWd1cmF0b3IgfSBmcm9tICcuLi9zdGF0ZS9jb25maWd1cmF0b3Itc3RhdGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1jb21tb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yR3JvdXBTdGF0dXNTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0b3ItZ3JvdXAtc3RhdHVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy9jb25maWd1cmF0b3ItdXRpbHMuc2VydmljZSc7XG5cbi8qKlxuICogU2VydmljZSBmb3IgaGFuZGxpbmcgY29uZmlndXJhdGlvbiBncm91cHNcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxTdGF0ZVdpdGhDb25maWd1cmF0b3I+LFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvclV0aWxzU2VydmljZTogQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JHcm91cFN0YXR1c1NlcnZpY2U6IENvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgZ3JvdXAgSWQuXG4gICAqIEluIGNhc2Ugbm8gZ3JvdXAgSWQgaXMgYmVpbmcgc2V0IGJlZm9yZSByZXR1cm5zIHRoZSBmaXJzdCBncm91cCBvZiB0aGUgY29uZmlndXJhdGlvbi5cbiAgICogUmV0dXJuIG51bGwgd2hlbiBjb25maWd1cmF0aW9uIGNvbnRhaW5zIG5vIGdyb3Vwcy5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIGNvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHJldHVybnMge09ic2VydmFibGU8c3RyaW5nPn0gR3JvdXAgSURcbiAgICovXG4gIGdldEN1cnJlbnRHcm91cElkKG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24ob3duZXIpLnBpcGUoXG4gICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24/LmludGVyYWN0aW9uU3RhdGUuY3VycmVudEdyb3VwKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24uaW50ZXJhY3Rpb25TdGF0ZS5jdXJyZW50R3JvdXA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24/Lmdyb3Vwc1swXT8uaWQ7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGZpcnN0IGNvbmZsaWN0IGdyb3VwIG9mIGEgY29uZmlndXJhdGlvbiBvciB1bmRlZmluZWRcbiAgICogaWYgbm90IHByZXNlbnRcbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5Hcm91cH0gQ29uZmxpY3QgZ3JvdXBcbiAgICovXG4gIGdldEZpcnN0Q29uZmxpY3RHcm91cChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBjb25maWd1cmF0aW9uLmZsYXRHcm91cHMuZmluZChcbiAgICAgIChncm91cCkgPT4gZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIGZpcnN0IG5vbi1jb25mbGljdCBncm91cCBvZiB0aGUgY29uZmlndXJhdGlvbiB3aGljaCBpcyBub3QgY29tcGxldGVkLlxuICAgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIHRoYXQgdGhlIGNvbmZpZ3VyYXRpb24gaGFzIGluY29tcGxldGUgZ3JvdXBzLFxuICAgKiB0aGUgY2FsbGVyIGhhcyB0byB2ZXJpZnkgdGhpcyBwcmlvciB0byBjYWxsaW5nIHRoaXMgbWV0aG9kLiBJbiBjYXNlIG5vIGluY29tcGxldGUgZ3JvdXAgaXNcbiAgICogcHJlc2VudCwgbm90aGluZyB3aWxsIGhhcHBlblxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqL1xuICBuYXZpZ2F0ZVRvRmlyc3RJbmNvbXBsZXRlR3JvdXAob3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcik6IHZvaWQge1xuICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWd1cmF0aW9uKG93bmVyKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBJZCA9XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cFN0YXR1c1NlcnZpY2UuZ2V0Rmlyc3RJbmNvbXBsZXRlR3JvdXAoXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uXG4gICAgICAgICAgKT8uaWQ7XG4gICAgICAgIGlmIChncm91cElkKSB7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvR3JvdXAoY29uZmlndXJhdGlvbiwgZ3JvdXBJZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgZmlyc3QgY29uZmxpY3QgZ3JvdXAgYW5kIHNldHMgdGhlIGNvbmZsaWN0IGhlYWRlciBhcyBwYXJlbnQgZ3JvdXAuXG4gICAqIFRoaXMgbWV0aG9kIGFzc3VtZXMgdGhhdCB0aGUgY29uZmlndXJhdGlvbiBoYXMgY29uZmxpY3RzLFxuICAgKiB0aGUgY2FsbGVyIGhhcyB0byB2ZXJpZnkgdGhpcyBwcmlvciB0byBjYWxsaW5nIHRoaXMgbWV0aG9kLiBJbiBjYXNlIG5vIGNvbmZsaWN0IGdyb3VwXG4gICAqIGlzIHByZXNlbnQsIG5vdGhpbmcgd2lsbCBoYXBwZW5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIENvbmZpZ3VyYXRpb24gT3duZXJcbiAgICovXG4gIG5hdmlnYXRlVG9Db25mbGljdFNvbHZlcihvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgLmdldENvbmZpZ3VyYXRpb24ob3duZXIpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5nZXRGaXJzdENvbmZsaWN0R3JvdXAoY29uZmlndXJhdGlvbik/LmlkO1xuICAgICAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0dyb3VwKGNvbmZpZ3VyYXRpb24sIGdyb3VwSWQsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgZ3JvdXAgb2YgdGhlIHN1Ymdyb3VwIHRoYXQgaXMgZGlzcGxheWVkIGluIHRoZSBncm91cCBtZW51LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cD59IEdyb3VwXG4gICAqL1xuICBnZXRNZW51UGFyZW50R3JvdXAoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24ob3duZXIpLnBpcGUoXG4gICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgbWVudVBhcmVudEdyb3VwID0gY29uZmlndXJhdGlvbi5pbnRlcmFjdGlvblN0YXRlLm1lbnVQYXJlbnRHcm91cDtcbiAgICAgICAgcmV0dXJuIG1lbnVQYXJlbnRHcm91cFxuICAgICAgICAgID8gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0T3B0aW9uYWxHcm91cEJ5SWQoXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzLFxuICAgICAgICAgICAgICBtZW51UGFyZW50R3JvdXBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHBhcmVudCBncm91cCwgc3BlY2lmaWVkIGJ5IHRoZSBncm91cCBJRCwgd2hpY2ggaXMgZGlzcGxheWVkIGluIHRoZSBncm91cCBtZW51LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSUQuIENhbiBiZSBvbW1pdHRlZCwgaW4gdGhpcyBjYXNlIHBhcmVudCBncm91cCB3aWxsIGJlIGNsZWFyZWQsIGluIGNhc2Ugd2UgYXJlIG9uIHJvb3QgbGV2ZWxcbiAgICovXG4gIHNldE1lbnVQYXJlbnRHcm91cChvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyLCBncm91cElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLlNldE1lbnVQYXJlbnRHcm91cCh7XG4gICAgICAgIGVudGl0eUtleTogb3duZXIua2V5LFxuICAgICAgICBtZW51UGFyZW50R3JvdXA6IGdyb3VwSWQsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ3JvdXAgdGhhdCBpcyBjdXJyZW50bHkgdmlzaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cD59IEN1cnJlbnQgZ3JvdXBcbiAgICovXG4gIGdldEN1cnJlbnRHcm91cChcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudEdyb3VwSWQob3duZXIpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGN1cnJlbnRHcm91cElkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlXG4gICAgICAgICAgLmdldENvbmZpZ3VyYXRpb24ob3duZXIpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLmdldEdyb3VwQnlJZChcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uLmdyb3VwcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50R3JvdXBJZFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGdyb3VwIGhhcyBiZWVuIHZpc2l0ZWQgb3Igbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBPd25lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIEdyb3VwIElEXG4gICAqL1xuICBzZXRHcm91cFN0YXR1c1Zpc2l0ZWQoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcixcbiAgICBncm91cElkOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgLmdldENvbmZpZ3VyYXRpb24ob3duZXIpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChjb25maWd1cmF0aW9uKSA9PlxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdG9yR3JvdXBTdGF0dXNTZXJ2aWNlLnNldEdyb3VwU3RhdHVzVmlzaXRlZChcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICBncm91cElkXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBncm91cCwgc3BlY2lmaWVkIGJ5IGl0cyBncm91cCBJRC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn1jb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIEdyb3VwIElEXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0U3RhdHVzIC0gR3JvdXAgc3RhdHVzIHdpbGwgYmUgc2V0IGZvciBwcmV2aW91cyBncm91cCwgZGVmYXVsdCB0cnVlXG4gICAqL1xuICBuYXZpZ2F0ZVRvR3JvdXAoXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24sXG4gICAgZ3JvdXBJZDogc3RyaW5nLFxuICAgIHNldFN0YXR1cyA9IHRydWVcbiAgKTogdm9pZCB7XG4gICAgaWYgKHNldFN0YXR1cykge1xuICAgICAgLy9TZXQgR3JvdXAgc3RhdHVzIGZvciBjdXJyZW50IGdyb3VwXG4gICAgICB0aGlzLmdldEN1cnJlbnRHcm91cChjb25maWd1cmF0aW9uLm93bmVyKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChjdXJyZW50R3JvdXApID0+IHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZS5zZXRHcm91cFN0YXR1c1Zpc2l0ZWQoXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgY3VycmVudEdyb3VwLmlkXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50R3JvdXAgPSB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRQYXJlbnRHcm91cChcbiAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzLFxuICAgICAgdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0R3JvdXBCeUlkKGNvbmZpZ3VyYXRpb24uZ3JvdXBzLCBncm91cElkKVxuICAgICk7XG5cbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuQ2hhbmdlR3JvdXAoe1xuICAgICAgICBjb25maWd1cmF0aW9uOiBjb25maWd1cmF0aW9uLFxuICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICBwYXJlbnRHcm91cElkOiBwYXJlbnRHcm91cCA/IHBhcmVudEdyb3VwLmlkIDogdW5kZWZpbmVkLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdyb3VwIElEIG9mIHRoZSBncm91cCB0aGF0IGlzIGNvbWluZyBhZnRlciB0aGUgY3VycmVudCBvbmUgaW4gYSBzZXF1ZW50aWFsIG9yZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8c3RyaW5nPiB8IHVuZGVmaW5lZH0gSUQgb2YgbmV4dCBncm91cFxuICAgKi9cbiAgZ2V0TmV4dEdyb3VwSWQoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdldE5laWdoYm9yaW5nR3JvdXBJZChvd25lciwgMSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ3JvdXAgSUQgb2YgdGhlIGdyb3VwIHRoYXQgaXMgcHJlY2VkaW5nIHRoZSBjdXJyZW50IG9uZSBpbiBhIHNlcXVlbnRpYWwgb3JkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tbW9uQ29uZmlndXJhdG9yLk93bmVyfSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQgPn0gSUQgb2YgcHJldmlvdXMgZ3JvdXBcbiAgICovXG4gIGdldFByZXZpb3VzR3JvdXBJZChcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmVpZ2hib3JpbmdHcm91cElkKG93bmVyLCAtMSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgZ3JvdXAgaGFzIGJlZW4gdmlzaXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSURcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxib29sZWFuPn0gSGFzIGJlZW4gdmlzaXRlZD9cbiAgICovXG4gIGlzR3JvdXBWaXNpdGVkKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZS5pc0dyb3VwVmlzaXRlZChvd25lciwgZ3JvdXBJZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHBhcmVudCBncm91cCBmb3IgdGhlIGdpdmVuIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cFtdfSBncm91cHMgLSBMaXN0IG9mIGdyb3VwcyB3aGVyZSB3ZSBzZWFyY2ggZm9yIHRoZSBwYXJlbnQgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gR2l2ZW4gZ3JvdXBcbiAgICogQHJldHVybiB7Q29uZmlndXJhdG9yLkdyb3VwfSBQYXJlbnQgZ3JvdXAgb3IgdW5kZWZpbmVkIGlmIGdyb3VwIGlzIGEgdG9wLWxldmVsIGdyb3VwXG4gICAqL1xuICBnZXRQYXJlbnRHcm91cChcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXBcbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0UGFyZW50R3JvdXAoZ3JvdXBzLCBncm91cCk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgZ2l2ZW4gZ3JvdXAgaGFzIHN1YiBncm91cHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEdpdmVuIGdyb3VwXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFN1YiBncm91cHMgYXZhaWxhYmxlP1xuICAgKi9cbiAgaGFzU3ViR3JvdXBzKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuaGFzU3ViR3JvdXBzKGdyb3VwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBncm91cCBJRCBvZiB0aGUgbmVpZ2hib3JpbmcgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tbW9uQ29uZmlndXJhdG9yLk93bmVyfSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5laWdoYm9yaW5nSW5kZXggLSBJbmRleCBvZiBuZWlnaGJvcmluZyBncm91cFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHN0cmluZz59IGdyb3VwIElEIG9mIHRoZSBuZWlnaGJvcmluZyBncm91cFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE5laWdoYm9yaW5nR3JvdXBJZChcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyLFxuICAgIG5laWdoYm9yaW5nSW5kZXg6IG51bWJlclxuICApOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRHcm91cElkKG93bmVyKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjdXJyZW50R3JvdXBJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZS5nZXRDb25maWd1cmF0aW9uKG93bmVyKS5waXBlKFxuICAgICAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgbGV0IG5leHRHcm91cDtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24/LmZsYXRHcm91cHMuZm9yRWFjaCgoZ3JvdXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBncm91cC5pZCA9PT0gY3VycmVudEdyb3VwSWQgJiZcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uPy5mbGF0R3JvdXBzICYmXG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbj8uZmxhdEdyb3Vwc1tpbmRleCArIG5laWdoYm9yaW5nSW5kZXhdIC8vQ2hlY2sgaWYgbmVpZ2hib3JpbmcgZ3JvdXAgZXhpc3RzXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5leHRHcm91cCA9XG4gICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uPy5mbGF0R3JvdXBzW2luZGV4ICsgbmVpZ2hib3JpbmdJbmRleF0uaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5leHRHcm91cDtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY3VycmVudCBncm91cCBpcyBjb25mbGljdCBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwVHlwZX0gZ3JvdXBUeXBlIC0gR3JvdXAgdHlwZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY3VycmVudCBncm91cCBpcyBjb25mbGljdCBvbmUsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKi9cbiAgaXNDb25mbGljdEdyb3VwVHlwZShncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUCB8fFxuICAgICAgZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgKTtcbiAgfVxufVxuIl19