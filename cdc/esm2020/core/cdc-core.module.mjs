/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { facadeProviders } from './auth/facade/facade-providers';
import { CdcEventModule } from './events/cdc-event.module';
import * as i0 from "@angular/core";
export class CdcCoreModule {
}
CdcCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, imports: [CdcAuthModule, CdcEventModule] });
CdcCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, providers: [...facadeProviders], imports: [CdcAuthModule, CdcEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdcAuthModule, CdcEventModule],
                    providers: [...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvY29yZS9jZGMtY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBTTNELE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsWUFIZCxhQUFhLEVBQUUsY0FBYzsyR0FHNUIsYUFBYSxhQUZiLENBQUMsR0FBRyxlQUFlLENBQUMsWUFEckIsYUFBYSxFQUFFLGNBQWM7MkZBRzVCLGFBQWE7a0JBSnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztvQkFDeEMsU0FBUyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7aUJBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkY0F1dGhNb2R1bGUgfSBmcm9tICcuL2F1dGgvY2RjLWF1dGgubW9kdWxlJztcbmltcG9ydCB7IGZhY2FkZVByb3ZpZGVycyB9IGZyb20gJy4vYXV0aC9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBDZGNFdmVudE1vZHVsZSB9IGZyb20gJy4vZXZlbnRzL2NkYy1ldmVudC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2RjQXV0aE1vZHVsZSwgQ2RjRXZlbnRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFsuLi5mYWNhZGVQcm92aWRlcnNdLFxufSlcbmV4cG9ydCBjbGFzcyBDZGNDb3JlTW9kdWxlIHt9XG4iXX0=