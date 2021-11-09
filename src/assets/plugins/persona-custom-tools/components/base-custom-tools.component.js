import * as tslib_1 from "tslib";
import { EventEmitter, Output } from "@angular/core";
var BaseCustomTools = /** @class */ (function () {
    function BaseCustomTools() {
        this.redirectItem = new EventEmitter();
        this.inputData = {};
        this.baseUrl = {};
    }
    BaseCustomTools.prototype.goToSingleEditCatalog = function (catalogObj) {
        this.redirectItem.next(catalogObj);
    };
    BaseCustomTools.prototype.goToSingleEditCollab = function (collabObj) {
        this.redirectItem.next(collabObj);
    };
    BaseCustomTools.prototype.goToMultiEditCatalog = function (catalogObj) {
        this.redirectItem.next(catalogObj);
    };
    BaseCustomTools.prototype.goToMultiEditCollab = function (collabObj) {
        this.redirectItem.next(collabObj);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], BaseCustomTools.prototype, "redirectItem", void 0);
    return BaseCustomTools;
}());
export { BaseCustomTools };
//# sourceMappingURL=base-custom-tools.component.js.map