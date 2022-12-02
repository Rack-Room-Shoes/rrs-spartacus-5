/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orgUnit = {
    header: 'All units ({{count}})',
    unit: 'Unit',
    name: 'Name',
    uid: 'ID',
    approvalProcess: 'Approval process',
    parentUnit: 'Parent Unit',
    active: 'Status',
    hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. The cost centers and delivery addresses available to a buyer when checking out, depend on their unit. Users have access to all child units of their primary unit.',
    details: {
        title: 'Unit Details',
        subtitle: 'Unit: {{ item.name }}',
        hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Disabling a unit disables all children of the unit, including child units, users, approvers, and cost centers. Disabled units cannot be edited.',
    },
    edit: {
        title: 'Edit Unit',
        subtitle: 'Unit: {{ item.name }}',
    },
    create: {
        title: 'Create Unit',
        subtitle: '',
    },
    messages: {
        deactivateTitle: 'Disable this unit?',
        deactivate: `Disabling a unit has wide-ranging affects on your commerce organization. ALL the unit's child units, users, budgets, and cost centers will also disabled.`,
        confirmEnabled: 'Unit {{item.name}} enabled successfully',
        confirmDisabled: 'Unit {{item.name}} disabled successfully',
        update: 'Unit {{ item.name }} updated successfully',
        create: 'Unit {{ item.name }} created successfully',
    },
    info: {
        disabledEdit: 'Enable the unit to allow editing.',
        disabledEnable: 'Parent must be enabled before this unit may be enabled.',
        disabledDisable: 'Root unit can not be disabled.',
    },
    links: {
        units: 'Child Units',
        users: 'Users',
        approvers: 'Approvers',
        shippingAddresses: 'Delivery Addresses',
        costCenters: 'Cost Centers',
    },
    tree: {
        expandAll: 'Expand all',
        collapseAll: 'Collapse all',
    },
    children: {
        create: {
            title: 'Create child unit',
            subtitle: '',
        },
        messages: {
            create: 'Unit {{ item.name }} created successfully',
        },
    },
    costCenters: {
        create: {
            title: 'Create cost center',
            subtitle: '',
        },
    },
    form: {
        parentOrgUnit: 'Parent business unit',
        create: 'Create Unit',
        parentOrgUnitNotes: 'This unit is the top-level unit for your organization. It cannot be assigned to another unit.',
    },
    users: {
        header: 'Users in {{code}}',
        changeUserRoles: 'Change user roles',
        newUser: 'New user',
    },
    assignRoles: {
        header: 'Manage roles in {{code}}',
        instructions: {
            check: "To assign a role to a user, select the role's check box.",
            uncheck: "To remove a role, clear the role's check box.",
            changes: 'Changes are saved automatically.',
        },
    },
    approvers: {
        header: 'Approvers in {{code}}',
        assign: 'Manage approvers',
        new: 'New approver',
    },
    assignApprovers: {
        header: 'Manage approvers in {{code}}',
        instructions: {
            check: "To assign an approver to this unit, select the user's check box.",
            uncheck: "To remove an approver, clear the user's check box.",
            changes: 'Changes are saved automatically.',
        },
        hint: "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
    },
    breadcrumbs: {
        list: 'All units',
        details: '{{name}}',
        children: 'Child units',
        users: 'Users',
        approvers: 'Approvers',
        addresses: 'Delivery addresses',
        addressDetails: '{{formattedAddress}}',
        costCenters: 'Cost Centers',
    },
};
export const orgUnitChildren = {
    title: 'Child units',
    subtitle: 'Unit: {{item.name}}',
    info: {
        disabledCreate: 'Child unit can not be created for disabled unit.',
    },
    hint: 'Units represent departments, stores, regions, or any other logical grouping that makes sense to you. Users "inherit" child units, meaning buyers have access to cost centers and delivery addresses of child units when checking out.',
};
export const orgUnitAssignedRoles = {
    header: 'Manage roles in {{code}}',
    name: 'Name',
    email: 'Email',
    roles: 'Roles',
    roleCustomer: 'Customer',
    roleApprover: 'Approver',
    roleManager: 'Manager',
    roleAdministrator: 'Admin',
};
export const orgUnitApprovers = {
    title: 'Manage approvers',
    subtitle: 'Unit: {{item.name}}',
    assigned: 'User {{item.name}} assigned successfully',
    unassigned: 'User {{item.name}} unassigned successfully',
};
export const orgUnitAssignedApprovers = {
    title: 'Assigned approvers',
    subtitle: 'Unit: {{item.name}}',
    assigned: 'User {{item.name}} assigned successfully',
    unassigned: 'User {{item.name}} unassigned successfully',
    hint: "Users displayed under the Approvers list are assigned approval privileges for the buyers of this unit and of child units. Note that a user who has the approver role is separate from an approver who appears under the Approvers list. If an approver doesn't exist for a unit, or if approvers do not have sufficient approval purchase privileges, an approver higher up the unit hierarchy is found, until an administration is chosen.",
};
export const orgUnitAssignedUsers = {
    title: 'Assigned users',
    subtitle: 'Unit: {{item.name}}',
};
export const orgUnitUsers = {
    title: 'Assigned users',
    subtitle: 'Unit: {{item.name}}',
    info: {
        disabledCreate: 'User can not be created for disabled unit.',
    },
    hint: 'Users are the buyers, approvers, managers, and administrators of your organization. Each user is assigned a role for making or approving purchases. Users "inherit" child units, meaning buyers have access to cost centers and delivery addresses of child units when checking out.',
};
export const orgUnitUserRoles = {
    title: 'User roles',
    subtitle: 'User: {{item.name}}',
    messages: {
        rolesUpdated: 'Roles successfully updated for {{item.name}}',
    },
};
export const orgUnitCostCenters = {
    title: 'Assigned cost centers',
    subtitle: 'Unit: {{item.name}}',
    info: {
        disabledCreate: 'Cost center can not be created for disabled unit.',
    },
    hint: 'All orders placed through your organization\'s purchase account are linked to a cost center for tracking purposes. A buyer selects a cost center when checking out using the "Account" purchase method. Each unit can have multiple cost centers, but a single cost center can only be assigned to a single unit. To define ultimate spending limits, budgets are assigned to cost centers. ',
};
export const orgUnitAddress = {
    title: 'Delivery addresses',
    subtitle: 'Unit: {{item.name}}',
    country: 'Country/Region',
    titles: 'Title',
    firstName: 'First name',
    lastName: 'Last name',
    formattedAddress: 'Address',
    address1: 'Address',
    address2: '2nd address (optional)',
    city: 'City',
    state: 'State',
    zipCode: 'Zip code',
    phoneNumber: 'Phone number (optional)',
    streetAddress: 'Street Address',
    aptSuite: 'Apt, Suite',
    selectOne: 'Select One...',
    hint: 'When a buyer is checking out using the "Account" purchase method, they much choose a cost center. The delivery addresses available to the buyer depend on the unit of the cost center chosen.',
    details: {
        title: 'Address details',
        subtitle: 'Unit: {{item.name}}',
    },
    edit: {
        title: 'Edit Address',
    },
    create: {
        title: 'Create Address',
    },
    form: {
        subtitle: 'Unit: {{item.name}}',
    },
    messages: {
        create: 'Address {{ item.firstName }} {{ item.lastName }} created successfully',
        update: 'Address {{ item.firstName }} {{ item.lastName }} updated successfully',
        delete: 'The address cannot be brought back. Existing orders are not affected.',
        deleteTitle: 'Delete this address?',
        deleted: 'Address {{ item.firstName }} {{ item.lastName }} deleted successfully',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHMuaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vYXNzZXRzL3RyYW5zbGF0aW9ucy9lbi91bml0cy5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUc7SUFDckIsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osR0FBRyxFQUFFLElBQUk7SUFDVCxlQUFlLEVBQUUsa0JBQWtCO0lBQ25DLFVBQVUsRUFBRSxhQUFhO0lBQ3pCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSx3UUFBd1E7SUFDOVEsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLGNBQWM7UUFDckIsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxJQUFJLEVBQUUsc1BBQXNQO0tBQzdQO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLFdBQVc7UUFDbEIsUUFBUSxFQUFFLHVCQUF1QjtLQUNsQztJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFFRCxRQUFRLEVBQUU7UUFDUixlQUFlLEVBQUUsb0JBQW9CO1FBQ3JDLFVBQVUsRUFBRSwySkFBMko7UUFDdkssY0FBYyxFQUFFLHlDQUF5QztRQUN6RCxlQUFlLEVBQUUsMENBQTBDO1FBQzNELE1BQU0sRUFBRSwyQ0FBMkM7UUFDbkQsTUFBTSxFQUFFLDJDQUEyQztLQUNwRDtJQUNELElBQUksRUFBRTtRQUNKLFlBQVksRUFBRSxtQ0FBbUM7UUFDakQsY0FBYyxFQUFFLHlEQUF5RDtRQUN6RSxlQUFlLEVBQUUsZ0NBQWdDO0tBQ2xEO0lBRUQsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLGFBQWE7UUFD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TSxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsaUJBQWlCO1FBQ3hCLFFBQVEsRUFBRSxxQkFBcUI7S0FDaEM7SUFDRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsY0FBYztLQUN0QjtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxnQkFBZ0I7S0FDeEI7SUFDRCxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUscUJBQXFCO0tBQ2hDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsTUFBTSxFQUNKLHVFQUF1RTtRQUN6RSxNQUFNLEVBQ0osdUVBQXVFO1FBQ3pFLE1BQU0sRUFDSix1RUFBdUU7UUFDekUsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxPQUFPLEVBQ0wsdUVBQXVFO0tBQzFFO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjb25zdCBvcmdVbml0ID0ge1xuICBoZWFkZXI6ICdBbGwgdW5pdHMgKHt7Y291bnR9fSknLFxuICB1bml0OiAnVW5pdCcsXG4gIG5hbWU6ICdOYW1lJyxcbiAgdWlkOiAnSUQnLFxuICBhcHByb3ZhbFByb2Nlc3M6ICdBcHByb3ZhbCBwcm9jZXNzJyxcbiAgcGFyZW50VW5pdDogJ1BhcmVudCBVbml0JyxcbiAgYWN0aXZlOiAnU3RhdHVzJyxcbiAgaGludDogJ1VuaXRzIHJlcHJlc2VudCBkZXBhcnRtZW50cywgc3RvcmVzLCByZWdpb25zLCBvciBhbnkgb3RoZXIgbG9naWNhbCBncm91cGluZyB0aGF0IG1ha2VzIHNlbnNlIHRvIHlvdS4gVGhlIGNvc3QgY2VudGVycyBhbmQgZGVsaXZlcnkgYWRkcmVzc2VzIGF2YWlsYWJsZSB0byBhIGJ1eWVyIHdoZW4gY2hlY2tpbmcgb3V0LCBkZXBlbmQgb24gdGhlaXIgdW5pdC4gVXNlcnMgaGF2ZSBhY2Nlc3MgdG8gYWxsIGNoaWxkIHVuaXRzIG9mIHRoZWlyIHByaW1hcnkgdW5pdC4nLFxuICBkZXRhaWxzOiB7XG4gICAgdGl0bGU6ICdVbml0IERldGFpbHMnLFxuICAgIHN1YnRpdGxlOiAnVW5pdDoge3sgaXRlbS5uYW1lIH19JyxcbiAgICBoaW50OiAnVW5pdHMgcmVwcmVzZW50IGRlcGFydG1lbnRzLCBzdG9yZXMsIHJlZ2lvbnMsIG9yIGFueSBvdGhlciBsb2dpY2FsIGdyb3VwaW5nIHRoYXQgbWFrZXMgc2Vuc2UgdG8geW91LiBEaXNhYmxpbmcgYSB1bml0IGRpc2FibGVzIGFsbCBjaGlsZHJlbiBvZiB0aGUgdW5pdCwgaW5jbHVkaW5nIGNoaWxkIHVuaXRzLCB1c2VycywgYXBwcm92ZXJzLCBhbmQgY29zdCBjZW50ZXJzLiBEaXNhYmxlZCB1bml0cyBjYW5ub3QgYmUgZWRpdGVkLicsXG4gIH0sXG4gIGVkaXQ6IHtcbiAgICB0aXRsZTogJ0VkaXQgVW5pdCcsXG4gICAgc3VidGl0bGU6ICdVbml0OiB7eyBpdGVtLm5hbWUgfX0nLFxuICB9LFxuICBjcmVhdGU6IHtcbiAgICB0aXRsZTogJ0NyZWF0ZSBVbml0JyxcbiAgICBzdWJ0aXRsZTogJycsXG4gIH0sXG5cbiAgbWVzc2FnZXM6IHtcbiAgICBkZWFjdGl2YXRlVGl0bGU6ICdEaXNhYmxlIHRoaXMgdW5pdD8nLFxuICAgIGRlYWN0aXZhdGU6IGBEaXNhYmxpbmcgYSB1bml0IGhhcyB3aWRlLXJhbmdpbmcgYWZmZWN0cyBvbiB5b3VyIGNvbW1lcmNlIG9yZ2FuaXphdGlvbi4gQUxMIHRoZSB1bml0J3MgY2hpbGQgdW5pdHMsIHVzZXJzLCBidWRnZXRzLCBhbmQgY29zdCBjZW50ZXJzIHdpbGwgYWxzbyBkaXNhYmxlZC5gLFxuICAgIGNvbmZpcm1FbmFibGVkOiAnVW5pdCB7e2l0ZW0ubmFtZX19IGVuYWJsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBjb25maXJtRGlzYWJsZWQ6ICdVbml0IHt7aXRlbS5uYW1lfX0gZGlzYWJsZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB1cGRhdGU6ICdVbml0IHt7IGl0ZW0ubmFtZSB9fSB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgY3JlYXRlOiAnVW5pdCB7eyBpdGVtLm5hbWUgfX0gY3JlYXRlZCBzdWNjZXNzZnVsbHknLFxuICB9LFxuICBpbmZvOiB7XG4gICAgZGlzYWJsZWRFZGl0OiAnRW5hYmxlIHRoZSB1bml0IHRvIGFsbG93IGVkaXRpbmcuJyxcbiAgICBkaXNhYmxlZEVuYWJsZTogJ1BhcmVudCBtdXN0IGJlIGVuYWJsZWQgYmVmb3JlIHRoaXMgdW5pdCBtYXkgYmUgZW5hYmxlZC4nLFxuICAgIGRpc2FibGVkRGlzYWJsZTogJ1Jvb3QgdW5pdCBjYW4gbm90IGJlIGRpc2FibGVkLicsXG4gIH0sXG5cbiAgbGlua3M6IHtcbiAgICB1bml0czogJ0NoaWxkIFVuaXRzJyxcbiAgICB1c2VyczogJ1VzZXJzJyxcbiAgICBhcHByb3ZlcnM6ICdBcHByb3ZlcnMnLFxuICAgIHNoaXBwaW5nQWRkcmVzc2VzOiAnRGVsaXZlcnkgQWRkcmVzc2VzJyxcbiAgICBjb3N0Q2VudGVyczogJ0Nvc3QgQ2VudGVycycsXG4gIH0sXG5cbiAgdHJlZToge1xuICAgIGV4cGFuZEFsbDogJ0V4cGFuZCBhbGwnLFxuICAgIGNvbGxhcHNlQWxsOiAnQ29sbGFwc2UgYWxsJyxcbiAgfSxcblxuICBjaGlsZHJlbjoge1xuICAgIGNyZWF0ZToge1xuICAgICAgdGl0bGU6ICdDcmVhdGUgY2hpbGQgdW5pdCcsXG4gICAgICBzdWJ0aXRsZTogJycsXG4gICAgfSxcbiAgICBtZXNzYWdlczoge1xuICAgICAgY3JlYXRlOiAnVW5pdCB7eyBpdGVtLm5hbWUgfX0gY3JlYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgIH0sXG4gIH0sXG5cbiAgY29zdENlbnRlcnM6IHtcbiAgICBjcmVhdGU6IHtcbiAgICAgIHRpdGxlOiAnQ3JlYXRlIGNvc3QgY2VudGVyJyxcbiAgICAgIHN1YnRpdGxlOiAnJyxcbiAgICB9LFxuICB9LFxuXG4gIGZvcm06IHtcbiAgICBwYXJlbnRPcmdVbml0OiAnUGFyZW50IGJ1c2luZXNzIHVuaXQnLFxuICAgIGNyZWF0ZTogJ0NyZWF0ZSBVbml0JyxcbiAgICBwYXJlbnRPcmdVbml0Tm90ZXM6XG4gICAgICAnVGhpcyB1bml0IGlzIHRoZSB0b3AtbGV2ZWwgdW5pdCBmb3IgeW91ciBvcmdhbml6YXRpb24uIEl0IGNhbm5vdCBiZSBhc3NpZ25lZCB0byBhbm90aGVyIHVuaXQuJyxcbiAgfSxcbiAgdXNlcnM6IHtcbiAgICBoZWFkZXI6ICdVc2VycyBpbiB7e2NvZGV9fScsXG4gICAgY2hhbmdlVXNlclJvbGVzOiAnQ2hhbmdlIHVzZXIgcm9sZXMnLFxuICAgIG5ld1VzZXI6ICdOZXcgdXNlcicsXG4gIH0sXG4gIGFzc2lnblJvbGVzOiB7XG4gICAgaGVhZGVyOiAnTWFuYWdlIHJvbGVzIGluIHt7Y29kZX19JyxcbiAgICBpbnN0cnVjdGlvbnM6IHtcbiAgICAgIGNoZWNrOiBcIlRvIGFzc2lnbiBhIHJvbGUgdG8gYSB1c2VyLCBzZWxlY3QgdGhlIHJvbGUncyBjaGVjayBib3guXCIsXG4gICAgICB1bmNoZWNrOiBcIlRvIHJlbW92ZSBhIHJvbGUsIGNsZWFyIHRoZSByb2xlJ3MgY2hlY2sgYm94LlwiLFxuICAgICAgY2hhbmdlczogJ0NoYW5nZXMgYXJlIHNhdmVkIGF1dG9tYXRpY2FsbHkuJyxcbiAgICB9LFxuICB9LFxuICBhcHByb3ZlcnM6IHtcbiAgICBoZWFkZXI6ICdBcHByb3ZlcnMgaW4ge3tjb2RlfX0nLFxuICAgIGFzc2lnbjogJ01hbmFnZSBhcHByb3ZlcnMnLFxuICAgIG5ldzogJ05ldyBhcHByb3ZlcicsXG4gIH0sXG4gIGFzc2lnbkFwcHJvdmVyczoge1xuICAgIGhlYWRlcjogJ01hbmFnZSBhcHByb3ZlcnMgaW4ge3tjb2RlfX0nLFxuICAgIGluc3RydWN0aW9uczoge1xuICAgICAgY2hlY2s6IFwiVG8gYXNzaWduIGFuIGFwcHJvdmVyIHRvIHRoaXMgdW5pdCwgc2VsZWN0IHRoZSB1c2VyJ3MgY2hlY2sgYm94LlwiLFxuICAgICAgdW5jaGVjazogXCJUbyByZW1vdmUgYW4gYXBwcm92ZXIsIGNsZWFyIHRoZSB1c2VyJ3MgY2hlY2sgYm94LlwiLFxuICAgICAgY2hhbmdlczogJ0NoYW5nZXMgYXJlIHNhdmVkIGF1dG9tYXRpY2FsbHkuJyxcbiAgICB9LFxuICAgIGhpbnQ6IFwiVXNlcnMgZGlzcGxheWVkIHVuZGVyIHRoZSBBcHByb3ZlcnMgbGlzdCBhcmUgYXNzaWduZWQgYXBwcm92YWwgcHJpdmlsZWdlcyBmb3IgdGhlIGJ1eWVycyBvZiB0aGlzIHVuaXQgYW5kIG9mIGNoaWxkIHVuaXRzLiBOb3RlIHRoYXQgYSB1c2VyIHdobyBoYXMgdGhlIGFwcHJvdmVyIHJvbGUgaXMgc2VwYXJhdGUgZnJvbSBhbiBhcHByb3ZlciB3aG8gYXBwZWFycyB1bmRlciB0aGUgQXBwcm92ZXJzIGxpc3QuIElmIGFuIGFwcHJvdmVyIGRvZXNuJ3QgZXhpc3QgZm9yIGEgdW5pdCwgb3IgaWYgYXBwcm92ZXJzIGRvIG5vdCBoYXZlIHN1ZmZpY2llbnQgYXBwcm92YWwgcHVyY2hhc2UgcHJpdmlsZWdlcywgYW4gYXBwcm92ZXIgaGlnaGVyIHVwIHRoZSB1bml0IGhpZXJhcmNoeSBpcyBmb3VuZCwgdW50aWwgYW4gYWRtaW5pc3RyYXRpb24gaXMgY2hvc2VuLlwiLFxuICB9LFxuXG4gIGJyZWFkY3J1bWJzOiB7XG4gICAgbGlzdDogJ0FsbCB1bml0cycsXG4gICAgZGV0YWlsczogJ3t7bmFtZX19JyxcbiAgICBjaGlsZHJlbjogJ0NoaWxkIHVuaXRzJyxcbiAgICB1c2VyczogJ1VzZXJzJyxcbiAgICBhcHByb3ZlcnM6ICdBcHByb3ZlcnMnLFxuICAgIGFkZHJlc3NlczogJ0RlbGl2ZXJ5IGFkZHJlc3NlcycsXG4gICAgYWRkcmVzc0RldGFpbHM6ICd7e2Zvcm1hdHRlZEFkZHJlc3N9fScsXG4gICAgY29zdENlbnRlcnM6ICdDb3N0IENlbnRlcnMnLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRDaGlsZHJlbiA9IHtcbiAgdGl0bGU6ICdDaGlsZCB1bml0cycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZENyZWF0ZTogJ0NoaWxkIHVuaXQgY2FuIG5vdCBiZSBjcmVhdGVkIGZvciBkaXNhYmxlZCB1bml0LicsXG4gIH0sXG4gIGhpbnQ6ICdVbml0cyByZXByZXNlbnQgZGVwYXJ0bWVudHMsIHN0b3JlcywgcmVnaW9ucywgb3IgYW55IG90aGVyIGxvZ2ljYWwgZ3JvdXBpbmcgdGhhdCBtYWtlcyBzZW5zZSB0byB5b3UuIFVzZXJzIFwiaW5oZXJpdFwiIGNoaWxkIHVuaXRzLCBtZWFuaW5nIGJ1eWVycyBoYXZlIGFjY2VzcyB0byBjb3N0IGNlbnRlcnMgYW5kIGRlbGl2ZXJ5IGFkZHJlc3NlcyBvZiBjaGlsZCB1bml0cyB3aGVuIGNoZWNraW5nIG91dC4nLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRBc3NpZ25lZFJvbGVzID0ge1xuICBoZWFkZXI6ICdNYW5hZ2Ugcm9sZXMgaW4ge3tjb2RlfX0nLFxuICBuYW1lOiAnTmFtZScsXG4gIGVtYWlsOiAnRW1haWwnLFxuICByb2xlczogJ1JvbGVzJyxcbiAgcm9sZUN1c3RvbWVyOiAnQ3VzdG9tZXInLFxuICByb2xlQXBwcm92ZXI6ICdBcHByb3ZlcicsXG4gIHJvbGVNYW5hZ2VyOiAnTWFuYWdlcicsXG4gIHJvbGVBZG1pbmlzdHJhdG9yOiAnQWRtaW4nLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRBcHByb3ZlcnMgPSB7XG4gIHRpdGxlOiAnTWFuYWdlIGFwcHJvdmVycycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIGFzc2lnbmVkOiAnVXNlciB7e2l0ZW0ubmFtZX19IGFzc2lnbmVkIHN1Y2Nlc3NmdWxseScsXG4gIHVuYXNzaWduZWQ6ICdVc2VyIHt7aXRlbS5uYW1lfX0gdW5hc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRBc3NpZ25lZEFwcHJvdmVycyA9IHtcbiAgdGl0bGU6ICdBc3NpZ25lZCBhcHByb3ZlcnMnLFxuICBzdWJ0aXRsZTogJ1VuaXQ6IHt7aXRlbS5uYW1lfX0nLFxuICBhc3NpZ25lZDogJ1VzZXIge3tpdGVtLm5hbWV9fSBhc3NpZ25lZCBzdWNjZXNzZnVsbHknLFxuICB1bmFzc2lnbmVkOiAnVXNlciB7e2l0ZW0ubmFtZX19IHVuYXNzaWduZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgaGludDogXCJVc2VycyBkaXNwbGF5ZWQgdW5kZXIgdGhlIEFwcHJvdmVycyBsaXN0IGFyZSBhc3NpZ25lZCBhcHByb3ZhbCBwcml2aWxlZ2VzIGZvciB0aGUgYnV5ZXJzIG9mIHRoaXMgdW5pdCBhbmQgb2YgY2hpbGQgdW5pdHMuIE5vdGUgdGhhdCBhIHVzZXIgd2hvIGhhcyB0aGUgYXBwcm92ZXIgcm9sZSBpcyBzZXBhcmF0ZSBmcm9tIGFuIGFwcHJvdmVyIHdobyBhcHBlYXJzIHVuZGVyIHRoZSBBcHByb3ZlcnMgbGlzdC4gSWYgYW4gYXBwcm92ZXIgZG9lc24ndCBleGlzdCBmb3IgYSB1bml0LCBvciBpZiBhcHByb3ZlcnMgZG8gbm90IGhhdmUgc3VmZmljaWVudCBhcHByb3ZhbCBwdXJjaGFzZSBwcml2aWxlZ2VzLCBhbiBhcHByb3ZlciBoaWdoZXIgdXAgdGhlIHVuaXQgaGllcmFyY2h5IGlzIGZvdW5kLCB1bnRpbCBhbiBhZG1pbmlzdHJhdGlvbiBpcyBjaG9zZW4uXCIsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVW5pdEFzc2lnbmVkVXNlcnMgPSB7XG4gIHRpdGxlOiAnQXNzaWduZWQgdXNlcnMnLFxuICBzdWJ0aXRsZTogJ1VuaXQ6IHt7aXRlbS5uYW1lfX0nLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRVc2VycyA9IHtcbiAgdGl0bGU6ICdBc3NpZ25lZCB1c2VycycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZENyZWF0ZTogJ1VzZXIgY2FuIG5vdCBiZSBjcmVhdGVkIGZvciBkaXNhYmxlZCB1bml0LicsXG4gIH0sXG4gIGhpbnQ6ICdVc2VycyBhcmUgdGhlIGJ1eWVycywgYXBwcm92ZXJzLCBtYW5hZ2VycywgYW5kIGFkbWluaXN0cmF0b3JzIG9mIHlvdXIgb3JnYW5pemF0aW9uLiBFYWNoIHVzZXIgaXMgYXNzaWduZWQgYSByb2xlIGZvciBtYWtpbmcgb3IgYXBwcm92aW5nIHB1cmNoYXNlcy4gVXNlcnMgXCJpbmhlcml0XCIgY2hpbGQgdW5pdHMsIG1lYW5pbmcgYnV5ZXJzIGhhdmUgYWNjZXNzIHRvIGNvc3QgY2VudGVycyBhbmQgZGVsaXZlcnkgYWRkcmVzc2VzIG9mIGNoaWxkIHVuaXRzIHdoZW4gY2hlY2tpbmcgb3V0LicsXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVW5pdFVzZXJSb2xlcyA9IHtcbiAgdGl0bGU6ICdVc2VyIHJvbGVzJyxcbiAgc3VidGl0bGU6ICdVc2VyOiB7e2l0ZW0ubmFtZX19JyxcbiAgbWVzc2FnZXM6IHtcbiAgICByb2xlc1VwZGF0ZWQ6ICdSb2xlcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCBmb3Ige3tpdGVtLm5hbWV9fScsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgb3JnVW5pdENvc3RDZW50ZXJzID0ge1xuICB0aXRsZTogJ0Fzc2lnbmVkIGNvc3QgY2VudGVycycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIGluZm86IHtcbiAgICBkaXNhYmxlZENyZWF0ZTogJ0Nvc3QgY2VudGVyIGNhbiBub3QgYmUgY3JlYXRlZCBmb3IgZGlzYWJsZWQgdW5pdC4nLFxuICB9LFxuICBoaW50OiAnQWxsIG9yZGVycyBwbGFjZWQgdGhyb3VnaCB5b3VyIG9yZ2FuaXphdGlvblxcJ3MgcHVyY2hhc2UgYWNjb3VudCBhcmUgbGlua2VkIHRvIGEgY29zdCBjZW50ZXIgZm9yIHRyYWNraW5nIHB1cnBvc2VzLiBBIGJ1eWVyIHNlbGVjdHMgYSBjb3N0IGNlbnRlciB3aGVuIGNoZWNraW5nIG91dCB1c2luZyB0aGUgXCJBY2NvdW50XCIgcHVyY2hhc2UgbWV0aG9kLiBFYWNoIHVuaXQgY2FuIGhhdmUgbXVsdGlwbGUgY29zdCBjZW50ZXJzLCBidXQgYSBzaW5nbGUgY29zdCBjZW50ZXIgY2FuIG9ubHkgYmUgYXNzaWduZWQgdG8gYSBzaW5nbGUgdW5pdC4gVG8gZGVmaW5lIHVsdGltYXRlIHNwZW5kaW5nIGxpbWl0cywgYnVkZ2V0cyBhcmUgYXNzaWduZWQgdG8gY29zdCBjZW50ZXJzLiAnLFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZ1VuaXRBZGRyZXNzID0ge1xuICB0aXRsZTogJ0RlbGl2ZXJ5IGFkZHJlc3NlcycsXG4gIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG5cbiAgY291bnRyeTogJ0NvdW50cnkvUmVnaW9uJyxcbiAgdGl0bGVzOiAnVGl0bGUnLFxuICBmaXJzdE5hbWU6ICdGaXJzdCBuYW1lJyxcbiAgbGFzdE5hbWU6ICdMYXN0IG5hbWUnLFxuICBmb3JtYXR0ZWRBZGRyZXNzOiAnQWRkcmVzcycsXG4gIGFkZHJlc3MxOiAnQWRkcmVzcycsXG4gIGFkZHJlc3MyOiAnMm5kIGFkZHJlc3MgKG9wdGlvbmFsKScsXG4gIGNpdHk6ICdDaXR5JyxcbiAgc3RhdGU6ICdTdGF0ZScsXG4gIHppcENvZGU6ICdaaXAgY29kZScsXG4gIHBob25lTnVtYmVyOiAnUGhvbmUgbnVtYmVyIChvcHRpb25hbCknLFxuICBzdHJlZXRBZGRyZXNzOiAnU3RyZWV0IEFkZHJlc3MnLFxuICBhcHRTdWl0ZTogJ0FwdCwgU3VpdGUnLFxuICBzZWxlY3RPbmU6ICdTZWxlY3QgT25lLi4uJyxcblxuICBoaW50OiAnV2hlbiBhIGJ1eWVyIGlzIGNoZWNraW5nIG91dCB1c2luZyB0aGUgXCJBY2NvdW50XCIgcHVyY2hhc2UgbWV0aG9kLCB0aGV5IG11Y2ggY2hvb3NlIGEgY29zdCBjZW50ZXIuIFRoZSBkZWxpdmVyeSBhZGRyZXNzZXMgYXZhaWxhYmxlIHRvIHRoZSBidXllciBkZXBlbmQgb24gdGhlIHVuaXQgb2YgdGhlIGNvc3QgY2VudGVyIGNob3Nlbi4nLFxuICBkZXRhaWxzOiB7XG4gICAgdGl0bGU6ICdBZGRyZXNzIGRldGFpbHMnLFxuICAgIHN1YnRpdGxlOiAnVW5pdDoge3tpdGVtLm5hbWV9fScsXG4gIH0sXG4gIGVkaXQ6IHtcbiAgICB0aXRsZTogJ0VkaXQgQWRkcmVzcycsXG4gIH0sXG4gIGNyZWF0ZToge1xuICAgIHRpdGxlOiAnQ3JlYXRlIEFkZHJlc3MnLFxuICB9LFxuICBmb3JtOiB7XG4gICAgc3VidGl0bGU6ICdVbml0OiB7e2l0ZW0ubmFtZX19JyxcbiAgfSxcbiAgbWVzc2FnZXM6IHtcbiAgICBjcmVhdGU6XG4gICAgICAnQWRkcmVzcyB7eyBpdGVtLmZpcnN0TmFtZSB9fSB7eyBpdGVtLmxhc3ROYW1lIH19IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICB1cGRhdGU6XG4gICAgICAnQWRkcmVzcyB7eyBpdGVtLmZpcnN0TmFtZSB9fSB7eyBpdGVtLmxhc3ROYW1lIH19IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICBkZWxldGU6XG4gICAgICAnVGhlIGFkZHJlc3MgY2Fubm90IGJlIGJyb3VnaHQgYmFjay4gRXhpc3Rpbmcgb3JkZXJzIGFyZSBub3QgYWZmZWN0ZWQuJyxcbiAgICBkZWxldGVUaXRsZTogJ0RlbGV0ZSB0aGlzIGFkZHJlc3M/JyxcbiAgICBkZWxldGVkOlxuICAgICAgJ0FkZHJlc3Mge3sgaXRlbS5maXJzdE5hbWUgfX0ge3sgaXRlbS5sYXN0TmFtZSB9fSBkZWxldGVkIHN1Y2Nlc3NmdWxseScsXG4gIH0sXG59O1xuIl19