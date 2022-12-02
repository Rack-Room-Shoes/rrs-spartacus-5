/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { CMS_COMPONENT_NORMALIZER } from '../../../cms/connectors/component/converters';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';
import * as i0 from "@angular/core";
/**
 * Before 1905, the OCC CMS component API required was using POST method
 * to load a (potentially large) number of components. With 1905, the endpoint
 * evaluated to use GET. Switching from POST to GET has been initially implemented
 * with the `legacy` flag, but from version 3.0 onwards, we're moving the
 * implementation to this optional Adapter.
 *
 * If you like to connect to a pre 1905 version, you can provide this adapter for the
 * `CmsComponentAdapter` injection token.
 */
export class LegacyOccCmsComponentAdapter extends OccCmsComponentAdapter {
    findComponentsByIds(ids, pageContext, fields = 'DEFAULT', currentPage = 0, pageSize = ids.length, sort) {
        const idList = { idList: ids };
        const requestParams = {
            ...this.getContextParams(pageContext),
            ...this.getPaginationParams(currentPage, pageSize, sort),
        };
        return this.http
            .post(this.getComponentsEndpoint(requestParams, fields), idList, {
            headers: this.headers,
        })
            .pipe(pluck('component'), map((components) => components ?? []), this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER));
    }
}
LegacyOccCmsComponentAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LegacyOccCmsComponentAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
LegacyOccCmsComponentAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LegacyOccCmsComponentAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: LegacyOccCmsComponentAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LW9jYy1jbXMtY29tcG9uZW50LmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvY21zL2xlZ2FjeS1vY2MtY21zLWNvbXBvbmVudC5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFJeEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBRXJFOzs7Ozs7Ozs7R0FTRztBQUlILE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxzQkFBc0I7SUFDdEUsbUJBQW1CLENBQ2pCLEdBQWEsRUFDYixXQUF3QixFQUN4QixNQUFNLEdBQUcsU0FBUyxFQUNsQixXQUFXLEdBQUcsQ0FBQyxFQUNmLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUNyQixJQUFhO1FBRWIsTUFBTSxNQUFNLEdBQXdCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRXBELE1BQU0sYUFBYSxHQUFHO1lBQ3BCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztZQUNyQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQztTQUN6RCxDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FDSCxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxFQUNqRCxNQUFNLEVBQ047WUFDRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FDRjthQUNBLElBQUksQ0FDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQ2xCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUN0RCxDQUFDO0lBQ04sQ0FBQzs7eUhBN0JVLDRCQUE0Qjs2SEFBNUIsNEJBQTRCLGNBRjNCLE1BQU07MkZBRVAsNEJBQTRCO2tCQUh4QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDTVNfQ09NUE9ORU5UX05PUk1BTElaRVIgfSBmcm9tICcuLi8uLi8uLi9jbXMvY29ubmVjdG9ycy9jb21wb25lbnQvY29udmVydGVycyc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC9jbXMubW9kZWwnO1xuaW1wb3J0IHsgUGFnZUNvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nJztcbmltcG9ydCB7IE9jYyB9IGZyb20gJy4uLy4uL29jYy1tb2RlbHMvb2NjLm1vZGVscyc7XG5pbXBvcnQgeyBPY2NDbXNDb21wb25lbnRBZGFwdGVyIH0gZnJvbSAnLi9vY2MtY21zLWNvbXBvbmVudC5hZGFwdGVyJztcblxuLyoqXG4gKiBCZWZvcmUgMTkwNSwgdGhlIE9DQyBDTVMgY29tcG9uZW50IEFQSSByZXF1aXJlZCB3YXMgdXNpbmcgUE9TVCBtZXRob2RcbiAqIHRvIGxvYWQgYSAocG90ZW50aWFsbHkgbGFyZ2UpIG51bWJlciBvZiBjb21wb25lbnRzLiBXaXRoIDE5MDUsIHRoZSBlbmRwb2ludFxuICogZXZhbHVhdGVkIHRvIHVzZSBHRVQuIFN3aXRjaGluZyBmcm9tIFBPU1QgdG8gR0VUIGhhcyBiZWVuIGluaXRpYWxseSBpbXBsZW1lbnRlZFxuICogd2l0aCB0aGUgYGxlZ2FjeWAgZmxhZywgYnV0IGZyb20gdmVyc2lvbiAzLjAgb253YXJkcywgd2UncmUgbW92aW5nIHRoZVxuICogaW1wbGVtZW50YXRpb24gdG8gdGhpcyBvcHRpb25hbCBBZGFwdGVyLlxuICpcbiAqIElmIHlvdSBsaWtlIHRvIGNvbm5lY3QgdG8gYSBwcmUgMTkwNSB2ZXJzaW9uLCB5b3UgY2FuIHByb3ZpZGUgdGhpcyBhZGFwdGVyIGZvciB0aGVcbiAqIGBDbXNDb21wb25lbnRBZGFwdGVyYCBpbmplY3Rpb24gdG9rZW4uXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMZWdhY3lPY2NDbXNDb21wb25lbnRBZGFwdGVyIGV4dGVuZHMgT2NjQ21zQ29tcG9uZW50QWRhcHRlciB7XG4gIGZpbmRDb21wb25lbnRzQnlJZHMoXG4gICAgaWRzOiBzdHJpbmdbXSxcbiAgICBwYWdlQ29udGV4dDogUGFnZUNvbnRleHQsXG4gICAgZmllbGRzID0gJ0RFRkFVTFQnLFxuICAgIGN1cnJlbnRQYWdlID0gMCxcbiAgICBwYWdlU2l6ZSA9IGlkcy5sZW5ndGgsXG4gICAgc29ydD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENtc0NvbXBvbmVudFtdPiB7XG4gICAgY29uc3QgaWRMaXN0OiBPY2MuQ29tcG9uZW50SURMaXN0ID0geyBpZExpc3Q6IGlkcyB9O1xuXG4gICAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0Q29udGV4dFBhcmFtcyhwYWdlQ29udGV4dCksXG4gICAgICAuLi50aGlzLmdldFBhZ2luYXRpb25QYXJhbXMoY3VycmVudFBhZ2UsIHBhZ2VTaXplLCBzb3J0KSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8T2NjLkNvbXBvbmVudExpc3Q+KFxuICAgICAgICB0aGlzLmdldENvbXBvbmVudHNFbmRwb2ludChyZXF1ZXN0UGFyYW1zLCBmaWVsZHMpLFxuICAgICAgICBpZExpc3QsXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBwbHVjaygnY29tcG9uZW50JyksXG4gICAgICAgIG1hcCgoY29tcG9uZW50cykgPT4gY29tcG9uZW50cyA/PyBbXSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlTWFueShDTVNfQ09NUE9ORU5UX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG59XG4iXX0=