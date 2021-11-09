import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ClientURLSearchParamService } from './client-url-search-param.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';
var CatalogListService = /** @class */ (function () {
    function CatalogListService(http, httpErrorHandlerService) {
        this.http = http;
        this.httpErrorHandlerService = httpErrorHandlerService;
        this.clientRequestOptionsService = new HttpRequestOptionsService();
    }
    /**
     *
     * @param endpoint Get list of catalogs
     */
    CatalogListService.prototype.getCatalogs = function (endpoint) {
        var clientURLSearchParamService = new ClientURLSearchParamService();
        var data = this.clientRequestOptionsService.getRequestOptions();
        clientURLSearchParamService.addDateParam();
        this.clientRequestOptionsService.addSearchParams(clientURLSearchParamService.getUrlSearchParam());
        console.log(this.clientRequestOptionsService.getRequestOptions());
        return this.http
            .get(endpoint, this.clientRequestOptionsService.getRequestOptions())
            .pipe(map(this.processCatalogResponse), catchError(this.httpErrorHandlerService.handleError));
    };
    /**
     *
     * @param endpoint Get list oh hierarchies by catalogId
     * @param catalogId
     */
    CatalogListService.prototype.processCatalogResponse = function (response) {
        var catalogList = new Array();
        var data = response;
        console.log(response);
        if (data && data.catalogInfoList && data.catalogInfoList.length > 0) {
            data["catalogInfoList"].forEach(function (catalog) {
                catalogList.push({
                    label: catalog["catalogName"],
                    value: catalog["id"],
                });
            });
            return catalogList;
        }
        else {
            return data;
        }
    };
    CatalogListService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(HttpClient)),
        tslib_1.__metadata("design:paramtypes", [Object, HttpErrorHandlerService])
    ], CatalogListService);
    return CatalogListService;
}());
export { CatalogListService };
//# sourceMappingURL=catalog-list.service.js.map