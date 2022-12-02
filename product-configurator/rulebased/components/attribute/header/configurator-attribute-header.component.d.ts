import { OnInit } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService, ConfiguratorGroupsService } from '../../../core';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeHeaderComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected configUtils: ConfiguratorStorefrontUtilsService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configuratorUiSettings: ConfiguratorUISettingsConfig;
    attribute: Configurator.Attribute;
    owner: CommonConfigurator.Owner;
    groupId: string;
    groupType: Configurator.GroupType;
    iconTypes: typeof ICON_TYPE;
    showRequiredMessageForDomainAttribute$: Observable<boolean>;
    constructor(configUtils: ConfiguratorStorefrontUtilsService, configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, configuratorUiSettings: ConfiguratorUISettingsConfig);
    ngOnInit(): void;
    /**
     * Get message key for the required message. Is different for multi- and single selection values
     *  @return {string} - required message key
     */
    getRequiredMessageKey(): string;
    protected get isMultiSelection(): boolean;
    protected isSingleSelection(): boolean;
    protected isRequiredAttributeWithDomain(): boolean;
    /**
     * Verifies whether the group type is attribute group
     *
     * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
     */
    isAttributeGroup(): boolean;
    /**
     * Retrieves a certain conflict link key depending on the current group type for translation.
     *
     * @return {string} - the conflict link key
     */
    getConflictMessageKey(): string;
    /**
     * Checks if an image is attached
     * @returns True if an only if at least one image exists
     */
    get hasImage(): boolean;
    /**
     * Returns image attached to the attribute (if available)
     * @returns Image
     */
    get image(): Configurator.Image | undefined;
    /**
     * Navigates to the group.
     */
    navigateToGroup(): void;
    /**
     * Scroll to conflicting attribute
     *
     * @protected
     */
    protected scrollToAttribute(name: string): void;
    findConflictGroupId(configuration: Configurator.Configuration, currentAttribute: Configurator.Attribute): string | undefined;
    protected logError(text: string): void;
    protected focusValue(attribute: Configurator.Attribute): void;
    /**
     * The status of the configuration loading is retrieved twice:
     * firstly, wait that the navigation to the corresponding group is started,
     * secondly, wait that the navigation is completed and
     * finally, invoke the callback function
     *
     * @protected
     */
    protected onNavigationCompleted(callback: () => void): void;
    /**
     * @returns true only if navigation to conflict groups is enabled.
     */
    isNavigationToConflictEnabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeHeaderComponent, "cx-configurator-attribute-header", never, { "attribute": "attribute"; "owner": "owner"; "groupId": "groupId"; "groupType": "groupType"; }, {}, never, never, false>;
}
