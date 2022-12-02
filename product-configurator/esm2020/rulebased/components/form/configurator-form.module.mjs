/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorAttributeFooterModule } from '../attribute/footer/configurator-attribute-footer.module';
import { ConfiguratorAttributeHeaderModule } from '../attribute/header/configurator-attribute-header.module';
import { ConfiguratorAttributeCheckboxListModule } from '../attribute/types/checkbox-list/configurator-attribute-checkbox-list.module';
import { ConfiguratorAttributeCheckboxModule } from '../attribute/types/checkbox/configurator-attribute-checkbox.module';
import { ConfiguratorAttributeDropDownModule } from '../attribute/types/drop-down/configurator-attribute-drop-down.module';
import { ConfiguratorAttributeInputFieldModule } from '../attribute/types/input-field/configurator-attribute-input-field.module';
import { ConfiguratorAttributeMultiSelectionBundleModule } from '../attribute/types/multi-selection-bundle/configurator-attribute-multi-selection-bundle.module';
import { ConfiguratorAttributeMultiSelectionImageModule } from '../attribute/types/multi-selection-image/configurator-attribute-multi-selection-image.module';
import { ConfiguratorAttributeNumericInputFieldModule } from '../attribute/types/numeric-input-field/configurator-attribute-numeric-input-field.module';
import { ConfiguratorAttributeRadioButtonModule } from '../attribute/types/radio-button/configurator-attribute-radio-button.module';
import { ConfiguratorAttributeReadOnlyModule } from '../attribute/types/read-only/configurator-attribute-read-only.module';
import { ConfiguratorAttributeSingleSelectionBundleDropdownModule } from '../attribute/types/single-selection-bundle-dropdown/configurator-attribute-single-selection-bundle-dropdown.module';
import { ConfiguratorAttributeSingleSelectionBundleModule } from '../attribute/types/single-selection-bundle/configurator-attribute-single-selection-bundle.module';
import { ConfiguratorAttributeSingleSelectionImageModule } from '../attribute/types/single-selection-image/configurator-attribute-single-selection-image.module';
import { ConfiguratorConflictDescriptionModule } from '../conflict-description/configurator-conflict-description.module';
import { ConfiguratorConflictSuggestionModule } from '../conflict-suggestion/configurator-conflict-suggestion.module';
import { ConfiguratorFormComponent } from './configurator-form.component';
import * as i0 from "@angular/core";
export class ConfiguratorFormModule {
}
ConfiguratorFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, declarations: [ConfiguratorFormComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule], exports: [ConfiguratorFormComponent] });
ConfiguratorFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorForm: {
                    component: ConfiguratorFormComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        NgSelectModule,
                        ConfiguratorAttributeInputFieldModule,
                        ConfiguratorAttributeFooterModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeHeaderModule,
                        ConfiguratorAttributeRadioButtonModule,
                        ConfiguratorAttributeSingleSelectionBundleModule,
                        ConfiguratorAttributeMultiSelectionBundleModule,
                        ConfiguratorAttributeReadOnlyModule,
                        ConfiguratorAttributeSingleSelectionImageModule,
                        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
                        ConfiguratorAttributeCheckboxModule,
                        ConfiguratorAttributeCheckboxListModule,
                        ConfiguratorAttributeDropDownModule,
                        ConfiguratorAttributeMultiSelectionImageModule,
                        ConfiguratorConflictDescriptionModule,
                        ConfiguratorConflictSuggestionModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorForm: {
                                    component: ConfiguratorFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorFormComponent],
                    exports: [ConfiguratorFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2Zvcm0vY29uZmlndXJhdG9yLWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBYSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUN6SCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUMzSCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsK0NBQStDLEVBQUUsTUFBTSxnR0FBZ0csQ0FBQztBQUNqSyxPQUFPLEVBQUUsOENBQThDLEVBQUUsTUFBTSw4RkFBOEYsQ0FBQztBQUM5SixPQUFPLEVBQUUsNENBQTRDLEVBQUUsTUFBTSwwRkFBMEYsQ0FBQztBQUN4SixPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUNwSSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUMzSCxPQUFPLEVBQUUsd0RBQXdELEVBQUUsTUFBTSxvSEFBb0gsQ0FBQztBQUM5TCxPQUFPLEVBQUUsZ0RBQWdELEVBQUUsTUFBTSxrR0FBa0csQ0FBQztBQUNwSyxPQUFPLEVBQUUsK0NBQStDLEVBQUUsTUFBTSxnR0FBZ0csQ0FBQztBQUNqSyxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUN6SCxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUN0SCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFzQzFFLE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixpQkFIbEIseUJBQXlCLGFBL0J0QyxXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLHFDQUFxQztRQUNyQyxpQ0FBaUM7UUFDakMsNENBQTRDO1FBQzVDLGlDQUFpQztRQUNqQyxzQ0FBc0M7UUFDdEMsZ0RBQWdEO1FBQ2hELCtDQUErQztRQUMvQyxtQ0FBbUM7UUFDbkMsK0NBQStDO1FBQy9DLHdEQUF3RDtRQUN4RCxtQ0FBbUM7UUFDbkMsdUNBQXVDO1FBQ3ZDLG1DQUFtQztRQUNuQyw4Q0FBOEM7UUFDOUMscUNBQXFDO1FBQ3JDLG9DQUFvQyxhQVk1Qix5QkFBeUI7b0hBRXhCLHNCQUFzQixhQVp0QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixnQkFBZ0IsRUFBRTtvQkFDaEIsU0FBUyxFQUFFLHlCQUF5QjtpQkFDckM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQTlCQyxXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLHFDQUFxQztRQUNyQyxpQ0FBaUM7UUFDakMsNENBQTRDO1FBQzVDLGlDQUFpQztRQUNqQyxzQ0FBc0M7UUFDdEMsZ0RBQWdEO1FBQ2hELCtDQUErQztRQUMvQyxtQ0FBbUM7UUFDbkMsK0NBQStDO1FBQy9DLHdEQUF3RDtRQUN4RCxtQ0FBbUM7UUFDbkMsdUNBQXVDO1FBQ3ZDLG1DQUFtQztRQUNuQyw4Q0FBOEM7UUFDOUMscUNBQXFDO1FBQ3JDLG9DQUFvQzsyRkFjM0Isc0JBQXNCO2tCQXBDbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjO3dCQUNkLHFDQUFxQzt3QkFDckMsaUNBQWlDO3dCQUNqQyw0Q0FBNEM7d0JBQzVDLGlDQUFpQzt3QkFDakMsc0NBQXNDO3dCQUN0QyxnREFBZ0Q7d0JBQ2hELCtDQUErQzt3QkFDL0MsbUNBQW1DO3dCQUNuQywrQ0FBK0M7d0JBQy9DLHdEQUF3RDt3QkFDeEQsbUNBQW1DO3dCQUNuQyx1Q0FBdUM7d0JBQ3ZDLG1DQUFtQzt3QkFDbkMsOENBQThDO3dCQUM5QyxxQ0FBcUM7d0JBQ3JDLG9DQUFvQztxQkFDckM7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsZ0JBQWdCLEVBQUU7b0NBQ2hCLFNBQVMsRUFBRSx5QkFBeUI7aUNBQ3JDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IENtc0NvbmZpZywgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlRm9vdGVyTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL2Zvb3Rlci9jb25maWd1cmF0b3ItYXR0cmlidXRlLWZvb3Rlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL2hlYWRlci9jb25maWd1cmF0b3ItYXR0cmlidXRlLWhlYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tib3hMaXN0TW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL3R5cGVzL2NoZWNrYm94LWxpc3QvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jaGVja2JveC1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDaGVja2JveE1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9jaGVja2JveC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNoZWNrYm94Lm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVEcm9wRG93bk1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9kcm9wLWRvd24vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1kcm9wLWRvd24ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZUlucHV0RmllbGRNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvaW5wdXQtZmllbGQvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1pbnB1dC1maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CdW5kbGVNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZU11bHRpU2VsZWN0aW9uSW1hZ2VNb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvbXVsdGktc2VsZWN0aW9uLWltYWdlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWltYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVOdW1lcmljSW5wdXRGaWVsZE1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9udW1lcmljLWlucHV0LWZpZWxkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbnVtZXJpYy1pbnB1dC1maWVsZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUmFkaW9CdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9hdHRyaWJ1dGUvdHlwZXMvcmFkaW8tYnV0dG9uL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcmFkaW8tYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVSZWFkT25seU1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9yZWFkLW9ubHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1yZWFkLW9ubHkubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJ1bmRsZURyb3Bkb3duTW9kdWxlIH0gZnJvbSAnLi4vYXR0cmlidXRlL3R5cGVzL3NpbmdsZS1zZWxlY3Rpb24tYnVuZGxlLWRyb3Bkb3duL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1idW5kbGUtZHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJ1bmRsZU1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLXNpbmdsZS1zZWxlY3Rpb24tYnVuZGxlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25JbWFnZU1vZHVsZSB9IGZyb20gJy4uL2F0dHJpYnV0ZS90eXBlcy9zaW5nbGUtc2VsZWN0aW9uLWltYWdlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1pbWFnZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ29uZmxpY3REZXNjcmlwdGlvbk1vZHVsZSB9IGZyb20gJy4uL2NvbmZsaWN0LWRlc2NyaXB0aW9uL2NvbmZpZ3VyYXRvci1jb25mbGljdC1kZXNjcmlwdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ29uZmxpY3RTdWdnZXN0aW9uTW9kdWxlIH0gZnJvbSAnLi4vY29uZmxpY3Qtc3VnZ2VzdGlvbi9jb25maWd1cmF0b3ItY29uZmxpY3Qtc3VnZ2VzdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWZvcm0uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlSW5wdXRGaWVsZE1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVGb290ZXJNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlTnVtZXJpY0lucHV0RmllbGRNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlSGVhZGVyTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVJhZGlvQnV0dG9uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZVNpbmdsZVNlbGVjdGlvbkJ1bmRsZU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJ1bmRsZU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVSZWFkT25seU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25JbWFnZU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVEcm9wZG93bk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVDaGVja2JveE1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVDaGVja2JveExpc3RNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlRHJvcERvd25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25JbWFnZU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JDb25mbGljdERlc2NyaXB0aW9uTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvckNvbmZsaWN0U3VnZ2VzdGlvbk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyYXRvckZvcm06IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZ3VyYXRvckZvcm1Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JGb3JtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NvbmZpZ3VyYXRvckZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JGb3JtTW9kdWxlIHt9XG4iXX0=