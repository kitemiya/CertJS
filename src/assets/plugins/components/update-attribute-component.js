import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CustomItemApiService } from '../services/custom-item-api.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { BasePreview } from './base-preview.component';
var UpdateAttributeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UpdateAttributeComponent, _super);
    function UpdateAttributeComponent(customApiService) {
        var _this = _super.call(this) || this;
        _this.customApiService = customApiService;
        _this.display = "block";
        _this.attributePath = "";
        _this.isDeleteEnabled = false;
        return _this;
    }
    UpdateAttributeComponent.prototype.ngOnInit = function () {
        // if (this.inputData.categoryId) {
        //   this.isDeleteEnabled = true;
        // }
    };
    UpdateAttributeComponent.prototype.updateAttribute = function (val) {
        this.updateItemsWithAttribute(val);
    };
    UpdateAttributeComponent.prototype.delEntries = function () {
        var endPoint = this.baseUrl +
            "catalogs/" +
            this.inputData.containerId +
            "/items/?itemIds=" +
            this.inputData.selectedEntryIds.join(",");
        this.customApiService.delData(endPoint).subscribe(function (res) {
            if (res["successCount"] > 0) {
                alert(res["successCount"] + "items deleted succesfully");
            }
            else {
                alert("items are not deleted");
            }
        });
    };
    UpdateAttributeComponent.prototype.updateItemsWithAttribute = function (attribute) {
        var _this = this;
        var endPoint = this.baseUrl +
            "catalogs/" +
            this.inputData.containerId +
            "/items?catalogId=" +
            this.inputData.containerId +
            "&sortAttrPath=&sortOrder=asc&itemIds=" +
            this.inputData.selectedEntryIds.join(",");
        this.customApiService.loadData(endPoint).subscribe(function (entryList) {
            var entryInfoList = [];
            var attrInfoList = [];
            var reqObj = {};
            var updateEndPoint = _this.baseUrl + "catalogs/" + _this.inputData.containerId + "/items/";
            entryList.forEach(function (entryid) {
                var reqEntries = {};
                attrInfoList = [];
                reqEntries["entryId"] = entryid;
                attrInfoList.push({
                    attributePath: _this.attributePath,
                    newValue: attribute,
                });
                reqEntries["attrInfoList"] = attrInfoList;
                entryInfoList.push(reqEntries);
            });
            reqObj["entryInfoList"] = entryInfoList;
            _this.customApiService
                .editData(updateEndPoint, reqObj)
                .subscribe(function (res) {
                alert("Updated succesfully");
                _this.display = "none";
            });
        });
    };
    UpdateAttributeComponent.prototype.closeModalDialog = function () {
        this.display = "none";
    };
    UpdateAttributeComponent = tslib_1.__decorate([
        Component({
            selector: "update-attribute",
            template: "\n    <div class=\"backdrop\" [ngStyle]=\"{ display: display }\"></div>\n\n    <div\n      class=\"modal\"\n      tabindex=\"-1\"\n      role=\"dialog\"\n      [ngStyle]=\"{ display: display }\"\n    >\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <span *ngIf=\"!isDeleteEnabled\" class=\"ui-dialog-title\">\n              Update Attribute\n            </span>\n\n            <button\n              type=\"button\"\n              class=\"close\"\n              (click)=\"closeModalDialog()\"\n              aria-label=\"Close\"\n              title=\"Close\"\n            >\n              <span aria-hidden=\"true\"></span>\n            </button>\n          </div>\n\n          <div class=\"modal-body\">\n            <div\n              style=\"max-height: 270px;overflow: auto;font-family: Arial; font-size: 14px; color: #444;\"\n            ></div>\n            <div>\n              <input\n                style=\"max-width: 195px; display: inline-block; margin-right: 10px\"\n                class=\"form-control\"\n                #inputPath\n                [(ngModel)]=\"attributePath\"\n                type=\"text\"\n                placeholder=\"Enter full attribute Path\"\n              />\n              <input\n                style=\"max-width: 195px; display: inline-block; margin-right: 10px\"\n                class=\"form-control\"\n                #attribute\n                type=\"text\"\n              />\n              <button\n                title=\"Update Attribute\"\n                class=\"btn btn-primary\"\n                (click)=\"updateAttribute(attribute.value)\"\n              >\n                Update Attribute\n              </button>\n              <button\n                *ngIf=\"isDeleteEnabled\"\n                title=\"Delete Selected Items\"\n                class=\"btn btn-primary\"\n                (click)=\"delEntries()\"\n              >\n                Delete Selected Items\n              </button>\n            </div>\n          </div>\n\n          <div class=\"modal-footer\">\n            <button\n              type=\"button\"\n              class=\"btn btn-default\"\n              (click)=\"closeModalDialog()\"\n              title=\"Close\"\n            >\n              Close\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            providers: [CustomItemApiService, HttpErrorHandlerService],
        }),
        tslib_1.__metadata("design:paramtypes", [CustomItemApiService])
    ], UpdateAttributeComponent);
    return UpdateAttributeComponent;
}(BasePreview));
export { UpdateAttributeComponent };
//# sourceMappingURL=update-attribute-component.js.map