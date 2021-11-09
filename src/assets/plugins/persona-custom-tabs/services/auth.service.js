import * as tslib_1 from "tslib";
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
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.loggedIn = false;
        // look at sessionStorage to check if the user is logged in
    }
    Object.defineProperty(AuthService.prototype, "loginInfo", {
        /**
         * Returns details of current logged-in user from sessionStorage
         * @readonly
         * @type {*}
         * @memberof AuthService
         */
        get: function () {
            return JSON.parse(sessionStorage.getItem("sessionInfo"));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "loginUserName", {
        /**
         * Returns name of current logged in user.
         *
         * @readonly
         * @type {string}
         * @memberof AuthService
         */
        get: function () {
            var info = this.loginInfo;
            var result = info ? info.loginUser : undefined;
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "loginUserCompany", {
        /**
         * Returns company name of current logged-in user.
         *
         * @readonly
         * @type {string}
         * @memberof AuthService
         */
        get: function () {
            var info = this.loginInfo;
            var result = info ? info.loginCompany : undefined;
            return result;
        },
        enumerable: true,
        configurable: true
    });
    AuthService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map