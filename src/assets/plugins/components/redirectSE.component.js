import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BasePreview } from './base-preview.component';
var RedirectSEComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RedirectSEComponent, _super);
    function RedirectSEComponent() {
        var _this = _super.call(this) || this;
        _this.display = "block";
        _this.selectedIds = [];
        _this.relatedItems = [];
        return _this;
    }
    RedirectSEComponent.prototype.ngOnInit = function () {
        this.relatedItems = [526817, 526818, 526819];
    };
    RedirectSEComponent.prototype.closeModalDialog = function () {
        this.display = "none";
    };
    RedirectSEComponent.prototype.changeSelection = function (id, isSelected) {
        if (isSelected) {
            this.selectedIds.push(id);
        }
        else {
            var index = this.selectedIds.indexOf(id);
            this.selectedIds.splice(index, 1);
        }
    };
    RedirectSEComponent.prototype.redirectToSECatalog = function () {
        var obj = {
            type: "catalog",
            catalogId: 92202,
            itemIds: this.selectedIds,
        };
        this.display = "none";
        this.goToSingleEditCatalog(obj);
    };
    RedirectSEComponent.prototype.redirectToSECollab = function () {
        // let obj = {
        //   type: "collab",
        //   collabType: "item",
        //   entryIds: [480609, 480608, 480607],
        //   collabId: 605,
        //   stepId: 455
        // };
        var obj = {
            type: "collab",
            collabType: "item",
            entryIds: [523081, 525399, 568684],
            collabId: 17402,
            stepId: 16806,
        };
        this.display = "none";
        this.goToSingleEditCollab(obj);
    };
    RedirectSEComponent.prototype.enableButtons = function () {
        return this.selectedIds.length > 0 ? false : true;
    };
    RedirectSEComponent = tslib_1.__decorate([
        Component({
            selector: "redirectSE",
            template: "\n    <div class=\"backdrop\" [ngStyle]=\"{ display: display }\"></div>\n\n    <!-- modal -->\n    <div\n      class=\"modal\"\n      tabindex=\"-1\"\n      role=\"dialog\"\n      [ngStyle]=\"{ display: display }\"\n    >\n      <!-- modal-dialog -->\n      <div class=\"modal-dialog\">\n        <!-- modal-content -->\n        <div class=\"modal-content\">\n          <!-- modal-header -->\n          <div class=\"modal-header\">\n            <span class=\"ui-dialog-title\"> Show All Items </span>\n            <button\n              type=\"button\"\n              class=\"close\"\n              (click)=\"closeModalDialog()\"\n              aria-label=\"Close\"\n              title=\"Close\"\n            >\n              <span aria-hidden=\"true\"></span>\n            </button>\n          </div>\n\n          <!-- modal-body -->\n          <div class=\"modal-body\">\n            <div\n              style=\"max-height: 270px;overflow: auto;font-family: Arial; font-size: 14px; color: #444;\"\n            >\n              <div>Related Items:</div>\n              <div *ngFor=\"let data of relatedItems\">\n                <input\n                  #checkId\n                  type=\"checkbox\"\n                  [value]=\"data\"\n                  (change)=\"changeSelection(data, checkId.checked)\"\n                />\n                {{ data }}\n              </div>\n            </div>\n            <div class=\"action-btn-wrapper\">\n              <button\n                class=\"btn btn-primary\"\n                [disabled]=\"enableButtons()\"\n                (click)=\"redirectToSECatalog()\"\n              >\n                Go to Single Edit\n              </button>\n\n              <button class=\"btn btn-primary\" (click)=\"redirectToSECollab()\">\n                Go to Single Edit Collab\n              </button>\n            </div>\n          </div>\n\n          <!-- modal-footer -->\n          <div class=\"modal-footer\">\n            <button\n              type=\"button\"\n              class=\"btn btn-default\"\n              (click)=\"closeModalDialog()\"\n              title=\"Close\"\n            >\n              Close\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RedirectSEComponent);
    return RedirectSEComponent;
}(BasePreview));
export { RedirectSEComponent };
//# sourceMappingURL=redirectSE.component.js.map