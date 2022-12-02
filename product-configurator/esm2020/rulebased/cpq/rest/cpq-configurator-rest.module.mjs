/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from '@spartacus/product-configurator/rulebased';
import { CpqConfiguratorNormalizer } from './converters/cpq-configurator-normalizer';
import { CpqConfiguratorOverviewNormalizer } from './converters/cpq-configurator-overview-normalizer';
import { CpqConfiguratorSerializer } from './converters/cpq-configurator-serializer';
import { CpqConfiguratorValueSerializer } from './converters/cpq-configurator-value-serializer';
import { CPQ_CONFIGURATOR_NORMALIZER, CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER, CPQ_CONFIGURATOR_QUANTITY_SERIALIZER, CPQ_CONFIGURATOR_SERIALIZER, } from './converters/cpq-configurator.converters';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { defaultCpqConfiguratorEndpointConfig } from './default-cpq-configurator-endpoint.config';
import * as i0 from "@angular/core";
export class CpqConfiguratorRestModule {
}
CpqConfiguratorRestModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorRestModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestModule, imports: [CommonModule] });
CpqConfiguratorRestModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestModule, providers: [
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: CpqConfiguratorRestAdapter,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_NORMALIZER,
            useClass: CpqConfiguratorNormalizer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_SERIALIZER,
            useClass: CpqConfiguratorSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
            useClass: CpqConfiguratorValueSerializer,
            multi: true,
        },
        {
            provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
            useClass: CpqConfiguratorOverviewNormalizer,
            multi: true,
        },
        provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorRestModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: CpqConfiguratorRestAdapter,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_NORMALIZER,
                            useClass: CpqConfiguratorNormalizer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_SERIALIZER,
                            useClass: CpqConfiguratorSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
                            useClass: CpqConfiguratorValueSerializer,
                            multi: true,
                        },
                        {
                            provide: CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
                            useClass: CpqConfiguratorOverviewNormalizer,
                            multi: true,
                        },
                        provideDefaultConfig(defaultCpqConfiguratorEndpointConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1yZXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL3Jlc3QvY3BxLWNvbmZpZ3VyYXRvci1yZXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDdEcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQ0FBb0MsRUFDcEMsb0NBQW9DLEVBQ3BDLDJCQUEyQixHQUM1QixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOztBQWtDbEcsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLFlBL0IxQixZQUFZO3VIQStCWCx5QkFBeUIsYUE3QnpCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsOEJBQThCLENBQUMseUJBQXlCO1lBQ2pFLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLDJCQUEyQjtZQUNwQyxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxRQUFRLEVBQUUsaUNBQWlDO1lBQzNDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCxvQkFBb0IsQ0FBQyxvQ0FBb0MsQ0FBQztLQUMzRCxZQTdCUyxZQUFZOzJGQStCWCx5QkFBeUI7a0JBaENyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFFdkIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSw4QkFBOEIsQ0FBQyx5QkFBeUI7NEJBQ2pFLFFBQVEsRUFBRSwwQkFBMEI7NEJBQ3BDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwyQkFBMkI7NEJBQ3BDLFFBQVEsRUFBRSx5QkFBeUI7NEJBQ25DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwyQkFBMkI7NEJBQ3BDLFFBQVEsRUFBRSx5QkFBeUI7NEJBQ25DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxvQ0FBb0M7NEJBQzdDLFFBQVEsRUFBRSw4QkFBOEI7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxvQ0FBb0M7NEJBQzdDLFFBQVEsRUFBRSxpQ0FBaUM7NEJBQzNDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNELG9CQUFvQixDQUFDLG9DQUFvQyxDQUFDO3FCQUMzRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQnO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yTm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9jcHEtY29uZmlndXJhdG9yLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgQ3BxQ29uZmlndXJhdG9yT3ZlcnZpZXdOb3JtYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itb3ZlcnZpZXctbm9ybWFsaXplcic7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JTZXJpYWxpemVyIH0gZnJvbSAnLi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itc2VyaWFsaXplcic7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JWYWx1ZVNlcmlhbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvY3BxLWNvbmZpZ3VyYXRvci12YWx1ZS1zZXJpYWxpemVyJztcbmltcG9ydCB7XG4gIENQUV9DT05GSUdVUkFUT1JfTk9STUFMSVpFUixcbiAgQ1BRX0NPTkZJR1VSQVRPUl9PVkVSVklFV19OT1JNQUxJWkVSLFxuICBDUFFfQ09ORklHVVJBVE9SX1FVQU5USVRZX1NFUklBTElaRVIsXG4gIENQUV9DT05GSUdVUkFUT1JfU0VSSUFMSVpFUixcbn0gZnJvbSAnLi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3IuY29udmVydGVycyc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JSZXN0QWRhcHRlciB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1yZXN0LmFkYXB0ZXInO1xuaW1wb3J0IHsgZGVmYXVsdENwcUNvbmZpZ3VyYXRvckVuZHBvaW50Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LWNwcS1jb25maWd1cmF0b3ItZW5kcG9pbnQuY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG5cbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yLkNPTkZJR1VSQVRPUl9BREFQVEVSX0xJU1QsXG4gICAgICB1c2VDbGFzczogQ3BxQ29uZmlndXJhdG9yUmVzdEFkYXB0ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENQUV9DT05GSUdVUkFUT1JfTk9STUFMSVpFUixcbiAgICAgIHVzZUNsYXNzOiBDcHFDb25maWd1cmF0b3JOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDUFFfQ09ORklHVVJBVE9SX1NFUklBTElaRVIsXG4gICAgICB1c2VDbGFzczogQ3BxQ29uZmlndXJhdG9yU2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ1BRX0NPTkZJR1VSQVRPUl9RVUFOVElUWV9TRVJJQUxJWkVSLFxuICAgICAgdXNlQ2xhc3M6IENwcUNvbmZpZ3VyYXRvclZhbHVlU2VyaWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ1BRX0NPTkZJR1VSQVRPUl9PVkVSVklFV19OT1JNQUxJWkVSLFxuICAgICAgdXNlQ2xhc3M6IENwcUNvbmZpZ3VyYXRvck92ZXJ2aWV3Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENwcUNvbmZpZ3VyYXRvckVuZHBvaW50Q29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yUmVzdE1vZHVsZSB7fVxuIl19