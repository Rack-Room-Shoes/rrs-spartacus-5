/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, HostBinding, Input, } from '@angular/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import * as i0 from "@angular/core";
import * as i1 from "./icon-loader.service";
/**
 *
 * The icon component can be added in different ways:
 *
 * With the component selector:
 * `<cx-icon type="SEARCH"></cx-icon>`
 *
 * With the attribute selector:
 * `<span cxIcon="STAR"></span>`
 *
 * Additionally, content can be projected to the icon:
 *
 * `<button cxIcon="HAPPY">happy label</button>`
 *
 * The above button would become (based on a TEXT resource type):
 * `<button>😊happy label</button>`
 *
 * While the content is projected, the icon itself doesn't require an
 * additional DOM node which is an advantage over the component selector.
 */
export class IconComponent {
    constructor(iconLoader, elementRef, renderer) {
        this.iconLoader = iconLoader;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    /**
     * The cxIcon directive is bound to the icon type. You can feed the `ICON_TYPE` to
     * accomplish a configurable button in the UI.
     */
    set cxIcon(type) {
        this.setIcon(type);
    }
    /**
     * The type input parameter is bound to the icon type. You can feed the `ICON_TYPE` to
     * accomplish a configurable button in the UI.
     */
    set type(type) {
        this.setIcon(type);
    }
    setIcon(type) {
        if (!type || type === '') {
            return;
        }
        this.icon = this.iconLoader.getHtml(type);
        this.addStyleClasses(type);
        this.iconLoader.addLinkResource(type);
        this.flipIcon(type);
    }
    /**
     * The icons supports flipping for some icons to support rtl and ltr directions.
     */
    flipIcon(type) {
        // TODO: this can be dropped with the next major release.
        if (!this.iconLoader.getFlipDirection) {
            return;
        }
        const iconDirection = this.iconLoader.getFlipDirection(type);
        this.flipAtLtr = iconDirection === DirectionMode.LTR;
        this.flipAtRtl = iconDirection === DirectionMode.RTL;
    }
    /**
     * Adds the style classes and the link resource (if available).
     */
    addStyleClasses(type) {
        this.renderer.addClass(this.host, 'cx-icon');
        this.styleClasses?.forEach((cls) => this.renderer.removeClass(this.host, cls));
        this.styleClasses = this.iconLoader.getStyleClasses(type)?.split(' ');
        this.styleClasses?.forEach((cls) => {
            if (cls !== '') {
                this.renderer.addClass(this.host, cls);
            }
        });
    }
    get host() {
        return this.elementRef.nativeElement;
    }
}
IconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: IconComponent, deps: [{ token: i1.IconLoaderService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: IconComponent, selector: "cx-icon,[cxIcon]", inputs: { cxIcon: "cxIcon", type: "type" }, host: { properties: { "class.flip-at-rtl": "this.flipAtRtl", "class.flip-at-ltr": "this.flipAtLtr" } }, ngImport: i0, template: "<i [outerHTML]=\"icon\"></i><ng-content></ng-content>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-icon,[cxIcon]', template: "<i [outerHTML]=\"icon\"></i><ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return [{ type: i1.IconLoaderService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { cxIcon: [{
                type: Input
            }], type: [{
                type: Input
            }], flipAtRtl: [{
                type: HostBinding,
                args: ['class.flip-at-rtl']
            }], flipAtLtr: [{
                type: HostBinding,
                args: ['class.flip-at-ltr']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL21pc2MvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsV0FBVyxFQUNYLEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0RBQWtELENBQUM7OztBQU1qRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUtILE1BQU0sT0FBTyxhQUFhO0lBc0N4QixZQUNZLFVBQTZCLEVBQzdCLFVBQW1DLEVBQ25DLFFBQW1CO1FBRm5CLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLGFBQVEsR0FBUixRQUFRLENBQVc7SUFDNUIsQ0FBQztJQXpDSjs7O09BR0c7SUFDSCxJQUFhLE1BQU0sQ0FBQyxJQUFlO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQWEsSUFBSSxDQUFDLElBQWU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBNkJTLE9BQU8sQ0FBQyxJQUFlO1FBQy9CLElBQUksQ0FBQyxJQUFJLElBQVksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDTyxRQUFRLENBQUMsSUFBZTtRQUNoQyx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7WUFDckMsT0FBTztTQUNSO1FBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsS0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ08sZUFBZSxDQUFDLElBQWU7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQzFDLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBYyxJQUFJO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7MEdBdkZVLGFBQWE7OEZBQWIsYUFBYSw0TUM1QzFCLHlEQUNBOzJGRDJDYSxhQUFhO2tCQUp6QixTQUFTOytCQUNFLGtCQUFrQjt5SkFRZixNQUFNO3NCQUFsQixLQUFLO2dCQVFPLElBQUk7c0JBQWhCLEtBQUs7Z0JBWTRCLFNBQVM7c0JBQTFDLFdBQVc7dUJBQUMsbUJBQW1CO2dCQUtFLFNBQVM7c0JBQTFDLFdBQVc7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgRGlyZWN0aW9uTW9kZSB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9kaXJlY3Rpb24vY29uZmlnL2RpcmVjdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBJY29uTG9hZGVyU2VydmljZSB9IGZyb20gJy4vaWNvbi1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgYXMgREVGQVVMVF9JQ09OX1RZUEUgfSBmcm9tICcuL2ljb24ubW9kZWwnO1xuXG50eXBlIElDT05fVFlQRSA9IERFRkFVTFRfSUNPTl9UWVBFIHwgc3RyaW5nO1xuXG4vKipcbiAqXG4gKiBUaGUgaWNvbiBjb21wb25lbnQgY2FuIGJlIGFkZGVkIGluIGRpZmZlcmVudCB3YXlzOlxuICpcbiAqIFdpdGggdGhlIGNvbXBvbmVudCBzZWxlY3RvcjpcbiAqIGA8Y3gtaWNvbiB0eXBlPVwiU0VBUkNIXCI+PC9jeC1pY29uPmBcbiAqXG4gKiBXaXRoIHRoZSBhdHRyaWJ1dGUgc2VsZWN0b3I6XG4gKiBgPHNwYW4gY3hJY29uPVwiU1RBUlwiPjwvc3Bhbj5gXG4gKlxuICogQWRkaXRpb25hbGx5LCBjb250ZW50IGNhbiBiZSBwcm9qZWN0ZWQgdG8gdGhlIGljb246XG4gKlxuICogYDxidXR0b24gY3hJY29uPVwiSEFQUFlcIj5oYXBweSBsYWJlbDwvYnV0dG9uPmBcbiAqXG4gKiBUaGUgYWJvdmUgYnV0dG9uIHdvdWxkIGJlY29tZSAoYmFzZWQgb24gYSBURVhUIHJlc291cmNlIHR5cGUpOlxuICogYDxidXR0b24+8J+YimhhcHB5IGxhYmVsPC9idXR0b24+YFxuICpcbiAqIFdoaWxlIHRoZSBjb250ZW50IGlzIHByb2plY3RlZCwgdGhlIGljb24gaXRzZWxmIGRvZXNuJ3QgcmVxdWlyZSBhblxuICogYWRkaXRpb25hbCBET00gbm9kZSB3aGljaCBpcyBhbiBhZHZhbnRhZ2Ugb3ZlciB0aGUgY29tcG9uZW50IHNlbGVjdG9yLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1pY29uLFtjeEljb25dJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFRoZSBjeEljb24gZGlyZWN0aXZlIGlzIGJvdW5kIHRvIHRoZSBpY29uIHR5cGUuIFlvdSBjYW4gZmVlZCB0aGUgYElDT05fVFlQRWAgdG9cbiAgICogYWNjb21wbGlzaCBhIGNvbmZpZ3VyYWJsZSBidXR0b24gaW4gdGhlIFVJLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGN4SWNvbih0eXBlOiBJQ09OX1RZUEUpIHtcbiAgICB0aGlzLnNldEljb24odHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHR5cGUgaW5wdXQgcGFyYW1ldGVyIGlzIGJvdW5kIHRvIHRoZSBpY29uIHR5cGUuIFlvdSBjYW4gZmVlZCB0aGUgYElDT05fVFlQRWAgdG9cbiAgICogYWNjb21wbGlzaCBhIGNvbmZpZ3VyYWJsZSBidXR0b24gaW4gdGhlIFVJLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IHR5cGUodHlwZTogSUNPTl9UWVBFKSB7XG4gICAgdGhpcy5zZXRJY29uKHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoZSBpY29uIHByb3ZpZGVzIGFuIGh0bWwgZnJhZ21lbnQgdGhhdCBpcyB1c2VkIHRvIGFkZCBTVkcgb3IgdGV4dCBiYXNlZCBpY29ucy5cbiAgICovXG4gIGljb246IFNhZmVIdG1sIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgYGZsaXAtYXQtcnRsYCBjbGFzcyBpcyBhZGRlZCB0byB0aGUgRE9NIGZvciB0aGUgc3R5bGUgbGF5ZXIgdG8gZmxpcCB0aGUgaWNvbiBpbiBSVEwgZGlyZWN0aW9uLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbGlwLWF0LXJ0bCcpIGZsaXBBdFJ0bDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGBmbGlwLWF0LWx0cmAgY2xhc3MgaXMgYWRkZWQgdG8gdGhlIERPTSBmb3IgdGhlIHN0eWxlIGxheWVyIHRvIGZsaXAgdGhlIGljb24gaW4gTFRSIGRpcmVjdGlvbi5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxpcC1hdC1sdHInKSBmbGlwQXRMdHI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE1haW50YWlucyB0aGUgYXBwbGllZCBzdHlsZSBjbGFzc2VzIHNvIHdlIGNhbiByZW1vdmUgdGhlbSB3aGVuIHRoZVxuICAgKiBpY29uIHR5cGUgY2hhbmdlcyBhdCBydW4gdGltZS5cbiAgICovXG4gIHByb3RlY3RlZCBzdHlsZUNsYXNzZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpY29uTG9hZGVyOiBJY29uTG9hZGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBzZXRJY29uKHR5cGU6IElDT05fVFlQRSk6IHZvaWQge1xuICAgIGlmICghdHlwZSB8fCA8c3RyaW5nPnR5cGUgPT09ICcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaWNvbiA9IHRoaXMuaWNvbkxvYWRlci5nZXRIdG1sKHR5cGUpO1xuICAgIHRoaXMuYWRkU3R5bGVDbGFzc2VzKHR5cGUpO1xuICAgIHRoaXMuaWNvbkxvYWRlci5hZGRMaW5rUmVzb3VyY2UodHlwZSk7XG4gICAgdGhpcy5mbGlwSWNvbih0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaWNvbnMgc3VwcG9ydHMgZmxpcHBpbmcgZm9yIHNvbWUgaWNvbnMgdG8gc3VwcG9ydCBydGwgYW5kIGx0ciBkaXJlY3Rpb25zLlxuICAgKi9cbiAgcHJvdGVjdGVkIGZsaXBJY29uKHR5cGU6IElDT05fVFlQRSkge1xuICAgIC8vIFRPRE86IHRoaXMgY2FuIGJlIGRyb3BwZWQgd2l0aCB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuICAgIGlmICghdGhpcy5pY29uTG9hZGVyLmdldEZsaXBEaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaWNvbkRpcmVjdGlvbiA9IHRoaXMuaWNvbkxvYWRlci5nZXRGbGlwRGlyZWN0aW9uKHR5cGUpO1xuICAgIHRoaXMuZmxpcEF0THRyID0gaWNvbkRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uTW9kZS5MVFI7XG4gICAgdGhpcy5mbGlwQXRSdGwgPSBpY29uRGlyZWN0aW9uID09PSBEaXJlY3Rpb25Nb2RlLlJUTDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBzdHlsZSBjbGFzc2VzIGFuZCB0aGUgbGluayByZXNvdXJjZSAoaWYgYXZhaWxhYmxlKS5cbiAgICovXG4gIHByb3RlY3RlZCBhZGRTdHlsZUNsYXNzZXModHlwZTogSUNPTl9UWVBFKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdjeC1pY29uJyk7XG5cbiAgICB0aGlzLnN0eWxlQ2xhc3Nlcz8uZm9yRWFjaCgoY2xzKSA9PlxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmhvc3QsIGNscylcbiAgICApO1xuXG4gICAgdGhpcy5zdHlsZUNsYXNzZXMgPSB0aGlzLmljb25Mb2FkZXIuZ2V0U3R5bGVDbGFzc2VzKHR5cGUpPy5zcGxpdCgnICcpO1xuICAgIHRoaXMuc3R5bGVDbGFzc2VzPy5mb3JFYWNoKChjbHMpID0+IHtcbiAgICAgIGlmIChjbHMgIT09ICcnKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0LCBjbHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBob3N0KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIiwiPGkgW291dGVySFRNTF09XCJpY29uXCI+PC9pPjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==