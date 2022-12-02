/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../../state/services/state-persistence.service";
import * as i2 from "../facade/language.service";
import * as i3 from "../config/site-context-config";
export class LanguageStatePersistenceService {
    constructor(statePersistenceService, languageService, config) {
        this.statePersistenceService = statePersistenceService;
        this.languageService = languageService;
        this.config = config;
        this.initialized$ = new ReplaySubject(1);
    }
    /**
     * Initializes the synchronization of the active language with the local storage.
     *
     * @returns Observable that emits and completes when the value is read from the storage.
     */
    initSync() {
        this.statePersistenceService.syncWithStorage({
            key: LANGUAGE_CONTEXT_ID,
            state$: this.languageService.getActive(),
            onRead: (state) => this.onRead(state),
        });
        return this.initialized$;
    }
    onRead(valueFromStorage) {
        if (!this.languageService.isInitialized() && valueFromStorage) {
            this.languageService.setActive(valueFromStorage);
        }
        if (!this.initialized$.closed) {
            this.initialized$.next();
            this.initialized$.complete();
        }
    }
}
LanguageStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LanguageStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.LanguageService }, { token: i3.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
LanguageStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LanguageStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LanguageStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.LanguageService }, { type: i3.SiteContextConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9zZXJ2aWNlcy9sYW5ndWFnZS1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBRy9ELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDWSx1QkFBZ0QsRUFDaEQsZUFBZ0MsRUFDaEMsTUFBeUI7UUFGekIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFHM0IsaUJBQVksR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztJQUZwRCxDQUFDO0lBSUo7Ozs7T0FJRztJQUNJLFFBQVE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLEdBQUcsRUFBRSxtQkFBbUI7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFUyxNQUFNLENBQUMsZ0JBQW9DO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLGdCQUFnQixFQUFFO1lBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7NEhBaENVLCtCQUErQjtnSUFBL0IsK0JBQStCLGNBRGxCLE1BQU07MkZBQ25CLCtCQUErQjtrQkFEM0MsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NlcnZpY2VzL3N0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuLi9jb25maWcvc2l0ZS1jb250ZXh0LWNvbmZpZyc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvbGFuZ3VhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMQU5HVUFHRV9DT05URVhUX0lEIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbnRleHQtaWRzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU2l0ZUNvbnRleHRDb25maWdcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBpbml0aWFsaXplZCQgPSBuZXcgUmVwbGF5U3ViamVjdDx1bmtub3duPigxKTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHN5bmNocm9uaXphdGlvbiBvZiB0aGUgYWN0aXZlIGxhbmd1YWdlIHdpdGggdGhlIGxvY2FsIHN0b3JhZ2UuXG4gICAqXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhbmQgY29tcGxldGVzIHdoZW4gdGhlIHZhbHVlIGlzIHJlYWQgZnJvbSB0aGUgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBpbml0U3luYygpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnN5bmNXaXRoU3RvcmFnZSh7XG4gICAgICBrZXk6IExBTkdVQUdFX0NPTlRFWFRfSUQsXG4gICAgICBzdGF0ZSQ6IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldEFjdGl2ZSgpLFxuICAgICAgb25SZWFkOiAoc3RhdGUpID0+IHRoaXMub25SZWFkKHN0YXRlKSxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplZCQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZWFkKHZhbHVlRnJvbVN0b3JhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5sYW5ndWFnZVNlcnZpY2UuaXNJbml0aWFsaXplZCgpICYmIHZhbHVlRnJvbVN0b3JhZ2UpIHtcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnNldEFjdGl2ZSh2YWx1ZUZyb21TdG9yYWdlKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQkLmNsb3NlZCkge1xuICAgICAgdGhpcy5pbml0aWFsaXplZCQubmV4dCgpO1xuICAgICAgdGhpcy5pbml0aWFsaXplZCQuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==