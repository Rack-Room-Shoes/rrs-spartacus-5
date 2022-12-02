/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./config/i18n-config";
export class TranslationChunkService {
    constructor(config) {
        this.config = config;
        this.duplicates = {};
        this.chunks = {};
        this.KEY_SEPARATOR = '.';
        const chunks = (config.i18n && config.i18n.chunks) || {};
        Object.keys(chunks).forEach((chunk) => {
            chunks[chunk].forEach((key) => {
                if (this.chunks.hasOwnProperty(key)) {
                    if (!this.duplicates[key]) {
                        this.duplicates[key] = [this.chunks[key]];
                    }
                    this.duplicates[key].push(chunk);
                }
                else {
                    this.chunks[key] = chunk;
                }
            });
        });
        if (Object.keys(this.duplicates).length > 0 && isDevMode()) {
            this.warnDuplicates(this.duplicates);
        }
    }
    getChunkNameForKey(key) {
        const mainKey = (key || '').split(this.KEY_SEPARATOR)[0];
        const chunk = this.chunks && this.chunks[mainKey];
        if (!chunk) {
            return mainKey; // fallback to main key as a chunk
        }
        return chunk;
    }
    warnDuplicates(items) {
        const dupes = [];
        Object.keys(items).forEach((key) => {
            dupes.push(`* '${key}' found in chunks: ${items[key].join(', ')}. Used '${this.chunks[key]}.${key}'.`);
        });
        console.warn(`Duplicated keys has been found in the config of i18n chunks:\n${dupes.join('\n')}`);
    }
}
TranslationChunkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TranslationChunkService, deps: [{ token: i1.I18nConfig }], target: i0.ɵɵFactoryTarget.Injectable });
TranslationChunkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TranslationChunkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: TranslationChunkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.I18nConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tY2h1bmsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2kxOG4vdHJhbnNsYXRpb24tY2h1bmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU10RCxNQUFNLE9BQU8sdUJBQXVCO0lBR2xDLFlBQXNCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFGOUIsZUFBVSxHQUFnQyxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUE4QixFQUFFLENBQUM7UUFvQjlCLGtCQUFhLEdBQUcsR0FBRyxDQUFDO1FBbEJyQyxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUMzQztvQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFJRCxrQkFBa0IsQ0FBQyxHQUFXO1FBQzVCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLE9BQU8sQ0FBQyxDQUFDLGtDQUFrQztTQUNuRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLGNBQWMsQ0FBQyxLQUFrQztRQUN2RCxNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUNSLE1BQU0sR0FBRyxzQkFBc0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ2pCLElBQUksR0FBRyxJQUFJLENBQ1osQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FDVixpRUFBaUUsS0FBSyxDQUFDLElBQUksQ0FDekUsSUFBSSxDQUNMLEVBQUUsQ0FDSixDQUFDO0lBQ0osQ0FBQzs7b0hBaERVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2kxOG4tY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0aW9uQ2h1bmtTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGR1cGxpY2F0ZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9O1xuICBwcm90ZWN0ZWQgY2h1bmtzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb25maWc6IEkxOG5Db25maWcpIHtcbiAgICBjb25zdCBjaHVua3MgPSAoY29uZmlnLmkxOG4gJiYgY29uZmlnLmkxOG4uY2h1bmtzKSB8fCB7fTtcbiAgICBPYmplY3Qua2V5cyhjaHVua3MpLmZvckVhY2goKGNodW5rKSA9PiB7XG4gICAgICBjaHVua3NbY2h1bmtdLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jaHVua3MuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmICghdGhpcy5kdXBsaWNhdGVzW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlc1trZXldID0gW3RoaXMuY2h1bmtzW2tleV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmR1cGxpY2F0ZXNba2V5XS5wdXNoKGNodW5rKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNodW5rc1trZXldID0gY2h1bms7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmR1cGxpY2F0ZXMpLmxlbmd0aCA+IDAgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgIHRoaXMud2FybkR1cGxpY2F0ZXModGhpcy5kdXBsaWNhdGVzKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgS0VZX1NFUEFSQVRPUiA9ICcuJztcblxuICBnZXRDaHVua05hbWVGb3JLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG1haW5LZXkgPSAoa2V5IHx8ICcnKS5zcGxpdCh0aGlzLktFWV9TRVBBUkFUT1IpWzBdO1xuICAgIGNvbnN0IGNodW5rID0gdGhpcy5jaHVua3MgJiYgdGhpcy5jaHVua3NbbWFpbktleV07XG5cbiAgICBpZiAoIWNodW5rKSB7XG4gICAgICByZXR1cm4gbWFpbktleTsgLy8gZmFsbGJhY2sgdG8gbWFpbiBrZXkgYXMgYSBjaHVua1xuICAgIH1cbiAgICByZXR1cm4gY2h1bms7XG4gIH1cblxuICBwcml2YXRlIHdhcm5EdXBsaWNhdGVzKGl0ZW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0pOiB2b2lkIHtcbiAgICBjb25zdCBkdXBlczogc3RyaW5nW10gPSBbXTtcbiAgICBPYmplY3Qua2V5cyhpdGVtcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBkdXBlcy5wdXNoKFxuICAgICAgICBgKiAnJHtrZXl9JyBmb3VuZCBpbiBjaHVua3M6ICR7aXRlbXNba2V5XS5qb2luKCcsICcpfS4gVXNlZCAnJHtcbiAgICAgICAgICB0aGlzLmNodW5rc1trZXldXG4gICAgICAgIH0uJHtrZXl9Jy5gXG4gICAgICApO1xuICAgIH0pO1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGBEdXBsaWNhdGVkIGtleXMgaGFzIGJlZW4gZm91bmQgaW4gdGhlIGNvbmZpZyBvZiBpMThuIGNodW5rczpcXG4ke2R1cGVzLmpvaW4oXG4gICAgICAgICdcXG4nXG4gICAgICApfWBcbiAgICApO1xuICB9XG59XG4iXX0=