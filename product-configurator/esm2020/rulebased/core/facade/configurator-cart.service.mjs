/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, } from '@spartacus/core';
import { delayWhen, filter, map, take, tap } from 'rxjs/operators';
import { ConfiguratorActions } from '../state/actions/index';
import { ConfiguratorSelectors } from '../state/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/product-configurator/common";
import * as i4 from "@spartacus/checkout/base/root";
import * as i5 from "@spartacus/core";
import * as i6 from "./utils/configurator-utils.service";
export class ConfiguratorCartService {
    constructor(store, activeCartService, commonConfigUtilsService, 
    // TODO:#checkout - handle the breaking changes
    checkoutQueryFacade, userIdService, configuratorUtilsService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.userIdService = userIdService;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Reads a configuratiom that is attached to a cart entry, dispatching the respective action
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(owner.key)), 
        //needed as we cannot read the cart in general and for the OV
        //in parallel, this can lead to cache issues with promotions
        delayWhen(() => this.activeCartService.isStable().pipe(filter((stable) => stable))), delayWhen(() => this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => state.loading), filter((loading) => !loading))), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                this.activeCartService
                    .requireLoadedCart()
                    .pipe(take(1))
                    .subscribe((cart) => {
                    this.userIdService
                        .getUserId()
                        .pipe(take(1))
                        .subscribe((userId) => {
                        const readFromCartEntryParameters = {
                            userId: userId,
                            cartId: this.commonConfigUtilsService.getCartId(cart),
                            cartEntryNumber: owner.id,
                            owner: owner,
                        };
                        this.store.dispatch(new ConfiguratorActions.ReadCartEntryConfiguration(readFromCartEntryParameters));
                    });
                });
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Reads a configuratiom that is attached to an order entry, dispatching the respective action
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForOrderEntry(owner) {
        return this.store.pipe(select(ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                const ownerIdParts = this.commonConfigUtilsService.decomposeOwnerId(owner.id);
                const readFromOrderEntryParameters = {
                    userId: OCC_USER_ID_CURRENT,
                    orderId: ownerIdParts.documentId,
                    orderEntryNumber: ownerIdParts.entryNumber,
                    owner: owner,
                };
                this.store.dispatch(new ConfiguratorActions.ReadOrderEntryConfiguration(readFromOrderEntryParameters));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
     *
     * @param productCode - Product code
     * @param configId - Configuration ID
     * @param owner Configuration owner
     */
    addToCart(productCode, configId, owner) {
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
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    productCode: productCode,
                    quantity: 1,
                    configId: configId,
                    owner: owner,
                };
                this.store.dispatch(new ConfiguratorActions.AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by the configuration.
     * The cart entry number for the entry that owns the configuration can be told
     * from the configuration's owner ID
     *
     * @param configuration - Configuration
     */
    updateCartEntry(configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const parameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    cartEntryNumber: configuration.owner.id,
                    configuration: configuration,
                };
                this.store.dispatch(new ConfiguratorActions.UpdateCartEntry(parameters));
            });
        });
    }
    /**
     * Can be used to check if the active cart has any product configuration issues.
     * @returns True if and only if there is at least one cart entry with product configuration issues
     */
    activeCartHasIssues() {
        return this.activeCartService.requireLoadedCart().pipe(map((cart) => {
            return cart ? cart.entries : [];
        }), map((entries) => entries
            ? entries.filter((entry) => this.commonConfigUtilsService.getNumberOfIssues(entry))
            : []), map((entries) => entries.length > 0));
    }
    /**
     * Remove all configurations that are linked to cart entries
     */
    removeCartBoundConfigurations() {
        this.store.dispatch(new ConfiguratorActions.RemoveCartBoundConfigurations());
    }
    isConfigurationCreated(configuration) {
        const configId = configuration.configId;
        return configId.length !== 0;
    }
    configurationNeedsReading(configurationState) {
        const configuration = configurationState.value;
        return (configuration === undefined ||
            (!this.isConfigurationCreated(configuration) &&
                !configurationState.loading &&
                !configurationState.error));
    }
}
ConfiguratorCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i3.CommonConfiguratorUtilsService }, { token: i4.CheckoutQueryFacade }, { token: i5.UserIdService }, { token: i6.ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i3.CommonConfiguratorUtilsService }, { type: i4.CheckoutQueryFacade }, { type: i5.UserIdService }, { type: i6.ConfiguratorUtilsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNhcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9mYWNhZGUvY29uZmlndXJhdG9yLWNhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBRzVDLE9BQU8sRUFDTCxtQkFBbUIsR0FHcEIsTUFBTSxpQkFBaUIsQ0FBQztBQU16QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQUlqRSxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQ1ksS0FBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLHdCQUF3RDtJQUNsRSwrQ0FBK0M7SUFDckMsbUJBQXdDLEVBQ3hDLGFBQTRCLEVBQzVCLHdCQUFrRDtRQU5sRCxVQUFLLEdBQUwsS0FBSyxDQUE4QjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBZ0M7UUFFeEQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQzNELENBQUM7SUFFSjs7OztPQUlHO0lBQ0gsNkJBQTZCLENBQzNCLEtBQStCO1FBRS9CLE9BQU8sSUFBSSxDQUFDLEtBQUss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LENBQ2QsT0FBTztZQUNMLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDdkIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUN2RDtZQUNILENBQUMsQ0FBQyxFQUFFLENBQ1AsRUFDRCxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBNkI7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLElBQUksbUJBQW1CLENBQUMsNkJBQTZCLEVBQUUsQ0FDeEQsQ0FBQztJQUNKLENBQUM7SUFFUyxzQkFBc0IsQ0FDOUIsYUFBeUM7UUFFekMsTUFBTSxRQUFRLEdBQVcsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNoRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFUyx5QkFBeUIsQ0FDakMsa0JBQXNFO1FBRXRFLE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQztRQUMvQyxPQUFPLENBQ0wsYUFBYSxLQUFLLFNBQVM7WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7Z0JBQzFDLENBQUMsa0JBQWtCLENBQUMsT0FBTztnQkFDM0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FDN0IsQ0FBQztJQUNKLENBQUM7O29IQXpPVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQURWLE1BQU07MkZBQ25CLHVCQUF1QjtrQkFEbkMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ2hlY2tvdXRRdWVyeUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIE9DQ19VU0VSX0lEX0NVUlJFTlQsXG4gIFN0YXRlVXRpbHMsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBDb21tb25Db25maWd1cmF0b3IsXG4gIENvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXlXaGVuLCBmaWx0ZXIsIG1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aENvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3N0YXRlL2NvbmZpZ3VyYXRvci1zdGF0ZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JTZWxlY3RvcnMgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy9jb25maWd1cmF0b3ItdXRpbHMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQ2FydFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENvbmZpZ3VyYXRvcj4sXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjb21tb25Db25maWdVdGlsc1NlcnZpY2U6IENvbW1vbkNvbmZpZ3VyYXRvclV0aWxzU2VydmljZSxcbiAgICAvLyBUT0RPOiNjaGVja291dCAtIGhhbmRsZSB0aGUgYnJlYWtpbmcgY2hhbmdlc1xuICAgIHByb3RlY3RlZCBjaGVja291dFF1ZXJ5RmFjYWRlOiBDaGVja291dFF1ZXJ5RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JVdGlsc1NlcnZpY2U6IENvbmZpZ3VyYXRvclV0aWxzU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJlYWRzIGEgY29uZmlndXJhdGlvbSB0aGF0IGlzIGF0dGFjaGVkIHRvIGEgY2FydCBlbnRyeSwgZGlzcGF0Y2hpbmcgdGhlIHJlc3BlY3RpdmUgYWN0aW9uXG4gICAqIEBwYXJhbSBvd25lciBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgcHJvZHVjdCBjb25maWd1cmF0aW9uc1xuICAgKi9cbiAgcmVhZENvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnkoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgQ29uZmlndXJhdG9yU2VsZWN0b3JzLmdldENvbmZpZ3VyYXRpb25Qcm9jZXNzTG9hZGVyU3RhdGVGYWN0b3J5KFxuICAgICAgICAgIG93bmVyLmtleVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgLy9uZWVkZWQgYXMgd2UgY2Fubm90IHJlYWQgdGhlIGNhcnQgaW4gZ2VuZXJhbCBhbmQgZm9yIHRoZSBPVlxuICAgICAgLy9pbiBwYXJhbGxlbCwgdGhpcyBjYW4gbGVhZCB0byBjYWNoZSBpc3N1ZXMgd2l0aCBwcm9tb3Rpb25zXG4gICAgICBkZWxheVdoZW4oKCkgPT5cbiAgICAgICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5pc1N0YWJsZSgpLnBpcGUoZmlsdGVyKChzdGFibGUpID0+IHN0YWJsZSkpXG4gICAgICApLFxuICAgICAgZGVsYXlXaGVuKCgpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRRdWVyeUZhY2FkZS5nZXRDaGVja291dERldGFpbHNTdGF0ZSgpLnBpcGUoXG4gICAgICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUubG9hZGluZyksXG4gICAgICAgICAgZmlsdGVyKChsb2FkaW5nKSA9PiAhbG9hZGluZylcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIHRhcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb25OZWVkc1JlYWRpbmcoY29uZmlndXJhdGlvblN0YXRlKSkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2VcbiAgICAgICAgICAgIC5yZXF1aXJlTG9hZGVkQ2FydCgpXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2FydCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZEZyb21DYXJ0RW50cnlQYXJhbWV0ZXJzOiBDb21tb25Db25maWd1cmF0b3IuUmVhZENvbmZpZ3VyYXRpb25Gcm9tQ2FydEVudHJ5UGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0SWQ6IHRoaXMuY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlLmdldENhcnRJZChjYXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0RW50cnlOdW1iZXI6IG93bmVyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgIG93bmVyOiBvd25lcixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLlJlYWRDYXJ0RW50cnlDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgIHJlYWRGcm9tQ2FydEVudHJ5UGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoY29uZmlndXJhdGlvblN0YXRlKSA9PlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25TdGF0ZS52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgdGhpcy5pc0NvbmZpZ3VyYXRpb25DcmVhdGVkKGNvbmZpZ3VyYXRpb25TdGF0ZS52YWx1ZSlcbiAgICAgICksXG4gICAgICAvL3NhdmUgdG8gYXNzdW1lIGNvbmZpZ3VyYXRpb24gaXMgZGVmaW5lZCBhZnRlciBwcmV2aW91cyBmaWx0ZXJcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvblN0YXRlKSA9PlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRDb25maWd1cmF0aW9uRnJvbVN0YXRlKFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25TdGF0ZVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuICAvKipcbiAgICogUmVhZHMgYSBjb25maWd1cmF0aW9tIHRoYXQgaXMgYXR0YWNoZWQgdG8gYW4gb3JkZXIgZW50cnksIGRpc3BhdGNoaW5nIHRoZSByZXNwZWN0aXZlIGFjdGlvblxuICAgKiBAcGFyYW0gb3duZXIgQ29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIHByb2R1Y3QgY29uZmlndXJhdGlvbnNcbiAgICovXG4gIHJlYWRDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeShcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBDb25maWd1cmF0b3JTZWxlY3RvcnMuZ2V0Q29uZmlndXJhdGlvblByb2Nlc3NMb2FkZXJTdGF0ZUZhY3RvcnkoXG4gICAgICAgICAgb3duZXIua2V5XG4gICAgICAgIClcbiAgICAgICksXG4gICAgICB0YXAoKGNvbmZpZ3VyYXRpb25TdGF0ZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uTmVlZHNSZWFkaW5nKGNvbmZpZ3VyYXRpb25TdGF0ZSkpIHtcbiAgICAgICAgICBjb25zdCBvd25lcklkUGFydHMgPSB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5kZWNvbXBvc2VPd25lcklkKFxuICAgICAgICAgICAgb3duZXIuaWRcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHJlYWRGcm9tT3JkZXJFbnRyeVBhcmFtZXRlcnM6IENvbW1vbkNvbmZpZ3VyYXRvci5SZWFkQ29uZmlndXJhdGlvbkZyb21PcmRlckVudHJ5UGFyYW1ldGVycyA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVzZXJJZDogT0NDX1VTRVJfSURfQ1VSUkVOVCxcbiAgICAgICAgICAgICAgb3JkZXJJZDogb3duZXJJZFBhcnRzLmRvY3VtZW50SWQsXG4gICAgICAgICAgICAgIG9yZGVyRW50cnlOdW1iZXI6IG93bmVySWRQYXJ0cy5lbnRyeU51bWJlcixcbiAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuUmVhZE9yZGVyRW50cnlDb25maWd1cmF0aW9uKFxuICAgICAgICAgICAgICByZWFkRnJvbU9yZGVyRW50cnlQYXJhbWV0ZXJzXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChjb25maWd1cmF0aW9uU3RhdGUpID0+XG4gICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlLnZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICB0aGlzLmlzQ29uZmlndXJhdGlvbkNyZWF0ZWQoY29uZmlndXJhdGlvblN0YXRlLnZhbHVlKVxuICAgICAgKSxcbiAgICAgIC8vc2F2ZSB0byBhc3N1bWUgY29uZmlndXJhdGlvbiBpcyBkZWZpbmVkIGFmdGVyIHByZXZpb3VzIGZpbHRlclxuICAgICAgbWFwKChjb25maWd1cmF0aW9uU3RhdGUpID0+XG4gICAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb25Gcm9tU3RhdGUoXG4gICAgICAgICAgY29uZmlndXJhdGlvblN0YXRlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb25maWd1cmF0aW9uIHRvIHRoZSBjYXJ0LCBzcGVjaWZpZWQgYnkgdGhlIHByb2R1Y3QgY29kZSwgYSBjb25maWd1cmF0aW9uIElEIGFuZCBjb25maWd1cmF0aW9uIG93bmVyIGtleS5cbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlIC0gUHJvZHVjdCBjb2RlXG4gICAqIEBwYXJhbSBjb25maWdJZCAtIENvbmZpZ3VyYXRpb24gSURcbiAgICogQHBhcmFtIG93bmVyIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICovXG4gIGFkZFRvQ2FydChcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIGNvbmZpZ0lkOiBzdHJpbmcsXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlXG4gICAgICAucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNhcnQpID0+IHtcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgICAgLmdldFVzZXJJZCgpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZFRvQ2FydFBhcmFtZXRlcnM6IENvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgY2FydElkOiB0aGlzLmNvbW1vbkNvbmZpZ1V0aWxzU2VydmljZS5nZXRDYXJ0SWQoY2FydCksXG4gICAgICAgICAgICAgIHByb2R1Y3RDb2RlOiBwcm9kdWN0Q29kZSxcbiAgICAgICAgICAgICAgcXVhbnRpdHk6IDEsXG4gICAgICAgICAgICAgIGNvbmZpZ0lkOiBjb25maWdJZCxcbiAgICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLkFkZFRvQ2FydChhZGRUb0NhcnRQYXJhbWV0ZXJzKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBjYXJ0IGVudHJ5LCBzcGVjaWZpZWQgYnkgdGhlIGNvbmZpZ3VyYXRpb24uXG4gICAqIFRoZSBjYXJ0IGVudHJ5IG51bWJlciBmb3IgdGhlIGVudHJ5IHRoYXQgb3ducyB0aGUgY29uZmlndXJhdGlvbiBjYW4gYmUgdG9sZFxuICAgKiBmcm9tIHRoZSBjb25maWd1cmF0aW9uJ3Mgb3duZXIgSURcbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqL1xuICB1cGRhdGVDYXJ0RW50cnkoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlXG4gICAgICAucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNhcnQpID0+IHtcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgICAgLmdldFVzZXJJZCgpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtZXRlcnM6IENvbmZpZ3VyYXRvci5VcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICAgICAgICBjYXJ0SWQ6IHRoaXMuY29tbW9uQ29uZmlnVXRpbHNTZXJ2aWNlLmdldENhcnRJZChjYXJ0KSxcbiAgICAgICAgICAgICAgICBjYXJ0RW50cnlOdW1iZXI6IGNvbmZpZ3VyYXRpb24ub3duZXIuaWQsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbjogY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuVXBkYXRlQ2FydEVudHJ5KHBhcmFtZXRlcnMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIENhbiBiZSB1c2VkIHRvIGNoZWNrIGlmIHRoZSBhY3RpdmUgY2FydCBoYXMgYW55IHByb2R1Y3QgY29uZmlndXJhdGlvbiBpc3N1ZXMuXG4gICAqIEByZXR1cm5zIFRydWUgaWYgYW5kIG9ubHkgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGNhcnQgZW50cnkgd2l0aCBwcm9kdWN0IGNvbmZpZ3VyYXRpb24gaXNzdWVzXG4gICAqL1xuICBhY3RpdmVDYXJ0SGFzSXNzdWVzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLnJlcXVpcmVMb2FkZWRDYXJ0KCkucGlwZShcbiAgICAgIG1hcCgoY2FydCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FydCA/IGNhcnQuZW50cmllcyA6IFtdO1xuICAgICAgfSksXG4gICAgICBtYXAoKGVudHJpZXMpID0+XG4gICAgICAgIGVudHJpZXNcbiAgICAgICAgICA/IGVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT5cbiAgICAgICAgICAgICAgdGhpcy5jb21tb25Db25maWdVdGlsc1NlcnZpY2UuZ2V0TnVtYmVyT2ZJc3N1ZXMoZW50cnkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBbXVxuICAgICAgKSxcbiAgICAgIG1hcCgoZW50cmllcykgPT4gZW50cmllcy5sZW5ndGggPiAwKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjb25maWd1cmF0aW9ucyB0aGF0IGFyZSBsaW5rZWQgdG8gY2FydCBlbnRyaWVzXG4gICAqL1xuICByZW1vdmVDYXJ0Qm91bmRDb25maWd1cmF0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuUmVtb3ZlQ2FydEJvdW5kQ29uZmlndXJhdGlvbnMoKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb25maWd1cmF0aW9uQ3JlYXRlZChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBjb25maWdJZDogU3RyaW5nID0gY29uZmlndXJhdGlvbi5jb25maWdJZDtcbiAgICByZXR1cm4gY29uZmlnSWQubGVuZ3RoICE9PSAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRpb25OZWVkc1JlYWRpbmcoXG4gICAgY29uZmlndXJhdGlvblN0YXRlOiBTdGF0ZVV0aWxzLkxvYWRlclN0YXRlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPlxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvblN0YXRlLnZhbHVlO1xuICAgIHJldHVybiAoXG4gICAgICBjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHxcbiAgICAgICghdGhpcy5pc0NvbmZpZ3VyYXRpb25DcmVhdGVkKGNvbmZpZ3VyYXRpb24pICYmXG4gICAgICAgICFjb25maWd1cmF0aW9uU3RhdGUubG9hZGluZyAmJlxuICAgICAgICAhY29uZmlndXJhdGlvblN0YXRlLmVycm9yKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==