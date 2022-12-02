/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartAddEntryFailEvent, CartAddEntrySuccessEvent, } from '@spartacus/cart/base/root';
import { defaultQuickOrderConfig, } from '@spartacus/cart/quick-order/root';
import { HttpErrorModel, } from '@spartacus/core';
import { BehaviorSubject, of, Subject, timer, } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class QuickOrderService {
    constructor(activeCartService, config, eventService, productSearchConnector) {
        this.activeCartService = activeCartService;
        this.config = config;
        this.eventService = eventService;
        this.productSearchConnector = productSearchConnector;
        this.productAdded$ = new Subject();
        this.entries$ = new BehaviorSubject([]);
        this.softDeletedEntries$ = new BehaviorSubject({});
        this.nonPurchasableProductError$ = new BehaviorSubject(null);
        this.hardDeleteTimeout = this.config.quickOrder?.list?.hardDeleteTimeout || 7000;
        this.quickOrderListLimit = 0;
        this.clearDeleteTimeouts = {};
    }
    ngOnDestroy() {
        this.clearDeletedEntries();
    }
    /**
     * Get entries
     */
    getEntries() {
        return this.entries$;
    }
    /**
     * Search products using query
     */
    searchProducts(query, maxProducts) {
        // TODO(#14059): Remove condition
        if (this.productSearchConnector) {
            const searchConfig = {
                pageSize: maxProducts ||
                    defaultQuickOrderConfig.quickOrder?.searchForm?.maxProducts,
            };
            return this.productSearchConnector
                .search(query, searchConfig)
                .pipe(map((searchPage) => searchPage.products || []));
        }
        else {
            return of([]);
        }
    }
    /**
     * Clear a list of added entries
     */
    clearList() {
        this.entries$.next([]);
    }
    /**
     * Get information about the possibility to add the next product
     */
    canAdd(code) {
        if (code) {
            return of(this.isProductOnTheList(code) || !this.isLimitExceeded());
        }
        else {
            return of(!this.isLimitExceeded());
        }
    }
    /**
     * Set quick order list limit property
     */
    setListLimit(limit) {
        this.quickOrderListLimit = limit;
    }
    /**
     * Load a list of entries
     */
    loadEntries(entries = []) {
        this.entries$.next(entries);
    }
    /**
     * Load a list of entries
     */
    updateEntryQuantity(entryIndex, quantity) {
        const entries = this.entries$.getValue() || [];
        entries[entryIndex].quantity = quantity;
        this.entries$.next(entries);
    }
    /**
     * Delete single entry from the list
     */
    softDeleteEntry(index) {
        this.entries$.pipe(take(1)).subscribe((entries) => {
            const entriesList = entries;
            this.addSoftEntryDeletion(entriesList[index], true);
            entriesList.splice(index, 1);
            this.entries$.next(entriesList);
        });
    }
    /**
     * Add product to the quick order list
     */
    addProduct(product, quantity = 1) {
        const entry = this.generateOrderEntry(product, quantity);
        this.addEntry(entry);
    }
    /**
     * Return product added subject
     */
    getProductAdded() {
        return this.productAdded$;
    }
    /**
     * Set product added subject
     */
    setProductAdded(productCode) {
        this.productAdded$.next(productCode);
    }
    /**
     * Adding to cart all products from the list
     */
    addToCart() {
        let entries = [];
        const events = [];
        const subscription = this.eventService
            .get(CartAddEntrySuccessEvent)
            .subscribe((cartEvent) => {
            if (cartEvent.quantityAdded === 0 ||
                (!!cartEvent.quantityAdded &&
                    cartEvent.quantityAdded < cartEvent.quantity)) {
                events.push(this.createQuickOrderResultEvent(cartEvent));
            }
        });
        subscription.add(this.eventService
            .get(CartAddEntryFailEvent)
            .subscribe((cartEvent) => {
            events.push(this.createQuickOrderResultEvent(cartEvent));
        }));
        return this.getEntries().pipe(first(), switchMap((elements) => {
            entries = elements;
            this.activeCartService.addEntries(elements);
            this.clearList();
            return this.activeCartService.isStable();
        }), filter((isStable) => isStable), map(() => [entries, events]), tap(() => subscription.unsubscribe()));
    }
    /**
     * Return soft deleted entries
     */
    getSoftDeletedEntries() {
        return this.softDeletedEntries$;
    }
    /**
     * Restore soft deleted entry
     */
    restoreSoftDeletedEntry(productCode) {
        const entry = this.getSoftDeletedEntry(productCode);
        this.addEntry(entry);
        this.hardDeleteEntry(productCode);
    }
    /**
     * Clear deleted entry from the list
     */
    hardDeleteEntry(productCode) {
        const entry = this.getSoftDeletedEntry(productCode);
        const deletedEntries = this.softDeletedEntries$.getValue();
        if (entry) {
            delete deletedEntries[productCode];
            this.softDeletedEntries$.next(deletedEntries);
        }
        this.clearDeleteTimeout(productCode);
    }
    /**
     * Clear all deleted entries and timeout subscriptions
     */
    clearDeletedEntries() {
        Object.values(this.clearDeleteTimeouts).forEach((subscription) => subscription.unsubscribe());
        this.softDeletedEntries$.next({});
        this.clearDeleteTimeouts = {};
    }
    /**
     *  Return non purchasable product error
     */
    getNonPurchasableProductError() {
        return this.nonPurchasableProductError$;
    }
    /**
     * Set error that selected product is not purchasable
     */
    setNonPurchasableProductError(product) {
        this.nonPurchasableProductError$.next(product);
    }
    /**
     * Clear not purchasable product error
     */
    clearNonPurchasableProductError() {
        this.nonPurchasableProductError$.next(null);
    }
    /**
     * Add soft deleted entry to the cached list
     */
    addSoftEntryDeletion(entry, clearTimeout = true) {
        const deletedEntries = this.softDeletedEntries$.getValue();
        const productCode = entry?.product?.code;
        if (productCode) {
            deletedEntries[productCode] = entry;
            this.softDeletedEntries$.next(deletedEntries);
            if (clearTimeout) {
                const subscription = timer(this.hardDeleteTimeout).subscribe(() => {
                    this.hardDeleteEntry(productCode);
                });
                this.clearDeleteTimeouts[productCode] = subscription;
            }
        }
    }
    /**
     * Get soft deletion entry
     */
    getSoftDeletedEntry(productCode) {
        const deletedEntries = this.softDeletedEntries$.getValue();
        return deletedEntries[productCode];
    }
    /**
     * Generate Order Entry from Product
     */
    generateOrderEntry(product, quantity) {
        return {
            basePrice: product.price,
            product,
            quantity,
            totalPrice: product.price,
        };
    }
    /**
     * Add single entry to the list
     */
    addEntry(entry) {
        if (entry?.product?.code &&
            !this.isProductOnTheList(entry.product.code) &&
            this.isLimitExceeded()) {
            return;
        }
        const entries = this.entries$.getValue() || [];
        const entryStockLevel = entry.product?.stock?.stockLevel;
        if (entryStockLevel && entry.quantity && entry.quantity > entryStockLevel) {
            entry.quantity = entryStockLevel;
        }
        if (entry.product?.code && this.isProductOnTheList(entry.product.code)) {
            const entryIndex = entries.findIndex((item) => item.product?.code === entry.product?.code);
            let quantity = entries[entryIndex].quantity;
            if (quantity && entry.quantity) {
                entries[entryIndex].quantity = quantity + entry?.quantity;
                let newQuantity = entries[entryIndex].quantity;
                if (newQuantity && entryStockLevel && newQuantity > entryStockLevel) {
                    entries[entryIndex].quantity = entryStockLevel;
                }
                this.entries$.next([...entries]);
            }
        }
        else {
            this.entries$.next([...entries, ...[entry]]);
        }
        this.productAdded$.next(entry.product?.code);
    }
    /**
     * Verify if product is already on the list
     */
    isProductOnTheList(productCode) {
        const entries = this.entries$.getValue() || [];
        return !!entries.find((item) => item.product?.code === productCode);
    }
    isLimitExceeded() {
        const entries = this.entries$.getValue() || [];
        return entries.length >= this.quickOrderListLimit;
    }
    createQuickOrderResultEvent(cartEvent) {
        const evt = {
            productCode: cartEvent.productCode,
            quantity: cartEvent.quantity,
        };
        if ('entry' in cartEvent) {
            evt.entry = cartEvent.entry;
        }
        if ('quantityAdded' in cartEvent) {
            evt.quantityAdded = cartEvent.quantityAdded;
        }
        if ('error' in cartEvent && cartEvent.error instanceof HttpErrorModel) {
            evt.error = cartEvent.error;
        }
        if (evt.error?.details?.length) {
            const isOutOfStock = evt.error?.details.some((e) => e.type === 'InsufficientStockError');
            evt.quantityAdded = isOutOfStock ? 0 : evt.quantity;
        }
        return evt;
    }
    clearDeleteTimeout(productCode) {
        const clearMessageTimout = this.clearDeleteTimeouts[productCode];
        if (clearMessageTimout) {
            clearMessageTimout.unsubscribe();
            delete this.clearDeleteTimeouts[productCode];
        }
    }
}
QuickOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.Config }, { token: i2.EventService }, { token: i2.ProductSearchConnector }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.Config }, { type: i2.EventService }, { type: i2.ProductSearchConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3F1aWNrLW9yZGVyL2NvcmUvc2VydmljZXMvcXVpY2stb3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLHdCQUF3QixHQUV6QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFDTCx1QkFBdUIsR0FHeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBR0wsY0FBYyxHQUtmLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLGVBQWUsRUFFZixFQUFFLEVBQ0YsT0FBTyxFQUVQLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzFFLE1BQU0sT0FBTyxpQkFBaUI7SUFjNUIsWUFDWSxpQkFBbUMsRUFDbkMsTUFBYyxFQUNkLFlBQTBCLEVBQzFCLHNCQUE4QztRQUg5QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBakJoRCxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3ZELGFBQVEsR0FBa0MsSUFBSSxlQUFlLENBRXJFLEVBQUUsQ0FBQyxDQUFDO1FBQ0ksd0JBQW1CLEdBQzNCLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztRQUM1QyxnQ0FBMkIsR0FDbkMsSUFB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QUFDO1lBQ0YsR0FBRyxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztTQUNyRDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVTLGtCQUFrQixDQUFDLFdBQW1CO1FBQzlDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpFLElBQUksa0JBQWtCLEVBQUU7WUFDdEIsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOzs4R0E1WFUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FydEFkZEVudHJ5RmFpbEV2ZW50LFxuICBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQsXG4gIE9yZGVyRW50cnksXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgZGVmYXVsdFF1aWNrT3JkZXJDb25maWcsXG4gIFF1aWNrT3JkZXJBZGRFbnRyeUV2ZW50LFxuICBRdWlja09yZGVyRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvcXVpY2stb3JkZXIvcm9vdCc7XG5pbXBvcnQge1xuICBDb25maWcsXG4gIEV2ZW50U2VydmljZSxcbiAgSHR0cEVycm9yTW9kZWwsXG4gIFByb2R1Y3QsXG4gIFByb2R1Y3RTZWFyY2hDb25uZWN0b3IsXG4gIFByb2R1Y3RTZWFyY2hQYWdlLFxuICBTZWFyY2hDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG4gIHRpbWVyLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdWlja09yZGVyU2VydmljZSBpbXBsZW1lbnRzIFF1aWNrT3JkZXJGYWNhZGUsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBwcm9kdWN0QWRkZWQkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIHByb3RlY3RlZCBlbnRyaWVzJDogQmVoYXZpb3JTdWJqZWN0PE9yZGVyRW50cnlbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFxuICAgIE9yZGVyRW50cnlbXVxuICA+KFtdKTtcbiAgcHJvdGVjdGVkIHNvZnREZWxldGVkRW50cmllcyQ6IEJlaGF2aW9yU3ViamVjdDxSZWNvcmQ8c3RyaW5nLCBPcmRlckVudHJ5Pj4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8UmVjb3JkPHN0cmluZywgT3JkZXJFbnRyeT4+KHt9KTtcbiAgcHJvdGVjdGVkIG5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yJDogQmVoYXZpb3JTdWJqZWN0PFByb2R1Y3QgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxQcm9kdWN0IHwgbnVsbD4obnVsbCk7XG4gIHByb3RlY3RlZCBoYXJkRGVsZXRlVGltZW91dCA9XG4gICAgdGhpcy5jb25maWcucXVpY2tPcmRlcj8ubGlzdD8uaGFyZERlbGV0ZVRpbWVvdXQgfHwgNzAwMDtcbiAgcHJvdGVjdGVkIHF1aWNrT3JkZXJMaXN0TGltaXQgPSAwO1xuICBwcm90ZWN0ZWQgY2xlYXJEZWxldGVUaW1lb3V0czogUmVjb3JkPHN0cmluZywgU3Vic2NyaXB0aW9uPiA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwcm9kdWN0U2VhcmNoQ29ubmVjdG9yOiBQcm9kdWN0U2VhcmNoQ29ubmVjdG9yXG4gICkge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyRGVsZXRlZEVudHJpZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZW50cmllc1xuICAgKi9cbiAgZ2V0RW50cmllcygpOiBCZWhhdmlvclN1YmplY3Q8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZW50cmllcyQ7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHByb2R1Y3RzIHVzaW5nIHF1ZXJ5XG4gICAqL1xuICBzZWFyY2hQcm9kdWN0cyhxdWVyeTogc3RyaW5nLCBtYXhQcm9kdWN0cz86IG51bWJlcik6IE9ic2VydmFibGU8UHJvZHVjdFtdPiB7XG4gICAgLy8gVE9ETygjMTQwNTkpOiBSZW1vdmUgY29uZGl0aW9uXG4gICAgaWYgKHRoaXMucHJvZHVjdFNlYXJjaENvbm5lY3Rvcikge1xuICAgICAgY29uc3Qgc2VhcmNoQ29uZmlnOiBTZWFyY2hDb25maWcgPSB7XG4gICAgICAgIHBhZ2VTaXplOlxuICAgICAgICAgIG1heFByb2R1Y3RzIHx8XG4gICAgICAgICAgZGVmYXVsdFF1aWNrT3JkZXJDb25maWcucXVpY2tPcmRlcj8uc2VhcmNoRm9ybT8ubWF4UHJvZHVjdHMsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFNlYXJjaENvbm5lY3RvclxuICAgICAgICAuc2VhcmNoKHF1ZXJ5LCBzZWFyY2hDb25maWcpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcCgoc2VhcmNoUGFnZTogUHJvZHVjdFNlYXJjaFBhZ2UpID0+IHNlYXJjaFBhZ2UucHJvZHVjdHMgfHwgW10pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihbXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGEgbGlzdCBvZiBhZGRlZCBlbnRyaWVzXG4gICAqL1xuICBjbGVhckxpc3QoKTogdm9pZCB7XG4gICAgdGhpcy5lbnRyaWVzJC5uZXh0KFtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBvc3NpYmlsaXR5IHRvIGFkZCB0aGUgbmV4dCBwcm9kdWN0XG4gICAqL1xuICBjYW5BZGQoY29kZT86IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmIChjb2RlKSB7XG4gICAgICByZXR1cm4gb2YodGhpcy5pc1Byb2R1Y3RPblRoZUxpc3QoY29kZSkgfHwgIXRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YoIXRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcXVpY2sgb3JkZXIgbGlzdCBsaW1pdCBwcm9wZXJ0eVxuICAgKi9cbiAgc2V0TGlzdExpbWl0KGxpbWl0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnF1aWNrT3JkZXJMaXN0TGltaXQgPSBsaW1pdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgbGlzdCBvZiBlbnRyaWVzXG4gICAqL1xuICBsb2FkRW50cmllcyhlbnRyaWVzOiBPcmRlckVudHJ5W10gPSBbXSk6IHZvaWQge1xuICAgIHRoaXMuZW50cmllcyQubmV4dChlbnRyaWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgbGlzdCBvZiBlbnRyaWVzXG4gICAqL1xuICB1cGRhdGVFbnRyeVF1YW50aXR5KGVudHJ5SW5kZXg6IG51bWJlciwgcXVhbnRpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmVudHJpZXMkLmdldFZhbHVlKCkgfHwgW107XG4gICAgZW50cmllc1tlbnRyeUluZGV4XS5xdWFudGl0eSA9IHF1YW50aXR5O1xuXG4gICAgdGhpcy5lbnRyaWVzJC5uZXh0KGVudHJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBzaW5nbGUgZW50cnkgZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgc29mdERlbGV0ZUVudHJ5KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmVudHJpZXMkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChlbnRyaWVzOiBPcmRlckVudHJ5W10pID0+IHtcbiAgICAgIGNvbnN0IGVudHJpZXNMaXN0ID0gZW50cmllcztcbiAgICAgIHRoaXMuYWRkU29mdEVudHJ5RGVsZXRpb24oZW50cmllc0xpc3RbaW5kZXhdLCB0cnVlKTtcbiAgICAgIGVudHJpZXNMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLmVudHJpZXMkLm5leHQoZW50cmllc0xpc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBwcm9kdWN0IHRvIHRoZSBxdWljayBvcmRlciBsaXN0XG4gICAqL1xuICBhZGRQcm9kdWN0KHByb2R1Y3Q6IFByb2R1Y3QsIHF1YW50aXR5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdlbmVyYXRlT3JkZXJFbnRyeShwcm9kdWN0LCBxdWFudGl0eSk7XG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHByb2R1Y3QgYWRkZWQgc3ViamVjdFxuICAgKi9cbiAgZ2V0UHJvZHVjdEFkZGVkKCk6IFN1YmplY3Q8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvZHVjdEFkZGVkJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcHJvZHVjdCBhZGRlZCBzdWJqZWN0XG4gICAqL1xuICBzZXRQcm9kdWN0QWRkZWQocHJvZHVjdENvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucHJvZHVjdEFkZGVkJC5uZXh0KHByb2R1Y3RDb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRpbmcgdG8gY2FydCBhbGwgcHJvZHVjdHMgZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgYWRkVG9DYXJ0KCk6IE9ic2VydmFibGU8W09yZGVyRW50cnlbXSwgUXVpY2tPcmRlckFkZEVudHJ5RXZlbnRbXV0+IHtcbiAgICBsZXQgZW50cmllczogT3JkZXJFbnRyeVtdID0gW107XG4gICAgY29uc3QgZXZlbnRzOiBRdWlja09yZGVyQWRkRW50cnlFdmVudFtdID0gW107XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgIC5nZXQoQ2FydEFkZEVudHJ5U3VjY2Vzc0V2ZW50KVxuICAgICAgLnN1YnNjcmliZSgoY2FydEV2ZW50OiBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhcnRFdmVudC5xdWFudGl0eUFkZGVkID09PSAwIHx8XG4gICAgICAgICAgKCEhY2FydEV2ZW50LnF1YW50aXR5QWRkZWQgJiZcbiAgICAgICAgICAgIGNhcnRFdmVudC5xdWFudGl0eUFkZGVkIDwgY2FydEV2ZW50LnF1YW50aXR5KVxuICAgICAgICApIHtcbiAgICAgICAgICBldmVudHMucHVzaCh0aGlzLmNyZWF0ZVF1aWNrT3JkZXJSZXN1bHRFdmVudChjYXJ0RXZlbnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBzdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgICAgLmdldChDYXJ0QWRkRW50cnlGYWlsRXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKGNhcnRFdmVudDogQ2FydEFkZEVudHJ5RmFpbEV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnRzLnB1c2godGhpcy5jcmVhdGVRdWlja09yZGVyUmVzdWx0RXZlbnQoY2FydEV2ZW50KSk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmdldEVudHJpZXMoKS5waXBlKFxuICAgICAgZmlyc3QoKSxcbiAgICAgIHN3aXRjaE1hcCgoZWxlbWVudHMpID0+IHtcbiAgICAgICAgZW50cmllcyA9IGVsZW1lbnRzO1xuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmFkZEVudHJpZXMoZWxlbWVudHMpO1xuICAgICAgICB0aGlzLmNsZWFyTGlzdCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmlzU3RhYmxlKCk7XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcigoaXNTdGFibGUpID0+IGlzU3RhYmxlKSxcbiAgICAgIG1hcCgoKSA9PiBbZW50cmllcywgZXZlbnRzXSBhcyBbT3JkZXJFbnRyeVtdLCBRdWlja09yZGVyQWRkRW50cnlFdmVudFtdXSksXG4gICAgICB0YXAoKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gc29mdCBkZWxldGVkIGVudHJpZXNcbiAgICovXG4gIGdldFNvZnREZWxldGVkRW50cmllcygpOiBPYnNlcnZhYmxlPFJlY29yZDxzdHJpbmcsIE9yZGVyRW50cnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuc29mdERlbGV0ZWRFbnRyaWVzJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlIHNvZnQgZGVsZXRlZCBlbnRyeVxuICAgKi9cbiAgcmVzdG9yZVNvZnREZWxldGVkRW50cnkocHJvZHVjdENvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRTb2Z0RGVsZXRlZEVudHJ5KHByb2R1Y3RDb2RlKTtcblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICAgIHRoaXMuaGFyZERlbGV0ZUVudHJ5KHByb2R1Y3RDb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBkZWxldGVkIGVudHJ5IGZyb20gdGhlIGxpc3RcbiAgICovXG4gIGhhcmREZWxldGVFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldFNvZnREZWxldGVkRW50cnkocHJvZHVjdENvZGUpO1xuICAgIGNvbnN0IGRlbGV0ZWRFbnRyaWVzID0gdGhpcy5zb2Z0RGVsZXRlZEVudHJpZXMkLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoZW50cnkpIHtcbiAgICAgIGRlbGV0ZSBkZWxldGVkRW50cmllc1twcm9kdWN0Q29kZV07XG4gICAgICB0aGlzLnNvZnREZWxldGVkRW50cmllcyQubmV4dChkZWxldGVkRW50cmllcyk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhckRlbGV0ZVRpbWVvdXQocHJvZHVjdENvZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBkZWxldGVkIGVudHJpZXMgYW5kIHRpbWVvdXQgc3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgY2xlYXJEZWxldGVkRW50cmllcygpOiB2b2lkIHtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuY2xlYXJEZWxldGVUaW1lb3V0cykuZm9yRWFjaChcbiAgICAgIChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICApO1xuXG4gICAgdGhpcy5zb2Z0RGVsZXRlZEVudHJpZXMkLm5leHQoe30pO1xuICAgIHRoaXMuY2xlYXJEZWxldGVUaW1lb3V0cyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqICBSZXR1cm4gbm9uIHB1cmNoYXNhYmxlIHByb2R1Y3QgZXJyb3JcbiAgICovXG4gIGdldE5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yKCk6IE9ic2VydmFibGU8UHJvZHVjdCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5ub25QdXJjaGFzYWJsZVByb2R1Y3RFcnJvciQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGVycm9yIHRoYXQgc2VsZWN0ZWQgcHJvZHVjdCBpcyBub3QgcHVyY2hhc2FibGVcbiAgICovXG4gIHNldE5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yKHByb2R1Y3Q6IFByb2R1Y3QpOiB2b2lkIHtcbiAgICB0aGlzLm5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yJC5uZXh0KHByb2R1Y3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIG5vdCBwdXJjaGFzYWJsZSBwcm9kdWN0IGVycm9yXG4gICAqL1xuICBjbGVhck5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMubm9uUHVyY2hhc2FibGVQcm9kdWN0RXJyb3IkLm5leHQobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNvZnQgZGVsZXRlZCBlbnRyeSB0byB0aGUgY2FjaGVkIGxpc3RcbiAgICovXG4gIHByb3RlY3RlZCBhZGRTb2Z0RW50cnlEZWxldGlvbihcbiAgICBlbnRyeTogT3JkZXJFbnRyeSxcbiAgICBjbGVhclRpbWVvdXQ6IGJvb2xlYW4gPSB0cnVlXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGRlbGV0ZWRFbnRyaWVzID0gdGhpcy5zb2Z0RGVsZXRlZEVudHJpZXMkLmdldFZhbHVlKCk7XG4gICAgY29uc3QgcHJvZHVjdENvZGUgPSBlbnRyeT8ucHJvZHVjdD8uY29kZTtcblxuICAgIGlmIChwcm9kdWN0Q29kZSkge1xuICAgICAgZGVsZXRlZEVudHJpZXNbcHJvZHVjdENvZGVdID0gZW50cnk7XG5cbiAgICAgIHRoaXMuc29mdERlbGV0ZWRFbnRyaWVzJC5uZXh0KGRlbGV0ZWRFbnRyaWVzKTtcblxuICAgICAgaWYgKGNsZWFyVGltZW91dCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IHRpbWVyKFxuICAgICAgICAgIHRoaXMuaGFyZERlbGV0ZVRpbWVvdXRcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFyZERlbGV0ZUVudHJ5KHByb2R1Y3RDb2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbGVhckRlbGV0ZVRpbWVvdXRzW3Byb2R1Y3RDb2RlXSA9IHN1YnNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHNvZnQgZGVsZXRpb24gZW50cnlcbiAgICovXG4gIHByb3RlY3RlZCBnZXRTb2Z0RGVsZXRlZEVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPcmRlckVudHJ5IHtcbiAgICBjb25zdCBkZWxldGVkRW50cmllcyA9IHRoaXMuc29mdERlbGV0ZWRFbnRyaWVzJC5nZXRWYWx1ZSgpO1xuXG4gICAgcmV0dXJuIGRlbGV0ZWRFbnRyaWVzW3Byb2R1Y3RDb2RlXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBPcmRlciBFbnRyeSBmcm9tIFByb2R1Y3RcbiAgICovXG4gIHByb3RlY3RlZCBnZW5lcmF0ZU9yZGVyRW50cnkoXG4gICAgcHJvZHVjdDogUHJvZHVjdCxcbiAgICBxdWFudGl0eT86IG51bWJlclxuICApOiBPcmRlckVudHJ5IHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFzZVByaWNlOiBwcm9kdWN0LnByaWNlLFxuICAgICAgcHJvZHVjdCxcbiAgICAgIHF1YW50aXR5LFxuICAgICAgdG90YWxQcmljZTogcHJvZHVjdC5wcmljZSxcbiAgICB9IGFzIE9yZGVyRW50cnk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNpbmdsZSBlbnRyeSB0byB0aGUgbGlzdFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZEVudHJ5KGVudHJ5OiBPcmRlckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgZW50cnk/LnByb2R1Y3Q/LmNvZGUgJiZcbiAgICAgICF0aGlzLmlzUHJvZHVjdE9uVGhlTGlzdChlbnRyeS5wcm9kdWN0LmNvZGUpICYmXG4gICAgICB0aGlzLmlzTGltaXRFeGNlZWRlZCgpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZW50cmllcyQuZ2V0VmFsdWUoKSB8fCBbXTtcbiAgICBjb25zdCBlbnRyeVN0b2NrTGV2ZWwgPSBlbnRyeS5wcm9kdWN0Py5zdG9jaz8uc3RvY2tMZXZlbDtcblxuICAgIGlmIChlbnRyeVN0b2NrTGV2ZWwgJiYgZW50cnkucXVhbnRpdHkgJiYgZW50cnkucXVhbnRpdHkgPiBlbnRyeVN0b2NrTGV2ZWwpIHtcbiAgICAgIGVudHJ5LnF1YW50aXR5ID0gZW50cnlTdG9ja0xldmVsO1xuICAgIH1cblxuICAgIGlmIChlbnRyeS5wcm9kdWN0Py5jb2RlICYmIHRoaXMuaXNQcm9kdWN0T25UaGVMaXN0KGVudHJ5LnByb2R1Y3QuY29kZSkpIHtcbiAgICAgIGNvbnN0IGVudHJ5SW5kZXggPSBlbnRyaWVzLmZpbmRJbmRleChcbiAgICAgICAgKGl0ZW06IE9yZGVyRW50cnkpID0+IGl0ZW0ucHJvZHVjdD8uY29kZSA9PT0gZW50cnkucHJvZHVjdD8uY29kZVxuICAgICAgKTtcbiAgICAgIGxldCBxdWFudGl0eSA9IGVudHJpZXNbZW50cnlJbmRleF0ucXVhbnRpdHk7XG5cbiAgICAgIGlmIChxdWFudGl0eSAmJiBlbnRyeS5xdWFudGl0eSkge1xuICAgICAgICBlbnRyaWVzW2VudHJ5SW5kZXhdLnF1YW50aXR5ID0gcXVhbnRpdHkgKyBlbnRyeT8ucXVhbnRpdHk7XG4gICAgICAgIGxldCBuZXdRdWFudGl0eSA9IGVudHJpZXNbZW50cnlJbmRleF0ucXVhbnRpdHk7XG5cbiAgICAgICAgaWYgKG5ld1F1YW50aXR5ICYmIGVudHJ5U3RvY2tMZXZlbCAmJiBuZXdRdWFudGl0eSA+IGVudHJ5U3RvY2tMZXZlbCkge1xuICAgICAgICAgIGVudHJpZXNbZW50cnlJbmRleF0ucXVhbnRpdHkgPSBlbnRyeVN0b2NrTGV2ZWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVudHJpZXMkLm5leHQoWy4uLmVudHJpZXNdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzJC5uZXh0KFsuLi5lbnRyaWVzLCAuLi5bZW50cnldXSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9kdWN0QWRkZWQkLm5leHQoZW50cnkucHJvZHVjdD8uY29kZSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IGlmIHByb2R1Y3QgaXMgYWxyZWFkeSBvbiB0aGUgbGlzdFxuICAgKi9cbiAgcHJvdGVjdGVkIGlzUHJvZHVjdE9uVGhlTGlzdChwcm9kdWN0Q29kZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZW50cmllcyQuZ2V0VmFsdWUoKSB8fCBbXTtcblxuICAgIHJldHVybiAhIWVudHJpZXMuZmluZChcbiAgICAgIChpdGVtOiBPcmRlckVudHJ5KSA9PiBpdGVtLnByb2R1Y3Q/LmNvZGUgPT09IHByb2R1Y3RDb2RlXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0xpbWl0RXhjZWVkZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZW50cmllcyQuZ2V0VmFsdWUoKSB8fCBbXTtcblxuICAgIHJldHVybiBlbnRyaWVzLmxlbmd0aCA+PSB0aGlzLnF1aWNrT3JkZXJMaXN0TGltaXQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVF1aWNrT3JkZXJSZXN1bHRFdmVudChcbiAgICBjYXJ0RXZlbnQ6IENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudCB8IENhcnRBZGRFbnRyeUZhaWxFdmVudFxuICApOiBRdWlja09yZGVyQWRkRW50cnlFdmVudCB7XG4gICAgY29uc3QgZXZ0OiBRdWlja09yZGVyQWRkRW50cnlFdmVudCA9IHtcbiAgICAgIHByb2R1Y3RDb2RlOiBjYXJ0RXZlbnQucHJvZHVjdENvZGUsXG4gICAgICBxdWFudGl0eTogY2FydEV2ZW50LnF1YW50aXR5LFxuICAgIH07XG5cbiAgICBpZiAoJ2VudHJ5JyBpbiBjYXJ0RXZlbnQpIHtcbiAgICAgIGV2dC5lbnRyeSA9IGNhcnRFdmVudC5lbnRyeTtcbiAgICB9XG4gICAgaWYgKCdxdWFudGl0eUFkZGVkJyBpbiBjYXJ0RXZlbnQpIHtcbiAgICAgIGV2dC5xdWFudGl0eUFkZGVkID0gY2FydEV2ZW50LnF1YW50aXR5QWRkZWQ7XG4gICAgfVxuICAgIGlmICgnZXJyb3InIGluIGNhcnRFdmVudCAmJiBjYXJ0RXZlbnQuZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JNb2RlbCkge1xuICAgICAgZXZ0LmVycm9yID0gY2FydEV2ZW50LmVycm9yO1xuICAgIH1cblxuICAgIGlmIChldnQuZXJyb3I/LmRldGFpbHM/Lmxlbmd0aCkge1xuICAgICAgY29uc3QgaXNPdXRPZlN0b2NrID0gZXZ0LmVycm9yPy5kZXRhaWxzLnNvbWUoXG4gICAgICAgIChlKSA9PiBlLnR5cGUgPT09ICdJbnN1ZmZpY2llbnRTdG9ja0Vycm9yJ1xuICAgICAgKTtcbiAgICAgIGV2dC5xdWFudGl0eUFkZGVkID0gaXNPdXRPZlN0b2NrID8gMCA6IGV2dC5xdWFudGl0eTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZ0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsZWFyRGVsZXRlVGltZW91dChwcm9kdWN0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgY2xlYXJNZXNzYWdlVGltb3V0ID0gdGhpcy5jbGVhckRlbGV0ZVRpbWVvdXRzW3Byb2R1Y3RDb2RlXTtcblxuICAgIGlmIChjbGVhck1lc3NhZ2VUaW1vdXQpIHtcbiAgICAgIGNsZWFyTWVzc2FnZVRpbW91dC51bnN1YnNjcmliZSgpO1xuICAgICAgZGVsZXRlIHRoaXMuY2xlYXJEZWxldGVUaW1lb3V0c1twcm9kdWN0Q29kZV07XG4gICAgfVxuICB9XG59XG4iXX0=