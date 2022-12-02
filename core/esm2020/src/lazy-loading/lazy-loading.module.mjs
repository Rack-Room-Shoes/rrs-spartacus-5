/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule, Optional, } from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import { MODULE_INITIALIZER } from './tokens';
import * as i0 from "@angular/core";
export function moduleInitializersFactory(lazyModuleService, moduleInitializerFunctions) {
    const factoryFunction = () => {
        return Promise.all(lazyModuleService.runModuleInitializerFunctions(moduleInitializerFunctions)).catch((error) => {
            console.error('MODULE_INITIALIZER promise was rejected during app initialization.', error);
            throw error;
        });
    };
    return factoryFunction;
}
export class LazyLoadingModule {
    static forRoot() {
        return {
            ngModule: LazyLoadingModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: moduleInitializersFactory,
                    deps: [LazyModulesService, [new Optional(), MODULE_INITIALIZER]],
                    multi: true,
                },
            ],
        };
    }
}
LazyLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LazyLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LazyLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: LazyLoadingModule });
LazyLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LazyLoadingModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LazyLoadingModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkaW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xhenktbG9hZGluZy9sYXp5LWxvYWRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsZUFBZSxFQUVmLFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUU5QyxNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGlCQUFxQyxFQUNyQywwQkFBeUM7SUFFekMsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FDaEIsaUJBQWlCLENBQUMsNkJBQTZCLENBQzdDLDBCQUEwQixDQUMzQixDQUNGLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FDWCxvRUFBb0UsRUFDcEUsS0FBSyxDQUNOLENBQUM7WUFDRixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQztBQUdELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSx5QkFBeUI7b0JBQ3JDLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO29CQUNoRSxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzhHQWJVLGlCQUFpQjsrR0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBQX0lOSVRJQUxJWkVSLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbiAgT3B0aW9uYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF6eU1vZHVsZXNTZXJ2aWNlIH0gZnJvbSAnLi9sYXp5LW1vZHVsZXMuc2VydmljZSc7XG5pbXBvcnQgeyBNT0RVTEVfSU5JVElBTElaRVIgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVJbml0aWFsaXplcnNGYWN0b3J5KFxuICBsYXp5TW9kdWxlU2VydmljZTogTGF6eU1vZHVsZXNTZXJ2aWNlLFxuICBtb2R1bGVJbml0aWFsaXplckZ1bmN0aW9uczogKCgpID0+IGFueSlbXVxuKTogKCkgPT4gYW55IHtcbiAgY29uc3QgZmFjdG9yeUZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIGxhenlNb2R1bGVTZXJ2aWNlLnJ1bk1vZHVsZUluaXRpYWxpemVyRnVuY3Rpb25zKFxuICAgICAgICBtb2R1bGVJbml0aWFsaXplckZ1bmN0aW9uc1xuICAgICAgKVxuICAgICkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAnTU9EVUxFX0lOSVRJQUxJWkVSIHByb21pc2Ugd2FzIHJlamVjdGVkIGR1cmluZyBhcHAgaW5pdGlhbGl6YXRpb24uJyxcbiAgICAgICAgZXJyb3JcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIGZhY3RvcnlGdW5jdGlvbjtcbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkaW5nTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxMYXp5TG9hZGluZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTGF6eUxvYWRpbmdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBtb2R1bGVJbml0aWFsaXplcnNGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtMYXp5TW9kdWxlc1NlcnZpY2UsIFtuZXcgT3B0aW9uYWwoKSwgTU9EVUxFX0lOSVRJQUxJWkVSXV0sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==