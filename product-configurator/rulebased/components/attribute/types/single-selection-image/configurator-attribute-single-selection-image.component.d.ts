import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeSingleSelectionImageComponent extends ConfiguratorAttributeBaseComponent implements OnInit {
    attributeRadioButtonForm: UntypedFormControl;
    attribute: Configurator.Attribute;
    ownerKey: string;
    selectionChange: EventEmitter<ConfigFormUpdateEvent>;
    ngOnInit(): void;
    /**
     * Submits a value.
     *
     * @param {string} value - Selected value
     */
    onClick(value: string): void;
    extractValuePriceFormulaParameters(value?: Configurator.Value): ConfiguratorPriceComponentOptions | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeSingleSelectionImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeSingleSelectionImageComponent, "cx-configurator-attribute-single-selection-image", never, { "attribute": "attribute"; "ownerKey": "ownerKey"; }, { "selectionChange": "selectionChange"; }, never, never, false>;
}
