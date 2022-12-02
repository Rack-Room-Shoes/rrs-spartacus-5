import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
    protected router: Router;
    cartValidationInProgress: boolean;
    protected subscription: Subscription;
    constructor(router: Router);
    ngOnInit(): void;
    disableButtonWhileNavigation(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartProceedToCheckoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartProceedToCheckoutComponent, "cx-cart-proceed-to-checkout", never, {}, {}, never, never, false>;
}
