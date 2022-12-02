/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../config/occ-config";
export class ProductImageNormalizer {
    constructor(config) {
        this.config = config;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.images) {
            target.images = this.normalize(source.images);
        }
        return target;
    }
    /**
     * @desc
     * Creates the image structure we'd like to have. Instead of
     * having a single list with all images despite type and format
     * we create a proper structure. With that we can do:
     * - images.primary.thumnail.url
     * - images.GALLERY[0].thumnail.url
     */
    normalize(source) {
        const images = {};
        if (source) {
            for (const image of source) {
                const isList = image.hasOwnProperty('galleryIndex');
                if (image.imageType) {
                    if (!images.hasOwnProperty(image.imageType)) {
                        images[image.imageType] = isList ? [] : {};
                    }
                    let imageContainer;
                    if (isList) {
                        const imageGroups = images[image.imageType];
                        if (!imageGroups[image.galleryIndex]) {
                            imageGroups[image.galleryIndex] = {};
                        }
                        imageContainer = imageGroups[image.galleryIndex];
                    }
                    else {
                        imageContainer = images[image.imageType];
                    }
                    const targetImage = { ...image };
                    targetImage.url = this.normalizeImageUrl(targetImage.url ?? '');
                    if (image.format) {
                        imageContainer[image.format] = targetImage;
                    }
                }
            }
        }
        return images;
    }
    /**
     * Traditionally, in an on-prem world, medias and other backend related calls
     * are hosted at the same platform, but in a cloud setup, applications are are
     * typically distributed cross different environments. For media, we use the
     * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
     * if none provided.
     */
    normalizeImageUrl(url) {
        if (new RegExp(/^(http|data:image|\/\/)/i).test(url)) {
            return url;
        }
        return ((this.config.backend?.media?.baseUrl ||
            this.config.backend?.occ?.baseUrl ||
            '') + url);
    }
}
ProductImageNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageNormalizer, deps: [{ token: i1.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ProductImageNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ProductImageNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL2FkYXB0ZXJzL3Byb2R1Y3QvY29udmVydGVycy9wcm9kdWN0LWltYWdlLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVEzQyxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQXNCLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDO0lBRTNDLE9BQU8sQ0FBQyxNQUFtQixFQUFFLE1BQWdCO1FBQzNDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBYSxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFNBQVMsQ0FBQyxNQUFtQjtRQUMzQixNQUFNLE1BQU0sR0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEVBQUU7WUFDVixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDNUM7b0JBRUQsSUFBSSxjQUEwQixDQUFDO29CQUMvQixJQUFJLE1BQU0sRUFBRTt3QkFDVixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBaUIsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBc0IsQ0FBQyxFQUFFOzRCQUM5QyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQXNCLENBQUMsR0FBRyxFQUFFLENBQUM7eUJBQ2hEO3dCQUNELGNBQWMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQXNCLENBQUMsQ0FBQztxQkFDNUQ7eUJBQU07d0JBQ0wsY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFlLENBQUM7cUJBQ3hEO29CQUVELE1BQU0sV0FBVyxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztvQkFDakMsV0FBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNoQixjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQztxQkFDNUM7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNLLGlCQUFpQixDQUFDLEdBQVc7UUFDbkMsSUFBSSxJQUFJLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwRCxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0QsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU87WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU87WUFDakMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUNaLENBQUM7SUFDSixDQUFDOzttSEFwRVUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FEVCxNQUFNOzJGQUNuQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW1hZ2VHcm91cCwgSW1hZ2VzIH0gZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWwvaW1hZ2UubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZGVsL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPY2NDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb25maWcvb2NjLWNvbmZpZyc7XG5pbXBvcnQgeyBPY2MgfSBmcm9tICcuLi8uLi8uLi9vY2MtbW9kZWxzL29jYy5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZU5vcm1hbGl6ZXIgaW1wbGVtZW50cyBDb252ZXJ0ZXI8T2NjLlByb2R1Y3QsIFByb2R1Y3Q+IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogT2NjQ29uZmlnKSB7fVxuXG4gIGNvbnZlcnQoc291cmNlOiBPY2MuUHJvZHVjdCwgdGFyZ2V0PzogUHJvZHVjdCk6IFByb2R1Y3Qge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBQcm9kdWN0O1xuICAgIH1cbiAgICBpZiAoc291cmNlLmltYWdlcykge1xuICAgICAgdGFyZ2V0LmltYWdlcyA9IHRoaXMubm9ybWFsaXplKHNvdXJjZS5pbWFnZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjXG4gICAqIENyZWF0ZXMgdGhlIGltYWdlIHN0cnVjdHVyZSB3ZSdkIGxpa2UgdG8gaGF2ZS4gSW5zdGVhZCBvZlxuICAgKiBoYXZpbmcgYSBzaW5nbGUgbGlzdCB3aXRoIGFsbCBpbWFnZXMgZGVzcGl0ZSB0eXBlIGFuZCBmb3JtYXRcbiAgICogd2UgY3JlYXRlIGEgcHJvcGVyIHN0cnVjdHVyZS4gV2l0aCB0aGF0IHdlIGNhbiBkbzpcbiAgICogLSBpbWFnZXMucHJpbWFyeS50aHVtbmFpbC51cmxcbiAgICogLSBpbWFnZXMuR0FMTEVSWVswXS50aHVtbmFpbC51cmxcbiAgICovXG4gIG5vcm1hbGl6ZShzb3VyY2U6IE9jYy5JbWFnZVtdKTogSW1hZ2VzIHtcbiAgICBjb25zdCBpbWFnZXM6IEltYWdlcyA9IHt9O1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIGZvciAoY29uc3QgaW1hZ2Ugb2Ygc291cmNlKSB7XG4gICAgICAgIGNvbnN0IGlzTGlzdCA9IGltYWdlLmhhc093blByb3BlcnR5KCdnYWxsZXJ5SW5kZXgnKTtcbiAgICAgICAgaWYgKGltYWdlLmltYWdlVHlwZSkge1xuICAgICAgICAgIGlmICghaW1hZ2VzLmhhc093blByb3BlcnR5KGltYWdlLmltYWdlVHlwZSkpIHtcbiAgICAgICAgICAgIGltYWdlc1tpbWFnZS5pbWFnZVR5cGVdID0gaXNMaXN0ID8gW10gOiB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaW1hZ2VDb250YWluZXI6IEltYWdlR3JvdXA7XG4gICAgICAgICAgaWYgKGlzTGlzdCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VHcm91cHMgPSBpbWFnZXNbaW1hZ2UuaW1hZ2VUeXBlXSBhcyBJbWFnZUdyb3VwW107XG4gICAgICAgICAgICBpZiAoIWltYWdlR3JvdXBzW2ltYWdlLmdhbGxlcnlJbmRleCBhcyBudW1iZXJdKSB7XG4gICAgICAgICAgICAgIGltYWdlR3JvdXBzW2ltYWdlLmdhbGxlcnlJbmRleCBhcyBudW1iZXJdID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWFnZUNvbnRhaW5lciA9IGltYWdlR3JvdXBzW2ltYWdlLmdhbGxlcnlJbmRleCBhcyBudW1iZXJdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWFnZUNvbnRhaW5lciA9IGltYWdlc1tpbWFnZS5pbWFnZVR5cGVdIGFzIEltYWdlR3JvdXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdGFyZ2V0SW1hZ2UgPSB7IC4uLmltYWdlIH07XG4gICAgICAgICAgdGFyZ2V0SW1hZ2UudXJsID0gdGhpcy5ub3JtYWxpemVJbWFnZVVybCh0YXJnZXRJbWFnZS51cmwgPz8gJycpO1xuICAgICAgICAgIGlmIChpbWFnZS5mb3JtYXQpIHtcbiAgICAgICAgICAgIGltYWdlQ29udGFpbmVyW2ltYWdlLmZvcm1hdF0gPSB0YXJnZXRJbWFnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGltYWdlcztcbiAgfVxuICAvKipcbiAgICogVHJhZGl0aW9uYWxseSwgaW4gYW4gb24tcHJlbSB3b3JsZCwgbWVkaWFzIGFuZCBvdGhlciBiYWNrZW5kIHJlbGF0ZWQgY2FsbHNcbiAgICogYXJlIGhvc3RlZCBhdCB0aGUgc2FtZSBwbGF0Zm9ybSwgYnV0IGluIGEgY2xvdWQgc2V0dXAsIGFwcGxpY2F0aW9ucyBhcmUgYXJlXG4gICAqIHR5cGljYWxseSBkaXN0cmlidXRlZCBjcm9zcyBkaWZmZXJlbnQgZW52aXJvbm1lbnRzLiBGb3IgbWVkaWEsIHdlIHVzZSB0aGVcbiAgICogYGJhY2tlbmQubWVkaWEuYmFzZVVybGAgYnkgZGVmYXVsdCwgYnV0IGZhbGxiYWNrIHRvIGBiYWNrZW5kLm9jYy5iYXNlVXJsYFxuICAgKiBpZiBub25lIHByb3ZpZGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBub3JtYWxpemVJbWFnZVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKG5ldyBSZWdFeHAoL14oaHR0cHxkYXRhOmltYWdlfFxcL1xcLykvaSkudGVzdCh1cmwpKSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuY29uZmlnLmJhY2tlbmQ/Lm1lZGlhPy5iYXNlVXJsIHx8XG4gICAgICAgIHRoaXMuY29uZmlnLmJhY2tlbmQ/Lm9jYz8uYmFzZVVybCB8fFxuICAgICAgICAnJykgKyB1cmxcbiAgICApO1xuICB9XG59XG4iXX0=