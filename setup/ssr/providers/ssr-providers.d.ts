import { StaticProvider } from '@angular/core';
/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
export declare function getServerRequestProviders(): StaticProvider[];
