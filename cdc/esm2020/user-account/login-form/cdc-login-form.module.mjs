/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthService, GlobalMessageService, I18nModule, provideDefaultConfig, UrlModule, WindowRef, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { LoginFormComponent, LoginFormComponentService, } from '@spartacus/user/account/components';
import { CdcLoginFormComponentService } from './cdc-login-form-component.service';
import * as i0 from "@angular/core";
export class CDCLoginFormModule {
}
CDCLoginFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCLoginFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
CDCLoginFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ReturningCustomerLoginComponent: {
                    component: LoginFormComponent,
                    providers: [
                        {
                            provide: LoginFormComponentService,
                            useClass: CdcLoginFormComponentService,
                            deps: [
                                AuthService,
                                GlobalMessageService,
                                WindowRef,
                                CdcJsService,
                            ],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCLoginFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        FormErrorsModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ReturningCustomerLoginComponent: {
                                    component: LoginFormComponent,
                                    providers: [
                                        {
                                            provide: LoginFormComponentService,
                                            useClass: CdcLoginFormComponentService,
                                            deps: [
                                                AuthService,
                                                GlobalMessageService,
                                                WindowRef,
                                                CdcJsService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWxvZ2luLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvdXNlci1hY2NvdW50L2xvZ2luLWZvcm0vY2RjLWxvZ2luLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsV0FBVyxFQUVYLG9CQUFvQixFQUNwQixVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUNMLGtCQUFrQixFQUNsQix5QkFBeUIsR0FDMUIsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUFtQ2xGLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixZQS9CM0IsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7Z0hBd0JKLGtCQUFrQixhQXRCbEI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsK0JBQStCLEVBQUU7b0JBQy9CLFNBQVMsRUFBRSxrQkFBa0I7b0JBQzdCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUseUJBQXlCOzRCQUNsQyxRQUFRLEVBQUUsNEJBQTRCOzRCQUN0QyxJQUFJLEVBQUU7Z0NBQ0osV0FBVztnQ0FDWCxvQkFBb0I7Z0NBQ3BCLFNBQVM7Z0NBQ1QsWUFBWTs2QkFDYjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBN0JDLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixhQUFhOzJGQXdCSixrQkFBa0I7a0JBakM5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsK0JBQStCLEVBQUU7b0NBQy9CLFNBQVMsRUFBRSxrQkFBa0I7b0NBQzdCLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUseUJBQXlCOzRDQUNsQyxRQUFRLEVBQUUsNEJBQTRCOzRDQUN0QyxJQUFJLEVBQUU7Z0RBQ0osV0FBVztnREFDWCxvQkFBb0I7Z0RBQ3BCLFNBQVM7Z0RBQ1QsWUFBWTs2Q0FDYjt5Q0FDRjtxQ0FDRjtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDZGNKc1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NkYy9yb290JztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBDbXNDb25maWcsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzTW9kdWxlLCBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIExvZ2luRm9ybUNvbXBvbmVudCxcbiAgTG9naW5Gb3JtQ29tcG9uZW50U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBDZGNMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9jZGMtbG9naW4tZm9ybS1jb21wb25lbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgUmV0dXJuaW5nQ3VzdG9tZXJMb2dpbkNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogTG9naW5Gb3JtQ29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBMb2dpbkZvcm1Db21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VDbGFzczogQ2RjTG9naW5Gb3JtQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIFdpbmRvd1JlZixcbiAgICAgICAgICAgICAgICBDZGNKc1NlcnZpY2UsXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDRENMb2dpbkZvcm1Nb2R1bGUge31cbiJdfQ==