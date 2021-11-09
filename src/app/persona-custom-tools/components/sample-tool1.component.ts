import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { KeyValuePipe } from "../pipes/key-value.pipe";
import { CatalogListService } from "../services/catalog-list.service";
import { CustomRelatedItemsService } from "../services/custom-related-items.service";
import { HttpErrorHandlerService } from "../services/http-error-handler.service";
import { BaseCustomTools } from "./base-custom-tools.component";

@Component({
  selector: "custom-tool1",
  template: `
    <style>
      .searchItem-wrapper {
        font-size: 13px;
      }
      td {
      }

      .searchPK {
        top: 12px;
      }
      .item-Details {
        padding-left: 15px;
        padding-bottom: 10px;
        padding-top: 10px;
      }
      .attr-table {
        width: 100%;
      }

      .searchPK-table {
        width: 50%;
      }
      .attr-details {
        font-size: 12px !important;
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

      .searchAttr {
        width: 280px;
        margin-left: 53px;
      }
      .select-cat {
        border-radius: 0px;
        width: 80%;
      }
      .no-detail-div {
        font-size: 20px;
        margin: 100px;
        text-align: center;
      }
      .custom-search-icon {
        font-size: 14px;
        color: #161616;
        padding: 8px;
        background: #ddd;
      }
      .primary-key-input {
        font-size: 14px;
        color: #161616;
      }
    </style>

    <div class="searchItem-wrapper" style=" margin:20px;">
      <div *ngIf="isCatalogList" class="row">
        <div class=" col-md-11">
          <table class="searchPK-table">
            <tbody>
              <tr>
                <td>
                  <div class="form-group">
                    <select
                      class="form-control select-cat"
                      id="sel1"
                      (change)="selected($event)"
                    >
                      <option selected hidden>Select catalog</option>
                      <option
                        *ngFor="let catalog of catalogList"
                        [ngValue]="catalog.label"
                      >
                        {{ catalog.label }}
                      </option>
                    </select>
                  </div>
                </td>
                <td>
                  <div class="input-group searchPK">
                    <input
                      #pKeyInput
                      type="text"
                      class="form-control primary-key-input"
                      placeholder="Enter primary key"
                      name="search"
                    />
                    <div class="input-group-btn">
                      <button
                        class="btn "
                        (click)="searchItem(pKeyInput.value)"
                        type="submit"
                      >
                        <i class="far fa-search custom-search-icon"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />

      <div class="no-detail-div" *ngIf="!showLoader && !noItemFound">
        <p>Item not Found</p>
      </div>

      <div *ngIf="showLoader && !isItemDetails">
        <div id="dotCircle"><span></span></div>
        <div class="overlayWrapper"></div>
      </div>
      <div *ngIf="isItemDetails">
        <div class="row item-Details">
          <div class="product-image   col-md-1" style="  display: inline; ">
            <img
              *ngIf="itemDetails?.headerData?.image"
              [src]="
                domSanitizer.bypassSecurityTrustUrl(
                  itemDetails?.headerData?.image
                )
              "
              alt=" Default Image"
            />
            <img *ngIf="!itemDetails?.headerData?.image" [src]="imgSrc" />
          </div>
          <div class="product_desc col-md-8" style="  display: inline; ">
            <div class="prod-details">
              <h2 class="text-ellipsis-single-line">
                <b>{{ itemDetails?.headerData?.id }}</b>
              </h2>
              <p>
                {{ itemDetails?.headerData?.imageDescription }}
              </p>
            </div>
          </div>
          <div class="col-md-3 search-attr">
            <input
              type="text"
              class="searchAttr"
              name="searchString"
              [(ngModel)]="searchString"
              placeholder="Type to search..."
            />
          </div>
          <!-- Product Details -->
        </div>
        <div class="row attr-details ">
          <div class=" col-md-12">
            <table
              class="table table-bordered scrollable attr-table"
              [style.border]="'1px solid #bbb'"
              [style.align]="'center'"
            >
              <thead>
                <tr>
                  <th>Attribute Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let data of itemDetails.itemData
                      | keyvalue
                      | filter: 'data.key':searchString
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
  `,
  providers: [
    KeyValuePipe,
    HttpErrorHandlerService,
    CatalogListService,
    CustomRelatedItemsService,
  ],
})
export class SampleTool1Component extends BaseCustomTools implements OnInit {
  public catalogList: any;
  private endpoint: string = "";
  private pKeyInput: string = "";
  private selectedCatalog: string = "";
  public imgSrc = "assets/images/default-image.png";
  public itemDetails: any = {};
  public isItemDetails: boolean = false;
  public showLoader: boolean = true;
  public noItemFound: boolean = true;
  public isCatalogList: boolean = false;
  public searchString = "";
  constructor(
    private catListService: CatalogListService,
    private customitemsService: CustomRelatedItemsService,
    private keyvaluePipe: KeyValuePipe,
    public domSanitizer: DomSanitizer
  ) {
    super();
  }
  ngOnInit() {
    this.endpoint = this.baseUrl + "catalogs";
    this.catListService.getCatalogs(this.endpoint).subscribe(
      (data) => {
        if (data) {
          this.catalogList = data;
          console.log(data);
          this.isCatalogList = true;
          this.showLoader = false;
        } else {
          this.isCatalogList = false;
          this.showLoader = false;
        }
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }
  searchItem(pKValue) {
    this.showLoader = true;
    this.pKeyInput = pKValue;
    let url =
      this.baseUrl +
      "custom/catalogs/items?" +
      "catalogName=" +
      this.selectedCatalog +
      "&itemPrimaryKey=" +
      this.pKeyInput +
      "&catalogId=" +
      "&itemId=";
    this.customitemsService.getItemDetails(url).subscribe(
      (data) => {
        //  this.relShipData.push(data.itemData);
        if (data.itemData) {
          this.showLoader = false;
          this.isItemDetails = true;
          this.noItemFound = true;

          this.getHeaderData(data);
        } else {
          this.showLoader = false;
          this.noItemFound = false;
          this.isItemDetails = false;
        }
      },
      (error) => {
        this.showLoader = false;
        this.isItemDetails = false;
      }
    );
  }
  getHeaderData(data) {
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
      this.customitemsService.getdisplayThumbnail(thumbnail_url).subscribe(
        (data) => {
          itemHeaderData.image =
            "data:image/jpeg;base64, " + data.base64EncodedBytes;
        },
        (err) => {
          //console.log("Error:- ", err);
        }
      );
    }
    let imageDesc = value.find(function (element) {
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
  }

  selected(event) {
    this.selectedCatalog = event.target.value;
  }
}
