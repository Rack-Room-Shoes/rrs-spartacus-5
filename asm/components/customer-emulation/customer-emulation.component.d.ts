import { OnDestroy, OnInit } from '@angular/core';
import { User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
export declare class CustomerEmulationComponent implements OnInit, OnDestroy {
    protected asmComponentService: AsmComponentService;
    protected userAccountFacade: UserAccountFacade;
    customer: User;
    isCustomerEmulationSessionInProgress$: Observable<boolean>;
    protected subscription: Subscription;
    constructor(asmComponentService: AsmComponentService, userAccountFacade: UserAccountFacade);
    ngOnInit(): void;
    logoutCustomer(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerEmulationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerEmulationComponent, "cx-customer-emulation", never, {}, {}, never, never, false>;
}
