/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { GlobalMessageType, } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class UpdatePasswordComponentService {
    constructor(userPasswordService, routingService, globalMessageService) {
        this.userPasswordService = userPasswordService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.busy$ = new BehaviorSubject(false);
        this.isUpdating$ = this.busy$.pipe(tap((state) => (state === true ? this.form.disable() : this.form.enable())));
        this.form = new UntypedFormGroup({
            oldPassword: new UntypedFormControl('', Validators.required),
            newPassword: new UntypedFormControl('', [
                Validators.required,
                CustomFormValidators.passwordValidator,
            ]),
            newPasswordConfirm: new UntypedFormControl('', Validators.required),
        }, {
            validators: CustomFormValidators.passwordsMustMatch('newPassword', 'newPasswordConfirm'),
        });
    }
    /**
     * Updates the password for the user.
     */
    updatePassword() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy$.next(true);
        const oldPassword = this.form.get('oldPassword')?.value;
        const newPassword = this.form.get('newPassword')?.value;
        this.userPasswordService.update(oldPassword, newPassword).subscribe({
            next: () => this.onSuccess(),
            error: (error) => this.onError(error),
        });
    }
    onSuccess() {
        this.globalMessageService.add({ key: 'updatePasswordForm.passwordUpdateSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.busy$.next(false);
        this.form.reset();
        this.routingService.go({ cxRoute: 'home' });
    }
    onError(_error) {
        this.busy$.next(false);
        this.form.reset();
    }
}
UpdatePasswordComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordComponentService, deps: [{ token: i1.UserPasswordFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UpdatePasswordComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UpdatePasswordComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserPasswordFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBhc3N3b3JkLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzL3VwZGF0ZS1wYXNzd29yZC91cGRhdGUtcGFzc3dvcmQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUVMLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3JDLE1BQU0sT0FBTyw4QkFBOEI7SUFDekMsWUFDWSxtQkFBdUMsRUFDdkMsY0FBOEIsRUFDOUIsb0JBQTBDO1FBRjFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7UUFDdkMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFHNUMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FDNUUsQ0FBQztRQUVGLFNBQUksR0FBcUIsSUFBSSxnQkFBZ0IsQ0FDM0M7WUFDRSxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUM1RCxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLFVBQVUsQ0FBQyxRQUFRO2dCQUNuQixvQkFBb0IsQ0FBQyxpQkFBaUI7YUFDdkMsQ0FBQztZQUNGLGtCQUFrQixFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEUsRUFDRDtZQUNFLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FDakQsYUFBYSxFQUNiLG9CQUFvQixDQUNyQjtTQUNGLENBQ0YsQ0FBQztJQXZCQyxDQUFDO0lBeUJKOztPQUVHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssQ0FBQztRQUV4RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDbEUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDNUIsS0FBSyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUM3QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsU0FBUztRQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSwwQ0FBMEMsRUFBRSxFQUNuRCxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FDeEMsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRVMsT0FBTyxDQUFDLE1BQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDOzsySEEvRFUsOEJBQThCOytIQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFVudHlwZWRGb3JtQ29udHJvbCxcbiAgVW50eXBlZEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1WYWxpZGF0b3JzIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFVzZXJQYXNzd29yZEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVcGRhdGVQYXNzd29yZENvbXBvbmVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlclBhc3N3b3JkU2VydmljZTogVXNlclBhc3N3b3JkRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGJ1c3kkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgaXNVcGRhdGluZyQgPSB0aGlzLmJ1c3kkLnBpcGUoXG4gICAgdGFwKChzdGF0ZSkgPT4gKHN0YXRlID09PSB0cnVlID8gdGhpcy5mb3JtLmRpc2FibGUoKSA6IHRoaXMuZm9ybS5lbmFibGUoKSkpXG4gICk7XG5cbiAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKFxuICAgIHtcbiAgICAgIG9sZFBhc3N3b3JkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgIG5ld1Bhc3N3b3JkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIEN1c3RvbUZvcm1WYWxpZGF0b3JzLnBhc3N3b3JkVmFsaWRhdG9yLFxuICAgICAgXSksXG4gICAgICBuZXdQYXNzd29yZENvbmZpcm06IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgIH0sXG4gICAge1xuICAgICAgdmFsaWRhdG9yczogQ3VzdG9tRm9ybVZhbGlkYXRvcnMucGFzc3dvcmRzTXVzdE1hdGNoKFxuICAgICAgICAnbmV3UGFzc3dvcmQnLFxuICAgICAgICAnbmV3UGFzc3dvcmRDb25maXJtJ1xuICAgICAgKSxcbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBhc3N3b3JkIGZvciB0aGUgdXNlci5cbiAgICovXG4gIHVwZGF0ZVBhc3N3b3JkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLmZvcm0ubWFya0FsbEFzVG91Y2hlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSQubmV4dCh0cnVlKTtcblxuICAgIGNvbnN0IG9sZFBhc3N3b3JkID0gdGhpcy5mb3JtLmdldCgnb2xkUGFzc3dvcmQnKT8udmFsdWU7XG4gICAgY29uc3QgbmV3UGFzc3dvcmQgPSB0aGlzLmZvcm0uZ2V0KCduZXdQYXNzd29yZCcpPy52YWx1ZTtcblxuICAgIHRoaXMudXNlclBhc3N3b3JkU2VydmljZS51cGRhdGUob2xkUGFzc3dvcmQsIG5ld1Bhc3N3b3JkKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKCkgPT4gdGhpcy5vblN1Y2Nlc3MoKSxcbiAgICAgIGVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRXJyb3IoZXJyb3IpLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uU3VjY2VzcygpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHsga2V5OiAndXBkYXRlUGFzc3dvcmRGb3JtLnBhc3N3b3JkVXBkYXRlU3VjY2VzcycgfSxcbiAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICk7XG4gICAgdGhpcy5idXN5JC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmZvcm0ucmVzZXQoKTtcbiAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHsgY3hSb3V0ZTogJ2hvbWUnIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRXJyb3IoX2Vycm9yOiBFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gICAgdGhpcy5mb3JtLnJlc2V0KCk7XG4gIH1cbn1cbiJdfQ==