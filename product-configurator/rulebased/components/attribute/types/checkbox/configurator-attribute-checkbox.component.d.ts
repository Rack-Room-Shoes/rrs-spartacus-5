import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeCheckBoxComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    attribute: Configurator.Attribute;
    group: string;
    ownerKey: string;
    selectionChange: EventEmitter<ConfigFormUpdateEvent>;
    attributeCheckBoxForm: UntypedFormControl;
    ngOnInit(): void;
    /**
     * Fired when a check box has been selected i.e. when a value has been set
     */
    onSelect(): void;
    protected assembleSingleValue(): Configurator.Value[];
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value: Configurator.Value): ConfiguratorPriceComponentOptions | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCheckBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeCheckBoxComponent, "cx-configurator-attribute-checkbox", never, { "attribute": "attribute"; "group": "group"; "ownerKey": "ownerKey"; }, { "selectionChange": "selectionChange"; }, never, never, false>;
}
