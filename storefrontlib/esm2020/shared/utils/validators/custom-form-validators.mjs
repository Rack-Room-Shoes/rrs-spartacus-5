/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@spartacus/core';
export class CustomFormValidators {
    /**
     * Checks control's value with predefined email regexp
     *
     * NOTE: Use it as a control validator
     *
     * @static
     * @param {AbstractControl} control
     * @returns {(ValidationErrors | null)} Uses 'cxInvalidEmail' validator error
     * @memberof CustomFormValidators
     */
    static emailValidator(control) {
        const email = control.value;
        return email && (!email.length || email.match(EMAIL_PATTERN))
            ? null
            : { cxInvalidEmail: true };
    }
    /**
     * Checks control's value with predefined password regexp
     *
     * NOTE: Use it as a control validator
     *
     * @static
     * @param {AbstractControl} control
     * @returns {(ValidationErrors | null)} Uses 'cxInvalidPassword' validator error
     * @memberof CustomFormValidators
     */
    static passwordValidator(control) {
        const password = control.value;
        return password && (!password.length || password.match(PASSWORD_PATTERN))
            ? null
            : { cxInvalidPassword: true };
    }
    /**
     * Checks if control's value is between 1 and 5
     *
     * NOTE: Use it as a control validator
     *
     * @static
     * @param {AbstractControl} control
     * @returns {(ValidationErrors | null)} Uses 'cxStarRatingEmpty' validator error
     * @memberof CustomFormValidators
     */
    static starRatingEmpty(control) {
        const rating = control.value;
        return rating >= 1 && rating <= 5 ? null : { cxStarRatingEmpty: true };
    }
    /**
     * Checks if two password controls match
     *
     * NOTE: Use it as a form validator and pass password control names as parameters
     *
     * @static
     * @param {string} password First password control name
     * @param {string} passwordConfirmation Second password control name
     * @returns Uses 'cxPasswordsMustMatch' validator error
     * @memberof CustomFormValidators
     */
    static passwordsMustMatch(password, passwordConfirmation) {
        const validator = (formGroup) => controlsMustMatch(formGroup, password, passwordConfirmation, 'cxPasswordsMustMatch');
        return validator;
    }
    /**
     * Checks if two email controls match
     *
     * NOTE: Use it as a form validator and pass email control names as parameters
     *
     * @static
     * @param {string} email First email control name
     * @param {string} emailConfirmation Second email control name
     * @returns Uses 'cxEmailsMustMatch' validator error
     * @memberof CustomFormValidators
     */
    static emailsMustMatch(email, emailConfirmation) {
        const validator = (formGroup) => controlsMustMatch(formGroup, email, emailConfirmation, 'cxEmailsMustMatch');
        return validator;
    }
    /**
     * Checks if control's value is euqal or greater than 0
     *
     * NOTE: Use it as a control validator
     *
     * @static
     * @param {AbstractControl} control
     * @returns {(ValidationErrors | null)} Uses 'cxNegativeAmount' validator error
     * @memberof CustomFormValidators
     */
    static mustBePositive(control) {
        const amount = control.value;
        return amount >= 0 ? null : { cxNegativeAmount: true };
    }
    /**
     * Checks if control's value does not contain any special characters
     *
     * NOTE: Use it as a control validator
     *
     * @static
     * @param {AbstractControl} control
     * @returns {(ValidationErrors | null)} Uses 'cxContainsSpecialCharacters' validator error
     * @memberof CustomFormValidators
     */
    static noSpecialCharacters(control) {
        const forbiddenChars = ['/'];
        const str = String(control.value);
        const containsSpecialChars = forbiddenChars.some((char) => str.includes(char));
        return !containsSpecialChars ? null : { cxContainsSpecialCharacters: true };
    }
    /**
     * Checks if control's value passes pattern
     *
     * NOTE: Use it as a control validator
     *
     * @static
     * @param {(date: string) => boolean} isValidFormat Pattern verification function
     * @returns {(control: AbstractControl): ValidationErrors | null} Uses 'pattern' validator error
     * @memberof CustomFormValidators
     */
    static patternValidation(isValidFormat) {
        const validator = (control) => {
            const errors = {};
            if (control.value &&
                control.value !== '' &&
                !isValidFormat(control.value)) {
                errors.pattern = true;
            }
            return Object.keys(errors).length === 0 ? null : errors;
        };
        return validator;
    }
    /**
     * Checks if two email controls match
     *
     * NOTE: Use it as a form validator and pass dates for range
     *
     * @static
     * @param {string} startDateKey First date control name
     * @param {string} endDateKey Second date control name
     * @param {(value: string) => Date} getDate Converting function
     * @returns Uses 'min' and 'max validator error
     * @memberof CustomFormValidators
     */
    static dateRange(startDateKey, endDateKey, getDate) {
        const validator = (formGroup) => {
            const startDateControl = formGroup.controls[startDateKey];
            const endDateControl = formGroup.controls[endDateKey];
            const startDate = getDate(startDateControl.value);
            const endDate = getDate(endDateControl.value);
            if (!startDate || !endDate) {
                return null;
            }
            if (!startDateControl.errors?.pattern) {
                if (startDate > endDate) {
                    startDateControl.setErrors({ max: true });
                }
            }
            if (!endDateControl.errors?.pattern) {
                if (endDate < startDate) {
                    endDateControl.setErrors({ min: true });
                }
            }
            return null;
        };
        return validator;
    }
}
/**
 * Generic function for validators, which checks if two passed controls match.
 *
 * @param formGroup
 * @param firstControlName First control to check
 * @param secondControlName Second control to check
 * @param errorName Error which will be returned by validator
 */
