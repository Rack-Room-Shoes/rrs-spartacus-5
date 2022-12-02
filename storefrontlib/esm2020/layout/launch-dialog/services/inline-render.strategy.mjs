/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, isDevMode, } from '@angular/core';
import { of } from 'rxjs';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export class InlineRenderStrategy extends LaunchRenderStrategy {
    constructor(document, rendererFactory, componentFactoryResolver) {
        super(document, rendererFactory);
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * Renders the component from the configuration in the view container ref
     *
     * @param config
     * @param caller
     * @param vcr
     */
    render(config, caller, vcr) {
        // Only render if a ViewContainerRef is provided
        if (vcr && this.shouldRender(caller, config)) {
            const template = this.componentFactoryResolver.resolveComponentFactory(config.component);
            const component = vcr.createComponent(template);
            if (config?.dialogType) {
                this.applyClasses(component, config?.dialogType);
            }
            this.renderedCallers.push({ caller, element: vcr.element, component });
            return of(component);
        }
        else if (isDevMode()) {
            if (!vcr) {
                console.warn(`No view container ref provided for ${caller}`);
            }
            else {
                console.warn(`Element for ${caller} already rendered. To allow multi rendering add property multi: true.`);
            }
        }
    }
    hasMatch(config) {
        return Boolean(config.inline);
    }
}
InlineRenderStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: InlineRenderStrategy, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
InlineRenderStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: InlineRenderStrategy, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: InlineRenderStrategy, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLXJlbmRlci5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2xhdW5jaC1kaWFsb2cvc2VydmljZXMvaW5saW5lLXJlbmRlci5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFHTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUdoRSxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsb0JBQW9CO0lBQzVELFlBQzhCLFFBQWEsRUFDL0IsZUFBaUMsRUFDakMsd0JBQWtEO1FBRTVELEtBQUssQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKTCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBRzlELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQ0osTUFBMEIsRUFDMUIsTUFBOEIsRUFDOUIsR0FBcUI7UUFFckIsZ0RBQWdEO1FBQ2hELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzVDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDcEUsTUFBTSxDQUFDLFNBQVMsQ0FDakIsQ0FBQztZQUVGLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsSUFBSSxNQUFNLEVBQUUsVUFBVSxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDbEQ7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRXZFLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FDVixlQUFlLE1BQU0sdUVBQXVFLENBQzdGLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUEwQjtRQUNqQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7aUhBakRVLG9CQUFvQixrQkFFckIsUUFBUTtxSEFGUCxvQkFBb0IsY0FEUCxNQUFNOzJGQUNuQixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFHN0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgaXNEZXZNb2RlLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMYXVuY2hJbmxpbmVEaWFsb2csIExBVU5DSF9DQUxMRVIgfSBmcm9tICcuLi9jb25maWcvaW5kZXgnO1xuaW1wb3J0IHsgTGF1bmNoUmVuZGVyU3RyYXRlZ3kgfSBmcm9tICcuL2xhdW5jaC1yZW5kZXIuc3RyYXRlZ3knO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIElubGluZVJlbmRlclN0cmF0ZWd5IGV4dGVuZHMgTGF1bmNoUmVuZGVyU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHByb3RlY3RlZCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICApIHtcbiAgICBzdXBlcihkb2N1bWVudCwgcmVuZGVyZXJGYWN0b3J5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBpbiB0aGUgdmlldyBjb250YWluZXIgcmVmXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHBhcmFtIGNhbGxlclxuICAgKiBAcGFyYW0gdmNyXG4gICAqL1xuICByZW5kZXIoXG4gICAgY29uZmlnOiBMYXVuY2hJbmxpbmVEaWFsb2csXG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nLFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZlxuICApOiBPYnNlcnZhYmxlPENvbXBvbmVudFJlZjxhbnk+PiB8IHZvaWQge1xuICAgIC8vIE9ubHkgcmVuZGVyIGlmIGEgVmlld0NvbnRhaW5lclJlZiBpcyBwcm92aWRlZFxuICAgIGlmICh2Y3IgJiYgdGhpcy5zaG91bGRSZW5kZXIoY2FsbGVyLCBjb25maWcpKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICBjb25maWcuY29tcG9uZW50XG4gICAgICApO1xuXG4gICAgICBjb25zdCBjb21wb25lbnQgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KHRlbXBsYXRlKTtcblxuICAgICAgaWYgKGNvbmZpZz8uZGlhbG9nVHlwZSkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3Nlcyhjb21wb25lbnQsIGNvbmZpZz8uZGlhbG9nVHlwZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZWRDYWxsZXJzLnB1c2goeyBjYWxsZXIsIGVsZW1lbnQ6IHZjci5lbGVtZW50LCBjb21wb25lbnQgfSk7XG5cbiAgICAgIHJldHVybiBvZihjb21wb25lbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGlmICghdmNyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTm8gdmlldyBjb250YWluZXIgcmVmIHByb3ZpZGVkIGZvciAke2NhbGxlcn1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgRWxlbWVudCBmb3IgJHtjYWxsZXJ9IGFscmVhZHkgcmVuZGVyZWQuIFRvIGFsbG93IG11bHRpIHJlbmRlcmluZyBhZGQgcHJvcGVydHkgbXVsdGk6IHRydWUuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhc01hdGNoKGNvbmZpZzogTGF1bmNoSW5saW5lRGlhbG9nKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oY29uZmlnLmlubGluZSk7XG4gIH1cbn1cbiJdfQ==