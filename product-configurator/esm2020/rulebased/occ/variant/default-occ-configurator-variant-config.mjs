/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function defaultOccVariantConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    createVariantConfiguration: 'products/${productCode}/configurators/ccpconfigurator',
                    readVariantConfiguration: 'ccpconfigurator/${configId}',
                    updateVariantConfiguration: 'ccpconfigurator/${configId}',
                    addVariantConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/ccpconfigurator',
                    readVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    updateVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    readVariantConfigurationOverviewForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/ccpconfigurator/configurationOverview',
                    readVariantConfigurationPriceSummary: 'ccpconfigurator/${configId}/pricing',
                    getVariantConfigurationOverview: 'ccpconfigurator/${configId}/configurationOverview',
                },
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLXZhcmlhbnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9vY2MvdmFyaWFudC9kZWZhdWx0LW9jYy1jb25maWd1cmF0b3ItdmFyaWFudC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sVUFBVSwwQ0FBMEM7SUFDeEQsT0FBTztRQUNMLE9BQU8sRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDSCxTQUFTLEVBQUU7b0JBQ1QsMEJBQTBCLEVBQ3hCLHVEQUF1RDtvQkFFekQsd0JBQXdCLEVBQUUsNkJBQTZCO29CQUV2RCwwQkFBMEIsRUFBRSw2QkFBNkI7b0JBRXpELDZCQUE2QixFQUMzQix5REFBeUQ7b0JBRTNELG9DQUFvQyxFQUNsQyw0RUFBNEU7b0JBRTlFLHNDQUFzQyxFQUNwQyw0RUFBNEU7b0JBRTlFLDZDQUE2QyxFQUMzQyxxR0FBcUc7b0JBRXZHLG9DQUFvQyxFQUNsQyxxQ0FBcUM7b0JBRXZDLCtCQUErQixFQUM3QixtREFBbUQ7aUJBQ3REO2FBQ0Y7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRPY2NWYXJpYW50Q29uZmlndXJhdG9yQ29uZmlnRmFjdG9yeSgpOiBPY2NDb25maWcge1xuICByZXR1cm4ge1xuICAgIGJhY2tlbmQ6IHtcbiAgICAgIG9jYzoge1xuICAgICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgICBjcmVhdGVWYXJpYW50Q29uZmlndXJhdGlvbjpcbiAgICAgICAgICAgICdwcm9kdWN0cy8ke3Byb2R1Y3RDb2RlfS9jb25maWd1cmF0b3JzL2NjcGNvbmZpZ3VyYXRvcicsXG5cbiAgICAgICAgICByZWFkVmFyaWFudENvbmZpZ3VyYXRpb246ICdjY3Bjb25maWd1cmF0b3IvJHtjb25maWdJZH0nLFxuXG4gICAgICAgICAgdXBkYXRlVmFyaWFudENvbmZpZ3VyYXRpb246ICdjY3Bjb25maWd1cmF0b3IvJHtjb25maWdJZH0nLFxuXG4gICAgICAgICAgYWRkVmFyaWFudENvbmZpZ3VyYXRpb25Ub0NhcnQ6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzL2NjcGNvbmZpZ3VyYXRvcicsXG5cbiAgICAgICAgICByZWFkVmFyaWFudENvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzLyR7Y2FydEVudHJ5TnVtYmVyfS9jY3Bjb25maWd1cmF0b3InLFxuXG4gICAgICAgICAgdXBkYXRlVmFyaWFudENvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnk6XG4gICAgICAgICAgICAndXNlcnMvJHt1c2VySWR9L2NhcnRzLyR7Y2FydElkfS9lbnRyaWVzLyR7Y2FydEVudHJ5TnVtYmVyfS9jY3Bjb25maWd1cmF0b3InLFxuXG4gICAgICAgICAgcmVhZFZhcmlhbnRDb25maWd1cmF0aW9uT3ZlcnZpZXdGb3JPcmRlckVudHJ5OlxuICAgICAgICAgICAgJ3VzZXJzLyR7dXNlcklkfS9vcmRlcnMvJHtvcmRlcklkfS9lbnRyaWVzLyR7b3JkZXJFbnRyeU51bWJlcn0vY2NwY29uZmlndXJhdG9yL2NvbmZpZ3VyYXRpb25PdmVydmlldycsXG5cbiAgICAgICAgICByZWFkVmFyaWFudENvbmZpZ3VyYXRpb25QcmljZVN1bW1hcnk6XG4gICAgICAgICAgICAnY2NwY29uZmlndXJhdG9yLyR7Y29uZmlnSWR9L3ByaWNpbmcnLFxuXG4gICAgICAgICAgZ2V0VmFyaWFudENvbmZpZ3VyYXRpb25PdmVydmlldzpcbiAgICAgICAgICAgICdjY3Bjb25maWd1cmF0b3IvJHtjb25maWdJZH0vY29uZmlndXJhdGlvbk92ZXJ2aWV3JyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==