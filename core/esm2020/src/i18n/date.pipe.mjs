/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DatePipe, getLocaleId } from '@angular/common';
import { isDevMode, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../site-context/facade/language.service";
// type CxDatePipe, not DatePipe, due to conflict with Angular's DatePipe - problem occurs for the backward compatibility compiler of Ivy
export class CxDatePipe extends DatePipe {
    constructor(language) {
        super('');
        this.language = language;
    }
    transform(value, format, timezone) {
        return super.transform(value, format, timezone, this.getLang());
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
            console.warn(`cxDate pipe: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
CxDatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CxDatePipe, deps: [{ token: i1.LanguageService }], target: i0.ɵɵFactoryTarget.Pipe });
CxDatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.3", ngImport: i0, type: CxDatePipe, name: "cxDate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: CxDatePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxDate' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaTE4bi9kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFHL0QseUlBQXlJO0FBRXpJLE1BQU0sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQUN0QyxZQUFzQixRQUF5QjtRQUM3QyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFEVSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtJQUUvQyxDQUFDO0lBTUQsU0FBUyxDQUFDLEtBQVUsRUFBRSxNQUFlLEVBQUUsUUFBaUI7UUFDdEQsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxPQUFPO1FBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xDLElBQUk7WUFDRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE1BQU07WUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUTthQUNWLFNBQVMsRUFBRTthQUNYLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDcEMsV0FBVyxFQUFFLENBQUM7UUFDakIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVPLHVCQUF1QixDQUFDLElBQVk7UUFDMUMsSUFBSSxTQUFTLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsK0NBQStDLElBQUksMkRBQTJELENBQy9HLENBQUM7U0FDSDtJQUNILENBQUM7O3VHQXZDVSxVQUFVO3FHQUFWLFVBQVU7MkZBQVYsVUFBVTtrQkFEdEIsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBEYXRlUGlwZSwgZ2V0TG9jYWxlSWQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgaXNEZXZNb2RlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi9zaXRlLWNvbnRleHQvZmFjYWRlL2xhbmd1YWdlLnNlcnZpY2UnO1xuXG4vLyB0eXBlIEN4RGF0ZVBpcGUsIG5vdCBEYXRlUGlwZSwgZHVlIHRvIGNvbmZsaWN0IHdpdGggQW5ndWxhcidzIERhdGVQaXBlIC0gcHJvYmxlbSBvY2N1cnMgZm9yIHRoZSBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGNvbXBpbGVyIG9mIEl2eVxuQFBpcGUoeyBuYW1lOiAnY3hEYXRlJyB9KVxuZXhwb3J0IGNsYXNzIEN4RGF0ZVBpcGUgZXh0ZW5kcyBEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbGFuZ3VhZ2U6IExhbmd1YWdlU2VydmljZSkge1xuICAgIHN1cGVyKCcnKTtcbiAgfVxuXG4gIC8vIFRPRE86IFJlcGxhY2UgYGFueWAgdG8gbWF0Y2ggc3RyaWN0IHR5cGVzIGZyb20gYW5ndWxhciBpbiA0LjBcbiAgLy8gT3ZlcmxvYWQgdG8gc3VwcG9ydCBzdHJpY3RlciB0eXBlIGNoZWNrIGZyb20gYW5ndWxhciAxMSBvbndhcmRzXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBmb3JtYXQ/OiBzdHJpbmcsIHRpbWV6b25lPzogc3RyaW5nKTogc3RyaW5nIHwgbnVsbDtcbiAgdHJhbnNmb3JtKHZhbHVlOiBudWxsIHwgdW5kZWZpbmVkLCBmb3JtYXQ/OiBzdHJpbmcsIHRpbWV6b25lPzogc3RyaW5nKTogbnVsbDtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGZvcm1hdD86IHN0cmluZywgdGltZXpvbmU/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gc3VwZXIudHJhbnNmb3JtKHZhbHVlLCBmb3JtYXQsIHRpbWV6b25lLCB0aGlzLmdldExhbmcoKSk7XG4gIH1cblxuICBwcml2YXRlIGdldExhbmcoKSB7XG4gICAgY29uc3QgbGFuZyA9IHRoaXMuZ2V0QWN0aXZlTGFuZygpO1xuICAgIHRyeSB7XG4gICAgICBnZXRMb2NhbGVJZChsYW5nKTtcbiAgICAgIHJldHVybiBsYW5nO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5yZXBvcnRNaXNzaW5nTG9jYWxlRGF0YShsYW5nKTtcbiAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWN0aXZlTGFuZygpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICB0aGlzLmxhbmd1YWdlXG4gICAgICAuZ2V0QWN0aXZlKClcbiAgICAgIC5zdWJzY3JpYmUoKGxhbmcpID0+IChyZXN1bHQgPSBsYW5nKSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHJlcG9ydE1pc3NpbmdMb2NhbGVEYXRhKGxhbmc6IHN0cmluZykge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgY3hEYXRlIHBpcGU6IE5vIGxvY2FsZSBkYXRhIHJlZ2lzdGVyZWQgZm9yICcke2xhbmd9JyAoc2VlIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29tbW9uL3JlZ2lzdGVyTG9jYWxlRGF0YSkuYFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==