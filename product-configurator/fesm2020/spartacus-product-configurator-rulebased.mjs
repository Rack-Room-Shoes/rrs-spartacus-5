import * as i0 from '@angular/core';
import { Injectable, isDevMode, Component, ChangeDetectionStrategy, NgModule, Input, InjectionToken, Inject, EventEmitter, Output, Directive, HostBinding, ViewChildren } from '@angular/core';
import * as i1$1 from '@spartacus/core';
import { StateUtils, OCC_USER_ID_CURRENT, GlobalMessageType, I18nModule, provideDefaultConfig, normalizeHttpError, StateModule, Config, UrlModule, FeaturesConfigModule, WindowRef, ConfigModule } from '@spartacus/core';
import * as i2$1 from '@spartacus/product-configurator/common';
import { CommonConfigurator, ConfiguratorRouter, ConfiguratorModelUtils, ConfiguratorProductScope } from '@spartacus/product-configurator/common';
import { Subscription, of, timer, BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { delayWhen, filter, map, tap, take, switchMap, switchMapTo, delay, mergeMap, catchError, distinct, debounce, distinctUntilKeyChanged, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import { MULTI_CART_DATA, CartActions } from '@spartacus/cart/base/core';
import * as i2 from '@spartacus/cart/base/root';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/cart/base/root';
import * as i4 from '@spartacus/checkout/base/root';
import * as i6 from '@spartacus/order/root';
import * as i3 from '@spartacus/storefront';
import { ICON_TYPE, IconModule, ItemCounterModule, KeyboardFocusModule, MediaModule, DirectionMode, BREAKPOINT, SpinnerModule } from '@spartacus/storefront';
import * as i3$1 from '@angular/common';
import { CommonModule, formatNumber, getLocaleNumberSymbol, NumberSymbol, getLocaleId } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import * as i1$2 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i1$3 from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i5$1 from '@angular/router';
import { RouterModule } from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// Note that this namespace should be augmentable, therefore it's exposed in the 'public_api.ts'
// of the rulebased entry point, and there is no index.ts file in this folder
var Configurator;
(function (Configurator) {
    let GroupType;
    (function (GroupType) {
        GroupType["ATTRIBUTE_GROUP"] = "AttributeGroup";
        GroupType["SUB_ITEM_GROUP"] = "SubItemGroup";
        GroupType["CONFLICT_HEADER_GROUP"] = "ConflictHeaderGroup";
        GroupType["CONFLICT_GROUP"] = "ConflictGroup";
    })(GroupType = Configurator.GroupType || (Configurator.GroupType = {}));
    let UiType;
    (function (UiType) {
        UiType["NOT_IMPLEMENTED"] = "not_implemented";
        UiType["RADIOBUTTON"] = "radioGroup";
        UiType["RADIOBUTTON_ADDITIONAL_INPUT"] = "radioGroup_add";
        UiType["CHECKBOX"] = "checkBox";
        UiType["CHECKBOXLIST"] = "checkBoxList";
        UiType["DROPDOWN"] = "dropdown";
        UiType["DROPDOWN_ADDITIONAL_INPUT"] = "dropdown_add";
        UiType["LISTBOX"] = "listbox";
        UiType["LISTBOX_MULTI"] = "listboxmulti";
        UiType["READ_ONLY"] = "readonly";
        UiType["STRING"] = "string";
        UiType["NUMERIC"] = "numeric";
        UiType["AUTO_COMPLETE_CUSTOM"] = "input_autocomplete";
        UiType["MULTI_SELECTION_IMAGE"] = "multi_selection_image";
        UiType["SINGLE_SELECTION_IMAGE"] = "single_selection_image";
        //introduced with CPQ
        UiType["CHECKBOXLIST_PRODUCT"] = "checkBoxListProduct";
        UiType["DROPDOWN_PRODUCT"] = "dropdownProduct";
        UiType["RADIOBUTTON_PRODUCT"] = "radioGroupProduct";
    })(UiType = Configurator.UiType || (Configurator.UiType = {}));
    let ImageFormatType;
    (function (ImageFormatType) {
        ImageFormatType["VALUE_IMAGE"] = "VALUE_IMAGE";
        ImageFormatType["ATTRIBUTE_IMAGE"] = "ATTRIBUTE_IMAGE";
    })(ImageFormatType = Configurator.ImageFormatType || (Configurator.ImageFormatType = {}));
    let ImageType;
    (function (ImageType) {
        ImageType["PRIMARY"] = "PRIMARY";
        ImageType["GALLERY"] = "GALLERY";
    })(ImageType = Configurator.ImageType || (Configurator.ImageType = {}));
    let DataType;
    (function (DataType) {
        DataType["INPUT_STRING"] = "String";
        DataType["INPUT_NUMBER"] = "Number";
        DataType["USER_SELECTION_QTY_ATTRIBUTE_LEVEL"] = "UserSelectionWithAttributeQuantity";
        DataType["USER_SELECTION_QTY_VALUE_LEVEL"] = "UserSelectionWithValueQuantity";
        DataType["USER_SELECTION_NO_QTY"] = "UserSelectionWithoutQuantity";
        DataType["NOT_IMPLEMENTED"] = "not_implemented";
    })(DataType = Configurator.DataType || (Configurator.DataType = {}));
    let UpdateType;
    (function (UpdateType) {
        UpdateType["ATTRIBUTE"] = "Attribute";
        UpdateType["ATTRIBUTE_QUANTITY"] = "AttributeQuantity";
        UpdateType["VALUE_QUANTITY"] = "ValueQuantity";
    })(UpdateType = Configurator.UpdateType || (Configurator.UpdateType = {}));
    let AttributeOverviewType;
    (function (AttributeOverviewType) {
        AttributeOverviewType["GENERAL"] = "general";
        AttributeOverviewType["BUNDLE"] = "bundle";
    })(AttributeOverviewType = Configurator.AttributeOverviewType || (Configurator.AttributeOverviewType = {}));
    let ValidationType;
    (function (ValidationType) {
        ValidationType["NONE"] = "NONE";
        ValidationType["NUMERIC"] = "NUMERIC";
    })(ValidationType = Configurator.ValidationType || (Configurator.ValidationType = {}));
})(Configurator || (Configurator = {}));

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CONFIGURATOR_FEATURE = 'productConfigurator';
const CONFIGURATOR_DATA = '[Configurator] Configuration Data';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const READ_CART_ENTRY_CONFIGURATION = '[Configurator] Read Cart Entry Configuration';
const READ_CART_ENTRY_CONFIGURATION_SUCCESS = '[Configurator] Read Cart Entry Configuration Success';
const READ_CART_ENTRY_CONFIGURATION_FAIL = '[Configurator] Read Cart Entry Configuration Fail';
const READ_ORDER_ENTRY_CONFIGURATION = '[Configurator] Read Order Entry Configuration';
const READ_ORDER_ENTRY_CONFIGURATION_SUCCESS = '[Configurator] Read Order Entry Configuration Success';
const READ_ORDER_ENTRY_CONFIGURATION_FAIL = '[Configurator] Read Order Entry Configuration Fail';
const ADD_TO_CART = '[Configurator] Add to cart';
const UPDATE_CART_ENTRY = '[Configurator] Update cart entry';
const UPDATE_CART_ENTRY_SUCCESS = '[Configurator] Update cart entry success';
const ADD_NEXT_OWNER = '[Configurator] Add next owner';
const SET_NEXT_OWNER_CART_ENTRY = '[Configurator] Set next owner cart entry';
const REMOVE_CART_BOUND_CONFIGURATIONS = '[Configurator] Remove cart bound configurations';
class ReadCartEntryConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION;
    }
}
class ReadCartEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
    }
}
class ReadCartEntryConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION_FAIL;
    }
}
class ReadOrderEntryConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION;
    }
}
class ReadOrderEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION_SUCCESS;
    }
}
class ReadOrderEntryConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION_FAIL;
    }
}
class AddToCart extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = ADD_TO_CART;
    }
}
class UpdateCartEntry extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = UPDATE_CART_ENTRY;
    }
}
class AddNextOwner {
    constructor(payload) {
        this.payload = payload;
        this.type = ADD_NEXT_OWNER;
    }
}
class RemoveCartBoundConfigurations {
    constructor() {
        this.type = REMOVE_CART_BOUND_CONFIGURATIONS;
        // Intentional Empty Constructor
    }
}
class SetNextOwnerCartEntry extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = SET_NEXT_OWNER_CART_ENTRY;
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CREATE_CONFIGURATION = '[Configurator] Create Configuration';
const CREATE_CONFIGURATION_FAIL = '[Configurator] Create Configuration Fail';
const CREATE_CONFIGURATION_SUCCESS = '[Configurator] Create Configuration Sucess';
const READ_CONFIGURATION = '[Configurator] Read Configuration';
const READ_CONFIGURATION_FAIL = '[Configurator] Read Configuration Fail';
const READ_CONFIGURATION_SUCCESS = '[Configurator] Read Configuration Sucess';
const UPDATE_CONFIGURATION = '[Configurator] Update Configuration';
const UPDATE_CONFIGURATION_FAIL = '[Configurator] Update Configuration Fail';
const UPDATE_CONFIGURATION_SUCCESS = '[Configurator] Update Configuration Success';
const UPDATE_CONFIGURATION_FINALIZE_SUCCESS = '[Configurator] Update Configuration finalize success';
const UPDATE_CONFIGURATION_FINALIZE_FAIL = '[Configurator] Update Configuration finalize fail';
const CHANGE_GROUP = '[Configurator] Change group';
const CHANGE_GROUP_FINALIZE = '[Configurator] Change group finalize';
const REMOVE_CONFIGURATION = '[Configurator] Remove configuration';
const UPDATE_PRICE_SUMMARY = '[Configurator] Update Configuration Summary Price';
const UPDATE_PRICE_SUMMARY_FAIL = '[Configurator] Update Configuration Price Summary fail';
const UPDATE_PRICE_SUMMARY_SUCCESS = '[Configurator] Update Configuration Price Summary success';
const GET_CONFIGURATION_OVERVIEW = '[Configurator] Get Configuration Overview';
const GET_CONFIGURATION_OVERVIEW_FAIL = '[Configurator] Get Configuration Overview fail';
const GET_CONFIGURATION_OVERVIEW_SUCCESS = '[Configurator] Get Configuration Overview success';
const SET_INTERACTION_STATE = '[Configurator] Set interaction state';
const SET_CURRENT_GROUP = '[Configurator] Set current group to State';
const SET_MENU_PARENT_GROUP = '[Configurator] Set current parent group for menu to State';
const SET_GROUPS_VISITED = '[Configurator] Set groups to visited';
class CreateConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.key);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION;
    }
}
class CreateConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION_FAIL;
    }
}
class CreateConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION_SUCCESS;
    }
}
class ReadConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = READ_CONFIGURATION;
    }
}
class ReadConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = READ_CONFIGURATION_FAIL;
    }
}
class ReadConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_CONFIGURATION_SUCCESS;
    }
}
class UpdateConfiguration extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION;
        this.meta.loader = {
            load: true,
        };
    }
}
class UpdateConfigurationFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_FAIL;
        this.meta.loader = {
            error: payload.error,
        };
    }
}
class UpdateConfigurationSuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_SUCCESS;
    }
}
class UpdateConfigurationFinalizeSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_FINALIZE_SUCCESS;
    }
}
class UpdateConfigurationFinalizeFail extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_FINALIZE_FAIL;
    }
}
class UpdatePriceSummary extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_PRICE_SUMMARY;
    }
}
class UpdatePriceSummaryFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = UPDATE_PRICE_SUMMARY_FAIL;
    }
}
class UpdatePriceSummarySuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_PRICE_SUMMARY_SUCCESS;
    }
}
class ChangeGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = CHANGE_GROUP;
    }
}
class ChangeGroupFinalize extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = CHANGE_GROUP_FINALIZE;
    }
}
class RemoveConfiguration extends StateUtils.EntityLoaderResetAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey);
        this.payload = payload;
        this.type = REMOVE_CONFIGURATION;
    }
}
class GetConfigurationOverview extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = GET_CONFIGURATION_OVERVIEW;
    }
}
class GetConfigurationOverviewFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = GET_CONFIGURATION_OVERVIEW_FAIL;
    }
}
class GetConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey);
        this.payload = payload;
        this.type = GET_CONFIGURATION_OVERVIEW_SUCCESS;
    }
}
class SetInteractionState extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.interactionState);
        this.payload = payload;
        this.type = SET_INTERACTION_STATE;
    }
}
class SetCurrentGroup extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.currentGroup);
        this.payload = payload;
        this.type = SET_CURRENT_GROUP;
    }
}
class SetMenuParentGroup extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.menuParentGroup);
        this.payload = payload;
        this.type = SET_MENU_PARENT_GROUP;
    }
}
class SetGroupsVisited extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.visitedGroups);
        this.payload = payload;
        this.type = SET_GROUPS_VISITED;
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var configuratorGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    READ_CART_ENTRY_CONFIGURATION: READ_CART_ENTRY_CONFIGURATION,
    READ_CART_ENTRY_CONFIGURATION_SUCCESS: READ_CART_ENTRY_CONFIGURATION_SUCCESS,
    READ_CART_ENTRY_CONFIGURATION_FAIL: READ_CART_ENTRY_CONFIGURATION_FAIL,
    READ_ORDER_ENTRY_CONFIGURATION: READ_ORDER_ENTRY_CONFIGURATION,
    READ_ORDER_ENTRY_CONFIGURATION_SUCCESS: READ_ORDER_ENTRY_CONFIGURATION_SUCCESS,
    READ_ORDER_ENTRY_CONFIGURATION_FAIL: READ_ORDER_ENTRY_CONFIGURATION_FAIL,
    ADD_TO_CART: ADD_TO_CART,
    UPDATE_CART_ENTRY: UPDATE_CART_ENTRY,
    UPDATE_CART_ENTRY_SUCCESS: UPDATE_CART_ENTRY_SUCCESS,
    ADD_NEXT_OWNER: ADD_NEXT_OWNER,
    SET_NEXT_OWNER_CART_ENTRY: SET_NEXT_OWNER_CART_ENTRY,
    REMOVE_CART_BOUND_CONFIGURATIONS: REMOVE_CART_BOUND_CONFIGURATIONS,
    ReadCartEntryConfiguration: ReadCartEntryConfiguration,
    ReadCartEntryConfigurationSuccess: ReadCartEntryConfigurationSuccess,
    ReadCartEntryConfigurationFail: ReadCartEntryConfigurationFail,
    ReadOrderEntryConfiguration: ReadOrderEntryConfiguration,
    ReadOrderEntryConfigurationSuccess: ReadOrderEntryConfigurationSuccess,
    ReadOrderEntryConfigurationFail: ReadOrderEntryConfigurationFail,
    AddToCart: AddToCart,
    UpdateCartEntry: UpdateCartEntry,
    AddNextOwner: AddNextOwner,
    RemoveCartBoundConfigurations: RemoveCartBoundConfigurations,
    SetNextOwnerCartEntry: SetNextOwnerCartEntry,
    CREATE_CONFIGURATION: CREATE_CONFIGURATION,
    CREATE_CONFIGURATION_FAIL: CREATE_CONFIGURATION_FAIL,
    CREATE_CONFIGURATION_SUCCESS: CREATE_CONFIGURATION_SUCCESS,
    READ_CONFIGURATION: READ_CONFIGURATION,
    READ_CONFIGURATION_FAIL: READ_CONFIGURATION_FAIL,
    READ_CONFIGURATION_SUCCESS: READ_CONFIGURATION_SUCCESS,
    UPDATE_CONFIGURATION: UPDATE_CONFIGURATION,
    UPDATE_CONFIGURATION_FAIL: UPDATE_CONFIGURATION_FAIL,
    UPDATE_CONFIGURATION_SUCCESS: UPDATE_CONFIGURATION_SUCCESS,
    UPDATE_CONFIGURATION_FINALIZE_SUCCESS: UPDATE_CONFIGURATION_FINALIZE_SUCCESS,
    UPDATE_CONFIGURATION_FINALIZE_FAIL: UPDATE_CONFIGURATION_FINALIZE_FAIL,
    CHANGE_GROUP: CHANGE_GROUP,
    CHANGE_GROUP_FINALIZE: CHANGE_GROUP_FINALIZE,
    REMOVE_CONFIGURATION: REMOVE_CONFIGURATION,
    UPDATE_PRICE_SUMMARY: UPDATE_PRICE_SUMMARY,
    UPDATE_PRICE_SUMMARY_FAIL: UPDATE_PRICE_SUMMARY_FAIL,
    UPDATE_PRICE_SUMMARY_SUCCESS: UPDATE_PRICE_SUMMARY_SUCCESS,
    GET_CONFIGURATION_OVERVIEW: GET_CONFIGURATION_OVERVIEW,
    GET_CONFIGURATION_OVERVIEW_FAIL: GET_CONFIGURATION_OVERVIEW_FAIL,
    GET_CONFIGURATION_OVERVIEW_SUCCESS: GET_CONFIGURATION_OVERVIEW_SUCCESS,
    SET_INTERACTION_STATE: SET_INTERACTION_STATE,
    SET_CURRENT_GROUP: SET_CURRENT_GROUP,
    SET_MENU_PARENT_GROUP: SET_MENU_PARENT_GROUP,
    SET_GROUPS_VISITED: SET_GROUPS_VISITED,
    CreateConfiguration: CreateConfiguration,
    CreateConfigurationFail: CreateConfigurationFail,
    CreateConfigurationSuccess: CreateConfigurationSuccess,
    ReadConfiguration: ReadConfiguration,
    ReadConfigurationFail: ReadConfigurationFail,
    ReadConfigurationSuccess: ReadConfigurationSuccess,
    UpdateConfiguration: UpdateConfiguration,
    UpdateConfigurationFail: UpdateConfigurationFail,
    UpdateConfigurationSuccess: UpdateConfigurationSuccess,
    UpdateConfigurationFinalizeSuccess: UpdateConfigurationFinalizeSuccess,
    UpdateConfigurationFinalizeFail: UpdateConfigurationFinalizeFail,
    UpdatePriceSummary: UpdatePriceSummary,
    UpdatePriceSummaryFail: UpdatePriceSummaryFail,
    UpdatePriceSummarySuccess: UpdatePriceSummarySuccess,
    ChangeGroup: ChangeGroup,
    ChangeGroupFinalize: ChangeGroupFinalize,
    RemoveConfiguration: RemoveConfiguration,
    GetConfigurationOverview: GetConfigurationOverview,
    GetConfigurationOverviewFail: GetConfigurationOverviewFail,
    GetConfigurationOverviewSuccess: GetConfigurationOverviewSuccess,
    SetInteractionState: SetInteractionState,
    SetCurrentGroup: SetCurrentGroup,
    SetMenuParentGroup: SetMenuParentGroup,
    SetGroupsVisited: SetGroupsVisited
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
const getConfigurationsState = createFeatureSelector(CONFIGURATOR_FEATURE);
const getConfigurationState = createSelector(getConfigurationsState, (state) => state.configurations);
const getConfigurationProcessLoaderStateFactory = (code) => {
    return createSelector(getConfigurationState, (details) => StateUtils.entityProcessesLoaderStateSelector(details, code));
};
const hasPendingChanges = (code) => {
    return createSelector(getConfigurationState, (details) => StateUtils.entityHasPendingProcessesSelector(details, code));
};
const getConfigurationFactory = (code) => {
    return createSelector(getConfigurationProcessLoaderStateFactory(code), (configurationState) => StateUtils.loaderValueSelector(configurationState));
};
const getCurrentGroup = (ownerKey) => {
    return createSelector(getConfigurationFactory(ownerKey), (configuration) => configuration?.interactionState?.currentGroup);
};
const isGroupVisited = (ownerKey, groupId) => {
    return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
        const groupsVisited = configuration?.interactionState?.groupsVisited;
        return groupsVisited ? groupsVisited[groupId] : false;
    });
};
const areGroupsVisited = (ownerKey, groupIds) => {
    return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
        return (groupIds
            .map((id) => {
            const groupsVisited = configuration?.interactionState?.groupsVisited;
            return groupsVisited ? groupsVisited[id] : false;
        })
            .filter((visited) => !visited).length === 0);
    });
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var configuratorGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getConfigurationsState: getConfigurationsState,
    getConfigurationState: getConfigurationState,
    getConfigurationProcessLoaderStateFactory: getConfigurationProcessLoaderStateFactory,
    hasPendingChanges: hasPendingChanges,
    getConfigurationFactory: getConfigurationFactory,
    getCurrentGroup: getCurrentGroup,
    isGroupVisited: isGroupVisited,
    areGroupsVisited: areGroupsVisited
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
/**
 * Utility service for the facade layer. Supposed to be accessed by facade services
 */
