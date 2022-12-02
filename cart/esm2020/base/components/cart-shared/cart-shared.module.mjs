/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartOutlets } from '@spartacus/cart/base/root';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { AtMessageModule, IconModule, ItemCounterModule, MediaModule, OutletModule, PromotionsModule, provideOutlet, } from '@spartacus/storefront';
import { CartItemListRowComponent } from './cart-item-list-row/cart-item-list-row.component';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartItemValidationWarningModule } from '../validation/cart-item-warning/cart-item-validation-warning.module';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import * as i0 from "@angular/core";
export class CartSharedModule {
}
CartSharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartSharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartSharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CartSharedModule, declarations: [CartItemComponent,
        OrderSummaryComponent,
        CartItemListComponent,
        CartItemListRowComponent], imports: [AtMessageModule,
        CartCouponModule,
        CartItemValidationWarningModule,
        CommonModule,
        FeaturesConfigModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        OutletModule,
        PromotionsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        AddToCartModule], exports: [CartItemComponent,
        CartItemListRowComponent,
        CartItemListComponent,
        OrderSummaryComponent] });
CartSharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartSharedModule, providers: [
        provideOutlet({
            id: CartOutlets.ORDER_SUMMARY,
            component: OrderSummaryComponent,
        }),
        provideOutlet({
            id: CartOutlets.CART_ITEM_LIST,
            component: CartItemListComponent,
        }),
    ], imports: [AtMessageModule,
        CartCouponModule,
        CartItemValidationWarningModule,
        CommonModule,
        FeaturesConfigModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        OutletModule,
        PromotionsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        AddToCartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartSharedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CartCouponModule,
                        CartItemValidationWarningModule,
                        CommonModule,
                        FeaturesConfigModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        MediaModule,
                        OutletModule,
                        PromotionsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        AddToCartModule,
                    ],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ORDER_SUMMARY,
                            component: OrderSummaryComponent,
                        }),
                        provideOutlet({
                            id: CartOutlets.CART_ITEM_LIST,
                            component: CartItemListComponent,
                        }),
                    ],
                    declarations: [
                        CartItemComponent,
                        OrderSummaryComponent,
                        CartItemListComponent,
                        CartItemListRowComponent,
                    ],
                    exports: [
                        CartItemComponent,
                        CartItemListRowComponent,
                        CartItemListComponent,
                        OrderSummaryComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1zaGFyZWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtc2hhcmVkL2NhcnQtc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUN0SCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBMkNwRSxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBWnpCLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLHdCQUF3QixhQTlCeEIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQiwrQkFBK0I7UUFDL0IsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixVQUFVO1FBQ1YsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxlQUFlLGFBbUJmLGlCQUFpQjtRQUNqQix3QkFBd0I7UUFDeEIscUJBQXFCO1FBQ3JCLHFCQUFxQjs4R0FHWixnQkFBZ0IsYUF2QmhCO1FBQ1QsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxhQUFhO1lBQzdCLFNBQVMsRUFBRSxxQkFBcUI7U0FDakMsQ0FBQztRQUNGLGFBQWEsQ0FBQztZQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMsY0FBYztZQUM5QixTQUFTLEVBQUUscUJBQXFCO1NBQ2pDLENBQUM7S0FDSCxZQXpCQyxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLCtCQUErQjtRQUMvQixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLFVBQVU7UUFDVixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULGVBQWU7MkZBeUJOLGdCQUFnQjtrQkF6QzVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQiwrQkFBK0I7d0JBQy9CLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxlQUFlO3FCQUNoQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYSxDQUFDOzRCQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMsYUFBYTs0QkFDN0IsU0FBUyxFQUFFLHFCQUFxQjt5QkFDakMsQ0FBQzt3QkFDRixhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxjQUFjOzRCQUM5QixTQUFTLEVBQUUscUJBQXFCO3lCQUNqQyxDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3dCQUNyQixxQkFBcUI7cUJBQ3RCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENhcnRPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBGZWF0dXJlc0NvbmZpZ01vZHVsZSwgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEF0TWVzc2FnZU1vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgSXRlbUNvdW50ZXJNb2R1bGUsXG4gIE1lZGlhTW9kdWxlLFxuICBPdXRsZXRNb2R1bGUsXG4gIFByb21vdGlvbnNNb2R1bGUsXG4gIHByb3ZpZGVPdXRsZXQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDYXJ0SXRlbUxpc3RSb3dDb21wb25lbnQgfSBmcm9tICcuL2NhcnQtaXRlbS1saXN0LXJvdy9jYXJ0LWl0ZW0tbGlzdC1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IENhcnRDb3Vwb25Nb2R1bGUgfSBmcm9tICcuLi9jYXJ0LWNvdXBvbi9jYXJ0LWNvdXBvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FydEl0ZW1WYWxpZGF0aW9uV2FybmluZ01vZHVsZSB9IGZyb20gJy4uL3ZhbGlkYXRpb24vY2FydC1pdGVtLXdhcm5pbmcvY2FydC1pdGVtLXZhbGlkYXRpb24td2FybmluZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FydEl0ZW1MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LWl0ZW0tbGlzdC9jYXJ0LWl0ZW0tbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FydEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2NhcnQtaXRlbS9jYXJ0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyU3VtbWFyeUNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItc3VtbWFyeS9vcmRlci1zdW1tYXJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZGRUb0NhcnRNb2R1bGUgfSBmcm9tICcuLi9hZGQtdG8tY2FydC9hZGQtdG8tY2FydC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQXRNZXNzYWdlTW9kdWxlLFxuICAgIENhcnRDb3Vwb25Nb2R1bGUsXG4gICAgQ2FydEl0ZW1WYWxpZGF0aW9uV2FybmluZ01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEl0ZW1Db3VudGVyTW9kdWxlLFxuICAgIE1lZGlhTW9kdWxlLFxuICAgIE91dGxldE1vZHVsZSxcbiAgICBQcm9tb3Rpb25zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBBZGRUb0NhcnRNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVPdXRsZXQoe1xuICAgICAgaWQ6IENhcnRPdXRsZXRzLk9SREVSX1NVTU1BUlksXG4gICAgICBjb21wb25lbnQ6IE9yZGVyU3VtbWFyeUNvbXBvbmVudCxcbiAgICB9KSxcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBDYXJ0T3V0bGV0cy5DQVJUX0lURU1fTElTVCxcbiAgICAgIGNvbXBvbmVudDogQ2FydEl0ZW1MaXN0Q29tcG9uZW50LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYXJ0SXRlbUNvbXBvbmVudCxcbiAgICBPcmRlclN1bW1hcnlDb21wb25lbnQsXG4gICAgQ2FydEl0ZW1MaXN0Q29tcG9uZW50LFxuICAgIENhcnRJdGVtTGlzdFJvd0NvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhcnRJdGVtQ29tcG9uZW50LFxuICAgIENhcnRJdGVtTGlzdFJvd0NvbXBvbmVudCxcbiAgICBDYXJ0SXRlbUxpc3RDb21wb25lbnQsXG4gICAgT3JkZXJTdW1tYXJ5Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0U2hhcmVkTW9kdWxlIHt9XG4iXX0=