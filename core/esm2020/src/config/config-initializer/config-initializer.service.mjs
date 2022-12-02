/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';
import { RootConfig } from '../config-tokens';
import { deepMerge } from '../utils/deep-merge';
import { CONFIG_INITIALIZER_FORROOT_GUARD, } from './config-initializer';
import * as i0 from "@angular/core";
import * as i1 from "../config-tokens";
/**
 * Provides support for CONFIG_INITIALIZERS
 */
export class ConfigInitializerService {
    constructor(config, initializerGuard, rootConfig) {
        this.config = config;
        this.initializerGuard = initializerGuard;
        this.rootConfig = rootConfig;
        this.ongoingScopes$ = new BehaviorSubject(undefined);
    }
    /**
     * Returns true if config is stable, i.e. all CONFIG_INITIALIZERS resolved correctly
     */
    get isStable() {
        return !this.initializerGuard || this.ongoingScopes$.value?.length === 0;
    }
    /**
     * Recommended way to get config for code that can run before app will finish
     * initialization (APP_INITIALIZERS, selected service constructors)
     *
     * Used without parameters waits for the whole config to become stable
     *
     * Parameters allow to describe which part of the config should be stable using
     * string describing config part, e.g.:
     * 'siteContext', 'siteContext.language', etc.
     *
     * @param scopes String describing parts of the config we want to be sure are stable
     */
    getStable(...scopes) {
        if (this.isStable) {
            return of(this.config);
        }
        return this.ongoingScopes$.pipe(filter((ongoingScopes) => !!ongoingScopes && this.areReady(scopes, ongoingScopes)), take(1), mapTo(this.config));
    }
    /**
     * Removes provided scopes from currently ongoingScopes
     *
     * @param scopes
     */
    finishScopes(scopes) {
        const newScopes = [...(this.ongoingScopes$.value ?? [])];
        for (const scope of scopes) {
            newScopes.splice(newScopes.indexOf(scope), 1);
        }
        this.ongoingScopes$.next(newScopes);
    }
    /**
     * Return true if provided scopes are not part of ongoingScopes
     *
     * @param scopes
     * @param ongoingScopes
     */
    areReady(scopes, ongoingScopes) {
        if (!scopes.length) {
            return !ongoingScopes.length;
        }
        for (const scope of scopes) {
            for (const ongoingScope of ongoingScopes) {
                if (this.scopesOverlap(scope, ongoingScope)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Check if two scopes overlap.
     *
     * Example of scopes that overlap:
     * 'test' and 'test', 'test.a' and 'test', 'test' and 'test.a'
     *
     * Example of scopes that do not overlap:
     * 'test' and 'testA', 'test.a' and 'test.b', 'test.nested' and 'test.nest'
     *
     * @param a ScopeA
     * @param b ScopeB
     */
    scopesOverlap(a, b) {
        if (b.length > a.length) {
            [a, b] = [b, a];
        }
        return a.startsWith(b) && (a[b.length] || '.') === '.';
    }
    /**
     * @internal
     *
     * Not a part of a public API, used by APP_INITIALIZER to initialize all provided CONFIG_INITIALIZERS
     *
     */
    async initialize(initializers) {
        if (this.ongoingScopes$.value) {
            // guard for double initialization
            return;
        }
        const ongoingScopes = [];
        const asyncConfigs = [];
        for (const initializer of initializers || []) {
            if (!initializer) {
                continue;
            }
            if (!initializer.scopes || !initializer.scopes.length) {
                throw new Error('CONFIG_INITIALIZER should provide scope!');
            }
            if (isDevMode() && !this.areReady(initializer.scopes, ongoingScopes)) {
                console.warn('More than one CONFIG_INITIALIZER is initializing the same config scope.');
            }
            ongoingScopes.push(...initializer.scopes);
            asyncConfigs.push((async () => {
                const initializerConfig = await initializer.configFactory();
                // contribute configuration to rootConfig
                deepMerge(this.rootConfig, initializerConfig);
                // contribute configuration to global config
                deepMerge(this.config, initializerConfig);
                this.finishScopes(initializer.scopes);
            })());
        }
        this.ongoingScopes$.next(ongoingScopes);
        if (asyncConfigs.length) {
            await Promise.all(asyncConfigs);
        }
    }
}
ConfigInitializerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerService, deps: [{ token: i1.Config }, { token: CONFIG_INITIALIZER_FORROOT_GUARD, optional: true }, { token: RootConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ConfigInitializerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigInitializerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Config }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CONFIG_INITIALIZER_FORROOT_GUARD]
                }] }, { type: i1.Config, decorators: [{
                    type: Inject,
                    args: [RootConfig]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWluaXRpYWxpemVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jb25maWcvY29uZmlnLWluaXRpYWxpemVyL2NvbmZpZy1pbml0aWFsaXplci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBVSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUVMLGdDQUFnQyxHQUNqQyxNQUFNLHNCQUFzQixDQUFDOzs7QUFFOUI7O0dBRUc7QUFJSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1ksTUFBYyxFQUdkLGdCQUFxQixFQUNELFVBQWtCO1FBSnRDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFHZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQUs7UUFDRCxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBR3hDLG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQzVDLFNBQVMsQ0FDVixDQUFDO0lBSkMsQ0FBQztJQU1KOztPQUVHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFNBQVMsQ0FBQyxH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LENBQUM7WUFFMUMsWUFBWSxDQUFDLElBQUksQ0FDZixDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNWLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQzVELHlDQUF5QztnQkFDekMsU0FBUyxDQUNQLElBQUksQ0FBQyxVQUFxQyxFQUMxQyxpQkFBaUIsQ0FDbEIsQ0FBQztnQkFDRiw0Q0FBNEM7Z0JBQzVDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBaUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsRUFBRSxDQUNMLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUN2QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOztxSEFySlUsd0JBQXdCLHdDQUl6QixnQ0FBZ0MsNkJBRWhDLFVBQVU7eUhBTlQsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBSUksUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQyxnQ0FBZ0M7OzBCQUV2QyxNQUFNOzJCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIGlzRGV2TW9kZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwVG8sIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWcsIFJvb3RDb25maWcgfSBmcm9tICcuLi9jb25maWctdG9rZW5zJztcbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJy4uL3V0aWxzL2RlZXAtbWVyZ2UnO1xuaW1wb3J0IHtcbiAgQ29uZmlnSW5pdGlhbGl6ZXIsXG4gIENPTkZJR19JTklUSUFMSVpFUl9GT1JST09UX0dVQVJELFxufSBmcm9tICcuL2NvbmZpZy1pbml0aWFsaXplcic7XG5cbi8qKlxuICogUHJvdmlkZXMgc3VwcG9ydCBmb3IgQ09ORklHX0lOSVRJQUxJWkVSU1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChDT05GSUdfSU5JVElBTElaRVJfRk9SUk9PVF9HVUFSRClcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZXJHdWFyZDogYW55LFxuICAgIEBJbmplY3QoUm9vdENvbmZpZykgcHJvdGVjdGVkIHJvb3RDb25maWc6IENvbmZpZ1xuICApIHt9XG5cbiAgcHJvdGVjdGVkIG9uZ29pbmdTY29wZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXSB8IHVuZGVmaW5lZD4oXG4gICAgdW5kZWZpbmVkXG4gICk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBjb25maWcgaXMgc3RhYmxlLCBpLmUuIGFsbCBDT05GSUdfSU5JVElBTElaRVJTIHJlc29sdmVkIGNvcnJlY3RseVxuICAgKi9cbiAgZ2V0IGlzU3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pbml0aWFsaXplckd1YXJkIHx8IHRoaXMub25nb2luZ1Njb3BlcyQudmFsdWU/Lmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNvbW1lbmRlZCB3YXkgdG8gZ2V0IGNvbmZpZyBmb3IgY29kZSB0aGF0IGNhbiBydW4gYmVmb3JlIGFwcCB3aWxsIGZpbmlzaFxuICAgKiBpbml0aWFsaXphdGlvbiAoQVBQX0lOSVRJQUxJWkVSUywgc2VsZWN0ZWQgc2VydmljZSBjb25zdHJ1Y3RvcnMpXG4gICAqXG4gICAqIFVzZWQgd2l0aG91dCBwYXJhbWV0ZXJzIHdhaXRzIGZvciB0aGUgd2hvbGUgY29uZmlnIHRvIGJlY29tZSBzdGFibGVcbiAgICpcbiAgICogUGFyYW1ldGVycyBhbGxvdyB0byBkZXNjcmliZSB3aGljaCBwYXJ0IG9mIHRoZSBjb25maWcgc2hvdWxkIGJlIHN0YWJsZSB1c2luZ1xuICAgKiBzdHJpbmcgZGVzY3JpYmluZyBjb25maWcgcGFydCwgZS5nLjpcbiAgICogJ3NpdGVDb250ZXh0JywgJ3NpdGVDb250ZXh0Lmxhbmd1YWdlJywgZXRjLlxuICAgKlxuICAgKiBAcGFyYW0gc2NvcGVzIFN0cmluZyBkZXNjcmliaW5nIHBhcnRzIG9mIHRoZSBjb25maWcgd2Ugd2FudCB0byBiZSBzdXJlIGFyZSBzdGFibGVcbiAgICovXG4gIGdldFN0YWJsZSguLi5zY29wZXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxDb25maWc+IHtcbiAgICBpZiAodGhpcy5pc1N0YWJsZSkge1xuICAgICAgcmV0dXJuIG9mKHRoaXMuY29uZmlnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub25nb2luZ1Njb3BlcyQucGlwZShcbiAgICAgIGZpbHRlcihcbiAgICAgICAgKG9uZ29pbmdTY29wZXMpID0+XG4gICAgICAgICAgISFvbmdvaW5nU2NvcGVzICYmIHRoaXMuYXJlUmVhZHkoc2NvcGVzLCBvbmdvaW5nU2NvcGVzKVxuICAgICAgKSxcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXBUbyh0aGlzLmNvbmZpZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgcHJvdmlkZWQgc2NvcGVzIGZyb20gY3VycmVudGx5IG9uZ29pbmdTY29wZXNcbiAgICpcbiAgICogQHBhcmFtIHNjb3Blc1xuICAgKi9cbiAgcHJvdGVjdGVkIGZpbmlzaFNjb3BlcyhzY29wZXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgbmV3U2NvcGVzID0gWy4uLih0aGlzLm9uZ29pbmdTY29wZXMkLnZhbHVlID8/IFtdKV07XG4gICAgZm9yIChjb25zdCBzY29wZSBvZiBzY29wZXMpIHtcbiAgICAgIG5ld1Njb3Blcy5zcGxpY2UobmV3U2NvcGVzLmluZGV4T2Yoc2NvcGUpLCAxKTtcbiAgICB9XG4gICAgdGhpcy5vbmdvaW5nU2NvcGVzJC5uZXh0KG5ld1Njb3Blcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRydWUgaWYgcHJvdmlkZWQgc2NvcGVzIGFyZSBub3QgcGFydCBvZiBvbmdvaW5nU2NvcGVzXG4gICAqXG4gICAqIEBwYXJhbSBzY29wZXNcbiAgICogQHBhcmFtIG9uZ29pbmdTY29wZXNcbiAgICovXG4gIHByb3RlY3RlZCBhcmVSZWFkeShzY29wZXM6IHN0cmluZ1tdLCBvbmdvaW5nU2NvcGVzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIGlmICghc2NvcGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICFvbmdvaW5nU2NvcGVzLmxlbmd0aDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBzY29wZSBvZiBzY29wZXMpIHtcbiAgICAgIGZvciAoY29uc3Qgb25nb2luZ1Njb3BlIG9mIG9uZ29pbmdTY29wZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGVzT3ZlcmxhcChzY29wZSwgb25nb2luZ1Njb3BlKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gc2NvcGVzIG92ZXJsYXAuXG4gICAqXG4gICAqIEV4YW1wbGUgb2Ygc2NvcGVzIHRoYXQgb3ZlcmxhcDpcbiAgICogJ3Rlc3QnIGFuZCAndGVzdCcsICd0ZXN0LmEnIGFuZCAndGVzdCcsICd0ZXN0JyBhbmQgJ3Rlc3QuYSdcbiAgICpcbiAgICogRXhhbXBsZSBvZiBzY29wZXMgdGhhdCBkbyBub3Qgb3ZlcmxhcDpcbiAgICogJ3Rlc3QnIGFuZCAndGVzdEEnLCAndGVzdC5hJyBhbmQgJ3Rlc3QuYicsICd0ZXN0Lm5lc3RlZCcgYW5kICd0ZXN0Lm5lc3QnXG4gICAqXG4gICAqIEBwYXJhbSBhIFNjb3BlQVxuICAgKiBAcGFyYW0gYiBTY29wZUJcbiAgICovXG4gIHByb3RlY3RlZCBzY29wZXNPdmVybGFwKGE6IHN0cmluZywgYjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKGIubGVuZ3RoID4gYS5sZW5ndGgpIHtcbiAgICAgIFthLCBiXSA9IFtiLCBhXTtcbiAgICB9XG4gICAgcmV0dXJuIGEuc3RhcnRzV2l0aChiKSAmJiAoYVtiLmxlbmd0aF0gfHwgJy4nKSA9PT0gJy4nO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKlxuICAgKiBOb3QgYSBwYXJ0IG9mIGEgcHVibGljIEFQSSwgdXNlZCBieSBBUFBfSU5JVElBTElaRVIgdG8gaW5pdGlhbGl6ZSBhbGwgcHJvdmlkZWQgQ09ORklHX0lOSVRJQUxJWkVSU1xuICAgKlxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZShpbml0aWFsaXplcnM/OiBDb25maWdJbml0aWFsaXplcltdKSB7XG4gICAgaWYgKHRoaXMub25nb2luZ1Njb3BlcyQudmFsdWUpIHtcbiAgICAgIC8vIGd1YXJkIGZvciBkb3VibGUgaW5pdGlhbGl6YXRpb25cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvbmdvaW5nU2NvcGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3QgYXN5bmNDb25maWdzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgaW5pdGlhbGl6ZXIgb2YgaW5pdGlhbGl6ZXJzIHx8IFtdKSB7XG4gICAgICBpZiAoIWluaXRpYWxpemVyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFpbml0aWFsaXplci5zY29wZXMgfHwgIWluaXRpYWxpemVyLnNjb3Blcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDT05GSUdfSU5JVElBTElaRVIgc2hvdWxkIHByb3ZpZGUgc2NvcGUhJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rldk1vZGUoKSAmJiAhdGhpcy5hcmVSZWFkeShpbml0aWFsaXplci5zY29wZXMsIG9uZ29pbmdTY29wZXMpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnTW9yZSB0aGFuIG9uZSBDT05GSUdfSU5JVElBTElaRVIgaXMgaW5pdGlhbGl6aW5nIHRoZSBzYW1lIGNvbmZpZyBzY29wZS4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIG9uZ29pbmdTY29wZXMucHVzaCguLi5pbml0aWFsaXplci5zY29wZXMpO1xuXG4gICAgICBhc3luY0NvbmZpZ3MucHVzaChcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpbml0aWFsaXplckNvbmZpZyA9IGF3YWl0IGluaXRpYWxpemVyLmNvbmZpZ0ZhY3RvcnkoKTtcbiAgICAgICAgICAvLyBjb250cmlidXRlIGNvbmZpZ3VyYXRpb24gdG8gcm9vdENvbmZpZ1xuICAgICAgICAgIGRlZXBNZXJnZShcbiAgICAgICAgICAgIHRoaXMucm9vdENvbmZpZyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICAgICAgICAgIGluaXRpYWxpemVyQ29uZmlnXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBjb250cmlidXRlIGNvbmZpZ3VyYXRpb24gdG8gZ2xvYmFsIGNvbmZpZ1xuICAgICAgICAgIGRlZXBNZXJnZSh0aGlzLmNvbmZpZyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgaW5pdGlhbGl6ZXJDb25maWcpO1xuICAgICAgICAgIHRoaXMuZmluaXNoU2NvcGVzKGluaXRpYWxpemVyLnNjb3Blcyk7XG4gICAgICAgIH0pKClcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMub25nb2luZ1Njb3BlcyQubmV4dChvbmdvaW5nU2NvcGVzKTtcblxuICAgIGlmIChhc3luY0NvbmZpZ3MubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChhc3luY0NvbmZpZ3MpO1xuICAgIH1cbiAgfVxufVxuIl19