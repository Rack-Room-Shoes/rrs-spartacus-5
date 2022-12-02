/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultCmsModuleConfig = {
    backend: {
        occ: {
            endpoints: {
                component: 'cms/components/${id}',
                components: 'cms/components',
                pages: 'cms/pages',
                page: 'cms/pages/${id}',
            },
        },
    },
    cmsComponents: {},
    componentsLoading: {
        pageSize: 50,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jbXMtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvY21zL2NvbmZpZy9kZWZhdWx0LWNtcy1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFjO0lBQy9DLE9BQU8sRUFBRTtRQUNQLEdBQUcsRUFBRTtZQUNILFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUUsc0JBQXNCO2dCQUNqQyxVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixLQUFLLEVBQUUsV0FBVztnQkFDbEIsSUFBSSxFQUFFLGlCQUFpQjthQUN4QjtTQUNGO0tBQ0Y7SUFDRCxhQUFhLEVBQUUsRUFBRTtJQUNqQixpQkFBaUIsRUFBRTtRQUNqQixRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENtc0NvbmZpZyB9IGZyb20gJy4vY21zLWNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q21zTW9kdWxlQ29uZmlnOiBDbXNDb25maWcgPSB7XG4gIGJhY2tlbmQ6IHtcbiAgICBvY2M6IHtcbiAgICAgIGVuZHBvaW50czoge1xuICAgICAgICBjb21wb25lbnQ6ICdjbXMvY29tcG9uZW50cy8ke2lkfScsXG4gICAgICAgIGNvbXBvbmVudHM6ICdjbXMvY29tcG9uZW50cycsXG4gICAgICAgIHBhZ2VzOiAnY21zL3BhZ2VzJyxcbiAgICAgICAgcGFnZTogJ2Ntcy9wYWdlcy8ke2lkfScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGNtc0NvbXBvbmVudHM6IHt9LFxuICBjb21wb25lbnRzTG9hZGluZzoge1xuICAgIHBhZ2VTaXplOiA1MCxcbiAgfSxcbn07XG4iXX0=