class ConfiguratorUtilsService {
    /**
     * Determines the direct parent group for an attribute group
     * @param {Configurator.Group[]} groups - List of groups where we search for parent
     * @param {Configurator.Group} group - If already part of groups, no further search is needed, and we return the provided parent group
     * @param {Configurator.Group} parentGroup - Optional parent group.
     * @returns {Configurator.Group | undefined} - Parent group. Might be undefined
     */
    getParentGroup(groups, group, parentGroup) {
        if (groups.includes(group)) {
            return parentGroup;
        }
        return groups
            .map((currentGroup) => {
            return currentGroup.subGroups
                ? this.getParentGroup(currentGroup.subGroups, group, currentGroup)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
    }
    /**
     * Finds group identified by its ID, and ensures that we always get a valid group.
     * If nothing is found in the configuration group list, this methods returns the first group.
     *
     * The exceptional case can happen if e.g. an edit in a conflict was done that
     * resolved the conflict, or if a group vanished due to object dependencies.
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group} - Group identified by its id, if available. Otherwise first group
     */
    getGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        const groupFound = this.getGroupFromSubGroups(groups, groupId);
        return groupFound ? groupFound : groups[0];
    }
    /**
     * Finds group identified by its ID. If nothing is found, this
     * methods returns undefined
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group | undefined} - Group identified by its id, if available. Otherwise undefined
     */
    getOptionalGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        return currentGroup
            ? currentGroup
            : this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupByIdIfPresent(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        return this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupFromSubGroups(groups, groupId) {
        const groupFound = groups
            .map((group) => {
            return group.subGroups
                ? this.getGroupByIdIfPresent(group.subGroups, groupId)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
        return groupFound;
    }
    /**
     * Verifies whether the current group has a subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the current group has any subgroups, otherwise 'false'
     */
    hasSubGroups(group) {
        return group.subGroups ? group.subGroups.length > 0 : false;
    }
    /**
     * Verifies whether the configuration has been created.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {boolean} - 'True' if the configuration hass been created, otherwise 'false'
     */
    isConfigurationCreated(configuration) {
        const configId = configuration?.configId;
        return (configId !== undefined &&
            configId.length !== 0 &&
            configuration !== undefined &&
            (configuration.flatGroups.length > 0 ||
                configuration.overview !== undefined));
    }
    /**
     * Creates configuration extract.
     *
     * @param {Configurator.Attribute} changedAttribute - changed configuration
     * @param {Configurator.Configuration} configuration - configuration
     * @param {Configurator.UpdateType} updateType - updated type
     * @return {Configurator.Configuration} - Configuration
     */
    createConfigurationExtract(changedAttribute, configuration, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        const newConfiguration = {
            configId: configuration.configId,
            groups: [],
            flatGroups: [],
            interactionState: {},
            owner: configuration.owner,
            productCode: configuration.productCode,
            updateType,
        };
        const groupPath = [];
        if (changedAttribute.groupId) {
            this.buildGroupPath(changedAttribute.groupId, configuration.groups, groupPath);
        }
        else {
            throw Error('GroupId must be available at attribute level during update');
        }
        const groupPathLength = groupPath.length;
        if (groupPathLength === 0) {
            throw new Error('At this point we expect that group is available in the configuration: ' +
                changedAttribute.groupId +
                ', ' +
                JSON.stringify(configuration.groups.map((cGroup) => cGroup.id)));
        }
        let currentGroupInExtract = this.buildGroupForExtract(groupPath[groupPathLength - 1]);
        let currentLeafGroupInExtract = currentGroupInExtract;
        newConfiguration.groups.push(currentGroupInExtract);
        for (let index = groupPath.length - 1; index > 0; index--) {
            currentLeafGroupInExtract = this.buildGroupForExtract(groupPath[index - 1]);
            currentGroupInExtract.subGroups = [currentLeafGroupInExtract];
            currentGroupInExtract = currentLeafGroupInExtract;
        }
        currentLeafGroupInExtract.attributes = [changedAttribute];
        return newConfiguration;
    }
    /**
     * Builds group path.
     *
     * @param {string} groupId - Group ID
     * @param { Configurator.Group[]} groupList - List of groups
     * @param { Configurator.Group[]} groupPath - Path of groups
     * @return {boolean} - 'True' if the group has been found, otherwise 'false'
     */
    buildGroupPath(groupId, groupList, groupPath) {
        let haveFoundGroup = false;
        const group = groupList.find((currentGroup) => currentGroup.id === groupId);
        if (group) {
            groupPath.push(group);
            haveFoundGroup = true;
        }
        else {
            groupList
                .filter((currentGroup) => currentGroup.subGroups)
                .forEach((currentGroup) => {
                if (currentGroup.subGroups &&
                    this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)) {
                    groupPath.push(currentGroup);
                    haveFoundGroup = true;
                }
            });
        }
        return haveFoundGroup;
    }
    /**
     * Retrieves the configuration from state, and throws an error in case the configuration is
     * not available
     * @param {StateUtils.ProcessesLoaderState<Configurator.Configuration>} configurationState - Process loader state containing product configuration
     * @returns {Configurator.Configuration} - The actual product configuration
     */
    getConfigurationFromState(configurationState) {
        const configuration = configurationState.value;
        if (configuration) {
            return configuration;
        }
        else {
            throw new Error('Configuration must be defined at this point');
        }
    }
    buildGroupForExtract(group) {
        const changedGroup = {
            groupType: group.groupType,
            id: group.id,
            subGroups: [],
        };
        return changedGroup;
    }
}
ConfiguratorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCartService {
    constructor(store, activeCartService, commonConfigUtilsService, 
    // TODO:#checkout - handle the breaking changes
    checkoutQueryFacade, userIdService, configuratorUtilsService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.userIdService = userIdService;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Reads a configuratiom that is attached to a cart entry, dispatching the respective action
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), 
        //needed as we cannot read the cart in general and for the OV
        //in parallel, this can lead to cache issues with promotions
        delayWhen(() => this.activeCartService.isStable().pipe(filter((stable) => stable))), delayWhen(() => this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => state.loading), filter((loading) => !loading))), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                this.activeCartService
                    .requireLoadedCart()
                    .pipe(take(1))
                    .subscribe((cart) => {
                    this.userIdService
                        .getUserId()
                        .pipe(take(1))
                        .subscribe((userId) => {
                        const readFromCartEntryParameters = {
                            userId: userId,
                            cartId: this.commonConfigUtilsService.getCartId(cart),
                            cartEntryNumber: owner.id,
                            owner: owner,
                        };
                        this.store.dispatch(new ReadCartEntryConfiguration(readFromCartEntryParameters));
                    });
                });
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Reads a configuratiom that is attached to an order entry, dispatching the respective action
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForOrderEntry(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                const ownerIdParts = this.commonConfigUtilsService.decomposeOwnerId(owner.id);
                const readFromOrderEntryParameters = {
                    userId: OCC_USER_ID_CURRENT,
                    orderId: ownerIdParts.documentId,
                    orderEntryNumber: ownerIdParts.entryNumber,
                    owner: owner,
                };
                this.store.dispatch(new ReadOrderEntryConfiguration(readFromOrderEntryParameters));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
     *
     * @param productCode - Product code
     * @param configId - Configuration ID
     * @param owner Configuration owner
     */
    addToCart(productCode, configId, owner) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const addToCartParameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    productCode: productCode,
                    quantity: 1,
                    configId: configId,
                    owner: owner,
                };
                this.store.dispatch(new AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by the configuration.
     * The cart entry number for the entry that owns the configuration can be told
     * from the configuration's owner ID
     *
     * @param configuration - Configuration
     */
    updateCartEntry(configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const parameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    cartEntryNumber: configuration.owner.id,
                    configuration: configuration,
                };
                this.store.dispatch(new UpdateCartEntry(parameters));
            });
        });
    }
    /**
     * Can be used to check if the active cart has any product configuration issues.
     * @returns True if and only if there is at least one cart entry with product configuration issues
     */
    activeCartHasIssues() {
        return this.activeCartService.requireLoadedCart().pipe(map((cart) => {
            return cart ? cart.entries : [];
        }), map((entries) => entries
            ? entries.filter((entry) => this.commonConfigUtilsService.getNumberOfIssues(entry))
            : []), map((entries) => entries.length > 0));
    }
    /**
     * Remove all configurations that are linked to cart entries
     */
    removeCartBoundConfigurations() {
        this.store.dispatch(new RemoveCartBoundConfigurations());
    }
    isConfigurationCreated(configuration) {
        const configId = configuration.configId;
        return configId.length !== 0;
    }
    configurationNeedsReading(configurationState) {
        const configuration = configurationState.value;
        return (configuration === undefined ||
            (!this.isConfigurationCreated(configuration) &&
                !configurationState.loading &&
                !configurationState.error));
    }
}
ConfiguratorCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i2$1.CommonConfiguratorUtilsService }, { token: i4.CheckoutQueryFacade }, { token: i1$1.UserIdService }, { token: ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i2$1.CommonConfiguratorUtilsService }, { type: i4.CheckoutQueryFacade }, { type: i1$1.UserIdService }, { type: ConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCommonsService {
    constructor(store, commonConfigUtilsService, configuratorCartService, activeCartService, configuratorUtils) {
        this.store = store;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorCartService = configuratorCartService;
        this.activeCartService = activeCartService;
        this.configuratorUtils = configuratorUtils;
    }
    /**
     * Verifies whether there are any pending configuration changes.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if there are any pending changes, otherwise false
     */
    hasPendingChanges(owner) {
        return this.store.pipe(select(hasPendingChanges(owner.key)));
    }
    /**
     * Verifies whether the configuration is loading.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if the configuration is loading, otherwise false
     */
    isConfigurationLoading(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), map((configurationState) => configurationState.loading ?? false));
    }
    /**
     * Returns a configuration for an owner. Emits only if there are valid configurations
     * available for the requested owner, does not trigger the re-read or
     * creation of the configuration in case it's not there
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<Configurator.Configuration>}
     */
    getConfiguration(owner) {
        return this.store.pipe(select(getConfigurationFactory(owner.key)), filter((configuration) => this.configuratorUtils.isConfigurationCreated(configuration)));
    }
    /**
     * Returns a configuration if it exists or creates a new one.
     * Emits if there is a valid configuration available and triggers
     * the configuration creation or read from backend in case it is not
     * available
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<Configurator.Configuration>}
     */
    getOrCreateConfiguration(owner) {
        switch (owner.type) {
            case CommonConfigurator.OwnerType.PRODUCT: {
                return this.getOrCreateConfigurationForProduct(owner);
            }
            case CommonConfigurator.OwnerType.CART_ENTRY: {
                return this.configuratorCartService.readConfigurationForCartEntry(owner);
            }
            case CommonConfigurator.OwnerType.ORDER_ENTRY: {
                return this.configuratorCartService.readConfigurationForOrderEntry(owner);
            }
        }
    }
    /**
     * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
     *
     * @param ownerKey - Configuration owner key
     * @param changedAttribute - Changes attribute
     */
    updateConfiguration(ownerKey, changedAttribute, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        // in case cart updates pending: Do nothing, because an addToCart might
        // be in progress. Can happen if on slow networks addToCart was hit and
        // afterwards an attribute was changed before the OV navigation has
        // taken place
        this.activeCartService
            .getActive()
            .pipe(take(1), switchMap((cart) => this.activeCartService.isStable().pipe(take(1), tap((stable) => {
            if (isDevMode() && cart.code && !stable) {
                console.warn('Cart is busy, no configuration updates possible');
            }
        }), filter((stable) => !cart.code || stable), switchMapTo(this.store.pipe(select(getConfigurationFactory(ownerKey)), take(1))))))
            .subscribe((configuration) => {
            this.store.dispatch(new UpdateConfiguration(this.configuratorUtils.createConfigurationExtract(changedAttribute, configuration, updateType)));
        });
    }
    /**
     * Returns a configuration with an overview. Emits valid configurations which
     * include the overview aspect
     *
     * @param configuration - Configuration
     * @returns Observable of configurations including the overview
     */
    getConfigurationWithOverview(configuration) {
        return this.store.pipe(select(getConfigurationFactory(configuration.owner.key)), filter((config) => this.configuratorUtils.isConfigurationCreated(config)), tap((configurationState) => {
            if (!this.hasConfigurationOverview(configurationState)) {
                this.store.dispatch(new GetConfigurationOverview(configuration));
            }
        }), filter((config) => this.hasConfigurationOverview(config)));
    }
    /**
     * Removes a configuration.
     *
     * @param owner - Configuration owner
     */
    removeConfiguration(owner) {
        this.store.dispatch(new RemoveConfiguration({ ownerKey: owner.key }));
    }
    /**
     * Checks if the configuration contains conflicts
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} - Returns true if the configuration has conflicts, otherwise false
     */
    hasConflicts(owner) {
        return this.getConfiguration(owner).pipe(map((configuration) => 
        //We expect that the first group must always be the conflict group
        configuration.groups[0]?.groupType ===
            Configurator.GroupType.CONFLICT_HEADER_GROUP));
    }
    getOrCreateConfigurationForProduct(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if ((configurationState.value === undefined ||
                !this.configuratorUtils.isConfigurationCreated(configurationState.value)) &&
                configurationState.loading !== true &&
                configurationState.error !== true) {
                this.store.dispatch(new CreateConfiguration(owner));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.configuratorUtils.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtils.getConfigurationFromState(configurationState)));
    }
    hasConfigurationOverview(configuration) {
        return configuration.overview !== undefined;
    }
}
ConfiguratorCommonsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCommonsService, deps: [{ token: i1.Store }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorCartService }, { token: i2.ActiveCartFacade }, { token: ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCommonsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCommonsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCommonsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorCartService }, { type: i2.ActiveCartFacade }, { type: ConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service for handling group statuses
 */
class ConfiguratorGroupStatusService {
    constructor(store, configuratorUtilsService) {
        this.store = store;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Verifies whether the group has been visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @returns {Observable<boolean>} Has group been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.store.select(isGroupVisited(owner.key, groupId));
    }
    /**
     * Returns the first non-conflict group of the configuration which is not completed
     * and undefined if all are completed.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     *
     * @return {Configurator.Group} - First incomplete group or undefined
     */
    getFirstIncompleteGroup(configuration) {
        return configuration.flatGroups
            ? configuration.flatGroups
                .filter((group) => group.groupType !== Configurator.GroupType.CONFLICT_GROUP)
                .find((group) => !group.complete)
            : undefined;
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(configuration, groupId) {
        const group = this.configuratorUtilsService.getGroupById(configuration.groups, groupId);
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        const visitedGroupIds = [];
        visitedGroupIds.push(group.id);
        if (parentGroup) {
            this.getParentGroupStatusVisited(configuration, group.id, parentGroup, visitedGroupIds);
        }
        this.store.dispatch(new SetGroupsVisited({
            entityKey: configuration.owner.key,
            visitedGroups: visitedGroupIds,
        }));
    }
    areGroupsVisited(owner, groupIds) {
        return this.store.select(areGroupsVisited(owner.key, groupIds));
    }
    getParentGroupStatusVisited(configuration, groupId, parentGroup, visitedGroupIds) {
        const subGroups = [];
        parentGroup.subGroups.forEach((subGroup) => {
            //The current group is not set to visited yet, therefore we have to exclude it in the check
            if (subGroup.id === groupId) {
                return;
            }
            subGroups.push(subGroup.id);
        });
        this.areGroupsVisited(configuration.owner, subGroups)
            .pipe(take(1))
            .subscribe((isVisited) => {
            if (isVisited) {
                visitedGroupIds.push(parentGroup.id);
                const grandParentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, parentGroup.id));
                if (grandParentGroup) {
                    this.getParentGroupStatusVisited(configuration, parentGroup.id, grandParentGroup, visitedGroupIds);
                }
            }
        });
    }
}
ConfiguratorGroupStatusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupStatusService, deps: [{ token: i1.Store }, { token: ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupStatusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupStatusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupStatusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: ConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service for handling configuration groups
 */
class ConfiguratorGroupsService {
    constructor(store, configuratorCommonsService, configuratorUtilsService, configuratorGroupStatusService) {
        this.store = store;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorUtilsService = configuratorUtilsService;
        this.configuratorGroupStatusService = configuratorGroupStatusService;
    }
    /**
     * Returns the current group Id.
     * In case no group Id is being set before returns the first group of the configuration.
     * Return null when configuration contains no groups.
     *
     * @param {CommonConfigurator.Owner} owner configuration owner
     * @returns {Observable<string>} Group ID
     */
    getCurrentGroupId(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            if (configuration?.interactionState.currentGroup) {
                return configuration.interactionState.currentGroup;
            }
            else {
                return configuration?.groups[0]?.id;
            }
        }));
    }
    /**
     * Return the first conflict group of a configuration or undefined
     * if not present
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Configurator.Group} Conflict group
     */
    getFirstConflictGroup(configuration) {
        return configuration.flatGroups.find((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
    /**
     * Navigates to the first non-conflict group of the configuration which is not completed.
     * This method assumes that the configuration has incomplete groups,
     * the caller has to verify this prior to calling this method. In case no incomplete group is
     * present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     */
    navigateToFirstIncompleteGroup(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.configuratorGroupStatusService.getFirstIncompleteGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true);
            }
        });
    }
    /**
     * Navigates to the first conflict group and sets the conflict header as parent group.
     * This method assumes that the configuration has conflicts,
     * the caller has to verify this prior to calling this method. In case no conflict group
     * is present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner Configuration Owner
     */
    navigateToConflictSolver(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.getFirstConflictGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true);
            }
        });
    }
    /**
     * Returns the parent group of the subgroup that is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @returns {Observable<Configurator.Group>} Group
     */
    getMenuParentGroup(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            const menuParentGroup = configuration.interactionState.menuParentGroup;
            return menuParentGroup
                ? this.configuratorUtilsService.getOptionalGroupById(configuration.groups, menuParentGroup)
                : undefined;
        }));
    }
    /**
     * Set the parent group, specified by the group ID, which is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID. Can be ommitted, in this case parent group will be cleared, in case we are on root level
     */
    setMenuParentGroup(owner, groupId) {
        this.store.dispatch(new SetMenuParentGroup({
            entityKey: owner.key,
            menuParentGroup: groupId,
        }));
    }
    /**
     * Returns the group that is currently visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group>} Current group
     */
    getCurrentGroup(owner) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService
                .getConfiguration(owner)
                .pipe(map((configuration) => this.configuratorUtilsService.getGroupById(configuration.groups, currentGroupId)));
        }));
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(owner, groupId) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(map((configuration) => this.configuratorGroupStatusService.setGroupStatusVisited(configuration, groupId)), take(1))
            .subscribe();
    }
    /**
     * Navigates to the group, specified by its group ID.
     *
     * @param {Configurator.Configuration}configuration - Configuration
     * @param {string} groupId - Group ID
     * @param {boolean} setStatus - Group status will be set for previous group, default true
     */
    navigateToGroup(configuration, groupId, setStatus = true) {
        if (setStatus) {
            //Set Group status for current group
            this.getCurrentGroup(configuration.owner)
                .pipe(take(1))
                .subscribe((currentGroup) => {
                this.configuratorGroupStatusService.setGroupStatusVisited(configuration, currentGroup.id);
            });
        }
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        this.store.dispatch(new ChangeGroup({
            configuration: configuration,
            groupId: groupId,
            parentGroupId: parentGroup ? parentGroup.id : undefined,
        }));
    }
    /**
     * Returns the group ID of the group that is coming after the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string> | undefined} ID of next group
     */
    getNextGroupId(owner) {
        return this.getNeighboringGroupId(owner, 1);
    }
    /**
     * Returns the group ID of the group that is preceding the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string | undefined >} ID of previous group
     */
    getPreviousGroupId(owner) {
        return this.getNeighboringGroupId(owner, -1);
    }
    /**
     * Verifies whether the group has been visited
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} Has been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
    }
    /**
     * Returns a parent group for the given group.
     *
     * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
     * @param {Configurator.Group} group - Given group
     * @return {Configurator.Group} Parent group or undefined if group is a top-level group
     */
    getParentGroup(groups, group) {
        return this.configuratorUtilsService.getParentGroup(groups, group);
    }
    /**
     * Verifies whether the given group has sub groups.
     *
     * @param {Configurator.Group} group - Given group
     * @return {boolean} Sub groups available?
     */
    hasSubGroups(group) {
        return this.configuratorUtilsService.hasSubGroups(group);
    }
    /**
     * Retrieves a group ID of the neighboring group.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {number} neighboringIndex - Index of neighboring group
     * @return {Observable<string>} group ID of the neighboring group
     */
    getNeighboringGroupId(owner, neighboringIndex) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
                let nextGroup;
                configuration?.flatGroups.forEach((group, index) => {
                    if (group.id === currentGroupId &&
                        configuration?.flatGroups &&
                        configuration?.flatGroups[index + neighboringIndex] //Check if neighboring group exists
                    ) {
                        nextGroup =
                            configuration?.flatGroups[index + neighboringIndex].id;
                    }
                });
                return nextGroup;
            }), take(1));
        }));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return (groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP ||
            groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
}
ConfiguratorGroupsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupsService, deps: [{ token: i1.Store }, { token: ConfiguratorCommonsService }, { token: ConfiguratorUtilsService }, { token: ConfiguratorGroupStatusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: ConfiguratorCommonsService }, { type: ConfiguratorUtilsService }, { type: ConfiguratorGroupStatusService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorStorefrontUtilsService {
    constructor(configuratorGroupsService, windowRef, keyboardFocusService) {
        this.configuratorGroupsService = configuratorGroupsService;
        this.windowRef = windowRef;
        this.keyboardFocusService = keyboardFocusService;
    }
    /**
     * Does the configuration belong to a cart entry, or has the group been visited already?
     * In both cases we need to render indications for mandatory attributes.
     * This method emits only once and then stops further emissions.
     *
     * @param {CommonConfigurator.Owner} owner -
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
     */
    isCartEntryOrGroupVisited(owner, groupId) {
        return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(take(1), map((result) => result ? true : owner.type === CommonConfigurator.OwnerType.CART_ENTRY));
    }
    /**
     * Assemble an attribute value with the currently selected values from a checkbox list.
     *
     * @param {FormControl[]} controlArray - Control array
     * @param {Configurator.Attribute} attribute -  Configuration attribute
     * @return {Configurator.Value[]} - list of configurator values
     */
    assembleValuesForMultiSelectAttributes(controlArray, attribute) {
        const localAssembledValues = [];
        for (let i = 0; i < controlArray.length; i++) {
            const value = attribute.values ? attribute.values[i] : undefined;
            if (value) {
                const localAttributeValue = {
                    valueCode: value.valueCode,
                };
                localAttributeValue.name = value.name;
                localAttributeValue.quantity = value.quantity;
                localAttributeValue.selected = controlArray[i].value;
                localAssembledValues.push(localAttributeValue);
            }
            else {
                if (isDevMode()) {
                    console.warn('ControlArray does not match values, at least one value could not been found');
                }
            }
        }
        return localAssembledValues;
    }
    /**
     * Scrolls to the corresponding HTML element.
     *
     * @param {Element | HTMLElement} element - HTML element
     */
    scroll(element) {
        let topOffset = 0;
        if (element instanceof HTMLElement) {
            topOffset = element.offsetTop;
        }
        this.windowRef.nativeWindow?.scroll(0, topOffset);
    }
    /**
     * Scrolls to the corresponding configuration element in the HTML tree.
     *
     * @param {string} selector - Selector of the HTML element
     */
    scrollToConfigurationElement(selector) {
        if (this.windowRef.isBrowser()) {
            // we don't want to run this logic when doing SSR
            const element = this.getElement(selector);
            if (element) {
                this.scroll(element);
            }
        }
    }
    /**
     * Focus the first attribute in the form.
     */
    focusFirstAttribute() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }
    getFocusableElementById(focusableElements, id) {
        return focusableElements.find((focusableElement) => {
            if (id) {
                if (focusableElement.nodeName.toLocaleLowerCase().indexOf(id) !== -1 ||
                    focusableElement.id.indexOf(id) !== -1) {
                    return focusableElement;
                }
            }
        });
    }
    getFocusableConflictDescription(focusableElements) {
        return this.getFocusableElementById(focusableElements, 'cx-configurator-conflict-description');
    }
    getFocusableElementByValueUiKey(focusableElements, valueUiKey) {
        return this.getFocusableElementById(focusableElements, valueUiKey);
    }
    getFocusableElementByAttributeId(focusableElements, attributeName) {
        return this.getFocusableElementById(focusableElements, attributeName);
    }
    createAttributeValueUiKey(attributeId, valueId) {
        return attributeId + '--' + valueId;
    }
    /**
     * Focus a value in the form.
     *
     * @param {Configurator.Attribute} attribute - Attribute
     */
    focusValue(attribute) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements.length > 0) {
                let foundFocusableElement = this.getFocusableConflictDescription(focusableElements);
                if (!foundFocusableElement) {
                    const selectedValue = attribute.values?.find((value) => value.selected);
                    if (selectedValue) {
                        const valueUiKey = this.createAttributeValueUiKey(attribute.name, selectedValue.valueCode);
                        foundFocusableElement = this.getFocusableElementByValueUiKey(focusableElements, valueUiKey);
                    }
                    if (!foundFocusableElement) {
                        foundFocusableElement = this.getFocusableElementByAttributeId(focusableElements, attribute.name);
                    }
                }
                if (foundFocusableElement) {
                    foundFocusableElement.focus();
                }
            }
        }
    }
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId) {
        if (groupId) {
            return groupId + '-group';
        }
    }
    /**
     * Persist the keyboard focus state for the given key.
     * The focus is stored globally or for the given group.
     *
     * @param {string} key - key
     * @param {string} group? - Group
     */
    setFocus(key, group) {
        if (key) {
            this.keyboardFocusService.set(key, group);
        }
    }
    /**
     * Change styling of element
     *
     * @param querySelector - querySelector
     * @param property - CSS property
     * @param value - CSS value
     */
    changeStyling(querySelector, property, value) {
        const element = this.getElement(querySelector);
        if (element) {
            element.style.setProperty(property, value);
        }
    }
    /**
     * Get HTML element based on querySelector when running in browser
     *
     * @param querySelector - querySelector
     * @returns selected HTML element
     */
    getElement(querySelector) {
        if (this.windowRef.isBrowser()) {
            return this.windowRef.document.querySelector(querySelector);
        }
    }
}
ConfiguratorStorefrontUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorStorefrontUtilsService, deps: [{ token: ConfiguratorGroupsService }, { token: i1$1.WindowRef }, { token: i3.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorStorefrontUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorStorefrontUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorStorefrontUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: ConfiguratorGroupsService }, { type: i1$1.WindowRef }, { type: i3.KeyboardFocusService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAddToCartButtonComponent {
    constructor(routingService, configuratorCommonsService, configuratorCartService, configuratorGroupsService, configRouterExtractorService, globalMessageService, orderHistoryFacade, commonConfiguratorUtilsService, configUtils, intersectionService) {
        this.routingService = routingService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorCartService = configuratorCartService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.globalMessageService = globalMessageService;
        this.orderHistoryFacade = orderHistoryFacade;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
        this.configUtils = configUtils;
        this.intersectionService = intersectionService;
        this.subscription = new Subscription();
        this.container$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })))
            .pipe(switchMap((cont) => this.configuratorCommonsService
            .hasPendingChanges(cont.configuration.owner)
            .pipe(map((hasPendingChanges) => ({
            routerData: cont.routerData,
            configuration: cont.configuration,
            hasPendingChanges,
        })))))));
    }
    ngOnInit() {
        this.makeAddToCartButtonSticky();
    }
    navigateToCart() {
        this.routingService.go('cart');
    }
    navigateToOverview(configuratorType, owner) {
        this.routingService.go({
            cxRoute: 'configureOverview' + configuratorType,
            params: { ownerType: 'cartEntry', entityKey: owner.id },
        });
    }
    displayConfirmationMessage(key) {
        this.globalMessageService.add({ key: key }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    /**
     * Performs the navigation to the corresponding location (cart or overview pages).
     *
     * @param {string} configuratorType - Configurator type
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {boolean} isAdd - Is add to cart
     * @param {boolean} isOverview - Is overview page
     * @param {boolean} showMessage - Show message
     */
    performNavigation(configuratorType, owner, isAdd, isOverview, showMessage) {
        const messageKey = isAdd
            ? 'configurator.addToCart.confirmation'
            : 'configurator.addToCart.confirmationUpdate';
        if (isOverview) {
            this.navigateToCart();
        }
        else {
            this.navigateToOverview(configuratorType, owner);
        }
        if (showMessage) {
            this.displayConfirmationMessage(messageKey);
        }
    }
    /**
     * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
     * need for a cart update, the text will differ
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {string} The resource key that controls the button description
     */
    getButtonResourceKey(routerData, configuration) {
        if (routerData.isOwnerCartEntry &&
            configuration.isCartEntryUpdateRequired) {
            return 'configurator.addToCart.buttonUpdateCart';
        }
        else if (routerData.isOwnerCartEntry &&
            !configuration.isCartEntryUpdateRequired) {
            return 'configurator.addToCart.buttonAfterAddToCart';
        }
        else {
            return 'configurator.addToCart.button';
        }
    }
    /**
     * Triggers action and navigation, both depending on the context. Might result in an addToCart, updateCartEntry,
     * just a cart navigation or a browser back navigation
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     */
    onAddToCart(configuration, routerData) {
        const pageType = routerData.pageType;
        const configuratorType = configuration.owner.configuratorType;
        const isOverview = pageType === ConfiguratorRouter.PageType.OVERVIEW;
        const isOwnerCartEntry = routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY;
        const owner = configuration.owner;
        const currentGroup = configuration.interactionState.currentGroup;
        if (currentGroup) {
            this.configuratorGroupsService.setGroupStatusVisited(configuration.owner, currentGroup);
        }
        this.container$
            .pipe(filter((cont) => !cont.hasPendingChanges), take(1))
            .subscribe(() => {
            if (isOwnerCartEntry) {
                if (configuration.isCartEntryUpdateRequired) {
                    this.configuratorCartService.updateCartEntry(configuration);
                }
                this.performNavigation(configuratorType, owner, false, isOverview, configuration.isCartEntryUpdateRequired ?? false);
                //Only remove if we are on configuration page, because on final cart navigation,
                //the configuration will anyhow be removed
                if (configuration.isCartEntryUpdateRequired && !isOverview) {
                    this.configuratorCommonsService.removeConfiguration(owner);
                }
            }
            else {
                this.configuratorCartService.addToCart(owner.id, configuration.configId, owner);
                this.configuratorCommonsService
                    .getConfiguration(owner)
                    .pipe(filter((configWithNextOwner) => configWithNextOwner.nextOwner !== undefined), take(1))
                    .subscribe((configWithNextOwner) => {
                    //See preceeding filter operator: configWithNextOwner.nextOwner is always defined here
                    const nextOwner = configWithNextOwner.nextOwner ??
                        ConfiguratorModelUtils.createInitialOwner();
                    this.performNavigation(configuratorType, nextOwner, true, isOverview, true);
                    // we clean up the cart entry related configuration, as we might have a
                    // configuration for the same cart entry number stored already.
                    // (Cart entries might have been deleted)
                    // Needs to happen only if we are on configuration page, navigation to
                    // cart will anyhow delete
                    // we do not clean up the product bound configuration yet, as existing
                    // observables would instantly trigger a re-create.
                    // Cleaning up this obsolete product bound configuration will only happen
                    // when a new config form requests a new observable for a product bound
                    // configuration
                    if (!isOverview) {
                        this.configuratorCommonsService.removeConfiguration(nextOwner);
                    }
                });
            }
        });
    }
    leaveConfigurationOverview() {
        this.container$.pipe(take(1)).subscribe((container) => {
            if (container.routerData.owner.type ===
                CommonConfigurator.OwnerType.ORDER_ENTRY) {
                this.goToOrderDetails(container.routerData.owner);
            }
            else {
                this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
            }
        });
    }
    goToOrderDetails(owner) {
        this.orderHistoryFacade.loadOrderDetails(this.commonConfiguratorUtilsService.decomposeOwnerId(owner.id).documentId);
        this.orderHistoryFacade
            .getOrderDetails()
            .pipe(filter((order) => order !== undefined), take(1))
            .subscribe((order) => this.routingService.go({ cxRoute: 'orderDetails', params: order }));
    }
    extractConfigPrices(configuration) {
        let priceSummary = configuration.priceSummary;
        let basePrice = priceSummary?.basePrice?.formattedValue;
        let selectedOptions = priceSummary?.selectedOptions?.formattedValue;
        let totalPrice = priceSummary?.currentTotal?.formattedValue;
        let prices = {
            basePrice: basePrice,
            selectedOptions: selectedOptions,
            totalPrice: totalPrice,
        };
        if (!basePrice || basePrice === '-') {
            prices.basePrice = '0';
        }
        if (!selectedOptions || selectedOptions === '-') {
            prices.selectedOptions = '0';
        }
        if (!totalPrice || totalPrice === '-') {
            prices.totalPrice = '0';
        }
        return prices;
    }
    makeAddToCartButtonSticky() {
        const options = { rootMargin: '0px 0px -100px 0px' };
        this.subscription.add(this.container$
            .pipe(take(1), delay(0), map(() => this.configUtils.getElement('.cx-price-summary-container')), switchMap((priceSummary) => priceSummary
            ? this.intersectionService.isIntersecting(priceSummary, options)
            : of(undefined)), filter((isIntersecting) => isIntersecting !== undefined))
            .subscribe((isIntersecting) => {
            if (isIntersecting) {
                this.configUtils.changeStyling('cx-configurator-add-to-cart-button', 'position', 'sticky');
            }
            else {
                this.configUtils.changeStyling('cx-configurator-add-to-cart-button', 'position', 'fixed');
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorAddToCartButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonComponent, deps: [{ token: i1$1.RoutingService }, { token: ConfiguratorCommonsService }, { token: ConfiguratorCartService }, { token: ConfiguratorGroupsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i1$1.GlobalMessageService }, { token: i6.OrderHistoryFacade }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorStorefrontUtilsService }, { token: i3.IntersectionService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAddToCartButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAddToCartButtonComponent, selector: "cx-configurator-add-to-cart-button", ngImport: i0, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <ng-container *ngIf=\"!container.routerData.displayOnly; else displayOnly\">\n    <div class=\"cx-add-to-cart-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n        (click)=\"onAddToCart(container.configuration, container.routerData)\"\n        [attr.aria-label]=\"\n          (getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate) +\n          ' ' +\n          ('configurator.a11y.addToCartPrices'\n            | cxTranslate: extractConfigPrices(container.configuration))\n        \"\n      >\n        {{\n          getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate\n        }}\n      </button>\n    </div>\n  </ng-container>\n  <ng-template #displayOnly>\n    <div class=\"cx-display-only-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-display-only-btn\"\n        (click)=\"leaveConfigurationOverview()\"\n      >\n        {{ 'configurator.addToCart.buttonDisplayOnly' | cxTranslate }}\n      </button>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-add-to-cart-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <ng-container *ngIf=\"!container.routerData.displayOnly; else displayOnly\">\n    <div class=\"cx-add-to-cart-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n        (click)=\"onAddToCart(container.configuration, container.routerData)\"\n        [attr.aria-label]=\"\n          (getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate) +\n          ' ' +\n          ('configurator.a11y.addToCartPrices'\n            | cxTranslate: extractConfigPrices(container.configuration))\n        \"\n      >\n        {{\n          getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate\n        }}\n      </button>\n    </div>\n  </ng-container>\n  <ng-template #displayOnly>\n    <div class=\"cx-display-only-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-display-only-btn\"\n        (click)=\"leaveConfigurationOverview()\"\n      >\n        {{ 'configurator.addToCart.buttonDisplayOnly' | cxTranslate }}\n      </button>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }, { type: ConfiguratorCommonsService }, { type: ConfiguratorCartService }, { type: ConfiguratorGroupsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i1$1.GlobalMessageService }, { type: i6.OrderHistoryFacade }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorStorefrontUtilsService }, { type: i3.IntersectionService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAddToCartButtonModule {
}
ConfiguratorAddToCartButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAddToCartButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, declarations: [ConfiguratorAddToCartButtonComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorAddToCartButtonComponent] });
ConfiguratorAddToCartButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorAddToCartButton: {
                    component: ConfiguratorAddToCartButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorAddToCartButton: {
                                    component: ConfiguratorAddToCartButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAddToCartButtonComponent],
                    exports: [ConfiguratorAddToCartButtonComponent],
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
/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */
class ConfiguratorAttributeBaseComponent {
    /**
     * Creates unique key for config value on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     * @param valueId
     */
    createValueUiKey(prefix, attributeId, valueId) {
        return (this.createAttributeUiKey(prefix, attributeId) +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            valueId);
    }
    /**
     * Creates unique key for config value to be sent to configurator
     * @param currentAttribute
     * @param value
     */
    createAttributeValueIdForConfigurator(currentAttribute, value) {
        return this.createValueUiKey(this.getUiType(currentAttribute), currentAttribute.name, value);
    }
    getUiType(attribute) {
        return attribute.uiType
            ? attribute.uiType
            : Configurator.UiType.NOT_IMPLEMENTED;
    }
    /**
     * Creates unique key for config attribute on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     */
    createAttributeUiKey(prefix, attributeId) {
        return (ConfiguratorAttributeBaseComponent.PREFIX +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            prefix +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            attributeId);
    }
    /**
     * Creates unique key for config attribute to be sent to configurator
     * @param currentAttribute
     */
    createAttributeIdForConfigurator(currentAttribute) {
        return this.createAttributeUiKey(this.getUiType(currentAttribute), currentAttribute.name);
    }
    /**
     * Creates unique key for attribute 'aria-labelledby'
     * @param prefix
     * @param attributeId
     * @param valueId
     * @param hasQuantity
     */
    createAriaLabelledBy(prefix, attributeId, valueId, hasQuantity) {
        let attributeUiKey = this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_LABEL, attributeId);
        if (valueId) {
            attributeUiKey +=
                ' ' +
                    this.createAttributeUiKey(prefix, attributeId) +
                    ConfiguratorAttributeBaseComponent.SEPERATOR +
                    valueId +
                    ' ';
            if (typeof hasQuantity === 'boolean' && !hasQuantity) {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
            else {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
        }
        return attributeUiKey;
    }
    /**
     * Creates a unique key for focus handling for the given attribute and value
     * @param attributeId
     * @param valueCode
     * @returns focus key
     */
    createFocusId(attributeId, valueCode) {
        return `${attributeId}--${valueCode}--focus`;
    }
    /**
     * Get code from attribute.
     * The code is not a mandatory attribute (since not available for VC flavour),
     * still it is mandatory in the context of CPQ. Calling this method therefore only
     * makes sense when CPQ is active. In case the method is called in the wrong context, an exception will
     * be thrown
     *
     * @param {Configurator.Attribute} Attribute
     * @returns {number} Attribute code
     */
    getAttributeCode(attribute) {
        const code = attribute.attrCode;
        if (code) {
            return code;
        }
        else {
            throw new Error('No attribute code for: ' + attribute.name);
        }
    }
    /**
     * Checks if attribute type allows additional values
     * @param attribute Attribute
     * @returns true if attribute type allows to enter additional values
     */
    isWithAdditionalValues(attribute) {
        const uiType = attribute.uiType;
        return (uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT);
    }
}
ConfiguratorAttributeBaseComponent.SEPERATOR = '--';
ConfiguratorAttributeBaseComponent.PREFIX = 'cx-configurator';
ConfiguratorAttributeBaseComponent.PREFIX_LABEL = 'label';
ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeFooterComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils) {
        super();
        this.configUtils = configUtils;
        this.iconType = ICON_TYPE;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute is a
         * free input field
         */
        this.showRequiredMessageForUserInput$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => (result ? this.needsUserInputMessage() : false)));
    }
    /**
     * Checks if attribute is a user input typed attribute with empty value.
     * Method will return false for domain based attributes
     * @param {string} input - user input
     */
    isUserInputEmpty(input) {
        return input !== undefined && (!input.trim() || 0 === input.length);
    }
    needsUserInputMessage() {
        const uiType = this.attribute.uiType;
        const needsMessage = this.attribute.required &&
            this.attribute.incomplete &&
            (uiType === Configurator.UiType.STRING ||
                uiType === Configurator.UiType.NUMERIC) &&
            this.isUserInputEmpty(this.attribute.userInput);
        return needsMessage ?? false;
    }
}
ConfiguratorAttributeFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeFooterComponent, selector: "cx-configurator-attribute-footer", inputs: { attribute: "attribute", owner: "owner", groupId: "groupId" }, usesInheritance: true, ngImport: i0, template: "<div\n  *ngIf=\"showRequiredMessageForUserInput$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"\n    'configurator.attribute.defaultRequiredMessage' | cxTranslate\n  \"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"showRequiredMessageForUserInput$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"\n    'configurator.attribute.defaultRequiredMessage' | cxTranslate\n  \"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }]; }, propDecorators: { attribute: [{
                type: Input
            }], owner: [{
                type: Input
            }], groupId: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeFooterModule {
}
ConfiguratorAttributeFooterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeFooterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterModule, declarations: [ConfiguratorAttributeFooterComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule], exports: [ConfiguratorAttributeFooterComponent] });
ConfiguratorAttributeFooterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterModule, imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeFooterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                    ],
                    declarations: [ConfiguratorAttributeFooterComponent],
                    exports: [ConfiguratorAttributeFooterComponent],
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
class RulebasedConfiguratorAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
//Not provided in root, as this would break lazy loading
class RulebasedConfiguratorConnector {
    constructor(adapters, configUtilsService) {
        this.adapters = adapters;
        this.configUtilsService = configUtilsService;
    }
    createConfiguration(owner) {
        return this.getAdapter(owner.configuratorType).createConfiguration(owner);
    }
    readConfiguration(configId, groupId, configurationOwner) {
        return this.getAdapter(configurationOwner.configuratorType).readConfiguration(configId, groupId, configurationOwner);
    }
    updateConfiguration(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).updateConfiguration(configuration);
    }
    addToCart(parameters) {
        return this.getAdapter(parameters.owner.configuratorType).addToCart(parameters);
    }
    readConfigurationForCartEntry(parameters) {
        return this.getAdapter(parameters.owner.configuratorType).readConfigurationForCartEntry(parameters);
    }
    updateConfigurationForCartEntry(parameters) {
        return this.getAdapter(parameters.configuration.owner.configuratorType).updateConfigurationForCartEntry(parameters);
    }
    readConfigurationForOrderEntry(parameters) {
        return this.getAdapter(parameters.owner.configuratorType).readConfigurationForOrderEntry(parameters);
    }
    readPriceSummary(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).readPriceSummary(configuration);
    }
    getConfigurationOverview(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).getConfigurationOverview(configuration.configId);
    }
    getAdapter(configuratorType) {
        const adapterResult = this.adapters.find((adapter) => adapter.getConfiguratorType() === configuratorType);
        if (adapterResult) {
            return adapterResult;
        }
        else {
            throw new Error('No adapter found for configurator type: ' + configuratorType);
        }
    }
}
RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST = new InjectionToken('ConfiguratorAdapterList');
RulebasedConfiguratorConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorConnector, deps: [{ token: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST }, { token: i2$1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
RulebasedConfiguratorConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST]
                }] }, { type: i2$1.CommonConfiguratorUtilsService }]; } });

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
class ConfiguratorRouterListener {
    constructor(configuratorCartService, routingService) {
        this.configuratorCartService = configuratorCartService;
        this.routingService = routingService;
        this.subscription = new Subscription();
        this.observeRouterChanges();
    }
    observeRouterChanges() {
        this.subscription.add(this.routingService.getRouterState().subscribe((routerState) => {
            if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
                this.configuratorCartService.removeCartBoundConfigurations();
            }
        }));
    }
    isConfiguratorRelatedRoute(semanticRoute) {
        return semanticRoute ? semanticRoute.includes('configure') : false;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorRouterListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterListener, deps: [{ token: ConfiguratorCartService }, { token: i1$1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterListener, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCartService }, { type: i1$1.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorRouterModule {
    constructor(_configuratorRouterListener) {
        // Intentional empty constructor
    }
}
ConfiguratorRouterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterModule, deps: [{ token: ConfiguratorRouterListener }], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorRouterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterModule });
ConfiguratorRouterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorRouterModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: ConfiguratorRouterListener }]; } });

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

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
class ConfiguratorBasicEffectService {
    /**
     * Finds first group with attributes for a configuration. Throws error if such a group does not exist,
     * as this is an illegal state
     * @param configuration
     * @returns Group id
     */
    getFirstGroupWithAttributes(configuration) {
        const id = this.getFirstGroupWithAttributesForList(configuration.groups);
        if (id) {
            return id;
        }
        else {
            throw new Error('Configuration does not have any attributes');
        }
    }
    /**
     * Finds first group with attributes in a list of groups
     * @param groups
     * @returns Group or undefined if such a group does not exist
     */
    getFirstGroupWithAttributesForList(groups) {
        const groupWithAttributes = groups
            .filter((currentGroup) => currentGroup.attributes && currentGroup.attributes.length > 0)
            .pop();
        let id;
        if (groupWithAttributes) {
            id = groupWithAttributes.id;
        }
        else {
            id = groups
                .filter((currentGroup) => currentGroup.subGroups && currentGroup.subGroups.length > 0)
                .flatMap((currentGroup) => this.getFirstGroupWithAttributesForList(currentGroup.subGroups))
                .filter((groupId) => groupId) //Filter undefined strings
                .pop();
        }
        return id;
    }
}
ConfiguratorBasicEffectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffectService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorBasicEffectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffectService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Common configurator effects, used for complex configurators like variant configurator
 * and CPQ
 */
