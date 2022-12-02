/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, tap, } from 'rxjs/operators';
import { InternalProfileTagEventNames, } from '../model/profile-tag.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../config/index";
export class ProfileTagEventService {
    constructor(winRef, config, baseSiteService, platform) {
        this.winRef = winRef;
        this.config = config;
        this.baseSiteService = baseSiteService;
        this.platform = platform;
        this.latestConsentReference = null;
        this.profileTagDebug = false;
        this.profileTagEvents$ = merge(this.setConsentReference(), this.debugModeChanged());
        this.initWindow();
    }
    getProfileTagEvents() {
        return this.profileTagEvents$;
    }
    getConsentReference() {
        if (!this.consentReference$) {
            this.consentReference$ = fromEvent(this.winRef.nativeWindow, InternalProfileTagEventNames.CONSENT_REFERENCE_LOADED).pipe(map((event) => event), map((event) => event.detail.consentReference), shareReplay(1));
        }
        return this.consentReference$;
    }
    handleConsentWithdrawn() {
        this.consentReference$ = null;
        this.latestConsentReference = null;
    }
    addTracker() {
        return this.baseSiteService.getActive().pipe(filter(() => isPlatformBrowser(this.platform)), filter((siteId) => Boolean(siteId)), distinctUntilChanged(), tap(() => this.addScript()), tap((siteId) => this.createConfig(siteId)));
    }
    notifyProfileTagOfEventOccurence(event) {
        try {
            this.profileTagWindow.Y_TRACKING.eventLayer.push(event);
        }
        catch (e) {
            console.log(`Unexpected error when calling profiletag push method ${e}`);
        }
    }
    setConsentReference() {
        return this.getConsentReference().pipe(tap((consentReference) => (this.latestConsentReference = consentReference)));
    }
    debugModeChanged() {
        return fromEvent(this.winRef.nativeWindow, InternalProfileTagEventNames.DEBUG_FLAG_CHANGED).pipe(map((event) => event), tap((event) => (this.profileTagDebug = event.detail.debug)));
    }
    createConfig(siteId) {
        const newConfig = {
            ...this.config.cds.profileTag,
            tenant: this.config.cds.tenant,
            siteId,
            spa: true,
        };
        this.exposeConfig(newConfig);
    }
    /*
     * Checks if the script with the given source exists in the document or not.
     */
    isScriptLoaded(scriptSource) {
        return !!this.winRef.document.querySelector(`script[src="${scriptSource}"]`);
    }
    addScript() {
        if (this.isScriptLoaded(this.config.cds.profileTag.javascriptUrl)) {
            return;
        }
        const profileTagScript = this.winRef.document.createElement('script');
        profileTagScript.type = 'text/javascript';
        profileTagScript.async = true;
        profileTagScript.src = this.config.cds.profileTag.javascriptUrl;
        this.winRef.document
            .getElementsByTagName('head')[0]
            .appendChild(profileTagScript);
    }
    initWindow() {
        if (!isPlatformBrowser(this.platform)) {
            return;
        }
        this.profileTagWindow = this.winRef.nativeWindow;
        this.profileTagWindow.Y_TRACKING = this.profileTagWindow.Y_TRACKING || {};
        this.profileTagWindow.Y_TRACKING.eventLayer =
            this.profileTagWindow.Y_TRACKING.eventLayer || [];
    }
    exposeConfig(options) {
        const q = this.profileTagWindow.Y_TRACKING.q || [];
        if (q.length !== 0) {
            return;
        }
        q.push([options]);
        this.profileTagWindow.Y_TRACKING.q = q;
    }
}
ProfileTagEventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagEventService, deps: [{ token: i1.WindowRef }, { token: i2.CdsConfig }, { token: i1.BaseSiteService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagEventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagEventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProfileTagEventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.CdsConfig }, { type: i1.BaseSiteService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZXRhZy1ldmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL3Byb2ZpbGV0YWcvc2VydmljZXMvcHJvZmlsZXRhZy1ldmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsRUFDWCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBR0wsNEJBQTRCLEdBSTdCLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFLcEMsTUFBTSxPQUFPLHNCQUFzQjtJQVNqQyxZQUNVLE1BQWlCLEVBQ2pCLE1BQWlCLEVBQ2pCLGVBQWdDLEVBQ1gsUUFBYTtRQUhsQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQVo1QywyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHaEIsc0JBQWlCLEdBQUcsS0FBSyxDQUMvQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQ3hCLENBQUM7UUFPQSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQ3hCLDRCQUE0QixDQUFDLHdCQUF3QixDQUN0RCxDQUFDLElBQUksQ0FDSixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUF3QixLQUFLLENBQUMsRUFDNUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQzdDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDZixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQzFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDOUMsTUFBTSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDM0Msb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUMzQixHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFRCxnQ0FBZ0MsQ0FBQyxLQUEwQjtRQUN6RCxJQUFJO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FDcEMsR0FBRyxDQUNELENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDLENBQ3ZFLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsT0FBTyxTQUFTLENBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQ3hCLDRCQUE0QixDQUFDLGtCQUFrQixDQUNoRCxDQUFDLElBQUksQ0FDSixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFhLEtBQUssQ0FBQyxFQUNqQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzVELENBQUM7SUFDSixDQUFDO0lBRU8sWUFBWSxDQUFDLE1BQWM7UUFDakMsTUFBTSxTQUFTLEdBQXVCO1lBQ3BDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVTtZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTTtZQUM5QixNQUFNO1lBQ04sR0FBRyxFQUFFLElBQUk7U0FDVixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxjQUFjLENBQUMsWUFBb0I7UUFDekMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUN6QyxlQUFlLFlBQVksSUFBSSxDQUNoQyxDQUFDO0lBQ0osQ0FBQztJQUVPLFNBQVM7UUFDZixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2pFLE9BQU87U0FDUjtRQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLGdCQUFnQixDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUMxQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzlCLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTthQUNqQixvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0IsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUN2QixDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVU7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFTyxZQUFZLENBQUMsT0FBMkI7UUFDOUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O21IQWhJVSxzQkFBc0IsbUdBYXZCLFdBQVc7dUhBYlYsc0JBQXNCLGNBRnJCLE1BQU07MkZBRVAsc0JBQXNCO2tCQUhsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBY0ksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZVNpdGVTZXJ2aWNlLCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDZHNDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ29uc2VudFJlZmVyZW5jZUV2ZW50LFxuICBEZWJ1Z0V2ZW50LFxuICBJbnRlcm5hbFByb2ZpbGVUYWdFdmVudE5hbWVzLFxuICBQcm9maWxlVGFnSnNDb25maWcsXG4gIFByb2ZpbGVUYWdQdXNoRXZlbnQsXG4gIFByb2ZpbGVUYWdXaW5kb3dPYmplY3QsXG59IGZyb20gJy4uL21vZGVsL3Byb2ZpbGUtdGFnLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2ZpbGVUYWdFdmVudFNlcnZpY2Uge1xuICBsYXRlc3RDb25zZW50UmVmZXJlbmNlID0gbnVsbDtcbiAgcHJvZmlsZVRhZ0RlYnVnID0gZmFsc2U7XG4gIHByaXZhdGUgY29uc2VudFJlZmVyZW5jZSQ6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD47XG4gIHByaXZhdGUgcHJvZmlsZVRhZ1dpbmRvdzogUHJvZmlsZVRhZ1dpbmRvd09iamVjdDtcbiAgcHJpdmF0ZSBwcm9maWxlVGFnRXZlbnRzJCA9IG1lcmdlKFxuICAgIHRoaXMuc2V0Q29uc2VudFJlZmVyZW5jZSgpLFxuICAgIHRoaXMuZGVidWdNb2RlQ2hhbmdlZCgpXG4gICk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJpdmF0ZSBjb25maWc6IENkc0NvbmZpZyxcbiAgICBwcml2YXRlIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IGFueVxuICApIHtcbiAgICB0aGlzLmluaXRXaW5kb3coKTtcbiAgfVxuXG4gIGdldFByb2ZpbGVUYWdFdmVudHMoKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBEZWJ1Z0V2ZW50IHwgRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlVGFnRXZlbnRzJDtcbiAgfVxuXG4gIGdldENvbnNlbnRSZWZlcmVuY2UoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuY29uc2VudFJlZmVyZW5jZSQpIHtcbiAgICAgIHRoaXMuY29uc2VudFJlZmVyZW5jZSQgPSBmcm9tRXZlbnQoXG4gICAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdyxcbiAgICAgICAgSW50ZXJuYWxQcm9maWxlVGFnRXZlbnROYW1lcy5DT05TRU5UX1JFRkVSRU5DRV9MT0FERURcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChldmVudCkgPT4gPENvbnNlbnRSZWZlcmVuY2VFdmVudD5ldmVudCksXG4gICAgICAgIG1hcCgoZXZlbnQpID0+IGV2ZW50LmRldGFpbC5jb25zZW50UmVmZXJlbmNlKSxcbiAgICAgICAgc2hhcmVSZXBsYXkoMSlcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnNlbnRSZWZlcmVuY2UkO1xuICB9XG5cbiAgaGFuZGxlQ29uc2VudFdpdGhkcmF3bigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnNlbnRSZWZlcmVuY2UkID0gbnVsbDtcbiAgICB0aGlzLmxhdGVzdENvbnNlbnRSZWZlcmVuY2UgPSBudWxsO1xuICB9XG5cbiAgYWRkVHJhY2tlcigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmJhc2VTaXRlU2VydmljZS5nZXRBY3RpdmUoKS5waXBlKFxuICAgICAgZmlsdGVyKCgpID0+IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pKSxcbiAgICAgIGZpbHRlcigoc2l0ZUlkOiBzdHJpbmcpID0+IEJvb2xlYW4oc2l0ZUlkKSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgdGFwKCgpID0+IHRoaXMuYWRkU2NyaXB0KCkpLFxuICAgICAgdGFwKChzaXRlSWQ6IHN0cmluZykgPT4gdGhpcy5jcmVhdGVDb25maWcoc2l0ZUlkKSlcbiAgICApO1xuICB9XG5cbiAgbm90aWZ5UHJvZmlsZVRhZ09mRXZlbnRPY2N1cmVuY2UoZXZlbnQ6IFByb2ZpbGVUYWdQdXNoRXZlbnQpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5wcm9maWxlVGFnV2luZG93LllfVFJBQ0tJTkcuZXZlbnRMYXllci5wdXNoKGV2ZW50KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhgVW5leHBlY3RlZCBlcnJvciB3aGVuIGNhbGxpbmcgcHJvZmlsZXRhZyBwdXNoIG1ldGhvZCAke2V9YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb25zZW50UmVmZXJlbmNlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29uc2VudFJlZmVyZW5jZSgpLnBpcGUoXG4gICAgICB0YXAoXG4gICAgICAgIChjb25zZW50UmVmZXJlbmNlKSA9PiAodGhpcy5sYXRlc3RDb25zZW50UmVmZXJlbmNlID0gY29uc2VudFJlZmVyZW5jZSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWJ1Z01vZGVDaGFuZ2VkKCk6IE9ic2VydmFibGU8RGVidWdFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQoXG4gICAgICB0aGlzLndpblJlZi5uYXRpdmVXaW5kb3csXG4gICAgICBJbnRlcm5hbFByb2ZpbGVUYWdFdmVudE5hbWVzLkRFQlVHX0ZMQUdfQ0hBTkdFRFxuICAgICkucGlwZShcbiAgICAgIG1hcCgoZXZlbnQpID0+IDxEZWJ1Z0V2ZW50PmV2ZW50KSxcbiAgICAgIHRhcCgoZXZlbnQpID0+ICh0aGlzLnByb2ZpbGVUYWdEZWJ1ZyA9IGV2ZW50LmRldGFpbC5kZWJ1ZykpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29uZmlnKHNpdGVJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbmV3Q29uZmlnOiBQcm9maWxlVGFnSnNDb25maWcgPSB7XG4gICAgICAuLi50aGlzLmNvbmZpZy5jZHMucHJvZmlsZVRhZyxcbiAgICAgIHRlbmFudDogdGhpcy5jb25maWcuY2RzLnRlbmFudCxcbiAgICAgIHNpdGVJZCxcbiAgICAgIHNwYTogdHJ1ZSxcbiAgICB9O1xuICAgIHRoaXMuZXhwb3NlQ29uZmlnKG5ld0NvbmZpZyk7XG4gIH1cblxuICAvKlxuICAgKiBDaGVja3MgaWYgdGhlIHNjcmlwdCB3aXRoIHRoZSBnaXZlbiBzb3VyY2UgZXhpc3RzIGluIHRoZSBkb2N1bWVudCBvciBub3QuXG4gICAqL1xuICBwcml2YXRlIGlzU2NyaXB0TG9hZGVkKHNjcmlwdFNvdXJjZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy53aW5SZWYuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBzY3JpcHRbc3JjPVwiJHtzY3JpcHRTb3VyY2V9XCJdYFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFkZFNjcmlwdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1NjcmlwdExvYWRlZCh0aGlzLmNvbmZpZy5jZHMucHJvZmlsZVRhZy5qYXZhc2NyaXB0VXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwcm9maWxlVGFnU2NyaXB0ID0gdGhpcy53aW5SZWYuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgcHJvZmlsZVRhZ1NjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgcHJvZmlsZVRhZ1NjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgcHJvZmlsZVRhZ1NjcmlwdC5zcmMgPSB0aGlzLmNvbmZpZy5jZHMucHJvZmlsZVRhZy5qYXZhc2NyaXB0VXJsO1xuICAgIHRoaXMud2luUmVmLmRvY3VtZW50XG4gICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgLmFwcGVuZENoaWxkKHByb2ZpbGVUYWdTY3JpcHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0V2luZG93KCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcm9maWxlVGFnV2luZG93ID0gPFByb2ZpbGVUYWdXaW5kb3dPYmplY3Q+KFxuICAgICAgKDx1bmtub3duPnRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdylcbiAgICApO1xuICAgIHRoaXMucHJvZmlsZVRhZ1dpbmRvdy5ZX1RSQUNLSU5HID0gdGhpcy5wcm9maWxlVGFnV2luZG93LllfVFJBQ0tJTkcgfHwge307XG4gICAgdGhpcy5wcm9maWxlVGFnV2luZG93LllfVFJBQ0tJTkcuZXZlbnRMYXllciA9XG4gICAgICB0aGlzLnByb2ZpbGVUYWdXaW5kb3cuWV9UUkFDS0lORy5ldmVudExheWVyIHx8IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBleHBvc2VDb25maWcob3B0aW9uczogUHJvZmlsZVRhZ0pzQ29uZmlnKTogdm9pZCB7XG4gICAgY29uc3QgcSA9IHRoaXMucHJvZmlsZVRhZ1dpbmRvdy5ZX1RSQUNLSU5HLnEgfHwgW107XG4gICAgaWYgKHEubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHEucHVzaChbb3B0aW9uc10pO1xuICAgIHRoaXMucHJvZmlsZVRhZ1dpbmRvdy5ZX1RSQUNLSU5HLnEgPSBxO1xuICB9XG59XG4iXX0=