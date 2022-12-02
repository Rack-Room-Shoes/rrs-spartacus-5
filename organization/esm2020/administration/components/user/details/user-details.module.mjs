/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { CardModule } from '../../shared/card/card.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { UserDetailsComponent } from './user-details.component';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';
import * as i0 from "@angular/core";
export class UserDetailsModule {
}
UserDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: UserDetailsModule, declarations: [UserDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule], exports: [UserDetailsComponent] });
UserDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        DisableInfoModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [UserDetailsComponent],
                    exports: [UserDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL2RldGFpbHMvdXNlci1kZXRhaWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDOztBQWlCekYsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQUhiLG9CQUFvQixhQVZqQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG1CQUFtQixhQUdYLG9CQUFvQjsrR0FFbkIsaUJBQWlCLFlBYjFCLFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1Ysa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsbUJBQW1COzJGQUtWLGlCQUFpQjtrQkFmN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEl0ZW1FeGlzdHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaXRlbS1leGlzdHMubW9kdWxlJztcbmltcG9ydCB7IENhcmRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBUb2dnbGVTdGF0dXNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZGV0YWlsL3RvZ2dsZS1zdGF0dXMtYWN0aW9uL3RvZ2dsZS1zdGF0dXMubW9kdWxlJztcbmltcG9ydCB7IFVzZXJEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IERpc2FibGVJbmZvTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RldGFpbC9kaXNhYmxlLWluZm8vZGlzYWJsZS1pbmZvLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVG9nZ2xlU3RhdHVzTW9kdWxlLFxuICAgIEl0ZW1FeGlzdHNNb2R1bGUsXG4gICAgRGlzYWJsZUluZm9Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVXNlckRldGFpbHNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVXNlckRldGFpbHNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyRGV0YWlsc01vZHVsZSB7fVxuIl19