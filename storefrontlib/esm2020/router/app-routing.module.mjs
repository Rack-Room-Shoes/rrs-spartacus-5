/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOnNavigateConfig } from './config/default-on-navigate-config';
import { OnNavigateService } from './on-navigate.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class AppRoutingModule {
}
AppRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AppRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AppRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AppRoutingModule, imports: [i1.RouterModule] });
AppRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AppRoutingModule, providers: [
        provideDefaultConfig(defaultOnNavigateConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: onNavigateFactory,
            deps: [OnNavigateService],
            multi: true,
        },
    ], imports: [RouterModule.forRoot([], {
            anchorScrolling: 'enabled',
            relativeLinkResolution: 'corrected',
            initialNavigation: 'enabledBlocking',
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AppRoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forRoot([], {
                            anchorScrolling: 'enabled',
                            relativeLinkResolution: 'corrected',
                            initialNavigation: 'enabledBlocking',
                        }),
                    ],
                    providers: [
                        provideDefaultConfig(defaultOnNavigateConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: onNavigateFactory,
                            deps: [OnNavigateService],
                            multi: true,
                        },
                    ],
                }]
        }] });
export function onNavigateFactory(onNavigateService) {
    const isReady = () => onNavigateService.initializeWithConfig();
    return isReady;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9yb3V0ZXIvYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQW9CMUQsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsYUFWaEI7UUFDVCxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQztRQUM3QztZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxpQkFBaUI7WUFDN0IsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDekIsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBZEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDdkIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsc0JBQXNCLEVBQUUsV0FBVztZQUNuQyxpQkFBaUIsRUFBRSxpQkFBaUI7U0FDckMsQ0FBQzsyRkFZTyxnQkFBZ0I7a0JBbEI1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTs0QkFDdkIsZUFBZSxFQUFFLFNBQVM7NEJBQzFCLHNCQUFzQixFQUFFLFdBQVc7NEJBQ25DLGlCQUFpQixFQUFFLGlCQUFpQjt5QkFDckMsQ0FBQztxQkFDSDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsdUJBQXVCLENBQUM7d0JBQzdDOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixVQUFVLEVBQUUsaUJBQWlCOzRCQUM3QixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs0QkFDekIsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7O0FBR0QsTUFBTSxVQUFVLGlCQUFpQixDQUFDLGlCQUFvQztJQUNwRSxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQy9ELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmYXVsdE9uTmF2aWdhdGVDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LW9uLW5hdmlnYXRlLWNvbmZpZyc7XG5pbXBvcnQgeyBPbk5hdmlnYXRlU2VydmljZSB9IGZyb20gJy4vb24tbmF2aWdhdGUuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yUm9vdChbXSwge1xuICAgICAgYW5jaG9yU2Nyb2xsaW5nOiAnZW5hYmxlZCcsXG4gICAgICByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uOiAnY29ycmVjdGVkJyxcbiAgICAgIGluaXRpYWxOYXZpZ2F0aW9uOiAnZW5hYmxlZEJsb2NraW5nJyxcbiAgICB9KSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9uTmF2aWdhdGVDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IG9uTmF2aWdhdGVGYWN0b3J5LFxuICAgICAgZGVwczogW09uTmF2aWdhdGVTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge31cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVGYWN0b3J5KG9uTmF2aWdhdGVTZXJ2aWNlOiBPbk5hdmlnYXRlU2VydmljZSkge1xuICBjb25zdCBpc1JlYWR5ID0gKCkgPT4gb25OYXZpZ2F0ZVNlcnZpY2UuaW5pdGlhbGl6ZVdpdGhDb25maWcoKTtcbiAgcmV0dXJuIGlzUmVhZHk7XG59XG4iXX0=