/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccCheckoutConfig = {
    backend: {
        occ: {
            endpoints: {
                setDeliveryAddress: 'users/${userId}/carts/${cartId}/addresses/delivery',
                cardTypes: 'cardtypes',
                createDeliveryAddress: 'users/${userId}/carts/${cartId}/addresses/delivery',
                removeDeliveryAddress: 'users/${userId}/carts/${cartId}/addresses/delivery',
                deliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
                setDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
                clearDeliveryMode: 'users/${userId}/carts/${cartId}/deliverymode',
                deliveryModes: 'users/${userId}/carts/${cartId}/deliverymodes',
                setCartPaymentDetails: 'users/${userId}/carts/${cartId}/paymentdetails',
                paymentProviderSubInfo: 'users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl',
                createPaymentDetails: 'users/${userId}/carts/${cartId}/payment/sop/response',
                getCheckoutDetails: 'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY2hlY2tvdXQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvb2NjL2NvbmZpZy9kZWZhdWx0LW9jYy1jaGVja291dC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFjO0lBQ2pELE9BQU8sRUFBRTtRQUNQLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxrQkFBa0IsRUFDaEIsb0RBQW9EO2dCQUN0RCxTQUFTLEVBQUUsV0FBVztnQkFDdEIscUJBQXFCLEVBQ25CLG9EQUFvRDtnQkFDdEQscUJBQXFCLEVBQ25CLG9EQUFvRDtnQkFDdEQsWUFBWSxFQUFFLDhDQUE4QztnQkFDNUQsZUFBZSxFQUFFLDhDQUE4QztnQkFDL0QsaUJBQWlCLEVBQUUsOENBQThDO2dCQUNqRSxhQUFhLEVBQUUsK0NBQStDO2dCQUM5RCxxQkFBcUIsRUFBRSxnREFBZ0Q7Z0JBQ3ZFLHNCQUFzQixFQUNwQiwyRUFBMkU7Z0JBQzdFLG9CQUFvQixFQUNsQixzREFBc0Q7Z0JBQ3hELGtCQUFrQixFQUNoQixtR0FBbUc7YUFDdEc7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T2NjQ2hlY2tvdXRDb25maWc6IE9jY0NvbmZpZyA9IHtcbiAgYmFja2VuZDoge1xuICAgIG9jYzoge1xuICAgICAgZW5kcG9pbnRzOiB7XG4gICAgICAgIHNldERlbGl2ZXJ5QWRkcmVzczpcbiAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9hZGRyZXNzZXMvZGVsaXZlcnknLFxuICAgICAgICBjYXJkVHlwZXM6ICdjYXJkdHlwZXMnLFxuICAgICAgICBjcmVhdGVEZWxpdmVyeUFkZHJlc3M6XG4gICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vYWRkcmVzc2VzL2RlbGl2ZXJ5JyxcbiAgICAgICAgcmVtb3ZlRGVsaXZlcnlBZGRyZXNzOlxuICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L2FkZHJlc3Nlcy9kZWxpdmVyeScsXG4gICAgICAgIGRlbGl2ZXJ5TW9kZTogJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vZGVsaXZlcnltb2RlJyxcbiAgICAgICAgc2V0RGVsaXZlcnlNb2RlOiAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9kZWxpdmVyeW1vZGUnLFxuICAgICAgICBjbGVhckRlbGl2ZXJ5TW9kZTogJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vZGVsaXZlcnltb2RlJyxcbiAgICAgICAgZGVsaXZlcnlNb2RlczogJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vZGVsaXZlcnltb2RlcycsXG4gICAgICAgIHNldENhcnRQYXltZW50RGV0YWlsczogJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vcGF5bWVudGRldGFpbHMnLFxuICAgICAgICBwYXltZW50UHJvdmlkZXJTdWJJbmZvOlxuICAgICAgICAgICd1c2Vycy8ke3VzZXJJZH0vY2FydHMvJHtjYXJ0SWR9L3BheW1lbnQvc29wL3JlcXVlc3Q/cmVzcG9uc2VVcmw9c2FtcGxlVXJsJyxcbiAgICAgICAgY3JlYXRlUGF5bWVudERldGFpbHM6XG4gICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vcGF5bWVudC9zb3AvcmVzcG9uc2UnLFxuICAgICAgICBnZXRDaGVja291dERldGFpbHM6XG4gICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0/ZmllbGRzPWRlbGl2ZXJ5QWRkcmVzcyhGVUxMKSxkZWxpdmVyeU1vZGUoRlVMTCkscGF5bWVudEluZm8oRlVMTCknLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==