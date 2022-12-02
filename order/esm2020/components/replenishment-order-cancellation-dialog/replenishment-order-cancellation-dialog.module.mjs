/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';
import * as i0 from "@angular/core";
export class ReplenishmentOrderCancellationDialogModule {
}
ReplenishmentOrderCancellationDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderCancellationDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, declarations: [ReplenishmentOrderCancellationDialogComponent], imports: [CommonModule, I18nModule, KeyboardFocusModule], exports: [ReplenishmentOrderCancellationDialogComponent] });
ReplenishmentOrderCancellationDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, imports: [CommonModule, I18nModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, KeyboardFocusModule],
                    declarations: [ReplenishmentOrderCancellationDialogComponent],
                    exports: [ReplenishmentOrderCancellationDialogComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24tZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uLWRpYWxvZy9yZXBsZW5pc2htZW50LW9yZGVyLWNhbmNlbGxhdGlvbi1kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDZDQUE2QyxFQUFFLE1BQU0scURBQXFELENBQUM7O0FBT3BILE1BQU0sT0FBTywwQ0FBMEM7O3VJQUExQywwQ0FBMEM7d0lBQTFDLDBDQUEwQyxpQkFIdEMsNkNBQTZDLGFBRGxELFlBQVksRUFBRSxVQUFVLEVBQUUsbUJBQW1CLGFBRTdDLDZDQUE2Qzt3SUFFNUMsMENBQTBDLFlBSjNDLFlBQVksRUFBRSxVQUFVLEVBQUUsbUJBQW1COzJGQUk1QywwQ0FBMEM7a0JBTHRELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQztvQkFDeEQsWUFBWSxFQUFFLENBQUMsNkNBQTZDLENBQUM7b0JBQzdELE9BQU8sRUFBRSxDQUFDLDZDQUE2QyxDQUFDO2lCQUN6RCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGUsIEtleWJvYXJkRm9jdXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtSZXBsZW5pc2htZW50T3JkZXJDYW5jZWxsYXRpb25EaWFsb2dDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uRGlhbG9nQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uRGlhbG9nTW9kdWxlIHt9XG4iXX0=