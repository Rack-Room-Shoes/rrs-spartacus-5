/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./cart-entry.adapter";
export class CartEntryConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    add(userId, cartId, productCode, quantity) {
        return this.adapter.add(userId, cartId, productCode, quantity);
    }
    update(userId, cartId, entryNumber, qty, pickupStore) {
        return this.adapter.update(userId, cartId, entryNumber, qty, pickupStore);
    }
    remove(userId, cartId, entryNumber) {
        return this.adapter.remove(userId, cartId, entryNumber);
    }
}
CartEntryConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartEntryConnector, deps: [{ token: i1.CartEntryAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CartEntryConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartEntryConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartEntryConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CartEntryAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1lbnRyeS5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvY29ubmVjdG9ycy9lbnRyeS9jYXJ0LWVudHJ5LmNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBc0IsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7SUFBRyxDQUFDO0lBRTVDLEdBQUcsQ0FDUixNQUFjLEVBQ2QsTUFBYyxFQUNkLFdBQW1CLEVBQ25CLFFBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVNLE1BQU0sQ0FDWCxNQUFjLEVBQ2QsTUFBYyxFQUNkLFdBQW1CLEVBQ25CLEdBQVcsRUFDWCxXQUFvQjtRQUVwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU0sTUFBTSxDQUNYLE1BQWMsRUFDZCxNQUFjLEVBQ2QsV0FBbUI7UUFFbkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7OytHQTVCVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJ0TW9kaWZpY2F0aW9uIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXJ0RW50cnlBZGFwdGVyIH0gZnJvbSAnLi9jYXJ0LWVudHJ5LmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydEVudHJ5Q29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFkYXB0ZXI6IENhcnRFbnRyeUFkYXB0ZXIpIHt9XG5cbiAgcHVibGljIGFkZChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHF1YW50aXR5PzogbnVtYmVyXG4gICk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuYWRkKHVzZXJJZCwgY2FydElkLCBwcm9kdWN0Q29kZSwgcXVhbnRpdHkpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBlbnRyeU51bWJlcjogc3RyaW5nLFxuICAgIHF0eTogbnVtYmVyLFxuICAgIHBpY2t1cFN0b3JlPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIudXBkYXRlKHVzZXJJZCwgY2FydElkLCBlbnRyeU51bWJlciwgcXR5LCBwaWNrdXBTdG9yZSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGVudHJ5TnVtYmVyOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnJlbW92ZSh1c2VySWQsIGNhcnRJZCwgZW50cnlOdW1iZXIpO1xuICB9XG59XG4iXX0=