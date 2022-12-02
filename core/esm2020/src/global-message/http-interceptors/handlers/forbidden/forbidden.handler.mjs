import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
import * as i1 from "../../../facade/global-message.service";
import * as i2 from "../../../../auth/user-auth/facade/auth.service";
import * as i3 from "../../../../occ/services/occ-endpoints.service";
export class ForbiddenHandler extends HttpErrorHandler {
    constructor(globalMessageService, authService, occEndpoints) {
        super(globalMessageService);
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.occEndpoints = occEndpoints;
        this.responseStatus = HttpResponseStatus.FORBIDDEN;
    }
    handleError(request) {
        if (request.url.endsWith(this.occEndpoints.buildUrl('user', {
            urlParams: { userId: 'current' },
        }))) {
            this.authService.logout();
        }
        this.globalMessageService.add({ key: 'httpHandlers.forbidden' }, GlobalMessageType.MSG_TYPE_ERROR);
    }
    getPriority() {
        return -10 /* Priority.LOW */;
    }
}
ForbiddenHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ForbiddenHandler, deps: [{ token: i1.GlobalMessageService }, { token: i2.AuthService }, { token: i3.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
ForbiddenHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ForbiddenHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ForbiddenHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i2.AuthService }, { type: i3.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yYmlkZGVuLmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9nbG9iYWwtbWVzc2FnZS9odHRwLWludGVyY2VwdG9ycy9oYW5kbGVycy9mb3JiaWRkZW4vZm9yYmlkZGVuLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFLekQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGdCQUFnQjtJQXVCcEQsWUFDWSxvQkFBMEMsRUFDMUMsV0FBd0IsRUFDeEIsWUFBaUM7UUFFM0MsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFKbEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUF6QjdDLG1CQUFjLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDO0lBNEI5QyxDQUFDO0lBMUJELFdBQVcsQ0FBQyxPQUF5QjtRQUNuQyxJQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDakMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRTtTQUNqQyxDQUFDLENBQ0gsRUFDRDtZQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxFQUNqQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULDhCQUFvQjtJQUN0QixDQUFDOzs2R0FyQlUsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FGZixNQUFNOzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXV0aC91c2VyLWF1dGgvZmFjYWRlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBPY2NFbmRwb2ludHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vb2NjL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5pbXBvcnQgeyBQcmlvcml0eSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvYXBwbGljYWJsZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2ZhY2FkZS9nbG9iYWwtbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2dsb2JhbC1tZXNzYWdlLm1vZGVsJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZVN0YXR1cyB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9yZXNwb25zZS1zdGF0dXMubW9kZWwnO1xuaW1wb3J0IHsgSHR0cEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2h0dHAtZXJyb3IuaGFuZGxlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JiaWRkZW5IYW5kbGVyIGV4dGVuZHMgSHR0cEVycm9ySGFuZGxlciB7XG4gIHJlc3BvbnNlU3RhdHVzID0gSHR0cFJlc3BvbnNlU3RhdHVzLkZPUkJJRERFTjtcblxuICBoYW5kbGVFcnJvcihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KSB7XG4gICAgaWYgKFxuICAgICAgcmVxdWVzdC51cmwuZW5kc1dpdGgoXG4gICAgICAgIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCd1c2VyJywge1xuICAgICAgICAgIHVybFBhcmFtczogeyB1c2VySWQ6ICdjdXJyZW50JyB9LFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcbiAgICB9XG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7IGtleTogJ2h0dHBIYW5kbGVycy5mb3JiaWRkZW4nIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICk7XG4gIH1cblxuICBnZXRQcmlvcml0eSgpOiBQcmlvcml0eSB7XG4gICAgcmV0dXJuIFByaW9yaXR5LkxPVztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGdsb2JhbE1lc3NhZ2VTZXJ2aWNlKTtcbiAgfVxufVxuIl19