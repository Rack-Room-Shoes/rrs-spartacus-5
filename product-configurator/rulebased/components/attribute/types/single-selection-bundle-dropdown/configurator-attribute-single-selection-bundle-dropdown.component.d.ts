import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../product-card/configurator-attribute-product-card.component';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeSingleSelectionBundleDropdownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent implements OnInit {
    attributeDropDownForm: UntypedFormControl;
    selectionValue: Configurator.Value;
    group: string;
    ngOnInit(): void;
    /**
     * Extract corresponding product card parameters
     *
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(): ConfiguratorAttributeProductCardComponentOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeSingleSelectionBundleDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeSingleSelectionBundleDropdownComponent, "cx-configurator-attribute-single-selection-bundle-dropdown", never, { "group": "group"; }, {}, never, never, false>;
}
