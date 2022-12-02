/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "../services/facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "../../../../misc/icon/icon.component";
import * as i5 from "../../../../../layout/a11y/keyboard-focus/focus.directive";
import * as i6 from "@spartacus/core";
/**
 * Active facets render the applied facet values as a list of focusable buttons
 * which can be used to remove the applied facet value.
 */
export class ActiveFacetsComponent {
    constructor(facetService) {
        this.facetService = facetService;
        /** Active facets which are applied to the product results. */
        this.facetList$ = this.facetService.facetList$;
        /** Configurable icon which is used for the active facet close button */
        this.closeIcon = ICON_TYPE.CLOSE;
    }
    getLinkParams(facet) {
        return this.facetService.getLinkParams(facet.removeQuery?.query?.value ?? '');
    }
    /**
     * The focus key is used to persist the focus on the facet when the DOM is being
     * recreated. We only apply the focus key for the given _active_ facet when there
     * the original facets is not available. This happens for non multi-valued facets.
     *
     * With this approach, the we keep the focus, either at the facet list or on the
     * active facets.
     */
    getFocusKey(facetList, facet) {
        return facetList.facets?.find((f) => f.values?.find((val) => val.name === facet.facetValueName))
            ? ''
            : facet.facetValueName;
    }
    /**
     * Purpose of this function is to allow keyboard users to click on a filter they
     * wish to remove by pressing spacebar. Event not handled natively by <a> elements.
     *
     * @param event spacebar keydown
     */
    removeFilterWithSpacebar(event) {
        event?.preventDefault(); // Avoid spacebar scroll
        event?.target?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
    }
}
ActiveFacetsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveFacetsComponent, deps: [{ token: i1.FacetService }], target: i0.ɵɵFactoryTarget.Component });
ActiveFacetsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ActiveFacetsComponent, selector: "cx-active-facets", inputs: { closeIcon: "closeIcon" }, ngImport: i0, template: "<ng-container *ngIf=\"facetList$ | async as facetList\">\n  <h4 *ngIf=\"facetList.activeFacets && facetList.activeFacets.length > 0\">\n    {{ 'productList.appliedFilter' | cxTranslate }}\n  </h4>\n\n  <a\n    *ngFor=\"let facet of facetList?.activeFacets\"\n    routerLink=\"./\"\n    [queryParams]=\"getLinkParams(facet)\"\n    [cxFocus]=\"{ key: getFocusKey(facetList, facet) }\"\n    role=\"button\"\n    (keydown.space)=\"removeFilterWithSpacebar($event)\"\n    [attr.aria-label]=\"\n      'productList.activeFilter' | cxTranslate: { filter: facet.facetValueName }\n    \"\n  >\n    <span>{{ facet.facetValueName }}</span>\n    <cx-icon aria-hidden=\"true\" [type]=\"closeIcon\"></cx-icon>\n  </a>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i5.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveFacetsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-active-facets', changeDetection: ChangeDetectionStrategy.Default, template: "<ng-container *ngIf=\"facetList$ | async as facetList\">\n  <h4 *ngIf=\"facetList.activeFacets && facetList.activeFacets.length > 0\">\n    {{ 'productList.appliedFilter' | cxTranslate }}\n  </h4>\n\n  <a\n    *ngFor=\"let facet of facetList?.activeFacets\"\n    routerLink=\"./\"\n    [queryParams]=\"getLinkParams(facet)\"\n    [cxFocus]=\"{ key: getFocusKey(facetList, facet) }\"\n    role=\"button\"\n    (keydown.space)=\"removeFilterWithSpacebar($event)\"\n    [attr.aria-label]=\"\n      'productList.activeFilter' | cxTranslate: { filter: facet.facetValueName }\n    \"\n  >\n    <span>{{ facet.facetValueName }}</span>\n    <cx-icon aria-hidden=\"true\" [type]=\"closeIcon\"></cx-icon>\n  </a>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.FacetService }]; }, propDecorators: { closeIcon: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWZhY2V0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi9hY3RpdmUtZmFjZXRzL2FjdGl2ZS1mYWNldHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24vYWN0aXZlLWZhY2V0cy9hY3RpdmUtZmFjZXRzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7Ozs7Ozs7O0FBSS9FOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxxQkFBcUI7SUFPaEMsWUFBc0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFOaEQsOERBQThEO1FBQzlELGVBQVUsR0FBMEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFFakUsd0VBQXdFO1FBQy9ELGNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBRWMsQ0FBQztJQUVwRCxhQUFhLENBQUMsS0FBaUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FDcEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FDdEMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsV0FBVyxDQUFDLFNBQW9CLEVBQUUsS0FBaUI7UUFDakQsT0FBTyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2xDLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FDM0Q7WUFDQyxDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHdCQUF3QixDQUFDLEtBQWE7UUFDcEMsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsd0JBQXdCO1FBQ2pELEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7a0hBeENVLHFCQUFxQjtzR0FBckIscUJBQXFCLDRGQ3RCbEMsbXRCQW9CQTsyRkRFYSxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE9BQU87bUdBT3ZDLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jbXMtY29tcG9uZW50cy9taXNjL2ljb24vaWNvbi5tb2RlbCc7XG5pbXBvcnQgeyBGYWNldExpc3QgfSBmcm9tICcuLi9mYWNldC5tb2RlbCc7XG5pbXBvcnQgeyBGYWNldFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mYWNldC5zZXJ2aWNlJztcblxuLyoqXG4gKiBBY3RpdmUgZmFjZXRzIHJlbmRlciB0aGUgYXBwbGllZCBmYWNldCB2YWx1ZXMgYXMgYSBsaXN0IG9mIGZvY3VzYWJsZSBidXR0b25zXG4gKiB3aGljaCBjYW4gYmUgdXNlZCB0byByZW1vdmUgdGhlIGFwcGxpZWQgZmFjZXQgdmFsdWUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWFjdGl2ZS1mYWNldHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWN0aXZlLWZhY2V0cy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZlRmFjZXRzQ29tcG9uZW50IHtcbiAgLyoqIEFjdGl2ZSBmYWNldHMgd2hpY2ggYXJlIGFwcGxpZWQgdG8gdGhlIHByb2R1Y3QgcmVzdWx0cy4gKi9cbiAgZmFjZXRMaXN0JDogT2JzZXJ2YWJsZTxGYWNldExpc3Q+ID0gdGhpcy5mYWNldFNlcnZpY2UuZmFjZXRMaXN0JDtcblxuICAvKiogQ29uZmlndXJhYmxlIGljb24gd2hpY2ggaXMgdXNlZCBmb3IgdGhlIGFjdGl2ZSBmYWNldCBjbG9zZSBidXR0b24gKi9cbiAgQElucHV0KCkgY2xvc2VJY29uID0gSUNPTl9UWVBFLkNMT1NFO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBmYWNldFNlcnZpY2U6IEZhY2V0U2VydmljZSkge31cblxuICBnZXRMaW5rUGFyYW1zKGZhY2V0OiBCcmVhZGNydW1iKSB7XG4gICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlLmdldExpbmtQYXJhbXMoXG4gICAgICBmYWNldC5yZW1vdmVRdWVyeT8ucXVlcnk/LnZhbHVlID8/ICcnXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZm9jdXMga2V5IGlzIHVzZWQgdG8gcGVyc2lzdCB0aGUgZm9jdXMgb24gdGhlIGZhY2V0IHdoZW4gdGhlIERPTSBpcyBiZWluZ1xuICAgKiByZWNyZWF0ZWQuIFdlIG9ubHkgYXBwbHkgdGhlIGZvY3VzIGtleSBmb3IgdGhlIGdpdmVuIF9hY3RpdmVfIGZhY2V0IHdoZW4gdGhlcmVcbiAgICogdGhlIG9yaWdpbmFsIGZhY2V0cyBpcyBub3QgYXZhaWxhYmxlLiBUaGlzIGhhcHBlbnMgZm9yIG5vbiBtdWx0aS12YWx1ZWQgZmFjZXRzLlxuICAgKlxuICAgKiBXaXRoIHRoaXMgYXBwcm9hY2gsIHRoZSB3ZSBrZWVwIHRoZSBmb2N1cywgZWl0aGVyIGF0IHRoZSBmYWNldCBsaXN0IG9yIG9uIHRoZVxuICAgKiBhY3RpdmUgZmFjZXRzLlxuICAgKi9cbiAgZ2V0Rm9jdXNLZXkoZmFjZXRMaXN0OiBGYWNldExpc3QsIGZhY2V0OiBCcmVhZGNydW1iKSB7XG4gICAgcmV0dXJuIGZhY2V0TGlzdC5mYWNldHM/LmZpbmQoKGYpID0+XG4gICAgICBmLnZhbHVlcz8uZmluZCgodmFsKSA9PiB2YWwubmFtZSA9PT0gZmFjZXQuZmFjZXRWYWx1ZU5hbWUpXG4gICAgKVxuICAgICAgPyAnJ1xuICAgICAgOiBmYWNldC5mYWNldFZhbHVlTmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXJwb3NlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gYWxsb3cga2V5Ym9hcmQgdXNlcnMgdG8gY2xpY2sgb24gYSBmaWx0ZXIgdGhleVxuICAgKiB3aXNoIHRvIHJlbW92ZSBieSBwcmVzc2luZyBzcGFjZWJhci4gRXZlbnQgbm90IGhhbmRsZWQgbmF0aXZlbHkgYnkgPGE+IGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgc3BhY2ViYXIga2V5ZG93blxuICAgKi9cbiAgcmVtb3ZlRmlsdGVyV2l0aFNwYWNlYmFyKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTsgLy8gQXZvaWQgc3BhY2ViYXIgc2Nyb2xsXG4gICAgZXZlbnQ/LnRhcmdldD8uZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7IGNhbmNlbGFibGU6IHRydWUgfSkpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZmFjZXRMaXN0JCB8IGFzeW5jIGFzIGZhY2V0TGlzdFwiPlxuICA8aDQgKm5nSWY9XCJmYWNldExpc3QuYWN0aXZlRmFjZXRzICYmIGZhY2V0TGlzdC5hY3RpdmVGYWNldHMubGVuZ3RoID4gMFwiPlxuICAgIHt7ICdwcm9kdWN0TGlzdC5hcHBsaWVkRmlsdGVyJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvaDQ+XG5cbiAgPGFcbiAgICAqbmdGb3I9XCJsZXQgZmFjZXQgb2YgZmFjZXRMaXN0Py5hY3RpdmVGYWNldHNcIlxuICAgIHJvdXRlckxpbms9XCIuL1wiXG4gICAgW3F1ZXJ5UGFyYW1zXT1cImdldExpbmtQYXJhbXMoZmFjZXQpXCJcbiAgICBbY3hGb2N1c109XCJ7IGtleTogZ2V0Rm9jdXNLZXkoZmFjZXRMaXN0LCBmYWNldCkgfVwiXG4gICAgcm9sZT1cImJ1dHRvblwiXG4gICAgKGtleWRvd24uc3BhY2UpPVwicmVtb3ZlRmlsdGVyV2l0aFNwYWNlYmFyKCRldmVudClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAncHJvZHVjdExpc3QuYWN0aXZlRmlsdGVyJyB8IGN4VHJhbnNsYXRlOiB7IGZpbHRlcjogZmFjZXQuZmFjZXRWYWx1ZU5hbWUgfVxuICAgIFwiXG4gID5cbiAgICA8c3Bhbj57eyBmYWNldC5mYWNldFZhbHVlTmFtZSB9fTwvc3Bhbj5cbiAgICA8Y3gtaWNvbiBhcmlhLWhpZGRlbj1cInRydWVcIiBbdHlwZV09XCJjbG9zZUljb25cIj48L2N4LWljb24+XG4gIDwvYT5cbjwvbmctY29udGFpbmVyPlxuIl19