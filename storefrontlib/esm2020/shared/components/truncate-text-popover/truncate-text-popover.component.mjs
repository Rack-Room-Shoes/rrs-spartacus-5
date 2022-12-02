/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../popover/popover.directive";
import * as i3 from "@spartacus/core";
import * as i4 from "./truncate.pipe";
export class TruncateTextPopoverComponent {
    constructor() {
        /**
         * The maximum length of the characters after which the text will be truncated
         */
        this.charactersLimit = 100;
    }
    get isTruncated() {
        return this.content.length > +this.charactersLimit;
    }
}
TruncateTextPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TruncateTextPopoverComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TruncateTextPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: TruncateTextPopoverComponent, selector: "cx-truncate-text-popover", inputs: { content: "content", charactersLimit: "charactersLimit" }, ngImport: i0, template: "<ng-container>\n  <ng-container>\n    <span class=\"truncated-text\">\n      {{ content | cxTruncate: [charactersLimit] }}\n    </span>\n  </ng-container>\n\n  <ng-template #fullText>\n    {{ content }}\n  </ng-template>\n\n  <button\n    *ngIf=\"isTruncated\"\n    [cxPopover]=\"fullText\"\n    [cxPopoverOptions]=\"{\n      placement: 'auto',\n      appendToBody: true,\n      displayCloseButton: true\n    }\"\n    class=\"ml-1 link cx-action-link\"\n  >\n    {{ 'common.more' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i4.TruncatePipe, name: "cxTruncate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TruncateTextPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-truncate-text-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container>\n  <ng-container>\n    <span class=\"truncated-text\">\n      {{ content | cxTruncate: [charactersLimit] }}\n    </span>\n  </ng-container>\n\n  <ng-template #fullText>\n    {{ content }}\n  </ng-template>\n\n  <button\n    *ngIf=\"isTruncated\"\n    [cxPopover]=\"fullText\"\n    [cxPopoverOptions]=\"{\n      placement: 'auto',\n      appendToBody: true,\n      displayCloseButton: true\n    }\"\n    class=\"ml-1 link cx-action-link\"\n  >\n    {{ 'common.more' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], propDecorators: { content: [{
                type: Input
            }], charactersLimit: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUtdGV4dC1wb3BvdmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvdHJ1bmNhdGUtdGV4dC1wb3BvdmVyL3RydW5jYXRlLXRleHQtcG9wb3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3RydW5jYXRlLXRleHQtcG9wb3Zlci90cnVuY2F0ZS10ZXh0LXBvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFPMUUsTUFBTSxPQUFPLDRCQUE0QjtJQUx6QztRQVdFOztXQUVHO1FBQ00sb0JBQWUsR0FBVyxHQUFHLENBQUM7S0FLeEM7SUFIQyxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNyRCxDQUFDOzt5SEFiVSw0QkFBNEI7NkdBQTVCLDRCQUE0QixvSUNiekMsa2hCQXdCQTsyRkRYYSw0QkFBNEI7a0JBTHhDLFNBQVM7K0JBQ0UsMEJBQTBCLG1CQUVuQix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXRydW5jYXRlLXRleHQtcG9wb3ZlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cnVuY2F0ZS10ZXh0LXBvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVHJ1bmNhdGVUZXh0UG9wb3ZlckNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBTdHJpbmcgdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHBvcG92ZXIgd3JhcHBlciBjb21wb25lbnQuXG4gICAqL1xuICBASW5wdXQoKSBjb250ZW50OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgY2hhcmFjdGVycyBhZnRlciB3aGljaCB0aGUgdGV4dCB3aWxsIGJlIHRydW5jYXRlZFxuICAgKi9cbiAgQElucHV0KCkgY2hhcmFjdGVyc0xpbWl0OiBudW1iZXIgPSAxMDA7XG5cbiAgZ2V0IGlzVHJ1bmNhdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQubGVuZ3RoID4gK3RoaXMuY2hhcmFjdGVyc0xpbWl0O1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyPlxuICA8bmctY29udGFpbmVyPlxuICAgIDxzcGFuIGNsYXNzPVwidHJ1bmNhdGVkLXRleHRcIj5cbiAgICAgIHt7IGNvbnRlbnQgfCBjeFRydW5jYXRlOiBbY2hhcmFjdGVyc0xpbWl0XSB9fVxuICAgIDwvc3Bhbj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLXRlbXBsYXRlICNmdWxsVGV4dD5cbiAgICB7eyBjb250ZW50IH19XG4gIDwvbmctdGVtcGxhdGU+XG5cbiAgPGJ1dHRvblxuICAgICpuZ0lmPVwiaXNUcnVuY2F0ZWRcIlxuICAgIFtjeFBvcG92ZXJdPVwiZnVsbFRleHRcIlxuICAgIFtjeFBvcG92ZXJPcHRpb25zXT1cIntcbiAgICAgIHBsYWNlbWVudDogJ2F1dG8nLFxuICAgICAgYXBwZW5kVG9Cb2R5OiB0cnVlLFxuICAgICAgZGlzcGxheUNsb3NlQnV0dG9uOiB0cnVlXG4gICAgfVwiXG4gICAgY2xhc3M9XCJtbC0xIGxpbmsgY3gtYWN0aW9uLWxpbmtcIlxuICA+XG4gICAge3sgJ2NvbW1vbi5tb3JlJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYnV0dG9uPlxuPC9uZy1jb250YWluZXI+XG4iXX0=