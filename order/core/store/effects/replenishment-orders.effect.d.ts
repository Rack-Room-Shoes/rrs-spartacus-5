import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ReplenishmentOrderHistoryConnector } from '../../connectors/replenishment-order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrdersEffect {
    private actions$;
    private replenishmentOrderConnector;
    loadUserReplenishmentOrders$: Observable<OrderActions.UserReplenishmentOrdersAction>;
    constructor(actions$: Actions, replenishmentOrderConnector: ReplenishmentOrderHistoryConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrdersEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReplenishmentOrdersEffect>;
}
