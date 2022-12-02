/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/components/generic-link/generic-link.component";
import * as i5 from "../../../shared/components/media/media.component";
export class BannerComponent {
    constructor(component, urlService, cmsService) {
        this.component = component;
        this.urlService = urlService;
        this.cmsService = cmsService;
        this.data$ = this.component.data$.pipe(tap((data) => {
            this.setRouterLink(data);
            this.styleClasses = data.styleClasses;
        }));
    }
    /**
     * Returns `_blank` to force opening the link in a new window whenever the
     * `data.external` flag is set to true.
     */
    getTarget(data) {
        return data.external === 'true' || data.external === true ? '_blank' : null;
    }
    setRouterLink(data) {
        if (data.urlLink) {
            this.routerLink = data.urlLink;
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
    getImage(data) {
        if (data.media) {
            if ('url' in data.media) {
                return data.media;
            }
            else {
                return data.media;
            }
        }
    }
}
BannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BannerComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.SemanticPathService }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Component });
BannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: BannerComponent, selector: "cx-banner", host: { properties: { "class": "this.styleClasses" } }, ngImport: i0, template: "<ng-container *ngIf=\"data$ | async as data\">\n  <cx-generic-link\n    *ngIf=\"routerLink\"\n    [url]=\"routerLink\"\n    [target]=\"getTarget(data)\"\n  >\n    <p class=\"headline\" *ngIf=\"data.headline\" [innerHTML]=\"data.headline\"></p>\n    <cx-media [container]=\"getImage(data)\"></cx-media>\n    <p class=\"content\" *ngIf=\"data.content\" [innerHTML]=\"data.content\"></p>\n  </cx-generic-link>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.GenericLinkComponent, selector: "cx-generic-link", inputs: ["url", "target", "id", "class", "style", "title"] }, { kind: "component", type: i5.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-banner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"data$ | async as data\">\n  <cx-generic-link\n    *ngIf=\"routerLink\"\n    [url]=\"routerLink\"\n    [target]=\"getTarget(data)\"\n  >\n    <p class=\"headline\" *ngIf=\"data.headline\" [innerHTML]=\"data.headline\"></p>\n    <cx-media [container]=\"getImage(data)\"></cx-media>\n    <p class=\"content\" *ngIf=\"data.content\" [innerHTML]=\"data.content\"></p>\n  </cx-generic-link>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.SemanticPathService }, { type: i2.CmsService }]; }, propDecorators: { styleClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXIvYmFubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9iYW5uZXIvYmFubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBS0wsUUFBUSxHQUVULE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQVEzQyxNQUFNLE9BQU8sZUFBZTtJQVkxQixZQUNZLFNBQStDLEVBQy9DLFVBQStCLEVBQy9CLFVBQXNCO1FBRnRCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQy9DLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFWbEMsVUFBSyxHQUFtQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQy9ELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQU1DLENBQUM7SUFFSjs7O09BR0c7SUFDSCxTQUFTLENBQUMsSUFBd0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUVTLGFBQWEsQ0FBQyxJQUF3QjtRQUM5QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVO2lCQUNaLE9BQU8sQ0FBQztnQkFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3BCLElBQUksRUFBRSxRQUFRLENBQUMsWUFBWTthQUM1QixDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTthQUMvQixDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQXdCO1FBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQWMsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFtQixDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDOzs0R0E1RFUsZUFBZTtnR0FBZixlQUFlLHlHQ3hCNUIsMmFBV0E7MkZEYWEsZUFBZTtrQkFMM0IsU0FBUzsrQkFDRSxXQUFXLG1CQUVKLHVCQUF1QixDQUFDLE1BQU07a0tBS3pCLFlBQVk7c0JBQWpDLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNCYW5uZXJDb21wb25lbnQsXG4gIENtc1NlcnZpY2UsXG4gIEltYWdlLFxuICBJbWFnZUdyb3VwLFxuICBQYWdlVHlwZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2UvbW9kZWwvY21zLWNvbXBvbmVudC1kYXRhJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtYmFubmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBCYW5uZXJDb21wb25lbnQge1xuICByb3V0ZXJMaW5rOiBzdHJpbmcgfCBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgc3R5bGVDbGFzc2VzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgZGF0YSQ6IE9ic2VydmFibGU8Q21zQmFubmVyQ29tcG9uZW50PiA9IHRoaXMuY29tcG9uZW50LmRhdGEkLnBpcGUoXG4gICAgdGFwKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNldFJvdXRlckxpbmsoZGF0YSk7XG4gICAgICB0aGlzLnN0eWxlQ2xhc3NlcyA9IGRhdGEuc3R5bGVDbGFzc2VzO1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudDogQ21zQ29tcG9uZW50RGF0YTxDbXNCYW5uZXJDb21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCB1cmxTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyBgX2JsYW5rYCB0byBmb3JjZSBvcGVuaW5nIHRoZSBsaW5rIGluIGEgbmV3IHdpbmRvdyB3aGVuZXZlciB0aGVcbiAgICogYGRhdGEuZXh0ZXJuYWxgIGZsYWcgaXMgc2V0IHRvIHRydWUuXG4gICAqL1xuICBnZXRUYXJnZXQoZGF0YTogQ21zQmFubmVyQ29tcG9uZW50KTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIGRhdGEuZXh0ZXJuYWwgPT09ICd0cnVlJyB8fCBkYXRhLmV4dGVybmFsID09PSB0cnVlID8gJ19ibGFuaycgOiBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldFJvdXRlckxpbmsoZGF0YTogQ21zQmFubmVyQ29tcG9uZW50KTogdm9pZCB7XG4gICAgaWYgKGRhdGEudXJsTGluaykge1xuICAgICAgdGhpcy5yb3V0ZXJMaW5rID0gZGF0YS51cmxMaW5rO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5jb250ZW50UGFnZSkge1xuICAgICAgdGhpcy5jbXNTZXJ2aWNlXG4gICAgICAgIC5nZXRQYWdlKHtcbiAgICAgICAgICBpZDogZGF0YS5jb250ZW50UGFnZSxcbiAgICAgICAgICB0eXBlOiBQYWdlVHlwZS5DT05URU5UX1BBR0UsXG4gICAgICAgIH0pXG4gICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHBhZ2UpID0+IHtcbiAgICAgICAgICB0aGlzLnJvdXRlckxpbmsgPSBwYWdlPy5sYWJlbDtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkYXRhLnByb2R1Y3QpIHtcbiAgICAgIHRoaXMucm91dGVyTGluayA9IHRoaXMudXJsU2VydmljZS50cmFuc2Zvcm0oe1xuICAgICAgICBjeFJvdXRlOiAncHJvZHVjdCcsXG4gICAgICAgIHBhcmFtczogeyBjb2RlOiBkYXRhLnByb2R1Y3QgfSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5jYXRlZ29yeSkge1xuICAgICAgdGhpcy5yb3V0ZXJMaW5rID0gdGhpcy51cmxTZXJ2aWNlLnRyYW5zZm9ybSh7XG4gICAgICAgIGN4Um91dGU6ICdjYXRlZ29yeScsXG4gICAgICAgIHBhcmFtczogeyBjb2RlOiBkYXRhLmNhdGVnb3J5IH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJbWFnZShkYXRhOiBDbXNCYW5uZXJDb21wb25lbnQpOiBJbWFnZSB8IEltYWdlR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGlmIChkYXRhLm1lZGlhKSB7XG4gICAgICBpZiAoJ3VybCcgaW4gZGF0YS5tZWRpYSkge1xuICAgICAgICByZXR1cm4gZGF0YS5tZWRpYSBhcyBJbWFnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXRhLm1lZGlhIGFzIEltYWdlR3JvdXA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YSQgfCBhc3luYyBhcyBkYXRhXCI+XG4gIDxjeC1nZW5lcmljLWxpbmtcbiAgICAqbmdJZj1cInJvdXRlckxpbmtcIlxuICAgIFt1cmxdPVwicm91dGVyTGlua1wiXG4gICAgW3RhcmdldF09XCJnZXRUYXJnZXQoZGF0YSlcIlxuICA+XG4gICAgPHAgY2xhc3M9XCJoZWFkbGluZVwiICpuZ0lmPVwiZGF0YS5oZWFkbGluZVwiIFtpbm5lckhUTUxdPVwiZGF0YS5oZWFkbGluZVwiPjwvcD5cbiAgICA8Y3gtbWVkaWEgW2NvbnRhaW5lcl09XCJnZXRJbWFnZShkYXRhKVwiPjwvY3gtbWVkaWE+XG4gICAgPHAgY2xhc3M9XCJjb250ZW50XCIgKm5nSWY9XCJkYXRhLmNvbnRlbnRcIiBbaW5uZXJIVE1MXT1cImRhdGEuY29udGVudFwiPjwvcD5cbiAgPC9jeC1nZW5lcmljLWxpbms+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==