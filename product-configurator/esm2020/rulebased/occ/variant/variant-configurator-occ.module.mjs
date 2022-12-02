/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from '../../core/connectors/rulebased-configurator.connector';
import { OccConfiguratorVariantAddToCartSerializer } from './converters/occ-configurator-variant-add-to-cart-serializer';
import { OccConfiguratorVariantNormalizer } from './converters/occ-configurator-variant-normalizer';
import { OccConfiguratorVariantOverviewNormalizer } from './converters/occ-configurator-variant-overview-normalizer';
import { OccConfiguratorVariantPriceSummaryNormalizer } from './converters/occ-configurator-variant-price-summary-normalizer';
import { OccConfiguratorVariantPriceNormalizer } from './converters/occ-configurator-variant-price-normalizer';
import { OccConfiguratorVariantSerializer } from './converters/occ-configurator-variant-serializer';
import { OccConfiguratorVariantUpdateCartEntrySerializer } from './converters/occ-configurator-variant-update-cart-entry-serializer';
import { defaultOccVariantConfiguratorConfigFactory } from './default-occ-configurator-variant-config';
import { VariantConfiguratorOccAdapter } from './variant-configurator-occ.adapter';
import { VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER, VARIANT_CONFIGURATOR_NORMALIZER, VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER, VARIANT_CONFIGURATOR_PRICE_NORMALIZER, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER, VARIANT_CONFIGURATOR_SERIALIZER, VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, } from './variant-configurator-occ.converters';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class VariantConfiguratorOccModule {
}
VariantConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccModule, imports: [CommonModule, i1.ConfigModule] });
VariantConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccModule, providers: [
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: VariantConfiguratorOccAdapter,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_NORMALIZER,
            useExisting: OccConfiguratorVariantNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_SERIALIZER,
            useExisting: OccConfiguratorVariantSerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
            useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
            useExisting: OccConfiguratorVariantPriceNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorVariantAddToCartSerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
            useExisting: OccConfiguratorVariantOverviewNormalizer,
            multi: true,
        },
    ], imports: [CommonModule,
        ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory),
                    ],
                    providers: [
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: VariantConfiguratorOccAdapter,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_NORMALIZER,
                            useExisting: OccConfiguratorVariantNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_SERIALIZER,
                            useExisting: OccConfiguratorVariantSerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
                            useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
                            useExisting: OccConfiguratorVariantPriceNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorVariantAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
                            useExisting: OccConfiguratorVariantOverviewNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3Itb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvb2NjL3ZhcmlhbnQvdmFyaWFudC1jb25maWd1cmF0b3Itb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQ3pILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQ3JILE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlILE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQy9HLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSwrQ0FBK0MsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFDTCwyQ0FBMkMsRUFDM0MsK0JBQStCLEVBQy9CLHdDQUF3QyxFQUN4QyxxQ0FBcUMsRUFDckMsNkNBQTZDLEVBQzdDLCtCQUErQixFQUMvQixpREFBaUQsR0FDbEQsTUFBTSx1Q0FBdUMsQ0FBQzs7O0FBa0QvQyxNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsWUE5Q3JDLFlBQVk7MEhBOENILDRCQUE0QixhQTNDNUI7UUFDVDtZQUNFLE9BQU8sRUFBRSw4QkFBOEIsQ0FBQyx5QkFBeUI7WUFDakUsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSw2Q0FBNkM7WUFDdEQsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUscUNBQXFDO1lBQzlDLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLDJDQUEyQztZQUNwRCxXQUFXLEVBQUUseUNBQXlDO1lBQ3RELEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxpREFBaUQ7WUFDMUQsV0FBVyxFQUFFLCtDQUErQztZQUM1RCxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsd0NBQXdDO1lBQ2pELFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBNUNDLFlBQVk7UUFDWixZQUFZLENBQUMsaUJBQWlCLENBQUMsMENBQTBDLENBQUM7MkZBNkNqRSw0QkFBNEI7a0JBaER4QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQywwQ0FBMEMsQ0FBQztxQkFDM0U7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSw4QkFBOEIsQ0FBQyx5QkFBeUI7NEJBQ2pFLFFBQVEsRUFBRSw2QkFBNkI7NEJBQ3ZDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwrQkFBK0I7NEJBQ3hDLFdBQVcsRUFBRSxnQ0FBZ0M7NEJBQzdDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwrQkFBK0I7NEJBQ3hDLFdBQVcsRUFBRSxnQ0FBZ0M7NEJBQzdDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSw2Q0FBNkM7NEJBQ3RELFdBQVcsRUFBRSw0Q0FBNEM7NEJBQ3pELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxxQ0FBcUM7NEJBQzlDLFdBQVcsRUFBRSxxQ0FBcUM7NEJBQ2xELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwyQ0FBMkM7NEJBQ3BELFdBQVcsRUFBRSx5Q0FBeUM7NEJBQ3RELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxpREFBaUQ7NEJBQzFELFdBQVcsRUFBRSwrQ0FBK0M7NEJBQzVELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSx3Q0FBd0M7NEJBQ2pELFdBQVcsRUFBRSx3Q0FBd0M7NEJBQ3JELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWdNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29yZS9jb25uZWN0b3JzL3J1bGViYXNlZC1jb25maWd1cmF0b3IuY29ubmVjdG9yJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRBZGRUb0NhcnRTZXJpYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdmFyaWFudC1hZGQtdG8tY2FydC1zZXJpYWxpemVyJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnROb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdmFyaWFudC1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRPdmVydmlld05vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW92ZXJ2aWV3LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yVmFyaWFudFByaWNlU3VtbWFyeU5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXByaWNlLXN1bW1hcnktbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3JWYXJpYW50UHJpY2VOb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdmFyaWFudC1wcmljZS1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRTZXJpYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdmFyaWFudC1zZXJpYWxpemVyJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRVcGRhdGVDYXJ0RW50cnlTZXJpYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItdmFyaWFudC11cGRhdGUtY2FydC1lbnRyeS1zZXJpYWxpemVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NWYXJpYW50Q29uZmlndXJhdG9yQ29uZmlnRmFjdG9yeSB9IGZyb20gJy4vZGVmYXVsdC1vY2MtY29uZmlndXJhdG9yLXZhcmlhbnQtY29uZmlnJztcbmltcG9ydCB7IFZhcmlhbnRDb25maWd1cmF0b3JPY2NBZGFwdGVyIH0gZnJvbSAnLi92YXJpYW50LWNvbmZpZ3VyYXRvci1vY2MuYWRhcHRlcic7XG5pbXBvcnQge1xuICBWQVJJQU5UX0NPTkZJR1VSQVRPUl9BRERfVE9fQ0FSVF9TRVJJQUxJWkVSLFxuICBWQVJJQU5UX0NPTkZJR1VSQVRPUl9OT1JNQUxJWkVSLFxuICBWQVJJQU5UX0NPTkZJR1VSQVRPUl9PVkVSVklFV19OT1JNQUxJWkVSLFxuICBWQVJJQU5UX0NPTkZJR1VSQVRPUl9QUklDRV9OT1JNQUxJWkVSLFxuICBWQVJJQU5UX0NPTkZJR1VSQVRPUl9QUklDRV9TVU1NQVJZX05PUk1BTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX1NFUklBTElaRVIsXG4gIFZBUklBTlRfQ09ORklHVVJBVE9SX1VQREFURV9DQVJUX0VOVFJZX1NFUklBTElaRVIsXG59IGZyb20gJy4vdmFyaWFudC1jb25maWd1cmF0b3Itb2NjLmNvbnZlcnRlcnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnRmFjdG9yeShkZWZhdWx0T2NjVmFyaWFudENvbmZpZ3VyYXRvckNvbmZpZ0ZhY3RvcnkpLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBSdWxlYmFzZWRDb25maWd1cmF0b3JDb25uZWN0b3IuQ09ORklHVVJBVE9SX0FEQVBURVJfTElTVCxcbiAgICAgIHVzZUNsYXNzOiBWYXJpYW50Q29uZmlndXJhdG9yT2NjQWRhcHRlcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVkFSSUFOVF9DT05GSUdVUkFUT1JfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NDb25maWd1cmF0b3JWYXJpYW50Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVkFSSUFOVF9DT05GSUdVUkFUT1JfU0VSSUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NDb25maWd1cmF0b3JWYXJpYW50U2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVkFSSUFOVF9DT05GSUdVUkFUT1JfUFJJQ0VfU1VNTUFSWV9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRQcmljZVN1bW1hcnlOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBWQVJJQU5UX0NPTkZJR1VSQVRPUl9QUklDRV9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRQcmljZU5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX0FERF9UT19DQVJUX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVmFyaWFudEFkZFRvQ2FydFNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX1VQREFURV9DQVJUX0VOVFJZX1NFUklBTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVmFyaWFudFVwZGF0ZUNhcnRFbnRyeVNlcmlhbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFZBUklBTlRfQ09ORklHVVJBVE9SX09WRVJWSUVXX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29uZmlndXJhdG9yVmFyaWFudE92ZXJ2aWV3Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhbnRDb25maWd1cmF0b3JPY2NNb2R1bGUge31cbiJdfQ==