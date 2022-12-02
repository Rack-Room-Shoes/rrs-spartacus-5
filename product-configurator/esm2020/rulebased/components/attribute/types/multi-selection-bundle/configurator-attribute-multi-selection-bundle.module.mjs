/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeMultiSelectionBundleModule {
}
ConfiguratorAttributeMultiSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeMultiSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, declarations: [ConfiguratorAttributeMultiSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeMultiSelectionBundleComponent] });
ConfiguratorAttributeMultiSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
                    exports: [ConfiguratorAttributeMultiSelectionBundleComponent],
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1tdWx0aS1zZWxlY3Rpb24tYnVuZGxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLW11bHRpLXNlbGVjdGlvbi1idW5kbGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdkgsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDNUcsT0FBTyxFQUFFLGtEQUFrRCxFQUFFLE1BQU0sMkRBQTJELENBQUM7O0FBa0IvSCxNQUFNLE9BQU8sK0NBQStDOzs0SUFBL0MsK0NBQStDOzZJQUEvQywrQ0FBK0MsaUJBZjNDLGtEQUFrRCxhQUcvRCxZQUFZO1FBQ1osc0NBQXNDO1FBQ3RDLFdBQVc7UUFDWCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULG1DQUFtQztRQUNuQyx1QkFBdUIsYUFYZixrREFBa0Q7NklBY2pELCtDQUErQyxZQVp4RCxZQUFZO1FBQ1osc0NBQXNDO1FBQ3RDLFdBQVc7UUFDWCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULG1DQUFtQztRQUNuQyx1QkFBdUI7MkZBR2QsK0NBQStDO2tCQWhCM0QsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxrREFBa0QsQ0FBQztvQkFDbEUsT0FBTyxFQUFFLENBQUMsa0RBQWtELENBQUM7b0JBQzdELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHNDQUFzQzt3QkFDdEMsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsbUNBQW1DO3dCQUNuQyx1QkFBdUI7cUJBQ3hCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRNb2R1bGUgfSBmcm9tICcuLi8uLi9wcm9kdWN0LWNhcmQvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1wcm9kdWN0LWNhcmQubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CdW5kbGVDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtbXVsdGktc2VsZWN0aW9uLWJ1bmRsZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJ1bmRsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVNdWx0aVNlbGVjdGlvbkJ1bmRsZUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlUHJvZHVjdENhcmRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JQcmljZU1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlTXVsdGlTZWxlY3Rpb25CdW5kbGVNb2R1bGUge31cbiJdfQ==