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
    .mySlides {
      display: none;
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
      <div *ngFor="let item of responseFile;  first as isFirst">
        <div *ngIf="item?.headerData.image" class="mySlides">
          <ng-container *ngIf="item?.headerData.type === '.pdf'; else imgBlock">
            <iframe
              [src]="photoURL(item?.headerData.image)"
              type="application/pdf"
              style="width:100%; height:500px;"
            ></iframe>
          </ng-container>
          <ng-template #imgBlock>
            <img
              [src]="photoURL(item?.headerData.image)"
              style="width:100%"
            />
          </ng-template>
        </div>
      </div>
      <a class="prev" (click)="plusSlides(-1)">&#10094;</a>
      <a class="next" (click)="plusSlides(1)">&#10095;</a>
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
  constructor(
    private customFilesServ: CustomFilesService,
    public domSanitizer: DomSanitizer
    ) {
    super();
  }
 
  ngOnInit() {
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
    
    this.showSlides(this.slideIndex);
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
    responseFile["headerData"] = [];
    responseFile["headerData"] = imageData;
    this.responseFile.push(responseFile);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }
  
  slideIndex: number = 1;

  showSlides(n: number) {
    let i: number;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    if (slides) {
      if (n > slides.length) {this.slideIndex = 1}
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display =  'none';
      }
      let currentSlide = this.slideIndex - 1;
      console.log(currentSlide, this.slideIndex, slides);
      slides[currentSlide].style.display = 'block';
    }
  }
}
