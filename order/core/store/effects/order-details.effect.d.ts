import { Actions } from '@ngrx/effects';
import { GlobalMessageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderHistoryConnector } from '../../connectors/order-history.connector';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class OrderDetailsEffect {
    private actions$;
    private orderConnector;
    private globalMessageService;
    loadOrderDetails$: Observable<OrderActions.OrderDetailsAction>;
    cancelOrder$: Observable<OrderActions.OrderDetailsAction>;
    constructor(actions$: Actions, orderConnector: OrderHistoryConnector, globalMessageService: GlobalMessageService);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailsEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderDetailsEffect>;
}
