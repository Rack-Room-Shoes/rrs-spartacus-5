import { OccConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare abstract class AsmConfig extends OccConfig {
    asm?: {
        agentSessionTimer?: {
            startingDelayInSeconds?: number;
        };
        customerSearch?: {
            maxResults?: number;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmConfig>;
}
declare module '@spartacus/core' {
    interface Config extends AsmConfig {
    }
}
