import { OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfiguratorCartService } from '../configurator-cart.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorRouterListener implements OnDestroy {
    protected configuratorCartService: ConfiguratorCartService;
    protected routingService: RoutingService;
    protected subscription: Subscription;
    constructor(configuratorCartService: ConfiguratorCartService, routingService: RoutingService);
    protected observeRouterChanges(): void;
    protected isConfiguratorRelatedRoute(semanticRoute?: string): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorRouterListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorRouterListener>;
}
