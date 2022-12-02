/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard, GlobalMessageService, I18nModule, provideDefaultConfig, RoutingService, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule, PasswordVisibilityToggleModule, } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { UpdatePasswordComponent } from './update-password.component';
import * as i0 from "@angular/core";
export class UpdatePasswordModule {
}
UpdatePasswordModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UpdatePasswordModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordModule, declarations: [UpdatePasswordComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
UpdatePasswordModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UpdatePasswordComponent: {
                    component: UpdatePasswordComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: UpdatePasswordComponentService,
                            useClass: UpdatePasswordComponentService,
                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        I18nModule,
        FormErrorsModule,
        UrlModule,
        RouterModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        SpinnerModule,
                        I18nModule,
                        FormErrorsModule,
                        UrlModule,
                        RouterModule,
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UpdatePasswordComponent: {
                                    component: UpdatePasswordComponent,
                                    guards: [AuthGuard],
                                    providers: [
                                        {
                                            provide: UpdatePasswordComponentService,
                                            useClass: UpdatePasswordComponentService,
                                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [UpdatePasswordComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhc3N3b3JkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL3Byb2ZpbGUvY29tcG9uZW50cy91cGRhdGUtcGFzc3dvcmQvdXBkYXRlLXBhc3N3b3JkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsU0FBUyxFQUVULG9CQUFvQixFQUNwQixVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLGNBQWMsRUFDZCxTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYiw4QkFBOEIsR0FDL0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFpQ3RFLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixpQkFGaEIsdUJBQXVCLGFBM0JwQyxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixTQUFTO1FBQ1QsWUFBWTtRQUNaLDhCQUE4QjtrSEFxQnJCLG9CQUFvQixhQW5CcEI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsdUJBQXVCLEVBQUU7b0JBQ3ZCLFNBQVMsRUFBRSx1QkFBdUI7b0JBQ2xDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDbkIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSw4QkFBOEI7NEJBQ3ZDLFFBQVEsRUFBRSw4QkFBOEI7NEJBQ3hDLElBQUksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQzt5QkFDakU7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7S0FDSCxZQTFCQyxZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixTQUFTO1FBQ1QsWUFBWTtRQUNaLDhCQUE4QjsyRkFxQnJCLG9CQUFvQjtrQkEvQmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWiw4QkFBOEI7cUJBQy9CO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHVCQUF1QixFQUFFO29DQUN2QixTQUFTLEVBQUUsdUJBQXVCO29DQUNsQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0NBQ25CLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsOEJBQThCOzRDQUN2QyxRQUFRLEVBQUUsOEJBQThCOzRDQUN4QyxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUM7eUNBQ2pFO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBSb3V0aW5nU2VydmljZSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbiAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVXNlclBhc3N3b3JkRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuL3VwZGF0ZS1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBVcGRhdGVQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vdXBkYXRlLXBhc3N3b3JkLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZU1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFVwZGF0ZVBhc3N3b3JkQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBVcGRhdGVQYXNzd29yZENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUNsYXNzOiBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2UsXG4gICAgICAgICAgICAgIGRlcHM6IFtVc2VyUGFzc3dvcmRGYWNhZGUsIFJvdXRpbmdTZXJ2aWNlLCBHbG9iYWxNZXNzYWdlU2VydmljZV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtVcGRhdGVQYXNzd29yZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZVBhc3N3b3JkTW9kdWxlIHt9XG4iXX0=