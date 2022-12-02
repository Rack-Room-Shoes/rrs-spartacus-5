/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { B2BUserConnector } from './connectors/b2b-user/b2b-user.connector';
import { BudgetConnector } from './connectors/budget/budget.connector';
import { CostCenterConnector } from './connectors/cost-center/cost-center.connector';
import { OrgUnitConnector } from './connectors/org-unit/org-unit.connector';
import { PermissionConnector } from './connectors/permission/permission.connector';
import { UserGroupConnector } from './connectors/user-group/user-group.connector';
import { OrganizationBadRequestHandler } from './http-interceptors/bad-request/bad-request.handler';
import { OrganizationConflictHandler } from './http-interceptors/conflict/conflict.handler';
import { OrganizationPageMetaModule } from './services/organization-page-meta.module';
import { OrganizationStoreModule } from './store/organization-store.module';
import * as i0 from "@angular/core";
export class AdministrationCoreModule {
    static forRoot() {
        return {
            ngModule: AdministrationCoreModule,
            providers: [
                BudgetConnector,
                OrgUnitConnector,
                UserGroupConnector,
                PermissionConnector,
                CostCenterConnector,
                B2BUserConnector,
            ],
        };
    }
}
AdministrationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, imports: [OrganizationPageMetaModule, OrganizationStoreModule] });
AdministrationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, providers: [
        {
            provide: HttpErrorHandler,
            useExisting: OrganizationConflictHandler,
            multi: true,
        },
        {
            provide: HttpErrorHandler,
            useExisting: OrganizationBadRequestHandler,
            multi: true,
        },
    ], imports: [OrganizationPageMetaModule, OrganizationStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrganizationPageMetaModule, OrganizationStoreModule],
                    providers: [
                        {
                            provide: HttpErrorHandler,
                            useExisting: OrganizationConflictHandler,
                            multi: true,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: OrganizationBadRequestHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW5pc3RyYXRpb24tY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvYWRtaW5pc3RyYXRpb24tY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUM1RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFpQjVFLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZixnQkFBZ0I7Z0JBQ2hCLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixtQkFBbUI7Z0JBQ25CLGdCQUFnQjthQUNqQjtTQUNGLENBQUM7SUFDSixDQUFDOztxSEFiVSx3QkFBd0I7c0hBQXhCLHdCQUF3QixZQWR6QiwwQkFBMEIsRUFBRSx1QkFBdUI7c0hBY2xELHdCQUF3QixhQWJ4QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFaUywwQkFBMEIsRUFBRSx1QkFBdUI7MkZBY2xELHdCQUF3QjtrQkFmcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx1QkFBdUIsQ0FBQztvQkFDOUQsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSwyQkFBMkI7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSw2QkFBNkI7NEJBQzFDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlckNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9iMmItdXNlci9iMmItdXNlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgQnVkZ2V0Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2J1ZGdldC9idWRnZXQuY29ubmVjdG9yJztcbmltcG9ydCB7IENvc3RDZW50ZXJDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY29zdC1jZW50ZXIvY29zdC1jZW50ZXIuY29ubmVjdG9yJztcbmltcG9ydCB7IE9yZ1VuaXRDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvb3JnLXVuaXQvb3JnLXVuaXQuY29ubmVjdG9yJztcbmltcG9ydCB7IFBlcm1pc3Npb25Db25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvcGVybWlzc2lvbi9wZXJtaXNzaW9uLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBVc2VyR3JvdXBDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvdXNlci1ncm91cC91c2VyLWdyb3VwLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25CYWRSZXF1ZXN0SGFuZGxlciB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvcnMvYmFkLXJlcXVlc3QvYmFkLXJlcXVlc3QuaGFuZGxlcic7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25Db25mbGljdEhhbmRsZXIgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2NvbmZsaWN0L2NvbmZsaWN0LmhhbmRsZXInO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uUGFnZU1ldGFNb2R1bGUgfSBmcm9tICcuL3NlcnZpY2VzL29yZ2FuaXphdGlvbi1wYWdlLW1ldGEubW9kdWxlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblN0b3JlTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS9vcmdhbml6YXRpb24tc3RvcmUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW09yZ2FuaXphdGlvblBhZ2VNZXRhTW9kdWxlLCBPcmdhbml6YXRpb25TdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEh0dHBFcnJvckhhbmRsZXIsXG4gICAgICB1c2VFeGlzdGluZzogT3JnYW5pemF0aW9uQ29uZmxpY3RIYW5kbGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBIdHRwRXJyb3JIYW5kbGVyLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9yZ2FuaXphdGlvbkJhZFJlcXVlc3RIYW5kbGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5pc3RyYXRpb25Db3JlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBZG1pbmlzdHJhdGlvbkNvcmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFkbWluaXN0cmF0aW9uQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBCdWRnZXRDb25uZWN0b3IsXG4gICAgICAgIE9yZ1VuaXRDb25uZWN0b3IsXG4gICAgICAgIFVzZXJHcm91cENvbm5lY3RvcixcbiAgICAgICAgUGVybWlzc2lvbkNvbm5lY3RvcixcbiAgICAgICAgQ29zdENlbnRlckNvbm5lY3RvcixcbiAgICAgICAgQjJCVXNlckNvbm5lY3RvcixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19