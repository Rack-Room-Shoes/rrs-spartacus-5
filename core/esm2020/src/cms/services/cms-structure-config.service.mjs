/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/cms-structure.config";
/**
 * Service that provides access to CMS structure from a static
 * configuration or configuration file. This class uses static
 * configuration is designed in async fashion so that configurations
 * can be loaded from a file or stream.
 *
 * The intent of the `CmsStructureConfigService` however is to provide
 * fast loading pages and default cms structure for commodity commerce.
 */
export class CmsStructureConfigService {
    constructor(cmsDataConfig) {
        this.cmsDataConfig = cmsDataConfig;
    }
    /**
     * Merge the cms structure to the pageStructure. The page structure
     * can either hold complete page structures or global structures that
     * might apply to all pages (such has header coponents).
     */
    mergePageStructure(pageId, pageStructure) {
        return this.mergePage(pageId, pageStructure).pipe(switchMap((page) => this.mergeSlots(page)));
    }
    /**
     *
     * Returns boolean observable to indicate whether the page should not be
     * loaded from the backend. This is useful for pages which are comoditized
     * and follow best practice.
     *
     * By default, configurable pages are driven by static configuration,
     * in order to allow for fast loading pages (preventing network delays).
     */
    shouldIgnoreBackend(pageId) {
        return this.getPageFromConfig(pageId).pipe(map((page) => !!page && !!page.ignoreBackend));
    }
    /**
     * returns an Observable component data from the static configuration.
     */
    getComponentFromConfig(componentId) {
        return of(this.getComponentById(componentId));
    }
    /**
     * returns an Observable components data from the static configuration.
     */
    getComponentsFromConfig(ids) {
        return of(ids.map((id) => this.getComponentById(id)));
    }
    /**
     * returns an observable with the `PageConfig`.
     */
    getPageFromConfig(pageId) {
        return of(this.cmsDataConfig.cmsStructure && this.cmsDataConfig.cmsStructure.pages
            ? this.cmsDataConfig.cmsStructure.pages.find((p) => p.pageId === pageId)
            : undefined);
    }
    /**
     * Merge page data from the configuration into the given structure, if any.
     * If the given page structure is empty, a page is created and the page slots are
     * are merged into the page.
     */
    mergePage(pageId, pageStructure) {
        return this.getPageFromConfig(pageId).pipe(switchMap((page) => {
            if (page) {
                // serialize page data
                if (!pageStructure.page) {
                    pageStructure.page = {
                        ...page,
                    };
                    pageStructure.page.slots = {};
                }
                if (!pageStructure.page.slots) {
                    pageStructure.page.slots = {};
                }
                return this.mergeSlots(pageStructure, page.slots);
            }
            else {
                return of(pageStructure);
            }
        }));
    }
    /**
     * Adds any pre-configured slots for pages that do not use them.
     * If pages have a slot for the given position, the configiuration
     * is ingored. Even if the slot does not have inner structure (such as
     * components), so that the cms structure is able to override the (static)
     * configuration.
     */
    mergeSlots(pageStructure, slots) {
        // if no slots have been given, we use the global configured slots
        if (!slots &&
            this.cmsDataConfig.cmsStructure &&
            this.cmsDataConfig.cmsStructure.slots) {
            slots = this.cmsDataConfig.cmsStructure.slots;
        }
        if (!slots) {
            return of(pageStructure);
        }
        for (const position of Object.keys(slots)) {
            if (pageStructure.page?.slots &&
                !Object.keys(pageStructure.page.slots).includes(position)) {
                // the global slot isn't yet part of the page structure
                pageStructure.page.slots[position] = {};
                for (const component of this.getComponentsByPosition(slots, position)) {
                    if (!pageStructure.page.slots[position].components) {
                        pageStructure.page.slots[position].components = [];
                    }
                    pageStructure.page.slots[position].components?.push({
                        uid: component.uid,
                        flexType: component.flexType,
                        typeCode: component.typeCode,
                    });
                    if (!pageStructure.components) {
                        pageStructure.components = [];
                    }
                    pageStructure.components.push(component);
                }
            }
        }
        return of(pageStructure);
    }
    getComponentsByPosition(slots, position) {
        const components = [];
        if (slots[position] && slots[position].componentIds) {
            for (const componentId of slots[position].componentIds ?? []) {
                if (this.cmsDataConfig.cmsStructure &&
                    this.cmsDataConfig.cmsStructure.components) {
                    const component = this.cmsDataConfig.cmsStructure.components[componentId];
                    if (component) {
                        components.push({ uid: componentId, ...component });
                    }
                }
            }
        }
        return components;
    }
    getComponentById(componentId) {
        return this.cmsDataConfig.cmsStructure &&
            this.cmsDataConfig.cmsStructure.components
            ? this.cmsDataConfig.cmsStructure.components[componentId]
            : undefined;
    }
}
CmsStructureConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsStructureConfigService, deps: [{ token: i1.CmsStructureConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CmsStructureConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsStructureConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CmsStructureConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsStructureConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXN0cnVjdHVyZS1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Ntcy9zZXJ2aWNlcy9jbXMtc3RydWN0dXJlLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBU2hEOzs7Ozs7OztHQVFHO0FBSUgsTUFBTSxPQUFnQix5QkFBeUI7SUFDN0MsWUFBc0IsYUFBaUM7UUFBakMsa0JBQWEsR0FBYixhQUFhLENBQW9CO0lBQUcsQ0FBQztJQUUzRDs7OztPQUlHO0lBQ0gsa0JBQWtCLENBQ2hCLE1BQWMsRUFDZCxhQUFnQztRQUVoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDL0MsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzNDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxtQkFBbUIsQ0FBQyxNQUFjO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQzlDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQkFBc0IsQ0FDcEIsV0FBbUI7UUFFbkIsT0FBTyxFQUFFLENBQUMs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QUNGO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVTLGdCQUFnQixDQUFDLFdBQW1CO1FBQzVDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZO1lBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVU7WUFDMUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDekQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDOztzSEE3S21CLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRmpDLE1BQU07MkZBRUUseUJBQXlCO2tCQUg5QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENtc1BhZ2VDb25maWcsXG4gIENtc1BhZ2VTbG90c0NvbmZpZyxcbiAgQ21zU3RydWN0dXJlQ29uZmlnLFxufSBmcm9tICcuLi9jb25maWcvY21zLXN0cnVjdHVyZS5jb25maWcnO1xuaW1wb3J0IHsgQ29udGVudFNsb3RDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vbW9kZWwvY29udGVudC1zbG90LWNvbXBvbmVudC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IENtc1N0cnVjdHVyZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvcGFnZS5tb2RlbCc7XG5cbi8qKlxuICogU2VydmljZSB0aGF0IHByb3ZpZGVzIGFjY2VzcyB0byBDTVMgc3RydWN0dXJlIGZyb20gYSBzdGF0aWNcbiAqIGNvbmZpZ3VyYXRpb24gb3IgY29uZmlndXJhdGlvbiBmaWxlLiBUaGlzIGNsYXNzIHVzZXMgc3RhdGljXG4gKiBjb25maWd1cmF0aW9uIGlzIGRlc2lnbmVkIGluIGFzeW5jIGZhc2hpb24gc28gdGhhdCBjb25maWd1cmF0aW9uc1xuICogY2FuIGJlIGxvYWRlZCBmcm9tIGEgZmlsZSBvciBzdHJlYW0uXG4gKlxuICogVGhlIGludGVudCBvZiB0aGUgYENtc1N0cnVjdHVyZUNvbmZpZ1NlcnZpY2VgIGhvd2V2ZXIgaXMgdG8gcHJvdmlkZVxuICogZmFzdCBsb2FkaW5nIHBhZ2VzIGFuZCBkZWZhdWx0IGNtcyBzdHJ1Y3R1cmUgZm9yIGNvbW1vZGl0eSBjb21tZXJjZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENtc1N0cnVjdHVyZUNvbmZpZ1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY21zRGF0YUNvbmZpZzogQ21zU3RydWN0dXJlQ29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0aGUgY21zIHN0cnVjdHVyZSB0byB0aGUgcGFnZVN0cnVjdHVyZS4gVGhlIHBhZ2Ugc3RydWN0dXJlXG4gICAqIGNhbiBlaXRoZXIgaG9sZCBjb21wbGV0ZSBwYWdlIHN0cnVjdHVyZXMgb3IgZ2xvYmFsIHN0cnVjdHVyZXMgdGhhdFxuICAgKiBtaWdodCBhcHBseSB0byBhbGwgcGFnZXMgKHN1Y2ggaGFzIGhlYWRlciBjb3BvbmVudHMpLlxuICAgKi9cbiAgbWVyZ2VQYWdlU3RydWN0dXJlKFxuICAgIHBhZ2VJZDogc3RyaW5nLFxuICAgIHBhZ2VTdHJ1Y3R1cmU6IENtc1N0cnVjdHVyZU1vZGVsXG4gICk6IE9ic2VydmFibGU8Q21zU3RydWN0dXJlTW9kZWw+IHtcbiAgICByZXR1cm4gdGhpcy5tZXJnZVBhZ2UocGFnZUlkLCBwYWdlU3RydWN0dXJlKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChwYWdlKSA9PiB0aGlzLm1lcmdlU2xvdHMocGFnZSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBSZXR1cm5zIGJvb2xlYW4gb2JzZXJ2YWJsZSB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBwYWdlIHNob3VsZCBub3QgYmVcbiAgICogbG9hZGVkIGZyb20gdGhlIGJhY2tlbmQuIFRoaXMgaXMgdXNlZnVsIGZvciBwYWdlcyB3aGljaCBhcmUgY29tb2RpdGl6ZWRcbiAgICogYW5kIGZvbGxvdyBiZXN0IHByYWN0aWNlLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCBjb25maWd1cmFibGUgcGFnZXMgYXJlIGRyaXZlbiBieSBzdGF0aWMgY29uZmlndXJhdGlvbixcbiAgICogaW4gb3JkZXIgdG8gYWxsb3cgZm9yIGZhc3QgbG9hZGluZyBwYWdlcyAocHJldmVudGluZyBuZXR3b3JrIGRlbGF5cykuXG4gICAqL1xuICBzaG91bGRJZ25vcmVCYWNrZW5kKHBhZ2VJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGFnZUZyb21Db25maWcocGFnZUlkKS5waXBlKFxuICAgICAgbWFwKChwYWdlKSA9PiAhIXBhZ2UgJiYgISFwYWdlLmlnbm9yZUJhY2tlbmQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIE9ic2VydmFibGUgY29tcG9uZW50IGRhdGEgZnJvbSB0aGUgc3RhdGljIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBnZXRDb21wb25lbnRGcm9tQ29uZmlnKFxuICAgIGNvbXBvbmVudElkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDb250ZW50U2xvdENvbXBvbmVudERhdGEgfCBhbnk+IHtcbiAgICByZXR1cm4gb2YodGhpcy5nZXRDb21wb25lbnRCeUlkKGNvbXBvbmVudElkKSk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBPYnNlcnZhYmxlIGNvbXBvbmVudHMgZGF0YSBmcm9tIHRoZSBzdGF0aWMgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGdldENvbXBvbmVudHNGcm9tQ29uZmlnKFxuICAgIGlkczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxDb250ZW50U2xvdENvbXBvbmVudERhdGFbXT4ge1xuICAgIHJldHVybiBvZihpZHMubWFwKChpZCkgPT4gdGhpcy5nZXRDb21wb25lbnRCeUlkKGlkKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYW4gb2JzZXJ2YWJsZSB3aXRoIHRoZSBgUGFnZUNvbmZpZ2AuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UGFnZUZyb21Db25maWcoXG4gICAgcGFnZUlkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDbXNQYWdlQ29uZmlnIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIG9mKFxuICAgICAgdGhpcy5jbXNEYXRhQ29uZmlnLmNtc1N0cnVjdHVyZSAmJiB0aGlzLmNtc0RhdGFDb25maWcuY21zU3RydWN0dXJlLnBhZ2VzXG4gICAgICAgID8gdGhpcy5jbXNEYXRhQ29uZmlnLmNtc1N0cnVjdHVyZS5wYWdlcy5maW5kKChwKSA9PiBwLnBhZ2VJZCA9PT0gcGFnZUlkKVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgcGFnZSBkYXRhIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gaW50byB0aGUgZ2l2ZW4gc3RydWN0dXJlLCBpZiBhbnkuXG4gICAqIElmIHRoZSBnaXZlbiBwYWdlIHN0cnVjdHVyZSBpcyBlbXB0eSwgYSBwYWdlIGlzIGNyZWF0ZWQgYW5kIHRoZSBwYWdlIHNsb3RzIGFyZVxuICAgKiBhcmUgbWVyZ2VkIGludG8gdGhlIHBhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgbWVyZ2VQYWdlKFxuICAgIHBhZ2VJZDogc3RyaW5nLFxuICAgIHBhZ2VTdHJ1Y3R1cmU6IENtc1N0cnVjdHVyZU1vZGVsXG4gICk6IE9ic2VydmFibGU8Q21zU3RydWN0dXJlTW9kZWw+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRQYWdlRnJvbUNvbmZpZyhwYWdlSWQpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHBhZ2UpID0+IHtcbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAvLyBzZXJpYWxpemUgcGFnZSBkYXRhXG4gICAgICAgICAgaWYgKCFwYWdlU3RydWN0dXJlLnBhZ2UpIHtcbiAgICAgICAgICAgIHBhZ2VTdHJ1Y3R1cmUucGFnZSA9IHtcbiAgICAgICAgICAgICAgLi4ucGFnZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYWdlU3RydWN0dXJlLnBhZ2Uuc2xvdHMgPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFwYWdlU3RydWN0dXJlLnBhZ2Uuc2xvdHMpIHtcbiAgICAgICAgICAgIHBhZ2VTdHJ1Y3R1cmUucGFnZS5zbG90cyA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5tZXJnZVNsb3RzKHBhZ2VTdHJ1Y3R1cmUsIHBhZ2Uuc2xvdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZihwYWdlU3RydWN0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW55IHByZS1jb25maWd1cmVkIHNsb3RzIGZvciBwYWdlcyB0aGF0IGRvIG5vdCB1c2UgdGhlbS5cbiAgICogSWYgcGFnZXMgaGF2ZSBhIHNsb3QgZm9yIHRoZSBnaXZlbiBwb3NpdGlvbiwgdGhlIGNvbmZpZ2l1cmF0aW9uXG4gICAqIGlzIGluZ29yZWQuIEV2ZW4gaWYgdGhlIHNsb3QgZG9lcyBub3QgaGF2ZSBpbm5lciBzdHJ1Y3R1cmUgKHN1Y2ggYXNcbiAgICogY29tcG9uZW50cyksIHNvIHRoYXQgdGhlIGNtcyBzdHJ1Y3R1cmUgaXMgYWJsZSB0byBvdmVycmlkZSB0aGUgKHN0YXRpYylcbiAgICogY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBtZXJnZVNsb3RzKFxuICAgIHBhZ2VTdHJ1Y3R1cmU6IENtc1N0cnVjdHVyZU1vZGVsLFxuICAgIHNsb3RzPzogQ21zUGFnZVNsb3RzQ29uZmlnXG4gICk6IE9ic2VydmFibGU8Q21zU3RydWN0dXJlTW9kZWw+IHtcbiAgICAvLyBpZiBubyBzbG90cyBoYXZlIGJlZW4gZ2l2ZW4sIHdlIHVzZSB0aGUgZ2xvYmFsIGNvbmZpZ3VyZWQgc2xvdHNcbiAgICBpZiAoXG4gICAgICAhc2xvdHMgJiZcbiAgICAgIHRoaXMuY21zRGF0YUNvbmZpZy5jbXNTdHJ1Y3R1cmUgJiZcbiAgICAgIHRoaXMuY21zRGF0YUNvbmZpZy5jbXNTdHJ1Y3R1cmUuc2xvdHNcbiAgICApIHtcbiAgICAgIHNsb3RzID0gdGhpcy5jbXNEYXRhQ29uZmlnLmNtc1N0cnVjdHVyZS5zbG90cztcbiAgICB9XG5cbiAgICBpZiAoIXNsb3RzKSB7XG4gICAgICByZXR1cm4gb2YocGFnZVN0cnVjdHVyZSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwb3NpdGlvbiBvZiBPYmplY3Qua2V5cyhzbG90cykpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcGFnZVN0cnVjdHVyZS5wYWdlPy5zbG90cyAmJlxuICAgICAgICAhT2JqZWN0LmtleXMocGFnZVN0cnVjdHVyZS5wYWdlLnNsb3RzKS5pbmNsdWRlcyhwb3NpdGlvbilcbiAgICAgICkge1xuICAgICAgICAvLyB0aGUgZ2xvYmFsIHNsb3QgaXNuJ3QgeWV0IHBhcnQgb2YgdGhlIHBhZ2Ugc3RydWN0dXJlXG4gICAgICAgIHBhZ2VTdHJ1Y3R1cmUucGFnZS5zbG90c1twb3NpdGlvbl0gPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiB0aGlzLmdldENvbXBvbmVudHNCeVBvc2l0aW9uKHNsb3RzLCBwb3NpdGlvbikpIHtcbiAgICAgICAgICBpZiAoIXBhZ2VTdHJ1Y3R1cmUucGFnZS5zbG90c1twb3NpdGlvbl0uY29tcG9uZW50cykge1xuICAgICAgICAgICAgcGFnZVN0cnVjdHVyZS5wYWdlLnNsb3RzW3Bvc2l0aW9uXS5jb21wb25lbnRzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhZ2VTdHJ1Y3R1cmUucGFnZS5zbG90c1twb3NpdGlvbl0uY29tcG9uZW50cz8ucHVzaCh7XG4gICAgICAgICAgICB1aWQ6IGNvbXBvbmVudC51aWQsXG4gICAgICAgICAgICBmbGV4VHlwZTogY29tcG9uZW50LmZsZXhUeXBlLFxuICAgICAgICAgICAgdHlwZUNvZGU6IGNvbXBvbmVudC50eXBlQ29kZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIXBhZ2VTdHJ1Y3R1cmUuY29tcG9uZW50cykge1xuICAgICAgICAgICAgcGFnZVN0cnVjdHVyZS5jb21wb25lbnRzID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGFnZVN0cnVjdHVyZS5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZihwYWdlU3RydWN0dXJlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDb21wb25lbnRzQnlQb3NpdGlvbihcbiAgICBzbG90czogQ21zUGFnZVNsb3RzQ29uZmlnLFxuICAgIHBvc2l0aW9uOiBzdHJpbmdcbiAgKTogQ29udGVudFNsb3RDb21wb25lbnREYXRhW10ge1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBbXTtcbiAgICBpZiAoc2xvdHNbcG9zaXRpb25dICYmIHNsb3RzW3Bvc2l0aW9uXS5jb21wb25lbnRJZHMpIHtcbiAgICAgIGZvciAoY29uc3QgY29tcG9uZW50SWQgb2Ygc2xvdHNbcG9zaXRpb25dLmNvbXBvbmVudElkcyA/PyBbXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5jbXNEYXRhQ29uZmlnLmNtc1N0cnVjdHVyZSAmJlxuICAgICAgICAgIHRoaXMuY21zRGF0YUNvbmZpZy5jbXNTdHJ1Y3R1cmUuY29tcG9uZW50c1xuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBjb21wb25lbnQgPVxuICAgICAgICAgICAgdGhpcy5jbXNEYXRhQ29uZmlnLmNtc1N0cnVjdHVyZS5jb21wb25lbnRzW2NvbXBvbmVudElkXTtcbiAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnB1c2goeyB1aWQ6IGNvbXBvbmVudElkLCAuLi5jb21wb25lbnQgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnRzO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldENvbXBvbmVudEJ5SWQoY29tcG9uZW50SWQ6IHN0cmluZyk6IENvbnRlbnRTbG90Q29tcG9uZW50RGF0YSB7XG4gICAgcmV0dXJuIHRoaXMuY21zRGF0YUNvbmZpZy5jbXNTdHJ1Y3R1cmUgJiZcbiAgICAgIHRoaXMuY21zRGF0YUNvbmZpZy5jbXNTdHJ1Y3R1cmUuY29tcG9uZW50c1xuICAgICAgPyB0aGlzLmNtc0RhdGFDb25maWcuY21zU3RydWN0dXJlLmNvbXBvbmVudHNbY29tcG9uZW50SWRdXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19