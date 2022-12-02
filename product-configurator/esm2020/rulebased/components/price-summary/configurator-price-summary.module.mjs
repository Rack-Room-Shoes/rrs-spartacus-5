/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorPriceSummaryComponent } from './configurator-price-summary.component';
import * as i0 from "@angular/core";
export class ConfiguratorPriceSummaryModule {
}
ConfiguratorPriceSummaryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPriceSummaryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, declarations: [ConfiguratorPriceSummaryComponent], imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule], exports: [ConfiguratorPriceSummaryComponent] });
ConfiguratorPriceSummaryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorPriceSummary: {
                    component: ConfiguratorPriceSummaryComponent,
                },
            },
        }),
    ], imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorPriceSummary: {
                                    component: ConfiguratorPriceSummaryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorPriceSummaryComponent],
                    exports: [ConfiguratorPriceSummaryComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXByaWNlLXN1bW1hcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL3ByaWNlLXN1bW1hcnkvY29uZmlndXJhdG9yLXByaWNlLXN1bW1hcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQWdCM0YsTUFBTSxPQUFPLDhCQUE4Qjs7MkhBQTlCLDhCQUE4Qjs0SEFBOUIsOEJBQThCLGlCQUgxQixpQ0FBaUMsYUFWdEMsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxVQUFVLGFBVzFELGlDQUFpQzs0SEFFaEMsOEJBQThCLGFBWjlCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHdCQUF3QixFQUFFO29CQUN4QixTQUFTLEVBQUUsaUNBQWlDO2lCQUM3QzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxVQUFVOzJGQWF6RCw4QkFBOEI7a0JBZDFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxVQUFVLENBQUM7b0JBQ3JFLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUUsaUNBQWlDO2lDQUM3Qzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGlDQUFpQyxDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZVN1bW1hcnlDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1wcmljZS1zdW1tYXJ5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyYXRvclByaWNlU3VtbWFyeToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yUHJpY2VTdW1tYXJ5Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yUHJpY2VTdW1tYXJ5Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvclByaWNlU3VtbWFyeUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclByaWNlU3VtbWFyeU1vZHVsZSB7fVxuIl19