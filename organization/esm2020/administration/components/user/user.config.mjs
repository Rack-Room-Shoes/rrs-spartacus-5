/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthGuard } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { PermissionDetailsCellComponent } from '../permission/details-cell/permission-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { RolesCellComponent } from '../shared/table/roles/roles-cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { UserGroupDetailsCellComponent } from '../user-group/details-cell/user-group-details-cell.component';
import { UserAssignedApproverListComponent } from './approvers/assigned/user-assigned-approver-list.component';
import { UserApproverListComponent } from './approvers/user-approver-list.component';
import { UserChangePasswordFormComponent } from './change-password-form/user-change-password-form.component';
import { UserDetailsCellComponent } from './details-cell/user-details-cell.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserFormComponent } from './form/user-form.component';
import { UserAssignedPermissionListComponent } from './permissions/assigned/user-assigned-permission-list.component';
import { UserPermissionListComponent } from './permissions/user-permission-list.component';
import { UserItemService } from './services/user-item.service';
import { UserListService } from './services/user-list.service';
import { UserRoutePageMetaResolver } from './services/user-route-page-meta.resolver';
import { UserUserGroupListComponent } from './user-groups';
import { UserAssignedUserGroupListComponent } from './user-groups/assigned/user-assigned-user-group-list.component';
export const userCmsConfig = {
    cmsComponents: {
        ManageUsersListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UserListService,
                },
                {
                    provide: ItemService,
                    useExisting: UserItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUser.breadcrumbs.list',
                            resolver: UserRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UserFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.userCode}`,
                        component: UserDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: `edit`,
                                component: UserFormComponent,
                            },
                            {
                                path: `change-password`,
                                component: UserChangePasswordFormComponent,
                            },
                            {
                                path: 'user-groups',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.userGroups' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedUserGroupListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserUserGroupListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'approvers',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.approvers' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedApproverListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserApproverListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'purchase-limits',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.permissions' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedPermissionListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserPermissionListComponent,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
export function userTableConfigFactory() {
    return userTableConfig;
}
const actions = {
    dataComponent: AssignCellComponent,
};
const pagination = {
    pageSize: MAX_OCC_INTEGER_VALUE,
};
export const userTableConfig = {
    table: {
        [OrganizationTableType.USER]: {
            cells: ['name', 'active', 'uid', 'roles', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                    roles: {
                        dataComponent: RolesCellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_APPROVERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_APPROVERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
        [OrganizationTableType.USER_USER_GROUPS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserGroupDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_USER_GROUPS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserGroupDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
        [OrganizationTableType.USER_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci91c2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3JELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzlHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUM3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RCxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUFDLEVBQUU7WUFDakQsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztZQUMxQixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsOEJBQThCO3FCQUM5QztvQkFDRCxPQUFPO2lCQUNSO2dCQUNELFVBQVU7YUFDWDtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQXV0aEd1YXJkLCBDbXNDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBUYWJsZUNvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBNQVhfT0NDX0lOVEVHRVJfVkFMVUUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkRldGFpbHNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vcGVybWlzc2lvbi9kZXRhaWxzLWNlbGwvcGVybWlzc2lvbi1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2xpc3QvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbGlzdC9saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVGFibGVUeXBlIH0gZnJvbSAnLi4vc2hhcmVkL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBc3NpZ25DZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3N1Yi1saXN0L2Fzc2lnbi1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3RpdmVMaW5rQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9hY3RpdmUtbGluay9hY3RpdmUtbGluay1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL2NlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFJvbGVzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC90YWJsZS9yb2xlcy9yb2xlcy1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGF0dXNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL3RhYmxlL3N0YXR1cy9zdGF0dXMtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVW5pdENlbGxDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvdGFibGUvdW5pdC91bml0LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJHcm91cERldGFpbHNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vdXNlci1ncm91cC9kZXRhaWxzLWNlbGwvdXNlci1ncm91cC1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJBc3NpZ25lZEFwcHJvdmVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vYXBwcm92ZXJzL2Fzc2lnbmVkL3VzZXItYXNzaWduZWQtYXBwcm92ZXItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckFwcHJvdmVyTGlzdENvbXBvbmVudCB9IGZyb20gJy4vYXBwcm92ZXJzL3VzZXItYXBwcm92ZXItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckNoYW5nZVBhc3N3b3JkRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY2hhbmdlLXBhc3N3b3JkLWZvcm0vdXNlci1jaGFuZ2UtcGFzc3dvcmQtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckRldGFpbHNDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWxzLWNlbGwvdXNlci1kZXRhaWxzLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWxzL3VzZXItZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0vdXNlci1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyQXNzaWduZWRQZXJtaXNzaW9uTGlzdENvbXBvbmVudCB9IGZyb20gJy4vcGVybWlzc2lvbnMvYXNzaWduZWQvdXNlci1hc3NpZ25lZC1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJQZXJtaXNzaW9uTGlzdENvbXBvbmVudCB9IGZyb20gJy4vcGVybWlzc2lvbnMvdXNlci1wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJJdGVtU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXNlci1pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUm91dGVQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlcic7XG5pbXBvcnQgeyBVc2VyVXNlckdyb3VwTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdXNlci1ncm91cHMnO1xuaW1wb3J0IHsgVXNlckFzc2lnbmVkVXNlckdyb3VwTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdXNlci1ncm91cHMvYXNzaWduZWQvdXNlci1hc3NpZ25lZC11c2VyLWdyb3VwLWxpc3QuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IHVzZXJDbXNDb25maWc6IENtc0NvbmZpZyA9IHtcbiAgY21zQ29tcG9uZW50czoge1xuICAgIE1hbmFnZVVzZXJzTGlzdENvbXBvbmVudDoge1xuICAgICAgY29tcG9uZW50OiBMaXN0Q29tcG9uZW50LFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMaXN0U2VydmljZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzogVXNlckxpc3RTZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6IFVzZXJJdGVtU2VydmljZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjaGlsZFJvdXRlczoge1xuICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjeFBhZ2VNZXRhOiB7XG4gICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdvcmdVc2VyLmJyZWFkY3J1bWJzLmxpc3QnLFxuICAgICAgICAgICAgICByZXNvbHZlcjogVXNlclJvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIGNvbXBvbmVudDogVXNlckZvcm1Db21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBgOiR7Uk9VVEVfUEFSQU1TLnVzZXJDb2RlfWAsXG4gICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVc2VyLmJyZWFkY3J1bWJzLmRldGFpbHMnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6IGBlZGl0YCxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJGb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogYGNoYW5nZS1wYXNzd29yZGAsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyQ2hhbmdlUGFzc3dvcmRGb3JtQ29tcG9uZW50LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3VzZXItZ3JvdXBzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVc2VyLmJyZWFkY3J1bWJzLnVzZXJHcm91cHMnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyQXNzaWduZWRVc2VyR3JvdXBMaXN0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2Fzc2lnbicsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVXNlclVzZXJHcm91cExpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnYXBwcm92ZXJzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVc2VyLmJyZWFkY3J1bWJzLmFwcHJvdmVycycgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJBc3NpZ25lZEFwcHJvdmVyTGlzdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICdhc3NpZ24nLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFVzZXJBcHByb3Zlckxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXRoOiAncHVyY2hhc2UtbGltaXRzJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICBjeFBhZ2VNZXRhOiB7IGJyZWFkY3J1bWI6ICdvcmdVc2VyLmJyZWFkY3J1bWJzLnBlcm1pc3Npb25zJyB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJycsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVXNlckFzc2lnbmVkUGVybWlzc2lvbkxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRoOiAnYXNzaWduJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBVc2VyUGVybWlzc2lvbkxpc3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBBZG1pbkd1YXJkXSxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJUYWJsZUNvbmZpZ0ZhY3RvcnkoKTogVGFibGVDb25maWcge1xuICByZXR1cm4gdXNlclRhYmxlQ29uZmlnO1xufVxuXG5jb25zdCBhY3Rpb25zID0ge1xuICBkYXRhQ29tcG9uZW50OiBBc3NpZ25DZWxsQ29tcG9uZW50LFxufTtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHtcbiAgcGFnZVNpemU6IE1BWF9PQ0NfSU5URUdFUl9WQUxVRSxcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VyVGFibGVDb25maWc6IFRhYmxlQ29uZmlnID0ge1xuICB0YWJsZToge1xuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl06IHtcbiAgICAgIGNlbGxzOiBbJ25hbWUnLCAnYWN0aXZlJywgJ3VpZCcsICdyb2xlcycsICd1bml0J10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogQWN0aXZlTGlua0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFN0YXR1c0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1aWQ6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IENlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICByb2xlczoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogUm9sZXNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdW5pdDoge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVW5pdENlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfQVBQUk9WRVJTXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVXNlckRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfQVNTSUdORURfQVBQUk9WRVJTXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVXNlckRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBbT3JnYW5pemF0aW9uVGFibGVUeXBlLlVTRVJfVVNFUl9HUk9VUFNdOiB7XG4gICAgICBjZWxsczogWyduYW1lJywgJ2FjdGlvbnMnXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgY2VsbHM6IHtcbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBkYXRhQ29tcG9uZW50OiBVc2VyR3JvdXBEZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0FTU0lHTkVEX1VTRVJfR1JPVVBTXToge1xuICAgICAgY2VsbHM6IFsnbmFtZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogVXNlckdyb3VwRGV0YWlsc0NlbGxDb21wb25lbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhY3Rpb25zLFxuICAgICAgICB9LFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgfSxcbiAgICB9LFxuICAgIFtPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUl9QRVJNSVNTSU9OU106IHtcbiAgICAgIGNlbGxzOiBbJ2NvZGUnLCAnYWN0aW9ucyddLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBjZWxsczoge1xuICAgICAgICAgIGNvZGU6IHtcbiAgICAgICAgICAgIGRhdGFDb21wb25lbnQ6IFBlcm1pc3Npb25EZXRhaWxzQ2VsbENvbXBvbmVudCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFjdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgW09yZ2FuaXphdGlvblRhYmxlVHlwZS5VU0VSX0FTU0lHTkVEX1BFUk1JU1NJT05TXToge1xuICAgICAgY2VsbHM6IFsnY29kZScsICdhY3Rpb25zJ10sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGNlbGxzOiB7XG4gICAgICAgICAgY29kZToge1xuICAgICAgICAgICAgZGF0YUNvbXBvbmVudDogUGVybWlzc2lvbkRldGFpbHNDZWxsQ29tcG9uZW50LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=