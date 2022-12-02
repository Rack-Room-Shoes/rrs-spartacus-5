import { Injectable } from '@angular/core';
import { CART_MODIFICATION_NORMALIZER, } from '@spartacus/cart/base/root';
import { map } from 'rxjs/operators';
import { CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER, CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, } from './converters/cpq-configurator-occ.converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class CpqConfiguratorOccService {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    addToCart(parameters) {
        const url = this.occEndpointsService.buildUrl('addCpqConfigurationToCart', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
            },
        });
        const occAddToCartParameters = this.converterService.convert(parameters, CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER);
        return this.http
            .post(url, occAddToCartParameters)
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    updateCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('updateCpqConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        const occUpdateCartEntryParameters = this.converterService.convert(parameters, CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER);
        return this.http
            .put(url, occUpdateCartEntryParameters)
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    getConfigIdForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        return this.http.get(url).pipe(map((response) => {
            return response.configId;
        }));
    }
    getConfigIdForOrderEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readCpqConfigurationForOrderEntry', {
            urlParams: {
                userId: parameters.userId,
                orderId: parameters.orderId,
                orderEntryNumber: parameters.orderEntryNumber,
            },
        });
        return this.http.get(url).pipe(map((response) => {
            return response.configId;
        }));
    }
}
CpqConfiguratorOccService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccService, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorOccService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CpqConfiguratorOccService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1vY2Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL29jYy9jcHEtY29uZmlndXJhdG9yLW9jYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLDRCQUE0QixHQUM3QixNQUFNLDJCQUEyQixDQUFDO0FBS25DLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQ0wsdUNBQXVDLEVBQ3ZDLDZDQUE2QyxHQUM5QyxNQUFNLDhDQUE4QyxDQUFDOzs7O0FBR3RELE1BQU0sT0FBTyx5QkFBeUI7SUFDcEMsWUFDWSxJQUFnQixFQUNoQixtQkFBd0MsRUFDeEMsZ0JBQWtDO1FBRmxDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQzNDLENBQUM7SUFFSixTQUFTLENBQ1AsVUFBNEM7UUFFNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtZQUN6RSxTQUFTLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO2dCQUN6QixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07YUFDMUI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQzFELFVBQVUsRUFDVix1Q0FBdUMsQ0FDeEMsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQW1CLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQzthQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGVBQWUsQ0FDYixVQUFrRTtRQUVsRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUMzQyxvQ0FBb0MsRUFDcEM7WUFDRSxTQUFTLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO2dCQUN6QixNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLGVBQWUsRUFBRSxVQUFVLENBQUMsZUFBZTthQUM1QztTQUNGLENBQ0YsQ0FBQztRQUVGLE1BQU0sNEJBQTRCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FDaEUsVUFBVSxFQUNWLDZDQUE2QyxDQUM5QyxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBbUIsR0FBRyxFQUFFLDRCQUE0QixDQUFDO2FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsdUJBQXVCLENBQ3JCLFVBQXVFO1FBRXZFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQzNDLGtDQUFrQyxFQUNsQztZQUNFLFNBQVMsRUFBRTtnQkFDVCxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtnQkFDekIsZUFBZSxFQUFFLFVBQVUsQ0FBQyxlQUFlO2FBQzVDO1NBQ0YsQ0FDRixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBdUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNsRCxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNmLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHdCQUF3QixDQUN0QixVQUF3RTtRQUV4RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUMzQyxtQ0FBbUMsRUFDbkM7WUFDRSxTQUFTLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO2dCQUN6QixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQzNCLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxnQkFBZ0I7YUFDOUM7U0FDRixDQUNGLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ2xELEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2YsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOztzSEEzRlUseUJBQXlCOzBIQUF6Qix5QkFBeUIsY0FEWixNQUFNOzJGQUNuQix5QkFBeUI7a0JBRHJDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhcnRNb2RpZmljYXRpb24sXG4gIENBUlRfTU9ESUZJQ0FUSU9OX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSwgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDUFFfQ09ORklHVVJBVE9SX0FERF9UT19DQVJUX1NFUklBTElaRVIsXG4gIENQUV9DT05GSUdVUkFUT1JfVVBEQVRFX0NBUlRfRU5UUllfU0VSSUFMSVpFUixcbn0gZnJvbSAnLi9jb252ZXJ0ZXJzL2NwcS1jb25maWd1cmF0b3Itb2NjLmNvbnZlcnRlcnMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENwcUNvbmZpZ3VyYXRvck9jY1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzU2VydmljZTogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgYWRkVG9DYXJ0KFxuICAgIHBhcmFtZXRlcnM6IENvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzXG4gICk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybCgnYWRkQ3BxQ29uZmlndXJhdGlvblRvQ2FydCcsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQ6IHBhcmFtZXRlcnMudXNlcklkLFxuICAgICAgICBjYXJ0SWQ6IHBhcmFtZXRlcnMuY2FydElkLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG9jY0FkZFRvQ2FydFBhcmFtZXRlcnMgPSB0aGlzLmNvbnZlcnRlclNlcnZpY2UuY29udmVydChcbiAgICAgIHBhcmFtZXRlcnMsXG4gICAgICBDUFFfQ09ORklHVVJBVE9SX0FERF9UT19DQVJUX1NFUklBTElaRVJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8Q2FydE1vZGlmaWNhdGlvbj4odXJsLCBvY2NBZGRUb0NhcnRQYXJhbWV0ZXJzKVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENBUlRfTU9ESUZJQ0FUSU9OX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIHVwZGF0ZUNhcnRFbnRyeShcbiAgICBwYXJhbWV0ZXJzOiBDb25maWd1cmF0b3IuVXBkYXRlQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeVBhcmFtZXRlcnNcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0TW9kaWZpY2F0aW9uPiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5vY2NFbmRwb2ludHNTZXJ2aWNlLmJ1aWxkVXJsKFxuICAgICAgJ3VwZGF0ZUNwcUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnknLFxuICAgICAge1xuICAgICAgICB1cmxQYXJhbXM6IHtcbiAgICAgICAgICB1c2VySWQ6IHBhcmFtZXRlcnMudXNlcklkLFxuICAgICAgICAgIGNhcnRJZDogcGFyYW1ldGVycy5jYXJ0SWQsXG4gICAgICAgICAgY2FydEVudHJ5TnVtYmVyOiBwYXJhbWV0ZXJzLmNhcnRFbnRyeU51bWJlcixcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3Qgb2NjVXBkYXRlQ2FydEVudHJ5UGFyYW1ldGVycyA9IHRoaXMuY29udmVydGVyU2VydmljZS5jb252ZXJ0KFxuICAgICAgcGFyYW1ldGVycyxcbiAgICAgIENQUV9DT05GSUdVUkFUT1JfVVBEQVRFX0NBUlRfRU5UUllfU0VSSUFMSVpFUlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucHV0PENhcnRNb2RpZmljYXRpb24+KHVybCwgb2NjVXBkYXRlQ2FydEVudHJ5UGFyYW1ldGVycylcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShDQVJUX01PRElGSUNBVElPTl9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBnZXRDb25maWdJZEZvckNhcnRFbnRyeShcbiAgICBwYXJhbWV0ZXJzOiBDb21tb25Db25maWd1cmF0b3IuUmVhZENvbmZpZ3VyYXRpb25Gcm9tQ2FydEVudHJ5UGFyYW1ldGVyc1xuICApOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzU2VydmljZS5idWlsZFVybChcbiAgICAgICdyZWFkQ3BxQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeScsXG4gICAgICB7XG4gICAgICAgIHVybFBhcmFtczoge1xuICAgICAgICAgIHVzZXJJZDogcGFyYW1ldGVycy51c2VySWQsXG4gICAgICAgICAgY2FydElkOiBwYXJhbWV0ZXJzLmNhcnRJZCxcbiAgICAgICAgICBjYXJ0RW50cnlOdW1iZXI6IHBhcmFtZXRlcnMuY2FydEVudHJ5TnVtYmVyLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDx7IGNvbmZpZ0lkOiBzdHJpbmcgfT4odXJsKS5waXBlKFxuICAgICAgbWFwKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY29uZmlnSWQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRDb25maWdJZEZvck9yZGVyRW50cnkoXG4gICAgcGFyYW1ldGVyczogQ29tbW9uQ29uZmlndXJhdG9yLlJlYWRDb25maWd1cmF0aW9uRnJvbU9yZGVyRW50cnlQYXJhbWV0ZXJzXG4gICk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5vY2NFbmRwb2ludHNTZXJ2aWNlLmJ1aWxkVXJsKFxuICAgICAgJ3JlYWRDcHFDb25maWd1cmF0aW9uRm9yT3JkZXJFbnRyeScsXG4gICAgICB7XG4gICAgICAgIHVybFBhcmFtczoge1xuICAgICAgICAgIHVzZXJJZDogcGFyYW1ldGVycy51c2VySWQsXG4gICAgICAgICAgb3JkZXJJZDogcGFyYW1ldGVycy5vcmRlcklkLFxuICAgICAgICAgIG9yZGVyRW50cnlOdW1iZXI6IHBhcmFtZXRlcnMub3JkZXJFbnRyeU51bWJlcixcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8eyBjb25maWdJZDogc3RyaW5nIH0+KHVybCkucGlwZShcbiAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmNvbmZpZ0lkO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=