/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormService } from '../../../../shared/form/form.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/organization/administration/core";
export class UnitUserRolesFormService extends FormService {
    constructor(userService) {
        super();
        this.userService = userService;
        this.availableRoles = this.userService.getAllRoles();
    }
    getForm(item) {
        // if form already exist, while switching between users
        // it didn't patchData again, so used force rebuild
        this.form = null;
        return super.getForm(item);
    }
    build() {
        const form = new UntypedFormGroup({});
        this.availableRoles.forEach((role) => form.addControl(role, new UntypedFormControl()));
        this.form = form;
    }
    patchData(item) {
        super.patchData(item);
        if (item) {
            item.roles?.forEach((role) => {
                this.form?.get(role)?.setValue(true);
            });
        }
    }
}
UnitUserRolesFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserRolesFormService, deps: [{ token: i1.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserRolesFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserRolesFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserRolesFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLXJvbGVzLWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL3VzZXJzL3JvbGVzL3VuaXQtdXNlci1yb2xlcy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7QUFLbkUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQW9CO0lBR2hFLFlBQXNCLFdBQTJCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBRFksZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBRmpELG1CQUFjLEdBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFJL0QsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFjO1FBQ3BCLHVEQUF1RDtRQUN2RCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFUyxLQUFLO1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUNoRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVTLFNBQVMsQ0FBQyxJQUFhO1FBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O3FIQTdCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCMkJVc2VyLCBCMkJVc2VyUm9sZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCMkJVc2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvZm9ybS9mb3JtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdFVzZXJSb2xlc0Zvcm1TZXJ2aWNlIGV4dGVuZHMgRm9ybVNlcnZpY2U8QjJCVXNlcj4ge1xuICBhdmFpbGFibGVSb2xlczogQjJCVXNlclJvbGVbXSA9IHRoaXMudXNlclNlcnZpY2UuZ2V0QWxsUm9sZXMoKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdXNlclNlcnZpY2U6IEIyQlVzZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldEZvcm0oaXRlbT86IEIyQlVzZXIpOiBVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbCB7XG4gICAgLy8gaWYgZm9ybSBhbHJlYWR5IGV4aXN0LCB3aGlsZSBzd2l0Y2hpbmcgYmV0d2VlbiB1c2Vyc1xuICAgIC8vIGl0IGRpZG4ndCBwYXRjaERhdGEgYWdhaW4sIHNvIHVzZWQgZm9yY2UgcmVidWlsZFxuICAgIHRoaXMuZm9ybSA9IG51bGw7XG4gICAgcmV0dXJuIHN1cGVyLmdldEZvcm0oaXRlbSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGQoKSB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICB0aGlzLmF2YWlsYWJsZVJvbGVzLmZvckVhY2goKHJvbGUpID0+XG4gICAgICBmb3JtLmFkZENvbnRyb2wocm9sZSwgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpKVxuICAgICk7XG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXRjaERhdGEoaXRlbTogQjJCVXNlcikge1xuICAgIHN1cGVyLnBhdGNoRGF0YShpdGVtKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbS5yb2xlcz8uZm9yRWFjaCgocm9sZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm0/LmdldChyb2xlKT8uc2V0VmFsdWUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==