/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OrderEntryPromotionsNormalizer {
    convert(source, target) {
        target = this.getProductPromotion(source.item, source.promotions);
        return target;
    }
    /**
     * Get consumed promotions for the given order entry
     *
     * @param item
     * @param promotions
     * @returns consumed promotions for this entry
     */
    getProductPromotion(item, promotions) {
        const entryPromotions = [];
        if (promotions && promotions.length > 0) {
            for (const promotion of promotions) {
                if (promotion.description &&
                    promotion.consumedEntries &&
                    promotion.consumedEntries.length > 0) {
                    for (const consumedEntry of promotion.consumedEntries) {
                        if (this.isConsumedByEntry(consumedEntry, item)) {
                            entryPromotions.push(promotion);
                        }
                    }
                }
            }
        }
        return entryPromotions;
    }
    isConsumedByEntry(consumedEntry, entry) {
        const consumedEntryNumber = consumedEntry.orderEntryNumber;
        if (entry && entry.entries && entry.entries.length > 0) {
            for (const subEntry of entry.entries) {
                if (subEntry.entryNumber === consumedEntryNumber) {
                    return true;
                }
            }
            return false;
        }
        else {
            return consumedEntryNumber === entry?.entryNumber;
        }
    }
}
OrderEntryPromotionsNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderEntryPromotionsNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderEntryPromotionsNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderEntryPromotionsNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: OrderEntryPromotionsNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZW50cnktcHJvbW90aW9ucy1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9vY2MvYWRhcHRlcnMvY29udmVydGVycy9vcmRlci1lbnRyeS1wcm9tb3Rpb25zLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDLE1BQU0sT0FBTyw4QkFBOEI7SUFPekMsT0FBTyxDQUNMLE1BQWlFLEVBQ2pFLE1BQTBCO1FBRTFCLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILG1CQUFtQixDQUNqQixJQUFxQixFQUNyQixVQUE4QjtRQUU5QixNQUFNLGVBQWUsR0FBc0IsRUFBRSxDQUFDO1FBQzlDLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO2dCQUNsQyxJQUNFLFNBQVMsQ0FBQyxXQUFXO29CQUNyQixTQUFTLENBQUMsZUFBZTtvQkFDekIsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNwQztvQkFDQSxLQUFLLE1BQU0sYUFBYSxJQUFJLFNBQVMsQ0FBQyxlQUFlLEVBQUU7d0JBQ3JELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBRTs0QkFDL0MsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDakM7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVTLGlCQUFpQixDQUN6QixhQUEwQyxFQUMxQyxLQUFVO1FBRVYsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7UUFDM0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEQsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNwQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssbUJBQW1CLEVBQUU7b0JBQ2hELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU07WUFDTCxPQUFPLG1CQUFtQixLQUFLLEtBQUssRUFBRSxXQUFXLENBQUM7U0FDbkQ7SUFDSCxDQUFDOzsySEE1RFUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FEakIsTUFBTTsyRkFDbkIsOEJBQThCO2tCQUQxQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFByb21vdGlvbk9yZGVyRW50cnlDb25zdW1lZCxcbiAgUHJvbW90aW9uUmVzdWx0LFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IENvbnZlcnRlciwgT2NjIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPcmRlckVudHJ5UHJvbW90aW9uc05vcm1hbGl6ZXJcbiAgaW1wbGVtZW50c1xuICAgIENvbnZlcnRlcjxcbiAgICAgIHsgaXRlbT86IE9jYy5PcmRlckVudHJ5OyBwcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W10gfSxcbiAgICAgIFByb21vdGlvblJlc3VsdFtdXG4gICAgPlxue1xuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogeyBpdGVtPzogT2NjLk9yZGVyRW50cnk7IHByb21vdGlvbnM/OiBQcm9tb3Rpb25SZXN1bHRbXSB9LFxuICAgIHRhcmdldD86IFByb21vdGlvblJlc3VsdFtdXG4gICkge1xuICAgIHRhcmdldCA9IHRoaXMuZ2V0UHJvZHVjdFByb21vdGlvbihzb3VyY2UuaXRlbSwgc291cmNlLnByb21vdGlvbnMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbnN1bWVkIHByb21vdGlvbnMgZm9yIHRoZSBnaXZlbiBvcmRlciBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gaXRlbVxuICAgKiBAcGFyYW0gcHJvbW90aW9uc1xuICAgKiBAcmV0dXJucyBjb25zdW1lZCBwcm9tb3Rpb25zIGZvciB0aGlzIGVudHJ5XG4gICAqL1xuICBnZXRQcm9kdWN0UHJvbW90aW9uKFxuICAgIGl0ZW0/OiBPY2MuT3JkZXJFbnRyeSxcbiAgICBwcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W11cbiAgKTogUHJvbW90aW9uUmVzdWx0W10ge1xuICAgIGNvbnN0IGVudHJ5UHJvbW90aW9uczogUHJvbW90aW9uUmVzdWx0W10gPSBbXTtcbiAgICBpZiAocHJvbW90aW9ucyAmJiBwcm9tb3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3QgcHJvbW90aW9uIG9mIHByb21vdGlvbnMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb21vdGlvbi5kZXNjcmlwdGlvbiAmJlxuICAgICAgICAgIHByb21vdGlvbi5jb25zdW1lZEVudHJpZXMgJiZcbiAgICAgICAgICBwcm9tb3Rpb24uY29uc3VtZWRFbnRyaWVzLmxlbmd0aCA+IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBjb25zdW1lZEVudHJ5IG9mIHByb21vdGlvbi5jb25zdW1lZEVudHJpZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ29uc3VtZWRCeUVudHJ5KGNvbnN1bWVkRW50cnksIGl0ZW0pKSB7XG4gICAgICAgICAgICAgIGVudHJ5UHJvbW90aW9ucy5wdXNoKHByb21vdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbnRyeVByb21vdGlvbnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb25zdW1lZEJ5RW50cnkoXG4gICAgY29uc3VtZWRFbnRyeTogUHJvbW90aW9uT3JkZXJFbnRyeUNvbnN1bWVkLFxuICAgIGVudHJ5OiBhbnlcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29uc3VtZWRFbnRyeU51bWJlciA9IGNvbnN1bWVkRW50cnkub3JkZXJFbnRyeU51bWJlcjtcbiAgICBpZiAoZW50cnkgJiYgZW50cnkuZW50cmllcyAmJiBlbnRyeS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qgc3ViRW50cnkgb2YgZW50cnkuZW50cmllcykge1xuICAgICAgICBpZiAoc3ViRW50cnkuZW50cnlOdW1iZXIgPT09IGNvbnN1bWVkRW50cnlOdW1iZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29uc3VtZWRFbnRyeU51bWJlciA9PT0gZW50cnk/LmVudHJ5TnVtYmVyO1xuICAgIH1cbiAgfVxufVxuIl19