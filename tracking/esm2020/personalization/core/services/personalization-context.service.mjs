/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { EMPTY } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/tracking/personalization/root";
import * as i2 from "@spartacus/core";
export class PersonalizationContextService {
    constructor(config, cmsService) {
        this.config = config;
        this.cmsService = cmsService;
    }
    getPersonalizationContext() {
        if (!this.config.personalization?.context) {
            if (isDevMode()) {
                console.warn(`There is no context configured in Personalization.`);
            }
            return EMPTY;
        }
        else {
            const context = this.config.personalization.context;
            return this.cmsService.getCurrentPage().pipe(filter(Boolean), map((page) => page.slots?.[context.slotPosition]), filter(Boolean), map((slot) => {
                const scriptComponent = slot.components?.find((i) => i.uid === context.componentId);
                return this.buildPersonalizationContext(scriptComponent?.properties?.script?.data);
            }));
        }
    }
    buildPersonalizationContext(data) {
        if (data) {
            const context = JSON.parse(atob(data));
            context.actions.forEach((action) => {
                Object.keys(action).forEach((key) => {
                    action[key] = atob(action[key]);
                });
            });
            for (let i = 0; i < context.segments.length; i++) {
                context.segments[i] = atob(context.segments[i]);
            }
            return context;
        }
    }
}
PersonalizationContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PersonalizationContextService, deps: [{ token: i1.PersonalizationConfig }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Injectable });
PersonalizationContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PersonalizationContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PersonalizationContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.CmsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uYWxpemF0aW9uLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vY29yZS9zZXJ2aWNlcy9wZXJzb25hbGl6YXRpb24tY29udGV4dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd0RCxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFNN0MsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QyxZQUNZLE1BQTZCLEVBQzdCLFVBQXNCO1FBRHRCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDL0IsQ0FBQztJQUVKLHlCQUF5QjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFO1lBQ3pDLElBQUksU0FBUyxFQUFFLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO2FBQ3BFO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzFDLE1BQU0sQ0FBTyxPQUFPLENBQUMsRUFDckIsR0FBRyxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQ3ZELE1BQU0sQ0FBTSxPQUFPLENBQUMsRUFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1gsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQzNDLENBQUMsQ0FBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsV0FBVyxDQUMvRCxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUNyQyxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQzFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sMkJBQTJCLENBQ2pDLElBQVk7UUFFWixJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO1lBQ0QsT0FBTyxPQUFPLENBQUM7U0FDaEI7SUFDSCxDQUFDOzswSEE3Q1UsNkJBQTZCOzhIQUE3Qiw2QkFBNkIsY0FGNUIsTUFBTTsyRkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNTZXJ2aWNlLCBDb250ZW50U2xvdENvbXBvbmVudERhdGEsIFBhZ2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUGVyc29uYWxpemF0aW9uQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQZXJzb25hbGl6YXRpb25Db250ZXh0IH0gZnJvbSAnLi4vbW9kZWwvcGVyc29uYWxpemF0aW9uLWNvbnRleHQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVyc29uYWxpemF0aW9uQ29udGV4dFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBQZXJzb25hbGl6YXRpb25Db25maWcsXG4gICAgcHJvdGVjdGVkIGNtc1NlcnZpY2U6IENtc1NlcnZpY2VcbiAgKSB7fVxuXG4gIGdldFBlcnNvbmFsaXphdGlvbkNvbnRleHQoKTogT2JzZXJ2YWJsZTxQZXJzb25hbGl6YXRpb25Db250ZXh0IHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/LmNvbnRleHQpIHtcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYFRoZXJlIGlzIG5vIGNvbnRleHQgY29uZmlndXJlZCBpbiBQZXJzb25hbGl6YXRpb24uYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gRU1QVFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24uY29udGV4dDtcbiAgICAgIHJldHVybiB0aGlzLmNtc1NlcnZpY2UuZ2V0Q3VycmVudFBhZ2UoKS5waXBlKFxuICAgICAgICBmaWx0ZXI8UGFnZT4oQm9vbGVhbiksXG4gICAgICAgIG1hcCgocGFnZTogUGFnZSkgPT4gcGFnZS5zbG90cz8uW2NvbnRleHQuc2xvdFBvc2l0aW9uXSksXG4gICAgICAgIGZpbHRlcjxhbnk+KEJvb2xlYW4pLFxuICAgICAgICBtYXAoKHNsb3QpID0+IHtcbiAgICAgICAgICBjb25zdCBzY3JpcHRDb21wb25lbnQgPSBzbG90LmNvbXBvbmVudHM/LmZpbmQoXG4gICAgICAgICAgICAoaTogQ29udGVudFNsb3RDb21wb25lbnREYXRhKSA9PiBpLnVpZCA9PT0gY29udGV4dC5jb21wb25lbnRJZFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRQZXJzb25hbGl6YXRpb25Db250ZXh0KFxuICAgICAgICAgICAgc2NyaXB0Q29tcG9uZW50Py5wcm9wZXJ0aWVzPy5zY3JpcHQ/LmRhdGFcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUGVyc29uYWxpemF0aW9uQ29udGV4dChcbiAgICBkYXRhOiBzdHJpbmdcbiAgKTogUGVyc29uYWxpemF0aW9uQ29udGV4dCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBKU09OLnBhcnNlKGF0b2IoZGF0YSkpO1xuICAgICAgY29udGV4dC5hY3Rpb25zLmZvckVhY2goKGFjdGlvbjogYW55KSA9PiB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgYWN0aW9uW2tleV0gPSBhdG9iKGFjdGlvbltrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGV4dC5zZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0LnNlZ21lbnRzW2ldID0gYXRvYihjb250ZXh0LnNlZ21lbnRzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgfVxufVxuIl19