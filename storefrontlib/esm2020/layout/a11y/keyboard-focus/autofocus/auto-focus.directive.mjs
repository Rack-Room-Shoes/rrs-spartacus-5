/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, } from '@angular/core';
import { EscapeFocusDirective } from '../escape/escape-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./auto-focus.service";
/**
 * Directive that focus the first nested _focusable_ element based on state and configuration:
 *
 * 1. focusable element that was left in a focused state (aka _persisted_ focus)
 * 2. focusable element selected by configured CSS selector (i.e. 'button[type=submit]')
 * 3. focusable element marked with the native HTML5 `autofocus` attribute
 * 4. first focusable element
 * 5. the host element, in case the configured CSS selector is `:host`.
 *
 * Example configurations:
 *
 * `<div cxAutoFocus>[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: false}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: 'button.active'}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: ':host'}">[...]</div>`
 *
 * When your element is added dynamically (ie. by using an *ngIf or after a DOM change), the
 * focus can be refreshed by using the refreshFocus configuration.
 */
export class AutoFocusDirective extends EscapeFocusDirective {
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        /** The AutoFocusDirective will be using autofocus by default  */
        this.defaultConfig = { autofocus: true };
    }
    /**
     * Focus the element explicitly if it was focussed before.
     */
    ngAfterViewInit() {
        if (this.shouldAutofocus) {
            this.handleFocus();
        }
        if (!this.shouldAutofocus || this.hasPersistedFocus) {
            super.ngAfterViewInit();
        }
    }
    ngOnChanges(changes) {
        // responsible for refresh focus based on the configured refresh property name
        if (!!changes.config.currentValue?.refreshFocus) {
            // ensure the autofocus when it's to provided initially
            if (!this.config.autofocus) {
                this.config.autofocus = true;
            }
            this.handleFocus();
        }
        super.ngOnChanges(changes);
    }
    /**
     * Mimic the focus without setting the actual focus on the host. The first
     * focusable child element will be focussed.
     */
    handleFocus(event) {
        if (this.shouldAutofocus) {
            if (!event?.target || event.target === this.host) {
                this.firstFocusable?.focus();
            }
            else {
                event.target.focus();
            }
        }
        super.handleFocus(event);
    }
    /**
     * Helper function to get the first focusable child element
     */
    get hasPersistedFocus() {
        return this.service.hasPersistedFocus(this.host, this.config);
    }
    /**
     * Helper function to indicate whether we should use autofocus for the
     * child elements.
     */
    get shouldAutofocus() {
        return !!this.config?.autofocus;
    }
    /**
     * Helper function to get the first focusable child element.
     *
     * We keep this private to not pollute the API.
     */
    get firstFocusable() {
        return this.service.findFirstFocusable(this.host, this.config);
    }
}
AutoFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AutoFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.AutoFocusService }], target: i0.ɵɵFactoryTarget.Directive });
AutoFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: AutoFocusDirective, usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AutoFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.AutoFocusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2F1dG9mb2N1cy9hdXRvLWZvY3VzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBSXhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLE9BQU8sa0JBQ1gsU0FBUSxvQkFBb0I7SUFTNUIsWUFDWSxVQUFzQixFQUN0QixPQUF5QjtRQUVuQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSGpCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFSckMsaUVBQWlFO1FBQ3ZELGtCQUFhLEdBQW9CLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO0lBVS9ELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ25ELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsOEVBQThFO1FBQzlFLElBQUksQ0FBQyxDQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBZ0MsRUFBRSxZQUFZLEVBQUU7WUFDcEUsdURBQXVEO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQzlCO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLEtBQXFCO1FBQy9CLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0osS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdkM7U0FDRjtRQUNELEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBYyxpQkFBaUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFjLGVBQWU7UUFDM0IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFZLGNBQWM7UUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OytHQTlFVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXNjYXBlRm9jdXNEaXJlY3RpdmUgfSBmcm9tICcuLi9lc2NhcGUvZXNjYXBlLWZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBdXRvRm9jdXNDb25maWcgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5pbXBvcnQgeyBBdXRvRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9hdXRvLWZvY3VzLnNlcnZpY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGZvY3VzIHRoZSBmaXJzdCBuZXN0ZWQgX2ZvY3VzYWJsZV8gZWxlbWVudCBiYXNlZCBvbiBzdGF0ZSBhbmQgY29uZmlndXJhdGlvbjpcbiAqXG4gKiAxLiBmb2N1c2FibGUgZWxlbWVudCB0aGF0IHdhcyBsZWZ0IGluIGEgZm9jdXNlZCBzdGF0ZSAoYWthIF9wZXJzaXN0ZWRfIGZvY3VzKVxuICogMi4gZm9jdXNhYmxlIGVsZW1lbnQgc2VsZWN0ZWQgYnkgY29uZmlndXJlZCBDU1Mgc2VsZWN0b3IgKGkuZS4gJ2J1dHRvblt0eXBlPXN1Ym1pdF0nKVxuICogMy4gZm9jdXNhYmxlIGVsZW1lbnQgbWFya2VkIHdpdGggdGhlIG5hdGl2ZSBIVE1MNSBgYXV0b2ZvY3VzYCBhdHRyaWJ1dGVcbiAqIDQuIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50XG4gKiA1LiB0aGUgaG9zdCBlbGVtZW50LCBpbiBjYXNlIHRoZSBjb25maWd1cmVkIENTUyBzZWxlY3RvciBpcyBgOmhvc3RgLlxuICpcbiAqIEV4YW1wbGUgY29uZmlndXJhdGlvbnM6XG4gKlxuICogYDxkaXYgY3hBdXRvRm9jdXM+Wy4uLl08L2Rpdj5gXG4gKlxuICogYDxkaXYgW2N4QXV0b0ZvY3VzXT1cInthdXRvZm9jdXM6IGZhbHNlfVwiPlsuLi5dPC9kaXY+YFxuICpcbiAqIGA8ZGl2IFtjeEF1dG9Gb2N1c109XCJ7YXV0b2ZvY3VzOiAnYnV0dG9uLmFjdGl2ZSd9XCI+Wy4uLl08L2Rpdj5gXG4gKlxuICogYDxkaXYgW2N4QXV0b0ZvY3VzXT1cInthdXRvZm9jdXM6ICc6aG9zdCd9XCI+Wy4uLl08L2Rpdj5gXG4gKlxuICogV2hlbiB5b3VyIGVsZW1lbnQgaXMgYWRkZWQgZHluYW1pY2FsbHkgKGllLiBieSB1c2luZyBhbiAqbmdJZiBvciBhZnRlciBhIERPTSBjaGFuZ2UpLCB0aGVcbiAqIGZvY3VzIGNhbiBiZSByZWZyZXNoZWQgYnkgdXNpbmcgdGhlIHJlZnJlc2hGb2N1cyBjb25maWd1cmF0aW9uLlxuICovXG5ARGlyZWN0aXZlKCkgLy8gc2VsZWN0b3I6ICdbY3hBdXRvRm9jdXNdJ1xuZXhwb3J0IGNsYXNzIEF1dG9Gb2N1c0RpcmVjdGl2ZVxuICBleHRlbmRzIEVzY2FwZUZvY3VzRGlyZWN0aXZlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzXG57XG4gIC8qKiBUaGUgQXV0b0ZvY3VzRGlyZWN0aXZlIHdpbGwgYmUgdXNpbmcgYXV0b2ZvY3VzIGJ5IGRlZmF1bHQgICovXG4gIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBBdXRvRm9jdXNDb25maWcgPSB7IGF1dG9mb2N1czogdHJ1ZSB9O1xuXG4gIC8vIEBJbnB1dCgnY3hBdXRvRm9jdXMnKVxuICBwcm90ZWN0ZWQgY29uZmlnOiBBdXRvRm9jdXNDb25maWc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHNlcnZpY2U6IEF1dG9Gb2N1c1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc2VydmljZSk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgdGhlIGVsZW1lbnQgZXhwbGljaXRseSBpZiBpdCB3YXMgZm9jdXNzZWQgYmVmb3JlLlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3VsZEF1dG9mb2N1cykge1xuICAgICAgdGhpcy5oYW5kbGVGb2N1cygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2hvdWxkQXV0b2ZvY3VzIHx8IHRoaXMuaGFzUGVyc2lzdGVkRm9jdXMpIHtcbiAgICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAvLyByZXNwb25zaWJsZSBmb3IgcmVmcmVzaCBmb2N1cyBiYXNlZCBvbiB0aGUgY29uZmlndXJlZCByZWZyZXNoIHByb3BlcnR5IG5hbWVcbiAgICBpZiAoISEoY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlIGFzIEF1dG9Gb2N1c0NvbmZpZyk/LnJlZnJlc2hGb2N1cykge1xuICAgICAgLy8gZW5zdXJlIHRoZSBhdXRvZm9jdXMgd2hlbiBpdCdzIHRvIHByb3ZpZGVkIGluaXRpYWxseVxuICAgICAgaWYgKCF0aGlzLmNvbmZpZy5hdXRvZm9jdXMpIHtcbiAgICAgICAgdGhpcy5jb25maWcuYXV0b2ZvY3VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaGFuZGxlRm9jdXMoKTtcbiAgICB9XG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gIH1cblxuICAvKipcbiAgICogTWltaWMgdGhlIGZvY3VzIHdpdGhvdXQgc2V0dGluZyB0aGUgYWN0dWFsIGZvY3VzIG9uIHRoZSBob3N0LiBUaGUgZmlyc3RcbiAgICogZm9jdXNhYmxlIGNoaWxkIGVsZW1lbnQgd2lsbCBiZSBmb2N1c3NlZC5cbiAgICovXG4gIGhhbmRsZUZvY3VzKGV2ZW50PzogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLnNob3VsZEF1dG9mb2N1cykge1xuICAgICAgaWYgKCFldmVudD8udGFyZ2V0IHx8IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5ob3N0KSB7XG4gICAgICAgIHRoaXMuZmlyc3RGb2N1c2FibGU/LmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgICBzdXBlci5oYW5kbGVGb2N1cyhldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgZmlyc3QgZm9jdXNhYmxlIGNoaWxkIGVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBnZXQgaGFzUGVyc2lzdGVkRm9jdXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5oYXNQZXJzaXN0ZWRGb2N1cyh0aGlzLmhvc3QsIHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gaW5kaWNhdGUgd2hldGhlciB3ZSBzaG91bGQgdXNlIGF1dG9mb2N1cyBmb3IgdGhlXG4gICAqIGNoaWxkIGVsZW1lbnRzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldCBzaG91bGRBdXRvZm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jb25maWc/LmF1dG9mb2N1cztcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHRoZSBmaXJzdCBmb2N1c2FibGUgY2hpbGQgZWxlbWVudC5cbiAgICpcbiAgICogV2Uga2VlcCB0aGlzIHByaXZhdGUgdG8gbm90IHBvbGx1dGUgdGhlIEFQSS5cbiAgICovXG4gIHByaXZhdGUgZ2V0IGZpcnN0Rm9jdXNhYmxlKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kRmlyc3RGb2N1c2FibGUodGhpcy5ob3N0LCB0aGlzLmNvbmZpZyk7XG4gIH1cbn1cbiJdfQ==