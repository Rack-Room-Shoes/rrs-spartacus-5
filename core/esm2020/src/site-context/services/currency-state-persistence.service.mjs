/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../../state/services/state-persistence.service";
import * as i2 from "../facade/currency.service";
import * as i3 from "../config/site-context-config";
export class CurrencyStatePersistenceService {
    constructor(statePersistenceService, currencyService, config) {
        this.statePersistenceService = statePersistenceService;
        this.currencyService = currencyService;
        this.config = config;
        this.initialized$ = new ReplaySubject(1);
    }
    initSync() {
        this.statePersistenceService.syncWithStorage({
            key: CURRENCY_CONTEXT_ID,
            state$: this.currencyService.getActive(),
            onRead: (state) => this.onRead(state),
        });
        return this.initialized$;
    }
    onRead(valueFromStorage) {
        if (!this.currencyService.isInitialized() && valueFromStorage) {
            this.currencyService.setActive(valueFromStorage);
        }
        if (!this.initialized$.closed) {
            this.initialized$.next();
            this.initialized$.complete();
        }
    }
}
CurrencyStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CurrencyStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.CurrencyService }, { token: i3.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CurrencyStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CurrencyStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CurrencyStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.CurrencyService }, { type: i3.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9zZXJ2aWNlcy9jdXJyZW5jeS1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBRy9ELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDWSx1QkFBZ0QsRUFDaEQsZUFBZ0MsRUFDaEMsTUFBeUI7UUFGekIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFHM0IsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztJQUZwRCxDQUFDO0lBSUcsUUFBUTtRQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsR0FBRyxFQUFFLG1CQUFtQjtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUU7WUFDeEMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVTLE1BQU0sQ0FBQyxnQkFBb0M7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksZ0JBQWdCLEVBQUU7WUFDN0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNsRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs0SEEzQlUsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FEbEIsTUFBTTsyRkFDbkIsK0JBQStCO2tCQUQzQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc3RhdGUvc2VydmljZXMvc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9zaXRlLWNvbnRleHQtY29uZmlnJztcbmltcG9ydCB7IEN1cnJlbmN5U2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9jdXJyZW5jeS5zZXJ2aWNlJztcbmltcG9ydCB7IENVUlJFTkNZX0NPTlRFWFRfSUQgfSBmcm9tICcuLi9wcm92aWRlcnMvY29udGV4dC1pZHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5U3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjdXJyZW5jeVNlcnZpY2U6IEN1cnJlbmN5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBTaXRlQ29udGV4dENvbmZpZ1xuICApIHt9XG5cbiAgcHJvdGVjdGVkIGluaXRpYWxpemVkJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHVua25vd24+KDEpO1xuXG4gIHB1YmxpYyBpbml0U3luYygpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnN5bmNXaXRoU3RvcmFnZSh7XG4gICAgICBrZXk6IENVUlJFTkNZX0NPTlRFWFRfSUQsXG4gICAgICBzdGF0ZSQ6IHRoaXMuY3VycmVuY3lTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgICAgb25SZWFkOiAoc3RhdGUpID0+IHRoaXMub25SZWFkKHN0YXRlKSxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplZCQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZWFkKHZhbHVlRnJvbVN0b3JhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jdXJyZW5jeVNlcnZpY2UuaXNJbml0aWFsaXplZCgpICYmIHZhbHVlRnJvbVN0b3JhZ2UpIHtcbiAgICAgIHRoaXMuY3VycmVuY3lTZXJ2aWNlLnNldEFjdGl2ZSh2YWx1ZUZyb21TdG9yYWdlKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQkLmNsb3NlZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplZCQubmV4dCgpO1xuICAgICAgdGhpcy5pbml0aWFsaXplZCQuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==