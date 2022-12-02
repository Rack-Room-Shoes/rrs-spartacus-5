/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, OutletModule, PromotionsModule, } from '@spartacus/storefront';
import { B2BCheckoutReviewSubmitComponent } from './checkout-review-submit.component';
import * as i0 from "@angular/core";
export class B2BCheckoutReviewSubmitModule {
}
B2BCheckoutReviewSubmitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BCheckoutReviewSubmitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
B2BCheckoutReviewSubmitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: B2BCheckoutReviewSubmitModule, declarations: [B2BCheckoutReviewSubmitComponent], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule], exports: [B2BCheckoutReviewSubmitComponent] });
B2BCheckoutReviewSubmitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BCheckoutReviewSubmitModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutReviewOrder: {
                    component: B2BCheckoutReviewSubmitComponent,
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BCheckoutReviewSubmitModule, decorators: [{
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
                                    component: B2BCheckoutReviewSubmitComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [B2BCheckoutReviewSubmitComponent],
                    exports: [B2BCheckoutReviewSubmitComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvbXBvbmVudHMvY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC9jaGVja291dC1yZXZpZXctc3VibWl0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0scUNBQXFDLENBQUM7QUFDN0MsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1YsWUFBWSxFQUNaLGdCQUFnQixHQUNqQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQTBCdEYsTUFBTSxPQUFPLDZCQUE2Qjs7MEhBQTdCLDZCQUE2QjsySEFBN0IsNkJBQTZCLGlCQUh6QixnQ0FBZ0MsYUFuQjdDLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVTtRQUNWLFNBQVM7UUFDVCxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixZQUFZLGFBYUosZ0NBQWdDOzJIQUUvQiw2QkFBNkIsYUFiN0I7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsbUJBQW1CLEVBQUU7b0JBQ25CLFNBQVMsRUFBRSxnQ0FBZ0M7b0JBQzNDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2lCQUMvQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBbEJDLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVTtRQUNWLFNBQVM7UUFDVCxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixZQUFZOzJGQWVILDZCQUE2QjtrQkF4QnpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLFVBQVU7d0JBQ1YsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixtQkFBbUIsRUFBRTtvQ0FDbkIsU0FBUyxFQUFFLGdDQUFnQztvQ0FDM0MsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUNBQy9DOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7b0JBQ2hELE9BQU8sRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENhcnROb3RFbXB0eUd1YXJkLFxuICBDaGVja291dEF1dGhHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FyZE1vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgT3V0bGV0TW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQjJCQ2hlY2tvdXRSZXZpZXdTdWJtaXRDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrb3V0LXJldmlldy1zdWJtaXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBQcm9tb3Rpb25zTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2hlY2tvdXRSZXZpZXdPcmRlcjoge1xuICAgICAgICAgIGNvbXBvbmVudDogQjJCQ2hlY2tvdXRSZXZpZXdTdWJtaXRDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQ2hlY2tvdXRBdXRoR3VhcmQsIENhcnROb3RFbXB0eUd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0IyQkNoZWNrb3V0UmV2aWV3U3VibWl0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0IyQkNoZWNrb3V0UmV2aWV3U3VibWl0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQjJCQ2hlY2tvdXRSZXZpZXdTdWJtaXRNb2R1bGUge31cbiJdfQ==