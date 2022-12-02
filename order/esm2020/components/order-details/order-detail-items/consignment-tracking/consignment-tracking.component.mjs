/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, ViewChild, } from '@angular/core';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/order/root";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class ConsignmentTrackingComponent {
    constructor(orderHistoryFacade, launchDialogService, vcr) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.launchDialogService = launchDialogService;
        this.vcr = vcr;
        this.consignmentStatus = [
            'SHIPPED',
            'IN_TRANSIT',
            'DELIVERY_COMPLETED',
            'DELIVERY_REJECTED',
            'DELIVERING',
        ];
    }
    ngOnInit() {
        this.consignmentTracking$ =
            this.orderHistoryFacade.getConsignmentTracking();
    }
    openTrackingDialog(consignment) {
        if (consignment.code) {
            this.orderHistoryFacade.loadConsignmentTracking(this.orderCode, consignment.code);
        }
        let modalInstanceData = {
            tracking$: this.consignmentTracking$,
            shipDate: consignment.statusDate,
        };
        const dialog = this.launchDialogService.openDialog("CONSIGNMENT_TRACKING" /* LAUNCH_CALLER.CONSIGNMENT_TRACKING */, this.element, this.vcr, modalInstanceData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    ngOnDestroy() {
        this.orderHistoryFacade.clearConsignmentTracking();
    }
}
ConsignmentTrackingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsignmentTrackingComponent, deps: [{ token: i1.OrderHistoryFacade }, { token: i2.LaunchDialogService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ConsignmentTrackingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConsignmentTrackingComponent, selector: "cx-consignment-tracking", inputs: { consignment: "consignment", orderCode: "orderCode" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-action btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConsignmentTrackingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-consignment-tracking', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"consignment && consignment.status\">\n  <div *ngIf=\"consignmentStatus.includes(consignment.status)\">\n    <button\n      (click)=\"openTrackingDialog(consignment)\"\n      class=\"btn btn-action btn-track\"\n      type=\"button\"\n    >\n      {{ 'orderDetails.consignmentTracking.action' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }, { type: i2.LaunchDialogService }, { type: i0.ViewContainerRef }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }], consignment: [{
                type: Input
            }], orderCode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtaXRlbXMvY29uc2lnbm1lbnQtdHJhY2tpbmcvY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtaXRlbXMvY29uc2lnbm1lbnQtdHJhY2tpbmcvY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULEtBQUssRUFHTCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFPdEMsTUFBTSxPQUFPLDRCQUE0QjtJQWdCdkMsWUFDWSxrQkFBc0MsRUFDdEMsbUJBQXdDLEVBQ3hDLEdBQXFCO1FBRnJCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQWxCakMsc0JBQWlCLEdBQWE7WUFDNUIsU0FBUztZQUNULFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLFlBQVk7U0FDYixDQUFDO0lBYUMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsb0JBQW9CO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxXQUF3QjtRQUN6QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUM3QyxJQUFJLENBQUMsU0FBUyxFQUNkLFdBQVcsQ0FBQyxJQUFJLENBQ2pCLENBQUM7U0FDSDtRQUNELElBQUksaUJBQWlCLEdBQUc7WUFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDcEMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxVQUFVO1NBQ2pDLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxrRUFFaEQsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsR0FBRyxFQUNSLGlCQUFpQixDQUNsQixDQUFDO1FBRUYsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzt5SEFyRFUsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsbU9DOUJ6Qyx1WEFXQTsyRkRtQmEsNEJBQTRCO2tCQUx4QyxTQUFTOytCQUNFLHlCQUF5QixtQkFFbEIsdUJBQXVCLENBQUMsTUFBTTswS0FVekIsT0FBTztzQkFBNUIsU0FBUzt1QkFBQyxTQUFTO2dCQUdwQixXQUFXO3NCQURWLEtBQUs7Z0JBR04sU0FBUztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uc2lnbm1lbnQsXG4gIENvbnNpZ25tZW50VHJhY2tpbmcsXG4gIE9yZGVySGlzdG9yeUZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IExhdW5jaERpYWxvZ1NlcnZpY2UsIExBVU5DSF9DQUxMRVIgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY29uc2lnbm1lbnQtdHJhY2tpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uc2lnbm1lbnRUcmFja2luZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uc2lnbm1lbnRTdGF0dXM6IHN0cmluZ1tdID0gW1xuICAgICdTSElQUEVEJyxcbiAgICAnSU5fVFJBTlNJVCcsXG4gICAgJ0RFTElWRVJZX0NPTVBMRVRFRCcsXG4gICAgJ0RFTElWRVJZX1JFSkVDVEVEJyxcbiAgICAnREVMSVZFUklORycsXG4gIF07XG4gIEBWaWV3Q2hpbGQoJ2VsZW1lbnQnKSBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpXG4gIGNvbnNpZ25tZW50OiBDb25zaWdubWVudDtcbiAgQElucHV0KClcbiAgb3JkZXJDb2RlOiBzdHJpbmc7XG4gIGNvbnNpZ25tZW50VHJhY2tpbmckOiBPYnNlcnZhYmxlPENvbnNpZ25tZW50VHJhY2tpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBvcmRlckhpc3RvcnlGYWNhZGU6IE9yZGVySGlzdG9yeUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdmNyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbnNpZ25tZW50VHJhY2tpbmckID1cbiAgICAgIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlLmdldENvbnNpZ25tZW50VHJhY2tpbmcoKTtcbiAgfVxuXG4gIG9wZW5UcmFja2luZ0RpYWxvZyhjb25zaWdubWVudDogQ29uc2lnbm1lbnQpIHtcbiAgICBpZiAoY29uc2lnbm1lbnQuY29kZSkge1xuICAgICAgdGhpcy5vcmRlckhpc3RvcnlGYWNhZGUubG9hZENvbnNpZ25tZW50VHJhY2tpbmcoXG4gICAgICAgIHRoaXMub3JkZXJDb2RlLFxuICAgICAgICBjb25zaWdubWVudC5jb2RlXG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgbW9kYWxJbnN0YW5jZURhdGEgPSB7XG4gICAgICB0cmFja2luZyQ6IHRoaXMuY29uc2lnbm1lbnRUcmFja2luZyQsXG4gICAgICBzaGlwRGF0ZTogY29uc2lnbm1lbnQuc3RhdHVzRGF0ZSxcbiAgICB9O1xuXG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2coXG4gICAgICBMQVVOQ0hfQ0FMTEVSLkNPTlNJR05NRU5UX1RSQUNLSU5HLFxuICAgICAgdGhpcy5lbGVtZW50LFxuICAgICAgdGhpcy52Y3IsXG4gICAgICBtb2RhbEluc3RhbmNlRGF0YVxuICAgICk7XG5cbiAgICBpZiAoZGlhbG9nKSB7XG4gICAgICBkaWFsb2cucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm9yZGVySGlzdG9yeUZhY2FkZS5jbGVhckNvbnNpZ25tZW50VHJhY2tpbmcoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnNpZ25tZW50ICYmIGNvbnNpZ25tZW50LnN0YXR1c1wiPlxuICA8ZGl2ICpuZ0lmPVwiY29uc2lnbm1lbnRTdGF0dXMuaW5jbHVkZXMoY29uc2lnbm1lbnQuc3RhdHVzKVwiPlxuICAgIDxidXR0b25cbiAgICAgIChjbGljayk9XCJvcGVuVHJhY2tpbmdEaWFsb2coY29uc2lnbm1lbnQpXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1hY3Rpb24gYnRuLXRyYWNrXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgID5cbiAgICAgIHt7ICdvcmRlckRldGFpbHMuY29uc2lnbm1lbnRUcmFja2luZy5hY3Rpb24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==