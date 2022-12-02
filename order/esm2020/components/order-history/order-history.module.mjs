/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { OrderHistoryComponent } from './order-history.component';
import * as i0 from "@angular/core";
export class OrderHistoryModule {
}
OrderHistoryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderHistoryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, declarations: [OrderHistoryComponent], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [OrderHistoryComponent] });
OrderHistoryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderHistoryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        NgSelectModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    declarations: [OrderHistoryComponent],
                    exports: [OrderHistoryComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItaGlzdG9yeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1oaXN0b3J5L29yZGVyLWhpc3RvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBeUJsRSxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBYmQscUJBQXFCLGFBUmxDLFlBQVk7UUFDWixZQUFZO1FBQ1osV0FBVztRQUNYLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsU0FBUztRQUNULFVBQVUsYUFHRixxQkFBcUI7Z0hBWXBCLGtCQUFrQixhQVhsQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYiw0QkFBNEIsRUFBRTtvQkFDNUIsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBbkJDLFlBQVk7UUFDWixZQUFZO1FBQ1osV0FBVztRQUNYLGNBQWM7UUFDZCxvQkFBb0I7UUFDcEIsU0FBUztRQUNULFVBQVU7MkZBZUQsa0JBQWtCO2tCQXZCOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLFNBQVM7d0JBQ1QsVUFBVTtxQkFDWDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDckMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2hDLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDRCQUE0QixFQUFFO29DQUM1QixTQUFTLEVBQUUscUJBQXFCO29DQUNoQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nU2VsZWN0TW9kdWxlIH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMaXN0TmF2aWdhdGlvbk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPcmRlckhpc3RvcnlDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWhpc3RvcnkuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTmdTZWxlY3RNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW09yZGVySGlzdG9yeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtPcmRlckhpc3RvcnlDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQWNjb3VudE9yZGVySGlzdG9yeUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJIaXN0b3J5Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckhpc3RvcnlNb2R1bGUge31cbiJdfQ==