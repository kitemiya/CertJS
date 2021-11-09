import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ClientURLSearchParamService } from './client-url-search-param.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';

@Injectable()
export class CatalogListService {
  private clientRequestOptionsService = new HttpRequestOptionsService();

  constructor(
    @Inject(HttpClient) private http,
    private httpErrorHandlerService: HttpErrorHandlerService
  ) {}

  /**
   *
   * @param endpoint Get list of catalogs
   */
  getCatalogs(endpoint: string): Observable<any> {
    let clientURLSearchParamService = new ClientURLSearchParamService();
    let data = this.clientRequestOptionsService.getRequestOptions();
    clientURLSearchParamService.addDateParam();
    this.clientRequestOptionsService.addSearchParams(
      clientURLSearchParamService.getUrlSearchParam()
    );
    console.log(this.clientRequestOptionsService.getRequestOptions());
    return this.http
      .get(endpoint, this.clientRequestOptionsService.getRequestOptions())
      .pipe(
        map(this.processCatalogResponse),
        catchError(this.httpErrorHandlerService.handleError)
      );
  }

  /**
   *
   * @param endpoint Get list oh hierarchies by catalogId
   * @param catalogId
   */
  processCatalogResponse(response: any) {
    let catalogList = new Array<any>();
    let data = response;
    console.log(response);
    if (data && data.catalogInfoList && data.catalogInfoList.length > 0) {
      data["catalogInfoList"].forEach((catalog) => {
        catalogList.push({
          label: catalog["catalogName"],
          value: catalog["id"],
        });
      });
      return catalogList;
    } else {
      return data;
    }
  }
}
