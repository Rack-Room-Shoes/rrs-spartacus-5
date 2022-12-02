import { StateUtils } from '@spartacus/core';
import { AsmUi, CustomerSearchPage } from '../models/asm.models';
export declare const ASM_FEATURE = "asm";
export declare const CUSTOMER_SEARCH_DATA = "[asm] Customer search data";
export interface StateWithAsm {
    [ASM_FEATURE]: AsmState;
}
export interface AsmState {
    customerSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
    asmUi: AsmUi;
}
