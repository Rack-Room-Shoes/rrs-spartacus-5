/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MODULE_INITIALIZER, provideDefaultConfig } from '@spartacus/core';
import { defaultAsmConfig } from './config/default-asm-config';
import { AsmConnector } from './connectors/asm.connector';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import { AsmStoreModule } from './store/asm-store.module';
import * as i0 from "@angular/core";
export function asmStatePersistenceFactory(asmStatePersistenceService) {
    const result = () => asmStatePersistenceService.initSync();
    return result;
}
export class AsmCoreModule {
}
AsmCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, imports: [CommonModule, AsmStoreModule] });
AsmCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, providers: [
        provideDefaultConfig(defaultAsmConfig),
        AsmConnector,
        {
            provide: MODULE_INITIALIZER,
            useFactory: asmStatePersistenceFactory,
            deps: [AsmStatePersistenceService],
            multi: true,
        },
    ], imports: [CommonModule, AsmStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmStoreModule],
                    providers: [
                        provideDefaultConfig(defaultAsmConfig),
                        AsmConnector,
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: asmStatePersistenceFactory,
                            deps: [AsmStatePersistenceService],
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb3JlL2FzbS1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFMUQsTUFBTSxVQUFVLDBCQUEwQixDQUN4QywwQkFBc0Q7SUFFdEQsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWVELE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsWUFaZCxZQUFZLEVBQUUsY0FBYzsyR0FZM0IsYUFBYSxhQVhiO1FBQ1Qsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUM7UUFDdEMsWUFBWTtRQUNaO1lBQ0UsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixVQUFVLEVBQUUsMEJBQTBCO1lBQ3RDLElBQUksRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ2xDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQVZTLFlBQVksRUFBRSxjQUFjOzJGQVkzQixhQUFhO2tCQWJ6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ3ZDLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDdEMsWUFBWTt3QkFDWjs0QkFDRSxPQUFPLEVBQUUsa0JBQWtCOzRCQUMzQixVQUFVLEVBQUUsMEJBQTBCOzRCQUN0QyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzs0QkFDbEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1PRFVMRV9JTklUSUFMSVpFUiwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmYXVsdEFzbUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtYXNtLWNvbmZpZyc7XG5pbXBvcnQgeyBBc21Db25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvYXNtLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBBc21TdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXNtLXN0YXRlLXBlcnNpc3RlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXNtU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL2FzbS1zdG9yZS5tb2R1bGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNtU3RhdGVQZXJzaXN0ZW5jZUZhY3RvcnkoXG4gIGFzbVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBBc21TdGF0ZVBlcnNpc3RlbmNlU2VydmljZVxuKSB7XG4gIGNvbnN0IHJlc3VsdCA9ICgpID0+IGFzbVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLmluaXRTeW5jKCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEFzbVN0b3JlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdEFzbUNvbmZpZyksXG4gICAgQXNtQ29ubmVjdG9yLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1PRFVMRV9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IGFzbVN0YXRlUGVyc2lzdGVuY2VGYWN0b3J5LFxuICAgICAgZGVwczogW0FzbVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUNvcmVNb2R1bGUge31cbiJdfQ==