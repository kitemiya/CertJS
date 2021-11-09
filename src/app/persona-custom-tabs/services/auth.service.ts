/********************************************************* {COPYRIGHT-TOP} ***
 * IBM Confidential
 * OCO Source Materials
 * 5725-E59
 *
 * (C) Copyright IBM Corp. 2019 All Rights Reserved.
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 ********************************************************** {COPYRIGHT-END} **/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthService {
  static instance: AuthService;

  public loginStatusChange$: Observable<boolean>;

  private authLoginUrl: string;
  private authLogoutUrl: string;
  private userSettingsUrl: string;
  private loggedIn: boolean = false;
  private loggedInSub: BehaviorSubject<boolean>;

  constructor() {
    // look at sessionStorage to check if the user is logged in
  }

  /**
   * Returns details of current logged-in user from sessionStorage
   * @readonly
   * @type {*}
   * @memberof AuthService
   */
  public get loginInfo(): any {
    return JSON.parse(sessionStorage.getItem("sessionInfo"));
  }

  /**
   * Returns name of current logged in user.
   *
   * @readonly
   * @type {string}
   * @memberof AuthService
   */
  public get loginUserName(): string {
    const info: any = this.loginInfo;
    const result: string = info ? info.loginUser : undefined;

    return result;
  }

  /**
   * Returns company name of current logged-in user.
   *
   * @readonly
   * @type {string}
   * @memberof AuthService
   */
  public get loginUserCompany(): string {
    const info: any = this.loginInfo;
    const result: string = info ? info.loginCompany : undefined;

    return result;
  }
}
