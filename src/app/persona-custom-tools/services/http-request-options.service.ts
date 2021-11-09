import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RequestOptions } from '../models/http-request-options';

/**
 * This service is used to create request option object.
 */
@Injectable()
export class HttpRequestOptionsService {
  private requestOptions: RequestOptions;
  private headers: HttpHeaders;

  constructor() {}

  // This method is used to get request option object.
  public getRequestOptions(): RequestOptions {
    if (this.requestOptions) {
      return this.requestOptions;
    } else {
      this.requestOptions = new RequestOptions();
      this.requestOptions.headers = this.getHeaders();
      this.requestOptions.withCredentials = true;
      return this.requestOptions;
    }
  }
  //This funtion return headers.
  private getHeaders() {
    if (this.headers) {
      return this.headers;
    } else {
      this.headers = new HttpHeaders().set("Content-Type", "application/json");
      this.headers = this.headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem("auth_token")
      );
      return this.headers;
    }
  }

  /**
   * This method is used to add headers.
   * @param key
   * @param value
   */
  public addHeaders(key: string, value: string) {
    this.headers.append(key, value);
  }

  /**
   * This method adds url search params in request option.
   * @param urlSearchParams
   */
  public addSearchParams(urlSearchParams: HttpParams) {
    this.requestOptions.params = urlSearchParams;
  }

  /**
   * This method sets header object.
   * @param headers
   */
  public setHeader(headers: HttpHeaders) {
    this.requestOptions.headers = headers;
  }
}
