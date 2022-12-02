/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { combineLatest, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { PAGE_LAYOUT_HANDLER } from './page-layout-handler';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../layout/config/layout-config";
import * as i3 from "../../../layout/breakpoint/breakpoint.service";
export class PageLayoutService {
    constructor(cms, config, breakpointService, unifiedInjector) {
        this.cms = cms;
        this.config = config;
        this.breakpointService = breakpointService;
        this.unifiedInjector = unifiedInjector;
        this.subscription = new Subscription();
        // Prints warn messages for missing layout configs.
        // The warnings are only printed once per config
        // to not pollute the console log.
        this.warnLogMessages = {};
        this.logSlots = {};
        this.subscription.add(this.unifiedInjector
            .getMulti(PAGE_LAYOUT_HANDLER)
            .subscribe((handlers) => (this.handlers = handlers)));
    }
    getSlots(section) {
        return combineLatest([this.page$, this.breakpointService.breakpoint$]).pipe(map(([page, breakpoint]) => {
            const pageTemplate = page.template;
            const slots = this.resolveSlots(page, section, breakpoint);
            return { slots, pageTemplate, breakpoint };
        }), switchMap(({ slots, pageTemplate, breakpoint }) => {
            let result = of(slots);
            for (const handler of this.handlers || []) {
                result = handler.handle(result, pageTemplate, section, breakpoint);
            }
            return result;
        }), distinctUntilChanged((a, b) => {
            if (a.length !== b.length) {
                return false;
            }
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }));
    }
    /**
     * Returns an observable with the last page slot above-the-fold
     * for the given pageTemplate / breakpoint.
     *
     * The page fold is configurable in the `LayoutConfig` for each page layout.
     */
    getPageFoldSlot(pageTemplate) {
        return this.breakpointService.breakpoint$.pipe(map((breakpoint) => {
            if (!this.config.layoutSlots) {
                // no layout config available
                return undefined;
            }
            const pageTemplateConfig = this.config.layoutSlots[pageTemplate];
            const config = this.getResponsiveSlotConfig(pageTemplateConfig, 'pageFold', breakpoint);
            return config ? config.pageFold : undefined;
        }));
    }
    resolveSlots(page, section, breakpoint) {
        const config = this.getSlotConfig(page.template ?? '', 'slots', section, breakpoint);
        if (config && config.slots) {
            const pageSlots = page.slots ? Object.keys(page.slots) : [];
            return config.slots.filter((slot) => pageSlots.includes(slot));
        }
        else if (!section) {
            this.logMissingLayoutConfig(page);
            return page.slots ? Object.keys(page.slots) : [];
        }
        else {
            this.logMissingLayoutConfig(page, section);
            return [];
        }
    }
    get page$() {
        return this.cms.getCurrentPage().pipe(filter((page) => !!page));
    }
    get templateName$() {
        return this.page$.pipe(map((page) => page.template), filter(isNotUndefined));
    }
    /**
     * load slots from the layout configuration. The breakpoint is used
     * to load a specific configuration for the given breakpoint. If there's
     * no configuration available for the given breakpoint the default slot
     * configuration is returned.
     */
    getSlotConfig(templateUid, configAttribute, section, breakpoint) {
        if (!this.config.layoutSlots) {
            return undefined;
        }
        const pageTemplateConfig = this.config.layoutSlots[templateUid];
        if (section) {
            return this.getSlotConfigForSection(templateUid, configAttribute, section, breakpoint);
        }
        if (pageTemplateConfig) {
            return this.getResponsiveSlotConfig(pageTemplateConfig, configAttribute, breakpoint);
        }
    }
    getSlotConfigForSection(templateUid, configAttribute, section, breakpoint) {
        const pageTemplateConfig = this.config.layoutSlots?.[templateUid];
        if (!pageTemplateConfig || !section) {
            return undefined;
        }
        // if there's no section config on the page layout
        // we fall back to the global section config
        const sectionConfig = pageTemplateConfig[section]
            ? pageTemplateConfig[section]
            : this.config.layoutSlots?.[section];
        if (!sectionConfig) {
            return undefined;
        }
        const responsiveConfig = this.getResponsiveSlotConfig(sectionConfig, configAttribute, breakpoint);
        if (responsiveConfig.hasOwnProperty(configAttribute)) {
            return responsiveConfig;
        }
        else if (pageTemplateConfig[section].hasOwnProperty(configAttribute)) {
            return pageTemplateConfig[section];
        }
        else if (this.config.layoutSlots?.[section]) {
            return this.config.layoutSlots[section];
        }
    }
    /**
     * Returns a list of slots for a breakpoint specific configuration
     * If there's no specific configuration for the breakpoint,
     * the closest available configuration will be returned.
     */
    getResponsiveSlotConfig(layoutSlotConfig, configAttribute, breakpoint) {
        let slotConfig = layoutSlotConfig;
        // fallback to default slot config
        if (!layoutSlotConfig || !breakpoint) {
            return slotConfig;
        }
        // we have a config for the specific breakpoint
        if (layoutSlotConfig[breakpoint] &&
            layoutSlotConfig[breakpoint].hasOwnProperty(configAttribute)) {
            return layoutSlotConfig[breakpoint];
        }
        // find closest config
        const all = this.breakpointService.breakpoints;
        for (const br of all.slice(0, all.indexOf(breakpoint))) {
            if (layoutSlotConfig[br] &&
                layoutSlotConfig[br].hasOwnProperty(configAttribute)) {
                slotConfig = layoutSlotConfig[br];
            }
        }
        return slotConfig;
    }
    /**
     * In order to help developers, we print some detailed log information in
     * case there's no layout configuration available for the given page template
     * or section. Additionally, the slot positions are printed in the console
     * in a format that can be copied / paste to the configuration.
     */
    logMissingLayoutConfig(page, section) {
        if (!isDevMode()) {
            return;
        }
        if (page.template && !this.logSlots[page.template]) {
            // the info log is not printed in production
            // eslint-disable-next-line no-console
            console.info(`Available CMS page slots: '${(page.slots
                ? Object.keys(page.slots)
                : []).join(`','`)}'`);
            this.logSlots[page.template] = true;
        }
        const cacheKey = section || page.template;
        if (cacheKey && !this.warnLogMessages[cacheKey]) {
            console.warn(`No layout config found for ${cacheKey}, you can configure a 'LayoutConfig' to control the rendering of page slots.`);
            this.warnLogMessages[cacheKey] = true;
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PageLayoutService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PageLayoutService, deps: [{ token: i1.CmsService }, { token: i2.LayoutConfig }, { token: i3.BreakpointService }, { token: i1.UnifiedInjector }], target: i0.ɵɵFactoryTarget.Injectable });
PageLayoutService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PageLayoutService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PageLayoutService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i2.LayoutConfig }, { type: i3.BreakpointService }, { type: i1.UnifiedInjector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1sYXlvdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL3BhZ2UtbGF5b3V0L3BhZ2UtbGF5b3V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFFTCxjQUFjLEdBR2YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFROUUsT0FBTyxFQUFxQixtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUsvRSxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQ1UsR0FBZSxFQUNmLE1BQW9CLEVBQ3BCLGlCQUFvQyxFQUNwQyxlQUFnQztRQUhoQyxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUNwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQU5oQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFlNUMsbURBQW1EO1FBQ25ELGdEQUFnRDtRQUNoRCxrQ0FBa0M7UUFDMUIsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQVh6QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGVBQWU7YUFDakIsUUFBUSxDQUFDLG1CQUFtQixDQUFDO2FBQzdCLFNBQVMsQ0FBQyxDQUFD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O1FBQ3pELElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsRCw0Q0FBNEM7WUFDNUMsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQ1YsOEJBQThCLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ3ZDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQ0wsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDakIsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNyQztRQUVELE1BQU0sUUFBUSxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFDLElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMvQyxPQUFPLENBQUMsSUFBSSxDQUNWLDhCQUE4QixRQUFRLDhFQUE4RSxDQUNySCxDQUFDO1lBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OEdBN1BVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNTZXJ2aWNlLFxuICBpc05vdFVuZGVmaW5lZCxcbiAgUGFnZSxcbiAgVW5pZmllZEluamVjdG9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCcmVha3BvaW50U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9icmVha3BvaW50L2JyZWFrcG9pbnQuc2VydmljZSc7XG5pbXBvcnQge1xuICBCUkVBS1BPSU5ULFxuICBMYXlvdXRDb25maWcsXG4gIExheW91dFNsb3RDb25maWcsXG4gIFNsb3RDb25maWcsXG59IGZyb20gJy4uLy4uLy4uL2xheW91dC9jb25maWcvbGF5b3V0LWNvbmZpZyc7XG5pbXBvcnQgeyBQYWdlTGF5b3V0SGFuZGxlciwgUEFHRV9MQVlPVVRfSEFORExFUiB9IGZyb20gJy4vcGFnZS1sYXlvdXQtaGFuZGxlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlTGF5b3V0U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBoYW5kbGVyczogUGFnZUxheW91dEhhbmRsZXJbXTtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNtczogQ21zU2VydmljZSxcbiAgICBwcml2YXRlIGNvbmZpZzogTGF5b3V0Q29uZmlnLFxuICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IEJyZWFrcG9pbnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdW5pZmllZEluamVjdG9yOiBVbmlmaWVkSW5qZWN0b3JcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51bmlmaWVkSW5qZWN0b3JcbiAgICAgICAgLmdldE11bHRpKFBBR0VfTEFZT1VUX0hBTkRMRVIpXG4gICAgICAgIC5zdWJzY3JpYmUoKGhhbmRsZXJzKSA9PiAodGhpcy5oYW5kbGVycyA9IGhhbmRsZXJzKSlcbiAgICApO1xuICB9XG5cbiAgLy8gUHJpbnRzIHdhcm4gbWVzc2FnZXMgZm9yIG1pc3NpbmcgbGF5b3V0IGNvbmZpZ3MuXG4gIC8vIFRoZSB3YXJuaW5ncyBhcmUgb25seSBwcmludGVkIG9uY2UgcGVyIGNvbmZpZ1xuICAvLyB0byBub3QgcG9sbHV0ZSB0aGUgY29uc29sZSBsb2cuXG4gIHByaXZhdGUgd2FybkxvZ01lc3NhZ2VzOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBsb2dTbG90czogYW55ID0ge307XG5cbiAgZ2V0U2xvdHMoc2VjdGlvbj86IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbdGhpcy5wYWdlJCwgdGhpcy5icmVha3BvaW50U2VydmljZS5icmVha3BvaW50JF0pLnBpcGUoXG4gICAgICBtYXAoKFtwYWdlLCBicmVha3BvaW50XSkgPT4ge1xuICAgICAgICBjb25zdCBwYWdlVGVtcGxhdGUgPSBwYWdlLnRlbXBsYXRlO1xuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMucmVzb2x2ZVNsb3RzKHBhZ2UsIHNlY3Rpb24sIGJyZWFrcG9pbnQpO1xuICAgICAgICByZXR1cm4geyBzbG90cywgcGFnZVRlbXBsYXRlLCBicmVha3BvaW50IH07XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeyBzbG90cywgcGFnZVRlbXBsYXRlLCBicmVha3BvaW50IH0pID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG9mKHNsb3RzKTtcbiAgICAgICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIHRoaXMuaGFuZGxlcnMgfHwgW10pIHtcbiAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyLmhhbmRsZShyZXN1bHQsIHBhZ2VUZW1wbGF0ZSwgc2VjdGlvbiwgYnJlYWtwb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgd2l0aCB0aGUgbGFzdCBwYWdlIHNsb3QgYWJvdmUtdGhlLWZvbGRcbiAgICogZm9yIHRoZSBnaXZlbiBwYWdlVGVtcGxhdGUgLyBicmVha3BvaW50LlxuICAgKlxuICAgKiBUaGUgcGFnZSBmb2xkIGlzIGNvbmZpZ3VyYWJsZSBpbiB0aGUgYExheW91dENvbmZpZ2AgZm9yIGVhY2ggcGFnZSBsYXlvdXQuXG4gICAqL1xuICBnZXRQYWdlRm9sZFNsb3QocGFnZVRlbXBsYXRlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLmJyZWFrcG9pbnQkLnBpcGUoXG4gICAgICBtYXAoKGJyZWFrcG9pbnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5sYXlvdXRTbG90cykge1xuICAgICAgICAgIC8vIG5vIGxheW91dCBjb25maWcgYXZhaWxhYmxlXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWdlVGVtcGxhdGVDb25maWcgPSB0aGlzLmNvbmZpZy5sYXlvdXRTbG90c1twYWdlVGVtcGxhdGVdO1xuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldFJlc3BvbnNpdmVTbG90Q29uZmlnKFxuICAgICAgICAgIDxMYXlvdXRTbG90Q29uZmlnPnBhZ2VUZW1wbGF0ZUNvbmZpZyxcbiAgICAgICAgICAncGFnZUZvbGQnLFxuICAgICAgICAgIGJyZWFrcG9pbnRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZyA/IGNvbmZpZy5wYWdlRm9sZCA6IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVNsb3RzKFxuICAgIHBhZ2U6IFBhZ2UsXG4gICAgc2VjdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGJyZWFrcG9pbnQ6IEJSRUFLUE9JTlRcbiAgKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0U2xvdENvbmZpZyhcbiAgICAgIHBhZ2UudGVtcGxhdGUgPz8gJycsXG4gICAgICAnc2xvdHMnLFxuICAgICAgc2VjdGlvbixcbiAgICAgIGJyZWFrcG9pbnRcbiAgICApO1xuICAgIGlmIChjb25maWcgJiYgY29uZmlnLnNsb3RzKSB7XG4gICAgICBjb25zdCBwYWdlU2xvdHMgPSBwYWdlLnNsb3RzID8gT2JqZWN0LmtleXMocGFnZS5zbG90cykgOiBbXTtcbiAgICAgIHJldHVybiBjb25maWcuc2xvdHMuZmlsdGVyKChzbG90KSA9PiBwYWdlU2xvdHMuaW5jbHVkZXMoc2xvdCkpO1xuICAgIH0gZWxzZSBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHRoaXMubG9nTWlzc2luZ0xheW91dENvbmZpZyhwYWdlKTtcbiAgICAgIHJldHVybiBwYWdlLnNsb3RzID8gT2JqZWN0LmtleXMocGFnZS5zbG90cykgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dNaXNzaW5nTGF5b3V0Q29uZmlnKHBhZ2UsIHNlY3Rpb24pO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwYWdlJCgpOiBPYnNlcnZhYmxlPFBhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5jbXMuZ2V0Q3VycmVudFBhZ2UoKS5waXBlKGZpbHRlcigocGFnZSkgPT4gISFwYWdlKSk7XG4gIH1cblxuICBnZXQgdGVtcGxhdGVOYW1lJCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2UkLnBpcGUoXG4gICAgICBtYXAoKHBhZ2U6IFBhZ2UpID0+IHBhZ2UudGVtcGxhdGUpLFxuICAgICAgZmlsdGVyKGlzTm90VW5kZWZpbmVkKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogbG9hZCBzbG90cyBmcm9tIHRoZSBsYXlvdXQgY29uZmlndXJhdGlvbi4gVGhlIGJyZWFrcG9pbnQgaXMgdXNlZFxuICAgKiB0byBsb2FkIGEgc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmb3IgdGhlIGdpdmVuIGJyZWFrcG9pbnQuIElmIHRoZXJlJ3NcbiAgICogbm8gY29uZmlndXJhdGlvbiBhdmFpbGFibGUgZm9yIHRoZSBnaXZlbiBicmVha3BvaW50IHRoZSBkZWZhdWx0IHNsb3RcbiAgICogY29uZmlndXJhdGlvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRTbG90Q29uZmlnKFxuICAgIHRlbXBsYXRlVWlkOiBzdHJpbmcsXG4gICAgY29uZmlnQXR0cmlidXRlOiBzdHJpbmcsXG4gICAgc2VjdGlvbj86IHN0cmluZyxcbiAgICBicmVha3BvaW50PzogQlJFQUtQT0lOVFxuICApOiBTbG90Q29uZmlnIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmxheW91dFNsb3RzKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBwYWdlVGVtcGxhdGVDb25maWcgPSB0aGlzLmNvbmZpZy5sYXlvdXRTbG90c1t0ZW1wbGF0ZVVpZF07XG5cbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2xvdENvbmZpZ0ZvclNlY3Rpb24oXG4gICAgICAgIHRlbXBsYXRlVWlkLFxuICAgICAgICBjb25maWdBdHRyaWJ1dGUsXG4gICAgICAgIHNlY3Rpb24sXG4gICAgICAgIGJyZWFrcG9pbnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHBhZ2VUZW1wbGF0ZUNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzcG9uc2l2ZVNsb3RDb25maWcoXG4gICAgICAgIDxMYXlvdXRTbG90Q29uZmlnPnBhZ2VUZW1wbGF0ZUNvbmZpZyxcbiAgICAgICAgY29uZmlnQXR0cmlidXRlLFxuICAgICAgICBicmVha3BvaW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTbG90Q29uZmlnRm9yU2VjdGlvbihcbiAgICB0ZW1wbGF0ZVVpZDogc3RyaW5nLFxuICAgIGNvbmZpZ0F0dHJpYnV0ZTogc3RyaW5nLFxuICAgIHNlY3Rpb24/OiBzdHJpbmcsXG4gICAgYnJlYWtwb2ludD86IEJSRUFLUE9JTlRcbiAgKTogU2xvdENvbmZpZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFnZVRlbXBsYXRlQ29uZmlnOiBhbnkgPSB0aGlzLmNvbmZpZy5sYXlvdXRTbG90cz8uW3RlbXBsYXRlVWlkXTtcblxuICAgIGlmICghcGFnZVRlbXBsYXRlQ29uZmlnIHx8ICFzZWN0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlJ3Mgbm8gc2VjdGlvbiBjb25maWcgb24gdGhlIHBhZ2UgbGF5b3V0XG4gICAgLy8gd2UgZmFsbCBiYWNrIHRvIHRoZSBnbG9iYWwgc2VjdGlvbiBjb25maWdcbiAgICBjb25zdCBzZWN0aW9uQ29uZmlnID0gcGFnZVRlbXBsYXRlQ29uZmlnW3NlY3Rpb25dXG4gICAgICA/IHBhZ2VUZW1wbGF0ZUNvbmZpZ1tzZWN0aW9uXVxuICAgICAgOiB0aGlzLmNvbmZpZy5sYXlvdXRTbG90cz8uW3NlY3Rpb25dO1xuXG4gICAgaWYgKCFzZWN0aW9uQ29uZmlnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNpdmVDb25maWcgPSB0aGlzLmdldFJlc3BvbnNpdmVTbG90Q29uZmlnKFxuICAgICAgPExheW91dFNsb3RDb25maWc+c2VjdGlvbkNvbmZpZyxcbiAgICAgIGNvbmZpZ0F0dHJpYnV0ZSxcbiAgICAgIGJyZWFrcG9pbnRcbiAgICApO1xuXG4gICAgaWYgKHJlc3BvbnNpdmVDb25maWcuaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNpdmVDb25maWc7XG4gICAgfSBlbHNlIGlmIChwYWdlVGVtcGxhdGVDb25maWdbc2VjdGlvbl0uaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKSkge1xuICAgICAgcmV0dXJuIHBhZ2VUZW1wbGF0ZUNvbmZpZ1tzZWN0aW9uXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29uZmlnLmxheW91dFNsb3RzPy5bc2VjdGlvbl0pIHtcbiAgICAgIHJldHVybiA8U2xvdENvbmZpZz50aGlzLmNvbmZpZy5sYXlvdXRTbG90c1tzZWN0aW9uXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2Ygc2xvdHMgZm9yIGEgYnJlYWtwb2ludCBzcGVjaWZpYyBjb25maWd1cmF0aW9uXG4gICAqIElmIHRoZXJlJ3Mgbm8gc3BlY2lmaWMgY29uZmlndXJhdGlvbiBmb3IgdGhlIGJyZWFrcG9pbnQsXG4gICAqIHRoZSBjbG9zZXN0IGF2YWlsYWJsZSBjb25maWd1cmF0aW9uIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UmVzcG9uc2l2ZVNsb3RDb25maWcoXG4gICAgbGF5b3V0U2xvdENvbmZpZzogTGF5b3V0U2xvdENvbmZpZyxcbiAgICBjb25maWdBdHRyaWJ1dGU6IHN0cmluZyxcbiAgICBicmVha3BvaW50PzogQlJFQUtQT0lOVFxuICApOiBTbG90Q29uZmlnIHtcbiAgICBsZXQgc2xvdENvbmZpZyA9IDxTbG90Q29uZmlnPmxheW91dFNsb3RDb25maWc7XG5cbiAgICAvLyBmYWxsYmFjayB0byBkZWZhdWx0IHNsb3QgY29uZmlnXG4gICAgaWYgKCFsYXlvdXRTbG90Q29uZmlnIHx8ICFicmVha3BvaW50KSB7XG4gICAgICByZXR1cm4gc2xvdENvbmZpZztcbiAgICB9XG5cbiAgICAvLyB3ZSBoYXZlIGEgY29uZmlnIGZvciB0aGUgc3BlY2lmaWMgYnJlYWtwb2ludFxuICAgIGlmIChcbiAgICAgIGxheW91dFNsb3RDb25maWdbYnJlYWtwb2ludF0gJiZcbiAgICAgIGxheW91dFNsb3RDb25maWdbYnJlYWtwb2ludF0uaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKVxuICAgICkge1xuICAgICAgcmV0dXJuIDxTbG90Q29uZmlnPmxheW91dFNsb3RDb25maWdbYnJlYWtwb2ludF07XG4gICAgfVxuXG4gICAgLy8gZmluZCBjbG9zZXN0IGNvbmZpZ1xuICAgIGNvbnN0IGFsbCA9IHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuYnJlYWtwb2ludHM7XG5cbiAgICBmb3IgKGNvbnN0IGJyIG9mIGFsbC5zbGljZSgwLCBhbGwuaW5kZXhPZihicmVha3BvaW50KSkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGF5b3V0U2xvdENvbmZpZ1ticl0gJiZcbiAgICAgICAgbGF5b3V0U2xvdENvbmZpZ1ticl0uaGFzT3duUHJvcGVydHkoY29uZmlnQXR0cmlidXRlKVxuICAgICAgKSB7XG4gICAgICAgIHNsb3RDb25maWcgPSA8U2xvdENvbmZpZz5sYXlvdXRTbG90Q29uZmlnW2JyXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNsb3RDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogSW4gb3JkZXIgdG8gaGVscCBkZXZlbG9wZXJzLCB3ZSBwcmludCBzb21lIGRldGFpbGVkIGxvZyBpbmZvcm1hdGlvbiBpblxuICAgKiBjYXNlIHRoZXJlJ3Mgbm8gbGF5b3V0IGNvbmZpZ3VyYXRpb24gYXZhaWxhYmxlIGZvciB0aGUgZ2l2ZW4gcGFnZSB0ZW1wbGF0ZVxuICAgKiBvciBzZWN0aW9uLiBBZGRpdGlvbmFsbHksIHRoZSBzbG90IHBvc2l0aW9ucyBhcmUgcHJpbnRlZCBpbiB0aGUgY29uc29sZVxuICAgKiBpbiBhIGZvcm1hdCB0aGF0IGNhbiBiZSBjb3BpZWQgLyBwYXN0ZSB0byB0aGUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgbG9nTWlzc2luZ0xheW91dENvbmZpZyhwYWdlOiBQYWdlLCBzZWN0aW9uPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFpc0Rldk1vZGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGFnZS50ZW1wbGF0ZSAmJiAhdGhpcy5sb2dTbG90c1twYWdlLnRlbXBsYXRlXSkge1xuICAgICAgLy8gdGhlIGluZm8gbG9nIGlzIG5vdCBwcmludGVkIGluIHByb2R1Y3Rpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgIGBBdmFpbGFibGUgQ01TIHBhZ2Ugc2xvdHM6ICckeyhwYWdlLnNsb3RzXG4gICAgICAgICAgPyBPYmplY3Qua2V5cyhwYWdlLnNsb3RzKVxuICAgICAgICAgIDogW11cbiAgICAgICAgKS5qb2luKGAnLCdgKX0nYFxuICAgICAgKTtcbiAgICAgIHRoaXMubG9nU2xvdHNbcGFnZS50ZW1wbGF0ZV0gPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlS2V5ID0gc2VjdGlvbiB8fCBwYWdlLnRlbXBsYXRlO1xuICAgIGlmIChjYWNoZUtleSAmJiAhdGhpcy53YXJuTG9nTWVzc2FnZXNbY2FjaGVLZXldKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBObyBsYXlvdXQgY29uZmlnIGZvdW5kIGZvciAke2NhY2hlS2V5fSwgeW91IGNhbiBjb25maWd1cmUgYSAnTGF5b3V0Q29uZmlnJyB0byBjb250cm9sIHRoZSByZW5kZXJpbmcgb2YgcGFnZSBzbG90cy5gXG4gICAgICApO1xuICAgICAgdGhpcy53YXJuTG9nTWVzc2FnZXNbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=