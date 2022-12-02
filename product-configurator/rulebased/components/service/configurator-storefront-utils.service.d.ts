import { UntypedFormControl } from '@angular/forms';
import { WindowRef } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { KeyboardFocusService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorStorefrontUtilsService {
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected windowRef: WindowRef;
    protected keyboardFocusService: KeyboardFocusService;
    constructor(configuratorGroupsService: ConfiguratorGroupsService, windowRef: WindowRef, keyboardFocusService: KeyboardFocusService);
    /**
     * Does the configuration belong to a cart entry, or has the group been visited already?
     * In both cases we need to render indications for mandatory attributes.
     * This method emits only once and then stops further emissions.
     *
     * @param {CommonConfigurator.Owner} owner -
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
     */
    isCartEntryOrGroupVisited(owner: CommonConfigurator.Owner, groupId: string): Observable<boolean>;
    /**
     * Assemble an attribute value with the currently selected values from a checkbox list.
     *
     * @param {FormControl[]} controlArray - Control array
     * @param {Configurator.Attribute} attribute -  Configuration attribute
     * @return {Configurator.Value[]} - list of configurator values
     */
    assembleValuesForMultiSelectAttributes(controlArray: UntypedFormControl[], attribute: Configurator.Attribute): Configurator.Value[];
    /**
     * Scrolls to the corresponding HTML element.
     *
     * @param {Element | HTMLElement} element - HTML element
     */
    protected scroll(element: Element | HTMLElement): void;
    /**
     * Scrolls to the corresponding configuration element in the HTML tree.
     *
     * @param {string} selector - Selector of the HTML element
     */
    scrollToConfigurationElement(selector: string): void;
    /**
     * Focus the first attribute in the form.
     */
    focusFirstAttribute(): void;
    protected getFocusableElementById(focusableElements: HTMLElement[], id?: string): HTMLElement | undefined;
    protected getFocusableConflictDescription(focusableElements: HTMLElement[]): HTMLElement | undefined;
    protected getFocusableElementByValueUiKey(focusableElements: HTMLElement[], valueUiKey?: string): HTMLElement | undefined;
    protected getFocusableElementByAttributeId(focusableElements: HTMLElement[], attributeName: string): HTMLElement | undefined;
    protected createAttributeValueUiKey(attributeId: string, valueId: string): string;
    /**
     * Focus a value in the form.
     *
     * @param {Configurator.Attribute} attribute - Attribute
     */
    focusValue(attribute: Configurator.Attribute): void;
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId?: string): string | undefined;
    /**
     * Persist the keyboard focus state for the given key.
     * The focus is stored globally or for the given group.
     *
     * @param {string} key - key
     * @param {string} group? - Group
     */
    setFocus(key?: string, group?: string): void;
    /**
     * Change styling of element
     *
     * @param querySelector - querySelector
     * @param property - CSS property
     * @param value - CSS value
     */
    changeStyling(querySelector: string, property: string, value: string): void;
    /**
     * Get HTML element based on querySelector when running in browser
     *
     * @param querySelector - querySelector
     * @returns selected HTML element
     */
    getElement(querySelector: string): HTMLElement | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorStorefrontUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorStorefrontUtilsService>;
}
