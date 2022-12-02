/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createFrom } from '../util/create-from';
import { CxEvent } from './cx-event';
import { MergingSubject } from './utils/merging-subject';
import * as i0 from "@angular/core";
/**
 * A service to register and observe event sources. Events are driven by event types, which are class signatures
 * for the given event.
 *
 * It is possible to register multiple sources to a single event, even without
 * knowing as multiple decoupled features can attach sources to the same
 * event type.
 */
export class EventService {
    constructor() {
        /**
         * The various events meta are collected in a map, stored by the event type class
         */
        this.eventsMeta = new Map();
    }
    /**
     * Register an event source for the given event type.
     *
     * CAUTION: To avoid memory leaks, the returned teardown function should be called
     *  when the event source is no longer maintained by its creator
     * (i.e. in `ngOnDestroy` if the event source was registered in the component).
     *
     * @since 3.1 - registers the given `source$` for the parent classes of the given `eventType`.
     *
     * @param eventType the event type
     * @param source$ an observable that represents the source
     *
     * @returns a teardown function which unregisters the given event source
     */
    register(eventType, source$) {
        const eventMeta = this.getEventMeta(eventType);
        if (eventMeta.mergingSubject.has(source$)) {
            if (isDevMode()) {
                console.warn(`EventService: the event source`, source$, `has been already registered for the type`, eventType);
            }
        }
        else {
            eventMeta.mergingSubject.add(source$);
        }
        return () => eventMeta.mergingSubject.remove(source$);
    }
    /**
     * Returns a stream of events for the given event type
     * @param eventTypes event type
     */
    get(eventType) {
        let output$ = this.getEventMeta(eventType).mergingSubject.output$;
        if (isDevMode()) {
            output$ = this.getValidatedEventStream(output$, eventType);
        }
        return output$;
    }
    /**
     * Dispatches an instance of an individual event.
     * If the eventType is provided a new event will be created for that type and with the event data.
     *
     * @param event an event
     * @param eventType (optional) - type of event
     */
    dispatch(event, eventType) {
        if (!eventType) {
            eventType = event.constructor;
        }
        else if (!(event instanceof eventType)) {
            event = createFrom(eventType, event);
        }
        const inputSubject$ = this.getInputSubject(eventType);
        inputSubject$.next(event);
    }
    /**
     * Returns the input subject used to dispatch a single event.
     * The subject is created on demand, when it's needed for the first time.
     * @param eventType type of event
     */
    getInputSubject(eventType) {
        const eventMeta = this.getEventMeta(eventType);
        if (!eventMeta.inputSubject$) {
            eventMeta.inputSubject$ = new Subject();
            this.register(eventType, eventMeta.inputSubject$);
        }
        return eventMeta.inputSubject$;
    }
    /**
     * Returns the event meta object for the given event type
     */
    getEventMeta(eventType) {
        if (!this.eventsMeta.get(eventType)) {
            if (isDevMode()) {
                this.validateEventType(eventType);
            }
            this.createEventMeta(eventType);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.eventsMeta.get(eventType);
    }
    createEventMeta(eventType) {
        const eventMeta = {
            inputSubject$: null,
            mergingSubject: new MergingSubject(),
        };
        this.eventsMeta.set(eventType, eventMeta);
        let parentEvent = Object.getPrototypeOf(eventType);
        while (parentEvent !== null &&
            Object.getPrototypeOf(parentEvent) !== Object.getPrototypeOf({})) {
            this.register(parentEvent, eventMeta.mergingSubject.output$);
            parentEvent = Object.getPrototypeOf(parentEvent);
        }
    }
    /**
     * Checks if the event type is a valid type (is a class with constructor).
     *
     * Should be used only in dev mode.
     */
    validateEventType(eventType) {
        if (!eventType?.constructor) {
            throw new Error(`EventService:  ${eventType} is not a valid event type. Please provide a class reference.`);
        }
        this.validateCxEvent(eventType);
    }
    /**
     * Validates if the given type (or its prototype chain) extends from the CxEvent.
     *
     * Should be used only in the dev mode.
     */
    validateCxEvent(eventType) {
        let parentType = eventType;
        while (parentType !== null &&
            Object.getPrototypeOf(parentType) !== Object.getPrototypeOf({})) {
            if (parentType.type === CxEvent.type) {
                return;
            }
            parentType = Object.getPrototypeOf(parentType);
        }
        console.warn(`The ${eventType.name} (or one of its parent classes) does not inherit from the ${CxEvent.type}`);
    }
    /**
     * Returns the given event source with runtime validation whether the emitted values are instances of given event type.
     *
     * Should be used only in dev mode.
     */
    getValidatedEventStream(source$, eventType) {
        return source$.pipe(tap((event) => {
            if (!(event instanceof eventType)) {
                console.warn(`EventService: The stream`, source$, `emitted the event`, event, `that is not an instance of the declared type`, eventType.name);
            }
        }));
    }
}
EventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: EventService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: EventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: EventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2V2ZW50L2V2ZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFNBQVMsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBaUJ6RDs7Ozs7OztHQU9HO0FBSUgsTUFBTSxPQUFPLFlBQVk7SUFIekI7UUFJRTs7V0FFRztRQUNLLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBMkMsQ0FBQztLQTJLekU7SUF6S0M7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFFBQVEsQ0FBSSxTQUEwQixFQUFFLE9BQXNCO1FBQzVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6QyxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsZ0NBQWdDLEVBQ2hDLE9BQU8sRUFDUCwwQ0FBMEMsRUFDMUMsU0FBUyxDQUNWLENBQUM7YUFDSDtTQUNGO2FBQU07WUFDTCxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztRQUVELE9BQU8sR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLGNB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Q0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssZUFBZSxDQUFJLFNBQTBCO1FBQ25ELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUMzQixPQUNFLFVBQVUsS0FBSyxJQUFJO1lBQ25CLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFDL0Q7WUFDQSxJQUFLLFVBQWtCLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQzdDLE9BQU87YUFDUjtZQUVELFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FDVixPQUFPLFNBQVMsQ0FBQyxJQUFJLDZEQUE2RCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQ2pHLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHVCQUF1QixDQUM3QixPQUFzQixFQUN0QixTQUEwQjtRQUUxQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQ2pCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLENBQUMsS0FBSyxZQUFZLFNBQVMsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUNWLDBCQUEwQixFQUMxQixPQUFPLEVBQ1AsbUJBQW1CLEVBQ25CLEtBQUssRUFDTCw4Q0FBOEMsRUFDOUMsU0FBUyxDQUFDLElBQUksQ0FDZixDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7eUdBOUtVLFlBQVk7NkdBQVosWUFBWSxjQUZYLE1BQU07MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBYnN0cmFjdFR5cGUsIEluamVjdGFibGUsIGlzRGV2TW9kZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY3JlYXRlRnJvbSB9IGZyb20gJy4uL3V0aWwvY3JlYXRlLWZyb20nO1xuaW1wb3J0IHsgQ3hFdmVudCB9IGZyb20gJy4vY3gtZXZlbnQnO1xuaW1wb3J0IHsgTWVyZ2luZ1N1YmplY3QgfSBmcm9tICcuL3V0aWxzL21lcmdpbmctc3ViamVjdCc7XG5cbi8qKlxuICogVGhlIG9iamVjdCBob2xkcyByZWdpc3RlcmVkIHNvdXJjZSBvYnNlcnZhYmxlcyBhcyB3ZWxsIGFzIHRoZSBtZXJnZWQgcmVzdWx0IG9ic2VydmFibGUuXG4gKi9cbmludGVyZmFjZSBFdmVudE1ldGE8VD4ge1xuICAvKipcbiAgICogSW5wdXQgc3ViamVjdCB1c2VkIGZvciBkaXNwYXRjaGluZyBvY2Nhc2lvbmFsIGV2ZW50ICh3aXRob3V0IHJlZ2lzdGVyaW5nIGEgc291cmNlKVxuICAgKi9cbiAgaW5wdXRTdWJqZWN0JDogU3ViamVjdDxUPiB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHN1YmplY3QgdGhhdCBhbGxvd3MgZm9yIGR5bmFtaWMgYWRkaW5nIGFuZCByZW1vdmluZyBzb3VyY2VzIHRvIGJlIG1lcmdlZCBhcyBhbiBvdXRwdXRcbiAgICovXG4gIG1lcmdpbmdTdWJqZWN0OiBNZXJnaW5nU3ViamVjdDxUPjtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgdG8gcmVnaXN0ZXIgYW5kIG9ic2VydmUgZXZlbnQgc291cmNlcy4gRXZlbnRzIGFyZSBkcml2ZW4gYnkgZXZlbnQgdHlwZXMsIHdoaWNoIGFyZSBjbGFzcyBzaWduYXR1cmVzXG4gKiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEl0IGlzIHBvc3NpYmxlIHRvIHJlZ2lzdGVyIG11bHRpcGxlIHNvdXJjZXMgdG8gYSBzaW5nbGUgZXZlbnQsIGV2ZW4gd2l0aG91dFxuICoga25vd2luZyBhcyBtdWx0aXBsZSBkZWNvdXBsZWQgZmVhdHVyZXMgY2FuIGF0dGFjaCBzb3VyY2VzIHRvIHRoZSBzYW1lXG4gKiBldmVudCB0eXBlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFRoZSB2YXJpb3VzIGV2ZW50cyBtZXRhIGFyZSBjb2xsZWN0ZWQgaW4gYSBtYXAsIHN0b3JlZCBieSB0aGUgZXZlbnQgdHlwZSBjbGFzc1xuICAgKi9cbiAgcHJpdmF0ZSBldmVudHNNZXRhID0gbmV3IE1hcDxBYnN0cmFjdFR5cGU8YW55PiB8IGFueSwgRXZlbnRNZXRhPGFueT4+KCk7XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGV2ZW50IHNvdXJjZSBmb3IgdGhlIGdpdmVuIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIENBVVRJT046IFRvIGF2b2lkIG1lbW9yeSBsZWFrcywgdGhlIHJldHVybmVkIHRlYXJkb3duIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWRcbiAgICogIHdoZW4gdGhlIGV2ZW50IHNvdXJjZSBpcyBubyBsb25nZXIgbWFpbnRhaW5lZCBieSBpdHMgY3JlYXRvclxuICAgKiAoaS5lLiBpbiBgbmdPbkRlc3Ryb3lgIGlmIHRoZSBldmVudCBzb3VyY2Ugd2FzIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbXBvbmVudCkuXG4gICAqXG4gICAqIEBzaW5jZSAzLjEgLSByZWdpc3RlcnMgdGhlIGdpdmVuIGBzb3VyY2UkYCBmb3IgdGhlIHBhcmVudCBjbGFzc2VzIG9mIHRoZSBnaXZlbiBgZXZlbnRUeXBlYC5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50VHlwZSB0aGUgZXZlbnQgdHlwZVxuICAgKiBAcGFyYW0gc291cmNlJCBhbiBvYnNlcnZhYmxlIHRoYXQgcmVwcmVzZW50cyB0aGUgc291cmNlXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVhcmRvd24gZnVuY3Rpb24gd2hpY2ggdW5yZWdpc3RlcnMgdGhlIGdpdmVuIGV2ZW50IHNvdXJjZVxuICAgKi9cbiAgcmVnaXN0ZXI8VD4oZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD4sIHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBldmVudE1ldGEgPSB0aGlzLmdldEV2ZW50TWV0YShldmVudFR5cGUpO1xuICAgIGlmIChldmVudE1ldGEubWVyZ2luZ1N1YmplY3QuaGFzKHNvdXJjZSQpKSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBFdmVudFNlcnZpY2U6IHRoZSBldmVudCBzb3VyY2VgLFxuICAgICAgICAgIHNvdXJjZSQsXG4gICAgICAgICAgYGhhcyBiZWVuIGFscmVhZHkgcmVnaXN0ZXJlZCBmb3IgdGhlIHR5cGVgLFxuICAgICAgICAgIGV2ZW50VHlwZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBldmVudE1ldGEubWVyZ2luZ1N1YmplY3QuYWRkKHNvdXJjZSQpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBldmVudE1ldGEubWVyZ2luZ1N1YmplY3QucmVtb3ZlKHNvdXJjZSQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJlYW0gb2YgZXZlbnRzIGZvciB0aGUgZ2l2ZW4gZXZlbnQgdHlwZVxuICAgKiBAcGFyYW0gZXZlbnRUeXBlcyBldmVudCB0eXBlXG4gICAqL1xuICBnZXQ8VD4oZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBsZXQgb3V0cHV0JCA9IHRoaXMuZ2V0RXZlbnRNZXRhKGV2ZW50VHlwZSkubWVyZ2luZ1N1YmplY3Qub3V0cHV0JDtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIG91dHB1dCQgPSB0aGlzLmdldFZhbGlkYXRlZEV2ZW50U3RyZWFtKG91dHB1dCQsIGV2ZW50VHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQkO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gaW5zdGFuY2Ugb2YgYW4gaW5kaXZpZHVhbCBldmVudC5cbiAgICogSWYgdGhlIGV2ZW50VHlwZSBpcyBwcm92aWRlZCBhIG5ldyBldmVudCB3aWxsIGJlIGNyZWF0ZWQgZm9yIHRoYXQgdHlwZSBhbmQgd2l0aCB0aGUgZXZlbnQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50IGFuIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFR5cGUgKG9wdGlvbmFsKSAtIHR5cGUgb2YgZXZlbnRcbiAgICovXG4gIGRpc3BhdGNoPFQgZXh0ZW5kcyBvYmplY3Q+KGV2ZW50OiBULCBldmVudFR5cGU/OiBUeXBlPFQ+KTogdm9pZCB7XG4gICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgIGV2ZW50VHlwZSA9IGV2ZW50LmNvbnN0cnVjdG9yIGFzIFR5cGU8VD47XG4gICAgfSBlbHNlIGlmICghKGV2ZW50IGluc3RhbmNlb2YgZXZlbnRUeXBlKSkge1xuICAgICAgZXZlbnQgPSBjcmVhdGVGcm9tKGV2ZW50VHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICBjb25zdCBpbnB1dFN1YmplY3QkID0gdGhpcy5nZXRJbnB1dFN1YmplY3QoZXZlbnRUeXBlKTtcbiAgICBpbnB1dFN1YmplY3QkLm5leHQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlucHV0IHN1YmplY3QgdXNlZCB0byBkaXNwYXRjaCBhIHNpbmdsZSBldmVudC5cbiAgICogVGhlIHN1YmplY3QgaXMgY3JlYXRlZCBvbiBkZW1hbmQsIHdoZW4gaXQncyBuZWVkZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKiBAcGFyYW0gZXZlbnRUeXBlIHR5cGUgb2YgZXZlbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0SW5wdXRTdWJqZWN0PFQ+KGV2ZW50VHlwZTogQWJzdHJhY3RUeXBlPFQ+KTogU3ViamVjdDxUPiB7XG4gICAgY29uc3QgZXZlbnRNZXRhID0gdGhpcy5nZXRFdmVudE1ldGEoZXZlbnRUeXBlKTtcblxuICAgIGlmICghZXZlbnRNZXRhLmlucHV0U3ViamVjdCQpIHtcbiAgICAgIGV2ZW50TWV0YS5pbnB1dFN1YmplY3QkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgICAgdGhpcy5yZWdpc3RlcihldmVudFR5cGUsIGV2ZW50TWV0YS5pbnB1dFN1YmplY3QkKTtcbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50TWV0YS5pbnB1dFN1YmplY3QkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGV2ZW50IG1ldGEgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gZXZlbnQgdHlwZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRFdmVudE1ldGE8VD4oZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD4pOiBFdmVudE1ldGE8VD4ge1xuICAgIGlmICghdGhpcy5ldmVudHNNZXRhLmdldChldmVudFR5cGUpKSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUV2ZW50VHlwZShldmVudFR5cGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5jcmVhdGVFdmVudE1ldGEoZXZlbnRUeXBlKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICByZXR1cm4gdGhpcy5ldmVudHNNZXRhLmdldChldmVudFR5cGUpITtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRXZlbnRNZXRhPFQ+KGV2ZW50VHlwZTogQWJzdHJhY3RUeXBlPFQ+KTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnRNZXRhOiBFdmVudE1ldGE8VD4gPSB7XG4gICAgICBpbnB1dFN1YmplY3QkOiBudWxsLCAvLyB3aWxsIGJlIGNyZWF0ZWQgbGF6aWx5IGJ5IHRoZSBgZGlzcGF0Y2hgIG1ldGhvZFxuICAgICAgbWVyZ2luZ1N1YmplY3Q6IG5ldyBNZXJnaW5nU3ViamVjdDxUPigpLFxuICAgIH07XG4gICAgdGhpcy5ldmVudHNNZXRhLnNldChldmVudFR5cGUsIGV2ZW50TWV0YSk7XG5cbiAgICBsZXQgcGFyZW50RXZlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZXZlbnRUeXBlKTtcbiAgICB3aGlsZSAoXG4gICAgICBwYXJlbnRFdmVudCAhPT0gbnVsbCAmJlxuICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudEV2ZW50KSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KVxuICAgICkge1xuICAgICAgdGhpcy5yZWdpc3RlcihwYXJlbnRFdmVudCwgZXZlbnRNZXRhLm1lcmdpbmdTdWJqZWN0Lm91dHB1dCQpO1xuICAgICAgcGFyZW50RXZlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50RXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGV2ZW50IHR5cGUgaXMgYSB2YWxpZCB0eXBlIChpcyBhIGNsYXNzIHdpdGggY29uc3RydWN0b3IpLlxuICAgKlxuICAgKiBTaG91bGQgYmUgdXNlZCBvbmx5IGluIGRldiBtb2RlLlxuICAgKi9cbiAgcHJpdmF0ZSB2YWxpZGF0ZUV2ZW50VHlwZTxUPihldmVudFR5cGU6IEFic3RyYWN0VHlwZTxUPik6IHZvaWQge1xuICAgIGlmICghZXZlbnRUeXBlPy5jb25zdHJ1Y3Rvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRXZlbnRTZXJ2aWNlOiAgJHtldmVudFR5cGV9IGlzIG5vdCBhIHZhbGlkIGV2ZW50IHR5cGUuIFBsZWFzZSBwcm92aWRlIGEgY2xhc3MgcmVmZXJlbmNlLmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZUN4RXZlbnQoZXZlbnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgaWYgdGhlIGdpdmVuIHR5cGUgKG9yIGl0cyBwcm90b3R5cGUgY2hhaW4pIGV4dGVuZHMgZnJvbSB0aGUgQ3hFdmVudC5cbiAgICpcbiAgICogU2hvdWxkIGJlIHVzZWQgb25seSBpbiB0aGUgZGV2IG1vZGUuXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlQ3hFdmVudDxUPihldmVudFR5cGU6IEFic3RyYWN0VHlwZTxUPik6IHZvaWQge1xuICAgIGxldCBwYXJlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgIHdoaWxlIChcbiAgICAgIHBhcmVudFR5cGUgIT09IG51bGwgJiZcbiAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnRUeXBlKSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KVxuICAgICkge1xuICAgICAgaWYgKChwYXJlbnRUeXBlIGFzIGFueSkudHlwZSA9PT0gQ3hFdmVudC50eXBlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcGFyZW50VHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnRUeXBlKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBgVGhlICR7ZXZlbnRUeXBlLm5hbWV9IChvciBvbmUgb2YgaXRzIHBhcmVudCBjbGFzc2VzKSBkb2VzIG5vdCBpbmhlcml0IGZyb20gdGhlICR7Q3hFdmVudC50eXBlfWBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIGV2ZW50IHNvdXJjZSB3aXRoIHJ1bnRpbWUgdmFsaWRhdGlvbiB3aGV0aGVyIHRoZSBlbWl0dGVkIHZhbHVlcyBhcmUgaW5zdGFuY2VzIG9mIGdpdmVuIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIFNob3VsZCBiZSB1c2VkIG9ubHkgaW4gZGV2IG1vZGUuXG4gICAqL1xuICBwcml2YXRlIGdldFZhbGlkYXRlZEV2ZW50U3RyZWFtPFQ+KFxuICAgIHNvdXJjZSQ6IE9ic2VydmFibGU8VD4sXG4gICAgZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD5cbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICAgIHRhcCgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBldmVudFR5cGUpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYEV2ZW50U2VydmljZTogVGhlIHN0cmVhbWAsXG4gICAgICAgICAgICBzb3VyY2UkLFxuICAgICAgICAgICAgYGVtaXR0ZWQgdGhlIGV2ZW50YCxcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgYHRoYXQgaXMgbm90IGFuIGluc3RhbmNlIG9mIHRoZSBkZWNsYXJlZCB0eXBlYCxcbiAgICAgICAgICAgIGV2ZW50VHlwZS5uYW1lXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=