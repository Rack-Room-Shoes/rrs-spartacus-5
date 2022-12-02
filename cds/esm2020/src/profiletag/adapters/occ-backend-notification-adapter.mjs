import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccBackendNotification {
    constructor(http, occEndpoints) {
        this.http = http;
        this.occEndpoints = occEndpoints;
    }
    notifySuccessfulLogin() {
        return this.http
            .post(`${this.occEndpoints.getBaseUrl()}/users/current/loginnotification`, {})
            .pipe(switchMapTo(of()));
    }
}
OccBackendNotification.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccBackendNotification, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccBackendNotification.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccBackendNotification });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccBackendNotification, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWJhY2tlbmQtbm90aWZpY2F0aW9uLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvcHJvZmlsZXRhZy9hZGFwdGVycy9vY2MtYmFja2VuZC1ub3RpZmljYXRpb24tYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSTdDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDVSxJQUFnQixFQUNoQixZQUFpQztRQURqQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUN4QyxDQUFDO0lBQ0oscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQ0gsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxrQ0FBa0MsRUFDbkUsRUFBRSxDQUNIO2FBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7bUhBWlUsc0JBQXNCO3VIQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPY2NFbmRwb2ludHNTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENkc0JhY2tlbmROb3RpZmljYXRpb25BZGFwdGVyIH0gZnJvbSAnLi9jZHMtYmFja2VuZC1ub3RpZmljYXRpb24tYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NCYWNrZW5kTm90aWZpY2F0aW9uIGltcGxlbWVudHMgQ2RzQmFja2VuZE5vdGlmaWNhdGlvbkFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2VcbiAgKSB7fVxuICBub3RpZnlTdWNjZXNzZnVsTG9naW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8e30+KFxuICAgICAgICBgJHt0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCl9L3VzZXJzL2N1cnJlbnQvbG9naW5ub3RpZmljYXRpb25gLFxuICAgICAgICB7fVxuICAgICAgKVxuICAgICAgLnBpcGUoc3dpdGNoTWFwVG8ob2YoKSkpO1xuICB9XG59XG4iXX0=