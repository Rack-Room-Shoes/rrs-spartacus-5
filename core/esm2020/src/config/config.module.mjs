/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideConfig, provideConfigFactory } from './config-providers';
import * as i0 from "@angular/core";
import * as i1 from "./services/configuration.service";
export class ConfigModule {
    // To make sure ConfigurationService will be instantiated, we inject it into
    // module constructor
    constructor(_configurationService) {
        // Intentional empty constructor
    }
    /**
     * Import ConfigModule and contribute config to the global configuration
     *
     * To provide default configuration in libraries provideDefaultConfig should be used instead.
     *
     * @param config Config object to merge with the global configuration
     */
    static withConfig(config) {
        return {
            ngModule: ConfigModule,
            // eslint-disable-next-line @spartacus-eslint/use-default-provide-config
            providers: [provideConfig(config)],
        };
    }
    /**
     * Import ConfigModule and contribute config to the global configuration using factory function
     *
     * To provide default configuration in libraries provideDefaultConfigFactory should be used instead.
     *
     * @param configFactory Factory function that will generate configuration
     * @param deps Optional dependencies to factory function
     */
    static withConfigFactory(configFactory, deps) {
        return {
            ngModule: ConfigModule,
            providers: [provideConfigFactory(configFactory, deps)],
        };
    }
    /**
     * Module with providers, should be imported only once, if possible, at the root of the app.
     *
     * @param config
     */
    static forRoot(config = {}) {
        return {
            ngModule: ConfigModule,
            // eslint-disable-next-line @spartacus-eslint/use-default-provide-config
            providers: [provideConfig(config)],
        };
    }
}
ConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigModule, deps: [{ token: i1.ConfigurationService }], target: i0.ɵɵFactoryTarget.NgModule });
ConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfigModule });
ConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.ConfigurationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2NvbmZpZy9jb25maWcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUt6RSxNQUFNLE9BQU8sWUFBWTtJQUN2Qiw0RUFBNEU7SUFDNUUscUJBQXFCO0lBQ3JCLFlBQVkscUJBQTJDO1FBQ3JELGdDQUFnQztJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFjO1FBQzlCLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0Qix3RUFBd0U7WUFDeEUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FDdEIsYUFBNEIsRUFDNUIsSUFBWTtRQUVaLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQixFQUFFO1FBQ2hDLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0Qix3RUFBd0U7WUFDeEUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDOzt5R0FuRFUsWUFBWTswR0FBWixZQUFZOzBHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFEeEIsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tICcuL2NvbmZpZy1mYWN0b3J5JztcbmltcG9ydCB7IHByb3ZpZGVDb25maWcsIHByb3ZpZGVDb25maWdGYWN0b3J5IH0gZnJvbSAnLi9jb25maWctcHJvdmlkZXJzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnLXRva2Vucyc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ01vZHVsZSB7XG4gIC8vIFRvIG1ha2Ugc3VyZSBDb25maWd1cmF0aW9uU2VydmljZSB3aWxsIGJlIGluc3RhbnRpYXRlZCwgd2UgaW5qZWN0IGl0IGludG9cbiAgLy8gbW9kdWxlIGNvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKF9jb25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBDb25maWdNb2R1bGUgYW5kIGNvbnRyaWJ1dGUgY29uZmlnIHRvIHRoZSBnbG9iYWwgY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBUbyBwcm92aWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBpbiBsaWJyYXJpZXMgcHJvdmlkZURlZmF1bHRDb25maWcgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgb2JqZWN0IHRvIG1lcmdlIHdpdGggdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBzdGF0aWMgd2l0aENvbmZpZyhjb25maWc6IENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maWdNb2R1bGUsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHNwYXJ0YWN1cy1lc2xpbnQvdXNlLWRlZmF1bHQtcHJvdmlkZS1jb25maWdcbiAgICAgIHByb3ZpZGVyczogW3Byb3ZpZGVDb25maWcoY29uZmlnKV0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBvcnQgQ29uZmlnTW9kdWxlIGFuZCBjb250cmlidXRlIGNvbmZpZyB0byB0aGUgZ2xvYmFsIGNvbmZpZ3VyYXRpb24gdXNpbmcgZmFjdG9yeSBmdW5jdGlvblxuICAgKlxuICAgKiBUbyBwcm92aWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBpbiBsaWJyYXJpZXMgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWdGYWN0b3J5IEZhY3RvcnkgZnVuY3Rpb24gdGhhdCB3aWxsIGdlbmVyYXRlIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIGRlcHMgT3B0aW9uYWwgZGVwZW5kZW5jaWVzIHRvIGZhY3RvcnkgZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyB3aXRoQ29uZmlnRmFjdG9yeShcbiAgICBjb25maWdGYWN0b3J5OiBDb25maWdGYWN0b3J5LFxuICAgIGRlcHM/OiBhbnlbXVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29uZmlnTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNvbmZpZ0ZhY3RvcnkoY29uZmlnRmFjdG9yeSwgZGVwcyldLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogTW9kdWxlIHdpdGggcHJvdmlkZXJzLCBzaG91bGQgYmUgaW1wb3J0ZWQgb25seSBvbmNlLCBpZiBwb3NzaWJsZSwgYXQgdGhlIHJvb3Qgb2YgdGhlIGFwcC5cbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maWdNb2R1bGUsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHNwYXJ0YWN1cy1lc2xpbnQvdXNlLWRlZmF1bHQtcHJvdmlkZS1jb25maWdcbiAgICAgIHByb3ZpZGVyczogW3Byb3ZpZGVDb25maWcoY29uZmlnKV0sXG4gICAgfTtcbiAgfVxufVxuIl19