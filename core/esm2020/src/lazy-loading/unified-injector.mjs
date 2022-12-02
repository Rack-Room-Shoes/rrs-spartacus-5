/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, InjectFlags, } from '@angular/core';
import { filter, map, scan, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./lazy-modules.service";
const NOT_FOUND_SYMBOL = {};
/**
 * UnifiedInjector provides a way to get instances of tokens not only once, from the root injector,
 * but also from lazy loaded module injectors that can be initialized over time.
 */
export class UnifiedInjector {
    constructor(rootInjector, lazyModules) {
        this.rootInjector = rootInjector;
        this.lazyModules = lazyModules;
        /**
         * Gather all the injectors, with the root injector as a first one
         *
         */
        this.injectors$ = this.lazyModules.modules$.pipe(map((moduleRef) => moduleRef.injector), startWith(this.rootInjector));
    }
    /**
     * Gen instances for specified tokens.
     *
     * When notFoundValue is provided, it will consistently emit once per injector,
     * even if injector doesn't contain instances for specified token.
     * Otherwise, emissions will only involve cases, where new instances will be found.
     *
     * @param token
     * @param notFoundValue
     */
    get(token, notFoundValue) {
        return this.injectors$.pipe(map((injector, index) => injector.get(token, notFoundValue ?? NOT_FOUND_SYMBOL, 
        // we want to get only Self instances from all injectors except the
        // first one, which is a root injector
        index ? InjectFlags.Self : undefined)), filter((instance) => instance !== NOT_FOUND_SYMBOL));
    }
    getMulti(token) {
        return this.get(token, []).pipe(filter((instances) => {
            if (!Array.isArray(instances)) {
                throw new Error(`Multi-providers mixed with single providers for ${token.toString()}!`);
            }
            return instances.length > 0;
        }), scan((acc, services) => [...acc, ...services], []));
    }
}
UnifiedInjector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnifiedInjector, deps: [{ token: i0.Injector }, { token: i1.LazyModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
UnifiedInjector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnifiedInjector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnifiedInjector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }, { type: i1.LazyModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pZmllZC1pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xhenktbG9hZGluZy91bmlmaWVkLWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsVUFBVSxFQUNWLFdBQVcsR0FJWixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUU5RCxNQUFNLGdCQUFnQixHQUFRLEVBQUUsQ0FBQztBQUVqQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sZUFBZTtJQVUxQixZQUNZLFlBQXNCLEVBQ3RCLFdBQStCO1FBRC9CLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQVgzQzs7O1dBR0c7UUFDTSxlQUFVLEdBQXlCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDeEUsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQ3RDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQzdCLENBQUM7SUFLQyxDQUFDO0lBRUo7Ozs7Ozs7OztPQVNHO0lBQ0gsR0FBRyxDQUNELEtBQW9ELEVBQ3BELGFBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3pCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUN0QixRQUFRLENBQUMsR0FBRyxDQUNWLEtBQUssRUFDTCxhQUFhLElBQUksZ0JBQWdCO1FBQ2pDLG1FQUFtRTtRQUNuRSxzQ0FBc0M7UUFDdEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3JDLENBQ0YsRUFDRCxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsS0FBSyxnQkFBZ0IsQ0FBQyxDQUNwRCxDQUFDO0lBQ0osQ0FBQztJQVdELFFBQVEsQ0FDTixLQUEwRDtRQUUxRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQ2IsbURBQW1ELEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUN2RSxDQUFDO2FBQ0g7WUFDRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDbkQsQ0FBQztJQUNKLENBQUM7OzRHQWxFVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWJzdHJhY3RUeXBlLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RGbGFncyxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhenlNb2R1bGVzU2VydmljZSB9IGZyb20gJy4vbGF6eS1tb2R1bGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNjYW4sIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgTk9UX0ZPVU5EX1NZTUJPTDogYW55ID0ge307XG5cbi8qKlxuICogVW5pZmllZEluamVjdG9yIHByb3ZpZGVzIGEgd2F5IHRvIGdldCBpbnN0YW5jZXMgb2YgdG9rZW5zIG5vdCBvbmx5IG9uY2UsIGZyb20gdGhlIHJvb3QgaW5qZWN0b3IsXG4gKiBidXQgYWxzbyBmcm9tIGxhenkgbG9hZGVkIG1vZHVsZSBpbmplY3RvcnMgdGhhdCBjYW4gYmUgaW5pdGlhbGl6ZWQgb3ZlciB0aW1lLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pZmllZEluamVjdG9yIHtcbiAgLyoqXG4gICAqIEdhdGhlciBhbGwgdGhlIGluamVjdG9ycywgd2l0aCB0aGUgcm9vdCBpbmplY3RvciBhcyBhIGZpcnN0IG9uZVxuICAgKlxuICAgKi9cbiAgcmVhZG9ubHkgaW5qZWN0b3JzJDogT2JzZXJ2YWJsZTxJbmplY3Rvcj4gPSB0aGlzLmxhenlNb2R1bGVzLm1vZHVsZXMkLnBpcGUoXG4gICAgbWFwKChtb2R1bGVSZWYpID0+IG1vZHVsZVJlZi5pbmplY3RvciksXG4gICAgc3RhcnRXaXRoKHRoaXMucm9vdEluamVjdG9yKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb290SW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBsYXp5TW9kdWxlczogTGF6eU1vZHVsZXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogR2VuIGluc3RhbmNlcyBmb3Igc3BlY2lmaWVkIHRva2Vucy5cbiAgICpcbiAgICogV2hlbiBub3RGb3VuZFZhbHVlIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGNvbnNpc3RlbnRseSBlbWl0IG9uY2UgcGVyIGluamVjdG9yLFxuICAgKiBldmVuIGlmIGluamVjdG9yIGRvZXNuJ3QgY29udGFpbiBpbnN0YW5jZXMgZm9yIHNwZWNpZmllZCB0b2tlbi5cbiAgICogT3RoZXJ3aXNlLCBlbWlzc2lvbnMgd2lsbCBvbmx5IGludm9sdmUgY2FzZXMsIHdoZXJlIG5ldyBpbnN0YW5jZXMgd2lsbCBiZSBmb3VuZC5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqIEBwYXJhbSBub3RGb3VuZFZhbHVlXG4gICAqL1xuICBnZXQ8VD4oXG4gICAgdG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPiB8IEFic3RyYWN0VHlwZTxUPixcbiAgICBub3RGb3VuZFZhbHVlPzogVFxuICApOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3RvcnMkLnBpcGUoXG4gICAgICBtYXAoKGluamVjdG9yLCBpbmRleCkgPT5cbiAgICAgICAgaW5qZWN0b3IuZ2V0PFQ+KFxuICAgICAgICAgIHRva2VuLFxuICAgICAgICAgIG5vdEZvdW5kVmFsdWUgPz8gTk9UX0ZPVU5EX1NZTUJPTCxcbiAgICAgICAgICAvLyB3ZSB3YW50IHRvIGdldCBvbmx5IFNlbGYgaW5zdGFuY2VzIGZyb20gYWxsIGluamVjdG9ycyBleGNlcHQgdGhlXG4gICAgICAgICAgLy8gZmlyc3Qgb25lLCB3aGljaCBpcyBhIHJvb3QgaW5qZWN0b3JcbiAgICAgICAgICBpbmRleCA/IEluamVjdEZsYWdzLlNlbGYgOiB1bmRlZmluZWRcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIGZpbHRlcigoaW5zdGFuY2UpID0+IGluc3RhbmNlICE9PSBOT1RfRk9VTkRfU1lNQk9MKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG11bHRpIHByb3ZpZGVkIGluc3RhbmNlcyBmb3IgYSBzcGVjaWZpZWQgdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqL1xuICBnZXRNdWx0aTxUPihcbiAgICB0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+XG4gICk6IE9ic2VydmFibGU8VFtdPjtcbiAgZ2V0TXVsdGk8VD4odG9rZW46IGFueSk6IE9ic2VydmFibGU8VD47XG4gIGdldE11bHRpPFQ+KFxuICAgIHRva2VuOiBUeXBlPFQ+IHwgSW5qZWN0aW9uVG9rZW48VD4gfCBBYnN0cmFjdFR5cGU8VD4gfCBhbnlcbiAgKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXQodG9rZW4sIFtdKS5waXBlKFxuICAgICAgZmlsdGVyKChpbnN0YW5jZXMpID0+IHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGluc3RhbmNlcykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgTXVsdGktcHJvdmlkZXJzIG1peGVkIHdpdGggc2luZ2xlIHByb3ZpZGVycyBmb3IgJHt0b2tlbi50b1N0cmluZygpfSFgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdGFuY2VzLmxlbmd0aCA+IDA7XG4gICAgICB9KSxcbiAgICAgIHNjYW4oKGFjYywgc2VydmljZXMpID0+IFsuLi5hY2MsIC4uLnNlcnZpY2VzXSwgW10pXG4gICAgKTtcbiAgfVxufVxuIl19