/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CellComponent } from '../../../shared/table/cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../../services/unit-tree.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/core";
export class ToggleLinkCellComponent extends CellComponent {
    constructor(outlet, unitTreeService) {
        super(outlet);
        this.outlet = outlet;
        this.unitTreeService = unitTreeService;
    }
    get depthLevel() {
        return this.model.depthLevel;
    }
    get combinedName() {
        return this.property ? `${this.property} (${this.count})` : '';
    }
    get tabIndex() {
        return 0;
    }
    get expanded() {
        return this.model.expanded;
    }
    /**
     * Counts the number of descendants
     */
    get count() {
        return this.model.count;
    }
    toggleItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.unitTreeService.toggle(this.model);
    }
    /**
     * Indicates whether the tree item should have a toggle navigation.
     *
     * The toggle navigation is used in case the tree item has descendants,
     * and if the tree item level is not configured to be shown anyway.
     */
    get isSwitchable() {
        return this.count > 0;
    }
    // TODO: leverage these methods when available from future PR.
    get hasItem() {
        return !!this.item && Object.keys(this.item).length > 0;
    }
    get item() {
        if (!this.outlet.context) {
            return null;
        }
        const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
        return all;
    }
}
ToggleLinkCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ToggleLinkCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.UnitTreeService }], target: i0.ɵɵFactoryTarget.Component });
ToggleLinkCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ToggleLinkCellComponent, selector: "cx-org-toggle-link-cell", host: { properties: { "style.--cx-depth-level": "this.depthLevel" } }, usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"hasItem\"\n  class=\"hide-focus-border\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <button\n    *ngIf=\"isSwitchable\"\n    class=\"button tree-item-toggle\"\n    type=\"button\"\n    (click)=\"toggleItem($event)\"\n  >\n    <cx-icon [type]=\"expanded ? 'CARET_DOWN' : 'CARET_RIGHT'\"></cx-icon>\n  </button>\n  <span class=\"text\" title=\"{{ combinedName }}\">{{ combinedName }}</span>\n</a>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i5.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ToggleLinkCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-toggle-link-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"hasItem\"\n  class=\"hide-focus-border\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <button\n    *ngIf=\"isSwitchable\"\n    class=\"button tree-item-toggle\"\n    type=\"button\"\n    (click)=\"toggleItem($event)\"\n  >\n    <cx-icon [type]=\"expanded ? 'CARET_DOWN' : 'CARET_RIGHT'\"></cx-icon>\n  </button>\n  <span class=\"text\" title=\"{{ combinedName }}\">{{ combinedName }}</span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.UnitTreeService }]; }, propDecorators: { depthLevel: [{
                type: HostBinding,
                args: ['style.--cx-depth-level']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWxpbmstY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saXN0L3RvZ2dsZS1saW5rL3RvZ2dsZS1saW5rLWNlbGwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlzdC90b2dnbGUtbGluay90b2dnbGUtbGluay1jZWxsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9oRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7Ozs7QUFRckUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGFBQWE7SUFNeEQsWUFDWSxNQUFpRCxFQUNqRCxlQUFnQztRQUUxQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFISixXQUFNLEdBQU4sTUFBTSxDQUEyQztRQUNqRCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFHNUMsQ0FBQztJQVZELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQVNELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQW1DLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFjLElBQUk7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDM0UsT0FBTyxHQUFjLENBQUM7SUFDeEIsQ0FBQzs7b0hBM0RVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDZKQ3JCcEMscWRBZ0JBOzJGREthLHVCQUF1QjtrQkFMbkMsU0FBUzsrQkFDRSx5QkFBeUIsbUJBRWxCLHVCQUF1QixDQUFDLE1BQU07c0lBSTNDLFVBQVU7c0JBRGIsV0FBVzt1QkFBQyx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVW5pdCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCMkJVbml0VHJlZU5vZGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7XG4gIE91dGxldENvbnRleHREYXRhLFxuICBUYWJsZURhdGFPdXRsZXRDb250ZXh0LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC90YWJsZS9jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVbml0VHJlZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91bml0LXRyZWUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy10b2dnbGUtbGluay1jZWxsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RvZ2dsZS1saW5rLWNlbGwuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlTGlua0NlbGxDb21wb25lbnQgZXh0ZW5kcyBDZWxsQ29tcG9uZW50IHtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS4tLWN4LWRlcHRoLWxldmVsJylcbiAgZ2V0IGRlcHRoTGV2ZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZGVwdGhMZXZlbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvdXRsZXQ6IE91dGxldENvbnRleHREYXRhPFRhYmxlRGF0YU91dGxldENvbnRleHQ+LFxuICAgIHByb3RlY3RlZCB1bml0VHJlZVNlcnZpY2U6IFVuaXRUcmVlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihvdXRsZXQpO1xuICB9XG5cbiAgZ2V0IGNvbWJpbmVkTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eSA/IGAke3RoaXMucHJvcGVydHl9ICgke3RoaXMuY291bnR9KWAgOiAnJztcbiAgfVxuXG4gIGdldCB0YWJJbmRleCgpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5leHBhbmRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgdGhlIG51bWJlciBvZiBkZXNjZW5kYW50c1xuICAgKi9cbiAgZ2V0IGNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLmNvdW50O1xuICB9XG5cbiAgdG9nZ2xlSXRlbShldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMudW5pdFRyZWVTZXJ2aWNlLnRvZ2dsZSh0aGlzLm1vZGVsIGFzIHVua25vd24gYXMgQjJCVW5pdFRyZWVOb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdHJlZSBpdGVtIHNob3VsZCBoYXZlIGEgdG9nZ2xlIG5hdmlnYXRpb24uXG4gICAqXG4gICAqIFRoZSB0b2dnbGUgbmF2aWdhdGlvbiBpcyB1c2VkIGluIGNhc2UgdGhlIHRyZWUgaXRlbSBoYXMgZGVzY2VuZGFudHMsXG4gICAqIGFuZCBpZiB0aGUgdHJlZSBpdGVtIGxldmVsIGlzIG5vdCBjb25maWd1cmVkIHRvIGJlIHNob3duIGFueXdheS5cbiAgICovXG4gIGdldCBpc1N3aXRjaGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY291bnQgPiAwO1xuICB9XG5cbiAgLy8gVE9ETzogbGV2ZXJhZ2UgdGhlc2UgbWV0aG9kcyB3aGVuIGF2YWlsYWJsZSBmcm9tIGZ1dHVyZSBQUi5cbiAgZ2V0IGhhc0l0ZW0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5pdGVtICYmIE9iamVjdC5rZXlzKHRoaXMuaXRlbSkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaXRlbSgpOiBCMkJVbml0IHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLm91dGxldC5jb250ZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyBfZmllbGQsIF9vcHRpb25zLCBfdHlwZSwgX2kxOG5Sb290LCAuLi5hbGwgfSA9IHRoaXMub3V0bGV0LmNvbnRleHQ7XG4gICAgcmV0dXJuIGFsbCBhcyBCMkJVbml0O1xuICB9XG59XG4iLCI8YVxuICAqbmdJZj1cImhhc0l0ZW1cIlxuICBjbGFzcz1cImhpZGUtZm9jdXMtYm9yZGVyXCJcbiAgW3JvdXRlckxpbmtdPVwieyBjeFJvdXRlOiByb3V0ZSwgcGFyYW1zOiByb3V0ZU1vZGVsIH0gfCBjeFVybFwiXG4gIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4+XG4gIDxidXR0b25cbiAgICAqbmdJZj1cImlzU3dpdGNoYWJsZVwiXG4gICAgY2xhc3M9XCJidXR0b24gdHJlZS1pdGVtLXRvZ2dsZVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgKGNsaWNrKT1cInRvZ2dsZUl0ZW0oJGV2ZW50KVwiXG4gID5cbiAgICA8Y3gtaWNvbiBbdHlwZV09XCJleHBhbmRlZCA/ICdDQVJFVF9ET1dOJyA6ICdDQVJFVF9SSUdIVCdcIj48L2N4LWljb24+XG4gIDwvYnV0dG9uPlxuICA8c3BhbiBjbGFzcz1cInRleHRcIiB0aXRsZT1cInt7IGNvbWJpbmVkTmFtZSB9fVwiPnt7IGNvbWJpbmVkTmFtZSB9fTwvc3Bhbj5cbjwvYT5cbiJdfQ==