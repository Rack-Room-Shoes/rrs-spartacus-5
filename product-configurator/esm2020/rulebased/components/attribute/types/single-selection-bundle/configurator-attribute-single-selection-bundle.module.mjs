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
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorAttributeProductCardModule } from '../../product-card/configurator-attribute-product-card.module';
import { ConfiguratorAttributeSingleSelectionBundleComponent } from './configurator-attribute-single-selection-bundle.component';
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeSingleSelectionBundleModule {
}
ConfiguratorAttributeSingleSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, declarations: [ConfiguratorAttributeSingleSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionBundleComponent] });
ConfiguratorAttributeSingleSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        ItemCounterModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1zaW5nbGUtc2VsZWN0aW9uLWJ1bmRsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3R5cGVzL3NpbmdsZS1zZWxlY3Rpb24tYnVuZGxlL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1idW5kbGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdkgsT0FBTyxFQUFFLG1EQUFtRCxFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDakksT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDNUcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBbUJuRixNQUFNLE9BQU8sZ0RBQWdEOzs2SUFBaEQsZ0RBQWdEOzhJQUFoRCxnREFBZ0QsaUJBSDVDLG1EQUFtRCxhQVpoRSxZQUFZO1FBQ1osc0NBQXNDO1FBQ3RDLG1DQUFtQztRQUNuQyxXQUFXO1FBQ1gsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixTQUFTO1FBQ1QsdUJBQXVCLGFBR2YsbURBQW1EOzhJQUVsRCxnREFBZ0QsWUFmekQsWUFBWTtRQUNaLHNDQUFzQztRQUN0QyxtQ0FBbUM7UUFDbkMsV0FBVztRQUNYLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULHVCQUF1QjsyRkFLZCxnREFBZ0Q7a0JBakI1RCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHNDQUFzQzt3QkFDdEMsbUNBQW1DO3dCQUNuQyxXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixTQUFTO3dCQUNULHVCQUF1QjtxQkFDeEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsbURBQW1ELENBQUM7b0JBQ25FLE9BQU8sRUFBRSxDQUFDLG1EQUFtRCxDQUFDO2lCQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEl0ZW1Db3VudGVyTW9kdWxlLCBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVByb2R1Y3RDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJvZHVjdC1jYXJkL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcHJvZHVjdC1jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtc2luZ2xlLXNlbGVjdGlvbi1idW5kbGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVQcm9kdWN0Q2FyZE1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEl0ZW1Db3VudGVyTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIENvbmZpZ3VyYXRvclByaWNlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVTaW5nbGVTZWxlY3Rpb25CdW5kbGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uQnVuZGxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlU2luZ2xlU2VsZWN0aW9uQnVuZGxlTW9kdWxlIHt9XG4iXX0=