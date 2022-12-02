/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { BannerComponent } from './banner.component';
import * as i0 from "@angular/core";
export class BannerModule {
}
BannerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BannerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: BannerModule, declarations: [BannerComponent], imports: [CommonModule, RouterModule, GenericLinkModule, MediaModule], exports: [BannerComponent] });
BannerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BannerModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SimpleResponsiveBannerComponent: {
                    component: BannerComponent,
                },
                BannerComponent: {
                    component: BannerComponent,
                },
                SimpleBannerComponent: {
                    component: BannerComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, GenericLinkModule, MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BannerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, GenericLinkModule, MediaModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SimpleResponsiveBannerComponent: {
                                    component: BannerComponent,
                                },
                                BannerComponent: {
                                    component: BannerComponent,
                                },
                                SimpleBannerComponent: {
                                    component: BannerComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [BannerComponent],
                    exports: [BannerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXIvYmFubmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBYSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBc0JyRCxNQUFNLE9BQU8sWUFBWTs7eUdBQVosWUFBWTswR0FBWixZQUFZLGlCQUhSLGVBQWUsYUFoQnBCLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxhQWlCMUQsZUFBZTswR0FFZCxZQUFZLGFBbEJaO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLCtCQUErQixFQUFFO29CQUMvQixTQUFTLEVBQUUsZUFBZTtpQkFDM0I7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLFNBQVMsRUFBRSxlQUFlO2lCQUMzQjtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDckIsU0FBUyxFQUFFLGVBQWU7aUJBQzNCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFmUyxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFdBQVc7MkZBbUJ6RCxZQUFZO2tCQXBCeEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsQ0FBQztvQkFDckUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsK0JBQStCLEVBQUU7b0NBQy9CLFNBQVMsRUFBRSxlQUFlO2lDQUMzQjtnQ0FDRCxlQUFlLEVBQUU7b0NBQ2YsU0FBUyxFQUFFLGVBQWU7aUNBQzNCO2dDQUNELHFCQUFxQixFQUFFO29DQUNyQixTQUFTLEVBQUUsZUFBZTtpQ0FDM0I7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQy9CLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEdlbmVyaWNMaW5rTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvZ2VuZXJpYy1saW5rL2dlbmVyaWMtbGluay5tb2R1bGUnO1xuaW1wb3J0IHsgTWVkaWFNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5tb2R1bGUnO1xuaW1wb3J0IHsgQmFubmVyQ29tcG9uZW50IH0gZnJvbSAnLi9iYW5uZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBHZW5lcmljTGlua01vZHVsZSwgTWVkaWFNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgU2ltcGxlUmVzcG9uc2l2ZUJhbm5lckNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQmFubmVyQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBCYW5uZXJDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEJhbm5lckNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgICAgU2ltcGxlQmFubmVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBCYW5uZXJDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtCYW5uZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQmFubmVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQmFubmVyTW9kdWxlIHt9XG4iXX0=