/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { USER_ACCOUNT_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class UserAccountFacade {
}
UserAccountFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserAccountFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserAccountFacade,
        feature: USER_ACCOUNT_CORE_FEATURE,
        methods: ['get'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserAccountFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserAccountFacade,
                        feature: USER_ACCOUNT_CORE_FEATURE,
                        methods: ['get'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL2FjY291bnQvcm9vdC9mYWNhZGUvdXNlci1hY2NvdW50LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBVzVELE1BQU0sT0FBZ0IsaUJBQWlCOzs4R0FBakIsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FSekIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDakIsQ0FBQzsyRkFFZ0IsaUJBQWlCO2tCQVR0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sbUJBQW1CO3dCQUN6QixPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7cUJBQ2pCLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWwvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVTRVJfQUNDT1VOVF9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogVXNlckFjY291bnRGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBVU0VSX0FDQ09VTlRfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWydnZXQnXSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXNlckFjY291bnRGYWNhZGUge1xuICBhYnN0cmFjdCBnZXQoKTogT2JzZXJ2YWJsZTxVc2VyIHwgdW5kZWZpbmVkPjtcbn1cbiJdfQ==