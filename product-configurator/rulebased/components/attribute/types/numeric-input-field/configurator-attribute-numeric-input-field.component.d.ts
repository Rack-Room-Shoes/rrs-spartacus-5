import { OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import { ConfiguratorAttributeNumericInputFieldService, ConfiguratorAttributeNumericInterval } from './configurator-attribute-numeric-input-field.component.service';
import * as i0 from "@angular/core";
declare class DefaultSettings {
    numDecimalPlaces: number;
    numTotalLength: number;
    negativeAllowed: boolean;
}
export declare class ConfiguratorAttributeNumericInputFieldComponent extends ConfiguratorAttributeInputFieldComponent implements OnInit, OnDestroy {
    protected configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService;
    protected config: ConfiguratorUISettingsConfig;
    protected translation: TranslationService;
    numericFormatPattern: string;
    locale: string;
    iconType: typeof ICON_TYPE;
    intervals: ConfiguratorAttributeNumericInterval[];
    language: string;
    constructor(configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService, config: ConfiguratorUISettingsConfig, translation: TranslationService);
    /**
     * Do we need to display a validation message
     */
    mustDisplayValidationMessage(): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Returns a concatenated help text for multiple intervals.
     */
    getHelpTextForInterval(): string;
    /**
     * Returns the combined aria text for attribute and value and the interval help text
     */
    getAriaLabelComplete(): string;
    protected getIntervalText(interval: ConfiguratorAttributeNumericInterval): string;
    protected getAdditionalIntervalText(key: string): string;
    protected getInfiniteIntervalText(key: string, value: string): string;
    protected getDefaultSettings(): DefaultSettings;
    protected getInstalledLocale(locale: string): string;
    protected reportMissingLocaleData(lang: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeNumericInputFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeNumericInputFieldComponent, "cx-configurator-attribute-numeric-input-field", never, { "language": "language"; }, {}, never, never, false>;
}
export {};
