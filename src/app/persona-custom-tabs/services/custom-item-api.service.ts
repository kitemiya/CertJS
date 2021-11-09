import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';

@Injectable()
export class CustomItemApiService {
  private clientRequestOptionsService = new HttpRequestOptionsService();

  constructor(
    @Inject(HttpClient) private http,
    private httpErrorHandlerService: HttpErrorHandlerService
  ) {}

  processItemInfoResponse(response: any): Array<any> {
    const entryInfoList = new Array<any>();
    const data = response;
    if (data && data.entryInfoList && data.entryInfoList.length > 0) {
      data["entryInfoList"].forEach((item) => {
        if (item.status == "NOT_CHECKEDOUT") {
          entryInfoList.push(item.id);
        }
      });
      return entryInfoList;
    } else {
      return entryInfoList;
    }
  }

  public loadData(endpoint) {
    return this.http
      .get(endpoint, this.clientRequestOptionsService.getRequestOptions())
      .pipe(map(this.processItemInfoResponse));
  }

  public editData(endpoint, requestObject: any) {
    const reqData = JSON.stringify(requestObject);
    return this.http.put(
      endpoint,
      reqData,
      this.clientRequestOptionsService.getRequestOptions()
    );
  }

  public delData(endpoint) {
    return this.http
      .delete(endpoint, this.clientRequestOptionsService.getRequestOptions())
      .pipe(
        map((response) => response),
        catchError(this.httpErrorHandlerService.handleError)
      );
  }
}
