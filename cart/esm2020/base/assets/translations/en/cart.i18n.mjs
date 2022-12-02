/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const cart = {
    cartDetails: {
        id: 'ID',
        proceedToCheckout: 'Proceed to Checkout',
        cartName: 'Cart #{{code}}',
    },
    cartItems: {
        id: 'ID',
        description: 'Description',
        item: 'Item',
        itemPrice: 'Item price',
        quantity: 'Qty',
        quantityTitle: 'The quantity represents the total number of this item in your cart.',
        total: 'Total',
        actions: 'Actions',
        cartTotal: 'Cart total ({{count}} item)',
        cartTotal_other: 'Cart total ({{count}} items)',
        itemRemoved: 'Selected item has been removed. Cart total has been updated.',
        caption: 'Shopping cart contents.',
    },
    orderCost: {
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal after discounts:',
        shipping: 'Shipping:',
        estimatedShipping: 'Estimated shipping:',
        discount: 'You saved:',
        salesTax: 'Sales Tax:',
        grossTax: 'The order total does not include tax of',
        grossIncludeTax: 'The order total includes tax of',
        total: 'Total:',
        toBeDetermined: 'TBD',
    },
    voucher: {
        coupon: 'Have a coupon?',
        coupon_other: 'Coupon codes',
        couponLabel: 'Enter a promo code here',
        apply: 'Apply',
        placeholder: 'Promo code',
        applyVoucherSuccess: '{{voucherCode}} has been applied.',
        removeVoucherSuccess: '{{voucherCode}} has been removed.',
        anchorLabel: 'Enter or remove your coupon code',
        vouchersApplied: 'Applied coupons',
        availableCoupons: 'Available coupons',
        availableCouponsLabel: 'You can add these coupons to this order.',
    },
    saveForLaterItems: {
        itemTotal: 'Saved for later ({{count}} item)',
        itemTotal_other: 'Saved for later ({{count}} items)',
        cartTitle: 'Cart',
        saveForLater: 'Save For Later',
        moveToCart: 'Move To Cart',
        stock: 'Stock',
        forceInStock: 'In Stock',
    },
    clearCart: {
        clearCart: 'Clear Cart',
        clearingCart: 'Clearing Cart...',
        cartClearedSuccessfully: 'Active cart cleared successfully.',
        areYouSureToClearCart: 'Are you sure you want to clear this cart?',
        allItemsWillBeRemoved: 'All items in your active cart will be removed.',
    },
    validation: {
        cartEntriesChangeDuringCheckout: 'During checkout we found problems with your entries. Please review your cart.',
        cartEntryRemoved: '{{name}} was removed from the cart due to being out of stock.',
        productOutOfStock: '{{name}} has been removed from the cart due to insufficient stock.',
        lowStock: 'Quantity has reduced to {{quantity}} due to insufficient stock.',
        reviewConfiguration: 'Resolve the issues in the configuration for cart entry first.',
        pricingError: 'Configurator pricing is currently not available. Checkout/quote submission is not possible. Please try again later.',
        unresolvableIssues: 'The product configuration requires additional entries in the back end. As a result, you cannot proceed. Please contact support.',
        inProgress: 'Processing',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2NhcnQuaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHO0lBQ2xCLFdBQVcsRUFBRTtRQUNYLEVBQUUsRUFBRSxJQUFJO1FBQ1IsaUJBQWlCLEVBQUUscUJBQXFCO1FBQ3hDLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRCxTQUFTLEVBQUU7UUFDVCxFQUFFLEVBQUUsSUFBSTtRQUNSLFdBQVcsRUFBRSxhQUFhO1FBQzFCLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLFlBQVk7UUFDdkIsUUFBUSxFQUFFLEtBQUs7UUFDZixhQUFhLEVBQ1gscUVBQXFFO1FBQ3ZFLEtBQUssRUFBRSxPQUFPO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsU0FBUyxFQUFFLDZCQUE2QjtRQUN4QyxlQUFlLEVBQUUsOEJBQThCO1FBQy9DLFdBQVcsRUFBRSw4REFBOEQ7UUFDM0UsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNELFNBQVMsRUFBRTtRQUNULFlBQVksRUFBRSxlQUFlO1FBQzdCLFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsUUFBUSxFQUFFLFdBQVc7UUFDckIsaUJBQWlCLEVBQUUscUJBQXFCO1FBQ3hDLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSx5Q0FBeUM7UUFDbkQsZUFBZSxFQUFFLGlDQUFpQztRQUNsRCxLQUFLLEVBQUUsUUFBUTtRQUNmLGNBQWMsRUFBRSxLQUFLO0tBQ3RCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixZQUFZLEVBQUUsY0FBYztRQUM1QixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLEtBQUssRUFBRSxPQUFPO1FBQ2QsV0FBVyxFQUFFLFlBQVk7UUFDekIsbUJBQW1CLEVBQUUsbUNBQW1DO1FBQ3hELG9CQUFvQixFQUFFLG1DQUFtQztRQUN6RCxXQUFXLEVBQUUsa0NBQWtDO1FBQy9DLGVBQWUsRUFBRSxpQkFBaUI7UUFDbEMsZ0JBQWdCLEVBQUUsbUJBQW1CO1FBQ3JDLHFCQUFxQixFQUFFLDBDQUEwQztLQUNsRTtJQUNELGlCQUFpQixFQUFFO1FBQ2pCLFNBQVMsRUFBRSxrQ0FBa0M7UUFDN0MsZUFBZSxFQUFFLG1DQUFtQztRQUNwRCxTQUFTLEVBQUUsTUFBTTtRQUNqQixZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLEtBQUssRUFBRSxPQUFPO1FBQ2QsWUFBWSxFQUFFLFVBQVU7S0FDekI7SUFDRCxTQUFTLEVBQUU7UUFDVCxTQUFTLEVBQUUsWUFBWTtRQUN2QixZQUFZLEVBQUUsa0JBQWtCO1FBQ2hDLHVCQUF1QixFQUFFLG1DQUFtQztRQUM1RCxxQkFBcUIsRUFBRSwyQ0FBMkM7UUFDbEUscUJBQXFCLEVBQUUsZ0RBQWdEO0tBQ3hFO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsK0JBQStCLEVBQzdCLCtFQUErRTtRQUNqRixnQkFBZ0IsRUFDZCwrREFBK0Q7UUFDakUsaUJBQWlCLEVBQ2Ysb0VBQW9FO1FBQ3RFLFFBQVEsRUFBRSxpRUFBaUU7UUFDM0UsbUJBQW1CLEVBQ2pCLCtEQUErRDtRQUNqRSxZQUFZLEVBQ1YscUhBQXFIO1FBQ3ZILGtCQUFrQixFQUNoQixpSUFBaUk7UUFDbkksVUFBVSxFQUFFLFlBQVk7S0FDekI7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNhcnQgPSB7XG4gIGNhcnREZXRhaWxzOiB7XG4gICAgaWQ6ICdJRCcsXG4gICAgcHJvY2VlZFRvQ2hlY2tvdXQ6ICdQcm9jZWVkIHRvIENoZWNrb3V0JyxcbiAgICBjYXJ0TmFtZTogJ0NhcnQgI3t7Y29kZX19JyxcbiAgfSxcbiAgY2FydEl0ZW1zOiB7XG4gICAgaWQ6ICdJRCcsXG4gICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbicsXG4gICAgaXRlbTogJ0l0ZW0nLFxuICAgIGl0ZW1QcmljZTogJ0l0ZW0gcHJpY2UnLFxuICAgIHF1YW50aXR5OiAnUXR5JyxcbiAgICBxdWFudGl0eVRpdGxlOlxuICAgICAgJ1RoZSBxdWFudGl0eSByZXByZXNlbnRzIHRoZSB0b3RhbCBudW1iZXIgb2YgdGhpcyBpdGVtIGluIHlvdXIgY2FydC4nLFxuICAgIHRvdGFsOiAnVG90YWwnLFxuICAgIGFjdGlvbnM6ICdBY3Rpb25zJyxcbiAgICBjYXJ0VG90YWw6ICdDYXJ0IHRvdGFsICh7e2NvdW50fX0gaXRlbSknLFxuICAgIGNhcnRUb3RhbF9vdGhlcjogJ0NhcnQgdG90YWwgKHt7Y291bnR9fSBpdGVtcyknLFxuICAgIGl0ZW1SZW1vdmVkOiAnU2VsZWN0ZWQgaXRlbSBoYXMgYmVlbiByZW1vdmVkLiBDYXJ0IHRvdGFsIGhhcyBiZWVuIHVwZGF0ZWQuJyxcbiAgICBjYXB0aW9uOiAnU2hvcHBpbmcgY2FydCBjb250ZW50cy4nLFxuICB9LFxuICBvcmRlckNvc3Q6IHtcbiAgICBvcmRlclN1bW1hcnk6ICdPcmRlciBTdW1tYXJ5JyxcbiAgICBzdWJ0b3RhbDogJ1N1YnRvdGFsIGFmdGVyIGRpc2NvdW50czonLFxuICAgIHNoaXBwaW5nOiAnU2hpcHBpbmc6JyxcbiAgICBlc3RpbWF0ZWRTaGlwcGluZzogJ0VzdGltYXRlZCBzaGlwcGluZzonLFxuICAgIGRpc2NvdW50OiAnWW91IHNhdmVkOicsXG4gICAgc2FsZXNUYXg6ICdTYWxlcyBUYXg6JyxcbiAgICBncm9zc1RheDogJ1RoZSBvcmRlciB0b3RhbCBkb2VzIG5vdCBpbmNsdWRlIHRheCBvZicsXG4gICAgZ3Jvc3NJbmNsdWRlVGF4OiAnVGhlIG9yZGVyIHRvdGFsIGluY2x1ZGVzIHRheCBvZicsXG4gICAgdG90YWw6ICdUb3RhbDonLFxuICAgIHRvQmVEZXRlcm1pbmVkOiAnVEJEJyxcbiAgfSxcbiAgdm91Y2hlcjoge1xuICAgIGNvdXBvbjogJ0hhdmUgYSBjb3Vwb24/JyxcbiAgICBjb3Vwb25fb3RoZXI6ICdDb3Vwb24gY29kZXMnLFxuICAgIGNvdXBvbkxhYmVsOiAnRW50ZXIgYSBwcm9tbyBjb2RlIGhlcmUnLFxuICAgIGFwcGx5OiAnQXBwbHknLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvbW8gY29kZScsXG4gICAgYXBwbHlWb3VjaGVyU3VjY2VzczogJ3t7dm91Y2hlckNvZGV9fSBoYXMgYmVlbiBhcHBsaWVkLicsXG4gICAgcmVtb3ZlVm91Y2hlclN1Y2Nlc3M6ICd7e3ZvdWNoZXJDb2RlfX0gaGFzIGJlZW4gcmVtb3ZlZC4nLFxuICAgIGFuY2hvckxhYmVsOiAnRW50ZXIgb3IgcmVtb3ZlIHlvdXIgY291cG9uIGNvZGUnLFxuICAgIHZvdWNoZXJzQXBwbGllZDogJ0FwcGxpZWQgY291cG9ucycsXG4gICAgYXZhaWxhYmxlQ291cG9uczogJ0F2YWlsYWJsZSBjb3Vwb25zJyxcbiAgICBhdmFpbGFibGVDb3Vwb25zTGFiZWw6ICdZb3UgY2FuIGFkZCB0aGVzZSBjb3Vwb25zIHRvIHRoaXMgb3JkZXIuJyxcbiAgfSxcbiAgc2F2ZUZvckxhdGVySXRlbXM6IHtcbiAgICBpdGVtVG90YWw6ICdTYXZlZCBmb3IgbGF0ZXIgKHt7Y291bnR9fSBpdGVtKScsXG4gICAgaXRlbVRvdGFsX290aGVyOiAnU2F2ZWQgZm9yIGxhdGVyICh7e2NvdW50fX0gaXRlbXMpJyxcbiAgICBjYXJ0VGl0bGU6ICdDYXJ0JyxcbiAgICBzYXZlRm9yTGF0ZXI6ICdTYXZlIEZvciBMYXRlcicsXG4gICAgbW92ZVRvQ2FydDogJ01vdmUgVG8gQ2FydCcsXG4gICAgc3RvY2s6ICdTdG9jaycsXG4gICAgZm9yY2VJblN0b2NrOiAnSW4gU3RvY2snLFxuICB9LFxuICBjbGVhckNhcnQ6IHtcbiAgICBjbGVhckNhcnQ6ICdDbGVhciBDYXJ0JyxcbiAgICBjbGVhcmluZ0NhcnQ6ICdDbGVhcmluZyBDYXJ0Li4uJyxcbiAgICBjYXJ0Q2xlYXJlZFN1Y2Nlc3NmdWxseTogJ0FjdGl2ZSBjYXJ0IGNsZWFyZWQgc3VjY2Vzc2Z1bGx5LicsXG4gICAgYXJlWW91U3VyZVRvQ2xlYXJDYXJ0OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIHRoaXMgY2FydD8nLFxuICAgIGFsbEl0ZW1zV2lsbEJlUmVtb3ZlZDogJ0FsbCBpdGVtcyBpbiB5b3VyIGFjdGl2ZSBjYXJ0IHdpbGwgYmUgcmVtb3ZlZC4nLFxuICB9LFxuICB2YWxpZGF0aW9uOiB7XG4gICAgY2FydEVudHJpZXNDaGFuZ2VEdXJpbmdDaGVja291dDpcbiAgICAgICdEdXJpbmcgY2hlY2tvdXQgd2UgZm91bmQgcHJvYmxlbXMgd2l0aCB5b3VyIGVudHJpZXMuIFBsZWFzZSByZXZpZXcgeW91ciBjYXJ0LicsXG4gICAgY2FydEVudHJ5UmVtb3ZlZDpcbiAgICAgICd7e25hbWV9fSB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBjYXJ0IGR1ZSB0byBiZWluZyBvdXQgb2Ygc3RvY2suJyxcbiAgICBwcm9kdWN0T3V0T2ZTdG9jazpcbiAgICAgICd7e25hbWV9fSBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIGNhcnQgZHVlIHRvIGluc3VmZmljaWVudCBzdG9jay4nLFxuICAgIGxvd1N0b2NrOiAnUXVhbnRpdHkgaGFzIHJlZHVjZWQgdG8ge3txdWFudGl0eX19IGR1ZSB0byBpbnN1ZmZpY2llbnQgc3RvY2suJyxcbiAgICByZXZpZXdDb25maWd1cmF0aW9uOlxuICAgICAgJ1Jlc29sdmUgdGhlIGlzc3VlcyBpbiB0aGUgY29uZmlndXJhdGlvbiBmb3IgY2FydCBlbnRyeSBmaXJzdC4nLFxuICAgIHByaWNpbmdFcnJvcjpcbiAgICAgICdDb25maWd1cmF0b3IgcHJpY2luZyBpcyBjdXJyZW50bHkgbm90IGF2YWlsYWJsZS4gQ2hlY2tvdXQvcXVvdGUgc3VibWlzc2lvbiBpcyBub3QgcG9zc2libGUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyxcbiAgICB1bnJlc29sdmFibGVJc3N1ZXM6XG4gICAgICAnVGhlIHByb2R1Y3QgY29uZmlndXJhdGlvbiByZXF1aXJlcyBhZGRpdGlvbmFsIGVudHJpZXMgaW4gdGhlIGJhY2sgZW5kLiBBcyBhIHJlc3VsdCwgeW91IGNhbm5vdCBwcm9jZWVkLiBQbGVhc2UgY29udGFjdCBzdXBwb3J0LicsXG4gICAgaW5Qcm9ncmVzczogJ1Byb2Nlc3NpbmcnLFxuICB9LFxufTtcbiJdfQ==