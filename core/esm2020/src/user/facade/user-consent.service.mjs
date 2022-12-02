/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { iif } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { getProcessErrorFactory, getProcessLoadingFactory, getProcessSuccessFactory, } from '../../process/store/selectors/process.selectors';
import { isNotUndefined } from '../../util/type-guards';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { GIVE_CONSENT_PROCESS_ID, WITHDRAW_CONSENT_PROCESS_ID, } from '../store/user-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../auth/user-auth/facade/auth.service";
import * as i3 from "../../auth/user-auth/facade/user-id.service";
export class UserConsentService {
    constructor(store, authService, userIdService) {
        this.store = store;
        this.authService = authService;
        this.userIdService = userIdService;
    }
    /**
     * Retrieves all consents.
     */
    loadConsents() {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.LoadUserConsents(userId));
        });
    }
    /**
     * Returns all consent templates. If `loadIfMissing` parameter is set to `true`, the method triggers the load if consent templates.
     * @param loadIfMissing is set to `true`, the method will load templates if those are not already present. The default value is `false`.
     */
    getConsents(loadIfMissing = false) {
        return iif(() => loadIfMissing, this.store.pipe(select(UsersSelectors.getConsentsValue), withLatestFrom(this.getConsentsResultLoading(), this.getConsentsResultSuccess()), filter(([_templates, loading, _success]) => !loading), tap(([templates, _loading, success]) => {
            if (!templates || templates.length === 0) {
                // avoid infinite loop - if we've already attempted to load templates and we got an empty array as the response
                if (!success) {
                    this.loadConsents();
                }
            }
        }), filter(([templates, _loading]) => Boolean(templates)), map(([templates, _loading]) => templates)), this.store.pipe(select(UsersSelectors.getConsentsValue)));
    }
    /**
     * Returns the consents loading flag
     */
    getConsentsResultLoading() {
        return this.store.pipe(select(UsersSelectors.getConsentsLoading));
    }
    /**
     * Returns the consents success flag
     */
    getConsentsResultSuccess() {
        return this.store.pipe(select(UsersSelectors.getConsentsSuccess));
    }
    /**
     * Returns the consents error flag
     */
    getConsentsResultError() {
        return this.store.pipe(select(UsersSelectors.getConsentsError));
    }
    /**
     * Resets the processing state for consent retrieval
     */
    resetConsentsProcessState() {
        this.store.dispatch(new UserActions.ResetLoadUserConsents());
    }
    /**
     * Returns the registered consent for the given template ID.
     *
     * As a side-effect, the method will call `getConsents(true)` to load the templates if those are not present.
     *
     * @param templateId a template ID by which to filter the registered templates.
     */
    getConsent(templateId) {
        return this.authService.isUserLoggedIn().pipe(filter(Boolean), switchMap(() => this.getConsents(true)), switchMap(() => this.store.pipe(select(UsersSelectors.getConsentByTemplateId(templateId)))), filter(isNotUndefined), map((template) => template.currentConsent));
    }
    /**
     * Returns `true` if the consent is truthy and if `consentWithdrawnDate` doesn't exist.
     * Otherwise, `false` is returned.
     *
     * @param consent to check
     */
    isConsentGiven(consent) {
        return (Boolean(consent) &&
            Boolean(consent.consentGivenDate) &&
            !Boolean(consent.consentWithdrawnDate));
    }
    /**
     * Returns `true` if the consent is either falsy or if `consentWithdrawnDate` is present.
     * Otherwise, `false` is returned.
     *
     * @param consent to check
     */
    isConsentWithdrawn(consent) {
        if (Boolean(consent)) {
            return Boolean(consent?.consentWithdrawnDate);
        }
        return true;
    }
    /**
     * Give consent for specified consent template ID and version.
     * @param consentTemplateId a template ID for which to give a consent
     * @param consentTemplateVersion a template version for which to give a consent
     */
    giveConsent(consentTemplateId, consentTemplateVersion) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.GiveUserConsent({
                userId,
                consentTemplateId,
                consentTemplateVersion,
            }));
        });
    }
    /**
     * Returns the give consent process loading flag
     */
    getGiveConsentResultLoading() {
        return this.store.pipe(select(getProcessLoadingFactory(GIVE_CONSENT_PROCESS_ID)));
    }
    /**
     * Returns the give consent process success flag
     */
    getGiveConsentResultSuccess() {
        return this.store.pipe(select(getProcessSuccessFactory(GIVE_CONSENT_PROCESS_ID)));
    }
    /**
     * Returns the give consent process error flag
     */
    getGiveConsentResultError() {
        return this.store.pipe(select(getProcessErrorFactory(GIVE_CONSENT_PROCESS_ID)));
    }
    /**
     * Resents the give consent process flags
     */
    resetGiveConsentProcessState() {
        return this.store.dispatch(new UserActions.ResetGiveUserConsentProcess());
    }
    /**
     * Withdraw consent for the given `consentCode`
     * @param consentCode for which to withdraw the consent
     */
    withdrawConsent(consentCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new UserActions.WithdrawUserConsent({
                userId,
                consentCode,
            }));
        });
    }
    /**
     * Returns the withdraw consent process loading flag
     */
    getWithdrawConsentResultLoading() {
        return this.store.pipe(select(getProcessLoadingFactory(WITHDRAW_CONSENT_PROCESS_ID)));
    }
    /**
     * Returns the withdraw consent process success flag
     */
    getWithdrawConsentResultSuccess() {
        return this.store.pipe(select(getProcessSuccessFactory(WITHDRAW_CONSENT_PROCESS_ID)));
    }
    /**
     * Returns the withdraw consent process error flag
     */
    getWithdrawConsentResultError() {
        return this.store.pipe(select(getProcessErrorFactory(WITHDRAW_CONSENT_PROCESS_ID)));
    }
    /**
     * Resets the process flags for withdraw consent
     */
    resetWithdrawConsentProcessState() {
        return this.store.dispatch(new UserActions.ResetWithdrawUserConsentProcess());
    }
    /**
     * Filters the provided `templateList`' templates by hiding the template IDs specified in `hideTemplateIds`.
     * If the `hideTemplateIds` is empty, the provided `templateList` is returned.
     *
     * @param templateList a list of consent templates to filter
     * @param hideTemplateIds template IDs to hide
     */
    filterConsentTemplates(templateList, hideTemplateIds = []) {
        if (hideTemplateIds.length === 0) {
            return templateList;
        }
        const updatedTemplateList = [];
        for (const template of templateList) {
            const show = template.id && !hideTemplateIds.includes(template.id);
            if (show) {
                updatedTemplateList.push(template);
            }
        }
        return updatedTemplateList;
    }
}
UserConsentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserConsentService, deps: [{ token: i1.Store }, { token: i2.AuthService }, { token: i3.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
UserConsentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserConsentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserConsentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.AuthService }, { type: i3.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb25zZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91c2VyL2ZhY2FkZS91c2VyLWNvbnNlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUs3RSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHdCQUF3QixFQUN4Qix3QkFBd0IsR0FDekIsTUFBTSxpREFBaUQsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLDJCQUEyQixHQUM1QixNQUFNLHFCQUFxQixDQUFDOzs7OztBQUs3QixNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQ1ksS0FBb0QsRUFDcEQsV0FBd0IsRUFDeEIsYUFBNEI7UUFGNUIsVUFBSyxHQUFMLEtBQUssQ0FBK0M7UUFDcEQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDckMsQ0FBQztJQUVKOztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7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O09BTUc7SUFDSCxzQkFBc0IsQ0FDcEIsWUFBK0IsRUFDL0Isa0JBQTRCLEVBQUU7UUFFOUIsSUFBSSxlQUFlLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLFlBQVksQ0FBQztTQUNyQjtRQUVELE1BQU0sbUJBQW1CLEdBQXNCLEVBQUUsQ0FBQztRQUNsRCxLQUFLLE1BQU0sUUFBUSxJQUFJLFlBQVksRUFBRTtZQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkUsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7UUFFRCxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7OytHQS9QVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgaWlmLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hdXRoL3VzZXItYXV0aC9mYWNhZGUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJJZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9hdXRoL3VzZXItYXV0aC9mYWNhZGUvdXNlci1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnNlbnQsIENvbnNlbnRUZW1wbGF0ZSB9IGZyb20gJy4uLy4uL21vZGVsL2NvbnNlbnQubW9kZWwnO1xuaW1wb3J0IHsgU3RhdGVXaXRoUHJvY2VzcyB9IGZyb20gJy4uLy4uL3Byb2Nlc3Mvc3RvcmUvcHJvY2Vzcy1zdGF0ZSc7XG5pbXBvcnQge1xuICBnZXRQcm9jZXNzRXJyb3JGYWN0b3J5LFxuICBnZXRQcm9jZXNzTG9hZGluZ0ZhY3RvcnksXG4gIGdldFByb2Nlc3NTdWNjZXNzRmFjdG9yeSxcbn0gZnJvbSAnLi4vLi4vcHJvY2Vzcy9zdG9yZS9zZWxlY3RvcnMvcHJvY2Vzcy5zZWxlY3RvcnMnO1xuaW1wb3J0IHsgaXNOb3RVbmRlZmluZWQgfSBmcm9tICcuLi8uLi91dGlsL3R5cGUtZ3VhcmRzJztcbmltcG9ydCB7IFVzZXJBY3Rpb25zIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBVc2Vyc1NlbGVjdG9ycyB9IGZyb20gJy4uL3N0b3JlL3NlbGVjdG9ycy9pbmRleCc7XG5pbXBvcnQge1xuICBHSVZFX0NPTlNFTlRfUFJPQ0VTU19JRCxcbiAgU3RhdGVXaXRoVXNlcixcbiAgV0lUSERSQVdfQ09OU0VOVF9QUk9DRVNTX0lELFxufSBmcm9tICcuLi9zdG9yZS91c2VyLXN0YXRlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJDb25zZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoVXNlciB8IFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+LFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIGNvbnNlbnRzLlxuICAgKi9cbiAgbG9hZENvbnNlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCkuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVzZXJBY3Rpb25zLkxvYWRVc2VyQ29uc2VudHModXNlcklkKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgY29uc2VudCB0ZW1wbGF0ZXMuIElmIGBsb2FkSWZNaXNzaW5nYCBwYXJhbWV0ZXIgaXMgc2V0IHRvIGB0cnVlYCwgdGhlIG1ldGhvZCB0cmlnZ2VycyB0aGUgbG9hZCBpZiBjb25zZW50IHRlbXBsYXRlcy5cbiAgICogQHBhcmFtIGxvYWRJZk1pc3NpbmcgaXMgc2V0IHRvIGB0cnVlYCwgdGhlIG1ldGhvZCB3aWxsIGxvYWQgdGVtcGxhdGVzIGlmIHRob3NlIGFyZSBub3QgYWxyZWFkeSBwcmVzZW50LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgZmFsc2VgLlxuICAgKi9cbiAgZ2V0Q29uc2VudHMobG9hZElmTWlzc2luZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxDb25zZW50VGVtcGxhdGVbXT4ge1xuICAgIHJldHVybiBpaWYoXG4gICAgICAoKSA9PiBsb2FkSWZNaXNzaW5nLFxuICAgICAgKDxTdG9yZTxTdGF0ZVdpdGhVc2VyPj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgICBzZWxlY3QoVXNlcnNTZWxlY3RvcnMuZ2V0Q29uc2VudHNWYWx1ZSksXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICAgIHRoaXMuZ2V0Q29uc2VudHNSZXN1bHRMb2FkaW5nKCksXG4gICAgICAgICAgdGhpcy5nZXRDb25zZW50c1Jlc3VsdFN1Y2Nlc3MoKVxuICAgICAgICApLFxuICAgICAgICBmaWx0ZXIoKFtfdGVtcGxhdGVzLCBsb2FkaW5nLCBfc3VjY2Vzc10pID0+ICFsb2FkaW5nKSxcbiAgICAgICAgdGFwKChbdGVtcGxhdGVzLCBfbG9hZGluZywgc3VjY2Vzc10pID0+IHtcbiAgICAgICAgICBpZiAoIXRlbXBsYXRlcyB8fCB0ZW1wbGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBhdm9pZCBpbmZpbml0ZSBsb29wIC0gaWYgd2UndmUgYWxyZWFkeSBhdHRlbXB0ZWQgdG8gbG9hZCB0ZW1wbGF0ZXMgYW5kIHdlIGdvdCBhbiBlbXB0eSBhcnJheSBhcyB0aGUgcmVzcG9uc2VcbiAgICAgICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgICB0aGlzLmxvYWRDb25zZW50cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcigoW3RlbXBsYXRlcywgX2xvYWRpbmddKSA9PiBCb29sZWFuKHRlbXBsYXRlcykpLFxuICAgICAgICBtYXAoKFt0ZW1wbGF0ZXMsIF9sb2FkaW5nXSkgPT4gdGVtcGxhdGVzKVxuICAgICAgKSxcbiAgICAgICg8U3RvcmU8U3RhdGVXaXRoVXNlcj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgICAgc2VsZWN0KFVzZXJzU2VsZWN0b3JzLmdldENvbnNlbnRzVmFsdWUpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb25zZW50cyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldENvbnNlbnRzUmVzdWx0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhVc2VyPj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFVzZXJzU2VsZWN0b3JzLmdldENvbnNlbnRzTG9hZGluZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbnNlbnRzIHN1Y2Nlc3MgZmxhZ1xuICAgKi9cbiAgZ2V0Q29uc2VudHNSZXN1bHRTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAoPFN0b3JlPFN0YXRlV2l0aFVzZXI+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICBzZWxlY3QoVXNlcnNTZWxlY3RvcnMuZ2V0Q29uc2VudHNTdWNjZXNzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29uc2VudHMgZXJyb3IgZmxhZ1xuICAgKi9cbiAgZ2V0Q29uc2VudHNSZXN1bHRFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhVc2VyPj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KFVzZXJzU2VsZWN0b3JzLmdldENvbnNlbnRzRXJyb3IpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHByb2Nlc3Npbmcgc3RhdGUgZm9yIGNvbnNlbnQgcmV0cmlldmFsXG4gICAqL1xuICByZXNldENvbnNlbnRzUHJvY2Vzc1N0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVzZXJBY3Rpb25zLlJlc2V0TG9hZFVzZXJDb25zZW50cygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIGNvbnNlbnQgZm9yIHRoZSBnaXZlbiB0ZW1wbGF0ZSBJRC5cbiAgICpcbiAgICogQXMgYSBzaWRlLWVmZmVjdCwgdGhlIG1ldGhvZCB3aWxsIGNhbGwgYGdldENvbnNlbnRzKHRydWUpYCB0byBsb2FkIHRoZSB0ZW1wbGF0ZXMgaWYgdGhvc2UgYXJlIG5vdCBwcmVzZW50LlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGVJZCBhIHRlbXBsYXRlIElEIGJ5IHdoaWNoIHRvIGZpbHRlciB0aGUgcmVnaXN0ZXJlZCB0ZW1wbGF0ZXMuXG4gICAqL1xuICBnZXRDb25zZW50KHRlbXBsYXRlSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q29uc2VudCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmlzVXNlckxvZ2dlZEluKCkucGlwZShcbiAgICAgIGZpbHRlcihCb29sZWFuKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmdldENvbnNlbnRzKHRydWUpKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAoPFN0b3JlPFN0YXRlV2l0aFVzZXI+PnRoaXMuc3RvcmUpLnBpcGUoXG4gICAgICAgICAgc2VsZWN0KFVzZXJzU2VsZWN0b3JzLmdldENvbnNlbnRCeVRlbXBsYXRlSWQodGVtcGxhdGVJZCkpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgbWFwKCh0ZW1wbGF0ZSkgPT4gdGVtcGxhdGUuY3VycmVudENvbnNlbnQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgY29uc2VudCBpcyB0cnV0aHkgYW5kIGlmIGBjb25zZW50V2l0aGRyYXduRGF0ZWAgZG9lc24ndCBleGlzdC5cbiAgICogT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICAgKlxuICAgKiBAcGFyYW0gY29uc2VudCB0byBjaGVja1xuICAgKi9cbiAgaXNDb25zZW50R2l2ZW4oY29uc2VudDogQ29uc2VudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBCb29sZWFuKGNvbnNlbnQpICYmXG4gICAgICBCb29sZWFuKGNvbnNlbnQuY29uc2VudEdpdmVuRGF0ZSkgJiZcbiAgICAgICFCb29sZWFuKGNvbnNlbnQuY29uc2VudFdpdGhkcmF3bkRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgY29uc2VudCBpcyBlaXRoZXIgZmFsc3kgb3IgaWYgYGNvbnNlbnRXaXRoZHJhd25EYXRlYCBpcyBwcmVzZW50LlxuICAgKiBPdGhlcndpc2UsIGBmYWxzZWAgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwYXJhbSBjb25zZW50IHRvIGNoZWNrXG4gICAqL1xuICBpc0NvbnNlbnRXaXRoZHJhd24oY29uc2VudDogQ29uc2VudCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIGlmIChCb29sZWFuKGNvbnNlbnQpKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbihjb25zZW50Py5jb25zZW50V2l0aGRyYXduRGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmUgY29uc2VudCBmb3Igc3BlY2lmaWVkIGNvbnNlbnQgdGVtcGxhdGUgSUQgYW5kIHZlcnNpb24uXG4gICAqIEBwYXJhbSBjb25zZW50VGVtcGxhdGVJZCBhIHRlbXBsYXRlIElEIGZvciB3aGljaCB0byBnaXZlIGEgY29uc2VudFxuICAgKiBAcGFyYW0gY29uc2VudFRlbXBsYXRlVmVyc2lvbiBhIHRlbXBsYXRlIHZlcnNpb24gZm9yIHdoaWNoIHRvIGdpdmUgYSBjb25zZW50XG4gICAqL1xuICBnaXZlQ29uc2VudChjb25zZW50VGVtcGxhdGVJZDogc3RyaW5nLCBjb25zZW50VGVtcGxhdGVWZXJzaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLnN1YnNjcmliZSgodXNlcklkKSA9PiB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICBuZXcgVXNlckFjdGlvbnMuR2l2ZVVzZXJDb25zZW50KHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY29uc2VudFRlbXBsYXRlSWQsXG4gICAgICAgICAgY29uc2VudFRlbXBsYXRlVmVyc2lvbixcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2l2ZSBjb25zZW50IHByb2Nlc3MgbG9hZGluZyBmbGFnXG4gICAqL1xuICBnZXRHaXZlQ29uc2VudFJlc3VsdExvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChnZXRQcm9jZXNzTG9hZGluZ0ZhY3RvcnkoR0lWRV9DT05TRU5UX1BST0NFU1NfSUQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2l2ZSBjb25zZW50IHByb2Nlc3Mgc3VjY2VzcyBmbGFnXG4gICAqL1xuICBnZXRHaXZlQ29uc2VudFJlc3VsdFN1Y2Nlc3MoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChnZXRQcm9jZXNzU3VjY2Vzc0ZhY3RvcnkoR0lWRV9DT05TRU5UX1BST0NFU1NfSUQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2l2ZSBjb25zZW50IHByb2Nlc3MgZXJyb3IgZmxhZ1xuICAgKi9cbiAgZ2V0R2l2ZUNvbnNlbnRSZXN1bHRFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KGdldFByb2Nlc3NFcnJvckZhY3RvcnkoR0lWRV9DT05TRU5UX1BST0NFU1NfSUQpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZW50cyB0aGUgZ2l2ZSBjb25zZW50IHByb2Nlc3MgZmxhZ3NcbiAgICovXG4gIHJlc2V0R2l2ZUNvbnNlbnRQcm9jZXNzU3RhdGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVzZXJBY3Rpb25zLlJlc2V0R2l2ZVVzZXJDb25zZW50UHJvY2VzcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaXRoZHJhdyBjb25zZW50IGZvciB0aGUgZ2l2ZW4gYGNvbnNlbnRDb2RlYFxuICAgKiBAcGFyYW0gY29uc2VudENvZGUgZm9yIHdoaWNoIHRvIHdpdGhkcmF3IHRoZSBjb25zZW50XG4gICAqL1xuICB3aXRoZHJhd0NvbnNlbnQoY29uc2VudENvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCkuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIG5ldyBVc2VyQWN0aW9ucy5XaXRoZHJhd1VzZXJDb25zZW50KHtcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY29uc2VudENvZGUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpdGhkcmF3IGNvbnNlbnQgcHJvY2VzcyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldFdpdGhkcmF3Q29uc2VudFJlc3VsdExvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChnZXRQcm9jZXNzTG9hZGluZ0ZhY3RvcnkoV0lUSERSQVdfQ09OU0VOVF9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpdGhkcmF3IGNvbnNlbnQgcHJvY2VzcyBzdWNjZXNzIGZsYWdcbiAgICovXG4gIGdldFdpdGhkcmF3Q29uc2VudFJlc3VsdFN1Y2Nlc3MoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICg8U3RvcmU8U3RhdGVXaXRoUHJvY2Vzczx2b2lkPj4+dGhpcy5zdG9yZSkucGlwZShcbiAgICAgIHNlbGVjdChnZXRQcm9jZXNzU3VjY2Vzc0ZhY3RvcnkoV0lUSERSQVdfQ09OU0VOVF9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpdGhkcmF3IGNvbnNlbnQgcHJvY2VzcyBlcnJvciBmbGFnXG4gICAqL1xuICBnZXRXaXRoZHJhd0NvbnNlbnRSZXN1bHRFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKDxTdG9yZTxTdGF0ZVdpdGhQcm9jZXNzPHZvaWQ+Pj50aGlzLnN0b3JlKS5waXBlKFxuICAgICAgc2VsZWN0KGdldFByb2Nlc3NFcnJvckZhY3RvcnkoV0lUSERSQVdfQ09OU0VOVF9QUk9DRVNTX0lEKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgcHJvY2VzcyBmbGFncyBmb3Igd2l0aGRyYXcgY29uc2VudFxuICAgKi9cbiAgcmVzZXRXaXRoZHJhd0NvbnNlbnRQcm9jZXNzU3RhdGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgVXNlckFjdGlvbnMuUmVzZXRXaXRoZHJhd1VzZXJDb25zZW50UHJvY2VzcygpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIHRoZSBwcm92aWRlZCBgdGVtcGxhdGVMaXN0YCcgdGVtcGxhdGVzIGJ5IGhpZGluZyB0aGUgdGVtcGxhdGUgSURzIHNwZWNpZmllZCBpbiBgaGlkZVRlbXBsYXRlSWRzYC5cbiAgICogSWYgdGhlIGBoaWRlVGVtcGxhdGVJZHNgIGlzIGVtcHR5LCB0aGUgcHJvdmlkZWQgYHRlbXBsYXRlTGlzdGAgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZUxpc3QgYSBsaXN0IG9mIGNvbnNlbnQgdGVtcGxhdGVzIHRvIGZpbHRlclxuICAgKiBAcGFyYW0gaGlkZVRlbXBsYXRlSWRzIHRlbXBsYXRlIElEcyB0byBoaWRlXG4gICAqL1xuICBmaWx0ZXJDb25zZW50VGVtcGxhdGVzKFxuICAgIHRlbXBsYXRlTGlzdDogQ29uc2VudFRlbXBsYXRlW10sXG4gICAgaGlkZVRlbXBsYXRlSWRzOiBzdHJpbmdbXSA9IFtdXG4gICk6IENvbnNlbnRUZW1wbGF0ZVtdIHtcbiAgICBpZiAoaGlkZVRlbXBsYXRlSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlTGlzdDtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVkVGVtcGxhdGVMaXN0OiBDb25zZW50VGVtcGxhdGVbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgdGVtcGxhdGUgb2YgdGVtcGxhdGVMaXN0KSB7XG4gICAgICBjb25zdCBzaG93ID0gdGVtcGxhdGUuaWQgJiYgIWhpZGVUZW1wbGF0ZUlkcy5pbmNsdWRlcyh0ZW1wbGF0ZS5pZCk7XG4gICAgICBpZiAoc2hvdykge1xuICAgICAgICB1cGRhdGVkVGVtcGxhdGVMaXN0LnB1c2godGVtcGxhdGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1cGRhdGVkVGVtcGxhdGVMaXN0O1xuICB9XG59XG4iXX0=