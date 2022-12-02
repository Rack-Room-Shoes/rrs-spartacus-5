/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, isDevMode, Output, } from '@angular/core';
import { TableLayout, } from './table.model';
import * as i0 from "@angular/core";
import * as i1 from "./table-renderer.service";
import * as i2 from "@angular/common";
import * as i3 from "../../../cms-structure/outlet/outlet.directive";
/**
 * The table component provides a generic table DOM structure, with 3 layout types:
 * horizontal, vertical and _stacked vertical_ layout. The layout is driven by the
 * table structure.
 *
 * The implementation is fairly "dumb" and only renders string based content for TH
 * and TD elements. The actual cell rendering is delegated to a (configurable) cell
 * component. Additionally, each cell is registered as an outlet, so that customizations
 * can be done by both outlet templates and components.
 *
 * The outlet references are concatenated from the table `type` and header `key`. The
 * following snippet shows an outlet generated for a table header, for the table type
 * "cost-center" with a header key "name":
 *
 * ```
 * <th>
 *   <template cxOutlet="table.cost-center.header.name">
 *   </template>
 * </th>
 * ```
 *
 * Similarly, the data cells (`<td>`) are generated with the outlet template reference
 * `table.cost-center.data.name`.
 */
export class TableComponent {
    constructor(rendererService) {
        this.rendererService = rendererService;
        this.launch = new EventEmitter();
    }
    set structure(structure) {
        this._structure = structure;
        this.init();
    }
    get structure() {
        return this._structure;
    }
    init() {
        this.verticalLayout = !this.layout || this.layout === TableLayout.VERTICAL;
        this.verticalStackedLayout = this.layout === TableLayout.VERTICAL_STACKED;
        this.horizontalLayout = this.layout === TableLayout.HORIZONTAL;
        this.rendererService.add(this.structure);
        this.addTableDebugInfo();
    }
    launchItem(item) {
        this.launch.emit(item);
    }
    /**
     * Indicates whether the given item is the current item.
     *
     * The current item is driven by the `currentItem`, that holds a
     * property and value to compare.
     */
    isCurrentItem(item) {
        if (!this.currentItem || !this.currentItem.value) {
            return false;
        }
        return this.currentItem?.value === item?.[this.currentItem?.property];
    }
    /**
     * Returns the header (th) outlet reference for the given field.
     */
    getHeaderOutletRef(field) {
        return this.rendererService.getHeaderOutletRef(this.type, field);
    }
    /**
     * Returns the header (th) outlet context for the given field.
     */
    getHeaderOutletContext(field) {
        return this.rendererService.getHeaderOutletContext(this.type, this.options, this.i18nRoot, field);
    }
    /**
     * Returns the data (td) outlet reference for the given field.
     */
    getDataOutletRef(field) {
        return this.rendererService.getDataOutletRef(this.type, field);
    }
    /**
     * Returns the data (td) outlet context for the given field.
     */
    getDataOutletContext(field, data) {
        return this.rendererService.getDataOutletContext(this.type, this.options, this.i18nRoot, field, data);
    }
    trackData(_i, item) {
        return JSON.stringify(item);
    }
    /**
     * Generates the table type into the UI in devMode, so that developers
     * can easily get the notion of the table type.
     */
    addTableDebugInfo() {
        if (isDevMode() && this.type) {
            this.tableType = this.type;
        }
    }
    /**
     * Helper method to return the deeply nested orientation configuration.
     */
    get layout() {
        return this.structure?.options?.layout;
    }
    /**
     * Helper method to return the deeply nested type.
     */
    get type() {
        return this.structure?.type;
    }
    get options() {
        return this.structure?.options;
    }
}
TableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TableComponent, deps: [{ token: i1.TableRendererService }], target: i0.ɵɵFactoryTarget.Component });
TableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: TableComponent, selector: "cx-table", inputs: { structure: "structure", data: "data", i18nRoot: "i18nRoot", currentItem: "currentItem" }, outputs: { launch: "launch" }, host: { properties: { "attr.__cx-table-type": "this.tableType", "class.horizontal": "this.horizontalLayout", "class.vertical": "this.verticalLayout", "class.vertical-stacked": "this.verticalStackedLayout" } }, ngImport: i0, template: "<table *ngIf=\"structure\">\n  <ng-container *ngIf=\"verticalStackedLayout\">\n    <tbody\n      *ngFor=\"let item of data; trackBy: trackData\"\n      (click)=\"launchItem(item)\"\n      [class.is-current]=\"isCurrentItem(item)\"\n    >\n      <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n        <th>\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n        <td>\n          <ng-template\n            [cxOutlet]=\"getDataOutletRef(cell)\"\n            [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n          >\n            {{ $any(item)[cell] }}\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </ng-container>\n\n  <!-- vertical tables render the item  -->\n  <ng-container *ngIf=\"verticalLayout\">\n    <thead>\n      <tr>\n        <th scope=\"col\" *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n      </tr>\n    </thead>\n\n    <tr\n      *ngFor=\"let item of data; trackBy: trackData\"\n      [class.is-current]=\"isCurrentItem(item)\"\n      (click)=\"launchItem(item)\"\n    >\n      <td *ngFor=\"let cell of structure.cells; let i = index\" [class]=\"cell\">\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n\n  <ng-container *ngIf=\"horizontalLayout\">\n    <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n      <th scope=\"col\">\n        <ng-template\n          [cxOutlet]=\"getHeaderOutletRef(cell)\"\n          [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n        >\n          {{ cell }}\n        </ng-template>\n      </th>\n      <td\n        *ngFor=\"let item of data; trackBy: trackData\"\n        [class.is-current]=\"isCurrentItem(item)\"\n        (click)=\"launchItem(item)\"\n      >\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n</table>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer"], outputs: ["loaded"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-table', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table *ngIf=\"structure\">\n  <ng-container *ngIf=\"verticalStackedLayout\">\n    <tbody\n      *ngFor=\"let item of data; trackBy: trackData\"\n      (click)=\"launchItem(item)\"\n      [class.is-current]=\"isCurrentItem(item)\"\n    >\n      <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n        <th>\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n        <td>\n          <ng-template\n            [cxOutlet]=\"getDataOutletRef(cell)\"\n            [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n          >\n            {{ $any(item)[cell] }}\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </ng-container>\n\n  <!-- vertical tables render the item  -->\n  <ng-container *ngIf=\"verticalLayout\">\n    <thead>\n      <tr>\n        <th scope=\"col\" *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n          <ng-template\n            [cxOutlet]=\"getHeaderOutletRef(cell)\"\n            [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n          >\n            {{ cell }}\n          </ng-template>\n        </th>\n      </tr>\n    </thead>\n\n    <tr\n      *ngFor=\"let item of data; trackBy: trackData\"\n      [class.is-current]=\"isCurrentItem(item)\"\n      (click)=\"launchItem(item)\"\n    >\n      <td *ngFor=\"let cell of structure.cells; let i = index\" [class]=\"cell\">\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n\n  <ng-container *ngIf=\"horizontalLayout\">\n    <tr *ngFor=\"let cell of structure.cells\" [class]=\"cell\">\n      <th scope=\"col\">\n        <ng-template\n          [cxOutlet]=\"getHeaderOutletRef(cell)\"\n          [cxOutletContext]=\"getHeaderOutletContext(cell)\"\n        >\n          {{ cell }}\n        </ng-template>\n      </th>\n      <td\n        *ngFor=\"let item of data; trackBy: trackData\"\n        [class.is-current]=\"isCurrentItem(item)\"\n        (click)=\"launchItem(item)\"\n      >\n        <ng-template\n          [cxOutlet]=\"getDataOutletRef(cell)\"\n          [cxOutletContext]=\"getDataOutletContext(cell, item)\"\n        >\n          {{ $any(item)[cell] }}\n        </ng-template>\n      </td>\n    </tr>\n  </ng-container>\n</table>\n" }]
        }], ctorParameters: function () { return [{ type: i1.TableRendererService }]; }, propDecorators: { tableType: [{
                type: HostBinding,
                args: ['attr.__cx-table-type']
            }], horizontalLayout: [{
                type: HostBinding,
                args: ['class.horizontal']
            }], verticalLayout: [{
                type: HostBinding,
                args: ['class.vertical']
            }], verticalStackedLayout: [{
                type: HostBinding,
                args: ['class.vertical-stacked']
            }], structure: [{
                type: Input
            }], data: [{
                type: Input
            }], i18nRoot: [{
                type: Input
            }], currentItem: [{
                type: Input
            }], launch: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFHTCxXQUFXLEdBR1osTUFBTSxlQUFlLENBQUM7Ozs7O0FBRXZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBaUN6QixZQUFzQixlQUFxQztRQUFyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBc0I7UUFGakQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFd0IsQ0FBQztJQTFCL0QsSUFBYSxTQUFTLENBQUMsU0FBeUI7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBc0JELElBQUk7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDM0UsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLGdCQUFn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QUs7Z0JBUUcsSUFBSTtzQkFBWixLQUFLO2dCQU1HLFFBQVE7c0JBQWhCLEtBQUs7Z0JBUUcsV0FBVztzQkFBbkIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgaXNEZXZNb2RlLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFibGVSZW5kZXJlclNlcnZpY2UgfSBmcm9tICcuL3RhYmxlLXJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgVGFibGVEYXRhT3V0bGV0Q29udGV4dCxcbiAgVGFibGVIZWFkZXJPdXRsZXRDb250ZXh0LFxuICBUYWJsZUxheW91dCxcbiAgVGFibGVPcHRpb25zLFxuICBUYWJsZVN0cnVjdHVyZSxcbn0gZnJvbSAnLi90YWJsZS5tb2RlbCc7XG5cbi8qKlxuICogVGhlIHRhYmxlIGNvbXBvbmVudCBwcm92aWRlcyBhIGdlbmVyaWMgdGFibGUgRE9NIHN0cnVjdHVyZSwgd2l0aCAzIGxheW91dCB0eXBlczpcbiAqIGhvcml6b250YWwsIHZlcnRpY2FsIGFuZCBfc3RhY2tlZCB2ZXJ0aWNhbF8gbGF5b3V0LiBUaGUgbGF5b3V0IGlzIGRyaXZlbiBieSB0aGVcbiAqIHRhYmxlIHN0cnVjdHVyZS5cbiAqXG4gKiBUaGUgaW1wbGVtZW50YXRpb24gaXMgZmFpcmx5IFwiZHVtYlwiIGFuZCBvbmx5IHJlbmRlcnMgc3RyaW5nIGJhc2VkIGNvbnRlbnQgZm9yIFRIXG4gKiBhbmQgVEQgZWxlbWVudHMuIFRoZSBhY3R1YWwgY2VsbCByZW5kZXJpbmcgaXMgZGVsZWdhdGVkIHRvIGEgKGNvbmZpZ3VyYWJsZSkgY2VsbFxuICogY29tcG9uZW50LiBBZGRpdGlvbmFsbHksIGVhY2ggY2VsbCBpcyByZWdpc3RlcmVkIGFzIGFuIG91dGxldCwgc28gdGhhdCBjdXN0b21pemF0aW9uc1xuICogY2FuIGJlIGRvbmUgYnkgYm90aCBvdXRsZXQgdGVtcGxhdGVzIGFuZCBjb21wb25lbnRzLlxuICpcbiAqIFRoZSBvdXRsZXQgcmVmZXJlbmNlcyBhcmUgY29uY2F0ZW5hdGVkIGZyb20gdGhlIHRhYmxlIGB0eXBlYCBhbmQgaGVhZGVyIGBrZXlgLiBUaGVcbiAqIGZvbGxvd2luZyBzbmlwcGV0IHNob3dzIGFuIG91dGxldCBnZW5lcmF0ZWQgZm9yIGEgdGFibGUgaGVhZGVyLCBmb3IgdGhlIHRhYmxlIHR5cGVcbiAqIFwiY29zdC1jZW50ZXJcIiB3aXRoIGEgaGVhZGVyIGtleSBcIm5hbWVcIjpcbiAqXG4gKiBgYGBcbiAqIDx0aD5cbiAqICAgPHRlbXBsYXRlIGN4T3V0bGV0PVwidGFibGUuY29zdC1jZW50ZXIuaGVhZGVyLm5hbWVcIj5cbiAqICAgPC90ZW1wbGF0ZT5cbiAqIDwvdGg+XG4gKiBgYGBcbiAqXG4gKiBTaW1pbGFybHksIHRoZSBkYXRhIGNlbGxzIChgPHRkPmApIGFyZSBnZW5lcmF0ZWQgd2l0aCB0aGUgb3V0bGV0IHRlbXBsYXRlIHJlZmVyZW5jZVxuICogYHRhYmxlLmNvc3QtY2VudGVyLmRhdGEubmFtZWAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlQ29tcG9uZW50PFQ+IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLl9fY3gtdGFibGUtdHlwZScpIHRhYmxlVHlwZTogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhvcml6b250YWwnKSBob3Jpem9udGFsTGF5b3V0OiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZlcnRpY2FsJykgdmVydGljYWxMYXlvdXQ6IGJvb2xlYW47XG4gIEBIb3N0QmluZGluZygnY2xhc3MudmVydGljYWwtc3RhY2tlZCcpIHZlcnRpY2FsU3RhY2tlZExheW91dDogYm9vbGVhbjtcblxuICBwcml2YXRlIF9zdHJ1Y3R1cmU6IFRhYmxlU3RydWN0dXJlO1xuICBASW5wdXQoKSBzZXQgc3RydWN0dXJlKHN0cnVjdHVyZTogVGFibGVTdHJ1Y3R1cmUpIHtcbiAgICB0aGlzLl9zdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgZ2V0IHN0cnVjdHVyZSgpOiBUYWJsZVN0cnVjdHVyZSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cnVjdHVyZTtcbiAgfVxuXG4gIEBJbnB1dCgpIGRhdGE6IFRbXTtcblxuICAvKipcbiAgICogVGhlIGkxOG5Sb290IGlzIHBhc3NlZCBpbnRvIHRoZSB0YWJsZSBjZWxsIGNvbnRleHQsIHNvIHRoYXRcbiAgICogY2VsbCBjb21wb25lbnRzIGNhbiBjb25jYXRlbmF0ZSB0aGUgaTE4biByb290IGFuZCBsYWJlbC5cbiAgICovXG4gIEBJbnB1dCgpIGkxOG5Sb290OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgbWVjaGFuaXNtIHRvIGNvbXBhcmUgYSBtYXRjaGluZyB2YWx1ZSBmb3IgZWFjaCBpdGVtLlxuICAgKlxuICAgKiBUaGUgYHByb3BlcnR5YCByZWZlcnMgdG8gdGhlIGRhdGFzZXQudmFsdWUgcHJvcGVydHksIGFuZCB0aGUgdmFsdWUgdG90IHRoZVxuICAgKiBtYXRjaGluZyBwcm9wZXJ0eSB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dCgpIGN1cnJlbnRJdGVtOiB7IHZhbHVlOiBhbnk7IHByb3BlcnR5OiBzdHJpbmcgfTtcblxuICBAT3V0cHV0KCkgbGF1bmNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZW5kZXJlclNlcnZpY2U6IFRhYmxlUmVuZGVyZXJTZXJ2aWNlKSB7fVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy52ZXJ0aWNhbExheW91dCA9ICF0aGlzLmxheW91dCB8fCB0aGlzLmxheW91dCA9PT0gVGFibGVMYXlvdXQuVkVSVElDQUw7XG4gICAgdGhpcy52ZXJ0aWNhbFN0YWNrZWRMYXlvdXQgPSB0aGlzLmxheW91dCA9PT0gVGFibGVMYXlvdXQuVkVSVElDQUxfU1RBQ0tFRDtcbiAgICB0aGlzLmhvcml6b250YWxMYXlvdXQgPSB0aGlzLmxheW91dCA9PT0gVGFibGVMYXlvdXQuSE9SSVpPTlRBTDtcblxuICAgIHRoaXMucmVuZGVyZXJTZXJ2aWNlLmFkZCh0aGlzLnN0cnVjdHVyZSk7XG5cbiAgICB0aGlzLmFkZFRhYmxlRGVidWdJbmZvKCk7XG4gIH1cblxuICBsYXVuY2hJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xuICAgIHRoaXMubGF1bmNoLmVtaXQoaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGdpdmVuIGl0ZW0gaXMgdGhlIGN1cnJlbnQgaXRlbS5cbiAgICpcbiAgICogVGhlIGN1cnJlbnQgaXRlbSBpcyBkcml2ZW4gYnkgdGhlIGBjdXJyZW50SXRlbWAsIHRoYXQgaG9sZHMgYVxuICAgKiBwcm9wZXJ0eSBhbmQgdmFsdWUgdG8gY29tcGFyZS5cbiAgICovXG4gIGlzQ3VycmVudEl0ZW0oaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmN1cnJlbnRJdGVtIHx8ICF0aGlzLmN1cnJlbnRJdGVtLnZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRJdGVtPy52YWx1ZSA9PT0gaXRlbT8uW3RoaXMuY3VycmVudEl0ZW0/LnByb3BlcnR5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWFkZXIgKHRoKSBvdXRsZXQgcmVmZXJlbmNlIGZvciB0aGUgZ2l2ZW4gZmllbGQuXG4gICAqL1xuICBnZXRIZWFkZXJPdXRsZXRSZWYoZmllbGQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXJTZXJ2aWNlLmdldEhlYWRlck91dGxldFJlZih0aGlzLnR5cGUsIGZpZWxkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWFkZXIgKHRoKSBvdXRsZXQgY29udGV4dCBmb3IgdGhlIGdpdmVuIGZpZWxkLlxuICAgKi9cbiAgZ2V0SGVhZGVyT3V0bGV0Q29udGV4dChmaWVsZDogc3RyaW5nKTogVGFibGVIZWFkZXJPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJlclNlcnZpY2UuZ2V0SGVhZGVyT3V0bGV0Q29udGV4dChcbiAgICAgIHRoaXMudHlwZSxcbiAgICAgIHRoaXMub3B0aW9ucyxcbiAgICAgIHRoaXMuaTE4blJvb3QsXG4gICAgICBmaWVsZFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGF0YSAodGQpIG91dGxldCByZWZlcmVuY2UgZm9yIHRoZSBnaXZlbiBmaWVsZC5cbiAgICovXG4gIGdldERhdGFPdXRsZXRSZWYoZmllbGQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXJTZXJ2aWNlLmdldERhdGFPdXRsZXRSZWYodGhpcy50eXBlLCBmaWVsZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGF0YSAodGQpIG91dGxldCBjb250ZXh0IGZvciB0aGUgZ2l2ZW4gZmllbGQuXG4gICAqL1xuICBnZXREYXRhT3V0bGV0Q29udGV4dChmaWVsZDogc3RyaW5nLCBkYXRhOiBhbnkpOiBUYWJsZURhdGFPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJlclNlcnZpY2UuZ2V0RGF0YU91dGxldENvbnRleHQoXG4gICAgICB0aGlzLnR5cGUsXG4gICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICB0aGlzLmkxOG5Sb290LFxuICAgICAgZmllbGQsXG4gICAgICBkYXRhXG4gICAgKTtcbiAgfVxuXG4gIHRyYWNrRGF0YShfaTogbnVtYmVyLCBpdGVtOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIHRhYmxlIHR5cGUgaW50byB0aGUgVUkgaW4gZGV2TW9kZSwgc28gdGhhdCBkZXZlbG9wZXJzXG4gICAqIGNhbiBlYXNpbHkgZ2V0IHRoZSBub3Rpb24gb2YgdGhlIHRhYmxlIHR5cGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkVGFibGVEZWJ1Z0luZm8oKSB7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIHRoaXMudHlwZSkge1xuICAgICAgdGhpcy50YWJsZVR5cGUgPSB0aGlzLnR5cGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gcmV0dXJuIHRoZSBkZWVwbHkgbmVzdGVkIG9yaWVudGF0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIGdldCBsYXlvdXQoKTogVGFibGVMYXlvdXQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0cnVjdHVyZT8ub3B0aW9ucz8ubGF5b3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gcmV0dXJuIHRoZSBkZWVwbHkgbmVzdGVkIHR5cGUuXG4gICAqL1xuICBwcml2YXRlIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RydWN0dXJlPy50eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgb3B0aW9ucygpOiBUYWJsZU9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0cnVjdHVyZT8ub3B0aW9ucztcbiAgfVxufVxuIiwiPHRhYmxlICpuZ0lmPVwic3RydWN0dXJlXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJ2ZXJ0aWNhbFN0YWNrZWRMYXlvdXRcIj5cbiAgICA8dGJvZHlcbiAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGE7IHRyYWNrQnk6IHRyYWNrRGF0YVwiXG4gICAgICAoY2xpY2spPVwibGF1bmNoSXRlbShpdGVtKVwiXG4gICAgICBbY2xhc3MuaXMtY3VycmVudF09XCJpc0N1cnJlbnRJdGVtKGl0ZW0pXCJcbiAgICA+XG4gICAgICA8dHIgKm5nRm9yPVwibGV0IGNlbGwgb2Ygc3RydWN0dXJlLmNlbGxzXCIgW2NsYXNzXT1cImNlbGxcIj5cbiAgICAgICAgPHRoPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgW2N4T3V0bGV0XT1cImdldEhlYWRlck91dGxldFJlZihjZWxsKVwiXG4gICAgICAgICAgICBbY3hPdXRsZXRDb250ZXh0XT1cImdldEhlYWRlck91dGxldENvbnRleHQoY2VsbClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IGNlbGwgfX1cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3RoPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBbY3hPdXRsZXRdPVwiZ2V0RGF0YU91dGxldFJlZihjZWxsKVwiXG4gICAgICAgICAgICBbY3hPdXRsZXRDb250ZXh0XT1cImdldERhdGFPdXRsZXRDb250ZXh0KGNlbGwsIGl0ZW0pXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyAkYW55KGl0ZW0pW2NlbGxdIH19XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPCEtLSB2ZXJ0aWNhbCB0YWJsZXMgcmVuZGVyIHRoZSBpdGVtICAtLT5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZlcnRpY2FsTGF5b3V0XCI+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgY2VsbCBvZiBzdHJ1Y3R1cmUuY2VsbHNcIiBbY2xhc3NdPVwiY2VsbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgW2N4T3V0bGV0XT1cImdldEhlYWRlck91dGxldFJlZihjZWxsKVwiXG4gICAgICAgICAgICBbY3hPdXRsZXRDb250ZXh0XT1cImdldEhlYWRlck91dGxldENvbnRleHQoY2VsbClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IGNlbGwgfX1cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuXG4gICAgPHRyXG4gICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhOyB0cmFja0J5OiB0cmFja0RhdGFcIlxuICAgICAgW2NsYXNzLmlzLWN1cnJlbnRdPVwiaXNDdXJyZW50SXRlbShpdGVtKVwiXG4gICAgICAoY2xpY2spPVwibGF1bmNoSXRlbShpdGVtKVwiXG4gICAgPlxuICAgICAgPHRkICpuZ0Zvcj1cImxldCBjZWxsIG9mIHN0cnVjdHVyZS5jZWxsczsgbGV0IGkgPSBpbmRleFwiIFtjbGFzc109XCJjZWxsXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgIFtjeE91dGxldF09XCJnZXREYXRhT3V0bGV0UmVmKGNlbGwpXCJcbiAgICAgICAgICBbY3hPdXRsZXRDb250ZXh0XT1cImdldERhdGFPdXRsZXRDb250ZXh0KGNlbGwsIGl0ZW0pXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7ICRhbnkoaXRlbSlbY2VsbF0gfX1cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhvcml6b250YWxMYXlvdXRcIj5cbiAgICA8dHIgKm5nRm9yPVwibGV0IGNlbGwgb2Ygc3RydWN0dXJlLmNlbGxzXCIgW2NsYXNzXT1cImNlbGxcIj5cbiAgICAgIDx0aCBzY29wZT1cImNvbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBbY3hPdXRsZXRdPVwiZ2V0SGVhZGVyT3V0bGV0UmVmKGNlbGwpXCJcbiAgICAgICAgICBbY3hPdXRsZXRDb250ZXh0XT1cImdldEhlYWRlck91dGxldENvbnRleHQoY2VsbClcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgY2VsbCB9fVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC90aD5cbiAgICAgIDx0ZFxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhOyB0cmFja0J5OiB0cmFja0RhdGFcIlxuICAgICAgICBbY2xhc3MuaXMtY3VycmVudF09XCJpc0N1cnJlbnRJdGVtKGl0ZW0pXCJcbiAgICAgICAgKGNsaWNrKT1cImxhdW5jaEl0ZW0oaXRlbSlcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBbY3hPdXRsZXRdPVwiZ2V0RGF0YU91dGxldFJlZihjZWxsKVwiXG4gICAgICAgICAgW2N4T3V0bGV0Q29udGV4dF09XCJnZXREYXRhT3V0bGV0Q29udGV4dChjZWxsLCBpdGVtKVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyAkYW55KGl0ZW0pW2NlbGxdIH19XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvbmctY29udGFpbmVyPlxuPC90YWJsZT5cbiJdfQ==