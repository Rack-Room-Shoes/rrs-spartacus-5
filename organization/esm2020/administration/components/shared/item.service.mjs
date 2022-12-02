/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { FormUtils } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./current-item.service";
import * as i2 from "@spartacus/core";
import * as i3 from "./form/form.service";
/**
 * Provides CRUD operations for all organization entities.
 *
 * This base class simplifies the various entity implementation, and ensures a consistent
 * component implementation.
 */
export class ItemService {
    constructor(currentItemService, routingService, formService) {
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.key$ = this.currentItemService.key$;
        this.current$ = this.currentItemService.item$;
        this.isInEditMode$ = new BehaviorSubject(false);
        /**
         * Returns the current business unit code.
         *
         * The current unit is driven by the route parameter.
         */
        this.unit$ = this.currentItemService.b2bUnit$;
        this.error$ = this.key$.pipe(switchMap((key) => this.currentItemService.getError(key)));
    }
    save(form, key) {
        if (form.invalid) {
            form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(form);
            return of();
        }
        else {
            /**
             * This assignment is needed to re-use form value after `form.disable()` call
             * In some cases value was converted by `form.disable()` into empty object
             */
            const formValue = form.value;
            form.disable();
            return key ? this.update(key, formValue) : this.create(formValue);
        }
    }
    getForm(item) {
        return this.formService.getForm(item);
    }
    /**
     * Launches the detailed route for the given item item.
     */
    launchDetails(item) {
        const cxRoute = this.getDetailsRoute();
        const params = this.buildRouteParams(item);
        if (cxRoute && item && Object.keys(item).length > 0) {
            this.routingService.go({ cxRoute, params });
        }
    }
    /**
     * Returns the route parameters that are used when launching the
     * details page. The route parameters default to the actual item,
     * but can be further populated in implementations.
     *
     * Customized route parameters are useful in case the actual item
     * doesn't match the expected route parameters. You can manipulate
     * the parameter data.
     */
    buildRouteParams(item) {
        return item;
    }
    getRouterParam(key) {
        return this.currentItemService.getRouterParam(key);
    }
    /**
     * Sets to true when the user is on the entity item form page
     */
    setEditMode(isInEdit) {
        this.isInEditMode$.next(isInEdit);
    }
}
ItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ItemService, deps: [{ token: i1.CurrentItemService }, { token: i2.RoutingService }, { token: i3.FormService }], target: i0.ɵɵFactoryTarget.Injectable });
ItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CurrentItemService }, { type: i2.RoutingService }, { type: i3.FormService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFJM0M7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQWdCLFdBQVc7SUFDL0IsWUFDWSxrQkFBeUMsRUFDekMsY0FBOEIsRUFDOUIsV0FBMkI7UUFGM0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUN6QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBR3ZDLFNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQ3BDLGFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBRXpDLGtCQUFhLEdBQXdCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRXpFOzs7O1dBSUc7UUFDSCxVQUFLLEdBQXVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFFN0QsV0FBTSxHQUF3QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzFELENBQUM7SUFoQkMsQ0FBQztJQWtCSixJQUFJLENBQ0YsSUFBc0IsRUFDdEIsR0FBWTtRQUVaLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixTQUFTLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsT0FBTyxFQUFFLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDTDs7O2VBR0c7WUFDSCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVmLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuRTtJQUNILENBQUM7SUE2QkQsT0FBTyxDQUFDLElBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWEsQ0FBQyxJQUFRO1FBQ3BCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ08sZ0JBQWdCLENBQUMsSUFBUTtRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxjQUFjLENBQUMsR0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLFFBQWlCO1FBQzFCLElBQUksQ0FBQyxhQUEwQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDOzt3R0EzR21CLFdBQVc7NEdBQVgsV0FBVzsyRkFBWCxXQUFXO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IEZvcm1VdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDdXJyZW50SXRlbVNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi9mb3JtL2Zvcm0uc2VydmljZSc7XG5cbi8qKlxuICogUHJvdmlkZXMgQ1JVRCBvcGVyYXRpb25zIGZvciBhbGwgb3JnYW5pemF0aW9uIGVudGl0aWVzLlxuICpcbiAqIFRoaXMgYmFzZSBjbGFzcyBzaW1wbGlmaWVzIHRoZSB2YXJpb3VzIGVudGl0eSBpbXBsZW1lbnRhdGlvbiwgYW5kIGVuc3VyZXMgYSBjb25zaXN0ZW50XG4gKiBjb21wb25lbnQgaW1wbGVtZW50YXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJdGVtU2VydmljZTxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRJdGVtU2VydmljZTxUPixcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmb3JtU2VydmljZTogRm9ybVNlcnZpY2U8VD5cbiAgKSB7fVxuXG4gIGtleSQgPSB0aGlzLmN1cnJlbnRJdGVtU2VydmljZS5rZXkkO1xuICBjdXJyZW50JCA9IHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLml0ZW0kO1xuXG4gIGlzSW5FZGl0TW9kZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBidXNpbmVzcyB1bml0IGNvZGUuXG4gICAqXG4gICAqIFRoZSBjdXJyZW50IHVuaXQgaXMgZHJpdmVuIGJ5IHRoZSByb3V0ZSBwYXJhbWV0ZXIuXG4gICAqL1xuICB1bml0JDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5jdXJyZW50SXRlbVNlcnZpY2UuYjJiVW5pdCQ7XG5cbiAgZXJyb3IkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5rZXkkLnBpcGUoXG4gICAgc3dpdGNoTWFwKChrZXkpID0+IHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLmdldEVycm9yKGtleSkpXG4gICk7XG5cbiAgc2F2ZShcbiAgICBmb3JtOiBVbnR5cGVkRm9ybUdyb3VwLFxuICAgIGtleT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+IHtcbiAgICBpZiAoZm9ybS5pbnZhbGlkKSB7XG4gICAgICBmb3JtLm1hcmtBbGxBc1RvdWNoZWQoKTtcbiAgICAgIEZvcm1VdGlscy5kZWVwVXBkYXRlVmFsdWVBbmRWYWxpZGl0eShmb3JtKTtcbiAgICAgIHJldHVybiBvZigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgYXNzaWdubWVudCBpcyBuZWVkZWQgdG8gcmUtdXNlIGZvcm0gdmFsdWUgYWZ0ZXIgYGZvcm0uZGlzYWJsZSgpYCBjYWxsXG4gICAgICAgKiBJbiBzb21lIGNhc2VzIHZhbHVlIHdhcyBjb252ZXJ0ZWQgYnkgYGZvcm0uZGlzYWJsZSgpYCBpbnRvIGVtcHR5IG9iamVjdFxuICAgICAgICovXG4gICAgICBjb25zdCBmb3JtVmFsdWUgPSBmb3JtLnZhbHVlO1xuICAgICAgZm9ybS5kaXNhYmxlKCk7XG5cbiAgICAgIHJldHVybiBrZXkgPyB0aGlzLnVwZGF0ZShrZXksIGZvcm1WYWx1ZSkgOiB0aGlzLmNyZWF0ZShmb3JtVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGl0ZW0uXG4gICAqL1xuICBkZWxldGU/KFxuICAgIGtleTogc3RyaW5nLFxuICAgIGFkZGl0aW9uYWxQYXJhbT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+O1xuICAvKipcbiAgICogTG9hZHMgYW4gaXRlbS5cbiAgICovXG4gIGFic3RyYWN0IGxvYWQoLi4ucGFyYW1zOiBhbnlbXSk6IE9ic2VydmFibGU8VD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaXRlbS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGUodmFsdWU6IFQpOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+O1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFuIGV4aXN0aW5nIGl0ZW0uXG4gICAqL1xuICBhYnN0cmFjdCB1cGRhdGUoa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFQ+PjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZGV0YWlsZWQgY3hSb3V0ZSBmb3IgdGhlIG9yZ2FuaXphdGlvbiBpdGVtLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdldERldGFpbHNSb3V0ZSgpOiBzdHJpbmc7XG5cbiAgZ2V0Rm9ybShpdGVtPzogVCk6IFVudHlwZWRGb3JtR3JvdXAgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtU2VydmljZS5nZXRGb3JtKGl0ZW0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExhdW5jaGVzIHRoZSBkZXRhaWxlZCByb3V0ZSBmb3IgdGhlIGdpdmVuIGl0ZW0gaXRlbS5cbiAgICovXG4gIGxhdW5jaERldGFpbHMoaXRlbT86IFQpOiB2b2lkIHtcbiAgICBjb25zdCBjeFJvdXRlID0gdGhpcy5nZXREZXRhaWxzUm91dGUoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmJ1aWxkUm91dGVQYXJhbXMoaXRlbSk7XG4gICAgaWYgKGN4Um91dGUgJiYgaXRlbSAmJiBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHsgY3hSb3V0ZSwgcGFyYW1zIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByb3V0ZSBwYXJhbWV0ZXJzIHRoYXQgYXJlIHVzZWQgd2hlbiBsYXVuY2hpbmcgdGhlXG4gICAqIGRldGFpbHMgcGFnZS4gVGhlIHJvdXRlIHBhcmFtZXRlcnMgZGVmYXVsdCB0byB0aGUgYWN0dWFsIGl0ZW0sXG4gICAqIGJ1dCBjYW4gYmUgZnVydGhlciBwb3B1bGF0ZWQgaW4gaW1wbGVtZW50YXRpb25zLlxuICAgKlxuICAgKiBDdXN0b21pemVkIHJvdXRlIHBhcmFtZXRlcnMgYXJlIHVzZWZ1bCBpbiBjYXNlIHRoZSBhY3R1YWwgaXRlbVxuICAgKiBkb2Vzbid0IG1hdGNoIHRoZSBleHBlY3RlZCByb3V0ZSBwYXJhbWV0ZXJzLiBZb3UgY2FuIG1hbmlwdWxhdGVcbiAgICogdGhlIHBhcmFtZXRlciBkYXRhLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkUm91dGVQYXJhbXMoaXRlbT86IFQpOiBhbnkge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgZ2V0Um91dGVyUGFyYW0oa2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRJdGVtU2VydmljZS5nZXRSb3V0ZXJQYXJhbShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdG8gdHJ1ZSB3aGVuIHRoZSB1c2VyIGlzIG9uIHRoZSBlbnRpdHkgaXRlbSBmb3JtIHBhZ2VcbiAgICovXG4gIHNldEVkaXRNb2RlKGlzSW5FZGl0OiBib29sZWFuKSB7XG4gICAgKHRoaXMuaXNJbkVkaXRNb2RlJCBhcyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4pLm5leHQoaXNJbkVkaXQpO1xuICB9XG59XG4iXX0=