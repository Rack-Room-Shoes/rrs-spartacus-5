/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { META_REDUCERS } from '@ngrx/store';
import { CartType } from '@spartacus/cart/base/root';
import { ConfigInitializerService, MODULE_INITIALIZER } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import * as i0 from "@angular/core";
export function cartStatePersistenceFactory(cartStatePersistenceService, configInit) {
    const result = () => configInit
        .getStable('context')
        .pipe(tap(() => {
        cartStatePersistenceService.initSync();
    }))
        .toPromise();
    return result;
}
/**
 * Before `MultiCartStatePersistenceService` restores the active cart id `ActiveCartService`
 * will use `current` cart instead of the one saved in browser. This meta reducer
 * sets the value on store initialization to undefined cart which holds active cart loading
 * until the data from storage is restored.
 */
export function uninitializeActiveCartMetaReducerFactory() {
    const metaReducer = (reducer) => (state, action) => {
        const newState = { ...state };
        if (action.type === '@ngrx/store/init') {
            newState.cart = {
                ...newState.cart,
                ...{ index: { [CartType.ACTIVE]: undefined } },
            };
        }
        return reducer(newState, action);
    };
    return metaReducer;
}
/**
 * Complimentary module for cart to store cart id in browser storage.
 * This makes it possible to work on the same anonymous cart even after page refresh.
 */
