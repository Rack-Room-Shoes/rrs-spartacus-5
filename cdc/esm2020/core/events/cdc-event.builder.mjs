/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { CdcAuthActions } from '../auth/store/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CdcEventBuilder {
    constructor(stateEventService, eventService) {
        this.stateEventService = stateEventService;
        this.eventService = eventService;
        this.register();
    }
    /**
     * Registers CDC events
     */
    register() {
        this.registerLoadUserTokenFail();
    }
    /**
     * Register the load user token fail event.
     */
    registerLoadUserTokenFail() {
        this.stateEventService.register({
            action: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL,
            event: CdcLoadUserTokenFailEvent,
        });
    }
}
CdcEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventBuilder, deps: [{ token: i1.StateEventService }, { token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StateEventService }, { type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWV2ZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9jb3JlL2V2ZW50cy9jZGMtZXZlbnQuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUs3RCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUNZLGlCQUFvQyxFQUNwQyxZQUEwQjtRQUQxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRXBDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDTyxRQUFRO1FBQ2hCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNPLHlCQUF5QjtRQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQzlCLE1BQU0sRUFBRSxjQUFjLENBQUMsd0JBQXdCO1lBQy9DLEtBQUssRUFBRSx5QkFBeUI7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NEdBdkJVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGNMb2FkVXNlclRva2VuRmFpbEV2ZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UsIFN0YXRlRXZlbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENkY0F1dGhBY3Rpb25zIH0gZnJvbSAnLi4vYXV0aC9zdG9yZS9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENkY0V2ZW50QnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdGF0ZUV2ZW50U2VydmljZTogU3RhdGVFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgQ0RDIGV2ZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyKCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJMb2FkVXNlclRva2VuRmFpbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHRoZSBsb2FkIHVzZXIgdG9rZW4gZmFpbCBldmVudC5cbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlckxvYWRVc2VyVG9rZW5GYWlsKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDZGNBdXRoQWN0aW9ucy5MT0FEX0NEQ19VU0VSX1RPS0VOX0ZBSUwsXG4gICAgICBldmVudDogQ2RjTG9hZFVzZXJUb2tlbkZhaWxFdmVudCxcbiAgICB9KTtcbiAgfVxufVxuIl19