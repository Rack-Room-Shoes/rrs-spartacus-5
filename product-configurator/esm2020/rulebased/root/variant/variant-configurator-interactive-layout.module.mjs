/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 *  Contains the layout configuration for the interactive configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorInteractiveModule is active
 */
export class VariantConfiguratorInteractiveLayoutModule {
}
VariantConfiguratorInteractiveLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorInteractiveLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule });
VariantConfiguratorInteractiveLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                VariantConfigurationTemplate: {
                    header: {
                        lg: {
                            slots: [
                                'PreHeader',
                                'SiteLogo',
                                'VariantConfigExitButton',
                                'MiniCart',
                            ],
                        },
                        xs: {
                            slots: [
                                'PreHeader',
                                'SiteLogo',
                                'VariantConfigExitButton',
                                'MiniCart',
                            ],
                        },
                    },
                    navigation: {
                        lg: { slots: [] },
                        slots: ['VariantConfigMenu'],
                    },
                    lg: {
                        slots: [
                            'VariantConfigHeader',
                            'VariantConfigMenu',
                            'VariantConfigContent',
                            'VariantConfigBottombar',
                        ],
                    },
                    slots: [
                        'VariantConfigHeader',
                        'VariantConfigContent',
                        'VariantConfigBottombar',
                    ],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                VariantConfigurationTemplate: {
                                    header: {
                                        lg: {
                                            slots: [
                                                'PreHeader',
                                                'SiteLogo',
                                                'VariantConfigExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                        xs: {
                                            slots: [
                                                'PreHeader',
                                                'SiteLogo',
                                                'VariantConfigExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                    },
                                    navigation: {
                                        lg: { slots: [] },
                                        slots: ['VariantConfigMenu'],
                                    },
                                    lg: {
                                        slots: [
                                            'VariantConfigHeader',
                                            'VariantConfigMenu',
                                            'VariantConfigContent',
                                            'VariantConfigBottombar',
                                        ],
                                    },
                                    slots: [
                                        'VariantConfigHeader',
                                        'VariantConfigContent',
                                        'VariantConfigBottombar',
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3ItaW50ZXJhY3RpdmUtbGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLWludGVyYWN0aXZlLWxheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBR3ZEOzs7OztHQUtHO0FBaURILE1BQU0sT0FBTywwQ0FBMEM7O3VJQUExQywwQ0FBMEM7d0lBQTFDLDBDQUEwQzt3SUFBMUMsMENBQTBDLGFBL0MxQztRQUNULG9CQUFvQixDQUFlO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCw0QkFBNEIsRUFBRTtvQkFDNUIsTUFBTSxFQUFFO3dCQUNOLEVBQUUsRUFBRTs0QkFDRixLQUFLLEVBQUU7Z0NBQ0wsV0FBVztnQ0FDWCxVQUFVO2dDQUNWLHlCQUF5QjtnQ0FDekIsVUFBVTs2QkFDWDt5QkFDRjt3QkFDRCxFQUFFLEVBQUU7NEJBQ0YsS0FBSyxFQUFFO2dDQUNMLFdBQVc7Z0NBQ1gsVUFBVTtnQ0FDVix5QkFBeUI7Z0NBQ3pCLFVBQVU7NkJBQ1g7eUJBQ0Y7cUJBQ0Y7b0JBRUQsVUFBVSxFQUFFO3dCQUNWLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0JBQ2pCLEtBQUssRUFBRSxDQUFDLG1CQUFtQixDQUFDO3FCQUM3QjtvQkFFRCxFQUFFLEVBQUU7d0JBQ0YsS0FBSyxFQUFFOzRCQUNMLHFCQUFxQjs0QkFDckIsbUJBQW1COzRCQUNuQixzQkFBc0I7NEJBQ3RCLHdCQUF3Qjt5QkFDekI7cUJBQ0Y7b0JBRUQsS0FBSyxFQUFFO3dCQUNMLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7cUJBQ3pCO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7MkZBRVUsMENBQTBDO2tCQWhEdEQsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQWU7NEJBQ2pDLFdBQVcsRUFBRTtnQ0FDWCw0QkFBNEIsRUFBRTtvQ0FDNUIsTUFBTSxFQUFFO3dDQUNOLEVBQUUsRUFBRTs0Q0FDRixLQUFLLEVBQUU7Z0RBQ0wsV0FBVztnREFDWCxVQUFVO2dEQUNWLHlCQUF5QjtnREFDekIsVUFBVTs2Q0FDWDt5Q0FDRjt3Q0FDRCxFQUFFLEVBQUU7NENBQ0YsS0FBSyxFQUFFO2dEQUNMLFdBQVc7Z0RBQ1gsVUFBVTtnREFDVix5QkFBeUI7Z0RBQ3pCLFVBQVU7NkNBQ1g7eUNBQ0Y7cUNBQ0Y7b0NBRUQsVUFBVSxFQUFFO3dDQUNWLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0NBQ2pCLEtBQUssRUFBRSxDQUFDLG1CQUFtQixDQUFDO3FDQUM3QjtvQ0FFRCxFQUFFLEVBQUU7d0NBQ0YsS0FBSyxFQUFFOzRDQUNMLHFCQUFxQjs0Q0FDckIsbUJBQW1COzRDQUNuQixzQkFBc0I7NENBQ3RCLHdCQUF3Qjt5Q0FDekI7cUNBQ0Y7b0NBRUQsS0FBSyxFQUFFO3dDQUNMLHFCQUFxQjt3Q0FDckIsc0JBQXNCO3dDQUN0Qix3QkFBd0I7cUNBQ3pCO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcblxuLyoqXG4gKiAgQ29udGFpbnMgdGhlIGxheW91dCBjb25maWd1cmF0aW9uIGZvciB0aGUgaW50ZXJhY3RpdmUgY29uZmlndXJhdGlvbiBwYWdlLiBUaGlzIGNvbmZpZ3VyYXRpb24gaXNcbiAqICBvcHRpb25hbCBhcyBvZiB2ZXJzaW9uIDQuMiwgYW5kIHJlZHVjZXMgdGhlIGNvbXBvbmVudHMgdGhhdCBhcmUgcmVuZGVyZWQgaW4gdGhlIGhlYWRlciBzZWN0aW9uLlxuICogIEl0IG5lZWRzIHRvIGJlIGV4cGxpY2l0bHkgaW1wb3J0ZWQsIG90aGVyd2lzZSB0aGUgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gKiAgZnJvbSBWYXJpYW50Q29uZmlndXJhdG9ySW50ZXJhY3RpdmVNb2R1bGUgaXMgYWN0aXZlXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxMYXlvdXRDb25maWc+e1xuICAgICAgbGF5b3V0U2xvdHM6IHtcbiAgICAgICAgVmFyaWFudENvbmZpZ3VyYXRpb25UZW1wbGF0ZToge1xuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgbGc6IHtcbiAgICAgICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICAgICAnUHJlSGVhZGVyJyxcbiAgICAgICAgICAgICAgICAnU2l0ZUxvZ28nLFxuICAgICAgICAgICAgICAgICdWYXJpYW50Q29uZmlnRXhpdEJ1dHRvbicsXG4gICAgICAgICAgICAgICAgJ01pbmlDYXJ0JyxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4czoge1xuICAgICAgICAgICAgICBzbG90czogW1xuICAgICAgICAgICAgICAgICdQcmVIZWFkZXInLFxuICAgICAgICAgICAgICAgICdTaXRlTG9nbycsXG4gICAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdFeGl0QnV0dG9uJyxcbiAgICAgICAgICAgICAgICAnTWluaUNhcnQnLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgbGc6IHsgc2xvdHM6IFtdIH0sXG4gICAgICAgICAgICBzbG90czogWydWYXJpYW50Q29uZmlnTWVudSddLFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBsZzoge1xuICAgICAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdIZWFkZXInLFxuICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ01lbnUnLFxuICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ0NvbnRlbnQnLFxuICAgICAgICAgICAgICAnVmFyaWFudENvbmZpZ0JvdHRvbWJhcicsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzbG90czogW1xuICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdIZWFkZXInLFxuICAgICAgICAgICAgJ1ZhcmlhbnRDb25maWdDb250ZW50JyxcbiAgICAgICAgICAgICdWYXJpYW50Q29uZmlnQm90dG9tYmFyJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVmFyaWFudENvbmZpZ3VyYXRvckludGVyYWN0aXZlTGF5b3V0TW9kdWxlIHt9XG4iXX0=