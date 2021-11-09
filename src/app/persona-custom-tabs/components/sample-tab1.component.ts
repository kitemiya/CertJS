import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FilterPipe } from '../pipes/filter.pipe';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { CustomRelatedItemsService } from '../services/custom-related-items.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { BaseCustomTabs } from './base-custom-tabs.component';

@Component({
  selector: "sample-tab1",
  template: `
    <style>
      .itemDetails {
        padding-left: 15px;
        padding-bottom: 10px;
        padding-top: 10px;
      }
      .attr-table {
        margin: 25px;
      }
      .attr-details {
        font-size: 12px !important;
      }
      table {
        width: 100%;
        height: 100px;
        overflow-y: auto;
      }
      table.scrollable tbody {
        height: 100px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      th {
        background-color: #ff944d;
        color: darkslategray;
        font-weight: bold;
        width: 450px !important;
      }
      tr:nth-child(even) {
        background-color: #f0f5f5;
      }
      .product-image {
        background-color: white;
        border-width: 2px;
        border-style: solid;
        border-color: #ddd;
        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.2);
        display: block;
        float: left;
        width: 4.6875em;
        height: 4.6875em;
        margin-right: 0.5em;
        position: relative;
        padding: 0;
      }
      .product-image img {
        width: 100%;
        height: 100%;
        padding: 4%;
      }
      .noRelData {
        margin: 20px;
      }
      .accordion {
        background-color: #ffcc66;
        border: solid 1px #b3b3b3;
        color: #003366;
        cursor: pointer;
        text-align: center;
        padding: 4px;
        width: 100%;
        text-align: left;
        outline: none;
        font-size: 13px;
        transition: 0.4s;
      }

      .active,
      .accordion:hover {
        background-color: #ccc;
      }

      .accordion:after {
        font-family: FontAwesome;
        float: right;
        content: "\\f107";
        display: inline-block;
        padding-right: 6px;
        text-align: center;
        font-size: larger;
        font-weight: bold;
      }

      .active:after {
        font-family: FontAwesome;
        content: "\\f106";
        font-size: larger;
        font-weight: bold;
      }

      .panel {
        padding: 0 18px;
        background-color: white;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        box-shadow: none;
      }
      .searchAttr {
        width: 215px;
      }
      .search-icon {
        float: right;
        margin-right: -25px;
        margin-top: -18px;
        position: relative;
      }
    </style>
    <div *ngIf="showLoader">
      <div id="dotCircle"><span></span></div>
      <div class="overlayWrapper"></div>
    </div>
    <div class="noRelData " *ngIf="!isRelShipData">
      <h2 style=" margin-bottom: 10px;">
        No Related Items found
      </h2>
    </div>

    <div *ngIf="isRelShipData && !showLoader" class="attr-table">
      <div style="font-size:14px; font-weight:bold ;margin-bottom: 10px;">
        Items Related to this Product
      </div>
      <div class="attr-details" *ngFor="let item of relShipData; let i = index">
        <div class="accordion" (click)="collapseClick($event, i)">
          Related Item : <b>{{ item?.headerData.id }}</b>
        </div>
        <div id="panel" class="panel">
          <div class="row itemDetails">
            <div class="product-image  col-md-1" style="  display: inline; ">
              <img
                *ngIf="item?.headerData.image"
                [src]="
                  domSanitizer.bypassSecurityTrustUrl(item?.headerData.image)
                "
                alt=" Default Image"
              />
              <img *ngIf="!item?.headerData.image" [src]="imgSrc" />
            </div>
            <div class="product_desc col-md-9" style="  display: inline; ">
              <div class="prod-details">
                <h2 class="text-ellipsis-single-line">
                  <b>{{ item?.headerData.id }}</b>
                </h2>
                <p>
                  {{ item?.headerData.imageDescription }}
                </p>
              </div>
            </div>
            <div class="col-md-2 search-attribute">
              <input
                type="text"
                class="searchAttr"
                name="searchString"
                placeholder="Type to search..."
                [(ngModel)]="searchString[i]"
              />
              <span class="fa fa-search search-icon"></span>
            </div>
            <!-- Product Details -->
          </div>
          <div class=" row ">
            <div class="col-md-12">
              <table
                class="table table-bordered scrollable"
                [style.border]="'1px solid #bbb'"
                [style.align]="'center'"
              >
                <thead>
                  <tr>
                    <th>
                      Attribute Name
                    </th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    *ngFor="
                      let data of item.itemData
                        | keyvalue
                        | filter: 'data.key':searchString[i]
                    "
                  >
                    <td>{{ data.key }}</td>
                    <td>{{ data.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [
    CustomRelatedItemsService,
    HttpErrorHandlerService,
    KeyValuePipe,
    FilterPipe,
  ],
})
export class SampleTab1Component extends BaseCustomTabs implements OnInit {
  relShipData: any[] = [];
  cols: any[] = [];
  relatedItemData: any[] = [];
  headerData: any[] = [];
  showLoader: boolean = true;
  isRelShipData: boolean = true;
  public searchString: string[] = [];
  public imgSrc = "assets/images/default-image.png";

  constructor(
    private customrelItemServ: CustomRelatedItemsService,
    private keyvaluePipe: KeyValuePipe,
    public domSanitizer: DomSanitizer
  ) {
    super();
  }
  ngOnInit() {
    let relatedEndpoint;
    if (this.inputData) {
      relatedEndpoint =
        this.baseUrl +
        "catalogs/" +
        this.inputData.containerId +
        "/" +
        "items/systemTabs?type=relatedItems&itemIds=" +
        this.inputData.selectedEntryIds[0];
    }

    this.customrelItemServ.getRelatedItems(relatedEndpoint).subscribe(
      (data) => {
        if (data.entryInfoList) {
          this.relatedItemData =
            data.entryInfoList[0].relationAttributeInfoList;
          this.relatedItemData.forEach((relData) => {
            this.getRelItemDetails(relData);
            this.showLoader = false;
            this.isRelShipData = true;
          });
        } else {
          this.showLoader = false;
          this.isRelShipData = false;
        }
      },
      (error) => {
        this.showLoader = false;
        console.error("Error:: " + error);
      }
    );
  }
  getRelItemDetails(relatedItem) {
    let paramObj = {
      catalogName: relatedItem.catalogName,
      primaryKey: relatedItem.primaryKey,
    };
    let url =
      this.baseUrl +
      "custom/catalogs/items?" +
      "catalogName=" +
      paramObj.catalogName +
      "&itemPrimaryKey=" +
      paramObj.primaryKey +
      "&catalogId=" +
      "&itemId=" +
      relatedItem.id;
    this.customrelItemServ.getItemDetails(url).subscribe(
      (data) => {
        if (data.itemData) {
          this.getHeaderData(data, relatedItem);
          this.showLoader = false;
        } else {
          this.showLoader = false;
        }
      },
      (error) => {
        this.showLoader = false;
        console.error("Error:: " + error);
      }
    );
  }
  getHeaderData(data, relItem) {
    let itemHeaderData: any = {
      id: "",
      image: "",
      imageDescription: "",
    };

    let value = this.keyvaluePipe.transform(data.itemData, []);
    itemHeaderData = {};
    let imageObj = value.find(function (element) {
      return element.key === "DisplayImage";
    });
    if (imageObj && imageObj.value) {
      let thumbnail_url =
        this.baseUrl + "files/data/?fileName=" + imageObj.value;
      this.customrelItemServ.getdisplayThumbnail(thumbnail_url).subscribe(
        (data) => {
          itemHeaderData.image =
            "data:image/jpeg;base64, " + data.base64EncodedBytes;
        },
        (err) => {
          console.log("Error:- ", err);
        }
      );
    }
    let imageDesc = value.find(function (element) {
      return element.key === "DisplayImageDescription";
    });
    if (imageDesc && imageDesc.value) {
      itemHeaderData.imageDescription = imageDesc.value;
    }
    itemHeaderData.id = relItem.primaryKey;
    data["headerData"] = {};
    data["headerData"] = itemHeaderData;
    this.relShipData.push(data);
  }
  getImage(filename, data) {
    let image = "";
    let thumbnail_url = this.baseUrl + "files/data/?fileName=" + filename;
    this.customrelItemServ.getdisplayThumbnail(thumbnail_url).subscribe(
      (data) => {
        image = "data:image/jpeg;base64, " + data.base64EncodedBytes;
      },
      (error) => {
        console.error("Error:: " + error);
      }
    );
    return image;
  }
  collapseClick(event, index) {
    var element = event.target;
    element.classList.toggle("active");

    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}
