/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAddToCartButtonComponent } from './configurator-add-to-cart-button.component';
import * as i0 from "@angular/core";
export class ConfiguratorAddToCartButtonModule {
}
ConfiguratorAddToCartButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAddToCartButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, declarations: [ConfiguratorAddToCartButtonComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorAddToCartButtonComponent] });
ConfiguratorAddToCartButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorAddToCartButton: {
                    component: ConfiguratorAddToCartButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorAddToCartButton: {
                                    component: ConfiguratorAddToCartButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAddToCartButtonComponent],
                    exports: [ConfiguratorAddToCartButtonComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYWRkLXRvLWNhcnQtYnV0dG9uL2NvbmZpZ3VyYXRvci1hZGQtdG8tY2FydC1idXR0b24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBZ0JuRyxNQUFNLE9BQU8saUNBQWlDOzs4SEFBakMsaUNBQWlDOytIQUFqQyxpQ0FBaUMsaUJBSDdCLG9DQUFvQyxhQVZ6QyxZQUFZLEVBQUUsVUFBVSxhQVd4QixvQ0FBb0M7K0hBRW5DLGlDQUFpQyxhQVpqQztRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiwyQkFBMkIsRUFBRTtvQkFDM0IsU0FBUyxFQUFFLG9DQUFvQztpQkFDaEQ7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxVQUFVOzJGQWF2QixpQ0FBaUM7a0JBZDdDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbkMsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsMkJBQTJCLEVBQUU7b0NBQzNCLFNBQVMsRUFBRSxvQ0FBb0M7aUNBQ2hEOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0NBQW9DLENBQUM7b0JBQ3BELE9BQU8sRUFBRSxDQUFDLG9DQUFvQyxDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBZGRUb0NhcnRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1hZGQtdG8tY2FydC1idXR0b24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JBZGRUb0NhcnRCdXR0b246IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBZGRUb0NhcnRCdXR0b25Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBZGRUb0NhcnRCdXR0b25Nb2R1bGUge31cbiJdfQ==