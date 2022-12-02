/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule, PasswordVisibilityToggleModule, } from '@spartacus/storefront';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { AsmToggleUiComponent } from './asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
import { defaultAsmLayoutConfig } from './default-asm-layout.config';
import * as i0 from "@angular/core";
export class AsmComponentsModule {
}
AsmComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, declarations: [AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule], exports: [AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent] });
AsmComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, providers: [provideDefaultConfig(defaultAsmLayoutConfig)], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        FormErrorsModule,
                        PasswordVisibilityToggleModule,
                    ],
                    declarations: [
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                    ],
                    exports: [
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                    ],
                    providers: [provideDefaultConfig(defaultAsmLayoutConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb21wb25lbnRzL2FzbS1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsOEJBQThCLEdBQy9CLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDekUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQThCckUsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQW5CNUIsa0JBQWtCO1FBQ2xCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZiwwQkFBMEI7UUFDMUIsb0JBQW9CLGFBYnBCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQiw4QkFBOEIsYUFZOUIsa0JBQWtCO1FBQ2xCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZiwwQkFBMEI7UUFDMUIsb0JBQW9CO2lIQUlYLG1CQUFtQixhQUZuQixDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixDQUFDLENBQUMsWUF4QnZELFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQiw4QkFBOEI7MkZBc0JyQixtQkFBbUI7a0JBNUIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLDhCQUE4QjtxQkFDL0I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGtCQUFrQjt3QkFDbEIseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBQzFCLHdCQUF3Qjt3QkFDeEIsZUFBZTt3QkFDZiwwQkFBMEI7d0JBQzFCLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtCQUFrQjt3QkFDbEIseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBQzFCLHdCQUF3Qjt3QkFDeEIsZUFBZTt3QkFDZiwwQkFBMEI7d0JBQzFCLG9CQUFvQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsQ0FBQztpQkFDMUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtRXJyb3JzTW9kdWxlLFxuICBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBBc21NYWluVWlDb21wb25lbnQgfSBmcm9tICcuL2FzbS1tYWluLXVpL2FzbS1tYWluLXVpLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21TZXNzaW9uVGltZXJDb21wb25lbnQgfSBmcm9tICcuL2FzbS1zZXNzaW9uLXRpbWVyL2FzbS1zZXNzaW9uLXRpbWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtYXRUaW1lclBpcGUgfSBmcm9tICcuL2FzbS1zZXNzaW9uLXRpbWVyL2Zvcm1hdC10aW1lci5waXBlJztcbmltcG9ydCB7IEFzbVRvZ2dsZVVpQ29tcG9uZW50IH0gZnJvbSAnLi9hc20tdG9nZ2xlLXVpL2FzbS10b2dnbGUtdWkuY29tcG9uZW50JztcbmltcG9ydCB7IENTQWdlbnRMb2dpbkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NzYWdlbnQtbG9naW4tZm9ybS9jc2FnZW50LWxvZ2luLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbWVyRW11bGF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21lclNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tZXItc2VsZWN0aW9uL2N1c3RvbWVyLXNlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdEFzbUxheW91dENvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1hc20tbGF5b3V0LmNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBc21NYWluVWlDb21wb25lbnQsXG4gICAgQ1NBZ2VudExvZ2luRm9ybUNvbXBvbmVudCxcbiAgICBDdXN0b21lclNlbGVjdGlvbkNvbXBvbmVudCxcbiAgICBBc21TZXNzaW9uVGltZXJDb21wb25lbnQsXG4gICAgRm9ybWF0VGltZXJQaXBlLFxuICAgIEN1c3RvbWVyRW11bGF0aW9uQ29tcG9uZW50LFxuICAgIEFzbVRvZ2dsZVVpQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQXNtTWFpblVpQ29tcG9uZW50LFxuICAgIENTQWdlbnRMb2dpbkZvcm1Db21wb25lbnQsXG4gICAgQ3VzdG9tZXJTZWxlY3Rpb25Db21wb25lbnQsXG4gICAgQXNtU2Vzc2lvblRpbWVyQ29tcG9uZW50LFxuICAgIEZvcm1hdFRpbWVyUGlwZSxcbiAgICBDdXN0b21lckVtdWxhdGlvbkNvbXBvbmVudCxcbiAgICBBc21Ub2dnbGVVaUNvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdEFzbUxheW91dENvbmZpZyldLFxufSlcbmV4cG9ydCBjbGFzcyBBc21Db21wb25lbnRzTW9kdWxlIHt9XG4iXX0=