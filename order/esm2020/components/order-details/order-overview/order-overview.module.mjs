/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { OrderOverviewComponent } from './order-overview.component';
import * as i0 from "@angular/core";
export class OrderOverviewModule {
}
OrderOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, declarations: [OrderOverviewComponent], imports: [CommonModule, I18nModule, CardModule], exports: [OrderOverviewComponent] });
OrderOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, imports: [CommonModule, I18nModule, CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, CardModule],
                    declarations: [OrderOverviewComponent],
                    exports: [OrderOverviewComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItb3ZlcnZpZXcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1vdmVydmlldy9vcmRlci1vdmVydmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBT3BFLE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixpQkFIZixzQkFBc0IsYUFEM0IsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLGFBRXBDLHNCQUFzQjtpSEFFckIsbUJBQW1CLFlBSnBCLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVTsyRkFJbkMsbUJBQW1CO2tCQUwvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUJBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcmRNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT3JkZXJPdmVydmlld0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItb3ZlcnZpZXcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQ2FyZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW09yZGVyT3ZlcnZpZXdDb21wb25lbnRdLFxuICBleHBvcnRzOiBbT3JkZXJPdmVydmlld0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyT3ZlcnZpZXdNb2R1bGUge31cbiJdfQ==