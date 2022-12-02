import { CommonConfigurator } from '@spartacus/product-configurator/common';
export declare namespace Configurator {
    interface Attribute {
        attrCode?: number;
        name: string;
        label?: string;
        description?: string;
        required?: boolean;
        incomplete?: boolean;
        uiType?: UiType;
        dataType?: DataType;
        quantity?: number;
        values?: Value[];
        groupId?: string;
        selectedSingleValue?: string;
        userInput?: string;
        isLineItem?: boolean;
        maxlength?: number;
        images?: Image[];
        numDecimalPlaces?: number;
        numTotalLength?: number;
        negativeAllowed?: boolean;
        hasConflicts?: boolean;
        retractTriggered?: boolean;
        attributePriceTotal?: PriceDetails;
        intervalInDomain?: boolean;
        key?: string;
        validationType?: string;
    }
    interface Value {
        valueCode: string;
        name?: string;
        valueDisplay?: string;
        description?: string;
        selected?: boolean;
        quantity?: number;
        valuePrice?: PriceDetails;
        valuePriceTotal?: PriceDetails;
        productSystemId?: string;
        isCommerceProduct?: boolean;
        images?: Image[];
    }
    interface Group {
        attributes?: Attribute[];
        id: string;
        name?: string;
        description?: string;
        groupType?: GroupType;
        configurable?: boolean;
        complete?: boolean;
        consistent?: boolean;
        subGroups: Group[];
    }
    interface ValueSupplement {
        attributeValueKey: string;
        priceValue: PriceDetails;
        obsoletePriceValue: PriceDetails;
    }
    interface AttributeSupplement {
        attributeUiKey: string;
        valueSupplements: ValueSupplement[];
    }
    interface Configuration {
        configId: string;
        consistent?: boolean;
        complete?: boolean;
        totalNumberOfIssues?: number;
        productCode: string;
        groups: Group[];
        flatGroups: Group[];
        priceSupplements?: AttributeSupplement[];
        priceSummary?: PriceSummary;
        overview?: Overview;
        owner: CommonConfigurator.Owner;
        nextOwner?: CommonConfigurator.Owner;
        isCartEntryUpdateRequired?: boolean;
        interactionState: InteractionState;
        updateType?: UpdateType;
        errorMessages?: string[];
        warningMessages?: string[];
    }
    interface InteractionState {
        currentGroup?: string;
        menuParentGroup?: string;
        groupsVisited?: {
            [id: string]: boolean;
        };
        issueNavigationDone?: boolean;
    }
    interface Overview {
        configId: string;
        totalNumberOfIssues?: number;
        numberOfIncompleteCharacteristics?: number;
        numberOfConflicts?: number;
        groups?: GroupOverview[];
        priceSummary?: PriceSummary;
        productCode: string;
    }
    interface GroupOverview {
        id: string;
        groupDescription?: string;
        attributes?: AttributeOverview[];
        subGroups?: GroupOverview[];
    }
    interface AttributeOverview {
        attribute: string;
        attributeId?: string;
        value: string;
        valueId?: string;
        productCode?: string;
        type?: AttributeOverviewType;
        quantity?: number;
        valuePrice?: PriceDetails;
        valuePriceTotal?: PriceDetails;
    }
    interface PriceSummary {
        basePrice?: PriceDetails;
        currentTotal?: PriceDetails;
        currentTotalSavings?: PriceSavingDetails;
        selectedOptions?: PriceDetails;
    }
    interface PriceDetails {
        currencyIso: string;
        formattedValue?: string;
        value: number;
    }
    interface PriceSavingDetails extends PriceDetails {
        maxQuantity?: number;
        minQuantity?: number;
    }
    interface AddToCartParameters {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        configId: string;
        owner: CommonConfigurator.Owner;
    }
    interface UpdateConfigurationForCartEntryParameters {
        userId: string;
        cartId: string;
        cartEntryNumber: string;
        configuration: Configurator.Configuration;
    }
    interface Image {
        type?: ImageType;
        format?: ImageFormatType;
        url?: string;
        altText?: string;
        galleryIndex?: number;
    }
    enum GroupType {
        ATTRIBUTE_GROUP = "AttributeGroup",
        SUB_ITEM_GROUP = "SubItemGroup",
        CONFLICT_HEADER_GROUP = "ConflictHeaderGroup",
        CONFLICT_GROUP = "ConflictGroup"
    }
    enum UiType {
        NOT_IMPLEMENTED = "not_implemented",
        RADIOBUTTON = "radioGroup",
        RADIOBUTTON_ADDITIONAL_INPUT = "radioGroup_add",
        CHECKBOX = "checkBox",
        CHECKBOXLIST = "checkBoxList",
        DROPDOWN = "dropdown",
        DROPDOWN_ADDITIONAL_INPUT = "dropdown_add",
        LISTBOX = "listbox",
        LISTBOX_MULTI = "listboxmulti",
        READ_ONLY = "readonly",
        STRING = "string",
        NUMERIC = "numeric",
        AUTO_COMPLETE_CUSTOM = "input_autocomplete",
        MULTI_SELECTION_IMAGE = "multi_selection_image",
        SINGLE_SELECTION_IMAGE = "single_selection_image",
        CHECKBOXLIST_PRODUCT = "checkBoxListProduct",
        DROPDOWN_PRODUCT = "dropdownProduct",
        RADIOBUTTON_PRODUCT = "radioGroupProduct"
    }
    enum ImageFormatType {
        VALUE_IMAGE = "VALUE_IMAGE",
        ATTRIBUTE_IMAGE = "ATTRIBUTE_IMAGE"
    }
    enum ImageType {
        PRIMARY = "PRIMARY",
        GALLERY = "GALLERY"
    }
    enum DataType {
        INPUT_STRING = "String",
        INPUT_NUMBER = "Number",
        USER_SELECTION_QTY_ATTRIBUTE_LEVEL = "UserSelectionWithAttributeQuantity",
        USER_SELECTION_QTY_VALUE_LEVEL = "UserSelectionWithValueQuantity",
        USER_SELECTION_NO_QTY = "UserSelectionWithoutQuantity",
        NOT_IMPLEMENTED = "not_implemented"
    }
    enum UpdateType {
        ATTRIBUTE = "Attribute",
        ATTRIBUTE_QUANTITY = "AttributeQuantity",
        VALUE_QUANTITY = "ValueQuantity"
    }
    enum AttributeOverviewType {
        GENERAL = "general",
        BUNDLE = "bundle"
    }
    enum ValidationType {
        NONE = "NONE",
        NUMERIC = "NUMERIC"
    }
}
