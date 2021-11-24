import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BaseCustomTabs } from "./base-custom-tabs.component";
import { CustomFilesService } from '../services/custom-files.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterPipe } from '../pipes/filter.pipe';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { HttpErrorHandlerService } from "../services/http-error-handler.service";
var BinaryPreviewTabComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BinaryPreviewTabComponent, _super);
    function BinaryPreviewTabComponent(customFilesServ, domSanitizer) {
        var _this = _super.call(this) || this;
        _this.customFilesServ = customFilesServ;
        _this.domSanitizer = domSanitizer;
        _this.responseFile = [];
        return _this;
    }
    BinaryPreviewTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.slideIndex = 0;
        var urlFilesName;
        if (this.inputData) {
            urlFilesName =
                this.baseUrl +
                    "catalogs/" +
                    this.inputData.containerId +
                    "/items/" +
                    this.inputData.selectedEntryIds[0];
        }
        this.customFilesServ.getFileItems(urlFilesName)
            .subscribe(function (data) {
            if (data.entryInfoList) {
                _this.filesNamedata = data.entryInfoList[0].entryData[5332];
                _this.filesNamedata.forEach(function (fileName) {
                    _this.getDisplayImage(fileName);
                });
            }
        });
    };
    BinaryPreviewTabComponent.prototype.photoURL = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    BinaryPreviewTabComponent.prototype.getDisplayImage = function (dataName) {
        var imageData = [];
        var responseFile = {};
        var format = "";
        this.fileUrl =
            this.baseUrl +
                "/files/data?fileName=" +
                dataName;
        this.customFilesServ.getImage(this.fileUrl)
            .subscribe(function (responseFile) {
            imageData['type'] = "" + dataName.match('\.[0-9a-z]{1,5}$');
            if (imageData['type'] == '.pdf') {
                format = "data:application/pdf;base64, ";
            }
            else {
                format = "data:image/jpeg;base64, ";
            }
            imageData['image'] = format + responseFile['base64EncodedBytes'];
        }, function (error) {
            console.error("Error:: " + error);
        });
        responseFile["imageData"] = [];
        responseFile["imageData"] = imageData;
        this.responseFile.push(responseFile);
    };
    BinaryPreviewTabComponent.prototype.showSlide = function (slides, n) {
        this.slideIndex = n;
        if (n >= slides.length) {
            this.slideIndex = 0;
        }
        if (n < 0) {
            this.slideIndex = slides.length - 1;
        }
        var slide = slides[this.slideIndex].imageData.image;
        return slide;
    };
    BinaryPreviewTabComponent.prototype.getPrev = function (slides, i) {
        i = i - 1;
        this.showSlide(slides, i);
    };
    BinaryPreviewTabComponent.prototype.getNext = function (slides, i) {
        i = i + 1;
        this.showSlide(slides, i);
    };
    BinaryPreviewTabComponent = tslib_1.__decorate([
        Component({
            selector: "binary-preview-tab",
            template: "\n    <style>\n    * {\n      box-sizing: border-box;\n    }\n    .container {\n      position: relative;\n    }\n    .prev,\n    .next {\n      cursor: pointer;\n      position: absolute;\n      top: 40%;\n      width: auto;\n      padding: 16px;\n      margin-top: -50px;\n      color: black;\n      font-weight: bold;\n      font-size: 20px;\n      border-radius: 0 3px 3px 0;\n      user-select: none;\n      -webkit-user-select: none;\n    }\n    .next {\n      right: 0;\n      border-radius: 3px 0 0 3px;\n    }\n    .prev:hover,\n    .next:hover {\n      background-color: rgba(0, 0, 0, 0.8);\n    }\n    </style>\n\n    <div class=\"container preview\">\n      <div *ngIf=\"responseFile[slideIndex]\" id=\"carouselExampleControls\" class=\"carousel slide\" data-ride=\"carousel\">\n        <div class=\"carousel-inner\" role=\"listbox\">\n          <ng-container *ngIf=\"responseFile[slideIndex].imageData.type === '.pdf'; else imgBlock\">\n            <iframe\n              [src]=\"photoURL(showSlide(responseFile, slideIndex))\"  \n              type=\"application/pdf\"\n              style=\"width:100%; height:500px; padding-top: 10px;\"\n            ></iframe>\n          </ng-container>\n          <ng-template #imgBlock>\n            <img\n              [src]=\"photoURL(showSlide(responseFile, slideIndex))\"\n              style=\"width:100%; padding-top: 10px;\"\n              />\n          </ng-template>\n        </div>\n        <ng-container *ngIf=\"responseFile.length > 1\">\n          <a class=\"prev\" (click)=\"photoURL(getPrev(responseFile, slideIndex))\">&#10094;</a>\n          <a class=\"next\" (click)=\"photoURL(getNext(responseFile, slideIndex))\">&#10095;</a>\n        </ng-container>\n      </div>\n      <img *ngIf=\"!responseFile[slideIndex]\" src=\"assets/images/default-image.png\" />\n    </div>\n  ",
            providers: [
                CustomFilesService,
                HttpErrorHandlerService,
                KeyValuePipe,
                FilterPipe,
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [CustomFilesService,
            DomSanitizer])
    ], BinaryPreviewTabComponent);
    return BinaryPreviewTabComponent;
}(BaseCustomTabs));
export { BinaryPreviewTabComponent };
//# sourceMappingURL=binary-preview-tab.component.js.map