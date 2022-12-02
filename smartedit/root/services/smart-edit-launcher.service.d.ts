import { Location } from '@angular/common';
import { FeatureModulesService } from '@spartacus/core';
import { SmartEditConfig } from '../config/smart-edit-config';
import * as i0 from "@angular/core";
/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
export declare class SmartEditLauncherService {
    protected config: SmartEditConfig;
    protected location: Location;
    protected featureModules: FeatureModulesService;
    private _cmsTicketId;
    get cmsTicketId(): string | undefined;
    constructor(config: SmartEditConfig, location: Location, featureModules: FeatureModulesService);
    /**
     * Lazy loads modules when Spartacus launced inside Smart Edit
     */
    load(): void;
    /**
     * Indicates whether Spartacus is launched in SmartEdit
     */
    isLaunchedInSmartEdit(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartEditLauncherService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SmartEditLauncherService>;
}
