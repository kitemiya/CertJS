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
        _this.slideIndex = 1;
        return _this;
    }
    BinaryPreviewTabComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.showSlides(this.slideIndex);
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
        responseFile["headerData"] = [];
        responseFile["headerData"] = imageData;
        this.responseFile.push(responseFile);
    };
    BinaryPreviewTabComponent.prototype.plusSlides = function (n) {
        this.showSlides(this.slideIndex += n);
    };
    BinaryPreviewTabComponent.prototype.showSlides = function (n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (slides) {
            if (n > slides.length) {
                this.slideIndex = 1;
            }
            if (n < 1) {
                this.slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            var currentSlide = this.slideIndex - 1;
            console.log(currentSlide, this.slideIndex, slides);
            slides[currentSlide].style.display = 'block';
        }
    };
    BinaryPreviewTabComponent = tslib_1.__decorate([
        Component({
            selector: "binary-preview-tab",
            template: "\n    <style>\n    * {\n      box-sizing: border-box;\n    }\n    .container {\n      position: relative;\n    }\n    .mySlides {\n      display: none;\n    }\n    .prev,\n    .next {\n      cursor: pointer;\n      position: absolute;\n      top: 40%;\n      width: auto;\n      padding: 16px;\n      margin-top: -50px;\n      color: black;\n      font-weight: bold;\n      font-size: 20px;\n      border-radius: 0 3px 3px 0;\n      user-select: none;\n      -webkit-user-select: none;\n    }\n    .next {\n      right: 0;\n      border-radius: 3px 0 0 3px;\n    }\n    .prev:hover,\n    .next:hover {\n      background-color: rgba(0, 0, 0, 0.8);\n    }\n    </style>\n\n    <div class=\"container preview\">\n      <div *ngFor=\"let item of responseFile;  first as isFirst\">\n        <div *ngIf=\"item?.headerData.image\" class=\"mySlides\">\n          <ng-container *ngIf=\"item?.headerData.type === '.pdf'; else imgBlock\">\n            <iframe\n              [src]=\"photoURL(item?.headerData.image)\"\n              type=\"application/pdf\"\n              style=\"width:100%; height:500px;\"\n            ></iframe>\n          </ng-container>\n          <ng-template #imgBlock>\n            <img\n              [src]=\"photoURL(item?.headerData.image)\"\n              style=\"width:100%\"\n            />\n          </ng-template>\n        </div>\n      </div>\n      <a class=\"prev\" (click)=\"plusSlides(-1)\">&#10094;</a>\n      <a class=\"next\" (click)=\"plusSlides(1)\">&#10095;</a>\n    </div>\n  ",
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