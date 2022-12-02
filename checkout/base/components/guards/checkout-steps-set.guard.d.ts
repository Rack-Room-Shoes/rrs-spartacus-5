import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade, CheckoutPaymentFacade, CheckoutStep } from '@spartacus/checkout/base/root';
import { RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutStepsSetGuard implements CanActivate {
    protected checkoutStepService: CheckoutStepService;
    protected routingConfigService: RoutingConfigService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected checkoutPaymentFacade: CheckoutPaymentFacade;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    protected router: Router;
    constructor(checkoutStepService: CheckoutStepService, routingConfigService: RoutingConfigService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, checkoutPaymentFacade: CheckoutPaymentFacade, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, router: Router);
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree>;
    protected isStepSet(step: CheckoutStep): Observable<boolean | UrlTree>;
    protected isDeliveryAddress(step: CheckoutStep): Observable<boolean | UrlTree>;
    protected isDeliveryModeSet(step: CheckoutStep): Observable<boolean | UrlTree>;
    protected isPaymentDetailsSet(step: CheckoutStep): Observable<boolean | UrlTree>;
    protected getUrl(routeName: string): UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutStepsSetGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutStepsSetGuard>;
}
