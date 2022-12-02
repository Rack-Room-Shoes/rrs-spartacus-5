/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, isDevMode, } from '@angular/core';
import { resolveApplicable } from '@spartacus/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
import * as i1 from "../../config/layout-config";
export class LaunchDialogService {
    constructor(renderStrategies, layoutConfig) {
        this.renderStrategies = renderStrategies;
        this.layoutConfig = layoutConfig;
        this._dialogClose = new BehaviorSubject(undefined);
        this._dataSubject = new BehaviorSubject(undefined);
        this.renderStrategies = this.renderStrategies || [];
    }
    get data$() {
        return this._dataSubject.asObservable();
    }
    /**
     * Open the dialog
     *
     * @param caller LAUNCH_CALLER
     * @param openElement button's Element ref
     * @param vcr View Container Ref of the container for inline rendering
     * @param data optional data which could be passed to dialog
     */
    openDialog(caller, openElement, vcr, data) {
        const component = this.launch(caller, vcr, data);
        if (component) {
            return combineLatest([component, this.dialogClose]).pipe(filter(([, close]) => close !== undefined), tap(([comp]) => {
                openElement?.nativeElement.focus();
                this.clear(caller);
                comp?.destroy();
            }), map(([comp]) => comp));
        }
    }
    /**
     * Render the element based on the strategy from the launch configuration
     *
     * @param caller LAUNCH_CALLER
     * @param vcr View Container Ref of the container for inline rendering
     */
    launch(caller, vcr, data) {
        const config = this.findConfiguration(caller);
        if (config) {
            const renderer = this.getStrategy(config);
            // Render if the strategy exists
            if (renderer) {
                this._dialogClose.next(undefined);
                this._dataSubject.next(data);
                return renderer.render(config, caller, vcr);
            }
        }
        else if (isDevMode()) {
            console.warn('No configuration provided for caller ' + caller);
        }
    }
    /**
     * Opens dialog and subscribe in the service. Should be used if the trigger component might get destroyed while the component is open.
     *
     * @param caller Launch Caller
     * @param openElement Element to open
     * @param data Data to provide to the rendered element
     */
    openDialogAndSubscribe(caller, openElement, data) {
        this.openDialog(caller, openElement, undefined, data)
            ?.pipe(take(1))
            .subscribe();
    }
    /**
     * Util method to remove element from rendered elements list
     *
     * @param caller LAUNCH_CALLER
     */
    clear(caller) {
        const config = this.findConfiguration(caller);
        if (config) {
            const renderer = this.getStrategy(config);
            // Render if the strategy exists
            if (renderer) {
                renderer.remove(caller, config);
            }
        }
    }
    get dialogClose() {
        return this._dialogClose.asObservable();
    }
    closeDialog(reason) {
        this._dialogClose.next(reason);
    }
    /**
     * Returns the configuration for the caller
     *
     * @param caller LAUNCH_CALLER
     */
    findConfiguration(caller) {
        if (this.layoutConfig?.launch) {
            return this.layoutConfig.launch[caller];
        }
        return undefined;
    }
    /**
     * Returns the render strategy based on the configuration
     *
     * @param config Configuration for launch
     */
    getStrategy(config) {
        return resolveApplicable(this.renderStrategies, [config]);
    }
}
LaunchDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LaunchDialogService, deps: [{ token: LaunchRenderStrategy }, { token: i1.LayoutConfig }], target: i0.ɵɵFactoryTarget.Injectable });
LaunchDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LaunchDialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LaunchDialogService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LaunchRenderStrategy]
                }] }, { type: i1.LayoutConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvbGF1bmNoLWRpYWxvZy9zZXJ2aWNlcy9sYXVuY2gtZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFHTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQUdoRSxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLFlBRVksZ0JBQXdDLEVBQ3hDLFlBQTBCO1FBRDFCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBd0I7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFWOUIsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBa0IsU0FBUyxDQUFDLENBQUM7UUFDL0QsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBTSxTQUFTLENBQUMsQ0FBQztRQVd6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBVkQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFVRDs7Ozs7OztPQU9HO0lBQ0gsVUFBVSxDQUNSLE1BQThCLEVBQzlCLFdBQXdCLEVBQ3hCLEdBQXNCLEVBQ3RC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QztJQUNuQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLFdBQVcsQ0FDbkIsTUFBcUI7UUFFckIsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7O2dIQXpJVSxtQkFBbUIsa0JBU3BCLG9CQUFvQjtvSEFUbkIsbUJBQW1CLGNBRE4sTUFBTTsyRkFDbkIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBVTdCLE1BQU07MkJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIGlzRGV2TW9kZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZXNvbHZlQXBwbGljYWJsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMYXlvdXRDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvbGF5b3V0LWNvbmZpZyc7XG5pbXBvcnQgeyBMYXVuY2hPcHRpb25zLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnLi4vY29uZmlnL2xhdW5jaC1jb25maWcnO1xuaW1wb3J0IHsgTGF1bmNoUmVuZGVyU3RyYXRlZ3kgfSBmcm9tICcuL2xhdW5jaC1yZW5kZXIuc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIExhdW5jaERpYWxvZ1NlcnZpY2Uge1xuICBwcml2YXRlIF9kaWFsb2dDbG9zZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICBwcml2YXRlIF9kYXRhU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55Pih1bmRlZmluZWQpO1xuXG4gIGdldCBkYXRhJCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTGF1bmNoUmVuZGVyU3RyYXRlZ3kpXG4gICAgcHJvdGVjdGVkIHJlbmRlclN0cmF0ZWdpZXM6IExhdW5jaFJlbmRlclN0cmF0ZWd5W10sXG4gICAgcHJvdGVjdGVkIGxheW91dENvbmZpZzogTGF5b3V0Q29uZmlnXG4gICkge1xuICAgIHRoaXMucmVuZGVyU3RyYXRlZ2llcyA9IHRoaXMucmVuZGVyU3RyYXRlZ2llcyB8fCBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBkaWFsb2dcbiAgICpcbiAgICogQHBhcmFtIGNhbGxlciBMQVVOQ0hfQ0FMTEVSXG4gICAqIEBwYXJhbSBvcGVuRWxlbWVudCBidXR0b24ncyBFbGVtZW50IHJlZlxuICAgKiBAcGFyYW0gdmNyIFZpZXcgQ29udGFpbmVyIFJlZiBvZiB0aGUgY29udGFpbmVyIGZvciBpbmxpbmUgcmVuZGVyaW5nXG4gICAqIEBwYXJhbSBkYXRhIG9wdGlvbmFsIGRhdGEgd2hpY2ggY291bGQgYmUgcGFzc2VkIHRvIGRpYWxvZ1xuICAgKi9cbiAgb3BlbkRpYWxvZyhcbiAgICBjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcsXG4gICAgb3BlbkVsZW1lbnQ/OiBFbGVtZW50UmVmLFxuICAgIHZjcj86IFZpZXdDb250YWluZXJSZWYsXG4gICAgZGF0YT86IGFueVxuICApOiBPYnNlcnZhYmxlPGFueT4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMubGF1bmNoKGNhbGxlciwgdmNyLCBkYXRhKTtcblxuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtjb21wb25lbnQsIHRoaXMuZGlhbG9nQ2xvc2VdKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKFssIGNsb3NlXSkgPT4gY2xvc2UgIT09IHVuZGVmaW5lZCksXG4gICAgICAgIHRhcCgoW2NvbXBdKSA9PiB7XG4gICAgICAgICAgb3BlbkVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmNsZWFyKGNhbGxlcik7XG4gICAgICAgICAgY29tcD8uZGVzdHJveSgpO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKChbY29tcF0pID0+IGNvbXApXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmVuZGVyIHRoZSBlbGVtZW50IGJhc2VkIG9uIHRoZSBzdHJhdGVneSBmcm9tIHRoZSBsYXVuY2ggY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGVyIExBVU5DSF9DQUxMRVJcbiAgICogQHBhcmFtIHZjciBWaWV3IENvbnRhaW5lciBSZWYgb2YgdGhlIGNvbnRhaW5lciBmb3IgaW5saW5lIHJlbmRlcmluZ1xuICAgKi9cbiAgbGF1bmNoKFxuICAgIGNhbGxlcjogTEFVTkNIX0NBTExFUiB8IHN0cmluZyxcbiAgICB2Y3I/OiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGRhdGE/OiBhbnlcbiAgKTogdm9pZCB8IE9ic2VydmFibGU8Q29tcG9uZW50UmVmPGFueT4gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmZpbmRDb25maWd1cmF0aW9uKGNhbGxlcik7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFN0cmF0ZWd5KGNvbmZpZyk7XG5cbiAgICAgIC8vIFJlbmRlciBpZiB0aGUgc3RyYXRlZ3kgZXhpc3RzXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nQ2xvc2UubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLl9kYXRhU3ViamVjdC5uZXh0KGRhdGEpO1xuXG4gICAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXIoY29uZmlnLCBjYWxsZXIsIHZjcik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS53YXJuKCdObyBjb25maWd1cmF0aW9uIHByb3ZpZGVkIGZvciBjYWxsZXIgJyArIGNhbGxlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGRpYWxvZyBhbmQgc3Vic2NyaWJlIGluIHRoZSBzZXJ2aWNlLiBTaG91bGQgYmUgdXNlZCBpZiB0aGUgdHJpZ2dlciBjb21wb25lbnQgbWlnaHQgZ2V0IGRlc3Ryb3llZCB3aGlsZSB0aGUgY29tcG9uZW50IGlzIG9wZW4uXG4gICAqXG4gICAqIEBwYXJhbSBjYWxsZXIgTGF1bmNoIENhbGxlclxuICAgKiBAcGFyYW0gb3BlbkVsZW1lbnQgRWxlbWVudCB0byBvcGVuXG4gICAqIEBwYXJhbSBkYXRhIERhdGEgdG8gcHJvdmlkZSB0byB0aGUgcmVuZGVyZWQgZWxlbWVudFxuICAgKi9cbiAgb3BlbkRpYWxvZ0FuZFN1YnNjcmliZShcbiAgICBjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcsXG4gICAgb3BlbkVsZW1lbnQ/OiBFbGVtZW50UmVmLFxuICAgIGRhdGE/OiBhbnlcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKGNhbGxlciwgb3BlbkVsZW1lbnQsIHVuZGVmaW5lZCwgZGF0YSlcbiAgICAgID8ucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFV0aWwgbWV0aG9kIHRvIHJlbW92ZSBlbGVtZW50IGZyb20gcmVuZGVyZWQgZWxlbWVudHMgbGlzdFxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGVyIExBVU5DSF9DQUxMRVJcbiAgICovXG4gIGNsZWFyKGNhbGxlcjogTEFVTkNIX0NBTExFUiB8IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZmluZENvbmZpZ3VyYXRpb24oY2FsbGVyKTtcblxuICAgIGlmIChjb25maWcpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRTdHJhdGVneShjb25maWcpO1xuXG4gICAgICAvLyBSZW5kZXIgaWYgdGhlIHN0cmF0ZWd5IGV4aXN0c1xuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZShjYWxsZXIsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRpYWxvZ0Nsb3NlKCk6IE9ic2VydmFibGU8YW55IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpYWxvZ0Nsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY2xvc2VEaWFsb2cocmVhc29uOiBhbnkpIHtcbiAgICB0aGlzLl9kaWFsb2dDbG9zZS5uZXh0KHJlYXNvbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIGNhbGxlclxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGVyIExBVU5DSF9DQUxMRVJcbiAgICovXG4gIHByb3RlY3RlZCBmaW5kQ29uZmlndXJhdGlvbihcbiAgICBjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmdcbiAgKTogTGF1bmNoT3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMubGF5b3V0Q29uZmlnPy5sYXVuY2gpIHtcbiAgICAgIHJldHVybiB0aGlzLmxheW91dENvbmZpZy5sYXVuY2hbY2FsbGVyXTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZW5kZXIgc3RyYXRlZ3kgYmFzZWQgb24gdGhlIGNvbmZpZ3VyYXRpb25cbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWd1cmF0aW9uIGZvciBsYXVuY2hcbiAgICovXG4gIHByb3RlY3RlZCBnZXRTdHJhdGVneShcbiAgICBjb25maWc6IExhdW5jaE9wdGlvbnNcbiAgKTogTGF1bmNoUmVuZGVyU3RyYXRlZ3kgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiByZXNvbHZlQXBwbGljYWJsZSh0aGlzLnJlbmRlclN0cmF0ZWdpZXMsIFtjb25maWddKTtcbiAgfVxufVxuIl19