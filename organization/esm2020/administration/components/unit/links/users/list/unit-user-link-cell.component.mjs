/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CellComponent } from '../../../../shared/table/cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../../../../shared/item.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/core";
export class UnitUserRolesCellComponent extends CellComponent {
    constructor(outlet, itemService) {
        super(outlet);
        this.outlet = outlet;
        this.itemService = itemService;
        this.unitKey$ = this.itemService.key$;
    }
    getRouterModel(uid) {
        return { ...this.outlet.context, uid };
    }
}
UnitUserRolesCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserRolesCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.ItemService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserRolesCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: UnitUserRolesCellComponent, selector: "cx-org-unit-user-link-cell", usesInheritance: true, ngImport: i0, template: `
    <a
      *ngIf="hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.roles' | cxTranslate }}
    </a>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i5.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserRolesCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-unit-user-link-cell',
                    template: `
    <a
      *ngIf="hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.roles' | cxTranslate }}
    </a>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.ItemService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWxpbmstY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy91c2Vycy9saXN0L3VuaXQtdXNlci1saW5rLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUW5FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7Ozs7OztBQWdCeEUsTUFBTSxPQUFPLDBCQUEyQixTQUFRLGFBQWE7SUFFM0QsWUFDWSxNQUFpRCxFQUNqRCxXQUFpQztRQUUzQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFISixXQUFNLEdBQU4sTUFBTSxDQUEyQztRQUNqRCxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7UUFIN0MsYUFBUSxHQUF1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQU1yRCxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVc7UUFDeEIsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7dUhBWFUsMEJBQTBCOzJHQUExQiwwQkFBMEIseUZBWjNCOzs7Ozs7Ozs7R0FTVDsyRkFHVSwwQkFBMEI7a0JBZHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCMkJVbml0IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE91dGxldENvbnRleHREYXRhLFxuICBUYWJsZURhdGFPdXRsZXRDb250ZXh0LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IENlbGxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvdGFibGUvY2VsbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC11c2VyLWxpbmstY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGFcbiAgICAgICpuZ0lmPVwiaGFzSXRlbSAmJiAodW5pdEtleSQgfCBhc3luYykgYXMgdWlkXCJcbiAgICAgIFtyb3V0ZXJMaW5rXT1cIlxuICAgICAgICB7IGN4Um91dGU6ICdvcmdVbml0VXNlclJvbGVzJywgcGFyYW1zOiBnZXRSb3V0ZXJNb2RlbCh1aWQpIH0gfCBjeFVybFxuICAgICAgXCJcbiAgICA+XG4gICAgICB7eyAnb3JnVXNlci5yb2xlcycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRVc2VyUm9sZXNDZWxsQ29tcG9uZW50IGV4dGVuZHMgQ2VsbENvbXBvbmVudCB7XG4gIHVuaXRLZXkkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLml0ZW1TZXJ2aWNlLmtleSQ7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvdXRsZXQ6IE91dGxldENvbnRleHREYXRhPFRhYmxlRGF0YU91dGxldENvbnRleHQ+LFxuICAgIHByb3RlY3RlZCBpdGVtU2VydmljZTogSXRlbVNlcnZpY2U8QjJCVW5pdD5cbiAgKSB7XG4gICAgc3VwZXIob3V0bGV0KTtcbiAgfVxuXG4gIGdldFJvdXRlck1vZGVsKHVpZDogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4geyAuLi50aGlzLm91dGxldC5jb250ZXh0LCB1aWQgfTtcbiAgfVxufVxuIl19