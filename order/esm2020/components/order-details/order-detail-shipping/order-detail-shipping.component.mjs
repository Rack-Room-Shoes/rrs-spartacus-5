/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../order-details.service";
import * as i2 from "@angular/common";
import * as i3 from "../order-overview/order-overview.component";
export class OrderDetailShippingComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailShippingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailShippingComponent, deps: [{ token: i1.OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailShippingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: OrderDetailShippingComponent, selector: "cx-order-details-shipping", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <cx-order-overview [order]=\"order\"></cx-order-overview>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.OrderOverviewComponent, selector: "cx-order-overview", inputs: ["order"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderDetailShippingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-shipping', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <cx-order-overview [order]=\"order\"></cx-order-overview>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLXNoaXBwaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlsLXNoaXBwaW5nL29yZGVyLWRldGFpbC1zaGlwcGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC1zaGlwcGluZy9vcmRlci1kZXRhaWwtc2hpcHBpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBUWxELE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsWUFBc0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDO0lBSWxFLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzRCxDQUFDOzt5SEFQVSw0QkFBNEI7NkdBQTVCLDRCQUE0QixpRUNkekMsa0lBR0E7MkZEV2EsNEJBQTRCO2tCQUp4QyxTQUFTOytCQUNFLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPcmRlckRldGFpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vb3JkZXItZGV0YWlscy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtb3JkZXItZGV0YWlscy1zaGlwcGluZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1kZXRhaWwtc2hpcHBpbmcuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckRldGFpbFNoaXBwaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG9yZGVyRGV0YWlsc1NlcnZpY2U6IE9yZGVyRGV0YWlsc1NlcnZpY2UpIHt9XG5cbiAgb3JkZXIkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcmRlciQgPSB0aGlzLm9yZGVyRGV0YWlsc1NlcnZpY2UuZ2V0T3JkZXJEZXRhaWxzKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJvcmRlciQgfCBhc3luYyBhcyBvcmRlclwiPlxuICA8Y3gtb3JkZXItb3ZlcnZpZXcgW29yZGVyXT1cIm9yZGVyXCI+PC9jeC1vcmRlci1vdmVydmlldz5cbjwvbmctY29udGFpbmVyPlxuIl19