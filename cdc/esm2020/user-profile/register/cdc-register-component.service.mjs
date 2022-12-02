/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CdcLoadUserTokenFailEvent } from '@spartacus/cdc/root';
import { GlobalMessageType, } from '@spartacus/core';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { merge, throwError } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@ngrx/store";
import * as i4 from "@spartacus/cdc/root";
export class CDCRegisterComponentService extends RegisterComponentService {
    constructor(userRegisterFacade, command, store, cdcJSService, globalMessageService, authService, eventService) {
        super(userRegisterFacade, globalMessageService);
        this.userRegisterFacade = userRegisterFacade;
        this.command = command;
        this.store = store;
        this.cdcJSService = cdcJSService;
        this.globalMessageService = globalMessageService;
        this.authService = authService;
        this.eventService = eventService;
        this.registerCommand = this.command.create(({ user }) => 
        // Registering user through CDC Gigya SDK
        this.cdcJSService.registerUserWithoutScreenSet(user));
        this.loadUserTokenFailed$ = this.eventService
            .get(CdcLoadUserTokenFailEvent)
            .pipe(map((event) => !!event), tap((failed) => {
            if (failed) {
                throw new Error(`User token failed to load.`);
            }
        }));
        this.isLoggedIn$ = this.authService
            .isUserLoggedIn()
            .pipe(filter((loggedIn) => loggedIn));
    }
    /**
     * Register a new user using CDC SDK.
     *
     * @param user as UserSignUp
     */
    register(user) {
        if (!user.firstName || !user.lastName || !user.uid || !user.password) {
            return throwError(`The provided user is not valid: ${user}`);
        }
        return this.cdcJSService.didLoad().pipe(tap((cdcLoaded) => {
            if (!cdcLoaded) {
                this.globalMessageService.add({
                    key: 'errorHandlers.scriptFailedToLoad',
                }, GlobalMessageType.MSG_TYPE_ERROR);
                throw new Error(`CDC script didn't load.`);
            }
        }), switchMap(() => 
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })), switchMap((user) => merge(this.loadUserTokenFailed$, this.isLoggedIn$).pipe(map(() => user))));
    }
    // @override
    postRegisterMessage() {
        // don't show the message
    }
}
CDCRegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.CommandService }, { token: i3.Store }, { token: i4.CdcJsService }, { token: i2.GlobalMessageService }, { token: i2.AuthService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CDCRegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCRegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.CommandService }, { type: i3.Store }, { type: i4.CdcJsService }, { type: i2.GlobalMessageService }, { type: i2.AuthService }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXJlZ2lzdGVyLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvdXNlci1wcm9maWxlL3JlZ2lzdGVyL2NkYy1yZWdpc3Rlci1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWdCLHlCQUF5QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUUsT0FBTyxFQU1MLGlCQUFpQixHQUNsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxLQUFLLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBRzdELE1BQU0sT0FBTywyQkFBNEIsU0FBUSx3QkFBd0I7SUFzQnZFLFlBQ1ksa0JBQXNDLEVBQ3RDLE9BQXVCLEVBQ3ZCLEtBQVksRUFDWixZQUEwQixFQUMxQixvQkFBMEMsRUFDMUMsV0FBd0IsRUFDeEIsWUFBMEI7UUFFcEMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFSdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQTVCNUIsb0JBQWUsR0FDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDL0IseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLENBQ3JELENBQUM7UUFFTSx5QkFBb0IsR0FBd0IsSUFBSSxDQUFDLFlBQVk7YUFDcEUsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQzlCLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDdkIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDYixJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDL0M7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRU0sZ0JBQVcsR0FBd0IsSUFBSSxDQUFDLFdBQVc7YUFDMUQsY0FBYyxFQUFFO2FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFZeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsSUFBZ0I7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDcEUsT0FBTyxVQUFVLENBQUMsbUNBQW1DLElBQUksRUFBRSxDQUFDLENBQUM7U0FDOUQ7UUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCO29CQUNFLEdBQUcsRUFBRSxrQ0FBa0M7aUJBQ3hDLEVBQ0QsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO2dCQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYiw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUN2QyxFQUNELFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDekUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELFlBQVk7SUFDWixtQkFBbUI7UUFDakIseUJBQXlCO0lBQzNCLENBQUM7O3dIQXJFVSwyQkFBMkI7NEhBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQUR2QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBDZGNKc1NlcnZpY2UsIENkY0xvYWRVc2VyVG9rZW5GYWlsRXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL2NkYy9yb290JztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9jb21wb25lbnRzJztcbmltcG9ydCB7IFVzZXJSZWdpc3RlckZhY2FkZSwgVXNlclNpZ25VcCB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENEQ1JlZ2lzdGVyQ29tcG9uZW50U2VydmljZSBleHRlbmRzIFJlZ2lzdGVyQ29tcG9uZW50U2VydmljZSB7XG4gIHByb3RlY3RlZCByZWdpc3RlckNvbW1hbmQ6IENvbW1hbmQ8eyB1c2VyOiBVc2VyU2lnblVwIH0sIFVzZXI+ID1cbiAgICB0aGlzLmNvbW1hbmQuY3JlYXRlKCh7IHVzZXIgfSkgPT5cbiAgICAgIC8vIFJlZ2lzdGVyaW5nIHVzZXIgdGhyb3VnaCBDREMgR2lneWEgU0RLXG4gICAgICB0aGlzLmNkY0pTU2VydmljZS5yZWdpc3RlclVzZXJXaXRob3V0U2NyZWVuU2V0KHVzZXIpXG4gICAgKTtcblxuICBwcm90ZWN0ZWQgbG9hZFVzZXJUb2tlbkZhaWxlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLmV2ZW50U2VydmljZVxuICAgIC5nZXQoQ2RjTG9hZFVzZXJUb2tlbkZhaWxFdmVudClcbiAgICAucGlwZShcbiAgICAgIG1hcCgoZXZlbnQpID0+ICEhZXZlbnQpLFxuICAgICAgdGFwKChmYWlsZWQpID0+IHtcbiAgICAgICAgaWYgKGZhaWxlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVXNlciB0b2tlbiBmYWlsZWQgdG8gbG9hZC5gKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gIHByb3RlY3RlZCBpc0xvZ2dlZEluJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuYXV0aFNlcnZpY2VcbiAgICAuaXNVc2VyTG9nZ2VkSW4oKVxuICAgIC5waXBlKGZpbHRlcigobG9nZ2VkSW4pID0+IGxvZ2dlZEluKSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJSZWdpc3RlckZhY2FkZTogVXNlclJlZ2lzdGVyRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjb21tYW5kOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlLFxuICAgIHByb3RlY3RlZCBjZGNKU1NlcnZpY2U6IENkY0pzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHVzZXJSZWdpc3RlckZhY2FkZSwgZ2xvYmFsTWVzc2FnZVNlcnZpY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IHVzZXIgdXNpbmcgQ0RDIFNESy5cbiAgICpcbiAgICogQHBhcmFtIHVzZXIgYXMgVXNlclNpZ25VcFxuICAgKi9cbiAgcmVnaXN0ZXIodXNlcjogVXNlclNpZ25VcCk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIGlmICghdXNlci5maXJzdE5hbWUgfHwgIXVzZXIubGFzdE5hbWUgfHwgIXVzZXIudWlkIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihgVGhlIHByb3ZpZGVkIHVzZXIgaXMgbm90IHZhbGlkOiAke3VzZXJ9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2RjSlNTZXJ2aWNlLmRpZExvYWQoKS5waXBlKFxuICAgICAgdGFwKChjZGNMb2FkZWQpID0+IHtcbiAgICAgICAgaWYgKCFjZGNMb2FkZWQpIHtcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiAnZXJyb3JIYW5kbGVycy5zY3JpcHRGYWlsZWRUb0xvYWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENEQyBzY3JpcHQgZGlkbid0IGxvYWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgIC8vIExvZ2dpbmcgaW4gdXNpbmcgQ0RDIEdpZ3lhIFNESywgdXBkYXRlIHRoZSByZWdpc3RlckNvbW1hbmRcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQuZXhlY3V0ZSh7IHVzZXIgfSlcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKHVzZXIpID0+XG4gICAgICAgIG1lcmdlKHRoaXMubG9hZFVzZXJUb2tlbkZhaWxlZCQsIHRoaXMuaXNMb2dnZWRJbiQpLnBpcGUobWFwKCgpID0+IHVzZXIpKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBAb3ZlcnJpZGVcbiAgcG9zdFJlZ2lzdGVyTWVzc2FnZSgpOiB2b2lkIHtcbiAgICAvLyBkb24ndCBzaG93IHRoZSBtZXNzYWdlXG4gIH1cbn1cbiJdfQ==