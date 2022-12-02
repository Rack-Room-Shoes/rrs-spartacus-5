/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CMS_PAGE_NORMALIZER } from '../../../cms/connectors/page/converters';
import { PageType } from '../../../model/cms.model';
import { HOME_PAGE_CONTEXT, SMART_EDIT_CONTEXT, } from '../../../routing/models/page-context.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccCmsPageAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }
    /**
     * @override returns the OCC CMS page data for the given context and converts
     * the data by any configured `CMS_PAGE_NORMALIZER`.
     */
    load(pageContext) {
        const params = this.getPagesRequestParams(pageContext);
        const endpoint = !pageContext.type
            ? this.occEndpoints.buildUrl('page', {
                urlParams: { id: pageContext.id },
            })
            : this.occEndpoints.buildUrl('pages', { queryParams: params });
        return this.http
            .get(endpoint, { headers: this.headers })
            .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZER));
    }
    /**
     * The OCC CMS API allows to query pages by a combination of pageType, label and code.
     *
     * When a `ContentPage` is requested, we use the `pageLabelOrId`:
     *
     * ```
     * "/pages?pageLabelOrId=/my-page&pageType=ContentPage"
     * ```
     *
     * Other pages are queried by code:
     *
     * ```
     * "/pages?code=1234&pageType=ProductPage"
     * ```
     *
     * The page context is ignored for a home page request or in case of a
     * `smartedit-preview` request.
     */
    getPagesRequestParams(context) {
        if (context.id === HOME_PAGE_CONTEXT || context.id === SMART_EDIT_CONTEXT) {
            return {};
        }
        const httpParams = {};
        if (context.type) {
            httpParams.pageType = context.type;
        }
        if (context.type === PageType.CONTENT_PAGE) {
            httpParams.pageLabelOrId = context.id;
        }
        else {
            httpParams.code = context.id;
        }
        return httpParams;
    }
}
OccCmsPageAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsPageAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCmsPageAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsPageAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsPageAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNtcy1wYWdlLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvY21zL29jYy1jbXMtcGFnZS5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUNMLGlCQUFpQixFQUVqQixrQkFBa0IsR0FDbkIsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7QUFjcEQsTUFBTSxPQUFPLGlCQUFpQjtJQUc1QixZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTDdCLFlBQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQU0zRSxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsSUFBSSxDQUFDLFdBQXdCO1FBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxNQUFNLFFBQVEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO2FBQ2xDLENBQUM7WUFDSixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNPLHFCQUFxQixDQUFDLE9BQW9CO1FBQ2xELElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxpQkFBaUIsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLGtCQUFrQixFQUFFO1lBQ3pFLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxNQUFNLFVBQVUsR0FBc0IsRUFBRSxDQUFDO1FBQ3pDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQixVQUFVLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDcEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLFlBQVksRUFBRTtZQUMxQyxVQUFVLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDdkM7YUFBTTtZQUNMLFVBQVUsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUM5QjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7OzhHQTdEVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENtc1BhZ2VBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vY21zL2Nvbm5lY3RvcnMvcGFnZS9jbXMtcGFnZS5hZGFwdGVyJztcbmltcG9ydCB7IENNU19QQUdFX05PUk1BTElaRVIgfSBmcm9tICcuLi8uLi8uLi9jbXMvY29ubmVjdG9ycy9wYWdlL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ21zU3RydWN0dXJlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9jbXMvbW9kZWwvcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBQYWdlVHlwZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2Ntcy5tb2RlbCc7XG5pbXBvcnQge1xuICBIT01FX1BBR0VfQ09OVEVYVCxcbiAgUGFnZUNvbnRleHQsXG4gIFNNQVJUX0VESVRfQ09OVEVYVCxcbn0gZnJvbSAnLi4vLi4vLi4vcm91dGluZy9tb2RlbHMvcGFnZS1jb250ZXh0Lm1vZGVsJztcbmltcG9ydCB7IENvbnZlcnRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi91dGlsL2NvbnZlcnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vY2MtZW5kcG9pbnRzLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9jY0Ntc1BhZ2VSZXF1ZXN0IHtcbiAgcGFnZUxhYmVsT3JJZD86IHN0cmluZztcbiAgcGFnZVR5cGU/OiBQYWdlVHlwZTtcbiAgY29kZT86IHN0cmluZztcbiAgZmllbGRzPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjQ21zUGFnZUFkYXB0ZXIgaW1wbGVtZW50cyBDbXNQYWdlQWRhcHRlciB7XG4gIHByb3RlY3RlZCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZSByZXR1cm5zIHRoZSBPQ0MgQ01TIHBhZ2UgZGF0YSBmb3IgdGhlIGdpdmVuIGNvbnRleHQgYW5kIGNvbnZlcnRzXG4gICAqIHRoZSBkYXRhIGJ5IGFueSBjb25maWd1cmVkIGBDTVNfUEFHRV9OT1JNQUxJWkVSYC5cbiAgICovXG4gIGxvYWQocGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0KTogT2JzZXJ2YWJsZTxDbXNTdHJ1Y3R1cmVNb2RlbD4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFnZXNSZXF1ZXN0UGFyYW1zKHBhZ2VDb250ZXh0KTtcblxuICAgIGNvbnN0IGVuZHBvaW50ID0gIXBhZ2VDb250ZXh0LnR5cGVcbiAgICAgID8gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3BhZ2UnLCB7XG4gICAgICAgICAgdXJsUGFyYW1zOiB7IGlkOiBwYWdlQ29udGV4dC5pZCB9LFxuICAgICAgICB9KVxuICAgICAgOiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncGFnZXMnLCB7IHF1ZXJ5UGFyYW1zOiBwYXJhbXMgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KGVuZHBvaW50LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoQ01TX1BBR0VfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBPQ0MgQ01TIEFQSSBhbGxvd3MgdG8gcXVlcnkgcGFnZXMgYnkgYSBjb21iaW5hdGlvbiBvZiBwYWdlVHlwZSwgbGFiZWwgYW5kIGNvZGUuXG4gICAqXG4gICAqIFdoZW4gYSBgQ29udGVudFBhZ2VgIGlzIHJlcXVlc3RlZCwgd2UgdXNlIHRoZSBgcGFnZUxhYmVsT3JJZGA6XG4gICAqXG4gICAqIGBgYFxuICAgKiBcIi9wYWdlcz9wYWdlTGFiZWxPcklkPS9teS1wYWdlJnBhZ2VUeXBlPUNvbnRlbnRQYWdlXCJcbiAgICogYGBgXG4gICAqXG4gICAqIE90aGVyIHBhZ2VzIGFyZSBxdWVyaWVkIGJ5IGNvZGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBcIi9wYWdlcz9jb2RlPTEyMzQmcGFnZVR5cGU9UHJvZHVjdFBhZ2VcIlxuICAgKiBgYGBcbiAgICpcbiAgICogVGhlIHBhZ2UgY29udGV4dCBpcyBpZ25vcmVkIGZvciBhIGhvbWUgcGFnZSByZXF1ZXN0IG9yIGluIGNhc2Ugb2YgYVxuICAgKiBgc21hcnRlZGl0LXByZXZpZXdgIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UGFnZXNSZXF1ZXN0UGFyYW1zKGNvbnRleHQ6IFBhZ2VDb250ZXh0KTogT2NjQ21zUGFnZVJlcXVlc3Qge1xuICAgIGlmIChjb250ZXh0LmlkID09PSBIT01FX1BBR0VfQ09OVEVYVCB8fCBjb250ZXh0LmlkID09PSBTTUFSVF9FRElUX0NPTlRFWFQpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBodHRwUGFyYW1zOiBPY2NDbXNQYWdlUmVxdWVzdCA9IHt9O1xuICAgIGlmIChjb250ZXh0LnR5cGUpIHtcbiAgICAgIGh0dHBQYXJhbXMucGFnZVR5cGUgPSBjb250ZXh0LnR5cGU7XG4gICAgfVxuICAgIGlmIChjb250ZXh0LnR5cGUgPT09IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSkge1xuICAgICAgaHR0cFBhcmFtcy5wYWdlTGFiZWxPcklkID0gY29udGV4dC5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaHR0cFBhcmFtcy5jb2RlID0gY29udGV4dC5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgfVxufVxuIl19