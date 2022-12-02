import { ModuleWithProviders } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes/configurable-routes.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "@ngrx/router-store";
export declare function initConfigurableRoutes(service: ConfigurableRoutesService): () => void;
export declare class RoutingModule {
    static forRoot(): ModuleWithProviders<RoutingModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoutingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RoutingModule, never, [typeof i1.StoreFeatureModule, typeof i2.EffectsFeatureModule, typeof i3.StoreRouterConnectingModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RoutingModule>;
}
