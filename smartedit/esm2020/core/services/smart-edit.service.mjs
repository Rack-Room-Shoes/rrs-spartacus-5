/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/smartedit/root";
export class SmartEditService {
    constructor(cmsService, routingService, baseSiteService, zone, winRef, rendererFactory, config, scriptLoader) {
        this.cmsService = cmsService;
        this.routingService = routingService;
        this.baseSiteService = baseSiteService;
        this.zone = zone;
        this.winRef = winRef;
        this.rendererFactory = rendererFactory;
        this.config = config;
        this.scriptLoader = scriptLoader;
        this.isPreviewPage = false;
        // load webApplicationInjector.js first
        this.loadScript();
        if (winRef.nativeWindow) {
            const window = winRef.nativeWindow;
            // rerender components and slots after editing
            window.smartedit = window.smartedit || {};
            window.smartedit.renderComponent = (componentId, componentType, parentId) => {
                return this.renderComponent(componentId, componentType, parentId);
            };
            // reprocess page
            window.smartedit.reprocessPage = this.reprocessPage;
        }
    }
    processCmsPage() {
        this.baseSiteService
            .get()
            .pipe(filter((site) => Boolean(site)), take(1))
            .subscribe((site) => {
            this.defaultPreviewCategoryCode = site.defaultPreviewCategoryCode;
            this.defaultPreviewProductCode = site.defaultPreviewProductCode;
            this.cmsService
                .getCurrentPage()
                .pipe(filter(Boolean))
                .subscribe((cmsPage) => {
                this._currentPageId = cmsPage.pageId;
                // before adding contract to page, we need redirect to that page
                this.goToPreviewPage(cmsPage);
                this.addPageContract(cmsPage);
            });
        });
    }
    /**
     * load webApplicationInjector.js
     */
    loadScript() {
        this.scriptLoader.embedScript({
            src: 'assets/webApplicationInjector.js',
            params: undefined,
            attributes: {
                id: 'text/smartedit-injector',
                'data-smartedit-allow-origin': this.config.smartEdit?.allowOrigin,
            },
        });
    }
    /**
     * add CSS classes in a body tag
     */
    addPageContract(cmsPage) {
        const renderer = this.rendererFactory.createRenderer('body', null);
        const element = this.winRef.document.body;
        // remove old page contract
        const previousContract = [];
        Array.from(element.classList).forEach((attr) => previousContract.push(attr));
        previousContract.forEach((attr) => renderer.removeClass(element, attr));
        // add new page contract
        this.addSmartEditContract(element, renderer, cmsPage.properties);
    }
    /**
     * go to the default preview page
     */
    goToPreviewPage(cmsPage) {
        // only the first page is the smartedit preview page
        if (!this.isPreviewPage) {
            this.isPreviewPage = true;
            if (cmsPage.type === PageType.PRODUCT_PAGE &&
                this.defaultPreviewProductCode) {
                this.routingService.go({
                    cxRoute: 'product',
                    params: { code: this.defaultPreviewProductCode, name: '' },
                });
            }
            else if (cmsPage.type === PageType.CATEGORY_PAGE &&
                this.defaultPreviewCategoryCode) {
                this.routingService.go({
                    cxRoute: 'category',
                    params: { code: this.defaultPreviewCategoryCode },
                });
            }
        }
    }
    /**
     * re-render CMS components and slots
     */
    renderComponent(componentId, componentType, parentId) {
        if (componentId) {
            this.zone.run(() => {
                // without parentId, it is slot
                if (!parentId) {
                    if (this._currentPageId) {
                        this.cmsService.refreshPageById(this._currentPageId);
                    }
                    else {
                        this.cmsService.refreshLatestPage();
                    }
                }
                else if (componentType) {
                    this.cmsService.refreshComponent(componentId);
                }
            });
        }
        return true;
    }
    reprocessPage() {
        // TODO: reprocess page API
    }
    /**
     * add smartedit HTML markup contract
     */
    addSmartEditContract(element, renderer, properties) {
        if (properties) {
            // check each group of properties, e.g. smartedit
            Object.keys(properties).forEach((group) => {
                const name = 'data-' + group + '-';
                const groupProps = properties[group];
                // check each property in the group
                Object.keys(groupProps).forEach((propName) => {
                    const propValue = groupProps[propName];
                    if (propName === 'classes') {
                        const classes = propValue.split(' ');
                        classes.forEach((classItem) => {
                            renderer.addClass(element, classItem);
                        });
                    }
                    else {
                        renderer.setAttribute(element, name +
                            propName
                                .split(/(?=[A-Z])/)
                                .join('-')
                                .toLowerCase(), propValue);
                    }
                });
            });
        }
    }
}
SmartEditService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditService, deps: [{ token: i1.CmsService }, { token: i1.RoutingService }, { token: i1.BaseSiteService }, { token: i0.NgZone }, { token: i1.WindowRef }, { token: i0.RendererFactory2 }, { token: i2.SmartEditConfig }, { token: i1.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SmartEditService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.RoutingService }, { type: i1.BaseSiteService }, { type: i0.NgZone }, { type: i1.WindowRef }, { type: i0.RendererFactory2 }, { type: i2.SmartEditConfig }, { type: i1.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3NtYXJ0ZWRpdC9jb3JlL3NlcnZpY2VzL3NtYXJ0LWVkaXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUlMLFFBQVEsR0FJVCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLOUMsTUFBTSxPQUFPLGdCQUFnQjtJQU8zQixZQUNZLFVBQXNCLEVBQ3RCLGNBQThCLEVBQzlCLGVBQWdDLEVBQ2hDLElBQVksRUFDWixNQUFpQixFQUNqQixlQUFpQyxFQUNqQyxNQUF1QixFQUN2QixZQUEwQjtRQVAxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBZDlCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBZ0I1Qix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBbUIsQ0FBQztZQUMxQyw4Q0FBOEM7WUFDOUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUMxQyxNQUFNLENBQUMsU0FBUyxDQUFD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KlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFzZVNpdGVTZXJ2aWNlLFxuICBDbXNTZXJ2aWNlLFxuICBQYWdlLFxuICBQYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG4gIFNjcmlwdExvYWRlcixcbiAgV2luZG93UmVmLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU21hcnRFZGl0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9zbWFydGVkaXQvcm9vdCc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTbWFydEVkaXRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBpc1ByZXZpZXdQYWdlID0gZmFsc2U7XG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIGRlZmF1bHRQcmV2aWV3UHJvZHVjdENvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBkZWZhdWx0UHJldmlld0NhdGVnb3J5Q29kZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU21hcnRFZGl0Q29uZmlnLFxuICAgIHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlclxuICApIHtcbiAgICAvLyBsb2FkIHdlYkFwcGxpY2F0aW9uSW5qZWN0b3IuanMgZmlyc3RcbiAgICB0aGlzLmxvYWRTY3JpcHQoKTtcblxuICAgIGlmICh3aW5SZWYubmF0aXZlV2luZG93KSB7XG4gICAgICBjb25zdCB3aW5kb3cgPSB3aW5SZWYubmF0aXZlV2luZG93IGFzIGFueTtcbiAgICAgIC8vIHJlcmVuZGVyIGNvbXBvbmVudHMgYW5kIHNsb3RzIGFmdGVyIGVkaXRpbmdcbiAgICAgIHdpbmRvdy5zbWFydGVkaXQgPSB3aW5kb3cuc21hcnRlZGl0IHx8IHt9O1xuICAgICAgd2luZG93LnNtYXJ0ZWRpdC5yZW5kZXJDb21wb25lbnQgPSAoXG4gICAgICAgIGNvbXBvbmVudElkOiBzdHJpbmcsXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IHN0cmluZyxcbiAgICAgICAgcGFyZW50SWQ6IHN0cmluZ1xuICAgICAgKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckNvbXBvbmVudChjb21wb25lbnRJZCwgY29tcG9uZW50VHlwZSwgcGFyZW50SWQpO1xuICAgICAgfTtcblxuICAgICAgLy8gcmVwcm9jZXNzIHBhZ2VcbiAgICAgIHdpbmRvdy5zbWFydGVkaXQucmVwcm9jZXNzUGFnZSA9IHRoaXMucmVwcm9jZXNzUGFnZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJvY2Vzc0Ntc1BhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5iYXNlU2l0ZVNlcnZpY2VcbiAgICAgIC5nZXQoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoc2l0ZTogYW55KSA9PiBCb29sZWFuKHNpdGUpKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoc2l0ZSkgPT4ge1xuICAgICAgICB0aGlzLmRlZmF1bHRQcmV2aWV3Q2F0ZWdvcnlDb2RlID0gc2l0ZS5kZWZhdWx0UHJldmlld0NhdGVnb3J5Q29kZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmlld1Byb2R1Y3RDb2RlID0gc2l0ZS5kZWZhdWx0UHJldmlld1Byb2R1Y3RDb2RlO1xuXG4gICAgICAgIHRoaXMuY21zU2VydmljZVxuICAgICAgICAgIC5nZXRDdXJyZW50UGFnZSgpXG4gICAgICAgICAgLnBpcGUoZmlsdGVyPFBhZ2U+KEJvb2xlYW4pKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNtc1BhZ2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlSWQgPSBjbXNQYWdlLnBhZ2VJZDtcbiAgICAgICAgICAgIC8vIGJlZm9yZSBhZGRpbmcgY29udHJhY3QgdG8gcGFnZSwgd2UgbmVlZCByZWRpcmVjdCB0byB0aGF0IHBhZ2VcbiAgICAgICAgICAgIHRoaXMuZ29Ub1ByZXZpZXdQYWdlKGNtc1BhZ2UpO1xuICAgICAgICAgICAgdGhpcy5hZGRQYWdlQ29udHJhY3QoY21zUGFnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsb2FkIHdlYkFwcGxpY2F0aW9uSW5qZWN0b3IuanNcbiAgICovXG4gIHByb3RlY3RlZCBsb2FkU2NyaXB0KCk6IHZvaWQge1xuICAgIHRoaXMuc2NyaXB0TG9hZGVyLmVtYmVkU2NyaXB0KHtcbiAgICAgIHNyYzogJ2Fzc2V0cy93ZWJBcHBsaWNhdGlvbkluamVjdG9yLmpzJyxcbiAgICAgIHBhcmFtczogdW5kZWZpbmVkLFxuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBpZDogJ3RleHQvc21hcnRlZGl0LWluamVjdG9yJyxcbiAgICAgICAgJ2RhdGEtc21hcnRlZGl0LWFsbG93LW9yaWdpbic6IHRoaXMuY29uZmlnLnNtYXJ0RWRpdD8uYWxsb3dPcmlnaW4sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBDU1MgY2xhc3NlcyBpbiBhIGJvZHkgdGFnXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkUGFnZUNvbnRyYWN0KGNtc1BhZ2U6IFBhZ2UpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKCdib2R5JywgbnVsbCk7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMud2luUmVmLmRvY3VtZW50LmJvZHk7XG5cbiAgICAvLyByZW1vdmUgb2xkIHBhZ2UgY29udHJhY3RcbiAgICBjb25zdCBwcmV2aW91c0NvbnRyYWN0OiBzdHJpbmdbXSA9IFtdO1xuICAgIEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLmZvckVhY2goKGF0dHIpID0+XG4gICAgICBwcmV2aW91c0NvbnRyYWN0LnB1c2goYXR0cilcbiAgICApO1xuICAgIHByZXZpb3VzQ29udHJhY3QuZm9yRWFjaCgoYXR0cikgPT4gcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWxlbWVudCwgYXR0cikpO1xuXG4gICAgLy8gYWRkIG5ldyBwYWdlIGNvbnRyYWN0XG4gICAgdGhpcy5hZGRTbWFydEVkaXRDb250cmFjdChlbGVtZW50LCByZW5kZXJlciwgY21zUGFnZS5wcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnbyB0byB0aGUgZGVmYXVsdCBwcmV2aWV3IHBhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBnb1RvUHJldmlld1BhZ2UoY21zUGFnZTogUGFnZSkge1xuICAgIC8vIG9ubHkgdGhlIGZpcnN0IHBhZ2UgaXMgdGhlIHNtYXJ0ZWRpdCBwcmV2aWV3IHBhZ2VcbiAgICBpZiAoIXRoaXMuaXNQcmV2aWV3UGFnZSkge1xuICAgICAgdGhpcy5pc1ByZXZpZXdQYWdlID0gdHJ1ZTtcbiAgICAgIGlmIChcbiAgICAgICAgY21zUGFnZS50eXBlID09PSBQYWdlVHlwZS5QUk9EVUNUX1BBR0UgJiZcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmlld1Byb2R1Y3RDb2RlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7XG4gICAgICAgICAgY3hSb3V0ZTogJ3Byb2R1Y3QnLFxuICAgICAgICAgIHBhcmFtczogeyBjb2RlOiB0aGlzLmRlZmF1bHRQcmV2aWV3UHJvZHVjdENvZGUsIG5hbWU6ICcnIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgY21zUGFnZS50eXBlID09PSBQYWdlVHlwZS5DQVRFR09SWV9QQUdFICYmXG4gICAgICAgIHRoaXMuZGVmYXVsdFByZXZpZXdDYXRlZ29yeUNvZGVcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgICBjeFJvdXRlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgIHBhcmFtczogeyBjb2RlOiB0aGlzLmRlZmF1bHRQcmV2aWV3Q2F0ZWdvcnlDb2RlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZS1yZW5kZXIgQ01TIGNvbXBvbmVudHMgYW5kIHNsb3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVuZGVyQ29tcG9uZW50KFxuICAgIGNvbXBvbmVudElkOiBzdHJpbmcsXG4gICAgY29tcG9uZW50VHlwZT86IHN0cmluZyxcbiAgICBwYXJlbnRJZD86IHN0cmluZ1xuICApOiBib29sZWFuIHtcbiAgICBpZiAoY29tcG9uZW50SWQpIHtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAvLyB3aXRob3V0IHBhcmVudElkLCBpdCBpcyBzbG90XG4gICAgICAgIGlmICghcGFyZW50SWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFBhZ2VJZCkge1xuICAgICAgICAgICAgdGhpcy5jbXNTZXJ2aWNlLnJlZnJlc2hQYWdlQnlJZCh0aGlzLl9jdXJyZW50UGFnZUlkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbXNTZXJ2aWNlLnJlZnJlc2hMYXRlc3RQYWdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICB0aGlzLmNtc1NlcnZpY2UucmVmcmVzaENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcHJvY2Vzc1BhZ2UoKSB7XG4gICAgLy8gVE9ETzogcmVwcm9jZXNzIHBhZ2UgQVBJXG4gIH1cblxuICAvKipcbiAgICogYWRkIHNtYXJ0ZWRpdCBIVE1MIG1hcmt1cCBjb250cmFjdFxuICAgKi9cbiAgcHVibGljIGFkZFNtYXJ0RWRpdENvbnRyYWN0KFxuICAgIGVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm9wZXJ0aWVzOiBhbnlcbiAgKTogdm9pZCB7XG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgIC8vIGNoZWNrIGVhY2ggZ3JvdXAgb2YgcHJvcGVydGllcywgZS5nLiBzbWFydGVkaXRcbiAgICAgIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAnZGF0YS0nICsgZ3JvdXAgKyAnLSc7XG4gICAgICAgIGNvbnN0IGdyb3VwUHJvcHMgPSBwcm9wZXJ0aWVzW2dyb3VwXTtcblxuICAgICAgICAvLyBjaGVjayBlYWNoIHByb3BlcnR5IGluIHRoZSBncm91cFxuICAgICAgICBPYmplY3Qua2V5cyhncm91cFByb3BzKS5mb3JFYWNoKChwcm9wTmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IGdyb3VwUHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2NsYXNzZXMnKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gcHJvcFZhbHVlLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goKGNsYXNzSXRlbTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQsIGNsYXNzSXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICBuYW1lICtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZVxuICAgICAgICAgICAgICAgICAgLnNwbGl0KC8oPz1bQS1aXSkvKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJy0nKVxuICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgIHByb3BWYWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=