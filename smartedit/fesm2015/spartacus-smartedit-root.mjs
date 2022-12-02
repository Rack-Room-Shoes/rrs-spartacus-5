import * as i0 from '@angular/core';
import { Injectable, APP_INITIALIZER, NgModule } from '@angular/core';
import * as i3 from '@spartacus/core';
import { Config, provideDefaultConfig } from '@spartacus/core';
import * as i2 from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SmartEditConfig {
}
SmartEditConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const SMART_EDIT_FEATURE = 'smartEdit';

/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
class SmartEditLauncherService {
    constructor(config, location, featureModules) {
        this.config = config;
        this.location = location;
        this.featureModules = featureModules;
    }
    get cmsTicketId() {
        return this._cmsTicketId;
    }
    /**
     * Lazy loads modules when Spartacus launced inside Smart Edit
     */
    load() {
        if (this.isLaunchedInSmartEdit() &&
            this.featureModules.isConfigured('smartEdit')) {
            this.featureModules.resolveFeature('smartEdit').subscribe();
        }
    }
    /**
     * Indicates whether Spartacus is launched in SmartEdit
     */
    isLaunchedInSmartEdit() {
        var _a;
        const path = this.location.path().split('?')[0];
        const params = this.location.path().split('?')[1];
        const cmsToken = params === null || params === void 0 ? void 0 : params.split('&').find((param) => param.startsWith('cmsTicketId='));
        this._cmsTicketId = cmsToken === null || cmsToken === void 0 ? void 0 : cmsToken.split('=')[1];
        return (path.split('/').pop() === ((_a = this.config.smartEdit) === null || _a === void 0 ? void 0 : _a.storefrontPreviewRoute) &&
            !!this._cmsTicketId);
    }
}
SmartEditLauncherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditLauncherService, deps: [{ token: SmartEditConfig }, { token: i2.Location }, { token: i3.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditLauncherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditLauncherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditLauncherService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: SmartEditConfig }, { type: i2.Location }, { type: i3.FeatureModulesService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSmartEditConfig = {
    smartEdit: {
        storefrontPreviewRoute: 'cx-preview',
        allowOrigin: 'localhost:9002',
    },
};

class CmsTicketInterceptor {
    constructor(service) {
        this.service = service;
    }
    intercept(request, next) {
        if (this.service.cmsTicketId && request.url.includes('/cms/')) {
            request = request.clone({
                setParams: {
                    cmsTicketId: this.service.cmsTicketId,
                },
            });
        }
        return next.handle(request);
    }
}
CmsTicketInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsTicketInterceptor, deps: [{ token: SmartEditLauncherService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsTicketInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsTicketInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsTicketInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: SmartEditLauncherService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useExisting: CmsTicketInterceptor,
        multi: true,
    },
];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function smartEditFactory(smartEditLauncherService) {
    const isReady = () => {
        smartEditLauncherService.load();
    };
    return isReady;
}
class SmartEditRootModule {
}
SmartEditRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartEditRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: SmartEditRootModule });
SmartEditRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultSmartEditConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: smartEditFactory,
            deps: [SmartEditLauncherService],
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultSmartEditConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: smartEditFactory,
                            deps: [SmartEditLauncherService],
                            multi: true,
                        },
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

export { CmsTicketInterceptor, SMART_EDIT_FEATURE, SmartEditConfig, SmartEditLauncherService, SmartEditRootModule, smartEditFactory };
//# sourceMappingURL=spartacus-smartedit-root.mjs.map
