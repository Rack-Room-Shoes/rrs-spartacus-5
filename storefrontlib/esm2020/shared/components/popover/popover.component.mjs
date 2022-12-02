/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, TemplateRef, } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { PopoverEvent } from './popover.model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/positioning/positioning.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "../../../layout/a11y/keyboard-focus/focus.directive";
import * as i6 from "../../../cms-components/misc/icon/icon.component";
export class PopoverComponent {
    constructor(positioningService, winRef, changeDetectionRef, renderer, router) {
        this.positioningService = positioningService;
        this.winRef = winRef;
        this.changeDetectionRef = changeDetectionRef;
        this.renderer = renderer;
        this.router = router;
        /**
         * Icon types for close button icon.
         */
        this.iconTypes = ICON_TYPE;
    }
    /**
     * Listens for click inside popover component wrapper.
     */
    insideClick() {
        this.eventSubject.next(PopoverEvent.INSIDE_CLICK);
    }
    /**
     * Listens for every document click and ignores clicks
     * inside component.
     */
    outsideClick(event) {
        if (!this.isClickedOnPopover(event) && !this.isClickedOnDirective(event)) {
            this.eventSubject.next(PopoverEvent.OUTSIDE_CLICK);
        }
    }
    /**
     * Listens for `escape` keydown event.
     */
    escapeKeydown() {
        this.eventSubject.next(PopoverEvent.ESCAPE_KEYDOWN);
    }
    isClickedOnPopover(event) {
        return this.popoverInstance.location.nativeElement.contains(event.target);
    }
    isClickedOnDirective(event) {
        return this.triggerElement.nativeElement.contains(event.target);
    }
    /**
     * Emits close event trigger.
     */
    close(event) {
        event.preventDefault();
        if (event instanceof MouseEvent) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_CLICK);
        }
        else {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
        }
    }
    /**
     * Method uses `Renderer2` service to listen window scroll event.
     *
     * Registered only if property `positionOnScroll` is set to `true`.
     */
    triggerScrollEvent() {
        this.scrollEventUnlistener = this.renderer.listen(this.winRef.nativeWindow, 'scroll', () => this.positionPopover());
    }
    /**
     * Method uses positioning service calculation and based on that
     * updates class name for popover component instance.
     */
    positionPopover() {
        this.popoverClass = this.positioningService.positionElements(this.triggerElement.nativeElement, this.popoverInstance.location.nativeElement, this.positioningService.getPositioningClass(this.position, this.autoPositioning), this.appendToBody);
        this.changeDetectionRef.markForCheck();
        this.baseClass = `${this.customClass} ${this.popoverClass} opened`;
    }
    ngOnInit() {
        if (!this.customClass) {
            this.customClass = 'cx-popover';
        }
        if (!this.position) {
            this.position = 'top';
        }
        if (this.autoPositioning === undefined) {
            this.autoPositioning = true;
        }
        this.baseClass = `${this.customClass}`;
        this.resizeSub = this.winRef.resize$.subscribe(() => {
            this.positionPopover();
        });
        this.routeChangeSub = this.router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
            this.eventSubject.next(PopoverEvent.ROUTE_CHANGE);
        });
        if (this.positionOnScroll) {
            this.triggerScrollEvent();
        }
    }
    /**
     * indicates if passed content is a TemplateRef or string.
     */
    isTemplate(content) {
        return content instanceof TemplateRef;
    }
    isString(content) {
        return !(content instanceof TemplateRef);
    }
    ngAfterViewChecked() {
        this.positionPopover();
    }
    ngOnDestroy() {
        if (this.resizeSub) {
            this.resizeSub.unsubscribe();
        }
        if (this.routeChangeSub) {
            this.routeChangeSub.unsubscribe();
        }
        if (this.scrollEventUnlistener) {
            this.scrollEventUnlistener();
        }
    }
}
PopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PopoverComponent, deps: [{ token: i1.PositioningService }, { token: i2.WindowRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Component });
PopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: PopoverComponent, selector: "cx-popover", host: { listeners: { "click": "insideClick()", "document:click": "outsideClick($event)", "keydown.escape": "escapeKeydown()" }, properties: { "className": "this.baseClass" } }, ngImport: i0, template: "<div class=\"arrow\"></div>\n<div class=\"popover-body\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-close-row\">\n    <button\n      *ngIf=\"displayCloseButton\"\n      type=\"button\"\n      class=\"close\"\n      (keydown.enter)=\"close($event)\"\n      (keydown.space)=\"close($event)\"\n      (click)=\"close($event)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <ng-container *ngIf=\"isTemplate(content)\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </ng-container>\n  <span *ngIf=\"isString(content)\">{{ content }}</span>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i5.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i6.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"arrow\"></div>\n<div class=\"popover-body\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-close-row\">\n    <button\n      *ngIf=\"displayCloseButton\"\n      type=\"button\"\n      class=\"close\"\n      (keydown.enter)=\"close($event)\"\n      (keydown.space)=\"close($event)\"\n      (click)=\"close($event)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <ng-container *ngIf=\"isTemplate(content)\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </ng-container>\n  <span *ngIf=\"isString(content)\">{{ content }}</span>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.PositioningService }, { type: i2.WindowRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i3.Router }]; }, propDecorators: { baseClass: [{
                type: HostBinding,
                args: ['className']
            }], insideClick: [{
                type: HostListener,
                args: ['click']
            }], outsideClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], escapeKeydown: [{
                type: HostListener,
                args: ['keydown.escape']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBR1QsV0FBVyxFQUNYLFlBQVksRUFJWixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFHekUsT0FBTyxFQUFFLFlBQVksRUFBbUIsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7QUFPaEUsTUFBTSxPQUFPLGdCQUFnQjtJQThPM0IsWUFDWSxrQkFBc0MsRUFDdEMsTUFBaUIsRUFDakIsa0JBQXFDLEVBQ3JDLFFBQW1CLEVBQ25CLE1BQWM7UUFKZCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFqSzFCOztXQUVHO1FBQ0gsY0FBUyxHQUFHLFNBQVMsQ0FBQztJQStKbkIsQ0FBQztJQTlJSjs7T0FFRztJQUVILFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMs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QUFXO2dCQU14QixXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTztnQkFVckIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVcxQyxhQUFhO3NCQURaLFlBQVk7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnLi4vLi4vLi4vY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24ubW9kZWwnO1xuaW1wb3J0IHsgRm9jdXNDb25maWcgfSBmcm9tICcuLi8uLi8uLi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wb3NpdGlvbmluZy9wb3NpdGlvbmluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcG92ZXJFdmVudCwgUG9wb3ZlclBvc2l0aW9uIH0gZnJvbSAnLi9wb3BvdmVyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcG9wb3ZlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiBTdHJpbmcgb3IgdGVtcGxhdGUgdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHBvcG92ZXIgd3JhcHBlciBjb21wb25lbnQuXG4gICAqL1xuICBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBFbGVtZW50IHdoaWNoIHRyaWdnZXJzIGRpc3BsYXlpbmcgcG9wb3ZlciBjb21wb25lbnQuXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgbmVlZGVkIHRvIGNhbGN1bGF0ZSB2YWxpZCBwb3NpdGlvbiBmb3IgcG9wb3Zlci5cbiAgICovXG4gIHRyaWdnZXJFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IGluaXRpYXRlZCBwb3BvdmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcG9wb3Zlckluc3RhbmNlOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbXBvbmVudD47XG5cbiAgLyoqXG4gICAqIEZsYWcgd2hpY2ggaW5mb3JtcyBwb3NpdGlvbmluZyBzZXJ2aWNlIGlmIHBvcG92ZXIgY29tcG9uZW50XG4gICAqIHNob3VsZCBiZSBhcHBlbmRlZCB0byBib2R5LiBPdGhlcndpc2UgcG9wb3ZlciBpcyBkaXNwbGF5ZWQgcmlnaHQgYWZ0ZXJcbiAgICogdHJpZ2dlciBlbGVtZW50IGluIERPTS5cbiAgICovXG4gIGFwcGVuZFRvQm9keT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVmZXJyZWQgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLiBEZWZhdWx0IHBvcG92ZXIgcG9zaXRpb24gaXMgJ3RvcCcuXG4gICAqXG4gICAqIEFsbG93ZWQgcG9wb3ZlciBwb3NpdGlvbnM6ICdhdXRvJywgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsXG4gICAqICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLCAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JyxcbiAgICogJ2xlZnQtdG9wJywgJ2xlZnQtYm90dG9tJywgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxuICAgKi9cbiAgcG9zaXRpb24/OiBQb3BvdmVyUG9zaXRpb247XG5cbiAgLyoqXG4gICAqIEZsYWcgdXNlZCB0byBkZWZpbmUgaWYgcG9wb3ZlciBzaG91bGQgbG9vayBmb3IgdGhlIGJlc3QgcGxhY2VtZW50XG4gICAqIGluIGNhc2UgaWYgdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBpbiB2aWV3cG9ydCBmb3IgcHJlZmVycmVkIHBvc2l0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0IHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvIGB0cnVlYC5cbiAgICpcbiAgICogVmFsdWUgb2YgdGhpcyBmbGFnIGlzIG9taXR0ZWQgaWYgcHJlZmVycmVkIHBvc2l0aW9uIGlzIHNldCB0byBgYXV0b2AuXG4gICAqL1xuICBhdXRvUG9zaXRpb25pbmc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDdXN0b20gY2xhc3MgbmFtZSBwYXNzZWQgdG8gcG9wb3ZlciBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIHRoaXMgcHJvcGVydHkgaXMgbm90IHNldCB0aGUgZGVmYXVsdCBwb3BvdmVyIGNsYXNzIGlzIGBjeC1wb3BvdmVyYC5cbiAgICovXG4gIGN1c3RvbUNsYXNzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGbGFnIHVzZWQgdG8gc2hvdy9oaWRlIGNsb3NlIGJ1dHRvbiBpbiBwb3BvdmVyIGNvbXBvbmVudC5cbiAgICovXG4gIGRpc3BsYXlDbG9zZUJ1dHRvbj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFmdGVyIHBvcG92ZXIgY29tcG9uZW50IGlzIGluaXRpYWxpemVkIHBvc2l0aW9uIG5lZWRzIHRvIGJlIGNoYW5naW5nIGR5bmFtaWNhbGx5XG4gICAqIGluIGNhc2UgaWYgYW55IHZpZXdwb3J0IGNoYW5nZXMgaGFwcGVuZWQuXG4gICAqL1xuICByZXNpemVTdWI6IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQWZ0ZXIgcG9wb3ZlciBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQgcG9wb3ZlciBzaG91bGQgYmUgY2xvc2VkIGluIGNhc2VcbiAgICogaWYgY3VycmVudCByb3V0ZSBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgKi9cbiAgcm91dGVDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQ2xhc3MgbmFtZSBnZW5lcmF0ZWQgYnkgcG9zaXRpb25pbmcgc2VydmljZSBpbmRpY2F0aW5nIHBvc2l0aW9uIG9mIHBvcG92ZXIuXG4gICAqL1xuICBwb3BvdmVyQ2xhc3M6IFBvcG92ZXJQb3NpdGlvbjtcblxuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBmb3IgYTExeSBpbXByb3ZlbWVudHMuXG4gICAqL1xuICBmb2N1c0NvbmZpZzogRm9jdXNDb25maWc7XG5cbiAgLyoqXG4gICAqIEZsYWcgaW5kaWNhdGVzIGlmIHBvcG92ZXIgc2hvdWxkIGJlIHJlLXBvc2l0aW9uZWQgb24gc2Nyb2xsIGV2ZW50LlxuICAgKi9cbiAgcG9zaXRpb25PblNjcm9sbD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEljb24gdHlwZXMgZm9yIGNsb3NlIGJ1dHRvbiBpY29uLlxuICAgKi9cbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuXG4gIC8qKlxuICAgKiBTdWJqZWN0IHdoaWNoIGVtaXRzIHNwZWNpZmljIHR5cGUgb2YgYFBvcG92ZXJFdmVudGAuXG4gICAqL1xuICBldmVudFN1YmplY3Q6IFN1YmplY3Q8UG9wb3ZlckV2ZW50PjtcblxuICAvKipcbiAgICogU2Nyb2xsIGV2ZW50IHVubGlzdGVuZXIuXG4gICAqL1xuICBzY3JvbGxFdmVudFVubGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEJpbmRpbmcgY2xhc3MgbmFtZSBwcm9wZXJ0eS5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3NOYW1lJykgYmFzZUNsYXNzOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGNsaWNrIGluc2lkZSBwb3BvdmVyIGNvbXBvbmVudCB3cmFwcGVyLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBpbnNpZGVDbGljaygpIHtcbiAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5JTlNJREVfQ0xJQ0spO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgZm9yIGV2ZXJ5IGRvY3VtZW50IGNsaWNrIGFuZCBpZ25vcmVzIGNsaWNrc1xuICAgKiBpbnNpZGUgY29tcG9uZW50LlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBvdXRzaWRlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNDbGlja2VkT25Qb3BvdmVyKGV2ZW50KSAmJiAhdGhpcy5pc0NsaWNrZWRPbkRpcmVjdGl2ZShldmVudCkpIHtcbiAgICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50Lk9VVFNJREVfQ0xJQ0spO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIGZvciBgZXNjYXBlYCBrZXlkb3duIGV2ZW50LlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lc2NhcGUnKVxuICBlc2NhcGVLZXlkb3duKCkge1xuICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50LkVTQ0FQRV9LRVlET1dOKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NsaWNrZWRPblBvcG92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3BvdmVySW5zdGFuY2UubG9jYXRpb24ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ2xpY2tlZE9uRGlyZWN0aXZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlckVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGNsb3NlIGV2ZW50IHRyaWdnZXIuXG4gICAqL1xuICBjbG9zZShldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQgfCBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuQ0xPU0VfQlVUVE9OX0NMSUNLKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuQ0xPU0VfQlVUVE9OX0tFWURPV04pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdXNlcyBgUmVuZGVyZXIyYCBzZXJ2aWNlIHRvIGxpc3RlbiB3aW5kb3cgc2Nyb2xsIGV2ZW50LlxuICAgKlxuICAgKiBSZWdpc3RlcmVkIG9ubHkgaWYgcHJvcGVydHkgYHBvc2l0aW9uT25TY3JvbGxgIGlzIHNldCB0byBgdHJ1ZWAuXG4gICAqL1xuICB0cmlnZ2VyU2Nyb2xsRXZlbnQoKSB7XG4gICAgdGhpcy5zY3JvbGxFdmVudFVubGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdyxcbiAgICAgICdzY3JvbGwnLFxuICAgICAgKCkgPT4gdGhpcy5wb3NpdGlvblBvcG92ZXIoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHVzZXMgcG9zaXRpb25pbmcgc2VydmljZSBjYWxjdWxhdGlvbiBhbmQgYmFzZWQgb24gdGhhdFxuICAgKiB1cGRhdGVzIGNsYXNzIG5hbWUgZm9yIHBvcG92ZXIgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKi9cbiAgcG9zaXRpb25Qb3BvdmVyKCkge1xuICAgIHRoaXMucG9wb3ZlckNsYXNzID0gdGhpcy5wb3NpdGlvbmluZ1NlcnZpY2UucG9zaXRpb25FbGVtZW50cyhcbiAgICAgIHRoaXMudHJpZ2dlckVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgIHRoaXMucG9wb3Zlckluc3RhbmNlLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB0aGlzLnBvc2l0aW9uaW5nU2VydmljZS5nZXRQb3NpdGlvbmluZ0NsYXNzKFxuICAgICAgICB0aGlzLnBvc2l0aW9uLFxuICAgICAgICB0aGlzLmF1dG9Qb3NpdGlvbmluZ1xuICAgICAgKSxcbiAgICAgIHRoaXMuYXBwZW5kVG9Cb2R5XG4gICAgKTtcblxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuYmFzZUNsYXNzID0gYCR7dGhpcy5jdXN0b21DbGFzc30gJHt0aGlzLnBvcG92ZXJDbGFzc30gb3BlbmVkYDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jdXN0b21DbGFzcykge1xuICAgICAgdGhpcy5jdXN0b21DbGFzcyA9ICdjeC1wb3BvdmVyJztcbiAgICB9XG4gICAgaWYgKCF0aGlzLnBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gJ3RvcCc7XG4gICAgfVxuICAgIGlmICh0aGlzLmF1dG9Qb3NpdGlvbmluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmF1dG9Qb3NpdGlvbmluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5iYXNlQ2xhc3MgPSBgJHt0aGlzLmN1c3RvbUNsYXNzfWA7XG5cbiAgICB0aGlzLnJlc2l6ZVN1YiA9IHRoaXMud2luUmVmLnJlc2l6ZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucG9zaXRpb25Qb3BvdmVyKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJvdXRlQ2hhbmdlU3ViID0gdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuUk9VVEVfQ0hBTkdFKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb25PblNjcm9sbCkge1xuICAgICAgdGhpcy50cmlnZ2VyU2Nyb2xsRXZlbnQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5kaWNhdGVzIGlmIHBhc3NlZCBjb250ZW50IGlzIGEgVGVtcGxhdGVSZWYgb3Igc3RyaW5nLlxuICAgKi9cbiAgaXNUZW1wbGF0ZShjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+KTogY29udGVudCBpcyBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICByZXR1cm4gY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICB9XG5cbiAgaXNTdHJpbmcoY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55Pik6IGNvbnRlbnQgaXMgc3RyaW5nIHtcbiAgICByZXR1cm4gIShjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMucG9zaXRpb25Qb3BvdmVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXNpemVTdWIpIHtcbiAgICAgIHRoaXMucmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm91dGVDaGFuZ2VTdWIpIHtcbiAgICAgIHRoaXMucm91dGVDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY3JvbGxFdmVudFVubGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuc2Nyb2xsRXZlbnRVbmxpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uaW5nU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXJcbiAgKSB7fVxufVxuIiwiPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XG48ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCIgW2N4Rm9jdXNdPVwiZm9jdXNDb25maWdcIj5cbiAgPGRpdiBjbGFzcz1cImN4LWNsb3NlLXJvd1wiPlxuICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwiZGlzcGxheUNsb3NlQnV0dG9uXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJjbG9zZVwiXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZSgkZXZlbnQpXCJcbiAgICAgIChrZXlkb3duLnNwYWNlKT1cImNsb3NlKCRldmVudClcIlxuICAgICAgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgID5cbiAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5DTE9TRVwiPjwvY3gtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RlbXBsYXRlKGNvbnRlbnQpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG4gIDxzcGFuICpuZ0lmPVwiaXNTdHJpbmcoY29udGVudClcIj57eyBjb250ZW50IH19PC9zcGFuPlxuPC9kaXY+XG4iXX0=