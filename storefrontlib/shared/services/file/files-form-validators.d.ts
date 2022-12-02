import { ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class FilesFormValidators {
    /**
     * Checks max size of file
     *
     * @param {number} maxSize Max size [MB]
     * @returns Uses 'tooLarge' validator error with maxSize property
     * @memberOf FilesFormValidators
     */
    maxSize(maxSize?: number): ValidatorFn;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilesFormValidators, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FilesFormValidators>;
}
