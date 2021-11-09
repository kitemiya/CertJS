import * as tslib_1 from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * This service is used to create url search parameter object.
 */
var ClientURLSearchParamService = /** @class */ (function () {
    function ClientURLSearchParamService() {
        this.urlSearchParams = new HttpParams();
    }
    /**
     * This method adds all key-value pairs.
     * @param searchParams : Array of key-value pair.
     */
    ClientURLSearchParamService.prototype.addSearchParams = function (searchParams) {
        for (var key in searchParams) {
            if (searchParams.hasOwnProperty(key)) {
                this.addSearchParam(key, searchParams[key]);
            }
        }
    };
    /**
     * This method adds key-value search parameter.
     * @param param
     * @param value
     */
    ClientURLSearchParamService.prototype.addSearchParam = function (param, value) {
        this.urlSearchParams.append(param, value);
    };
    // This method will add extra timestamp in request
    ClientURLSearchParamService.prototype.addDateParam = function () {
        var today = new Date();
        this.urlSearchParams.append("time", String(today.getTime()));
    };
    /**
     * This method will set url search.
     * @param param
     * @param value
     */
    ClientURLSearchParamService.prototype.setSearchParams = function (param, value) {
        this.urlSearchParams.set(param, value);
    };
    /**
     * this method returns URLSearchParam object.
     */
    ClientURLSearchParamService.prototype.getUrlSearchParam = function () {
        return this.urlSearchParams;
    };
    ClientURLSearchParamService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClientURLSearchParamService);
    return ClientURLSearchParamService;
}());
export { ClientURLSearchParamService };
//# sourceMappingURL=client-url-search-param.service.js.map