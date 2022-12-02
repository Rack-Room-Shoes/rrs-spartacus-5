/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrderEntriesSource, } from '@spartacus/cart/base/root';
import { queueScheduler } from 'rxjs';
import { delayWhen, filter, map, observeOn, switchMap, take, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/core";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "@spartacus/cart/saved-cart/root";
export class NewSavedCartOrderEntriesContext {
    constructor(importInfoService, userIdService, multiCartService, savedCartService) {
        this.importInfoService = importInfoService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.savedCartService = savedCartService;
        this.type = OrderEntriesSource.NEW_SAVED_CART;
    }
    addEntries(products, savedCartInfo) {
        return this.add(products, savedCartInfo).pipe(switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    add(products, savedCartInfo) {
        return this.userIdService.takeUserId().pipe(switchMap((userId) => this.multiCartService
            .createCart({
            userId,
            extraData: { active: false },
        })
            .pipe(map((cart) => cart.code), tap((cartId) => {
            this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo?.name,
                saveCartDescription: savedCartInfo?.description,
            });
            this.savedCartService.loadSavedCarts();
        }), observeOn(queueScheduler), delayWhen(() => this.savedCartService
            .getSaveCartProcessLoading()
            .pipe(filter((loading) => !loading))), tap((cartId) => this.multiCartService.addEntries(userId, cartId, products)))));
    }
}
NewSavedCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NewSavedCartOrderEntriesContext, deps: [{ token: i1.ProductImportInfoService }, { token: i2.UserIdService }, { token: i3.MultiCartFacade }, { token: i4.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
NewSavedCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NewSavedCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NewSavedCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductImportInfoService }, { type: i2.UserIdService }, { type: i3.MultiCartFacade }, { type: i4.SavedCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LXNhdmVkLWNhcnQtb3JkZXItZW50cmllcy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb21wb25lbnRzL3BhZ2UtY29udGV4dC9zYXZlZC1jYXJ0cy1wYWdlL25ldy1zYXZlZC1jYXJ0LW9yZGVyLWVudHJpZXMuY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBSUwsa0JBQWtCLEdBR25CLE1BQU0sMkJBQTJCLENBQUM7QUFHbkMsT0FBTyxFQUFjLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBQ0osR0FBRyxHQUNKLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUt4QixNQUFNLE9BQU8sK0JBQStCO0lBRzFDLFlBQ1ksaUJBQTJDLEVBQzNDLGFBQTRCLEVBQzVCLGdCQUFpQyxFQUNqQyxnQkFBaUM7UUFIakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFOcEMsU0FBSSxHQUFHLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztJQU8vQyxDQUFDO0lBRUosVUFBVSxDQUNSLFFBQXVCLEVBQ3ZCLGFBQXFEO1FBRXJELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUMzQyxTQUFTLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFUyxHQUFHLENBQ1gsUUFBdUIsRUFDdkIsYUFBcUQ7UUFFckQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FDekMsU0FBUyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FDM0IsSUFBSSxDQUFDLGdCQUFnQjthQUNsQixVQUFVLENBQUM7WUFDVixNQUFNO1lBQ04sU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtTQUM3QixDQUFDO2FBQ0QsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQWMsQ0FBQyxFQUN4QyxHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO2dCQUM3QixNQUFNO2dCQUNOLFlBQVksRUFBRSxhQUFhLEVBQUUsSUFBSTtnQkFDakMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFdBQVc7YUFDaEQsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFDekIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUNiLElBQUksQ0FBQyxnQkFBZ0I7YUFDbEIseUJBQXlCLEVBQUU7YUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUN2QyxFQUNELEdBQUcsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FDM0QsQ0FDRixDQUNKLENBQ0YsQ0FBQztJQUNKLENBQUM7OzRIQXJEVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQUY5QixNQUFNOzJGQUVQLCtCQUErQjtrQkFIM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWN0SW1wb3J0SW5mb1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9jb3JlJztcbmltcG9ydCB7XG4gIEFkZE9yZGVyRW50cmllc0NvbnRleHQsXG4gIENhcnQsXG4gIE11bHRpQ2FydEZhY2FkZSxcbiAgT3JkZXJFbnRyaWVzU291cmNlLFxuICBQcm9kdWN0RGF0YSxcbiAgUHJvZHVjdEltcG9ydEluZm8sXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3NhdmVkLWNhcnQvcm9vdCc7XG5pbXBvcnQgeyBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHF1ZXVlU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWxheVdoZW4sXG4gIGZpbHRlcixcbiAgbWFwLFxuICBvYnNlcnZlT24sXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOZXdTYXZlZENhcnRPcmRlckVudHJpZXNDb250ZXh0IGltcGxlbWVudHMgQWRkT3JkZXJFbnRyaWVzQ29udGV4dCB7XG4gIHJlYWRvbmx5IHR5cGUgPSBPcmRlckVudHJpZXNTb3VyY2UuTkVXX1NBVkVEX0NBUlQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGltcG9ydEluZm9TZXJ2aWNlOiBQcm9kdWN0SW1wb3J0SW5mb1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydFNlcnZpY2U6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc2F2ZWRDYXJ0U2VydmljZTogU2F2ZWRDYXJ0RmFjYWRlXG4gICkge31cblxuICBhZGRFbnRyaWVzKFxuICAgIHByb2R1Y3RzOiBQcm9kdWN0RGF0YVtdLFxuICAgIHNhdmVkQ2FydEluZm8/OiB7IG5hbWU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZyB9XG4gICk6IE9ic2VydmFibGU8UHJvZHVjdEltcG9ydEluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5hZGQocHJvZHVjdHMsIHNhdmVkQ2FydEluZm8pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnRJZDogc3RyaW5nKSA9PiB0aGlzLmltcG9ydEluZm9TZXJ2aWNlLmdldFJlc3VsdHMoY2FydElkKSksXG4gICAgICB0YWtlKHByb2R1Y3RzLmxlbmd0aClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZChcbiAgICBwcm9kdWN0czogUHJvZHVjdERhdGFbXSxcbiAgICBzYXZlZENhcnRJbmZvPzogeyBuYW1lOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmcgfVxuICApOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHVzZXJJZDogc3RyaW5nKSA9PlxuICAgICAgICB0aGlzLm11bHRpQ2FydFNlcnZpY2VcbiAgICAgICAgICAuY3JlYXRlQ2FydCh7XG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBleHRyYURhdGE6IHsgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNhcnQ6IENhcnQpID0+IGNhcnQuY29kZSBhcyBzdHJpbmcpLFxuICAgICAgICAgICAgdGFwKChjYXJ0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNhdmVkQ2FydFNlcnZpY2Uuc2F2ZUNhcnQoe1xuICAgICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgICBzYXZlQ2FydE5hbWU6IHNhdmVkQ2FydEluZm8/Lm5hbWUsXG4gICAgICAgICAgICAgICAgc2F2ZUNhcnREZXNjcmlwdGlvbjogc2F2ZWRDYXJ0SW5mbz8uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnNhdmVkQ2FydFNlcnZpY2UubG9hZFNhdmVkQ2FydHMoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKSxcbiAgICAgICAgICAgIGRlbGF5V2hlbigoKSA9PlxuICAgICAgICAgICAgICB0aGlzLnNhdmVkQ2FydFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuZ2V0U2F2ZUNhcnRQcm9jZXNzTG9hZGluZygpXG4gICAgICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChsb2FkaW5nKSA9PiAhbG9hZGluZykpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGFwKChjYXJ0SWQ6IHN0cmluZykgPT5cbiAgICAgICAgICAgICAgdGhpcy5tdWx0aUNhcnRTZXJ2aWNlLmFkZEVudHJpZXModXNlcklkLCBjYXJ0SWQsIHByb2R1Y3RzKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iXX0=