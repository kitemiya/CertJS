import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
import { GroupKeyValuePipe } from '../pipes/grouping-key-value.pipe';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { AuthService } from '../services/auth.service';
import { CustomRelatedItemsService } from '../services/custom-related-items.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { BaseCustomTabs } from './base-custom-tabs.component';
var SampleTab2Component = /** @class */ (function (_super) {
    tslib_1.__extends(SampleTab2Component, _super);
    function SampleTab2Component(customrelItemServ, groupkeyValue, authService, httpErrHandler) {
        var _this = _super.call(this) || this;
        _this.customrelItemServ = customrelItemServ;
        _this.groupkeyValue = groupkeyValue;
        _this.authService = authService;
        _this.httpErrHandler = httpErrHandler;
        _this.groupingData = [];
        _this.groupingDataResponse = [];
        _this.attributeTableData = [];
        _this.groupDataMap = new Map();
        _this.commentInput = "";
        _this.showLoader = true;
        _this.lblDateFormat = "";
        _this.isGroupData = true;
        return _this;
    }
    SampleTab2Component.prototype.ngOnInit = function () {
        var sessionData = JSON.parse(sessionStorage.getItem("userSettings"));
        if (sessionData) {
            this.lblDateFormat = sessionData.DATETIMEOUTPUTFORMAT.split(" ")[0].toUpperCase();
        }
        this.getItemGroupingData();
    };
    SampleTab2Component.prototype.getItemGroupingData = function () {
        var _this = this;
        this.groupDataMap.clear();
        this.attributeTableData = [];
        var paramObj = {
            catalogName: "",
            primaryKey: "",
        };
        if (this.inputData) {
            var url = this.baseUrl +
                "custom/catalogs/items?" +
                "catalogName=" +
                paramObj.catalogName +
                "&itemPrimaryKey=" +
                paramObj.primaryKey +
                "&catalogId=" +
                this.inputData.containerId +
                "&itemId=" +
                this.inputData.selectedEntryIds[0];
            this.customrelItemServ.getItemDetails(url).subscribe(function (data) {
                _this.groupingDataResponse = data.itemData;
                if (data.itemData) {
                    _this.showLoader = false;
                }
                else {
                    _this.showLoader = false;
                }
                _this.groupingData = _this.groupkeyValue.transform(_this.groupingDataResponse, []);
                _this.groupingData.forEach(function (item) {
                    var valobj = {};
                    var keyArr = item.key.split("#");
                    var nodedata = keyArr[1].split("-");
                    valobj[nodedata[1]] = item.value;
                    if (_this.groupDataMap.has(nodedata[0])) {
                        var getColArr = _this.groupDataMap.get(nodedata[0]);
                        getColArr[nodedata[1]] = item.value;
                        _this.groupDataMap[nodedata[0]] = getColArr;
                    }
                    else {
                        _this.groupDataMap.set(nodedata[0], valobj);
                    }
                });
                for (var i = _this.groupDataMap.size - 1; i >= 0; i--) {
                    _this.attributeTableData.push(_this.groupDataMap[i]);
                }
                if (_this.attributeTableData.length > 0) {
                    _this.isGroupData = true;
                }
                else {
                    _this.isGroupData = false;
                }
            }, function (error) {
                _this.showLoader = false;
                console.error("Error:: " + error);
            });
        }
    };
    SampleTab2Component.prototype.updateComment = function () {
        var _this = this;
        var updatereqObj = this.getGroupingUpdateInput(this.groupingDataResponse);
        for (var key in updatereqObj) {
            if (key) {
                if (key.includes("Modified Date")) {
                    updatereqObj[key] = moment().format();
                }
                if (key.includes("Comments")) {
                    updatereqObj[key] = this.commentInput;
                }
                if (key.includes("User")) {
                    updatereqObj[key] = this.authService.loginUserName;
                }
            }
        }
        var url = this.baseUrl +
            "custom/catalogs/items?" +
            "catalogName=" +
            "&itemPrimaryKey=" +
            "&catalogId=" +
            this.inputData.containerId +
            "&itemId=" +
            this.inputData.selectedEntryIds[0];
        this.customrelItemServ.addGroupNode(url, updatereqObj).subscribe(function (data) {
            _this.getItemGroupingData();
            _this.commentInput = "";
        }, function (error) {
            console.error("Error:: " + error);
        });
    };
    SampleTab2Component.prototype.getGroupingUpdateInput = function (groupingData) {
        var obj = {};
        for (var key in groupingData) {
            if (key.indexOf("#") !== -1) {
                var keysArr = key.split("#");
                if (keysArr[1] && keysArr[1].indexOf("/") !== -1) {
                    var specDataArray = keysArr[1].split("/");
                    if (Number(specDataArray[0]) == 0) {
                        var tempkey = key.replace("0", String(this.groupDataMap.size));
                        obj[tempkey] = "";
                    }
                }
            }
        }
        return obj;
    };
    SampleTab2Component = tslib_1.__decorate([
        Component({
            selector: "sample-tab2",
            template: "\n    <style>\n      .attr-table {\n        margin: 25px;\n        font-size: 12px !important;\n      }\n      table {\n        margin-top: 15px;\n        width: 100%;\n        height: 100px;\n        overflow-y: auto;\n      }\n\n      th {\n        background-color: #ff944d;\n        color: darkslategray;\n        font-weight: bold;\n      }\n\n      tr:nth-child(even) {\n        background-color: #f0f5f5;\n      }\n      .noGroupData {\n        margin: 20px;\n      }\n    </style>\n    <div *ngIf=\"showLoader\">\n      <div id=\"dotCircle\"><span></span></div>\n      <div class=\"overlayWrapper\"></div>\n    </div>\n    <div class=\"noGroupData \" *ngIf=\"!isGroupData\">\n      <h2 style=\" margin-bottom: 10px;\">\n        No Approval Details found\n      </h2>\n    </div>\n\n    <div *ngIf=\"!showLoader && isGroupData\" class=\"attr-table\">\n      <div class=\"inputComment\">\n        <input\n          type=\"text\"\n          [(ngModel)]=\"commentInput\"\n          placeholder=\"enter approval comment\"\n        />\n\n        <button\n          class=\"btn btn-primary\"\n          [disabled]=\"commentInput === ''\"\n          type=\"submit\"\n          (click)=\"updateComment()\"\n          title=\"Submit\"\n        >\n          Submit\n        </button>\n      </div>\n      <table\n        class=\"table table-bordered scrollable\"\n        [style.border]=\"'1px solid #bbb'\"\n        [style.align]=\"'center'\"\n      >\n        <thead>\n          <tr>\n            <th *ngFor=\"let data of attributeTableData[0] | keyvalue\">\n              {{ data.key }}\n            </th>\n          </tr>\n        </thead>\n\n        <tbody>\n          <tr *ngFor=\"let data of attributeTableData\">\n            <td *ngFor=\"let key of data | keyvalue\">{{ key.value }}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  ",
            providers: [
                HttpErrorHandlerService,
                CustomRelatedItemsService,
                KeyValuePipe,
                AuthService,
                GroupKeyValuePipe,
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [CustomRelatedItemsService,
            GroupKeyValuePipe,
            AuthService,
            HttpErrorHandlerService])
    ], SampleTab2Component);
    return SampleTab2Component;
}(BaseCustomTabs));
export { SampleTab2Component };
//# sourceMappingURL=sample-tab2.component.js.map