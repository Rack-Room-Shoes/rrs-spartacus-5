import { InjectionToken } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { CommonConfigurator, CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';
import * as i0 from "@angular/core";
export declare class RulebasedConfiguratorConnector {
    protected adapters: RulebasedConfiguratorAdapter[];
    protected configUtilsService: CommonConfiguratorUtilsService;
    static CONFIGURATOR_ADAPTER_LIST: InjectionToken<RulebasedConfiguratorAdapter[]>;
    constructor(adapters: RulebasedConfiguratorAdapter[], configUtilsService: CommonConfiguratorUtilsService);
    createConfiguration(owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    readConfiguration(configId: string, groupId: string, configurationOwner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    updateConfiguration(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Configurator.Configuration>;
    updateConfigurationForCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Configurator.Configuration>;
    readPriceSummary(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    getConfigurationOverview(configuration: Configurator.Configuration): Observable<Configurator.Overview>;
    protected getAdapter(configuratorType: string): RulebasedConfiguratorAdapter;
    static ɵfac: i0.ɵɵFactoryDeclaration<RulebasedConfiguratorConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RulebasedConfiguratorConnector>;
}
