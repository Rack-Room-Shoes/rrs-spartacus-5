/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/asm-component.service";
import * as i2 from "@spartacus/user/account/root";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class CustomerEmulationComponent {
    constructor(asmComponentService, userAccountFacade) {
        this.asmComponentService = asmComponentService;
        this.userAccountFacade = userAccountFacade;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.userAccountFacade.get().subscribe((user) => {
            if (user) {
                this.customer = user;
            }
        }));
        this.isCustomerEmulationSessionInProgress$ =
            this.asmComponentService.isCustomerEmulationSessionInProgress();
    }
    logoutCustomer() {
        this.asmComponentService.logoutCustomer();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CustomerEmulationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEmulationComponent, deps: [{ token: i1.AsmComponentService }, { token: i2.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
CustomerEmulationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: CustomerEmulationComponent, selector: "cx-customer-emulation", ngImport: i0, template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <input\n    formcontrolname=\"customer\"\n    type=\"text\"\n    disabled=\"true\"\n    placeholder=\"{{ customer?.name }}, {{ customer?.uid }}\"\n  />\n  <button (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CustomerEmulationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-emulation', template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <input\n    formcontrolname=\"customer\"\n    type=\"text\"\n    disabled=\"true\"\n    placeholder=\"{{ customer?.name }}, {{ customer?.uid }}\"\n  />\n  <button (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmComponentService }, { type: i2.UserAccountFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7QUFPaEQsTUFBTSxPQUFPLDBCQUEwQjtJQUtyQyxZQUNZLG1CQUF3QyxFQUN4QyxpQkFBb0M7UUFEcEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBSnRDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUt6QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsSUFBSSxDQUFDLHFDQUFxQztZQUN4QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0NBQW9DLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7dUhBNUJVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLDZEQ2hCdkMsc1ZBV0E7MkZES2EsMEJBQTBCO2tCQUp0QyxTQUFTOytCQUNFLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVXNlckFjY291bnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXNtQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FzbS1jb21wb25lbnQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWN1c3RvbWVyLWVtdWxhdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b21lci1lbXVsYXRpb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lckVtdWxhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3VzdG9tZXI6IFVzZXI7XG4gIGlzQ3VzdG9tZXJFbXVsYXRpb25TZXNzaW9uSW5Qcm9ncmVzcyQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFzbUNvbXBvbmVudFNlcnZpY2U6IEFzbUNvbXBvbmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51c2VyQWNjb3VudEZhY2FkZS5nZXQoKS5zdWJzY3JpYmUoKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gdXNlcjtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuaXNDdXN0b21lckVtdWxhdGlvblNlc3Npb25JblByb2dyZXNzJCA9XG4gICAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2UuaXNDdXN0b21lckVtdWxhdGlvblNlc3Npb25JblByb2dyZXNzKCk7XG4gIH1cblxuICBsb2dvdXRDdXN0b21lcigpIHtcbiAgICB0aGlzLmFzbUNvbXBvbmVudFNlcnZpY2UubG9nb3V0Q3VzdG9tZXIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJpc0N1c3RvbWVyRW11bGF0aW9uU2Vzc2lvbkluUHJvZ3Jlc3MkIHwgYXN5bmNcIj5cbiAgPGlucHV0XG4gICAgZm9ybWNvbnRyb2xuYW1lPVwiY3VzdG9tZXJcIlxuICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICBkaXNhYmxlZD1cInRydWVcIlxuICAgIHBsYWNlaG9sZGVyPVwie3sgY3VzdG9tZXI/Lm5hbWUgfX0sIHt7IGN1c3RvbWVyPy51aWQgfX1cIlxuICAvPlxuICA8YnV0dG9uIChjbGljayk9XCJsb2dvdXRDdXN0b21lcigpXCI+XG4gICAge3sgJ2FzbS5lbmRTZXNzaW9uJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYnV0dG9uPlxuPC9uZy1jb250YWluZXI+XG4iXX0=