/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OccConfiguratorCpqUpdateCartEntrySerializer } from './converters';
import { CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER, CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, } from './converters/cpq-configurator-occ.converters';
import { OccConfiguratorCpqAddToCartSerializer } from './converters/occ-configurator-cpq-add-to-cart-serializer';
import { defaultOccCpqConfiguratorConfigFactory } from './default-occ-configurator-cpq-config';
import { provideDefaultConfigFactory } from '@spartacus/core';
import * as i0 from "@angular/core";
export class CpqConfiguratorOccModule {
}
CpqConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccModule, imports: [CommonModule] });
CpqConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccModule, providers: [
        provideDefaultConfigFactory(defaultOccCpqConfiguratorConfigFactory),
        {
            provide: CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorCpqAddToCartSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorCpqUpdateCartEntrySerializer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfigFactory(defaultOccCpqConfiguratorConfigFactory),
                        {
                            provide: CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorCpqAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorCpqUpdateCartEntrySerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1vY2MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvb2NjL2NwcS1jb25maWd1cmF0b3Itb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNFLE9BQU8sRUFDTCx1Q0FBdUMsRUFDdkMsNkNBQTZDLEdBQzlDLE1BQU0sOENBQThDLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDakgsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0YsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBa0I5RCxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsWUFmekIsWUFBWTtzSEFlWCx3QkFBd0IsYUFkeEI7UUFDVCwyQkFBMkIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUNuRTtZQUNFLE9BQU8sRUFBRSx1Q0FBdUM7WUFDaEQsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsNkNBQTZDO1lBQ3RELFdBQVcsRUFBRSwyQ0FBMkM7WUFDeEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBYlMsWUFBWTsyRkFlWCx3QkFBd0I7a0JBaEJwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUFDLHNDQUFzQyxDQUFDO3dCQUNuRTs0QkFDRSxPQUFPLEVBQUUsdUNBQXVDOzRCQUNoRCxXQUFXLEVBQUUscUNBQXFDOzRCQUNsRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsNkNBQTZDOzRCQUN0RCxXQUFXLEVBQUUsMkNBQTJDOzRCQUN4RCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yQ3BxVXBkYXRlQ2FydEVudHJ5U2VyaWFsaXplciB9IGZyb20gJy4vY29udmVydGVycyc7XG5pbXBvcnQge1xuICBDUFFfQ09ORklHVVJBVE9SX0FERF9UT19DQVJUX1NFUklBTElaRVIsXG4gIENQUV9DT05GSUdVUkFUT1JfVVBEQVRFX0NBUlRfRU5UUllfU0VSSUFMSVpFUixcbn0gZnJvbSAnLi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itb2NjLmNvbnZlcnRlcnMnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yQ3BxQWRkVG9DYXJ0U2VyaWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtY29uZmlndXJhdG9yLWNwcS1hZGQtdG8tY2FydC1zZXJpYWxpemVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NDcHFDb25maWd1cmF0b3JDb25maWdGYWN0b3J5IH0gZnJvbSAnLi9kZWZhdWx0LW9jYy1jb25maWd1cmF0b3ItY3BxLWNvbmZpZyc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRPY2NDcHFDb25maWd1cmF0b3JDb25maWdGYWN0b3J5KSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDUFFfQ09ORklHVVJBVE9SX0FERF9UT19DQVJUX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yQ3BxQWRkVG9DYXJ0U2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ1BRX0NPTkZJR1VSQVRPUl9VUERBVEVfQ0FSVF9FTlRSWV9TRVJJQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvckNwcVVwZGF0ZUNhcnRFbnRyeVNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JPY2NNb2R1bGUge31cbiJdfQ==