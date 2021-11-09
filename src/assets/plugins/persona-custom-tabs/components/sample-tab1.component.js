import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterPipe } from '../pipes/filter.pipe';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { CustomRelatedItemsService } from '../services/custom-related-items.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { BaseCustomTabs } from './base-custom-tabs.component';
var SampleTab1Component = /** @class */ (function (_super) {
    tslib_1.__extends(SampleTab1Component, _super);
    function SampleTab1Component(customrelItemServ, keyvaluePipe, domSanitizer) {
        var _this = _super.call(this) || this;
        _this.customrelItemServ = customrelItemServ;
        _this.keyvaluePipe = keyvaluePipe;
        _this.domSanitizer = domSanitizer;
        _this.relShipData = [];
        _this.cols = [];
        _this.relatedItemData = [];
        _this.headerData = [];
        _this.showLoader = true;
        _this.isRelShipData = true;
        _this.searchString = [];
        _this.imgSrc = "assets/images/default-image.png";
        return _this;
    }
    SampleTab1Component.prototype.ngOnInit = function () {
        var _this = this;
        var relatedEndpoint;
        if (this.inputData) {
            relatedEndpoint =
                this.baseUrl +
                    "catalogs/" +
                    this.inputData.containerId +
                    "/" +
                    "items/systemTabs?type=relatedItems&itemIds=" +
                    this.inputData.selectedEntryIds[0];
        }
        this.customrelItemServ.getRelatedItems(relatedEndpoint).subscribe(function (data) {
            if (data.entryInfoList) {
                _this.relatedItemData =
                    data.entryInfoList[0].relationAttributeInfoList;
                _this.relatedItemData.forEach(function (relData) {
                    _this.getRelItemDetails(relData);
                    _this.showLoader = false;
                    _this.isRelShipData = true;
                });
            }
            else {
                _this.showLoader = false;
                _this.isRelShipData = false;
            }
        }, function (error) {
            _this.showLoader = false;
            console.error("Error:: " + error);
        });
    };
    SampleTab1Component.prototype.getRelItemDetails = function (relatedItem) {
        var _this = this;
        var paramObj = {
            catalogName: relatedItem.catalogName,
            primaryKey: relatedItem.primaryKey,
        };
        var url = this.baseUrl +
            "custom/catalogs/items?" +
            "catalogName=" +
            paramObj.catalogName +
            "&itemPrimaryKey=" +
            paramObj.primaryKey +
            "&catalogId=" +
            "&itemId=" +
            relatedItem.id;
        this.customrelItemServ.getItemDetails(url).subscribe(function (data) {
            if (data.itemData) {
                _this.getHeaderData(data, relatedItem);
                _this.showLoader = false;
            }
            else {
                _this.showLoader = false;
            }
        }, function (error) {
            _this.showLoader = false;
            console.error("Error:: " + error);
        });
    };
    SampleTab1Component.prototype.getHeaderData = function (data, relItem) {
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
            this.customrelItemServ.getdisplayThumbnail(thumbnail_url).subscribe(function (data) {
                itemHeaderData.image =
                    "data:image/jpeg;base64, " + data.base64EncodedBytes;
            }, function (err) {
                console.log("Error:- ", err);
            });
        }
        var imageDesc = value.find(function (element) {
            return element.key === "DisplayImageDescription";
        });
        if (imageDesc && imageDesc.value) {
            itemHeaderData.imageDescription = imageDesc.value;
        }
        itemHeaderData.id = relItem.primaryKey;
        data["headerData"] = {};
        data["headerData"] = itemHeaderData;
        this.relShipData.push(data);
    };
    SampleTab1Component.prototype.getImage = function (filename, data) {
        var image = "";
        var thumbnail_url = this.baseUrl + "files/data/?fileName=" + filename;
        this.customrelItemServ.getdisplayThumbnail(thumbnail_url).subscribe(function (data) {
            image = "data:image/jpeg;base64, " + data.base64EncodedBytes;
        }, function (error) {
            console.error("Error:: " + error);
        });
        return image;
    };
    SampleTab1Component.prototype.collapseClick = function (event, index) {
        var element = event.target;
        element.classList.toggle("active");
        var panel = element.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    };
    SampleTab1Component = tslib_1.__decorate([
        Component({
            selector: "sample-tab1",
            template: "\n    <style>\n      .itemDetails {\n        padding-left: 15px;\n        padding-bottom: 10px;\n        padding-top: 10px;\n      }\n      .attr-table {\n        margin: 25px;\n      }\n      .attr-details {\n        font-size: 12px !important;\n      }\n      table {\n        width: 100%;\n        height: 100px;\n        overflow-y: auto;\n      }\n      table.scrollable tbody {\n        height: 100px;\n        overflow-y: auto;\n        overflow-x: hidden;\n      }\n      th {\n        background-color: #ff944d;\n        color: darkslategray;\n        font-weight: bold;\n        width: 450px !important;\n      }\n      tr:nth-child(even) {\n        background-color: #f0f5f5;\n      }\n      .product-image {\n        background-color: white;\n        border-width: 2px;\n        border-style: solid;\n        border-color: #ddd;\n        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);\n        display: block;\n        float: left;\n        width: 4.6875em;\n        height: 4.6875em;\n        margin-right: 0.5em;\n        position: relative;\n        padding: 0;\n      }\n      .product-image img {\n        width: 100%;\n        height: 100%;\n        padding: 4%;\n      }\n      .noRelData {\n        margin: 20px;\n      }\n      .accordion {\n        background-color: #ffcc66;\n        border: solid 1px #b3b3b3;\n        color: #003366;\n        cursor: pointer;\n        text-align: center;\n        padding: 4px;\n        width: 100%;\n        text-align: left;\n        outline: none;\n        font-size: 13px;\n        transition: 0.4s;\n      }\n\n      .active,\n      .accordion:hover {\n        background-color: #ccc;\n      }\n\n      .accordion:after {\n        font-family: FontAwesome;\n        float: right;\n        content: \"\\f107\";\n        display: inline-block;\n        padding-right: 6px;\n        text-align: center;\n        font-size: larger;\n        font-weight: bold;\n      }\n\n      .active:after {\n        font-family: FontAwesome;\n        content: \"\\f106\";\n        font-size: larger;\n        font-weight: bold;\n      }\n\n      .panel {\n        padding: 0 18px;\n        background-color: white;\n        max-height: 0;\n        overflow: hidden;\n        transition: max-height 0.2s ease-out;\n        box-shadow: none;\n      }\n      .searchAttr {\n        width: 215px;\n      }\n      .search-icon {\n        float: right;\n        margin-right: -25px;\n        margin-top: -18px;\n        position: relative;\n      }\n    </style>\n    <div *ngIf=\"showLoader\">\n      <div id=\"dotCircle\"><span></span></div>\n      <div class=\"overlayWrapper\"></div>\n    </div>\n    <div class=\"noRelData \" *ngIf=\"!isRelShipData\">\n      <h2 style=\" margin-bottom: 10px;\">\n        No Related Items found\n      </h2>\n    </div>\n\n    <div *ngIf=\"isRelShipData && !showLoader\" class=\"attr-table\">\n      <div style=\"font-size:14px; font-weight:bold ;margin-bottom: 10px;\">\n        Items Related to this Product\n      </div>\n      <div class=\"attr-details\" *ngFor=\"let item of relShipData; let i = index\">\n        <div class=\"accordion\" (click)=\"collapseClick($event, i)\">\n          Related Item : <b>{{ item?.headerData.id }}</b>\n        </div>\n        <div id=\"panel\" class=\"panel\">\n          <div class=\"row itemDetails\">\n            <div class=\"product-image  col-md-1\" style=\"  display: inline; \">\n              <img\n                *ngIf=\"item?.headerData.image\"\n                [src]=\"\n                  domSanitizer.bypassSecurityTrustUrl(item?.headerData.image)\n                \"\n                alt=\" Default Image\"\n              />\n              <img *ngIf=\"!item?.headerData.image\" [src]=\"imgSrc\" />\n            </div>\n            <div class=\"product_desc col-md-9\" style=\"  display: inline; \">\n              <div class=\"prod-details\">\n                <h2 class=\"text-ellipsis-single-line\">\n                  <b>{{ item?.headerData.id }}</b>\n                </h2>\n                <p>\n                  {{ item?.headerData.imageDescription }}\n                </p>\n              </div>\n            </div>\n            <div class=\"col-md-2 search-attribute\">\n              <input\n                type=\"text\"\n                class=\"searchAttr\"\n                name=\"searchString\"\n                placeholder=\"Type to search...\"\n                [(ngModel)]=\"searchString[i]\"\n              />\n              <span class=\"fa fa-search search-icon\"></span>\n            </div>\n            <!-- Product Details -->\n          </div>\n          <div class=\" row \">\n            <div class=\"col-md-12\">\n              <table\n                class=\"table table-bordered scrollable\"\n                [style.border]=\"'1px solid #bbb'\"\n                [style.align]=\"'center'\"\n              >\n                <thead>\n                  <tr>\n                    <th>\n                      Attribute Name\n                    </th>\n                    <th>Value</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr\n                    *ngFor=\"\n                      let data of item.itemData\n                        | keyvalue\n                        | filter: 'data.key':searchString[i]\n                    \"\n                  >\n                    <td>{{ data.key }}</td>\n                    <td>{{ data.value }}</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            providers: [
                CustomRelatedItemsService,
                HttpErrorHandlerService,
                KeyValuePipe,
                FilterPipe,
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [CustomRelatedItemsService,
            KeyValuePipe,
            DomSanitizer])
    ], SampleTab1Component);
    return SampleTab1Component;
}(BaseCustomTabs));
export { SampleTab1Component };
//# sourceMappingURL=sample-tab1.component.js.map