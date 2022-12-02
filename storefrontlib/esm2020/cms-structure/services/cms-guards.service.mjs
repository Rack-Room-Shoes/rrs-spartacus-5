/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { getLastValueSync, } from '@spartacus/core';
import { concat, from, isObservable, of } from 'rxjs';
import { endWith, first, skipWhile } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./cms-components.service";
import * as i2 from "@spartacus/core";
export class CmsGuardsService {
    constructor(cmsComponentsService, 
    // TODO:#checkout - handle breaking changes in schematics
    unifiedInjector) {
        this.cmsComponentsService = cmsComponentsService;
        this.unifiedInjector = unifiedInjector;
    }
    cmsPageCanActivate(componentTypes, route, state) {
        const guards = this.cmsComponentsService.getGuards(componentTypes);
        if (guards.length) {
            const canActivateObservables = guards.map((guardClass) => {
                const guard = getLastValueSync(this.unifiedInjector.get(guardClass));
                if (isCanActivate(guard)) {
                    return wrapIntoObservable(guard.canActivate(route, state)).pipe(first());
                }
                else {
                    throw new Error('Invalid CanActivate guard in cmsMapping');
                }
            });
            return concat(...canActivateObservables).pipe(skipWhile((canActivate) => canActivate === true), endWith(true), first());
        }
        else {
            return of(true);
        }
    }
}
CmsGuardsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsGuardsService, deps: [{ token: i1.CmsComponentsService }, { token: i2.UnifiedInjector }], target: i0.ɵɵFactoryTarget.Injectable });
CmsGuardsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsGuardsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsGuardsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentsService }, { type: i2.UnifiedInjector }]; } });
function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        return from(Promise.resolve(value));
    }
    return of(value);
}
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function';
}
function isCanActivate(guard) {
    return guard && isFunction(guard.canActivate);
}
function isFunction(v) {
    return typeof v === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWd1YXJkcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3NlcnZpY2VzL2Ntcy1ndWFyZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsZ0JBQWdCLEdBRWpCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU0zRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ1ksb0JBQTBDO0lBQ3BELHlEQUF5RDtJQUMvQyxlQUFnQztRQUZoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBRTFDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN6QyxDQUFDO0lBRUosa0JBQWtCLENBQ2hCLGNBQXdCLEVBQ3hCLEtBQWdDLEVBQ2hDLEtBQTBCO1FBRTFCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbkUsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUN2RCxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQWMsVUFBVSxDQUFDLENBQ2xELENBQUM7Z0JBQ0YsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLE9BQU8sa0JBQWtCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzdELEtBQUssRUFBRSxDQUNSLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2lCQUM1RDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxNQUFNLENBQUMsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FDM0MsU0FBUyxDQUFDLENBQUMsV0FBOEIsRUFBRSxFQUFFLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxFQUNuRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ2IsS0FBSyxFQUFFLENBQ1IsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtJQUNILENBQUM7OzZHQXBDVSxnQkFBZ0I7aUhBQWhCLGdCQUFnQixjQUZmLE1BQU07MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7QUF3Q0QsU0FBUyxrQkFBa0IsQ0FDekIsS0FBcUM7SUFFckMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUVELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxHQUFRO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxLQUFVO0lBQy9CLE9BQU8sS0FBSyxJQUFJLFVBQVUsQ0FBYyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFJLENBQU07SUFDM0IsT0FBTyxPQUFPLENBQUMsS0FBSyxVQUFVLENBQUM7QUFDakMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0FjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIGdldExhc3RWYWx1ZVN5bmMsXG4gIFVuaWZpZWRJbmplY3Rvcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbmNhdCwgZnJvbSwgaXNPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZW5kV2l0aCwgZmlyc3QsIHNraXBXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9jbXMtY29tcG9uZW50cy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENtc0d1YXJkc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY21zQ29tcG9uZW50c1NlcnZpY2U6IENtc0NvbXBvbmVudHNTZXJ2aWNlLFxuICAgIC8vIFRPRE86I2NoZWNrb3V0IC0gaGFuZGxlIGJyZWFraW5nIGNoYW5nZXMgaW4gc2NoZW1hdGljc1xuICAgIHByb3RlY3RlZCB1bmlmaWVkSW5qZWN0b3I6IFVuaWZpZWRJbmplY3RvclxuICApIHt9XG5cbiAgY21zUGFnZUNhbkFjdGl2YXRlKFxuICAgIGNvbXBvbmVudFR5cGVzOiBzdHJpbmdbXSxcbiAgICByb3V0ZTogQ21zQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdFxuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgY29uc3QgZ3VhcmRzID0gdGhpcy5jbXNDb21wb25lbnRzU2VydmljZS5nZXRHdWFyZHMoY29tcG9uZW50VHlwZXMpO1xuXG4gICAgaWYgKGd1YXJkcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNhbkFjdGl2YXRlT2JzZXJ2YWJsZXMgPSBndWFyZHMubWFwKChndWFyZENsYXNzKSA9PiB7XG4gICAgICAgIGNvbnN0IGd1YXJkID0gZ2V0TGFzdFZhbHVlU3luYyhcbiAgICAgICAgICB0aGlzLnVuaWZpZWRJbmplY3Rvci5nZXQ8Q2FuQWN0aXZhdGU+KGd1YXJkQ2xhc3MpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpc0NhbkFjdGl2YXRlKGd1YXJkKSkge1xuICAgICAgICAgIHJldHVybiB3cmFwSW50b09ic2VydmFibGUoZ3VhcmQuY2FuQWN0aXZhdGUocm91dGUsIHN0YXRlKSkucGlwZShcbiAgICAgICAgICAgIGZpcnN0KClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBDYW5BY3RpdmF0ZSBndWFyZCBpbiBjbXNNYXBwaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY29uY2F0KC4uLmNhbkFjdGl2YXRlT2JzZXJ2YWJsZXMpLnBpcGUoXG4gICAgICAgIHNraXBXaGlsZSgoY2FuQWN0aXZhdGU6IGJvb2xlYW4gfCBVcmxUcmVlKSA9PiBjYW5BY3RpdmF0ZSA9PT0gdHJ1ZSksXG4gICAgICAgIGVuZFdpdGgodHJ1ZSksXG4gICAgICAgIGZpcnN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JhcEludG9PYnNlcnZhYmxlPFQ+KFxuICB2YWx1ZTogVCB8IFByb21pc2U8VD4gfCBPYnNlcnZhYmxlPFQ+XG4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBpZiAoaXNQcm9taXNlKHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh2YWx1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIG9mKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaXNQcm9taXNlKG9iajogYW55KTogb2JqIGlzIFByb21pc2U8YW55PiB7XG4gIHJldHVybiAhIW9iaiAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzQ2FuQWN0aXZhdGUoZ3VhcmQ6IGFueSk6IGd1YXJkIGlzIENhbkFjdGl2YXRlIHtcbiAgcmV0dXJuIGd1YXJkICYmIGlzRnVuY3Rpb248Q2FuQWN0aXZhdGU+KGd1YXJkLmNhbkFjdGl2YXRlKTtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbjxUPih2OiBhbnkpOiB2IGlzIFQge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdmdW5jdGlvbic7XG59XG4iXX0=