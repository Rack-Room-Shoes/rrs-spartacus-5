import { DeliveryMode, PaymentDetails } from '@spartacus/cart/base/root';
import { Address, CostCenter, TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderOverviewComponent {
    protected translation: TranslationService;
    order: any;
    set setOrder(order: any);
    constructor(translation: TranslationService);
    getReplenishmentCodeCardContent(orderCode: string): Observable<Card>;
    getReplenishmentActiveCardContent(active: boolean): Observable<Card>;
    getReplenishmentStartOnCardContent(isoDate: string | null): Observable<Card>;
    getReplenishmentFrequencyCardContent(frequency: string): Observable<Card>;
    getReplenishmentNextDateCardContent(isoDate: string | null): Observable<Card>;
    getOrderCodeCardContent(orderCode: string): Observable<Card>;
    getOrderCurrentDateCardContent(isoDate: string | null): Observable<Card>;
    getOrderStatusCardContent(status: string): Observable<Card>;
    getPurchaseOrderNumber(poNumber: string): Observable<Card>;
    getMethodOfPaymentCardContent(hasPaymentInfo: PaymentDetails): Observable<Card>;
    getCostCenterCardContent(costCenter: CostCenter): Observable<Card>;
    getAddressCardContent(deliveryAddress: Address): Observable<Card>;
    getDeliveryModeCardContent(deliveryMode: DeliveryMode): Observable<Card>;
    getPaymentInfoCardContent(payment: PaymentDetails): Observable<Card>;
    getBillingAddressCardContent(billingAddress: Address): Observable<Card>;
    private normalizeFormattedAddress;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderOverviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderOverviewComponent, "cx-order-overview", never, { "setOrder": "order"; }, {}, never, never, false>;
}
