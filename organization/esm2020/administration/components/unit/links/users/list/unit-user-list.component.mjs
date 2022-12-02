/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { of } from 'rxjs';
import { ListService } from '../../../../shared/list/list.service';
import { UnitUserListService } from '../services/unit-user-list.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/current-unit.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../../shared/sub-list/sub-list.component";
import * as i4 from "../../../../shared/detail/disable-info/disable-info.component";
import * as i5 from "@angular/common";
import * as i6 from "@spartacus/core";
export class UnitUserListComponent {
    constructor(currentUnitService) {
        this.currentUnitService = currentUnitService;
        this.routerKey = ROUTE_PARAMS.userCode;
        this.unit$ = this.currentUnitService
            ? this.currentUnitService.item$
            : of({ active: true });
    }
}
UnitUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserListComponent, deps: [{ token: i1.CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: UnitUserListComponent, selector: "cx-org-unit-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitUserListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list key=\"customerId\" [routerKey]=\"routerKey\" [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitUsers\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "component", type: i4.DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitUserListService,
                        },
                    ], template: "<cx-org-sub-list key=\"customerId\" [routerKey]=\"routerKey\" [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitUsers\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvdXNlcnMvbGlzdC91bml0LXVzZXItbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy91c2Vycy9saXN0L3VuaXQtdXNlci1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7Ozs7QUFjekUsTUFBTSxPQUFPLHFCQUFxQjtJQU9oQyxZQUFzQixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQU41RCxjQUFTLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUVsQyxVQUFLLEdBQW9DLElBQUksQ0FBQyxrQkFBa0I7WUFDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO1lBQy9CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVzQyxDQUFDOztrSEFQckQscUJBQXFCO3NHQUFyQixxQkFBcUIsNkZBUHJCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixXQUFXLEVBQUUsbUJBQW1CO1NBQ2pDO0tBQ0YsMEJDeEJILHVmQW9CQTsyRkRNYSxxQkFBcUI7a0JBWmpDLFNBQVM7K0JBQ0UsdUJBQXVCLG1CQUVoQix1QkFBdUIsQ0FBQyxNQUFNLFFBQ3pDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGFBQ3ZCO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixXQUFXLEVBQUUsbUJBQW1CO3lCQUNqQztxQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVuaXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVuaXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY3VycmVudC11bml0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdFVzZXJMaXN0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3VuaXQtdXNlci1saXN0LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC11c2VyLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdW5pdC11c2VyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeyBjbGFzczogJ2NvbnRlbnQtd3JhcHBlcicgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVW5pdFVzZXJMaXN0U2VydmljZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0VXNlckxpc3RDb21wb25lbnQge1xuICByb3V0ZXJLZXkgPSBST1VURV9QQVJBTVMudXNlckNvZGU7XG5cbiAgdW5pdCQ6IE9ic2VydmFibGU8QjJCVW5pdCB8IHVuZGVmaW5lZD4gPSB0aGlzLmN1cnJlbnRVbml0U2VydmljZVxuICAgID8gdGhpcy5jdXJyZW50VW5pdFNlcnZpY2UuaXRlbSRcbiAgICA6IG9mKHsgYWN0aXZlOiB0cnVlIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjdXJyZW50VW5pdFNlcnZpY2U6IEN1cnJlbnRVbml0U2VydmljZSkge31cbn1cbiIsIjxjeC1vcmctc3ViLWxpc3Qga2V5PVwiY3VzdG9tZXJJZFwiIFtyb3V0ZXJLZXldPVwicm91dGVyS2V5XCIgW3Nob3dIaW50XT1cInRydWVcIj5cbiAgPGFcbiAgICBhY3Rpb25zXG4gICAgY2xhc3M9XCJsaW5rXCJcbiAgICByb3V0ZXJMaW5rPVwiY3JlYXRlXCJcbiAgICBbY2xhc3MuZGlzYWJsZWRdPVwiISh1bml0JCB8IGFzeW5jKT8uYWN0aXZlXCJcbiAgPlxuICAgIHt7ICdvcmdhbml6YXRpb24uY3JlYXRlJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYT5cbiAgPGN4LW9yZy1kaXNhYmxlLWluZm9cbiAgICBpbmZvXG4gICAgaTE4blJvb3Q9XCJvcmdVbml0VXNlcnNcIlxuICAgIFtkaXNwbGF5SW5mb0NvbmZpZ109XCJ7XG4gICAgICBkaXNhYmxlZENyZWF0ZTogdHJ1ZSxcbiAgICAgIGRpc2FibGVkRW5hYmxlOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkRWRpdDogZmFsc2VcbiAgICB9XCJcbiAgPlxuICA8L2N4LW9yZy1kaXNhYmxlLWluZm8+XG48L2N4LW9yZy1zdWItbGlzdD5cbiJdfQ==