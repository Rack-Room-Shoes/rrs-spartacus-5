/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { select } from '@ngrx/store';
import { GlobalMessageType, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { StoreFinderActions } from '../store/actions/index';
import { StoreFinderSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
export class StoreFinderService {
    constructor(store, winRef, globalMessageService, routingService, platformId) {
        this.store = store;
        this.winRef = winRef;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.platformId = platformId;
        this.geolocationWatchId = null;
        this.subscription = new Subscription();
        this.reloadStoreEntitiesOnContextChange();
    }
    /**
     * Returns boolean observable for store's loading state
     */
    getStoresLoading() {
        return this.store.pipe(select(StoreFinderSelectors.getStoresLoading));
    }
    /**
     * Returns boolean observable for store's success state
     */
    getStoresLoaded() {
        return this.store.pipe(select(StoreFinderSelectors.getStoresSuccess));
    }
    /**
     * Returns observable for store's entities
     */
    getFindStoresEntities() {
        return this.store.pipe(select(StoreFinderSelectors.getFindStoresEntities), map((data) => data.findStoresEntities));
    }
    /**
     * Returns observable for a single store by Id
     */
    getFindStoreEntityById() {
        return this.store.pipe(select(StoreFinderSelectors.getFindStoresEntities), map((data) => data.findStoreEntityById));
    }
    /**
     * Returns boolean observable for view all store's loading state
     */
    getViewAllStoresLoading() {
        return this.store.pipe(select(StoreFinderSelectors.getViewAllStoresLoading));
    }
    /**
     * Returns observable for view all store's entities
     */
    getViewAllStoresEntities() {
        return this.store.pipe(select(StoreFinderSelectors.getViewAllStoresEntities), map((data) => data.viewAllStoresEntities));
    }
    /**
     * Store finding action functionality
     * @param queryText text query
     * @param searchConfig search configuration
     * @param longitudeLatitude longitude and latitude coordinates
     * @param countryIsoCode country ISO code
     * @param useMyLocation current location coordinates
     * @param radius radius of the scope from the center point
     */
    findStoresAction(queryText, searchConfig, longitudeLatitude, countryIsoCode, useMyLocation, radius) {
        if (useMyLocation && this.winRef.nativeWindow) {
            this.clearWatchGeolocation(new StoreFinderActions.FindStoresOnHold());
            this.geolocationWatchId =
                this.winRef.nativeWindow.navigator.geolocation.watchPosition((pos) => {
                    const position = {
                        longitude: pos.coords.longitude,
                        latitude: pos.coords.latitude,
                    };
                    this.clearWatchGeolocation(new StoreFinderActions.FindStores({
                        queryText: queryText,
                        searchConfig: searchConfig,
                        longitudeLatitude: position,
                        countryIsoCode: countryIsoCode,
                        radius: radius,
                    }));
                }, () => {
                    this.globalMessageService.add({ key: 'storeFinder.geolocationNotEnabled' }, GlobalMessageType.MSG_TYPE_ERROR);
                    this.routingService.go(['/store-finder']);
                });
        }
        else {
            this.clearWatchGeolocation(new StoreFinderActions.FindStores({
                queryText: queryText,
                searchConfig: searchConfig,
                longitudeLatitude: longitudeLatitude,
                countryIsoCode: countryIsoCode,
                radius: radius,
            }));
        }
    }
    /**
     * View all stores
     */
    viewAllStores() {
        this.clearWatchGeolocation(new StoreFinderActions.ViewAllStores());
    }
    /**
     * View all stores by id
     * @param storeId store id
     */
    viewStoreById(storeId) {
        this.clearWatchGeolocation(new StoreFinderActions.FindStoreById({ storeId }));
    }
    clearWatchGeolocation(callbackAction) {
        if (this.geolocationWatchId !== null) {
            this.winRef.nativeWindow?.navigator.geolocation.clearWatch(this.geolocationWatchId);
            this.geolocationWatchId = null;
        }
        this.store.dispatch(callbackAction);
    }
    isEmpty(store) {
        return (!store || (typeof store === 'object' && Object.keys(store).length === 0));
    }
    /**
     * Reload store data when store entities are empty because of the context change
     */
    reloadStoreEntitiesOnContextChange() {
        if (isPlatformBrowser(this.platformId) || !this.platformId) {
            this.subscription = this.getFindStoresEntities()
                .pipe(filter((data) => this.isEmpty(data)), withLatestFrom(this.getStoresLoading(), this.getStoresLoaded(), this.routingService.getParams()))
                .subscribe(([, loading, loaded, routeParams]) => {
                if (!loading && !loaded) {
                    if (routeParams.country && !routeParams.store) {
                        this.callFindStoresAction(routeParams);
                    }
                    if (routeParams.store) {
                        this.viewStoreById(routeParams.store);
                    }
                }
            });
        }
    }
    callFindStoresAction(routeParams) {
        this.findStoresAction('', {
            pageSize: -1,
        }, undefined, routeParams.country);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    /**
     * Returns store latitude
     * @param location store location
     */
    getStoreLatitude(location) {
        return location?.geoPoint?.latitude;
    }
    /**
     * Returns store longitude
     * @param location store location
     */
    getStoreLongitude(location) {
        return location?.geoPoint?.longitude;
    }
}
StoreFinderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderService, deps: [{ token: i1.Store }, { token: i2.WindowRef }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.WindowRef }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvc3RvcmVmaW5kZXIvY29yZS9mYWNhZGUvc3RvcmUtZmluZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQVUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFHTCxpQkFBaUIsR0FLbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBTWhFLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsWUFDWSxLQUFrQyxFQUNsQyxNQUFpQixFQUNqQixvQkFBMEMsRUFDMUMsY0FBOEIsRUFDVCxVQUFlO1FBSnBDLFVBQUssR0FBTCxLQUFLLENBQTZCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDVCxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBUnhDLHVCQUFrQixHQUFrQixJQUFJLENBQUM7UUFDdkMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUzFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFD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QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsaUJBQWlCLENBQUMsUUFBd0I7UUFDeEMsT0FBTyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUN2QyxDQUFDOzsrR0F0TlUsa0JBQWtCLGtJQVNuQixXQUFXO21IQVRWLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQVVJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uLCBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgR2VvUG9pbnQsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUG9pbnRPZlNlcnZpY2UsXG4gIFJvdXRpbmdTZXJ2aWNlLFxuICBTZWFyY2hDb25maWcsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3RvcmVFbnRpdGllcyB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IFN0b3JlRmluZGVyQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTZWxlY3RvcnMgfSBmcm9tICcuLi9zdG9yZS9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgU3RhdGVXaXRoU3RvcmVGaW5kZXIgfSBmcm9tICcuLi9zdG9yZS9zdG9yZS1maW5kZXItc3RhdGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVGaW5kZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBnZW9sb2NhdGlvbldhdGNoSWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoU3RvcmVGaW5kZXI+LFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJvdGVjdGVkIHBsYXRmb3JtSWQ6IGFueVxuICApIHtcbiAgICB0aGlzLnJlbG9hZFN0b3JlRW50aXRpZXNPbkNvbnRleHRDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvb2xlYW4gb2JzZXJ2YWJsZSBmb3Igc3RvcmUncyBsb2FkaW5nIHN0YXRlXG4gICAqL1xuICBnZXRTdG9yZXNMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KFN0b3JlRmluZGVyU2VsZWN0b3JzLmdldFN0b3Jlc0xvYWRpbmcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvb2xlYW4gb2JzZXJ2YWJsZSBmb3Igc3RvcmUncyBzdWNjZXNzIHN0YXRlXG4gICAqL1xuICBnZXRTdG9yZXNMb2FkZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShzZWxlY3QoU3RvcmVGaW5kZXJTZWxlY3RvcnMuZ2V0U3RvcmVzU3VjY2VzcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSBmb3Igc3RvcmUncyBlbnRpdGllc1xuICAgKi9cbiAgZ2V0RmluZFN0b3Jlc0VudGl0aWVzKCk6IE9ic2VydmFibGU8U3RvcmVFbnRpdGllcz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoU3RvcmVGaW5kZXJTZWxlY3RvcnMuZ2V0RmluZFN0b3Jlc0VudGl0aWVzKSxcbiAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YS5maW5kU3RvcmVzRW50aXRpZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG9ic2VydmFibGUgZm9yIGEgc2luZ2xlIHN0b3JlIGJ5IElkXG4gICAqL1xuICBnZXRGaW5kU3RvcmVFbnRpdHlCeUlkKCk6IE9ic2VydmFibGU8U3RvcmVFbnRpdGllcz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoU3RvcmVGaW5kZXJTZWxlY3RvcnMuZ2V0RmluZFN0b3Jlc0VudGl0aWVzKSxcbiAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YS5maW5kU3RvcmVFbnRpdHlCeUlkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBib29sZWFuIG9ic2VydmFibGUgZm9yIHZpZXcgYWxsIHN0b3JlJ3MgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgZ2V0Vmlld0FsbFN0b3Jlc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChTdG9yZUZpbmRlclNlbGVjdG9ycy5nZXRWaWV3QWxsU3RvcmVzTG9hZGluZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSBmb3IgdmlldyBhbGwgc3RvcmUncyBlbnRpdGllc1xuICAgKi9cbiAgZ2V0Vmlld0FsbFN0b3Jlc0VudGl0aWVzKCk6IE9ic2VydmFibGU8U3RvcmVFbnRpdGllcz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoU3RvcmVGaW5kZXJTZWxlY3RvcnMuZ2V0Vmlld0FsbFN0b3Jlc0VudGl0aWVzKSxcbiAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YS52aWV3QWxsU3RvcmVzRW50aXRpZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZSBmaW5kaW5nIGFjdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAqIEBwYXJhbSBxdWVyeVRleHQgdGV4dCBxdWVyeVxuICAgKiBAcGFyYW0gc2VhcmNoQ29uZmlnIHNlYXJjaCBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSBsb25naXR1ZGVMYXRpdHVkZSBsb25naXR1ZGUgYW5kIGxhdGl0dWRlIGNvb3JkaW5hdGVzXG4gICAqIEBwYXJhbSBjb3VudHJ5SXNvQ29kZSBjb3VudHJ5IElTTyBjb2RlXG4gICAqIEBwYXJhbSB1c2VNeUxvY2F0aW9uIGN1cnJlbnQgbG9jYXRpb24gY29vcmRpbmF0ZXNcbiAgICogQHBhcmFtIHJhZGl1cyByYWRpdXMgb2YgdGhlIHNjb3BlIGZyb20gdGhlIGNlbnRlciBwb2ludFxuICAgKi9cbiAgZmluZFN0b3Jlc0FjdGlvbihcbiAgICBxdWVyeVRleHQ6IHN0cmluZyxcbiAgICBzZWFyY2hDb25maWc/OiBTZWFyY2hDb25maWcsXG4gICAgbG9uZ2l0dWRlTGF0aXR1ZGU/OiBHZW9Qb2ludCxcbiAgICBjb3VudHJ5SXNvQ29kZT86IHN0cmluZyxcbiAgICB1c2VNeUxvY2F0aW9uPzogYm9vbGVhbixcbiAgICByYWRpdXM/OiBudW1iZXJcbiAgKSB7XG4gICAgaWYgKHVzZU15TG9jYXRpb24gJiYgdGhpcy53aW5SZWYubmF0aXZlV2luZG93KSB7XG4gICAgICB0aGlzLmNsZWFyV2F0Y2hHZW9sb2NhdGlvbihuZXcgU3RvcmVGaW5kZXJBY3Rpb25zLkZpbmRTdG9yZXNPbkhvbGQoKSk7XG4gICAgICB0aGlzLmdlb2xvY2F0aW9uV2F0Y2hJZCA9XG4gICAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdy5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihcbiAgICAgICAgICAocG9zOiBHZW9sb2NhdGlvblBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbjogR2VvUG9pbnQgPSB7XG4gICAgICAgICAgICAgIGxvbmdpdHVkZTogcG9zLmNvb3Jkcy5sb25naXR1ZGUsXG4gICAgICAgICAgICAgIGxhdGl0dWRlOiBwb3MuY29vcmRzLmxhdGl0dWRlLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhcldhdGNoR2VvbG9jYXRpb24oXG4gICAgICAgICAgICAgIG5ldyBTdG9yZUZpbmRlckFjdGlvbnMuRmluZFN0b3Jlcyh7XG4gICAgICAgICAgICAgICAgcXVlcnlUZXh0OiBxdWVyeVRleHQsXG4gICAgICAgICAgICAgICAgc2VhcmNoQ29uZmlnOiBzZWFyY2hDb25maWcsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlTGF0aXR1ZGU6IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGNvdW50cnlJc29Db2RlOiBjb3VudHJ5SXNvQ29kZSxcbiAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgICAgeyBrZXk6ICdzdG9yZUZpbmRlci5nZW9sb2NhdGlvbk5vdEVuYWJsZWQnIH0sXG4gICAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyhbJy9zdG9yZS1maW5kZXInXSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsZWFyV2F0Y2hHZW9sb2NhdGlvbihcbiAgICAgICAgbmV3IFN0b3JlRmluZGVyQWN0aW9ucy5GaW5kU3RvcmVzKHtcbiAgICAgICAgICBxdWVyeVRleHQ6IHF1ZXJ5VGV4dCxcbiAgICAgICAgICBzZWFyY2hDb25maWc6IHNlYXJjaENvbmZpZyxcbiAgICAgICAgICBsb25naXR1ZGVMYXRpdHVkZTogbG9uZ2l0dWRlTGF0aXR1ZGUsXG4gICAgICAgICAgY291bnRyeUlzb0NvZGU6IGNvdW50cnlJc29Db2RlLFxuICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmlldyBhbGwgc3RvcmVzXG4gICAqL1xuICB2aWV3QWxsU3RvcmVzKCkge1xuICAgIHRoaXMuY2xlYXJXYXRjaEdlb2xvY2F0aW9uKG5ldyBTdG9yZUZpbmRlckFjdGlvbnMuVmlld0FsbFN0b3JlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGFsbCBzdG9yZXMgYnkgaWRcbiAgICogQHBhcmFtIHN0b3JlSWQgc3RvcmUgaWRcbiAgICovXG4gIHZpZXdTdG9yZUJ5SWQoc3RvcmVJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5jbGVhcldhdGNoR2VvbG9jYXRpb24oXG4gICAgICBuZXcgU3RvcmVGaW5kZXJBY3Rpb25zLkZpbmRTdG9yZUJ5SWQoeyBzdG9yZUlkIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJXYXRjaEdlb2xvY2F0aW9uKGNhbGxiYWNrQWN0aW9uOiBBY3Rpb24pIHtcbiAgICBpZiAodGhpcy5nZW9sb2NhdGlvbldhdGNoSWQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdz8ubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goXG4gICAgICAgIHRoaXMuZ2VvbG9jYXRpb25XYXRjaElkXG4gICAgICApO1xuICAgICAgdGhpcy5nZW9sb2NhdGlvbldhdGNoSWQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGNhbGxiYWNrQWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbXB0eShzdG9yZTogU3RvcmVFbnRpdGllcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhc3RvcmUgfHwgKHR5cGVvZiBzdG9yZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMoc3RvcmUpLmxlbmd0aCA9PT0gMClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbG9hZCBzdG9yZSBkYXRhIHdoZW4gc3RvcmUgZW50aXRpZXMgYXJlIGVtcHR5IGJlY2F1c2Ugb2YgdGhlIGNvbnRleHQgY2hhbmdlXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVsb2FkU3RvcmVFbnRpdGllc09uQ29udGV4dENoYW5nZSgpOiB2b2lkIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSB8fCAhdGhpcy5wbGF0Zm9ybUlkKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZ2V0RmluZFN0b3Jlc0VudGl0aWVzKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChkYXRhKSA9PiB0aGlzLmlzRW1wdHkoZGF0YSkpLFxuICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICAgICAgdGhpcy5nZXRTdG9yZXNMb2FkaW5nKCksXG4gICAgICAgICAgICB0aGlzLmdldFN0b3Jlc0xvYWRlZCgpLFxuICAgICAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nZXRQYXJhbXMoKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChbLCBsb2FkaW5nLCBsb2FkZWQsIHJvdXRlUGFyYW1zXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9hZGluZyAmJiAhbG9hZGVkKSB7XG4gICAgICAgICAgICBpZiAocm91dGVQYXJhbXMuY291bnRyeSAmJiAhcm91dGVQYXJhbXMuc3RvcmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5jYWxsRmluZFN0b3Jlc0FjdGlvbihyb3V0ZVBhcmFtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocm91dGVQYXJhbXMuc3RvcmUpIHtcbiAgICAgICAgICAgICAgdGhpcy52aWV3U3RvcmVCeUlkKHJvdXRlUGFyYW1zLnN0b3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNhbGxGaW5kU3RvcmVzQWN0aW9uKHJvdXRlUGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTogdm9pZCB7XG4gICAgdGhpcy5maW5kU3RvcmVzQWN0aW9uKFxuICAgICAgJycsXG4gICAgICB7XG4gICAgICAgIHBhZ2VTaXplOiAtMSxcbiAgICAgIH0sXG4gICAgICB1bmRlZmluZWQsXG4gICAgICByb3V0ZVBhcmFtcy5jb3VudHJ5XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgc3RvcmUgbGF0aXR1ZGVcbiAgICogQHBhcmFtIGxvY2F0aW9uIHN0b3JlIGxvY2F0aW9uXG4gICAqL1xuICBnZXRTdG9yZUxhdGl0dWRlKGxvY2F0aW9uOiBQb2ludE9mU2VydmljZSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGxvY2F0aW9uPy5nZW9Qb2ludD8ubGF0aXR1ZGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzdG9yZSBsb25naXR1ZGVcbiAgICogQHBhcmFtIGxvY2F0aW9uIHN0b3JlIGxvY2F0aW9uXG4gICAqL1xuICBnZXRTdG9yZUxvbmdpdHVkZShsb2NhdGlvbjogUG9pbnRPZlNlcnZpY2UpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBsb2NhdGlvbj8uZ2VvUG9pbnQ/LmxvbmdpdHVkZTtcbiAgfVxufVxuIl19