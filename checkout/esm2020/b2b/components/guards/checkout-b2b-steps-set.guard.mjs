/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { CheckoutStepsSetGuard, } from '@spartacus/checkout/base/components';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/checkout/base/components";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/checkout/base/root";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/checkout/b2b/root";
export class CheckoutB2BStepsSetGuard extends CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, checkoutPaymentTypeFacade, checkoutCostCenterFacade) {
        super(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router);
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return combineLatest([
            this.checkoutStepService.steps$,
            this.checkoutPaymentTypeFacade.isAccountPayment(),
        ]).pipe(tap(([, isAccount]) => {
            this.checkoutStepService.disableEnableStep("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, isAccount);
        }), take(1), switchMap(([steps, isAccount]) => {
            currentIndex = steps.findIndex((step) => {
                const stepRouteUrl = `/${this.routingConfigService.getRouteConfig(step.routeName)?.paths?.[0]}`;
                return stepRouteUrl === currentRouteUrl;
            });
            // get current step
            let currentStep;
            if (currentIndex >= 0) {
                currentStep = steps[currentIndex];
            }
            if (Boolean(currentStep)) {
                return this.isB2BStepSet(steps[currentIndex - 1], isAccount);
            }
            else {
                if (isDevMode()) {
                    console.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isB2BStepSet(step, isAccountPayment) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "paymentType" /* CheckoutStepType.PAYMENT_TYPE */: {
                    return this.isPaymentTypeSet(step);
                }
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddressAndCostCenterSet(step, isAccountPayment);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isPaymentTypeSet(step) {
        return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentType) => {
            if (paymentType) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryAddressAndCostCenterSet(step, isAccountPayment) {
        return combineLatest([
            this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data)),
            this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data)),
        ]).pipe(map(([deliveryAddress, costCenter]) => {
            if (isAccountPayment) {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    !!costCenter) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
            else {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    costCenter === undefined) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
        }));
    }
}
CheckoutB2BStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BStepsSetGuard, deps: [{ token: i1.CheckoutStepService }, { token: i2.RoutingConfigService }, { token: i3.CheckoutDeliveryAddressFacade }, { token: i3.CheckoutPaymentFacade }, { token: i3.CheckoutDeliveryModesFacade }, { token: i4.Router }, { token: i5.CheckoutPaymentTypeFacade }, { token: i5.CheckoutCostCenterFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutB2BStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutStepService }, { type: i2.RoutingConfigService }, { type: i3.CheckoutDeliveryAddressFacade }, { type: i3.CheckoutPaymentFacade }, { type: i3.CheckoutDeliveryModesFacade }, { type: i4.Router }, { type: i5.CheckoutPaymentTypeFacade }, { type: i5.CheckoutCostCenterFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLXN0ZXBzLXNldC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29tcG9uZW50cy9ndWFyZHMvY2hlY2tvdXQtYjJiLXN0ZXBzLXNldC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFXdEQsT0FBTyxFQUVMLHFCQUFxQixHQUN0QixNQUFNLHFDQUFxQyxDQUFDO0FBUzdDLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFLbkUsTUFBTSxPQUFPLHdCQUNYLFNBQVEscUJBQXFCO0lBRzdCLFlBQ1ksbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyw2QkFBNEQsRUFDNUQscUJBQTRDLEVBQzVDLDJCQUF3RCxFQUN4RCxNQUFjLEVBQ2QseUJBQW9ELEVBQ3BELHdCQUFrRDtRQUU1RCxLQUFLLENBQ0gsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQiw2QkFBNkIsRUFDN0IscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUMzQixNQUFNLENBQ1AsQ0FBQztRQWhCUSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUErQjtRQUM1RCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FB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QUNuQyxDQUFDLENBQUMsVUFBVSxFQUNaO29CQUNBLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFDRSxlQUFlO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTTtvQkFDbkMsVUFBVSxLQUFLLFNBQVMsRUFDeEI7b0JBQ0EsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOztxSEFsSlUsd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICBDYW5BY3RpdmF0ZSxcbiAgUm91dGVyLFxuICBVcmxUcmVlLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRUeXBlRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2IyYi9yb290JztcbmltcG9ydCB7XG4gIENoZWNrb3V0U3RlcFNlcnZpY2UsXG4gIENoZWNrb3V0U3RlcHNTZXRHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUsXG4gIENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgQ2hlY2tvdXRQYXltZW50RmFjYWRlLFxuICBDaGVja291dFN0ZXAsXG4gIENoZWNrb3V0U3RlcFR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7IFJvdXRpbmdDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dEIyQlN0ZXBzU2V0R3VhcmRcbiAgZXh0ZW5kcyBDaGVja291dFN0ZXBzU2V0R3VhcmRcbiAgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZVxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRTdGVwU2VydmljZTogQ2hlY2tvdXRTdGVwU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ0NvbmZpZ1NlcnZpY2U6IFJvdXRpbmdDb25maWdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZTogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UGF5bWVudEZhY2FkZTogQ2hlY2tvdXRQYXltZW50RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGU6IENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGU6IENoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0Q29zdENlbnRlckZhY2FkZTogQ2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgY2hlY2tvdXRTdGVwU2VydmljZSxcbiAgICAgIHJvdXRpbmdDb25maWdTZXJ2aWNlLFxuICAgICAgY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUsXG4gICAgICBjaGVja291dFBheW1lbnRGYWNhZGUsXG4gICAgICBjaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gICAgICByb3V0ZXJcbiAgICApO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IC0xO1xuICAgIGNvbnN0IGN1cnJlbnRSb3V0ZVVybCA9ICcvJyArIHJvdXRlLnVybC5qb2luKCcvJyk7XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIHRoZSBwcmV2aW91cyBzdGVwIGlzIHNldFxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5zdGVwcyQsXG4gICAgICB0aGlzLmNoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUuaXNBY2NvdW50UGF5bWVudCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YXAoKFssIGlzQWNjb3VudF0pID0+IHtcbiAgICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmRpc2FibGVFbmFibGVTdGVwKFxuICAgICAgICAgIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9ERVRBSUxTLFxuICAgICAgICAgIGlzQWNjb3VudFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKChbc3RlcHMsIGlzQWNjb3VudF0pID0+IHtcbiAgICAgICAgY3VycmVudEluZGV4ID0gc3RlcHMuZmluZEluZGV4KChzdGVwKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RlcFJvdXRlVXJsID0gYC8ke1xuICAgICAgICAgICAgdGhpcy5yb3V0aW5nQ29uZmlnU2VydmljZS5nZXRSb3V0ZUNvbmZpZyhzdGVwLnJvdXRlTmFtZSk/LnBhdGhzPy5bMF1cbiAgICAgICAgICB9YDtcbiAgICAgICAgICByZXR1cm4gc3RlcFJvdXRlVXJsID09PSBjdXJyZW50Um91dGVVcmw7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBnZXQgY3VycmVudCBzdGVwXG4gICAgICAgIGxldCBjdXJyZW50U3RlcDtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgY3VycmVudFN0ZXAgPSBzdGVwc1tjdXJyZW50SW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChCb29sZWFuKGN1cnJlbnRTdGVwKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzQjJCU3RlcFNldChzdGVwc1tjdXJyZW50SW5kZXggLSAxXSwgaXNBY2NvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYE1pc3Npbmcgc3RlcCB3aXRoIHJvdXRlICcke2N1cnJlbnRSb3V0ZVVybH0nIGluIGNoZWNrb3V0IGNvbmZpZ3VyYXRpb24gb3IgdGhpcyBzdGVwIGlzIGRpc2FibGVkLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFVybCgnY2hlY2tvdXQnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0IyQlN0ZXBTZXQoXG4gICAgc3RlcDogQ2hlY2tvdXRTdGVwLFxuICAgIGlzQWNjb3VudFBheW1lbnQ6IGJvb2xlYW5cbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIGlmIChzdGVwICYmICFzdGVwLmRpc2FibGVkKSB7XG4gICAgICBzd2l0Y2ggKHN0ZXAudHlwZVswXSkge1xuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9UWVBFOiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXltZW50VHlwZVNldChzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfQUREUkVTUzoge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlBZGRyZXNzQW5kQ29zdENlbnRlclNldChzdGVwLCBpc0FjY291bnRQYXltZW50KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfTU9ERToge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlNb2RlU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFM6IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc1BheW1lbnREZXRhaWxzU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5SRVZJRVdfT1JERVI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2YodHJ1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNQYXltZW50VHlwZVNldChcbiAgICBzdGVwOiBDaGVja291dFN0ZXBcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUuZ2V0U2VsZWN0ZWRQYXltZW50VHlwZVN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEpLFxuICAgICAgbWFwKChwYXltZW50VHlwZSkgPT4ge1xuICAgICAgICBpZiAocGF5bWVudFR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEZWxpdmVyeUFkZHJlc3NBbmRDb3N0Q2VudGVyU2V0KFxuICAgIHN0ZXA6IENoZWNrb3V0U3RlcCxcbiAgICBpc0FjY291bnRQYXltZW50OiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLmdldERlbGl2ZXJ5QWRkcmVzc1N0YXRlKCkucGlwZShcbiAgICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKVxuICAgICAgKSxcbiAgICAgIHRoaXMuY2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLmdldENvc3RDZW50ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSlcbiAgICAgICksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2RlbGl2ZXJ5QWRkcmVzcywgY29zdENlbnRlcl0pID0+IHtcbiAgICAgICAgaWYgKGlzQWNjb3VudFBheW1lbnQpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkZWxpdmVyeUFkZHJlc3MgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoICYmXG4gICAgICAgICAgICAhIWNvc3RDZW50ZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkZWxpdmVyeUFkZHJlc3MgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoICYmXG4gICAgICAgICAgICBjb3N0Q2VudGVyID09PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=