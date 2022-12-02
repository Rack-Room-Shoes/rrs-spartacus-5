import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export interface ConfiguratorPriceComponentOptions {
    quantity?: number;
    price?: Configurator.PriceDetails;
    priceTotal?: Configurator.PriceDetails;
    isLightedUp?: boolean;
}
export declare class ConfiguratorPriceComponent {
    formula: ConfiguratorPriceComponentOptions;
    /**
     * Retrieves price.
     *
     * @return {string} - value price formula
     */
    get price(): string;
    /**
     * Retrieves the total price.
     *
     * @return {string} - total price formula
     */
    get priceTotal(): string;
    /**
     * Verifies whether quantity with price should be displayed.
     *
     * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
     */
    displayQuantityAndPrice(): boolean;
    /**
     * Verifies whether only price should be displayed.
     *
     * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
     */
    displayPriceOnly(): boolean;
    /**
     * Verifies whether the price formula should be displayed.
     *
     * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
     */
    displayFormula(): boolean;
    /**
     * Retrieves formula for quantity with price.
     *
     * @param {string} formattedQuantity- formatted quantity
     * @return {string} - price formula
     */
    quantityWithPrice(formattedQuantity: string | null): string;
    /**
     * Verifies whether the price is lighted up.
     *
     * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
     */
    isPriceLightedUp(): boolean;
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @return {string} - corresponding style class
     */
    get styleClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorPriceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorPriceComponent, "cx-configurator-price", never, { "formula": "formula"; }, {}, never, never, false>;
}