class ConfiguratorBasicEffects {
    constructor(actions$, configuratorCommonsConnector, commonConfigUtilsService, configuratorGroupUtilsService, configuratorGroupStatusService, store, configuratorBasicEffectService) {
        this.actions$ = actions$;
        this.configuratorCommonsConnector = configuratorCommonsConnector;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorGroupUtilsService = configuratorGroupUtilsService;
        this.configuratorGroupStatusService = configuratorGroupStatusService;
        this.store = store;
        this.configuratorBasicEffectService = configuratorBasicEffectService;
        this.createConfiguration$ = createEffect(() => this.actions$.pipe(ofType(CREATE_CONFIGURATION), mergeMap((action) => {
            return this.configuratorCommonsConnector
                .createConfiguration(action.payload)
                .pipe(switchMap((configuration) => {
                const currentGroup = this.configuratorBasicEffectService.getFirstGroupWithAttributes(configuration);
                this.store.dispatch(new UpdatePriceSummary({
                    ...configuration,
                    interactionState: { currentGroup: currentGroup },
                }));
                return [
                    new CreateConfigurationSuccess(configuration),
                ];
            }), catchError((error) => [
                new CreateConfigurationFail({
                    ownerKey: action.payload.key,
                    error: normalizeHttpError(error),
                }),
            ]));
        })));
        this.readConfiguration$ = createEffect(() => this.actions$.pipe(ofType(READ_CONFIGURATION), mergeMap((action) => {
            return this.configuratorCommonsConnector
                .readConfiguration(action.payload.configuration.configId, action.payload.groupId, action.payload.configuration.owner)
                .pipe(switchMap((configuration) => {
                return [
                    new ReadConfigurationSuccess(configuration),
                ];
            }), catchError((error) => [
                new ReadConfigurationFail({
                    ownerKey: action.payload.configuration.owner.key,
                    error: normalizeHttpError(error),
                }),
            ]));
        })));
        this.updateConfiguration$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION), map((action) => action.payload), 
        //mergeMap here as we need to process each update
        //(which only sends one changed attribute at a time),
        //so we must not cancel inner emissions
        mergeMap((payload) => {
            return this.configuratorCommonsConnector
                .updateConfiguration(payload)
                .pipe(map((configuration) => {
                return new UpdateConfigurationSuccess(configuration);
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error);
                return [
                    new UpdateConfigurationFail({
                        configuration: payload,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.updatePriceSummary$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_PRICE_SUMMARY), map((action) => action.payload), mergeMap((payload) => {
            return this.configuratorCommonsConnector.readPriceSummary(payload).pipe(map((configuration) => {
                return new UpdatePriceSummarySuccess(configuration);
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error);
                return [
                    new UpdatePriceSummaryFail({
                        ownerKey: payload.owner.key,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.getOverview$ = createEffect(() => this.actions$.pipe(ofType(GET_CONFIGURATION_OVERVIEW), map((action) => action.payload), mergeMap((payload) => {
            return this.configuratorCommonsConnector
                .getConfigurationOverview(payload)
                .pipe(map((overview) => {
                return new GetConfigurationOverviewSuccess({
                    ownerKey: payload.owner.key,
                    overview: overview,
                });
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error);
                return [
                    new GetConfigurationOverviewFail({
                        ownerKey: payload.owner.key,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.updateConfigurationSuccess$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_SUCCESS), map((action) => action.payload), mergeMap((payload) => {
            return this.store.pipe(select(hasPendingChanges(payload.owner.key)), take(1), filter((hasPendingChanges) => hasPendingChanges === false), switchMapTo(this.store.pipe(select(getCurrentGroup(payload.owner.key)), take(1), map((currentGroupId) => {
                const groupIdFromPayload = this.configuratorBasicEffectService.getFirstGroupWithAttributes(payload);
                const parentGroupFromPayload = this.configuratorGroupUtilsService.getParentGroup(payload.groups, this.configuratorGroupUtilsService.getGroupById(payload.groups, groupIdFromPayload), undefined);
                return {
                    currentGroupId,
                    groupIdFromPayload,
                    parentGroupFromPayload,
                };
            }), switchMap((container) => {
                //changeGroup because in cases where a queue of updates exists with a group navigation in between,
                //we need to ensure that the last update determines the current group.
                const updateFinalizeSuccessAction = new UpdateConfigurationFinalizeSuccess(payload);
                const updatePriceSummaryAction = new UpdatePriceSummary({
                    ...payload,
                    interactionState: {
                        currentGroup: container.groupIdFromPayload,
                    },
                });
                return container.currentGroupId === container.groupIdFromPayload
                    ? [updateFinalizeSuccessAction, updatePriceSummaryAction]
                    : [
                        updateFinalizeSuccessAction,
                        updatePriceSummaryAction,
                        new ChangeGroup({
                            configuration: payload,
                            groupId: container.groupIdFromPayload,
                            parentGroupId: container.parentGroupFromPayload?.id,
                        }),
                    ];
            }))));
        })));
        this.updateConfigurationFail$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_FAIL), map((action) => action.payload), mergeMap((payload) => {
            return this.store.pipe(select(hasPendingChanges(payload.configuration.owner.key)), take(1), filter((hasPendingChanges) => hasPendingChanges === false), map(() => new UpdateConfigurationFinalizeFail(payload.configuration)));
        })));
        this.handleErrorOnUpdate$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_FINALIZE_FAIL), map((action) => action.payload), map((payload) => new ReadConfiguration({
            configuration: payload,
            groupId: this.configuratorBasicEffectService.getFirstGroupWithAttributes(payload),
        }))));
        this.groupChange$ = createEffect(() => this.actions$.pipe(ofType(CHANGE_GROUP), switchMap((action) => {
            return this.store.pipe(select(hasPendingChanges(action.payload.configuration.owner.key)), take(1), filter((hasPendingChanges) => hasPendingChanges === false), switchMap(() => {
                return this.configuratorCommonsConnector
                    .readConfiguration(action.payload.configuration.configId, action.payload.groupId, action.payload.configuration.owner)
                    .pipe(switchMap((configuration) => {
                    return [
                        new SetCurrentGroup({
                            entityKey: action.payload.configuration.owner.key,
                            currentGroup: action.payload.groupId,
                        }),
                        new SetMenuParentGroup({
                            entityKey: action.payload.configuration.owner.key,
                            menuParentGroup: action.payload.parentGroupId,
                        }),
                        new ReadConfigurationSuccess(configuration),
                        new UpdatePriceSummary({
                            ...configuration,
                            interactionState: {
                                currentGroup: action.payload.groupId,
                            },
                        }),
                    ];
                }), catchError((error) => [
                    new ReadConfigurationFail({
                        ownerKey: action.payload.configuration.owner.key,
                        error: normalizeHttpError(error),
                    }),
                ]));
            }));
        })));
    }
}
ConfiguratorBasicEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffects, deps: [{ token: i1$2.Actions }, { token: RulebasedConfiguratorConnector }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorUtilsService }, { token: ConfiguratorGroupStatusService }, { token: i1.Store }, { token: ConfiguratorBasicEffectService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorBasicEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorBasicEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: RulebasedConfiguratorConnector }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorUtilsService }, { type: ConfiguratorGroupStatusService }, { type: i1.Store }, { type: ConfiguratorBasicEffectService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND = 'Entry number is required in addToCart response';
/**
 * Common configurator effects related to cart handling
 */
class ConfiguratorCartEffects {
    constructor(actions$, configuratorCommonsConnector, commonConfigUtilsService, configuratorGroupUtilsService, store) {
        this.actions$ = actions$;
        this.configuratorCommonsConnector = configuratorCommonsConnector;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorGroupUtilsService = configuratorGroupUtilsService;
        this.store = store;
        this.addToCart$ = createEffect(() => this.actions$.pipe(ofType(ADD_TO_CART), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorCommonsConnector.addToCart(payload).pipe(switchMap((entry) => {
                const entryNumber = entry.entry?.entryNumber;
                if (entryNumber === undefined) {
                    throw Error(ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND);
                }
                else {
                    return [
                        new AddNextOwner({
                            ownerKey: payload.owner.key,
                            cartEntryNo: entryNumber.toString(),
                        }),
                        new CartActions.CartAddEntrySuccess({
                            ...entry,
                            userId: payload.userId,
                            cartId: payload.cartId,
                            productCode: payload.productCode,
                            quantity: payload.quantity,
                            deliveryModeChanged: entry.deliveryModeChanged,
                            entry: entry.entry,
                            quantityAdded: entry.quantityAdded,
                            statusCode: entry.statusCode,
                            statusMessage: entry.statusMessage,
                        }),
                    ];
                }
            }), catchError((error) => of(new CartActions.CartAddEntryFail({
                userId: payload.userId,
                cartId: payload.cartId,
                productCode: payload.productCode,
                quantity: payload.quantity,
                error: error instanceof HttpErrorResponse
                    ? normalizeHttpError(error)
                    : error,
            }))));
        })));
        this.updateCartEntry$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CART_ENTRY), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorCommonsConnector
                .updateConfigurationForCartEntry(payload)
                .pipe(switchMap((cartModification) => {
                return [
                    new CartActions.CartUpdateEntrySuccess({
                        userId: payload.userId,
                        cartId: payload.cartId,
                        entryNumber: payload.cartEntryNumber,
                        quantity: cartModification.quantity,
                    }),
                ];
            }), catchError((error) => of(new CartActions.CartUpdateEntryFail({
                userId: payload.userId,
                cartId: payload.cartId,
                entryNumber: payload.cartEntryNumber,
                error: normalizeHttpError(error),
            }))));
        })));
        this.readConfigurationForCartEntry$ = createEffect(() => this.actions$.pipe(ofType(READ_CART_ENTRY_CONFIGURATION), switchMap((action) => {
            const parameters = action.payload;
            return this.configuratorCommonsConnector
                .readConfigurationForCartEntry(parameters)
                .pipe(switchMap((result) => [
                new ReadCartEntryConfigurationSuccess(result),
                new UpdatePriceSummary(result),
            ]), catchError((error) => [
                new ReadCartEntryConfigurationFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error),
                }),
            ]));
        })));
        this.readConfigurationForOrderEntry$ = createEffect(() => this.actions$.pipe(ofType(READ_ORDER_ENTRY_CONFIGURATION), switchMap((action) => {
            const parameters = action.payload;
            return this.configuratorCommonsConnector
                .readConfigurationForOrderEntry(parameters)
                .pipe(switchMap((result) => [
                new ReadOrderEntryConfigurationSuccess(result),
            ]), catchError((error) => [
                new ReadOrderEntryConfigurationFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error),
                }),
            ]));
        })));
        this.removeCartBoundConfigurations$ = createEffect(() => this.actions$.pipe(ofType(REMOVE_CART_BOUND_CONFIGURATIONS), switchMap(() => {
            return this.store.pipe(select(getConfigurationsState), take(1), map((configuratorState) => {
                const entities = configuratorState.configurations.entities;
                const ownerKeysToRemove = [];
                const ownerKeysProductBound = [];
                for (const ownerKey in entities) {
                    if (ownerKey.includes(CommonConfigurator.OwnerType.CART_ENTRY)) {
                        ownerKeysToRemove.push(ownerKey);
                    }
                    else if (ownerKey.includes(CommonConfigurator.OwnerType.PRODUCT)) {
                        ownerKeysProductBound.push(ownerKey);
                    }
                }
                ownerKeysProductBound.forEach((ownerKey) => {
                    const configuration = entities[ownerKey];
                    if (configuration.value?.nextOwner !== undefined) {
                        ownerKeysToRemove.push(ownerKey);
                    }
                });
                return new RemoveConfiguration({
                    ownerKey: ownerKeysToRemove,
                });
            }));
        })));
        this.addOwner$ = createEffect(() => this.actions$.pipe(ofType(ADD_NEXT_OWNER), switchMap((action) => {
            return this.store.pipe(select(getConfigurationFactory(action.payload.ownerKey)), take(1), switchMap((configuration) => {
                const newOwner = ConfiguratorModelUtils.createOwner(CommonConfigurator.OwnerType.CART_ENTRY, action.payload.cartEntryNo);
                this.commonConfigUtilsService.setOwnerKey(newOwner);
                return [
                    new SetNextOwnerCartEntry({
                        configuration: configuration,
                        cartEntryNo: action.payload.cartEntryNo,
                    }),
                    new SetInteractionState({
                        entityKey: newOwner.key,
                        interactionState: configuration.interactionState,
                    }),
                ];
            }));
        })));
    }
}
ConfiguratorCartEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartEffects, deps: [{ token: i1$2.Actions }, { token: RulebasedConfiguratorConnector }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorUtilsService }, { token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: RulebasedConfiguratorConnector }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorUtilsService }, { type: i1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ConfiguratorEffects = [
    ConfiguratorBasicEffects,
    ConfiguratorCartEffects,
];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorStateUtils {
    static mergeGroupsWithSupplements(groups, attributeSupplements) {
        const mergedGroups = [];
        groups.forEach((group) => mergedGroups.push(this.mergeGroupWithSupplements(group, attributeSupplements)));
        return mergedGroups;
    }
    static mergeGroupWithSupplements(group, attributeSupplements) {
        if (this.isTargetGroup(group, attributeSupplements)) {
            return this.mergeTargetGroupWithSupplements(group, attributeSupplements);
        }
        else {
            return {
                ...group,
                subGroups: this.mergeGroupsWithSupplements(group.subGroups, attributeSupplements),
            };
        }
    }
    static mergeTargetGroupWithSupplements(group, attributeSupplements) {
        let mergedAttributes = group.attributes;
        attributeSupplements.forEach((attributeSupplement) => {
            const attributeName = ConfiguratorStateUtils.getAttributeName(attributeSupplement.attributeUiKey);
            mergedAttributes = this.updateArrayElement(mergedAttributes, (attribute) => attribute.name === attributeName, (attribute) => {
                return {
                    ...attribute,
                    values: this.mergeValuesWithSupplement(attribute.values, attributeSupplement),
                };
            });
        });
        return {
            ...group,
            attributes: mergedAttributes,
        };
    }
    static mergeValuesWithSupplement(attributeValues, attributeSupplement) {
        let mergedValues = attributeValues;
        attributeSupplement.valueSupplements.forEach((valueSupplement) => {
            mergedValues = this.updateArrayElement(mergedValues, (value) => value.valueCode === valueSupplement.attributeValueKey, (value) => {
                return {
                    ...value,
                    valuePrice: valueSupplement.priceValue,
                };
            });
        });
        return mergedValues;
    }
    static isTargetGroup(group, attributeSupplements) {
        const firstSupplement = attributeSupplements[0];
        if (firstSupplement) {
            const attributeName = ConfiguratorStateUtils.getAttributeName(firstSupplement.attributeUiKey);
            const attributeUiKey = ConfiguratorStateUtils.getKey(firstSupplement.attributeUiKey, attributeName);
            return group.id.indexOf(attributeUiKey) >= 0;
        }
        else {
            // that should never happen, as we merge existing groups
            // with supplements only if supplements are available
            throw new Error('We expect at least one attribute supplement');
        }
    }
    /**
     * It searches in the given `array` for the first element satisfying the `predicate` function.
     * Then it returns a fresh array, where this element is replaced with the result of the `projection` function.
     *
     * If no element of the `array` satisfied the `predicate`, it returns the original `array`.
     */
    static updateArrayElement(array, predicate, projection) {
        if (array) {
            const index = array.findIndex(predicate);
            if (index === -1) {
                return array;
            }
            const value = array[index];
            const newValue = projection(value, index);
            const newArray = [...array];
            newArray[index] = newValue;
            return newArray;
        }
    }
    static getAttributeName(attributeUiKey) {
        const lastIndexOf = attributeUiKey.lastIndexOf('@');
        return attributeUiKey.slice(lastIndexOf + 1);
    }
    static getKey(key, name) {
        return key.replace('@' + name, '');
    }
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = {
    configId: '',
    productCode: '',
    groups: [],
    flatGroups: [],
    interactionState: {
        currentGroup: undefined,
        groupsVisited: {},
        menuParentGroup: undefined,
    },
    owner: ConfiguratorModelUtils.createInitialOwner(),
};
const initialStatePendingChanges = 0;
function configuratorReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONFIGURATION_FINALIZE_SUCCESS: {
            const result = takeOverChanges(action, state);
            result.isCartEntryUpdateRequired = true;
            result.overview = undefined;
            return result;
        }
        case UPDATE_CART_ENTRY: {
            const result = { ...state };
            result.isCartEntryUpdateRequired = false;
            return result;
        }
        case CREATE_CONFIGURATION_SUCCESS:
        case READ_CONFIGURATION_SUCCESS:
        case READ_CART_ENTRY_CONFIGURATION_SUCCESS: {
            return setInitialCurrentGroup(takeOverChanges(action, state));
        }
        case UPDATE_PRICE_SUMMARY_SUCCESS: {
            return setInitialCurrentGroup(takeOverPricingChanges(action, state));
        }
        case GET_CONFIGURATION_OVERVIEW_SUCCESS: {
            const content = { ...action.payload.overview };
            const result = {
                ...state,
                overview: content,
                priceSummary: content.priceSummary,
                interactionState: {
                    ...state.interactionState,
                    issueNavigationDone: false,
                },
            };
            return result;
        }
        case READ_ORDER_ENTRY_CONFIGURATION_SUCCESS: {
            const configuration = { ...action.payload };
            const result = {
                ...state,
                ...configuration,
                priceSummary: configuration.overview?.priceSummary,
            };
            return result;
        }
        case SET_NEXT_OWNER_CART_ENTRY: {
            const content = { ...action.payload.configuration };
            content.nextOwner = ConfiguratorModelUtils.createOwner(CommonConfigurator.OwnerType.CART_ENTRY, action.payload.cartEntryNo);
            const result = {
                ...state,
                ...content,
            };
            return result;
        }
        case SET_INTERACTION_STATE: {
            const newInteractionState = action.payload.interactionState;
            return {
                ...state,
                interactionState: newInteractionState,
            };
        }
        case SET_CURRENT_GROUP: {
            const newCurrentGroup = action.payload.currentGroup;
            return {
                ...state,
                interactionState: {
                    ...state.interactionState,
                    currentGroup: newCurrentGroup,
                },
            };
        }
        case SET_MENU_PARENT_GROUP: {
            const newMenuParentGroup = action.payload.menuParentGroup;
            return {
                ...state,
                interactionState: {
                    ...state.interactionState,
                    menuParentGroup: newMenuParentGroup,
                },
            };
        }
        case SET_GROUPS_VISITED: {
            const groupIds = action.payload.visitedGroups;
            const changedInteractionState = {
                groupsVisited: {},
            };
            //Set Current state items
            if (state.interactionState.groupsVisited) {
                Object.keys(state.interactionState.groupsVisited).forEach((groupId) => setGroupsVisited(changedInteractionState, groupId));
            }
            //Add new Groups
            groupIds.forEach((groupId) => setGroupsVisited(changedInteractionState, groupId));
            return {
                ...state,
                interactionState: {
                    ...state.interactionState,
                    groupsVisited: changedInteractionState.groupsVisited,
                },
            };
        }
    }
    return state;
}
function setGroupsVisited(changedInteractionState, groupId) {
    const groupsVisited = changedInteractionState.groupsVisited;
    if (groupsVisited) {
        groupsVisited[groupId] = true;
    }
}
function setInitialCurrentGroup(state) {
    if (state.interactionState.currentGroup) {
        return state;
    }
    let initialCurrentGroup;
    const flatGroups = state.flatGroups;
    if (flatGroups && flatGroups.length > 0) {
        initialCurrentGroup = flatGroups[0]?.id;
    }
    const result = {
        ...state,
        interactionState: {
            ...state.interactionState,
            currentGroup: initialCurrentGroup,
        },
    };
    return result;
}
function takeOverChanges(action, state) {
    const content = { ...action.payload };
    const groups = content.groups.length > 0 ? content.groups : state.groups;
    const result = {
        ...state,
        ...content,
        groups: groups,
        interactionState: {
            ...state.interactionState,
            ...content.interactionState,
            issueNavigationDone: true,
        },
    };
    return result;
}
function takeOverPricingChanges(action, state) {
    const content = { ...action.payload };
    const priceSupplements = content.priceSupplements;
    const groups = priceSupplements && priceSupplements.length > 0
        ? ConfiguratorStateUtils.mergeGroupsWithSupplements(state.groups, priceSupplements)
        : state.groups;
    const result = {
        ...state,
        ...content,
        groups: groups,
        interactionState: {
            ...state.interactionState,
            ...content.interactionState,
            issueNavigationDone: true,
        },
    };
    return result;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getConfiguratorReducers() {
    return {
        // @ts-ignore TODO (#12620)
        configurations: StateUtils.entityProcessesLoaderReducer(CONFIGURATOR_DATA, 
        // @ts-ignore TODO (#12620)
        configuratorReducer),
    };
}
const configuratorReducerToken = new InjectionToken('ConfiguratorReducers');
const configuratorReducerProvider = {
    provide: configuratorReducerToken,
    useFactory: getConfiguratorReducers,
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RulebasedConfiguratorStateModule {
}
RulebasedConfiguratorStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorStateModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i1$2.EffectsFeatureModule] });
RulebasedConfiguratorStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorStateModule, providers: [configuratorReducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
        EffectsModule.forFeature(ConfiguratorEffects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorStateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
                        EffectsModule.forFeature(ConfiguratorEffects),
                    ],
                    providers: [configuratorReducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
class RulebasedConfiguratorCoreModule {
}
RulebasedConfiguratorCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
RulebasedConfiguratorCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, providers: [RulebasedConfiguratorConnector], imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule],
                    providers: [RulebasedConfiguratorConnector],
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
class ConfiguratorUISettingsConfig {
}
ConfiguratorUISettingsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUISettingsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorUISettingsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUISettingsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUISettingsConfig, decorators: [{
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
class ConfiguratorAttributeHeaderComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils, configuratorCommonsService, configuratorGroupsService, configuratorUiSettings) {
        super();
        this.configUtils = configUtils;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configuratorUiSettings = configuratorUiSettings;
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute has a domain of values
         */
        this.showRequiredMessageForDomainAttribute$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => (result ? this.isRequiredAttributeWithDomain() : false)));
    }
    /**
     * Get message key for the required message. Is different for multi- and single selection values
     *  @return {string} - required message key
     */
    getRequiredMessageKey() {
        if (this.isSingleSelection()) {
            return this.isWithAdditionalValues(this.attribute)
                ? 'configurator.attribute.singleSelectAdditionalRequiredMessage'
                : 'configurator.attribute.singleSelectRequiredMessage';
        }
        else if (this.isMultiSelection) {
            return 'configurator.attribute.multiSelectRequiredMessage';
        }
        else {
            //input attribute types
            return 'configurator.attribute.singleSelectRequiredMessage';
        }
    }
    get isMultiSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isSingleSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isRequiredAttributeWithDomain() {
        const uiType = this.attribute.uiType;
        return ((this.attribute.required &&
            this.attribute.incomplete &&
            uiType !== Configurator.UiType.NOT_IMPLEMENTED &&
            uiType !== Configurator.UiType.STRING &&
            uiType !== Configurator.UiType.NUMERIC) ??
            false);
    }
    /**
     * Verifies whether the group type is attribute group
     *
     * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
     */
    isAttributeGroup() {
        if (Configurator.GroupType.ATTRIBUTE_GROUP === this.groupType) {
            return true;
        }
        return false;
    }
    /**
     * Retrieves a certain conflict link key depending on the current group type for translation.
     *
     * @return {string} - the conflict link key
     */
    getConflictMessageKey() {
        return this.groupType === Configurator.GroupType.CONFLICT_GROUP
            ? 'configurator.conflict.viewConfigurationDetails'
            : this.isNavigationToConflictEnabled()
                ? 'configurator.conflict.viewConflictDetails'
                : 'configurator.conflict.conflictDetected';
    }
    /**
     * Checks if an image is attached
     * @returns True if an only if at least one image exists
     */
    get hasImage() {
        const images = this.attribute.images;
        return images ? images.length > 0 : false;
    }
    /**
     * Returns image attached to the attribute (if available)
     * @returns Image
     */
    get image() {
        const images = this.attribute.images;
        return images && this.hasImage ? images[0] : undefined;
    }
    /**
     * Navigates to the group.
     */
    navigateToGroup() {
        this.configuratorCommonsService
            .getConfiguration(this.owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            let groupId;
            if (this.groupType === Configurator.GroupType.CONFLICT_GROUP) {
                groupId = this.attribute.groupId;
            }
            else {
                groupId = this.findConflictGroupId(configuration, this.attribute);
            }
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusValue(this.attribute);
                this.scrollToAttribute(this.attribute.name);
            }
            else {
                this.logError('Attribute was not found in any conflict group. Note that for this navigation, commerce 22.05 or later is required. Consider to disable setting "enableNavigationToConflict"');
            }
        });
    }
    /**
     * Scroll to conflicting attribute
     *
     * @protected
     */
    scrollToAttribute(name) {
        this.onNavigationCompleted(() => this.configUtils.scrollToConfigurationElement('#' + this.createAttributeUiKey('label', name)));
    }
    findConflictGroupId(configuration, currentAttribute) {
        return configuration.flatGroups
            .filter((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP)
            .find((group) => {
            return group.attributes?.find((attribute) => attribute.key === currentAttribute.key);
        })?.id;
    }
    logError(text) {
        if (isDevMode()) {
            console.error(text);
        }
    }
    focusValue(attribute) {
        this.onNavigationCompleted(() => this.configUtils.focusValue(attribute));
    }
    /**
     * The status of the configuration loading is retrieved twice:
     * firstly, wait that the navigation to the corresponding group is started,
     * secondly, wait that the navigation is completed and
     * finally, invoke the callback function
     *
     * @protected
     */
    onNavigationCompleted(callback) {
        this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => isLoading), take(1), switchMap(() => this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => !isLoading), take(1), delay(0) //we need to consider the re-rendering of the page
        )))
            .subscribe(callback);
    }
    /**
     * @returns true only if navigation to conflict groups is enabled.
     */
    isNavigationToConflictEnabled() {
        return (this.configuratorUiSettings.productConfigurator
            ?.enableNavigationToConflict ?? false);
    }
}
ConfiguratorAttributeHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeHeaderComponent, selector: "cx-configurator-attribute-header", inputs: { attribute: "attribute", owner: "owner", groupId: "groupId", groupType: "groupType" }, usesInheritance: true, ngImport: i0, template: "<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ attribute.label }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isAttributeGroup() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isAttributeGroup() ? true : false\"\n  [attr.role]=\"isAttributeGroup() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isAttributeGroup()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"cx-conflict-msg link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    class=\"cx-conflict-msg link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ attribute.label }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isAttributeGroup() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isAttributeGroup() ? true : false\"\n  [attr.role]=\"isAttributeGroup() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isAttributeGroup()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"cx-conflict-msg link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    class=\"cx-conflict-msg link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: ConfiguratorUISettingsConfig }]; }, propDecorators: { attribute: [{
                type: Input
            }], owner: [{
                type: Input
            }], groupId: [{
                type: Input
            }], groupType: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeHeaderModule {
}
ConfiguratorAttributeHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, declarations: [ConfiguratorAttributeHeaderComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule], exports: [ConfiguratorAttributeHeaderComponent] });
ConfiguratorAttributeHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        NgSelectModule,
                    ],
                    declarations: [ConfiguratorAttributeHeaderComponent],
                    exports: [ConfiguratorAttributeHeaderComponent],
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
class ConfiguratorShowMoreComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.showMore = false;
        this.showHiddenText = false;
        this.textSize = 60;
    }
    ngAfterViewInit() {
        this.textNormalized = this.normalize(this.text);
        if (this.textNormalized.length > this.textSize) {
            this.showMore = true;
            this.textToShow = this.textNormalized.substring(0, this.textSize);
        }
        else {
            this.textToShow = this.textNormalized;
        }
        this.cdRef.detectChanges();
    }
    toggleShowMore() {
        this.showHiddenText = !this.showHiddenText;
        this.showHiddenText
            ? (this.textToShow = this.textNormalized)
            : (this.textToShow = this.textNormalized.substring(0, this.textSize));
        this.cdRef.detectChanges();
    }
    normalize(text = '') {
        return text.replace(/<[^>]*>/g, '');
    }
}
ConfiguratorShowMoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorShowMoreComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorShowMoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorShowMoreComponent, selector: "cx-configurator-show-more", inputs: { text: "text", textSize: "textSize", productName: "productName" }, ngImport: i0, template: "<ng-container *ngIf=\"text\">\n  <span\n    [attr.aria-label]=\"\n      'configurator.a11y.itemDescription'\n        | cxTranslate\n          : {\n              item: productName\n            }\n    \"\n    [innerHTML]=\"textToShow\"\n  ></span>\n\n  <button (click)=\"toggleShowMore()\" *ngIf=\"showMore\" tabindex=\"-1\">\n    <ng-container *ngIf=\"showHiddenText; else less\"\n      >&nbsp;... {{ 'configurator.button.less' | cxTranslate }}</ng-container\n    >\n\n    <ng-template #less>\n      &nbsp;... {{ 'configurator.button.more' | cxTranslate }}</ng-template\n    >\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorShowMoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-show-more', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"text\">\n  <span\n    [attr.aria-label]=\"\n      'configurator.a11y.itemDescription'\n        | cxTranslate\n          : {\n              item: productName\n            }\n    \"\n    [innerHTML]=\"textToShow\"\n  ></span>\n\n  <button (click)=\"toggleShowMore()\" *ngIf=\"showMore\" tabindex=\"-1\">\n    <ng-container *ngIf=\"showHiddenText; else less\"\n      >&nbsp;... {{ 'configurator.button.less' | cxTranslate }}</ng-container\n    >\n\n    <ng-template #less>\n      &nbsp;... {{ 'configurator.button.more' | cxTranslate }}</ng-template\n    >\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { text: [{
                type: Input
            }], textSize: [{
                type: Input
            }], productName: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeQuantityComponent {
    constructor(config) {
        this.config = config;
        this.quantity = new UntypedFormControl(1);
        this.optionsChangeSub = new Subscription();
        this.quantityChangeSub = new Subscription();
        this.changeQuantity = new EventEmitter();
    }
    ngOnInit() {
        this.quantity.setValue(this.quantityOptions?.initialQuantity);
        this.optionsChangeSub.add(this.quantityOptions.disableQuantityActions$
            ?.pipe(distinct())
            .subscribe((disable) => {
            // stepper always emits an value when it gets enabled regardless, if the original value was changed.
            // so we subscribe to quantity change when stepper gets enabled and unsubscribe when it gets disabled
            // this way we will not get the unwanted emission on enabling the stepper.
            if (disable) {
                this.quantity.disable();
                this.quantityChangeSub.unsubscribe();
            }
            else {
                this.quantity.enable();
                this.quantityChangeSub.add(this.subscribeToQuantityChange());
            }
        }));
    }
    subscribeToQuantityChange() {
        return this.quantity.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.quantity)), take(1))
            .subscribe(() => this.onChangeQuantity());
    }
    ngOnDestroy() {
        this.optionsChangeSub.unsubscribe();
        this.quantityChangeSub.unsubscribe();
    }
    onChangeQuantity() {
        this.changeQuantity.emit(this.quantity?.value);
    }
}
ConfiguratorAttributeQuantityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, deps: [{ token: ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeQuantityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: { quantityOptions: "quantityOptions" }, outputs: { changeQuantity: "changeQuantity" }, ngImport: i0, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions?.allowZero\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions?.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n", dependencies: [{ kind: "component", type: i3.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-quantity', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions?.allowZero\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions?.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorUISettingsConfig }]; }, propDecorators: { quantityOptions: [{
                type: Input
            }], changeQuantity: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceComponent {
    /**
     * Retrieves price.
     *
     * @return {string} - value price formula
     */
    get price() {
        if (this.formula.priceTotal) {
            return this.priceTotal;
        }
        else {
            return '+ ' + this.formula.price?.formattedValue;
        }
    }
    /**
     * Retrieves the total price.
     *
     * @return {string} - total price formula
     */
    get priceTotal() {
        return '+ ' + this.formula.priceTotal?.formattedValue;
    }
    /**
     * Verifies whether quantity with price should be displayed.
     *
     * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
     */
    displayQuantityAndPrice() {
        const quantity = this.formula.quantity;
        return quantity ? this.formula.price?.value !== 0 && quantity >= 1 : false;
    }
    /**
     * Verifies whether only price should be displayed.
     *
     * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
     */
    displayPriceOnly() {
        const priceValue = this.formula.price?.value ?? 0;
        const priceTotalValue = this.formula.priceTotal?.value ?? 0;
        return ((priceValue !== 0 || priceTotalValue !== 0) &&
            !this.displayQuantityAndPrice());
    }
    /**
     * Verifies whether the price formula should be displayed.
     *
     * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
     */
    displayFormula() {
        const displayFormula = (this.formula.quantity && this.formula.quantity !== 0) ||
            (this.formula.price && this.formula.price?.value !== 0) ||
            (this.formula.priceTotal && this.formula.priceTotal?.value !== 0);
        return displayFormula ?? false;
    }
    /**
     * Retrieves formula for quantity with price.
     *
     * @param {string} formattedQuantity- formatted quantity
     * @return {string} - price formula
     */
    quantityWithPrice(formattedQuantity) {
        return formattedQuantity + 'x(' + this.formula.price?.formattedValue + ')';
    }
    /**
     * Verifies whether the price is lighted up.
     *
     * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
     */
    isPriceLightedUp() {
        return this.formula.isLightedUp ?? false;
    }
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @return {string} - corresponding style class
     */
    get styleClass() {
        let styleClass = 'cx-price';
        if (!this.isPriceLightedUp()) {
            styleClass += ' cx-greyed-out';
        }
        return styleClass;
    }
}
ConfiguratorPriceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPriceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: { formula: "formula" }, ngImport: i0, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-price', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n" }]
        }], propDecorators: { formula: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeProductCardComponent extends ConfiguratorAttributeBaseComponent {
    constructor(productService, keyBoardFocus, translation) {
        super();
        this.productService = productService;
        this.keyBoardFocus = keyBoardFocus;
        this.translation = translation;
        this.loading$ = new BehaviorSubject(true);
        this.showDeselectionNotPossible = false;
        this.handleDeselect = new EventEmitter();
        this.handleQuantity = new EventEmitter();
        this.handleSelect = new EventEmitter();
        this.iconType = ICON_TYPE;
    }
    ngOnInit() {
        this.loading$.next(true);
        const productSystemId = this.productCardOptions.productBoundValue.productSystemId;
        this.product$ = this.productService
            .get(productSystemId ? productSystemId : '', ConfiguratorProductScope.CONFIGURATOR_PRODUCT_CARD)
            .pipe(map((respProduct) => {
            return respProduct
                ? respProduct
                : this.transformToProductType(this.productCardOptions.productBoundValue);
        }), tap(() => this.loading$.next(false)));
    }
    get showQuantity() {
        return ((this.productCardOptions.withQuantity &&
            this.productCardOptions.productBoundValue.selected &&
            this.productCardOptions.multiSelect) ??
            false);
    }
    get focusConfig() {
        const focusConfig = {
            key: this.createFocusId(this.productCardOptions.attributeId.toString(), this.productCardOptions.productBoundValue.valueCode),
        };
        return focusConfig;
    }
    onHandleSelect() {
        this.loading$.next(true);
        if (this.productCardOptions.hideRemoveButton &&
            this.productCardOptions.fallbackFocusId) {
            this.keyBoardFocus.set(this.productCardOptions.fallbackFocusId);
        }
        this.handleSelect.emit(this.productCardOptions.productBoundValue.valueCode);
    }
    onHandleDeselect() {
        {
            if (this.productCardOptions.productBoundValue.selected &&
                this.productCardOptions.hideRemoveButton) {
                this.showDeselectionNotPossibleMessage();
                return;
            }
            this.loading$.next(true);
            this.handleDeselect.emit(this.productCardOptions.productBoundValue.valueCode);
        }
    }
    onChangeQuantity(eventObject) {
        if (!eventObject) {
            this.onHandleDeselect();
        }
        else {
            this.onHandleQuantity(eventObject);
        }
    }
    /**
     * Verifies whether the product card refers to a selected value
     * @return {boolean} - Selected?
     */
    isProductCardSelected() {
        const isProductCardSelected = this.productCardOptions.productBoundValue &&
            this.productCardOptions.productBoundValue.selected &&
            !this.productCardOptions.singleDropdown;
        return isProductCardSelected ?? false;
    }
    /**
     * Checks if price needs to be displayed. This is the
     * case if either value price, quantity or value price total
     * are present
     * @return {boolean} - Price display?
     */
    hasPriceDisplay() {
        const productPrice = this.productCardOptions.productBoundValue.valuePrice ||
            this.productCardOptions.productBoundValue.quantity ||
            this.productCardOptions.productBoundValue.valuePriceTotal;
        return productPrice ? true : false;
    }
    /**
     * Extract corresponding price formula parameters
     *
     *  @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        if (!this.productCardOptions.multiSelect) {
            return {
                price: this.productCardOptions.productBoundValue.valuePrice,
                isLightedUp: this.productCardOptions.productBoundValue.selected,
            };
        }
        return {
            quantity: this.productCardOptions.productBoundValue.quantity,
            price: this.productCardOptions.productBoundValue.valuePrice,
            priceTotal: this.productCardOptions.productBoundValue.valuePriceTotal,
            isLightedUp: this.productCardOptions.productBoundValue.selected,
        };
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters() {
        const quantityFromOptions = this.productCardOptions.productBoundValue.quantity;
        const mergedLoading = this.productCardOptions.loading$
            ? combineLatest([this.loading$, this.productCardOptions.loading$]).pipe(map((values) => {
                return values[0] || values[1];
            }))
            : this.loading$;
        return {
            allowZero: !this.productCardOptions.hideRemoveButton,
            initialQuantity: quantityFromOptions ? quantityFromOptions : 0,
            disableQuantityActions$: mergedLoading,
        };
    }
    /**
     * Verifies whether the value code is defined.
     *
     * @param {string} valueCode - Value code
     * @return {boolean} - 'true' if the value code is defined, otherwise 'false'
     */
    isValueCodeDefined(valueCode) {
        return valueCode && valueCode !== '0' ? true : false;
    }
    transformToProductType(value) {
        return {
            code: value?.productSystemId,
            description: value?.description,
            images: {},
            name: value?.valueDisplay,
        };
    }
    onHandleQuantity(quantity) {
        this.loading$.next(true);
        this.handleQuantity.emit({
            quantity,
            valueCode: this.productCardOptions.productBoundValue.valueCode,
        });
    }
    showDeselectionNotPossibleMessage() {
        this.showDeselectionNotPossible = true;
    }
    getAriaLabelSingleUnselected(product) {
        let translatedText = '';
        let index = this.productCardOptions.itemIndex + 1;
        if (this.isValueCodeDefined(this.productCardOptions?.productBoundValue?.valueCode)) {
            if (this.hasPriceDisplay() &&
                this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
                    item: product.code,
                    attribute: this.productCardOptions?.attributeLabel,
                    itemIndex: index,
                    itemCount: this.productCardOptions.itemCount,
                    price: this.productCardOptions.productBoundValue.valuePriceTotal
                        ?.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeUnselected', {
                    item: product.code,
                    attribute: this.productCardOptions?.attributeLabel,
                    itemIndex: index,
                    itemCount: this.productCardOptions.itemCount,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.selectNoItemOfAttribute', {
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelSingleSelected(product) {
        let translatedText = '';
        let index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelSingleSelectedNoButton(product) {
        let translatedText = '';
        let index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelected', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelMultiSelected(product) {
        let translatedText = '';
        let index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelMultiUnselected(product) {
        let translatedText = '';
        let index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeUnselected', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
}
ConfiguratorAttributeProductCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeProductCardComponent, deps: [{ token: i1$1.ProductService }, { token: i3.KeyboardFocusService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeProductCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: { productCardOptions: "productCardOptions" }, outputs: { handleDeselect: "handleDeselect", handleQuantity: "handleQuantity", handleSelect: "handleSelect" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div\n    class=\"cx-product-card\"\n    [ngClass]=\"{\n      'cx-product-card-selected': isProductCardSelected()\n    }\"\n    [attr.aria-label]=\"\n      'configurator.a11y.itemOfAttribute'\n        | cxTranslate\n          : {\n              attribute: productCardOptions?.attributeLabel\n            }\n    \"\n  >\n    <div class=\"cx-product-card-rows\">\n      <div class=\"cx-product-card-imgs\">\n        <cx-media\n          [container]=\"product?.images?.PRIMARY\"\n          format=\"product\"\n          aria-hidden=\"true\"\n        ></cx-media>\n      </div>\n\n      <div class=\"cx-product-card-info\">\n        <div class=\"cx-product-card-name\">\n          <p>\n            {{ product.name }}\n          </p>\n        </div>\n        <div class=\"cx-product-card-code\" *ngIf=\"product.code\">\n          {{ 'configurator.attribute.id' | cxTranslate }}:\n          {{ product.code }}\n        </div>\n        <cx-configurator-show-more\n          *ngIf=\"product?.description\"\n          [text]=\"product?.description\"\n          [textSize]=\"45\"\n          [productName]=\"product.code\"\n        ></cx-configurator-show-more>\n      </div>\n    </div>\n\n    <div\n      class=\"cx-product-card-rows column\"\n      *ngIf=\"!productCardOptions.singleDropdown || hasPriceDisplay()\"\n    >\n      <div class=\"cx-product-card-quantity-price\">\n        <div class=\"cx-product-card-quantity\">\n          <cx-configurator-attribute-quantity\n            *ngIf=\"showQuantity\"\n            (changeQuantity)=\"onChangeQuantity($event)\"\n            [quantityOptions]=\"extractQuantityParameters()\"\n          ></cx-configurator-attribute-quantity>\n        </div>\n        <div class=\"cx-product-card-price\">\n          <cx-configurator-price\n            [formula]=\"extractPriceFormulaParameters()\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <div class=\"cx-product-card-action\">\n        <div\n          class=\"cx-product-card-action-btn\"\n          *ngIf=\"!productCardOptions?.singleDropdown\"\n        >\n          <ng-container *ngIf=\"productCardOptions?.multiSelect; else single\">\n            <button\n              *ngIf=\"\n                productCardOptions?.productBoundValue?.selected;\n                else select\n              \"\n              class=\"btn btn-action\"\n              (click)=\"onHandleDeselect()\"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelMultiSelected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', productCardOptions?.attributeName)\n              \"\n            >\n              {{ 'configurator.button.remove' | cxTranslate }}\n            </button>\n\n            <ng-template #select>\n              <button\n                class=\"btn btn-primary\"\n                (click)=\"onHandleSelect()\"\n                [disabled]=\"\n                  productCardOptions?.disableAllButtons || (loading$ | async)\n                \"\n                [cxFocus]=\"focusConfig\"\n                [attr.aria-label]=\"getAriaLabelMultiUnselected(product)\"\n                [attr.aria-describedby]=\"\n                  createAttributeUiKey(\n                    'label',\n                    productCardOptions?.attributeName\n                  )\n                \"\n              >\n                {{ 'configurator.button.add' | cxTranslate }}\n              </button>\n            </ng-template>\n          </ng-container>\n\n          <ng-template #single>\n            <button\n              class=\"btn btn-primary\"\n              (click)=\"onHandleSelect()\"\n              [disabled]=\"\n                productCardOptions?.disableAllButtons || (loading$ | async)\n              \"\n              *ngIf=\"\n                !productCardOptions?.productBoundValue?.selected;\n                else deselect\n              \"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelSingleUnselected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', productCardOptions?.attributeName)\n              \"\n            >\n              {{ 'configurator.button.select' | cxTranslate }}\n            </button>\n            <ng-template #deselect>\n              <ng-container\n                *ngIf=\"\n                  isValueCodeDefined(\n                    productCardOptions?.productBoundValue?.valueCode\n                  )\n                \"\n              >\n                <button\n                  *ngIf=\"!productCardOptions?.hideRemoveButton\"\n                  class=\"btn btn-action\"\n                  (click)=\"onHandleDeselect()\"\n                  [disabled]=\"\n                    productCardOptions?.hideRemoveButton || (loading$ | async)\n                  \"\n                  [cxFocus]=\"focusConfig\"\n                  [attr.aria-label]=\"getAriaLabelSingleSelected(product)\"\n                  [attr.aria-describedby]=\"\n                    createAttributeUiKey(\n                      'label',\n                      productCardOptions?.attributeName\n                    )\n                  \"\n                >\n                  {{ 'configurator.button.deselect' | cxTranslate }}\n                </button>\n                <span\n                  *ngIf=\"productCardOptions?.hideRemoveButton\"\n                  class=\"cx-visually-hidden\"\n                  tabindex=\"0\"\n                >\n                  {{ getAriaLabelSingleSelectedNoButton(product) }}\n                </span>\n              </ng-container>\n            </ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n    <ng-container *ngIf=\"showDeselectionNotPossible\">\n      <div\n        class=\"cx-product-card-rows deselection-error-message\"\n        aria-live=\"assertive\"\n        aria-atomic=\"true\"\n        role=\"alert\"\n        id=\"{{\n          createAttributeUiKey(\n            'attribute-msg',\n            productCardOptions?.attributeName\n          )\n        }}\"\n      >\n        <cx-icon class=\"deselection-error-symbol\" type=\"ERROR\"></cx-icon>\n        {{ 'configurator.attribute.deselectionNotPossible' | cxTranslate }}\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorShowMoreComponent, selector: "cx-configurator-show-more", inputs: ["text", "textSize", "productName"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeProductCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-product-card', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div\n    class=\"cx-product-card\"\n    [ngClass]=\"{\n      'cx-product-card-selected': isProductCardSelected()\n    }\"\n    [attr.aria-label]=\"\n      'configurator.a11y.itemOfAttribute'\n        | cxTranslate\n          : {\n              attribute: productCardOptions?.attributeLabel\n            }\n    \"\n  >\n    <div class=\"cx-product-card-rows\">\n      <div class=\"cx-product-card-imgs\">\n        <cx-media\n          [container]=\"product?.images?.PRIMARY\"\n          format=\"product\"\n          aria-hidden=\"true\"\n        ></cx-media>\n      </div>\n\n      <div class=\"cx-product-card-info\">\n        <div class=\"cx-product-card-name\">\n          <p>\n            {{ product.name }}\n          </p>\n        </div>\n        <div class=\"cx-product-card-code\" *ngIf=\"product.code\">\n          {{ 'configurator.attribute.id' | cxTranslate }}:\n          {{ product.code }}\n        </div>\n        <cx-configurator-show-more\n          *ngIf=\"product?.description\"\n          [text]=\"product?.description\"\n          [textSize]=\"45\"\n          [productName]=\"product.code\"\n        ></cx-configurator-show-more>\n      </div>\n    </div>\n\n    <div\n      class=\"cx-product-card-rows column\"\n      *ngIf=\"!productCardOptions.singleDropdown || hasPriceDisplay()\"\n    >\n      <div class=\"cx-product-card-quantity-price\">\n        <div class=\"cx-product-card-quantity\">\n          <cx-configurator-attribute-quantity\n            *ngIf=\"showQuantity\"\n            (changeQuantity)=\"onChangeQuantity($event)\"\n            [quantityOptions]=\"extractQuantityParameters()\"\n          ></cx-configurator-attribute-quantity>\n        </div>\n        <div class=\"cx-product-card-price\">\n          <cx-configurator-price\n            [formula]=\"extractPriceFormulaParameters()\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <div class=\"cx-product-card-action\">\n        <div\n          class=\"cx-product-card-action-btn\"\n          *ngIf=\"!productCardOptions?.singleDropdown\"\n        >\n          <ng-container *ngIf=\"productCardOptions?.multiSelect; else single\">\n            <button\n              *ngIf=\"\n                productCardOptions?.productBoundValue?.selected;\n                else select\n              \"\n              class=\"btn btn-action\"\n              (click)=\"onHandleDeselect()\"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelMultiSelected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', productCardOptions?.attributeName)\n              \"\n            >\n              {{ 'configurator.button.remove' | cxTranslate }}\n            </button>\n\n            <ng-template #select>\n              <button\n                class=\"btn btn-primary\"\n                (click)=\"onHandleSelect()\"\n                [disabled]=\"\n                  productCardOptions?.disableAllButtons || (loading$ | async)\n                \"\n                [cxFocus]=\"focusConfig\"\n                [attr.aria-label]=\"getAriaLabelMultiUnselected(product)\"\n                [attr.aria-describedby]=\"\n                  createAttributeUiKey(\n                    'label',\n                    productCardOptions?.attributeName\n                  )\n                \"\n              >\n                {{ 'configurator.button.add' | cxTranslate }}\n              </button>\n            </ng-template>\n          </ng-container>\n\n          <ng-template #single>\n            <button\n              class=\"btn btn-primary\"\n              (click)=\"onHandleSelect()\"\n              [disabled]=\"\n                productCardOptions?.disableAllButtons || (loading$ | async)\n              \"\n              *ngIf=\"\n                !productCardOptions?.productBoundValue?.selected;\n                else deselect\n              \"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelSingleUnselected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', productCardOptions?.attributeName)\n              \"\n            >\n              {{ 'configurator.button.select' | cxTranslate }}\n            </button>\n            <ng-template #deselect>\n              <ng-container\n                *ngIf=\"\n                  isValueCodeDefined(\n                    productCardOptions?.productBoundValue?.valueCode\n                  )\n                \"\n              >\n                <button\n                  *ngIf=\"!productCardOptions?.hideRemoveButton\"\n                  class=\"btn btn-action\"\n                  (click)=\"onHandleDeselect()\"\n                  [disabled]=\"\n                    productCardOptions?.hideRemoveButton || (loading$ | async)\n                  \"\n                  [cxFocus]=\"focusConfig\"\n                  [attr.aria-label]=\"getAriaLabelSingleSelected(product)\"\n                  [attr.aria-describedby]=\"\n                    createAttributeUiKey(\n                      'label',\n                      productCardOptions?.attributeName\n                    )\n                  \"\n                >\n                  {{ 'configurator.button.deselect' | cxTranslate }}\n                </button>\n                <span\n                  *ngIf=\"productCardOptions?.hideRemoveButton\"\n                  class=\"cx-visually-hidden\"\n                  tabindex=\"0\"\n                >\n                  {{ getAriaLabelSingleSelectedNoButton(product) }}\n                </span>\n              </ng-container>\n            </ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n    <ng-container *ngIf=\"showDeselectionNotPossible\">\n      <div\n        class=\"cx-product-card-rows deselection-error-message\"\n        aria-live=\"assertive\"\n        aria-atomic=\"true\"\n        role=\"alert\"\n        id=\"{{\n          createAttributeUiKey(\n            'attribute-msg',\n            productCardOptions?.attributeName\n          )\n        }}\"\n      >\n        <cx-icon class=\"deselection-error-symbol\" type=\"ERROR\"></cx-icon>\n        {{ 'configurator.attribute.deselectionNotPossible' | cxTranslate }}\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i3.KeyboardFocusService }, { type: i1$1.TranslationService }]; }, propDecorators: { productCardOptions: [{
                type: Input
            }], handleDeselect: [{
                type: Output
            }], handleQuantity: [{
                type: Output
            }], handleSelect: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceModule {
}
ConfiguratorPriceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPriceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceModule, declarations: [ConfiguratorPriceComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorPriceComponent] });
ConfiguratorPriceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorPriceComponent],
                    exports: [ConfiguratorPriceComponent],
                    imports: [CommonModule, I18nModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorShowMoreModule {
}
ConfiguratorShowMoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorShowMoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorShowMoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorShowMoreModule, declarations: [ConfiguratorShowMoreComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorShowMoreComponent] });
ConfiguratorShowMoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorShowMoreModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorShowMoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    declarations: [ConfiguratorShowMoreComponent],
                    exports: [ConfiguratorShowMoreComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorUISettingsConfig = {
    productConfigurator: {
        updateDebounceTime: {
            quantity: 750,
            input: 500,
        },
        addRetractOption: false,
        enableNavigationToConflict: false,
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeQuantityModule {
}
ConfiguratorAttributeQuantityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeQuantityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityModule, declarations: [ConfiguratorAttributeQuantityComponent], imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule], exports: [ConfiguratorAttributeQuantityComponent] });
ConfiguratorAttributeQuantityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityModule, providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)], imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeQuantityComponent],
                    exports: [ConfiguratorAttributeQuantityComponent],
                    imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule],
                    providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeProductCardModule {
}
ConfiguratorAttributeProductCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeProductCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeProductCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeProductCardModule, declarations: [ConfiguratorAttributeProductCardComponent], imports: [CommonModule,
        ConfiguratorShowMoreModule,
        ConfiguratorAttributeQuantityModule,
        I18nModule,
        RouterModule,
        UrlModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorPriceModule,
        KeyboardFocusModule,
        IconModule], exports: [ConfiguratorAttributeProductCardComponent] });
ConfiguratorAttributeProductCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeProductCardModule, imports: [CommonModule,
        ConfiguratorShowMoreModule,
        ConfiguratorAttributeQuantityModule,
        I18nModule,
        RouterModule,
        UrlModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorPriceModule,
        KeyboardFocusModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeProductCardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeProductCardComponent],
                    exports: [ConfiguratorAttributeProductCardComponent],
                    imports: [
                        CommonModule,
                        ConfiguratorShowMoreModule,
                        ConfiguratorAttributeQuantityModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MediaModule,
                        ConfiguratorPriceModule,
                        KeyboardFocusModule,
                        IconModule,
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
class ConfiguratorAttributeQuantityService {
    /**
     * Checks if the interaction with the quantity control needs
     * to be disabled
     * @param {any} value Selected value
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActions(value) {
        return !value || value === '0';
    }
    /**
     * Checks if the interaction with the quantity control needs for multiselection components
     * to be disabled
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActionsMultiSelection(attribute) {
        return (attribute.dataType ===
            Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
            (!attribute.values ||
                !attribute.values.find((value) => value.selected) ||
                attribute.quantity === 0));
    }
    /**
     * Checks if it is supposed to render a quantity control on attribute level
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - Display quantity picker on attribute level?
     */
    withQuantityOnAttributeLevel(attribute) {
        return (attribute.dataType ===
            Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
    }
    /**
     * Checks if an attribute needs to be equipped with the option to select
     * a quantity
     * @param {Configurator.DataType} dataType Attribute data type
     * @param {Configurator.UiType} uiType Attribute ui type, refers to how an attribute must be rendered
     * @returns  {boolean} Render a quantity component?
     */
    withQuantity(dataType, uiType) {
        switch (uiType) {
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.RADIOBUTTON:
                return (dataType === Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
                return (dataType === Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL);
            default:
                return false;
        }
    }
    /**
     * Checks if the zero quantity is allowed
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - true when zero quantity is allowed
     */
    allowZeroValueQuantity(attribute) {
        const selectedValues = attribute.values
            ? attribute.values.filter((value) => value.selected).length
            : 0;
        if (attribute.required && selectedValues < 2) {
            return false;
        }
        return true;
    }
}
ConfiguratorAttributeQuantityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeQuantityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeQuantityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
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
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService, translation) {
        super();
        this.quantityService = quantityService;
        this.translation = translation;
        this.loading$ = new BehaviorSubject(false);
        this.selectionChange = new EventEmitter();
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActions(this.attribute.selectedSingleValue);
    }
    onSelect(value) {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                selectedSingleValue: value,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        this.selectionChange.emit(event);
    }
    onSelectAdditionalValue(event) {
        const userInput = event.changedAttribute.userInput;
        if (userInput) {
            this.loading$.next(true);
            event.changedAttribute.selectedSingleValue = userInput;
            this.selectionChange.emit(event);
        }
    }
    onHandleQuantity(quantity) {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                quantity,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        };
        this.selectionChange.emit(event);
    }
    onChangeQuantity(eventObject, form) {
        if (!eventObject) {
            if (form) {
                form.setValue('0');
            }
            this.onSelect('');
        }
        else {
            this.onHandleQuantity(eventObject);
        }
    }
    getInitialQuantity(form) {
        const quantity = this.attribute.quantity ?? 0;
        if (form) {
            return form.value !== '0' ? quantity : 0;
        }
        else {
            return this.attribute.selectedSingleValue ? quantity : 0;
        }
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {FormControl} form - Form control
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(form) {
        const initialQuantity = this.getInitialQuantity(form);
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    /**
     * Extract corresponding price formula parameters.
     * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attribute.quantity,
            price: this.getSelectedValuePrice(),
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the single-selection attribute types only value price should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        if (value) {
            return {
                price: value.valuePrice,
                isLightedUp: value.selected,
            };
        }
    }
    getSelectedValuePrice() {
        return this.attribute.values?.find((value) => value.selected)?.valuePrice;
    }
    get isAdditionalValueNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NUMERIC);
    }
    get isAdditionalValueAlphaNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NONE);
    }
    getAriaLabel(value, attribute) {
        let ariaLabel = this.getAriaLabelWithoutAdditionalValue(value, attribute);
        if (this.isWithAdditionalValues(this.attribute)) {
            let ariaLabelWithAdditionalValue = this.getAdditionalValueAriaLabel();
            return ariaLabel + ' ' + ariaLabelWithAdditionalValue;
        }
        else {
            return ariaLabel;
        }
    }
    getAdditionalValueAriaLabel() {
        let ariaLabel = '';
        this.translation
            .translate('configurator.a11y.additionalValue')
            .pipe(take(1))
            .subscribe((text) => (ariaLabel = text));
        return ariaLabel;
    }
    getAriaLabelWithoutAdditionalValue(value, attribute) {
        let ariaLabel = '';
        if (value.valuePrice && value.valuePrice?.value !== 0) {
            if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePriceTotal.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePrice.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.selectedValueOfAttributeFull', {
                value: value.valueDisplay,
                attribute: attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (ariaLabel = text));
        }
        return ariaLabel;
    }
}
ConfiguratorAttributeSingleSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeSingleSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeSingleSelectionBaseComponent, inputs: { attribute: "attribute", ownerKey: "ownerKey", language: "language", ownerType: "ownerType" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }]; }, propDecorators: { attribute: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], language: [{
                type: Input
            }], ownerType: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService) {
        super();
        this.quantityService = quantityService;
        this.loading$ = new BehaviorSubject(false);
        this.selectionChange = new EventEmitter();
    }
    /**
     * Checks if we are supposed to render a quantity control on attribute level, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker on attribute level?
     */
    get withQuantityOnAttributeLevel() {
        return this.quantityService.withQuantityOnAttributeLevel(this.attribute);
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActionsMultiSelection(this.attribute);
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {number} initialQuantity - Initial quantity
     * @param {boolean} allowZero - Allow zero
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(initialQuantity, allowZero) {
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: allowZero ?? !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    onHandleAttributeQuantity(quantity) {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                quantity,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        };
        this.selectionChange.emit(event);
    }
    /**
     * Extract corresponding price formula parameters.
     * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeMultiSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, deps: [{ token: ConfiguratorAttributeQuantityService }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeMultiSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeMultiSelectionBaseComponent, inputs: { attribute: "attribute", ownerKey: "ownerKey" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }]; }, propDecorators: { attribute: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

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
class ConfiguratorAttributeCheckBoxListComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
    constructor(configUtilsService, quantityService) {
        super(quantityService);
        this.configUtilsService = configUtilsService;
        this.quantityService = quantityService;
        this.attributeCheckBoxForms = new Array();
    }
    ngOnInit() {
        const disabled = !this.allowZeroValueQuantity;
        for (const value of this.attribute.values ?? []) {
            let attributeCheckBoxForm;
            if (value.selected) {
                attributeCheckBoxForm = new UntypedFormControl({
                    value: true,
                    disabled: disabled,
                });
            }
            else {
                attributeCheckBoxForm = new UntypedFormControl(false);
            }
            this.attributeCheckBoxForms.push(attributeCheckBoxForm);
        }
    }
    get allowZeroValueQuantity() {
        return this.quantityService.allowZeroValueQuantity(this.attribute);
    }
    onSelect() {
        const selectedValues = this.configUtilsService.assembleValuesForMultiSelectAttributes(this.attributeCheckBoxForms, this.attribute);
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: selectedValues,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        this.selectionChange.emit(event);
    }
    onChangeValueQuantity(eventObject, valueCode, formIndex) {
        if (eventObject === 0) {
            this.attributeCheckBoxForms[formIndex].setValue(false);
            this.onSelect();
            return;
        }
        const value = this.configUtilsService
            .assembleValuesForMultiSelectAttributes(this.attributeCheckBoxForms, this.attribute)
            .find((item) => item.valueCode === valueCode);
        if (!value) {
            if (isDevMode()) {
                console.warn('no value for event:', eventObject);
            }
            return;
        }
        value.quantity = eventObject;
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [value],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.VALUE_QUANTITY,
        };
        this.selectionChange.emit(event);
    }
    onChangeQuantity(eventObject) {
        if (!eventObject) {
            this.attributeCheckBoxForms.forEach((_, index) => this.attributeCheckBoxForms[index].setValue(false));
            this.onSelect();
        }
        else {
            this.onHandleAttributeQuantity(eventObject);
        }
    }
}
ConfiguratorAttributeCheckBoxListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckBoxListComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorAttributeQuantityService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeCheckBoxListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeCheckBoxListComponent, selector: "cx-configurator-attribute-checkbox-list", inputs: { group: "group" }, usesInheritance: true, ngImport: i0, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div\n      *ngIf=\"withQuantityOnAttributeLevel\"\n      class=\"cx-attribute-level-quantity-price\"\n    >\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(attribute.quantity, !attribute.required)\n        \"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n    <ng-container *ngFor=\"let value of attribute.values; let i = index\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n            [value]=\"value.valueCode\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForms[i]\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              value.valuePrice && value.valuePrice?.value !== 0\n                ? value.valuePriceTotal && value.valuePriceTotal?.value !== 0\n                  ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePriceTotal.formattedValue\n                        })\n                  : ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePrice.formattedValue\n                        })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : { value: value.valueDisplay, attribute: attribute.label })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey('label', attribute.name, value.valueCode)\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            aria-hidden=\"true\"\n            class=\"cx-configurator-attribute-value-label form-check-label\"\n            >{{ value.valueDisplay }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(value)\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <cx-configurator-attribute-quantity\n        *ngIf=\"value.selected && withQuantity && !withQuantityOnAttributeLevel\"\n        (changeQuantity)=\"onChangeValueQuantity($event, value.valueCode, i)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(value.quantity, allowZeroValueQuantity)\n        \"\n      ></cx-configurator-attribute-quantity>\n    </ng-container>\n  </div>\n</fieldset>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckBoxListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-checkbox-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div\n      *ngIf=\"withQuantityOnAttributeLevel\"\n      class=\"cx-attribute-level-quantity-price\"\n    >\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(attribute.quantity, !attribute.required)\n        \"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n    <ng-container *ngFor=\"let value of attribute.values; let i = index\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n            [value]=\"value.valueCode\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForms[i]\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              value.valuePrice && value.valuePrice?.value !== 0\n                ? value.valuePriceTotal && value.valuePriceTotal?.value !== 0\n                  ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePriceTotal.formattedValue\n                        })\n                  : ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePrice.formattedValue\n                        })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : { value: value.valueDisplay, attribute: attribute.label })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey('label', attribute.name, value.valueCode)\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            aria-hidden=\"true\"\n            class=\"cx-configurator-attribute-value-label form-check-label\"\n            >{{ value.valueDisplay }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(value)\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <cx-configurator-attribute-quantity\n        *ngIf=\"value.selected && withQuantity && !withQuantityOnAttributeLevel\"\n        (changeQuantity)=\"onChangeValueQuantity($event, value.valueCode, i)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(value.quantity, allowZeroValueQuantity)\n        \"\n      ></cx-configurator-attribute-quantity>\n    </ng-container>\n  </div>\n</fieldset>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorAttributeQuantityService }]; }, propDecorators: { group: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCheckboxListModule {
}
ConfiguratorAttributeCheckboxListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCheckboxListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, declarations: [ConfiguratorAttributeCheckBoxListComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeCheckBoxListComponent] });
ConfiguratorAttributeCheckboxListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeCheckBoxListComponent],
                    exports: [ConfiguratorAttributeCheckBoxListComponent],
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
class ConfiguratorAttributeCheckBoxComponent extends ConfiguratorAttributeBaseComponent {
    constructor() {
        super(...arguments);
        this.selectionChange = new EventEmitter();
        this.attributeCheckBoxForm = new UntypedFormControl('');
    }
    ngOnInit() {
        this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
    }
    /**
     * Fired when a check box has been selected i.e. when a value has been set
     */
    onSelect() {
        const selectedValues = this.assembleSingleValue();
        const event = {
            ownerKey: this.ownerKey,
            changedAttribute: {
                ...this.attribute,
                values: selectedValues,
            },
        };
        this.selectionChange.emit(event);
    }
    assembleSingleValue() {
        const localAssembledValues = [];
        const value = this.attribute.values ? this.attribute.values[0] : undefined;
        //we can assume that for this component, value is always present
        if (value) {
            const localAttributeValue = {
                valueCode: value.valueCode,
            };
            localAttributeValue.name = value.name;
            localAttributeValue.selected = this.attributeCheckBoxForm.value;
            localAssembledValues.push(localAttributeValue);
        }
        return localAssembledValues;
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeCheckBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckBoxComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeCheckBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeCheckBoxComponent, selector: "cx-configurator-attribute-checkbox", inputs: { attribute: "attribute", group: "group", ownerKey: "ownerKey" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0, template: "<ng-container *cxFeatureLevel=\"'!4.1'\">\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div class=\"form-check\">\n      <input\n        id=\"{{\n          createAttributeValueIdForConfigurator(\n            attribute,\n            attribute?.values[0].valueCode\n          )\n        }}\"\n        type=\"checkbox\"\n        class=\"form-check-input\"\n        [value]=\"attribute?.values[0].valueCode\"\n        [cxFocus]=\"{ key: attribute.name + '-' + attribute?.values[0].name }\"\n        (change)=\"onSelect()\"\n        [formControl]=\"attributeCheckBoxForm\"\n        name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n        [attr.aria-label]=\"\n          'configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute?.values[0].valueDisplay,\n                  attribute: attribute.label\n                }\n        \"\n        [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      />\n      <label\n        id=\"{{\n          createValueUiKey(\n            'label',\n            attribute.name,\n            attribute?.values[0].valueCode\n          )\n        }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(\n            attribute,\n            attribute?.values[0].valueCode\n          )\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label\"\n        >{{ attribute?.values[0].valueDisplay }}</label\n      >\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *cxFeatureLevel=\"'4.1'\">\n  <fieldset>\n    <legend style=\"display: none\">{{ attribute.label }}</legend>\n    <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attribute?.values[0].valueCode\n              )\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [value]=\"attribute?.values[0].valueCode\"\n            [cxFocus]=\"{\n              key: attribute.name + '-' + attribute?.values[0].name\n            }\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForm\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              attribute?.values[0].valuePrice &&\n              attribute?.values[0].valuePrice?.value !== 0\n                ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                  | cxTranslate\n                    : {\n                        value: attribute?.values[0].valueDisplay,\n                        attribute: attribute.label,\n                        price: attribute?.values[0].valuePrice.formattedValue\n                      })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : {\n                        value: attribute?.values[0].valueDisplay,\n                        attribute: attribute.label\n                      })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name) +\n              ' ' +\n              createAttributeUiKey('attribute-msg', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey(\n                'label',\n                attribute.name,\n                attribute?.values[0].valueCode\n              )\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attribute?.values[0].valueCode\n              )\n            }}\"\n            aria-hidden=\"true\"\n            class=\"form-check-label\"\n            >{{ attribute?.values[0].valueDisplay }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(attribute?.values[0])\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n    </div>\n  </fieldset>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *cxFeatureLevel=\"'!4.1'\">\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div class=\"form-check\">\n      <input\n        id=\"{{\n          createAttributeValueIdForConfigurator(\n            attribute,\n            attribute?.values[0].valueCode\n          )\n        }}\"\n        type=\"checkbox\"\n        class=\"form-check-input\"\n        [value]=\"attribute?.values[0].valueCode\"\n        [cxFocus]=\"{ key: attribute.name + '-' + attribute?.values[0].name }\"\n        (change)=\"onSelect()\"\n        [formControl]=\"attributeCheckBoxForm\"\n        name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n        [attr.aria-label]=\"\n          'configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute?.values[0].valueDisplay,\n                  attribute: attribute.label\n                }\n        \"\n        [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      />\n      <label\n        id=\"{{\n          createValueUiKey(\n            'label',\n            attribute.name,\n            attribute?.values[0].valueCode\n          )\n        }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(\n            attribute,\n            attribute?.values[0].valueCode\n          )\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label\"\n        >{{ attribute?.values[0].valueDisplay }}</label\n      >\n    </div>\n  </div>\n</ng-container>\n\n<ng-container *cxFeatureLevel=\"'4.1'\">\n  <fieldset>\n    <legend style=\"display: none\">{{ attribute.label }}</legend>\n    <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attribute?.values[0].valueCode\n              )\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [value]=\"attribute?.values[0].valueCode\"\n            [cxFocus]=\"{\n              key: attribute.name + '-' + attribute?.values[0].name\n            }\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForm\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              attribute?.values[0].valuePrice &&\n              attribute?.values[0].valuePrice?.value !== 0\n                ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                  | cxTranslate\n                    : {\n                        value: attribute?.values[0].valueDisplay,\n                        attribute: attribute.label,\n                        price: attribute?.values[0].valuePrice.formattedValue\n                      })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : {\n                        value: attribute?.values[0].valueDisplay,\n                        attribute: attribute.label\n                      })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name) +\n              ' ' +\n              createAttributeUiKey('attribute-msg', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey(\n                'label',\n                attribute.name,\n                attribute?.values[0].valueCode\n              )\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attribute?.values[0].valueCode\n              )\n            }}\"\n            aria-hidden=\"true\"\n            class=\"form-check-label\"\n            >{{ attribute?.values[0].valueDisplay }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(attribute?.values[0])\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n    </div>\n  </fieldset>\n</ng-container>\n" }]
        }], propDecorators: { attribute: [{
                type: Input
            }], group: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCheckboxModule {
}
ConfiguratorAttributeCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, declarations: [ConfiguratorAttributeCheckBoxComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeCheckBoxComponent] });
ConfiguratorAttributeCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeCheckBoxComponent],
                    exports: [ConfiguratorAttributeCheckBoxComponent],
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
class ConfiguratorAttributeInputFieldComponent extends ConfiguratorAttributeBaseComponent {
    constructor(config) {
        super();
        this.config = config;
        this.attributeInputForm = new UntypedFormControl('');
        this.inputChange = new EventEmitter();
        /**
         * In case no config is injected, or when the debounce time is not configured at all,
         * this value will be used as fallback.
         */
        this.FALLBACK_DEBOUNCE_TIME = 500;
    }
    ngOnInit() {
        this.attributeInputForm.setValue(this.attribute.userInput);
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    onChange() {
        const event = {
            ownerKey: this.ownerKey,
            changedAttribute: {
                ...this.attribute,
                userInput: this.attributeInputForm.value,
            },
        };
        if (!this.attributeInputForm.invalid) {
            this.inputChange.emit(event);
        }
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    /**
     * Checks if the component needs to be marked as required.
     * This is never the case if it is used as sub component for an attribute type which allows an additional value
     * @returns Required?
     */
    get isRequired() {
        const isNonDomainAttributeType = this.attribute.uiType === Configurator.UiType.STRING ||
            this.attribute.uiType === Configurator.UiType.NUMERIC;
        return isNonDomainAttributeType ? this.attribute.required ?? false : false;
    }
}
ConfiguratorAttributeInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldComponent, deps: [{ token: ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field", inputs: { ownerType: "ownerType", attribute: "attribute", group: "group", ownerKey: "ownerKey" }, outputs: { inputChange: "inputChange" }, usesInheritance: true, ngImport: i0, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    attr.required=\"{{ attribute.required }}\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"\n      attribute.userInput === undefined || attribute.userInput.length === 0\n        ? ('configurator.a11y.valueOfAttributeBlank'\n          | cxTranslate\n            : {\n                attribute: attribute.label\n              })\n        : ('configurator.a11y.valueOfAttributeFull'\n          | cxTranslate\n            : {\n                value: attribute.userInput,\n                attribute: attribute.label\n              })\n    \"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    attr.required=\"{{ attribute.required }}\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"\n      attribute.userInput === undefined || attribute.userInput.length === 0\n        ? ('configurator.a11y.valueOfAttributeBlank'\n          | cxTranslate\n            : {\n                attribute: attribute.label\n              })\n        : ('configurator.a11y.valueOfAttributeFull'\n          | cxTranslate\n            : {\n                value: attribute.userInput,\n                attribute: attribute.label\n              })\n    \"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorUISettingsConfig }]; }, propDecorators: { ownerType: [{
                type: Input
            }], attribute: [{
                type: Input
            }], group: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], inputChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Provides validation and formatting of numeric input
 */
class ConfiguratorAttributeNumericInputFieldService {
    /**
     * Validates numeric input according to settings that are not derived from the locale but from the attribute
     * meta data like the total number of digits and the maximum number of decimal places.
     *
     * @param input Numeric user input, formatted according to session locale
     * @param groupingSeparator Separator for grouping, e.g. ',' for 'en' locale. We allow the grouping separator but
     *   do not check exactly on the position of it in the numerical input. This e.g. is ok: '12,12,12', will be converted
     *   to '121,212' after the next roundtrip
     * @param decimalSeparator  Decimal separator, e.g. '.' for 'en' locale. Must not occur more that 1 time in the input.
     * @param numberTotalPlaces  Total number of places e.g. 10
     * @param numberDecimalPlaces  Number of decimal places e.g. 2
     *  @returns {boolean} Did we see a validation error?
     */
    performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces, numberDecimalPlaces) {
        const escape = '\\';
        const search = new RegExp(escape + groupingSeparator, 'g');
        const woGrouping = input.replace(search, '');
        const splitParts = woGrouping.split(decimalSeparator);
        if (splitParts.length > 2) {
            return true;
        }
        if (splitParts.length === 1) {
            return woGrouping.length > numberTotalPlaces - numberDecimalPlaces;
        }
        return (splitParts[0].length > numberTotalPlaces - numberDecimalPlaces ||
            splitParts[1].length > numberDecimalPlaces);
    }
    formatIntervalValue(intervalValue, decimalPlaces, locale) {
        if (decimalPlaces === undefined) {
            decimalPlaces = 0;
        }
        let formatted = formatNumber(intervalValue, locale, '1.' + decimalPlaces + '-' + decimalPlaces);
        return formatted;
    }
    /**
     * Parses the value names and returns the intervals.
     *
     * @param values values of the attribute
     * @returns {ConfiguratorAttributeNumericInterval[]} parsed intervals
     */
    getIntervals(values) {
        const intervals = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                let interval = this.getInterval(value);
                if (interval && Object.keys(interval).length !== 0) {
                    intervals.push(interval);
                }
            });
        }
        return intervals;
    }
    /**
     * Parses the value name and returns the interval structure.
     * Valid interval strings:
     * Standard Interval
     * 5 - 10
     * 5 - <10
     * >5 - 10
     * >5 - <10
     * -10 - -5
     * 1.25 - 1.35
     *
     * Infinite Interval
     * >5
     * >=5
     * <5
     * <=5
     * >-5
     *
     * @param value value which will be parsed
     * @returns {ConfiguratorAttributeNumericInterval} parsed interval
     */
    getInterval(value) {
        let interval = {
            minValue: undefined,
            maxValue: undefined,
            minValueIncluded: false,
            maxValueIncluded: false,
        };
        if (!value || !value.name || value.selected) {
            return undefined;
        }
        let minVal = '';
        let maxVal = '';
        // standard interval a - b
        if (value.name.includes(' - ')) {
            let index = value.name.indexOf(' - ');
            minVal = value.name.substring(0, index);
            maxVal = value.name.substring(index + 3, value.name.length);
            interval.minValueIncluded = true;
            interval.maxValueIncluded = true;
            if (minVal.includes('>')) {
                interval.minValueIncluded = false;
                minVal = minVal.replace('>', '');
            }
            if (maxVal.includes('<')) {
                interval.maxValueIncluded = false;
                maxVal = maxVal.replace('<', '');
            }
            // infinite interval or single value
        }
        else {
            if (value.name.includes('>')) {
                minVal = value.name;
                interval.minValueIncluded = false;
                minVal = minVal.replace('>', '');
            }
            if (value.name.includes('<')) {
                maxVal = value.name;
                interval.maxValueIncluded = false;
                maxVal = maxVal.replace('<', '');
            }
            if (value.name.includes('≥')) {
                minVal = value.name;
                interval.minValueIncluded = true;
                minVal = minVal.replace('≥', '');
            }
            if (value.name.includes('≤')) {
                maxVal = value.name;
                interval.maxValueIncluded = true;
                maxVal = maxVal.replace('≤', '');
            }
            if (!value.name.includes('>') &&
                !value.name.includes('<') &&
                !value.name.includes('≤') &&
                !value.name.includes('≥')) {
                minVal = value.name;
                maxVal = value.name;
            }
        }
        if (minVal && minVal.length > 0) {
            interval.minValue = +minVal;
        }
        if (maxVal && maxVal.length > 0) {
            interval.maxValue = +maxVal;
        }
        return interval;
    }
    /**
     * Get pattern for the message that is displayed when the validation fails. This message e.g. looks like
     * 'Wrong format, this numerical attribute should be entered according to pattern ##,###,###.##'
     * for the 'en' locale for an attribute with total length of 10 and 2 decimal places.
     *
     * @param decimalPlaces Number of decimal places
     * @param totalLength Total number of digits
     * @param negativeAllowed Do we allow negative input?
     * @param locale  Locale
     *  @returns {string} The pattern that we display in the validation message
     */
    getPatternForValidationMessage(decimalPlaces, totalLength, negativeAllowed, locale) {
        let input = (10 ** totalLength - 1).toString();
        if (decimalPlaces > 0) {
            input =
                input.substring(0, totalLength - decimalPlaces) +
                    '.' +
                    input.substring(totalLength - decimalPlaces, totalLength);
        }
        const inputAsNumber = Number(input);
        let formatted = formatNumber(inputAsNumber, locale, '1.' + decimalPlaces + '-' + decimalPlaces).replace(/9/g, '#');
        if (negativeAllowed) {
            formatted = '-' + formatted;
        }
        return formatted;
    }
    /**
     * Returns the validator for the input component that represents numeric input.
     * The validator only allows the grouping separator, the decimal separator, an optional '-' sign,
     * and the digits between 0..9. This validator does not support the scientific notation of
     * attributes.
     *
     * @param locale The locale
     * @param numberDecimalPlaces Number of decimal places
     * @param numberTotalPlaces  Total number of digits
     * @param negativeAllowed: Do we allow negative input?
     * @returns {ValidatorFn} The validator
     */
    getNumberFormatValidator(locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) {
        return (control) => {
            const input = control.value;
            if (input) {
                //allowed: only numbers and separators
                const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
                const decimalSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Decimal);
                const expressionPrefix = negativeAllowed ? '^-?' : '^';
                const expressionOnlyNumericalInput = new RegExp(expressionPrefix +
                    '[0123456789' +
                    groupingSeparator +
                    decimalSeparator +
                    ']*$');
                if (!expressionOnlyNumericalInput.test(input)) {
                    return this.createValidationError(true);
                }
                return this.createValidationError(this.performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces + (input.includes('-') ? 1 : 0), numberDecimalPlaces));
            }
            return null;
        };
    }
    createValidationError(isError) {
        return isError ? { wrongFormat: {} } : null;
    }
}
ConfiguratorAttributeNumericInputFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeNumericInputFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DefaultSettings {
}
class ConfiguratorAttributeNumericInputFieldComponent extends ConfiguratorAttributeInputFieldComponent {
    constructor(configAttributeNumericInputFieldService, config, translation) {
        super(config);
        this.configAttributeNumericInputFieldService = configAttributeNumericInputFieldService;
        this.config = config;
        this.translation = translation;
        this.iconType = ICON_TYPE;
        this.intervals = [];
    }
    /**
     * Do we need to display a validation message
     */
    mustDisplayValidationMessage() {
        const wrongFormat = (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
            this.attributeInputForm.errors?.wrongFormat;
        return wrongFormat;
    }
    ngOnInit() {
        //locales are available as 'languages' in the commerce backend
        this.locale = this.getInstalledLocale(this.language);
        let numDecimalPlaces = this.attribute.numDecimalPlaces;
        let numTotalLength = this.attribute.numTotalLength;
        let negativeAllowed = this.attribute.negativeAllowed;
        if (numDecimalPlaces === undefined ||
            numTotalLength === undefined ||
            negativeAllowed === undefined) {
            //This won't happen in environments with the standard configurators deployed, as numeric
            //attributes do carry these settings. We still introduce default values to ease development
            //of extension use cases, but log a warning
            const defaultSettings = this.getDefaultSettings();
            numDecimalPlaces = defaultSettings.numDecimalPlaces;
            numTotalLength = defaultSettings.numTotalLength;
            negativeAllowed = defaultSettings.negativeAllowed;
            if (isDevMode()) {
                console.warn('Meta data for numeric attribute not present, falling back to defaults');
            }
        }
        this.attributeInputForm = new UntypedFormControl('', [
            this.configAttributeNumericInputFieldService.getNumberFormatValidator(this.locale, numDecimalPlaces, numTotalLength, negativeAllowed),
        ]);
        this.numericFormatPattern =
            this.configAttributeNumericInputFieldService.getPatternForValidationMessage(numDecimalPlaces, numTotalLength, negativeAllowed, this.locale);
        if (this.attribute.userInput) {
            this.attributeInputForm.setValue(this.attribute.userInput);
        }
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        if (this.attribute.intervalInDomain) {
            this.intervals =
                this.configAttributeNumericInputFieldService.getIntervals(this.attribute.values);
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    /**
     * Returns a concatenated help text for multiple intervals.
     */
    getHelpTextForInterval() {
        let intervalText = '';
        let concatenatedIntervalText = '';
        this.intervals.forEach((interval, index) => {
            intervalText = this.getIntervalText(interval);
            if (index > 0) {
                intervalText =
                    intervalText.charAt(0).toLowerCase() + intervalText.slice(1);
                this.translation
                    .translate('configurator.a11y.combinedIntervalsText', {
                    combinedInterval: concatenatedIntervalText,
                    newInterval: intervalText,
                })
                    .pipe(take(1))
                    .subscribe((text) => (concatenatedIntervalText = text));
            }
            else {
                concatenatedIntervalText = intervalText;
            }
        });
        return concatenatedIntervalText.trim();
    }
    /**
     * Returns the combined aria text for attribute and value and the interval help text
     */
    getAriaLabelComplete() {
        let completeAriaText = '';
        if (this.attribute.userInput?.length === 0) {
            this.translation
                .translate('configurator.a11y.valueOfAttributeBlank', {
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.valueOfAttributeFull', {
                value: this.attribute.userInput,
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        completeAriaText += ' ';
        completeAriaText += this.getHelpTextForInterval();
        return completeAriaText;
    }
    getIntervalText(interval) {
        let intervalText = '';
        let formattedMinValue = '';
        let formattedMaxValue = '';
        if (interval.minValue) {
            formattedMinValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.minValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.maxValue) {
            formattedMaxValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.maxValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.minValue && interval.maxValue) {
            if (interval.minValue === interval.maxValue) {
                this.translation
                    .translate('configurator.a11y.numericIntervalSingleValue', {
                    value: formattedMinValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (intervalText = text));
                return intervalText;
            }
            this.translation
                .translate('configurator.a11y.numericIntervalStandard', {
                minValue: formattedMinValue,
                maxValue: formattedMaxValue,
            })
                .pipe(take(1))
                .subscribe((text) => (intervalText = text));
            if (!interval.minValueIncluded || !interval.maxValueIncluded) {
                if (!interval.minValueIncluded && !interval.maxValueIncluded) {
                    intervalText += ' ';
                    intervalText += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardOpen');
                }
                else {
                    if (!interval.minValueIncluded) {
                        intervalText += ' ';
                        intervalText += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded');
                    }
                    if (!interval.maxValueIncluded) {
                        intervalText += ' ';
                        intervalText += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded');
                    }
                }
            }
        }
        else {
            if (interval.minValue) {
                if (interval.minValueIncluded) {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValueIncluded', formattedMinValue);
                }
                else {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValue', formattedMinValue);
                }
            }
            else {
                if (interval.maxValue) {
                    if (interval.maxValueIncluded) {
                        intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValueIncluded', formattedMaxValue);
                    }
                    else {
                        intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValue', formattedMaxValue);
                    }
                }
            }
        }
        return intervalText;
    }
    getAdditionalIntervalText(key) {
        let intervalText = '';
        this.translation
            .translate(key)
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getInfiniteIntervalText(key, value) {
        let intervalText = '';
        this.translation
            .translate(key, {
            value: value,
        })
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getDefaultSettings() {
        return { numDecimalPlaces: 2, numTotalLength: 6, negativeAllowed: false };
    }
    getInstalledLocale(locale) {
        try {
            getLocaleId(locale);
            return locale;
        }
        catch {
            this.reportMissingLocaleData(locale);
            return 'en';
        }
    }
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            console.warn(`ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
ConfiguratorAttributeNumericInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, deps: [{ token: ConfiguratorAttributeNumericInputFieldService }, { token: ConfiguratorUISettingsConfig }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeNumericInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", inputs: { language: "language" }, usesInheritance: true, ngImport: i0, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    [attr.aria-describedby]=\"\n      mustDisplayValidationMessage()\n        ? createAttributeUiKey('label', attribute.name) +\n          ' ' +\n          createAttributeUiKey('attribute-msg', attribute.name)\n        : createAttributeUiKey('label', attribute.name)\n    \"\n    attr.role=\"{{ attribute.dataType }}\"\n    attr.required=\"{{ attribute.required }}\"\n    (change)=\"onChange()\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"getAriaLabelComplete()\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n  {{\n    'configurator.attribute.wrongNumericFormat'\n      | cxTranslate: { pattern: numericFormatPattern }\n  }}\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-numeric-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    [required]=\"isRequired\"\n    class=\"form-control\"\n    [attr.aria-describedby]=\"\n      mustDisplayValidationMessage()\n        ? createAttributeUiKey('label', attribute.name) +\n          ' ' +\n          createAttributeUiKey('attribute-msg', attribute.name)\n        : createAttributeUiKey('label', attribute.name)\n    \"\n    attr.role=\"{{ attribute.dataType }}\"\n    attr.required=\"{{ attribute.required }}\"\n    (change)=\"onChange()\"\n    maxlength=\"{{ attribute.maxlength }}\"\n    [attr.aria-label]=\"getAriaLabelComplete()\"\n    [cxFocus]=\"{\n      key: createAttributeIdForConfigurator(attribute)\n    }\"\n  />\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n  {{\n    'configurator.attribute.wrongNumericFormat'\n      | cxTranslate: { pattern: numericFormatPattern }\n  }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeNumericInputFieldService }, { type: ConfiguratorUISettingsConfig }, { type: i1$1.TranslationService }]; }, propDecorators: { language: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeDropDownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    constructor(quantityService, translation) {
        super(quantityService, translation);
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeDropDownForm = new UntypedFormControl('');
    }
    ngOnInit() {
        this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
    }
    getSelectedValue() {
        return this.attribute.values?.find((value) => value?.selected);
    }
}
ConfiguratorAttributeDropDownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeDropDownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeDropDownComponent, selector: "cx-configurator-attribute-drop-down", inputs: { group: "group" }, usesInheritance: true, ngImport: i0, template: "<div\n  class=\"form-group\"\n  *ngIf=\"attribute.values && attribute.values.length !== 0\"\n>\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values.length\n            }\n    }}\n  </label>\n  <select\n    id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"form-control\"\n    [formControl]=\"attributeDropDownForm\"\n    [cxFocus]=\"{ key: attribute.name }\"\n    (change)=\"onSelect(attributeDropDownForm.value)\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n  >\n    <option\n      *ngFor=\"let item of attribute.values\"\n      [label]=\"item.valueDisplay\"\n      [selected]=\"item.selected\"\n      [attr.aria-label]=\"getAriaLabel(item, attribute)\"\n      [value]=\"item.valueCode\"\n    >\n      {{ item.valueDisplay }}\n    </option>\n  </select>\n  <div\n    *ngIf=\"!withQuantity && getSelectedValue()?.valuePrice\"\n    class=\"cx-value-price\"\n  >\n    <cx-configurator-price\n      [formula]=\"extractValuePriceFormulaParameters(getSelectedValue())\"\n    ></cx-configurator-price>\n  </div>\n</div>\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n\n<cx-configurator-attribute-numeric-input-field\n  *ngIf=\"isAdditionalValueNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attribute]=\"attribute\"\n  [ownerType]=\"ownerType\"\n  [ownerKey]=\"ownerKey\"\n  [language]=\"language\"\n  (inputChange)=\"onSelectAdditionalValue($event)\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n></cx-configurator-attribute-numeric-input-field>\n\n<cx-configurator-attribute-input-field\n  *ngIf=\"isAdditionalValueAlphaNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attribute]=\"attribute\"\n  [ownerType]=\"ownerType\"\n  [ownerKey]=\"ownerKey\"\n  (inputChange)=\"onSelectAdditionalValue($event)\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n>\n</cx-configurator-attribute-input-field>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "directive", type: i5.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "component", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", inputs: ["language"] }, { kind: "component", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field", inputs: ["ownerType", "attribute", "group", "ownerKey"], outputs: ["inputChange"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-drop-down', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"form-group\"\n  *ngIf=\"attribute.values && attribute.values.length !== 0\"\n>\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values.length\n            }\n    }}\n  </label>\n  <select\n    id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"form-control\"\n    [formControl]=\"attributeDropDownForm\"\n    [cxFocus]=\"{ key: attribute.name }\"\n    (change)=\"onSelect(attributeDropDownForm.value)\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n  >\n    <option\n      *ngFor=\"let item of attribute.values\"\n      [label]=\"item.valueDisplay\"\n      [selected]=\"item.selected\"\n      [attr.aria-label]=\"getAriaLabel(item, attribute)\"\n      [value]=\"item.valueCode\"\n    >\n      {{ item.valueDisplay }}\n    </option>\n  </select>\n  <div\n    *ngIf=\"!withQuantity && getSelectedValue()?.valuePrice\"\n    class=\"cx-value-price\"\n  >\n    <cx-configurator-price\n      [formula]=\"extractValuePriceFormulaParameters(getSelectedValue())\"\n    ></cx-configurator-price>\n  </div>\n</div>\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n\n<cx-configurator-attribute-numeric-input-field\n  *ngIf=\"isAdditionalValueNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attribute]=\"attribute\"\n  [ownerType]=\"ownerType\"\n  [ownerKey]=\"ownerKey\"\n  [language]=\"language\"\n  (inputChange)=\"onSelectAdditionalValue($event)\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n></cx-configurator-attribute-numeric-input-field>\n\n<cx-configurator-attribute-input-field\n  *ngIf=\"isAdditionalValueAlphaNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attribute]=\"attribute\"\n  [ownerType]=\"ownerType\"\n  [ownerKey]=\"ownerKey\"\n  (inputChange)=\"onSelectAdditionalValue($event)\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n>\n</cx-configurator-attribute-input-field>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }]; }, propDecorators: { group: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeNumericInputFieldModule {
}
ConfiguratorAttributeNumericInputFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeNumericInputFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, declarations: [ConfiguratorAttributeNumericInputFieldComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule], exports: [ConfiguratorAttributeNumericInputFieldComponent] });
ConfiguratorAttributeNumericInputFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                    ],
                    declarations: [ConfiguratorAttributeNumericInputFieldComponent],
                    exports: [ConfiguratorAttributeNumericInputFieldComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeInputFieldModule {
}
ConfiguratorAttributeInputFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeInputFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, declarations: [ConfiguratorAttributeInputFieldComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule], exports: [ConfiguratorAttributeInputFieldComponent] });
ConfiguratorAttributeInputFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                    ],
                    declarations: [ConfiguratorAttributeInputFieldComponent],
                    exports: [ConfiguratorAttributeInputFieldComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeDropDownModule {
}
ConfiguratorAttributeDropDownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeDropDownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, declarations: [ConfiguratorAttributeDropDownComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule], exports: [ConfiguratorAttributeDropDownComponent] });
ConfiguratorAttributeDropDownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeDropDownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                    ],
                    declarations: [ConfiguratorAttributeDropDownComponent],
                    exports: [ConfiguratorAttributeDropDownComponent],
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
class ConfiguratorAttributeMultiSelectionBundleComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
    constructor() {
        super(...arguments);
        this.preventAction$ = new BehaviorSubject(false);
        this.multipleSelectionValues = [];
    }
    ngOnInit() {
        this.initialize();
    }
    /**
     * Initializes selection values and peventAction observable
     */
    initialize() {
        if (this.attribute.values && this.attribute.values.length > 0) {
            this.multipleSelectionValues = this.attribute.values.map(({ name, quantity, selected, valueCode }) => ({
                name,
                quantity,
                selected,
                valueCode,
            }));
        }
        if (this.attribute.required &&
            this.multipleSelectionValues.filter((value) => value.selected).length < 2) {
            this.preventAction$.next(true);
        }
    }
    /**
     * Updates the value dependent on the provided state
     *
     * @param  {any} valueCode - value code to be updated
     * @param  {any} state - selected state
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValues(valueCode, state) {
        const index = this.multipleSelectionValues.findIndex((value) => value.valueCode === valueCode);
        this.multipleSelectionValues[index] = {
            ...this.multipleSelectionValues[index],
            selected: state,
        };
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: this.multipleSelectionValues,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        return event;
    }
    /**
     * Updates the quantity of the given value
     *
     * @param  eventValue - event value
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValuesQuantity(eventValue) {
        const value = this.multipleSelectionValues.find((selectionValue) => selectionValue.valueCode === eventValue.valueCode);
        if (!value) {
            return;
        }
        value.quantity = eventValue.quantity;
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [value],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.VALUE_QUANTITY,
        };
        return event;
    }
    onSelect(eventValue) {
        this.loading$.next(true);
        this.selectionChange.emit(this.updateMultipleSelectionValues(eventValue, true));
    }
    onDeselect(eventValue) {
        this.loading$.next(true);
        this.selectionChange.emit(this.updateMultipleSelectionValues(eventValue, false));
    }
    onDeselectAll() {
        this.loading$.next(true);
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        this.selectionChange.emit(event);
    }
    onChangeValueQuantity(eventValue) {
        this.loading$.next(true);
        this.selectionChange.emit(this.updateMultipleSelectionValuesQuantity(eventValue));
    }
    onChangeAttributeQuantity(eventObject) {
        this.loading$.next(true);
        if (!eventObject) {
            this.onDeselectAll();
        }
        else {
            this.onHandleAttributeQuantity(eventObject);
        }
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding product card parameters
     * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading
     * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(disableAllButtons, hideRemoveButton, value, index) {
        return {
            disableAllButtons: disableAllButtons ?? false,
            hideRemoveButton: hideRemoveButton ?? false,
            productBoundValue: value,
            multiSelect: true,
            withQuantity: this.withQuantity,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeLabel: this.attribute.label,
            attributeName: this.attribute.name,
            itemCount: this.attribute.values?.length
                ? this.attribute.values.length
                : 0,
            itemIndex: index,
        };
    }
}
ConfiguratorAttributeMultiSelectionBundleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeMultiSelectionBundleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeMultiSelectionBundleComponent, selector: "cx-configurator-attribute-multi-selection-bundle", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{\n      createAttributeValueIdForConfigurator(attribute, value?.valueCode)\n    }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-multi-selection-bundle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{\n      createAttributeValueIdForConfigurator(attribute, value?.valueCode)\n    }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeMultiSelectionBundleModule {
}
ConfiguratorAttributeMultiSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeMultiSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, declarations: [ConfiguratorAttributeMultiSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeMultiSelectionBundleComponent] });
ConfiguratorAttributeMultiSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
                    exports: [ConfiguratorAttributeMultiSelectionBundleComponent],
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
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
class ConfiguratorAttributeMultiSelectionImageComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtilsService) {
        super();
        this.configUtilsService = configUtilsService;
        this.selectionChange = new EventEmitter();
        this.attributeCheckBoxForms = new Array();
    }
    ngOnInit() {
        const values = this.attribute.values;
        if (values) {
            for (const value of values) {
                let attributeCheckBoxForm;
                if (value.selected) {
                    attributeCheckBoxForm = new UntypedFormControl(true);
                }
                else {
                    attributeCheckBoxForm = new UntypedFormControl(false);
                }
                this.attributeCheckBoxForms.push(attributeCheckBoxForm);
            }
        }
    }
    /**
     * Fired when a value has been selected
     * @param index Index of selected value
     */
    onSelect(index) {
        this.attributeCheckBoxForms[index].setValue(!this.attributeCheckBoxForms[index].value);
        const selectedValues = this.configUtilsService.assembleValuesForMultiSelectAttributes(this.attributeCheckBoxForms, this.attribute);
        const event = {
            ownerKey: this.ownerKey,
            changedAttribute: {
                ...this.attribute,
                values: selectedValues,
            },
        };
        this.selectionChange.emit(event);
    }
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeMultiSelectionImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeMultiSelectionImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeMultiSelectionImageComponent, selector: "cx-configurator-attribute-multi-selection-image", inputs: { attribute: "attribute", ownerKey: "ownerKey" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"cx-row\">\n  <div\n    *ngFor=\"let value of attribute.values; let i = index\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"checkbox\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      [formControl]=\"attributeCheckBoxForms[i]\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      (click)=\"onSelect(i)\"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [attr.checked]=\"attributeCheckBoxForms[i].value ? 'checked' : null\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label\"\n      >\n        <img\n          *ngIf=\"value.images[0]\"\n          class=\"cx-img\"\n          src=\"{{ value.images[0].url }}\"\n          alt=\"{{ value.images[0].altText }}\"\n        />\n        <div *ngIf=\"!value.images[0]\" class=\"cx-img-dummy\"></div>\n        {{ value.valueDisplay }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-multi-selection-image', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"cx-row\">\n  <div\n    *ngFor=\"let value of attribute.values; let i = index\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"checkbox\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      [formControl]=\"attributeCheckBoxForms[i]\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      (click)=\"onSelect(i)\"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [attr.checked]=\"attributeCheckBoxForms[i].value ? 'checked' : null\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label\"\n      >\n        <img\n          *ngIf=\"value.images[0]\"\n          class=\"cx-img\"\n          src=\"{{ value.images[0].url }}\"\n          alt=\"{{ value.images[0].altText }}\"\n        />\n        <div *ngIf=\"!value.images[0]\" class=\"cx-img-dummy\"></div>\n        {{ value.valueDisplay }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }]; }, propDecorators: { attribute: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeMultiSelectionImageModule {
}
ConfiguratorAttributeMultiSelectionImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeMultiSelectionImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, declarations: [ConfiguratorAttributeMultiSelectionImageComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeMultiSelectionImageComponent] });
ConfiguratorAttributeMultiSelectionImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeMultiSelectionImageComponent],
                    exports: [ConfiguratorAttributeMultiSelectionImageComponent],
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
class ConfiguratorAttributeRadioButtonComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    constructor(quantityService, translation) {
        super(quantityService, translation);
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeRadioButtonForm = new UntypedFormControl('');
    }
    ngOnInit() {
        this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
    }
}
ConfiguratorAttributeRadioButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeRadioButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeRadioButtonComponent, selector: "cx-configurator-attribute-radio-button", usesInheritance: true, ngImport: i0, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"extractQuantityParameters()\"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n\n    <div class=\"form-check\" *ngFor=\"let value of attribute.values\">\n      <div class=\"cx-value-label-pair\">\n        <input\n          id=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          class=\"form-check-input\"\n          type=\"radio\"\n          formcontrolname=\"attributeRadioButtonForm\"\n          [formControl]=\"attributeRadioButtonForm\"\n          [attr.required]=\"attribute.required\"\n          [value]=\"value.valueCode\"\n          name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n          [attr.aria-label]=\"getAriaLabel(value, attribute)\"\n          [attr.checked]=\"\n            attributeRadioButtonForm.value === value.valueCode\n              ? 'checked'\n              : null\n          \"\n          [attr.aria-describedby]=\"\n            createAttributeUiKey('label', attribute.name)\n          \"\n          (change)=\"onSelect(value.valueCode)\"\n        />\n        <label\n          id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n          for=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          aria-hidden=\"true\"\n          class=\"form-check-label form-radio-label\"\n          >{{ value.valueDisplay }}</label\n        >\n      </div>\n\n      <div class=\"cx-value-price\">\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </div>\n    </div>\n\n    <cx-configurator-attribute-numeric-input-field\n      *ngIf=\"isAdditionalValueNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n      [attribute]=\"attribute\"\n      [ownerType]=\"ownerType\"\n      [ownerKey]=\"ownerKey\"\n      [language]=\"language\"\n      (inputChange)=\"onSelectAdditionalValue($event)\"\n    ></cx-configurator-attribute-numeric-input-field>\n\n    <cx-configurator-attribute-input-field\n      *ngIf=\"isAdditionalValueAlphaNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n      [attribute]=\"attribute\"\n      [ownerType]=\"ownerType\"\n      [ownerKey]=\"ownerKey\"\n      (inputChange)=\"onSelectAdditionalValue($event)\"\n    >\n    </cx-configurator-attribute-input-field>\n  </div>\n</fieldset>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "component", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", inputs: ["language"] }, { kind: "component", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field", inputs: ["ownerType", "attribute", "group", "ownerKey"], outputs: ["inputChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-radio-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"extractQuantityParameters()\"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n\n    <div class=\"form-check\" *ngFor=\"let value of attribute.values\">\n      <div class=\"cx-value-label-pair\">\n        <input\n          id=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          class=\"form-check-input\"\n          type=\"radio\"\n          formcontrolname=\"attributeRadioButtonForm\"\n          [formControl]=\"attributeRadioButtonForm\"\n          [attr.required]=\"attribute.required\"\n          [value]=\"value.valueCode\"\n          name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n          [attr.aria-label]=\"getAriaLabel(value, attribute)\"\n          [attr.checked]=\"\n            attributeRadioButtonForm.value === value.valueCode\n              ? 'checked'\n              : null\n          \"\n          [attr.aria-describedby]=\"\n            createAttributeUiKey('label', attribute.name)\n          \"\n          (change)=\"onSelect(value.valueCode)\"\n        />\n        <label\n          id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n          for=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          aria-hidden=\"true\"\n          class=\"form-check-label form-radio-label\"\n          >{{ value.valueDisplay }}</label\n        >\n      </div>\n\n      <div class=\"cx-value-price\">\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </div>\n    </div>\n\n    <cx-configurator-attribute-numeric-input-field\n      *ngIf=\"isAdditionalValueNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n      [attribute]=\"attribute\"\n      [ownerType]=\"ownerType\"\n      [ownerKey]=\"ownerKey\"\n      [language]=\"language\"\n      (inputChange)=\"onSelectAdditionalValue($event)\"\n    ></cx-configurator-attribute-numeric-input-field>\n\n    <cx-configurator-attribute-input-field\n      *ngIf=\"isAdditionalValueAlphaNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n      [attribute]=\"attribute\"\n      [ownerType]=\"ownerType\"\n      [ownerKey]=\"ownerKey\"\n      (inputChange)=\"onSelectAdditionalValue($event)\"\n    >\n    </cx-configurator-attribute-input-field>\n  </div>\n</fieldset>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeRadioButtonModule {
}
ConfiguratorAttributeRadioButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeRadioButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, declarations: [ConfiguratorAttributeRadioButtonComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule], exports: [ConfiguratorAttributeRadioButtonComponent] });
ConfiguratorAttributeRadioButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                    ],
                    declarations: [ConfiguratorAttributeRadioButtonComponent],
                    exports: [ConfiguratorAttributeRadioButtonComponent],
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
class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorAttributeBaseComponent {
}
ConfiguratorAttributeReadOnlyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeReadOnlyComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeReadOnlyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeReadOnlyComponent, selector: "cx-configurator-attribute-read-only", inputs: { attribute: "attribute", group: "group" }, usesInheritance: true, ngImport: i0, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n  <ng-container\n    *ngIf=\"\n      attribute.values !== undefined && attribute.values.length > 0;\n      else noStaticDomain\n    \"\n  >\n    <ng-container *ngFor=\"let value of attribute.values\">\n      <span\n        *ngIf=\"value.selected\"\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        tabindex=\"0\"\n        class=\"cx-visually-hidden\"\n      >\n        {{\n          'configurator.a11y.readOnlyValueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label\n                }\n        }}\n      </span>\n      <div class=\"cx-read-only-label\" *ngIf=\"value.selected\" aria-hidden=\"true\">\n        <span aria-hidden=\"true\">{{ value.valueDisplay }}</span>\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-template #noStaticDomain>\n    <ng-container *ngIf=\"attribute.selectedSingleValue\">\n      <span\n        id=\"{{\n          createValueUiKey(\n            'label',\n            attribute.name,\n            attribute.selectedSingleValue\n          )\n        }}\"\n        tabindex=\"0\"\n        class=\"cx-visually-hidden\"\n      >\n        {{\n          'configurator.a11y.readOnlyValueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.selectedSingleValue,\n                  attribute: attribute.label\n                }\n        }}\n      </span>\n      <div class=\"cx-read-only-label\" aria-hidden=\"true\">\n        <span aria-hidden=\"true\">{{ attribute.selectedSingleValue }}</span>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"attribute.userInput\">\n      <span\n        id=\"{{\n          createValueUiKey('label', attribute.name, attribute.userInput)\n        }}\"\n        tabindex=\"0\"\n        class=\"cx-visually-hidden\"\n      >\n        {{\n          'configurator.a11y.readOnlyValueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.userInput,\n                  attribute: attribute.label\n                }\n        }}\n      </span>\n      <div class=\"cx-read-only-label\">\n        <span aria-hidden=\"true\">{{ attribute.userInput }}</span>\n      </div>\n    </ng-container>\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeReadOnlyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-read-only', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n  <ng-container\n    *ngIf=\"\n      attribute.values !== undefined && attribute.values.length > 0;\n      else noStaticDomain\n    \"\n  >\n    <ng-container *ngFor=\"let value of attribute.values\">\n      <span\n        *ngIf=\"value.selected\"\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        tabindex=\"0\"\n        class=\"cx-visually-hidden\"\n      >\n        {{\n          'configurator.a11y.readOnlyValueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label\n                }\n        }}\n      </span>\n      <div class=\"cx-read-only-label\" *ngIf=\"value.selected\" aria-hidden=\"true\">\n        <span aria-hidden=\"true\">{{ value.valueDisplay }}</span>\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-template #noStaticDomain>\n    <ng-container *ngIf=\"attribute.selectedSingleValue\">\n      <span\n        id=\"{{\n          createValueUiKey(\n            'label',\n            attribute.name,\n            attribute.selectedSingleValue\n          )\n        }}\"\n        tabindex=\"0\"\n        class=\"cx-visually-hidden\"\n      >\n        {{\n          'configurator.a11y.readOnlyValueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.selectedSingleValue,\n                  attribute: attribute.label\n                }\n        }}\n      </span>\n      <div class=\"cx-read-only-label\" aria-hidden=\"true\">\n        <span aria-hidden=\"true\">{{ attribute.selectedSingleValue }}</span>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"attribute.userInput\">\n      <span\n        id=\"{{\n          createValueUiKey('label', attribute.name, attribute.userInput)\n        }}\"\n        tabindex=\"0\"\n        class=\"cx-visually-hidden\"\n      >\n        {{\n          'configurator.a11y.readOnlyValueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.userInput,\n                  attribute: attribute.label\n                }\n        }}\n      </span>\n      <div class=\"cx-read-only-label\">\n        <span aria-hidden=\"true\">{{ attribute.userInput }}</span>\n      </div>\n    </ng-container>\n  </ng-template>\n</div>\n" }]
        }], propDecorators: { attribute: [{
                type: Input
            }], group: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeReadOnlyModule {
}
ConfiguratorAttributeReadOnlyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeReadOnlyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, declarations: [ConfiguratorAttributeReadOnlyComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule], exports: [ConfiguratorAttributeReadOnlyComponent] });
ConfiguratorAttributeReadOnlyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                    ],
                    declarations: [ConfiguratorAttributeReadOnlyComponent],
                    exports: [ConfiguratorAttributeReadOnlyComponent],
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
class ConfiguratorAttributeSingleSelectionBundleDropdownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    constructor() {
        super(...arguments);
        this.attributeDropDownForm = new UntypedFormControl('');
    }
    ngOnInit() {
        this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
        const values = this.attribute.values;
        if (values && values.length > 0) {
            const selectedValue = values.find((value) => value.selected);
            if (selectedValue) {
                this.selectionValue = selectedValue;
            }
        }
    }
    /**
     * Extract corresponding product card parameters
     *
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters() {
        return {
            hideRemoveButton: true,
            productBoundValue: this.selectionValue,
            singleDropdown: true,
            withQuantity: false,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeName: this.attribute.name,
            itemCount: 0,
            itemIndex: 0,
        };
    }
}
ConfiguratorAttributeSingleSelectionBundleDropdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeSingleSelectionBundleDropdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, selector: "cx-configurator-attribute-single-selection-bundle-dropdown", inputs: { group: "group" }, usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" *ngIf=\"attribute?.values?.length\">\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values?.length\n            }\n    }}\n  </label>\n  <select\n    id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"form-control\"\n    [formControl]=\"attributeDropDownForm\"\n    [cxFocus]=\"{ key: attribute.name }\"\n    (change)=\"onSelect(attributeDropDownForm.value)\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n  >\n    <option\n      *ngFor=\"let item of attribute.values\"\n      [label]=\"item.valueDisplay\"\n      [selected]=\"item.selected\"\n      [value]=\"item.valueCode\"\n      [attr.aria-label]=\"\n        item.valueCode === '0'\n          ? ('configurator.a11y.forAttribute'\n            | cxTranslate\n              : { value: item.valueDisplay, attribute: attribute.label })\n          : item.valuePrice && item.valuePrice?.value !== 0\n          ? ('configurator.a11y.selectedValueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: item.valueDisplay,\n                  attribute: attribute.label,\n                  price: item.valuePriceTotal.formattedValue\n                })\n          : ('configurator.a11y.selectedValueOfAttributeFull'\n            | cxTranslate\n              : { value: item.valueDisplay, attribute: attribute.label })\n      \"\n      [value]=\"item.valueCode\"\n    >\n      {{ item.valueDisplay }}\n    </option>\n  </select>\n</div>\n\n<cx-configurator-attribute-product-card\n  *ngIf=\"selectionValue?.valueCode !== '0'\"\n  id=\"{{\n    createAttributeValueIdForConfigurator(attribute, selectionValue.valueCode)\n  }}\"\n  (handleDeselect)=\"onSelect('0')\"\n  [productCardOptions]=\"extractProductCardParameters()\"\n>\n</cx-configurator-attribute-product-card>\n\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "directive", type: i5.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-single-selection-bundle-dropdown', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"form-group\" *ngIf=\"attribute?.values?.length\">\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values?.length\n            }\n    }}\n  </label>\n  <select\n    id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"form-control\"\n    [formControl]=\"attributeDropDownForm\"\n    [cxFocus]=\"{ key: attribute.name }\"\n    (change)=\"onSelect(attributeDropDownForm.value)\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n  >\n    <option\n      *ngFor=\"let item of attribute.values\"\n      [label]=\"item.valueDisplay\"\n      [selected]=\"item.selected\"\n      [value]=\"item.valueCode\"\n      [attr.aria-label]=\"\n        item.valueCode === '0'\n          ? ('configurator.a11y.forAttribute'\n            | cxTranslate\n              : { value: item.valueDisplay, attribute: attribute.label })\n          : item.valuePrice && item.valuePrice?.value !== 0\n          ? ('configurator.a11y.selectedValueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: item.valueDisplay,\n                  attribute: attribute.label,\n                  price: item.valuePriceTotal.formattedValue\n                })\n          : ('configurator.a11y.selectedValueOfAttributeFull'\n            | cxTranslate\n              : { value: item.valueDisplay, attribute: attribute.label })\n      \"\n      [value]=\"item.valueCode\"\n    >\n      {{ item.valueDisplay }}\n    </option>\n  </select>\n</div>\n\n<cx-configurator-attribute-product-card\n  *ngIf=\"selectionValue?.valueCode !== '0'\"\n  id=\"{{\n    createAttributeValueIdForConfigurator(attribute, selectionValue.valueCode)\n  }}\"\n  (handleDeselect)=\"onSelect('0')\"\n  [productCardOptions]=\"extractProductCardParameters()\"\n>\n</cx-configurator-attribute-product-card>\n\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n" }]
        }], propDecorators: { group: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionBundleDropdownModule {
}
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent] });
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
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
class ConfiguratorAttributeSingleSelectionBundleComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    /**
     * Extract corresponding product card parameters
     *
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(value, index) {
        return {
            hideRemoveButton: this.attribute.required,
            fallbackFocusId: this.getFocusIdOfNearestValue(value),
            productBoundValue: value,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeLabel: this.attribute.label,
            attributeName: this.attribute.name,
            itemCount: this.attribute.values?.length
                ? this.attribute.values.length
                : 0,
            itemIndex: index,
        };
    }
    getFocusIdOfNearestValue(currentValue) {
        if (!this.attribute.values) {
            return 'n/a';
        }
        let prevIdx = this.attribute.values.findIndex((value) => value.valueCode === currentValue.valueCode);
        prevIdx--;
        if (prevIdx < 0) {
            prevIdx = this.attribute.values.length > 1 ? 1 : 0;
        }
        return this.createFocusId(this.getAttributeCode(this.attribute).toString(), this.attribute.values[prevIdx].valueCode);
    }
}
ConfiguratorAttributeSingleSelectionBundleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeSingleSelectionBundleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeSingleSelectionBundleComponent, selector: "cx-configurator-attribute-single-selection-bundle", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters()\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    [id]=\"createAttributeValueIdForConfigurator(attribute, value?.valueCode)\"\n    (handleDeselect)=\"onSelect('')\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"extractProductCardParameters(value, i)\"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-single-selection-bundle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters()\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    [id]=\"createAttributeValueIdForConfigurator(attribute, value?.valueCode)\"\n    (handleDeselect)=\"onSelect('')\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"extractProductCardParameters(value, i)\"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionBundleModule {
}
ConfiguratorAttributeSingleSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, declarations: [ConfiguratorAttributeSingleSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionBundleComponent] });
ConfiguratorAttributeSingleSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        ItemCounterModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
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
class ConfiguratorAttributeSingleSelectionImageComponent extends ConfiguratorAttributeBaseComponent {
    constructor() {
        super(...arguments);
        this.attributeRadioButtonForm = new UntypedFormControl('');
        this.selectionChange = new EventEmitter();
    }
    ngOnInit() {
        this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
    }
    /**
     * Submits a value.
     *
     * @param {string} value - Selected value
     */
    onClick(value) {
        const event = {
            ownerKey: this.ownerKey,
            changedAttribute: {
                ...this.attribute,
                selectedSingleValue: value,
            },
        };
        this.selectionChange.emit(event);
    }
    extractValuePriceFormulaParameters(value) {
        if (value) {
            return {
                price: value.valuePrice,
                isLightedUp: value.selected,
            };
        }
    }
}
ConfiguratorAttributeSingleSelectionImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeSingleSelectionImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAttributeSingleSelectionImageComponent, selector: "cx-configurator-attribute-single-selection-image", inputs: { attribute: "attribute", ownerKey: "ownerKey" }, outputs: { selectionChange: "selectionChange" }, usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  class=\"cx-row\"\n  role=\"radiogroup\"\n>\n  <div\n    *ngFor=\"let value of attribute.values\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"radio\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      formcontrolname=\"attributeRadioButtonForm\"\n      [formControl]=\"attributeRadioButtonForm\"\n      [value]=\"value.valueCode\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      [attr.required]=\"attribute.required\"\n      [attr.checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'checked' : null\n      \"\n      [attr.aria-checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'true' : 'false'\n      \"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      (click)=\"onClick(value.valueCode)\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n      role=\"radio\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label form-radio-label\"\n      >\n        <img\n          *ngIf=\"value.images[0]\"\n          class=\"cx-img\"\n          src=\"{{ value.images[0].url }}\"\n          alt=\"{{ value.images[0].altText }}\"\n        />\n        <div *ngIf=\"!value.images[0]\" class=\"cx-img-dummy\"></div>\n        {{ value.valueDisplay }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-single-selection-image', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  class=\"cx-row\"\n  role=\"radiogroup\"\n>\n  <div\n    *ngFor=\"let value of attribute.values\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"radio\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      formcontrolname=\"attributeRadioButtonForm\"\n      [formControl]=\"attributeRadioButtonForm\"\n      [value]=\"value.valueCode\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      [attr.required]=\"attribute.required\"\n      [attr.checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'checked' : null\n      \"\n      [attr.aria-checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'true' : 'false'\n      \"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      (click)=\"onClick(value.valueCode)\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n      role=\"radio\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label form-radio-label\"\n      >\n        <img\n          *ngIf=\"value.images[0]\"\n          class=\"cx-img\"\n          src=\"{{ value.images[0].url }}\"\n          alt=\"{{ value.images[0].altText }}\"\n        />\n        <div *ngIf=\"!value.images[0]\" class=\"cx-img-dummy\"></div>\n        {{ value.valueDisplay }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n" }]
        }], propDecorators: { attribute: [{
                type: Input
            }], ownerKey: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionImageModule {
}
ConfiguratorAttributeSingleSelectionImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, declarations: [ConfiguratorAttributeSingleSelectionImageComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionImageComponent] });
ConfiguratorAttributeSingleSelectionImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorPriceModule,
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionImageComponent],
                    exports: [ConfiguratorAttributeSingleSelectionImageComponent],
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
class ConfiguratorMessageConfig {
}

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
class ConfiguratorConflictDescriptionComponent {
    constructor() {
        this.groupType = Configurator.GroupType;
        this.iconTypes = ICON_TYPE;
        this.tabindex = '0';
        // Intentional empty constructor
    }
    /**
     * Verifies whether the  conflict description should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictDescription(group) {
        return group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
}
ConfiguratorConflictDescriptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictDescriptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorConflictDescriptionComponent, selector: "cx-configurator-conflict-description", inputs: { currentGroup: "currentGroup" }, host: { properties: { "tabindex": "this.tabindex" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayConflictDescription(currentGroup)\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ currentGroup.name }}\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictDescriptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-description', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayConflictDescription(currentGroup)\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ currentGroup.name }}\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { currentGroup: [{
                type: Input
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictDescriptionModule {
}
ConfiguratorConflictDescriptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictDescriptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictDescriptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictDescriptionModule, declarations: [ConfiguratorConflictDescriptionComponent], imports: [CommonModule, IconModule], exports: [ConfiguratorConflictDescriptionComponent] });
ConfiguratorConflictDescriptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictDescriptionModule, imports: [CommonModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictDescriptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule],
                    declarations: [ConfiguratorConflictDescriptionComponent],
                    exports: [ConfiguratorConflictDescriptionComponent],
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
class ConfiguratorConflictSuggestionComponent {
    constructor() {
        this.groupType = Configurator.GroupType;
        this.tabindex = '0';
        // Intentional empty constructor
    }
    /**
     * Verifies whether the conflict suggestion should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictSuggestion(group) {
        return group.groupType === Configurator.GroupType.CONFLICT_GROUP &&
            group.attributes
            ? group.attributes?.length > 1
            : false;
    }
    createSuggestionUiKey() {
        return 'suggestion--' + this.suggestionNumber;
    }
}
ConfiguratorConflictSuggestionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictSuggestionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictSuggestionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorConflictSuggestionComponent, selector: "cx-configurator-conflict-suggestion", inputs: { currentGroup: "currentGroup", attribute: "attribute", suggestionNumber: "suggestionNumber" }, host: { properties: { "tabindex": "this.tabindex" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayConflictSuggestion(currentGroup)\">\n  <div\n    class=\"cx-title\"\n    [attr.aria-label]=\"\n      ('configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }) +\n      ' ' +\n      ('configurator.conflict.suggestionText'\n        | cxTranslate: { attribute: attribute.label })\n    \"\n  >\n    <span aria-hidden=\"true\">{{\n      'configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }\n    }}</span>\n  </div>\n  <span aria-hidden=\"true\">{{\n    'configurator.conflict.suggestionText'\n      | cxTranslate: { attribute: attribute.label }\n  }}</span>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictSuggestionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-suggestion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayConflictSuggestion(currentGroup)\">\n  <div\n    class=\"cx-title\"\n    [attr.aria-label]=\"\n      ('configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }) +\n      ' ' +\n      ('configurator.conflict.suggestionText'\n        | cxTranslate: { attribute: attribute.label })\n    \"\n  >\n    <span aria-hidden=\"true\">{{\n      'configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }\n    }}</span>\n  </div>\n  <span aria-hidden=\"true\">{{\n    'configurator.conflict.suggestionText'\n      | cxTranslate: { attribute: attribute.label }\n  }}</span>\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { currentGroup: [{
                type: Input
            }], attribute: [{
                type: Input
            }], suggestionNumber: [{
                type: Input
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictSuggestionModule {
}
ConfiguratorConflictSuggestionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictSuggestionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictSuggestionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictSuggestionModule, declarations: [ConfiguratorConflictSuggestionComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorConflictSuggestionComponent] });
ConfiguratorConflictSuggestionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictSuggestionModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictSuggestionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    declarations: [ConfiguratorConflictSuggestionComponent],
                    exports: [ConfiguratorConflictSuggestionComponent],
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
class ConfiguratorFormComponent {
    constructor(configuratorCommonsService, configuratorGroupsService, configRouterExtractorService, languageService, configUtils) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.languageService = languageService;
        this.configUtils = configUtils;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(filter((routerData) => routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION), switchMap((routerData) => {
            return this.configuratorCommonsService.getOrCreateConfiguration(routerData.owner);
        }));
        this.currentGroup$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner)));
        this.activeLanguage$ = this.languageService.getActive();
        this.uiType = Configurator.UiType;
    }
    ngOnInit() {
        this.configRouterExtractorService
            .extractRouterData()
            .pipe(take(1))
            .subscribe((routingData) => {
            //In case of resolving issues, check if the configuration contains conflicts,
            //if not, check if the configuration contains missing mandatory fields and show the group
            if (routingData.resolveIssues) {
                this.configuratorCommonsService
                    .hasConflicts(routingData.owner)
                    .pipe(take(1))
                    .subscribe((hasConflicts) => {
                    if (hasConflicts && !routingData.skipConflicts) {
                        this.configuratorGroupsService.navigateToConflictSolver(routingData.owner);
                        //Only check for Incomplete group when there are no conflicts or conflicts should be skipped
                    }
                    else {
                        this.configuratorGroupsService.navigateToFirstIncompleteGroup(routingData.owner);
                    }
                });
            }
        });
    }
    updateConfiguration(event) {
        this.configuratorCommonsService.updateConfiguration(event.ownerKey, event.changedAttribute, event.updateType);
    }
    isConflictGroupType(groupType) {
        return this.configuratorGroupsService.isConflictGroupType(groupType);
    }
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId) {
        return this.configUtils.createGroupId(groupId);
    }
}
ConfiguratorFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i1$1.LanguageService }, { token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorFormComponent, selector: "cx-configurator-form", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n    <div id=\"{{ createGroupId(currentGroup.id) }}\" role=\"tabpanel\">\n      <ng-container *ngIf=\"isConflictGroupType(currentGroup.groupType)\">\n        <cx-configurator-conflict-description\n          [currentGroup]=\"currentGroup\"\n        ></cx-configurator-conflict-description>\n      </ng-container>\n      <div\n        class=\"cx-group-attribute\"\n        *ngFor=\"\n          let attribute of currentGroup.attributes;\n          let indexOfAttribute = index\n        \"\n      >\n        <ng-container *ngIf=\"activeLanguage$ | async as activeLanguage\">\n          <ng-container *ngIf=\"isConflictGroupType(currentGroup.groupType)\">\n            <cx-configurator-conflict-suggestion\n              [currentGroup]=\"currentGroup\"\n              [attribute]=\"attribute\"\n              [suggestionNumber]=\"indexOfAttribute\"\n            ></cx-configurator-conflict-suggestion>\n          </ng-container>\n          <cx-configurator-attribute-header\n            [attribute]=\"attribute\"\n            [owner]=\"configuration.owner\"\n            [groupId]=\"currentGroup.id\"\n            [groupType]=\"currentGroup.groupType\"\n          >\n          </cx-configurator-attribute-header>\n          <!-- Single Selection Radio Button -->\n          <cx-configurator-attribute-radio-button\n            *ngIf=\"\n              attribute.uiType === uiType.RADIOBUTTON ||\n              attribute.uiType === uiType.RADIOBUTTON_ADDITIONAL_INPUT\n            \"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            [ownerType]=\"configuration.owner.type\"\n            [language]=\"activeLanguage\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-radio-button>\n\n          <!-- Single Selection Product Bundle -->\n          <cx-configurator-attribute-single-selection-bundle\n            (selectionChange)=\"updateConfiguration($event)\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            *ngIf=\"attribute.uiType === uiType.RADIOBUTTON_PRODUCT\"\n          ></cx-configurator-attribute-single-selection-bundle>\n\n          <!-- Multi Selection Product Bundle -->\n          <cx-configurator-attribute-multi-selection-bundle\n            (selectionChange)=\"updateConfiguration($event)\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            *ngIf=\"attribute.uiType === uiType.CHECKBOXLIST_PRODUCT\"\n          ></cx-configurator-attribute-multi-selection-bundle>\n\n          <!-- Single Selection Dropdown Product Bundle -->\n          <cx-configurator-attribute-single-selection-bundle-dropdown\n            *ngIf=\"attribute.uiType === uiType.DROPDOWN_PRODUCT\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-single-selection-bundle-dropdown>\n\n          <!-- Single Selection Dropdown -->\n          <cx-configurator-attribute-drop-down\n            *ngIf=\"\n              attribute.uiType === uiType.DROPDOWN ||\n              attribute.uiType === uiType.DROPDOWN_ADDITIONAL_INPUT\n            \"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            [ownerType]=\"configuration.owner.type\"\n            [language]=\"activeLanguage\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-drop-down>\n          <cx-configurator-attribute-input-field\n            *ngIf=\"attribute.uiType === uiType.STRING\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerType]=\"configuration.owner.type\"\n            [ownerKey]=\"configuration.owner.key\"\n            (inputChange)=\"updateConfiguration($event)\"\n          >\n          </cx-configurator-attribute-input-field>\n\n          <cx-configurator-attribute-numeric-input-field\n            *ngIf=\"attribute.uiType === uiType.NUMERIC\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerType]=\"configuration.owner.type\"\n            [ownerKey]=\"configuration.owner.key\"\n            [language]=\"activeLanguage\"\n            (inputChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-numeric-input-field>\n\n          <!-- Multi Selection Checkbox -->\n          <cx-configurator-attribute-checkbox-list\n            *ngIf=\"attribute.uiType === uiType.CHECKBOXLIST\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-checkbox-list>\n          <cx-configurator-attribute-checkbox\n            *ngIf=\"attribute.uiType === uiType.CHECKBOX\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-checkbox>\n          <cx-configurator-attribute-read-only\n            *ngIf=\"attribute.uiType === uiType.READ_ONLY\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n          ></cx-configurator-attribute-read-only>\n          <cx-configurator-attribute-multi-selection-image\n            *ngIf=\"attribute.uiType === uiType.MULTI_SELECTION_IMAGE\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-multi-selection-image>\n          <cx-configurator-attribute-single-selection-image\n            *ngIf=\"attribute.uiType === uiType.SINGLE_SELECTION_IMAGE\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-single-selection-image>\n\n          <em *ngIf=\"attribute.uiType === uiType.NOT_IMPLEMENTED\">{{\n            'configurator.attribute.notSupported' | cxTranslate\n          }}</em>\n\n          <cx-configurator-attribute-footer\n            [attribute]=\"attribute\"\n            [owner]=\"configuration.owner\"\n            [groupId]=\"currentGroup.id\"\n          ></cx-configurator-attribute-footer>\n        </ng-container>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div class=\"cx-ghost-text ghost\"></div>\n        <div class=\"cx-ghost-price ghost\"></div>\n      </div>\n    </div>\n\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n        <div class=\"cx-ghost-description-box\">\n          <div class=\"cx-ghost-description ghost\"></div>\n        </div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div\n          *ngFor=\"let number of [0, 1, 2]; let i = index\"\n          class=\"cx-ghost-radiobutton-value\"\n        >\n          <div class=\"cx-ghost-value-label-pair\">\n            <div class=\"cx-ghost-value-icon ghost\"></div>\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-value-price ghost\">\n            <ng-container *ngIf=\"i !== 0\">\n              <div class=\"cx-ghost-price\"></div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field", inputs: ["ownerType", "attribute", "group", "ownerKey"], outputs: ["inputChange"] }, { kind: "component", type: ConfiguratorAttributeFooterComponent, selector: "cx-configurator-attribute-footer", inputs: ["attribute", "owner", "groupId"] }, { kind: "component", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", inputs: ["language"] }, { kind: "component", type: ConfiguratorAttributeHeaderComponent, selector: "cx-configurator-attribute-header", inputs: ["attribute", "owner", "groupId", "groupType"] }, { kind: "component", type: ConfiguratorAttributeRadioButtonComponent, selector: "cx-configurator-attribute-radio-button" }, { kind: "component", type: ConfiguratorAttributeSingleSelectionBundleComponent, selector: "cx-configurator-attribute-single-selection-bundle" }, { kind: "component", type: ConfiguratorAttributeMultiSelectionBundleComponent, selector: "cx-configurator-attribute-multi-selection-bundle" }, { kind: "component", type: ConfiguratorAttributeReadOnlyComponent, selector: "cx-configurator-attribute-read-only", inputs: ["attribute", "group"] }, { kind: "component", type: ConfiguratorAttributeSingleSelectionImageComponent, selector: "cx-configurator-attribute-single-selection-image", inputs: ["attribute", "ownerKey"], outputs: ["selectionChange"] }, { kind: "component", type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, selector: "cx-configurator-attribute-single-selection-bundle-dropdown", inputs: ["group"] }, { kind: "component", type: ConfiguratorAttributeCheckBoxComponent, selector: "cx-configurator-attribute-checkbox", inputs: ["attribute", "group", "ownerKey"], outputs: ["selectionChange"] }, { kind: "component", type: ConfiguratorAttributeCheckBoxListComponent, selector: "cx-configurator-attribute-checkbox-list", inputs: ["group"] }, { kind: "component", type: ConfiguratorAttributeDropDownComponent, selector: "cx-configurator-attribute-drop-down", inputs: ["group"] }, { kind: "component", type: ConfiguratorAttributeMultiSelectionImageComponent, selector: "cx-configurator-attribute-multi-selection-image", inputs: ["attribute", "ownerKey"], outputs: ["selectionChange"] }, { kind: "component", type: ConfiguratorConflictDescriptionComponent, selector: "cx-configurator-conflict-description", inputs: ["currentGroup"] }, { kind: "component", type: ConfiguratorConflictSuggestionComponent, selector: "cx-configurator-conflict-suggestion", inputs: ["currentGroup", "attribute", "suggestionNumber"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n    <div id=\"{{ createGroupId(currentGroup.id) }}\" role=\"tabpanel\">\n      <ng-container *ngIf=\"isConflictGroupType(currentGroup.groupType)\">\n        <cx-configurator-conflict-description\n          [currentGroup]=\"currentGroup\"\n        ></cx-configurator-conflict-description>\n      </ng-container>\n      <div\n        class=\"cx-group-attribute\"\n        *ngFor=\"\n          let attribute of currentGroup.attributes;\n          let indexOfAttribute = index\n        \"\n      >\n        <ng-container *ngIf=\"activeLanguage$ | async as activeLanguage\">\n          <ng-container *ngIf=\"isConflictGroupType(currentGroup.groupType)\">\n            <cx-configurator-conflict-suggestion\n              [currentGroup]=\"currentGroup\"\n              [attribute]=\"attribute\"\n              [suggestionNumber]=\"indexOfAttribute\"\n            ></cx-configurator-conflict-suggestion>\n          </ng-container>\n          <cx-configurator-attribute-header\n            [attribute]=\"attribute\"\n            [owner]=\"configuration.owner\"\n            [groupId]=\"currentGroup.id\"\n            [groupType]=\"currentGroup.groupType\"\n          >\n          </cx-configurator-attribute-header>\n          <!-- Single Selection Radio Button -->\n          <cx-configurator-attribute-radio-button\n            *ngIf=\"\n              attribute.uiType === uiType.RADIOBUTTON ||\n              attribute.uiType === uiType.RADIOBUTTON_ADDITIONAL_INPUT\n            \"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            [ownerType]=\"configuration.owner.type\"\n            [language]=\"activeLanguage\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-radio-button>\n\n          <!-- Single Selection Product Bundle -->\n          <cx-configurator-attribute-single-selection-bundle\n            (selectionChange)=\"updateConfiguration($event)\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            *ngIf=\"attribute.uiType === uiType.RADIOBUTTON_PRODUCT\"\n          ></cx-configurator-attribute-single-selection-bundle>\n\n          <!-- Multi Selection Product Bundle -->\n          <cx-configurator-attribute-multi-selection-bundle\n            (selectionChange)=\"updateConfiguration($event)\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            *ngIf=\"attribute.uiType === uiType.CHECKBOXLIST_PRODUCT\"\n          ></cx-configurator-attribute-multi-selection-bundle>\n\n          <!-- Single Selection Dropdown Product Bundle -->\n          <cx-configurator-attribute-single-selection-bundle-dropdown\n            *ngIf=\"attribute.uiType === uiType.DROPDOWN_PRODUCT\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-single-selection-bundle-dropdown>\n\n          <!-- Single Selection Dropdown -->\n          <cx-configurator-attribute-drop-down\n            *ngIf=\"\n              attribute.uiType === uiType.DROPDOWN ||\n              attribute.uiType === uiType.DROPDOWN_ADDITIONAL_INPUT\n            \"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            [ownerType]=\"configuration.owner.type\"\n            [language]=\"activeLanguage\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-drop-down>\n          <cx-configurator-attribute-input-field\n            *ngIf=\"attribute.uiType === uiType.STRING\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerType]=\"configuration.owner.type\"\n            [ownerKey]=\"configuration.owner.key\"\n            (inputChange)=\"updateConfiguration($event)\"\n          >\n          </cx-configurator-attribute-input-field>\n\n          <cx-configurator-attribute-numeric-input-field\n            *ngIf=\"attribute.uiType === uiType.NUMERIC\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerType]=\"configuration.owner.type\"\n            [ownerKey]=\"configuration.owner.key\"\n            [language]=\"activeLanguage\"\n            (inputChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-numeric-input-field>\n\n          <!-- Multi Selection Checkbox -->\n          <cx-configurator-attribute-checkbox-list\n            *ngIf=\"attribute.uiType === uiType.CHECKBOXLIST\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-checkbox-list>\n          <cx-configurator-attribute-checkbox\n            *ngIf=\"attribute.uiType === uiType.CHECKBOX\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-checkbox>\n          <cx-configurator-attribute-read-only\n            *ngIf=\"attribute.uiType === uiType.READ_ONLY\"\n            [attribute]=\"attribute\"\n            [group]=\"currentGroup.id\"\n          ></cx-configurator-attribute-read-only>\n          <cx-configurator-attribute-multi-selection-image\n            *ngIf=\"attribute.uiType === uiType.MULTI_SELECTION_IMAGE\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-multi-selection-image>\n          <cx-configurator-attribute-single-selection-image\n            *ngIf=\"attribute.uiType === uiType.SINGLE_SELECTION_IMAGE\"\n            [attribute]=\"attribute\"\n            [ownerKey]=\"configuration.owner.key\"\n            (selectionChange)=\"updateConfiguration($event)\"\n          ></cx-configurator-attribute-single-selection-image>\n\n          <em *ngIf=\"attribute.uiType === uiType.NOT_IMPLEMENTED\">{{\n            'configurator.attribute.notSupported' | cxTranslate\n          }}</em>\n\n          <cx-configurator-attribute-footer\n            [attribute]=\"attribute\"\n            [owner]=\"configuration.owner\"\n            [groupId]=\"currentGroup.id\"\n          ></cx-configurator-attribute-footer>\n        </ng-container>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div class=\"cx-ghost-text ghost\"></div>\n        <div class=\"cx-ghost-price ghost\"></div>\n      </div>\n    </div>\n\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n        <div class=\"cx-ghost-description-box\">\n          <div class=\"cx-ghost-description ghost\"></div>\n        </div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div\n          *ngFor=\"let number of [0, 1, 2]; let i = index\"\n          class=\"cx-ghost-radiobutton-value\"\n        >\n          <div class=\"cx-ghost-value-label-pair\">\n            <div class=\"cx-ghost-value-icon ghost\"></div>\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-value-price ghost\">\n            <ng-container *ngIf=\"i !== 0\">\n              <div class=\"cx-ghost-price\"></div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i1$1.LanguageService }, { type: ConfiguratorStorefrontUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfigFormUpdateEvent {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorFormModule {
}
ConfiguratorFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, declarations: [ConfiguratorFormComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule], exports: [ConfiguratorFormComponent] });
ConfiguratorFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorForm: {
                    component: ConfiguratorFormComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        NgSelectModule,
                        ConfiguratorAttributeInputFieldModule,
                        ConfiguratorAttributeFooterModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeHeaderModule,
                        ConfiguratorAttributeRadioButtonModule,
                        ConfiguratorAttributeSingleSelectionBundleModule,
                        ConfiguratorAttributeMultiSelectionBundleModule,
                        ConfiguratorAttributeReadOnlyModule,
                        ConfiguratorAttributeSingleSelectionImageModule,
                        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
                        ConfiguratorAttributeCheckboxModule,
                        ConfiguratorAttributeCheckboxListModule,
                        ConfiguratorAttributeDropDownModule,
                        ConfiguratorAttributeMultiSelectionImageModule,
                        ConfiguratorConflictDescriptionModule,
                        ConfiguratorConflictSuggestionModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorForm: {
                                    component: ConfiguratorFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorFormComponent],
                    exports: [ConfiguratorFormComponent],
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
class ConfiguratorGroupMenuService {
    constructor(windowRef) {
        this.windowRef = windowRef;
    }
    /**
     * Retrieves the focused group index.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {number | undefined} - focused group index
     * @protected
     */
    getFocusedGroupIndex(groups) {
        if (groups) {
            const group = groups.find((groupHTMLEl) => groupHTMLEl.nativeElement?.id ===
                this.windowRef?.document?.activeElement?.id);
            if (group) {
                return groups.toArray().indexOf(group);
            }
        }
        return undefined;
    }
    /**
     * Updates the current group index, if the current group index is not equal focused group index.
     * Otherwise the current group index stays unchanged.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {number} focusedGroupIndex - Focused group index
     * @returns {number} - updated group index
     * @protected
     */
    updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex) {
        if (focusedGroupIndex) {
            return focusedGroupIndex !== currentGroupIndex
                ? focusedGroupIndex
                : currentGroupIndex;
        }
        return currentGroupIndex;
    }
    /**
     * Focuses the next group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    focusNextGroup(currentGroupIndex, groups) {
        const focusedGroupIndex = this.getFocusedGroupIndex(groups);
        currentGroupIndex = this.updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex);
        if (groups) {
            if (currentGroupIndex === groups.length - 1) {
                groups.first?.nativeElement?.focus();
            }
            else {
                groups.toArray()[currentGroupIndex + 1]?.nativeElement.focus();
            }
        }
    }
    /**
     * Focuses the previous group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    focusPreviousGroup(currentGroupIndex, groups) {
        const focusedGroupIndex = this.getFocusedGroupIndex(groups);
        currentGroupIndex = this.updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex);
        if (groups) {
            if (currentGroupIndex === 0) {
                groups.last?.nativeElement?.focus();
            }
            else {
                groups.toArray()[currentGroupIndex - 1]?.nativeElement?.focus();
            }
        }
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - keyboard event
     * @param {number} groupIndex - Group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     */
    switchGroupOnArrowPress(event, groupIndex, groups) {
        event.preventDefault();
        if (event.code === 'ArrowUp') {
            this.focusPreviousGroup(groupIndex, groups);
        }
        else if (event.code === 'ArrowDown') {
            this.focusNextGroup(groupIndex, groups);
        }
    }
    /**
     * Verifies whether the first group in the group list is `Back` button.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {boolean} - returns `true` if the first group in the group list is `Back` button, otherwise `false`
     */
    isBackBtnFocused(groups) {
        if (groups) {
            return (groups.first?.nativeElement?.classList?.value?.indexOf('cx-menu-back') !== -1 &&
                this.windowRef?.document?.activeElement === groups.first?.nativeElement);
        }
        return undefined;
    }
}
ConfiguratorGroupMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuService, deps: [{ token: i1$1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupMenuComponent {
    constructor(configCommonsService, configuratorGroupsService, hamburgerMenuService, configRouterExtractorService, configUtils, configGroupMenuService, directionService, translation) {
        this.configCommonsService = configCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.hamburgerMenuService = hamburgerMenuService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configUtils = configUtils;
        this.configGroupMenuService = configGroupMenuService;
        this.directionService = directionService;
        this.translation = translation;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(switchMap((routerData) => this.configCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })), 
        //We need to ensure that the navigation to conflict groups or
        //groups with mandatory attributes already has taken place, as this happens
        //in an onInit of another component.
        //otherwise we risk that this component is completely initialized too early,
        //in dev mode resulting in ExpressionChangedAfterItHasBeenCheckedError
        filter((cont) => (cont.configuration.complete &&
            cont.configuration.consistent) ||
            cont.configuration.interactionState.issueNavigationDone ||
            !cont.routerData.resolveIssues))
            .pipe(map((cont) => cont.configuration))));
        this.currentGroup$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner)));
        /**
         * Current parent group. Undefined for top level groups
         */
        this.displayedParentGroup$ = this.configuration$.pipe(switchMap((configuration) => this.configuratorGroupsService.getMenuParentGroup(configuration.owner)), switchMap((parentGroup) => {
            return parentGroup
                ? this.getCondensedParentGroup(parentGroup)
                : of(parentGroup);
        }));
        this.displayedGroups$ = this.displayedParentGroup$.pipe(switchMap((parentGroup) => {
            return this.configuration$.pipe(map((configuration) => {
                if (parentGroup) {
                    return this.condenseGroups(parentGroup.subGroups);
                }
                else {
                    return this.condenseGroups(configuration.groups);
                }
            }));
        }));
        this.iconTypes = ICON_TYPE;
        this.ERROR = ' ERROR';
        this.COMPLETE = ' COMPLETE';
        this.WARNING = ' WARNING';
        this.ICON = 'ICON';
    }
    click(group) {
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            if (configuration.interactionState.currentGroup === group.id) {
                return;
            }
            if (!this.configuratorGroupsService.hasSubGroups(group)) {
                this.configuratorGroupsService.navigateToGroup(configuration, group.id);
                this.hamburgerMenuService.toggle(true);
                this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
            }
            else {
                this.configuratorGroupsService.setMenuParentGroup(configuration.owner, group.id);
            }
        });
    }
    navigateUp() {
        this.displayedParentGroup$
            .pipe(take(1))
            .subscribe((displayedParentGroup) => {
            //we only navigate up if we are not on a sub level group
            if (displayedParentGroup) {
                const grandParentGroup$ = this.getParentGroup(displayedParentGroup);
                this.configuration$.pipe(take(1)).subscribe((configuration) => {
                    grandParentGroup$.pipe(take(1)).subscribe((grandParentGroup) => {
                        this.configuratorGroupsService.setMenuParentGroup(configuration.owner, grandParentGroup ? grandParentGroup.id : undefined);
                    });
                });
            }
        });
    }
    /**
     * Retrieves the number of conflicts for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {string} - number of conflicts
     */
    getConflictNumber(group) {
        if (group &&
            group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return '(' + group.subGroups.length + ')';
        }
        return '';
    }
    /**
     * Verifies whether the current group has subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - Returns 'true' if the current group has a subgroups, otherwise 'false'.
     */
    hasSubGroups(group) {
        return this.configuratorGroupsService.hasSubGroups(group);
    }
    /**
     * Retrieves observable of parent group for a group
     * @param group
     * @returns Parent group, undefined in case input group is already on root level
     */
    getParentGroup(group) {
        return this.configuration$.pipe(map((configuration) => this.configuratorGroupsService.getParentGroup(configuration.groups, group)));
    }
    getCondensedParentGroup(parentGroup) {
        if (parentGroup &&
            parentGroup.subGroups &&
            parentGroup.subGroups.length === 1 &&
            parentGroup.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return this.getParentGroup(parentGroup).pipe(switchMap((group) => {
                return group ? this.getCondensedParentGroup(group) : of(group);
            }));
        }
        else {
            return of(parentGroup);
        }
    }
    condenseGroups(groups) {
        return groups.flatMap((group) => {
            if (group.subGroups.length === 1 &&
                group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
                return this.condenseGroups(group.subGroups);
            }
            else {
                return group;
            }
        });
    }
    /**
     * Returns true if group has been visited and if the group is not a conflict group.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    isGroupVisited(group, configuration) {
        return this.configuratorGroupsService
            .isGroupVisited(configuration.owner, group.id)
            .pipe(map((isVisited) => isVisited &&
            !this.isConflictGroupType(group.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP)), take(1));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return this.configuratorGroupsService.isConflictGroupType(groupType);
    }
    /**
     * Returns true if group is conflict header group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict header group, otherwise 'false'.
     */
    isConflictHeader(group) {
        return (group && group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP);
    }
    /**
     * Returns true if group is conflict group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict group, otherwise 'false'.
     */
    isConflictGroup(group) {
        return group && group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
    /**
     * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    getGroupStatusStyles(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let groupStatusStyle = 'cx-menu-item';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent) {
                groupStatusStyle = groupStatusStyle + this.WARNING;
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                groupStatusStyle = groupStatusStyle + this.COMPLETE;
            }
            if (!group.complete && isVisited) {
                groupStatusStyle = groupStatusStyle + this.ERROR;
            }
            return groupStatusStyle;
        }));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} groupIndex - Group index
     * @param {Configurator.Group} targetGroup - Target group
     * @param {Configurator.Group} currentGroup - Current group
     */
    switchGroupOnArrowPress(event, groupIndex, targetGroup, currentGroup) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            this.configGroupMenuService.switchGroupOnArrowPress(event, groupIndex, this.groups);
        }
        else if (this.isForwardsNavigation(event)) {
            if (targetGroup && this.hasSubGroups(targetGroup)) {
                this.click(targetGroup);
                this.setFocusForSubGroup(targetGroup, currentGroup.id);
            }
        }
        else if (this.isBackNavigation(event)) {
            if (this.configGroupMenuService.isBackBtnFocused(this.groups)) {
                this.navigateUp();
                this.setFocusForMainMenu(currentGroup.id);
            }
        }
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the main group menu by back navigation.
     *
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForMainMenu(currentGroupId) {
        let key = currentGroupId;
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            configuration.groups?.forEach((group) => {
                if (group.subGroups?.length !== 1 &&
                    (this.isGroupSelected(group.id, currentGroupId) ||
                        this.containsSelectedGroup(group, currentGroupId))) {
                    key = group.id;
                }
            });
        });
        this.configUtils.setFocus(key);
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the subgroup menu by forwards navigation.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForSubGroup(group, currentGroupId) {
        let key = 'cx-menu-back';
        if (this.containsSelectedGroup(group, currentGroupId)) {
            key = currentGroupId;
        }
        this.configUtils.setFocus(key);
    }
    /**
     * Verifies whether the parent group contains a selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the parent group contains a selected group, otherwise 'false'
     */
    containsSelectedGroup(group, currentGroupId) {
        let isCurrentGroupFound = false;
        group.subGroups?.forEach((subGroup) => {
            if (this.isGroupSelected(subGroup.id, currentGroupId)) {
                isCurrentGroupFound = true;
            }
        });
        return isCurrentGroupFound;
    }
    /**
     * Retrieves the tab index depending on if the the current group is selected
     * or the parent group contains the selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {number} - tab index
     */
    getTabIndex(group, currentGroupId) {
        if (!this.isGroupSelected(group.id, currentGroupId) &&
            !this.containsSelectedGroup(group, currentGroupId)) {
            return -1;
        }
        else {
            return 0;
        }
    }
    /**
     * Verifies whether the current group is selected.
     *
     * @param {string} groupId - group ID
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the current group is selected, otherwise 'false'
     */
    isGroupSelected(groupId, currentGroupId) {
        return groupId === currentGroupId;
    }
    /**
     * Generates a group ID for aria-controls.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createAriaControls(groupId) {
        return this.configUtils.createGroupId(groupId);
    }
    /**
     * Generates aria-label for group menu item
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    getAriaLabel(group) {
        let translatedText = '';
        if (group && group.groupType && this.isConflictGroupType(group.groupType)) {
            if (this.isConflictHeader(group)) {
                this.translation
                    .translate('configurator.a11y.conflictsInConfiguration', {
                    numberOfConflicts: this.getConflictNumber(group),
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                translatedText = group.description ? group.description : '';
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.groupName', {
                group: group.description,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    /**
     * Generates an id for icons.
     *
     * @param {string} prefix - prefix for type of icon
     * @param {string} groupId - group id
     * @returns {string | undefined} - generated icon id
     */
    createIconId(type, groupId) {
        return this.ICON + type + groupId;
    }
    /**
     * Generates aria-describedby
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<string>} - aria-describedby
     */
    getAriaDescribedby(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let ariaDescribedby = '';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent &&
                group.groupType &&
                !this.isConflictGroupType(group.groupType)) {
                ariaDescribedby =
                    ariaDescribedby + this.createIconId(ICON_TYPE.WARNING, group.id);
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.SUCCESS, group.id);
            }
            if (!group.complete && isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.ERROR, group.id);
            }
            if (this.hasSubGroups(group)) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.CARET_RIGHT, group.id);
            }
            ariaDescribedby = ariaDescribedby + ' inListOfGroups';
            return ariaDescribedby;
        }));
    }
}
ConfiguratorGroupMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i3.HamburgerMenuService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorGroupMenuService }, { token: i3.DirectionService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorGroupMenuComponent, selector: "cx-configurator-group-menu", viewQueries: [{ propertyName: "groups", predicate: ["groupItem"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <div class=\"cx-group-menu\" role=\"tablist\">\n    <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n    </span>\n    <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n      {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n    </span>\n    <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n      <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n        <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n          <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n            <button\n              *ngIf=\"parentGroup !== null && groupIndex === 0\"\n              #groupItem\n              class=\"cx-menu-back\"\n              role=\"tab\"\n              [attr.aria-selected]=\"false\"\n              [attr.aria-label]=\"\n                isConflictGroupType(parentGroup.groupType)\n                  ? ('configurator.a11y.conflictBack' | cxTranslate)\n                  : ('configurator.a11y.groupBack' | cxTranslate)\n              \"\n              aria-describedby=\"listOfGroups\"\n              [cxFocus]=\"{ key: 'cx-menu-back' }\"\n              (click)=\"navigateUp()\"\n              (keydown)=\"\n                switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n              \"\n            >\n              <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n              {{ 'configurator.button.back' | cxTranslate }}\n            </button>\n          </ng-container>\n          <button\n            #groupItem\n            id=\"{{ group.id }}\"\n            ngClass=\"{{ getGroupStatusStyles(group, configuration) | async }}\"\n            role=\"tab\"\n            [class.DISABLED]=\"!group.configurable\"\n            [class.cx-menu-conflict]=\"isConflictGroupType(group.groupType)\"\n            [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [class.disable]=\"!group.configurable\"\n            [attr.aria-describedby]=\"\n              getAriaDescribedby(group, configuration) | async\n            \"\n            [attr.aria-selected]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [attr.aria-controls]=\"\n              isGroupSelected(group.id, currentGroup.id)\n                ? createAriaControls(group.id)\n                : null\n            \"\n            [attr.aria-label]=\"getAriaLabel(group)\"\n            [cxFocus]=\"{\n              key: group.id\n            }\"\n            (click)=\"click(group)\"\n            [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n            (keydown)=\"\n              switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n            \"\n          >\n            <span title=\"{{ group.description }}\">{{ group.description }}</span>\n            <div class=\"groupIndicators\">\n              <div class=\"conflictNumberIndicator\">\n                {{ getConflictNumber(group) }}\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"WARNING\"\n                  [type]=\"iconTypes.WARNING\"\n                  id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconConflict' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"ERROR\"\n                  [type]=\"iconTypes.ERROR\"\n                  id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconIncomplete' | cxTranslate\n                  \"\n                ></cx-icon>\n                <cx-icon\n                  class=\"COMPLETE\"\n                  [type]=\"iconTypes.SUCCESS\"\n                  id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconComplete' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"subGroupIndicator\">\n                <cx-icon\n                  *ngIf=\"hasSubGroups(group)\"\n                  [type]=\"iconTypes.CARET_RIGHT\"\n                  id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconSubGroup' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n            </div>\n          </button>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <div class=\"cx-group-menu\" role=\"tablist\">\n    <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n    </span>\n    <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n      {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n    </span>\n    <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n      <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n        <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n          <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n            <button\n              *ngIf=\"parentGroup !== null && groupIndex === 0\"\n              #groupItem\n              class=\"cx-menu-back\"\n              role=\"tab\"\n              [attr.aria-selected]=\"false\"\n              [attr.aria-label]=\"\n                isConflictGroupType(parentGroup.groupType)\n                  ? ('configurator.a11y.conflictBack' | cxTranslate)\n                  : ('configurator.a11y.groupBack' | cxTranslate)\n              \"\n              aria-describedby=\"listOfGroups\"\n              [cxFocus]=\"{ key: 'cx-menu-back' }\"\n              (click)=\"navigateUp()\"\n              (keydown)=\"\n                switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n              \"\n            >\n              <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n              {{ 'configurator.button.back' | cxTranslate }}\n            </button>\n          </ng-container>\n          <button\n            #groupItem\n            id=\"{{ group.id }}\"\n            ngClass=\"{{ getGroupStatusStyles(group, configuration) | async }}\"\n            role=\"tab\"\n            [class.DISABLED]=\"!group.configurable\"\n            [class.cx-menu-conflict]=\"isConflictGroupType(group.groupType)\"\n            [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [class.disable]=\"!group.configurable\"\n            [attr.aria-describedby]=\"\n              getAriaDescribedby(group, configuration) | async\n            \"\n            [attr.aria-selected]=\"isGroupSelected(group.id, currentGroup.id)\"\n            [attr.aria-controls]=\"\n              isGroupSelected(group.id, currentGroup.id)\n                ? createAriaControls(group.id)\n                : null\n            \"\n            [attr.aria-label]=\"getAriaLabel(group)\"\n            [cxFocus]=\"{\n              key: group.id\n            }\"\n            (click)=\"click(group)\"\n            [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n            (keydown)=\"\n              switchGroupOnArrowPress($event, groupIndex, group, currentGroup)\n            \"\n          >\n            <span title=\"{{ group.description }}\">{{ group.description }}</span>\n            <div class=\"groupIndicators\">\n              <div class=\"conflictNumberIndicator\">\n                {{ getConflictNumber(group) }}\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"WARNING\"\n                  [type]=\"iconTypes.WARNING\"\n                  id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconConflict' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"groupStatusIndicator\">\n                <cx-icon\n                  class=\"ERROR\"\n                  [type]=\"iconTypes.ERROR\"\n                  id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconIncomplete' | cxTranslate\n                  \"\n                ></cx-icon>\n                <cx-icon\n                  class=\"COMPLETE\"\n                  [type]=\"iconTypes.SUCCESS\"\n                  id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconComplete' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n              <div class=\"subGroupIndicator\">\n                <cx-icon\n                  *ngIf=\"hasSubGroups(group)\"\n                  [type]=\"iconTypes.CARET_RIGHT\"\n                  id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                  [attr.aria-label]=\"\n                    'configurator.a11y.iconSubGroup' | cxTranslate\n                  \"\n                ></cx-icon>\n              </div>\n            </div>\n          </button>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i3.HamburgerMenuService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorGroupMenuService }, { type: i3.DirectionService }, { type: i1$1.TranslationService }]; }, propDecorators: { groups: [{
                type: ViewChildren,
                args: ['groupItem']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupMenuModule {
}
ConfiguratorGroupMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuModule, declarations: [ConfiguratorGroupMenuComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule], exports: [ConfiguratorGroupMenuComponent] });
ConfiguratorGroupMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorMenu: {
                    component: ConfiguratorGroupMenuComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorMenu: {
                                    component: ConfiguratorGroupMenuComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupMenuComponent],
                    exports: [ConfiguratorGroupMenuComponent],
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
class ConfiguratorGroupTitleComponent {
    constructor(configuratorCommonsService, configuratorGroupsService, configRouterExtractorService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.ghostStyle = true;
        this.displayedGroup$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner).pipe(tap(() => {
            this.ghostStyle = false;
        }))));
        this.iconTypes = ICON_TYPE;
    }
}
ConfiguratorGroupTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorGroupTitleComponent, selector: "cx-configurator-group-title", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayedGroup$ | async as group; else ghostGroup\">\n  <div class=\"cx-group-title\">\n    {{ group.description }}\n  </div> </ng-container\n><ng-template #ghostGroup>\n  <div class=\"cx-ghost-group-title\"></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayedGroup$ | async as group; else ghostGroup\">\n  <div class=\"cx-group-title\">\n    {{ group.description }}\n  </div> </ng-container\n><ng-template #ghostGroup>\n  <div class=\"cx-ghost-group-title\"></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupTitleModule {
}
ConfiguratorGroupTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, declarations: [ConfiguratorGroupTitleComponent], imports: [CommonModule], exports: [ConfiguratorGroupTitleComponent] });
ConfiguratorGroupTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorGroupTitle: {
                    component: ConfiguratorGroupTitleComponent,
                },
            },
        }),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorGroupTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorGroupTitle: {
                                    component: ConfiguratorGroupTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupTitleComponent],
                    exports: [ConfiguratorGroupTitleComponent],
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
class ConfiguratorOverviewAttributeComponent {
    constructor(breakpointService) {
        this.breakpointService = breakpointService;
    }
    extractPriceFormulaParameters() {
        return {
            quantity: this.attributeOverview.quantity,
            price: this.attributeOverview.valuePrice,
            priceTotal: this.attributeOverview.valuePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isDesktop() {
        return this.breakpointService.isUp(BREAKPOINT.md);
    }
}
ConfiguratorOverviewAttributeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewAttributeComponent, deps: [{ token: i3.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewAttributeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorOverviewAttributeComponent, selector: "cx-configurator-overview-attribute", inputs: { attributeOverview: "attributeOverview" }, ngImport: i0, template: "<span class=\"cx-visually-hidden\">\n  {{\n    attributeOverview.valuePrice && attributeOverview.valuePrice?.value !== 0\n      ? attributeOverview.valuePriceTotal &&\n        attributeOverview.valuePriceTotal?.value !== 0\n        ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePriceTotal.formattedValue\n              })\n        : ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePrice.formattedValue\n              })\n      : ('configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attributeOverview.value,\n              attribute: attributeOverview.attribute\n            })\n  }}\n</span>\n<div class=\"cx-attribute-value\" aria-hidden=\"true\">\n  {{ attributeOverview.value }}\n</div>\n<ng-container *ngIf=\"isDesktop() | async; else mobile\">\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n<ng-template #mobile>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewAttributeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-attribute', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"cx-visually-hidden\">\n  {{\n    attributeOverview.valuePrice && attributeOverview.valuePrice?.value !== 0\n      ? attributeOverview.valuePriceTotal &&\n        attributeOverview.valuePriceTotal?.value !== 0\n        ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePriceTotal.formattedValue\n              })\n        : ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePrice.formattedValue\n              })\n      : ('configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attributeOverview.value,\n              attribute: attributeOverview.attribute\n            })\n  }}\n</span>\n<div class=\"cx-attribute-value\" aria-hidden=\"true\">\n  {{ attributeOverview.value }}\n</div>\n<ng-container *ngIf=\"isDesktop() | async; else mobile\">\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n<ng-template #mobile>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i3.BreakpointService }]; }, propDecorators: { attributeOverview: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewAttributeModule {
}
ConfiguratorOverviewAttributeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewAttributeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewAttributeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewAttributeModule, declarations: [ConfiguratorOverviewAttributeComponent], imports: [CommonModule, I18nModule, ConfiguratorPriceModule], exports: [ConfiguratorOverviewAttributeComponent] });
ConfiguratorOverviewAttributeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewAttributeModule, imports: [CommonModule, I18nModule, ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewAttributeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfiguratorPriceModule],
                    declarations: [ConfiguratorOverviewAttributeComponent],
                    exports: [ConfiguratorOverviewAttributeComponent],
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
class ConfiguratorOverviewBundleAttributeComponent {
    constructor(productService, translation) {
        this.productService = productService;
        this.translation = translation;
    }
    ngOnInit() {
        const noCommerceProduct = { images: {} };
        if (this.attributeOverview.productCode) {
            this.product$ = this.productService
                .get(this.attributeOverview.productCode, "list" /* ProductScope.LIST */)
                .pipe(map((respProduct) => {
                return respProduct ? respProduct : noCommerceProduct;
            }));
        }
        else {
            this.product$ = of(noCommerceProduct);
        }
    }
    /**
     * Returns primary image from product object
     *
     * @param {Product} product
     * @returns {(ImageGroup | ImageGroup[] | undefined)} - primary image. View can handle an undefined image
     */
    getProductPrimaryImage(product) {
        return product?.images?.PRIMARY;
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attributeOverview.quantity,
            price: this.attributeOverview.valuePrice,
            priceTotal: this.attributeOverview.valuePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Verifies whether the quantity should be displayed.
     *
     * @return {boolean} - 'true' if the quantity should be displayed, otherwise 'false'
     */
    displayQuantity() {
        const quantity = this.attributeOverview.quantity;
        return quantity !== undefined && quantity > 0;
    }
    /**
     * Verifies whether the item price should be displayed.
     *
     * @return {boolean} - 'true' if the item price price should be displayed, otherwise 'false'
     */
    displayPrice() {
        return (this.attributeOverview.valuePrice?.value !== undefined &&
            this.attributeOverview.valuePrice?.value > 0);
    }
    getAriaLabel() {
        let translatedText = '';
        if (this.displayQuantity()) {
            if (this.attributeOverview.valuePrice?.value !== undefined &&
                this.attributeOverview.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithPriceAndQuantity', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    price: this.attributeOverview.valuePriceTotal?.formattedValue,
                    quantity: this.attributeOverview.quantity,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithQuantity', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    quantity: this.attributeOverview.quantity,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        else {
            if (this.attributeOverview.valuePrice?.value !== undefined &&
                this.attributeOverview.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithPrice', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    price: this.attributeOverview.valuePriceTotal?.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFull', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        return translatedText;
    }
}
ConfiguratorOverviewBundleAttributeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewBundleAttributeComponent, deps: [{ token: i1$1.ProductService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewBundleAttributeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorOverviewBundleAttributeComponent, selector: "cx-configurator-cpq-overview-attribute", inputs: { attributeOverview: "attributeOverview" }, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"cx-value-container\">\n    <div class=\"cx-thumbnail\">\n      <cx-media\n        [container]=\"getProductPrimaryImage(product)\"\n        format=\"product\"\n        aria-hidden=\"true\"\n      ></cx-media>\n    </div>\n    <span class=\"cx-visually-hidden\">\n      {{ getAriaLabel() }}\n    </span>\n    <div class=\"cx-value-info\" aria-hidden=\"true\">\n      <div>\n        {{ attributeOverview.value }}\n      </div>\n      <span class=\"cx-code\" *ngIf=\"attributeOverview?.productCode\">\n        {{ 'configurator.attribute.id' | cxTranslate }}:\n        {{ attributeOverview.productCode }}</span\n      >\n      <div *ngIf=\"displayQuantity()\" class=\"cx-quantity\">\n        <span class=\"cx-identifier\">{{\n          'configurator.attribute.quantity' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.quantity | cxNumeric\n        }}</span>\n      </div>\n      <div *ngIf=\"displayPrice()\" class=\"cx-price\">\n        <span class=\"cx-identifier\">{{\n          'configurator.overviewForm.itemPrice' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.valuePrice?.formattedValue\n        }}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cx-attribute-price-container\" aria-hidden=\"true\">\n    <span class=\"cx-attribute-label\">{{ attributeOverview.attribute }}</span>\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewBundleAttributeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-cpq-overview-attribute', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"cx-value-container\">\n    <div class=\"cx-thumbnail\">\n      <cx-media\n        [container]=\"getProductPrimaryImage(product)\"\n        format=\"product\"\n        aria-hidden=\"true\"\n      ></cx-media>\n    </div>\n    <span class=\"cx-visually-hidden\">\n      {{ getAriaLabel() }}\n    </span>\n    <div class=\"cx-value-info\" aria-hidden=\"true\">\n      <div>\n        {{ attributeOverview.value }}\n      </div>\n      <span class=\"cx-code\" *ngIf=\"attributeOverview?.productCode\">\n        {{ 'configurator.attribute.id' | cxTranslate }}:\n        {{ attributeOverview.productCode }}</span\n      >\n      <div *ngIf=\"displayQuantity()\" class=\"cx-quantity\">\n        <span class=\"cx-identifier\">{{\n          'configurator.attribute.quantity' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.quantity | cxNumeric\n        }}</span>\n      </div>\n      <div *ngIf=\"displayPrice()\" class=\"cx-price\">\n        <span class=\"cx-identifier\">{{\n          'configurator.overviewForm.itemPrice' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.valuePrice?.formattedValue\n        }}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cx-attribute-price-container\" aria-hidden=\"true\">\n    <span class=\"cx-attribute-label\">{{ attributeOverview.attribute }}</span>\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i1$1.TranslationService }]; }, propDecorators: { attributeOverview: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewBundleAttributeModule {
}
ConfiguratorOverviewBundleAttributeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewBundleAttributeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, declarations: [ConfiguratorOverviewBundleAttributeComponent], imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule], exports: [ConfiguratorOverviewBundleAttributeComponent] });
ConfiguratorOverviewBundleAttributeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule],
                    declarations: [ConfiguratorOverviewBundleAttributeComponent],
                    exports: [ConfiguratorOverviewBundleAttributeComponent],
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
class ConfiguratorOverviewFormComponent {
    constructor(configuratorCommonsService, configRouterExtractorService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.attributeOverviewType = Configurator.AttributeOverviewType;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService.getOrCreateConfiguration(routerData.owner)), distinctUntilKeyChanged('configId'), switchMap((configuration) => this.configuratorCommonsService.getConfigurationWithOverview(configuration)), filter((configuration) => configuration.overview != null));
    }
    /**
     * Does the configuration contain any selected attribute values?
     * @param {Configurator.Configuration} configuration - Current configuration
     * @returns {boolean} - Any attributes available
     */
    hasAttributes(configuration) {
        return (configuration.overview?.groups?.find((group) => group.attributes ? group.attributes.length : 0 > 0) !== undefined);
    }
    /**
     * Verifies whether the next or the previous attributes are same.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {boolean} - 'True' if it is the same attribute, otherwise 'false'
     */
    isSameAttribute(attributes, index) {
        if (attributes.length > 1) {
            if (index === 0) {
                return (attributes[index]?.attribute === attributes[index + 1]?.attribute);
            }
            else {
                return (attributes[index]?.attribute === attributes[index - 1]?.attribute);
            }
        }
        return false;
    }
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {string} - corresponding style class
     */
    getStyleClasses(attributes, index) {
        let styleClass = '';
        switch (attributes[index]?.type) {
            case this.attributeOverviewType.BUNDLE:
                styleClass += 'bundle';
                break;
            case this.attributeOverviewType.GENERAL:
                styleClass += 'general';
                break;
        }
        if (index === 0 || !this.isSameAttribute(attributes, index)) {
            styleClass += ' margin';
        }
        if (!this.isSameAttribute(attributes, index + 1) &&
            !styleClass.includes('bundle')) {
            styleClass += ' last-value-pair';
        }
        return styleClass;
    }
}
ConfiguratorOverviewFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorOverviewFormComponent, selector: "cx-configurator-overview-form", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"hasAttributes(configuration); else noAttributes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        groups;\n        context: {\n          overviewGroups: configuration.overview.groups,\n          level: 1\n        }\n      \"\n    ></ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #noAttributes>\n  <div class=\"cx-no-attribute-value-pairs\">\n    <!-- We currently do not support filtering on overview page so this should never be displayed -->\n    <h2>{{ 'configurator.overviewForm.noAttributeHeader' | cxTranslate }}</h2>\n    <p>{{ 'configurator.overviewForm.noAttributeText' | cxTranslate }}</p>\n  </div>\n</ng-template>\n\n<ng-template #groups let-overviewGroups=\"overviewGroups\" let-level=\"level\">\n  <span class=\"cx-visually-hidden\">\n    {{ 'configurator.a11y.listOfAttributesAndValues' | cxTranslate }}\n  </span>\n  <ng-container *ngFor=\"let group of overviewGroups\">\n    <div\n      class=\"cx-group\"\n      [class.topLevel]=\"level === 1\"\n      [class.subgroupTopLevel]=\"level === 1 && group.subGroups?.length > 0\"\n    >\n      <span class=\"cx-visually-hidden\">\n        {{\n          'configurator.a11y.group'\n            | cxTranslate\n              : {\n                  group: group.groupDescription\n                }\n        }}\n      </span>\n      <h2 aria-hidden=\"true\">\n        <span>{{ group.groupDescription }}</span>\n      </h2>\n\n      <div\n        *ngFor=\"let attributeOverview of group.attributes; let i = index\"\n        class=\"cx-attribute-value-pair\"\n        [ngClass]=\"getStyleClasses(group.attributes, i)\"\n      >\n        <ng-container [ngSwitch]=\"attributeOverview?.type\">\n          <ng-container *ngSwitchCase=\"attributeOverviewType.GENERAL\">\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"attributeOverviewType.BUNDLE\">\n            <cx-configurator-cpq-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-cpq-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n    <ng-container *ngIf=\"group.subGroups?.length > 0\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          groups;\n          context: { overviewGroups: group.subGroups, level: level + 1 }\n        \"\n      ></ng-container>\n    </ng-container>\n  </ng-container>\n</ng-template>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-group\">\n      <div class=\"cx-ghost-header ghost\"></div>\n      <div class=\"cx-ghost-body\">\n        <ng-container *ngFor=\"let number of [0, 1, 2, 3, 4, 5]\">\n          <div class=\"cx-ghost-attribute-value\">\n            <div class=\"cx-ghost-value ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-label\">\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-price ghost\"></div>\n        </ng-container>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i3$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: ConfiguratorOverviewAttributeComponent, selector: "cx-configurator-overview-attribute", inputs: ["attributeOverview"] }, { kind: "component", type: ConfiguratorOverviewBundleAttributeComponent, selector: "cx-configurator-cpq-overview-attribute", inputs: ["attributeOverview"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"hasAttributes(configuration); else noAttributes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        groups;\n        context: {\n          overviewGroups: configuration.overview.groups,\n          level: 1\n        }\n      \"\n    ></ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #noAttributes>\n  <div class=\"cx-no-attribute-value-pairs\">\n    <!-- We currently do not support filtering on overview page so this should never be displayed -->\n    <h2>{{ 'configurator.overviewForm.noAttributeHeader' | cxTranslate }}</h2>\n    <p>{{ 'configurator.overviewForm.noAttributeText' | cxTranslate }}</p>\n  </div>\n</ng-template>\n\n<ng-template #groups let-overviewGroups=\"overviewGroups\" let-level=\"level\">\n  <span class=\"cx-visually-hidden\">\n    {{ 'configurator.a11y.listOfAttributesAndValues' | cxTranslate }}\n  </span>\n  <ng-container *ngFor=\"let group of overviewGroups\">\n    <div\n      class=\"cx-group\"\n      [class.topLevel]=\"level === 1\"\n      [class.subgroupTopLevel]=\"level === 1 && group.subGroups?.length > 0\"\n    >\n      <span class=\"cx-visually-hidden\">\n        {{\n          'configurator.a11y.group'\n            | cxTranslate\n              : {\n                  group: group.groupDescription\n                }\n        }}\n      </span>\n      <h2 aria-hidden=\"true\">\n        <span>{{ group.groupDescription }}</span>\n      </h2>\n\n      <div\n        *ngFor=\"let attributeOverview of group.attributes; let i = index\"\n        class=\"cx-attribute-value-pair\"\n        [ngClass]=\"getStyleClasses(group.attributes, i)\"\n      >\n        <ng-container [ngSwitch]=\"attributeOverview?.type\">\n          <ng-container *ngSwitchCase=\"attributeOverviewType.GENERAL\">\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"attributeOverviewType.BUNDLE\">\n            <cx-configurator-cpq-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-cpq-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n    <ng-container *ngIf=\"group.subGroups?.length > 0\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          groups;\n          context: { overviewGroups: group.subGroups, level: level + 1 }\n        \"\n      ></ng-container>\n    </ng-container>\n  </ng-container>\n</ng-template>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-group\">\n      <div class=\"cx-ghost-header ghost\"></div>\n      <div class=\"cx-ghost-body\">\n        <ng-container *ngFor=\"let number of [0, 1, 2, 3, 4, 5]\">\n          <div class=\"cx-ghost-attribute-value\">\n            <div class=\"cx-ghost-value ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-label\">\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-price ghost\"></div>\n        </ng-container>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFormModule {
}
ConfiguratorOverviewFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, declarations: [ConfiguratorOverviewFormComponent], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule,
        FeaturesConfigModule], exports: [ConfiguratorOverviewFormComponent] });
ConfiguratorOverviewFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewForm: {
                    component: ConfiguratorOverviewFormComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorOverviewAttributeModule,
                        ConfiguratorOverviewBundleAttributeModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewForm: {
                                    component: ConfiguratorOverviewFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewFormComponent],
                    exports: [ConfiguratorOverviewFormComponent],
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
class ConfiguratorOverviewNotificationBannerComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, commonConfigUtilsService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(filter((routerData) => routerData.owner.type === CommonConfigurator.OwnerType.PRODUCT ||
            routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY), switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
        this.configurationOverview$ = this.configuration$.pipe(map((configuration) => configuration.overview));
        this.numberOfIssues$ = this.configuration$.pipe(map((configuration) => {
            //In case overview carries number of issues: We take it from there.
            //otherwise configuration's number will be accurate
            let configOv = configuration.overview;
            if (configOv?.totalNumberOfIssues) {
                return configOv.numberOfIncompleteCharacteristics !== undefined
                    ? configOv.numberOfIncompleteCharacteristics
                    : configOv.totalNumberOfIssues;
            }
            else {
                return configuration.totalNumberOfIssues
                    ? configuration.totalNumberOfIssues
                    : 0;
            }
        }));
        this.numberOfConflicts$ = this.configuration$.pipe(map((configuration) => {
            return configuration.overview?.numberOfConflicts ?? 0;
        }));
        this.skipConflictsOnIssueNavigation$ = this.configuration$.pipe(map((configuration) => {
            return (configuration.overview?.numberOfConflicts ?? 0) > 0;
        }));
        this.iconTypes = ICON_TYPE;
    }
}
ConfiguratorOverviewNotificationBannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewNotificationBannerComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i2$1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewNotificationBannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorOverviewNotificationBannerComponent, selector: "cx-configurator-overview-notification-banner", ngImport: i0, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configurationOverview$ | async\">\n    <div\n      class=\"cx-error-notification-banner\"\n      *ngIf=\"numberOfIssues$ | async as numberOfIssues\"\n    >\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n      <div class=\"cx-error-msg\" id=\"cx-configurator-overview-error-msg\">\n        {{\n          'configurator.notificationBanner.numberOfIssues'\n            | cxTranslate: { count: numberOfIssues }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-error-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{\n            resolveIssues: true,\n            skipConflicts: skipConflictsOnIssueNavigation$ | async\n          }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveIssues' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <div\n      class=\"cx-conflict-notification-banner\"\n      *ngIf=\"numberOfConflicts$ | async as numberOfConflicts\"\n    >\n      <cx-icon [type]=\"iconTypes.WARNING\"></cx-icon>\n      <div class=\"cx-conflict-msg\" id=\"cx-configurator-overview-conflict-msg\">\n        {{\n          'configurator.notificationBanner.numberOfConflicts'\n            | cxTranslate: { count: numberOfConflicts }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-conflict-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{ resolveIssues: true }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveConflicts' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i5$1.RouterLink, selector: ":not(a):not(area)[routerLink]", inputs: ["queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewNotificationBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-notification-banner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configurationOverview$ | async\">\n    <div\n      class=\"cx-error-notification-banner\"\n      *ngIf=\"numberOfIssues$ | async as numberOfIssues\"\n    >\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n      <div class=\"cx-error-msg\" id=\"cx-configurator-overview-error-msg\">\n        {{\n          'configurator.notificationBanner.numberOfIssues'\n            | cxTranslate: { count: numberOfIssues }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-error-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{\n            resolveIssues: true,\n            skipConflicts: skipConflictsOnIssueNavigation$ | async\n          }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveIssues' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <div\n      class=\"cx-conflict-notification-banner\"\n      *ngIf=\"numberOfConflicts$ | async as numberOfConflicts\"\n    >\n      <cx-icon [type]=\"iconTypes.WARNING\"></cx-icon>\n      <div class=\"cx-conflict-msg\" id=\"cx-configurator-overview-conflict-msg\">\n        {{\n          'configurator.notificationBanner.numberOfConflicts'\n            | cxTranslate: { count: numberOfConflicts }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-conflict-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{ resolveIssues: true }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveConflicts' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i2$1.CommonConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewNotificationBannerModule {
}
ConfiguratorOverviewNotificationBannerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewNotificationBannerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, declarations: [ConfiguratorOverviewNotificationBannerComponent], imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule], exports: [ConfiguratorOverviewNotificationBannerComponent] });
ConfiguratorOverviewNotificationBannerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewBanner: {
                    component: ConfiguratorOverviewNotificationBannerComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewBanner: {
                                    component: ConfiguratorOverviewNotificationBannerComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewNotificationBannerComponent],
                    exports: [ConfiguratorOverviewNotificationBannerComponent],
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
class ConfiguratorPreviousNextButtonsComponent {
    constructor(configuratorGroupsService, configuratorCommonsService, configRouterExtractorService, configUtils) {
        this.configuratorGroupsService = configuratorGroupsService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configUtils = configUtils;
        this.configuration$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
    }
    onPrevious(configuration) {
        this.configuratorGroupsService
            .getPreviousGroupId(configuration.owner)
            .pipe(take(1))
            .subscribe((groupId) => {
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusFirstAttribute();
            }
        });
        this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
    }
    onNext(configuration) {
        this.configuratorGroupsService
            .getNextGroupId(configuration.owner)
            .pipe(take(1))
            .subscribe((groupId) => {
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusFirstAttribute();
            }
        });
        this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
    }
    isFirstGroup(owner) {
        return this.configuratorGroupsService
            .getPreviousGroupId(owner)
            .pipe(map((group) => !group));
    }
    isLastGroup(owner) {
        return this.configuratorGroupsService
            .getNextGroupId(owner)
            .pipe(map((group) => !group));
    }
    focusFirstAttribute() {
        this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService
            .isConfigurationLoading(routerData.owner)
            .pipe(filter((isLoading) => isLoading), take(1), switchMap(() => this.configuratorCommonsService
            .isConfigurationLoading(routerData.owner)
            .pipe(filter((isLoading) => !isLoading), take(1), delay(0) //we need to consider the re-rendering of the page
        )))))
            .subscribe(() => this.configUtils.focusFirstAttribute());
    }
}
ConfiguratorPreviousNextButtonsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPreviousNextButtonsComponent, deps: [{ token: ConfiguratorGroupsService }, { token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPreviousNextButtonsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorPreviousNextButtonsComponent, selector: "cx-configurator-previous-next-buttons", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration?.groups?.length > 1\">\n    <button\n      class=\"cx-btn btn btn-action\"\n      [disabled]=\"isFirstGroup(configuration.owner) | async\"\n      (click)=\"onPrevious(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.previous' | cxTranslate\"\n    >\n      {{ 'configurator.button.previous' | cxTranslate }}\n    </button>\n    <button\n      class=\"cx-btn btn btn-secondary\"\n      [disabled]=\"isLastGroup(configuration.owner) | async\"\n      (click)=\"onNext(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.next' | cxTranslate\"\n    >\n      {{ 'configurator.button.next' | cxTranslate }}\n    </button>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPreviousNextButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-previous-next-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration?.groups?.length > 1\">\n    <button\n      class=\"cx-btn btn btn-action\"\n      [disabled]=\"isFirstGroup(configuration.owner) | async\"\n      (click)=\"onPrevious(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.previous' | cxTranslate\"\n    >\n      {{ 'configurator.button.previous' | cxTranslate }}\n    </button>\n    <button\n      class=\"cx-btn btn btn-secondary\"\n      [disabled]=\"isLastGroup(configuration.owner) | async\"\n      (click)=\"onNext(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.next' | cxTranslate\"\n    >\n      {{ 'configurator.button.next' | cxTranslate }}\n    </button>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorGroupsService }, { type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorStorefrontUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPreviousNextButtonsModule {
}
ConfiguratorPreviousNextButtonsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPreviousNextButtonsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, declarations: [ConfiguratorPreviousNextButtonsComponent], imports: [CommonModule, I18nModule, KeyboardFocusModule], exports: [ConfiguratorPreviousNextButtonsComponent] });
ConfiguratorPreviousNextButtonsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorPrevNext: {
                    component: ConfiguratorPreviousNextButtonsComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorPrevNext: {
                                    component: ConfiguratorPreviousNextButtonsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorPreviousNextButtonsComponent],
                    exports: [ConfiguratorPreviousNextButtonsComponent],
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
class ConfiguratorPriceSummaryComponent {
    constructor(configuratorCommonsService, configRouterExtractorService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => {
            return this.configuratorCommonsService.getConfiguration(routerData.owner);
        }));
    }
}
ConfiguratorPriceSummaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPriceSummaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorPriceSummaryComponent, selector: "cx-configurator-price-summary", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <div class=\"cx-price-summary-container\">\n    <div class=\"cx-total-summary\">\n      <div class=\"cx-summary-row cx-base-price\">\n        <div class=\"cx-label\">\n          {{ 'configurator.priceSummary.basePrice' | cxTranslate }}:\n        </div>\n        <div class=\"cx-amount\">\n          {{ configuration?.priceSummary?.basePrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-selected-options\">\n        <div class=\"cx-label\">\n          {{ 'configurator.priceSummary.selectedOptions' | cxTranslate }}:\n        </div>\n        <div class=\"cx-amount\">\n          {{ configuration?.priceSummary?.selectedOptions?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-total-price\">\n        <div class=\"cx-label\">\n          {{ 'configurator.priceSummary.totalPrice' | cxTranslate }}:\n        </div>\n        <div class=\"cx-amount\">\n          {{ configuration?.priceSummary?.currentTotal?.formattedValue }}\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-price-summary', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <div class=\"cx-price-summary-container\">\n    <div class=\"cx-total-summary\">\n      <div class=\"cx-summary-row cx-base-price\">\n        <div class=\"cx-label\">\n          {{ 'configurator.priceSummary.basePrice' | cxTranslate }}:\n        </div>\n        <div class=\"cx-amount\">\n          {{ configuration?.priceSummary?.basePrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-selected-options\">\n        <div class=\"cx-label\">\n          {{ 'configurator.priceSummary.selectedOptions' | cxTranslate }}:\n        </div>\n        <div class=\"cx-amount\">\n          {{ configuration?.priceSummary?.selectedOptions?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-total-price\">\n        <div class=\"cx-label\">\n          {{ 'configurator.priceSummary.totalPrice' | cxTranslate }}:\n        </div>\n        <div class=\"cx-amount\">\n          {{ configuration?.priceSummary?.currentTotal?.formattedValue }}\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceSummaryModule {
}
ConfiguratorPriceSummaryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPriceSummaryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, declarations: [ConfiguratorPriceSummaryComponent], imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule], exports: [ConfiguratorPriceSummaryComponent] });
ConfiguratorPriceSummaryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorPriceSummary: {
                    component: ConfiguratorPriceSummaryComponent,
                },
            },
        }),
    ], imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorPriceSummaryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorPriceSummary: {
                                    component: ConfiguratorPriceSummaryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorPriceSummaryComponent],
                    exports: [ConfiguratorPriceSummaryComponent],
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
class ConfiguratorProductTitleComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, productService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.productService = productService;
        this.ghostStyle = true;
        this.product$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)), map((configuration) => {
            switch (configuration.owner.type) {
                case CommonConfigurator.OwnerType.PRODUCT:
                case CommonConfigurator.OwnerType.CART_ENTRY:
                    return configuration.productCode;
                case CommonConfigurator.OwnerType.ORDER_ENTRY:
                    return configuration.overview?.productCode;
            }
        }), switchMap((productCode) => productCode
            ? this.productService.get(productCode, "list" /* ProductScope.LIST */)
            : EMPTY))
            .pipe(tap(() => {
            this.ghostStyle = false;
        }));
        this.showMore = false;
        this.iconTypes = ICON_TYPE;
    }
    triggerDetails() {
        this.showMore = !this.showMore;
    }
}
ConfiguratorProductTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i1$1.ProductService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorProductTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorProductTitleComponent, selector: "cx-configurator-product-title", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product; else ghostProductTitle\">\n  <div class=\"cx-general-product-info\">\n    <div class=\"cx-title\">\n      <span> {{ product.name }} </span>\n    </div>\n    <button (click)=\"triggerDetails()\" [attr.aria-expanded]=\"showMore\">\n      <ng-container *ngIf=\"!showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showMoreProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          <span aria-hidden=\"true\">{{\n            'configurator.header.showMore' | cxTranslate\n          }}</span>\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_DOWN\"></cx-icon>\n      </ng-container>\n\n      <ng-container *ngIf=\"showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showLessProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          {{ 'configurator.header.showLess' | cxTranslate }}\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_UP\"></cx-icon>\n      </ng-container>\n    </button>\n    <div class=\"cx-details\" [class.open]=\"showMore\">\n      <div class=\"cx-details-image\" aria-hidden=\"true\">\n        <cx-media\n          [container]=\"product?.images?.PRIMARY\"\n          format=\"product\"\n        ></cx-media>\n      </div>\n      <div\n        class=\"cx-details-content\"\n        [attr.aria-hidden]=\"showMore ? false : true\"\n      >\n        <div class=\"cx-detail-title\">\n          <span\n            *ngIf=\"product.name\"\n            [attr.aria-label]=\"'configurator.a11y.productName' | cxTranslate\"\n          >\n            {{ product.name }}\n          </span>\n        </div>\n        <div class=\"cx-code\">\n          <span\n            *ngIf=\"product.code\"\n            [attr.aria-label]=\"'configurator.a11y.productCode' | cxTranslate\"\n          >\n            {{ product.code }}\n          </span>\n        </div>\n        <div class=\"cx-description\">\n          <span\n            *ngIf=\"product.description\"\n            [attr.aria-label]=\"\n              'configurator.a11y.productDescription' | cxTranslate\n            \"\n          >\n            {{ product.description }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-template #ghostProductTitle>\n  <div class=\"cx-ghost-general-product-info\"></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-product-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product; else ghostProductTitle\">\n  <div class=\"cx-general-product-info\">\n    <div class=\"cx-title\">\n      <span> {{ product.name }} </span>\n    </div>\n    <button (click)=\"triggerDetails()\" [attr.aria-expanded]=\"showMore\">\n      <ng-container *ngIf=\"!showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showMoreProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          <span aria-hidden=\"true\">{{\n            'configurator.header.showMore' | cxTranslate\n          }}</span>\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_DOWN\"></cx-icon>\n      </ng-container>\n\n      <ng-container *ngIf=\"showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showLessProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          {{ 'configurator.header.showLess' | cxTranslate }}\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_UP\"></cx-icon>\n      </ng-container>\n    </button>\n    <div class=\"cx-details\" [class.open]=\"showMore\">\n      <div class=\"cx-details-image\" aria-hidden=\"true\">\n        <cx-media\n          [container]=\"product?.images?.PRIMARY\"\n          format=\"product\"\n        ></cx-media>\n      </div>\n      <div\n        class=\"cx-details-content\"\n        [attr.aria-hidden]=\"showMore ? false : true\"\n      >\n        <div class=\"cx-detail-title\">\n          <span\n            *ngIf=\"product.name\"\n            [attr.aria-label]=\"'configurator.a11y.productName' | cxTranslate\"\n          >\n            {{ product.name }}\n          </span>\n        </div>\n        <div class=\"cx-code\">\n          <span\n            *ngIf=\"product.code\"\n            [attr.aria-label]=\"'configurator.a11y.productCode' | cxTranslate\"\n          >\n            {{ product.code }}\n          </span>\n        </div>\n        <div class=\"cx-description\">\n          <span\n            *ngIf=\"product.description\"\n            [attr.aria-label]=\"\n              'configurator.a11y.productDescription' | cxTranslate\n            \"\n          >\n            {{ product.description }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-template #ghostProductTitle>\n  <div class=\"cx-ghost-general-product-info\"></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i1$1.ProductService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorProductTitleModule {
}
ConfiguratorProductTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorProductTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, declarations: [ConfiguratorProductTitleComponent], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        IconModule,
        MediaModule,
        FeaturesConfigModule], exports: [ConfiguratorProductTitleComponent] });
ConfiguratorProductTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorProductTitle: {
                    component: ConfiguratorProductTitleComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        IconModule,
        MediaModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorProductTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        MediaModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorProductTitle: {
                                    component: ConfiguratorProductTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorProductTitleComponent],
                    exports: [ConfiguratorProductTitleComponent],
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
class ConfiguratorTabBarComponent {
    constructor(configRouterExtractorService, configuratorCommonsService) {
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.ghostStyle = true;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner).pipe(tap(() => {
            this.ghostStyle = false;
        }))));
        this.isOverviewPage$ = this.routerData$.pipe(map((routerData) => routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW));
    }
}
ConfiguratorTabBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTabBarComponent, deps: [{ token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTabBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorTabBarComponent, selector: "cx-configurator-tab-bar", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configuration$ | async; else ghostTabBar\">\n    <ng-container *ngIf=\"!routerData.displayOnly\">\n      <div class=\"cx-tab-bar\">\n        <a\n          tabindex=\"0\"\n          [class.active]=\"!(isOverviewPage$ | async)\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            !(isOverviewPage$ | async)\n              ? ('configurator.a11y.configurationPage' | cxTranslate)\n              : ('configurator.a11y.configurationPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.configuration' | cxTranslate }}</a\n        >\n        <a\n          tabindex=\"0\"\n          [class.active]=\"isOverviewPage$ | async\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configureOverview' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            (isOverviewPage$ | async)\n              ? ('configurator.a11y.overviewPage' | cxTranslate)\n              : ('configurator.a11y.overviewPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.overview' | cxTranslate }}</a\n        >\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-template #ghostTabBar>\n    <div class=\"cx-ghost-tab-bar\"></div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5$1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTabBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-tab-bar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configuration$ | async; else ghostTabBar\">\n    <ng-container *ngIf=\"!routerData.displayOnly\">\n      <div class=\"cx-tab-bar\">\n        <a\n          tabindex=\"0\"\n          [class.active]=\"!(isOverviewPage$ | async)\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            !(isOverviewPage$ | async)\n              ? ('configurator.a11y.configurationPage' | cxTranslate)\n              : ('configurator.a11y.configurationPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.configuration' | cxTranslate }}</a\n        >\n        <a\n          tabindex=\"0\"\n          [class.active]=\"isOverviewPage$ | async\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configureOverview' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            (isOverviewPage$ | async)\n              ? ('configurator.a11y.overviewPage' | cxTranslate)\n              : ('configurator.a11y.overviewPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.overview' | cxTranslate }}</a\n        >\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-template #ghostTabBar>\n    <div class=\"cx-ghost-tab-bar\"></div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorCommonsService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTabBarModule {
}
ConfiguratorTabBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTabBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorTabBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTabBarModule, declarations: [ConfiguratorTabBarComponent], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule,
        RouterModule], exports: [ConfiguratorTabBarComponent] });
ConfiguratorTabBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTabBarModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorTabBar: {
                    component: ConfiguratorTabBarComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTabBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorTabBar: {
                                    component: ConfiguratorTabBarComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorTabBarComponent],
                    exports: [ConfiguratorTabBarComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorMessageConfig = {
    productConfigurator: {
        updateConfigurationMessage: {
            waitingTime: 1000,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorUpdateMessageComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, config) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.config = config;
        this.hasPendingChanges$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.hasPendingChanges(routerData.owner)), distinctUntilChanged() // avoid subsequent emissions of the same value from the source observable
        );
    }
}
ConfiguratorUpdateMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUpdateMessageComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorMessageConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorUpdateMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorUpdateMessageComponent, selector: "cx-configurator-update-message", ngImport: i0, template: "<div aria-live=\"polite\" aria-atomic=\"false\">\n  <div class=\"cx-update-msg\" [class.visible]=\"hasPendingChanges$ | async\">\n    <cx-spinner></cx-spinner>\n    <strong>{{ 'configurator.header.updateMessage' | cxTranslate }}</strong>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUpdateMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-update-message', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div aria-live=\"polite\" aria-atomic=\"false\">\n  <div class=\"cx-update-msg\" [class.visible]=\"hasPendingChanges$ | async\">\n    <cx-spinner></cx-spinner>\n    <strong>{{ 'configurator.header.updateMessage' | cxTranslate }}</strong>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorMessageConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorUpdateMessageModule {
}
ConfiguratorUpdateMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUpdateMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorUpdateMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUpdateMessageModule, declarations: [ConfiguratorUpdateMessageComponent], imports: [CommonModule, SpinnerModule, I18nModule], exports: [ConfiguratorUpdateMessageComponent] });
ConfiguratorUpdateMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUpdateMessageModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorUpdateMessage: {
                    component: ConfiguratorUpdateMessageComponent,
                },
            },
        }),
        provideDefaultConfig(defaultConfiguratorMessageConfig),
        { provide: ConfiguratorMessageConfig, useExisting: Config },
    ], imports: [CommonModule, SpinnerModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorUpdateMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpinnerModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorUpdateMessage: {
                                    component: ConfiguratorUpdateMessageComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultConfiguratorMessageConfig),
                        { provide: ConfiguratorMessageConfig, useExisting: Config },
                    ],
                    declarations: [ConfiguratorUpdateMessageComponent],
                    exports: [ConfiguratorUpdateMessageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictAndErrorMessagesComponent {
    constructor(configuratorCommonsService, configRouterExtractorService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.iconTypes = ICON_TYPE;
        this.configuration$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
        this.showWarnings = false;
        this.showErrors = false;
    }
    toggleWarnings() {
        this.showWarnings = !this.showWarnings;
    }
    toggleErrors() {
        this.showErrors = !this.showErrors;
    }
}
ConfiguratorConflictAndErrorMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictAndErrorMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorConflictAndErrorMessagesComponent, selector: "cx-configuration-conflict-and-error-messages", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration?.warningMessages?.length > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      class=\"alert-message alert-message-invalid-warning\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"WARNING\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-warning-text\"\n        *ngIf=\"configuration?.warningMessages?.length > 1\"\n      >\n        {{ 'configurator.header.multipleWarnings' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleWarnings()\"\n        *ngIf=\"configuration?.warningMessages?.length > 1\"\n        class=\"cx-warning-toggle\"\n        [attr.aria-expanded]=\"showWarnings\"\n      >\n        {{ 'configurator.header.reviewWarnings' | cxTranslate }}\n\n        <ng-container *ngIf=\"!showWarnings\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showWarnings\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-warning-messages\"\n        [class.inline]=\"configuration?.warningMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-warning-message\"\n          [class.open]=\"\n            showWarnings || configuration?.warningMessages?.length === 1\n          \"\n          *ngFor=\"let warningMessage of configuration.warningMessages\"\n        >\n          {{ warningMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"configuration?.errorMessages?.length > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      role=\"alert\"\n      class=\"alert-message alert-message-error\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"ERROR\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-error-text\"\n        *ngIf=\"configuration?.errorMessages?.length > 1\"\n      >\n        {{ 'configurator.header.multipleErrors' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleErrors()\"\n        *ngIf=\"configuration?.errorMessages?.length > 1\"\n        class=\"cx-error-toggle\"\n        [attr.aria-expanded]=\"showErrors\"\n      >\n        {{ 'configurator.header.reviewErrors' | cxTranslate }}\n        <ng-container *ngIf=\"!showErrors\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showErrors\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-error-messages\"\n        [class.inline]=\"configuration?.errorMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-error-message\"\n          [class.open]=\"\n            showErrors || configuration?.errorMessages?.length === 1\n          \"\n          *ngFor=\"let errorMessage of configuration.errorMessages\"\n        >\n          {{ errorMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configuration-conflict-and-error-messages', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration?.warningMessages?.length > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      class=\"alert-message alert-message-invalid-warning\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"WARNING\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-warning-text\"\n        *ngIf=\"configuration?.warningMessages?.length > 1\"\n      >\n        {{ 'configurator.header.multipleWarnings' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleWarnings()\"\n        *ngIf=\"configuration?.warningMessages?.length > 1\"\n        class=\"cx-warning-toggle\"\n        [attr.aria-expanded]=\"showWarnings\"\n      >\n        {{ 'configurator.header.reviewWarnings' | cxTranslate }}\n\n        <ng-container *ngIf=\"!showWarnings\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showWarnings\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-warning-messages\"\n        [class.inline]=\"configuration?.warningMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-warning-message\"\n          [class.open]=\"\n            showWarnings || configuration?.warningMessages?.length === 1\n          \"\n          *ngFor=\"let warningMessage of configuration.warningMessages\"\n        >\n          {{ warningMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"configuration?.errorMessages?.length > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      role=\"alert\"\n      class=\"alert-message alert-message-error\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"ERROR\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-error-text\"\n        *ngIf=\"configuration?.errorMessages?.length > 1\"\n      >\n        {{ 'configurator.header.multipleErrors' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleErrors()\"\n        *ngIf=\"configuration?.errorMessages?.length > 1\"\n        class=\"cx-error-toggle\"\n        [attr.aria-expanded]=\"showErrors\"\n      >\n        {{ 'configurator.header.reviewErrors' | cxTranslate }}\n        <ng-container *ngIf=\"!showErrors\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showErrors\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-error-messages\"\n        [class.inline]=\"configuration?.errorMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-error-message\"\n          [class.open]=\"\n            showErrors || configuration?.errorMessages?.length === 1\n          \"\n          *ngFor=\"let errorMessage of configuration.errorMessages\"\n        >\n          {{ errorMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictAndErrorMessagesModule {
}
ConfiguratorConflictAndErrorMessagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictAndErrorMessagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, declarations: [ConfiguratorConflictAndErrorMessagesComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule], exports: [ConfiguratorConflictAndErrorMessagesComponent] });
ConfiguratorConflictAndErrorMessagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CpqConfiguratorConflictAndErrorMessagesComponent: {
                    component: ConfiguratorConflictAndErrorMessagesComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CpqConfiguratorConflictAndErrorMessagesComponent: {
                                    component: ConfiguratorConflictAndErrorMessagesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorConflictAndErrorMessagesComponent],
                    exports: [ConfiguratorConflictAndErrorMessagesComponent],
                }]
        }] });

class ConfiguratorExitButtonComponent {
    constructor(productService, routingService, configRouterExtractorService, configuratorCommonsService, breakpointService, windowRef, location) {
        this.productService = productService;
        this.routingService = routingService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.breakpointService = breakpointService;
        this.windowRef = windowRef;
        this.location = location;
        this.container$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })))
            .pipe(switchMap((cont) => this.productService.get(cont.configuration.productCode).pipe(map((product) => ({
            routerData: cont.routerData,
            configuration: cont.configuration,
            product,
        })))))));
    }
    navigateToCart() {
        this.routingService.go('cart');
    }
    /**
     * Navigates to the product detail page of the product that is being configured.
     */
    exitConfiguration() {
        this.container$.pipe(take(1)).subscribe((container) => {
            if (container.routerData.owner.type ===
                CommonConfigurator.OwnerType.CART_ENTRY) {
                this.navigateToCart();
            }
            else {
                this.routingService.go({
                    cxRoute: 'product',
                    params: container.product,
                });
            }
        });
    }
    /**
     * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isDesktop() {
        return this.breakpointService.isUp(BREAKPOINT.md);
    }
    /**
     * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.sm`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.sm` returns `true`, otherwise `false`.
     */
    isMobile() {
        return this.breakpointService.isDown(BREAKPOINT.sm);
    }
}
ConfiguratorExitButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorExitButtonComponent, deps: [{ token: i1$1.ProductService }, { token: i1$1.RoutingService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorCommonsService }, { token: i3.BreakpointService }, { token: i1$1.WindowRef }, { token: i3$1.Location }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorExitButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorExitButtonComponent, selector: "cx-configurator-exit-button", ngImport: i0, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <button\n    class=\"cx-config-exit-button\"\n    tabindex=\"0\"\n    (click)=\"exitConfiguration()\"\n  >\n    <ng-container *ngIf=\"!container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.exit' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.exitMobile' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.cancelConfigurationMobile' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.cancelConfiguration' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorExitButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-exit-button', template: "<ng-container *ngIf=\"container$ | async as container\">\n  <button\n    class=\"cx-config-exit-button\"\n    tabindex=\"0\"\n    (click)=\"exitConfiguration()\"\n  >\n    <ng-container *ngIf=\"!container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.exit' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.exitMobile' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.cancelConfigurationMobile' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.cancelConfiguration' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i1$1.RoutingService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorCommonsService }, { type: i3.BreakpointService }, { type: i1$1.WindowRef }, { type: i3$1.Location }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorExitButtonModule {
}
ConfiguratorExitButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorExitButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorExitButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorExitButtonModule, declarations: [ConfiguratorExitButtonComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorExitButtonComponent] });
ConfiguratorExitButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorExitButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorExitButton: {
                    component: ConfiguratorExitButtonComponent,
                },
            },
        }),
        WindowRef,
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorExitButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorExitButton: {
                                    component: ConfiguratorExitButtonComponent,
                                },
                            },
                        }),
                        WindowRef,
                    ],
                    declarations: [ConfiguratorExitButtonComponent],
                    exports: [ConfiguratorExitButtonComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RulebasedConfiguratorComponentsModule {
}
RulebasedConfiguratorComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorComponentsModule, imports: [ConfiguratorPriceSummaryModule,
        ConfiguratorAddToCartButtonModule,
        ConfiguratorGroupMenuModule,
        ConfiguratorProductTitleModule,
        ConfiguratorTabBarModule,
        ConfiguratorFormModule,
        ConfiguratorGroupTitleModule,
        ConfiguratorUpdateMessageModule,
        ConfiguratorPreviousNextButtonsModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewFormModule,
        ConfiguratorOverviewNotificationBannerModule,
        ConfiguratorConflictAndErrorMessagesModule,
        ConfiguratorExitButtonModule] });
RulebasedConfiguratorComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorComponentsModule, imports: [ConfiguratorPriceSummaryModule,
        ConfiguratorAddToCartButtonModule,
        ConfiguratorGroupMenuModule,
        ConfiguratorProductTitleModule,
        ConfiguratorTabBarModule,
        ConfiguratorFormModule,
        ConfiguratorGroupTitleModule,
        ConfiguratorUpdateMessageModule,
        ConfiguratorPreviousNextButtonsModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewFormModule,
        ConfiguratorOverviewNotificationBannerModule,
        ConfiguratorConflictAndErrorMessagesModule,
        ConfiguratorExitButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ConfiguratorPriceSummaryModule,
                        ConfiguratorAddToCartButtonModule,
                        ConfiguratorGroupMenuModule,
                        ConfiguratorProductTitleModule,
                        ConfiguratorTabBarModule,
                        ConfiguratorFormModule,
                        ConfiguratorGroupTitleModule,
                        ConfiguratorUpdateMessageModule,
                        ConfiguratorPreviousNextButtonsModule,
                        ConfiguratorOverviewAttributeModule,
                        ConfiguratorOverviewFormModule,
                        ConfiguratorOverviewNotificationBannerModule,
                        ConfiguratorConflictAndErrorMessagesModule,
                        ConfiguratorExitButtonModule,
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
class OccConfiguratorVariantAddToCartSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.productCode },
            quantity: source.quantity,
            configId: source.configId,
        };
        return resultTarget;
    }
}
OccConfiguratorVariantAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var OccConfigurator;
(function (OccConfigurator) {
    let GroupType;
    (function (GroupType) {
        GroupType["CSTIC_GROUP"] = "CSTIC_GROUP";
        GroupType["INSTANCE"] = "INSTANCE";
        GroupType["CONFLICT_HEADER"] = "CONFLICT_HEADER";
        GroupType["CONFLICT"] = "CONFLICT";
    })(GroupType = OccConfigurator.GroupType || (OccConfigurator.GroupType = {}));
    let UiType;
    (function (UiType) {
        UiType["STRING"] = "STRING";
        UiType["NUMERIC"] = "NUMERIC";
        UiType["CHECK_BOX"] = "CHECK_BOX";
        UiType["CHECK_BOX_LIST"] = "CHECK_BOX_LIST";
        UiType["RADIO_BUTTON"] = "RADIO_BUTTON";
        UiType["RADIO_BUTTON_ADDITIONAL_INPUT"] = "RADIO_BUTTON_ADDITIONAL_INPUT";
        UiType["DROPDOWN"] = "DROPDOWN";
        UiType["DROPDOWN_ADDITIONAL_INPUT"] = "DROPDOWN_ADDITIONAL_INPUT";
        UiType["READ_ONLY"] = "READ_ONLY";
        UiType["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
        UiType["SINGLE_SELECTION_IMAGE"] = "SINGLE_SELECTION_IMAGE";
        UiType["MULTI_SELECTION_IMAGE"] = "MULTI_SELECTION_IMAGE";
    })(UiType = OccConfigurator.UiType || (OccConfigurator.UiType = {}));
    let PriceType;
    (function (PriceType) {
        PriceType["BUY"] = "BUY";
    })(PriceType = OccConfigurator.PriceType || (OccConfigurator.PriceType = {}));
    let ImageFormatType;
    (function (ImageFormatType) {
        ImageFormatType["VALUE_IMAGE"] = "VALUE_IMAGE";
        ImageFormatType["CSTIC_IMAGE"] = "CSTIC_IMAGE";
    })(ImageFormatType = OccConfigurator.ImageFormatType || (OccConfigurator.ImageFormatType = {}));
    let ImageType;
    (function (ImageType) {
        ImageType["PRIMARY"] = "PRIMARY";
        ImageType["GALLERY"] = "GALLERY";
    })(ImageType = OccConfigurator.ImageType || (OccConfigurator.ImageType = {}));
})(OccConfigurator || (OccConfigurator = {}));

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantNormalizer {
    constructor(config, translation, uiSettingsConfig) {
        this.config = config;
        this.translation = translation;
        this.uiSettingsConfig = uiSettingsConfig;
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            owner: target?.owner ?? ConfiguratorModelUtils.createInitialOwner(),
            interactionState: target?.interactionState ?? {},
            configId: source.configId,
            complete: source.complete,
            consistent: source.consistent,
            totalNumberOfIssues: source.totalNumberOfIssues,
            productCode: source.rootProduct,
            groups: [],
            flatGroups: [],
        };
        const flatGroups = [];
        source.groups?.forEach((group) => this.convertGroup(group, resultTarget.groups, flatGroups));
        resultTarget.flatGroups = flatGroups;
        return resultTarget;
    }
    convertGroup(source, groupList, flatGroupList) {
        const attributes = [];
        if (source.attributes) {
            source.attributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, attributes));
        }
        const group = {
            description: source.description,
            configurable: source.configurable,
            complete: source.complete,
            consistent: source.consistent,
            groupType: this.convertGroupType(source.groupType),
            name: source.name,
            id: source.id,
            attributes: attributes,
            subGroups: [],
        };
        this.setGroupDescription(group);
        if (source.subGroups) {
            source.subGroups.forEach((sourceSubGroup) => this.convertGroup(sourceSubGroup, group.subGroups, flatGroupList));
        }
        if (group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP ||
            group.groupType === Configurator.GroupType.CONFLICT_GROUP) {
            flatGroupList.push(group);
        }
        groupList.push(group);
    }
    getGroupId(key, name) {
        return key.replace('@' + name, '');
    }
    convertAttribute(sourceAttribute, attributeList) {
        const numberOfConflicts = sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length
            : 0;
        const attributeImages = [];
        const attributeValues = [];
        if (sourceAttribute.images) {
            sourceAttribute.images.forEach((occImage) => this.convertImage(occImage, attributeImages));
        }
        this.addRetractValue(sourceAttribute, attributeValues);
        if (sourceAttribute.domainValues) {
            sourceAttribute.domainValues.forEach((value) => this.convertValue(value, attributeValues));
        }
        const uiType = this.convertAttributeType(sourceAttribute);
        const attribute = {
            name: sourceAttribute.name,
            label: sourceAttribute.langDepName,
            required: sourceAttribute.required,
            uiType: uiType,
            groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
            userInput: uiType === Configurator.UiType.NUMERIC ||
                uiType === Configurator.UiType.STRING
                ? sourceAttribute.formattedValue
                    ? sourceAttribute.formattedValue
                    : ''
                : undefined,
            maxlength: (sourceAttribute.maxlength ?? 0) +
                (sourceAttribute.negativeAllowed ? 1 : 0),
            numDecimalPlaces: sourceAttribute.numberScale,
            negativeAllowed: sourceAttribute.negativeAllowed,
            numTotalLength: sourceAttribute.typeLength,
            selectedSingleValue: undefined,
            hasConflicts: numberOfConflicts > 0,
            images: attributeImages,
            values: attributeValues,
            intervalInDomain: sourceAttribute.intervalInDomain,
            key: sourceAttribute.key,
            validationType: sourceAttribute.validationType,
        };
        this.setSelectedSingleValue(attribute);
        //Has to be called after setSelectedSingleValue because it depends on the value of this property
        this.compileAttributeIncomplete(attribute);
        attributeList.push(attribute);
    }
    setSelectedSingleValue(attribute) {
        if (attribute.values) {
            const selectedValues = attribute.values
                .map((entry) => entry)
                .filter((entry) => entry.selected);
            if (selectedValues && selectedValues.length === 1) {
                attribute.selectedSingleValue = selectedValues[0].valueCode;
            }
        }
    }
    isRetractValueSelected(sourceAttribute) {
        return sourceAttribute.domainValues &&
            sourceAttribute.domainValues.filter((value) => value.selected).length
            ? false
            : true;
    }
    setRetractValueDisplay(attributeType, value) {
        if (attributeType === Configurator.UiType.DROPDOWN ||
            attributeType === Configurator.UiType.RADIOBUTTON) {
            if (attributeType === Configurator.UiType.DROPDOWN && value.selected) {
                this.translation
                    .translate('configurator.attribute.dropDownSelectMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
            else {
                this.translation
                    .translate('configurator.attribute.noOptionSelectedMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
        }
    }
    hasSourceAttributeConflicts(sourceAttribute) {
        return sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length > 0
            : false;
    }
    isSourceAttributeTypeReadOnly(sourceAttribute) {
        return sourceAttribute.type === OccConfigurator.UiType.READ_ONLY;
    }
    isRetractBlocked(sourceAttribute) {
        return sourceAttribute.retractBlocked
            ? sourceAttribute.retractBlocked
            : false;
    }
    addRetractValue(sourceAttribute, values) {
        const isRetractBlocked = this.isRetractBlocked(sourceAttribute);
        const isConflicting = this.hasSourceAttributeConflicts(sourceAttribute);
        if (!isRetractBlocked) {
            if (this.uiSettingsConfig?.productConfigurator?.addRetractOption ||
                (this.isSourceAttributeTypeReadOnly(sourceAttribute) && isConflicting)) {
                const attributeType = this.convertAttributeType(sourceAttribute);
                if (attributeType === Configurator.UiType.RADIOBUTTON ||
                    attributeType === Configurator.UiType.DROPDOWN) {
                    const value = {
                        valueCode: OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE,
                        selected: this.isRetractValueSelected(sourceAttribute),
                    };
                    this.setRetractValueDisplay(attributeType, value);
                    values.push(value);
                }
            }
        }
    }
    convertValue(occValue, values) {
        const valueImages = [];
        if (occValue.images) {
            occValue.images.forEach((occImage) => this.convertImage(occImage, valueImages));
        }
        const value = {
            valueCode: occValue.key,
            valueDisplay: occValue.langDepName,
            name: occValue.name,
            selected: occValue.selected,
            images: valueImages,
        };
        values.push(value);
    }
    convertImage(occImage, images) {
        const image = {
            /**
             * Traditionally, in an on-prem world, medias and other backend related calls
             * are hosted at the same platform, but in a cloud setup, applications are
             * typically distributed cross different environments. For media, we use the
             * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
             * if none provided.
             */
            url: (this.config?.backend?.media?.baseUrl ||
                this.config?.backend?.occ?.baseUrl ||
                '') + occImage.url,
            altText: occImage.altText,
            galleryIndex: occImage.galleryIndex,
            type: this.convertImageType(occImage.imageType),
            format: this.convertImageFormatType(occImage.format),
        };
        images.push(image);
    }
    convertAttributeType(sourceAttribute) {
        let uiType;
        switch (sourceAttribute.type) {
            case OccConfigurator.UiType.RADIO_BUTTON: {
                uiType = Configurator.UiType.RADIOBUTTON;
                break;
            }
            case OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT: {
                uiType = Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
                break;
            }
            case OccConfigurator.UiType.DROPDOWN: {
                uiType = Configurator.UiType.DROPDOWN;
                break;
            }
            case OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
                uiType = Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
                break;
            }
            case OccConfigurator.UiType.STRING: {
                uiType = Configurator.UiType.STRING;
                break;
            }
            case OccConfigurator.UiType.NUMERIC: {
                uiType = Configurator.UiType.NUMERIC;
                break;
            }
            case OccConfigurator.UiType.READ_ONLY: {
                uiType =
                    !sourceAttribute.retractBlocked &&
                        this.hasSourceAttributeConflicts(sourceAttribute)
                        ? Configurator.UiType.RADIOBUTTON
                        : Configurator.UiType.READ_ONLY;
                break;
            }
            case OccConfigurator.UiType.CHECK_BOX_LIST: {
                uiType = Configurator.UiType.CHECKBOXLIST;
                break;
            }
            case OccConfigurator.UiType.CHECK_BOX: {
                uiType = Configurator.UiType.CHECKBOX;
                break;
            }
            case OccConfigurator.UiType.MULTI_SELECTION_IMAGE: {
                uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
                break;
            }
            case OccConfigurator.UiType.SINGLE_SELECTION_IMAGE: {
                uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
                break;
            }
            default: {
                uiType = Configurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    convertGroupType(groupType) {
        switch (groupType) {
            case OccConfigurator.GroupType.CSTIC_GROUP:
                return Configurator.GroupType.ATTRIBUTE_GROUP;
            case OccConfigurator.GroupType.INSTANCE:
                return Configurator.GroupType.SUB_ITEM_GROUP;
            case OccConfigurator.GroupType.CONFLICT_HEADER:
                return Configurator.GroupType.CONFLICT_HEADER_GROUP;
            case OccConfigurator.GroupType.CONFLICT:
                return Configurator.GroupType.CONFLICT_GROUP;
        }
    }
    setGroupDescription(group) {
        switch (group.groupType) {
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                this.translation
                    .translate('configurator.group.conflictHeader')
                    .pipe(take(1))
                    .subscribe((conflictHeaderText) => (group.description = conflictHeaderText));
                break;
            case Configurator.GroupType.CONFLICT_GROUP:
                const conflictDescription = group.description;
                this.translation
                    .translate('configurator.group.conflictGroup', {
                    attribute: group.name,
                })
                    .pipe(take(1))
                    .subscribe((conflictGroupText) => (group.description = conflictGroupText));
                group.name = conflictDescription;
                break;
            default:
                if (group.name !== '_GEN') {
                    return;
                }
                this.translation
                    .translate('configurator.group.general')
                    .pipe(take(1))
                    .subscribe((generalText) => (group.description = generalText));
        }
    }
    convertImageType(imageType) {
        switch (imageType) {
            case OccConfigurator.ImageType.GALLERY:
                return Configurator.ImageType.GALLERY;
            case OccConfigurator.ImageType.PRIMARY:
                return Configurator.ImageType.PRIMARY;
        }
    }
    convertImageFormatType(formatType) {
        switch (formatType) {
            case OccConfigurator.ImageFormatType.VALUE_IMAGE:
                return Configurator.ImageFormatType.VALUE_IMAGE;
            case OccConfigurator.ImageFormatType.CSTIC_IMAGE:
                return Configurator.ImageFormatType.ATTRIBUTE_IMAGE;
        }
    }
    compileAttributeIncomplete(attribute) {
        //Default value for incomplete is false
        attribute.incomplete = false;
        switch (attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN: {
                if (!attribute.selectedSingleValue ||
                    attribute.selectedSingleValue ===
                        OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                if (!attribute.selectedSingleValue) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.STRING: {
                if (!attribute.userInput) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                const isOneValueSelected = attribute.values?.find((value) => value.selected) !== undefined;
                attribute.incomplete = !isOneValueSelected;
                break;
            }
        }
    }
}
OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantNormalizer, deps: [{ token: i1$1.OccConfig }, { token: i1$1.TranslationService }, { token: ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.OccConfig }, { type: i1$1.TranslationService }, { type: ConfiguratorUISettingsConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const VARIANT_CONFIGURATOR_NORMALIZER = new InjectionToken('VariantConfiguratorNormalizer');
const VARIANT_CONFIGURATOR_SERIALIZER = new InjectionToken('VariantConfiguratorSerializer');
const VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER = new InjectionToken('VariantConfiguratorPriceSummaryNormalizer');
const VARIANT_CONFIGURATOR_PRICE_NORMALIZER = new InjectionToken('VariantConfiguratorPriceNormalizer');
const VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken('VariantConfiguratorAddToCartSerializer');
const VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken('VariantConfiguratorUpdateCartEntrySerializer');
const VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER = new InjectionToken('VariantConfiguratorOverviewNormalizer');

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantOverviewNormalizer {
    constructor(translation, converterService) {
        this.translation = translation;
        this.converterService = converterService;
    }
    convert(source, target) {
        const prices = {
            priceSummary: source.pricing,
            configId: source.id,
        };
        const resultTarget = {
            ...target,
            configId: source.id,
            groups: source.groups?.flatMap((group) => this.convertGroup(group)),
            priceSummary: this.converterService.convert(prices, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER),
            productCode: source.productCode,
        };
        this.setIssueCounters(resultTarget, source);
        return resultTarget;
    }
    convertGroup(source) {
        const result = [];
        const characteristicValues = source.characteristicValues;
        const subGroups = source.subGroups;
        const group = {
            id: source.id,
            groupDescription: source.groupDescription,
            attributes: characteristicValues
                ? characteristicValues.map((characteristic) => {
                    return {
                        attribute: characteristic.characteristic,
                        attributeId: characteristic.characteristicId,
                        value: characteristic.value,
                        valueId: characteristic.valueId,
                        valuePrice: characteristic.price,
                    };
                })
                : [],
        };
        this.setGeneralDescription(group);
        if (subGroups) {
            const resultSubGroups = [];
            subGroups.forEach((subGroup) => this.convertGroup(subGroup).forEach((groupArray) => resultSubGroups.push(groupArray)));
            group.subGroups = resultSubGroups;
        }
        result.push(group);
        return result;
    }
    setGeneralDescription(group) {
        if (group.id !== '_GEN') {
            return;
        }
        this.translation
            .translate('configurator.group.general')
            .pipe(take(1))
            .subscribe((generalText) => (group.groupDescription = generalText));
    }
    setIssueCounters(target, source) {
        target.totalNumberOfIssues = source.totalNumberOfIssues;
        target.numberOfConflicts = source.numberOfConflicts;
        target.numberOfIncompleteCharacteristics =
            source.numberOfIncompleteCharacteristics;
    }
}
OccConfiguratorVariantOverviewNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, deps: [{ token: i1$1.TranslationService }, { token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantOverviewNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.TranslationService }, { type: i1$1.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantPriceSummaryNormalizer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            ...source.priceSummary,
        };
        return resultTarget;
    }
}
OccConfiguratorVariantPriceSummaryNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantPriceSummaryNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantSerializer {
    convert(source, target) {
        const resultGroups = [];
        source.groups.forEach((group) => this.convertGroup(group, resultGroups));
        const resultTarget = {
            ...target,
            configId: source.configId,
            rootProduct: source.productCode,
            complete: source.complete,
            groups: resultGroups,
        };
        return resultTarget;
    }
    convertGroup(source, occGroups) {
        const resultSubGroups = [];
        const resultAttributes = [];
        if (source.attributes) {
            source.attributes.forEach((attribute) => this.convertAttribute(attribute, resultAttributes));
        }
        if (source.subGroups) {
            source.subGroups.forEach((subGroup) => this.convertGroup(subGroup, resultSubGroups));
        }
        const group = {
            name: source.name,
            id: source.id,
            configurable: source.configurable,
            groupType: this.convertGroupType(source.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP),
            description: source.description,
            attributes: resultAttributes,
            subGroups: resultSubGroups,
        };
        occGroups.push(group);
    }
    isRetractValue(attribute) {
        return (attribute.selectedSingleValue ===
            OccConfiguratorVariantSerializer.RETRACT_VALUE_CODE);
    }
    getRetractedValue(attribute) {
        return attribute.values?.find((value) => value.selected)?.valueCode;
    }
    retractValue(attribute, targetAttribute) {
        if (!this.isRetractValue(attribute)) {
            targetAttribute.value = attribute.selectedSingleValue;
        }
        else {
            targetAttribute.value = this.getRetractedValue(attribute);
            targetAttribute.retractTriggered = true;
        }
    }
    convertAttribute(attribute, occAttributes) {
        const targetAttribute = {
            key: attribute.name,
            name: attribute.name,
            langDepName: attribute.label,
            required: attribute.required,
            retractTriggered: attribute.retractTriggered,
            type: this.convertCharacteristicType(attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED),
        };
        if (attribute.uiType === Configurator.UiType.DROPDOWN ||
            attribute.uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            attribute.uiType === Configurator.UiType.SINGLE_SELECTION_IMAGE) {
            this.retractValue(attribute, targetAttribute);
        }
        else if (attribute.uiType === Configurator.UiType.STRING) {
            targetAttribute.value = attribute.userInput;
        }
        else if (attribute.uiType === Configurator.UiType.NUMERIC) {
            targetAttribute.formattedValue = attribute.userInput;
        }
        else if (attribute.uiType === Configurator.UiType.CHECKBOXLIST ||
            attribute.uiType === Configurator.UiType.CHECKBOX ||
            attribute.uiType === Configurator.UiType.MULTI_SELECTION_IMAGE) {
            const domainValues = [];
            if (attribute.values) {
                attribute.values.forEach((value) => {
                    this.convertValue(value, domainValues);
                });
            }
            targetAttribute.domainValues = domainValues;
        }
        occAttributes.push(targetAttribute);
    }
    convertValue(value, values) {
        values.push({
            key: value.valueCode,
            langDepName: value.valueDisplay,
            name: value.name,
            selected: value.selected,
        });
    }
    convertCharacteristicType(type) {
        let uiType;
        switch (type) {
            case Configurator.UiType.RADIOBUTTON: {
                uiType = OccConfigurator.UiType.RADIO_BUTTON;
                break;
            }
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT: {
                uiType = OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT;
                break;
            }
            case Configurator.UiType.DROPDOWN: {
                uiType = OccConfigurator.UiType.DROPDOWN;
                break;
            }
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
                uiType = OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
                break;
            }
            case Configurator.UiType.STRING: {
                uiType = OccConfigurator.UiType.STRING;
                break;
            }
            case Configurator.UiType.NUMERIC: {
                uiType = OccConfigurator.UiType.NUMERIC;
                break;
            }
            case Configurator.UiType.CHECKBOX: {
                uiType = OccConfigurator.UiType.CHECK_BOX;
                break;
            }
            case Configurator.UiType.CHECKBOXLIST: {
                uiType = OccConfigurator.UiType.CHECK_BOX_LIST;
                break;
            }
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                uiType = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
                break;
            }
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                uiType = OccConfigurator.UiType.SINGLE_SELECTION_IMAGE;
                break;
            }
            default: {
                uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    convertGroupType(groupType) {
        switch (groupType) {
            case Configurator.GroupType.ATTRIBUTE_GROUP:
                return OccConfigurator.GroupType.CSTIC_GROUP;
            case Configurator.GroupType.SUB_ITEM_GROUP:
                return OccConfigurator.GroupType.INSTANCE;
            case Configurator.GroupType.CONFLICT_GROUP:
                return OccConfigurator.GroupType.CONFLICT;
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                return OccConfigurator.GroupType.CONFLICT_HEADER;
        }
    }
}
OccConfiguratorVariantSerializer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantUpdateCartEntrySerializer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.configuration.productCode },
            entryNumber: source.cartEntryNumber,
            configId: source.configuration.configId,
            configurationInfos: [{ configuratorType: "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */ }],
        };
        return resultTarget;
    }
}
OccConfiguratorVariantUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
class VariantConfiguratorOccAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    getConfiguratorType() {
        return "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */;
    }
    createConfiguration(owner) {
        const productCode = owner.id;
        return this.http
            .get(this.occEndpointsService.buildUrl('createVariantConfiguration', {
            urlParams: { productCode },
        }))
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: owner,
            };
        }));
    }
    readConfiguration(configId, groupId, configurationOwner) {
        return this.http
            .get(this.occEndpointsService.buildUrl('readVariantConfiguration', {
            urlParams: { configId },
            queryParams: { groupId },
        }))
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: configurationOwner,
            };
        }));
    }
    updateConfiguration(configuration) {
        const configId = configuration.configId;
        const url = this.occEndpointsService.buildUrl('updateVariantConfiguration', {
            urlParams: { configId },
        });
        const occConfiguration = this.converterService.convert(configuration, VARIANT_CONFIGURATOR_SERIALIZER);
        return this.http
            .patch(url, occConfiguration)
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: configuration.owner,
            };
        }));
    }
    addToCart(parameters) {
        const url = this.occEndpointsService.buildUrl('addVariantConfigurationToCart', { urlParams: { userId: parameters.userId, cartId: parameters.cartId } });
        const occAddToCartParameters = this.converterService.convert(parameters, VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post(url, occAddToCartParameters, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    readConfigurationForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readVariantConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: parameters.owner,
            };
        }));
    }
    updateConfigurationForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('updateVariantConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const occUpdateCartEntryParameters = this.converterService.convert(parameters, VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER);
        return this.http
            .put(url, occUpdateCartEntryParameters, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    readConfigurationForOrderEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readVariantConfigurationOverviewForOrderEntry', {
            urlParams: {
                userId: parameters.userId,
                orderId: parameters.orderId,
                orderEntryNumber: parameters.orderEntryNumber,
            },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER), map((overview) => {
            const configuration = {
                configId: overview.configId,
                productCode: overview.productCode,
                groups: [],
                flatGroups: [],
                interactionState: {},
                overview: overview,
                owner: ConfiguratorModelUtils.createInitialOwner(),
            };
            return configuration;
        }), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: parameters.owner,
            };
        }));
    }
    readPriceSummary(configuration) {
        const url = this.occEndpointsService.buildUrl('readVariantConfigurationPriceSummary', {
            urlParams: {
                configId: configuration.configId,
            },
            queryParams: { groupId: configuration.interactionState.currentGroup },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_PRICE_NORMALIZER), map((configResult) => {
            const result = {
                ...configuration,
                priceSummary: configResult.priceSummary,
                priceSupplements: configResult.priceSupplements,
            };
            return result;
        }));
    }
    getConfigurationOverview(configId) {
        const url = this.occEndpointsService.buildUrl('getVariantConfigurationOverview', { urlParams: { configId } });
        return this.http
            .get(url)
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER));
    }
}
VariantConfiguratorOccAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccAdapter, deps: [{ token: i1$3.HttpClient }, { token: i1$1.OccEndpointsService }, { token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
VariantConfiguratorOccAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$3.HttpClient }, { type: i1$1.OccEndpointsService }, { type: i1$1.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantPriceNormalizer {
    convert(source, target) {
        const priceSupplements = [];
        source.attributes?.forEach((attr) => {
            this.convertAttributeSupplements(attr, priceSupplements);
        });
        //fine to build an incomplete configuratiom here,
        //as we later on only take over the pricing related aspects
        const resultTarget = {
            ...target,
            configId: source.configId,
            productCode: '',
            groups: [],
            flatGroups: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
            interactionState: {},
            priceSummary: source?.priceSummary,
            priceSupplements: priceSupplements,
        };
        return resultTarget;
    }
    convertAttributeSupplements(source, priceSupplements) {
        let attributeSupplement = {
            attributeUiKey: source?.csticUiKey,
            valueSupplements: [],
        };
        source?.priceSupplements?.forEach((value) => {
            this.convertValueSupplement(value, attributeSupplement?.valueSupplements);
        });
        priceSupplements.push(attributeSupplement);
    }
    convertValueSupplement(source, valueSupplements) {
        let valueSupplement = {
            attributeValueKey: source?.attributeValueKey,
            priceValue: source?.priceValue,
            obsoletePriceValue: source?.obsoletePriceValue,
        };
        valueSupplements.push(valueSupplement);
    }
}
OccConfiguratorVariantPriceNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantPriceNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultOccVariantConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    createVariantConfiguration: 'products/${productCode}/configurators/ccpconfigurator',
                    readVariantConfiguration: 'ccpconfigurator/${configId}',
                    updateVariantConfiguration: 'ccpconfigurator/${configId}',
                    addVariantConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/ccpconfigurator',
                    readVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    updateVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    readVariantConfigurationOverviewForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/ccpconfigurator/configurationOverview',
                    readVariantConfigurationPriceSummary: 'ccpconfigurator/${configId}/pricing',
                    getVariantConfigurationOverview: 'ccpconfigurator/${configId}/configurationOverview',
                },
            },
        },
    };
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VariantConfiguratorOccModule {
}
VariantConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: VariantConfiguratorOccModule, imports: [CommonModule, i1$1.ConfigModule] });
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
class RulebasedConfiguratorModule {
}
RulebasedConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorModule, imports: [VariantConfiguratorOccModule,
        RulebasedConfiguratorCoreModule,
        RulebasedConfiguratorComponentsModule] });
RulebasedConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorModule, imports: [VariantConfiguratorOccModule,
        RulebasedConfiguratorCoreModule,
        RulebasedConfiguratorComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RulebasedConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        VariantConfiguratorOccModule,
                        RulebasedConfiguratorCoreModule,
                        RulebasedConfiguratorComponentsModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { CONFIGURATOR_DATA, CONFIGURATOR_FEATURE, ConfigFormUpdateEvent, Configurator, configuratorGroup_actions as ConfiguratorActions, ConfiguratorAddToCartButtonComponent, ConfiguratorAddToCartButtonModule, ConfiguratorAttributeBaseComponent, ConfiguratorAttributeCheckBoxComponent, ConfiguratorAttributeCheckBoxListComponent, ConfiguratorAttributeCheckboxListModule, ConfiguratorAttributeCheckboxModule, ConfiguratorAttributeDropDownComponent, ConfiguratorAttributeDropDownModule, ConfiguratorAttributeFooterComponent, ConfiguratorAttributeFooterModule, ConfiguratorAttributeHeaderComponent, ConfiguratorAttributeHeaderModule, ConfiguratorAttributeInputFieldComponent, ConfiguratorAttributeInputFieldModule, ConfiguratorAttributeMultiSelectionBaseComponent, ConfiguratorAttributeMultiSelectionBundleComponent, ConfiguratorAttributeMultiSelectionBundleModule, ConfiguratorAttributeMultiSelectionImageComponent, ConfiguratorAttributeMultiSelectionImageModule, ConfiguratorAttributeNumericInputFieldComponent, ConfiguratorAttributeNumericInputFieldModule, ConfiguratorAttributeNumericInputFieldService, ConfiguratorAttributeProductCardComponent, ConfiguratorAttributeProductCardModule, ConfiguratorAttributeQuantityComponent, ConfiguratorAttributeQuantityModule, ConfiguratorAttributeQuantityService, ConfiguratorAttributeRadioButtonComponent, ConfiguratorAttributeRadioButtonModule, ConfiguratorAttributeReadOnlyComponent, ConfiguratorAttributeReadOnlyModule, ConfiguratorAttributeSingleSelectionBaseComponent, ConfiguratorAttributeSingleSelectionBundleComponent, ConfiguratorAttributeSingleSelectionBundleDropdownComponent, ConfiguratorAttributeSingleSelectionBundleDropdownModule, ConfiguratorAttributeSingleSelectionBundleModule, ConfiguratorAttributeSingleSelectionImageComponent, ConfiguratorAttributeSingleSelectionImageModule, ConfiguratorBasicEffectService, ConfiguratorCartService, ConfiguratorCommonsService, ConfiguratorConflictAndErrorMessagesComponent, ConfiguratorConflictAndErrorMessagesModule, ConfiguratorConflictDescriptionComponent, ConfiguratorConflictDescriptionModule, ConfiguratorConflictSuggestionComponent, ConfiguratorConflictSuggestionModule, ConfiguratorExitButtonComponent, ConfiguratorExitButtonModule, ConfiguratorFormComponent, ConfiguratorFormModule, ConfiguratorGroupMenuComponent, ConfiguratorGroupMenuModule, ConfiguratorGroupStatusService, ConfiguratorGroupTitleComponent, ConfiguratorGroupTitleModule, ConfiguratorGroupsService, ConfiguratorMessageConfig, ConfiguratorOverviewAttributeComponent, ConfiguratorOverviewAttributeModule, ConfiguratorOverviewBundleAttributeComponent, ConfiguratorOverviewBundleAttributeModule, ConfiguratorOverviewFormComponent, ConfiguratorOverviewFormModule, ConfiguratorOverviewNotificationBannerComponent, ConfiguratorOverviewNotificationBannerModule, ConfiguratorPreviousNextButtonsComponent, ConfiguratorPreviousNextButtonsModule, ConfiguratorPriceComponent, ConfiguratorPriceModule, ConfiguratorPriceSummaryComponent, ConfiguratorPriceSummaryModule, ConfiguratorProductTitleComponent, ConfiguratorProductTitleModule, ConfiguratorRouterListener, ConfiguratorRouterModule, configuratorGroup_selectors as ConfiguratorSelectors, ConfiguratorShowMoreComponent, ConfiguratorShowMoreModule, ConfiguratorStorefrontUtilsService, ConfiguratorTabBarComponent, ConfiguratorTabBarModule, ConfiguratorUISettingsConfig, ConfiguratorUpdateMessageComponent, ConfiguratorUpdateMessageModule, ConfiguratorUtilsService, OccConfigurator, OccConfiguratorVariantAddToCartSerializer, OccConfiguratorVariantNormalizer, OccConfiguratorVariantOverviewNormalizer, OccConfiguratorVariantPriceSummaryNormalizer, OccConfiguratorVariantSerializer, OccConfiguratorVariantUpdateCartEntrySerializer, RulebasedConfiguratorAdapter, RulebasedConfiguratorComponentsModule, RulebasedConfiguratorConnector, RulebasedConfiguratorCoreModule, RulebasedConfiguratorModule, VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER, VARIANT_CONFIGURATOR_NORMALIZER, VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER, VARIANT_CONFIGURATOR_PRICE_NORMALIZER, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER, VARIANT_CONFIGURATOR_SERIALIZER, VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, VariantConfiguratorOccAdapter, VariantConfiguratorOccModule };
//# sourceMappingURL=spartacus-product-configurator-rulebased.mjs.map
