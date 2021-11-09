import { Component } from '@angular/core';

import { BasePreview } from './base-preview.component';

@Component({
  selector: "second-preview",
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
            <span class="ui-dialog-title"> Show Selected Item Ids </span>
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
              <table
                class="table table-bordered"
                [style.border]="'1px solid #bbb'"
                [style.align]="'center'"
              >
                <thead>
                  <tr>
                    <th
                      style="background-color: #e7e7e7; font-weight: normal; font-size: 15px; color: #333;"
                    >
                      Selected Items
                    </th>
                    <th
                      style="background-color: #e7e7e7; font-weight: normal; font-size: 15px; color: #333;"
                    >
                      Container Id
                    </th>
                    <th
                      style="background-color: #e7e7e7; font-weight: normal; font-size: 15px; color: #333;"
                    >
                      Container Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let data of inputData.selectedEntryIds">
                    <td>{{ data }}</td>
                    <td>{{ inputData.containerId }}</td>
                    <td>{{ inputData.containerType }}</td>
                  </tr>
                </tbody>
              </table>
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
export class SecondPreviewScriptComponent extends BasePreview {
  display: any = "block";

  constructor() {
    super();
  }

  closeModalDialog() {
    this.display = "none";
  }
}
