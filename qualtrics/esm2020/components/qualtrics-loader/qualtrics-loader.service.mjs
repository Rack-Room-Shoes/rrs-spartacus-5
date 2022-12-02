/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, isDevMode, PLATFORM_ID, } from '@angular/core';
import { EMPTY, fromEvent, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export const QUALTRICS_EVENT_NAME = 'qsi_js_loaded';
/**
 * Service to integration Qualtrics.
 *
 * The integration observes the Qualtrics API, and when available, it runs the QSI API
 * to let Qualtrics evaluate the application.
 *
 * The service supports an additional _hook_ (`isDataLoaded()`) that can be used to load application
 * data before pulling the QSI API. This is beneficial in a single page application when additional
 * data is required before the Qualtrics _creatives_ run.
 *
 * This service also supports the creation of the Qualtrics deployment script. This is optional, as
 * the script can be added in alternatives ways.
 */
export class QualtricsLoaderService {
    constructor(winRef, platformId, scriptLoader) {
        this.winRef = winRef;
        this.platformId = platformId;
        this.scriptLoader = scriptLoader;
        this.subscription = new Subscription();
        /**
         * QSI load event that happens when the QSI JS file is loaded.
         */
        this.qsiLoaded$ = isPlatformBrowser(this.platformId) && this.window
            ? fromEvent(this.window, QUALTRICS_EVENT_NAME)
            : of();
        /**
         * Emits the Qualtrics Site Intercept (QSI) JavaScript API whenever available.
         *
         * The API is emitted when the JavaScript resource holding this API is fully loaded.
         * The API is also stored locally in the service, in case it's required later on.
         */
        this.qsi$ = this.qsiLoaded$.pipe(switchMap(() => this.isDataLoaded()), map((dataLoaded) => (dataLoaded ? this.window?.QSI : EMPTY)), filter((qsi) => Boolean(qsi)), tap((qsi) => (this.qsiApi = qsi)));
        this.initialize();
    }
    get window() {
        return this.winRef.nativeWindow;
    }
    /**
     * Adds the deployment script to the DOM.
     *
     * The script will not be added twice if it was loaded before. In that case, we use
     * the Qualtrics API directly to _unload_ and _run_ the project.
     */
    addScript(scriptSource) {
        if (this.hasScript(scriptSource)) {
            this.run(true);
        }
        else {
            this.scriptLoader.embedScript({
                src: scriptSource,
            });
        }
    }
    /**
     * Indicates if the script is already added to the DOM.
     */
    hasScript(source) {
        return !!this.winRef.document.querySelector(`script[src="${source}"]`);
    }
    /**
     * Starts observing the Qualtrics integration. The integration is based on a
     * Qualtrics specific event (`qsi_js_loaded`). As soon as this events happens,
     * we run the API.
     */
    initialize() {
        this.subscription.add(this.qsi$.subscribe(() => this.run()));
    }
    /**
     * Evaluates the Qualtrics project code for the application.
     *
     * In order to reload the evaluation in Qualtrics, the API requires to unload the API before
     * running it again. We don't do this by default, but offer a flag to conditionally unload the API.
     */
    run(reload = false) {
        if (!this.qsiApi?.API) {
            if (isDevMode()) {
                console.log('The QSI api is not available');
            }
            return;
        }
        if (reload) {
            // Removes any currently displaying creatives
            this.qsiApi.API.unload();
        }
        // Starts the intercept code evaluation right after loading the Site Intercept
        // code for any defined intercepts or creatives
        this.qsiApi.API.load().done(this.qsiApi.API.run());
    }
    /**
     * This logic exist in order to let the client(s) add their own logic to wait for any kind of page data.
     * You can observe any data in this method.
     *
     * Defaults to true.
     */
    isDataLoaded() {
        return of(true);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
QualtricsLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QualtricsLoaderService, deps: [{ token: i1.WindowRef }, { token: PLATFORM_ID }, { token: i1.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
QualtricsLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QualtricsLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QualtricsLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbHRyaWNzLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3F1YWx0cmljcy9jb21wb25lbnRzL3F1YWx0cmljcy1sb2FkZXIvcXVhbHRyaWNzLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEVBRVQsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFN0QsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDO0FBTXBEOzs7Ozs7Ozs7Ozs7R0FZRztBQUlILE1BQU0sT0FBTyxzQkFBc0I7SUFpQ2pDLFlBQ1ksTUFBaUIsRUFDSSxVQUFlLEVBQ3BDLFlBQTBCO1FBRjFCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDSSxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBbkM1QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFPNUM7O1dBRUc7UUFDSyxlQUFVLEdBQ2hCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUMvQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUM7WUFDOUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRVg7Ozs7O1dBS0c7UUFDTyxTQUFJLEdBQW9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwRCxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQ3BDLEdBQUcsQ0FBQyxDQUFDLFVBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDckUsTUFBTSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDbEMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FDdkMsQ0FBQztRQVdBLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBVkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUNsQyxDQUFDO0lBVUQ7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsWUFBb0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEI7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO2dCQUM1QixHQUFHLEVBQUUsWUFBWTthQUNsQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBQyxNQUFlO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxVQUFVO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNyQixJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQzthQUM3QztZQUNELE9BQU87U0FDUjtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsNkNBQTZDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCO1FBRUQsOEVBQThFO1FBQzlFLCtDQUErQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxZQUFZO1FBQ3BCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzttSEE3R1Usc0JBQXNCLDJDQW1DdkIsV0FBVzt1SEFuQ1Ysc0JBQXNCLGNBRnJCLE1BQU07MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBb0NJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgaXNEZXZNb2RlLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcmlwdExvYWRlciwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IFFVQUxUUklDU19FVkVOVF9OQU1FID0gJ3FzaV9qc19sb2FkZWQnO1xuXG5pbnRlcmZhY2UgUXVhbHRyaWNzV2luZG93IGV4dGVuZHMgV2luZG93IHtcbiAgUVNJPzogYW55O1xufVxuXG4vKipcbiAqIFNlcnZpY2UgdG8gaW50ZWdyYXRpb24gUXVhbHRyaWNzLlxuICpcbiAqIFRoZSBpbnRlZ3JhdGlvbiBvYnNlcnZlcyB0aGUgUXVhbHRyaWNzIEFQSSwgYW5kIHdoZW4gYXZhaWxhYmxlLCBpdCBydW5zIHRoZSBRU0kgQVBJXG4gKiB0byBsZXQgUXVhbHRyaWNzIGV2YWx1YXRlIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBUaGUgc2VydmljZSBzdXBwb3J0cyBhbiBhZGRpdGlvbmFsIF9ob29rXyAoYGlzRGF0YUxvYWRlZCgpYCkgdGhhdCBjYW4gYmUgdXNlZCB0byBsb2FkIGFwcGxpY2F0aW9uXG4gKiBkYXRhIGJlZm9yZSBwdWxsaW5nIHRoZSBRU0kgQVBJLiBUaGlzIGlzIGJlbmVmaWNpYWwgaW4gYSBzaW5nbGUgcGFnZSBhcHBsaWNhdGlvbiB3aGVuIGFkZGl0aW9uYWxcbiAqIGRhdGEgaXMgcmVxdWlyZWQgYmVmb3JlIHRoZSBRdWFsdHJpY3MgX2NyZWF0aXZlc18gcnVuLlxuICpcbiAqIFRoaXMgc2VydmljZSBhbHNvIHN1cHBvcnRzIHRoZSBjcmVhdGlvbiBvZiB0aGUgUXVhbHRyaWNzIGRlcGxveW1lbnQgc2NyaXB0LiBUaGlzIGlzIG9wdGlvbmFsLCBhc1xuICogdGhlIHNjcmlwdCBjYW4gYmUgYWRkZWQgaW4gYWx0ZXJuYXRpdmVzIHdheXMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWFsdHJpY3NMb2FkZXJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBRU0kgQVBJLlxuICAgKi9cbiAgcHJvdGVjdGVkIHFzaUFwaTogYW55O1xuXG4gIC8qKlxuICAgKiBRU0kgbG9hZCBldmVudCB0aGF0IGhhcHBlbnMgd2hlbiB0aGUgUVNJIEpTIGZpbGUgaXMgbG9hZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBxc2lMb2FkZWQkOiBPYnNlcnZhYmxlPGFueT4gPVxuICAgIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgdGhpcy53aW5kb3dcbiAgICAgID8gZnJvbUV2ZW50KHRoaXMud2luZG93LCBRVUFMVFJJQ1NfRVZFTlRfTkFNRSlcbiAgICAgIDogb2YoKTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIFF1YWx0cmljcyBTaXRlIEludGVyY2VwdCAoUVNJKSBKYXZhU2NyaXB0IEFQSSB3aGVuZXZlciBhdmFpbGFibGUuXG4gICAqXG4gICAqIFRoZSBBUEkgaXMgZW1pdHRlZCB3aGVuIHRoZSBKYXZhU2NyaXB0IHJlc291cmNlIGhvbGRpbmcgdGhpcyBBUEkgaXMgZnVsbHkgbG9hZGVkLlxuICAgKiBUaGUgQVBJIGlzIGFsc28gc3RvcmVkIGxvY2FsbHkgaW4gdGhlIHNlcnZpY2UsIGluIGNhc2UgaXQncyByZXF1aXJlZCBsYXRlciBvbi5cbiAgICovXG4gIHByb3RlY3RlZCBxc2kkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLnFzaUxvYWRlZCQucGlwZShcbiAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5pc0RhdGFMb2FkZWQoKSksXG4gICAgbWFwKChkYXRhTG9hZGVkOiBib29sZWFuKSA9PiAoZGF0YUxvYWRlZCA/IHRoaXMud2luZG93Py5RU0kgOiBFTVBUWSkpLFxuICAgIGZpbHRlcigocXNpOiBhbnkpID0+IEJvb2xlYW4ocXNpKSksXG4gICAgdGFwKChxc2k6IGFueSkgPT4gKHRoaXMucXNpQXBpID0gcXNpKSlcbiAgKTtcblxuICBnZXQgd2luZG93KCk6IFF1YWx0cmljc1dpbmRvdyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm1JZDogYW55LFxuICAgIHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlclxuICApIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBkZXBsb3ltZW50IHNjcmlwdCB0byB0aGUgRE9NLlxuICAgKlxuICAgKiBUaGUgc2NyaXB0IHdpbGwgbm90IGJlIGFkZGVkIHR3aWNlIGlmIGl0IHdhcyBsb2FkZWQgYmVmb3JlLiBJbiB0aGF0IGNhc2UsIHdlIHVzZVxuICAgKiB0aGUgUXVhbHRyaWNzIEFQSSBkaXJlY3RseSB0byBfdW5sb2FkXyBhbmQgX3J1bl8gdGhlIHByb2plY3QuXG4gICAqL1xuICBhZGRTY3JpcHQoc2NyaXB0U291cmNlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXNTY3JpcHQoc2NyaXB0U291cmNlKSkge1xuICAgICAgdGhpcy5ydW4odHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NyaXB0TG9hZGVyLmVtYmVkU2NyaXB0KHtcbiAgICAgICAgc3JjOiBzY3JpcHRTb3VyY2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBzY3JpcHQgaXMgYWxyZWFkeSBhZGRlZCB0byB0aGUgRE9NLlxuICAgKi9cbiAgaGFzU2NyaXB0KHNvdXJjZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmM9XCIke3NvdXJjZX1cIl1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgb2JzZXJ2aW5nIHRoZSBRdWFsdHJpY3MgaW50ZWdyYXRpb24uIFRoZSBpbnRlZ3JhdGlvbiBpcyBiYXNlZCBvbiBhXG4gICAqIFF1YWx0cmljcyBzcGVjaWZpYyBldmVudCAoYHFzaV9qc19sb2FkZWRgKS4gQXMgc29vbiBhcyB0aGlzIGV2ZW50cyBoYXBwZW5zLFxuICAgKiB3ZSBydW4gdGhlIEFQSS5cbiAgICovXG4gIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnFzaSQuc3Vic2NyaWJlKCgpID0+IHRoaXMucnVuKCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgdGhlIFF1YWx0cmljcyBwcm9qZWN0IGNvZGUgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogSW4gb3JkZXIgdG8gcmVsb2FkIHRoZSBldmFsdWF0aW9uIGluIFF1YWx0cmljcywgdGhlIEFQSSByZXF1aXJlcyB0byB1bmxvYWQgdGhlIEFQSSBiZWZvcmVcbiAgICogcnVubmluZyBpdCBhZ2Fpbi4gV2UgZG9uJ3QgZG8gdGhpcyBieSBkZWZhdWx0LCBidXQgb2ZmZXIgYSBmbGFnIHRvIGNvbmRpdGlvbmFsbHkgdW5sb2FkIHRoZSBBUEkuXG4gICAqL1xuICBwcm90ZWN0ZWQgcnVuKHJlbG9hZCA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnFzaUFwaT8uQVBJKSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1RoZSBRU0kgYXBpIGlzIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVsb2FkKSB7XG4gICAgICAvLyBSZW1vdmVzIGFueSBjdXJyZW50bHkgZGlzcGxheWluZyBjcmVhdGl2ZXNcbiAgICAgIHRoaXMucXNpQXBpLkFQSS51bmxvYWQoKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydHMgdGhlIGludGVyY2VwdCBjb2RlIGV2YWx1YXRpb24gcmlnaHQgYWZ0ZXIgbG9hZGluZyB0aGUgU2l0ZSBJbnRlcmNlcHRcbiAgICAvLyBjb2RlIGZvciBhbnkgZGVmaW5lZCBpbnRlcmNlcHRzIG9yIGNyZWF0aXZlc1xuICAgIHRoaXMucXNpQXBpLkFQSS5sb2FkKCkuZG9uZSh0aGlzLnFzaUFwaS5BUEkucnVuKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbG9naWMgZXhpc3QgaW4gb3JkZXIgdG8gbGV0IHRoZSBjbGllbnQocykgYWRkIHRoZWlyIG93biBsb2dpYyB0byB3YWl0IGZvciBhbnkga2luZCBvZiBwYWdlIGRhdGEuXG4gICAqIFlvdSBjYW4gb2JzZXJ2ZSBhbnkgZGF0YSBpbiB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIHByb3RlY3RlZCBpc0RhdGFMb2FkZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG9mKHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==