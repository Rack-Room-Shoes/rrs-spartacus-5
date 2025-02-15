import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, HostBinding, NgModule, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ORDER_ENTRIES_CONTEXT, OrderEntriesSource, ProductImportStatus } from '@spartacus/cart/base/root';
import { combineLatest, of, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { take, map, switchMap, tap, startWith, filter, pluck, finalize } from 'rxjs/operators';
import * as i3$1 from '@spartacus/core';
import { GlobalMessageType, I18nModule, UrlModule, ConfigModule, CxDatePipe, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { FormUtils, ICON_TYPE, DIALOG_TYPE, FormErrorsModule, IconModule, KeyboardFocusModule, FileUploadModule, PageComponentModule } from '@spartacus/storefront';
import * as i3 from '@spartacus/cart/import-export/core';
import { CartNameSource } from '@spartacus/cart/import-export/core';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as i6 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ExportOrderEntriesToCsvService {
    constructor(exportCsvFileService, importExportConfig, globalMessageService, translationService) {
        var _a, _b;
        this.exportCsvFileService = exportCsvFileService;
        this.importExportConfig = importExportConfig;
        this.globalMessageService = globalMessageService;
        this.translationService = translationService;
        this.columns = [
            {
                name: {
                    key: 'code',
                },
                value: 'product.code',
            },
            {
                name: {
                    key: 'quantity',
                },
                value: 'quantity',
            },
            ...((_b = (_a = this.exportConfig) === null || _a === void 0 ? void 0 : _a.additionalColumns) !== null && _b !== void 0 ? _b : []),
        ];
    }
    get exportConfig() {
        var _a;
        return (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.export;
    }
    get separator() {
        var _a;
        return (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.file.separator;
    }
    downloadCsv(entries) {
        this.getResolvedEntries(entries)
            .pipe(take(1))
            .subscribe((csvData) => this.download(csvData));
    }
    resolveValue(combinedKeys, entry) {
        var _a, _b;
        return ((_b = (_a = combinedKeys
            .split('.')
            .reduce((obj, key) => (obj ? obj[key] : ''), entry)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
    }
    resolveValues(entries) {
        return entries.map((entry) => this.columns.map((column) => this.resolveValue(column.value, entry)));
    }
    getTranslatedColumnHeaders() {
        return combineLatest(this.columns.map((column) => this.translationService.translate(`exportEntries.columnNames.${column.name.key}`)));
    }
    displayExportMessage() {
        this.globalMessageService.add({ key: 'exportEntries.exportMessage' }, GlobalMessageType.MSG_TYPE_INFO);
    }
    limitValues(data) {
        var _a, _b;
        return ((_a = this.exportConfig) === null || _a === void 0 ? void 0 : _a.maxEntries)
            ? data.splice(0, (_b = this.exportConfig) === null || _b === void 0 ? void 0 : _b.maxEntries)
            : data;
    }
    getResolvedEntries(entries) {
        const values = this.limitValues(this.resolveValues(entries));
        return this.getTranslatedColumnHeaders().pipe(map((headers) => {
            return [headers, ...values];
        }));
    }
    download(entries) {
        var _a, _b, _c;
        if ((_a = this.exportConfig) === null || _a === void 0 ? void 0 : _a.messageEnabled) {
            this.displayExportMessage();
        }
        setTimeout(() => {
            if (this.exportConfig !== undefined && this.separator !== undefined) {
                this.exportCsvFileService.download(entries, this.separator, this.exportConfig.fileOptions);
            }
        }, (_c = (_b = this.exportConfig) === null || _b === void 0 ? void 0 : _b.downloadDelay) !== null && _c !== void 0 ? _c : 0);
    }
}
ExportOrderEntriesToCsvService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesToCsvService, deps: [{ token: i1.ExportCsvFileService }, { token: i3.ImportExportConfig }, { token: i3$1.GlobalMessageService }, { token: i3$1.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
ExportOrderEntriesToCsvService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesToCsvService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesToCsvService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ExportCsvFileService }, { type: i3.ImportExportConfig }, { type: i3$1.GlobalMessageService }, { type: i3$1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ExportOrderEntriesComponent {
    constructor(exportEntriesService, contextService) {
        this.exportEntriesService = exportEntriesService;
        this.contextService = contextService;
        this.styles = 'container';
        this.orderEntriesContext$ = this.contextService.get(ORDER_ENTRIES_CONTEXT);
        this.entries$ = this.orderEntriesContext$.pipe(switchMap((orderEntriesContext) => { var _a, _b; return (_b = (_a = orderEntriesContext === null || orderEntriesContext === void 0 ? void 0 : orderEntriesContext.getEntries) === null || _a === void 0 ? void 0 : _a.call(orderEntriesContext)) !== null && _b !== void 0 ? _b : of(undefined); }));
    }
    exportCsv(entries) {
        this.exportEntriesService.downloadCsv(entries);
    }
}
ExportOrderEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesComponent, deps: [{ token: ExportOrderEntriesToCsvService }, { token: i1.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ExportOrderEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ExportOrderEntriesComponent, selector: "cx-export-order-entries", host: { properties: { "class": "this.styles" } }, ngImport: i0, template: "<button\n  *ngIf=\"(entries$ | async)?.length > 0 && (entries$ | async) as entries\"\n  class=\"link cx-action-link\"\n  (click)=\"exportCsv(entries)\"\n>\n  {{ 'exportEntries.exportToCsv' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-export-order-entries', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  *ngIf=\"(entries$ | async)?.length > 0 && (entries$ | async) as entries\"\n  class=\"link cx-action-link\"\n  (click)=\"exportCsv(entries)\"\n>\n  {{ 'exportEntries.exportToCsv' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: ExportOrderEntriesToCsvService }, { type: i1.ContextService }]; }, propDecorators: { styles: [{
                type: HostBinding,
                args: ['class']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ExportOrderEntriesModule {
}
ExportOrderEntriesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExportOrderEntriesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesModule, declarations: [ExportOrderEntriesComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        UrlModule, i3$1.ConfigModule], exports: [ExportOrderEntriesComponent] });
ExportOrderEntriesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesModule, imports: [CommonModule,
        RouterModule,
        I18nModule,
        UrlModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ExportOrderEntriesComponent: {
                    component: ExportOrderEntriesComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ExportOrderEntriesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        UrlModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ExportOrderEntriesComponent: {
                                    component: ExportOrderEntriesComponent,
                                },
                            },
                        }),
                    ],
                    exports: [ExportOrderEntriesComponent],
                    declarations: [ExportOrderEntriesComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportOrderEntriesComponent {
    constructor(launchDialogService, contextService) {
        this.launchDialogService = launchDialogService;
        this.contextService = contextService;
        this.subscription = new Subscription();
        this.orderEntriesContext$ = this.contextService.get(ORDER_ENTRIES_CONTEXT);
    }
    openDialog(orderEntriesContext) {
        this.launchDialogService.openDialogAndSubscribe("IMPORT_TO_CART" /* LAUNCH_CALLER.IMPORT_TO_CART */, this.element, { orderEntriesContext });
    }
}
ImportOrderEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportOrderEntriesComponent, deps: [{ token: i1.LaunchDialogService }, { token: i1.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ImportOrderEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ImportOrderEntriesComponent, selector: "cx-import-order-entries", viewQueries: [{ propertyName: "element", first: true, predicate: ["open"], descendants: true }], ngImport: i0, template: "<button\n  *ngIf=\"orderEntriesContext$ | async as orderEntriesContext\"\n  class=\"link cx-action-link\"\n  (click)=\"openDialog(orderEntriesContext)\"\n>\n  {{ 'importEntries.importProducts' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportOrderEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-order-entries', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  *ngIf=\"orderEntriesContext$ | async as orderEntriesContext\"\n  class=\"link cx-action-link\"\n  (click)=\"openDialog(orderEntriesContext)\"\n>\n  {{ 'importEntries.importProducts' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i1.ContextService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['open']
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportProductsFromCsvService {
    constructor() {
        // Intentional empty constructor
    }
    csvDataToProduct(csvData) {
        return csvData.map((row) => ({
            productCode: row[0],
            quantity: Number(row[1]),
        }));
    }
    isDataParsableToProducts(data) {
        const patternRegex = new RegExp(/(?:\s|^)\d+(?=\s|$)/);
        return data.length > 0 && data.every((row) => patternRegex.test(row[1]));
    }
}
ImportProductsFromCsvService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportProductsFromCsvService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ImportProductsFromCsvService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportProductsFromCsvService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportProductsFromCsvService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportEntriesFormComponent {
    constructor(launchDialogService, importToCartService, importCsvService, filesFormValidators, importExportConfig) {
        this.launchDialogService = launchDialogService;
        this.importToCartService = importToCartService;
        this.importCsvService = importCsvService;
        this.filesFormValidators = filesFormValidators;
        this.importExportConfig = importExportConfig;
        this.formSubmitSubject$ = new Subject();
        this.submitEvent = new EventEmitter();
    }
    ngOnInit() {
        this.form = this.buildForm();
        this.formSubmitSubject$
            .pipe(tap(() => {
            if (this.form.invalid) {
                this.form.markAllAsTouched();
                FormUtils.deepUpdateValueAndValidity(this.form);
            }
        }), switchMap(() => { var _a; return this.form.statusChanges.pipe(startWith((_a = this.form.get('file')) === null || _a === void 0 ? void 0 : _a.status), filter((status) => status !== 'PENDING'), take(1)); }), filter((status) => status === 'VALID'))
            .subscribe(() => {
            this.save();
        });
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    save() {
        var _a, _b;
        const file = (_b = (_a = this.form.get('file')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[0];
        if (this.separator !== undefined) {
            this.importCsvService
                .loadFile(file, this.separator)
                .subscribe((loadedFile) => {
                this.submitEvent.emit({
                    products: this.importToCartService.csvDataToProduct(loadedFile),
                });
            });
        }
    }
    buildForm() {
        const form = new UntypedFormGroup({});
        form.setControl('file', new UntypedFormControl('', [Validators.required, this.filesFormValidators.maxSize(this.maxSize)], [
            (control) => this.separator !== undefined
                ? this.importCsvService.validateFile(control.value[0], {
                    separator: this.separator,
                    isDataParsable: this.importToCartService.isDataParsableToProducts,
                    maxEntries: this.maxEntries,
                })
                : of(null),
        ]));
        return form;
    }
    get allowedTypes() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.import) === null || _b === void 0 ? void 0 : _b.fileValidity) === null || _c === void 0 ? void 0 : _c.allowedTypes;
    }
    get maxSize() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.import) === null || _b === void 0 ? void 0 : _b.fileValidity) === null || _c === void 0 ? void 0 : _c.maxSize;
    }
    get maxEntries() {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.import) === null || _b === void 0 ? void 0 : _b.fileValidity) === null || _c === void 0 ? void 0 : _c.maxEntries) === null || _d === void 0 ? void 0 : _d[this.type];
    }
    get separator() {
        var _a;
        return (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.file.separator;
    }
}
ImportEntriesFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportEntriesFormComponent, deps: [{ token: i1.LaunchDialogService }, { token: ImportProductsFromCsvService }, { token: i1.ImportCsvFileService }, { token: i1.FilesFormValidators }, { token: i3.ImportExportConfig }], target: i0.ɵɵFactoryTarget.Component });
ImportEntriesFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ImportEntriesFormComponent, selector: "cx-import-entries-form", inputs: { type: "type" }, outputs: { submitEvent: "submitEvent" }, ngImport: i0, template: "<form *ngIf=\"form\" [formGroup]=\"form\" (submit)=\"formSubmitSubject$.next()\">\n  <p class=\"cx-import-entries-subtitle\">\n    {{ 'importEntriesDialog.importProductsSubtitle' | cxTranslate }}\n  </p>\n  <p>\n    {{ 'importEntriesDialog.importProductFileDetails' | cxTranslate }}\n  </p>\n  <label>\n    <cx-file-upload [formControl]=\"form.get('file')\" [accept]=\"allowedTypes\">\n      {{ 'importEntriesDialog.selectFile' | cxTranslate }}\n    </cx-file-upload>\n    <cx-form-errors\n      [control]=\"form.get('file')\"\n      prefix=\"formErrors.file\"\n    ></cx-form-errors>\n  </label>\n  <div class=\"cx-import-entries-footer\">\n    <button\n      (click)=\"close('Close Import Products Dialog')\"\n      class=\"btn btn-action\"\n      type=\"button\"\n    >\n      {{ 'importEntriesDialog.cancel' | cxTranslate }}\n    </button>\n    <button\n      class=\"btn btn-primary\"\n      type=\"submit\"\n      [disabled]=\"form.get('file')?.status === 'PENDING'\"\n    >\n      {{ 'importEntriesDialog.upload' | cxTranslate }}\n    </button>\n  </div>\n</form>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i6.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i1.FileUploadComponent, selector: "cx-file-upload", inputs: ["accept", "multiple"], outputs: ["update"] }, { kind: "pipe", type: i3$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportEntriesFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-entries-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form *ngIf=\"form\" [formGroup]=\"form\" (submit)=\"formSubmitSubject$.next()\">\n  <p class=\"cx-import-entries-subtitle\">\n    {{ 'importEntriesDialog.importProductsSubtitle' | cxTranslate }}\n  </p>\n  <p>\n    {{ 'importEntriesDialog.importProductFileDetails' | cxTranslate }}\n  </p>\n  <label>\n    <cx-file-upload [formControl]=\"form.get('file')\" [accept]=\"allowedTypes\">\n      {{ 'importEntriesDialog.selectFile' | cxTranslate }}\n    </cx-file-upload>\n    <cx-form-errors\n      [control]=\"form.get('file')\"\n      prefix=\"formErrors.file\"\n    ></cx-form-errors>\n  </label>\n  <div class=\"cx-import-entries-footer\">\n    <button\n      (click)=\"close('Close Import Products Dialog')\"\n      class=\"btn btn-action\"\n      type=\"button\"\n    >\n      {{ 'importEntriesDialog.cancel' | cxTranslate }}\n    </button>\n    <button\n      class=\"btn btn-primary\"\n      type=\"submit\"\n      [disabled]=\"form.get('file')?.status === 'PENDING'\"\n    >\n      {{ 'importEntriesDialog.upload' | cxTranslate }}\n    </button>\n  </div>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: ImportProductsFromCsvService }, { type: i1.ImportCsvFileService }, { type: i1.FilesFormValidators }, { type: i3.ImportExportConfig }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], type: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportEntriesSummaryComponent {
    constructor() {
        this.iconTypes = ICON_TYPE;
        this.orderEntriesSource = OrderEntriesSource;
        this.warningDetailsOpened = false;
        this.errorDetailsOpened = false;
        this.closeEvent = new EventEmitter();
    }
    close(reason) {
        this.closeEvent.emit(reason);
    }
    toggleWarningList() {
        this.warningDetailsOpened = !this.warningDetailsOpened;
    }
    toggleErrorList() {
        this.errorDetailsOpened = !this.errorDetailsOpened;
    }
}
ImportEntriesSummaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportEntriesSummaryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ImportEntriesSummaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ImportEntriesSummaryComponent, selector: "cx-import-entries-summary", inputs: { type: "type", summary: "summary" }, outputs: { closeEvent: "closeEvent" }, ngImport: i0, template: "<div class=\"cx-import-entries-summary-status\">\n  <p *ngIf=\"!summary.loading; else loading\" [ngSwitch]=\"type\">\n    <ng-container *ngSwitchCase=\"orderEntriesSource.QUICK_ORDER\">\n      {{ 'importEntriesDialog.summary.loaded' | cxTranslate: summary }}\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n      {{ 'importEntriesDialog.summary.loadedToCart' | cxTranslate: summary }}\n    </ng-container>\n  </p>\n  <ng-template #loading>\n    <p>\n      {{ 'importEntriesDialog.summary.loading' | cxTranslate: summary }}\n    </p>\n  </ng-template>\n</div>\n<p\n  *ngIf=\"summary.successesCount > 0\"\n  class=\"cx-import-entries-summary-successes\"\n>\n  <cx-icon class=\"success\" [type]=\"iconTypes.SUCCESS\"></cx-icon>\n  {{ 'importEntriesDialog.summary.successes' | cxTranslate: summary }}\n</p>\n<div\n  *ngIf=\"summary.warningMessages.length > 0\"\n  class=\"cx-import-entries-summary-warnings\"\n>\n  <p>\n    <cx-icon class=\"warning\" [type]=\"iconTypes.ERROR\"></cx-icon>\n    {{\n      'importEntriesDialog.summary.warning'\n        | cxTranslate: { count: summary.warningMessages.length }\n    }}\n    <button class=\"link cx-action-link\" (click)=\"toggleWarningList()\">\n      {{\n        (warningDetailsOpened\n          ? 'importEntriesDialog.summary.hide'\n          : 'importEntriesDialog.summary.show'\n        ) | cxTranslate\n      }}\n    </button>\n  </p>\n  <ul *ngIf=\"warningDetailsOpened\">\n    <li *ngFor=\"let message of summary.warningMessages\">\n      {{\n        'importEntriesDialog.summary.messages.' + message.statusCode\n          | cxTranslate: message\n      }}\n    </li>\n  </ul>\n</div>\n<div\n  *ngIf=\"summary.errorMessages.length > 0\"\n  class=\"cx-import-entries-summary-errors\"\n>\n  <p>\n    <cx-icon class=\"error\" [type]=\"iconTypes.RESET\"></cx-icon>\n    {{\n      'importEntriesDialog.summary.error'\n        | cxTranslate: { count: summary.errorMessages.length }\n    }}\n    <button class=\"link cx-action-link\" (click)=\"toggleErrorList()\">\n      {{\n        (errorDetailsOpened\n          ? 'importEntriesDialog.summary.hide'\n          : 'importEntriesDialog.summary.show'\n        ) | cxTranslate\n      }}\n    </button>\n  </p>\n  <ul *ngIf=\"errorDetailsOpened\">\n    <li *ngFor=\"let message of summary.errorMessages\">\n      {{\n        'importEntriesDialog.summary.messages.' + message.statusCode\n          | cxTranslate: message\n      }}\n    </li>\n  </ul>\n</div>\n<div class=\"cx-import-entries-summary-footer\">\n  <button\n    *ngIf=\"!summary.loading; else info\"\n    (click)=\"close('Close Import Products Dialog')\"\n    class=\"btn btn-action\"\n    type=\"button\"\n  >\n    {{ 'importEntriesDialog.close' | cxTranslate }}\n  </button>\n  <ng-template #info>\n    <p>{{ 'importEntriesDialog.summary.info' | cxTranslate }}</p>\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportEntriesSummaryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-entries-summary', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-import-entries-summary-status\">\n  <p *ngIf=\"!summary.loading; else loading\" [ngSwitch]=\"type\">\n    <ng-container *ngSwitchCase=\"orderEntriesSource.QUICK_ORDER\">\n      {{ 'importEntriesDialog.summary.loaded' | cxTranslate: summary }}\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n      {{ 'importEntriesDialog.summary.loadedToCart' | cxTranslate: summary }}\n    </ng-container>\n  </p>\n  <ng-template #loading>\n    <p>\n      {{ 'importEntriesDialog.summary.loading' | cxTranslate: summary }}\n    </p>\n  </ng-template>\n</div>\n<p\n  *ngIf=\"summary.successesCount > 0\"\n  class=\"cx-import-entries-summary-successes\"\n>\n  <cx-icon class=\"success\" [type]=\"iconTypes.SUCCESS\"></cx-icon>\n  {{ 'importEntriesDialog.summary.successes' | cxTranslate: summary }}\n</p>\n<div\n  *ngIf=\"summary.warningMessages.length > 0\"\n  class=\"cx-import-entries-summary-warnings\"\n>\n  <p>\n    <cx-icon class=\"warning\" [type]=\"iconTypes.ERROR\"></cx-icon>\n    {{\n      'importEntriesDialog.summary.warning'\n        | cxTranslate: { count: summary.warningMessages.length }\n    }}\n    <button class=\"link cx-action-link\" (click)=\"toggleWarningList()\">\n      {{\n        (warningDetailsOpened\n          ? 'importEntriesDialog.summary.hide'\n          : 'importEntriesDialog.summary.show'\n        ) | cxTranslate\n      }}\n    </button>\n  </p>\n  <ul *ngIf=\"warningDetailsOpened\">\n    <li *ngFor=\"let message of summary.warningMessages\">\n      {{\n        'importEntriesDialog.summary.messages.' + message.statusCode\n          | cxTranslate: message\n      }}\n    </li>\n  </ul>\n</div>\n<div\n  *ngIf=\"summary.errorMessages.length > 0\"\n  class=\"cx-import-entries-summary-errors\"\n>\n  <p>\n    <cx-icon class=\"error\" [type]=\"iconTypes.RESET\"></cx-icon>\n    {{\n      'importEntriesDialog.summary.error'\n        | cxTranslate: { count: summary.errorMessages.length }\n    }}\n    <button class=\"link cx-action-link\" (click)=\"toggleErrorList()\">\n      {{\n        (errorDetailsOpened\n          ? 'importEntriesDialog.summary.hide'\n          : 'importEntriesDialog.summary.show'\n        ) | cxTranslate\n      }}\n    </button>\n  </p>\n  <ul *ngIf=\"errorDetailsOpened\">\n    <li *ngFor=\"let message of summary.errorMessages\">\n      {{\n        'importEntriesDialog.summary.messages.' + message.statusCode\n          | cxTranslate: message\n      }}\n    </li>\n  </ul>\n</div>\n<div class=\"cx-import-entries-summary-footer\">\n  <button\n    *ngIf=\"!summary.loading; else info\"\n    (click)=\"close('Close Import Products Dialog')\"\n    class=\"btn btn-action\"\n    type=\"button\"\n  >\n    {{ 'importEntriesDialog.close' | cxTranslate }}\n  </button>\n  <ng-template #info>\n    <p>{{ 'importEntriesDialog.summary.info' | cxTranslate }}</p>\n  </ng-template>\n</div>\n" }]
        }], propDecorators: { type: [{
                type: Input
            }], summary: [{
                type: Input
            }], closeEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportToNewSavedCartFormComponent extends ImportEntriesFormComponent {
    constructor(launchDialogService, importToCartService, importCsvService, filesFormValidators, importExportConfig, datePipe) {
        super(launchDialogService, importToCartService, importCsvService, filesFormValidators, importExportConfig);
        this.launchDialogService = launchDialogService;
        this.importToCartService = importToCartService;
        this.importCsvService = importCsvService;
        this.filesFormValidators = filesFormValidators;
        this.importExportConfig = importExportConfig;
        this.datePipe = datePipe;
        this.descriptionMaxLength = 250;
        this.nameMaxLength = 50;
        this.submitEvent = new EventEmitter();
    }
    get descriptionsCharacterLeft() {
        var _a, _b;
        return (this.descriptionMaxLength -
            (((_b = (_a = this.form.get('description')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) || 0));
    }
    save() {
        var _a, _b;
        const file = (_b = (_a = this.form.get('file')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[0];
        if (this.separator !== undefined) {
            this.importCsvService
                .loadFile(file, this.separator)
                .subscribe((loadedFile) => {
                var _a, _b;
                this.submitEvent.emit({
                    products: this.importToCartService.csvDataToProduct(loadedFile),
                    savedCartInfo: {
                        name: (_a = this.form.get('name')) === null || _a === void 0 ? void 0 : _a.value,
                        description: (_b = this.form.get('description')) === null || _b === void 0 ? void 0 : _b.value,
                    },
                });
            });
        }
    }
    buildForm() {
        const form = new UntypedFormGroup({});
        form.setControl('file', new UntypedFormControl('', [Validators.required, this.filesFormValidators.maxSize(this.maxSize)], [
            (control) => this.separator !== undefined
                ? this.importCsvService.validateFile(control.value[0], {
                    separator: this.separator,
                    isDataParsable: this.importToCartService.isDataParsableToProducts,
                    maxEntries: this.maxEntries,
                })
                : of(null),
        ]));
        form.setControl('name', new UntypedFormControl('', [
            Validators.required,
            Validators.maxLength(this.nameMaxLength),
        ]));
        form.setControl('description', new UntypedFormControl('', [
            Validators.maxLength(this.descriptionMaxLength),
        ]));
        return form;
    }
    updateCartName() {
        var _a;
        const nameField = this.form.get('name');
        if (nameField && !(nameField === null || nameField === void 0 ? void 0 : nameField.value) && ((_a = this.cartNameGeneration) === null || _a === void 0 ? void 0 : _a.source)) {
            switch (this.cartNameGeneration.source) {
                case CartNameSource.FILE_NAME: {
                    this.setFieldValueByFileName(nameField);
                    break;
                }
                case CartNameSource.DATE_TIME: {
                    this.setFieldValueByDatetime(nameField);
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    setFieldValueByFileName(nameField) {
        var _a, _b, _c, _d;
        const fileName = (_d = (_c = (_b = (_a = this.form
            .get('file')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.replace(/\.[^/.]+$/, '');
        nameField.setValue(fileName);
    }
    setFieldValueByDatetime(nameField) {
        var _a, _b, _c;
        const date = new Date();
        const fromDateOptions = (_a = this.cartNameGeneration) === null || _a === void 0 ? void 0 : _a.fromDateOptions;
        const mask = fromDateOptions === null || fromDateOptions === void 0 ? void 0 : fromDateOptions.mask;
        const prefix = (_b = fromDateOptions === null || fromDateOptions === void 0 ? void 0 : fromDateOptions.prefix) !== null && _b !== void 0 ? _b : '';
        const suffix = (_c = fromDateOptions === null || fromDateOptions === void 0 ? void 0 : fromDateOptions.suffix) !== null && _c !== void 0 ? _c : '';
        const dateString = mask
            ? this.datePipe.transform(date, mask)
            : this.datePipe.transform(date);
        nameField.setValue(`${prefix}${dateString}${suffix}`);
    }
    get cartNameGeneration() {
        var _a, _b;
        return (_b = (_a = this.importExportConfig.cartImportExport) === null || _a === void 0 ? void 0 : _a.import) === null || _b === void 0 ? void 0 : _b.cartNameGeneration;
    }
}
ImportToNewSavedCartFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportToNewSavedCartFormComponent, deps: [{ token: i1.LaunchDialogService }, { token: ImportProductsFromCsvService }, { token: i1.ImportCsvFileService }, { token: i1.FilesFormValidators }, { token: i3.ImportExportConfig }, { token: i3$1.CxDatePipe }], target: i0.ɵɵFactoryTarget.Component });
ImportToNewSavedCartFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ImportToNewSavedCartFormComponent, selector: "cx-import-to-new-saved-cart-form", outputs: { submitEvent: "submitEvent" }, providers: [CxDatePipe], usesInheritance: true, ngImport: i0, template: "<form *ngIf=\"form\" [formGroup]=\"form\" (submit)=\"formSubmitSubject$.next()\">\n  <p class=\"cx-import-entries-subtitle\">\n    {{ 'importEntriesDialog.importProductsNewSavedCartSubtitle' | cxTranslate }}\n  </p>\n  <p>\n    {{ 'importEntriesDialog.importProductFileDetails' | cxTranslate }}\n  </p>\n  <label>\n    <cx-file-upload\n      [formControl]=\"form.get('file')\"\n      (update)=\"updateCartName()\"\n      [accept]=\"allowedTypes\"\n    >\n      {{ 'importEntriesDialog.selectFile' | cxTranslate }}\n    </cx-file-upload>\n    <cx-form-errors\n      [control]=\"form.get('file')\"\n      prefix=\"formErrors.file\"\n    ></cx-form-errors>\n  </label>\n  <div class=\"cx-import-entries-row\">\n    <label>\n      <span class=\"cx-import-entries-label label-content\">\n        {{ 'importEntriesDialog.savedCartName' | cxTranslate }}\n      </span>\n      <input\n        [maxLength]=\"nameMaxLength\"\n        class=\"form-control\"\n        formControlName=\"name\"\n        required\n        type=\"text\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n  </div>\n\n  <div class=\"cx-import-entries-row\">\n    <label>\n      <span class=\"cx-import-entries-label label-content\">\n        {{ 'importEntriesDialog.savedCartDescription' | cxTranslate }}\n        <span class=\"cx-import-entries-label-optional\">\n          ({{ 'importEntriesDialog.optional' | cxTranslate }})\n        </span></span\n      >\n      <textarea\n        [maxLength]=\"descriptionMaxLength\"\n        class=\"form-control\"\n        formControlName=\"description\"\n        rows=\"5\"\n      ></textarea>\n      <cx-form-errors [control]=\"form.get('description')\"></cx-form-errors>\n\n      <p class=\"cx-import-entries-input-hint\">\n        {{\n          'importEntriesDialog.charactersLeft'\n            | cxTranslate: { count: descriptionsCharacterLeft }\n        }}\n      </p>\n    </label>\n  </div>\n  <div class=\"cx-import-entries-footer\">\n    <button\n      (click)=\"close('Close Import Products Dialog')\"\n      class=\"btn btn-action\"\n      type=\"button\"\n    >\n      {{ 'importEntriesDialog.cancel' | cxTranslate }}\n    </button>\n    <button\n      class=\"btn btn-primary\"\n      type=\"submit\"\n      [disabled]=\"form.get('file')?.status === 'PENDING'\"\n    >\n      {{ 'importEntriesDialog.upload' | cxTranslate }}\n    </button>\n  </div>\n</form>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i6.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i6.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i6.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i6.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i1.FileUploadComponent, selector: "cx-file-upload", inputs: ["accept", "multiple"], outputs: ["update"] }, { kind: "pipe", type: i3$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportToNewSavedCartFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-to-new-saved-cart-form', changeDetection: ChangeDetectionStrategy.OnPush, providers: [CxDatePipe], template: "<form *ngIf=\"form\" [formGroup]=\"form\" (submit)=\"formSubmitSubject$.next()\">\n  <p class=\"cx-import-entries-subtitle\">\n    {{ 'importEntriesDialog.importProductsNewSavedCartSubtitle' | cxTranslate }}\n  </p>\n  <p>\n    {{ 'importEntriesDialog.importProductFileDetails' | cxTranslate }}\n  </p>\n  <label>\n    <cx-file-upload\n      [formControl]=\"form.get('file')\"\n      (update)=\"updateCartName()\"\n      [accept]=\"allowedTypes\"\n    >\n      {{ 'importEntriesDialog.selectFile' | cxTranslate }}\n    </cx-file-upload>\n    <cx-form-errors\n      [control]=\"form.get('file')\"\n      prefix=\"formErrors.file\"\n    ></cx-form-errors>\n  </label>\n  <div class=\"cx-import-entries-row\">\n    <label>\n      <span class=\"cx-import-entries-label label-content\">\n        {{ 'importEntriesDialog.savedCartName' | cxTranslate }}\n      </span>\n      <input\n        [maxLength]=\"nameMaxLength\"\n        class=\"form-control\"\n        formControlName=\"name\"\n        required\n        type=\"text\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n  </div>\n\n  <div class=\"cx-import-entries-row\">\n    <label>\n      <span class=\"cx-import-entries-label label-content\">\n        {{ 'importEntriesDialog.savedCartDescription' | cxTranslate }}\n        <span class=\"cx-import-entries-label-optional\">\n          ({{ 'importEntriesDialog.optional' | cxTranslate }})\n        </span></span\n      >\n      <textarea\n        [maxLength]=\"descriptionMaxLength\"\n        class=\"form-control\"\n        formControlName=\"description\"\n        rows=\"5\"\n      ></textarea>\n      <cx-form-errors [control]=\"form.get('description')\"></cx-form-errors>\n\n      <p class=\"cx-import-entries-input-hint\">\n        {{\n          'importEntriesDialog.charactersLeft'\n            | cxTranslate: { count: descriptionsCharacterLeft }\n        }}\n      </p>\n    </label>\n  </div>\n  <div class=\"cx-import-entries-footer\">\n    <button\n      (click)=\"close('Close Import Products Dialog')\"\n      class=\"btn btn-action\"\n      type=\"button\"\n    >\n      {{ 'importEntriesDialog.cancel' | cxTranslate }}\n    </button>\n    <button\n      class=\"btn btn-primary\"\n      type=\"submit\"\n      [disabled]=\"form.get('file')?.status === 'PENDING'\"\n    >\n      {{ 'importEntriesDialog.upload' | cxTranslate }}\n    </button>\n  </div>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: ImportProductsFromCsvService }, { type: i1.ImportCsvFileService }, { type: i1.FilesFormValidators }, { type: i3.ImportExportConfig }, { type: i3$1.CxDatePipe }]; }, propDecorators: { submitEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportEntriesDialogComponent {
    constructor(launchDialogService) {
        this.launchDialogService = launchDialogService;
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
        this.formState = true;
        this.summary$ = new BehaviorSubject({
            loading: false,
            cartName: '',
            count: 0,
            total: 0,
            successesCount: 0,
            warningMessages: [],
            errorMessages: [],
        });
        this.context$ = this.launchDialogService.data$.pipe(pluck('orderEntriesContext'));
    }
    isNewCartForm(context) {
        return context.type === OrderEntriesSource.NEW_SAVED_CART;
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    importProducts(context, { products, savedCartInfo, }) {
        this.formState = false;
        this.summary$.next(Object.assign(Object.assign({}, this.summary$.value), { loading: true, total: products.length, cartName: savedCartInfo === null || savedCartInfo === void 0 ? void 0 : savedCartInfo.name }));
        context
            .addEntries(products, savedCartInfo)
            .pipe(finalize(() => {
            this.summary$.next(Object.assign(Object.assign({}, this.summary$.value), { loading: false }));
        }))
            .subscribe((action) => {
            this.populateSummary(action);
        });
    }
    populateSummary(action) {
        if (action.statusCode === ProductImportStatus.SUCCESS) {
            this.summary$.next(Object.assign(Object.assign({}, this.summary$.value), { count: this.summary$.value.count + 1, successesCount: this.summary$.value.successesCount + 1 }));
        }
        else if (action.statusCode === ProductImportStatus.LOW_STOCK) {
            this.summary$.next(Object.assign(Object.assign({}, this.summary$.value), { count: this.summary$.value.count + 1, warningMessages: [...this.summary$.value.warningMessages, action] }));
        }
        else {
            this.summary$.next(Object.assign(Object.assign({}, this.summary$.value), { count: this.summary$.value.count + 1, errorMessages: [...this.summary$.value.errorMessages, action] }));
        }
    }
}
ImportEntriesDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportEntriesDialogComponent, deps: [{ token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ImportEntriesDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ImportEntriesDialogComponent, selector: "cx-import-entries-dialog", ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-import-entries-dialog\"\n>\n  <div class=\"cx-import-entries-container\">\n    <!-- Modal Header -->\n    <div class=\"modal-header cx-import-entries-header\">\n      <ng-container>\n        <div class=\"cx-import-entries-title modal-title\">\n          {{ 'importEntriesDialog.importProducts' | cxTranslate }}\n        </div>\n      </ng-container>\n\n      <button\n        (click)=\"close('Close Import Products Dialog')\"\n        [attr.aria-label]=\"'importEntriesDialog.close' | cxTranslate\"\n        class=\"cx-import-entries-close close\"\n        type=\"button\"\n        [disabled]=\"(summary$ | async)?.loading\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <ng-container *ngIf=\"context$ | async as context\">\n      <ng-container *ngIf=\"formState; else importSummary\">\n        <cx-import-to-new-saved-cart-form\n          *ngIf=\"isNewCartForm(context); else reducedForm\"\n          [type]=\"context.type\"\n          (submitEvent)=\"importProducts(context, $event)\"\n        ></cx-import-to-new-saved-cart-form>\n        <ng-template #reducedForm>\n          <cx-import-entries-form\n            [type]=\"context.type\"\n            (submitEvent)=\"importProducts(context, $event)\"\n          ></cx-import-entries-form>\n        </ng-template>\n      </ng-container>\n\n      <ng-template #importSummary>\n        <cx-import-entries-summary\n          [summary]=\"summary$ | async\"\n          [type]=\"context.type\"\n          (closeEvent)=\"close('Close Import Products Dialog')\"\n        ></cx-import-entries-summary>\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: ImportEntriesFormComponent, selector: "cx-import-entries-form", inputs: ["type"], outputs: ["submitEvent"] }, { kind: "component", type: ImportEntriesSummaryComponent, selector: "cx-import-entries-summary", inputs: ["type", "summary"], outputs: ["closeEvent"] }, { kind: "component", type: ImportToNewSavedCartFormComponent, selector: "cx-import-to-new-saved-cart-form", outputs: ["submitEvent"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportEntriesDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-entries-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-import-entries-dialog\"\n>\n  <div class=\"cx-import-entries-container\">\n    <!-- Modal Header -->\n    <div class=\"modal-header cx-import-entries-header\">\n      <ng-container>\n        <div class=\"cx-import-entries-title modal-title\">\n          {{ 'importEntriesDialog.importProducts' | cxTranslate }}\n        </div>\n      </ng-container>\n\n      <button\n        (click)=\"close('Close Import Products Dialog')\"\n        [attr.aria-label]=\"'importEntriesDialog.close' | cxTranslate\"\n        class=\"cx-import-entries-close close\"\n        type=\"button\"\n        [disabled]=\"(summary$ | async)?.loading\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <ng-container *ngIf=\"context$ | async as context\">\n      <ng-container *ngIf=\"formState; else importSummary\">\n        <cx-import-to-new-saved-cart-form\n          *ngIf=\"isNewCartForm(context); else reducedForm\"\n          [type]=\"context.type\"\n          (submitEvent)=\"importProducts(context, $event)\"\n        ></cx-import-to-new-saved-cart-form>\n        <ng-template #reducedForm>\n          <cx-import-entries-form\n            [type]=\"context.type\"\n            (submitEvent)=\"importProducts(context, $event)\"\n          ></cx-import-entries-form>\n        </ng-template>\n      </ng-container>\n\n      <ng-template #importSummary>\n        <cx-import-entries-summary\n          [summary]=\"summary$ | async\"\n          [type]=\"context.type\"\n          (closeEvent)=\"close('Close Import Products Dialog')\"\n        ></cx-import-entries-summary>\n      </ng-template>\n    </ng-container>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultImportEntriesLayoutConfig = {
    launch: {
        IMPORT_TO_CART: {
            inlineRoot: true,
            component: ImportEntriesDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportOrderEntriesModule {
}
ImportOrderEntriesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportOrderEntriesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportOrderEntriesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ImportOrderEntriesModule, declarations: [ImportOrderEntriesComponent,
        ImportEntriesDialogComponent,
        ImportEntriesFormComponent,
        ImportEntriesSummaryComponent,
        ImportToNewSavedCartFormComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        IconModule,
        KeyboardFocusModule,
        FileUploadModule,
        I18nModule, i3$1.ConfigModule], exports: [ImportOrderEntriesComponent,
        ImportEntriesDialogComponent,
        ImportEntriesFormComponent,
        ImportEntriesSummaryComponent,
        ImportToNewSavedCartFormComponent] });
ImportOrderEntriesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportOrderEntriesModule, providers: [provideDefaultConfig(defaultImportEntriesLayoutConfig)], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        IconModule,
        KeyboardFocusModule,
        FileUploadModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ImportOrderEntriesComponent: {
                    component: ImportOrderEntriesComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportOrderEntriesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        IconModule,
                        KeyboardFocusModule,
                        FileUploadModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ImportOrderEntriesComponent: {
                                    component: ImportOrderEntriesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ImportOrderEntriesComponent,
                        ImportEntriesDialogComponent,
                        ImportEntriesFormComponent,
                        ImportEntriesSummaryComponent,
                        ImportToNewSavedCartFormComponent,
                    ],
                    exports: [
                        ImportOrderEntriesComponent,
                        ImportEntriesDialogComponent,
                        ImportEntriesFormComponent,
                        ImportEntriesSummaryComponent,
                        ImportToNewSavedCartFormComponent,
                    ],
                    providers: [provideDefaultConfig(defaultImportEntriesLayoutConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportExportOrderEntriesComponent {
    constructor(contextService) {
        this.contextService = contextService;
        this.context$ = this.contextService.get(ORDER_ENTRIES_CONTEXT);
        this.shouldDisplayImport$ = this.context$.pipe(map((orderEntriesContext) => !!(orderEntriesContext === null || orderEntriesContext === void 0 ? void 0 : orderEntriesContext.addEntries)));
        this.shouldDisplayExport$ = this.context$.pipe(switchMap((orderEntriesContext) => { var _a, _b; return (_b = (_a = orderEntriesContext === null || orderEntriesContext === void 0 ? void 0 : orderEntriesContext.getEntries) === null || _a === void 0 ? void 0 : _a.call(orderEntriesContext)) !== null && _b !== void 0 ? _b : of([]); }), map((entries) => !!(entries === null || entries === void 0 ? void 0 : entries.length)));
    }
}
ImportExportOrderEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportExportOrderEntriesComponent, deps: [{ token: i1.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ImportExportOrderEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.3", type: ImportExportOrderEntriesComponent, selector: "cx-import-export-order-entries", ngImport: i0, template: "<cx-import-order-entries\n  *ngIf=\"shouldDisplayImport$ | async\"\n></cx-import-order-entries>\n<cx-export-order-entries\n  *ngIf=\"shouldDisplayExport$ | async\"\n></cx-export-order-entries>\n", dependencies: [{ kind: "component", type: ImportOrderEntriesComponent, selector: "cx-import-order-entries" }, { kind: "component", type: ExportOrderEntriesComponent, selector: "cx-export-order-entries" }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportExportOrderEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-export-order-entries', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-import-order-entries\n  *ngIf=\"shouldDisplayImport$ | async\"\n></cx-import-order-entries>\n<cx-export-order-entries\n  *ngIf=\"shouldDisplayExport$ | async\"\n></cx-export-order-entries>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ContextService }]; } });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportExportOrderEntriesModule {
}
ImportExportOrderEntriesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportExportOrderEntriesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportOrderEntriesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: ImportExportOrderEntriesModule, declarations: [ImportExportOrderEntriesComponent], imports: [PageComponentModule, i3$1.ConfigModule, I18nModule,
        UrlModule,
        ImportOrderEntriesModule,
        ExportOrderEntriesModule,
        CommonModule], exports: [ImportExportOrderEntriesComponent] });
ImportExportOrderEntriesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportExportOrderEntriesModule, imports: [PageComponentModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ImportExportOrderEntriesComponent: {
                    component: ImportExportOrderEntriesComponent,
                },
            },
        }),
        I18nModule,
        UrlModule,
        ImportOrderEntriesModule,
        ExportOrderEntriesModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: ImportExportOrderEntriesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        PageComponentModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ImportExportOrderEntriesComponent: {
                                    component: ImportExportOrderEntriesComponent,
                                },
                            },
                        }),
                        I18nModule,
                        UrlModule,
                        ImportOrderEntriesModule,
                        ExportOrderEntriesModule,
                        CommonModule,
                    ],
                    exports: [ImportExportOrderEntriesComponent],
                    declarations: [ImportExportOrderEntriesComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ExportOrderEntriesComponent, ExportOrderEntriesModule, ExportOrderEntriesToCsvService, ImportEntriesDialogComponent, ImportEntriesFormComponent, ImportEntriesSummaryComponent, ImportExportOrderEntriesComponent, ImportExportOrderEntriesModule, ImportOrderEntriesComponent, ImportOrderEntriesModule, ImportProductsFromCsvService, ImportToNewSavedCartFormComponent };
//# sourceMappingURL=spartacus-cart-import-export-components.mjs.map
