/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Subscription, zip } from 'rxjs';
import { concatMap, finalize, mergeMap, retry, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class Command {
}
export var CommandStrategy;
(function (CommandStrategy) {
    CommandStrategy[CommandStrategy["Parallel"] = 0] = "Parallel";
    CommandStrategy[CommandStrategy["Queue"] = 1] = "Queue";
    CommandStrategy[CommandStrategy["CancelPrevious"] = 2] = "CancelPrevious";
    CommandStrategy[CommandStrategy["ErrorPrevious"] = 3] = "ErrorPrevious";
    // SkipIfOngoing,
    // ErrorIfOngoing
})(CommandStrategy || (CommandStrategy = {}));
export class CommandService {
    constructor() {
        this.subscriptions = new Subscription();
        // Intentional empty constructor
    }
    create(commandFactory, options) {
        const commands$ = new Subject();
        const results$ = new Subject();
        let process$;
        switch (options?.strategy) {
            case CommandStrategy.CancelPrevious:
            case CommandStrategy.ErrorPrevious:
                process$ = zip(commands$, results$).pipe(switchMap(([cmd, notifier$]) => commandFactory(cmd).pipe(tap(notifier$), finalize(() => options.strategy === CommandStrategy.CancelPrevious
                    ? notifier$.complete()
                    : notifier$.error(new Error('Canceled by next command'))))), retry());
                break;
            case CommandStrategy.Parallel:
                process$ = zip(commands$, results$).pipe(mergeMap(([cmd, notifier$]) => commandFactory(cmd).pipe(tap(notifier$))), retry());
                break;
            case CommandStrategy.Queue:
            default:
                process$ = zip(commands$, results$).pipe(concatMap(([cmd, notifier$]) => commandFactory(cmd).pipe(tap(notifier$))), retry());
                break;
        }
        this.subscriptions.add(process$.subscribe());
        const command = new (class extends Command {
            constructor() {
                super(...arguments);
                this.execute = (parameters) => {
                    const result$ = new ReplaySubject();
                    results$.next(result$);
                    commands$.next(parameters);
                    return result$;
                };
            }
        })();
        return command;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CommandService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CommandService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CommandService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CommandService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CommandService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXRpbC9jb21tYW5kLXF1ZXJ5L2NvbW1hbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQWMsYUFBYSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdFLE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixLQUFLLEVBQ0wsU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOztBQUV4QixNQUFNLE9BQWdCLE9BQU87Q0FFNUI7QUFFRCxNQUFNLENBQU4sSUFBWSxlQU9YO0FBUEQsV0FBWSxlQUFlO0lBQ3pCLDZEQUFRLENBQUE7SUFDUix1REFBSyxDQUFBO0lBQ0wseUVBQWMsQ0FBQTtJQUNkLHVFQUFhLENBQUE7SUFDYixpQkFBaUI7SUFDakIsaUJBQWlCO0FBQ25CLENBQUMsRUFQVyxlQUFlLEtBQWYsZUFBZSxRQU8xQjtBQUtELE1BQU0sT0FBTyxjQUFjO0lBR3pCO1FBRlUsa0JBQWEsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUd6RCxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FDSixjQUFvRCxFQUNwRCxPQUF3QztRQUV4QyxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxFQUF5QixDQUFDO1FBRXRELElBQUksUUFBeUIsQ0FBQztRQUU5QixRQUFRLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDekIsS0FBSyxlQUFlLENBQUMsY0FBYyxDQUFDO1lBQ3BDLEtBQUssZUFBZSxDQUFDLGFBQWE7Z0JBQ2hDLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDdEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUM3QixjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUN0QixHQUFHLENBQUMsU0FBUyxDQUFDLEVBQ2QsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUNaLE9BQU8sQ0FBQyxRQUFRLEtBQUssZUFBZSxDQUFDLGNBQWM7b0JBQ2pELENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO29CQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQzNELENBQ0YsQ0FDRixFQUNELEtBQUssRUFBRSxDQUNSLENBQUM7Z0JBQ0YsTUFBTTtZQUVSLEtBQUssZUFBZSxDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDdEMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUM1QixjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUN6QyxFQUNELEtBQUssRUFBRSxDQUNSLENBQUM7Z0JBQ0YsTUFBTTtZQUVSLEtBQUssZUFBZSxDQUFDLEtBQUssQ0FBQztZQUMzQjtnQkFDRSxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ3RDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FDN0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FDekMsRUFDRCxLQUFLLEVBQUUsQ0FDUixDQUFDO2dCQUNGLE1BQU07U0FDVDtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sT0FBTyxHQUE0QixJQUFJLENBQUMsS0FBTSxTQUFRLE9BQU87WUFBckI7O2dCQUM1QyxZQUFPLEdBQUcsQ0FBQyxVQUE4QixFQUFFLEVBQUU7b0JBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxFQUFVLENBQUM7b0JBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzNCLE9BQU8sT0FBTyxDQUFDO2dCQUNqQixDQUFDLENBQUM7WUFDSixDQUFDO1NBQUEsQ0FBQyxFQUFFLENBQUM7UUFFTCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7MkdBdEVVLGNBQWM7K0dBQWQsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgemlwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjb25jYXRNYXAsXG4gIGZpbmFsaXplLFxuICBtZXJnZU1hcCxcbiAgcmV0cnksXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21tYW5kPFBBUkFNUyA9IHVuZGVmaW5lZCwgUkVTVUxUID0gdW5rbm93bj4ge1xuICBhYnN0cmFjdCBleGVjdXRlKHBhcmFtZXRlcnM6IFBBUkFNUyk6IE9ic2VydmFibGU8UkVTVUxUPjtcbn1cblxuZXhwb3J0IGVudW0gQ29tbWFuZFN0cmF0ZWd5IHtcbiAgUGFyYWxsZWwsXG4gIFF1ZXVlLFxuICBDYW5jZWxQcmV2aW91cyxcbiAgRXJyb3JQcmV2aW91cyxcbiAgLy8gU2tpcElmT25nb2luZyxcbiAgLy8gRXJyb3JJZk9uZ29pbmdcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbW1hbmRTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgY3JlYXRlPFBBUkFNUyA9IHVuZGVmaW5lZCwgUkVTVUxUID0gdW5rbm93bj4oXG4gICAgY29tbWFuZEZhY3Rvcnk6IChjb21tYW5kOiBQQVJBTVMpID0+IE9ic2VydmFibGU8YW55PixcbiAgICBvcHRpb25zPzogeyBzdHJhdGVneT86IENvbW1hbmRTdHJhdGVneSB9XG4gICk6IENvbW1hbmQ8UEFSQU1TLCBSRVNVTFQ+IHtcbiAgICBjb25zdCBjb21tYW5kcyQgPSBuZXcgU3ViamVjdDxQQVJBTVM+KCk7XG4gICAgY29uc3QgcmVzdWx0cyQgPSBuZXcgU3ViamVjdDxSZXBsYXlTdWJqZWN0PFJFU1VMVD4+KCk7XG5cbiAgICBsZXQgcHJvY2VzcyQ6IE9ic2VydmFibGU8YW55PjtcblxuICAgIHN3aXRjaCAob3B0aW9ucz8uc3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzOlxuICAgICAgY2FzZSBDb21tYW5kU3RyYXRlZ3kuRXJyb3JQcmV2aW91czpcbiAgICAgICAgcHJvY2VzcyQgPSB6aXAoY29tbWFuZHMkLCByZXN1bHRzJCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFtjbWQsIG5vdGlmaWVyJF0pID0+XG4gICAgICAgICAgICBjb21tYW5kRmFjdG9yeShjbWQpLnBpcGUoXG4gICAgICAgICAgICAgIHRhcChub3RpZmllciQpLFxuICAgICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PlxuICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RyYXRlZ3kgPT09IENvbW1hbmRTdHJhdGVneS5DYW5jZWxQcmV2aW91c1xuICAgICAgICAgICAgICAgICAgPyBub3RpZmllciQuY29tcGxldGUoKVxuICAgICAgICAgICAgICAgICAgOiBub3RpZmllciQuZXJyb3IobmV3IEVycm9yKCdDYW5jZWxlZCBieSBuZXh0IGNvbW1hbmQnKSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICksXG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBDb21tYW5kU3RyYXRlZ3kuUGFyYWxsZWw6XG4gICAgICAgIHByb2Nlc3MkID0gemlwKGNvbW1hbmRzJCwgcmVzdWx0cyQpLnBpcGUoXG4gICAgICAgICAgbWVyZ2VNYXAoKFtjbWQsIG5vdGlmaWVyJF0pID0+XG4gICAgICAgICAgICBjb21tYW5kRmFjdG9yeShjbWQpLnBpcGUodGFwKG5vdGlmaWVyJCkpXG4gICAgICAgICAgKSxcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIENvbW1hbmRTdHJhdGVneS5RdWV1ZTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHByb2Nlc3MkID0gemlwKGNvbW1hbmRzJCwgcmVzdWx0cyQpLnBpcGUoXG4gICAgICAgICAgY29uY2F0TWFwKChbY21kLCBub3RpZmllciRdKSA9PlxuICAgICAgICAgICAgY29tbWFuZEZhY3RvcnkoY21kKS5waXBlKHRhcChub3RpZmllciQpKVxuICAgICAgICAgICksXG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHByb2Nlc3MkLnN1YnNjcmliZSgpKTtcblxuICAgIGNvbnN0IGNvbW1hbmQ6IENvbW1hbmQ8UEFSQU1TLCBSRVNVTFQ+ID0gbmV3IChjbGFzcyBleHRlbmRzIENvbW1hbmQge1xuICAgICAgZXhlY3V0ZSA9IChwYXJhbWV0ZXJzOiBQQVJBTVMgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PFJFU1VMVD4oKTtcbiAgICAgICAgcmVzdWx0cyQubmV4dChyZXN1bHQkKTtcbiAgICAgICAgY29tbWFuZHMkLm5leHQocGFyYW1ldGVycyk7XG4gICAgICAgIHJldHVybiByZXN1bHQkO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIGNvbW1hbmQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19