/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitListComponent } from './unit-list.component';
import { IconModule } from '@spartacus/storefront';
import { ListModule } from '../../shared/list/list.module';
import { ToggleLinkCellComponent } from './toggle-link/toggle-link-cell.component';
import * as i0 from "@angular/core";
export class UnitListModule {
}
UnitListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: UnitListModule, declarations: [UnitListComponent, ToggleLinkCellComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        ListModule] });
UnitListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitListModule, imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        ListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ListModule,
                    ],
                    declarations: [UnitListComponent, ToggleLinkCellComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpc3QvdW5pdC1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFhbkYsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFGVixpQkFBaUIsRUFBRSx1QkFBdUIsYUFQdkQsWUFBWTtRQUNaLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7UUFDVixVQUFVOzRHQUlELGNBQWMsWUFUdkIsWUFBWTtRQUNaLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7UUFDVixVQUFVOzJGQUlELGNBQWM7a0JBWDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixVQUFVO3FCQUNYO29CQUNELFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHVCQUF1QixDQUFDO2lCQUMzRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVbml0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vdW5pdC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IExpc3RNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvbGlzdC9saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBUb2dnbGVMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vdG9nZ2xlLWxpbmsvdG9nZ2xlLWxpbmstY2VsbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIExpc3RNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1VuaXRMaXN0Q29tcG9uZW50LCBUb2dnbGVMaW5rQ2VsbENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRMaXN0TW9kdWxlIHt9XG4iXX0=