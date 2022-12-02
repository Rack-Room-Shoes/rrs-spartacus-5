import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeMultiSelectionBaseComponent } from '../base/configurator-attribute-multi-selection-base.component';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeCheckBoxListComponent extends ConfiguratorAttributeMultiSelectionBaseComponent implements OnInit {
    protected configUtilsService: ConfiguratorStorefrontUtilsService;
    protected quantityService: ConfiguratorAttributeQuantityService;
    attributeCheckBoxForms: UntypedFormControl[];
    group: string;
    constructor(configUtilsService: ConfiguratorStorefrontUtilsService, quantityService: ConfiguratorAttributeQuantityService);
    ngOnInit(): void;
    get allowZeroValueQuantity(): boolean;
    onSelect(): void;
    onChangeValueQuantity(eventObject: any, valueCode: string, formIndex: number): void;
    onChangeQuantity(eventObject: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCheckBoxListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorAttributeCheckBoxListComponent, "cx-configurator-attribute-checkbox-list", never, { "group": "group"; }, {}, never, never, false>;
}
