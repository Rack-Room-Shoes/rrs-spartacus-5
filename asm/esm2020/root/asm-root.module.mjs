/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AuthHttpHeaderService, AuthService, AuthStorageService, } from '@spartacus/core';
import { AsmLoaderModule } from './asm-loader.module';
import { AsmAuthHttpHeaderService } from './services/asm-auth-http-header.service';
import { AsmAuthStorageService } from './services/asm-auth-storage.service';
import { AsmAuthService } from './services/asm-auth.service';
import * as i0 from "@angular/core";
export class AsmRootModule {
}
AsmRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmRootModule, imports: [AsmLoaderModule] });
AsmRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmRootModule, providers: [
        {
            provide: AuthStorageService,
            useExisting: AsmAuthStorageService,
        },
        {
            provide: AuthService,
            useExisting: AsmAuthService,
        },
        {
            provide: AuthHttpHeaderService,
            useExisting: AsmAuthHttpHeaderService,
        },
    ], imports: [AsmLoaderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AsmLoaderModule],
                    providers: [
                        {
                            provide: AuthStorageService,
                            useExisting: AsmAuthStorageService,
                        },
                        {
                            provide: AuthService,
                            useExisting: AsmAuthService,
                        },
                        {
                            provide: AuthHttpHeaderService,
                            useExisting: AsmAuthHttpHeaderService,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9yb290L2FzbS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLFdBQVcsRUFDWCxrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQW1CN0QsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxZQWhCZCxlQUFlOzJHQWdCZCxhQUFhLGFBZmI7UUFDVDtZQUNFLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsV0FBVyxFQUFFLHFCQUFxQjtTQUNuQztRQUNEO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsV0FBVyxFQUFFLGNBQWM7U0FDNUI7UUFDRDtZQUNFLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsV0FBVyxFQUFFLHdCQUF3QjtTQUN0QztLQUNGLFlBZFMsZUFBZTsyRkFnQmQsYUFBYTtrQkFqQnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsV0FBVyxFQUFFLHFCQUFxQjt5QkFDbkM7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFdBQVcsRUFBRSxjQUFjO3lCQUM1Qjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUscUJBQXFCOzRCQUM5QixXQUFXLEVBQUUsd0JBQXdCO3lCQUN0QztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBdXRoSHR0cEhlYWRlclNlcnZpY2UsXG4gIEF1dGhTZXJ2aWNlLFxuICBBdXRoU3RvcmFnZVNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBc21Mb2FkZXJNb2R1bGUgfSBmcm9tICcuL2FzbS1sb2FkZXIubW9kdWxlJztcbmltcG9ydCB7IEFzbUF1dGhIdHRwSGVhZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXNtLWF1dGgtaHR0cC1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBc21BdXRoU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FzbS1hdXRoLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBc21BdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXNtLWF1dGguc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBc21Mb2FkZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBBdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQXV0aFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQXNtQXV0aFNlcnZpY2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBdXRoSHR0cEhlYWRlclNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogQXNtQXV0aEh0dHBIZWFkZXJTZXJ2aWNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbVJvb3RNb2R1bGUge31cbiJdfQ==