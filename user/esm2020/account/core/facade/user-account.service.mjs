/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UserAccountChangedEvent, } from '@spartacus/user/account/root';
import { LoginEvent, LogoutEvent, } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../connectors/user-account.connector";
import * as i2 from "@spartacus/core";
export class UserAccountService {
    constructor(userAccountConnector, userIdService, query) {
        this.userAccountConnector = userAccountConnector;
        this.userIdService = userIdService;
        this.query = query;
        this.userQuery = this.query.create(() => this.userIdService
            .takeUserId(true)
            .pipe(switchMap((userId) => this.userAccountConnector.get(userId))), {
            reloadOn: [UserAccountChangedEvent],
            resetOn: [LoginEvent, LogoutEvent],
        });
    }
    /**
     * Returns the current user.
     */
    get() {
        return this.userQuery.get();
    }
}
UserAccountService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountService, deps: [{ token: i1.UserAccountConnector }, { token: i2.UserIdService }, { token: i2.QueryService }], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserAccountConnector }, { type: i2.UserIdService }, { type: i2.QueryService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9hY2NvdW50L2NvcmUvZmFjYWRlL3VzZXItYWNjb3VudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCx1QkFBdUIsR0FFeEIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQ0wsVUFBVSxFQUNWLFdBQVcsR0FJWixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUkzQyxNQUFNLE9BQU8sa0JBQWtCO0lBWTdCLFlBQ1ksb0JBQTBDLEVBQzFDLGFBQTRCLEVBQzVCLEtBQW1CO1FBRm5CLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQWRyQixjQUFTLEdBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNsRCxHQUFHLEVBQUUsQ0FDSCxJQUFJLENBQUMsYUFBYTthQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUM7YUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3ZFO1lBQ0UsUUFBUSxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQztTQUNuQyxDQUNGLENBQUM7SUFNQyxDQUFDO0lBRUo7O09BRUc7SUFDSCxHQUFHO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7OytHQXZCVSxrQkFBa0I7bUhBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgVXNlcixcbiAgVXNlckFjY291bnRDaGFuZ2VkRXZlbnQsXG4gIFVzZXJBY2NvdW50RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7XG4gIExvZ2luRXZlbnQsXG4gIExvZ291dEV2ZW50LFxuICBRdWVyeSxcbiAgUXVlcnlTZXJ2aWNlLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXNlckFjY291bnRDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL3VzZXItYWNjb3VudC5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckFjY291bnRTZXJ2aWNlIGltcGxlbWVudHMgVXNlckFjY291bnRGYWNhZGUge1xuICBwcm90ZWN0ZWQgdXNlclF1ZXJ5OiBRdWVyeTxVc2VyPiA9IHRoaXMucXVlcnkuY3JlYXRlKFxuICAgICgpID0+XG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgLnRha2VVc2VySWQodHJ1ZSlcbiAgICAgICAgLnBpcGUoc3dpdGNoTWFwKCh1c2VySWQpID0+IHRoaXMudXNlckFjY291bnRDb25uZWN0b3IuZ2V0KHVzZXJJZCkpKSxcbiAgICB7XG4gICAgICByZWxvYWRPbjogW1VzZXJBY2NvdW50Q2hhbmdlZEV2ZW50XSxcbiAgICAgIHJlc2V0T246IFtMb2dpbkV2ZW50LCBMb2dvdXRFdmVudF0sXG4gICAgfVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyQWNjb3VudENvbm5lY3RvcjogVXNlckFjY291bnRDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHF1ZXJ5OiBRdWVyeVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHVzZXIuXG4gICAqL1xuICBnZXQoKTogT2JzZXJ2YWJsZTxVc2VyIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclF1ZXJ5LmdldCgpO1xuICB9XG59XG4iXX0=