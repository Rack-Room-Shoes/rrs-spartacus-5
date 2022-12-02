import { HttpClient } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { i18n } from 'i18next';
import { BackendOptions, RequestCallback } from 'i18next-http-backend';
import { Subscription } from 'rxjs';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { LanguageService } from '../../site-context/facade/language.service';
import { TranslationResources } from '../translation-resources';
import * as i0 from "@angular/core";
export declare function i18nextInit(i18next: i18n, configInit: ConfigInitializerService, languageService: LanguageService, httpClient: HttpClient, serverRequestOrigin: string | null, siteContextI18nextSynchronizer: SiteContextI18nextSynchronizer): () => Promise<any>;
export declare function i18nextAddTranslations(i18next: i18n, resources?: TranslationResources): void;
export declare class SiteContextI18nextSynchronizer implements OnDestroy {
    sub: Subscription;
    init(i18next: i18n, language: LanguageService): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextI18nextSynchronizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextI18nextSynchronizer>;
}
/**
 * Returns a function appropriate for i18next to make http calls for JSON files.
 * See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
 *
 * It uses Angular HttpClient under the hood, so it works in SSR.
 * @param httpClient Angular http client
 */
export declare function i18nextGetHttpClient(httpClient: HttpClient): (options: BackendOptions, url: string, payload: object | string, callback: RequestCallback) => void;
/**
 * Resolves the relative path to the absolute one in SSR, using the server request's origin.
 * It's needed, because Angular Universal doesn't support relative URLs in HttpClient. See Angular issues:
 * - https://github.com/angular/angular/issues/19224
 * - https://github.com/angular/universal/issues/858
 */
export declare function getLoadPath(path: string, serverRequestOrigin: string | null): string;
