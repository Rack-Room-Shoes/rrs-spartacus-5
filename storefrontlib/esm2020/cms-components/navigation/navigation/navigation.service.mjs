/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class NavigationService {
    constructor(cmsService, semanticPathService) {
        this.cmsService = cmsService;
        this.semanticPathService = semanticPathService;
    }
    createNavigation(data$) {
        return combineLatest([data$, this.getNavigationNode(data$)]).pipe(map(([data, nav]) => {
            return {
                title: data.name,
                children: [nav],
            };
        }));
    }
    /**
     * returns an observable with the `NavigationNode` for the given `CmsNavigationComponent`.
     * This function will load the navigation underlying entries and children if they haven't been
     * loaded so far.
     */
    getNavigationNode(data$) {
        if (!data$) {
            return of();
        }
        return data$.pipe(filter((data) => !!data), switchMap((data) => {
            const navigation = data.navigationNode ? data.navigationNode : data;
            return this.cmsService
                .getNavigationEntryItems(navigation.uid ?? '')
                .pipe(tap((items) => {
                if (items === undefined) {
                    this.loadNavigationEntryItems(navigation, true);
                }
                else {
                    // we should check whether the existing node items are what expected
                    const expectedItems = [];
                    this.loadNavigationEntryItems(navigation, false, expectedItems);
                    const existingItems = Object.keys(items).map((key) => items[key].uid ?? '');
                    const missingItems = expectedItems.filter((it) => it.id && !existingItems.includes(it.id));
                    if (missingItems.length > 0) {
                        this.cmsService.loadNavigationItems(navigation.uid ?? '', missingItems);
                    }
                }
            }), filter(Boolean), map((items) => this.populateNavigationNode(navigation, items) ?? {}));
        }));
    }
    /**
     * Loads all navigation entry items' type and id. Dispatch action to load all these items
     * @param nodeData
     * @param root
     * @param itemsList
     */
    loadNavigationEntryItems(nodeData, root, itemsList = []) {
        if (nodeData.entries && nodeData.entries.length > 0) {
            nodeData.entries.forEach((entry) => {
                itemsList.push({
                    superType: entry.itemSuperType,
                    id: entry.itemId,
                });
            });
        }
        if (nodeData.children && nodeData.children.length > 0) {
            nodeData.children.forEach((child) => this.loadNavigationEntryItems(child, false, itemsList));
        }
        if (root && nodeData.uid) {
            this.cmsService.loadNavigationItems(nodeData.uid, itemsList);
        }
    }
    /**
     * Create a new node tree for the view
     * @param nodeData
     * @param items
     */
    populateNavigationNode(nodeData, items) {
        const node = {};
        if (nodeData.title) {
            // the node title will be populated by the first entry (if any)
            // if there's no nodeData.title available
            node.title = nodeData.title;
        }
        // populate style classes to apply CMS driven styling
        if (nodeData.styleClasses) {
            node.styleClasses = nodeData.styleClasses;
        }
        // populate style attributes to apply CMS driven styling
        if (nodeData.styleAttributes) {
            node.styleAttributes = nodeData.styleAttributes;
        }
        if (nodeData.entries && nodeData.entries.length > 0) {
            this.populateLink(node, nodeData.entries[0], items);
        }
        if (nodeData.children?.length > 0) {
            const children = nodeData.children
                .map((child) => this.populateNavigationNode(child, items))
                .filter(Boolean);
            if (children.length > 0) {
                node.children = children;
            }
        }
        // return null in case there are no children
        return Object.keys(node).length === 0 ? null : node;
    }
    /**
     * The node link is driven by the first entry.
     */
    populateLink(node, entry, items) {
        const item = items[`${entry.itemId}_${entry.itemSuperType}`];
        // now we only consider CMSLinkComponent
        if (item && entry.itemType === 'CMSLinkComponent') {
            if (!node.title) {
                node.title = item.linkName;
            }
            const url = this.getLink(item);
            // only populate the node link if we have a visible node
            if (node.title && url) {
                node.url = url;
                // the backend provide boolean value for the target
                // in case the link should be opened in a new window
                if (item.target === 'true' || item.target === true) {
                    node.target = '_blank';
                }
            }
            // populate style classes to apply CMS driven styling
            if (item.styleClasses) {
                node.styleClasses = item.styleClasses;
            }
            // populate style attributes to apply CMS driven styling
            if (item.styleAttributes) {
                node.styleAttributes = item.styleAttributes;
            }
        }
    }
    /**
     *
     * Gets the URL or link to a related item (category),
     * also taking into account content pages (contentPageLabelOrId)
     * and product pages (productCode)
     */
    getLink(item) {
        if (item.url) {
            return item.url;
        }
        else if (item.contentPageLabelOrId) {
            return item.contentPageLabelOrId;
        }
        else if (item.categoryCode) {
            return this.semanticPathService.transform({
                cxRoute: 'category',
                params: {
                    code: item.categoryCode,
                    name: item.name,
                },
            });
        }
        else if (item.productCode) {
            return this.semanticPathService.transform({
                cxRoute: 'product',
                params: {
                    code: item.productCode,
                    name: item.name,
                },
            });
        }
    }
}
NavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationService, deps: [{ token: i1.CmsService }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: NavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTTdELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFDWSxVQUFzQixFQUN0QixtQkFBd0M7UUFEeEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQ2pELENBQUM7SUFFRyxnQkFBZ0IsQ0FDckIsS0FBeUM7UUFFekMsT0FBTyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQy9ELEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDbEIsT0FBTztnQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUJBQWlCLENBQ3RCLEtBQXlDO1FBRXpDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQyxJ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RTtZQUNaLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNqQjthQUFNLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQ2xDO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVk7b0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7YUFDRixDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7aUJBQ2hCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs4R0ExTVUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zTmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgQ21zTmF2aWdhdGlvbk5vZGUsXG4gIENtc1NlcnZpY2UsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk5vZGUgfSBmcm9tICcuL25hdmlnYXRpb24tbm9kZS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjbXNTZXJ2aWNlOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlXG4gICkge31cblxuICBwdWJsaWMgY3JlYXRlTmF2aWdhdGlvbihcbiAgICBkYXRhJDogT2JzZXJ2YWJsZTxDbXNOYXZpZ2F0aW9uQ29tcG9uZW50PlxuICApOiBPYnNlcnZhYmxlPE5hdmlnYXRpb25Ob2RlPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW2RhdGEkLCB0aGlzLmdldE5hdmlnYXRpb25Ob2RlKGRhdGEkKV0pLnBpcGUoXG4gICAgICBtYXAoKFtkYXRhLCBuYXZdKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6IGRhdGEubmFtZSxcbiAgICAgICAgICBjaGlsZHJlbjogW25hdl0sXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBvYnNlcnZhYmxlIHdpdGggdGhlIGBOYXZpZ2F0aW9uTm9kZWAgZm9yIHRoZSBnaXZlbiBgQ21zTmF2aWdhdGlvbkNvbXBvbmVudGAuXG4gICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIHRoZSBuYXZpZ2F0aW9uIHVuZGVybHlpbmcgZW50cmllcyBhbmQgY2hpbGRyZW4gaWYgdGhleSBoYXZlbid0IGJlZW5cbiAgICogbG9hZGVkIHNvIGZhci5cbiAgICovXG4gIHB1YmxpYyBnZXROYXZpZ2F0aW9uTm9kZShcbiAgICBkYXRhJDogT2JzZXJ2YWJsZTxDbXNOYXZpZ2F0aW9uQ29tcG9uZW50PlxuICApOiBPYnNlcnZhYmxlPE5hdmlnYXRpb25Ob2RlPiB7XG4gICAgaWYgKCFkYXRhJCkge1xuICAgICAgcmV0dXJuIG9mKCk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhJC5waXBlKFxuICAgICAgZmlsdGVyKChkYXRhKSA9PiAhIWRhdGEpLFxuICAgICAgc3dpdGNoTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb24gPSBkYXRhLm5hdmlnYXRpb25Ob2RlID8gZGF0YS5uYXZpZ2F0aW9uTm9kZSA6IGRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzLmNtc1NlcnZpY2VcbiAgICAgICAgICAuZ2V0TmF2aWdhdGlvbkVudHJ5SXRlbXMobmF2aWdhdGlvbi51aWQgPz8gJycpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoKGl0ZW1zKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTmF2aWdhdGlvbkVudHJ5SXRlbXMobmF2aWdhdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGNoZWNrIHdoZXRoZXIgdGhlIGV4aXN0aW5nIG5vZGUgaXRlbXMgYXJlIHdoYXQgZXhwZWN0ZWRcbiAgICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZEl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgICBzdXBlclR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVtdID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTmF2aWdhdGlvbkVudHJ5SXRlbXMobmF2aWdhdGlvbiwgZmFsc2UsIGV4cGVjdGVkSXRlbXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbXMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKFxuICAgICAgICAgICAgICAgICAgKGtleSkgPT4gaXRlbXNba2V5XS51aWQgPz8gJydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdJdGVtcyA9IGV4cGVjdGVkSXRlbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgKGl0KSA9PiBpdC5pZCAmJiAhZXhpc3RpbmdJdGVtcy5pbmNsdWRlcyhpdC5pZClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChtaXNzaW5nSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jbXNTZXJ2aWNlLmxvYWROYXZpZ2F0aW9uSXRlbXMoXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24udWlkID8/ICcnLFxuICAgICAgICAgICAgICAgICAgICBtaXNzaW5nSXRlbXNcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGZpbHRlcihCb29sZWFuKSxcbiAgICAgICAgICAgIG1hcCgoaXRlbXMpID0+IHRoaXMucG9wdWxhdGVOYXZpZ2F0aW9uTm9kZShuYXZpZ2F0aW9uLCBpdGVtcykgPz8ge30pXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhbGwgbmF2aWdhdGlvbiBlbnRyeSBpdGVtcycgdHlwZSBhbmQgaWQuIERpc3BhdGNoIGFjdGlvbiB0byBsb2FkIGFsbCB0aGVzZSBpdGVtc1xuICAgKiBAcGFyYW0gbm9kZURhdGFcbiAgICogQHBhcmFtIHJvb3RcbiAgICogQHBhcmFtIGl0ZW1zTGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkTmF2aWdhdGlvbkVudHJ5SXRlbXMoXG4gICAgbm9kZURhdGE6IENtc05hdmlnYXRpb25Ob2RlLFxuICAgIHJvb3Q6IGJvb2xlYW4sXG4gICAgaXRlbXNMaXN0OiB7IHN1cGVyVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkOyBpZDogc3RyaW5nIHwgdW5kZWZpbmVkIH1bXSA9IFtdXG4gICk6IHZvaWQge1xuICAgIGlmIChub2RlRGF0YS5lbnRyaWVzICYmIG5vZGVEYXRhLmVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZURhdGEuZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICBpdGVtc0xpc3QucHVzaCh7XG4gICAgICAgICAgc3VwZXJUeXBlOiBlbnRyeS5pdGVtU3VwZXJUeXBlLFxuICAgICAgICAgIGlkOiBlbnRyeS5pdGVtSWQsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGVEYXRhLmNoaWxkcmVuICYmIG5vZGVEYXRhLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVEYXRhLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PlxuICAgICAgICB0aGlzLmxvYWROYXZpZ2F0aW9uRW50cnlJdGVtcyhjaGlsZCwgZmFsc2UsIGl0ZW1zTGlzdClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3QgJiYgbm9kZURhdGEudWlkKSB7XG4gICAgICB0aGlzLmNtc1NlcnZpY2UubG9hZE5hdmlnYXRpb25JdGVtcyhub2RlRGF0YS51aWQsIGl0ZW1zTGlzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBub2RlIHRyZWUgZm9yIHRoZSB2aWV3XG4gICAqIEBwYXJhbSBub2RlRGF0YVxuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIHByaXZhdGUgcG9wdWxhdGVOYXZpZ2F0aW9uTm9kZShcbiAgICBub2RlRGF0YTogYW55LFxuICAgIGl0ZW1zOiBhbnlcbiAgKTogTmF2aWdhdGlvbk5vZGUgfCBudWxsIHtcbiAgICBjb25zdCBub2RlOiBOYXZpZ2F0aW9uTm9kZSA9IHt9O1xuXG4gICAgaWYgKG5vZGVEYXRhLnRpdGxlKSB7XG4gICAgICAvLyB0aGUgbm9kZSB0aXRsZSB3aWxsIGJlIHBvcHVsYXRlZCBieSB0aGUgZmlyc3QgZW50cnkgKGlmIGFueSlcbiAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gbm9kZURhdGEudGl0bGUgYXZhaWxhYmxlXG4gICAgICBub2RlLnRpdGxlID0gbm9kZURhdGEudGl0bGU7XG4gICAgfVxuXG4gICAgLy8gcG9wdWxhdGUgc3R5bGUgY2xhc3NlcyB0byBhcHBseSBDTVMgZHJpdmVuIHN0eWxpbmdcbiAgICBpZiAobm9kZURhdGEuc3R5bGVDbGFzc2VzKSB7XG4gICAgICBub2RlLnN0eWxlQ2xhc3NlcyA9IG5vZGVEYXRhLnN0eWxlQ2xhc3NlcztcbiAgICB9XG4gICAgLy8gcG9wdWxhdGUgc3R5bGUgYXR0cmlidXRlcyB0byBhcHBseSBDTVMgZHJpdmVuIHN0eWxpbmdcbiAgICBpZiAobm9kZURhdGEuc3R5bGVBdHRyaWJ1dGVzKSB7XG4gICAgICBub2RlLnN0eWxlQXR0cmlidXRlcyA9IG5vZGVEYXRhLnN0eWxlQXR0cmlidXRlcztcbiAgICB9XG5cbiAgICBpZiAobm9kZURhdGEuZW50cmllcyAmJiBub2RlRGF0YS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucG9wdWxhdGVMaW5rKG5vZGUsIG5vZGVEYXRhLmVudHJpZXNbMF0sIGl0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZURhdGEuY2hpbGRyZW4/Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZURhdGEuY2hpbGRyZW5cbiAgICAgICAgLm1hcCgoY2hpbGQ6IGFueSkgPT4gdGhpcy5wb3B1bGF0ZU5hdmlnYXRpb25Ob2RlKGNoaWxkLCBpdGVtcykpXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIG51bGwgaW4gY2FzZSB0aGVyZSBhcmUgbm8gY2hpbGRyZW5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMobm9kZSkubGVuZ3RoID09PSAwID8gbnVsbCA6IG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5vZGUgbGluayBpcyBkcml2ZW4gYnkgdGhlIGZpcnN0IGVudHJ5LlxuICAgKi9cbiAgcHJpdmF0ZSBwb3B1bGF0ZUxpbmsobm9kZTogTmF2aWdhdGlvbk5vZGUsIGVudHJ5OiBhbnksIGl0ZW1zOiBhbnkpIHtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbYCR7ZW50cnkuaXRlbUlkfV8ke2VudHJ5Lml0ZW1TdXBlclR5cGV9YF07XG5cbiAgICAvLyBub3cgd2Ugb25seSBjb25zaWRlciBDTVNMaW5rQ29tcG9uZW50XG4gICAgaWYgKGl0ZW0gJiYgZW50cnkuaXRlbVR5cGUgPT09ICdDTVNMaW5rQ29tcG9uZW50Jykge1xuICAgICAgaWYgKCFub2RlLnRpdGxlKSB7XG4gICAgICAgIG5vZGUudGl0bGUgPSBpdGVtLmxpbmtOYW1lO1xuICAgICAgfVxuICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMaW5rKGl0ZW0pO1xuICAgICAgLy8gb25seSBwb3B1bGF0ZSB0aGUgbm9kZSBsaW5rIGlmIHdlIGhhdmUgYSB2aXNpYmxlIG5vZGVcbiAgICAgIGlmIChub2RlLnRpdGxlICYmIHVybCkge1xuICAgICAgICBub2RlLnVybCA9IHVybDtcbiAgICAgICAgLy8gdGhlIGJhY2tlbmQgcHJvdmlkZSBib29sZWFuIHZhbHVlIGZvciB0aGUgdGFyZ2V0XG4gICAgICAgIC8vIGluIGNhc2UgdGhlIGxpbmsgc2hvdWxkIGJlIG9wZW5lZCBpbiBhIG5ldyB3aW5kb3dcbiAgICAgICAgaWYgKGl0ZW0udGFyZ2V0ID09PSAndHJ1ZScgfHwgaXRlbS50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgICAgICBub2RlLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBwb3B1bGF0ZSBzdHlsZSBjbGFzc2VzIHRvIGFwcGx5IENNUyBkcml2ZW4gc3R5bGluZ1xuICAgICAgaWYgKGl0ZW0uc3R5bGVDbGFzc2VzKSB7XG4gICAgICAgIG5vZGUuc3R5bGVDbGFzc2VzID0gaXRlbS5zdHlsZUNsYXNzZXM7XG4gICAgICB9XG4gICAgICAvLyBwb3B1bGF0ZSBzdHlsZSBhdHRyaWJ1dGVzIHRvIGFwcGx5IENNUyBkcml2ZW4gc3R5bGluZ1xuICAgICAgaWYgKGl0ZW0uc3R5bGVBdHRyaWJ1dGVzKSB7XG4gICAgICAgIG5vZGUuc3R5bGVBdHRyaWJ1dGVzID0gaXRlbS5zdHlsZUF0dHJpYnV0ZXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEdldHMgdGhlIFVSTCBvciBsaW5rIHRvIGEgcmVsYXRlZCBpdGVtIChjYXRlZ29yeSksXG4gICAqIGFsc28gdGFraW5nIGludG8gYWNjb3VudCBjb250ZW50IHBhZ2VzIChjb250ZW50UGFnZUxhYmVsT3JJZClcbiAgICogYW5kIHByb2R1Y3QgcGFnZXMgKHByb2R1Y3RDb2RlKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldExpbmsoaXRlbTogYW55KTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQge1xuICAgIGlmIChpdGVtLnVybCkge1xuICAgICAgcmV0dXJuIGl0ZW0udXJsO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jb250ZW50UGFnZUxhYmVsT3JJZCkge1xuICAgICAgcmV0dXJuIGl0ZW0uY29udGVudFBhZ2VMYWJlbE9ySWQ7XG4gICAgfSBlbHNlIGlmIChpdGVtLmNhdGVnb3J5Q29kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS50cmFuc2Zvcm0oe1xuICAgICAgICBjeFJvdXRlOiAnY2F0ZWdvcnknLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBjb2RlOiBpdGVtLmNhdGVnb3J5Q29kZSxcbiAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0ucHJvZHVjdENvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UudHJhbnNmb3JtKHtcbiAgICAgICAgY3hSb3V0ZTogJ3Byb2R1Y3QnLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBjb2RlOiBpdGVtLnByb2R1Y3RDb2RlLFxuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19