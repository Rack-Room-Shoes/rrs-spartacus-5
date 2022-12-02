import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import * as i1$1 from '@spartacus/core';
import { StateUtils, normalizeHttpError, StateModule, provideDefaultConfig, MODULE_INITIALIZER, OccConfig, Config } from '@spartacus/core';
import * as i1$2 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import { of, Subscription, combineLatest } from 'rxjs';
import { map, switchMap, catchError, filter } from 'rxjs/operators';
import * as i1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i3 from '@spartacus/asm/root';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmConfig = {
    asm: {
        agentSessionTimer: {
            startingDelayInSeconds: 600,
        },
        customerSearch: {
            maxResults: 20,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmConnector {
    constructor(asmAdapter) {
        this.asmAdapter = asmAdapter;
    }
    customerSearch(options) {
        return this.asmAdapter.customerSearch(options);
    }
}
AsmConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmConnector, deps: [{ token: AsmAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
AsmConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: AsmAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ASM_UI_UPDATE = '[Asm] UI Update';
class AsmUiUpdate {
    constructor(payload) {
        this.payload = payload;
        this.type = ASM_UI_UPDATE;
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ASM_FEATURE = 'asm';
const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CUSTOMER_SEARCH = '[Asm] Customer Search';
const CUSTOMER_SEARCH_FAIL = '[Asm] Customer Search Fail';
const CUSTOMER_SEARCH_SUCCESS = '[Asm] Customer Search Success';
const CUSTOMER_SEARCH_RESET = '[Asm] Customer Search Reset';
class CustomerSearch extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CUSTOMER_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_SEARCH;
    }
}
class CustomerSearchFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CUSTOMER_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_SEARCH_FAIL;
    }
}
class CustomerSearchSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(CUSTOMER_SEARCH_DATA);
        this.payload = payload;
        this.type = CUSTOMER_SEARCH_SUCCESS;
    }
}
class CustomerSearchReset extends StateUtils.LoaderResetAction {
    constructor() {
        super(CUSTOMER_SEARCH_DATA);
        this.type = CUSTOMER_SEARCH_RESET;
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOGOUT_CUSTOMER_SUPPORT_AGENT = '[Auth] Logout Customer Support Agent';
/**
 * Action dispatched after customer support agent logout. Used to clear store data (ui, search results)
 */
class LogoutCustomerSupportAgent {
    constructor() {
        this.type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var customerGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ASM_UI_UPDATE: ASM_UI_UPDATE,
    AsmUiUpdate: AsmUiUpdate,
    CUSTOMER_SEARCH: CUSTOMER_SEARCH,
    CUSTOMER_SEARCH_FAIL: CUSTOMER_SEARCH_FAIL,
    CUSTOMER_SEARCH_SUCCESS: CUSTOMER_SEARCH_SUCCESS,
    CUSTOMER_SEARCH_RESET: CUSTOMER_SEARCH_RESET,
    CustomerSearch: CustomerSearch,
    CustomerSearchFail: CustomerSearchFail,
    CustomerSearchSuccess: CustomerSearchSuccess,
    CustomerSearchReset: CustomerSearchReset,
    LOGOUT_CUSTOMER_SUPPORT_AGENT: LOGOUT_CUSTOMER_SUPPORT_AGENT,
    LogoutCustomerSupportAgent: LogoutCustomerSupportAgent
});

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
class CustomerEffects {
    constructor(actions$, asmConnector) {
        this.actions$ = actions$;
        this.asmConnector = asmConnector;
        this.customerSearch$ = createEffect(() => this.actions$.pipe(ofType(CUSTOMER_SEARCH), map((action) => action.payload), switchMap((options) => this.asmConnector.customerSearch(options).pipe(map((customerSearchResults) => {
            return new CustomerSearchSuccess(customerSearchResults);
        }), catchError((error) => of(new CustomerSearchFail(normalizeHttpError(error))))))));
    }
}
CustomerEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEffects, deps: [{ token: i1.Actions }, { token: AsmConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: AsmConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [CustomerEffects];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = { collapsed: false };
function reducer(state = initialState, action) {
    switch (action.type) {
        case ASM_UI_UPDATE: {
            return Object.assign(Object.assign({}, state), action.payload);
        }
        default: {
            return state;
        }
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        customerSearchResult: StateUtils.loaderReducer(CUSTOMER_SEARCH_DATA),
        asmUi: reducer,
    };
}
const reducerToken = new InjectionToken('AsmReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};
function clearCustomerSupportAgentAsmState(reducer) {
    return function (state, action) {
        if (action.type === LOGOUT_CUSTOMER_SUPPORT_AGENT) {
            state = Object.assign(Object.assign({}, state), { customerSearchResult: {} });
        }
        return reducer(state, action);
    };
}
const metaReducers = [
    clearCustomerSupportAgentAsmState,
];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getAsmState = createFeatureSelector(ASM_FEATURE);

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getAsmUi = createSelector(getAsmState, (state) => state.asmUi);

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getCustomerSearchResultsLoaderState = createSelector(getAsmState, (state) => state.customerSearchResult);
const getCustomerSearchResults = createSelector(getCustomerSearchResultsLoaderState, (state) => StateUtils.loaderValueSelector(state));
const getCustomerSearchResultsLoading = createSelector(getCustomerSearchResultsLoaderState, (state) => StateUtils.loaderLoadingSelector(state));

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var asmGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getAsmUi: getAsmUi,
    getCustomerSearchResultsLoaderState: getCustomerSearchResultsLoaderState,
    getCustomerSearchResults: getCustomerSearchResults,
    getCustomerSearchResultsLoading: getCustomerSearchResultsLoading,
    getAsmState: getAsmState
});

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
 * Responsible for storing ASM state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
class AsmStatePersistenceService {
    constructor(statePersistenceService, store, authStorageService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.authStorageService = authStorageService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'asm';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.getAsmState(),
            onRead: (state) => this.onRead(state),
        }));
    }
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    getAsmState() {
        return combineLatest([
            this.store.pipe(
            // Since getAsmState() may be called while the module is lazy loded
            // The asm state slice may not exist yet in the first store emissions.
            filter((store) => !!store.asm), select(getAsmUi)),
            of(this.authStorageService.getEmulatedUserToken()),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([ui, emulatedUserToken, tokenTarget]) => {
            let emulatedToken = emulatedUserToken;
            if (emulatedToken) {
                emulatedToken = Object.assign({}, emulatedUserToken);
                // To minimize risk of user account hijacking we don't persist emulated user refresh_token
                delete emulatedToken.refresh_token;
            }
            return {
                ui,
                emulatedUserToken: emulatedToken,
                tokenTarget,
            };
        }));
    }
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    onRead(state) {
        if (state) {
            if (state.ui) {
                this.store.dispatch(new AsmUiUpdate(state.ui));
            }
            if (state.emulatedUserToken) {
                this.authStorageService.setEmulatedUserToken(state.emulatedUserToken);
            }
            if (state.tokenTarget) {
                this.authStorageService.setTokenTarget(state.tokenTarget);
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStatePersistenceService, deps: [{ token: i1$1.StatePersistenceService }, { token: i1$2.Store }, { token: i3.AsmAuthStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.StatePersistenceService }, { type: i1$2.Store }, { type: i3.AsmAuthStorageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmStoreModule {
}
AsmStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmStoreModule, imports: [CommonModule,
        StateModule, i1$2.StoreFeatureModule, i1.EffectsFeatureModule] });
AsmStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStoreModule, providers: [reducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(ASM_FEATURE, reducerToken, { metaReducers }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(ASM_FEATURE, reducerToken, { metaReducers }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [reducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function asmStatePersistenceFactory(asmStatePersistenceService) {
    const result = () => asmStatePersistenceService.initSync();
    return result;
}
class AsmCoreModule {
}
AsmCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, imports: [CommonModule, AsmStoreModule] });
AsmCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, providers: [
        provideDefaultConfig(defaultAsmConfig),
        AsmConnector,
        {
            provide: MODULE_INITIALIZER,
            useFactory: asmStatePersistenceFactory,
            deps: [AsmStatePersistenceService],
            multi: true,
        },
    ], imports: [CommonModule, AsmStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmStoreModule],
                    providers: [
                        provideDefaultConfig(defaultAsmConfig),
                        AsmConnector,
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: asmStatePersistenceFactory,
                            deps: [AsmStatePersistenceService],
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
class AsmConfig extends OccConfig {
}
AsmConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmConfig, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AsmConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmConfig, decorators: [{
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
const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken('CustomerSearchPageNormalizer');

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
class AsmService {
    constructor(store) {
        this.store = store;
    }
    /**
     * Search for customers
     * @param options
     */
    customerSearch(options) {
        this.store.dispatch(new CustomerSearch(options));
    }
    /**
     * Reset the customer search result data to the initial state.
     */
    customerSearchReset() {
        this.store.dispatch(new CustomerSearchReset());
    }
    /**
     * Returns the customer search result data.
     */
    getCustomerSearchResults() {
        return this.store.pipe(select(getCustomerSearchResults));
    }
    /**
     * Returns the customer search result loading status.
     */
    getCustomerSearchResultsLoading() {
        return this.store.pipe(select(getCustomerSearchResultsLoading));
    }
    /**
     * Updates the state of the ASM UI
     */
    updateAsmUiState(asmUi) {
        this.store.dispatch(new AsmUiUpdate(asmUi));
    }
    /**
     * Get the state of the ASM UI
     */
    getAsmUiState() {
        return this.store.pipe(select(getAsmUi));
    }
}
AsmService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmService, deps: [{ token: i1$2.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AsmService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$2.Store }]; } });

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

export { ASM_FEATURE, customerGroup_actions as AsmActions, AsmAdapter, AsmConfig, AsmConnector, AsmCoreModule, asmGroup_selectors as AsmSelectors, AsmService, AsmStatePersistenceService, CUSTOMER_SEARCH_DATA, CUSTOMER_SEARCH_PAGE_NORMALIZER, asmStatePersistenceFactory };
//# sourceMappingURL=spartacus-asm-core.mjs.map
