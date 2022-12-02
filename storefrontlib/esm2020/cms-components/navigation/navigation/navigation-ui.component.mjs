/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/index';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./../../../layout/header/hamburger-menu/hamburger-menu.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "../../misc/icon/icon.component";
import * as i6 from "../../../shared/components/generic-link/generic-link.component";
export class NavigationUIComponent {
    constructor(router, renderer, elemRef, hamburgerMenuService, winRef) {
        this.router = router;
        this.renderer = renderer;
        this.elemRef = elemRef;
        this.hamburgerMenuService = hamburgerMenuService;
        this.winRef = winRef;
        /**
         * the icon type that will be used for navigation nodes
         * with children.
         */
        this.iconType = ICON_TYPE;
        /**
         * Indicates whether the navigation should support flyout.
         * If flyout is set to true, the
         * nested child navigation nodes will only appear on hover or focus.
         */
        this.flyout = true;
        this.isOpen = false;
        this.openNodes = [];
        this.subscriptions = new Subscription();
        this.resize = new EventEmitter();
        this.subscriptions.add(this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.clear()));
        this.subscriptions.add(this.resize.pipe(debounceTime(50)).subscribe(() => {
            this.alignWrappersToRightIfStickOut();
        }));
    }
    onResize() {
        this.resize.next();
    }
    /**
     * During initialization of this component, we will check the resetMenuOnClose flag and attach a menu reset listener if needed.
     */
    ngOnInit() {
        if (this.resetMenuOnClose) {
            this.resetOnMenuCollapse();
        }
    }
    /**
     * This method performs the action of resetting the menu (close all sub menus and return to main options)
     * when the menu is closed.
     */
    resetOnMenuCollapse() {
        this.subscriptions.add(this.hamburgerMenuService?.isExpanded
            .pipe(distinctUntilChanged(), filter(Boolean))
            .subscribe(() => {
            this.reinitializeMenu();
        }));
    }
    closeIfClickedTheSameLink(navNode) {
        if (typeof navNode.url === 'string' &&
            this.winRef.nativeWindow?.location.href.includes(navNode.url)) {
            this.elemRef.nativeElement
                .querySelectorAll('li.is-open:not(.back), li.is-opened')
                .forEach((el) => {
                this.renderer.removeClass(el, 'is-open');
                this.renderer.removeClass(el, 'is-opened');
            });
            this.reinitializeMenu();
            this.hamburgerMenuService.toggle();
        }
    }
    /**
     * This method performs the actions required to reset the state of the menu and reset any visual components.
     */
    reinitializeMenu() {
        if (this.openNodes?.length > 0) {
            this.clear();
            this.renderer.removeClass(this.elemRef.nativeElement, 'is-open');
        }
    }
    ariaCollapseNodes() {
        this.openNodes.forEach((parentNode) => {
            Array.from(parentNode.children)
                .filter((childNode) => childNode?.tagName === 'BUTTON')
                .forEach((childNode) => {
                this.renderer.setAttribute(childNode, 'aria-expanded', 'false');
            });
        });
    }
    toggleOpen(event) {
        if (event.type === 'keydown') {
            event.preventDefault();
        }
        this.ariaCollapseNodes();
        const node = event.currentTarget;
        const parentNode = node.parentNode;
        if (this.openNodes.includes(parentNode)) {
            if (event.type === 'keydown') {
                this.back();
            }
            else {
                this.openNodes = this.openNodes.filter((n) => n !== parentNode);
                this.renderer.removeClass(parentNode, 'is-open');
            }
        }
        else {
            this.openNodes.push(parentNode);
            this.renderer.setAttribute(node, 'aria-expanded', 'true');
        }
        this.updateClasses();
        event.stopImmediatePropagation();
        event.stopPropagation();
    }
    back() {
        if (this.openNodes[this.openNodes.length - 1]) {
            this.renderer.removeClass(this.openNodes[this.openNodes.length - 1], 'is-open');
            this.openNodes.pop();
            this.updateClasses();
        }
    }
    clear() {
        this.openNodes = [];
        this.updateClasses();
    }
    onMouseEnter(event) {
        this.alignWrapperToRightIfStickOut(event.currentTarget);
        this.focusAfterPreviousClicked(event);
    }
    getTotalDepth(node, depth = 0) {
        if (node.children && node.children.length > 0) {
            return Math.max(...node.children.map((n) => this.getTotalDepth(n, depth + 1)));
        }
        else {
            return depth;
        }
    }
    getColumnCount(length) {
        return Math.round(length / (this.wrapAfter || length));
    }
    focusAfterPreviousClicked(event) {
        const target = ((event.target || event.relatedTarget));
        if (target.ownerDocument.activeElement?.matches('nav[tabindex]') &&
            target.parentElement?.matches('.flyout')) {
            target.focus();
        }
        return target.ownerDocument;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    alignWrapperToRightIfStickOut(node) {
        const wrapper = node.querySelector('.wrapper');
        const body = node.closest('body');
        if (wrapper) {
            this.renderer.removeStyle(wrapper, 'margin-left');
            if (wrapper.offsetLeft + wrapper.offsetWidth >
                body.offsetLeft + body.offsetWidth) {
                this.renderer.setStyle(wrapper, 'margin-left', `${node.offsetWidth - wrapper.offsetWidth}px`);
            }
        }
    }
    alignWrappersToRightIfStickOut() {
        const navs = this.elemRef.nativeElement.childNodes;
        Array.from(navs)
            .filter((node) => node.tagName === 'LI')
            .forEach((nav) => this.alignWrapperToRightIfStickOut(nav));
    }
    updateClasses() {
        this.openNodes.forEach((node, i) => {
            if (i + 1 < this.openNodes.length) {
                this.renderer.addClass(node, 'is-opened');
                this.renderer.removeClass(node, 'is-open');
            }
            else {
                this.renderer.removeClass(node, 'is-opened');
                this.renderer.addClass(node, 'is-open');
            }
        });
        this.isOpen = this.openNodes.length > 0;
    }
}
NavigationUIComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationUIComponent, deps: [{ token: i1.Router }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.HamburgerMenuService }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
NavigationUIComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: NavigationUIComponent, selector: "cx-navigation-ui", inputs: { node: "node", wrapAfter: "wrapAfter", resetMenuOnClose: "resetMenuOnClose", navAriaLabel: "navAriaLabel", flyout: "flyout", isOpen: "isOpen" }, host: { listeners: { "window:resize": "onResize()" }, properties: { "class.flyout": "this.flyout", "class.is-open": "this.isOpen" } }, ngImport: i0, template: "<nav [attr.aria-label]=\"navAriaLabel\">\n  <ul>\n    <li\n      *ngIf=\"flyout && (node?.children?.length ?? 0) > 1\"\n      class=\"back is-open\"\n    >\n      <button (click)=\"back()\">\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </li>\n\n    <ng-container *ngFor=\"let child of node?.children\">\n      <ng-container *ngTemplateOutlet=\"nav; context: { node: child, depth: 0 }\">\n      </ng-container>\n    </ng-container>\n  </ul>\n</nav>\n<!-- we generate links in a recursive manner -->\n\n<ng-template #nav let-node=\"node\" let-depth=\"depth\">\n  <li>\n    <cx-generic-link\n      *ngIf=\"\n        node.url && (!node.children || node.children?.length === 0);\n        else heading\n      \"\n      [url]=\"node.url\"\n      [target]=\"node.target\"\n      [style]=\"node.styleAttributes\"\n      [class]=\"node.styleClasses\"\n      (click)=\"closeIfClickedTheSameLink(node)\"\n    >\n      {{ node.title }}\n    </cx-generic-link>\n\n    <ng-template #heading>\n      <ng-container *ngIf=\"flyout && node.children?.length > 0; else title\">\n        <cx-generic-link\n          *ngIf=\"node.url\"\n          [url]=\"node.url\"\n          [target]=\"node.target\"\n          (click)=\"closeIfClickedTheSameLink(node)\"\n        >\n          {{ node.title }}\n        </cx-generic-link>\n        <button\n          [attr.tabindex]=\"depth < 1 ? 0 : -1\"\n          [attr.aria-haspopup]=\"true\"\n          [attr.aria-expanded]=\"false\"\n          [attr.aria-label]=\"node.title\"\n          (click)=\"toggleOpen($any($event))\"\n          (mouseenter)=\"onMouseEnter($event)\"\n          (keydown.space)=\"toggleOpen($any($event))\"\n          (keydown.esc)=\"back()\"\n        >\n          <ng-container *ngIf=\"!node.url\">\n            {{ node.title }}\n          </ng-container>\n          <cx-icon [type]=\"iconType.CARET_DOWN\"></cx-icon>\n        </button>\n      </ng-container>\n      <ng-template #title>\n        <span [attr.tabindex]=\"-1\">\n          {{ node.title }}\n        </span>\n      </ng-template>\n    </ng-template>\n\n    <!-- we add a wrapper to allow for better layout handling in CSS -->\n    <div class=\"wrapper\" *ngIf=\"node.children && node.children.length > 0\">\n      <ul\n        class=\"childs\"\n        [attr.depth]=\"getTotalDepth(node)\"\n        [attr.wrap-after]=\"node.children.length > wrapAfter ? wrapAfter : null\"\n        [attr.columns]=\"getColumnCount(node.children.length)\"\n      >\n        <ng-container *ngFor=\"let child of node.children\">\n          <ng-container\n            *ngTemplateOutlet=\"nav; context: { node: child, depth: depth + 1 }\"\n          >\n          </ng-container>\n        </ng-container>\n      </ul>\n    </div>\n  </li>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i6.GenericLinkComponent, selector: "cx-generic-link", inputs: ["url", "target", "id", "class", "style", "title"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationUIComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-navigation-ui', changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav [attr.aria-label]=\"navAriaLabel\">\n  <ul>\n    <li\n      *ngIf=\"flyout && (node?.children?.length ?? 0) > 1\"\n      class=\"back is-open\"\n    >\n      <button (click)=\"back()\">\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </li>\n\n    <ng-container *ngFor=\"let child of node?.children\">\n      <ng-container *ngTemplateOutlet=\"nav; context: { node: child, depth: 0 }\">\n      </ng-container>\n    </ng-container>\n  </ul>\n</nav>\n<!-- we generate links in a recursive manner -->\n\n<ng-template #nav let-node=\"node\" let-depth=\"depth\">\n  <li>\n    <cx-generic-link\n      *ngIf=\"\n        node.url && (!node.children || node.children?.length === 0);\n        else heading\n      \"\n      [url]=\"node.url\"\n      [target]=\"node.target\"\n      [style]=\"node.styleAttributes\"\n      [class]=\"node.styleClasses\"\n      (click)=\"closeIfClickedTheSameLink(node)\"\n    >\n      {{ node.title }}\n    </cx-generic-link>\n\n    <ng-template #heading>\n      <ng-container *ngIf=\"flyout && node.children?.length > 0; else title\">\n        <cx-generic-link\n          *ngIf=\"node.url\"\n          [url]=\"node.url\"\n          [target]=\"node.target\"\n          (click)=\"closeIfClickedTheSameLink(node)\"\n        >\n          {{ node.title }}\n        </cx-generic-link>\n        <button\n          [attr.tabindex]=\"depth < 1 ? 0 : -1\"\n          [attr.aria-haspopup]=\"true\"\n          [attr.aria-expanded]=\"false\"\n          [attr.aria-label]=\"node.title\"\n          (click)=\"toggleOpen($any($event))\"\n          (mouseenter)=\"onMouseEnter($event)\"\n          (keydown.space)=\"toggleOpen($any($event))\"\n          (keydown.esc)=\"back()\"\n        >\n          <ng-container *ngIf=\"!node.url\">\n            {{ node.title }}\n          </ng-container>\n          <cx-icon [type]=\"iconType.CARET_DOWN\"></cx-icon>\n        </button>\n      </ng-container>\n      <ng-template #title>\n        <span [attr.tabindex]=\"-1\">\n          {{ node.title }}\n        </span>\n      </ng-template>\n    </ng-template>\n\n    <!-- we add a wrapper to allow for better layout handling in CSS -->\n    <div class=\"wrapper\" *ngIf=\"node.children && node.children.length > 0\">\n      <ul\n        class=\"childs\"\n        [attr.depth]=\"getTotalDepth(node)\"\n        [attr.wrap-after]=\"node.children.length > wrapAfter ? wrapAfter : null\"\n        [attr.columns]=\"getColumnCount(node.children.length)\"\n      >\n        <ng-container *ngFor=\"let child of node.children\">\n          <ng-container\n            *ngTemplateOutlet=\"nav; context: { node: child, depth: depth + 1 }\"\n          >\n          </ng-container>\n        </ng-container>\n      </ul>\n    </div>\n  </li>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.HamburgerMenuService }, { type: i3.WindowRef }]; }, propDecorators: { node: [{
                type: Input
            }], wrapAfter: [{
                type: Input
            }], resetMenuOnClose: [{
                type: Input
            }], navAriaLabel: [{
                type: Input
            }], flyout: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.flyout']
            }], isOpen: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.is-open']
            }], onResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi11aS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXVpLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uL25hdmlnYXRpb24tdWkuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFTbEQsTUFBTSxPQUFPLHFCQUFxQjtJQXlDaEMsWUFDVSxNQUFjLEVBQ2QsUUFBbUIsRUFDbkIsT0FBbUIsRUFDakIsb0JBQTBDLEVBQzFDLE1BQWlCO1FBSm5CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBN0I3Qjs7O1dBR0c7UUFDSCxhQUFRLEdBQUcsU0FBUyxDQUFDO1FBRXJCOzs7O1dBSUc7UUFD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O3lNQU10QyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFZZ0MsTUFBTTtzQkFBM0MsS0FBSzs7c0JBQUksV0FBVzt1QkFBQyxjQUFjO2dCQUVHLE1BQU07c0JBQTVDLEtBQUs7O3NCQUFJLFdBQVc7dUJBQUMsZUFBZTtnQkFPckMsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi9taXNjL2ljb24vaW5kZXgnO1xuaW1wb3J0IHsgSGFtYnVyZ2VyTWVudVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uL2xheW91dC9oZWFkZXIvaGFtYnVyZ2VyLW1lbnUvaGFtYnVyZ2VyLW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uTm9kZSB9IGZyb20gJy4vbmF2aWdhdGlvbi1ub2RlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtbmF2aWdhdGlvbi11aScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLXVpLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25VSUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBuYXZpZ2F0aW9uIG5vZGUgdG8gcmVuZGVyLlxuICAgKi9cbiAgQElucHV0KCkgbm9kZTogTmF2aWdhdGlvbk5vZGUgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGNoaWxkIG5vZGVzIHRoYXQgbXVzdCBiZSB3cmFwcGVkLlxuICAgKi9cbiAgQElucHV0KCkgd3JhcEFmdGVyOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEZsYWcgaW5kaWNhdGVzIHdoZXRoZXIgdG8gcmVzZXQgdGhlIHN0YXRlIG9mIG1lbnUgbmF2aWdhdGlvbiAoaWUuIENvbGxhcHNlIGFsbCBzdWJtZW51cykgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWQuXG4gICAqL1xuICBASW5wdXQoKSByZXNldE1lbnVPbkNsb3NlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIG5hdkFyaWFMYWJlbDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIHRoZSBpY29uIHR5cGUgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIG5hdmlnYXRpb24gbm9kZXNcbiAgICogd2l0aCBjaGlsZHJlbi5cbiAgICovXG4gIGljb25UeXBlID0gSUNPTl9UWVBFO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgbmF2aWdhdGlvbiBzaG91bGQgc3VwcG9ydCBmbHlvdXQuXG4gICAqIElmIGZseW91dCBpcyBzZXQgdG8gdHJ1ZSwgdGhlXG4gICAqIG5lc3RlZCBjaGlsZCBuYXZpZ2F0aW9uIG5vZGVzIHdpbGwgb25seSBhcHBlYXIgb24gaG92ZXIgb3IgZm9jdXMuXG4gICAqL1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmZseW91dCcpIGZseW91dCA9IHRydWU7XG5cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy5pcy1vcGVuJykgaXNPcGVuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvcGVuTm9kZXM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIHJlc2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5yZXNpemUubmV4dCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBoYW1idXJnZXJNZW51U2VydmljZTogSGFtYnVyZ2VyTWVudVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmXG4gICkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsZWFyKCkpXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5yZXNpemUucGlwZShkZWJvdW5jZVRpbWUoNTApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFsaWduV3JhcHBlcnNUb1JpZ2h0SWZTdGlja091dCgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIER1cmluZyBpbml0aWFsaXphdGlvbiBvZiB0aGlzIGNvbXBvbmVudCwgd2Ugd2lsbCBjaGVjayB0aGUgcmVzZXRNZW51T25DbG9zZSBmbGFnIGFuZCBhdHRhY2ggYSBtZW51IHJlc2V0IGxpc3RlbmVyIGlmIG5lZWRlZC5cbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnJlc2V0TWVudU9uQ2xvc2UpIHtcbiAgICAgIHRoaXMucmVzZXRPbk1lbnVDb2xsYXBzZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBwZXJmb3JtcyB0aGUgYWN0aW9uIG9mIHJlc2V0dGluZyB0aGUgbWVudSAoY2xvc2UgYWxsIHN1YiBtZW51cyBhbmQgcmV0dXJuIHRvIG1haW4gb3B0aW9ucylcbiAgICogd2hlbiB0aGUgbWVudSBpcyBjbG9zZWQuXG4gICAqL1xuICByZXNldE9uTWVudUNvbGxhcHNlKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmhhbWJ1cmdlck1lbnVTZXJ2aWNlPy5pc0V4cGFuZGVkXG4gICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIGZpbHRlcihCb29sZWFuKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWluaXRpYWxpemVNZW51KCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlSWZDbGlja2VkVGhlU2FtZUxpbmsobmF2Tm9kZTogTmF2aWdhdGlvbk5vZGUpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgbmF2Tm9kZS51cmwgPT09ICdzdHJpbmcnICYmXG4gICAgICB0aGlzLndpblJlZi5uYXRpdmVXaW5kb3c/LmxvY2F0aW9uLmhyZWYuaW5jbHVkZXMobmF2Tm9kZS51cmwpXG4gICAgKSB7XG4gICAgICB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnbGkuaXMtb3Blbjpub3QoLmJhY2spLCBsaS5pcy1vcGVuZWQnKVxuICAgICAgICAuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWwsICdpcy1vcGVuJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbCwgJ2lzLW9wZW5lZCcpO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMucmVpbml0aWFsaXplTWVudSgpO1xuICAgICAgdGhpcy5oYW1idXJnZXJNZW51U2VydmljZS50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcGVyZm9ybXMgdGhlIGFjdGlvbnMgcmVxdWlyZWQgdG8gcmVzZXQgdGhlIHN0YXRlIG9mIHRoZSBtZW51IGFuZCByZXNldCBhbnkgdmlzdWFsIGNvbXBvbmVudHMuXG4gICAqL1xuICByZWluaXRpYWxpemVNZW51KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW5Ob2Rlcz8ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCwgJ2lzLW9wZW4nKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXJpYUNvbGxhcHNlTm9kZXMoKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuTm9kZXMuZm9yRWFjaCgocGFyZW50Tm9kZSkgPT4ge1xuICAgICAgQXJyYXkuZnJvbShwYXJlbnROb2RlLmNoaWxkcmVuKVxuICAgICAgICAuZmlsdGVyKChjaGlsZE5vZGUpID0+IGNoaWxkTm9kZT8udGFnTmFtZSA9PT0gJ0JVVFRPTicpXG4gICAgICAgIC5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShjaGlsZE5vZGUsICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlT3BlbihldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMuYXJpYUNvbGxhcHNlTm9kZXMoKTtcbiAgICBjb25zdCBub2RlID0gPEhUTUxFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IDxIVE1MRWxlbWVudD5ub2RlLnBhcmVudE5vZGU7XG4gICAgaWYgKHRoaXMub3Blbk5vZGVzLmluY2x1ZGVzKHBhcmVudE5vZGUpKSB7XG4gICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuTm9kZXMgPSB0aGlzLm9wZW5Ob2Rlcy5maWx0ZXIoKG4pID0+IG4gIT09IHBhcmVudE5vZGUpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHBhcmVudE5vZGUsICdpcy1vcGVuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3Blbk5vZGVzLnB1c2gocGFyZW50Tm9kZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShub2RlLCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG5cbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3Blbk5vZGVzW3RoaXMub3Blbk5vZGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgICB0aGlzLm9wZW5Ob2Rlc1t0aGlzLm9wZW5Ob2Rlcy5sZW5ndGggLSAxXSxcbiAgICAgICAgJ2lzLW9wZW4nXG4gICAgICApO1xuICAgICAgdGhpcy5vcGVuTm9kZXMucG9wKCk7XG4gICAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5Ob2RlcyA9IFtdO1xuICAgIHRoaXMudXBkYXRlQ2xhc3NlcygpO1xuICB9XG5cbiAgb25Nb3VzZUVudGVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5hbGlnbldyYXBwZXJUb1JpZ2h0SWZTdGlja091dCg8SFRNTEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgdGhpcy5mb2N1c0FmdGVyUHJldmlvdXNDbGlja2VkKGV2ZW50KTtcbiAgfVxuXG4gIGdldFRvdGFsRGVwdGgobm9kZTogTmF2aWdhdGlvbk5vZGUsIGRlcHRoID0gMCk6IG51bWJlciB7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgIC4uLm5vZGUuY2hpbGRyZW4ubWFwKChuKSA9PiB0aGlzLmdldFRvdGFsRGVwdGgobiwgZGVwdGggKyAxKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkZXB0aDtcbiAgICB9XG4gIH1cblxuICBnZXRDb2x1bW5Db3VudChsZW5ndGg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobGVuZ3RoIC8gKHRoaXMud3JhcEFmdGVyIHx8IGxlbmd0aCkpO1xuICB9XG5cbiAgZm9jdXNBZnRlclByZXZpb3VzQ2xpY2tlZChldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+KFxuICAgICAgKGV2ZW50LnRhcmdldCB8fCBldmVudC5yZWxhdGVkVGFyZ2V0KVxuICAgICk7XG4gICAgaWYgKFxuICAgICAgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudD8ubWF0Y2hlcygnbmF2W3RhYmluZGV4XScpICYmXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudD8ubWF0Y2hlcygnLmZseW91dCcpXG4gICAgKSB7XG4gICAgICB0YXJnZXQuZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldC5vd25lckRvY3VtZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhbGlnbldyYXBwZXJUb1JpZ2h0SWZTdGlja091dChub2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSA8SFRNTEVsZW1lbnQ+bm9kZS5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xuICAgIGNvbnN0IGJvZHkgPSA8SFRNTEVsZW1lbnQ+bm9kZS5jbG9zZXN0KCdib2R5Jyk7XG4gICAgaWYgKHdyYXBwZXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUod3JhcHBlciwgJ21hcmdpbi1sZWZ0Jyk7XG4gICAgICBpZiAoXG4gICAgICAgIHdyYXBwZXIub2Zmc2V0TGVmdCArIHdyYXBwZXIub2Zmc2V0V2lkdGggPlxuICAgICAgICBib2R5Lm9mZnNldExlZnQgKyBib2R5Lm9mZnNldFdpZHRoXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB3cmFwcGVyLFxuICAgICAgICAgICdtYXJnaW4tbGVmdCcsXG4gICAgICAgICAgYCR7bm9kZS5vZmZzZXRXaWR0aCAtIHdyYXBwZXIub2Zmc2V0V2lkdGh9cHhgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhbGlnbldyYXBwZXJzVG9SaWdodElmU3RpY2tPdXQoKSB7XG4gICAgY29uc3QgbmF2cyA9IDxIVE1MQ29sbGVjdGlvbj50aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIEFycmF5LmZyb20obmF2cylcbiAgICAgIC5maWx0ZXIoKG5vZGUpID0+IG5vZGUudGFnTmFtZSA9PT0gJ0xJJylcbiAgICAgIC5mb3JFYWNoKChuYXYpID0+IHRoaXMuYWxpZ25XcmFwcGVyVG9SaWdodElmU3RpY2tPdXQoPEhUTUxFbGVtZW50Pm5hdikpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDbGFzc2VzKCk6IHZvaWQge1xuICAgIHRoaXMub3Blbk5vZGVzLmZvckVhY2goKG5vZGUsIGkpID0+IHtcbiAgICAgIGlmIChpICsgMSA8IHRoaXMub3Blbk5vZGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5vZGUsICdpcy1vcGVuZWQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhub2RlLCAnaXMtb3BlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhub2RlLCAnaXMtb3BlbmVkJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mobm9kZSwgJ2lzLW9wZW4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuaXNPcGVuID0gdGhpcy5vcGVuTm9kZXMubGVuZ3RoID4gMDtcbiAgfVxufVxuIiwiPG5hdiBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hdkFyaWFMYWJlbFwiPlxuICA8dWw+XG4gICAgPGxpXG4gICAgICAqbmdJZj1cImZseW91dCAmJiAobm9kZT8uY2hpbGRyZW4/Lmxlbmd0aCA/PyAwKSA+IDFcIlxuICAgICAgY2xhc3M9XCJiYWNrIGlzLW9wZW5cIlxuICAgID5cbiAgICAgIDxidXR0b24gKGNsaWNrKT1cImJhY2soKVwiPlxuICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5DQVJFVF9MRUZUXCI+PC9jeC1pY29uPlxuICAgICAgICB7eyAnY29tbW9uLmJhY2snIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbGk+XG5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlPy5jaGlsZHJlblwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdjsgY29udGV4dDogeyBub2RlOiBjaGlsZCwgZGVwdGg6IDAgfVwiPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvdWw+XG48L25hdj5cbjwhLS0gd2UgZ2VuZXJhdGUgbGlua3MgaW4gYSByZWN1cnNpdmUgbWFubmVyIC0tPlxuXG48bmctdGVtcGxhdGUgI25hdiBsZXQtbm9kZT1cIm5vZGVcIiBsZXQtZGVwdGg9XCJkZXB0aFwiPlxuICA8bGk+XG4gICAgPGN4LWdlbmVyaWMtbGlua1xuICAgICAgKm5nSWY9XCJcbiAgICAgICAgbm9kZS51cmwgJiYgKCFub2RlLmNoaWxkcmVuIHx8IG5vZGUuY2hpbGRyZW4/Lmxlbmd0aCA9PT0gMCk7XG4gICAgICAgIGVsc2UgaGVhZGluZ1xuICAgICAgXCJcbiAgICAgIFt1cmxdPVwibm9kZS51cmxcIlxuICAgICAgW3RhcmdldF09XCJub2RlLnRhcmdldFwiXG4gICAgICBbc3R5bGVdPVwibm9kZS5zdHlsZUF0dHJpYnV0ZXNcIlxuICAgICAgW2NsYXNzXT1cIm5vZGUuc3R5bGVDbGFzc2VzXCJcbiAgICAgIChjbGljayk9XCJjbG9zZUlmQ2xpY2tlZFRoZVNhbWVMaW5rKG5vZGUpXCJcbiAgICA+XG4gICAgICB7eyBub2RlLnRpdGxlIH19XG4gICAgPC9jeC1nZW5lcmljLWxpbms+XG5cbiAgICA8bmctdGVtcGxhdGUgI2hlYWRpbmc+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmx5b3V0ICYmIG5vZGUuY2hpbGRyZW4/Lmxlbmd0aCA+IDA7IGVsc2UgdGl0bGVcIj5cbiAgICAgICAgPGN4LWdlbmVyaWMtbGlua1xuICAgICAgICAgICpuZ0lmPVwibm9kZS51cmxcIlxuICAgICAgICAgIFt1cmxdPVwibm9kZS51cmxcIlxuICAgICAgICAgIFt0YXJnZXRdPVwibm9kZS50YXJnZXRcIlxuICAgICAgICAgIChjbGljayk9XCJjbG9zZUlmQ2xpY2tlZFRoZVNhbWVMaW5rKG5vZGUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IG5vZGUudGl0bGUgfX1cbiAgICAgICAgPC9jeC1nZW5lcmljLWxpbms+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJkZXB0aCA8IDEgPyAwIDogLTFcIlxuICAgICAgICAgIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwidHJ1ZVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJmYWxzZVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJub2RlLnRpdGxlXCJcbiAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlT3BlbigkYW55KCRldmVudCkpXCJcbiAgICAgICAgICAobW91c2VlbnRlcik9XCJvbk1vdXNlRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgKGtleWRvd24uc3BhY2UpPVwidG9nZ2xlT3BlbigkYW55KCRldmVudCkpXCJcbiAgICAgICAgICAoa2V5ZG93bi5lc2MpPVwiYmFjaygpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbm9kZS51cmxcIj5cbiAgICAgICAgICAgIHt7IG5vZGUudGl0bGUgfX1cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5DQVJFVF9ET1dOXCI+PC9jeC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICN0aXRsZT5cbiAgICAgICAgPHNwYW4gW2F0dHIudGFiaW5kZXhdPVwiLTFcIj5cbiAgICAgICAgICB7eyBub2RlLnRpdGxlIH19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDwhLS0gd2UgYWRkIGEgd3JhcHBlciB0byBhbGxvdyBmb3IgYmV0dGVyIGxheW91dCBoYW5kbGluZyBpbiBDU1MgLS0+XG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIiAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXCI+XG4gICAgICA8dWxcbiAgICAgICAgY2xhc3M9XCJjaGlsZHNcIlxuICAgICAgICBbYXR0ci5kZXB0aF09XCJnZXRUb3RhbERlcHRoKG5vZGUpXCJcbiAgICAgICAgW2F0dHIud3JhcC1hZnRlcl09XCJub2RlLmNoaWxkcmVuLmxlbmd0aCA+IHdyYXBBZnRlciA/IHdyYXBBZnRlciA6IG51bGxcIlxuICAgICAgICBbYXR0ci5jb2x1bW5zXT1cImdldENvbHVtbkNvdW50KG5vZGUuY2hpbGRyZW4ubGVuZ3RoKVwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW5cIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdjsgY29udGV4dDogeyBub2RlOiBjaGlsZCwgZGVwdGg6IGRlcHRoICsgMSB9XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgPC9saT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=