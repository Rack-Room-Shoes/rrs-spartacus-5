/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORDER_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class OrderFacade {
}
OrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: OrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'getOrderDetails',
            'clearPlacedOrder',
            'setPlacedOrder',
            'placeOrder',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: OrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: [
                            'getOrderDetails',
                            'clearPlacedOrder',
                            'setPlacedOrder',
                            'placeOrder',
                        ],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL3Jvb3QvZmFjYWRlL29yZGVyLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBaUJyRCxNQUFNLE9BQWdCLFdBQVc7O3dHQUFYLFdBQVc7NEdBQVgsV0FBVyxjQWJuQixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLFdBQVc7UUFDbkIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUU7WUFDUCxpQkFBaUI7WUFDakIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtZQUNoQixZQUFZO1NBQ2I7S0FDRixDQUFDOzJGQUVnQixXQUFXO2tCQWRoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sYUFBYTt3QkFDbkIsT0FBTyxFQUFFLGtCQUFrQjt3QkFDM0IsT0FBTyxFQUFFOzRCQUNQLGlCQUFpQjs0QkFDakIsa0JBQWtCOzRCQUNsQixnQkFBZ0I7NEJBQ2hCLFlBQVk7eUJBQ2I7cUJBQ0YsQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT1JERVJfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vbW9kZWwvb3JkZXIubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogT3JkZXJGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBPUkRFUl9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRPcmRlckRldGFpbHMnLFxuICAgICAgICAnY2xlYXJQbGFjZWRPcmRlcicsXG4gICAgICAgICdzZXRQbGFjZWRPcmRlcicsXG4gICAgICAgICdwbGFjZU9yZGVyJyxcbiAgICAgIF0sXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9yZGVyRmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgb3JkZXJcbiAgICovXG4gIGFic3RyYWN0IGdldE9yZGVyRGV0YWlscygpOiBPYnNlcnZhYmxlPE9yZGVyIHwgdW5kZWZpbmVkPjtcbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY3VycmVudCBvcmRlclxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJQbGFjZWRPcmRlcigpOiB2b2lkO1xuICAvKipcbiAgICogU2V0cyB0aGUgcHJvdmlkZWQgb3JkZXIgYXMgY3VycmVudFxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0UGxhY2VkT3JkZXIob3JkZXI6IE9yZGVyKTogdm9pZDtcbiAgLyoqXG4gICAqIFBsYWNlcyBhbiBvcmRlclxuICAgKi9cbiAgYWJzdHJhY3QgcGxhY2VPcmRlcih0ZXJtc0NoZWNrZWQ6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPE9yZGVyPjtcbn1cbiJdfQ==