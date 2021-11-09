import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClientURLSearchParamService } from './client-url-search-param.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';
var CustomRelatedItemsService = /** @class */ (function () {
    function CustomRelatedItemsService(http, httpErrorHandlerService) {
        this.http = http;
        this.httpErrorHandlerService = httpErrorHandlerService;
        this.clientRequestOptionsService = new HttpRequestOptionsService();
    }
    CustomRelatedItemsService.prototype.getRelatedItems = function (requesturl) {
        var timestamp = "&now=" + new Date().getTime();
        var start = 0;
        var count = 25000;
        var url = requesturl + timestamp + "&start=" + start + "&count=" + count;
        return this.http
            .get(url, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(this.processItemResponse));
    };
    CustomRelatedItemsService.prototype.getItemDetails = function (url) {
        return this.http
            .get(url, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(this.processItemResponse));
    };
    CustomRelatedItemsService.prototype.processItemResponse = function (response) {
        return response;
    };
    CustomRelatedItemsService.prototype.getdisplayThumbnail = function (thumbnail_url) {
        var clientURLSearchParamService = new ClientURLSearchParamService();
        clientURLSearchParamService.addDateParam();
        this.clientRequestOptionsService.addSearchParams(clientURLSearchParamService.getUrlSearchParam());
        return this.http
            .get(thumbnail_url, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(function (response) { return response; }), catchError(function (error) { return throwError(error); }));
    };
    CustomRelatedItemsService.prototype.addGroupNode = function (url, reqObj) {
        var inputJson = {};
        inputJson["attributeInfo"] = reqObj;
        return this.http
            .put(url, JSON.stringify(inputJson), this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(this.processItemResponse), catchError(this.httpErrorHandlerService.handleError));
    };
    CustomRelatedItemsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__metadata("design:paramtypes", [Object, HttpErrorHandlerService])
    ], CustomRelatedItemsService);
    return CustomRelatedItemsService;
}());
export { CustomRelatedItemsService };
//# sourceMappingURL=custom-related-items.service.js.map