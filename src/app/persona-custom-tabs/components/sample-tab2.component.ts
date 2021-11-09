import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { GroupKeyValuePipe } from '../pipes/grouping-key-value.pipe';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { AuthService } from '../services/auth.service';
import { CustomRelatedItemsService } from '../services/custom-related-items.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { BaseCustomTabs } from './base-custom-tabs.component';

@Component({
  selector: "sample-tab2",
  template: `
    <style>
      .attr-table {
        margin: 25px;
        font-size: 12px !important;
      }
      table {
        margin-top: 15px;
        width: 100%;
        height: 100px;
        overflow-y: auto;
      }

      th {
        background-color: #ff944d;
        color: darkslategray;
        font-weight: bold;
      }

      tr:nth-child(even) {
        background-color: #f0f5f5;
      }
      .noGroupData {
        margin: 20px;
      }
    </style>
    <div *ngIf="showLoader">
      <div id="dotCircle"><span></span></div>
      <div class="overlayWrapper"></div>
    </div>
    <div class="noGroupData " *ngIf="!isGroupData">
      <h2 style=" margin-bottom: 10px;">
        No Approval Details found
      </h2>
    </div>

    <div *ngIf="!showLoader && isGroupData" class="attr-table">
      <div class="inputComment">
        <input
          type="text"
          [(ngModel)]="commentInput"
          placeholder="enter approval comment"
        />

        <button
          class="btn btn-primary"
          [disabled]="commentInput === ''"
          type="submit"
          (click)="updateComment()"
          title="Submit"
        >
          Submit
        </button>
      </div>
      <table
        class="table table-bordered scrollable"
        [style.border]="'1px solid #bbb'"
        [style.align]="'center'"
      >
        <thead>
          <tr>
            <th *ngFor="let data of attributeTableData[0] | keyvalue">
              {{ data.key }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let data of attributeTableData">
            <td *ngFor="let key of data | keyvalue">{{ key.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  providers: [
    HttpErrorHandlerService,
    CustomRelatedItemsService,
    KeyValuePipe,
    AuthService,
    GroupKeyValuePipe,
  ],
})
export class SampleTab2Component extends BaseCustomTabs implements OnInit {
  groupingData: any[] = [];
  groupingDataResponse: any[] = [];
  attributeTableData: any[] = [];
  groupDataMap = new Map();
  commentInput: string = "";
  showLoader: boolean = true;
  lblDateFormat: string = "";
  isGroupData: boolean = true;

  constructor(
    private customrelItemServ: CustomRelatedItemsService,
    private groupkeyValue: GroupKeyValuePipe,
    private authService: AuthService,
    private httpErrHandler: HttpErrorHandlerService
  ) {
    super();
  }
  ngOnInit() {
    var sessionData: any = JSON.parse(sessionStorage.getItem("userSettings"));
    if (sessionData) {
      this.lblDateFormat = sessionData.DATETIMEOUTPUTFORMAT.split(
        " "
      )[0].toUpperCase();
    }
    this.getItemGroupingData();
  }
  getItemGroupingData() {
    this.groupDataMap.clear();
    this.attributeTableData = [];
    let paramObj = {
      catalogName: "",
      primaryKey: "",
    };
    if (this.inputData) {
      let url =
        this.baseUrl +
        "custom/catalogs/items?" +
        "catalogName=" +
        paramObj.catalogName +
        "&itemPrimaryKey=" +
        paramObj.primaryKey +
        "&catalogId=" +
        this.inputData.containerId +
        "&itemId=" +
        this.inputData.selectedEntryIds[0];
      this.customrelItemServ.getItemDetails(url).subscribe(
        (data) => {
          this.groupingDataResponse = data.itemData;
          if (data.itemData) {
            this.showLoader = false;
          } else {
            this.showLoader = false;
          }
          this.groupingData = this.groupkeyValue.transform(
            this.groupingDataResponse,
            []
          );

          this.groupingData.forEach((item) => {
            let valobj: any = {};
            let keyArr = item.key.split("#");
            let nodedata = keyArr[1].split("-");
            valobj[nodedata[1]] = item.value;

            if (this.groupDataMap.has(nodedata[0])) {
              let getColArr = this.groupDataMap.get(nodedata[0]);
              getColArr[nodedata[1]] = item.value;
              this.groupDataMap[nodedata[0]] = getColArr;
            } else {
              this.groupDataMap.set(nodedata[0], valobj);
            }
          });

          for (let i = this.groupDataMap.size - 1; i >= 0; i--) {
            this.attributeTableData.push(this.groupDataMap[i]);
          }
          if (this.attributeTableData.length > 0) {
            this.isGroupData = true;
          } else {
            this.isGroupData = false;
          }
        },
        (error) => {
          this.showLoader = false;
          console.error("Error:: " + error);
        }
      );
    }
  }

  updateComment() {
    let updatereqObj: any = this.getGroupingUpdateInput(
      this.groupingDataResponse
    );

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

    let url =
      this.baseUrl +
      "custom/catalogs/items?" +
      "catalogName=" +
      "&itemPrimaryKey=" +
      "&catalogId=" +
      this.inputData.containerId +
      "&itemId=" +
      this.inputData.selectedEntryIds[0];
    this.customrelItemServ.addGroupNode(url, updatereqObj).subscribe(
      (data) => {
        this.getItemGroupingData();
        this.commentInput = "";
      },
      (error) => {
        console.error("Error:: " + error);
      }
    );
  }

  getGroupingUpdateInput(groupingData): any {
    let obj = {};
    for (var key in groupingData) {
      if (key.indexOf("#") !== -1) {
        let keysArr = key.split("#");
        if (keysArr[1] && keysArr[1].indexOf("/") !== -1) {
          let specDataArray = keysArr[1].split("/");
          if (Number(specDataArray[0]) == 0) {
            let tempkey = key.replace("0", String(this.groupDataMap.size));
            obj[tempkey] = "";
          }
        }
      }
    }

    return obj;
  }
}
