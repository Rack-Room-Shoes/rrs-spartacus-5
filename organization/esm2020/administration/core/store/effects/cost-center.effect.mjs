import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError, StateUtils, } from '@spartacus/core';
import { from, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { BudgetActions, CostCenterActions, OrganizationActions, } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/cost-center/cost-center.connector";
export class CostCenterEffects {
    constructor(actions$, costCenterConnector) {
        this.actions$ = actions$;
        this.costCenterConnector = costCenterConnector;
        this.loadCostCenter$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.LOAD_COST_CENTER), map((action) => action.payload), switchMap(({ userId, costCenterCode }) => {
            return this.costCenterConnector.get(userId, costCenterCode).pipe(map((costCenter) => {
                return new CostCenterActions.LoadCostCenterSuccess([costCenter]);
            }), catchError((error) => of(new CostCenterActions.LoadCostCenterFail({
                costCenterCode,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadCostCenters$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.LOAD_COST_CENTERS), map((action) => action.payload), switchMap((payload) => this.costCenterConnector.getList(payload.userId, payload.params).pipe(switchMap((costCenters) => {
            const { values, page } = StateUtils.normalizeListPage(costCenters, 'code');
            return [
                new CostCenterActions.LoadCostCenterSuccess(values),
                new CostCenterActions.LoadCostCentersSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new CostCenterActions.LoadCostCentersFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.createCostCenter$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.CREATE_COST_CENTER), map((action) => action.payload), switchMap((payload) => this.costCenterConnector
            .create(payload.userId, payload.costCenter)
            .pipe(switchMap((data) => [
            new CostCenterActions.CreateCostCenterSuccess(data),
            new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new CostCenterActions.CreateCostCenterFail({
                costCenterCode: payload.costCenter.code ?? '',
                error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
        ]))))));
        this.updateCostCenter$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.UPDATE_COST_CENTER), map((action) => action.payload), switchMap((payload) => this.costCenterConnector
            .update(payload.userId, payload.costCenterCode, payload.costCenter)
            .pipe(switchMap((data) => [
            new CostCenterActions.UpdateCostCenterSuccess(data),
            new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new CostCenterActions.UpdateCostCenterFail({
                costCenterCode: payload.costCenter.code ?? '',
                error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
        ]))))));
        this.loadAssignedBudgets$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.LOAD_ASSIGNED_BUDGETS), map((action) => action.payload), groupBy(({ costCenterCode, params }) => StateUtils.serializeParams(costCenterCode, params)), mergeMap((group) => group.pipe(switchMap(({ userId, costCenterCode, params }) => this.costCenterConnector
            .getBudgets(userId, costCenterCode, params)
            .pipe(switchMap((budgets) => {
            const { values, page } = StateUtils.normalizeListPage(budgets, 'code');
            return [
                new BudgetActions.LoadBudgetSuccess(values),
                new CostCenterActions.LoadAssignedBudgetsSuccess({
                    costCenterCode,
                    page,
                    params,
                }),
            ];
        }), catchError((error) => of(new CostCenterActions.LoadAssignedBudgetsFail({
            costCenterCode,
            params,
            error: normalizeHttpError(error),
        })))))))));
        this.assignBudgetToCostCenter$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.ASSIGN_BUDGET), map((action) => action.payload), mergeMap(({ userId, costCenterCode, budgetCode }) => this.costCenterConnector
            .assignBudget(userId, costCenterCode, budgetCode)
            .pipe(switchMap(() => [
            new CostCenterActions.AssignBudgetSuccess({
                code: budgetCode,
                selected: true,
            }),
            new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new CostCenterActions.AssignBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
        ]))))));
        this.unassignBudgetToCostCenter$ = createEffect(() => this.actions$.pipe(ofType(CostCenterActions.UNASSIGN_BUDGET), map((action) => action.payload), mergeMap(({ userId, costCenterCode, budgetCode }) => this.costCenterConnector
            .unassignBudget(userId, costCenterCode, budgetCode)
            .pipe(switchMap(() => [
            new CostCenterActions.UnassignBudgetSuccess({
                code: budgetCode,
                selected: false,
            }),
            new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new CostCenterActions.UnassignBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
            }),
            new OrganizationActions.OrganizationClearData(),
        ]))))));
    }
}
CostCenterEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterEffects, deps: [{ token: i1.Actions }, { token: i2.CostCenterConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CostCenterConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXIuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlL3N0b3JlL2VmZmVjdHMvY29zdC1jZW50ZXIuZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUdMLGtCQUFrQixFQUNsQixVQUFVLEdBQ1gsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRy9FLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLG1CQUFtQixHQUNwQixNQUFNLGtCQUFrQixDQUFDOzs7O0FBRzFCLE1BQU0sT0FBTyxpQkFBaUI7SUEyTzVCLFlBQ1UsUUFBaUIsRUFDakIsbUJBQXdDO1FBRHhDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQTVPbEQsb0JBQWUsR0FHWCxZQUFZLENBQUMsR0FBRyxFQUFFLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQixNQUFNLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFDMUMsR0FBRyxDQUFDLENBQUMsTUFBd0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNqRSxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFO1lBQ3ZDLE9B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LEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQzthQUNsRCxJQUFJLENBQ0gsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDMUMsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUM7WUFDRixJQUFJLG1CQUFtQixDQUFDLHFCQUFxQixFQUFFO1NBQ2hELENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxLQUF3QixFQUFFLEVBQUUsQ0FDdEMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdkMsVUFBVTtnQkFDVixLQUFLLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDO2FBQ2pDLENBQUM7WUFDRixJQUFJLG1CQUFtQixDQUFDLHFCQUFxQixFQUFFO1NBQ2hELENBQUMsQ0FDSCxDQUNGLENBQ0osQ0FDRixDQUNGLENBQUM7SUFLQyxDQUFDOzs4R0E5T08saUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7XG4gIENvc3RDZW50ZXIsXG4gIEVudGl0aWVzTW9kZWwsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbiAgU3RhdGVVdGlscyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBncm91cEJ5LCBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycy9jb3N0LWNlbnRlci9jb3N0LWNlbnRlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgQnVkZ2V0IH0gZnJvbSAnLi4vLi4vbW9kZWwvYnVkZ2V0Lm1vZGVsJztcbmltcG9ydCB7XG4gIEJ1ZGdldEFjdGlvbnMsXG4gIENvc3RDZW50ZXJBY3Rpb25zLFxuICBPcmdhbml6YXRpb25BY3Rpb25zLFxufSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvc3RDZW50ZXJFZmZlY3RzIHtcbiAgbG9hZENvc3RDZW50ZXIkOiBPYnNlcnZhYmxlPFxuICAgIHwgQ29zdENlbnRlckFjdGlvbnMuTG9hZENvc3RDZW50ZXJTdWNjZXNzXG4gICAgfCBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQ29zdENlbnRlckZhaWxcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShDb3N0Q2VudGVyQWN0aW9ucy5MT0FEX0NPU1RfQ0VOVEVSKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQ29zdENlbnRlcikgPT4gYWN0aW9uLnBheWxvYWQpLFxuICAgICAgc3dpdGNoTWFwKCh7IHVzZXJJZCwgY29zdENlbnRlckNvZGUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3N0Q2VudGVyQ29ubmVjdG9yLmdldCh1c2VySWQsIGNvc3RDZW50ZXJDb2RlKS5waXBlKFxuICAgICAgICAgIG1hcCgoY29zdENlbnRlcjogQ29zdENlbnRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQ29zdENlbnRlclN1Y2Nlc3MoW2Nvc3RDZW50ZXJdKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+XG4gICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgbmV3IENvc3RDZW50ZXJBY3Rpb25zLkxvYWRDb3N0Q2VudGVyRmFpbCh7XG4gICAgICAgICAgICAgICAgY29zdENlbnRlckNvZGUsXG4gICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgbG9hZENvc3RDZW50ZXJzJDogT2JzZXJ2YWJsZTxcbiAgICB8IENvc3RDZW50ZXJBY3Rpb25zLkxvYWRDb3N0Q2VudGVyc1N1Y2Nlc3NcbiAgICB8IENvc3RDZW50ZXJBY3Rpb25zLkxvYWRDb3N0Q2VudGVyU3VjY2Vzc1xuICAgIHwgQ29zdENlbnRlckFjdGlvbnMuTG9hZENvc3RDZW50ZXJzRmFpbFxuICA+ID0gY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgb2ZUeXBlKENvc3RDZW50ZXJBY3Rpb25zLkxPQURfQ09TVF9DRU5URVJTKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQ29zdENlbnRlcnMpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIHN3aXRjaE1hcCgocGF5bG9hZCkgPT5cbiAgICAgICAgdGhpcy5jb3N0Q2VudGVyQ29ubmVjdG9yLmdldExpc3QocGF5bG9hZC51c2VySWQsIHBheWxvYWQucGFyYW1zKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoY29zdENlbnRlcnM6IEVudGl0aWVzTW9kZWw8Q29zdENlbnRlcj4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdmFsdWVzLCBwYWdlIH0gPSBTdGF0ZVV0aWxzLm5vcm1hbGl6ZUxpc3RQYWdlKFxuICAgICAgICAgICAgICBjb3N0Q2VudGVycyxcbiAgICAgICAgICAgICAgJ2NvZGUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgbmV3IENvc3RDZW50ZXJBY3Rpb25zLkxvYWRDb3N0Q2VudGVyU3VjY2Vzcyh2YWx1ZXMpLFxuICAgICAgICAgICAgICBuZXcgQ29zdENlbnRlckFjdGlvbnMuTG9hZENvc3RDZW50ZXJzU3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBheWxvYWQucGFyYW1zLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgIG5ldyBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQ29zdENlbnRlcnNGYWlsKHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBheWxvYWQucGFyYW1zLFxuICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBjcmVhdGVDb3N0Q2VudGVyJDogT2JzZXJ2YWJsZTxcbiAgICB8IENvc3RDZW50ZXJBY3Rpb25zLkNyZWF0ZUNvc3RDZW50ZXJTdWNjZXNzXG4gICAgfCBDb3N0Q2VudGVyQWN0aW9ucy5DcmVhdGVDb3N0Q2VudGVyRmFpbFxuICAgIHwgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGFcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShDb3N0Q2VudGVyQWN0aW9ucy5DUkVBVEVfQ09TVF9DRU5URVIpLFxuICAgICAgbWFwKChhY3Rpb246IENvc3RDZW50ZXJBY3Rpb25zLkNyZWF0ZUNvc3RDZW50ZXIpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIHN3aXRjaE1hcCgocGF5bG9hZCkgPT5cbiAgICAgICAgdGhpcy5jb3N0Q2VudGVyQ29ubmVjdG9yXG4gICAgICAgICAgLmNyZWF0ZShwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5jb3N0Q2VudGVyKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiBbXG4gICAgICAgICAgICAgIG5ldyBDb3N0Q2VudGVyQWN0aW9ucy5DcmVhdGVDb3N0Q2VudGVyU3VjY2VzcyhkYXRhKSxcbiAgICAgICAgICAgICAgbmV3IE9yZ2FuaXphdGlvbkFjdGlvbnMuT3JnYW5pemF0aW9uQ2xlYXJEYXRhKCksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSkgPT5cbiAgICAgICAgICAgICAgZnJvbShbXG4gICAgICAgICAgICAgICAgbmV3IENvc3RDZW50ZXJBY3Rpb25zLkNyZWF0ZUNvc3RDZW50ZXJGYWlsKHtcbiAgICAgICAgICAgICAgICAgIGNvc3RDZW50ZXJDb2RlOiBwYXlsb2FkLmNvc3RDZW50ZXIuY29kZSA/PyAnJyxcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBPcmdhbml6YXRpb25BY3Rpb25zLk9yZ2FuaXphdGlvbkNsZWFyRGF0YSgpLFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgIClcbiAgICApXG4gICk7XG5cbiAgdXBkYXRlQ29zdENlbnRlciQ6IE9ic2VydmFibGU8XG4gICAgfCBDb3N0Q2VudGVyQWN0aW9ucy5VcGRhdGVDb3N0Q2VudGVyU3VjY2Vzc1xuICAgIHwgQ29zdENlbnRlckFjdGlvbnMuVXBkYXRlQ29zdENlbnRlckZhaWxcbiAgICB8IE9yZ2FuaXphdGlvbkFjdGlvbnMuT3JnYW5pemF0aW9uQ2xlYXJEYXRhXG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoQ29zdENlbnRlckFjdGlvbnMuVVBEQVRFX0NPU1RfQ0VOVEVSKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDb3N0Q2VudGVyQWN0aW9ucy5VcGRhdGVDb3N0Q2VudGVyKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICBzd2l0Y2hNYXAoKHBheWxvYWQpID0+XG4gICAgICAgIHRoaXMuY29zdENlbnRlckNvbm5lY3RvclxuICAgICAgICAgIC51cGRhdGUocGF5bG9hZC51c2VySWQsIHBheWxvYWQuY29zdENlbnRlckNvZGUsIHBheWxvYWQuY29zdENlbnRlcilcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoZGF0YSkgPT4gW1xuICAgICAgICAgICAgICBuZXcgQ29zdENlbnRlckFjdGlvbnMuVXBkYXRlQ29zdENlbnRlclN1Y2Nlc3MoZGF0YSksXG4gICAgICAgICAgICAgIG5ldyBPcmdhbml6YXRpb25BY3Rpb25zLk9yZ2FuaXphdGlvbkNsZWFyRGF0YSgpLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+XG4gICAgICAgICAgICAgIGZyb20oW1xuICAgICAgICAgICAgICAgIG5ldyBDb3N0Q2VudGVyQWN0aW9ucy5VcGRhdGVDb3N0Q2VudGVyRmFpbCh7XG4gICAgICAgICAgICAgICAgICBjb3N0Q2VudGVyQ29kZTogcGF5bG9hZC5jb3N0Q2VudGVyLmNvZGUgPz8gJycsXG4gICAgICAgICAgICAgICAgICBlcnJvcjogbm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGEoKSxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICApXG4gICAgKVxuICApO1xuXG4gIGxvYWRBc3NpZ25lZEJ1ZGdldHMkOiBPYnNlcnZhYmxlPFxuICAgIHwgQ29zdENlbnRlckFjdGlvbnMuTG9hZEFzc2lnbmVkQnVkZ2V0c1N1Y2Nlc3NcbiAgICB8IEJ1ZGdldEFjdGlvbnMuTG9hZEJ1ZGdldFN1Y2Nlc3NcbiAgICB8IENvc3RDZW50ZXJBY3Rpb25zLkxvYWRBc3NpZ25lZEJ1ZGdldHNGYWlsXG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoQ29zdENlbnRlckFjdGlvbnMuTE9BRF9BU1NJR05FRF9CVURHRVRTKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQXNzaWduZWRCdWRnZXRzKSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICBncm91cEJ5KCh7IGNvc3RDZW50ZXJDb2RlLCBwYXJhbXMgfSkgPT5cbiAgICAgICAgU3RhdGVVdGlscy5zZXJpYWxpemVQYXJhbXMoY29zdENlbnRlckNvZGUsIHBhcmFtcylcbiAgICAgICksXG4gICAgICBtZXJnZU1hcCgoZ3JvdXApID0+XG4gICAgICAgIGdyb3VwLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKCh7IHVzZXJJZCwgY29zdENlbnRlckNvZGUsIHBhcmFtcyB9KSA9PlxuICAgICAgICAgICAgdGhpcy5jb3N0Q2VudGVyQ29ubmVjdG9yXG4gICAgICAgICAgICAgIC5nZXRCdWRnZXRzKHVzZXJJZCwgY29zdENlbnRlckNvZGUsIHBhcmFtcylcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKChidWRnZXRzOiBFbnRpdGllc01vZGVsPEJ1ZGdldD4pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsdWVzLCBwYWdlIH0gPSBTdGF0ZVV0aWxzLm5vcm1hbGl6ZUxpc3RQYWdlKFxuICAgICAgICAgICAgICAgICAgICBidWRnZXRzLFxuICAgICAgICAgICAgICAgICAgICAnY29kZSdcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgQnVkZ2V0QWN0aW9ucy5Mb2FkQnVkZ2V0U3VjY2Vzcyh2YWx1ZXMpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29zdENlbnRlckFjdGlvbnMuTG9hZEFzc2lnbmVkQnVkZ2V0c1N1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgICAgICAgIGNvc3RDZW50ZXJDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDb3N0Q2VudGVyQWN0aW9ucy5Mb2FkQXNzaWduZWRCdWRnZXRzRmFpbCh7XG4gICAgICAgICAgICAgICAgICAgICAgY29zdENlbnRlckNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBhc3NpZ25CdWRnZXRUb0Nvc3RDZW50ZXIkOiBPYnNlcnZhYmxlPFxuICAgIHwgQ29zdENlbnRlckFjdGlvbnMuQXNzaWduQnVkZ2V0U3VjY2Vzc1xuICAgIHwgQ29zdENlbnRlckFjdGlvbnMuQXNzaWduQnVkZ2V0RmFpbFxuICAgIHwgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGFcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShDb3N0Q2VudGVyQWN0aW9ucy5BU1NJR05fQlVER0VUKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDb3N0Q2VudGVyQWN0aW9ucy5Bc3NpZ25CdWRnZXQpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIG1lcmdlTWFwKCh7IHVzZXJJZCwgY29zdENlbnRlckNvZGUsIGJ1ZGdldENvZGUgfSkgPT5cbiAgICAgICAgdGhpcy5jb3N0Q2VudGVyQ29ubmVjdG9yXG4gICAgICAgICAgLmFzc2lnbkJ1ZGdldCh1c2VySWQsIGNvc3RDZW50ZXJDb2RlLCBidWRnZXRDb2RlKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IFtcbiAgICAgICAgICAgICAgbmV3IENvc3RDZW50ZXJBY3Rpb25zLkFzc2lnbkJ1ZGdldFN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgIGNvZGU6IGJ1ZGdldENvZGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBuZXcgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGEoKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICBmcm9tKFtcbiAgICAgICAgICAgICAgICBuZXcgQ29zdENlbnRlckFjdGlvbnMuQXNzaWduQnVkZ2V0RmFpbCh7XG4gICAgICAgICAgICAgICAgICBidWRnZXRDb2RlLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IE9yZ2FuaXphdGlvbkFjdGlvbnMuT3JnYW5pemF0aW9uQ2xlYXJEYXRhKCksXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICB1bmFzc2lnbkJ1ZGdldFRvQ29zdENlbnRlciQ6IE9ic2VydmFibGU8XG4gICAgfCBDb3N0Q2VudGVyQWN0aW9ucy5VbmFzc2lnbkJ1ZGdldFN1Y2Nlc3NcbiAgICB8IENvc3RDZW50ZXJBY3Rpb25zLlVuYXNzaWduQnVkZ2V0RmFpbFxuICAgIHwgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGFcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShDb3N0Q2VudGVyQWN0aW9ucy5VTkFTU0lHTl9CVURHRVQpLFxuICAgICAgbWFwKChhY3Rpb246IENvc3RDZW50ZXJBY3Rpb25zLlVuYXNzaWduQnVkZ2V0KSA9PiBhY3Rpb24ucGF5bG9hZCksXG4gICAgICBtZXJnZU1hcCgoeyB1c2VySWQsIGNvc3RDZW50ZXJDb2RlLCBidWRnZXRDb2RlIH0pID0+XG4gICAgICAgIHRoaXMuY29zdENlbnRlckNvbm5lY3RvclxuICAgICAgICAgIC51bmFzc2lnbkJ1ZGdldCh1c2VySWQsIGNvc3RDZW50ZXJDb2RlLCBidWRnZXRDb2RlKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IFtcbiAgICAgICAgICAgICAgbmV3IENvc3RDZW50ZXJBY3Rpb25zLlVuYXNzaWduQnVkZ2V0U3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgY29kZTogYnVkZ2V0Q29kZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBuZXcgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGEoKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgICBmcm9tKFtcbiAgICAgICAgICAgICAgICBuZXcgQ29zdENlbnRlckFjdGlvbnMuVW5hc3NpZ25CdWRnZXRGYWlsKHtcbiAgICAgICAgICAgICAgICAgIGJ1ZGdldENvZGUsXG4gICAgICAgICAgICAgICAgICBlcnJvcjogbm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgT3JnYW5pemF0aW9uQWN0aW9ucy5Pcmdhbml6YXRpb25DbGVhckRhdGEoKSxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICApXG4gICAgKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYWN0aW9ucyQ6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBjb3N0Q2VudGVyQ29ubmVjdG9yOiBDb3N0Q2VudGVyQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==