/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, HttpHeaders, HttpResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./cpq-access-storage.service";
/**
 * This header attribute shall be used to mark any request made to the CPQ System.
 * The presence of it enables this interceptor to actually intercept
 * this request and to decorate it with the authentication related attributes.
 */
export const MARKER_HEADER_CPQ_CONFIGURATOR = 'x-cpq-configurator';
export class CpqConfiguratorRestInterceptor {
    constructor(cpqAccessStorageService) {
        this.cpqAccessStorageService = cpqAccessStorageService;
        this.HEADER_ATTR_CPQ_SESSION_ID = 'x-cpq-session-id';
        this.HEADER_ATTR_CPQ_NO_COOKIES = 'x-cpq-disable-cookies';
        /**
         * Although CPQ API is stateless and can work without session id, it's recommended to always append the CPQ session id to any request.
         * It enables CPQ load balancer to redirect the request always to the same node, so that configuration related data is already in memory
         * and does not need to be reloaded from DB. This can have a significant impact on performance nd reduce load in the CPQ system.
         */
        this.cpqSessionId = null;
    }
    intercept(request, next) {
        if (!request.headers.has(MARKER_HEADER_CPQ_CONFIGURATOR)) {
            return next.handle(request);
        }
        return this.cpqAccessStorageService.getCpqAccessData().pipe(take(1), // avoid request being re-executed when token expires
        switchMap((cpqData) => {
            return next.handle(this.enrichHeaders(request, cpqData)).pipe(catchError((errorResponse) => {
                return this.handleError(errorResponse, next, request);
            }), tap((response) => this.extractCpqSessionId(response)));
        }));
    }
    handleError(errorResponse, next, request) {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === 403) {
                this.cpqAccessStorageService.renewCpqAccessData();
                return this.cpqAccessStorageService.getCpqAccessData().pipe(take(1), switchMap((newCpqData) => {
                    return next
                        .handle(this.enrichHeaders(request, newCpqData))
                        .pipe(tap((response) => this.extractCpqSessionId(response)));
                }));
            }
        }
        return throwError(errorResponse); //propagate error
    }
    extractCpqSessionId(response) {
        if (response instanceof HttpResponse ||
            response instanceof HttpErrorResponse) {
            if (response.headers.has(this.HEADER_ATTR_CPQ_SESSION_ID)) {
                this.cpqSessionId = response.headers.get(this.HEADER_ATTR_CPQ_SESSION_ID);
            }
        }
    }
    enrichHeaders(request, cpqData) {
        let newRequest = request.clone({
            url: cpqData.endpoint + request.url,
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + cpqData.accessToken,
                [this.HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
            }),
        });
        if (this.cpqSessionId) {
            newRequest = newRequest.clone({
                setHeaders: {
                    [this.HEADER_ATTR_CPQ_SESSION_ID]: this.cpqSessionId,
                },
            });
        }
        return newRequest;
    }
}
CpqConfiguratorRestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestInterceptor, deps: [{ token: i1.CpqAccessStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CpqAccessStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yZXN0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L2NwcS9pbnRlcmNlcHRvci9jcHEtY29uZmlndXJhdG9yLXJlc3QuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxpQkFBaUIsRUFHakIsV0FBVyxFQUdYLFlBQVksR0FDYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUlsRTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsb0JBQW9CLENBQUM7QUFLbkUsTUFBTSxPQUFPLDhCQUE4QjtJQVd6QyxZQUFzQix1QkFBZ0Q7UUFBaEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQVZuRCwrQkFBMEIsR0FBRyxrQkFBa0IsQ0FBQztRQUNoRCwrQkFBMEIsR0FBRyx1QkFBdUIsQ0FBQztRQUV4RTs7OztXQUlHO1FBQ08saUJBQVksR0FBa0IsSUFBSSxDQUFDO0lBRTRCLENBQUM7SUFFMUUsU0FBUyxDQUNQLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1lBQ3hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFn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dGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEhlYWRlcnMsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG4gIEh0dHBSZXNwb25zZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDcHFBY2Nlc3NEYXRhIH0gZnJvbSAnLi9jcHEtYWNjZXNzLWRhdGEubW9kZWxzJztcbmltcG9ydCB7IENwcUFjY2Vzc1N0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9jcHEtYWNjZXNzLXN0b3JhZ2Uuc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBoZWFkZXIgYXR0cmlidXRlIHNoYWxsIGJlIHVzZWQgdG8gbWFyayBhbnkgcmVxdWVzdCBtYWRlIHRvIHRoZSBDUFEgU3lzdGVtLlxuICogVGhlIHByZXNlbmNlIG9mIGl0IGVuYWJsZXMgdGhpcyBpbnRlcmNlcHRvciB0byBhY3R1YWxseSBpbnRlcmNlcHRcbiAqIHRoaXMgcmVxdWVzdCBhbmQgdG8gZGVjb3JhdGUgaXQgd2l0aCB0aGUgYXV0aGVudGljYXRpb24gcmVsYXRlZCBhdHRyaWJ1dGVzLlxuICovXG5leHBvcnQgY29uc3QgTUFSS0VSX0hFQURFUl9DUFFfQ09ORklHVVJBVE9SID0gJ3gtY3BxLWNvbmZpZ3VyYXRvcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JSZXN0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgSEVBREVSX0FUVFJfQ1BRX1NFU1NJT05fSUQgPSAneC1jcHEtc2Vzc2lvbi1pZCc7XG4gIHByb3RlY3RlZCByZWFkb25seSBIRUFERVJfQVRUUl9DUFFfTk9fQ09PS0lFUyA9ICd4LWNwcS1kaXNhYmxlLWNvb2tpZXMnO1xuXG4gIC8qKlxuICAgKiBBbHRob3VnaCBDUFEgQVBJIGlzIHN0YXRlbGVzcyBhbmQgY2FuIHdvcmsgd2l0aG91dCBzZXNzaW9uIGlkLCBpdCdzIHJlY29tbWVuZGVkIHRvIGFsd2F5cyBhcHBlbmQgdGhlIENQUSBzZXNzaW9uIGlkIHRvIGFueSByZXF1ZXN0LlxuICAgKiBJdCBlbmFibGVzIENQUSBsb2FkIGJhbGFuY2VyIHRvIHJlZGlyZWN0IHRoZSByZXF1ZXN0IGFsd2F5cyB0byB0aGUgc2FtZSBub2RlLCBzbyB0aGF0IGNvbmZpZ3VyYXRpb24gcmVsYXRlZCBkYXRhIGlzIGFscmVhZHkgaW4gbWVtb3J5XG4gICAqIGFuZCBkb2VzIG5vdCBuZWVkIHRvIGJlIHJlbG9hZGVkIGZyb20gREIuIFRoaXMgY2FuIGhhdmUgYSBzaWduaWZpY2FudCBpbXBhY3Qgb24gcGVyZm9ybWFuY2UgbmQgcmVkdWNlIGxvYWQgaW4gdGhlIENQUSBzeXN0ZW0uXG4gICAqL1xuICBwcm90ZWN0ZWQgY3BxU2Vzc2lvbklkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY3BxQWNjZXNzU3RvcmFnZVNlcnZpY2U6IENwcUFjY2Vzc1N0b3JhZ2VTZXJ2aWNlKSB7fVxuXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAoIXJlcXVlc3QuaGVhZGVycy5oYXMoTUFSS0VSX0hFQURFUl9DUFFfQ09ORklHVVJBVE9SKSkge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcHFBY2Nlc3NTdG9yYWdlU2VydmljZS5nZXRDcHFBY2Nlc3NEYXRhKCkucGlwZShcbiAgICAgIHRha2UoMSksIC8vIGF2b2lkIHJlcXVlc3QgYmVpbmcgcmUtZXhlY3V0ZWQgd2hlbiB0b2tlbiBleHBpcmVzXG4gICAgICBzd2l0Y2hNYXAoKGNwcURhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHRoaXMuZW5yaWNoSGVhZGVycyhyZXF1ZXN0LCBjcHFEYXRhKSkucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnJvclJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUVycm9yKGVycm9yUmVzcG9uc2UsIG5leHQsIHJlcXVlc3QpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRhcCgocmVzcG9uc2UpID0+IHRoaXMuZXh0cmFjdENwcVNlc3Npb25JZChyZXNwb25zZSkpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3IoXG4gICAgZXJyb3JSZXNwb25zZTogYW55LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyLFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT5cbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmIChlcnJvclJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgIGlmIChlcnJvclJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgIHRoaXMuY3BxQWNjZXNzU3RvcmFnZVNlcnZpY2UucmVuZXdDcHFBY2Nlc3NEYXRhKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNwcUFjY2Vzc1N0b3JhZ2VTZXJ2aWNlLmdldENwcUFjY2Vzc0RhdGEoKS5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgc3dpdGNoTWFwKChuZXdDcHFEYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgICAgICAgICAuaGFuZGxlKHRoaXMuZW5yaWNoSGVhZGVycyhyZXF1ZXN0LCBuZXdDcHFEYXRhKSlcbiAgICAgICAgICAgICAgLnBpcGUodGFwKChyZXNwb25zZSkgPT4gdGhpcy5leHRyYWN0Q3BxU2Vzc2lvbklkKHJlc3BvbnNlKSkpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVycm9yUmVzcG9uc2UpOyAvL3Byb3BhZ2F0ZSBlcnJvclxuICB9XG5cbiAgcHJvdGVjdGVkIGV4dHJhY3RDcHFTZXNzaW9uSWQocmVzcG9uc2U6IEh0dHBFdmVudDxhbnk+KSB7XG4gICAgaWYgKFxuICAgICAgcmVzcG9uc2UgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgfHxcbiAgICAgIHJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2VcbiAgICApIHtcbiAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmhhcyh0aGlzLkhFQURFUl9BVFRSX0NQUV9TRVNTSU9OX0lEKSkge1xuICAgICAgICB0aGlzLmNwcVNlc3Npb25JZCA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFxuICAgICAgICAgIHRoaXMuSEVBREVSX0FUVFJfQ1BRX1NFU1NJT05fSURcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZW5yaWNoSGVhZGVycyhcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIGNwcURhdGE6IENwcUFjY2Vzc0RhdGFcbiAgKTogSHR0cFJlcXVlc3Q8YW55PiB7XG4gICAgbGV0IG5ld1JlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgIHVybDogY3BxRGF0YS5lbmRwb2ludCArIHJlcXVlc3QudXJsLFxuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgY3BxRGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgW3RoaXMuSEVBREVSX0FUVFJfQ1BRX05PX0NPT0tJRVNdOiAndHJ1ZScsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBpZiAodGhpcy5jcHFTZXNzaW9uSWQpIHtcbiAgICAgIG5ld1JlcXVlc3QgPSBuZXdSZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgIFt0aGlzLkhFQURFUl9BVFRSX0NQUV9TRVNTSU9OX0lEXTogdGhpcy5jcHFTZXNzaW9uSWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG4gIH1cbn1cbiJdfQ==