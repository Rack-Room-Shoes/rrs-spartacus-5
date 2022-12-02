import { B2BUser } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UserDetailsComponent {
    protected itemService: ItemService<B2BUser>;
    userGuardSubscription: Subscription;
    model$: Observable<B2BUser>;
    isInEditMode$: Observable<boolean>;
    constructor(itemService: ItemService<B2BUser>);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserDetailsComponent, "cx-org-user-details", never, {}, {}, never, never, false>;
}
