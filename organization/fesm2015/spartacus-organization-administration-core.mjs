import * as i0 from '@angular/core';
import { Injectable, NgModule, InjectionToken } from '@angular/core';
import * as i2 from '@spartacus/core';
import { HttpErrorHandler, HttpResponseStatus, GlobalMessageType, PageMetaResolver, PageType, StateUtils, normalizeHttpError, B2BUserRole, AuthActions, SiteContextActions } from '@spartacus/core';
import { defer, of, combineLatest, from, queueScheduler, using } from 'rxjs';
import { map, distinctUntilChanged, switchMap, shareReplay, catchError, groupBy, mergeMap, take, tap, withLatestFrom, filter, pluck, observeOn, pairwise, auditTime } from 'rxjs/operators';
import * as i1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i1$1 from '@ngrx/store';
import { combineReducers, StoreModule, createFeatureSelector, createSelector } from '@ngrx/store';
import * as i4 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BUserAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BUserConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, orgUnitCustomerId) {
        return this.adapter.load(userId, orgUnitCustomerId);
    }
    create(userId, orgCustomer) {
        return this.adapter.create(userId, orgCustomer);
    }
    update(userId, orgCustomerId, orgCustomer) {
        return this.adapter.update(userId, orgCustomerId, orgCustomer);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    getApprovers(userId, orgUnitCustomerId, params) {
        return this.adapter.loadApprovers(userId, orgUnitCustomerId, params);
    }
    assignApprover(userId, orgCustomerId, approverId) {
        return this.adapter.assignApprover(userId, orgCustomerId, approverId);
    }
    unassignApprover(userId, orgCustomerId, approverId) {
        return this.adapter.unassignApprover(userId, orgCustomerId, approverId);
    }
    getPermissions(userId, orgUnitCustomerId, params) {
        return this.adapter.loadPermissions(userId, orgUnitCustomerId, params);
    }
    assignPermission(userId, orgCustomerId, permissionId) {
        return this.adapter.assignPermission(userId, orgCustomerId, permissionId);
    }
    unassignPermission(userId, orgCustomerId, permissionId) {
        return this.adapter.unassignPermission(userId, orgCustomerId, permissionId);
    }
    getUserGroups(userId, orgUnitCustomerId, params) {
        return this.adapter.loadUserGroups(userId, orgUnitCustomerId, params);
    }
    assignUserGroup(userId, orgCustomerId, userGroupId) {
        return this.adapter.assignUserGroup(userId, orgCustomerId, userGroupId);
    }
    unassignUserGroup(userId, orgCustomerId, userGroupId) {
        return this.adapter.unassignUserGroup(userId, orgCustomerId, userGroupId);
    }
}
B2BUserConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserConnector, deps: [{ token: B2BUserAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
B2BUserConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: B2BUserAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, budgetCode) {
        return this.adapter.load(userId, budgetCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    create(userId, budget) {
        return this.adapter.create(userId, budget);
    }
    update(userId, budgetCode, budget) {
        return this.adapter.update(userId, budgetCode, budget);
    }
}
BudgetConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetConnector, deps: [{ token: BudgetAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: BudgetAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, costCenterCode) {
        return this.adapter.load(userId, costCenterCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    create(userId, costCenter) {
        return this.adapter.create(userId, costCenter);
    }
    update(userId, costCenterCode, costCenter) {
        return this.adapter.update(userId, costCenterCode, costCenter);
    }
    getBudgets(userId, costCenterCode, params) {
        return this.adapter.loadBudgets(userId, costCenterCode, params);
    }
    assignBudget(userId, costCenterCode, budgetCode) {
        return this.adapter.assignBudget(userId, costCenterCode, budgetCode);
    }
    unassignBudget(userId, costCenterCode, budgetCode) {
        return this.adapter.unassignBudget(userId, costCenterCode, budgetCode);
    }
}
CostCenterConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterConnector, deps: [{ token: CostCenterAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CostCenterAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrgUnitAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrgUnitConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, orgUnitId) {
        return this.adapter.load(userId, orgUnitId);
    }
    create(userId, orgUnit) {
        return this.adapter.create(userId, orgUnit);
    }
    update(userId, orgUnitId, orgUnit) {
        return this.adapter.update(userId, orgUnitId, orgUnit);
    }
    getList(userId) {
        return this.adapter.loadList(userId);
    }
    getApprovalProcesses(userId) {
        return this.adapter.loadApprovalProcesses(userId);
    }
    getTree(userId) {
        return this.adapter.loadTree(userId);
    }
    getUsers(userId, orgUnitId, roleId, params) {
        return this.adapter.loadUsers(userId, orgUnitId, roleId, params);
    }
    assignRole(userId, orgCustomerId, roleId) {
        return this.adapter.assignRole(userId, orgCustomerId, roleId);
    }
    unassignRole(userId, orgCustomerId, roleId) {
        return this.adapter.unassignRole(userId, orgCustomerId, roleId);
    }
    assignApprover(userId, orgUnitId, orgCustomerId, roleId) {
        return this.adapter.assignApprover(userId, orgUnitId, orgCustomerId, roleId);
    }
    unassignApprover(userId, orgUnitId, orgCustomerId, roleId) {
        return this.adapter.unassignApprover(userId, orgUnitId, orgCustomerId, roleId);
    }
    getAddresses(userId, orgUnitId) {
        return this.adapter.loadAddresses(userId, orgUnitId);
    }
    createAddress(userId, orgUnitId, address) {
        return this.adapter.createAddress(userId, orgUnitId, address);
    }
    updateAddress(userId, orgUnitId, addressId, address) {
        return this.adapter.updateAddress(userId, orgUnitId, addressId, address);
    }
    deleteAddress(userId, orgUnitId, addressId) {
        return this.adapter.deleteAddress(userId, orgUnitId, addressId);
    }
}
OrgUnitConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitConnector, deps: [{ token: OrgUnitAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
OrgUnitConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OrgUnitAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, permissionCode) {
        return this.adapter.load(userId, permissionCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    create(userId, permission) {
        return this.adapter.create(userId, permission);
    }
    update(userId, permissionCode, permission) {
        return this.adapter.update(userId, permissionCode, permission);
    }
    getTypes() {
        return this.adapter.loadTypes();
    }
}
PermissionConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionConnector, deps: [{ token: PermissionAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: PermissionAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupAdapter {
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, userGroupId) {
        return this.adapter.load(userId, userGroupId);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    getAvailableOrderApprovalPermissions(userId, userGroupId, params) {
        return this.adapter.loadAvailableOrderApprovalPermissions(userId, userGroupId, params);
    }
    getAvailableOrgCustomers(userId, userGroupId, params) {
        return this.adapter.loadAvailableOrgCustomers(userId, userGroupId, params);
    }
    create(userId, userGroup) {
        return this.adapter.create(userId, userGroup);
    }
    delete(userId, userGroupId) {
        return this.adapter.delete(userId, userGroupId);
    }
    update(userId, userGroupId, userGroup) {
        return this.adapter.update(userId, userGroupId, userGroup);
    }
    assignMember(userId, userGroupId, orgCustomerId) {
        return this.adapter.assignMember(userId, userGroupId, orgCustomerId);
    }
    assignOrderApprovalPermission(userId, userGroupId, orderApprovalPermissionCode) {
        return this.adapter.assignOrderApprovalPermission(userId, userGroupId, orderApprovalPermissionCode);
    }
    unassignMember(userId, userGroupId, orgCustomerId) {
        return this.adapter.unassignMember(userId, userGroupId, orgCustomerId);
    }
    unassignAllMembers(userId, userGroupId) {
        return this.adapter.unassignAllMembers(userId, userGroupId);
    }
    unassignOrderApprovalPermission(userId, userGroupId, orderApprovalPermissionCode) {
        return this.adapter.unassignOrderApprovalPermission(userId, userGroupId, orderApprovalPermissionCode);
    }
}
UserGroupConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupConnector, deps: [{ token: UserGroupAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: UserGroupAdapter }]; } });

class OrganizationBadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
        this.costCenterMask = /ambiguous unique keys \{code\=(.*)\} for model B2BCostCenterModel/;
        this.unitMask = /ambiguous unique keys \{uid\=(.*)\} for model B2BUnitModel/;
        this.permissionMask = /Approval Permission with code\: (.*) already exists\./;
        this.unknownMask = /Model saving error\./;
    }
    hasMatch(errorResponse) {
        return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
    }
    handleError(_request, response) {
        this.getErrors(response).forEach(({ message }) => {
            if (message) {
                // Handle cost center conflict
                this.handleOrganizationConflict(message, this.costCenterMask, 'costCenter');
                // Handle unit conflict
                this.handleOrganizationConflict(message, this.unitMask, 'unit');
                // Handle unit conflict
                this.handleOrganizationConflict(message, this.permissionMask, 'permission');
                // Handle unknown conflict
                this.handleOrganizationConflict(message, this.unknownMask, 'unknown');
            }
        });
    }
    matchMask(response) {
        return this.getErrors(response).some((error) => [
            this.costCenterMask,
            this.unitMask,
            this.permissionMask,
            this.unknownMask,
        ].some((mask) => { var _a; return mask.test((_a = error.message) !== null && _a !== void 0 ? _a : ''); }));
    }
    handleOrganizationConflict(message, mask, key) {
        const result = message.match(mask);
        const params = { code: result === null || result === void 0 ? void 0 : result[1] };
        if (result) {
            this.globalMessageService.add({ key: `organization.httpHandlers.conflict.${key}`, params }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        var _a;
        return (((_a = response.error) === null || _a === void 0 ? void 0 : _a.errors) || []).filter((error) => error.type === 'ModelSavingError' || error.type === 'DuplicateUidError');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
OrganizationBadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationBadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OrganizationBadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationBadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationBadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class OrganizationConflictHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.CONFLICT;
        this.budgetMask = /Budget with code \[(.*)\] already exists/;
        this.userMask = /User already exists/;
        this.userGroupMask = /Member Permission with the same id already exists/;
        this.unitMask = /Organizational unit with uid \[(.*)\] already exists/;
    }
    hasMatch(errorResponse) {
        return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
    }
    handleError(request, response) {
        return this.getErrors(response).forEach(({ message }) => {
            var _a, _b;
            if (message) {
                // Handle budget conflict
                this.handleConflict(message, this.budgetMask, 'budget');
                // Handle user email conflict
                this.handleConflict(message, this.userMask, 'user', (_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.email);
                // Handle user group conflict
                this.handleConflict(message, this.userGroupMask, 'userGroup', (_b = request === null || request === void 0 ? void 0 : request.body) === null || _b === void 0 ? void 0 : _b.uid);
                // Handle unit conflict
                this.handleConflict(message, this.unitMask, 'unit');
            }
        });
    }
    matchMask(response) {
        return this.getErrors(response).some((error) => [this.budgetMask, this.userMask, this.userGroupMask, this.unitMask].some((mask) => { var _a; return mask.test((_a = error.message) !== null && _a !== void 0 ? _a : ''); }));
    }
    handleConflict(message, mask, key, code) {
        var _a;
        const result = message.match(mask);
        const params = { code: (_a = result === null || result === void 0 ? void 0 : result[1]) !== null && _a !== void 0 ? _a : code };
        if (result) {
            this.globalMessageService.add({ key: `organization.httpHandlers.conflict.${key}`, params }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        var _a;
        return (((_a = response.error) === null || _a === void 0 ? void 0 : _a.errors) || []).filter((error) => error.type === 'AlreadyExistsError');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
OrganizationConflictHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationConflictHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
OrganizationConflictHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationConflictHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationConflictHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Resolves the page data for Organization Pages.
 *
 * Breadcrumbs are built in this implementation only.
 *
 * @property {string} ORGANIZATION_SEMANTIC_ROUTE the default root path for organization pages.
 * @property {string} ORGANIZATION_TRANSLATION_KEY the default i18n key for the organization breadcrumb label.
 */
class OrganizationPageMetaResolver extends PageMetaResolver {
    constructor(contentPageMetaResolver, translation, semanticPath, routingService) {
        super();
        this.contentPageMetaResolver = contentPageMetaResolver;
        this.translation = translation;
        this.semanticPath = semanticPath;
        this.routingService = routingService;
        this.pageTemplate = 'CompanyPageTemplate';
        this.pageType = PageType.CONTENT_PAGE;
        /**
         * Translation key for the breadcrumb of Organization home page
         */
        this.ORGANIZATION_TRANSLATION_KEY = 'organization.breadcrumb';
        /**
         * The semantic route of the organization landing page. It's used to recognize whether
         * we are on this page. In such a case we avoid showing the breadcrumb for this page.
         */
        this.ORGANIZATION_SEMANTIC_ROUTE = 'organization';
        /**
         * Breadcrumb of the Organization page.
         * It's empty when the current page is the Organization page.
         */
        this.organizationPageBreadcrumb$ = defer(() => this.routingService.getRouterState()).pipe(map((routerState) => { var _a; return (_a = routerState === null || routerState === void 0 ? void 0 : routerState.state) === null || _a === void 0 ? void 0 : _a.semanticRoute; }), distinctUntilChanged(), switchMap((semanticRoute) => semanticRoute === this.ORGANIZATION_SEMANTIC_ROUTE
            ? of([])
            : this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(map((label) => [
                {
                    label,
                    link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
                },
            ]))));
        /**
         * Breadcrumbs returned in the method #resolveBreadcrumbs.
         */
        this.breadcrumbs$ = combineLatest([
            this.organizationPageBreadcrumb$,
            defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
        ]).pipe(map(([organizationPageBreadcrumb, breadcrumbs = []]) => {
            const [home, ...restBreadcrumbs] = breadcrumbs;
            return [home, ...organizationPageBreadcrumb, ...restBreadcrumbs];
        }), shareReplay({ bufferSize: 1, refCount: true }));
    }
    resolveTitle() {
        return this.contentPageMetaResolver.resolveTitle();
    }
    resolveDescription() {
        return this.contentPageMetaResolver.resolveDescription();
    }
    resolveRobots() {
        return this.contentPageMetaResolver.resolveRobots();
    }
    /**
     * Returns list of breadcrumbs for:
     * - the home page
     * - the organization home page
     * - the organization's child pages (i.e. cost center list)
     * - sub-routes of the organization's child pages (i.e. cost center details, edit cost center, ...)
     */
    resolveBreadcrumbs() {
        return this.breadcrumbs$;
    }
}
OrganizationPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaResolver, deps: [{ token: i2.ContentPageMetaResolver }, { token: i2.TranslationService }, { token: i2.SemanticPathService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
OrganizationPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.ContentPageMetaResolver }, { type: i2.TranslationService }, { type: i2.SemanticPathService }, { type: i2.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrganizationPageMetaModule {
}
OrganizationPageMetaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationPageMetaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaModule });
OrganizationPageMetaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaModule, providers: [
        {
            provide: PageMetaResolver,
            useExisting: OrganizationPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationPageMetaModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: PageMetaResolver,
                            useExisting: OrganizationPageMetaResolver,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORGANIZATION_FEATURE = 'organization';
const BUDGET_FEATURE = 'budget';
const BUDGET_ENTITIES = 'budget-entities';
const BUDGET_LIST = 'budget-list';
const COST_CENTER_FEATURE = 'costCenter';
const COST_CENTER_ENTITIES = 'costCenter-entities';
const COST_CENTER_LIST = 'costCenter-list';
const COST_CENTER_ASSIGNED_BUDGETS = 'costCenter-assigned-budgets';
const PERMISSION_FEATURE = 'permission';
const PERMISSION_ENTITIES = 'permission-entities';
const PERMISSION_LIST = 'permission-list';
const PERMISSION_TYPES = 'permission-types';
const PERMISSION_TYPES_LIST = 'permission-types-list';
const ORG_UNIT_FEATURE = 'orgUnit';
const ORG_UNIT_NODE_ENTITIES = 'orgUnitNode-entities';
const ORG_UNIT_NODE_LIST = 'orgUnitNode-list';
const ORG_UNIT_ENTITIES = 'orgUnit-entities';
const ORG_UNIT_TREE_ENTITY = 'orgUnit-tree';
const ORG_UNIT_APPROVAL_PROCESSES_ENTITIES = 'orgUnit-approval-processes';
const ORG_UNIT_ASSIGNED_USERS = 'orgUnit-assigned-users';
const ORG_UNIT_TREE = 'tree';
const ORG_UNIT_APPROVAL_PROCESSES = 'approvalProcesses';
const ORG_UNIT_NODES = 'availableOrgUnitNodes';
const B2B_USER_FEATURE = 'b2bUser';
const B2B_USER_ENTITIES = 'b2bUser-entities';
const USER_LIST = 'b2bUser-list';
const B2B_USER_APPROVERS = 'b2bUser-approvers';
const B2B_USER_PERMISSIONS = 'b2bUser-permissions';
const B2B_USER_USER_GROUPS = 'b2bUser-user-groups';
const USER_GROUP_FEATURE = 'userGroup';
const USER_GROUP_ENTITIES = 'userGroup-entities';
const USER_GROUP_LIST = 'userGroup-list';
const USER_GROUP_PERMISSIONS = 'userGroup-available-order-approval-permissions';
const USER_GROUP_AVAILABLE_CUSTOMERS = 'userGroup-available-org-customers';
const ADDRESS_ENTITIES = 'addresses-entities';
const ADDRESS_LIST = 'addresses-list';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_BUDGET = '[Budget] Load Budget Data';
const LOAD_BUDGET_FAIL = '[Budget] Load Budget Data Fail';
const LOAD_BUDGET_SUCCESS = '[Budget] Load Budget Data Success';
const LOAD_BUDGETS = '[Budget] Load Budgets';
const LOAD_BUDGETS_FAIL = '[Budget] Load Budgets Fail';
const LOAD_BUDGETS_SUCCESS = '[Budget] Load Budgets Success';
const CREATE_BUDGET = '[Budget] Create Budget';
const CREATE_BUDGET_FAIL = '[Budget] Create Budget Fail';
const CREATE_BUDGET_SUCCESS = '[Budget] Create Budget Success';
const UPDATE_BUDGET = '[Budget] Update Budget';
const UPDATE_BUDGET_FAIL = '[Budget] Update Budget Fail';
const UPDATE_BUDGET_SUCCESS = '[Budget] Update Budget Success';
class LoadBudget extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode);
        this.payload = payload;
        this.type = LOAD_BUDGET;
    }
}
class LoadBudgetFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
        this.payload = payload;
        this.type = LOAD_BUDGET_FAIL;
    }
}
class LoadBudgetSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(BUDGET_ENTITIES, Array.isArray(payload)
            ? payload.map((budget) => { var _a; return (_a = budget === null || budget === void 0 ? void 0 : budget.code) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_BUDGET_SUCCESS;
    }
}
class LoadBudgets extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(BUDGET_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_BUDGETS;
    }
}
class LoadBudgetsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(BUDGET_LIST, StateUtils.serializeSearchConfig(payload.params), payload.error);
        this.payload = payload;
        this.type = LOAD_BUDGETS_FAIL;
    }
}
class LoadBudgetsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(BUDGET_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_BUDGETS_SUCCESS;
    }
}
class CreateBudget extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(BUDGET_ENTITIES, (_a = payload.budget.code) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_BUDGET;
    }
}
class CreateBudgetFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
        this.payload = payload;
        this.type = CREATE_BUDGET_FAIL;
    }
}
class CreateBudgetSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(BUDGET_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_BUDGET_SUCCESS;
    }
}
class UpdateBudget extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(BUDGET_ENTITIES, (_a = payload.budget.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_BUDGET;
    }
}
class UpdateBudgetFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
        this.payload = payload;
        this.type = UPDATE_BUDGET_FAIL;
    }
}
class UpdateBudgetSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(BUDGET_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_BUDGET_SUCCESS;
    }
}

