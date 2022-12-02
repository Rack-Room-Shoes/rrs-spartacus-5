/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/utils/common-configurator-utils.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@spartacus/core";
export class ConfigureCartEntryComponent {
    constructor(commonConfigUtilsService) {
        this.commonConfigUtilsService = commonConfigUtilsService;
    }
    /**
     * Verifies whether the entry has any issues.
     *
     * @returns - whether there are any issues
     */
    hasIssues() {
        return this.commonConfigUtilsService.hasIssues(this.cartEntry);
    }
    /**
     * Verifies whether the cart entry has an order code and returns a corresponding owner type.
     *
     * @returns - an owner type
     */
    getOwnerType() {
        return this.cartEntry.orderCode !== undefined
            ? CommonConfigurator.OwnerType.ORDER_ENTRY
            : CommonConfigurator.OwnerType.CART_ENTRY;
    }
    /**
     * Verifies whether the cart entry has an order code, retrieves a composed owner ID
     * and concatenates a corresponding entry number.
     *
     * @returns - an entry key
     */
    getEntityKey() {
        const entryNumber = this.cartEntry.entryNumber;
        if (entryNumber === undefined) {
            throw new Error('No entryNumber present in entry');
        }
        return this.cartEntry.orderCode
            ? this.commonConfigUtilsService.getComposedOwnerId(this.cartEntry.orderCode, entryNumber)
            : entryNumber.toString();
    }
    /**
     * Retrieves a corresponding route depending whether the configuration is read only or not.
     *
     * @returns - a route
     */
    getRoute() {
        const configuratorType = this.cartEntry.product?.configuratorType;
        return this.readOnly
            ? 'configureOverview' + configuratorType
            : 'configure' + configuratorType;
    }
    /**
     * Retrieves the state of the configuration.
     *
     *  @returns - 'true' if the configuration is read only, otherwise 'false'
     */
    getDisplayOnly() {
        return this.readOnly;
    }
    /**
     * Verifies whether the link to the configuration is disabled.
     *
     *  @returns - 'true' if the the configuration is not read only, otherwise 'false'
     */
    isDisabled() {
        return this.readOnly ? false : this.disabled;
    }
    /**
     * Retrieves the additional resolve issues accessibility description.
     *
     * @returns - If there is a 'resolve issues' link, the ID to the element with additional description will be returned.
     */
    getResolveIssuesA11yDescription() {
        const errorMsgId = 'cx-error-msg-' + this.cartEntry.entryNumber;
        return !this.readOnly && this.msgBanner ? errorMsgId : undefined;
    }
}
ConfigureCartEntryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigureCartEntryComponent, deps: [{ token: i1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfigureCartEntryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: { cartEntry: "cartEntry", readOnly: "readOnly", msgBanner: "msgBanner", disabled: "disabled" }, ngImport: i0, template: "<ng-container *ngIf=\"cartEntry\">\n  <label *ngIf=\"isDisabled()\" class=\"disabled-link\">\n    <ng-container *ngIf=\"isDisabled(); then configureText\"> </ng-container>\n  </label>\n\n  <a\n    *ngIf=\"!isDisabled()\"\n    class=\"link cx-action-link\"\n    [routerLink]=\"\n      {\n        cxRoute: getRoute(),\n        params: {\n          ownerType: getOwnerType(),\n          entityKey: getEntityKey(),\n          displayOnly: getDisplayOnly()\n        }\n      } | cxUrl\n    \"\n    [queryParams]=\"{ forceReload: true, resolveIssues: hasIssues() }\"\n    cxAutoFocus\n    attr.aria-describedby=\"{{ getResolveIssuesA11yDescription() }}\"\n  >\n    <ng-container *ngIf=\"!isDisabled(); then configureText\"> </ng-container>\n  </a>\n</ng-container>\n\n<ng-template #configureText>\n  <ng-container *ngIf=\"readOnly\">\n    {{ 'configurator.header.displayConfiguration' | cxTranslate }}</ng-container\n  >\n  <ng-container *ngIf=\"!readOnly && !msgBanner\">\n    {{ 'configurator.header.editConfiguration' | cxTranslate }}\n  </ng-container>\n\n  <ng-container *ngIf=\"!readOnly && msgBanner\">\n    {{ 'configurator.header.resolveIssues' | cxTranslate }}\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfigureCartEntryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configure-cart-entry', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cartEntry\">\n  <label *ngIf=\"isDisabled()\" class=\"disabled-link\">\n    <ng-container *ngIf=\"isDisabled(); then configureText\"> </ng-container>\n  </label>\n\n  <a\n    *ngIf=\"!isDisabled()\"\n    class=\"link cx-action-link\"\n    [routerLink]=\"\n      {\n        cxRoute: getRoute(),\n        params: {\n          ownerType: getOwnerType(),\n          entityKey: getEntityKey(),\n          displayOnly: getDisplayOnly()\n        }\n      } | cxUrl\n    \"\n    [queryParams]=\"{ forceReload: true, resolveIssues: hasIssues() }\"\n    cxAutoFocus\n    attr.aria-describedby=\"{{ getResolveIssuesA11yDescription() }}\"\n  >\n    <ng-container *ngIf=\"!isDisabled(); then configureText\"> </ng-container>\n  </a>\n</ng-container>\n\n<ng-template #configureText>\n  <ng-container *ngIf=\"readOnly\">\n    {{ 'configurator.header.displayConfiguration' | cxTranslate }}</ng-container\n  >\n  <ng-container *ngIf=\"!readOnly && !msgBanner\">\n    {{ 'configurator.header.editConfiguration' | cxTranslate }}\n  </ng-container>\n\n  <ng-container *ngIf=\"!readOnly && msgBanner\">\n    {{ 'configurator.header.resolveIssues' | cxTranslate }}\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CommonConfiguratorUtilsService }]; }, propDecorators: { cartEntry: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], msgBanner: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWNhcnQtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9jb21wb25lbnRzL2NvbmZpZ3VyZS1jYXJ0LWVudHJ5L2NvbmZpZ3VyZS1jYXJ0LWVudHJ5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9jb25maWd1cmUtY2FydC1lbnRyeS9jb25maWd1cmUtY2FydC1lbnRyeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNENBQTRDLENBQUM7Ozs7OztBQVFoRixNQUFNLE9BQU8sMkJBQTJCO0lBc0Z0QyxZQUNZLHdCQUF3RDtRQUF4RCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQWdDO0lBQ2pFLENBQUM7SUFsRko7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEtBQUssU0FBUztZQUMzQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFdBQVc7WUFDMUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsWUFBWTtRQUNWLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQy9DLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztZQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGtCQUFrQixDQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFDeEIsV0FBVyxDQUNaO1lBQ0gsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVE7UUFDTixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLFFBQVE7WUFDbEIsQ0FBQyxDQUFDLG1CQUFtQixHQUFHLGdCQUFnQjtZQUN4QyxDQUFDLENBQUMsV0FBVyxHQUFHLGdCQUFnQixDQUFDO0lBQ3JDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtCQUErQjtRQUM3QixNQUFNLFVBQVUsR0FBRyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDbkUsQ0FBQzs7d0hBcEZVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLHVLQ2hCeEMsbXJDQXNDQTsyRkR0QmEsMkJBQTJCO2tCQUx2QyxTQUFTOytCQUNFLHlCQUF5QixtQkFFbEIsdUJBQXVCLENBQUMsTUFBTTtxSEFHdEMsU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckVudHJ5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbW1vbi1jb25maWd1cmF0b3IubW9kZWwnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2NvbW1vbi1jb25maWd1cmF0b3ItdXRpbHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyZS1jYXJ0LWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyZS1jYXJ0LWVudHJ5LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyZUNhcnRFbnRyeUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNhcnRFbnRyeTogT3JkZXJFbnRyeTtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1zZ0Jhbm5lcjogYm9vbGVhbjtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGVudHJ5IGhhcyBhbnkgaXNzdWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyAtIHdoZXRoZXIgdGhlcmUgYXJlIGFueSBpc3N1ZXNcbiAgICovXG4gIGhhc0lzc3VlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb21tb25Db25maWdVdGlsc1NlcnZpY2UuaGFzSXNzdWVzKHRoaXMuY2FydEVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjYXJ0IGVudHJ5IGhhcyBhbiBvcmRlciBjb2RlIGFuZCByZXR1cm5zIGEgY29ycmVzcG9uZGluZyBvd25lciB0eXBlLlxuICAgKlxuICAgKiBAcmV0dXJucyAtIGFuIG93bmVyIHR5cGVcbiAgICovXG4gIGdldE93bmVyVHlwZSgpOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0RW50cnkub3JkZXJDb2RlICE9PSB1bmRlZmluZWRcbiAgICAgID8gQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5PUkRFUl9FTlRSWVxuICAgICAgOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLkNBUlRfRU5UUlk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY2FydCBlbnRyeSBoYXMgYW4gb3JkZXIgY29kZSwgcmV0cmlldmVzIGEgY29tcG9zZWQgb3duZXIgSURcbiAgICogYW5kIGNvbmNhdGVuYXRlcyBhIGNvcnJlc3BvbmRpbmcgZW50cnkgbnVtYmVyLlxuICAgKlxuICAgKiBAcmV0dXJucyAtIGFuIGVudHJ5IGtleVxuICAgKi9cbiAgZ2V0RW50aXR5S2V5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgZW50cnlOdW1iZXIgPSB0aGlzLmNhcnRFbnRyeS5lbnRyeU51bWJlcjtcbiAgICBpZiAoZW50cnlOdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBlbnRyeU51bWJlciBwcmVzZW50IGluIGVudHJ5Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FydEVudHJ5Lm9yZGVyQ29kZVxuICAgICAgPyB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5nZXRDb21wb3NlZE93bmVySWQoXG4gICAgICAgICAgdGhpcy5jYXJ0RW50cnkub3JkZXJDb2RlLFxuICAgICAgICAgIGVudHJ5TnVtYmVyXG4gICAgICAgIClcbiAgICAgIDogZW50cnlOdW1iZXIudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBjb3JyZXNwb25kaW5nIHJvdXRlIGRlcGVuZGluZyB3aGV0aGVyIHRoZSBjb25maWd1cmF0aW9uIGlzIHJlYWQgb25seSBvciBub3QuXG4gICAqXG4gICAqIEByZXR1cm5zIC0gYSByb3V0ZVxuICAgKi9cbiAgZ2V0Um91dGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb25maWd1cmF0b3JUeXBlID0gdGhpcy5jYXJ0RW50cnkucHJvZHVjdD8uY29uZmlndXJhdG9yVHlwZTtcbiAgICByZXR1cm4gdGhpcy5yZWFkT25seVxuICAgICAgPyAnY29uZmlndXJlT3ZlcnZpZXcnICsgY29uZmlndXJhdG9yVHlwZVxuICAgICAgOiAnY29uZmlndXJlJyArIGNvbmZpZ3VyYXRvclR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBzdGF0ZSBvZiB0aGUgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogIEByZXR1cm5zIC0gJ3RydWUnIGlmIHRoZSBjb25maWd1cmF0aW9uIGlzIHJlYWQgb25seSwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGdldERpc3BsYXlPbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRPbmx5O1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHdoZXRoZXIgdGhlIGxpbmsgdG8gdGhlIGNvbmZpZ3VyYXRpb24gaXMgZGlzYWJsZWQuXG4gICAqXG4gICAqICBAcmV0dXJucyAtICd0cnVlJyBpZiB0aGUgdGhlIGNvbmZpZ3VyYXRpb24gaXMgbm90IHJlYWQgb25seSwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZE9ubHkgPyBmYWxzZSA6IHRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBhZGRpdGlvbmFsIHJlc29sdmUgaXNzdWVzIGFjY2Vzc2liaWxpdHkgZGVzY3JpcHRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIC0gSWYgdGhlcmUgaXMgYSAncmVzb2x2ZSBpc3N1ZXMnIGxpbmssIHRoZSBJRCB0byB0aGUgZWxlbWVudCB3aXRoIGFkZGl0aW9uYWwgZGVzY3JpcHRpb24gd2lsbCBiZSByZXR1cm5lZC5cbiAgICovXG4gIGdldFJlc29sdmVJc3N1ZXNBMTF5RGVzY3JpcHRpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBlcnJvck1zZ0lkID0gJ2N4LWVycm9yLW1zZy0nICsgdGhpcy5jYXJ0RW50cnkuZW50cnlOdW1iZXI7XG4gICAgcmV0dXJuICF0aGlzLnJlYWRPbmx5ICYmIHRoaXMubXNnQmFubmVyID8gZXJyb3JNc2dJZCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb21tb25Db25maWdVdGlsc1NlcnZpY2U6IENvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZVxuICApIHt9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY2FydEVudHJ5XCI+XG4gIDxsYWJlbCAqbmdJZj1cImlzRGlzYWJsZWQoKVwiIGNsYXNzPVwiZGlzYWJsZWQtbGlua1wiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0Rpc2FibGVkKCk7IHRoZW4gY29uZmlndXJlVGV4dFwiPiA8L25nLWNvbnRhaW5lcj5cbiAgPC9sYWJlbD5cblxuICA8YVxuICAgICpuZ0lmPVwiIWlzRGlzYWJsZWQoKVwiXG4gICAgY2xhc3M9XCJsaW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgICBbcm91dGVyTGlua109XCJcbiAgICAgIHtcbiAgICAgICAgY3hSb3V0ZTogZ2V0Um91dGUoKSxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgb3duZXJUeXBlOiBnZXRPd25lclR5cGUoKSxcbiAgICAgICAgICBlbnRpdHlLZXk6IGdldEVudGl0eUtleSgpLFxuICAgICAgICAgIGRpc3BsYXlPbmx5OiBnZXREaXNwbGF5T25seSgpXG4gICAgICAgIH1cbiAgICAgIH0gfCBjeFVybFxuICAgIFwiXG4gICAgW3F1ZXJ5UGFyYW1zXT1cInsgZm9yY2VSZWxvYWQ6IHRydWUsIHJlc29sdmVJc3N1ZXM6IGhhc0lzc3VlcygpIH1cIlxuICAgIGN4QXV0b0ZvY3VzXG4gICAgYXR0ci5hcmlhLWRlc2NyaWJlZGJ5PVwie3sgZ2V0UmVzb2x2ZUlzc3Vlc0ExMXlEZXNjcmlwdGlvbigpIH19XCJcbiAgPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNEaXNhYmxlZCgpOyB0aGVuIGNvbmZpZ3VyZVRleHRcIj4gPC9uZy1jb250YWluZXI+XG4gIDwvYT5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI2NvbmZpZ3VyZVRleHQ+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZWFkT25seVwiPlxuICAgIHt7ICdjb25maWd1cmF0b3IuaGVhZGVyLmRpc3BsYXlDb25maWd1cmF0aW9uJyB8IGN4VHJhbnNsYXRlIH19PC9uZy1jb250YWluZXJcbiAgPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlYWRPbmx5ICYmICFtc2dCYW5uZXJcIj5cbiAgICB7eyAnY29uZmlndXJhdG9yLmhlYWRlci5lZGl0Q29uZmlndXJhdGlvbicgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlYWRPbmx5ICYmIG1zZ0Jhbm5lclwiPlxuICAgIHt7ICdjb25maWd1cmF0b3IuaGVhZGVyLnJlc29sdmVJc3N1ZXMnIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuIl19