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
export class ApproverGuard {
    constructor(userAccountFacade, routingService, globalMessageService) {
        this.userAccountFacade = userAccountFacade;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return this.userAccountFacade.get().pipe(filter((user) => !!user && Object.keys(user).length > 0), pluck('roles'), map((roles) => {
            const hasRole = Array.isArray(roles) &&
                (roles.includes(B2BUserRole.APPROVER) ||
                    roles.includes(B2BUserRole.ADMIN));
            if (!hasRole) {
                this.routingService.go({ cxRoute: 'home' });
                this.globalMessageService.add({
                    key: 'orderApprovalGlobal.notification.noSufficientPermissions',
                }, GlobalMessageType.MSG_TYPE_WARNING);
            }
            return hasRole;
        }));
    }
}
ApproverGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ApproverGuard, deps: [{ token: i1.UserAccountFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ApproverGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ApproverGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ApproverGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserAccountFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92ZXIuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL2NvcmUvZ3VhcmRzL2FwcHJvdmVyLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxXQUFXLEVBRVgsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7QUFHekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLcEQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFDWSxpQkFBb0MsRUFDcEMsY0FBOEIsRUFDOUIsb0JBQTBDO1FBRjFDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDbkQsQ0FBQztJQUVKLFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQ3RDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNkLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osTUFBTSxPQUFPLEdBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO29CQUNuQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7b0JBQ0UsR0FBRyxFQUFFLDBEQUEwRDtpQkFDaEUsRUFDRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FDbkMsQ0FBQzthQUNIO1lBRUQsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OzBHQS9CVSxhQUFhOzhHQUFiLGFBQWEsY0FGWixNQUFNOzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQjJCVXNlclJvbGUsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9hY2NvdW50L3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXBwcm92ZXJHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGNhbkFjdGl2YXRlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJBY2NvdW50RmFjYWRlLmdldCgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHVzZXIpID0+ICEhdXNlciAmJiBPYmplY3Qua2V5cyh1c2VyKS5sZW5ndGggPiAwKSxcbiAgICAgIHBsdWNrKCdyb2xlcycpLFxuICAgICAgbWFwKChyb2xlcykgPT4ge1xuICAgICAgICBjb25zdCBoYXNSb2xlID1cbiAgICAgICAgICBBcnJheS5pc0FycmF5KHJvbGVzKSAmJlxuICAgICAgICAgIChyb2xlcy5pbmNsdWRlcyhCMkJVc2VyUm9sZS5BUFBST1ZFUikgfHxcbiAgICAgICAgICAgIHJvbGVzLmluY2x1ZGVzKEIyQlVzZXJSb2xlLkFETUlOKSk7XG5cbiAgICAgICAgaWYgKCFoYXNSb2xlKSB7XG4gICAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdob21lJyB9KTtcblxuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6ICdvcmRlckFwcHJvdmFsR2xvYmFsLm5vdGlmaWNhdGlvbi5ub1N1ZmZpY2llbnRQZXJtaXNzaW9ucycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfV0FSTklOR1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzUm9sZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19