var budget_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_BUDGET: LOAD_BUDGET,
    LOAD_BUDGET_FAIL: LOAD_BUDGET_FAIL,
    LOAD_BUDGET_SUCCESS: LOAD_BUDGET_SUCCESS,
    LOAD_BUDGETS: LOAD_BUDGETS,
    LOAD_BUDGETS_FAIL: LOAD_BUDGETS_FAIL,
    LOAD_BUDGETS_SUCCESS: LOAD_BUDGETS_SUCCESS,
    CREATE_BUDGET: CREATE_BUDGET,
    CREATE_BUDGET_FAIL: CREATE_BUDGET_FAIL,
    CREATE_BUDGET_SUCCESS: CREATE_BUDGET_SUCCESS,
    UPDATE_BUDGET: UPDATE_BUDGET,
    UPDATE_BUDGET_FAIL: UPDATE_BUDGET_FAIL,
    UPDATE_BUDGET_SUCCESS: UPDATE_BUDGET_SUCCESS,
    LoadBudget: LoadBudget,
    LoadBudgetFail: LoadBudgetFail,
    LoadBudgetSuccess: LoadBudgetSuccess,
    LoadBudgets: LoadBudgets,
    LoadBudgetsFail: LoadBudgetsFail,
    LoadBudgetsSuccess: LoadBudgetsSuccess,
    CreateBudget: CreateBudget,
    CreateBudgetFail: CreateBudgetFail,
    CreateBudgetSuccess: CreateBudgetSuccess,
    UpdateBudget: UpdateBudget,
    UpdateBudgetFail: UpdateBudgetFail,
    UpdateBudgetSuccess: UpdateBudgetSuccess
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_ORG_UNIT = '[B2BUnit] Load B2BUnit Data';
const LOAD_ORG_UNIT_FAIL = '[B2BUnit] Load B2BUnit Data Fail';
const LOAD_ORG_UNIT_SUCCESS = '[B2BUnit] Load B2BUnit Data Success';
const LOAD_UNIT_NODE = '[B2BUnitNode] Load B2BUnitNode Data';
const LOAD_UNIT_NODE_FAIL = '[B2BUnitNode] Load B2BUnitNode Data Fail';
const LOAD_UNIT_NODE_SUCCESS = '[B2BUnitNode] Load B2BUnitNode Data Success';
const LOAD_UNIT_NODES = '[B2BUnitNode] Load B2BUnitNodes';
const LOAD_UNIT_NODES_FAIL = '[B2BUnitNode] Load B2BUnitNodes Fail';
const LOAD_UNIT_NODES_SUCCESS = '[B2BUnitNode] Load B2BUnitNodes Success';
const CREATE_ORG_UNIT = '[B2BUnit] Create B2BUnitNode';
const CREATE_ORG_UNIT_FAIL = '[B2BUnit] Create B2BUnitNode Fail';
const CREATE_ORG_UNIT_SUCCESS = '[B2BUnit] Create B2BUnitNode Success';
const UPDATE_ORG_UNIT = '[B2BUnit] Update B2BUnitNode';
const UPDATE_ORG_UNIT_FAIL = '[B2BUnit] Update B2BUnitNode Fail';
const UPDATE_ORG_UNIT_SUCCESS = '[B2BUnit] Update B2BUnitNode Success';
const LOAD_UNIT_TREE = '[B2BUnitNode] Load Tree';
const LOAD_UNIT_TREE_FAIL = '[B2BUnitNode] Load Tree Fail';
const LOAD_UNIT_TREE_SUCCESS = '[B2BUnitNode] Load Tree Success';
const LOAD_APPROVAL_PROCESSES = '[B2BApprovalProcess] Load Approval Processes';
const LOAD_APPROVAL_PROCESSES_FAIL = '[B2BApprovalProcess] Load Approval Processes Fail';
const LOAD_APPROVAL_PROCESSES_SUCCESS = '[B2BApprovalProcess] Load Approval Processes Success';
const LOAD_ASSIGNED_USERS = '[B2BUnit] Load Users';
const LOAD_ASSIGNED_USERS_SUCCESS = '[B2BUnit] Load Users success';
const LOAD_ASSIGNED_USERS_FAIL = '[B2BUnit] Load Users fail';
const ASSIGN_ROLE = '[B2BUnit] Assign Role';
const ASSIGN_ROLE_SUCCESS = '[B2BUnit] Assign Role success';
const ASSIGN_ROLE_FAIL = '[B2BUnit] Assign Role fail';
const UNASSIGN_ROLE = '[B2BUnit] Unassign Role';
const UNASSIGN_ROLE_SUCCESS = '[B2BUnit] Unassign Role success';
const UNASSIGN_ROLE_FAIL = '[B2BUnit] Unassign Role fail';
const ASSIGN_APPROVER = '[B2BUnit] Assign Approver';
const ASSIGN_APPROVER_SUCCESS = '[B2BUnit] Assign Approver success';
const ASSIGN_APPROVER_FAIL = '[B2BUnit] Assign Approver fail';
const UNASSIGN_APPROVER = '[B2BUnit] Unassign Approver';
const UNASSIGN_APPROVER_SUCCESS = '[B2BUnit] Unassign Approver success';
const UNASSIGN_APPROVER_FAIL = '[B2BUnit] Unassign Approver fail';
const CREATE_ADDRESS = '[B2BUnit] Create address';
const CREATE_ADDRESS_SUCCESS = '[B2BUnit] Create address success';
const CREATE_ADDRESS_FAIL = '[B2BUnit] Create address fail';
const UPDATE_ADDRESS = '[B2BUnit] Update address';
const UPDATE_ADDRESS_SUCCESS = '[B2BUnit] Update address success';
const UPDATE_ADDRESS_FAIL = '[B2BUnit] Update address fail';
const DELETE_ADDRESS = '[B2BUnit] Delete address';
const DELETE_ADDRESS_SUCCESS = '[B2BUnit] Delete address success';
const DELETE_ADDRESS_FAIL = '[B2BUnit] Delete address fail';
const LOAD_ADDRESS_SUCCESS = '[B2BUnit] Load address success';
const LOAD_ADDRESSES = '[B2BUnit] Load addresses';
const LOAD_ADDRESSES_SUCCESS = '[B2BUnit] Load addresses success';
const LOAD_ADDRESSES_FAIL = '[B2BUnit] Load addresses fail';
const CLEAR_ASSIGNED_USERS = '[B2BUnit] Clear Assigned Users';
class LoadOrgUnit extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORG_UNIT_ENTITIES, payload.orgUnitId);
        this.payload = payload;
        this.type = LOAD_ORG_UNIT;
    }
}
class LoadOrgUnitFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_ENTITIES, payload.orgUnitId, payload.error);
        this.payload = payload;
        this.type = LOAD_ORG_UNIT_FAIL;
    }
}
class LoadOrgUnitSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ORG_UNIT_ENTITIES, Array.isArray(payload)
            ? payload.map((orgUnit) => { var _a; return (_a = orgUnit === null || orgUnit === void 0 ? void 0 : orgUnit.uid) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.uid) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_ORG_UNIT_SUCCESS;
    }
}
class LoadOrgUnitNodes extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES);
        this.payload = payload;
        this.type = LOAD_UNIT_NODES;
    }
}
class LoadOrgUnitNodesFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES, payload.error);
        this.payload = payload;
        this.type = LOAD_UNIT_NODES_FAIL;
    }
}
class LoadOrgUnitNodesSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(ORG_UNIT_NODE_LIST, ORG_UNIT_NODES);
        this.payload = payload;
        this.type = LOAD_UNIT_NODES_SUCCESS;
    }
}
class CreateUnit extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(ORG_UNIT_ENTITIES, (_a = payload.unit.uid) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_ORG_UNIT;
    }
}
class CreateUnitFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_ENTITIES, payload.unitCode, payload.error);
        this.payload = payload;
        this.type = CREATE_ORG_UNIT_FAIL;
    }
}
class CreateUnitSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ORG_UNIT_ENTITIES, (_a = payload.uid) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_ORG_UNIT_SUCCESS;
    }
}
class UpdateUnit extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(ORG_UNIT_ENTITIES, (_a = payload.unit.uid) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_ORG_UNIT;
    }
}
class UpdateUnitFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_ENTITIES, payload.unitCode, payload.error);
        this.payload = payload;
        this.type = UPDATE_ORG_UNIT_FAIL;
    }
}
class UpdateUnitSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ORG_UNIT_ENTITIES, (_a = payload.uid) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_ORG_UNIT_SUCCESS;
    }
}
class LoadTree extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE);
        this.payload = payload;
        this.type = LOAD_UNIT_TREE;
    }
}
class LoadTreeFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE, payload.error);
        this.payload = payload;
        this.type = LOAD_UNIT_TREE_FAIL;
    }
}
class LoadTreeSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(ORG_UNIT_TREE_ENTITY, ORG_UNIT_TREE);
        this.payload = payload;
        this.type = LOAD_UNIT_TREE_SUCCESS;
    }
}
class LoadApprovalProcesses extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES);
        this.payload = payload;
        this.type = LOAD_APPROVAL_PROCESSES;
    }
}
class LoadApprovalProcessesFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES, payload.error);
        this.payload = payload;
        this.type = LOAD_APPROVAL_PROCESSES_FAIL;
    }
}
class LoadApprovalProcessesSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_APPROVAL_PROCESSES);
        this.payload = payload;
        this.type = LOAD_APPROVAL_PROCESSES_SUCCESS;
    }
}
class LoadAssignedUsers extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORG_UNIT_ASSIGNED_USERS, StateUtils.serializeSearchConfig(payload.params, `${payload.orgUnitId},${payload.roleId}`));
        this.payload = payload;
        this.type = LOAD_ASSIGNED_USERS;
    }
}
class ClearAssignedUsers extends StateUtils.EntityRemoveAction {
    constructor(payload) {
        super(ORG_UNIT_ASSIGNED_USERS, StateUtils.serializeSearchConfig(payload.params, `${payload.orgUnitId},${payload.roleId}`));
        this.payload = payload;
        this.type = CLEAR_ASSIGNED_USERS;
    }
}
class LoadAssignedUsersFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORG_UNIT_ASSIGNED_USERS, StateUtils.serializeSearchConfig(payload.params, `${payload.orgUnitId},${payload.roleId}`), payload.error);
        this.payload = payload;
        this.type = LOAD_ASSIGNED_USERS_FAIL;
    }
}
class LoadAssignedUsersSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(ORG_UNIT_ASSIGNED_USERS, StateUtils.serializeSearchConfig(payload.params, `${payload.orgUnitId},${payload.roleId}`));
        this.payload = payload;
        this.type = LOAD_ASSIGNED_USERS_SUCCESS;
    }
}
class AssignRole extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId);
        this.payload = payload;
        this.type = ASSIGN_ROLE;
    }
}
class AssignRoleFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = ASSIGN_ROLE_FAIL;
    }
}
class AssignRoleSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.uid, payload);
        this.payload = payload;
        this.type = ASSIGN_ROLE_SUCCESS;
    }
}
class UnassignRole extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId);
        this.payload = payload;
        this.type = UNASSIGN_ROLE;
    }
}
class UnassignRoleFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = UNASSIGN_ROLE_FAIL;
    }
}
class UnassignRoleSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.uid, payload);
        this.payload = payload;
        this.type = UNASSIGN_ROLE_SUCCESS;
    }
}
class AssignApprover extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId);
        this.payload = payload;
        this.type = ASSIGN_APPROVER;
    }
}
class AssignApproverFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = ASSIGN_APPROVER_FAIL;
    }
}
class AssignApproverSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.uid, payload);
        this.payload = payload;
        this.type = ASSIGN_APPROVER_SUCCESS;
    }
}
class UnassignApprover extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId);
        this.payload = payload;
        this.type = UNASSIGN_APPROVER;
    }
}
class UnassignApproverFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = UNASSIGN_APPROVER_FAIL;
    }
}
class UnassignApproverSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.uid, payload);
        this.payload = payload;
        this.type = UNASSIGN_APPROVER_SUCCESS;
    }
}
class CreateAddress extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(ADDRESS_ENTITIES, (_a = payload.address.id) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_ADDRESS;
    }
}
class CreateAddressFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ADDRESS_ENTITIES, payload.addressId, payload.error);
        this.payload = payload;
        this.type = CREATE_ADDRESS_FAIL;
    }
}
class CreateAddressSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ADDRESS_ENTITIES, (_a = payload.id) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_ADDRESS_SUCCESS;
    }
}
class UpdateAddress extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(ADDRESS_ENTITIES, (_a = payload.address.id) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_ADDRESS;
    }
}
class UpdateAddressFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ADDRESS_ENTITIES, payload.addressId, payload.error);
        this.payload = payload;
        this.type = UPDATE_ADDRESS_FAIL;
    }
}
class UpdateAddressSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ADDRESS_ENTITIES, (_a = payload.id) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_ADDRESS_SUCCESS;
    }
}
class DeleteAddress extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ADDRESS_ENTITIES, payload.addressId);
        this.payload = payload;
        this.type = DELETE_ADDRESS;
    }
}
class DeleteAddressFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ADDRESS_ENTITIES, payload.addressId, payload.error);
        this.payload = payload;
        this.type = DELETE_ADDRESS_FAIL;
    }
}
class DeleteAddressSuccess extends StateUtils.EntityRemoveAction {
    constructor(payload) {
        var _a;
        super(ADDRESS_ENTITIES, (_a = payload.id) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = DELETE_ADDRESS_SUCCESS;
    }
}
class LoadAddressSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ADDRESS_ENTITIES, Array.isArray(payload)
            ? payload.map((address) => { var _a; return (_a = address === null || address === void 0 ? void 0 : address.id) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.id) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_ADDRESS_SUCCESS;
    }
}
class LoadAddresses extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ADDRESS_LIST, payload.orgUnitId);
        this.payload = payload;
        this.type = LOAD_ADDRESSES;
    }
}
class LoadAddressesFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ADDRESS_LIST, payload.orgUnitId, payload.error);
        this.payload = payload;
        this.type = LOAD_ADDRESSES_FAIL;
    }
}
class LoadAddressesSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(ADDRESS_LIST, payload.orgUnitId);
        this.payload = payload;
        this.type = LOAD_ADDRESSES_SUCCESS;
    }
}

var orgUnit_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_ORG_UNIT: LOAD_ORG_UNIT,
    LOAD_ORG_UNIT_FAIL: LOAD_ORG_UNIT_FAIL,
    LOAD_ORG_UNIT_SUCCESS: LOAD_ORG_UNIT_SUCCESS,
    LOAD_UNIT_NODE: LOAD_UNIT_NODE,
    LOAD_UNIT_NODE_FAIL: LOAD_UNIT_NODE_FAIL,
    LOAD_UNIT_NODE_SUCCESS: LOAD_UNIT_NODE_SUCCESS,
    LOAD_UNIT_NODES: LOAD_UNIT_NODES,
    LOAD_UNIT_NODES_FAIL: LOAD_UNIT_NODES_FAIL,
    LOAD_UNIT_NODES_SUCCESS: LOAD_UNIT_NODES_SUCCESS,
    CREATE_ORG_UNIT: CREATE_ORG_UNIT,
    CREATE_ORG_UNIT_FAIL: CREATE_ORG_UNIT_FAIL,
    CREATE_ORG_UNIT_SUCCESS: CREATE_ORG_UNIT_SUCCESS,
    UPDATE_ORG_UNIT: UPDATE_ORG_UNIT,
    UPDATE_ORG_UNIT_FAIL: UPDATE_ORG_UNIT_FAIL,
    UPDATE_ORG_UNIT_SUCCESS: UPDATE_ORG_UNIT_SUCCESS,
    LOAD_UNIT_TREE: LOAD_UNIT_TREE,
    LOAD_UNIT_TREE_FAIL: LOAD_UNIT_TREE_FAIL,
    LOAD_UNIT_TREE_SUCCESS: LOAD_UNIT_TREE_SUCCESS,
    LOAD_APPROVAL_PROCESSES: LOAD_APPROVAL_PROCESSES,
    LOAD_APPROVAL_PROCESSES_FAIL: LOAD_APPROVAL_PROCESSES_FAIL,
    LOAD_APPROVAL_PROCESSES_SUCCESS: LOAD_APPROVAL_PROCESSES_SUCCESS,
    LOAD_ASSIGNED_USERS: LOAD_ASSIGNED_USERS,
    LOAD_ASSIGNED_USERS_SUCCESS: LOAD_ASSIGNED_USERS_SUCCESS,
    LOAD_ASSIGNED_USERS_FAIL: LOAD_ASSIGNED_USERS_FAIL,
    ASSIGN_ROLE: ASSIGN_ROLE,
    ASSIGN_ROLE_SUCCESS: ASSIGN_ROLE_SUCCESS,
    ASSIGN_ROLE_FAIL: ASSIGN_ROLE_FAIL,
    UNASSIGN_ROLE: UNASSIGN_ROLE,
    UNASSIGN_ROLE_SUCCESS: UNASSIGN_ROLE_SUCCESS,
    UNASSIGN_ROLE_FAIL: UNASSIGN_ROLE_FAIL,
    ASSIGN_APPROVER: ASSIGN_APPROVER,
    ASSIGN_APPROVER_SUCCESS: ASSIGN_APPROVER_SUCCESS,
    ASSIGN_APPROVER_FAIL: ASSIGN_APPROVER_FAIL,
    UNASSIGN_APPROVER: UNASSIGN_APPROVER,
    UNASSIGN_APPROVER_SUCCESS: UNASSIGN_APPROVER_SUCCESS,
    UNASSIGN_APPROVER_FAIL: UNASSIGN_APPROVER_FAIL,
    CREATE_ADDRESS: CREATE_ADDRESS,
    CREATE_ADDRESS_SUCCESS: CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAIL: CREATE_ADDRESS_FAIL,
    UPDATE_ADDRESS: UPDATE_ADDRESS,
    UPDATE_ADDRESS_SUCCESS: UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL: UPDATE_ADDRESS_FAIL,
    DELETE_ADDRESS: DELETE_ADDRESS,
    DELETE_ADDRESS_SUCCESS: DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL: DELETE_ADDRESS_FAIL,
    LOAD_ADDRESS_SUCCESS: LOAD_ADDRESS_SUCCESS,
    LOAD_ADDRESSES: LOAD_ADDRESSES,
    LOAD_ADDRESSES_SUCCESS: LOAD_ADDRESSES_SUCCESS,
    LOAD_ADDRESSES_FAIL: LOAD_ADDRESSES_FAIL,
    CLEAR_ASSIGNED_USERS: CLEAR_ASSIGNED_USERS,
    LoadOrgUnit: LoadOrgUnit,
    LoadOrgUnitFail: LoadOrgUnitFail,
    LoadOrgUnitSuccess: LoadOrgUnitSuccess,
    LoadOrgUnitNodes: LoadOrgUnitNodes,
    LoadOrgUnitNodesFail: LoadOrgUnitNodesFail,
    LoadOrgUnitNodesSuccess: LoadOrgUnitNodesSuccess,
    CreateUnit: CreateUnit,
    CreateUnitFail: CreateUnitFail,
    CreateUnitSuccess: CreateUnitSuccess,
    UpdateUnit: UpdateUnit,
    UpdateUnitFail: UpdateUnitFail,
    UpdateUnitSuccess: UpdateUnitSuccess,
    LoadTree: LoadTree,
    LoadTreeFail: LoadTreeFail,
    LoadTreeSuccess: LoadTreeSuccess,
    LoadApprovalProcesses: LoadApprovalProcesses,
    LoadApprovalProcessesFail: LoadApprovalProcessesFail,
    LoadApprovalProcessesSuccess: LoadApprovalProcessesSuccess,
    LoadAssignedUsers: LoadAssignedUsers,
    ClearAssignedUsers: ClearAssignedUsers,
    LoadAssignedUsersFail: LoadAssignedUsersFail,
    LoadAssignedUsersSuccess: LoadAssignedUsersSuccess,
    AssignRole: AssignRole,
    AssignRoleFail: AssignRoleFail,
    AssignRoleSuccess: AssignRoleSuccess,
    UnassignRole: UnassignRole,
    UnassignRoleFail: UnassignRoleFail,
    UnassignRoleSuccess: UnassignRoleSuccess,
    AssignApprover: AssignApprover,
    AssignApproverFail: AssignApproverFail,
    AssignApproverSuccess: AssignApproverSuccess,
    UnassignApprover: UnassignApprover,
    UnassignApproverFail: UnassignApproverFail,
    UnassignApproverSuccess: UnassignApproverSuccess,
    CreateAddress: CreateAddress,
    CreateAddressFail: CreateAddressFail,
    CreateAddressSuccess: CreateAddressSuccess,
    UpdateAddress: UpdateAddress,
    UpdateAddressFail: UpdateAddressFail,
    UpdateAddressSuccess: UpdateAddressSuccess,
    DeleteAddress: DeleteAddress,
    DeleteAddressFail: DeleteAddressFail,
    DeleteAddressSuccess: DeleteAddressSuccess,
    LoadAddressSuccess: LoadAddressSuccess,
    LoadAddresses: LoadAddresses,
    LoadAddressesFail: LoadAddressesFail,
    LoadAddressesSuccess: LoadAddressesSuccess
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_USER_GROUP = '[UserGroup] Load UserGroup Data';
const LOAD_USER_GROUP_FAIL = '[UserGroup] Load UserGroup Data Fail';
const LOAD_USER_GROUP_SUCCESS = '[UserGroup] Load UserGroup Data Success';
const LOAD_USER_GROUPS = '[UserGroup] Load UserGroups';
const LOAD_USER_GROUPS_FAIL = '[UserGroup] Load UserGroups Fail';
const LOAD_USER_GROUPS_SUCCESS = '[UserGroup] Load UserGroups Success';
const LOAD_USER_GROUP_PERMISSIONS = '[UserGroup] Load Permissions Data';
const LOAD_USER_GROUP_PERMISSIONS_FAIL = '[UserGroup] Load Permissions Data Fail';
const LOAD_USER_GROUP_PERMISSIONS_SUCCESS = '[UserGroup] Load Permissions Data Success';
const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS = '[UserGroup] Load Customers Data';
const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL = '[UserGroup] Load Customers Data Fail';
const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS = '[UserGroup] Load Customers Data Success';
const CREATE_USER_GROUP = '[UserGroup] Create UserGroup';
const CREATE_USER_GROUP_FAIL = '[UserGroup] Create UserGroup Fail';
const CREATE_USER_GROUP_SUCCESS = '[UserGroup] Create UserGroup Success';
const USER_GROUP_ASSIGN_MEMBER = '[UserGroup] Assign Member';
const USER_GROUP_ASSIGN_MEMBER_FAIL = '[UserGroup] Assign Member Fail';
const USER_GROUP_ASSIGN_MEMBER_SUCCESS = '[UserGroup] Assign Member Success';
const USER_GROUP_ASSIGN_PERMISSION = '[UserGroup] Assign Permissions';
const USER_GROUP_ASSIGN_PERMISSION_FAIL = '[UserGroup] Assign Permissions Fail';
const USER_GROUP_ASSIGN_PERMISSION_SUCCESS = '[UserGroup] Assign Permissions Success';
const UPDATE_USER_GROUP = '[UserGroup] Update UserGroup';
const UPDATE_USER_GROUP_FAIL = '[UserGroup] Update UserGroup Fail';
const UPDATE_USER_GROUP_SUCCESS = '[UserGroup] Update UserGroup Success';
const DELETE_USER_GROUP = '[UserGroup] Delete UserGroup';
const DELETE_USER_GROUP_FAIL = '[UserGroup] Delete UserGroup Fail';
const DELETE_USER_GROUP_SUCCESS = '[UserGroup] Delete UserGroup Success';
const USER_GROUP_UNASSIGN_ALL_MEMBERS = '[UserGroup] Unassign Members';
const USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL = '[UserGroup] Unassign Members Fail';
const USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS = '[UserGroup] Unassign Members Success';
const USER_GROUP_UNASSIGN_MEMBER = '[UserGroup] Unassign Member';
const USER_GROUP_UNASSIGN_MEMBER_FAIL = '[UserGroup] Unassign Member Fail';
const USER_GROUP_UNASSIGN_MEMBER_SUCCESS = '[UserGroup] Unassign Member Success';
const USER_GROUP_UNASSIGN_PERMISSION = '[UserGroup] Unassign Permission';
const USER_GROUP_UNASSIGN_PERMISSION_FAIL = '[UserGroup] Unassign Permission Fail';
const USER_GROUP_UNASSIGN_PERMISSION_SUCCESS = '[UserGroup] Unassign Permission Success';
class LoadUserGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId);
        this.payload = payload;
        this.type = LOAD_USER_GROUP;
    }
}
class LoadUserGroupFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = LOAD_USER_GROUP_FAIL;
    }
}
class LoadUserGroupSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, Array.isArray(payload)
            ? payload.map((userGroup) => { var _a; return (_a = userGroup === null || userGroup === void 0 ? void 0 : userGroup.uid) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.uid) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_USER_GROUP_SUCCESS;
    }
}
class LoadUserGroups extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_USER_GROUPS;
    }
}
class LoadUserGroupsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_LIST, StateUtils.serializeSearchConfig(payload.params), payload.error);
        this.payload = payload;
        this.type = LOAD_USER_GROUPS_FAIL;
    }
}
class LoadUserGroupsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(USER_GROUP_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_USER_GROUPS_SUCCESS;
    }
}
class LoadPermissions$1 extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_PERMISSIONS, StateUtils.serializeSearchConfig(payload.params, payload.userGroupId));
        this.payload = payload;
        this.type = LOAD_USER_GROUP_PERMISSIONS;
    }
}
class LoadPermissionsFail$1 extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_PERMISSIONS, StateUtils.serializeSearchConfig(payload.params, payload.userGroupId), payload.error);
        this.payload = payload;
        this.type = LOAD_USER_GROUP_PERMISSIONS_FAIL;
    }
}
class LoadPermissionsSuccess$1 extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(USER_GROUP_PERMISSIONS, StateUtils.serializeSearchConfig(payload.params, payload.userGroupId));
        this.payload = payload;
        this.type = LOAD_USER_GROUP_PERMISSIONS_SUCCESS;
    }
}
class LoadAvailableOrgCustomers extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_AVAILABLE_CUSTOMERS, StateUtils.serializeSearchConfig(payload.params, payload.userGroupId));
        this.payload = payload;
        this.type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS;
    }
}
class LoadAvailableOrgCustomersFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_AVAILABLE_CUSTOMERS, StateUtils.serializeSearchConfig(payload.params, payload.userGroupId), payload.error);
        this.payload = payload;
        this.type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL;
    }
}
class LoadAvailableOrgCustomersSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(USER_GROUP_AVAILABLE_CUSTOMERS, StateUtils.serializeSearchConfig(payload.params, payload.userGroupId));
        this.payload = payload;
        this.type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS;
    }
}
class CreateUserGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, (_a = payload.userGroup.uid) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_USER_GROUP;
    }
}
class CreateUserGroupFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = CREATE_USER_GROUP_FAIL;
    }
}
class CreateUserGroupSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, (_a = payload.uid) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_USER_GROUP_SUCCESS;
    }
}
class AssignMember extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.customerId);
        this.payload = payload;
        this.type = USER_GROUP_ASSIGN_MEMBER;
    }
}
class AssignMemberFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.customerId, payload.error);
        this.payload = payload;
        this.type = USER_GROUP_ASSIGN_MEMBER_FAIL;
    }
}
class AssignMemberSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.customerId, payload);
        this.payload = payload;
        this.type = USER_GROUP_ASSIGN_MEMBER_SUCCESS;
    }
}
class AssignPermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionUid);
        this.payload = payload;
        this.type = USER_GROUP_ASSIGN_PERMISSION;
    }
}
class AssignPermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionUid, payload.error);
        this.payload = payload;
        this.type = USER_GROUP_ASSIGN_PERMISSION_FAIL;
    }
}
class AssignPermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionUid, payload);
        this.payload = payload;
        this.type = USER_GROUP_ASSIGN_PERMISSION_SUCCESS;
    }
}
class UpdateUserGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, (_a = payload.userGroup.uid) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_USER_GROUP;
    }
}
class UpdateUserGroupFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = UPDATE_USER_GROUP_FAIL;
    }
}
class UpdateUserGroupSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, (_a = payload.uid) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_USER_GROUP_SUCCESS;
    }
}
class DeleteUserGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId);
        this.payload = payload;
        this.type = DELETE_USER_GROUP;
    }
}
class DeleteUserGroupFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = DELETE_USER_GROUP_FAIL;
    }
}
class DeleteUserGroupSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, (_a = payload.uid) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = DELETE_USER_GROUP_SUCCESS;
    }
}
class UnassignMember extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.customerId);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_MEMBER;
    }
}
class UnassignMemberFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.customerId, payload.error);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_MEMBER_FAIL;
    }
}
class UnassignMemberSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.customerId, payload);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_MEMBER_SUCCESS;
    }
}
class UnassignAllMembers extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_ALL_MEMBERS;
    }
}
class UnassignAllMembersFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL;
    }
}
class UnassignAllMembersSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(USER_GROUP_ENTITIES, (_a = payload.uid) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS;
    }
}
class UnassignPermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionUid);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_PERMISSION;
    }
}
class UnassignPermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionUid, payload.error);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_PERMISSION_FAIL;
    }
}
class UnassignPermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionUid, payload);
        this.payload = payload;
        this.type = USER_GROUP_UNASSIGN_PERMISSION_SUCCESS;
    }
}

