import { Injectable } from '@angular/core';
import i18nextHttpBackend from 'i18next-http-backend';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export function i18nextInit(i18next, configInit, languageService, httpClient, serverRequestOrigin, siteContextI18nextSynchronizer) {
    return () => configInit
        .getStable('i18n')
        .pipe(tap((config) => {
        let i18nextConfig = {
            ns: [],
            fallbackLng: config.i18n?.fallbackLang,
            debug: config.i18n?.debug,
            interpolation: {
                escapeValue: false,
                skipOnVariables: false,
            },
        };
        if (config.i18n?.backend?.loadPath) {
            i18next = i18next.use(i18nextHttpBackend);
            const loadPath = getLoadPath(config.i18n.backend.loadPath, serverRequestOrigin);
            const backend = {
                loadPath,
                request: i18nextGetHttpClient(httpClient),
                // Disable the periodical reloading. Otherwise SSR would not finish due to the pending task `setInterval()`
                // See source code of `i18next-http-backend` : https://github.com/i18next/i18next-http-backend/blob/00b7e8f67abf8372af17529b51190a7e8b17e3d8/lib/index.js#L40-L41
                reloadInterval: false,
            };
            i18nextConfig = { ...i18nextConfig, backend };
        }
        return i18next.init(i18nextConfig, () => {
            // Don't use i18next's 'resources' config key for adding static translations,
            // because it will disable loading chunks from backend. We add resources here, in the init's callback.
            i18nextAddTranslations(i18next, config.i18n?.resources);
            siteContextI18nextSynchronizer.init(i18next, languageService);
        });
    }))
        .toPromise();
}
export function i18nextAddTranslations(i18next, resources = {}) {
    Object.keys(resources).forEach((lang) => {
        Object.keys(resources[lang]).forEach((chunkName) => {
            i18next.addResourceBundle(lang, chunkName, resources[lang][chunkName], true, true);
        });
    });
}
export class SiteContextI18nextSynchronizer {
    init(i18next, language) {
        // always update language of i18next on site context (language) change
        this.sub =
            this.sub ??
                language.getActive().subscribe((lang) => i18next.changeLanguage(lang));
    }
    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
SiteContextI18nextSynchronizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextI18nextSynchronizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextI18nextSynchronizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextI18nextSynchronizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: SiteContextI18nextSynchronizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * Returns a function appropriate for i18next to make http calls for JSON files.
 * See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
 *
 * It uses Angular HttpClient under the hood, so it works in SSR.
 * @param httpClient Angular http client
 */
export function i18nextGetHttpClient(httpClient) {
    return (_options, url, _payload, callback) => {
        httpClient.get(url, { responseType: 'text' }).subscribe((data) => callback(null, { status: 200, data }), (error) => callback(error, {
            // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
            data: null,
            status: error.status,
        }));
    };
}
/**
 * Resolves the relative path to the absolute one in SSR, using the server request's origin.
 * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
 * - https://github.com/angular/angular/issues/19224
 * - https://github.com/angular/universal/issues/858
 */
export function getLoadPath(path, serverRequestOrigin) {
    if (serverRequestOrigin && !path.match(/^http(s)?:\/\//)) {
        if (path.startsWith('/')) {
            path = path.slice(1);
        }
        if (path.startsWith('./')) {
            path = path.slice(2);
        }
        const result = `${serverRequestOrigin}/${path}`;
        return result;
    }
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1pbml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaTE4bi9pMThuZXh0L2kxOG5leHQtaW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sa0JBR04sTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBS3JDLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWEsRUFDYixVQUFvQyxFQUNwQyxlQUFnQyxFQUNoQyxVQUFzQixFQUN0QixtQkFBa0MsRUFDbEMsOEJBQThEO0lBRTlELE9BQU8sR0FBRyxFQUFFLENBQ1YsVUFBVTtTQUNQLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDakIsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ2IsSUFBSSxhQUFhLEdBQWdCO1lBQy9CLEVBQUUsRUFBRSxFQUFFO1lBQ04sV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWTtZQUN0QyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLO1lBQ3pCLGFBQWEsRUFBRTtnQkFDYixXQUFXLEVBQUUsS0FBSztnQkFDbEIsZUFBZSxFQUFFLEtBQUs7YUFDdkI7U0FDRixDQUFDO1FBRUYsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDbEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUMxQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFDNUIsbUJBQW1CLENBQ3BCLENBQUM7WUFDRixNQUFNLE9BQU8sR0FBbUI7Z0JBQzlCLFFBQVE7Z0JBQ1Is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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxtQkFBbUIsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNoRCxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaTE4biwgSW5pdE9wdGlvbnMgfSBmcm9tICdpMThuZXh0JztcbmltcG9ydCBpMThuZXh0SHR0cEJhY2tlbmQsIHtcbiAgQmFja2VuZE9wdGlvbnMsXG4gIFJlcXVlc3RDYWxsYmFjayxcbn0gZnJvbSAnaTE4bmV4dC1odHRwLWJhY2tlbmQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWdJbml0aWFsaXplclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLWluaXRpYWxpemVyL2NvbmZpZy1pbml0aWFsaXplci5zZXJ2aWNlJztcbmltcG9ydCB7IExhbmd1YWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NpdGUtY29udGV4dC9mYWNhZGUvbGFuZ3VhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblJlc291cmNlcyB9IGZyb20gJy4uL3RyYW5zbGF0aW9uLXJlc291cmNlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpMThuZXh0SW5pdChcbiAgaTE4bmV4dDogaTE4bixcbiAgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcbiAgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgc2VydmVyUmVxdWVzdE9yaWdpbjogc3RyaW5nIHwgbnVsbCxcbiAgc2l0ZUNvbnRleHRJMThuZXh0U3luY2hyb25pemVyOiBTaXRlQ29udGV4dEkxOG5leHRTeW5jaHJvbml6ZXJcbik6ICgpID0+IFByb21pc2U8YW55PiB7XG4gIHJldHVybiAoKSA9PlxuICAgIGNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoJ2kxOG4nKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoY29uZmlnKSA9PiB7XG4gICAgICAgICAgbGV0IGkxOG5leHRDb25maWc6IEluaXRPcHRpb25zID0ge1xuICAgICAgICAgICAgbnM6IFtdLCAvLyBkb24ndCBwcmVsb2FkIGFueSBuYW1lc3BhY2VzXG4gICAgICAgICAgICBmYWxsYmFja0xuZzogY29uZmlnLmkxOG4/LmZhbGxiYWNrTGFuZyxcbiAgICAgICAgICAgIGRlYnVnOiBjb25maWcuaTE4bj8uZGVidWcsXG4gICAgICAgICAgICBpbnRlcnBvbGF0aW9uOiB7XG4gICAgICAgICAgICAgIGVzY2FwZVZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgc2tpcE9uVmFyaWFibGVzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChjb25maWcuaTE4bj8uYmFja2VuZD8ubG9hZFBhdGgpIHtcbiAgICAgICAgICAgIGkxOG5leHQgPSBpMThuZXh0LnVzZShpMThuZXh0SHR0cEJhY2tlbmQpO1xuICAgICAgICAgICAgY29uc3QgbG9hZFBhdGggPSBnZXRMb2FkUGF0aChcbiAgICAgICAgICAgICAgY29uZmlnLmkxOG4uYmFja2VuZC5sb2FkUGF0aCxcbiAgICAgICAgICAgICAgc2VydmVyUmVxdWVzdE9yaWdpblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tlbmQ6IEJhY2tlbmRPcHRpb25zID0ge1xuICAgICAgICAgICAgICBsb2FkUGF0aCxcbiAgICAgICAgICAgICAgcmVxdWVzdDogaTE4bmV4dEdldEh0dHBDbGllbnQoaHR0cENsaWVudCksXG5cbiAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgcGVyaW9kaWNhbCByZWxvYWRpbmcuIE90aGVyd2lzZSBTU1Igd291bGQgbm90IGZpbmlzaCBkdWUgdG8gdGhlIHBlbmRpbmcgdGFzayBgc2V0SW50ZXJ2YWwoKWBcbiAgICAgICAgICAgICAgLy8gU2VlIHNvdXJjZSBjb2RlIG9mIGBpMThuZXh0LWh0dHAtYmFja2VuZGAgOiBodHRwczovL2dpdGh1Yi5jb20vaTE4bmV4dC9pMThuZXh0LWh0dHAtYmFja2VuZC9ibG9iLzAwYjdlOGY2N2FiZjgzNzJhZjE3NTI5YjUxMTkwYTdlOGIxN2UzZDgvbGliL2luZGV4LmpzI0w0MC1MNDFcbiAgICAgICAgICAgICAgcmVsb2FkSW50ZXJ2YWw6IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGkxOG5leHRDb25maWcgPSB7IC4uLmkxOG5leHRDb25maWcsIGJhY2tlbmQgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaTE4bmV4dC5pbml0KGkxOG5leHRDb25maWcsICgpID0+IHtcbiAgICAgICAgICAgIC8vIERvbid0IHVzZSBpMThuZXh0J3MgJ3Jlc291cmNlcycgY29uZmlnIGtleSBmb3IgYWRkaW5nIHN0YXRpYyB0cmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAvLyBiZWNhdXNlIGl0IHdpbGwgZGlzYWJsZSBsb2FkaW5nIGNodW5rcyBmcm9tIGJhY2tlbmQuIFdlIGFkZCByZXNvdXJjZXMgaGVyZSwgaW4gdGhlIGluaXQncyBjYWxsYmFjay5cbiAgICAgICAgICAgIGkxOG5leHRBZGRUcmFuc2xhdGlvbnMoaTE4bmV4dCwgY29uZmlnLmkxOG4/LnJlc291cmNlcyk7XG4gICAgICAgICAgICBzaXRlQ29udGV4dEkxOG5leHRTeW5jaHJvbml6ZXIuaW5pdChpMThuZXh0LCBsYW5ndWFnZVNlcnZpY2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaTE4bmV4dEFkZFRyYW5zbGF0aW9ucyhcbiAgaTE4bmV4dDogaTE4bixcbiAgcmVzb3VyY2VzOiBUcmFuc2xhdGlvblJlc291cmNlcyA9IHt9XG4pOiB2b2lkIHtcbiAgT2JqZWN0LmtleXMocmVzb3VyY2VzKS5mb3JFYWNoKChsYW5nKSA9PiB7XG4gICAgT2JqZWN0LmtleXMocmVzb3VyY2VzW2xhbmddKS5mb3JFYWNoKChjaHVua05hbWUpID0+IHtcbiAgICAgIGkxOG5leHQuYWRkUmVzb3VyY2VCdW5kbGUoXG4gICAgICAgIGxhbmcsXG4gICAgICAgIGNodW5rTmFtZSxcbiAgICAgICAgcmVzb3VyY2VzW2xhbmddW2NodW5rTmFtZV0sXG4gICAgICAgIHRydWUsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFNpdGVDb250ZXh0STE4bmV4dFN5bmNocm9uaXplciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGluaXQoaTE4bmV4dDogaTE4biwgbGFuZ3VhZ2U6IExhbmd1YWdlU2VydmljZSkge1xuICAgIC8vIGFsd2F5cyB1cGRhdGUgbGFuZ3VhZ2Ugb2YgaTE4bmV4dCBvbiBzaXRlIGNvbnRleHQgKGxhbmd1YWdlKSBjaGFuZ2VcbiAgICB0aGlzLnN1YiA9XG4gICAgICB0aGlzLnN1YiA/P1xuICAgICAgbGFuZ3VhZ2UuZ2V0QWN0aXZlKCkuc3Vic2NyaWJlKChsYW5nKSA9PiBpMThuZXh0LmNoYW5nZUxhbmd1YWdlKGxhbmcpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViPy51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIGFwcHJvcHJpYXRlIGZvciBpMThuZXh0IHRvIG1ha2UgaHR0cCBjYWxscyBmb3IgSlNPTiBmaWxlcy5cbiAqIFNlZSBkb2NzIGZvciBgaTE4bmV4dC1odHRwLWJhY2tlbmRgOiBodHRwczovL2dpdGh1Yi5jb20vaTE4bmV4dC9pMThuZXh0LWh0dHAtYmFja2VuZCNiYWNrZW5kLW9wdGlvbnNcbiAqXG4gKiBJdCB1c2VzIEFuZ3VsYXIgSHR0cENsaWVudCB1bmRlciB0aGUgaG9vZCwgc28gaXQgd29ya3MgaW4gU1NSLlxuICogQHBhcmFtIGh0dHBDbGllbnQgQW5ndWxhciBodHRwIGNsaWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bmV4dEdldEh0dHBDbGllbnQoXG4gIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRcbik6IChcbiAgb3B0aW9uczogQmFja2VuZE9wdGlvbnMsXG4gIHVybDogc3RyaW5nLFxuICBwYXlsb2FkOiBvYmplY3QgfCBzdHJpbmcsXG4gIGNhbGxiYWNrOiBSZXF1ZXN0Q2FsbGJhY2tcbikgPT4gdm9pZCB7XG4gIHJldHVybiAoXG4gICAgX29wdGlvbnM6IEJhY2tlbmRPcHRpb25zLFxuICAgIHVybDogc3RyaW5nLFxuICAgIF9wYXlsb2FkOiBvYmplY3QgfCBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IFJlcXVlc3RDYWxsYmFja1xuICApID0+IHtcbiAgICBodHRwQ2xpZW50LmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkuc3Vic2NyaWJlKFxuICAgICAgKGRhdGEpID0+IGNhbGxiYWNrKG51bGwsIHsgc3RhdHVzOiAyMDAsIGRhdGEgfSksXG4gICAgICAoZXJyb3IpID0+XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCB7XG4gICAgICAgICAgLy8gYSB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vaTE4bmV4dC9pMThuZXh0LWh0dHAtYmFja2VuZC9pc3N1ZXMvODJcbiAgICAgICAgICBkYXRhOiBudWxsIGFzIGFueSxcbiAgICAgICAgICBzdGF0dXM6IGVycm9yLnN0YXR1cyxcbiAgICAgICAgfSlcbiAgICApO1xuICB9O1xufVxuXG4vKipcbiAqIFJlc29sdmVzIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHRoZSBhYnNvbHV0ZSBvbmUgaW4gU1NSLCB1c2luZyB0aGUgc2VydmVyIHJlcXVlc3QncyBvcmlnaW4uXG4gKiBJdCdzIG5lZWRlZCwgYmVjYXVzZSBBbmd1bGFyIFVuaXZlcnNhbCBkb2Vzbid0IHN1cHBvcnQgcmVsYXRpdmUgVVJMcyBpbiBIdHRwQ2xpZW50LiBTZWUgQW5ndWxhciBpc3N1ZXM6XG4gKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5MjI0XG4gKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3VuaXZlcnNhbC9pc3N1ZXMvODU4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2FkUGF0aChcbiAgcGF0aDogc3RyaW5nLFxuICBzZXJ2ZXJSZXF1ZXN0T3JpZ2luOiBzdHJpbmcgfCBudWxsXG4pOiBzdHJpbmcge1xuICBpZiAoc2VydmVyUmVxdWVzdE9yaWdpbiAmJiAhcGF0aC5tYXRjaCgvXmh0dHAocyk/OlxcL1xcLy8pKSB7XG4gICAgaWYgKHBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICBwYXRoID0gcGF0aC5zbGljZSgxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3RhcnRzV2l0aCgnLi8nKSkge1xuICAgICAgcGF0aCA9IHBhdGguc2xpY2UoMik7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IGAke3NlcnZlclJlcXVlc3RPcmlnaW59LyR7cGF0aH1gO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG4iXX0=