/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { ICON_TYPE, } from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
export class ProductImageZoomTriggerComponent {
    constructor(launchDialogService, vcr) {
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.iconType = ICON_TYPE;
        this.subscriptions = new Subscription();
        this.dialogClose = new EventEmitter();
    }
    set expandImage(expand) {
        if (expand) {
            this.triggerZoom();
        }
    }
    triggerZoom() {
        const component = this.launchDialogService.launch("PRODUCT_IMAGE_ZOOM" /* LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM */, this.vcr);
        if (component) {
            this.subscriptions.add(combineLatest([component, this.launchDialogService.dialogClose])
                .pipe(tap(([comp]) => {
                if (this.galleryIndex) {
                    comp.instance.galleryIndex = this.galleryIndex;
                }
            }), filter(([, close]) => Boolean(close)), tap(([comp]) => {
                this.launchDialogService.clear("PRODUCT_IMAGE_ZOOM" /* LAUNCH_CALLER.PRODUCT_IMAGE_ZOOM */);
                comp?.destroy();
                this.dialogClose.emit();
                this.expandButton.nativeElement.focus();
            }))
                .subscribe());
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
ProductImageZoomTriggerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageZoomTriggerComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ProductImageZoomTriggerComponent, selector: "cx-product-image-zoom-trigger", inputs: { galleryIndex: "galleryIndex", expandImage: "expandImage" }, outputs: { dialogClose: "dialogClose" }, viewQueries: [{ propertyName: "expandButton", first: true, predicate: ["expandButton"], descendants: true }], ngImport: i0, template: "<button\n  #expandButton\n  class=\"btn btn-link cx-action-link\"\n  (click)=\"triggerZoom()\"\n>\n  <span>\n    {{ 'productImageZoomTrigger.expand' | cxTranslate }}\n    <cx-icon [type]=\"iconType.EXPAND_ARROWS\"></cx-icon\n  ></span>\n</button>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageZoomTriggerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-trigger', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  #expandButton\n  class=\"btn btn-link cx-action-link\"\n  (click)=\"triggerZoom()\"\n>\n  <span>\n    {{ 'productImageZoomTrigger.expand' | cxTranslate }}\n    <cx-icon [type]=\"iconType.EXPAND_ARROWS\"></cx-icon\n  ></span>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { expandButton: [{
                type: ViewChild,
                args: ['expandButton']
            }], galleryIndex: [{
                type: Input
            }], expandImage: [{
                type: Input
            }], dialogClose: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXRyaWdnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9jb21wb25lbnRzL3Byb2R1Y3QtaW1hZ2Utem9vbS9wcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci9wcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS10cmlnZ2VyL3Byb2R1Y3QtaW1hZ2Utem9vbS10cmlnZ2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFNBQVMsR0FHVixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFRN0MsTUFBTSxPQUFPLGdDQUFnQztJQWdCM0MsWUFDWSxtQkFBd0MsRUFDeEMsR0FBcUI7UUFEckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQWpCakMsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNYLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVluQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFLOUMsQ0FBQztJQVhKLElBQWEsV0FBVyxDQUFDLE1BQWU7UUFDdEMsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBU0QsV0FBVztRQUNULE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLDhEQUUvQyxJQUFJLENBQUMsR0FBRyxDQUNULENBQUM7UUFDRixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUM3RCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFFbkIsSUFDRCxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDN0M7WUFDSCxDQUFDLENBQUMsRUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssNkRBQWtDLENBQUM7Z0JBQ2pFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQ0g7aUJBQ0EsU0FBUyxFQUFFLENBQ2YsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzZIQXBEVSxnQ0FBZ0M7aUhBQWhDLGdDQUFnQyxrU0NoQzdDLDBQQVVBOzJGRHNCYSxnQ0FBZ0M7a0JBTDVDLFNBQVM7K0JBQ0UsK0JBQStCLG1CQUV4Qix1QkFBdUIsQ0FBQyxNQUFNO3lJQU9wQixZQUFZO3NCQUF0QyxTQUFTO3VCQUFDLGNBQWM7Z0JBRWhCLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ08sV0FBVztzQkFBdkIsS0FBSztnQkFNSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIElDT05fVFlQRSxcbiAgTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgTEFVTkNIX0NBTExFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9kdWN0SW1hZ2Vab29tRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vcHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy9wcm9kdWN0LWltYWdlLXpvb20tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtaW1hZ2Utem9vbS10cmlnZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICdwcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW1hZ2Vab29tVHJpZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGljb25UeXBlID0gSUNPTl9UWVBFO1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvL0V4cG9zZSB0aGUgZXhwYW5kIGJ1dHRvbiBzbyBpdCBjYW4gZ2FpbiBmb2N1cyBvbiBjbG9zaW5nIHRoZSB6b29tIHdpbmRvd1xuICBAVmlld0NoaWxkKCdleHBhbmRCdXR0b24nKSBleHBhbmRCdXR0b246IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgZ2FsbGVyeUluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHNldCBleHBhbmRJbWFnZShleHBhbmQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoZXhwYW5kKSB7XG4gICAgICB0aGlzLnRyaWdnZXJab29tKCk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpIGRpYWxvZ0Nsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB2Y3I6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIHRyaWdnZXJab29tKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5sYXVuY2goXG4gICAgICBMQVVOQ0hfQ0FMTEVSLlBST0RVQ1RfSU1BR0VfWk9PTSxcbiAgICAgIHRoaXMudmNyXG4gICAgKTtcbiAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgICBjb21iaW5lTGF0ZXN0KFtjb21wb25lbnQsIHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5kaWFsb2dDbG9zZV0pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoKFtjb21wXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5nYWxsZXJ5SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBjb21wIGFzIENvbXBvbmVudFJlZjxQcm9kdWN0SW1hZ2Vab29tRGlhbG9nQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICkuaW5zdGFuY2UuZ2FsbGVyeUluZGV4ID0gdGhpcy5nYWxsZXJ5SW5kZXg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZmlsdGVyKChbLCBjbG9zZV0pID0+IEJvb2xlYW4oY2xvc2UpKSxcbiAgICAgICAgICAgIHRhcCgoW2NvbXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5jbGVhcihMQVVOQ0hfQ0FMTEVSLlBST0RVQ1RfSU1BR0VfWk9PTSk7XG4gICAgICAgICAgICAgIGNvbXA/LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgdGhpcy5kaWFsb2dDbG9zZS5lbWl0KCk7XG4gICAgICAgICAgICAgIHRoaXMuZXhwYW5kQnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICAjZXhwYW5kQnV0dG9uXG4gIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgKGNsaWNrKT1cInRyaWdnZXJab29tKClcIlxuPlxuICA8c3Bhbj5cbiAgICB7eyAncHJvZHVjdEltYWdlWm9vbVRyaWdnZXIuZXhwYW5kJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGUuRVhQQU5EX0FSUk9XU1wiPjwvY3gtaWNvblxuICA+PC9zcGFuPlxuPC9idXR0b24+XG4iXX0=