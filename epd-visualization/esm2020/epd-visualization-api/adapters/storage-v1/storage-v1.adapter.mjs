import { Injectable } from '@angular/core';
import { normalizeHttpError } from '@spartacus/core';
import { NODES_RESPONSE_NORMALIZER, } from '@spartacus/epd-visualization/core';
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
export class StorageV1Adapter {
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
        return `${visualizationApiConfig.baseUrl}/vis/public/storage`;
    }
    getUrl(sceneId, nodeIds, $expand, $filter, contentType) {
        const queryParts = [];
        if (nodeIds) {
            nodeIds.forEach((nodeId) => queryParts.push(`id=${nodeId}`));
        }
        if ($expand) {
            queryParts.push(`$expand=${$expand.join(',')}`);
        }
        if ($filter) {
            queryParts.push(`$filter=${$filter.join(',')}`);
        }
        if (contentType) {
            queryParts.push(`contentType=${contentType}`);
        }
        const queryString = queryParts.length
            ? `?${queryParts.join('&')}`
            : '';
        return `${this.baseUrl}/v1/scenes/${sceneId}/nodes${queryString}`;
    }
    /**
     * Used for getting information about scene nodes (such as metadata used to store usage ID values).
     * @param sceneId The scene id to use as the sceneId path parameter.
     * @param nodeIds An array of scene node ids to pass in id query parameters.
     * @param $expand A set of strings to combine to form the $expand query parameter.
     * @param $filter A set of strings to combine to form the $filter query parameter.
     * @param contentType The contentType query parameter.
     * @returns An Observable producing a NodesResponse which contains an array of objects describing scene nodes.
     */
    getNodes(sceneId, nodeIds, $expand, $filter, contentType) {
        return this.http
            .get(this.getUrl(sceneId, nodeIds, $expand, $filter, contentType))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(NODES_RESPONSE_NORMALIZER));
    }
}
StorageV1Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StorageV1Adapter, deps: [{ token: i1.HttpClient }, { token: i2.EpdVisualizationConfig }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
StorageV1Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StorageV1Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StorageV1Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.EpdVisualizationConfig }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS12MS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9lcGQtdmlzdWFsaXphdGlvbi1hcGkvYWRhcHRlcnMvc3RvcmFnZS12MS9zdG9yYWdlLXYxLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUVMLHlCQUF5QixHQUUxQixNQUFNLG1DQUFtQyxDQUFDO0FBTTNDLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUU1Qzs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFDWSxJQUFnQixFQUNoQixzQkFBOEMsRUFDOUMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBRXJDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFJTyxVQUFVO1FBQ2hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQjthQUNqRCxnQkFBK0MsQ0FBQztRQUNuRCxNQUFNLHNCQUFzQixHQUMxQixnQkFBZ0IsQ0FBQyxJQUE4QixDQUFDO1FBRWxELE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLHFCQUFxQixDQUFDO0lBQ2hFLENBQUM7SUFFUyxNQUFNLENBQ2QsT0FBZSxFQUNmLE9BQWtCLEVBQ2xCLE9BQWtCLEVBQ2xCLE9BQWtCLEVBQ2xCLFdBQW9CO1FBRXBCLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1gsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxXQUFXLEVBQUU7WUFDZixVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUMvQztRQUNELE1BQU0sV0FBVyxHQUFXLFVBQVUsQ0FBQyxNQUFNO1lBQzNDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxjQUFjLE9BQU8sU0FBUyxXQUFXLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxRQUFRLENBQ04sT0FBZSxFQUNmLE9BQWtCLEVBQ2xCLE9BQWtCLEVBQ2xCLE9BQWtCLEVBQ2xCLFdBQW9CO1FBRXBCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDakUsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FDbkQsQ0FBQztJQUNOLENBQUM7OzZHQXBFVSxnQkFBZ0I7aUhBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UsIG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBOb2Rlc1Jlc3BvbnNlLFxuICBOT0RFU19SRVNQT05TRV9OT1JNQUxJWkVSLFxuICBTY2VuZUFkYXB0ZXIsXG59IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vY29yZSc7XG5pbXBvcnQge1xuICBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICBFcGRWaXN1YWxpemF0aW9uSW5uZXJDb25maWcsXG4gIFZpc3VhbGl6YXRpb25BcGlDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgYWRhcHRlciByZWZlcmVuY2VzIGFuIEFQSSB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIGRlcHJlY2F0ZWQgYW5kIHJlbG9jYXRlZFxuICogc2luY2UgbXVsdGlwbGUgbWljcm9zZXJ2aWNlIEFQSXMgYXJlIGJlaW5nIGNvbWJpbmVkIGludG8gYSBzaW5nbGUgbmFtZXNwYWNlLlxuICogQSBuZXcgYWRhcHRlciBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIGFkZGVkIGFuZCB0aGlzIG9uZSB3aWxsIGJlIGRlcHJlY2F0ZWRcbiAqIHdoZW4gdGhlIG5ldyBlbmRwb2ludCBpcyBhdmFpbGFibGUuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yYWdlVjFBZGFwdGVyIGltcGxlbWVudHMgU2NlbmVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIGVwZFZpc3VhbGl6YXRpb25Db25maWc6IEVwZFZpc3VhbGl6YXRpb25Db25maWcsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmJhc2VVcmwgPSB0aGlzLmdldEJhc2VVcmwoKTtcbiAgfVxuXG4gIHByaXZhdGUgYmFzZVVybDogc3RyaW5nO1xuXG4gIHByaXZhdGUgZ2V0QmFzZVVybCgpIHtcbiAgICBjb25zdCBlcGRWaXN1YWxpemF0aW9uID0gdGhpcy5lcGRWaXN1YWxpemF0aW9uQ29uZmlnXG4gICAgICAuZXBkVmlzdWFsaXphdGlvbiBhcyBFcGRWaXN1YWxpemF0aW9uSW5uZXJDb25maWc7XG4gICAgY29uc3QgdmlzdWFsaXphdGlvbkFwaUNvbmZpZyA9XG4gICAgICBlcGRWaXN1YWxpemF0aW9uLmFwaXMgYXMgVmlzdWFsaXphdGlvbkFwaUNvbmZpZztcblxuICAgIHJldHVybiBgJHt2aXN1YWxpemF0aW9uQXBpQ29uZmlnLmJhc2VVcmx9L3Zpcy9wdWJsaWMvc3RvcmFnZWA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0VXJsKFxuICAgIHNjZW5lSWQ6IHN0cmluZyxcbiAgICBub2RlSWRzPzogc3RyaW5nW10sXG4gICAgJGV4cGFuZD86IHN0cmluZ1tdLFxuICAgICRmaWx0ZXI/OiBzdHJpbmdbXSxcbiAgICBjb250ZW50VHlwZT86IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IHF1ZXJ5UGFydHM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKG5vZGVJZHMpIHtcbiAgICAgIG5vZGVJZHMuZm9yRWFjaCgobm9kZUlkKSA9PiBxdWVyeVBhcnRzLnB1c2goYGlkPSR7bm9kZUlkfWApKTtcbiAgICB9XG4gICAgaWYgKCRleHBhbmQpIHtcbiAgICAgIHF1ZXJ5UGFydHMucHVzaChgJGV4cGFuZD0keyRleHBhbmQuam9pbignLCcpfWApO1xuICAgIH1cbiAgICBpZiAoJGZpbHRlcikge1xuICAgICAgcXVlcnlQYXJ0cy5wdXNoKGAkZmlsdGVyPSR7JGZpbHRlci5qb2luKCcsJyl9YCk7XG4gICAgfVxuICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgcXVlcnlQYXJ0cy5wdXNoKGBjb250ZW50VHlwZT0ke2NvbnRlbnRUeXBlfWApO1xuICAgIH1cbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gcXVlcnlQYXJ0cy5sZW5ndGhcbiAgICAgID8gYD8ke3F1ZXJ5UGFydHMuam9pbignJicpfWBcbiAgICAgIDogJyc7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZVVybH0vdjEvc2NlbmVzLyR7c2NlbmVJZH0vbm9kZXMke3F1ZXJ5U3RyaW5nfWA7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBmb3IgZ2V0dGluZyBpbmZvcm1hdGlvbiBhYm91dCBzY2VuZSBub2RlcyAoc3VjaCBhcyBtZXRhZGF0YSB1c2VkIHRvIHN0b3JlIHVzYWdlIElEIHZhbHVlcykuXG4gICAqIEBwYXJhbSBzY2VuZUlkIFRoZSBzY2VuZSBpZCB0byB1c2UgYXMgdGhlIHNjZW5lSWQgcGF0aCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSBub2RlSWRzIEFuIGFycmF5IG9mIHNjZW5lIG5vZGUgaWRzIHRvIHBhc3MgaW4gaWQgcXVlcnkgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtICRleHBhbmQgQSBzZXQgb2Ygc3RyaW5ncyB0byBjb21iaW5lIHRvIGZvcm0gdGhlICRleHBhbmQgcXVlcnkgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0gJGZpbHRlciBBIHNldCBvZiBzdHJpbmdzIHRvIGNvbWJpbmUgdG8gZm9ybSB0aGUgJGZpbHRlciBxdWVyeSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSBjb250ZW50VHlwZSBUaGUgY29udGVudFR5cGUgcXVlcnkgcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJucyBBbiBPYnNlcnZhYmxlIHByb2R1Y2luZyBhIE5vZGVzUmVzcG9uc2Ugd2hpY2ggY29udGFpbnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBkZXNjcmliaW5nIHNjZW5lIG5vZGVzLlxuICAgKi9cbiAgZ2V0Tm9kZXMoXG4gICAgc2NlbmVJZDogc3RyaW5nLFxuICAgIG5vZGVJZHM/OiBzdHJpbmdbXSxcbiAgICAkZXhwYW5kPzogc3RyaW5nW10sXG4gICAgJGZpbHRlcj86IHN0cmluZ1tdLFxuICAgIGNvbnRlbnRUeXBlPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Tm9kZXNSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoc2NlbmVJZCwgbm9kZUlkcywgJGV4cGFuZCwgJGZpbHRlciwgY29udGVudFR5cGUpKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoTk9ERVNfUkVTUE9OU0VfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==