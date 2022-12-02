/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { getContextParameterDefault, getContextParameterValues, } from '../config/context-config-utils';
import * as i0 from "@angular/core";
import * as i1 from "../config/site-context-config";
import * as i2 from "../providers/context-service-map";
export class SiteContextParamsService {
    constructor(config, injector, serviceMap) {
        this.config = config;
        this.injector = injector;
        this.serviceMap = serviceMap;
    }
    getContextParameters() {
        if (this.config.context) {
            return Object.keys(this.config.context).filter((param) => param !== 'urlParameters');
        }
        return [];
    }
    getUrlEncodingParameters() {
        return (this.config.context && this.config.context.urlParameters) || [];
    }
    getParamValues(param) {
        return getContextParameterValues(this.config, param);
    }
    getParamDefaultValue(param) {
        return getContextParameterDefault(this.config, param);
    }
    getSiteContextService(param) {
        if (this.serviceMap[param]) {
            try {
                return this.injector.get(this.serviceMap[param]);
            }
            catch {
                if (isDevMode()) {
                    console.warn(`Couldn't find site context service for '${param}'.`);
                }
                return undefined;
            }
        }
    }
    getValue(param) {
        let value;
        const service = this.getSiteContextService(param);
        if (service) {
            service
                .getActive()
                .subscribe((val) => (value = val))
                .unsubscribe();
        }
        return value !== undefined ? value : this.getParamDefaultValue(param);
    }
    setValue(param, value) {
        const service = this.getSiteContextService(param);
        if (service) {
            service.setActive(value);
        }
    }
    /**
     * Get active values for all provided context parameters
     *
     * @param params Context parameters
     *
     * @returns Observable emitting array of all passed active context values
     */
    getValues(params) {
        if (params.length === 0) {
            return of([]);
        }
        return combineLatest(params.map((param) => {
            const service = this.getSiteContextService(param);
            if (service) {
                return service.getActive().pipe(distinctUntilChanged());
            }
            return of('');
        })).pipe(filter((value) => value.every((param) => !!param)));
    }
}
SiteContextParamsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextParamsService, deps: [{ token: i1.SiteContextConfig }, { token: i0.Injector }, { token: i2.ContextServiceMap }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextParamsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextParamsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextParamsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.SiteContextConfig }, { type: i0.Injector }, { type: i2.ContextServiceMap }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LXBhcmFtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc2l0ZS1jb250ZXh0L3NlcnZpY2VzL3NpdGUtY29udGV4dC1wYXJhbXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBWSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIseUJBQXlCLEdBQzFCLE1BQU0sZ0NBQWdDLENBQUM7Ozs7QUFNeEMsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxZQUNVLE1BQXlCLEVBQ3pCLFFBQWtCLEVBQ2xCLFVBQTZCO1FBRjdCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFDcEMsQ0FBQztJQUVKLG9CQUFvQjtRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQ3JDLENBQUM7U0FDSDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELHdCQUF3QjtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFFLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBYTtRQUMxQixPQUFPLHlCQUF5QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQWE7UUFDaEMsT0FBTywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxLQUFhO1FBQ2pDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJO2dCQUNGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQW1CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNwRTtZQUFDLE1BQU07Z0JBQ04sSUFBSSxTQUFTLEVBQUUsRUFBRTtvQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxLQUFLLElBQUksQ0FBQyxDQUFDO2lCQUNwRTtnQkFDRCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtTQUNGO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksS0FBeUIsQ0FBQztRQUU5QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPO2lCQUNKLFNBQVMsRUFBRTtpQkFDWCxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQyxXQUFXLEVBQUUsQ0FBQztTQUNsQjtRQUVELE9BQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBYTtRQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQVMsQ0FBQyxNQUFnQjtRQUN4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2Y7UUFFRCxPQUFPLGFBQWEsQ0FDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7O3FIQW5GVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdCxcbiAgZ2V0Q29udGV4dFBhcmFtZXRlclZhbHVlcyxcbn0gZnJvbSAnLi4vY29uZmlnL2NvbnRleHQtY29uZmlnLXV0aWxzJztcbmltcG9ydCB7IFNpdGVDb250ZXh0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NpdGUtY29udGV4dC1jb25maWcnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHQgfSBmcm9tICcuLi9mYWNhZGUvc2l0ZS1jb250ZXh0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb250ZXh0U2VydmljZU1hcCB9IGZyb20gJy4uL3Byb3ZpZGVycy9jb250ZXh0LXNlcnZpY2UtbWFwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNpdGVDb250ZXh0UGFyYW1zU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnOiBTaXRlQ29udGV4dENvbmZpZyxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHNlcnZpY2VNYXA6IENvbnRleHRTZXJ2aWNlTWFwXG4gICkge31cblxuICBnZXRDb250ZXh0UGFyYW1ldGVycygpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmNvbnRleHQpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5jb250ZXh0KS5maWx0ZXIoXG4gICAgICAgIChwYXJhbSkgPT4gcGFyYW0gIT09ICd1cmxQYXJhbWV0ZXJzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0VXJsRW5jb2RpbmdQYXJhbWV0ZXJzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKHRoaXMuY29uZmlnLmNvbnRleHQgJiYgdGhpcy5jb25maWcuY29udGV4dC51cmxQYXJhbWV0ZXJzKSB8fCBbXTtcbiAgfVxuXG4gIGdldFBhcmFtVmFsdWVzKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIGdldENvbnRleHRQYXJhbWV0ZXJWYWx1ZXModGhpcy5jb25maWcsIHBhcmFtKTtcbiAgfVxuXG4gIGdldFBhcmFtRGVmYXVsdFZhbHVlKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdCh0aGlzLmNvbmZpZywgcGFyYW0pO1xuICB9XG5cbiAgZ2V0U2l0ZUNvbnRleHRTZXJ2aWNlKHBhcmFtOiBzdHJpbmcpOiBTaXRlQ29udGV4dDxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5zZXJ2aWNlTWFwW3BhcmFtXSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0PFNpdGVDb250ZXh0PGFueT4+KHRoaXMuc2VydmljZU1hcFtwYXJhbV0pO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgQ291bGRuJ3QgZmluZCBzaXRlIGNvbnRleHQgc2VydmljZSBmb3IgJyR7cGFyYW19Jy5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGxldCB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZ2V0U2l0ZUNvbnRleHRTZXJ2aWNlKHBhcmFtKTtcbiAgICBpZiAoc2VydmljZSkge1xuICAgICAgc2VydmljZVxuICAgICAgICAuZ2V0QWN0aXZlKClcbiAgICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiAodmFsdWUgPSB2YWwpKVxuICAgICAgICAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogdGhpcy5nZXRQYXJhbURlZmF1bHRWYWx1ZShwYXJhbSk7XG4gIH1cblxuICBzZXRWYWx1ZShwYXJhbTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZ2V0U2l0ZUNvbnRleHRTZXJ2aWNlKHBhcmFtKTtcbiAgICBpZiAoc2VydmljZSkge1xuICAgICAgc2VydmljZS5zZXRBY3RpdmUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWN0aXZlIHZhbHVlcyBmb3IgYWxsIHByb3ZpZGVkIGNvbnRleHQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIENvbnRleHQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIGVtaXR0aW5nIGFycmF5IG9mIGFsbCBwYXNzZWQgYWN0aXZlIGNvbnRleHQgdmFsdWVzXG4gICAqL1xuICBnZXRWYWx1ZXMocGFyYW1zOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QXJyYXk8c3RyaW5nPj4ge1xuICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gb2YoW10pO1xuICAgIH1cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgcGFyYW1zLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZ2V0U2l0ZUNvbnRleHRTZXJ2aWNlKHBhcmFtKTtcbiAgICAgICAgaWYgKHNlcnZpY2UpIHtcbiAgICAgICAgICByZXR1cm4gc2VydmljZS5nZXRBY3RpdmUoKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZignJyk7XG4gICAgICB9KVxuICAgICkucGlwZShmaWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZS5ldmVyeSgocGFyYW0pID0+ICEhcGFyYW0pKSk7XG4gIH1cbn1cbiJdfQ==