export class CartPersistenceModule {
}
CartPersistenceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartPersistenceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartPersistenceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CartPersistenceModule });
CartPersistenceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartPersistenceModule, providers: [
        {
            provide: MODULE_INITIALIZER,
            useFactory: cartStatePersistenceFactory,
            deps: [MultiCartStatePersistenceService, ConfigInitializerService],
            multi: true,
        },
        {
            provide: META_REDUCERS,
            useFactory: uninitializeActiveCartMetaReducerFactory,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CartPersistenceModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: cartStatePersistenceFactory,
                            deps: [MultiCartStatePersistenceService, ConfigInitializerService],
                            multi: true,
                        },
                        {
                            provide: META_REDUCERS,
                            useFactory: uninitializeActiveCartMetaReducerFactory,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wZXJzaXN0ZW5jZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvY2FydC1wZXJzaXN0ZW5jZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFzQyxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUFFbkcsTUFBTSxVQUFVLDJCQUEyQixDQUN6QywyQkFBNkQsRUFDN0QsVUFBb0M7SUFFcEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQ2xCLFVBQVU7U0FDUCxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFO1FBQ1AsMkJBQTJCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQ0g7U0FDQSxTQUFTLEVBQUUsQ0FBQztJQUNqQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsd0NBQXdDO0lBQ3RELE1BQU0sV0FBVyxHQUNmLENBQUMsT0FBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDOUQsTUFBTSxRQUFRLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO1FBQzlCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRTtZQUN0QyxRQUFRLENBQUMsSUFBSSxHQUFHO2dCQUNkLEdBQUcsUUFBUSxDQUFDLElBQUk7Z0JBQ2hCLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRTthQUMvQyxDQUFDO1NBQ0g7UUFDRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBQ0osT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVEOzs7R0FHRztBQWlCSCxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixhQWRyQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixVQUFVLEVBQUUsMkJBQTJCO1lBQ3ZDLElBQUksRUFBRSxDQUFDLGdDQUFnQyxFQUFFLHdCQUF3QixDQUFDO1lBQ2xFLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFVBQVUsRUFBRSx3Q0FBd0M7WUFDcEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLHFCQUFxQjtrQkFoQmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxrQkFBa0I7NEJBQzNCLFVBQVUsRUFBRSwyQkFBMkI7NEJBQ3ZDLElBQUksRUFBRSxDQUFDLGdDQUFnQyxFQUFFLHdCQUF3QixDQUFDOzRCQUNsRSxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsVUFBVSxFQUFFLHdDQUF3Qzs0QkFDcEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyLCBNZXRhUmVkdWNlciwgTUVUQV9SRURVQ0VSUyB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IENhcnRUeXBlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDb25maWdJbml0aWFsaXplclNlcnZpY2UsIE1PRFVMRV9JTklUSUFMSVpFUiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNdWx0aUNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbXVsdGktY2FydC1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhcnRTdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeShcbiAgY2FydFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBNdWx0aUNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXG4pIHtcbiAgY29uc3QgcmVzdWx0ID0gKCkgPT5cbiAgICBjb25maWdJbml0XG4gICAgICAuZ2V0U3RhYmxlKCdjb250ZXh0JylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5pbml0U3luYygpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEJlZm9yZSBgTXVsdGlDYXJ0U3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2VgIHJlc3RvcmVzIHRoZSBhY3RpdmUgY2FydCBpZCBgQWN0aXZlQ2FydFNlcnZpY2VgXG4gKiB3aWxsIHVzZSBgY3VycmVudGAgY2FydCBpbnN0ZWFkIG9mIHRoZSBvbmUgc2F2ZWQgaW4gYnJvd3Nlci4gVGhpcyBtZXRhIHJlZHVjZXJcbiAqIHNldHMgdGhlIHZhbHVlIG9uIHN0b3JlIGluaXRpYWxpemF0aW9uIHRvIHVuZGVmaW5lZCBjYXJ0IHdoaWNoIGhvbGRzIGFjdGl2ZSBjYXJ0IGxvYWRpbmdcbiAqIHVudGlsIHRoZSBkYXRhIGZyb20gc3RvcmFnZSBpcyByZXN0b3JlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaW5pdGlhbGl6ZUFjdGl2ZUNhcnRNZXRhUmVkdWNlckZhY3RvcnkoKTogTWV0YVJlZHVjZXI8YW55PiB7XG4gIGNvbnN0IG1ldGFSZWR1Y2VyID1cbiAgICAocmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnk+KSA9PiAoc3RhdGU6IGFueSwgYWN0aW9uOiBBY3Rpb24pID0+IHtcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0geyAuLi5zdGF0ZSB9O1xuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSAnQG5ncngvc3RvcmUvaW5pdCcpIHtcbiAgICAgICAgbmV3U3RhdGUuY2FydCA9IHtcbiAgICAgICAgICAuLi5uZXdTdGF0ZS5jYXJ0LFxuICAgICAgICAgIC4uLnsgaW5kZXg6IHsgW0NhcnRUeXBlLkFDVElWRV06IHVuZGVmaW5lZCB9IH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVkdWNlcihuZXdTdGF0ZSwgYWN0aW9uKTtcbiAgICB9O1xuICByZXR1cm4gbWV0YVJlZHVjZXI7XG59XG5cbi8qKlxuICogQ29tcGxpbWVudGFyeSBtb2R1bGUgZm9yIGNhcnQgdG8gc3RvcmUgY2FydCBpZCBpbiBicm93c2VyIHN0b3JhZ2UuXG4gKiBUaGlzIG1ha2VzIGl0IHBvc3NpYmxlIHRvIHdvcmsgb24gdGhlIHNhbWUgYW5vbnltb3VzIGNhcnQgZXZlbiBhZnRlciBwYWdlIHJlZnJlc2guXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBNT0RVTEVfSU5JVElBTElaRVIsXG4gICAgICB1c2VGYWN0b3J5OiBjYXJ0U3RhdGVQZXJzaXN0ZW5jZUZhY3RvcnksXG4gICAgICBkZXBzOiBbTXVsdGlDYXJ0U3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UsIENvbmZpZ0luaXRpYWxpemVyU2VydmljZV0sXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICB1c2VGYWN0b3J5OiB1bmluaXRpYWxpemVBY3RpdmVDYXJ0TWV0YVJlZHVjZXJGYWN0b3J5LFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFBlcnNpc3RlbmNlTW9kdWxlIHt9XG4iXX0=