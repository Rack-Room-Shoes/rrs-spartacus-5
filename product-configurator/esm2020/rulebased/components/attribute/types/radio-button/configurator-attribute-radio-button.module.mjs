/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeInputFieldModule } from '../input-field/configurator-attribute-input-field.module';
import { ConfiguratorAttributeNumericInputFieldModule } from '../numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeRadioButtonModule {
}
ConfiguratorAttributeRadioButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeRadioButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, declarations: [ConfiguratorAttributeRadioButtonComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule], exports: [ConfiguratorAttributeRadioButtonComponent] });
ConfiguratorAttributeRadioButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                    ],
                    declarations: [ConfiguratorAttributeRadioButtonComponent],
                    exports: [ConfiguratorAttributeRadioButtonComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1yYWRpby1idXR0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2F0dHJpYnV0ZS90eXBlcy9yYWRpby1idXR0b24vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1yYWRpby1idXR0b24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2pILE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOztBQWlCNUcsTUFBTSxPQUFPLHNDQUFzQzs7bUlBQXRDLHNDQUFzQztvSUFBdEMsc0NBQXNDLGlCQUhsQyx5Q0FBeUMsYUFWdEQsWUFBWTtRQUNaLG1DQUFtQztRQUNuQyxXQUFXO1FBQ1gsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLDRDQUE0QztRQUM1QyxxQ0FBcUMsYUFHN0IseUNBQXlDO29JQUV4QyxzQ0FBc0MsWUFiL0MsWUFBWTtRQUNaLG1DQUFtQztRQUNuQyxXQUFXO1FBQ1gsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLDRDQUE0QztRQUM1QyxxQ0FBcUM7MkZBSzVCLHNDQUFzQztrQkFmbEQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQ0FBbUM7d0JBQ25DLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qiw0Q0FBNEM7d0JBQzVDLHFDQUFxQztxQkFDdEM7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUNBQXlDLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUNyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEtleWJvYXJkRm9jdXNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZE1vZHVsZSB9IGZyb20gJy4uL2lucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vbnVtZXJpYy1pbnB1dC1maWVsZC9jb25maWd1cmF0b3ItYXR0cmlidXRlLW51bWVyaWMtaW5wdXQtZmllbGQubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVJhZGlvQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLXJhZGlvLWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvclByaWNlTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZU51bWVyaWNJbnB1dEZpZWxkTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZVJhZGlvQnV0dG9uQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZVJhZGlvQnV0dG9uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlUmFkaW9CdXR0b25Nb2R1bGUge31cbiJdfQ==