/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { VariantConfiguratorPageLayoutHandler } from './variant-configurator-page-layout-handler';
import * as i0 from "@angular/core";
/**
 *  Contains the layout configuration for the overview configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorOverviewModule is active
 */
export class VariantConfiguratorOverviewLayoutModule {
}
VariantConfiguratorOverviewLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOverviewLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule });
VariantConfiguratorOverviewLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                VariantConfigurationOverviewTemplate: {
                    header: {
                        lg: {
                            slots: [
                                'SiteLogo',
                                'VariantConfigOverviewExitButton',
                                'MiniCart',
                            ],
                        },
                        xs: {
                            slots: [
                                'SiteLogo',
                                'VariantConfigOverviewExitButton',
                                'MiniCart',
                            ],
                        },
                    },
                    headerDisplayOnly: {
                        lg: {
                            slots: [
                                'SiteContext',
                                'SiteLinks',
                                'SiteLogo',
                                'SearchBox',
                                'SiteLogin',
                                'MiniCart',
                                'NavigationBar',
                            ],
                        },
                        xs: {
                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                        },
                    },
                    slots: [
                        'VariantConfigOverviewHeader',
                        'VariantConfigOverviewBanner',
                        'VariantConfigOverviewContent',
                        'VariantConfigOverviewBottombar',
                    ],
                },
            },
        }),
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: VariantConfiguratorPageLayoutHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                VariantConfigurationOverviewTemplate: {
                                    header: {
                                        lg: {
                                            slots: [
                                                'SiteLogo',
                                                'VariantConfigOverviewExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                        xs: {
                                            slots: [
                                                'SiteLogo',
                                                'VariantConfigOverviewExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                    },
                                    headerDisplayOnly: {
                                        lg: {
                                            slots: [
                                                'SiteContext',
                                                'SiteLinks',
                                                'SiteLogo',
                                                'SearchBox',
                                                'SiteLogin',
                                                'MiniCart',
                                                'NavigationBar',
                                            ],
                                        },
                                        xs: {
                                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                                        },
                                    },
                                    slots: [
                                        'VariantConfigOverviewHeader',
                                        'VariantConfigOverviewBanner',
                                        'VariantConfigOverviewContent',
                                        'VariantConfigOverviewBottombar',
                                    ],
                                },
                            },
                        }),
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: VariantConfiguratorPageLayoutHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3Itb3ZlcnZpZXctbGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLW92ZXJ2aWV3LWxheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFnQixtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOztBQUVsRzs7Ozs7R0FLRztBQXNESCxNQUFNLE9BQU8sdUNBQXVDOztvSUFBdkMsdUNBQXVDO3FJQUF2Qyx1Q0FBdUM7cUlBQXZDLHVDQUF1QyxhQXBEdkM7UUFDVCxvQkFBb0IsQ0FBZTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsb0NBQW9DLEVBQUU7b0JBQ3BDLE1BQU0sRUFBRTt3QkFDTixFQUFFLEVBQUU7NEJBQ0YsS0FBSyxFQUFFO2dDQUNMLFVBQVU7Z0NBQ1YsaUNBQWlDO2dDQUNqQyxVQUFVOzZCQUNYO3lCQUNGO3dCQUNELEVBQUUsRUFBRTs0QkFDRixLQUFLLEVBQUU7Z0NBQ0wsVUFBVTtnQ0FDVixpQ0FBaUM7Z0NBQ2pDLFVBQVU7NkJBQ1g7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsaUJBQWlCLEVBQUU7d0JBQ2pCLEVBQUUsRUFBRTs0QkFDRixLQUFLLEVBQUU7Z0NBQ0wsYUFBYTtnQ0FDYixXQUFXO2dDQUNYLFVBQVU7Z0NBQ1YsV0FBVztnQ0FDWCxXQUFXO2dDQUNYLFVBQVU7Z0NBQ1YsZUFBZTs2QkFDaEI7eUJBQ0Y7d0JBQ0QsRUFBRSxFQUFFOzRCQUNGLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQzt5QkFDMUQ7cUJBQ0Y7b0JBQ0QsS0FBSyxFQUFFO3dCQUNMLDZCQUE2Qjt3QkFDN0IsNkJBQTZCO3dCQUM3Qiw4QkFBOEI7d0JBQzlCLGdDQUFnQztxQkFDakM7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7UUFDRjtZQUNFLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0Y7MkZBRVUsdUNBQXVDO2tCQXJEbkQsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQWU7NEJBQ2pDLFdBQVcsRUFBRTtnQ0FDWCxvQ0FBb0MsRUFBRTtvQ0FDcEMsTUFBTSxFQUFFO3dDQUNOLEVBQUUsRUFBRTs0Q0FDRixLQUFLLEVBQUU7Z0RBQ0wsVUFBVTtnREFDVixpQ0FBaUM7Z0RBQ2pDLFVBQVU7NkNBQ1g7eUNBQ0Y7d0NBQ0QsRUFBRSxFQUFFOzRDQUNGLEtBQUssRUFBRTtnREFDTCxVQUFVO2dEQUNWLGlDQUFpQztnREFDakMsVUFBVTs2Q0FDWDt5Q0FDRjtxQ0FDRjtvQ0FDRCxpQkFBaUIsRUFBRTt3Q0FDakIsRUFBRSxFQUFFOzRDQUNGLEtBQUssRUFBRTtnREFDTCxhQUFhO2dEQUNiLFdBQVc7Z0RBQ1gsVUFBVTtnREFDVixXQUFXO2dEQUNYLFdBQVc7Z0RBQ1gsVUFBVTtnREFDVixlQUFlOzZDQUNoQjt5Q0FDRjt3Q0FDRCxFQUFFLEVBQUU7NENBQ0YsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO3lDQUMxRDtxQ0FDRjtvQ0FDRCxLQUFLLEVBQUU7d0NBQ0wsNkJBQTZCO3dDQUM3Qiw2QkFBNkI7d0NBQzdCLDhCQUE4Qjt3Q0FDOUIsZ0NBQWdDO3FDQUNqQztpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3dCQUNGOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFdBQVcsRUFBRSxvQ0FBb0M7NEJBQ2pELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExheW91dENvbmZpZywgUEFHRV9MQVlPVVRfSEFORExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBWYXJpYW50Q29uZmlndXJhdG9yUGFnZUxheW91dEhhbmRsZXIgfSBmcm9tICcuL3ZhcmlhbnQtY29uZmlndXJhdG9yLXBhZ2UtbGF5b3V0LWhhbmRsZXInO1xuXG4vKipcbiAqICBDb250YWlucyB0aGUgbGF5b3V0IGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBvdmVydmlldyBjb25maWd1cmF0aW9uIHBhZ2UuIFRoaXMgY29uZmlndXJhdGlvbiBpc1xuICogIG9wdGlvbmFsIGFzIG9mIHZlcnNpb24gNC4yLCBhbmQgcmVkdWNlcyB0aGUgY29tcG9uZW50cyB0aGF0IGFyZSByZW5kZXJlZCBpbiB0aGUgaGVhZGVyIHNlY3Rpb24uXG4gKiAgSXQgbmVlZHMgdG8gYmUgZXhwbGljaXRseSBpbXBvcnRlZCwgb3RoZXJ3aXNlIHRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cbiAqICBmcm9tIFZhcmlhbnRDb25maWd1cmF0b3JPdmVydmlld01vZHVsZSBpcyBhY3RpdmVcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPExheW91dENvbmZpZz57XG4gICAgICBsYXlvdXRTbG90czoge1xuICAgICAgICBWYXJpYW50Q29uZmlndXJhdGlvbk92ZXJ2aWV3VGVtcGxhdGU6IHtcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIGxnOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbXG4gICAgICAgICAgICAgICAgJ1NpdGVMb2dvJyxcbiAgICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ092ZXJ2aWV3RXhpdEJ1dHRvbicsXG4gICAgICAgICAgICAgICAgJ01pbmlDYXJ0JyxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4czoge1xuICAgICAgICAgICAgICBzbG90czogW1xuICAgICAgICAgICAgICAgICdTaXRlTG9nbycsXG4gICAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdPdmVydmlld0V4aXRCdXR0b24nLFxuICAgICAgICAgICAgICAgICdNaW5pQ2FydCcsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyRGlzcGxheU9ubHk6IHtcbiAgICAgICAgICAgIGxnOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbXG4gICAgICAgICAgICAgICAgJ1NpdGVDb250ZXh0JyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxpbmtzJyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxvZ28nLFxuICAgICAgICAgICAgICAgICdTZWFyY2hCb3gnLFxuICAgICAgICAgICAgICAgICdTaXRlTG9naW4nLFxuICAgICAgICAgICAgICAgICdNaW5pQ2FydCcsXG4gICAgICAgICAgICAgICAgJ05hdmlnYXRpb25CYXInLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHhzOiB7XG4gICAgICAgICAgICAgIHNsb3RzOiBbJ1ByZUhlYWRlcicsICdTaXRlTG9nbycsICdTZWFyY2hCb3gnLCAnTWluaUNhcnQnXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzbG90czogW1xuICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdPdmVydmlld0hlYWRlcicsXG4gICAgICAgICAgICAnVmFyaWFudENvbmZpZ092ZXJ2aWV3QmFubmVyJyxcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdDb250ZW50JyxcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnT3ZlcnZpZXdCb3R0b21iYXInLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBBR0VfTEFZT1VUX0hBTkRMRVIsXG4gICAgICB1c2VFeGlzdGluZzogVmFyaWFudENvbmZpZ3VyYXRvclBhZ2VMYXlvdXRIYW5kbGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVmFyaWFudENvbmZpZ3VyYXRvck92ZXJ2aWV3TGF5b3V0TW9kdWxlIHt9XG4iXX0=