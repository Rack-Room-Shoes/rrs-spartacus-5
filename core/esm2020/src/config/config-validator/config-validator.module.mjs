/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, isDevMode, NgModule, Optional, } from '@angular/core';
import { ConfigInitializerService } from '../config-initializer/config-initializer.service';
import { ConfigValidatorToken, validateConfig, } from './config-validator';
import * as i0 from "@angular/core";
export function configValidatorFactory(configInitializer, validators) {
    const validate = () => {
        if (isDevMode()) {
            configInitializer
                .getStable()
                .subscribe((config) => validateConfig(config, validators || []));
        }
    };
    return validate;
}
/**
 * Should stay private in 1.x
 * as forRoot() is used internally by ConfigInitializerModule
 *
 * issue: #5279
 */
export class ConfigValidatorModule {
    static forRoot() {
        return {
            ngModule: ConfigValidatorModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    useFactory: configValidatorFactory,
                    deps: [
                        ConfigInitializerService,
                        [new Optional(), ConfigValidatorToken],
                    ],
                },
            ],
        };
    }
}
ConfigValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfigValidatorModule });
ConfigValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigValidatorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigValidatorModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXZhbGlkYXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jb25maWcvY29uZmlnLXZhbGlkYXRvci9jb25maWctdmFsaWRhdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBRVQsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RixPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLGNBQWMsR0FDZixNQUFNLG9CQUFvQixDQUFDOztBQUU1QixNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLGlCQUEyQyxFQUMzQyxVQUE2QjtJQUU3QixNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7UUFDcEIsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLGlCQUFpQjtpQkFDZCxTQUFTLEVBQUU7aUJBQ1gsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsVUFBVSxFQUFFLHNCQUFzQjtvQkFDbEMsSUFBSSxFQUFFO3dCQUNKLHdCQUF3Qjt3QkFDeEIsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLG9CQUFvQixDQUFDO3FCQUN2QztpQkFDRjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2tIQWhCVSxxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBBUFBfSU5JVElBTElaRVIsXG4gIGlzRGV2TW9kZSxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSB9IGZyb20gJy4uL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb25maWdWYWxpZGF0b3IsXG4gIENvbmZpZ1ZhbGlkYXRvclRva2VuLFxuICB2YWxpZGF0ZUNvbmZpZyxcbn0gZnJvbSAnLi9jb25maWctdmFsaWRhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ1ZhbGlkYXRvckZhY3RvcnkoXG4gIGNvbmZpZ0luaXRpYWxpemVyOiBDb25maWdJbml0aWFsaXplclNlcnZpY2UsXG4gIHZhbGlkYXRvcnM6IENvbmZpZ1ZhbGlkYXRvcltdXG4pIHtcbiAgY29uc3QgdmFsaWRhdGUgPSAoKSA9PiB7XG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICBjb25maWdJbml0aWFsaXplclxuICAgICAgICAuZ2V0U3RhYmxlKClcbiAgICAgICAgLnN1YnNjcmliZSgoY29uZmlnKSA9PiB2YWxpZGF0ZUNvbmZpZyhjb25maWcsIHZhbGlkYXRvcnMgfHwgW10pKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB2YWxpZGF0ZTtcbn1cblxuLyoqXG4gKiBTaG91bGQgc3RheSBwcml2YXRlIGluIDEueFxuICogYXMgZm9yUm9vdCgpIGlzIHVzZWQgaW50ZXJuYWxseSBieSBDb25maWdJbml0aWFsaXplck1vZHVsZVxuICpcbiAqIGlzc3VlOiAjNTI3OVxuICovXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpZ1ZhbGlkYXRvck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlnVmFsaWRhdG9yTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maWdWYWxpZGF0b3JNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjb25maWdWYWxpZGF0b3JGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgICAgICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgQ29uZmlnVmFsaWRhdG9yVG9rZW5dLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==