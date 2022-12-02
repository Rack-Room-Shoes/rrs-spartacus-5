/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { ConfigurationInfoFields, ConfigurationInfoSpecialFields, } from '../../core/model/common-configurator.model';
import * as i0 from "@angular/core";
/**
 * Service for mapping of the CPQ line items from order entry
 */
export class ConfiguratorCartEntryBundleInfoService {
    /**
     * Retrieves the CPQ line items for an order entry
     *
     * @param {OrderEntry} entry - Order entry
     * @returns {LineItem[]} - Line item array
     */
    retrieveLineItems(entry) {
        let lineItems = [];
        if (entry.configurationInfos) {
            const configurationInfos = entry.configurationInfos.filter((configurationInfo) => configurationInfo &&
                (configurationInfo.configurationLabel ||
                    configurationInfo.configurationValue));
            const firstLabel = configurationInfos[0]?.configurationLabel;
            const firstValue = configurationInfos[0]?.configurationValue;
            if (firstLabel !== ConfigurationInfoSpecialFields.VERSION) {
                configurationInfos.forEach((configurationInfo) => lineItems.push(this.prepareLineItem(configurationInfo)));
            }
            else if (firstLabel === ConfigurationInfoSpecialFields.VERSION &&
                Number(firstValue) >= 2) {
                lineItems = this.processConfigurationInfos(configurationInfos);
            }
            else {
                this.logWarning('Wrong ConfigurationInfo version');
            }
        }
        return lineItems;
    }
    prepareLineItem(configurationInfo) {
        const quantityAndPrice = configurationInfo.configurationValue
            ? configurationInfo.configurationValue.split('x')
            : [];
        return {
            name: configurationInfo.configurationLabel
                ? this.removeDelimiter(configurationInfo.configurationLabel)
                : '',
            formattedQuantity: quantityAndPrice.length >= 1 ? quantityAndPrice[0].trim() : '',
            formattedPrice: quantityAndPrice.length >= 2 ? quantityAndPrice[1].trim() : '',
        };
    }
    removeDelimiter(label) {
        let preparedLabel = label.trim();
        const lastCharacter = preparedLabel.charAt(preparedLabel.length - 1);
        if (lastCharacter === ':') {
            preparedLabel = preparedLabel.substr(0, preparedLabel.length - 1);
        }
        return preparedLabel;
    }
    processConfigurationInfos(configurationInfos) {
        const lineItemMap = new Map();
        configurationInfos.forEach((configurationInfo) => this.processConfigurationInfoEntry(lineItemMap, configurationInfo));
        // sort
        const lineItemMapSorted = new Map(Array.from(lineItemMap).sort((a, b) => {
            return a[0] - b[0];
        }));
        // convert to array
        const lineItems = Array.from(lineItemMapSorted.values());
        return lineItems;
    }
    processConfigurationInfoEntry(lineItemMap, configurationInfo) {
        if (configurationInfo.configurationLabel) {
            const configurationInfoSplit = configurationInfo.configurationLabel.split(ConfigurationInfoSpecialFields.LINE_ITEM_DELIMITER);
            if (configurationInfoSplit[0] === ConfigurationInfoSpecialFields.LINE_ITEM) {
                const configurationInfoValue = configurationInfo.configurationValue
                    ? configurationInfo.configurationValue
                    : '';
                this.addLineItemData(lineItemMap, configurationInfoSplit, configurationInfoValue);
            }
        }
    }
    addLineItemData(lineItemMap, configurationInfoSplit, configurationInfoValue) {
        if (configurationInfoSplit.length === 3) {
            const lineItemNumber = Number(configurationInfoSplit[1]);
            let lineItem;
            switch (configurationInfoSplit[2]) {
                case ConfigurationInfoFields.NAME:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.name = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.QTY:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.formattedQuantity = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.FORMATTED_PRICE:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.formattedPrice = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.KEY:
                case ConfigurationInfoFields.PRICE_VALUE:
                    break;
                default: {
                    this.logWarning('Wrong LineItem format');
                }
            }
        }
        else {
            this.logWarning('Wrong LineItem format');
        }
    }
    getOrCreateLineItem(lineItemMap, lineItemNumber) {
        const lineItem = lineItemMap.get(lineItemNumber) ?? {
            name: '',
            formattedQuantity: '',
            formattedPrice: '',
        };
        if (!lineItemMap.get(lineItemNumber)) {
            lineItemMap.set(lineItemNumber, lineItem);
        }
        return lineItem;
    }
    logWarning(text) {
        if (isDevMode()) {
            console.warn(text);
        }
    }
}
ConfiguratorCartEntryBundleInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartEntryBundleInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNhcnQtZW50cnktYnVuZGxlLWluZm8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24vY29tcG9uZW50cy9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1idW5kbGUtaW5mby9jb25maWd1cmF0b3ItY2FydC1lbnRyeS1idW5kbGUtaW5mby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLDhCQUE4QixHQUMvQixNQUFNLDRDQUE0QyxDQUFDOztBQUdwRDs7R0FFRztBQUVILE1BQU0sT0FBTyxzQ0FBc0M7SUFDakQ7Ozs7O09BS0c7SUFDSCxpQkFBaUIsQ0FBQyxLQUFpQjtRQUNqQyxJQUFJLFNBQVMsR0FBZSxFQUFFLENBQUM7UUFDL0IsSUFBSSxLQUFLLENBQUMsa0JBQWtCLEVBQUU7WUFDNUIsTUFBTSxrQkFBa0IsR0FDdEIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FDN0IsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQ3BCLGlCQUFpQjtnQkFDakIsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0I7b0JBQ25DLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQzFDLENBQUM7WUFDSixNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQztZQUM3RCxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQztZQUU3RCxJQUFJLFVBQVUsS0FBSyw4QkFBOEIsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pELGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFp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b0JBQ2pELE1BQU07Z0JBQ1IsS0FBSyx1QkFBdUIsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pDLEtBQUssdUJBQXVCLENBQUMsV0FBVztvQkFDdEMsTUFBTTtnQkFDUixPQUFPLENBQUMsQ0FBQztvQkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7aUJBQzFDO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVTLG1CQUFtQixDQUMzQixXQUFrQyxFQUNsQyxjQUFzQjtRQUV0QixNQUFNLFFBQVEsR0FBYSxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJO1lBQzVELElBQUksRUFBRSxFQUFFO1lBQ1IsaUJBQWlCLEVBQUUsRUFBRTtZQUNyQixjQUFjLEVBQUUsRUFBRTtTQUNuQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDcEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRVMsVUFBVSxDQUFDLElBQVk7UUFDL0IsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzttSUEvSlUsc0NBQXNDO3VJQUF0QyxzQ0FBc0MsY0FEekIsTUFBTTsyRkFDbkIsc0NBQXNDO2tCQURsRCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJFbnRyeSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29uZmlndXJhdGlvbkluZm8sXG4gIENvbmZpZ3VyYXRpb25JbmZvRmllbGRzLFxuICBDb25maWd1cmF0aW9uSW5mb1NwZWNpYWxGaWVsZHMsXG59IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvY29tbW9uLWNvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBMaW5lSXRlbSB9IGZyb20gJy4vY29uZmlndXJhdG9yLWNhcnQtZW50cnktYnVuZGxlLWluZm8ubW9kZWwnO1xuXG4vKipcbiAqIFNlcnZpY2UgZm9yIG1hcHBpbmcgb2YgdGhlIENQUSBsaW5lIGl0ZW1zIGZyb20gb3JkZXIgZW50cnlcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JDYXJ0RW50cnlCdW5kbGVJbmZvU2VydmljZSB7XG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIENQUSBsaW5lIGl0ZW1zIGZvciBhbiBvcmRlciBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0ge09yZGVyRW50cnl9IGVudHJ5IC0gT3JkZXIgZW50cnlcbiAgICogQHJldHVybnMge0xpbmVJdGVtW119IC0gTGluZSBpdGVtIGFycmF5XG4gICAqL1xuICByZXRyaWV2ZUxpbmVJdGVtcyhlbnRyeTogT3JkZXJFbnRyeSk6IExpbmVJdGVtW10ge1xuICAgIGxldCBsaW5lSXRlbXM6IExpbmVJdGVtW10gPSBbXTtcbiAgICBpZiAoZW50cnkuY29uZmlndXJhdGlvbkluZm9zKSB7XG4gICAgICBjb25zdCBjb25maWd1cmF0aW9uSW5mb3M6IENvbmZpZ3VyYXRpb25JbmZvW10gPVxuICAgICAgICBlbnRyeS5jb25maWd1cmF0aW9uSW5mb3MuZmlsdGVyKFxuICAgICAgICAgIChjb25maWd1cmF0aW9uSW5mbykgPT5cbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvICYmXG4gICAgICAgICAgICAoY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvbkxhYmVsIHx8XG4gICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvLmNvbmZpZ3VyYXRpb25WYWx1ZSlcbiAgICAgICAgKTtcbiAgICAgIGNvbnN0IGZpcnN0TGFiZWwgPSBjb25maWd1cmF0aW9uSW5mb3NbMF0/LmNvbmZpZ3VyYXRpb25MYWJlbDtcbiAgICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBjb25maWd1cmF0aW9uSW5mb3NbMF0/LmNvbmZpZ3VyYXRpb25WYWx1ZTtcblxuICAgICAgaWYgKGZpcnN0TGFiZWwgIT09IENvbmZpZ3VyYXRpb25JbmZvU3BlY2lhbEZpZWxkcy5WRVJTSU9OKSB7XG4gICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvcy5mb3JFYWNoKChjb25maWd1cmF0aW9uSW5mbykgPT5cbiAgICAgICAgICBsaW5lSXRlbXMucHVzaCh0aGlzLnByZXBhcmVMaW5lSXRlbShjb25maWd1cmF0aW9uSW5mbykpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaXJzdExhYmVsID09PSBDb25maWd1cmF0aW9uSW5mb1NwZWNpYWxGaWVsZHMuVkVSU0lPTiAmJlxuICAgICAgICBOdW1iZXIoZmlyc3RWYWx1ZSkgPj0gMlxuICAgICAgKSB7XG4gICAgICAgIGxpbmVJdGVtcyA9IHRoaXMucHJvY2Vzc0NvbmZpZ3VyYXRpb25JbmZvcyhjb25maWd1cmF0aW9uSW5mb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dXYXJuaW5nKCdXcm9uZyBDb25maWd1cmF0aW9uSW5mbyB2ZXJzaW9uJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaW5lSXRlbXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJlcGFyZUxpbmVJdGVtKGNvbmZpZ3VyYXRpb25JbmZvOiBDb25maWd1cmF0aW9uSW5mbyk6IExpbmVJdGVtIHtcbiAgICBjb25zdCBxdWFudGl0eUFuZFByaWNlOiBzdHJpbmdbXSA9IGNvbmZpZ3VyYXRpb25JbmZvLmNvbmZpZ3VyYXRpb25WYWx1ZVxuICAgICAgPyBjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uVmFsdWUuc3BsaXQoJ3gnKVxuICAgICAgOiBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvbkxhYmVsXG4gICAgICAgID8gdGhpcy5yZW1vdmVEZWxpbWl0ZXIoY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvbkxhYmVsKVxuICAgICAgICA6ICcnLFxuICAgICAgZm9ybWF0dGVkUXVhbnRpdHk6XG4gICAgICAgIHF1YW50aXR5QW5kUHJpY2UubGVuZ3RoID49IDEgPyBxdWFudGl0eUFuZFByaWNlWzBdLnRyaW0oKSA6ICcnLFxuICAgICAgZm9ybWF0dGVkUHJpY2U6XG4gICAgICAgIHF1YW50aXR5QW5kUHJpY2UubGVuZ3RoID49IDIgPyBxdWFudGl0eUFuZFByaWNlWzFdLnRyaW0oKSA6ICcnLFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlRGVsaW1pdGVyKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBwcmVwYXJlZExhYmVsOiBzdHJpbmcgPSBsYWJlbC50cmltKCk7XG5cbiAgICBjb25zdCBsYXN0Q2hhcmFjdGVyOiBzdHJpbmcgPSBwcmVwYXJlZExhYmVsLmNoYXJBdChcbiAgICAgIHByZXBhcmVkTGFiZWwubGVuZ3RoIC0gMVxuICAgICk7XG4gICAgaWYgKGxhc3RDaGFyYWN0ZXIgPT09ICc6Jykge1xuICAgICAgcHJlcGFyZWRMYWJlbCA9IHByZXBhcmVkTGFiZWwuc3Vic3RyKDAsIHByZXBhcmVkTGFiZWwubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXBhcmVkTGFiZWw7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJvY2Vzc0NvbmZpZ3VyYXRpb25JbmZvcyhcbiAgICBjb25maWd1cmF0aW9uSW5mb3M6IENvbmZpZ3VyYXRpb25JbmZvW11cbiAgKTogTGluZUl0ZW1bXSB7XG4gICAgY29uc3QgbGluZUl0ZW1NYXA6IE1hcDxudW1iZXIsIExpbmVJdGVtPiA9IG5ldyBNYXAoKTtcbiAgICBjb25maWd1cmF0aW9uSW5mb3MuZm9yRWFjaCgoY29uZmlndXJhdGlvbkluZm8pID0+XG4gICAgICB0aGlzLnByb2Nlc3NDb25maWd1cmF0aW9uSW5mb0VudHJ5KGxpbmVJdGVtTWFwLCBjb25maWd1cmF0aW9uSW5mbylcbiAgICApO1xuICAgIC8vIHNvcnRcbiAgICBjb25zdCBsaW5lSXRlbU1hcFNvcnRlZDogTWFwPG51bWJlciwgTGluZUl0ZW0+ID0gbmV3IE1hcDxudW1iZXIsIExpbmVJdGVtPihcbiAgICAgIEFycmF5LmZyb20obGluZUl0ZW1NYXApLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGFbMF0gLSBiWzBdO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIGNvbnZlcnQgdG8gYXJyYXlcbiAgICBjb25zdCBsaW5lSXRlbXM6IExpbmVJdGVtW10gPSBBcnJheS5mcm9tKGxpbmVJdGVtTWFwU29ydGVkLnZhbHVlcygpKTtcbiAgICByZXR1cm4gbGluZUl0ZW1zO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByb2Nlc3NDb25maWd1cmF0aW9uSW5mb0VudHJ5KFxuICAgIGxpbmVJdGVtTWFwOiBNYXA8bnVtYmVyLCBMaW5lSXRlbT4sXG4gICAgY29uZmlndXJhdGlvbkluZm86IENvbmZpZ3VyYXRpb25JbmZvXG4gICk6IHZvaWQge1xuICAgIGlmIChjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uTGFiZWwpIHtcbiAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25JbmZvU3BsaXQ6IHN0cmluZ1tdID1cbiAgICAgICAgY29uZmlndXJhdGlvbkluZm8uY29uZmlndXJhdGlvbkxhYmVsLnNwbGl0KFxuICAgICAgICAgIENvbmZpZ3VyYXRpb25JbmZvU3BlY2lhbEZpZWxkcy5MSU5FX0lURU1fREVMSU1JVEVSXG4gICAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvU3BsaXRbMF0gPT09IENvbmZpZ3VyYXRpb25JbmZvU3BlY2lhbEZpZWxkcy5MSU5FX0lURU1cbiAgICAgICkge1xuICAgICAgICBjb25zdCBjb25maWd1cmF0aW9uSW5mb1ZhbHVlOiBzdHJpbmcgPVxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvLmNvbmZpZ3VyYXRpb25WYWx1ZVxuICAgICAgICAgICAgPyBjb25maWd1cmF0aW9uSW5mby5jb25maWd1cmF0aW9uVmFsdWVcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMuYWRkTGluZUl0ZW1EYXRhKFxuICAgICAgICAgIGxpbmVJdGVtTWFwLFxuICAgICAgICAgIGNvbmZpZ3VyYXRpb25JbmZvU3BsaXQsXG4gICAgICAgICAgY29uZmlndXJhdGlvbkluZm9WYWx1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRMaW5lSXRlbURhdGEoXG4gICAgbGluZUl0ZW1NYXA6IE1hcDxudW1iZXIsIExpbmVJdGVtPixcbiAgICBjb25maWd1cmF0aW9uSW5mb1NwbGl0OiBzdHJpbmdbXSxcbiAgICBjb25maWd1cmF0aW9uSW5mb1ZhbHVlOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgaWYgKGNvbmZpZ3VyYXRpb25JbmZvU3BsaXQubGVuZ3RoID09PSAzKSB7XG4gICAgICBjb25zdCBsaW5lSXRlbU51bWJlcjogbnVtYmVyID0gTnVtYmVyKGNvbmZpZ3VyYXRpb25JbmZvU3BsaXRbMV0pO1xuICAgICAgbGV0IGxpbmVJdGVtOiBMaW5lSXRlbTtcbiAgICAgIHN3aXRjaCAoY29uZmlndXJhdGlvbkluZm9TcGxpdFsyXSkge1xuICAgICAgICBjYXNlIENvbmZpZ3VyYXRpb25JbmZvRmllbGRzLk5BTUU6XG4gICAgICAgICAgbGluZUl0ZW0gPSB0aGlzLmdldE9yQ3JlYXRlTGluZUl0ZW0obGluZUl0ZW1NYXAsIGxpbmVJdGVtTnVtYmVyKTtcbiAgICAgICAgICBsaW5lSXRlbS5uYW1lID0gY29uZmlndXJhdGlvbkluZm9WYWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb25maWd1cmF0aW9uSW5mb0ZpZWxkcy5RVFk6XG4gICAgICAgICAgbGluZUl0ZW0gPSB0aGlzLmdldE9yQ3JlYXRlTGluZUl0ZW0obGluZUl0ZW1NYXAsIGxpbmVJdGVtTnVtYmVyKTtcbiAgICAgICAgICBsaW5lSXRlbS5mb3JtYXR0ZWRRdWFudGl0eSA9IGNvbmZpZ3VyYXRpb25JbmZvVmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29uZmlndXJhdGlvbkluZm9GaWVsZHMuRk9STUFUVEVEX1BSSUNFOlxuICAgICAgICAgIGxpbmVJdGVtID0gdGhpcy5nZXRPckNyZWF0ZUxpbmVJdGVtKGxpbmVJdGVtTWFwLCBsaW5lSXRlbU51bWJlcik7XG4gICAgICAgICAgbGluZUl0ZW0uZm9ybWF0dGVkUHJpY2UgPSBjb25maWd1cmF0aW9uSW5mb1ZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENvbmZpZ3VyYXRpb25JbmZvRmllbGRzLktFWTpcbiAgICAgICAgY2FzZSBDb25maWd1cmF0aW9uSW5mb0ZpZWxkcy5QUklDRV9WQUxVRTpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgIHRoaXMubG9nV2FybmluZygnV3JvbmcgTGluZUl0ZW0gZm9ybWF0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dXYXJuaW5nKCdXcm9uZyBMaW5lSXRlbSBmb3JtYXQnKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0T3JDcmVhdGVMaW5lSXRlbShcbiAgICBsaW5lSXRlbU1hcDogTWFwPG51bWJlciwgTGluZUl0ZW0+LFxuICAgIGxpbmVJdGVtTnVtYmVyOiBudW1iZXJcbiAgKTogTGluZUl0ZW0ge1xuICAgIGNvbnN0IGxpbmVJdGVtOiBMaW5lSXRlbSA9IGxpbmVJdGVtTWFwLmdldChsaW5lSXRlbU51bWJlcikgPz8ge1xuICAgICAgbmFtZTogJycsXG4gICAgICBmb3JtYXR0ZWRRdWFudGl0eTogJycsXG4gICAgICBmb3JtYXR0ZWRQcmljZTogJycsXG4gICAgfTtcbiAgICBpZiAoIWxpbmVJdGVtTWFwLmdldChsaW5lSXRlbU51bWJlcikpIHtcbiAgICAgIGxpbmVJdGVtTWFwLnNldChsaW5lSXRlbU51bWJlciwgbGluZUl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gbGluZUl0ZW07XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9nV2FybmluZyh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==