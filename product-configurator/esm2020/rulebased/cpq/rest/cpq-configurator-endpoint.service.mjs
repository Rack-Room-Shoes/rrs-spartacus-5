/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringTemplate } from '@spartacus/core';
import { MARKER_HEADER_CPQ_CONFIGURATOR } from '@spartacus/product-configurator/rulebased/root';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-configurator-endpoint.config";
export class CpqConfiguratorEndpointService {
    constructor(config) {
        this.config = config;
        /**
         * header attribute to a mark cpq related requests, so that they can be picked up by the {@link CpqConfiguratorRestInterceptor}
         */
        this.CPQ_MARKER_HEADER = {
            headers: new HttpHeaders({
                [MARKER_HEADER_CPQ_CONFIGURATOR]: 'x',
            }),
        };
    }
    buildUrl(endpointName, urlParams, queryParams) {
        const endpoints = this.config.backend?.cpq?.endpoints;
        let endpoint;
        switch (endpointName) {
            case 'configurationInit':
                endpoint = endpoints?.configurationInit;
                break;
            case 'configurationDisplay':
                endpoint = endpoints?.configurationDisplay;
                break;
            case 'attributeUpdate':
                endpoint = endpoints?.attributeUpdate;
                break;
            case 'valueUpdate':
                endpoint = endpoints?.valueUpdate;
        }
        if (!endpoint) {
            endpoint = 'configurations';
            console.warn(`${endpointName} endpoint configuration missing for cpq backend, please provide it via key: "backend.cpq.endpoints.${endpointName}"`);
        }
        let url = this.config.backend?.cpq?.prefix + endpoint;
        url = urlParams ? StringTemplate.resolve(url, urlParams) : url;
        url = queryParams ? this.appendQueryParameters(url, queryParams) : url;
        return url;
    }
    appendQueryParameters(url, parameters) {
        let urlWithParameters = url + '?';
        parameters.forEach((param, idx) => {
            urlWithParameters = idx > 0 ? urlWithParameters + '&' : urlWithParameters;
            urlWithParameters = `${urlWithParameters}${param.name}=${param.value}`;
        });
        return urlWithParameters;
    }
}
CpqConfiguratorEndpointService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorEndpointService, deps: [{ token: i1.CpqConfiguratorEndpointConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorEndpointService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorEndpointService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorEndpointService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.CpqConfiguratorEndpointConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1lbmRwb2ludC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvcmVzdC9jcHEtY29uZmlndXJhdG9yLWVuZHBvaW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7O0FBSWhHLE1BQU0sT0FBTyw4QkFBOEI7SUFDekMsWUFBc0IsTUFBcUM7UUFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBK0I7UUFFM0Q7O1dBRUc7UUFDTSxzQkFBaUIsR0FBRztZQUMzQixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUM7Z0JBQ3ZCLENBQUMsOEJBQThCLENBQUMsRUFBRSxHQUFHO2FBQ3RDLENBQUM7U0FDSCxDQUFDO0lBVDRELENBQUM7SUFXL0QsUUFBUSxDQUNOLFlBQW9CLEVBQ3BCLFNBQWtCLEVBQ2xCLFdBQStDO1FBRS9DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUM7UUFDdEQsSUFBSSxRQUFRLENBQUM7UUFDYixRQUFRLFlBQVksRUFBRTtZQUNwQixLQUFLLG1CQUFtQjtnQkFDdEIsUUFBUSxHQUFHLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQztnQkFDeEMsTUFBTTtZQUNSLEtBQUssc0JBQXNCO2dCQUN6QixRQUFRLEdBQUcsU0FBUyxFQUFFLG9CQUFvQixDQUFDO2dCQUMzQyxNQUFNO1lBQ1IsS0FBSyxpQkFBaUI7Z0JBQ3BCLFFBQVEsR0FBRyxTQUFTLEVBQUUsZUFBZSxDQUFDO2dCQUN0QyxNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixRQUFRLEdBQUcsU0FBUyxFQUFFLFdBQVcsQ0FBQztTQUNyQztRQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixRQUFRLEdBQUcsZ0JBQWdCLENBQUM7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FDVixHQUFHLFlBQVksc0dBQXNHLFlBQVksR0FBRyxDQUNySSxDQUFDO1NBQ0g7UUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0RCxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9ELEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN2RSxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFUyxxQkFBcUIsQ0FDN0IsR0FBVyxFQUNYLFVBQTZDO1FBRTdDLElBQUksaUJBQWlCLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQVcsRUFBRSxFQUFFO1lBQ3hDLGlCQUFpQixHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDMUUsaUJBQWlCLEdBQUcsR0FBRyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQzs7MkhBdkRVLDhCQUE4QjsrSEFBOUIsOEJBQThCLGNBRGpCLE1BQU07MkZBQ25CLDhCQUE4QjtrQkFEMUMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0cmluZ1RlbXBsYXRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE1BUktFUl9IRUFERVJfQ1BRX0NPTkZJR1VSQVRPUiB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3Jvb3QnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yRW5kcG9pbnRDb25maWcgfSBmcm9tICcuL2NwcS1jb25maWd1cmF0b3ItZW5kcG9pbnQuY29uZmlnJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JFbmRwb2ludFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBDcHFDb25maWd1cmF0b3JFbmRwb2ludENvbmZpZykge31cblxuICAvKipcbiAgICogaGVhZGVyIGF0dHJpYnV0ZSB0byBhIG1hcmsgY3BxIHJlbGF0ZWQgcmVxdWVzdHMsIHNvIHRoYXQgdGhleSBjYW4gYmUgcGlja2VkIHVwIGJ5IHRoZSB7QGxpbmsgQ3BxQ29uZmlndXJhdG9yUmVzdEludGVyY2VwdG9yfVxuICAgKi9cbiAgcmVhZG9ubHkgQ1BRX01BUktFUl9IRUFERVIgPSB7XG4gICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgIFtNQVJLRVJfSEVBREVSX0NQUV9DT05GSUdVUkFUT1JdOiAneCcsXG4gICAgfSksXG4gIH07XG5cbiAgYnVpbGRVcmwoXG4gICAgZW5kcG9pbnROYW1lOiBzdHJpbmcsXG4gICAgdXJsUGFyYW1zPzogT2JqZWN0LFxuICAgIHF1ZXJ5UGFyYW1zPzogW3sgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1dXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgZW5kcG9pbnRzID0gdGhpcy5jb25maWcuYmFja2VuZD8uY3BxPy5lbmRwb2ludHM7XG4gICAgbGV0IGVuZHBvaW50O1xuICAgIHN3aXRjaCAoZW5kcG9pbnROYW1lKSB7XG4gICAgICBjYXNlICdjb25maWd1cmF0aW9uSW5pdCc6XG4gICAgICAgIGVuZHBvaW50ID0gZW5kcG9pbnRzPy5jb25maWd1cmF0aW9uSW5pdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb25maWd1cmF0aW9uRGlzcGxheSc6XG4gICAgICAgIGVuZHBvaW50ID0gZW5kcG9pbnRzPy5jb25maWd1cmF0aW9uRGlzcGxheTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhdHRyaWJ1dGVVcGRhdGUnOlxuICAgICAgICBlbmRwb2ludCA9IGVuZHBvaW50cz8uYXR0cmlidXRlVXBkYXRlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZhbHVlVXBkYXRlJzpcbiAgICAgICAgZW5kcG9pbnQgPSBlbmRwb2ludHM/LnZhbHVlVXBkYXRlO1xuICAgIH1cblxuICAgIGlmICghZW5kcG9pbnQpIHtcbiAgICAgIGVuZHBvaW50ID0gJ2NvbmZpZ3VyYXRpb25zJztcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYCR7ZW5kcG9pbnROYW1lfSBlbmRwb2ludCBjb25maWd1cmF0aW9uIG1pc3NpbmcgZm9yIGNwcSBiYWNrZW5kLCBwbGVhc2UgcHJvdmlkZSBpdCB2aWEga2V5OiBcImJhY2tlbmQuY3BxLmVuZHBvaW50cy4ke2VuZHBvaW50TmFtZX1cImBcbiAgICAgICk7XG4gICAgfVxuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5iYWNrZW5kPy5jcHE/LnByZWZpeCArIGVuZHBvaW50O1xuICAgIHVybCA9IHVybFBhcmFtcyA/IFN0cmluZ1RlbXBsYXRlLnJlc29sdmUodXJsLCB1cmxQYXJhbXMpIDogdXJsO1xuICAgIHVybCA9IHF1ZXJ5UGFyYW1zID8gdGhpcy5hcHBlbmRRdWVyeVBhcmFtZXRlcnModXJsLCBxdWVyeVBhcmFtcykgOiB1cmw7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBlbmRRdWVyeVBhcmFtZXRlcnMoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcGFyYW1ldGVyczogW3sgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1dXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IHVybFdpdGhQYXJhbWV0ZXJzID0gdXJsICsgJz8nO1xuICAgIHBhcmFtZXRlcnMuZm9yRWFjaCgocGFyYW0sIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICB1cmxXaXRoUGFyYW1ldGVycyA9IGlkeCA+IDAgPyB1cmxXaXRoUGFyYW1ldGVycyArICcmJyA6IHVybFdpdGhQYXJhbWV0ZXJzO1xuICAgICAgdXJsV2l0aFBhcmFtZXRlcnMgPSBgJHt1cmxXaXRoUGFyYW1ldGVyc30ke3BhcmFtLm5hbWV9PSR7cGFyYW0udmFsdWV9YDtcbiAgICB9KTtcbiAgICByZXR1cm4gdXJsV2l0aFBhcmFtZXRlcnM7XG4gIH1cbn1cbiJdfQ==