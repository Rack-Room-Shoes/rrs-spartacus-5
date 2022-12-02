/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DecimalPipe, getLocaleId } from '@angular/common';
import { isDevMode, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../site-context/facade/language.service";
export class CxNumericPipe extends DecimalPipe {
    constructor(language) {
        super('');
        this.language = language;
    }
    transform(value, digitsInfo) {
        return super.transform(value, digitsInfo, this.getLang());
    }
    getLang() {
        const lang = this.getActiveLang();
        try {
            getLocaleId(lang);
            return lang;
        }
        catch {
            this.reportMissingLocaleData(lang);
            return 'en';
        }
    }
    getActiveLang() {
        let result = '';
        this.language
            .getActive()
            .subscribe((lang) => (result = lang))
            .unsubscribe();
        return result;
    }
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            console.warn(`cxNumeric pipe: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
CxNumericPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CxNumericPipe, deps: [{ token: i1.LanguageService }], target: i0.ɵɵFactoryTarget.Pipe });
CxNumericPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CxNumericPipe, name: "cxNumeric" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CxNumericPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxNumeric' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpYy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaTE4bi9udW1lcmljLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFJL0QsTUFBTSxPQUFPLGFBQWMsU0FBUSxXQUFXO0lBQzVDLFlBQXNCLFFBQXlCO1FBQzdDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQURVLGFBQVEsR0FBUixRQUFRLENBQWlCO0lBRS9DLENBQUM7SUFJRCxTQUFTLENBQUMsS0FBVSxFQUFFLFVBQW1CO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFUyxPQUFPO1FBQ2YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xDLElBQUk7WUFDRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE1BQU07WUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFUyxhQUFhO1FBQ3JCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUTthQUNWLFNBQVMsRUFBRTthQUNYLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDcEMsV0FBVyxFQUFFLENBQUM7UUFDakIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLHVCQUF1QixDQUFDLElBQVk7UUFDNUMsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysa0RBQWtELElBQUksMkRBQTJELENBQ2xILENBQUM7U0FDSDtJQUNILENBQUM7OzBHQXJDVSxhQUFhO3dHQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFEekIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEZWNpbWFsUGlwZSwgZ2V0TG9jYWxlSWQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgaXNEZXZNb2RlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaXRlLWNvbnRleHQvZmFjYWRlL2xhbmd1YWdlLnNlcnZpY2UnO1xuXG5AUGlwZSh7IG5hbWU6ICdjeE51bWVyaWMnIH0pXG5leHBvcnQgY2xhc3MgQ3hOdW1lcmljUGlwZSBleHRlbmRzIERlY2ltYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBsYW5ndWFnZTogTGFuZ3VhZ2VTZXJ2aWNlKSB7XG4gICAgc3VwZXIoJycpO1xuICB9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnkgfCBudW1iZXIgfCBzdHJpbmcsIGRpZ2l0c0luZm8/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsO1xuICB0cmFuc2Zvcm0odmFsdWU6IG51bGwgfCB1bmRlZmluZWQsIGRpZ2l0c0luZm8/OiBzdHJpbmcpOiBudWxsO1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGlnaXRzSW5mbz86IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiBzdXBlci50cmFuc2Zvcm0odmFsdWUsIGRpZ2l0c0luZm8sIHRoaXMuZ2V0TGFuZygpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRMYW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgbGFuZyA9IHRoaXMuZ2V0QWN0aXZlTGFuZygpO1xuICAgIHRyeSB7XG4gICAgICBnZXRMb2NhbGVJZChsYW5nKTtcbiAgICAgIHJldHVybiBsYW5nO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5yZXBvcnRNaXNzaW5nTG9jYWxlRGF0YShsYW5nKTtcbiAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBY3RpdmVMYW5nKCk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIHRoaXMubGFuZ3VhZ2VcbiAgICAgIC5nZXRBY3RpdmUoKVxuICAgICAgLnN1YnNjcmliZSgobGFuZykgPT4gKHJlc3VsdCA9IGxhbmcpKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXBvcnRNaXNzaW5nTG9jYWxlRGF0YShsYW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYGN4TnVtZXJpYyBwaXBlOiBObyBsb2NhbGUgZGF0YSByZWdpc3RlcmVkIGZvciAnJHtsYW5nfScgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9yZWdpc3RlckxvY2FsZURhdGEpLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=