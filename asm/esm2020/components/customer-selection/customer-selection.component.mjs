/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Output, ViewChild, } from '@angular/core';
import { Validators, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@spartacus/asm/core";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@spartacus/core";
export class CustomerSelectionComponent {
    constructor(fb, asmService, config) {
        this.fb = fb;
        this.asmService = asmService;
        this.config = config;
        this.subscription = new Subscription();
        this.submitEvent = new EventEmitter();
    }
    ngOnInit() {
        this.customerSelectionForm = this.fb.group({
            searchTerm: ['', Validators.required],
        });
        this.asmService.customerSearchReset();
        this.searchResultsLoading$ =
            this.asmService.getCustomerSearchResultsLoading();
        this.searchResults = this.asmService.getCustomerSearchResults();
        this.subscription.add(this.customerSelectionForm.controls.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((searchTermValue) => {
            this.handleSearchTerm(searchTermValue);
        }));
    }
    handleSearchTerm(searchTermValue) {
        if (!!this.selectedCustomer &&
            searchTermValue !== this.selectedCustomer.name) {
            this.selectedCustomer = undefined;
        }
        if (Boolean(this.selectedCustomer)) {
            return;
        }
        this.asmService.customerSearchReset();
        if (searchTermValue.trim().length >= 3) {
            this.asmService.customerSearch({
                query: searchTermValue,
                pageSize: this.config.asm?.customerSearch?.maxResults,
            });
        }
    }
    selectCustomerFromList(customer) {
        this.selectedCustomer = customer;
        this.customerSelectionForm.controls.searchTerm.setValue(this.selectedCustomer.name);
        this.asmService.customerSearchReset();
    }
    onSubmit() {
        if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
            this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
        }
        else {
            this.customerSelectionForm.markAllAsTouched();
        }
    }
    onDocumentClick(event) {
        if (Boolean(this.resultList)) {
            if (this.resultList.nativeElement.contains(event.target) ||
                this.searchTerm.nativeElement.contains(event.target)) {
                return;
            }
            else {
                this.asmService.customerSearchReset();
            }
        }
    }
    closeResults() {
        this.asmService.customerSearchReset();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.asmService.customerSearchReset();
    }
}
CustomerSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerSelectionComponent, deps: [{ token: i1.UntypedFormBuilder }, { token: i2.AsmService }, { token: i2.AsmConfig }], target: i0.ɵɵFactoryTarget.Component });
CustomerSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: { submitEvent: "submitEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "resultList", first: true, predicate: ["resultList"], descendants: true }, { propertyName: "searchTerm", first: true, predicate: ["searchTerm"], descendants: true }], ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    *ngFor=\"let result of results.entries\"\n    (click)=\"selectCustomerFromList(result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    (click)=\"closeResults()\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <div\n    class=\"spinner\"\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  >\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i4.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerSelectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-selection', host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    *ngFor=\"let result of results.entries\"\n    (click)=\"selectCustomerFromList(result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    (click)=\"closeResults()\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <div\n    class=\"spinner\"\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  >\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UntypedFormBuilder }, { type: i2.AsmService }, { type: i2.AsmConfig }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], resultList: [{
                type: ViewChild,
                args: ['resultList']
            }], searchTerm: [{
                type: ViewChild,
                args: ['searchTerm']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1zZWxlY3Rpb24vY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1zZWxlY3Rpb24vY3VzdG9tZXItc2VsZWN0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFHWixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUd4QixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQVM5QyxNQUFNLE9BQU8sMEJBQTBCO0lBYXJDLFlBQ1ksRUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsTUFBaUI7UUFGakIsT0FBRSxHQUFGLEVBQUUsQ0FBb0I7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBZG5CLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU01QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO0lBU3ZELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ3pDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3RDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENB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QTBCLGlYQ2hDdkMsdTJDQWtEQTsyRkRsQmEsMEJBQTBCO2tCQVB0QyxTQUFTOytCQUNFLHVCQUF1QixRQUUzQjt3QkFDSixrQkFBa0IsRUFBRSx5QkFBeUI7cUJBQzlDOzBKQVVELFdBQVc7c0JBRFYsTUFBTTtnQkFHa0IsVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQUNFLFVBQVU7c0JBQWxDLFNBQVM7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1CdWlsZGVyLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBc21Db25maWcsIEFzbVNlcnZpY2UsIEN1c3RvbWVyU2VhcmNoUGFnZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2NvcmUnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY3VzdG9tZXItc2VsZWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLXNlbGVjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdvbkRvY3VtZW50Q2xpY2soJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyU2VsZWN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjdXN0b21lclNlbGVjdGlvbkZvcm06IFVudHlwZWRGb3JtR3JvdXA7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHNlYXJjaFJlc3VsdHNMb2FkaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgc2VhcmNoUmVzdWx0czogT2JzZXJ2YWJsZTxDdXN0b21lclNlYXJjaFBhZ2U+O1xuICBzZWxlY3RlZEN1c3RvbWVyOiBVc2VyIHwgdW5kZWZpbmVkO1xuXG4gIEBPdXRwdXQoKVxuICBzdWJtaXRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8eyBjdXN0b21lcklkPzogc3RyaW5nIH0+KCk7XG5cbiAgQFZpZXdDaGlsZCgncmVzdWx0TGlzdCcpIHJlc3VsdExpc3Q6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaFRlcm0nKSBzZWFyY2hUZXJtOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBmYjogVW50eXBlZEZvcm1CdWlsZGVyLFxuICAgIHByb3RlY3RlZCBhc21TZXJ2aWNlOiBBc21TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWc6IEFzbUNvbmZpZ1xuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jdXN0b21lclNlbGVjdGlvbkZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIHNlYXJjaFRlcm06IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgfSk7XG4gICAgdGhpcy5hc21TZXJ2aWNlLmN1c3RvbWVyU2VhcmNoUmVzZXQoKTtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHNMb2FkaW5nJCA9XG4gICAgICB0aGlzLmFzbVNlcnZpY2UuZ2V0Q3VzdG9tZXJTZWFyY2hSZXN1bHRzTG9hZGluZygpO1xuICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IHRoaXMuYXNtU2VydmljZS5nZXRDdXN0b21lclNlYXJjaFJlc3VsdHMoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtLmNvbnRyb2xzLnNlYXJjaFRlcm0udmFsdWVDaGFuZ2VzXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgzMDApKVxuICAgICAgICAuc3Vic2NyaWJlKChzZWFyY2hUZXJtVmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlYXJjaFRlcm0oc2VhcmNoVGVybVZhbHVlKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVNlYXJjaFRlcm0oc2VhcmNoVGVybVZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoXG4gICAgICAhIXRoaXMuc2VsZWN0ZWRDdXN0b21lciAmJlxuICAgICAgc2VhcmNoVGVybVZhbHVlICE9PSB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIubmFtZVxuICAgICkge1xuICAgICAgdGhpcy5zZWxlY3RlZEN1c3RvbWVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoQm9vbGVhbih0aGlzLnNlbGVjdGVkQ3VzdG9tZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaFJlc2V0KCk7XG4gICAgaWYgKHNlYXJjaFRlcm1WYWx1ZS50cmltKCkubGVuZ3RoID49IDMpIHtcbiAgICAgIHRoaXMuYXNtU2VydmljZS5jdXN0b21lclNlYXJjaCh7XG4gICAgICAgIHF1ZXJ5OiBzZWFyY2hUZXJtVmFsdWUsXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLmNvbmZpZy5hc20/LmN1c3RvbWVyU2VhcmNoPy5tYXhSZXN1bHRzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Q3VzdG9tZXJGcm9tTGlzdChjdXN0b21lcjogVXNlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRDdXN0b21lciA9IGN1c3RvbWVyO1xuICAgIHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtLmNvbnRyb2xzLnNlYXJjaFRlcm0uc2V0VmFsdWUoXG4gICAgICB0aGlzLnNlbGVjdGVkQ3VzdG9tZXIubmFtZVxuICAgICk7XG4gICAgdGhpcy5hc21TZXJ2aWNlLmN1c3RvbWVyU2VhcmNoUmVzZXQoKTtcbiAgfVxuXG4gIG9uU3VibWl0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1c3RvbWVyU2VsZWN0aW9uRm9ybS52YWxpZCAmJiAhIXRoaXMuc2VsZWN0ZWRDdXN0b21lcikge1xuICAgICAgdGhpcy5zdWJtaXRFdmVudC5lbWl0KHsgY3VzdG9tZXJJZDogdGhpcy5zZWxlY3RlZEN1c3RvbWVyLmN1c3RvbWVySWQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VzdG9tZXJTZWxlY3Rpb25Gb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICB9XG4gIH1cblxuICBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKEJvb2xlYW4odGhpcy5yZXN1bHRMaXN0KSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnJlc3VsdExpc3QubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8XG4gICAgICAgIHRoaXMuc2VhcmNoVGVybS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldClcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsb3NlUmVzdWx0cygpIHtcbiAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmFzbVNlcnZpY2UuY3VzdG9tZXJTZWFyY2hSZXNldCgpO1xuICB9XG59XG4iLCI8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiIFtmb3JtR3JvdXBdPVwiY3VzdG9tZXJTZWxlY3Rpb25Gb3JtXCI+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXRcbiAgICAgIHJlcXVpcmVkPVwidHJ1ZVwiXG4gICAgICAjc2VhcmNoVGVybVxuICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgZm9ybUNvbnRyb2xOYW1lPVwic2VhcmNoVGVybVwiXG4gICAgICBwbGFjZWhvbGRlcj1cInt7ICdhc20uY3VzdG9tZXJTZWFyY2guc2VhcmNoVGVybS5sYWJlbCcgfCBjeFRyYW5zbGF0ZSB9fVwiXG4gICAgLz5cbiAgICA8Y3gtZm9ybS1lcnJvcnNcbiAgICAgIFtjb250cm9sXT1cImN1c3RvbWVyU2VsZWN0aW9uRm9ybS5nZXQoJ3NlYXJjaFRlcm0nKVwiXG4gICAgPjwvY3gtZm9ybS1lcnJvcnM+XG4gIDwvbGFiZWw+XG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgIHt7ICdhc20uY3VzdG9tZXJTZWFyY2guc3VibWl0JyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuXG48ZGl2ICpuZ0lmPVwic2VhcmNoUmVzdWx0cyB8IGFzeW5jIGFzIHJlc3VsdHNcIiBjbGFzcz1cImFzbS1yZXN1bHRzXCIgI3Jlc3VsdExpc3Q+XG4gIDxidXR0b25cbiAgICAqbmdGb3I9XCJsZXQgcmVzdWx0IG9mIHJlc3VsdHMuZW50cmllc1wiXG4gICAgKGNsaWNrKT1cInNlbGVjdEN1c3RvbWVyRnJvbUxpc3QocmVzdWx0KVwiXG4gID5cbiAgICA8c3BhbiBjbGFzcz1cInJlc3VsdC1uYW1lXCI+e3sgcmVzdWx0Lm5hbWUgfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJyZXN1bHQtaWRcIj57eyByZXN1bHQudWlkIH19PC9zcGFuPlxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvblxuICAgIChjbGljayk9XCJjbG9zZVJlc3VsdHMoKVwiXG4gICAgKm5nSWY9XCJcbiAgICAgICEoc2VhcmNoUmVzdWx0c0xvYWRpbmckIHwgYXN5bmMpICYmXG4gICAgICBzZWFyY2hUZXJtLnZhbHVlLmxlbmd0aCA+PSAzICYmXG4gICAgICAhIXJlc3VsdHMuZW50cmllcyAmJlxuICAgICAgcmVzdWx0cy5lbnRyaWVzLmxlbmd0aCA8PSAwXG4gICAgXCJcbiAgPlxuICAgIHt7ICdhc20uY3VzdG9tZXJTZWFyY2gubm9NYXRjaCcgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiYXNtLXJlc3VsdHNcIiAqbmdJZj1cInNlYXJjaFJlc3VsdHNMb2FkaW5nJCB8IGFzeW5jXCI+XG4gIDxkaXZcbiAgICBjbGFzcz1cInNwaW5uZXJcIlxuICAgIGFyaWEtaGlkZGVuPVwiZmFsc2VcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5sb2FkaW5nJyB8IGN4VHJhbnNsYXRlXCJcbiAgPlxuICAgIDxkaXY+PC9kaXY+XG4gICAgPGRpdj48L2Rpdj5cbiAgICA8ZGl2PjwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19