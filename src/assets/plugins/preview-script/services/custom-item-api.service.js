import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';
var CustomItemApiService = /** @class */ (function () {
    function CustomItemApiService(http, httpErrorHandlerService) {
        this.http = http;
        this.httpErrorHandlerService = httpErrorHandlerService;
        this.clientRequestOptionsService = new HttpRequestOptionsService();
    }
    CustomItemApiService.prototype.processItemInfoResponse = function (response) {
        var entryInfoList = new Array();
        var data = response;
        if (data && data.entryInfoList && data.entryInfoList.length > 0) {
            data["entryInfoList"].forEach(function (item) {
                if (item.status == "NOT_CHECKEDOUT") {
                    entryInfoList.push(item.id);
                }
            });
            return entryInfoList;
        }
        else {
            return entryInfoList;
        }
    };
    CustomItemApiService.prototype.loadData = function (endpoint) {
        return this.http
            .get(endpoint, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(this.processItemInfoResponse));
    };
    CustomItemApiService.prototype.editData = function (endpoint, requestObject) {
        var reqData = JSON.stringify(requestObject);
        return this.http.put(endpoint, reqData, this.clientRequestOptionsService.getRequestOptions());
    };
    CustomItemApiService.prototype.delData = function (endpoint) {
        return this.http
            .delete(endpoint, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(function (response) { return response; }), catchError(this.httpErrorHandlerService.handleError));
    };
    CustomItemApiService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__metadata("design:paramtypes", [Object, HttpErrorHandlerService])
    ], CustomItemApiService);
    return CustomItemApiService;
}());
export { CustomItemApiService };
//# sourceMappingURL=custom-item-api.service.js.map