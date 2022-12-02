/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../facade/global-message.service";
export class HttpErrorHandler {
    constructor(globalMessageService, platformId) {
        this.globalMessageService = globalMessageService;
        this.platformId = platformId;
    }
    /**
     * Error handlers are matched by the error `responseStatus` (i.e. 404). On top of the matching status
     * a priority can be added to distinguish multiple handles for the same response status.
     */
    hasMatch(errorResponse) {
        return errorResponse.status === this.responseStatus;
    }
    /**
     * Returns true when invoked on the server (SSR).
     *
     * Added in 3.2, depends on the injected `platformId`.
     */
    isSsr() {
        if (this.platformId) {
            return !isPlatformBrowser(this.platformId);
        }
        return false;
    }
}
HttpErrorHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: HttpErrorHandler, deps: [{ token: i1.GlobalMessageService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
HttpErrorHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: HttpErrorHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: HttpErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvZ2xvYmFsLW1lc3NhZ2UvaHR0cC1pbnRlcmNlcHRvcnMvaGFuZGxlcnMvaHR0cC1lcnJvci5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU9oRSxNQUFNLE9BQWdCLGdCQUFnQjtJQUNwQyxZQUNZLG9CQUEwQyxFQUNyQixVQUFtQjtRQUR4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ3JCLGVBQVUsR0FBVixVQUFVLENBQVM7SUFDakQsQ0FBQztJQW1CSjs7O09BR0c7SUFDSCxRQUFRLENBQUMsYUFBZ0M7UUFDdkMsT0FBTyxhQUFhLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdEQsQ0FBQztJQUlEOzs7O09BSUc7SUFDTyxLQUFLO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OzZHQTNDbUIsZ0JBQWdCLHNEQUcxQixXQUFXO2lIQUhELGdCQUFnQixjQUZ4QixNQUFNOzJGQUVFLGdCQUFnQjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQUlJLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwcGxpY2FibGUsIFByaW9yaXR5IH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9hcHBsaWNhYmxlJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZmFjYWRlL2dsb2JhbC1tZXNzYWdlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHR0cEVycm9ySGFuZGxlciBpbXBsZW1lbnRzIEFwcGxpY2FibGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkPzogT2JqZWN0XG4gICkge31cblxuICAvKipcbiAgICogVGhlIGh0dHAgcmVzcG9uc2Ugc3RhdHVzIG51bWJlciB3aGljaCBpcyBoYW5kbGVkIGJ5IHRoaXMgaGFuZGxlci5cbiAgICogSW1wbGVtZW50YXRpb25zIGNhbiBzZXQgdGhlIHJlc3BvbnNlIHN0YXR1cyBudW1iZXIsIGkuZS4gNDA0LCBzbyB0aGF0XG4gICAqIHRoZSBoYW5kbGVyIGNhbiBiZSBmb3VuZCBieSB0aGUgZXJyb3IgaW50ZXJjZXB0b3IuXG4gICAqL1xuICByZXNwb25zZVN0YXR1cz86IG51bWJlcjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZXJyb3IgcmVzcG9uc2UgZm9yIHRoZSByZXNwb25zZSBzdGF0dXMgdGhhdCBpcyByZWdpc3RlciBmb3IgdGhlIGhhbmRsZXJcbiAgICogQHBhcmFtIHsgSHR0cFJlcXVlc3Q8YW55PiB9IHJlcXVlc3QgOiBodHRwIHJlcXVlc3RcbiAgICogQHBhcmFtIHsgSHR0cEVycm9yUmVzcG9uc2UgfSBlcnJvclJlc3BvbnNlIDogSHR0cCBlcnJvciByZXNwb25zZVxuICAgKi9cbiAgYWJzdHJhY3QgaGFuZGxlRXJyb3IoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZVxuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFcnJvciBoYW5kbGVycyBhcmUgbWF0Y2hlZCBieSB0aGUgZXJyb3IgYHJlc3BvbnNlU3RhdHVzYCAoaS5lLiA0MDQpLiBPbiB0b3Agb2YgdGhlIG1hdGNoaW5nIHN0YXR1c1xuICAgKiBhIHByaW9yaXR5IGNhbiBiZSBhZGRlZCB0byBkaXN0aW5ndWlzaCBtdWx0aXBsZSBoYW5kbGVzIGZvciB0aGUgc2FtZSByZXNwb25zZSBzdGF0dXMuXG4gICAqL1xuICBoYXNNYXRjaChlcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlcnJvclJlc3BvbnNlLnN0YXR1cyA9PT0gdGhpcy5yZXNwb25zZVN0YXR1cztcbiAgfVxuXG4gIGFic3RyYWN0IGdldFByaW9yaXR5PygpOiBQcmlvcml0eTtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gaW52b2tlZCBvbiB0aGUgc2VydmVyIChTU1IpLlxuICAgKlxuICAgKiBBZGRlZCBpbiAzLjIsIGRlcGVuZHMgb24gdGhlIGluamVjdGVkIGBwbGF0Zm9ybUlkYC5cbiAgICovXG4gIHByb3RlY3RlZCBpc1NzcigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybUlkKSB7XG4gICAgICByZXR1cm4gIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19