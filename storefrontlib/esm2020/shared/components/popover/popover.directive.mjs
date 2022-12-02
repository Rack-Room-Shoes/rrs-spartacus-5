/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, Output, EventEmitter, HostListener, } from '@angular/core';
import { Subject } from 'rxjs';
import { PopoverComponent } from './popover.component';
import { PopoverEvent } from './popover.model';
import * as i0 from "@angular/core";
import * as i1 from "./popover.service";
import * as i2 from "@spartacus/core";
/**
 * Directive to bind popover with any DOM element.
 */
export class PopoverDirective {
    constructor(element, viewContainer, componentFactoryResolver, renderer, changeDetectorRef, popoverService, winRef) {
        this.element = element;
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.popoverService = popoverService;
        this.winRef = winRef;
        /**
         * An event emitted when the popover is opened.
         */
        this.openPopover = new EventEmitter();
        /**
         * An event emitted when the popover is closed.
         */
        this.closePopover = new EventEmitter();
        /**
         * Subject which emits specific type of `PopoverEvent`.
         */
        this.eventSubject = new Subject();
        this.openTriggerEvents = [
            PopoverEvent.OPEN,
            PopoverEvent.OPEN_BY_KEYBOARD,
        ];
        this.focusPopoverTriggerEvents = [
            PopoverEvent.OPEN_BY_KEYBOARD,
        ];
        this.closeTriggerEvents = [
            PopoverEvent.ROUTE_CHANGE,
            PopoverEvent.ESCAPE_KEYDOWN,
            PopoverEvent.OUTSIDE_CLICK,
            PopoverEvent.CLOSE_BUTTON_KEYDOWN,
            PopoverEvent.CLOSE_BUTTON_CLICK,
        ];
        this.focusDirectiveTriggerEvents = [
            PopoverEvent.ESCAPE_KEYDOWN,
            PopoverEvent.CLOSE_BUTTON_KEYDOWN,
        ];
    }
    /**
     * Listen events fired on element binded to popover directive.
     *
     * Based on event type some a11y improvements can be made.
     * For example if popover was opened by `space` or `enter` key
     * dedicated `FocusConfig` can be set to autofocus first
     * focusable element in popover container.
     */
    handlePress(event) {
        event?.preventDefault();
        if (event?.target === this.element.nativeElement && !this.isOpen) {
            this.eventSubject.next(PopoverEvent.OPEN_BY_KEYBOARD);
        }
        else if (this.isOpen) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
        }
    }
    handleTab() {
        if (!this.focusConfig?.trap && this.isOpen) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
        }
    }
    handleEscape() {
        this.eventSubject.next(PopoverEvent.ESCAPE_KEYDOWN);
    }
    handleClick(event) {
        event?.preventDefault();
        if (event?.target === this.element.nativeElement && !this.isOpen) {
            this.eventSubject.next(PopoverEvent.OPEN);
        }
        else if (this.isOpen) {
            this.eventSubject.next(PopoverEvent.CLOSE_BUTTON_CLICK);
        }
    }
    /**
     * Method performs open action for popover component.
     */
    open(event) {
        if (!this.cxPopoverOptions?.disable) {
            this.isOpen = true;
            this.focusConfig = this.popoverService.getFocusConfig(event, this.cxPopoverOptions?.appendToBody || false);
            this.renderPopover();
            this.openPopover.emit();
        }
    }
    /**
     * Method performs close action for popover component.
     */
    close() {
        this.isOpen = false;
        this.viewContainer.clear();
        this.closePopover.emit();
    }
    /**
     * Method subscribes for events emitted by popover component
     * and based on event performs specific action.
     */
    handlePopoverEvents() {
        this.eventSubject.subscribe((event) => {
            if (this.openTriggerEvents.includes(event)) {
                this.open(event);
            }
            if (this.focusPopoverTriggerEvents.includes(event)) {
                this.popoverContainer.location.nativeElement.focus();
            }
            if (this.closeTriggerEvents.includes(event)) {
                this.close();
            }
            if (this.focusDirectiveTriggerEvents.includes(event)) {
                this.popoverService.setFocusOnElement(this.element, this.focusConfig, this.cxPopoverOptions?.appendToBody);
            }
        });
    }
    /**
     * Method creates instance and pass parameters to popover component.
     */
    renderPopover() {
        const containerFactory = this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
        this.popoverContainer =
            this.viewContainer.createComponent(containerFactory);
        const componentInstance = this.popoverContainer.instance;
        if (componentInstance) {
            componentInstance.content = this.cxPopover;
            componentInstance.triggerElement = this.element;
            componentInstance.popoverInstance = this.popoverContainer;
            componentInstance.focusConfig = this.focusConfig;
            componentInstance.eventSubject = this.eventSubject;
            componentInstance.position = this.cxPopoverOptions?.placement;
            componentInstance.customClass = this.cxPopoverOptions?.class;
            componentInstance.appendToBody = this.cxPopoverOptions?.appendToBody;
            componentInstance.positionOnScroll =
                this.cxPopoverOptions?.positionOnScroll;
            componentInstance.displayCloseButton =
                this.cxPopoverOptions?.displayCloseButton;
            componentInstance.autoPositioning =
                this.cxPopoverOptions?.autoPositioning;
            if (this.cxPopoverOptions?.appendToBody) {
                this.renderer.appendChild(this.winRef.document.body, this.popoverContainer.location.nativeElement);
            }
            this.popoverContainer.changeDetectorRef.detectChanges();
        }
    }
    ngOnInit() {
        this.handlePopoverEvents();
    }
}
PopoverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PopoverDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PopoverService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Directive });
PopoverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: PopoverDirective, selector: "[cxPopover]", inputs: { cxPopover: "cxPopover", cxPopoverOptions: "cxPopoverOptions" }, outputs: { openPopover: "openPopover", closePopover: "closePopover" }, host: { listeners: { "keydown.enter": "handlePress($event)", "keydown.space": "handlePress($event)", "keydown.tab": "handleTab()", "keydown.shift.tab": "handleTab()", "keydown.escape": "handleEscape()", "click": "handleClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PopoverDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxPopover]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PopoverService }, { type: i2.WindowRef }]; }, propDecorators: { cxPopover: [{
                type: Input
            }], cxPopoverOptions: [{
                type: Input
            }], openPopover: [{
                type: Output
            }], closePopover: [{
                type: Output
            }], handlePress: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }], handleTab: [{
                type: HostListener,
                args: ['keydown.tab']
            }, {
                type: HostListener,
                args: ['keydown.shift.tab']
            }], handleEscape: [{
                type: HostListener,
                args: ['keydown.escape']
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQU9MLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBa0IsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUcvRDs7R0FFRztBQUlILE1BQU0sT0FBTyxnQkFBZ0I7SUFvTTNCLFlBQ1ksT0FBbUIsRUFDbkIsYUFBK0IsRUFDL0Isd0JBQWtELEVBQ2xELFFBQW1CLEVBQ25CLGlCQUFvQyxFQUNwQyxjQUE4QixFQUM5QixNQUFpQjtRQU5qQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQWhNN0I7O1dBRUc7UUFDTyxnQkFBVyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9EOztXQUVHO1FBQ08saUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWtCaEU7O1dBRUc7UUFDSCxpQkFBWSxHQUEwQixJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQTRDeEQsc0JBQWlCLEdB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SztnQkFLSSxXQUFXO3NCQUFwQixNQUFNO2dCQUtHLFlBQVk7c0JBQXJCLE1BQU07Z0JBaUNQLFdBQVc7c0JBRlYsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQUN4QyxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFZekMsU0FBUztzQkFGUixZQUFZO3VCQUFDLGFBQWE7O3NCQUMxQixZQUFZO3VCQUFDLG1CQUFtQjtnQkFRakMsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLGdCQUFnQjtnQkFNOUIsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGb2N1c0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcG92ZXJFdmVudCwgUG9wb3Zlck9wdGlvbnMgfSBmcm9tICcuL3BvcG92ZXIubW9kZWwnO1xuaW1wb3J0IHsgUG9wb3ZlclNlcnZpY2UgfSBmcm9tICcuL3BvcG92ZXIuc2VydmljZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGJpbmQgcG9wb3ZlciB3aXRoIGFueSBET00gZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4UG9wb3Zlcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqXG4gICAqIFRlbXBsYXRlIG9yIHN0cmluZyB0byBiZSByZW5kZXJlZCBpbnNpZGUgcG9wb3ZlciB3cmFwcGVyIGNvbXBvbmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGN4UG9wb3Zlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogT3B0aW9ucyBzZXQgZm9yIHBvcG92ZXIgY29tcG9uZW50LlxuICAgKi9cbiAgQElucHV0KCkgY3hQb3BvdmVyT3B0aW9ucz86IFBvcG92ZXJPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvcG92ZXIgaXMgb3BlbmVkLlxuICAgKi9cbiAgQE91dHB1dCgpIG9wZW5Qb3BvdmVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcG9wb3ZlciBpcyBjbG9zZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgY2xvc2VQb3BvdmVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEZsYWcgdXNlZCB0byBpbmZvcm0gYWJvdXQgY3VycmVudCBzdGF0ZSBvZiBwb3BvdmVyIGNvbXBvbmVudC5cbiAgICogUG9wb3ZlciBpcyBjbG9zZWQgYnkgZGVmYXVsdCwgc28gdmFsdWUgaXMgc2V0IHRvIGZhbHNlLlxuICAgKi9cbiAgaXNPcGVuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQb3BvdmVyIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgICovXG4gIHBvcG92ZXJDb250YWluZXI6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29tcG9uZW50PjtcblxuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBmb3IgYTExeSBpbXByb3ZlbWVudHMuXG4gICAqL1xuICBmb2N1c0NvbmZpZzogRm9jdXNDb25maWc7XG5cbiAgLyoqXG4gICAqIFN1YmplY3Qgd2hpY2ggZW1pdHMgc3BlY2lmaWMgdHlwZSBvZiBgUG9wb3ZlckV2ZW50YC5cbiAgICovXG4gIGV2ZW50U3ViamVjdDogU3ViamVjdDxQb3BvdmVyRXZlbnQ+ID0gbmV3IFN1YmplY3Q8UG9wb3ZlckV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBMaXN0ZW4gZXZlbnRzIGZpcmVkIG9uIGVsZW1lbnQgYmluZGVkIHRvIHBvcG92ZXIgZGlyZWN0aXZlLlxuICAgKlxuICAgKiBCYXNlZCBvbiBldmVudCB0eXBlIHNvbWUgYTExeSBpbXByb3ZlbWVudHMgY2FuIGJlIG1hZGUuXG4gICAqIEZvciBleGFtcGxlIGlmIHBvcG92ZXIgd2FzIG9wZW5lZCBieSBgc3BhY2VgIG9yIGBlbnRlcmAga2V5XG4gICAqIGRlZGljYXRlZCBgRm9jdXNDb25maWdgIGNhbiBiZSBzZXQgdG8gYXV0b2ZvY3VzIGZpcnN0XG4gICAqIGZvY3VzYWJsZSBlbGVtZW50IGluIHBvcG92ZXIgY29udGFpbmVyLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICBoYW5kbGVQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50Py5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChldmVudD8udGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCAmJiAhdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50Lk9QRU5fQllfS0VZQk9BUkQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50LkNMT1NFX0JVVFRPTl9LRVlET1dOKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnRhYicpXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc2hpZnQudGFiJylcbiAgaGFuZGxlVGFiKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb2N1c0NvbmZpZz8udHJhcCAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5ldmVudFN1YmplY3QubmV4dChQb3BvdmVyRXZlbnQuQ0xPU0VfQlVUVE9OX0tFWURPV04pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZXNjYXBlJylcbiAgaGFuZGxlRXNjYXBlKCk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRTdWJqZWN0Lm5leHQoUG9wb3ZlckV2ZW50LkVTQ0FQRV9LRVlET1dOKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudD8ucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZXZlbnQ/LnRhcmdldCA9PT0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgJiYgIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5PUEVOKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmV2ZW50U3ViamVjdC5uZXh0KFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fQ0xJQ0spO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvcGVuVHJpZ2dlckV2ZW50czogUG9wb3ZlckV2ZW50W10gPSBbXG4gICAgUG9wb3ZlckV2ZW50Lk9QRU4sXG4gICAgUG9wb3ZlckV2ZW50Lk9QRU5fQllfS0VZQk9BUkQsXG4gIF07XG5cbiAgcHJvdGVjdGVkIGZvY3VzUG9wb3ZlclRyaWdnZXJFdmVudHM6IFBvcG92ZXJFdmVudFtdID0gW1xuICAgIFBvcG92ZXJFdmVudC5PUEVOX0JZX0tFWUJPQVJELFxuICBdO1xuXG4gIHByb3RlY3RlZCBjbG9zZVRyaWdnZXJFdmVudHM6IFBvcG92ZXJFdmVudFtdID0gW1xuICAgIFBvcG92ZXJFdmVudC5ST1VURV9DSEFOR0UsXG4gICAgUG9wb3ZlckV2ZW50LkVTQ0FQRV9LRVlET1dOLFxuICAgIFBvcG92ZXJFdmVudC5PVVRTSURFX0NMSUNLLFxuICAgIFBvcG92ZXJFdmVudC5DTE9TRV9CVVRUT05fS0VZRE9XTixcbiAgICBQb3BvdmVyRXZlbnQuQ0xPU0VfQlVUVE9OX0NMSUNLLFxuICBdO1xuXG4gIHByb3RlY3RlZCBmb2N1c0RpcmVjdGl2ZVRyaWdnZXJFdmVudHM6IFBvcG92ZXJFdmVudFtdID0gW1xuICAgIFBvcG92ZXJFdmVudC5FU0NBUEVfS0VZRE9XTixcbiAgICBQb3BvdmVyRXZlbnQuQ0xPU0VfQlVUVE9OX0tFWURPV04sXG4gIF07XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBwZXJmb3JtcyBvcGVuIGFjdGlvbiBmb3IgcG9wb3ZlciBjb21wb25lbnQuXG4gICAqL1xuICBvcGVuKGV2ZW50OiBQb3BvdmVyRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuY3hQb3BvdmVyT3B0aW9ucz8uZGlzYWJsZSkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5mb2N1c0NvbmZpZyA9IHRoaXMucG9wb3ZlclNlcnZpY2UuZ2V0Rm9jdXNDb25maWcoXG4gICAgICAgIGV2ZW50LFxuICAgICAgICB0aGlzLmN4UG9wb3Zlck9wdGlvbnM/LmFwcGVuZFRvQm9keSB8fCBmYWxzZVxuICAgICAgKTtcbiAgICAgIHRoaXMucmVuZGVyUG9wb3ZlcigpO1xuICAgICAgdGhpcy5vcGVuUG9wb3Zlci5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBwZXJmb3JtcyBjbG9zZSBhY3Rpb24gZm9yIHBvcG92ZXIgY29tcG9uZW50LlxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICB0aGlzLmNsb3NlUG9wb3Zlci5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHN1YnNjcmliZXMgZm9yIGV2ZW50cyBlbWl0dGVkIGJ5IHBvcG92ZXIgY29tcG9uZW50XG4gICAqIGFuZCBiYXNlZCBvbiBldmVudCBwZXJmb3JtcyBzcGVjaWZpYyBhY3Rpb24uXG4gICAqL1xuICBoYW5kbGVQb3BvdmVyRXZlbnRzKCkge1xuICAgIHRoaXMuZXZlbnRTdWJqZWN0LnN1YnNjcmliZSgoZXZlbnQ6IFBvcG92ZXJFdmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMub3BlblRyaWdnZXJFdmVudHMuaW5jbHVkZXMoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMub3BlbihldmVudCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5mb2N1c1BvcG92ZXJUcmlnZ2VyRXZlbnRzLmluY2x1ZGVzKGV2ZW50KSkge1xuICAgICAgICB0aGlzLnBvcG92ZXJDb250YWluZXIubG9jYXRpb24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2xvc2VUcmlnZ2VyRXZlbnRzLmluY2x1ZGVzKGV2ZW50KSkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5mb2N1c0RpcmVjdGl2ZVRyaWdnZXJFdmVudHMuaW5jbHVkZXMoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlclNlcnZpY2Uuc2V0Rm9jdXNPbkVsZW1lbnQoXG4gICAgICAgICAgdGhpcy5lbGVtZW50LFxuICAgICAgICAgIHRoaXMuZm9jdXNDb25maWcsXG4gICAgICAgICAgdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5hcHBlbmRUb0JvZHlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgY3JlYXRlcyBpbnN0YW5jZSBhbmQgcGFzcyBwYXJhbWV0ZXJzIHRvIHBvcG92ZXIgY29tcG9uZW50LlxuICAgKi9cbiAgcmVuZGVyUG9wb3ZlcigpIHtcbiAgICBjb25zdCBjb250YWluZXJGYWN0b3J5ID1cbiAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBvcG92ZXJDb21wb25lbnQpO1xuICAgIHRoaXMucG9wb3ZlckNvbnRhaW5lciA9XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbnRhaW5lckZhY3RvcnkpO1xuXG4gICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLnBvcG92ZXJDb250YWluZXIuaW5zdGFuY2U7XG4gICAgaWYgKGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICBjb21wb25lbnRJbnN0YW5jZS5jb250ZW50ID0gdGhpcy5jeFBvcG92ZXI7XG4gICAgICBjb21wb25lbnRJbnN0YW5jZS50cmlnZ2VyRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLnBvcG92ZXJJbnN0YW5jZSA9IHRoaXMucG9wb3ZlckNvbnRhaW5lcjtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmZvY3VzQ29uZmlnID0gdGhpcy5mb2N1c0NvbmZpZztcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmV2ZW50U3ViamVjdCA9IHRoaXMuZXZlbnRTdWJqZWN0O1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UucG9zaXRpb24gPSB0aGlzLmN4UG9wb3Zlck9wdGlvbnM/LnBsYWNlbWVudDtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmN1c3RvbUNsYXNzID0gdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5jbGFzcztcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmFwcGVuZFRvQm9keSA9IHRoaXMuY3hQb3BvdmVyT3B0aW9ucz8uYXBwZW5kVG9Cb2R5O1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UucG9zaXRpb25PblNjcm9sbCA9XG4gICAgICAgIHRoaXMuY3hQb3BvdmVyT3B0aW9ucz8ucG9zaXRpb25PblNjcm9sbDtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmRpc3BsYXlDbG9zZUJ1dHRvbiA9XG4gICAgICAgIHRoaXMuY3hQb3BvdmVyT3B0aW9ucz8uZGlzcGxheUNsb3NlQnV0dG9uO1xuICAgICAgY29tcG9uZW50SW5zdGFuY2UuYXV0b1Bvc2l0aW9uaW5nID1cbiAgICAgICAgdGhpcy5jeFBvcG92ZXJPcHRpb25zPy5hdXRvUG9zaXRpb25pbmc7XG5cbiAgICAgIGlmICh0aGlzLmN4UG9wb3Zlck9wdGlvbnM/LmFwcGVuZFRvQm9keSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgIHRoaXMud2luUmVmLmRvY3VtZW50LmJvZHksXG4gICAgICAgICAgdGhpcy5wb3BvdmVyQ29udGFpbmVyLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3BvdmVyQ29udGFpbmVyLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhhbmRsZVBvcG92ZXJFdmVudHMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCBwb3BvdmVyU2VydmljZTogUG9wb3ZlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmXG4gICkge31cbn1cbiJdfQ==