/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/checkout-step.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/checkout/base/root";
import * as i4 from "@angular/router";
export class CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router) {
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return this.checkoutStepService.steps$.pipe(take(1), switchMap((steps) => {
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
                return this.isStepSet(steps[currentIndex - 1]);
            }
            else {
                if (isDevMode()) {
                    console.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isStepSet(step) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddress(step);
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
    isDeliveryAddress(step) {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data), map((deliveryAddress) => {
            if (deliveryAddress && Object.keys(deliveryAddress).length) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryModeSet(step) {
        return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((mode) => (mode ? true : this.getUrl(step.routeName))));
    }
    isPaymentDetailsSet(step) {
        return this.checkoutPaymentFacade.getPaymentDetailsState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentDetails) => paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.getUrl(step.routeName)));
    }
    getUrl(routeName) {
        return this.router.parseUrl(this.routingConfigService.getRouteConfig(routeName)?.paths?.[0]);
    }
}
CheckoutStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepsSetGuard, deps: [{ token: i1.CheckoutStepService }, { token: i2.RoutingConfigService }, { token: i3.CheckoutDeliveryAddressFacade }, { token: i3.CheckoutPaymentFacade }, { token: i3.CheckoutDeliveryModesFacade }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutStepService }, { type: i2.RoutingConfigService }, { type: i3.CheckoutDeliveryAddressFacade }, { type: i3.CheckoutPaymentFacade }, { type: i3.CheckoutDeliveryModesFacade }, { type: i4.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc3RlcHMtc2V0Lmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cy9ndWFyZHMvY2hlY2tvdXQtc3RlcHMtc2V0Lmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWV0RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBTTlELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDWSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLDZCQUE0RCxFQUM1RCxxQkFBNEMsRUFDNUMsMkJBQXdELEVBQ3hELE1BQWM7UUFMZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUErQjtRQUM1RCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUN2QixDQUFDO0lBRUosV0FBVyxDQUFDLEtBQTZCO1FBQ3ZDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sZUFBZSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsRCx5Q0FBeUM7UUFDekMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQ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QUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQzNELENBQUM7SUFDSixDQUFDO0lBRVMsbUJBQW1CLENBQzNCLElBQWtCO1FBRWxCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxDQUM3RCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNqQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDMUIsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FDckIsY0FBYyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQ2hDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFUyxNQUFNLENBQUMsU0FBaUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDekIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQVcsQ0FDMUUsQ0FBQztJQUNKLENBQUM7O2tIQTNHVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZXIsXG4gIFVybFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gIENoZWNrb3V0U3RlcCxcbiAgQ2hlY2tvdXRTdGVwVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dFN0ZXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2hlY2tvdXQtc3RlcC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0U3RlcHNTZXRHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0U3RlcFNlcnZpY2U6IENoZWNrb3V0U3RlcFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdDb25maWdTZXJ2aWNlOiBSb3V0aW5nQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGU6IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjaGVja291dFBheW1lbnRGYWNhZGU6IENoZWNrb3V0UGF5bWVudEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gLTE7XG4gICAgY29uc3QgY3VycmVudFJvdXRlVXJsID0gJy8nICsgcm91dGUudXJsLmpvaW4oJy8nKTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIHByZXZpb3VzIHN0ZXAgaXMgc2V0XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5zdGVwcyQucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKHN0ZXBzKSA9PiB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9IHN0ZXBzLmZpbmRJbmRleCgoc3RlcCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0ZXBSb3V0ZVVybCA9IGAvJHtcbiAgICAgICAgICAgIHRoaXMucm91dGluZ0NvbmZpZ1NlcnZpY2UuZ2V0Um91dGVDb25maWcoc3RlcC5yb3V0ZU5hbWUpPy5wYXRocz8uWzBdXG4gICAgICAgICAgfWA7XG4gICAgICAgICAgcmV0dXJuIHN0ZXBSb3V0ZVVybCA9PT0gY3VycmVudFJvdXRlVXJsO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZ2V0IGN1cnJlbnQgc3RlcFxuICAgICAgICBsZXQgY3VycmVudFN0ZXA7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPj0gMCkge1xuICAgICAgICAgIGN1cnJlbnRTdGVwID0gc3RlcHNbY3VycmVudEluZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQm9vbGVhbihjdXJyZW50U3RlcCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc1N0ZXBTZXQoc3RlcHNbY3VycmVudEluZGV4IC0gMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgTWlzc2luZyBzdGVwIHdpdGggcm91dGUgJyR7Y3VycmVudFJvdXRlVXJsfScgaW4gY2hlY2tvdXQgY29uZmlndXJhdGlvbiBvciB0aGlzIHN0ZXAgaXMgZGlzYWJsZWQuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0VXJsKCdjaGVja291dCcpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzU3RlcFNldChzdGVwOiBDaGVja291dFN0ZXApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgaWYgKHN0ZXAgJiYgIXN0ZXAuZGlzYWJsZWQpIHtcbiAgICAgIHN3aXRjaCAoc3RlcC50eXBlWzBdKSB7XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9BRERSRVNTOiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWxpdmVyeUFkZHJlc3Moc3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGVja291dFN0ZXBUeXBlLkRFTElWRVJZX01PREU6IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlbGl2ZXJ5TW9kZVNldChzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9ERVRBSUxTOiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXltZW50RGV0YWlsc1NldChzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuUkVWSUVXX09SREVSOiB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9mKHRydWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRGVsaXZlcnlBZGRyZXNzKFxuICAgIHN0ZXA6IENoZWNrb3V0U3RlcFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUuZ2V0RGVsaXZlcnlBZGRyZXNzU3RhdGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSksXG4gICAgICBtYXAoKGRlbGl2ZXJ5QWRkcmVzcykgPT4ge1xuICAgICAgICBpZiAoZGVsaXZlcnlBZGRyZXNzICYmIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsKHN0ZXAucm91dGVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRGVsaXZlcnlNb2RlU2V0KFxuICAgIHN0ZXA6IENoZWNrb3V0U3RlcFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLmdldFNlbGVjdGVkRGVsaXZlcnlNb2RlU3RhdGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSksXG4gICAgICBtYXAoKG1vZGUpID0+IChtb2RlID8gdHJ1ZSA6IHRoaXMuZ2V0VXJsKHN0ZXAucm91dGVOYW1lKSkpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1BheW1lbnREZXRhaWxzU2V0KFxuICAgIHN0ZXA6IENoZWNrb3V0U3RlcFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXRQYXltZW50RmFjYWRlLmdldFBheW1lbnREZXRhaWxzU3RhdGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSksXG4gICAgICBtYXAoKHBheW1lbnREZXRhaWxzKSA9PlxuICAgICAgICBwYXltZW50RGV0YWlscyAmJiBPYmplY3Qua2V5cyhwYXltZW50RGV0YWlscykubGVuZ3RoICE9PSAwXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiB0aGlzLmdldFVybChzdGVwLnJvdXRlTmFtZSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFVybChyb3V0ZU5hbWU6IHN0cmluZyk6IFVybFRyZWUge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5wYXJzZVVybChcbiAgICAgIHRoaXMucm91dGluZ0NvbmZpZ1NlcnZpY2UuZ2V0Um91dGVDb25maWcocm91dGVOYW1lKT8ucGF0aHM/LlswXSBhcyBzdHJpbmdcbiAgICApO1xuICB9XG59XG4iXX0=