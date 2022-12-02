import { Product, ProductService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorProductTitleComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected productService: ProductService;
    ghostStyle: boolean;
    product$: Observable<Product | undefined>;
    showMore: boolean;
    iconTypes: typeof ICON_TYPE;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, productService: ProductService);
    triggerDetails(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorProductTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorProductTitleComponent, "cx-configurator-product-title", never, {}, {}, never, never, false>;
}
