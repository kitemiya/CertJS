import { Component, OnInit } from '@angular/core';

import { CustomItemApiService } from '../services/custom-item-api.service';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';
import { BasePreview } from './base-preview.component';

@Component({
  selector: "update-attribute",
  template: `
    <div class="backdrop" [ngStyle]="{ display: display }"></div>

    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      [ngStyle]="{ display: display }"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <span *ngIf="!isDeleteEnabled" class="ui-dialog-title">
              Update Attribute
            </span>

            <button
              type="button"
              class="close"
              (click)="closeModalDialog()"
              aria-label="Close"
              title="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div class="modal-body">
            <div
              style="max-height: 270px;overflow: auto;font-family: Arial; font-size: 14px; color: #444;"
            ></div>
            <div>
              <input
                style="max-width: 195px; display: inline-block; margin-right: 10px"
                class="form-control"
                #inputPath
                [(ngModel)]="attributePath"
                type="text"
                placeholder="Enter full attribute Path"
              />
              <input
                style="max-width: 195px; display: inline-block; margin-right: 10px"
                class="form-control"
                #attribute
                type="text"
              />
              <button
                title="Update Attribute"
                class="btn btn-primary"
                (click)="updateAttribute(attribute.value)"
              >
                Update Attribute
              </button>
              <button
                *ngIf="isDeleteEnabled"
                title="Delete Selected Items"
                class="btn btn-primary"
                (click)="delEntries()"
              >
                Delete Selected Items
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default"
              (click)="closeModalDialog()"
              title="Close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [CustomItemApiService, HttpErrorHandlerService],
})
export class UpdateAttributeComponent extends BasePreview implements OnInit {
  display: any = "block";
  attributePath: string = "";
  isDeleteEnabled: boolean = false;

  constructor(public customApiService: CustomItemApiService) {
    super();
  }
  ngOnInit() {
    // if (this.inputData.categoryId) {
    //   this.isDeleteEnabled = true;
    // }
  }
  updateAttribute(val) {
    this.updateItemsWithAttribute(val);
  }

  delEntries() {
    const endPoint =
      this.baseUrl +
      "catalogs/" +
      this.inputData.containerId +
      "/items/?itemIds=" +
      this.inputData.selectedEntryIds.join(",");
    this.customApiService.delData(endPoint).subscribe((res) => {
      if (res["successCount"] > 0) {
        alert(res["successCount"] + "items deleted succesfully");
      } else {
        alert("items are not deleted");
      }
    });
  }

  updateItemsWithAttribute(attribute) {
    const endPoint =
      this.baseUrl +
      "catalogs/" +
      this.inputData.containerId +
      "/items?catalogId=" +
      this.inputData.containerId +
      "&sortAttrPath=&sortOrder=asc&itemIds=" +
      this.inputData.selectedEntryIds.join(",");

    this.customApiService.loadData(endPoint).subscribe((entryList) => {
      const entryInfoList = [];
      let attrInfoList = [];
      const reqObj = {};
      const updateEndPoint =
        this.baseUrl + "catalogs/" + this.inputData.containerId + "/items/";

      entryList.forEach((entryid) => {
        const reqEntries = {};
        attrInfoList = [];

        reqEntries["entryId"] = entryid;

        attrInfoList.push({
          attributePath: this.attributePath,
          newValue: attribute,
        });

        reqEntries["attrInfoList"] = attrInfoList;
        entryInfoList.push(reqEntries);
      });

      reqObj["entryInfoList"] = entryInfoList;

      this.customApiService
        .editData(updateEndPoint, reqObj)
        .subscribe((res) => {
          alert("Updated succesfully");
          this.display = "none";
        });
    });
  }

  closeModalDialog() {
    this.display = "none";
  }
}
