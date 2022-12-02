/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined } from '@spartacus/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { distinctUntilChanged, filter, first, pluck } from 'rxjs/operators';
import { ItemService } from '../../../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-unit-address.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/unit-address-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UnitAddressItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
        this.unitRouteParam$ = this.routingService
            .getParams()
            .pipe(pluck(ROUTE_PARAMS.unitCode), distinctUntilChanged());
    }
    load(unitUid, addressId) {
        return this.unitService
            .getAddress(unitUid, addressId)
            .pipe(filter(isNotUndefined));
    }
    update(addressCode, address) {
        this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
            this.unitService.updateAddress(unitCode, addressCode, address);
        });
        return this.unitService.getAddressLoadingStatus(addressCode);
    }
    create(value) {
        this.unitRouteParam$
            .pipe(first())
            .subscribe((unitCode) => this.unitService.createAddress(unitCode, value));
        return this.unitService.getAddressLoadingStatus(value.id ?? '');
    }
    getDetailsRoute() {
        return this.currentItemService.getDetailsRoute();
    }
    delete(addressId, unitUid) {
        this.launchList();
        this.unitService.deleteAddress(unitUid, addressId);
        return this.unitService.getAddressLoadingStatus(addressId);
    }
    launchDetails(item) {
        if (!item.id) {
            // since the ID is generated in the backend
            // we redirect to the list instead.
            this.launchList();
        }
        else {
            this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
                this.routingService.go({
                    cxRoute: this.getDetailsRoute(),
                    params: { ...item, uid: unitCode },
                });
            });
        }
    }
    launchList() {
        this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
            this.routingService.go({
                cxRoute: 'orgUnitAddressList',
                params: { uid: unitCode },
            });
        });
    }
}
UnitAddressItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitAddressItemService, deps: [{ token: i1.CurrentUnitAddressService }, { token: i2.RoutingService }, { token: i3.UnitAddressFormService }, { token: i4.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitAddressItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UnitAddressItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitAddressService }, { type: i2.RoutingService }, { type: i3.UnitAddressFormService }, { type: i4.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy9zZXJ2aWNlcy91bml0LWFkZHJlc3MtaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxjQUFjLEVBQWtCLE1BQU0saUJBQWlCLENBQUM7QUFLMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7O0FBTzlELE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxXQUFvQjtJQUM5RCxZQUNZLGtCQUE2QyxFQUM3QyxjQUE4QixFQUM5QixXQUFtQyxFQUNuQyxXQUEyQjtRQUVyQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMkI7UUFDN0MsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUNuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFLN0Isb0JBQWUsR0FBRyxJQUFJLENBQUMsY0FBYzthQUM1QyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFKOUQsQ0FBQztJQU1ELElBQUksQ0FBQyxPQUFlLEVBQUUsU0FBaUI7UUFDckMsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNwQixVQUFVLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FDSixXQUFtQixFQUNuQixPQUFnQjtRQUVoQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLE1BQU0sQ0FDZCxLQUFjO1FBRWQsSUFBSSxDQUFDLGVBQWU7YUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM1RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTSxDQUNKLFNBQWlCLEVBQ2pCLE9BQWU7UUFFZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQWE7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWiwyQ0FBMkM7WUFDM0MsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7b0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUMvQixNQUFNLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO2lCQUNuQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVTLFVBQVU7UUFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTthQUMxQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O21IQTFFVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZGRyZXNzLCBpc05vdFVuZGVmaW5lZCwgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbiAgT3JnVW5pdFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgUk9VVEVfUEFSQU1TIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBmaXJzdCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdEFkZHJlc3NGb3JtU2VydmljZSB9IGZyb20gJy4uL2Zvcm0vdW5pdC1hZGRyZXNzLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50VW5pdEFkZHJlc3NTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LXVuaXQtYWRkcmVzcy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRBZGRyZXNzSXRlbVNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZTxBZGRyZXNzPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRVbml0QWRkcmVzc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IFVuaXRBZGRyZXNzRm9ybVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVuaXRTZXJ2aWNlOiBPcmdVbml0U2VydmljZVxuICApIHtcbiAgICBzdXBlcihjdXJyZW50SXRlbVNlcnZpY2UsIHJvdXRpbmdTZXJ2aWNlLCBmb3JtU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdW5pdFJvdXRlUGFyYW0kID0gdGhpcy5yb3V0aW5nU2VydmljZVxuICAgIC5nZXRQYXJhbXMoKVxuICAgIC5waXBlKHBsdWNrKFJPVVRFX1BBUkFNUy51bml0Q29kZSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gIGxvYWQodW5pdFVpZDogc3RyaW5nLCBhZGRyZXNzSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QWRkcmVzcz4ge1xuICAgIHJldHVybiB0aGlzLnVuaXRTZXJ2aWNlXG4gICAgICAuZ2V0QWRkcmVzcyh1bml0VWlkLCBhZGRyZXNzSWQpXG4gICAgICAucGlwZShmaWx0ZXIoaXNOb3RVbmRlZmluZWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBhZGRyZXNzQ29kZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IEFkZHJlc3NcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPEFkZHJlc3M+PiB7XG4gICAgdGhpcy51bml0Um91dGVQYXJhbSQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKHVuaXRDb2RlKSA9PiB7XG4gICAgICB0aGlzLnVuaXRTZXJ2aWNlLnVwZGF0ZUFkZHJlc3ModW5pdENvZGUsIGFkZHJlc3NDb2RlLCBhZGRyZXNzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRBZGRyZXNzTG9hZGluZ1N0YXR1cyhhZGRyZXNzQ29kZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlKFxuICAgIHZhbHVlOiBBZGRyZXNzXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxBZGRyZXNzPj4ge1xuICAgIHRoaXMudW5pdFJvdXRlUGFyYW0kXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgodW5pdENvZGUpID0+IHRoaXMudW5pdFNlcnZpY2UuY3JlYXRlQWRkcmVzcyh1bml0Q29kZSwgdmFsdWUpKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRBZGRyZXNzTG9hZGluZ1N0YXR1cyh2YWx1ZS5pZCA/PyAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLmdldERldGFpbHNSb3V0ZSgpO1xuICB9XG5cbiAgZGVsZXRlKFxuICAgIGFkZHJlc3NJZDogc3RyaW5nLFxuICAgIHVuaXRVaWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QWRkcmVzcz4+IHtcbiAgICB0aGlzLmxhdW5jaExpc3QoKTtcbiAgICB0aGlzLnVuaXRTZXJ2aWNlLmRlbGV0ZUFkZHJlc3ModW5pdFVpZCwgYWRkcmVzc0lkKTtcbiAgICByZXR1cm4gdGhpcy51bml0U2VydmljZS5nZXRBZGRyZXNzTG9hZGluZ1N0YXR1cyhhZGRyZXNzSWQpO1xuICB9XG5cbiAgbGF1bmNoRGV0YWlscyhpdGVtOiBBZGRyZXNzKTogdm9pZCB7XG4gICAgaWYgKCFpdGVtLmlkKSB7XG4gICAgICAvLyBzaW5jZSB0aGUgSUQgaXMgZ2VuZXJhdGVkIGluIHRoZSBiYWNrZW5kXG4gICAgICAvLyB3ZSByZWRpcmVjdCB0byB0aGUgbGlzdCBpbnN0ZWFkLlxuICAgICAgdGhpcy5sYXVuY2hMaXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5pdFJvdXRlUGFyYW0kLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCh1bml0Q29kZSkgPT4ge1xuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgICBjeFJvdXRlOiB0aGlzLmdldERldGFpbHNSb3V0ZSgpLFxuICAgICAgICAgIHBhcmFtczogeyAuLi5pdGVtLCB1aWQ6IHVuaXRDb2RlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGxhdW5jaExpc3QoKSB7XG4gICAgdGhpcy51bml0Um91dGVQYXJhbSQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKHVuaXRDb2RlKSA9PiB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKHtcbiAgICAgICAgY3hSb3V0ZTogJ29yZ1VuaXRBZGRyZXNzTGlzdCcsXG4gICAgICAgIHBhcmFtczogeyB1aWQ6IHVuaXRDb2RlIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19