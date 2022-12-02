/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, EventEmitter, HostBinding, HostListener, Output, } from '@angular/core';
import { FOCUS_GROUP_ATTR } from '../keyboard-focus.model';
import { TrapFocusDirective } from '../trap/trap-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./lock-focus.service";
/**
 * Focusable elements exclude hidden elements by default, but this contradicts with
 * unlocking (hidden) elements.
 */
const UNLOCK_HIDDEN_ELEMENTS = true;
/**
 * Directive that adds persistence for focussed element in case
 * the elements are being rebuild. This happens often when change
 * detection kicks in because of new data set from the backend.
 */
export class LockFocusDirective extends TrapFocusDirective {
    constructor(elementRef, service, renderer) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        this.renderer = renderer;
        this.defaultConfig = { lock: true };
        // @Input('cxLockFocus')
        this.config = {};
        /**
         * Emits an event when the host is unlocked.
         */
        this.unlock = new EventEmitter();
    }
    /**
     * When the user selects enter or space, the focusable childs are
     * unlocked, which means that the tabindex is set to 0.
     */
    handleEnter(event) {
        if (this.shouldLock && this.host === event.target) {
            this.unlockFocus(event);
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * In case any of the children elements is touched by the mouse,
     * we unlock the group to not break the mouse-experience.
     */
    handleClick(event) {
        if (this.shouldLock && this.isLocked) {
            this.unlockFocus(event);
            event.stopPropagation();
        }
    }
    lockFocus() {
        this.addTabindexToChildren(-1);
    }
    unlockFocus(event) {
        this.unlock.emit(true);
        this.addTabindexToChildren(0);
        // we focus the host if the event was triggered from a child
        if (event?.target === this.host) {
            // we wait a few milliseconds, mainly because firefox will otherwise apply
            // the mouse event on the new focused child element
            setTimeout(() => {
                super.handleFocus(event);
            }, 100);
        }
    }
    ngOnInit() {
        super.ngOnInit();
        this.shouldLock = this.config?.lock;
        if (this.shouldLock) {
            this.tabindex = 0;
            // Locked elements will be set to `autofocus` by default if it's not
            // been configured. This will ensure that autofocus kicks in upon unlock.
            if (!this.config.hasOwnProperty('autofocus')) {
                this.config.autofocus = true;
            }
            // Locked elements will be set to `focusOnEscape` by default if it's not
            // been configured. This will ensure that  the host gets locked again when
            // `escape` is pressed.
            if (!this.config.hasOwnProperty('focusOnEscape')) {
                this.config.focusOnEscape = !(this.config?.focusOnEscape === false);
            }
        }
    }
    ngAfterViewInit() {
        if (this.shouldLock) {
            /**
             * If the component hosts a group of focusable children elements,
             * we persist the group key to the children, so that they can taken this
             * into account when they persist their focus state.
             */
            if (!!this.group) {
                const group = this.group;
                this.service.findFocusable(this.host).forEach((el) => 
                // we must do this in after view init as
                this.renderer.setAttribute(el, FOCUS_GROUP_ATTR, group));
            }
            if (this.shouldAutofocus) {
                this.handleFocus();
            }
        }
        super.ngAfterViewInit();
    }
    handleFocus(event) {
        if (this.shouldLock) {
            if (this.shouldUnlockAfterAutofocus(event)) {
                // Delay unlocking in case the host is using `ChangeDetectionStrategy.Default`
                setTimeout(() => this.unlockFocus(event));
            }
            else {
                setTimeout(() => this.lockFocus());
                event?.stopPropagation();
                return;
            }
        }
        super.handleFocus(event);
    }
    handleEscape(event) {
        if (this.shouldLock) {
            this.service.clear(this.config.group);
        }
        super.handleEscape(event);
    }
    /**
     * When the handleFocus is called without an actual event, it's coming from Autofocus.
     * In this case we unlock the focusable children in case there's a focusable child that
     * was unlocked before.
     *
     * We keep this private to not polute the API.
     */
    shouldUnlockAfterAutofocus(event) {
        return !event && this.service.hasPersistedFocus(this.host, this.config);
    }
    /**
     * Add the tabindex attribute to the focusable children elements
     */
    addTabindexToChildren(i = 0) {
        if (this.shouldLock) {
            this.isLocked = i === -1;
            if (!(this.hasFocusableChildren && i === 0) || i === 0) {
                this.focusable.forEach((el) => this.renderer.setAttribute(el, 'tabindex', i.toString()));
            }
        }
    }
    /**
     * Utility method, returns all focusable children for the host element.
     *
     * We keep this private to not polute the API.
     */
    get hasFocusableChildren() {
        return this.service.hasFocusableChildren(this.host);
    }
    /**
     * Returns the focusable children of the host element. If the host element
     * is configured to be locked, the query is restricted to child elements
     * with a tabindex !== `-1`.
     *
     * We keep this private to not polute the API.
     */
    get focusable() {
        return this.service.findFocusable(this.host, this.shouldLock, UNLOCK_HIDDEN_ELEMENTS);
    }
}
LockFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LockFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.LockFocusService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
LockFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: LockFocusDirective, outputs: { unlock: "unlock" }, host: { listeners: { "keydown.enter": "handleEnter($event)", "keydown.space": "handleEnter($event)", "click": "handleClick($event)" }, properties: { "class.focus-lock": "this.shouldLock", "class.is-locked": "this.isLocked" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LockFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.LockFocusService }, { type: i0.Renderer2 }]; }, propDecorators: { shouldLock: [{
                type: HostBinding,
                args: ['class.focus-lock']
            }], isLocked: [{
                type: HostBinding,
                args: ['class.is-locked']
            }], unlock: [{
                type: Output
            }], handleEnter: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2xvY2svbG9jay1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBRVosTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBR2xFOzs7R0FHRztBQUNILE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDO0FBQ3BDOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sa0JBQ1gsU0FBUSxrQkFBa0I7SUFrRDFCLFlBQ1ksVUFBc0IsRUFDdEIsT0FBeUIsRUFDekIsUUFBbUI7UUFFN0IsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUpqQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFsRHJCLGtCQUFhLEdBQW9CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRTFELHdCQUF3QjtRQUNkLFdBQU0sR0FBb0IsRUFBRSxDQUFDO1FBYXZDOztXQUVHO1FBQ08sV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFrQy9DLENBQUM7SUFoQ0Q7OztPQUdHO0lBR0gsV0FBVyxDQUFDLEtBQW9CO1FBQzlCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFNLEtBQUssQ0FBQyxNQUFzQixFQUFFO1lBQ2xFLElB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QUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBWSxvQkFBb0I7UUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsSUFBWSxTQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQy9CLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLFVBQVUsRUFDZixzQkFBc0IsQ0FDdkIsQ0FBQztJQUNKLENBQUM7OytHQTVMVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO3dKQWN5QixVQUFVO3NCQUExQyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFLQyxRQUFRO3NCQUF2QyxXQUFXO3VCQUFDLGlCQUFpQjtnQkFLcEIsTUFBTTtzQkFBZixNQUFNO2dCQVFQLFdBQVc7c0JBRlYsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQUN4QyxZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFjekMsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZPQ1VTX0dST1VQX0FUVFIsIExvY2tGb2N1c0NvbmZpZyB9IGZyb20gJy4uL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFRyYXBGb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4uL3RyYXAvdHJhcC1mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTG9ja0ZvY3VzU2VydmljZSB9IGZyb20gJy4vbG9jay1mb2N1cy5zZXJ2aWNlJztcblxuLyoqXG4gKiBGb2N1c2FibGUgZWxlbWVudHMgZXhjbHVkZSBoaWRkZW4gZWxlbWVudHMgYnkgZGVmYXVsdCwgYnV0IHRoaXMgY29udHJhZGljdHMgd2l0aFxuICogdW5sb2NraW5nIChoaWRkZW4pIGVsZW1lbnRzLlxuICovXG5jb25zdCBVTkxPQ0tfSElEREVOX0VMRU1FTlRTID0gdHJ1ZTtcbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYWRkcyBwZXJzaXN0ZW5jZSBmb3IgZm9jdXNzZWQgZWxlbWVudCBpbiBjYXNlXG4gKiB0aGUgZWxlbWVudHMgYXJlIGJlaW5nIHJlYnVpbGQuIFRoaXMgaGFwcGVucyBvZnRlbiB3aGVuIGNoYW5nZVxuICogZGV0ZWN0aW9uIGtpY2tzIGluIGJlY2F1c2Ugb2YgbmV3IGRhdGEgc2V0IGZyb20gdGhlIGJhY2tlbmQuXG4gKi9cbkBEaXJlY3RpdmUoKSAvLyBzZWxlY3RvcjogJ1tjeExvY2tGb2N1c10nXG5leHBvcnQgY2xhc3MgTG9ja0ZvY3VzRGlyZWN0aXZlXG4gIGV4dGVuZHMgVHJhcEZvY3VzRGlyZWN0aXZlXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0XG57XG4gIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBMb2NrRm9jdXNDb25maWcgPSB7IGxvY2s6IHRydWUgfTtcblxuICAvLyBASW5wdXQoJ2N4TG9ja0ZvY3VzJylcbiAgcHJvdGVjdGVkIGNvbmZpZzogTG9ja0ZvY3VzQ29uZmlnID0ge307XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IHRoZSBob3N0IGlzIGNvbmZpZ3VyZWQgdG8gdXNlIGxvY2tpbmcuIFRoaXMgaXMgYXZhaWxhYmxlIGFzIGFcbiAgICogQ1NTIGNsYXNzIGBmb2N1cy1sb2NrYC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZm9jdXMtbG9jaycpIHNob3VsZExvY2s6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IHRoZSBob3N0IGlzIGxvY2tlZC4gVGhpcyBpcyBhdmFpbGFibGUgYXMgYSBDU1MgY2xhc3MgYGlzLWxvY2tlZGAuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmlzLWxvY2tlZCcpIGlzTG9ja2VkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBob3N0IGlzIHVubG9ja2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHVubG9jayA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogV2hlbiB0aGUgdXNlciBzZWxlY3RzIGVudGVyIG9yIHNwYWNlLCB0aGUgZm9jdXNhYmxlIGNoaWxkcyBhcmVcbiAgICogdW5sb2NrZWQsIHdoaWNoIG1lYW5zIHRoYXQgdGhlIHRhYmluZGV4IGlzIHNldCB0byAwLlxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICBoYW5kbGVFbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLnNob3VsZExvY2sgJiYgdGhpcy5ob3N0ID09PSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgdGhpcy51bmxvY2tGb2N1cyhldmVudCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluIGNhc2UgYW55IG9mIHRoZSBjaGlsZHJlbiBlbGVtZW50cyBpcyB0b3VjaGVkIGJ5IHRoZSBtb3VzZSxcbiAgICogd2UgdW5sb2NrIHRoZSBncm91cCB0byBub3QgYnJlYWsgdGhlIG1vdXNlLWV4cGVyaWVuY2UuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2hvdWxkTG9jayAmJiB0aGlzLmlzTG9ja2VkKSB7XG4gICAgICB0aGlzLnVubG9ja0ZvY3VzKGV2ZW50KTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBzZXJ2aWNlOiBMb2NrRm9jdXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHNlcnZpY2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvY2tGb2N1cygpIHtcbiAgICB0aGlzLmFkZFRhYmluZGV4VG9DaGlsZHJlbigtMSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdW5sb2NrRm9jdXMoZXZlbnQ/OiBVSUV2ZW50KSB7XG4gICAgdGhpcy51bmxvY2suZW1pdCh0cnVlKTtcbiAgICB0aGlzLmFkZFRhYmluZGV4VG9DaGlsZHJlbigwKTtcbiAgICAvLyB3ZSBmb2N1cyB0aGUgaG9zdCBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBmcm9tIGEgY2hpbGRcbiAgICBpZiAoZXZlbnQ/LnRhcmdldCA9PT0gdGhpcy5ob3N0KSB7XG4gICAgICAvLyB3ZSB3YWl0IGEgZmV3IG1pbGxpc2Vjb25kcywgbWFpbmx5IGJlY2F1c2UgZmlyZWZveCB3aWxsIG90aGVyd2lzZSBhcHBseVxuICAgICAgLy8gdGhlIG1vdXNlIGV2ZW50IG9uIHRoZSBuZXcgZm9jdXNlZCBjaGlsZCBlbGVtZW50XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc3VwZXIuaGFuZGxlRm9jdXMoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCk7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLnNob3VsZExvY2sgPSB0aGlzLmNvbmZpZz8ubG9jaztcblxuICAgIGlmICh0aGlzLnNob3VsZExvY2spIHtcbiAgICAgIHRoaXMudGFiaW5kZXggPSAwO1xuXG4gICAgICAvLyBMb2NrZWQgZWxlbWVudHMgd2lsbCBiZSBzZXQgdG8gYGF1dG9mb2N1c2AgYnkgZGVmYXVsdCBpZiBpdCdzIG5vdFxuICAgICAgLy8gYmVlbiBjb25maWd1cmVkLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgYXV0b2ZvY3VzIGtpY2tzIGluIHVwb24gdW5sb2NrLlxuICAgICAgaWYgKCF0aGlzLmNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnYXV0b2ZvY3VzJykpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXV0b2ZvY3VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIExvY2tlZCBlbGVtZW50cyB3aWxsIGJlIHNldCB0byBgZm9jdXNPbkVzY2FwZWAgYnkgZGVmYXVsdCBpZiBpdCdzIG5vdFxuICAgICAgLy8gYmVlbiBjb25maWd1cmVkLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgIHRoZSBob3N0IGdldHMgbG9ja2VkIGFnYWluIHdoZW5cbiAgICAgIC8vIGBlc2NhcGVgIGlzIHByZXNzZWQuXG4gICAgICBpZiAoIXRoaXMuY29uZmlnLmhhc093blByb3BlcnR5KCdmb2N1c09uRXNjYXBlJykpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZm9jdXNPbkVzY2FwZSA9ICEodGhpcy5jb25maWc/LmZvY3VzT25Fc2NhcGUgPT09IGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkTG9jaykge1xuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGUgY29tcG9uZW50IGhvc3RzIGEgZ3JvdXAgb2YgZm9jdXNhYmxlIGNoaWxkcmVuIGVsZW1lbnRzLFxuICAgICAgICogd2UgcGVyc2lzdCB0aGUgZ3JvdXAga2V5IHRvIHRoZSBjaGlsZHJlbiwgc28gdGhhdCB0aGV5IGNhbiB0YWtlbiB0aGlzXG4gICAgICAgKiBpbnRvIGFjY291bnQgd2hlbiB0aGV5IHBlcnNpc3QgdGhlaXIgZm9jdXMgc3RhdGUuXG4gICAgICAgKi9cbiAgICAgIGlmICghIXRoaXMuZ3JvdXApIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgICAgICB0aGlzLnNlcnZpY2UuZmluZEZvY3VzYWJsZSh0aGlzLmhvc3QpLmZvckVhY2goKGVsKSA9PlxuICAgICAgICAgIC8vIHdlIG11c3QgZG8gdGhpcyBpbiBhZnRlciB2aWV3IGluaXQgYXNcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgRk9DVVNfR1JPVVBfQVRUUiwgZ3JvdXApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNob3VsZEF1dG9mb2N1cykge1xuICAgICAgICB0aGlzLmhhbmRsZUZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICB9XG5cbiAgaGFuZGxlRm9jdXMoZXZlbnQ/OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2hvdWxkTG9jaykge1xuICAgICAgaWYgKHRoaXMuc2hvdWxkVW5sb2NrQWZ0ZXJBdXRvZm9jdXMoZXZlbnQpKSB7XG4gICAgICAgIC8vIERlbGF5IHVubG9ja2luZyBpbiBjYXNlIHRoZSBob3N0IGlzIHVzaW5nIGBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0YFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudW5sb2NrRm9jdXMoZXZlbnQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5sb2NrRm9jdXMoKSk7XG4gICAgICAgIGV2ZW50Py5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzdXBlci5oYW5kbGVGb2N1cyhldmVudCk7XG4gIH1cblxuICBoYW5kbGVFc2NhcGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG91bGRMb2NrKSB7XG4gICAgICB0aGlzLnNlcnZpY2UuY2xlYXIodGhpcy5jb25maWcuZ3JvdXApO1xuICAgIH1cbiAgICBzdXBlci5oYW5kbGVFc2NhcGUoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGhhbmRsZUZvY3VzIGlzIGNhbGxlZCB3aXRob3V0IGFuIGFjdHVhbCBldmVudCwgaXQncyBjb21pbmcgZnJvbSBBdXRvZm9jdXMuXG4gICAqIEluIHRoaXMgY2FzZSB3ZSB1bmxvY2sgdGhlIGZvY3VzYWJsZSBjaGlsZHJlbiBpbiBjYXNlIHRoZXJlJ3MgYSBmb2N1c2FibGUgY2hpbGQgdGhhdFxuICAgKiB3YXMgdW5sb2NrZWQgYmVmb3JlLlxuICAgKlxuICAgKiBXZSBrZWVwIHRoaXMgcHJpdmF0ZSB0byBub3QgcG9sdXRlIHRoZSBBUEkuXG4gICAqL1xuICBwcml2YXRlIHNob3VsZFVubG9ja0FmdGVyQXV0b2ZvY3VzKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIHJldHVybiAhZXZlbnQgJiYgdGhpcy5zZXJ2aWNlLmhhc1BlcnNpc3RlZEZvY3VzKHRoaXMuaG9zdCwgdGhpcy5jb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgdGFiaW5kZXggYXR0cmlidXRlIHRvIHRoZSBmb2N1c2FibGUgY2hpbGRyZW4gZWxlbWVudHNcbiAgICovXG4gIHByb3RlY3RlZCBhZGRUYWJpbmRleFRvQ2hpbGRyZW4oaSA9IDApOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG91bGRMb2NrKSB7XG4gICAgICB0aGlzLmlzTG9ja2VkID0gaSA9PT0gLTE7XG4gICAgICBpZiAoISh0aGlzLmhhc0ZvY3VzYWJsZUNoaWxkcmVuICYmIGkgPT09IDApIHx8IGkgPT09IDApIHtcbiAgICAgICAgdGhpcy5mb2N1c2FibGUuZm9yRWFjaCgoZWwpID0+XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsIGkudG9TdHJpbmcoKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QsIHJldHVybnMgYWxsIGZvY3VzYWJsZSBjaGlsZHJlbiBmb3IgdGhlIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogV2Uga2VlcCB0aGlzIHByaXZhdGUgdG8gbm90IHBvbHV0ZSB0aGUgQVBJLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXQgaGFzRm9jdXNhYmxlQ2hpbGRyZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5oYXNGb2N1c2FibGVDaGlsZHJlbih0aGlzLmhvc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZvY3VzYWJsZSBjaGlsZHJlbiBvZiB0aGUgaG9zdCBlbGVtZW50LiBJZiB0aGUgaG9zdCBlbGVtZW50XG4gICAqIGlzIGNvbmZpZ3VyZWQgdG8gYmUgbG9ja2VkLCB0aGUgcXVlcnkgaXMgcmVzdHJpY3RlZCB0byBjaGlsZCBlbGVtZW50c1xuICAgKiB3aXRoIGEgdGFiaW5kZXggIT09IGAtMWAuXG4gICAqXG4gICAqIFdlIGtlZXAgdGhpcyBwcml2YXRlIHRvIG5vdCBwb2x1dGUgdGhlIEFQSS5cbiAgICovXG4gIHByaXZhdGUgZ2V0IGZvY3VzYWJsZSgpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZpbmRGb2N1c2FibGUoXG4gICAgICB0aGlzLmhvc3QsXG4gICAgICB0aGlzLnNob3VsZExvY2ssXG4gICAgICBVTkxPQ0tfSElEREVOX0VMRU1FTlRTXG4gICAgKTtcbiAgfVxufVxuIl19