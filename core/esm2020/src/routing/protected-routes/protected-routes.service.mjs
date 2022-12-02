/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../configurable-routes/config/routing-config";
import * as i2 from "../configurable-routes/url-translation/url-parsing.service";
export class ProtectedRoutesService {
    constructor(config, urlParsingService) {
        this.config = config;
        this.urlParsingService = urlParsingService;
        this.nonProtectedPaths = []; // arrays of paths' segments list
        if (this.shouldProtect) {
            // pre-process config for performance:
            this.nonProtectedPaths = this.getNonProtectedPaths().map((path) => this.getSegments(path));
        }
    }
    get routingConfig() {
        return this.config && this.config.routing;
    }
    /**
     * Returns 'protected' property (boolean) from routing config
     *
     * @returns boolean
     */
    get shouldProtect() {
        return !!this.routingConfig?.protected;
    }
    /**
     * Tells if the url is protected
     */
    isUrlProtected(urlSegments) {
        return (this.shouldProtect &&
            !this.matchAnyPath(urlSegments, this.nonProtectedPaths));
    }
    /**
     * Tells whether the url matches at least one of the paths
     */
    matchAnyPath(urlSegments, pathsSegments) {
        return pathsSegments.some((pathSegments) => this.matchPath(urlSegments, pathSegments));
    }
    /**
     * Tells whether the url matches the path
     */
    matchPath(urlSegments, pathSegments) {
        return this.urlParsingService.matchPath(urlSegments, pathSegments);
    }
    /**
     * Returns a list of paths that are not protected
     */
    getNonProtectedPaths() {
        return Object.values(this.routingConfig?.routes ?? {}).reduce((acc, routeConfig) => routeConfig.protected === false && // must be explicitly false, ignore undefined
            routeConfig.paths &&
            routeConfig.paths.length
            ? acc.concat(routeConfig?.paths ?? [])
            : acc, []);
    }
    /**
     * Splits the url by slashes
     */
    getSegments(url) {
        return (url || '').split('/');
    }
}
ProtectedRoutesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProtectedRoutesService, deps: [{ token: i1.RoutingConfig }, { token: i2.UrlParsingService }], target: i0.ɵɵFactoryTarget.Injectable });
ProtectedRoutesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProtectedRoutesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProtectedRoutesService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingConfig }, { type: i2.UrlParsingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdGVjdGVkLXJvdXRlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9wcm90ZWN0ZWQtcm91dGVzL3Byb3RlY3RlZC1yb3V0ZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyxNQUFNLE9BQU8sc0JBQXNCO0lBZ0JqQyxZQUNZLE1BQXFCLEVBQ3JCLGlCQUFvQztRQURwQyxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFqQnhDLHNCQUFpQixHQUFlLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQztRQW1CM0UsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FDdkIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQXZCRCxJQUFjLGFBQWE7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBVyxhQUFhO1FBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFjRDs7T0FFRztJQUNILGNBQWMsQ0FBQyxXQUFxQjtRQUNsQyxPQUFPLENBQ0wsSUFBSSxDQUFDLGFBQWE7WUFDbEIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FDeEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNPLFlBQVksQ0FDcEIsV0FBcUIsRUFDckIsYUFBeUI7UUFFekIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQzFDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDTyxTQUFTLENBQUMsV0FBcUIsRUFBRSxZQUFzQjtRQUMvRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUNPLG9CQUFvQjtRQUM1QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUMzRCxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUNuQixXQUFXLENBQUMsU0FBUyxLQUFLLEtBQUssSUFBSSw2Q0FBNkM7WUFDaEYsV0FBVyxDQUFDLEtBQUs7WUFDakIsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ3RCLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxHQUFHLEVBQ1QsRUFBRSxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDTyxXQUFXLENBQUMsR0FBVztRQUMvQixPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDOzttSEE3RVUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FEVCxNQUFNOzJGQUNuQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZ3VyYWJsZS1yb3V0ZXMvY29uZmlnL3JvdXRpbmctY29uZmlnJztcbmltcG9ydCB7IFVybFBhcnNpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlndXJhYmxlLXJvdXRlcy91cmwtdHJhbnNsYXRpb24vdXJsLXBhcnNpbmcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUHJvdGVjdGVkUm91dGVzU2VydmljZSB7XG4gIHByaXZhdGUgbm9uUHJvdGVjdGVkUGF0aHM6IHN0cmluZ1tdW10gPSBbXTsgLy8gYXJyYXlzIG9mIHBhdGhzJyBzZWdtZW50cyBsaXN0XG5cbiAgcHJvdGVjdGVkIGdldCByb3V0aW5nQ29uZmlnKCk6IFJvdXRpbmdDb25maWdbJ3JvdXRpbmcnXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLnJvdXRpbmc7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyAncHJvdGVjdGVkJyBwcm9wZXJ0eSAoYm9vbGVhbikgZnJvbSByb3V0aW5nIGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNob3VsZFByb3RlY3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5yb3V0aW5nQ29uZmlnPy5wcm90ZWN0ZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBSb3V0aW5nQ29uZmlnLFxuICAgIHByb3RlY3RlZCB1cmxQYXJzaW5nU2VydmljZTogVXJsUGFyc2luZ1NlcnZpY2VcbiAgKSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkUHJvdGVjdCkge1xuICAgICAgLy8gcHJlLXByb2Nlc3MgY29uZmlnIGZvciBwZXJmb3JtYW5jZTpcbiAgICAgIHRoaXMubm9uUHJvdGVjdGVkUGF0aHMgPSB0aGlzLmdldE5vblByb3RlY3RlZFBhdGhzKCkubWFwKChwYXRoKSA9PlxuICAgICAgICB0aGlzLmdldFNlZ21lbnRzKHBhdGgpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyBpZiB0aGUgdXJsIGlzIHByb3RlY3RlZFxuICAgKi9cbiAgaXNVcmxQcm90ZWN0ZWQodXJsU2VnbWVudHM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2hvdWxkUHJvdGVjdCAmJlxuICAgICAgIXRoaXMubWF0Y2hBbnlQYXRoKHVybFNlZ21lbnRzLCB0aGlzLm5vblByb3RlY3RlZFBhdGhzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciB0aGUgdXJsIG1hdGNoZXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBwYXRoc1xuICAgKi9cbiAgcHJvdGVjdGVkIG1hdGNoQW55UGF0aChcbiAgICB1cmxTZWdtZW50czogc3RyaW5nW10sXG4gICAgcGF0aHNTZWdtZW50czogc3RyaW5nW11bXVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gcGF0aHNTZWdtZW50cy5zb21lKChwYXRoU2VnbWVudHMpID0+XG4gICAgICB0aGlzLm1hdGNoUGF0aCh1cmxTZWdtZW50cywgcGF0aFNlZ21lbnRzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciB0aGUgdXJsIG1hdGNoZXMgdGhlIHBhdGhcbiAgICovXG4gIHByb3RlY3RlZCBtYXRjaFBhdGgodXJsU2VnbWVudHM6IHN0cmluZ1tdLCBwYXRoU2VnbWVudHM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXJsUGFyc2luZ1NlcnZpY2UubWF0Y2hQYXRoKHVybFNlZ21lbnRzLCBwYXRoU2VnbWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIHBhdGhzIHRoYXQgYXJlIG5vdCBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBnZXROb25Qcm90ZWN0ZWRQYXRocygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5yb3V0aW5nQ29uZmlnPy5yb3V0ZXMgPz8ge30pLnJlZHVjZTxzdHJpbmdbXT4oXG4gICAgICAoYWNjLCByb3V0ZUNvbmZpZykgPT5cbiAgICAgICAgcm91dGVDb25maWcucHJvdGVjdGVkID09PSBmYWxzZSAmJiAvLyBtdXN0IGJlIGV4cGxpY2l0bHkgZmFsc2UsIGlnbm9yZSB1bmRlZmluZWRcbiAgICAgICAgcm91dGVDb25maWcucGF0aHMgJiZcbiAgICAgICAgcm91dGVDb25maWcucGF0aHMubGVuZ3RoXG4gICAgICAgICAgPyBhY2MuY29uY2F0KHJvdXRlQ29uZmlnPy5wYXRocyA/PyBbXSlcbiAgICAgICAgICA6IGFjYyxcbiAgICAgIFtdXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdHMgdGhlIHVybCBieSBzbGFzaGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0U2VnbWVudHModXJsOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuICh1cmwgfHwgJycpLnNwbGl0KCcvJyk7XG4gIH1cbn1cbiJdfQ==