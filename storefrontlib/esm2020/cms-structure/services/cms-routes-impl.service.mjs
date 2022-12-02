/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { deepMerge, PageType, } from '@spartacus/core';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./cms-components.service";
// This service should be exposed in public API only after the refactor planned in https://github.com/SAP/spartacus/issues/7070
export class CmsRoutesImplService {
    constructor(router, cmsComponentsService) {
        this.router = router;
        this.cmsComponentsService = cmsComponentsService;
    }
    cmsRouteExists(url) {
        const isCmsDrivenRoute = url.startsWith('/');
        if (!isCmsDrivenRoute) {
            return false;
        }
        const routePath = url.substr(1);
        return (isCmsDrivenRoute &&
            !!this.router.config.find((route) => route.data && route.data.cxCmsRouteContext && route.path === routePath));
    }
    /**
     * Contains Cms driven routing logic intended for use use in guards, especially in canActivate method.
     *
     * Will return true, when logic wont have to modify routing (so canActivate could be easily resolved to true)
     * or will return false, when routing configuration was updated and redirection to newly generated route was initiated.
     *
     * @param pageContext
     * @param currentUrl
     */
    handleCmsRoutesInGuard(pageContext, componentTypes, currentUrl, currentPageLabel) {
        if (this.cmsRouteExists(currentPageLabel)) {
            return true;
        }
        const childRoutesConfig = this.cmsComponentsService.getChildRoutes(componentTypes);
        if (childRoutesConfig?.children?.length) {
            if (this.updateRouting(pageContext, currentPageLabel, childRoutesConfig)) {
                this.router.navigateByUrl(currentUrl);
                return false;
            }
        }
        return true;
    }
    updateRouting(pageContext, pageLabel, childRoutesConfig) {
        if (pageContext.type === PageType.CONTENT_PAGE &&
            pageLabel.startsWith('/') &&
            pageLabel.length > 1) {
            const newRoute = {
                path: pageLabel.substr(1),
                component: PageLayoutComponent,
                children: childRoutesConfig.children,
                data: deepMerge({}, childRoutesConfig?.parent?.data ?? {}, {
                    cxCmsRouteContext: {
                        type: pageContext.type,
                        id: pageLabel,
                    },
                }),
            };
            this.router.resetConfig([newRoute, ...this.router.config]);
            return true;
        }
        return false;
    }
}
CmsRoutesImplService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsRoutesImplService, deps: [{ token: i1.Router }, { token: i2.CmsComponentsService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsRoutesImplService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsRoutesImplService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsRoutesImplService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.CmsComponentsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXJvdXRlcy1pbXBsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VydmljZXMvY21zLXJvdXRlcy1pbXBsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUdMLFNBQVMsRUFFVCxRQUFRLEdBQ1QsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7OztBQUdoRiwrSEFBK0g7QUFFL0gsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUNVLE1BQWMsRUFDZCxvQkFBMEM7UUFEMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDakQsQ0FBQztJQUVJLGNBQWMsQ0FBQyxHQUFXO1FBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEMsT0FBTyxDQUNMLGdCQUFnQjtZQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN2QixDQUFDLEtBQWUsRUFBRSxFQUFFLENBQ2xCLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDekUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsc0JBQXNCLENBQ3BCLFdBQXdCLEVBQ3hCLGNBQXdCLEVBQ3hCLFVBQWtCLEVBQ2xCLGdCQUF3QjtRQUV4QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxpQkFBaUIsR0FDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzRCxJQUFJLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7WUFDdkMsSUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxFQUNwRTtnQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sYUFBYSxDQUNuQixXQUF3QixFQUN4QixTQUFpQixFQUNqQixpQkFBZ0Q7UUFFaEQsSUFDRSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxZQUFZO1lBQzFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNwQjtZQUNBLE1BQU0sUUFBUSxHQUFhO2dCQUN6QixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRO2dCQUNwQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRTtvQkFDekQsaUJBQWlCLEVBQUU7d0JBQ2pCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3QkFDdEIsRUFBRSxFQUFFLFNBQVM7cUJBQ2Q7aUJBQ0YsQ0FBQzthQUNILENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztpSEFwRlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FEUCxNQUFNOzJGQUNuQixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnLFxuICBDbXNSb3V0ZSxcbiAgZGVlcE1lcmdlLFxuICBQYWdlQ29udGV4dCxcbiAgUGFnZVR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vcGFnZS9wYWdlLWxheW91dC9wYWdlLWxheW91dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50c1NlcnZpY2UgfSBmcm9tICcuL2Ntcy1jb21wb25lbnRzLnNlcnZpY2UnO1xuXG4vLyBUaGlzIHNlcnZpY2Ugc2hvdWxkIGJlIGV4cG9zZWQgaW4gcHVibGljIEFQSSBvbmx5IGFmdGVyIHRoZSByZWZhY3RvciBwbGFubmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9TQVAvc3BhcnRhY3VzL2lzc3Vlcy83MDcwXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENtc1JvdXRlc0ltcGxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGNtc0NvbXBvbmVudHNTZXJ2aWNlOiBDbXNDb21wb25lbnRzU2VydmljZVxuICApIHt9XG5cbiAgcHJpdmF0ZSBjbXNSb3V0ZUV4aXN0cyh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzQ21zRHJpdmVuUm91dGUgPSB1cmwuc3RhcnRzV2l0aCgnLycpO1xuXG4gICAgaWYgKCFpc0Ntc0RyaXZlblJvdXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVQYXRoID0gdXJsLnN1YnN0cigxKTtcblxuICAgIHJldHVybiAoXG4gICAgICBpc0Ntc0RyaXZlblJvdXRlICYmXG4gICAgICAhIXRoaXMucm91dGVyLmNvbmZpZy5maW5kKFxuICAgICAgICAocm91dGU6IENtc1JvdXRlKSA9PlxuICAgICAgICAgIHJvdXRlLmRhdGEgJiYgcm91dGUuZGF0YS5jeENtc1JvdXRlQ29udGV4dCAmJiByb3V0ZS5wYXRoID09PSByb3V0ZVBhdGhcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnRhaW5zIENtcyBkcml2ZW4gcm91dGluZyBsb2dpYyBpbnRlbmRlZCBmb3IgdXNlIHVzZSBpbiBndWFyZHMsIGVzcGVjaWFsbHkgaW4gY2FuQWN0aXZhdGUgbWV0aG9kLlxuICAgKlxuICAgKiBXaWxsIHJldHVybiB0cnVlLCB3aGVuIGxvZ2ljIHdvbnQgaGF2ZSB0byBtb2RpZnkgcm91dGluZyAoc28gY2FuQWN0aXZhdGUgY291bGQgYmUgZWFzaWx5IHJlc29sdmVkIHRvIHRydWUpXG4gICAqIG9yIHdpbGwgcmV0dXJuIGZhbHNlLCB3aGVuIHJvdXRpbmcgY29uZmlndXJhdGlvbiB3YXMgdXBkYXRlZCBhbmQgcmVkaXJlY3Rpb24gdG8gbmV3bHkgZ2VuZXJhdGVkIHJvdXRlIHdhcyBpbml0aWF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSBwYWdlQ29udGV4dFxuICAgKiBAcGFyYW0gY3VycmVudFVybFxuICAgKi9cbiAgaGFuZGxlQ21zUm91dGVzSW5HdWFyZChcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHQsXG4gICAgY29tcG9uZW50VHlwZXM6IHN0cmluZ1tdLFxuICAgIGN1cnJlbnRVcmw6IHN0cmluZyxcbiAgICBjdXJyZW50UGFnZUxhYmVsOiBzdHJpbmdcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY21zUm91dGVFeGlzdHMoY3VycmVudFBhZ2VMYWJlbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkUm91dGVzQ29uZmlnID1cbiAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UuZ2V0Q2hpbGRSb3V0ZXMoY29tcG9uZW50VHlwZXMpO1xuXG4gICAgaWYgKGNoaWxkUm91dGVzQ29uZmlnPy5jaGlsZHJlbj8ubGVuZ3RoKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudXBkYXRlUm91dGluZyhwYWdlQ29udGV4dCwgY3VycmVudFBhZ2VMYWJlbCwgY2hpbGRSb3V0ZXNDb25maWcpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChjdXJyZW50VXJsKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUm91dGluZyhcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHQsXG4gICAgcGFnZUxhYmVsOiBzdHJpbmcsXG4gICAgY2hpbGRSb3V0ZXNDb25maWc6IENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIHBhZ2VDb250ZXh0LnR5cGUgPT09IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSAmJlxuICAgICAgcGFnZUxhYmVsLnN0YXJ0c1dpdGgoJy8nKSAmJlxuICAgICAgcGFnZUxhYmVsLmxlbmd0aCA+IDFcbiAgICApIHtcbiAgICAgIGNvbnN0IG5ld1JvdXRlOiBDbXNSb3V0ZSA9IHtcbiAgICAgICAgcGF0aDogcGFnZUxhYmVsLnN1YnN0cigxKSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBjaGlsZHJlbjogY2hpbGRSb3V0ZXNDb25maWcuY2hpbGRyZW4sXG4gICAgICAgIGRhdGE6IGRlZXBNZXJnZSh7fSwgY2hpbGRSb3V0ZXNDb25maWc/LnBhcmVudD8uZGF0YSA/PyB7fSwge1xuICAgICAgICAgIGN4Q21zUm91dGVDb250ZXh0OiB7XG4gICAgICAgICAgICB0eXBlOiBwYWdlQ29udGV4dC50eXBlLFxuICAgICAgICAgICAgaWQ6IHBhZ2VMYWJlbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMucm91dGVyLnJlc2V0Q29uZmlnKFtuZXdSb3V0ZSwgLi4udGhpcy5yb3V0ZXIuY29uZmlnXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==