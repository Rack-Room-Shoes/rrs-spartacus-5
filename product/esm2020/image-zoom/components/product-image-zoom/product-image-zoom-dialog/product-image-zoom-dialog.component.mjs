/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostListener, Input, } from '@angular/core';
import { ICON_TYPE, } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../product-image-zoom-view/product-image-zoom-view.component";
import * as i3 from "@spartacus/core";
export class ProductImageZoomDialogComponent {
    constructor(launchDialogService, el) {
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.iconType = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    close(reason = '') {
        this.launchDialogService.closeDialog(reason);
    }
}
ProductImageZoomDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageZoomDialogComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ProductImageZoomDialogComponent, selector: "cx-product-image-zoom-dialog", inputs: { galleryIndex: "galleryIndex" }, host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div class=\"cx-image-zoom-dialog\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-dialog-content\">\n    <div class=\"cx-dialog-header\">\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'productImageZoomDialog.close' | cxTranslate\"\n        (click)=\"close('cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconType.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-dialog-body\">\n      <cx-product-image-zoom-view\n        [galleryIndex]=\"galleryIndex\"\n      ></cx-product-image-zoom-view>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i2.ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: ["galleryIndex"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageZoomDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-image-zoom-dialog\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-dialog-content\">\n    <div class=\"cx-dialog-header\">\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'productImageZoomDialog.close' | cxTranslate\"\n        (click)=\"close('cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconType.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-dialog-body\">\n      <cx-product-image-zoom-view\n        [galleryIndex]=\"galleryIndex\"\n      ></cx-product-image-zoom-view>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { galleryIndex: [{
                type: Input
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS1kaWFsb2cvcHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS1kaWFsb2cvcHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsU0FBUyxHQUVWLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTy9CLE1BQU0sT0FBTywrQkFBK0I7SUFvQjFDLFlBQ1ksbUJBQXdDLEVBQ3hDLEVBQWM7UUFEZCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFyQjFCLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFFckIsZ0JBQVcsR0FBZ0I7WUFDekIsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLFNBQVMsRUFBRSxRQUFRO1lBQ25CLGFBQWEsRUFBRSxJQUFJO1NBQ3BCLENBQUM7SUFlQyxDQUFDO0lBVkosV0FBVyxDQUFDLEtBQWM7UUFDeEIsMkNBQTJDO1FBQzNDLElBQUssS0FBSyxDQUFDLE1BQWMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBT0QsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFO1FBQ2YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs0SEEzQlUsK0JBQStCO2dIQUEvQiwrQkFBK0IsdUtDeEI1Qyw2b0JBcUJBOzJGREdhLCtCQUErQjtrQkFMM0MsU0FBUzsrQkFDRSw4QkFBOEIsbUJBRXZCLHVCQUF1QixDQUFDLE1BQU07bUlBWXRDLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR04sV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9jdXNDb25maWcsXG4gIElDT05fVFlQRSxcbiAgTGF1bmNoRGlhbG9nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAncHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW1hZ2Vab29tRGlhbG9nQ29tcG9uZW50IHtcbiAgaWNvblR5cGUgPSBJQ09OX1RZUEU7XG5cbiAgZm9jdXNDb25maWc6IEZvY3VzQ29uZmlnID0ge1xuICAgIHRyYXA6IHRydWUsXG4gICAgYmxvY2s6IHRydWUsXG4gICAgYXV0b2ZvY3VzOiAnYnV0dG9uJyxcbiAgICBmb2N1c09uRXNjYXBlOiB0cnVlLFxuICB9O1xuXG4gIEBJbnB1dCgpIGdhbGxlcnlJbmRleDogbnVtYmVyO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBDbG9zZSBvbiBjbGljayBvdXRzaWRlIHRoZSBkaWFsb2cgd2luZG93XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgYW55KS50YWdOYW1lID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudGFnTmFtZSkge1xuICAgICAgdGhpcy5jbG9zZSgnQ3Jvc3MgY2xpY2snKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIGNsb3NlKHJlYXNvbiA9ICcnKTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjeC1pbWFnZS16b29tLWRpYWxvZ1wiIFtjeEZvY3VzXT1cImZvY3VzQ29uZmlnXCI+XG4gIDxkaXYgY2xhc3M9XCJjeC1kaWFsb2ctY29udGVudFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjeC1kaWFsb2ctaGVhZGVyXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImNsb3NlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIncHJvZHVjdEltYWdlWm9vbURpYWxvZy5jbG9zZScgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICAgIChjbGljayk9XCJjbG9zZSgnY3Jvc3MgY2xpY2snKVwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLkNMT1NFXCI+PC9jeC1pY29uPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtZGlhbG9nLWJvZHlcIj5cbiAgICAgIDxjeC1wcm9kdWN0LWltYWdlLXpvb20tdmlld1xuICAgICAgICBbZ2FsbGVyeUluZGV4XT1cImdhbGxlcnlJbmRleFwiXG4gICAgICA+PC9jeC1wcm9kdWN0LWltYWdlLXpvb20tdmlldz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==