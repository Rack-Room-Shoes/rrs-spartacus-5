/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ProductImportStatus, } from '@spartacus/cart/base/root';
import { filter, map } from 'rxjs/operators';
import { CartActions } from '../store/actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
export class ProductImportInfoService {
    constructor(actionsSubject) {
        this.actionsSubject = actionsSubject;
    }
    /**
     * Get emission of add entry results from actions subject
     *
     * @param {string} cartId
     * @returns {Observable<ProductImportInfo>}
     */
    getResults(cartId) {
        return this.actionsSubject.pipe(ofType(CartActions.CART_ADD_ENTRY_SUCCESS, CartActions.CART_ADD_ENTRY_FAIL), filter((action) => action.payload.cartId === cartId), map((action) => this.mapMessages(action)));
    }
    /**
     * Map actions to summary messages
     *
     * @param {CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail} action
     * @returns ProductImportInfo
     */
    mapMessages(action) {
        const { productCode } = action.payload;
        if (action instanceof CartActions.CartAddEntrySuccess) {
            const { quantity, quantityAdded, entry, statusCode } = action.payload;
            if (statusCode === ProductImportStatus.LOW_STOCK) {
                return {
                    productCode,
                    statusCode,
                    productName: entry?.product?.name,
                    quantity,
                    quantityAdded,
                };
            }
            if (statusCode === ProductImportStatus.SUCCESS ||
                statusCode === ProductImportStatus.NO_STOCK) {
                return { productCode, statusCode, productName: entry?.product?.name };
            }
        }
        else if (action instanceof CartActions.CartAddEntryFail) {
            const { error } = action.payload;
            if (error?.details[0]?.type === 'UnknownIdentifierError') {
                return {
                    productCode,
                    statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
                };
            }
        }
        if (isDevMode()) {
            console.warn('Unrecognized cart add entry action type while mapping messages', action);
        }
        return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
    }
}
ProductImportInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImportInfoService, deps: [{ token: i1.ActionsSubject }], target: i0.ɵɵFactoryTarget.Injectable });
ProductImportInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImportInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImportInfoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbXBvcnQtaW5mby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL3NlcnZpY2VzL3Byb2R1Y3QtaW1wb3J0LWluZm8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBRUwsbUJBQW1CLEdBQ3BCLE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7OztBQUsvQyxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQWdDLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7SUFFbEU7Ozs7O09BS0c7SUFDSCxVQUFVLENBQUMsTUFBYztRQUN2QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixNQUFNLENBQ0osV0FBVyxDQUFDLHNCQUFzQixFQUNsQyxXQUFXLENBQUMsbUJBQW1CLENBQ2hDLEVBQ0QsTUFBTSxDQUNKLENBQ0UsTUFBc0UsRUFDdEUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FDdEMsRUFDRCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLFdBQVcsQ0FDbkIsTUFBc0U7UUFFdEUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDdkMsSUFBSSxNQUFNLFlBQVksV0FBVyxDQUFDLG1CQUFtQixFQUFFO1lBQ3JELE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3RFLElBQUksVUFBVSxLQUFLLG1CQUFtQixDQUFDLFNBQVMsRUFBRTtnQkFDaEQsT0FBTztvQkFDTCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSTtvQkFDakMsUUFBUTtvQkFDUixhQUFhO2lCQUNkLENBQUM7YUFDSDtZQUNELElBQ0UsVUFBVSxLQUFLLG1CQUFtQixDQUFDLE9BQU87Z0JBQzFDLFVBQVUsS0FBSyxtQkFBbUIsQ0FBQyxRQUFRLEVBQzNDO2dCQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3ZFO1NBQ0Y7YUFBTSxJQUFJLE1BQU0sWUFBWSxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7WUFDekQsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakMsSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksS0FBSyx3QkFBd0IsRUFBRTtnQkFDeEQsT0FBTztvQkFDTCxXQUFXO29CQUNYLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxrQkFBa0I7aUJBQ25ELENBQUM7YUFDSDtTQUNGO1FBQ0QsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsZ0VBQWdFLEVBQ2hFLE1BQU0sQ0FDUCxDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN4RSxDQUFDOztxSEFuRVUsd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgUHJvZHVjdEltcG9ydEluZm8sXG4gIFByb2R1Y3RJbXBvcnRTdGF0dXMsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDYXJ0QWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdEltcG9ydEluZm9TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhY3Rpb25zU3ViamVjdDogQWN0aW9uc1N1YmplY3QpIHt9XG5cbiAgLyoqXG4gICAqIEdldCBlbWlzc2lvbiBvZiBhZGQgZW50cnkgcmVzdWx0cyBmcm9tIGFjdGlvbnMgc3ViamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2FydElkXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFByb2R1Y3RJbXBvcnRJbmZvPn1cbiAgICovXG4gIGdldFJlc3VsdHMoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2R1Y3RJbXBvcnRJbmZvPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uc1N1YmplY3QucGlwZShcbiAgICAgIG9mVHlwZShcbiAgICAgICAgQ2FydEFjdGlvbnMuQ0FSVF9BRERfRU5UUllfU1VDQ0VTUyxcbiAgICAgICAgQ2FydEFjdGlvbnMuQ0FSVF9BRERfRU5UUllfRkFJTFxuICAgICAgKSxcbiAgICAgIGZpbHRlcihcbiAgICAgICAgKFxuICAgICAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ2FydEFkZEVudHJ5U3VjY2VzcyB8IENhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeUZhaWxcbiAgICAgICAgKSA9PiBhY3Rpb24ucGF5bG9hZC5jYXJ0SWQgPT09IGNhcnRJZFxuICAgICAgKSxcbiAgICAgIG1hcCgoYWN0aW9uKSA9PiB0aGlzLm1hcE1lc3NhZ2VzKGFjdGlvbikpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgYWN0aW9ucyB0byBzdW1tYXJ5IG1lc3NhZ2VzXG4gICAqXG4gICAqIEBwYXJhbSB7Q2FydEFjdGlvbnMuQ2FydEFkZEVudHJ5U3VjY2VzcyB8IENhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeUZhaWx9IGFjdGlvblxuICAgKiBAcmV0dXJucyBQcm9kdWN0SW1wb3J0SW5mb1xuICAgKi9cbiAgcHJvdGVjdGVkIG1hcE1lc3NhZ2VzKFxuICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ2FydEFkZEVudHJ5U3VjY2VzcyB8IENhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeUZhaWxcbiAgKTogUHJvZHVjdEltcG9ydEluZm8ge1xuICAgIGNvbnN0IHsgcHJvZHVjdENvZGUgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBDYXJ0QWN0aW9ucy5DYXJ0QWRkRW50cnlTdWNjZXNzKSB7XG4gICAgICBjb25zdCB7IHF1YW50aXR5LCBxdWFudGl0eUFkZGVkLCBlbnRyeSwgc3RhdHVzQ29kZSB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBpZiAoc3RhdHVzQ29kZSA9PT0gUHJvZHVjdEltcG9ydFN0YXR1cy5MT1dfU1RPQ0spIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgICBzdGF0dXNDb2RlLFxuICAgICAgICAgIHByb2R1Y3ROYW1lOiBlbnRyeT8ucHJvZHVjdD8ubmFtZSxcbiAgICAgICAgICBxdWFudGl0eSxcbiAgICAgICAgICBxdWFudGl0eUFkZGVkLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBzdGF0dXNDb2RlID09PSBQcm9kdWN0SW1wb3J0U3RhdHVzLlNVQ0NFU1MgfHxcbiAgICAgICAgc3RhdHVzQ29kZSA9PT0gUHJvZHVjdEltcG9ydFN0YXR1cy5OT19TVE9DS1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB7IHByb2R1Y3RDb2RlLCBzdGF0dXNDb2RlLCBwcm9kdWN0TmFtZTogZW50cnk/LnByb2R1Y3Q/Lm5hbWUgfTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjdGlvbiBpbnN0YW5jZW9mIENhcnRBY3Rpb25zLkNhcnRBZGRFbnRyeUZhaWwpIHtcbiAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgaWYgKGVycm9yPy5kZXRhaWxzWzBdPy50eXBlID09PSAnVW5rbm93bklkZW50aWZpZXJFcnJvcicpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLlVOS05PV05fSURFTlRJRklFUixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdVbnJlY29nbml6ZWQgY2FydCBhZGQgZW50cnkgYWN0aW9uIHR5cGUgd2hpbGUgbWFwcGluZyBtZXNzYWdlcycsXG4gICAgICAgIGFjdGlvblxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcHJvZHVjdENvZGUsIHN0YXR1c0NvZGU6IFByb2R1Y3RJbXBvcnRTdGF0dXMuVU5LTk9XTl9FUlJPUiB9O1xuICB9XG59XG4iXX0=