/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule, } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ConfigurableRoutesService } from './configurable-routes/configurable-routes.service';
import { effects } from './store/effects/index';
import { CustomSerializer, reducerProvider, reducerToken, } from './store/reducers/router.reducer';
import { ROUTING_FEATURE } from './store/routing-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
import * as i3 from "@ngrx/router-store";
export function initConfigurableRoutes(service) {
    const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
    return result;
}
export class RoutingModule {
    static forRoot() {
        return {
            ngModule: RoutingModule,
            providers: [
                reducerProvider,
                {
                    provide: RouterStateSerializer,
                    useClass: CustomSerializer,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: initConfigurableRoutes,
                    deps: [ConfigurableRoutesService],
                    multi: true,
                },
            ],
        };
    }
}
RoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RoutingModule, imports: [i1.StoreFeatureModule, i2.EffectsFeatureModule, i3.StoreRouterConnectingModule] });
RoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RoutingModule, imports: [StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
        EffectsModule.forFeature(effects),
        StoreRouterConnectingModule.forRoot({
            routerState: 1 /* RouterState.Minimal */,
            stateKey: ROUTING_FEATURE, // name of reducer key
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RoutingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
                        EffectsModule.forFeature(effects),
                        StoreRouterConnectingModule.forRoot({
                            routerState: 1 /* RouterState.Minimal */,
                            stateKey: ROUTING_FEATURE, // name of reducer key
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9yb3V0aW5nL3JvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLDJCQUEyQixHQUM1QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFlBQVksR0FDYixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFFeEQsTUFBTSxVQUFVLHNCQUFzQixDQUNwQyxPQUFrQztJQUVsQyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyw0RUFBNEU7SUFDakgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVlELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmO29CQUNFLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsc0JBQXNCO29CQUNsQyxJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDakMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzswR0FsQlUsYUFBYTsyR0FBYixhQUFhOzJHQUFiLGFBQWEsWUFSdEIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDO1FBQ3JELGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2pDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQztZQUNsQyxXQUFXLDZCQUFxQjtZQUNoQyxRQUFRLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjtTQUNsRCxDQUFDOzJGQUdPLGFBQWE7a0JBVnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFdBQVcsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQzt3QkFDckQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7d0JBQ2pDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQzs0QkFDbEMsV0FBVyw2QkFBcUI7NEJBQ2hDLFFBQVEsRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3lCQUNsRCxDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHtcbiAgUm91dGVyU3RhdGUsXG4gIFJvdXRlclN0YXRlU2VyaWFsaXplcixcbiAgU3RvcmVSb3V0ZXJDb25uZWN0aW5nTW9kdWxlLFxufSBmcm9tICdAbmdyeC9yb3V0ZXItc3RvcmUnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFibGVSb3V0ZXNTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmFibGUtcm91dGVzL2NvbmZpZ3VyYWJsZS1yb3V0ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBlZmZlY3RzIH0gZnJvbSAnLi9zdG9yZS9lZmZlY3RzL2luZGV4JztcbmltcG9ydCB7XG4gIEN1c3RvbVNlcmlhbGl6ZXIsXG4gIHJlZHVjZXJQcm92aWRlcixcbiAgcmVkdWNlclRva2VuLFxufSBmcm9tICcuL3N0b3JlL3JlZHVjZXJzL3JvdXRlci5yZWR1Y2VyJztcbmltcG9ydCB7IFJPVVRJTkdfRkVBVFVSRSB9IGZyb20gJy4vc3RvcmUvcm91dGluZy1zdGF0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29uZmlndXJhYmxlUm91dGVzKFxuICBzZXJ2aWNlOiBDb25maWd1cmFibGVSb3V0ZXNTZXJ2aWNlXG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgcmVzdWx0ID0gKCkgPT4gc2VydmljZS5pbml0KCk7IC8vIHdvcmthcm91bmQgZm9yIEFPVCBjb21waWxhdGlvbiAoc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81MTk3NzExNSlcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoUk9VVElOR19GRUFUVVJFLCByZWR1Y2VyVG9rZW4pLFxuICAgIEVmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZShlZmZlY3RzKSxcbiAgICBTdG9yZVJvdXRlckNvbm5lY3RpbmdNb2R1bGUuZm9yUm9vdCh7XG4gICAgICByb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGUuTWluaW1hbCxcbiAgICAgIHN0YXRlS2V5OiBST1VUSU5HX0ZFQVRVUkUsIC8vIG5hbWUgb2YgcmVkdWNlciBrZXlcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUm91dGluZ01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Um91dGluZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUm91dGluZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICByZWR1Y2VyUHJvdmlkZXIsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSb3V0ZXJTdGF0ZVNlcmlhbGl6ZXIsXG4gICAgICAgICAgdXNlQ2xhc3M6IEN1c3RvbVNlcmlhbGl6ZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogaW5pdENvbmZpZ3VyYWJsZVJvdXRlcyxcbiAgICAgICAgICBkZXBzOiBbQ29uZmlndXJhYmxlUm91dGVzU2VydmljZV0sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==