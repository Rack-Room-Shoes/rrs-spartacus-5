/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { FormService } from '../../../../shared/form/form.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/user/profile/root";
export class UnitAddressFormService extends FormService {
    constructor(userAddressService, userProfileFacade) {
        super();
        this.userAddressService = userAddressService;
        this.userProfileFacade = userProfileFacade;
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('id', new UntypedFormControl(''));
        form.setControl('titleCode', new UntypedFormControl(''));
        form.setControl('firstName', new UntypedFormControl('', Validators.required));
        form.setControl('lastName', new UntypedFormControl('', Validators.required));
        form.setControl('line1', new UntypedFormControl('', Validators.required));
        form.setControl('line2', new UntypedFormControl(''));
        form.setControl('town', new UntypedFormControl('', Validators.required));
        form.setControl('country', new UntypedFormGroup({
            isocode: new UntypedFormControl(null, Validators.required),
        }));
        form.setControl('region', new UntypedFormGroup({
            isocode: new UntypedFormControl(null, Validators.required),
        }));
        form.setControl('postalCode', new UntypedFormControl('', Validators.required));
        form.setControl('phone', new UntypedFormControl(''));
        this.form = form;
    }
    getCountries() {
        return this.userAddressService.getDeliveryCountries().pipe(tap((countries) => {
            if (Object.keys(countries).length === 0) {
                this.userAddressService.loadDeliveryCountries();
            }
        }));
    }
    getTitles() {
        return this.userProfileFacade.getTitles();
    }
    getRegions() {
        let selectedCountryCode = this.form?.get('country.isocode')?.value;
        let newCountryCode;
        return (this.getForm()
            ?.get('country.isocode')
            ?.valueChanges.pipe(filter((countryIsoCode) => Boolean(countryIsoCode)), switchMap((countryIsoCode) => {
            newCountryCode = countryIsoCode;
            return this.userAddressService.getRegions(countryIsoCode);
        }), tap((regions) => {
            const regionControl = this.form?.get('region.isocode');
            if (!regions || regions.length === 0) {
                regionControl?.disable();
            }
            else {
                regionControl?.enable();
            }
            if (selectedCountryCode && newCountryCode !== selectedCountryCode) {
                regionControl?.reset();
            }
            selectedCountryCode = newCountryCode;
        })) ?? of([]));
    }
}
UnitAddressFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitAddressFormService, deps: [{ token: i1.UserAddressService }, { token: i2.UserProfileFacade }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitAddressFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitAddressFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserAddressService }, { type: i2.UserProfileFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy9mb3JtL3VuaXQtYWRkcmVzcy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEIsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFLbkUsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFdBQW9CO0lBQzlELFlBQ1ksa0JBQXNDLEVBQ3RDLGlCQUFvQztRQUU5QyxLQUFLLEVBQUUsQ0FBQztRQUhFLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUdoRCxDQUFDO0lBRVMsS0FBSztRQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxD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cEMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLGFBQWEsRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUN6QjtZQUNELElBQUksbUJBQW1CLElBQUksY0FBYyxLQUFLLG1CQUFtQixFQUFFO2dCQUNqRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDeEI7WUFDRCxtQkFBbUIsR0FBRyxjQUFjLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQ0gsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQ2QsQ0FBQztJQUNKLENBQUM7O21IQXJGVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBVbnR5cGVkRm9ybUNvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFkZHJlc3MsXG4gIENvdW50cnksXG4gIFJlZ2lvbixcbiAgVGl0bGUsXG4gIFVzZXJBZGRyZXNzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL3Byb2ZpbGUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2Zvcm0vZm9ybS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRBZGRyZXNzRm9ybVNlcnZpY2UgZXh0ZW5kcyBGb3JtU2VydmljZTxBZGRyZXNzPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyQWRkcmVzc1NlcnZpY2U6IFVzZXJBZGRyZXNzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlclByb2ZpbGVGYWNhZGU6IFVzZXJQcm9maWxlRmFjYWRlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGQoKSB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICBmb3JtLnNldENvbnRyb2woJ2lkJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJykpO1xuICAgIGZvcm0uc2V0Q29udHJvbCgndGl0bGVDb2RlJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJykpO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdmaXJzdE5hbWUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdsYXN0TmFtZScsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKCdsaW5lMScsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcbiAgICBmb3JtLnNldENvbnRyb2woJ2xpbmUyJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJykpO1xuICAgIGZvcm0uc2V0Q29udHJvbCgndG93bicsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnY291bnRyeScsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgIGlzb2NvZGU6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wobnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB9KVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ3JlZ2lvbicsXG4gICAgICBuZXcgVW50eXBlZEZvcm1Hcm91cCh7XG4gICAgICAgIGlzb2NvZGU6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wobnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICB9KVxuICAgICk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ3Bvc3RhbENvZGUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbCgncGhvbmUnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKSk7XG5cbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzKCk6IE9ic2VydmFibGU8Q291bnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckFkZHJlc3NTZXJ2aWNlLmdldERlbGl2ZXJ5Q291bnRyaWVzKCkucGlwZShcbiAgICAgIHRhcCgoY291bnRyaWVzKSA9PiB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhjb3VudHJpZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMudXNlckFkZHJlc3NTZXJ2aWNlLmxvYWREZWxpdmVyeUNvdW50cmllcygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRUaXRsZXMoKTogT2JzZXJ2YWJsZTxUaXRsZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGVGYWNhZGUuZ2V0VGl0bGVzKCk7XG4gIH1cblxuICBnZXRSZWdpb25zKCk6IE9ic2VydmFibGU8UmVnaW9uW10+IHtcbiAgICBsZXQgc2VsZWN0ZWRDb3VudHJ5Q29kZSA9IHRoaXMuZm9ybT8uZ2V0KCdjb3VudHJ5Lmlzb2NvZGUnKT8udmFsdWU7XG4gICAgbGV0IG5ld0NvdW50cnlDb2RlOiBzdHJpbmc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRGb3JtKClcbiAgICAgICAgPy5nZXQoJ2NvdW50cnkuaXNvY29kZScpXG4gICAgICAgID8udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChjb3VudHJ5SXNvQ29kZSkgPT4gQm9vbGVhbihjb3VudHJ5SXNvQ29kZSkpLFxuICAgICAgICAgIHN3aXRjaE1hcCgoY291bnRyeUlzb0NvZGUpID0+IHtcbiAgICAgICAgICAgIG5ld0NvdW50cnlDb2RlID0gY291bnRyeUlzb0NvZGU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyQWRkcmVzc1NlcnZpY2UuZ2V0UmVnaW9ucyhjb3VudHJ5SXNvQ29kZSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgdGFwKChyZWdpb25zOiBSZWdpb25bXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVnaW9uQ29udHJvbCA9IHRoaXMuZm9ybT8uZ2V0KCdyZWdpb24uaXNvY29kZScpO1xuICAgICAgICAgICAgaWYgKCFyZWdpb25zIHx8IHJlZ2lvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJlZ2lvbkNvbnRyb2w/LmRpc2FibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlZ2lvbkNvbnRyb2w/LmVuYWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ291bnRyeUNvZGUgJiYgbmV3Q291bnRyeUNvZGUgIT09IHNlbGVjdGVkQ291bnRyeUNvZGUpIHtcbiAgICAgICAgICAgICAgcmVnaW9uQ29udHJvbD8ucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdGVkQ291bnRyeUNvZGUgPSBuZXdDb3VudHJ5Q29kZTtcbiAgICAgICAgICB9KVxuICAgICAgICApID8/IG9mKFtdKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==