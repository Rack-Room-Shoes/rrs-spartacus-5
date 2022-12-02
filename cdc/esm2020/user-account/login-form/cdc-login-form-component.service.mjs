/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cdc/root";
export class CdcLoginFormComponentService extends LoginFormComponentService {
    constructor(auth, globalMessageService, winRef, cdcJsService) {
        super(auth, globalMessageService, winRef);
        this.auth = auth;
        this.globalMessageService = globalMessageService;
        this.winRef = winRef;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    login() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Logging in using CDC Gigya SDK
                this.cdcJsService
                    .loginUserWithoutScreenSet(this.form.value.userId.toLowerCase(), this.form.value.password)
                    .subscribe({
                    next: () => this.busy$.next(false),
                    error: () => this.busy$.next(false),
                });
            }
            else {
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                this.busy$.next(false);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CdcLoginFormComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLoginFormComponentService, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.WindowRef }, { token: i2.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLoginFormComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLoginFormComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcLoginFormComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.WindowRef }, { type: i2.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWxvZ2luLWZvcm0tY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy91c2VyLWFjY291bnQvbG9naW4tZm9ybS9jZGMtbG9naW4tZm9ybS1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBR0wsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUdwQyxNQUFNLE9BQU8sNEJBQ1gsU0FBUSx5QkFBeUI7SUFHakMsWUFDWSxJQUFpQixFQUNqQixvQkFBMEMsRUFDMUMsTUFBaUIsRUFDakIsWUFBMEI7UUFFcEMsS0FBSyxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUxoQyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUs1QixpQkFBWSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRjFELENBQUM7SUFJRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM3QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxZQUFZO3FCQUNkLHlCQUF5QixDQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDekI7cUJBQ0EsU0FBUyxDQUFDO29CQUNULElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2xDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3BDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNMLG1EQUFtRDtnQkFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7b0JBQ0UsR0FBRyxFQUFFLGtDQUFrQztpQkFDeEMsRUFDRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O3lIQW5EVSw0QkFBNEI7NkhBQTVCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUR4QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGNKc1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NkYy9yb290JztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExvZ2luRm9ybUNvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9jb21wb25lbnRzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2RjTG9naW5Gb3JtQ29tcG9uZW50U2VydmljZVxuICBleHRlbmRzIExvZ2luRm9ybUNvbXBvbmVudFNlcnZpY2VcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBjZGNKc1NlcnZpY2U6IENkY0pzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihhdXRoLCBnbG9iYWxNZXNzYWdlU2VydmljZSwgd2luUmVmKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBsb2dpbigpIHtcbiAgICBpZiAoIXRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5mb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5jZGNKc1NlcnZpY2UuZGlkTG9hZCgpLnN1YnNjcmliZSgoY2RjTG9hZGVkKSA9PiB7XG4gICAgICAgIGlmIChjZGNMb2FkZWQpIHtcbiAgICAgICAgICAvLyBMb2dnaW5nIGluIHVzaW5nIENEQyBHaWd5YSBTREtcbiAgICAgICAgICB0aGlzLmNkY0pzU2VydmljZVxuICAgICAgICAgICAgLmxvZ2luVXNlcldpdGhvdXRTY3JlZW5TZXQoXG4gICAgICAgICAgICAgIHRoaXMuZm9ybS52YWx1ZS51c2VySWQudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgdGhpcy5mb3JtLnZhbHVlLnBhc3N3b3JkXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgbmV4dDogKCkgPT4gdGhpcy5idXN5JC5uZXh0KGZhbHNlKSxcbiAgICAgICAgICAgICAgZXJyb3I6ICgpID0+IHRoaXMuYnVzeSQubmV4dChmYWxzZSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDREMgR2lneWEgU0RLIG5vdCBsb2FkZWQsIHNob3cgZXJyb3IgdG8gdGhlIHVzZXJcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiAnZXJyb3JIYW5kbGVycy5zY3JpcHRGYWlsZWRUb0xvYWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=