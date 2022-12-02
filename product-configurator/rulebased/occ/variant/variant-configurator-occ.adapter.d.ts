import { HttpClient } from '@angular/common/http';
import { CartModification } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { RulebasedConfiguratorAdapter } from '../../core/connectors/rulebased-configurator.adapter';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class VariantConfiguratorOccAdapter implements RulebasedConfiguratorAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    getConfiguratorType(): string;
    createConfiguration(owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    readConfiguration(configId: string, groupId: string, configurationOwner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    updateConfiguration(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Configurator.Configuration>;
    updateConfigurationForCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Configurator.Configuration>;
    readPriceSummary(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    getConfigurationOverview(configId: string): Observable<Configurator.Overview>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VariantConfiguratorOccAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VariantConfiguratorOccAdapter>;
}
