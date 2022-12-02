/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CheckoutCostCenterConnector } from './connectors/checkout-cost-center/checkout-cost-center.connector';
import { CheckoutPaymentTypeConnector } from './connectors/checkout-payment-type/checkout-payment-type.connector';
import { facadeProviders } from './facade/facade-providers';
import * as i0 from "@angular/core";
export class CheckoutB2BCoreModule {
}
CheckoutB2BCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BCoreModule });
CheckoutB2BCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BCoreModule, providers: [
        ...facadeProviders,
        CheckoutCostCenterConnector,
        CheckoutPaymentTypeConnector,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CheckoutB2BCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CheckoutCostCenterConnector,
                        CheckoutPaymentTypeConnector,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9jb3JlL2NoZWNrb3V0LWIyYi1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUMvRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBUzVELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBTnJCO1FBQ1QsR0FBRyxlQUFlO1FBQ2xCLDJCQUEyQjtRQUMzQiw0QkFBNEI7S0FDN0I7MkZBRVUscUJBQXFCO2tCQVBqQyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxHQUFHLGVBQWU7d0JBQ2xCLDJCQUEyQjt3QkFDM0IsNEJBQTRCO3FCQUM3QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dENvc3RDZW50ZXJDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY2hlY2tvdXQtY29zdC1jZW50ZXIvY2hlY2tvdXQtY29zdC1jZW50ZXIuY29ubmVjdG9yJztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudFR5cGVDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY2hlY2tvdXQtcGF5bWVudC10eXBlL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5jb25uZWN0b3InO1xuaW1wb3J0IHsgZmFjYWRlUHJvdmlkZXJzIH0gZnJvbSAnLi9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmZhY2FkZVByb3ZpZGVycyxcbiAgICBDaGVja291dENvc3RDZW50ZXJDb25uZWN0b3IsXG4gICAgQ2hlY2tvdXRQYXltZW50VHlwZUNvbm5lY3RvcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRCMkJDb3JlTW9kdWxlIHt9XG4iXX0=