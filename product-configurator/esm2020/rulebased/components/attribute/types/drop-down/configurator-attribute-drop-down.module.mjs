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
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeDropDownComponent } from './configurator-attribute-drop-down.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeNumericInputFieldModule } from '../numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeInputFieldModule } from '../input-field/configurator-attribute-input-field.module';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeDropDownModule {
}
ConfiguratorAttributeDropDownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeDropDownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, declarations: [ConfiguratorAttributeDropDownComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule], exports: [ConfiguratorAttributeDropDownComponent] });
ConfiguratorAttributeDropDownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                    ],
                    declarations: [ConfiguratorAttributeDropDownComponent],
                    exports: [ConfiguratorAttributeDropDownComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1kcm9wLWRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9kcm9wLWRvd24vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1kcm9wLWRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUM1RyxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUN4SSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQzs7QUFrQmpILE1BQU0sT0FBTyxtQ0FBbUM7O2dJQUFuQyxtQ0FBbUM7aUlBQW5DLG1DQUFtQyxpQkFIL0Isc0NBQXNDLGFBWG5ELFlBQVk7UUFDWixtQ0FBbUM7UUFDbkMsV0FBVztRQUNYLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsY0FBYztRQUNkLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsNENBQTRDO1FBQzVDLHFDQUFxQyxhQUc3QixzQ0FBc0M7aUlBRXJDLG1DQUFtQyxZQWQ1QyxZQUFZO1FBQ1osbUNBQW1DO1FBQ25DLFdBQVc7UUFDWCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGNBQWM7UUFDZCxtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLDRDQUE0QztRQUM1QyxxQ0FBcUM7MkZBSzVCLG1DQUFtQztrQkFoQi9DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUNBQW1DO3dCQUNuQyxXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qiw0Q0FBNEM7d0JBQzVDLHFDQUFxQztxQkFDdEM7b0JBQ0QsWUFBWSxFQUFFLENBQUMsc0NBQXNDLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLHNDQUFzQyxDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSB9IGZyb20gJy4uLy4uL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZURyb3BEb3duQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWRyb3AtZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vbnVtZXJpYy1pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRNb2R1bGUgfSBmcm9tICcuLi9pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWlucHV0LWZpZWxkLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlRHJvcERvd25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlRHJvcERvd25Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVEcm9wRG93bk1vZHVsZSB7fVxuIl19