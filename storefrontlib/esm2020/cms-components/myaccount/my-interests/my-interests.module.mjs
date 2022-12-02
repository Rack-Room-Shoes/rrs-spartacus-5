/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { MyInterestsComponent } from './my-interests.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class MyInterestsModule {
}
MyInterestsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MyInterestsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyInterestsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: MyInterestsModule, declarations: [MyInterestsComponent], imports: [CommonModule,
        I18nModule,
        ListNavigationModule,
        I18nModule,
        UrlModule,
        MediaModule,
        SpinnerModule, i1.RouterModule], exports: [MyInterestsComponent] });
MyInterestsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MyInterestsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MyInterestsComponent: {
                    component: MyInterestsComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        ListNavigationModule,
        I18nModule,
        UrlModule,
        MediaModule,
        SpinnerModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'myInterests' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MyInterestsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MyInterestsComponent],
                    imports: [
                        CommonModule,
                        I18nModule,
                        ListNavigationModule,
                        I18nModule,
                        UrlModule,
                        MediaModule,
                        SpinnerModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'myInterests' },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MyInterestsComponent: {
                                    component: MyInterestsComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    exports: [MyInterestsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktaW50ZXJlc3RzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L215LWludGVyZXN0cy9teS1pbnRlcmVzdHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUNwRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFrQ2hFLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkEvQmIsb0JBQW9CLGFBRWpDLFlBQVk7UUFDWixVQUFVO1FBQ1Ysb0JBQW9CO1FBQ3BCLFVBQVU7UUFDVixTQUFTO1FBQ1QsV0FBVztRQUNYLGFBQWEsOEJBcUJMLG9CQUFvQjsrR0FFbkIsaUJBQWlCLGFBWmpCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLG9CQUFvQixFQUFFO29CQUNwQixTQUFTLEVBQUUsb0JBQW9CO29CQUMvQixNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUExQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsVUFBVTtRQUNWLFNBQVM7UUFDVCxXQUFXO1FBQ1gsYUFBYTtRQUNiLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFO2FBQ2pDO1NBQ0YsQ0FBQzsyRkFjTyxpQkFBaUI7a0JBaEM3QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUNwQyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLG9CQUFvQjt3QkFDcEIsVUFBVTt3QkFDVixTQUFTO3dCQUNULFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUU7NkJBQ2pDO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isb0JBQW9CLEVBQUU7b0NBQ3BCLFNBQVMsRUFBRSxvQkFBb0I7b0NBQy9CLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENtc1BhZ2VHdWFyZCB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvZ3VhcmRzL2Ntcy1wYWdlLmd1YXJkJztcbmltcG9ydCB7IFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2UvcGFnZS1sYXlvdXQvcGFnZS1sYXlvdXQuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3ROYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvbGlzdC1uYXZpZ2F0aW9uL2xpc3QtbmF2aWdhdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTWVkaWFNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5tb2R1bGUnO1xuaW1wb3J0IHsgU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgTXlJbnRlcmVzdHNDb21wb25lbnQgfSBmcm9tICcuL215LWludGVyZXN0cy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNeUludGVyZXN0c0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBMaXN0TmF2aWdhdGlvbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnbXlJbnRlcmVzdHMnIH0sXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgTXlJbnRlcmVzdHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE15SW50ZXJlc3RzQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBleHBvcnRzOiBbTXlJbnRlcmVzdHNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBNeUludGVyZXN0c01vZHVsZSB7fVxuIl19