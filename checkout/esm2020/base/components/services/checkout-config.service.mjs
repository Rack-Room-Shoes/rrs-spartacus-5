/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DeliveryModePreferences, } from '@spartacus/checkout/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/checkout/base/root";
export class CheckoutConfigService {
    constructor(checkoutConfig) {
        this.checkoutConfig = checkoutConfig;
        this.express = this.checkoutConfig.checkout?.express ?? false;
        this.guest = this.checkoutConfig.checkout?.guest ?? false;
        this.defaultDeliveryMode = this.checkoutConfig.checkout?.defaultDeliveryMode || [];
    }
    compareDeliveryCost(deliveryMode1, deliveryMode2) {
        if (deliveryMode1.deliveryCost?.value &&
            deliveryMode2.deliveryCost?.value) {
            if (deliveryMode1.deliveryCost.value > deliveryMode2.deliveryCost.value) {
                return 1;
            }
            else if (deliveryMode1.deliveryCost.value < deliveryMode2.deliveryCost.value) {
                return -1;
            }
        }
        return 0;
    }
    findMatchingDeliveryMode(deliveryModes, index = 0) {
        switch (this.defaultDeliveryMode[index]) {
            case DeliveryModePreferences.FREE:
                if (deliveryModes[0].deliveryCost?.value === 0) {
                    return deliveryModes[0].code;
                }
                break;
            case DeliveryModePreferences.LEAST_EXPENSIVE:
                const leastExpensiveFound = deliveryModes.find((deliveryMode) => deliveryMode.deliveryCost?.value !== 0);
                if (leastExpensiveFound) {
                    return leastExpensiveFound.code;
                }
                break;
            case DeliveryModePreferences.MOST_EXPENSIVE:
                return deliveryModes[deliveryModes.length - 1].code;
            default:
                const codeFound = deliveryModes.find((deliveryMode) => deliveryMode.code === this.defaultDeliveryMode[index]);
                if (codeFound) {
                    return codeFound.code;
                }
        }
        const lastMode = this.defaultDeliveryMode.length - 1 <= index;
        return lastMode
            ? deliveryModes[0].code
            : this.findMatchingDeliveryMode(deliveryModes, index + 1);
    }
    getPreferredDeliveryMode(deliveryModes) {
        deliveryModes.sort(this.compareDeliveryCost);
        return this.findMatchingDeliveryMode(deliveryModes);
    }
    isExpressCheckout() {
        return this.express;
    }
    isGuestCheckout() {
        return this.guest;
    }
}
CheckoutConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutConfigService, deps: [{ token: i1.CheckoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL3NlcnZpY2VzL2NoZWNrb3V0LWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCx1QkFBdUIsR0FDeEIsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBS3ZDLE1BQU0sT0FBTyxxQkFBcUI7SUFNaEMsWUFBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTDFDLFlBQU8sR0FBWSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDO1FBQ2xFLFVBQUssR0FBWSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDO1FBQzlELHdCQUFtQixHQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsSUFBSSxFQUFFLENBQUM7SUFFTCxDQUFDO0lBRTVDLG1CQUFtQixDQUMzQixhQUEyQixFQUMzQixhQUEyQjtRQUUzQixJQUNFLGFBQWEsQ0FBQyxZQUFZLEVBQUUsS0FBSztZQUNqQyxhQUFhLENBQUMsWUFBWSxFQUFFLEtBQUssRUFDakM7WUFDQSxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO2dCQUN2RSxPQUFPLENBQUMsQ0FBQzthQUNWO2lCQUFNLElBQ0wsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQ25FO2dCQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDWDtTQUNGO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRVMsd0JBQXdCLENBQ2hDLGFBQTZCLEVBQzdCLEtBQUssR0FBRyxDQUFDO1FBRVQsUUFBUSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkMsS0FBSyx1QkFBdUIsQ0FBQyxJQUFJO2dCQUMvQixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUM5QjtnQkFDRCxNQUFNO1lBQ1IsS0FBSyx1QkFBdUIsQ0FBQyxlQUFlO2dCQUMxQyxNQUFNLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQzVDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssS0FBSyxDQUFDLENBQ3pELENBQUM7Z0JBQ0YsSUFBSSxtQkFBbUIsRUFBRTtvQkFDdkIsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7aUJBQ2pDO2dCQUNELE1BQU07WUFDUixLQUFLLHVCQUF1QixDQUFDLGNBQWM7Z0JBQ3pDLE9BQU8sYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3REO2dCQUNFLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQ2xDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDZixZQUFZLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FDeEQsQ0FBQztnQkFDRixJQUFJLFNBQVMsRUFBRTtvQkFDYixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBQ3ZCO1NBQ0o7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDOUQsT0FBTyxRQUFRO1lBQ2IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsd0JBQXdCLENBQUMsYUFBNkI7UUFDcEQsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7O2tIQXpFVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWxpdmVyeU1vZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENoZWNrb3V0Q29uZmlnLFxuICBEZWxpdmVyeU1vZGVQcmVmZXJlbmNlcyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRDb25maWdTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBleHByZXNzOiBib29sZWFuID0gdGhpcy5jaGVja291dENvbmZpZy5jaGVja291dD8uZXhwcmVzcyA/PyBmYWxzZTtcbiAgcHJpdmF0ZSBndWVzdDogYm9vbGVhbiA9IHRoaXMuY2hlY2tvdXRDb25maWcuY2hlY2tvdXQ/Lmd1ZXN0ID8/IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHREZWxpdmVyeU1vZGU6IEFycmF5PERlbGl2ZXJ5TW9kZVByZWZlcmVuY2VzIHwgc3RyaW5nPiA9XG4gICAgdGhpcy5jaGVja291dENvbmZpZy5jaGVja291dD8uZGVmYXVsdERlbGl2ZXJ5TW9kZSB8fCBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoZWNrb3V0Q29uZmlnOiBDaGVja291dENvbmZpZykge31cblxuICBwcm90ZWN0ZWQgY29tcGFyZURlbGl2ZXJ5Q29zdChcbiAgICBkZWxpdmVyeU1vZGUxOiBEZWxpdmVyeU1vZGUsXG4gICAgZGVsaXZlcnlNb2RlMjogRGVsaXZlcnlNb2RlXG4gICk6IG51bWJlciB7XG4gICAgaWYgKFxuICAgICAgZGVsaXZlcnlNb2RlMS5kZWxpdmVyeUNvc3Q/LnZhbHVlICYmXG4gICAgICBkZWxpdmVyeU1vZGUyLmRlbGl2ZXJ5Q29zdD8udmFsdWVcbiAgICApIHtcbiAgICAgIGlmIChkZWxpdmVyeU1vZGUxLmRlbGl2ZXJ5Q29zdC52YWx1ZSA+IGRlbGl2ZXJ5TW9kZTIuZGVsaXZlcnlDb3N0LnZhbHVlKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZGVsaXZlcnlNb2RlMS5kZWxpdmVyeUNvc3QudmFsdWUgPCBkZWxpdmVyeU1vZGUyLmRlbGl2ZXJ5Q29zdC52YWx1ZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZmluZE1hdGNoaW5nRGVsaXZlcnlNb2RlKFxuICAgIGRlbGl2ZXJ5TW9kZXM6IERlbGl2ZXJ5TW9kZVtdLFxuICAgIGluZGV4ID0gMFxuICApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHN3aXRjaCAodGhpcy5kZWZhdWx0RGVsaXZlcnlNb2RlW2luZGV4XSkge1xuICAgICAgY2FzZSBEZWxpdmVyeU1vZGVQcmVmZXJlbmNlcy5GUkVFOlxuICAgICAgICBpZiAoZGVsaXZlcnlNb2Rlc1swXS5kZWxpdmVyeUNvc3Q/LnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGRlbGl2ZXJ5TW9kZXNbMF0uY29kZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMuTEVBU1RfRVhQRU5TSVZFOlxuICAgICAgICBjb25zdCBsZWFzdEV4cGVuc2l2ZUZvdW5kID0gZGVsaXZlcnlNb2Rlcy5maW5kKFxuICAgICAgICAgIChkZWxpdmVyeU1vZGUpID0+IGRlbGl2ZXJ5TW9kZS5kZWxpdmVyeUNvc3Q/LnZhbHVlICE9PSAwXG4gICAgICAgICk7XG4gICAgICAgIGlmIChsZWFzdEV4cGVuc2l2ZUZvdW5kKSB7XG4gICAgICAgICAgcmV0dXJuIGxlYXN0RXhwZW5zaXZlRm91bmQuY29kZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMuTU9TVF9FWFBFTlNJVkU6XG4gICAgICAgIHJldHVybiBkZWxpdmVyeU1vZGVzW2RlbGl2ZXJ5TW9kZXMubGVuZ3RoIC0gMV0uY29kZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IGNvZGVGb3VuZCA9IGRlbGl2ZXJ5TW9kZXMuZmluZChcbiAgICAgICAgICAoZGVsaXZlcnlNb2RlKSA9PlxuICAgICAgICAgICAgZGVsaXZlcnlNb2RlLmNvZGUgPT09IHRoaXMuZGVmYXVsdERlbGl2ZXJ5TW9kZVtpbmRleF1cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNvZGVGb3VuZCkge1xuICAgICAgICAgIHJldHVybiBjb2RlRm91bmQuY29kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsYXN0TW9kZSA9IHRoaXMuZGVmYXVsdERlbGl2ZXJ5TW9kZS5sZW5ndGggLSAxIDw9IGluZGV4O1xuICAgIHJldHVybiBsYXN0TW9kZVxuICAgICAgPyBkZWxpdmVyeU1vZGVzWzBdLmNvZGVcbiAgICAgIDogdGhpcy5maW5kTWF0Y2hpbmdEZWxpdmVyeU1vZGUoZGVsaXZlcnlNb2RlcywgaW5kZXggKyAxKTtcbiAgfVxuXG4gIGdldFByZWZlcnJlZERlbGl2ZXJ5TW9kZShkZWxpdmVyeU1vZGVzOiBEZWxpdmVyeU1vZGVbXSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgZGVsaXZlcnlNb2Rlcy5zb3J0KHRoaXMuY29tcGFyZURlbGl2ZXJ5Q29zdCk7XG4gICAgcmV0dXJuIHRoaXMuZmluZE1hdGNoaW5nRGVsaXZlcnlNb2RlKGRlbGl2ZXJ5TW9kZXMpO1xuICB9XG5cbiAgaXNFeHByZXNzQ2hlY2tvdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXhwcmVzcztcbiAgfVxuXG4gIGlzR3Vlc3RDaGVja291dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ndWVzdDtcbiAgfVxufVxuIl19