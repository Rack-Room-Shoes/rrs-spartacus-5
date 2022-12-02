import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class CpqAccessLoaderService {
    constructor(http, occEndpointsService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
    }
    getCpqAccessData() {
        return this.http.get(this.occEndpointsService.buildUrl('getCpqAccessData'));
    }
}
CpqAccessLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqAccessLoaderService, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqAccessLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqAccessLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqAccessLoaderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWFjY2Vzcy1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC9jcHEvaW50ZXJjZXB0b3IvY3BxLWFjY2Vzcy1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTTNDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDWSxJQUFnQixFQUNoQixtQkFBd0M7UUFEeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQ2pELENBQUM7SUFFSixnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQ3RELENBQUM7SUFDSixDQUFDOzttSEFWVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQURULE1BQU07MkZBQ25CLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDcHFBY2Nlc3NEYXRhIH0gZnJvbSAnLi9jcHEtYWNjZXNzLWRhdGEubW9kZWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDcHFBY2Nlc3NMb2FkZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50c1NlcnZpY2U6IE9jY0VuZHBvaW50c1NlcnZpY2VcbiAgKSB7fVxuXG4gIGdldENwcUFjY2Vzc0RhdGEoKTogT2JzZXJ2YWJsZTxDcHFBY2Nlc3NEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q3BxQWNjZXNzRGF0YT4oXG4gICAgICB0aGlzLm9jY0VuZHBvaW50c1NlcnZpY2UuYnVpbGRVcmwoJ2dldENwcUFjY2Vzc0RhdGEnKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==