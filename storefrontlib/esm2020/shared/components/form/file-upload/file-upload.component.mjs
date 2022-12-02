/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
/**
 * Component that adds a file upload control.
 */
export class FileUploadComponent {
    constructor() {
        /**
         * Allowed file types. It's setting attribute used for OS window for choosing files.
         */
        this.accept = '*';
        /**
         * Allows selecting multiple files.
         */
        this.multiple = false;
        // TODO: remove this event. Now it's used only to trigger some logic in the parent component.
        // Prerequisites (changes in the parent component):
        // - use an async validator that "opens file" using the value of the form control
        // - "open file" on form submit, but not on the form control change
        this.update = new EventEmitter();
        // ControlValueAccessor START
        this.onChangeCallback = () => {
            // Intentional empty arrow function
        };
        this.onTouchedCallback = () => {
            // Intentional empty arrow function
        };
    }
    selectFile($event) {
        const files = $event.target?.files;
        this.onChangeCallback(files);
        this.update.emit(files);
    }
    get selectedFiles() {
        if (this.fileInput.nativeElement.files) {
            return Array.from(this.fileInput.nativeElement.files);
        }
        return undefined;
    }
    registerOnChange(callback) {
        this.onChangeCallback = callback;
    }
    registerOnTouched(callback) {
        this.onTouchedCallback = callback;
    }
    setDisabledState(disabled) {
        this.fileInput.nativeElement.disabled = disabled;
    }
    writeValue(value) {
        if (value instanceof FileList) {
            this.fileInput.nativeElement.files = value;
        }
    }
}
FileUploadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FileUploadComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FileUploadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: FileUploadComponent, selector: "cx-file-upload", inputs: { accept: "accept", multiple: "multiple" }, outputs: { update: "update" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true,
        },
    ], viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true, static: true }], ngImport: i0, template: "<input\n  type=\"file\"\n  aria-hidden=\"true\"\n  [accept]=\"accept\"\n  [multiple]=\"multiple\"\n  (change)=\"selectFile($event)\"\n  #fileInput\n/>\n<button\n  [attr.aria-label]=\"'common.selectFile' | cxTranslate\"\n  class=\"btn btn-action\"\n  type=\"button\"\n  (click)=\"fileInput.click()\"\n>\n  <ng-content></ng-content>\n</button>\n<p *ngFor=\"let file of selectedFiles\">\n  {{ file?.name }}\n</p>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FileUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-file-upload', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => FileUploadComponent),
                            multi: true,
                        },
                    ], template: "<input\n  type=\"file\"\n  aria-hidden=\"true\"\n  [accept]=\"accept\"\n  [multiple]=\"multiple\"\n  (change)=\"selectFile($event)\"\n  #fileInput\n/>\n<button\n  [attr.aria-label]=\"'common.selectFile' | cxTranslate\"\n  class=\"btn btn-action\"\n  type=\"button\"\n  (click)=\"fileInput.click()\"\n>\n  <ng-content></ng-content>\n</button>\n<p *ngFor=\"let file of selectedFiles\">\n  {{ file?.name }}\n</p>\n" }]
        }], propDecorators: { accept: [{
                type: Input
            }], multiple: [{
                type: Input
            }], update: [{
                type: Output
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUV6RTs7R0FFRztBQWNILE1BQU0sT0FBTyxtQkFBbUI7SUFiaEM7UUFjRTs7V0FFRztRQUNNLFdBQU0sR0FBdUIsR0FBRyxDQUFDO1FBQzFDOztXQUVHO1FBQ00sYUFBUSxHQUFhLEtBQUssQ0FBQztRQUVwQyw2RkFBNkY7UUFDN0YsbURBQW1EO1FBQ25ELGlGQUFpRjtRQUNqRixtRUFBbUU7UUFFbkUsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBa0I3Qyw2QkFBNkI7UUFDbkIscUJBQWdCLEdBQWEsR0FBRyxFQUFFO1lBQzFDLG1DQUFtQztRQUNyQyxDQUFDLENBQUM7UUFDUSxzQkFBaUIsR0FBYSxHQUFHLEVBQUU7WUFDM0MsbUNBQW1DO1FBQ3JDLENBQUMsQ0FBQztLQWdCSDtJQW5DQyxVQUFVLENBQUMsTUFBYTtRQUN0QixNQUFNLEtBQUssR0FBSSxNQUFNLENBQUMsTUFBMkIsRUFBRSxLQUFLLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtZQUN0QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBU0QsZ0JBQWdCLENBQUMsUUFBa0I7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsUUFBa0I7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsUUFBaUI7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxLQUFLLFlBQVksUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDNUM7SUFDSCxDQUFDOztnSEFyRFUsbUJBQW1CO29HQUFuQixtQkFBbUIsNEhBVm5CO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDbEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLGdKQzdCSCw2WkFtQkE7MkZEY2EsbUJBQW1CO2tCQWIvQixTQUFTOytCQUNFLGdCQUFnQixhQUVmO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDOzRCQUNsRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFRUSxNQUFNO3NCQUFkLEtBQUs7Z0JBSUcsUUFBUTtzQkFBaEIsS0FBSztnQkFPTixNQUFNO3NCQURMLE1BQU07Z0JBSUcsU0FBUztzQkFEbEIsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgYWRkcyBhIGZpbGUgdXBsb2FkIGNvbnRyb2wuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWZpbGUtdXBsb2FkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGaWxlVXBsb2FkQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIC8vIHdlIGNhbm5vdCB1c2Ugb25QdXNoIGNoYW5nZSBkZXRlY3Rpb24gYXMgdGhlIGZvcm0gc3RhdGUgaXNuJ3QgdXBkYXRlZCB3aXRob3V0IGV4cGxpY2l0XG4gIC8vIGNoYW5nZSBkZXRlY3Rpb24sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDgxNlxufSlcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKipcbiAgICogQWxsb3dlZCBmaWxlIHR5cGVzLiBJdCdzIHNldHRpbmcgYXR0cmlidXRlIHVzZWQgZm9yIE9TIHdpbmRvdyBmb3IgY2hvb3NpbmcgZmlsZXMuXG4gICAqL1xuICBASW5wdXQoKSBhY2NlcHQ/OiBzdHJpbmcgfCBzdHJpbmdbXSA9ICcqJztcbiAgLyoqXG4gICAqIEFsbG93cyBzZWxlY3RpbmcgbXVsdGlwbGUgZmlsZXMuXG4gICAqL1xuICBASW5wdXQoKSBtdWx0aXBsZT86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBUT0RPOiByZW1vdmUgdGhpcyBldmVudC4gTm93IGl0J3MgdXNlZCBvbmx5IHRvIHRyaWdnZXIgc29tZSBsb2dpYyBpbiB0aGUgcGFyZW50IGNvbXBvbmVudC5cbiAgLy8gUHJlcmVxdWlzaXRlcyAoY2hhbmdlcyBpbiB0aGUgcGFyZW50IGNvbXBvbmVudCk6XG4gIC8vIC0gdXNlIGFuIGFzeW5jIHZhbGlkYXRvciB0aGF0IFwib3BlbnMgZmlsZVwiIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sXG4gIC8vIC0gXCJvcGVuIGZpbGVcIiBvbiBmb3JtIHN1Ym1pdCwgYnV0IG5vdCBvbiB0aGUgZm9ybSBjb250cm9sIGNoYW5nZVxuICBAT3V0cHV0KClcbiAgdXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlTGlzdCB8IG51bGw+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZmlsZUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJvdGVjdGVkIGZpbGVJbnB1dDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBzZWxlY3RGaWxlKCRldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBmaWxlcyA9ICgkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5maWxlcztcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soZmlsZXMpO1xuICAgIHRoaXMudXBkYXRlLmVtaXQoZmlsZXMpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkRmlsZXMoKTogRmlsZVtdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcykge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcyk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBTVEFSVFxuICBwcm90ZWN0ZWQgb25DaGFuZ2VDYWxsYmFjazogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgYXJyb3cgZnVuY3Rpb25cbiAgfTtcbiAgcHJvdGVjdGVkIG9uVG91Y2hlZENhbGxiYWNrOiBGdW5jdGlvbiA9ICgpID0+IHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBhcnJvdyBmdW5jdGlvblxuICB9O1xuICByZWdpc3Rlck9uQ2hhbmdlKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgfVxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5maWxlSW5wdXQubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICB9XG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaXN0KSB7XG4gICAgICB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LmZpbGVzID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yIEVORFxufVxuIiwiPGlucHV0XG4gIHR5cGU9XCJmaWxlXCJcbiAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgW2FjY2VwdF09XCJhY2NlcHRcIlxuICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICAoY2hhbmdlKT1cInNlbGVjdEZpbGUoJGV2ZW50KVwiXG4gICNmaWxlSW5wdXRcbi8+XG48YnV0dG9uXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5zZWxlY3RGaWxlJyB8IGN4VHJhbnNsYXRlXCJcbiAgY2xhc3M9XCJidG4gYnRuLWFjdGlvblwiXG4gIHR5cGU9XCJidXR0b25cIlxuICAoY2xpY2spPVwiZmlsZUlucHV0LmNsaWNrKClcIlxuPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2J1dHRvbj5cbjxwICpuZ0Zvcj1cImxldCBmaWxlIG9mIHNlbGVjdGVkRmlsZXNcIj5cbiAge3sgZmlsZT8ubmFtZSB9fVxuPC9wPlxuIl19