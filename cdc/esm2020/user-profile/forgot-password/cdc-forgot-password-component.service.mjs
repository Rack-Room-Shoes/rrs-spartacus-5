/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { ForgotPasswordComponentService } from '@spartacus/user/profile/components';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cdc/root";
export class CDCForgotPasswordComponentService extends ForgotPasswordComponentService {
    constructor(userPasswordService, routingService, authConfigService, globalMessage, cdcJsService) {
        super(userPasswordService, routingService, authConfigService, globalMessage);
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.authConfigService = authConfigService;
        this.globalMessage = globalMessage;
        this.cdcJsService = cdcJsService;
        this.subscription = new Subscription();
    }
    /**
     * Sends an email to through CDC SDK to reset the password.
     */
    requestEmail() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        this.subscription.add(this.cdcJsService.didLoad().subscribe((cdcLoaded) => {
            if (cdcLoaded) {
                // Reset password using CDC Gigya SDK
                this.cdcJsService
                    .resetPasswordWithoutScreenSet(this.form.value.userEmail)
                    .subscribe({
                    next: (response) => {
                        this.busy$.next(false);
                        if (response.status === 'OK') {
                            this.redirect();
                        }
                    },
                    error: () => this.busy$.next(false),
                });
            }
            else {
                this.busy$.next(false);
                // CDC Gigya SDK not loaded, show error to the user
                this.globalMessage.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CDCForgotPasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.AuthConfigService }, { token: i2.GlobalMessageService }, { token: i3.CdcJsService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCForgotPasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCForgotPasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.AuthConfigService }, { type: i2.GlobalMessageService }, { type: i3.CdcJsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWZvcmdvdC1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3VzZXItcHJvZmlsZS9mb3Jnb3QtcGFzc3dvcmQvY2RjLWZvcmdvdC1wYXNzd29yZC1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBR0wsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFHcEMsTUFBTSxPQUFPLGlDQUNYLFNBQVEsOEJBQThCO0lBS3RDLFlBQ1ksbUJBQXVDLEVBQ3ZDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxhQUFtQyxFQUNuQyxZQUEwQjtRQUVwQyxLQUFLLENBQ0gsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxDQUNkLENBQUM7UUFYUSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVA1QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFlNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IscUNBQXFDO2dCQUNyQyxJQUFJLENBQUMsWUFBWTtxQkFDZCw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7cUJBQ3hELFNBQVMsQ0FBQztvQkFDVCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQzVCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDakI7b0JBQ0gsQ0FBQztvQkFDRCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNwQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsbURBQW1EO2dCQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEI7b0JBQ0UsR0FBRyxFQUFFLGtDQUFrQztpQkFDeEMsRUFDRCxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OEhBL0RVLGlDQUFpQztrSUFBakMsaUNBQWlDOzJGQUFqQyxpQ0FBaUM7a0JBRDdDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkY0pzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY2RjL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aENvbmZpZ1NlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzJztcbmltcG9ydCB7IFVzZXJQYXNzd29yZEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDRENGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2VcbiAgZXh0ZW5kcyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudFNlcnZpY2VcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclBhc3N3b3JkU2VydmljZTogVXNlclBhc3N3b3JkRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhDb25maWdTZXJ2aWNlOiBBdXRoQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNkY0pzU2VydmljZTogQ2RjSnNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgdXNlclBhc3N3b3JkU2VydmljZSxcbiAgICAgIHJvdXRpbmdTZXJ2aWNlLFxuICAgICAgYXV0aENvbmZpZ1NlcnZpY2UsXG4gICAgICBnbG9iYWxNZXNzYWdlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCB0byB0aHJvdWdoIENEQyBTREsgdG8gcmVzZXQgdGhlIHBhc3N3b3JkLlxuICAgKi9cbiAgcmVxdWVzdEVtYWlsKCkge1xuICAgIGlmICghdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSQubmV4dCh0cnVlKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY2RjSnNTZXJ2aWNlLmRpZExvYWQoKS5zdWJzY3JpYmUoKGNkY0xvYWRlZCkgPT4ge1xuICAgICAgICBpZiAoY2RjTG9hZGVkKSB7XG4gICAgICAgICAgLy8gUmVzZXQgcGFzc3dvcmQgdXNpbmcgQ0RDIEdpZ3lhIFNES1xuICAgICAgICAgIHRoaXMuY2RjSnNTZXJ2aWNlXG4gICAgICAgICAgICAucmVzZXRQYXNzd29yZFdpdGhvdXRTY3JlZW5TZXQodGhpcy5mb3JtLnZhbHVlLnVzZXJFbWFpbClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICBuZXh0OiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdPSycpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGVycm9yOiAoKSA9PiB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICAgICAgICAvLyBDREMgR2lneWEgU0RLIG5vdCBsb2FkZWQsIHNob3cgZXJyb3IgdG8gdGhlIHVzZXJcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2UuYWRkKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6ICdlcnJvckhhbmRsZXJzLnNjcmlwdEZhaWxlZFRvTG9hZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=