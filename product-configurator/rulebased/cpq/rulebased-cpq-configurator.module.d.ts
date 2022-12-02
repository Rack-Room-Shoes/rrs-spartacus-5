import * as i0 from "@angular/core";
import * as i1 from "./occ/cpq-configurator-occ.module";
import * as i2 from "./rest/cpq-configurator-rest.module";
/**
 * Exposes the CPQ flavor of rulebase configurator, which connects to CPQ directly via
 * REST APIs and to commerce via OCC
 */
export declare class RulebasedCpqConfiguratorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<RulebasedCpqConfiguratorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RulebasedCpqConfiguratorModule, never, [typeof i1.CpqConfiguratorOccModule, typeof i2.CpqConfiguratorRestModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RulebasedCpqConfiguratorModule>;
}
