/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutQueryReloadEvent, CheckoutQueryResetEvent, } from '@spartacus/checkout/base/root';
import { OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout/checkout.connector";
export class CheckoutQueryService {
    constructor(activeCartFacade, userIdService, queryService, checkoutConnector) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.checkoutConnector = checkoutConnector;
        this.checkoutQuery$ = this.queryService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutConnector.getCheckoutDetails(userId, cartId))), {
            reloadOn: this.getCheckoutQueryReloadEvents(),
            resetOn: this.getCheckoutQueryResetEvents(),
        });
    }
    /**
     * Returns the reload events for the checkout query.
     */
    getCheckoutQueryReloadEvents() {
        return [CheckoutQueryReloadEvent];
    }
    /**
     * Returns the reset events for the checkout query.
     */
    getCheckoutQueryResetEvents() {
        return [CheckoutQueryResetEvent];
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getCheckoutDetailsState() {
        return this.checkoutQuery$.getState();
    }
}
CheckoutQueryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutQueryService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i3.CheckoutConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutQueryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutQueryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutQueryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i3.CheckoutConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvcmUvZmFjYWRlL2NoZWNrb3V0LXF1ZXJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUVMLHdCQUF3QixFQUN4Qix1QkFBdUIsR0FFeEIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQ0wscUJBQXFCLEdBTXRCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFJdEQsTUFBTSxPQUFPLG9CQUFvQjtJQTRCL0IsWUFDWSxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsaUJBQW9DO1FBSHBDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQWxCdEMsbUJBQWMsR0FDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3RCLEdBQUcsRUFBRSxDQUNILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FDL0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUMxRCxDQUNGLEVBQ0g7WUFDRSxRQUFRLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixFQUFFO1lBQzdDLE9BQU8sRUFBRSxJQUFJLENBQUMsMkJBQTJCLEVBQUU7U0FDNUMsQ0FDRixDQUFDO0lBT0QsQ0FBQztJQWhDSjs7T0FFRztJQUNPLDRCQUE0QjtRQUNwQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7O09BRUc7SUFDTywyQkFBMkI7UUFDbkMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXVCRDs7T0FFRztJQUNPLHFCQUFxQjtRQUM3QixPQUFPLGFBQWEsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtTQUNwQyxDQUFDLENBQUMsSUFBSSxDQUNMLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUNFLENBQUMsTUFBTTtnQkFDUCxDQUFDLE1BQU07Z0JBQ1AsQ0FBQyxNQUFNLEtBQUsscUJBQXFCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDbEQ7Z0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHVCQUF1QjtRQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEMsQ0FBQzs7aUhBNURVLG9CQUFvQjtxSEFBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dFF1ZXJ5RmFjYWRlLFxuICBDaGVja291dFF1ZXJ5UmVsb2FkRXZlbnQsXG4gIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50LFxuICBDaGVja291dFN0YXRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFF1ZXJ5LFxuICBRdWVyeU5vdGlmaWVyLFxuICBRdWVyeVNlcnZpY2UsXG4gIFF1ZXJ5U3RhdGUsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoZWNrb3V0Q29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy9jaGVja291dC9jaGVja291dC5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRRdWVyeVNlcnZpY2UgaW1wbGVtZW50cyBDaGVja291dFF1ZXJ5RmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlbG9hZCBldmVudHMgZm9yIHRoZSBjaGVja291dCBxdWVyeS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGVja291dFF1ZXJ5UmVsb2FkRXZlbnRzKCk6IFF1ZXJ5Tm90aWZpZXJbXSB7XG4gICAgcmV0dXJuIFtDaGVja291dFF1ZXJ5UmVsb2FkRXZlbnRdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZXNldCBldmVudHMgZm9yIHRoZSBjaGVja291dCBxdWVyeS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGVja291dFF1ZXJ5UmVzZXRFdmVudHMoKTogUXVlcnlOb3RpZmllcltdIHtcbiAgICByZXR1cm4gW0NoZWNrb3V0UXVlcnlSZXNldEV2ZW50XTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjaGVja291dFF1ZXJ5JDogUXVlcnk8Q2hlY2tvdXRTdGF0ZSB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMucXVlcnlTZXJ2aWNlLmNyZWF0ZTxDaGVja291dFN0YXRlIHwgdW5kZWZpbmVkPihcbiAgICAgICgpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFt1c2VySWQsIGNhcnRJZF0pID0+XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0Q29ubmVjdG9yLmdldENoZWNrb3V0RGV0YWlscyh1c2VySWQsIGNhcnRJZClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHJlbG9hZE9uOiB0aGlzLmdldENoZWNrb3V0UXVlcnlSZWxvYWRFdmVudHMoKSxcbiAgICAgICAgcmVzZXRPbjogdGhpcy5nZXRDaGVja291dFF1ZXJ5UmVzZXRFdmVudHMoKSxcbiAgICAgIH1cbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRDb25uZWN0b3I6IENoZWNrb3V0Q29ubmVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIG5lY2Vzc2FyeSBjaGVja291dCBwcmVjb25kaXRpb25zLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNoZWNrb3V0UHJlY29uZGl0aW9ucygpOiBPYnNlcnZhYmxlPFtzdHJpbmcsIHN0cmluZ10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLnRha2VBY3RpdmVDYXJ0SWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5pc0d1ZXN0Q2FydCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKChbdXNlcklkLCBjYXJ0SWQsIGlzR3Vlc3RDYXJ0XSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXVzZXJJZCB8fFxuICAgICAgICAgICFjYXJ0SWQgfHxcbiAgICAgICAgICAodXNlcklkID09PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgJiYgIWlzR3Vlc3RDYXJ0KVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrb3V0IGNvbmRpdGlvbnMgbm90IG1ldCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdXNlcklkLCBjYXJ0SWRdO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0Q2hlY2tvdXREZXRhaWxzU3RhdGUoKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPENoZWNrb3V0U3RhdGUgfCB1bmRlZmluZWQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXRRdWVyeSQuZ2V0U3RhdGUoKTtcbiAgfVxufVxuIl19