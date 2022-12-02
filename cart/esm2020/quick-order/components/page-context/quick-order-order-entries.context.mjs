import { Injectable, isDevMode } from '@angular/core';
import { merge, of } from 'rxjs';
import { catchError, filter, map, mergeAll, switchMap, take, tap, } from 'rxjs/operators';
import { OrderEntriesSource, ProductImportStatus, } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/quick-order/root";
import * as i2 from "@spartacus/core";
export class QuickOrderOrderEntriesContext {
    constructor(quickOrderService, productConnector) {
        this.quickOrderService = quickOrderService;
        this.productConnector = productConnector;
        this.type = OrderEntriesSource.QUICK_ORDER;
    }
    getEntries() {
        return this.quickOrderService.getEntries();
    }
    addEntries(productsData) {
        return merge(productsData.map((productData) => this.quickOrderService.canAdd(productData.productCode).pipe(switchMap((canAdd) => {
            if (canAdd) {
                return this.productConnector.get(productData.productCode).pipe(filter((product) => !!product), tap((product) => {
                    this.quickOrderService.addProduct(product, productData.quantity);
                }), map((product) => this.handleResults(product, productData)), catchError((response) => {
                    return of(this.handleErrors(response, productData.productCode));
                }));
            }
            else {
                return of({
                    productCode: productData.productCode,
                    statusCode: ProductImportStatus.LIMIT_EXCEEDED,
                });
            }
        })))).pipe(mergeAll(), take(productsData.length));
    }
    handleResults(product, productData) {
        if (product.stock?.stockLevel &&
            productData.quantity > product.stock.stockLevel) {
            return {
                productCode: productData.productCode,
                productName: product?.name,
                statusCode: ProductImportStatus.LOW_STOCK,
                quantity: productData.quantity,
                quantityAdded: product.stock.stockLevel,
            };
        }
        else if (product.stock?.stockLevelStatus === 'outOfStock') {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.NO_STOCK,
                productName: product?.name,
            };
        }
        else {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.SUCCESS,
            };
        }
    }
    handleErrors(response, productCode) {
        if (response?.error?.errors[0].type === 'UnknownIdentifierError') {
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
            };
        }
        else {
            if (isDevMode()) {
                console.warn('Unrecognized cart add entry action type while mapping messages', response);
            }
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_ERROR,
            };
        }
    }
}
QuickOrderOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderOrderEntriesContext, deps: [{ token: i1.QuickOrderFacade }, { token: i2.ProductConnector }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QuickOrderOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.QuickOrderFacade }, { type: i2.ProductConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvcXVpY2stb3JkZXIvY29tcG9uZW50cy9wYWdlLWNvbnRleHQvcXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsU0FBUyxFQUNULElBQUksRUFDSixHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBR0wsa0JBQWtCLEVBSWxCLG1CQUFtQixHQUNwQixNQUFNLDJCQUEyQixDQUFDOzs7O0FBT25DLE1BQU0sT0FBTyw2QkFBNkI7SUFLeEMsWUFDWSxpQkFBbUMsRUFDbkMsZ0JBQWtDO1FBRGxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUpyQyxTQUFJLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDO0lBSzVDLENBQUM7SUFFSixVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxZQUEyQjtRQUNwQyxPQUFPLEtBQUssQ0FDVixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN6RCxTQUFTLENBQUMsQ0FBQyxNQUFNLEVB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QU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZmlsdGVyLFxuICBtYXAsXG4gIG1lcmdlQWxsLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWRkT3JkZXJFbnRyaWVzQ29udGV4dCxcbiAgR2V0T3JkZXJFbnRyaWVzQ29udGV4dCxcbiAgT3JkZXJFbnRyaWVzU291cmNlLFxuICBPcmRlckVudHJ5LFxuICBQcm9kdWN0RGF0YSxcbiAgUHJvZHVjdEltcG9ydEluZm8sXG4gIFByb2R1Y3RJbXBvcnRTdGF0dXMsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgUXVpY2tPcmRlckZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9xdWljay1vcmRlci9yb290JztcbmltcG9ydCB7IFByb2R1Y3QsIFByb2R1Y3RDb25uZWN0b3IgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUXVpY2tPcmRlck9yZGVyRW50cmllc0NvbnRleHRcbiAgaW1wbGVtZW50cyBBZGRPcmRlckVudHJpZXNDb250ZXh0LCBHZXRPcmRlckVudHJpZXNDb250ZXh0XG57XG4gIHJlYWRvbmx5IHR5cGUgPSBPcmRlckVudHJpZXNTb3VyY2UuUVVJQ0tfT1JERVI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHF1aWNrT3JkZXJTZXJ2aWNlOiBRdWlja09yZGVyRmFjYWRlLFxuICAgIHByb3RlY3RlZCBwcm9kdWN0Q29ubmVjdG9yOiBQcm9kdWN0Q29ubmVjdG9yXG4gICkge31cblxuICBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucXVpY2tPcmRlclNlcnZpY2UuZ2V0RW50cmllcygpO1xuICB9XG5cbiAgYWRkRW50cmllcyhwcm9kdWN0c0RhdGE6IFByb2R1Y3REYXRhW10pOiBPYnNlcnZhYmxlPFByb2R1Y3RJbXBvcnRJbmZvPiB7XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgcHJvZHVjdHNEYXRhLm1hcCgocHJvZHVjdERhdGEpID0+XG4gICAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2UuY2FuQWRkKHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoY2FuQWRkKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FuQWRkKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RDb25uZWN0b3IuZ2V0KHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlKS5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigocHJvZHVjdCkgPT4gISFwcm9kdWN0KSxcbiAgICAgICAgICAgICAgICB0YXAoKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucXVpY2tPcmRlclNlcnZpY2UuYWRkUHJvZHVjdChcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdCxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdERhdGEucXVhbnRpdHlcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWFwKChwcm9kdWN0KSA9PiB0aGlzLmhhbmRsZVJlc3VsdHMocHJvZHVjdCwgcHJvZHVjdERhdGEpKSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcnMocmVzcG9uc2UsIHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlKVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0Q29kZTogcHJvZHVjdERhdGEucHJvZHVjdENvZGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5MSU1JVF9FWENFRURFRCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkucGlwZShtZXJnZUFsbCgpLCB0YWtlKHByb2R1Y3RzRGF0YS5sZW5ndGgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVSZXN1bHRzKFxuICAgIHByb2R1Y3Q6IFByb2R1Y3QsXG4gICAgcHJvZHVjdERhdGE6IFByb2R1Y3REYXRhXG4gICk6IFByb2R1Y3RJbXBvcnRJbmZvIHtcbiAgICBpZiAoXG4gICAgICBwcm9kdWN0LnN0b2NrPy5zdG9ja0xldmVsICYmXG4gICAgICBwcm9kdWN0RGF0YS5xdWFudGl0eSA+IHByb2R1Y3Quc3RvY2suc3RvY2tMZXZlbFxuICAgICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlLFxuICAgICAgICBwcm9kdWN0TmFtZTogcHJvZHVjdD8ubmFtZSxcbiAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5MT1dfU1RPQ0ssXG4gICAgICAgIHF1YW50aXR5OiBwcm9kdWN0RGF0YS5xdWFudGl0eSxcbiAgICAgICAgcXVhbnRpdHlBZGRlZDogcHJvZHVjdC5zdG9jay5zdG9ja0xldmVsLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHByb2R1Y3Quc3RvY2s/LnN0b2NrTGV2ZWxTdGF0dXMgPT09ICdvdXRPZlN0b2NrJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLk5PX1NUT0NLLFxuICAgICAgICBwcm9kdWN0TmFtZTogcHJvZHVjdD8ubmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3RDb2RlOiBwcm9kdWN0RGF0YS5wcm9kdWN0Q29kZSxcbiAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5TVUNDRVNTLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3JzKFxuICAgIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nXG4gICk6IFByb2R1Y3RJbXBvcnRJbmZvIHtcbiAgICBpZiAocmVzcG9uc2U/LmVycm9yPy5lcnJvcnNbMF0udHlwZSA9PT0gJ1Vua25vd25JZGVudGlmaWVyRXJyb3InKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5VTktOT1dOX0lERU5USUZJRVIsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdVbnJlY29nbml6ZWQgY2FydCBhZGQgZW50cnkgYWN0aW9uIHR5cGUgd2hpbGUgbWFwcGluZyBtZXNzYWdlcycsXG4gICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLlVOS05PV05fRVJST1IsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19