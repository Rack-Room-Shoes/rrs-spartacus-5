/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@spartacus/core";
import * as i3 from "../services/checkout-config.service";
import * as i4 from "../services/express-checkout.service";
import * as i5 from "@spartacus/cart/base/root";
import * as i6 from "../services/checkout-step.service";
export class CheckoutGuard {
    constructor(router, routingConfigService, checkoutConfigService, expressCheckoutService, activeCartFacade, checkoutStepService) {
        this.router = router;
        this.routingConfigService = routingConfigService;
        this.checkoutConfigService = checkoutConfigService;
        this.expressCheckoutService = expressCheckoutService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.firstStep$ = of(this.router.parseUrl(this.routingConfigService.getRouteConfig(this.checkoutStepService.getFirstCheckoutStepRoute())?.paths?.[0]));
    }
    canActivate() {
        const expressCheckout$ = this.expressCheckoutService
            .trySetDefaultCheckoutDetails()
            .pipe(switchMap((expressCheckoutPossible) => {
            const reviewOrderRoute = this.checkoutStepService.getCheckoutStepRoute("reviewOrder" /* CheckoutStepType.REVIEW_ORDER */);
            return expressCheckoutPossible && reviewOrderRoute
                ? of(this.router.parseUrl(this.routingConfigService.getRouteConfig(reviewOrderRoute)
                    ?.paths?.[0]))
                : this.firstStep$;
        }));
        return this.activeCartFacade
            .isGuestCart()
            .pipe(switchMap((isGuestCart) => this.checkoutConfigService.isExpressCheckout() && !isGuestCart
            ? expressCheckout$
            : this.firstStep$));
    }
}
CheckoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutGuard, deps: [{ token: i1.Router }, { token: i2.RoutingConfigService }, { token: i3.CheckoutConfigService }, { token: i4.ExpressCheckoutService }, { token: i5.ActiveCartFacade }, { token: i6.CheckoutStepService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.RoutingConfigService }, { type: i3.CheckoutConfigService }, { type: i4.ExpressCheckoutService }, { type: i5.ActiveCartFacade }, { type: i6.CheckoutStepService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2d1YXJkcy9jaGVja291dC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFRM0MsTUFBTSxPQUFPLGFBQWE7SUFHeEIsWUFDWSxNQUFjLEVBQ2Qsb0JBQTBDLEVBQzFDLHFCQUE0QyxFQUM1QyxzQkFBOEMsRUFDOUMsZ0JBQWtDLEVBQ2xDLG1CQUF3QztRQUx4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRWxELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FDdEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHlCQUF5QixFQUFFLENBQ3JELEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFXLENBQ3hCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCO2FBQ2pELDRCQUE0QixFQUFFO2FBQzlCLElBQUksQ0FDSCxTQUFTLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sZ0JBQWdCLEdBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsbURBRTVDLENBQUM7WUFDSixPQUFPLHVCQUF1QixJQUFJLGdCQUFnQjtnQkFDaEQsQ0FBQyxDQUFDLEVBQUUsQ0FDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDeEQsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQVcsQ0FDekIsQ0FDRjtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUosT0FBTyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3pCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FDSCxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUN4QixJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDNUQsQ0FBQyxDQUFDLGdCQUFnQjtZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FDcEIsQ0FDRixDQUFDO0lBQ04sQ0FBQzs7MEdBakRVLGFBQWE7OEdBQWIsYUFBYSxjQUZaLE1BQU07MkZBRVAsYUFBYTtrQkFIekIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IENoZWNrb3V0U3RlcFR5cGUgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBSb3V0aW5nQ29uZmlnU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2hlY2tvdXQtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tvdXRTdGVwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NoZWNrb3V0LXN0ZXAuc2VydmljZSc7XG5pbXBvcnQgeyBFeHByZXNzQ2hlY2tvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZXhwcmVzcy1jaGVja291dC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZmlyc3RTdGVwJDogT2JzZXJ2YWJsZTxVcmxUcmVlPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdDb25maWdTZXJ2aWNlOiBSb3V0aW5nQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRDb25maWdTZXJ2aWNlOiBDaGVja291dENvbmZpZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGV4cHJlc3NDaGVja291dFNlcnZpY2U6IEV4cHJlc3NDaGVja291dFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0U3RlcFNlcnZpY2U6IENoZWNrb3V0U3RlcFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5maXJzdFN0ZXAkID0gb2YoXG4gICAgICB0aGlzLnJvdXRlci5wYXJzZVVybChcbiAgICAgICAgdGhpcy5yb3V0aW5nQ29uZmlnU2VydmljZS5nZXRSb3V0ZUNvbmZpZyhcbiAgICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2UuZ2V0Rmlyc3RDaGVja291dFN0ZXBSb3V0ZSgpXG4gICAgICAgICk/LnBhdGhzPy5bMF0gYXMgc3RyaW5nXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICBjb25zdCBleHByZXNzQ2hlY2tvdXQkID0gdGhpcy5leHByZXNzQ2hlY2tvdXRTZXJ2aWNlXG4gICAgICAudHJ5U2V0RGVmYXVsdENoZWNrb3V0RGV0YWlscygpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChleHByZXNzQ2hlY2tvdXRQb3NzaWJsZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJldmlld09yZGVyUm91dGUgPVxuICAgICAgICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmdldENoZWNrb3V0U3RlcFJvdXRlKFxuICAgICAgICAgICAgICBDaGVja291dFN0ZXBUeXBlLlJFVklFV19PUkRFUlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gZXhwcmVzc0NoZWNrb3V0UG9zc2libGUgJiYgcmV2aWV3T3JkZXJSb3V0ZVxuICAgICAgICAgICAgPyBvZihcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5wYXJzZVVybChcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGluZ0NvbmZpZ1NlcnZpY2UuZ2V0Um91dGVDb25maWcocmV2aWV3T3JkZXJSb3V0ZSlcbiAgICAgICAgICAgICAgICAgICAgPy5wYXRocz8uWzBdIGFzIHN0cmluZ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB0aGlzLmZpcnN0U3RlcCQ7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydEZhY2FkZVxuICAgICAgLmlzR3Vlc3RDYXJ0KClcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGlzR3Vlc3RDYXJ0KSA9PlxuICAgICAgICAgIHRoaXMuY2hlY2tvdXRDb25maWdTZXJ2aWNlLmlzRXhwcmVzc0NoZWNrb3V0KCkgJiYgIWlzR3Vlc3RDYXJ0XG4gICAgICAgICAgICA/IGV4cHJlc3NDaGVja291dCRcbiAgICAgICAgICAgIDogdGhpcy5maXJzdFN0ZXAkXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==