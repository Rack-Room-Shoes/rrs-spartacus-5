/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BUserRole, GlobalMessageType, } from '@spartacus/core';
import { filter, map, pluck } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/account/root";
import * as i2 from "@spartacus/core";
export class AdminGuard {
    constructor(userAccountFacade, routingService, globalMessageService) {
        this.userAccountFacade = userAccountFacade;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return this.userAccountFacade.get().pipe(filter((user) => !!user && Object.keys(user).length > 0), pluck('roles'), map((roles) => {
            const hasRole = Array.isArray(roles) && roles.includes(B2BUserRole.ADMIN);
            if (!hasRole) {
                // routing as temporary solution until /organization won't
                // have set up proper permission on backend
                this.routingService.go({ cxRoute: 'organization' });
                this.globalMessageService.add({ key: 'organization.notification.noSufficientPermissions' }, GlobalMessageType.MSG_TYPE_WARNING);
            }
            return hasRole;
        }));
    }
}
AdminGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdminGuard, deps: [{ token: i1.UserAccountFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
AdminGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdminGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdminGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserAccountFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvZ3VhcmRzL2FkbWluLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxXQUFXLEVBRVgsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7QUFHekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLcEQsTUFBTSxPQUFPLFVBQVU7SUFDckIsWUFDWSxpQkFBb0MsRUFDcEMsY0FBOEIsRUFDOUIsb0JBQTBDO1FBRjFDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDbkQsQ0FBQztJQUVKLFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQ3RDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNkLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osTUFBTSxPQUFPLEdBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLDBEQUEwRDtnQkFDMUQsMkNBQTJDO2dCQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUVwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSxtREFBbUQsRUFBRSxFQUM1RCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FDbkMsQ0FBQzthQUNIO1lBRUQsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O3VHQTdCVSxVQUFVOzJHQUFWLFVBQVUsY0FGVCxNQUFNOzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQjJCVXNlclJvbGUsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJBY2NvdW50RmFjYWRlLmdldCgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHVzZXIpID0+ICEhdXNlciAmJiBPYmplY3Qua2V5cyh1c2VyKS5sZW5ndGggPiAwKSxcbiAgICAgIHBsdWNrKCdyb2xlcycpLFxuICAgICAgbWFwKChyb2xlcykgPT4ge1xuICAgICAgICBjb25zdCBoYXNSb2xlID1cbiAgICAgICAgICBBcnJheS5pc0FycmF5KHJvbGVzKSAmJiByb2xlcy5pbmNsdWRlcyhCMkJVc2VyUm9sZS5BRE1JTik7XG5cbiAgICAgICAgaWYgKCFoYXNSb2xlKSB7XG4gICAgICAgICAgLy8gcm91dGluZyBhcyB0ZW1wb3Jhcnkgc29sdXRpb24gdW50aWwgL29yZ2FuaXphdGlvbiB3b24ndFxuICAgICAgICAgIC8vIGhhdmUgc2V0IHVwIHByb3BlciBwZXJtaXNzaW9uIG9uIGJhY2tlbmRcbiAgICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHsgY3hSb3V0ZTogJ29yZ2FuaXphdGlvbicgfSk7XG5cbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgIHsga2V5OiAnb3JnYW5pemF0aW9uLm5vdGlmaWNhdGlvbi5ub1N1ZmZpY2llbnRQZXJtaXNzaW9ucycgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX1dBUk5JTkdcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhhc1JvbGU7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==