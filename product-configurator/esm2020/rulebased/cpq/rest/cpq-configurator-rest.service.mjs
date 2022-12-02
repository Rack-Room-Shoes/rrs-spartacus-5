import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CPQ_CONFIGURATOR_NORMALIZER, CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER, CPQ_CONFIGURATOR_SERIALIZER, } from './converters/cpq-configurator.converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
import * as i3 from "./cpq-configurator-endpoint.service";
export class CpqConfiguratorRestService {
    constructor(http, converterService, endpointService) {
        this.http = http;
        this.converterService = converterService;
        this.endpointService = endpointService;
    }
    /**
     * Creates a new runtime configuration for the given product id
     * and read this default configuration from the CPQ system.
     *
     * @param {string} productSystemId - Product system ID
     * @returns {Observable<Configurator.Configuration>} - Created configuration
     */
    createConfiguration(productSystemId) {
        return this.callConfigurationInit(productSystemId).pipe(switchMap((configCreatedResponse) => {
            return this.callConfigurationDisplay(configCreatedResponse.configurationId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return {
                    ...resultConfiguration,
                    configId: configCreatedResponse.configurationId,
                };
            }));
        }));
    }
    /**
     * Retrieves a configuration from the CPQ system by its configuration ID and for a certain tab.
     *
     * @param {string} configId - Configuration ID
     * @param {string} tabId - Tab ID
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfiguration(configId, tabId) {
        return this.callConfigurationDisplay(configId, tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                configId: configId,
            };
        }));
    }
    /**
     * Retrieves an overview for a certain configuration by its configuration ID.
     *
     * @param {string} configId - Configuration ID
     * @returns {Observable<Configurator.Overview>} - Retrieved overview
     */
    readConfigurationOverview(configId) {
        return this.getConfigurationWithAllTabsAndAttributes(configId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                configId: configId,
            };
        }));
    }
    /**
     * This method is actually a workaround until CPQ provides and API to fetch
     * all selected attributes / attribute values grouped by all tabs.
     * It will fire a request for each tab to collect all required data.
     */
    getConfigurationWithAllTabsAndAttributes(configId) {
        return this.callConfigurationDisplay(configId).pipe(switchMap((currentTab) => {
            const tabRequests = [];
            if (currentTab.tabs && currentTab.tabs.length > 0) {
                // prepare requests for remaining tabs
                currentTab.tabs.forEach((tab) => {
                    if (tab.isSelected) {
                        // details of the currently selected tab are already fetched
                        tabRequests.push(of(currentTab));
                    }
                    else {
                        tabRequests.push(this.callConfigurationDisplay(configId, tab.id.toString()));
                    }
                });
            }
            else {
                // tabs are not defined in model, general tab is used
                tabRequests.push(of(currentTab));
            }
            // fire requests for remaining tabs and wait until all are finished
            return forkJoin(tabRequests);
        }), map(this.mergeTabResults));
    }
    mergeTabResults(tabReqResultList) {
        const config = {
            // first tab will be the current tab. It might not contain all error messages (bug in CPQ). So we just use the last tab.
            // this whole logic will be obsolete, as soon as CPQ provides and API to fetch everything.
            ...tabReqResultList[tabReqResultList.length - 1],
        };
        config.attributes = undefined;
        config.tabs = [];
        tabReqResultList.forEach((tabReqResult) => {
            let tab;
            const currentTab = tabReqResult.tabs?.find((tabEl) => tabEl.isSelected);
            if (currentTab && tabReqResult.tabs && tabReqResult.tabs.length > 0) {
                tab = {
                    ...currentTab,
                };
            }
            else {
                tab = {
                    id: 0,
                };
            }
            tab.attributes = tabReqResult.attributes;
            config.tabs?.push(tab);
        });
        return config;
    }
    /**
     * Updates an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateAttribute(configuration) {
        const updateAttribute = this.converterService.convert(configuration, CPQ_CONFIGURATOR_SERIALIZER);
        return this.callUpdateAttribute(updateAttribute).pipe(switchMap(() => {
            return this.callConfigurationDisplay(configuration.configId, updateAttribute.tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return {
                    ...resultConfiguration,
                    configId: configuration.configId,
                };
            }));
        }));
    }
    /**
     * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateValueQuantity(configuration) {
        const updateValue = this.converterService.convert(configuration, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER);
        return this.callUpdateValue(updateValue).pipe(switchMap(() => {
            return this.callConfigurationDisplay(configuration.configId, updateValue.tabId).pipe(this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
                return {
                    ...resultConfiguration,
                    configId: configuration.configId,
                };
            }));
        }));
    }
    callUpdateValue(updateValue) {
        return this.http.patch(this.endpointService.buildUrl('valueUpdate', {
            configId: updateValue.configurationId,
            attributeCode: updateValue.standardAttributeCode,
            valueCode: updateValue.attributeValueId,
        }), {
            Quantity: updateValue.quantity,
        }, this.endpointService.CPQ_MARKER_HEADER);
    }
    callConfigurationInit(productSystemId) {
        return this.http.post(this.endpointService.buildUrl('configurationInit'), {
            ProductSystemId: productSystemId,
        }, this.endpointService.CPQ_MARKER_HEADER);
    }
    callConfigurationDisplay(configId, tabId) {
        return this.http.get(this.endpointService.buildUrl('configurationDisplay', { configId: configId }, tabId ? [{ name: 'tabId', value: tabId }] : undefined), this.endpointService.CPQ_MARKER_HEADER);
    }
    callUpdateAttribute(updateAttribute) {
        return this.http.patch(this.endpointService.buildUrl('attributeUpdate', {
            configId: updateAttribute.configurationId,
            attributeCode: updateAttribute.standardAttributeCode,
        }), updateAttribute.changeAttributeValue, this.endpointService.CPQ_MARKER_HEADER);
    }
}
CpqConfiguratorRestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestService, deps: [{ token: i1.HttpClient }, { token: i2.ConverterService }, { token: i3.CpqConfiguratorEndpointService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.ConverterService }, { type: i3.CpqConfiguratorEndpointService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yZXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NwcS9yZXN0L2NwcS1jb25maWd1cmF0b3ItcmVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG9DQUFvQyxFQUNwQyxvQ0FBb0MsRUFDcEMsMkJBQTJCLEdBQzVCLE1BQU0sMENBQTBDLENBQUM7Ozs7O0FBS2xELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFDWSxJQUFnQixFQUNoQixnQkFBa0MsRUFDbEMsZUFBK0M7UUFGL0MsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQztJQUN4RCxDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsbUJBQW1CLENBQ2pCLGVBQXVCO1FBRXZCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FDckQsU0FBUyxDQUFDLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FDbEMscUJBQXFCLENBQUMsZUFBZSxDQUN0QyxDQUFDLElBQUksQ0FDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQzNELEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7Z0JBQzFCLE9B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ZSxFQUFFLGVBQWU7U0FDakMsRUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVTLHdCQUF3QixDQUNoQyxRQUFnQixFQUNoQixLQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQzNCLHNCQUFzQixFQUN0QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUN0RCxFQUNELElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQ3ZDLENBQUM7SUFDSixDQUFDO0lBRVMsbUJBQW1CLENBQzNCLGVBQW9DO1FBRXBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQy9DLFFBQVEsRUFBRSxlQUFlLENBQUMsZUFBZTtZQUN6QyxhQUFhLEVBQUUsZUFBZSxDQUFDLHFCQUFxQjtTQUNyRCxDQUFDLEVBQ0YsZUFBZSxDQUFDLG9CQUFvQixFQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUN2QyxDQUFDO0lBQ0osQ0FBQzs7dUhBN1BVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRGIsTUFBTTsyRkFDbkIsMEJBQTBCO2tCQUR0QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDUFFfQ09ORklHVVJBVE9SX05PUk1BTElaRVIsXG4gIENQUV9DT05GSUdVUkFUT1JfT1ZFUlZJRVdfTk9STUFMSVpFUixcbiAgQ1BRX0NPTkZJR1VSQVRPUl9RVUFOVElUWV9TRVJJQUxJWkVSLFxuICBDUFFfQ09ORklHVVJBVE9SX1NFUklBTElaRVIsXG59IGZyb20gJy4vY29udmVydGVycy9jcHEtY29uZmlndXJhdG9yLmNvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yRW5kcG9pbnRTZXJ2aWNlIH0gZnJvbSAnLi9jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3BxIH0gZnJvbSAnLi9jcHEubW9kZWxzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JSZXN0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXJTZXJ2aWNlOiBDb252ZXJ0ZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBlbmRwb2ludFNlcnZpY2U6IENwcUNvbmZpZ3VyYXRvckVuZHBvaW50U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcnVudGltZSBjb25maWd1cmF0aW9uIGZvciB0aGUgZ2l2ZW4gcHJvZHVjdCBpZFxuICAgKiBhbmQgcmVhZCB0aGlzIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBDUFEgc3lzdGVtLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZHVjdFN5c3RlbUlkIC0gUHJvZHVjdCBzeXN0ZW0gSURcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+fSAtIENyZWF0ZWQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgY3JlYXRlQ29uZmlndXJhdGlvbihcbiAgICBwcm9kdWN0U3lzdGVtSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbENvbmZpZ3VyYXRpb25Jbml0KHByb2R1Y3RTeXN0ZW1JZCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY29uZmlnQ3JlYXRlZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxDb25maWd1cmF0aW9uRGlzcGxheShcbiAgICAgICAgICBjb25maWdDcmVhdGVkUmVzcG9uc2UuY29uZmlndXJhdGlvbklkXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICB0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ1BRX0NPTkZJR1VSQVRPUl9OT1JNQUxJWkVSKSxcbiAgICAgICAgICBtYXAoKHJlc3VsdENvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnJlc3VsdENvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgIGNvbmZpZ0lkOiBjb25maWdDcmVhdGVkUmVzcG9uc2UuY29uZmlndXJhdGlvbklkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgQ1BRIHN5c3RlbSBieSBpdHMgY29uZmlndXJhdGlvbiBJRCBhbmQgZm9yIGEgY2VydGFpbiB0YWIuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWdJZCAtIENvbmZpZ3VyYXRpb24gSURcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhYklkIC0gVGFiIElEXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPn0gLSBSZXRyaWV2ZWQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgcmVhZENvbmZpZ3VyYXRpb24oXG4gICAgY29uZmlnSWQ6IHN0cmluZyxcbiAgICB0YWJJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbENvbmZpZ3VyYXRpb25EaXNwbGF5KGNvbmZpZ0lkLCB0YWJJZCkucGlwZShcbiAgICAgIHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShDUFFfQ09ORklHVVJBVE9SX05PUk1BTElaRVIpLFxuICAgICAgbWFwKChyZXN1bHRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucmVzdWx0Q29uZmlndXJhdGlvbixcbiAgICAgICAgICBjb25maWdJZDogY29uZmlnSWQsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFuIG92ZXJ2aWV3IGZvciBhIGNlcnRhaW4gY29uZmlndXJhdGlvbiBieSBpdHMgY29uZmlndXJhdGlvbiBJRC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZ0lkIC0gQ29uZmlndXJhdGlvbiBJRFxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuT3ZlcnZpZXc+fSAtIFJldHJpZXZlZCBvdmVydmlld1xuICAgKi9cbiAgcmVhZENvbmZpZ3VyYXRpb25PdmVydmlldyhcbiAgICBjb25maWdJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLk92ZXJ2aWV3PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29uZmlndXJhdGlvbldpdGhBbGxUYWJzQW5kQXR0cmlidXRlcyhjb25maWdJZCkucGlwZShcbiAgICAgIHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShDUFFfQ09ORklHVVJBVE9SX09WRVJWSUVXX05PUk1BTElaRVIpLFxuICAgICAgbWFwKChyZXN1bHRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucmVzdWx0Q29uZmlndXJhdGlvbixcbiAgICAgICAgICBjb25maWdJZDogY29uZmlnSWQsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgYWN0dWFsbHkgYSB3b3JrYXJvdW5kIHVudGlsIENQUSBwcm92aWRlcyBhbmQgQVBJIHRvIGZldGNoXG4gICAqIGFsbCBzZWxlY3RlZCBhdHRyaWJ1dGVzIC8gYXR0cmlidXRlIHZhbHVlcyBncm91cGVkIGJ5IGFsbCB0YWJzLlxuICAgKiBJdCB3aWxsIGZpcmUgYSByZXF1ZXN0IGZvciBlYWNoIHRhYiB0byBjb2xsZWN0IGFsbCByZXF1aXJlZCBkYXRhLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENvbmZpZ3VyYXRpb25XaXRoQWxsVGFic0FuZEF0dHJpYnV0ZXMoXG4gICAgY29uZmlnSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENwcS5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbENvbmZpZ3VyYXRpb25EaXNwbGF5KGNvbmZpZ0lkKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjdXJyZW50VGFiKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhYlJlcXVlc3RzOiBPYnNlcnZhYmxlPENwcS5Db25maWd1cmF0aW9uPltdID0gW107XG4gICAgICAgIGlmIChjdXJyZW50VGFiLnRhYnMgJiYgY3VycmVudFRhYi50YWJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBwcmVwYXJlIHJlcXVlc3RzIGZvciByZW1haW5pbmcgdGFic1xuICAgICAgICAgIGN1cnJlbnRUYWIudGFicy5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgICAgICAgIGlmICh0YWIuaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAvLyBkZXRhaWxzIG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgdGFiIGFyZSBhbHJlYWR5IGZldGNoZWRcbiAgICAgICAgICAgICAgdGFiUmVxdWVzdHMucHVzaChvZihjdXJyZW50VGFiKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YWJSZXF1ZXN0cy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbENvbmZpZ3VyYXRpb25EaXNwbGF5KGNvbmZpZ0lkLCB0YWIuaWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0YWJzIGFyZSBub3QgZGVmaW5lZCBpbiBtb2RlbCwgZ2VuZXJhbCB0YWIgaXMgdXNlZFxuICAgICAgICAgIHRhYlJlcXVlc3RzLnB1c2gob2YoY3VycmVudFRhYikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZpcmUgcmVxdWVzdHMgZm9yIHJlbWFpbmluZyB0YWJzIGFuZCB3YWl0IHVudGlsIGFsbCBhcmUgZmluaXNoZWRcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKHRhYlJlcXVlc3RzKTtcbiAgICAgIH0pLFxuICAgICAgbWFwKHRoaXMubWVyZ2VUYWJSZXN1bHRzKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWVyZ2VUYWJSZXN1bHRzKFxuICAgIHRhYlJlcVJlc3VsdExpc3Q6IENwcS5Db25maWd1cmF0aW9uW11cbiAgKTogQ3BxLkNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIC8vIGZpcnN0IHRhYiB3aWxsIGJlIHRoZSBjdXJyZW50IHRhYi4gSXQgbWlnaHQgbm90IGNvbnRhaW4gYWxsIGVycm9yIG1lc3NhZ2VzIChidWcgaW4gQ1BRKS4gU28gd2UganVzdCB1c2UgdGhlIGxhc3QgdGFiLlxuICAgICAgLy8gdGhpcyB3aG9sZSBsb2dpYyB3aWxsIGJlIG9ic29sZXRlLCBhcyBzb29uIGFzIENQUSBwcm92aWRlcyBhbmQgQVBJIHRvIGZldGNoIGV2ZXJ5dGhpbmcuXG4gICAgICAuLi50YWJSZXFSZXN1bHRMaXN0W3RhYlJlcVJlc3VsdExpc3QubGVuZ3RoIC0gMV0sXG4gICAgfTtcbiAgICBjb25maWcuYXR0cmlidXRlcyA9IHVuZGVmaW5lZDtcbiAgICBjb25maWcudGFicyA9IFtdO1xuICAgIHRhYlJlcVJlc3VsdExpc3QuZm9yRWFjaCgodGFiUmVxUmVzdWx0KSA9PiB7XG4gICAgICBsZXQgdGFiOiBDcHEuVGFiO1xuICAgICAgY29uc3QgY3VycmVudFRhYiA9IHRhYlJlcVJlc3VsdC50YWJzPy5maW5kKCh0YWJFbCkgPT4gdGFiRWwuaXNTZWxlY3RlZCk7XG4gICAgICBpZiAoY3VycmVudFRhYiAmJiB0YWJSZXFSZXN1bHQudGFicyAmJiB0YWJSZXFSZXN1bHQudGFicy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRhYiA9IHtcbiAgICAgICAgICAuLi5jdXJyZW50VGFiLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFiID0ge1xuICAgICAgICAgIGlkOiAwLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGFiLmF0dHJpYnV0ZXMgPSB0YWJSZXFSZXN1bHQuYXR0cmlidXRlcztcbiAgICAgIGNvbmZpZy50YWJzPy5wdXNoKHRhYik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFuIGF0dHJpYnV0ZSBvZiB0aGUgcnVudGltZSBjb25maWd1cmF0aW9uIGZvciB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiBpZCBhbmQgYXR0cmlidXRlIGNvZGVcbiAgICogYW5kIHJlYWQgdGhpcyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgQ1BRIHN5c3RlbS5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMge09ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+fSAtIFVwZGF0ZWQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgdXBkYXRlQXR0cmlidXRlKFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+IHtcbiAgICBjb25zdCB1cGRhdGVBdHRyaWJ1dGU6IENwcS5VcGRhdGVBdHRyaWJ1dGUgPSB0aGlzLmNvbnZlcnRlclNlcnZpY2UuY29udmVydChcbiAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICBDUFFfQ09ORklHVVJBVE9SX1NFUklBTElaRVJcbiAgICApO1xuICAgIHJldHVybiB0aGlzLmNhbGxVcGRhdGVBdHRyaWJ1dGUodXBkYXRlQXR0cmlidXRlKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbENvbmZpZ3VyYXRpb25EaXNwbGF5KFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24uY29uZmlnSWQsXG4gICAgICAgICAgdXBkYXRlQXR0cmlidXRlLnRhYklkXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICB0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ1BRX0NPTkZJR1VSQVRPUl9OT1JNQUxJWkVSKSxcbiAgICAgICAgICBtYXAoKHJlc3VsdENvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnJlc3VsdENvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgIGNvbmZpZ0lkOiBjb25maWd1cmF0aW9uLmNvbmZpZ0lkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBxdWFudGl0eSBmb3IgYW4gYXR0cmlidXRlIG9mIHRoZSBydW50aW1lIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBnaXZlbiBjb25maWd1cmF0aW9uIGlkIGFuZCBhdHRyaWJ1dGUgY29kZVxuICAgKiBhbmQgcmVhZCB0aGlzIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBDUFEgc3lzdGVtLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj59IC0gVXBkYXRlZCBjb25maWd1cmF0aW9uXG4gICAqL1xuICB1cGRhdGVWYWx1ZVF1YW50aXR5KFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+IHtcbiAgICBjb25zdCB1cGRhdGVWYWx1ZTogQ3BxLlVwZGF0ZVZhbHVlID0gdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLmNvbnZlcnQoXG4gICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgQ1BRX0NPTkZJR1VSQVRPUl9RVUFOVElUWV9TRVJJQUxJWkVSXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsVXBkYXRlVmFsdWUodXBkYXRlVmFsdWUpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsQ29uZmlndXJhdGlvbkRpc3BsYXkoXG4gICAgICAgICAgY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgICAgICB1cGRhdGVWYWx1ZS50YWJJZFxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENQUV9DT05GSUdVUkFUT1JfTk9STUFMSVpFUiksXG4gICAgICAgICAgbWFwKChyZXN1bHRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yZXN1bHRDb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICBjb25maWdJZDogY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsVXBkYXRlVmFsdWUodXBkYXRlVmFsdWU6IENwcS5VcGRhdGVWYWx1ZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxDcHEuQ29uZmlndXJhdGlvbkNyZWF0ZWRSZXNwb25zZURhdGE+KFxuICAgICAgdGhpcy5lbmRwb2ludFNlcnZpY2UuYnVpbGRVcmwoJ3ZhbHVlVXBkYXRlJywge1xuICAgICAgICBjb25maWdJZDogdXBkYXRlVmFsdWUuY29uZmlndXJhdGlvbklkLFxuICAgICAgICBhdHRyaWJ1dGVDb2RlOiB1cGRhdGVWYWx1ZS5zdGFuZGFyZEF0dHJpYnV0ZUNvZGUsXG4gICAgICAgIHZhbHVlQ29kZTogdXBkYXRlVmFsdWUuYXR0cmlidXRlVmFsdWVJZCxcbiAgICAgIH0pLFxuICAgICAge1xuICAgICAgICBRdWFudGl0eTogdXBkYXRlVmFsdWUucXVhbnRpdHksXG4gICAgICB9LFxuICAgICAgdGhpcy5lbmRwb2ludFNlcnZpY2UuQ1BRX01BUktFUl9IRUFERVJcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbGxDb25maWd1cmF0aW9uSW5pdChcbiAgICBwcm9kdWN0U3lzdGVtSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENwcS5Db25maWd1cmF0aW9uQ3JlYXRlZFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxDcHEuQ29uZmlndXJhdGlvbkNyZWF0ZWRSZXNwb25zZURhdGE+KFxuICAgICAgdGhpcy5lbmRwb2ludFNlcnZpY2UuYnVpbGRVcmwoJ2NvbmZpZ3VyYXRpb25Jbml0JyksXG4gICAgICB7XG4gICAgICAgIFByb2R1Y3RTeXN0ZW1JZDogcHJvZHVjdFN5c3RlbUlkLFxuICAgICAgfSxcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLkNQUV9NQVJLRVJfSEVBREVSXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxsQ29uZmlndXJhdGlvbkRpc3BsYXkoXG4gICAgY29uZmlnSWQ6IHN0cmluZyxcbiAgICB0YWJJZD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENwcS5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q3BxLkNvbmZpZ3VyYXRpb24+KFxuICAgICAgdGhpcy5lbmRwb2ludFNlcnZpY2UuYnVpbGRVcmwoXG4gICAgICAgICdjb25maWd1cmF0aW9uRGlzcGxheScsXG4gICAgICAgIHsgY29uZmlnSWQ6IGNvbmZpZ0lkIH0sXG4gICAgICAgIHRhYklkID8gW3sgbmFtZTogJ3RhYklkJywgdmFsdWU6IHRhYklkIH1dIDogdW5kZWZpbmVkXG4gICAgICApLFxuICAgICAgdGhpcy5lbmRwb2ludFNlcnZpY2UuQ1BRX01BUktFUl9IRUFERVJcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbGxVcGRhdGVBdHRyaWJ1dGUoXG4gICAgdXBkYXRlQXR0cmlidXRlOiBDcHEuVXBkYXRlQXR0cmlidXRlXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wYXRjaDxhbnk+KFxuICAgICAgdGhpcy5lbmRwb2ludFNlcnZpY2UuYnVpbGRVcmwoJ2F0dHJpYnV0ZVVwZGF0ZScsIHtcbiAgICAgICAgY29uZmlnSWQ6IHVwZGF0ZUF0dHJpYnV0ZS5jb25maWd1cmF0aW9uSWQsXG4gICAgICAgIGF0dHJpYnV0ZUNvZGU6IHVwZGF0ZUF0dHJpYnV0ZS5zdGFuZGFyZEF0dHJpYnV0ZUNvZGUsXG4gICAgICB9KSxcbiAgICAgIHVwZGF0ZUF0dHJpYnV0ZS5jaGFuZ2VBdHRyaWJ1dGVWYWx1ZSxcbiAgICAgIHRoaXMuZW5kcG9pbnRTZXJ2aWNlLkNQUV9NQVJLRVJfSEVBREVSXG4gICAgKTtcbiAgfVxufVxuIl19