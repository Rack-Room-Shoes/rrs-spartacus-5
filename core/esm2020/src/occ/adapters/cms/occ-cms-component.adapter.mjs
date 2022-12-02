/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { CMS_COMPONENT_NORMALIZER } from '../../../cms/connectors/component/converters';
import { PageType } from '../../../model/cms.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccCmsComponentAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }
    load(id, pageContext) {
        return this.http
            .get(this.getComponentEndPoint(id, pageContext), {
            headers: this.headers,
        })
            .pipe(this.converter.pipeable(CMS_COMPONENT_NORMALIZER));
    }
    findComponentsByIds(ids, pageContext, fields = 'DEFAULT', currentPage = 0, pageSize = ids.length, sort) {
        const requestParams = {
            ...this.getContextParams(pageContext),
            ...this.getPaginationParams(currentPage, pageSize, sort),
        };
        requestParams['componentIds'] = ids.toString();
        return this.http
            .get(this.getComponentsEndpoint(requestParams, fields), {
            headers: this.headers,
        })
            .pipe(pluck('component'), map((components) => components ?? []), this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER));
    }
    getComponentEndPoint(id, pageContext) {
        return this.occEndpoints.buildUrl('component', {
            urlParams: { id },
            queryParams: this.getContextParams(pageContext),
        });
    }
    getComponentsEndpoint(requestParams, fields) {
        return this.occEndpoints.buildUrl('components', {
            queryParams: { fields, ...requestParams },
        });
    }
    getPaginationParams(currentPage, pageSize, sort) {
        const requestParams = {};
        if (currentPage !== undefined) {
            requestParams['currentPage'] = currentPage.toString();
        }
        if (pageSize !== undefined) {
            requestParams['pageSize'] = pageSize.toString();
        }
        if (sort !== undefined) {
            requestParams['sort'] = sort;
        }
        return requestParams;
    }
    getContextParams(pageContext) {
        let requestParams = {};
        switch (pageContext.type) {
            case PageType.PRODUCT_PAGE: {
                requestParams = { productCode: pageContext.id };
                break;
            }
            case PageType.CATEGORY_PAGE: {
                requestParams = { categoryCode: pageContext.id };
                break;
            }
            case PageType.CATALOG_PAGE: {
                requestParams = { catalogCode: pageContext.id };
                break;
            }
        }
        return requestParams;
    }
}
OccCmsComponentAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsComponentAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCmsComponentAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsComponentAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsComponentAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNtcy1jb21wb25lbnQuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy9jbXMvb2NjLWNtcy1jb21wb25lbnQuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RixPQUFPLEVBQWdCLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQVNsRSxNQUFNLE9BQU8sc0JBQXNCO0lBR2pDLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFMN0IsWUFBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBTTNFLENBQUM7SUFFSixJQUFJLENBQ0YsRUFBVSxFQUNWLFdBQXdCO1FBRXhCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsRUFBRTtZQUNsRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBUyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJ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ckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50QWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb25uZWN0b3JzL2NvbXBvbmVudC9jbXMtY29tcG9uZW50LmFkYXB0ZXInO1xuaW1wb3J0IHsgQ01TX0NPTVBPTkVOVF9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vY21zL2Nvbm5lY3RvcnMvY29tcG9uZW50L2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50LCBQYWdlVHlwZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2Ntcy5tb2RlbCc7XG5pbXBvcnQgeyBQYWdlQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL3JvdXRpbmcnO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vY2MtZW5kcG9pbnRzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjQ21zQ29tcG9uZW50QWRhcHRlciBpbXBsZW1lbnRzIENtc0NvbXBvbmVudEFkYXB0ZXIge1xuICBwcm90ZWN0ZWQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIGxvYWQ8VCBleHRlbmRzIENtc0NvbXBvbmVudD4oXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHRcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxUPih0aGlzLmdldENvbXBvbmVudEVuZFBvaW50KGlkLCBwYWdlQ29udGV4dCksIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgfSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlPGFueSwgVD4oQ01TX0NPTVBPTkVOVF9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBmaW5kQ29tcG9uZW50c0J5SWRzKFxuICAgIGlkczogc3RyaW5nW10sXG4gICAgcGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0LFxuICAgIGZpZWxkcyA9ICdERUZBVUxUJyxcbiAgICBjdXJyZW50UGFnZSA9IDAsXG4gICAgcGFnZVNpemUgPSBpZHMubGVuZ3RoLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDbXNDb21wb25lbnRbXT4ge1xuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSB7XG4gICAgICAuLi50aGlzLmdldENvbnRleHRQYXJhbXMocGFnZUNvbnRleHQpLFxuICAgICAgLi4udGhpcy5nZXRQYWdpbmF0aW9uUGFyYW1zKGN1cnJlbnRQYWdlLCBwYWdlU2l6ZSwgc29ydCksXG4gICAgfTtcblxuICAgIHJlcXVlc3RQYXJhbXNbJ2NvbXBvbmVudElkcyddID0gaWRzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE9jYy5Db21wb25lbnRMaXN0PihcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnRzRW5kcG9pbnQocmVxdWVzdFBhcmFtcywgZmllbGRzKSxcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHBsdWNrKCdjb21wb25lbnQnKSxcbiAgICAgICAgbWFwKChjb21wb25lbnRzKSA9PiBjb21wb25lbnRzID8/IFtdKSxcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIucGlwZWFibGVNYW55KENNU19DT01QT05FTlRfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50RW5kUG9pbnQoaWQ6IHN0cmluZywgcGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ2NvbXBvbmVudCcsIHtcbiAgICAgIHVybFBhcmFtczogeyBpZCB9LFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMuZ2V0Q29udGV4dFBhcmFtcyhwYWdlQ29udGV4dCksXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50c0VuZHBvaW50KHJlcXVlc3RQYXJhbXM6IGFueSwgZmllbGRzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnY29tcG9uZW50cycsIHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7IGZpZWxkcywgLi4ucmVxdWVzdFBhcmFtcyB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhZ2luYXRpb25QYXJhbXMoXG4gICAgY3VycmVudFBhZ2U/OiBudW1iZXIsXG4gICAgcGFnZVNpemU/OiBudW1iZXIsXG4gICAgc29ydD86IHN0cmluZ1xuICApOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgaWYgKGN1cnJlbnRQYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3RQYXJhbXNbJ2N1cnJlbnRQYWdlJ10gPSBjdXJyZW50UGFnZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAocGFnZVNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdFBhcmFtc1sncGFnZVNpemUnXSA9IHBhZ2VTaXplLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChzb3J0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3RQYXJhbXNbJ3NvcnQnXSA9IHNvcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RQYXJhbXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29udGV4dFBhcmFtcyhwYWdlQ29udGV4dDogUGFnZUNvbnRleHQpOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICB9IHtcbiAgICBsZXQgcmVxdWVzdFBhcmFtcyA9IHt9O1xuICAgIHN3aXRjaCAocGFnZUNvbnRleHQudHlwZSkge1xuICAgICAgY2FzZSBQYWdlVHlwZS5QUk9EVUNUX1BBR0U6IHtcbiAgICAgICAgcmVxdWVzdFBhcmFtcyA9IHsgcHJvZHVjdENvZGU6IHBhZ2VDb250ZXh0LmlkIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBQYWdlVHlwZS5DQVRFR09SWV9QQUdFOiB7XG4gICAgICAgIHJlcXVlc3RQYXJhbXMgPSB7IGNhdGVnb3J5Q29kZTogcGFnZUNvbnRleHQuaWQgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFBhZ2VUeXBlLkNBVEFMT0dfUEFHRToge1xuICAgICAgICByZXF1ZXN0UGFyYW1zID0geyBjYXRhbG9nQ29kZTogcGFnZUNvbnRleHQuaWQgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RQYXJhbXM7XG4gIH1cbn1cbiJdfQ==