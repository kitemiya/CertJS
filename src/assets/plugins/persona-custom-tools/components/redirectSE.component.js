import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BaseCustomTools } from "./base-custom-tools.component";
var RedirectSEComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RedirectSEComponent, _super);
    function RedirectSEComponent() {
        return _super.call(this) || this;
    }
    RedirectSEComponent.prototype.ngOnInit = function () { };
    RedirectSEComponent.prototype.redirectToSECatalog = function () {
        // need to add these details to open a specific item in catalog mode
        var singleEditCatalogData = {
            redirectionContainer: "singleEdit",
            type: "catalog",
            catalogId: 11410,
            itemIds: [71610],
        };
        this.goToSingleEditCatalog(singleEditCatalogData);
    };
    RedirectSEComponent.prototype.redirectToSECollab = function () {
        // need to add these details to open a specific item in collab mode
        var singleEditCollabData = {
            redirectionContainer: "singleEdit",
            type: "collab",
            collabType: "item",
            collabName: "",
            entryIds: [56641, 56642, 56645],
            collabId: 802,
            stepId: 807,
        };
        this.goToSingleEditCollab(singleEditCollabData);
    };
    RedirectSEComponent.prototype.redirectToMECollab = function () {
        // need these details to open multi-edit in collab
        var multiEditCollabData = {
            redirectionContainer: "multiEdit",
            type: "collab",
            collabName: "",
            collabType: "item",
            collabId: 802,
            stepId: 807,
        };
        this.goToMultiEditCollab(multiEditCollabData);
    };
    RedirectSEComponent.prototype.redirectToMECatalog = function () {
        // need these details to open multi-edit in catalog
        var multiEditCatalogData = {
            redirectionContainer: "multiEdit",
            type: "catalog",
            catalogId: 11410,
            itemIds: [71610, 71612],
            searchType: "catalogwithitems",
        };
        this.goToMultiEditCatalog(multiEditCatalogData);
    };
    RedirectSEComponent = tslib_1.__decorate([
        Component({
            selector: "redirect",
            template: "\n    <style>\n      .custom-tool.action-btn-wrapper {\n        display: inline-block;\n      }\n      .custom-tool.action-btn-wrapper .btn {\n        margin: 20px 10px !important;\n        height: 30px !important;\n      }\n    </style>\n    <div class=\"custom-tool action-btn-wrapper\">\n      <button class=\"btn btn-primary\" (click)=\"redirectToSECatalog()\">\n        Go to Single Edit\n      </button>\n\n      <button class=\"btn btn-primary\" (click)=\"redirectToSECollab()\">\n        Go to Single Edit Collab\n      </button>\n\n      <button class=\"btn btn-primary\" (click)=\"redirectToMECatalog()\">\n        Go to Multi Edit\n      </button>\n\n      <button class=\"btn btn-primary\" (click)=\"redirectToMECollab()\">\n        Go to Multi Edit Collab\n      </button>\n    </div>\n  ",
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RedirectSEComponent);
    return RedirectSEComponent;
}(BaseCustomTools));
export { RedirectSEComponent };
//# sourceMappingURL=redirectSE.component.js.map