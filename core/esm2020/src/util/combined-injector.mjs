/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectFlags, } from '@angular/core';
const NOT_FOUND_SYMBOL = {};
/**
 * CombinedInjector is able to combine more than one injector together.
 *
 * Can be used to instantiate lazy loaded modules with dependency modules,
 * so lazy loaded module can use instances provided in all dependency modules.
 *
 * Injector tries to resolve token in all Injector, taking into account the order
 * in which they were provided in complementaryInjectors and fallbacks to the
 * mainInjector.
 */
export class CombinedInjector {
    /**
     * @param mainInjector Component hierarchical injector
     * @param complementaryInjectors Additional injector that will be taken into an account when resolving dependencies
     */
    constructor(mainInjector, complementaryInjectors) {
        this.mainInjector = mainInjector;
        this.complementaryInjectors = complementaryInjectors;
    }
    get(token, notFoundValue, flags) {
        // eslint-disable-next-line no-bitwise
        if (flags && flags & InjectFlags.Self) {
            if (notFoundValue !== undefined) {
                return notFoundValue;
            }
            throw new Error("CombinedInjector should be used as a parent injector / doesn't support self dependencies");
        }
        for (const injector of this.complementaryInjectors) {
            // First we are resolving providers provided at Self level
            // in all complementary injectors...
            const service = injector.get(token, NOT_FOUND_SYMBOL, InjectFlags.Self);
            if (service !== NOT_FOUND_SYMBOL) {
                return service;
            }
        }
        for (const injector of this.complementaryInjectors) {
            // next we try to resolve tokens from all levels
            const service = injector.get(token, NOT_FOUND_SYMBOL);
            if (service !== NOT_FOUND_SYMBOL) {
                return service;
            }
        }
        // ...and then fallback to main injector
        return this.mainInjector.get(token, notFoundValue);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZWQtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91dGlsL2NvbWJpbmVkLWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsV0FBVyxHQUlaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBRTVCOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7OztPQUdHO0lBQ0gsWUFDVSxZQUFzQixFQUN0QixzQkFBa0M7UUFEbEMsaUJBQVksR0FBWixZQUFZLENBQVU7UUFDdEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFZO0lBQ3pDLENBQUM7SUFRSixHQUFHLENBQUMsS0FBVSxFQUFFLGFBQW1CLEVBQUUsS0FBbUI7UUFDdEQsc0NBQXNDO1FBQ3RDLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3JDLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsT0FBTyxhQUFhLENBQUM7YUFDdEI7WUFDRCxNQUFNLElBQUksS0FBSyxDQUNiLDBGQUEwRixDQUMzRixDQUFDO1NBQ0g7UUFFRCxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNsRCwwREFBMEQ7WUFDMUQsb0NBQW9DO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RSxJQUFJLE9BQU8sS0FBSyxnQkFBZ0IsRUFBRTtnQkFDaEMsT0FBTyxPQUFPLENBQUM7YUFDaEI7U0FDRjtRQUVELEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2xELGdEQUFnRDtZQUNoRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RELElBQUksT0FBTyxLQUFLLGdCQUFnQixFQUFFO2dCQUNoQyxPQUFPLE9BQU8sQ0FBQzthQUNoQjtTQUNGO1FBQ0Qsd0NBQXdDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFic3RyYWN0VHlwZSxcbiAgSW5qZWN0RmxhZ3MsXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RvcixcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IE5PVF9GT1VORF9TWU1CT0wgPSB7fTtcblxuLyoqXG4gKiBDb21iaW5lZEluamVjdG9yIGlzIGFibGUgdG8gY29tYmluZSBtb3JlIHRoYW4gb25lIGluamVjdG9yIHRvZ2V0aGVyLlxuICpcbiAqIENhbiBiZSB1c2VkIHRvIGluc3RhbnRpYXRlIGxhenkgbG9hZGVkIG1vZHVsZXMgd2l0aCBkZXBlbmRlbmN5IG1vZHVsZXMsXG4gKiBzbyBsYXp5IGxvYWRlZCBtb2R1bGUgY2FuIHVzZSBpbnN0YW5jZXMgcHJvdmlkZWQgaW4gYWxsIGRlcGVuZGVuY3kgbW9kdWxlcy5cbiAqXG4gKiBJbmplY3RvciB0cmllcyB0byByZXNvbHZlIHRva2VuIGluIGFsbCBJbmplY3RvciwgdGFraW5nIGludG8gYWNjb3VudCB0aGUgb3JkZXJcbiAqIGluIHdoaWNoIHRoZXkgd2VyZSBwcm92aWRlZCBpbiBjb21wbGVtZW50YXJ5SW5qZWN0b3JzIGFuZCBmYWxsYmFja3MgdG8gdGhlXG4gKiBtYWluSW5qZWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21iaW5lZEluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICAvKipcbiAgICogQHBhcmFtIG1haW5JbmplY3RvciBDb21wb25lbnQgaGllcmFyY2hpY2FsIGluamVjdG9yXG4gICAqIEBwYXJhbSBjb21wbGVtZW50YXJ5SW5qZWN0b3JzIEFkZGl0aW9uYWwgaW5qZWN0b3IgdGhhdCB3aWxsIGJlIHRha2VuIGludG8gYW4gYWNjb3VudCB3aGVuIHJlc29sdmluZyBkZXBlbmRlbmNpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWFpbkluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGNvbXBsZW1lbnRhcnlJbmplY3RvcnM6IEluamVjdG9yW11cbiAgKSB7fVxuXG4gIGdldDxUPihcbiAgICB0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+LFxuICAgIG5vdEZvdW5kVmFsdWU/OiBULFxuICAgIGZsYWdzPzogSW5qZWN0RmxhZ3NcbiAgKTogVDtcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnk7XG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55LCBmbGFncz86IEluamVjdEZsYWdzKTogYW55IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgIGlmIChmbGFncyAmJiBmbGFncyAmIEluamVjdEZsYWdzLlNlbGYpIHtcbiAgICAgIGlmIChub3RGb3VuZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZvdW5kVmFsdWU7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ29tYmluZWRJbmplY3RvciBzaG91bGQgYmUgdXNlZCBhcyBhIHBhcmVudCBpbmplY3RvciAvIGRvZXNuJ3Qgc3VwcG9ydCBzZWxmIGRlcGVuZGVuY2llc1wiXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaW5qZWN0b3Igb2YgdGhpcy5jb21wbGVtZW50YXJ5SW5qZWN0b3JzKSB7XG4gICAgICAvLyBGaXJzdCB3ZSBhcmUgcmVzb2x2aW5nIHByb3ZpZGVycyBwcm92aWRlZCBhdCBTZWxmIGxldmVsXG4gICAgICAvLyBpbiBhbGwgY29tcGxlbWVudGFyeSBpbmplY3RvcnMuLi5cbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBpbmplY3Rvci5nZXQodG9rZW4sIE5PVF9GT1VORF9TWU1CT0wsIEluamVjdEZsYWdzLlNlbGYpO1xuICAgICAgaWYgKHNlcnZpY2UgIT09IE5PVF9GT1VORF9TWU1CT0wpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpbmplY3RvciBvZiB0aGlzLmNvbXBsZW1lbnRhcnlJbmplY3RvcnMpIHtcbiAgICAgIC8vIG5leHQgd2UgdHJ5IHRvIHJlc29sdmUgdG9rZW5zIGZyb20gYWxsIGxldmVsc1xuICAgICAgY29uc3Qgc2VydmljZSA9IGluamVjdG9yLmdldCh0b2tlbiwgTk9UX0ZPVU5EX1NZTUJPTCk7XG4gICAgICBpZiAoc2VydmljZSAhPT0gTk9UX0ZPVU5EX1NZTUJPTCkge1xuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gLi4uYW5kIHRoZW4gZmFsbGJhY2sgdG8gbWFpbiBpbmplY3RvclxuICAgIHJldHVybiB0aGlzLm1haW5JbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICB9XG59XG4iXX0=