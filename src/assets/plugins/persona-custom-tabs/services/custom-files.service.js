import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';
var CustomFilesService = /** @class */ (function () {
    function CustomFilesService(http, httpErrorHandlerService) {
        this.http = http;
        this.httpErrorHandlerService = httpErrorHandlerService;
        this.clientRequestOptionsService = new HttpRequestOptionsService();
    }
    CustomFilesService.prototype.getFileItems = function (requesturl) {
        var url = requesturl;
        return this.http
            .get(url, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(this.processItemResponse));
    };
    CustomFilesService.prototype.processItemResponse = function (response) {
        return response;
    };
    CustomFilesService.prototype.getImage = function (image_url) {
        return this.http
            .get(image_url, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(function (response) { return response; }), catchError(function (error) { return throwError(error); }));
    };
    CustomFilesService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__metadata("design:paramtypes", [Object, HttpErrorHandlerService])
    ], CustomFilesService);
    return CustomFilesService;
}());
export { CustomFilesService };
//# sourceMappingURL=custom-files.service.js.map