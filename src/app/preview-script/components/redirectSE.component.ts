import { Component, OnInit } from '@angular/core';

import { BasePreview } from './base-preview.component';

@Component({
  selector: "redirectSE",
  template: `
    <div class="backdrop" [ngStyle]="{ display: display }"></div>

    <!-- modal -->
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      [ngStyle]="{ display: display }"
    >
      <!-- modal-dialog -->
      <div class="modal-dialog">
        <!-- modal-content -->
        <div class="modal-content">
          <!-- modal-header -->
          <div class="modal-header">
            <span class="ui-dialog-title"> Show All Items </span>
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

          <!-- modal-body -->
          <div class="modal-body">
            <div
              style="max-height: 270px;overflow: auto;font-family: Arial; font-size: 14px; color: #444;"
            >
              <div>Related Items:</div>
              <div *ngFor="let data of relatedItems">
                <input
                  #checkId
                  type="checkbox"
                  [value]="data"
                  (change)="changeSelection(data, checkId.checked)"
                />
                {{ data }}
              </div>
            </div>
            <div class="action-btn-wrapper">
              <button
                class="btn btn-primary"
                [disabled]="enableButtons()"
                (click)="redirectToSECatalog()"
              >
                Go to Single Edit
              </button>

              <button class="btn btn-primary" (click)="redirectToSECollab()">
                Go to Single Edit Collab
              </button>
            </div>
          </div>

          <!-- modal-footer -->
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
})
export class RedirectSEComponent extends BasePreview implements OnInit {
  display: any = "block";
  selectedIds: Array<number> = [];
  relatedItems: Array<any> = [];

  constructor() {
    super();
  }
  ngOnInit() {
    this.relatedItems = [526817, 526818, 526819];
  }
  closeModalDialog() {
    this.display = "none";
  }
  changeSelection(id, isSelected) {
    if (isSelected) {
      this.selectedIds.push(id);
    } else {
      let index = this.selectedIds.indexOf(id);

      this.selectedIds.splice(index, 1);
    }
  }
  redirectToSECatalog() {
    let obj = {
      type: "catalog",
      catalogId: 92202,
      itemIds: this.selectedIds,
    };
    this.display = "none";
    this.goToSingleEditCatalog(obj);
  }
  redirectToSECollab() {
    // let obj = {
    //   type: "collab",
    //   collabType: "item",
    //   entryIds: [480609, 480608, 480607],
    //   collabId: 605,
    //   stepId: 455
    // };
    let obj = {
      type: "collab",
      collabType: "item",
	  collabName: "",
      entryIds: [523081, 525399, 568684],
      collabId: 17402,
      stepId: 16806,
    };

    this.display = "none";
    this.goToSingleEditCollab(obj);
  }
  enableButtons(): boolean {
    return this.selectedIds.length > 0 ? false : true;
  }
}
