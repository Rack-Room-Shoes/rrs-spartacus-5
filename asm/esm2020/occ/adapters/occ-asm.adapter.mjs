/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CUSTOMER_SEARCH_PAGE_NORMALIZER, } from '@spartacus/asm/core';
import { InterceptorUtil, USE_CUSTOMER_SUPPORT_AGENT_TOKEN, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/asm/core";
export class OccAsmAdapter {
    constructor(http, occEndpointsService, converterService, config, baseSiteService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
        this.config = config;
        this.baseSiteService = baseSiteService;
        this.baseSiteService
            .getActive()
            .subscribe((value) => (this.activeBaseSite = value));
    }
    customerSearch(options) {
        const headers = InterceptorUtil.createHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, true, new HttpHeaders());
        let params = new HttpParams()
            .set('baseSite', this.activeBaseSite)
            .set('sort', 'byNameAsc');
        if (typeof options['query'] !== 'undefined') {
            params = params.set('query', '' + options.query);
        }
        if (typeof options['pageSize'] !== 'undefined') {
            params = params.set('pageSize', '' + options.pageSize);
        }
        const url = this.occEndpointsService.buildUrl('asmCustomerSearch', {}, {
            baseSite: false,
            prefix: false,
        });
        return this.http
            .get(url, { headers, params })
            .pipe(this.converterService.pipeable(CUSTOMER_SEARCH_PAGE_NORMALIZER));
    }
}
OccAsmAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccAsmAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }, { token: i3.AsmConfig }, { token: i2.BaseSiteService }], target: i0.ɵɵFactoryTarget.Injectable });
OccAsmAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccAsmAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccAsmAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }, { type: i3.AsmConfig }, { type: i2.BaseSiteService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWFzbS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9vY2MvYWRhcHRlcnMvb2NjLWFzbS5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUtMLCtCQUErQixHQUNoQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFHTCxlQUFlLEVBRWYsZ0NBQWdDLEdBQ2pDLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBSXpCLE1BQU0sT0FBTyxhQUFhO0lBR3hCLFlBQ1ksSUFBZ0IsRUFDaEIsbUJBQXdDLEVBQ3hDLGdCQUFrQyxFQUNsQyxNQUFpQixFQUNqQixlQUFnQztRQUpoQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUUxQyxJQUFJLENBQUMsZUFBZTthQUNqQixTQUFTLEVBQUU7YUFDWCxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxjQUFjLENBQ1osT0FBOEI7UUFFOUIsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FDMUMsZ0NBQWdDLEVBQ2hDLElBQUksRUFDSixJQUFJLFdBQVcsRUFBRSxDQUNsQixDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQWUsSUFBSSxVQUFVLEVBQUU7YUFDdEMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ3BDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFNUIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDM0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUM5QyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4RDtRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQzNDLG1CQUFtQixFQUNuQixFQUFFLEVBQ0Y7WUFDRSxRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FDRixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBcUIsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO2FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDOzswR0EvQ1UsYUFBYTs4R0FBYixhQUFhOzJGQUFiLGFBQWE7a0JBRHpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFzbUFkYXB0ZXIsXG4gIEFzbUNvbmZpZyxcbiAgQ3VzdG9tZXJTZWFyY2hPcHRpb25zLFxuICBDdXN0b21lclNlYXJjaFBhZ2UsXG4gIENVU1RPTUVSX1NFQVJDSF9QQUdFX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvYXNtL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZVNpdGVTZXJ2aWNlLFxuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBJbnRlcmNlcHRvclV0aWwsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIFVTRV9DVVNUT01FUl9TVVBQT1JUX0FHRU5UX1RPS0VOLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2NjQXNtQWRhcHRlciBpbXBsZW1lbnRzIEFzbUFkYXB0ZXIge1xuICBwcml2YXRlIGFjdGl2ZUJhc2VTaXRlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50c1NlcnZpY2U6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlclNlcnZpY2U6IENvbnZlcnRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQXNtQ29uZmlnLFxuICAgIHByb3RlY3RlZCBiYXNlU2l0ZVNlcnZpY2U6IEJhc2VTaXRlU2VydmljZVxuICApIHtcbiAgICB0aGlzLmJhc2VTaXRlU2VydmljZVxuICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4gKHRoaXMuYWN0aXZlQmFzZVNpdGUgPSB2YWx1ZSkpO1xuICB9XG5cbiAgY3VzdG9tZXJTZWFyY2goXG4gICAgb3B0aW9uczogQ3VzdG9tZXJTZWFyY2hPcHRpb25zXG4gICk6IE9ic2VydmFibGU8Q3VzdG9tZXJTZWFyY2hQYWdlPiB7XG4gICAgY29uc3QgaGVhZGVycyA9IEludGVyY2VwdG9yVXRpbC5jcmVhdGVIZWFkZXIoXG4gICAgICBVU0VfQ1VTVE9NRVJfU1VQUE9SVF9BR0VOVF9UT0tFTixcbiAgICAgIHRydWUsXG4gICAgICBuZXcgSHR0cEhlYWRlcnMoKVxuICAgICk7XG4gICAgbGV0IHBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgIC5zZXQoJ2Jhc2VTaXRlJywgdGhpcy5hY3RpdmVCYXNlU2l0ZSlcbiAgICAgIC5zZXQoJ3NvcnQnLCAnYnlOYW1lQXNjJyk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnNbJ3F1ZXJ5J10gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdxdWVyeScsICcnICsgb3B0aW9ucy5xdWVyeSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zWydwYWdlU2l6ZSddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgncGFnZVNpemUnLCAnJyArIG9wdGlvbnMucGFnZVNpemUpO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybChcbiAgICAgICdhc21DdXN0b21lclNlYXJjaCcsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgYmFzZVNpdGU6IGZhbHNlLFxuICAgICAgICBwcmVmaXg6IGZhbHNlLFxuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PEN1c3RvbWVyU2VhcmNoUGFnZT4odXJsLCB7IGhlYWRlcnMsIHBhcmFtcyB9KVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENVU1RPTUVSX1NFQVJDSF9QQUdFX05PUk1BTElaRVIpKTtcbiAgfVxufVxuIl19