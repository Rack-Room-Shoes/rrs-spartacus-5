/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./qualtrics-loader.service";
import * as i2 from "./config/qualtrics-config";
/**
 * Adds the Qualtrics deployment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 */
export class QualtricsComponent {
    constructor(qualtricsLoader, config) {
        this.qualtricsLoader = qualtricsLoader;
        this.config = config;
        if (this.config.qualtrics?.scriptSource) {
            this.qualtricsLoader.addScript(this.config.qualtrics.scriptSource);
        }
        else if (isDevMode()) {
            console.warn(`We're unable to add the Qualtrics deployment code as there is no script source defined in config.qualtrics.scriptSource.`);
        }
    }
}
QualtricsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QualtricsComponent, deps: [{ token: i1.QualtricsLoaderService }, { token: i2.QualtricsConfig }], target: i0.ɵɵFactoryTarget.Component });
QualtricsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: QualtricsComponent, selector: "cx-qualtrics", ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: QualtricsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-qualtrics',
                    template: '',
                }]
        }], ctorParameters: function () { return [{ type: i1.QualtricsLoaderService }, { type: i2.QualtricsConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbHRyaWNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9xdWFsdHJpY3MvY29tcG9uZW50cy9xdWFsdHJpY3MtbG9hZGVyL3F1YWx0cmljcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBR3JEOzs7R0FHRztBQUtILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFDWSxlQUF1QyxFQUN2QyxNQUF1QjtRQUR2QixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFFakMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEU7YUFBTSxJQUFJLFNBQVMsRUFBRSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQ1YsMEhBQTBILENBQzNILENBQUM7U0FDSDtJQUNILENBQUM7OytHQVpVLGtCQUFrQjttR0FBbEIsa0JBQWtCLG9EQUZuQixFQUFFOzJGQUVELGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLEVBQUU7aUJBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVhbHRyaWNzQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvcXVhbHRyaWNzLWNvbmZpZyc7XG5pbXBvcnQgeyBRdWFsdHJpY3NMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9xdWFsdHJpY3MtbG9hZGVyLnNlcnZpY2UnO1xuLyoqXG4gKiBBZGRzIHRoZSBRdWFsdHJpY3MgZGVwbG95bWVudCBzY3JpcHQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBsb2FkZWQuIFRoZVxuICogZGVwbG95bWVudCBzY3JpcHQgaXMgbG9hZGVkIGZyb20gdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uIChgcXVhbHRyaWNzLnNjcmlwdFNvdXJjZWApLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1xdWFsdHJpY3MnLFxuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIFF1YWx0cmljc0NvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBxdWFsdHJpY3NMb2FkZXI6IFF1YWx0cmljc0xvYWRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogUXVhbHRyaWNzQ29uZmlnXG4gICkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5xdWFsdHJpY3M/LnNjcmlwdFNvdXJjZSkge1xuICAgICAgdGhpcy5xdWFsdHJpY3NMb2FkZXIuYWRkU2NyaXB0KHRoaXMuY29uZmlnLnF1YWx0cmljcy5zY3JpcHRTb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFdlJ3JlIHVuYWJsZSB0byBhZGQgdGhlIFF1YWx0cmljcyBkZXBsb3ltZW50IGNvZGUgYXMgdGhlcmUgaXMgbm8gc2NyaXB0IHNvdXJjZSBkZWZpbmVkIGluIGNvbmZpZy5xdWFsdHJpY3Muc2NyaXB0U291cmNlLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=