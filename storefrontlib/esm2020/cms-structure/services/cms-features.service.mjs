/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, InjectFlags } from '@angular/core';
import { ConfigChunk, deepMerge, DefaultConfigChunk, } from '@spartacus/core';
import { defer, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Service responsible for resolving cms config based feature modules.
 */
export class CmsFeaturesService {
    constructor(configInitializer, featureModules) {
        this.configInitializer = configInitializer;
        this.featureModules = featureModules;
        // maps componentType to feature
        this.componentFeatureMap = new Map();
        /*
         * Contains either FeatureInstance or FeatureInstance resolver for not yet
         * resolved feature modules
         */
        this.featureInstances = new Map();
        this.initFeatureMap();
    }
    initFeatureMap() {
        this.configInitializer
            .getStable('featureModules')
            .subscribe((config) => {
            this.featureModulesConfig = config.featureModules ?? {};
            for (const [featureName, featureConfig] of Object.entries(this.featureModulesConfig)) {
                if (typeof featureConfig !== 'string' &&
                    featureConfig?.module &&
                    featureConfig?.cmsComponents?.length) {
                    for (const component of featureConfig.cmsComponents) {
                        this.componentFeatureMap.set(component, featureName);
                    }
                }
            }
        });
    }
    /**
     * Check if there is feature module configuration that covers specified
     * component type
     */
    hasFeatureFor(componentType) {
        return this.componentFeatureMap.has(componentType);
    }
    /**
     * Return full CmsComponent mapping defined in feature module
     */
    getCmsMapping(componentType) {
        const feature = this.componentFeatureMap.get(componentType);
        if (!feature) {
            return of(undefined);
        }
        return this.resolveFeatureInstance(feature).pipe(map((featureInstance) => featureInstance.componentsMappings?.[componentType]));
    }
    /**
     * Resolves feature module for provided component type
     *
     * @param componentType
     */
    getModule(componentType) {
        const feature = this.componentFeatureMap.get(componentType);
        if (!feature) {
            return undefined;
        }
        let module;
        // we are returning injectors only for already resolved features
        this.featureInstances
            .get(feature)
            ?.subscribe((featureInstance) => {
            module = featureInstance.moduleRef;
        })
            .unsubscribe();
        return module;
    }
    /**
     * Resolve feature based on feature name, if feature was not yet resolved
     *
     * It will first resolve all module dependencies if defined
     */
    resolveFeatureInstance(featureName) {
        return defer(() => {
            if (!this.featureInstances.has(featureName)) {
                this.featureInstances.set(featureName, this.featureModules.resolveFeature(featureName).pipe(map((moduleRef) => this.createFeatureInstance(moduleRef, featureName)), shareReplay()));
            }
            return this.featureInstances.get(featureName);
        });
    }
    /**
     * Create feature instance from feature's moduleRef
     */
    createFeatureInstance(moduleRef, feature) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const featureConfig = this.featureModulesConfig[feature];
        const featureInstance = {
            moduleRef,
            componentsMappings: {},
        };
        // resolve configuration for feature module
        const resolvedConfiguration = this.resolveFeatureConfiguration(moduleRef.injector);
        // extract cms components configuration from feature config
        for (const componentType of featureConfig.cmsComponents ?? []) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            featureInstance.componentsMappings[componentType] =
                resolvedConfiguration.cmsComponents?.[componentType] ?? {};
        }
        return featureInstance;
    }
    /**
     * Returns configuration provided in feature module
     */
    resolveFeatureConfiguration(featureInjector) {
        // get config chunks from feature lib
        const featureConfigChunks = featureInjector.get(ConfigChunk, [], InjectFlags.Self);
        // get default config chunks from feature lib
        const featureDefaultConfigChunks = featureInjector.get(DefaultConfigChunk, [], InjectFlags.Self);
        return deepMerge({}, ...(featureDefaultConfigChunks ?? []), ...(featureConfigChunks ?? []));
    }
}
CmsFeaturesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsFeaturesService, deps: [{ token: i1.ConfigInitializerService }, { token: i1.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsFeaturesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsFeaturesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsFeaturesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfigInitializerService }, { type: i1.FeatureModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWZlYXR1cmVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VydmljZXMvY21zLWZlYXR1cmVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBSUwsV0FBVyxFQUVYLFNBQVMsRUFDVCxrQkFBa0IsR0FHbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPbEQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBZ0I3QixZQUNZLGlCQUEyQyxFQUMzQyxjQUFxQztRQURyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQVpqRCxnQ0FBZ0M7UUFDeEIsd0JBQW1CLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFN0Q7OztXQUdHO1FBQ0sscUJBQWdCLEdBQ3RCLElBQUksR0FBRyxFQUFFLENBQUM7UUFNVixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQjthQUNuQixTQUFTLENBQUMsZ0JBQWdCLENBQUM7YUFDM0IsU0FBUyxDQUFDLENBQUMsTUFBaUIsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztZQUV4RCxLQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFD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QUFDO1FBRUYsMkRBQTJEO1FBQzNELEtBQUssTUFBTSxhQUFhLElBQUksYUFBYSxDQUFDLGFBQWEsSUFBSSxFQUFFLEVBQUU7WUFDN0Qsb0VBQW9FO1lBQ3BFLGVBQWUsQ0FBQyxrQkFBbUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ2hELHFCQUFxQixDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM5RDtRQUNELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNLLDJCQUEyQixDQUFDLGVBQXlCO1FBQzNELHFDQUFxQztRQUNyQyxNQUFNLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQzdDLFdBQVcsRUFDWCxFQUFFLEVBQ0YsV0FBVyxDQUFDLElBQUksQ0FDakIsQ0FBQztRQUNGLDZDQUE2QztRQUM3QyxNQUFNLDBCQUEwQixHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQ3BELGtCQUFrQixFQUNsQixFQUFFLEVBQ0YsV0FBVyxDQUFDLElBQUksQ0FDakIsQ0FBQztRQUVGLE9BQU8sU0FBUyxDQUNkLEVBQUUsRUFDRixHQUFHLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDLEVBQ3JDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUNqQixDQUFDOzsrR0E5S1Usa0JBQWtCO21IQUFsQixrQkFBa0IsY0FGakIsTUFBTTsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0RmxhZ3MsIEluamVjdG9yLCBOZ01vZHVsZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ01TQ29tcG9uZW50Q29uZmlnLFxuICBDbXNDb21wb25lbnRNYXBwaW5nLFxuICBDbXNDb25maWcsXG4gIENvbmZpZ0NodW5rLFxuICBDb25maWdJbml0aWFsaXplclNlcnZpY2UsXG4gIGRlZXBNZXJnZSxcbiAgRGVmYXVsdENvbmZpZ0NodW5rLFxuICBGZWF0dXJlTW9kdWxlQ29uZmlnLFxuICBGZWF0dXJlTW9kdWxlc1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZlciwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmludGVyZmFjZSBGZWF0dXJlSW5zdGFuY2UgZXh0ZW5kcyBGZWF0dXJlTW9kdWxlQ29uZmlnIHtcbiAgbW9kdWxlUmVmPzogTmdNb2R1bGVSZWY8YW55PjtcbiAgY29tcG9uZW50c01hcHBpbmdzPzogQ01TQ29tcG9uZW50Q29uZmlnO1xufVxuXG4vKipcbiAqIFNlcnZpY2UgcmVzcG9uc2libGUgZm9yIHJlc29sdmluZyBjbXMgY29uZmlnIGJhc2VkIGZlYXR1cmUgbW9kdWxlcy5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENtc0ZlYXR1cmVzU2VydmljZSB7XG4gIC8vIGZlYXR1cmUgbW9kdWxlcyBjb25maWd1cmF0aW9uXG4gIHByaXZhdGUgZmVhdHVyZU1vZHVsZXNDb25maWc/OiB7XG4gICAgW2ZlYXR1cmVOYW1lOiBzdHJpbmddOiBGZWF0dXJlTW9kdWxlQ29uZmlnIHwgc3RyaW5nO1xuICB9O1xuXG4gIC8vIG1hcHMgY29tcG9uZW50VHlwZSB0byBmZWF0dXJlXG4gIHByaXZhdGUgY29tcG9uZW50RmVhdHVyZU1hcDogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICAvKlxuICAgKiBDb250YWlucyBlaXRoZXIgRmVhdHVyZUluc3RhbmNlIG9yIEZlYXR1cmVJbnN0YW5jZSByZXNvbHZlciBmb3Igbm90IHlldFxuICAgKiByZXNvbHZlZCBmZWF0dXJlIG1vZHVsZXNcbiAgICovXG4gIHByaXZhdGUgZmVhdHVyZUluc3RhbmNlczogTWFwPHN0cmluZywgT2JzZXJ2YWJsZTxGZWF0dXJlSW5zdGFuY2U+PiA9XG4gICAgbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWdJbml0aWFsaXplcjogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmZWF0dXJlTW9kdWxlczogRmVhdHVyZU1vZHVsZXNTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuaW5pdEZlYXR1cmVNYXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEZlYXR1cmVNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWdJbml0aWFsaXplclxuICAgICAgLmdldFN0YWJsZSgnZmVhdHVyZU1vZHVsZXMnKVxuICAgICAgLnN1YnNjcmliZSgoY29uZmlnOiBDbXNDb25maWcpID0+IHtcbiAgICAgICAgdGhpcy5mZWF0dXJlTW9kdWxlc0NvbmZpZyA9IGNvbmZpZy5mZWF0dXJlTW9kdWxlcyA/PyB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtmZWF0dXJlTmFtZSwgZmVhdHVyZUNvbmZpZ10gb2YgT2JqZWN0LmVudHJpZXMoXG4gICAgICAgICAgdGhpcy5mZWF0dXJlTW9kdWxlc0NvbmZpZ1xuICAgICAgICApKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIGZlYXR1cmVDb25maWcgIT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICBmZWF0dXJlQ29uZmlnPy5tb2R1bGUgJiZcbiAgICAgICAgICAgIGZlYXR1cmVDb25maWc/LmNtc0NvbXBvbmVudHM/Lmxlbmd0aFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgb2YgZmVhdHVyZUNvbmZpZy5jbXNDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RmVhdHVyZU1hcC5zZXQoY29tcG9uZW50LCBmZWF0dXJlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGVyZSBpcyBmZWF0dXJlIG1vZHVsZSBjb25maWd1cmF0aW9uIHRoYXQgY292ZXJzIHNwZWNpZmllZFxuICAgKiBjb21wb25lbnQgdHlwZVxuICAgKi9cbiAgaGFzRmVhdHVyZUZvcihjb21wb25lbnRUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRGZWF0dXJlTWFwLmhhcyhjb21wb25lbnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gZnVsbCBDbXNDb21wb25lbnQgbWFwcGluZyBkZWZpbmVkIGluIGZlYXR1cmUgbW9kdWxlXG4gICAqL1xuICBnZXRDbXNNYXBwaW5nKFxuICAgIGNvbXBvbmVudFR5cGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENtc0NvbXBvbmVudE1hcHBpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5jb21wb25lbnRGZWF0dXJlTWFwLmdldChjb21wb25lbnRUeXBlKTtcblxuICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZUZlYXR1cmVJbnN0YW5jZShmZWF0dXJlKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAoZmVhdHVyZUluc3RhbmNlKSA9PiBmZWF0dXJlSW5zdGFuY2UuY29tcG9uZW50c01hcHBpbmdzPy5bY29tcG9uZW50VHlwZV1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIGZlYXR1cmUgbW9kdWxlIGZvciBwcm92aWRlZCBjb21wb25lbnQgdHlwZVxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50VHlwZVxuICAgKi9cbiAgZ2V0TW9kdWxlKGNvbXBvbmVudFR5cGU6IHN0cmluZyk6IE5nTW9kdWxlUmVmPGFueT4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmNvbXBvbmVudEZlYXR1cmVNYXAuZ2V0KGNvbXBvbmVudFR5cGUpO1xuXG4gICAgaWYgKCFmZWF0dXJlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBtb2R1bGU7XG5cbiAgICAvLyB3ZSBhcmUgcmV0dXJuaW5nIGluamVjdG9ycyBvbmx5IGZvciBhbHJlYWR5IHJlc29sdmVkIGZlYXR1cmVzXG4gICAgdGhpcy5mZWF0dXJlSW5zdGFuY2VzXG4gICAgICAuZ2V0KGZlYXR1cmUpXG4gICAgICA/LnN1YnNjcmliZSgoZmVhdHVyZUluc3RhbmNlKSA9PiB7XG4gICAgICAgIG1vZHVsZSA9IGZlYXR1cmVJbnN0YW5jZS5tb2R1bGVSZWY7XG4gICAgICB9KVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIG1vZHVsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlIGZlYXR1cmUgYmFzZWQgb24gZmVhdHVyZSBuYW1lLCBpZiBmZWF0dXJlIHdhcyBub3QgeWV0IHJlc29sdmVkXG4gICAqXG4gICAqIEl0IHdpbGwgZmlyc3QgcmVzb2x2ZSBhbGwgbW9kdWxlIGRlcGVuZGVuY2llcyBpZiBkZWZpbmVkXG4gICAqL1xuICBwcml2YXRlIHJlc29sdmVGZWF0dXJlSW5zdGFuY2UoXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEZlYXR1cmVJbnN0YW5jZT4ge1xuICAgIHJldHVybiBkZWZlcigoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZmVhdHVyZUluc3RhbmNlcy5oYXMoZmVhdHVyZU5hbWUpKSB7XG4gICAgICAgIHRoaXMuZmVhdHVyZUluc3RhbmNlcy5zZXQoXG4gICAgICAgICAgZmVhdHVyZU5hbWUsXG4gICAgICAgICAgdGhpcy5mZWF0dXJlTW9kdWxlcy5yZXNvbHZlRmVhdHVyZShmZWF0dXJlTmFtZSkucGlwZShcbiAgICAgICAgICAgIG1hcCgobW9kdWxlUmVmKSA9PlxuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZlYXR1cmVJbnN0YW5jZShtb2R1bGVSZWYsIGZlYXR1cmVOYW1lKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHNoYXJlUmVwbGF5KClcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmZlYXR1cmVJbnN0YW5jZXMuZ2V0KGZlYXR1cmVOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgZmVhdHVyZSBpbnN0YW5jZSBmcm9tIGZlYXR1cmUncyBtb2R1bGVSZWZcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRmVhdHVyZUluc3RhbmNlKFxuICAgIG1vZHVsZVJlZjogTmdNb2R1bGVSZWY8YW55PixcbiAgICBmZWF0dXJlOiBzdHJpbmdcbiAgKTogRmVhdHVyZUluc3RhbmNlIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IGZlYXR1cmVDb25maWcgPSB0aGlzLmZlYXR1cmVNb2R1bGVzQ29uZmlnIVtcbiAgICAgIGZlYXR1cmVcbiAgICBdIGFzIEZlYXR1cmVNb2R1bGVDb25maWc7XG5cbiAgICBjb25zdCBmZWF0dXJlSW5zdGFuY2U6IEZlYXR1cmVJbnN0YW5jZSA9IHtcbiAgICAgIG1vZHVsZVJlZixcbiAgICAgIGNvbXBvbmVudHNNYXBwaW5nczoge30sXG4gICAgfTtcblxuICAgIC8vIHJlc29sdmUgY29uZmlndXJhdGlvbiBmb3IgZmVhdHVyZSBtb2R1bGVcbiAgICBjb25zdCByZXNvbHZlZENvbmZpZ3VyYXRpb24gPSB0aGlzLnJlc29sdmVGZWF0dXJlQ29uZmlndXJhdGlvbihcbiAgICAgIG1vZHVsZVJlZi5pbmplY3RvclxuICAgICk7XG5cbiAgICAvLyBleHRyYWN0IGNtcyBjb21wb25lbnRzIGNvbmZpZ3VyYXRpb24gZnJvbSBmZWF0dXJlIGNvbmZpZ1xuICAgIGZvciAoY29uc3QgY29tcG9uZW50VHlwZSBvZiBmZWF0dXJlQ29uZmlnLmNtc0NvbXBvbmVudHMgPz8gW10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBmZWF0dXJlSW5zdGFuY2UuY29tcG9uZW50c01hcHBpbmdzIVtjb21wb25lbnRUeXBlXSA9XG4gICAgICAgIHJlc29sdmVkQ29uZmlndXJhdGlvbi5jbXNDb21wb25lbnRzPy5bY29tcG9uZW50VHlwZV0gPz8ge307XG4gICAgfVxuICAgIHJldHVybiBmZWF0dXJlSW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjb25maWd1cmF0aW9uIHByb3ZpZGVkIGluIGZlYXR1cmUgbW9kdWxlXG4gICAqL1xuICBwcml2YXRlIHJlc29sdmVGZWF0dXJlQ29uZmlndXJhdGlvbihmZWF0dXJlSW5qZWN0b3I6IEluamVjdG9yKTogQ21zQ29uZmlnIHtcbiAgICAvLyBnZXQgY29uZmlnIGNodW5rcyBmcm9tIGZlYXR1cmUgbGliXG4gICAgY29uc3QgZmVhdHVyZUNvbmZpZ0NodW5rcyA9IGZlYXR1cmVJbmplY3Rvci5nZXQ8YW55W10+KFxuICAgICAgQ29uZmlnQ2h1bmssXG4gICAgICBbXSxcbiAgICAgIEluamVjdEZsYWdzLlNlbGZcbiAgICApO1xuICAgIC8vIGdldCBkZWZhdWx0IGNvbmZpZyBjaHVua3MgZnJvbSBmZWF0dXJlIGxpYlxuICAgIGNvbnN0IGZlYXR1cmVEZWZhdWx0Q29uZmlnQ2h1bmtzID0gZmVhdHVyZUluamVjdG9yLmdldDxhbnlbXT4oXG4gICAgICBEZWZhdWx0Q29uZmlnQ2h1bmssXG4gICAgICBbXSxcbiAgICAgIEluamVjdEZsYWdzLlNlbGZcbiAgICApO1xuXG4gICAgcmV0dXJuIGRlZXBNZXJnZShcbiAgICAgIHt9LFxuICAgICAgLi4uKGZlYXR1cmVEZWZhdWx0Q29uZmlnQ2h1bmtzID8/IFtdKSxcbiAgICAgIC4uLihmZWF0dXJlQ29uZmlnQ2h1bmtzID8/IFtdKVxuICAgICkgYXMgQ21zQ29uZmlnO1xuICB9XG59XG4iXX0=