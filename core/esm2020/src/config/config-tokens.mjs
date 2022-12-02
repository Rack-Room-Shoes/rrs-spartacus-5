/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable, InjectFlags, InjectionToken } from '@angular/core';
import { deepMerge } from './utils/deep-merge';
import * as i0 from "@angular/core";
export function configFactory() {
    return deepMerge({}, inject(DefaultConfig), inject(RootConfig));
}
/**
 * Global Configuration, can be used to inject configuration to any part of the app
 */
export class Config {
}
Config.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: Config, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
Config.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: Config, providedIn: 'root', useFactory: configFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: Config, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: configFactory,
                }]
        }] });
export function defaultConfigFactory() {
    return deepMerge({}, ...(inject(DefaultConfigChunk, InjectFlags.Optional) ?? []));
}
/**
 * Default Configuration token, used to build Global Configuration, built from DefaultConfigChunks
 */
export const DefaultConfig = new InjectionToken('DefaultConfiguration', {
    providedIn: 'root',
    factory: defaultConfigFactory,
});
export function rootConfigFactory() {
    return deepMerge({}, ...(inject(ConfigChunk, InjectFlags.Optional) ?? []));
}
/**
 * Root Configuration token, used to build Global Configuration, built from ConfigChunks
 */
export const RootConfig = new InjectionToken('RootConfiguration', {
    providedIn: 'root',
    factory: rootConfigFactory,
});
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideConfig` or import `ConfigModule.withConfig` instead.
 */
export const ConfigChunk = new InjectionToken('ConfigurationChunk');
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultConfig` or `provideDefaultConfigFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultConfigChunk = new InjectionToken('DefaultConfigurationChunk');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2NvbmZpZy9jb25maWctdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFL0MsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxTQUFTLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQ7O0dBRUc7QUFLSCxNQUFNLE9BQWdCLE1BQU07O21HQUFOLE1BQU07dUdBQU4sTUFBTSxjQUhkLE1BQU0sY0FDTixhQUFhOzJGQUVMLE1BQU07a0JBSjNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxhQUFhO2lCQUMxQjs7QUFHRCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE9BQU8sU0FBUyxDQUNkLEVBQUUsRUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FDNUQsQ0FBQztBQUNKLENBQUM7QUFDRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRTtJQUN0RSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxpQkFBaUI7SUFDL0IsT0FBTyxTQUFTLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRTtJQUNoRSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsaUJBQWlCO0NBQzNCLENBQUMsQ0FBQztBQUVIOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlFOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQ2xELDJCQUEyQixDQUM1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RGbGFncywgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJy4vdXRpbHMvZGVlcC1tZXJnZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGYWN0b3J5KCkge1xuICByZXR1cm4gZGVlcE1lcmdlKHt9LCBpbmplY3QoRGVmYXVsdENvbmZpZyksIGluamVjdChSb290Q29uZmlnKSk7XG59XG5cbi8qKlxuICogR2xvYmFsIENvbmZpZ3VyYXRpb24sIGNhbiBiZSB1c2VkIHRvIGluamVjdCBjb25maWd1cmF0aW9uIHRvIGFueSBwYXJ0IG9mIHRoZSBhcHBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6IGNvbmZpZ0ZhY3RvcnksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbmZpZyB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENvbmZpZ0ZhY3RvcnkoKSB7XG4gIHJldHVybiBkZWVwTWVyZ2UoXG4gICAge30sXG4gICAgLi4uKGluamVjdChEZWZhdWx0Q29uZmlnQ2h1bmssIEluamVjdEZsYWdzLk9wdGlvbmFsKSA/PyBbXSlcbiAgKTtcbn1cbi8qKlxuICogRGVmYXVsdCBDb25maWd1cmF0aW9uIHRva2VuLCB1c2VkIHRvIGJ1aWxkIEdsb2JhbCBDb25maWd1cmF0aW9uLCBidWlsdCBmcm9tIERlZmF1bHRDb25maWdDaHVua3NcbiAqL1xuZXhwb3J0IGNvbnN0IERlZmF1bHRDb25maWcgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0RlZmF1bHRDb25maWd1cmF0aW9uJywge1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIGZhY3Rvcnk6IGRlZmF1bHRDb25maWdGYWN0b3J5LFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiByb290Q29uZmlnRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGRlZXBNZXJnZSh7fSwgLi4uKGluamVjdChDb25maWdDaHVuaywgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpID8/IFtdKSk7XG59XG5cbi8qKlxuICogUm9vdCBDb25maWd1cmF0aW9uIHRva2VuLCB1c2VkIHRvIGJ1aWxkIEdsb2JhbCBDb25maWd1cmF0aW9uLCBidWlsdCBmcm9tIENvbmZpZ0NodW5rc1xuICovXG5leHBvcnQgY29uc3QgUm9vdENvbmZpZyA9IG5ldyBJbmplY3Rpb25Ub2tlbignUm9vdENvbmZpZ3VyYXRpb24nLCB7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgZmFjdG9yeTogcm9vdENvbmZpZ0ZhY3RvcnksXG59KTtcblxuLyoqXG4gKiBDb25maWcgY2h1bmsgdG9rZW4sIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBjaHVuayBhbmQgY29udHJpYnV0ZSB0byB0aGUgZ2xvYmFsIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICogU2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5LCB1c2UgYHByb3ZpZGVDb25maWdgIG9yIGltcG9ydCBgQ29uZmlnTW9kdWxlLndpdGhDb25maWdgIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjb25zdCBDb25maWdDaHVuayA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWdbXT4oJ0NvbmZpZ3VyYXRpb25DaHVuaycpO1xuLyoqXG4gKiBDb25maWcgY2h1bmsgdG9rZW4sIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBjaHVuayBhbmQgY29udHJpYnV0ZSB0byB0aGUgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICogU2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5LCB1c2UgYHByb3ZpZGVEZWZhdWx0Q29uZmlnYCBvciBgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5YCBpbnN0ZWFkLlxuICpcbiAqIEdlbmVyYWwgcnVsZSBpcywgdGhhdCBhbGwgY29uZmlnIHByb3ZpZGVkIGluIGxpYnJhcmllcyBzaG91bGQgYmUgcHJvdmlkZWQgYXMgZGVmYXVsdCBjb25maWcuXG4gKi9cbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29uZmlnQ2h1bmsgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29uZmlnW10+KFxuICAnRGVmYXVsdENvbmZpZ3VyYXRpb25DaHVuaydcbik7XG4iXX0=