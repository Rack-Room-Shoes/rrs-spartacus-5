import { EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare abstract class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected translation: TranslationService;
    loading$: BehaviorSubject<boolean>;
    attribute: Configurator.Attribute;
    ownerKey: string;
    language: string;
    ownerType: string;
    selectionChange: EventEmitter<ConfigFormUpdateEvent>;
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService);
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
    onSelect(value: string): void;
    onSelectAdditionalValue(event: ConfigFormUpdateEvent): void;
    onHandleQuantity(quantity: number): void;
    onChangeQuantity(eventObject: any, form?: UntypedFormControl): void;
    protected getInitialQuantity(form?: UntypedFormControl): number;
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {FormControl} form - Form control
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(form?: UntypedFormControl): ConfiguratorAttributeQuantityComponentOptions;
    /**
     * Extract corresponding price formula parameters.
     * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions;
    /**
     * Extract corresponding value price formula parameters.
     * For the single-selection attribute types only value price should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value?: Configurator.Value): ConfiguratorPriceComponentOptions | undefined;
    protected getSelectedValuePrice(): Configurator.PriceDetails | undefined;
    get isAdditionalValueNumeric(): boolean;
    get isAdditionalValueAlphaNumeric(): boolean;
    getAriaLabel(value: Configurator.Value, attribute: Configurator.Attribute): string;
    getAdditionalValueAriaLabel(): string;
    getAriaLabelWithoutAdditionalValue(value: Configurator.Value, attribute: Configurator.Attribute): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeSingleSelectionBaseComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConfiguratorAttributeSingleSelectionBaseComponent, never, never, { "attribute": "attribute"; "ownerKey": "ownerKey"; "language": "language"; "ownerType": "ownerType"; }, { "selectionChange": "selectionChange"; }, never, never, false>;
}
