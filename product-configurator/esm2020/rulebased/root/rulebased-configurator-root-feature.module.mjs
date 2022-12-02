/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_CONFIGURATOR_RULEBASED_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
const cmsComponents = [
    'ConfiguratorForm',
    'ConfiguratorOverviewForm',
    'ConfiguratorUpdateMessage',
    'ConfiguratorAddToCartButton',
    'ConfiguratorMenu',
    'ConfiguratorGroupTitle',
    'ConfiguratorOverviewBanner',
    'ConfiguratorPrevNext',
    'ConfiguratorPriceSummary',
    'ConfiguratorProductTitle',
    'ConfiguratorTabBar',
    'ConfiguratorExitButton',
    'CpqConfiguratorConflictAndErrorMessagesComponent',
];
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductConfiguratorRulebasedComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
                cmsComponents,
            },
        },
    };
    return config;
}
/**
 * Contains feature module configuration
 */
export class RulebasedConfiguratorRootFeatureModule {
}
RulebasedConfiguratorRootFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRootFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule });
RulebasedConfiguratorRootFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, providers: [
        provideDefaultConfigFactory(defaultProductConfiguratorRulebasedComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductConfiguratorRulebasedComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1yb290LWZlYXR1cmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L3J1bGViYXNlZC1jb25maWd1cmF0b3Itcm9vdC1mZWF0dXJlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEUsTUFBTSxhQUFhLEdBQWE7SUFDOUIsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQix3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0QiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLG9CQUFvQjtJQUNwQix3QkFBd0I7SUFDeEIsa0RBQWtEO0NBQ25ELENBQUM7QUFFRiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLG1EQUFtRDtJQUNqRSxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLHNDQUFzQyxDQUFDLEVBQUU7Z0JBQ3hDLGFBQWE7YUFDZDtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7R0FFRztBQVNILE1BQU0sT0FBTyxzQ0FBc0M7O21JQUF0QyxzQ0FBc0M7b0lBQXRDLHNDQUFzQztvSUFBdEMsc0NBQXNDLGFBTnRDO1FBQ1QsMkJBQTJCLENBQ3pCLG1EQUFtRCxDQUNwRDtLQUNGOzJGQUVVLHNDQUFzQztrQkFSbEQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQ3pCLG1EQUFtRCxDQUNwRDtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQUk9EVUNUX0NPTkZJR1VSQVRPUl9SVUxFQkFTRURfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuY29uc3QgY21zQ29tcG9uZW50czogc3RyaW5nW10gPSBbXG4gICdDb25maWd1cmF0b3JGb3JtJyxcbiAgJ0NvbmZpZ3VyYXRvck92ZXJ2aWV3Rm9ybScsXG4gICdDb25maWd1cmF0b3JVcGRhdGVNZXNzYWdlJyxcbiAgJ0NvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbicsXG4gICdDb25maWd1cmF0b3JNZW51JyxcbiAgJ0NvbmZpZ3VyYXRvckdyb3VwVGl0bGUnLFxuICAnQ29uZmlndXJhdG9yT3ZlcnZpZXdCYW5uZXInLFxuICAnQ29uZmlndXJhdG9yUHJldk5leHQnLFxuICAnQ29uZmlndXJhdG9yUHJpY2VTdW1tYXJ5JyxcbiAgJ0NvbmZpZ3VyYXRvclByb2R1Y3RUaXRsZScsXG4gICdDb25maWd1cmF0b3JUYWJCYXInLFxuICAnQ29uZmlndXJhdG9yRXhpdEJ1dHRvbicsXG4gICdDcHFDb25maWd1cmF0b3JDb25mbGljdEFuZEVycm9yTWVzc2FnZXNDb21wb25lbnQnLFxuXTtcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFByb2R1Y3RDb25maWd1cmF0b3JSdWxlYmFzZWRDb21wb25lbnRzQ29uZmlnKCk6IENtc0NvbmZpZyB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbUFJPRFVDVF9DT05GSUdVUkFUT1JfUlVMRUJBU0VEX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHMsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuLyoqXG4gKiBDb250YWlucyBmZWF0dXJlIG1vZHVsZSBjb25maWd1cmF0aW9uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoXG4gICAgICBkZWZhdWx0UHJvZHVjdENvbmZpZ3VyYXRvclJ1bGViYXNlZENvbXBvbmVudHNDb25maWdcbiAgICApLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSdWxlYmFzZWRDb25maWd1cmF0b3JSb290RmVhdHVyZU1vZHVsZSB7fVxuIl19