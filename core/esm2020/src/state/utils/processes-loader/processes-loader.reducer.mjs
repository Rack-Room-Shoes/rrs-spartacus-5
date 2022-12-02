/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isDevMode } from '@angular/core';
import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
export const initialProcessesState = {
    processesCount: 0,
};
/**
 * Higher order reducer that adds processes count
 */
export function processesLoaderReducer(entityType, reducer) {
    return (state = {
        ...initialProcessesState,
        ...initialLoaderState,
    }, action) => {
        const loaderState = loaderReducer(entityType, reducer)(state, action);
        if (action.meta && action.meta.entityType === entityType) {
            const processesCountDiff = action.meta.processesCountDiff;
            if (isDevMode() &&
                state.processesCount &&
                processesCountDiff &&
                state.processesCount + processesCountDiff < 0) {
                console.error(`Action '${action.type}' sets processesCount to value < 0!\n` +
                    'Make sure to keep processesCount in sync.\n' +
                    'There should always be only one decrement action for each increment action.\n' +
                    "Make sure that you don't reset state in between those actions.\n", action);
            }
            if (processesCountDiff) {
                return {
                    ...loaderState,
                    processesCount: state.processesCount
                        ? state.processesCount + processesCountDiff
                        : processesCountDiff,
                };
            }
            else if (processesCountDiff === null) {
                // reset action
                return {
                    ...loaderState,
                    ...initialProcessesState,
                };
            }
        }
        return loaderState;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc2VzLWxvYWRlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc3RhdGUvdXRpbHMvcHJvY2Vzc2VzLWxvYWRlci9wcm9jZXNzZXMtbG9hZGVyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBSTdFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUE4QjtJQUM5RCxjQUFjLEVBQUUsQ0FBQztDQUNsQixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLFVBQWtCLEVBQ2xCLE9BQXFEO0lBS3JELE9BQU8sQ0FDTCxRQUFpQztRQUMvQixHQUFHLHFCQUFxQjtRQUN4QixHQUFHLGtCQUFrQjtLQUN0QixFQUNELE1BQTZCLEVBQ0osRUFBRTtRQUMzQixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ3hELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUMxRCxJQUNFLFNBQVMsRUFBRTtnQkFDWCxLQUFLLENBQUMsY0FBYztnQkFDcEIsa0JBQWtCO2dCQUNsQixLQUFLLENBQUMsY0FBYyxHQUFHLGtCQUFrQixHQUFHLENBQUMsRUFDN0M7Z0JBQ0EsT0FBTyxDQUFDLEtBQUssQ0FDWCxXQUFXLE1BQU0sQ0FBQyxJQUFJLHVDQUF1QztvQkFDM0QsNkNBQTZDO29CQUM3QywrRUFBK0U7b0JBQy9FLGtFQUFrRSxFQUNwRSxNQUFNLENBQ1AsQ0FBQzthQUNIO1lBQ0QsSUFBSSxrQkFBa0IsRUFBRTtnQkFDdEIsT0FBTztvQkFDTCxHQUFHLFdBQVc7b0JBQ2QsY0FBYyxFQUFFLEtBQUssQ0FBQyxjQUFjO3dCQUNsQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxrQkFBa0I7d0JBQzNDLENBQUMsQ0FBQyxrQkFBa0I7aUJBQ3ZCLENBQUM7YUFDSDtpQkFBTSxJQUFJLGtCQUFrQixLQUFLLElBQUksRUFBRTtnQkFDdEMsZUFBZTtnQkFDZixPQUFPO29CQUNMLEdBQUcsV0FBVztvQkFDZCxHQUFHLHFCQUFxQjtpQkFDekIsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBpbml0aWFsTG9hZGVyU3RhdGUsIGxvYWRlclJlZHVjZXIgfSBmcm9tICcuLi9sb2FkZXIvbG9hZGVyLnJlZHVjZXInO1xuaW1wb3J0IHsgUHJvY2Vzc2VzTG9hZGVyU3RhdGUgfSBmcm9tICcuL3Byb2Nlc3Nlcy1sb2FkZXItc3RhdGUnO1xuaW1wb3J0IHsgUHJvY2Vzc2VzTG9hZGVyQWN0aW9uIH0gZnJvbSAnLi9wcm9jZXNzZXMtbG9hZGVyLmFjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsUHJvY2Vzc2VzU3RhdGU6IFByb2Nlc3Nlc0xvYWRlclN0YXRlPGFueT4gPSB7XG4gIHByb2Nlc3Nlc0NvdW50OiAwLFxufTtcblxuLyoqXG4gKiBIaWdoZXIgb3JkZXIgcmVkdWNlciB0aGF0IGFkZHMgcHJvY2Vzc2VzIGNvdW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzZXNMb2FkZXJSZWR1Y2VyPFQ+KFxuICBlbnRpdHlUeXBlOiBzdHJpbmcsXG4gIHJlZHVjZXI/OiAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSA9PiBUXG4pOiAoXG4gIHN0YXRlOiBQcm9jZXNzZXNMb2FkZXJTdGF0ZTxUPixcbiAgYWN0aW9uOiBQcm9jZXNzZXNMb2FkZXJBY3Rpb25cbikgPT4gUHJvY2Vzc2VzTG9hZGVyU3RhdGU8VD4ge1xuICByZXR1cm4gKFxuICAgIHN0YXRlOiBQcm9jZXNzZXNMb2FkZXJTdGF0ZTxUPiA9IHtcbiAgICAgIC4uLmluaXRpYWxQcm9jZXNzZXNTdGF0ZSxcbiAgICAgIC4uLmluaXRpYWxMb2FkZXJTdGF0ZSxcbiAgICB9LFxuICAgIGFjdGlvbjogUHJvY2Vzc2VzTG9hZGVyQWN0aW9uXG4gICk6IFByb2Nlc3Nlc0xvYWRlclN0YXRlPFQ+ID0+IHtcbiAgICBjb25zdCBsb2FkZXJTdGF0ZSA9IGxvYWRlclJlZHVjZXIoZW50aXR5VHlwZSwgcmVkdWNlcikoc3RhdGUsIGFjdGlvbik7XG4gICAgaWYgKGFjdGlvbi5tZXRhICYmIGFjdGlvbi5tZXRhLmVudGl0eVR5cGUgPT09IGVudGl0eVR5cGUpIHtcbiAgICAgIGNvbnN0IHByb2Nlc3Nlc0NvdW50RGlmZiA9IGFjdGlvbi5tZXRhLnByb2Nlc3Nlc0NvdW50RGlmZjtcbiAgICAgIGlmIChcbiAgICAgICAgaXNEZXZNb2RlKCkgJiZcbiAgICAgICAgc3RhdGUucHJvY2Vzc2VzQ291bnQgJiZcbiAgICAgICAgcHJvY2Vzc2VzQ291bnREaWZmICYmXG4gICAgICAgIHN0YXRlLnByb2Nlc3Nlc0NvdW50ICsgcHJvY2Vzc2VzQ291bnREaWZmIDwgMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYEFjdGlvbiAnJHthY3Rpb24udHlwZX0nIHNldHMgcHJvY2Vzc2VzQ291bnQgdG8gdmFsdWUgPCAwIVxcbmAgK1xuICAgICAgICAgICAgJ01ha2Ugc3VyZSB0byBrZWVwIHByb2Nlc3Nlc0NvdW50IGluIHN5bmMuXFxuJyArXG4gICAgICAgICAgICAnVGhlcmUgc2hvdWxkIGFsd2F5cyBiZSBvbmx5IG9uZSBkZWNyZW1lbnQgYWN0aW9uIGZvciBlYWNoIGluY3JlbWVudCBhY3Rpb24uXFxuJyArXG4gICAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGF0IHlvdSBkb24ndCByZXNldCBzdGF0ZSBpbiBiZXR3ZWVuIHRob3NlIGFjdGlvbnMuXFxuXCIsXG4gICAgICAgICAgYWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzc2VzQ291bnREaWZmKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ubG9hZGVyU3RhdGUsXG4gICAgICAgICAgcHJvY2Vzc2VzQ291bnQ6IHN0YXRlLnByb2Nlc3Nlc0NvdW50XG4gICAgICAgICAgICA/IHN0YXRlLnByb2Nlc3Nlc0NvdW50ICsgcHJvY2Vzc2VzQ291bnREaWZmXG4gICAgICAgICAgICA6IHByb2Nlc3Nlc0NvdW50RGlmZixcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzc2VzQ291bnREaWZmID09PSBudWxsKSB7XG4gICAgICAgIC8vIHJlc2V0IGFjdGlvblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmxvYWRlclN0YXRlLFxuICAgICAgICAgIC4uLmluaXRpYWxQcm9jZXNzZXNTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbG9hZGVyU3RhdGU7XG4gIH07XG59XG4iXX0=