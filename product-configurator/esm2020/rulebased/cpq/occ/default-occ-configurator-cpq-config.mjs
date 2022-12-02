/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function defaultOccCpqConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    getCpqAccessData: 'users/current/access/cpqconfigurator',
                    addCpqConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/cpqconfigurator',
                    readCpqConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
                    readCpqConfigurationForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/cpqconfigurator',
                    updateCpqConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/cpqconfigurator',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLWNwcS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NwcS9vY2MvZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLWNwcS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sVUFBVSxzQ0FBc0M7SUFDcEQsT0FBTztRQUNMLE9BQU8sRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDSCxTQUFTLEVBQUU7b0JBQ1QsZ0JBQWdCLEVBQUUsc0NBQXNDO29CQUN4RCx5QkFBeUIsRUFDdkIseURBQXlEO29CQUMzRCxnQ0FBZ0MsRUFDOUIsNEVBQTRFO29CQUM5RSxpQ0FBaUMsRUFDL0IsK0VBQStFO29CQUNqRixrQ0FBa0MsRUFDaEMsNEVBQTRFO2lCQUMvRTthQUNGO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0T2NjQ3BxQ29uZmlndXJhdG9yQ29uZmlnRmFjdG9yeSgpOiBPY2NDb25maWcge1xuICByZXR1cm4ge1xuICAgIGJhY2tlbmQ6IHtcbiAgICAgIG9jYzoge1xuICAgICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgICBnZXRDcHFBY2Nlc3NEYXRhOiAndXNlcnMvY3VycmVudC9hY2Nlc3MvY3BxY29uZmlndXJhdG9yJyxcbiAgICAgICAgICBhZGRDcHFDb25maWd1cmF0aW9uVG9DYXJ0OlxuICAgICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vZW50cmllcy9jcHFjb25maWd1cmF0b3InLFxuICAgICAgICAgIHJlYWRDcHFDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5OlxuICAgICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9jYXJ0cy8ke2NhcnRJZH0vZW50cmllcy8ke2NhcnRFbnRyeU51bWJlcn0vY3BxY29uZmlndXJhdG9yJyxcbiAgICAgICAgICByZWFkQ3BxQ29uZmlndXJhdGlvbkZvck9yZGVyRW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L29yZGVycy8ke29yZGVySWR9L2VudHJpZXMvJHtvcmRlckVudHJ5TnVtYmVyfS9jcHFjb25maWd1cmF0b3InLFxuICAgICAgICAgIHVwZGF0ZUNwcUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzLyR7Y2FydEVudHJ5TnVtYmVyfS9jcHFjb25maWd1cmF0b3InLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufVxuIl19