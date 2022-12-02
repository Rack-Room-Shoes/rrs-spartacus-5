import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { UserCostCenterConnector } from '../../connectors/cost-center/user-cost-center.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class UserCostCenterEffects {
    private actions$;
    private userCostCenterConnector;
    loadActiveCostCenters$: Observable<UserActions.UserCostCenterAction>;
    constructor(actions$: Actions, userCostCenterConnector: UserCostCenterConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserCostCenterEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserCostCenterEffects>;
}