var userGroup_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_USER_GROUP: LOAD_USER_GROUP,
    LOAD_USER_GROUP_FAIL: LOAD_USER_GROUP_FAIL,
    LOAD_USER_GROUP_SUCCESS: LOAD_USER_GROUP_SUCCESS,
    LOAD_USER_GROUPS: LOAD_USER_GROUPS,
    LOAD_USER_GROUPS_FAIL: LOAD_USER_GROUPS_FAIL,
    LOAD_USER_GROUPS_SUCCESS: LOAD_USER_GROUPS_SUCCESS,
    LOAD_USER_GROUP_PERMISSIONS: LOAD_USER_GROUP_PERMISSIONS,
    LOAD_USER_GROUP_PERMISSIONS_FAIL: LOAD_USER_GROUP_PERMISSIONS_FAIL,
    LOAD_USER_GROUP_PERMISSIONS_SUCCESS: LOAD_USER_GROUP_PERMISSIONS_SUCCESS,
    LOAD_USER_GROUP_AVAILABLE_CUSTOMERS: LOAD_USER_GROUP_AVAILABLE_CUSTOMERS,
    LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL: LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL,
    LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS: LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS,
    CREATE_USER_GROUP: CREATE_USER_GROUP,
    CREATE_USER_GROUP_FAIL: CREATE_USER_GROUP_FAIL,
    CREATE_USER_GROUP_SUCCESS: CREATE_USER_GROUP_SUCCESS,
    USER_GROUP_ASSIGN_MEMBER: USER_GROUP_ASSIGN_MEMBER,
    USER_GROUP_ASSIGN_MEMBER_FAIL: USER_GROUP_ASSIGN_MEMBER_FAIL,
    USER_GROUP_ASSIGN_MEMBER_SUCCESS: USER_GROUP_ASSIGN_MEMBER_SUCCESS,
    USER_GROUP_ASSIGN_PERMISSION: USER_GROUP_ASSIGN_PERMISSION,
    USER_GROUP_ASSIGN_PERMISSION_FAIL: USER_GROUP_ASSIGN_PERMISSION_FAIL,
    USER_GROUP_ASSIGN_PERMISSION_SUCCESS: USER_GROUP_ASSIGN_PERMISSION_SUCCESS,
    UPDATE_USER_GROUP: UPDATE_USER_GROUP,
    UPDATE_USER_GROUP_FAIL: UPDATE_USER_GROUP_FAIL,
    UPDATE_USER_GROUP_SUCCESS: UPDATE_USER_GROUP_SUCCESS,
    DELETE_USER_GROUP: DELETE_USER_GROUP,
    DELETE_USER_GROUP_FAIL: DELETE_USER_GROUP_FAIL,
    DELETE_USER_GROUP_SUCCESS: DELETE_USER_GROUP_SUCCESS,
    USER_GROUP_UNASSIGN_ALL_MEMBERS: USER_GROUP_UNASSIGN_ALL_MEMBERS,
    USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL: USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL,
    USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS: USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS,
    USER_GROUP_UNASSIGN_MEMBER: USER_GROUP_UNASSIGN_MEMBER,
    USER_GROUP_UNASSIGN_MEMBER_FAIL: USER_GROUP_UNASSIGN_MEMBER_FAIL,
    USER_GROUP_UNASSIGN_MEMBER_SUCCESS: USER_GROUP_UNASSIGN_MEMBER_SUCCESS,
    USER_GROUP_UNASSIGN_PERMISSION: USER_GROUP_UNASSIGN_PERMISSION,
    USER_GROUP_UNASSIGN_PERMISSION_FAIL: USER_GROUP_UNASSIGN_PERMISSION_FAIL,
    USER_GROUP_UNASSIGN_PERMISSION_SUCCESS: USER_GROUP_UNASSIGN_PERMISSION_SUCCESS,
    LoadUserGroup: LoadUserGroup,
    LoadUserGroupFail: LoadUserGroupFail,
    LoadUserGroupSuccess: LoadUserGroupSuccess,
    LoadUserGroups: LoadUserGroups,
    LoadUserGroupsFail: LoadUserGroupsFail,
    LoadUserGroupsSuccess: LoadUserGroupsSuccess,
    LoadPermissions: LoadPermissions$1,
    LoadPermissionsFail: LoadPermissionsFail$1,
    LoadPermissionsSuccess: LoadPermissionsSuccess$1,
    LoadAvailableOrgCustomers: LoadAvailableOrgCustomers,
    LoadAvailableOrgCustomersFail: LoadAvailableOrgCustomersFail,
    LoadAvailableOrgCustomersSuccess: LoadAvailableOrgCustomersSuccess,
    CreateUserGroup: CreateUserGroup,
    CreateUserGroupFail: CreateUserGroupFail,
    CreateUserGroupSuccess: CreateUserGroupSuccess,
    AssignMember: AssignMember,
    AssignMemberFail: AssignMemberFail,
    AssignMemberSuccess: AssignMemberSuccess,
    AssignPermission: AssignPermission,
    AssignPermissionFail: AssignPermissionFail,
    AssignPermissionSuccess: AssignPermissionSuccess,
    UpdateUserGroup: UpdateUserGroup,
    UpdateUserGroupFail: UpdateUserGroupFail,
    UpdateUserGroupSuccess: UpdateUserGroupSuccess,
    DeleteUserGroup: DeleteUserGroup,
    DeleteUserGroupFail: DeleteUserGroupFail,
    DeleteUserGroupSuccess: DeleteUserGroupSuccess,
    UnassignMember: UnassignMember,
    UnassignMemberFail: UnassignMemberFail,
    UnassignMemberSuccess: UnassignMemberSuccess,
    UnassignAllMembers: UnassignAllMembers,
    UnassignAllMembersFail: UnassignAllMembersFail,
    UnassignAllMembersSuccess: UnassignAllMembersSuccess,
    UnassignPermission: UnassignPermission,
    UnassignPermissionFail: UnassignPermissionFail,
    UnassignPermissionSuccess: UnassignPermissionSuccess
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_PERMISSION = '[Permission] Load Permission Data';
const LOAD_PERMISSION_FAIL = '[Permission] Load Permission Data Fail';
const LOAD_PERMISSION_SUCCESS = '[Permission] Load Permission Data Success';
const LOAD_PERMISSIONS = '[Permission] Load Permissions';
const LOAD_PERMISSIONS_FAIL = '[Permission] Load Permissions Fail';
const LOAD_PERMISSIONS_SUCCESS = '[Permission] Load Permissions Success';
const CREATE_PERMISSION = '[Permission] Create Permission';
const CREATE_PERMISSION_FAIL = '[Permission] Create Permission Fail';
const CREATE_PERMISSION_SUCCESS = '[Permission] Create Permission Success';
const UPDATE_PERMISSION = '[Permission] Update Permission';
const UPDATE_PERMISSION_FAIL = '[Permission] Update Permission Fail';
const UPDATE_PERMISSION_SUCCESS = '[Permission] Update Permission Success';
const LOAD_PERMISSION_TYPES = '[Permission Types] Load Permission Types';
const LOAD_PERMISSION_TYPES_FAIL = '[Permission Types] Load Permission Types Fail';
const LOAD_PERMISSION_TYPES_SUCCESS = '[Permission Types] Load Permission Types Success';
class LoadPermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionCode);
        this.payload = payload;
        this.type = LOAD_PERMISSION;
    }
}
class LoadPermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
        this.payload = payload;
        this.type = LOAD_PERMISSION_FAIL;
    }
}
class LoadPermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(PERMISSION_ENTITIES, Array.isArray(payload)
            ? payload.map((permission) => { var _a; return (_a = permission === null || permission === void 0 ? void 0 : permission.code) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_PERMISSION_SUCCESS;
    }
}
class LoadPermissions extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PERMISSION_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_PERMISSIONS;
    }
}
class LoadPermissionsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_LIST, StateUtils.serializeSearchConfig(payload.params), payload.error);
        this.payload = payload;
        this.type = LOAD_PERMISSIONS_FAIL;
    }
}
class LoadPermissionsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PERMISSION_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_PERMISSIONS_SUCCESS;
    }
}
class CreatePermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(PERMISSION_ENTITIES, (_a = payload.permission.code) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_PERMISSION;
    }
}
class CreatePermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
        this.payload = payload;
        this.type = CREATE_PERMISSION_FAIL;
    }
}
class CreatePermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(PERMISSION_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_PERMISSION_SUCCESS;
    }
}
class UpdatePermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(PERMISSION_ENTITIES, (_a = payload.permission.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_PERMISSION;
    }
}
class UpdatePermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionCode, payload.error);
        this.payload = payload;
        this.type = UPDATE_PERMISSION_FAIL;
    }
}
class UpdatePermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(PERMISSION_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_PERMISSION_SUCCESS;
    }
}
class LoadPermissionTypes extends StateUtils.EntityLoadAction {
    constructor() {
        super(PERMISSION_TYPES_LIST, PERMISSION_TYPES);
        this.type = LOAD_PERMISSION_TYPES;
    }
}
class LoadPermissionTypesFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_TYPES_LIST, PERMISSION_TYPES, payload.error);
        this.payload = payload;
        this.type = LOAD_PERMISSION_TYPES_FAIL;
    }
}
class LoadPermissionTypesSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PERMISSION_TYPES_LIST, PERMISSION_TYPES);
        this.payload = payload;
        this.type = LOAD_PERMISSION_TYPES_SUCCESS;
    }
}

var permission_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_PERMISSION: LOAD_PERMISSION,
    LOAD_PERMISSION_FAIL: LOAD_PERMISSION_FAIL,
    LOAD_PERMISSION_SUCCESS: LOAD_PERMISSION_SUCCESS,
    LOAD_PERMISSIONS: LOAD_PERMISSIONS,
    LOAD_PERMISSIONS_FAIL: LOAD_PERMISSIONS_FAIL,
    LOAD_PERMISSIONS_SUCCESS: LOAD_PERMISSIONS_SUCCESS,
    CREATE_PERMISSION: CREATE_PERMISSION,
    CREATE_PERMISSION_FAIL: CREATE_PERMISSION_FAIL,
    CREATE_PERMISSION_SUCCESS: CREATE_PERMISSION_SUCCESS,
    UPDATE_PERMISSION: UPDATE_PERMISSION,
    UPDATE_PERMISSION_FAIL: UPDATE_PERMISSION_FAIL,
    UPDATE_PERMISSION_SUCCESS: UPDATE_PERMISSION_SUCCESS,
    LOAD_PERMISSION_TYPES: LOAD_PERMISSION_TYPES,
    LOAD_PERMISSION_TYPES_FAIL: LOAD_PERMISSION_TYPES_FAIL,
    LOAD_PERMISSION_TYPES_SUCCESS: LOAD_PERMISSION_TYPES_SUCCESS,
    LoadPermission: LoadPermission,
    LoadPermissionFail: LoadPermissionFail,
    LoadPermissionSuccess: LoadPermissionSuccess,
    LoadPermissions: LoadPermissions,
    LoadPermissionsFail: LoadPermissionsFail,
    LoadPermissionsSuccess: LoadPermissionsSuccess,
    CreatePermission: CreatePermission,
    CreatePermissionFail: CreatePermissionFail,
    CreatePermissionSuccess: CreatePermissionSuccess,
    UpdatePermission: UpdatePermission,
    UpdatePermissionFail: UpdatePermissionFail,
    UpdatePermissionSuccess: UpdatePermissionSuccess,
    LoadPermissionTypes: LoadPermissionTypes,
    LoadPermissionTypesFail: LoadPermissionTypesFail,
    LoadPermissionTypesSuccess: LoadPermissionTypesSuccess
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_COST_CENTER = '[CostCenter] Load CostCenter Data';
const LOAD_COST_CENTER_FAIL = '[CostCenter] Load CostCenter Data Fail';
const LOAD_COST_CENTER_SUCCESS = '[CostCenter] Load CostCenter Data Success';
const LOAD_COST_CENTERS = '[CostCenter] Load CostCenters';
const LOAD_COST_CENTERS_FAIL = '[CostCenter] Load CostCenters Fail';
const LOAD_COST_CENTERS_SUCCESS = '[CostCenter] Load CostCenters Success';
const CREATE_COST_CENTER = '[CostCenter] Create CostCenter';
const CREATE_COST_CENTER_FAIL = '[CostCenter] Create CostCenter Fail';
const CREATE_COST_CENTER_SUCCESS = '[CostCenter] Create CostCenter Success';
const UPDATE_COST_CENTER = '[CostCenter] Update CostCenter';
const UPDATE_COST_CENTER_FAIL = '[CostCenter] Update CostCenter Fail';
const UPDATE_COST_CENTER_SUCCESS = '[CostCenter] Update CostCenter Success';
const LOAD_ASSIGNED_BUDGETS = '[CostCenter] Load Budgets';
const LOAD_ASSIGNED_BUDGETS_SUCCESS = '[CostCenter] Load Budgets success';
const LOAD_ASSIGNED_BUDGETS_FAIL = '[CostCenter] Load Budgets fail';
const ASSIGN_BUDGET = '[CostCenter] Assign Budget';
const ASSIGN_BUDGET_SUCCESS = '[CostCenter] Assign Budget success';
const ASSIGN_BUDGET_FAIL = '[CostCenter] Assign Budget fail';
const UNASSIGN_BUDGET = '[CostCenter] Unassign Budget';
const UNASSIGN_BUDGET_SUCCESS = '[CostCenter] Unassign Budget success';
const UNASSIGN_BUDGET_FAIL = '[CostCenter] Unassign Budget fail';
class LoadCostCenter extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(COST_CENTER_ENTITIES, payload.costCenterCode);
        this.payload = payload;
        this.type = LOAD_COST_CENTER;
    }
}
class LoadCostCenterFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
        this.payload = payload;
        this.type = LOAD_COST_CENTER_FAIL;
    }
}
class LoadCostCenterSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(COST_CENTER_ENTITIES, Array.isArray(payload)
            ? payload.map((costCenter) => { var _a; return (_a = costCenter === null || costCenter === void 0 ? void 0 : costCenter.code) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_COST_CENTER_SUCCESS;
    }
}
class LoadCostCenters extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(COST_CENTER_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_COST_CENTERS;
    }
}
class LoadCostCentersFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(COST_CENTER_LIST, StateUtils.serializeSearchConfig(payload.params), payload.error);
        this.payload = payload;
        this.type = LOAD_COST_CENTERS_FAIL;
    }
}
class LoadCostCentersSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(COST_CENTER_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_COST_CENTERS_SUCCESS;
    }
}
class CreateCostCenter extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(COST_CENTER_ENTITIES, (_a = payload.costCenter.code) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_COST_CENTER;
    }
}
class CreateCostCenterFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
        this.payload = payload;
        this.type = CREATE_COST_CENTER_FAIL;
    }
}
class CreateCostCenterSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(COST_CENTER_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_COST_CENTER_SUCCESS;
    }
}
class UpdateCostCenter extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(COST_CENTER_ENTITIES, (_a = payload.costCenter.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_COST_CENTER;
    }
}
class UpdateCostCenterFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(COST_CENTER_ENTITIES, payload.costCenterCode, payload.error);
        this.payload = payload;
        this.type = UPDATE_COST_CENTER_FAIL;
    }
}
class UpdateCostCenterSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(COST_CENTER_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_COST_CENTER_SUCCESS;
    }
}
class LoadAssignedBudgets extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(COST_CENTER_ASSIGNED_BUDGETS, StateUtils.serializeSearchConfig(payload.params, payload.costCenterCode));
        this.payload = payload;
        this.type = LOAD_ASSIGNED_BUDGETS;
    }
}
class LoadAssignedBudgetsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(COST_CENTER_ASSIGNED_BUDGETS, StateUtils.serializeSearchConfig(payload.params, payload.costCenterCode), payload.error);
        this.payload = payload;
        this.type = LOAD_ASSIGNED_BUDGETS_FAIL;
    }
}
class LoadAssignedBudgetsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(COST_CENTER_ASSIGNED_BUDGETS, StateUtils.serializeSearchConfig(payload.params, payload.costCenterCode));
        this.payload = payload;
        this.type = LOAD_ASSIGNED_BUDGETS_SUCCESS;
    }
}
class AssignBudget extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode);
        this.payload = payload;
        this.type = ASSIGN_BUDGET;
    }
}
class AssignBudgetFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
        this.payload = payload;
        this.type = ASSIGN_BUDGET_FAIL;
    }
}
class AssignBudgetSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.code, payload);
        this.payload = payload;
        this.type = ASSIGN_BUDGET_SUCCESS;
    }
}
class UnassignBudget extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode);
        this.payload = payload;
        this.type = UNASSIGN_BUDGET;
    }
}
class UnassignBudgetFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.budgetCode, payload.error);
        this.payload = payload;
        this.type = UNASSIGN_BUDGET_FAIL;
    }
}
class UnassignBudgetSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(BUDGET_ENTITIES, payload.code, payload);
        this.payload = payload;
        this.type = UNASSIGN_BUDGET_SUCCESS;
    }
}

