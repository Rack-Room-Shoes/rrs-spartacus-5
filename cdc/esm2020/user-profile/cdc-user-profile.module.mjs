/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CDCForgotPasswordModule } from './forgot-password/cdc-forgot-password.module';
import { CDCRegisterModule } from './register/cdc-register.module';
import * as i0 from "@angular/core";
export class CDCUserProfileModule {
}
CDCUserProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CDCUserProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule, CDCForgotPasswordModule] });
CDCUserProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, imports: [CDCRegisterModule, CDCForgotPasswordModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CDCUserProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CDCRegisterModule, CDCForgotPasswordModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLXVzZXItcHJvZmlsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy91c2VyLXByb2ZpbGUvY2RjLXVzZXItcHJvZmlsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7O0FBS25FLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQUZyQixpQkFBaUIsRUFBRSx1QkFBdUI7a0hBRXpDLG9CQUFvQixZQUZyQixpQkFBaUIsRUFBRSx1QkFBdUI7MkZBRXpDLG9CQUFvQjtrQkFIaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQztpQkFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ0RDRm9yZ290UGFzc3dvcmRNb2R1bGUgfSBmcm9tICcuL2ZvcmdvdC1wYXNzd29yZC9jZGMtZm9yZ290LXBhc3N3b3JkLm1vZHVsZSc7XG5pbXBvcnQgeyBDRENSZWdpc3Rlck1vZHVsZSB9IGZyb20gJy4vcmVnaXN0ZXIvY2RjLXJlZ2lzdGVyLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDRENSZWdpc3Rlck1vZHVsZSwgQ0RDRm9yZ290UGFzc3dvcmRNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBDRENVc2VyUHJvZmlsZU1vZHVsZSB7fVxuIl19