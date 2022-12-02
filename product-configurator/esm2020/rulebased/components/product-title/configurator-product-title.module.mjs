/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { IconModule, MediaModule } from '@spartacus/storefront';
import { ConfiguratorProductTitleComponent } from './configurator-product-title.component';
import * as i0 from "@angular/core";
export class ConfiguratorProductTitleModule {
}
ConfiguratorProductTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorProductTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, declarations: [ConfiguratorProductTitleComponent], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        IconModule,
        MediaModule,
        FeaturesConfigModule], exports: [ConfiguratorProductTitleComponent] });
ConfiguratorProductTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorProductTitle: {
                    component: ConfiguratorProductTitleComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        IconModule,
        MediaModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        MediaModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorProductTitle: {
                                    component: ConfiguratorProductTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorProductTitleComponent],
                    exports: [ConfiguratorProductTitleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXByb2R1Y3QtdGl0bGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL3Byb2R1Y3QtdGl0bGUvY29uZmlndXJhdG9yLXByb2R1Y3QtdGl0bGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBeUIzRixNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsaUJBSDFCLGlDQUFpQyxhQWxCOUMsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixjQUFjO1FBQ2QsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsV0FBVztRQUNYLG9CQUFvQixhQVlaLGlDQUFpQzs0SEFFaEMsOEJBQThCLGFBWjlCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHdCQUF3QixFQUFFO29CQUN4QixTQUFTLEVBQUUsaUNBQWlDO2lCQUM3QzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBakJDLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsY0FBYztRQUNkLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVTtRQUNWLFdBQVc7UUFDWCxvQkFBb0I7MkZBY1gsOEJBQThCO2tCQXZCMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsV0FBVzt3QkFDWCxvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUUsaUNBQWlDO2lDQUM3Qzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGlDQUFpQyxDQUFDO29CQUNqRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUsIE1lZGlhTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByb2R1Y3RUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLXByb2R1Y3QtdGl0bGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyYXRvclByb2R1Y3RUaXRsZToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yUHJvZHVjdFRpdGxlQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yUHJvZHVjdFRpdGxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvclByb2R1Y3RUaXRsZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclByb2R1Y3RUaXRsZU1vZHVsZSB7fVxuIl19