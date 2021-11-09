import * as tslib_1 from "tslib";
/**
 * This service handles the error response.
 */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
var HttpErrorHandlerService = /** @class */ (function () {
    function HttpErrorHandlerService() {
    }
    HttpErrorHandlerService.prototype.handleError = function (error) {
        var errorDetails;
        var message;
        if (error) {
            errorDetails = error;
            message = errorDetails.errorMessage;
        }
        else {
            message = "Error occured!";
        }
        return throwError(message);
    };
    HttpErrorHandlerService.prototype.handleErrorData = function (error) {
        var errorDetails;
        errorDetails = error ? error : {};
        return throwError(errorDetails);
    };
    HttpErrorHandlerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], HttpErrorHandlerService);
    return HttpErrorHandlerService;
}());
export { HttpErrorHandlerService };
//# sourceMappingURL=http-error-handler.service.js.map