/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { first } from 'rxjs/operators';
import { VisualizationLoadStatus, VisualizationLookupResult, } from '../../visual-viewer/models/visualization-load-info';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
export class VisualPickingTabService {
    constructor(currentProductService, globalMessageService, changeDetectorRef, windowRef) {
        this.currentProductService = currentProductService;
        this.globalMessageService = globalMessageService;
        this.changeDetectorRef = changeDetectorRef;
        this.windowRef = windowRef;
        /**
         * When true, error messages will be shown when visualization load/lookup failures occur.
         */
        this.showErrorMessages = true;
    }
    /**
     * Initialize the service.
     * @param visualViewerService The VisualViewerService instance to use.
     * @param visualPickingProductListService The VisualPickingProductListService instance to use.
     */
    initialize(visualViewerService, visualPickingProductListService) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.visualViewerService = visualViewerService;
        this.visualPickingProductListService = visualPickingProductListService;
        this.visualizationLoadInfoChangeSubscription =
            this.visualViewerService.visualizationLoadInfoChange.subscribe(this.handleLoadVisualizationInfoChange.bind(this));
        this.getFilteredProductReferencesSubscription =
            this.visualPickingProductListService
                .getFilteredProductReferences()
                .subscribe((productReferences) => {
                const productCodes = productReferences.map((productReference) => productReference.target.code);
                this.visualViewerService.includedProductCodes = productCodes;
            });
        this.getProductReferencesSubscription = this.visualPickingProductListService
            .getProductReferences()
            .subscribe((productReferences) => {
            this.setProductReferences(productReferences);
            if (productReferences.length > 0) {
                this.visualPickingProductListService.currentProduct$
                    .pipe(first())
                    .subscribe((currentProduct) => {
                    this.visualViewerService
                        .loadVisualization(currentProduct.code)
                        .pipe(first())
                        .subscribe();
                });
            }
        });
    }
    ngOnDestroy() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.visualizationLoadInfoChangeSubscription?.unsubscribe();
        this.getProductReferencesSubscription?.unsubscribe();
        this.getFilteredProductReferencesSubscription?.unsubscribe();
    }
    get productReferences() {
        return this._productReferences;
    }
    setProductReferences(value) {
        this._productReferences = value;
        // hideNoProductReferencesText, hideProductList, hideViewport values may have changed
        this.changeDetectorRef.markForCheck();
    }
    get visualizationLoadStatus() {
        return (this.visualViewerService.visualizationLoadInfo?.loadStatus ??
            VisualizationLoadStatus.NotStarted);
    }
    get hideNoProductReferencesText() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length > 0);
    }
    get hideProductList() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length === 0);
    }
    get hideViewport() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length === 0 ||
            !(this.visualizationLoadStatus === VisualizationLoadStatus.Loading ||
                this.visualizationLoadStatus === VisualizationLoadStatus.Loaded));
    }
    showErrorMessage(message) {
        if (this.showErrorMessages) {
            this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    handleLoadVisualizationInfoChange(visualizationLoadInfo) {
        switch (visualizationLoadInfo.lookupResult) {
            case VisualizationLookupResult.UniqueMatchFound:
                switch (visualizationLoadInfo.loadStatus) {
                    case VisualizationLoadStatus.Loading:
                        break;
                    case VisualizationLoadStatus.UnexpectedError:
                        this.showErrorMessage({
                            key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
                        });
                        break;
                }
                break;
            case VisualizationLookupResult.NoMatchFound:
                break;
            case VisualizationLookupResult.MultipleMatchesFound:
                this.showErrorMessage({
                    key: 'epdVisualization.errors.visualLoad.multipleMatchingVisualsFound',
                });
                break;
            case VisualizationLookupResult.UnexpectedError:
                this.showErrorMessage({
                    key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
                });
                break;
        }
        this.changeDetectorRef.detectChanges();
    }
    get visualViewerService() {
        return this._visualViewerService;
    }
    set visualViewerService(value) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._visualViewerService = value;
    }
    get visualPickingProductListService() {
        return this._visualPickingProductListService;
    }
    set visualPickingProductListService(value) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._visualPickingProductListService = value;
    }
}
VisualPickingTabService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualPickingTabService, deps: [{ token: i1.CurrentProductService }, { token: i2.GlobalMessageService }, { token: i0.ChangeDetectorRef }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualPickingTabService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualPickingTabService, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: VisualPickingTabService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i2.GlobalMessageService }, { type: i0.ChangeDetectorRef }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctdGFiLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXBpY2tpbmcvdmlzdWFsLXBpY2tpbmctdGFiL3Zpc3VhbC1waWNraW5nLXRhYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXFCLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBRUwsaUJBQWlCLEdBS2xCLE1BQU0saUJBQWlCLENBQUM7QUFHekIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIseUJBQXlCLEdBQzFCLE1BQU0sb0RBQW9ELENBQUM7Ozs7QUFPNUQsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNZLHFCQUE0QyxFQUM1QyxvQkFBMEMsRUFDMUMsaUJBQW9DLEVBQ3BDLFNBQW9CO1FBSHBCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFrRWhDOztXQUVHO1FBQ08sc0JBQWlCLEdBQVksSUFBSSxDQUFDO0lBcEV6QyxDQUFDO0lBRUo7Ozs7T0FJRztJQUNJLFVBQVUsQ0FDZixtQkFBd0MsRUFDeEMsK0JBQWdFO1FBRWhFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsK0JBQStCLEdBQUcsK0JBQStCLENBQUM7UUFFdkUsSUFBSSxDQUFD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NUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO29CQUNwQixHQUFHLEVBQUUsd0RBQXdEO2lCQUM5RCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFHRCxJQUFXLG1CQUFtQjtRQUM1QixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsSUFBVyxtQkFBbUIsQ0FBQyxLQUEwQjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFHRCxJQUFXLCtCQUErQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsSUFBVywrQkFBK0IsQ0FDeEMsS0FBc0M7UUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLEtBQUssQ0FBQztJQUNoRCxDQUFDOztvSEEvTFUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsS0FBSzsyRkFFTix1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLEtBQUs7aUJBQ2xCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBQcm9kdWN0LFxuICBQcm9kdWN0UmVmZXJlbmNlLFxuICBUcmFuc2xhdGFibGUsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEN1cnJlbnRQcm9kdWN0U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgVmlzdWFsaXphdGlvbkxvYWRJbmZvLFxuICBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cyxcbiAgVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdCxcbn0gZnJvbSAnLi4vLi4vdmlzdWFsLXZpZXdlci9tb2RlbHMvdmlzdWFsaXphdGlvbi1sb2FkLWluZm8nO1xuaW1wb3J0IHsgVmlzdWFsVmlld2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3Zpc3VhbC12aWV3ZXIvdmlzdWFsLXZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UgfSBmcm9tICcuL3Byb2R1Y3QtbGlzdC92aXN1YWwtcGlja2luZy1wcm9kdWN0LWxpc3Quc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueScsXG59KVxuZXhwb3J0IGNsYXNzIFZpc3VhbFBpY2tpbmdUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRQcm9kdWN0U2VydmljZTogQ3VycmVudFByb2R1Y3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgd2luZG93UmVmOiBXaW5kb3dSZWZcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBzZXJ2aWNlLlxuICAgKiBAcGFyYW0gdmlzdWFsVmlld2VyU2VydmljZSBUaGUgVmlzdWFsVmlld2VyU2VydmljZSBpbnN0YW5jZSB0byB1c2UuXG4gICAqIEBwYXJhbSB2aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlIFRoZSBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlIGluc3RhbmNlIHRvIHVzZS5cbiAgICovXG4gIHB1YmxpYyBpbml0aWFsaXplKFxuICAgIHZpc3VhbFZpZXdlclNlcnZpY2U6IFZpc3VhbFZpZXdlclNlcnZpY2UsXG4gICAgdmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZTogVmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZVxuICApOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlID0gdmlzdWFsVmlld2VyU2VydmljZTtcbiAgICB0aGlzLnZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UgPSB2aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlO1xuXG4gICAgdGhpcy52aXN1YWxpemF0aW9uTG9hZEluZm9DaGFuZ2VTdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLnZpc3VhbGl6YXRpb25Mb2FkSW5mb0NoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIHRoaXMuaGFuZGxlTG9hZFZpc3VhbGl6YXRpb25JbmZvQ2hhbmdlLmJpbmQodGhpcylcbiAgICAgICk7XG5cbiAgICB0aGlzLmdldEZpbHRlcmVkUHJvZHVjdFJlZmVyZW5jZXNTdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy52aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlXG4gICAgICAgIC5nZXRGaWx0ZXJlZFByb2R1Y3RSZWZlcmVuY2VzKClcbiAgICAgICAgLnN1YnNjcmliZSgocHJvZHVjdFJlZmVyZW5jZXM6IFByb2R1Y3RSZWZlcmVuY2VbXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3RDb2Rlczogc3RyaW5nW10gPSBwcm9kdWN0UmVmZXJlbmNlcy5tYXAoXG4gICAgICAgICAgICAocHJvZHVjdFJlZmVyZW5jZSkgPT5cbiAgICAgICAgICAgICAgKHByb2R1Y3RSZWZlcmVuY2UudGFyZ2V0IGFzIFByb2R1Y3QpLmNvZGUgYXMgc3RyaW5nXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5pbmNsdWRlZFByb2R1Y3RDb2RlcyA9IHByb2R1Y3RDb2RlcztcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLmdldFByb2R1Y3RSZWZlcmVuY2VzU3Vic2NyaXB0aW9uID0gdGhpcy52aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlXG4gICAgICAuZ2V0UHJvZHVjdFJlZmVyZW5jZXMoKVxuICAgICAgLnN1YnNjcmliZSgocHJvZHVjdFJlZmVyZW5jZXM6IFByb2R1Y3RSZWZlcmVuY2VbXSkgPT4ge1xuICAgICAgICB0aGlzLnNldFByb2R1Y3RSZWZlcmVuY2VzKHByb2R1Y3RSZWZlcmVuY2VzKTtcbiAgICAgICAgaWYgKHByb2R1Y3RSZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UuY3VycmVudFByb2R1Y3QkXG4gICAgICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY3VycmVudFByb2R1Y3Q6IFByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmxvYWRWaXN1YWxpemF0aW9uKGN1cnJlbnRQcm9kdWN0LmNvZGUgYXMgc3RyaW5nKVxuICAgICAgICAgICAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZpc3VhbGl6YXRpb25Mb2FkSW5mb0NoYW5nZVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmdldFByb2R1Y3RSZWZlcmVuY2VzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZ2V0RmlsdGVyZWRQcm9kdWN0UmVmZXJlbmNlc1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlzdWFsaXphdGlvbkxvYWRJbmZvQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgZ2V0UHJvZHVjdFJlZmVyZW5jZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBnZXRGaWx0ZXJlZFByb2R1Y3RSZWZlcmVuY2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgZXJyb3IgbWVzc2FnZXMgd2lsbCBiZSBzaG93biB3aGVuIHZpc3VhbGl6YXRpb24gbG9hZC9sb29rdXAgZmFpbHVyZXMgb2NjdXIuXG4gICAqL1xuICBwcm90ZWN0ZWQgc2hvd0Vycm9yTWVzc2FnZXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHByaXZhdGUgX3Byb2R1Y3RSZWZlcmVuY2VzOiBQcm9kdWN0UmVmZXJlbmNlW107XG4gIHByaXZhdGUgZ2V0IHByb2R1Y3RSZWZlcmVuY2VzKCk6IFByb2R1Y3RSZWZlcmVuY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2R1Y3RSZWZlcmVuY2VzO1xuICB9XG4gIHByaXZhdGUgc2V0UHJvZHVjdFJlZmVyZW5jZXModmFsdWU6IFByb2R1Y3RSZWZlcmVuY2VbXSkge1xuICAgIHRoaXMuX3Byb2R1Y3RSZWZlcmVuY2VzID0gdmFsdWU7XG5cbiAgICAvLyBoaWRlTm9Qcm9kdWN0UmVmZXJlbmNlc1RleHQsIGhpZGVQcm9kdWN0TGlzdCwgaGlkZVZpZXdwb3J0IHZhbHVlcyBtYXkgaGF2ZSBjaGFuZ2VkXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzKCk6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLnZpc3VhbGl6YXRpb25Mb2FkSW5mbz8ubG9hZFN0YXR1cyA/P1xuICAgICAgVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTm90U3RhcnRlZFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhpZGVOb1Byb2R1Y3RSZWZlcmVuY2VzVGV4dCgpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvZHVjdFJlZmVyZW5jZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgKHRoaXMucHJvZHVjdFJlZmVyZW5jZXMgYXMgUHJvZHVjdFJlZmVyZW5jZVtdKS5sZW5ndGggPiAwXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlkZVByb2R1Y3RMaXN0KCkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5wcm9kdWN0UmVmZXJlbmNlcyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAodGhpcy5wcm9kdWN0UmVmZXJlbmNlcyBhcyBQcm9kdWN0UmVmZXJlbmNlW10pLmxlbmd0aCA9PT0gMFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhpZGVWaWV3cG9ydCgpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvZHVjdFJlZmVyZW5jZXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgKHRoaXMucHJvZHVjdFJlZmVyZW5jZXMgYXMgUHJvZHVjdFJlZmVyZW5jZVtdKS5sZW5ndGggPT09IDAgfHxcbiAgICAgICEoXG4gICAgICAgIHRoaXMudmlzdWFsaXphdGlvbkxvYWRTdGF0dXMgPT09IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLkxvYWRpbmcgfHxcbiAgICAgICAgdGhpcy52aXN1YWxpemF0aW9uTG9hZFN0YXR1cyA9PT0gVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTG9hZGVkXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd0Vycm9yTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcgfCBUcmFuc2xhdGFibGUpIHtcbiAgICBpZiAodGhpcy5zaG93RXJyb3JNZXNzYWdlcykge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQobWVzc2FnZSwgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlTG9hZFZpc3VhbGl6YXRpb25JbmZvQ2hhbmdlKFxuICAgIHZpc3VhbGl6YXRpb25Mb2FkSW5mbzogVmlzdWFsaXphdGlvbkxvYWRJbmZvXG4gICk6IHZvaWQge1xuICAgIHN3aXRjaCAodmlzdWFsaXphdGlvbkxvYWRJbmZvLmxvb2t1cFJlc3VsdCkge1xuICAgICAgY2FzZSBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0LlVuaXF1ZU1hdGNoRm91bmQ6XG4gICAgICAgIHN3aXRjaCAodmlzdWFsaXphdGlvbkxvYWRJbmZvLmxvYWRTdGF0dXMpIHtcbiAgICAgICAgICBjYXNlIFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLkxvYWRpbmc6XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuVW5leHBlY3RlZEVycm9yOlxuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JNZXNzYWdlKHtcbiAgICAgICAgICAgICAga2V5OiAnZXBkVmlzdWFsaXphdGlvbi5lcnJvcnMudmlzdWFsTG9hZC51bmV4cGVjdGVkTG9hZEVycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdC5Ob01hdGNoRm91bmQ6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuTXVsdGlwbGVNYXRjaGVzRm91bmQ6XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yTWVzc2FnZSh7XG4gICAgICAgICAga2V5OiAnZXBkVmlzdWFsaXphdGlvbi5lcnJvcnMudmlzdWFsTG9hZC5tdWx0aXBsZU1hdGNoaW5nVmlzdWFsc0ZvdW5kJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuVW5leHBlY3RlZEVycm9yOlxuICAgICAgICB0aGlzLnNob3dFcnJvck1lc3NhZ2Uoe1xuICAgICAgICAgIGtleTogJ2VwZFZpc3VhbGl6YXRpb24uZXJyb3JzLnZpc3VhbExvYWQudW5leHBlY3RlZExvYWRFcnJvcicsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIF92aXN1YWxWaWV3ZXJTZXJ2aWNlOiBWaXN1YWxWaWV3ZXJTZXJ2aWNlO1xuICBwdWJsaWMgZ2V0IHZpc3VhbFZpZXdlclNlcnZpY2UoKTogVmlzdWFsVmlld2VyU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc3VhbFZpZXdlclNlcnZpY2U7XG4gIH1cbiAgcHVibGljIHNldCB2aXN1YWxWaWV3ZXJTZXJ2aWNlKHZhbHVlOiBWaXN1YWxWaWV3ZXJTZXJ2aWNlKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92aXN1YWxWaWV3ZXJTZXJ2aWNlID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlOiBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlO1xuICBwdWJsaWMgZ2V0IHZpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2UoKTogVmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc3VhbFBpY2tpbmdQcm9kdWN0TGlzdFNlcnZpY2U7XG4gIH1cbiAgcHVibGljIHNldCB2aXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlKFxuICAgIHZhbHVlOiBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RTZXJ2aWNlXG4gICkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0U2VydmljZSA9IHZhbHVlO1xuICB9XG59XG4iXX0=