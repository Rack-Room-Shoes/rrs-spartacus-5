/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { BaseSiteService } from '../facade/base-site.service';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';
export function initializeContext(configInit, siteContextRoutesHandler) {
    return () => {
        return configInit
            .getStable('context')
            .pipe(tap(() => {
            // `siteContextRoutesHandler.init()` should be executed before CurrencyInitializer,
            // LanguageInitializer and BaseSiteInitializer
            // (now it's the case, thanks to the order of providers for APP_INITIALIZER).
            //
            // TODO(#12351): move it to the logic of specific context initializers
            siteContextRoutesHandler.init();
        }))
            .toPromise();
    };
}
export const contextServiceProviders = [
    BaseSiteService,
    LanguageService,
    CurrencyService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeContext,
        deps: [ConfigInitializerService, SiteContextRoutesHandler],
        multi: true,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1zZXJ2aWNlLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3NpdGUtY29udGV4dC9wcm92aWRlcnMvY29udGV4dC1zZXJ2aWNlLXByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGVBQWUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFbkYsTUFBTSxVQUFVLGlCQUFpQixDQUMvQixVQUFvQyxFQUNwQyx3QkFBa0Q7SUFFbEQsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLFVBQVU7YUFDZCxTQUFTLENBQUMsU0FBUyxDQUFDO2FBQ3BCLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsbUZBQW1GO1lBQ25GLDhDQUE4QztZQUM5Qyw2RUFBNkU7WUFDN0UsRUFBRTtZQUNGLHNFQUFzRTtZQUN0RSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBZTtJQUNqRCxlQUFlO0lBQ2YsZUFBZTtJQUNmLGVBQWU7SUFDZjtRQUNFLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsSUFBSSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLENBQUM7UUFDMUQsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWdJbml0aWFsaXplclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLWluaXRpYWxpemVyL2NvbmZpZy1pbml0aWFsaXplci5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VTaXRlU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9iYXNlLXNpdGUuc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW5jeVNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvY3VycmVuY3kuc2VydmljZSc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvbGFuZ3VhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dFJvdXRlc0hhbmRsZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaXRlLWNvbnRleHQtcm91dGVzLWhhbmRsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbnRleHQoXG4gIGNvbmZpZ0luaXQ6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgc2l0ZUNvbnRleHRSb3V0ZXNIYW5kbGVyOiBTaXRlQ29udGV4dFJvdXRlc0hhbmRsZXJcbikge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHJldHVybiBjb25maWdJbml0XG4gICAgICAuZ2V0U3RhYmxlKCdjb250ZXh0JylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIC8vIGBzaXRlQ29udGV4dFJvdXRlc0hhbmRsZXIuaW5pdCgpYCBzaG91bGQgYmUgZXhlY3V0ZWQgYmVmb3JlIEN1cnJlbmN5SW5pdGlhbGl6ZXIsXG4gICAgICAgICAgLy8gTGFuZ3VhZ2VJbml0aWFsaXplciBhbmQgQmFzZVNpdGVJbml0aWFsaXplclxuICAgICAgICAgIC8vIChub3cgaXQncyB0aGUgY2FzZSwgdGhhbmtzIHRvIHRoZSBvcmRlciBvZiBwcm92aWRlcnMgZm9yIEFQUF9JTklUSUFMSVpFUikuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBUT0RPKCMxMjM1MSk6IG1vdmUgaXQgdG8gdGhlIGxvZ2ljIG9mIHNwZWNpZmljIGNvbnRleHQgaW5pdGlhbGl6ZXJzXG4gICAgICAgICAgc2l0ZUNvbnRleHRSb3V0ZXNIYW5kbGVyLmluaXQoKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC50b1Byb21pc2UoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbnRleHRTZXJ2aWNlUHJvdmlkZXJzOiBQcm92aWRlcltdID0gW1xuICBCYXNlU2l0ZVNlcnZpY2UsXG4gIExhbmd1YWdlU2VydmljZSxcbiAgQ3VycmVuY3lTZXJ2aWNlLFxuICB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IGluaXRpYWxpemVDb250ZXh0LFxuICAgIGRlcHM6IFtDb25maWdJbml0aWFsaXplclNlcnZpY2UsIFNpdGVDb250ZXh0Um91dGVzSGFuZGxlcl0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG5dO1xuIl19