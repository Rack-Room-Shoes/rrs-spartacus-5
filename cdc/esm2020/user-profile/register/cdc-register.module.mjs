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
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthService, CommandService, EventService, GlobalMessageService, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { FormErrorsModule, NgSelectA11yModule, SpinnerModule, } from '@spartacus/storefront';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { CDCRegisterComponentService } from './cdc-register-component.service';
import * as i0 from "@angular/core";
export class CDCRegisterModule {
}
CDCRegisterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCRegisterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
CDCRegisterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                RegisterCustomerComponent: {
                    providers: [
                        {
                            provide: RegisterComponentService,
                            useClass: CDCRegisterComponentService,
                            deps: [
                                UserRegisterFacade,
                                CommandService,
                                Store,
                                CdcJsService,
                                GlobalMessageService,
                                AuthService,
                                EventService,
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
        SpinnerModule,
        FormErrorsModule,
        NgSelectModule,
        NgSelectA11yModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterModule, decorators: [{
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
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                RegisterCustomerComponent: {
                                    providers: [
                                        {
                                            provide: RegisterComponentService,
                                            useClass: CDCRegisterComponentService,
                                            deps: [
                                                UserRegisterFacade,
                                                CommandService,
                                                Store,
                                                CdcJsService,
                                                GlobalMessageService,
                                                AuthService,
                                                EventService,
                                            ],
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJlZ2lzdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItcHJvZmlsZS9yZWdpc3Rlci9jZGMtcmVnaXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxXQUFXLEVBRVgsY0FBYyxFQUNkLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7QUFzQy9FLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixZQWxDMUIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxrQkFBa0I7K0dBMEJULGlCQUFpQixhQXhCakI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IseUJBQXlCLEVBQUU7b0JBQ3pCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsd0JBQXdCOzRCQUNqQyxRQUFRLEVBQUUsMkJBQTJCOzRCQUNyQyxJQUFJLEVBQUU7Z0NBQ0osa0JBQWtCO2dDQUNsQixjQUFjO2dDQUNkLEtBQUs7Z0NBQ0wsWUFBWTtnQ0FDWixvQkFBb0I7Z0NBQ3BCLFdBQVc7Z0NBQ1gsWUFBWTs2QkFDYjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaENDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsa0JBQWtCOzJGQTBCVCxpQkFBaUI7a0JBcEM3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGNBQWM7d0JBQ2Qsa0JBQWtCO3FCQUNuQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYix5QkFBeUIsRUFBRTtvQ0FDekIsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSx3QkFBd0I7NENBQ2pDLFFBQVEsRUFBRSwyQkFBMkI7NENBQ3JDLElBQUksRUFBRTtnREFDSixrQkFBa0I7Z0RBQ2xCLGNBQWM7Z0RBQ2QsS0FBSztnREFDTCxZQUFZO2dEQUNaLG9CQUFvQjtnREFDcEIsV0FBVztnREFDWCxZQUFZOzZDQUNiO3lDQUNGO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IENkY0pzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aFNlcnZpY2UsXG4gIENtc0NvbmZpZyxcbiAgQ29tbWFuZFNlcnZpY2UsXG4gIEV2ZW50U2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBOZ1NlbGVjdEExMXlNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzJztcbmltcG9ydCB7IFVzZXJSZWdpc3RlckZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgQ0RDUmVnaXN0ZXJDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9jZGMtcmVnaXN0ZXItY29tcG9uZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBOZ1NlbGVjdEExMXlNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBSZWdpc3RlckN1c3RvbWVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IFJlZ2lzdGVyQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgdXNlQ2xhc3M6IENEQ1JlZ2lzdGVyQ29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgICAgIFVzZXJSZWdpc3RlckZhY2FkZSxcbiAgICAgICAgICAgICAgICBDb21tYW5kU2VydmljZSxcbiAgICAgICAgICAgICAgICBTdG9yZSxcbiAgICAgICAgICAgICAgICBDZGNKc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQXV0aFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgRXZlbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ0RDUmVnaXN0ZXJNb2R1bGUge31cbiJdfQ==