/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationCancel, NavigationEnd, } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@spartacus/core";
export class CartProceedToCheckoutComponent {
    constructor(router) {
        this.router = router;
        this.cartValidationInProgress = false;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel) {
                this.cartValidationInProgress = false;
            }
        }));
    }
    disableButtonWhileNavigation() {
        this.cartValidationInProgress = true;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CartProceedToCheckoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartProceedToCheckoutComponent, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Component });
CartProceedToCheckoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CartProceedToCheckoutComponent, selector: "cx-cart-proceed-to-checkout", ngImport: i0, template: "<cx-progress-button\n  (clickEvent)=\"disableButtonWhileNavigation()\"\n  [class]=\"'btn btn-primary btn-block'\"\n  [disabled]=\"cartValidationInProgress\"\n  [loading]=\"cartValidationInProgress\"\n  [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n  tabindex=\"-1\"\n>\n  {{\n    (!cartValidationInProgress\n      ? 'cartDetails.proceedToCheckout'\n      : 'validation.inProgress'\n    ) | cxTranslate\n  }}\n</cx-progress-button>\n", dependencies: [{ kind: "component", type: i2.ProgressButtonComponent, selector: "cx-progress-button", inputs: ["ariaLabel", "class", "disabled", "loading"], outputs: ["clickEvent"] }, { kind: "directive", type: i1.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartProceedToCheckoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-proceed-to-checkout', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-progress-button\n  (clickEvent)=\"disableButtonWhileNavigation()\"\n  [class]=\"'btn btn-primary btn-block'\"\n  [disabled]=\"cartValidationInProgress\"\n  [loading]=\"cartValidationInProgress\"\n  [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n  tabindex=\"-1\"\n>\n  {{\n    (!cartValidationInProgress\n      ? 'cartDetails.proceedToCheckout'\n      : 'validation.inProgress'\n    ) | cxTranslate\n  }}\n</cx-progress-button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQvY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQvY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFFTCxnQkFBZ0IsRUFDaEIsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBT3pCLE1BQU0sT0FBTyw4QkFBOEI7SUFLekMsWUFBc0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFKcEMsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVMLENBQUM7SUFFeEMsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUM1QyxJQUNFLEtBQUssWUFBWSxhQUFhO2dCQUM5QixLQUFLLFlBQVksZ0JBQWdCLEVBQ2pDO2dCQUNBLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELDRCQUE0QjtRQUMxQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzsySEExQlUsOEJBQThCOytHQUE5Qiw4QkFBOEIsbUVDekIzQyxzYkFlQTsyRkRVYSw4QkFBOEI7a0JBTDFDLFNBQVM7K0JBQ0UsNkJBQTZCLG1CQUV0Qix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBFdmVudCxcbiAgTmF2aWdhdGlvbkNhbmNlbCxcbiAgTmF2aWdhdGlvbkVuZCxcbiAgUm91dGVyLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENhcnRQcm9jZWVkVG9DaGVja291dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY2FydFZhbGlkYXRpb25JblByb2dyZXNzID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHxcbiAgICAgICAgICBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25DYW5jZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jYXJ0VmFsaWRhdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbldoaWxlTmF2aWdhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLmNhcnRWYWxpZGF0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8Y3gtcHJvZ3Jlc3MtYnV0dG9uXG4gIChjbGlja0V2ZW50KT1cImRpc2FibGVCdXR0b25XaGlsZU5hdmlnYXRpb24oKVwiXG4gIFtjbGFzc109XCInYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9jaydcIlxuICBbZGlzYWJsZWRdPVwiY2FydFZhbGlkYXRpb25JblByb2dyZXNzXCJcbiAgW2xvYWRpbmddPVwiY2FydFZhbGlkYXRpb25JblByb2dyZXNzXCJcbiAgW3JvdXRlckxpbmtdPVwieyBjeFJvdXRlOiAnY2hlY2tvdXQnIH0gfCBjeFVybFwiXG4gIHRhYmluZGV4PVwiLTFcIlxuPlxuICB7e1xuICAgICghY2FydFZhbGlkYXRpb25JblByb2dyZXNzXG4gICAgICA/ICdjYXJ0RGV0YWlscy5wcm9jZWVkVG9DaGVja291dCdcbiAgICAgIDogJ3ZhbGlkYXRpb24uaW5Qcm9ncmVzcydcbiAgICApIHwgY3hUcmFuc2xhdGVcbiAgfX1cbjwvY3gtcHJvZ3Jlc3MtYnV0dG9uPlxuIl19