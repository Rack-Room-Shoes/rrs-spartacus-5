import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultStoreFinderLayoutConfig = {
    layoutSlots: {
        StoreFinderPageTemplate: {
            slots: ['MiddleContent', 'SideContent'],
        },
    },
};

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
const STORE_FINDER_FEATURE = 'storeFinder';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultStoreFinderComponentsConfig() {
    const config = {
        featureModules: {
            [STORE_FINDER_FEATURE]: {
                cmsComponents: ['StoreFinderComponent'],
            },
        },
    };
    return config;
}
class StoreFinderRootModule {
}
StoreFinderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderRootModule });
StoreFinderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderRootModule, providers: [
        provideDefaultConfig(defaultStoreFinderLayoutConfig),
        provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: StoreFinderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    providers: [
                        provideDefaultConfig(defaultStoreFinderLayoutConfig),
                        provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { STORE_FINDER_FEATURE, StoreFinderRootModule, defaultStoreFinderComponentsConfig, defaultStoreFinderLayoutConfig };
//# sourceMappingURL=spartacus-storefinder-root.mjs.map
