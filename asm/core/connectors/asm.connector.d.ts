import { Observable } from 'rxjs';
import { CustomerSearchOptions, CustomerSearchPage } from '../models/asm.models';
import { AsmAdapter } from './asm.adapter';
import * as i0 from "@angular/core";
export declare class AsmConnector {
    protected asmAdapter: AsmAdapter;
    constructor(asmAdapter: AsmAdapter);
    customerSearch(options: CustomerSearchOptions): Observable<CustomerSearchPage>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmConnector>;
}
