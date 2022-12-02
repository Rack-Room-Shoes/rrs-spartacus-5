/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule, Optional, } from '@angular/core';
import { ConfigInitializerService } from './config-initializer.service';
import { CONFIG_INITIALIZER, CONFIG_INITIALIZER_FORROOT_GUARD, } from './config-initializer';
import { LOCATION_INITIALIZED } from '@angular/common';
import * as i0 from "@angular/core";
export function configInitializerFactory(configInitializer, initializers) {
    const isReady = () => configInitializer.initialize(initializers);
    return isReady;
}
export function locationInitializedFactory(configInitializer) {
    return configInitializer.getStable().toPromise();
}
export class ConfigInitializerModule {
    static forRoot() {
        return {
            ngModule: ConfigInitializerModule,
            providers: [
                {
                    provide: CONFIG_INITIALIZER_FORROOT_GUARD,
                    useValue: true,
                },
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    useFactory: configInitializerFactory,
                    deps: [
                        ConfigInitializerService,
                        [new Optional(), CONFIG_INITIALIZER],
                    ],
                },
                {
                    // Hold on the initial navigation until the Spartacus configuration is stable
                    provide: LOCATION_INITIALIZED,
                    useFactory: locationInitializedFactory,
                    deps: [ConfigInitializerService],
                },
            ],
        };
    }
}
ConfigInitializerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigInitializerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerModule });
ConfigInitializerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWluaXRpYWxpemVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGVBQWUsRUFFZixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0NBQWdDLEdBRWpDLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRXZELE1BQU0sVUFBVSx3QkFBd0IsQ0FDdEMsaUJBQTJDLEVBQzNDLFlBQWlDO0lBRWpDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUN4QyxpQkFBMkM7SUFFM0MsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBR0QsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZ0NBQWdDO29CQUN6QyxRQUFRLEVBQUUsSUFBSTtpQkFDZjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsVUFBVSxFQUFFLHdCQUF3QjtvQkFDcEMsSUFBSSxFQUFFO3dCQUNKLHdCQUF3Qjt3QkFDeEIsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGtCQUFrQixDQUFDO3FCQUNyQztpQkFDRjtnQkFDRDtvQkFDRSw2RUFBNkU7b0JBQzdFLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFVBQVUsRUFBRSwwQkFBMEI7b0JBQ3RDLElBQUksRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNqQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O29IQTFCVSx1QkFBdUI7cUhBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBRG5DLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFQUF9JTklUSUFMSVpFUixcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSB9IGZyb20gJy4vY29uZmlnLWluaXRpYWxpemVyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ09ORklHX0lOSVRJQUxJWkVSLFxuICBDT05GSUdfSU5JVElBTElaRVJfRk9SUk9PVF9HVUFSRCxcbiAgQ29uZmlnSW5pdGlhbGl6ZXIsXG59IGZyb20gJy4vY29uZmlnLWluaXRpYWxpemVyJztcbmltcG9ydCB7IExPQ0FUSU9OX0lOSVRJQUxJWkVEIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0luaXRpYWxpemVyRmFjdG9yeShcbiAgY29uZmlnSW5pdGlhbGl6ZXI6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgaW5pdGlhbGl6ZXJzOiBDb25maWdJbml0aWFsaXplcltdXG4pIHtcbiAgY29uc3QgaXNSZWFkeSA9ICgpID0+IGNvbmZpZ0luaXRpYWxpemVyLmluaXRpYWxpemUoaW5pdGlhbGl6ZXJzKTtcbiAgcmV0dXJuIGlzUmVhZHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGlvbkluaXRpYWxpemVkRmFjdG9yeShcbiAgY29uZmlnSW5pdGlhbGl6ZXI6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZVxuKSB7XG4gIHJldHVybiBjb25maWdJbml0aWFsaXplci5nZXRTdGFibGUoKS50b1Byb21pc2UoKTtcbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ0luaXRpYWxpemVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb25maWdJbml0aWFsaXplck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29uZmlnSW5pdGlhbGl6ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IENPTkZJR19JTklUSUFMSVpFUl9GT1JST09UX0dVQVJELFxuICAgICAgICAgIHVzZVZhbHVlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNvbmZpZ0luaXRpYWxpemVyRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBDb25maWdJbml0aWFsaXplclNlcnZpY2UsXG4gICAgICAgICAgICBbbmV3IE9wdGlvbmFsKCksIENPTkZJR19JTklUSUFMSVpFUl0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIC8vIEhvbGQgb24gdGhlIGluaXRpYWwgbmF2aWdhdGlvbiB1bnRpbCB0aGUgU3BhcnRhY3VzIGNvbmZpZ3VyYXRpb24gaXMgc3RhYmxlXG4gICAgICAgICAgcHJvdmlkZTogTE9DQVRJT05fSU5JVElBTElaRUQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogbG9jYXRpb25Jbml0aWFsaXplZEZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0NvbmZpZ0luaXRpYWxpemVyU2VydmljZV0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==