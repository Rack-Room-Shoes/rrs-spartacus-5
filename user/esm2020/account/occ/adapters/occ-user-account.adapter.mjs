import { Injectable } from '@angular/core';
import { normalizeHttpError, } from '@spartacus/core';
import { USER_ACCOUNT_NORMALIZER, } from '@spartacus/user/account/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccUserAccountAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId) {
        const url = this.occEndpoints.buildUrl('user', { urlParams: { userId } });
        return this.http.get(url).pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(USER_ACCOUNT_NORMALIZER));
    }
}
OccUserAccountAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccUserAccountAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserAccountAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccUserAccountAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccUserAccountAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXVzZXItYWNjb3VudC5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9vY2MvYWRhcHRlcnMvb2NjLXVzZXItYWNjb3VudC5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGtCQUFrQixHQUduQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCx1QkFBdUIsR0FFeEIsTUFBTSw4QkFBOEIsQ0FBQztBQUV0QyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVKLElBQUksQ0FBQyxNQUFjO1FBQ2pCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDdEMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUNqRCxDQUFDO0lBQ0osQ0FBQzs7a0hBYlUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBub3JtYWxpemVIdHRwRXJyb3IsXG4gIE9jYyxcbiAgT2NjRW5kcG9pbnRzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFVTRVJfQUNDT1VOVF9OT1JNQUxJWkVSLFxuICBVc2VyQWNjb3VudEFkYXB0ZXIsXG59IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L2NvcmUnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY1VzZXJBY2NvdW50QWRhcHRlciBpbXBsZW1lbnRzIFVzZXJBY2NvdW50QWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgbG9hZCh1c2VySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCd1c2VyJywgeyB1cmxQYXJhbXM6IHsgdXNlcklkIH0gfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8T2NjLlVzZXI+KHVybCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFVTRVJfQUNDT1VOVF9OT1JNQUxJWkVSKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==