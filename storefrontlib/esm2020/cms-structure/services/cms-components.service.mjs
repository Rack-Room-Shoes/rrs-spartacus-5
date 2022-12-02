/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, isDevMode, PLATFORM_ID, } from '@angular/core';
import { deepMerge, isNotUndefined, } from '@spartacus/core';
import { defer, forkJoin, of } from 'rxjs';
import { filter, mapTo, share, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./cms-features.service";
/**
 * Service with logic related to resolving component from cms mapping
 */
export class CmsComponentsService {
    constructor(config, platformId, featureModules, configInitializer) {
        this.config = config;
        this.platformId = platformId;
        this.featureModules = featureModules;
        this.configInitializer = configInitializer;
        // Component mappings that were identified as missing
        this.missingComponents = [];
        // Already resolved mappings
        this.mappings = {};
        // Contains already initialized resolvers for specified component typez
        this.mappingResolvers = new Map();
        this.configInitializer
            .getStable('cmsComponents')
            .subscribe((cmsConfig) => {
            // we want to grab cms configuration available at config initialization phase
            // as lazy-loaded modules can affect global configuration resulting in
            // non-deterministic state
            this.staticCmsConfig = { ...cmsConfig.cmsComponents };
        });
    }
    /**
     * Should be called to make sure all component mappings are determined,
     * especially lazy loaded ones.
     *
     * It's recommended way to make sure all other methods of CmsComponentService
     * will be able to work synchronously for asked component types and avoid risk
     * of potential errors that could be thrown otherwise.
     */
    determineMappings(componentTypes) {
        return defer(() => {
            // we use defer, to be sure the logic below used to compose final observable
            // will be executed at subscription time (with up to date state at the time,
            // when it will be needed)
            const featureResolvers = [];
            for (const componentType of componentTypes) {
                if (!this.mappings[componentType]) {
                    const staticConfig = (this.staticCmsConfig ??
                        this.config.cmsComponents)?.[componentType];
                    // check if this component type is managed by feature module
                    if (this.featureModules.hasFeatureFor(componentType)) {
                        featureResolvers.push(
                        // we delegate populating this.mappings to feature resolver
                        this.getFeatureMappingResolver(componentType, staticConfig));
                    }
                    else {
                        // simply use only static config
                        if (staticConfig) {
                            this.mappings[componentType] = staticConfig;
                        }
                    }
                }
            }
            if (featureResolvers.length) {
                return forkJoin(featureResolvers).pipe(mapTo(componentTypes));
            }
            else {
                return of(componentTypes);
            }
        });
    }
    getFeatureMappingResolver(componentType, staticConfig) {
        if (!this.mappingResolvers.has(componentType)) {
            const mappingResolver$ = this.featureModules
                .getCmsMapping(componentType)
                .pipe(filter(isNotUndefined), tap((featureComponentMapping) => {
                // We treat cms mapping configuration from a feature as a default,
                // that can be overridden by app/static configuration
                this.mappings[componentType] = deepMerge({}, featureComponentMapping, staticConfig);
                this.mappingResolvers.delete(componentType);
            }), share());
            this.mappingResolvers.set(componentType, mappingResolver$);
        }
        return this.mappingResolvers.get(componentType);
    }
    /**
     * Returns the feature module for a cms component.
     * It will only work for cms components provided by feature modules.
     *
     * @param componentType
     */
    getModule(componentType) {
        if (this.featureModules.hasFeatureFor(componentType)) {
            return this.featureModules.getModule(componentType);
        }
    }
    /**
     * Return collection of component mapping configuration for specified list of
     * component types.
     *
     * If component mapping can't be determined synchronously, for example, lazy
     * loaded one, it will throw an error.
     *
     * To make sure component mapping is available, determineMappings()
     * should be called and completed first.
     */
    getMapping(componentType) {
        const componentConfig = this.mappings[componentType] ??
            (this.staticCmsConfig ?? this.config.cmsComponents)?.[componentType];
        if (isDevMode() && !componentConfig) {
            if (!this.missingComponents.includes(componentType)) {
                this.missingComponents.push(componentType);
                console.warn(`No component implementation found for the CMS component type '${componentType}'.\n`, `Make sure you implement a component and register it in the mapper.`);
            }
        }
        return componentConfig;
    }
    /**
     * Checks, if component should be rendered as some components
     * could be disabled for server side renderings
     */
    shouldRender(componentType) {
        const isSSR = isPlatformServer(this.platformId);
        return !(isSSR && this.getMapping(componentType)?.disableSSR);
    }
    /**
     * Return DeferLoadingStrategy for component type.
     */
    getDeferLoadingStrategy(componentType) {
        return (this.staticCmsConfig ?? this.config.cmsComponents)?.[componentType]
            ?.deferLoading;
    }
    /**
     * Get cms driven child routes for components
     */
    getChildRoutes(componentTypes) {
        const configs = [];
        for (const componentType of componentTypes) {
            if (this.shouldRender(componentType)) {
                configs.push(this.getMapping(componentType)?.childRoutes ?? []);
            }
        }
        return this.standardizeChildRoutes(configs);
    }
    /**
     * Returns the static data for the component type.
     */
    getStaticData(componentType) {
        return this.getMapping(componentType)?.data;
    }
    /**
     * Standardizes the format of `childRoutes` config.
     *
     * Some `childRoutes` configs are simple arrays of Routes (without the notion of the parent route).
     * But some configs can be an object with children routes and their parent defined in separate property.
     */
    standardizeChildRoutes(childRoutesConfigs) {
        const result = { children: [] };
        (childRoutesConfigs || []).forEach((config) => {
            if (Array.isArray(config)) {
                result.children?.push(...config);
            }
            else {
                result.children?.push(...(config.children || []));
                if (config.parent) {
                    result.parent = config.parent;
                }
            }
        });
        return result;
    }
    /**
     * Get cms driven guards for components
     */
    getGuards(componentTypes) {
        const guards = new Set();
        for (const componentType of componentTypes) {
            this.getMapping(componentType)?.guards?.forEach((guard) => guards.add(guard));
        }
        return Array.from(guards);
    }
    /**
     * Get i18n keys associated with components
     */
    getI18nKeys(componentTypes) {
        const i18nKeys = new Set();
        for (const componentType of componentTypes) {
            if (this.shouldRender(componentType)) {
                this.getMapping(componentType)?.i18nKeys?.forEach((key) => i18nKeys.add(key));
            }
        }
        return Array.from(i18nKeys);
    }
}
CmsComponentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsComponentsService, deps: [{ token: i1.CmsConfig }, { token: PLATFORM_ID }, { token: i2.CmsFeaturesService }, { token: i1.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsComponentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsComponentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsComponentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsConfig }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.CmsFeaturesService }, { type: i1.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWNvbXBvbmVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZXJ2aWNlcy9jbXMtY29tcG9uZW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEVBRVQsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFPTCxTQUFTLEVBRVQsY0FBYyxHQUNmLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUczRDs7R0FFRztBQUlILE1BQU0sT0FBTyxvQkFBb0I7SUFjL0IsWUFDWSxNQUFpQixFQUNJLFVBQWtCLEVBQ3ZDLGNBQWtDLEVBQ2xDLGlCQUEyQztRQUgzQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ0ksZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQWpCdkQscURBQXFEO1FBQzNDLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUUzQyw0QkFBNEI7UUFDbEIsYUFBUSxHQUFxRCxFQUFFLENBQUM7UUFLMUUsdUVBQXVFO1FBQzdELHFCQUFnQixHQUN4QixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBUVYsSUFBSSxDQUFDLGlCQUFpQjthQUNuQixTQUFTLENBQUMsZUFBZSxDQUFDO2FBQzFCLFNBQVMsQ0FB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Q0FDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FDbEIsQ0FBQztTQUNIO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxjQUF3QjtRQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ25DLEtBQUssTUFBTSxhQUFhLElBQUksY0FBYyxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDeEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDbEIsQ0FBQzthQUNIO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7aUhBeE9VLG9CQUFvQiwyQ0FnQnJCLFdBQVc7cUhBaEJWLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWlCSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgaXNEZXZNb2RlLFxuICBOZ01vZHVsZVJlZixcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29tcG9uZW50LFxuICBDbXNDb21wb25lbnRDaGlsZFJvdXRlc0NvbmZpZyxcbiAgQ01TQ29tcG9uZW50Q29uZmlnLFxuICBDbXNDb21wb25lbnRNYXBwaW5nLFxuICBDbXNDb25maWcsXG4gIENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgZGVlcE1lcmdlLFxuICBEZWZlckxvYWRpbmdTdHJhdGVneSxcbiAgaXNOb3RVbmRlZmluZWQsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZlciwgZm9ya0pvaW4sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcFRvLCBzaGFyZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zRmVhdHVyZXNTZXJ2aWNlIH0gZnJvbSAnLi9jbXMtZmVhdHVyZXMuc2VydmljZSc7XG5cbi8qKlxuICogU2VydmljZSB3aXRoIGxvZ2ljIHJlbGF0ZWQgdG8gcmVzb2x2aW5nIGNvbXBvbmVudCBmcm9tIGNtcyBtYXBwaW5nXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbXNDb21wb25lbnRzU2VydmljZSB7XG4gIC8vIENvbXBvbmVudCBtYXBwaW5ncyB0aGF0IHdlcmUgaWRlbnRpZmllZCBhcyBtaXNzaW5nXG4gIHByb3RlY3RlZCBtaXNzaW5nQ29tcG9uZW50czogc3RyaW5nW10gPSBbXTtcblxuICAvLyBBbHJlYWR5IHJlc29sdmVkIG1hcHBpbmdzXG4gIHByb3RlY3RlZCBtYXBwaW5nczogeyBbY29tcG9uZW50VHlwZTogc3RyaW5nXTogQ21zQ29tcG9uZW50TWFwcGluZyB9ID0ge307XG5cbiAgLy8gQ29weSBvZiBpbml0aWFsL3N0YXRpYyBjbXMgbWFwcGluZyBjb25maWd1cmF0aW9uIHVuYWZmZWN0ZWQgYnkgbGF6eS1sb2FkZWQgbW9kdWxlc1xuICBwcm90ZWN0ZWQgc3RhdGljQ21zQ29uZmlnOiBDTVNDb21wb25lbnRDb25maWcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gQ29udGFpbnMgYWxyZWFkeSBpbml0aWFsaXplZCByZXNvbHZlcnMgZm9yIHNwZWNpZmllZCBjb21wb25lbnQgdHlwZXpcbiAgcHJvdGVjdGVkIG1hcHBpbmdSZXNvbHZlcnM6IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8Q21zQ29tcG9uZW50TWFwcGluZz4+ID1cbiAgICBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ21zQ29uZmlnLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJvdGVjdGVkIGZlYXR1cmVNb2R1bGVzOiBDbXNGZWF0dXJlc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ0luaXRpYWxpemVyOiBDb25maWdJbml0aWFsaXplclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jb25maWdJbml0aWFsaXplclxuICAgICAgLmdldFN0YWJsZSgnY21zQ29tcG9uZW50cycpXG4gICAgICAuc3Vic2NyaWJlKChjbXNDb25maWc6IENtc0NvbmZpZykgPT4ge1xuICAgICAgICAvLyB3ZSB3YW50IHRvIGdyYWIgY21zIGNvbmZpZ3VyYXRpb24gYXZhaWxhYmxlIGF0IGNvbmZpZyBpbml0aWFsaXphdGlvbiBwaGFzZVxuICAgICAgICAvLyBhcyBsYXp5LWxvYWRlZCBtb2R1bGVzIGNhbiBhZmZlY3QgZ2xvYmFsIGNvbmZpZ3VyYXRpb24gcmVzdWx0aW5nIGluXG4gICAgICAgIC8vIG5vbi1kZXRlcm1pbmlzdGljIHN0YXRlXG4gICAgICAgIHRoaXMuc3RhdGljQ21zQ29uZmlnID0geyAuLi5jbXNDb25maWcuY21zQ29tcG9uZW50cyB9O1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB0byBtYWtlIHN1cmUgYWxsIGNvbXBvbmVudCBtYXBwaW5ncyBhcmUgZGV0ZXJtaW5lZCxcbiAgICogZXNwZWNpYWxseSBsYXp5IGxvYWRlZCBvbmVzLlxuICAgKlxuICAgKiBJdCdzIHJlY29tbWVuZGVkIHdheSB0byBtYWtlIHN1cmUgYWxsIG90aGVyIG1ldGhvZHMgb2YgQ21zQ29tcG9uZW50U2VydmljZVxuICAgKiB3aWxsIGJlIGFibGUgdG8gd29yayBzeW5jaHJvbm91c2x5IGZvciBhc2tlZCBjb21wb25lbnQgdHlwZXMgYW5kIGF2b2lkIHJpc2tcbiAgICogb2YgcG90ZW50aWFsIGVycm9ycyB0aGF0IGNvdWxkIGJlIHRocm93biBvdGhlcndpc2UuXG4gICAqL1xuICBkZXRlcm1pbmVNYXBwaW5ncyhjb21wb25lbnRUeXBlczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGRlZmVyKCgpID0+IHtcbiAgICAgIC8vIHdlIHVzZSBkZWZlciwgdG8gYmUgc3VyZSB0aGUgbG9naWMgYmVsb3cgdXNlZCB0byBjb21wb3NlIGZpbmFsIG9ic2VydmFibGVcbiAgICAgIC8vIHdpbGwgYmUgZXhlY3V0ZWQgYXQgc3Vic2NyaXB0aW9uIHRpbWUgKHdpdGggdXAgdG8gZGF0ZSBzdGF0ZSBhdCB0aGUgdGltZSxcbiAgICAgIC8vIHdoZW4gaXQgd2lsbCBiZSBuZWVkZWQpXG4gICAgICBjb25zdCBmZWF0dXJlUmVzb2x2ZXJzID0gW107XG5cbiAgICAgIGZvciAoY29uc3QgY29tcG9uZW50VHlwZSBvZiBjb21wb25lbnRUeXBlcykge1xuICAgICAgICBpZiAoIXRoaXMubWFwcGluZ3NbY29tcG9uZW50VHlwZV0pIHtcbiAgICAgICAgICBjb25zdCBzdGF0aWNDb25maWcgPSAodGhpcy5zdGF0aWNDbXNDb25maWcgPz9cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNtc0NvbXBvbmVudHMpPy5bY29tcG9uZW50VHlwZV07XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGNvbXBvbmVudCB0eXBlIGlzIG1hbmFnZWQgYnkgZmVhdHVyZSBtb2R1bGVcbiAgICAgICAgICBpZiAodGhpcy5mZWF0dXJlTW9kdWxlcy5oYXNGZWF0dXJlRm9yKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICAgICAgICBmZWF0dXJlUmVzb2x2ZXJzLnB1c2goXG4gICAgICAgICAgICAgIC8vIHdlIGRlbGVnYXRlIHBvcHVsYXRpbmcgdGhpcy5tYXBwaW5ncyB0byBmZWF0dXJlIHJlc29sdmVyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0RmVhdHVyZU1hcHBpbmdSZXNvbHZlcihjb21wb25lbnRUeXBlLCBzdGF0aWNDb25maWcpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzaW1wbHkgdXNlIG9ubHkgc3RhdGljIGNvbmZpZ1xuICAgICAgICAgICAgaWYgKHN0YXRpY0NvbmZpZykge1xuICAgICAgICAgICAgICB0aGlzLm1hcHBpbmdzW2NvbXBvbmVudFR5cGVdID0gc3RhdGljQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmVhdHVyZVJlc29sdmVycy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKGZlYXR1cmVSZXNvbHZlcnMpLnBpcGUobWFwVG8oY29tcG9uZW50VHlwZXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvZihjb21wb25lbnRUeXBlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEZlYXR1cmVNYXBwaW5nUmVzb2x2ZXIoXG4gICAgY29tcG9uZW50VHlwZTogc3RyaW5nLFxuICAgIHN0YXRpY0NvbmZpZz86IENtc0NvbXBvbmVudE1hcHBpbmdcbiAgKTogT2JzZXJ2YWJsZTxDbXNDb21wb25lbnRNYXBwaW5nPiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLm1hcHBpbmdSZXNvbHZlcnMuaGFzKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICBjb25zdCBtYXBwaW5nUmVzb2x2ZXIkID0gdGhpcy5mZWF0dXJlTW9kdWxlc1xuICAgICAgICAuZ2V0Q21zTWFwcGluZyhjb21wb25lbnRUeXBlKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoaXNOb3RVbmRlZmluZWQpLFxuICAgICAgICAgIHRhcCgoZmVhdHVyZUNvbXBvbmVudE1hcHBpbmcpID0+IHtcbiAgICAgICAgICAgIC8vIFdlIHRyZWF0IGNtcyBtYXBwaW5nIGNvbmZpZ3VyYXRpb24gZnJvbSBhIGZlYXR1cmUgYXMgYSBkZWZhdWx0LFxuICAgICAgICAgICAgLy8gdGhhdCBjYW4gYmUgb3ZlcnJpZGRlbiBieSBhcHAvc3RhdGljIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIHRoaXMubWFwcGluZ3NbY29tcG9uZW50VHlwZV0gPSBkZWVwTWVyZ2UoXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBmZWF0dXJlQ29tcG9uZW50TWFwcGluZyxcbiAgICAgICAgICAgICAgc3RhdGljQ29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5tYXBwaW5nUmVzb2x2ZXJzLmRlbGV0ZShjb21wb25lbnRUeXBlKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBzaGFyZSgpXG4gICAgICAgICk7XG4gICAgICB0aGlzLm1hcHBpbmdSZXNvbHZlcnMuc2V0KGNvbXBvbmVudFR5cGUsIG1hcHBpbmdSZXNvbHZlciQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tYXBwaW5nUmVzb2x2ZXJzLmdldChjb21wb25lbnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmZWF0dXJlIG1vZHVsZSBmb3IgYSBjbXMgY29tcG9uZW50LlxuICAgKiBJdCB3aWxsIG9ubHkgd29yayBmb3IgY21zIGNvbXBvbmVudHMgcHJvdmlkZWQgYnkgZmVhdHVyZSBtb2R1bGVzLlxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50VHlwZVxuICAgKi9cbiAgZ2V0TW9kdWxlKGNvbXBvbmVudFR5cGU6IHN0cmluZyk6IE5nTW9kdWxlUmVmPGFueT4gfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmZlYXR1cmVNb2R1bGVzLmhhc0ZlYXR1cmVGb3IoY29tcG9uZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZlYXR1cmVNb2R1bGVzLmdldE1vZHVsZShjb21wb25lbnRUeXBlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGNvbGxlY3Rpb24gb2YgY29tcG9uZW50IG1hcHBpbmcgY29uZmlndXJhdGlvbiBmb3Igc3BlY2lmaWVkIGxpc3Qgb2ZcbiAgICogY29tcG9uZW50IHR5cGVzLlxuICAgKlxuICAgKiBJZiBjb21wb25lbnQgbWFwcGluZyBjYW4ndCBiZSBkZXRlcm1pbmVkIHN5bmNocm9ub3VzbHksIGZvciBleGFtcGxlLCBsYXp5XG4gICAqIGxvYWRlZCBvbmUsIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuXG4gICAqXG4gICAqIFRvIG1ha2Ugc3VyZSBjb21wb25lbnQgbWFwcGluZyBpcyBhdmFpbGFibGUsIGRldGVybWluZU1hcHBpbmdzKClcbiAgICogc2hvdWxkIGJlIGNhbGxlZCBhbmQgY29tcGxldGVkIGZpcnN0LlxuICAgKi9cbiAgZ2V0TWFwcGluZyhjb21wb25lbnRUeXBlOiBzdHJpbmcpOiBDbXNDb21wb25lbnRNYXBwaW5nIHtcbiAgICBjb25zdCBjb21wb25lbnRDb25maWcgPVxuICAgICAgdGhpcy5tYXBwaW5nc1tjb21wb25lbnRUeXBlXSA/P1xuICAgICAgKHRoaXMuc3RhdGljQ21zQ29uZmlnID8/IHRoaXMuY29uZmlnLmNtc0NvbXBvbmVudHMpPy5bY29tcG9uZW50VHlwZV07XG5cbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgIWNvbXBvbmVudENvbmZpZykge1xuICAgICAgaWYgKCF0aGlzLm1pc3NpbmdDb21wb25lbnRzLmluY2x1ZGVzKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMubWlzc2luZ0NvbXBvbmVudHMucHVzaChjb21wb25lbnRUeXBlKTtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBObyBjb21wb25lbnQgaW1wbGVtZW50YXRpb24gZm91bmQgZm9yIHRoZSBDTVMgY29tcG9uZW50IHR5cGUgJyR7Y29tcG9uZW50VHlwZX0nLlxcbmAsXG4gICAgICAgICAgYE1ha2Ugc3VyZSB5b3UgaW1wbGVtZW50IGEgY29tcG9uZW50IGFuZCByZWdpc3RlciBpdCBpbiB0aGUgbWFwcGVyLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcywgaWYgY29tcG9uZW50IHNob3VsZCBiZSByZW5kZXJlZCBhcyBzb21lIGNvbXBvbmVudHNcbiAgICogY291bGQgYmUgZGlzYWJsZWQgZm9yIHNlcnZlciBzaWRlIHJlbmRlcmluZ3NcbiAgICovXG4gIHNob3VsZFJlbmRlcihjb21wb25lbnRUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBpc1NTUiA9IGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICByZXR1cm4gIShpc1NTUiAmJiB0aGlzLmdldE1hcHBpbmcoY29tcG9uZW50VHlwZSk/LmRpc2FibGVTU1IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBEZWZlckxvYWRpbmdTdHJhdGVneSBmb3IgY29tcG9uZW50IHR5cGUuXG4gICAqL1xuICBnZXREZWZlckxvYWRpbmdTdHJhdGVneShcbiAgICBjb21wb25lbnRUeXBlOiBzdHJpbmdcbiAgKTogRGVmZXJMb2FkaW5nU3RyYXRlZ3kgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiAodGhpcy5zdGF0aWNDbXNDb25maWcgPz8gdGhpcy5jb25maWcuY21zQ29tcG9uZW50cyk/Lltjb21wb25lbnRUeXBlXVxuICAgICAgPy5kZWZlckxvYWRpbmc7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNtcyBkcml2ZW4gY2hpbGQgcm91dGVzIGZvciBjb21wb25lbnRzXG4gICAqL1xuICBnZXRDaGlsZFJvdXRlcyhjb21wb25lbnRUeXBlczogc3RyaW5nW10pOiBDbXNDb21wb25lbnRDaGlsZFJvdXRlc0NvbmZpZyB7XG4gICAgY29uc3QgY29uZmlncyA9IFtdO1xuICAgIGZvciAoY29uc3QgY29tcG9uZW50VHlwZSBvZiBjb21wb25lbnRUeXBlcykge1xuICAgICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICAgIGNvbmZpZ3MucHVzaCh0aGlzLmdldE1hcHBpbmcoY29tcG9uZW50VHlwZSk/LmNoaWxkUm91dGVzID8/IFtdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zdGFuZGFyZGl6ZUNoaWxkUm91dGVzKGNvbmZpZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN0YXRpYyBkYXRhIGZvciB0aGUgY29tcG9uZW50IHR5cGUuXG4gICAqL1xuICBnZXRTdGF0aWNEYXRhPFQgZXh0ZW5kcyBDbXNDb21wb25lbnQgPSBDbXNDb21wb25lbnQ+KFxuICAgIGNvbXBvbmVudFR5cGU6IHN0cmluZ1xuICApOiBUIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5nZXRNYXBwaW5nKGNvbXBvbmVudFR5cGUpPy5kYXRhIGFzIFQ7XG4gIH1cblxuICAvKipcbiAgICogU3RhbmRhcmRpemVzIHRoZSBmb3JtYXQgb2YgYGNoaWxkUm91dGVzYCBjb25maWcuXG4gICAqXG4gICAqIFNvbWUgYGNoaWxkUm91dGVzYCBjb25maWdzIGFyZSBzaW1wbGUgYXJyYXlzIG9mIFJvdXRlcyAod2l0aG91dCB0aGUgbm90aW9uIG9mIHRoZSBwYXJlbnQgcm91dGUpLlxuICAgKiBCdXQgc29tZSBjb25maWdzIGNhbiBiZSBhbiBvYmplY3Qgd2l0aCBjaGlsZHJlbiByb3V0ZXMgYW5kIHRoZWlyIHBhcmVudCBkZWZpbmVkIGluIHNlcGFyYXRlIHByb3BlcnR5LlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YW5kYXJkaXplQ2hpbGRSb3V0ZXMoXG4gICAgY2hpbGRSb3V0ZXNDb25maWdzOiAoUm91dGVbXSB8IENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnKVtdXG4gICk6IENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnIHtcbiAgICBjb25zdCByZXN1bHQ6IENtc0NvbXBvbmVudENoaWxkUm91dGVzQ29uZmlnID0geyBjaGlsZHJlbjogW10gfTtcblxuICAgIChjaGlsZFJvdXRlc0NvbmZpZ3MgfHwgW10pLmZvckVhY2goKGNvbmZpZykgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnKSkge1xuICAgICAgICByZXN1bHQuY2hpbGRyZW4/LnB1c2goLi4uY29uZmlnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5jaGlsZHJlbj8ucHVzaCguLi4oY29uZmlnLmNoaWxkcmVuIHx8IFtdKSk7XG4gICAgICAgIGlmIChjb25maWcucGFyZW50KSB7XG4gICAgICAgICAgcmVzdWx0LnBhcmVudCA9IGNvbmZpZy5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNtcyBkcml2ZW4gZ3VhcmRzIGZvciBjb21wb25lbnRzXG4gICAqL1xuICBnZXRHdWFyZHMoY29tcG9uZW50VHlwZXM6IHN0cmluZ1tdKTogYW55W10ge1xuICAgIGNvbnN0IGd1YXJkcyA9IG5ldyBTZXQ8YW55PigpO1xuICAgIGZvciAoY29uc3QgY29tcG9uZW50VHlwZSBvZiBjb21wb25lbnRUeXBlcykge1xuICAgICAgdGhpcy5nZXRNYXBwaW5nKGNvbXBvbmVudFR5cGUpPy5ndWFyZHM/LmZvckVhY2goKGd1YXJkKSA9PlxuICAgICAgICBndWFyZHMuYWRkKGd1YXJkKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZ3VhcmRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaTE4biBrZXlzIGFzc29jaWF0ZWQgd2l0aCBjb21wb25lbnRzXG4gICAqL1xuICBnZXRJMThuS2V5cyhjb21wb25lbnRUeXBlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgaTE4bktleXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudFR5cGUgb2YgY29tcG9uZW50VHlwZXMpIHtcbiAgICAgIGlmICh0aGlzLnNob3VsZFJlbmRlcihjb21wb25lbnRUeXBlKSkge1xuICAgICAgICB0aGlzLmdldE1hcHBpbmcoY29tcG9uZW50VHlwZSk/LmkxOG5LZXlzPy5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgaTE4bktleXMuYWRkKGtleSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oaTE4bktleXMpO1xuICB9XG59XG4iXX0=