import { Injectable, isDevMode } from '@angular/core';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
/**
 * Unknown Error Handler works as an fallback, to handle errors that were
 * not handled by any other error handlers
 */
export class UnknownErrorHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.UNKNOWN;
    }
    /**
     * hasMatch always returns true, to mach all errors
     */
    hasMatch(_errorResponse) {
        return true;
    }
    handleError(_request, errorResponse) {
        if (isDevMode() || this.isSsr()) {
            console.warn(`An unknown http error occurred\n`, errorResponse.message);
        }
    }
    /**
     * Fallback priority assures that the handler is used as a last resort
     */
    getPriority() {
        return -50 /* Priority.FALLBACK */;
    }
}
UnknownErrorHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnknownErrorHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnknownErrorHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnknownErrorHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnknownErrorHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5rbm93bi1lcnJvci5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvZ2xvYmFsLW1lc3NhZ2UvaHR0cC1pbnRlcmNlcHRvcnMvaGFuZGxlcnMvdW5rbm93bi1lcnJvci91bmtub3duLWVycm9yLmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRXpEOzs7R0FHRztBQUlILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFIekQ7O1FBSUUsbUJBQWMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7S0FxQjdDO0lBbkJDOztPQUVHO0lBQ0gsUUFBUSxDQUFDLGNBQWlDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUEwQixFQUFFLGFBQWdDO1FBQ3RFLElBQUksU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULG1DQUF5QjtJQUMzQixDQUFDOztnSEFyQlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmlvcml0eSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvYXBwbGljYWJsZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VTdGF0dXMgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcmVzcG9uc2Utc3RhdHVzLm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9odHRwLWVycm9yLmhhbmRsZXInO1xuXG4vKipcbiAqIFVua25vd24gRXJyb3IgSGFuZGxlciB3b3JrcyBhcyBhbiBmYWxsYmFjaywgdG8gaGFuZGxlIGVycm9ycyB0aGF0IHdlcmVcbiAqIG5vdCBoYW5kbGVkIGJ5IGFueSBvdGhlciBlcnJvciBoYW5kbGVyc1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5rbm93bkVycm9ySGFuZGxlciBleHRlbmRzIEh0dHBFcnJvckhhbmRsZXIge1xuICByZXNwb25zZVN0YXR1cyA9IEh0dHBSZXNwb25zZVN0YXR1cy5VTktOT1dOO1xuXG4gIC8qKlxuICAgKiBoYXNNYXRjaCBhbHdheXMgcmV0dXJucyB0cnVlLCB0byBtYWNoIGFsbCBlcnJvcnNcbiAgICovXG4gIGhhc01hdGNoKF9lcnJvclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaGFuZGxlRXJyb3IoX3JlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIGVycm9yUmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgaWYgKGlzRGV2TW9kZSgpIHx8IHRoaXMuaXNTc3IoKSkge1xuICAgICAgY29uc29sZS53YXJuKGBBbiB1bmtub3duIGh0dHAgZXJyb3Igb2NjdXJyZWRcXG5gLCBlcnJvclJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGYWxsYmFjayBwcmlvcml0eSBhc3N1cmVzIHRoYXQgdGhlIGhhbmRsZXIgaXMgdXNlZCBhcyBhIGxhc3QgcmVzb3J0XG4gICAqL1xuICBnZXRQcmlvcml0eSgpIHtcbiAgICByZXR1cm4gUHJpb3JpdHkuRkFMTEJBQ0s7XG4gIH1cbn1cbiJdfQ==