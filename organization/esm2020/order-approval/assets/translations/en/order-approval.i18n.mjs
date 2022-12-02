/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const orderApprovalDetails = {
    back: 'Back To List',
    showForm_APPROVE: 'Approve Order...',
    showForm_REJECT: 'Reject Order...',
    form: {
        title_APPROVE: 'Approve order {{orderCode}} totalling {{orderTotal}}',
        title_REJECT: 'Reject order {{orderCode}} totalling {{orderTotal}}',
        submit_APPROVE: 'Approve',
        submit_REJECT: 'Reject',
        cancel: 'Cancel',
        comment_APPROVE: {
            label: 'Comment (optional, maximum 255 characters)',
            placeholder: '',
        },
        comment_REJECT: {
            label: 'Comment (maximum 255 characters)',
            placeholder: '',
        },
    },
    permissionResults: {
        header: 'Customer Approval Details',
        permission: 'Permission',
        approver: 'Approver',
        status: 'Status',
        approverComments: 'Approver Comments',
        noApprovalComments: 'None',
        permissionType_B2BBudgetExceededPermission: 'The budget associated with the chosen cost center has been exceeded',
        permissionType_B2BOrderThresholdPermission: 'Order total exceeded the per-order limit',
        permissionType_B2BOrderThresholdTimespanPermission: 'Order total exceeded the per-timespan limit',
    },
};
export const orderApprovalList = {
    orderCode: 'Order #',
    POCode: 'PO #',
    placedBy: 'Placed by',
    date: 'Date',
    status: 'Status',
    total: 'Total',
    none: 'None',
    emptyList: 'There are no orders to approve at this time.',
};
export const orderApprovalGlobal = {
    notification: {
        noSufficientPermissions: 'No sufficient permissions to access this page.',
    },
};
export const orderApproval = {
    orderApprovalDetails,
    orderApprovalList,
    orderApprovalGlobal,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwuaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vb3JkZXItYXBwcm92YWwvYXNzZXRzL3RyYW5zbGF0aW9ucy9lbi9vcmRlci1hcHByb3ZhbC5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRztJQUNsQyxJQUFJLEVBQUUsY0FBYztJQUNwQixnQkFBZ0IsRUFBRSxrQkFBa0I7SUFDcEMsZUFBZSxFQUFFLGlCQUFpQjtJQUNsQyxJQUFJLEVBQUU7UUFDSixhQUFhLEVBQUUsc0RBQXNEO1FBQ3JFLFlBQVksRUFBRSxxREFBcUQ7UUFDbkUsY0FBYyxFQUFFLFNBQVM7UUFDekIsYUFBYSxFQUFFLFFBQVE7UUFDdkIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsZUFBZSxFQUFFO1lBQ2YsS0FBSyxFQUFFLDRDQUE0QztZQUNuRCxXQUFXLEVBQUUsRUFBRTtTQUNoQjtRQUNELGNBQWMsRUFBRTtZQUNkLEtBQUssRUFBRSxrQ0FBa0M7WUFDekMsV0FBVyxFQUFFLEVBQUU7U0FDaEI7S0FDRjtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLE1BQU0sRUFBRSwyQkFBMkI7UUFDbkMsVUFBVSxFQUFFLFlBQVk7UUFDeEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsTUFBTSxFQUFFLFFBQVE7UUFDaEIsZ0JBQWdCLEVBQUUsbUJBQW1CO1FBQ3JDLGtCQUFrQixFQUFFLE1BQU07UUFDMUIsMENBQTBDLEVBQ3hDLHFFQUFxRTtRQUN2RSwwQ0FBMEMsRUFDeEMsMENBQTBDO1FBQzVDLGtEQUFrRCxFQUNoRCw2Q0FBNkM7S0FDaEQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUc7SUFDL0IsU0FBUyxFQUFFLFNBQVM7SUFDcEIsTUFBTSxFQUFFLE1BQU07SUFDZCxRQUFRLEVBQUUsV0FBVztJQUNyQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxPQUFPO0lBQ2QsSUFBSSxFQUFFLE1BQU07SUFDWixTQUFTLEVBQUUsOENBQThDO0NBQzFELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRztJQUNqQyxZQUFZLEVBQUU7UUFDWix1QkFBdUIsRUFBRSxnREFBZ0Q7S0FDMUU7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzNCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsbUJBQW1CO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgY29uc3Qgb3JkZXJBcHByb3ZhbERldGFpbHMgPSB7XG4gIGJhY2s6ICdCYWNrIFRvIExpc3QnLFxuICBzaG93Rm9ybV9BUFBST1ZFOiAnQXBwcm92ZSBPcmRlci4uLicsXG4gIHNob3dGb3JtX1JFSkVDVDogJ1JlamVjdCBPcmRlci4uLicsXG4gIGZvcm06IHtcbiAgICB0aXRsZV9BUFBST1ZFOiAnQXBwcm92ZSBvcmRlciB7e29yZGVyQ29kZX19IHRvdGFsbGluZyB7e29yZGVyVG90YWx9fScsXG4gICAgdGl0bGVfUkVKRUNUOiAnUmVqZWN0IG9yZGVyIHt7b3JkZXJDb2RlfX0gdG90YWxsaW5nIHt7b3JkZXJUb3RhbH19JyxcbiAgICBzdWJtaXRfQVBQUk9WRTogJ0FwcHJvdmUnLFxuICAgIHN1Ym1pdF9SRUpFQ1Q6ICdSZWplY3QnLFxuICAgIGNhbmNlbDogJ0NhbmNlbCcsXG4gICAgY29tbWVudF9BUFBST1ZFOiB7XG4gICAgICBsYWJlbDogJ0NvbW1lbnQgKG9wdGlvbmFsLCBtYXhpbXVtIDI1NSBjaGFyYWN0ZXJzKScsXG4gICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgfSxcbiAgICBjb21tZW50X1JFSkVDVDoge1xuICAgICAgbGFiZWw6ICdDb21tZW50IChtYXhpbXVtIDI1NSBjaGFyYWN0ZXJzKScsXG4gICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgfSxcbiAgfSxcbiAgcGVybWlzc2lvblJlc3VsdHM6IHtcbiAgICBoZWFkZXI6ICdDdXN0b21lciBBcHByb3ZhbCBEZXRhaWxzJyxcbiAgICBwZXJtaXNzaW9uOiAnUGVybWlzc2lvbicsXG4gICAgYXBwcm92ZXI6ICdBcHByb3ZlcicsXG4gICAgc3RhdHVzOiAnU3RhdHVzJyxcbiAgICBhcHByb3ZlckNvbW1lbnRzOiAnQXBwcm92ZXIgQ29tbWVudHMnLFxuICAgIG5vQXBwcm92YWxDb21tZW50czogJ05vbmUnLFxuICAgIHBlcm1pc3Npb25UeXBlX0IyQkJ1ZGdldEV4Y2VlZGVkUGVybWlzc2lvbjpcbiAgICAgICdUaGUgYnVkZ2V0IGFzc29jaWF0ZWQgd2l0aCB0aGUgY2hvc2VuIGNvc3QgY2VudGVyIGhhcyBiZWVuIGV4Y2VlZGVkJyxcbiAgICBwZXJtaXNzaW9uVHlwZV9CMkJPcmRlclRocmVzaG9sZFBlcm1pc3Npb246XG4gICAgICAnT3JkZXIgdG90YWwgZXhjZWVkZWQgdGhlIHBlci1vcmRlciBsaW1pdCcsXG4gICAgcGVybWlzc2lvblR5cGVfQjJCT3JkZXJUaHJlc2hvbGRUaW1lc3BhblBlcm1pc3Npb246XG4gICAgICAnT3JkZXIgdG90YWwgZXhjZWVkZWQgdGhlIHBlci10aW1lc3BhbiBsaW1pdCcsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgb3JkZXJBcHByb3ZhbExpc3QgPSB7XG4gIG9yZGVyQ29kZTogJ09yZGVyICMnLFxuICBQT0NvZGU6ICdQTyAjJyxcbiAgcGxhY2VkQnk6ICdQbGFjZWQgYnknLFxuICBkYXRlOiAnRGF0ZScsXG4gIHN0YXR1czogJ1N0YXR1cycsXG4gIHRvdGFsOiAnVG90YWwnLFxuICBub25lOiAnTm9uZScsXG4gIGVtcHR5TGlzdDogJ1RoZXJlIGFyZSBubyBvcmRlcnMgdG8gYXBwcm92ZSBhdCB0aGlzIHRpbWUuJyxcbn07XG5cbmV4cG9ydCBjb25zdCBvcmRlckFwcHJvdmFsR2xvYmFsID0ge1xuICBub3RpZmljYXRpb246IHtcbiAgICBub1N1ZmZpY2llbnRQZXJtaXNzaW9uczogJ05vIHN1ZmZpY2llbnQgcGVybWlzc2lvbnMgdG8gYWNjZXNzIHRoaXMgcGFnZS4nLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG9yZGVyQXBwcm92YWwgPSB7XG4gIG9yZGVyQXBwcm92YWxEZXRhaWxzLFxuICBvcmRlckFwcHJvdmFsTGlzdCxcbiAgb3JkZXJBcHByb3ZhbEdsb2JhbCxcbn07XG4iXX0=