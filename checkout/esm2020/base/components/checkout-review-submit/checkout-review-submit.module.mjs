/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, OutletModule, PromotionsModule, } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutReviewSubmitComponent } from './checkout-review-submit.component';
import * as i0 from "@angular/core";
export class CheckoutReviewSubmitModule {
}
CheckoutReviewSubmitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutReviewSubmitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, declarations: [CheckoutReviewSubmitComponent], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule], exports: [CheckoutReviewSubmitComponent] });
CheckoutReviewSubmitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutReviewOrder: {
                    component: CheckoutReviewSubmitComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutReviewSubmitModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                        PromotionsModule,
                        IconModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutReviewOrder: {
                                    component: CheckoutReviewSubmitComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutReviewSubmitComponent],
                    exports: [CheckoutReviewSubmitComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LXJldmlldy1zdWJtaXQvY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBRUwsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsVUFBVSxFQUNWLFVBQVUsRUFDVixZQUFZLEVBQ1osZ0JBQWdCLEdBQ2pCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBMEJuRixNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsaUJBSHRCLDZCQUE2QixhQW5CMUMsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLFlBQVksYUFhSiw2QkFBNkI7d0hBRTVCLDBCQUEwQixhQWIxQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixtQkFBbUIsRUFBRTtvQkFDbkIsU0FBUyxFQUFFLDZCQUE2QjtvQkFDeEMsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFsQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLFlBQVk7MkZBZUgsMEJBQTBCO2tCQXhCdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVixZQUFZO3FCQUNiO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLG1CQUFtQixFQUFFO29DQUNuQixTQUFTLEVBQUUsNkJBQTZCO29DQUN4QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztpQ0FDL0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztvQkFDN0MsT0FBTyxFQUFFLENBQUMsNkJBQTZCLENBQUM7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FyZE1vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgT3V0bGV0TW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydE5vdEVtcHR5R3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvY2FydC1ub3QtZW1wdHkuZ3VhcmQnO1xuaW1wb3J0IHsgQ2hlY2tvdXRBdXRoR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvY2hlY2tvdXQtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDaGVja291dFJldmlld1N1Ym1pdENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFByb21vdGlvbnNNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDaGVja291dFJldmlld09yZGVyOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDaGVja291dFJldmlld1N1Ym1pdENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtDaGVja291dEF1dGhHdWFyZCwgQ2FydE5vdEVtcHR5R3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2hlY2tvdXRSZXZpZXdTdWJtaXRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXRSZXZpZXdTdWJtaXRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dFJldmlld1N1Ym1pdE1vZHVsZSB7fVxuIl19