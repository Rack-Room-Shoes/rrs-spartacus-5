/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetGroupCollapsedState } from '../facet.model';
import * as i0 from "@angular/core";
import * as i1 from "../services/facet.service";
import * as i2 from "@angular/common";
import * as i3 from "../../../../misc/icon/icon.component";
import * as i4 from "../facet/facet.component";
import * as i5 from "../../../../../layout/a11y/keyboard-focus/focus.directive";
import * as i6 from "@spartacus/core";
export class FacetListComponent {
    constructor(facetService, elementRef, renderer) {
        this.facetService = facetService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        /** Emits when the list must close */
        this.closeList = new EventEmitter();
        /** The list of all facet and values related to the products in the list */
        this.facetList$ = this.facetService.facetList$;
        this.iconTypes = ICON_TYPE;
        this.dialogFocusConfig = {
            trap: true,
            block: true,
            focusOnEscape: true,
            autofocus: 'cx-facet',
        };
    }
    /**
     * Indicates that the facet navigation is rendered in dialog.
     */
    set isDialog(value) {
        this._isDialog = value;
        if (value) {
            this.renderer.addClass(document.body, 'modal-open');
        }
    }
    get isDialog() {
        return this._isDialog;
    }
    handleClick() {
        this.close();
    }
    /**
     * Toggles the facet group in case it is not expanded.
     */
    expandFacetGroup(facet, ref) {
        if (!ref.isExpanded) {
            this.facetService.toggle(facet, ref.isExpanded);
        }
    }
    /**
     * Indicates that the facet group has been expanded.
     */
    isExpanded(facet) {
        return this.facetService
            .getState(facet)
            .pipe(map((value) => value.toggled === FacetGroupCollapsedState.EXPANDED));
    }
    /**
     * Indicates that the facet group has been collapsed.
     */
    isCollapsed(facet) {
        return this.facetService
            .getState(facet)
            .pipe(map((value) => value.toggled === FacetGroupCollapsedState.COLLAPSED));
    }
    close(event) {
        this.renderer.removeClass(document.body, 'modal-open');
        this.closeList.emit(event);
    }
    block(event) {
        event?.stopPropagation();
    }
}
FacetListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FacetListComponent, deps: [{ token: i1.FacetService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
FacetListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: FacetListComponent, selector: "cx-facet-list", inputs: { isDialog: "isDialog" }, outputs: { closeList: "closeList" }, host: { listeners: { "click": "handleClick()" } }, ngImport: i0, template: "<section\n  class=\"inner\"\n  *ngIf=\"(facetList$ | async)?.facets as facets\"\n  [attr.aria-label]=\"'productFacetNavigation.filterBy.facet' | cxTranslate\"\n  [cxFocus]=\"isDialog ? dialogFocusConfig : {}\"\n  [tabindex]=\"-1\"\n  (esc)=\"close($event)\"\n  (click)=\"block($event)\"\n>\n  <h4>\n    {{ 'productList.filterBy.label' | cxTranslate }}\n    <button\n      type=\"button\"\n      class=\"close\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      (click)=\"close()\"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </h4>\n\n  <!-- \n      Here we'd like to introduce configurable facet components, \n      either by using specific configuration or generic sproutlets \n  -->\n  <cx-facet\n    *ngFor=\"let facet of facets\"\n    #facetRef\n    [facet]=\"facet\"\n    [class.expanded]=\"isExpanded(facet) | async\"\n    [class.collapsed]=\"isCollapsed(facet) | async\"\n    role=\"group\"\n    attr.aria-label=\"{{\n      'productFacetNavigation.ariaLabelItemsAvailable'\n        | cxTranslate\n          : {\n              name: facet.name,\n              count: facet?.values?.length\n            }\n    }}\"\n  ></cx-facet>\n</section>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i4.FacetComponent, selector: "cx-facet", inputs: ["expandIcon", "collapseIcon", "facet"] }, { kind: "directive", type: i5.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FacetListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-facet-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<section\n  class=\"inner\"\n  *ngIf=\"(facetList$ | async)?.facets as facets\"\n  [attr.aria-label]=\"'productFacetNavigation.filterBy.facet' | cxTranslate\"\n  [cxFocus]=\"isDialog ? dialogFocusConfig : {}\"\n  [tabindex]=\"-1\"\n  (esc)=\"close($event)\"\n  (click)=\"block($event)\"\n>\n  <h4>\n    {{ 'productList.filterBy.label' | cxTranslate }}\n    <button\n      type=\"button\"\n      class=\"close\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      (click)=\"close()\"\n    >\n      <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </h4>\n\n  <!-- \n      Here we'd like to introduce configurable facet components, \n      either by using specific configuration or generic sproutlets \n  -->\n  <cx-facet\n    *ngFor=\"let facet of facets\"\n    #facetRef\n    [facet]=\"facet\"\n    [class.expanded]=\"isExpanded(facet) | async\"\n    [class.collapsed]=\"isCollapsed(facet) | async\"\n    role=\"group\"\n    attr.aria-label=\"{{\n      'productFacetNavigation.ariaLabelItemsAvailable'\n        | cxTranslate\n          : {\n              name: facet.name,\n              count: facet?.values?.length\n            }\n    }}\"\n  ></cx-facet>\n</section>\n" }]
        }], ctorParameters: function () { return [{ type: i1.FacetService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { isDialog: [{
                type: Input
            }], closeList: [{
                type: Output
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi9mYWNldC1saXN0L2ZhY2V0LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24vZmFjZXQtbGlzdC9mYWNldC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsd0JBQXdCLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFTckUsTUFBTSxPQUFPLGtCQUFrQjtJQW9DN0IsWUFDWSxZQUEwQixFQUMxQixVQUFzQixFQUN0QixRQUFtQjtRQUZuQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUF0Qi9CLHFDQUFxQztRQUMzQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6QywyRUFBMkU7UUFDM0UsZUFBVSxHQUEwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztRQUVqRSxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBRXRCLHNCQUFpQixHQUFnQjtZQUMvQixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLFVBQVU7U0FDdEIsQ0FBQztJQVVDLENBQUM7SUF0Q0o7O09BRUc7SUFDSCxJQUNJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQWlCc0IsV0FBVztRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBUUQ7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBQyxLQUFZLEVBQUUsR0FBbUI7UUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVk7YUFDckIsUUFBUSxDQUFDLEtBQUssQ0FBQzthQUNmLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQ3BFLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZO2FBQ3JCLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDZixJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUNyRSxDQUFDO0lBQ04sQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFlO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFrQjtRQUN0QixLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7K0dBaEZVLGtCQUFrQjttR0FBbEIsa0JBQWtCLCtLQzlCL0Isc3NDQTBDQTsyRkRaYSxrQkFBa0I7a0JBTDlCLFNBQVM7K0JBQ0UsZUFBZSxtQkFFUix1QkFBdUIsQ0FBQyxNQUFNO29KQVEzQyxRQUFRO3NCQURYLEtBQUs7Z0JBYUksU0FBUztzQkFBbEIsTUFBTTtnQkFjZ0IsV0FBVztzQkFBakMsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGb2N1c0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2luZGV4JztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJy4uLy4uLy4uLy4uL21pc2MvaWNvbi9pY29uLm1vZGVsJztcbmltcG9ydCB7IEZhY2V0R3JvdXBDb2xsYXBzZWRTdGF0ZSwgRmFjZXRMaXN0IH0gZnJvbSAnLi4vZmFjZXQubW9kZWwnO1xuaW1wb3J0IHsgRmFjZXRDb21wb25lbnQgfSBmcm9tICcuLi9mYWNldC9mYWNldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmFjZXRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmFjZXQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWZhY2V0LWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldExpc3RDb21wb25lbnQge1xuICBwcml2YXRlIF9pc0RpYWxvZzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IHRoZSBmYWNldCBuYXZpZ2F0aW9uIGlzIHJlbmRlcmVkIGluIGRpYWxvZy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBpc0RpYWxvZyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzRGlhbG9nID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzRGlhbG9nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0RpYWxvZztcbiAgfVxuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBsaXN0IG11c3QgY2xvc2UgKi9cbiAgQE91dHB1dCgpIGNsb3NlTGlzdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKiogVGhlIGxpc3Qgb2YgYWxsIGZhY2V0IGFuZCB2YWx1ZXMgcmVsYXRlZCB0byB0aGUgcHJvZHVjdHMgaW4gdGhlIGxpc3QgKi9cbiAgZmFjZXRMaXN0JDogT2JzZXJ2YWJsZTxGYWNldExpc3Q+ID0gdGhpcy5mYWNldFNlcnZpY2UuZmFjZXRMaXN0JDtcblxuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG5cbiAgZGlhbG9nRm9jdXNDb25maWc6IEZvY3VzQ29uZmlnID0ge1xuICAgIHRyYXA6IHRydWUsXG4gICAgYmxvY2s6IHRydWUsXG4gICAgZm9jdXNPbkVzY2FwZTogdHJ1ZSxcbiAgICBhdXRvZm9jdXM6ICdjeC1mYWNldCcsXG4gIH07XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBoYW5kbGVDbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZmFjZXRTZXJ2aWNlOiBGYWNldFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBmYWNldCBncm91cCBpbiBjYXNlIGl0IGlzIG5vdCBleHBhbmRlZC5cbiAgICovXG4gIGV4cGFuZEZhY2V0R3JvdXAoZmFjZXQ6IEZhY2V0LCByZWY6IEZhY2V0Q29tcG9uZW50KSB7XG4gICAgaWYgKCFyZWYuaXNFeHBhbmRlZCkge1xuICAgICAgdGhpcy5mYWNldFNlcnZpY2UudG9nZ2xlKGZhY2V0LCByZWYuaXNFeHBhbmRlZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IHRoZSBmYWNldCBncm91cCBoYXMgYmVlbiBleHBhbmRlZC5cbiAgICovXG4gIGlzRXhwYW5kZWQoZmFjZXQ6IEZhY2V0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlXG4gICAgICAuZ2V0U3RhdGUoZmFjZXQpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh2YWx1ZSkgPT4gdmFsdWUudG9nZ2xlZCA9PT0gRmFjZXRHcm91cENvbGxhcHNlZFN0YXRlLkVYUEFOREVEKVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZmFjZXQgZ3JvdXAgaGFzIGJlZW4gY29sbGFwc2VkLlxuICAgKi9cbiAgaXNDb2xsYXBzZWQoZmFjZXQ6IEZhY2V0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlXG4gICAgICAuZ2V0U3RhdGUoZmFjZXQpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKCh2YWx1ZSkgPT4gdmFsdWUudG9nZ2xlZCA9PT0gRmFjZXRHcm91cENvbGxhcHNlZFN0YXRlLkNPTExBUFNFRClcbiAgICAgICk7XG4gIH1cblxuICBjbG9zZShldmVudD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgdGhpcy5jbG9zZUxpc3QuZW1pdChldmVudCk7XG4gIH1cblxuICBibG9jayhldmVudD86IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudD8uc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiIsIjxzZWN0aW9uXG4gIGNsYXNzPVwiaW5uZXJcIlxuICAqbmdJZj1cIihmYWNldExpc3QkIHwgYXN5bmMpPy5mYWNldHMgYXMgZmFjZXRzXCJcbiAgW2F0dHIuYXJpYS1sYWJlbF09XCIncHJvZHVjdEZhY2V0TmF2aWdhdGlvbi5maWx0ZXJCeS5mYWNldCcgfCBjeFRyYW5zbGF0ZVwiXG4gIFtjeEZvY3VzXT1cImlzRGlhbG9nID8gZGlhbG9nRm9jdXNDb25maWcgOiB7fVwiXG4gIFt0YWJpbmRleF09XCItMVwiXG4gIChlc2MpPVwiY2xvc2UoJGV2ZW50KVwiXG4gIChjbGljayk9XCJibG9jaygkZXZlbnQpXCJcbj5cbiAgPGg0PlxuICAgIHt7ICdwcm9kdWN0TGlzdC5maWx0ZXJCeS5sYWJlbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJjbG9zZVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24uY2xvc2UnIHwgY3hUcmFuc2xhdGVcIlxuICAgICAgKGNsaWNrKT1cImNsb3NlKClcIlxuICAgID5cbiAgICAgIDxjeC1pY29uIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIFt0eXBlXT1cImljb25UeXBlcy5DTE9TRVwiPjwvY3gtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9oND5cblxuICA8IS0tIFxuICAgICAgSGVyZSB3ZSdkIGxpa2UgdG8gaW50cm9kdWNlIGNvbmZpZ3VyYWJsZSBmYWNldCBjb21wb25lbnRzLCBcbiAgICAgIGVpdGhlciBieSB1c2luZyBzcGVjaWZpYyBjb25maWd1cmF0aW9uIG9yIGdlbmVyaWMgc3Byb3V0bGV0cyBcbiAgLS0+XG4gIDxjeC1mYWNldFxuICAgICpuZ0Zvcj1cImxldCBmYWNldCBvZiBmYWNldHNcIlxuICAgICNmYWNldFJlZlxuICAgIFtmYWNldF09XCJmYWNldFwiXG4gICAgW2NsYXNzLmV4cGFuZGVkXT1cImlzRXhwYW5kZWQoZmFjZXQpIHwgYXN5bmNcIlxuICAgIFtjbGFzcy5jb2xsYXBzZWRdPVwiaXNDb2xsYXBzZWQoZmFjZXQpIHwgYXN5bmNcIlxuICAgIHJvbGU9XCJncm91cFwiXG4gICAgYXR0ci5hcmlhLWxhYmVsPVwie3tcbiAgICAgICdwcm9kdWN0RmFjZXROYXZpZ2F0aW9uLmFyaWFMYWJlbEl0ZW1zQXZhaWxhYmxlJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIG5hbWU6IGZhY2V0Lm5hbWUsXG4gICAgICAgICAgICAgIGNvdW50OiBmYWNldD8udmFsdWVzPy5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICB9fVwiXG4gID48L2N4LWZhY2V0PlxuPC9zZWN0aW9uPlxuIl19