import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class MultiCartEffects {
    private actions$;
    processesIncrement$: Observable<CartActions.CartProcessesIncrement>;
    setSelectiveId$: Observable<CartActions.SetCartTypeIndex>;
    setActiveCartId$: Observable<CartActions.SetCartTypeIndex>;
    constructor(actions$: Actions);
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiCartEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiCartEffects>;
}
