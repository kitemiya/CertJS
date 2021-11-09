import { HttpHeaders, HttpParams } from '@angular/common/http';

export class RequestOptions {
  headers?: HttpHeaders;
  responseType?;
  observe?;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}
