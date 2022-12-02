/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { combineLatest, of, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsmActions, AsmSelectors } from '../store';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@ngrx/store";
import * as i3 from "@spartacus/asm/root";
/**
 * Responsible for storing ASM state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
export class AsmStatePersistenceService {
    constructor(statePersistenceService, store, authStorageService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.authStorageService = authStorageService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'asm';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.getAsmState(),
            onRead: (state) => this.onRead(state),
        }));
    }
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    getAsmState() {
        return combineLatest([
            this.store.pipe(
            // Since getAsmState() may be called while the module is lazy loded
            // The asm state slice may not exist yet in the first store emissions.
            filter((store) => !!store.asm), select(AsmSelectors.getAsmUi)),
            of(this.authStorageService.getEmulatedUserToken()),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([ui, emulatedUserToken, tokenTarget]) => {
            let emulatedToken = emulatedUserToken;
            if (emulatedToken) {
                emulatedToken = { ...emulatedUserToken };
                // To minimize risk of user account hijacking we don't persist emulated user refresh_token
                delete emulatedToken.refresh_token;
            }
            return {
                ui,
                emulatedUserToken: emulatedToken,
                tokenTarget,
            };
        }));
    }
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    onRead(state) {
        if (state) {
            if (state.ui) {
                this.store.dispatch(new AsmActions.AsmUiUpdate(state.ui));
            }
            if (state.emulatedUserToken) {
                this.authStorageService.setEmulatedUserToken(state.emulatedUserToken);
            }
            if (state.tokenTarget) {
                this.authStorageService.setTokenTarget(state.tokenTarget);
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.Store }, { token: i3.AsmAuthStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.Store }, { type: i3.AsmAuthStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvcmUvc2VydmljZXMvYXNtLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUc1QyxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBZ0IsTUFBTSxVQUFVLENBQUM7Ozs7O0FBV2xFOzs7R0FHRztBQUlILE1BQU0sT0FBTywwQkFBMEI7SUFHckMsWUFDWSx1QkFBZ0QsRUFDaEQsS0FBMEIsRUFDMUIsa0JBQXlDO1FBRnpDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsVUFBSyxHQUFMLEtBQUssQ0FBcUI7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUwzQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFRNUM7O1dBRUc7UUFDTyxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBTG5CLENBQUM7SUFPSjs7T0FFRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMxQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3RDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNPLFdBQVc7UUFDbkIsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQ2IsbUVBQW1FO1lBQ25FLHNFQUFzRTtZQUN0RSxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzlCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQzlCO1lBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUU7U0FDekMsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksYUFBYSxHQUFHLGlCQUFpQixDQUFDO1lBQ3RDLElBQUksYUFBYSxFQUFFO2dCQUNqQixhQUFhLEdBQUcsRUFBRSxHQUFHLGlCQUFpQixFQUFlLENBQUM7Z0JBQ3RELDBGQUEwRjtnQkFDMUYsT0FBTyxhQUFhLENBQUMsYUFBYSxDQUFDO2FBQ3BDO1lBQ0QsT0FBTztnQkFDTCxFQUFFO2dCQUNGLGlCQUFpQixFQUFFLGFBQWE7Z0JBQ2hDLFdBQVc7YUFDWixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxNQUFNLENBQUMsS0FBaUM7UUFDaEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN2RTtZQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt1SEE5RVUsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FGekIsTUFBTTsyRkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlLCBUb2tlblRhcmdldCB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuaW1wb3J0IHsgQXV0aFRva2VuLCBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzbVVpIH0gZnJvbSAnLi4vbW9kZWxzL2FzbS5tb2RlbHMnO1xuaW1wb3J0IHsgQXNtQWN0aW9ucywgQXNtU2VsZWN0b3JzLCBTdGF0ZVdpdGhBc20gfSBmcm9tICcuLi9zdG9yZSc7XG5cbi8qKlxuICogQVNNIHN0YXRlIHN5bmNlZCB0byBicm93c2VyIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3luY2VkQXNtU3RhdGUge1xuICB1aT86IEFzbVVpO1xuICBlbXVsYXRlZFVzZXJUb2tlbj86IEF1dGhUb2tlbjtcbiAgdG9rZW5UYXJnZXQ/OiBUb2tlblRhcmdldDtcbn1cblxuLyoqXG4gKiBSZXNwb25zaWJsZSBmb3Igc3RvcmluZyBBU00gc3RhdGUgaW4gdGhlIGJyb3dzZXIgc3RvcmFnZS5cbiAqIFVzZXMgYFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlYCBtZWNoYW5pc20uXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21TdGF0ZVBlcnNpc3RlbmNlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aEFzbT4sXG4gICAgcHJvdGVjdGVkIGF1dGhTdG9yYWdlU2VydmljZTogQXNtQXV0aFN0b3JhZ2VTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogSWRlbnRpZmllciB1c2VkIGZvciBzdG9yYWdlIGtleS5cbiAgICovXG4gIHByb3RlY3RlZCBrZXkgPSAnYXNtJztcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHN5bmNocm9uaXphdGlvbiBiZXR3ZWVuIHN0YXRlIGFuZCBicm93c2VyIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgaW5pdFN5bmMoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5zdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5zeW5jV2l0aFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgICBzdGF0ZSQ6IHRoaXMuZ2V0QXNtU3RhdGUoKSxcbiAgICAgICAgb25SZWFkOiAoc3RhdGUpID0+IHRoaXMub25SZWFkKHN0YXRlKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuZCB0cmFuc2Zvcm1zIHN0YXRlIGZyb20gZGlmZmVyZW50IHNvdXJjZXMgaW50byB0aGUgZm9ybSB0aGF0IHNob3VsZFxuICAgKiBiZSBzYXZlZCBpbiBzdG9yYWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFzbVN0YXRlKCk6IE9ic2VydmFibGU8U3luY2VkQXNtU3RhdGU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICAgIC8vIFNpbmNlIGdldEFzbVN0YXRlKCkgbWF5IGJlIGNhbGxlZCB3aGlsZSB0aGUgbW9kdWxlIGlzIGxhenkgbG9kZWRcbiAgICAgICAgLy8gVGhlIGFzbSBzdGF0ZSBzbGljZSBtYXkgbm90IGV4aXN0IHlldCBpbiB0aGUgZmlyc3Qgc3RvcmUgZW1pc3Npb25zLlxuICAgICAgICBmaWx0ZXIoKHN0b3JlKSA9PiAhIXN0b3JlLmFzbSksXG4gICAgICAgIHNlbGVjdChBc21TZWxlY3RvcnMuZ2V0QXNtVWkpXG4gICAgICApLFxuICAgICAgb2YodGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuZ2V0RW11bGF0ZWRVc2VyVG9rZW4oKSksXG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRUb2tlblRhcmdldCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFt1aSwgZW11bGF0ZWRVc2VyVG9rZW4sIHRva2VuVGFyZ2V0XSkgPT4ge1xuICAgICAgICBsZXQgZW11bGF0ZWRUb2tlbiA9IGVtdWxhdGVkVXNlclRva2VuO1xuICAgICAgICBpZiAoZW11bGF0ZWRUb2tlbikge1xuICAgICAgICAgIGVtdWxhdGVkVG9rZW4gPSB7IC4uLmVtdWxhdGVkVXNlclRva2VuIH0gYXMgQXV0aFRva2VuO1xuICAgICAgICAgIC8vIFRvIG1pbmltaXplIHJpc2sgb2YgdXNlciBhY2NvdW50IGhpamFja2luZyB3ZSBkb24ndCBwZXJzaXN0IGVtdWxhdGVkIHVzZXIgcmVmcmVzaF90b2tlblxuICAgICAgICAgIGRlbGV0ZSBlbXVsYXRlZFRva2VuLnJlZnJlc2hfdG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1aSxcbiAgICAgICAgICBlbXVsYXRlZFVzZXJUb2tlbjogZW11bGF0ZWRUb2tlbixcbiAgICAgICAgICB0b2tlblRhcmdldCxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgb24gZWFjaCBicm93c2VyIHN0b3JhZ2UgcmVhZC5cbiAgICogVXNlZCB0byB1cGRhdGUgc3RhdGUgZnJvbSBicm93c2VyIC0+IHN0YXRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIG9uUmVhZChzdGF0ZTogU3luY2VkQXNtU3RhdGUgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIGlmIChzdGF0ZS51aSkge1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBc21BY3Rpb25zLkFzbVVpVXBkYXRlKHN0YXRlLnVpKSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUuZW11bGF0ZWRVc2VyVG9rZW4pIHtcbiAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0RW11bGF0ZWRVc2VyVG9rZW4oc3RhdGUuZW11bGF0ZWRVc2VyVG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLnRva2VuVGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLnNldFRva2VuVGFyZ2V0KHN0YXRlLnRva2VuVGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=