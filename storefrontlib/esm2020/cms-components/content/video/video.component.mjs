/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, } from '@angular/core';
import { ContainerBackgroundOptions, PageType, } from '@spartacus/core';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "../../../shared/components/media/media.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "../../../shared/components/spinner/spinner.component";
export class VideoComponent {
    constructor(component, mediaService, urlService, cmsService, cd) {
        this.component = component;
        this.mediaService = mediaService;
        this.urlService = urlService;
        this.cmsService = cmsService;
        this.cd = cd;
        this.data$ = this.component.data$.pipe(distinctUntilChanged(), tap((data) => {
            this.styleClasses = data.styleClasses;
            this.setMedia(data);
            this.setControls(data);
            this.setRouting(data);
        }));
    }
    setMedia(data) {
        if (data.video) {
            this.source = this.mediaService.getMedia(data.video)?.src;
        }
        if (data.containerBackground ===
            ContainerBackgroundOptions.UPLOAD_RESPONSIVE_IMAGE &&
            data.videoMedia) {
            this.thumbnail = this.mediaService.getMedia(data.videoMedia);
        }
    }
    setControls(data) {
        this.autoPlay = data.autoPlay === 'true';
        this.loop = data.loop === 'true';
        this.mute = data.mute === 'true' ? 'muted' : undefined;
    }
    setRouting(data) {
        if (data.url) {
            this.routerLink = data.url;
        }
        else if (data.contentPage) {
            this.cmsService
                .getPage({
                id: data.contentPage,
                type: PageType.CONTENT_PAGE,
            })
                .pipe(take(1))
                .subscribe((page) => {
                this.routerLink = page?.label;
                this.cd.markForCheck();
            });
        }
        else if (data.product) {
            this.routerLink = this.urlService.transform({
                cxRoute: 'product',
                params: { code: data.product },
            });
        }
        else if (data.category) {
            this.routerLink = this.urlService.transform({
                cxRoute: 'category',
                params: { code: data.category },
            });
        }
    }
}
VideoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VideoComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.MediaService }, { token: i3.SemanticPathService }, { token: i3.CmsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
VideoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: VideoComponent, selector: "cx-video", host: { properties: { "class": "this.styleClasses" } }, ngImport: i0, template: "<div\n  *ngIf=\"data$ | async as data; else loading\"\n  class=\"video-container\"\n  tabindex=\"-1\"\n>\n  <a *ngIf=\"data.overlayTitle\" [routerLink]=\"routerLink\">{{\n    data.overlayTitle\n  }}</a>\n  <video\n    *ngIf=\"source\"\n    [style.height.px]=\"data.videoContainerHeight\"\n    controls\n    [poster]=\"thumbnail?.src\"\n    [loop]=\"loop\"\n    [autoplay]=\"autoPlay\"\n    [muted]=\"mute\"\n    [attr.aria-label]=\"'player.label' | cxTranslate\"\n  >\n    <source src=\"{{ source }}\" type=\"{{ data.video?.mime }}\" />\n  </video>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i6.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VideoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-video', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"data$ | async as data; else loading\"\n  class=\"video-container\"\n  tabindex=\"-1\"\n>\n  <a *ngIf=\"data.overlayTitle\" [routerLink]=\"routerLink\">{{\n    data.overlayTitle\n  }}</a>\n  <video\n    *ngIf=\"source\"\n    [style.height.px]=\"data.videoContainerHeight\"\n    controls\n    [poster]=\"thumbnail?.src\"\n    [loop]=\"loop\"\n    [autoplay]=\"autoPlay\"\n    [muted]=\"mute\"\n    [attr.aria-label]=\"'player.label' | cxTranslate\"\n  >\n    <source src=\"{{ source }}\" type=\"{{ data.video?.mime }}\" />\n  </video>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.MediaService }, { type: i3.SemanticPathService }, { type: i3.CmsService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { styleClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9jb250ZW50L3ZpZGVvL3ZpZGVvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC92aWRlby92aWRlby5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCwwQkFBMEIsRUFDMUIsUUFBUSxHQUVULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFhakUsTUFBTSxPQUFPLGNBQWM7SUFvQnpCLFlBQ1ksU0FBOEMsRUFDOUMsWUFBMEIsRUFDMUIsVUFBK0IsRUFDL0IsVUFBc0IsRUFDdEIsRUFBcUI7UUFKckIsY0FBUyxHQUFULFNBQVMsQ0FBcUM7UUFDOUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBcUI7UUFDL0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWZqQyxVQUFLLEdBQWtDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDOUQsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQVFDLENBQUM7SUFFTSxRQUFRLENBQUMsSUFBdUI7UUFDeEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDO1NBQzNEO1FBRUQsSUFDRSxJQUFJLENBQUMsbUJBQW1CO1lBQ3RCLDBCQUEwQixDQUFDLHVCQUF1QjtZQUNwRCxJQUFJLENBQUMsVUFBVSxFQUNmO1lBQ0EsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDekMsSUFBSSxDQUFDLFVBQTRCLENBQ2xDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFUyxXQUFXLENBQUMsSUFBdUI7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3pELENBQUM7SUFFUyxVQUFVLENBQUMsSUFBdUI7UUFDMUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVO2lCQUNaLE9BQU8sQ0FBQztnQkFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3BCLElBQUksRUFBRSxRQUFRLENBQUMsWUFBWTthQUM1QixDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTthQUMvQixDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzsyR0EzRVUsY0FBYzsrRkFBZCxjQUFjLHdHQ2pDM0IsdXBCQXlCQTsyRkRRYSxjQUFjO2tCQUwxQixTQUFTOytCQUNFLFVBQVUsbUJBRUgsdUJBQXVCLENBQUMsTUFBTTs2TkFHekIsWUFBWTtzQkFBakMsV0FBVzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENtc1NlcnZpY2UsXG4gIENtc1ZpZGVvQ29tcG9uZW50LFxuICBDb250YWluZXJCYWNrZ3JvdW5kT3B0aW9ucyxcbiAgUGFnZVR5cGUsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50RGF0YSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1zdHJ1Y3R1cmUvcGFnZS9tb2RlbC9jbXMtY29tcG9uZW50LWRhdGEnO1xuaW1wb3J0IHtcbiAgTWVkaWEsXG4gIE1lZGlhQ29udGFpbmVyLFxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5tb2RlbCc7XG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtdmlkZW8nLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlkZW8uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9Db21wb25lbnQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgc3R5bGVDbGFzc2VzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgc291cmNlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHRodW1ibmFpbDogTWVkaWEgfCB1bmRlZmluZWQ7XG4gIHJvdXRlckxpbms6IHN0cmluZyB8IGFueVtdIHwgdW5kZWZpbmVkO1xuICBhdXRvUGxheTogYm9vbGVhbjtcbiAgbG9vcDogYm9vbGVhbjtcbiAgbXV0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGRhdGEkOiBPYnNlcnZhYmxlPENtc1ZpZGVvQ29tcG9uZW50PiA9IHRoaXMuY29tcG9uZW50LmRhdGEkLnBpcGUoXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICB0YXAoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc3R5bGVDbGFzc2VzID0gZGF0YS5zdHlsZUNsYXNzZXM7XG4gICAgICB0aGlzLnNldE1lZGlhKGRhdGEpO1xuICAgICAgdGhpcy5zZXRDb250cm9scyhkYXRhKTtcbiAgICAgIHRoaXMuc2V0Um91dGluZyhkYXRhKTtcbiAgICB9KVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb21wb25lbnQ6IENtc0NvbXBvbmVudERhdGE8Q21zVmlkZW9Db21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCBtZWRpYVNlcnZpY2U6IE1lZGlhU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXJsU2VydmljZTogU2VtYW50aWNQYXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zU2VydmljZTogQ21zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBwcm90ZWN0ZWQgc2V0TWVkaWEoZGF0YTogQ21zVmlkZW9Db21wb25lbnQpIHtcbiAgICBpZiAoZGF0YS52aWRlbykge1xuICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLm1lZGlhU2VydmljZS5nZXRNZWRpYShkYXRhLnZpZGVvKT8uc3JjO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGRhdGEuY29udGFpbmVyQmFja2dyb3VuZCA9PT1cbiAgICAgICAgQ29udGFpbmVyQmFja2dyb3VuZE9wdGlvbnMuVVBMT0FEX1JFU1BPTlNJVkVfSU1BR0UgJiZcbiAgICAgIGRhdGEudmlkZW9NZWRpYVxuICAgICkge1xuICAgICAgdGhpcy50aHVtYm5haWwgPSB0aGlzLm1lZGlhU2VydmljZS5nZXRNZWRpYShcbiAgICAgICAgZGF0YS52aWRlb01lZGlhIGFzIE1lZGlhQ29udGFpbmVyXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRDb250cm9scyhkYXRhOiBDbXNWaWRlb0NvbXBvbmVudCkge1xuICAgIHRoaXMuYXV0b1BsYXkgPSBkYXRhLmF1dG9QbGF5ID09PSAndHJ1ZSc7XG4gICAgdGhpcy5sb29wID0gZGF0YS5sb29wID09PSAndHJ1ZSc7XG4gICAgdGhpcy5tdXRlID0gZGF0YS5tdXRlID09PSAndHJ1ZScgPyAnbXV0ZWQnIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFJvdXRpbmcoZGF0YTogQ21zVmlkZW9Db21wb25lbnQpIHtcbiAgICBpZiAoZGF0YS51cmwpIHtcbiAgICAgIHRoaXMucm91dGVyTGluayA9IGRhdGEudXJsO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5jb250ZW50UGFnZSkge1xuICAgICAgdGhpcy5jbXNTZXJ2aWNlXG4gICAgICAgIC5nZXRQYWdlKHtcbiAgICAgICAgICBpZDogZGF0YS5jb250ZW50UGFnZSxcbiAgICAgICAgICB0eXBlOiBQYWdlVHlwZS5DT05URU5UX1BBR0UsXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHBhZ2UpID0+IHtcbiAgICAgICAgICB0aGlzLnJvdXRlckxpbmsgPSBwYWdlPy5sYWJlbDtcbiAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvZHVjdCkge1xuICAgICAgdGhpcy5yb3V0ZXJMaW5rID0gdGhpcy51cmxTZXJ2aWNlLnRyYW5zZm9ybSh7XG4gICAgICAgIGN4Um91dGU6ICdwcm9kdWN0JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGRhdGEucHJvZHVjdCB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLmNhdGVnb3J5KSB7XG4gICAgICB0aGlzLnJvdXRlckxpbmsgPSB0aGlzLnVybFNlcnZpY2UudHJhbnNmb3JtKHtcbiAgICAgICAgY3hSb3V0ZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGRhdGEuY2F0ZWdvcnkgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdlxuICAqbmdJZj1cImRhdGEkIHwgYXN5bmMgYXMgZGF0YTsgZWxzZSBsb2FkaW5nXCJcbiAgY2xhc3M9XCJ2aWRlby1jb250YWluZXJcIlxuICB0YWJpbmRleD1cIi0xXCJcbj5cbiAgPGEgKm5nSWY9XCJkYXRhLm92ZXJsYXlUaXRsZVwiIFtyb3V0ZXJMaW5rXT1cInJvdXRlckxpbmtcIj57e1xuICAgIGRhdGEub3ZlcmxheVRpdGxlXG4gIH19PC9hPlxuICA8dmlkZW9cbiAgICAqbmdJZj1cInNvdXJjZVwiXG4gICAgW3N0eWxlLmhlaWdodC5weF09XCJkYXRhLnZpZGVvQ29udGFpbmVySGVpZ2h0XCJcbiAgICBjb250cm9sc1xuICAgIFtwb3N0ZXJdPVwidGh1bWJuYWlsPy5zcmNcIlxuICAgIFtsb29wXT1cImxvb3BcIlxuICAgIFthdXRvcGxheV09XCJhdXRvUGxheVwiXG4gICAgW211dGVkXT1cIm11dGVcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ3BsYXllci5sYWJlbCcgfCBjeFRyYW5zbGF0ZVwiXG4gID5cbiAgICA8c291cmNlIHNyYz1cInt7IHNvdXJjZSB9fVwiIHR5cGU9XCJ7eyBkYXRhLnZpZGVvPy5taW1lIH19XCIgLz5cbiAgPC92aWRlbz5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2xvYWRpbmc+XG4gIDxkaXYgY2xhc3M9XCJjeC1zcGlubmVyXCI+PGN4LXNwaW5uZXI+PC9jeC1zcGlubmVyPjwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==