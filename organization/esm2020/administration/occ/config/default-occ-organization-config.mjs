/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccOrganizationConfig = {
    backend: {
        occ: {
            endpoints: {
                budgets: '/users/${userId}/budgets',
                budget: '/users/${userId}/budgets/${budgetCode}',
                orgUnitsAvailable: '/users/${userId}/availableOrgUnitNodes',
                orgUnitsTree: '/users/${userId}/orgUnitsRootNodeTree',
                orgUnitsApprovalProcesses: '/users/${userId}/orgUnitsAvailableApprovalProcesses',
                orgUnits: '/users/${userId}/orgUnits',
                orgUnit: '/users/${userId}/orgUnits/${orgUnitId}',
                orgUnitUsers: '/users/${userId}/orgUnits/${orgUnitId}/availableUsers/${roleId}',
                orgUnitApprovers: '/users/${userId}/orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles',
                orgUnitApprover: '/users/${userId}/orgUnits/${orgUnitId}/orgCustomers/${orgCustomerId}/roles/${roleId}',
                orgUnitUserRoles: '/users/${userId}/orgCustomers/${orgCustomerId}/roles',
                orgUnitUserRole: '/users/${userId}/orgCustomers/${orgCustomerId}/roles/${roleId}',
                orgUnitsAddresses: '/users/${userId}/orgUnits/${orgUnitId}/addresses',
                orgUnitsAddress: '/users/${userId}/orgUnits/${orgUnitId}/addresses/${addressId}',
                userGroups: '/users/${userId}/orgUnitUserGroups',
                userGroup: '/users/${userId}/orgUnitUserGroups/${userGroupId}',
                userGroupAvailableOrderApprovalPermissions: '/users/${userId}/orgUnitUserGroups/${userGroupId}/availableOrderApprovalPermissions',
                userGroupAvailableOrgCustomers: '/users/${userId}/orgUnitUserGroups/${userGroupId}/availableOrgCustomers',
                userGroupMembers: '/users/${userId}/orgUnitUserGroups/${userGroupId}/members',
                userGroupMember: '/users/${userId}/orgUnitUserGroups/${userGroupId}/members/${orgCustomerId}',
                userGroupOrderApprovalPermissions: '/users/${userId}/orgUnitUserGroups/${userGroupId}/orderApprovalPermissions',
                userGroupOrderApprovalPermission: '/users/${userId}/orgUnitUserGroups/${userGroupId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
                costCenters: '/costcenters',
                costCenter: '/costcenters/${costCenterCode}',
                costCentersAll: '/costcentersall',
                costCenterBudgets: '/costcenters/${costCenterCode}/budgets',
                costCenterBudget: '/costcenters/${costCenterCode}/budgets/${budgetCode}',
                permissions: '/users/${userId}/orderApprovalPermissions',
                permission: '/users/${userId}/orderApprovalPermissions/${orderApprovalPermissionCode}',
                orderApprovalPermissionTypes: '/orderApprovalPermissionTypes',
                b2bUsers: '/users/${userId}/orgCustomers',
                b2bUser: '/users/${userId}/orgCustomers/${orgCustomerId}',
                b2bUserApprovers: '/users/${userId}/orgCustomers/${orgCustomerId}/approvers',
                b2bUserApprover: '/users/${userId}/orgCustomers/${orgCustomerId}/approvers/${approverId}',
                b2bUserUserGroups: '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups',
                b2bUserUserGroup: '/users/${userId}/orgCustomers/${orgCustomerId}/orgUserGroups/${userGroupId}',
                b2bUserPermissions: '/users/${userId}/orgCustomers/${orgCustomerId}/permissions',
                b2bUserPermission: '/users/${userId}/orgCustomers/${orgCustomerId}/permissions/${premissionId}',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2Mtb3JnYW5pemF0aW9uLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vb2NjL2NvbmZpZy9kZWZhdWx0LW9jYy1vcmdhbml6YXRpb24tY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBYztJQUNyRCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLDBCQUEwQjtnQkFDbkMsTUFBTSxFQUFFLHdDQUF3QztnQkFDaEQsaUJBQWlCLEVBQUUsd0NBQXdDO2dCQUMzRCxZQUFZLEVBQUUsdUNBQXVDO2dCQUNyRCx5QkFBeUIsRUFDdkIscURBQXFEO2dCQUN2RCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxPQUFPLEVBQUUsd0NBQXdDO2dCQUNqRCxZQUFZLEVBQ1YsaUVBQWlFO2dCQUNuRSxnQkFBZ0IsRUFDZCw0RUFBNEU7Z0JBQzlFLGVBQWUsRUFDYixzRkFBc0Y7Z0JBQ3hGLGdCQUFnQixFQUNkLHNEQUFzRDtnQkFDeEQsZUFBZSxFQUNiLGdFQUFnRTtnQkFDbEUsaUJBQWlCLEVBQUUsa0RBQWtEO2dCQUNyRSxlQUFlLEVBQ2IsK0RBQStEO2dCQUNqRSxVQUFVLEVBQUUsb0NBQW9DO2dCQUNoRCxTQUFTLEVBQUUsbURBQW1EO2dCQUM5RCwwQ0FBMEMsRUFDeEMscUZBQXFGO2dCQUN2Riw4QkFBOEIsRUFDNUIseUVBQXlFO2dCQUMzRSxnQkFBZ0IsRUFDZCwyREFBMkQ7Z0JBQzdELGVBQWUsRUFDYiw0RUFBNEU7Z0JBQzlFLGlDQUFpQyxFQUMvQiw0RUFBNEU7Z0JBQzlFLGdDQUFnQyxFQUM5QiwyR0FBMkc7Z0JBQzdHLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixVQUFVLEVBQUUsZ0NBQWdDO2dCQUM1QyxjQUFjLEVBQUUsaUJBQWlCO2dCQUNqQyxpQkFBaUIsRUFBRSx3Q0FBd0M7Z0JBQzNELGdCQUFnQixFQUNkLHNEQUFzRDtnQkFDeEQsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsVUFBVSxFQUNSLDBFQUEwRTtnQkFDNUUsNEJBQTRCLEVBQUUsK0JBQStCO2dCQUM3RCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxPQUFPLEVBQUUsZ0RBQWdEO2dCQUN6RCxnQkFBZ0IsRUFDZCwwREFBMEQ7Z0JBQzVELGVBQWUsRUFDYix3RUFBd0U7Z0JBQzFFLGlCQUFpQixFQUNmLDhEQUE4RDtnQkFDaEUsZ0JBQWdCLEVBQ2QsNkVBQTZFO2dCQUMvRSxrQkFBa0IsRUFDaEIsNERBQTREO2dCQUM5RCxpQkFBaUIsRUFDZiw0RUFBNEU7YUFDL0U7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T2NjT3JnYW5pemF0aW9uQ29uZmlnOiBPY2NDb25maWcgPSB7XG4gIGJhY2tlbmQ6IHtcbiAgICBvY2M6IHtcbiAgICAgIGVuZHBvaW50czoge1xuICAgICAgICBidWRnZXRzOiAnL3VzZXJzLyR7dXNlcklkfS9idWRnZXRzJyxcbiAgICAgICAgYnVkZ2V0OiAnL3VzZXJzLyR7dXNlcklkfS9idWRnZXRzLyR7YnVkZ2V0Q29kZX0nLFxuICAgICAgICBvcmdVbml0c0F2YWlsYWJsZTogJy91c2Vycy8ke3VzZXJJZH0vYXZhaWxhYmxlT3JnVW5pdE5vZGVzJyxcbiAgICAgICAgb3JnVW5pdHNUcmVlOiAnL3VzZXJzLyR7dXNlcklkfS9vcmdVbml0c1Jvb3ROb2RlVHJlZScsXG4gICAgICAgIG9yZ1VuaXRzQXBwcm92YWxQcm9jZXNzZXM6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdHNBdmFpbGFibGVBcHByb3ZhbFByb2Nlc3NlcycsXG4gICAgICAgIG9yZ1VuaXRzOiAnL3VzZXJzLyR7dXNlcklkfS9vcmdVbml0cycsXG4gICAgICAgIG9yZ1VuaXQ6ICcvdXNlcnMvJHt1c2VySWR9L29yZ1VuaXRzLyR7b3JnVW5pdElkfScsXG4gICAgICAgIG9yZ1VuaXRVc2VyczpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmdVbml0cy8ke29yZ1VuaXRJZH0vYXZhaWxhYmxlVXNlcnMvJHtyb2xlSWR9JyxcbiAgICAgICAgb3JnVW5pdEFwcHJvdmVyczpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmdVbml0cy8ke29yZ1VuaXRJZH0vb3JnQ3VzdG9tZXJzLyR7b3JnQ3VzdG9tZXJJZH0vcm9sZXMnLFxuICAgICAgICBvcmdVbml0QXBwcm92ZXI6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdHMvJHtvcmdVbml0SWR9L29yZ0N1c3RvbWVycy8ke29yZ0N1c3RvbWVySWR9L3JvbGVzLyR7cm9sZUlkfScsXG4gICAgICAgIG9yZ1VuaXRVc2VyUm9sZXM6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnQ3VzdG9tZXJzLyR7b3JnQ3VzdG9tZXJJZH0vcm9sZXMnLFxuICAgICAgICBvcmdVbml0VXNlclJvbGU6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnQ3VzdG9tZXJzLyR7b3JnQ3VzdG9tZXJJZH0vcm9sZXMvJHtyb2xlSWR9JyxcbiAgICAgICAgb3JnVW5pdHNBZGRyZXNzZXM6ICcvdXNlcnMvJHt1c2VySWR9L29yZ1VuaXRzLyR7b3JnVW5pdElkfS9hZGRyZXNzZXMnLFxuICAgICAgICBvcmdVbml0c0FkZHJlc3M6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdHMvJHtvcmdVbml0SWR9L2FkZHJlc3Nlcy8ke2FkZHJlc3NJZH0nLFxuICAgICAgICB1c2VyR3JvdXBzOiAnL3VzZXJzLyR7dXNlcklkfS9vcmdVbml0VXNlckdyb3VwcycsXG4gICAgICAgIHVzZXJHcm91cDogJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdFVzZXJHcm91cHMvJHt1c2VyR3JvdXBJZH0nLFxuICAgICAgICB1c2VyR3JvdXBBdmFpbGFibGVPcmRlckFwcHJvdmFsUGVybWlzc2lvbnM6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdFVzZXJHcm91cHMvJHt1c2VyR3JvdXBJZH0vYXZhaWxhYmxlT3JkZXJBcHByb3ZhbFBlcm1pc3Npb25zJyxcbiAgICAgICAgdXNlckdyb3VwQXZhaWxhYmxlT3JnQ3VzdG9tZXJzOlxuICAgICAgICAgICcvdXNlcnMvJHt1c2VySWR9L29yZ1VuaXRVc2VyR3JvdXBzLyR7dXNlckdyb3VwSWR9L2F2YWlsYWJsZU9yZ0N1c3RvbWVycycsXG4gICAgICAgIHVzZXJHcm91cE1lbWJlcnM6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdFVzZXJHcm91cHMvJHt1c2VyR3JvdXBJZH0vbWVtYmVycycsXG4gICAgICAgIHVzZXJHcm91cE1lbWJlcjpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmdVbml0VXNlckdyb3Vwcy8ke3VzZXJHcm91cElkfS9tZW1iZXJzLyR7b3JnQ3VzdG9tZXJJZH0nLFxuICAgICAgICB1c2VyR3JvdXBPcmRlckFwcHJvdmFsUGVybWlzc2lvbnM6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdFVzZXJHcm91cHMvJHt1c2VyR3JvdXBJZH0vb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25zJyxcbiAgICAgICAgdXNlckdyb3VwT3JkZXJBcHByb3ZhbFBlcm1pc3Npb246XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnVW5pdFVzZXJHcm91cHMvJHt1c2VyR3JvdXBJZH0vb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25zLyR7b3JkZXJBcHByb3ZhbFBlcm1pc3Npb25Db2RlfScsXG4gICAgICAgIGNvc3RDZW50ZXJzOiAnL2Nvc3RjZW50ZXJzJyxcbiAgICAgICAgY29zdENlbnRlcjogJy9jb3N0Y2VudGVycy8ke2Nvc3RDZW50ZXJDb2RlfScsXG4gICAgICAgIGNvc3RDZW50ZXJzQWxsOiAnL2Nvc3RjZW50ZXJzYWxsJyxcbiAgICAgICAgY29zdENlbnRlckJ1ZGdldHM6ICcvY29zdGNlbnRlcnMvJHtjb3N0Q2VudGVyQ29kZX0vYnVkZ2V0cycsXG4gICAgICAgIGNvc3RDZW50ZXJCdWRnZXQ6XG4gICAgICAgICAgJy9jb3N0Y2VudGVycy8ke2Nvc3RDZW50ZXJDb2RlfS9idWRnZXRzLyR7YnVkZ2V0Q29kZX0nLFxuICAgICAgICBwZXJtaXNzaW9uczogJy91c2Vycy8ke3VzZXJJZH0vb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25zJyxcbiAgICAgICAgcGVybWlzc2lvbjpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmRlckFwcHJvdmFsUGVybWlzc2lvbnMvJHtvcmRlckFwcHJvdmFsUGVybWlzc2lvbkNvZGV9JyxcbiAgICAgICAgb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlczogJy9vcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVzJyxcbiAgICAgICAgYjJiVXNlcnM6ICcvdXNlcnMvJHt1c2VySWR9L29yZ0N1c3RvbWVycycsXG4gICAgICAgIGIyYlVzZXI6ICcvdXNlcnMvJHt1c2VySWR9L29yZ0N1c3RvbWVycy8ke29yZ0N1c3RvbWVySWR9JyxcbiAgICAgICAgYjJiVXNlckFwcHJvdmVyczpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmdDdXN0b21lcnMvJHtvcmdDdXN0b21lcklkfS9hcHByb3ZlcnMnLFxuICAgICAgICBiMmJVc2VyQXBwcm92ZXI6XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnQ3VzdG9tZXJzLyR7b3JnQ3VzdG9tZXJJZH0vYXBwcm92ZXJzLyR7YXBwcm92ZXJJZH0nLFxuICAgICAgICBiMmJVc2VyVXNlckdyb3VwczpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmdDdXN0b21lcnMvJHtvcmdDdXN0b21lcklkfS9vcmdVc2VyR3JvdXBzJyxcbiAgICAgICAgYjJiVXNlclVzZXJHcm91cDpcbiAgICAgICAgICAnL3VzZXJzLyR7dXNlcklkfS9vcmdDdXN0b21lcnMvJHtvcmdDdXN0b21lcklkfS9vcmdVc2VyR3JvdXBzLyR7dXNlckdyb3VwSWR9JyxcbiAgICAgICAgYjJiVXNlclBlcm1pc3Npb25zOlxuICAgICAgICAgICcvdXNlcnMvJHt1c2VySWR9L29yZ0N1c3RvbWVycy8ke29yZ0N1c3RvbWVySWR9L3Blcm1pc3Npb25zJyxcbiAgICAgICAgYjJiVXNlclBlcm1pc3Npb246XG4gICAgICAgICAgJy91c2Vycy8ke3VzZXJJZH0vb3JnQ3VzdG9tZXJzLyR7b3JnQ3VzdG9tZXJJZH0vcGVybWlzc2lvbnMvJHtwcmVtaXNzaW9uSWR9JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=