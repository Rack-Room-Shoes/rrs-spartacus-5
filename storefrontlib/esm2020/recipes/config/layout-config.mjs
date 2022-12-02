/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The layout configuration is used to define the overall layout of the storefront.
 * The configuration includes the following aspects:
 * - breakpoint layout (AKA screen layout)
 * - Page sections slot configuration (i.e. header vs footer)
 * - page template slot configuration (i.e. landing page template vs PDP page template)
 * - deferred loading configuration
 *
 * The page slot configurations is directly related to the data in the backend. If you use the
 * Spartacus sample-data, you will have an aligned setup. However, if you introduce custom page
 * templates and/or slots, you most likely need to further adjust or replace this configuration.
 */
export const layoutConfig = {
    // deferredLoading: {
    //   strategy: DeferLoadingStrategy.DEFER,
    //   intersectionMargin: '50px',
    // },
    layoutSlots: {
        header: {
            lg: {
                slots: [
                    'PreHeader',
                    'SiteContext',
                    'SiteLinks',
                    'SiteLogo',
                    'SearchBox',
                    'SiteLogin',
                    'MiniCart',
                    'NavigationBar',
                ],
            },
            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
        },
        navigation: {
            lg: { slots: [] },
            slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
        },
        footer: {
            slots: ['Footer'],
        },
        LandingPage2Template: {
            pageFold: 'Section2B',
            slots: [
                'Section1',
                'Section2A',
                'Section2B',
                'Section2C',
                'Section3',
                'Section4',
                'Section5',
            ],
        },
        ContentPage1Template: {
            slots: ['Section2A', 'Section2B'],
        },
        CategoryPageTemplate: {
            pageFold: 'Section2',
            slots: ['Section1', 'Section2', 'Section3'],
        },
        ProductListPageTemplate: {
            slots: ['ProductLeftRefinements', 'ProductListSlot'],
        },
        ProductGridPageTemplate: {
            slots: ['ProductLeftRefinements', 'ProductGridSlot'],
        },
        SearchResultsListPageTemplate: {
            slots: [
                'Section2',
                'ProductLeftRefinements',
                'SearchResultsListSlot',
                'Section4',
            ],
        },
        SearchResultsGridPageTemplate: {
            slots: [
                'Section2',
                'ProductLeftRefinements',
                'SearchResultsGridSlot',
                'Section4',
            ],
        },
        ProductDetailsPageTemplate: {
            lg: {
                pageFold: 'UpSelling',
            },
            pageFold: 'Summary',
            slots: [
                'Summary',
                'UpSelling',
                'CrossSelling',
                'Tabs',
                'PlaceholderContentSlot',
            ],
        },
        CartPageTemplate: {
            slots: ['TopContent', 'CenterRightContentSlot', 'EmptyCartMiddleContent'],
        },
        AccountPageTemplate: {
            slots: ['BodyContent', 'SideContent'],
        },
        LoginPageTemplate: {
            slots: ['LeftContentSlot', 'RightContentSlot'],
        },
        ErrorPageTemplate: {
            slots: ['TopContent', 'MiddleContent', 'BottomContent'],
        },
        OrderConfirmationPageTemplate: {
            slots: ['BodyContent', 'SideContent'],
        },
        MultiStepCheckoutSummaryPageTemplate: {
            slots: ['TopContent', 'BodyContent', 'SideContent', 'BottomContent'],
        },
        CheckoutLoginPageTemplate: {
            slots: ['RightContentSlot'],
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvcmVjaXBlcy9jb25maWcvbGF5b3V0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUg7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQWlCO0lBQ3hDLHFCQUFxQjtJQUNyQiwwQ0FBMEM7SUFDMUMsZ0NBQWdDO0lBQ2hDLEtBQUs7SUFDTCxXQUFXLEVBQUU7UUFDWCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFO29CQUNMLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixXQUFXO29CQUNYLFVBQVU7b0JBQ1YsV0FBVztvQkFDWCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsZUFBZTtpQkFDaEI7YUFDRjtZQUNELEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztTQUMxRDtRQUNELFVBQVUsRUFBRTtZQUNWLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDakIsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO1NBQ2xCO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDcEIsUUFBUSxFQUFFLFdBQVc7WUFDckIsS0FBSyxFQUFFO2dCQUNMLFVBQVU7Z0JBQ1YsV0FBVztnQkFDWCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsVUFBVTtnQkFDVixVQUFVO2dCQUNWLFVBQVU7YUFDWDtTQUNGO1FBQ0Qsb0JBQW9CLEVBQUU7WUFDcEIsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztTQUNsQztRQUNELG9CQUFvQixFQUFFO1lBQ3BCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1NBQzVDO1FBQ0QsdUJBQXVCLEVBQUU7WUFDdkIsS0FBSyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUM7U0FDckQ7UUFDRCx1QkFBdUIsRUFBRTtZQUN2QixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQztTQUNyRDtRQUNELDZCQUE2QixFQUFFO1lBQzdCLEtBQUssRUFBRTtnQkFDTCxVQUFVO2dCQUNWLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2dCQUN2QixVQUFVO2FBQ1g7U0FDRjtRQUNELDZCQUE2QixFQUFFO1lBQzdCLEtBQUssRUFBRTtnQkFDTCxVQUFVO2dCQUNWLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2dCQUN2QixVQUFVO2FBQ1g7U0FDRjtRQUNELDBCQUEwQixFQUFFO1lBQzFCLEVBQUUsRUFBRTtnQkFDRixRQUFRLEVBQUUsV0FBVzthQUN0QjtZQUNELFFBQVEsRUFBRSxTQUFTO1lBQ25CLEtBQUssRUFBRTtnQkFDTCxTQUFTO2dCQUNULFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxNQUFNO2dCQUNOLHdCQUF3QjthQUN6QjtTQUNGO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixDQUFDO1NBQzFFO1FBQ0QsbUJBQW1CLEVBQUU7WUFDbkIsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQztTQUN0QztRQUNELGlCQUFpQixFQUFFO1lBQ2pCLEtBQUssRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDO1NBQy9DO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7U0FDeEQ7UUFDRCw2QkFBNkIsRUFBRTtZQUM3QixLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDO1NBQ3RDO1FBQ0Qsb0NBQW9DLEVBQUU7WUFDcEMsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO1NBQ3JFO1FBQ0QseUJBQXlCLEVBQUU7WUFDekIsS0FBSyxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDNUI7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBMYXlvdXRDb25maWcgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29uZmlnL2xheW91dC1jb25maWcnO1xuXG4vKipcbiAqIFRoZSBsYXlvdXQgY29uZmlndXJhdGlvbiBpcyB1c2VkIHRvIGRlZmluZSB0aGUgb3ZlcmFsbCBsYXlvdXQgb2YgdGhlIHN0b3JlZnJvbnQuXG4gKiBUaGUgY29uZmlndXJhdGlvbiBpbmNsdWRlcyB0aGUgZm9sbG93aW5nIGFzcGVjdHM6XG4gKiAtIGJyZWFrcG9pbnQgbGF5b3V0IChBS0Egc2NyZWVuIGxheW91dClcbiAqIC0gUGFnZSBzZWN0aW9ucyBzbG90IGNvbmZpZ3VyYXRpb24gKGkuZS4gaGVhZGVyIHZzIGZvb3RlcilcbiAqIC0gcGFnZSB0ZW1wbGF0ZSBzbG90IGNvbmZpZ3VyYXRpb24gKGkuZS4gbGFuZGluZyBwYWdlIHRlbXBsYXRlIHZzIFBEUCBwYWdlIHRlbXBsYXRlKVxuICogLSBkZWZlcnJlZCBsb2FkaW5nIGNvbmZpZ3VyYXRpb25cbiAqXG4gKiBUaGUgcGFnZSBzbG90IGNvbmZpZ3VyYXRpb25zIGlzIGRpcmVjdGx5IHJlbGF0ZWQgdG8gdGhlIGRhdGEgaW4gdGhlIGJhY2tlbmQuIElmIHlvdSB1c2UgdGhlXG4gKiBTcGFydGFjdXMgc2FtcGxlLWRhdGEsIHlvdSB3aWxsIGhhdmUgYW4gYWxpZ25lZCBzZXR1cC4gSG93ZXZlciwgaWYgeW91IGludHJvZHVjZSBjdXN0b20gcGFnZVxuICogdGVtcGxhdGVzIGFuZC9vciBzbG90cywgeW91IG1vc3QgbGlrZWx5IG5lZWQgdG8gZnVydGhlciBhZGp1c3Qgb3IgcmVwbGFjZSB0aGlzIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZyA9IHtcbiAgLy8gZGVmZXJyZWRMb2FkaW5nOiB7XG4gIC8vICAgc3RyYXRlZ3k6IERlZmVyTG9hZGluZ1N0cmF0ZWd5LkRFRkVSLFxuICAvLyAgIGludGVyc2VjdGlvbk1hcmdpbjogJzUwcHgnLFxuICAvLyB9LFxuICBsYXlvdXRTbG90czoge1xuICAgIGhlYWRlcjoge1xuICAgICAgbGc6IHtcbiAgICAgICAgc2xvdHM6IFtcbiAgICAgICAgICAnUHJlSGVhZGVyJyxcbiAgICAgICAgICAnU2l0ZUNvbnRleHQnLFxuICAgICAgICAgICdTaXRlTGlua3MnLFxuICAgICAgICAgICdTaXRlTG9nbycsXG4gICAgICAgICAgJ1NlYXJjaEJveCcsXG4gICAgICAgICAgJ1NpdGVMb2dpbicsXG4gICAgICAgICAgJ01pbmlDYXJ0JyxcbiAgICAgICAgICAnTmF2aWdhdGlvbkJhcicsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgc2xvdHM6IFsnUHJlSGVhZGVyJywgJ1NpdGVMb2dvJywgJ1NlYXJjaEJveCcsICdNaW5pQ2FydCddLFxuICAgIH0sXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbGc6IHsgc2xvdHM6IFtdIH0sXG4gICAgICBzbG90czogWydTaXRlTG9naW4nLCAnTmF2aWdhdGlvbkJhcicsICdTaXRlQ29udGV4dCcsICdTaXRlTGlua3MnXSxcbiAgICB9LFxuICAgIGZvb3Rlcjoge1xuICAgICAgc2xvdHM6IFsnRm9vdGVyJ10sXG4gICAgfSxcbiAgICBMYW5kaW5nUGFnZTJUZW1wbGF0ZToge1xuICAgICAgcGFnZUZvbGQ6ICdTZWN0aW9uMkInLFxuICAgICAgc2xvdHM6IFtcbiAgICAgICAgJ1NlY3Rpb24xJyxcbiAgICAgICAgJ1NlY3Rpb24yQScsXG4gICAgICAgICdTZWN0aW9uMkInLFxuICAgICAgICAnU2VjdGlvbjJDJyxcbiAgICAgICAgJ1NlY3Rpb24zJyxcbiAgICAgICAgJ1NlY3Rpb240JyxcbiAgICAgICAgJ1NlY3Rpb241JyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBDb250ZW50UGFnZTFUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnU2VjdGlvbjJBJywgJ1NlY3Rpb24yQiddLFxuICAgIH0sXG4gICAgQ2F0ZWdvcnlQYWdlVGVtcGxhdGU6IHtcbiAgICAgIHBhZ2VGb2xkOiAnU2VjdGlvbjInLFxuICAgICAgc2xvdHM6IFsnU2VjdGlvbjEnLCAnU2VjdGlvbjInLCAnU2VjdGlvbjMnXSxcbiAgICB9LFxuICAgIFByb2R1Y3RMaXN0UGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydQcm9kdWN0TGVmdFJlZmluZW1lbnRzJywgJ1Byb2R1Y3RMaXN0U2xvdCddLFxuICAgIH0sXG4gICAgUHJvZHVjdEdyaWRQYWdlVGVtcGxhdGU6IHtcbiAgICAgIHNsb3RzOiBbJ1Byb2R1Y3RMZWZ0UmVmaW5lbWVudHMnLCAnUHJvZHVjdEdyaWRTbG90J10sXG4gICAgfSxcbiAgICBTZWFyY2hSZXN1bHRzTGlzdFBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFtcbiAgICAgICAgJ1NlY3Rpb24yJyxcbiAgICAgICAgJ1Byb2R1Y3RMZWZ0UmVmaW5lbWVudHMnLFxuICAgICAgICAnU2VhcmNoUmVzdWx0c0xpc3RTbG90JyxcbiAgICAgICAgJ1NlY3Rpb240JyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBTZWFyY2hSZXN1bHRzR3JpZFBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFtcbiAgICAgICAgJ1NlY3Rpb24yJyxcbiAgICAgICAgJ1Byb2R1Y3RMZWZ0UmVmaW5lbWVudHMnLFxuICAgICAgICAnU2VhcmNoUmVzdWx0c0dyaWRTbG90JyxcbiAgICAgICAgJ1NlY3Rpb240JyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBQcm9kdWN0RGV0YWlsc1BhZ2VUZW1wbGF0ZToge1xuICAgICAgbGc6IHtcbiAgICAgICAgcGFnZUZvbGQ6ICdVcFNlbGxpbmcnLFxuICAgICAgfSxcbiAgICAgIHBhZ2VGb2xkOiAnU3VtbWFyeScsXG4gICAgICBzbG90czogW1xuICAgICAgICAnU3VtbWFyeScsXG4gICAgICAgICdVcFNlbGxpbmcnLFxuICAgICAgICAnQ3Jvc3NTZWxsaW5nJyxcbiAgICAgICAgJ1RhYnMnLFxuICAgICAgICAnUGxhY2Vob2xkZXJDb250ZW50U2xvdCcsXG4gICAgICBdLFxuICAgIH0sXG4gICAgQ2FydFBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnVG9wQ29udGVudCcsICdDZW50ZXJSaWdodENvbnRlbnRTbG90JywgJ0VtcHR5Q2FydE1pZGRsZUNvbnRlbnQnXSxcbiAgICB9LFxuICAgIEFjY291bnRQYWdlVGVtcGxhdGU6IHtcbiAgICAgIHNsb3RzOiBbJ0JvZHlDb250ZW50JywgJ1NpZGVDb250ZW50J10sXG4gICAgfSxcbiAgICBMb2dpblBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnTGVmdENvbnRlbnRTbG90JywgJ1JpZ2h0Q29udGVudFNsb3QnXSxcbiAgICB9LFxuICAgIEVycm9yUGFnZVRlbXBsYXRlOiB7XG4gICAgICBzbG90czogWydUb3BDb250ZW50JywgJ01pZGRsZUNvbnRlbnQnLCAnQm90dG9tQ29udGVudCddLFxuICAgIH0sXG4gICAgT3JkZXJDb25maXJtYXRpb25QYWdlVGVtcGxhdGU6IHtcbiAgICAgIHNsb3RzOiBbJ0JvZHlDb250ZW50JywgJ1NpZGVDb250ZW50J10sXG4gICAgfSxcbiAgICBNdWx0aVN0ZXBDaGVja291dFN1bW1hcnlQYWdlVGVtcGxhdGU6IHtcbiAgICAgIHNsb3RzOiBbJ1RvcENvbnRlbnQnLCAnQm9keUNvbnRlbnQnLCAnU2lkZUNvbnRlbnQnLCAnQm90dG9tQ29udGVudCddLFxuICAgIH0sXG4gICAgQ2hlY2tvdXRMb2dpblBhZ2VUZW1wbGF0ZToge1xuICAgICAgc2xvdHM6IFsnUmlnaHRDb250ZW50U2xvdCddLFxuICAgIH0sXG4gIH0sXG59O1xuIl19