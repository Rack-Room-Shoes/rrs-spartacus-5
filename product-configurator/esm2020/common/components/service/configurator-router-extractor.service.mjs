/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { ConfiguratorModelUtils } from '../../shared/utils/configurator-model-utils';
import { ConfiguratorRouter } from './configurator-router-data';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/utils/common-configurator-utils.service";
import * as i2 from "@spartacus/core";
/**
 * Service to extract the configuration owner key from the current route
 */
export class ConfiguratorRouterExtractorService {
    constructor(configUtilsService, routingService) {
        this.configUtilsService = configUtilsService;
        this.routingService = routingService;
        this.ROUTE_FRAGMENT_CONFIGURE = 'configure';
        this.ROUTE_FRAGMENT_OVERVIEW = 'configureOverview';
    }
    extractRouterData() {
        return this.routingService.getRouterState().pipe(filter((routingData) => routingData.state.params.entityKey), 
        //we don't need to cover the intermediate router states where a future route is already known.
        //only changes to the URL are relevant. Otherwise we get wrong hits where e.g. the config form fires although
        //the OV already loads
        filter((routingData) => routingData.nextState === undefined), map((routingData) => {
            const owner = this.createOwnerFromRouterState(routingData);
            const semanticRoute = routingData.state.semanticRoute;
            const routerData = {
                owner: owner,
                isOwnerCartEntry: owner.type === CommonConfigurator.OwnerType.CART_ENTRY,
                displayOnly: routingData.state.params.displayOnly,
                resolveIssues: routingData.state.queryParams?.resolveIssues === 'true',
                skipConflicts: routingData.state.queryParams?.skipConflicts === 'true',
                forceReload: routingData.state.queryParams?.forceReload === 'true',
                pageType: semanticRoute &&
                    semanticRoute.includes(this.ROUTE_FRAGMENT_OVERVIEW)
                    ? ConfiguratorRouter.PageType.OVERVIEW
                    : ConfiguratorRouter.PageType.CONFIGURATION,
            };
            return routerData;
        }));
    }
    createOwnerFromRouterState(routerState) {
        const owner = ConfiguratorModelUtils.createInitialOwner();
        const params = routerState.state.params;
        if (params.ownerType) {
            const entityKey = params.entityKey;
            owner.type = params.ownerType;
            owner.id = entityKey;
        }
        else {
            owner.type = CommonConfigurator.OwnerType.PRODUCT;
            owner.id = params.rootProduct;
        }
        const semanticRoute = routerState.state.semanticRoute;
        if (semanticRoute) {
            const configuratorType = this.getConfiguratorTypeFromSemanticRoute(semanticRoute);
            owner.configuratorType = configuratorType;
        }
        this.configUtilsService.setOwnerKey(owner);
        return owner;
    }
    /**
     * Compiles the configurator type from the semantic route
     * @param semanticRoute Consists of a prefix that indicates if target is interactive configuration or overview and
     *                      the commerce configurator type as postfix.
     *                      Example: configureTEXTFIELD or configureOverviewCPQCONFIGURATOR
     * @returns Configurator type
     */
    getConfiguratorTypeFromSemanticRoute(semanticRoute) {
        if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_OVERVIEW)) {
            return semanticRoute.split(this.ROUTE_FRAGMENT_OVERVIEW)[1];
        }
        else if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_CONFIGURE)) {
            return semanticRoute.split(this.ROUTE_FRAGMENT_CONFIGURE)[1];
        }
        else {
            throw new Error('Not able to detemine configurator type');
        }
    }
}
ConfiguratorRouterExtractorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterExtractorService, deps: [{ token: i1.CommonConfiguratorUtilsService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterExtractorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterExtractorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterExtractorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CommonConfiguratorUtilsService }, { type: i2.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXJvdXRlci1leHRyYWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1yb3V0ZXItZXh0cmFjdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVoRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUVoRTs7R0FFRztBQUVILE1BQU0sT0FBTyxrQ0FBa0M7SUFHN0MsWUFDWSxrQkFBa0QsRUFDbEQsY0FBOEI7UUFEOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFnQztRQUNsRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFKdkIsNkJBQXdCLEdBQUcsV0FBVyxDQUFDO1FBQ3ZDLDRCQUF1QixHQUFHLG1CQUFtQixDQUFDO0lBSTlELENBQUM7SUFFSixpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUM5QyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMzRCw4RkFBOEY7UUFDOUYsNkdBQTZHO1FBQzdHLHNCQUFzQjtRQUN0QixNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcs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Q0FBa0MsY0FEckIsTUFBTTsyRkFDbkIsa0NBQWtDO2tCQUQ5QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlclN0YXRlLCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbW1vbkNvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29tbW9uLWNvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29tbW9uLWNvbmZpZ3VyYXRvci11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck1vZGVsVXRpbHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbHMvY29uZmlndXJhdG9yLW1vZGVsLXV0aWxzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclJvdXRlciB9IGZyb20gJy4vY29uZmlndXJhdG9yLXJvdXRlci1kYXRhJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ3VyYXRpb24gb3duZXIga2V5IGZyb20gdGhlIGN1cnJlbnQgcm91dGVcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JSb3V0ZXJFeHRyYWN0b3JTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IFJPVVRFX0ZSQUdNRU5UX0NPTkZJR1VSRSA9ICdjb25maWd1cmUnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgUk9VVEVfRlJBR01FTlRfT1ZFUlZJRVcgPSAnY29uZmlndXJlT3ZlcnZpZXcnO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZVxuICApIHt9XG5cbiAgZXh0cmFjdFJvdXRlckRhdGEoKTogT2JzZXJ2YWJsZTxDb25maWd1cmF0b3JSb3V0ZXIuRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFJvdXRlclN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigocm91dGluZ0RhdGEpID0+IHJvdXRpbmdEYXRhLnN0YXRlLnBhcmFtcy5lbnRpdHlLZXkpLFxuICAgICAgLy93ZSBkb24ndCBuZWVkIHRvIGNvdmVyIHRoZSBpbnRlcm1lZGlhdGUgcm91dGVyIHN0YXRlcyB3aGVyZSBhIGZ1dHVyZSByb3V0ZSBpcyBhbHJlYWR5IGtub3duLlxuICAgICAgLy9vbmx5IGNoYW5nZXMgdG8gdGhlIFVSTCBhcmUgcmVsZXZhbnQuIE90aGVyd2lzZSB3ZSBnZXQgd3JvbmcgaGl0cyB3aGVyZSBlLmcuIHRoZSBjb25maWcgZm9ybSBmaXJlcyBhbHRob3VnaFxuICAgICAgLy90aGUgT1YgYWxyZWFkeSBsb2Fkc1xuICAgICAgZmlsdGVyKChyb3V0aW5nRGF0YSkgPT4gcm91dGluZ0RhdGEubmV4dFN0YXRlID09PSB1bmRlZmluZWQpLFxuICAgICAgbWFwKChyb3V0aW5nRGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBvd25lciA9IHRoaXMuY3JlYXRlT3duZXJGcm9tUm91dGVyU3RhdGUocm91dGluZ0RhdGEpO1xuICAgICAgICBjb25zdCBzZW1hbnRpY1JvdXRlID0gcm91dGluZ0RhdGEuc3RhdGUuc2VtYW50aWNSb3V0ZTtcbiAgICAgICAgY29uc3Qgcm91dGVyRGF0YTogQ29uZmlndXJhdG9yUm91dGVyLkRhdGEgPSB7XG4gICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgIGlzT3duZXJDYXJ0RW50cnk6XG4gICAgICAgICAgICBvd25lci50eXBlID09PSBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLkNBUlRfRU5UUlksXG4gICAgICAgICAgZGlzcGxheU9ubHk6IHJvdXRpbmdEYXRhLnN0YXRlLnBhcmFtcy5kaXNwbGF5T25seSxcbiAgICAgICAgICByZXNvbHZlSXNzdWVzOlxuICAgICAgICAgICAgcm91dGluZ0RhdGEuc3RhdGUucXVlcnlQYXJhbXM/LnJlc29sdmVJc3N1ZXMgPT09ICd0cnVlJyxcbiAgICAgICAgICBza2lwQ29uZmxpY3RzOlxuICAgICAgICAgICAgcm91dGluZ0RhdGEuc3RhdGUucXVlcnlQYXJhbXM/LnNraXBDb25mbGljdHMgPT09ICd0cnVlJyxcbiAgICAgICAgICBmb3JjZVJlbG9hZDogcm91dGluZ0RhdGEuc3RhdGUucXVlcnlQYXJhbXM/LmZvcmNlUmVsb2FkID09PSAndHJ1ZScsXG4gICAgICAgICAgcGFnZVR5cGU6XG4gICAgICAgICAgICBzZW1hbnRpY1JvdXRlICYmXG4gICAgICAgICAgICBzZW1hbnRpY1JvdXRlLmluY2x1ZGVzKHRoaXMuUk9VVEVfRlJBR01FTlRfT1ZFUlZJRVcpXG4gICAgICAgICAgICAgID8gQ29uZmlndXJhdG9yUm91dGVyLlBhZ2VUeXBlLk9WRVJWSUVXXG4gICAgICAgICAgICAgIDogQ29uZmlndXJhdG9yUm91dGVyLlBhZ2VUeXBlLkNPTkZJR1VSQVRJT04sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJvdXRlckRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVPd25lckZyb21Sb3V0ZXJTdGF0ZShcbiAgICByb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGVcbiAgKTogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyIHtcbiAgICBjb25zdCBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyID1cbiAgICAgIENvbmZpZ3VyYXRvck1vZGVsVXRpbHMuY3JlYXRlSW5pdGlhbE93bmVyKCk7XG4gICAgY29uc3QgcGFyYW1zID0gcm91dGVyU3RhdGUuc3RhdGUucGFyYW1zO1xuICAgIGlmIChwYXJhbXMub3duZXJUeXBlKSB7XG4gICAgICBjb25zdCBlbnRpdHlLZXkgPSBwYXJhbXMuZW50aXR5S2V5O1xuICAgICAgb3duZXIudHlwZSA9IHBhcmFtcy5vd25lclR5cGU7XG5cbiAgICAgIG93bmVyLmlkID0gZW50aXR5S2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICBvd25lci50eXBlID0gQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5QUk9EVUNUO1xuICAgICAgb3duZXIuaWQgPSBwYXJhbXMucm9vdFByb2R1Y3Q7XG4gICAgfVxuICAgIGNvbnN0IHNlbWFudGljUm91dGUgPSByb3V0ZXJTdGF0ZS5zdGF0ZS5zZW1hbnRpY1JvdXRlO1xuICAgIGlmIChzZW1hbnRpY1JvdXRlKSB7XG4gICAgICBjb25zdCBjb25maWd1cmF0b3JUeXBlID1cbiAgICAgICAgdGhpcy5nZXRDb25maWd1cmF0b3JUeXBlRnJvbVNlbWFudGljUm91dGUoc2VtYW50aWNSb3V0ZSk7XG4gICAgICBvd25lci5jb25maWd1cmF0b3JUeXBlID0gY29uZmlndXJhdG9yVHlwZTtcbiAgICB9XG4gICAgdGhpcy5jb25maWdVdGlsc1NlcnZpY2Uuc2V0T3duZXJLZXkob3duZXIpO1xuICAgIHJldHVybiBvd25lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlcyB0aGUgY29uZmlndXJhdG9yIHR5cGUgZnJvbSB0aGUgc2VtYW50aWMgcm91dGVcbiAgICogQHBhcmFtIHNlbWFudGljUm91dGUgQ29uc2lzdHMgb2YgYSBwcmVmaXggdGhhdCBpbmRpY2F0ZXMgaWYgdGFyZ2V0IGlzIGludGVyYWN0aXZlIGNvbmZpZ3VyYXRpb24gb3Igb3ZlcnZpZXcgYW5kXG4gICAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBjb21tZXJjZSBjb25maWd1cmF0b3IgdHlwZSBhcyBwb3N0Zml4LlxuICAgKiAgICAgICAgICAgICAgICAgICAgICBFeGFtcGxlOiBjb25maWd1cmVURVhURklFTEQgb3IgY29uZmlndXJlT3ZlcnZpZXdDUFFDT05GSUdVUkFUT1JcbiAgICogQHJldHVybnMgQ29uZmlndXJhdG9yIHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDb25maWd1cmF0b3JUeXBlRnJvbVNlbWFudGljUm91dGUoXG4gICAgc2VtYW50aWNSb3V0ZTogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKHNlbWFudGljUm91dGUuc3RhcnRzV2l0aCh0aGlzLlJPVVRFX0ZSQUdNRU5UX09WRVJWSUVXKSkge1xuICAgICAgcmV0dXJuIHNlbWFudGljUm91dGUuc3BsaXQodGhpcy5ST1VURV9GUkFHTUVOVF9PVkVSVklFVylbMV07XG4gICAgfSBlbHNlIGlmIChzZW1hbnRpY1JvdXRlLnN0YXJ0c1dpdGgodGhpcy5ST1VURV9GUkFHTUVOVF9DT05GSUdVUkUpKSB7XG4gICAgICByZXR1cm4gc2VtYW50aWNSb3V0ZS5zcGxpdCh0aGlzLlJPVVRFX0ZSQUdNRU5UX0NPTkZJR1VSRSlbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGFibGUgdG8gZGV0ZW1pbmUgY29uZmlndXJhdG9yIHR5cGUnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==