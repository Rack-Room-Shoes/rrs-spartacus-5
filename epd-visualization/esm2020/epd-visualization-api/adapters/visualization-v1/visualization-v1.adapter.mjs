import { Injectable } from '@angular/core';
import { normalizeHttpError } from '@spartacus/core';
import { LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER, } from '@spartacus/epd-visualization/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/epd-visualization/root";
import * as i3 from "@spartacus/core";
/**
 * This adapter references an API that is expected to be deprecated and relocated
 * since multiple microservice APIs are being combined into a single namespace.
 * A new adapter implementation will be added and this one will be deprecated
 * when the new endpoint is available.
 */
export class VisualizationV1Adapter {
    constructor(http, epdVisualizationConfig, converter) {
        this.http = http;
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.converter = converter;
        this.baseUrl = this.getBaseUrl();
    }
    getBaseUrl() {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualizationApiConfig = epdVisualization.apis;
        return `${visualizationApiConfig.baseUrl}/vis/public/visualization`;
    }
    getUrl(visualizationUsageId, folderUsageId) {
        const queryParts = [
            `usage=${encodeURIComponent(JSON.stringify(visualizationUsageId))}`,
            `folderUsageId=${encodeURIComponent(JSON.stringify(folderUsageId))}`,
        ];
        return `${this.baseUrl}/v1/lookup/visualization?${queryParts.join('&')}`;
    }
    /**
     * Used for finding a visualization by Usage ID that has anonymous (unauthenticated) read access enabled.
     * The search is performed in the SAP EPD Visualization service instance associated with the SaaS subscription for the SAP EPD tenant.
     * @param visualizationUsageId The SAP EPD Visualization usage ID value identifying visualizations to match.
     * Only visualizations that have the specified usage ID value will be returned.
     * @param folderUsageId The SAP EPD Visualization usage ID identifying folders to search for visualizations.
     * Only folders that are tagged with the specified usage ID value that have anonymous access enabled will be searched.
     * @returns An Observable producing a LookupVisualizationsResponse which contains an array of objects describing matched visualizations.
     */
    lookupVisualization(visualizationUsageId, folderUsageId) {
        return this.http.get(this.getUrl(visualizationUsageId, folderUsageId)).pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER));
    }
}
VisualizationV1Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualizationV1Adapter, deps: [{ token: i1.HttpClient }, { token: i2.EpdVisualizationConfig }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
VisualizationV1Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualizationV1Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualizationV1Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.EpdVisualizationConfig }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi12MS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9lcGQtdmlzdWFsaXphdGlvbi1hcGkvYWRhcHRlcnMvdmlzdWFsaXphdGlvbi12MS92aXN1YWxpemF0aW9uLXYxLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHlDQUF5QyxHQUUxQyxNQUFNLG1DQUFtQyxDQUFDO0FBTzNDLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUU1Qzs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDWSxJQUFnQixFQUNoQixzQkFBOEMsRUFDOUMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBRXJDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFJTyxVQUFVO1FBQ2hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQjthQUNqRCxnQkFBK0MsQ0FBQztRQUNuRCxNQUFNLHNCQUFzQixHQUMxQixnQkFBZ0IsQ0FBQyxJQUE4QixDQUFDO1FBRWxELE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLDJCQUEyQixDQUFDO0lBQ3RFLENBQUM7SUFFUyxNQUFNLENBQ2Qsb0JBQTZCLEVBQzdCLGFBQXNCO1FBRXRCLE1BQU0sVUFBVSxHQUFhO1lBQzNCLFNBQVMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUU7WUFDbkUsaUJBQWlCLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtTQUNyRSxDQUFDO1FBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLDRCQUE0QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsbUJBQW1CLENBQ2pCLG9CQUE2QixFQUM3QixhQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pFLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMseUNBQXlDLENBQUMsQ0FDbkUsQ0FBQztJQUNKLENBQUM7O21IQWhEVSxzQkFBc0I7dUhBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UsIG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBMb29rdXBWaXN1YWxpemF0aW9uc1Jlc3BvbnNlLFxuICBMT09LVVBfVklTVUFMSVpBVElPTlNfUkVTUE9OU0VfTk9STUFMSVpFUixcbiAgVmlzdWFsaXphdGlvbkFkYXB0ZXIsXG59IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vY29yZSc7XG5pbXBvcnQge1xuICBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICBFcGRWaXN1YWxpemF0aW9uSW5uZXJDb25maWcsXG4gIFVzYWdlSWQsXG4gIFZpc3VhbGl6YXRpb25BcGlDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciByZWZlcmVuY2VzIGFuIEFQSSB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIGRlcHJlY2F0ZWQgYW5kIHJlbG9jYXRlZFxuICogc2luY2UgbXVsdGlwbGUgbWljcm9zZXJ2aWNlIEFQSXMgYXJlIGJlaW5nIGNvbWJpbmVkIGludG8gYSBzaW5nbGUgbmFtZXNwYWNlLlxuICogQSBuZXcgYWRhcHRlciBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIGFkZGVkIGFuZCB0aGlzIG9uZSB3aWxsIGJlIGRlcHJlY2F0ZWRcbiAqIHdoZW4gdGhlIG5ldyBlbmRwb2ludCBpcyBhdmFpbGFibGUuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uVjFBZGFwdGVyIGltcGxlbWVudHMgVmlzdWFsaXphdGlvbkFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgZXBkVmlzdWFsaXphdGlvbkNvbmZpZzogRXBkVmlzdWFsaXphdGlvbkNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuYmFzZVVybCA9IHRoaXMuZ2V0QmFzZVVybCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBiYXNlVXJsOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBnZXRCYXNlVXJsKCkge1xuICAgIGNvbnN0IGVwZFZpc3VhbGl6YXRpb24gPSB0aGlzLmVwZFZpc3VhbGl6YXRpb25Db25maWdcbiAgICAgIC5lcGRWaXN1YWxpemF0aW9uIGFzIEVwZFZpc3VhbGl6YXRpb25Jbm5lckNvbmZpZztcbiAgICBjb25zdCB2aXN1YWxpemF0aW9uQXBpQ29uZmlnID1cbiAgICAgIGVwZFZpc3VhbGl6YXRpb24uYXBpcyBhcyBWaXN1YWxpemF0aW9uQXBpQ29uZmlnO1xuXG4gICAgcmV0dXJuIGAke3Zpc3VhbGl6YXRpb25BcGlDb25maWcuYmFzZVVybH0vdmlzL3B1YmxpYy92aXN1YWxpemF0aW9uYDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRVcmwoXG4gICAgdmlzdWFsaXphdGlvblVzYWdlSWQ6IFVzYWdlSWQsXG4gICAgZm9sZGVyVXNhZ2VJZDogVXNhZ2VJZFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IHF1ZXJ5UGFydHM6IHN0cmluZ1tdID0gW1xuICAgICAgYHVzYWdlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHZpc3VhbGl6YXRpb25Vc2FnZUlkKSl9YCxcbiAgICAgIGBmb2xkZXJVc2FnZUlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZvbGRlclVzYWdlSWQpKX1gLFxuICAgIF07XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vdjEvbG9va3VwL3Zpc3VhbGl6YXRpb24/JHtxdWVyeVBhcnRzLmpvaW4oJyYnKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgZm9yIGZpbmRpbmcgYSB2aXN1YWxpemF0aW9uIGJ5IFVzYWdlIElEIHRoYXQgaGFzIGFub255bW91cyAodW5hdXRoZW50aWNhdGVkKSByZWFkIGFjY2VzcyBlbmFibGVkLlxuICAgKiBUaGUgc2VhcmNoIGlzIHBlcmZvcm1lZCBpbiB0aGUgU0FQIEVQRCBWaXN1YWxpemF0aW9uIHNlcnZpY2UgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBTYWFTIHN1YnNjcmlwdGlvbiBmb3IgdGhlIFNBUCBFUEQgdGVuYW50LlxuICAgKiBAcGFyYW0gdmlzdWFsaXphdGlvblVzYWdlSWQgVGhlIFNBUCBFUEQgVmlzdWFsaXphdGlvbiB1c2FnZSBJRCB2YWx1ZSBpZGVudGlmeWluZyB2aXN1YWxpemF0aW9ucyB0byBtYXRjaC5cbiAgICogT25seSB2aXN1YWxpemF0aW9ucyB0aGF0IGhhdmUgdGhlIHNwZWNpZmllZCB1c2FnZSBJRCB2YWx1ZSB3aWxsIGJlIHJldHVybmVkLlxuICAgKiBAcGFyYW0gZm9sZGVyVXNhZ2VJZCBUaGUgU0FQIEVQRCBWaXN1YWxpemF0aW9uIHVzYWdlIElEIGlkZW50aWZ5aW5nIGZvbGRlcnMgdG8gc2VhcmNoIGZvciB2aXN1YWxpemF0aW9ucy5cbiAgICogT25seSBmb2xkZXJzIHRoYXQgYXJlIHRhZ2dlZCB3aXRoIHRoZSBzcGVjaWZpZWQgdXNhZ2UgSUQgdmFsdWUgdGhhdCBoYXZlIGFub255bW91cyBhY2Nlc3MgZW5hYmxlZCB3aWxsIGJlIHNlYXJjaGVkLlxuICAgKiBAcmV0dXJucyBBbiBPYnNlcnZhYmxlIHByb2R1Y2luZyBhIExvb2t1cFZpc3VhbGl6YXRpb25zUmVzcG9uc2Ugd2hpY2ggY29udGFpbnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBkZXNjcmliaW5nIG1hdGNoZWQgdmlzdWFsaXphdGlvbnMuXG4gICAqL1xuICBsb29rdXBWaXN1YWxpemF0aW9uKFxuICAgIHZpc3VhbGl6YXRpb25Vc2FnZUlkOiBVc2FnZUlkLFxuICAgIGZvbGRlclVzYWdlSWQ6IFVzYWdlSWRcbiAgKTogT2JzZXJ2YWJsZTxMb29rdXBWaXN1YWxpemF0aW9uc1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5nZXRVcmwodmlzdWFsaXphdGlvblVzYWdlSWQsIGZvbGRlclVzYWdlSWQpKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSkpLFxuICAgICAgdGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoTE9PS1VQX1ZJU1VBTElaQVRJT05TX1JFU1BPTlNFX05PUk1BTElaRVIpXG4gICAgKTtcbiAgfVxufVxuIl19