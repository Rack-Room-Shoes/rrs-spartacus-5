import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/profiletag-event.service";
import * as i2 from "@spartacus/core";
export class ConsentReferenceInterceptor {
    constructor(profileTagEventTracker, occEndpoints) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.occEndpoints = occEndpoints;
    }
    intercept(request, next) {
        if (!this.profileTagEventTracker.latestConsentReference ||
            !this.isOccUrl(request.url)) {
            return next.handle(request);
        }
        const cdsHeaders = request.headers.set('X-Consent-Reference', this.profileTagEventTracker.latestConsentReference);
        const cdsRequest = request.clone({ headers: cdsHeaders });
        return next.handle(cdsRequest);
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
}
ConsentReferenceInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentReferenceInterceptor, deps: [{ token: i1.ProfileTagEventService }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConsentReferenceInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentReferenceInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentReferenceInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ProfileTagEventService }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2VudC1yZWZlcmVuY2UtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvcHJvZmlsZXRhZy9odHRwLWludGVyY2VwdG9ycy9jb25zZW50LXJlZmVyZW5jZS1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTTNDLE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsWUFDVSxzQkFBOEMsRUFDOUMsWUFBaUM7UUFEakMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7SUFDeEMsQ0FBQztJQUNKLFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUNFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQjtZQUNuRCxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUMzQjtZQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtRQUNELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNwQyxxQkFBcUIsRUFDckIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQixDQUNuRCxDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQVc7UUFDMUIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDOzt3SEF6QlUsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FEZCxNQUFNOzJGQUNuQiwyQkFBMkI7a0JBRHZDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQcm9maWxlVGFnRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHJvZmlsZXRhZy1ldmVudC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25zZW50UmVmZXJlbmNlSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHByb2ZpbGVUYWdFdmVudFRyYWNrZXI6IFByb2ZpbGVUYWdFdmVudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2VcbiAgKSB7fVxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMucHJvZmlsZVRhZ0V2ZW50VHJhY2tlci5sYXRlc3RDb25zZW50UmVmZXJlbmNlIHx8XG4gICAgICAhdGhpcy5pc09jY1VybChyZXF1ZXN0LnVybClcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG4gICAgY29uc3QgY2RzSGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycy5zZXQoXG4gICAgICAnWC1Db25zZW50LVJlZmVyZW5jZScsXG4gICAgICB0aGlzLnByb2ZpbGVUYWdFdmVudFRyYWNrZXIubGF0ZXN0Q29uc2VudFJlZmVyZW5jZVxuICAgICk7XG4gICAgY29uc3QgY2RzUmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoeyBoZWFkZXJzOiBjZHNIZWFkZXJzIH0pO1xuICAgIHJldHVybiBuZXh0LmhhbmRsZShjZHNSZXF1ZXN0KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNPY2NVcmwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdXJsLmluY2x1ZGVzKHRoaXMub2NjRW5kcG9pbnRzLmdldEJhc2VVcmwoKSk7XG4gIH1cbn1cbiJdfQ==