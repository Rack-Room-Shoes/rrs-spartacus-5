import { Injectable } from '@angular/core';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
export class AsmEnablerService {
    constructor(location, winRef, launchDialogService, featureModules) {
        this.location = location;
        this.winRef = winRef;
        this.launchDialogService = launchDialogService;
        this.featureModules = featureModules;
    }
    /**
     * Loads the ASM UI if needed. The ASM UI will be added based on the
     * existence of a URL parameter or previous usage given by local storage.
     */
    load() {
        if (this.isEnabled()) {
            this.addUi();
        }
    }
    /**
     * Indicates whether the ASM module is enabled.
     */
    isEnabled() {
        if (this.isLaunched() && !this.isUsedBefore()) {
            if (this.winRef.localStorage) {
                this.winRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');
            }
        }
        return this.isLaunched() || this.isUsedBefore();
    }
    /**
     * Indicates whether ASM is launched through the URL,
     * using the asm flag in the URL.
     */
    isLaunched() {
        const params = this.location.path().split('?')[1];
        return !!params && params.split('&').includes('asm=true');
    }
    /**
     * Evaluates local storage where we persist the usage of ASM.
     */
    isUsedBefore() {
        if (this.winRef.localStorage) {
            return (this.winRef.localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY) ===
                'true');
        }
        else {
            return false;
        }
    }
    /**
     * Adds the ASM UI by using the `cx-storefront` outlet.
     */
    addUi() {
        this.featureModules
            .resolveFeature('asm')
            .subscribe(() => this.launchDialogService.launch("ASM" /* LAUNCH_CALLER.ASM */));
    }
}
AsmEnablerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmEnablerService, deps: [{ token: i1.Location }, { token: i2.WindowRef }, { token: i3.LaunchDialogService }, { token: i2.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmEnablerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmEnablerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: AsmEnablerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Location }, { type: i2.WindowRef }, { type: i3.LaunchDialogService }, { type: i2.FeatureModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWVuYWJsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vcm9vdC9zZXJ2aWNlcy9hc20tZW5hYmxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBRWpFOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQ1ksUUFBa0IsRUFDbEIsTUFBaUIsRUFDakIsbUJBQXdDLEVBQ3hDLGNBQXFDO1FBSHJDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtJQUM5QyxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDTyxVQUFVO1FBQ2xCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxZQUFZO1FBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDNUIsT0FBTyxDQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQztnQkFDL0QsTUFBTSxDQUNQLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNPLEtBQUs7UUFDYixJQUFJLENBQUMsY0FBYzthQUNoQixjQUFjLENBQUMsS0FBSyxDQUFDO2FBQ3JCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSwrQkFBbUIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7OzhHQTVEVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGZWF0dXJlTW9kdWxlc1NlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFTTV9FTkFCTEVEX0xPQ0FMX1NUT1JBR0VfS0VZIH0gZnJvbSAnLi4vYXNtLWNvbnN0YW50cyc7XG5cbi8qKlxuICogVGhlIEFzbUVuYWJsZXJTZXJ2aWNlIGlzIHVzZWQgdG8gZW5hYmxlIEFTTSBmb3IgdGhvc2Ugc2NlbmFyaW8nc1xuICogd2hlcmUgaXQncyBhY3R1YWxseSB1c2VkLiBUaGlzIHNlcnZpY2UgaXMgYWRkZWQgdG8gYXZvaWQgYW55IHBvbHV0aW9uXG4gKiBvZiB0aGUgVUkgYW5kIHJ1bnRpbWUgcGVyZm9ybWFuY2UgZm9yIHRoZSBvcmRpbmFyeSBwcm9kdWN0aW9uIHVzZXIuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21FbmFibGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmZWF0dXJlTW9kdWxlczogRmVhdHVyZU1vZHVsZXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogTG9hZHMgdGhlIEFTTSBVSSBpZiBuZWVkZWQuIFRoZSBBU00gVUkgd2lsbCBiZSBhZGRlZCBiYXNlZCBvbiB0aGVcbiAgICogZXhpc3RlbmNlIG9mIGEgVVJMIHBhcmFtZXRlciBvciBwcmV2aW91cyB1c2FnZSBnaXZlbiBieSBsb2NhbCBzdG9yYWdlLlxuICAgKi9cbiAgbG9hZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgdGhpcy5hZGRVaSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgQVNNIG1vZHVsZSBpcyBlbmFibGVkLlxuICAgKi9cbiAgaXNFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzTGF1bmNoZWQoKSAmJiAhdGhpcy5pc1VzZWRCZWZvcmUoKSkge1xuICAgICAgaWYgKHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU01fRU5BQkxFRF9MT0NBTF9TVE9SQUdFX0tFWSwgJ3RydWUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNMYXVuY2hlZCgpIHx8IHRoaXMuaXNVc2VkQmVmb3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgQVNNIGlzIGxhdW5jaGVkIHRocm91Z2ggdGhlIFVSTCxcbiAgICogdXNpbmcgdGhlIGFzbSBmbGFnIGluIHRoZSBVUkwuXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNMYXVuY2hlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnPycpWzFdO1xuICAgIHJldHVybiAhIXBhcmFtcyAmJiBwYXJhbXMuc3BsaXQoJyYnKS5pbmNsdWRlcygnYXNtPXRydWUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgbG9jYWwgc3RvcmFnZSB3aGVyZSB3ZSBwZXJzaXN0IHRoZSB1c2FnZSBvZiBBU00uXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNVc2VkQmVmb3JlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZS5nZXRJdGVtKEFTTV9FTkFCTEVEX0xPQ0FMX1NUT1JBR0VfS0VZKSA9PT1cbiAgICAgICAgJ3RydWUnXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIEFTTSBVSSBieSB1c2luZyB0aGUgYGN4LXN0b3JlZnJvbnRgIG91dGxldC5cbiAgICovXG4gIHByb3RlY3RlZCBhZGRVaSgpOiB2b2lkIHtcbiAgICB0aGlzLmZlYXR1cmVNb2R1bGVzXG4gICAgICAucmVzb2x2ZUZlYXR1cmUoJ2FzbScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5sYXVuY2goTEFVTkNIX0NBTExFUi5BU00pKTtcbiAgfVxufVxuIl19