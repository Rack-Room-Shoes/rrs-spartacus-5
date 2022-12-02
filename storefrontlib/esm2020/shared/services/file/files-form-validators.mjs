/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FilesFormValidators {
    /**
     * Checks max size of file
     *
     * @param {number} maxSize Max size [MB]
     * @returns Uses 'tooLarge' validator error with maxSize property
     * @memberOf FilesFormValidators
     */
    maxSize(maxSize) {
        return (control) => {
            const errors = {};
            if (maxSize) {
                const files = Array.from(control.value);
                files.forEach((file) => {
                    if (file.size > maxSize * 1000000) {
                        const invalidFiles = errors.tooLarge?.invalidFiles ?? [];
                        errors.tooLarge = {
                            maxSize,
                            invalidFiles: [...invalidFiles, file.name],
                        };
                    }
                });
            }
            return Object.keys(errors).length === 0 ? null : errors;
        };
    }
}
FilesFormValidators.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FilesFormValidators, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FilesFormValidators.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FilesFormValidators, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: FilesFormValidators, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMtZm9ybS12YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvc2VydmljZXMvZmlsZS9maWxlcy1mb3JtLXZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7OztPQU1HO0lBQ0gsT0FBTyxDQUFDLE9BQWdCO1FBQ3RCLE9BQU8sQ0FBQyxPQUF3QixFQUEyQixFQUFFO1lBQzNELE1BQU0sTUFBTSxHQUFxQixFQUFFLENBQUM7WUFDcEMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsTUFBTSxLQUFLLEdBQVcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxPQUFPLEVBQUU7d0JBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsWUFBWSxJQUFJLEVBQUUsQ0FBQzt3QkFDekQsTUFBTSxDQUFDLFFBQVEsR0FBRzs0QkFDaEIsT0FBTzs0QkFDUCxZQUFZLEVBQUUsQ0FBQyxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUMzQyxDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7Z0hBekJVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlc0Zvcm1WYWxpZGF0b3JzIHtcbiAgLyoqXG4gICAqIENoZWNrcyBtYXggc2l6ZSBvZiBmaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhTaXplIE1heCBzaXplIFtNQl1cbiAgICogQHJldHVybnMgVXNlcyAndG9vTGFyZ2UnIHZhbGlkYXRvciBlcnJvciB3aXRoIG1heFNpemUgcHJvcGVydHlcbiAgICogQG1lbWJlck9mIEZpbGVzRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIG1heFNpemUobWF4U2l6ZT86IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yczogVmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICAgICAgaWYgKG1heFNpemUpIHtcbiAgICAgICAgY29uc3QgZmlsZXM6IEZpbGVbXSA9IEFycmF5LmZyb20oY29udHJvbC52YWx1ZSk7XG4gICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoZmlsZS5zaXplID4gbWF4U2l6ZSAqIDEwMDAwMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGludmFsaWRGaWxlcyA9IGVycm9ycy50b29MYXJnZT8uaW52YWxpZEZpbGVzID8/IFtdO1xuICAgICAgICAgICAgZXJyb3JzLnRvb0xhcmdlID0ge1xuICAgICAgICAgICAgICBtYXhTaXplLFxuICAgICAgICAgICAgICBpbnZhbGlkRmlsZXM6IFsuLi5pbnZhbGlkRmlsZXMsIGZpbGUubmFtZV0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDAgPyBudWxsIDogZXJyb3JzO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==