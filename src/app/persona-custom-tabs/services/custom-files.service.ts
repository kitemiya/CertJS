import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorHandlerService } from './http-error-handler.service';
import { HttpRequestOptionsService } from './http-request-options.service';

@Injectable()
export class CustomFilesService {
  private clientRequestOptionsService = new HttpRequestOptionsService();

  constructor(
    @Inject(HttpClient) private http,
    private httpErrorHandlerService: HttpErrorHandlerService
  ) {}

  getFileItems(requesturl: string) {
     let url = requesturl;

    return this.http
      .get(url, this.clientRequestOptionsService.getRequestOptions())
      .pipe(map(this.processItemResponse));
  }

  processItemResponse(response: any) {
    return response;
  }

  getImage(image_url) {
    return this.http
      .get(image_url, this.clientRequestOptionsService.getRequestOptions())
      .pipe(
        map((response) => response),
        catchError((error: any) => throwError(error))
      );
  }
}
