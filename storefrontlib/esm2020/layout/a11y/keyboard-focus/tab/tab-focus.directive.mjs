/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostListener } from '@angular/core';
import { AutoFocusDirective } from '../autofocus/auto-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./tab-focus.service";
/**
 * Directive to move the focus of ("locked") child elements. This is useful
 * for a nested list of tabs, carousel slides or any group of elements that
 * requires horizontal navigation.
 */
export class TabFocusDirective extends AutoFocusDirective {
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        /** `tab` defaults to true if the directive `cxTabFocus` is used. */
        this.defaultConfig = { tab: true };
        // @Input('cxTabFocus')
        this.config = {};
    }
    handleNextTab(event) {
        if (this.config?.tab) {
            this.service.moveTab(this.host, this.config, 1 /* MOVE_FOCUS.NEXT */, event);
        }
    }
    handlePreviousTab(event) {
        if (this.config?.tab) {
            this.service.moveTab(this.host, this.config, -1 /* MOVE_FOCUS.PREV */, event);
        }
    }
}
TabFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TabFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.TabFocusService }], target: i0.ɵɵFactoryTarget.Directive });
TabFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: TabFocusDirective, host: { listeners: { "keydown.arrowRight": "handleNextTab($event)", "keydown.arrowLeft": "handlePreviousTab($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TabFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.TabFocusService }]; }, propDecorators: { handleNextTab: [{
                type: HostListener,
                args: ['keydown.arrowRight', ['$event']]
            }], handlePreviousTab: [{
                type: HostListener,
                args: ['keydown.arrowLeft', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMvdGFiL3RhYi1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFJdkU7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxrQkFBa0I7SUFxQnZELFlBQ1ksVUFBc0IsRUFDdEIsT0FBd0I7UUFFbEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUhqQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBdEJwQyxvRUFBb0U7UUFDMUQsa0JBQWEsR0FBbUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFeEQsdUJBQXVCO1FBQ2IsV0FBTSxHQUFtQixFQUFFLENBQUM7SUFxQnRDLENBQUM7SUFsQkQsYUFBYSxDQUFDLEtBQW9CO1FBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSwyQkFBbUIsS0FBSyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBR0QsaUJBQWlCLENBQUMsS0FBb0I7UUFDcEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLDRCQUFtQixLQUFLLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7OzhHQW5CVSxpQkFBaUI7a0dBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixTQUFTOytIQVNSLGFBQWE7c0JBRFosWUFBWTt1QkFBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFROUMsaUJBQWlCO3NCQURoQixZQUFZO3VCQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dG9Gb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4uL2F1dG9mb2N1cy9hdXRvLWZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNT1ZFX0ZPQ1VTLCBUYWJGb2N1c0NvbmZpZyB9IGZyb20gJy4uL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFRhYkZvY3VzU2VydmljZSB9IGZyb20gJy4vdGFiLWZvY3VzLnNlcnZpY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBtb3ZlIHRoZSBmb2N1cyBvZiAoXCJsb2NrZWRcIikgY2hpbGQgZWxlbWVudHMuIFRoaXMgaXMgdXNlZnVsXG4gKiBmb3IgYSBuZXN0ZWQgbGlzdCBvZiB0YWJzLCBjYXJvdXNlbCBzbGlkZXMgb3IgYW55IGdyb3VwIG9mIGVsZW1lbnRzIHRoYXRcbiAqIHJlcXVpcmVzIGhvcml6b250YWwgbmF2aWdhdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSgpIC8vIHNlbGVjdG9yOiAnW2N4VGFiRm9jdXNdJ1xuZXhwb3J0IGNsYXNzIFRhYkZvY3VzRGlyZWN0aXZlIGV4dGVuZHMgQXV0b0ZvY3VzRGlyZWN0aXZlIHtcbiAgLyoqIGB0YWJgIGRlZmF1bHRzIHRvIHRydWUgaWYgdGhlIGRpcmVjdGl2ZSBgY3hUYWJGb2N1c2AgaXMgdXNlZC4gKi9cbiAgcHJvdGVjdGVkIGRlZmF1bHRDb25maWc6IFRhYkZvY3VzQ29uZmlnID0geyB0YWI6IHRydWUgfTtcblxuICAvLyBASW5wdXQoJ2N4VGFiRm9jdXMnKVxuICBwcm90ZWN0ZWQgY29uZmlnOiBUYWJGb2N1c0NvbmZpZyA9IHt9O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXG4gIGhhbmRsZU5leHRUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb25maWc/LnRhYikge1xuICAgICAgdGhpcy5zZXJ2aWNlLm1vdmVUYWIodGhpcy5ob3N0LCB0aGlzLmNvbmZpZywgTU9WRV9GT0NVUy5ORVhULCBldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd0xlZnQnLCBbJyRldmVudCddKVxuICBoYW5kbGVQcmV2aW91c1RhYihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmNvbmZpZz8udGFiKSB7XG4gICAgICB0aGlzLnNlcnZpY2UubW92ZVRhYih0aGlzLmhvc3QsIHRoaXMuY29uZmlnLCBNT1ZFX0ZPQ1VTLlBSRVYsIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogVGFiRm9jdXNTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHNlcnZpY2UpO1xuICB9XG59XG4iXX0=