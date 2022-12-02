import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentTypeComponent {
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
    protected checkoutStepService: CheckoutStepService;
    protected activatedRoute: ActivatedRoute;
    private poNumberInputElement;
    protected busy$: BehaviorSubject<boolean>;
    typeSelected?: string;
    isUpdating$: Observable<boolean>;
    paymentTypes$: Observable<PaymentType[]>;
    typeSelected$: Observable<PaymentType>;
    cartPoNumber$: Observable<string>;
    constructor(checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade, checkoutStepService: CheckoutStepService, activatedRoute: ActivatedRoute);
    changeType(code: string): void;
    next(): void;
    back(): void;
    protected onSuccess(): void;
    protected onError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentTypeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutPaymentTypeComponent, "cx-payment-type", never, {}, {}, never, never, false>;
}
