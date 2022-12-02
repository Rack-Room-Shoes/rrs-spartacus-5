import { B2BUnit } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UnitDetailsComponent {
    protected itemService: ItemService<B2BUnit>;
    model$: Observable<B2BUnit>;
    isInEditMode$: Observable<boolean>;
    constructor(itemService: ItemService<B2BUnit>);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitDetailsComponent, "cx-org-unit-details", never, {}, {}, never, never, false>;
}
