import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BaseCustomTabs } from "./base-custom-tabs.component";
var RedirectSEComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RedirectSEComponent, _super);
    function RedirectSEComponent() {
        return _super.call(this) || this;
    }
    RedirectSEComponent.prototype.ngOnInit = function () { };
    RedirectSEComponent.prototype.redirectToSECatalog = function () {
        // need to add these details to open a specific item in catalog mode
        var singleEditCatalogData = {
            singleEditType: "CATALOG",
            catalogName: "Bell Canada",
            catalogId: 11410,
            selectedIds: [71612],
        };
        this.goToSingleEditCatalog(singleEditCatalogData);
    };
    RedirectSEComponent.prototype.redirectToSECollab = function () {
        // need to add these details to open a specific item in collab mode
        var singleEditCollabData = {
            singleEditType: "collab",
            collabType: "item",
            collabName: "BellCanada_CTGCA",
            selectedIds: [56641],
            collabId: 802,
            stepId: 807,
        };
        this.goToSingleEditCollab(singleEditCollabData);
    };
    RedirectSEComponent = tslib_1.__decorate([
        Component({
            selector: "redirectSE",
            template: "\n    <style>\n      .custom-tab.action-btn-wrapper {\n        display: inline-block;\n      }\n      .custom-tab.action-btn-wrapper .btn {\n        margin: 20px 10px !important;\n        height: 30px !important;\n      }\n    </style>\n    <div class=\"custom-tab action-btn-wrapper\">\n      <button class=\"btn btn-primary\" (click)=\"redirectToSECatalog()\">\n        Go to Single Edit\n      </button>\n\n      <button\n        class=\"btn btn-primary\"\n        (click)=\"redirectToSECollab()\"\n        *ngIf=\"inputData.containerType == 'CATALOG'\"\n      >\n        Go to Single Edit Collab\n      </button>\n    </div>\n  ",
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RedirectSEComponent);
    return RedirectSEComponent;
}(BaseCustomTabs));
export { RedirectSEComponent };
//# sourceMappingURL=redirectSE.component.js.map