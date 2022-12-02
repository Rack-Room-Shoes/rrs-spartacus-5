/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultCmsModuleConfig } from './config/default-cms-config';
import { CmsService } from './facade/cms.service';
import { PageMetaModule } from './page/page-meta.module';
import { CmsStoreModule } from './store/cms-store.module';
import * as i0 from "@angular/core";
import * as i1 from "./page/page-meta.module";
export class CmsModule {
    static forRoot() {
        return {
            ngModule: CmsModule,
            providers: [CmsService, provideDefaultConfig(defaultCmsModuleConfig)],
        };
    }
}
CmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CmsModule, imports: [CmsStoreModule, i1.PageMetaModule] });
CmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsModule, imports: [CmsStoreModule, PageMetaModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CmsStoreModule, PageMetaModule.forRoot()],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Ntcy9jbXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBSzFELE1BQU0sT0FBTyxTQUFTO0lBQ3BCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3RFLENBQUM7SUFDSixDQUFDOztzR0FOVSxTQUFTO3VHQUFULFNBQVMsWUFGVixjQUFjO3VHQUViLFNBQVMsWUFGVixjQUFjLEVBQUUsY0FBYyxDQUFDLE9BQU8sRUFBRTsyRkFFdkMsU0FBUztrQkFIckIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWctcHJvdmlkZXJzJztcbmltcG9ydCB7IGRlZmF1bHRDbXNNb2R1bGVDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWNtcy1jb25maWcnO1xuaW1wb3J0IHsgQ21zU2VydmljZSB9IGZyb20gJy4vZmFjYWRlL2Ntcy5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VNZXRhTW9kdWxlIH0gZnJvbSAnLi9wYWdlL3BhZ2UtbWV0YS5tb2R1bGUnO1xuaW1wb3J0IHsgQ21zU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL2Ntcy1zdG9yZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ21zU3RvcmVNb2R1bGUsIFBhZ2VNZXRhTW9kdWxlLmZvclJvb3QoKV0sXG59KVxuZXhwb3J0IGNsYXNzIENtc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q21zTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDbXNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtDbXNTZXJ2aWNlLCBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q21zTW9kdWxlQ29uZmlnKV0sXG4gICAgfTtcbiAgfVxufVxuIl19