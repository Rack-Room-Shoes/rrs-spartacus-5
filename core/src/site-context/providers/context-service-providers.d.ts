import { Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';
export declare function initializeContext(configInit: ConfigInitializerService, siteContextRoutesHandler: SiteContextRoutesHandler): () => Promise<import("@spartacus/core").Config>;
export declare const contextServiceProviders: Provider[];
