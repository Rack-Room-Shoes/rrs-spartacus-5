import { OnInit } from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import { CsAgentAuthService } from '@spartacus/asm/root';
import { AuthService, GlobalMessageService, RoutingService, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
export declare class AsmMainUiComponent implements OnInit {
    protected authService: AuthService;
    protected csAgentAuthService: CsAgentAuthService;
    protected asmComponentService: AsmComponentService;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected asmService: AsmService;
    protected userAccountFacade: UserAccountFacade;
    customerSupportAgentLoggedIn$: Observable<boolean>;
    csAgentTokenLoading$: Observable<boolean>;
    customer$: Observable<User | undefined>;
    isCollapsed$: Observable<boolean>;
    disabled: boolean;
    protected startingCustomerSession: boolean;
    constructor(authService: AuthService, csAgentAuthService: CsAgentAuthService, asmComponentService: AsmComponentService, globalMessageService: GlobalMessageService, routingService: RoutingService, asmService: AsmService, userAccountFacade: UserAccountFacade);
    ngOnInit(): void;
    protected handleCustomerSessionStartRedirection(): void;
    loginCustomerSupportAgent({ userId, password, }: {
        userId: string;
        password: string;
    }): void;
    logout(): void;
    startCustomerEmulationSession({ customerId }: {
        customerId?: string;
    }): void;
    hideUi(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmMainUiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmMainUiComponent, "cx-asm-main-ui", never, {}, {}, never, never, false>;
}
