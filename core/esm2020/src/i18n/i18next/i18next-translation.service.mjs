/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { I18NEXT_INSTANCE } from './i18next-instance';
import * as i0 from "@angular/core";
import * as i1 from "../config/i18n-config";
import * as i2 from "../translation-chunk.service";
export class I18nextTranslationService {
    constructor(config, translationChunk, 
    // Required param added in 3.0.x as a critical bug fix, not subject to the breaking changes policy
    i18next) {
        this.config = config;
        this.translationChunk = translationChunk;
        this.i18next = i18next;
        this.NON_BREAKING_SPACE = String.fromCharCode(160);
        this.NAMESPACE_SEPARATOR = ':';
    }
    translate(key, options = {}, whitespaceUntilLoaded = false) {
        // If we've already loaded the chunk (or failed to load), we should immediately emit the value
        // (or the fallback value in case the key is missing).
        // Moreover, we SHOULD emit a value (or a fallback value) synchronously (not in a promise/setTimeout).
        // Otherwise, we the will trigger additional deferred change detection in a view that consumes the returned observable,
        // which together with `switchMap` operator may lead to an infinite loop.
        const chunkName = this.translationChunk.getChunkNameForKey(key);
        const namespacedKey = this.getNamespacedKey(key, chunkName);
        return new Observable((subscriber) => {
            const translate = () => {
                if (!this.i18next.isInitialized) {
                    return;
                }
                if (this.i18next.exists(namespacedKey, options)) {
                    subscriber.next(this.i18next.t(namespacedKey, options));
                }
                else {
                    if (whitespaceUntilLoaded) {
                        subscriber.next(this.NON_BREAKING_SPACE);
                    }
                    this.i18next.loadNamespaces(chunkName, () => {
                        if (!this.i18next.exists(namespacedKey, options)) {
                            this.reportMissingKey(key, chunkName);
                            subscriber.next(this.getFallbackValue(namespacedKey));
                        }
                        else {
                            subscriber.next(this.i18next.t(namespacedKey, options));
                        }
                    });
                }
            };
            translate();
            this.i18next.on('languageChanged', translate);
            return () => this.i18next.off('languageChanged', translate);
        });
    }
    loadChunks(chunkNames) {
        return this.i18next.loadNamespaces(chunkNames);
    }
    /**
     * Returns a fallback value in case when the given key is missing
     * @param key
     */
    getFallbackValue(key) {
        return isDevMode() ? `[${key}]` : this.NON_BREAKING_SPACE;
    }
    reportMissingKey(key, chunkName) {
        if (isDevMode()) {
            console.warn(`Translation key missing '${key}' in the chunk '${chunkName}'`);
        }
    }
    getNamespacedKey(key, chunk) {
        return chunk + this.NAMESPACE_SEPARATOR + key;
    }
}
I18nextTranslationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: I18nextTranslationService, deps: [{ token: i1.I18nConfig }, { token: i2.TranslationChunkService }, { token: I18NEXT_INSTANCE }], target: i0.ɵɵFactoryTarget.Injectable });
I18nextTranslationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: I18nextTranslationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: I18nextTranslationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.I18nConfig }, { type: i2.TranslationChunkService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [I18NEXT_INSTANCE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC10cmFuc2xhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaTE4bi9pMThuZXh0L2kxOG5leHQtdHJhbnNsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJbEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFHdEQsTUFBTSxPQUFPLHlCQUF5QjtJQUlwQyxZQUNZLE1BQWtCLEVBQ2xCLGdCQUF5QztJQUNuRCxrR0FBa0c7SUFDOUQsT0FBYTtRQUh2QyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBeUI7UUFFZixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBUGxDLHVCQUFrQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsd0JBQW1CLEdBQUcsR0FBRyxDQUFDO0lBTzFDLENBQUM7SUFFSixTQUFTLENBQ1AsR0FBVyxFQUNYLFVBQWUsRUFBRSxFQUNqQix3QkFBaUMsS0FBSztRQUV0Qyw4RkFBOEY7UUFDOUYsc0RBQXNEO1FBRXRELHNHQUFzRztRQUN0Ryx1SEFBdUg7UUFDdkgseUVBQXlFO1FBRXpFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTVELE9BQU8sSUFBSSxVQUFVLENBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMzQyxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtvQkFDL0IsT0FBTztpQkFDUjtnQkFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBRTtvQkFDL0MsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDekQ7cUJBQU07b0JBQ0wsSUFBSSxxQkFBcUIsRUFBRTt3QkFDekIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztxQkFDMUM7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBRTs0QkFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDdEMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt5QkFDdkQ7NkJBQU07NEJBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzt5QkFDekQ7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUM7WUFFRixTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQTZCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7T0FHRztJQUNPLGdCQUFnQixDQUFDLEdBQVc7UUFDcEMsT0FBTyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQzVELENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxHQUFXLEVBQUUsU0FBaUI7UUFDckQsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsNEJBQTRCLEdBQUcsbUJBQW1CLFNBQVMsR0FBRyxDQUMvRCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDakQsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztJQUNoRCxDQUFDOztzSEE1RVUseUJBQXlCLG1GQVExQixnQkFBZ0I7MEhBUmYseUJBQXlCLGNBRFosTUFBTTsyRkFDbkIseUJBQXlCO2tCQURyQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBUzdCLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGkxOG4gfSBmcm9tICdpMThuZXh0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEkxOG5Db25maWcgfSBmcm9tICcuLi9jb25maWcvaTE4bi1jb25maWcnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25DaHVua1NlcnZpY2UgfSBmcm9tICcuLi90cmFuc2xhdGlvbi1jaHVuay5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4uL3RyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgSTE4TkVYVF9JTlNUQU5DRSB9IGZyb20gJy4vaTE4bmV4dC1pbnN0YW5jZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgSTE4bmV4dFRyYW5zbGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgTk9OX0JSRUFLSU5HX1NQQUNFID0gU3RyaW5nLmZyb21DaGFyQ29kZSgxNjApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgTkFNRVNQQUNFX1NFUEFSQVRPUiA9ICc6JztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBJMThuQ29uZmlnLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGlvbkNodW5rOiBUcmFuc2xhdGlvbkNodW5rU2VydmljZSxcbiAgICAvLyBSZXF1aXJlZCBwYXJhbSBhZGRlZCBpbiAzLjAueCBhcyBhIGNyaXRpY2FsIGJ1ZyBmaXgsIG5vdCBzdWJqZWN0IHRvIHRoZSBicmVha2luZyBjaGFuZ2VzIHBvbGljeVxuICAgIEBJbmplY3QoSTE4TkVYVF9JTlNUQU5DRSkgcHJvdGVjdGVkIGkxOG5leHQ6IGkxOG5cbiAgKSB7fVxuXG4gIHRyYW5zbGF0ZShcbiAgICBrZXk6IHN0cmluZyxcbiAgICBvcHRpb25zOiBhbnkgPSB7fSxcbiAgICB3aGl0ZXNwYWNlVW50aWxMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgbG9hZGVkIHRoZSBjaHVuayAob3IgZmFpbGVkIHRvIGxvYWQpLCB3ZSBzaG91bGQgaW1tZWRpYXRlbHkgZW1pdCB0aGUgdmFsdWVcbiAgICAvLyAob3IgdGhlIGZhbGxiYWNrIHZhbHVlIGluIGNhc2UgdGhlIGtleSBpcyBtaXNzaW5nKS5cblxuICAgIC8vIE1vcmVvdmVyLCB3ZSBTSE9VTEQgZW1pdCBhIHZhbHVlIChvciBhIGZhbGxiYWNrIHZhbHVlKSBzeW5jaHJvbm91c2x5IChub3QgaW4gYSBwcm9taXNlL3NldFRpbWVvdXQpLlxuICAgIC8vIE90aGVyd2lzZSwgd2UgdGhlIHdpbGwgdHJpZ2dlciBhZGRpdGlvbmFsIGRlZmVycmVkIGNoYW5nZSBkZXRlY3Rpb24gaW4gYSB2aWV3IHRoYXQgY29uc3VtZXMgdGhlIHJldHVybmVkIG9ic2VydmFibGUsXG4gICAgLy8gd2hpY2ggdG9nZXRoZXIgd2l0aCBgc3dpdGNoTWFwYCBvcGVyYXRvciBtYXkgbGVhZCB0byBhbiBpbmZpbml0ZSBsb29wLlxuXG4gICAgY29uc3QgY2h1bmtOYW1lID0gdGhpcy50cmFuc2xhdGlvbkNodW5rLmdldENodW5rTmFtZUZvcktleShrZXkpO1xuICAgIGNvbnN0IG5hbWVzcGFjZWRLZXkgPSB0aGlzLmdldE5hbWVzcGFjZWRLZXkoa2V5LCBjaHVua05hbWUpO1xuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHN0cmluZz4oKHN1YnNjcmliZXIpID0+IHtcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmkxOG5leHQuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pMThuZXh0LmV4aXN0cyhuYW1lc3BhY2VkS2V5LCBvcHRpb25zKSkge1xuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLmkxOG5leHQudChuYW1lc3BhY2VkS2V5LCBvcHRpb25zKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHdoaXRlc3BhY2VVbnRpbExvYWRlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuTk9OX0JSRUFLSU5HX1NQQUNFKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pMThuZXh0LmxvYWROYW1lc3BhY2VzKGNodW5rTmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmkxOG5leHQuZXhpc3RzKG5hbWVzcGFjZWRLZXksIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVwb3J0TWlzc2luZ0tleShrZXksIGNodW5rTmFtZSk7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLmdldEZhbGxiYWNrVmFsdWUobmFtZXNwYWNlZEtleSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuaTE4bmV4dC50KG5hbWVzcGFjZWRLZXksIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICB0aGlzLmkxOG5leHQub24oJ2xhbmd1YWdlQ2hhbmdlZCcsIHRyYW5zbGF0ZSk7XG4gICAgICByZXR1cm4gKCkgPT4gdGhpcy5pMThuZXh0Lm9mZignbGFuZ3VhZ2VDaGFuZ2VkJywgdHJhbnNsYXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRDaHVua3MoY2h1bmtOYW1lczogc3RyaW5nIHwgc3RyaW5nW10pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmkxOG5leHQubG9hZE5hbWVzcGFjZXMoY2h1bmtOYW1lcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGZhbGxiYWNrIHZhbHVlIGluIGNhc2Ugd2hlbiB0aGUgZ2l2ZW4ga2V5IGlzIG1pc3NpbmdcbiAgICogQHBhcmFtIGtleVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEZhbGxiYWNrVmFsdWUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBpc0Rldk1vZGUoKSA/IGBbJHtrZXl9XWAgOiB0aGlzLk5PTl9CUkVBS0lOR19TUEFDRTtcbiAgfVxuXG4gIHByaXZhdGUgcmVwb3J0TWlzc2luZ0tleShrZXk6IHN0cmluZywgY2h1bmtOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFRyYW5zbGF0aW9uIGtleSBtaXNzaW5nICcke2tleX0nIGluIHRoZSBjaHVuayAnJHtjaHVua05hbWV9J2BcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXROYW1lc3BhY2VkS2V5KGtleTogc3RyaW5nLCBjaHVuazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY2h1bmsgKyB0aGlzLk5BTUVTUEFDRV9TRVBBUkFUT1IgKyBrZXk7XG4gIH1cbn1cbiJdfQ==