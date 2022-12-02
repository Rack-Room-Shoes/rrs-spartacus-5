/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "./visual-picking-product-filter.service";
import * as i2 from "@angular/forms";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/core";
export class VisualPickingProductFilterComponent {
    constructor(visualPickingProductFilterService) {
        this.visualPickingProductFilterService = visualPickingProductFilterService;
        this.iconTypes = ICON_TYPE;
    }
    /**
     * The filter input value.
     */
    set filter(filter) {
        this.visualPickingProductFilterService.filter = filter;
    }
    get filter() {
        return this.visualPickingProductFilterService.filter;
    }
}
VisualPickingProductFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualPickingProductFilterComponent, deps: [{ token: i1.VisualPickingProductFilterService }], target: i0.ɵɵFactoryTarget.Component });
VisualPickingProductFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: VisualPickingProductFilterComponent, selector: "cx-epd-visualization-product-filter", inputs: { filter: "filter" }, ngImport: i0, template: "<div class=\"form-group search-wrapper\">\n  <input\n    type=\"text\"\n    [(ngModel)]=\"filter\"\n    class=\"form-control\"\n    placeholder=\"{{\n      'epdVisualization.visualPicking.visualPickingProductFilter.input.placeholder'\n        | cxTranslate\n    }}\"\n  />\n\n  <cx-icon\n    [type]=\"iconTypes.SEARCH\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.searchButton.label'\n        | cxTranslate\n    \"\n    class=\"search\"\n    [hidden]=\"filter.length > 0\"\n  ></cx-icon>\n\n  <cx-icon\n    [type]=\"iconTypes.RESET\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.resetButton.label'\n        | cxTranslate\n    \"\n    (mousedown)=\"filter = ''\"\n    (keydown.enter)=\"filter = ''\"\n    [hidden]=\"filter.length === 0\"\n    class=\"reset\"\n    tabindex=\"0\"\n  ></cx-icon>\n</div>\n", dependencies: [{ kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualPickingProductFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-product-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"form-group search-wrapper\">\n  <input\n    type=\"text\"\n    [(ngModel)]=\"filter\"\n    class=\"form-control\"\n    placeholder=\"{{\n      'epdVisualization.visualPicking.visualPickingProductFilter.input.placeholder'\n        | cxTranslate\n    }}\"\n  />\n\n  <cx-icon\n    [type]=\"iconTypes.SEARCH\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.searchButton.label'\n        | cxTranslate\n    \"\n    class=\"search\"\n    [hidden]=\"filter.length > 0\"\n  ></cx-icon>\n\n  <cx-icon\n    [type]=\"iconTypes.RESET\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.resetButton.label'\n        | cxTranslate\n    \"\n    (mousedown)=\"filter = ''\"\n    (keydown.enter)=\"filter = ''\"\n    [hidden]=\"filter.length === 0\"\n    class=\"reset\"\n    tabindex=\"0\"\n  ></cx-icon>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.VisualPickingProductFilterService }]; }, propDecorators: { filter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctcHJvZHVjdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb21wb25lbnRzL3Zpc3VhbC1waWNraW5nL3Zpc3VhbC1waWNraW5nLXRhYi9wcm9kdWN0LWZpbHRlci92aXN1YWwtcGlja2luZy1wcm9kdWN0LWZpbHRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXBpY2tpbmcvdmlzdWFsLXBpY2tpbmctdGFiL3Byb2R1Y3QtZmlsdGVyL3Zpc3VhbC1waWNraW5nLXByb2R1Y3QtZmlsdGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQVFsRCxNQUFNLE9BQU8sbUNBQW1DO0lBQzlDLFlBQ1ksaUNBQW9FO1FBQXBFLHNDQUFpQyxHQUFqQyxpQ0FBaUMsQ0FBbUM7UUFjaEYsY0FBUyxHQUFHLFNBQVMsQ0FBQztJQWJuQixDQUFDO0lBRUo7O09BRUc7SUFDSCxJQUNJLE1BQU0sQ0FBQyxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pELENBQUM7SUFDRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLENBQUM7SUFDdkQsQ0FBQzs7Z0lBZFUsbUNBQW1DO29IQUFuQyxtQ0FBbUMseUdDZmhELG00QkFrQ0E7MkZEbkJhLG1DQUFtQztrQkFML0MsU0FBUzsrQkFDRSxxQ0FBcUMsbUJBRTlCLHVCQUF1QixDQUFDLE1BQU07d0hBVzNDLE1BQU07c0JBRFQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi92aXN1YWwtcGlja2luZy1wcm9kdWN0LWZpbHRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZXBkLXZpc3VhbGl6YXRpb24tcHJvZHVjdC1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlzdWFsLXBpY2tpbmctcHJvZHVjdC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJTZXJ2aWNlOiBWaXN1YWxQaWNraW5nUHJvZHVjdEZpbHRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBUaGUgZmlsdGVyIGlucHV0IHZhbHVlLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGZpbHRlcihmaWx0ZXI6IHN0cmluZykge1xuICAgIHRoaXMudmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJTZXJ2aWNlLmZpbHRlciA9IGZpbHRlcjtcbiAgfVxuICBnZXQgZmlsdGVyKCkge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyU2VydmljZS5maWx0ZXI7XG4gIH1cblxuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtd3JhcHBlclwiPlxuICA8aW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgWyhuZ01vZGVsKV09XCJmaWx0ZXJcIlxuICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICBwbGFjZWhvbGRlcj1cInt7XG4gICAgICAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxQaWNraW5nLnZpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyLmlucHV0LnBsYWNlaG9sZGVyJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgfX1cIlxuICAvPlxuXG4gIDxjeC1pY29uXG4gICAgW3R5cGVdPVwiaWNvblR5cGVzLlNFQVJDSFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICdlcGRWaXN1YWxpemF0aW9uLnZpc3VhbFBpY2tpbmcudmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXIuc2VhcmNoQnV0dG9uLmxhYmVsJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgXCJcbiAgICBjbGFzcz1cInNlYXJjaFwiXG4gICAgW2hpZGRlbl09XCJmaWx0ZXIubGVuZ3RoID4gMFwiXG4gID48L2N4LWljb24+XG5cbiAgPGN4LWljb25cbiAgICBbdHlwZV09XCJpY29uVHlwZXMuUkVTRVRcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxQaWNraW5nLnZpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyLnJlc2V0QnV0dG9uLmxhYmVsJ1xuICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgXCJcbiAgICAobW91c2Vkb3duKT1cImZpbHRlciA9ICcnXCJcbiAgICAoa2V5ZG93bi5lbnRlcik9XCJmaWx0ZXIgPSAnJ1wiXG4gICAgW2hpZGRlbl09XCJmaWx0ZXIubGVuZ3RoID09PSAwXCJcbiAgICBjbGFzcz1cInJlc2V0XCJcbiAgICB0YWJpbmRleD1cIjBcIlxuICA+PC9jeC1pY29uPlxuPC9kaXY+XG4iXX0=