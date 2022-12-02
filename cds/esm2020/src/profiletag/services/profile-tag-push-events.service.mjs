/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartAddEntrySuccessEvent, CartPageEvent, CartRemoveEntrySuccessEvent, CartUpdateEntrySuccessEvent, } from '@spartacus/cart/base/root';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { CategoryPageResultsEvent, HomePageEvent, PageEvent, ProductDetailsPageEvent, SearchPageResultsEvent, } from '@spartacus/storefront';
import { merge, of } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, map, mapTo, pairwise, startWith, switchMapTo, withLatestFrom, } from 'rxjs/operators';
import { AddedToCartPushEvent, CartSnapshotPushEvent, CartViewPushEvent, CategoryViewPushEvent, HomePageViewPushEvent, KeywordSearchPushEvent, ModifiedCartPushEvent, NavigatedPushEvent, OrderConfirmationPushEvent, ProductViewPushEvent, RemovedFromCartPushEvent, } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/tracking/personalization/core";
import * as i3 from "@spartacus/cart/base/root";
/**
 * A service to convert spartacus events into profiletag push events that can be picked up and processed by profiletag.
 * The service observes the event service and the active cart service for supported events. These events are parsed into
 * a profiletag compliant format and enriched by segments and actions from the latest personalization context.
 *
 * Currently supported events from the event service:
 *  - CartPageVisited
 *  - CategoryPageVisited
 *  - HomePageVisited
 *  - KeywordSearchPageVisited
 *  - OrderConfirmationPageVisited
 *  - PageVisited
 *  - ProductDetailsPageVisited
 *  - CartAddEntrySuccessEvent
 *  - CartRemoveEntrySuccessEvent
 *  - CartUpdateEntrySuccessEvent
 */
