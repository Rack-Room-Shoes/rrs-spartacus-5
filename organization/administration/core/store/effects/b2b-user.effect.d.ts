import { Actions } from '@ngrx/effects';
import { AuthActions, B2BUser, RouterState, RoutingService, UserIdService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { B2BUserConnector } from '../../connectors/b2b-user/b2b-user.connector';
import { B2BUserActions, OrganizationActions, OrgUnitActions, PermissionActions, UserGroupActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class B2BUserEffects {
    private actions$;
    private b2bUserConnector;
    private routingService;
    private userAccountFacade;
    private userIdService;
    loadB2BUser$: Observable<B2BUserActions.LoadB2BUserSuccess | B2BUserActions.LoadB2BUserFail>;
    createB2BUser$: Observable<B2BUserActions.CreateB2BUserSuccess | B2BUserActions.CreateB2BUserFail | OrgUnitActions.AssignApprover | OrganizationActions.OrganizationClearData>;
    updateB2BUser$: Observable<B2BUserActions.UpdateB2BUserSuccess | B2BUserActions.UpdateB2BUserFail | OrgUnitActions.AssignApprover | OrganizationActions.OrganizationClearData>;
    checkSelfEmailUpdate$: Observable<AuthActions.Logout | B2BUserActions.LoadB2BUser | OrganizationActions.OrganizationClearData>;
    loadB2BUsers$: Observable<B2BUserActions.LoadB2BUsersSuccess | B2BUserActions.LoadB2BUserSuccess | B2BUserActions.LoadB2BUsersFail>;
    loadB2BUserApprovers$: Observable<B2BUserActions.LoadB2BUserApproversSuccess | B2BUserActions.LoadB2BUserApproversFail | B2BUserActions.LoadB2BUserSuccess>;
    loadB2BUserPermissions$: Observable<B2BUserActions.LoadB2BUserPermissionsSuccess | B2BUserActions.LoadB2BUserPermissionsFail | PermissionActions.LoadPermissionSuccess>;
    loadB2BUserUserGroups$: Observable<B2BUserActions.LoadB2BUserUserGroupsSuccess | B2BUserActions.LoadB2BUserUserGroupsFail | UserGroupActions.LoadUserGroupSuccess>;
    assignApproverToB2BUser$: Observable<B2BUserActions.AssignB2BUserApproverSuccess | B2BUserActions.AssignB2BUserApproverFail | OrganizationActions.OrganizationClearData>;
    unassignApproverFromB2BUser$: Observable<B2BUserActions.UnassignB2BUserApproverSuccess | B2BUserActions.UnassignB2BUserApproverFail | OrganizationActions.OrganizationClearData>;
    assignPermissionToB2BUser$: Observable<B2BUserActions.AssignB2BUserPermissionSuccess | B2BUserActions.AssignB2BUserPermissionFail | OrganizationActions.OrganizationClearData>;
    unassignPermissionFromB2BUser$: Observable<B2BUserActions.UnassignB2BUserPermissionSuccess | B2BUserActions.UnassignB2BUserPermissionFail | OrganizationActions.OrganizationClearData>;
    assignUserGroupToB2BUser$: Observable<B2BUserActions.AssignB2BUserUserGroupSuccess | B2BUserActions.AssignB2BUserUserGroupFail | OrganizationActions.OrganizationClearData>;
    unassignUserGroupFromB2BUser$: Observable<B2BUserActions.UnassignB2BUserUserGroupSuccess | B2BUserActions.UnassignB2BUserUserGroupFail | OrganizationActions.OrganizationClearData>;
    constructor(actions$: Actions, b2bUserConnector: B2BUserConnector, routingService: RoutingService, userAccountFacade: UserAccountFacade, userIdService: UserIdService);
    protected redirectToDetails(route: RouterState, data: B2BUser): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<B2BUserEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<B2BUserEffects>;
}