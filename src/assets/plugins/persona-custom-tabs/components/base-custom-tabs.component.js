import * as tslib_1 from "tslib";
import { EventEmitter, Output } from "@angular/core";
var BaseCustomTabs = /** @class */ (function () {
    function BaseCustomTabs() {
        this.redirectItem = new EventEmitter();
        this.inputData = {};
        this.baseUrl = {};
    }
    BaseCustomTabs.prototype.goToSingleEditCatalog = function (catalogObj) {
        this.redirectItem.next(catalogObj);
    };
    BaseCustomTabs.prototype.goToSingleEditCollab = function (collabObj) {
        this.redirectItem.next(collabObj);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], BaseCustomTabs.prototype, "redirectItem", void 0);
    return BaseCustomTabs;
}());
export { BaseCustomTabs };
//# sourceMappingURL=base-custom-tabs.component.js.map