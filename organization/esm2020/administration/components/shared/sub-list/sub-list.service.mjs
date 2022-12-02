/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TableLayout, } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ListService } from '../list/list.service';
import * as i0 from "@angular/core";
export class SubListService extends ListService {
    constructor() {
        super(...arguments);
        /**
         * The default table structure for sub lists is only showing tables with vertical layout.
         */
        this.defaultTableStructure = {
            options: { layout: TableLayout.VERTICAL },
        };
        /**
         * @override This sub list will show 3 items.
         */
        this.ghostData = { values: new Array(3) };
    }
    // TODO: abstract
    assign(_key, ..._args) {
        return of();
    }
    unassign(_key, ..._args) {
        return of();
    }
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    filterSelected(list) {
        if (!list) {
            return list;
        }
        const { pagination, sorts, values } = list;
        return {
            pagination,
            sorts,
            values: values.filter((value) => value.selected),
        };
    }
}
SubListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SubListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
SubListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SubListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SubListService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBRUwsV0FBVyxHQUNaLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBSW5ELE1BQU0sT0FBZ0IsY0FFcEIsU0FBUSxXQUFjO0lBSHhCOztRQUlFOztXQUVHO1FBQ08sMEJBQXFCLEdBQWlDO1lBQzlELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFO1NBQzFDLENBQUM7UUFFRjs7V0FFRztRQUNPLGNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBc0IsQ0FBQztLQWdDcEU7SUE5QkMsaUJBQWlCO0lBQ2pCLE1BQU0sQ0FBRSxJQUFZLEVBQUUsR0FBRyxLQUFVO1FBQ2pDLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsUUFBUSxDQUNOLElBQVksRUFDWixHQUFHLEtBQVU7UUFFYixPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ08sY0FBYyxDQUN0QixJQUFrQztRQUVsQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQztRQUUzQyxPQUFPO1lBQ0wsVUFBVTtZQUNWLEtBQUs7WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUNqRCxDQUFDO0lBQ0osQ0FBQzs7MkdBNUNtQixjQUFjOytHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEbkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVudGl0aWVzTW9kZWwgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHtcbiAgUmVzcG9uc2l2ZVRhYmxlQ29uZmlndXJhdGlvbixcbiAgVGFibGVMYXlvdXQsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGlzdFNlcnZpY2UgfSBmcm9tICcuLi9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlSXRlbSB9IGZyb20gJy4uL29yZ2FuaXphdGlvbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdWJMaXN0U2VydmljZTxcbiAgVCBleHRlbmRzIEJhc2VJdGVtXG4+IGV4dGVuZHMgTGlzdFNlcnZpY2U8VD4ge1xuICAvKipcbiAgICogVGhlIGRlZmF1bHQgdGFibGUgc3RydWN0dXJlIGZvciBzdWIgbGlzdHMgaXMgb25seSBzaG93aW5nIHRhYmxlcyB3aXRoIHZlcnRpY2FsIGxheW91dC5cbiAgICovXG4gIHByb3RlY3RlZCBkZWZhdWx0VGFibGVTdHJ1Y3R1cmU6IFJlc3BvbnNpdmVUYWJsZUNvbmZpZ3VyYXRpb24gPSB7XG4gICAgb3B0aW9uczogeyBsYXlvdXQ6IFRhYmxlTGF5b3V0LlZFUlRJQ0FMIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIEBvdmVycmlkZSBUaGlzIHN1YiBsaXN0IHdpbGwgc2hvdyAzIGl0ZW1zLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdob3N0RGF0YSA9IHsgdmFsdWVzOiBuZXcgQXJyYXkoMykgfSBhcyBFbnRpdGllc01vZGVsPFQ+O1xuXG4gIC8vIFRPRE86IGFic3RyYWN0XG4gIGFzc2lnbj8oX2tleTogc3RyaW5nLCAuLi5fYXJnczogYW55KTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFQ+PiB7XG4gICAgcmV0dXJuIG9mKCk7XG4gIH1cblxuICB1bmFzc2lnbj8oXG4gICAgX2tleTogc3RyaW5nLFxuICAgIC4uLl9hcmdzOiBhbnlcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFQ+PiB7XG4gICAgcmV0dXJuIG9mKCk7XG4gIH1cblxuICAvKipcbiAgICogQXMgd2UgY2FuJ3QgZmlsdGVyIHdpdGggdGhlIGJhY2tlbmQgQVBJLCB3ZSBkbyB0aGlzIGNsaWVudCBzaWRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGZpbHRlclNlbGVjdGVkKFxuICAgIGxpc3Q6IEVudGl0aWVzTW9kZWw8VD4gfCB1bmRlZmluZWRcbiAgKTogRW50aXRpZXNNb2RlbDxUPiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHBhZ2luYXRpb24sIHNvcnRzLCB2YWx1ZXMgfSA9IGxpc3Q7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGFnaW5hdGlvbixcbiAgICAgIHNvcnRzLFxuICAgICAgdmFsdWVzOiB2YWx1ZXMuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUuc2VsZWN0ZWQpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==