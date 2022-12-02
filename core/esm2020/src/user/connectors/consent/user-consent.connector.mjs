/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./user-consent.adapter";
export class UserConsentConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    loadConsents(userId) {
        return this.adapter.loadConsents(userId);
    }
    giveConsent(userId, consentTemplateId, consentTemplateVersion) {
        return this.adapter.giveConsent(userId, consentTemplateId, consentTemplateVersion);
    }
    withdrawConsent(userId, consentCode) {
        return this.adapter.withdrawConsent(userId, consentCode);
    }
}
UserConsentConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserConsentConnector, deps: [{ token: i1.UserConsentAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UserConsentConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserConsentConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserConsentConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserConsentAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb25zZW50LmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3VzZXIvY29ubmVjdG9ycy9jb25zZW50L3VzZXItY29uc2VudC5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVEzQyxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQXNCLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQUcsQ0FBQztJQUVyRCxZQUFZLENBQUMsTUFBYztRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxXQUFXLENBQ1QsTUFBYyxFQUNkLGlCQUF5QixFQUN6QixzQkFBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FDN0IsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixzQkFBc0IsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQ2pELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7O2lIQXJCVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VyQ29uc2VudEFkYXB0ZXIgfSBmcm9tICcuL3VzZXItY29uc2VudC5hZGFwdGVyJztcbmltcG9ydCB7IENvbnNlbnRUZW1wbGF0ZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2NvbnNlbnQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckNvbnNlbnRDb25uZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWRhcHRlcjogVXNlckNvbnNlbnRBZGFwdGVyKSB7fVxuXG4gIGxvYWRDb25zZW50cyh1c2VySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29uc2VudFRlbXBsYXRlW10+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWRDb25zZW50cyh1c2VySWQpO1xuICB9XG5cbiAgZ2l2ZUNvbnNlbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY29uc2VudFRlbXBsYXRlSWQ6IHN0cmluZyxcbiAgICBjb25zZW50VGVtcGxhdGVWZXJzaW9uOiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxDb25zZW50VGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdpdmVDb25zZW50KFxuICAgICAgdXNlcklkLFxuICAgICAgY29uc2VudFRlbXBsYXRlSWQsXG4gICAgICBjb25zZW50VGVtcGxhdGVWZXJzaW9uXG4gICAgKTtcbiAgfVxuXG4gIHdpdGhkcmF3Q29uc2VudCh1c2VySWQ6IHN0cmluZywgY29uc2VudENvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8e30+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLndpdGhkcmF3Q29uc2VudCh1c2VySWQsIGNvbnNlbnRDb2RlKTtcbiAgfVxufVxuIl19