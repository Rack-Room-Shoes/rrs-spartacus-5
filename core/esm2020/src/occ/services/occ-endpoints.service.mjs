/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { Injectable, isDevMode, Optional } from '@angular/core';
import { StringTemplate } from '../../config/utils/string-template';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { HttpParamsURIEncoder } from '../../util/http-params-uri.encoder';
import { DEFAULT_SCOPE } from '../occ-models/occ-endpoints.model';
import { urlPathJoin } from '../utils/occ-url-util';
import * as i0 from "@angular/core";
import * as i1 from "../config/occ-config";
import * as i2 from "../../site-context/facade/base-site.service";
export class OccEndpointsService {
    constructor(config, baseSiteService) {
        this.config = config;
        this.baseSiteService = baseSiteService;
        if (this.baseSiteService) {
            this.baseSiteService
                .getActive()
                .subscribe((value) => (this._activeBaseSite = value));
        }
    }
    get activeBaseSite() {
        return (this._activeBaseSite ??
            getContextParameterDefault(this.config, BASE_SITE_CONTEXT_ID));
    }
    /**
     * Returns the value configured for a specific endpoint
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    getRawEndpointValue(endpoint, scope) {
        const endpointValue = this.getEndpointForScope(endpoint, scope);
        return endpointValue;
    }
    /**
     * Returns true when the endpoint is configured
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    isConfigured(endpoint, scope) {
        return !(typeof this.getEndpointFromConfig(endpoint, scope) === 'undefined');
    }
    /**
     * Returns base OCC endpoint (baseUrl + prefix + baseSite) base on provided values
     *
     * @param baseUrlProperties Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    getBaseUrl(baseUrlProperties = {
        baseUrl: true,
        prefix: true,
        baseSite: true,
    }) {
        const baseUrl = baseUrlProperties.baseUrl === false
            ? ''
            : this.config?.backend?.occ?.baseUrl ?? '';
        const prefix = baseUrlProperties.prefix === false ? '' : this.getPrefix();
        const baseSite = baseUrlProperties.baseSite === false ? '' : this.activeBaseSite;
        return urlPathJoin(baseUrl, prefix, baseSite);
    }
    /**
     * Returns a fully qualified OCC Url
     *
     * @param endpoint Name of the OCC endpoint key
     * @param attributes Dynamic attributes used to build the url
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrl(endpoint, attributes, propertiesToOmit) {
        let url = this.getEndpointForScope(endpoint, attributes?.scope);
        if (attributes) {
            const { urlParams, queryParams } = attributes;
            if (urlParams) {
                url = StringTemplate.resolve(url, urlParams, true);
            }
            if (queryParams) {
                let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };
                if (url.includes('?')) {
                    let queryParamsFromEndpoint;
                    [url, queryParamsFromEndpoint] = url.split('?');
                    httpParamsOptions = {
                        ...httpParamsOptions,
                        ...{ fromString: queryParamsFromEndpoint },
                    };
                }
                let httpParams = new HttpParams(httpParamsOptions);
                Object.keys(queryParams).forEach((key) => {
                    const value = queryParams[key];
                    if (value !== undefined) {
                        if (value === null) {
                            httpParams = httpParams.delete(key);
                        }
                        else {
                            httpParams = httpParams.set(key, value);
                        }
                    }
                });
                const params = httpParams.toString();
                if (params.length) {
                    url += '?' + params;
                }
            }
        }
        return this.buildUrlFromEndpointString(url, propertiesToOmit);
    }
    getEndpointFromConfig(endpoint, scope) {
        const endpointsConfig = this.config.backend?.occ?.endpoints;
        if (!endpointsConfig) {
            return undefined;
        }
        const endpointConfig = endpointsConfig[endpoint];
        if (scope) {
            if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
                return endpointConfig;
            }
            return endpointConfig?.[scope];
        }
        return typeof endpointConfig === 'string'
            ? endpointConfig
            : endpointConfig?.[DEFAULT_SCOPE];
    }
    // TODO: Can we reuse getEndpointFromConfig in this method? Should we change behavior of this function?
    getEndpointForScope(endpoint, scope) {
        const endpointsConfig = this.config.backend?.occ?.endpoints;
        if (!endpointsConfig) {
            return '';
        }
        const endpointConfig = endpointsConfig[endpoint];
        if (scope) {
            if (endpointConfig?.[scope]) {
                return endpointConfig?.[scope];
            }
            if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
                return endpointConfig;
            }
            if (isDevMode()) {
                console.warn(`${endpoint} endpoint configuration missing for scope "${scope}"`);
            }
        }
        return ((typeof endpointConfig === 'string'
            ? endpointConfig
            : endpointConfig?.[DEFAULT_SCOPE]) || endpoint);
    }
    /**
     * Add the base OCC url properties to the specified endpoint string
     *
     * @param endpointString String value for the url endpoint
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrlFromEndpointString(endpointString, propertiesToOmit) {
        return urlPathJoin(this.getBaseUrl(propertiesToOmit), endpointString);
    }
    getPrefix() {
        if (this.config?.backend?.occ?.prefix &&
            !this.config.backend.occ.prefix.startsWith('/')) {
            return '/' + this.config.backend.occ.prefix;
        }
        return this.config?.backend?.occ?.prefix ?? '';
    }
}
OccEndpointsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccEndpointsService, deps: [{ token: i1.OccConfig }, { token: i2.BaseSiteService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
OccEndpointsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccEndpointsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccEndpointsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i2.BaseSiteService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWVuZHBvaW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWlCcEQsTUFBTSxPQUFPLG1CQUFtQjtJQVU5QixZQUNVLE1BQWlCLEVBQ0wsZUFBZ0M7UUFENUMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNMLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUVwRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWU7aUJBQ2pCLFNBQVMsRUFBRTtpQkFDWCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQWhCRCxJQUFZLGNBQWM7UUFDeEIsT0FBTyxDQUNMLElBQUksQ0FBQyxlQUFlO1lBQ3BCLDBCQUEwQixDQUFDLElB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TyxFQUFFLEdBQUcsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2pELENBQUM7O2dIQXpNVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RyaW5nVGVtcGxhdGUgfSBmcm9tICcuLi8uLi9jb25maWcvdXRpbHMvc3RyaW5nLXRlbXBsYXRlJztcbmltcG9ydCB7IGdldENvbnRleHRQYXJhbWV0ZXJEZWZhdWx0IH0gZnJvbSAnLi4vLi4vc2l0ZS1jb250ZXh0L2NvbmZpZy9jb250ZXh0LWNvbmZpZy11dGlscyc7XG5pbXBvcnQgeyBCYXNlU2l0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaXRlLWNvbnRleHQvZmFjYWRlL2Jhc2Utc2l0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEJBU0VfU0lURV9DT05URVhUX0lEIH0gZnJvbSAnLi4vLi4vc2l0ZS1jb250ZXh0L3Byb3ZpZGVycy9jb250ZXh0LWlkcyc7XG5pbXBvcnQgeyBIdHRwUGFyYW1zVVJJRW5jb2RlciB9IGZyb20gJy4uLy4uL3V0aWwvaHR0cC1wYXJhbXMtdXJpLmVuY29kZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL29jYy1jb25maWcnO1xuaW1wb3J0IHsgREVGQVVMVF9TQ09QRSB9IGZyb20gJy4uL29jYy1tb2RlbHMvb2NjLWVuZHBvaW50cy5tb2RlbCc7XG5pbXBvcnQgeyB1cmxQYXRoSm9pbiB9IGZyb20gJy4uL3V0aWxzL29jYy11cmwtdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZU9jY1VybFByb3BlcnRpZXMge1xuICBiYXNlVXJsPzogYm9vbGVhbjtcbiAgcHJlZml4PzogYm9vbGVhbjtcbiAgYmFzZVNpdGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtaWNBdHRyaWJ1dGVzIHtcbiAgdXJsUGFyYW1zPzogb2JqZWN0O1xuICBxdWVyeVBhcmFtcz86IG9iamVjdDtcbiAgc2NvcGU/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPY2NFbmRwb2ludHNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYWN0aXZlQmFzZVNpdGU6IHN0cmluZztcblxuICBwcml2YXRlIGdldCBhY3RpdmVCYXNlU2l0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLl9hY3RpdmVCYXNlU2l0ZSA/P1xuICAgICAgZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQodGhpcy5jb25maWcsIEJBU0VfU0lURV9DT05URVhUX0lEKVxuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogT2NjQ29uZmlnLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgYmFzZVNpdGVTZXJ2aWNlOiBCYXNlU2l0ZVNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKHRoaXMuYmFzZVNpdGVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmJhc2VTaXRlU2VydmljZVxuICAgICAgICAuZ2V0QWN0aXZlKClcbiAgICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+ICh0aGlzLl9hY3RpdmVCYXNlU2l0ZSA9IHZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGNvbmZpZ3VyZWQgZm9yIGEgc3BlY2lmaWMgZW5kcG9pbnRcbiAgICpcbiAgICogQHBhcmFtIGVuZHBvaW50S2V5IHRoZSBjb25maWd1cmF0aW9uIGtleSBmb3IgdGhlIGVuZHBvaW50IHRvIHJldHVyblxuICAgKiBAcGFyYW0gc2NvcGUgZW5kcG9pbnQgY29uZmlndXJhdGlvbiBzY29wZVxuICAgKi9cbiAgZ2V0UmF3RW5kcG9pbnRWYWx1ZShlbmRwb2ludDogc3RyaW5nLCBzY29wZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZW5kcG9pbnRWYWx1ZSA9IHRoaXMuZ2V0RW5kcG9pbnRGb3JTY29wZShlbmRwb2ludCwgc2NvcGUpO1xuXG4gICAgcmV0dXJuIGVuZHBvaW50VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIGVuZHBvaW50IGlzIGNvbmZpZ3VyZWRcbiAgICpcbiAgICogQHBhcmFtIGVuZHBvaW50S2V5IHRoZSBjb25maWd1cmF0aW9uIGtleSBmb3IgdGhlIGVuZHBvaW50IHRvIHJldHVyblxuICAgKiBAcGFyYW0gc2NvcGUgZW5kcG9pbnQgY29uZmlndXJhdGlvbiBzY29wZVxuICAgKi9cbiAgaXNDb25maWd1cmVkKGVuZHBvaW50OiBzdHJpbmcsIHNjb3BlPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEoXG4gICAgICB0eXBlb2YgdGhpcy5nZXRFbmRwb2ludEZyb21Db25maWcoZW5kcG9pbnQsIHNjb3BlKSA9PT0gJ3VuZGVmaW5lZCdcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYmFzZSBPQ0MgZW5kcG9pbnQgKGJhc2VVcmwgKyBwcmVmaXggKyBiYXNlU2l0ZSkgYmFzZSBvbiBwcm92aWRlZCB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIGJhc2VVcmxQcm9wZXJ0aWVzIFNwZWNpZnkgcHJvcGVydGllcyB0byBub3QgYWRkIHRvIHRoZSB1cmwgKGJhc2VVcmwsIHByZWZpeCwgYmFzZVNpdGUpXG4gICAqL1xuICBnZXRCYXNlVXJsKFxuICAgIGJhc2VVcmxQcm9wZXJ0aWVzOiBCYXNlT2NjVXJsUHJvcGVydGllcyA9IHtcbiAgICAgIGJhc2VVcmw6IHRydWUsXG4gICAgICBwcmVmaXg6IHRydWUsXG4gICAgICBiYXNlU2l0ZTogdHJ1ZSxcbiAgICB9XG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgYmFzZVVybCA9XG4gICAgICBiYXNlVXJsUHJvcGVydGllcy5iYXNlVXJsID09PSBmYWxzZVxuICAgICAgICA/ICcnXG4gICAgICAgIDogdGhpcy5jb25maWc/LmJhY2tlbmQ/Lm9jYz8uYmFzZVVybCA/PyAnJztcbiAgICBjb25zdCBwcmVmaXggPSBiYXNlVXJsUHJvcGVydGllcy5wcmVmaXggPT09IGZhbHNlID8gJycgOiB0aGlzLmdldFByZWZpeCgpO1xuICAgIGNvbnN0IGJhc2VTaXRlID1cbiAgICAgIGJhc2VVcmxQcm9wZXJ0aWVzLmJhc2VTaXRlID09PSBmYWxzZSA/ICcnIDogdGhpcy5hY3RpdmVCYXNlU2l0ZTtcblxuICAgIHJldHVybiB1cmxQYXRoSm9pbihiYXNlVXJsLCBwcmVmaXgsIGJhc2VTaXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgZnVsbHkgcXVhbGlmaWVkIE9DQyBVcmxcbiAgICpcbiAgICogQHBhcmFtIGVuZHBvaW50IE5hbWUgb2YgdGhlIE9DQyBlbmRwb2ludCBrZXlcbiAgICogQHBhcmFtIGF0dHJpYnV0ZXMgRHluYW1pYyBhdHRyaWJ1dGVzIHVzZWQgdG8gYnVpbGQgdGhlIHVybFxuICAgKiBAcGFyYW0gcHJvcGVydGllc1RvT21pdCBTcGVjaWZ5IHByb3BlcnRpZXMgdG8gbm90IGFkZCB0byB0aGUgdXJsIChiYXNlVXJsLCBwcmVmaXgsIGJhc2VTaXRlKVxuICAgKi9cbiAgYnVpbGRVcmwoXG4gICAgZW5kcG9pbnQ6IHN0cmluZyxcbiAgICBhdHRyaWJ1dGVzPzogRHluYW1pY0F0dHJpYnV0ZXMsXG4gICAgcHJvcGVydGllc1RvT21pdD86IEJhc2VPY2NVcmxQcm9wZXJ0aWVzXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IHVybCA9IHRoaXMuZ2V0RW5kcG9pbnRGb3JTY29wZShlbmRwb2ludCwgYXR0cmlidXRlcz8uc2NvcGUpO1xuXG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnN0IHsgdXJsUGFyYW1zLCBxdWVyeVBhcmFtcyB9ID0gYXR0cmlidXRlcztcblxuICAgICAgaWYgKHVybFBhcmFtcykge1xuICAgICAgICB1cmwgPSBTdHJpbmdUZW1wbGF0ZS5yZXNvbHZlKHVybCwgdXJsUGFyYW1zLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgIGxldCBodHRwUGFyYW1zT3B0aW9ucyA9IHsgZW5jb2RlcjogbmV3IEh0dHBQYXJhbXNVUklFbmNvZGVyKCkgfTtcblxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgICAgICBsZXQgcXVlcnlQYXJhbXNGcm9tRW5kcG9pbnQ6IHN0cmluZztcbiAgICAgICAgICBbdXJsLCBxdWVyeVBhcmFtc0Zyb21FbmRwb2ludF0gPSB1cmwuc3BsaXQoJz8nKTtcbiAgICAgICAgICBodHRwUGFyYW1zT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLmh0dHBQYXJhbXNPcHRpb25zLFxuICAgICAgICAgICAgLi4ueyBmcm9tU3RyaW5nOiBxdWVyeVBhcmFtc0Zyb21FbmRwb2ludCB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKGh0dHBQYXJhbXNPcHRpb25zKTtcbiAgICAgICAgT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlQYXJhbXNba2V5IGFzIGtleW9mIG9iamVjdF07XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGh0dHBQYXJhbXMudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICB1cmwgKz0gJz8nICsgcGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRVcmxGcm9tRW5kcG9pbnRTdHJpbmcodXJsLCBwcm9wZXJ0aWVzVG9PbWl0KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RW5kcG9pbnRGcm9tQ29uZmlnKFxuICAgIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgc2NvcGU/OiBzdHJpbmdcbiAgKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBlbmRwb2ludHNDb25maWcgPSB0aGlzLmNvbmZpZy5iYWNrZW5kPy5vY2M/LmVuZHBvaW50cztcblxuICAgIGlmICghZW5kcG9pbnRzQ29uZmlnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZHBvaW50Q29uZmlnOiBhbnkgPVxuICAgICAgZW5kcG9pbnRzQ29uZmlnW2VuZHBvaW50IGFzIGtleW9mIHR5cGVvZiBlbmRwb2ludHNDb25maWddO1xuXG4gICAgaWYgKHNjb3BlKSB7XG4gICAgICBpZiAoc2NvcGUgPT09IERFRkFVTFRfU0NPUEUgJiYgdHlwZW9mIGVuZHBvaW50Q29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW5kcG9pbnRDb25maWc7XG4gICAgICB9XG4gICAgICByZXR1cm4gZW5kcG9pbnRDb25maWc/LltzY29wZV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmRwb2ludENvbmZpZyA9PT0gJ3N0cmluZydcbiAgICAgID8gZW5kcG9pbnRDb25maWdcbiAgICAgIDogZW5kcG9pbnRDb25maWc/LltERUZBVUxUX1NDT1BFXTtcbiAgfVxuXG4gIC8vIFRPRE86IENhbiB3ZSByZXVzZSBnZXRFbmRwb2ludEZyb21Db25maWcgaW4gdGhpcyBtZXRob2Q/IFNob3VsZCB3ZSBjaGFuZ2UgYmVoYXZpb3Igb2YgdGhpcyBmdW5jdGlvbj9cbiAgcHJpdmF0ZSBnZXRFbmRwb2ludEZvclNjb3BlKGVuZHBvaW50OiBzdHJpbmcsIHNjb3BlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBlbmRwb2ludHNDb25maWcgPSB0aGlzLmNvbmZpZy5iYWNrZW5kPy5vY2M/LmVuZHBvaW50cztcblxuICAgIGlmICghZW5kcG9pbnRzQ29uZmlnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kcG9pbnRDb25maWc6IGFueSA9XG4gICAgICBlbmRwb2ludHNDb25maWdbZW5kcG9pbnQgYXMga2V5b2YgdHlwZW9mIGVuZHBvaW50c0NvbmZpZ107XG5cbiAgICBpZiAoc2NvcGUpIHtcbiAgICAgIGlmIChlbmRwb2ludENvbmZpZz8uW3Njb3BlXSkge1xuICAgICAgICByZXR1cm4gZW5kcG9pbnRDb25maWc/LltzY29wZV07XG4gICAgICB9XG4gICAgICBpZiAoc2NvcGUgPT09IERFRkFVTFRfU0NPUEUgJiYgdHlwZW9mIGVuZHBvaW50Q29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZW5kcG9pbnRDb25maWc7XG4gICAgICB9XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2VuZHBvaW50fSBlbmRwb2ludCBjb25maWd1cmF0aW9uIG1pc3NpbmcgZm9yIHNjb3BlIFwiJHtzY29wZX1cImBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgKHR5cGVvZiBlbmRwb2ludENvbmZpZyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBlbmRwb2ludENvbmZpZ1xuICAgICAgICA6IGVuZHBvaW50Q29uZmlnPy5bREVGQVVMVF9TQ09QRV0pIHx8IGVuZHBvaW50XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIGJhc2UgT0NDIHVybCBwcm9wZXJ0aWVzIHRvIHRoZSBzcGVjaWZpZWQgZW5kcG9pbnQgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludFN0cmluZyBTdHJpbmcgdmFsdWUgZm9yIHRoZSB1cmwgZW5kcG9pbnRcbiAgICogQHBhcmFtIHByb3BlcnRpZXNUb09taXQgU3BlY2lmeSBwcm9wZXJ0aWVzIHRvIG5vdCBhZGQgdG8gdGhlIHVybCAoYmFzZVVybCwgcHJlZml4LCBiYXNlU2l0ZSlcbiAgICovXG4gIHByaXZhdGUgYnVpbGRVcmxGcm9tRW5kcG9pbnRTdHJpbmcoXG4gICAgZW5kcG9pbnRTdHJpbmc6IHN0cmluZyxcbiAgICBwcm9wZXJ0aWVzVG9PbWl0PzogQmFzZU9jY1VybFByb3BlcnRpZXNcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdXJsUGF0aEpvaW4odGhpcy5nZXRCYXNlVXJsKHByb3BlcnRpZXNUb09taXQpLCBlbmRwb2ludFN0cmluZyk7XG4gIH1cblxuICBwcml2YXRlIGdldFByZWZpeCgpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnPy5iYWNrZW5kPy5vY2M/LnByZWZpeCAmJlxuICAgICAgIXRoaXMuY29uZmlnLmJhY2tlbmQub2NjLnByZWZpeC5zdGFydHNXaXRoKCcvJylcbiAgICApIHtcbiAgICAgIHJldHVybiAnLycgKyB0aGlzLmNvbmZpZy5iYWNrZW5kLm9jYy5wcmVmaXg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZz8uYmFja2VuZD8ub2NjPy5wcmVmaXggPz8gJyc7XG4gIH1cbn1cbiJdfQ==