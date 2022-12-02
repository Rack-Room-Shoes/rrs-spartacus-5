import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError, StateUtils, } from '@spartacus/core';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrganizationActions, PermissionActions } from '../actions';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/permission/permission.connector";
export class PermissionEffects {
    constructor(actions$, permissionConnector) {
        this.actions$ = actions$;
        this.permissionConnector = permissionConnector;
        this.loadPermission$ = createEffect(() => this.actions$.pipe(ofType(PermissionActions.LOAD_PERMISSION), map((action) => action.payload), switchMap(({ userId, permissionCode }) => {
            return this.permissionConnector.get(userId, permissionCode).pipe(map((permission) => {
                return new PermissionActions.LoadPermissionSuccess([permission]);
            }), catchError((error) => of(new PermissionActions.LoadPermissionFail({
                permissionCode,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadPermissions$ = createEffect(() => this.actions$.pipe(ofType(PermissionActions.LOAD_PERMISSIONS), map((action) => action.payload), switchMap((payload) => this.permissionConnector.getList(payload.userId, payload.params).pipe(switchMap((permissions) => {
            const { values, page } = StateUtils.normalizeListPage(permissions, 'code');
            return [
                new PermissionActions.LoadPermissionSuccess(values),
                new PermissionActions.LoadPermissionsSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new PermissionActions.LoadPermissionsFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.createPermission$ = createEffect(() => this.actions$.pipe(ofType(PermissionActions.CREATE_PERMISSION), map((action) => action.payload), switchMap((payload) => this.permissionConnector
            .create(payload.userId, payload.permission)
            .pipe(switchMap((data) => [
            new PermissionActions.CreatePermissionSuccess(data),
            new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new PermissionActions.CreatePermissionFail({
                permissionCode: payload.permission.code ?? '',
                error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
        ]))))));
        this.updatePermission$ = createEffect(() => this.actions$.pipe(ofType(PermissionActions.UPDATE_PERMISSION), map((action) => action.payload), switchMap((payload) => this.permissionConnector
            .update(payload.userId, payload.permissionCode, payload.permission)
            .pipe(switchMap((data) => [
            new PermissionActions.UpdatePermissionSuccess(data),
            new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new PermissionActions.UpdatePermissionFail({
                permissionCode: payload.permission.code ?? '',
                error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
        ]))))));
        this.loadPermissionTypes$ = createEffect(() => this.actions$.pipe(ofType(PermissionActions.LOAD_PERMISSION_TYPES), switchMap(() => this.permissionConnector.getTypes().pipe(map((permissionTypeList) => new PermissionActions.LoadPermissionTypesSuccess(permissionTypeList)), catchError((error) => of(new PermissionActions.LoadPermissionTypesFail({
            error: normalizeHttpError(error),
        })))))));
    }
}
PermissionEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionEffects, deps: [{ token: i1.Actions }, { token: i2.PermissionConnector }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.PermissionConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi5lZmZlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvc3RvcmUvZWZmZWN0cy9wZXJtaXNzaW9uLmVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFFTCxrQkFBa0IsRUFFbEIsVUFBVSxHQUNYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLElBQUksRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDOzs7O0FBR3BFLE1BQU0sT0FBTyxpQkFBaUI7SUFvSjVCLFlBQ1UsUUFBaUIsRUFDakIsbUJBQXdDO1FBRHhDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQXJKbEQsb0JBQWUsR0FHWCxZQUFZLENBQUMsR0FBRyxFQUFFLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLEVBQ3pDLEdBQUcsQ0FBQyxDQUFDLE1BQXdDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDakUsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsTUFB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QyxJQUFJLENBQ3RDLEdBQUcsQ0FDRCxDQUFDLGtCQUFpRCxFQUFFLEVBQUUsQ0FDcEQsSUFBSSxpQkFBaUIsQ0FBQywwQkFBMEIsQ0FDOUMsa0JBQWtCLENBQ25CLENBQ0osRUFDRCxVQUFVLENBQUMsQ0FBQyxLQUF3QixFQUFFLEVBQUUsQ0FDdEMsRUFBRSxDQUNBLElBQUksaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7WUFDNUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQztTQUNqQyxDQUFDLENBQ0gsQ0FDRixDQUNGLENBQ0YsQ0FDRixDQUNGLENBQUM7SUFLQyxDQUFDOzs4R0F2Sk8saUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7XG4gIEVudGl0aWVzTW9kZWwsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgT3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlLFxuICBTdGF0ZVV0aWxzLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkNvbm5lY3RvciB9IGZyb20gJy4uLy4uL2Nvbm5lY3RvcnMvcGVybWlzc2lvbi9wZXJtaXNzaW9uLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vbW9kZWwvcGVybWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25BY3Rpb25zLCBQZXJtaXNzaW9uQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkVmZmVjdHMge1xuICBsb2FkUGVybWlzc2lvbiQ6IE9ic2VydmFibGU8XG4gICAgfCBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvblN1Y2Nlc3NcbiAgICB8IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uRmFpbFxuICA+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKFBlcm1pc3Npb25BY3Rpb25zLkxPQURfUEVSTUlTU0lPTiksXG4gICAgICBtYXAoKGFjdGlvbjogUGVybWlzc2lvbkFjdGlvbnMuTG9hZFBlcm1pc3Npb24pID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIHN3aXRjaE1hcCgoeyB1c2VySWQsIHBlcm1pc3Npb25Db2RlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVybWlzc2lvbkNvbm5lY3Rvci5nZXQodXNlcklkLCBwZXJtaXNzaW9uQ29kZSkucGlwZShcbiAgICAgICAgICBtYXAoKHBlcm1pc3Npb246IFBlcm1pc3Npb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUGVybWlzc2lvbkFjdGlvbnMuTG9hZFBlcm1pc3Npb25TdWNjZXNzKFtwZXJtaXNzaW9uXSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgIG5ldyBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvbkZhaWwoe1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25Db2RlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xuXG4gIGxvYWRQZXJtaXNzaW9ucyQ6IE9ic2VydmFibGU8XG4gICAgfCBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvbnNTdWNjZXNzXG4gICAgfCBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvblN1Y2Nlc3NcbiAgICB8IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uc0ZhaWxcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShQZXJtaXNzaW9uQWN0aW9ucy5MT0FEX1BFUk1JU1NJT05TKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvbnMpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIHN3aXRjaE1hcCgocGF5bG9hZCkgPT5cbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uQ29ubmVjdG9yLmdldExpc3QocGF5bG9hZC51c2VySWQsIHBheWxvYWQucGFyYW1zKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgocGVybWlzc2lvbnM6IEVudGl0aWVzTW9kZWw8UGVybWlzc2lvbj4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdmFsdWVzLCBwYWdlIH0gPSBTdGF0ZVV0aWxzLm5vcm1hbGl6ZUxpc3RQYWdlKFxuICAgICAgICAgICAgICBwZXJtaXNzaW9ucyxcbiAgICAgICAgICAgICAgJ2NvZGUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uU3VjY2Vzcyh2YWx1ZXMpLFxuICAgICAgICAgICAgICBuZXcgUGVybWlzc2lvbkFjdGlvbnMuTG9hZFBlcm1pc3Npb25zU3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBheWxvYWQucGFyYW1zLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgIG5ldyBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvbnNGYWlsKHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBheWxvYWQucGFyYW1zLFxuICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBjcmVhdGVQZXJtaXNzaW9uJDogT2JzZXJ2YWJsZTxcbiAgICB8IFBlcm1pc3Npb25BY3Rpb25zLkNyZWF0ZVBlcm1pc3Npb25TdWNjZXNzXG4gICAgfCBQZXJtaXNzaW9uQWN0aW9ucy5DcmVhdGVQZXJtaXNzaW9uRmFpbFxuICAgIHwgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGFcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShQZXJtaXNzaW9uQWN0aW9ucy5DUkVBVEVfUEVSTUlTU0lPTiksXG4gICAgICBtYXAoKGFjdGlvbjogUGVybWlzc2lvbkFjdGlvbnMuQ3JlYXRlUGVybWlzc2lvbikgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgICAgc3dpdGNoTWFwKChwYXlsb2FkKSA9PlxuICAgICAgICB0aGlzLnBlcm1pc3Npb25Db25uZWN0b3JcbiAgICAgICAgICAuY3JlYXRlKHBheWxvYWQudXNlcklkLCBwYXlsb2FkLnBlcm1pc3Npb24pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGRhdGEpID0+IFtcbiAgICAgICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLkNyZWF0ZVBlcm1pc3Npb25TdWNjZXNzKGRhdGEpLFxuICAgICAgICAgICAgICBuZXcgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGEoKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICBmcm9tKFtcbiAgICAgICAgICAgICAgICBuZXcgUGVybWlzc2lvbkFjdGlvbnMuQ3JlYXRlUGVybWlzc2lvbkZhaWwoe1xuICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkNvZGU6IHBheWxvYWQucGVybWlzc2lvbi5jb2RlID8/ICcnLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IE9yZ2FuaXphdGlvbkFjdGlvbnMuT3JnYW5pemF0aW9uQ2xlYXJEYXRhKCksXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICB1cGRhdGVQZXJtaXNzaW9uJDogT2JzZXJ2YWJsZTxcbiAgICB8IFBlcm1pc3Npb25BY3Rpb25zLlVwZGF0ZVBlcm1pc3Npb25TdWNjZXNzXG4gICAgfCBQZXJtaXNzaW9uQWN0aW9ucy5VcGRhdGVQZXJtaXNzaW9uRmFpbFxuICAgIHwgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGFcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShQZXJtaXNzaW9uQWN0aW9ucy5VUERBVEVfUEVSTUlTU0lPTiksXG4gICAgICBtYXAoKGFjdGlvbjogUGVybWlzc2lvbkFjdGlvbnMuVXBkYXRlUGVybWlzc2lvbikgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgICAgc3dpdGNoTWFwKChwYXlsb2FkKSA9PlxuICAgICAgICB0aGlzLnBlcm1pc3Npb25Db25uZWN0b3JcbiAgICAgICAgICAudXBkYXRlKHBheWxvYWQudXNlcklkLCBwYXlsb2FkLnBlcm1pc3Npb25Db2RlLCBwYXlsb2FkLnBlcm1pc3Npb24pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGRhdGEpID0+IFtcbiAgICAgICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLlVwZGF0ZVBlcm1pc3Npb25TdWNjZXNzKGRhdGEpLFxuICAgICAgICAgICAgICBuZXcgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGEoKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICBmcm9tKFtcbiAgICAgICAgICAgICAgICBuZXcgUGVybWlzc2lvbkFjdGlvbnMuVXBkYXRlUGVybWlzc2lvbkZhaWwoe1xuICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkNvZGU6IHBheWxvYWQucGVybWlzc2lvbi5jb2RlID8/ICcnLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IE9yZ2FuaXphdGlvbkFjdGlvbnMuT3JnYW5pemF0aW9uQ2xlYXJEYXRhKCksXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBsb2FkUGVybWlzc2lvblR5cGVzJDogT2JzZXJ2YWJsZTxcbiAgICB8IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uVHlwZXNTdWNjZXNzXG4gICAgfCBQZXJtaXNzaW9uQWN0aW9ucy5Mb2FkUGVybWlzc2lvblR5cGVzRmFpbFxuICA+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKFBlcm1pc3Npb25BY3Rpb25zLkxPQURfUEVSTUlTU0lPTl9UWVBFUyksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgdGhpcy5wZXJtaXNzaW9uQ29ubmVjdG9yLmdldFR5cGVzKCkucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAocGVybWlzc2lvblR5cGVMaXN0OiBPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVbXSkgPT5cbiAgICAgICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uVHlwZXNTdWNjZXNzKFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25UeXBlTGlzdFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+XG4gICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgbmV3IFBlcm1pc3Npb25BY3Rpb25zLkxvYWRQZXJtaXNzaW9uVHlwZXNGYWlsKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogbm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIHBlcm1pc3Npb25Db25uZWN0b3I6IFBlcm1pc3Npb25Db25uZWN0b3JcbiAgKSB7fVxufVxuIl19