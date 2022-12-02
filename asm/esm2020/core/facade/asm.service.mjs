/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { AsmActions } from '../store/actions/index';
import { AsmSelectors } from '../store/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
export class AsmService {
    constructor(store) {
        this.store = store;
    }
    /**
     * Search for customers
     * @param options
     */
    customerSearch(options) {
        this.store.dispatch(new AsmActions.CustomerSearch(options));
    }
    /**
     * Reset the customer search result data to the initial state.
     */
    customerSearchReset() {
        this.store.dispatch(new AsmActions.CustomerSearchReset());
    }
    /**
     * Returns the customer search result data.
     */
    getCustomerSearchResults() {
        return this.store.pipe(select(AsmSelectors.getCustomerSearchResults));
    }
    /**
     * Returns the customer search result loading status.
     */
    getCustomerSearchResultsLoading() {
        return this.store.pipe(select(AsmSelectors.getCustomerSearchResultsLoading));
    }
    /**
     * Updates the state of the ASM UI
     */
    updateAsmUiState(asmUi) {
        this.store.dispatch(new AsmActions.AsmUiUpdate(asmUi));
    }
    /**
     * Get the state of the ASM UI
     */
    getAsmUiState() {
        return this.store.pipe(select(AsmSelectors.getAsmUi));
    }
}
AsmService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmService, deps: [{ token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AsmService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvcmUvZmFjYWRlL2FzbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQVMsTUFBTSxhQUFhLENBQUM7QUFPNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSzlDLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQXNCLEtBQTBCO1FBQTFCLFVBQUssR0FBTCxLQUFLLENBQXFCO0lBQUcsQ0FBQztJQUVwRDs7O09BR0c7SUFDSCxjQUFjLENBQUMsT0FBOEI7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3QkFBd0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQkFBK0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxDQUNyRCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCLENBQUMsS0FBWTtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7dUdBOUNVLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQXNtVWksXG4gIEN1c3RvbWVyU2VhcmNoT3B0aW9ucyxcbiAgQ3VzdG9tZXJTZWFyY2hQYWdlLFxufSBmcm9tICcuLi9tb2RlbHMvYXNtLm1vZGVscyc7XG5pbXBvcnQgeyBBc21BY3Rpb25zIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhBc20gfSBmcm9tICcuLi9zdG9yZS9hc20tc3RhdGUnO1xuaW1wb3J0IHsgQXNtU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoQXNtPikge31cblxuICAvKipcbiAgICogU2VhcmNoIGZvciBjdXN0b21lcnNcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGN1c3RvbWVyU2VhcmNoKG9wdGlvbnM6IEN1c3RvbWVyU2VhcmNoT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFzbUFjdGlvbnMuQ3VzdG9tZXJTZWFyY2gob3B0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBjdXN0b21lciBzZWFyY2ggcmVzdWx0IGRhdGEgdG8gdGhlIGluaXRpYWwgc3RhdGUuXG4gICAqL1xuICBjdXN0b21lclNlYXJjaFJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFzbUFjdGlvbnMuQ3VzdG9tZXJTZWFyY2hSZXNldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXN0b21lciBzZWFyY2ggcmVzdWx0IGRhdGEuXG4gICAqL1xuICBnZXRDdXN0b21lclNlYXJjaFJlc3VsdHMoKTogT2JzZXJ2YWJsZTxDdXN0b21lclNlYXJjaFBhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChBc21TZWxlY3RvcnMuZ2V0Q3VzdG9tZXJTZWFyY2hSZXN1bHRzKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VzdG9tZXIgc2VhcmNoIHJlc3VsdCBsb2FkaW5nIHN0YXR1cy5cbiAgICovXG4gIGdldEN1c3RvbWVyU2VhcmNoUmVzdWx0c0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChBc21TZWxlY3RvcnMuZ2V0Q3VzdG9tZXJTZWFyY2hSZXN1bHRzTG9hZGluZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHN0YXRlIG9mIHRoZSBBU00gVUlcbiAgICovXG4gIHVwZGF0ZUFzbVVpU3RhdGUoYXNtVWk6IEFzbVVpKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXNtQWN0aW9ucy5Bc21VaVVwZGF0ZShhc21VaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3RhdGUgb2YgdGhlIEFTTSBVSVxuICAgKi9cbiAgZ2V0QXNtVWlTdGF0ZSgpOiBPYnNlcnZhYmxlPEFzbVVpPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShzZWxlY3QoQXNtU2VsZWN0b3JzLmdldEFzbVVpKSk7XG4gIH1cbn1cbiJdfQ==