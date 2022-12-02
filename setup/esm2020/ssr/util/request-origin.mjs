/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function getRequestOrigin(req) {
    // If express is resolving and trusting X-Forwarded-Host, we want to take it
    // into an account to properly generate request origin.
    const trustProxyFn = req.app.get('trust proxy fn');
    let forwardedHost = req.get('X-Forwarded-Host');
    if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
        if (forwardedHost.indexOf(',') !== -1) {
            // Note: X-Forwarded-Host is normally only ever a
            //       single value, but this is to be safe.
            forwardedHost = forwardedHost
                .substring(0, forwardedHost.indexOf(','))
                .trimRight();
        }
        return req.protocol + '://' + forwardedHost;
    }
    else {
        return req.protocol + '://' + req.get('host');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlLWxpYnMvc2V0dXAvc3NyL3V0aWwvcmVxdWVzdC1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFZO0lBQzNDLDRFQUE0RTtJQUM1RSx1REFBdUQ7SUFDdkQsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRCxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEQsSUFBSSxhQUFhLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ2xFLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyQyxpREFBaUQ7WUFDakQsOENBQThDO1lBQzlDLGFBQWEsR0FBRyxhQUFhO2lCQUMxQixTQUFTLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hDLFNBQVMsRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTTtRQUNMLE9BQU8sR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXF1ZXN0T3JpZ2luKHJlcTogUmVxdWVzdCk6IHN0cmluZyB7XG4gIC8vIElmIGV4cHJlc3MgaXMgcmVzb2x2aW5nIGFuZCB0cnVzdGluZyBYLUZvcndhcmRlZC1Ib3N0LCB3ZSB3YW50IHRvIHRha2UgaXRcbiAgLy8gaW50byBhbiBhY2NvdW50IHRvIHByb3Blcmx5IGdlbmVyYXRlIHJlcXVlc3Qgb3JpZ2luLlxuICBjb25zdCB0cnVzdFByb3h5Rm4gPSByZXEuYXBwLmdldCgndHJ1c3QgcHJveHkgZm4nKTtcbiAgbGV0IGZvcndhcmRlZEhvc3QgPSByZXEuZ2V0KCdYLUZvcndhcmRlZC1Ib3N0Jyk7XG4gIGlmIChmb3J3YXJkZWRIb3N0ICYmIHRydXN0UHJveHlGbihyZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzLCAwKSkge1xuICAgIGlmIChmb3J3YXJkZWRIb3N0LmluZGV4T2YoJywnKSAhPT0gLTEpIHtcbiAgICAgIC8vIE5vdGU6IFgtRm9yd2FyZGVkLUhvc3QgaXMgbm9ybWFsbHkgb25seSBldmVyIGFcbiAgICAgIC8vICAgICAgIHNpbmdsZSB2YWx1ZSwgYnV0IHRoaXMgaXMgdG8gYmUgc2FmZS5cbiAgICAgIGZvcndhcmRlZEhvc3QgPSBmb3J3YXJkZWRIb3N0XG4gICAgICAgIC5zdWJzdHJpbmcoMCwgZm9yd2FyZGVkSG9zdC5pbmRleE9mKCcsJykpXG4gICAgICAgIC50cmltUmlnaHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcS5wcm90b2NvbCArICc6Ly8nICsgZm9yd2FyZGVkSG9zdDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVxLnByb3RvY29sICsgJzovLycgKyByZXEuZ2V0KCdob3N0Jyk7XG4gIH1cbn1cbiJdfQ==