import { Injectable } from '@angular/core';
import { COST_CENTERS_NORMALIZER } from '../../../cost-center/connectors/cost-center/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccUserCostCenterAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    loadActiveList(userId) {
        return this.http
            .get(this.getCostCentersEndpoint(userId))
            .pipe(this.converter.pipeable(COST_CENTERS_NORMALIZER));
    }
    getCostCentersEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('getActiveCostCenters', {
            urlParams: { userId },
            queryParams: params,
        });
    }
}
OccUserCostCenterAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccUserCostCenterAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserCostCenterAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccUserCostCenterAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccUserCostCenterAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXVzZXItY29zdC1jZW50ZXJzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvdXNlci9vY2MtdXNlci1jb3N0LWNlbnRlcnMuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDOzs7OztBQVVqRyxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVKLGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQXNCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFUyxzQkFBc0IsQ0FDOUIsTUFBYyxFQUNkLE1BQXFCO1FBRXJCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDeEQsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQ3JCLFdBQVcsRUFBRSxNQUFNO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUM7O3FIQXJCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENPU1RfQ0VOVEVSU19OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vY29zdC1jZW50ZXIvY29ubmVjdG9ycy9jb3N0LWNlbnRlci9jb252ZXJ0ZXJzJztcbmltcG9ydCB7IEVudGl0aWVzTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9taXNjLm1vZGVsJztcbmltcG9ydCB7IENvc3RDZW50ZXIgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9vcmctdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBTZWFyY2hDb25maWcgfSBmcm9tICcuLi8uLi8uLi9wcm9kdWN0L21vZGVsL3NlYXJjaC1jb25maWcnO1xuaW1wb3J0IHsgVXNlckNvc3RDZW50ZXJBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vdXNlci9jb25uZWN0b3JzL2Nvc3QtY2VudGVyL3VzZXItY29zdC1jZW50ZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPY2MgfSBmcm9tICcuLi8uLi9vY2MtbW9kZWxzL29jYy5tb2RlbHMnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NVc2VyQ29zdENlbnRlckFkYXB0ZXIgaW1wbGVtZW50cyBVc2VyQ29zdENlbnRlckFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIGxvYWRBY3RpdmVMaXN0KHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPENvc3RDZW50ZXI+PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxPY2MuQ29zdENlbnRlcnNMaXN0Pih0aGlzLmdldENvc3RDZW50ZXJzRW5kcG9pbnQodXNlcklkKSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKENPU1RfQ0VOVEVSU19OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29zdENlbnRlcnNFbmRwb2ludChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwYXJhbXM/OiBTZWFyY2hDb25maWdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ2dldEFjdGl2ZUNvc3RDZW50ZXJzJywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCB9LFxuICAgICAgcXVlcnlQYXJhbXM6IHBhcmFtcyxcbiAgICB9KTtcbiAgfVxufVxuIl19