/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, EventEmitter, } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { BREAKPOINT, ICON_TYPE, } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, fromEvent, merge, of, Subscription, } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, switchMapTo, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
import * as i3 from "../product-image-zoom-thumbnails/product-image-zoom-thumbnails.component";
export class ProductImageZoomViewComponent {
    constructor(currentProductService, renderer, cdRef, breakpointService) {
        this.currentProductService = currentProductService;
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.breakpointService = breakpointService;
        this.iconType = ICON_TYPE;
        this.mainMediaContainer = new BehaviorSubject(null);
        this.defaultImageReady = new BehaviorSubject(false);
        this.zoomReady = new BehaviorSubject(false);
        this.subscription = new Subscription();
        this.mainMediaContainer$ = this.mainMediaContainer.asObservable();
        this.defaultImageReady$ = this.defaultImageReady.asObservable();
        this.zoomReady$ = this.zoomReady.asObservable();
        this.activeThumb = new EventEmitter();
        this.defaultImageClickHandler$ = this.defaultImageReady$.pipe(filter(Boolean), switchMap((_) => merge(...this.clickOrDoubleClick(this.defaultImage)).pipe(tap(() => this.zoom()))));
        this.zoomImageClickHandler$ = this.zoomReady$.pipe(filter(Boolean), switchMap((_) => merge(...this.clickOrDoubleClick(this.zoomImage)).pipe(tap(() => this.zoom()))));
        this.startCoords = null;
        this.left = 0;
        this.top = 0;
        this.isZoomed = false;
        this.product$ = this.currentProductService
            .getProduct()
            .pipe(filter(isNotNullable), distinctUntilChanged(), tap((p) => {
            if (this.galleryIndex) {
                const image = Array.isArray(p.images?.GALLERY)
                    ? p.images?.GALLERY.find((img) => img.zoom?.galleryIndex === this.galleryIndex)
                    : p.images?.GALLERY;
                this.mainMediaContainer.next(image || null);
            }
            else {
                this.mainMediaContainer.next(p.images?.PRIMARY ? p.images.PRIMARY : {});
            }
        }), shareReplay(1));
        this.thumbnails$ = this.product$.pipe(map((p) => this.createThumbs(p)), shareReplay(1));
        this.mainImage$ = combineLatest([
            this.product$,
            this.mainMediaContainer$,
        ]).pipe(map(([, container]) => container));
    }
    get defaultImage() {
        return this._defaultImage;
    }
    set defaultImage(el) {
        if (el) {
            this._defaultImage = el;
            this.defaultImageReady.next(true);
        }
    }
    get zoomImage() {
        return this._zoomImage;
    }
    set zoomImage(el) {
        if (el) {
            this._zoomImage = el;
            this.zoomReady.next(true);
        }
    }
    ngOnInit() {
        this.subscription.add(this.defaultImageClickHandler$.subscribe());
        this.subscription.add(this.zoomImageClickHandler$.subscribe());
    }
    openImage(item) {
        this.mainMediaContainer.next(item);
        this.activeThumb.emit(item);
    }
    /** find the index of the main media in the list of media */
    getActive() {
        if (Array.isArray(this.mainMediaContainer.value)) {
            return this.mainMediaContainer.value[0].thumbnail?.galleryIndex || 0;
        }
        return this.mainMediaContainer?.value?.thumbnail?.galleryIndex || 0;
    }
    getPreviousProduct(thumbs) {
        const active = this.getActive();
        if (active === 0) {
            return thumbs[active];
        }
        return thumbs[active - 1];
    }
    getNextProduct(thumbs) {
        const active = this.getActive();
        if (active === thumbs.length - 1) {
            return thumbs[active];
        }
        return thumbs[active + 1];
    }
    /**
     * Zoom in or out of the image
     */
    zoom() {
        this.isZoomed = !this.isZoomed;
        this.startCoords = null;
        this.left = 0;
        this.top = 0;
        this.cdRef.markForCheck();
    }
    /**
     * Touch screen image pan
     *
     * @param event
     */
    touchMove(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        const boundingRect = this.zoomedImage?.nativeElement?.getBoundingClientRect();
        const imageElement = this.zoomedImage?.nativeElement?.firstChild;
        if (!this.startCoords) {
            this.startCoords = { x: touch.clientX, y: touch.clientY };
        }
        this.left += touch.clientX - this.startCoords.x;
        this.top += touch.clientY - this.startCoords.y;
        this.moveImage(this.left, this.top, boundingRect, imageElement);
        this.startCoords = { x: touch.clientX, y: touch.clientY };
    }
    /**
     * Clears touch location
     */
    clearTouch() {
        this.startCoords = null;
    }
    /**
     * Pointer image pan
     *
     * @param event
     */
    pointerMove(event) {
        const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();
        const imageElement = this.zoomedImage.nativeElement.firstChild;
        const { positionX, positionY } = this.calculatePointerMovePosition(this.zoomedImage, event.clientX, event.clientY);
        this.moveImage(positionX, positionY, boundingRect, imageElement);
    }
    changeImage(event) {
        this.mainMediaContainer.next(event.image);
    }
    /**
     * Applies the offset from touchMove or pointerMove to the image element
     *
     * @param positionX
     * @param positionY
     * @param boundingRect
     * @param imageElement
     */
    moveImage(positionX, positionY, boundingRect, imageElement) {
        const { x, y } = this.handleOutOfBounds(positionX, positionY, imageElement, boundingRect);
        if (imageElement) {
            this.renderer.setStyle(imageElement, 'left', x + 'px');
            this.renderer.setStyle(imageElement, 'top', y + 'px');
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Returns click and dblclick event mapping for the given element
     *
     * @param element
     */
    clickOrDoubleClick(element) {
        return [
            fromEvent(element.nativeElement, 'click').pipe(switchMapTo(this.breakpointService.isUp(BREAKPOINT.md)), filter(Boolean)),
            fromEvent(element.nativeElement, 'dblclick').pipe(switchMapTo(this.breakpointService.isDown(BREAKPOINT.lg)), filter(Boolean)),
        ];
    }
    /**
     * Return an array of CarouselItems for the product thumbnails.
     * In case there are less then 2 thumbs, we return null.
     */
    createThumbs(product) {
        if (!product.images ||
            !product.images.GALLERY ||
            product.images.GALLERY.length < 2) {
            return [];
        }
        const images = product.images.GALLERY;
        return images.map((c) => of({ container: c }));
    }
    /**
     * Keeps the zoom image from leaving the bounding container
     *
     * @param positionX
     * @param positionY
     * @param imageElement
     * @param boundingRect
     */
    handleOutOfBounds(positionX, positionY, imageElement, boundingRect) {
        const paddingX = 60;
        const paddingY = 60;
        if (positionY <= -imageElement?.height + paddingY) {
            positionY = -imageElement?.height + paddingY;
        }
        if (positionY >= boundingRect?.height - paddingY) {
            positionY = boundingRect?.height - paddingY;
        }
        if (positionX <=
            -imageElement?.width - boundingRect?.width / 2 + paddingX) {
            positionX = -imageElement?.width - boundingRect?.width / 2 + paddingX;
        }
        if (positionX >= imageElement?.width + boundingRect?.width / 2 - paddingX) {
            positionX = imageElement?.width + boundingRect?.width / 2 - paddingX;
        }
        return { x: positionX, y: positionY };
    }
    /**
     * Returns the position of the image based on the cursor pointer
     *
     * @param element
     * @param clientX
     * @param clientY
     */
    calculatePointerMovePosition(element, clientX, clientY) {
        const boundingRect = element.nativeElement.getBoundingClientRect();
        const x = clientX - boundingRect.left;
        const y = clientY - boundingRect.top;
        const positionX = -x + element.nativeElement.clientWidth / 2;
        const positionY = -y + element.nativeElement.clientHeight / 2;
        return { positionX, positionY };
    }
}
ProductImageZoomViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageZoomViewComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: { galleryIndex: "galleryIndex" }, viewQueries: [{ propertyName: "defaultImage", first: true, predicate: ["defaultImage"], descendants: true, read: ElementRef }, { propertyName: "zoomImage", first: true, predicate: ["zoomContainer"], descendants: true, read: ElementRef }, { propertyName: "zoomedImage", first: true, predicate: ["zoomedImage"], descendants: true, read: ElementRef }], ngImport: i0, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i3.ProductImageZoomThumbnailsComponent, selector: "cx-product-image-zoom-thumbnails", inputs: ["thumbs$", "activeThumb"], outputs: ["productImage"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageZoomViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.BreakpointService }]; }, propDecorators: { galleryIndex: [{
                type: Input
            }], defaultImage: [{
                type: ViewChild,
                args: ['defaultImage', { read: ElementRef }]
            }], zoomImage: [{
                type: ViewChild,
                args: ['zoomContainer', { read: ElementRef }]
            }], zoomedImage: [{
                type: ViewChild,
                args: ['zoomedImage', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9jb21wb25lbnRzL3Byb2R1Y3QtaW1hZ2Utem9vbS9wcm9kdWN0LWltYWdlLXpvb20tdmlldy9wcm9kdWN0LWltYWdlLXpvb20tdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3L3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUlMLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBRXJFLE9BQU8sRUFDTCxVQUFVLEVBR1YsU0FBUyxHQUNWLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsU0FBUyxFQUNULEtBQUssRUFFTCxFQUFFLEVBQ0YsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNYLEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7OztBQU94QixNQUFNLE9BQU8sNkJBQTZCO0lBdUd4QyxZQUNZLHFCQUE0QyxFQUM1QyxRQUFtQixFQUNuQixLQUF3QixFQUN4QixpQkFBb0M7UUFIcEMsMEJBQXFCLEdB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QUcsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUVyQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRTlELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7MEhBNVVVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLHFNQWlDTCxVQUFVLHFHQXNCVCxVQUFVLHFHQVNaLFVBQVUsNkJDbEg5QywrNkNBOENBOzJGRElhLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSw0QkFBNEIsbUJBRXJCLHVCQUF1QixDQUFDLE1BQU07b01BS3RDLFlBQVk7c0JBQXBCLEtBQUs7Z0JBOEIrQyxZQUFZO3NCQUFoRSxTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBc0JPLFNBQVM7c0JBQTlELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFTQSxXQUFXO3NCQUExRCxTQUFTO3VCQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEltYWdlR3JvdXAsIGlzTm90TnVsbGFibGUsIFByb2R1Y3QgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVGh1bWJuYWlsc0dyb3VwIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0L2ltYWdlLXpvb20vcm9vdCc7XG5pbXBvcnQge1xuICBCUkVBS1BPSU5ULFxuICBCcmVha3BvaW50U2VydmljZSxcbiAgQ3VycmVudFByb2R1Y3RTZXJ2aWNlLFxuICBJQ09OX1RZUEUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGNvbWJpbmVMYXRlc3QsXG4gIGZyb21FdmVudCxcbiAgbWVyZ2UsXG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgc3dpdGNoTWFwLFxuICBzd2l0Y2hNYXBUbyxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXByb2R1Y3QtaW1hZ2Utem9vbS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZVpvb21WaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBpY29uVHlwZSA9IElDT05fVFlQRTtcblxuICBASW5wdXQoKSBnYWxsZXJ5SW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIG1haW5NZWRpYUNvbnRhaW5lciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8SW1hZ2VHcm91cCB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIGRlZmF1bHRJbWFnZVJlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgem9vbVJlYWR5ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHByaXZhdGUgX2RlZmF1bHRJbWFnZTogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfem9vbUltYWdlOiBFbGVtZW50UmVmO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByb3RlY3RlZCBtYWluTWVkaWFDb250YWluZXIkOiBPYnNlcnZhYmxlPEltYWdlR3JvdXAgfCBudWxsPiA9XG4gICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIuYXNPYnNlcnZhYmxlKCk7XG4gIHByb3RlY3RlZCBkZWZhdWx0SW1hZ2VSZWFkeSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPVxuICAgIHRoaXMuZGVmYXVsdEltYWdlUmVhZHkuYXNPYnNlcnZhYmxlKCk7XG4gIHByb3RlY3RlZCB6b29tUmVhZHkkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy56b29tUmVhZHkuYXNPYnNlcnZhYmxlKCk7XG5cbiAgYWN0aXZlVGh1bWI6IEV2ZW50RW1pdHRlcjxJbWFnZUdyb3VwPiA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VHcm91cD4oKTtcblxuICBkZWZhdWx0SW1hZ2VDbGlja0hhbmRsZXIkOiBPYnNlcnZhYmxlPGFueVtdPiA9IHRoaXMuZGVmYXVsdEltYWdlUmVhZHkkLnBpcGUoXG4gICAgZmlsdGVyKEJvb2xlYW4pLFxuICAgIHN3aXRjaE1hcCgoXykgPT5cbiAgICAgIG1lcmdlKC4uLnRoaXMuY2xpY2tPckRvdWJsZUNsaWNrKHRoaXMuZGVmYXVsdEltYWdlKSkucGlwZShcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuem9vbSgpKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBnZXQgZGVmYXVsdEltYWdlKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9kZWZhdWx0SW1hZ2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCdkZWZhdWx0SW1hZ2UnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgc2V0IGRlZmF1bHRJbWFnZShcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRJbWFnZSA9IGVsO1xuICAgICAgdGhpcy5kZWZhdWx0SW1hZ2VSZWFkeS5uZXh0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHpvb21JbWFnZUNsaWNrSGFuZGxlciQ6IE9ic2VydmFibGU8YW55W10+ID0gdGhpcy56b29tUmVhZHkkLnBpcGUoXG4gICAgZmlsdGVyKEJvb2xlYW4pLFxuICAgIHN3aXRjaE1hcCgoXykgPT5cbiAgICAgIG1lcmdlKC4uLnRoaXMuY2xpY2tPckRvdWJsZUNsaWNrKHRoaXMuem9vbUltYWdlKSkucGlwZShcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuem9vbSgpKVxuICAgICAgKVxuICAgIClcbiAgKTtcblxuICBnZXQgem9vbUltYWdlKCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl96b29tSW1hZ2U7XG4gIH1cblxuICBAVmlld0NoaWxkKCd6b29tQ29udGFpbmVyJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHNldCB6b29tSW1hZ2UoXG4gICAgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLl96b29tSW1hZ2UgPSBlbDtcbiAgICAgIHRoaXMuem9vbVJlYWR5Lm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZCgnem9vbWVkSW1hZ2UnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgem9vbWVkSW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgc3RhcnRDb29yZHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGwgPSBudWxsO1xuICBsZWZ0ID0gMDtcbiAgdG9wID0gMDtcbiAgaXNab29tZWQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgcHJvZHVjdCQ6IE9ic2VydmFibGU8UHJvZHVjdD4gPSB0aGlzLmN1cnJlbnRQcm9kdWN0U2VydmljZVxuICAgIC5nZXRQcm9kdWN0KClcbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihpc05vdE51bGxhYmxlKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICB0YXAoKHA6IFByb2R1Y3QpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZ2FsbGVyeUluZGV4KSB7XG4gICAgICAgICAgY29uc3QgaW1hZ2UgPSBBcnJheS5pc0FycmF5KHAuaW1hZ2VzPy5HQUxMRVJZKVxuICAgICAgICAgICAgPyBwLmltYWdlcz8uR0FMTEVSWS5maW5kKFxuICAgICAgICAgICAgICAgIChpbWcpID0+IGltZy56b29tPy5nYWxsZXJ5SW5kZXggPT09IHRoaXMuZ2FsbGVyeUluZGV4XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogcC5pbWFnZXM/LkdBTExFUlk7XG4gICAgICAgICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIubmV4dChpbWFnZSB8fCBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KFxuICAgICAgICAgICAgcC5pbWFnZXM/LlBSSU1BUlkgPyAocC5pbWFnZXMuUFJJTUFSWSBhcyBJbWFnZUdyb3VwKSA6IHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzaGFyZVJlcGxheSgxKVxuICAgICk7XG5cbiAgdGh1bWJuYWlscyQ6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUaHVtYm5haWxzR3JvdXA+W10+ID0gdGhpcy5wcm9kdWN0JC5waXBlKFxuICAgIG1hcCgocDogUHJvZHVjdCkgPT4gdGhpcy5jcmVhdGVUaHVtYnMocCkpLFxuICAgIHNoYXJlUmVwbGF5KDEpXG4gICk7XG5cbiAgbWFpbkltYWdlJDogT2JzZXJ2YWJsZTxJbWFnZUdyb3VwIHwgbnVsbD4gPSBjb21iaW5lTGF0ZXN0KFtcbiAgICB0aGlzLnByb2R1Y3QkLFxuICAgIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyJCxcbiAgXSkucGlwZShtYXAoKFssIGNvbnRhaW5lcl0pID0+IGNvbnRhaW5lcikpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50UHJvZHVjdFNlcnZpY2U6IEN1cnJlbnRQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCBicmVha3BvaW50U2VydmljZTogQnJlYWtwb2ludFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmRlZmF1bHRJbWFnZUNsaWNrSGFuZGxlciQuc3Vic2NyaWJlKCkpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnpvb21JbWFnZUNsaWNrSGFuZGxlciQuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgb3BlbkltYWdlKGl0ZW06IEltYWdlR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KGl0ZW0pO1xuICAgIHRoaXMuYWN0aXZlVGh1bWIuZW1pdChpdGVtKTtcbiAgfVxuXG4gIC8qKiBmaW5kIHRoZSBpbmRleCBvZiB0aGUgbWFpbiBtZWRpYSBpbiB0aGUgbGlzdCBvZiBtZWRpYSAqL1xuICBwcm90ZWN0ZWQgZ2V0QWN0aXZlKCk6IG51bWJlciB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5tYWluTWVkaWFDb250YWluZXIudmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYWluTWVkaWFDb250YWluZXIudmFsdWVbMF0udGh1bWJuYWlsPy5nYWxsZXJ5SW5kZXggfHwgMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyPy52YWx1ZT8udGh1bWJuYWlsPy5nYWxsZXJ5SW5kZXggfHwgMDtcbiAgfVxuXG4gIGdldFByZXZpb3VzUHJvZHVjdCh0aHVtYnM6IE9ic2VydmFibGU8SW1hZ2VHcm91cD5bXSk6IE9ic2VydmFibGU8SW1hZ2VHcm91cD4ge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgaWYgKGFjdGl2ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRodW1ic1thY3RpdmVdO1xuICAgIH1cbiAgICByZXR1cm4gdGh1bWJzW2FjdGl2ZSAtIDFdO1xuICB9XG5cbiAgZ2V0TmV4dFByb2R1Y3QodGh1bWJzOiBPYnNlcnZhYmxlPEltYWdlR3JvdXA+W10pOiBPYnNlcnZhYmxlPEltYWdlR3JvdXA+IHtcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIGlmIChhY3RpdmUgPT09IHRodW1icy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gdGh1bWJzW2FjdGl2ZV07XG4gICAgfVxuICAgIHJldHVybiB0aHVtYnNbYWN0aXZlICsgMV07XG4gIH1cblxuICAvKipcbiAgICogWm9vbSBpbiBvciBvdXQgb2YgdGhlIGltYWdlXG4gICAqL1xuICB6b29tKCk6IHZvaWQge1xuICAgIHRoaXMuaXNab29tZWQgPSAhdGhpcy5pc1pvb21lZDtcbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0gbnVsbDtcbiAgICB0aGlzLmxlZnQgPSAwO1xuICAgIHRoaXMudG9wID0gMDtcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvdWNoIHNjcmVlbiBpbWFnZSBwYW5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICB0b3VjaE1vdmUoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID1cbiAgICAgIHRoaXMuem9vbWVkSW1hZ2U/Lm5hdGl2ZUVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGFzIERPTVJlY3Q7XG4gICAgY29uc3QgaW1hZ2VFbGVtZW50ID0gdGhpcy56b29tZWRJbWFnZT8ubmF0aXZlRWxlbWVudD8uZmlyc3RDaGlsZDtcblxuICAgIGlmICghdGhpcy5zdGFydENvb3Jkcykge1xuICAgICAgdGhpcy5zdGFydENvb3JkcyA9IHsgeDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WSB9O1xuICAgIH1cbiAgICB0aGlzLmxlZnQgKz0gdG91Y2guY2xpZW50WCAtIHRoaXMuc3RhcnRDb29yZHMueDtcbiAgICB0aGlzLnRvcCArPSB0b3VjaC5jbGllbnRZIC0gdGhpcy5zdGFydENvb3Jkcy55O1xuXG4gICAgdGhpcy5tb3ZlSW1hZ2UodGhpcy5sZWZ0LCB0aGlzLnRvcCwgYm91bmRpbmdSZWN0LCBpbWFnZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5zdGFydENvb3JkcyA9IHsgeDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0b3VjaCBsb2NhdGlvblxuICAgKi9cbiAgY2xlYXJUb3VjaCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb2ludGVyIGltYWdlIHBhblxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHBvaW50ZXJNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID1cbiAgICAgIHRoaXMuem9vbWVkSW1hZ2UubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBET01SZWN0O1xuICAgIGNvbnN0IGltYWdlRWxlbWVudCA9IHRoaXMuem9vbWVkSW1hZ2UubmF0aXZlRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgY29uc3QgeyBwb3NpdGlvblgsIHBvc2l0aW9uWSB9ID0gdGhpcy5jYWxjdWxhdGVQb2ludGVyTW92ZVBvc2l0aW9uKFxuICAgICAgdGhpcy56b29tZWRJbWFnZSxcbiAgICAgIGV2ZW50LmNsaWVudFgsXG4gICAgICBldmVudC5jbGllbnRZXG4gICAgKTtcblxuICAgIHRoaXMubW92ZUltYWdlKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBib3VuZGluZ1JlY3QsIGltYWdlRWxlbWVudCk7XG4gIH1cblxuICBjaGFuZ2VJbWFnZShldmVudDogeyBpbWFnZTogSW1hZ2VHcm91cDsgaW5kZXg6IG51bWJlciB9KTogdm9pZCB7XG4gICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIubmV4dChldmVudC5pbWFnZSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgb2Zmc2V0IGZyb20gdG91Y2hNb3ZlIG9yIHBvaW50ZXJNb3ZlIHRvIHRoZSBpbWFnZSBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvblhcbiAgICogQHBhcmFtIHBvc2l0aW9uWVxuICAgKiBAcGFyYW0gYm91bmRpbmdSZWN0XG4gICAqIEBwYXJhbSBpbWFnZUVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBtb3ZlSW1hZ2UoXG4gICAgcG9zaXRpb25YOiBudW1iZXIsXG4gICAgcG9zaXRpb25ZOiBudW1iZXIsXG4gICAgYm91bmRpbmdSZWN0OiBhbnksXG4gICAgaW1hZ2VFbGVtZW50OiBET01SZWN0XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5oYW5kbGVPdXRPZkJvdW5kcyhcbiAgICAgIHBvc2l0aW9uWCxcbiAgICAgIHBvc2l0aW9uWSxcbiAgICAgIGltYWdlRWxlbWVudCxcbiAgICAgIGJvdW5kaW5nUmVjdFxuICAgICk7XG5cbiAgICBpZiAoaW1hZ2VFbGVtZW50KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGltYWdlRWxlbWVudCwgJ2xlZnQnLCB4ICsgJ3B4Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGltYWdlRWxlbWVudCwgJ3RvcCcsIHkgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2xpY2sgYW5kIGRibGNsaWNrIGV2ZW50IG1hcHBpbmcgZm9yIHRoZSBnaXZlbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIGNsaWNrT3JEb3VibGVDbGljayhlbGVtZW50OiBFbGVtZW50UmVmKTogT2JzZXJ2YWJsZTxhbnk+W10ge1xuICAgIHJldHVybiBbXG4gICAgICBmcm9tRXZlbnQoZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXBUbyh0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLmlzVXAoQlJFQUtQT0lOVC5tZCkpLFxuICAgICAgICBmaWx0ZXIoQm9vbGVhbilcbiAgICAgICksXG4gICAgICBmcm9tRXZlbnQoZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGJsY2xpY2snKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXBUbyh0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLmlzRG93bihCUkVBS1BPSU5ULmxnKSksXG4gICAgICAgIGZpbHRlcihCb29sZWFuKVxuICAgICAgKSxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBhcnJheSBvZiBDYXJvdXNlbEl0ZW1zIGZvciB0aGUgcHJvZHVjdCB0aHVtYm5haWxzLlxuICAgKiBJbiBjYXNlIHRoZXJlIGFyZSBsZXNzIHRoZW4gMiB0aHVtYnMsIHdlIHJldHVybiBudWxsLlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVUaHVtYnMocHJvZHVjdDogUHJvZHVjdCk6IE9ic2VydmFibGU8VGh1bWJuYWlsc0dyb3VwPltdIHtcbiAgICBpZiAoXG4gICAgICAhcHJvZHVjdC5pbWFnZXMgfHxcbiAgICAgICFwcm9kdWN0LmltYWdlcy5HQUxMRVJZIHx8XG4gICAgICBwcm9kdWN0LmltYWdlcy5HQUxMRVJZLmxlbmd0aCA8IDJcbiAgICApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBpbWFnZXM6IEltYWdlR3JvdXBbXSA9IHByb2R1Y3QuaW1hZ2VzLkdBTExFUlkgYXMgSW1hZ2VHcm91cFtdO1xuXG4gICAgcmV0dXJuIGltYWdlcy5tYXAoKGMpID0+IG9mKHsgY29udGFpbmVyOiBjIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBLZWVwcyB0aGUgem9vbSBpbWFnZSBmcm9tIGxlYXZpbmcgdGhlIGJvdW5kaW5nIGNvbnRhaW5lclxuICAgKlxuICAgKiBAcGFyYW0gcG9zaXRpb25YXG4gICAqIEBwYXJhbSBwb3NpdGlvbllcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudFxuICAgKiBAcGFyYW0gYm91bmRpbmdSZWN0XG4gICAqL1xuICBoYW5kbGVPdXRPZkJvdW5kcyhcbiAgICBwb3NpdGlvblg6IG51bWJlcixcbiAgICBwb3NpdGlvblk6IG51bWJlcixcbiAgICBpbWFnZUVsZW1lbnQ6IGFueSxcbiAgICBib3VuZGluZ1JlY3Q6IERPTVJlY3RcbiAgKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHtcbiAgICBjb25zdCBwYWRkaW5nWCA9IDYwO1xuICAgIGNvbnN0IHBhZGRpbmdZID0gNjA7XG5cbiAgICBpZiAocG9zaXRpb25ZIDw9IC1pbWFnZUVsZW1lbnQ/LmhlaWdodCArIHBhZGRpbmdZKSB7XG4gICAgICBwb3NpdGlvblkgPSAtaW1hZ2VFbGVtZW50Py5oZWlnaHQgKyBwYWRkaW5nWTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWSA+PSBib3VuZGluZ1JlY3Q/LmhlaWdodCAtIHBhZGRpbmdZKSB7XG4gICAgICBwb3NpdGlvblkgPSBib3VuZGluZ1JlY3Q/LmhlaWdodCAtIHBhZGRpbmdZO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBwb3NpdGlvblggPD1cbiAgICAgIC1pbWFnZUVsZW1lbnQ/LndpZHRoIC0gYm91bmRpbmdSZWN0Py53aWR0aCAvIDIgKyBwYWRkaW5nWFxuICAgICkge1xuICAgICAgcG9zaXRpb25YID0gLWltYWdlRWxlbWVudD8ud2lkdGggLSBib3VuZGluZ1JlY3Q/LndpZHRoIC8gMiArIHBhZGRpbmdYO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25YID49IGltYWdlRWxlbWVudD8ud2lkdGggKyBib3VuZGluZ1JlY3Q/LndpZHRoIC8gMiAtIHBhZGRpbmdYKSB7XG4gICAgICBwb3NpdGlvblggPSBpbWFnZUVsZW1lbnQ/LndpZHRoICsgYm91bmRpbmdSZWN0Py53aWR0aCAvIDIgLSBwYWRkaW5nWDtcbiAgICB9XG5cbiAgICByZXR1cm4geyB4OiBwb3NpdGlvblgsIHk6IHBvc2l0aW9uWSB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbWFnZSBiYXNlZCBvbiB0aGUgY3Vyc29yIHBvaW50ZXJcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsaWVudFhcbiAgICogQHBhcmFtIGNsaWVudFlcbiAgICovXG4gIGNhbGN1bGF0ZVBvaW50ZXJNb3ZlUG9zaXRpb24oXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBjbGllbnRYOiBudW1iZXIsXG4gICAgY2xpZW50WTogbnVtYmVyXG4gICk6IHsgcG9zaXRpb25YOiBudW1iZXI7IHBvc2l0aW9uWTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgYXMgRE9NUmVjdDtcblxuICAgIGNvbnN0IHggPSBjbGllbnRYIC0gYm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgY29uc3QgeSA9IGNsaWVudFkgLSBib3VuZGluZ1JlY3QudG9wO1xuXG4gICAgY29uc3QgcG9zaXRpb25YID0gLXggKyBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggLyAyO1xuICAgIGNvbnN0IHBvc2l0aW9uWSA9IC15ICsgZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCAvIDI7XG5cbiAgICByZXR1cm4geyBwb3NpdGlvblgsIHBvc2l0aW9uWSB9O1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwibWFpbkltYWdlJCB8IGFzeW5jIGFzIG1haW5cIj5cbiAgPGRpdiBjbGFzcz1cImN4LW1haW4taW1hZ2UtZ3JvdXBcIiAqbmdJZj1cInRodW1ibmFpbHMkIHwgYXN5bmMgYXMgdGh1bWJzXCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LW5hdmlnYXRlLWltYWdlXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcbiAgICAgICAgKm5nSWY9XCJnZXRQcmV2aW91c1Byb2R1Y3QodGh1bWJzKSB8IGFzeW5jIGFzIHByZXZpb3VzUHJvZHVjdFwiXG4gICAgICAgIChjbGljayk9XCJvcGVuSW1hZ2UocHJldmlvdXNQcm9kdWN0LmNvbnRhaW5lcilcIlxuICAgICAgPlxuICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5DQVJFVF9MRUZUXCI+PC9jeC1pY29uPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGN4LW1lZGlhXG4gICAgICAjZGVmYXVsdEltYWdlXG4gICAgICBjbGFzcz1cImN4LWRlZmF1bHQtaW1hZ2Utem9vbVwiXG4gICAgICAqbmdJZj1cIiFpc1pvb21lZFwiXG4gICAgICBbY29udGFpbmVyXT1cIm1haW5cIlxuICAgID5cbiAgICA8L2N4LW1lZGlhPlxuICAgIDxkaXYgI3pvb21Db250YWluZXIgY2xhc3M9XCJjeC16b29tLWNvbnRhaW5lclwiICpuZ0lmPVwiaXNab29tZWRcIj5cbiAgICAgIDxjeC1tZWRpYVxuICAgICAgICAjem9vbWVkSW1hZ2VcbiAgICAgICAgY2xhc3M9XCJjeC1pbWFnZS16b29tZWRcIlxuICAgICAgICBbY29udGFpbmVyXT1cIm1haW5cIlxuICAgICAgICAobW91c2Vtb3ZlKT1cInBvaW50ZXJNb3ZlKCRldmVudClcIlxuICAgICAgICAodG91Y2htb3ZlKT1cInRvdWNoTW92ZSgkZXZlbnQpXCJcbiAgICAgICAgKHRvdWNoZW5kKT1cImNsZWFyVG91Y2goKVwiXG4gICAgICA+XG4gICAgICA8L2N4LW1lZGlhPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjeC1uYXZpZ2F0ZS1pbWFnZVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzcz1cImJ0biBidG4tbGlua1wiXG4gICAgICAgICpuZ0lmPVwiZ2V0TmV4dFByb2R1Y3QodGh1bWJzKSB8IGFzeW5jIGFzIG5leHRQcm9kdWN0XCJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5JbWFnZShuZXh0UHJvZHVjdC5jb250YWluZXIpXCJcbiAgICAgID5cbiAgICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGUuQ0FSRVRfUklHSFRcIj48L2N4LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cblxuPGN4LXByb2R1Y3QtaW1hZ2Utem9vbS10aHVtYm5haWxzXG4gIFt0aHVtYnMkXT1cInRodW1ibmFpbHMkXCJcbiAgW2FjdGl2ZVRodW1iXT1cImFjdGl2ZVRodW1iXCJcbiAgKHByb2R1Y3RJbWFnZSk9XCJjaGFuZ2VJbWFnZSgkZXZlbnQpXCJcbj48L2N4LXByb2R1Y3QtaW1hZ2Utem9vbS10aHVtYm5haWxzPlxuIl19