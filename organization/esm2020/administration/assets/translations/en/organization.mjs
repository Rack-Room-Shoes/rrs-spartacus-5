/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { orgBudget, orgBudgetAssignedCostCenters } from './budget.i18n';
import { orgCostCenter, orgCostCenterAssignedBudgets, orgCostCenterBudgets, } from './cost-center.i18n';
import { orgPurchaseLimit } from './permission.i18n';
import { orgUnit, orgUnitAddress, orgUnitApprovers, orgUnitAssignedApprovers, orgUnitAssignedRoles, orgUnitAssignedUsers, orgUnitChildren, orgUnitCostCenters, orgUnitUserRoles, orgUnitUsers, } from './units.i18n';
import { orgUserGroup, orgUserGroupAssignedPermissions, orgUserGroupAssignedUsers, orgUserGroupPermissions, orgUserGroupUsers, } from './user-group.i18n';
import { orgUser, orgUserApprovers, orgUserAssignedApprovers, orgUserAssignedPermissions, orgUserAssignedUserGroups, orgUserPermissions, orgUserUserGroups, } from './user.i18n';
/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */
export const organization = {
    organization: {
        enabled: 'Active',
        disabled: 'Disabled',
        enable: 'Enable',
        disable: 'Disable',
        name: 'Name',
        code: 'Code',
        done: 'done',
        cancel: 'Cancel',
        add: 'Add',
        create: 'Create {{name}}',
        edit: 'Edit',
        save: 'Save {{name}}',
        delete: 'Delete',
        assign: 'Manage',
        active: 'Active',
        status: 'Status',
        details: 'Details',
        messages: {
            emptyList: 'The list is empty',
        },
        userRoles: {
            b2bcustomergroup: 'Customer',
            b2bapprovergroup: 'Approver',
            b2bmanagergroup: 'Manager',
            b2badmingroup: 'Admin',
        },
        breadcrumb: 'Organization',
        notification: {
            noSufficientPermissions: 'No sufficient permissions to access this page',
            notExist: 'This item does not exist',
            disabled: 'You cannot edit a disabled item',
        },
        confirmation: {
            cancel: 'CANCEL',
            confirm: 'CONFIRM',
            disable: 'DISABLE',
            delete: 'DELETE',
        },
        httpHandlers: {
            conflict: {
                budget: 'Budget with code {{ code }} already exists.',
                costCenter: 'Cost center with code {{ code }} already exists.',
                unit: 'Organizational unit with uid {{ code }} already exists.',
                user: 'User with email {{ code }} already exists',
                userGroup: 'User Group with id {{ code }} already exists',
                permission: 'Approval Permission with code {{ code }} already exists.',
                unknown: 'Server validation error.',
            },
        },
    },
    // sub feature labels are added below
    orgCostCenter,
    orgCostCenterBudgets,
    orgCostCenterAssignedBudgets,
    orgBudget,
    orgBudgetAssignedCostCenters,
    orgUnit,
    orgUnitChildren,
    orgUnitApprovers,
    orgUnitAssignedApprovers,
    orgUnitAssignedRoles,
    orgUnitUsers,
    orgUnitUserRoles,
    orgUnitAssignedUsers,
    orgUnitCostCenters,
    orgUnitAddress,
    orgUserGroup,
    orgUserGroupUsers,
    orgUserGroupAssignedUsers,
    orgUserGroupPermissions,
    orgUserGroupAssignedPermissions,
    orgUser,
    orgUserUserGroups,
    orgUserAssignedUserGroups,
    orgUserApprovers,
    orgUserAssignedApprovers,
    orgUserPermissions,
    orgUserAssignedPermissions,
    orgPurchaseLimit,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL29yZ2FuaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsYUFBYSxFQUNiLDRCQUE0QixFQUM1QixvQkFBb0IsR0FDckIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsT0FBTyxFQUNQLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLG9CQUFvQixFQUNwQixvQkFBb0IsRUFDcEIsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsWUFBWSxHQUNiLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFDTCxZQUFZLEVBQ1osK0JBQStCLEVBQy9CLHlCQUF5QixFQUN6Qix1QkFBdUIsRUFDdkIsaUJBQWlCLEdBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUNMLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLDBCQUEwQixFQUMxQix5QkFBeUIsRUFDekIsa0JBQWtCLEVBQ2xCLGlCQUFpQixHQUNsQixNQUFNLGFBQWEsQ0FBQztBQUVyQjs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHO0lBQzFCLFlBQVksRUFBRTtRQUNaLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLFFBQVEsRUFBRSxVQUFVO1FBRXBCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxTQUFTO1FBRWxCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFFWixJQUFJLEVBQUUsTUFBTTtRQUVaLE1BQU0sRUFBRSxRQUFRO1FBRWhCLEdBQUcsRUFBRSxLQUFLO1FBQ1YsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxRQUFRO1FBRWhCLE1BQU0sRUFBRSxRQUFRO1FBRWhCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxTQUFTO1FBRWxCLFFBQVEsRUFBRTtZQUNSLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0I7UUFDRCxTQUFTLEVBQUU7WUFDVCxnQkFBZ0IsRUFBRSxVQUFVO1lBQzVCLGdCQUFnQixFQUFFLFVBQVU7WUFDNUIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsYUFBYSxFQUFFLE9BQU87U0FDdkI7UUFFRCxVQUFVLEVBQUUsY0FBYztRQUUxQixZQUFZLEVBQUU7WUFDWix1QkFBdUIsRUFBRSwrQ0FBK0M7WUFDeEUsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxRQUFRLEVBQUUsaUNBQWlDO1NBQzVDO1FBRUQsWUFBWSxFQUFFO1lBQ1osTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLFFBQVE7U0FDakI7UUFFRCxZQUFZLEVBQUU7WUFDWixRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLDZDQUE2QztnQkFDckQsVUFBVSxFQUFFLGtEQUFrRDtnQkFDOUQsSUFBSSxFQUFFLHlEQUF5RDtnQkFDL0QsSUFBSSxFQUFFLDJDQUEyQztnQkFDakQsU0FBUyxFQUFFLDhDQUE4QztnQkFDekQsVUFBVSxFQUFFLDBEQUEwRDtnQkFDdEUsT0FBTyxFQUFFLDBCQUEwQjthQUNwQztTQUNGO0tBQ0Y7SUFFRCxxQ0FBcUM7SUFDckMsYUFBYTtJQUNiLG9CQUFvQjtJQUNwQiw0QkFBNEI7SUFDNUIsU0FBUztJQUNULDRCQUE0QjtJQUM1QixPQUFPO0lBQ1AsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixjQUFjO0lBRWQsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLCtCQUErQjtJQUMvQixPQUFPO0lBQ1AsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0NBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBvcmdCdWRnZXQsIG9yZ0J1ZGdldEFzc2lnbmVkQ29zdENlbnRlcnMgfSBmcm9tICcuL2J1ZGdldC5pMThuJztcbmltcG9ydCB7XG4gIG9yZ0Nvc3RDZW50ZXIsXG4gIG9yZ0Nvc3RDZW50ZXJBc3NpZ25lZEJ1ZGdldHMsXG4gIG9yZ0Nvc3RDZW50ZXJCdWRnZXRzLFxufSBmcm9tICcuL2Nvc3QtY2VudGVyLmkxOG4nO1xuaW1wb3J0IHsgb3JnUHVyY2hhc2VMaW1pdCB9IGZyb20gJy4vcGVybWlzc2lvbi5pMThuJztcbmltcG9ydCB7XG4gIG9yZ1VuaXQsXG4gIG9yZ1VuaXRBZGRyZXNzLFxuICBvcmdVbml0QXBwcm92ZXJzLFxuICBvcmdVbml0QXNzaWduZWRBcHByb3ZlcnMsXG4gIG9yZ1VuaXRBc3NpZ25lZFJvbGVzLFxuICBvcmdVbml0QXNzaWduZWRVc2VycyxcbiAgb3JnVW5pdENoaWxkcmVuLFxuICBvcmdVbml0Q29zdENlbnRlcnMsXG4gIG9yZ1VuaXRVc2VyUm9sZXMsXG4gIG9yZ1VuaXRVc2Vycyxcbn0gZnJvbSAnLi91bml0cy5pMThuJztcbmltcG9ydCB7XG4gIG9yZ1VzZXJHcm91cCxcbiAgb3JnVXNlckdyb3VwQXNzaWduZWRQZXJtaXNzaW9ucyxcbiAgb3JnVXNlckdyb3VwQXNzaWduZWRVc2VycyxcbiAgb3JnVXNlckdyb3VwUGVybWlzc2lvbnMsXG4gIG9yZ1VzZXJHcm91cFVzZXJzLFxufSBmcm9tICcuL3VzZXItZ3JvdXAuaTE4bic7XG5pbXBvcnQge1xuICBvcmdVc2VyLFxuICBvcmdVc2VyQXBwcm92ZXJzLFxuICBvcmdVc2VyQXNzaWduZWRBcHByb3ZlcnMsXG4gIG9yZ1VzZXJBc3NpZ25lZFBlcm1pc3Npb25zLFxuICBvcmdVc2VyQXNzaWduZWRVc2VyR3JvdXBzLFxuICBvcmdVc2VyUGVybWlzc2lvbnMsXG4gIG9yZ1VzZXJVc2VyR3JvdXBzLFxufSBmcm9tICcuL3VzZXIuaTE4bic7XG5cbi8qKlxuICogVGhlIG9yZ2FuaXphdGlvbiBpMThuIGxhYmVscyBwcm92aWRlIGdlbmVyaWMgbGFiZWxzIGZvciBhbGwgb3JnYW5pemF0aW9uIHN1YiBmZWF0dXJlcy5cbiAqIE9uY2UgIzcxNTQgaXMgaW4gcGxhY2UsIHdlIGNhbiBzdGFydCBhZGRpbmcgc3BlY2lmaWMgaTE4biBsYWJlbHMuIFRoZSBvcmdhbml6YXRpb24gbGFiZWxzXG4gKiB3aWxsIHRoZW4gc2VydmUgYXMgYSBiYWNrdXAuXG4gKi9cblxuZXhwb3J0IGNvbnN0IG9yZ2FuaXphdGlvbiA9IHtcbiAgb3JnYW5pemF0aW9uOiB7XG4gICAgZW5hYmxlZDogJ0FjdGl2ZScsXG4gICAgZGlzYWJsZWQ6ICdEaXNhYmxlZCcsXG5cbiAgICBlbmFibGU6ICdFbmFibGUnLFxuICAgIGRpc2FibGU6ICdEaXNhYmxlJyxcblxuICAgIG5hbWU6ICdOYW1lJyxcbiAgICBjb2RlOiAnQ29kZScsXG5cbiAgICBkb25lOiAnZG9uZScsXG5cbiAgICBjYW5jZWw6ICdDYW5jZWwnLFxuXG4gICAgYWRkOiAnQWRkJyxcbiAgICBjcmVhdGU6ICdDcmVhdGUge3tuYW1lfX0nLFxuICAgIGVkaXQ6ICdFZGl0JyxcbiAgICBzYXZlOiAnU2F2ZSB7e25hbWV9fScsXG4gICAgZGVsZXRlOiAnRGVsZXRlJyxcblxuICAgIGFzc2lnbjogJ01hbmFnZScsXG5cbiAgICBhY3RpdmU6ICdBY3RpdmUnLFxuICAgIHN0YXR1czogJ1N0YXR1cycsXG4gICAgZGV0YWlsczogJ0RldGFpbHMnLFxuXG4gICAgbWVzc2FnZXM6IHtcbiAgICAgIGVtcHR5TGlzdDogJ1RoZSBsaXN0IGlzIGVtcHR5JyxcbiAgICB9LFxuICAgIHVzZXJSb2xlczoge1xuICAgICAgYjJiY3VzdG9tZXJncm91cDogJ0N1c3RvbWVyJyxcbiAgICAgIGIyYmFwcHJvdmVyZ3JvdXA6ICdBcHByb3ZlcicsXG4gICAgICBiMmJtYW5hZ2VyZ3JvdXA6ICdNYW5hZ2VyJyxcbiAgICAgIGIyYmFkbWluZ3JvdXA6ICdBZG1pbicsXG4gICAgfSxcblxuICAgIGJyZWFkY3J1bWI6ICdPcmdhbml6YXRpb24nLFxuXG4gICAgbm90aWZpY2F0aW9uOiB7XG4gICAgICBub1N1ZmZpY2llbnRQZXJtaXNzaW9uczogJ05vIHN1ZmZpY2llbnQgcGVybWlzc2lvbnMgdG8gYWNjZXNzIHRoaXMgcGFnZScsXG4gICAgICBub3RFeGlzdDogJ1RoaXMgaXRlbSBkb2VzIG5vdCBleGlzdCcsXG4gICAgICBkaXNhYmxlZDogJ1lvdSBjYW5ub3QgZWRpdCBhIGRpc2FibGVkIGl0ZW0nLFxuICAgIH0sXG5cbiAgICBjb25maXJtYXRpb246IHtcbiAgICAgIGNhbmNlbDogJ0NBTkNFTCcsXG4gICAgICBjb25maXJtOiAnQ09ORklSTScsXG4gICAgICBkaXNhYmxlOiAnRElTQUJMRScsXG4gICAgICBkZWxldGU6ICdERUxFVEUnLFxuICAgIH0sXG5cbiAgICBodHRwSGFuZGxlcnM6IHtcbiAgICAgIGNvbmZsaWN0OiB7XG4gICAgICAgIGJ1ZGdldDogJ0J1ZGdldCB3aXRoIGNvZGUge3sgY29kZSB9fSBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICBjb3N0Q2VudGVyOiAnQ29zdCBjZW50ZXIgd2l0aCBjb2RlIHt7IGNvZGUgfX0gYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgdW5pdDogJ09yZ2FuaXphdGlvbmFsIHVuaXQgd2l0aCB1aWQge3sgY29kZSB9fSBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICB1c2VyOiAnVXNlciB3aXRoIGVtYWlsIHt7IGNvZGUgfX0gYWxyZWFkeSBleGlzdHMnLFxuICAgICAgICB1c2VyR3JvdXA6ICdVc2VyIEdyb3VwIHdpdGggaWQge3sgY29kZSB9fSBhbHJlYWR5IGV4aXN0cycsXG4gICAgICAgIHBlcm1pc3Npb246ICdBcHByb3ZhbCBQZXJtaXNzaW9uIHdpdGggY29kZSB7eyBjb2RlIH19IGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgIHVua25vd246ICdTZXJ2ZXIgdmFsaWRhdGlvbiBlcnJvci4nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIC8vIHN1YiBmZWF0dXJlIGxhYmVscyBhcmUgYWRkZWQgYmVsb3dcbiAgb3JnQ29zdENlbnRlcixcbiAgb3JnQ29zdENlbnRlckJ1ZGdldHMsXG4gIG9yZ0Nvc3RDZW50ZXJBc3NpZ25lZEJ1ZGdldHMsXG4gIG9yZ0J1ZGdldCxcbiAgb3JnQnVkZ2V0QXNzaWduZWRDb3N0Q2VudGVycyxcbiAgb3JnVW5pdCxcbiAgb3JnVW5pdENoaWxkcmVuLFxuICBvcmdVbml0QXBwcm92ZXJzLFxuICBvcmdVbml0QXNzaWduZWRBcHByb3ZlcnMsXG4gIG9yZ1VuaXRBc3NpZ25lZFJvbGVzLFxuICBvcmdVbml0VXNlcnMsXG4gIG9yZ1VuaXRVc2VyUm9sZXMsXG4gIG9yZ1VuaXRBc3NpZ25lZFVzZXJzLFxuICBvcmdVbml0Q29zdENlbnRlcnMsXG4gIG9yZ1VuaXRBZGRyZXNzLFxuXG4gIG9yZ1VzZXJHcm91cCxcbiAgb3JnVXNlckdyb3VwVXNlcnMsXG4gIG9yZ1VzZXJHcm91cEFzc2lnbmVkVXNlcnMsXG4gIG9yZ1VzZXJHcm91cFBlcm1pc3Npb25zLFxuICBvcmdVc2VyR3JvdXBBc3NpZ25lZFBlcm1pc3Npb25zLFxuICBvcmdVc2VyLFxuICBvcmdVc2VyVXNlckdyb3VwcyxcbiAgb3JnVXNlckFzc2lnbmVkVXNlckdyb3VwcyxcbiAgb3JnVXNlckFwcHJvdmVycyxcbiAgb3JnVXNlckFzc2lnbmVkQXBwcm92ZXJzLFxuICBvcmdVc2VyUGVybWlzc2lvbnMsXG4gIG9yZ1VzZXJBc3NpZ25lZFBlcm1pc3Npb25zLFxuICBvcmdQdXJjaGFzZUxpbWl0LFxufTtcbiJdfQ==