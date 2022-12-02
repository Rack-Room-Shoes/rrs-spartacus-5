/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class ActiveCartFacade {
}
ActiveCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ActiveCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getActive',
            'takeActive',
            'getActiveCartId',
            'takeActiveCartId',
            'getEntries',
            'getLastEntry',
            'getLoading',
            'isStable',
            'addEntry',
            'removeEntry',
            'updateEntry',
            'getEntry',
            'addEmail',
            'getAssignedUser',
            'isGuestCart',
            'addEntries',
            'requireLoadedCart',
            'reloadActiveCart',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ActiveCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ActiveCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getActive',
                            'takeActive',
                            'getActiveCartId',
                            'takeActiveCartId',
                            'getEntries',
                            'getLastEntry',
                            'getLoading',
                            'isStable',
                            'addEntry',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
                            'addEmail',
                            'getAssignedUser',
                            'isGuestCart',
                            'addEntries',
                            'requireLoadedCart',
                            'reloadActiveCart',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWNhcnQuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9yb290L2ZhY2FkZS9hY3RpdmUtY2FydC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRXRELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQWdDekQsTUFBTSxPQUFnQixnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7aUhBQWhCLGdCQUFnQixjQTVCeEIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUU7WUFDUCxXQUFXO1lBQ1gsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixrQkFBa0I7WUFDbEIsWUFBWTtZQUNaLGNBQWM7WUFDZCxZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7WUFDVixhQUFhO1lBQ2IsYUFBYTtZQUNiLFVBQVU7WUFDVixVQUFVO1lBQ1YsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGtCQUFrQjtTQUNuQjtRQUNELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQzsyRkFFZ0IsZ0JBQWdCO2tCQTdCckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLGtCQUFrQjt3QkFDeEIsT0FBTyxFQUFFLHNCQUFzQjt3QkFDL0IsT0FBTyxFQUFFOzRCQUNQLFdBQVc7NEJBQ1gsWUFBWTs0QkFDWixpQkFBaUI7NEJBQ2pCLGtCQUFrQjs0QkFDbEIsWUFBWTs0QkFDWixjQUFjOzRCQUNkLFlBQVk7NEJBQ1osVUFBVTs0QkFDVixVQUFVOzRCQUNWLGFBQWE7NEJBQ2IsYUFBYTs0QkFDYixVQUFVOzRCQUNWLFVBQVU7NEJBQ1YsaUJBQWlCOzRCQUNqQixhQUFhOzRCQUNiLFlBQVk7NEJBQ1osbUJBQW1COzRCQUNuQixrQkFBa0I7eUJBQ25CO3dCQUNELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5LCBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENBUlRfQkFTRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHsgQ2FydCwgT3JkZXJFbnRyeSB9IGZyb20gJy4uL21vZGVscy9jYXJ0Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDQVJUX0JBU0VfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnZ2V0QWN0aXZlJyxcbiAgICAgICAgJ3Rha2VBY3RpdmUnLFxuICAgICAgICAnZ2V0QWN0aXZlQ2FydElkJyxcbiAgICAgICAgJ3Rha2VBY3RpdmVDYXJ0SWQnLFxuICAgICAgICAnZ2V0RW50cmllcycsXG4gICAgICAgICdnZXRMYXN0RW50cnknLFxuICAgICAgICAnZ2V0TG9hZGluZycsXG4gICAgICAgICdpc1N0YWJsZScsXG4gICAgICAgICdhZGRFbnRyeScsXG4gICAgICAgICdyZW1vdmVFbnRyeScsXG4gICAgICAgICd1cGRhdGVFbnRyeScsXG4gICAgICAgICdnZXRFbnRyeScsXG4gICAgICAgICdhZGRFbWFpbCcsXG4gICAgICAgICdnZXRBc3NpZ25lZFVzZXInLFxuICAgICAgICAnaXNHdWVzdENhcnQnLFxuICAgICAgICAnYWRkRW50cmllcycsXG4gICAgICAgICdyZXF1aXJlTG9hZGVkQ2FydCcsXG4gICAgICAgICdyZWxvYWRBY3RpdmVDYXJ0JyxcbiAgICAgIF0sXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0aXZlQ2FydEZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIGFjdGl2ZSBjYXJ0XG4gICAqL1xuICBhYnN0cmFjdCBnZXRBY3RpdmUoKTogT2JzZXJ2YWJsZTxDYXJ0PjtcblxuICAvKipcbiAgICogV2FpdHMgZm9yIHRoZSBjYXJ0IHRvIGJlIHN0YWJsZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSBhY3RpdmUgY2FydC5cbiAgICovXG4gIGFic3RyYWN0IHRha2VBY3RpdmUoKTogT2JzZXJ2YWJsZTxDYXJ0PjtcblxuICAvKipcbiAgICogUmV0dXJucyBhY3RpdmUgY2FydCBpZFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0QWN0aXZlQ2FydElkKCk6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogV2FpdHMgZm9yIHRoZSBjYXJ0IHRvIGJlIHN0YWJsZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSBhY3RpdmUgY2FydCdzIElELlxuICAgKi9cbiAgYWJzdHJhY3QgdGFrZUFjdGl2ZUNhcnRJZCgpOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FydCBlbnRyaWVzXG4gICAqL1xuICBhYnN0cmFjdCBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPjtcblxuICAvKipcbiAgICogUmV0dXJucyBsYXN0IGNhcnQgZW50cnkgZm9yIHByb3ZpZGVkIHByb2R1Y3QgY29kZS5cbiAgICogTmVlZGVkIHRvIGNvdmVyIHByb2Nlc3NlcyB3aGVyZSBtdWx0aXBsZSBlbnRyaWVzIGNhbiBzaGFyZSB0aGUgc2FtZSBwcm9kdWN0IGNvZGVcbiAgICogKGUuZy4gcHJvbW90aW9ucyBvciBjb25maWd1cmFibGUgcHJvZHVjdHMpXG4gICAqXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TGFzdEVudHJ5KFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPjtcblxuICAvKipcbiAgICogUmV0dXJucyBjYXJ0IGxvYWRpbmcgc3RhdGVcbiAgICovXG4gIGFic3RyYWN0IGdldExvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gY2FydCBpcyBzdGFibGUgKG5vdCBsb2FkaW5nIGFuZCBub3QgcGVuZGluZyBwcm9jZXNzZXMgb24gY2FydClcbiAgICovXG4gIGFic3RyYWN0IGlzU3RhYmxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEFkZCBlbnRyeSB0byBhY3RpdmUgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICogQHBhcmFtIHF1YW50aXR5XG4gICAqL1xuICBhYnN0cmFjdCBhZGRFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nLCBxdWFudGl0eTogbnVtYmVyKTogdm9pZDtcblxuICAvKipcbiAgICogUmVtb3ZlIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlRW50cnkoZW50cnk6IE9yZGVyRW50cnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIGVudHJ5TnVtYmVyXG4gICAqIEBwYXJhbSBxdWFudGl0eVxuICAgKi9cbiAgYWJzdHJhY3QgdXBkYXRlRW50cnkoZW50cnlOdW1iZXI6IG51bWJlciwgcXVhbnRpdHk6IG51bWJlcik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FydCBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICovXG4gIGFic3RyYWN0IGdldEVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnkgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBBc3NpZ24gZW1haWwgdG8gY2FydFxuICAgKlxuICAgKiBAcGFyYW0gZW1haWxcbiAgICovXG4gIGFic3RyYWN0IGFkZEVtYWlsKGVtYWlsOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBHZXQgYXNzaWduZWQgdXNlciB0byBjYXJ0XG4gICAqL1xuICBhYnN0cmFjdCBnZXRBc3NpZ25lZFVzZXIoKTogT2JzZXJ2YWJsZTxVc2VyPjtcblxuICAvKipcbiAgICogUmV0dXJucyBvYnNlcnZhYmxlIG9mIHRydWUgZm9yIGd1ZXN0IGNhcnRcbiAgICovXG4gIGFic3RyYWN0IGlzR3Vlc3RDYXJ0KGNhcnQ/OiBDYXJ0KTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogQWRkIG11bHRpcGxlIGVudHJpZXMgdG8gYSBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0RW50cmllcyA6IGxpc3Qgb2YgZW50cmllcyB0byBhZGQgKE9yZGVyRW50cnlbXSlcbiAgICovXG4gIGFic3RyYWN0IGFkZEVudHJpZXMoY2FydEVudHJpZXM6IE9yZGVyRW50cnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgcmVxdWlyZUxvYWRlZENhcnQoZm9yR3Vlc3RNZXJnZT86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIGFic3RyYWN0IHJlbG9hZEFjdGl2ZUNhcnQoKTogdm9pZDtcbn1cbiJdfQ==