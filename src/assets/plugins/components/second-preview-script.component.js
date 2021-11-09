import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BasePreview } from './base-preview.component';
var SecondPreviewScriptComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SecondPreviewScriptComponent, _super);
    function SecondPreviewScriptComponent() {
        var _this = _super.call(this) || this;
        _this.display = "block";
        return _this;
    }
    SecondPreviewScriptComponent.prototype.closeModalDialog = function () {
        this.display = "none";
    };
    SecondPreviewScriptComponent = tslib_1.__decorate([
        Component({
            selector: "second-preview",
            template: "\n    <div class=\"backdrop\" [ngStyle]=\"{ display: display }\"></div>\n\n    <!-- modal -->\n    <div\n      class=\"modal\"\n      tabindex=\"-1\"\n      role=\"dialog\"\n      [ngStyle]=\"{ display: display }\"\n    >\n      <!-- modal-dialog -->\n      <div class=\"modal-dialog\">\n        <!-- modal-content -->\n        <div class=\"modal-content\">\n          <!-- modal-header -->\n          <div class=\"modal-header\">\n            <span class=\"ui-dialog-title\"> Show Selected Item Ids </span>\n            <button\n              type=\"button\"\n              class=\"close\"\n              (click)=\"closeModalDialog()\"\n              aria-label=\"Close\"\n              title=\"Close\"\n            >\n              <span aria-hidden=\"true\"></span>\n            </button>\n          </div>\n\n          <!-- modal-body -->\n          <div class=\"modal-body\">\n            <div\n              style=\"max-height: 270px;overflow: auto;font-family: Arial; font-size: 14px; color: #444;\"\n            >\n              <table\n                class=\"table table-bordered\"\n                [style.border]=\"'1px solid #bbb'\"\n                [style.align]=\"'center'\"\n              >\n                <thead>\n                  <tr>\n                    <th\n                      style=\"background-color: #e7e7e7; font-weight: normal; font-size: 15px; color: #333;\"\n                    >\n                      Selected Items\n                    </th>\n                    <th\n                      style=\"background-color: #e7e7e7; font-weight: normal; font-size: 15px; color: #333;\"\n                    >\n                      Container Id\n                    </th>\n                    <th\n                      style=\"background-color: #e7e7e7; font-weight: normal; font-size: 15px; color: #333;\"\n                    >\n                      Container Type\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let data of inputData.selectedEntryIds\">\n                    <td>{{ data }}</td>\n                    <td>{{ inputData.containerId }}</td>\n                    <td>{{ inputData.containerType }}</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n\n          <!-- modal-footer -->\n          <div class=\"modal-footer\">\n            <button\n              type=\"button\"\n              class=\"btn btn-default\"\n              (click)=\"closeModalDialog()\"\n              title=\"Close\"\n            >\n              Close\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SecondPreviewScriptComponent);
    return SecondPreviewScriptComponent;
}(BasePreview));
export { SecondPreviewScriptComponent };
//# sourceMappingURL=second-preview-script.component.js.map