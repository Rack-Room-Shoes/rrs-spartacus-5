import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeRadioButtonComponent extends ConfiguratorAttributeSingleSelectionBaseComponent implements OnInit {
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected translation: TranslationService;
    attributeRadioButtonForm: UntypedFormControl;
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeRadioButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeRadioButtonComponent, "cx-configurator-attribute-radio-button", never, {}, {}, never, never, false>;
}
