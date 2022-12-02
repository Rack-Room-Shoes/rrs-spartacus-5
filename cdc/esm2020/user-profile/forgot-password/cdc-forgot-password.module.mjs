/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthConfigService, GlobalMessageService, I18nModule, provideDefaultConfig, RoutingService, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { ForgotPasswordComponent, ForgotPasswordComponentService, } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { CDCForgotPasswordComponentService } from './cdc-forgot-password-component.service';
import * as i0 from "@angular/core";
export class CDCForgotPasswordModule {
}
CDCForgotPasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCForgotPasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule] });
CDCForgotPasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ForgotPasswordComponent: {
                    component: ForgotPasswordComponent,
                    providers: [
                        {
                            provide: ForgotPasswordComponentService,
                            useClass: CDCForgotPasswordComponentService,
                            deps: [
                                UserPasswordFacade,
                                RoutingService,
                                AuthConfigService,
                                GlobalMessageService,
                                CdcJsService,
                            ],
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
        FormErrorsModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
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
                                ForgotPasswordComponent: {
                                    component: ForgotPasswordComponent,
                                    providers: [
                                        {
                                            provide: ForgotPasswordComponentService,
                                            useClass: CDCForgotPasswordComponentService,
                                            deps: [
                                                UserPasswordFacade,
                                                RoutingService,
                                                AuthConfigService,
                                                GlobalMessageService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWZvcmdvdC1wYXNzd29yZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy91c2VyLXByb2ZpbGUvZm9yZ290LXBhc3N3b3JkL2NkYy1mb3Jnb3QtcGFzc3dvcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsY0FBYyxFQUNkLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLDhCQUE4QixHQUMvQixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztBQW1DNUYsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLFlBL0JoQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixhQUFhO3FIQXlCSix1QkFBdUIsYUF2QnZCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHVCQUF1QixFQUFFO29CQUN2QixTQUFTLEVBQUUsdUJBQXVCO29CQUNsQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsUUFBUSxFQUFFLGlDQUFpQzs0QkFDM0MsSUFBSSxFQUFFO2dDQUNKLGtCQUFrQjtnQ0FDbEIsY0FBYztnQ0FDZCxpQkFBaUI7Z0NBQ2pCLG9CQUFvQjtnQ0FDcEIsWUFBWTs2QkFDYjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBN0JDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7MkZBeUJKLHVCQUF1QjtrQkFqQ25DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLGFBQWE7cUJBQ2Q7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsdUJBQXVCLEVBQUU7b0NBQ3ZCLFNBQVMsRUFBRSx1QkFBdUI7b0NBQ2xDLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsOEJBQThCOzRDQUN2QyxRQUFRLEVBQUUsaUNBQWlDOzRDQUMzQyxJQUFJLEVBQUU7Z0RBQ0osa0JBQWtCO2dEQUNsQixjQUFjO2dEQUNkLGlCQUFpQjtnREFDakIsb0JBQW9CO2dEQUNwQixZQUFZOzZDQUNiO3lDQUNGO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2RjSnNTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5pbXBvcnQge1xuICBBdXRoQ29uZmlnU2VydmljZSxcbiAgQ21zQ29uZmlnLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzTW9kdWxlLCBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50LFxuICBGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgVXNlclBhc3N3b3JkRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBDRENGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL2NkYy1mb3Jnb3QtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBGb3Jnb3RQYXNzd29yZENvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogRm9yZ290UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VDbGFzczogQ0RDRm9yZ290UGFzc3dvcmRDb21wb25lbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICAgICAgVXNlclBhc3N3b3JkRmFjYWRlLFxuICAgICAgICAgICAgICAgIFJvdXRpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEF1dGhDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIENkY0pzU2VydmljZSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENEQ0ZvcmdvdFBhc3N3b3JkTW9kdWxlIHt9XG4iXX0=