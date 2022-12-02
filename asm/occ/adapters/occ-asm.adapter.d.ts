import { HttpClient } from '@angular/common/http';
import { AsmAdapter, AsmConfig, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/core';
import { BaseSiteService, ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccAsmAdapter implements AsmAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    protected config: AsmConfig;
    protected baseSiteService: BaseSiteService;
    private activeBaseSite;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService, config: AsmConfig, baseSiteService: BaseSiteService);
    customerSearch(options: CustomerSearchOptions): Observable<CustomerSearchPage>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccAsmAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccAsmAdapter>;
}
