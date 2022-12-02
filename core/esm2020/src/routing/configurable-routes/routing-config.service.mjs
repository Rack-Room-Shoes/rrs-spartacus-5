/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./config/routing-config";
export class RoutingConfigService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns the route config for the given route name.
     */
    getRouteConfig(routeName) {
        const routeConfig = this.config?.routing?.routes;
        const result = routeConfig && routeConfig[routeName];
        if (!routeConfig || result === undefined) {
            this.warn(`No path was configured for the named route '${routeName}'!`);
        }
        return result;
    }
    warn(...args) {
        if (isDevMode()) {
            console.warn(...args);
        }
    }
    /**
     * Returns the configured route loading strategy.
     */
    getLoadStrategy() {
        return this.config?.routing?.loadStrategy ?? "always" /* RouteLoadStrategy.ALWAYS */;
    }
    /**
     * Returns the route name of the configured path.
     *
     * For example, when the config is:
     * ```
     * routing: {
     *   routes: {
     *      addressBook: { paths: ['my-account/address-book'] }
     *   }
     * }
     * ```
     *
     * the `getRouteName('my-account/address-book')` returns `'addressBook'`.
     */
    getRouteName(path) {
        if (!this.routeNamesByPath) {
            this.initRouteNamesByPath();
        }
        return this.routeNamesByPath[path];
    }
    /**
     * Initializes the property `routeNamesByPath`.
     *
     * The original config allows for reading configured path by the route name.
     * But this method builds up a structure with a 'reversed config'
     * to read quickly the route name by the path.
     */
    initRouteNamesByPath() {
        this.routeNamesByPath = {};
        for (const [routeName, routeConfig] of Object.entries(this.config?.routing?.routes ?? {})) {
            routeConfig?.paths?.forEach((path) => {
                if (isDevMode() && this.routeNamesByPath[path]) {
                    console.error(`The same path '${path}' is configured for two different route names: '${this.routeNamesByPath[path]}' and '${routeName}`);
                }
                this.routeNamesByPath[path] = routeName;
            });
        }
    }
}
RoutingConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RoutingConfigService, deps: [{ token: i1.RoutingConfig }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RoutingConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RoutingConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3JvdXRpbmcvY29uZmlndXJhYmxlLXJvdXRlcy9yb3V0aW5nLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBS3RELE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsWUFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFFL0M7O09BRUc7SUFDSCxjQUFjLENBQUMsU0FBaUI7UUFDOUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBRWpELE1BQU0sTUFBTSxHQUFHLFdBQVcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsK0NBQStDLFNBQVMsSUFBSSxDQUFDLENBQUM7U0FDekU7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sSUFBSSxDQUFDLEdBQUcsSUFBYztRQUM1QixJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSwyQ0FBNEIsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sb0JBQW9CO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFM0IsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ25ELElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQ25DLEVBQUU7WUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQyxJQUFJLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxDQUFDLEtBQUssQ0FDWCxrQkFBa0IsSUFBSSxtREFBbUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLFNBQVMsRUFBRSxDQUMxSCxDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2lIQTdFVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQURQLE1BQU07MkZBQ25CLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlTG9hZFN0cmF0ZWd5LCBSb3V0aW5nQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvcm91dGluZy1jb25maWcnO1xuaW1wb3J0IHsgUm91dGVDb25maWcgfSBmcm9tICcuL3JvdXRlcy1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFJvdXRpbmdDb25maWdTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFJldmVyc2VkIHJvdXRpbmcgY29uZmlnIGZvciBxdWljayBsb29rdXAgb2YgdGhlIHJvdXRlIG5hbWUgYnkgdGhlIGNvbmZpZ3VyZWQgcGF0aC5cbiAgICovXG4gIHByb3RlY3RlZCByb3V0ZU5hbWVzQnlQYXRoOiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBSb3V0aW5nQ29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb3V0ZSBjb25maWcgZm9yIHRoZSBnaXZlbiByb3V0ZSBuYW1lLlxuICAgKi9cbiAgZ2V0Um91dGVDb25maWcocm91dGVOYW1lOiBzdHJpbmcpOiBSb3V0ZUNvbmZpZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgcm91dGVDb25maWcgPSB0aGlzLmNvbmZpZz8ucm91dGluZz8ucm91dGVzO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gcm91dGVDb25maWcgJiYgcm91dGVDb25maWdbcm91dGVOYW1lXTtcbiAgICBpZiAoIXJvdXRlQ29uZmlnIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLndhcm4oYE5vIHBhdGggd2FzIGNvbmZpZ3VyZWQgZm9yIHRoZSBuYW1lZCByb3V0ZSAnJHtyb3V0ZU5hbWV9JyFgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgd2FybiguLi5hcmdzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS53YXJuKC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb25maWd1cmVkIHJvdXRlIGxvYWRpbmcgc3RyYXRlZ3kuXG4gICAqL1xuICBnZXRMb2FkU3RyYXRlZ3koKTogUm91dGVMb2FkU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZz8ucm91dGluZz8ubG9hZFN0cmF0ZWd5ID8/IFJvdXRlTG9hZFN0cmF0ZWd5LkFMV0FZUztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb3V0ZSBuYW1lIG9mIHRoZSBjb25maWd1cmVkIHBhdGguXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCB3aGVuIHRoZSBjb25maWcgaXM6XG4gICAqIGBgYFxuICAgKiByb3V0aW5nOiB7XG4gICAqICAgcm91dGVzOiB7XG4gICAqICAgICAgYWRkcmVzc0Jvb2s6IHsgcGF0aHM6IFsnbXktYWNjb3VudC9hZGRyZXNzLWJvb2snXSB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgYGdldFJvdXRlTmFtZSgnbXktYWNjb3VudC9hZGRyZXNzLWJvb2snKWAgcmV0dXJucyBgJ2FkZHJlc3NCb29rJ2AuXG4gICAqL1xuICBnZXRSb3V0ZU5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMucm91dGVOYW1lc0J5UGF0aCkge1xuICAgICAgdGhpcy5pbml0Um91dGVOYW1lc0J5UGF0aCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yb3V0ZU5hbWVzQnlQYXRoW3BhdGhdO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwcm9wZXJ0eSBgcm91dGVOYW1lc0J5UGF0aGAuXG4gICAqXG4gICAqIFRoZSBvcmlnaW5hbCBjb25maWcgYWxsb3dzIGZvciByZWFkaW5nIGNvbmZpZ3VyZWQgcGF0aCBieSB0aGUgcm91dGUgbmFtZS5cbiAgICogQnV0IHRoaXMgbWV0aG9kIGJ1aWxkcyB1cCBhIHN0cnVjdHVyZSB3aXRoIGEgJ3JldmVyc2VkIGNvbmZpZydcbiAgICogdG8gcmVhZCBxdWlja2x5IHRoZSByb3V0ZSBuYW1lIGJ5IHRoZSBwYXRoLlxuICAgKi9cbiAgcHJvdGVjdGVkIGluaXRSb3V0ZU5hbWVzQnlQYXRoKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVOYW1lc0J5UGF0aCA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBbcm91dGVOYW1lLCByb3V0ZUNvbmZpZ10gb2YgT2JqZWN0LmVudHJpZXMoXG4gICAgICB0aGlzLmNvbmZpZz8ucm91dGluZz8ucm91dGVzID8/IHt9XG4gICAgKSkge1xuICAgICAgcm91dGVDb25maWc/LnBhdGhzPy5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSAmJiB0aGlzLnJvdXRlTmFtZXNCeVBhdGhbcGF0aF0pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFRoZSBzYW1lIHBhdGggJyR7cGF0aH0nIGlzIGNvbmZpZ3VyZWQgZm9yIHR3byBkaWZmZXJlbnQgcm91dGUgbmFtZXM6ICcke3RoaXMucm91dGVOYW1lc0J5UGF0aFtwYXRoXX0nIGFuZCAnJHtyb3V0ZU5hbWV9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZU5hbWVzQnlQYXRoW3BhdGhdID0gcm91dGVOYW1lO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=