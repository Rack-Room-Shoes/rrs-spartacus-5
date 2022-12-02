/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ASM_ENABLED_LOCAL_STORAGE_KEY, } from '@spartacus/asm/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/asm/root";
export class AsmComponentService {
    constructor(authService, csAgentAuthService, winRef) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.winRef = winRef;
    }
    logoutCustomerSupportAgentAndCustomer() {
        this.csAgentAuthService.logoutCustomerSupportAgent();
    }
    logoutCustomer() {
        this.authService.logout();
    }
    isCustomerEmulationSessionInProgress() {
        return this.csAgentAuthService.isCustomerEmulated();
    }
    /**
     * We're currently only removing the persisted storage in the browser
     * to ensure the ASM experience isn't loaded on the next visit. There are a few
     * optimizations we could think of:
     * - drop the `asm` parameter from the URL, in case it's still there
     * - remove the generated UI from the DOM (outlets currently do not support this)
     */
    unload() {
        if (this.winRef.localStorage) {
            this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
        }
    }
}
AsmComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentService, deps: [{ token: i1.AuthService }, { token: i2.CsAgentAuthService }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
AsmComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.CsAgentAuthService }, { type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb21wb25lbnRzL3NlcnZpY2VzL2FzbS1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsNkJBQTZCLEdBRTlCLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFPN0IsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNZLFdBQXdCLEVBQ3hCLGtCQUFzQyxFQUN0QyxNQUFpQjtRQUZqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDMUIsQ0FBQztJQUVKLHFDQUFxQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG9DQUFvQztRQUNsQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7O2dIQTlCVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBU01fRU5BQkxFRF9MT0NBTF9TVE9SQUdFX0tFWSxcbiAgQ3NBZ2VudEF1dGhTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQ29tcG9uZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNzQWdlbnRBdXRoU2VydmljZTogQ3NBZ2VudEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZlxuICApIHt9XG5cbiAgbG9nb3V0Q3VzdG9tZXJTdXBwb3J0QWdlbnRBbmRDdXN0b21lcigpOiB2b2lkIHtcbiAgICB0aGlzLmNzQWdlbnRBdXRoU2VydmljZS5sb2dvdXRDdXN0b21lclN1cHBvcnRBZ2VudCgpO1xuICB9XG5cbiAgbG9nb3V0Q3VzdG9tZXIoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcbiAgfVxuXG4gIGlzQ3VzdG9tZXJFbXVsYXRpb25TZXNzaW9uSW5Qcm9ncmVzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5jc0FnZW50QXV0aFNlcnZpY2UuaXNDdXN0b21lckVtdWxhdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogV2UncmUgY3VycmVudGx5IG9ubHkgcmVtb3ZpbmcgdGhlIHBlcnNpc3RlZCBzdG9yYWdlIGluIHRoZSBicm93c2VyXG4gICAqIHRvIGVuc3VyZSB0aGUgQVNNIGV4cGVyaWVuY2UgaXNuJ3QgbG9hZGVkIG9uIHRoZSBuZXh0IHZpc2l0LiBUaGVyZSBhcmUgYSBmZXdcbiAgICogb3B0aW1pemF0aW9ucyB3ZSBjb3VsZCB0aGluayBvZjpcbiAgICogLSBkcm9wIHRoZSBgYXNtYCBwYXJhbWV0ZXIgZnJvbSB0aGUgVVJMLCBpbiBjYXNlIGl0J3Mgc3RpbGwgdGhlcmVcbiAgICogLSByZW1vdmUgdGhlIGdlbmVyYXRlZCBVSSBmcm9tIHRoZSBET00gKG91dGxldHMgY3VycmVudGx5IGRvIG5vdCBzdXBwb3J0IHRoaXMpXG4gICAqL1xuICB1bmxvYWQoKSB7XG4gICAgaWYgKHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZSkge1xuICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oQVNNX0VOQUJMRURfTE9DQUxfU1RPUkFHRV9LRVkpO1xuICAgIH1cbiAgfVxufVxuIl19