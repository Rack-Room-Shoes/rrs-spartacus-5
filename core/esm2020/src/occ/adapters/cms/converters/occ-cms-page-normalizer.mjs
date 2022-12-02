/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CMS_FLEX_COMPONENT_TYPE, JSP_INCLUDE_CMS_COMPONENT_TYPE, } from '../../../../cms/config/cms-config';
import { PageRobotsMeta, } from '../../../../cms/model/page.model';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export class OccCmsPageNormalizer {
    convert(source, target = {}) {
        this.normalizePageData(source, target);
        this.normalizePageSlotData(source, target);
        this.normalizePageComponentData(source, target);
        this.normalizeComponentData(source, target);
        return target;
    }
    /**
     * Converts the OCC cms page model to the `Page` in the `CmsStructureModel`.
     */
    normalizePageData(source, target) {
        if (!source) {
            return;
        }
        const page = {};
        if (source.name) {
            page.name = source.name;
        }
        if (source.typeCode) {
            page.type = source.typeCode;
        }
        if (source.label) {
            page.label = source.label;
        }
        if (source.template) {
            page.template = source.template;
        }
        if (source.uid) {
            page.pageId = source.uid;
        }
        if (source.title) {
            page.title = source.title;
        }
        if (source.description) {
            page.description = source.description;
        }
        if (source.properties) {
            page.properties = source.properties;
        }
        this.normalizeRobots(source, page);
        target.page = page;
    }
    /**
     * Adds a ContentSlotData for each page slot in the `CmsStructureModel`.
     */
    normalizePageSlotData(source, target) {
        if (!source?.contentSlots) {
            return;
        }
        if (source.contentSlots.contentSlot &&
            !Array.isArray(source.contentSlots.contentSlot)) {
            source.contentSlots.contentSlot = [source.contentSlots.contentSlot];
        }
        target.page = target.page ?? {};
        target.page.slots = {};
        for (const slot of source.contentSlots.contentSlot ?? []) {
            if (slot.position) {
                target.page.slots[slot.position] = {};
                if (slot.properties) {
                    target.page.slots[slot.position].properties = slot.properties;
                }
            }
        }
    }
    /**
     * Registers the `ContentSlotComponentData` for each component.
     */
    normalizePageComponentData(source, target) {
        if (!source?.contentSlots?.contentSlot) {
            return;
        }
        for (const slot of source.contentSlots.contentSlot) {
            if (Array.isArray(slot.components?.component)) {
                for (const component of slot.components?.component ?? []) {
                    const comp = {
                        uid: component.uid,
                        typeCode: component.typeCode,
                    };
                    if (component.properties) {
                        comp.properties = component.properties;
                    }
                    if (component.typeCode === CMS_FLEX_COMPONENT_TYPE) {
                        comp.flexType = component.flexType;
                    }
                    else if (component.typeCode === JSP_INCLUDE_CMS_COMPONENT_TYPE) {
                        comp.flexType = component.uid;
                    }
                    else {
                        comp.flexType = component.typeCode;
                    }
                    if (slot.position) {
                        let targetSlot = target.page?.slots?.[slot.position];
                        if (targetSlot) {
                            if (!targetSlot.components) {
                                targetSlot.components = [];
                            }
                            targetSlot.components.push(comp);
                        }
                    }
                }
            }
        }
    }
    /**
     * Adds the actual component data whenever available in the CMS page data.
     *
     * If the data is not populated in this payload, it is loaded separately
     * (`OccCmsComponentAdapter`).
     */
    normalizeComponentData(source, target) {
        if (!source?.contentSlots?.contentSlot) {
            return;
        }
        for (const slot of source.contentSlots.contentSlot) {
            if (Array.isArray(slot.components?.component)) {
                for (const component of slot.components?.component ?? []) {
                    // while we're hoping to get this right from the backend api,
                    // the OCC api stills seems out of sync with the right model.
                    if (component.modifiedtime) {
                        component.modifiedTime = component.modifiedtime;
                        delete component.modifiedtime;
                    }
                    // we don't put properties into component state
                    if (component.properties) {
                        component.properties = undefined;
                    }
                    if (!target.components) {
                        target.components = [];
                    }
                    target.components.push(component);
                }
            }
        }
    }
    /**
     * Normalizes the page robot string to an array of `PageRobotsMeta` items.
     */
    normalizeRobots(source, target) {
        const robots = [];
        if (source.robotTag) {
            switch (source.robotTag) {
                case Occ.PageRobots.INDEX_FOLLOW:
                    robots.push(PageRobotsMeta.INDEX);
                    robots.push(PageRobotsMeta.FOLLOW);
                    break;
                case Occ.PageRobots.NOINDEX_FOLLOW:
                    robots.push(PageRobotsMeta.NOINDEX);
                    robots.push(PageRobotsMeta.FOLLOW);
                    break;
                case Occ.PageRobots.INDEX_NOFOLLOW:
                    robots.push(PageRobotsMeta.INDEX);
                    robots.push(PageRobotsMeta.NOFOLLOW);
                    break;
                case Occ.PageRobots.NOINDEX_NOFOLLOW:
                    robots.push(PageRobotsMeta.NOINDEX);
                    robots.push(PageRobotsMeta.NOFOLLOW);
                    break;
            }
        }
        target.robots = robots;
    }
}
OccCmsPageNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsPageNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccCmsPageNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsPageNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OccCmsPageNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNtcy1wYWdlLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvY21zL2NvbnZlcnRlcnMvb2NjLWNtcy1wYWdlLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qiw4QkFBOEIsR0FDL0IsTUFBTSxtQ0FBbUMsQ0FBQztBQUczQyxPQUFPLEVBR0wsY0FBYyxHQUNmLE1BQU0sa0NBQWtDLENBQUM7QUFFMUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztBQUdyRCxNQUFNLE9BQU8sb0JBQW9CO0lBRy9CLE9BQU8sQ0FDTCxNQUFtQixFQUNuQixTQUE0QixFQUFFO1FBRTlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ08saUJBQWlCLENBQ3pCLE1BQW1CLEVBQ25CLE1BQXlCO1FBRXpCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO1NBQ1I7UUFDRCxNQUFNLElBQUksR0FBUyxFQUFFLENBQUM7UUFFdEIsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NB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QUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtvQkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxNQUFNO2FBQ1Q7U0FDRjtRQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7O2lIQTlMVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQURQLE1BQU07MkZBQ25CLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDTVNfRkxFWF9DT01QT05FTlRfVFlQRSxcbiAgSlNQX0lOQ0xVREVfQ01TX0NPTVBPTkVOVF9UWVBFLFxufSBmcm9tICcuLi8uLi8uLi8uLi9jbXMvY29uZmlnL2Ntcy1jb25maWcnO1xuaW1wb3J0IHsgQ29udGVudFNsb3RDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vY21zL21vZGVsL2NvbnRlbnQtc2xvdC1jb21wb25lbnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBDb250ZW50U2xvdERhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi9jbXMvbW9kZWwvY29udGVudC1zbG90LWRhdGEubW9kZWwnO1xuaW1wb3J0IHtcbiAgQ21zU3RydWN0dXJlTW9kZWwsXG4gIFBhZ2UsXG4gIFBhZ2VSb2JvdHNNZXRhLFxufSBmcm9tICcuLi8uLi8uLi8uLi9jbXMvbW9kZWwvcGFnZS5tb2RlbCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL2NvbnZlcnRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9jYyB9IGZyb20gJy4uLy4uLy4uL29jYy1tb2RlbHMvb2NjLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ21zUGFnZU5vcm1hbGl6ZXJcbiAgaW1wbGVtZW50cyBDb252ZXJ0ZXI8T2NjLkNNU1BhZ2UsIENtc1N0cnVjdHVyZU1vZGVsPlxue1xuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogT2NjLkNNU1BhZ2UsXG4gICAgdGFyZ2V0OiBDbXNTdHJ1Y3R1cmVNb2RlbCA9IHt9XG4gICk6IENtc1N0cnVjdHVyZU1vZGVsIHtcbiAgICB0aGlzLm5vcm1hbGl6ZVBhZ2VEYXRhKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICB0aGlzLm5vcm1hbGl6ZVBhZ2VTbG90RGF0YShzb3VyY2UsIHRhcmdldCk7XG4gICAgdGhpcy5ub3JtYWxpemVQYWdlQ29tcG9uZW50RGF0YShzb3VyY2UsIHRhcmdldCk7XG4gICAgdGhpcy5ub3JtYWxpemVDb21wb25lbnREYXRhKHNvdXJjZSwgdGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBPQ0MgY21zIHBhZ2UgbW9kZWwgdG8gdGhlIGBQYWdlYCBpbiB0aGUgYENtc1N0cnVjdHVyZU1vZGVsYC5cbiAgICovXG4gIHByb3RlY3RlZCBub3JtYWxpemVQYWdlRGF0YShcbiAgICBzb3VyY2U6IE9jYy5DTVNQYWdlLFxuICAgIHRhcmdldDogQ21zU3RydWN0dXJlTW9kZWxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGFnZTogUGFnZSA9IHt9O1xuXG4gICAgaWYgKHNvdXJjZS5uYW1lKSB7XG4gICAgICBwYWdlLm5hbWUgPSBzb3VyY2UubmFtZTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZS50eXBlQ29kZSkge1xuICAgICAgcGFnZS50eXBlID0gc291cmNlLnR5cGVDb2RlO1xuICAgIH1cbiAgICBpZiAoc291cmNlLmxhYmVsKSB7XG4gICAgICBwYWdlLmxhYmVsID0gc291cmNlLmxhYmVsO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnRlbXBsYXRlKSB7XG4gICAgICBwYWdlLnRlbXBsYXRlID0gc291cmNlLnRlbXBsYXRlO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnVpZCkge1xuICAgICAgcGFnZS5wYWdlSWQgPSBzb3VyY2UudWlkO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnRpdGxlKSB7XG4gICAgICBwYWdlLnRpdGxlID0gc291cmNlLnRpdGxlO1xuICAgIH1cbiAgICBpZiAoc291cmNlLmRlc2NyaXB0aW9uKSB7XG4gICAgICBwYWdlLmRlc2NyaXB0aW9uID0gc291cmNlLmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBpZiAoc291cmNlLnByb3BlcnRpZXMpIHtcbiAgICAgIHBhZ2UucHJvcGVydGllcyA9IHNvdXJjZS5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIHRoaXMubm9ybWFsaXplUm9ib3RzKHNvdXJjZSwgcGFnZSk7XG5cbiAgICB0YXJnZXQucGFnZSA9IHBhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIENvbnRlbnRTbG90RGF0YSBmb3IgZWFjaCBwYWdlIHNsb3QgaW4gdGhlIGBDbXNTdHJ1Y3R1cmVNb2RlbGAuXG4gICAqL1xuICBwcm90ZWN0ZWQgbm9ybWFsaXplUGFnZVNsb3REYXRhKFxuICAgIHNvdXJjZTogT2NjLkNNU1BhZ2UsXG4gICAgdGFyZ2V0OiBDbXNTdHJ1Y3R1cmVNb2RlbFxuICApOiB2b2lkIHtcbiAgICBpZiAoIXNvdXJjZT8uY29udGVudFNsb3RzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHNvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3QgJiZcbiAgICAgICFBcnJheS5pc0FycmF5KHNvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3QpXG4gICAgKSB7XG4gICAgICBzb3VyY2UuY29udGVudFNsb3RzLmNvbnRlbnRTbG90ID0gW3NvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3RdO1xuICAgIH1cbiAgICB0YXJnZXQucGFnZSA9IHRhcmdldC5wYWdlID8/IHt9O1xuICAgIHRhcmdldC5wYWdlLnNsb3RzID0ge307XG4gICAgZm9yIChjb25zdCBzbG90IG9mIHNvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3QgPz8gW10pIHtcbiAgICAgIGlmIChzbG90LnBvc2l0aW9uKSB7XG4gICAgICAgIHRhcmdldC5wYWdlLnNsb3RzW3Nsb3QucG9zaXRpb25dID0ge30gYXMgQ29udGVudFNsb3REYXRhO1xuICAgICAgICBpZiAoc2xvdC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgdGFyZ2V0LnBhZ2Uuc2xvdHNbc2xvdC5wb3NpdGlvbl0ucHJvcGVydGllcyA9IHNsb3QucHJvcGVydGllcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIGBDb250ZW50U2xvdENvbXBvbmVudERhdGFgIGZvciBlYWNoIGNvbXBvbmVudC5cbiAgICovXG4gIHByb3RlY3RlZCBub3JtYWxpemVQYWdlQ29tcG9uZW50RGF0YShcbiAgICBzb3VyY2U6IE9jYy5DTVNQYWdlLFxuICAgIHRhcmdldDogQ21zU3RydWN0dXJlTW9kZWxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFzb3VyY2U/LmNvbnRlbnRTbG90cz8uY29udGVudFNsb3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBzbG90IG9mIHNvdXJjZS5jb250ZW50U2xvdHMuY29udGVudFNsb3QpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNsb3QuY29tcG9uZW50cz8uY29tcG9uZW50KSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiBzbG90LmNvbXBvbmVudHM/LmNvbXBvbmVudCA/PyBbXSkge1xuICAgICAgICAgIGNvbnN0IGNvbXA6IENvbnRlbnRTbG90Q29tcG9uZW50RGF0YSA9IHtcbiAgICAgICAgICAgIHVpZDogY29tcG9uZW50LnVpZCxcbiAgICAgICAgICAgIHR5cGVDb2RlOiBjb21wb25lbnQudHlwZUNvZGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoY29tcG9uZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbXAucHJvcGVydGllcyA9IGNvbXBvbmVudC5wcm9wZXJ0aWVzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb21wb25lbnQudHlwZUNvZGUgPT09IENNU19GTEVYX0NPTVBPTkVOVF9UWVBFKSB7XG4gICAgICAgICAgICBjb21wLmZsZXhUeXBlID0gY29tcG9uZW50LmZsZXhUeXBlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50LnR5cGVDb2RlID09PSBKU1BfSU5DTFVERV9DTVNfQ09NUE9ORU5UX1RZUEUpIHtcbiAgICAgICAgICAgIGNvbXAuZmxleFR5cGUgPSBjb21wb25lbnQudWlkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wLmZsZXhUeXBlID0gY29tcG9uZW50LnR5cGVDb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2xvdC5wb3NpdGlvbikge1xuICAgICAgICAgICAgbGV0IHRhcmdldFNsb3QgPSB0YXJnZXQucGFnZT8uc2xvdHM/LltzbG90LnBvc2l0aW9uXTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRTbG90KSB7XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0U2xvdC5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xvdC5jb21wb25lbnRzID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFyZ2V0U2xvdC5jb21wb25lbnRzLnB1c2goY29tcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGFjdHVhbCBjb21wb25lbnQgZGF0YSB3aGVuZXZlciBhdmFpbGFibGUgaW4gdGhlIENNUyBwYWdlIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBwb3B1bGF0ZWQgaW4gdGhpcyBwYXlsb2FkLCBpdCBpcyBsb2FkZWQgc2VwYXJhdGVseVxuICAgKiAoYE9jY0Ntc0NvbXBvbmVudEFkYXB0ZXJgKS5cbiAgICovXG4gIHByb3RlY3RlZCBub3JtYWxpemVDb21wb25lbnREYXRhKFxuICAgIHNvdXJjZTogT2NjLkNNU1BhZ2UsXG4gICAgdGFyZ2V0OiBDbXNTdHJ1Y3R1cmVNb2RlbFxuICApOiB2b2lkIHtcbiAgICBpZiAoIXNvdXJjZT8uY29udGVudFNsb3RzPy5jb250ZW50U2xvdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2xvdCBvZiBzb3VyY2UuY29udGVudFNsb3RzLmNvbnRlbnRTbG90KSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzbG90LmNvbXBvbmVudHM/LmNvbXBvbmVudCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnQgb2Ygc2xvdC5jb21wb25lbnRzPy5jb21wb25lbnQgPz8gW10pIHtcbiAgICAgICAgICAvLyB3aGlsZSB3ZSdyZSBob3BpbmcgdG8gZ2V0IHRoaXMgcmlnaHQgZnJvbSB0aGUgYmFja2VuZCBhcGksXG4gICAgICAgICAgLy8gdGhlIE9DQyBhcGkgc3RpbGxzIHNlZW1zIG91dCBvZiBzeW5jIHdpdGggdGhlIHJpZ2h0IG1vZGVsLlxuICAgICAgICAgIGlmIChjb21wb25lbnQubW9kaWZpZWR0aW1lKSB7XG4gICAgICAgICAgICBjb21wb25lbnQubW9kaWZpZWRUaW1lID0gY29tcG9uZW50Lm1vZGlmaWVkdGltZTtcbiAgICAgICAgICAgIGRlbGV0ZSBjb21wb25lbnQubW9kaWZpZWR0aW1lO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHdlIGRvbid0IHB1dCBwcm9wZXJ0aWVzIGludG8gY29tcG9uZW50IHN0YXRlXG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBjb21wb25lbnQucHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0YXJnZXQuY29tcG9uZW50cykge1xuICAgICAgICAgICAgdGFyZ2V0LmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFyZ2V0LmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIHBhZ2Ugcm9ib3Qgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGBQYWdlUm9ib3RzTWV0YWAgaXRlbXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgbm9ybWFsaXplUm9ib3RzKHNvdXJjZTogT2NjLkNNU1BhZ2UsIHRhcmdldDogUGFnZSk6IHZvaWQge1xuICAgIGNvbnN0IHJvYm90cyA9IFtdO1xuICAgIGlmIChzb3VyY2Uucm9ib3RUYWcpIHtcbiAgICAgIHN3aXRjaCAoc291cmNlLnJvYm90VGFnKSB7XG4gICAgICAgIGNhc2UgT2NjLlBhZ2VSb2JvdHMuSU5ERVhfRk9MTE9XOlxuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLklOREVYKTtcbiAgICAgICAgICByb2JvdHMucHVzaChQYWdlUm9ib3RzTWV0YS5GT0xMT1cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE9jYy5QYWdlUm9ib3RzLk5PSU5ERVhfRk9MTE9XOlxuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLk5PSU5ERVgpO1xuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLkZPTExPVyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgT2NjLlBhZ2VSb2JvdHMuSU5ERVhfTk9GT0xMT1c6XG4gICAgICAgICAgcm9ib3RzLnB1c2goUGFnZVJvYm90c01ldGEuSU5ERVgpO1xuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLk5PRk9MTE9XKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBPY2MuUGFnZVJvYm90cy5OT0lOREVYX05PRk9MTE9XOlxuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLk5PSU5ERVgpO1xuICAgICAgICAgIHJvYm90cy5wdXNoKFBhZ2VSb2JvdHNNZXRhLk5PRk9MTE9XKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0YXJnZXQucm9ib3RzID0gcm9ib3RzO1xuICB9XG59XG4iXX0=