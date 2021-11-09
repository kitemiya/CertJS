import { Component, OnInit } from "@angular/core";
import { BaseCustomTabs } from "./base-custom-tabs.component";

@Component({
  selector: "redirectSE",
  template: `
    <style>
      .custom-tab.action-btn-wrapper {
        display: inline-block;
      }
      .custom-tab.action-btn-wrapper .btn {
        margin: 20px 10px !important;
        height: 30px !important;
      }
    </style>
    <div class="custom-tab action-btn-wrapper">
      <button class="btn btn-primary" (click)="redirectToSECatalog()">
        Go to Single Edit
      </button>

      <button
        class="btn btn-primary"
        (click)="redirectToSECollab()"
        *ngIf="inputData.containerType == 'CATALOG'"
      >
        Go to Single Edit Collab
      </button>
    </div>
  `,
})
export class RedirectSEComponent extends BaseCustomTabs implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {}

  redirectToSECatalog() {
    // need to add these details to open a specific item in catalog mode
    let singleEditCatalogData = {
      singleEditType: "CATALOG",
      catalogName: "Bell Canada",
      catalogId: 11410,
      selectedIds: [71612],
    };
    this.goToSingleEditCatalog(singleEditCatalogData);
  }

  redirectToSECollab() {
    // need to add these details to open a specific item in collab mode
    let singleEditCollabData = {
      singleEditType: "collab",
      collabType: "item",
      collabName: "BellCanada_CTGCA",
      selectedIds: [56641],
      collabId: 802,
      stepId: 807,
    };

    this.goToSingleEditCollab(singleEditCollabData);
  }
}
