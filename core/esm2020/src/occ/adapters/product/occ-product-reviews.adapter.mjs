/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { PRODUCT_REVIEW_NORMALIZER, PRODUCT_REVIEW_SERIALIZER, } from '../../../product/connectors/reviews/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccProductReviewsAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(productCode, maxCount) {
        return this.http
            .get(this.getEndpoint(productCode, maxCount))
            .pipe(pluck('reviews'), map((reviews) => reviews ?? []), this.converter.pipeableMany(PRODUCT_REVIEW_NORMALIZER));
    }
    post(productCode, review) {
        review = this.converter.convert(review, PRODUCT_REVIEW_SERIALIZER);
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const body = new URLSearchParams();
        body.append('headline', review.headline);
        body.append('comment', review.comment);
        body.append('rating', review.rating.toString());
        body.append('alias', review.alias);
        return this.http.post(this.getEndpoint(productCode), body.toString(), {
            headers,
        });
    }
    getEndpoint(code, maxCount) {
        return this.occEndpoints.buildUrl('productReviews', {
            urlParams: { productCode: code },
            queryParams: { maxCount },
        });
    }
}
OccProductReviewsAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccProductReviewsAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccProductReviewsAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccProductReviewsAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccProductReviewsAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXByb2R1Y3QtcmV2aWV3cy5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL2FkYXB0ZXJzL3Byb2R1Y3Qvb2NjLXByb2R1Y3QtcmV2aWV3cy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIseUJBQXlCLEdBQzFCLE1BQU0sZ0RBQWdELENBQUM7Ozs7O0FBT3hELE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUNwQyxDQUFDO0lBRUosSUFBSSxDQUFDLFdBQW1CLEVBQUUsUUFBaUI7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RCxJQUFJLENBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUNoQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FDdkQsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsV0FBbUIsRUFBRSxNQUFXO1FBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUVuRSxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUM5QixjQUFjLEVBQUUsbUNBQW1DO1NBQ3BELENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDcEUsT0FBTztTQUNSLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxXQUFXLENBQUMsSUFBWSxFQUFFLFFBQWlCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEQsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtZQUNoQyxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUU7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7cUhBeENVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXZpZXcgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7XG4gIFBST0RVQ1RfUkVWSUVXX05PUk1BTElaRVIsXG4gIFBST0RVQ1RfUkVWSUVXX1NFUklBTElaRVIsXG59IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvY29ubmVjdG9ycy9yZXZpZXdzL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgUHJvZHVjdFJldmlld3NBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9jb25uZWN0b3JzL3Jldmlld3MvcHJvZHVjdC1yZXZpZXdzLmFkYXB0ZXInO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vY2MtZW5kcG9pbnRzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2NjUHJvZHVjdFJldmlld3NBZGFwdGVyIGltcGxlbWVudHMgUHJvZHVjdFJldmlld3NBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICBsb2FkKHByb2R1Y3RDb2RlOiBzdHJpbmcsIG1heENvdW50PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZXZpZXdbXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLlByb2R1Y3Q+KHRoaXMuZ2V0RW5kcG9pbnQocHJvZHVjdENvZGUsIG1heENvdW50KSlcbiAgICAgIC5waXBlKFxuICAgICAgICBwbHVjaygncmV2aWV3cycpLFxuICAgICAgICBtYXAoKHJldmlld3MpID0+IHJldmlld3MgPz8gW10pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZU1hbnkoUFJPRFVDVF9SRVZJRVdfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBwb3N0KHByb2R1Y3RDb2RlOiBzdHJpbmcsIHJldmlldzogYW55KTogT2JzZXJ2YWJsZTxSZXZpZXc+IHtcbiAgICByZXZpZXcgPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KHJldmlldywgUFJPRFVDVF9SRVZJRVdfU0VSSUFMSVpFUik7XG5cbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGJvZHkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgYm9keS5hcHBlbmQoJ2hlYWRsaW5lJywgcmV2aWV3LmhlYWRsaW5lKTtcbiAgICBib2R5LmFwcGVuZCgnY29tbWVudCcsIHJldmlldy5jb21tZW50KTtcbiAgICBib2R5LmFwcGVuZCgncmF0aW5nJywgcmV2aWV3LnJhdGluZy50b1N0cmluZygpKTtcbiAgICBib2R5LmFwcGVuZCgnYWxpYXMnLCByZXZpZXcuYWxpYXMpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuZ2V0RW5kcG9pbnQocHJvZHVjdENvZGUpLCBib2R5LnRvU3RyaW5nKCksIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RW5kcG9pbnQoY29kZTogc3RyaW5nLCBtYXhDb3VudD86IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdwcm9kdWN0UmV2aWV3cycsIHtcbiAgICAgIHVybFBhcmFtczogeyBwcm9kdWN0Q29kZTogY29kZSB9LFxuICAgICAgcXVlcnlQYXJhbXM6IHsgbWF4Q291bnQgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19