/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, RoutingModule as CoreRoutingModule, } from '@spartacus/core';
import { CmsRouteModule } from '@spartacus/storefront';
import { defaultRulebasedRoutingConfig } from './default-rulebased-routing-config';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Provides the default cx routing configuration for the rulebased configurator
 */
export class RulebasedConfiguratorRoutingModule {
    static forRoot() {
        return {
            ngModule: RulebasedConfiguratorRoutingModule,
            providers: [provideDefaultConfig(defaultRulebasedRoutingConfig)],
        };
    }
}
RulebasedConfiguratorRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRoutingModule, imports: [i1.RoutingModule, CmsRouteModule] });
RulebasedConfiguratorRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRoutingModule, imports: [CoreRoutingModule.forRoot(), CmsRouteModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC9ydWxlYmFzZWQtY29uZmlndXJhdG9yLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsSUFBSSxpQkFBaUIsR0FDbkMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7OztBQUVuRjs7R0FFRztBQUlILE1BQU0sT0FBTyxrQ0FBa0M7SUFDN0MsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGtDQUFrQztZQUM1QyxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2pFLENBQUM7SUFDSixDQUFDOzsrSEFOVSxrQ0FBa0M7Z0lBQWxDLGtDQUFrQyw4QkFGTixjQUFjO2dJQUUxQyxrQ0FBa0MsWUFGbkMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsY0FBYzsyRkFFMUMsa0NBQWtDO2tCQUg5QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLGNBQWMsQ0FBQztpQkFDdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFJvdXRpbmdNb2R1bGUgYXMgQ29yZVJvdXRpbmdNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNSb3V0ZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBkZWZhdWx0UnVsZWJhc2VkUm91dGluZ0NvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1ydWxlYmFzZWQtcm91dGluZy1jb25maWcnO1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBkZWZhdWx0IGN4IHJvdXRpbmcgY29uZmlndXJhdGlvbiBmb3IgdGhlIHJ1bGViYXNlZCBjb25maWd1cmF0b3JcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVSb3V0aW5nTW9kdWxlLmZvclJvb3QoKSwgQ21zUm91dGVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBSdWxlYmFzZWRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxSdWxlYmFzZWRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSdWxlYmFzZWRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFJ1bGViYXNlZFJvdXRpbmdDb25maWcpXSxcbiAgICB9O1xuICB9XG59XG4iXX0=