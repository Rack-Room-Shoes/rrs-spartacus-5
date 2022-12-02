import { HttpClient } from '@angular/common/http';
import { CartModification } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorOccService {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    updateCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    getConfigIdForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<string>;
    getConfigIdForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorOccService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorOccService>;
}
