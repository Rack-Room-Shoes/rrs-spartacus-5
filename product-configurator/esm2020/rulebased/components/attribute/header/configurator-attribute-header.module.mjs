/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorAttributeHeaderComponent } from './configurator-attribute-header.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeHeaderModule {
}
ConfiguratorAttributeHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, declarations: [ConfiguratorAttributeHeaderComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule], exports: [ConfiguratorAttributeHeaderComponent] });
ConfiguratorAttributeHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        NgSelectModule,
                    ],
                    declarations: [ConfiguratorAttributeHeaderComponent],
                    exports: [ConfiguratorAttributeHeaderComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS9oZWFkZXIvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBY2pHLE1BQU0sT0FBTyxpQ0FBaUM7OzhIQUFqQyxpQ0FBaUM7K0hBQWpDLGlDQUFpQyxpQkFIN0Isb0NBQW9DLGFBUGpELFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsY0FBYyxhQUdOLG9DQUFvQzsrSEFFbkMsaUNBQWlDLFlBVjFDLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsY0FBYzsyRkFLTCxpQ0FBaUM7a0JBWjdDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixjQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRSxDQUFDLG9DQUFvQyxDQUFDO29CQUNwRCxPQUFPLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWhlYWRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVIZWFkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyTW9kdWxlIHt9XG4iXX0=