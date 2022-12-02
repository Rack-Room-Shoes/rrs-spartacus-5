/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ConfigInitializerService, provideDefaultConfigFactory, } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';
import * as i0 from "@angular/core";
export function cdcJsFactory(cdcJsService, configInit) {
    const func = () => configInit
        .getStable('context', 'cdc')
        .pipe(tap(() => {
        cdcJsService.initialize();
    }))
        .toPromise();
    return func;
}
export function defaultCdcComponentsConfig() {
    const config = {
        featureModules: {
            [CDC_FEATURE]: {
                cmsComponents: ['GigyaRaasComponent'],
            },
            // by default core is bundled together with components
            [CDC_CORE_FEATURE]: CDC_FEATURE,
        },
    };
    return config;
}
export class CdcRootModule {
}
CdcRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule });
CdcRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule, providers: [
        provideDefaultConfigFactory(defaultCdcComponentsConfig),
        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
        {
            provide: APP_INITIALIZER,
            useFactory: cdcJsFactory,
            deps: [CdcJsService, ConfigInitializerService],
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultCdcComponentsConfig),
                        { provide: LogoutGuard, useExisting: CdcLogoutGuard },
                        {
                            provide: APP_INITIALIZER,
                            useFactory: cdcJsFactory,
                            deps: [CdcJsService, ConfigInitializerService],
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvcm9vdC9jZGMtcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFFTCx3QkFBd0IsRUFDeEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFeEQsTUFBTSxVQUFVLFlBQVksQ0FDMUIsWUFBMEIsRUFDMUIsVUFBb0M7SUFFcEMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQ2hCLFVBQVU7U0FDUCxTQUFTLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztTQUMzQixJQUFJLENBQ0gsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNQLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FDSDtTQUNBLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEI7SUFDeEMsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDYixhQUFhLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0QztZQUNELHNEQUFzRDtZQUN0RCxDQUFDLGdCQUFnQixDQUFDLEVBQUUsV0FBVztTQUNoQztLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBY0QsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYTsyR0FBYixhQUFhLGFBWGI7UUFDVCwyQkFBMkIsQ0FBQywwQkFBMEIsQ0FBQztRQUN2RCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtRQUNyRDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQztZQUM5QyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0Y7MkZBRVUsYUFBYTtrQkFaekIsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQUMsMEJBQTBCLENBQUM7d0JBQ3ZELEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO3dCQUNyRDs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsVUFBVSxFQUFFLFlBQVk7NEJBQ3hCLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQzs0QkFDOUMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTG9nb3V0R3VhcmQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ0RDX0NPUkVfRkVBVFVSRSwgQ0RDX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBDZGNMb2dvdXRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2NkYy1sb2dvdXQuZ3VhcmQnO1xuaW1wb3J0IHsgQ2RjSnNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2NkYy1qcy5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNkY0pzRmFjdG9yeShcbiAgY2RjSnNTZXJ2aWNlOiBDZGNKc1NlcnZpY2UsXG4gIGNvbmZpZ0luaXQ6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZVxuKSB7XG4gIGNvbnN0IGZ1bmMgPSAoKSA9PlxuICAgIGNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoJ2NvbnRleHQnLCAnY2RjJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGNkY0pzU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gIHJldHVybiBmdW5jO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENkY0NvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtDRENfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydHaWd5YVJhYXNDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgICAvLyBieSBkZWZhdWx0IGNvcmUgaXMgYnVuZGxlZCB0b2dldGhlciB3aXRoIGNvbXBvbmVudHNcbiAgICAgIFtDRENfQ09SRV9GRUFUVVJFXTogQ0RDX0ZFQVRVUkUsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRDZGNDb21wb25lbnRzQ29uZmlnKSxcbiAgICB7IHByb3ZpZGU6IExvZ291dEd1YXJkLCB1c2VFeGlzdGluZzogQ2RjTG9nb3V0R3VhcmQgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICB1c2VGYWN0b3J5OiBjZGNKc0ZhY3RvcnksXG4gICAgICBkZXBzOiBbQ2RjSnNTZXJ2aWNlLCBDb25maWdJbml0aWFsaXplclNlcnZpY2VdLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjUm9vdE1vZHVsZSB7fVxuIl19