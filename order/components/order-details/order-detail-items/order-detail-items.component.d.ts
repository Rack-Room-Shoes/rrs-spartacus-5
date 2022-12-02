import { OnInit } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { Consignment, Order } from '@spartacus/order/root';
import { CmsOrderDetailItemsComponent, TranslationService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailItemsComponent implements OnInit {
    protected orderDetailsService: OrderDetailsService;
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>;
    protected translation: TranslationService;
    constructor(orderDetailsService: OrderDetailsService, component: CmsComponentData<CmsOrderDetailItemsComponent>, translation: TranslationService);
    readonly CartOutlets: typeof CartOutlets;
    promotionLocation: PromotionLocation;
    order$: Observable<Order>;
    others$: Observable<Consignment[] | undefined>;
    completed$: Observable<Consignment[] | undefined>;
    cancel$: Observable<Consignment[] | undefined>;
    buyItAgainTranslation$: Observable<string>;
    enableAddToCart$: Observable<boolean | undefined>;
    ngOnInit(): void;
    private getExactStatus;
    private getOtherStatus;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailItemsComponent, "cx-order-details-items", never, {}, {}, never, never, false>;
}
