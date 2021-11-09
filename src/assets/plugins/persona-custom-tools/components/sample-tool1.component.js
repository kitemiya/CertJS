import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePipe } from "../pipes/key-value.pipe";
import { CatalogListService } from "../services/catalog-list.service";
import { CustomRelatedItemsService } from "../services/custom-related-items.service";
import { HttpErrorHandlerService } from "../services/http-error-handler.service";
import { BaseCustomTools } from "./base-custom-tools.component";
var SampleTool1Component = /** @class */ (function (_super) {
    tslib_1.__extends(SampleTool1Component, _super);
    function SampleTool1Component(catListService, customitemsService, keyvaluePipe, domSanitizer) {
        var _this = _super.call(this) || this;
        _this.catListService = catListService;
        _this.customitemsService = customitemsService;
        _this.keyvaluePipe = keyvaluePipe;
        _this.domSanitizer = domSanitizer;
        _this.endpoint = "";
        _this.pKeyInput = "";
        _this.selectedCatalog = "";
        _this.imgSrc = "assets/images/default-image.png";
        _this.itemDetails = {};
        _this.isItemDetails = false;
        _this.showLoader = true;
        _this.noItemFound = true;
        _this.isCatalogList = false;
        _this.searchString = "";
        return _this;
    }
    SampleTool1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.endpoint = this.baseUrl + "catalogs";
        this.catListService.getCatalogs(this.endpoint).subscribe(function (data) {
            if (data) {
                _this.catalogList = data;
                console.log(data);
                _this.isCatalogList = true;
                _this.showLoader = false;
            }
            else {
                _this.isCatalogList = false;
                _this.showLoader = false;
            }
        }, function (error) {
            _this.showLoader = false;
        });
    };
    SampleTool1Component.prototype.searchItem = function (pKValue) {
        var _this = this;
        this.showLoader = true;
        this.pKeyInput = pKValue;
        var url = this.baseUrl +
            "custom/catalogs/items?" +
            "catalogName=" +
            this.selectedCatalog +
            "&itemPrimaryKey=" +
            this.pKeyInput +
            "&catalogId=" +
            "&itemId=";
        this.customitemsService.getItemDetails(url).subscribe(function (data) {
            //  this.relShipData.push(data.itemData);
            if (data.itemData) {
                _this.showLoader = false;
                _this.isItemDetails = true;
                _this.noItemFound = true;
                _this.getHeaderData(data);
            }
            else {
                _this.showLoader = false;
                _this.noItemFound = false;
                _this.isItemDetails = false;
            }
        }, function (error) {
            _this.showLoader = false;
            _this.isItemDetails = false;
        });
    };
    SampleTool1Component.prototype.getHeaderData = function (data) {
        var itemHeaderData = {
            id: "",
            image: "",
            imageDescription: "",
        };
        var value = this.keyvaluePipe.transform(data.itemData, []);
        itemHeaderData = {};
        var imageObj = value.find(function (element) {
            return element.key === "DisplayImage";
        });
        if (imageObj && imageObj.value) {
            var thumbnail_url = this.baseUrl + "files/data/?fileName=" + imageObj.value;
            this.customitemsService.getdisplayThumbnail(thumbnail_url).subscribe(function (data) {
                itemHeaderData.image =
                    "data:image/jpeg;base64, " + data.base64EncodedBytes;
            }, function (err) {
                //console.log("Error:- ", err);
            });
        }
        var imageDesc = value.find(function (element) {
            return element.key === "DisplayImageDescription";
        });
        if (imageDesc && imageDesc.value) {
            itemHeaderData.imageDescription = imageDesc.value;
        }
        if (this.isItemDetails) {
            itemHeaderData.id = this.pKeyInput;
            data["headerData"] = {};
            data["headerData"] = itemHeaderData;
            this.itemDetails = data;
        }
    };
    SampleTool1Component.prototype.selected = function (event) {
        this.selectedCatalog = event.target.value;
    };
    SampleTool1Component = tslib_1.__decorate([
        Component({
            selector: "custom-tool1",
            template: "\n    <style>\n      .searchItem-wrapper {\n        font-size: 13px;\n      }\n      td {\n      }\n\n      .searchPK {\n        top: 12px;\n      }\n      .item-Details {\n        padding-left: 15px;\n        padding-bottom: 10px;\n        padding-top: 10px;\n      }\n      .attr-table {\n        width: 100%;\n      }\n\n      .searchPK-table {\n        width: 50%;\n      }\n      .attr-details {\n        font-size: 12px !important;\n      }\n\n      th {\n        background-color: #ff944d;\n        color: darkslategray;\n        font-weight: bold;\n        width: 450px !important;\n      }\n      tr:nth-child(even) {\n        background-color: #f0f5f5;\n      }\n      .product-image {\n        background-color: white;\n        border-width: 2px;\n        border-style: solid;\n        border-color: #ddd;\n        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);\n        display: block;\n        float: left;\n        width: 4.6875em;\n        height: 4.6875em;\n        margin-right: 0.5em;\n        position: relative;\n        padding: 0;\n      }\n      .product-image img {\n        width: 100%;\n        height: 100%;\n        padding: 4%;\n      }\n\n      .searchAttr {\n        width: 280px;\n        margin-left: 53px;\n      }\n      .select-cat {\n        border-radius: 0px;\n        width: 80%;\n      }\n      .no-detail-div {\n        font-size: 20px;\n        margin: 100px;\n        text-align: center;\n      }\n      .custom-search-icon {\n        font-size: 14px;\n        color: #161616;\n        padding: 8px;\n        background: #ddd;\n      }\n      .primary-key-input {\n        font-size: 14px;\n        color: #161616;\n      }\n    </style>\n\n    <div class=\"searchItem-wrapper\" style=\" margin:20px;\">\n      <div *ngIf=\"isCatalogList\" class=\"row\">\n        <div class=\" col-md-11\">\n          <table class=\"searchPK-table\">\n            <tbody>\n              <tr>\n                <td>\n                  <div class=\"form-group\">\n                    <select\n                      class=\"form-control select-cat\"\n                      id=\"sel1\"\n                      (change)=\"selected($event)\"\n                    >\n                      <option selected hidden>Select catalog</option>\n                      <option\n                        *ngFor=\"let catalog of catalogList\"\n                        [ngValue]=\"catalog.label\"\n                      >\n                        {{ catalog.label }}\n                      </option>\n                    </select>\n                  </div>\n                </td>\n                <td>\n                  <div class=\"input-group searchPK\">\n                    <input\n                      #pKeyInput\n                      type=\"text\"\n                      class=\"form-control primary-key-input\"\n                      placeholder=\"Enter primary key\"\n                      name=\"search\"\n                    />\n                    <div class=\"input-group-btn\">\n                      <button\n                        class=\"btn \"\n                        (click)=\"searchItem(pKeyInput.value)\"\n                        type=\"submit\"\n                      >\n                        <i class=\"far fa-search custom-search-icon\"></i>\n                      </button>\n                    </div>\n                  </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n      <hr />\n\n      <div class=\"no-detail-div\" *ngIf=\"!showLoader && !noItemFound\">\n        <p>Item not Found</p>\n      </div>\n\n      <div *ngIf=\"showLoader && !isItemDetails\">\n        <div id=\"dotCircle\"><span></span></div>\n        <div class=\"overlayWrapper\"></div>\n      </div>\n      <div *ngIf=\"isItemDetails\">\n        <div class=\"row item-Details\">\n          <div class=\"product-image   col-md-1\" style=\"  display: inline; \">\n            <img\n              *ngIf=\"itemDetails?.headerData?.image\"\n              [src]=\"\n                domSanitizer.bypassSecurityTrustUrl(\n                  itemDetails?.headerData?.image\n                )\n              \"\n              alt=\" Default Image\"\n            />\n            <img *ngIf=\"!itemDetails?.headerData?.image\" [src]=\"imgSrc\" />\n          </div>\n          <div class=\"product_desc col-md-8\" style=\"  display: inline; \">\n            <div class=\"prod-details\">\n              <h2 class=\"text-ellipsis-single-line\">\n                <b>{{ itemDetails?.headerData?.id }}</b>\n              </h2>\n              <p>\n                {{ itemDetails?.headerData?.imageDescription }}\n              </p>\n            </div>\n          </div>\n          <div class=\"col-md-3 search-attr\">\n            <input\n              type=\"text\"\n              class=\"searchAttr\"\n              name=\"searchString\"\n              [(ngModel)]=\"searchString\"\n              placeholder=\"Type to search...\"\n            />\n          </div>\n          <!-- Product Details -->\n        </div>\n        <div class=\"row attr-details \">\n          <div class=\" col-md-12\">\n            <table\n              class=\"table table-bordered scrollable attr-table\"\n              [style.border]=\"'1px solid #bbb'\"\n              [style.align]=\"'center'\"\n            >\n              <thead>\n                <tr>\n                  <th>Attribute Name</th>\n                  <th>Value</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr\n                  *ngFor=\"\n                    let data of itemDetails.itemData\n                      | keyvalue\n                      | filter: 'data.key':searchString\n                  \"\n                >\n                  <td>{{ data.key }}</td>\n                  <td>{{ data.value }}</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            providers: [
                KeyValuePipe,
                HttpErrorHandlerService,
                CatalogListService,
                CustomRelatedItemsService,
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [CatalogListService,
            CustomRelatedItemsService,
            KeyValuePipe,
            DomSanitizer])
    ], SampleTool1Component);
    return SampleTool1Component;
}(BaseCustomTools));
export { SampleTool1Component };
//# sourceMappingURL=sample-tool1.component.js.map