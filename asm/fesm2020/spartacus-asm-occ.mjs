import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i3 from '@spartacus/asm/core';
import { CUSTOMER_SEARCH_PAGE_NORMALIZER, AsmAdapter } from '@spartacus/asm/core';
import * as i2 from '@spartacus/core';
import { InterceptorUtil, USE_CUSTOMER_SUPPORT_AGENT_TOKEN, provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccAsmAdapter {
    constructor(http, occEndpointsService, converterService, config, baseSiteService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
        this.config = config;
        this.baseSiteService = baseSiteService;
        this.baseSiteService
            .getActive()
            .subscribe((value) => (this.activeBaseSite = value));
    }
    customerSearch(options) {
        const headers = InterceptorUtil.createHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, true, new HttpHeaders());
        let params = new HttpParams()
            .set('baseSite', this.activeBaseSite)
            .set('sort', 'byNameAsc');
        if (typeof options['query'] !== 'undefined') {
            params = params.set('query', '' + options.query);
        }
        if (typeof options['pageSize'] !== 'undefined') {
            params = params.set('pageSize', '' + options.pageSize);
        }
        const url = this.occEndpointsService.buildUrl('asmCustomerSearch', {}, {
            baseSite: false,
            prefix: false,
        });
        return this.http
            .get(url, { headers, params })
            .pipe(this.converterService.pipeable(CUSTOMER_SEARCH_PAGE_NORMALIZER));
    }
}
OccAsmAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccAsmAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }, { token: i3.AsmConfig }, { token: i2.BaseSiteService }], target: i0.ɵɵFactoryTarget.Injectable });
OccAsmAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccAsmAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccAsmAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }, { type: i3.AsmConfig }, { type: i2.BaseSiteService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccAsmConfig = {
    backend: {
        occ: {
            endpoints: {
                asmCustomerSearch: '/assistedservicewebservices/customers/search',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmOccModule {
}
AsmOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmOccModule, imports: [CommonModule] });
AsmOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmOccModule, providers: [
        provideDefaultConfig(defaultOccAsmConfig),
        {
            provide: AsmAdapter,
            useClass: OccAsmAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccAsmConfig),
                        {
                            provide: AsmAdapter,
                            useClass: OccAsmAdapter,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AsmOccModule, OccAsmAdapter };
//# sourceMappingURL=spartacus-asm-occ.mjs.map
