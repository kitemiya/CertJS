import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ClientURLSearchParamService } from './client-url-search-param.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';

@Injectable()
export class CustomRelatedItemsService {
  private clientRequestOptionsService = new HttpRequestOptionsService();

  constructor(
    @Inject(HttpClient) private http,
    private httpErrorHandlerService: HttpErrorHandlerService
  ) {}

  getRelatedItems(requesturl: string) {
    let timestamp = "&now=" + new Date().getTime();
    let start = 0;
    let count = 25000;
    let url = requesturl + timestamp + "&start=" + start + "&count=" + count;

    return this.http
      .get(url, this.clientRequestOptionsService.getRequestOptions())
      .pipe(map(this.processItemResponse));
  }
  getItemDetails(url) {
    return this.http
      .get(url, this.clientRequestOptionsService.getRequestOptions())
      .pipe(map(this.processItemResponse));
  }

  processItemResponse(response: any) {
    return response;
  }
  getdisplayThumbnail(thumbnail_url) {
    let clientURLSearchParamService = new ClientURLSearchParamService();
    clientURLSearchParamService.addDateParam();
    this.clientRequestOptionsService.addSearchParams(
      clientURLSearchParamService.getUrlSearchParam()
    );
    return this.http
      .get(thumbnail_url, this.clientRequestOptionsService.getRequestOptions())
      .pipe(
        map((response) => response),
        catchError((error: any) => throwError(error))
      );
  }
  addGroupNode(url: string, reqObj: any) {
    let inputJson = {};
    inputJson["attributeInfo"] = reqObj;
    return this.http
      .put(
        url,
        JSON.stringify(inputJson),
        this.clientRequestOptionsService.getRequestOptions()
      )
      .pipe(
        map(this.processItemResponse),
        catchError(this.httpErrorHandlerService.handleError)
      );
  }
}
