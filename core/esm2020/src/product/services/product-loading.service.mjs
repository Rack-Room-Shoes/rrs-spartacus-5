/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { select } from '@ngrx/store';
import { defer, merge, of, using } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, mapTo, shareReplay, tap, withLatestFrom, } from 'rxjs/operators';
import { deepMerge } from '../../config/utils/deep-merge';
import { uniteLatest } from '../../util/rxjs/unite-latest';
import { withdrawOn } from '../../util/rxjs/withdraw-on';
import { ProductActions } from '../store/actions/index';
import { ProductSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../occ/services/loading-scopes.service";
import * as i3 from "@ngrx/effects";
import * as i4 from "../../event/event.service";
export class ProductLoadingService {
    constructor(store, loadingScopes, actions$, platformId, eventService) {
        this.store = store;
        this.loadingScopes = loadingScopes;
        this.actions$ = actions$;
        this.platformId = platformId;
        this.eventService = eventService;
        this.products = {};
    }
    get(productCode, scopes) {
        scopes = this.loadingScopes.expand('product', scopes);
        this.initProductScopes(productCode, scopes);
        return this.products[productCode][this.getScopesIndex(scopes)];
    }
    initProductScopes(productCode, scopes) {
        if (!this.products[productCode]) {
            this.products[productCode] = {};
        }
        for (const scope of scopes) {
            if (!this.products[productCode][scope]) {
                this.products[productCode][scope] = this.getProductForScope(productCode, scope);
            }
        }
        if (scopes.length > 1) {
            this.products[productCode][this.getScopesIndex(scopes)] = uniteLatest(scopes.map((scope) => this.products[productCode][scope])).pipe(map((productParts) => productParts.every(Boolean)
                ? deepMerge({}, ...productParts)
                : undefined), distinctUntilChanged());
        }
    }
    getScopesIndex(scopes) {
        return scopes.join('ɵ');
    }
    /**
     * Creates observable for providing specified product data for the scope
     *
     * @param productCode
     * @param scope
     */
    getProductForScope(productCode, scope) {
        const shouldLoad$ = this.store.pipe(select(ProductSelectors.getSelectedProductStateFactory(productCode, scope)), map((productState) => !productState.loading && !productState.success && !productState.error), distinctUntilChanged(), filter((x) => x));
        const isLoading$ = this.store.pipe(select(ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)));
        const productLoadLogic$ = merge(shouldLoad$, ...this.getProductReloadTriggers(productCode, scope)).pipe(debounceTime(0), withLatestFrom(isLoading$), tap(([, isLoading]) => {
            if (!isLoading) {
                this.store.dispatch(new ProductActions.LoadProduct(productCode, scope));
            }
        }));
        const productData$ = this.store.pipe(select(ProductSelectors.getSelectedProductFactory(productCode, scope)));
        return using(() => productLoadLogic$.subscribe(), () => productData$).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Returns reload triggers for product per scope
     *
     * @param productCode
     * @param scope
     */
    getProductReloadTriggers(productCode, scope) {
        const triggers = [];
        // max age trigger add
        const maxAge = this.loadingScopes.getMaxAge('product', scope);
        if (maxAge && isPlatformBrowser(this.platformId)) {
            // we want to grab load product success and load product fail for this product and scope
            const loadFinish$ = this.actions$.pipe(ofType(ProductActions.LOAD_PRODUCT_SUCCESS, ProductActions.LOAD_PRODUCT_FAIL), filter((action) => action.meta.entityId === productCode && action.meta.scope === scope));
            const loadStart$ = this.actions$.pipe(ofType(ProductActions.LOAD_PRODUCT), filter((action) => action.payload === productCode && action.meta.scope === scope));
            triggers.push(this.getMaxAgeTrigger(loadStart$, loadFinish$, maxAge));
        }
        const reloadTriggers$ = this.loadingScopes
            .getReloadTriggers('product', scope)
            .map((e) => this.eventService.get(e));
        return triggers.concat(reloadTriggers$);
    }
    /**
     * Generic method that returns stream triggering reload by maxAge
     *
     * Could be refactored to separate service in future to use in other
     * max age reload implementations
     *
     * @param loadStart$ Stream that emits on load start
     * @param loadFinish$ Stream that emits on load finish
     * @param maxAge max age
     */
    getMaxAgeTrigger(loadStart$, loadFinish$, maxAge, scheduler) {
        let timestamp = 0;
        const now = () => (scheduler ? scheduler.now() : Date.now());
        const timestamp$ = loadFinish$.pipe(tap(() => (timestamp = now())));
        const shouldReload$ = defer(() => {
            const age = now() - timestamp;
            const timestampRefresh$ = timestamp$.pipe(delay(maxAge, scheduler), mapTo(true), withdrawOn(loadStart$));
            if (age > maxAge) {
                // we should emit first value immediately
                return merge(of(true), timestampRefresh$);
            }
            else if (age === 0) {
                // edge case, we should emit max age timeout after next load success
                // could happen with artificial schedulers
                return timestampRefresh$;
            }
            else {
                // we should emit first value when age will expire
                return merge(of(true).pipe(delay(maxAge - age, scheduler)), timestampRefresh$);
            }
        });
        return shouldReload$;
    }
}
ProductLoadingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductLoadingService, deps: [{ token: i1.Store }, { token: i2.LoadingScopesService }, { token: i3.Actions }, { token: PLATFORM_ID }, { token: i4.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductLoadingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductLoadingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductLoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.LoadingScopesService }, { type: i3.Actions }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i4.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1sb2FkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9wcm9kdWN0L3NlcnZpY2VzL3Byb2R1Y3QtbG9hZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFXLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBaUIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFDTCxZQUFZLEVBQ1osS0FBSyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILEtBQUssRUFDTCxXQUFXLEVBQ1gsR0FBRyxFQUNILGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUkxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBSzVELE1BQU0sT0FBTyxxQkFBcUI7SUFLaEMsWUFDWSxLQUE4QixFQUM5QixhQUFtQyxFQUNuQyxRQUFpQixFQUNJLFVBQWUsRUFDcEMsWUFBMEI7UUFKMUIsVUFBSyxH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Qjs7MEJBVUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgZGVmZXIsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgU2NoZWR1bGVyTGlrZSwgdXNpbmcgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRlYm91bmNlVGltZSxcbiAgZGVsYXksXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgbWFwVG8sXG4gIHNoYXJlUmVwbGF5LFxuICB0YXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkZWVwTWVyZ2UgfSBmcm9tICcuLi8uLi9jb25maWcvdXRpbHMvZGVlcC1tZXJnZSc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9ldmVudC9ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi8uLi9tb2RlbC9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IExvYWRpbmdTY29wZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vb2NjL3NlcnZpY2VzL2xvYWRpbmctc2NvcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgdW5pdGVMYXRlc3QgfSBmcm9tICcuLi8uLi91dGlsL3J4anMvdW5pdGUtbGF0ZXN0JztcbmltcG9ydCB7IHdpdGhkcmF3T24gfSBmcm9tICcuLi8uLi91dGlsL3J4anMvd2l0aGRyYXctb24nO1xuaW1wb3J0IHsgUHJvZHVjdEFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aFByb2R1Y3QgfSBmcm9tICcuLi9zdG9yZS9wcm9kdWN0LXN0YXRlJztcbmltcG9ydCB7IFByb2R1Y3RTZWxlY3RvcnMgfSBmcm9tICcuLi9zdG9yZS9zZWxlY3RvcnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdExvYWRpbmdTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHByb2R1Y3RzOiB7XG4gICAgW2NvZGU6IHN0cmluZ106IHsgW3Njb3BlOiBzdHJpbmddOiBPYnNlcnZhYmxlPFByb2R1Y3Q+IH07XG4gIH0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aFByb2R1Y3Q+LFxuICAgIHByb3RlY3RlZCBsb2FkaW5nU2NvcGVzOiBMb2FkaW5nU2NvcGVzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldChwcm9kdWN0Q29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxQcm9kdWN0PiB7XG4gICAgc2NvcGVzID0gdGhpcy5sb2FkaW5nU2NvcGVzLmV4cGFuZCgncHJvZHVjdCcsIHNjb3Blcyk7XG5cbiAgICB0aGlzLmluaXRQcm9kdWN0U2NvcGVzKHByb2R1Y3RDb2RlLCBzY29wZXMpO1xuICAgIHJldHVybiB0aGlzLnByb2R1Y3RzW3Byb2R1Y3RDb2RlXVt0aGlzLmdldFNjb3Blc0luZGV4KHNjb3BlcyldO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRQcm9kdWN0U2NvcGVzKHByb2R1Y3RDb2RlOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucHJvZHVjdHNbcHJvZHVjdENvZGVdKSB7XG4gICAgICB0aGlzLnByb2R1Y3RzW3Byb2R1Y3RDb2RlXSA9IHt9O1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2NvcGUgb2Ygc2NvcGVzKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZHVjdHNbcHJvZHVjdENvZGVdW3Njb3BlXSkge1xuICAgICAgICB0aGlzLnByb2R1Y3RzW3Byb2R1Y3RDb2RlXVtzY29wZV0gPSB0aGlzLmdldFByb2R1Y3RGb3JTY29wZShcbiAgICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgICBzY29wZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzY29wZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5wcm9kdWN0c1twcm9kdWN0Q29kZV1bdGhpcy5nZXRTY29wZXNJbmRleChzY29wZXMpXSA9IHVuaXRlTGF0ZXN0KFxuICAgICAgICBzY29wZXMubWFwKChzY29wZSkgPT4gdGhpcy5wcm9kdWN0c1twcm9kdWN0Q29kZV1bc2NvcGVdKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKHByb2R1Y3RQYXJ0cykgPT5cbiAgICAgICAgICBwcm9kdWN0UGFydHMuZXZlcnkoQm9vbGVhbilcbiAgICAgICAgICAgID8gZGVlcE1lcmdlKHt9LCAuLi5wcm9kdWN0UGFydHMpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTY29wZXNJbmRleChzY29wZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc2NvcGVzLmpvaW4oJ8m1Jyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBvYnNlcnZhYmxlIGZvciBwcm92aWRpbmcgc3BlY2lmaWVkIHByb2R1Y3QgZGF0YSBmb3IgdGhlIHNjb3BlXG4gICAqXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxuICAgKiBAcGFyYW0gc2NvcGVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRQcm9kdWN0Rm9yU2NvcGUoXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZyxcbiAgICBzY29wZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8UHJvZHVjdD4ge1xuICAgIGNvbnN0IHNob3VsZExvYWQkID0gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9kdWN0U2VsZWN0b3JzLmdldFNlbGVjdGVkUHJvZHVjdFN0YXRlRmFjdG9yeShwcm9kdWN0Q29kZSwgc2NvcGUpXG4gICAgICApLFxuICAgICAgbWFwKFxuICAgICAgICAocHJvZHVjdFN0YXRlKSA9PlxuICAgICAgICAgICFwcm9kdWN0U3RhdGUubG9hZGluZyAmJiAhcHJvZHVjdFN0YXRlLnN1Y2Nlc3MgJiYgIXByb2R1Y3RTdGF0ZS5lcnJvclxuICAgICAgKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBmaWx0ZXIoKHgpID0+IHgpXG4gICAgKTtcblxuICAgIGNvbnN0IGlzTG9hZGluZyQgPSB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2R1Y3RTZWxlY3RvcnMuZ2V0U2VsZWN0ZWRQcm9kdWN0TG9hZGluZ0ZhY3RvcnkocHJvZHVjdENvZGUsIHNjb3BlKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBjb25zdCBwcm9kdWN0TG9hZExvZ2ljJCA9IG1lcmdlKFxuICAgICAgc2hvdWxkTG9hZCQsXG4gICAgICAuLi50aGlzLmdldFByb2R1Y3RSZWxvYWRUcmlnZ2Vycyhwcm9kdWN0Q29kZSwgc2NvcGUpXG4gICAgKS5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDApLFxuICAgICAgd2l0aExhdGVzdEZyb20oaXNMb2FkaW5nJCksXG4gICAgICB0YXAoKFssIGlzTG9hZGluZ10pID0+IHtcbiAgICAgICAgaWYgKCFpc0xvYWRpbmcpIHtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IFByb2R1Y3RBY3Rpb25zLkxvYWRQcm9kdWN0KHByb2R1Y3RDb2RlLCBzY29wZSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBwcm9kdWN0RGF0YSQgPSB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoUHJvZHVjdFNlbGVjdG9ycy5nZXRTZWxlY3RlZFByb2R1Y3RGYWN0b3J5KHByb2R1Y3RDb2RlLCBzY29wZSkpXG4gICAgKTtcblxuICAgIHJldHVybiB1c2luZyhcbiAgICAgICgpID0+IHByb2R1Y3RMb2FkTG9naWMkLnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4gcHJvZHVjdERhdGEkXG4gICAgKS5waXBlKHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVsb2FkIHRyaWdnZXJzIGZvciBwcm9kdWN0IHBlciBzY29wZVxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICogQHBhcmFtIHNjb3BlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UHJvZHVjdFJlbG9hZFRyaWdnZXJzKFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgc2NvcGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+W10ge1xuICAgIGNvbnN0IHRyaWdnZXJzOiBPYnNlcnZhYmxlPHVua25vd24+W10gPSBbXTtcblxuICAgIC8vIG1heCBhZ2UgdHJpZ2dlciBhZGRcbiAgICBjb25zdCBtYXhBZ2UgPSB0aGlzLmxvYWRpbmdTY29wZXMuZ2V0TWF4QWdlKCdwcm9kdWN0Jywgc2NvcGUpO1xuICAgIGlmIChtYXhBZ2UgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgLy8gd2Ugd2FudCB0byBncmFiIGxvYWQgcHJvZHVjdCBzdWNjZXNzIGFuZCBsb2FkIHByb2R1Y3QgZmFpbCBmb3IgdGhpcyBwcm9kdWN0IGFuZCBzY29wZVxuICAgICAgY29uc3QgbG9hZEZpbmlzaCQgPSB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShcbiAgICAgICAgICBQcm9kdWN0QWN0aW9ucy5MT0FEX1BST0RVQ1RfU1VDQ0VTUyxcbiAgICAgICAgICBQcm9kdWN0QWN0aW9ucy5MT0FEX1BST0RVQ1RfRkFJTFxuICAgICAgICApLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgKFxuICAgICAgICAgICAgYWN0aW9uOlxuICAgICAgICAgICAgICB8IFByb2R1Y3RBY3Rpb25zLkxvYWRQcm9kdWN0U3VjY2Vzc1xuICAgICAgICAgICAgICB8IFByb2R1Y3RBY3Rpb25zLkxvYWRQcm9kdWN0RmFpbFxuICAgICAgICAgICkgPT5cbiAgICAgICAgICAgIGFjdGlvbi5tZXRhLmVudGl0eUlkID09PSBwcm9kdWN0Q29kZSAmJiBhY3Rpb24ubWV0YS5zY29wZSA9PT0gc2NvcGVcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgbG9hZFN0YXJ0JCA9IHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgICAgb2ZUeXBlKFByb2R1Y3RBY3Rpb25zLkxPQURfUFJPRFVDVCksXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICAoYWN0aW9uOiBQcm9kdWN0QWN0aW9ucy5Mb2FkUHJvZHVjdCkgPT5cbiAgICAgICAgICAgIGFjdGlvbi5wYXlsb2FkID09PSBwcm9kdWN0Q29kZSAmJiBhY3Rpb24ubWV0YS5zY29wZSA9PT0gc2NvcGVcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgdHJpZ2dlcnMucHVzaCh0aGlzLmdldE1heEFnZVRyaWdnZXIobG9hZFN0YXJ0JCwgbG9hZEZpbmlzaCQsIG1heEFnZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbG9hZFRyaWdnZXJzJCA9IHRoaXMubG9hZGluZ1Njb3Blc1xuICAgICAgLmdldFJlbG9hZFRyaWdnZXJzKCdwcm9kdWN0Jywgc2NvcGUpXG4gICAgICAubWFwKChlKSA9PiB0aGlzLmV2ZW50U2VydmljZS5nZXQoZSkpO1xuXG4gICAgcmV0dXJuIHRyaWdnZXJzLmNvbmNhdChyZWxvYWRUcmlnZ2VycyQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyaWMgbWV0aG9kIHRoYXQgcmV0dXJucyBzdHJlYW0gdHJpZ2dlcmluZyByZWxvYWQgYnkgbWF4QWdlXG4gICAqXG4gICAqIENvdWxkIGJlIHJlZmFjdG9yZWQgdG8gc2VwYXJhdGUgc2VydmljZSBpbiBmdXR1cmUgdG8gdXNlIGluIG90aGVyXG4gICAqIG1heCBhZ2UgcmVsb2FkIGltcGxlbWVudGF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gbG9hZFN0YXJ0JCBTdHJlYW0gdGhhdCBlbWl0cyBvbiBsb2FkIHN0YXJ0XG4gICAqIEBwYXJhbSBsb2FkRmluaXNoJCBTdHJlYW0gdGhhdCBlbWl0cyBvbiBsb2FkIGZpbmlzaFxuICAgKiBAcGFyYW0gbWF4QWdlIG1heCBhZ2VcbiAgICovXG4gIHByaXZhdGUgZ2V0TWF4QWdlVHJpZ2dlcihcbiAgICBsb2FkU3RhcnQkOiBPYnNlcnZhYmxlPFByb2R1Y3RBY3Rpb25zLlByb2R1Y3RBY3Rpb24+LFxuICAgIGxvYWRGaW5pc2gkOiBPYnNlcnZhYmxlPFByb2R1Y3RBY3Rpb25zLlByb2R1Y3RBY3Rpb24+LFxuICAgIG1heEFnZTogbnVtYmVyLFxuICAgIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2VcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgbGV0IHRpbWVzdGFtcCA9IDA7XG5cbiAgICBjb25zdCBub3cgPSAoKSA9PiAoc2NoZWR1bGVyID8gc2NoZWR1bGVyLm5vdygpIDogRGF0ZS5ub3coKSk7XG5cbiAgICBjb25zdCB0aW1lc3RhbXAkID0gbG9hZEZpbmlzaCQucGlwZSh0YXAoKCkgPT4gKHRpbWVzdGFtcCA9IG5vdygpKSkpO1xuXG4gICAgY29uc3Qgc2hvdWxkUmVsb2FkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IGRlZmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IGFnZSA9IG5vdygpIC0gdGltZXN0YW1wO1xuXG4gICAgICBjb25zdCB0aW1lc3RhbXBSZWZyZXNoJCA9IHRpbWVzdGFtcCQucGlwZShcbiAgICAgICAgZGVsYXkobWF4QWdlLCBzY2hlZHVsZXIpLFxuICAgICAgICBtYXBUbyh0cnVlKSxcbiAgICAgICAgd2l0aGRyYXdPbihsb2FkU3RhcnQkKVxuICAgICAgKTtcblxuICAgICAgaWYgKGFnZSA+IG1heEFnZSkge1xuICAgICAgICAvLyB3ZSBzaG91bGQgZW1pdCBmaXJzdCB2YWx1ZSBpbW1lZGlhdGVseVxuICAgICAgICByZXR1cm4gbWVyZ2Uob2YodHJ1ZSksIHRpbWVzdGFtcFJlZnJlc2gkKTtcbiAgICAgIH0gZWxzZSBpZiAoYWdlID09PSAwKSB7XG4gICAgICAgIC8vIGVkZ2UgY2FzZSwgd2Ugc2hvdWxkIGVtaXQgbWF4IGFnZSB0aW1lb3V0IGFmdGVyIG5leHQgbG9hZCBzdWNjZXNzXG4gICAgICAgIC8vIGNvdWxkIGhhcHBlbiB3aXRoIGFydGlmaWNpYWwgc2NoZWR1bGVyc1xuICAgICAgICByZXR1cm4gdGltZXN0YW1wUmVmcmVzaCQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3ZSBzaG91bGQgZW1pdCBmaXJzdCB2YWx1ZSB3aGVuIGFnZSB3aWxsIGV4cGlyZVxuICAgICAgICByZXR1cm4gbWVyZ2UoXG4gICAgICAgICAgb2YodHJ1ZSkucGlwZShkZWxheShtYXhBZ2UgLSBhZ2UsIHNjaGVkdWxlcikpLFxuICAgICAgICAgIHRpbWVzdGFtcFJlZnJlc2gkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2hvdWxkUmVsb2FkJDtcbiAgfVxufVxuIl19