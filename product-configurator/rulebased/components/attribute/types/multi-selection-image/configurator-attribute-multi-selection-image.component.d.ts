import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeMultiSelectionImageComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    protected configUtilsService: ConfiguratorStorefrontUtilsService;
    attribute: Configurator.Attribute;
    ownerKey: string;
    selectionChange: EventEmitter<ConfigFormUpdateEvent>;
    constructor(configUtilsService: ConfiguratorStorefrontUtilsService);
    attributeCheckBoxForms: UntypedFormControl[];
    ngOnInit(): void;
    /**
     * Fired when a value has been selected
     * @param index Index of selected value
     */
    onSelect(index: number): void;
    extractValuePriceFormulaParameters(value: Configurator.Value): ConfiguratorPriceComponentOptions | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeMultiSelectionImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeMultiSelectionImageComponent, "cx-configurator-attribute-multi-selection-image", never, { "attribute": "attribute"; "ownerKey": "ownerKey"; }, { "selectionChange": "selectionChange"; }, never, never, false>;
}
