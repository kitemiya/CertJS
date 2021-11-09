import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * This service is used to create url search parameter object.
 */
@Injectable()
export class ClientURLSearchParamService {
  private urlSearchParams: HttpParams;
  constructor() {
    this.urlSearchParams = new HttpParams();
  }

  /**
   * This method adds all key-value pairs.
   * @param searchParams : Array of key-value pair.
   */
  addSearchParams(searchParams: any) {
    for (var key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        this.addSearchParam(key, searchParams[key]);
      }
    }
  }

  /**
   * This method adds key-value search parameter.
   * @param param
   * @param value
   */
  addSearchParam(param: string, value: any) {
    this.urlSearchParams.append(param, value);
  }

  // This method will add extra timestamp in request
  addDateParam() {
    let today = new Date();
    this.urlSearchParams.append("time", String(today.getTime()));
  }

  /**
   * This method will set url search.
   * @param param
   * @param value
   */
  setSearchParams(param: string, value: any) {
    this.urlSearchParams.set(param, value);
  }

  /**
   * this method returns URLSearchParam object.
   */
  getUrlSearchParam(): HttpParams {
    return this.urlSearchParams;
  }
}
