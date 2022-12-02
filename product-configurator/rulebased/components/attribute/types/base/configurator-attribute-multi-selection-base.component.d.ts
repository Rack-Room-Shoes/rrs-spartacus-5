import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare abstract class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    protected quantityService: ConfiguratorAttributeQuantityService;
    loading$: BehaviorSubject<boolean>;
    attribute: Configurator.Attribute;
    ownerKey: string;
    selectionChange: EventEmitter<ConfigFormUpdateEvent>;
    constructor(quantityService: ConfiguratorAttributeQuantityService);
    /**
     * Checks if we are supposed to render a quantity control on attribute level, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker on attribute level?
     */
    get withQuantityOnAttributeLevel(): boolean;
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity(): boolean;
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions(): boolean;
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {number} initialQuantity - Initial quantity
     * @param {boolean} allowZero - Allow zero
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(initialQuantity?: number, allowZero?: boolean): ConfiguratorAttributeQuantityComponentOptions;
    protected onHandleAttributeQuantity(quantity: number): void;
    /**
     * Extract corresponding price formula parameters.
     * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions;
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value: Configurator.Value): ConfiguratorPriceComponentOptions | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeMultiSelectionBaseComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConfiguratorAttributeMultiSelectionBaseComponent, never, never, { "attribute": "attribute"; "ownerKey": "ownerKey"; }, { "selectionChange": "selectionChange"; }, never, never, false>;
}
