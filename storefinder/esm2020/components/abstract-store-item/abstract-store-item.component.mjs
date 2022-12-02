/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Input, Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefinder/core";
/* eslint-disable @angular-eslint/directive-class-suffix */
export class AbstractStoreItemComponent {
    constructor(storeFinderService) {
        this.storeFinderService = storeFinderService;
    }
    getDirections(location) {
        const google_map_url = 'https://www.google.com/maps/dir/Current+Location/';
        const latitude = this.storeFinderService.getStoreLatitude(location);
        const longitude = this.storeFinderService.getStoreLongitude(location);
        return google_map_url + latitude + ',' + longitude;
    }
    getFormattedStoreAddress(addressParts) {
        return addressParts.filter(Boolean).join(', ');
    }
}
AbstractStoreItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AbstractStoreItemComponent, deps: [{ token: i1.StoreFinderService }], target: i0.ɵɵFactoryTarget.Directive });
AbstractStoreItemComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.3", type: AbstractStoreItemComponent, inputs: { location: "location" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AbstractStoreItemComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.StoreFinderService }]; }, propDecorators: { location: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3Qtc3RvcmUtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvc3RvcmVmaW5kZXIvY29tcG9uZW50cy9hYnN0cmFjdC1zdG9yZS1pdGVtL2Fic3RyYWN0LXN0b3JlLWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBR2pELDJEQUEyRDtBQUUzRCxNQUFNLE9BQU8sMEJBQTBCO0lBSXJDLFlBQXNCLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUcsQ0FBQztJQUVoRSxhQUFhLENBQUMsUUFBYTtRQUN6QixNQUFNLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMzRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sY0FBYyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBQ3JELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxZQUFzQjtRQUM3QyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7O3VIQWZVLDBCQUEwQjsyR0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBRHRDLFNBQVM7eUdBR1IsUUFBUTtzQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZpbmRlci9jb3JlJztcblxuLyogZXNsaW50LWRpc2FibGUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1jbGFzcy1zdWZmaXggKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFic3RyYWN0U3RvcmVJdGVtQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgbG9jYXRpb247XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0b3JlRmluZGVyU2VydmljZTogU3RvcmVGaW5kZXJTZXJ2aWNlKSB7fVxuXG4gIGdldERpcmVjdGlvbnMobG9jYXRpb246IGFueSk6IHN0cmluZyB7XG4gICAgY29uc3QgZ29vZ2xlX21hcF91cmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL2Rpci9DdXJyZW50K0xvY2F0aW9uLyc7XG4gICAgY29uc3QgbGF0aXR1ZGUgPSB0aGlzLnN0b3JlRmluZGVyU2VydmljZS5nZXRTdG9yZUxhdGl0dWRlKGxvY2F0aW9uKTtcbiAgICBjb25zdCBsb25naXR1ZGUgPSB0aGlzLnN0b3JlRmluZGVyU2VydmljZS5nZXRTdG9yZUxvbmdpdHVkZShsb2NhdGlvbik7XG4gICAgcmV0dXJuIGdvb2dsZV9tYXBfdXJsICsgbGF0aXR1ZGUgKyAnLCcgKyBsb25naXR1ZGU7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWRTdG9yZUFkZHJlc3MoYWRkcmVzc1BhcnRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGFkZHJlc3NQYXJ0cy5maWx0ZXIoQm9vbGVhbikuam9pbignLCAnKTtcbiAgfVxufVxuIl19