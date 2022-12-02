import { ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorTabBarComponent {
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    ghostStyle: boolean;
    routerData$: Observable<ConfiguratorRouter.Data>;
    configuration$: Observable<Configurator.Configuration>;
    isOverviewPage$: Observable<boolean>;
    constructor(configRouterExtractorService: ConfiguratorRouterExtractorService, configuratorCommonsService: ConfiguratorCommonsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTabBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorTabBarComponent, "cx-configurator-tab-bar", never, {}, {}, never, never, false>;
}
