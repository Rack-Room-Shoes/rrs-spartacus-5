/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
export class AddToSavedCartComponent {
    constructor(activeCartFacade, authService, routingService, vcr, launchDialogService) {
        this.activeCartFacade = activeCartFacade;
        this.authService = authService;
        this.routingService = routingService;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.loggedIn = false;
    }
    ngOnInit() {
        this.cart$ = combineLatest([
            this.activeCartFacade.getActive(),
            this.authService.isUserLoggedIn(),
        ]).pipe(tap(([_, loggedIn]) => (this.loggedIn = loggedIn)), map(([activeCart]) => activeCart));
    }
    saveCart(cart) {
        if (this.loggedIn) {
            this.openDialog(cart);
        }
        else {
            this.routingService.go({ cxRoute: 'login' });
        }
    }
    openDialog(cart) {
        const dialog = this.launchDialogService.openDialog("SAVED_CART" /* LAUNCH_CALLER.SAVED_CART */, this.element, this.vcr, { cart, layoutOption: 'save' });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
AddToSavedCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddToSavedCartComponent, deps: [{ token: i1.ActiveCartFacade }, { token: i2.AuthService }, { token: i2.RoutingService }, { token: i0.ViewContainerRef }, { token: i3.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
AddToSavedCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AddToSavedCartComponent, selector: "cx-add-to-saved-cart", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"cx-add-to-saved-cart-container\">\n    <button\n      class=\"link cx-action-link\"\n      [routerLink]=\"\n        {\n          cxRoute: 'savedCarts'\n        } | cxUrl\n      \"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.savedCarts' | cxTranslate }}</span>\n    </button>\n    <button\n      #element\n      class=\"link cx-action-link\"\n      (click)=\"saveCart(cart)\"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.saveCartForLater' | cxTranslate }}</span>\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AddToSavedCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-saved-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"cx-add-to-saved-cart-container\">\n    <button\n      class=\"link cx-action-link\"\n      [routerLink]=\"\n        {\n          cxRoute: 'savedCarts'\n        } | cxUrl\n      \"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.savedCarts' | cxTranslate }}</span>\n    </button>\n    <button\n      #element\n      class=\"link cx-action-link\"\n      (click)=\"saveCart(cart)\"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.saveCartForLater' | cxTranslate }}</span>\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.AuthService }, { type: i2.RoutingService }, { type: i0.ViewContainerRef }, { type: i3.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLXNhdmVkLWNhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb21wb25lbnRzL2FkZC10by1zYXZlZC1jYXJ0L2FkZC10by1zYXZlZC1jYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3NhdmVkLWNhcnQvY29tcG9uZW50cy9hZGQtdG8tc2F2ZWQtY2FydC9hZGQtdG8tc2F2ZWQtY2FydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBSVQsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxhQUFhLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBT2hELE1BQU0sT0FBTyx1QkFBdUI7SUFRbEMsWUFDWSxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsY0FBOEIsRUFDOUIsR0FBcUIsRUFDckIsbUJBQXdDO1FBSnhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBQ3JCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFaMUMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFZeEIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1NBQ2xDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUNsRCxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FDbEMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBVTtRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsSUFBVTtRQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSw4Q0FFaEQsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsR0FBRyxFQUNSLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FDL0IsQ0FBQztRQUVGLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O29IQWpEVSx1QkFBdUI7d0dBQXZCLHVCQUF1QixnS0MxQnBDLHFsQkF1QkE7MkZER2EsdUJBQXVCO2tCQUxuQyxTQUFTOytCQUNFLHNCQUFzQixtQkFFZix1QkFBdUIsQ0FBQyxNQUFNOytOQU16QixPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIENhcnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWFkZC10by1zYXZlZC1jYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZC10by1zYXZlZC1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFkZFRvU2F2ZWRDYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcm90ZWN0ZWQgbG9nZ2VkSW4gPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCdlbGVtZW50JykgZWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjYXJ0JDogT2JzZXJ2YWJsZTxDYXJ0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYXJ0JCA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmdldEFjdGl2ZSgpLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5pc1VzZXJMb2dnZWRJbigpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YXAoKFtfLCBsb2dnZWRJbl0pID0+ICh0aGlzLmxvZ2dlZEluID0gbG9nZ2VkSW4pKSxcbiAgICAgIG1hcCgoW2FjdGl2ZUNhcnRdKSA9PiBhY3RpdmVDYXJ0KVxuICAgICk7XG4gIH1cblxuICBzYXZlQ2FydChjYXJ0OiBDYXJ0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9nZ2VkSW4pIHtcbiAgICAgIHRoaXMub3BlbkRpYWxvZyhjYXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdsb2dpbicgfSk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkRpYWxvZyhjYXJ0OiBDYXJ0KSB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2coXG4gICAgICBMQVVOQ0hfQ0FMTEVSLlNBVkVEX0NBUlQsXG4gICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICB0aGlzLnZjcixcbiAgICAgIHsgY2FydCwgbGF5b3V0T3B0aW9uOiAnc2F2ZScgfVxuICAgICk7XG5cbiAgICBpZiAoZGlhbG9nKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoZGlhbG9nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY2FydCQgfCBhc3luYyBhcyBjYXJ0XCI+XG4gIDxkaXYgY2xhc3M9XCJjeC1hZGQtdG8tc2F2ZWQtY2FydC1jb250YWluZXJcIj5cbiAgICA8YnV0dG9uXG4gICAgICBjbGFzcz1cImxpbmsgY3gtYWN0aW9uLWxpbmtcIlxuICAgICAgW3JvdXRlckxpbmtdPVwiXG4gICAgICAgIHtcbiAgICAgICAgICBjeFJvdXRlOiAnc2F2ZWRDYXJ0cydcbiAgICAgICAgfSB8IGN4VXJsXG4gICAgICBcIlxuICAgICAgY3hBdXRvRm9jdXNcbiAgICA+XG4gICAgICA8c3Bhbj57eyAnYWRkVG9TYXZlZENhcnQuc2F2ZWRDYXJ0cycgfCBjeFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICAjZWxlbWVudFxuICAgICAgY2xhc3M9XCJsaW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgICAgIChjbGljayk9XCJzYXZlQ2FydChjYXJ0KVwiXG4gICAgICBjeEF1dG9Gb2N1c1xuICAgID5cbiAgICAgIDxzcGFuPnt7ICdhZGRUb1NhdmVkQ2FydC5zYXZlQ2FydEZvckxhdGVyJyB8IGN4VHJhbnNsYXRlIH19PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19