/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PaginationItemType, PaginationNavigationPosition, } from './pagination.model';
import * as i0 from "@angular/core";
import * as i1 from "./config/pagination.config";
const FALLBACK_PAGINATION_OPTIONS = {
    rangeCount: 3,
    dotsLabel: '...',
    startLabel: '«',
    previousLabel: '‹',
    nextLabel: '›',
    endLabel: '»',
};
/**
 * Builds a pagination structures based on a pageCount and current page number.
 * There are various {@link PaginationConfig} options which can be used to configure
 * the behavior of the build. Alternatively, CSS can be used to further customize
 * the pagination.
 *
 * Examples:
 * The full blown pagination items contain the follow elements:
 *
 * `« ‹ 1 ... 4 (5) 6 ... 9 › »`
 *
 * This includes pagination items to the following pages:
 * - start page
 * - previous page
 * - first page
 * - page range
 * - last page
 * - next page
 * - end page
 *
 * All of those links are configurable, including the size of the page range.
 * The current page will always be centered in the page range to provide direct access
 * to the previous and next page.
 */
export class PaginationBuilder {
    constructor(paginationConfig) {
        this.paginationConfig = paginationConfig;
    }
    /**
     * Builds a list of `PaginationItem`. The give pageCount and current are used
     * to build out the full pagination. There are various {@link PaginationConfig} options
     * which can be used to configure the behavior of the build. Alternatively, CSS
     * can be used to further specialize visibility of the pagination.
     *
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     * @returns An array of `PaginationItem`
     */
    paginate(pageCount, current) {
        const pages = [];
        if (!pageCount || pageCount < 2) {
            return pages;
        }
        this.addPages(pages, pageCount, current);
        this.addDots(pages, pageCount);
        this.addFirstLast(pages, pageCount);
        this.addNavigation(pages, pageCount, current);
        return pages;
    }
    /**
     * Returns the current page with surrounding pages (based on the `config.rangeCount`).
     * The current page is always centered to provide direct access to the previous and next page.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     */
    addPages(pages, pageCount, current) {
        const start = this.getStartOfRange(pageCount, current);
        if (this.config.rangeCount !== undefined && start !== null) {
            const max = Math.min(this.config.rangeCount, pageCount);
            Array.from(Array(max)).forEach((_, i) => {
                pages.push({
                    number: i + start,
                    label: String(i + start + 1),
                    type: PaginationItemType.PAGE,
                });
            });
        }
    }
    /**
     * Adds dots before and after the given pages, if configured (defaults to true).
     * If the dots only represent a single page, the page number is added instead of
     * the dots, unless the configuration requires dots always.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     */
    addDots(pages, pageCount) {
        if (!this.config.addDots) {
            return;
        }
        const addFirstGap = () => {
            const firstItemNumber = pages[0].number;
            const gapNumber = this.config.addFirst ? 1 : 0;
            if (firstItemNumber !== undefined && firstItemNumber > gapNumber) {
                const isGap = !this.config.substituteDotsForSingularPage ||
                    firstItemNumber !== gapNumber + 1;
                const isSubstituted = this.config.addFirst &&
                    this.config.substituteDotsForSingularPage &&
                    gapNumber === 0;
                const type = isGap
                    ? PaginationItemType.GAP
                    : isSubstituted
                        ? PaginationItemType.FIRST
                        : PaginationItemType.PAGE;
                return [
                    Object.assign({
                        label: isGap ? this.config.dotsLabel : String(gapNumber + 1),
                        type,
                    }, isGap ? null : { number: gapNumber }),
                ];
            }
            else {
                return [];
            }
        };
        const addLastGap = () => {
            const pageNumber = pages[pages.length - 1].number;
            const nextPageNumber = pageNumber ? pageNumber + 1 : undefined;
            const last = pageCount - (this.config.addLast ? 2 : 1);
            if (nextPageNumber && nextPageNumber <= last) {
                const isSubstituted = this.config.addLast &&
                    this.config.substituteDotsForSingularPage &&
                    nextPageNumber === last;
                const isGap = nextPageNumber <
                    pageCount -
                        (this.config.substituteDotsForSingularPage ? 1 : 0) -
                        (this.config.addLast ? 1 : 0);
                const type = isGap
                    ? PaginationItemType.GAP
                    : isSubstituted
                        ? PaginationItemType.LAST
                        : PaginationItemType.PAGE;
                return [
                    Object.assign({
                        label: isGap ? this.config.dotsLabel : String(nextPageNumber + 1),
                        type,
                    }, isGap ? null : { number: nextPageNumber }),
                ];
            }
            else {
                return [];
            }
        };
        pages.unshift(...addFirstGap());
        pages.push(...addLastGap());
    }
    /**
     * Add links to the first and last page, if configured to do so.
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     *
     */
    addFirstLast(pages, pageCount) {
        if (this.config.addFirst && pages[0].number !== 0) {
            pages.unshift({
                number: 0,
                label: '1',
                type: PaginationItemType.FIRST,
            });
        }
        if (this.config.addLast &&
            pages[pages.length - 1].number !== pageCount - 1) {
            pages.push({
                number: pageCount - 1,
                label: String(pageCount),
                type: PaginationItemType.LAST,
            });
        }
    }
    /**
     * Add links to the start, previous, next and last page, if configured to do so.
     * The order of the links can be configured by using the {@link PaginationConfig},
     * using the `PaginationNavigationPosition` (`BEFORE` or `AFTER`).
     * The `PaginationNavigationPosition` allows for 3 flavours:
     *
     * - by default the pagination starts with start and previous and ends with the next and end links
     * - BEFORE – all navigation links are added in the front of the pagination list
     * - AFTER – all navigation links are pushed to the end of the pagination list
     *
     * @param pages The list of page items that is used to amend
     * @param pageCount The total number of pages
     * @param current The current page number, 0-index based
     *
     */
    addNavigation(pages, pageCount, current) {
        const before = this.getBeforeLinks(current);
        const after = this.getAfterLinks(pageCount, current);
        const pos = this.config.navigationPosition;
        if (!pos || pos === PaginationNavigationPosition.ASIDE) {
            pages.unshift(...before);
            pages.push(...after);
        }
        else {
            if (pos === PaginationNavigationPosition.BEFORE) {
                pages.unshift(...before, ...after);
            }
            if (pos === PaginationNavigationPosition.AFTER) {
                pages.push(...before, ...after);
            }
        }
    }
    /**
     * Returns the start and previous links, if applicable.
     */
    getBeforeLinks(current) {
        const list = [];
        if (this.config.addStart) {
            const start = () => {
                return Object.assign({
                    label: this.config.startLabel,
                    type: PaginationItemType.START,
                }, current > 0 ? { number: 0 } : null);
            };
            list.push(start());
        }
        if (this.config.addPrevious) {
            const previous = () => {
                return Object.assign({
                    label: this.config.previousLabel,
                    type: PaginationItemType.PREVIOUS,
                }, current > 0 ? { number: current - 1 } : null);
            };
            list.push(previous());
        }
        return list;
    }
    /**
     * Returns the next and end links, if applicable.
     */
    getAfterLinks(pageCount, current) {
        const list = [];
        if (this.config.addNext) {
            const next = () => {
                return Object.assign({
                    label: this.config.nextLabel,
                    type: PaginationItemType.NEXT,
                }, current < pageCount - 1 ? { number: current + 1 } : null);
            };
            list.push(next());
        }
        if (this.config.addEnd) {
            const end = () => {
                return Object.assign({
                    label: this.config.endLabel,
                    type: PaginationItemType.END,
                }, current < pageCount - 1 ? { number: pageCount - 1 } : null);
            };
            list.push(end());
        }
        return list;
    }
    /**
     * Resolves the first page of the range we need to build.
     * This is the page that is leading up to the range of the
     * current page.
     *
     * @param pageCount The total number of pages.
     * @param current The current page number, 0-index based.
     */
    getStartOfRange(pageCount, current) {
        if (this.config.rangeCount !== undefined) {
            const count = this.config.rangeCount - 1;
            // the least number of pages before and after the current
            const delta = Math.round(count / 2);
            // ensure that we start with at least the first page
            const minStart = Math.max(0, current - delta);
            // ensures that we start with at least 1 and do not pass the last range
            const maxStart = Math.max(0, pageCount - count - 1);
            // ensure that we get at least a full range at the end
            return Math.min(maxStart, minStart);
        }
        return null;
    }
    /**
     * Returns the pagination configuration. The configuration is driven by the
     * (default) application configuration.
     *
     * The default application is limited to adding the start and end link:
     * ```ts
     *   addStart: true,
     *   addEnd: true
     * ```
     *
     * The application configuration is however merged into the following static configuration:
     * ```ts
     * {
     *   rangeCount: 3,
     *   dotsLabel: '...',
     *   startLabel: '«',
     *   previousLabel: '‹',
     *   nextLabel: '›',
     *   endLabel: '»'
     * }
     * ```
     */
    get config() {
        return Object.assign(FALLBACK_PAGINATION_OPTIONS, this.paginationConfig.pagination);
    }
}
PaginationBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PaginationBuilder, deps: [{ token: i1.PaginationConfig }], target: i0.ɵɵFactoryTarget.Injectable });
PaginationBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PaginationBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: PaginationBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PaginationConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUVMLGtCQUFrQixFQUNsQiw0QkFBNEIsR0FFN0IsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBRTVCLE1BQU0sMkJBQTJCLEdBQXNCO0lBQ3JELFVBQVUsRUFBRSxDQUFDO0lBQ2IsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLEdBQUc7SUFDZixhQUFhLEVBQUUsR0FBRztJQUNsQixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBc0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBRyxDQUFDO0lBRTVEOzs7Ozs7Ozs7T0FTRztJQUNILFFBQVEsQ0FBQyxTQUFpQixFQUFFLE9BQWU7UUFDekMsTUFBTSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFT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QTJCLEVBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQ2pDLENBQUM7SUFDSixDQUFDOzs4R0E3VFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL3BhZ2luYXRpb24uY29uZmlnJztcbmltcG9ydCB7XG4gIFBhZ2luYXRpb25JdGVtLFxuICBQYWdpbmF0aW9uSXRlbVR5cGUsXG4gIFBhZ2luYXRpb25OYXZpZ2F0aW9uUG9zaXRpb24sXG4gIFBhZ2luYXRpb25PcHRpb25zLFxufSBmcm9tICcuL3BhZ2luYXRpb24ubW9kZWwnO1xuXG5jb25zdCBGQUxMQkFDS19QQUdJTkFUSU9OX09QVElPTlM6IFBhZ2luYXRpb25PcHRpb25zID0ge1xuICByYW5nZUNvdW50OiAzLFxuICBkb3RzTGFiZWw6ICcuLi4nLFxuICBzdGFydExhYmVsOiAnwqsnLFxuICBwcmV2aW91c0xhYmVsOiAn4oC5JyxcbiAgbmV4dExhYmVsOiAn4oC6JyxcbiAgZW5kTGFiZWw6ICfCuycsXG59O1xuXG4vKipcbiAqIEJ1aWxkcyBhIHBhZ2luYXRpb24gc3RydWN0dXJlcyBiYXNlZCBvbiBhIHBhZ2VDb3VudCBhbmQgY3VycmVudCBwYWdlIG51bWJlci5cbiAqIFRoZXJlIGFyZSB2YXJpb3VzIHtAbGluayBQYWdpbmF0aW9uQ29uZmlnfSBvcHRpb25zIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZVxuICogdGhlIGJlaGF2aW9yIG9mIHRoZSBidWlsZC4gQWx0ZXJuYXRpdmVseSwgQ1NTIGNhbiBiZSB1c2VkIHRvIGZ1cnRoZXIgY3VzdG9taXplXG4gKiB0aGUgcGFnaW5hdGlvbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqIFRoZSBmdWxsIGJsb3duIHBhZ2luYXRpb24gaXRlbXMgY29udGFpbiB0aGUgZm9sbG93IGVsZW1lbnRzOlxuICpcbiAqIGDCqyDigLkgMSAuLi4gNCAoNSkgNiAuLi4gOSDigLogwrtgXG4gKlxuICogVGhpcyBpbmNsdWRlcyBwYWdpbmF0aW9uIGl0ZW1zIHRvIHRoZSBmb2xsb3dpbmcgcGFnZXM6XG4gKiAtIHN0YXJ0IHBhZ2VcbiAqIC0gcHJldmlvdXMgcGFnZVxuICogLSBmaXJzdCBwYWdlXG4gKiAtIHBhZ2UgcmFuZ2VcbiAqIC0gbGFzdCBwYWdlXG4gKiAtIG5leHQgcGFnZVxuICogLSBlbmQgcGFnZVxuICpcbiAqIEFsbCBvZiB0aG9zZSBsaW5rcyBhcmUgY29uZmlndXJhYmxlLCBpbmNsdWRpbmcgdGhlIHNpemUgb2YgdGhlIHBhZ2UgcmFuZ2UuXG4gKiBUaGUgY3VycmVudCBwYWdlIHdpbGwgYWx3YXlzIGJlIGNlbnRlcmVkIGluIHRoZSBwYWdlIHJhbmdlIHRvIHByb3ZpZGUgZGlyZWN0IGFjY2Vzc1xuICogdG8gdGhlIHByZXZpb3VzIGFuZCBuZXh0IHBhZ2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uQ29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgYSBsaXN0IG9mIGBQYWdpbmF0aW9uSXRlbWAuIFRoZSBnaXZlIHBhZ2VDb3VudCBhbmQgY3VycmVudCBhcmUgdXNlZFxuICAgKiB0byBidWlsZCBvdXQgdGhlIGZ1bGwgcGFnaW5hdGlvbi4gVGhlcmUgYXJlIHZhcmlvdXMge0BsaW5rIFBhZ2luYXRpb25Db25maWd9IG9wdGlvbnNcbiAgICogd2hpY2ggY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvciBvZiB0aGUgYnVpbGQuIEFsdGVybmF0aXZlbHksIENTU1xuICAgKiBjYW4gYmUgdXNlZCB0byBmdXJ0aGVyIHNwZWNpYWxpemUgdmlzaWJpbGl0eSBvZiB0aGUgcGFnaW5hdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHBhZ2VDb3VudCBUaGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzXG4gICAqIEBwYXJhbSBjdXJyZW50IFRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyLCAwLWluZGV4IGJhc2VkXG4gICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIGBQYWdpbmF0aW9uSXRlbWBcbiAgICovXG4gIHBhZ2luYXRlKHBhZ2VDb3VudDogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpOiBQYWdpbmF0aW9uSXRlbVtdIHtcbiAgICBjb25zdCBwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSA9IFtdO1xuICAgIGlmICghcGFnZUNvdW50IHx8IHBhZ2VDb3VudCA8IDIpIHtcbiAgICAgIHJldHVybiBwYWdlcztcbiAgICB9XG4gICAgdGhpcy5hZGRQYWdlcyhwYWdlcywgcGFnZUNvdW50LCBjdXJyZW50KTtcbiAgICB0aGlzLmFkZERvdHMocGFnZXMsIHBhZ2VDb3VudCk7XG4gICAgdGhpcy5hZGRGaXJzdExhc3QocGFnZXMsIHBhZ2VDb3VudCk7XG4gICAgdGhpcy5hZGROYXZpZ2F0aW9uKHBhZ2VzLCBwYWdlQ291bnQsIGN1cnJlbnQpO1xuXG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgcGFnZSB3aXRoIHN1cnJvdW5kaW5nIHBhZ2VzIChiYXNlZCBvbiB0aGUgYGNvbmZpZy5yYW5nZUNvdW50YCkuXG4gICAqIFRoZSBjdXJyZW50IHBhZ2UgaXMgYWx3YXlzIGNlbnRlcmVkIHRvIHByb3ZpZGUgZGlyZWN0IGFjY2VzcyB0byB0aGUgcHJldmlvdXMgYW5kIG5leHQgcGFnZS5cbiAgICpcbiAgICogQHBhcmFtIHBhZ2VzIFRoZSBsaXN0IG9mIHBhZ2UgaXRlbXMgdGhhdCBpcyB1c2VkIHRvIGFtZW5kXG4gICAqIEBwYXJhbSBwYWdlQ291bnQgVGhlIHRvdGFsIG51bWJlciBvZiBwYWdlc1xuICAgKiBAcGFyYW0gY3VycmVudCBUaGUgY3VycmVudCBwYWdlIG51bWJlciwgMC1pbmRleCBiYXNlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZFBhZ2VzKFxuICAgIHBhZ2VzOiBQYWdpbmF0aW9uSXRlbVtdLFxuICAgIHBhZ2VDb3VudDogbnVtYmVyLFxuICAgIGN1cnJlbnQ6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZ2V0U3RhcnRPZlJhbmdlKHBhZ2VDb3VudCwgY3VycmVudCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnJhbmdlQ291bnQgIT09IHVuZGVmaW5lZCAmJiBzdGFydCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgbWF4ID0gTWF0aC5taW4odGhpcy5jb25maWcucmFuZ2VDb3VudCwgcGFnZUNvdW50KTtcbiAgICAgIEFycmF5LmZyb20oQXJyYXkobWF4KSkuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgICBwYWdlcy5wdXNoKHtcbiAgICAgICAgICBudW1iZXI6IGkgKyBzdGFydCxcbiAgICAgICAgICBsYWJlbDogU3RyaW5nKGkgKyBzdGFydCArIDEpLFxuICAgICAgICAgIHR5cGU6IFBhZ2luYXRpb25JdGVtVHlwZS5QQUdFLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGRvdHMgYmVmb3JlIGFuZCBhZnRlciB0aGUgZ2l2ZW4gcGFnZXMsIGlmIGNvbmZpZ3VyZWQgKGRlZmF1bHRzIHRvIHRydWUpLlxuICAgKiBJZiB0aGUgZG90cyBvbmx5IHJlcHJlc2VudCBhIHNpbmdsZSBwYWdlLCB0aGUgcGFnZSBudW1iZXIgaXMgYWRkZWQgaW5zdGVhZCBvZlxuICAgKiB0aGUgZG90cywgdW5sZXNzIHRoZSBjb25maWd1cmF0aW9uIHJlcXVpcmVzIGRvdHMgYWx3YXlzLlxuICAgKlxuICAgKiBAcGFyYW0gcGFnZXMgVGhlIGxpc3Qgb2YgcGFnZSBpdGVtcyB0aGF0IGlzIHVzZWQgdG8gYW1lbmRcbiAgICogQHBhcmFtIHBhZ2VDb3VudCBUaGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkRG90cyhwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSwgcGFnZUNvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmFkZERvdHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRGaXJzdEdhcCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0SXRlbU51bWJlciA9IHBhZ2VzWzBdLm51bWJlcjtcbiAgICAgIGNvbnN0IGdhcE51bWJlciA9IHRoaXMuY29uZmlnLmFkZEZpcnN0ID8gMSA6IDA7XG4gICAgICBpZiAoZmlyc3RJdGVtTnVtYmVyICE9PSB1bmRlZmluZWQgJiYgZmlyc3RJdGVtTnVtYmVyID4gZ2FwTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGlzR2FwID1cbiAgICAgICAgICAhdGhpcy5jb25maWcuc3Vic3RpdHV0ZURvdHNGb3JTaW5ndWxhclBhZ2UgfHxcbiAgICAgICAgICBmaXJzdEl0ZW1OdW1iZXIgIT09IGdhcE51bWJlciArIDE7XG4gICAgICAgIGNvbnN0IGlzU3Vic3RpdHV0ZWQgPVxuICAgICAgICAgIHRoaXMuY29uZmlnLmFkZEZpcnN0ICYmXG4gICAgICAgICAgdGhpcy5jb25maWcuc3Vic3RpdHV0ZURvdHNGb3JTaW5ndWxhclBhZ2UgJiZcbiAgICAgICAgICBnYXBOdW1iZXIgPT09IDA7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBpc0dhcFxuICAgICAgICAgID8gUGFnaW5hdGlvbkl0ZW1UeXBlLkdBUFxuICAgICAgICAgIDogaXNTdWJzdGl0dXRlZFxuICAgICAgICAgID8gUGFnaW5hdGlvbkl0ZW1UeXBlLkZJUlNUXG4gICAgICAgICAgOiBQYWdpbmF0aW9uSXRlbVR5cGUuUEFHRTtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogaXNHYXAgPyB0aGlzLmNvbmZpZy5kb3RzTGFiZWwgOiBTdHJpbmcoZ2FwTnVtYmVyICsgMSksXG4gICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNHYXAgPyBudWxsIDogeyBudW1iZXI6IGdhcE51bWJlciB9XG4gICAgICAgICAgKSxcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgYWRkTGFzdEdhcCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXS5udW1iZXI7XG4gICAgICBjb25zdCBuZXh0UGFnZU51bWJlciA9IHBhZ2VOdW1iZXIgPyBwYWdlTnVtYmVyICsgMSA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGxhc3QgPSBwYWdlQ291bnQgLSAodGhpcy5jb25maWcuYWRkTGFzdCA/IDIgOiAxKTtcbiAgICAgIGlmIChuZXh0UGFnZU51bWJlciAmJiBuZXh0UGFnZU51bWJlciA8PSBsYXN0KSB7XG4gICAgICAgIGNvbnN0IGlzU3Vic3RpdHV0ZWQgPVxuICAgICAgICAgIHRoaXMuY29uZmlnLmFkZExhc3QgJiZcbiAgICAgICAgICB0aGlzLmNvbmZpZy5zdWJzdGl0dXRlRG90c0ZvclNpbmd1bGFyUGFnZSAmJlxuICAgICAgICAgIG5leHRQYWdlTnVtYmVyID09PSBsYXN0O1xuICAgICAgICBjb25zdCBpc0dhcCA9XG4gICAgICAgICAgbmV4dFBhZ2VOdW1iZXIgPFxuICAgICAgICAgIHBhZ2VDb3VudCAtXG4gICAgICAgICAgICAodGhpcy5jb25maWcuc3Vic3RpdHV0ZURvdHNGb3JTaW5ndWxhclBhZ2UgPyAxIDogMCkgLVxuICAgICAgICAgICAgKHRoaXMuY29uZmlnLmFkZExhc3QgPyAxIDogMCk7XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IGlzR2FwXG4gICAgICAgICAgPyBQYWdpbmF0aW9uSXRlbVR5cGUuR0FQXG4gICAgICAgICAgOiBpc1N1YnN0aXR1dGVkXG4gICAgICAgICAgPyBQYWdpbmF0aW9uSXRlbVR5cGUuTEFTVFxuICAgICAgICAgIDogUGFnaW5hdGlvbkl0ZW1UeXBlLlBBR0U7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6IGlzR2FwID8gdGhpcy5jb25maWcuZG90c0xhYmVsIDogU3RyaW5nKG5leHRQYWdlTnVtYmVyICsgMSksXG4gICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNHYXAgPyBudWxsIDogeyBudW1iZXI6IG5leHRQYWdlTnVtYmVyIH1cbiAgICAgICAgICApLFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBwYWdlcy51bnNoaWZ0KC4uLmFkZEZpcnN0R2FwKCkpO1xuICAgIHBhZ2VzLnB1c2goLi4uYWRkTGFzdEdhcCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbGlua3MgdG8gdGhlIGZpcnN0IGFuZCBsYXN0IHBhZ2UsIGlmIGNvbmZpZ3VyZWQgdG8gZG8gc28uXG4gICAqXG4gICAqIEBwYXJhbSBwYWdlcyBUaGUgbGlzdCBvZiBwYWdlIGl0ZW1zIHRoYXQgaXMgdXNlZCB0byBhbWVuZFxuICAgKiBAcGFyYW0gcGFnZUNvdW50IFRoZSB0b3RhbCBudW1iZXIgb2YgcGFnZXNcbiAgICpcbiAgICovXG4gIHByb3RlY3RlZCBhZGRGaXJzdExhc3QocGFnZXM6IFBhZ2luYXRpb25JdGVtW10sIHBhZ2VDb3VudDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmFkZEZpcnN0ICYmIHBhZ2VzWzBdLm51bWJlciAhPT0gMCkge1xuICAgICAgcGFnZXMudW5zaGlmdCh7XG4gICAgICAgIG51bWJlcjogMCxcbiAgICAgICAgbGFiZWw6ICcxJyxcbiAgICAgICAgdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlLkZJUlNULFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmFkZExhc3QgJiZcbiAgICAgIHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdLm51bWJlciAhPT0gcGFnZUNvdW50IC0gMVxuICAgICkge1xuICAgICAgcGFnZXMucHVzaCh7XG4gICAgICAgIG51bWJlcjogcGFnZUNvdW50IC0gMSxcbiAgICAgICAgbGFiZWw6IFN0cmluZyhwYWdlQ291bnQpLFxuICAgICAgICB0eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUuTEFTVCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbGlua3MgdG8gdGhlIHN0YXJ0LCBwcmV2aW91cywgbmV4dCBhbmQgbGFzdCBwYWdlLCBpZiBjb25maWd1cmVkIHRvIGRvIHNvLlxuICAgKiBUaGUgb3JkZXIgb2YgdGhlIGxpbmtzIGNhbiBiZSBjb25maWd1cmVkIGJ5IHVzaW5nIHRoZSB7QGxpbmsgUGFnaW5hdGlvbkNvbmZpZ30sXG4gICAqIHVzaW5nIHRoZSBgUGFnaW5hdGlvbk5hdmlnYXRpb25Qb3NpdGlvbmAgKGBCRUZPUkVgIG9yIGBBRlRFUmApLlxuICAgKiBUaGUgYFBhZ2luYXRpb25OYXZpZ2F0aW9uUG9zaXRpb25gIGFsbG93cyBmb3IgMyBmbGF2b3VyczpcbiAgICpcbiAgICogLSBieSBkZWZhdWx0IHRoZSBwYWdpbmF0aW9uIHN0YXJ0cyB3aXRoIHN0YXJ0IGFuZCBwcmV2aW91cyBhbmQgZW5kcyB3aXRoIHRoZSBuZXh0IGFuZCBlbmQgbGlua3NcbiAgICogLSBCRUZPUkUg4oCTIGFsbCBuYXZpZ2F0aW9uIGxpbmtzIGFyZSBhZGRlZCBpbiB0aGUgZnJvbnQgb2YgdGhlIHBhZ2luYXRpb24gbGlzdFxuICAgKiAtIEFGVEVSIOKAkyBhbGwgbmF2aWdhdGlvbiBsaW5rcyBhcmUgcHVzaGVkIHRvIHRoZSBlbmQgb2YgdGhlIHBhZ2luYXRpb24gbGlzdFxuICAgKlxuICAgKiBAcGFyYW0gcGFnZXMgVGhlIGxpc3Qgb2YgcGFnZSBpdGVtcyB0aGF0IGlzIHVzZWQgdG8gYW1lbmRcbiAgICogQHBhcmFtIHBhZ2VDb3VudCBUaGUgdG90YWwgbnVtYmVyIG9mIHBhZ2VzXG4gICAqIEBwYXJhbSBjdXJyZW50IFRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyLCAwLWluZGV4IGJhc2VkXG4gICAqXG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkTmF2aWdhdGlvbihcbiAgICBwYWdlczogUGFnaW5hdGlvbkl0ZW1bXSxcbiAgICBwYWdlQ291bnQ6IG51bWJlcixcbiAgICBjdXJyZW50OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYmVmb3JlID0gdGhpcy5nZXRCZWZvcmVMaW5rcyhjdXJyZW50KTtcbiAgICBjb25zdCBhZnRlciA9IHRoaXMuZ2V0QWZ0ZXJMaW5rcyhwYWdlQ291bnQsIGN1cnJlbnQpO1xuICAgIGNvbnN0IHBvcyA9IHRoaXMuY29uZmlnLm5hdmlnYXRpb25Qb3NpdGlvbjtcbiAgICBpZiAoIXBvcyB8fCBwb3MgPT09IFBhZ2luYXRpb25OYXZpZ2F0aW9uUG9zaXRpb24uQVNJREUpIHtcbiAgICAgIHBhZ2VzLnVuc2hpZnQoLi4uYmVmb3JlKTtcbiAgICAgIHBhZ2VzLnB1c2goLi4uYWZ0ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocG9zID09PSBQYWdpbmF0aW9uTmF2aWdhdGlvblBvc2l0aW9uLkJFRk9SRSkge1xuICAgICAgICBwYWdlcy51bnNoaWZ0KC4uLmJlZm9yZSwgLi4uYWZ0ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKHBvcyA9PT0gUGFnaW5hdGlvbk5hdmlnYXRpb25Qb3NpdGlvbi5BRlRFUikge1xuICAgICAgICBwYWdlcy5wdXNoKC4uLmJlZm9yZSwgLi4uYWZ0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdGFydCBhbmQgcHJldmlvdXMgbGlua3MsIGlmIGFwcGxpY2FibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0QmVmb3JlTGlua3MoY3VycmVudDogbnVtYmVyKTogUGFnaW5hdGlvbkl0ZW1bXSB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmFkZFN0YXJ0KSB7XG4gICAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMuY29uZmlnLnN0YXJ0TGFiZWwsXG4gICAgICAgICAgICB0eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUuU1RBUlQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdXJyZW50ID4gMCA/IHsgbnVtYmVyOiAwIH0gOiBudWxsXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgbGlzdC5wdXNoKHN0YXJ0KCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuYWRkUHJldmlvdXMpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy5jb25maWcucHJldmlvdXNMYWJlbCxcbiAgICAgICAgICAgIHR5cGU6IFBhZ2luYXRpb25JdGVtVHlwZS5QUkVWSU9VUyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1cnJlbnQgPiAwID8geyBudW1iZXI6IGN1cnJlbnQgLSAxIH0gOiBudWxsXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgbGlzdC5wdXNoKHByZXZpb3VzKCkpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0IGFuZCBlbmQgbGlua3MsIGlmIGFwcGxpY2FibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0QWZ0ZXJMaW5rcyhcbiAgICBwYWdlQ291bnQ6IG51bWJlcixcbiAgICBjdXJyZW50OiBudW1iZXJcbiAgKTogUGFnaW5hdGlvbkl0ZW1bXSB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmFkZE5leHQpIHtcbiAgICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmNvbmZpZy5uZXh0TGFiZWwsXG4gICAgICAgICAgICB0eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUuTkVYVCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1cnJlbnQgPCBwYWdlQ291bnQgLSAxID8geyBudW1iZXI6IGN1cnJlbnQgKyAxIH0gOiBudWxsXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgbGlzdC5wdXNoKG5leHQoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5hZGRFbmQpIHtcbiAgICAgIGNvbnN0IGVuZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMuY29uZmlnLmVuZExhYmVsLFxuICAgICAgICAgICAgdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlLkVORCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1cnJlbnQgPCBwYWdlQ291bnQgLSAxID8geyBudW1iZXI6IHBhZ2VDb3VudCAtIDEgfSA6IG51bGxcbiAgICAgICAgKTtcbiAgICAgIH07XG4gICAgICBsaXN0LnB1c2goZW5kKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xuICB9XG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgZmlyc3QgcGFnZSBvZiB0aGUgcmFuZ2Ugd2UgbmVlZCB0byBidWlsZC5cbiAgICogVGhpcyBpcyB0aGUgcGFnZSB0aGF0IGlzIGxlYWRpbmcgdXAgdG8gdGhlIHJhbmdlIG9mIHRoZVxuICAgKiBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYWdlQ291bnQgVGhlIHRvdGFsIG51bWJlciBvZiBwYWdlcy5cbiAgICogQHBhcmFtIGN1cnJlbnQgVGhlIGN1cnJlbnQgcGFnZSBudW1iZXIsIDAtaW5kZXggYmFzZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0U3RhcnRPZlJhbmdlKHBhZ2VDb3VudDogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAodGhpcy5jb25maWcucmFuZ2VDb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjb3VudCA9IHRoaXMuY29uZmlnLnJhbmdlQ291bnQgLSAxO1xuICAgICAgLy8gdGhlIGxlYXN0IG51bWJlciBvZiBwYWdlcyBiZWZvcmUgYW5kIGFmdGVyIHRoZSBjdXJyZW50XG4gICAgICBjb25zdCBkZWx0YSA9IE1hdGgucm91bmQoY291bnQgLyAyKTtcblxuICAgICAgLy8gZW5zdXJlIHRoYXQgd2Ugc3RhcnQgd2l0aCBhdCBsZWFzdCB0aGUgZmlyc3QgcGFnZVxuICAgICAgY29uc3QgbWluU3RhcnQgPSBNYXRoLm1heCgwLCBjdXJyZW50IC0gZGVsdGEpO1xuICAgICAgLy8gZW5zdXJlcyB0aGF0IHdlIHN0YXJ0IHdpdGggYXQgbGVhc3QgMSBhbmQgZG8gbm90IHBhc3MgdGhlIGxhc3QgcmFuZ2VcbiAgICAgIGNvbnN0IG1heFN0YXJ0ID0gTWF0aC5tYXgoMCwgcGFnZUNvdW50IC0gY291bnQgLSAxKTtcblxuICAgICAgLy8gZW5zdXJlIHRoYXQgd2UgZ2V0IGF0IGxlYXN0IGEgZnVsbCByYW5nZSBhdCB0aGUgZW5kXG4gICAgICByZXR1cm4gTWF0aC5taW4obWF4U3RhcnQsIG1pblN0YXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGFnaW5hdGlvbiBjb25maWd1cmF0aW9uLiBUaGUgY29uZmlndXJhdGlvbiBpcyBkcml2ZW4gYnkgdGhlXG4gICAqIChkZWZhdWx0KSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBUaGUgZGVmYXVsdCBhcHBsaWNhdGlvbiBpcyBsaW1pdGVkIHRvIGFkZGluZyB0aGUgc3RhcnQgYW5kIGVuZCBsaW5rOlxuICAgKiBgYGB0c1xuICAgKiAgIGFkZFN0YXJ0OiB0cnVlLFxuICAgKiAgIGFkZEVuZDogdHJ1ZVxuICAgKiBgYGBcbiAgICpcbiAgICogVGhlIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gaXMgaG93ZXZlciBtZXJnZWQgaW50byB0aGUgZm9sbG93aW5nIHN0YXRpYyBjb25maWd1cmF0aW9uOlxuICAgKiBgYGB0c1xuICAgKiB7XG4gICAqICAgcmFuZ2VDb3VudDogMyxcbiAgICogICBkb3RzTGFiZWw6ICcuLi4nLFxuICAgKiAgIHN0YXJ0TGFiZWw6ICfCqycsXG4gICAqICAgcHJldmlvdXNMYWJlbDogJ+KAuScsXG4gICAqICAgbmV4dExhYmVsOiAn4oC6JyxcbiAgICogICBlbmRMYWJlbDogJ8K7J1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldCBjb25maWcoKTogUGFnaW5hdGlvbk9wdGlvbnMge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgRkFMTEJBQ0tfUEFHSU5BVElPTl9PUFRJT05TLFxuICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLnBhZ2luYXRpb25cbiAgICApO1xuICB9XG59XG4iXX0=