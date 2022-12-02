/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, isDevMode, } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { delay, filter, map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
import * as i1 from "../../service/configurator-storefront-utils.service";
import * as i2 from "../../../core";
import * as i3 from "../../config/configurator-ui-settings.config";
import * as i4 from "@angular/common";
import * as i5 from "@spartacus/storefront";
import * as i6 from "@spartacus/core";
export class ConfiguratorAttributeHeaderComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils, configuratorCommonsService, configuratorGroupsService, configuratorUiSettings) {
        super();
        this.configUtils = configUtils;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configuratorUiSettings = configuratorUiSettings;
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute has a domain of values
         */
        this.showRequiredMessageForDomainAttribute$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => (result ? this.isRequiredAttributeWithDomain() : false)));
    }
    /**
     * Get message key for the required message. Is different for multi- and single selection values
     *  @return {string} - required message key
     */
    getRequiredMessageKey() {
        if (this.isSingleSelection()) {
            return this.isWithAdditionalValues(this.attribute)
                ? 'configurator.attribute.singleSelectAdditionalRequiredMessage'
                : 'configurator.attribute.singleSelectRequiredMessage';
        }
        else if (this.isMultiSelection) {
            return 'configurator.attribute.multiSelectRequiredMessage';
        }
        else {
            //input attribute types
            return 'configurator.attribute.singleSelectRequiredMessage';
        }
    }
    get isMultiSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isSingleSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isRequiredAttributeWithDomain() {
        const uiType = this.attribute.uiType;
        return ((this.attribute.required &&
            this.attribute.incomplete &&
            uiType !== Configurator.UiType.NOT_IMPLEMENTED &&
            uiType !== Configurator.UiType.STRING &&
            uiType !== Configurator.UiType.NUMERIC) ??
            false);
    }
    /**
     * Verifies whether the group type is attribute group
     *
     * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
     */
    isAttributeGroup() {
        if (Configurator.GroupType.ATTRIBUTE_GROUP === this.groupType) {
            return true;
        }
        return false;
    }
    /**
     * Retrieves a certain conflict link key depending on the current group type for translation.
     *
     * @return {string} - the conflict link key
     */
    getConflictMessageKey() {
        return this.groupType === Configurator.GroupType.CONFLICT_GROUP
            ? 'configurator.conflict.viewConfigurationDetails'
            : this.isNavigationToConflictEnabled()
                ? 'configurator.conflict.viewConflictDetails'
                : 'configurator.conflict.conflictDetected';
    }
    /**
     * Checks if an image is attached
     * @returns True if an only if at least one image exists
     */
    get hasImage() {
        const images = this.attribute.images;
        return images ? images.length > 0 : false;
    }
    /**
     * Returns image attached to the attribute (if available)
     * @returns Image
     */
    get image() {
        const images = this.attribute.images;
        return images && this.hasImage ? images[0] : undefined;
    }
    /**
     * Navigates to the group.
     */
    navigateToGroup() {
        this.configuratorCommonsService
            .getConfiguration(this.owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            let groupId;
            if (this.groupType === Configurator.GroupType.CONFLICT_GROUP) {
                groupId = this.attribute.groupId;
            }
            else {
                groupId = this.findConflictGroupId(configuration, this.attribute);
            }
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusValue(this.attribute);
                this.scrollToAttribute(this.attribute.name);
            }
            else {
                this.logError('Attribute was not found in any conflict group. Note that for this navigation, commerce 22.05 or later is required. Consider to disable setting "enableNavigationToConflict"');
            }
        });
    }
    /**
     * Scroll to conflicting attribute
     *
     * @protected
     */
    scrollToAttribute(name) {
        this.onNavigationCompleted(() => this.configUtils.scrollToConfigurationElement('#' + this.createAttributeUiKey('label', name)));
    }
    findConflictGroupId(configuration, currentAttribute) {
        return configuration.flatGroups
            .filter((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP)
            .find((group) => {
            return group.attributes?.find((attribute) => attribute.key === currentAttribute.key);
        })?.id;
    }
    logError(text) {
        if (isDevMode()) {
            console.error(text);
        }
    }
    focusValue(attribute) {
        this.onNavigationCompleted(() => this.configUtils.focusValue(attribute));
    }
    /**
     * The status of the configuration loading is retrieved twice:
     * firstly, wait that the navigation to the corresponding group is started,
     * secondly, wait that the navigation is completed and
     * finally, invoke the callback function
     *
     * @protected
     */
    onNavigationCompleted(callback) {
        this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => isLoading), take(1), switchMap(() => this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => !isLoading), take(1), delay(0) //we need to consider the re-rendering of the page
        )))
            .subscribe(callback);
    }
    /**
     * @returns true only if navigation to conflict groups is enabled.
     */
    isNavigationToConflictEnabled() {
        return (this.configuratorUiSettings.productConfigurator
            ?.enableNavigationToConflict ?? false);
    }
}
ConfiguratorAttributeHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, deps: [{ token: i1.ConfiguratorStorefrontUtilsService }, { token: i2.ConfiguratorCommonsService }, { token: i2.ConfiguratorGroupsService }, { token: i3.ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeHeaderComponent, selector: "cx-configurator-attribute-header", inputs: { attribute: "attribute", owner: "owner", groupId: "groupId", groupType: "groupType" }, usesInheritance: true, ngImport: i0, template: "<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ attribute.label }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isAttributeGroup() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isAttributeGroup() ? true : false\"\n  [attr.role]=\"isAttributeGroup() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isAttributeGroup()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"cx-conflict-msg link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    class=\"cx-conflict-msg link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ attribute.label }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isAttributeGroup() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isAttributeGroup() ? true : false\"\n  [attr.role]=\"isAttributeGroup() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isAttributeGroup()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"cx-conflict-msg link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    class=\"cx-conflict-msg link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorStorefrontUtilsService }, { type: i2.ConfiguratorCommonsService }, { type: i2.ConfiguratorGroupsService }, { type: i3.ConfiguratorUISettingsConfig }]; }, propDecorators: { attribute: [{
                type: Input
            }], owner: [{
                type: Input
            }], groupId: [{
                type: Input
            }], groupType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9oZWFkZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9oZWFkZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBR3RFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFEQUFxRCxDQUFDOzs7Ozs7OztBQU96RyxNQUFNLE9BQU8sb0NBQ1gsU0FBUSxrQ0FBa0M7SUFXMUMsWUFDWSxXQUErQyxFQUMvQywwQkFBc0QsRUFDdEQseUJBQW9ELEVBQ3BELHNCQUFvRDtRQUU5RCxLQUFLLEVBQUUsQ0FBQztRQUxFLGdCQUFXLEdBQVgsV0FBVyxDQUFvQztRQUMvQywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FB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QUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIGlzRGV2TW9kZSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbkNvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLFxuICBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi8uLi9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlndXJhdG9yLXVpLXNldHRpbmdzLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9jb25maWd1cmF0b3Itc3RvcmVmcm9udC11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQgfSBmcm9tICcuLi90eXBlcy9iYXNlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtYmFzZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYXR0cmlidXRlLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVIZWFkZXJDb21wb25lbnRcbiAgZXh0ZW5kcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0XG57XG4gIEBJbnB1dCgpIGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZTtcbiAgQElucHV0KCkgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcjtcbiAgQElucHV0KCkgZ3JvdXBJZDogc3RyaW5nO1xuICBASW5wdXQoKSBncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGU7XG5cbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuICBzaG93UmVxdWlyZWRNZXNzYWdlRm9yRG9tYWluQXR0cmlidXRlJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnVXRpbHM6IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlOiBDb25maWd1cmF0b3JDb21tb25zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yR3JvdXBzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yVWlTZXR0aW5nczogQ29uZmlndXJhdG9yVUlTZXR0aW5nc0NvbmZpZ1xuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8qKlxuICAgICAqIFNob3cgbWVzc2FnZSB0aGF0IGluZGljYXRlcyB0aGF0IGF0dHJpYnV0ZSBpcyByZXF1aXJlZCBpbiBjYXNlIGF0dHJpYnV0ZSBoYXMgYSBkb21haW4gb2YgdmFsdWVzXG4gICAgICovXG4gICAgdGhpcy5zaG93UmVxdWlyZWRNZXNzYWdlRm9yRG9tYWluQXR0cmlidXRlJCA9IHRoaXMuY29uZmlnVXRpbHNcbiAgICAgIC5pc0NhcnRFbnRyeU9yR3JvdXBWaXNpdGVkKHRoaXMub3duZXIsIHRoaXMuZ3JvdXBJZClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlc3VsdCkgPT4gKHJlc3VsdCA/IHRoaXMuaXNSZXF1aXJlZEF0dHJpYnV0ZVdpdGhEb21haW4oKSA6IGZhbHNlKSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG1lc3NhZ2Uga2V5IGZvciB0aGUgcmVxdWlyZWQgbWVzc2FnZS4gSXMgZGlmZmVyZW50IGZvciBtdWx0aS0gYW5kIHNpbmdsZSBzZWxlY3Rpb24gdmFsdWVzXG4gICAqICBAcmV0dXJuIHtzdHJpbmd9IC0gcmVxdWlyZWQgbWVzc2FnZSBrZXlcbiAgICovXG4gIGdldFJlcXVpcmVkTWVzc2FnZUtleSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzV2l0aEFkZGl0aW9uYWxWYWx1ZXModGhpcy5hdHRyaWJ1dGUpXG4gICAgICAgID8gJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUuc2luZ2xlU2VsZWN0QWRkaXRpb25hbFJlcXVpcmVkTWVzc2FnZSdcbiAgICAgICAgOiAnY29uZmlndXJhdG9yLmF0dHJpYnV0ZS5zaW5nbGVTZWxlY3RSZXF1aXJlZE1lc3NhZ2UnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc011bHRpU2VsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gJ2NvbmZpZ3VyYXRvci5hdHRyaWJ1dGUubXVsdGlTZWxlY3RSZXF1aXJlZE1lc3NhZ2UnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2lucHV0IGF0dHJpYnV0ZSB0eXBlc1xuICAgICAgcmV0dXJuICdjb25maWd1cmF0b3IuYXR0cmlidXRlLnNpbmdsZVNlbGVjdFJlcXVpcmVkTWVzc2FnZSc7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBpc011bHRpU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHN3aXRjaCAodGhpcy5hdHRyaWJ1dGUudWlUeXBlKSB7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuQ0hFQ0tCT1hMSVNUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YTElTVF9QUk9EVUNUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLk1VTFRJX1NFTEVDVElPTl9JTUFHRToge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzU2luZ2xlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHN3aXRjaCAodGhpcy5hdHRyaWJ1dGUudWlUeXBlKSB7XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT046XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuUkFESU9CVVRUT05fQURESVRJT05BTF9JTlBVVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5SQURJT0JVVFRPTl9QUk9EVUNUOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkNIRUNLQk9YOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOOlxuICAgICAgY2FzZSBDb25maWd1cmF0b3IuVWlUeXBlLkRST1BET1dOX0FERElUSU9OQUxfSU5QVVQ6XG4gICAgICBjYXNlIENvbmZpZ3VyYXRvci5VaVR5cGUuRFJPUERPV05fUFJPRFVDVDpcbiAgICAgIGNhc2UgQ29uZmlndXJhdG9yLlVpVHlwZS5TSU5HTEVfU0VMRUNUSU9OX0lNQUdFOiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNSZXF1aXJlZEF0dHJpYnV0ZVdpdGhEb21haW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdWlUeXBlID0gdGhpcy5hdHRyaWJ1dGUudWlUeXBlO1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5hdHRyaWJ1dGUucmVxdWlyZWQgJiZcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUuaW5jb21wbGV0ZSAmJlxuICAgICAgICB1aVR5cGUgIT09IENvbmZpZ3VyYXRvci5VaVR5cGUuTk9UX0lNUExFTUVOVEVEICYmXG4gICAgICAgIHVpVHlwZSAhPT0gQ29uZmlndXJhdG9yLlVpVHlwZS5TVFJJTkcgJiZcbiAgICAgICAgdWlUeXBlICE9PSBDb25maWd1cmF0b3IuVWlUeXBlLk5VTUVSSUMpID8/XG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgZ3JvdXAgdHlwZSBpcyBhdHRyaWJ1dGUgZ3JvdXBcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSAndHJ1ZScgaWYgdGhlIGdyb3VwIHR5cGUgaXMgJ2F0dHJpYnV0ZSBncm91cCcgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzQXR0cmlidXRlR3JvdXAoKTogYm9vbGVhbiB7XG4gICAgaWYgKENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQVRUUklCVVRFX0dST1VQID09PSB0aGlzLmdyb3VwVHlwZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBjZXJ0YWluIGNvbmZsaWN0IGxpbmsga2V5IGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBncm91cCB0eXBlIGZvciB0cmFuc2xhdGlvbi5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBjb25mbGljdCBsaW5rIGtleVxuICAgKi9cbiAgZ2V0Q29uZmxpY3RNZXNzYWdlS2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgICA/ICdjb25maWd1cmF0b3IuY29uZmxpY3Qudmlld0NvbmZpZ3VyYXRpb25EZXRhaWxzJ1xuICAgICAgOiB0aGlzLmlzTmF2aWdhdGlvblRvQ29uZmxpY3RFbmFibGVkKClcbiAgICAgID8gJ2NvbmZpZ3VyYXRvci5jb25mbGljdC52aWV3Q29uZmxpY3REZXRhaWxzJ1xuICAgICAgOiAnY29uZmlndXJhdG9yLmNvbmZsaWN0LmNvbmZsaWN0RGV0ZWN0ZWQnO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBpbWFnZSBpcyBhdHRhY2hlZFxuICAgKiBAcmV0dXJucyBUcnVlIGlmIGFuIG9ubHkgaWYgYXQgbGVhc3Qgb25lIGltYWdlIGV4aXN0c1xuICAgKi9cbiAgZ2V0IGhhc0ltYWdlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGltYWdlcyA9IHRoaXMuYXR0cmlidXRlLmltYWdlcztcbiAgICByZXR1cm4gaW1hZ2VzID8gaW1hZ2VzLmxlbmd0aCA+IDAgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGltYWdlIGF0dGFjaGVkIHRvIHRoZSBhdHRyaWJ1dGUgKGlmIGF2YWlsYWJsZSlcbiAgICogQHJldHVybnMgSW1hZ2VcbiAgICovXG4gIGdldCBpbWFnZSgpOiBDb25maWd1cmF0b3IuSW1hZ2UgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGltYWdlcyA9IHRoaXMuYXR0cmlidXRlLmltYWdlcztcbiAgICByZXR1cm4gaW1hZ2VzICYmIHRoaXMuaGFzSW1hZ2UgPyBpbWFnZXNbMF0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIHRoZSBncm91cC5cbiAgICovXG4gIG5hdmlnYXRlVG9Hcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlndXJhdGlvbih0aGlzLm93bmVyKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgbGV0IGdyb3VwSWQ7XG4gICAgICAgIGlmICh0aGlzLmdyb3VwVHlwZSA9PT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9HUk9VUCkge1xuICAgICAgICAgIGdyb3VwSWQgPSB0aGlzLmF0dHJpYnV0ZS5ncm91cElkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyb3VwSWQgPSB0aGlzLmZpbmRDb25mbGljdEdyb3VwSWQoY29uZmlndXJhdGlvbiwgdGhpcy5hdHRyaWJ1dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cElkKSB7XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLm5hdmlnYXRlVG9Hcm91cChcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICBncm91cElkXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmZvY3VzVmFsdWUodGhpcy5hdHRyaWJ1dGUpO1xuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9BdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dFcnJvcihcbiAgICAgICAgICAgICdBdHRyaWJ1dGUgd2FzIG5vdCBmb3VuZCBpbiBhbnkgY29uZmxpY3QgZ3JvdXAuIE5vdGUgdGhhdCBmb3IgdGhpcyBuYXZpZ2F0aW9uLCBjb21tZXJjZSAyMi4wNSBvciBsYXRlciBpcyByZXF1aXJlZC4gQ29uc2lkZXIgdG8gZGlzYWJsZSBzZXR0aW5nIFwiZW5hYmxlTmF2aWdhdGlvblRvQ29uZmxpY3RcIidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdG8gY29uZmxpY3RpbmcgYXR0cmlidXRlXG4gICAqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBzY3JvbGxUb0F0dHJpYnV0ZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLm9uTmF2aWdhdGlvbkNvbXBsZXRlZCgoKSA9PlxuICAgICAgdGhpcy5jb25maWdVdGlscy5zY3JvbGxUb0NvbmZpZ3VyYXRpb25FbGVtZW50KFxuICAgICAgICAnIycgKyB0aGlzLmNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdsYWJlbCcsIG5hbWUpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGZpbmRDb25mbGljdEdyb3VwSWQoXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24sXG4gICAgY3VycmVudEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBjb25maWd1cmF0aW9uLmZsYXRHcm91cHNcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIChncm91cCkgPT4gZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgICApXG4gICAgICAuZmluZCgoZ3JvdXApID0+IHtcbiAgICAgICAgcmV0dXJuIGdyb3VwLmF0dHJpYnV0ZXM/LmZpbmQoXG4gICAgICAgICAgKGF0dHJpYnV0ZSkgPT4gYXR0cmlidXRlLmtleSA9PT0gY3VycmVudEF0dHJpYnV0ZS5rZXlcbiAgICAgICAgKTtcbiAgICAgIH0pPy5pZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2dFcnJvcih0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IodGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZvY3VzVmFsdWUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogdm9pZCB7XG4gICAgdGhpcy5vbk5hdmlnYXRpb25Db21wbGV0ZWQoKCkgPT4gdGhpcy5jb25maWdVdGlscy5mb2N1c1ZhbHVlKGF0dHJpYnV0ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzdGF0dXMgb2YgdGhlIGNvbmZpZ3VyYXRpb24gbG9hZGluZyBpcyByZXRyaWV2ZWQgdHdpY2U6XG4gICAqIGZpcnN0bHksIHdhaXQgdGhhdCB0aGUgbmF2aWdhdGlvbiB0byB0aGUgY29ycmVzcG9uZGluZyBncm91cCBpcyBzdGFydGVkLFxuICAgKiBzZWNvbmRseSwgd2FpdCB0aGF0IHRoZSBuYXZpZ2F0aW9uIGlzIGNvbXBsZXRlZCBhbmRcbiAgICogZmluYWxseSwgaW52b2tlIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgb25OYXZpZ2F0aW9uQ29tcGxldGVkKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgLmlzQ29uZmlndXJhdGlvbkxvYWRpbmcodGhpcy5vd25lcilcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGlzTG9hZGluZykgPT4gaXNMb2FkaW5nKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgICAgICAgLmlzQ29uZmlndXJhdGlvbkxvYWRpbmcodGhpcy5vd25lcilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIoKGlzTG9hZGluZykgPT4gIWlzTG9hZGluZyksXG4gICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgIGRlbGF5KDApIC8vd2UgbmVlZCB0byBjb25zaWRlciB0aGUgcmUtcmVuZGVyaW5nIG9mIHRoZSBwYWdlXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICB9XG4gIC8qKlxuICAgKiBAcmV0dXJucyB0cnVlIG9ubHkgaWYgbmF2aWdhdGlvbiB0byBjb25mbGljdCBncm91cHMgaXMgZW5hYmxlZC5cbiAgICovXG4gIGlzTmF2aWdhdGlvblRvQ29uZmxpY3RFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRvclVpU2V0dGluZ3MucHJvZHVjdENvbmZpZ3VyYXRvclxuICAgICAgICA/LmVuYWJsZU5hdmlnYXRpb25Ub0NvbmZsaWN0ID8/IGZhbHNlXG4gICAgKTtcbiAgfVxufVxuIiwiPGxhYmVsXG4gIGlkPVwie3sgY3JlYXRlQXR0cmlidXRlVWlLZXkoJ2xhYmVsJywgYXR0cmlidXRlLm5hbWUpIH19XCJcbiAgW2NsYXNzLmN4LXJlcXVpcmVkLWVycm9yXT1cInNob3dSZXF1aXJlZE1lc3NhZ2VGb3JEb21haW5BdHRyaWJ1dGUkIHwgYXN5bmNcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICFhdHRyaWJ1dGUucmVxdWlyZWRcbiAgICAgID8gKCdjb25maWd1cmF0b3IuYTExeS5hdHRyaWJ1dGUnXG4gICAgICAgIHwgY3hUcmFuc2xhdGU6IHsgYXR0cmlidXRlOiBhdHRyaWJ1dGUubGFiZWwgfSlcbiAgICAgIDogKCdjb25maWd1cmF0b3IuYTExeS5yZXF1aXJlZEF0dHJpYnV0ZSdcbiAgICAgICAgfCBjeFRyYW5zbGF0ZTogeyBwYXJhbTogYXR0cmlidXRlLmxhYmVsIH0pXG4gIFwiXG4gID48c3BhblxuICAgIFtjbGFzcy5jeC1yZXF1aXJlZC1pY29uXT1cImF0dHJpYnV0ZS5yZXF1aXJlZFwiXG4gICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJjcmVhdGVBdHRyaWJ1dGVVaUtleSgnbGFiZWwnLCBhdHRyaWJ1dGUubmFtZSlcIlxuICAgID57eyBhdHRyaWJ1dGUubGFiZWwgfX08L3NwYW5cbiAgPjwvbGFiZWxcbj5cbjxkaXZcbiAgKm5nSWY9XCJhdHRyaWJ1dGUuaGFzQ29uZmxpY3RzXCJcbiAgY2xhc3M9XCJjeC1jb25mbGljdC1tc2dcIlxuICBpZD1cInt7IGNyZWF0ZUF0dHJpYnV0ZVVpS2V5KCdhdHRyaWJ1dGUtbXNnJywgYXR0cmlidXRlLm5hbWUpIH19XCJcbiAgW2F0dHIuYXJpYS1saXZlXT1cImlzQXR0cmlidXRlR3JvdXAoKSA/ICdhc3NlcnRpdmUnIDogJ29mZidcIlxuICBbYXR0ci5hcmlhLWF0b21pY109XCJpc0F0dHJpYnV0ZUdyb3VwKCkgPyB0cnVlIDogZmFsc2VcIlxuICBbYXR0ci5yb2xlXT1cImlzQXR0cmlidXRlR3JvdXAoKSA/ICdhbGVydCcgOiBudWxsXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICBpc0F0dHJpYnV0ZUdyb3VwKClcbiAgICAgID8gKCdjb25maWd1cmF0b3IuYTExeS5jb25mbGljdERldGVjdGVkJyB8IGN4VHJhbnNsYXRlKVxuICAgICAgOiAnJ1xuICBcIlxuPlxuICA8Y3gtaWNvblxuICAgICpuZ0lmPVwiaXNBdHRyaWJ1dGVHcm91cCgpXCJcbiAgICBbdHlwZV09XCJpY29uVHlwZXMuV0FSTklOR1wiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgPjwvY3gtaWNvbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQXR0cmlidXRlR3JvdXAoKTsgZWxzZSBjb25mbGljdEdyb3VwXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTmF2aWdhdGlvblRvQ29uZmxpY3RFbmFibGVkKCk7IGVsc2Ugd2l0aG91dExpbmtcIj5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzPVwiY3gtY29uZmxpY3QtbXNnIGxpbmsgY3gtYWN0aW9uLWxpbmtcIlxuICAgICAgICAoY2xpY2spPVwibmF2aWdhdGVUb0dyb3VwKClcIlxuICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJuYXZpZ2F0ZVRvR3JvdXAoKVwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lm5hdmlnYXRlVG9Db25mbGljdCdcbiAgICAgICAgICAgIHwgY3hUcmFuc2xhdGU6IHsgYXR0cmlidXRlOiBhdHRyaWJ1dGUubGFiZWwgfVxuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICB7eyBnZXRDb25mbGljdE1lc3NhZ2VLZXkoKSB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L2E+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2XG4gICpuZ0lmPVwic2hvd1JlcXVpcmVkTWVzc2FnZUZvckRvbWFpbkF0dHJpYnV0ZSQgfCBhc3luY1wiXG4gIGNsYXNzPVwiY3gtcmVxdWlyZWQtZXJyb3ItbXNnXCJcbiAgaWQ9XCJ7eyBjcmVhdGVBdHRyaWJ1dGVVaUtleSgnYXR0cmlidXRlLW1zZycsIGF0dHJpYnV0ZS5uYW1lKSB9fVwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0UmVxdWlyZWRNZXNzYWdlS2V5KCkgfCBjeFRyYW5zbGF0ZVwiXG4+XG4gIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5FUlJPUlwiPjwvY3gtaWNvbj5cbiAge3sgZ2V0UmVxdWlyZWRNZXNzYWdlS2V5KCkgfCBjeFRyYW5zbGF0ZSB9fVxuPC9kaXY+XG48aW1nXG4gICpuZ0lmPVwiaGFzSW1hZ2VcIlxuICBjbGFzcz1cImN4LWF0dHJpYnV0ZS1pbWdcIlxuICBzcmM9XCJ7eyBpbWFnZT8udXJsIH19XCJcbiAgYWx0PVwie3sgaW1hZ2U/LmFsdFRleHQgfX1cIlxuLz5cblxuPG5nLXRlbXBsYXRlICNjb25mbGljdEdyb3VwPlxuICA8YVxuICAgIGNsYXNzPVwiY3gtY29uZmxpY3QtbXNnIGxpbmsgY3gtYWN0aW9uLWxpbmtcIlxuICAgIChjbGljayk9XCJuYXZpZ2F0ZVRvR3JvdXAoKVwiXG4gICAgKGtleWRvd24uZW50ZXIpPVwibmF2aWdhdGVUb0dyb3VwKClcIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gID5cbiAgICB7eyBnZXRDb25mbGljdE1lc3NhZ2VLZXkoKSB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYT5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjd2l0aG91dExpbms+XG4gIDxkaXYgY2xhc3M9XCJjeC1jb25mbGljdC1tc2dcIj5cbiAgICB7eyBnZXRDb25mbGljdE1lc3NhZ2VLZXkoKSB8IGN4VHJhbnNsYXRlIH19XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==