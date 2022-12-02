/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { StoreFinderCoreModule } from '@spartacus/storefinder/core';
import { IconModule, ListNavigationModule, SpinnerModule, } from '@spartacus/storefront';
import { ScheduleComponent } from './schedule-component/schedule.component';
import { StoreFinderGridComponent } from './store-finder-grid/store-finder-grid.component';
import { StoreFinderHeaderComponent } from './store-finder-header/store-finder-header.component';
import { StoreFinderListItemComponent } from './store-finder-list-item/store-finder-list-item.component';
import { StoreFinderMapComponent } from './store-finder-map/store-finder-map.component';
import { StoreFinderPaginationDetailsComponent } from './store-finder-pagination-details/store-finder-pagination-details.component';
import { StoreFinderListComponent } from './store-finder-search-result/store-finder-list/store-finder-list.component';
import { StoreFinderSearchResultComponent } from './store-finder-search-result/store-finder-search-result.component';
import { StoreFinderSearchComponent } from './store-finder-search/store-finder-search.component';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description/store-finder-store-description.component';
import { StoreFinderStoreComponent } from './store-finder-store/store-finder-store.component';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count/store-finder-stores-count.component';
import { StoreFinderComponent } from './store-finder/store-finder.component';
import * as i0 from "@angular/core";
export class StoreFinderComponentsModule {
}
StoreFinderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderComponentsModule, declarations: [StoreFinderSearchComponent,
        StoreFinderListComponent,
        StoreFinderMapComponent,
        StoreFinderListItemComponent,
        StoreFinderStoresCountComponent,
        StoreFinderGridComponent,
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderHeaderComponent,
        StoreFinderSearchResultComponent,
        StoreFinderComponent,
        StoreFinderPaginationDetailsComponent,
        StoreFinderStoreComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ListNavigationModule,
        SpinnerModule,
        UrlModule,
        StoreFinderCoreModule,
        I18nModule,
        IconModule], exports: [ScheduleComponent,
        StoreFinderComponent,
        StoreFinderGridComponent,
        StoreFinderHeaderComponent,
        StoreFinderListItemComponent,
        StoreFinderMapComponent,
        StoreFinderPaginationDetailsComponent,
        StoreFinderSearchComponent,
        StoreFinderSearchResultComponent,
        StoreFinderListComponent,
        StoreFinderStoreDescriptionComponent,
        StoreFinderStoresCountComponent,
        StoreFinderStoreComponent] });
StoreFinderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                StoreFinderComponent: {
                    component: StoreFinderComponent,
                    childRoutes: [
                        {
                            path: 'find',
                            component: StoreFinderSearchResultComponent,
                        },
                        {
                            path: 'view-all',
                            component: StoreFinderStoresCountComponent,
                        },
                        {
                            path: 'country/:country',
                            component: StoreFinderGridComponent,
                        },
                        {
                            path: 'country/:country/region/:region',
                            component: StoreFinderGridComponent,
                        },
                        {
                            path: 'country/:country/region/:region/:store',
                            component: StoreFinderStoreComponent,
                        },
                        {
                            path: 'country/:country/:store',
                            component: StoreFinderStoreComponent,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ListNavigationModule,
        SpinnerModule,
        UrlModule,
        StoreFinderCoreModule,
        I18nModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        ListNavigationModule,
                        SpinnerModule,
                        UrlModule,
                        StoreFinderCoreModule,
                        I18nModule,
                        IconModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                StoreFinderComponent: {
                                    component: StoreFinderComponent,
                                    childRoutes: [
                                        {
                                            path: 'find',
                                            component: StoreFinderSearchResultComponent,
                                        },
                                        {
                                            path: 'view-all',
                                            component: StoreFinderStoresCountComponent,
                                        },
                                        {
                                            path: 'country/:country',
                                            component: StoreFinderGridComponent,
                                        },
                                        {
                                            path: 'country/:country/region/:region',
                                            component: StoreFinderGridComponent,
                                        },
                                        {
                                            path: 'country/:country/region/:region/:store',
                                            component: StoreFinderStoreComponent,
                                        },
                                        {
                                            path: 'country/:country/:store',
                                            component: StoreFinderStoreComponent,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        StoreFinderSearchComponent,
                        StoreFinderListComponent,
                        StoreFinderMapComponent,
                        StoreFinderListItemComponent,
                        StoreFinderStoresCountComponent,
                        StoreFinderGridComponent,
                        StoreFinderStoreDescriptionComponent,
                        ScheduleComponent,
                        StoreFinderHeaderComponent,
                        StoreFinderSearchResultComponent,
                        StoreFinderComponent,
                        StoreFinderPaginationDetailsComponent,
                        StoreFinderStoreComponent,
                    ],
                    exports: [
                        ScheduleComponent,
                        StoreFinderComponent,
                        StoreFinderGridComponent,
                        StoreFinderHeaderComponent,
                        StoreFinderListItemComponent,
                        StoreFinderMapComponent,
                        StoreFinderPaginationDetailsComponent,
                        StoreFinderSearchComponent,
                        StoreFinderSearchResultComponent,
                        StoreFinderListComponent,
                        StoreFinderStoreDescriptionComponent,
                        StoreFinderStoresCountComponent,
                        StoreFinderStoreComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvbXBvbmVudHMvc3RvcmUtZmluZGVyLWNvbXBvbmVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUNwSSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUN0SCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxt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LGlDQUFpQzs0Q0FDdkMsU0FBUyxFQUFFLHdCQUF3Qjt5Q0FDcEM7d0NBQ0Q7NENBQ0UsSUFBSSxFQUFFLHdDQUF3Qzs0Q0FDOUMsU0FBUyxFQUFFLHlCQUF5Qjt5Q0FDckM7d0NBQ0Q7NENBQ0UsSUFBSSxFQUFFLHlCQUF5Qjs0Q0FDL0IsU0FBUyxFQUFFLHlCQUF5Qjt5Q0FDckM7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLHVCQUF1Qjt3QkFDdkIsNEJBQTRCO3dCQUM1QiwrQkFBK0I7d0JBQy9CLHdCQUF3Qjt3QkFDeEIsb0NBQW9DO3dCQUNwQyxpQkFBaUI7d0JBQ2pCLDBCQUEwQjt3QkFDMUIsZ0NBQWdDO3dCQUNoQyxvQkFBb0I7d0JBQ3BCLHFDQUFxQzt3QkFDckMseUJBQXlCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7d0JBQzVCLHVCQUF1Qjt3QkFDdkIscUNBQXFDO3dCQUNyQywwQkFBMEI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsd0JBQXdCO3dCQUN4QixvQ0FBb0M7d0JBQ3BDLCtCQUErQjt3QkFDL0IseUJBQXlCO3FCQUMxQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZywgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN0b3JlRmluZGVyQ29yZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmaW5kZXIvY29yZSc7XG5pbXBvcnQge1xuICBJY29uTW9kdWxlLFxuICBMaXN0TmF2aWdhdGlvbk1vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFNjaGVkdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9zY2hlZHVsZS1jb21wb25lbnQvc2NoZWR1bGUuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyR3JpZENvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLWdyaWQvc3RvcmUtZmluZGVyLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zdG9yZS1maW5kZXItaGVhZGVyL3N0b3JlLWZpbmRlci1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1saXN0LWl0ZW0vc3RvcmUtZmluZGVyLWxpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJNYXBDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1tYXAvc3RvcmUtZmluZGVyLW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJQYWdpbmF0aW9uRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLXBhZ2luYXRpb24tZGV0YWlscy9zdG9yZS1maW5kZXItcGFnaW5hdGlvbi1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3N0b3JlLWZpbmRlci1zZWFyY2gtcmVzdWx0L3N0b3JlLWZpbmRlci1saXN0L3N0b3JlLWZpbmRlci1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlclNlYXJjaFJlc3VsdENvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLXNlYXJjaC1yZXN1bHQvc3RvcmUtZmluZGVyLXNlYXJjaC1yZXN1bHQuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zdG9yZS1maW5kZXItc2VhcmNoL3N0b3JlLWZpbmRlci1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlRmluZGVyU3RvcmVEZXNjcmlwdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLXN0b3JlLWRlc2NyaXB0aW9uL3N0b3JlLWZpbmRlci1zdG9yZS1kZXNjcmlwdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTdG9yZUNvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLXN0b3JlL3N0b3JlLWZpbmRlci1zdG9yZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTdG9yZXNDb3VudENvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyLXN0b3Jlcy1jb3VudC9zdG9yZS1maW5kZXItc3RvcmVzLWNvdW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlckNvbXBvbmVudCB9IGZyb20gJy4vc3RvcmUtZmluZGVyL3N0b3JlLWZpbmRlci5jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBMaXN0TmF2aWdhdGlvbk1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBTdG9yZUZpbmRlckNvcmVNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyh7XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFN0b3JlRmluZGVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBTdG9yZUZpbmRlckNvbXBvbmVudCxcbiAgICAgICAgICBjaGlsZFJvdXRlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiAnZmluZCcsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogU3RvcmVGaW5kZXJTZWFyY2hSZXN1bHRDb21wb25lbnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiAndmlldy1hbGwnLFxuICAgICAgICAgICAgICBjb21wb25lbnQ6IFN0b3JlRmluZGVyU3RvcmVzQ291bnRDb21wb25lbnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiAnY291bnRyeS86Y291bnRyeScsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogU3RvcmVGaW5kZXJHcmlkQ29tcG9uZW50LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGF0aDogJ2NvdW50cnkvOmNvdW50cnkvcmVnaW9uLzpyZWdpb24nLFxuICAgICAgICAgICAgICBjb21wb25lbnQ6IFN0b3JlRmluZGVyR3JpZENvbXBvbmVudCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6ICdjb3VudHJ5Lzpjb3VudHJ5L3JlZ2lvbi86cmVnaW9uLzpzdG9yZScsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogU3RvcmVGaW5kZXJTdG9yZUNvbXBvbmVudCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6ICdjb3VudHJ5Lzpjb3VudHJ5LzpzdG9yZScsXG4gICAgICAgICAgICAgIGNvbXBvbmVudDogU3RvcmVGaW5kZXJTdG9yZUNvbXBvbmVudCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFN0b3JlRmluZGVyU2VhcmNoQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyTGlzdENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlck1hcENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckxpc3RJdGVtQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU3RvcmVzQ291bnRDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJHcmlkQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU3RvcmVEZXNjcmlwdGlvbkNvbXBvbmVudCxcbiAgICBTY2hlZHVsZUNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckhlYWRlckNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlclNlYXJjaFJlc3VsdENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlclBhZ2luYXRpb25EZXRhaWxzQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU3RvcmVDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTY2hlZHVsZUNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlckdyaWRDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJIZWFkZXJDb21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJMaXN0SXRlbUNvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlck1hcENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlclBhZ2luYXRpb25EZXRhaWxzQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU2VhcmNoQ29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyU2VhcmNoUmVzdWx0Q29tcG9uZW50LFxuICAgIFN0b3JlRmluZGVyTGlzdENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlclN0b3JlRGVzY3JpcHRpb25Db21wb25lbnQsXG4gICAgU3RvcmVGaW5kZXJTdG9yZXNDb3VudENvbXBvbmVudCxcbiAgICBTdG9yZUZpbmRlclN0b3JlQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZpbmRlckNvbXBvbmVudHNNb2R1bGUge31cbiJdfQ==