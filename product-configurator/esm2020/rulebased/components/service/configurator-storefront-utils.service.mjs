/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../core/facade/configurator-groups.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
export class ConfiguratorStorefrontUtilsService {
    constructor(configuratorGroupsService, windowRef, keyboardFocusService) {
        this.configuratorGroupsService = configuratorGroupsService;
        this.windowRef = windowRef;
        this.keyboardFocusService = keyboardFocusService;
    }
    /**
     * Does the configuration belong to a cart entry, or has the group been visited already?
     * In both cases we need to render indications for mandatory attributes.
     * This method emits only once and then stops further emissions.
     *
     * @param {CommonConfigurator.Owner} owner -
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
     */
    isCartEntryOrGroupVisited(owner, groupId) {
        return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(take(1), map((result) => result ? true : owner.type === CommonConfigurator.OwnerType.CART_ENTRY));
    }
    /**
     * Assemble an attribute value with the currently selected values from a checkbox list.
     *
     * @param {FormControl[]} controlArray - Control array
     * @param {Configurator.Attribute} attribute -  Configuration attribute
     * @return {Configurator.Value[]} - list of configurator values
     */
    assembleValuesForMultiSelectAttributes(controlArray, attribute) {
        const localAssembledValues = [];
        for (let i = 0; i < controlArray.length; i++) {
            const value = attribute.values ? attribute.values[i] : undefined;
            if (value) {
                const localAttributeValue = {
                    valueCode: value.valueCode,
                };
                localAttributeValue.name = value.name;
                localAttributeValue.quantity = value.quantity;
                localAttributeValue.selected = controlArray[i].value;
                localAssembledValues.push(localAttributeValue);
            }
            else {
                if (isDevMode()) {
                    console.warn('ControlArray does not match values, at least one value could not been found');
                }
            }
        }
        return localAssembledValues;
    }
    /**
     * Scrolls to the corresponding HTML element.
     *
     * @param {Element | HTMLElement} element - HTML element
     */
    scroll(element) {
        let topOffset = 0;
        if (element instanceof HTMLElement) {
            topOffset = element.offsetTop;
        }
        this.windowRef.nativeWindow?.scroll(0, topOffset);
    }
    /**
     * Scrolls to the corresponding configuration element in the HTML tree.
     *
     * @param {string} selector - Selector of the HTML element
     */
    scrollToConfigurationElement(selector) {
        if (this.windowRef.isBrowser()) {
            // we don't want to run this logic when doing SSR
            const element = this.getElement(selector);
            if (element) {
                this.scroll(element);
            }
        }
    }
    /**
     * Focus the first attribute in the form.
     */
    focusFirstAttribute() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }
    getFocusableElementById(focusableElements, id) {
        return focusableElements.find((focusableElement) => {
            if (id) {
                if (focusableElement.nodeName.toLocaleLowerCase().indexOf(id) !== -1 ||
                    focusableElement.id.indexOf(id) !== -1) {
                    return focusableElement;
                }
            }
        });
    }
    getFocusableConflictDescription(focusableElements) {
        return this.getFocusableElementById(focusableElements, 'cx-configurator-conflict-description');
    }
    getFocusableElementByValueUiKey(focusableElements, valueUiKey) {
        return this.getFocusableElementById(focusableElements, valueUiKey);
    }
    getFocusableElementByAttributeId(focusableElements, attributeName) {
        return this.getFocusableElementById(focusableElements, attributeName);
    }
    createAttributeValueUiKey(attributeId, valueId) {
        return attributeId + '--' + valueId;
    }
    /**
     * Focus a value in the form.
     *
     * @param {Configurator.Attribute} attribute - Attribute
     */
    focusValue(attribute) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements.length > 0) {
                let foundFocusableElement = this.getFocusableConflictDescription(focusableElements);
                if (!foundFocusableElement) {
                    const selectedValue = attribute.values?.find((value) => value.selected);
                    if (selectedValue) {
                        const valueUiKey = this.createAttributeValueUiKey(attribute.name, selectedValue.valueCode);
                        foundFocusableElement = this.getFocusableElementByValueUiKey(focusableElements, valueUiKey);
                    }
                    if (!foundFocusableElement) {
                        foundFocusableElement = this.getFocusableElementByAttributeId(focusableElements, attribute.name);
                    }
                }
                if (foundFocusableElement) {
                    foundFocusableElement.focus();
                }
            }
        }
    }
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId) {
        if (groupId) {
            return groupId + '-group';
        }
    }
    /**
     * Persist the keyboard focus state for the given key.
     * The focus is stored globally or for the given group.
     *
     * @param {string} key - key
     * @param {string} group? - Group
     */
    setFocus(key, group) {
        if (key) {
            this.keyboardFocusService.set(key, group);
        }
    }
    /**
     * Change styling of element
     *
     * @param querySelector - querySelector
     * @param property - CSS property
     * @param value - CSS value
     */
    changeStyling(querySelector, property, value) {
        const element = this.getElement(querySelector);
        if (element) {
            element.style.setProperty(property, value);
        }
    }
    /**
     * Get HTML element based on querySelector when running in browser
     *
     * @param querySelector - querySelector
     * @returns selected HTML element
     */
    getElement(querySelector) {
        if (this.windowRef.isBrowser()) {
            return this.windowRef.document.querySelector(querySelector);
        }
    }
}
ConfiguratorStorefrontUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorStorefrontUtilsService, deps: [{ token: i1.ConfiguratorGroupsService }, { token: i2.WindowRef }, { token: i3.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorStorefrontUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorStorefrontUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorStorefrontUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorGroupsService }, { type: i2.WindowRef }, { type: i3.KeyboardFocusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXN0b3JlZnJvbnQtdXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9zZXJ2aWNlL2NvbmZpZ3VyYXRvci1zdG9yZWZyb250LXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRzVFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBTzNDLE1BQU0sT0FBTyxrQ0FBa0M7SUFDN0MsWUFDWSx5QkFBb0QsRUFDcEQsU0FBb0IsRUFDcEIsb0JBQTBDO1FBRjFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ25ELENBQUM7SUFFSjs7Ozs7Ozs7T0FRRztJQUNILHlCQUF5QixDQUN2QixLQUErQixFQUMvQixPQUFlO1FBRWYsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3ZFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQ3ZFLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxzQ0FBc0Ms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QUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDMUMsYUFBYSxDQUNDLENBQUM7U0FDbEI7SUFDSCxDQUFDOzsrSEF6UFUsa0NBQWtDO21JQUFsQyxrQ0FBa0MsY0FGakMsTUFBTTsyRkFFUCxrQ0FBa0M7a0JBSDlDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yR3JvdXBzU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvZmFjYWRlL2NvbmZpZ3VyYXRvci1ncm91cHMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JTdG9yZWZyb250VXRpbHNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2U6IENvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpbmRvd1JlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBrZXlib2FyZEZvY3VzU2VydmljZTogS2V5Ym9hcmRGb2N1c1NlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBEb2VzIHRoZSBjb25maWd1cmF0aW9uIGJlbG9uZyB0byBhIGNhcnQgZW50cnksIG9yIGhhcyB0aGUgZ3JvdXAgYmVlbiB2aXNpdGVkIGFscmVhZHk/XG4gICAqIEluIGJvdGggY2FzZXMgd2UgbmVlZCB0byByZW5kZXIgaW5kaWNhdGlvbnMgZm9yIG1hbmRhdG9yeSBhdHRyaWJ1dGVzLlxuICAgKiBUaGlzIG1ldGhvZCBlbWl0cyBvbmx5IG9uY2UgYW5kIHRoZW4gc3RvcHMgZnVydGhlciBlbWlzc2lvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tbW9uQ29uZmlndXJhdG9yLk93bmVyfSBvd25lciAtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSURcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxib29sZWFuPn0gLSBSZXR1cm5zICdPYnNlcnZhYmxlPHRydWU+JyBpZiB0aGUgY2FydCBlbnRyeSBvciBncm91cCBhcmUgdmlzaXRlZCwgb3RoZXJ3aXNlICdPYnNlcnZhYmxlPGZhbHNlPidcbiAgICovXG4gIGlzQ2FydEVudHJ5T3JHcm91cFZpc2l0ZWQoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcixcbiAgICBncm91cElkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdG9yR3JvdXBzU2VydmljZS5pc0dyb3VwVmlzaXRlZChvd25lciwgZ3JvdXBJZCkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKHJlc3VsdCkgPT5cbiAgICAgICAgcmVzdWx0ID8gdHJ1ZSA6IG93bmVyLnR5cGUgPT09IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclR5cGUuQ0FSVF9FTlRSWVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQXNzZW1ibGUgYW4gYXR0cmlidXRlIHZhbHVlIHdpdGggdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB2YWx1ZXMgZnJvbSBhIGNoZWNrYm94IGxpc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7Rm9ybUNvbnRyb2xbXX0gY29udHJvbEFycmF5IC0gQ29udHJvbCBhcnJheVxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5BdHRyaWJ1dGV9IGF0dHJpYnV0ZSAtICBDb25maWd1cmF0aW9uIGF0dHJpYnV0ZVxuICAgKiBAcmV0dXJuIHtDb25maWd1cmF0b3IuVmFsdWVbXX0gLSBsaXN0IG9mIGNvbmZpZ3VyYXRvciB2YWx1ZXNcbiAgICovXG4gIGFzc2VtYmxlVmFsdWVzRm9yTXVsdGlTZWxlY3RBdHRyaWJ1dGVzKFxuICAgIGNvbnRyb2xBcnJheTogVW50eXBlZEZvcm1Db250cm9sW10sXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IENvbmZpZ3VyYXRvci5WYWx1ZVtdIHtcbiAgICBjb25zdCBsb2NhbEFzc2VtYmxlZFZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZXMgPyBhdHRyaWJ1dGUudmFsdWVzW2ldIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsQXR0cmlidXRlVmFsdWU6IENvbmZpZ3VyYXRvci5WYWx1ZSA9IHtcbiAgICAgICAgICB2YWx1ZUNvZGU6IHZhbHVlLnZhbHVlQ29kZSxcbiAgICAgICAgfTtcbiAgICAgICAgbG9jYWxBdHRyaWJ1dGVWYWx1ZS5uYW1lID0gdmFsdWUubmFtZTtcbiAgICAgICAgbG9jYWxBdHRyaWJ1dGVWYWx1ZS5xdWFudGl0eSA9IHZhbHVlLnF1YW50aXR5O1xuICAgICAgICBsb2NhbEF0dHJpYnV0ZVZhbHVlLnNlbGVjdGVkID0gY29udHJvbEFycmF5W2ldLnZhbHVlO1xuXG4gICAgICAgIGxvY2FsQXNzZW1ibGVkVmFsdWVzLnB1c2gobG9jYWxBdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnQ29udHJvbEFycmF5IGRvZXMgbm90IG1hdGNoIHZhbHVlcywgYXQgbGVhc3Qgb25lIHZhbHVlIGNvdWxkIG5vdCBiZWVuIGZvdW5kJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsQXNzZW1ibGVkVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0VsZW1lbnQgfCBIVE1MRWxlbWVudH0gZWxlbWVudCAtIEhUTUwgZWxlbWVudFxuICAgKi9cbiAgcHJvdGVjdGVkIHNjcm9sbChlbGVtZW50OiBFbGVtZW50IHwgSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBsZXQgdG9wT2Zmc2V0ID0gMDtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICB0b3BPZmZzZXQgPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICB9XG4gICAgdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93Py5zY3JvbGwoMCwgdG9wT2Zmc2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRvIHRoZSBjb3JyZXNwb25kaW5nIGNvbmZpZ3VyYXRpb24gZWxlbWVudCBpbiB0aGUgSFRNTCB0cmVlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBTZWxlY3RvciBvZiB0aGUgSFRNTCBlbGVtZW50XG4gICAqL1xuICBzY3JvbGxUb0NvbmZpZ3VyYXRpb25FbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gcnVuIHRoaXMgbG9naWMgd2hlbiBkb2luZyBTU1JcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoc2VsZWN0b3IpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zY3JvbGwoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBmaXJzdCBhdHRyaWJ1dGUgaW4gdGhlIGZvcm0uXG4gICAqL1xuICBmb2N1c0ZpcnN0QXR0cmlidXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuZ2V0RWxlbWVudCgnY3gtY29uZmlndXJhdG9yLWZvcm0nKTtcbiAgICBpZiAoZm9ybSkge1xuICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPVxuICAgICAgICB0aGlzLmtleWJvYXJkRm9jdXNTZXJ2aWNlLmZpbmRGb2N1c2FibGUoZm9ybSk7XG4gICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2FibGVFbGVtZW50QnlJZChcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSxcbiAgICBpZD86IHN0cmluZ1xuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZvY3VzYWJsZUVsZW1lbnRzLmZpbmQoKGZvY3VzYWJsZUVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChpZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZm9jdXNhYmxlRWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YoaWQpICE9PSAtMSB8fFxuICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnQuaWQuaW5kZXhPZihpZCkgIT09IC0xXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmb2N1c2FibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Rm9jdXNhYmxlQ29uZmxpY3REZXNjcmlwdGlvbihcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXVxuICApOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Rm9jdXNhYmxlRWxlbWVudEJ5SWQoXG4gICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICdjeC1jb25maWd1cmF0b3ItY29uZmxpY3QtZGVzY3JpcHRpb24nXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2FibGVFbGVtZW50QnlWYWx1ZVVpS2V5KFxuICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBIVE1MRWxlbWVudFtdLFxuICAgIHZhbHVlVWlLZXk/OiBzdHJpbmdcbiAgKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmdldEZvY3VzYWJsZUVsZW1lbnRCeUlkKGZvY3VzYWJsZUVsZW1lbnRzLCB2YWx1ZVVpS2V5KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGb2N1c2FibGVFbGVtZW50QnlBdHRyaWJ1dGVJZChcbiAgICBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSxcbiAgICBhdHRyaWJ1dGVOYW1lOiBzdHJpbmdcbiAgKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmdldEZvY3VzYWJsZUVsZW1lbnRCeUlkKGZvY3VzYWJsZUVsZW1lbnRzLCBhdHRyaWJ1dGVOYW1lKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVBdHRyaWJ1dGVWYWx1ZVVpS2V5KFxuICAgIGF0dHJpYnV0ZUlkOiBzdHJpbmcsXG4gICAgdmFsdWVJZDogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZUlkICsgJy0tJyArIHZhbHVlSWQ7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXMgYSB2YWx1ZSBpbiB0aGUgZm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQXR0cmlidXRlfSBhdHRyaWJ1dGUgLSBBdHRyaWJ1dGVcbiAgICovXG4gIGZvY3VzVmFsdWUoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb3JtID0gdGhpcy5nZXRFbGVtZW50KCdjeC1jb25maWd1cmF0b3ItZm9ybScpO1xuICAgIGlmIChmb3JtKSB7XG4gICAgICBjb25zdCBmb2N1c2FibGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9XG4gICAgICAgIHRoaXMua2V5Ym9hcmRGb2N1c1NlcnZpY2UuZmluZEZvY3VzYWJsZShmb3JtKTtcbiAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBmb3VuZEZvY3VzYWJsZUVsZW1lbnQgPVxuICAgICAgICAgIHRoaXMuZ2V0Rm9jdXNhYmxlQ29uZmxpY3REZXNjcmlwdGlvbihmb2N1c2FibGVFbGVtZW50cyk7XG4gICAgICAgIGlmICghZm91bmRGb2N1c2FibGVFbGVtZW50KSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZXM/LmZpbmQoXG4gICAgICAgICAgICAodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVVaUtleSA9IHRoaXMuY3JlYXRlQXR0cmlidXRlVmFsdWVVaUtleShcbiAgICAgICAgICAgICAgYXR0cmlidXRlLm5hbWUsXG4gICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWUudmFsdWVDb2RlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZm91bmRGb2N1c2FibGVFbGVtZW50ID0gdGhpcy5nZXRGb2N1c2FibGVFbGVtZW50QnlWYWx1ZVVpS2V5KFxuICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICAgICAgICAgdmFsdWVVaUtleVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGZvdW5kRm9jdXNhYmxlRWxlbWVudCA9IHRoaXMuZ2V0Rm9jdXNhYmxlRWxlbWVudEJ5QXR0cmlidXRlSWQoXG4gICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGUubmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvdW5kRm9jdXNhYmxlRWxlbWVudCkge1xuICAgICAgICAgIGZvdW5kRm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGdyb3VwIElELlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIGdyb3VwIElEXG4gICAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9IC0gZ2VuZXJhdGVkIGdyb3VwIElEXG4gICAqL1xuICBjcmVhdGVHcm91cElkKGdyb3VwSWQ/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmIChncm91cElkKSB7XG4gICAgICByZXR1cm4gZ3JvdXBJZCArICctZ3JvdXAnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJzaXN0IHRoZSBrZXlib2FyZCBmb2N1cyBzdGF0ZSBmb3IgdGhlIGdpdmVuIGtleS5cbiAgICogVGhlIGZvY3VzIGlzIHN0b3JlZCBnbG9iYWxseSBvciBmb3IgdGhlIGdpdmVuIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cD8gLSBHcm91cFxuICAgKi9cbiAgc2V0Rm9jdXMoa2V5Pzogc3RyaW5nLCBncm91cD86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHRoaXMua2V5Ym9hcmRGb2N1c1NlcnZpY2Uuc2V0KGtleSwgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2Ugc3R5bGluZyBvZiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBxdWVyeVNlbGVjdG9yIC0gcXVlcnlTZWxlY3RvclxuICAgKiBAcGFyYW0gcHJvcGVydHkgLSBDU1MgcHJvcGVydHlcbiAgICogQHBhcmFtIHZhbHVlIC0gQ1NTIHZhbHVlXG4gICAqL1xuICBjaGFuZ2VTdHlsaW5nKHF1ZXJ5U2VsZWN0b3I6IHN0cmluZywgcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQocXVlcnlTZWxlY3Rvcik7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IEhUTUwgZWxlbWVudCBiYXNlZCBvbiBxdWVyeVNlbGVjdG9yIHdoZW4gcnVubmluZyBpbiBicm93c2VyXG4gICAqXG4gICAqIEBwYXJhbSBxdWVyeVNlbGVjdG9yIC0gcXVlcnlTZWxlY3RvclxuICAgKiBAcmV0dXJucyBzZWxlY3RlZCBIVE1MIGVsZW1lbnRcbiAgICovXG4gIGdldEVsZW1lbnQocXVlcnlTZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMud2luZG93UmVmLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIHF1ZXJ5U2VsZWN0b3JcbiAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuICB9XG59XG4iXX0=