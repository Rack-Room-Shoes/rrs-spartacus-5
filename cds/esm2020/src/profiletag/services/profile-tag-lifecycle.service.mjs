/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AuthActions, isNotUndefined } from '@spartacus/core';
import { filter, map, mapTo } from 'rxjs/operators';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../config/cds-config";
import * as i3 from "@ngrx/store";
export class ProfileTagLifecycleService {
    constructor(consentService, config, actionsSubject) {
        this.consentService = consentService;
        this.config = config;
        this.actionsSubject = actionsSubject;
    }
    consentChanged() {
        return this.consentService
            .getConsent(this.config.cds?.consentTemplateId ?? '')
            .pipe(filter(isNotUndefined), map((profileConsent) => {
            return this.consentService.isConsentGiven(profileConsent);
        }), map((granted) => {
            return new ConsentChangedPushEvent(granted);
        }));
    }
    loginSuccessful() {
        return this.actionsSubject.pipe(filter((action) => action.type === AuthActions.LOGIN), mapTo(true));
    }
}
ProfileTagLifecycleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagLifecycleService, deps: [{ token: i1.ConsentService }, { token: i2.CdsConfig }, { token: i3.ActionsSubject }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagLifecycleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagLifecycleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagLifecycleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConsentService }, { type: i2.CdsConfig }, { type: i3.ActionsSubject }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWctbGlmZWN5Y2xlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvcHJvZmlsZXRhZy9zZXJ2aWNlcy9wcm9maWxlLXRhZy1saWZlY3ljbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFrQixjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7QUFLckUsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNZLGNBQThCLEVBQzlCLE1BQWlCLEVBQ2pCLGNBQThCO1FBRjlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUN2QyxDQUFDO0lBRUosY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLGNBQWM7YUFDdkIsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGlCQUFpQixJQUFJLEVBQUUsQ0FBQzthQUNwRCxJQUFJLENBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUN0QixHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2QsT0FBTyxJQUFJLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzdCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDWixDQUFDO0lBQ0osQ0FBQzs7dUhBMUJVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRnpCLE1BQU07MkZBRVAsMEJBQTBCO2tCQUh0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXV0aEFjdGlvbnMsIENvbnNlbnRTZXJ2aWNlLCBpc05vdFVuZGVmaW5lZCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDZHNDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvY2RzLWNvbmZpZyc7XG5pbXBvcnQgeyBDb25zZW50Q2hhbmdlZFB1c2hFdmVudCB9IGZyb20gJy4uL21vZGVsL3Byb2ZpbGUtdGFnLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVUYWdMaWZlY3ljbGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbnNlbnRTZXJ2aWNlOiBDb25zZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBDZHNDb25maWcsXG4gICAgcHJvdGVjdGVkIGFjdGlvbnNTdWJqZWN0OiBBY3Rpb25zU3ViamVjdFxuICApIHt9XG5cbiAgY29uc2VudENoYW5nZWQoKTogT2JzZXJ2YWJsZTxDb25zZW50Q2hhbmdlZFB1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmNvbnNlbnRTZXJ2aWNlXG4gICAgICAuZ2V0Q29uc2VudCh0aGlzLmNvbmZpZy5jZHM/LmNvbnNlbnRUZW1wbGF0ZUlkID8/ICcnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICAgIG1hcCgocHJvZmlsZUNvbnNlbnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb25zZW50U2VydmljZS5pc0NvbnNlbnRHaXZlbihwcm9maWxlQ29uc2VudCk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKGdyYW50ZWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IENvbnNlbnRDaGFuZ2VkUHVzaEV2ZW50KGdyYW50ZWQpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGxvZ2luU3VjY2Vzc2Z1bCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zU3ViamVjdC5waXBlKFxuICAgICAgZmlsdGVyKChhY3Rpb24pID0+IGFjdGlvbi50eXBlID09PSBBdXRoQWN0aW9ucy5MT0dJTiksXG4gICAgICBtYXBUbyh0cnVlKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==