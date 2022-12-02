/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { ConfiguratorModelUtils, } from '@spartacus/product-configurator/common';
import { filter, map, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../state/actions/index';
import { ConfiguratorTextFieldSelectors } from '../state/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/product-configurator/common";
import * as i4 from "@spartacus/core";
export class ConfiguratorTextfieldService {
    constructor(store, activeCartService, configuratorUtils, userIdService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.configuratorUtils = configuratorUtils;
        this.userIdService = userIdService;
    }
    /**
     * Creates a default textfield configuration for a product specified by the configuration owner.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    createConfiguration(owner) {
        return this.store.pipe(select(ConfiguratorTextFieldSelectors.getConfigurationsState), tap((configurationState) => {
            const configuration = configurationState.loaderState.value;
            const isAvailableForProduct = configuration !== undefined &&
                !ConfiguratorModelUtils.isInitialOwner(configuration.owner);
            const isLoading = configurationState.loaderState.loading;
            if (!isAvailableForProduct && !isLoading) {
                this.store.dispatch(new ConfiguratorTextfieldActions.CreateConfiguration({
                    productCode: owner.id,
                    owner: owner,
                }));
            }
        }), map((configurationState) => configurationState.loaderState.value), filter((configuration) => !this.isConfigurationInitial(configuration)), 
        //save to assume configuration is defined, see previous filter
        map((configuration) => configuration ?? {
            configurationInfos: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
        }));
    }
    /**
     * Updates a textfield configuration, specified by the changed attribute.
     *
     * @param changedAttribute - Changed attribute
     */
    updateConfiguration(changedAttribute) {
        this.store
            .pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent), take(1))
            .subscribe((oldConfiguration) => {
            if (oldConfiguration) {
                this.store.dispatch(new ConfiguratorTextfieldActions.UpdateConfiguration(this.createNewConfigurationWithChange(changedAttribute, oldConfiguration)));
            }
        });
    }
    /**
     * Adds the textfield configuration to the cart
     *
     * @param productCode - Product code of the configuration root product. Cart entry carries refers to this product
     * @param configuration Textfield configuration
     */
    addToCart(productCode, configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const addToCartParameters = {
                    userId: userId,
                    cartId: this.configuratorUtils.getCartId(cart),
                    productCode: productCode,
                    configuration: configuration,
                    quantity: 1,
                };
                this.store.dispatch(new ConfiguratorTextfieldActions.AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by its cart entry number.
     *
     * @param cartEntryNumber - Cart entry number
     * @param configuration Textfield configuration (list of alphanumeric attributes)
     */
    updateCartEntry(cartEntryNumber, configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const updateCartParameters = {
                    userId: userId,
                    cartId: this.configuratorUtils.getCartId(cart),
                    cartEntryNumber: cartEntryNumber,
                    configuration: configuration,
                };
                this.store.dispatch(new ConfiguratorTextfieldActions.UpdateCartEntryConfiguration(updateCartParameters));
            });
        });
    }
    /**
     * Returns a textfield configuration for a cart entry.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForCartEntry(owner) {
        return this.activeCartService.requireLoadedCart().pipe(switchMap((cart) => this.userIdService
            .getUserId()
            .pipe(take(1), map((userId) => ({ cart, userId: userId })))
            .pipe(map((cont) => ({
            userId: cont.userId,
            cartId: this.configuratorUtils.getCartId(cont.cart),
            cartEntryNumber: owner.id,
            owner: owner,
        })), tap((readFromCartEntryParameters) => this.store.dispatch(new ConfiguratorTextfieldActions.ReadCartEntryConfiguration(readFromCartEntryParameters))), switchMapTo(this.store.pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent))), filter((configuration) => !this.isConfigurationInitial(configuration)), 
        //save to assume that the configuration exists, see previous filter
        map((configuration) => configuration
            ? configuration
            : {
                configurationInfos: [],
                owner: ConfiguratorModelUtils.createInitialOwner(),
            }))));
    }
    /**
     * Returns the textfield configuration attached to an order entry.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForOrderEntry(owner) {
        const ownerIdParts = this.configuratorUtils.decomposeOwnerId(owner.id);
        const readFromOrderEntryParameters = {
            userId: OCC_USER_ID_CURRENT,
            orderId: ownerIdParts.documentId,
            orderEntryNumber: ownerIdParts.entryNumber,
            owner: owner,
        };
        this.store.dispatch(new ConfiguratorTextfieldActions.ReadOrderEntryConfiguration(readFromOrderEntryParameters));
        return this.store.pipe(select(ConfiguratorTextFieldSelectors.getConfigurationContent), filter((configuration) => !this.isConfigurationInitial(configuration)), map((configuration) => configuration
            ? configuration
            : {
                configurationInfos: [],
                owner: ConfiguratorModelUtils.createInitialOwner(),
            }));
    }
    /**
     * Creates a textfield configuration supposed to be sent to the backend when an attribute
     * has been changed
     * @param changedAttribute Attribute changed by the end user
     * @param oldConfiguration Existing configuration to which the attribute change is applied to
     * @returns Textfield configuration (merge of existing configuration and the changed attribute)
     */
    createNewConfigurationWithChange(changedAttribute, oldConfiguration) {
        const newConfiguration = {
            configurationInfos: [],
            owner: oldConfiguration.owner,
        };
        oldConfiguration.configurationInfos.forEach((info) => {
            if (info.configurationLabel === changedAttribute.configurationLabel) {
                changedAttribute.status =
                    ConfiguratorTextfield.ConfigurationStatus.SUCCESS;
                newConfiguration.configurationInfos.push(changedAttribute);
            }
            else {
                newConfiguration.configurationInfos.push(info);
            }
        });
        return newConfiguration;
    }
    isConfigurationInitial(configuration) {
        return (configuration === undefined ||
            ConfiguratorModelUtils.isInitialOwner(configuration.owner));
    }
}
ConfiguratorTextfieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTextfieldService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i3.CommonConfiguratorUtilsService }, { token: i4.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorTextfieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTextfieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorTextfieldService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i3.CommonConfiguratorUtilsService }, { type: i4.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXRleHRmaWVsZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3RleHRmaWVsZC9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItdGV4dGZpZWxkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUsbUJBQW1CLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFDckUsT0FBTyxFQUdMLHNCQUFzQixHQUN2QixNQUFNLHdDQUF3QyxDQUFDO0FBRWhELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFLMUUsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxZQUNZLEtBQTZDLEVBQzdDLGlCQUFtQyxFQUNuQyxpQkFBaUQsRUFDakQsYUFBNEI7UUFINUIsVUFBSyxHQUFMLEtBQUssQ0FBd0M7UUFDN0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWdDO1FBQ2pELGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ3JDLENBQUM7SUFFSjs7Ozs7O09BTUc7SUFDSCxtQkFBbUIsQ0FDakIsS0FBK0I7UUFFL0IsT0FBTyxJQUFJLENB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Q0FBQyxDQUFDO2FBQ2hEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFUyxzQkFBc0IsQ0FDOUIsYUFBbUQ7UUFFbkQsT0FBTyxDQUNMLGFBQWEsS0FBSyxTQUFTO1lBQzNCLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQzNELENBQUM7SUFDSixDQUFDOzt5SEExUVUsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FGM0IsTUFBTTsyRkFFUCw0QkFBNEI7a0JBSHhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE9DQ19VU0VSX0lEX0NVUlJFTlQsIFVzZXJJZFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29tbW9uQ29uZmlndXJhdG9yLFxuICBDb21tb25Db25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gIENvbmZpZ3VyYXRvck1vZGVsVXRpbHMsXG59IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHN3aXRjaE1hcFRvLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGQgfSBmcm9tICcuLi9tb2RlbC9jb25maWd1cmF0b3ItdGV4dGZpZWxkLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aENvbmZpZ3VyYXRpb25UZXh0ZmllbGQgfSBmcm9tICcuLi9zdGF0ZS9jb25maWd1cmF0aW9uLXRleHRmaWVsZC1zdGF0ZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0RmllbGRTZWxlY3RvcnMgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yVGV4dGZpZWxkU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoQ29uZmlndXJhdGlvblRleHRmaWVsZD4sXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JVdGlsczogQ29tbW9uQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRlZmF1bHQgdGV4dGZpZWxkIGNvbmZpZ3VyYXRpb24gZm9yIGEgcHJvZHVjdCBzcGVjaWZpZWQgYnkgdGhlIGNvbmZpZ3VyYXRpb24gb3duZXIuXG4gICAqXG4gICAqIEBwYXJhbSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICpcbiAgICogQHJldHVybnMge09ic2VydmFibGU8Q29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb24+fVxuICAgKi9cbiAgY3JlYXRlQ29uZmlndXJhdGlvbihcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KENvbmZpZ3VyYXRvclRleHRGaWVsZFNlbGVjdG9ycy5nZXRDb25maWd1cmF0aW9uc1N0YXRlKSxcbiAgICAgIHRhcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uU3RhdGUubG9hZGVyU3RhdGUudmFsdWU7XG4gICAgICAgIGNvbnN0IGlzQXZhaWxhYmxlRm9yUHJvZHVjdCA9XG4gICAgICAgICAgY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgIUNvbmZpZ3VyYXRvck1vZGVsVXRpbHMuaXNJbml0aWFsT3duZXIoY29uZmlndXJhdGlvbi5vd25lcik7XG4gICAgICAgIGNvbnN0IGlzTG9hZGluZyA9IGNvbmZpZ3VyYXRpb25TdGF0ZS5sb2FkZXJTdGF0ZS5sb2FkaW5nO1xuICAgICAgICBpZiAoIWlzQXZhaWxhYmxlRm9yUHJvZHVjdCAmJiAhaXNMb2FkaW5nKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgIG5ldyBDb25maWd1cmF0b3JUZXh0ZmllbGRBY3Rpb25zLkNyZWF0ZUNvbmZpZ3VyYXRpb24oe1xuICAgICAgICAgICAgICBwcm9kdWN0Q29kZTogb3duZXIuaWQsIC8vb3duZXIgSWQgaXMgdGhlIHByb2R1Y3QgY29kZSBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PiBjb25maWd1cmF0aW9uU3RhdGUubG9hZGVyU3RhdGUudmFsdWUpLFxuICAgICAgZmlsdGVyKChjb25maWd1cmF0aW9uKSA9PiAhdGhpcy5pc0NvbmZpZ3VyYXRpb25Jbml0aWFsKGNvbmZpZ3VyYXRpb24pKSxcbiAgICAgIC8vc2F2ZSB0byBhc3N1bWUgY29uZmlndXJhdGlvbiBpcyBkZWZpbmVkLCBzZWUgcHJldmlvdXMgZmlsdGVyXG4gICAgICBtYXAoXG4gICAgICAgIChjb25maWd1cmF0aW9uKSA9PlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPz8ge1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbkluZm9zOiBbXSxcbiAgICAgICAgICAgIG93bmVyOiBDb25maWd1cmF0b3JNb2RlbFV0aWxzLmNyZWF0ZUluaXRpYWxPd25lcigpLFxuICAgICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiwgc3BlY2lmaWVkIGJ5IHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogQHBhcmFtIGNoYW5nZWRBdHRyaWJ1dGUgLSBDaGFuZ2VkIGF0dHJpYnV0ZVxuICAgKi9cbiAgdXBkYXRlQ29uZmlndXJhdGlvbihcbiAgICBjaGFuZ2VkQXR0cmlidXRlOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbkluZm9cbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZVxuICAgICAgLnBpcGUoXG4gICAgICAgIHNlbGVjdChDb25maWd1cmF0b3JUZXh0RmllbGRTZWxlY3RvcnMuZ2V0Q29uZmlndXJhdGlvbkNvbnRlbnQpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChvbGRDb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvbGRDb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgIG5ldyBDb25maWd1cmF0b3JUZXh0ZmllbGRBY3Rpb25zLlVwZGF0ZUNvbmZpZ3VyYXRpb24oXG4gICAgICAgICAgICAgIHRoaXMuY3JlYXRlTmV3Q29uZmlndXJhdGlvbldpdGhDaGFuZ2UoXG4gICAgICAgICAgICAgICAgY2hhbmdlZEF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBvbGRDb25maWd1cmF0aW9uXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiB0byB0aGUgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgLSBQcm9kdWN0IGNvZGUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gcm9vdCBwcm9kdWN0LiBDYXJ0IGVudHJ5IGNhcnJpZXMgcmVmZXJzIHRvIHRoaXMgcHJvZHVjdFxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiBUZXh0ZmllbGQgY29uZmlndXJhdGlvblxuICAgKi9cbiAgYWRkVG9DYXJ0KFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25cbiAgKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZVxuICAgICAgLnJlcXVpcmVMb2FkZWRDYXJ0KClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChjYXJ0KSA9PiB7XG4gICAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICAgIC5nZXRVc2VySWQoKVxuICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgodXNlcklkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhZGRUb0NhcnRQYXJhbWV0ZXJzOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQWRkVG9DYXJ0UGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgICBjYXJ0SWQ6IHRoaXMuY29uZmlndXJhdG9yVXRpbHMuZ2V0Q2FydElkKGNhcnQpLFxuICAgICAgICAgICAgICAgIHByb2R1Y3RDb2RlOiBwcm9kdWN0Q29kZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uOiBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICAgIHF1YW50aXR5OiAxLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMuQWRkVG9DYXJ0KGFkZFRvQ2FydFBhcmFtZXRlcnMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhIGNhcnQgZW50cnksIHNwZWNpZmllZCBieSBpdHMgY2FydCBlbnRyeSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0RW50cnlOdW1iZXIgLSBDYXJ0IGVudHJ5IG51bWJlclxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiBUZXh0ZmllbGQgY29uZmlndXJhdGlvbiAobGlzdCBvZiBhbHBoYW51bWVyaWMgYXR0cmlidXRlcylcbiAgICovXG4gIHVwZGF0ZUNhcnRFbnRyeShcbiAgICBjYXJ0RW50cnlOdW1iZXI6IHN0cmluZyxcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvblxuICApOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlXG4gICAgICAucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNhcnQpID0+IHtcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgICAgLmdldFVzZXJJZCgpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZUNhcnRQYXJhbWV0ZXJzOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuVXBkYXRlQ2FydEVudHJ5UGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgICBjYXJ0SWQ6IHRoaXMuY29uZmlndXJhdG9yVXRpbHMuZ2V0Q2FydElkKGNhcnQpLFxuICAgICAgICAgICAgICAgIGNhcnRFbnRyeU51bWJlcjogY2FydEVudHJ5TnVtYmVyLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb246IGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICBuZXcgQ29uZmlndXJhdG9yVGV4dGZpZWxkQWN0aW9ucy5VcGRhdGVDYXJ0RW50cnlDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICAgIHVwZGF0ZUNhcnRQYXJhbWV0ZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdGV4dGZpZWxkIGNvbmZpZ3VyYXRpb24gZm9yIGEgY2FydCBlbnRyeS5cbiAgICpcbiAgICogQHBhcmFtIG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbj59XG4gICAqL1xuICByZWFkQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeShcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5yZXF1aXJlTG9hZGVkQ2FydCgpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnQpID0+XG4gICAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICAgIC5nZXRVc2VySWQoKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIG1hcCgodXNlcklkKSA9PiAoeyBjYXJ0LCB1c2VySWQ6IHVzZXJJZCB9KSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbnQpID0+ICh7XG4gICAgICAgICAgICAgIHVzZXJJZDogY29udC51c2VySWQsXG4gICAgICAgICAgICAgIGNhcnRJZDogdGhpcy5jb25maWd1cmF0b3JVdGlscy5nZXRDYXJ0SWQoY29udC5jYXJ0KSxcbiAgICAgICAgICAgICAgY2FydEVudHJ5TnVtYmVyOiBvd25lci5pZCxcbiAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdGFwKChyZWFkRnJvbUNhcnRFbnRyeVBhcmFtZXRlcnMpID0+XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMuUmVhZENhcnRFbnRyeUNvbmZpZ3VyYXRpb24oXG4gICAgICAgICAgICAgICAgICByZWFkRnJvbUNhcnRFbnRyeVBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzd2l0Y2hNYXBUbyhcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5waXBlKFxuICAgICAgICAgICAgICAgIHNlbGVjdChDb25maWd1cmF0b3JUZXh0RmllbGRTZWxlY3RvcnMuZ2V0Q29uZmlndXJhdGlvbkNvbnRlbnQpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgIChjb25maWd1cmF0aW9uKSA9PiAhdGhpcy5pc0NvbmZpZ3VyYXRpb25Jbml0aWFsKGNvbmZpZ3VyYXRpb24pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgLy9zYXZlIHRvIGFzc3VtZSB0aGF0IHRoZSBjb25maWd1cmF0aW9uIGV4aXN0cywgc2VlIHByZXZpb3VzIGZpbHRlclxuICAgICAgICAgICAgbWFwKChjb25maWd1cmF0aW9uKSA9PlxuICAgICAgICAgICAgICBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICAgICAgPyBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvczogW10sXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiBDb25maWd1cmF0b3JNb2RlbFV0aWxzLmNyZWF0ZUluaXRpYWxPd25lcigpLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRleHRmaWVsZCBjb25maWd1cmF0aW9uIGF0dGFjaGVkIHRvIGFuIG9yZGVyIGVudHJ5LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uPn1cbiAgICovXG4gIHJlYWRDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeShcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb24+IHtcbiAgICBjb25zdCBvd25lcklkUGFydHMgPSB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzLmRlY29tcG9zZU93bmVySWQob3duZXIuaWQpO1xuICAgIGNvbnN0IHJlYWRGcm9tT3JkZXJFbnRyeVBhcmFtZXRlcnM6IENvbW1vbkNvbmZpZ3VyYXRvci5SZWFkQ29uZmlndXJhdGlvbkZyb21PcmRlckVudHJ5UGFyYW1ldGVycyA9XG4gICAgICB7XG4gICAgICAgIHVzZXJJZDogT0NDX1VTRVJfSURfQ1VSUkVOVCxcbiAgICAgICAgb3JkZXJJZDogb3duZXJJZFBhcnRzLmRvY3VtZW50SWQsXG4gICAgICAgIG9yZGVyRW50cnlOdW1iZXI6IG93bmVySWRQYXJ0cy5lbnRyeU51bWJlcixcbiAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgfTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENvbmZpZ3VyYXRvclRleHRmaWVsZEFjdGlvbnMuUmVhZE9yZGVyRW50cnlDb25maWd1cmF0aW9uKFxuICAgICAgICByZWFkRnJvbU9yZGVyRW50cnlQYXJhbWV0ZXJzXG4gICAgICApXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KENvbmZpZ3VyYXRvclRleHRGaWVsZFNlbGVjdG9ycy5nZXRDb25maWd1cmF0aW9uQ29udGVudCksXG4gICAgICBmaWx0ZXIoKGNvbmZpZ3VyYXRpb24pID0+ICF0aGlzLmlzQ29uZmlndXJhdGlvbkluaXRpYWwoY29uZmlndXJhdGlvbikpLFxuICAgICAgbWFwKChjb25maWd1cmF0aW9uKSA9PlxuICAgICAgICBjb25maWd1cmF0aW9uXG4gICAgICAgICAgPyBjb25maWd1cmF0aW9uXG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvczogW10sXG4gICAgICAgICAgICAgIG93bmVyOiBDb25maWd1cmF0b3JNb2RlbFV0aWxzLmNyZWF0ZUluaXRpYWxPd25lcigpLFxuICAgICAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB0ZXh0ZmllbGQgY29uZmlndXJhdGlvbiBzdXBwb3NlZCB0byBiZSBzZW50IHRvIHRoZSBiYWNrZW5kIHdoZW4gYW4gYXR0cmlidXRlXG4gICAqIGhhcyBiZWVuIGNoYW5nZWRcbiAgICogQHBhcmFtIGNoYW5nZWRBdHRyaWJ1dGUgQXR0cmlidXRlIGNoYW5nZWQgYnkgdGhlIGVuZCB1c2VyXG4gICAqIEBwYXJhbSBvbGRDb25maWd1cmF0aW9uIEV4aXN0aW5nIGNvbmZpZ3VyYXRpb24gdG8gd2hpY2ggdGhlIGF0dHJpYnV0ZSBjaGFuZ2UgaXMgYXBwbGllZCB0b1xuICAgKiBAcmV0dXJucyBUZXh0ZmllbGQgY29uZmlndXJhdGlvbiAobWVyZ2Ugb2YgZXhpc3RpbmcgY29uZmlndXJhdGlvbiBhbmQgdGhlIGNoYW5nZWQgYXR0cmlidXRlKVxuICAgKi9cbiAgY3JlYXRlTmV3Q29uZmlndXJhdGlvbldpdGhDaGFuZ2UoXG4gICAgY2hhbmdlZEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yVGV4dGZpZWxkLkNvbmZpZ3VyYXRpb25JbmZvLFxuICAgIG9sZENvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICk6IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uIHtcbiAgICBjb25zdCBuZXdDb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3JUZXh0ZmllbGQuQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIGNvbmZpZ3VyYXRpb25JbmZvczogW10sXG4gICAgICBvd25lcjogb2xkQ29uZmlndXJhdGlvbi5vd25lcixcbiAgICB9O1xuICAgIG9sZENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbkluZm9zLmZvckVhY2goKGluZm8pID0+IHtcbiAgICAgIGlmIChpbmZvLmNvbmZpZ3VyYXRpb25MYWJlbCA9PT0gY2hhbmdlZEF0dHJpYnV0ZS5jb25maWd1cmF0aW9uTGFiZWwpIHtcbiAgICAgICAgY2hhbmdlZEF0dHJpYnV0ZS5zdGF0dXMgPVxuICAgICAgICAgIENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uU3RhdHVzLlNVQ0NFU1M7XG4gICAgICAgIG5ld0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbkluZm9zLnB1c2goY2hhbmdlZEF0dHJpYnV0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25JbmZvcy5wdXNoKGluZm8pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBuZXdDb25maWd1cmF0aW9uO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQ29uZmlndXJhdGlvbkluaXRpYWwoXG4gICAgY29uZmlndXJhdGlvbj86IENvbmZpZ3VyYXRvclRleHRmaWVsZC5Db25maWd1cmF0aW9uXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHxcbiAgICAgIENvbmZpZ3VyYXRvck1vZGVsVXRpbHMuaXNJbml0aWFsT3duZXIoY29uZmlndXJhdGlvbi5vd25lcilcbiAgICApO1xuICB9XG59XG4iXX0=