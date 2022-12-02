import { UnitTreeService } from '../services/unit-tree.service';
import * as i0 from "@angular/core";
export declare class UnitListComponent {
    protected unitTreeService: UnitTreeService;
    constructor(unitTreeService: UnitTreeService);
    expandAll(): void;
    collapseAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitListComponent, "cx-org-unit-list", never, {}, {}, never, never, false>;
}
