/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { ConfiguratorOverviewAttributeModule } from '../overview-attribute/configurator-overview-attribute.module';
import { ConfiguratorOverviewBundleAttributeModule } from '../overview-bundle-attribute/configurator-overview-bundle-attribute.module';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewFormModule {
}
ConfiguratorOverviewFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, declarations: [ConfiguratorOverviewFormComponent], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule,
        FeaturesConfigModule], exports: [ConfiguratorOverviewFormComponent] });
ConfiguratorOverviewFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewForm: {
                    component: ConfiguratorOverviewFormComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorOverviewAttributeModule,
                        ConfiguratorOverviewBundleAttributeModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewForm: {
                                    component: ConfiguratorOverviewFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewFormComponent],
                    exports: [ConfiguratorOverviewFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWZvcm0vY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUNuSCxPQUFPLEVBQUUseUNBQXlDLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFzQjNGLE1BQU0sT0FBTyw4QkFBOEI7OzJIQUE5Qiw4QkFBOEI7NEhBQTlCLDhCQUE4QixpQkFIMUIsaUNBQWlDLGFBZjlDLFlBQVk7UUFDWixtQ0FBbUM7UUFDbkMseUNBQXlDO1FBQ3pDLFVBQVU7UUFDVixvQkFBb0IsYUFZWixpQ0FBaUM7NEhBRWhDLDhCQUE4QixhQVo5QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix3QkFBd0IsRUFBRTtvQkFDeEIsU0FBUyxFQUFFLGlDQUFpQztpQkFDN0M7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWRDLFlBQVk7UUFDWixtQ0FBbUM7UUFDbkMseUNBQXlDO1FBQ3pDLFVBQVU7UUFDVixvQkFBb0I7MkZBY1gsOEJBQThCO2tCQXBCMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQ0FBbUM7d0JBQ25DLHlDQUF5Qzt3QkFDekMsVUFBVTt3QkFDVixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUUsaUNBQWlDO2lDQUM3Qzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGlDQUFpQyxDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yT3ZlcnZpZXdBdHRyaWJ1dGVNb2R1bGUgfSBmcm9tICcuLi9vdmVydmlldy1hdHRyaWJ1dGUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWF0dHJpYnV0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yT3ZlcnZpZXdCdW5kbGVBdHRyaWJ1dGVNb2R1bGUgfSBmcm9tICcuLi9vdmVydmlldy1idW5kbGUtYXR0cmlidXRlL2NvbmZpZ3VyYXRvci1vdmVydmlldy1idW5kbGUtYXR0cmlidXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1vdmVydmlldy1mb3JtLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yT3ZlcnZpZXdBdHRyaWJ1dGVNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yT3ZlcnZpZXdCdW5kbGVBdHRyaWJ1dGVNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyYXRvck92ZXJ2aWV3Rm9ybToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yT3ZlcnZpZXdGb3JtQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yT3ZlcnZpZXdGb3JtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvck92ZXJ2aWV3Rm9ybUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3Rm9ybU1vZHVsZSB7fVxuIl19