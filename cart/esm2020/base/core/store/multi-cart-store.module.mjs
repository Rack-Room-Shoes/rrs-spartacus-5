/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { effects } from './effects/index';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import { multiCartMetaReducers, multiCartReducerProvider, multiCartReducerToken, } from './reducers/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class MultiCartStoreModule {
}
MultiCartStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiCartStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiCartStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: MultiCartStoreModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule] });
MultiCartStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiCartStoreModule, providers: [multiCartReducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
            metaReducers: multiCartMetaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: MultiCartStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
                            metaReducers: multiCartMetaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [multiCartReducerProvider],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC1zdG9yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvc3RvcmUvbXVsdGktY2FydC1zdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsd0JBQXdCLEVBQ3hCLHFCQUFxQixHQUN0QixNQUFNLGtCQUFrQixDQUFDOzs7O0FBYTFCLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQVQ3QixZQUFZO1FBQ1osV0FBVztrSEFRRixvQkFBb0IsYUFGcEIsQ0FBQyx3QkFBd0IsQ0FBQyxZQVBuQyxZQUFZO1FBQ1osV0FBVztRQUNYLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUU7WUFDaEUsWUFBWSxFQUFFLHFCQUFxQjtTQUNwQyxDQUFDO1FBQ0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7MkZBSXhCLG9CQUFvQjtrQkFYaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUU7NEJBQ2hFLFlBQVksRUFBRSxxQkFBcUI7eUJBQ3BDLENBQUM7d0JBQ0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBlZmZlY3RzIH0gZnJvbSAnLi9lZmZlY3RzL2luZGV4JztcbmltcG9ydCB7IE1VTFRJX0NBUlRfRkVBVFVSRSB9IGZyb20gJy4vbXVsdGktY2FydC1zdGF0ZSc7XG5pbXBvcnQge1xuICBtdWx0aUNhcnRNZXRhUmVkdWNlcnMsXG4gIG11bHRpQ2FydFJlZHVjZXJQcm92aWRlcixcbiAgbXVsdGlDYXJ0UmVkdWNlclRva2VuLFxufSBmcm9tICcuL3JlZHVjZXJzL2luZGV4JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTdGF0ZU1vZHVsZSxcbiAgICBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKE1VTFRJX0NBUlRfRkVBVFVSRSwgbXVsdGlDYXJ0UmVkdWNlclRva2VuLCB7XG4gICAgICBtZXRhUmVkdWNlcnM6IG11bHRpQ2FydE1ldGFSZWR1Y2VycyxcbiAgICB9KSxcbiAgICBFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUoZWZmZWN0cyksXG4gIF0sXG4gIHByb3ZpZGVyczogW211bHRpQ2FydFJlZHVjZXJQcm92aWRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ2FydFN0b3JlTW9kdWxlIHt9XG4iXX0=