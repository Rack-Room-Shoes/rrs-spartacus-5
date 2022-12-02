import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthService, Command, CommandService, EventService, GlobalMessageService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CDCRegisterComponentService extends RegisterComponentService {
    protected userRegisterFacade: UserRegisterFacade;
    protected command: CommandService;
    protected store: Store;
    protected cdcJSService: CdcJsService;
    protected globalMessageService: GlobalMessageService;
    protected authService: AuthService;
    protected eventService: EventService;
    protected registerCommand: Command<{
        user: UserSignUp;
    }, User>;
    protected loadUserTokenFailed$: Observable<boolean>;
    protected isLoggedIn$: Observable<boolean>;
    constructor(userRegisterFacade: UserRegisterFacade, command: CommandService, store: Store, cdcJSService: CdcJsService, globalMessageService: GlobalMessageService, authService: AuthService, eventService: EventService);
    /**
     * Register a new user using CDC SDK.
     *
     * @param user as UserSignUp
     */
    register(user: UserSignUp): Observable<User>;
    postRegisterMessage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CDCRegisterComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CDCRegisterComponentService>;
}
