/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/profile-tag-lifecycle.service";
import * as i2 from "../services/profile-tag-push-events.service";
import * as i3 from "../services/profiletag-event.service";
export class TrackingService {
    constructor(profileTagLifecycleService, profileTagPushEventsService, profileTagEventTracker) {
        this.profileTagLifecycleService = profileTagLifecycleService;
        this.profileTagPushEventsService = profileTagPushEventsService;
        this.profileTagEventTracker = profileTagEventTracker;
    }
    static factory(trackingService) {
        const factoryFunction = () => {
            trackingService.trackEvents();
        };
        return factoryFunction;
    }
    trackEvents() {
        this.profileTagPushEventsService
            .getPushEvents()
            .pipe(withLatestFrom(this.profileTagLifecycleService.consentChanged().pipe(tap((event) => {
            // always notify of consent changes
            this.profileTagEventTracker.notifyProfileTagOfEventOccurence(event);
        }))), filter(([_event, consentChanged]) => consentChanged.data.granted), //don't notify other events until consent is granted
        tap(([event]) => {
            this.profileTagEventTracker.notifyProfileTagOfEventOccurence(event);
        }))
            .subscribe();
    }
}
TrackingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TrackingService, deps: [{ token: i1.ProfileTagLifecycleService }, { token: i2.ProfileTagPushEventsService }, { token: i3.ProfileTagEventService }], target: i0.ɵɵFactoryTarget.Injectable });
TrackingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TrackingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TrackingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProfileTagLifecycleService }, { type: i2.ProfileTagPushEventsService }, { type: i3.ProfileTagEventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2tpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9wcm9maWxldGFnL3RyYWNraW5nL3RyYWNraW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBUTdELE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQ1ksMEJBQXNELEVBQ3RELDJCQUF3RCxFQUMxRCxzQkFBOEM7UUFGNUMsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUN0RCxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBQzFELDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7SUFDckQsQ0FBQztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZ0M7UUFDN0MsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFO1lBQzNCLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFDRixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQywyQkFBMkI7YUFDN0IsYUFBYSxFQUFFO2FBQ2YsSUFBSSxDQUNILGNBQWMsQ0FDWixJQUFJLENBQUMsMEJBQTBCLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLG1DQUFtQztZQUNuQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0NBQWdDLENBQzFELEtBQUssQ0FDTixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FDRixFQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLG9EQUFvRDtRQUN2SCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDZCxJQUFJLENBQUMsc0JBQXNCLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs0R0FoQ1UsZUFBZTtnSEFBZixlQUFlLGNBRmQsTUFBTTsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgdGFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFByb2ZpbGVUYWdMaWZlY3ljbGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHJvZmlsZS10YWctbGlmZWN5Y2xlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZmlsZVRhZ1B1c2hFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHJvZmlsZS10YWctcHVzaC1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9maWxlVGFnRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHJvZmlsZXRhZy1ldmVudC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRyYWNraW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBwcm9maWxlVGFnTGlmZWN5Y2xlU2VydmljZTogUHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2ZpbGVUYWdQdXNoRXZlbnRzU2VydmljZTogUHJvZmlsZVRhZ1B1c2hFdmVudHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcHJvZmlsZVRhZ0V2ZW50VHJhY2tlcjogUHJvZmlsZVRhZ0V2ZW50U2VydmljZVxuICApIHt9XG4gIHN0YXRpYyBmYWN0b3J5KHRyYWNraW5nU2VydmljZTogVHJhY2tpbmdTZXJ2aWNlKTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgZmFjdG9yeUZ1bmN0aW9uID0gKCkgPT4ge1xuICAgICAgdHJhY2tpbmdTZXJ2aWNlLnRyYWNrRXZlbnRzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gZmFjdG9yeUZ1bmN0aW9uO1xuICB9XG4gIHRyYWNrRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMucHJvZmlsZVRhZ1B1c2hFdmVudHNTZXJ2aWNlXG4gICAgICAuZ2V0UHVzaEV2ZW50cygpXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20oXG4gICAgICAgICAgdGhpcy5wcm9maWxlVGFnTGlmZWN5Y2xlU2VydmljZS5jb25zZW50Q2hhbmdlZCgpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIC8vIGFsd2F5cyBub3RpZnkgb2YgY29uc2VudCBjaGFuZ2VzXG4gICAgICAgICAgICAgIHRoaXMucHJvZmlsZVRhZ0V2ZW50VHJhY2tlci5ub3RpZnlQcm9maWxlVGFnT2ZFdmVudE9jY3VyZW5jZShcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIGZpbHRlcigoW19ldmVudCwgY29uc2VudENoYW5nZWRdKSA9PiBjb25zZW50Q2hhbmdlZC5kYXRhLmdyYW50ZWQpLCAvL2Rvbid0IG5vdGlmeSBvdGhlciBldmVudHMgdW50aWwgY29uc2VudCBpcyBncmFudGVkXG4gICAgICAgIHRhcCgoW2V2ZW50XSkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvZmlsZVRhZ0V2ZW50VHJhY2tlci5ub3RpZnlQcm9maWxlVGFnT2ZFdmVudE9jY3VyZW5jZShldmVudCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==