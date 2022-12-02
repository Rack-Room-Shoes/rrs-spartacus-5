/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ANONYMOUS_CONSENT_STATUS, } from '@spartacus/core';
import * as i0 from "@angular/core";
export class ConsentManagementFormComponent {
    constructor() {
        this.consentGiven = false;
        this.requiredConsents = [];
        this.consentChanged = new EventEmitter();
        // Intentional empty constructor
    }
    ngOnInit() {
        if (this.consent) {
            this.consentGiven = Boolean(this.consent.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN);
        }
        else {
            if (this.consentTemplate && this.consentTemplate.currentConsent) {
                if (this.consentTemplate.currentConsent.consentWithdrawnDate) {
                    this.consentGiven = false;
                }
                else if (this.consentTemplate.currentConsent.consentGivenDate) {
                    this.consentGiven = true;
                }
            }
        }
    }
    onConsentChange() {
        this.consentGiven = !this.consentGiven;
        this.consentChanged.emit({
            given: this.consentGiven,
            template: this.consentTemplate,
        });
    }
    isRequired(templateId) {
        return templateId ? this.requiredConsents.includes(templateId) : false;
    }
}
ConsentManagementFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentManagementFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConsentManagementFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConsentManagementFormComponent, selector: "cx-consent-management-form", inputs: { consentTemplate: "consentTemplate", requiredConsents: "requiredConsents", consent: "consent" }, outputs: { consentChanged: "consentChanged" }, ngImport: i0, template: "<div class=\"form-check\">\n  <label>\n    <input\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      (change)=\"onConsentChange()\"\n      [checked]=\"consentGiven\"\n      [disabled]=\"isRequired(consentTemplate?.id)\"\n    />\n    <span class=\"form-check-label cx-be-bold\">\n      {{ consentTemplate?.name }}\n    </span>\n    <br />\n    <span class=\"form-check-label\">\n      {{ consentTemplate?.description }}\n    </span>\n  </label>\n</div>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsentManagementFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-consent-management-form', template: "<div class=\"form-check\">\n  <label>\n    <input\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      (change)=\"onConsentChange()\"\n      [checked]=\"consentGiven\"\n      [disabled]=\"isRequired(consentTemplate?.id)\"\n    />\n    <span class=\"form-check-label cx-be-bold\">\n      {{ consentTemplate?.name }}\n    </span>\n    <br />\n    <span class=\"form-check-label\">\n      {{ consentTemplate?.description }}\n    </span>\n  </label>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { consentTemplate: [{
                type: Input
            }], requiredConsents: [{
                type: Input
            }], consent: [{
                type: Input
            }], consentChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2VudC1tYW5hZ2VtZW50LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9teWFjY291bnQvY29uc2VudC1tYW5hZ2VtZW50L2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtbWFuYWdlbWVudC1mb3JtLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbXlhY2NvdW50L2NvbnNlbnQtbWFuYWdlbWVudC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LW1hbmFnZW1lbnQtZm9ybS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBRUwsd0JBQXdCLEdBRXpCLE1BQU0saUJBQWlCLENBQUM7O0FBTXpCLE1BQU0sT0FBTyw4QkFBOEI7SUFrQnpDO1FBakJBLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBTXJCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQU1oQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUc3QixDQUFDO1FBR0gsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyx3QkFBd0IsQ0FBQyxLQUFLLENBQzdELENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFO2dCQUMvRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFO29CQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztpQkFDM0I7cUJBQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQzFCO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZTtTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQThCO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekUsQ0FBQzs7MkhBakRVLDhCQUE4QjsrR0FBOUIsOEJBQThCLDJOQ2pCM0Msc2RBa0JBOzJGRERhLDhCQUE4QjtrQkFKMUMsU0FBUzsrQkFDRSw0QkFBNEI7MEVBT3RDLGVBQWU7c0JBRGQsS0FBSztnQkFJTixnQkFBZ0I7c0JBRGYsS0FBSztnQkFJTixPQUFPO3NCQUROLEtBQUs7Z0JBSU4sY0FBYztzQkFEYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQW5vbnltb3VzQ29uc2VudCxcbiAgQU5PTllNT1VTX0NPTlNFTlRfU1RBVFVTLFxuICBDb25zZW50VGVtcGxhdGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbnNlbnQtbWFuYWdlbWVudC1mb3JtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnNlbnQtbWFuYWdlbWVudC1mb3JtLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uc2VudE1hbmFnZW1lbnRGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc2VudEdpdmVuID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgY29uc2VudFRlbXBsYXRlOiBDb25zZW50VGVtcGxhdGU7XG5cbiAgQElucHV0KClcbiAgcmVxdWlyZWRDb25zZW50czogc3RyaW5nW10gPSBbXTtcblxuICBASW5wdXQoKVxuICBjb25zZW50OiBBbm9ueW1vdXNDb25zZW50IHwgbnVsbDtcblxuICBAT3V0cHV0KClcbiAgY29uc2VudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBnaXZlbjogYm9vbGVhbjtcbiAgICB0ZW1wbGF0ZTogQ29uc2VudFRlbXBsYXRlO1xuICB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25zZW50KSB7XG4gICAgICB0aGlzLmNvbnNlbnRHaXZlbiA9IEJvb2xlYW4oXG4gICAgICAgIHRoaXMuY29uc2VudC5jb25zZW50U3RhdGUgPT09IEFOT05ZTU9VU19DT05TRU5UX1NUQVRVUy5HSVZFTlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29uc2VudFRlbXBsYXRlICYmIHRoaXMuY29uc2VudFRlbXBsYXRlLmN1cnJlbnRDb25zZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnNlbnRUZW1wbGF0ZS5jdXJyZW50Q29uc2VudC5jb25zZW50V2l0aGRyYXduRGF0ZSkge1xuICAgICAgICAgIHRoaXMuY29uc2VudEdpdmVuID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25zZW50VGVtcGxhdGUuY3VycmVudENvbnNlbnQuY29uc2VudEdpdmVuRGF0ZSkge1xuICAgICAgICAgIHRoaXMuY29uc2VudEdpdmVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQ29uc2VudENoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNlbnRHaXZlbiA9ICF0aGlzLmNvbnNlbnRHaXZlbjtcblxuICAgIHRoaXMuY29uc2VudENoYW5nZWQuZW1pdCh7XG4gICAgICBnaXZlbjogdGhpcy5jb25zZW50R2l2ZW4sXG4gICAgICB0ZW1wbGF0ZTogdGhpcy5jb25zZW50VGVtcGxhdGUsXG4gICAgfSk7XG4gIH1cblxuICBpc1JlcXVpcmVkKHRlbXBsYXRlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZUlkID8gdGhpcy5yZXF1aXJlZENvbnNlbnRzLmluY2x1ZGVzKHRlbXBsYXRlSWQpIDogZmFsc2U7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWNoZWNrXCI+XG4gIDxsYWJlbD5cbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIlxuICAgICAgKGNoYW5nZSk9XCJvbkNvbnNlbnRDaGFuZ2UoKVwiXG4gICAgICBbY2hlY2tlZF09XCJjb25zZW50R2l2ZW5cIlxuICAgICAgW2Rpc2FibGVkXT1cImlzUmVxdWlyZWQoY29uc2VudFRlbXBsYXRlPy5pZClcIlxuICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIGN4LWJlLWJvbGRcIj5cbiAgICAgIHt7IGNvbnNlbnRUZW1wbGF0ZT8ubmFtZSB9fVxuICAgIDwvc3Bhbj5cbiAgICA8YnIgLz5cbiAgICA8c3BhbiBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWxcIj5cbiAgICAgIHt7IGNvbnNlbnRUZW1wbGF0ZT8uZGVzY3JpcHRpb24gfX1cbiAgICA8L3NwYW4+XG4gIDwvbGFiZWw+XG48L2Rpdj5cbiJdfQ==