import * as tslib_1 from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '../models/http-request-options';
/**
 * This service is used to create request option object.
 */
var HttpRequestOptionsService = /** @class */ (function () {
    function HttpRequestOptionsService() {
    }
    // This method is used to get request option object.
    HttpRequestOptionsService.prototype.getRequestOptions = function () {
        if (this.requestOptions) {
            return this.requestOptions;
        }
        else {
            this.requestOptions = new RequestOptions();
            this.requestOptions.headers = this.getHeaders();
            this.requestOptions.withCredentials = true;
            return this.requestOptions;
        }
    };
    //This funtion return headers.
    HttpRequestOptionsService.prototype.getHeaders = function () {
        if (this.headers) {
            return this.headers;
        }
        else {
            this.headers = new HttpHeaders().set("Content-Type", "application/json");
            this.headers = this.headers.append("Authorization", "Bearer " + sessionStorage.getItem("auth_token"));
            return this.headers;
        }
    };
    /**
     * This method is used to add headers.
     * @param key
     * @param value
     */
    HttpRequestOptionsService.prototype.addHeaders = function (key, value) {
        this.headers.append(key, value);
    };
    /**
     * This method adds url search params in request option.
     * @param urlSearchParams
     */
    HttpRequestOptionsService.prototype.addSearchParams = function (urlSearchParams) {
        this.requestOptions.params = urlSearchParams;
    };
    /**
     * This method sets header object.
     * @param headers
     */
    HttpRequestOptionsService.prototype.setHeader = function (headers) {
        this.requestOptions.headers = headers;
    };
    HttpRequestOptionsService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], HttpRequestOptionsService);
    return HttpRequestOptionsService;
}());
export { HttpRequestOptionsService };
//# sourceMappingURL=http-request-options.service.js.map