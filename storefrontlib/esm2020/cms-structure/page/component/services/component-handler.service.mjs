/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, isDevMode, Optional, } from '@angular/core';
import { resolveApplicable } from '@spartacus/core';
import { ComponentHandler } from '../handlers/component-handler';
import * as i0 from "@angular/core";
/**
 * Responsible for obtaining component handler for specified component mapping
 */
export class ComponentHandlerService {
    constructor(handlers) {
        this.handlers = handlers;
        this.invalidMappings = new Set();
    }
    /**
     * Get best matching component handler
     *
     * @param componentMapping
     */
    resolve(componentMapping) {
        const handler = resolveApplicable(this.handlers, [componentMapping]);
        if (isDevMode() && !handler) {
            if (!this.invalidMappings.has(componentMapping)) {
                this.invalidMappings.add(componentMapping);
                console.warn("Can't resolve handler for component mapping: ", componentMapping);
            }
        }
        return handler;
    }
    /**
     * Get launcher for specified component mapping
     *
     * @param componentMapping
     * @param viewContainerRef
     * @param elementInjector
     */
    getLauncher(componentMapping, viewContainerRef, elementInjector, module) {
        return this.resolve(componentMapping)?.launcher(componentMapping, viewContainerRef, elementInjector, module);
    }
}
ComponentHandlerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ComponentHandlerService, deps: [{ token: ComponentHandler, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ComponentHandlerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ComponentHandlerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ComponentHandlerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ComponentHandler]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWhhbmRsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL2NvbXBvbmVudC9zZXJ2aWNlcy9jb21wb25lbnQtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsTUFBTSxFQUNOLFVBQVUsRUFFVixTQUFTLEVBRVQsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7QUFFakU7O0dBRUc7QUFJSCxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBR1ksUUFBNEI7UUFBNUIsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFHOUIsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBNEIsQ0FBQztJQUY3RCxDQUFDO0lBSUo7Ozs7T0FJRztJQUNPLE9BQU8sQ0FDZixnQkFBcUM7UUFFckMsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFJLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUNWLCtDQUErQyxFQUMvQyxnQkFBZ0IsQ0FDakIsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsV0FBVyxDQUNULGdCQUFxQyxFQUNyQyxnQkFBa0MsRUFDbEMsZUFBMEIsRUFDMUIsTUFBeUI7UUFJekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsUUFBUSxDQUM3QyxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixNQUFNLENBQ1AsQ0FBQztJQUNKLENBQUM7O29IQXJEVSx1QkFBdUIsa0JBR3hCLGdCQUFnQjt3SEFIZix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFHSSxRQUFROzswQkFDUixNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgaXNEZXZNb2RlLFxuICBOZ01vZHVsZVJlZixcbiAgT3B0aW9uYWwsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29tcG9uZW50TWFwcGluZywgcmVzb2x2ZUFwcGxpY2FibGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcG9uZW50SGFuZGxlciB9IGZyb20gJy4uL2hhbmRsZXJzL2NvbXBvbmVudC1oYW5kbGVyJztcblxuLyoqXG4gKiBSZXNwb25zaWJsZSBmb3Igb2J0YWluaW5nIGNvbXBvbmVudCBoYW5kbGVyIGZvciBzcGVjaWZpZWQgY29tcG9uZW50IG1hcHBpbmdcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEhhbmRsZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KENvbXBvbmVudEhhbmRsZXIpXG4gICAgcHJvdGVjdGVkIGhhbmRsZXJzOiBDb21wb25lbnRIYW5kbGVyW11cbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBpbnZhbGlkTWFwcGluZ3MgPSBuZXcgU2V0PENtc0NvbXBvbmVudE1hcHBpbmc8YW55Pj4oKTtcblxuICAvKipcbiAgICogR2V0IGJlc3QgbWF0Y2hpbmcgY29tcG9uZW50IGhhbmRsZXJcbiAgICpcbiAgICogQHBhcmFtIGNvbXBvbmVudE1hcHBpbmdcbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlKFxuICAgIGNvbXBvbmVudE1hcHBpbmc6IENtc0NvbXBvbmVudE1hcHBpbmdcbiAgKTogQ29tcG9uZW50SGFuZGxlciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaGFuZGxlciA9IHJlc29sdmVBcHBsaWNhYmxlKHRoaXMuaGFuZGxlcnMsIFtjb21wb25lbnRNYXBwaW5nXSk7XG5cbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgIWhhbmRsZXIpIHtcbiAgICAgIGlmICghdGhpcy5pbnZhbGlkTWFwcGluZ3MuaGFzKGNvbXBvbmVudE1hcHBpbmcpKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZE1hcHBpbmdzLmFkZChjb21wb25lbnRNYXBwaW5nKTtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiQ2FuJ3QgcmVzb2x2ZSBoYW5kbGVyIGZvciBjb21wb25lbnQgbWFwcGluZzogXCIsXG4gICAgICAgICAgY29tcG9uZW50TWFwcGluZ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsYXVuY2hlciBmb3Igc3BlY2lmaWVkIGNvbXBvbmVudCBtYXBwaW5nXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRNYXBwaW5nXG4gICAqIEBwYXJhbSB2aWV3Q29udGFpbmVyUmVmXG4gICAqIEBwYXJhbSBlbGVtZW50SW5qZWN0b3JcbiAgICovXG4gIGdldExhdW5jaGVyKFxuICAgIGNvbXBvbmVudE1hcHBpbmc6IENtc0NvbXBvbmVudE1hcHBpbmcsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBlbGVtZW50SW5qZWN0b3I/OiBJbmplY3RvcixcbiAgICBtb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+XG4gICk6XG4gICAgfCBPYnNlcnZhYmxlPHsgZWxlbWVudFJlZjogRWxlbWVudFJlZjsgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4gfT5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShjb21wb25lbnRNYXBwaW5nKT8ubGF1bmNoZXIoXG4gICAgICBjb21wb25lbnRNYXBwaW5nLFxuICAgICAgdmlld0NvbnRhaW5lclJlZixcbiAgICAgIGVsZW1lbnRJbmplY3RvcixcbiAgICAgIG1vZHVsZVxuICAgICk7XG4gIH1cbn1cbiJdfQ==