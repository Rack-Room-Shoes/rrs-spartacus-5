/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TableLayout, } from '@spartacus/storefront';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
/**
 * The `ListService` deals with the table structure, list data and
 * pagination of tables inside the b2b organization.
 *
 * @property {OrganizationTableType} tableType
 *   Used to load the table structure configuration and generate table outlets.
 * @property {PaginationModel} pagination$
 *   The pagination state of the listing.
 */
export class ListService {
    constructor(tableService) {
        this.tableService = tableService;
        /**
         * The default table structure is used to add the default configuration for all
         * organization list related tables. This avoids a lot of boilerplate configuration.
         */
        this.defaultTableStructure = {
            options: { layout: TableLayout.VERTICAL_STACKED },
            lg: { options: { layout: TableLayout.VERTICAL } },
        };
        /**
         * The ghost data contains an empty list of objects that is used in the UI
         * to render the HTML elements.
         *
         * This list contains 10 items, so that the ghost will show 10 rows by default.
         */
        this.ghostData = { values: new Array(10) };
        this.notification$ = new Subject();
        /**
         * The pagination state of the listing.
         *
         * The pagination size defaults to 10, but can be overridden by the
         * table configuration for each entity type.
         */
        this.pagination$ = new BehaviorSubject({
            pageSize: 10,
        });
    }
    get viewType() {
        return this.tableType;
    }
    get domainType() {
        return this._domainType ?? this.viewType;
    }
    /**
     * Indicates the unique key for the item model. The key is different for various
     * organizations, i.e. `budget.code`, `user.uid`.
     */
    key() {
        return 'code';
    }
    /**
     * Loads the data by delegating to the `load` method, which must be implemented
     * in specific implementations of this abstract class.
     *
     * The load method is streamed from the `pagination$` stream, which is initialized
     * with default pagination and structure drive properties.
     */
    getData(...args) {
        return this.pagination$.pipe(
        // we merge any configured pagination from the table structure
        switchMap((pagination) => this.getStructure().pipe(map((config) => ({ ...pagination, ...config.options?.pagination })))), switchMap((pagination) => this.load(pagination, ...args)), startWith(this.ghostData));
    }
    /**
     * Returns the `TableStructure` for the `OrganizationTableType`.
     *
     * The table structure is build by the `TableService` based on configuration.
     * The `defaultTableStructure` is deep merged as a fallback configuration.
     */
    getStructure() {
        return this.tableService.buildStructure(this.viewType, this.defaultTableStructure);
    }
    /**
     * Views the page.
     */
    view(pagination, nextPage) {
        this.pagination$.next({ ...pagination, currentPage: nextPage });
    }
    /**
     * Updates the sort code for the PaginationModel.
     *
     * The `currentPage` is reset to 0.
     */
    sort(pagination, _obsoleteSort) {
        this.view(pagination, 0);
    }
    /**
     * Indicates whether the given data equals to the ghost data.
     *
     * This is used to validate the initial loading state, which is
     * different from the loading state; the loading state occurs
     * while sorting and paginating, where as the initial loading state
     * only happens at the very first load.
     */
    hasGhostData(data) {
        return data === this.ghostData;
    }
}
ListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ListService, deps: [{ token: i1.TableService }], target: i0.ɵɵFactoryTarget.Injectable });
ListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ListService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.TableService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsV0FBVyxHQUdaLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUczRDs7Ozs7Ozs7R0FRRztBQUdILE1BQU0sT0FBZ0IsV0FBVztJQW9EL0IsWUFBc0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFuRGhEOzs7V0FHRztRQUNPLDBCQUFxQixHQUFpQztZQUM5RCxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixFQUFFO1lBQ2pELEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7U0FDbEQsQ0FBQztRQUVGOzs7OztXQUtHO1FBQ08sY0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFzQixDQUFDO1FBRXBFLGtCQUFhLEdBQWlCLElBQUksT0FBTyxFQUFFLENBQUM7UUF3QjVDOzs7OztXQUtHO1FBQ08sZ0JBQVcsR0FBdUIsSUFBSSxlQUFlLENBQUM7WUFDOUQsUUFBUSxFQUFFLEVBQUU7U0FDRCxDQUFDLENBQUM7SUFFb0MsQ0FBQztJQWxCcEQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMzQyxDQUFDO0lBY0Q7OztPQUdHO0lBQ0gsR0FBRztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxPQUFPLENBQUMsR0FBRyxJQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1FBQzFCLDhEQUE4RDtRQUM5RCxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUN0QixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUNwRSxDQUNGLEVBQ0QsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQ3pELFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQzFCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FDckMsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMscUJBQXFCLENBQzNCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsVUFBYSxFQUFFLFFBQWlCO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLENBQUMsVUFBYSxFQUFFLGFBQXNCO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxDQUFDLElBQWtDO1FBQzdDLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDakMsQ0FBQzs7d0dBekhtQixXQUFXOzRHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVudGl0aWVzTW9kZWwsIFBhZ2luYXRpb25Nb2RlbCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBSZXNwb25zaXZlVGFibGVDb25maWd1cmF0aW9uLFxuICBUYWJsZUxheW91dCxcbiAgVGFibGVTZXJ2aWNlLFxuICBUYWJsZVN0cnVjdHVyZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogVGhlIGBMaXN0U2VydmljZWAgZGVhbHMgd2l0aCB0aGUgdGFibGUgc3RydWN0dXJlLCBsaXN0IGRhdGEgYW5kXG4gKiBwYWdpbmF0aW9uIG9mIHRhYmxlcyBpbnNpZGUgdGhlIGIyYiBvcmdhbml6YXRpb24uXG4gKlxuICogQHByb3BlcnR5IHtPcmdhbml6YXRpb25UYWJsZVR5cGV9IHRhYmxlVHlwZVxuICogICBVc2VkIHRvIGxvYWQgdGhlIHRhYmxlIHN0cnVjdHVyZSBjb25maWd1cmF0aW9uIGFuZCBnZW5lcmF0ZSB0YWJsZSBvdXRsZXRzLlxuICogQHByb3BlcnR5IHtQYWdpbmF0aW9uTW9kZWx9IHBhZ2luYXRpb24kXG4gKiAgIFRoZSBwYWdpbmF0aW9uIHN0YXRlIG9mIHRoZSBsaXN0aW5nLlxuICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMaXN0U2VydmljZTxULCBQID0gUGFnaW5hdGlvbk1vZGVsPiB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB0YWJsZSBzdHJ1Y3R1cmUgaXMgdXNlZCB0byBhZGQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmb3IgYWxsXG4gICAqIG9yZ2FuaXphdGlvbiBsaXN0IHJlbGF0ZWQgdGFibGVzLiBUaGlzIGF2b2lkcyBhIGxvdCBvZiBib2lsZXJwbGF0ZSBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIGRlZmF1bHRUYWJsZVN0cnVjdHVyZTogUmVzcG9uc2l2ZVRhYmxlQ29uZmlndXJhdGlvbiA9IHtcbiAgICBvcHRpb25zOiB7IGxheW91dDogVGFibGVMYXlvdXQuVkVSVElDQUxfU1RBQ0tFRCB9LFxuICAgIGxnOiB7IG9wdGlvbnM6IHsgbGF5b3V0OiBUYWJsZUxheW91dC5WRVJUSUNBTCB9IH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBnaG9zdCBkYXRhIGNvbnRhaW5zIGFuIGVtcHR5IGxpc3Qgb2Ygb2JqZWN0cyB0aGF0IGlzIHVzZWQgaW4gdGhlIFVJXG4gICAqIHRvIHJlbmRlciB0aGUgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogVGhpcyBsaXN0IGNvbnRhaW5zIDEwIGl0ZW1zLCBzbyB0aGF0IHRoZSBnaG9zdCB3aWxsIHNob3cgMTAgcm93cyBieSBkZWZhdWx0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGdob3N0RGF0YSA9IHsgdmFsdWVzOiBuZXcgQXJyYXkoMTApIH0gYXMgRW50aXRpZXNNb2RlbDxUPjtcblxuICBub3RpZmljYXRpb24kOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBUaGUgYHZpZXdUeXBlYCBpcyB1c2VkIHRvIGxvYWQgdGhlIHByb3BlciB0YWJsZSBjb25maWd1cmF0aW9uIGFuZCBsb2NhbGl6YXRpb25zIGZvciB0aGUgdmlldy5cbiAgICpcbiAgICogVE9ETzogcmVuYW1lIHRvIGB2aWV3VHlwZWBcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB0YWJsZVR5cGU6IE9yZ2FuaXphdGlvblRhYmxlVHlwZTtcblxuICAvKipcbiAgICogVGhlIGRvbWFpbiB0eXBlIGlzIHVzZWQgdG8gYmluZCBmaWVsZHMgdG8gbG9jYWxpemVkIGZpZWxkcyBiYXNlZCBvbiB0aGUgZG9tYWluLlxuICAgKiBUaGlzIHR5cGUgZGlmZmVycyBmcm9tIHRoZSBgdmlld1R5cGVgLCB3aGljaCBpcyByZWxhdGVkIHRvIGEgc3BlY2lmaWMgdmlld1xuICAgKiBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9kb21haW5UeXBlOiBzdHJpbmc7XG5cbiAgZ2V0IHZpZXdUeXBlKCk6IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVUeXBlO1xuICB9XG5cbiAgZ2V0IGRvbWFpblR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tYWluVHlwZSA/PyB0aGlzLnZpZXdUeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYWdpbmF0aW9uIHN0YXRlIG9mIHRoZSBsaXN0aW5nLlxuICAgKlxuICAgKiBUaGUgcGFnaW5hdGlvbiBzaXplIGRlZmF1bHRzIHRvIDEwLCBidXQgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlXG4gICAqIHRhYmxlIGNvbmZpZ3VyYXRpb24gZm9yIGVhY2ggZW50aXR5IHR5cGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgcGFnaW5hdGlvbiQ6IEJlaGF2aW9yU3ViamVjdDxQPiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe1xuICAgIHBhZ2VTaXplOiAxMCxcbiAgfSBhcyBhbnkgYXMgUCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoZSBpdGVtIG1vZGVsLiBUaGUga2V5IGlzIGRpZmZlcmVudCBmb3IgdmFyaW91c1xuICAgKiBvcmdhbml6YXRpb25zLCBpLmUuIGBidWRnZXQuY29kZWAsIGB1c2VyLnVpZGAuXG4gICAqL1xuICBrZXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2NvZGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBkYXRhIGJ5IGRlbGVnYXRpbmcgdG8gdGhlIGBsb2FkYCBtZXRob2QsIHdoaWNoIG11c3QgYmUgaW1wbGVtZW50ZWRcbiAgICogaW4gc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIG9mIHRoaXMgYWJzdHJhY3QgY2xhc3MuXG4gICAqXG4gICAqIFRoZSBsb2FkIG1ldGhvZCBpcyBzdHJlYW1lZCBmcm9tIHRoZSBgcGFnaW5hdGlvbiRgIHN0cmVhbSwgd2hpY2ggaXMgaW5pdGlhbGl6ZWRcbiAgICogd2l0aCBkZWZhdWx0IHBhZ2luYXRpb24gYW5kIHN0cnVjdHVyZSBkcml2ZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgZ2V0RGF0YSguLi5hcmdzOiBhbnkpOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8VD4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0aW9uJC5waXBlKFxuICAgICAgLy8gd2UgbWVyZ2UgYW55IGNvbmZpZ3VyZWQgcGFnaW5hdGlvbiBmcm9tIHRoZSB0YWJsZSBzdHJ1Y3R1cmVcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGlvbikgPT5cbiAgICAgICAgdGhpcy5nZXRTdHJ1Y3R1cmUoKS5waXBlKFxuICAgICAgICAgIG1hcCgoY29uZmlnKSA9PiAoeyAuLi5wYWdpbmF0aW9uLCAuLi5jb25maWcub3B0aW9ucz8ucGFnaW5hdGlvbiB9KSlcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGlvbikgPT4gdGhpcy5sb2FkKHBhZ2luYXRpb24sIC4uLmFyZ3MpKSxcbiAgICAgIHN0YXJ0V2l0aCh0aGlzLmdob3N0RGF0YSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBUYWJsZVN0cnVjdHVyZWAgZm9yIHRoZSBgT3JnYW5pemF0aW9uVGFibGVUeXBlYC5cbiAgICpcbiAgICogVGhlIHRhYmxlIHN0cnVjdHVyZSBpcyBidWlsZCBieSB0aGUgYFRhYmxlU2VydmljZWAgYmFzZWQgb24gY29uZmlndXJhdGlvbi5cbiAgICogVGhlIGBkZWZhdWx0VGFibGVTdHJ1Y3R1cmVgIGlzIGRlZXAgbWVyZ2VkIGFzIGEgZmFsbGJhY2sgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGdldFN0cnVjdHVyZSgpOiBPYnNlcnZhYmxlPFRhYmxlU3RydWN0dXJlPiB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVTZXJ2aWNlLmJ1aWxkU3RydWN0dXJlKFxuICAgICAgdGhpcy52aWV3VHlwZSxcbiAgICAgIHRoaXMuZGVmYXVsdFRhYmxlU3RydWN0dXJlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3cyB0aGUgcGFnZS5cbiAgICovXG4gIHZpZXcocGFnaW5hdGlvbjogUCwgbmV4dFBhZ2U/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2luYXRpb24kLm5leHQoeyAuLi5wYWdpbmF0aW9uLCBjdXJyZW50UGFnZTogbmV4dFBhZ2UgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc29ydCBjb2RlIGZvciB0aGUgUGFnaW5hdGlvbk1vZGVsLlxuICAgKlxuICAgKiBUaGUgYGN1cnJlbnRQYWdlYCBpcyByZXNldCB0byAwLlxuICAgKi9cbiAgc29ydChwYWdpbmF0aW9uOiBQLCBfb2Jzb2xldGVTb3J0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy52aWV3KHBhZ2luYXRpb24sIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRhIGVxdWFscyB0byB0aGUgZ2hvc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VkIHRvIHZhbGlkYXRlIHRoZSBpbml0aWFsIGxvYWRpbmcgc3RhdGUsIHdoaWNoIGlzXG4gICAqIGRpZmZlcmVudCBmcm9tIHRoZSBsb2FkaW5nIHN0YXRlOyB0aGUgbG9hZGluZyBzdGF0ZSBvY2N1cnNcbiAgICogd2hpbGUgc29ydGluZyBhbmQgcGFnaW5hdGluZywgd2hlcmUgYXMgdGhlIGluaXRpYWwgbG9hZGluZyBzdGF0ZVxuICAgKiBvbmx5IGhhcHBlbnMgYXQgdGhlIHZlcnkgZmlyc3QgbG9hZC5cbiAgICovXG4gIGhhc0dob3N0RGF0YShkYXRhOiBFbnRpdGllc01vZGVsPFQ+IHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGEgPT09IHRoaXMuZ2hvc3REYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIE11c3QgYmUgaW1wbGVtZW50ZWQgdG8gbG9hZCB0aGUgYWN0dWFsIGxpc3RpbmcgZGF0YS4gQW4gdW5rbm93biBudW1iZXIgb2YgYXJndW1lbnRzXG4gICAqIGlzIHN1cHBvcnRlZCBmb3IgbG9hZGluZyB0aGUgZGF0YS4gVGhlc2UgYXJndW1lbnRzIGFyZSBwYXNzZWQgZnJvbSB0aGUgYGdldERhdGFgIG1ldGhvZC5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICAuLi5hcmdzOiBhbnlcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPFQ+IHwgdW5kZWZpbmVkPjtcbn1cbiJdfQ==