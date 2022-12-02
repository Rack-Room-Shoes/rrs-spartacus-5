/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../config/tms-config";
/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
export class TmsService {
    constructor(eventsService, windowRef, tmsConfig, injector) {
        this.eventsService = eventsService;
        this.windowRef = windowRef;
        this.tmsConfig = tmsConfig;
        this.injector = injector;
        /**
         * Stores subscriptions to events.
         */
        this.subscription = new Subscription();
    }
    /**
     * Called only once to start collecting and dispatching events
     */
    collect() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        for (const tmsCollectorConfig in this.tmsConfig.tagManager) {
            if (!this.tmsConfig.tagManager?.hasOwnProperty(tmsCollectorConfig)) {
                continue;
            }
            const collectorConfig = this.tmsConfig.tagManager[tmsCollectorConfig] ?? {};
            if (!collectorConfig.collector) {
                if (isDevMode()) {
                    console.warn(`Skipping the '${tmsCollectorConfig}', as the collector is not defined.`);
                }
                continue;
            }
            const events = collectorConfig.events?.map((event) => this.eventsService.get(event)) ||
                [];
            const collector = this.injector.get(collectorConfig.collector);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            collector.init(collectorConfig, this.windowRef.nativeWindow);
            this.subscription.add(this.mapEvents(events).subscribe((event) => {
                if (collectorConfig.debug) {
                    console.log(`🎤 Pushing the following event to ${tmsCollectorConfig}: `, event);
                }
                event = collector.map ? collector.map(event) : event;
                collector.pushEvent(collectorConfig, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.windowRef.nativeWindow, event);
            }));
        }
    }
    /**
     * Maps the given events to an appropriate type that fits the specified TMS' structure.
     *
     * @param events - the events to map
     * @param collector - a name of the collector for which the events should be mapped
     */
    mapEvents(events) {
        return merge(...events);
    }
    /**
     * Angular's callback
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
TmsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TmsService, deps: [{ token: i1.EventService }, { token: i1.WindowRef }, { token: i2.TmsConfig }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
TmsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TmsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TmsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.WindowRef }, { type: i2.TmsConfig }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdHJhY2tpbmcvdG1zL2NvcmUvc2VydmljZXMvdG1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQVksU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBRSxLQUFLLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBSXZEOztHQUVHO0FBRUgsTUFBTSxPQUFPLFVBQVU7SUFNckIsWUFDWSxhQUEyQixFQUMzQixTQUFvQixFQUNwQixTQUFvQixFQUNwQixRQUFrQjtRQUhsQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVQ5Qjs7V0FFRztRQUNPLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU96QyxDQUFDO0lBRUo7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBRUQsS0FBSyxNQUFNLGtCQUFrQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDbEUsU0FBUzthQUNWO1lBRUQsTUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO2dCQUM5QixJQUFJLFNBQVMsRUFBRSxFQUFFO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsaUJBQWlCLGtCQUFrQixxQ0FBcUMsQ0FDekUsQ0FBQztpQkFDSDtnQkFDRCxTQUFTO2FBQ1Y7WUFFRCxNQUFNLE1BQU0sR0FDVixlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JFLEVBQUUsQ0FBQztZQUNMLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNqQyxlQUFlLENBQUMsU0FBUyxDQUMxQixDQUFDO1lBQ0Ysb0VBQW9FO1lBQ3BFLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRTtvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxxQ0FBcUMsa0JBQWtCLElBQUksRUFDM0QsS0FBSyxDQUNOLENBQUM7aUJBQ0g7Z0JBRUQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDckQsU0FBUyxDQUFDLFNBQVMsQ0FDakIsZUFBZTtnQkFDZixvRUFBb0U7Z0JBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxFQUM1QixLQUFLLENBQ04sQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLFNBQVMsQ0FDakIsTUFBdUI7UUFFdkIsT0FBTyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt1R0FyRlUsVUFBVTsyR0FBVixVQUFVLGNBREcsTUFBTTsyRkFDbkIsVUFBVTtrQkFEdEIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgaXNEZXZNb2RlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN4RXZlbnQsIEV2ZW50U2VydmljZSwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRtc0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy90bXMtY29uZmlnJztcbmltcG9ydCB7IFRtc0NvbGxlY3RvciB9IGZyb20gJy4uL21vZGVsL3Rtcy5tb2RlbCc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGludGVyYWN0cyB3aXRoIHRoZSBjb25maWd1cmVkIGRhdGEgbGF5ZXIgb2JqZWN0IGJ5IHB1c2hpbmcgdGhlIFNwYXJ0YWN1cyBldmVudHMgdG8gaXQuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVG1zU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdG9yZXMgc3Vic2NyaXB0aW9ucyB0byBldmVudHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBldmVudHNTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpbmRvd1JlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCB0bXNDb25maWc6IFRtc0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogQ2FsbGVkIG9ubHkgb25jZSB0byBzdGFydCBjb2xsZWN0aW5nIGFuZCBkaXNwYXRjaGluZyBldmVudHNcbiAgICovXG4gIGNvbGxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdG1zQ29sbGVjdG9yQ29uZmlnIGluIHRoaXMudG1zQ29uZmlnLnRhZ01hbmFnZXIpIHtcbiAgICAgIGlmICghdGhpcy50bXNDb25maWcudGFnTWFuYWdlcj8uaGFzT3duUHJvcGVydHkodG1zQ29sbGVjdG9yQ29uZmlnKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sbGVjdG9yQ29uZmlnID1cbiAgICAgICAgdGhpcy50bXNDb25maWcudGFnTWFuYWdlclt0bXNDb2xsZWN0b3JDb25maWddID8/IHt9O1xuXG4gICAgICBpZiAoIWNvbGxlY3RvckNvbmZpZy5jb2xsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFNraXBwaW5nIHRoZSAnJHt0bXNDb2xsZWN0b3JDb25maWd9JywgYXMgdGhlIGNvbGxlY3RvciBpcyBub3QgZGVmaW5lZC5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXZlbnRzID1cbiAgICAgICAgY29sbGVjdG9yQ29uZmlnLmV2ZW50cz8ubWFwKChldmVudCkgPT4gdGhpcy5ldmVudHNTZXJ2aWNlLmdldChldmVudCkpIHx8XG4gICAgICAgIFtdO1xuICAgICAgY29uc3QgY29sbGVjdG9yID0gdGhpcy5pbmplY3Rvci5nZXQ8VG1zQ29sbGVjdG9yPihcbiAgICAgICAgY29sbGVjdG9yQ29uZmlnLmNvbGxlY3RvclxuICAgICAgKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb2xsZWN0b3IuaW5pdChjb2xsZWN0b3JDb25maWcsIHRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdyEpO1xuXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKGV2ZW50cykuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjb2xsZWN0b3JDb25maWcuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBg8J+OpCBQdXNoaW5nIHRoZSBmb2xsb3dpbmcgZXZlbnQgdG8gJHt0bXNDb2xsZWN0b3JDb25maWd9OiBgLFxuICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBldmVudCA9IGNvbGxlY3Rvci5tYXAgPyBjb2xsZWN0b3IubWFwKGV2ZW50KSA6IGV2ZW50O1xuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoRXZlbnQoXG4gICAgICAgICAgICBjb2xsZWN0b3JDb25maWcsXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93ISxcbiAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcHMgdGhlIGdpdmVuIGV2ZW50cyB0byBhbiBhcHByb3ByaWF0ZSB0eXBlIHRoYXQgZml0cyB0aGUgc3BlY2lmaWVkIFRNUycgc3RydWN0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRzIC0gdGhlIGV2ZW50cyB0byBtYXBcbiAgICogQHBhcmFtIGNvbGxlY3RvciAtIGEgbmFtZSBvZiB0aGUgY29sbGVjdG9yIGZvciB3aGljaCB0aGUgZXZlbnRzIHNob3VsZCBiZSBtYXBwZWRcbiAgICovXG4gIHByb3RlY3RlZCBtYXBFdmVudHM8VCBleHRlbmRzIEN4RXZlbnQ+KFxuICAgIGV2ZW50czogT2JzZXJ2YWJsZTxUPltdXG4gICk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBtZXJnZSguLi5ldmVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIncyBjYWxsYmFja1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19