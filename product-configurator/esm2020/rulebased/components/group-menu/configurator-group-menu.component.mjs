/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChildren, } from '@angular/core';
import { DirectionMode, ICON_TYPE, } from '@spartacus/storefront';
import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "../../core/facade/configurator-commons.service";
import * as i2 from "../../core/facade/configurator-groups.service";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/product-configurator/common";
import * as i5 from "../service/configurator-storefront-utils.service";
import * as i6 from "./configurator-group-menu.component.service";
import * as i7 from "@spartacus/core";
import * as i8 from "@angular/common";
export class ConfiguratorGroupMenuComponent {
    constructor(configCommonsService, configuratorGroupsService, hamburgerMenuService, configRouterExtractorService, configUtils, configGroupMenuService, directionService, translation) {
        this.configCommonsService = configCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.hamburgerMenuService = hamburgerMenuService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configUtils = configUtils;
        this.configGroupMenuService = configGroupMenuService;
        this.directionService = directionService;
        this.translation = translation;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(switchMap((routerData) => this.configCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })), 
        //We need to ensure that the navigation to conflict groups or
        //groups with mandatory attributes already has taken place, as this happens
        //in an onInit of another component.
        //otherwise we risk that this component is completely initialized too early,
        //in dev mode resulting in ExpressionChangedAfterItHasBeenCheckedError
        filter((cont) => (cont.configuration.complete &&
            cont.configuration.consistent) ||
            cont.configuration.interactionState.issueNavigationDone ||
            !cont.routerData.resolveIssues))
            .pipe(map((cont) => cont.configuration))));
        this.currentGroup$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner)));
        /**
         * Current parent group. Undefined for top level groups
         */
        this.displayedParentGroup$ = this.configuration$.pipe(switchMap((configuration) => this.configuratorGroupsService.getMenuParentGroup(configuration.owner)), switchMap((parentGroup) => {
            return parentGroup
                ? this.getCondensedParentGroup(parentGroup)
                : of(parentGroup);
        }));
        this.displayedGroups$ = this.displayedParentGroup$.pipe(switchMap((parentGroup) => {
            return this.configuration$.pipe(map((configuration) => {
                if (parentGroup) {
                    return this.condenseGroups(parentGroup.subGroups);
                }
                else {
                    return this.condenseGroups(configuration.groups);
                }
            }));
        }));
        this.iconTypes = ICON_TYPE;
        this.ERROR = ' ERROR';
        this.COMPLETE = ' COMPLETE';
        this.WARNING = ' WARNING';
        this.ICON = 'ICON';
    }
    click(group) {
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            if (configuration.interactionState.currentGroup === group.id) {
                return;
            }
            if (!this.configuratorGroupsService.hasSubGroups(group)) {
                this.configuratorGroupsService.navigateToGroup(configuration, group.id);
                this.hamburgerMenuService.toggle(true);
                this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
            }
            else {
                this.configuratorGroupsService.setMenuParentGroup(configuration.owner, group.id);
            }
        });
    }
    navigateUp() {
        this.displayedParentGroup$
            .pipe(take(1))
            .subscribe((displayedParentGroup) => {
            //we only navigate up if we are not on a sub level group
            if (displayedParentGroup) {
                const grandParentGroup$ = this.getParentGroup(displayedParentGroup);
                this.configuration$.pipe(take(1)).subscribe((configuration) => {
                    grandParentGroup$.pipe(take(1)).subscribe((grandParentGroup) => {
                        this.configuratorGroupsService.setMenuParentGroup(configuration.owner, grandParentGroup ? grandParentGroup.id : undefined);
                    });
                });
            }
        });
    }
    /**
     * Retrieves the number of conflicts for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {string} - number of conflicts
     */
    getConflictNumber(group) {
        if (group &&
            group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return '(' + group.subGroups.length + ')';
        }
        return '';
    }
    /**
     * Verifies whether the current group has subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - Returns 'true' if the current group has a subgroups, otherwise 'false'.
     */
    hasSubGroups(group) {
        return this.configuratorGroupsService.hasSubGroups(group);
    }
    /**
     * Retrieves observable of parent group for a group
     * @param group
     * @returns Parent group, undefined in case input group is already on root level
     */
    getParentGroup(group) {
        return this.configuration$.pipe(map((configuration) => this.configuratorGroupsService.getParentGroup(configuration.groups, group)));
    }
    getCondensedParentGroup(parentGroup) {
        if (parentGroup &&
            parentGroup.subGroups &&
            parentGroup.subGroups.length === 1 &&
            parentGroup.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return this.getParentGroup(parentGroup).pipe(switchMap((group) => {
                return group ? this.getCondensedParentGroup(group) : of(group);
            }));
        }
        else {
            return of(parentGroup);
        }
    }
    condenseGroups(groups) {
        return groups.flatMap((group) => {
            if (group.subGroups.length === 1 &&
                group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
                return this.condenseGroups(group.subGroups);
            }
            else {
                return group;
            }
        });
    }
    /**
     * Returns true if group has been visited and if the group is not a conflict group.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    isGroupVisited(group, configuration) {
        return this.configuratorGroupsService
            .isGroupVisited(configuration.owner, group.id)
            .pipe(map((isVisited) => isVisited &&
            !this.isConflictGroupType(group.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP)), take(1));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return this.configuratorGroupsService.isConflictGroupType(groupType);
    }
    /**
     * Returns true if group is conflict header group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict header group, otherwise 'false'.
     */
    isConflictHeader(group) {
        return (group && group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP);
    }
    /**
     * Returns true if group is conflict group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict group, otherwise 'false'.
     */
    isConflictGroup(group) {
        return group && group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
    /**
     * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    getGroupStatusStyles(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let groupStatusStyle = 'cx-menu-item';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent) {
                groupStatusStyle = groupStatusStyle + this.WARNING;
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                groupStatusStyle = groupStatusStyle + this.COMPLETE;
            }
            if (!group.complete && isVisited) {
                groupStatusStyle = groupStatusStyle + this.ERROR;
            }
            return groupStatusStyle;
        }));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} groupIndex - Group index
     * @param {Configurator.Group} targetGroup - Target group
     * @param {Configurator.Group} currentGroup - Current group
     */
    switchGroupOnArrowPress(event, groupIndex, targetGroup, currentGroup) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            this.configGroupMenuService.switchGroupOnArrowPress(event, groupIndex, this.groups);
        }
        else if (this.isForwardsNavigation(event)) {
            if (targetGroup && this.hasSubGroups(targetGroup)) {
                this.click(targetGroup);
                this.setFocusForSubGroup(targetGroup, currentGroup.id);
            }
        }
        else if (this.isBackNavigation(event)) {
            if (this.configGroupMenuService.isBackBtnFocused(this.groups)) {
                this.navigateUp();
                this.setFocusForMainMenu(currentGroup.id);
            }
        }
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the main group menu by back navigation.
     *
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForMainMenu(currentGroupId) {
        let key = currentGroupId;
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            configuration.groups?.forEach((group) => {
                if (group.subGroups?.length !== 1 &&
                    (this.isGroupSelected(group.id, currentGroupId) ||
                        this.containsSelectedGroup(group, currentGroupId))) {
                    key = group.id;
                }
            });
        });
        this.configUtils.setFocus(key);
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the subgroup menu by forwards navigation.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForSubGroup(group, currentGroupId) {
        let key = 'cx-menu-back';
        if (this.containsSelectedGroup(group, currentGroupId)) {
            key = currentGroupId;
        }
        this.configUtils.setFocus(key);
    }
    /**
     * Verifies whether the parent group contains a selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the parent group contains a selected group, otherwise 'false'
     */
    containsSelectedGroup(group, currentGroupId) {
        let isCurrentGroupFound = false;
        group.subGroups?.forEach((subGroup) => {
            if (this.isGroupSelected(subGroup.id, currentGroupId)) {
                isCurrentGroupFound = true;
            }
        });
        return isCurrentGroupFound;
    }
    /**
     * Retrieves the tab index depending on if the the current group is selected
     * or the parent group contains the selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {number} - tab index
     */
    getTabIndex(group, currentGroupId) {
        if (!this.isGroupSelected(group.id, currentGroupId) &&
            !this.containsSelectedGroup(group, currentGroupId)) {
            return -1;
        }
        else {
            return 0;
        }
    }
    /**
     * Verifies whether the current group is selected.
     *
     * @param {string} groupId - group ID
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the current group is selected, otherwise 'false'
     */
    isGroupSelected(groupId, currentGroupId) {
        return groupId === currentGroupId;
    }
    /**
     * Generates a group ID for aria-controls.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createAriaControls(groupId) {
        return this.configUtils.createGroupId(groupId);
    }
    /**
     * Generates aria-label for group menu item
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    getAriaLabel(group) {
        let translatedText = '';
        if (group && group.groupType && this.isConflictGroupType(group.groupType)) {
            if (this.isConflictHeader(group)) {
                this.translation
                    .translate('configurator.a11y.conflictsInConfiguration', {
                    numberOfConflicts: this.getConflictNumber(group),
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                translatedText = group.description ? group.description : '';
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.groupName', {
                group: group.description,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    /**
     * Generates an id for icons.
     *
     * @param {string} prefix - prefix for type of icon
     * @param {string} groupId - group id
     * @returns {string | undefined} - generated icon id
     */
    createIconId(type, groupId) {
        return this.ICON + type + groupId;
    }
    /**
     * Generates aria-describedby
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<string>} - aria-describedby
     */
    getAriaDescribedby(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let ariaDescribedby = '';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent &&
                group.groupType &&
                !this.isConflictGroupType(group.groupType)) {
                ariaDescribedby =
                    ariaDescribedby + this.createIconId(ICON_TYPE.WARNING, group.id);
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.SUCCESS, group.id);
            }
            if (!group.complete && isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.ERROR, group.id);
            }
            if (this.hasSubGroups(group)) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.CARET_RIGHT, group.id);
            }
            ariaDescribedby = ariaDescribedby + ' inListOfGroups';
            return ariaDescribedby;
        }));
    }
}
ConfiguratorGroupMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuComponent, deps: [{ token: i1.ConfiguratorCommonsService }, { token: i2.ConfiguratorGroupsService }, { token: i3.HamburgerMenuService }, { token: i4.ConfiguratorRouterExtractorService }, { token: i5.ConfiguratorStorefrontUtilsService }, { token: i6.ConfiguratorGroupMenuService }, { token: i3.DirectionService }, { token: i7.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorGroupMenuComponent, selector: "cx-configurator-group-menu", viewQueries: [{ propertyName: "groups", predicate: ["groupItem"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <div class=\"cx-group-menu\" role=\"tablist\">\n    <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n    </span>\n    <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n      {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n    </span>\n    <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n      <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n        <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n          <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n            <button\n              *ngIf=\"parentGroup !== null && groupIndex === 0\"\n              #groupItem\n              class=\"cx-menu-back\"\n              role=\"tab\"\n              [attr.aria-selected]=\"false\"\n              [attr.aria-label]=\"\n                isConflictGroupType(parentGroup.groupType)\n                  ? ('configurator.a11y.conflictBack' | cxTranslate)\n                  : ('configurator.a11y.groupBack' | cxTranslate)\n              \"\n              aria-describedby=\"listOfGroups\"\n              [cxFocus]=\"{ key: 'cx-menu-back' }\"\n              (click)=\"navigateUp()\"\n              (keydown)=\"\n                switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n              \"\n            >\n              <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n              {{ 'configurator.button.back' | cxTranslate }}\n            </button>\n          </ng-container>\n          <button\n            #groupItem\n            id=\"{{ group.id }}\"\n            ngClass=\"{{ getGroupStatusStyles(group, configuration) | async }}\"\n            role=\"tab\"\n            [class.DISABLED]=\"!group.configurable\"\n            [class.cx-menu-conflict]=\"isConflictGroupType(group.groupType)\"\n            [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [class.disable]=\"!group.configurable\"\n            [attr.aria-describedby]=\"\n              getAriaDescribedby(group, configuration) | async\n            \"\n            [attr.aria-selected]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [attr.aria-controls]=\"\n              isGroupSelected(group.id, currentGroup.id)\n                ? createAriaControls(group.id)\n                : null\n            \"\n            [attr.aria-label]=\"getAriaLabel(group)\"\n            [cxFocus]=\"{\n              key: group.id\n            }\"\n            (click)=\"click(group)\"\n            [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n            (keydown)=\"\n              switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n            \"\n          >\n            <span title=\"{{ group.description }}\">{{ group.description }}</span>\n            <div class=\"groupIndicators\">\n              <div class=\"conflictNumberIndicator\">\n                {{ getConflictNumber(group) }}\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"WARNING\"\n                  [type]=\"iconTypes.WARNING\"\n                  id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconConflict' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"ERROR\"\n                  [type]=\"iconTypes.ERROR\"\n                  id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconIncomplete' | cxTranslate\n                  \"\n                ></cx-icon>\n                <cx-icon\n                  class=\"COMPLETE\"\n                  [type]=\"iconTypes.SUCCESS\"\n                  id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconComplete' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"subGroupIndicator\">\n                <cx-icon\n                  *ngIf=\"hasSubGroups(group)\"\n                  [type]=\"iconTypes.CARET_RIGHT\"\n                  id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconSubGroup' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n            </div>\n          </button>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i8.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i8.AsyncPipe, name: "async" }, { kind: "pipe", type: i7.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <div class=\"cx-group-menu\" role=\"tablist\">\n    <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n    </span>\n    <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n      {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n    </span>\n    <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n      <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n        <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n          <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n            <button\n              *ngIf=\"parentGroup !== null && groupIndex === 0\"\n              #groupItem\n              class=\"cx-menu-back\"\n              role=\"tab\"\n              [attr.aria-selected]=\"false\"\n              [attr.aria-label]=\"\n                isConflictGroupType(parentGroup.groupType)\n                  ? ('configurator.a11y.conflictBack' | cxTranslate)\n                  : ('configurator.a11y.groupBack' | cxTranslate)\n              \"\n              aria-describedby=\"listOfGroups\"\n              [cxFocus]=\"{ key: 'cx-menu-back' }\"\n              (click)=\"navigateUp()\"\n              (keydown)=\"\n                switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n              \"\n            >\n              <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n              {{ 'configurator.button.back' | cxTranslate }}\n            </button>\n          </ng-container>\n          <button\n            #groupItem\n            id=\"{{ group.id }}\"\n            ngClass=\"{{ getGroupStatusStyles(group, configuration) | async }}\"\n            role=\"tab\"\n            [class.DISABLED]=\"!group.configurable\"\n            [class.cx-menu-conflict]=\"isConflictGroupType(group.groupType)\"\n            [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [class.disable]=\"!group.configurable\"\n            [attr.aria-describedby]=\"\n              getAriaDescribedby(group, configuration) | async\n            \"\n            [attr.aria-selected]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [attr.aria-controls]=\"\n              isGroupSelected(group.id, currentGroup.id)\n                ? createAriaControls(group.id)\n                : null\n            \"\n            [attr.aria-label]=\"getAriaLabel(group)\"\n            [cxFocus]=\"{\n              key: group.id\n            }\"\n            (click)=\"click(group)\"\n            [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n            (keydown)=\"\n              switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n            \"\n          >\n            <span title=\"{{ group.description }}\">{{ group.description }}</span>\n            <div class=\"groupIndicators\">\n              <div class=\"conflictNumberIndicator\">\n                {{ getConflictNumber(group) }}\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"WARNING\"\n                  [type]=\"iconTypes.WARNING\"\n                  id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconConflict' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"ERROR\"\n                  [type]=\"iconTypes.ERROR\"\n                  id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconIncomplete' | cxTranslate\n                  \"\n                ></cx-icon>\n                <cx-icon\n                  class=\"COMPLETE\"\n                  [type]=\"iconTypes.SUCCESS\"\n                  id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconComplete' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"subGroupIndicator\">\n                <cx-icon\n                  *ngIf=\"hasSubGroups(group)\"\n                  [type]=\"iconTypes.CARET_RIGHT\"\n                  id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconSubGroup' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n            </div>\n          </button>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorCommonsService }, { type: i2.ConfiguratorGroupsService }, { type: i3.HamburgerMenuService }, { type: i4.ConfiguratorRouterExtractorService }, { type: i5.ConfiguratorStorefrontUtilsService }, { type: i6.ConfiguratorGroupMenuService }, { type: i3.DirectionService }, { type: i7.TranslationService }]; }, propDecorators: { groups: [{
                type: ViewChildren,
                args: ['groupItem']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2dyb3VwLW1lbnUvY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2dyb3VwLW1lbnUvY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQ0wsYUFBYSxFQUdiLFNBQVMsR0FDVixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7OztBQVNuRSxNQUFNLE9BQU8sOEJBQThCO0lBd0V6QyxZQUNZLG9CQUFnRCxFQUNoRCx5QkFBb0QsRUFDcEQsb0JBQTBDLEVBQzFDLDRCQUFnRSxFQUNoRSxXQUErQyxFQUMvQyxzQkFBb0QsRUFDcEQsZ0JBQWtDLEVBQ2xDLFdBQStCO1FBUC9CLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNEI7UUFDaEQsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBb0M7UUFDaEUsZ0JBQVcsR0FBWCxXQUFXLENBQW9DO1FBQy9DLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBOEI7UUFDcEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUE3RTNDLGdCQUFXLEdBQ1QsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFeEQsbUJBQWMsR0FDWixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDbkIsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FDdkIsSUFBSSxDQUFDLG9CQUFvQjthQUN0QixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2FBQ2xDLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN2RCw2REFBNkQ7UUFDN0QsMkVBQTJFO1FBQzNFLG9DQUFvQztRQUNwQyw0RUFBNEU7UUFDNUUsc0VBQXNFO1FBQ3RFLE1BQU0sQ0FDSixDQUFDLElBQUksRUFBRSxFQUFFLENBQ1AsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUI7WUFDdkQsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FDakMsQ0FDRjthQUVBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUMzQyxDQUNGLENBQUM7UUFFSixrQkFBYSxHQUFtQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDbkUsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FDdkIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQ2pFLENBQ0YsQ0FBQztRQUNGOztXQUVHO1FBQ0gsMEJBQXFCLEdBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUMxQixJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUN2RSxFQUNELFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3hCLE9BQU8sV0FBVztnQkFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVKLHFCQUFnQixHQUNkLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQzdCLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzdCLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNwQixJQUFJLFdBQVcsRUFBRTtvQkFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNuRDtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNsRDtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUosY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN0QixVQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFDdkIsWUFBTyxHQUFHLFVBQVUsQ0FBQztRQUNyQixTQUFJLEdBQUcsTUFBTSxDQUFDO0lBV1gsQ0FBQztJQUVKLEtBQUssQ0FBQyxLQUF5QjtRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUM1RCxJQUFJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDNUQsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEIsQ0FDM0MsMERBQTBELENBQzNELENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLENBQUMseUJBQXlCLENBQUMsa0JBQWtCLENBQy9DLGFBQWEsQ0FBQyxLQUFLLEVBQ25CLEtBQUssQ0FBQyxFQUFFLENBQ1QsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxxQkFBcUI7YUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLEVBQUU7WUFDbEMsd0RBQXdEO1lBQ3hELElBQUksb0JBQW9CLEVBQUU7Z0JBQ3hCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtvQkFDNUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUU7d0JBQzdELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FDL0MsYUFBYSxDQUFDLEtBQUssRUFDbkIsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNuRCxDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlCQUFpQixDQUFDLEtBQXlCO1FBQ3pDLElBQ0UsS0FBSztZQUNMLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFDaEU7WUFDQSxPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDM0M7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVksQ0FBQyxLQUF5QjtRQUNwQyxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxjQUFjLENBQ3RCLEtBQXlCO1FBRXpCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzdCLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQ3BCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxjQUFjLENBQzNDLGFBQWEsQ0FBQyxNQUFNLEVBQ3BCLEtBQUssQ0FDTixDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCx1QkFBdUIsQ0FDckIsV0FBK0I7UUFFL0IsSUFDRSxXQUFXO1lBQ1gsV0FBVyxDQUFDLFNBQVM7WUFDckIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUNsQyxXQUFXLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQ3RFO1lBQ0EsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUE0QjtRQUN6QyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QixJQUNFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFDaEU7Z0JBQ0EsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsY0FBYyxDQUNaLEtBQXlCLEVBQ3pCLGFBQXlDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QjthQUNsQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQzdDLElBQUksQ0FDSCxHQUFHLENBQ0QsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUNaLFNBQVM7WUFDVCxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FDdkIsS0FBSyxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FDMUQsQ0FDSixFQUNELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsU0FBaUM7UUFDbkQsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsZ0JBQWdCLENBQUMsS0FBeUI7UUFDeEMsT0FBTyxDQUNMLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQzFFLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsS0FBeUI7UUFDdkMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CLENBQ2xCLEtBQXlCLEVBQ3pCLGFBQXlDO1FBRXpDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoQixNQUFNLDBCQUEwQixHQUFHLHNCQUFzQixDQUFDO1lBQzFELElBQUksZ0JBQWdCLEdBQVcsY0FBYyxDQUFDO1lBQzlDLElBQ0UsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSywwQkFBMEI7Z0JBQ25FLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDakI7Z0JBQ0EsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNwRDtZQUNELElBQ0UsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSywwQkFBMEI7Z0JBQ25FLEtBQUssQ0FBQyxRQUFRO2dCQUNkLEtBQUssQ0FBQyxVQUFVO2dCQUNoQixTQUFTLEVBQ1Q7Z0JBQ0EsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNyRDtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtnQkFDaEMsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNsRDtZQUNELE9BQU8sZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxjQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDcEUsQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUssYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sb0JBQW9CLENBQUMsS0FBb0I7UUFDakQsT0FBTyxDQUNMLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RELENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQ3RELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sZ0JBQWdCLENBQUMsS0FBb0I7UUFDN0MsT0FBTyxDQUNMLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JELENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQ3ZELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHVCQUF1QixDQUNyQixLQUFvQixFQUNwQixVQUFrQixFQUNsQixXQUErQixFQUMvQixZQUFnQztRQUVoQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzFELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FDakQsS0FBSyxFQUNMLFVBQVUsRUFDVixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNDLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMzQztTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsY0FBdUI7UUFDekMsSUFBSSxHQUFHLEdBQXVCLGNBQWMsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUM1RCxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN0QyxJQUNFLEtBQUssQ0FBQyxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7b0JBQzdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUNwRDtvQkFDQSxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztpQkFDaEI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILG1CQUFtQixDQUNqQixLQUF5QixFQUN6QixjQUF1QjtRQUV2QixJQUFJLEdBQUcsR0FBdUIsY0FBYyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsRUFBRTtZQUNyRCxHQUFHLEdBQUcsY0FBYyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILHFCQUFxQixDQUNuQixLQUF5QixFQUN6QixjQUF1QjtRQUV2QixJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNoQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxFQUFFO2dCQUNyRCxtQkFBbUIsR0FBRyxJQUFJLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxXQUFXLENBQUMsS0FBeUIsRUFBRSxjQUFzQjtRQUMzRCxJQUNFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQztZQUMvQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLEVBQ2xEO1lBQ0EsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO2FBQU07WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGVBQWUsQ0FBQyxPQUFnQixFQUFFLGNBQXVCO1FBQ3ZELE9BQU8sT0FBTyxLQUFLLGNBQWMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxrQkFBa0IsQ0FBQyxPQUFnQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVksQ0FBQyxLQUF5QjtRQUNwQyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pFLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsV0FBVztxQkFDYixTQUFTLENBQUMsNENBQTRDLEVBQUU7b0JBQ3ZELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7aUJBQ2pELENBQUM7cUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDYixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDakQ7aUJBQU07Z0JBQ0wsY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUM3RDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVztpQkFDYixTQUFTLENBQUMsNkJBQTZCLEVBQUU7Z0JBQ3hDLEtBQUssRUFBRSxLQUFLLENBQUMsV0FBVzthQUN6QixDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFlBQVksQ0FBQyxJQUFlLEVBQUUsT0FBZ0I7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGtCQUFrQixDQUNoQixLQUF5QixFQUN6QixhQUF5QztRQUV6QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDbkQsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDaEIsTUFBTSwwQkFBMEIsR0FBRyxzQkFBc0IsQ0FBQztZQUMxRCxJQUFJLGVBQWUsR0FBVyxFQUFFLENBQUM7WUFDakMsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLDBCQUEwQjtnQkFDbkUsQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDakIsS0FBSyxDQUFDLFNBQVM7Z0JBQ2YsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUMxQztnQkFDQSxlQUFlO29CQUNiLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1lBQ0QsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLDBCQUEwQjtnQkFDbkUsS0FBSyxDQUFDLFFBQVE7Z0JBQ2QsS0FBSyxDQUFDLFVBQVU7Z0JBQ2hCLFNBQVMsRUFDVDtnQkFDQSxlQUFlO29CQUNiLGVBQWU7d0JBQ2YsR0FBRzt3QkFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUNoQyxlQUFlO29CQUNiLGVBQWU7d0JBQ2YsR0FBRzt3QkFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixlQUFlO29CQUNiLGVBQWU7d0JBQ2YsR0FBRzt3QkFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsZUFBZSxHQUFHLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztZQUN0RCxPQUFPLGVBQWUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7MkhBMWlCVSw4QkFBOEI7K0dBQTlCLDhCQUE4QiwwSkNyQzNDLG1oS0EwSEE7MkZEckZhLDhCQUE4QjtrQkFMMUMsU0FBUzsrQkFDRSw0QkFBNEIsbUJBRXJCLHVCQUF1QixDQUFDLE1BQU07eVlBR3BCLE1BQU07c0JBQWhDLFlBQVk7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBDb25maWd1cmF0b3JSb3V0ZXIsXG4gIENvbmZpZ3VyYXRvclJvdXRlckV4dHJhY3RvclNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGlvbk1vZGUsXG4gIERpcmVjdGlvblNlcnZpY2UsXG4gIEhhbWJ1cmdlck1lbnVTZXJ2aWNlLFxuICBJQ09OX1RZUEUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1zdG9yZWZyb250LXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yR3JvdXBNZW51U2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdG9yLWdyb3VwLW1lbnUuY29tcG9uZW50LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItZ3JvdXAtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItZ3JvdXAtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JHcm91cE1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkcmVuKCdncm91cEl0ZW0nKSBncm91cHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj47XG5cbiAgcm91dGVyRGF0YSQ6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yUm91dGVyLkRhdGE+ID1cbiAgICB0aGlzLmNvbmZpZ1JvdXRlckV4dHJhY3RvclNlcnZpY2UuZXh0cmFjdFJvdXRlckRhdGEoKTtcblxuICBjb25maWd1cmF0aW9uJDogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj4gPVxuICAgIHRoaXMucm91dGVyRGF0YSQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocm91dGVyRGF0YSkgPT5cbiAgICAgICAgdGhpcy5jb25maWdDb21tb25zU2VydmljZVxuICAgICAgICAgIC5nZXRDb25maWd1cmF0aW9uKHJvdXRlckRhdGEub3duZXIpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+ICh7IHJvdXRlckRhdGEsIGNvbmZpZ3VyYXRpb24gfSkpLFxuICAgICAgICAgICAgLy9XZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHRoZSBuYXZpZ2F0aW9uIHRvIGNvbmZsaWN0IGdyb3VwcyBvclxuICAgICAgICAgICAgLy9ncm91cHMgd2l0aCBtYW5kYXRvcnkgYXR0cmlidXRlcyBhbHJlYWR5IGhhcyB0YWtlbiBwbGFjZSwgYXMgdGhpcyBoYXBwZW5zXG4gICAgICAgICAgICAvL2luIGFuIG9uSW5pdCBvZiBhbm90aGVyIGNvbXBvbmVudC5cbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHdlIHJpc2sgdGhhdCB0aGlzIGNvbXBvbmVudCBpcyBjb21wbGV0ZWx5IGluaXRpYWxpemVkIHRvbyBlYXJseSxcbiAgICAgICAgICAgIC8vaW4gZGV2IG1vZGUgcmVzdWx0aW5nIGluIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JcbiAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgKGNvbnQpID0+XG4gICAgICAgICAgICAgICAgKGNvbnQuY29uZmlndXJhdGlvbi5jb21wbGV0ZSAmJlxuICAgICAgICAgICAgICAgICAgY29udC5jb25maWd1cmF0aW9uLmNvbnNpc3RlbnQpIHx8XG4gICAgICAgICAgICAgICAgY29udC5jb25maWd1cmF0aW9uLmludGVyYWN0aW9uU3RhdGUuaXNzdWVOYXZpZ2F0aW9uRG9uZSB8fFxuICAgICAgICAgICAgICAgICFjb250LnJvdXRlckRhdGEucmVzb2x2ZUlzc3Vlc1xuICAgICAgICAgICAgKVxuICAgICAgICAgIClcblxuICAgICAgICAgIC5waXBlKG1hcCgoY29udCkgPT4gY29udC5jb25maWd1cmF0aW9uKSlcbiAgICAgIClcbiAgICApO1xuXG4gIGN1cnJlbnRHcm91cCQ6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwPiA9IHRoaXMucm91dGVyRGF0YSQucGlwZShcbiAgICBzd2l0Y2hNYXAoKHJvdXRlckRhdGEpID0+XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuZ2V0Q3VycmVudEdyb3VwKHJvdXRlckRhdGEub3duZXIpXG4gICAgKVxuICApO1xuICAvKipcbiAgICogQ3VycmVudCBwYXJlbnQgZ3JvdXAuIFVuZGVmaW5lZCBmb3IgdG9wIGxldmVsIGdyb3Vwc1xuICAgKi9cbiAgZGlzcGxheWVkUGFyZW50R3JvdXAkOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMuY29uZmlndXJhdGlvbiQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY29uZmlndXJhdGlvbikgPT5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLmdldE1lbnVQYXJlbnRHcm91cChjb25maWd1cmF0aW9uLm93bmVyKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgocGFyZW50R3JvdXApID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcmVudEdyb3VwXG4gICAgICAgICAgPyB0aGlzLmdldENvbmRlbnNlZFBhcmVudEdyb3VwKHBhcmVudEdyb3VwKVxuICAgICAgICAgIDogb2YocGFyZW50R3JvdXApO1xuICAgICAgfSlcbiAgICApO1xuXG4gIGRpc3BsYXllZEdyb3VwcyQ6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwW10+ID1cbiAgICB0aGlzLmRpc3BsYXllZFBhcmVudEdyb3VwJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChwYXJlbnRHcm91cCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uJC5waXBlKFxuICAgICAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmVudEdyb3VwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRlbnNlR3JvdXBzKHBhcmVudEdyb3VwLnN1Ykdyb3Vwcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kZW5zZUdyb3Vwcyhjb25maWd1cmF0aW9uLmdyb3Vwcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG4gIEVSUk9SID0gJyBFUlJPUic7XG4gIENPTVBMRVRFID0gJyBDT01QTEVURSc7XG4gIFdBUk5JTkcgPSAnIFdBUk5JTkcnO1xuICBJQ09OID0gJ0lDT04nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWdDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2U6IENvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGhhbWJ1cmdlck1lbnVTZXJ2aWNlOiBIYW1idXJnZXJNZW51U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnVXRpbHM6IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0dyb3VwTWVudVNlcnZpY2U6IENvbmZpZ3VyYXRvckdyb3VwTWVudVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvblNlcnZpY2U6IERpcmVjdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIGNsaWNrKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24kLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChjb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICBpZiAoY29uZmlndXJhdGlvbi5pbnRlcmFjdGlvblN0YXRlLmN1cnJlbnRHcm91cCA9PT0gZ3JvdXAuaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UuaGFzU3ViR3JvdXBzKGdyb3VwKSkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UubmF2aWdhdGVUb0dyb3VwKGNvbmZpZ3VyYXRpb24sIGdyb3VwLmlkKTtcbiAgICAgICAgdGhpcy5oYW1idXJnZXJNZW51U2VydmljZS50b2dnbGUodHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5jb25maWdVdGlscy5zY3JvbGxUb0NvbmZpZ3VyYXRpb25FbGVtZW50KFxuICAgICAgICAgICcuVmFyaWFudENvbmZpZ3VyYXRpb25UZW1wbGF0ZSwgLkNwcUNvbmZpZ3VyYXRpb25UZW1wbGF0ZSdcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdG9yR3JvdXBzU2VydmljZS5zZXRNZW51UGFyZW50R3JvdXAoXG4gICAgICAgICAgY29uZmlndXJhdGlvbi5vd25lcixcbiAgICAgICAgICBncm91cC5pZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmF2aWdhdGVVcCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXllZFBhcmVudEdyb3VwJFxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGRpc3BsYXllZFBhcmVudEdyb3VwKSA9PiB7XG4gICAgICAgIC8vd2Ugb25seSBuYXZpZ2F0ZSB1cCBpZiB3ZSBhcmUgbm90IG9uIGEgc3ViIGxldmVsIGdyb3VwXG4gICAgICAgIGlmIChkaXNwbGF5ZWRQYXJlbnRHcm91cCkge1xuICAgICAgICAgIGNvbnN0IGdyYW5kUGFyZW50R3JvdXAkID0gdGhpcy5nZXRQYXJlbnRHcm91cChkaXNwbGF5ZWRQYXJlbnRHcm91cCk7XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgZ3JhbmRQYXJlbnRHcm91cCQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGdyYW5kUGFyZW50R3JvdXApID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLnNldE1lbnVQYXJlbnRHcm91cChcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uLm93bmVyLFxuICAgICAgICAgICAgICAgIGdyYW5kUGFyZW50R3JvdXAgPyBncmFuZFBhcmVudEdyb3VwLmlkIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBudW1iZXIgb2YgY29uZmxpY3RzIGZvciB0aGUgY3VycmVudCBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gbnVtYmVyIG9mIGNvbmZsaWN0c1xuICAgKi9cbiAgZ2V0Q29uZmxpY3ROdW1iZXIoZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCk6IHN0cmluZyB7XG4gICAgaWYgKFxuICAgICAgZ3JvdXAgJiZcbiAgICAgIGdyb3VwLmdyb3VwVHlwZSA9PT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVJfR1JPVVBcbiAgICApIHtcbiAgICAgIHJldHVybiAnKCcgKyBncm91cC5zdWJHcm91cHMubGVuZ3RoICsgJyknO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY3VycmVudCBncm91cCBoYXMgc3ViZ3JvdXBzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gUmV0dXJucyAndHJ1ZScgaWYgdGhlIGN1cnJlbnQgZ3JvdXAgaGFzIGEgc3ViZ3JvdXBzLCBvdGhlcndpc2UgJ2ZhbHNlJy5cbiAgICovXG4gIGhhc1N1Ykdyb3Vwcyhncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdG9yR3JvdXBzU2VydmljZS5oYXNTdWJHcm91cHMoZ3JvdXApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBvYnNlcnZhYmxlIG9mIHBhcmVudCBncm91cCBmb3IgYSBncm91cFxuICAgKiBAcGFyYW0gZ3JvdXBcbiAgICogQHJldHVybnMgUGFyZW50IGdyb3VwLCB1bmRlZmluZWQgaW4gY2FzZSBpbnB1dCBncm91cCBpcyBhbHJlYWR5IG9uIHJvb3QgbGV2ZWxcbiAgICovXG4gIHByb3RlY3RlZCBnZXRQYXJlbnRHcm91cChcbiAgICBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbiQucGlwZShcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLmdldFBhcmVudEdyb3VwKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzLFxuICAgICAgICAgIGdyb3VwXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZ2V0Q29uZGVuc2VkUGFyZW50R3JvdXAoXG4gICAgcGFyZW50R3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cFxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZD4ge1xuICAgIGlmIChcbiAgICAgIHBhcmVudEdyb3VwICYmXG4gICAgICBwYXJlbnRHcm91cC5zdWJHcm91cHMgJiZcbiAgICAgIHBhcmVudEdyb3VwLnN1Ykdyb3Vwcy5sZW5ndGggPT09IDEgJiZcbiAgICAgIHBhcmVudEdyb3VwLmdyb3VwVHlwZSAhPT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVJfR1JPVVBcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhcmVudEdyb3VwKHBhcmVudEdyb3VwKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGdyb3VwKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGdyb3VwID8gdGhpcy5nZXRDb25kZW5zZWRQYXJlbnRHcm91cChncm91cCkgOiBvZihncm91cCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YocGFyZW50R3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIGNvbmRlbnNlR3JvdXBzKGdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwW10pOiBDb25maWd1cmF0b3IuR3JvdXBbXSB7XG4gICAgcmV0dXJuIGdyb3Vwcy5mbGF0TWFwKChncm91cCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBncm91cC5zdWJHcm91cHMubGVuZ3RoID09PSAxICYmXG4gICAgICAgIGdyb3VwLmdyb3VwVHlwZSAhPT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9IRUFERVJfR1JPVVBcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25kZW5zZUdyb3Vwcyhncm91cC5zdWJHcm91cHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBncm91cCBoYXMgYmVlbiB2aXNpdGVkIGFuZCBpZiB0aGUgZ3JvdXAgaXMgbm90IGEgY29uZmxpY3QgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEN1cnJlbnQgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxib29sZWFuPn0gLSB0cnVlIGlmIHZpc2l0ZWQgYW5kIG5vdCBhIGNvbmZsaWN0IGdyb3VwXG4gICAqL1xuICBpc0dyb3VwVmlzaXRlZChcbiAgICBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwLFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2VcbiAgICAgIC5pc0dyb3VwVmlzaXRlZChjb25maWd1cmF0aW9uLm93bmVyLCBncm91cC5pZClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGlzVmlzaXRlZCkgPT5cbiAgICAgICAgICAgIGlzVmlzaXRlZCAmJlxuICAgICAgICAgICAgIXRoaXMuaXNDb25mbGljdEdyb3VwVHlwZShcbiAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXBUeXBlID8/IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQXG4gICAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHRha2UoMSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY3VycmVudCBncm91cCBpcyBjb25mbGljdCBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwVHlwZX0gZ3JvdXBUeXBlIC0gR3JvdXAgdHlwZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY3VycmVudCBncm91cCBpcyBjb25mbGljdCBvbmUsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKi9cbiAgaXNDb25mbGljdEdyb3VwVHlwZShncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLmlzQ29uZmxpY3RHcm91cFR5cGUoZ3JvdXBUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgZ3JvdXAgaXMgY29uZmxpY3QgaGVhZGVyIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqICBAcmV0dXJuIHtib29sZWFufSAtIFJldHVybnMgJ3RydWUnIGlmIHRoZSBjdXJyZW50IGdyb3VwIGlzIGNvbmZsaWN0IGhlYWRlciBncm91cCwgb3RoZXJ3aXNlICdmYWxzZScuXG4gICAqL1xuICBpc0NvbmZsaWN0SGVhZGVyKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ3JvdXAgJiYgZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGdyb3VwIGlzIGNvbmZsaWN0IGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqICBAcmV0dXJuIHtib29sZWFufSAtIFJldHVybnMgJ3RydWUnIGlmIHRoZSBjdXJyZW50IGdyb3VwIGlzIGNvbmZsaWN0IGdyb3VwLCBvdGhlcndpc2UgJ2ZhbHNlJy5cbiAgICovXG4gIGlzQ29uZmxpY3RHcm91cChncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyb3VwICYmIGdyb3VwLmdyb3VwVHlwZSA9PT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9HUk9VUDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGdyb3VwLXN0YXR1cyBzdHlsZSBjbGFzc2VzIGRlcGVuZGVudCBvbiBjb21wbGV0ZW5lc3MsIGNvbmZsaWN0cywgdmlzaXRlZCBzdGF0dXMgYW5kIGNvbmZpZ3VyYXRvciB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBDdXJyZW50IGdyb3VwXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8Ym9vbGVhbj59IC0gdHJ1ZSBpZiB2aXNpdGVkIGFuZCBub3QgYSBjb25mbGljdCBncm91cFxuICAgKi9cbiAgZ2V0R3JvdXBTdGF0dXNTdHlsZXMoXG4gICAgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCxcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmlzR3JvdXBWaXNpdGVkKGdyb3VwLCBjb25maWd1cmF0aW9uKS5waXBlKFxuICAgICAgbWFwKChpc1Zpc2l0ZWQpID0+IHtcbiAgICAgICAgY29uc3QgQ0xPVURDUFFfQ09ORklHVVJBVE9SX1RZUEUgPSAnQ0xPVURDUFFDT05GSUdVUkFUT1InO1xuICAgICAgICBsZXQgZ3JvdXBTdGF0dXNTdHlsZTogc3RyaW5nID0gJ2N4LW1lbnUtaXRlbSc7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb25maWd1cmF0aW9uLm93bmVyLmNvbmZpZ3VyYXRvclR5cGUgIT09IENMT1VEQ1BRX0NPTkZJR1VSQVRPUl9UWVBFICYmXG4gICAgICAgICAgIWdyb3VwLmNvbnNpc3RlbnRcbiAgICAgICAgKSB7XG4gICAgICAgICAgZ3JvdXBTdGF0dXNTdHlsZSA9IGdyb3VwU3RhdHVzU3R5bGUgKyB0aGlzLldBUk5JTkc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24ub3duZXIuY29uZmlndXJhdG9yVHlwZSAhPT0gQ0xPVURDUFFfQ09ORklHVVJBVE9SX1RZUEUgJiZcbiAgICAgICAgICBncm91cC5jb21wbGV0ZSAmJlxuICAgICAgICAgIGdyb3VwLmNvbnNpc3RlbnQgJiZcbiAgICAgICAgICBpc1Zpc2l0ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgZ3JvdXBTdGF0dXNTdHlsZSA9IGdyb3VwU3RhdHVzU3R5bGUgKyB0aGlzLkNPTVBMRVRFO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZ3JvdXAuY29tcGxldGUgJiYgaXNWaXNpdGVkKSB7XG4gICAgICAgICAgZ3JvdXBTdGF0dXNTdHlsZSA9IGdyb3VwU3RhdHVzU3R5bGUgKyB0aGlzLkVSUk9SO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cFN0YXR1c1N0eWxlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzTFRSRGlyZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpcmVjdGlvblNlcnZpY2UuZ2V0RGlyZWN0aW9uKCkgPT09IERpcmVjdGlvbk1vZGUuTFRSO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzUlRMRGlyZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpcmVjdGlvblNlcnZpY2UuZ2V0RGlyZWN0aW9uKCkgPT09IERpcmVjdGlvbk1vZGUuUlRMO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIHVzZXIgbmF2aWdhdGVzIGludG8gYSBzdWJncm91cCBvZiB0aGUgbWFpbiBncm91cCBtZW51LlxuICAgKlxuICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gS2V5Ym9hcmQgZXZlbnRcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0ndHJ1ZScgaWYgdGhlIHVzZXIgbmF2aWdhdGVzIGludG8gdGhlIHN1Ymdyb3VwLCBvdGhlcndpc2UgJ2ZhbHNlJy5cbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGlzRm9yd2FyZHNOYXZpZ2F0aW9uKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIChldmVudC5jb2RlID09PSAnQXJyb3dSaWdodCcgJiYgdGhpcy5pc0xUUkRpcmVjdGlvbigpKSB8fFxuICAgICAgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0xlZnQnICYmIHRoaXMuaXNSVExEaXJlY3Rpb24oKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIHVzZXIgbmF2aWdhdGVzIGZyb20gYSBzdWJncm91cCBiYWNrIHRvIHRoZSBtYWluIGdyb3VwIG1lbnUuXG4gICAqXG4gICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgLSBLZXlib2FyZCBldmVudFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSd0cnVlJyBpZiB0aGUgdXNlciBuYXZpZ2F0ZXMgYmFjayBpbnRvIHRoZSBtYWluIGdyb3VwIG1lbnUsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNCYWNrTmF2aWdhdGlvbihldmVudDogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAoZXZlbnQuY29kZSA9PT0gJ0Fycm93TGVmdCcgJiYgdGhpcy5pc0xUUkRpcmVjdGlvbigpKSB8fFxuICAgICAgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1JpZ2h0JyAmJiB0aGlzLmlzUlRMRGlyZWN0aW9uKCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2l0Y2hlcyB0aGUgZ3JvdXAgb24gcHJlc3NpbmcgYW4gYXJyb3cga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gS2V5Ym9hcmQgZXZlbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSW5kZXggLSBHcm91cCBpbmRleFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gdGFyZ2V0R3JvdXAgLSBUYXJnZXQgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGN1cnJlbnRHcm91cCAtIEN1cnJlbnQgZ3JvdXBcbiAgICovXG4gIHN3aXRjaEdyb3VwT25BcnJvd1ByZXNzKFxuICAgIGV2ZW50OiBLZXlib2FyZEV2ZW50LFxuICAgIGdyb3VwSW5kZXg6IG51bWJlcixcbiAgICB0YXJnZXRHcm91cDogQ29uZmlndXJhdG9yLkdyb3VwLFxuICAgIGN1cnJlbnRHcm91cDogQ29uZmlndXJhdG9yLkdyb3VwXG4gICk6IHZvaWQge1xuICAgIGlmIChldmVudC5jb2RlID09PSAnQXJyb3dVcCcgfHwgZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgIHRoaXMuY29uZmlnR3JvdXBNZW51U2VydmljZS5zd2l0Y2hHcm91cE9uQXJyb3dQcmVzcyhcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGdyb3VwSW5kZXgsXG4gICAgICAgIHRoaXMuZ3JvdXBzXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0ZvcndhcmRzTmF2aWdhdGlvbihldmVudCkpIHtcbiAgICAgIGlmICh0YXJnZXRHcm91cCAmJiB0aGlzLmhhc1N1Ykdyb3Vwcyh0YXJnZXRHcm91cCkpIHtcbiAgICAgICAgdGhpcy5jbGljayh0YXJnZXRHcm91cCk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNGb3JTdWJHcm91cCh0YXJnZXRHcm91cCwgY3VycmVudEdyb3VwLmlkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNCYWNrTmF2aWdhdGlvbihldmVudCkpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZ0dyb3VwTWVudVNlcnZpY2UuaXNCYWNrQnRuRm9jdXNlZCh0aGlzLmdyb3VwcykpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVVwKCk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNGb3JNYWluTWVudShjdXJyZW50R3JvdXAuaWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJzaXN0cyB0aGUga2V5Ym9hcmQgZm9jdXMgc3RhdGUgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICogZnJvbSB0aGUgbWFpbiBncm91cCBtZW51IGJ5IGJhY2sgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRHcm91cElkIC0gQ3VycmVudCBncm91cCBJRFxuICAgKi9cbiAgc2V0Rm9jdXNGb3JNYWluTWVudShjdXJyZW50R3JvdXBJZD86IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBrZXk6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGN1cnJlbnRHcm91cElkO1xuICAgIHRoaXMuY29uZmlndXJhdGlvbiQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzPy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZ3JvdXAuc3ViR3JvdXBzPy5sZW5ndGggIT09IDEgJiZcbiAgICAgICAgICAodGhpcy5pc0dyb3VwU2VsZWN0ZWQoZ3JvdXAuaWQsIGN1cnJlbnRHcm91cElkKSB8fFxuICAgICAgICAgICAgdGhpcy5jb250YWluc1NlbGVjdGVkR3JvdXAoZ3JvdXAsIGN1cnJlbnRHcm91cElkKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAga2V5ID0gZ3JvdXAuaWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuY29uZmlnVXRpbHMuc2V0Rm9jdXMoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJzaXN0cyB0aGUga2V5Ym9hcmQgZm9jdXMgc3RhdGUgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICogZnJvbSB0aGUgc3ViZ3JvdXAgbWVudSBieSBmb3J3YXJkcyBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cH0gZ3JvdXAgLSBHcm91cFxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudEdyb3VwSWQgLSBDdXJyZW50IGdyb3VwIElEXG4gICAqL1xuICBzZXRGb2N1c0ZvclN1Ykdyb3VwKFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgY3VycmVudEdyb3VwSWQ/OiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgbGV0IGtleTogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ2N4LW1lbnUtYmFjayc7XG4gICAgaWYgKHRoaXMuY29udGFpbnNTZWxlY3RlZEdyb3VwKGdyb3VwLCBjdXJyZW50R3JvdXBJZCkpIHtcbiAgICAgIGtleSA9IGN1cnJlbnRHcm91cElkO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZ1V0aWxzLnNldEZvY3VzKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgcGFyZW50IGdyb3VwIGNvbnRhaW5zIGEgc2VsZWN0ZWQgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEdyb3VwXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50R3JvdXBJZCAtIEN1cnJlbnQgZ3JvdXAgSURcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gJ3RydWUnIGlmIHRoZSBwYXJlbnQgZ3JvdXAgY29udGFpbnMgYSBzZWxlY3RlZCBncm91cCwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGNvbnRhaW5zU2VsZWN0ZWRHcm91cChcbiAgICBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwLFxuICAgIGN1cnJlbnRHcm91cElkPzogc3RyaW5nXG4gICk6IGJvb2xlYW4ge1xuICAgIGxldCBpc0N1cnJlbnRHcm91cEZvdW5kID0gZmFsc2U7XG4gICAgZ3JvdXAuc3ViR3JvdXBzPy5mb3JFYWNoKChzdWJHcm91cCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNHcm91cFNlbGVjdGVkKHN1Ykdyb3VwLmlkLCBjdXJyZW50R3JvdXBJZCkpIHtcbiAgICAgICAgaXNDdXJyZW50R3JvdXBGb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGlzQ3VycmVudEdyb3VwRm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSB0YWIgaW5kZXggZGVwZW5kaW5nIG9uIGlmIHRoZSB0aGUgY3VycmVudCBncm91cCBpcyBzZWxlY3RlZFxuICAgKiBvciB0aGUgcGFyZW50IGdyb3VwIGNvbnRhaW5zIHRoZSBzZWxlY3RlZCBncm91cC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gR3JvdXBcbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRHcm91cElkIC0gQ3VycmVudCBncm91cCBJRFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtIHRhYiBpbmRleFxuICAgKi9cbiAgZ2V0VGFiSW5kZXgoZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCwgY3VycmVudEdyb3VwSWQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuaXNHcm91cFNlbGVjdGVkKGdyb3VwLmlkLCBjdXJyZW50R3JvdXBJZCkgJiZcbiAgICAgICF0aGlzLmNvbnRhaW5zU2VsZWN0ZWRHcm91cChncm91cCwgY3VycmVudEdyb3VwSWQpXG4gICAgKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjdXJyZW50IGdyb3VwIGlzIHNlbGVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGdyb3VwIElEXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW50R3JvdXBJZCAtIEN1cnJlbnQgZ3JvdXAgSURcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gJ3RydWUnIGlmIHRoZSBjdXJyZW50IGdyb3VwIGlzIHNlbGVjdGVkLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgaXNHcm91cFNlbGVjdGVkKGdyb3VwSWQ/OiBzdHJpbmcsIGN1cnJlbnRHcm91cElkPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyb3VwSWQgPT09IGN1cnJlbnRHcm91cElkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGdyb3VwIElEIGZvciBhcmlhLWNvbnRyb2xzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGdyb3VwIElEXG4gICAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9IC0gZ2VuZXJhdGVkIGdyb3VwIElEXG4gICAqL1xuICBjcmVhdGVBcmlhQ29udHJvbHMoZ3JvdXBJZD86IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnVXRpbHMuY3JlYXRlR3JvdXBJZChncm91cElkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYXJpYS1sYWJlbCBmb3IgZ3JvdXAgbWVudSBpdGVtXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gZ3JvdXAgSURcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH0gLSBnZW5lcmF0ZWQgZ3JvdXAgSURcbiAgICovXG4gIGdldEFyaWFMYWJlbChncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogc3RyaW5nIHtcbiAgICBsZXQgdHJhbnNsYXRlZFRleHQgPSAnJztcbiAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAuZ3JvdXBUeXBlICYmIHRoaXMuaXNDb25mbGljdEdyb3VwVHlwZShncm91cC5ncm91cFR5cGUpKSB7XG4gICAgICBpZiAodGhpcy5pc0NvbmZsaWN0SGVhZGVyKGdyb3VwKSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAgICAgLnRyYW5zbGF0ZSgnY29uZmlndXJhdG9yLmExMXkuY29uZmxpY3RzSW5Db25maWd1cmF0aW9uJywge1xuICAgICAgICAgICAgbnVtYmVyT2ZDb25mbGljdHM6IHRoaXMuZ2V0Q29uZmxpY3ROdW1iZXIoZ3JvdXApLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodHJhbnNsYXRlZFRleHQgPSB0ZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2xhdGVkVGV4dCA9IGdyb3VwLmRlc2NyaXB0aW9uID8gZ3JvdXAuZGVzY3JpcHRpb24gOiAnJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc2xhdGlvblxuICAgICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuYTExeS5ncm91cE5hbWUnLCB7XG4gICAgICAgICAgZ3JvdXA6IGdyb3VwLmRlc2NyaXB0aW9uLFxuICAgICAgICB9KVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCh0ZXh0KSA9PiAodHJhbnNsYXRlZFRleHQgPSB0ZXh0KSk7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2xhdGVkVGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gaWQgZm9yIGljb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gcHJlZml4IGZvciB0eXBlIG9mIGljb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBncm91cCBpZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfSAtIGdlbmVyYXRlZCBpY29uIGlkXG4gICAqL1xuICBjcmVhdGVJY29uSWQodHlwZTogSUNPTl9UWVBFLCBncm91cElkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5JQ09OICsgdHlwZSArIGdyb3VwSWQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFyaWEtZGVzY3JpYmVkYnlcbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHN0cmluZz59IC0gYXJpYS1kZXNjcmliZWRieVxuICAgKi9cbiAgZ2V0QXJpYURlc2NyaWJlZGJ5KFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5pc0dyb3VwVmlzaXRlZChncm91cCwgY29uZmlndXJhdGlvbikucGlwZShcbiAgICAgIG1hcCgoaXNWaXNpdGVkKSA9PiB7XG4gICAgICAgIGNvbnN0IENMT1VEQ1BRX0NPTkZJR1VSQVRPUl9UWVBFID0gJ0NMT1VEQ1BRQ09ORklHVVJBVE9SJztcbiAgICAgICAgbGV0IGFyaWFEZXNjcmliZWRieTogc3RyaW5nID0gJyc7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb25maWd1cmF0aW9uLm93bmVyLmNvbmZpZ3VyYXRvclR5cGUgIT09IENMT1VEQ1BRX0NPTkZJR1VSQVRPUl9UWVBFICYmXG4gICAgICAgICAgIWdyb3VwLmNvbnNpc3RlbnQgJiZcbiAgICAgICAgICBncm91cC5ncm91cFR5cGUgJiZcbiAgICAgICAgICAhdGhpcy5pc0NvbmZsaWN0R3JvdXBUeXBlKGdyb3VwLmdyb3VwVHlwZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgYXJpYURlc2NyaWJlZGJ5ID1cbiAgICAgICAgICAgIGFyaWFEZXNjcmliZWRieSArIHRoaXMuY3JlYXRlSWNvbklkKElDT05fVFlQRS5XQVJOSU5HLCBncm91cC5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24ub3duZXIuY29uZmlndXJhdG9yVHlwZSAhPT0gQ0xPVURDUFFfQ09ORklHVVJBVE9SX1RZUEUgJiZcbiAgICAgICAgICBncm91cC5jb21wbGV0ZSAmJlxuICAgICAgICAgIGdyb3VwLmNvbnNpc3RlbnQgJiZcbiAgICAgICAgICBpc1Zpc2l0ZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgYXJpYURlc2NyaWJlZGJ5ID1cbiAgICAgICAgICAgIGFyaWFEZXNjcmliZWRieSArXG4gICAgICAgICAgICAnICcgK1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJY29uSWQoSUNPTl9UWVBFLlNVQ0NFU1MsIGdyb3VwLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWdyb3VwLmNvbXBsZXRlICYmIGlzVmlzaXRlZCkge1xuICAgICAgICAgIGFyaWFEZXNjcmliZWRieSA9XG4gICAgICAgICAgICBhcmlhRGVzY3JpYmVkYnkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSWNvbklkKElDT05fVFlQRS5FUlJPUiwgZ3JvdXAuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc1N1Ykdyb3Vwcyhncm91cCkpIHtcbiAgICAgICAgICBhcmlhRGVzY3JpYmVkYnkgPVxuICAgICAgICAgICAgYXJpYURlc2NyaWJlZGJ5ICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUljb25JZChJQ09OX1RZUEUuQ0FSRVRfUklHSFQsIGdyb3VwLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBhcmlhRGVzY3JpYmVkYnkgPSBhcmlhRGVzY3JpYmVkYnkgKyAnIGluTGlzdE9mR3JvdXBzJztcbiAgICAgICAgcmV0dXJuIGFyaWFEZXNjcmliZWRieTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbmZpZ3VyYXRpb24kIHwgYXN5bmMgYXMgY29uZmlndXJhdGlvbjsgZWxzZSBnaG9zdEdyb3Vwc1wiPlxuICA8ZGl2IGNsYXNzPVwiY3gtZ3JvdXAtbWVudVwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgPHNwYW4gaWQ9XCJsaXN0T2ZHcm91cHNcIiBjbGFzcz1cImN4LXZpc3VhbGx5LWhpZGRlblwiPlxuICAgICAge3sgJ2NvbmZpZ3VyYXRvci5hMTF5Lmxpc3RPZkdyb3VwcycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBpZD1cImluTGlzdE9mR3JvdXBzXCIgY2xhc3M9XCJjeC12aXN1YWxseS1oaWRkZW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIHt7ICdjb25maWd1cmF0b3IuYTExeS5pbkxpc3RPZkdyb3VwcycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvc3Bhbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheWVkR3JvdXBzJCB8IGFzeW5jIGFzIGdyb3Vwc1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN1cnJlbnRHcm91cCQgfCBhc3luYyBhcyBjdXJyZW50R3JvdXBcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgZ3JvdXBzOyBsZXQgZ3JvdXBJbmRleCA9IGluZGV4XCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXllZFBhcmVudEdyb3VwJCB8IGFzeW5jIGFzIHBhcmVudEdyb3VwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICpuZ0lmPVwicGFyZW50R3JvdXAgIT09IG51bGwgJiYgZ3JvdXBJbmRleCA9PT0gMFwiXG4gICAgICAgICAgICAgICNncm91cEl0ZW1cbiAgICAgICAgICAgICAgY2xhc3M9XCJjeC1tZW51LWJhY2tcIlxuICAgICAgICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJmYWxzZVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgaXNDb25mbGljdEdyb3VwVHlwZShwYXJlbnRHcm91cC5ncm91cFR5cGUpXG4gICAgICAgICAgICAgICAgICA/ICgnY29uZmlndXJhdG9yLmExMXkuY29uZmxpY3RCYWNrJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgICAgICAgICAgICAgOiAoJ2NvbmZpZ3VyYXRvci5hMTF5Lmdyb3VwQmFjaycgfCBjeFRyYW5zbGF0ZSlcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImxpc3RPZkdyb3Vwc1wiXG4gICAgICAgICAgICAgIFtjeEZvY3VzXT1cInsga2V5OiAnY3gtbWVudS1iYWNrJyB9XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdmlnYXRlVXAoKVwiXG4gICAgICAgICAgICAgIChrZXlkb3duKT1cIlxuICAgICAgICAgICAgICAgIHN3aXRjaEdyb3VwT25BcnJvd1ByZXNzKCRldmVudCwgZ3JvdXBJbmRleCwgZ3JvdXAsIGN1cnJlbnRHcm91cClcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLkNBUkVUX0xFRlRcIj48L2N4LWljb24+XG4gICAgICAgICAgICAgIHt7ICdjb25maWd1cmF0b3IuYnV0dG9uLmJhY2snIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICNncm91cEl0ZW1cbiAgICAgICAgICAgIGlkPVwie3sgZ3JvdXAuaWQgfX1cIlxuICAgICAgICAgICAgbmdDbGFzcz1cInt7IGdldEdyb3VwU3RhdHVzU3R5bGVzKGdyb3VwLCBjb25maWd1cmF0aW9uKSB8IGFzeW5jIH19XCJcbiAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgW2NsYXNzLkRJU0FCTEVEXT1cIiFncm91cC5jb25maWd1cmFibGVcIlxuICAgICAgICAgICAgW2NsYXNzLmN4LW1lbnUtY29uZmxpY3RdPVwiaXNDb25mbGljdEdyb3VwVHlwZShncm91cC5ncm91cFR5cGUpXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNHcm91cFNlbGVjdGVkKGdyb3VwLmlkLCBjdXJyZW50R3JvdXAuaWQpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlXT1cIiFncm91cC5jb25maWd1cmFibGVcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJcbiAgICAgICAgICAgICAgZ2V0QXJpYURlc2NyaWJlZGJ5KGdyb3VwLCBjb25maWd1cmF0aW9uKSB8IGFzeW5jXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc0dyb3VwU2VsZWN0ZWQoZ3JvdXAuaWQsIGN1cnJlbnRHcm91cC5pZClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJcbiAgICAgICAgICAgICAgaXNHcm91cFNlbGVjdGVkKGdyb3VwLmlkLCBjdXJyZW50R3JvdXAuaWQpXG4gICAgICAgICAgICAgICAgPyBjcmVhdGVBcmlhQ29udHJvbHMoZ3JvdXAuaWQpXG4gICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRBcmlhTGFiZWwoZ3JvdXApXCJcbiAgICAgICAgICAgIFtjeEZvY3VzXT1cIntcbiAgICAgICAgICAgICAga2V5OiBncm91cC5pZFxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiY2xpY2soZ3JvdXApXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJnZXRUYWJJbmRleChncm91cCwgY3VycmVudEdyb3VwLmlkKVwiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJcbiAgICAgICAgICAgICAgc3dpdGNoR3JvdXBPbkFycm93UHJlc3MoJGV2ZW50LCBncm91cEluZGV4LCBncm91cCwgY3VycmVudEdyb3VwKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiB0aXRsZT1cInt7IGdyb3VwLmRlc2NyaXB0aW9uIH19XCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBJbmRpY2F0b3JzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25mbGljdE51bWJlckluZGljYXRvclwiPlxuICAgICAgICAgICAgICAgIHt7IGdldENvbmZsaWN0TnVtYmVyKGdyb3VwKSB9fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyb3VwU3RhdHVzSW5kaWNhdG9yXCI+XG4gICAgICAgICAgICAgICAgPGN4LWljb25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiV0FSTklOR1wiXG4gICAgICAgICAgICAgICAgICBbdHlwZV09XCJpY29uVHlwZXMuV0FSTklOR1wiXG4gICAgICAgICAgICAgICAgICBpZD1cInt7IGNyZWF0ZUljb25JZChpY29uVHlwZXMuV0FSTklORywgZ3JvdXAuaWQpIH19XCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5pY29uQ29uZmxpY3QnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncm91cFN0YXR1c0luZGljYXRvclwiPlxuICAgICAgICAgICAgICAgIDxjeC1pY29uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cIkVSUk9SXCJcbiAgICAgICAgICAgICAgICAgIFt0eXBlXT1cImljb25UeXBlcy5FUlJPUlwiXG4gICAgICAgICAgICAgICAgICBpZD1cInt7IGNyZWF0ZUljb25JZChpY29uVHlwZXMuRVJST1IsIGdyb3VwLmlkKSB9fVwiXG4gICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgICAgICAgICAgICAgICAnY29uZmlndXJhdG9yLmExMXkuaWNvbkluY29tcGxldGUnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgICA8Y3gtaWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJDT01QTEVURVwiXG4gICAgICAgICAgICAgICAgICBbdHlwZV09XCJpY29uVHlwZXMuU1VDQ0VTU1wiXG4gICAgICAgICAgICAgICAgICBpZD1cInt7IGNyZWF0ZUljb25JZChpY29uVHlwZXMuU1VDQ0VTUywgZ3JvdXAuaWQpIH19XCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5pY29uQ29tcGxldGUnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJHcm91cEluZGljYXRvclwiPlxuICAgICAgICAgICAgICAgIDxjeC1pY29uXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc1N1Ykdyb3Vwcyhncm91cClcIlxuICAgICAgICAgICAgICAgICAgW3R5cGVdPVwiaWNvblR5cGVzLkNBUkVUX1JJR0hUXCJcbiAgICAgICAgICAgICAgICAgIGlkPVwie3sgY3JlYXRlSWNvbklkKGljb25UeXBlcy5DQVJFVF9SSUdIVCwgZ3JvdXAuaWQpIH19XCJcbiAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgICAgICAgICAgICdjb25maWd1cmF0b3IuYTExeS5pY29uU3ViR3JvdXAnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPjwvY3gtaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbjxuZy10ZW1wbGF0ZSAjZ2hvc3RHcm91cHM+XG4gIDxkaXYgY2xhc3M9XCJjeC1naG9zdC1ncm91cC1tZW51XCI+XG4gICAgPGRpdlxuICAgICAgKm5nRm9yPVwibGV0IG51bWJlciBvZiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV1cIlxuICAgICAgY2xhc3M9XCJjeC1naG9zdC1tZW51LWl0ZW1cIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjeC1naG9zdC1pdGVtLXRpdGxlIGdob3N0XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==