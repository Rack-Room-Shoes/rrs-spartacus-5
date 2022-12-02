/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpResponse, } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/personalization-config";
import * as i2 from "@spartacus/core";
export class OccPersonalizationTimeInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_TIME_KEY = 'personalization-time';
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    console.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.timestamp.toLowerCase();
                this.timestamp = this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_TIME_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.timestamp &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.timestamp,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                if (this.requestHeader &&
                    event.headers.keys().includes(this.requestHeader)) {
                    const receivedTimestamp = event.headers.get(this.requestHeader);
                    if (this.timestamp !== receivedTimestamp) {
                        this.timestamp = receivedTimestamp;
                        if (this.timestamp) {
                            this.winRef.localStorage?.setItem(this.PERSONALIZATION_TIME_KEY, this.timestamp);
                        }
                    }
                }
            }
        }));
    }
}
OccPersonalizationTimeInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccPersonalizationTimeInterceptor, deps: [{ token: i1.PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationTimeInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccPersonalizationTimeInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccPersonalizationTimeInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcnNvbmFsaXphdGlvbi10aW1lLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3BlcnNvbmFsaXphdGlvbi9yb290L2h0dHAtaW50ZXJjZXB0b3JzL29jYy1wZXJzb25hbGl6YXRpb24tdGltZS5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUtMLFlBQVksR0FDYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlyQyxNQUFNLE9BQU8saUNBQWlDO0lBTTVDLFlBQ1UsTUFBNkIsRUFDN0IsWUFBaUMsRUFDakMsTUFBaUI7UUFGakIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFObkIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNMLDZCQUF3QixHQUFHLHNCQUFzQixDQUFDO1FBT25FLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTztnQkFDVixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztvQkFDbEUsS0FBSyxDQUFDO1lBRVIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsY0FBYyxJQUFJLFNBQVMsRUFBRSxFQUFFO29CQUMvRCxPQUFPLENBQUMsSUFBSSxDQUNWLDBEQUEwRCxDQUMzRCxDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxhQUFhO29CQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUM5QixDQUFDO2FBQ0g7aUJBQU0sSUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQ2hFO2dCQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNwRTtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUNFLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxTQUFTO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNwRDtZQUNBLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QixVQUFVLEVBQUU7b0JBQ1YsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQ3JDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTtnQkFDakMsSUFDRSxJQUFJLENBQUMsYUFBYTtvQkFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUNqRDtvQkFDQSxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLGlCQUFpQixFQUFFO3dCQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO3dCQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FDL0IsSUFBSSxDQUFDLHdCQUF3QixFQUM3QixJQUFJLENBQUMsU0FBUyxDQUNmLENBQUM7eUJBQ0g7cUJBQ0Y7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzs4SEE1RVUsaUNBQWlDO2tJQUFqQyxpQ0FBaUMsY0FEcEIsTUFBTTsyRkFDbkIsaUNBQWlDO2tCQUQ3QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBSZXNwb25zZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPY2NFbmRwb2ludHNTZXJ2aWNlLCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGVyc29uYWxpemF0aW9uQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3BlcnNvbmFsaXphdGlvbi1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY1BlcnNvbmFsaXphdGlvblRpbWVJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIHByaXZhdGUgdGltZXN0YW1wPzogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSByZXF1ZXN0SGVhZGVyPzogc3RyaW5nO1xuICBwcml2YXRlIGVuYWJsZWQgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFBFUlNPTkFMSVpBVElPTl9USU1FX0tFWSA9ICdwZXJzb25hbGl6YXRpb24tdGltZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IFBlcnNvbmFsaXphdGlvbkNvbmZpZyxcbiAgICBwcml2YXRlIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcml2YXRlIHdpblJlZjogV2luZG93UmVmXG4gICkge1xuICAgIGlmICh0aGlzLndpblJlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgdGhpcy5lbmFibGVkID1cbiAgICAgICAgKHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZSAmJiB0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/LmVuYWJsZWQpIHx8XG4gICAgICAgIGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcucGVyc29uYWxpemF0aW9uPy5odHRwSGVhZGVyTmFtZSAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBUaGVyZSBpcyBubyBodHRwSGVhZGVyTmFtZSBjb25maWd1cmVkIGluIFBlcnNvbmFsaXphdGlvbmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlciA9XG4gICAgICAgICAgdGhpcy5jb25maWcucGVyc29uYWxpemF0aW9uPy5odHRwSGVhZGVyTmFtZT8udGltZXN0YW1wLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5nZXRJdGVtKFxuICAgICAgICAgIHRoaXMuUEVSU09OQUxJWkFUSU9OX1RJTUVfS0VZXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0odGhpcy5QRVJTT05BTElaQVRJT05fVElNRV9LRVkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5QRVJTT05BTElaQVRJT05fVElNRV9LRVkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMucmVxdWVzdEhlYWRlciAmJlxuICAgICAgdGhpcy50aW1lc3RhbXAgJiZcbiAgICAgIHJlcXVlc3QudXJsLmluY2x1ZGVzKHRoaXMub2NjRW5kcG9pbnRzLmdldEJhc2VVcmwoKSlcbiAgICApIHtcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgIFt0aGlzLnJlcXVlc3RIZWFkZXJdOiB0aGlzLnRpbWVzdGFtcCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgdGFwKChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXIgJiZcbiAgICAgICAgICAgIGV2ZW50LmhlYWRlcnMua2V5cygpLmluY2x1ZGVzKHRoaXMucmVxdWVzdEhlYWRlcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY2VpdmVkVGltZXN0YW1wID0gZXZlbnQuaGVhZGVycy5nZXQodGhpcy5yZXF1ZXN0SGVhZGVyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVzdGFtcCAhPT0gcmVjZWl2ZWRUaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgdGhpcy50aW1lc3RhbXAgPSByZWNlaXZlZFRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5zZXRJdGVtKFxuICAgICAgICAgICAgICAgICAgdGhpcy5QRVJTT05BTElaQVRJT05fVElNRV9LRVksXG4gICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzdGFtcFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19