/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./page-slot.service";
import * as i3 from "@angular/common";
import * as i4 from "../../outlet/outlet.directive";
import * as i5 from "../component/component-wrapper.directive";
/**
 * The `PageSlotComponent` is used to render the CMS page slot and it's components.
 *
 * The Page slot host element will be supplemented with css classes so that the layout
 * can be fully controlled by customers:
 * - The page slot _position_ is added as a css class by default.
 * - The `cx-pending` is added for as long as the slot hasn't start loading.
 * - The `page-fold` style class is added for the page slot which is configured as the page fold.
 */
export class PageSlotComponent {
    constructor(cmsService, dynamicAttributeService, renderer, elementRef, cd, pageSlotService) {
        this.cmsService = cmsService;
        this.dynamicAttributeService = dynamicAttributeService;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.cd = cd;
        this.pageSlotService = pageSlotService;
        /**
         * Indicates that the page slot is the last page slot above the fold.
         */
        this.isPageFold = false;
        /**
         * Indicates that the components of the page slot haven't been loaded as long
         * as the isPending state is true.
         */
        this.isPending = true;
        /**
         * Indicates that the page slot doesn't contain any components. This is no
         * longer used in spartacus, but kept for backwards compatibility.
         */
        this.hasComponents = false;
        this.position$ = new BehaviorSubject(undefined);
        this.slot$ = this.position$.pipe(filter(isNotUndefined), switchMap((position) => this.cmsService.getContentSlot(position)), distinctUntilChanged(this.isDistinct));
        /** Observes the components for the given page slot. */
        this.components$ = this.slot$.pipe(map((slot) => slot?.components ?? []));
        this.subscription = new Subscription();
        /** Keeps track of the pending components that must be loaded for the page slot */
        this.pendingComponentCount = 0;
    }
    /**
     * The position represents the unique key for a page slot on a single page, but can
     * be reused cross pages.
     *
     * The position is used to find the CMS components for the page slot. It is also
     * added as an additional CSS class so that layout can be applied.
     */
    set position(value) {
        this.position$.next(value);
    }
    get position() {
        return this.position$.value;
    }
    ngOnInit() {
        this.subscription.add(this.slot$.pipe(tap((slot) => this.decorate(slot))).subscribe((value) => {
            this.components = value?.components || [];
            this.cd.markForCheck();
        }));
    }
    decorate(slot) {
        let cls = this.class || '';
        if (this.lastPosition && cls.indexOf(this.lastPosition) > -1) {
            cls = cls.replace(this.lastPosition, '');
        }
        if (this.position$.value) {
            cls += ` ${this.position$.value}`;
            this.lastPosition = this.position$.value;
        }
        // host bindings
        this.pending = slot?.components?.length || 0;
        this.hasComponents = slot?.components
            ? slot?.components?.length > 0
            : false;
        if (cls && cls !== this.class) {
            this.class = cls;
        }
        if (slot) {
            this.dynamicAttributeService.addAttributesToSlot(this.elementRef.nativeElement, this.renderer, slot);
        }
    }
    /**
     * Sets the pending count for the page slot components. Once all pending components are
     * loaded, the `isPending` flag is updated, so that the associated class can be updated
     */
    set pending(count) {
        this.pendingComponentCount = count;
        this.isPending = this.pendingComponentCount > 0;
    }
    get pending() {
        return this.pendingComponentCount;
    }
    /*
     * Is triggered when a component is added to the view. This is used to
     * update the pending count
     */
    isLoaded(loadState) {
        if (loadState) {
            this.pending--;
            this.cd.markForCheck();
        }
    }
    /**
     * The `DeferLoadingStrategy` indicates whether the component should be
     * rendered instantly or whether it should be deferred.
     */
    getComponentDeferOptions(componentType) {
        return this.pageSlotService.getComponentDeferOptions(this.position, componentType);
    }
    isDistinct(old, current) {
        return Boolean(current.components &&
            old.components &&
            old.components.length === current.components.length &&
            !old.components.find((el, index) => el.uid !== current.components?.[index].uid));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
PageSlotComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PageSlotComponent, deps: [{ token: i1.CmsService }, { token: i1.DynamicAttributeService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.PageSlotService }], target: i0.ɵɵFactoryTarget.Component });
PageSlotComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: PageSlotComponent, selector: "cx-page-slot,[cx-page-slot]", inputs: { position: "position", class: "class", isPageFold: "isPageFold", hasComponents: "hasComponents" }, host: { properties: { "attr.position": "this.position", "class": "this.class", "class.page-fold": "this.isPageFold", "class.cx-pending": "this.isPending", "class.has-components": "this.hasComponents" } }, ngImport: i0, template: "<ng-template\n  *ngIf=\"position\"\n  [cxOutlet]=\"position\"\n  [cxOutletContext]=\"{ components$: components$ }\"\n>\n  <ng-container *ngFor=\"let component of components\">\n    <ng-template\n      *ngIf=\"component.flexType\"\n      [cxOutlet]=\"component.flexType\"\n      [cxOutletContext]=\"{ component: component }\"\n      [cxOutletDefer]=\"getComponentDeferOptions(component.flexType)\"\n      (loaded)=\"isLoaded($event)\"\n    >\n      <ng-container [cxComponentWrapper]=\"component\"></ng-container>\n    </ng-template>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }, { kind: "directive", type: i5.ComponentWrapperDirective, selector: "[cxComponentWrapper]", inputs: ["cxComponentWrapper"], outputs: ["cxComponentRef"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PageSlotComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-page-slot,[cx-page-slot]', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template\n  *ngIf=\"position\"\n  [cxOutlet]=\"position\"\n  [cxOutletContext]=\"{ components$: components$ }\"\n>\n  <ng-container *ngFor=\"let component of components\">\n    <ng-template\n      *ngIf=\"component.flexType\"\n      [cxOutlet]=\"component.flexType\"\n      [cxOutletContext]=\"{ component: component }\"\n      [cxOutletDefer]=\"getComponentDeferOptions(component.flexType)\"\n      (loaded)=\"isLoaded($event)\"\n    >\n      <ng-container [cxComponentWrapper]=\"component\"></ng-container>\n    </ng-template>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.DynamicAttributeService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.PageSlotService }]; }, propDecorators: { position: [{
                type: HostBinding,
                args: ['attr.position']
            }, {
                type: Input
            }], class: [{
                type: Input
            }, {
                type: HostBinding
            }], isPageFold: [{
                type: HostBinding,
                args: ['class.page-fold']
            }, {
                type: Input
            }], isPending: [{
                type: HostBinding,
                args: ['class.cx-pending']
            }], hasComponents: [{
                type: HostBinding,
                args: ['class.has-components']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbG90LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3Nsb3QvcGFnZS1zbG90LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3Nsb3QvcGFnZS1zbG90LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxXQUFXLEVBQ1gsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFLTCxjQUFjLEdBQ2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBSXhCOzs7Ozs7OztHQVFHO0FBTUgsTUFBTSxPQUFPLGlCQUFpQjtJQTZENUIsWUFDWSxVQUFzQixFQUN0Qix1QkFBZ0QsRUFDaEQsUUFBbUIsRUFDbkIsVUFBc0IsRUFDdEIsRUFBcUIsRUFDckIsZUFBZ0M7UUFMaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUE3QzVDOztXQUVHO1FBQ3NDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFNUQ7OztXQUdHO1FBQzhCLGNBQVMsR0FB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aUJBQWlCO2tHQUFqQixpQkFBaUIsNFhDakQ5QiwyakJBaUJBOzJGRGdDYSxpQkFBaUI7a0JBTDdCLFNBQVM7K0JBQ0UsNkJBQTZCLG1CQUV0Qix1QkFBdUIsQ0FBQyxNQUFNO3NQQVkzQyxRQUFRO3NCQUZYLFdBQVc7dUJBQUMsZUFBZTs7c0JBQzNCLEtBQUs7Z0JBV2tCLEtBQUs7c0JBQTVCLEtBQUs7O3NCQUFJLFdBQVc7Z0JBS29CLFVBQVU7c0JBQWxELFdBQVc7dUJBQUMsaUJBQWlCOztzQkFBRyxLQUFLO2dCQU1MLFNBQVM7c0JBQXpDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQU1lLGFBQWE7c0JBQTFELFdBQVc7dUJBQUMsc0JBQXNCOztzQkFBRyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNTZXJ2aWNlLFxuICBDb250ZW50U2xvdENvbXBvbmVudERhdGEsXG4gIENvbnRlbnRTbG90RGF0YSxcbiAgRHluYW1pY0F0dHJpYnV0ZVNlcnZpY2UsXG4gIGlzTm90VW5kZWZpbmVkLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEludGVyc2VjdGlvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9sYXlvdXQvbG9hZGluZy9pbnRlcnNlY3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUGFnZVNsb3RTZXJ2aWNlIH0gZnJvbSAnLi9wYWdlLXNsb3Quc2VydmljZSc7XG5cbi8qKlxuICogVGhlIGBQYWdlU2xvdENvbXBvbmVudGAgaXMgdXNlZCB0byByZW5kZXIgdGhlIENNUyBwYWdlIHNsb3QgYW5kIGl0J3MgY29tcG9uZW50cy5cbiAqXG4gKiBUaGUgUGFnZSBzbG90IGhvc3QgZWxlbWVudCB3aWxsIGJlIHN1cHBsZW1lbnRlZCB3aXRoIGNzcyBjbGFzc2VzIHNvIHRoYXQgdGhlIGxheW91dFxuICogY2FuIGJlIGZ1bGx5IGNvbnRyb2xsZWQgYnkgY3VzdG9tZXJzOlxuICogLSBUaGUgcGFnZSBzbG90IF9wb3NpdGlvbl8gaXMgYWRkZWQgYXMgYSBjc3MgY2xhc3MgYnkgZGVmYXVsdC5cbiAqIC0gVGhlIGBjeC1wZW5kaW5nYCBpcyBhZGRlZCBmb3IgYXMgbG9uZyBhcyB0aGUgc2xvdCBoYXNuJ3Qgc3RhcnQgbG9hZGluZy5cbiAqIC0gVGhlIGBwYWdlLWZvbGRgIHN0eWxlIGNsYXNzIGlzIGFkZGVkIGZvciB0aGUgcGFnZSBzbG90IHdoaWNoIGlzIGNvbmZpZ3VyZWQgYXMgdGhlIHBhZ2UgZm9sZC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcGFnZS1zbG90LFtjeC1wYWdlLXNsb3RdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2Utc2xvdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlU2xvdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBwb3NpdGlvbiByZXByZXNlbnRzIHRoZSB1bmlxdWUga2V5IGZvciBhIHBhZ2Ugc2xvdCBvbiBhIHNpbmdsZSBwYWdlLCBidXQgY2FuXG4gICAqIGJlIHJldXNlZCBjcm9zcyBwYWdlcy5cbiAgICpcbiAgICogVGhlIHBvc2l0aW9uIGlzIHVzZWQgdG8gZmluZCB0aGUgQ01TIGNvbXBvbmVudHMgZm9yIHRoZSBwYWdlIHNsb3QuIEl0IGlzIGFsc29cbiAgICogYWRkZWQgYXMgYW4gYWRkaXRpb25hbCBDU1MgY2xhc3Mgc28gdGhhdCBsYXlvdXQgY2FuIGJlIGFwcGxpZWQuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucG9zaXRpb24nKVxuICBASW5wdXQoKVxuICBzZXQgcG9zaXRpb24odmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMucG9zaXRpb24kLm5leHQodmFsdWUpO1xuICB9XG4gIGdldCBwb3NpdGlvbigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uJC52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWludGFpbnMgY3NzIGNsYXNzZXMgaW50cm9kdWNlZCBieSB0aGUgaG9zdCBhbmQgYWRkcyBhZGRpdGlvbmFsIGNsYXNzZXMuXG4gICAqL1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoKSBjbGFzczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcGFnZSBzbG90IGlzIHRoZSBsYXN0IHBhZ2Ugc2xvdCBhYm92ZSB0aGUgZm9sZC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGFnZS1mb2xkJykgQElucHV0KCkgaXNQYWdlRm9sZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgY29tcG9uZW50cyBvZiB0aGUgcGFnZSBzbG90IGhhdmVuJ3QgYmVlbiBsb2FkZWQgYXMgbG9uZ1xuICAgKiBhcyB0aGUgaXNQZW5kaW5nIHN0YXRlIGlzIHRydWUuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmN4LXBlbmRpbmcnKSBpc1BlbmRpbmcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcGFnZSBzbG90IGRvZXNuJ3QgY29udGFpbiBhbnkgY29tcG9uZW50cy4gVGhpcyBpcyBub1xuICAgKiBsb25nZXIgdXNlZCBpbiBzcGFydGFjdXMsIGJ1dCBrZXB0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGFzLWNvbXBvbmVudHMnKSBASW5wdXQoKSBoYXNDb21wb25lbnRzID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIHBvc2l0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIGNvbXBvbmVudHM6IENvbnRlbnRTbG90Q29tcG9uZW50RGF0YVtdO1xuXG4gIHByb3RlY3RlZCBzbG90JDogT2JzZXJ2YWJsZTxDb250ZW50U2xvdERhdGE+ID0gdGhpcy5wb3NpdGlvbiQucGlwZShcbiAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgIHN3aXRjaE1hcCgocG9zaXRpb24pID0+IHRoaXMuY21zU2VydmljZS5nZXRDb250ZW50U2xvdChwb3NpdGlvbikpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKHRoaXMuaXNEaXN0aW5jdClcbiAgKTtcblxuICAvKiogT2JzZXJ2ZXMgdGhlIGNvbXBvbmVudHMgZm9yIHRoZSBnaXZlbiBwYWdlIHNsb3QuICovXG4gIGNvbXBvbmVudHMkOiBPYnNlcnZhYmxlPENvbnRlbnRTbG90Q29tcG9uZW50RGF0YVtdPiA9IHRoaXMuc2xvdCQucGlwZShcbiAgICBtYXAoKHNsb3QpID0+IHNsb3Q/LmNvbXBvbmVudHMgPz8gW10pXG4gICk7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgcGVuZGluZyBjb21wb25lbnRzIHRoYXQgbXVzdCBiZSBsb2FkZWQgZm9yIHRoZSBwYWdlIHNsb3QgKi9cbiAgcHJpdmF0ZSBwZW5kaW5nQ29tcG9uZW50Q291bnQgPSAwO1xuXG4gIC8qKiBUcmFja3MgdGhlIGxhc3QgdXNlZCBwb3NpdGlvbiwgaW4gY2FzZSB0aGUgcGFnZSBzbG90IGlzIHVzZWQgZHluYW1pY2FsbHkgKi9cbiAgcHJpdmF0ZSBsYXN0UG9zaXRpb246IHN0cmluZztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNtc1NlcnZpY2U6IENtc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGR5bmFtaWNBdHRyaWJ1dGVTZXJ2aWNlOiBEeW5hbWljQXR0cmlidXRlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCBwYWdlU2xvdFNlcnZpY2U6IFBhZ2VTbG90U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5zbG90JC5waXBlKHRhcCgoc2xvdCkgPT4gdGhpcy5kZWNvcmF0ZShzbG90KSkpLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gdmFsdWU/LmNvbXBvbmVudHMgfHwgW107XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVjb3JhdGUoc2xvdDogQ29udGVudFNsb3REYXRhKTogdm9pZCB7XG4gICAgbGV0IGNscyA9IHRoaXMuY2xhc3MgfHwgJyc7XG5cbiAgICBpZiAodGhpcy5sYXN0UG9zaXRpb24gJiYgY2xzLmluZGV4T2YodGhpcy5sYXN0UG9zaXRpb24pID4gLTEpIHtcbiAgICAgIGNscyA9IGNscy5yZXBsYWNlKHRoaXMubGFzdFBvc2l0aW9uLCAnJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBvc2l0aW9uJC52YWx1ZSkge1xuICAgICAgY2xzICs9IGAgJHt0aGlzLnBvc2l0aW9uJC52YWx1ZX1gO1xuICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uJC52YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBob3N0IGJpbmRpbmdzXG4gICAgdGhpcy5wZW5kaW5nID0gc2xvdD8uY29tcG9uZW50cz8ubGVuZ3RoIHx8IDA7XG4gICAgdGhpcy5oYXNDb21wb25lbnRzID0gc2xvdD8uY29tcG9uZW50c1xuICAgICAgPyBzbG90Py5jb21wb25lbnRzPy5sZW5ndGggPiAwXG4gICAgICA6IGZhbHNlO1xuICAgIGlmIChjbHMgJiYgY2xzICE9PSB0aGlzLmNsYXNzKSB7XG4gICAgICB0aGlzLmNsYXNzID0gY2xzO1xuICAgIH1cblxuICAgIGlmIChzbG90KSB7XG4gICAgICB0aGlzLmR5bmFtaWNBdHRyaWJ1dGVTZXJ2aWNlLmFkZEF0dHJpYnV0ZXNUb1Nsb3QoXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLnJlbmRlcmVyLFxuICAgICAgICBzbG90XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwZW5kaW5nIGNvdW50IGZvciB0aGUgcGFnZSBzbG90IGNvbXBvbmVudHMuIE9uY2UgYWxsIHBlbmRpbmcgY29tcG9uZW50cyBhcmVcbiAgICogbG9hZGVkLCB0aGUgYGlzUGVuZGluZ2AgZmxhZyBpcyB1cGRhdGVkLCBzbyB0aGF0IHRoZSBhc3NvY2lhdGVkIGNsYXNzIGNhbiBiZSB1cGRhdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0IHBlbmRpbmcoY291bnQ6IG51bWJlcikge1xuICAgIHRoaXMucGVuZGluZ0NvbXBvbmVudENvdW50ID0gY291bnQ7XG4gICAgdGhpcy5pc1BlbmRpbmcgPSB0aGlzLnBlbmRpbmdDb21wb25lbnRDb3VudCA+IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHBlbmRpbmcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nQ29tcG9uZW50Q291bnQ7XG4gIH1cblxuICAvKlxuICAgKiBJcyB0cmlnZ2VyZWQgd2hlbiBhIGNvbXBvbmVudCBpcyBhZGRlZCB0byB0aGUgdmlldy4gVGhpcyBpcyB1c2VkIHRvXG4gICAqIHVwZGF0ZSB0aGUgcGVuZGluZyBjb3VudFxuICAgKi9cbiAgaXNMb2FkZWQobG9hZFN0YXRlOiBib29sZWFuKSB7XG4gICAgaWYgKGxvYWRTdGF0ZSkge1xuICAgICAgdGhpcy5wZW5kaW5nLS07XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYERlZmVyTG9hZGluZ1N0cmF0ZWd5YCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgY29tcG9uZW50IHNob3VsZCBiZVxuICAgKiByZW5kZXJlZCBpbnN0YW50bHkgb3Igd2hldGhlciBpdCBzaG91bGQgYmUgZGVmZXJyZWQuXG4gICAqL1xuICBnZXRDb21wb25lbnREZWZlck9wdGlvbnMoY29tcG9uZW50VHlwZTogc3RyaW5nKTogSW50ZXJzZWN0aW9uT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMucGFnZVNsb3RTZXJ2aWNlLmdldENvbXBvbmVudERlZmVyT3B0aW9ucyhcbiAgICAgIHRoaXMucG9zaXRpb24sXG4gICAgICBjb21wb25lbnRUeXBlXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0Rpc3RpbmN0KFxuICAgIG9sZDogQ29udGVudFNsb3REYXRhLFxuICAgIGN1cnJlbnQ6IENvbnRlbnRTbG90RGF0YVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIGN1cnJlbnQuY29tcG9uZW50cyAmJlxuICAgICAgICBvbGQuY29tcG9uZW50cyAmJlxuICAgICAgICBvbGQuY29tcG9uZW50cy5sZW5ndGggPT09IGN1cnJlbnQuY29tcG9uZW50cy5sZW5ndGggJiZcbiAgICAgICAgIW9sZC5jb21wb25lbnRzLmZpbmQoXG4gICAgICAgICAgKGVsLCBpbmRleCkgPT4gZWwudWlkICE9PSBjdXJyZW50LmNvbXBvbmVudHM/LltpbmRleF0udWlkXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZVxuICAqbmdJZj1cInBvc2l0aW9uXCJcbiAgW2N4T3V0bGV0XT1cInBvc2l0aW9uXCJcbiAgW2N4T3V0bGV0Q29udGV4dF09XCJ7IGNvbXBvbmVudHMkOiBjb21wb25lbnRzJCB9XCJcbj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29tcG9uZW50IG9mIGNvbXBvbmVudHNcIj5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICpuZ0lmPVwiY29tcG9uZW50LmZsZXhUeXBlXCJcbiAgICAgIFtjeE91dGxldF09XCJjb21wb25lbnQuZmxleFR5cGVcIlxuICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJ7IGNvbXBvbmVudDogY29tcG9uZW50IH1cIlxuICAgICAgW2N4T3V0bGV0RGVmZXJdPVwiZ2V0Q29tcG9uZW50RGVmZXJPcHRpb25zKGNvbXBvbmVudC5mbGV4VHlwZSlcIlxuICAgICAgKGxvYWRlZCk9XCJpc0xvYWRlZCgkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyIFtjeENvbXBvbmVudFdyYXBwZXJdPVwiY29tcG9uZW50XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuIl19