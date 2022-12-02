/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { GlobalMessageService, I18nModule, NotAuthGuard, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, NgSelectA11yModule, PasswordVisibilityToggleModule, SpinnerModule, } from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { RegisterComponentService } from './register-component.service';
import { RegisterComponent } from './register.component';
import * as i0 from "@angular/core";
export class RegisterComponentModule {
}
RegisterComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RegisterComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentModule, declarations: [RegisterComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule,
        PasswordVisibilityToggleModule] });
RegisterComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                RegisterCustomerComponent: {
                    component: RegisterComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: RegisterComponentService,
                            useClass: RegisterComponentService,
                            deps: [UserRegisterFacade, GlobalMessageService],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        SpinnerModule,
                        FormErrorsModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                RegisterCustomerComponent: {
                                    component: RegisterComponent,
                                    guards: [NotAuthGuard],
                                    providers: [
                                        {
                                            provide: RegisterComponentService,
                                            useClass: RegisterComponentService,
                                            deps: [UserRegisterFacade, GlobalMessageService],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [RegisterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixZQUFZLEVBQ1osb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLDhCQUE4QixFQUM5QixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFrQ3pELE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFGbkIsaUJBQWlCLGFBNUI5QixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQiw4QkFBOEI7cUhBcUJyQix1QkFBdUIsYUFuQnZCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHlCQUF5QixFQUFFO29CQUN6QixTQUFTLEVBQUUsaUJBQWlCO29CQUM1QixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3RCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsd0JBQXdCOzRCQUNqQyxRQUFRLEVBQUUsd0JBQXdCOzRCQUNsQyxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQzt5QkFDakQ7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7S0FDSCxZQTNCQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQiw4QkFBOEI7MkZBcUJyQix1QkFBdUI7a0JBaENuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQiw4QkFBOEI7cUJBQy9CO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHlCQUF5QixFQUFFO29DQUN6QixTQUFTLEVBQUUsaUJBQWlCO29DQUM1QixNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0NBQ3RCLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsd0JBQXdCOzRDQUNqQyxRQUFRLEVBQUUsd0JBQXdCOzRDQUNsQyxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBb0IsQ0FBQzt5Q0FDakQ7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBJMThuTW9kdWxlLFxuICBOb3RBdXRoR3VhcmQsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBOZ1NlbGVjdEExMXlNb2R1bGUsXG4gIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVzZXJSZWdpc3RlckZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9yZWdpc3Rlci1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vcmVnaXN0ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgTmdTZWxlY3RBMTF5TW9kdWxlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFJlZ2lzdGVyQ3VzdG9tZXJDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFJlZ2lzdGVyQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW05vdEF1dGhHdWFyZF0sXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IFJlZ2lzdGVyQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgdXNlQ2xhc3M6IFJlZ2lzdGVyQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgZGVwczogW1VzZXJSZWdpc3RlckZhY2FkZSwgR2xvYmFsTWVzc2FnZVNlcnZpY2VdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbUmVnaXN0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudE1vZHVsZSB7fVxuIl19