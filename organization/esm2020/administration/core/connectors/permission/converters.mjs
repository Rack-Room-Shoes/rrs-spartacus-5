/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectionToken } from '@angular/core';
export const PERMISSION_NORMALIZER = new InjectionToken('PermissionNormalizer');
export const PERMISSIONS_NORMALIZER = new InjectionToken('PermissionsListNormalizer');
export const PERMISSION_TYPE_NORMALIZER = new InjectionToken('PermissionTypeNormalizer');
export const PERMISSION_TYPES_NORMALIZER = new InjectionToken('PermissionTypesListNormalizer');
export const PERMISSION_SERIALIZER = new InjectionToken('PermissionSerializer');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZS9jb25uZWN0b3JzL3Blcm1pc3Npb24vY29udmVydGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEvQyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGNBQWMsQ0FFckQsc0JBQXNCLENBQUMsQ0FBQztBQUUxQixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGNBQWMsQ0FFdEQsMkJBQTJCLENBQUMsQ0FBQztBQUUvQixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxJQUFJLGNBQWMsQ0FFMUQsMEJBQTBCLENBQUMsQ0FBQztBQUU5QixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLGNBQWMsQ0FFM0QsK0JBQStCLENBQUMsQ0FBQztBQUVuQyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGNBQWMsQ0FFckQsc0JBQXNCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXIsXG4gIEVudGl0aWVzTW9kZWwsXG4gIE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICcuLi8uLi9tb2RlbC9wZXJtaXNzaW9uLm1vZGVsJztcblxuZXhwb3J0IGNvbnN0IFBFUk1JU1NJT05fTk9STUFMSVpFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgQ29udmVydGVyPGFueSwgUGVybWlzc2lvbj5cbj4oJ1Blcm1pc3Npb25Ob3JtYWxpemVyJyk7XG5cbmV4cG9ydCBjb25zdCBQRVJNSVNTSU9OU19OT1JNQUxJWkVSID0gbmV3IEluamVjdGlvblRva2VuPFxuICBDb252ZXJ0ZXI8YW55LCBFbnRpdGllc01vZGVsPFBlcm1pc3Npb24+PlxuPignUGVybWlzc2lvbnNMaXN0Tm9ybWFsaXplcicpO1xuXG5leHBvcnQgY29uc3QgUEVSTUlTU0lPTl9UWVBFX05PUk1BTElaRVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48XG4gIENvbnZlcnRlcjxhbnksIE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZT5cbj4oJ1Blcm1pc3Npb25UeXBlTm9ybWFsaXplcicpO1xuXG5leHBvcnQgY29uc3QgUEVSTUlTU0lPTl9UWVBFU19OT1JNQUxJWkVSID0gbmV3IEluamVjdGlvblRva2VuPFxuICBDb252ZXJ0ZXI8YW55LCBPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVbXT5cbj4oJ1Blcm1pc3Npb25UeXBlc0xpc3ROb3JtYWxpemVyJyk7XG5cbmV4cG9ydCBjb25zdCBQRVJNSVNTSU9OX1NFUklBTElaRVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48XG4gIENvbnZlcnRlcjxQZXJtaXNzaW9uLCBhbnk+XG4+KCdQZXJtaXNzaW9uU2VyaWFsaXplcicpO1xuIl19