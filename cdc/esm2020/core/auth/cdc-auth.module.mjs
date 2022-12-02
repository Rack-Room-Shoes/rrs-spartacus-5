/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@spartacus/core';
import { CdcUserAuthenticationTokenService } from './services/user-authentication/cdc-user-authentication-token.service';
import { CdcAuthStoreModule } from './store/cdc-auth-store.module';
import * as i0 from "@angular/core";
export class CdcAuthModule {
}
CdcAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, imports: [CommonModule, AuthModule, CdcAuthStoreModule] });
CdcAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, providers: [CdcUserAuthenticationTokenService], imports: [CommonModule, AuthModule, CdcAuthStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CdcAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AuthModule, CdcAuthStoreModule],
                    providers: [CdcUserAuthenticationTokenService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWF1dGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvY29yZS9hdXRoL2NkYy1hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQU1uRSxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLFlBSGQsWUFBWSxFQUFFLFVBQVUsRUFBRSxrQkFBa0I7MkdBRzNDLGFBQWEsYUFGYixDQUFDLGlDQUFpQyxDQUFDLFlBRHBDLFlBQVksRUFBRSxVQUFVLEVBQUUsa0JBQWtCOzJGQUczQyxhQUFhO2tCQUp6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3ZELFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2lCQUMvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDZGNVc2VyQXV0aGVudGljYXRpb25Ub2tlblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItYXV0aGVudGljYXRpb24vY2RjLXVzZXItYXV0aGVudGljYXRpb24tdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBDZGNBdXRoU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL2NkYy1hdXRoLXN0b3JlLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF1dGhNb2R1bGUsIENkY0F1dGhTdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0NkY1VzZXJBdXRoZW50aWNhdGlvblRva2VuU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENkY0F1dGhNb2R1bGUge31cbiJdfQ==