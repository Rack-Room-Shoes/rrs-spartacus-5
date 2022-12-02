import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslationService } from '@spartacus/core';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBaseComponent } from '../base/configurator-attribute-single-selection-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeDropDownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent implements OnInit {
    protected quantityService: ConfiguratorAttributeQuantityService;
    protected translation: TranslationService;
    attributeDropDownForm: UntypedFormControl;
    group: string;
    constructor(quantityService: ConfiguratorAttributeQuantityService, translation: TranslationService);
    ngOnInit(): void;
    getSelectedValue(): Configurator.Value | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeDropDownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeDropDownComponent, "cx-configurator-attribute-drop-down", never, { "group": "group"; }, {}, never, never, false>;
}
