import { Store } from '@ngrx/store';
import { AuthService, OAuthLibWrapperService, UserIdService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { AsmAuthStorageService } from './asm-auth-storage.service';
import * as i0 from "@angular/core";
/**
 * Auth service for CS agent. Useful to login/logout agent, start emulation
 * or get information about the status of emulation.
 */
export declare class CsAgentAuthService {
    protected authService: AuthService;
    protected authStorageService: AsmAuthStorageService;
    protected userIdService: UserIdService;
    protected oAuthLibWrapperService: OAuthLibWrapperService;
    protected store: Store;
    protected userProfileFacade: UserProfileFacade;
    constructor(authService: AuthService, authStorageService: AsmAuthStorageService, userIdService: UserIdService, oAuthLibWrapperService: OAuthLibWrapperService, store: Store, userProfileFacade: UserProfileFacade);
    /**
     * Loads access token for a customer support agent.
     * @param userId
     * @param password
     */
    authorizeCustomerSupportAgent(userId: string, password: string): Promise<void>;
    /**
     * Starts an ASM customer emulation session.
     * A customer emulation session is stopped by calling logout().
     * @param customerId
     */
    startCustomerEmulationSession(customerId: string): void;
    /**
     * Check if CS agent is currently logged in.
     *
     * @returns observable emitting true when CS agent is logged in or false when not.
     */
    isCustomerSupportAgentLoggedIn(): Observable<boolean>;
    /**
     * Utility function to determine if customer is emulated.
     *
     * @returns observable emitting true when there is active emulation session or false when not.
     */
    isCustomerEmulated(): Observable<boolean>;
    /**
     * Returns the customer support agent's token loading status
     */
    getCustomerSupportAgentTokenLoading(): Observable<boolean>;
    /**
     * Logout a customer support agent.
     */
    logoutCustomerSupportAgent(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CsAgentAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CsAgentAuthService>;
}
