/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../item.service";
import * as i2 from "../message/services/message.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/router";
import * as i6 from "../card/card.component";
import * as i7 from "../item-active.directive";
import * as i8 from "@spartacus/storefront";
import * as i9 from "@spartacus/core";
const DISABLED_STATUS = 'DISABLED';
/**
 * Reusable component for creating and editing organization items. The component does not
 * know anything about form specific.
 */
export class FormComponent {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
        this.animateBack = true;
        this.form$ = this.itemService.current$.pipe(map((item) => {
            this.setI18nRoot(item);
            if (!item) {
                // we trick the form builder...
                item = {};
            }
            return this.itemService.getForm(item);
        }));
        /**
         * To handle the case of receiving a negative response during creation an item
         */
        this.disabled$ = this.form$.pipe(switchMap((form) => form?.statusChanges ?? of()), map((status) => status === DISABLED_STATUS));
    }
    save(form) {
        this.itemService.key$
            .pipe(first(), switchMap((key) => this.itemService.save(form, key).pipe(take(1), map((data) => ({
            item: data.item,
            status: data.status,
            action: key ? 'update' : 'create',
        })))))
            .subscribe(({ item, action, status }) => {
            if (status === LoadStatus.SUCCESS) {
                this.itemService.launchDetails(item);
                this.notify(item, action);
            }
            form.enable();
        });
    }
    notify(item, action) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.${action}`,
                params: {
                    item,
                },
            },
        });
    }
    setI18nRoot(item) {
        // concatenate the i18n root with .edit or .create suffix
        this.i18n = this.i18nRoot + (item ? '.edit' : '.create');
    }
    back(event, card) {
        if (this.animateBack) {
            card.closeView(event);
        }
    }
    ngOnInit() {
        this.itemService.setEditMode(true);
    }
    ngOnDestroy() {
        this.itemService.setEditMode(false);
    }
}
FormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FormComponent, deps: [{ token: i1.ItemService }, { token: i2.MessageService }], target: i0.ɵɵFactoryTarget.Component });
FormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: FormComponent, selector: "cx-org-form", inputs: { i18nRoot: "i18nRoot", animateBack: "animateBack", subtitle: "subtitle" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    [i18nRoot]=\"i18n\"\n    cxOrgItemActive\n    [subtitle]=\"subtitle\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button\n      actions\n      class=\"button primary\"\n      [disabled]=\"form.disabled || (disabled$ | async)\"\n    >\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      <!--\n        We leverage the soft-close feature from the split view, so that the animation\n        has time to kick in before the router outlet is deleted.\n       -->\n      <span (click)=\"back($event, card)\">{{\n        'organization.cancel' | cxTranslate\n      }}</span>\n    </button>\n\n    <section main class=\"details\">\n      <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n    </section>\n  </cx-org-card>\n</form>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i4.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i6.CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i7.ItemActiveDirective, selector: "[cxOrgItemActive]" }, { kind: "directive", type: i8.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i9.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    [i18nRoot]=\"i18n\"\n    cxOrgItemActive\n    [subtitle]=\"subtitle\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button\n      actions\n      class=\"button primary\"\n      [disabled]=\"form.disabled || (disabled$ | async)\"\n    >\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      <!--\n        We leverage the soft-close feature from the split view, so that the animation\n        has time to kick in before the router outlet is deleted.\n       -->\n      <span (click)=\"back($event, card)\">{{\n        'organization.cancel' | cxTranslate\n      }}</span>\n    </button>\n\n    <section main class=\"details\">\n      <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n    </section>\n  </cx-org-card>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ItemService }, { type: i2.MessageService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], animateBack: [{
                type: Input
            }], subtitle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2Zvcm0vZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFLN0QsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBRW5DOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxhQUFhO0lBbUN4QixZQUNZLFdBQTJCLEVBQzNCLGNBQThCO1FBRDlCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUE5QmpDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBUTVCLFVBQUssR0FBd0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN6RSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCwrQkFBK0I7Z0JBQy9CLElB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QUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExvYWRTdGF0dXMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FyZC9jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uL21lc3NhZ2Uvc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcblxuY29uc3QgRElTQUJMRURfU1RBVFVTID0gJ0RJU0FCTEVEJztcblxuLyoqXG4gKiBSZXVzYWJsZSBjb21wb25lbnQgZm9yIGNyZWF0aW5nIGFuZCBlZGl0aW5nIG9yZ2FuaXphdGlvbiBpdGVtcy4gVGhlIGNvbXBvbmVudCBkb2VzIG5vdFxuICoga25vdyBhbnl0aGluZyBhYm91dCBmb3JtIHNwZWNpZmljLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctZm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsgY2xhc3M6ICdjb250ZW50LXdyYXBwZXInIH0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBpMThuIHJvb3QgZm9yIGFsbCBsb2NhbGl6YXRpb25zLiBUaGUgaTE4biByb290IGtleSBpcyBzdWZmaXhlZCB3aXRoXG4gICAqIGVpdGhlciBgLmVkaXRgIG9yIGAuY3JlYXRlYCwgZGVwZW5kaW5nIG9uIHRoZSB1c2FnZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgQElucHV0KCkgaTE4blJvb3Q6IHN0cmluZztcblxuICBASW5wdXQoKSBhbmltYXRlQmFjayA9IHRydWU7XG4gIEBJbnB1dCgpIHN1YnRpdGxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBpMThuIGtleSBmb3IgdGhlIGxvY2FsaXphdGlvbnMuXG4gICAqL1xuICBpMThuOiBzdHJpbmc7XG5cbiAgZm9ybSQ6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+ID0gdGhpcy5pdGVtU2VydmljZS5jdXJyZW50JC5waXBlKFxuICAgIG1hcCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5zZXRJMThuUm9vdChpdGVtKTtcblxuICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgIC8vIHdlIHRyaWNrIHRoZSBmb3JtIGJ1aWxkZXIuLi5cbiAgICAgICAgaXRlbSA9IHt9IGFzIGFueTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLml0ZW1TZXJ2aWNlLmdldEZvcm0oaXRlbSk7XG4gICAgfSlcbiAgKTtcblxuICAvKipcbiAgICogVG8gaGFuZGxlIHRoZSBjYXNlIG9mIHJlY2VpdmluZyBhIG5lZ2F0aXZlIHJlc3BvbnNlIGR1cmluZyBjcmVhdGlvbiBhbiBpdGVtXG4gICAqL1xuICBkaXNhYmxlZCQgPSB0aGlzLmZvcm0kLnBpcGUoXG4gICAgc3dpdGNoTWFwKChmb3JtKSA9PiBmb3JtPy5zdGF0dXNDaGFuZ2VzID8/IG9mKCkpLFxuICAgIG1hcCgoc3RhdHVzKSA9PiBzdGF0dXMgPT09IERJU0FCTEVEX1NUQVRVUylcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlPFQ+LFxuICAgIHByb3RlY3RlZCBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIHNhdmUoZm9ybTogVW50eXBlZEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbVNlcnZpY2Uua2V5JFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpcnN0KCksXG4gICAgICAgIHN3aXRjaE1hcCgoa2V5KSA9PlxuICAgICAgICAgIHRoaXMuaXRlbVNlcnZpY2Uuc2F2ZShmb3JtLCBrZXkpLnBpcGUoXG4gICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgbWFwKChkYXRhKSA9PiAoe1xuICAgICAgICAgICAgICBpdGVtOiBkYXRhLml0ZW0sXG4gICAgICAgICAgICAgIHN0YXR1czogZGF0YS5zdGF0dXMsXG4gICAgICAgICAgICAgIGFjdGlvbjoga2V5ID8gJ3VwZGF0ZScgOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBpdGVtLCBhY3Rpb24sIHN0YXR1cyB9KSA9PiB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IExvYWRTdGF0dXMuU1VDQ0VTUykge1xuICAgICAgICAgIHRoaXMuaXRlbVNlcnZpY2UubGF1bmNoRGV0YWlscyhpdGVtKTtcbiAgICAgICAgICB0aGlzLm5vdGlmeShpdGVtLCBhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZvcm0uZW5hYmxlKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBub3RpZnkoaXRlbTogVCB8IHVuZGVmaW5lZCwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7XG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgIGtleTogYCR7dGhpcy5pMThuUm9vdH0ubWVzc2FnZXMuJHthY3Rpb259YCxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgaXRlbSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0STE4blJvb3QoaXRlbT86IFQpOiB2b2lkIHtcbiAgICAvLyBjb25jYXRlbmF0ZSB0aGUgaTE4biByb290IHdpdGggLmVkaXQgb3IgLmNyZWF0ZSBzdWZmaXhcbiAgICB0aGlzLmkxOG4gPSB0aGlzLmkxOG5Sb290ICsgKGl0ZW0gPyAnLmVkaXQnIDogJy5jcmVhdGUnKTtcbiAgfVxuXG4gIGJhY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGNhcmQ6IENhcmRDb21wb25lbnQ8YW55Pikge1xuICAgIGlmICh0aGlzLmFuaW1hdGVCYWNrKSB7XG4gICAgICBjYXJkLmNsb3NlVmlldyhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pdGVtU2VydmljZS5zZXRFZGl0TW9kZSh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaXRlbVNlcnZpY2Uuc2V0RWRpdE1vZGUoZmFsc2UpO1xuICB9XG59XG4iLCI8Zm9ybSAqbmdJZj1cImZvcm0kIHwgYXN5bmMgYXMgZm9ybVwiIChzdWJtaXQpPVwic2F2ZShmb3JtKVwiPlxuICA8Y3gtb3JnLWNhcmRcbiAgICAjY2FyZFxuICAgIFtwcmV2aW91c109XCJmYWxzZVwiXG4gICAgW2kxOG5Sb290XT1cImkxOG5cIlxuICAgIGN4T3JnSXRlbUFjdGl2ZVxuICAgIFtzdWJ0aXRsZV09XCJzdWJ0aXRsZVwiXG4gICAgW2N4Rm9jdXNdPVwieyBhdXRvZm9jdXM6ICdpbnB1dCcsIHJlZnJlc2hGb2N1czogZm9ybSB9XCJcbiAgPlxuICAgIDxidXR0b25cbiAgICAgIGFjdGlvbnNcbiAgICAgIGNsYXNzPVwiYnV0dG9uIHByaW1hcnlcIlxuICAgICAgW2Rpc2FibGVkXT1cImZvcm0uZGlzYWJsZWQgfHwgKGRpc2FibGVkJCB8IGFzeW5jKVwiXG4gICAgPlxuICAgICAge3sgJ29yZ2FuaXphdGlvbi5zYXZlJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiBhY3Rpb25zIGNsYXNzPVwibGlua1wiIHJvdXRlckxpbms9XCIuLi9cIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICA8IS0tXG4gICAgICAgIFdlIGxldmVyYWdlIHRoZSBzb2Z0LWNsb3NlIGZlYXR1cmUgZnJvbSB0aGUgc3BsaXQgdmlldywgc28gdGhhdCB0aGUgYW5pbWF0aW9uXG4gICAgICAgIGhhcyB0aW1lIHRvIGtpY2sgaW4gYmVmb3JlIHRoZSByb3V0ZXIgb3V0bGV0IGlzIGRlbGV0ZWQuXG4gICAgICAgLS0+XG4gICAgICA8c3BhbiAoY2xpY2spPVwiYmFjaygkZXZlbnQsIGNhcmQpXCI+e3tcbiAgICAgICAgJ29yZ2FuaXphdGlvbi5jYW5jZWwnIHwgY3hUcmFuc2xhdGVcbiAgICAgIH19PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPHNlY3Rpb24gbWFpbiBjbGFzcz1cImRldGFpbHNcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlttYWluXVwiIG5nUHJvamVjdEFzPVwiW21haW5dXCI+PC9uZy1jb250ZW50PlxuICAgIDwvc2VjdGlvbj5cbiAgPC9jeC1vcmctY2FyZD5cbjwvZm9ybT5cbiJdfQ==