var costCenter_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_COST_CENTER: LOAD_COST_CENTER,
    LOAD_COST_CENTER_FAIL: LOAD_COST_CENTER_FAIL,
    LOAD_COST_CENTER_SUCCESS: LOAD_COST_CENTER_SUCCESS,
    LOAD_COST_CENTERS: LOAD_COST_CENTERS,
    LOAD_COST_CENTERS_FAIL: LOAD_COST_CENTERS_FAIL,
    LOAD_COST_CENTERS_SUCCESS: LOAD_COST_CENTERS_SUCCESS,
    CREATE_COST_CENTER: CREATE_COST_CENTER,
    CREATE_COST_CENTER_FAIL: CREATE_COST_CENTER_FAIL,
    CREATE_COST_CENTER_SUCCESS: CREATE_COST_CENTER_SUCCESS,
    UPDATE_COST_CENTER: UPDATE_COST_CENTER,
    UPDATE_COST_CENTER_FAIL: UPDATE_COST_CENTER_FAIL,
    UPDATE_COST_CENTER_SUCCESS: UPDATE_COST_CENTER_SUCCESS,
    LOAD_ASSIGNED_BUDGETS: LOAD_ASSIGNED_BUDGETS,
    LOAD_ASSIGNED_BUDGETS_SUCCESS: LOAD_ASSIGNED_BUDGETS_SUCCESS,
    LOAD_ASSIGNED_BUDGETS_FAIL: LOAD_ASSIGNED_BUDGETS_FAIL,
    ASSIGN_BUDGET: ASSIGN_BUDGET,
    ASSIGN_BUDGET_SUCCESS: ASSIGN_BUDGET_SUCCESS,
    ASSIGN_BUDGET_FAIL: ASSIGN_BUDGET_FAIL,
    UNASSIGN_BUDGET: UNASSIGN_BUDGET,
    UNASSIGN_BUDGET_SUCCESS: UNASSIGN_BUDGET_SUCCESS,
    UNASSIGN_BUDGET_FAIL: UNASSIGN_BUDGET_FAIL,
    LoadCostCenter: LoadCostCenter,
    LoadCostCenterFail: LoadCostCenterFail,
    LoadCostCenterSuccess: LoadCostCenterSuccess,
    LoadCostCenters: LoadCostCenters,
    LoadCostCentersFail: LoadCostCentersFail,
    LoadCostCentersSuccess: LoadCostCentersSuccess,
    CreateCostCenter: CreateCostCenter,
    CreateCostCenterFail: CreateCostCenterFail,
    CreateCostCenterSuccess: CreateCostCenterSuccess,
    UpdateCostCenter: UpdateCostCenter,
    UpdateCostCenterFail: UpdateCostCenterFail,
    UpdateCostCenterSuccess: UpdateCostCenterSuccess,
    LoadAssignedBudgets: LoadAssignedBudgets,
    LoadAssignedBudgetsFail: LoadAssignedBudgetsFail,
    LoadAssignedBudgetsSuccess: LoadAssignedBudgetsSuccess,
    AssignBudget: AssignBudget,
    AssignBudgetFail: AssignBudgetFail,
    AssignBudgetSuccess: AssignBudgetSuccess,
    UnassignBudget: UnassignBudget,
    UnassignBudgetFail: UnassignBudgetFail,
    UnassignBudgetSuccess: UnassignBudgetSuccess
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_B2B_USER = '[B2BUser] Load B2BUser Data';
const LOAD_B2B_USER_FAIL = '[B2BUser] Load B2BUser Data Fail';
const LOAD_B2B_USER_SUCCESS = '[B2BUser] Load B2BUser Data Success';
const CREATE_B2B_USER = '[B2BUser] Create B2BUser Data';
const CREATE_B2B_USER_FAIL = '[B2BUser] Create B2BUser Data Fail';
const CREATE_B2B_USER_SUCCESS = '[B2BUser] Create B2BUser Data Success';
const UPDATE_B2B_USER = '[B2BUser] Update B2BUser Data';
const UPDATE_B2B_USER_FAIL = '[B2BUser] Update B2BUser Data Fail';
const UPDATE_B2B_USER_SUCCESS = '[B2BUser] Update B2BUser Data Success';
const LOAD_B2B_USERS = '[B2BUser] Load B2BUsers';
const LOAD_B2B_USERS_FAIL = '[B2BUser] Load B2BUsers Fail';
const LOAD_B2B_USERS_SUCCESS = '[B2BUser] Load B2BUsers Success';
const LOAD_B2B_USER_APPROVERS = '[B2BUser] Load B2BUser Approvers';
const LOAD_B2B_USER_APPROVERS_FAIL = '[B2BUser] Load B2BUser Approvers Fail';
const LOAD_B2B_USER_APPROVERS_SUCCESS = '[B2BUser] Load B2BUser Approvers Success';
const ASSIGN_B2B_USER_APPROVER = '[B2BUser] Assign B2BUser Approver';
const ASSIGN_B2B_USER_APPROVER_FAIL = '[B2BUser] Assign B2BUser Approver Fail';
const ASSIGN_B2B_USER_APPROVER_SUCCESS = '[B2BUser] Assign B2BUser Approver Success';
const UNASSIGN_B2B_USER_APPROVER = '[B2BUser] Unassign B2BUser Approver';
const UNASSIGN_B2B_USER_APPROVER_FAIL = '[B2BUser] Unassign B2BUser Approver Fail';
const UNASSIGN_B2B_USER_APPROVER_SUCCESS = '[B2BUser] Unassign B2BUser Approver Success';
const LOAD_B2B_USER_PERMISSIONS = '[B2BUser] Load B2BUser Permissions';
const LOAD_B2B_USER_PERMISSIONS_FAIL = '[B2BUser] Load B2BUser Permissions Fail';
const LOAD_B2B_USER_PERMISSIONS_SUCCESS = '[B2BUser] Load B2BUser Permissions Success';
const ASSIGN_B2B_USER_PERMISSION = '[B2BUser] Assign B2BUser Permission';
const ASSIGN_B2B_USER_PERMISSION_FAIL = '[B2BUser] Assign B2BUser Permission Fail';
const ASSIGN_B2B_USER_PERMISSION_SUCCESS = '[B2BUser] Assign B2BUser Permission Success';
const UNASSIGN_B2B_USER_PERMISSION = '[B2BUser] Unassign B2BUser Permission';
const UNASSIGN_B2B_USER_PERMISSION_FAIL = '[B2BUser] Unassign B2BUser Permission Fail';
const UNASSIGN_B2B_USER_PERMISSION_SUCCESS = '[B2BUser] Unassign B2BUser Permission Success';
const LOAD_B2B_USER_USER_GROUPS = '[B2BUser] Load B2BUser User Groups';
const LOAD_B2B_USER_USER_GROUPS_FAIL = '[B2BUser] Load B2BUser User Groups Fail';
const LOAD_B2B_USER_USER_GROUPS_SUCCESS = '[B2BUser] Load B2BUser User Groups Success';
const ASSIGN_B2B_USER_USER_GROUP = '[B2BUser] Assign B2BUser User Group';
const ASSIGN_B2B_USER_USER_GROUP_FAIL = '[B2BUser] Assign B2BUser User Group Fail';
const ASSIGN_B2B_USER_USER_GROUP_SUCCESS = '[B2BUser] Assign B2BUser User Group Success';
const UNASSIGN_B2B_USER_USER_GROUP = '[B2BUser] Unassign B2BUser User Group';
const UNASSIGN_B2B_USER_USER_GROUP_FAIL = '[B2BUser] Unassign B2BUser User Group Fail';
const UNASSIGN_B2B_USER_USER_GROUP_SUCCESS = '[B2BUser] Unassign B2BUser User Group Success';
class LoadB2BUser extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId);
        this.payload = payload;
        this.type = LOAD_B2B_USER;
    }
}
class LoadB2BUserFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = LOAD_B2B_USER_FAIL;
    }
}
class LoadB2BUserSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(B2B_USER_ENTITIES, Array.isArray(payload)
            ? payload.map((orgUnitCustomer) => { var _a; return (_a = orgUnitCustomer === null || orgUnitCustomer === void 0 ? void 0 : orgUnitCustomer.customerId) !== null && _a !== void 0 ? _a : ''; })
            : (_a = payload === null || payload === void 0 ? void 0 : payload.customerId) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_B2B_USER_SUCCESS;
    }
}
class CreateB2BUser extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(B2B_USER_ENTITIES, (_a = payload.orgCustomer.customerId) !== null && _a !== void 0 ? _a : null);
        this.payload = payload;
        this.type = CREATE_B2B_USER;
    }
}
class CreateB2BUserFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = CREATE_B2B_USER_FAIL;
    }
}
class CreateB2BUserSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(B2B_USER_ENTITIES, (_a = payload.customerId) !== null && _a !== void 0 ? _a : null, payload);
        this.payload = payload;
        this.type = CREATE_B2B_USER_SUCCESS;
    }
}
class UpdateB2BUser extends StateUtils.EntityLoadAction {
    constructor(payload) {
        var _a;
        super(B2B_USER_ENTITIES, (_a = payload.orgCustomer.customerId) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = UPDATE_B2B_USER;
    }
}
class UpdateB2BUserFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = UPDATE_B2B_USER_FAIL;
    }
}
class UpdateB2BUserSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(B2B_USER_ENTITIES, (_a = payload.customerId) !== null && _a !== void 0 ? _a : '', payload);
        this.payload = payload;
        this.type = UPDATE_B2B_USER_SUCCESS;
    }
}
class LoadB2BUsers extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_B2B_USERS;
    }
}
class LoadB2BUsersFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_LIST, StateUtils.serializeSearchConfig(payload.params), payload.error);
        this.payload = payload;
        this.type = LOAD_B2B_USERS_FAIL;
    }
}
class LoadB2BUsersSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(USER_LIST, StateUtils.serializeSearchConfig(payload.params));
        this.payload = payload;
        this.type = LOAD_B2B_USERS_SUCCESS;
    }
}
class LoadB2BUserApprovers extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_APPROVERS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId));
        this.payload = payload;
        this.type = LOAD_B2B_USER_APPROVERS;
    }
}
class LoadB2BUserApproversFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_APPROVERS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId), payload.error);
        this.payload = payload;
        this.type = LOAD_B2B_USER_APPROVERS_FAIL;
    }
}
class LoadB2BUserApproversSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_APPROVERS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId));
        this.payload = payload;
        this.type = LOAD_B2B_USER_APPROVERS_SUCCESS;
    }
}
class AssignB2BUserApprover extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.approverId);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_APPROVER;
    }
}
class AssignB2BUserApproverFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.approverId);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_APPROVER_FAIL;
    }
}
class AssignB2BUserApproverSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.approverId, payload);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_APPROVER_SUCCESS;
    }
}
class UnassignB2BUserApprover extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.approverId);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_APPROVER;
    }
}
class UnassignB2BUserApproverFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.approverId);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_APPROVER_FAIL;
    }
}
class UnassignB2BUserApproverSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_ENTITIES, payload.approverId, payload);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_APPROVER_SUCCESS;
    }
}
class LoadB2BUserPermissions extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_PERMISSIONS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId));
        this.payload = payload;
        this.type = LOAD_B2B_USER_PERMISSIONS;
    }
}
class LoadB2BUserPermissionsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_PERMISSIONS, payload.orgCustomerId, payload.error);
        this.payload = payload;
        this.type = LOAD_B2B_USER_PERMISSIONS_FAIL;
    }
}
class LoadB2BUserPermissionsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_PERMISSIONS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId));
        this.payload = payload;
        this.type = LOAD_B2B_USER_PERMISSIONS_SUCCESS;
    }
}
class AssignB2BUserPermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionId);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_PERMISSION;
    }
}
class AssignB2BUserPermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionId, payload.error);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_PERMISSION_FAIL;
    }
}
class AssignB2BUserPermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionId, payload);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_PERMISSION_SUCCESS;
    }
}
class UnassignB2BUserPermission extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionId);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_PERMISSION;
    }
}
class UnassignB2BUserPermissionFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionId, payload.error);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_PERMISSION_FAIL;
    }
}
class UnassignB2BUserPermissionSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PERMISSION_ENTITIES, payload.permissionId, payload);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_PERMISSION_SUCCESS;
    }
}
class LoadB2BUserUserGroups extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(B2B_USER_USER_GROUPS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId));
        this.payload = payload;
        this.type = LOAD_B2B_USER_USER_GROUPS;
    }
}
class LoadB2BUserUserGroupsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(B2B_USER_USER_GROUPS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId), payload.error);
        this.payload = payload;
        this.type = LOAD_B2B_USER_USER_GROUPS_FAIL;
    }
}
class LoadB2BUserUserGroupsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(B2B_USER_USER_GROUPS, StateUtils.serializeSearchConfig(payload.params, payload.orgCustomerId));
        this.payload = payload;
        this.type = LOAD_B2B_USER_USER_GROUPS_SUCCESS;
    }
}
class AssignB2BUserUserGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_USER_GROUP;
    }
}
class AssignB2BUserUserGroupFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_USER_GROUP_FAIL;
    }
}
class AssignB2BUserUserGroupSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.uid, payload);
        this.payload = payload;
        this.type = ASSIGN_B2B_USER_USER_GROUP_SUCCESS;
    }
}
class UnassignB2BUserUserGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_USER_GROUP;
    }
}
class UnassignB2BUserUserGroupFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_USER_GROUP_FAIL;
    }
}
class UnassignB2BUserUserGroupSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(USER_GROUP_ENTITIES, payload.uid, payload);
        this.payload = payload;
        this.type = UNASSIGN_B2B_USER_USER_GROUP_SUCCESS;
    }
}

var b2bUser_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LOAD_B2B_USER: LOAD_B2B_USER,
    LOAD_B2B_USER_FAIL: LOAD_B2B_USER_FAIL,
    LOAD_B2B_USER_SUCCESS: LOAD_B2B_USER_SUCCESS,
    CREATE_B2B_USER: CREATE_B2B_USER,
    CREATE_B2B_USER_FAIL: CREATE_B2B_USER_FAIL,
    CREATE_B2B_USER_SUCCESS: CREATE_B2B_USER_SUCCESS,
    UPDATE_B2B_USER: UPDATE_B2B_USER,
    UPDATE_B2B_USER_FAIL: UPDATE_B2B_USER_FAIL,
    UPDATE_B2B_USER_SUCCESS: UPDATE_B2B_USER_SUCCESS,
    LOAD_B2B_USERS: LOAD_B2B_USERS,
    LOAD_B2B_USERS_FAIL: LOAD_B2B_USERS_FAIL,
    LOAD_B2B_USERS_SUCCESS: LOAD_B2B_USERS_SUCCESS,
    LOAD_B2B_USER_APPROVERS: LOAD_B2B_USER_APPROVERS,
    LOAD_B2B_USER_APPROVERS_FAIL: LOAD_B2B_USER_APPROVERS_FAIL,
    LOAD_B2B_USER_APPROVERS_SUCCESS: LOAD_B2B_USER_APPROVERS_SUCCESS,
    ASSIGN_B2B_USER_APPROVER: ASSIGN_B2B_USER_APPROVER,
    ASSIGN_B2B_USER_APPROVER_FAIL: ASSIGN_B2B_USER_APPROVER_FAIL,
    ASSIGN_B2B_USER_APPROVER_SUCCESS: ASSIGN_B2B_USER_APPROVER_SUCCESS,
    UNASSIGN_B2B_USER_APPROVER: UNASSIGN_B2B_USER_APPROVER,
    UNASSIGN_B2B_USER_APPROVER_FAIL: UNASSIGN_B2B_USER_APPROVER_FAIL,
    UNASSIGN_B2B_USER_APPROVER_SUCCESS: UNASSIGN_B2B_USER_APPROVER_SUCCESS,
    LOAD_B2B_USER_PERMISSIONS: LOAD_B2B_USER_PERMISSIONS,
    LOAD_B2B_USER_PERMISSIONS_FAIL: LOAD_B2B_USER_PERMISSIONS_FAIL,
    LOAD_B2B_USER_PERMISSIONS_SUCCESS: LOAD_B2B_USER_PERMISSIONS_SUCCESS,
    ASSIGN_B2B_USER_PERMISSION: ASSIGN_B2B_USER_PERMISSION,
    ASSIGN_B2B_USER_PERMISSION_FAIL: ASSIGN_B2B_USER_PERMISSION_FAIL,
    ASSIGN_B2B_USER_PERMISSION_SUCCESS: ASSIGN_B2B_USER_PERMISSION_SUCCESS,
    UNASSIGN_B2B_USER_PERMISSION: UNASSIGN_B2B_USER_PERMISSION,
    UNASSIGN_B2B_USER_PERMISSION_FAIL: UNASSIGN_B2B_USER_PERMISSION_FAIL,
    UNASSIGN_B2B_USER_PERMISSION_SUCCESS: UNASSIGN_B2B_USER_PERMISSION_SUCCESS,
    LOAD_B2B_USER_USER_GROUPS: LOAD_B2B_USER_USER_GROUPS,
    LOAD_B2B_USER_USER_GROUPS_FAIL: LOAD_B2B_USER_USER_GROUPS_FAIL,
    LOAD_B2B_USER_USER_GROUPS_SUCCESS: LOAD_B2B_USER_USER_GROUPS_SUCCESS,
    ASSIGN_B2B_USER_USER_GROUP: ASSIGN_B2B_USER_USER_GROUP,
    ASSIGN_B2B_USER_USER_GROUP_FAIL: ASSIGN_B2B_USER_USER_GROUP_FAIL,
    ASSIGN_B2B_USER_USER_GROUP_SUCCESS: ASSIGN_B2B_USER_USER_GROUP_SUCCESS,
    UNASSIGN_B2B_USER_USER_GROUP: UNASSIGN_B2B_USER_USER_GROUP,
    UNASSIGN_B2B_USER_USER_GROUP_FAIL: UNASSIGN_B2B_USER_USER_GROUP_FAIL,
    UNASSIGN_B2B_USER_USER_GROUP_SUCCESS: UNASSIGN_B2B_USER_USER_GROUP_SUCCESS,
    LoadB2BUser: LoadB2BUser,
    LoadB2BUserFail: LoadB2BUserFail,
    LoadB2BUserSuccess: LoadB2BUserSuccess,
    CreateB2BUser: CreateB2BUser,
    CreateB2BUserFail: CreateB2BUserFail,
    CreateB2BUserSuccess: CreateB2BUserSuccess,
    UpdateB2BUser: UpdateB2BUser,
    UpdateB2BUserFail: UpdateB2BUserFail,
    UpdateB2BUserSuccess: UpdateB2BUserSuccess,
    LoadB2BUsers: LoadB2BUsers,
    LoadB2BUsersFail: LoadB2BUsersFail,
    LoadB2BUsersSuccess: LoadB2BUsersSuccess,
    LoadB2BUserApprovers: LoadB2BUserApprovers,
    LoadB2BUserApproversFail: LoadB2BUserApproversFail,
    LoadB2BUserApproversSuccess: LoadB2BUserApproversSuccess,
    AssignB2BUserApprover: AssignB2BUserApprover,
    AssignB2BUserApproverFail: AssignB2BUserApproverFail,
    AssignB2BUserApproverSuccess: AssignB2BUserApproverSuccess,
    UnassignB2BUserApprover: UnassignB2BUserApprover,
    UnassignB2BUserApproverFail: UnassignB2BUserApproverFail,
    UnassignB2BUserApproverSuccess: UnassignB2BUserApproverSuccess,
    LoadB2BUserPermissions: LoadB2BUserPermissions,
    LoadB2BUserPermissionsFail: LoadB2BUserPermissionsFail,
    LoadB2BUserPermissionsSuccess: LoadB2BUserPermissionsSuccess,
    AssignB2BUserPermission: AssignB2BUserPermission,
    AssignB2BUserPermissionFail: AssignB2BUserPermissionFail,
    AssignB2BUserPermissionSuccess: AssignB2BUserPermissionSuccess,
    UnassignB2BUserPermission: UnassignB2BUserPermission,
    UnassignB2BUserPermissionFail: UnassignB2BUserPermissionFail,
    UnassignB2BUserPermissionSuccess: UnassignB2BUserPermissionSuccess,
    LoadB2BUserUserGroups: LoadB2BUserUserGroups,
    LoadB2BUserUserGroupsFail: LoadB2BUserUserGroupsFail,
    LoadB2BUserUserGroupsSuccess: LoadB2BUserUserGroupsSuccess,
    AssignB2BUserUserGroup: AssignB2BUserUserGroup,
    AssignB2BUserUserGroupFail: AssignB2BUserUserGroupFail,
    AssignB2BUserUserGroupSuccess: AssignB2BUserUserGroupSuccess,
    UnassignB2BUserUserGroup: UnassignB2BUserUserGroup,
    UnassignB2BUserUserGroupFail: UnassignB2BUserUserGroupFail,
    UnassignB2BUserUserGroupSuccess: UnassignB2BUserUserGroupSuccess
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CLEAR_ORGANIZATION_DATA = '[Organization] Clear Data';
class OrganizationClearData {
    constructor() {
        this.type = CLEAR_ORGANIZATION_DATA;
    }
}

