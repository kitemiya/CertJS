import * as tslib_1 from "tslib";
import { Injectable, Pipe } from '@angular/core';
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, key, value) {
        if (!items) {
            return [];
        }
        if (!key || !value) {
            return items;
        }
        return items.filter(function (singleItem) {
            return singleItem[key].toLowerCase().includes(value.toLowerCase());
        });
    };
    FilterPipe = tslib_1.__decorate([
        Pipe({
            name: 'filter'
        }),
        Injectable()
    ], FilterPipe);
    return FilterPipe;
}());
export { FilterPipe };
//# sourceMappingURL=filter.pipe.js.map