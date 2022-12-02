import { GlobalMessageService, Title, User } from '@spartacus/core';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class RegisterComponentService {
    protected userRegisterFacade: UserRegisterFacade;
    protected globalMessageService: GlobalMessageService;
    constructor(userRegisterFacade: UserRegisterFacade, globalMessageService: GlobalMessageService);
    /**
     * Register a new user.
     *
     * @param user as UserSignUp
     */
    register(user: UserSignUp): Observable<User>;
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles(): Observable<Title[]>;
    /**
     * Show the message after successful registration.
     */
    postRegisterMessage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RegisterComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RegisterComponentService>;
}
