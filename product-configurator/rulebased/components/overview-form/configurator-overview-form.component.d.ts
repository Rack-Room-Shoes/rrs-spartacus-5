import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewFormComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    attributeOverviewType: typeof Configurator.AttributeOverviewType;
    configuration$: Observable<Configurator.Configuration>;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService);
    /**
     * Does the configuration contain any selected attribute values?
     * @param {Configurator.Configuration} configuration - Current configuration
     * @returns {boolean} - Any attributes available
     */
    hasAttributes(configuration: Configurator.Configuration): boolean;
    /**
     * Verifies whether the next or the previous attributes are same.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {boolean} - 'True' if it is the same attribute, otherwise 'false'
     */
    isSameAttribute(attributes: Configurator.AttributeOverview[], index: number): boolean;
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {string} - corresponding style class
     */
    getStyleClasses(attributes: Configurator.AttributeOverview[], index: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewFormComponent, "cx-configurator-overview-form", never, {}, {}, never, never, false>;
}
