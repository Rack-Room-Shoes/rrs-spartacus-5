/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, map, mergeMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/layout-config";
/**
 * The IntersectionService uses the native IntersectionObserver (v2), which
 * can be used to implement pre-loading and deferred loading of DOM content.
 *
 */
export class IntersectionService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns an Observable that emits only once a boolean value whenever
     * the given element has shown in the view port.
     *
     * The returned observable will only emit the first value. The
     * observable must be cleaned up either way, since the value might never emit; it
     *  depends on whether the element appears in the view port.
     */
    isIntersected(element, options) {
        return this.intersects(element, options).pipe(first((v) => v === true));
    }
    /**
     * Returns an observable that emits for every change of intersection of a given element
     * @param  element - HTML element
     * @param  options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
     * @returns Element intersects?
     */
    isIntersecting(element, options) {
        return this.intersects(element, options);
    }
    /**
     * Indicates whenever the element intersects the view port. An optional margin
     * is used to intersects before the element shows up in the viewport.
     * A value is emitted each time the element intersects.
     */
    intersects(element, options = {}) {
        const elementVisible$ = new Observable((observer) => {
            const rootMargin = this.getRootMargin(options);
            const intersectOptions = { rootMargin, threshold: options.threshold };
            const intersectionObserver = new IntersectionObserver((entries) => {
                observer.next(entries);
            }, intersectOptions);
            intersectionObserver.observe(element);
            return () => {
                intersectionObserver.disconnect();
            };
        }).pipe(mergeMap((entries) => entries), map((entry) => entry.isIntersecting), distinctUntilChanged());
        return elementVisible$;
    }
    getRootMargin(options = {}) {
        if (options.rootMargin) {
            return options.rootMargin;
        }
        const layoutConfig = this.config;
        if (layoutConfig.deferredLoading &&
            layoutConfig.deferredLoading.intersectionMargin) {
            return layoutConfig.deferredLoading.intersectionMargin;
        }
    }
}
IntersectionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: IntersectionService, deps: [{ token: i1.LayoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
IntersectionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: IntersectionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: IntersectionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.LayoutConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJzZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9sb2FkaW5nL2ludGVyc2VjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUk1RTs7OztHQUlHO0FBSUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFzQixNQUFvQjtRQUFwQixXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQUcsQ0FBQztJQUU5Qzs7Ozs7OztPQU9HO0lBQ0gsYUFBYSxDQUNYLE9BQW9CLEVBQ3BCLE9BQTZCO1FBRTdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUNaLE9BQW9CLEVBQ3BCLE9BQTZCO1FBRTdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxVQUFVLENBQ2hCLE9BQW9CLEVBQ3BCLFVBQStCLEVBQUU7UUFFakMsTUFBTSxlQUFlLEdBQUcsSUFBSSxVQUFVLENBQ3BDLENBQUMsUUFBK0MsRUFBRSxFQUFFO1lBQ2xELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RFLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNoRSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JCLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxPQUFPLEdBQUcsRUFBRTtnQkFDVixvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQyxJQUFJLENBQ0osUUFBUSxDQUFDLENBQUMsT0FBb0MsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQzNELEdBQUcsQ0FBQyxDQUFDLEtBQWdDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFDL0Qsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztRQUVGLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxhQUFhLENBQUMsVUFBK0IsRUFBRTtRQUNyRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzNCO1FBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQXNCLENBQUM7UUFDakQsSUFDRSxZQUFZLENBQUMsZUFBZTtZQUM1QixZQUFZLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUMvQztZQUNBLE9BQU8sWUFBWSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQztTQUN4RDtJQUNILENBQUM7O2dIQXhFVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpcnN0LCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2xheW91dC1jb25maWcnO1xuaW1wb3J0IHsgSW50ZXJzZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJzZWN0aW9uLm1vZGVsJztcblxuLyoqXG4gKiBUaGUgSW50ZXJzZWN0aW9uU2VydmljZSB1c2VzIHRoZSBuYXRpdmUgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKHYyKSwgd2hpY2hcbiAqIGNhbiBiZSB1c2VkIHRvIGltcGxlbWVudCBwcmUtbG9hZGluZyBhbmQgZGVmZXJyZWQgbG9hZGluZyBvZiBET00gY29udGVudC5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJbnRlcnNlY3Rpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogTGF5b3V0Q29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBvbmx5IG9uY2UgYSBib29sZWFuIHZhbHVlIHdoZW5ldmVyXG4gICAqIHRoZSBnaXZlbiBlbGVtZW50IGhhcyBzaG93biBpbiB0aGUgdmlldyBwb3J0LlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgb2JzZXJ2YWJsZSB3aWxsIG9ubHkgZW1pdCB0aGUgZmlyc3QgdmFsdWUuIFRoZVxuICAgKiBvYnNlcnZhYmxlIG11c3QgYmUgY2xlYW5lZCB1cCBlaXRoZXIgd2F5LCBzaW5jZSB0aGUgdmFsdWUgbWlnaHQgbmV2ZXIgZW1pdDsgaXRcbiAgICogIGRlcGVuZHMgb24gd2hldGhlciB0aGUgZWxlbWVudCBhcHBlYXJzIGluIHRoZSB2aWV3IHBvcnQuXG4gICAqL1xuICBpc0ludGVyc2VjdGVkKFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIG9wdGlvbnM/OiBJbnRlcnNlY3Rpb25PcHRpb25zXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmludGVyc2VjdHMoZWxlbWVudCwgb3B0aW9ucykucGlwZShmaXJzdCgodikgPT4gdiA9PT0gdHJ1ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGZvciBldmVyeSBjaGFuZ2Ugb2YgaW50ZXJzZWN0aW9uIG9mIGEgZ2l2ZW4gZWxlbWVudFxuICAgKiBAcGFyYW0gIGVsZW1lbnQgLSBIVE1MIGVsZW1lbnRcbiAgICogQHBhcmFtICBvcHRpb25zIC0gQWxsb3dzIHRvIHNwZWNpZnkgYW4gb3B0aW9uYWwgcm9vdCBtYXJnaW4sIGluIG9yZGVyIHRvIGZpcmUgYmVmb3JlIHRoZSBlbGVtZW50IHNob3dzIHVwIGluIHRoZSB2aWV3cG9ydFxuICAgKiBAcmV0dXJucyBFbGVtZW50IGludGVyc2VjdHM/XG4gICAqL1xuICBpc0ludGVyc2VjdGluZyhcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBvcHRpb25zPzogSW50ZXJzZWN0aW9uT3B0aW9uc1xuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3RzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGVuZXZlciB0aGUgZWxlbWVudCBpbnRlcnNlY3RzIHRoZSB2aWV3IHBvcnQuIEFuIG9wdGlvbmFsIG1hcmdpblxuICAgKiBpcyB1c2VkIHRvIGludGVyc2VjdHMgYmVmb3JlIHRoZSBlbGVtZW50IHNob3dzIHVwIGluIHRoZSB2aWV3cG9ydC5cbiAgICogQSB2YWx1ZSBpcyBlbWl0dGVkIGVhY2ggdGltZSB0aGUgZWxlbWVudCBpbnRlcnNlY3RzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbnRlcnNlY3RzKFxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIG9wdGlvbnM6IEludGVyc2VjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBlbGVtZW50VmlzaWJsZSQgPSBuZXcgT2JzZXJ2YWJsZShcbiAgICAgIChvYnNlcnZlcjogT2JzZXJ2ZXI8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdPikgPT4ge1xuICAgICAgICBjb25zdCByb290TWFyZ2luID0gdGhpcy5nZXRSb290TWFyZ2luKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBpbnRlcnNlY3RPcHRpb25zID0geyByb290TWFyZ2luLCB0aHJlc2hvbGQ6IG9wdGlvbnMudGhyZXNob2xkIH07XG4gICAgICAgIGNvbnN0IGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChlbnRyaWVzKTtcbiAgICAgICAgfSwgaW50ZXJzZWN0T3B0aW9ucyk7XG4gICAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICkucGlwZShcbiAgICAgIG1lcmdlTWFwKChlbnRyaWVzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10pID0+IGVudHJpZXMpLFxuICAgICAgbWFwKChlbnRyeTogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkgPT4gZW50cnkuaXNJbnRlcnNlY3RpbmcpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG5cbiAgICByZXR1cm4gZWxlbWVudFZpc2libGUkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb290TWFyZ2luKG9wdGlvbnM6IEludGVyc2VjdGlvbk9wdGlvbnMgPSB7fSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKG9wdGlvbnMucm9vdE1hcmdpbikge1xuICAgICAgcmV0dXJuIG9wdGlvbnMucm9vdE1hcmdpbjtcbiAgICB9XG4gICAgY29uc3QgbGF5b3V0Q29uZmlnID0gdGhpcy5jb25maWcgYXMgTGF5b3V0Q29uZmlnO1xuICAgIGlmIChcbiAgICAgIGxheW91dENvbmZpZy5kZWZlcnJlZExvYWRpbmcgJiZcbiAgICAgIGxheW91dENvbmZpZy5kZWZlcnJlZExvYWRpbmcuaW50ZXJzZWN0aW9uTWFyZ2luXG4gICAgKSB7XG4gICAgICByZXR1cm4gbGF5b3V0Q29uZmlnLmRlZmVycmVkTG9hZGluZy5pbnRlcnNlY3Rpb25NYXJnaW47XG4gICAgfVxuICB9XG59XG4iXX0=