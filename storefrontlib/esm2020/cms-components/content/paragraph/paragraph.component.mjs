/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostListener, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.pipe";
export class ParagraphComponent {
    constructor(component, router) {
        this.component = component;
        this.router = router;
    }
    handleClick(event) {
        if (event.target instanceof HTMLAnchorElement) {
            const element = event.target;
            const href = element?.getAttribute('href');
            // Use router for internal link navigation
            if (href?.indexOf('/') === 0) {
                event.preventDefault();
                this.router.navigate([`/${href}`]);
            }
        }
    }
}
ParagraphComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ParagraphComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
ParagraphComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ParagraphComponent, selector: "cx-paragraph", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  *ngIf=\"component.data$ | async as data\"\n  [innerHTML]=\"data.content ?? '' | cxSupplementHashAnchors\"\n></div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.SupplementHashAnchorsPipe, name: "cxSupplementHashAnchors" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ParagraphComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-paragraph', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"component.data$ | async as data\"\n  [innerHTML]=\"data.content ?? '' | cxSupplementHashAnchors\"\n></div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.Router }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVV2QixNQUFNLE9BQU8sa0JBQWtCO0lBZTdCLFlBQ1MsU0FBa0QsRUFDL0MsTUFBYztRQURqQixjQUFTLEdBQVQsU0FBUyxDQUF5QztRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3ZCLENBQUM7SUFoQkcsV0FBVyxDQUFDLEtBQVk7UUFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxZQUFZLGlCQUFpQixFQUFFO1lBQzdDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUEyQixDQUFDO1lBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0MsMENBQTBDO1lBQzFDLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQzs7K0dBYlUsa0JBQWtCO21HQUFsQixrQkFBa0IsNkdDcEIvQiw4SEFJQTsyRkRnQmEsa0JBQWtCO2tCQUw5QixTQUFTOytCQUNFLGNBQWMsbUJBRVAsdUJBQXVCLENBQUMsTUFBTTs0SEFJeEMsV0FBVztzQkFEakIsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENtc1BhcmFncmFwaENvbXBvbmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXBhcmFncmFwaCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXJhZ3JhcGguY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGFyYWdyYXBoQ29tcG9uZW50IHtcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxBbmNob3JFbGVtZW50O1xuICAgICAgY29uc3QgaHJlZiA9IGVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAvLyBVc2Ugcm91dGVyIGZvciBpbnRlcm5hbCBsaW5rIG5hdmlnYXRpb25cbiAgICAgIGlmIChocmVmPy5pbmRleE9mKCcvJykgPT09IDApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2AvJHtocmVmfWBdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDbXNDb21wb25lbnREYXRhPENtc1BhcmFncmFwaENvbXBvbmVudD4sXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICkge31cbn1cbiIsIjxkaXZcbiAgKm5nSWY9XCJjb21wb25lbnQuZGF0YSQgfCBhc3luYyBhcyBkYXRhXCJcbiAgW2lubmVySFRNTF09XCJkYXRhLmNvbnRlbnQgPz8gJycgfCBjeFN1cHBsZW1lbnRIYXNoQW5jaG9yc1wiXG4+PC9kaXY+XG4iXX0=