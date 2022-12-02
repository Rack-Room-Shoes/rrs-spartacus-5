import { OnInit } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeFooterComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected configUtils: ConfiguratorStorefrontUtilsService;
    attribute: Configurator.Attribute;
    owner: CommonConfigurator.Owner;
    groupId: string;
    constructor(configUtils: ConfiguratorStorefrontUtilsService);
    iconType: typeof ICON_TYPE;
    showRequiredMessageForUserInput$: Observable<boolean>;
    ngOnInit(): void;
    /**
     * Checks if attribute is a user input typed attribute with empty value.
     * Method will return false for domain based attributes
     * @param {string} input - user input
     */
    isUserInputEmpty(input?: string): boolean;
    protected needsUserInputMessage(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeFooterComponent, "cx-configurator-attribute-footer", never, { "attribute": "attribute"; "owner": "owner"; "groupId": "groupId"; }, {}, never, never, false>;
}
