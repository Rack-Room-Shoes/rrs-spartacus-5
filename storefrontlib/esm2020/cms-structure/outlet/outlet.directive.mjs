/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFactory, Directive, EventEmitter, Injector, Input, Output, TemplateRef, } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { OutletContextData, OutletPosition, USE_STACKED_OUTLETS, } from './outlet.model';
import * as i0 from "@angular/core";
import * as i1 from "./outlet.service";
import * as i2 from "../../layout/loading/defer-loader.service";
import * as i3 from "./outlet-renderer.service";
export class OutletDirective {
    constructor(vcr, templateRef, outletService, deferLoaderService, outletRendererService) {
        this.vcr = vcr;
        this.templateRef = templateRef;
        this.outletService = outletService;
        this.deferLoaderService = deferLoaderService;
        this.outletRendererService = outletRendererService;
        this.renderedTemplate = [];
        this.renderedComponents = new Map();
        /**
         * Observable with current outlet context
         */
        this.outletContext$ = new ReplaySubject(1);
        this.loaded = new EventEmitter(true);
        this.subscription = new Subscription();
    }
    /**
     * Renders view for outlet or defers it, depending on the input `cxOutletDefer`
     */
    render() {
        this.vcr.clear();
        this.renderedTemplate = [];
        this.renderedComponents.clear();
        this.subscription.unsubscribe();
        this.subscription = new Subscription();
        if (this.cxOutletDefer) {
            this.deferLoading();
        }
        else {
            this.build();
        }
    }
    ngOnChanges(changes) {
        if (changes.cxOutlet) {
            this.render();
            this.outletRendererService.register(this.cxOutlet, this);
        }
        if (changes.cxOutletContext) {
            this.outletContext$.next(this.cxOutletContext);
        }
    }
    deferLoading() {
        this.loaded.emit(false);
        const hostElement = this.getHostElement(this.vcr.element.nativeElement);
        // Although the deferLoaderService might emit only once, as long as the hostElement
        // isn't being loaded, there's no value being emitted. Therefore we need to clean up
        // the subscription on destroy.
        this.subscription.add(this.deferLoaderService
            .load(hostElement, this.cxOutletDefer)
            .subscribe(() => {
            this.build();
            this.loaded.emit(true);
        }));
    }
    /**
     * Renders view for outlet
     */
    build() {
        this.buildOutlet(OutletPosition.BEFORE);
        this.buildOutlet(OutletPosition.REPLACE);
        this.buildOutlet(OutletPosition.AFTER);
    }
    /**
     * Renders view in a given position for outlet
     */
    buildOutlet(position) {
        let templates = (this.outletService.get(this.cxOutlet, position, USE_STACKED_OUTLETS));
        templates = templates?.filter((el) => !this.renderedTemplate.includes(el));
        if (!templates && position === OutletPosition.REPLACE) {
            templates = [this.templateRef];
        }
        // Just in case someone extended the `OutletService` and
        // returns a singular object.
        if (!Array.isArray(templates)) {
            templates = [templates];
        }
        const components = [];
        templates.forEach((obj) => {
            const component = this.create(obj, position);
            if (component) {
                components.push(component);
            }
        });
        this.renderedComponents.set(position, components);
    }
    /**
     * Renders view based on the given template or component factory
     */
    create(tmplOrFactory, position) {
        this.renderedTemplate.push(tmplOrFactory);
        if (tmplOrFactory instanceof ComponentFactory) {
            const component = this.vcr.createComponent(tmplOrFactory, undefined, this.getComponentInjector(position));
            return component;
        }
        else if (tmplOrFactory instanceof TemplateRef) {
            const view = this.vcr.createEmbeddedView(tmplOrFactory, {
                $implicit: this.cxOutletContext,
            });
            // we do not know if content is created dynamically or not
            // so we apply change detection anyway
            view.markForCheck();
            return view;
        }
    }
    /**
     * Returns injector with OutletContextData that can be injected to the component
     * rendered in the outlet
     */
    getComponentInjector(position) {
        const contextData = {
            reference: this.cxOutlet,
            position,
            context: this.cxOutletContext,
            context$: this.outletContext$.asObservable(),
        };
        return Injector.create({
            providers: [
                {
                    provide: OutletContextData,
                    useValue: contextData,
                },
            ],
            parent: this.vcr.injector,
        });
    }
    /**
     * Returns the closest `HtmlElement`, by iterating over the
     * parent nodes of the given element.
     *
     * We avoid traversing the parent _elements_, as this is blocking
     * ie11 implementations. One of the spare exclusions we make to not
     * supporting ie11.
     *
     * @param element
     */
    getHostElement(element) {
        if (element instanceof HTMLElement) {
            return element;
        }
        return this.getHostElement(element.parentNode);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.outletContext$.complete();
    }
}
OutletDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OutletDirective, deps: [{ token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i1.OutletService }, { token: i2.DeferLoaderService }, { token: i3.OutletRendererService }], target: i0.ɵɵFactoryTarget.Directive });
OutletDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: OutletDirective, selector: "[cxOutlet]", inputs: { cxOutlet: "cxOutlet", cxOutletContext: "cxOutletContext", cxOutletDefer: "cxOutletDefer" }, outputs: { loaded: "loaded" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOutlet]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i1.OutletService }, { type: i2.DeferLoaderService }, { type: i3.OutletRendererService }]; }, propDecorators: { cxOutlet: [{
                type: Input
            }], cxOutletContext: [{
                type: Input
            }], cxOutletDefer: [{
                type: Input
            }], loaded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9vdXRsZXQvb3V0bGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixTQUFTLEVBRVQsWUFBWSxFQUNaLFFBQVEsRUFDUixLQUFLLEVBR0wsTUFBTSxFQUVOLFdBQVcsR0FFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxtQkFBbUIsR0FDcEIsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFNeEIsTUFBTSxPQUFPLGVBQWU7SUE0QjFCLFlBQ1UsR0FBcUIsRUFDckIsV0FBNkIsRUFDN0IsYUFBNEIsRUFDNUIsa0JBQXNDLEVBQ3RDLHFCQUE0QztRQUo1QyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBaEM5QyxxQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFDOUIsdUJBQWtCLEdBQUcsSUFBSSxHQUFHLEVBR2hDLENBQUM7UUFTSjs7V0FFRztRQUNjLG1CQUFjLEdBQUcsSUFBSSxhQUFhLENBQUksQ0FBQyxDQUFDLENBQUM7UUFPaEQsV0FBTSxHQUEwQixJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUUxRSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFRL0IsQ0FBQztJQUVKOztPQUVHO0lBQ0ksTUFBTTtRQUNYLElBQUks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TSxDQUFDO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7YUFDRjtZQUNELE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLGNBQWMsQ0FBQyxPQUFhO1FBQ2xDLElBQUksT0FBTyxZQUFZLFdBQVcsRUFBRTtZQUNsQyxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBYyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7NEdBak1VLGVBQWU7Z0dBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUgzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2QjtrT0FRVSxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBVUcsYUFBYTtzQkFBckIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWZlckxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvbG9hZGluZy9kZWZlci1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcnNlY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vbGF5b3V0L2xvYWRpbmcvaW50ZXJzZWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IE91dGxldFJlbmRlcmVyU2VydmljZSB9IGZyb20gJy4vb3V0bGV0LXJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgT3V0bGV0Q29udGV4dERhdGEsXG4gIE91dGxldFBvc2l0aW9uLFxuICBVU0VfU1RBQ0tFRF9PVVRMRVRTLFxufSBmcm9tICcuL291dGxldC5tb2RlbCc7XG5pbXBvcnQgeyBPdXRsZXRTZXJ2aWNlIH0gZnJvbSAnLi9vdXRsZXQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjeE91dGxldF0nLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsZXREaXJlY3RpdmU8VCA9IGFueT4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgcmVuZGVyZWRUZW1wbGF0ZTogYW55W10gPSBbXTtcbiAgcHVibGljIHJlbmRlcmVkQ29tcG9uZW50cyA9IG5ldyBNYXA8XG4gICAgT3V0bGV0UG9zaXRpb24sXG4gICAgQXJyYXk8Q29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55Pj5cbiAgPigpO1xuXG4gIEBJbnB1dCgpIGN4T3V0bGV0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENvbnRleHQgZGF0YSB0byBiZSBwcm92aWRlZCB0byBjaGlsZCB2aWV3IG9mIHRoZSBvdXRsZXRcbiAgICovXG4gIEBJbnB1dCgpIGN4T3V0bGV0Q29udGV4dDogVDtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSB3aXRoIGN1cnJlbnQgb3V0bGV0IGNvbnRleHRcbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgb3V0bGV0Q29udGV4dCQgPSBuZXcgUmVwbGF5U3ViamVjdDxUPigxKTtcblxuICAvKipcbiAgICogRGVmZXJzIGxvYWRpbmcgb3B0aW9ucyBmb3IgdGhlIHRoZSB0ZW1wbGF0ZXMgb2YgdGhpcyBvdXRsZXQuXG4gICAqL1xuICBASW5wdXQoKSBjeE91dGxldERlZmVyOiBJbnRlcnNlY3Rpb25PcHRpb25zO1xuXG4gIEBPdXRwdXQoKSBsb2FkZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJpdmF0ZSBvdXRsZXRTZXJ2aWNlOiBPdXRsZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGVmZXJMb2FkZXJTZXJ2aWNlOiBEZWZlckxvYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBvdXRsZXRSZW5kZXJlclNlcnZpY2U6IE91dGxldFJlbmRlcmVyU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBmb3Igb3V0bGV0IG9yIGRlZmVycyBpdCwgZGVwZW5kaW5nIG9uIHRoZSBpbnB1dCBgY3hPdXRsZXREZWZlcmBcbiAgICovXG4gIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy52Y3IuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlcmVkVGVtcGxhdGUgPSBbXTtcbiAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5jbGVhcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5jeE91dGxldERlZmVyKSB7XG4gICAgICB0aGlzLmRlZmVyTG9hZGluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmN4T3V0bGV0KSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5vdXRsZXRSZW5kZXJlclNlcnZpY2UucmVnaXN0ZXIodGhpcy5jeE91dGxldCwgdGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmN4T3V0bGV0Q29udGV4dCkge1xuICAgICAgdGhpcy5vdXRsZXRDb250ZXh0JC5uZXh0KHRoaXMuY3hPdXRsZXRDb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlZmVyTG9hZGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRlZC5lbWl0KGZhbHNlKTtcbiAgICBjb25zdCBob3N0RWxlbWVudCA9IHRoaXMuZ2V0SG9zdEVsZW1lbnQodGhpcy52Y3IuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAvLyBBbHRob3VnaCB0aGUgZGVmZXJMb2FkZXJTZXJ2aWNlIG1pZ2h0IGVtaXQgb25seSBvbmNlLCBhcyBsb25nIGFzIHRoZSBob3N0RWxlbWVudFxuICAgIC8vIGlzbid0IGJlaW5nIGxvYWRlZCwgdGhlcmUncyBubyB2YWx1ZSBiZWluZyBlbWl0dGVkLiBUaGVyZWZvcmUgd2UgbmVlZCB0byBjbGVhbiB1cFxuICAgIC8vIHRoZSBzdWJzY3JpcHRpb24gb24gZGVzdHJveS5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmRlZmVyTG9hZGVyU2VydmljZVxuICAgICAgICAubG9hZChob3N0RWxlbWVudCwgdGhpcy5jeE91dGxldERlZmVyKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmJ1aWxkKCk7XG4gICAgICAgICAgdGhpcy5sb2FkZWQuZW1pdCh0cnVlKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBmb3Igb3V0bGV0XG4gICAqL1xuICBwcml2YXRlIGJ1aWxkKCkge1xuICAgIHRoaXMuYnVpbGRPdXRsZXQoT3V0bGV0UG9zaXRpb24uQkVGT1JFKTtcbiAgICB0aGlzLmJ1aWxkT3V0bGV0KE91dGxldFBvc2l0aW9uLlJFUExBQ0UpO1xuICAgIHRoaXMuYnVpbGRPdXRsZXQoT3V0bGV0UG9zaXRpb24uQUZURVIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBpbiBhIGdpdmVuIHBvc2l0aW9uIGZvciBvdXRsZXRcbiAgICovXG4gIHByaXZhdGUgYnVpbGRPdXRsZXQocG9zaXRpb246IE91dGxldFBvc2l0aW9uKTogdm9pZCB7XG4gICAgbGV0IHRlbXBsYXRlczogYW55W10gPSA8YW55W10+KFxuICAgICAgdGhpcy5vdXRsZXRTZXJ2aWNlLmdldCh0aGlzLmN4T3V0bGV0LCBwb3NpdGlvbiwgVVNFX1NUQUNLRURfT1VUTEVUUylcbiAgICApO1xuXG4gICAgdGVtcGxhdGVzID0gdGVtcGxhdGVzPy5maWx0ZXIoKGVsKSA9PiAhdGhpcy5yZW5kZXJlZFRlbXBsYXRlLmluY2x1ZGVzKGVsKSk7XG5cbiAgICBpZiAoIXRlbXBsYXRlcyAmJiBwb3NpdGlvbiA9PT0gT3V0bGV0UG9zaXRpb24uUkVQTEFDRSkge1xuICAgICAgdGVtcGxhdGVzID0gW3RoaXMudGVtcGxhdGVSZWZdO1xuICAgIH1cblxuICAgIC8vIEp1c3QgaW4gY2FzZSBzb21lb25lIGV4dGVuZGVkIHRoZSBgT3V0bGV0U2VydmljZWAgYW5kXG4gICAgLy8gcmV0dXJucyBhIHNpbmd1bGFyIG9iamVjdC5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGVtcGxhdGVzKSkge1xuICAgICAgdGVtcGxhdGVzID0gW3RlbXBsYXRlc107XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50czogKENvbXBvbmVudFJlZjxhbnk+IHwgRW1iZWRkZWRWaWV3UmVmPGFueT4pW10gPSBbXTtcbiAgICB0ZW1wbGF0ZXMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNyZWF0ZShvYmosIHBvc2l0aW9uKTtcbiAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlbmRlcmVkQ29tcG9uZW50cy5zZXQocG9zaXRpb24sIGNvbXBvbmVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdmlldyBiYXNlZCBvbiB0aGUgZ2l2ZW4gdGVtcGxhdGUgb3IgY29tcG9uZW50IGZhY3RvcnlcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlKFxuICAgIHRtcGxPckZhY3Rvcnk6IGFueSxcbiAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb25cbiAgKTogQ29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55PiB8IHVuZGVmaW5lZCB7XG4gICAgdGhpcy5yZW5kZXJlZFRlbXBsYXRlLnB1c2godG1wbE9yRmFjdG9yeSk7XG5cbiAgICBpZiAodG1wbE9yRmFjdG9yeSBpbnN0YW5jZW9mIENvbXBvbmVudEZhY3RvcnkpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMudmNyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdG1wbE9yRmFjdG9yeSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudEluamVjdG9yKHBvc2l0aW9uKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfSBlbHNlIGlmICh0bXBsT3JGYWN0b3J5IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLnZjci5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgIDxUZW1wbGF0ZVJlZjxhbnk+PnRtcGxPckZhY3RvcnksXG4gICAgICAgIHtcbiAgICAgICAgICAkaW1wbGljaXQ6IHRoaXMuY3hPdXRsZXRDb250ZXh0LFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICAvLyB3ZSBkbyBub3Qga25vdyBpZiBjb250ZW50IGlzIGNyZWF0ZWQgZHluYW1pY2FsbHkgb3Igbm90XG4gICAgICAvLyBzbyB3ZSBhcHBseSBjaGFuZ2UgZGV0ZWN0aW9uIGFueXdheVxuICAgICAgdmlldy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGluamVjdG9yIHdpdGggT3V0bGV0Q29udGV4dERhdGEgdGhhdCBjYW4gYmUgaW5qZWN0ZWQgdG8gdGhlIGNvbXBvbmVudFxuICAgKiByZW5kZXJlZCBpbiB0aGUgb3V0bGV0XG4gICAqL1xuICBwcml2YXRlIGdldENvbXBvbmVudEluamVjdG9yKHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbik6IEluamVjdG9yIHtcbiAgICBjb25zdCBjb250ZXh0RGF0YTogT3V0bGV0Q29udGV4dERhdGE8VD4gPSB7XG4gICAgICByZWZlcmVuY2U6IHRoaXMuY3hPdXRsZXQsXG4gICAgICBwb3NpdGlvbixcbiAgICAgIGNvbnRleHQ6IHRoaXMuY3hPdXRsZXRDb250ZXh0LFxuICAgICAgY29udGV4dCQ6IHRoaXMub3V0bGV0Q29udGV4dCQuYXNPYnNlcnZhYmxlKCksXG4gICAgfTtcblxuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBPdXRsZXRDb250ZXh0RGF0YSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29udGV4dERhdGEsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgcGFyZW50OiB0aGlzLnZjci5pbmplY3RvcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjbG9zZXN0IGBIdG1sRWxlbWVudGAsIGJ5IGl0ZXJhdGluZyBvdmVyIHRoZVxuICAgKiBwYXJlbnQgbm9kZXMgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIFdlIGF2b2lkIHRyYXZlcnNpbmcgdGhlIHBhcmVudCBfZWxlbWVudHNfLCBhcyB0aGlzIGlzIGJsb2NraW5nXG4gICAqIGllMTEgaW1wbGVtZW50YXRpb25zLiBPbmUgb2YgdGhlIHNwYXJlIGV4Y2x1c2lvbnMgd2UgbWFrZSB0byBub3RcbiAgICogc3VwcG9ydGluZyBpZTExLlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRIb3N0RWxlbWVudChlbGVtZW50OiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRIb3N0RWxlbWVudCg8SFRNTEVsZW1lbnQ+ZWxlbWVudC5wYXJlbnROb2RlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5vdXRsZXRDb250ZXh0JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=