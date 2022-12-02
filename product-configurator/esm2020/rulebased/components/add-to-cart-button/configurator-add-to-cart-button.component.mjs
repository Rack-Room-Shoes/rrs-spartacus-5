/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { CommonConfigurator, ConfiguratorModelUtils, ConfiguratorRouter, } from '@spartacus/product-configurator/common';
import { of, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../core/facade/configurator-commons.service";
import * as i3 from "../../core/facade/configurator-cart.service";
import * as i4 from "../../core/facade/configurator-groups.service";
import * as i5 from "@spartacus/product-configurator/common";
import * as i6 from "@spartacus/order/root";
import * as i7 from "../service/configurator-storefront-utils.service";
import * as i8 from "@spartacus/storefront";
import * as i9 from "@angular/common";
export class ConfiguratorAddToCartButtonComponent {
    constructor(routingService, configuratorCommonsService, configuratorCartService, configuratorGroupsService, configRouterExtractorService, globalMessageService, orderHistoryFacade, commonConfiguratorUtilsService, configUtils, intersectionService) {
        this.routingService = routingService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorCartService = configuratorCartService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.globalMessageService = globalMessageService;
        this.orderHistoryFacade = orderHistoryFacade;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
        this.configUtils = configUtils;
        this.intersectionService = intersectionService;
        this.subscription = new Subscription();
        this.container$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })))
            .pipe(switchMap((cont) => this.configuratorCommonsService
            .hasPendingChanges(cont.configuration.owner)
            .pipe(map((hasPendingChanges) => ({
            routerData: cont.routerData,
            configuration: cont.configuration,
            hasPendingChanges,
        })))))));
    }
    ngOnInit() {
        this.makeAddToCartButtonSticky();
    }
    navigateToCart() {
        this.routingService.go('cart');
    }
    navigateToOverview(configuratorType, owner) {
        this.routingService.go({
            cxRoute: 'configureOverview' + configuratorType,
            params: { ownerType: 'cartEntry', entityKey: owner.id },
        });
    }
    displayConfirmationMessage(key) {
        this.globalMessageService.add({ key: key }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    /**
     * Performs the navigation to the corresponding location (cart or overview pages).
     *
     * @param {string} configuratorType - Configurator type
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {boolean} isAdd - Is add to cart
     * @param {boolean} isOverview - Is overview page
     * @param {boolean} showMessage - Show message
     */
    performNavigation(configuratorType, owner, isAdd, isOverview, showMessage) {
        const messageKey = isAdd
            ? 'configurator.addToCart.confirmation'
            : 'configurator.addToCart.confirmationUpdate';
        if (isOverview) {
            this.navigateToCart();
        }
        else {
            this.navigateToOverview(configuratorType, owner);
        }
        if (showMessage) {
            this.displayConfirmationMessage(messageKey);
        }
    }
    /**
     * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
     * need for a cart update, the text will differ
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {string} The resource key that controls the button description
     */
    getButtonResourceKey(routerData, configuration) {
        if (routerData.isOwnerCartEntry &&
            configuration.isCartEntryUpdateRequired) {
            return 'configurator.addToCart.buttonUpdateCart';
        }
        else if (routerData.isOwnerCartEntry &&
            !configuration.isCartEntryUpdateRequired) {
            return 'configurator.addToCart.buttonAfterAddToCart';
        }
        else {
            return 'configurator.addToCart.button';
        }
    }
    /**
     * Triggers action and navigation, both depending on the context. Might result in an addToCart, updateCartEntry,
     * just a cart navigation or a browser back navigation
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     */
    onAddToCart(configuration, routerData) {
        const pageType = routerData.pageType;
        const configuratorType = configuration.owner.configuratorType;
        const isOverview = pageType === ConfiguratorRouter.PageType.OVERVIEW;
        const isOwnerCartEntry = routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY;
        const owner = configuration.owner;
        const currentGroup = configuration.interactionState.currentGroup;
        if (currentGroup) {
            this.configuratorGroupsService.setGroupStatusVisited(configuration.owner, currentGroup);
        }
        this.container$
            .pipe(filter((cont) => !cont.hasPendingChanges), take(1))
            .subscribe(() => {
            if (isOwnerCartEntry) {
                if (configuration.isCartEntryUpdateRequired) {
                    this.configuratorCartService.updateCartEntry(configuration);
                }
                this.performNavigation(configuratorType, owner, false, isOverview, configuration.isCartEntryUpdateRequired ?? false);
                //Only remove if we are on configuration page, because on final cart navigation,
                //the configuration will anyhow be removed
                if (configuration.isCartEntryUpdateRequired && !isOverview) {
                    this.configuratorCommonsService.removeConfiguration(owner);
                }
            }
            else {
                this.configuratorCartService.addToCart(owner.id, configuration.configId, owner);
                this.configuratorCommonsService
                    .getConfiguration(owner)
                    .pipe(filter((configWithNextOwner) => configWithNextOwner.nextOwner !== undefined), take(1))
                    .subscribe((configWithNextOwner) => {
                    //See preceeding filter operator: configWithNextOwner.nextOwner is always defined here
                    const nextOwner = configWithNextOwner.nextOwner ??
                        ConfiguratorModelUtils.createInitialOwner();
                    this.performNavigation(configuratorType, nextOwner, true, isOverview, true);
                    // we clean up the cart entry related configuration, as we might have a
                    // configuration for the same cart entry number stored already.
                    // (Cart entries might have been deleted)
                    // Needs to happen only if we are on configuration page, navigation to
                    // cart will anyhow delete
                    // we do not clean up the product bound configuration yet, as existing
                    // observables would instantly trigger a re-create.
                    // Cleaning up this obsolete product bound configuration will only happen
                    // when a new config form requests a new observable for a product bound
                    // configuration
                    if (!isOverview) {
                        this.configuratorCommonsService.removeConfiguration(nextOwner);
                    }
                });
            }
        });
    }
    leaveConfigurationOverview() {
        this.container$.pipe(take(1)).subscribe((container) => {
            if (container.routerData.owner.type ===
                CommonConfigurator.OwnerType.ORDER_ENTRY) {
                this.goToOrderDetails(container.routerData.owner);
            }
            else {
                this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
            }
        });
    }
    goToOrderDetails(owner) {
        this.orderHistoryFacade.loadOrderDetails(this.commonConfiguratorUtilsService.decomposeOwnerId(owner.id).documentId);
        this.orderHistoryFacade
            .getOrderDetails()
            .pipe(filter((order) => order !== undefined), take(1))
            .subscribe((order) => this.routingService.go({ cxRoute: 'orderDetails', params: order }));
    }
    extractConfigPrices(configuration) {
        let priceSummary = configuration.priceSummary;
        let basePrice = priceSummary?.basePrice?.formattedValue;
        let selectedOptions = priceSummary?.selectedOptions?.formattedValue;
        let totalPrice = priceSummary?.currentTotal?.formattedValue;
        let prices = {
            basePrice: basePrice,
            selectedOptions: selectedOptions,
            totalPrice: totalPrice,
        };
        if (!basePrice || basePrice === '-') {
            prices.basePrice = '0';
        }
        if (!selectedOptions || selectedOptions === '-') {
            prices.selectedOptions = '0';
        }
        if (!totalPrice || totalPrice === '-') {
            prices.totalPrice = '0';
        }
        return prices;
    }
    makeAddToCartButtonSticky() {
        const options = { rootMargin: '0px 0px -100px 0px' };
        this.subscription.add(this.container$
            .pipe(take(1), delay(0), map(() => this.configUtils.getElement('.cx-price-summary-container')), switchMap((priceSummary) => priceSummary
            ? this.intersectionService.isIntersecting(priceSummary, options)
            : of(undefined)), filter((isIntersecting) => isIntersecting !== undefined))
            .subscribe((isIntersecting) => {
            if (isIntersecting) {
                this.configUtils.changeStyling('cx-configurator-add-to-cart-button', 'position', 'sticky');
            }
            else {
                this.configUtils.changeStyling('cx-configurator-add-to-cart-button', 'position', 'fixed');
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorAddToCartButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonComponent, deps: [{ token: i1.RoutingService }, { token: i2.ConfiguratorCommonsService }, { token: i3.ConfiguratorCartService }, { token: i4.ConfiguratorGroupsService }, { token: i5.ConfiguratorRouterExtractorService }, { token: i1.GlobalMessageService }, { token: i6.OrderHistoryFacade }, { token: i5.CommonConfiguratorUtilsService }, { token: i7.ConfiguratorStorefrontUtilsService }, { token: i8.IntersectionService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAddToCartButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ConfiguratorAddToCartButtonComponent, selector: "cx-configurator-add-to-cart-button", ngImport: i0, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <ng-container *ngIf=\"!container.routerData.displayOnly; else displayOnly\">\n    <div class=\"cx-add-to-cart-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n        (click)=\"onAddToCart(container.configuration, container.routerData)\"\n        [attr.aria-label]=\"\n          (getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate) +\n          ' ' +\n          ('configurator.a11y.addToCartPrices'\n            | cxTranslate: extractConfigPrices(container.configuration))\n        \"\n      >\n        {{\n          getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate\n        }}\n      </button>\n    </div>\n  </ng-container>\n  <ng-template #displayOnly>\n    <div class=\"cx-display-only-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-display-only-btn\"\n        (click)=\"leaveConfigurationOverview()\"\n      >\n        {{ 'configurator.addToCart.buttonDisplayOnly' | cxTranslate }}\n      </button>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i9.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorAddToCartButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-add-to-cart-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <ng-container *ngIf=\"!container.routerData.displayOnly; else displayOnly\">\n    <div class=\"cx-add-to-cart-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n        (click)=\"onAddToCart(container.configuration, container.routerData)\"\n        [attr.aria-label]=\"\n          (getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate) +\n          ' ' +\n          ('configurator.a11y.addToCartPrices'\n            | cxTranslate: extractConfigPrices(container.configuration))\n        \"\n      >\n        {{\n          getButtonResourceKey(container.routerData, container.configuration)\n            | cxTranslate\n        }}\n      </button>\n    </div>\n  </ng-container>\n  <ng-template #displayOnly>\n    <div class=\"cx-display-only-btn-container\">\n      <button\n        class=\"cx-btn btn btn-block btn-primary cx-display-only-btn\"\n        (click)=\"leaveConfigurationOverview()\"\n      >\n        {{ 'configurator.addToCart.buttonDisplayOnly' | cxTranslate }}\n      </button>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.ConfiguratorCommonsService }, { type: i3.ConfiguratorCartService }, { type: i4.ConfiguratorGroupsService }, { type: i5.ConfiguratorRouterExtractorService }, { type: i1.GlobalMessageService }, { type: i6.OrderHistoryFacade }, { type: i5.CommonConfiguratorUtilsService }, { type: i7.ConfiguratorStorefrontUtilsService }, { type: i8.IntersectionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYWRkLXRvLWNhcnQtYnV0dG9uL2NvbmZpZ3VyYXRvci1hZGQtdG8tY2FydC1idXR0b24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL2FkZC10by1jYXJ0LWJ1dHRvbi9jb25maWd1cmF0b3ItYWRkLXRvLWNhcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLGtCQUFrQixFQUVsQixzQkFBc0IsRUFDdEIsa0JBQWtCLEdBRW5CLE1BQU0sd0NBQXdDLENBQUM7QUFLaEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFZckUsTUFBTSxPQUFPLG9DQUFvQztJQTRCL0MsWUFDWSxjQUE4QixFQUM5QiwwQkFBc0QsRUFDdEQsdUJBQWdELEVBQ2hELHlCQUFvRCxFQUNwRCw0QkFBZ0UsRUFDaEUsb0JBQTBDLEVBQzFDLGtCQUFzQyxFQUN0Qyw4QkFBOEQsRUFDOUQsV0FBK0MsRUFDL0MsbUJBQXdDO1FBVHhDLG1CQUFjLEdBQWQs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QVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQ3JFLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ3pCLFlBQVk7WUFDVixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQ2xCLEVBQ0QsTUFBTSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQ3pEO2FBQ0EsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUM1QixvQ0FBb0MsRUFDcEMsVUFBVSxFQUNWLFFBQVEsQ0FDVCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQzVCLG9DQUFvQyxFQUNwQyxVQUFVLEVBQ1YsT0FBTyxDQUNSLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDSixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7aUlBN1NVLG9DQUFvQztxSEFBcEMsb0NBQW9DLDBFQzFDakQsNnFDQWdDQTsyRkRVYSxvQ0FBb0M7a0JBTGhELFNBQVM7K0JBQ0Usb0NBQW9DLG1CQUU3Qix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZGVyLCBPcmRlckhpc3RvcnlGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29tbW9uQ29uZmlndXJhdG9yLFxuICBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gIENvbmZpZ3VyYXRvck1vZGVsVXRpbHMsXG4gIENvbmZpZ3VyYXRvclJvdXRlcixcbiAgQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHtcbiAgSW50ZXJzZWN0aW9uT3B0aW9ucyxcbiAgSW50ZXJzZWN0aW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yQ2FydFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclN0b3JlZnJvbnRVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1zdG9yZWZyb250LXV0aWxzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jb25maWd1cmF0b3ItYWRkLXRvLWNhcnQtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYXRvci1hZGQtdG8tY2FydC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQWRkVG9DYXJ0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnRhaW5lciQ6IE9ic2VydmFibGU8e1xuICAgIHJvdXRlckRhdGE6IENvbmZpZ3VyYXRvclJvdXRlci5EYXRhO1xuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uO1xuICAgIGhhc1BlbmRpbmdDaGFuZ2VzOiBib29sZWFuO1xuICB9PiA9IHRoaXMuY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZS5leHRyYWN0Um91dGVyRGF0YSgpLnBpcGUoXG4gICAgc3dpdGNoTWFwKChyb3V0ZXJEYXRhKSA9PlxuICAgICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgICAuZ2V0Q29uZmlndXJhdGlvbihyb3V0ZXJEYXRhLm93bmVyKVxuICAgICAgICAucGlwZShtYXAoKGNvbmZpZ3VyYXRpb24pID0+ICh7IHJvdXRlckRhdGEsIGNvbmZpZ3VyYXRpb24gfSkpKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKGNvbnQpID0+XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlXG4gICAgICAgICAgICAgIC5oYXNQZW5kaW5nQ2hhbmdlcyhjb250LmNvbmZpZ3VyYXRpb24ub3duZXIpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoaGFzUGVuZGluZ0NoYW5nZXMpID0+ICh7XG4gICAgICAgICAgICAgICAgICByb3V0ZXJEYXRhOiBjb250LnJvdXRlckRhdGEsXG4gICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uOiBjb250LmNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgICAgICBoYXNQZW5kaW5nQ2hhbmdlcyxcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIClcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JDb21tb25zU2VydmljZTogQ29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlOiBDb25maWd1cmF0b3JDYXJ0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yR3JvdXBzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnUm91dGVyRXh0cmFjdG9yU2VydmljZTogQ29uZmlndXJhdG9yUm91dGVyRXh0cmFjdG9yU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmRlckhpc3RvcnlGYWNhZGU6IE9yZGVySGlzdG9yeUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlOiBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ1V0aWxzOiBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBpbnRlcnNlY3Rpb25TZXJ2aWNlOiBJbnRlcnNlY3Rpb25TZXJ2aWNlXG4gICkge31cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tYWtlQWRkVG9DYXJ0QnV0dG9uU3RpY2t5KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbmF2aWdhdGVUb0NhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbygnY2FydCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG5hdmlnYXRlVG9PdmVydmlldyhcbiAgICBjb25maWd1cmF0b3JUeXBlOiBzdHJpbmcsXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgIGN4Um91dGU6ICdjb25maWd1cmVPdmVydmlldycgKyBjb25maWd1cmF0b3JUeXBlLFxuICAgICAgcGFyYW1zOiB7IG93bmVyVHlwZTogJ2NhcnRFbnRyeScsIGVudGl0eUtleTogb3duZXIuaWQgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkaXNwbGF5Q29uZmlybWF0aW9uTWVzc2FnZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6IGtleSB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgbmF2aWdhdGlvbiB0byB0aGUgY29ycmVzcG9uZGluZyBsb2NhdGlvbiAoY2FydCBvciBvdmVydmlldyBwYWdlcykuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWd1cmF0b3JUeXBlIC0gQ29uZmlndXJhdG9yIHR5cGVcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIC0gT3duZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0FkZCAtIElzIGFkZCB0byBjYXJ0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNPdmVydmlldyAtIElzIG92ZXJ2aWV3IHBhZ2VcbiAgICogQHBhcmFtIHtib29sZWFufSBzaG93TWVzc2FnZSAtIFNob3cgbWVzc2FnZVxuICAgKi9cbiAgcGVyZm9ybU5hdmlnYXRpb24oXG4gICAgY29uZmlndXJhdG9yVHlwZTogc3RyaW5nLFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgaXNBZGQ6IGJvb2xlYW4sXG4gICAgaXNPdmVydmlldzogYm9vbGVhbixcbiAgICBzaG93TWVzc2FnZTogYm9vbGVhblxuICApOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlS2V5ID0gaXNBZGRcbiAgICAgID8gJ2NvbmZpZ3VyYXRvci5hZGRUb0NhcnQuY29uZmlybWF0aW9uJ1xuICAgICAgOiAnY29uZmlndXJhdG9yLmFkZFRvQ2FydC5jb25maXJtYXRpb25VcGRhdGUnO1xuICAgIGlmIChpc092ZXJ2aWV3KSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG9DYXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmF2aWdhdGVUb092ZXJ2aWV3KGNvbmZpZ3VyYXRvclR5cGUsIG93bmVyKTtcbiAgICB9XG4gICAgaWYgKHNob3dNZXNzYWdlKSB7XG4gICAgICB0aGlzLmRpc3BsYXlDb25maXJtYXRpb25NZXNzYWdlKG1lc3NhZ2VLZXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNpZGVzIG9uIHRoZSByZXNvdXJjZSBrZXkgZm9yIHRoZSBidXR0b24uIERlcGVuZGluZyBvbiB0aGUgYnVzaW5lc3MgcHJvY2VzcyAob3duZXIgb2YgdGhlIGNvbmZpZ3VyYXRpb24pIGFuZCB0aGVcbiAgICogbmVlZCBmb3IgYSBjYXJ0IHVwZGF0ZSwgdGhlIHRleHQgd2lsbCBkaWZmZXJcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3JSb3V0ZXIuRGF0YX0gcm91dGVyRGF0YSAtIFJlZmxlY3RzIHRoZSBjdXJyZW50IHJvdXRlciBzdGF0ZVxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVzb3VyY2Uga2V5IHRoYXQgY29udHJvbHMgdGhlIGJ1dHRvbiBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0QnV0dG9uUmVzb3VyY2VLZXkoXG4gICAgcm91dGVyRGF0YTogQ29uZmlndXJhdG9yUm91dGVyLkRhdGEsXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICByb3V0ZXJEYXRhLmlzT3duZXJDYXJ0RW50cnkgJiZcbiAgICAgIGNvbmZpZ3VyYXRpb24uaXNDYXJ0RW50cnlVcGRhdGVSZXF1aXJlZFxuICAgICkge1xuICAgICAgcmV0dXJuICdjb25maWd1cmF0b3IuYWRkVG9DYXJ0LmJ1dHRvblVwZGF0ZUNhcnQnO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICByb3V0ZXJEYXRhLmlzT3duZXJDYXJ0RW50cnkgJiZcbiAgICAgICFjb25maWd1cmF0aW9uLmlzQ2FydEVudHJ5VXBkYXRlUmVxdWlyZWRcbiAgICApIHtcbiAgICAgIHJldHVybiAnY29uZmlndXJhdG9yLmFkZFRvQ2FydC5idXR0b25BZnRlckFkZFRvQ2FydCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnY29uZmlndXJhdG9yLmFkZFRvQ2FydC5idXR0b24nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhY3Rpb24gYW5kIG5hdmlnYXRpb24sIGJvdGggZGVwZW5kaW5nIG9uIHRoZSBjb250ZXh0LiBNaWdodCByZXN1bHQgaW4gYW4gYWRkVG9DYXJ0LCB1cGRhdGVDYXJ0RW50cnksXG4gICAqIGp1c3QgYSBjYXJ0IG5hdmlnYXRpb24gb3IgYSBicm93c2VyIGJhY2sgbmF2aWdhdGlvblxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvclJvdXRlci5EYXRhfSByb3V0ZXJEYXRhIC0gUmVmbGVjdHMgdGhlIGN1cnJlbnQgcm91dGVyIHN0YXRlXG4gICAqL1xuICBvbkFkZFRvQ2FydChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICByb3V0ZXJEYXRhOiBDb25maWd1cmF0b3JSb3V0ZXIuRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBwYWdlVHlwZSA9IHJvdXRlckRhdGEucGFnZVR5cGU7XG4gICAgY29uc3QgY29uZmlndXJhdG9yVHlwZSA9IGNvbmZpZ3VyYXRpb24ub3duZXIuY29uZmlndXJhdG9yVHlwZTtcbiAgICBjb25zdCBpc092ZXJ2aWV3ID0gcGFnZVR5cGUgPT09IENvbmZpZ3VyYXRvclJvdXRlci5QYWdlVHlwZS5PVkVSVklFVztcbiAgICBjb25zdCBpc093bmVyQ2FydEVudHJ5ID1cbiAgICAgIHJvdXRlckRhdGEub3duZXIudHlwZSA9PT0gQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyVHlwZS5DQVJUX0VOVFJZO1xuICAgIGNvbnN0IG93bmVyID0gY29uZmlndXJhdGlvbi5vd25lcjtcblxuICAgIGNvbnN0IGN1cnJlbnRHcm91cCA9IGNvbmZpZ3VyYXRpb24uaW50ZXJhY3Rpb25TdGF0ZS5jdXJyZW50R3JvdXA7XG4gICAgaWYgKGN1cnJlbnRHcm91cCkge1xuICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cHNTZXJ2aWNlLnNldEdyb3VwU3RhdHVzVmlzaXRlZChcbiAgICAgICAgY29uZmlndXJhdGlvbi5vd25lcixcbiAgICAgICAgY3VycmVudEdyb3VwXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5lciRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGNvbnQpID0+ICFjb250Lmhhc1BlbmRpbmdDaGFuZ2VzKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChpc093bmVyQ2FydEVudHJ5KSB7XG4gICAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24uaXNDYXJ0RW50cnlVcGRhdGVSZXF1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JDYXJ0U2VydmljZS51cGRhdGVDYXJ0RW50cnkoY29uZmlndXJhdGlvbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5wZXJmb3JtTmF2aWdhdGlvbihcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRvclR5cGUsXG4gICAgICAgICAgICBvd25lcixcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgaXNPdmVydmlldyxcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uaXNDYXJ0RW50cnlVcGRhdGVSZXF1aXJlZCA/PyBmYWxzZVxuICAgICAgICAgICk7XG4gICAgICAgICAgLy9Pbmx5IHJlbW92ZSBpZiB3ZSBhcmUgb24gY29uZmlndXJhdGlvbiBwYWdlLCBiZWNhdXNlIG9uIGZpbmFsIGNhcnQgbmF2aWdhdGlvbixcbiAgICAgICAgICAvL3RoZSBjb25maWd1cmF0aW9uIHdpbGwgYW55aG93IGJlIHJlbW92ZWRcbiAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5pc0NhcnRFbnRyeVVwZGF0ZVJlcXVpcmVkICYmICFpc092ZXJ2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLnJlbW92ZUNvbmZpZ3VyYXRpb24ob3duZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckNhcnRTZXJ2aWNlLmFkZFRvQ2FydChcbiAgICAgICAgICAgIG93bmVyLmlkLFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgICAgICAgIG93bmVyXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgICAgICAgICAgIC5nZXRDb25maWd1cmF0aW9uKG93bmVyKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAoY29uZmlnV2l0aE5leHRPd25lcikgPT5cbiAgICAgICAgICAgICAgICAgIGNvbmZpZ1dpdGhOZXh0T3duZXIubmV4dE93bmVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgdGFrZSgxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY29uZmlnV2l0aE5leHRPd25lcikgPT4ge1xuICAgICAgICAgICAgICAvL1NlZSBwcmVjZWVkaW5nIGZpbHRlciBvcGVyYXRvcjogY29uZmlnV2l0aE5leHRPd25lci5uZXh0T3duZXIgaXMgYWx3YXlzIGRlZmluZWQgaGVyZVxuICAgICAgICAgICAgICBjb25zdCBuZXh0T3duZXIgPVxuICAgICAgICAgICAgICAgIGNvbmZpZ1dpdGhOZXh0T3duZXIubmV4dE93bmVyID8/XG4gICAgICAgICAgICAgICAgQ29uZmlndXJhdG9yTW9kZWxVdGlscy5jcmVhdGVJbml0aWFsT3duZXIoKTtcblxuICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1OYXZpZ2F0aW9uKFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRvclR5cGUsXG4gICAgICAgICAgICAgICAgbmV4dE93bmVyLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgaXNPdmVydmlldyxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgLy8gd2UgY2xlYW4gdXAgdGhlIGNhcnQgZW50cnkgcmVsYXRlZCBjb25maWd1cmF0aW9uLCBhcyB3ZSBtaWdodCBoYXZlIGFcbiAgICAgICAgICAgICAgLy8gY29uZmlndXJhdGlvbiBmb3IgdGhlIHNhbWUgY2FydCBlbnRyeSBudW1iZXIgc3RvcmVkIGFscmVhZHkuXG4gICAgICAgICAgICAgIC8vIChDYXJ0IGVudHJpZXMgbWlnaHQgaGF2ZSBiZWVuIGRlbGV0ZWQpXG5cbiAgICAgICAgICAgICAgLy8gTmVlZHMgdG8gaGFwcGVuIG9ubHkgaWYgd2UgYXJlIG9uIGNvbmZpZ3VyYXRpb24gcGFnZSwgbmF2aWdhdGlvbiB0b1xuICAgICAgICAgICAgICAvLyBjYXJ0IHdpbGwgYW55aG93IGRlbGV0ZVxuXG4gICAgICAgICAgICAgIC8vIHdlIGRvIG5vdCBjbGVhbiB1cCB0aGUgcHJvZHVjdCBib3VuZCBjb25maWd1cmF0aW9uIHlldCwgYXMgZXhpc3RpbmdcbiAgICAgICAgICAgICAgLy8gb2JzZXJ2YWJsZXMgd291bGQgaW5zdGFudGx5IHRyaWdnZXIgYSByZS1jcmVhdGUuXG4gICAgICAgICAgICAgIC8vIENsZWFuaW5nIHVwIHRoaXMgb2Jzb2xldGUgcHJvZHVjdCBib3VuZCBjb25maWd1cmF0aW9uIHdpbGwgb25seSBoYXBwZW5cbiAgICAgICAgICAgICAgLy8gd2hlbiBhIG5ldyBjb25maWcgZm9ybSByZXF1ZXN0cyBhIG5ldyBvYnNlcnZhYmxlIGZvciBhIHByb2R1Y3QgYm91bmRcbiAgICAgICAgICAgICAgLy8gY29uZmlndXJhdGlvblxuICAgICAgICAgICAgICBpZiAoIWlzT3ZlcnZpZXcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLnJlbW92ZUNvbmZpZ3VyYXRpb24obmV4dE93bmVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIGxlYXZlQ29uZmlndXJhdGlvbk92ZXJ2aWV3KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGFpbmVyJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoY29udGFpbmVyKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNvbnRhaW5lci5yb3V0ZXJEYXRhLm93bmVyLnR5cGUgPT09XG4gICAgICAgIENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclR5cGUuT1JERVJfRU5UUllcbiAgICAgICkge1xuICAgICAgICB0aGlzLmdvVG9PcmRlckRldGFpbHMoY29udGFpbmVyLnJvdXRlckRhdGEub3duZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdjaGVja291dFJldmlld09yZGVyJyB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnb1RvT3JkZXJEZXRhaWxzKG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIpOiB2b2lkIHtcbiAgICB0aGlzLm9yZGVySGlzdG9yeUZhY2FkZS5sb2FkT3JkZXJEZXRhaWxzKFxuICAgICAgdGhpcy5jb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZGVjb21wb3NlT3duZXJJZChvd25lci5pZCkuZG9jdW1lbnRJZFxuICAgICk7XG4gICAgdGhpcy5vcmRlckhpc3RvcnlGYWNhZGVcbiAgICAgIC5nZXRPcmRlckRldGFpbHMoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigob3JkZXI6IE9yZGVyKSA9PiBvcmRlciAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgob3JkZXI6IE9yZGVyKSA9PlxuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHsgY3hSb3V0ZTogJ29yZGVyRGV0YWlscycsIHBhcmFtczogb3JkZXIgfSlcbiAgICAgICk7XG4gIH1cblxuICBleHRyYWN0Q29uZmlnUHJpY2VzKGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uKSB7XG4gICAgbGV0IHByaWNlU3VtbWFyeSA9IGNvbmZpZ3VyYXRpb24ucHJpY2VTdW1tYXJ5O1xuICAgIGxldCBiYXNlUHJpY2UgPSBwcmljZVN1bW1hcnk/LmJhc2VQcmljZT8uZm9ybWF0dGVkVmFsdWU7XG4gICAgbGV0IHNlbGVjdGVkT3B0aW9ucyA9IHByaWNlU3VtbWFyeT8uc2VsZWN0ZWRPcHRpb25zPy5mb3JtYXR0ZWRWYWx1ZTtcbiAgICBsZXQgdG90YWxQcmljZSA9IHByaWNlU3VtbWFyeT8uY3VycmVudFRvdGFsPy5mb3JtYXR0ZWRWYWx1ZTtcbiAgICBsZXQgcHJpY2VzID0ge1xuICAgICAgYmFzZVByaWNlOiBiYXNlUHJpY2UsXG4gICAgICBzZWxlY3RlZE9wdGlvbnM6IHNlbGVjdGVkT3B0aW9ucyxcbiAgICAgIHRvdGFsUHJpY2U6IHRvdGFsUHJpY2UsXG4gICAgfTtcbiAgICBpZiAoIWJhc2VQcmljZSB8fCBiYXNlUHJpY2UgPT09ICctJykge1xuICAgICAgcHJpY2VzLmJhc2VQcmljZSA9ICcwJztcbiAgICB9XG4gICAgaWYgKCFzZWxlY3RlZE9wdGlvbnMgfHwgc2VsZWN0ZWRPcHRpb25zID09PSAnLScpIHtcbiAgICAgIHByaWNlcy5zZWxlY3RlZE9wdGlvbnMgPSAnMCc7XG4gICAgfVxuICAgIGlmICghdG90YWxQcmljZSB8fCB0b3RhbFByaWNlID09PSAnLScpIHtcbiAgICAgIHByaWNlcy50b3RhbFByaWNlID0gJzAnO1xuICAgIH1cbiAgICByZXR1cm4gcHJpY2VzO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1ha2VBZGRUb0NhcnRCdXR0b25TdGlja3koKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9uczogSW50ZXJzZWN0aW9uT3B0aW9ucyA9IHsgcm9vdE1hcmdpbjogJzBweCAwcHggLTEwMHB4IDBweCcgfTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY29udGFpbmVyJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIGRlbGF5KDApLFxuICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLmNvbmZpZ1V0aWxzLmdldEVsZW1lbnQoJy5jeC1wcmljZS1zdW1tYXJ5LWNvbnRhaW5lcicpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKHByaWNlU3VtbWFyeSkgPT5cbiAgICAgICAgICAgIHByaWNlU3VtbWFyeVxuICAgICAgICAgICAgICA/IHRoaXMuaW50ZXJzZWN0aW9uU2VydmljZS5pc0ludGVyc2VjdGluZyhwcmljZVN1bW1hcnksIG9wdGlvbnMpXG4gICAgICAgICAgICAgIDogb2YodW5kZWZpbmVkKVxuICAgICAgICAgICksXG4gICAgICAgICAgZmlsdGVyKChpc0ludGVyc2VjdGluZykgPT4gaXNJbnRlcnNlY3RpbmcgIT09IHVuZGVmaW5lZClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChpc0ludGVyc2VjdGluZykgPT4ge1xuICAgICAgICAgIGlmIChpc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5jb25maWdVdGlscy5jaGFuZ2VTdHlsaW5nKFxuICAgICAgICAgICAgICAnY3gtY29uZmlndXJhdG9yLWFkZC10by1jYXJ0LWJ1dHRvbicsXG4gICAgICAgICAgICAgICdwb3NpdGlvbicsXG4gICAgICAgICAgICAgICdzdGlja3knXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ1V0aWxzLmNoYW5nZVN0eWxpbmcoXG4gICAgICAgICAgICAgICdjeC1jb25maWd1cmF0b3ItYWRkLXRvLWNhcnQtYnV0dG9uJyxcbiAgICAgICAgICAgICAgJ3Bvc2l0aW9uJyxcbiAgICAgICAgICAgICAgJ2ZpeGVkJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGFpbmVyJCB8IGFzeW5jIGFzIGNvbnRhaW5lclwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbnRhaW5lci5yb3V0ZXJEYXRhLmRpc3BsYXlPbmx5OyBlbHNlIGRpc3BsYXlPbmx5XCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LWFkZC10by1jYXJ0LWJ0bi1jb250YWluZXJcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3M9XCJjeC1idG4gYnRuIGJ0bi1ibG9jayBidG4tcHJpbWFyeSBjeC1hZGQtdG8tY2FydC1idG5cIlxuICAgICAgICAoY2xpY2spPVwib25BZGRUb0NhcnQoY29udGFpbmVyLmNvbmZpZ3VyYXRpb24sIGNvbnRhaW5lci5yb3V0ZXJEYXRhKVwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiXG4gICAgICAgICAgKGdldEJ1dHRvblJlc291cmNlS2V5KGNvbnRhaW5lci5yb3V0ZXJEYXRhLCBjb250YWluZXIuY29uZmlndXJhdGlvbilcbiAgICAgICAgICAgIHwgY3hUcmFuc2xhdGUpICtcbiAgICAgICAgICAnICcgK1xuICAgICAgICAgICgnY29uZmlndXJhdG9yLmExMXkuYWRkVG9DYXJ0UHJpY2VzJ1xuICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZTogZXh0cmFjdENvbmZpZ1ByaWNlcyhjb250YWluZXIuY29uZmlndXJhdGlvbikpXG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIHt7XG4gICAgICAgICAgZ2V0QnV0dG9uUmVzb3VyY2VLZXkoY29udGFpbmVyLnJvdXRlckRhdGEsIGNvbnRhaW5lci5jb25maWd1cmF0aW9uKVxuICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZVxuICAgICAgICB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuICA8bmctdGVtcGxhdGUgI2Rpc3BsYXlPbmx5PlxuICAgIDxkaXYgY2xhc3M9XCJjeC1kaXNwbGF5LW9ubHktYnRuLWNvbnRhaW5lclwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzcz1cImN4LWJ0biBidG4gYnRuLWJsb2NrIGJ0bi1wcmltYXJ5IGN4LWRpc3BsYXktb25seS1idG5cIlxuICAgICAgICAoY2xpY2spPVwibGVhdmVDb25maWd1cmF0aW9uT3ZlcnZpZXcoKVwiXG4gICAgICA+XG4gICAgICAgIHt7ICdjb25maWd1cmF0b3IuYWRkVG9DYXJ0LmJ1dHRvbkRpc3BsYXlPbmx5JyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctY29udGFpbmVyPlxuIl19