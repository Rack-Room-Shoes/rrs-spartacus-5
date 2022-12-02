/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../configurator-cart.service";
import * as i2 from "@spartacus/core";
export class ConfiguratorRouterListener {
    constructor(configuratorCartService, routingService) {
        this.configuratorCartService = configuratorCartService;
        this.routingService = routingService;
        this.subscription = new Subscription();
        this.observeRouterChanges();
    }
    observeRouterChanges() {
        this.subscription.add(this.routingService.getRouterState().subscribe((routerState) => {
            if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
                this.configuratorCartService.removeCartBoundConfigurations();
            }
        }));
    }
    isConfiguratorRelatedRoute(semanticRoute) {
        return semanticRoute ? semanticRoute.includes('configure') : false;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorRouterListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterListener, deps: [{ token: i1.ConfiguratorCartService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterListener, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorCartService }, { type: i2.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXJvdXRlci5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9mYWNhZGUvcm91dGluZy9jb25maWd1cmF0b3Itcm91dGVyLmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFJcEMsTUFBTSxPQUFPLDBCQUEwQjtJQUVyQyxZQUNZLHVCQUFnRCxFQUNoRCxjQUE4QjtRQUQ5Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUhoQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLMUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO2FBQzlEO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUywwQkFBMEIsQ0FBQyxhQUFzQjtRQUN6RCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt1SEF6QlUsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FEYixNQUFNOzJGQUNuQiwwQkFBMEI7a0JBRHRDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlndXJhdG9yLWNhcnQuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yUm91dGVyTGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yQ2FydFNlcnZpY2U6IENvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5vYnNlcnZlUm91dGVyQ2hhbmdlcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9ic2VydmVSb3V0ZXJDaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0Um91dGVyU3RhdGUoKS5zdWJzY3JpYmUoKHJvdXRlclN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pc0NvbmZpZ3VyYXRvclJlbGF0ZWRSb3V0ZShyb3V0ZXJTdGF0ZS5zdGF0ZS5zZW1hbnRpY1JvdXRlKSkge1xuICAgICAgICAgIHRoaXMuY29uZmlndXJhdG9yQ2FydFNlcnZpY2UucmVtb3ZlQ2FydEJvdW5kQ29uZmlndXJhdGlvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ29uZmlndXJhdG9yUmVsYXRlZFJvdXRlKHNlbWFudGljUm91dGU/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VtYW50aWNSb3V0ZSA/IHNlbWFudGljUm91dGUuaW5jbHVkZXMoJ2NvbmZpZ3VyZScpIDogZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=