export function controlsMustMatch(formGroup, firstControlName, secondControlName, errorName) {
    const firstControl = formGroup.controls[firstControlName];
    const secondControl = formGroup.controls[secondControlName];
    if (secondControl.errors && !secondControl.errors[errorName]) {
        return;
    }
    secondControl.setErrors(firstControl.value !== secondControl.value ? { [errorName]: true } : null);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZvcm0tdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL3V0aWxzL3ZhbGlkYXRvcnMvY3VzdG9tLWZvcm0tdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBUUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxFLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUF3QjtRQUM1QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBZSxDQUFDO1FBRXRDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUF3QjtRQUMvQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBZSxDQUFDO1FBRXpDLE9BQU8sUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQXdCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFlLENBQUM7UUFFdkMsT0FBTyxNQUFN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QyxDQUFDLElBQUksQ0FDMUUsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvckZuLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBFTUFJTF9QQVRURVJOLCBQQVNTV09SRF9QQVRURVJOIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEN1c3RvbUZvcm1WYWxpZGF0b3JzIHtcbiAgLyoqXG4gICAqIENoZWNrcyBjb250cm9sJ3MgdmFsdWUgd2l0aCBwcmVkZWZpbmVkIGVtYWlsIHJlZ2V4cFxuICAgKlxuICAgKiBOT1RFOiBVc2UgaXQgYXMgYSBjb250cm9sIHZhbGlkYXRvclxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7QWJzdHJhY3RDb250cm9sfSBjb250cm9sXG4gICAqIEByZXR1cm5zIHsoVmFsaWRhdGlvbkVycm9ycyB8IG51bGwpfSBVc2VzICdjeEludmFsaWRFbWFpbCcgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIGVtYWlsVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBjb25zdCBlbWFpbCA9IGNvbnRyb2wudmFsdWUgYXMgc3RyaW5nO1xuXG4gICAgcmV0dXJuIGVtYWlsICYmICghZW1haWwubGVuZ3RoIHx8IGVtYWlsLm1hdGNoKEVNQUlMX1BBVFRFUk4pKVxuICAgICAgPyBudWxsXG4gICAgICA6IHsgY3hJbnZhbGlkRW1haWw6IHRydWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgY29udHJvbCdzIHZhbHVlIHdpdGggcHJlZGVmaW5lZCBwYXNzd29yZCByZWdleHBcbiAgICpcbiAgICogTk9URTogVXNlIGl0IGFzIGEgY29udHJvbCB2YWxpZGF0b3JcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge0Fic3RyYWN0Q29udHJvbH0gY29udHJvbFxuICAgKiBAcmV0dXJucyB7KFZhbGlkYXRpb25FcnJvcnMgfCBudWxsKX0gVXNlcyAnY3hJbnZhbGlkUGFzc3dvcmQnIHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBwYXNzd29yZFZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3QgcGFzc3dvcmQgPSBjb250cm9sLnZhbHVlIGFzIHN0cmluZztcblxuICAgIHJldHVybiBwYXNzd29yZCAmJiAoIXBhc3N3b3JkLmxlbmd0aCB8fCBwYXNzd29yZC5tYXRjaChQQVNTV09SRF9QQVRURVJOKSlcbiAgICAgID8gbnVsbFxuICAgICAgOiB7IGN4SW52YWxpZFBhc3N3b3JkOiB0cnVlIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGNvbnRyb2wncyB2YWx1ZSBpcyBiZXR3ZWVuIDEgYW5kIDVcbiAgICpcbiAgICogTk9URTogVXNlIGl0IGFzIGEgY29udHJvbCB2YWxpZGF0b3JcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge0Fic3RyYWN0Q29udHJvbH0gY29udHJvbFxuICAgKiBAcmV0dXJucyB7KFZhbGlkYXRpb25FcnJvcnMgfCBudWxsKX0gVXNlcyAnY3hTdGFyUmF0aW5nRW1wdHknIHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBzdGFyUmF0aW5nRW1wdHkoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIGNvbnN0IHJhdGluZyA9IGNvbnRyb2wudmFsdWUgYXMgbnVtYmVyO1xuXG4gICAgcmV0dXJuIHJhdGluZyA+PSAxICYmIHJhdGluZyA8PSA1ID8gbnVsbCA6IHsgY3hTdGFyUmF0aW5nRW1wdHk6IHRydWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHdvIHBhc3N3b3JkIGNvbnRyb2xzIG1hdGNoXG4gICAqXG4gICAqIE5PVEU6IFVzZSBpdCBhcyBhIGZvcm0gdmFsaWRhdG9yIGFuZCBwYXNzIHBhc3N3b3JkIGNvbnRyb2wgbmFtZXMgYXMgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBGaXJzdCBwYXNzd29yZCBjb250cm9sIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkQ29uZmlybWF0aW9uIFNlY29uZCBwYXNzd29yZCBjb250cm9sIG5hbWVcbiAgICogQHJldHVybnMgVXNlcyAnY3hQYXNzd29yZHNNdXN0TWF0Y2gnIHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBwYXNzd29yZHNNdXN0TWF0Y2goXG4gICAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgICBwYXNzd29yZENvbmZpcm1hdGlvbjogc3RyaW5nXG4gICk6IGFueSB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gKGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCkgPT5cbiAgICAgIGNvbnRyb2xzTXVzdE1hdGNoKFxuICAgICAgICBmb3JtR3JvdXAsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgICBwYXNzd29yZENvbmZpcm1hdGlvbixcbiAgICAgICAgJ2N4UGFzc3dvcmRzTXVzdE1hdGNoJ1xuICAgICAgKTtcblxuICAgIHJldHVybiB2YWxpZGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHR3byBlbWFpbCBjb250cm9scyBtYXRjaFxuICAgKlxuICAgKiBOT1RFOiBVc2UgaXQgYXMgYSBmb3JtIHZhbGlkYXRvciBhbmQgcGFzcyBlbWFpbCBjb250cm9sIG5hbWVzIGFzIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWwgRmlyc3QgZW1haWwgY29udHJvbCBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbENvbmZpcm1hdGlvbiBTZWNvbmQgZW1haWwgY29udHJvbCBuYW1lXG4gICAqIEByZXR1cm5zIFVzZXMgJ2N4RW1haWxzTXVzdE1hdGNoJyB2YWxpZGF0b3IgZXJyb3JcbiAgICogQG1lbWJlcm9mIEN1c3RvbUZvcm1WYWxpZGF0b3JzXG4gICAqL1xuICBzdGF0aWMgZW1haWxzTXVzdE1hdGNoKGVtYWlsOiBzdHJpbmcsIGVtYWlsQ29uZmlybWF0aW9uOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IChmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXApID0+XG4gICAgICBjb250cm9sc011c3RNYXRjaChcbiAgICAgICAgZm9ybUdyb3VwLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgZW1haWxDb25maXJtYXRpb24sXG4gICAgICAgICdjeEVtYWlsc011c3RNYXRjaCdcbiAgICAgICk7XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjb250cm9sJ3MgdmFsdWUgaXMgZXVxYWwgb3IgZ3JlYXRlciB0aGFuIDBcbiAgICpcbiAgICogTk9URTogVXNlIGl0IGFzIGEgY29udHJvbCB2YWxpZGF0b3JcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0ge0Fic3RyYWN0Q29udHJvbH0gY29udHJvbFxuICAgKiBAcmV0dXJucyB7KFZhbGlkYXRpb25FcnJvcnMgfCBudWxsKX0gVXNlcyAnY3hOZWdhdGl2ZUFtb3VudCcgdmFsaWRhdG9yIGVycm9yXG4gICAqIEBtZW1iZXJvZiBDdXN0b21Gb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgc3RhdGljIG11c3RCZVBvc2l0aXZlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICBjb25zdCBhbW91bnQgPSBjb250cm9sLnZhbHVlIGFzIG51bWJlcjtcblxuICAgIHJldHVybiBhbW91bnQgPj0gMCA/IG51bGwgOiB7IGN4TmVnYXRpdmVBbW91bnQ6IHRydWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgY29udHJvbCdzIHZhbHVlIGRvZXMgbm90IGNvbnRhaW4gYW55IHNwZWNpYWwgY2hhcmFjdGVyc1xuICAgKlxuICAgKiBOT1RFOiBVc2UgaXQgYXMgYSBjb250cm9sIHZhbGlkYXRvclxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7QWJzdHJhY3RDb250cm9sfSBjb250cm9sXG4gICAqIEByZXR1cm5zIHsoVmFsaWRhdGlvbkVycm9ycyB8IG51bGwpfSBVc2VzICdjeENvbnRhaW5zU3BlY2lhbENoYXJhY3RlcnMnIHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBub1NwZWNpYWxDaGFyYWN0ZXJzKFxuICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxuICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3QgZm9yYmlkZGVuQ2hhcnMgPSBbJy8nXTtcbiAgICBjb25zdCBzdHIgPSBTdHJpbmcoY29udHJvbC52YWx1ZSk7XG4gICAgY29uc3QgY29udGFpbnNTcGVjaWFsQ2hhcnMgPSBmb3JiaWRkZW5DaGFycy5zb21lKChjaGFyKSA9PlxuICAgICAgc3RyLmluY2x1ZGVzKGNoYXIpXG4gICAgKTtcblxuICAgIHJldHVybiAhY29udGFpbnNTcGVjaWFsQ2hhcnMgPyBudWxsIDogeyBjeENvbnRhaW5zU3BlY2lhbENoYXJhY3RlcnM6IHRydWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgY29udHJvbCdzIHZhbHVlIHBhc3NlcyBwYXR0ZXJuXG4gICAqXG4gICAqIE5PVEU6IFVzZSBpdCBhcyBhIGNvbnRyb2wgdmFsaWRhdG9yXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHBhcmFtIHsoZGF0ZTogc3RyaW5nKSA9PiBib29sZWFufSBpc1ZhbGlkRm9ybWF0IFBhdHRlcm4gdmVyaWZpY2F0aW9uIGZ1bmN0aW9uXG4gICAqIEByZXR1cm5zIHsoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGx9IFVzZXMgJ3BhdHRlcm4nIHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBwYXR0ZXJuVmFsaWRhdGlvbihcbiAgICBpc1ZhbGlkRm9ybWF0OiAoZGF0ZTogc3RyaW5nKSA9PiBib29sZWFuXG4gICk6IFZhbGlkYXRvckZuIHtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzID0ge307XG4gICAgICBpZiAoXG4gICAgICAgIGNvbnRyb2wudmFsdWUgJiZcbiAgICAgICAgY29udHJvbC52YWx1ZSAhPT0gJycgJiZcbiAgICAgICAgIWlzVmFsaWRGb3JtYXQoY29udHJvbC52YWx1ZSlcbiAgICAgICkge1xuICAgICAgICBlcnJvcnMucGF0dGVybiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDAgPyBudWxsIDogZXJyb3JzO1xuICAgIH07XG4gICAgcmV0dXJuIHZhbGlkYXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHdvIGVtYWlsIGNvbnRyb2xzIG1hdGNoXG4gICAqXG4gICAqIE5PVEU6IFVzZSBpdCBhcyBhIGZvcm0gdmFsaWRhdG9yIGFuZCBwYXNzIGRhdGVzIGZvciByYW5nZVxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydERhdGVLZXkgRmlyc3QgZGF0ZSBjb250cm9sIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVuZERhdGVLZXkgU2Vjb25kIGRhdGUgY29udHJvbCBuYW1lXG4gICAqIEBwYXJhbSB7KHZhbHVlOiBzdHJpbmcpID0+IERhdGV9IGdldERhdGUgQ29udmVydGluZyBmdW5jdGlvblxuICAgKiBAcmV0dXJucyBVc2VzICdtaW4nIGFuZCAnbWF4IHZhbGlkYXRvciBlcnJvclxuICAgKiBAbWVtYmVyb2YgQ3VzdG9tRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIHN0YXRpYyBkYXRlUmFuZ2UoXG4gICAgc3RhcnREYXRlS2V5OiBzdHJpbmcsXG4gICAgZW5kRGF0ZUtleTogc3RyaW5nLFxuICAgIGdldERhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgdW5kZWZpbmVkXG4gICk6IChfOiBVbnR5cGVkRm9ybUdyb3VwKSA9PiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gKFxuICAgICAgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3Qgc3RhcnREYXRlQ29udHJvbCA9IGZvcm1Hcm91cC5jb250cm9sc1tzdGFydERhdGVLZXldO1xuICAgICAgY29uc3QgZW5kRGF0ZUNvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNbZW5kRGF0ZUtleV07XG4gICAgICBjb25zdCBzdGFydERhdGUgPSBnZXREYXRlKHN0YXJ0RGF0ZUNvbnRyb2wudmFsdWUpO1xuICAgICAgY29uc3QgZW5kRGF0ZSA9IGdldERhdGUoZW5kRGF0ZUNvbnRyb2wudmFsdWUpO1xuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoIXN0YXJ0RGF0ZUNvbnRyb2wuZXJyb3JzPy5wYXR0ZXJuKSB7XG4gICAgICAgIGlmIChzdGFydERhdGUgPiBlbmREYXRlKSB7XG4gICAgICAgICAgc3RhcnREYXRlQ29udHJvbC5zZXRFcnJvcnMoeyBtYXg6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZW5kRGF0ZUNvbnRyb2wuZXJyb3JzPy5wYXR0ZXJuKSB7XG4gICAgICAgIGlmIChlbmREYXRlIDwgc3RhcnREYXRlKSB7XG4gICAgICAgICAgZW5kRGF0ZUNvbnRyb2wuc2V0RXJyb3JzKHsgbWluOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0b3I7XG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmljIGZ1bmN0aW9uIGZvciB2YWxpZGF0b3JzLCB3aGljaCBjaGVja3MgaWYgdHdvIHBhc3NlZCBjb250cm9scyBtYXRjaC5cbiAqXG4gKiBAcGFyYW0gZm9ybUdyb3VwXG4gKiBAcGFyYW0gZmlyc3RDb250cm9sTmFtZSBGaXJzdCBjb250cm9sIHRvIGNoZWNrXG4gKiBAcGFyYW0gc2Vjb25kQ29udHJvbE5hbWUgU2Vjb25kIGNvbnRyb2wgdG8gY2hlY2tcbiAqIEBwYXJhbSBlcnJvck5hbWUgRXJyb3Igd2hpY2ggd2lsbCBiZSByZXR1cm5lZCBieSB2YWxpZGF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRyb2xzTXVzdE1hdGNoKFxuICBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXAsXG4gIGZpcnN0Q29udHJvbE5hbWU6IHN0cmluZyxcbiAgc2Vjb25kQ29udHJvbE5hbWU6IHN0cmluZyxcbiAgZXJyb3JOYW1lOiBzdHJpbmdcbik6IHZvaWQge1xuICBjb25zdCBmaXJzdENvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNbZmlyc3RDb250cm9sTmFtZV07XG4gIGNvbnN0IHNlY29uZENvbnRyb2wgPSBmb3JtR3JvdXAuY29udHJvbHNbc2Vjb25kQ29udHJvbE5hbWVdO1xuXG4gIGlmIChzZWNvbmRDb250cm9sLmVycm9ycyAmJiAhc2Vjb25kQ29udHJvbC5lcnJvcnNbZXJyb3JOYW1lXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNlY29uZENvbnRyb2wuc2V0RXJyb3JzKFxuICAgIGZpcnN0Q29udHJvbC52YWx1ZSAhPT0gc2Vjb25kQ29udHJvbC52YWx1ZSA/IHsgW2Vycm9yTmFtZV06IHRydWUgfSA6IG51bGxcbiAgKTtcbn1cbiJdfQ==