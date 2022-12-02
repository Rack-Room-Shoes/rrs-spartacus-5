/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotUndefined, } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { ListService } from '../../shared/list/list.service';
import { OrganizationTableType } from '../../shared/organization.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
/**
 * Service to populate User data to `Table` data. The user
 * data is driven by the table configuration, using the `OrganizationTables.USER`.
 */
export class UserListService extends ListService {
    constructor(tableService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER;
    }
    key() {
        return 'customerId';
    }
    load(pagination) {
        return this.userService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertUsers(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertUsers({ pagination, sorts, values, }) {
        const userModels = {
            pagination,
            sorts,
            values: values.map((value) => ({
                ...value,
                unit: value.orgUnit,
            })),
        };
        return userModels;
    }
}
UserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9zZXJ2aWNlcy91c2VyLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBR0wsY0FBYyxHQUVmLE1BQU0saUJBQWlCLENBQUM7QUFJekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFheEU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBc0I7SUFHekQsWUFDWSxZQUEwQixFQUMxQixXQUEyQjtRQUVyQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFKN0IsY0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQztJQU9qRCxDQUFDO0lBRUQsR0FBRztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFUyxJQUFJLENBQ1osVUFBMkI7UUFFM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sWUFBWSxDQUFDLEVBQ3JCLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxHQUNpQjtRQUN2QixNQUFNLFVBQVUsR0FBNkI7WUFDM0MsVUFBVTtZQUNWLEtBQUs7WUFDTCxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxLQUFLO2dCQUNSLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTzthQUNwQixDQUFDLENBQUM7U0FDSixDQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQzs7NEdBekNVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCMkJVc2VyLFxuICBFbnRpdGllc01vZGVsLFxuICBpc05vdFVuZGVmaW5lZCxcbiAgUGFnaW5hdGlvbk1vZGVsLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFRhYmxlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZ2FuaXphdGlvblRhYmxlVHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG4vKipcbiAqIFRoZSBVSSBtb2RlbCBmb3IgdGhlIGNvc3QgY2VudGVyLCB3aGljaCBpcyBhIHNsaWdodGx5IGZsYXR0ZW5lZCB2ZXJzaW9uXG4gKiBvZiB0aGUgY29yZSBjb3N0IGNlbnRlciBtb2RlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VyTW9kZWwge1xuICB1aWQ/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIG9yZ1VuaXQ/OiBhbnk7XG4gIHJvbGVzPzogc3RyaW5nW107XG59XG5cbi8qKlxuICogU2VydmljZSB0byBwb3B1bGF0ZSBVc2VyIGRhdGEgdG8gYFRhYmxlYCBkYXRhLiBUaGUgdXNlclxuICogZGF0YSBpcyBkcml2ZW4gYnkgdGhlIHRhYmxlIGNvbmZpZ3VyYXRpb24sIHVzaW5nIHRoZSBgT3JnYW5pemF0aW9uVGFibGVzLlVTRVJgLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVXNlckxpc3RTZXJ2aWNlIGV4dGVuZHMgTGlzdFNlcnZpY2U8VXNlck1vZGVsPiB7XG4gIHByb3RlY3RlZCB0YWJsZVR5cGUgPSBPcmdhbml6YXRpb25UYWJsZVR5cGUuVVNFUjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJTZXJ2aWNlOiBCMkJVc2VyU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0YWJsZVNlcnZpY2UpO1xuICB9XG5cbiAga2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdjdXN0b21lcklkJztcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkKFxuICAgIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbFxuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8VXNlck1vZGVsPj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldExpc3QocGFnaW5hdGlvbikucGlwZShcbiAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICBtYXAoKHJhdykgPT4gdGhpcy5jb252ZXJ0VXNlcnMocmF3KSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvcHVsYXRlcyB0aGUgY29zdCBjZW50ZXIgZGF0YSB0byBhIGNvbnZlbmllbnQgdGFibGUgZGF0YSBtb2RlbCwgc28gdGhhdCB3ZVxuICAgKiBjYW4gc2tpcCBzcGVjaWZpYyBjb252ZXJzaW9uIGluIHRoZSB2aWV3IGxvZ2ljIHdoZXJlIHBvc3NpYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnZlcnRVc2Vycyh7XG4gICAgcGFnaW5hdGlvbixcbiAgICBzb3J0cyxcbiAgICB2YWx1ZXMsXG4gIH06IEVudGl0aWVzTW9kZWw8QjJCVXNlcj4pOiBFbnRpdGllc01vZGVsPFVzZXJNb2RlbD4ge1xuICAgIGNvbnN0IHVzZXJNb2RlbHM6IEVudGl0aWVzTW9kZWw8VXNlck1vZGVsPiA9IHtcbiAgICAgIHBhZ2luYXRpb24sXG4gICAgICBzb3J0cyxcbiAgICAgIHZhbHVlczogdmFsdWVzLm1hcCgodmFsdWU6IGFueSkgPT4gKHtcbiAgICAgICAgLi4udmFsdWUsXG4gICAgICAgIHVuaXQ6IHZhbHVlLm9yZ1VuaXQsXG4gICAgICB9KSksXG4gICAgfTtcbiAgICByZXR1cm4gdXNlck1vZGVscztcbiAgfVxufVxuIl19