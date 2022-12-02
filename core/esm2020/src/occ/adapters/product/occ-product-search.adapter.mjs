import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { PRODUCT_SEARCH_PAGE_NORMALIZER, PRODUCT_SUGGESTION_NORMALIZER, } from '../../../product/connectors/search/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
const DEFAULT_SEARCH_CONFIG = {
    pageSize: 20,
};
export class OccProductSearchAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    search(query, searchConfig = DEFAULT_SEARCH_CONFIG) {
        return this.http
            .get(this.getSearchEndpoint(query, searchConfig))
            .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
    }
    loadSuggestions(term, pageSize = 3) {
        return this.http
            .get(this.getSuggestionEndpoint(term, pageSize.toString()))
            .pipe(pluck('suggestions'), map((suggestions) => suggestions ?? []), this.converter.pipeableMany(PRODUCT_SUGGESTION_NORMALIZER));
    }
    getSearchEndpoint(query, searchConfig) {
        return this.occEndpoints.buildUrl('productSearch', {
            queryParams: { query, ...searchConfig },
        });
    }
    getSuggestionEndpoint(term, max) {
        return this.occEndpoints.buildUrl('productSuggestions', {
            queryParams: { term, max },
        });
    }
}
OccProductSearchAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccProductSearchAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccProductSearchAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccProductSearchAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccProductSearchAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXByb2R1Y3Qtc2VhcmNoLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvcHJvZHVjdC9vY2MtcHJvZHVjdC1zZWFyY2guYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLNUMsT0FBTyxFQUNMLDhCQUE4QixFQUM5Qiw2QkFBNkIsR0FDOUIsTUFBTSwrQ0FBK0MsQ0FBQzs7Ozs7QUFPdkQsTUFBTSxxQkFBcUIsR0FBaUI7SUFDMUMsUUFBUSxFQUFFLEVBQUU7Q0FDYixDQUFDO0FBR0YsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFSixNQUFNLENBQ0osS0FBYSxFQUNiLGVBQTZCLHFCQUFxQjtRQUVsRCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsZUFBZSxDQUNiLElBQVksRUFDWixXQUFtQixDQUFDO1FBRXBCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQ0YsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDdEQ7YUFDQSxJQUFJLENBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUNwQixHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsRUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FDM0QsQ0FBQztJQUNOLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsS0FBYSxFQUNiLFlBQTBCO1FBRTFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQ2pELFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLFlBQVksRUFBRTtTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMscUJBQXFCLENBQUMsSUFBWSxFQUFFLEdBQVc7UUFDdkQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtZQUN0RCxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7O29IQTVDVSx1QkFBdUI7d0hBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBQcm9kdWN0U2VhcmNoUGFnZSxcbiAgU3VnZ2VzdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvcHJvZHVjdC1zZWFyY2gubW9kZWwnO1xuaW1wb3J0IHtcbiAgUFJPRFVDVF9TRUFSQ0hfUEFHRV9OT1JNQUxJWkVSLFxuICBQUk9EVUNUX1NVR0dFU1RJT05fTk9STUFMSVpFUixcbn0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9jb25uZWN0b3JzL3NlYXJjaC9jb252ZXJ0ZXJzJztcbmltcG9ydCB7IFByb2R1Y3RTZWFyY2hBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9jb25uZWN0b3JzL3NlYXJjaC9wcm9kdWN0LXNlYXJjaC5hZGFwdGVyJztcbmltcG9ydCB7IFNlYXJjaENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWwvc2VhcmNoLWNvbmZpZyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPY2MgfSBmcm9tICcuLi8uLi9vY2MtbW9kZWxzL29jYy5tb2RlbHMnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5cbmNvbnN0IERFRkFVTFRfU0VBUkNIX0NPTkZJRzogU2VhcmNoQ29uZmlnID0ge1xuICBwYWdlU2l6ZTogMjAsXG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2NjUHJvZHVjdFNlYXJjaEFkYXB0ZXIgaW1wbGVtZW50cyBQcm9kdWN0U2VhcmNoQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgc2VhcmNoKFxuICAgIHF1ZXJ5OiBzdHJpbmcsXG4gICAgc2VhcmNoQ29uZmlnOiBTZWFyY2hDb25maWcgPSBERUZBVUxUX1NFQVJDSF9DT05GSUdcbiAgKTogT2JzZXJ2YWJsZTxQcm9kdWN0U2VhcmNoUGFnZT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodGhpcy5nZXRTZWFyY2hFbmRwb2ludChxdWVyeSwgc2VhcmNoQ29uZmlnKSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFBST0RVQ1RfU0VBUkNIX1BBR0VfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgbG9hZFN1Z2dlc3Rpb25zKFxuICAgIHRlcm06IHN0cmluZyxcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gM1xuICApOiBPYnNlcnZhYmxlPFN1Z2dlc3Rpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLlN1Z2dlc3Rpb25MaXN0PihcbiAgICAgICAgdGhpcy5nZXRTdWdnZXN0aW9uRW5kcG9pbnQodGVybSwgcGFnZVNpemUudG9TdHJpbmcoKSlcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBwbHVjaygnc3VnZ2VzdGlvbnMnKSxcbiAgICAgICAgbWFwKChzdWdnZXN0aW9ucykgPT4gc3VnZ2VzdGlvbnMgPz8gW10pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZU1hbnkoUFJPRFVDVF9TVUdHRVNUSU9OX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNlYXJjaEVuZHBvaW50KFxuICAgIHF1ZXJ5OiBzdHJpbmcsXG4gICAgc2VhcmNoQ29uZmlnOiBTZWFyY2hDb25maWdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3Byb2R1Y3RTZWFyY2gnLCB7XG4gICAgICBxdWVyeVBhcmFtczogeyBxdWVyeSwgLi4uc2VhcmNoQ29uZmlnIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U3VnZ2VzdGlvbkVuZHBvaW50KHRlcm06IHN0cmluZywgbWF4OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncHJvZHVjdFN1Z2dlc3Rpb25zJywge1xuICAgICAgcXVlcnlQYXJhbXM6IHsgdGVybSwgbWF4IH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==