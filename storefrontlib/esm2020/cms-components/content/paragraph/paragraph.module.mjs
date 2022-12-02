/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideDefaultConfig } from '@spartacus/core';
import { SupplementHashAnchorsModule } from '../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.module';
import { ParagraphComponent } from './paragraph.component';
import { RouterModule } from '@angular/router';
import * as i0 from "@angular/core";
export class CmsParagraphModule {
}
CmsParagraphModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsParagraphModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CmsParagraphModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CmsParagraphModule, declarations: [ParagraphComponent], imports: [CommonModule, RouterModule, SupplementHashAnchorsModule], exports: [ParagraphComponent] });
CmsParagraphModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsParagraphModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CMSParagraphComponent: {
                    component: ParagraphComponent,
                },
                CMSTabParagraphComponent: {
                    component: ParagraphComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, SupplementHashAnchorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsParagraphModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, SupplementHashAnchorsModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CMSParagraphComponent: {
                                    component: ParagraphComponent,
                                },
                                CMSTabParagraphComponent: {
                                    component: ParagraphComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ParagraphComponent],
                    exports: [ParagraphComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFhLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkVBQTZFLENBQUM7QUFDMUgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQW1CL0MsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQUhkLGtCQUFrQixhQWJ2QixZQUFZLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixhQWN2RCxrQkFBa0I7Z0hBRWpCLGtCQUFrQixhQWZsQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixxQkFBcUIsRUFBRTtvQkFDckIsU0FBUyxFQUFFLGtCQUFrQjtpQkFDOUI7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSxrQkFBa0I7aUJBQzlCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFaUyxZQUFZLEVBQUUsWUFBWSxFQUFFLDJCQUEyQjsyRkFnQnRELGtCQUFrQjtrQkFqQjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSwyQkFBMkIsQ0FBQztvQkFDbEUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IscUJBQXFCLEVBQUU7b0NBQ3JCLFNBQVMsRUFBRSxrQkFBa0I7aUNBQzlCO2dDQUNELHdCQUF3QixFQUFFO29DQUN4QixTQUFTLEVBQUUsa0JBQWtCO2lDQUM5Qjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixDQUFDO29CQUNsQyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3VwcGxlbWVudEhhc2hBbmNob3JzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3N1cGxlbWVudC1oYXNoLWFuY2hvcnMvc3VwcGxlbWVudC1oYXNoLWFuY2hvcnMubW9kdWxlJztcbmltcG9ydCB7IFBhcmFncmFwaENvbXBvbmVudCB9IGZyb20gJy4vcGFyYWdyYXBoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFN1cHBsZW1lbnRIYXNoQW5jaG9yc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDTVNQYXJhZ3JhcGhDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFBhcmFncmFwaENvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgICAgQ01TVGFiUGFyYWdyYXBoQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBQYXJhZ3JhcGhDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQYXJhZ3JhcGhDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUGFyYWdyYXBoQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ21zUGFyYWdyYXBoTW9kdWxlIHt9XG4iXX0=