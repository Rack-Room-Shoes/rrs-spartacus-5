/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { IconModule } from '../../misc/icon/icon.module';
import { ConsentManagementFormComponent } from './components/consent-form/consent-management-form.component';
import { ConsentManagementComponent } from './components/consent-management.component';
import * as i0 from "@angular/core";
export class ConsentManagementModule {
}
ConsentManagementModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentManagementModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConsentManagementModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConsentManagementModule, declarations: [ConsentManagementComponent, ConsentManagementFormComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        IconModule], exports: [ConsentManagementComponent, ConsentManagementFormComponent] });
ConsentManagementModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentManagementModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConsentManagementComponent: {
                    component: ConsentManagementComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentManagementModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        IconModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConsentManagementComponent: {
                                    component: ConsentManagementComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [ConsentManagementComponent, ConsentManagementFormComponent],
                    exports: [ConsentManagementComponent, ConsentManagementFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2VudC1tYW5hZ2VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L2NvbnNlbnQtbWFuYWdlbWVudC9jb25zZW50LW1hbmFnZW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7QUF3QnZGLE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFIbkIsMEJBQTBCLEVBQUUsOEJBQThCLGFBakJ2RSxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsVUFBVTtRQUNWLFVBQVUsYUFhRiwwQkFBMEIsRUFBRSw4QkFBOEI7cUhBRXpELHVCQUF1QixhQWJ2QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiwwQkFBMEIsRUFBRTtvQkFDMUIsU0FBUyxFQUFFLDBCQUEwQjtvQkFDckMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaEJDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixVQUFVO1FBQ1YsVUFBVTsyRkFlRCx1QkFBdUI7a0JBdEJuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsVUFBVTtxQkFDWDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwwQkFBMEIsRUFBRTtvQ0FDMUIsU0FBUyxFQUFFLDBCQUEwQjtvQ0FDckMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLDBCQUEwQixFQUFFLDhCQUE4QixDQUFDO29CQUMxRSxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSw4QkFBOEIsQ0FBQztpQkFDdEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Bpbm5lck1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5tb2R1bGUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uL21pc2MvaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25zZW50TWFuYWdlbWVudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtbWFuYWdlbWVudC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25zZW50TWFuYWdlbWVudENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25zZW50LW1hbmFnZW1lbnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ29uc2VudE1hbmFnZW1lbnRDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25zZW50TWFuYWdlbWVudENvbXBvbmVudCwgQ29uc2VudE1hbmFnZW1lbnRGb3JtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbnNlbnRNYW5hZ2VtZW50Q29tcG9uZW50LCBDb25zZW50TWFuYWdlbWVudEZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25zZW50TWFuYWdlbWVudE1vZHVsZSB7fVxuIl19