import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorGroupTitleComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    ghostStyle: boolean;
    displayedGroup$: Observable<Configurator.Group>;
    iconTypes: typeof ICON_TYPE;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorGroupTitleComponent, "cx-configurator-group-title", never, {}, {}, never, never, false>;
}
