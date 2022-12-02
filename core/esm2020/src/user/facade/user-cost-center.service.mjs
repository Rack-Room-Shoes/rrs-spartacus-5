/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { queueScheduler } from 'rxjs';
import { filter, map, observeOn, tap } from 'rxjs/operators';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../auth/user-auth/facade/user-id.service";
export class UserCostCenterService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    /**
     * Load all visible active cost centers for the currently login user
     */
    loadActiveCostCenters() {
        this.userIdService.takeUserId(true).subscribe((userId) => {
            this.store.dispatch(new UserActions.LoadActiveCostCenters(userId));
        }, () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getCostCentersState() {
        return this.store.select(UsersSelectors.getCostCentersState);
    }
    /**
     * Get all visible active cost centers
     */
    getActiveCostCenters() {
        return this.getCostCentersState().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadActiveCostCenters();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value ?? []));
    }
    /**
     * Get the addresses of the cost center's unit based on cost center id
     * @param costCenterId cost center id
     */
    getCostCenterAddresses(costCenterId) {
        return this.getActiveCostCenters().pipe(map((costCenters) => {
            const costCenter = costCenters.find((cc) => cc.code === costCenterId);
            if (costCenter && costCenter.unit) {
                return costCenter.unit.addresses ?? [];
            }
            else {
                return [];
            }
        }));
    }
}
UserCostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserCostCenterService, deps: [{ token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
UserCostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserCostCenterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserCostCenterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb3N0LWNlbnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXNlci9mYWNhZGUvdXNlci1jb3N0LWNlbnRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFNMUQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNZLEtBQTJCLEVBQzNCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQXNCO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ3JDLENBQUM7SUFFSjs7T0FFRztJQUNILHFCQUFxQjtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQzNDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsRUFDRCxHQUFHLEVBQUU7WUFDSCxpRUFBaUU7UUFDbkUsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUNwQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQ3pCLEdBQUcsQ0FBQyxDQUFDLE9BQWtDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUM5QjtRQUNILENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxDQUFDLE9BQWtDLEVBQUUsRUFBRSxDQUM1QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQzFDLEVBQ0QsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNwQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILHNCQUFzQixDQUFDLFlBQW9CO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDO1lBQ3RFLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7a0hBekRVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgcXVldWVTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBvYnNlcnZlT24sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFVzZXJJZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hdXRoL3VzZXItYXV0aC9mYWNhZGUvdXNlci1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuLi8uLi9tb2RlbC9hZGRyZXNzLm1vZGVsJztcbmltcG9ydCB7IENvc3RDZW50ZXIgfSBmcm9tICcuLi8uLi9tb2RlbC9vcmctdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBMb2FkZXJTdGF0ZSB9IGZyb20gJy4uLy4uL3N0YXRlL3V0aWxzL2xvYWRlci9sb2FkZXItc3RhdGUnO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFVzZXJzU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aFVzZXIgfSBmcm9tICcuLi9zdG9yZS91c2VyLXN0YXRlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJDb3N0Q2VudGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoVXNlcj4sXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBMb2FkIGFsbCB2aXNpYmxlIGFjdGl2ZSBjb3N0IGNlbnRlcnMgZm9yIHRoZSBjdXJyZW50bHkgbG9naW4gdXNlclxuICAgKi9cbiAgbG9hZEFjdGl2ZUNvc3RDZW50ZXJzKCk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZShcbiAgICAgICh1c2VySWQpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgVXNlckFjdGlvbnMuTG9hZEFjdGl2ZUNvc3RDZW50ZXJzKHVzZXJJZCkpO1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb3N0Q2VudGVyc1N0YXRlKCk6IE9ic2VydmFibGU8TG9hZGVyU3RhdGU8Q29zdENlbnRlcltdPj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChVc2Vyc1NlbGVjdG9ycy5nZXRDb3N0Q2VudGVyc1N0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHZpc2libGUgYWN0aXZlIGNvc3QgY2VudGVyc1xuICAgKi9cbiAgZ2V0QWN0aXZlQ29zdENlbnRlcnMoKTogT2JzZXJ2YWJsZTxDb3N0Q2VudGVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb3N0Q2VudGVyc1N0YXRlKCkucGlwZShcbiAgICAgIG9ic2VydmVPbihxdWV1ZVNjaGVkdWxlciksXG4gICAgICB0YXAoKHByb2Nlc3M6IExvYWRlclN0YXRlPENvc3RDZW50ZXJbXT4pID0+IHtcbiAgICAgICAgaWYgKCEocHJvY2Vzcy5sb2FkaW5nIHx8IHByb2Nlc3Muc3VjY2VzcyB8fCBwcm9jZXNzLmVycm9yKSkge1xuICAgICAgICAgIHRoaXMubG9hZEFjdGl2ZUNvc3RDZW50ZXJzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKChwcm9jZXNzOiBMb2FkZXJTdGF0ZTxDb3N0Q2VudGVyW10+KSA9PlxuICAgICAgICBCb29sZWFuKHByb2Nlc3Muc3VjY2VzcyB8fCBwcm9jZXNzLmVycm9yKVxuICAgICAgKSxcbiAgICAgIG1hcCgocmVzdWx0KSA9PiByZXN1bHQudmFsdWUgPz8gW10pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFkZHJlc3NlcyBvZiB0aGUgY29zdCBjZW50ZXIncyB1bml0IGJhc2VkIG9uIGNvc3QgY2VudGVyIGlkXG4gICAqIEBwYXJhbSBjb3N0Q2VudGVySWQgY29zdCBjZW50ZXIgaWRcbiAgICovXG4gIGdldENvc3RDZW50ZXJBZGRyZXNzZXMoY29zdENlbnRlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFkZHJlc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZUNvc3RDZW50ZXJzKCkucGlwZShcbiAgICAgIG1hcCgoY29zdENlbnRlcnMpID0+IHtcbiAgICAgICAgY29uc3QgY29zdENlbnRlciA9IGNvc3RDZW50ZXJzLmZpbmQoKGNjKSA9PiBjYy5jb2RlID09PSBjb3N0Q2VudGVySWQpO1xuICAgICAgICBpZiAoY29zdENlbnRlciAmJiBjb3N0Q2VudGVyLnVuaXQpIHtcbiAgICAgICAgICByZXR1cm4gY29zdENlbnRlci51bml0LmFkZHJlc3NlcyA/PyBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19