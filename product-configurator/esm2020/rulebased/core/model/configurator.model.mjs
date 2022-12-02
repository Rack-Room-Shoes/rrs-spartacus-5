/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// Note that this namespace should be augmentable, therefore it's exposed in the 'public_api.ts'
// of the rulebased entry point, and there is no index.ts file in this folder
export var Configurator;
(function (Configurator) {
    let GroupType;
    (function (GroupType) {
        GroupType["ATTRIBUTE_GROUP"] = "AttributeGroup";
        GroupType["SUB_ITEM_GROUP"] = "SubItemGroup";
        GroupType["CONFLICT_HEADER_GROUP"] = "ConflictHeaderGroup";
        GroupType["CONFLICT_GROUP"] = "ConflictGroup";
    })(GroupType = Configurator.GroupType || (Configurator.GroupType = {}));
    let UiType;
    (function (UiType) {
        UiType["NOT_IMPLEMENTED"] = "not_implemented";
        UiType["RADIOBUTTON"] = "radioGroup";
        UiType["RADIOBUTTON_ADDITIONAL_INPUT"] = "radioGroup_add";
        UiType["CHECKBOX"] = "checkBox";
        UiType["CHECKBOXLIST"] = "checkBoxList";
        UiType["DROPDOWN"] = "dropdown";
        UiType["DROPDOWN_ADDITIONAL_INPUT"] = "dropdown_add";
        UiType["LISTBOX"] = "listbox";
        UiType["LISTBOX_MULTI"] = "listboxmulti";
        UiType["READ_ONLY"] = "readonly";
        UiType["STRING"] = "string";
        UiType["NUMERIC"] = "numeric";
        UiType["AUTO_COMPLETE_CUSTOM"] = "input_autocomplete";
        UiType["MULTI_SELECTION_IMAGE"] = "multi_selection_image";
        UiType["SINGLE_SELECTION_IMAGE"] = "single_selection_image";
        //introduced with CPQ
        UiType["CHECKBOXLIST_PRODUCT"] = "checkBoxListProduct";
        UiType["DROPDOWN_PRODUCT"] = "dropdownProduct";
        UiType["RADIOBUTTON_PRODUCT"] = "radioGroupProduct";
    })(UiType = Configurator.UiType || (Configurator.UiType = {}));
    let ImageFormatType;
    (function (ImageFormatType) {
        ImageFormatType["VALUE_IMAGE"] = "VALUE_IMAGE";
        ImageFormatType["ATTRIBUTE_IMAGE"] = "ATTRIBUTE_IMAGE";
    })(ImageFormatType = Configurator.ImageFormatType || (Configurator.ImageFormatType = {}));
    let ImageType;
    (function (ImageType) {
        ImageType["PRIMARY"] = "PRIMARY";
        ImageType["GALLERY"] = "GALLERY";
    })(ImageType = Configurator.ImageType || (Configurator.ImageType = {}));
    let DataType;
    (function (DataType) {
        DataType["INPUT_STRING"] = "String";
        DataType["INPUT_NUMBER"] = "Number";
        DataType["USER_SELECTION_QTY_ATTRIBUTE_LEVEL"] = "UserSelectionWithAttributeQuantity";
        DataType["USER_SELECTION_QTY_VALUE_LEVEL"] = "UserSelectionWithValueQuantity";
        DataType["USER_SELECTION_NO_QTY"] = "UserSelectionWithoutQuantity";
        DataType["NOT_IMPLEMENTED"] = "not_implemented";
    })(DataType = Configurator.DataType || (Configurator.DataType = {}));
    let UpdateType;
    (function (UpdateType) {
        UpdateType["ATTRIBUTE"] = "Attribute";
        UpdateType["ATTRIBUTE_QUANTITY"] = "AttributeQuantity";
        UpdateType["VALUE_QUANTITY"] = "ValueQuantity";
    })(UpdateType = Configurator.UpdateType || (Configurator.UpdateType = {}));
    let AttributeOverviewType;
    (function (AttributeOverviewType) {
        AttributeOverviewType["GENERAL"] = "general";
        AttributeOverviewType["BUNDLE"] = "bundle";
    })(AttributeOverviewType = Configurator.AttributeOverviewType || (Configurator.AttributeOverviewType = {}));
    let ValidationType;
    (function (ValidationType) {
        ValidationType["NONE"] = "NONE";
        ValidationType["NUMERIC"] = "NUMERIC";
    })(ValidationType = Configurator.ValidationType || (Configurator.ValidationType = {}));
})(Configurator || (Configurator = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsZ0dBQWdHO0FBQ2hHLDZFQUE2RTtBQUU3RSxNQUFNLEtBQVcsWUFBWSxDQXNPNUI7QUF0T0QsV0FBaUIsWUFBWTtJQXNLM0IsSUFBWSxTQUtYO0lBTEQsV0FBWSxTQUFTO1FBQ25CLCtDQUFrQyxDQUFBO1FBQ2xDLDRDQUErQixDQUFBO1FBQy9CLDBEQUE2QyxDQUFBO1FBQzdDLDZDQUFnQyxDQUFBO0lBQ2xDLENBQUMsRUFMVyxTQUFTLEdBQVQsc0JBQVMsS0FBVCxzQkFBUyxRQUtwQjtJQUVELElBQVksTUFzQlg7SUF0QkQsV0FBWSxNQUFNO1FBQ2hCLDZDQUFtQyxDQUFBO1FBQ25DLG9DQUEwQixDQUFBO1FBQzFCLHlEQUErQyxDQUFBO1FBQy9DLCtCQUFxQixDQUFBO1FBQ3JCLHVDQUE2QixDQUFBO1FBQzdCLCtCQUFxQixDQUFBO1FBQ3JCLG9EQUEwQyxDQUFBO1FBQzFDLDZCQUFtQixDQUFBO1FBQ25CLHdDQUE4QixDQUFBO1FBQzlCLGdDQUFzQixDQUFBO1FBQ3RCLDJCQUFpQixDQUFBO1FBQ2pCLDZCQUFtQixDQUFBO1FBQ25CLHFEQUEyQyxDQUFBO1FBQzNDLHlEQUErQyxDQUFBO1FBQy9DLDJEQUFpRCxDQUFBO1FBRWpELHFCQUFxQjtRQUVyQixzREFBNEMsQ0FBQTtRQUM1Qyw4Q0FBb0MsQ0FBQTtRQUNwQyxtREFBeUMsQ0FBQTtJQUMzQyxDQUFDLEVBdEJXLE1BQU0sR0FBTixtQkFBTSxLQUFOLG1CQUFNLFFBc0JqQjtJQUVELElBQVksZUFHWDtJQUhELFdBQVksZUFBZTtRQUN6Qiw4Q0FBMkIsQ0FBQTtRQUMzQixzREFBbUMsQ0FBQTtJQUNyQyxDQUFDLEVBSFcsZUFBZSxHQUFmLDRCQUFlLEtBQWYsNEJBQWUsUUFHMUI7SUFFRCxJQUFZLFNBR1g7SUFIRCxXQUFZLFNBQVM7UUFDbkIsZ0NBQW1CLENBQUE7UUFDbkIsZ0NBQW1CLENBQUE7SUFDckIsQ0FBQyxFQUhXLFNBQVMsR0FBVCxzQkFBUyxLQUFULHNCQUFTLFFBR3BCO0lBRUQsSUFBWSxRQU9YO0lBUEQsV0FBWSxRQUFRO1FBQ2xCLG1DQUF1QixDQUFBO1FBQ3ZCLG1DQUF1QixDQUFBO1FBQ3ZCLHFGQUF5RSxDQUFBO1FBQ3pFLDZFQUFpRSxDQUFBO1FBQ2pFLGtFQUFzRCxDQUFBO1FBQ3RELCtDQUFtQyxDQUFBO0lBQ3JDLENBQUMsRUFQVyxRQUFRLEdBQVIscUJBQVEsS0FBUixxQkFBUSxRQU9uQjtJQUNELElBQVksVUFJWDtJQUpELFdBQVksVUFBVTtRQUNwQixxQ0FBdUIsQ0FBQTtRQUN2QixzREFBd0MsQ0FBQTtRQUN4Qyw4Q0FBZ0MsQ0FBQTtJQUNsQyxDQUFDLEVBSlcsVUFBVSxHQUFWLHVCQUFVLEtBQVYsdUJBQVUsUUFJckI7SUFFRCxJQUFZLHFCQUdYO0lBSEQsV0FBWSxxQkFBcUI7UUFDL0IsNENBQW1CLENBQUE7UUFDbkIsMENBQWlCLENBQUE7SUFDbkIsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQixrQ0FBcUIsS0FBckIsa0NBQXFCLFFBR2hDO0lBRUQsSUFBWSxjQUdYO0lBSEQsV0FBWSxjQUFjO1FBQ3hCLCtCQUFhLENBQUE7UUFDYixxQ0FBbUIsQ0FBQTtJQUNyQixDQUFDLEVBSFcsY0FBYyxHQUFkLDJCQUFjLEtBQWQsMkJBQWMsUUFHekI7QUFDSCxDQUFDLEVBdE9nQixZQUFZLEtBQVosWUFBWSxRQXNPNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5cbi8vIE5vdGUgdGhhdCB0aGlzIG5hbWVzcGFjZSBzaG91bGQgYmUgYXVnbWVudGFibGUsIHRoZXJlZm9yZSBpdCdzIGV4cG9zZWQgaW4gdGhlICdwdWJsaWNfYXBpLnRzJ1xuLy8gb2YgdGhlIHJ1bGViYXNlZCBlbnRyeSBwb2ludCwgYW5kIHRoZXJlIGlzIG5vIGluZGV4LnRzIGZpbGUgaW4gdGhpcyBmb2xkZXJcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maWd1cmF0b3Ige1xuICBleHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZSB7XG4gICAgYXR0ckNvZGU/OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgICBpbmNvbXBsZXRlPzogYm9vbGVhbjtcbiAgICB1aVR5cGU/OiBVaVR5cGU7XG4gICAgZGF0YVR5cGU/OiBEYXRhVHlwZTtcbiAgICBxdWFudGl0eT86IG51bWJlcjtcbiAgICB2YWx1ZXM/OiBWYWx1ZVtdO1xuICAgIGdyb3VwSWQ/OiBzdHJpbmc7XG4gICAgc2VsZWN0ZWRTaW5nbGVWYWx1ZT86IHN0cmluZztcbiAgICB1c2VySW5wdXQ/OiBzdHJpbmc7XG4gICAgaXNMaW5lSXRlbT86IGJvb2xlYW47XG4gICAgbWF4bGVuZ3RoPzogbnVtYmVyO1xuICAgIGltYWdlcz86IEltYWdlW107XG4gICAgbnVtRGVjaW1hbFBsYWNlcz86IG51bWJlcjtcbiAgICBudW1Ub3RhbExlbmd0aD86IG51bWJlcjtcbiAgICBuZWdhdGl2ZUFsbG93ZWQ/OiBib29sZWFuO1xuICAgIGhhc0NvbmZsaWN0cz86IGJvb2xlYW47XG4gICAgcmV0cmFjdFRyaWdnZXJlZD86IGJvb2xlYW47XG4gICAgYXR0cmlidXRlUHJpY2VUb3RhbD86IFByaWNlRGV0YWlscztcbiAgICBpbnRlcnZhbEluRG9tYWluPzogYm9vbGVhbjtcbiAgICBrZXk/OiBzdHJpbmc7XG4gICAgdmFsaWRhdGlvblR5cGU/OiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFZhbHVlIHtcbiAgICB2YWx1ZUNvZGU6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHZhbHVlRGlzcGxheT86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XG4gICAgcXVhbnRpdHk/OiBudW1iZXI7XG4gICAgdmFsdWVQcmljZT86IFByaWNlRGV0YWlscztcbiAgICB2YWx1ZVByaWNlVG90YWw/OiBQcmljZURldGFpbHM7XG4gICAgcHJvZHVjdFN5c3RlbUlkPzogc3RyaW5nO1xuICAgIGlzQ29tbWVyY2VQcm9kdWN0PzogYm9vbGVhbjtcbiAgICBpbWFnZXM/OiBJbWFnZVtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBHcm91cCB7XG4gICAgYXR0cmlidXRlcz86IEF0dHJpYnV0ZVtdO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBncm91cFR5cGU/OiBHcm91cFR5cGU7XG4gICAgY29uZmlndXJhYmxlPzogYm9vbGVhbjtcbiAgICBjb21wbGV0ZT86IGJvb2xlYW47XG4gICAgY29uc2lzdGVudD86IGJvb2xlYW47XG4gICAgc3ViR3JvdXBzOiBHcm91cFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBWYWx1ZVN1cHBsZW1lbnQge1xuICAgIGF0dHJpYnV0ZVZhbHVlS2V5OiBzdHJpbmc7XG4gICAgcHJpY2VWYWx1ZTogUHJpY2VEZXRhaWxzO1xuICAgIG9ic29sZXRlUHJpY2VWYWx1ZTogUHJpY2VEZXRhaWxzO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGVTdXBwbGVtZW50IHtcbiAgICBhdHRyaWJ1dGVVaUtleTogc3RyaW5nO1xuICAgIHZhbHVlU3VwcGxlbWVudHM6IFZhbHVlU3VwcGxlbWVudFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uIHtcbiAgICBjb25maWdJZDogc3RyaW5nO1xuICAgIGNvbnNpc3RlbnQ/OiBib29sZWFuO1xuICAgIGNvbXBsZXRlPzogYm9vbGVhbjtcbiAgICB0b3RhbE51bWJlck9mSXNzdWVzPzogbnVtYmVyO1xuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmc7XG4gICAgZ3JvdXBzOiBHcm91cFtdO1xuICAgIGZsYXRHcm91cHM6IEdyb3VwW107XG4gICAgcHJpY2VTdXBwbGVtZW50cz86IEF0dHJpYnV0ZVN1cHBsZW1lbnRbXTtcbiAgICBwcmljZVN1bW1hcnk/OiBQcmljZVN1bW1hcnk7XG4gICAgb3ZlcnZpZXc/OiBPdmVydmlldztcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyO1xuICAgIG5leHRPd25lcj86IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcjtcbiAgICBpc0NhcnRFbnRyeVVwZGF0ZVJlcXVpcmVkPzogYm9vbGVhbjtcbiAgICBpbnRlcmFjdGlvblN0YXRlOiBJbnRlcmFjdGlvblN0YXRlO1xuICAgIHVwZGF0ZVR5cGU/OiBVcGRhdGVUeXBlO1xuICAgIGVycm9yTWVzc2FnZXM/OiBzdHJpbmdbXTtcbiAgICB3YXJuaW5nTWVzc2FnZXM/OiBzdHJpbmdbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgSW50ZXJhY3Rpb25TdGF0ZSB7XG4gICAgY3VycmVudEdyb3VwPzogc3RyaW5nO1xuICAgIG1lbnVQYXJlbnRHcm91cD86IHN0cmluZztcbiAgICBncm91cHNWaXNpdGVkPzoge1xuICAgICAgW2lkOiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gICAgaXNzdWVOYXZpZ2F0aW9uRG9uZT86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE92ZXJ2aWV3IHtcbiAgICBjb25maWdJZDogc3RyaW5nO1xuICAgIHRvdGFsTnVtYmVyT2ZJc3N1ZXM/OiBudW1iZXI7XG4gICAgbnVtYmVyT2ZJbmNvbXBsZXRlQ2hhcmFjdGVyaXN0aWNzPzogbnVtYmVyO1xuICAgIG51bWJlck9mQ29uZmxpY3RzPzogbnVtYmVyO1xuICAgIGdyb3Vwcz86IEdyb3VwT3ZlcnZpZXdbXTtcbiAgICBwcmljZVN1bW1hcnk/OiBQcmljZVN1bW1hcnk7XG4gICAgcHJvZHVjdENvZGU6IHN0cmluZztcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgR3JvdXBPdmVydmlldyB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBncm91cERlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGF0dHJpYnV0ZXM/OiBBdHRyaWJ1dGVPdmVydmlld1tdO1xuICAgIHN1Ykdyb3Vwcz86IEdyb3VwT3ZlcnZpZXdbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlT3ZlcnZpZXcge1xuICAgIGF0dHJpYnV0ZTogc3RyaW5nO1xuICAgIGF0dHJpYnV0ZUlkPzogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgdmFsdWVJZD86IHN0cmluZztcbiAgICBwcm9kdWN0Q29kZT86IHN0cmluZztcbiAgICB0eXBlPzogQXR0cmlidXRlT3ZlcnZpZXdUeXBlO1xuICAgIHF1YW50aXR5PzogbnVtYmVyO1xuICAgIHZhbHVlUHJpY2U/OiBQcmljZURldGFpbHM7XG4gICAgdmFsdWVQcmljZVRvdGFsPzogUHJpY2VEZXRhaWxzO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBQcmljZVN1bW1hcnkge1xuICAgIGJhc2VQcmljZT86IFByaWNlRGV0YWlscztcbiAgICBjdXJyZW50VG90YWw/OiBQcmljZURldGFpbHM7XG4gICAgY3VycmVudFRvdGFsU2F2aW5ncz86IFByaWNlU2F2aW5nRGV0YWlscztcbiAgICBzZWxlY3RlZE9wdGlvbnM/OiBQcmljZURldGFpbHM7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFByaWNlRGV0YWlscyB7XG4gICAgY3VycmVuY3lJc286IHN0cmluZztcbiAgICBmb3JtYXR0ZWRWYWx1ZT86IHN0cmluZztcbiAgICB2YWx1ZTogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBQcmljZVNhdmluZ0RldGFpbHMgZXh0ZW5kcyBQcmljZURldGFpbHMge1xuICAgIG1heFF1YW50aXR5PzogbnVtYmVyO1xuICAgIG1pblF1YW50aXR5PzogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBBZGRUb0NhcnRQYXJhbWV0ZXJzIHtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICBjYXJ0SWQ6IHN0cmluZztcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgY29uZmlnSWQ6IHN0cmluZztcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBVcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVycyB7XG4gICAgdXNlcklkOiBzdHJpbmc7XG4gICAgY2FydElkOiBzdHJpbmc7XG4gICAgY2FydEVudHJ5TnVtYmVyOiBzdHJpbmc7XG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb247XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEltYWdlIHtcbiAgICB0eXBlPzogSW1hZ2VUeXBlO1xuICAgIGZvcm1hdD86IEltYWdlRm9ybWF0VHlwZTtcbiAgICB1cmw/OiBzdHJpbmc7XG4gICAgYWx0VGV4dD86IHN0cmluZztcbiAgICBnYWxsZXJ5SW5kZXg/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgZW51bSBHcm91cFR5cGUge1xuICAgIEFUVFJJQlVURV9HUk9VUCA9ICdBdHRyaWJ1dGVHcm91cCcsXG4gICAgU1VCX0lURU1fR1JPVVAgPSAnU3ViSXRlbUdyb3VwJyxcbiAgICBDT05GTElDVF9IRUFERVJfR1JPVVAgPSAnQ29uZmxpY3RIZWFkZXJHcm91cCcsXG4gICAgQ09ORkxJQ1RfR1JPVVAgPSAnQ29uZmxpY3RHcm91cCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBVaVR5cGUge1xuICAgIE5PVF9JTVBMRU1FTlRFRCA9ICdub3RfaW1wbGVtZW50ZWQnLFxuICAgIFJBRElPQlVUVE9OID0gJ3JhZGlvR3JvdXAnLFxuICAgIFJBRElPQlVUVE9OX0FERElUSU9OQUxfSU5QVVQgPSAncmFkaW9Hcm91cF9hZGQnLFxuICAgIENIRUNLQk9YID0gJ2NoZWNrQm94JyxcbiAgICBDSEVDS0JPWExJU1QgPSAnY2hlY2tCb3hMaXN0JyxcbiAgICBEUk9QRE9XTiA9ICdkcm9wZG93bicsXG4gICAgRFJPUERPV05fQURESVRJT05BTF9JTlBVVCA9ICdkcm9wZG93bl9hZGQnLFxuICAgIExJU1RCT1ggPSAnbGlzdGJveCcsXG4gICAgTElTVEJPWF9NVUxUSSA9ICdsaXN0Ym94bXVsdGknLFxuICAgIFJFQURfT05MWSA9ICdyZWFkb25seScsXG4gICAgU1RSSU5HID0gJ3N0cmluZycsXG4gICAgTlVNRVJJQyA9ICdudW1lcmljJyxcbiAgICBBVVRPX0NPTVBMRVRFX0NVU1RPTSA9ICdpbnB1dF9hdXRvY29tcGxldGUnLFxuICAgIE1VTFRJX1NFTEVDVElPTl9JTUFHRSA9ICdtdWx0aV9zZWxlY3Rpb25faW1hZ2UnLFxuICAgIFNJTkdMRV9TRUxFQ1RJT05fSU1BR0UgPSAnc2luZ2xlX3NlbGVjdGlvbl9pbWFnZScsXG5cbiAgICAvL2ludHJvZHVjZWQgd2l0aCBDUFFcblxuICAgIENIRUNLQk9YTElTVF9QUk9EVUNUID0gJ2NoZWNrQm94TGlzdFByb2R1Y3QnLFxuICAgIERST1BET1dOX1BST0RVQ1QgPSAnZHJvcGRvd25Qcm9kdWN0JyxcbiAgICBSQURJT0JVVFRPTl9QUk9EVUNUID0gJ3JhZGlvR3JvdXBQcm9kdWN0JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEltYWdlRm9ybWF0VHlwZSB7XG4gICAgVkFMVUVfSU1BR0UgPSAnVkFMVUVfSU1BR0UnLFxuICAgIEFUVFJJQlVURV9JTUFHRSA9ICdBVFRSSUJVVEVfSU1BR0UnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gSW1hZ2VUeXBlIHtcbiAgICBQUklNQVJZID0gJ1BSSU1BUlknLFxuICAgIEdBTExFUlkgPSAnR0FMTEVSWScsXG4gIH1cblxuICBleHBvcnQgZW51bSBEYXRhVHlwZSB7XG4gICAgSU5QVVRfU1RSSU5HID0gJ1N0cmluZycsXG4gICAgSU5QVVRfTlVNQkVSID0gJ051bWJlcicsXG4gICAgVVNFUl9TRUxFQ1RJT05fUVRZX0FUVFJJQlVURV9MRVZFTCA9ICdVc2VyU2VsZWN0aW9uV2l0aEF0dHJpYnV0ZVF1YW50aXR5JyxcbiAgICBVU0VSX1NFTEVDVElPTl9RVFlfVkFMVUVfTEVWRUwgPSAnVXNlclNlbGVjdGlvbldpdGhWYWx1ZVF1YW50aXR5JyxcbiAgICBVU0VSX1NFTEVDVElPTl9OT19RVFkgPSAnVXNlclNlbGVjdGlvbldpdGhvdXRRdWFudGl0eScsXG4gICAgTk9UX0lNUExFTUVOVEVEID0gJ25vdF9pbXBsZW1lbnRlZCcsXG4gIH1cbiAgZXhwb3J0IGVudW0gVXBkYXRlVHlwZSB7XG4gICAgQVRUUklCVVRFID0gJ0F0dHJpYnV0ZScsXG4gICAgQVRUUklCVVRFX1FVQU5USVRZID0gJ0F0dHJpYnV0ZVF1YW50aXR5JyxcbiAgICBWQUxVRV9RVUFOVElUWSA9ICdWYWx1ZVF1YW50aXR5JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEF0dHJpYnV0ZU92ZXJ2aWV3VHlwZSB7XG4gICAgR0VORVJBTCA9ICdnZW5lcmFsJyxcbiAgICBCVU5ETEUgPSAnYnVuZGxlJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIFZhbGlkYXRpb25UeXBlIHtcbiAgICBOT05FID0gJ05PTkUnLFxuICAgIE5VTUVSSUMgPSAnTlVNRVJJQycsXG4gIH1cbn1cbiJdfQ==