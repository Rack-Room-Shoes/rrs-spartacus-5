/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadStatus, } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { filter, first, switchMap, take } from 'rxjs/operators';
import { CellComponent } from '../table/cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../item.service";
import * as i3 from "../message/services/message.service";
import * as i4 from "../list/list.service";
import * as i5 from "@angular/common";
export class AssignCellComponent extends CellComponent {
    constructor(outlet, organizationItemService, messageService, organizationSubListService) {
        super(outlet);
        this.outlet = outlet;
        this.organizationItemService = organizationItemService;
        this.messageService = messageService;
        this.organizationSubListService = organizationSubListService;
    }
    get isAssigned() {
        return this.item?.selected;
    }
    toggleAssign() {
        const isAssigned = this.isAssigned;
        this.organizationItemService.key$
            .pipe(first(), switchMap((key) => isAssigned
            ? this.unassign?.(key, this.link)
            : this.assign(key, this.link)), take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => this.notify(data.item, isAssigned ? 'unassigned' : 'assigned'));
    }
    assign(key, linkKey) {
        return (this.organizationSubListService.assign?.(key, linkKey) ?? of());
    }
    unassign(key, linkKey) {
        return (this.organizationSubListService.unassign?.(key, linkKey) ?? of());
    }
    /**
     * Returns the key for the linked object.
     *
     * At the moment, we're using a generic approach to assign objects,
     * but the object do not have a normalized shape. Therefor, we need
     * to evaluate the context to return the right key for the associated
     * item.
     */
    get link() {
        return (this.outlet.context.code ??
            this.outlet.context.customerId ??
            this.outlet.context.uid);
    }
    notify(item, state) {
        this.messageService.add({
            message: {
                key: `${this.organizationSubListService.viewType}.${state}`,
                params: {
                    item,
                },
            },
        });
    }
}
AssignCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AssignCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.ItemService }, { token: i3.MessageService }, { token: i4.ListService }], target: i0.ɵɵFactoryTarget.Component });
AssignCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: AssignCellComponent, selector: "cx-org-assign-cell", usesInheritance: true, ngImport: i0, template: `
    <button type="button" *ngIf="hasItem" (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `, isInline: true, dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AssignCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-assign-cell',
                    template: `
    <button type="button" *ngIf="hasItem" (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.ItemService }, { type: i3.MessageService }, { type: i4.ListService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9zdWItbGlzdC9hc3NpZ24tY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUNMLFVBQVUsR0FFWCxNQUFNLDZDQUE2QyxDQUFDO0FBS3JELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQVl4RCxNQUFNLE9BQU8sbUJBQXdDLFNBQVEsYUFBYTtJQUN4RSxZQUNZLE1BQWlELEVBQ2pELHVCQUF1QyxFQUN2QyxjQUE4QixFQUM5QiwwQkFBMEM7UUFFcEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTEosV0FBTSxHQUFOLE1BQU0sQ0FBMkM7UUFDakQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFnQjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUFnQjtJQUd0RCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBUSxJQUFJLENBQUMsSUFBWSxFQUFFLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUk7YUFDOUIsSUFBSSxDQUNILEtBQUssRUFBRSxFQUNQLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2hCLFVBQVU7WUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2hDLEVBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLE1BQU0sQ0FDSixDQUFDLElBQStCLEVBQUUsRUFBRSxDQUNsQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQ3JDLENBQ0Y7YUFDQSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUMvRCxDQUFDO0lBQ04sQ0FBQztJQUVTLE1BQU0sQ0FDZCxHQUFXLEVBQ1gsT0FBZTtRQUVmLE9BQU8sQ0FDSixJQUFJLENBQUMsMEJBQWdELENBQUMsTUFBTSxFQUFFLENBQzdELEdBQUcsRUFDSCxPQUFPLENBQ1IsSUFBSSxFQUFFLEVBQUUsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVTLFFBQVEsQ0FDaEIsR0FBVyxFQUNYLE9BQWU7UUFFZixPQUFPLENBQ0osSUFBSSxDQUFDLDBCQUFnRCxDQUFDLFFBQVEsRUFBRSxDQUMvRCxHQUFHLEVBQ0gsT0FBTyxDQUNSLElBQUksRUFBRSxFQUFFLENBQ1YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBYyxJQUFJO1FBQ2hCLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN4QixDQUFDO0lBQ0osQ0FBQztJQUVTLE1BQU0sQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsSUFBSSxLQUFLLEVBQUU7Z0JBQzNELE1BQU0sRUFBRTtvQkFDTixJQUFJO2lCQUNMO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztnSEFwRlUsbUJBQW1CO29HQUFuQixtQkFBbUIsaUZBUHBCOzs7O0dBSVQ7MkZBR1UsbUJBQW1CO2tCQVQvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRTs7OztHQUlUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIExvYWRTdGF0dXMsXG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3V0bGV0Q29udGV4dERhdGEsXG4gIFRhYmxlRGF0YU91dGxldENvbnRleHQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4uL21lc3NhZ2Uvc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VJdGVtIH0gZnJvbSAnLi4vb3JnYW5pemF0aW9uLm1vZGVsJztcbmltcG9ydCB7IENlbGxDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS9jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJMaXN0U2VydmljZSB9IGZyb20gJy4vc3ViLWxpc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZy1hc3NpZ24tY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKm5nSWY9XCJoYXNJdGVtXCIgKGNsaWNrKT1cInRvZ2dsZUFzc2lnbigpXCIgY2xhc3M9XCJsaW5rXCI+XG4gICAgICB7eyBpc0Fzc2lnbmVkID8gJ3VuYXNzaWduJyA6ICdhc3NpZ24nIH19XG4gICAgPC9idXR0b24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NpZ25DZWxsQ29tcG9uZW50PFQgZXh0ZW5kcyBCYXNlSXRlbT4gZXh0ZW5kcyBDZWxsQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG91dGxldDogT3V0bGV0Q29udGV4dERhdGE8VGFibGVEYXRhT3V0bGV0Q29udGV4dD4sXG4gICAgcHJvdGVjdGVkIG9yZ2FuaXphdGlvbkl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZTxUPixcbiAgICBwcm90ZWN0ZWQgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmdhbml6YXRpb25TdWJMaXN0U2VydmljZTogTGlzdFNlcnZpY2U8VD5cbiAgKSB7XG4gICAgc3VwZXIob3V0bGV0KTtcbiAgfVxuXG4gIGdldCBpc0Fzc2lnbmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5pdGVtIGFzIGFueSk/LnNlbGVjdGVkO1xuICB9XG5cbiAgdG9nZ2xlQXNzaWduKCkge1xuICAgIGNvbnN0IGlzQXNzaWduZWQgPSB0aGlzLmlzQXNzaWduZWQ7XG4gICAgdGhpcy5vcmdhbml6YXRpb25JdGVtU2VydmljZS5rZXkkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlyc3QoKSxcbiAgICAgICAgc3dpdGNoTWFwKChrZXkpID0+XG4gICAgICAgICAgaXNBc3NpZ25lZFxuICAgICAgICAgICAgPyB0aGlzLnVuYXNzaWduPy4oa2V5LCB0aGlzLmxpbmspXG4gICAgICAgICAgICA6IHRoaXMuYXNzaWduKGtleSwgdGhpcy5saW5rKVxuICAgICAgICApLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgKGRhdGE6IE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4pID0+XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9PT0gTG9hZFN0YXR1cy5TVUNDRVNTXG4gICAgICAgIClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+XG4gICAgICAgIHRoaXMubm90aWZ5KGRhdGEuaXRlbSwgaXNBc3NpZ25lZCA/ICd1bmFzc2lnbmVkJyA6ICdhc3NpZ25lZCcpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzc2lnbihcbiAgICBrZXk6IHN0cmluZyxcbiAgICBsaW5rS2V5OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFQ+PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLm9yZ2FuaXphdGlvblN1Ykxpc3RTZXJ2aWNlIGFzIFN1Ykxpc3RTZXJ2aWNlPFQ+KS5hc3NpZ24/LihcbiAgICAgICAga2V5LFxuICAgICAgICBsaW5rS2V5XG4gICAgICApID8/IG9mKClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVuYXNzaWduKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGxpbmtLZXk6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+IHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMub3JnYW5pemF0aW9uU3ViTGlzdFNlcnZpY2UgYXMgU3ViTGlzdFNlcnZpY2U8VD4pLnVuYXNzaWduPy4oXG4gICAgICAgIGtleSxcbiAgICAgICAgbGlua0tleVxuICAgICAgKSA/PyBvZigpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBrZXkgZm9yIHRoZSBsaW5rZWQgb2JqZWN0LlxuICAgKlxuICAgKiBBdCB0aGUgbW9tZW50LCB3ZSdyZSB1c2luZyBhIGdlbmVyaWMgYXBwcm9hY2ggdG8gYXNzaWduIG9iamVjdHMsXG4gICAqIGJ1dCB0aGUgb2JqZWN0IGRvIG5vdCBoYXZlIGEgbm9ybWFsaXplZCBzaGFwZS4gVGhlcmVmb3IsIHdlIG5lZWRcbiAgICogdG8gZXZhbHVhdGUgdGhlIGNvbnRleHQgdG8gcmV0dXJuIHRoZSByaWdodCBrZXkgZm9yIHRoZSBhc3NvY2lhdGVkXG4gICAqIGl0ZW0uXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGxpbmsoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5vdXRsZXQuY29udGV4dC5jb2RlID8/XG4gICAgICB0aGlzLm91dGxldC5jb250ZXh0LmN1c3RvbWVySWQgPz9cbiAgICAgIHRoaXMub3V0bGV0LmNvbnRleHQudWlkXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBub3RpZnkoaXRlbTogYW55LCBzdGF0ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGQoe1xuICAgICAgbWVzc2FnZToge1xuICAgICAgICBrZXk6IGAke3RoaXMub3JnYW5pemF0aW9uU3ViTGlzdFNlcnZpY2Uudmlld1R5cGV9LiR7c3RhdGV9YCxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgaXRlbSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==