import { CmsConfig, ConfigInitializerService } from '@spartacus/core';
import { CdcJsService } from './service/cdc-js.service';
import * as i0 from "@angular/core";
export declare function cdcJsFactory(cdcJsService: CdcJsService, configInit: ConfigInitializerService): () => Promise<import("@spartacus/core").Config>;
export declare function defaultCdcComponentsConfig(): CmsConfig;
export declare class CdcRootModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcRootModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CdcRootModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CdcRootModule>;
}
