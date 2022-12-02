/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Configurator } from '../../../../core/model/configurator.model';
/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */
export class ConfiguratorAttributeBaseComponent {
    /**
     * Creates unique key for config value on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     * @param valueId
     */
    createValueUiKey(prefix, attributeId, valueId) {
        return (this.createAttributeUiKey(prefix, attributeId) +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            valueId);
    }
    /**
     * Creates unique key for config value to be sent to configurator
     * @param currentAttribute
     * @param value
     */
    createAttributeValueIdForConfigurator(currentAttribute, value) {
        return this.createValueUiKey(this.getUiType(currentAttribute), currentAttribute.name, value);
    }
    getUiType(attribute) {
        return attribute.uiType
            ? attribute.uiType
            : Configurator.UiType.NOT_IMPLEMENTED;
    }
    /**
     * Creates unique key for config attribute on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     */
    createAttributeUiKey(prefix, attributeId) {
        return (ConfiguratorAttributeBaseComponent.PREFIX +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            prefix +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            attributeId);
    }
    /**
     * Creates unique key for config attribute to be sent to configurator
     * @param currentAttribute
     */
    createAttributeIdForConfigurator(currentAttribute) {
        return this.createAttributeUiKey(this.getUiType(currentAttribute), currentAttribute.name);
    }
    /**
     * Creates unique key for attribute 'aria-labelledby'
     * @param prefix
     * @param attributeId
     * @param valueId
     * @param hasQuantity
     */
    createAriaLabelledBy(prefix, attributeId, valueId, hasQuantity) {
        let attributeUiKey = this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_LABEL, attributeId);
        if (valueId) {
            attributeUiKey +=
                ' ' +
                    this.createAttributeUiKey(prefix, attributeId) +
                    ConfiguratorAttributeBaseComponent.SEPERATOR +
                    valueId +
                    ' ';
            if (typeof hasQuantity === 'boolean' && !hasQuantity) {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
            else {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
        }
        return attributeUiKey;
    }
    /**
     * Creates a unique key for focus handling for the given attribute and value
     * @param attributeId
     * @param valueCode
     * @returns focus key
     */
    createFocusId(attributeId, valueCode) {
        return `${attributeId}--${valueCode}--focus`;
    }
    /**
     * Get code from attribute.
     * The code is not a mandatory attribute (since not available for VC flavour),
     * still it is mandatory in the context of CPQ. Calling this method therefore only
     * makes sense when CPQ is active. In case the method is called in the wrong context, an exception will
     * be thrown
     *
     * @param {Configurator.Attribute} Attribute
     * @returns {number} Attribute code
     */
    getAttributeCode(attribute) {
        const code = attribute.attrCode;
        if (code) {
            return code;
        }
        else {
            throw new Error('No attribute code for: ' + attribute.name);
        }
    }
    /**
     * Checks if attribute type allows additional values
     * @param attribute Attribute
     * @returns true if attribute type allows to enter additional values
     */
    isWithAdditionalValues(attribute) {
        const uiType = attribute.uiType;
        return (uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT);
    }
}
ConfiguratorAttributeBaseComponent.SEPERATOR = '--';
ConfiguratorAttributeBaseComponent.PREFIX = 'cx-configurator';
ConfiguratorAttributeBaseComponent.PREFIX_LABEL = 'label';
ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1iYXNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9hdHRyaWJ1dGUvdHlwZXMvYmFzZS9jb25maWd1cmF0b3ItYXR0cmlidXRlLWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFekU7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0NBQWtDO0lBTzdDOzs7OztPQUtHO0lBQ0gsZ0JBQWdCLENBQ2QsTUFBYyxFQUNkLFdBQW1CLEVBQ25CLE9BQWU7UUFFZixPQUFPLENBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUM7WUFDOUMsa0NBQWtDLENBQUMsU0FBUztZQUM1QyxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUNBQXFDLENBQ25DLGdCQUF3QyxFQUN4QyxLQUFhO1FBRWIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFDaEMsZ0JBQWdCLENBQUMsSUFBSSxFQUNyQixLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7SUFFUyxTQUFTLENBQUMsU0FBaUM7UUFDbkQsT0FBTyxTQUFTLENBQUMsTUFBTTtZQUNyQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0JBQW9CLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQ3RELE9BQU8sQ0FDTCxrQ0FBa0MsQ0FBQyxNQUFNO1lBQ3pDLGtDQUFrQyxDQUFDLFNBQVM7WUFDNUMsTUFBTTtZQUNOLGtDQUFrQyxDQUFDLFNBQVM7WUFDNUMsV0FBVyxDQUNaLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZ0NBQWdDLENBQzlCLGdCQUF3QztRQUV4QyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNoQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQ3RCLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CLENBQ2xCLE1BQWMsRUFDZCxXQUFtQixFQUNuQixPQUFnQixFQUNoQixXQUFxQjtRQUVyQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQzVDLGtDQUFrQyxDQUFDLFlBQVksRUFDL0MsV0FBVyxDQUNaLENBQUM7UUFDRixJQUFJLE9BQU8sRUFBRTtZQUNYLGNBQWM7Z0JBQ1osR0FBRztvQkFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztvQkFDOUMsa0NBQWtDLENBQUMsU0FBUztvQkFDNUMsT0FBTztvQkFDUCxHQUFHLENBQUM7WUFDTixJQUFJLE9BQU8sV0FBVyxLQUFLLFNBQVMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEQsY0FBYztvQkFDWixJQUFJLENBQUMsb0JBQW9CLENBQ3ZCLGtDQUFrQyxDQUFDLDhCQUE4QixFQUNqRSxXQUFXLENBQ1o7d0JBQ0Qsa0NBQWtDLENBQUMsU0FBUzt3QkFDNUMsT0FBTyxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsY0FBYztvQkFDWixJQUFJLENBQUMsb0JBQW9CLENBQ3ZCLGtDQUFrQyxDQUFDLHlCQUF5QixFQUM1RCxXQUFXLENBQ1o7d0JBQ0Qsa0NBQWtDLENBQUMsU0FBUzt3QkFDNUMsT0FBTyxDQUFDO2FBQ1g7U0FDRjtRQUNELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGFBQWEsQ0FBQyxXQUFtQixFQUFFLFNBQWlCO1FBQ2xELE9BQU8sR0FBRyxXQUFXLEtBQUssU0FBUyxTQUFTLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNPLGdCQUFnQixDQUFDLFNBQWlDO1FBQzFELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFDRDs7OztPQUlHO0lBQ08sc0JBQXNCLENBQUMsU0FBaUM7UUFDaEUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxPQUFPLENBQ0wsTUFBTSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsNEJBQTRCO1lBQzNELE1BQU0sS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUN6RCxDQUFDO0lBQ0osQ0FBQzs7QUE5SmMsNENBQVMsR0FBRyxJQUFJLENBQUM7QUFDakIseUNBQU0sR0FBRyxpQkFBaUIsQ0FBQztBQUMzQiwrQ0FBWSxHQUFHLE9BQU8sQ0FBQztBQUN2Qiw0REFBeUIsR0FBRywwQkFBMEIsQ0FBQztBQUN2RCxpRUFBOEIsR0FBRyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbi8qKlxuICogU2VydmljZSB0byBwcm92aWRlIHVuaXF1ZSBrZXlzIGZvciBlbGVtZW50cyBvbiB0aGUgVUkgYW5kIGZvciBzZW5kaW5nIHRvIGNvbmZpZ3VyYXRvclxuICovXG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBzdGF0aWMgU0VQRVJBVE9SID0gJy0tJztcbiAgcHJpdmF0ZSBzdGF0aWMgUFJFRklYID0gJ2N4LWNvbmZpZ3VyYXRvcic7XG4gIHByaXZhdGUgc3RhdGljIFBSRUZJWF9MQUJFTCA9ICdsYWJlbCc7XG4gIHByaXZhdGUgc3RhdGljIFBSRUZJWF9PUFRJT05fUFJJQ0VfVkFMVUUgPSAncHJpY2UtLW9wdGlvbnNQcmljZVZhbHVlJztcbiAgcHJpdmF0ZSBzdGF0aWMgUFJFRklYX0RETEJfT1BUSU9OX1BSSUNFX1ZBTFVFID0gJ29wdGlvbi0tcHJpY2UnO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHVuaXF1ZSBrZXkgZm9yIGNvbmZpZyB2YWx1ZSBvbiB0aGUgVUlcbiAgICogQHBhcmFtIHByZWZpeCBmb3Iga2V5IGRlcGVuZGluZyBvbiB1c2FnZSAoZS5nLiB1aVR5cGUsIGxhYmVsKVxuICAgKiBAcGFyYW0gYXR0cmlidXRlSWRcbiAgICogQHBhcmFtIHZhbHVlSWRcbiAgICovXG4gIGNyZWF0ZVZhbHVlVWlLZXkoXG4gICAgcHJlZml4OiBzdHJpbmcsXG4gICAgYXR0cmlidXRlSWQ6IHN0cmluZyxcbiAgICB2YWx1ZUlkOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5jcmVhdGVBdHRyaWJ1dGVVaUtleShwcmVmaXgsIGF0dHJpYnV0ZUlkKSArXG4gICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlNFUEVSQVRPUiArXG4gICAgICB2YWx1ZUlkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHVuaXF1ZSBrZXkgZm9yIGNvbmZpZyB2YWx1ZSB0byBiZSBzZW50IHRvIGNvbmZpZ3VyYXRvclxuICAgKiBAcGFyYW0gY3VycmVudEF0dHJpYnV0ZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIGNyZWF0ZUF0dHJpYnV0ZVZhbHVlSWRGb3JDb25maWd1cmF0b3IoXG4gICAgY3VycmVudEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICB2YWx1ZTogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVmFsdWVVaUtleShcbiAgICAgIHRoaXMuZ2V0VWlUeXBlKGN1cnJlbnRBdHRyaWJ1dGUpLFxuICAgICAgY3VycmVudEF0dHJpYnV0ZS5uYW1lLFxuICAgICAgdmFsdWVcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFVpVHlwZShhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBhdHRyaWJ1dGUudWlUeXBlXG4gICAgICA/IGF0dHJpYnV0ZS51aVR5cGVcbiAgICAgIDogQ29uZmlndXJhdG9yLlVpVHlwZS5OT1RfSU1QTEVNRU5URUQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB1bmlxdWUga2V5IGZvciBjb25maWcgYXR0cmlidXRlIG9uIHRoZSBVSVxuICAgKiBAcGFyYW0gcHJlZml4IGZvciBrZXkgZGVwZW5kaW5nIG9uIHVzYWdlIChlLmcuIHVpVHlwZSwgbGFiZWwpXG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVJZFxuICAgKi9cbiAgY3JlYXRlQXR0cmlidXRlVWlLZXkocHJlZml4OiBzdHJpbmcsIGF0dHJpYnV0ZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlBSRUZJWCArXG4gICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlNFUEVSQVRPUiArXG4gICAgICBwcmVmaXggK1xuICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudC5TRVBFUkFUT1IgK1xuICAgICAgYXR0cmlidXRlSWRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdW5pcXVlIGtleSBmb3IgY29uZmlnIGF0dHJpYnV0ZSB0byBiZSBzZW50IHRvIGNvbmZpZ3VyYXRvclxuICAgKiBAcGFyYW0gY3VycmVudEF0dHJpYnV0ZVxuICAgKi9cbiAgY3JlYXRlQXR0cmlidXRlSWRGb3JDb25maWd1cmF0b3IoXG4gICAgY3VycmVudEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVxuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUF0dHJpYnV0ZVVpS2V5KFxuICAgICAgdGhpcy5nZXRVaVR5cGUoY3VycmVudEF0dHJpYnV0ZSksXG4gICAgICBjdXJyZW50QXR0cmlidXRlLm5hbWVcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdW5pcXVlIGtleSBmb3IgYXR0cmlidXRlICdhcmlhLWxhYmVsbGVkYnknXG4gICAqIEBwYXJhbSBwcmVmaXhcbiAgICogQHBhcmFtIGF0dHJpYnV0ZUlkXG4gICAqIEBwYXJhbSB2YWx1ZUlkXG4gICAqIEBwYXJhbSBoYXNRdWFudGl0eVxuICAgKi9cbiAgY3JlYXRlQXJpYUxhYmVsbGVkQnkoXG4gICAgcHJlZml4OiBzdHJpbmcsXG4gICAgYXR0cmlidXRlSWQ6IHN0cmluZyxcbiAgICB2YWx1ZUlkPzogc3RyaW5nLFxuICAgIGhhc1F1YW50aXR5PzogYm9vbGVhblxuICApOiBzdHJpbmcge1xuICAgIGxldCBhdHRyaWJ1dGVVaUtleSA9IHRoaXMuY3JlYXRlQXR0cmlidXRlVWlLZXkoXG4gICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlBSRUZJWF9MQUJFTCxcbiAgICAgIGF0dHJpYnV0ZUlkXG4gICAgKTtcbiAgICBpZiAodmFsdWVJZCkge1xuICAgICAgYXR0cmlidXRlVWlLZXkgKz1cbiAgICAgICAgJyAnICtcbiAgICAgICAgdGhpcy5jcmVhdGVBdHRyaWJ1dGVVaUtleShwcmVmaXgsIGF0dHJpYnV0ZUlkKSArXG4gICAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuU0VQRVJBVE9SICtcbiAgICAgICAgdmFsdWVJZCArXG4gICAgICAgICcgJztcbiAgICAgIGlmICh0eXBlb2YgaGFzUXVhbnRpdHkgPT09ICdib29sZWFuJyAmJiAhaGFzUXVhbnRpdHkpIHtcbiAgICAgICAgYXR0cmlidXRlVWlLZXkgKz1cbiAgICAgICAgICB0aGlzLmNyZWF0ZUF0dHJpYnV0ZVVpS2V5KFxuICAgICAgICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudC5QUkVGSVhfRERMQl9PUFRJT05fUFJJQ0VfVkFMVUUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVJZFxuICAgICAgICAgICkgK1xuICAgICAgICAgIENvbmZpZ3VyYXRvckF0dHJpYnV0ZUJhc2VDb21wb25lbnQuU0VQRVJBVE9SICtcbiAgICAgICAgICB2YWx1ZUlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0cmlidXRlVWlLZXkgKz1cbiAgICAgICAgICB0aGlzLmNyZWF0ZUF0dHJpYnV0ZVVpS2V5KFxuICAgICAgICAgICAgQ29uZmlndXJhdG9yQXR0cmlidXRlQmFzZUNvbXBvbmVudC5QUkVGSVhfT1BUSU9OX1BSSUNFX1ZBTFVFLFxuICAgICAgICAgICAgYXR0cmlidXRlSWRcbiAgICAgICAgICApICtcbiAgICAgICAgICBDb25maWd1cmF0b3JBdHRyaWJ1dGVCYXNlQ29tcG9uZW50LlNFUEVSQVRPUiArXG4gICAgICAgICAgdmFsdWVJZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVVpS2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB1bmlxdWUga2V5IGZvciBmb2N1cyBoYW5kbGluZyBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBhbmQgdmFsdWVcbiAgICogQHBhcmFtIGF0dHJpYnV0ZUlkXG4gICAqIEBwYXJhbSB2YWx1ZUNvZGVcbiAgICogQHJldHVybnMgZm9jdXMga2V5XG4gICAqL1xuICBjcmVhdGVGb2N1c0lkKGF0dHJpYnV0ZUlkOiBzdHJpbmcsIHZhbHVlQ29kZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7YXR0cmlidXRlSWR9LS0ke3ZhbHVlQ29kZX0tLWZvY3VzYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29kZSBmcm9tIGF0dHJpYnV0ZS5cbiAgICogVGhlIGNvZGUgaXMgbm90IGEgbWFuZGF0b3J5IGF0dHJpYnV0ZSAoc2luY2Ugbm90IGF2YWlsYWJsZSBmb3IgVkMgZmxhdm91ciksXG4gICAqIHN0aWxsIGl0IGlzIG1hbmRhdG9yeSBpbiB0aGUgY29udGV4dCBvZiBDUFEuIENhbGxpbmcgdGhpcyBtZXRob2QgdGhlcmVmb3JlIG9ubHlcbiAgICogbWFrZXMgc2Vuc2Ugd2hlbiBDUFEgaXMgYWN0aXZlLiBJbiBjYXNlIHRoZSBtZXRob2QgaXMgY2FsbGVkIGluIHRoZSB3cm9uZyBjb250ZXh0LCBhbiBleGNlcHRpb24gd2lsbFxuICAgKiBiZSB0aHJvd25cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQXR0cmlidXRlfSBBdHRyaWJ1dGVcbiAgICogQHJldHVybnMge251bWJlcn0gQXR0cmlidXRlIGNvZGVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRBdHRyaWJ1dGVDb2RlKGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSk6IG51bWJlciB7XG4gICAgY29uc3QgY29kZSA9IGF0dHJpYnV0ZS5hdHRyQ29kZTtcbiAgICBpZiAoY29kZSkge1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYXR0cmlidXRlIGNvZGUgZm9yOiAnICsgYXR0cmlidXRlLm5hbWUpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQ2hlY2tzIGlmIGF0dHJpYnV0ZSB0eXBlIGFsbG93cyBhZGRpdGlvbmFsIHZhbHVlc1xuICAgKiBAcGFyYW0gYXR0cmlidXRlIEF0dHJpYnV0ZVxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGF0dHJpYnV0ZSB0eXBlIGFsbG93cyB0byBlbnRlciBhZGRpdGlvbmFsIHZhbHVlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGlzV2l0aEFkZGl0aW9uYWxWYWx1ZXMoYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdWlUeXBlID0gYXR0cmlidXRlLnVpVHlwZTtcbiAgICByZXR1cm4gKFxuICAgICAgdWlUeXBlID09PSBDb25maWd1cmF0b3IuVWlUeXBlLlJBRElPQlVUVE9OX0FERElUSU9OQUxfSU5QVVQgfHxcbiAgICAgIHVpVHlwZSA9PT0gQ29uZmlndXJhdG9yLlVpVHlwZS5EUk9QRE9XTl9BRERJVElPTkFMX0lOUFVUXG4gICAgKTtcbiAgfVxufVxuIl19