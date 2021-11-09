import * as tslib_1 from "tslib";
import { EventEmitter, Output } from '@angular/core';
var BasePreview = /** @class */ (function () {
    function BasePreview() {
        this.redirectItem = new EventEmitter();
        this.inputData = {};
        this.baseUrl = {};
    }
    BasePreview.prototype.goToSingleEditCatalog = function (catalogObj) {
        this.redirectItem.next(catalogObj);
    };
    BasePreview.prototype.goToSingleEditCollab = function (collabObj) {
        this.redirectItem.next(collabObj);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], BasePreview.prototype, "redirectItem", void 0);
    return BasePreview;
}());
export { BasePreview };
//# sourceMappingURL=base-preview.component.js.map