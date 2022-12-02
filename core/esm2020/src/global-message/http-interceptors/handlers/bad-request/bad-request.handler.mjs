import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';
export class BadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    handleError(request, response) {
        this.handleBadPassword(request, response);
        this.handleBadLoginResponse(request, response);
        this.handleValidationError(request, response);
        this.handleGuestDuplicateEmail(request, response);
        this.handleUnknownIdentifierError(request, response);
    }
    handleBadPassword(request, response) {
        if (response.url?.includes(OAUTH_ENDPOINT) &&
            response.error?.error === 'invalid_grant' &&
            request.body?.get('grant_type') === 'password') {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestPleaseLoginAgain',
                params: {
                    errorMessage: response.error.error_description || response.message || '',
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
    handleBadLoginResponse(_request, response) {
        this.getErrors(response)
            .filter((error) => error.type === 'PasswordMismatchError')
            .forEach(() => {
            // Updating email and changing password share same http error occurence.
            // Determine the context of global error message based on request url
            const url = new URL(_request.url);
            const key = url.pathname.endsWith('/password')
                ? 'httpHandlers.badRequestOldPasswordIncorrect'
                : 'httpHandlers.validationErrors.invalid.password';
            this.globalMessageService.add({ key }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleValidationError(_request, response) {
        this.getErrors(response)
            .filter((e) => e.type === 'ValidationError')
            .forEach((error) => {
            this.globalMessageService.add({
                key: `httpHandlers.validationErrors.${error.reason}.${error.subject}`,
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleGuestDuplicateEmail(_request, response) {
        this.getErrors(response)
            .filter((e) => e.type === 'DuplicateUidError')
            .forEach((error) => {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestGuestDuplicateEmail',
                params: {
                    errorMessage: error.message || '',
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleUnknownIdentifierError(_request, response) {
        this.getErrors(response)
            .filter((e) => e.type === 'UnknownIdentifierError')
            .forEach((error) => {
            this.globalMessageService.add(error.message
                ? error.message
                : { key: 'httpHandlers.unknownIdentifier' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== 'JaloObjectNoLongerValidError');
    }
    getPriority() {
        return -10 /* Priority.LOW */;
    }
}
BadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.3", ngImport: i0, type: BadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLXJlcXVlc3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2dsb2JhbC1tZXNzYWdlL2h0dHAtaW50ZXJjZXB0b3JzL2hhbmRsZXJzL2JhZC1yZXF1ZXN0L2JhZC1yZXF1ZXN0LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFekQsTUFBTSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7QUFLMUQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGdCQUFnQjtJQUh2RDs7UUFJRSxtQkFBYyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztLQWtIakQ7SUFoSEMsV0FBVyxDQUFDLE9BQXlCLEVBQUUsUUFBMkI7UUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsT0FBeUIsRUFDekIsUUFBMkI7UUFFM0IsSUFDRSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxj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QUMsb0JBQW9CLENBQUMsR0FBRyxDQUMzQixLQUFLLENBQUMsT0FBTztnQkFDWCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQ2YsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLGdDQUFnQyxFQUFFLEVBQzdDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLFNBQVMsQ0FBQyxRQUEyQjtRQUM3QyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUMxQyxDQUFDLEtBQWlCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssOEJBQThCLENBQ3JFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULDhCQUFvQjtJQUN0QixDQUFDOzs4R0FsSFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjIgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXJyb3JNb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZGVsL21pc2MubW9kZWwnO1xuaW1wb3J0IHsgUHJpb3JpdHkgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlsL2FwcGxpY2FibGUnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvZ2xvYmFsLW1lc3NhZ2UubW9kZWwnO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlU3RhdHVzIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3Jlc3BvbnNlLXN0YXR1cy5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vaHR0cC1lcnJvci5oYW5kbGVyJztcblxuY29uc3QgT0FVVEhfRU5EUE9JTlQgPSAnL2F1dGhvcml6YXRpb25zZXJ2ZXIvb2F1dGgvdG9rZW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQmFkUmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBIdHRwRXJyb3JIYW5kbGVyIHtcbiAgcmVzcG9uc2VTdGF0dXMgPSBIdHRwUmVzcG9uc2VTdGF0dXMuQkFEX1JFUVVFU1Q7XG5cbiAgaGFuZGxlRXJyb3IocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVCYWRQYXNzd29yZChyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgdGhpcy5oYW5kbGVCYWRMb2dpblJlc3BvbnNlKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICB0aGlzLmhhbmRsZVZhbGlkYXRpb25FcnJvcihyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgdGhpcy5oYW5kbGVHdWVzdER1cGxpY2F0ZUVtYWlsKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICB0aGlzLmhhbmRsZVVua25vd25JZGVudGlmaWVyRXJyb3IocmVxdWVzdCwgcmVzcG9uc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUJhZFBhc3N3b3JkKFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlXG4gICk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHJlc3BvbnNlLnVybD8uaW5jbHVkZXMoT0FVVEhfRU5EUE9JTlQpICYmXG4gICAgICByZXNwb25zZS5lcnJvcj8uZXJyb3IgPT09ICdpbnZhbGlkX2dyYW50JyAmJlxuICAgICAgcmVxdWVzdC5ib2R5Py5nZXQoJ2dyYW50X3R5cGUnKSA9PT0gJ3Bhc3N3b3JkJ1xuICAgICkge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdodHRwSGFuZGxlcnMuYmFkUmVxdWVzdFBsZWFzZUxvZ2luQWdhaW4nLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOlxuICAgICAgICAgICAgICByZXNwb25zZS5lcnJvci5lcnJvcl9kZXNjcmlwdGlvbiB8fCByZXNwb25zZS5tZXNzYWdlIHx8ICcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICApO1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5yZW1vdmUoR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlQmFkTG9naW5SZXNwb25zZShcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKSB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlcnJvcikgPT4gZXJyb3IudHlwZSA9PT0gJ1Bhc3N3b3JkTWlzbWF0Y2hFcnJvcicpXG4gICAgICAuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgIC8vIFVwZGF0aW5nIGVtYWlsIGFuZCBjaGFuZ2luZyBwYXNzd29yZCBzaGFyZSBzYW1lIGh0dHAgZXJyb3Igb2NjdXJlbmNlLlxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvbnRleHQgb2YgZ2xvYmFsIGVycm9yIG1lc3NhZ2UgYmFzZWQgb24gcmVxdWVzdCB1cmxcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChfcmVxdWVzdC51cmwpO1xuICAgICAgICBjb25zdCBrZXkgPSB1cmwucGF0aG5hbWUuZW5kc1dpdGgoJy9wYXNzd29yZCcpXG4gICAgICAgICAgPyAnaHR0cEhhbmRsZXJzLmJhZFJlcXVlc3RPbGRQYXNzd29yZEluY29ycmVjdCdcbiAgICAgICAgICA6ICdodHRwSGFuZGxlcnMudmFsaWRhdGlvbkVycm9ycy5pbnZhbGlkLnBhc3N3b3JkJztcblxuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICB7IGtleSB9LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVWYWxpZGF0aW9uRXJyb3IoXG4gICAgX3JlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKVxuICAgICAgLmZpbHRlcigoZSkgPT4gZS50eXBlID09PSAnVmFsaWRhdGlvbkVycm9yJylcbiAgICAgIC5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXk6IGBodHRwSGFuZGxlcnMudmFsaWRhdGlvbkVycm9ycy4ke2Vycm9yLnJlYXNvbn0uJHtlcnJvci5zdWJqZWN0fWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlR3Vlc3REdXBsaWNhdGVFbWFpbChcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlKSA9PiBlLnR5cGUgPT09ICdEdXBsaWNhdGVVaWRFcnJvcicpXG4gICAgICAuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAge1xuICAgICAgICAgICAga2V5OiAnaHR0cEhhbmRsZXJzLmJhZFJlcXVlc3RHdWVzdER1cGxpY2F0ZUVtYWlsJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgJycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVVua25vd25JZGVudGlmaWVyRXJyb3IoXG4gICAgX3JlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKVxuICAgICAgLmZpbHRlcigoZSkgPT4gZS50eXBlID09PSAnVW5rbm93bklkZW50aWZpZXJFcnJvcicpXG4gICAgICAuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICA6IHsga2V5OiAnaHR0cEhhbmRsZXJzLnVua25vd25JZGVudGlmaWVyJyB9LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRFcnJvcnMocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogRXJyb3JNb2RlbFtdIHtcbiAgICByZXR1cm4gKHJlc3BvbnNlLmVycm9yPy5lcnJvcnMgfHwgW10pLmZpbHRlcihcbiAgICAgIChlcnJvcjogRXJyb3JNb2RlbCkgPT4gZXJyb3IudHlwZSAhPT0gJ0phbG9PYmplY3ROb0xvbmdlclZhbGlkRXJyb3InXG4gICAgKTtcbiAgfVxuXG4gIGdldFByaW9yaXR5KCk6IFByaW9yaXR5IHtcbiAgICByZXR1cm4gUHJpb3JpdHkuTE9XO1xuICB9XG59XG4iXX0=