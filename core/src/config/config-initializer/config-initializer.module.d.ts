import { ModuleWithProviders } from '@angular/core';
import { ConfigInitializerService } from './config-initializer.service';
import { ConfigInitializer } from './config-initializer';
import * as i0 from "@angular/core";
export declare function configInitializerFactory(configInitializer: ConfigInitializerService, initializers: ConfigInitializer[]): () => Promise<void>;
export declare function locationInitializedFactory(configInitializer: ConfigInitializerService): Promise<import("@spartacus/core").Config>;
export declare class ConfigInitializerModule {
    static forRoot(): ModuleWithProviders<ConfigInitializerModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigInitializerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ConfigInitializerModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ConfigInitializerModule>;
}
