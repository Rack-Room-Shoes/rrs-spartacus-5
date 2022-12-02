/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CONFIG_INITIALIZER, } from '../config/config-initializer/config-initializer';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultI18nConfig } from './config/default-i18n-config';
import { I18nConfig } from './config/i18n-config';
import { I18nConfigInitializer } from './config/i18n-config-initializer';
import { CxDatePipe } from './date.pipe';
import { i18nextProviders } from './i18next/i18next-providers';
import { I18nextTranslationService } from './i18next/i18next-translation.service';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from './translation.service';
import { CxNumericPipe } from './numeric.pipe';
import * as i0 from "@angular/core";
export function initI18nConfig(configInitializer, config) {
    /**
     * If `fallbackLang` was already configured statically
     */
    if (config?.i18n?.fallbackLang !== undefined) {
        return null;
    }
    return configInitializer;
}
export class I18nModule {
    static forRoot() {
        return {
            ngModule: I18nModule,
            providers: [
                provideDefaultConfig(defaultI18nConfig),
                { provide: TranslationService, useExisting: I18nextTranslationService },
                ...i18nextProviders,
                {
                    provide: CONFIG_INITIALIZER,
                    useFactory: initI18nConfig,
                    deps: [I18nConfigInitializer, I18nConfig],
                    multi: true,
                },
            ],
        };
    }
}
I18nModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: I18nModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
I18nModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: I18nModule, declarations: [TranslatePipe, CxDatePipe, CxNumericPipe], exports: [TranslatePipe, CxDatePipe, CxNumericPipe] });
I18nModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: I18nModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: I18nModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TranslatePipe, CxDatePipe, CxNumericPipe],
                    exports: [TranslatePipe, CxDatePipe, CxNumericPipe],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL2kxOG4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBRUwsa0JBQWtCLEdBQ25CLE1BQU0saURBQWlELENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFL0MsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsaUJBQXdDLEVBQ3hDLE1BQWtCO0lBRWxCOztPQUVHO0lBQ0gsSUFBSSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksS0FBSyxTQUFTLEVBQUU7UUFDNUMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQU1ELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDdkMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLHlCQUF5QixFQUFFO2dCQUN2RSxHQUFHLGdCQUFnQjtnQkFDbkI7b0JBQ0UsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsVUFBVSxFQUFFLGNBQWM7b0JBQzFCLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQztvQkFDekMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzt1R0FoQlUsVUFBVTt3R0FBVixVQUFVLGlCQUhOLGFBQWEsRUFBRSxVQUFVLEVBQUUsYUFBYSxhQUM3QyxhQUFhLEVBQUUsVUFBVSxFQUFFLGFBQWE7d0dBRXZDLFVBQVU7MkZBQVYsVUFBVTtrQkFKdEIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7aUJBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbmZpZ0luaXRpYWxpemVyLFxuICBDT05GSUdfSU5JVElBTElaRVIsXG59IGZyb20gJy4uL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy1wcm92aWRlcnMnO1xuaW1wb3J0IHsgZGVmYXVsdEkxOG5Db25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWkxOG4tY29uZmlnJztcbmltcG9ydCB7IEkxOG5Db25maWcgfSBmcm9tICcuL2NvbmZpZy9pMThuLWNvbmZpZyc7XG5pbXBvcnQgeyBJMThuQ29uZmlnSW5pdGlhbGl6ZXIgfSBmcm9tICcuL2NvbmZpZy9pMThuLWNvbmZpZy1pbml0aWFsaXplcic7XG5pbXBvcnQgeyBDeERhdGVQaXBlIH0gZnJvbSAnLi9kYXRlLnBpcGUnO1xuaW1wb3J0IHsgaTE4bmV4dFByb3ZpZGVycyB9IGZyb20gJy4vaTE4bmV4dC9pMThuZXh0LXByb3ZpZGVycyc7XG5pbXBvcnQgeyBJMThuZXh0VHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9pMThuZXh0L2kxOG5leHQtdHJhbnNsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVQaXBlIH0gZnJvbSAnLi90cmFuc2xhdGUucGlwZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL3RyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3hOdW1lcmljUGlwZSB9IGZyb20gJy4vbnVtZXJpYy5waXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJMThuQ29uZmlnKFxuICBjb25maWdJbml0aWFsaXplcjogSTE4bkNvbmZpZ0luaXRpYWxpemVyLFxuICBjb25maWc6IEkxOG5Db25maWdcbik6IENvbmZpZ0luaXRpYWxpemVyIHwgbnVsbCB7XG4gIC8qKlxuICAgKiBJZiBgZmFsbGJhY2tMYW5nYCB3YXMgYWxyZWFkeSBjb25maWd1cmVkIHN0YXRpY2FsbHlcbiAgICovXG4gIGlmIChjb25maWc/LmkxOG4/LmZhbGxiYWNrTGFuZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNvbmZpZ0luaXRpYWxpemVyO1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtUcmFuc2xhdGVQaXBlLCBDeERhdGVQaXBlLCBDeE51bWVyaWNQaXBlXSxcbiAgZXhwb3J0czogW1RyYW5zbGF0ZVBpcGUsIEN4RGF0ZVBpcGUsIEN4TnVtZXJpY1BpcGVdLFxufSlcbmV4cG9ydCBjbGFzcyBJMThuTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxJMThuTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBJMThuTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRJMThuQ29uZmlnKSxcbiAgICAgICAgeyBwcm92aWRlOiBUcmFuc2xhdGlvblNlcnZpY2UsIHVzZUV4aXN0aW5nOiBJMThuZXh0VHJhbnNsYXRpb25TZXJ2aWNlIH0sXG4gICAgICAgIC4uLmkxOG5leHRQcm92aWRlcnMsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05GSUdfSU5JVElBTElaRVIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogaW5pdEkxOG5Db25maWcsXG4gICAgICAgICAgZGVwczogW0kxOG5Db25maWdJbml0aWFsaXplciwgSTE4bkNvbmZpZ10sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==