export class ProfileTagPushEventsService {
    constructor(eventService, personalizationContextService, activeCartFacade) {
        this.eventService = eventService;
        this.personalizationContextService = personalizationContextService;
        this.activeCartFacade = activeCartFacade;
        this.pushEvents$ = merge(this.categoryPageVisited(), this.productDetailsPageView(), this.searchResultsChanged(), this.homePageVisitedEvent(), this.cartPageVisitedEvent(), this.navigatedEvent(), this.orderConfirmationPageVisited(), this.addedToCart(), this.removedFromCart(), this.modifiedCart(), this.cartChangedEvent());
    }
    /**
     * Returns a push event emitting observable that emits all converted events emitted by the event or the active cart service.
     * These events are enriched with segments and actions from the latest personalization context.
     *
     * @returns an observable emitting profiletag push events
     */
    getPushEvents() {
        return this.pushEvents$.pipe(withLatestFrom(merge(of({ segments: undefined, actions: undefined }), this.personalizationContextService.getPersonalizationContext())), map(([item, personalizationContext]) => {
            item.data = item.data ? item.data : {};
            item.data.segments = personalizationContext?.segments;
            item.data.actions = personalizationContext?.actions;
            return item;
        }));
    }
    /**
     * Adds a new push event emitting observable to this service. This observable will be merged with the internal one.
     * This method can be used to extend the functionality of this service at runtime.
     *
     * @param event an observable emitting profiltag push events
     */
    addPushEvent(event) {
        this.pushEvents$ = merge(this.pushEvents$, event);
    }
    /**
     * Emits the category page visited event.
     *
     * @returns an observable emitting events that describe category page visits in a profiltag compliant way
     * @see CategoryPageResultsEvent
     * @see CategoryViewPushEvent
     */
    categoryPageVisited() {
        return this.eventService.get(CategoryPageResultsEvent).pipe(withLatestFrom(this.eventService.get(PageEvent).pipe(startWith(null), // https://github.com/ReactiveX/rxjs/issues/4772
        pairwise())), distinctUntilChanged(([previouslyEmittedCategoryPage], [currentCategoryPage, [previousRoute, currentRoute]]) => {
            return (previouslyEmittedCategoryPage.categoryCode ===
                currentCategoryPage.categoryCode &&
                previousRoute.navigation.semanticRoute ===
                    currentRoute.navigation.semanticRoute); // A true means that this item is not unique, so this is hard to wrap your head around.
            // What we are saying, is that if the categoryCode is the same AND the last emitted semantic route is the same
            // then this is a duplicate (I.E. via a facet change). In other words, no other page type was visited, and we are on the same categorycode
        }), map(([categoryPageEvent]) => new CategoryViewPushEvent({
            productCategory: categoryPageEvent.categoryCode,
            productCategoryName: categoryPageEvent.categoryName,
        })));
    }
    /**
     * Listens to SearchPageResultsEvent events
     *
     * @returns an observable emitting events that describe keyword search page visits in a profiltag compliant way
     * @see SearchPageResultsEvent
     * @see KeywordSearchPushEvent
     */
    searchResultsChanged() {
        return this.eventService.get(SearchPageResultsEvent).pipe(distinctUntilKeyChanged('searchTerm'), map((searchEvent) => new KeywordSearchPushEvent({
            searchTerm: searchEvent.searchTerm,
            numResults: searchEvent.numberOfResults,
        })));
    }
    /**
     * Listens to ProductDetailsPageEvent events
     *
     * @returns an observable emitting events that describe product detail page visits in a profiltag compliant way
     * @see ProductDetailsPageEvent
     * @see ProductViewPushEvent
     */
    productDetailsPageView() {
        return this.eventService.get(ProductDetailsPageEvent).pipe(map((item) => new ProductViewPushEvent({
            productSku: item.code,
            productName: item.name,
            productPrice: item.price ? item.price.value : undefined,
            productCategoryName: item.categories
                ? item.categories[item.categories.length - 1].name
                : undefined,
            productCategory: item.categories
                ? item.categories[item.categories.length - 1].code
                : undefined,
            categories: this.categoriesToIds(item.categories),
        })));
    }
    /**
     * Listens to PageVisited events
     *
     * @returns an observable emitting events that describe page visits in a profiltag compliant way
     * @see PageVisited
     * @see NavigatedPushEvent
     */
    navigatedEvent() {
        return this.eventService
            .get(PageEvent)
            .pipe(mapTo(new NavigatedPushEvent()));
    }
    /**
     * Listens to CartPageVisited events
     *
     * @returns an observable emitting events that describe cart page visits in a profiltag compliant way
     * @see CartPageVisited
     * @see CartViewPushEvent
     */
    cartPageVisitedEvent() {
        return this.eventService
            .get(CartPageEvent)
            .pipe(mapTo(new CartViewPushEvent()));
    }
    /**
     * Listens to HomePageEvent events
     *
     * @returns an observable emitting events that describe home page visits in a profiltag compliant way
     * @see HomePageEvent
     * @see HomePageViewPushEvent
     */
    homePageVisitedEvent() {
        return this.eventService
            .get(HomePageEvent)
            .pipe(mapTo(new HomePageViewPushEvent()));
    }
    /**
     * Listens to OrderPlacedEvent events
     *
     * @returns an observable emitting events that describe order confirmation page visits in a profiltag compliant way
     * @see OrderPlacedEvent
     * @see OrderConfirmationPushEvent
     */
    orderConfirmationPageVisited() {
        return this.eventService
            .get(OrderPlacedEvent)
            .pipe(mapTo(new OrderConfirmationPushEvent()));
    }
    /**
     * Listens to @CartAddEntrySuccessEvent events, transforms them to @AddedToCartPushEvent .
     *
     * @returns an observable emitting @AddedToCartPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see AddedToCartPushEvent
     */
    addedToCart() {
        return this.eventService.get(CartAddEntrySuccessEvent).pipe(map((item) => new AddedToCartPushEvent({
            productQty: item.quantityAdded,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productPrice: this.getProductPrice(item),
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
        })));
    }
    /**
     * Listens to @CartRemoveEntrySuccessEvent events, transforms them to @RemovedFromCartPushEvent
     *
     * @returns an observable emitting @RemovedFromCartPushEvent events
     * @see CartRemoveEntrySuccessEvent
     * @see RemovedFromCartPushEvent
     */
    removedFromCart() {
        return this.eventService.get(CartRemoveEntrySuccessEvent).pipe(map((item) => new RemovedFromCartPushEvent({
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
            categories: this.categoriesToIds(item.entry.product.categories),
        })));
    }
    /**
     * Listens to @CartUpdateEntrySuccessEvent events, transforms them to @ModifiedCartPushEvent
     *
     * @returns an observable emitting @ModifiedCartPushEvent events
     * @see CartUpdateEntrySuccessEvent
     * @see ModifiedCartPushEvent
     */
    modifiedCart() {
        return this.eventService.get(CartUpdateEntrySuccessEvent).pipe(map((item) => new ModifiedCartPushEvent({
            productQty: item.quantity,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
        })));
    }
    /**
     * Listens to @CartAddEntrySuccessEvent , @CartUpdateEntrySuccessEvent and @CartRemoveEntrySuccessEvent events,
     * transforms them to @CartSnapshotPushEvent whenever there is an activity on the cart.
     *
     * @returns an observable emitting @CartSnapshotPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see CartUpdateEntrySuccessEvent
     * @see CartRemoveEntrySuccessEvent
     * @see CartSnapshotPushEvent
     */
    cartChangedEvent() {
        return merge(this.eventService.get(CartAddEntrySuccessEvent), this.eventService.get(CartUpdateEntrySuccessEvent), this.eventService.get(CartRemoveEntrySuccessEvent)).pipe(switchMapTo(this.activeCartFacade.takeActive()), map((cart) => new CartSnapshotPushEvent({
            cart,
        })));
    }
    getProductPrice(event) {
        if (!event.entry.totalPrice ||
            !event.entry.totalPrice.value ||
            !event.entry.quantity) {
            return undefined;
        }
        return parseFloat((event.entry.totalPrice.value / event.entry.quantity).toFixed(2));
    }
    categoriesToIds(categories) {
        return categories.map((category) => category.code);
    }
}
ProfileTagPushEventsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagPushEventsService, deps: [{ token: i1.EventService }, { token: i2.PersonalizationContextService }, { token: i3.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagPushEventsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagPushEventsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagPushEventsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.PersonalizationContextService }, { type: i3.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWctcHVzaC1ldmVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9wcm9maWxldGFnL3NlcnZpY2VzL3Byb2ZpbGUtdGFnLXB1c2gtZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLHdCQUF3QixFQUN4QixhQUFhLEVBQ2IsMkJBQTJCLEVBQzNCLDJCQUEyQixHQUM1QixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsYUFBYSxFQUNiLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsc0JBQXNCLEdBQ3ZCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsR0FBRyxFQUNILEtBQUssRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUNULFdBQVcsRUFDWCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQiwwQkFBMEIsRUFDMUIsb0JBQW9CLEVBRXBCLHdCQUF3QixHQUN6QixNQUFNLDRCQUE0QixDQUFDOzs7OztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUlILE1BQU0sT0FBTywyQkFBMkI7SUFldEMsWUFDWSxZQUEwQixFQUMx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Q0FBQyxLQUFLLENBQUMsVUFBVTtZQUN2QixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDN0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDckI7WUFDQSxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE9BQU8sVUFBVSxDQUNmLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUNqRSxDQUFDO0lBQ0osQ0FBQztJQUNPLGVBQWUsQ0FBQyxVQUEyQjtRQUNqRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDOzt3SEE3VVUsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTsyRkFFUCwyQkFBMkI7a0JBSHZDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FydEFkZEVudHJ5U3VjY2Vzc0V2ZW50LFxuICBDYXJ0UGFnZUV2ZW50LFxuICBDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnQsXG4gIENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDYXRlZ29yeSwgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZGVyUGxhY2VkRXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2F0ZWdvcnlQYWdlUmVzdWx0c0V2ZW50LFxuICBIb21lUGFnZUV2ZW50LFxuICBQYWdlRXZlbnQsXG4gIFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50LFxuICBTZWFyY2hQYWdlUmVzdWx0c0V2ZW50LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgUGVyc29uYWxpemF0aW9uQ29udGV4dFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3RyYWNraW5nL3BlcnNvbmFsaXphdGlvbi9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLFxuICBtYXAsXG4gIG1hcFRvLFxuICBwYWlyd2lzZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXBUbyxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEFkZGVkVG9DYXJ0UHVzaEV2ZW50LFxuICBDYXJ0U25hcHNob3RQdXNoRXZlbnQsXG4gIENhcnRWaWV3UHVzaEV2ZW50LFxuICBDYXRlZ29yeVZpZXdQdXNoRXZlbnQsXG4gIEhvbWVQYWdlVmlld1B1c2hFdmVudCxcbiAgS2V5d29yZFNlYXJjaFB1c2hFdmVudCxcbiAgTW9kaWZpZWRDYXJ0UHVzaEV2ZW50LFxuICBOYXZpZ2F0ZWRQdXNoRXZlbnQsXG4gIE9yZGVyQ29uZmlybWF0aW9uUHVzaEV2ZW50LFxuICBQcm9kdWN0Vmlld1B1c2hFdmVudCxcbiAgUHJvZmlsZVRhZ1B1c2hFdmVudCxcbiAgUmVtb3ZlZEZyb21DYXJ0UHVzaEV2ZW50LFxufSBmcm9tICcuLi9tb2RlbC9wcm9maWxlLXRhZy5tb2RlbCc7XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRvIGNvbnZlcnQgc3BhcnRhY3VzIGV2ZW50cyBpbnRvIHByb2ZpbGV0YWcgcHVzaCBldmVudHMgdGhhdCBjYW4gYmUgcGlja2VkIHVwIGFuZCBwcm9jZXNzZWQgYnkgcHJvZmlsZXRhZy5cbiAqIFRoZSBzZXJ2aWNlIG9ic2VydmVzIHRoZSBldmVudCBzZXJ2aWNlIGFuZCB0aGUgYWN0aXZlIGNhcnQgc2VydmljZSBmb3Igc3VwcG9ydGVkIGV2ZW50cy4gVGhlc2UgZXZlbnRzIGFyZSBwYXJzZWQgaW50b1xuICogYSBwcm9maWxldGFnIGNvbXBsaWFudCBmb3JtYXQgYW5kIGVucmljaGVkIGJ5IHNlZ21lbnRzIGFuZCBhY3Rpb25zIGZyb20gdGhlIGxhdGVzdCBwZXJzb25hbGl6YXRpb24gY29udGV4dC5cbiAqXG4gKiBDdXJyZW50bHkgc3VwcG9ydGVkIGV2ZW50cyBmcm9tIHRoZSBldmVudCBzZXJ2aWNlOlxuICogIC0gQ2FydFBhZ2VWaXNpdGVkXG4gKiAgLSBDYXRlZ29yeVBhZ2VWaXNpdGVkXG4gKiAgLSBIb21lUGFnZVZpc2l0ZWRcbiAqICAtIEtleXdvcmRTZWFyY2hQYWdlVmlzaXRlZFxuICogIC0gT3JkZXJDb25maXJtYXRpb25QYWdlVmlzaXRlZFxuICogIC0gUGFnZVZpc2l0ZWRcbiAqICAtIFByb2R1Y3REZXRhaWxzUGFnZVZpc2l0ZWRcbiAqICAtIENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudFxuICogIC0gQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50XG4gKiAgLSBDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnRcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVUYWdQdXNoRXZlbnRzU2VydmljZSB7XG4gIHByaXZhdGUgcHVzaEV2ZW50cyQ6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4gPSBtZXJnZShcbiAgICB0aGlzLmNhdGVnb3J5UGFnZVZpc2l0ZWQoKSxcbiAgICB0aGlzLnByb2R1Y3REZXRhaWxzUGFnZVZpZXcoKSxcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHNDaGFuZ2VkKCksXG4gICAgdGhpcy5ob21lUGFnZVZpc2l0ZWRFdmVudCgpLFxuICAgIHRoaXMuY2FydFBhZ2VWaXNpdGVkRXZlbnQoKSxcbiAgICB0aGlzLm5hdmlnYXRlZEV2ZW50KCksXG4gICAgdGhpcy5vcmRlckNvbmZpcm1hdGlvblBhZ2VWaXNpdGVkKCksXG4gICAgdGhpcy5hZGRlZFRvQ2FydCgpLFxuICAgIHRoaXMucmVtb3ZlZEZyb21DYXJ0KCksXG4gICAgdGhpcy5tb2RpZmllZENhcnQoKSxcbiAgICB0aGlzLmNhcnRDaGFuZ2VkRXZlbnQoKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcGVyc29uYWxpemF0aW9uQ29udGV4dFNlcnZpY2U6IFBlcnNvbmFsaXphdGlvbkNvbnRleHRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyBhIHB1c2ggZXZlbnQgZW1pdHRpbmcgb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGFsbCBjb252ZXJ0ZWQgZXZlbnRzIGVtaXR0ZWQgYnkgdGhlIGV2ZW50IG9yIHRoZSBhY3RpdmUgY2FydCBzZXJ2aWNlLlxuICAgKiBUaGVzZSBldmVudHMgYXJlIGVucmljaGVkIHdpdGggc2VnbWVudHMgYW5kIGFjdGlvbnMgZnJvbSB0aGUgbGF0ZXN0IHBlcnNvbmFsaXphdGlvbiBjb250ZXh0LlxuICAgKlxuICAgKiBAcmV0dXJucyBhbiBvYnNlcnZhYmxlIGVtaXR0aW5nIHByb2ZpbGV0YWcgcHVzaCBldmVudHNcbiAgICovXG4gIGdldFB1c2hFdmVudHMoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMucHVzaEV2ZW50cyQucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICBtZXJnZShcbiAgICAgICAgICBvZih7IHNlZ21lbnRzOiB1bmRlZmluZWQsIGFjdGlvbnM6IHVuZGVmaW5lZCB9KSxcbiAgICAgICAgICB0aGlzLnBlcnNvbmFsaXphdGlvbkNvbnRleHRTZXJ2aWNlLmdldFBlcnNvbmFsaXphdGlvbkNvbnRleHQoKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgbWFwKChbaXRlbSwgcGVyc29uYWxpemF0aW9uQ29udGV4dF0pID0+IHtcbiAgICAgICAgaXRlbS5kYXRhID0gaXRlbS5kYXRhID8gaXRlbS5kYXRhIDoge307XG4gICAgICAgIGl0ZW0uZGF0YS5zZWdtZW50cyA9IHBlcnNvbmFsaXphdGlvbkNvbnRleHQ/LnNlZ21lbnRzO1xuICAgICAgICBpdGVtLmRhdGEuYWN0aW9ucyA9IHBlcnNvbmFsaXphdGlvbkNvbnRleHQ/LmFjdGlvbnM7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgcHVzaCBldmVudCBlbWl0dGluZyBvYnNlcnZhYmxlIHRvIHRoaXMgc2VydmljZS4gVGhpcyBvYnNlcnZhYmxlIHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlIGludGVybmFsIG9uZS5cbiAgICogVGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgdG8gZXh0ZW5kIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoaXMgc2VydmljZSBhdCBydW50aW1lLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBwcm9maWx0YWcgcHVzaCBldmVudHNcbiAgICovXG4gIGFkZFB1c2hFdmVudChldmVudDogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50Pik6IHZvaWQge1xuICAgIHRoaXMucHVzaEV2ZW50cyQgPSBtZXJnZSh0aGlzLnB1c2hFdmVudHMkLCBldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgdGhlIGNhdGVnb3J5IHBhZ2UgdmlzaXRlZCBldmVudC5cbiAgICpcbiAgICogQHJldHVybnMgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBldmVudHMgdGhhdCBkZXNjcmliZSBjYXRlZ29yeSBwYWdlIHZpc2l0cyBpbiBhIHByb2ZpbHRhZyBjb21wbGlhbnQgd2F5XG4gICAqIEBzZWUgQ2F0ZWdvcnlQYWdlUmVzdWx0c0V2ZW50XG4gICAqIEBzZWUgQ2F0ZWdvcnlWaWV3UHVzaEV2ZW50XG4gICAqL1xuXG4gIHByb3RlY3RlZCBjYXRlZ29yeVBhZ2VWaXNpdGVkKCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5nZXQoQ2F0ZWdvcnlQYWdlUmVzdWx0c0V2ZW50KS5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20oXG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChQYWdlRXZlbnQpLnBpcGUoXG4gICAgICAgICAgc3RhcnRXaXRoKDxQYWdlRXZlbnQ+bnVsbCksIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdGl2ZVgvcnhqcy9pc3N1ZXMvNDc3MlxuICAgICAgICAgIHBhaXJ3aXNlKClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAoXG4gICAgICAgICAgW3ByZXZpb3VzbHlFbWl0dGVkQ2F0ZWdvcnlQYWdlXSxcbiAgICAgICAgICBbY3VycmVudENhdGVnb3J5UGFnZSwgW3ByZXZpb3VzUm91dGUsIGN1cnJlbnRSb3V0ZV1dXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBwcmV2aW91c2x5RW1pdHRlZENhdGVnb3J5UGFnZS5jYXRlZ29yeUNvZGUgPT09XG4gICAgICAgICAgICAgIGN1cnJlbnRDYXRlZ29yeVBhZ2UuY2F0ZWdvcnlDb2RlICYmXG4gICAgICAgICAgICBwcmV2aW91c1JvdXRlLm5hdmlnYXRpb24uc2VtYW50aWNSb3V0ZSA9PT1cbiAgICAgICAgICAgICAgY3VycmVudFJvdXRlLm5hdmlnYXRpb24uc2VtYW50aWNSb3V0ZVxuICAgICAgICAgICk7IC8vIEEgdHJ1ZSBtZWFucyB0aGF0IHRoaXMgaXRlbSBpcyBub3QgdW5pcXVlLCBzbyB0aGlzIGlzIGhhcmQgdG8gd3JhcCB5b3VyIGhlYWQgYXJvdW5kLlxuICAgICAgICAgIC8vIFdoYXQgd2UgYXJlIHNheWluZywgaXMgdGhhdCBpZiB0aGUgY2F0ZWdvcnlDb2RlIGlzIHRoZSBzYW1lIEFORCB0aGUgbGFzdCBlbWl0dGVkIHNlbWFudGljIHJvdXRlIGlzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gdGhlbiB0aGlzIGlzIGEgZHVwbGljYXRlIChJLkUuIHZpYSBhIGZhY2V0IGNoYW5nZSkuIEluIG90aGVyIHdvcmRzLCBubyBvdGhlciBwYWdlIHR5cGUgd2FzIHZpc2l0ZWQsIGFuZCB3ZSBhcmUgb24gdGhlIHNhbWUgY2F0ZWdvcnljb2RlXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBtYXAoXG4gICAgICAgIChbY2F0ZWdvcnlQYWdlRXZlbnRdKSA9PlxuICAgICAgICAgIG5ldyBDYXRlZ29yeVZpZXdQdXNoRXZlbnQoe1xuICAgICAgICAgICAgcHJvZHVjdENhdGVnb3J5OiBjYXRlZ29yeVBhZ2VFdmVudC5jYXRlZ29yeUNvZGUsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlOYW1lOiBjYXRlZ29yeVBhZ2VFdmVudC5jYXRlZ29yeU5hbWUsXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gU2VhcmNoUGFnZVJlc3VsdHNFdmVudCBldmVudHNcbiAgICpcbiAgICogQHJldHVybnMgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBldmVudHMgdGhhdCBkZXNjcmliZSBrZXl3b3JkIHNlYXJjaCBwYWdlIHZpc2l0cyBpbiBhIHByb2ZpbHRhZyBjb21wbGlhbnQgd2F5XG4gICAqIEBzZWUgU2VhcmNoUGFnZVJlc3VsdHNFdmVudFxuICAgKiBAc2VlIEtleXdvcmRTZWFyY2hQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBzZWFyY2hSZXN1bHRzQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPFByb2ZpbGVUYWdQdXNoRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KFNlYXJjaFBhZ2VSZXN1bHRzRXZlbnQpLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsS2V5Q2hhbmdlZCgnc2VhcmNoVGVybScpLFxuICAgICAgbWFwKFxuICAgICAgICAoc2VhcmNoRXZlbnQpID0+XG4gICAgICAgICAgbmV3IEtleXdvcmRTZWFyY2hQdXNoRXZlbnQoe1xuICAgICAgICAgICAgc2VhcmNoVGVybTogc2VhcmNoRXZlbnQuc2VhcmNoVGVybSxcbiAgICAgICAgICAgIG51bVJlc3VsdHM6IHNlYXJjaEV2ZW50Lm51bWJlck9mUmVzdWx0cyxcbiAgICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byBQcm9kdWN0RGV0YWlsc1BhZ2VFdmVudCBldmVudHNcbiAgICpcbiAgICogQHJldHVybnMgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBldmVudHMgdGhhdCBkZXNjcmliZSBwcm9kdWN0IGRldGFpbCBwYWdlIHZpc2l0cyBpbiBhIHByb2ZpbHRhZyBjb21wbGlhbnQgd2F5XG4gICAqIEBzZWUgUHJvZHVjdERldGFpbHNQYWdlRXZlbnRcbiAgICogQHNlZSBQcm9kdWN0Vmlld1B1c2hFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHByb2R1Y3REZXRhaWxzUGFnZVZpZXcoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChQcm9kdWN0RGV0YWlsc1BhZ2VFdmVudCkucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgbmV3IFByb2R1Y3RWaWV3UHVzaEV2ZW50KHtcbiAgICAgICAgICAgIHByb2R1Y3RTa3U6IGl0ZW0uY29kZSxcbiAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICBwcm9kdWN0UHJpY2U6IGl0ZW0ucHJpY2UgPyBpdGVtLnByaWNlLnZhbHVlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvZHVjdENhdGVnb3J5TmFtZTogaXRlbS5jYXRlZ29yaWVzXG4gICAgICAgICAgICAgID8gaXRlbS5jYXRlZ29yaWVzW2l0ZW0uY2F0ZWdvcmllcy5sZW5ndGggLSAxXS5uYW1lXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvZHVjdENhdGVnb3J5OiBpdGVtLmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmNhdGVnb3JpZXNbaXRlbS5jYXRlZ29yaWVzLmxlbmd0aCAtIDFdLmNvZGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiB0aGlzLmNhdGVnb3JpZXNUb0lkcyhpdGVtLmNhdGVnb3JpZXMpLFxuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIFBhZ2VWaXNpdGVkIGV2ZW50c1xuICAgKlxuICAgKiBAcmV0dXJucyBhbiBvYnNlcnZhYmxlIGVtaXR0aW5nIGV2ZW50cyB0aGF0IGRlc2NyaWJlIHBhZ2UgdmlzaXRzIGluIGEgcHJvZmlsdGFnIGNvbXBsaWFudCB3YXlcbiAgICogQHNlZSBQYWdlVmlzaXRlZFxuICAgKiBAc2VlIE5hdmlnYXRlZFB1c2hFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIG5hdmlnYXRlZEV2ZW50KCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgLmdldChQYWdlRXZlbnQpXG4gICAgICAucGlwZShtYXBUbyhuZXcgTmF2aWdhdGVkUHVzaEV2ZW50KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIENhcnRQYWdlVmlzaXRlZCBldmVudHNcbiAgICpcbiAgICogQHJldHVybnMgYW4gb2JzZXJ2YWJsZSBlbWl0dGluZyBldmVudHMgdGhhdCBkZXNjcmliZSBjYXJ0IHBhZ2UgdmlzaXRzIGluIGEgcHJvZmlsdGFnIGNvbXBsaWFudCB3YXlcbiAgICogQHNlZSBDYXJ0UGFnZVZpc2l0ZWRcbiAgICogQHNlZSBDYXJ0Vmlld1B1c2hFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGNhcnRQYWdlVmlzaXRlZEV2ZW50KCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgLmdldChDYXJ0UGFnZUV2ZW50KVxuICAgICAgLnBpcGUobWFwVG8obmV3IENhcnRWaWV3UHVzaEV2ZW50KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIEhvbWVQYWdlRXZlbnQgZXZlbnRzXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgZXZlbnRzIHRoYXQgZGVzY3JpYmUgaG9tZSBwYWdlIHZpc2l0cyBpbiBhIHByb2ZpbHRhZyBjb21wbGlhbnQgd2F5XG4gICAqIEBzZWUgSG9tZVBhZ2VFdmVudFxuICAgKiBAc2VlIEhvbWVQYWdlVmlld1B1c2hFdmVudFxuICAgKi9cbiAgcHJvdGVjdGVkIGhvbWVQYWdlVmlzaXRlZEV2ZW50KCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgLmdldChIb21lUGFnZUV2ZW50KVxuICAgICAgLnBpcGUobWFwVG8obmV3IEhvbWVQYWdlVmlld1B1c2hFdmVudCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byBPcmRlclBsYWNlZEV2ZW50IGV2ZW50c1xuICAgKlxuICAgKiBAcmV0dXJucyBhbiBvYnNlcnZhYmxlIGVtaXR0aW5nIGV2ZW50cyB0aGF0IGRlc2NyaWJlIG9yZGVyIGNvbmZpcm1hdGlvbiBwYWdlIHZpc2l0cyBpbiBhIHByb2ZpbHRhZyBjb21wbGlhbnQgd2F5XG4gICAqIEBzZWUgT3JkZXJQbGFjZWRFdmVudFxuICAgKiBAc2VlIE9yZGVyQ29uZmlybWF0aW9uUHVzaEV2ZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgb3JkZXJDb25maXJtYXRpb25QYWdlVmlzaXRlZCgpOiBPYnNlcnZhYmxlPFByb2ZpbGVUYWdQdXNoRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgIC5nZXQoT3JkZXJQbGFjZWRFdmVudClcbiAgICAgIC5waXBlKG1hcFRvKG5ldyBPcmRlckNvbmZpcm1hdGlvblB1c2hFdmVudCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVucyB0byBAQ2FydEFkZEVudHJ5U3VjY2Vzc0V2ZW50IGV2ZW50cywgdHJhbnNmb3JtcyB0aGVtIHRvIEBBZGRlZFRvQ2FydFB1c2hFdmVudCAuXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQEFkZGVkVG9DYXJ0UHVzaEV2ZW50IGV2ZW50c1xuICAgKiBAc2VlIENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudFxuICAgKiBAc2VlIEFkZGVkVG9DYXJ0UHVzaEV2ZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkZWRUb0NhcnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIG5ldyBBZGRlZFRvQ2FydFB1c2hFdmVudCh7XG4gICAgICAgICAgICBwcm9kdWN0UXR5OiBpdGVtLnF1YW50aXR5QWRkZWQsXG4gICAgICAgICAgICBwcm9kdWN0U2t1OiBpdGVtLmVudHJ5LnByb2R1Y3QuY29kZSxcbiAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBpdGVtLmVudHJ5LnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIGNhcnRJZDogaXRlbS5jYXJ0SWQsXG4gICAgICAgICAgICBjYXJ0Q29kZTogaXRlbS5jYXJ0Q29kZSxcbiAgICAgICAgICAgIHByb2R1Y3RQcmljZTogdGhpcy5nZXRQcm9kdWN0UHJpY2UoaXRlbSksXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiB0aGlzLmNhdGVnb3JpZXNUb0lkcyhpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllcyksXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlOYW1lOiBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1xuICAgICAgICAgICAgICA/IGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzW1xuICAgICAgICAgICAgICAgICAgaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2R1Y3RDYXRlZ29yeTogaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1tcbiAgICAgICAgICAgICAgICAgIGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBdLmNvZGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gQENhcnRSZW1vdmVFbnRyeVN1Y2Nlc3NFdmVudCBldmVudHMsIHRyYW5zZm9ybXMgdGhlbSB0byBAUmVtb3ZlZEZyb21DYXJ0UHVzaEV2ZW50XG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQFJlbW92ZWRGcm9tQ2FydFB1c2hFdmVudCBldmVudHNcbiAgICogQHNlZSBDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBSZW1vdmVkRnJvbUNhcnRQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCByZW1vdmVkRnJvbUNhcnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnQpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIG5ldyBSZW1vdmVkRnJvbUNhcnRQdXNoRXZlbnQoe1xuICAgICAgICAgICAgcHJvZHVjdFNrdTogaXRlbS5lbnRyeS5wcm9kdWN0LmNvZGUsXG4gICAgICAgICAgICBwcm9kdWN0TmFtZTogaXRlbS5lbnRyeS5wcm9kdWN0Lm5hbWUsXG4gICAgICAgICAgICBjYXJ0SWQ6IGl0ZW0uY2FydElkLFxuICAgICAgICAgICAgY2FydENvZGU6IGl0ZW0uY2FydENvZGUsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlOYW1lOiBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1xuICAgICAgICAgICAgICA/IGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzW1xuICAgICAgICAgICAgICAgICAgaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgIF0ubmFtZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2R1Y3RDYXRlZ29yeTogaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1tcbiAgICAgICAgICAgICAgICAgIGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBdLmNvZGVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiB0aGlzLmNhdGVnb3JpZXNUb0lkcyhpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllcyksXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gQENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCBldmVudHMsIHRyYW5zZm9ybXMgdGhlbSB0byBATW9kaWZpZWRDYXJ0UHVzaEV2ZW50XG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQE1vZGlmaWVkQ2FydFB1c2hFdmVudCBldmVudHNcbiAgICogQHNlZSBDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBNb2RpZmllZENhcnRQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBtb2RpZmllZENhcnQoKTogT2JzZXJ2YWJsZTxQcm9maWxlVGFnUHVzaEV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnQpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgIG5ldyBNb2RpZmllZENhcnRQdXNoRXZlbnQoe1xuICAgICAgICAgICAgcHJvZHVjdFF0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgICAgICAgIHByb2R1Y3RTa3U6IGl0ZW0uZW50cnkucHJvZHVjdC5jb2RlLFxuICAgICAgICAgICAgcHJvZHVjdE5hbWU6IGl0ZW0uZW50cnkucHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgY2FydElkOiBpdGVtLmNhcnRJZCxcbiAgICAgICAgICAgIGNhcnRDb2RlOiBpdGVtLmNhcnRDb2RlLFxuICAgICAgICAgICAgY2F0ZWdvcmllczogdGhpcy5jYXRlZ29yaWVzVG9JZHMoaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXMpLFxuICAgICAgICAgICAgcHJvZHVjdENhdGVnb3J5TmFtZTogaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgPyBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllc1tcbiAgICAgICAgICAgICAgICAgIGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBdLm5hbWVcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9kdWN0Q2F0ZWdvcnk6IGl0ZW0uZW50cnkucHJvZHVjdC5jYXRlZ29yaWVzXG4gICAgICAgICAgICAgID8gaXRlbS5lbnRyeS5wcm9kdWN0LmNhdGVnb3JpZXNbXG4gICAgICAgICAgICAgICAgICBpdGVtLmVudHJ5LnByb2R1Y3QuY2F0ZWdvcmllcy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgXS5jb2RlXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIEBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQgLCBAQ2FydFVwZGF0ZUVudHJ5U3VjY2Vzc0V2ZW50IGFuZCBAQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50IGV2ZW50cyxcbiAgICogdHJhbnNmb3JtcyB0aGVtIHRvIEBDYXJ0U25hcHNob3RQdXNoRXZlbnQgd2hlbmV2ZXIgdGhlcmUgaXMgYW4gYWN0aXZpdHkgb24gdGhlIGNhcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIG9ic2VydmFibGUgZW1pdHRpbmcgQENhcnRTbmFwc2hvdFB1c2hFdmVudCBldmVudHNcbiAgICogQHNlZSBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBDYXJ0UmVtb3ZlRW50cnlTdWNjZXNzRXZlbnRcbiAgICogQHNlZSBDYXJ0U25hcHNob3RQdXNoRXZlbnRcbiAgICovXG4gIHByb3RlY3RlZCBjYXJ0Q2hhbmdlZEV2ZW50KCk6IE9ic2VydmFibGU8UHJvZmlsZVRhZ1B1c2hFdmVudD4ge1xuICAgIHJldHVybiBtZXJnZShcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQpLFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCksXG4gICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50KVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcFRvKHRoaXMuYWN0aXZlQ2FydEZhY2FkZS50YWtlQWN0aXZlKCkpLFxuICAgICAgbWFwKFxuICAgICAgICAoY2FydCkgPT5cbiAgICAgICAgICBuZXcgQ2FydFNuYXBzaG90UHVzaEV2ZW50KHtcbiAgICAgICAgICAgIGNhcnQsXG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9kdWN0UHJpY2UoZXZlbnQ6IENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudCk6IE51bWJlciB7XG4gICAgaWYgKFxuICAgICAgIWV2ZW50LmVudHJ5LnRvdGFsUHJpY2UgfHxcbiAgICAgICFldmVudC5lbnRyeS50b3RhbFByaWNlLnZhbHVlIHx8XG4gICAgICAhZXZlbnQuZW50cnkucXVhbnRpdHlcbiAgICApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUZsb2F0KFxuICAgICAgKGV2ZW50LmVudHJ5LnRvdGFsUHJpY2UudmFsdWUgLyBldmVudC5lbnRyeS5xdWFudGl0eSkudG9GaXhlZCgyKVxuICAgICk7XG4gIH1cbiAgcHJpdmF0ZSBjYXRlZ29yaWVzVG9JZHMoY2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcnk+KTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkuY29kZSk7XG4gIH1cbn1cbiJdfQ==