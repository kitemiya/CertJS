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
import { Pipe } from '@angular/core';
var GroupKeyValuePipe = /** @class */ (function () {
    function GroupKeyValuePipe() {
    }
    GroupKeyValuePipe.prototype.transform = function (value, args) {
        var keys = [];
        if (value) {
            var _loop_1 = function (key) {
                var keysArr = key.split('/');
                keysArr.forEach(function (element) {
                    if (element.indexOf('#') !== -1) {
                        var keysArr1 = key.split('#');
                        var resultKeyAttr = keysArr1[1].split('/');
                        if (resultKeyAttr.length > 1) {
                            keys.push({
                                key: element + '-' + resultKeyAttr[1],
                                value: value[key]
                            });
                        }
                    }
                });
            };
            // tslint:disable-next-line:forin
            for (var key in value) {
                _loop_1(key);
            }
            return keys;
        }
    };
    GroupKeyValuePipe = tslib_1.__decorate([
        Pipe({
            name: 'groupKeyValue'
        })
    ], GroupKeyValuePipe);
    return GroupKeyValuePipe;
}());
export { GroupKeyValuePipe };
//# sourceMappingURL=grouping-key-value.pipe.js.map