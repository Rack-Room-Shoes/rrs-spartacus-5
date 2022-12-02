import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SmartEditLauncherService } from '../services/smart-edit-launcher.service';
import * as i0 from "@angular/core";
export declare class CmsTicketInterceptor implements HttpInterceptor {
    private service;
    constructor(service: SmartEditLauncherService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsTicketInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsTicketInterceptor>;
}
