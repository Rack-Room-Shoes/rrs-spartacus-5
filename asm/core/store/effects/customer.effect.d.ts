import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AsmConnector } from '../../connectors/asm.connector';
import { AsmActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class CustomerEffects {
    private actions$;
    private asmConnector;
    customerSearch$: Observable<AsmActions.CustomerAction>;
    constructor(actions$: Actions, asmConnector: AsmConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerEffects>;
}
