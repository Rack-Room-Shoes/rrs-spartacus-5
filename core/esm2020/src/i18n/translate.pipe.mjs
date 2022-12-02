/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isDevMode, Pipe, } from '@angular/core';
import { ObjectComparisonUtils } from '../util/object-comparison-utils';
import * as i0 from "@angular/core";
import * as i1 from "./translation.service";
export class TranslatePipe {
    constructor(service, cd) {
        this.service = service;
        this.cd = cd;
    }
    transform(input, options = {}) {
        if (!input) {
            if (isDevMode()) {
                console.error(`The given input for the cxTranslate pipe (${input}) is invalid and cannot be translated`);
            }
            return '';
        }
        if (input.raw) {
            return input.raw ?? '';
        }
        const key = typeof input === 'string' ? input : input.key;
        if (typeof input !== 'string') {
            options = { ...options, ...input.params };
        }
        this.translate(key, options);
        return this.translatedValue;
    }
    translate(key, options) {
        if (key !== this.lastKey ||
            !ObjectComparisonUtils.shallowEqualObjects(options, this.lastOptions)) {
            this.lastKey = key;
            this.lastOptions = options;
            if (this.sub) {
                this.sub.unsubscribe();
            }
            this.sub = this.service
                .translate(key, options, true)
                .subscribe((val) => this.markForCheck(val));
        }
    }
    markForCheck(value) {
        this.translatedValue = value;
        this.cd.markForCheck();
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TranslatePipe, deps: [{ token: i1.TranslationService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: TranslatePipe, name: "cxTranslate", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxTranslate', pure: false }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL3RyYW5zbGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUVULElBQUksR0FFTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBS3hFLE1BQU0sT0FBTyxhQUFhO0lBTXhCLFlBQ1ksT0FBMkIsRUFDM0IsRUFBcUI7UUFEckIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFDOUIsQ0FBQztJQUVKLFNBQVMsQ0FDUCxLQUE0QixFQUM1QixVQUE4QixFQUFFO1FBRWhDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQ1gsNkNBQTZDLEtBQUssdUNBQXVDLENBQzFGLENBQUM7YUFDSDtZQUNELE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFLLEtBQXNCLENBQUMsR0FBRyxFQUFFO1lBQy9CLE9BQVEsS0FBc0IsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1NBQzFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDMUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxHQUFHLEVBQUUsR0FBRyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFRLEVBQUUsT0FBZTtRQUN6QyxJQUNFLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTztZQUNwQixDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ3JFO1lBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7WUFFM0IsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUNwQixTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7aUJBQzdCLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7MEdBL0RVLGFBQWE7d0dBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIGlzRGV2TW9kZSxcbiAgT25EZXN0cm95LFxuICBQaXBlLFxuICBQaXBlVHJhbnNmb3JtLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JqZWN0Q29tcGFyaXNvblV0aWxzIH0gZnJvbSAnLi4vdXRpbC9vYmplY3QtY29tcGFyaXNvbi11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2xhdGFibGUsIFRyYW5zbGF0YWJsZVBhcmFtcyB9IGZyb20gJy4vdHJhbnNsYXRhYmxlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4vdHJhbnNsYXRpb24uc2VydmljZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2N4VHJhbnNsYXRlJywgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBsYXN0S2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgbGFzdE9wdGlvbnM6IG9iamVjdDtcbiAgcHJpdmF0ZSB0cmFuc2xhdGVkVmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIHRyYW5zZm9ybShcbiAgICBpbnB1dDogVHJhbnNsYXRhYmxlIHwgc3RyaW5nLFxuICAgIG9wdGlvbnM6IFRyYW5zbGF0YWJsZVBhcmFtcyA9IHt9XG4gICk6IHN0cmluZyB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYFRoZSBnaXZlbiBpbnB1dCBmb3IgdGhlIGN4VHJhbnNsYXRlIHBpcGUgKCR7aW5wdXR9KSBpcyBpbnZhbGlkIGFuZCBjYW5ub3QgYmUgdHJhbnNsYXRlZGBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAoKGlucHV0IGFzIFRyYW5zbGF0YWJsZSkucmF3KSB7XG4gICAgICByZXR1cm4gKGlucHV0IGFzIFRyYW5zbGF0YWJsZSkucmF3ID8/ICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyBpbnB1dCA6IGlucHV0LmtleTtcbiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgLi4uaW5wdXQucGFyYW1zIH07XG4gICAgfVxuXG4gICAgdGhpcy50cmFuc2xhdGUoa2V5LCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVkVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHRyYW5zbGF0ZShrZXk6IGFueSwgb3B0aW9uczogb2JqZWN0KSB7XG4gICAgaWYgKFxuICAgICAga2V5ICE9PSB0aGlzLmxhc3RLZXkgfHxcbiAgICAgICFPYmplY3RDb21wYXJpc29uVXRpbHMuc2hhbGxvd0VxdWFsT2JqZWN0cyhvcHRpb25zLCB0aGlzLmxhc3RPcHRpb25zKVxuICAgICkge1xuICAgICAgdGhpcy5sYXN0S2V5ID0ga2V5O1xuICAgICAgdGhpcy5sYXN0T3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdWIgPSB0aGlzLnNlcnZpY2VcbiAgICAgICAgLnRyYW5zbGF0ZShrZXksIG9wdGlvbnMsIHRydWUpXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4gdGhpcy5tYXJrRm9yQ2hlY2sodmFsKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYXJrRm9yQ2hlY2sodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudHJhbnNsYXRlZFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==