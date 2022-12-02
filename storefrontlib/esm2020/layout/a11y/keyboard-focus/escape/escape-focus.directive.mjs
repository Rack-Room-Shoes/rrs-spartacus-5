/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, EventEmitter, HostListener, Output, } from '@angular/core';
import { PersistFocusDirective } from '../persist/persist-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./escape-focus.service";
/**
 * Directive to focus the host element whenever the `escape` key is captured.
 * UiEvents bubble up by nature, which is why the `cxEscGroup` can be used
 * on a tree of elements. Each time the escape key is used, the focus will
 * move up in the DOM tree.
 *
 */
export class EscapeFocusDirective extends PersistFocusDirective {
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        this.defaultConfig = { focusOnEscape: true };
        this.esc = new EventEmitter();
    }
    /**
     * Handles the escape key event.
     * @param event the native keyboard event which contains the escape keydown event
     */
    handleEscape(event) {
        if (this.service.shouldFocus(this.config)) {
            this.service.handleEscape(this.host, this.config, event);
        }
        this.esc.emit(this.service.shouldFocus(this.config));
    }
    ngOnInit() {
        if (this.service.shouldFocus(this.config)) {
            this.requiredTabindex = -1;
        }
        super.ngOnInit();
    }
}
EscapeFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: EscapeFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.EscapeFocusService }], target: i0.ɵɵFactoryTarget.Directive });
EscapeFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: EscapeFocusDirective, outputs: { esc: "esc" }, host: { listeners: { "keydown.escape": "handleEscape($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: EscapeFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.EscapeFocusService }]; }, propDecorators: { esc: [{
                type: Output
            }], handleEscape: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlLWZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMvZXNjYXBlL2VzY2FwZS1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLFlBQVksRUFFWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7OztBQUczRTs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sb0JBQ1gsU0FBUSxxQkFBcUI7SUFzQjdCLFlBQ1ksVUFBc0IsRUFDdEIsT0FBMkI7UUFFckMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUhqQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBckI3QixrQkFBYSxHQUFzQixFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUszRCxRQUFHLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQW1CNUMsQ0FBQztJQWpCRDs7O09BR0c7SUFFSCxZQUFZLENBQUMsS0FBb0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVNELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUI7UUFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7aUhBbkNVLG9CQUFvQjtxR0FBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFNBQVM7a0lBVUUsR0FBRztzQkFBWixNQUFNO2dCQU9QLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVzY2FwZUZvY3VzQ29uZmlnIH0gZnJvbSAnLi4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuaW1wb3J0IHsgUGVyc2lzdEZvY3VzRGlyZWN0aXZlIH0gZnJvbSAnLi4vcGVyc2lzdC9wZXJzaXN0LWZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFc2NhcGVGb2N1c1NlcnZpY2UgfSBmcm9tICcuL2VzY2FwZS1mb2N1cy5zZXJ2aWNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gZm9jdXMgdGhlIGhvc3QgZWxlbWVudCB3aGVuZXZlciB0aGUgYGVzY2FwZWAga2V5IGlzIGNhcHR1cmVkLlxuICogVWlFdmVudHMgYnViYmxlIHVwIGJ5IG5hdHVyZSwgd2hpY2ggaXMgd2h5IHRoZSBgY3hFc2NHcm91cGAgY2FuIGJlIHVzZWRcbiAqIG9uIGEgdHJlZSBvZiBlbGVtZW50cy4gRWFjaCB0aW1lIHRoZSBlc2NhcGUga2V5IGlzIHVzZWQsIHRoZSBmb2N1cyB3aWxsXG4gKiBtb3ZlIHVwIGluIHRoZSBET00gdHJlZS5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoKSAvLyBzZWxlY3RvcjogJ1tjeEVzY0ZvY3VzXScsXG5leHBvcnQgY2xhc3MgRXNjYXBlRm9jdXNEaXJlY3RpdmVcbiAgZXh0ZW5kcyBQZXJzaXN0Rm9jdXNEaXJlY3RpdmVcbiAgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgcHJvdGVjdGVkIGRlZmF1bHRDb25maWc6IEVzY2FwZUZvY3VzQ29uZmlnID0geyBmb2N1c09uRXNjYXBlOiB0cnVlIH07XG5cbiAgLy8gQElucHV0KCdjeEVzY0ZvY3VzJylcbiAgcHJvdGVjdGVkIGNvbmZpZzogRXNjYXBlRm9jdXNDb25maWc7XG5cbiAgQE91dHB1dCgpIGVzYyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZXNjYXBlIGtleSBldmVudC5cbiAgICogQHBhcmFtIGV2ZW50IHRoZSBuYXRpdmUga2V5Ym9hcmQgZXZlbnQgd2hpY2ggY29udGFpbnMgdGhlIGVzY2FwZSBrZXlkb3duIGV2ZW50XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUVzY2FwZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlcnZpY2Uuc2hvdWxkRm9jdXModGhpcy5jb25maWcpKSB7XG4gICAgICB0aGlzLnNlcnZpY2UuaGFuZGxlRXNjYXBlKHRoaXMuaG9zdCwgdGhpcy5jb25maWcsIGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5lc2MuZW1pdCh0aGlzLnNlcnZpY2Uuc2hvdWxkRm9jdXModGhpcy5jb25maWcpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBzZXJ2aWNlOiBFc2NhcGVGb2N1c1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc2VydmljZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zZXJ2aWNlLnNob3VsZEZvY3VzKHRoaXMuY29uZmlnKSkge1xuICAgICAgdGhpcy5yZXF1aXJlZFRhYmluZGV4ID0gLTE7XG4gICAgfVxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cbn1cbiJdfQ==