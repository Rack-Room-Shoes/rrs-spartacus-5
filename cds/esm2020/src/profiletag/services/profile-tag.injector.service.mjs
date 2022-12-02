/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./profiletag-event.service";
import * as i2 from "../connectors/cds-backend-connector";
import * as i3 from "./profile-tag-lifecycle.service";
export class ProfileTagInjectorService {
    constructor(profileTagEventTracker, cdsBackendConnector, profileTagLifecycleService) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.cdsBackendConnector = cdsBackendConnector;
        this.profileTagLifecycleService = profileTagLifecycleService;
    }
    track() {
        return this.profileTagEventTracker
            .addTracker()
            .pipe(switchMap((_) => merge(this.profileTagEventTracker.getProfileTagEvents(), this.notifyEcOfLoginSuccessful()).pipe(mapTo(true))));
    }
    notifyEcOfLoginSuccessful() {
        return this.profileTagLifecycleService.loginSuccessful().pipe(switchMap((_) => {
            return this.cdsBackendConnector
                .notifySuccessfulLogin()
                .pipe(mapTo(true));
        }));
    }
}
ProfileTagInjectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagInjectorService, deps: [{ token: i1.ProfileTagEventService }, { token: i2.CdsBackendConnector }, { token: i3.ProfileTagLifecycleService }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagInjectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagInjectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagInjectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProfileTagEventService }, { type: i2.CdsBackendConnector }, { type: i3.ProfileTagLifecycleService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWcuaW5qZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9wcm9maWxldGFnL3NlcnZpY2VzL3Byb2ZpbGUtdGFnLmluamVjdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQVFsRCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQ1Usc0JBQThDLEVBQzlDLG1CQUF3QyxFQUN4QywwQkFBc0Q7UUFGdEQsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7SUFDN0QsQ0FBQztJQUVKLEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxzQkFBc0I7YUFDL0IsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2QsS0FBSyxDQUNILElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsRUFBRSxFQUNqRCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FDakMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3BCLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFFTyx5QkFBeUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUMzRCxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLG1CQUFtQjtpQkFDNUIscUJBQXFCLEVBQUU7aUJBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7c0hBNUJVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRnhCLE1BQU07MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXBUbywgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2RzQmFja2VuZENvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMvY2RzLWJhY2tlbmQtY29ubmVjdG9yJztcbmltcG9ydCB7IFByb2ZpbGVUYWdMaWZlY3ljbGVTZXJ2aWNlIH0gZnJvbSAnLi9wcm9maWxlLXRhZy1saWZlY3ljbGUuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9maWxlVGFnRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi9wcm9maWxldGFnLWV2ZW50LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZVRhZ0luamVjdG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcHJvZmlsZVRhZ0V2ZW50VHJhY2tlcjogUHJvZmlsZVRhZ0V2ZW50U2VydmljZSxcbiAgICBwcml2YXRlIGNkc0JhY2tlbmRDb25uZWN0b3I6IENkc0JhY2tlbmRDb25uZWN0b3IsXG4gICAgcHJpdmF0ZSBwcm9maWxlVGFnTGlmZWN5Y2xlU2VydmljZTogUHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2VcbiAgKSB7fVxuXG4gIHRyYWNrKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnByb2ZpbGVUYWdFdmVudFRyYWNrZXJcbiAgICAgIC5hZGRUcmFja2VyKClcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKF8pID0+XG4gICAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVUYWdFdmVudFRyYWNrZXIuZ2V0UHJvZmlsZVRhZ0V2ZW50cygpLFxuICAgICAgICAgICAgdGhpcy5ub3RpZnlFY09mTG9naW5TdWNjZXNzZnVsKClcbiAgICAgICAgICApLnBpcGUobWFwVG8odHJ1ZSkpXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUVjT2ZMb2dpblN1Y2Nlc3NmdWwoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZVRhZ0xpZmVjeWNsZVNlcnZpY2UubG9naW5TdWNjZXNzZnVsKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoXykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jZHNCYWNrZW5kQ29ubmVjdG9yXG4gICAgICAgICAgLm5vdGlmeVN1Y2Nlc3NmdWxMb2dpbigpXG4gICAgICAgICAgLnBpcGUobWFwVG8odHJ1ZSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=