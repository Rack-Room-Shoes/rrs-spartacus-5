import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailShippingComponent implements OnInit {
    protected orderDetailsService: OrderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    order$: Observable<any>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailShippingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailShippingComponent, "cx-order-details-shipping", never, {}, {}, never, never, false>;
}
