import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import * as i0 from "@angular/core";
export declare class CpqAccessLoaderService {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService);
    getCpqAccessData(): Observable<CpqAccessData>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqAccessLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqAccessLoaderService>;
}
