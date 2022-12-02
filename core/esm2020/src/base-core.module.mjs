/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CmsModule } from './cms/cms.module';
import { ConfigInitializerModule } from './config/config-initializer/config-initializer.module';
import { ConfigValidatorModule } from './config/config-validator/config-validator.module';
import { ConfigModule } from './config/config.module';
import { FeaturesConfigModule } from './features-config/features-config.module';
import { GlobalMessageModule } from './global-message/global-message.module';
import { I18nModule } from './i18n/i18n.module';
import { LazyLoadingModule } from './lazy-loading/lazy-loading.module';
import { BaseOccModule } from './occ/base-occ.module';
import { MetaTagConfigModule } from './occ/config/meta-tag-config.module';
import { ProcessModule } from './process/process.module';
import { SiteContextModule } from './site-context/site-context.module';
import { StateModule } from './state/state.module';
import * as i0 from "@angular/core";
import * as i1 from "./state/state.module";
import * as i2 from "./config/config.module";
import * as i3 from "./config/config-initializer/config-initializer.module";
import * as i4 from "./config/config-validator/config-validator.module";
import * as i5 from "./i18n/i18n.module";
import * as i6 from "./cms/cms.module";
import * as i7 from "./global-message/global-message.module";
import * as i8 from "./process/process.module";
import * as i9 from "./features-config/features-config.module";
import * as i10 from "./site-context/site-context.module";
import * as i11 from "./occ/config/meta-tag-config.module";
import * as i12 from "./occ/base-occ.module";
import * as i13 from "./lazy-loading/lazy-loading.module";
export class BaseCoreModule {
    static forRoot() {
        return {
            ngModule: BaseCoreModule,
        };
    }
}
BaseCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BaseCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BaseCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: BaseCoreModule, imports: [i1.StateModule, i2.ConfigModule, i3.ConfigInitializerModule, i4.ConfigValidatorModule, i5.I18nModule, i6.CmsModule, i7.GlobalMessageModule, i8.ProcessModule, i9.FeaturesConfigModule, i10.SiteContextModule, i11.MetaTagConfigModule, i12.BaseOccModule, i13.LazyLoadingModule] });
BaseCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BaseCoreModule, imports: [StateModule.forRoot(),
        ConfigModule.forRoot(),
        ConfigInitializerModule.forRoot(),
        ConfigValidatorModule.forRoot(),
        I18nModule.forRoot(),
        CmsModule.forRoot(),
        GlobalMessageModule.forRoot(),
        ProcessModule.forRoot(),
        FeaturesConfigModule.forRoot(),
        SiteContextModule.forRoot(),
        MetaTagConfigModule.forRoot(),
        BaseOccModule.forRoot(),
        LazyLoadingModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BaseCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StateModule.forRoot(),
                        ConfigModule.forRoot(),
                        ConfigInitializerModule.forRoot(),
                        ConfigValidatorModule.forRoot(),
                        I18nModule.forRoot(),
                        CmsModule.forRoot(),
                        GlobalMessageModule.forRoot(),
                        ProcessModule.forRoot(),
                        FeaturesConfigModule.forRoot(),
                        SiteContextModule.forRoot(),
                        MetaTagConfigModule.forRoot(),
                        BaseOccModule.forRoot(),
                        LazyLoadingModule.forRoot(),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Jhc2UtY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUNoRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFtQm5ELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1NBQ3pCLENBQUM7SUFDSixDQUFDOzsyR0FMVSxjQUFjOzRHQUFkLGNBQWM7NEdBQWQsY0FBYyxZQWZ2QixXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLFlBQVksQ0FBQyxPQUFPLEVBQUU7UUFDdEIsdUJBQXVCLENBQUMsT0FBTyxFQUFFO1FBQ2pDLHFCQUFxQixDQUFDLE9BQU8sRUFBRTtRQUMvQixVQUFVLENBQUMsT0FBTyxFQUFFO1FBQ3BCLFNBQVMsQ0FBQyxPQUFPLEVBQUU7UUFDbkIsbUJBQW1CLENBQUMsT0FBTyxFQUFFO1FBQzdCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7UUFDdkIsb0JBQW9CLENBQUMsT0FBTyxFQUFFO1FBQzlCLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtRQUMzQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7UUFDN0IsYUFBYSxDQUFDLE9BQU8sRUFBRTtRQUN2QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7MkZBR2xCLGNBQWM7a0JBakIxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxXQUFXLENBQUMsT0FBTyxFQUFFO3dCQUNyQixZQUFZLENBQUMsT0FBTyxFQUFFO3dCQUN0Qix1QkFBdUIsQ0FBQyxPQUFPLEVBQUU7d0JBQ2pDLHFCQUFxQixDQUFDLE9BQU8sRUFBRTt3QkFDL0IsVUFBVSxDQUFDLE9BQU8sRUFBRTt3QkFDcEIsU0FBUyxDQUFDLE9BQU8sRUFBRTt3QkFDbkIsbUJBQW1CLENBQUMsT0FBTyxFQUFFO3dCQUM3QixhQUFhLENBQUMsT0FBTyxFQUFFO3dCQUN2QixvQkFBb0IsQ0FBQyxPQUFPLEVBQUU7d0JBQzlCLGlCQUFpQixDQUFDLE9BQU8sRUFBRTt3QkFDM0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFO3dCQUM3QixhQUFhLENBQUMsT0FBTyxFQUFFO3dCQUN2QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7cUJBQzVCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc01vZHVsZSB9IGZyb20gJy4vY21zL2Ntcy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJNb2R1bGUgfSBmcm9tICcuL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWdWYWxpZGF0b3JNb2R1bGUgfSBmcm9tICcuL2NvbmZpZy9jb25maWctdmFsaWRhdG9yL2NvbmZpZy12YWxpZGF0b3IubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ01vZHVsZSB9IGZyb20gJy4vY29uZmlnL2NvbmZpZy5tb2R1bGUnO1xuaW1wb3J0IHsgRmVhdHVyZXNDb25maWdNb2R1bGUgfSBmcm9tICcuL2ZlYXR1cmVzLWNvbmZpZy9mZWF0dXJlcy1jb25maWcubW9kdWxlJztcbmltcG9ydCB7IEdsb2JhbE1lc3NhZ2VNb2R1bGUgfSBmcm9tICcuL2dsb2JhbC1tZXNzYWdlL2dsb2JhbC1tZXNzYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnLi9pMThuL2kxOG4ubW9kdWxlJztcbmltcG9ydCB7IExhenlMb2FkaW5nTW9kdWxlIH0gZnJvbSAnLi9sYXp5LWxvYWRpbmcvbGF6eS1sb2FkaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBCYXNlT2NjTW9kdWxlIH0gZnJvbSAnLi9vY2MvYmFzZS1vY2MubW9kdWxlJztcbmltcG9ydCB7IE1ldGFUYWdDb25maWdNb2R1bGUgfSBmcm9tICcuL29jYy9jb25maWcvbWV0YS10YWctY29uZmlnLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9jZXNzTW9kdWxlIH0gZnJvbSAnLi9wcm9jZXNzL3Byb2Nlc3MubW9kdWxlJztcbmltcG9ydCB7IFNpdGVDb250ZXh0TW9kdWxlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQvc2l0ZS1jb250ZXh0Lm1vZHVsZSc7XG5pbXBvcnQgeyBTdGF0ZU1vZHVsZSB9IGZyb20gJy4vc3RhdGUvc3RhdGUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFN0YXRlTW9kdWxlLmZvclJvb3QoKSxcbiAgICBDb25maWdNb2R1bGUuZm9yUm9vdCgpLFxuICAgIENvbmZpZ0luaXRpYWxpemVyTW9kdWxlLmZvclJvb3QoKSxcbiAgICBDb25maWdWYWxpZGF0b3JNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEkxOG5Nb2R1bGUuZm9yUm9vdCgpLFxuICAgIENtc01vZHVsZS5mb3JSb290KCksXG4gICAgR2xvYmFsTWVzc2FnZU1vZHVsZS5mb3JSb290KCksXG4gICAgUHJvY2Vzc01vZHVsZS5mb3JSb290KCksXG4gICAgRmVhdHVyZXNDb25maWdNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFNpdGVDb250ZXh0TW9kdWxlLmZvclJvb3QoKSwgLy8gc2hvdWxkIGJlIGltcG9ydGVkIGFmdGVyIFJvdXRlck1vZHVsZS5mb3JSb290LCBiZWNhdXNlIGl0IG92ZXJ3cml0ZXMgVXJsU2VyaWFsaXplclxuICAgIE1ldGFUYWdDb25maWdNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEJhc2VPY2NNb2R1bGUuZm9yUm9vdCgpLFxuICAgIExhenlMb2FkaW5nTW9kdWxlLmZvclJvb3QoKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUNvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJhc2VDb3JlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCYXNlQ29yZU1vZHVsZSxcbiAgICB9O1xuICB9XG59XG4iXX0=