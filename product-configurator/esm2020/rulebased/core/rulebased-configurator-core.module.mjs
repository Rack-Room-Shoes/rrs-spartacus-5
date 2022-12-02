/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { ConfiguratorRouterModule } from './facade/routing/configurator-router.module';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';
import * as i0 from "@angular/core";
/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
export class RulebasedConfiguratorCoreModule {
}
RulebasedConfiguratorCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
RulebasedConfiguratorCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, providers: [RulebasedConfiguratorConnector], imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule],
                    providers: [RulebasedConfiguratorConnector],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9ydWxlYmFzZWQtY29uZmlndXJhdG9yLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztBQUUvRjs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsWUFIaEMsZ0NBQWdDLEVBQUUsd0JBQXdCOzZIQUd6RCwrQkFBK0IsYUFGL0IsQ0FBQyw4QkFBOEIsQ0FBQyxZQURqQyxnQ0FBZ0MsRUFBRSx3QkFBd0I7MkZBR3pELCtCQUErQjtrQkFKM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx3QkFBd0IsQ0FBQztvQkFDckUsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7aUJBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJ1bGViYXNlZENvbmZpZ3VyYXRvckNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9ydWxlYmFzZWQtY29uZmlndXJhdG9yLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JSb3V0ZXJNb2R1bGUgfSBmcm9tICcuL2ZhY2FkZS9yb3V0aW5nL2NvbmZpZ3VyYXRvci1yb3V0ZXIubW9kdWxlJztcbmltcG9ydCB7IFJ1bGViYXNlZENvbmZpZ3VyYXRvclN0YXRlTW9kdWxlIH0gZnJvbSAnLi9zdGF0ZS9ydWxlYmFzZWQtY29uZmlndXJhdG9yLXN0YXRlLm1vZHVsZSc7XG5cbi8qKlxuICogRXhwb3NlcyB0aGUgcnVsZWJhc2VkIGNvbmZpZ3VyYXRvciBjb3JlIGVudGl0aWVzLlxuICogRXhwbGljaXQgcHJvdmlkaW5nIG9mIGNvbm5lY3RvciBiZWNhdXNlIG90aGVyd2lzZSBsYXp5IGxvYWRpbmcgZG9lcyBub3Qgd29ya1xuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUnVsZWJhc2VkQ29uZmlndXJhdG9yU3RhdGVNb2R1bGUsIENvbmZpZ3VyYXRvclJvdXRlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1J1bGViYXNlZENvbmZpZ3VyYXRvckNvbm5lY3Rvcl0sXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGViYXNlZENvbmZpZ3VyYXRvckNvcmVNb2R1bGUge31cbiJdfQ==