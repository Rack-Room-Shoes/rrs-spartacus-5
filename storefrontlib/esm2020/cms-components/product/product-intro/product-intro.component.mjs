/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defer, merge, of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { ComponentCreateEvent, ComponentDestroyEvent, } from '../../../cms-structure';
import * as i0 from "@angular/core";
import * as i1 from "../current-product.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/components/star-rating/star-rating.component";
export class ProductIntroComponent {
    constructor(currentProductService, translationService, winRef, eventService) {
        this.currentProductService = currentProductService;
        this.translationService = translationService;
        this.winRef = winRef;
        this.eventService = eventService;
        this.product$ = this.currentProductService.getProduct();
        /**
         * Observable that checks the reviews component availability on the page.
         */
        this.areReviewsAvailable$ = merge(
        // Check if reviews component is already defined:
        defer(() => of(!!this.getReviewsComponent())), 
        // Observe EventService for reviews availability:
        this.eventService.get(ComponentCreateEvent).pipe(filter((event) => event.id === this.reviewsComponentId), mapTo(true)), this.eventService.get(ComponentDestroyEvent).pipe(filter((event) => event.id === this.reviewsComponentId), mapTo(false)));
        this.reviewsComponentId = 'ProductReviewsTabComponent';
        this.reviewsTranslationKey = `TabPanelContainer.tabs.${this.reviewsComponentId}`;
    }
    /**
     * Scroll to views component on page and click "Reviews" tab
     */
    showReviews() {
        // Use translated label for Reviews tab reference
        this.translationService
            .translate(this.reviewsTranslationKey)
            .subscribe((reviewsTabLabel) => {
            const tabsComponent = this.getTabsComponent();
            const reviewsTab = tabsComponent && this.getTabByLabel(reviewsTabLabel, tabsComponent);
            if (reviewsTab) {
                this.clickTabIfInactive(reviewsTab);
                setTimeout(() => {
                    reviewsTab.scrollIntoView({ behavior: 'smooth' });
                    reviewsTab.focus({ preventScroll: true });
                });
            }
        })
            .unsubscribe();
    }
    // NOTE: Does not currently exists as its own component
    // but part of tabs component. This is likely to change in refactor.
    /**
     * Get Reviews Component if exists on page
     */
    getReviewsComponent() {
        return this.winRef.document.querySelector('cx-product-reviews');
    }
    /**
     * Get Tabs Component if exists on page
     */
    getTabsComponent() {
        return this.winRef.document.querySelector('cx-tab-paragraph-container');
    }
    /**
     * Click to activate tab if not already active
     *
     * @param tab tab to click if needed
     */
    clickTabIfInactive(tab) {
        if (!tab.classList.contains('active') ||
            tab.classList.contains('toggled')) {
            tab.click();
        }
    }
    /**
     * Get Tab by label if exists on page
     *
     * @param label label of searched tab
     * @param tabsComponent component containing tabs
     */
    getTabByLabel(label, tabsComponent) {
        // NOTE: Reads through button tags to click on correct tab
        // There may be a better way of doing this now/after refactor
        const tabElements = tabsComponent.getElementsByTagName('button');
        // Look through button tab elements until finding tab with label
        return Array.from(tabElements).find((buttonElement) => buttonElement.innerHTML.includes(label));
    }
}
ProductIntroComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductIntroComponent, deps: [{ token: i1.CurrentProductService }, { token: i2.TranslationService }, { token: i2.WindowRef }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Component });
ProductIntroComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ProductIntroComponent, selector: "cx-product-intro", ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"rating\" *ngIf=\"product?.averageRating\">\n    <cx-star-rating [rating]=\"product?.averageRating ?? 0\"></cx-star-rating>\n\n    <div class=\"count\">({{ product?.numberOfReviews }})</div>\n\n    <button\n      *ngIf=\"areReviewsAvailable$ | async\"\n      class=\"btn btn-link cx-action-link\"\n      (click)=\"showReviews()\"\n      [attr.aria-label]=\"\n        'productSummary.showReviewsDetailed'\n          | cxTranslate\n            : {\n                rating: product?.averageRating | number: '1.0-1',\n                count: product?.numberOfReviews\n              }\n      \"\n    >\n      {{ 'productSummary.showReviews' | cxTranslate }}\n    </button>\n  </div>\n  <div class=\"rating\" *ngIf=\"!product?.averageRating\">\n    {{ 'productDetails.noReviews' | cxTranslate }}\n  </div>\n  <div class=\"code\">\n    {{ 'productSummary.id' | cxTranslate }} {{ product?.code }}\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.StarRatingComponent, selector: "cx-star-rating", inputs: ["disabled", "rating"], outputs: ["change"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.DecimalPipe, name: "number" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductIntroComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-intro', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"rating\" *ngIf=\"product?.averageRating\">\n    <cx-star-rating [rating]=\"product?.averageRating ?? 0\"></cx-star-rating>\n\n    <div class=\"count\">({{ product?.numberOfReviews }})</div>\n\n    <button\n      *ngIf=\"areReviewsAvailable$ | async\"\n      class=\"btn btn-link cx-action-link\"\n      (click)=\"showReviews()\"\n      [attr.aria-label]=\"\n        'productSummary.showReviewsDetailed'\n          | cxTranslate\n            : {\n                rating: product?.averageRating | number: '1.0-1',\n                count: product?.numberOfReviews\n              }\n      \"\n    >\n      {{ 'productSummary.showReviews' | cxTranslate }}\n    </button>\n  </div>\n  <div class=\"rating\" *ngIf=\"!product?.averageRating\">\n    {{ 'productDetails.noReviews' | cxTranslate }}\n  </div>\n  <div class=\"code\">\n    {{ 'productSummary.id' | cxTranslate }} {{ product?.code }}\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i2.TranslationService }, { type: i2.WindowRef }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbnRyby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1pbnRyby9wcm9kdWN0LWludHJvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWludHJvL3Byb2R1Y3QtaW50cm8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixxQkFBcUIsR0FDdEIsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBUWhDLE1BQU0sT0FBTyxxQkFBcUI7SUEwQmhDLFlBQ1kscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUN0QyxNQUFpQixFQUNqQixZQUEwQjtRQUgxQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQTdCdEMsYUFBUSxHQUNOLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUUxQzs7V0FFRztRQUNILHlCQUFvQixHQUF3QixLQUFLO1FBQy9DLGlEQUFpRDtRQUNqRCxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENB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QjtrQkFMakMsU0FBUzsrQkFDRSxrQkFBa0IsbUJBRVgsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEV2ZW50U2VydmljZSxcbiAgUHJvZHVjdCxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxuICBXaW5kb3dSZWYsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZlciwgbWVyZ2UsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcFRvIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50Q3JlYXRlRXZlbnQsXG4gIENvbXBvbmVudERlc3Ryb3lFdmVudCxcbn0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZSc7XG5pbXBvcnQgeyBDdXJyZW50UHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi9jdXJyZW50LXByb2R1Y3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtaW50cm8nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1pbnRyby5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW50cm9Db21wb25lbnQge1xuICBwcm9kdWN0JDogT2JzZXJ2YWJsZTxQcm9kdWN0IHwgbnVsbD4gPVxuICAgIHRoaXMuY3VycmVudFByb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3QoKTtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSB0aGF0IGNoZWNrcyB0aGUgcmV2aWV3cyBjb21wb25lbnQgYXZhaWxhYmlsaXR5IG9uIHRoZSBwYWdlLlxuICAgKi9cbiAgYXJlUmV2aWV3c0F2YWlsYWJsZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBtZXJnZShcbiAgICAvLyBDaGVjayBpZiByZXZpZXdzIGNvbXBvbmVudCBpcyBhbHJlYWR5IGRlZmluZWQ6XG4gICAgZGVmZXIoKCkgPT4gb2YoISF0aGlzLmdldFJldmlld3NDb21wb25lbnQoKSkpLFxuXG4gICAgLy8gT2JzZXJ2ZSBFdmVudFNlcnZpY2UgZm9yIHJldmlld3MgYXZhaWxhYmlsaXR5OlxuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDb21wb25lbnRDcmVhdGVFdmVudCkucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmlkID09PSB0aGlzLnJldmlld3NDb21wb25lbnRJZCksXG4gICAgICBtYXBUbyh0cnVlKVxuICAgICksXG4gICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENvbXBvbmVudERlc3Ryb3lFdmVudCkucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmlkID09PSB0aGlzLnJldmlld3NDb21wb25lbnRJZCksXG4gICAgICBtYXBUbyhmYWxzZSlcbiAgICApXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJldmlld3NDb21wb25lbnRJZCA9ICdQcm9kdWN0UmV2aWV3c1RhYkNvbXBvbmVudCc7XG5cbiAgcHJvdGVjdGVkIHJldmlld3NUcmFuc2xhdGlvbktleSA9IGBUYWJQYW5lbENvbnRhaW5lci50YWJzLiR7dGhpcy5yZXZpZXdzQ29tcG9uZW50SWR9YDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VycmVudFByb2R1Y3RTZXJ2aWNlOiBDdXJyZW50UHJvZHVjdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uU2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdG8gdmlld3MgY29tcG9uZW50IG9uIHBhZ2UgYW5kIGNsaWNrIFwiUmV2aWV3c1wiIHRhYlxuICAgKi9cbiAgc2hvd1Jldmlld3MoKSB7XG4gICAgLy8gVXNlIHRyYW5zbGF0ZWQgbGFiZWwgZm9yIFJldmlld3MgdGFiIHJlZmVyZW5jZVxuICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlXG4gICAgICAudHJhbnNsYXRlKHRoaXMucmV2aWV3c1RyYW5zbGF0aW9uS2V5KVxuICAgICAgLnN1YnNjcmliZSgocmV2aWV3c1RhYkxhYmVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhYnNDb21wb25lbnQgPSB0aGlzLmdldFRhYnNDb21wb25lbnQoKTtcbiAgICAgICAgY29uc3QgcmV2aWV3c1RhYiA9XG4gICAgICAgICAgdGFic0NvbXBvbmVudCAmJiB0aGlzLmdldFRhYkJ5TGFiZWwocmV2aWV3c1RhYkxhYmVsLCB0YWJzQ29tcG9uZW50KTtcblxuICAgICAgICBpZiAocmV2aWV3c1RhYikge1xuICAgICAgICAgIHRoaXMuY2xpY2tUYWJJZkluYWN0aXZlKHJldmlld3NUYWIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmV2aWV3c1RhYi5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgICAgICAgICAgIHJldmlld3NUYWIuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvLyBOT1RFOiBEb2VzIG5vdCBjdXJyZW50bHkgZXhpc3RzIGFzIGl0cyBvd24gY29tcG9uZW50XG4gIC8vIGJ1dCBwYXJ0IG9mIHRhYnMgY29tcG9uZW50LiBUaGlzIGlzIGxpa2VseSB0byBjaGFuZ2UgaW4gcmVmYWN0b3IuXG4gIC8qKlxuICAgKiBHZXQgUmV2aWV3cyBDb21wb25lbnQgaWYgZXhpc3RzIG9uIHBhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBnZXRSZXZpZXdzQ29tcG9uZW50KCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2N4LXByb2R1Y3QtcmV2aWV3cycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBUYWJzIENvbXBvbmVudCBpZiBleGlzdHMgb24gcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRUYWJzQ29tcG9uZW50KCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2N4LXRhYi1wYXJhZ3JhcGgtY29udGFpbmVyJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2sgdG8gYWN0aXZhdGUgdGFiIGlmIG5vdCBhbHJlYWR5IGFjdGl2ZVxuICAgKlxuICAgKiBAcGFyYW0gdGFiIHRhYiB0byBjbGljayBpZiBuZWVkZWRcbiAgICovXG4gIHByaXZhdGUgY2xpY2tUYWJJZkluYWN0aXZlKHRhYjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICAhdGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgfHxcbiAgICAgIHRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZWQnKVxuICAgICkge1xuICAgICAgdGFiLmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBUYWIgYnkgbGFiZWwgaWYgZXhpc3RzIG9uIHBhZ2VcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsIGxhYmVsIG9mIHNlYXJjaGVkIHRhYlxuICAgKiBAcGFyYW0gdGFic0NvbXBvbmVudCBjb21wb25lbnQgY29udGFpbmluZyB0YWJzXG4gICAqL1xuICBwcml2YXRlIGdldFRhYkJ5TGFiZWwoXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICB0YWJzQ29tcG9uZW50OiBIVE1MRWxlbWVudFxuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgLy8gTk9URTogUmVhZHMgdGhyb3VnaCBidXR0b24gdGFncyB0byBjbGljayBvbiBjb3JyZWN0IHRhYlxuICAgIC8vIFRoZXJlIG1heSBiZSBhIGJldHRlciB3YXkgb2YgZG9pbmcgdGhpcyBub3cvYWZ0ZXIgcmVmYWN0b3JcbiAgICBjb25zdCB0YWJFbGVtZW50czogSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD4gPVxuICAgICAgdGFic0NvbXBvbmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYnV0dG9uJyk7XG5cbiAgICAvLyBMb29rIHRocm91Z2ggYnV0dG9uIHRhYiBlbGVtZW50cyB1bnRpbCBmaW5kaW5nIHRhYiB3aXRoIGxhYmVsXG4gICAgcmV0dXJuIEFycmF5LmZyb20odGFiRWxlbWVudHMpLmZpbmQoKGJ1dHRvbkVsZW1lbnQpID0+XG4gICAgICBidXR0b25FbGVtZW50LmlubmVySFRNTC5pbmNsdWRlcyhsYWJlbClcbiAgICApO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwicHJvZHVjdCQgfCBhc3luYyBhcyBwcm9kdWN0XCI+XG4gIDxkaXYgY2xhc3M9XCJyYXRpbmdcIiAqbmdJZj1cInByb2R1Y3Q/LmF2ZXJhZ2VSYXRpbmdcIj5cbiAgICA8Y3gtc3Rhci1yYXRpbmcgW3JhdGluZ109XCJwcm9kdWN0Py5hdmVyYWdlUmF0aW5nID8/IDBcIj48L2N4LXN0YXItcmF0aW5nPlxuXG4gICAgPGRpdiBjbGFzcz1cImNvdW50XCI+KHt7IHByb2R1Y3Q/Lm51bWJlck9mUmV2aWV3cyB9fSk8L2Rpdj5cblxuICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwiYXJlUmV2aWV3c0F2YWlsYWJsZSQgfCBhc3luY1wiXG4gICAgICBjbGFzcz1cImJ0biBidG4tbGluayBjeC1hY3Rpb24tbGlua1wiXG4gICAgICAoY2xpY2spPVwic2hvd1Jldmlld3MoKVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgICAncHJvZHVjdFN1bW1hcnkuc2hvd1Jldmlld3NEZXRhaWxlZCdcbiAgICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICByYXRpbmc6IHByb2R1Y3Q/LmF2ZXJhZ2VSYXRpbmcgfCBudW1iZXI6ICcxLjAtMScsXG4gICAgICAgICAgICAgICAgY291bnQ6IHByb2R1Y3Q/Lm51bWJlck9mUmV2aWV3c1xuICAgICAgICAgICAgICB9XG4gICAgICBcIlxuICAgID5cbiAgICAgIHt7ICdwcm9kdWN0U3VtbWFyeS5zaG93UmV2aWV3cycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInJhdGluZ1wiICpuZ0lmPVwiIXByb2R1Y3Q/LmF2ZXJhZ2VSYXRpbmdcIj5cbiAgICB7eyAncHJvZHVjdERldGFpbHMubm9SZXZpZXdzJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29kZVwiPlxuICAgIHt7ICdwcm9kdWN0U3VtbWFyeS5pZCcgfCBjeFRyYW5zbGF0ZSB9fSB7eyBwcm9kdWN0Py5jb2RlIH19XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=