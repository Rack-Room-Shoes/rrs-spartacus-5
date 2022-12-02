/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { UserAccountEventModule } from './events/user-account-event.module';
import { USER_ACCOUNT_CORE_FEATURE, USER_ACCOUNT_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultUserAccountComponentsConfig() {
    const config = {
        featureModules: {
            [USER_ACCOUNT_FEATURE]: {
                cmsComponents: [
                    'LoginComponent',
                    'ReturningCustomerLoginComponent',
                    'ReturningCustomerRegisterComponent',
                ],
            },
            // by default core is bundled together with components
            [USER_ACCOUNT_CORE_FEATURE]: USER_ACCOUNT_FEATURE,
        },
    };
    return config;
}
export class UserAccountRootModule {
}
UserAccountRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: UserAccountRootModule, imports: [UserAccountEventModule] });
UserAccountRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountRootModule, providers: [provideDefaultConfigFactory(defaultUserAccountComponentsConfig)], imports: [UserAccountEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UserAccountEventModule],
                    providers: [provideDefaultConfigFactory(defaultUserAccountComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9yb290L3VzZXItYWNjb3VudC1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLG9CQUFvQixHQUNyQixNQUFNLGdCQUFnQixDQUFDOztBQUV4QiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLGtDQUFrQztJQUNoRCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ3RCLGFBQWEsRUFBRTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGlDQUFpQztvQkFDakMsb0NBQW9DO2lCQUNyQzthQUNGO1lBQ0Qsc0RBQXNEO1lBQ3RELENBQUMseUJBQXlCLENBQUMsRUFBRSxvQkFBb0I7U0FDbEQ7S0FDRixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQU1ELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixZQUh0QixzQkFBc0I7bUhBR3JCLHFCQUFxQixhQUZyQixDQUFDLDJCQUEyQixDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFEbEUsc0JBQXNCOzJGQUdyQixxQkFBcUI7a0JBSmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ2pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDLGtDQUFrQyxDQUFDLENBQUM7aUJBQzdFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXJBY2NvdW50RXZlbnRNb2R1bGUgfSBmcm9tICcuL2V2ZW50cy91c2VyLWFjY291bnQtZXZlbnQubW9kdWxlJztcbmltcG9ydCB7XG4gIFVTRVJfQUNDT1VOVF9DT1JFX0ZFQVRVUkUsXG4gIFVTRVJfQUNDT1VOVF9GRUFUVVJFLFxufSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5cbi8vIFRPRE86IElubGluZSB0aGlzIGZhY3Rvcnkgd2hlbiB3ZSBzdGFydCByZWxlYXNpbmcgSXZ5IGNvbXBpbGVkIGxpYnJhcmllc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRVc2VyQWNjb3VudENvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtVU0VSX0FDQ09VTlRfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogW1xuICAgICAgICAgICdMb2dpbkNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVybmluZ0N1c3RvbWVyTG9naW5Db21wb25lbnQnLFxuICAgICAgICAgICdSZXR1cm5pbmdDdXN0b21lclJlZ2lzdGVyQ29tcG9uZW50JyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICAvLyBieSBkZWZhdWx0IGNvcmUgaXMgYnVuZGxlZCB0b2dldGhlciB3aXRoIGNvbXBvbmVudHNcbiAgICAgIFtVU0VSX0FDQ09VTlRfQ09SRV9GRUFUVVJFXTogVVNFUl9BQ0NPVU5UX0ZFQVRVUkUsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1VzZXJBY2NvdW50RXZlbnRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFVzZXJBY2NvdW50Q29tcG9uZW50c0NvbmZpZyldLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQWNjb3VudFJvb3RNb2R1bGUge31cbiJdfQ==