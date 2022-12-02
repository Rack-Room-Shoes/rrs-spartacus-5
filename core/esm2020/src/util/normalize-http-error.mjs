/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { HttpErrorModel } from '../model/misc.model';
/**
 * Normalizes HttpErrorResponse to HttpErrorModel.
 *
 * Can be used as a safe and generic way for embodying http errors into
 * NgRx Action payload, as it will strip potentially unserializable parts from
 * it and warn in debug mode if passed error is not instance of HttpErrorModel
 * (which usually happens when logic in NgRx Effect is not sealed correctly)
 */
export function normalizeHttpError(error) {
    if (error instanceof HttpErrorModel) {
        return error;
    }
    if (error instanceof HttpErrorResponse) {
        const normalizedError = new HttpErrorModel();
        normalizedError.message = error.message;
        normalizedError.status = error.status;
        normalizedError.statusText = error.statusText;
        normalizedError.url = error.url;
        // include backend's error details
        if (Array.isArray(error.error.errors)) {
            normalizedError.details = error.error.errors;
        }
        else if (typeof error.error.error === 'string') {
            normalizedError.details = [
                {
                    type: error.error.error,
                    message: error.error.error_description,
                },
            ];
        }
        return normalizedError;
    }
    if (isDevMode()) {
        console.error('Error passed to normalizeHttpError is not HttpErrorResponse instance', error);
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWh0dHAtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91dGlsL25vcm1hbGl6ZS1odHRwLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxLQUErQztJQUUvQyxJQUFJLEtBQUssWUFBWSxjQUFjLEVBQUU7UUFDbkMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksS0FBSyxZQUFZLGlCQUFpQixFQUFFO1FBQ3RDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDN0MsZUFBZSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QyxlQUFlLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDOUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRWhDLGtDQUFrQztRQUNsQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQzlDO2FBQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNoRCxlQUFlLENBQUMsT0FBTyxHQUFHO2dCQUN4QjtvQkFDRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7aUJBQ3ZDO2FBQ0YsQ0FBQztTQUNIO1FBRUQsT0FBTyxlQUFlLENBQUM7S0FDeEI7SUFFRCxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FDWCxzRUFBc0UsRUFDdEUsS0FBSyxDQUNOLENBQUM7S0FDSDtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEVycm9yTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9taXNjLm1vZGVsJztcblxuLyoqXG4gKiBOb3JtYWxpemVzIEh0dHBFcnJvclJlc3BvbnNlIHRvIEh0dHBFcnJvck1vZGVsLlxuICpcbiAqIENhbiBiZSB1c2VkIGFzIGEgc2FmZSBhbmQgZ2VuZXJpYyB3YXkgZm9yIGVtYm9keWluZyBodHRwIGVycm9ycyBpbnRvXG4gKiBOZ1J4IEFjdGlvbiBwYXlsb2FkLCBhcyBpdCB3aWxsIHN0cmlwIHBvdGVudGlhbGx5IHVuc2VyaWFsaXphYmxlIHBhcnRzIGZyb21cbiAqIGl0IGFuZCB3YXJuIGluIGRlYnVnIG1vZGUgaWYgcGFzc2VkIGVycm9yIGlzIG5vdCBpbnN0YW5jZSBvZiBIdHRwRXJyb3JNb2RlbFxuICogKHdoaWNoIHVzdWFsbHkgaGFwcGVucyB3aGVuIGxvZ2ljIGluIE5nUnggRWZmZWN0IGlzIG5vdCBzZWFsZWQgY29ycmVjdGx5KVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplSHR0cEVycm9yKFxuICBlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UgfCBIdHRwRXJyb3JNb2RlbCB8IGFueVxuKTogSHR0cEVycm9yTW9kZWwgfCB1bmRlZmluZWQge1xuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3JNb2RlbCkge1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZEVycm9yID0gbmV3IEh0dHBFcnJvck1vZGVsKCk7XG4gICAgbm9ybWFsaXplZEVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIG5vcm1hbGl6ZWRFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgbm9ybWFsaXplZEVycm9yLnN0YXR1c1RleHQgPSBlcnJvci5zdGF0dXNUZXh0O1xuICAgIG5vcm1hbGl6ZWRFcnJvci51cmwgPSBlcnJvci51cmw7XG5cbiAgICAvLyBpbmNsdWRlIGJhY2tlbmQncyBlcnJvciBkZXRhaWxzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXJyb3IuZXJyb3IuZXJyb3JzKSkge1xuICAgICAgbm9ybWFsaXplZEVycm9yLmRldGFpbHMgPSBlcnJvci5lcnJvci5lcnJvcnM7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IuZXJyb3IuZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBub3JtYWxpemVkRXJyb3IuZGV0YWlscyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IGVycm9yLmVycm9yLmVycm9yLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLmVycm9yLmVycm9yX2Rlc2NyaXB0aW9uLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXplZEVycm9yO1xuICB9XG5cbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgICdFcnJvciBwYXNzZWQgdG8gbm9ybWFsaXplSHR0cEVycm9yIGlzIG5vdCBIdHRwRXJyb3JSZXNwb25zZSBpbnN0YW5jZScsXG4gICAgICBlcnJvclxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIl19