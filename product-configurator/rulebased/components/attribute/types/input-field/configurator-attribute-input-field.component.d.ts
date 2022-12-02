import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Subscription } from 'rxjs';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfigFormUpdateEvent } from '../../../form/configurator-form.event';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeInputFieldComponent extends ConfiguratorAttributeBaseComponent implements OnInit, OnDestroy {
    protected config: ConfiguratorUISettingsConfig;
    attributeInputForm: UntypedFormControl;
    protected sub: Subscription;
    ownerType: CommonConfigurator.OwnerType;
    attribute: Configurator.Attribute;
    group: string;
    ownerKey: string;
    inputChange: EventEmitter<ConfigFormUpdateEvent>;
    /**
     * In case no config is injected, or when the debounce time is not configured at all,
     * this value will be used as fallback.
     */
    protected readonly FALLBACK_DEBOUNCE_TIME = 500;
    constructor(config: ConfiguratorUISettingsConfig);
    ngOnInit(): void;
    onChange(): void;
    ngOnDestroy(): void;
    /**
     * Checks if the component needs to be marked as required.
     * This is never the case if it is used as sub component for an attribute type which allows an additional value
     * @returns Required?
     */
    get isRequired(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeInputFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeInputFieldComponent, "cx-configurator-attribute-input-field", never, { "ownerType": "ownerType"; "attribute": "attribute"; "group": "group"; "ownerKey": "ownerKey"; }, { "inputChange": "inputChange"; }, never, never, false>;
}
