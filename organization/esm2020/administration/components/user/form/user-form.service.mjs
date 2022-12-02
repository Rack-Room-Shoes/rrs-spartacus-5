/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { B2BUserRole } from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export class UserFormService extends FormService {
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('customerId', new UntypedFormControl(''));
        form.setControl('titleCode', new UntypedFormControl(''));
        form.setControl('firstName', new UntypedFormControl('', Validators.required));
        form.setControl('lastName', new UntypedFormControl('', Validators.required));
        form.setControl('email', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.emailValidator,
        ]));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('roles', new UntypedFormArray([]));
        form.setControl('isAssignedToApprovers', new UntypedFormControl(false));
        form.get('roles')?.valueChanges.subscribe((roles) => {
            if (roles.includes(B2BUserRole.APPROVER)) {
                form.get('isAssignedToApprovers')?.enable();
            }
            else {
                form.get('isAssignedToApprovers')?.disable();
                form.get('isAssignedToApprovers')?.reset();
            }
        });
        this.form = form;
    }
    patchData(item) {
        super.patchData(item);
        if (item) {
            const roles = this.form?.get('roles');
            item.roles?.forEach((role) => {
                if (!roles.value.includes(role)) {
                    roles.push(new UntypedFormControl(role));
                }
            });
        }
    }
}
UserFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9mb3JtL3VzZXItZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQVcsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQUs3RCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUFvQjtJQUM3QyxLQUFLO1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQ2IsV0FBVyxFQUNYLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDaEQsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQ2IsVUFBVSxFQUNWLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDaEQsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQ2IsT0FBTyxFQUNQLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRO1lBQ25CLG9CQUFvQixDQUFDLGNBQWM7U0FDcEMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUNiLFNBQVMsRUFDVCxJQUFJLGdCQUFnQixDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzVELENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWUsRUFBRSxFQUFFO1lBQzVELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUM3QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVTLFNBQVMsQ0FBQyxJQUFhO1FBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQXFCLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxDQUFFLEtBQUssQ0FBQyxLQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0MsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OzRHQW5EVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1BcnJheSxcbiAgVW50eXBlZEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCMkJVc2VyLCBCMkJVc2VyUm9sZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21Gb3JtVmFsaWRhdG9ycyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9mb3JtL2Zvcm0uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyRm9ybVNlcnZpY2UgZXh0ZW5kcyBGb3JtU2VydmljZTxCMkJVc2VyPiB7XG4gIHByb3RlY3RlZCBidWlsZCgpIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnY3VzdG9tZXJJZCcsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpKTtcbiAgICBmb3JtLnNldENvbnRyb2woJ3RpdGxlQ29kZScsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnZmlyc3ROYW1lJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnbGFzdE5hbWUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdlbWFpbCcsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBbXG4gICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgIEN1c3RvbUZvcm1WYWxpZGF0b3JzLmVtYWlsVmFsaWRhdG9yLFxuICAgICAgXSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdvcmdVbml0JyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUdyb3VwKHtcbiAgICAgICAgdWlkOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKHVuZGVmaW5lZCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB9KVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKCdyb2xlcycsIG5ldyBVbnR5cGVkRm9ybUFycmF5KFtdKSk7XG4gICAgZm9ybS5zZXRDb250cm9sKCdpc0Fzc2lnbmVkVG9BcHByb3ZlcnMnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKGZhbHNlKSk7XG5cbiAgICBmb3JtLmdldCgncm9sZXMnKT8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgocm9sZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICBpZiAocm9sZXMuaW5jbHVkZXMoQjJCVXNlclJvbGUuQVBQUk9WRVIpKSB7XG4gICAgICAgIGZvcm0uZ2V0KCdpc0Fzc2lnbmVkVG9BcHByb3ZlcnMnKT8uZW5hYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtLmdldCgnaXNBc3NpZ25lZFRvQXBwcm92ZXJzJyk/LmRpc2FibGUoKTtcbiAgICAgICAgZm9ybS5nZXQoJ2lzQXNzaWduZWRUb0FwcHJvdmVycycpPy5yZXNldCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXRjaERhdGEoaXRlbTogQjJCVXNlcikge1xuICAgIHN1cGVyLnBhdGNoRGF0YShpdGVtKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgY29uc3Qgcm9sZXMgPSB0aGlzLmZvcm0/LmdldCgncm9sZXMnKSBhcyBVbnR5cGVkRm9ybUFycmF5O1xuICAgICAgaXRlbS5yb2xlcz8uZm9yRWFjaCgocm9sZSkgPT4ge1xuICAgICAgICBpZiAoIShyb2xlcy52YWx1ZSBhcyBzdHJpbmdbXSkuaW5jbHVkZXMocm9sZSkpIHtcbiAgICAgICAgICByb2xlcy5wdXNoKG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wocm9sZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==