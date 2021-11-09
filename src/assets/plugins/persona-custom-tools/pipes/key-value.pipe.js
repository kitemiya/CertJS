import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var KeyValuePipe = /** @class */ (function () {
    function KeyValuePipe() {
    }
    KeyValuePipe.prototype.transform = function (value, args) {
        var keys = [];
        if (value) {
            for (var key in value) {
                if (key.indexOf('/') !== -1) {
                    var tempKey = '';
                    var keysArr = key.split('/');
                    if (keysArr[0] != '') {
                        for (var i = 1; i < keysArr.length; i++) {
                            if (tempKey == '') {
                                tempKey = tempKey + keysArr[i];
                            }
                            else {
                                tempKey = tempKey + '/' + keysArr[i];
                            }
                        }
                    }
                    else {
                        for (var i = 2; i < keysArr.length; i++) {
                            if (tempKey == '') {
                                tempKey = tempKey + keysArr[i];
                            }
                            else {
                                tempKey = tempKey + '/' + keysArr[i];
                            }
                        }
                    }
                    keys.push({ key: tempKey, value: value[key] });
                }
                else {
                    keys.push({ key: key, value: value[key] });
                }
            }
        }
        return keys;
    };
    KeyValuePipe = tslib_1.__decorate([
        Pipe({
            name: 'keyValue'
        })
    ], KeyValuePipe);
    return KeyValuePipe;
}());
export { KeyValuePipe };
//# sourceMappingURL=key-value.pipe.js.map