var organization_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CLEAR_ORGANIZATION_DATA: CLEAR_ORGANIZATION_DATA,
    OrganizationClearData: OrganizationClearData
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class BudgetEffects {
    constructor(actions$, budgetConnector) {
        this.actions$ = actions$;
        this.budgetConnector = budgetConnector;
        this.loadBudget$ = createEffect(() => this.actions$.pipe(ofType(LOAD_BUDGET), map((action) => action.payload), switchMap(({ userId, budgetCode }) => {
            return this.budgetConnector.get(userId, budgetCode).pipe(map((budget) => {
                return new LoadBudgetSuccess([budget]);
            }), catchError((error) => of(new LoadBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadBudgets$ = createEffect(() => this.actions$.pipe(ofType(LOAD_BUDGETS), map((action) => action.payload), switchMap((payload) => this.budgetConnector.getList(payload.userId, payload.params).pipe(switchMap((budgets) => {
            const { values, page } = StateUtils.normalizeListPage(budgets, 'code');
            return [
                new LoadBudgetSuccess(values),
                new LoadBudgetsSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadBudgetsFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.createBudget$ = createEffect(() => this.actions$.pipe(ofType(CREATE_BUDGET), map((action) => action.payload), switchMap((payload) => this.budgetConnector.create(payload.userId, payload.budget).pipe(switchMap((data) => [
            new CreateBudgetSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new CreateBudgetFail({
                    budgetCode: (_a = payload.budget.code) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updateBudget$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_BUDGET), map((action) => action.payload), switchMap((payload) => this.budgetConnector
            .update(payload.userId, payload.budgetCode, payload.budget)
            .pipe(switchMap((data) => [
            new UpdateBudgetSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new UpdateBudgetFail({
                    budgetCode: (_a = payload.budget.code) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
    }
}
BudgetEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetEffects, deps: [{ token: i1.Actions }, { token: BudgetConnector }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: BudgetConnector }]; } });

class OrgUnitEffects {
    // @Effect()
    // loadAddress$: Observable<
    //   | OrgUnitActions.LoadAddressSuccess
    //   | OrgUnitActions.LoadAddressesSuccess
    //   | OrgUnitActions.LoadAddressesFail
    // > = this.actions$.pipe(
    //   ofType(OrgUnitActions.LOAD_ADDRESSES),
    //   map((action: OrgUnitActions.LoadAddresses) => action.payload),
    //   switchMap(({ userId, orgUnitId }) => {
    //     return this.orgUnitConnector.getAddresses(userId, orgUnitId).pipe(
    //       switchMap((addresses: EntitiesModel<B2BAddress>) => {
    //         const { values, page } = StateUtils.normalizeListPage(addresses, 'id');
    //         return [
    //           new OrgUnitActions.LoadAddressSuccess(values),
    //           new OrgUnitActions.LoadAddressesSuccess({ page, orgUnitId }),
    //         ];
    //       }),
    //       catchError(error =>
    //         of(
    //           new OrgUnitActions.LoadAddressesFail({
    //             orgUnitId,
    //             error: normalizeHttpError(error),
    //           })
    //         )
    //       )
    //     );
    //   })
    // );
    constructor(actions$, orgUnitConnector) {
        this.actions$ = actions$;
        this.orgUnitConnector = orgUnitConnector;
        this.loadOrgUnit$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORG_UNIT), map((action) => action.payload), switchMap(({ userId, orgUnitId }) => {
            return this.orgUnitConnector.get(userId, orgUnitId).pipe(switchMap((orgUnit) => {
                var _a;
                const { values, page } = StateUtils.normalizeListPage({ values: (_a = orgUnit.addresses) !== null && _a !== void 0 ? _a : [] }, 'id');
                return [
                    new LoadOrgUnitSuccess([orgUnit]),
                    new LoadAddressSuccess(values),
                    new LoadAddressesSuccess({ page, orgUnitId }),
                ];
            }), catchError((error) => of(new LoadOrgUnitFail({
                orgUnitId,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadAvailableOrgUnits$ = createEffect(() => this.actions$.pipe(ofType(LOAD_UNIT_NODES), map((action) => action.payload), switchMap((payload) => this.orgUnitConnector.getList(payload.userId).pipe(map((orgUnitsList) => new LoadOrgUnitNodesSuccess(orgUnitsList)), catchError((error) => of(new LoadOrgUnitNodesFail({
            error: normalizeHttpError(error),
        })))))));
        this.createUnit$ = createEffect(() => this.actions$.pipe(ofType(CREATE_ORG_UNIT), map((action) => action.payload), switchMap((payload) => this.orgUnitConnector.create(payload.userId, payload.unit).pipe(switchMap((data) => [
            new CreateUnitSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new CreateUnitFail({
                    unitCode: (_a = payload.unit.uid) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updateUnit$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_ORG_UNIT), map((action) => action.payload), switchMap((payload) => this.orgUnitConnector
            .update(payload.userId, payload.unitCode, payload.unit)
            .pipe(switchMap((_data) => [
            // Workaround for empty response
            new UpdateUnitSuccess(payload.unit),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new UpdateUnitFail({
                    unitCode: (_a = payload.unit.uid) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.loadTree$ = createEffect(() => this.actions$.pipe(ofType(LOAD_UNIT_TREE), map((action) => action.payload), switchMap(({ userId }) => {
            return this.orgUnitConnector.getTree(userId).pipe(map((orgUnit) => new LoadTreeSuccess(orgUnit)), catchError((error) => of(new LoadTreeFail({
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadApprovalProcesses$ = createEffect(() => this.actions$.pipe(ofType(LOAD_APPROVAL_PROCESSES), map((action) => action.payload), switchMap(({ userId }) => {
            return this.orgUnitConnector.getApprovalProcesses(userId).pipe(map((approvalProcesses) => new LoadApprovalProcessesSuccess(approvalProcesses)), catchError((error) => of(new LoadApprovalProcessesFail({
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadUsers$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ASSIGNED_USERS), map((action) => action.payload), groupBy(({ orgUnitId, roleId, params }) => StateUtils.serializeParams([orgUnitId, roleId], params)), mergeMap((group) => group.pipe(switchMap(({ userId, orgUnitId, roleId, params }) => {
            return this.orgUnitConnector
                .getUsers(userId, orgUnitId, roleId, params)
                .pipe(switchMap((users) => {
                const { values, page } = StateUtils.normalizeListPage(users, 'customerId');
                return [
                    new LoadB2BUserSuccess(values),
                    new LoadAssignedUsersSuccess({
                        orgUnitId,
                        roleId,
                        page,
                        params,
                    }),
                ];
            }), catchError((error) => of(new LoadAssignedUsersFail({
                orgUnitId,
                roleId,
                params,
                error: normalizeHttpError(error),
            }))));
        })))));
        this.assignRoleToUser = createEffect(() => this.actions$.pipe(ofType(ASSIGN_ROLE), map((action) => action.payload), switchMap(({ userId, orgCustomerId, roleId }) => this.orgUnitConnector.assignRole(userId, orgCustomerId, roleId).pipe(map(() => new AssignRoleSuccess({
            uid: orgCustomerId,
            roleId,
            selected: true,
        })), catchError((error) => of(new AssignRoleFail({
            orgCustomerId,
            error: normalizeHttpError(error),
        })))))));
        this.unassignRoleToUser$ = createEffect(() => this.actions$.pipe(ofType(UNASSIGN_ROLE), map((action) => action.payload), switchMap(({ userId, orgCustomerId, roleId }) => this.orgUnitConnector.unassignRole(userId, orgCustomerId, roleId).pipe(map(() => new UnassignRoleSuccess({
            uid: orgCustomerId,
            roleId,
            selected: false,
        })), catchError((error) => of(new UnassignRoleFail({
            orgCustomerId,
            error: normalizeHttpError(error),
        })))))));
        this.assignApprover = createEffect(() => this.actions$.pipe(ofType(ASSIGN_APPROVER), map((action) => action.payload), mergeMap(({ userId, orgUnitId, orgCustomerId, roleId }) => this.orgUnitConnector
            .assignApprover(userId, orgUnitId, orgCustomerId, roleId)
            .pipe(switchMap(() => [
            new AssignApproverSuccess({
                uid: orgCustomerId,
                roleId,
                selected: true,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignApproverFail({
                orgCustomerId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignApprover = createEffect(() => this.actions$.pipe(ofType(UNASSIGN_APPROVER), map((action) => action.payload), mergeMap(({ userId, orgUnitId, orgCustomerId, roleId }) => this.orgUnitConnector
            .unassignApprover(userId, orgUnitId, orgCustomerId, roleId)
            .pipe(switchMap(() => [
            new UnassignApproverSuccess({
                uid: orgCustomerId,
                roleId,
                selected: false,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignApproverFail({
                orgCustomerId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.createAddress$ = createEffect(() => this.actions$.pipe(ofType(CREATE_ADDRESS), map((action) => action.payload), switchMap((payload) => this.orgUnitConnector
            .createAddress(payload.userId, payload.orgUnitId, payload.address)
            .pipe(switchMap((data) => [
            new CreateAddressSuccess(data),
            new CreateAddressSuccess({ id: undefined }),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new CreateAddressFail({
                    addressId: (_a = payload.address.id) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updateAddress$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_ADDRESS), map((action) => action.payload), switchMap(({ userId, orgUnitId, addressId, address }) => this.orgUnitConnector
            .updateAddress(userId, orgUnitId, addressId, address)
            .pipe(switchMap(() => [
            // commented out due to no response from backend on PATCH request
            // new OrgUnitActions.UpdateAddressSuccess(data),
            new UpdateAddressSuccess(address),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new UpdateAddressFail({
                    addressId: (_a = address.id) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.deleteAddress$ = createEffect(() => this.actions$.pipe(ofType(DELETE_ADDRESS), map((action) => action.payload), switchMap((payload) => this.orgUnitConnector
            .deleteAddress(payload.userId, payload.orgUnitId, payload.addressId)
            .pipe(switchMap(() => [
            new DeleteAddressSuccess({
                id: payload.addressId,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new DeleteAddressFail({
                addressId: payload.addressId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
    }
}
OrgUnitEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitEffects, deps: [{ token: i1.Actions }, { token: OrgUnitConnector }], target: i0.ɵɵFactoryTarget.Injectable });
OrgUnitEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: OrgUnitConnector }]; } });

class PermissionEffects {
    constructor(actions$, permissionConnector) {
        this.actions$ = actions$;
        this.permissionConnector = permissionConnector;
        this.loadPermission$ = createEffect(() => this.actions$.pipe(ofType(LOAD_PERMISSION), map((action) => action.payload), switchMap(({ userId, permissionCode }) => {
            return this.permissionConnector.get(userId, permissionCode).pipe(map((permission) => {
                return new LoadPermissionSuccess([permission]);
            }), catchError((error) => of(new LoadPermissionFail({
                permissionCode,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadPermissions$ = createEffect(() => this.actions$.pipe(ofType(LOAD_PERMISSIONS), map((action) => action.payload), switchMap((payload) => this.permissionConnector.getList(payload.userId, payload.params).pipe(switchMap((permissions) => {
            const { values, page } = StateUtils.normalizeListPage(permissions, 'code');
            return [
                new LoadPermissionSuccess(values),
                new LoadPermissionsSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadPermissionsFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.createPermission$ = createEffect(() => this.actions$.pipe(ofType(CREATE_PERMISSION), map((action) => action.payload), switchMap((payload) => this.permissionConnector
            .create(payload.userId, payload.permission)
            .pipe(switchMap((data) => [
            new CreatePermissionSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new CreatePermissionFail({
                    permissionCode: (_a = payload.permission.code) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updatePermission$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_PERMISSION), map((action) => action.payload), switchMap((payload) => this.permissionConnector
            .update(payload.userId, payload.permissionCode, payload.permission)
            .pipe(switchMap((data) => [
            new UpdatePermissionSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new UpdatePermissionFail({
                    permissionCode: (_a = payload.permission.code) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.loadPermissionTypes$ = createEffect(() => this.actions$.pipe(ofType(LOAD_PERMISSION_TYPES), switchMap(() => this.permissionConnector.getTypes().pipe(map((permissionTypeList) => new LoadPermissionTypesSuccess(permissionTypeList)), catchError((error) => of(new LoadPermissionTypesFail({
            error: normalizeHttpError(error),
        })))))));
    }
}
PermissionEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionEffects, deps: [{ token: i1.Actions }, { token: PermissionConnector }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: PermissionConnector }]; } });

class CostCenterEffects {
    constructor(actions$, costCenterConnector) {
        this.actions$ = actions$;
        this.costCenterConnector = costCenterConnector;
        this.loadCostCenter$ = createEffect(() => this.actions$.pipe(ofType(LOAD_COST_CENTER), map((action) => action.payload), switchMap(({ userId, costCenterCode }) => {
            return this.costCenterConnector.get(userId, costCenterCode).pipe(map((costCenter) => {
                return new LoadCostCenterSuccess([costCenter]);
            }), catchError((error) => of(new LoadCostCenterFail({
                costCenterCode,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadCostCenters$ = createEffect(() => this.actions$.pipe(ofType(LOAD_COST_CENTERS), map((action) => action.payload), switchMap((payload) => this.costCenterConnector.getList(payload.userId, payload.params).pipe(switchMap((costCenters) => {
            const { values, page } = StateUtils.normalizeListPage(costCenters, 'code');
            return [
                new LoadCostCenterSuccess(values),
                new LoadCostCentersSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadCostCentersFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.createCostCenter$ = createEffect(() => this.actions$.pipe(ofType(CREATE_COST_CENTER), map((action) => action.payload), switchMap((payload) => this.costCenterConnector
            .create(payload.userId, payload.costCenter)
            .pipe(switchMap((data) => [
            new CreateCostCenterSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new CreateCostCenterFail({
                    costCenterCode: (_a = payload.costCenter.code) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updateCostCenter$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_COST_CENTER), map((action) => action.payload), switchMap((payload) => this.costCenterConnector
            .update(payload.userId, payload.costCenterCode, payload.costCenter)
            .pipe(switchMap((data) => [
            new UpdateCostCenterSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new UpdateCostCenterFail({
                    costCenterCode: (_a = payload.costCenter.code) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.loadAssignedBudgets$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ASSIGNED_BUDGETS), map((action) => action.payload), groupBy(({ costCenterCode, params }) => StateUtils.serializeParams(costCenterCode, params)), mergeMap((group) => group.pipe(switchMap(({ userId, costCenterCode, params }) => this.costCenterConnector
            .getBudgets(userId, costCenterCode, params)
            .pipe(switchMap((budgets) => {
            const { values, page } = StateUtils.normalizeListPage(budgets, 'code');
            return [
                new LoadBudgetSuccess(values),
                new LoadAssignedBudgetsSuccess({
                    costCenterCode,
                    page,
                    params,
                }),
            ];
        }), catchError((error) => of(new LoadAssignedBudgetsFail({
            costCenterCode,
            params,
            error: normalizeHttpError(error),
        })))))))));
        this.assignBudgetToCostCenter$ = createEffect(() => this.actions$.pipe(ofType(ASSIGN_BUDGET), map((action) => action.payload), mergeMap(({ userId, costCenterCode, budgetCode }) => this.costCenterConnector
            .assignBudget(userId, costCenterCode, budgetCode)
            .pipe(switchMap(() => [
            new AssignBudgetSuccess({
                code: budgetCode,
                selected: true,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignBudgetToCostCenter$ = createEffect(() => this.actions$.pipe(ofType(UNASSIGN_BUDGET), map((action) => action.payload), mergeMap(({ userId, costCenterCode, budgetCode }) => this.costCenterConnector
            .unassignBudget(userId, costCenterCode, budgetCode)
            .pipe(switchMap(() => [
            new UnassignBudgetSuccess({
                code: budgetCode,
                selected: false,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignBudgetFail({
                budgetCode,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
    }
}
CostCenterEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterEffects, deps: [{ token: i1.Actions }, { token: CostCenterConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: CostCenterConnector }]; } });

class B2BUserEffects {
    constructor(actions$, b2bUserConnector, routingService, userAccountFacade, userIdService) {
        this.actions$ = actions$;
        this.b2bUserConnector = b2bUserConnector;
        this.routingService = routingService;
        this.userAccountFacade = userAccountFacade;
        this.userIdService = userIdService;
        this.loadB2BUser$ = createEffect(() => this.actions$.pipe(ofType(LOAD_B2B_USER), map((action) => action.payload), switchMap(({ userId, orgCustomerId }) => {
            return this.b2bUserConnector.get(userId, orgCustomerId).pipe(map((b2bUser) => {
                return new LoadB2BUserSuccess([b2bUser]);
            }), catchError((error) => of(new LoadB2BUserFail({
                orgCustomerId,
                error: normalizeHttpError(error),
            }))));
        })));
        this.createB2BUser$ = createEffect(() => this.actions$.pipe(ofType(CREATE_B2B_USER), map((action) => action.payload), switchMap(({ userId, orgCustomer }) => this.b2bUserConnector.create(userId, orgCustomer).pipe(switchMap((data) => {
            const isAssignedToApprovers = orgCustomer.isAssignedToApprovers;
            // TODO Workaround for not known customerId while user creation (redireciton)
            return this.routingService.getRouterState().pipe(take(1), tap((route) => this.redirectToDetails(route, data)), switchMap(() => {
                var _a, _b, _c;
                const successActions = [
                    new CreateB2BUserSuccess(data),
                    new CreateB2BUserSuccess({
                        customerId: undefined,
                    }),
                    new OrganizationClearData(),
                ];
                if (isAssignedToApprovers) {
                    successActions.splice(1, 0, new AssignApprover({
                        userId,
                        orgUnitId: (_b = (_a = orgCustomer.orgUnit) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : '',
                        orgCustomerId: (_c = data.customerId) !== null && _c !== void 0 ? _c : '',
                        roleId: B2BUserRole.APPROVER,
                    }));
                }
                return successActions;
            }));
        }), catchError((error) => {
            var _a;
            return from([
                new CreateB2BUserFail({
                    orgCustomerId: (_a = orgCustomer.customerId) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updateB2BUser$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_B2B_USER), map((action) => action.payload), switchMap(({ userId, orgCustomerId, orgCustomer }) => {
            const isAssignedToApprovers = orgCustomer.isAssignedToApprovers;
            return this.b2bUserConnector
                .update(userId, orgCustomerId, orgCustomer)
                .pipe(switchMap((_data) => {
                var _a, _b;
                const successActions = [
                    // TODO: change for 'payload: data' when backend API start to return user data on PATCH
                    new UpdateB2BUserSuccess(orgCustomer),
                ];
                if (isAssignedToApprovers) {
                    successActions.push(new AssignApprover({
                        userId,
                        orgUnitId: (_b = (_a = orgCustomer.orgUnit) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : '',
                        orgCustomerId,
                        roleId: B2BUserRole.APPROVER,
                    }));
                }
                return successActions;
            }), catchError((error) => {
                var _a;
                return from([
                    new UpdateB2BUserFail({
                        orgCustomerId: (_a = orgCustomer.customerId) !== null && _a !== void 0 ? _a : '',
                        error: normalizeHttpError(error),
                    }),
                    new OrganizationClearData(),
                ]);
            }));
        })));
        this.checkSelfEmailUpdate$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_B2B_USER_SUCCESS), map((action) => action.payload), withLatestFrom(this.userAccountFacade.get(), this.userIdService.getUserId()), switchMap(([payload, currentUser]) => {
            const currentUserEmailMatch = payload.customerId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.customerId) &&
                payload.email !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.displayUid);
            if (currentUserEmailMatch) {
                this.routingService.go({ cxRoute: 'login' });
            }
            return currentUserEmailMatch
                ? [new AuthActions.Logout()]
                : [new OrganizationClearData()];
        })));
        this.loadB2BUsers$ = createEffect(() => this.actions$.pipe(ofType(LOAD_B2B_USERS), map((action) => action.payload), switchMap((payload) => this.b2bUserConnector.getList(payload.userId, payload.params).pipe(switchMap((b2bUsers) => {
            const { values, page } = StateUtils.normalizeListPage(b2bUsers, 'customerId');
            return [
                new LoadB2BUserSuccess(values),
                new LoadB2BUsersSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadB2BUsersFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.loadB2BUserApprovers$ = createEffect(() => this.actions$.pipe(ofType(LOAD_B2B_USER_APPROVERS), map((action) => action.payload), groupBy(({ orgCustomerId, params }) => StateUtils.serializeParams(orgCustomerId, params)), mergeMap((group) => group.pipe(switchMap((payload) => this.b2bUserConnector
            .getApprovers(payload.userId, payload.orgCustomerId, payload.params)
            .pipe(switchMap((approvers) => {
            const { values, page } = StateUtils.normalizeListPage(approvers, 'customerId');
            return [
                new LoadB2BUserSuccess(values),
                new LoadB2BUserApproversSuccess({
                    orgCustomerId: payload.orgCustomerId,
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadB2BUserApproversFail({
            orgCustomerId: payload.orgCustomerId,
            params: payload.params,
            error: normalizeHttpError(error),
        })))))))));
        this.loadB2BUserPermissions$ = createEffect(() => this.actions$.pipe(ofType(LOAD_B2B_USER_PERMISSIONS), map((action) => action.payload), groupBy(({ orgCustomerId, params }) => StateUtils.serializeParams(orgCustomerId, params)), mergeMap((group) => group.pipe(switchMap((payload) => this.b2bUserConnector
            .getPermissions(payload.userId, payload.orgCustomerId, payload.params)
            .pipe(switchMap((permissions) => {
            const { values, page } = StateUtils.normalizeListPage(permissions, 'code');
            return [
                new LoadPermissionSuccess(values),
                new LoadB2BUserPermissionsSuccess({
                    orgCustomerId: payload.orgCustomerId,
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadB2BUserPermissionsFail({
            orgCustomerId: payload.orgCustomerId,
            params: payload.params,
            error: normalizeHttpError(error),
        })))))))));
        this.loadB2BUserUserGroups$ = createEffect(() => this.actions$.pipe(ofType(LOAD_B2B_USER_USER_GROUPS), map((action) => action.payload), groupBy(({ orgCustomerId, params }) => StateUtils.serializeParams(orgCustomerId, params)), mergeMap((group) => group.pipe(switchMap((payload) => this.b2bUserConnector
            .getUserGroups(payload.userId, payload.orgCustomerId, payload.params)
            .pipe(switchMap((userGroups) => {
            const { values, page } = StateUtils.normalizeListPage(userGroups, 'uid');
            return [
                new LoadUserGroupSuccess(values),
                new LoadB2BUserUserGroupsSuccess({
                    orgCustomerId: payload.orgCustomerId,
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadB2BUserUserGroupsFail({
            orgCustomerId: payload.orgCustomerId,
            params: payload.params,
            error: normalizeHttpError(error),
        })))))))));
        this.assignApproverToB2BUser$ = createEffect(() => this.actions$.pipe(ofType(ASSIGN_B2B_USER_APPROVER), map((action) => action.payload), mergeMap((payload) => this.b2bUserConnector
            .assignApprover(payload.userId, payload.orgCustomerId, payload.approverId)
            .pipe(switchMap((data) => [
            new AssignB2BUserApproverSuccess({
                // Occ returned email, but we use customerId in store
                approverId: payload.approverId,
                selected: data.selected,
            }),
            // Clearing data in this case causes unexpected behavior (#10468)
            // new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignB2BUserApproverFail({
                orgCustomerId: payload.orgCustomerId,
                approverId: payload.approverId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignApproverFromB2BUser$ = createEffect(() => this.actions$.pipe(ofType(UNASSIGN_B2B_USER_APPROVER), map((action) => action.payload), mergeMap((payload) => this.b2bUserConnector
            .unassignApprover(payload.userId, payload.orgCustomerId, payload.approverId)
            .pipe(switchMap((data) => [
            new UnassignB2BUserApproverSuccess({
                // Occ returned email, but we use customerId in store
                approverId: payload.approverId,
                selected: data.selected,
            }),
            // Clearing data in this case causes unexpected behavior (#10468)
            // new OrganizationActions.OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignB2BUserApproverFail({
                orgCustomerId: payload.orgCustomerId,
                approverId: payload.approverId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.assignPermissionToB2BUser$ = createEffect(() => this.actions$.pipe(ofType(ASSIGN_B2B_USER_PERMISSION), map((action) => action.payload), mergeMap((payload) => this.b2bUserConnector
            .assignPermission(payload.userId, payload.orgCustomerId, payload.permissionId)
            .pipe(switchMap((data) => [
            new AssignB2BUserPermissionSuccess({
                permissionId: data.id,
                selected: data.selected,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignB2BUserPermissionFail({
                orgCustomerId: payload.orgCustomerId,
                permissionId: payload.permissionId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignPermissionFromB2BUser$ = createEffect(() => this.actions$.pipe(ofType(UNASSIGN_B2B_USER_PERMISSION), map((action) => action.payload), mergeMap((payload) => this.b2bUserConnector
            .unassignPermission(payload.userId, payload.orgCustomerId, payload.permissionId)
            .pipe(switchMap((data) => [
            new UnassignB2BUserPermissionSuccess({
                permissionId: data.id,
                selected: data.selected,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignB2BUserPermissionFail({
                orgCustomerId: payload.orgCustomerId,
                permissionId: payload.permissionId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.assignUserGroupToB2BUser$ = createEffect(() => this.actions$.pipe(ofType(ASSIGN_B2B_USER_USER_GROUP), map((action) => action.payload), mergeMap((payload) => this.b2bUserConnector
            .assignUserGroup(payload.userId, payload.orgCustomerId, payload.userGroupId)
            .pipe(switchMap((data) => [
            new AssignB2BUserUserGroupSuccess({
                uid: data.id,
                selected: data.selected,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignB2BUserUserGroupFail({
                orgCustomerId: payload.orgCustomerId,
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignUserGroupFromB2BUser$ = createEffect(() => this.actions$.pipe(ofType(UNASSIGN_B2B_USER_USER_GROUP), map((action) => action.payload), mergeMap((payload) => this.b2bUserConnector
            .unassignUserGroup(payload.userId, payload.orgCustomerId, payload.userGroupId)
            .pipe(switchMap(
        // TODO: Workaround because occ doesn't respond here
        // (data) =>
        //   new B2BUserActions.DeleteB2BUserUserGroupSuccess({
        //     uid: data.id,
        //     selected: data.selected,
        //   })
        () => [
            new UnassignB2BUserUserGroupSuccess({
                uid: payload.userGroupId,
                selected: false,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignB2BUserUserGroupFail({
                orgCustomerId: payload.orgCustomerId,
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
    }
    redirectToDetails(route, data) {
        var _a, _b;
        if (((_b = (_a = route === null || route === void 0 ? void 0 : route.state) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.id) !== '/organization/units') {
            this.routingService.go({
                cxRoute: 'orgUserDetails',
                params: data,
            });
        }
    }
}
B2BUserEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserEffects, deps: [{ token: i1.Actions }, { token: B2BUserConnector }, { token: i2.RoutingService }, { token: i4.UserAccountFacade }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
B2BUserEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: B2BUserConnector }, { type: i2.RoutingService }, { type: i4.UserAccountFacade }, { type: i2.UserIdService }]; } });

class UserGroupEffects {
    constructor(actions$, userGroupConnector) {
        this.actions$ = actions$;
        this.userGroupConnector = userGroupConnector;
        this.loadUserGroup$ = createEffect(() => this.actions$.pipe(ofType(LOAD_USER_GROUP), map((action) => action.payload), switchMap(({ userId, userGroupId }) => {
            return this.userGroupConnector.get(userId, userGroupId).pipe(map((userGroup) => {
                return new LoadUserGroupSuccess([userGroup]);
            }), catchError((error) => of(new LoadUserGroupFail({
                userGroupId,
                error: normalizeHttpError(error),
            }))));
        })));
        this.loadUserGroups$ = createEffect(() => this.actions$.pipe(ofType(LOAD_USER_GROUPS), map((action) => action.payload), switchMap((payload) => this.userGroupConnector.getList(payload.userId, payload.params).pipe(switchMap((userGroups) => {
            const { values, page } = StateUtils.normalizeListPage(userGroups, 'uid');
            return [
                new LoadUserGroupSuccess(values),
                new LoadUserGroupsSuccess({
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadUserGroupsFail({
            params: payload.params,
            error: normalizeHttpError(error),
        })))))));
        this.loadAvailableOrderApprovalPermissions$ = createEffect(() => this.actions$.pipe(ofType(LOAD_USER_GROUP_PERMISSIONS), map((action) => action.payload), groupBy(({ userGroupId, params }) => StateUtils.serializeParams(userGroupId, params)), mergeMap((group) => group.pipe(switchMap((payload) => this.userGroupConnector
            .getAvailableOrderApprovalPermissions(payload.userId, payload.userGroupId, payload.params)
            .pipe(switchMap((permissions) => {
            const { values, page } = StateUtils.normalizeListPage(permissions, 'code');
            return [
                new LoadPermissionSuccess(values),
                new LoadPermissionsSuccess$1({
                    userGroupId: payload.userGroupId,
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadPermissionsFail$1({
            userGroupId: payload.userGroupId,
            params: payload.params,
            error: normalizeHttpError(error),
        })))))))));
        this.loadAvailableOrgCustomers$ = createEffect(() => this.actions$.pipe(ofType(LOAD_USER_GROUP_AVAILABLE_CUSTOMERS), map((action) => action.payload), groupBy(({ userGroupId, params }) => StateUtils.serializeParams(userGroupId, params)), mergeMap((group) => group.pipe(switchMap((payload) => this.userGroupConnector
            .getAvailableOrgCustomers(payload.userId, payload.userGroupId, payload.params)
            .pipe(switchMap((customers) => {
            const { values, page } = StateUtils.normalizeListPage(customers, 'customerId');
            return [
                new LoadB2BUserSuccess(values),
                new LoadAvailableOrgCustomersSuccess({
                    userGroupId: payload.userGroupId,
                    page,
                    params: payload.params,
                }),
            ];
        }), catchError((error) => of(new LoadAvailableOrgCustomersFail({
            userGroupId: payload.userGroupId,
            params: payload.params,
            error: normalizeHttpError(error),
        })))))))));
        this.createUserGroup$ = createEffect(() => this.actions$.pipe(ofType(CREATE_USER_GROUP), map((action) => action.payload), switchMap((payload) => this.userGroupConnector.create(payload.userId, payload.userGroup).pipe(switchMap((data) => [
            new CreateUserGroupSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new CreateUserGroupFail({
                    userGroupId: (_a = payload.userGroup.uid) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.updateUserGroup$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_USER_GROUP), map((action) => action.payload), switchMap((payload) => this.userGroupConnector
            .update(payload.userId, payload.userGroupId, payload.userGroup)
            .pipe(switchMap(() => [
            // TODO: Workaround for empty PATCH response:
            new UpdateUserGroupSuccess(payload.userGroup),
            new OrganizationClearData(),
        ]), catchError((error) => {
            var _a;
            return from([
                new UpdateUserGroupFail({
                    userGroupId: (_a = payload.userGroup.uid) !== null && _a !== void 0 ? _a : '',
                    error: normalizeHttpError(error),
                }),
                new OrganizationClearData(),
            ]);
        })))));
        this.deleteUserGroup$ = createEffect(() => this.actions$.pipe(ofType(DELETE_USER_GROUP), map((action) => action.payload), switchMap((payload) => this.userGroupConnector
            .delete(payload.userId, payload.userGroupId)
            .pipe(switchMap((data) => [
            new DeleteUserGroupSuccess(data),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new DeleteUserGroupFail({
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.assignPermissionToUserGroup$ = createEffect(() => this.actions$.pipe(ofType(USER_GROUP_ASSIGN_PERMISSION), map((action) => action.payload), mergeMap((payload) => this.userGroupConnector
            .assignOrderApprovalPermission(payload.userId, payload.userGroupId, payload.permissionUid)
            .pipe(switchMap((data) => [
            new AssignPermissionSuccess({
                permissionUid: data.id,
                selected: data.selected,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignPermissionFail({
                userGroupId: payload.userGroupId,
                permissionUid: payload.permissionUid,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.assignMemberUnitUserGroup$ = createEffect(() => this.actions$.pipe(ofType(USER_GROUP_ASSIGN_MEMBER), map((action) => action.payload), mergeMap((payload) => this.userGroupConnector
            .assignMember(payload.userId, payload.userGroupId, payload.customerId)
            .pipe(switchMap(() => [
            new AssignMemberSuccess({
                customerId: payload.customerId,
                selected: true,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new AssignMemberFail({
                userGroupId: payload.userGroupId,
                customerId: payload.customerId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignMemberFromUserGroup$ = createEffect(() => this.actions$.pipe(ofType(USER_GROUP_UNASSIGN_MEMBER), map((action) => action.payload), mergeMap((payload) => this.userGroupConnector
            .unassignMember(payload.userId, payload.userGroupId, payload.customerId)
            .pipe(switchMap(() => [
            new UnassignMemberSuccess({
                customerId: payload.customerId,
                selected: false,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignMemberFail({
                userGroupId: payload.userGroupId,
                customerId: payload.customerId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignPermissionFromUserGroup$ = createEffect(() => this.actions$.pipe(ofType(USER_GROUP_UNASSIGN_PERMISSION), map((action) => action.payload), mergeMap((payload) => this.userGroupConnector
            .unassignOrderApprovalPermission(payload.userId, payload.userGroupId, payload.permissionUid)
            .pipe(switchMap((data) => [
            new UnassignPermissionSuccess({
                permissionUid: data.id,
                selected: data.selected,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignPermissionFail({
                userGroupId: payload.userGroupId,
                permissionUid: payload.permissionUid,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
        this.unassignAllMembersFromUserGroup$ = createEffect(() => this.actions$.pipe(ofType(USER_GROUP_UNASSIGN_ALL_MEMBERS), map((action) => action.payload), switchMap((payload) => this.userGroupConnector
            .unassignAllMembers(payload.userId, payload.userGroupId)
            .pipe(switchMap(() => [
            new UnassignAllMembersSuccess({
                selected: false,
            }),
            new OrganizationClearData(),
        ]), catchError((error) => from([
            new UnassignAllMembersFail({
                userGroupId: payload.userGroupId,
                error: normalizeHttpError(error),
            }),
            new OrganizationClearData(),
        ]))))));
    }
}
UserGroupEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupEffects, deps: [{ token: i1.Actions }, { token: UserGroupConnector }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: UserGroupConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [
    BudgetEffects,
    OrgUnitEffects,
    UserGroupEffects,
    PermissionEffects,
    CostCenterEffects,
    B2BUserEffects,
];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const b2bUserInitialState = undefined;
const b2bUsersInitialState = undefined;
function b2bUserEntitiesReducer(state = b2bUserInitialState, action) {
    var _a, _b, _c;
    switch (action.type) {
        case LOAD_B2B_USER_SUCCESS:
        case CREATE_B2B_USER_SUCCESS:
        case UPDATE_B2B_USER_SUCCESS:
            return action.payload;
        case ASSIGN_ROLE_SUCCESS:
        case ASSIGN_APPROVER_SUCCESS:
            return Object.assign(Object.assign({}, state), { selected: (_a = action.payload) === null || _a === void 0 ? void 0 : _a.selected, roles: [...((state === null || state === void 0 ? void 0 : state.roles) || []), (_b = action.payload) === null || _b === void 0 ? void 0 : _b.roleId] });
        case UNASSIGN_ROLE_SUCCESS:
        case UNASSIGN_APPROVER_SUCCESS:
            return Object.assign(Object.assign({}, state), { selected: (_c = action.payload) === null || _c === void 0 ? void 0 : _c.selected, roles: [...((state === null || state === void 0 ? void 0 : state.roles) || [])].filter((role) => { var _a; return role !== ((_a = action.payload) === null || _a === void 0 ? void 0 : _a.roleId); }) });
        case ASSIGN_B2B_USER_APPROVER_SUCCESS:
        case UNASSIGN_B2B_USER_APPROVER_SUCCESS:
        case USER_GROUP_ASSIGN_MEMBER_SUCCESS:
        case USER_GROUP_UNASSIGN_MEMBER_SUCCESS:
        case USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS:
            return Object.assign(Object.assign({}, state), action.payload);
    }
    return state;
}
function userListReducer(state = b2bUsersInitialState, action) {
    switch (action.type) {
        case LOAD_B2B_USERS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function b2bUserApproverListReducer(state = b2bUsersInitialState, action) {
    switch (action.type) {
        case LOAD_B2B_USER_APPROVERS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function b2bUserPermissionListReducer(state = b2bUsersInitialState, action) {
    switch (action.type) {
        case LOAD_B2B_USER_PERMISSIONS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function b2bUserUserGroupListReducer(state = b2bUsersInitialState, action) {
    switch (action.type) {
        case LOAD_B2B_USER_USER_GROUPS_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const budgetInitialState = undefined;
const budgetsInitialState = undefined;
function budgetsEntitiesReducer(state = budgetInitialState, action) {
    switch (action.type) {
        case LOAD_BUDGET_SUCCESS:
        case CREATE_BUDGET_SUCCESS:
        case UPDATE_BUDGET_SUCCESS:
            return action.payload;
        case UNASSIGN_BUDGET_SUCCESS:
        case ASSIGN_BUDGET_SUCCESS:
            return Object.assign(Object.assign({}, state), action.payload);
    }
    return state;
}
function budgetsListReducer(state = budgetsInitialState, action) {
    switch (action.type) {
        case LOAD_BUDGETS_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const costCenterInitialState = undefined;
const costCentersInitialState = undefined;
function costCentersEntitiesReducer(state = costCenterInitialState, action) {
    switch (action.type) {
        case LOAD_COST_CENTER_SUCCESS:
        case CREATE_COST_CENTER_SUCCESS:
        case UPDATE_COST_CENTER_SUCCESS:
            return action.payload;
    }
    return state;
}
function costCentersListReducer(state = costCentersInitialState, action) {
    switch (action.type) {
        case LOAD_COST_CENTERS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function costCenterAssignedBudgetsListReducer(state = costCentersInitialState, action) {
    switch (action.type) {
        case LOAD_ASSIGNED_BUDGETS_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const orgUnitInitialState = undefined;
const orgUnitsInitialState = undefined;
function orgUnitEntitiesReducer(state = orgUnitInitialState, action) {
    switch (action.type) {
        case LOAD_ORG_UNIT_SUCCESS:
        case CREATE_ORG_UNIT_SUCCESS:
            return action.payload;
        case UPDATE_ORG_UNIT_SUCCESS:
            return Object.assign(Object.assign({}, state), action.payload);
    }
    return state;
}
function orgUnitListReducer(state = orgUnitsInitialState, action) {
    switch (action.type) {
    }
    return state;
}
function orgUnitUserListReducer(state = orgUnitsInitialState, action) {
    switch (action.type) {
        case LOAD_ASSIGNED_USERS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function orgUnitAddressListReducer(state = orgUnitsInitialState, action) {
    switch (action.type) {
        case LOAD_ADDRESSES_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const permissionInitialState = undefined;
const permissionsInitialState = undefined;
function permissionsEntitiesReducer(state = permissionInitialState, action) {
    switch (action.type) {
        case LOAD_PERMISSION_SUCCESS:
        case CREATE_PERMISSION_SUCCESS:
        case UPDATE_PERMISSION_SUCCESS:
            return action.payload;
        case USER_GROUP_ASSIGN_PERMISSION_SUCCESS:
        case USER_GROUP_UNASSIGN_PERMISSION_SUCCESS:
        case ASSIGN_B2B_USER_PERMISSION_SUCCESS:
        case UNASSIGN_B2B_USER_PERMISSION_SUCCESS:
            return Object.assign(Object.assign({}, state), action.payload);
    }
    return state;
}
function permissionsListReducer(state = permissionsInitialState, action) {
    switch (action.type) {
        case LOAD_PERMISSIONS_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const userGroupInitialState = undefined;
const userGroupsInitialState = undefined;
function userGroupEntitiesReducer(state = userGroupInitialState, action) {
    switch (action.type) {
        case LOAD_USER_GROUP_SUCCESS:
        case CREATE_USER_GROUP_SUCCESS:
        case UPDATE_USER_GROUP_SUCCESS:
            return action.payload;
        case ASSIGN_B2B_USER_USER_GROUP_SUCCESS:
        case UNASSIGN_B2B_USER_USER_GROUP_SUCCESS:
            return Object.assign(Object.assign({}, state), action.payload);
    }
    return state;
}
function userGroupsListReducer(state = userGroupsInitialState, action) {
    switch (action.type) {
        case LOAD_USER_GROUPS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function userGroupAvailableOrderApprovalPermissionsListReducer(state = userGroupsInitialState, action) {
    switch (action.type) {
        case LOAD_USER_GROUP_PERMISSIONS_SUCCESS:
            return action.payload.page;
    }
    return state;
}
function userGroupAvailablOrgCustomersListReducer(state = userGroupsInitialState, action) {
    switch (action.type) {
        case LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS:
            return action.payload.page;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        [BUDGET_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(BUDGET_ENTITIES, budgetsEntitiesReducer),
            list: StateUtils.entityLoaderReducer(BUDGET_LIST, budgetsListReducer),
        }),
        [PERMISSION_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(PERMISSION_ENTITIES, permissionsEntitiesReducer),
            list: StateUtils.entityLoaderReducer(PERMISSION_LIST, permissionsListReducer),
            permissionTypes: StateUtils.entityLoaderReducer(PERMISSION_TYPES_LIST),
        }),
        [ORG_UNIT_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(ORG_UNIT_ENTITIES, orgUnitEntitiesReducer),
            availableOrgUnitNodes: StateUtils.entityLoaderReducer(ORG_UNIT_NODE_LIST),
            tree: StateUtils.entityLoaderReducer(ORG_UNIT_TREE_ENTITY),
            approvalProcesses: StateUtils.entityLoaderReducer(ORG_UNIT_APPROVAL_PROCESSES_ENTITIES),
            users: StateUtils.entityLoaderReducer(ORG_UNIT_ASSIGNED_USERS, orgUnitUserListReducer),
            addressList: StateUtils.entityLoaderReducer(ADDRESS_LIST, orgUnitAddressListReducer),
            addressEntities: StateUtils.entityLoaderReducer(ADDRESS_ENTITIES),
        }),
        [USER_GROUP_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(USER_GROUP_ENTITIES, userGroupEntitiesReducer),
            list: StateUtils.entityLoaderReducer(USER_GROUP_LIST, userGroupsListReducer),
            permissions: StateUtils.entityLoaderReducer(USER_GROUP_PERMISSIONS, userGroupAvailableOrderApprovalPermissionsListReducer),
            customers: StateUtils.entityLoaderReducer(USER_GROUP_AVAILABLE_CUSTOMERS, userGroupAvailablOrgCustomersListReducer),
        }),
        [COST_CENTER_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(COST_CENTER_ENTITIES, costCentersEntitiesReducer),
            list: StateUtils.entityLoaderReducer(COST_CENTER_LIST, costCentersListReducer),
            budgets: StateUtils.entityLoaderReducer(COST_CENTER_ASSIGNED_BUDGETS, costCenterAssignedBudgetsListReducer),
        }),
        [B2B_USER_FEATURE]: combineReducers({
            entities: StateUtils.entityLoaderReducer(B2B_USER_ENTITIES, b2bUserEntitiesReducer),
            list: StateUtils.entityLoaderReducer(USER_LIST, userListReducer),
            approvers: StateUtils.entityLoaderReducer(B2B_USER_APPROVERS, b2bUserApproverListReducer),
            permissions: StateUtils.entityLoaderReducer(B2B_USER_PERMISSIONS, b2bUserPermissionListReducer),
            userGroups: StateUtils.entityLoaderReducer(B2B_USER_USER_GROUPS, b2bUserUserGroupListReducer),
        }),
    };
}
const reducerToken = new InjectionToken('OrganizationReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};
function clearOrganizationState(reducer) {
    return function (state, action) {
        if (action.type === CLEAR_ORGANIZATION_DATA) {
            state = undefined;
        }
        if (action.type === AuthActions.LOGOUT) {
            state = undefined;
        }
        if (action.type === SiteContextActions.LANGUAGE_CHANGE) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
const metaReducers = [clearOrganizationState];

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrganizationStoreModule {
}
OrganizationStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrganizationStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrganizationStoreModule, imports: [i1$1.StoreFeatureModule, i1.EffectsFeatureModule] });
OrganizationStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationStoreModule, providers: [reducerProvider], imports: [StoreModule.forFeature(ORGANIZATION_FEATURE, reducerToken, {
            metaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrganizationStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreModule.forFeature(ORGANIZATION_FEATURE, reducerToken, {
                            metaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [reducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AdministrationCoreModule {
    static forRoot() {
        return {
            ngModule: AdministrationCoreModule,
            providers: [
                BudgetConnector,
                OrgUnitConnector,
                UserGroupConnector,
                PermissionConnector,
                CostCenterConnector,
                B2BUserConnector,
            ],
        };
    }
}
AdministrationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, imports: [OrganizationPageMetaModule, OrganizationStoreModule] });
AdministrationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, providers: [
        {
            provide: HttpErrorHandler,
            useExisting: OrganizationConflictHandler,
            multi: true,
        },
        {
            provide: HttpErrorHandler,
            useExisting: OrganizationBadRequestHandler,
            multi: true,
        },
    ], imports: [OrganizationPageMetaModule, OrganizationStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdministrationCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrganizationPageMetaModule, OrganizationStoreModule],
                    providers: [
                        {
                            provide: HttpErrorHandler,
                            useExisting: OrganizationConflictHandler,
                            multi: true,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: OrganizationBadRequestHandler,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const B2B_USER_NORMALIZER = new InjectionToken('B2BUserNormalizer');
const B2B_USER_SERIALIZER = new InjectionToken('B2BUserSerializer');
const B2B_USERS_NORMALIZER = new InjectionToken('UserListNormalizer');

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const BUDGET_NORMALIZER = new InjectionToken('BudgetNormalizer');
const BUDGETS_NORMALIZER = new InjectionToken('BudgetsListNormalizer');
const BUDGET_SERIALIZER = new InjectionToken('BudgetSerializer');

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const B2BUNIT_NODE_NORMALIZER = new InjectionToken('B2BUnitNodeNormalizer');
const B2BUNIT_NODE_LIST_NORMALIZER = new InjectionToken('B2BUnitNodeListNormalizer');
const B2BUNIT_NORMALIZER = new InjectionToken('B2BUnitNormalizer');
const B2BUNIT_SERIALIZER = new InjectionToken('B2BUnitSerializer');
const B2BUNIT_APPROVAL_PROCESSES_NORMALIZER = new InjectionToken('B2BUnitApprovalProcessNormalizer');

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PERMISSION_NORMALIZER = new InjectionToken('PermissionNormalizer');
const PERMISSIONS_NORMALIZER = new InjectionToken('PermissionsListNormalizer');
const PERMISSION_TYPE_NORMALIZER = new InjectionToken('PermissionTypeNormalizer');
const PERMISSION_TYPES_NORMALIZER = new InjectionToken('PermissionTypesListNormalizer');
const PERMISSION_SERIALIZER = new InjectionToken('PermissionSerializer');

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const USER_GROUP_NORMALIZER = new InjectionToken('UserGroupNormalizer');
const USER_GROUP_SERIALIZER = new InjectionToken('UserGroupSerializer');
const USER_GROUPS_NORMALIZER = new InjectionToken('UserGroupListNormalizer');

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AdminGuard {
    constructor(userAccountFacade, routingService, globalMessageService) {
        this.userAccountFacade = userAccountFacade;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return this.userAccountFacade.get().pipe(filter((user) => !!user && Object.keys(user).length > 0), pluck('roles'), map((roles) => {
            const hasRole = Array.isArray(roles) && roles.includes(B2BUserRole.ADMIN);
            if (!hasRole) {
                // routing as temporary solution until /organization won't
                // have set up proper permission on backend
                this.routingService.go({ cxRoute: 'organization' });
                this.globalMessageService.add({ key: 'organization.notification.noSufficientPermissions' }, GlobalMessageType.MSG_TYPE_WARNING);
            }
            return hasRole;
        }));
    }
}
AdminGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdminGuard, deps: [{ token: i4.UserAccountFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
AdminGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdminGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AdminGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i4.UserAccountFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var LoadStatus;
(function (LoadStatus) {
    LoadStatus[LoadStatus["SUCCESS"] = 0] = "SUCCESS";
    LoadStatus[LoadStatus["ERROR"] = 1] = "ERROR";
})(LoadStatus || (LoadStatus = {}));

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var Period;
(function (Period) {
    Period["DAY"] = "DAY";
    Period["WEEK"] = "WEEK";
    Period["MONTH"] = "MONTH";
    Period["QUARTER"] = "QUARTER";
    Period["YEAR"] = "YEAR";
})(Period || (Period = {}));

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrganizationState = createFeatureSelector(ORGANIZATION_FEATURE);

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getPermissionManagementState = createSelector(getOrganizationState, (state) => state[PERMISSION_FEATURE]);
const getPermissionsState = createSelector(getPermissionManagementState, (state) => state && state.entities);
const getPermissionState = (permissionId) => createSelector(getPermissionsState, (state) => StateUtils.entityLoaderStateSelector(state, permissionId));
const getPermissionTypesState = createSelector(getPermissionManagementState, (state) => state && state.permissionTypes);
const getPermission = (permissionCode) => createSelector(getPermissionsState, (state) => StateUtils.entityLoaderStateSelector(state, permissionCode));
const getPermissionValue = (permissionCode) => {
    return createSelector(getPermission(permissionCode), (permissionState) => StateUtils.loaderValueSelector(permissionState));
};
const getPermissionList = (params) => createSelector(getPermissionManagementState, (state) => StateUtils.denormalizeSearch(state, params));
const getPermissionTypes = () => createSelector(getPermissionTypesState, (state) => StateUtils.entityLoaderStateSelector(state, PERMISSION_TYPES));

var permission_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getPermissionManagementState: getPermissionManagementState,
    getPermissionsState: getPermissionsState,
    getPermissionState: getPermissionState,
    getPermissionTypesState: getPermissionTypesState,
    getPermission: getPermission,
    getPermissionValue: getPermissionValue,
    getPermissionList: getPermissionList,
    getPermissionTypes: getPermissionTypes
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getB2BUserManagementState = createSelector(getOrganizationState, (state) => state[B2B_USER_FEATURE]);
const getB2BUsersState = createSelector(getB2BUserManagementState, (state) => state && state.entities);
const getB2BUserState = (orgCustomerId) => createSelector(getB2BUsersState, (state) => StateUtils.entityLoaderStateSelector(state, orgCustomerId));
const getB2BUserValue = (orgCustomerId) => {
    return createSelector(getB2BUserState(orgCustomerId), (b2BUserState) => StateUtils.loaderValueSelector(b2BUserState));
};
const getUserList = (params) => createSelector(getB2BUserManagementState, (state) => StateUtils.denormalizeSearch(state, params));
const getB2BUserApprovers = (code, params) => createSelector(getB2BUserManagementState, getB2BUsersState, (state, approvers) => StateUtils.denormalizeCustomB2BSearch(state.approvers, approvers, params, code));
const getB2BUserPermissions = (code, params) => createSelector(getB2BUserManagementState, getPermissionsState, (state, permissions) => StateUtils.denormalizeCustomB2BSearch(state.permissions, permissions, params, code));
// avoid circular dependency
const getUserGroupsState$1 = createSelector(getOrganizationState, (state) => state[USER_GROUP_FEATURE].entities);
const getB2BUserUserGroups = (code, params) => createSelector(getB2BUserManagementState, getUserGroupsState$1, (state, userGroups) => StateUtils.denormalizeCustomB2BSearch(state.userGroups, userGroups, params, code));

var b2bUser_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getB2BUserManagementState: getB2BUserManagementState,
    getB2BUsersState: getB2BUsersState,
    getB2BUserState: getB2BUserState,
    getB2BUserValue: getB2BUserValue,
    getUserList: getUserList,
    getB2BUserApprovers: getB2BUserApprovers,
    getB2BUserPermissions: getB2BUserPermissions,
    getB2BUserUserGroups: getB2BUserUserGroups
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getItemStatus(itemState) {
    return itemState.pipe(observeOn(queueScheduler), pairwise(), filter(([previousState]) => { var _a; return (_a = previousState.loading) !== null && _a !== void 0 ? _a : false; }), map(([_previousState, currentState]) => ({
        status: currentState.success
            ? LoadStatus.SUCCESS
            : currentState.error
                ? LoadStatus.ERROR
                : null,
        item: currentState.value,
    })));
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BUserService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    load(orgCustomerId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadB2BUser({
            userId,
            orgCustomerId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadList(params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadB2BUsers({ userId, params })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getB2BUserValue(orgCustomerId) {
        return this.store
            .select(getB2BUserValue(orgCustomerId))
            .pipe(filter((b2bUser) => Boolean(b2bUser)));
    }
    get(orgCustomerId) {
        const loading$ = this.getB2BUserState(orgCustomerId).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.load(orgCustomerId);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getB2BUserValue(orgCustomerId));
    }
    getList(params) {
        return this.getUserList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadList(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getErrorState(orgCustomerId) {
        return this.getB2BUserState(orgCustomerId).pipe(map((state) => { var _a; return (_a = state.error) !== null && _a !== void 0 ? _a : false; }));
    }
    create(orgCustomer) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreateB2BUser({
            userId,
            orgCustomer,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    update(orgCustomerId, orgCustomer) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdateB2BUser({
            userId,
            orgCustomerId,
            orgCustomer,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getLoadingStatus(orgCustomerId) {
        return getItemStatus(this.getB2BUserState(orgCustomerId));
    }
    loadApprovers(orgCustomerId, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getApprovers(orgCustomerId, params) {
        return this.getB2BUserApproverList(orgCustomerId, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadApprovers(orgCustomerId, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    assignApprover(orgCustomerId, approverId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignApprover(orgCustomerId, approverId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadPermissions(orgCustomerId, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getPermissions(orgCustomerId, params) {
        return this.getB2BUserPermissionList(orgCustomerId, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadPermissions(orgCustomerId, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    assignPermission(orgCustomerId, permissionId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignPermission(orgCustomerId, permissionId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadUserGroups(orgCustomerId, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadB2BUserUserGroups({
            userId,
            orgCustomerId,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getUserGroups(orgCustomerId, params) {
        return this.getB2BUserUserGroupList(orgCustomerId, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadUserGroups(orgCustomerId, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    assignUserGroup(orgCustomerId, userGroupId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignB2BUserUserGroup({
            userId,
            orgCustomerId,
            userGroupId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignUserGroup(orgCustomerId, userGroupId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignB2BUserUserGroup({
            userId,
            orgCustomerId,
            userGroupId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    /**
     * Get list of all roles for B2BUser sorted by increasing privileges.
     *
     * This list is not driven by the backend (lack of API), but reflects roles
     * from the backend: `b2badmingroup`, `b2bcustomergroup`, `b2bmanagergroup` and `b2bapprovergroup`.
     *
     * If you reconfigure those roles in the backend or extend the list, you should change
     * this implementation accordingly.
     */
    getAllRoles() {
        return [
            B2BUserRole.CUSTOMER,
            B2BUserRole.MANAGER,
            B2BUserRole.APPROVER,
            B2BUserRole.ADMIN,
        ];
    }
    getB2BUserApproverList(orgCustomerId, params) {
        return this.store.select(getB2BUserApprovers(orgCustomerId, params));
    }
    getB2BUserPermissionList(orgCustomerId, params) {
        return this.store.select(getB2BUserPermissions(orgCustomerId, params));
    }
    getB2BUserUserGroupList(orgCustomerId, params) {
        return this.store.select(getB2BUserUserGroups(orgCustomerId, params));
    }
    getB2BUserState(orgCustomerId) {
        return this.store.select(getB2BUserState(orgCustomerId));
    }
    getUserList(params) {
        return this.store.select(getUserList(params));
    }
}
B2BUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
B2BUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: B2BUserService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getBudgetManagementState = createSelector(getOrganizationState, (state) => state[BUDGET_FEATURE]);
const getBudgetsState = createSelector(getBudgetManagementState, (state) => state && state.entities);
const getBudget = (budgetCode) => createSelector(getBudgetsState, (state) => StateUtils.entityLoaderStateSelector(state, budgetCode));
const getBudgetValue = (budgetCode) => {
    return createSelector(getBudget(budgetCode), (budgetState) => StateUtils.loaderValueSelector(budgetState));
};
const getBudgetList = (params) => createSelector(getBudgetManagementState, (state) => StateUtils.denormalizeSearch(state, params));

var budget_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getBudgetManagementState: getBudgetManagementState,
    getBudgetsState: getBudgetsState,
    getBudget: getBudget,
    getBudgetValue: getBudgetValue,
    getBudgetList: getBudgetList
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getB2BOrgUnitState = createSelector(getOrganizationState, (state) => state[ORG_UNIT_FEATURE]);
const getOrgUnitsNodeListState = createSelector(getB2BOrgUnitState, (state) => state && state.availableOrgUnitNodes);
const getOrgUnitsState = createSelector(getB2BOrgUnitState, (state) => state && state.entities);
const getOrgUnitsTreeState = createSelector(getB2BOrgUnitState, (state) => state && state.tree);
const getAddressesState = createSelector(getB2BOrgUnitState, (state) => state && state.addressEntities);
const getApprovalProcessesState = createSelector(getB2BOrgUnitState, (state) => state && state.approvalProcesses);
const getOrgUnit = (orgUnitId) => createSelector(getOrgUnitsState, (state) => StateUtils.entityLoaderStateSelector(state, orgUnitId));
const getOrgUnitValue = (orgUnitId) => {
    return createSelector(getOrgUnit(orgUnitId), (orgUnitState) => StateUtils.loaderValueSelector(orgUnitState));
};
const getOrgUnitState = (orgUnitId) => createSelector(getOrgUnitsState, (state) => StateUtils.entityLoaderStateSelector(state, orgUnitId));
const getOrgUnitList = () => createSelector(getOrgUnitsNodeListState, (state) => StateUtils.entityLoaderStateSelector(state, ORG_UNIT_NODES));
const getOrgUnitTree = () => createSelector(getOrgUnitsTreeState, (state) => StateUtils.entityLoaderStateSelector(state, ORG_UNIT_TREE));
const getApprovalProcesses = () => createSelector(getApprovalProcessesState, (state) => StateUtils.entityLoaderStateSelector(state, ORG_UNIT_APPROVAL_PROCESSES));
const getAssignedUsers = (orgUnitId, roleId, params) => createSelector(getB2BOrgUnitState, getB2BUsersState, (state, users) => StateUtils.denormalizeCustomB2BSearch(state.users, users, params, `${orgUnitId},${roleId}`));
const getB2BAddresses = (orgUnitId, params) => createSelector(getB2BOrgUnitState, (state) => StateUtils.denormalizeCustomB2BSearch(state.addressList, state.addressEntities, params, orgUnitId));
const getB2BAddress = (addressId) => createSelector(getAddressesState, (state) => StateUtils.entityLoaderStateSelector(state, addressId));

var orgUnit_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getB2BOrgUnitState: getB2BOrgUnitState,
    getOrgUnitsNodeListState: getOrgUnitsNodeListState,
    getOrgUnitsState: getOrgUnitsState,
    getOrgUnitsTreeState: getOrgUnitsTreeState,
    getAddressesState: getAddressesState,
    getApprovalProcessesState: getApprovalProcessesState,
    getOrgUnit: getOrgUnit,
    getOrgUnitValue: getOrgUnitValue,
    getOrgUnitState: getOrgUnitState,
    getOrgUnitList: getOrgUnitList,
    getOrgUnitTree: getOrgUnitTree,
    getApprovalProcesses: getApprovalProcesses,
    getAssignedUsers: getAssignedUsers,
    getB2BAddresses: getB2BAddresses,
    getB2BAddress: getB2BAddress
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getUserGroupManagementState = createSelector(getOrganizationState, (state) => state[USER_GROUP_FEATURE]);
const getUserGroupsState = createSelector(getUserGroupManagementState, (state) => state && state.entities);
const getUserGroup = (userGroupId) => createSelector(getUserGroupsState, (state) => StateUtils.entityLoaderStateSelector(state, userGroupId));
const getUserGroupValue = (userGroupId) => {
    return createSelector(getUserGroup(userGroupId), (userGroupState) => StateUtils.loaderValueSelector(userGroupState));
};
const getUserGroupList = (params) => createSelector(getUserGroupManagementState, (state) => StateUtils.denormalizeSearch(state, params));
const getAvailableOrgCustomers = (code, params) => createSelector(getUserGroupManagementState, getB2BUsersState, (state, customers) => StateUtils.denormalizeCustomB2BSearch(state.customers, customers, params, code));
const getAvailableOrderApprovalPermissions = (code, params) => createSelector(getUserGroupManagementState, getPermissionsState, (state, permissions) => StateUtils.denormalizeCustomB2BSearch(state.permissions, permissions, params, code));
const getUserGroupState = (code) => createSelector(getUserGroupsState, (state) => StateUtils.entityLoaderStateSelector(state, code));

var userGroup_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getUserGroupManagementState: getUserGroupManagementState,
    getUserGroupsState: getUserGroupsState,
    getUserGroup: getUserGroup,
    getUserGroupValue: getUserGroupValue,
    getUserGroupList: getUserGroupList,
    getAvailableOrgCustomers: getAvailableOrgCustomers,
    getAvailableOrderApprovalPermissions: getAvailableOrderApprovalPermissions,
    getUserGroupState: getUserGroupState
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getCostCenterManagementState = createSelector(getOrganizationState, (state) => state[COST_CENTER_FEATURE]);
const getCostCentersState = createSelector(getCostCenterManagementState, (state) => state && state.entities);
const getCostCenter = (costCenterCode) => createSelector(getCostCentersState, (state) => StateUtils.entityLoaderStateSelector(state, costCenterCode));
const getCostCenterValue = (costCenterCode) => {
    return createSelector(getCostCenter(costCenterCode), (costCenterState) => StateUtils.loaderValueSelector(costCenterState));
};
const getCostCenterList = (params) => createSelector(getCostCenterManagementState, (state) => StateUtils.denormalizeSearch(state, params));
const getAssignedBudgets = (code, params) => createSelector(getCostCenterManagementState, getBudgetsState, (state, budgets) => StateUtils.denormalizeCustomB2BSearch(state.budgets, budgets, params, code));
const getCostCenterState = (code) => createSelector(getCostCentersState, (state) => StateUtils.entityLoaderStateSelector(state, code));

var costCenter_selector = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCostCenterManagementState: getCostCenterManagementState,
    getCostCentersState: getCostCentersState,
    getCostCenter: getCostCenter,
    getCostCenterValue: getCostCenterValue,
    getCostCenterList: getCostCenterList,
    getAssignedBudgets: getAssignedBudgets,
    getCostCenterState: getCostCenterState
});

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    loadBudget(budgetCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadBudget({ userId, budgetCode })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadBudgets(params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadBudgets({ userId, params })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getBudgetState(budgetCode) {
        return this.store.select(getBudget(budgetCode));
    }
    getBudgetValue(budgetCode) {
        return this.store
            .select(getBudgetValue(budgetCode))
            .pipe(filter((budget) => Boolean(budget)));
    }
    getBudgetList(params) {
        return this.store.select(getBudgetList(params));
    }
    get(budgetCode) {
        const loading$ = this.getBudgetState(budgetCode).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadBudget(budgetCode);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getBudgetValue(budgetCode));
    }
    getList(params) {
        return this.getBudgetList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadBudgets(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getCostCenters(budgetCode) {
        return this.get(budgetCode).pipe(map((budget) => {
            var _a;
            return ({
                values: (_a = budget.costCenters) !== null && _a !== void 0 ? _a : [],
            });
        }));
    }
    getErrorState(budgetCode) {
        return this.getBudgetState(budgetCode).pipe(map((state) => { var _a; return (_a = state.error) !== null && _a !== void 0 ? _a : false; }));
    }
    create(budget) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreateBudget({ userId, budget })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    update(budgetCode, budget) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdateBudget({ userId, budgetCode, budget })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getLoadingStatus(budgetCode) {
        return getItemStatus(this.getBudgetState(budgetCode));
    }
}
BudgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BudgetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    load(costCenterCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadCostCenter({ userId, costCenterCode })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadList(params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadCostCenters({ userId, params })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getCostCenter(costCenterCode) {
        return this.store.select(getCostCenter(costCenterCode));
    }
    getCostCenterValue(costCenterCode) {
        return this.store
            .select(getCostCenterValue(costCenterCode))
            .pipe(filter((costCenter) => Boolean(costCenter)));
    }
    getCostCenterList(params) {
        return this.store.select(getCostCenterList(params));
    }
    getBudgetList(costCenterCode, params) {
        return this.store.select(getAssignedBudgets(costCenterCode, params));
    }
    get(costCenterCode) {
        const loading$ = this.getCostCenter(costCenterCode).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.load(costCenterCode);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getCostCenterValue(costCenterCode));
    }
    getList(params) {
        return this.getCostCenterList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadList(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getCostCenterState(costCenterCode) {
        return this.store.select(getCostCenterState(costCenterCode));
    }
    create(costCenter) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreateCostCenter({ userId, costCenter })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    update(costCenterCode, costCenter) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdateCostCenter({
            userId,
            costCenterCode,
            costCenter,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getLoadingStatus(costCenterCode) {
        return getItemStatus(this.getCostCenter(costCenterCode));
    }
    loadBudgets(costCenterCode, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadAssignedBudgets({
            userId,
            costCenterCode,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getBudgets(costCenterCode, params) {
        return this.getBudgetList(costCenterCode, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadBudgets(costCenterCode, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    assignBudget(costCenterCode, budgetCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignBudget({
            userId,
            costCenterCode,
            budgetCode,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignBudget(costCenterCode, budgetCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignBudget({
            userId,
            costCenterCode,
            budgetCode,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getErrorState(costCenterCode) {
        return this.getCostCenterState(costCenterCode).pipe(map((state) => { var _a; return (_a = state.error) !== null && _a !== void 0 ? _a : false; }));
    }
}
CostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CostCenterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrgUnitService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    clearAssignedUsersList(orgUnitId, roleId, params) {
        this.store.dispatch(new ClearAssignedUsers({ orgUnitId, roleId, params }));
    }
    load(orgUnitId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadOrgUnit({ userId, orgUnitId })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadList() {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadOrgUnitNodes({ userId })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadTree() {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadTree({ userId })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadApprovalProcesses() {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadApprovalProcesses({ userId })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadUsers(orgUnitId, roleId, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadAssignedUsers({
            userId,
            orgUnitId,
            roleId,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadAddresses(orgUnitId) {
        // TODO: replace it after turn on loadAddresses$
        // this.store.dispatch(
        //   new OrgUnitActions.LoadAddresses({ userId, orgUnitId })
        // );
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadOrgUnit({ userId, orgUnitId })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getOrgUnit(orgUnitId) {
        return this.store.select(getOrgUnit(orgUnitId));
    }
    getOrgUnitValue(orgUnitId) {
        return this.store
            .select(getOrgUnitValue(orgUnitId))
            .pipe(filter((orgUnit) => Boolean(orgUnit)));
    }
    getTreeState() {
        return this.store.select(getOrgUnitTree());
    }
    getOrgUnitsList() {
        return this.store.select(getOrgUnitList());
    }
    getAddressesState(orgUnitId) {
        return this.store.select(getB2BAddresses(orgUnitId));
    }
    getAddressState(addressId) {
        return this.store.select(getB2BAddress(addressId));
    }
    getAssignedUsers(orgUnitId, roleId, params) {
        return this.store.select(getAssignedUsers(orgUnitId, roleId, params));
    }
    getApprovalProcessesList() {
        return this.store.select(getApprovalProcesses());
    }
    get(orgUnitId) {
        const loading$ = this.getOrgUnit(orgUnitId).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.load(orgUnitId);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getOrgUnitValue(orgUnitId));
    }
    getCostCenters(orgUnitId) {
        return this.get(orgUnitId).pipe(map((orgUnit) => {
            var _a;
            return ({
                values: (_a = orgUnit.costCenters) !== null && _a !== void 0 ? _a : [],
            });
        }));
    }
    findUnitChildrenInTree(orginitId, unit) {
        var _a, _b;
        return unit.id === orginitId
            ? (_a = unit.children) !== null && _a !== void 0 ? _a : []
            : ((_b = unit.children) !== null && _b !== void 0 ? _b : []).flatMap((child) => this.findUnitChildrenInTree(orginitId, child));
    }
    getChildUnits(orgUnitId) {
        return this.getTree().pipe(map((tree) => ({
            values: tree ? this.findUnitChildrenInTree(orgUnitId, tree) : [],
        })));
    }
    getTree() {
        return this.getTreeState().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadTree();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getApprovalProcesses() {
        return this.getApprovalProcessesList().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadApprovalProcesses();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getList() {
        return this.getOrgUnitsList().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadList();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getActiveUnitList() {
        return this.getList().pipe(map((units) => units === null || units === void 0 ? void 0 : units.filter((unit) => unit.active)), map((units) => units === null || units === void 0 ? void 0 : units.sort(this.sortUnitList)));
    }
    sortUnitList(a, b) {
        var _a, _b, _c, _d;
        return ((_a = a.id) !== null && _a !== void 0 ? _a : '').toLowerCase() < ((_b = b.id) !== null && _b !== void 0 ? _b : '').toLowerCase()
            ? -1
            : ((_c = a.id) !== null && _c !== void 0 ? _c : '').toLowerCase() > ((_d = b.id) !== null && _d !== void 0 ? _d : '').toLowerCase()
                ? 1
                : 0;
    }
    getUsers(orgUnitId, roleId, params) {
        return this.getAssignedUsers(orgUnitId, roleId, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadUsers(orgUnitId, roleId, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getErrorState(orgCustomerId) {
        return this.getOrgUnitState(orgCustomerId).pipe(map((state) => { var _a; return (_a = state.error) !== null && _a !== void 0 ? _a : false; }));
    }
    create(unit) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreateUnit({ userId, unit })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    update(unitCode, unit) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdateUnit({ userId, unitCode, unit })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getLoadingStatus(orgUnitId) {
        return getItemStatus(this.getOrgUnit(orgUnitId));
    }
    assignRole(orgCustomerId, roleId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignRole({
            userId,
            orgCustomerId,
            roleId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignRole(orgCustomerId, roleId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignRole({
            userId,
            orgCustomerId,
            roleId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    assignApprover(orgUnitId, orgCustomerId, roleId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignApprover({
            orgUnitId,
            userId,
            orgCustomerId,
            roleId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignApprover(orgUnitId, orgCustomerId, roleId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignApprover({
            orgUnitId,
            userId,
            orgCustomerId,
            roleId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    createAddress(orgUnitId, address) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreateAddress({
            userId,
            orgUnitId,
            address,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getAddresses(orgUnitId) {
        return this.getAddressesState(orgUnitId).pipe(observeOn(queueScheduler), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadAddresses(orgUnitId);
            }
        }), filter((state) => Boolean(state.success || state.error)), map((state) => state.value));
    }
    getAddress(orgUnitId, addressId) {
        return this.getAddressState(addressId).pipe(observeOn(queueScheduler), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadAddresses(orgUnitId);
            }
        }), filter((state) => Boolean(state.success || state.error)), map((state) => state.value));
    }
    updateAddress(orgUnitId, addressId, address) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdateAddress({
            userId,
            orgUnitId,
            addressId,
            address,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getAddressLoadingStatus(addressId) {
        return getItemStatus(this.getAddressState(addressId));
    }
    deleteAddress(orgUnitId, addressId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new DeleteAddress({
            userId,
            orgUnitId,
            addressId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getOrgUnitState(orgUnitId) {
        return this.store.select(getOrgUnitState(orgUnitId));
    }
}
OrgUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
OrgUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrgUnitService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    loadPermission(permissionCode) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadPermission({
            userId,
            permissionCode,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadPermissions(params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadPermissions({ userId, params })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadPermissionTypes() {
        this.userIdService.takeUserId(true).subscribe(() => this.store.dispatch(new LoadPermissionTypes()), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getPermission(permissionCode) {
        return this.store.select(getPermission(permissionCode));
    }
    getPermissionValue(permissionCode) {
        return this.store
            .select(getPermissionValue(permissionCode))
            .pipe(filter((permission) => Boolean(permission)));
    }
    getPermissionList(params) {
        return this.store.select(getPermissionList(params));
    }
    getPermissionTypeList() {
        return this.store.select(getPermissionTypes());
    }
    get(permissionCode) {
        const loading$ = this.getPermission(permissionCode).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadPermission(permissionCode);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getPermissionValue(permissionCode));
    }
    getTypes() {
        return this.getPermissionTypeList().pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadPermissionTypes();
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getList(params) {
        return this.getPermissionList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadPermissions(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    create(permission) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreatePermission({ userId, permission })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    update(permissionCode, permission) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdatePermission({
            userId,
            permissionCode,
            permission,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getLoadingStatus(permissionCode) {
        return getItemStatus(this.getPermission(permissionCode));
    }
    getPermissionState(code) {
        return this.store.select(getPermissionState(code));
    }
    getErrorState(permissionCode) {
        return this.getPermissionState(permissionCode).pipe(map((state) => { var _a; return (_a = state.error) !== null && _a !== void 0 ? _a : false; }));
    }
}
PermissionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PermissionService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    load(userGroupId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadUserGroup({
            userId,
            userGroupId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadList(params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadUserGroups({ userId, params })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getUserGroup(userGroupId) {
        return this.store.select(getUserGroup(userGroupId));
    }
    getUserGroupValue(userGroupId) {
        return this.store
            .select(getUserGroupValue(userGroupId))
            .pipe(filter((userGroup) => Boolean(userGroup)));
    }
    getUserGroupList(params) {
        return this.store.select(getUserGroupList(params));
    }
    getAvailableOrgCustomersList(userGroupId, params) {
        return this.store.select(getAvailableOrgCustomers(userGroupId, params));
    }
    getAvailableOrderApprovalPermissionsList(userGroupId, params) {
        return this.store.select(getAvailableOrderApprovalPermissions(userGroupId, params));
    }
    get(userGroupUid) {
        const loading$ = this.getUserGroup(userGroupUid).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.load(userGroupUid);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getUserGroupValue(userGroupUid));
    }
    getList(params) {
        return this.getUserGroupList(params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadList(params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    create(userGroup) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new CreateUserGroup({
            userId,
            userGroup,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    update(userGroupId, userGroup) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UpdateUserGroup({
            userId,
            userGroupId,
            userGroup,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getLoadingStatus(budgetCode) {
        return getItemStatus(this.getUserGroup(budgetCode));
    }
    delete(userGroupId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new DeleteUserGroup({
            userId,
            userGroupId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadAvailableOrgCustomers(userGroupId, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadAvailableOrgCustomers({
            userId,
            userGroupId,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    loadAvailableOrderApprovalPermissions(userGroupId, params) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new LoadPermissions$1({
            userId,
            userGroupId,
            params,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    getAvailableOrgCustomers(userGroupId, params) {
        return this.getAvailableOrgCustomersList(userGroupId, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadAvailableOrgCustomers(userGroupId, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    getAvailableOrderApprovalPermissions(userGroupId, params) {
        return this.getAvailableOrderApprovalPermissionsList(userGroupId, params).pipe(observeOn(queueScheduler), tap((process) => {
            if (!(process.loading || process.success || process.error)) {
                this.loadAvailableOrderApprovalPermissions(userGroupId, params);
            }
        }), filter((process) => Boolean(process.success || process.error)), map((result) => result.value));
    }
    assignMember(userGroupId, customerId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignMember({
            userId,
            userGroupId,
            customerId,
        })), () => {
            // TODO: for future releases, refactor this part to thrown errors
        });
    }
    unassignMember(userGroupId, customerId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignMember({
            userId,
            userGroupId,
            customerId,
        })), () => {
            // Intentional empty arrow function
        });
    }
    unassignAllMembers(userGroupId) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignAllMembers({
            userId,
            userGroupId,
        })), () => {
            // Intentional empty arrow function
        });
    }
    assignPermission(userGroupId, permissionUid) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new AssignPermission({
            userId,
            userGroupId,
            permissionUid,
        })), () => {
            // Intentional empty arrow function
        });
    }
    unassignPermission(userGroupId, permissionUid) {
        this.userIdService.takeUserId(true).subscribe((userId) => this.store.dispatch(new UnassignPermission({
            userId,
            userGroupId,
            permissionUid,
        })), () => {
            // Intentional empty arrow function
        });
    }
    getUserGroupState(code) {
        return this.store.select(getUserGroupState(code));
    }
    getErrorState(code) {
        return this.getUserGroupState(code).pipe(map((state) => { var _a; return (_a = state.error) !== null && _a !== void 0 ? _a : false; }));
    }
}
UserGroupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: UserGroupService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ADDRESS_ENTITIES, ADDRESS_LIST, AdminGuard, AdministrationCoreModule, B2BUNIT_APPROVAL_PROCESSES_NORMALIZER, B2BUNIT_NODE_LIST_NORMALIZER, B2BUNIT_NODE_NORMALIZER, B2BUNIT_NORMALIZER, B2BUNIT_SERIALIZER, b2bUser_action as B2BUserActions, B2BUserAdapter, B2BUserConnector, b2bUser_selector as B2BUserSelectors, B2BUserService, B2B_USERS_NORMALIZER, B2B_USER_APPROVERS, B2B_USER_ENTITIES, B2B_USER_FEATURE, B2B_USER_NORMALIZER, B2B_USER_PERMISSIONS, B2B_USER_SERIALIZER, B2B_USER_USER_GROUPS, BUDGETS_NORMALIZER, BUDGET_ENTITIES, BUDGET_FEATURE, BUDGET_LIST, BUDGET_NORMALIZER, BUDGET_SERIALIZER, budget_action as BudgetActions, BudgetAdapter, BudgetConnector, budget_selector as BudgetSelectors, BudgetService, COST_CENTER_ASSIGNED_BUDGETS, COST_CENTER_ENTITIES, COST_CENTER_FEATURE, COST_CENTER_LIST, costCenter_action as CostCenterActions, CostCenterAdapter, CostCenterConnector, costCenter_selector as CostCenterSelectors, CostCenterService, LoadStatus, ORGANIZATION_FEATURE, ORG_UNIT_APPROVAL_PROCESSES, ORG_UNIT_APPROVAL_PROCESSES_ENTITIES, ORG_UNIT_ASSIGNED_USERS, ORG_UNIT_ENTITIES, ORG_UNIT_FEATURE, ORG_UNIT_NODES, ORG_UNIT_NODE_ENTITIES, ORG_UNIT_NODE_LIST, ORG_UNIT_TREE, ORG_UNIT_TREE_ENTITY, orgUnit_action as OrgUnitActions, OrgUnitAdapter, OrgUnitConnector, orgUnit_selector as OrgUnitSelectors, OrgUnitService, organization_action as OrganizationActions, OrganizationBadRequestHandler, OrganizationConflictHandler, OrganizationPageMetaModule, OrganizationPageMetaResolver, PERMISSIONS_NORMALIZER, PERMISSION_ENTITIES, PERMISSION_FEATURE, PERMISSION_LIST, PERMISSION_NORMALIZER, PERMISSION_SERIALIZER, PERMISSION_TYPES, PERMISSION_TYPES_LIST, PERMISSION_TYPES_NORMALIZER, PERMISSION_TYPE_NORMALIZER, Period, permission_action as PermissionActions, PermissionAdapter, PermissionConnector, permission_selector as PermissionSelectors, PermissionService, USER_GROUPS_NORMALIZER, USER_GROUP_AVAILABLE_CUSTOMERS, USER_GROUP_ENTITIES, USER_GROUP_FEATURE, USER_GROUP_LIST, USER_GROUP_NORMALIZER, USER_GROUP_PERMISSIONS, USER_GROUP_SERIALIZER, USER_LIST, userGroup_action as UserGroupActions, UserGroupAdapter, UserGroupConnector, userGroup_selector as UserGroupSelectors, UserGroupService };
//# sourceMappingURL=spartacus-organization-administration-core.mjs.map
