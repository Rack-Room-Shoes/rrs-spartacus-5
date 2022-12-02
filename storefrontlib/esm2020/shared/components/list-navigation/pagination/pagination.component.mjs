/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { PaginationItemType } from './pagination.model';
import * as i0 from "@angular/core";
import * as i1 from "./pagination.builder";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
/**
 * The `PaginationComponent` is a generic component that is used for
 * all lists in Spartacus that require pagination. The component supports
 * all common features, which can be configured or hidden by CSS.
 */
export class PaginationComponent {
    constructor(paginationBuilder, activatedRoute) {
        this.paginationBuilder = paginationBuilder;
        this.activatedRoute = activatedRoute;
        /** The (optional) pageRoute used for the anchor links created in the pagination   */
        this.pageRoute = '.';
        this.viewPageEvent = new EventEmitter();
        this.pages = [];
    }
    get pagination() {
        return this._pagination;
    }
    set pagination(value) {
        if (value) {
            this._pagination = value;
            this.render(value);
        }
    }
    render(pagination) {
        if (!pagination) {
            return;
        }
        this.pages = this.paginationBuilder.paginate(pagination.totalPages ?? 0, pagination.currentPage ?? 0);
    }
    /**
     * Format aria-label based on pagination item type.
     *
     * @param label string
     * @param type PaginationItemType
     * @returns string
     */
    getAriaLabel(label, type) {
        // Convert 'Start' to First, and 'End' to Last for a more natural screen read.
        type = type === PaginationItemType.START ? PaginationItemType.FIRST : type;
        type = type === PaginationItemType.END ? PaginationItemType.LAST : type;
        return type === PaginationItemType.PAGE
            ? `${type} ${label}`
            : `${type} ${PaginationItemType.PAGE}`;
    }
    /**
     * Indicates whether the given item is the current item.
     *
     * @param item PaginationItem
     * @returns boolean
     */
    isCurrent(item) {
        return (item.type === PaginationItemType.PAGE &&
            item.number === this.pagination.currentPage);
    }
    /**
     * Indicates whether the pagination item is inactive. This is used
     * to disabled a link or set the tabindex to `-1`.
     *
     * Defaults to true
     *
     * @param item PaginationItem
     * @returns returns -1 in case of a disabled
     */
    isInactive(item) {
        return (!item.hasOwnProperty('number') ||
            item.number === this.pagination.currentPage);
    }
    getQueryParams(item) {
        const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        if (this.queryParam &&
            item.number !== undefined &&
            this.pagination.totalPages !== undefined &&
            item.number < this.pagination.totalPages &&
            !this.isCurrent(item)) {
            queryParams[this.queryParam] = item.number;
        }
        // omit the page number from the query parameters in case it's the default
        // to clean up the experience and avoid unnecessary polluting of the URL
        if (queryParams[this.queryParam] === this.defaultPage) {
            delete queryParams[this.queryParam];
        }
        return queryParams;
    }
    pageChange(page) {
        this.viewPageEvent.emit(page.number);
    }
}
PaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PaginationComponent, deps: [{ token: i1.PaginationBuilder }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
PaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: PaginationComponent, selector: "cx-pagination", inputs: { pageRoute: "pageRoute", queryParam: "queryParam", defaultPage: "defaultPage", pagination: "pagination" }, outputs: { viewPageEvent: "viewPageEvent" }, ngImport: i0, template: "<a\n  *ngFor=\"let item of pages\"\n  [class]=\"item.type\"\n  [class.disabled]=\"isInactive(item)\"\n  [class.current]=\"isCurrent(item)\"\n  [routerLink]=\"pageRoute\"\n  [queryParams]=\"getQueryParams(item)\"\n  [tabIndex]=\"isInactive(item) ? -1 : 0\"\n  (click)=\"pageChange(item)\"\n  [attr.aria-label]=\"getAriaLabel(item.label, item.type)\"\n>\n  {{ item.label }}\n</a>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngFor=\"let item of pages\"\n  [class]=\"item.type\"\n  [class.disabled]=\"isInactive(item)\"\n  [class.current]=\"isCurrent(item)\"\n  [routerLink]=\"pageRoute\"\n  [queryParams]=\"getQueryParams(item)\"\n  [tabIndex]=\"isInactive(item) ? -1 : 0\"\n  (click)=\"pageChange(item)\"\n  [attr.aria-label]=\"getAriaLabel(item.label, item.type)\"\n>\n  {{ item.label }}\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.PaginationBuilder }, { type: i2.ActivatedRoute }]; }, propDecorators: { pageRoute: [{
                type: Input
            }], queryParam: [{
                type: Input
            }], defaultPage: [{
                type: Input
            }], pagination: [{
                type: Input
            }], viewPageEvent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL2xpc3QtbmF2aWdhdGlvbi9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQWtCLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBRXhFOzs7O0dBSUc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBNEI5QixZQUNVLGlCQUFvQyxFQUNwQyxjQUE4QjtRQUQ5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTdCeEMscUZBQXFGO1FBQzVFLGNBQVMsR0FBVyxHQUFHLENBQUM7UUFzQnZCLGtCQUFhLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0UsVUFBSyxHQUFxQixFQUFFLENBQUM7SUFLMUIsQ0FBQztJQWpCSixJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQWEsVUFBVSxDQUFDLEtBQWtDO1FBQ3hELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztT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QUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRpb25CdWlsZGVyIH0gZnJvbSAnLi9wYWdpbmF0aW9uLmJ1aWxkZXInO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkl0ZW0sIFBhZ2luYXRpb25JdGVtVHlwZSB9IGZyb20gJy4vcGFnaW5hdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogVGhlIGBQYWdpbmF0aW9uQ29tcG9uZW50YCBpcyBhIGdlbmVyaWMgY29tcG9uZW50IHRoYXQgaXMgdXNlZCBmb3JcbiAqIGFsbCBsaXN0cyBpbiBTcGFydGFjdXMgdGhhdCByZXF1aXJlIHBhZ2luYXRpb24uIFRoZSBjb21wb25lbnQgc3VwcG9ydHNcbiAqIGFsbCBjb21tb24gZmVhdHVyZXMsIHdoaWNoIGNhbiBiZSBjb25maWd1cmVkIG9yIGhpZGRlbiBieSBDU1MuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uQ29tcG9uZW50IHtcbiAgLyoqIFRoZSAob3B0aW9uYWwpIHBhZ2VSb3V0ZSB1c2VkIGZvciB0aGUgYW5jaG9yIGxpbmtzIGNyZWF0ZWQgaW4gdGhlIHBhZ2luYXRpb24gICAqL1xuICBASW5wdXQoKSBwYWdlUm91dGU6IHN0cmluZyA9ICcuJztcblxuICAvKiogVGhlIChvcHRpb25hbCkgcXVlcnkgcGFyYW1ldGVyIHdoaWNoIGlzIGFkZGVkIHRvIHRoZSBwYWdlIHJvdXRlLiAgKi9cbiAgQElucHV0KCkgcXVlcnlQYXJhbTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGVuZXZlciB0aGVyZSdzIGEgZGVmYXVsdCBwYWdlIHNwZWNpZmllZCwgdGhlIHJvdXRpbmcgbG9naWNcbiAgICogd2lsbCBvbWl0IHRoZSBwYWdlIG51bWJlciBpbiByb3V0ZUxpbmsgb3IgcGFyYW1ldGVycy5cbiAgICovXG4gIEBJbnB1dCgpIGRlZmF1bHRQYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfcGFnaW5hdGlvbjogUGFnaW5hdGlvbk1vZGVsO1xuICBnZXQgcGFnaW5hdGlvbigpOiBQYWdpbmF0aW9uTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9wYWdpbmF0aW9uO1xuICB9XG4gIEBJbnB1dCgpIHNldCBwYWdpbmF0aW9uKHZhbHVlOiBQYWdpbmF0aW9uTW9kZWwgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMucmVuZGVyKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgdmlld1BhZ2VFdmVudDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnaW5hdGlvbkJ1aWxkZXI6IFBhZ2luYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICkge31cblxuICBwcm90ZWN0ZWQgcmVuZGVyKHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCk6IHZvaWQge1xuICAgIGlmICghcGFnaW5hdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5wYWdpbmF0aW9uQnVpbGRlci5wYWdpbmF0ZShcbiAgICAgIHBhZ2luYXRpb24udG90YWxQYWdlcyA/PyAwLFxuICAgICAgcGFnaW5hdGlvbi5jdXJyZW50UGFnZSA/PyAwXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYXJpYS1sYWJlbCBiYXNlZCBvbiBwYWdpbmF0aW9uIGl0ZW0gdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsIHN0cmluZ1xuICAgKiBAcGFyYW0gdHlwZSBQYWdpbmF0aW9uSXRlbVR5cGVcbiAgICogQHJldHVybnMgc3RyaW5nXG4gICAqL1xuICBnZXRBcmlhTGFiZWwobGFiZWw/OiBzdHJpbmcsIHR5cGU/OiBQYWdpbmF0aW9uSXRlbVR5cGUpOiBzdHJpbmcge1xuICAgIC8vIENvbnZlcnQgJ1N0YXJ0JyB0byBGaXJzdCwgYW5kICdFbmQnIHRvIExhc3QgZm9yIGEgbW9yZSBuYXR1cmFsIHNjcmVlbiByZWFkLlxuICAgIHR5cGUgPSB0eXBlID09PSBQYWdpbmF0aW9uSXRlbVR5cGUuU1RBUlQgPyBQYWdpbmF0aW9uSXRlbVR5cGUuRklSU1QgOiB0eXBlO1xuICAgIHR5cGUgPSB0eXBlID09PSBQYWdpbmF0aW9uSXRlbVR5cGUuRU5EID8gUGFnaW5hdGlvbkl0ZW1UeXBlLkxBU1QgOiB0eXBlO1xuICAgIHJldHVybiB0eXBlID09PSBQYWdpbmF0aW9uSXRlbVR5cGUuUEFHRVxuICAgICAgPyBgJHt0eXBlfSAke2xhYmVsfWBcbiAgICAgIDogYCR7dHlwZX0gJHtQYWdpbmF0aW9uSXRlbVR5cGUuUEFHRX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBpdGVtIGlzIHRoZSBjdXJyZW50IGl0ZW0uXG4gICAqXG4gICAqIEBwYXJhbSBpdGVtIFBhZ2luYXRpb25JdGVtXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIGlzQ3VycmVudChpdGVtOiBQYWdpbmF0aW9uSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBpdGVtLnR5cGUgPT09IFBhZ2luYXRpb25JdGVtVHlwZS5QQUdFICYmXG4gICAgICBpdGVtLm51bWJlciA9PT0gdGhpcy5wYWdpbmF0aW9uLmN1cnJlbnRQYWdlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcGFnaW5hdGlvbiBpdGVtIGlzIGluYWN0aXZlLiBUaGlzIGlzIHVzZWRcbiAgICogdG8gZGlzYWJsZWQgYSBsaW5rIG9yIHNldCB0aGUgdGFiaW5kZXggdG8gYC0xYC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gdHJ1ZVxuICAgKlxuICAgKiBAcGFyYW0gaXRlbSBQYWdpbmF0aW9uSXRlbVxuICAgKiBAcmV0dXJucyByZXR1cm5zIC0xIGluIGNhc2Ugb2YgYSBkaXNhYmxlZFxuICAgKi9cbiAgaXNJbmFjdGl2ZShpdGVtOiBQYWdpbmF0aW9uSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhaXRlbS5oYXNPd25Qcm9wZXJ0eSgnbnVtYmVyJykgfHxcbiAgICAgIGl0ZW0ubnVtYmVyID09PSB0aGlzLnBhZ2luYXRpb24uY3VycmVudFBhZ2VcbiAgICApO1xuICB9XG5cbiAgZ2V0UXVlcnlQYXJhbXMoaXRlbTogUGFnaW5hdGlvbkl0ZW0pOiBQYXJhbXMge1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1xuICAgICk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5xdWVyeVBhcmFtICYmXG4gICAgICBpdGVtLm51bWJlciAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB0aGlzLnBhZ2luYXRpb24udG90YWxQYWdlcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBpdGVtLm51bWJlciA8IHRoaXMucGFnaW5hdGlvbi50b3RhbFBhZ2VzICYmXG4gICAgICAhdGhpcy5pc0N1cnJlbnQoaXRlbSlcbiAgICApIHtcbiAgICAgIHF1ZXJ5UGFyYW1zW3RoaXMucXVlcnlQYXJhbV0gPSBpdGVtLm51bWJlcjtcbiAgICB9XG4gICAgLy8gb21pdCB0aGUgcGFnZSBudW1iZXIgZnJvbSB0aGUgcXVlcnkgcGFyYW1ldGVycyBpbiBjYXNlIGl0J3MgdGhlIGRlZmF1bHRcbiAgICAvLyB0byBjbGVhbiB1cCB0aGUgZXhwZXJpZW5jZSBhbmQgYXZvaWQgdW5uZWNlc3NhcnkgcG9sbHV0aW5nIG9mIHRoZSBVUkxcbiAgICBpZiAocXVlcnlQYXJhbXNbdGhpcy5xdWVyeVBhcmFtXSA9PT0gdGhpcy5kZWZhdWx0UGFnZSkge1xuICAgICAgZGVsZXRlIHF1ZXJ5UGFyYW1zW3RoaXMucXVlcnlQYXJhbV07XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVBhcmFtcztcbiAgfVxuXG4gIHBhZ2VDaGFuZ2UocGFnZTogUGFnaW5hdGlvbkl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdQYWdlRXZlbnQuZW1pdChwYWdlLm51bWJlcik7XG4gIH1cbn1cbiIsIjxhXG4gICpuZ0Zvcj1cImxldCBpdGVtIG9mIHBhZ2VzXCJcbiAgW2NsYXNzXT1cIml0ZW0udHlwZVwiXG4gIFtjbGFzcy5kaXNhYmxlZF09XCJpc0luYWN0aXZlKGl0ZW0pXCJcbiAgW2NsYXNzLmN1cnJlbnRdPVwiaXNDdXJyZW50KGl0ZW0pXCJcbiAgW3JvdXRlckxpbmtdPVwicGFnZVJvdXRlXCJcbiAgW3F1ZXJ5UGFyYW1zXT1cImdldFF1ZXJ5UGFyYW1zKGl0ZW0pXCJcbiAgW3RhYkluZGV4XT1cImlzSW5hY3RpdmUoaXRlbSkgPyAtMSA6IDBcIlxuICAoY2xpY2spPVwicGFnZUNoYW5nZShpdGVtKVwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0QXJpYUxhYmVsKGl0ZW0ubGFiZWwsIGl0ZW0udHlwZSlcIlxuPlxuICB7eyBpdGVtLmxhYmVsIH19XG48L2E+XG4iXX0=