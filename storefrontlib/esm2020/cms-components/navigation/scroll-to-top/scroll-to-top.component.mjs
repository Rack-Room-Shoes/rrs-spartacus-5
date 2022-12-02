/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, } from '@angular/core';
import { ScrollBehavior, } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../cms-structure/page/model/cms-component-data";
import * as i3 from "../../../layout/a11y/index";
import * as i4 from "../../misc/icon/icon.component";
export class ScrollToTopComponent {
    constructor(winRef, componentData, selectFocusUtility) {
        this.winRef = winRef;
        this.componentData = componentData;
        this.selectFocusUtility = selectFocusUtility;
        this.iconTypes = ICON_TYPE;
        this.window = this.winRef.nativeWindow;
        this.scrollBehavior = ScrollBehavior.SMOOTH;
        this.displayThreshold = (this.window?.innerHeight ?? 400) / 2;
    }
    onScroll() {
        if (this.window) {
            this.display = this.window.scrollY > this.displayThreshold;
        }
    }
    ngOnInit() {
        this.setConfig();
    }
    setConfig() {
        this.componentData.data$.pipe(take(1)).subscribe((data) => {
            this.scrollBehavior = data.scrollBehavior ?? this.scrollBehavior;
            this.displayThreshold = data.displayThreshold ?? this.displayThreshold;
        });
    }
    /**
     * Scroll back to the top of the page and set focus on top most focusable element.
     */
    scrollToTop() {
        // Focus first focusable element within the html body
        this.selectFocusUtility
            .findFirstFocusable(this.winRef.document.body, { autofocus: '' })
            ?.focus();
        this.window?.scrollTo({
            top: 0,
            behavior: this.scrollBehavior,
        });
    }
}
ScrollToTopComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ScrollToTopComponent, deps: [{ token: i1.WindowRef }, { token: i2.CmsComponentData }, { token: i3.SelectFocusUtility }], target: i0.ɵɵFactoryTarget.Component });
ScrollToTopComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ScrollToTopComponent, selector: "cx-scroll-to-top", host: { listeners: { "window:scroll": "onScroll($event)" }, properties: { "class.display": "this.display" } }, ngImport: i0, template: "<button\n  [attr.aria-label]=\"'navigation.scrollToTop' | cxTranslate\"\n  class=\"cx-scroll-to-top-btn\"\n  (click)=\"scrollToTop()\"\n>\n  <span aria-hidden=\"true\">\n    <cx-icon class=\"caret-up-icon\" [type]=\"iconTypes.CARET_UP\"></cx-icon>\n  </span>\n</button>\n", dependencies: [{ kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ScrollToTopComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-scroll-to-top', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  [attr.aria-label]=\"'navigation.scrollToTop' | cxTranslate\"\n  class=\"cx-scroll-to-top-btn\"\n  (click)=\"scrollToTop()\"\n>\n  <span aria-hidden=\"true\">\n    <cx-icon class=\"caret-up-icon\" [type]=\"iconTypes.CARET_UP\"></cx-icon>\n  </span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.CmsComponentData }, { type: i3.SelectFocusUtility }]; }, propDecorators: { display: [{
                type: HostBinding,
                args: ['class.display']
            }], onScroll: [{
                type: HostListener,
                args: ['window:scroll', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXRvLXRvcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vc2Nyb2xsLXRvLXRvcC9zY3JvbGwtdG8tdG9wLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9zY3JvbGwtdG8tdG9wL3Njcm9sbC10by10b3AuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEdBRWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGNBQWMsR0FDZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7OztBQVF2RCxNQUFNLE9BQU8sb0JBQW9CO0lBaUIvQixZQUNZLE1BQWlCLEVBQ2pCLGFBQXdELEVBQ3hELGtCQUFzQztRQUZ0QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUEyQztRQUN4RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBbkJsRCxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBS1osV0FBTSxHQUF1QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN0RCxtQkFBYyxHQUFtQixjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ3ZELHFCQUFnQixHQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBYXhFLENBQUM7SUFWSixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0lBUUQsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRVMsU0FBUztRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDakUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QscURBQXFEO1FBQ3JELElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ2pFLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFFWixJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztZQUNwQixHQUFHLEVBQUUsQ0FBQztZQUNOLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDOztpSEEvQ1Usb0JBQW9CO3FHQUFwQixvQkFBb0IsdUtDNUJqQyxpUkFTQTsyRkRtQmEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLGtCQUFrQixtQkFFWCx1QkFBdUIsQ0FBQyxNQUFNO2dLQU0vQyxPQUFPO3NCQUROLFdBQVc7dUJBQUMsZUFBZTtnQkFRNUIsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBXaW5kb3dSZWYsXG4gIENtc1Njcm9sbFRvVG9wQ29tcG9uZW50LFxuICBTY3JvbGxCZWhhdmlvcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi9taXNjL2ljb24vaWNvbi5tb2RlbCc7XG5pbXBvcnQgeyBTZWxlY3RGb2N1c1V0aWxpdHkgfSBmcm9tICcuLi8uLi8uLi9sYXlvdXQvYTExeS9pbmRleCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXNjcm9sbC10by10b3AnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2Nyb2xsLXRvLXRvcC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxUb1RvcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGljb25UeXBlcyA9IElDT05fVFlQRTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc3BsYXknKVxuICBkaXNwbGF5OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIHByb3RlY3RlZCB3aW5kb3c6IFdpbmRvdyB8IHVuZGVmaW5lZCA9IHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdztcbiAgcHJvdGVjdGVkIHNjcm9sbEJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvciA9IFNjcm9sbEJlaGF2aW9yLlNNT09USDtcbiAgcHJvdGVjdGVkIGRpc3BsYXlUaHJlc2hvbGQ6IG51bWJlciA9ICh0aGlzLndpbmRvdz8uaW5uZXJIZWlnaHQgPz8gNDAwKSAvIDI7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnNjcm9sbCcsIFsnJGV2ZW50J10pXG4gIG9uU2Nyb2xsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndpbmRvdykge1xuICAgICAgdGhpcy5kaXNwbGF5ID0gdGhpcy53aW5kb3cuc2Nyb2xsWSA+IHRoaXMuZGlzcGxheVRocmVzaG9sZDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudERhdGE6IENtc0NvbXBvbmVudERhdGE8Q21zU2Nyb2xsVG9Ub3BDb21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCBzZWxlY3RGb2N1c1V0aWxpdHk6IFNlbGVjdEZvY3VzVXRpbGl0eVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDb25maWcoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRDb25maWcoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb25lbnREYXRhLmRhdGEkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbEJlaGF2aW9yID0gZGF0YS5zY3JvbGxCZWhhdmlvciA/PyB0aGlzLnNjcm9sbEJlaGF2aW9yO1xuICAgICAgdGhpcy5kaXNwbGF5VGhyZXNob2xkID0gZGF0YS5kaXNwbGF5VGhyZXNob2xkID8/IHRoaXMuZGlzcGxheVRocmVzaG9sZDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgYmFjayB0byB0aGUgdG9wIG9mIHRoZSBwYWdlIGFuZCBzZXQgZm9jdXMgb24gdG9wIG1vc3QgZm9jdXNhYmxlIGVsZW1lbnQuXG4gICAqL1xuICBzY3JvbGxUb1RvcCgpOiB2b2lkIHtcbiAgICAvLyBGb2N1cyBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCB3aXRoaW4gdGhlIGh0bWwgYm9keVxuICAgIHRoaXMuc2VsZWN0Rm9jdXNVdGlsaXR5XG4gICAgICAuZmluZEZpcnN0Rm9jdXNhYmxlKHRoaXMud2luUmVmLmRvY3VtZW50LmJvZHksIHsgYXV0b2ZvY3VzOiAnJyB9KVxuICAgICAgPy5mb2N1cygpO1xuXG4gICAgdGhpcy53aW5kb3c/LnNjcm9sbFRvKHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGJlaGF2aW9yOiB0aGlzLnNjcm9sbEJlaGF2aW9yLFxuICAgIH0pO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiJ25hdmlnYXRpb24uc2Nyb2xsVG9Ub3AnIHwgY3hUcmFuc2xhdGVcIlxuICBjbGFzcz1cImN4LXNjcm9sbC10by10b3AtYnRuXCJcbiAgKGNsaWNrKT1cInNjcm9sbFRvVG9wKClcIlxuPlxuICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICA8Y3gtaWNvbiBjbGFzcz1cImNhcmV0LXVwLWljb25cIiBbdHlwZV09XCJpY29uVHlwZXMuQ0FSRVRfVVBcIj48L2N4LWljb24+XG4gIDwvc3Bhbj5cbjwvYnV0dG9uPlxuIl19