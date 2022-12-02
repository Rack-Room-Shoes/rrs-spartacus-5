/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/unit-tree.service";
import * as i2 from "../../shared/list/list.component";
import * as i3 from "@spartacus/core";
export class UnitListComponent {
    constructor(unitTreeService) {
        this.unitTreeService = unitTreeService;
    }
    expandAll() {
        this.unitTreeService.expandAll();
    }
    collapseAll() {
        this.unitTreeService.collapseAll();
    }
}
UnitListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitListComponent, deps: [{ token: i1.UnitTreeService }], target: i0.ɵɵFactoryTarget.Component });
UnitListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: UnitListComponent, selector: "cx-org-unit-list", ngImport: i0, template: "<cx-org-list>\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n", dependencies: [{ kind: "component", type: i2.ListComponent, selector: "cx-org-list", inputs: ["key"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-org-list>\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UnitTreeService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpc3QvdW5pdC1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpc3QvdW5pdC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQVFuRSxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQXNCLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUFHLENBQUM7SUFFMUQsU0FBUztRQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JDLENBQUM7OzhHQVRVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHdEQ2Q5QixrVUFVQTsyRkRJYSxpQkFBaUI7a0JBTDdCLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbml0VHJlZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91bml0LXRyZWUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy11bml0LWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdW5pdC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRMaXN0Q29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHVuaXRUcmVlU2VydmljZTogVW5pdFRyZWVTZXJ2aWNlKSB7fVxuXG4gIGV4cGFuZEFsbCgpIHtcbiAgICB0aGlzLnVuaXRUcmVlU2VydmljZS5leHBhbmRBbGwoKTtcbiAgfVxuXG4gIGNvbGxhcHNlQWxsKCkge1xuICAgIHRoaXMudW5pdFRyZWVTZXJ2aWNlLmNvbGxhcHNlQWxsKCk7XG4gIH1cbn1cbiIsIjxjeC1vcmctbGlzdD5cbiAgPG5nLWNvbnRhaW5lciBhY3Rpb25zPlxuICAgIDxidXR0b24gY2xhc3M9XCJsaW5rXCIgKGNsaWNrKT1cImV4cGFuZEFsbCgpXCI+XG4gICAgICB7eyAnb3JnVW5pdC50cmVlLmV4cGFuZEFsbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJsaW5rXCIgKGNsaWNrKT1cImNvbGxhcHNlQWxsKClcIj5cbiAgICAgIHt7ICdvcmdVbml0LnRyZWUuY29sbGFwc2VBbGwnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9uZy1jb250YWluZXI+XG48L2N4LW9yZy1saXN0PlxuIl19