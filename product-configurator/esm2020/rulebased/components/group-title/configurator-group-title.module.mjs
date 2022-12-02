/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorGroupTitleComponent } from './configurator-group-title.component';
import * as i0 from "@angular/core";
export class ConfiguratorGroupTitleModule {
}
ConfiguratorGroupTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, declarations: [ConfiguratorGroupTitleComponent], imports: [CommonModule], exports: [ConfiguratorGroupTitleComponent] });
ConfiguratorGroupTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorGroupTitle: {
                    component: ConfiguratorGroupTitleComponent,
                },
            },
        }),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorGroupTitle: {
                                    component: ConfiguratorGroupTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupTitleComponent],
                    exports: [ConfiguratorGroupTitleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLXRpdGxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9ncm91cC10aXRsZS9jb25maWd1cmF0b3ItZ3JvdXAtdGl0bGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7QUFnQnZGLE1BQU0sT0FBTyw0QkFBNEI7O3lIQUE1Qiw0QkFBNEI7MEhBQTVCLDRCQUE0QixpQkFIeEIsK0JBQStCLGFBVnBDLFlBQVksYUFXWiwrQkFBK0I7MEhBRTlCLDRCQUE0QixhQVo1QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixzQkFBc0IsRUFBRTtvQkFDdEIsU0FBUyxFQUFFLCtCQUErQjtpQkFDM0M7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVRTLFlBQVk7MkZBYVgsNEJBQTRCO2tCQWR4QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isc0JBQXNCLEVBQUU7b0NBQ3RCLFNBQVMsRUFBRSwrQkFBK0I7aUNBQzNDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsK0JBQStCLENBQUM7b0JBQy9DLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO2lCQUMzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cFRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItZ3JvdXAtdGl0bGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JHcm91cFRpdGxlOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDb25maWd1cmF0b3JHcm91cFRpdGxlQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yR3JvdXBUaXRsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JHcm91cFRpdGxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yR3JvdXBUaXRsZU1vZHVsZSB7fVxuIl19