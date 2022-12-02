import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from '../../../services/current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitUserListComponent {
    protected currentUnitService: CurrentUnitService;
    routerKey: string;
    unit$: Observable<B2BUnit | undefined>;
    constructor(currentUnitService: CurrentUnitService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitUserListComponent, "cx-org-unit-user-list", never, {}, {}, never, never, false>;
}
