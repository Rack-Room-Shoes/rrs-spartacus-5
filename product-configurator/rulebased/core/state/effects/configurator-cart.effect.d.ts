import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import { CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { ConfiguratorActions } from '../actions/index';
import { StateWithConfigurator } from '../configurator-state';
import * as i0 from "@angular/core";
export declare const ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND = "Entry number is required in addToCart response";
export declare class ConfiguratorCartEffects {
    protected actions$: Actions;
    protected configuratorCommonsConnector: RulebasedConfiguratorConnector;
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    protected configuratorGroupUtilsService: ConfiguratorUtilsService;
    protected store: Store<StateWithConfigurator>;
    addToCart$: Observable<ConfiguratorActions.AddNextOwner | CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail>;
    updateCartEntry$: Observable<CartActions.CartUpdateEntrySuccess | CartActions.CartUpdateEntryFail>;
    readConfigurationForCartEntry$: Observable<ConfiguratorActions.ReadCartEntryConfigurationSuccess | ConfiguratorActions.UpdatePriceSummary | ConfiguratorActions.ReadCartEntryConfigurationFail>;
    readConfigurationForOrderEntry$: Observable<ConfiguratorActions.ReadOrderEntryConfigurationSuccess | ConfiguratorActions.ReadOrderEntryConfigurationFail>;
    removeCartBoundConfigurations$: Observable<ConfiguratorActions.RemoveConfiguration>;
    addOwner$: Observable<ConfiguratorActions.SetNextOwnerCartEntry | ConfiguratorActions.SetInteractionState>;
    constructor(actions$: Actions, configuratorCommonsConnector: RulebasedConfiguratorConnector, commonConfigUtilsService: CommonConfiguratorUtilsService, configuratorGroupUtilsService: ConfiguratorUtilsService, store: Store<StateWithConfigurator>);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorCartEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorCartEffects>;
}
