/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, iif, isObservable, merge, of, Subscription, using, } from 'rxjs';
import { catchError, distinctUntilChanged, pluck, share, switchMapTo, takeUntil, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../event/event.service";
export class QueryService {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
    }
    create(loaderFactory, options) {
        const initialState = {
            data: undefined,
            error: false,
            loading: true,
        };
        const state$ = new BehaviorSubject(initialState);
        // if the query will be unsubscribed from while the data is being loaded, we will end up with the loading flag set to true
        // we want to retry this load on next subscription
        const onSubscribeLoad$ = iif(() => state$.value.loading, of(undefined));
        const loadTrigger$ = this.getTriggersStream([
            onSubscribeLoad$,
            ...(options?.reloadOn ?? []),
            ...(options?.resetOn ?? []),
        ]);
        const resetTrigger$ = this.getTriggersStream(options?.resetOn ?? []);
        const reloadTrigger$ = this.getTriggersStream(options?.reloadOn ?? []);
        const load$ = loadTrigger$.pipe(tap(() => {
            if (!state$.value.loading) {
                state$.next({ ...state$.value, loading: true });
            }
        }), switchMapTo(loaderFactory().pipe(takeUntil(resetTrigger$))), tap((data) => {
            state$.next({ loading: false, error: false, data });
        }), catchError((error, sourceStream$) => {
            state$.next({ loading: false, error, data: undefined });
            return sourceStream$;
        }), share());
        // reload logic
        if (options?.reloadOn?.length) {
            this.subscriptions.add(reloadTrigger$.subscribe(() => {
                if (!state$.value.loading) {
                    state$.next({ ...state$.value, loading: true });
                }
            }));
        }
        // reset logic
        if (options?.resetOn?.length) {
            this.subscriptions.add(resetTrigger$.subscribe(() => {
                if (state$.value.data !== undefined ||
                    state$.value.error !== false ||
                    state$.value.loading !== false) {
                    state$.next(initialState);
                }
            }));
        }
        const query$ = using(() => load$.subscribe(), () => state$);
        const data$ = query$.pipe(pluck('data'), distinctUntilChanged());
        return { get: () => data$, getState: () => query$ };
    }
    getTriggersStream(triggers) {
        if (!triggers.length) {
            return EMPTY;
        }
        const observables = triggers.map((trigger) => {
            if (isObservable(trigger)) {
                return trigger;
            }
            return this.eventService.get(trigger);
        });
        return merge(...observables);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
QueryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QueryService, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
QueryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QueryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QueryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3V0aWwvY29tbWFuZC1xdWVyeS9xdWVyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLEtBQUssRUFDTCxHQUFHLEVBQ0gsWUFBWSxFQUNaLEtBQUssRUFFTCxFQUFFLEVBQ0YsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLEtBQUssRUFDTCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBb0J4QixNQUFNLE9BQU8sWUFBWTtJQUd2QixZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ0QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFTSxDQUFDO0lBRXBELE1BQU0sQ0FDSixhQUFrQyxFQUNsQyxPQUtDO1FBRUQsTUFBTSxZQUFZLEdBQWtCO1lBQ2xDLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsWUFBWSxDQUFDLENBQUM7UUFFaEUsMEhBQTBIO1FBQzFILGtEQUFrRDtRQUNsRCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUV4RSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENB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QUFDO0lBQ3RELENBQUM7SUFFUyxpQkFBaUIsQ0FBQyxRQUF5QjtRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNwQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN6QixPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzt5R0F2R1UsWUFBWTs2R0FBWixZQUFZLGNBRlgsTUFBTTsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBFTVBUWSxcbiAgaWlmLFxuICBpc09ic2VydmFibGUsXG4gIG1lcmdlLFxuICBPYnNlcnZhYmxlLFxuICBvZixcbiAgU3Vic2NyaXB0aW9uLFxuICB1c2luZyxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgcGx1Y2ssXG4gIHNoYXJlLFxuICBzd2l0Y2hNYXBUbyxcbiAgdGFrZVVudGlsLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEN4RXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudC9jeC1ldmVudCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9ldmVudC9ldmVudC5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgUXVlcnlOb3RpZmllciA9IE9ic2VydmFibGU8dW5rbm93bj4gfCBUeXBlPEN4RXZlbnQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5U3RhdGU8VD4ge1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBlcnJvcjogZmFsc2UgfCBFcnJvcjtcbiAgZGF0YTogVCB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeTxSRVNVTFQsIFBBUkFNUyBleHRlbmRzIHVua25vd25bXSA9IFtdPiB7XG4gIGdldCguLi5wYXJhbXM6IFBBUkFNUyk6IE9ic2VydmFibGU8UkVTVUxUIHwgdW5kZWZpbmVkPjtcbiAgZ2V0U3RhdGUoLi4ucGFyYW1zOiBQQVJBTVMpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8UkVTVUxUPj47XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVyeVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UpIHt9XG5cbiAgY3JlYXRlPFQ+KFxuICAgIGxvYWRlckZhY3Rvcnk6ICgpID0+IE9ic2VydmFibGU8VD4sXG4gICAgb3B0aW9ucz86IHtcbiAgICAgIC8qKiBSZWxvYWRzIHRoZSBxdWVyeSwgd2hpbGUgcHJlc2VydmluZyB0aGUgYGRhdGFgIHVudGlsIHRoZSBuZXcgZGF0YSBpcyBsb2FkZWQgKi9cbiAgICAgIHJlbG9hZE9uPzogUXVlcnlOb3RpZmllcltdO1xuICAgICAgLyoqIFJlc2V0cyB0aGUgcXVlcnkgdG8gdGhlIGluaXRpYWwgc3RhdGUgKi9cbiAgICAgIHJlc2V0T24/OiBRdWVyeU5vdGlmaWVyW107XG4gICAgfVxuICApOiBRdWVyeTxUPiB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlOiBRdWVyeVN0YXRlPFQ+ID0ge1xuICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxRdWVyeVN0YXRlPFQ+Pihpbml0aWFsU3RhdGUpO1xuXG4gICAgLy8gaWYgdGhlIHF1ZXJ5IHdpbGwgYmUgdW5zdWJzY3JpYmVkIGZyb20gd2hpbGUgdGhlIGRhdGEgaXMgYmVpbmcgbG9hZGVkLCB3ZSB3aWxsIGVuZCB1cCB3aXRoIHRoZSBsb2FkaW5nIGZsYWcgc2V0IHRvIHRydWVcbiAgICAvLyB3ZSB3YW50IHRvIHJldHJ5IHRoaXMgbG9hZCBvbiBuZXh0IHN1YnNjcmlwdGlvblxuICAgIGNvbnN0IG9uU3Vic2NyaWJlTG9hZCQgPSBpaWYoKCkgPT4gc3RhdGUkLnZhbHVlLmxvYWRpbmcsIG9mKHVuZGVmaW5lZCkpO1xuXG4gICAgY29uc3QgbG9hZFRyaWdnZXIkID0gdGhpcy5nZXRUcmlnZ2Vyc1N0cmVhbShbXG4gICAgICBvblN1YnNjcmliZUxvYWQkLCAvLyB3ZSBuZWVkIHRvIGV2YWx1YXRlIG9uU3Vic2NyaWJlTG9hZCQgYmVmb3JlIG90aGVyIHRyaWdnZXJzIGluIG9yZGVyIHRvIGF2b2lkIG90aGVyIHRyaWdnZXJzIGNoYW5naW5nIHN0YXRlJCB2YWx1ZVxuICAgICAgLi4uKG9wdGlvbnM/LnJlbG9hZE9uID8/IFtdKSxcbiAgICAgIC4uLihvcHRpb25zPy5yZXNldE9uID8/IFtdKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IHJlc2V0VHJpZ2dlciQgPSB0aGlzLmdldFRyaWdnZXJzU3RyZWFtKG9wdGlvbnM/LnJlc2V0T24gPz8gW10pO1xuICAgIGNvbnN0IHJlbG9hZFRyaWdnZXIkID0gdGhpcy5nZXRUcmlnZ2Vyc1N0cmVhbShvcHRpb25zPy5yZWxvYWRPbiA/PyBbXSk7XG5cbiAgICBjb25zdCBsb2FkJCA9IGxvYWRUcmlnZ2VyJC5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgaWYgKCFzdGF0ZSQudmFsdWUubG9hZGluZykge1xuICAgICAgICAgIHN0YXRlJC5uZXh0KHsgLi4uc3RhdGUkLnZhbHVlLCBsb2FkaW5nOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcFRvKGxvYWRlckZhY3RvcnkoKS5waXBlKHRha2VVbnRpbChyZXNldFRyaWdnZXIkKSkpLFxuICAgICAgdGFwKChkYXRhKSA9PiB7XG4gICAgICAgIHN0YXRlJC5uZXh0KHsgbG9hZGluZzogZmFsc2UsIGVycm9yOiBmYWxzZSwgZGF0YSB9KTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IsIHNvdXJjZVN0cmVhbSQpID0+IHtcbiAgICAgICAgc3RhdGUkLm5leHQoeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3IsIGRhdGE6IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVN0cmVhbSQ7XG4gICAgICB9KSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgLy8gcmVsb2FkIGxvZ2ljXG4gICAgaWYgKG9wdGlvbnM/LnJlbG9hZE9uPy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHJlbG9hZFRyaWdnZXIkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFzdGF0ZSQudmFsdWUubG9hZGluZykge1xuICAgICAgICAgICAgc3RhdGUkLm5leHQoeyAuLi5zdGF0ZSQudmFsdWUsIGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyByZXNldCBsb2dpY1xuICAgIGlmIChvcHRpb25zPy5yZXNldE9uPy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICAgIHJlc2V0VHJpZ2dlciQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzdGF0ZSQudmFsdWUuZGF0YSAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBzdGF0ZSQudmFsdWUuZXJyb3IgIT09IGZhbHNlIHx8XG4gICAgICAgICAgICBzdGF0ZSQudmFsdWUubG9hZGluZyAhPT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0YXRlJC5uZXh0KGluaXRpYWxTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeSQgPSB1c2luZyhcbiAgICAgICgpID0+IGxvYWQkLnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4gc3RhdGUkXG4gICAgKTtcblxuICAgIGNvbnN0IGRhdGEkID0gcXVlcnkkLnBpcGUocGx1Y2soJ2RhdGEnKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICByZXR1cm4geyBnZXQ6ICgpID0+IGRhdGEkLCBnZXRTdGF0ZTogKCkgPT4gcXVlcnkkIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0VHJpZ2dlcnNTdHJlYW0odHJpZ2dlcnM6IFF1ZXJ5Tm90aWZpZXJbXSk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIGlmICghdHJpZ2dlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gRU1QVFk7XG4gICAgfVxuICAgIGNvbnN0IG9ic2VydmFibGVzID0gdHJpZ2dlcnMubWFwKCh0cmlnZ2VyKSA9PiB7XG4gICAgICBpZiAoaXNPYnNlcnZhYmxlKHRyaWdnZXIpKSB7XG4gICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldCh0cmlnZ2VyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWVyZ2UoLi4ub2JzZXJ2YWJsZXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==