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
import { ConfiguratorAttributeQuantityModule } from '../../quantity/configurator-attribute-quantity.module';
import { ConfiguratorAttributeCheckBoxListComponent } from './configurator-attribute-checkbox-list.component';
import { ConfiguratorPriceModule } from '../../../price/configurator-price.module';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeCheckboxListModule {
}
ConfiguratorAttributeCheckboxListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCheckboxListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, declarations: [ConfiguratorAttributeCheckBoxListComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeCheckBoxListComponent] });
ConfiguratorAttributeCheckboxListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeCheckBoxListComponent],
                    exports: [ConfiguratorAttributeCheckBoxListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1jaGVja2JveC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvY2hlY2tib3gtbGlzdC9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNoZWNrYm94LWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzVHLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzlHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQWVuRixNQUFNLE9BQU8sdUNBQXVDOztvSUFBdkMsdUNBQXVDO3FJQUF2Qyx1Q0FBdUMsaUJBSG5DLDBDQUEwQyxhQVJ2RCxtQkFBbUI7UUFDbkIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLG1DQUFtQztRQUNuQyx1QkFBdUIsYUFHZiwwQ0FBMEM7cUlBRXpDLHVDQUF1QyxZQVhoRCxtQkFBbUI7UUFDbkIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLG1DQUFtQztRQUNuQyx1QkFBdUI7MkZBS2QsdUNBQXVDO2tCQWJuRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsbUNBQW1DO3dCQUNuQyx1QkFBdUI7cUJBQ3hCO29CQUNELFlBQVksRUFBRSxDQUFDLDBDQUEwQyxDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztpQkFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckF0dHJpYnV0ZVF1YW50aXR5TW9kdWxlIH0gZnJvbSAnLi4vLi4vcXVhbnRpdHkvY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQXR0cmlidXRlQ2hlY2tCb3hMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItYXR0cmlidXRlLWNoZWNrYm94LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByaWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vcHJpY2UvY29uZmlndXJhdG9yLXByaWNlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUsXG4gICAgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckF0dHJpYnV0ZUNoZWNrQm94TGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVDaGVja0JveExpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVDaGVja2JveExpc3RNb2R1bGUge31cbiJdfQ==