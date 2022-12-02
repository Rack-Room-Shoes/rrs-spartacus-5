import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserInterestsConnector } from '../../connectors/interests/user-interests.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ProductInterestsEffect {
    private actions$;
    private userInterestsConnector;
    constructor(actions$: Actions, userInterestsConnector: UserInterestsConnector);
    loadProductInteres$: Observable<UserActions.ProductInterestsAction>;
    removeProductInterest$: Observable<Action>;
    addProductInterest$: Observable<Action>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductInterestsEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductInterestsEffect>;
}
