/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/references/product-references.connector";
export class ProductReferencesEffects {
    constructor(actions$, productReferencesConnector) {
        this.actions$ = actions$;
        this.productReferencesConnector = productReferencesConnector;
        this.loadProductReferences$ = createEffect(() => this.actions$.pipe(ofType(ProductActions.LOAD_PRODUCT_REFERENCES), map((action) => action.payload), mergeMap((payload) => {
            return this.productReferencesConnector
                .get(payload.productCode, payload.referenceType, payload.pageSize)
                .pipe(map((data) => {
                return new ProductActions.LoadProductReferencesSuccess({
                    productCode: payload.productCode,
                    list: data,
                });
            }), catchError((_error) => of(new ProductActions.LoadProductReferencesFail({
                message: payload.productCode,
            }))));
        })));
    }
}
ProductReferencesEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductReferencesEffects, deps: [{ token: i1.Actions }, { token: i2.ProductReferencesConnector }], target: i0.ɵɵFactoryTarget.Injectable });
ProductReferencesEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductReferencesEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductReferencesEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.ProductReferencesConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1yZWZlcmVuY2VzLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3Byb2R1Y3Qvc3RvcmUvZWZmZWN0cy9wcm9kdWN0LXJlZmVyZW5jZXMuZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBR2xELE1BQU0sT0FBTyx3QkFBd0I7SUE4Qm5DLFlBQ1UsUUFBaUIsRUFDakIsMEJBQXNEO1FBRHRELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQS9CaEUsMkJBQXNCLEdBR2xCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsRUFDOUMsR0FBRyxDQUFDLENBQUMsTUFBNEMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNyRSxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQywwQkFBMEI7aUJBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztpQkFDakUsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxjQUFjLENBQUMsNEJBQTRCLENBQUM7b0JBQ3JELFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztvQkFDaEMsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDcEIsRUFBRSxDQUNBLElBQUksY0FBYyxDQUFDLHlCQUF5QixDQUFDO2dCQUMzQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVc7YUFDZixDQUFDLENBQ2pCLENBQ0YsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO0lBS0MsQ0FBQzs7cUhBakNPLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zLCBjcmVhdGVFZmZlY3QsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFcnJvck1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvbWlzYy5tb2RlbCc7XG5pbXBvcnQgeyBQcm9kdWN0UmVmZXJlbmNlc0Nvbm5lY3RvciB9IGZyb20gJy4uLy4uL2Nvbm5lY3RvcnMvcmVmZXJlbmNlcy9wcm9kdWN0LXJlZmVyZW5jZXMuY29ubmVjdG9yJztcbmltcG9ydCB7IFByb2R1Y3RBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0UmVmZXJlbmNlc0VmZmVjdHMge1xuICBsb2FkUHJvZHVjdFJlZmVyZW5jZXMkOiBPYnNlcnZhYmxlPFxuICAgIHwgUHJvZHVjdEFjdGlvbnMuTG9hZFByb2R1Y3RSZWZlcmVuY2VzU3VjY2Vzc1xuICAgIHwgUHJvZHVjdEFjdGlvbnMuTG9hZFByb2R1Y3RSZWZlcmVuY2VzRmFpbFxuICA+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKFByb2R1Y3RBY3Rpb25zLkxPQURfUFJPRFVDVF9SRUZFUkVOQ0VTKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBQcm9kdWN0QWN0aW9ucy5Mb2FkUHJvZHVjdFJlZmVyZW5jZXMpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RSZWZlcmVuY2VzQ29ubmVjdG9yXG4gICAgICAgICAgLmdldChwYXlsb2FkLnByb2R1Y3RDb2RlLCBwYXlsb2FkLnJlZmVyZW5jZVR5cGUsIHBheWxvYWQucGFnZVNpemUpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9kdWN0QWN0aW9ucy5Mb2FkUHJvZHVjdFJlZmVyZW5jZXNTdWNjZXNzKHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0Q29kZTogcGF5bG9hZC5wcm9kdWN0Q29kZSxcbiAgICAgICAgICAgICAgICBsaXN0OiBkYXRhLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoX2Vycm9yKSA9PlxuICAgICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgICBuZXcgUHJvZHVjdEFjdGlvbnMuTG9hZFByb2R1Y3RSZWZlcmVuY2VzRmFpbCh7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiBwYXlsb2FkLnByb2R1Y3RDb2RlLFxuICAgICAgICAgICAgICAgIH0gYXMgRXJyb3JNb2RlbClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICB9KVxuICAgIClcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvZHVjdFJlZmVyZW5jZXNDb25uZWN0b3I6IFByb2R1Y3RSZWZlcmVuY2VzQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==