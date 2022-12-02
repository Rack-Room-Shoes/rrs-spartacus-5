/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CpqConfiguratorOccModule } from './occ/cpq-configurator-occ.module';
import { CpqConfiguratorRestModule } from './rest/cpq-configurator-rest.module';
import * as i0 from "@angular/core";
/**
 * Exposes the CPQ flavor of rulebase configurator, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
export class RulebasedCpqConfiguratorModule {
}
RulebasedCpqConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedCpqConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedCpqConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedCpqConfiguratorModule, imports: [CpqConfiguratorOccModule, CpqConfiguratorRestModule] });
RulebasedCpqConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedCpqConfiguratorModule, imports: [CpqConfiguratorOccModule, CpqConfiguratorRestModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedCpqConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CpqConfiguratorOccModule, CpqConfiguratorRestModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNwcS1jb25maWd1cmF0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvcnVsZWJhc2VkLWNwcS1jb25maWd1cmF0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQUVoRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsWUFGL0Isd0JBQXdCLEVBQUUseUJBQXlCOzRIQUVsRCw4QkFBOEIsWUFGL0Isd0JBQXdCLEVBQUUseUJBQXlCOzJGQUVsRCw4QkFBOEI7a0JBSDFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsd0JBQXdCLEVBQUUseUJBQXlCLENBQUM7aUJBQy9EIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvck9jY01vZHVsZSB9IGZyb20gJy4vb2NjL2NwcS1jb25maWd1cmF0b3Itb2NjLm1vZHVsZSc7XG5pbXBvcnQgeyBDcHFDb25maWd1cmF0b3JSZXN0TW9kdWxlIH0gZnJvbSAnLi9yZXN0L2NwcS1jb25maWd1cmF0b3ItcmVzdC5tb2R1bGUnO1xuXG4vKipcbiAqIEV4cG9zZXMgdGhlIENQUSBmbGF2b3Igb2YgcnVsZWJhc2UgY29uZmlndXJhdG9yLCB3aGljaCBjb25uZWN0cyB0byBDUFEgZGlyZWN0bHkgdmlhXG4gKiBSRVNUIEFQSXMgYW5kIHRvIGNvbW1lcmNlIHZpYSBPQ0NcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NwcUNvbmZpZ3VyYXRvck9jY01vZHVsZSwgQ3BxQ29uZmlndXJhdG9yUmVzdE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGViYXNlZENwcUNvbmZpZ3VyYXRvck1vZHVsZSB7fVxuIl19