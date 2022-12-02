/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventEmitter, Injectable, } from '@angular/core';
import { EventListenerUtils } from '@spartacus/epd-visualization/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class VisualViewerAnimationSliderService {
    constructor(elementRef, windowRef, renderer, changeDetectorRef) {
        this.elementRef = elementRef;
        this.windowRef = windowRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this._initialized = false;
        this.initializedChange = new EventEmitter();
        this._value = 0;
        this.valueChange = new EventEmitter();
        this._disabled = false;
        this._resizeObserver = undefined;
        this.eventListenerUtils = new EventListenerUtils();
        this._touchIdentifier = undefined;
        this.sizeChange = new EventEmitter();
        this.stepDelta = 1 / 50;
        this.pageDelta = 1 / 10;
        this.eventListenerUtils.initialize(this.renderer);
    }
    initialize() {
        this.updateEventBindings();
        this.setupResizeObserver();
        this.setInitialized();
    }
    setInitialized() {
        this._initialized = true;
        this.initializedChange.emit(true);
        this.initializedChange.complete();
    }
    get initialized() {
        return this._initialized;
    }
    /**
     * Slider value. Value is in the range [0-1].
     */
    set value(value) {
        value = this.clampToRange(value);
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.valueChange.emit(this.value);
    }
    get value() {
        return this._value;
    }
    set disabled(disabled) {
        if (this._disabled === disabled) {
            return;
        }
        this._disabled = disabled;
        this.updateEventBindings();
    }
    get disabled() {
        return this._disabled;
    }
    set hidden(hidden) {
        if (this._hidden === hidden) {
            return;
        }
        this._hidden = hidden;
        // Ensure handle position is recalculated when the animation slider visibility changes
        // Fixes a bug in which the initial position of the slider handle is incorrect
        // because the bar width is calculated while the animation slider is hidden (noticeable in RTL mode)
        this.changeDetectorRef.detectChanges();
    }
    get hidden() {
        return this._hidden;
    }
    get position() {
        return this.valueToPosition(this.value);
    }
    get rightToLeft() {
        return this.windowRef.document.documentElement.dir === 'rtl';
    }
    set barElement(barElement) {
        this._barElement = barElement;
    }
    get barElement() {
        return this._barElement;
    }
    set handleElement(handleElement) {
        this._handleElement = handleElement;
    }
    get handleElement() {
        return this._handleElement;
    }
    set resizeObserver(resizeObserver) {
        this._resizeObserver = resizeObserver;
    }
    get resizeObserver() {
        return this._resizeObserver;
    }
    set touchIdentifier(touchIdentifier) {
        this._touchIdentifier = touchIdentifier;
    }
    get touchIdentifier() {
        return this._touchIdentifier;
    }
    getClientWidth(elementRef) {
        if (!elementRef || !elementRef.nativeElement) {
            return undefined;
        }
        const clientRect = this.getClientRect(elementRef);
        return clientRect.right - clientRect.left;
    }
    getClientRect(elementRef) {
        return elementRef.nativeElement.getBoundingClientRect();
    }
    resizeObserverSupported() {
        return window.ResizeObserver !== undefined;
    }
    setupResizeObserver() {
        if (this.resizeObserverSupported()) {
            this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
    }
    onResize() {
        // Ensure handle position is recalculated on resize
        this.changeDetectorRef.detectChanges();
    }
    updateEventBindings() {
        if (this.disabled) {
            this.eventListenerUtils.detachAllEventListeners(document);
            this.eventListenerUtils.detachAllEventListeners(this.barElement.nativeElement);
            this.eventListenerUtils.detachAllEventListeners(this.handleElement.nativeElement);
        }
        else {
            this.eventListenerUtils.attachEventListener(this.handleElement.nativeElement, 'mousedown', this.onMouseDown.bind(this));
            this.eventListenerUtils.attachEventListener(this.barElement.nativeElement, 'mousedown', this.onMouseDownOnBar.bind(this));
            this.eventListenerUtils.attachEventListener(this.handleElement.nativeElement, 'touchstart', this.onTouchStart.bind(this));
            this.eventListenerUtils.attachEventListener(this.barElement.nativeElement, 'touchstart', this.onTouchStartOnBar.bind(this));
            this.eventListenerUtils.attachEventListener(this.handleElement.nativeElement, 'focus', this.onHandleFocus.bind(this));
        }
    }
    get handleWidth() {
        return this.getClientWidth(this.handleElement) ?? 0;
    }
    get barWidth() {
        return this.getClientWidth(this.barElement) ?? 0;
    }
    get handleMaxPosition() {
        return this.barWidth - this.handleWidth;
    }
    valueToPosition(value) {
        let position = this.clampToRange(value);
        if (this.rightToLeft) {
            position = 1 - position;
        }
        return position * this.handleMaxPosition;
    }
    positionToValue(position) {
        let value = position / this.handleMaxPosition;
        if (this.rightToLeft) {
            value = 1 - value;
        }
        return value;
    }
    findTouch(touchList, touchIdentifier) {
        for (let i = 0; i < touchList.length; i++) {
            const touch = touchList.item(i);
            if (touch.identifier === touchIdentifier) {
                return touch;
            }
        }
        return undefined;
    }
    get sliderClientPosition() {
        return this.getClientRect(this.elementRef).left;
    }
    onTouchStart(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.touchIdentifier !== undefined) {
            return;
        }
        this.eventListenerUtils.detachEventListeners(document, 'touchmove');
        this.eventListenerUtils.attachEventListener(document, 'touchmove', this.onTouchMove.bind(this));
        this.eventListenerUtils.detachEventListeners(document, 'touchend');
        this.eventListenerUtils.attachEventListener(document, 'touchend', this.onTouchEnd.bind(this));
        this.touchIdentifier = event.changedTouches[0].identifier;
    }
    onTouchStartOnBar(event) {
        this.onTouchStart(event);
        this.onTouchMove(event);
    }
    onMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();
        this.eventListenerUtils.detachEventListeners(document, 'mousemove');
        this.eventListenerUtils.attachEventListener(document, 'mousemove', this.onMouseMove.bind(this));
        this.eventListenerUtils.detachEventListeners(document, 'mouseup');
        this.eventListenerUtils.attachEventListener(document, 'mouseup', this.onMouseUp.bind(this));
    }
    onMouseDownOnBar(event) {
        this.onMouseDown(event);
        this.onMouseMove(event);
    }
    onMouseMove(event) {
        const position = event.clientX - this.sliderClientPosition - this.handleWidth / 2;
        this.applyValue(this.positionToValue(position));
    }
    onMouseUp(_event) {
        this.eventListenerUtils.detachEventListeners(document, 'mousemove');
        this.eventListenerUtils.detachEventListeners(document, 'mouseup');
    }
    onTouchMove(event) {
        let touchInitiatedOnSlider = this.findTouch(event.changedTouches, this.touchIdentifier);
        if (touchInitiatedOnSlider === undefined) {
            return;
        }
        let touch = this.findTouch(event.touches, this.touchIdentifier);
        const position = touch.clientX - this.sliderClientPosition - this.handleWidth / 2;
        this.applyValue(this.positionToValue(position));
    }
    onTouchEnd(event) {
        let touchInitiatedOnSlider = this.findTouch(event.changedTouches, this.touchIdentifier);
        if (touchInitiatedOnSlider === undefined) {
            return;
        }
        this.touchIdentifier = undefined;
        this.eventListenerUtils.detachEventListeners(document, 'touchmove');
        this.eventListenerUtils.detachEventListeners(document, 'touchend');
    }
    onHandleFocus() {
        const nativeElement = this.handleElement.nativeElement;
        this.eventListenerUtils.attachEventListener(nativeElement, 'blur', this.onHandleBlur.bind(this));
        this.eventListenerUtils.attachEventListener(nativeElement, 'keydown', this.onKeyboardEvent.bind(this));
    }
    onHandleBlur() {
        const nativeElement = this.handleElement.nativeElement;
        this.eventListenerUtils.detachEventListeners(nativeElement, 'blur');
        this.eventListenerUtils.detachEventListeners(nativeElement, 'keydown');
        this.eventListenerUtils.detachEventListeners(nativeElement, 'keyup');
    }
    onKeyboardEvent(event) {
        const keyHandler = this.getKeyHandler(event.code, this.rightToLeft);
        if (keyHandler === undefined) {
            return;
        }
        event.preventDefault();
        this.applyValue(keyHandler(this.value));
    }
    getKeyHandler(keyCode, rightToLeft) {
        let increaseStep = (currentValue) => currentValue + this.stepDelta;
        let decreaseStep = (currentValue) => currentValue - this.stepDelta;
        let increasePage = (currentValue) => currentValue + this.pageDelta;
        let decreasePage = (currentValue) => currentValue - this.pageDelta;
        let stepLeft = rightToLeft ? increaseStep : decreaseStep;
        let stepRight = rightToLeft ? decreaseStep : increaseStep;
        let home = () => 0;
        let end = () => 1;
        switch (keyCode) {
            case 'ArrowUp':
                return increaseStep;
            case 'ArrowDown':
                return decreaseStep;
            case 'ArrowLeft':
                return stepLeft;
            case 'ArrowRight':
                return stepRight;
            case 'PageUp':
                return increasePage;
            case 'PageDown':
                return decreasePage;
            case 'Home':
                return home;
            case 'End':
                return end;
            default:
                return undefined;
        }
    }
    applyValue(value) {
        value = this.clampToRange(value);
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
        }
    }
    clampToRange(value) {
        return Math.min(Math.max(value, 0), 1);
    }
}
VisualViewerAnimationSliderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualViewerAnimationSliderService, deps: [{ token: i0.ElementRef }, { token: i1.WindowRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualViewerAnimationSliderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualViewerAnimationSliderService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualViewerAnimationSliderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.WindowRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci1hbmltYXRpb24tc2xpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci90b29sYmFyL3Zpc3VhbC12aWV3ZXItYW5pbWF0aW9uLXNsaWRlci92aXN1YWwtdmlld2VyLWFuaW1hdGlvbi1zbGlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUdMLFlBQVksRUFDWixVQUFVLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQUt2RSxNQUFNLE9BQU8sa0NBQWtDO0lBQzdDLFlBQ1UsVUFBc0IsRUFDdEIsU0FBb0IsRUFDcEIsUUFBbUIsRUFDbkIsaUJBQW9DO1FBSHBDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFtQnRDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFnQi9DLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVkvQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBK0MzQixvQkFBZSxHQUFvQixTQUFTLENBQUM7UUFDN0MsdUJBQWtCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBUTlDLHFCQUFnQixHQUFZLFNBQVMsQ0FBQztRQTZCOUMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUErTWIsY0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLENB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K0hBMVlVLGtDQUFrQzttSUFBbEMsa0NBQWtDLGNBRmpDLEtBQUs7MkZBRU4sa0NBQWtDO2tCQUg5QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdGFibGUsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRMaXN0ZW5lclV0aWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9yb290JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55Jyxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyU2VydmljZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB3aW5kb3dSZWY6IFdpbmRvd1JlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuaW5pdGlhbGl6ZSh0aGlzLnJlbmRlcmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlRXZlbnRCaW5kaW5ncygpO1xuICAgIHRoaXMuc2V0dXBSZXNpemVPYnNlcnZlcigpO1xuICAgIHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbGl6ZWQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWRDaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmluaXRpYWxpemVkQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cbiAgcHVibGljIGdldCBpbml0aWFsaXplZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbGl6ZWQ7XG4gIH1cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHVibGljIGluaXRpYWxpemVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBTbGlkZXIgdmFsdWUuIFZhbHVlIGlzIGluIHRoZSByYW5nZSBbMC0xXS5cbiAgICovXG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdmFsdWUgPSB0aGlzLmNsYW1wVG9SYW5nZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXIgPSAwO1xuICB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkID09PSBkaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIHRoaXMudXBkYXRlRXZlbnRCaW5kaW5ncygpO1xuICB9XG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzZXQgaGlkZGVuKGhpZGRlbjogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9oaWRkZW4gPT09IGhpZGRlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9oaWRkZW4gPSBoaWRkZW47XG4gICAgLy8gRW5zdXJlIGhhbmRsZSBwb3NpdGlvbiBpcyByZWNhbGN1bGF0ZWQgd2hlbiB0aGUgYW5pbWF0aW9uIHNsaWRlciB2aXNpYmlsaXR5IGNoYW5nZXNcbiAgICAvLyBGaXhlcyBhIGJ1ZyBpbiB3aGljaCB0aGUgaW5pdGlhbCBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGhhbmRsZSBpcyBpbmNvcnJlY3RcbiAgICAvLyBiZWNhdXNlIHRoZSBiYXIgd2lkdGggaXMgY2FsY3VsYXRlZCB3aGlsZSB0aGUgYW5pbWF0aW9uIHNsaWRlciBpcyBoaWRkZW4gKG5vdGljZWFibGUgaW4gUlRMIG1vZGUpXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbiAgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZGVuO1xuICB9XG4gIHByaXZhdGUgX2hpZGRlbjogYm9vbGVhbjtcblxuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVRvUG9zaXRpb24odGhpcy52YWx1ZSk7XG4gIH1cblxuICBnZXQgcmlnaHRUb0xlZnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93UmVmLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIgPT09ICdydGwnO1xuICB9XG5cbiAgc2V0IGJhckVsZW1lbnQoYmFyRWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2JhckVsZW1lbnQgPSBiYXJFbGVtZW50O1xuICB9XG4gIGdldCBiYXJFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9iYXJFbGVtZW50O1xuICB9XG4gIF9iYXJFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIHNldCBoYW5kbGVFbGVtZW50KGhhbmRsZUVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9oYW5kbGVFbGVtZW50ID0gaGFuZGxlRWxlbWVudDtcbiAgfVxuICBnZXQgaGFuZGxlRWxlbWVudCgpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRWxlbWVudDtcbiAgfVxuICBfaGFuZGxlRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIHNldCByZXNpemVPYnNlcnZlcihyZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlciA9IHJlc2l6ZU9ic2VydmVyO1xuICB9XG4gIHByaXZhdGUgZ2V0IHJlc2l6ZU9ic2VydmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZXNpemVPYnNlcnZlcjtcbiAgfVxuICBwcml2YXRlIF9yZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIGV2ZW50TGlzdGVuZXJVdGlscyA9IG5ldyBFdmVudExpc3RlbmVyVXRpbHMoKTtcblxuICBwcml2YXRlIHNldCB0b3VjaElkZW50aWZpZXIodG91Y2hJZGVudGlmaWVyOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl90b3VjaElkZW50aWZpZXIgPSB0b3VjaElkZW50aWZpZXI7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgdG91Y2hJZGVudGlmaWVyKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdWNoSWRlbnRpZmllcjtcbiAgfVxuICBwcml2YXRlIF90b3VjaElkZW50aWZpZXI/OiBudW1iZXIgPSB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBnZXRDbGllbnRXaWR0aChlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWVsZW1lbnRSZWYgfHwgIWVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgY2xpZW50UmVjdCA9IHRoaXMuZ2V0Q2xpZW50UmVjdChlbGVtZW50UmVmKTtcbiAgICByZXR1cm4gY2xpZW50UmVjdC5yaWdodCAtIGNsaWVudFJlY3QubGVmdDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2xpZW50UmVjdChlbGVtZW50UmVmOiBFbGVtZW50UmVmKTogRE9NUmVjdCB7XG4gICAgcmV0dXJuIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplT2JzZXJ2ZXJTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpbmRvdy5SZXNpemVPYnNlcnZlciAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFJlc2l6ZU9ic2VydmVyKCkge1xuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyU3VwcG9ydGVkKCkpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblJlc2l6ZSgpIHtcbiAgICAvLyBFbnN1cmUgaGFuZGxlIHBvc2l0aW9uIGlzIHJlY2FsY3VsYXRlZCBvbiByZXNpemVcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuICBzaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgdXBkYXRlRXZlbnRCaW5kaW5ncygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoQWxsRXZlbnRMaXN0ZW5lcnMoZG9jdW1lbnQpO1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoQWxsRXZlbnRMaXN0ZW5lcnMoXG4gICAgICAgIHRoaXMuYmFyRWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICApO1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoQWxsRXZlbnRMaXN0ZW5lcnMoXG4gICAgICAgIHRoaXMuaGFuZGxlRWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLmhhbmRsZUVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ21vdXNlZG93bicsXG4gICAgICAgIHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmF0dGFjaEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIHRoaXMuYmFyRWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAnbW91c2Vkb3duJyxcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bk9uQmFyLmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLmhhbmRsZUVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5iYXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgdGhpcy5vblRvdWNoU3RhcnRPbkJhci5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5oYW5kbGVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICdmb2N1cycsXG4gICAgICAgIHRoaXMub25IYW5kbGVGb2N1cy5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBoYW5kbGVXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENsaWVudFdpZHRoKHRoaXMuaGFuZGxlRWxlbWVudCkgPz8gMDtcbiAgfVxuXG4gIGdldCBiYXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENsaWVudFdpZHRoKHRoaXMuYmFyRWxlbWVudCkgPz8gMDtcbiAgfVxuXG4gIGdldCBoYW5kbGVNYXhQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJhcldpZHRoIC0gdGhpcy5oYW5kbGVXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgdmFsdWVUb1Bvc2l0aW9uKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBwb3NpdGlvbjogbnVtYmVyID0gdGhpcy5jbGFtcFRvUmFuZ2UodmFsdWUpO1xuICAgIGlmICh0aGlzLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICBwb3NpdGlvbiA9IDEgLSBwb3NpdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIHBvc2l0aW9uICogdGhpcy5oYW5kbGVNYXhQb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgcG9zaXRpb25Ub1ZhbHVlKHBvc2l0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCB2YWx1ZTogbnVtYmVyID0gcG9zaXRpb24gLyB0aGlzLmhhbmRsZU1heFBvc2l0aW9uO1xuICAgIGlmICh0aGlzLnJpZ2h0VG9MZWZ0KSB7XG4gICAgICB2YWx1ZSA9IDEgLSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kVG91Y2goXG4gICAgdG91Y2hMaXN0OiBUb3VjaExpc3QsXG4gICAgdG91Y2hJZGVudGlmaWVyPzogbnVtYmVyXG4gICk6IFRvdWNoIHwgdW5kZWZpbmVkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdWNoTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdG91Y2ggPSB0b3VjaExpc3QuaXRlbShpKSBhcyBUb3VjaDtcbiAgICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSB0b3VjaElkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRvdWNoO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgc2xpZGVyQ2xpZW50UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDbGllbnRSZWN0KHRoaXMuZWxlbWVudFJlZikubGVmdDtcbiAgfVxuXG4gIHByaXZhdGUgb25Ub3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0aGlzLnRvdWNoSWRlbnRpZmllciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMoZG9jdW1lbnQsICd0b3VjaG1vdmUnKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgZG9jdW1lbnQsXG4gICAgICAndG91Y2htb3ZlJyxcbiAgICAgIHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ3RvdWNoZW5kJyk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgIGRvY3VtZW50LFxuICAgICAgJ3RvdWNoZW5kJyxcbiAgICAgIHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIHRoaXMudG91Y2hJZGVudGlmaWVyID0gKGV2ZW50LmNoYW5nZWRUb3VjaGVzIGFzIFRvdWNoTGlzdClbMF0uaWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgb25Ub3VjaFN0YXJ0T25CYXIoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hTdGFydChldmVudCk7XG4gICAgdGhpcy5vblRvdWNoTW92ZShldmVudCk7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmRldGFjaEV2ZW50TGlzdGVuZXJzKGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgIGRvY3VtZW50LFxuICAgICAgJ21vdXNlbW92ZScsXG4gICAgICB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgIGRvY3VtZW50LFxuICAgICAgJ21vdXNldXAnLFxuICAgICAgdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VEb3duT25CYXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uTW91c2VEb3duKGV2ZW50KTtcbiAgICB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9XG4gICAgICBldmVudC5jbGllbnRYIC0gdGhpcy5zbGlkZXJDbGllbnRQb3NpdGlvbiAtIHRoaXMuaGFuZGxlV2lkdGggLyAyO1xuICAgIHRoaXMuYXBwbHlWYWx1ZSh0aGlzLnBvc2l0aW9uVG9WYWx1ZShwb3NpdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlVXAoX2V2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMoZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Ub3VjaE1vdmUoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBsZXQgdG91Y2hJbml0aWF0ZWRPblNsaWRlciA9IHRoaXMuZmluZFRvdWNoKFxuICAgICAgZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICB0aGlzLnRvdWNoSWRlbnRpZmllclxuICAgICk7XG4gICAgaWYgKHRvdWNoSW5pdGlhdGVkT25TbGlkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdG91Y2ggPSB0aGlzLmZpbmRUb3VjaChldmVudC50b3VjaGVzLCB0aGlzLnRvdWNoSWRlbnRpZmllcikgYXMgVG91Y2g7XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9XG4gICAgICB0b3VjaC5jbGllbnRYIC0gdGhpcy5zbGlkZXJDbGllbnRQb3NpdGlvbiAtIHRoaXMuaGFuZGxlV2lkdGggLyAyO1xuICAgIHRoaXMuYXBwbHlWYWx1ZSh0aGlzLnBvc2l0aW9uVG9WYWx1ZShwb3NpdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgbGV0IHRvdWNoSW5pdGlhdGVkT25TbGlkZXIgPSB0aGlzLmZpbmRUb3VjaChcbiAgICAgIGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgdGhpcy50b3VjaElkZW50aWZpZXJcbiAgICApO1xuICAgIGlmICh0b3VjaEluaXRpYXRlZE9uU2xpZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50b3VjaElkZW50aWZpZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMoZG9jdW1lbnQsICd0b3VjaG1vdmUnKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ3RvdWNoZW5kJyk7XG4gIH1cblxuICBwcml2YXRlIG9uSGFuZGxlRm9jdXMoKTogdm9pZCB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuaGFuZGxlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmF0dGFjaEV2ZW50TGlzdGVuZXIoXG4gICAgICBuYXRpdmVFbGVtZW50LFxuICAgICAgJ2JsdXInLFxuICAgICAgdGhpcy5vbkhhbmRsZUJsdXIuYmluZCh0aGlzKVxuICAgICk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgIG5hdGl2ZUVsZW1lbnQsXG4gICAgICAna2V5ZG93bicsXG4gICAgICB0aGlzLm9uS2V5Ym9hcmRFdmVudC5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25IYW5kbGVCbHVyKCk6IHZvaWQge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmhhbmRsZUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhuYXRpdmVFbGVtZW50LCAnYmx1cicpO1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmRldGFjaEV2ZW50TGlzdGVuZXJzKG5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJyk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMobmF0aXZlRWxlbWVudCwgJ2tleXVwJyk7XG4gIH1cblxuICBwcml2YXRlIG9uS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUhhbmRsZXIgPSB0aGlzLmdldEtleUhhbmRsZXIoZXZlbnQuY29kZSwgdGhpcy5yaWdodFRvTGVmdCk7XG4gICAgaWYgKGtleUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuYXBwbHlWYWx1ZShrZXlIYW5kbGVyKHRoaXMudmFsdWUpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSBzdGVwRGVsdGEgPSAxIC8gNTA7XG4gIHByb3RlY3RlZCByZWFkb25seSBwYWdlRGVsdGEgPSAxIC8gMTA7XG5cbiAgcHJpdmF0ZSBnZXRLZXlIYW5kbGVyKFxuICAgIGtleUNvZGU6IHN0cmluZyxcbiAgICByaWdodFRvTGVmdDogYm9vbGVhblxuICApOiAoKHZhbHVlOiBudW1iZXIpID0+IG51bWJlcikgfCB1bmRlZmluZWQge1xuICAgIGxldCBpbmNyZWFzZVN0ZXAgPSAoY3VycmVudFZhbHVlOiBudW1iZXIpID0+IGN1cnJlbnRWYWx1ZSArIHRoaXMuc3RlcERlbHRhO1xuICAgIGxldCBkZWNyZWFzZVN0ZXAgPSAoY3VycmVudFZhbHVlOiBudW1iZXIpID0+IGN1cnJlbnRWYWx1ZSAtIHRoaXMuc3RlcERlbHRhO1xuICAgIGxldCBpbmNyZWFzZVBhZ2UgPSAoY3VycmVudFZhbHVlOiBudW1iZXIpID0+IGN1cnJlbnRWYWx1ZSArIHRoaXMucGFnZURlbHRhO1xuICAgIGxldCBkZWNyZWFzZVBhZ2UgPSAoY3VycmVudFZhbHVlOiBudW1iZXIpID0+IGN1cnJlbnRWYWx1ZSAtIHRoaXMucGFnZURlbHRhO1xuICAgIGxldCBzdGVwTGVmdCA9IHJpZ2h0VG9MZWZ0ID8gaW5jcmVhc2VTdGVwIDogZGVjcmVhc2VTdGVwO1xuICAgIGxldCBzdGVwUmlnaHQgPSByaWdodFRvTGVmdCA/IGRlY3JlYXNlU3RlcCA6IGluY3JlYXNlU3RlcDtcbiAgICBsZXQgaG9tZSA9ICgpID0+IDA7XG4gICAgbGV0IGVuZCA9ICgpID0+IDE7XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICByZXR1cm4gaW5jcmVhc2VTdGVwO1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgcmV0dXJuIGRlY3JlYXNlU3RlcDtcbiAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgIHJldHVybiBzdGVwTGVmdDtcbiAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICByZXR1cm4gc3RlcFJpZ2h0O1xuICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgcmV0dXJuIGluY3JlYXNlUGFnZTtcbiAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgcmV0dXJuIGRlY3JlYXNlUGFnZTtcbiAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICByZXR1cm4gaG9tZTtcbiAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgIHJldHVybiBlbmQ7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgPSB0aGlzLmNsYW1wVG9SYW5nZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGFtcFRvUmFuZ2UodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCAwKSwgMSk7XG4gIH1cbn1cbiJdfQ==