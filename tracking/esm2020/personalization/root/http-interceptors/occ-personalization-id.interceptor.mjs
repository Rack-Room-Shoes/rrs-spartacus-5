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
export class OccPersonalizationIdInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_ID_KEY = 'personalization-id';
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    console.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.id.toLowerCase();
                this.personalizationId = this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_ID_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.personalizationId &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.personalizationId,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                if (this.requestHeader &&
                    event.headers.keys().includes(this.requestHeader)) {
                    const receivedId = event.headers.get(this.requestHeader);
                    if (this.personalizationId !== receivedId) {
                        this.personalizationId = receivedId;
                        if (this.personalizationId) {
                            this.winRef.localStorage?.setItem(this.PERSONALIZATION_ID_KEY, this.personalizationId);
                        }
                    }
                }
            }
        }));
    }
}
OccPersonalizationIdInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccPersonalizationIdInterceptor, deps: [{ token: i1.PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationIdInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccPersonalizationIdInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccPersonalizationIdInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcnNvbmFsaXphdGlvbi1pZC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vcm9vdC9odHRwLWludGVyY2VwdG9ycy9vY2MtcGVyc29uYWxpemF0aW9uLWlkLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBS0wsWUFBWSxHQUNiLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXJDLE1BQU0sT0FBTywrQkFBK0I7SUFNMUMsWUFDVSxNQUE2QixFQUM3QixZQUFpQyxFQUNqQyxNQUFpQjtRQUZqQixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQU5uQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ0wsMkJBQXNCLEdBQUcsb0JBQW9CLENBQUM7UUFPL0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPO2dCQUNWLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO29CQUNsRSxLQUFLLENBQUM7WUFFUixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQ1YsMERBQTBELENBQzNELENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxDQUFDLGFBQWE7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQ3hELElBQUksQ0FBQyxzQkFBc0IsQ0FDNUIsQ0FBQzthQUNIO2lCQUFNLElBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUM5RDtnQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDbEU7U0FDRjtJQUNILENBQUM7SUFFRCxTQUFTLENBQ1AsT0FBeUIsRUFDekIsSUFBaUI7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFDRSxJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsaUJBQWlCO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDcEQ7WUFDQSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsVUFBVSxFQUFFO29CQUNWLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7aUJBQzdDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQUksS0FBSyxZQUFZLFlBQVksRUFBRTtnQkFDakMsSUFDRSxJQUFJLENBQUMsYUFBYTtvQkFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUNqRDtvQkFDQSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3pELElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLFVBQVUsRUFBRTt3QkFDekMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQzt3QkFDcEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7NEJBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FDL0IsSUFBSSxDQUFDLHNCQUFzQixFQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQ3ZCLENBQUM7eUJBQ0g7cUJBQ0Y7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzs0SEE1RVUsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FEbEIsTUFBTTsyRkFDbkIsK0JBQStCO2tCQUQzQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBSZXNwb25zZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPY2NFbmRwb2ludHNTZXJ2aWNlLCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGVyc29uYWxpemF0aW9uQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3BlcnNvbmFsaXphdGlvbi1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY1BlcnNvbmFsaXphdGlvbklkSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIHBlcnNvbmFsaXphdGlvbklkPzogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSByZXF1ZXN0SGVhZGVyPzogc3RyaW5nO1xuICBwcml2YXRlIGVuYWJsZWQgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFBFUlNPTkFMSVpBVElPTl9JRF9LRVkgPSAncGVyc29uYWxpemF0aW9uLWlkJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogUGVyc29uYWxpemF0aW9uQ29uZmlnLFxuICAgIHByaXZhdGUgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7XG4gICAgaWYgKHRoaXMud2luUmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPVxuICAgICAgICAodGhpcy53aW5SZWYubG9jYWxTdG9yYWdlICYmIHRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uZW5hYmxlZCkgfHxcbiAgICAgICAgZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/Lmh0dHBIZWFkZXJOYW1lICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFRoZXJlIGlzIG5vIGh0dHBIZWFkZXJOYW1lIGNvbmZpZ3VyZWQgaW4gUGVyc29uYWxpemF0aW9uYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyID1cbiAgICAgICAgICB0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/Lmh0dHBIZWFkZXJOYW1lPy5pZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLnBlcnNvbmFsaXphdGlvbklkID0gdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5nZXRJdGVtKFxuICAgICAgICAgIHRoaXMuUEVSU09OQUxJWkFUSU9OX0lEX0tFWVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5nZXRJdGVtKHRoaXMuUEVSU09OQUxJWkFUSU9OX0lEX0tFWSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLlBFUlNPTkFMSVpBVElPTl9JRF9LRVkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMucmVxdWVzdEhlYWRlciAmJlxuICAgICAgdGhpcy5wZXJzb25hbGl6YXRpb25JZCAmJlxuICAgICAgcmVxdWVzdC51cmwuaW5jbHVkZXModGhpcy5vY2NFbmRwb2ludHMuZ2V0QmFzZVVybCgpKVxuICAgICkge1xuICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgICAgW3RoaXMucmVxdWVzdEhlYWRlcl06IHRoaXMucGVyc29uYWxpemF0aW9uSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCkucGlwZShcbiAgICAgIHRhcCgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyICYmXG4gICAgICAgICAgICBldmVudC5oZWFkZXJzLmtleXMoKS5pbmNsdWRlcyh0aGlzLnJlcXVlc3RIZWFkZXIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCByZWNlaXZlZElkID0gZXZlbnQuaGVhZGVycy5nZXQodGhpcy5yZXF1ZXN0SGVhZGVyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlcnNvbmFsaXphdGlvbklkICE9PSByZWNlaXZlZElkKSB7XG4gICAgICAgICAgICAgIHRoaXMucGVyc29uYWxpemF0aW9uSWQgPSByZWNlaXZlZElkO1xuICAgICAgICAgICAgICBpZiAodGhpcy5wZXJzb25hbGl6YXRpb25JZCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uc2V0SXRlbShcbiAgICAgICAgICAgICAgICAgIHRoaXMuUEVSU09OQUxJWkFUSU9OX0lEX0tFWSxcbiAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxpemF0aW9uSWRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==