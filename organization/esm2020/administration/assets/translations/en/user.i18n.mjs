/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgUser = {
    header: 'All users ({{count}})',
    disabled: '(disabled)',
    uid: 'Email',
    active: 'Status',
    name: 'Name',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    orgUnit: 'Unit',
    unit: 'Unit',
    roles: 'Roles',
    title: 'Title',
    hint: 'Users are the buyers, approvers, managers, and administrators of your organization. Each user is assigned a role for making or approving purchases. Each user belongs to a unit, and they have access to all child units of their primary unit.',
    unitApprover: `Unit approver`,
    assignApprover: 'Add the user to approvers for the unit',
    actions: '',
    sortBy: 'Sort by',
    sort: {
        byName: 'Name',
        byUnit: 'Unit',
    },
    details: {
        title: 'User Details',
        subtitle: 'User: {{ item.name }}',
    },
    edit: {
        title: 'Edit User',
        subtitle: 'User: {{ item.name }}',
    },
    create: {
        title: 'Create User',
        subtitle: '',
    },
    links: {
        password: 'Change password',
        approvers: 'Approvers',
        userGroup: 'User groups',
        permission: 'Purchase limits',
    },
    messages: {
        deactivateTitle: 'Disable this user?',
        deactivate: 'Disabled users cannot log onto the storefront and place orders.',
        confirmEnabled: 'User {{item.firstName}} {{item.lastName}} enabled successfully',
        confirmDisabled: 'User {{item.firstName}} {{item.lastName}} disabled successfully',
        update: 'User {{item.firstName}} {{item.lastName}} updated successfully',
        create: 'User {{item.firstName}} {{item.lastName}} created successfully',
        updatePassword: 'User {{item.firstName}} {{item.lastName}} password updated successfully',
    },
    info: {
        disabledEdit: 'Enable the user to allow editing.',
        disabledEnable: 'Unit must be enabled before this user may be enabled.',
    },
    approver: {
        link: 'Approvers',
        header: 'Approvers in {{code}}',
        assign: 'Assign Approvers',
        assignHeader: 'Assign Approvers in {{code}}',
        back: 'Back',
        new: 'New approver',
        instructions: {
            check: "To assign an approver to this user, select the user's check box.",
            uncheck: "To remove an approver, clear the user's check box.",
            changes: 'Changes are saved automatically.',
        },
    },
    userGroup: {
        link: 'User groups',
        header: 'User groups in {{code}}',
        assign: 'Assign user groups',
        assignHeader: 'Assign user groups in {{code}}',
        back: 'Back',
        instructions: {
            check: "To assign an user group to this user, select the user's check box.",
            uncheck: "To remove aa user group, clear the user's check box.",
            changes: 'Changes are saved automatically.',
        },
    },
    permission: {
        link: 'Purchase limits',
        header: 'Purchase limits in {{code}}',
        assign: 'Assign purchase limits',
        assignHeader: 'Assign purchase limits in {{code}}',
        back: 'Back',
        instructions: {
            check: 'To assign a purchase limits to this user, select its check box.',
            uncheck: 'To unassign a purchase limits, clear its check box.',
            changes: 'Changes are saved automatically.',
        },
        per: {
            undefined: '',
            MONTH: 'per Month',
            YEAR: 'per Year',
            WEEK: 'per Week',
            QUARTER: 'per Quarter',
        },
    },
    password: {
        title: 'Change password',
        subtitle: 'User: {{ item.email }}',
        newPassword: 'New password',
        confirmPassword: 'Retype new password',
    },
    breadcrumbs: {
        list: 'All users',
        details: '{{name}}',
        userGroups: 'User groups',
        approvers: 'Approvers',
        permissions: 'Purchase limits',
    },
};
export const orgUserAssignedApprovers = {
    title: 'Assigned approvers',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Approver {{ item.name }} assigned successfully',
    unassigned: 'Approver {{ item.name }} unassigned successfully',
};
export const orgUserApprovers = {
    title: 'Manage approvers',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Approver {{ item.name }} assigned successfully',
    unassigned: 'Approver {{ item.name }} unassigned successfully',
};
export const orgUserAssignedPermissions = {
    title: 'Assigned purchase limits',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Purchase limit {{ item.code }} assigned successfully',
    unassigned: 'Purchase limit {{ item.code }} unassigned successfully',
};
export const orgUserPermissions = {
    title: 'Manage purchase limits',
    subtitle: 'User: {{ item.name }}',
    assigned: 'Purchase limit {{ item.code }} assigned successfully',
    unassigned: 'Purchase limit {{ item.code }} unassigned successfully',
};
export const orgUserAssignedUserGroups = {
    title: 'Assigned user groups',
    subtitle: 'User: {{ item.name }}',
    assigned: 'User group {{item.name}} assigned successfully',
    unassigned: 'User group {{item.name}} unassigned successfully',
};
export const orgUserUserGroups = {
    title: 'Manage user groups',
    subtitle: 'User: {{ item.name }}',
    assigned: 'User group {{item.name}} assigned successfully',
    unassigned: 'User group {{item.name}} unassigned successfully',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL3VzZXIuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHO0lBQ3JCLE1BQU0sRUFBRSx1QkFBdUI7SUFDL0IsUUFBUSxFQUFFLFlBQVk7SUFDdEIsR0FBRyxFQUFFLE9BQU87SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsTUFBTTtJQUNaLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLE1BQU07SUFDZixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsaVBBQWlQO0lBRXZQLFlBQVksRUFBRSxlQUFlO0lBQzdCLGNBQWMsRUFBRSx3Q0FBd0M7SUFFeEQsT0FBTyxFQUFFLEVBQUU7SUFFWCxNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRSxNQUFNO0tBQ2Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsY0FBYztRQUNyQixRQUFRLEVBQUUsdUJBQXVCO0tBQ2xDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLFdBQVc7UUFDbEIsUUFBUSxFQUFFLHVCQUF1QjtLQUNsQztJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLFVBQVUsRUFBRSxpQkFBaUI7S0FDOUI7SUFFRCxRQUFRLEVBQUU7UUFDUixlQUFlLEVBQUUsb0JBQW9CO1FBQ3JDLFVBQVUsRUFDUixpRUFBaUU7UUFDbkUsY0FBYyxFQUNaLGdFQUFnRTtRQUNsRSxlQUFlLEVBQ2IsaUVBQWlFO1FBQ25FLE1BQU0sRUFBRSxnRUFBZ0U7UUFDeEUsTUFBTSxFQUFFLGdFQUFnRTtRQUN4RSxjQUFjLEVBQ1oseUVBQXlFO0tBQzVFO0lBQ0QsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFFLG1DQUFtQztRQUNqRCxjQUFjLEVBQUUsdURBQXVEO0tBQ3hFO0lBRUQsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFdBQVc7UUFDakIsTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLFlBQVksRUFBRSw4QkFBOEI7UUFDNUMsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsY0FBYztRQUNuQixZQUFZLEVBQUU7WUFDWixLQUFLLEVBQUUsa0VBQWtFO1lBQ3pFLE9BQU8sRUFBRSxvREFBb0Q7WUFDN0QsT0FBTyxFQUFFLGtDQUFrQztTQUM1QztLQUNGO0lBRUQsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLFlBQVksRUFBRSxnQ0FBZ0M7UUFDOUMsSUFBSSxFQUFFLE1BQU07UUFDWixZQUFZLEVBQUU7WUFDWixLQUFLLEVBQ0gsb0VBQW9FO1lBQ3RFLE9BQU8sRUFBRSxzREFBc0Q7WUFDL0QsT0FBTyxFQUFFLGtDQUFrQztTQUM1QztLQUNGO0lBRUQsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsNkJBQTZCO1FBQ3JDLE1BQU0sRUFBRSx3QkFBd0I7UUFDaEMsWUFBWSxFQUFFLG9DQUFvQztRQUNsRCxJQUFJLEVBQUUsTUFBTTtRQUNaLFlBQVksRUFBRTtZQUNaLEtBQUssRUFBRSxpRUFBaUU7WUFDeEUsT0FBTyxFQUFFLHFEQUFxRDtZQUM5RCxPQUFPLEVBQUUsa0NBQWtDO1NBQzVDO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsU0FBUyxFQUFFLEVBQUU7WUFDYixLQUFLLEVBQUUsV0FBVztZQUNsQixJQUFJLEVBQUUsVUFBVTtZQUNoQixJQUFJLEVBQUUsVUFBVTtZQUNoQixPQUFPLEVBQUUsYUFBYTtTQUN2QjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsS0FBSyxFQUFFLGlCQUFpQjtRQUN4QixRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFdBQVcsRUFBRSxjQUFjO1FBQzNCLGVBQWUsRUFBRSxxQkFBcUI7S0FDdkM7SUFFRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUsVUFBVTtRQUNuQixVQUFVLEVBQUUsYUFBYTtRQUN6QixTQUFTLEVBQUUsV0FBVztRQUN0QixXQUFXLEVBQUUsaUJBQWlCO0tBQy9CO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHO0lBQ3RDLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsZ0RBQWdEO0lBQzFELFVBQVUsRUFBRSxrREFBa0Q7Q0FDL0QsQ0FBQztBQUNGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLEtBQUssRUFBRSxrQkFBa0I7SUFDekIsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsZ0RBQWdEO0lBQzFELFVBQVUsRUFBRSxrREFBa0Q7Q0FDL0QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHO0lBQ3hDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsc0RBQXNEO0lBQ2hFLFVBQVUsRUFBRSx3REFBd0Q7Q0FDckUsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHO0lBQ2hDLEtBQUssRUFBRSx3QkFBd0I7SUFDL0IsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsc0RBQXNEO0lBQ2hFLFVBQVUsRUFBRSx3REFBd0Q7Q0FDckUsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHO0lBQ3ZDLEtBQUssRUFBRSxzQkFBc0I7SUFDN0IsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsZ0RBQWdEO0lBQzFELFVBQVUsRUFBRSxrREFBa0Q7Q0FDL0QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHO0lBQy9CLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsUUFBUSxFQUFFLHVCQUF1QjtJQUNqQyxRQUFRLEVBQUUsZ0RBQWdEO0lBQzFELFVBQVUsRUFBRSxrREFBa0Q7Q0FDL0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyID0ge1xuICBoZWFkZXI6ICdBbGwgdXNlcnMgKHt7Y291bnR9fSknLFxuICBkaXNhYmxlZDogJyhkaXNhYmxlZCknLFxuICB1aWQ6ICdFbWFpbCcsXG4gIGFjdGl2ZTogJ1N0YXR1cycsXG4gIG5hbWU6ICdOYW1lJyxcbiAgZmlyc3ROYW1lOiAnRmlyc3QgbmFtZScsXG4gIGxhc3ROYW1lOiAnTGFzdCBuYW1lJyxcbiAgZW1haWw6ICdFbWFpbCcsXG4gIG9yZ1VuaXQ6ICdVbml0JyxcbiAgdW5pdDogJ1VuaXQnLFxuICByb2xlczogJ1JvbGVzJyxcbiAgdGl0bGU6ICdUaXRsZScsXG4gIGhpbnQ6ICdVc2VycyBhcmUgdGhlIGJ1eWVycywgYXBwcm92ZXJzLCBtYW5hZ2VycywgYW5kIGFkbWluaXN0cmF0b3JzIG9mIHlvdXIgb3JnYW5pemF0aW9uLiBFYWNoIHVzZXIgaXMgYXNzaWduZWQgYSByb2xlIGZvciBtYWtpbmcgb3IgYXBwcm92aW5nIHB1cmNoYXNlcy4gRWFjaCB1c2VyIGJlbG9uZ3MgdG8gYSB1bml0LCBhbmQgdGhleSBoYXZlIGFjY2VzcyB0byBhbGwgY2hpbGQgdW5pdHMgb2YgdGhlaXIgcHJpbWFyeSB1bml0LicsXG5cbiAgdW5pdEFwcHJvdmVyOiBgVW5pdCBhcHByb3ZlcmAsXG4gIGFzc2lnbkFwcHJvdmVyOiAnQWRkIHRoZSB1c2VyIHRvIGFwcHJvdmVycyBmb3IgdGhlIHVuaXQnLFxuXG4gIGFjdGlvbnM6ICcnLFxuXG4gIHNvcnRCeTogJ1NvcnQgYnknLFxuICBzb3J0OiB7XG4gICAgYnlOYW1lOiAnTmFtZScsXG4gICAgYnlVbml0OiAnVW5pdCcsXG4gIH0sXG5cbiAgZGV0YWlsczoge1xuICAgIHRpdGxlOiAnVXNlciBEZXRhaWxzJyxcbiAgICBzdWJ0aXRsZTogJ1VzZXI6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIH0sXG4gIGVkaXQ6IHtcbiAgICB0aXRsZTogJ0VkaXQgVXNlcicsXG4gICAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICB9LFxuICBjcmVhdGU6IHtcbiAgICB0aXRsZTogJ0NyZWF0ZSBVc2VyJyxcbiAgICBzdWJ0aXRsZTogJycsXG4gIH0sXG5cbiAgbGlua3M6IHtcbiAgICBwYXNzd29yZDogJ0NoYW5nZSBwYXNzd29yZCcsXG4gICAgYXBwcm92ZXJzOiAnQXBwcm92ZXJzJyxcbiAgICB1c2VyR3JvdXA6ICdVc2VyIGdyb3VwcycsXG4gICAgcGVybWlzc2lvbjogJ1B1cmNoYXNlIGxpbWl0cycsXG4gIH0sXG5cbiAgbWVzc2FnZXM6IHtcbiAgICBkZWFjdGl2YXRlVGl0bGU6ICdEaXNhYmxlIHRoaXMgdXNlcj8nLFxuICAgIGRlYWN0aXZhdGU6XG4gICAgICAnRGlzYWJsZWQgdXNlcnMgY2Fubm90IGxvZyBvbnRvIHRoZSBzdG9yZWZyb250IGFuZCBwbGFjZSBvcmRlcnMuJyxcbiAgICBjb25maXJtRW5hYmxlZDpcbiAgICAgICdVc2VyIHt7aXRlbS5maXJzdE5hbWV9fSB7e2l0ZW0ubGFzdE5hbWV9fSBlbmFibGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgY29uZmlybURpc2FibGVkOlxuICAgICAgJ1VzZXIge3tpdGVtLmZpcnN0TmFtZX19IHt7aXRlbS5sYXN0TmFtZX19IGRpc2FibGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgdXBkYXRlOiAnVXNlciB7e2l0ZW0uZmlyc3ROYW1lfX0ge3tpdGVtLmxhc3ROYW1lfX0gdXBkYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgIGNyZWF0ZTogJ1VzZXIge3tpdGVtLmZpcnN0TmFtZX19IHt7aXRlbS5sYXN0TmFtZX19IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB1cGRhdGVQYXNzd29yZDpcbiAgICAgICdVc2VyIHt7aXRlbS5maXJzdE5hbWV9fSB7e2l0ZW0ubGFzdE5hbWV9fSBwYXNzd29yZCB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZEVkaXQ6ICdFbmFibGUgdGhlIHVzZXIgdG8gYWxsb3cgZWRpdGluZy4nLFxuICAgIGRpc2FibGVkRW5hYmxlOiAnVW5pdCBtdXN0IGJlIGVuYWJsZWQgYmVmb3JlIHRoaXMgdXNlciBtYXkgYmUgZW5hYmxlZC4nLFxuICB9LFxuXG4gIGFwcHJvdmVyOiB7XG4gICAgbGluazogJ0FwcHJvdmVycycsXG4gICAgaGVhZGVyOiAnQXBwcm92ZXJzIGluIHt7Y29kZX19JyxcbiAgICBhc3NpZ246ICdBc3NpZ24gQXBwcm92ZXJzJyxcbiAgICBhc3NpZ25IZWFkZXI6ICdBc3NpZ24gQXBwcm92ZXJzIGluIHt7Y29kZX19JyxcbiAgICBiYWNrOiAnQmFjaycsXG4gICAgbmV3OiAnTmV3IGFwcHJvdmVyJyxcbiAgICBpbnN0cnVjdGlvbnM6IHtcbiAgICAgIGNoZWNrOiBcIlRvIGFzc2lnbiBhbiBhcHByb3ZlciB0byB0aGlzIHVzZXIsIHNlbGVjdCB0aGUgdXNlcidzIGNoZWNrIGJveC5cIixcbiAgICAgIHVuY2hlY2s6IFwiVG8gcmVtb3ZlIGFuIGFwcHJvdmVyLCBjbGVhciB0aGUgdXNlcidzIGNoZWNrIGJveC5cIixcbiAgICAgIGNoYW5nZXM6ICdDaGFuZ2VzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LicsXG4gICAgfSxcbiAgfSxcblxuICB1c2VyR3JvdXA6IHtcbiAgICBsaW5rOiAnVXNlciBncm91cHMnLFxuICAgIGhlYWRlcjogJ1VzZXIgZ3JvdXBzIGluIHt7Y29kZX19JyxcbiAgICBhc3NpZ246ICdBc3NpZ24gdXNlciBncm91cHMnLFxuICAgIGFzc2lnbkhlYWRlcjogJ0Fzc2lnbiB1c2VyIGdyb3VwcyBpbiB7e2NvZGV9fScsXG4gICAgYmFjazogJ0JhY2snLFxuICAgIGluc3RydWN0aW9uczoge1xuICAgICAgY2hlY2s6XG4gICAgICAgIFwiVG8gYXNzaWduIGFuIHVzZXIgZ3JvdXAgdG8gdGhpcyB1c2VyLCBzZWxlY3QgdGhlIHVzZXIncyBjaGVjayBib3guXCIsXG4gICAgICB1bmNoZWNrOiBcIlRvIHJlbW92ZSBhYSB1c2VyIGdyb3VwLCBjbGVhciB0aGUgdXNlcidzIGNoZWNrIGJveC5cIixcbiAgICAgIGNoYW5nZXM6ICdDaGFuZ2VzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LicsXG4gICAgfSxcbiAgfSxcblxuICBwZXJtaXNzaW9uOiB7XG4gICAgbGluazogJ1B1cmNoYXNlIGxpbWl0cycsXG4gICAgaGVhZGVyOiAnUHVyY2hhc2UgbGltaXRzIGluIHt7Y29kZX19JyxcbiAgICBhc3NpZ246ICdBc3NpZ24gcHVyY2hhc2UgbGltaXRzJyxcbiAgICBhc3NpZ25IZWFkZXI6ICdBc3NpZ24gcHVyY2hhc2UgbGltaXRzIGluIHt7Y29kZX19JyxcbiAgICBiYWNrOiAnQmFjaycsXG4gICAgaW5zdHJ1Y3Rpb25zOiB7XG4gICAgICBjaGVjazogJ1RvIGFzc2lnbiBhIHB1cmNoYXNlIGxpbWl0cyB0byB0aGlzIHVzZXIsIHNlbGVjdCBpdHMgY2hlY2sgYm94LicsXG4gICAgICB1bmNoZWNrOiAnVG8gdW5hc3NpZ24gYSBwdXJjaGFzZSBsaW1pdHMsIGNsZWFyIGl0cyBjaGVjayBib3guJyxcbiAgICAgIGNoYW5nZXM6ICdDaGFuZ2VzIGFyZSBzYXZlZCBhdXRvbWF0aWNhbGx5LicsXG4gICAgfSxcbiAgICBwZXI6IHtcbiAgICAgIHVuZGVmaW5lZDogJycsXG4gICAgICBNT05USDogJ3BlciBNb250aCcsXG4gICAgICBZRUFSOiAncGVyIFllYXInLFxuICAgICAgV0VFSzogJ3BlciBXZWVrJyxcbiAgICAgIFFVQVJURVI6ICdwZXIgUXVhcnRlcicsXG4gICAgfSxcbiAgfSxcblxuICBwYXNzd29yZDoge1xuICAgIHRpdGxlOiAnQ2hhbmdlIHBhc3N3b3JkJyxcbiAgICBzdWJ0aXRsZTogJ1VzZXI6IHt7IGl0ZW0uZW1haWwgfX0nLFxuICAgIG5ld1Bhc3N3b3JkOiAnTmV3IHBhc3N3b3JkJyxcbiAgICBjb25maXJtUGFzc3dvcmQ6ICdSZXR5cGUgbmV3IHBhc3N3b3JkJyxcbiAgfSxcblxuICBicmVhZGNydW1iczoge1xuICAgIGxpc3Q6ICdBbGwgdXNlcnMnLFxuICAgIGRldGFpbHM6ICd7e25hbWV9fScsXG4gICAgdXNlckdyb3VwczogJ1VzZXIgZ3JvdXBzJyxcbiAgICBhcHByb3ZlcnM6ICdBcHByb3ZlcnMnLFxuICAgIHBlcm1pc3Npb25zOiAnUHVyY2hhc2UgbGltaXRzJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyQXNzaWduZWRBcHByb3ZlcnMgPSB7XG4gIHRpdGxlOiAnQXNzaWduZWQgYXBwcm92ZXJzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ0FwcHJvdmVyIHt7IGl0ZW0ubmFtZSB9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnQXBwcm92ZXIge3sgaXRlbS5uYW1lIH19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5leHBvcnQgY29uc3Qgb3JnVXNlckFwcHJvdmVycyA9IHtcbiAgdGl0bGU6ICdNYW5hZ2UgYXBwcm92ZXJzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ0FwcHJvdmVyIHt7IGl0ZW0ubmFtZSB9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnQXBwcm92ZXIge3sgaXRlbS5uYW1lIH19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyQXNzaWduZWRQZXJtaXNzaW9ucyA9IHtcbiAgdGl0bGU6ICdBc3NpZ25lZCBwdXJjaGFzZSBsaW1pdHMnLFxuICBzdWJ0aXRsZTogJ1VzZXI6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIGFzc2lnbmVkOiAnUHVyY2hhc2UgbGltaXQge3sgaXRlbS5jb2RlIH19IGFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIHVuYXNzaWduZWQ6ICdQdXJjaGFzZSBsaW1pdCB7eyBpdGVtLmNvZGUgfX0gdW5hc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VzZXJQZXJtaXNzaW9ucyA9IHtcbiAgdGl0bGU6ICdNYW5hZ2UgcHVyY2hhc2UgbGltaXRzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ1B1cmNoYXNlIGxpbWl0IHt7IGl0ZW0uY29kZSB9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnUHVyY2hhc2UgbGltaXQge3sgaXRlbS5jb2RlIH19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyQXNzaWduZWRVc2VyR3JvdXBzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIHVzZXIgZ3JvdXBzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7eyBpdGVtLm5hbWUgfX0nLFxuICBhc3NpZ25lZDogJ1VzZXIgZ3JvdXAge3tpdGVtLm5hbWV9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnVXNlciBncm91cCB7e2l0ZW0ubmFtZX19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmdVc2VyVXNlckdyb3VwcyA9IHtcbiAgdGl0bGU6ICdNYW5hZ2UgdXNlciBncm91cHMnLFxuICBzdWJ0aXRsZTogJ1VzZXI6IHt7IGl0ZW0ubmFtZSB9fScsXG4gIGFzc2lnbmVkOiAnVXNlciBncm91cCB7e2l0ZW0ubmFtZX19IGFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIHVuYXNzaWduZWQ6ICdVc2VyIGdyb3VwIHt7aXRlbS5uYW1lfX0gdW5hc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxufTtcbiJdfQ==