import { ApplicationRef, Injectable, } from '@angular/core';
import { Scroll } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./config";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
export class OnNavigateService {
    constructor(config, router, viewportScroller, injector) {
        this.config = config;
        this.router = router;
        this.viewportScroller = viewportScroller;
        this.injector = injector;
    }
    get hostComponent() {
        return this.injector.get(ApplicationRef)?.components?.[0];
    }
    /**
     * Reads configuration and enables features based on flags set.
     */
    initializeWithConfig() {
        if (this.config?.enableResetViewOnNavigate?.active) {
            this.setResetViewOnNavigate(this.config.enableResetViewOnNavigate.active);
        }
    }
    /**
     * Resets view back to the original position when performing a back navigation and to the top when performing a front navigation
     * and sets the focus back to the top of the page before skiplinks for any type of navigation
     * @param enable Enable or disable this feature
     */
    setResetViewOnNavigate(enable) {
        this.subscription?.unsubscribe();
        if (enable) {
            this.subscription = this.router.events
                .pipe(filter((event) => event instanceof Scroll), pairwise())
                .subscribe((event) => {
                const previousRoute = event[0];
                const currentRoute = event[1];
                const position = currentRoute.position;
                if (position) {
                    // allow the pages to be repainted before scrolling to proper position
                    setTimeout(() => this.viewportScroller.scrollToPosition(position));
                }
                else {
                    if (this.config.enableResetViewOnNavigate?.ignoreQueryString &&
                        this.isPathEqual(previousRoute, currentRoute)) {
                        return;
                    }
                    if (this.isChildRoute(currentRoute)) {
                        return;
                    }
                    setTimeout(() => this.viewportScroller.scrollToPosition([0, 0]), 100);
                }
                this.hostComponent?.location?.nativeElement.focus();
            });
        }
    }
    /**
     * Verifies if the current route is a child route from the given ignore config route
     *
     * @param route
     * @returns boolean whether the route is a child route
     */
    isChildRoute(route) {
        return (this.config.enableResetViewOnNavigate?.ignoreRoutes?.some((configRoute) => route.routerEvent.urlAfterRedirects.split('/').includes(configRoute)) ?? false);
    }
    /**
     * Verifies if the previous and current route are the same without the query string
     *
     * @param previousRoute
     * @param currentRoute
     * @returns boolean depending on the previous and current route are equal without the query strings
     */
    isPathEqual(previousRoute, currentRoute) {
        return (previousRoute.routerEvent.urlAfterRedirects.split('?')[0] ===
            currentRoute.routerEvent.urlAfterRedirects.split('?')[0]);
    }
}
OnNavigateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OnNavigateService, deps: [{ token: i1.OnNavigateConfig }, { token: i2.Router }, { token: i3.ViewportScroller }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
OnNavigateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OnNavigateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OnNavigateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OnNavigateConfig }, { type: i2.Router }, { type: i3.ViewportScroller }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tbmF2aWdhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvcm91dGVyL29uLW5hdmlnYXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUNMLGNBQWMsRUFFZCxVQUFVLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFVLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBTWxELE1BQU0sT0FBTyxpQkFBaUI7SUFPNUIsWUFDWSxNQUF3QixFQUN4QixNQUFjLEVBQ2QsZ0JBQWtDLEVBQ2xDLFFBQWtCO1FBSGxCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0IsQ0FBQztJQVRKLElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQVNEOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUU7WUFDbEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUFzQixDQUFDLE1BQWU7UUFDcEMsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUVqQyxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2lCQUNuQyxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFtQixFQUFFLENBQUMsS0FBSyxZQUFZLE1BQU0sQ0FBQyxFQUMzRCxRQUFRLEVBQUUsQ0FDWDtpQkFDQSxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDbkIsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxFQUFFO29CQUNaLHNFQUFzRTtvQkFDdEUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUNwRTtxQkFBTTtvQkFDTCxJQUNFLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsaUJBQWlCO3dCQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsRUFDN0M7d0JBQ0EsT0FBTztxQkFDUjtvQkFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ25DLE9BQU87cUJBQ1I7b0JBRUQsVUFBVSxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUNwRCxHQUFHLENBQ0osQ0FBQztpQkFDSDtnQkFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFlBQVksQ0FBQyxLQUFhO1FBQ2hDLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUN4RSxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQ3JFLElBQUksS0FBSyxDQUNYLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssV0FBVyxDQUFDLGFBQXFCLEVBQUUsWUFBb0I7UUFDN0QsT0FBTyxDQUNMLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxZQUFZLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDekQsQ0FBQztJQUNKLENBQUM7OzhHQTlGVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBWaWV3cG9ydFNjcm9sbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgU2Nyb2xsIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBwYWlyd2lzZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9uTmF2aWdhdGVDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbk5hdmlnYXRlU2VydmljZSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBnZXQgaG9zdENvbXBvbmVudCgpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKT8uY29tcG9uZW50cz8uWzBdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogT25OYXZpZ2F0ZUNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIHZpZXdwb3J0U2Nyb2xsZXI6IFZpZXdwb3J0U2Nyb2xsZXIsXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlYWRzIGNvbmZpZ3VyYXRpb24gYW5kIGVuYWJsZXMgZmVhdHVyZXMgYmFzZWQgb24gZmxhZ3Mgc2V0LlxuICAgKi9cbiAgaW5pdGlhbGl6ZVdpdGhDb25maWcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlnPy5lbmFibGVSZXNldFZpZXdPbk5hdmlnYXRlPy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc2V0UmVzZXRWaWV3T25OYXZpZ2F0ZSh0aGlzLmNvbmZpZy5lbmFibGVSZXNldFZpZXdPbk5hdmlnYXRlLmFjdGl2ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB2aWV3IGJhY2sgdG8gdGhlIG9yaWdpbmFsIHBvc2l0aW9uIHdoZW4gcGVyZm9ybWluZyBhIGJhY2sgbmF2aWdhdGlvbiBhbmQgdG8gdGhlIHRvcCB3aGVuIHBlcmZvcm1pbmcgYSBmcm9udCBuYXZpZ2F0aW9uXG4gICAqIGFuZCBzZXRzIHRoZSBmb2N1cyBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgYmVmb3JlIHNraXBsaW5rcyBmb3IgYW55IHR5cGUgb2YgbmF2aWdhdGlvblxuICAgKiBAcGFyYW0gZW5hYmxlIEVuYWJsZSBvciBkaXNhYmxlIHRoaXMgZmVhdHVyZVxuICAgKi9cbiAgc2V0UmVzZXRWaWV3T25OYXZpZ2F0ZShlbmFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcblxuICAgIGlmIChlbmFibGUpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZXZlbnQpOiBldmVudCBpcyBTY3JvbGwgPT4gZXZlbnQgaW5zdGFuY2VvZiBTY3JvbGwpLFxuICAgICAgICAgIHBhaXJ3aXNlKClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByZXZpb3VzUm91dGUgPSBldmVudFswXTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50Um91dGUgPSBldmVudFsxXTtcblxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gY3VycmVudFJvdXRlLnBvc2l0aW9uO1xuICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgLy8gYWxsb3cgdGhlIHBhZ2VzIHRvIGJlIHJlcGFpbnRlZCBiZWZvcmUgc2Nyb2xsaW5nIHRvIHByb3BlciBwb3NpdGlvblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnZpZXdwb3J0U2Nyb2xsZXIuc2Nyb2xsVG9Qb3NpdGlvbihwb3NpdGlvbikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnLmVuYWJsZVJlc2V0Vmlld09uTmF2aWdhdGU/Lmlnbm9yZVF1ZXJ5U3RyaW5nICYmXG4gICAgICAgICAgICAgIHRoaXMuaXNQYXRoRXF1YWwocHJldmlvdXNSb3V0ZSwgY3VycmVudFJvdXRlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDaGlsZFJvdXRlKGN1cnJlbnRSb3V0ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAoKSA9PiB0aGlzLnZpZXdwb3J0U2Nyb2xsZXIuc2Nyb2xsVG9Qb3NpdGlvbihbMCwgMF0pLFxuICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5ob3N0Q29tcG9uZW50Py5sb2NhdGlvbj8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIGN1cnJlbnQgcm91dGUgaXMgYSBjaGlsZCByb3V0ZSBmcm9tIHRoZSBnaXZlbiBpZ25vcmUgY29uZmlnIHJvdXRlXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZVxuICAgKiBAcmV0dXJucyBib29sZWFuIHdoZXRoZXIgdGhlIHJvdXRlIGlzIGEgY2hpbGQgcm91dGVcbiAgICovXG4gIHByaXZhdGUgaXNDaGlsZFJvdXRlKHJvdXRlOiBTY3JvbGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jb25maWcuZW5hYmxlUmVzZXRWaWV3T25OYXZpZ2F0ZT8uaWdub3JlUm91dGVzPy5zb21lKChjb25maWdSb3V0ZSkgPT5cbiAgICAgICAgcm91dGUucm91dGVyRXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMuc3BsaXQoJy8nKS5pbmNsdWRlcyhjb25maWdSb3V0ZSlcbiAgICAgICkgPz8gZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCByb3V0ZSBhcmUgdGhlIHNhbWUgd2l0aG91dCB0aGUgcXVlcnkgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSBwcmV2aW91c1JvdXRlXG4gICAqIEBwYXJhbSBjdXJyZW50Um91dGVcbiAgICogQHJldHVybnMgYm9vbGVhbiBkZXBlbmRpbmcgb24gdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50IHJvdXRlIGFyZSBlcXVhbCB3aXRob3V0IHRoZSBxdWVyeSBzdHJpbmdzXG4gICAqL1xuICBwcml2YXRlIGlzUGF0aEVxdWFsKHByZXZpb3VzUm91dGU6IFNjcm9sbCwgY3VycmVudFJvdXRlOiBTY3JvbGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgcHJldmlvdXNSb3V0ZS5yb3V0ZXJFdmVudC51cmxBZnRlclJlZGlyZWN0cy5zcGxpdCgnPycpWzBdID09PVxuICAgICAgY3VycmVudFJvdXRlLnJvdXRlckV2ZW50LnVybEFmdGVyUmVkaXJlY3RzLnNwbGl0KCc/JylbMF1cbiAgICApO1xuICB9XG59XG4iXX0=