import { Component, OnInit } from "@angular/core";
import { BaseCustomTabs } from "./base-custom-tabs.component";
import { CustomFilesService } from '../services/custom-files.service';
import {  DomSanitizer } from '@angular/platform-browser';

import { FilterPipe } from '../pipes/filter.pipe';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { HttpErrorHandlerService } from "../services/http-error-handler.service";

@Component({
  selector: "binary-preview-tab",
  template: `
    <style>
    * {
      box-sizing: border-box;
    }
    .container {
      position: relative;
    }
    .prev,
    .next {
      cursor: pointer;
      position: absolute;
      top: 40%;
      width: auto;
      padding: 16px;
      margin-top: -50px;
      color: black;
      font-weight: bold;
      font-size: 20px;
      border-radius: 0 3px 3px 0;
      user-select: none;
      -webkit-user-select: none;
    }
    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }
    .prev:hover,
    .next:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    </style>

    <div class="container preview">
      <div *ngIf="responseFile[slideIndex]" id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner" role="listbox">
          <ng-container *ngIf="responseFile[slideIndex].imageData.type === '.pdf'; else imgBlock">
            <iframe
              [src]="photoURL(showSlide(responseFile, slideIndex))"  
              type="application/pdf"
              style="width:100%; height:500px; padding-top: 10px;"
            ></iframe>
          </ng-container>
          <ng-template #imgBlock>
            <img
              [src]="photoURL(showSlide(responseFile, slideIndex))"
              style="width:100%; padding-top: 10px;"
              />
          </ng-template>
        </div>
        <ng-container *ngIf="responseFile.length > 1">
          <a class="prev" (click)="photoURL(getPrev(responseFile, slideIndex))">&#10094;</a>
          <a class="next" (click)="photoURL(getNext(responseFile, slideIndex))">&#10095;</a>
        </ng-container>
      </div>
      <img *ngIf="!responseFile[slideIndex]" src="assets/images/default-image.png" />
    </div>
  `,
  providers: [
    CustomFilesService,
    HttpErrorHandlerService,
    KeyValuePipe,
    FilterPipe,
  ],
})
export class BinaryPreviewTabComponent extends BaseCustomTabs implements OnInit {
  data: any;
  filesNamedata: any;
  responseFile: any[] = [];
  fileUrl: string;
  slideIndex: number;
  constructor(
    private customFilesServ: CustomFilesService,
    public domSanitizer: DomSanitizer
    ) {
    super();
  }
 
  ngOnInit() {
    this.slideIndex = 0;
    let urlFilesName;
    if (this.inputData) {
      urlFilesName =
      this.baseUrl + 
      "catalogs/" + 
      this.inputData.containerId + 
      "/items/" +
      this.inputData.selectedEntryIds[0];
    }

    this.customFilesServ.getFileItems(urlFilesName)
    .subscribe(
      (data) => {
        if (data.entryInfoList) {
          this.filesNamedata = data.entryInfoList[0].entryData[5332];
          this.filesNamedata.forEach((fileName) => {
            this.getDisplayImage(fileName);
          });
        }
    })
  }

  photoURL(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  getDisplayImage(dataName) {
    let imageData = [];
    let responseFile = {};
    let format = "";
    this.fileUrl =
      this.baseUrl + 
      "/files/data?fileName=" + 
      dataName;
    
    this.customFilesServ.getImage(this.fileUrl)
    .subscribe((responseFile) => {
        imageData['type'] = "" + dataName.match('\.[0-9a-z]{1,5}$');
        if (imageData['type'] == '.pdf') {
          format = "data:application/pdf;base64, ";
        } else {
          format = "data:image/jpeg;base64, ";
        }
        imageData['image'] = format + responseFile['base64EncodedBytes'];
      },
      (error) => {
        console.error("Error:: " + error);
      }
    );
    responseFile["imageData"] = [];
    responseFile["imageData"] = imageData;
    this.responseFile.push(responseFile);
  }

  showSlide(slides, n) {
    this.slideIndex = n;
    if (n >= slides.length) { this.slideIndex = 0 }
    if (n < 0) {this.slideIndex = slides.length -1}
    let slide = slides[this.slideIndex].imageData.image;
    return slide;
  }

  getPrev(slides, i) {
    i = i - 1;
    this.showSlide(slides, i)
  }

  getNext(slides, i) {
    i = i + 1;
    this.showSlide(slides, i)
  }

}
