/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/user/profile/root";
import * as i2 from "@spartacus/core";
export class RegisterComponentService {
    constructor(userRegisterFacade, globalMessageService) {
        this.userRegisterFacade = userRegisterFacade;
        this.globalMessageService = globalMessageService;
    }
    /**
     * Register a new user.
     *
     * @param user as UserSignUp
     */
    register(user) {
        return this.userRegisterFacade.register(user);
    }
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles() {
        return this.userRegisterFacade.getTitles();
    }
    /**
     * Show the message after successful registration.
     */
    postRegisterMessage() {
        this.globalMessageService.add({ key: 'register.postRegisterMessage' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
}
RegisterComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentService, deps: [{ token: i1.UserRegisterFacade }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
RegisterComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: RegisterComponentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserRegisterFacade }, { type: i2.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXItY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGlCQUFpQixHQUdsQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBS3pCLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDWSxrQkFBc0MsRUFDdEMsb0JBQTBDO1FBRDFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUNuRCxDQUFDO0lBRUo7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxJQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQjtRQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixFQUFFLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxFQUN2QyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FDeEMsQ0FBQztJQUNKLENBQUM7O3FIQTlCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBUaXRsZSxcbiAgVXNlcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXJSZWdpc3RlckZhY2FkZSwgVXNlclNpZ25VcCB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHVzZXJSZWdpc3RlckZhY2FkZTogVXNlclJlZ2lzdGVyRmFjYWRlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyB1c2VyLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlciBhcyBVc2VyU2lnblVwXG4gICAqL1xuICByZWdpc3Rlcih1c2VyOiBVc2VyU2lnblVwKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlclJlZ2lzdGVyRmFjYWRlLnJlZ2lzdGVyKHVzZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGl0bGVzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHRoZSB1c2VyIHByb2ZpbGVzLlxuICAgKi9cbiAgZ2V0VGl0bGVzKCk6IE9ic2VydmFibGU8VGl0bGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJSZWdpc3RlckZhY2FkZS5nZXRUaXRsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoZSBtZXNzYWdlIGFmdGVyIHN1Y2Nlc3NmdWwgcmVnaXN0cmF0aW9uLlxuICAgKi9cbiAgcG9zdFJlZ2lzdGVyTWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHsga2V5OiAncmVnaXN0ZXIucG9zdFJlZ2lzdGVyTWVzc2FnZScgfSxcbiAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICk7XG4gIH1cbn1cbiJdfQ==