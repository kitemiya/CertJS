import { Component, OnInit } from "@angular/core";
import { BaseCustomTools } from "./base-custom-tools.component";

@Component({
  selector: "redirect",
  template: `
    <style>
      .custom-tool.action-btn-wrapper {
        display: inline-block;
      }
      .custom-tool.action-btn-wrapper .btn {
        margin: 20px 10px !important;
        height: 30px !important;
      }
    </style>
    <div class="custom-tool action-btn-wrapper">
      <button class="btn btn-primary" (click)="redirectToSECatalog()">
        Go to Single Edit
      </button>

      <button class="btn btn-primary" (click)="redirectToSECollab()">
        Go to Single Edit Collab
      </button>

      <button class="btn btn-primary" (click)="redirectToMECatalog()">
        Go to Multi Edit
      </button>

      <button class="btn btn-primary" (click)="redirectToMECollab()">
        Go to Multi Edit Collab
      </button>
    </div>
  `,
})
export class RedirectSEComponent extends BaseCustomTools implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {}

  redirectToSECatalog() {
    // need to add these details to open a specific item in catalog mode
    let singleEditCatalogData = {
      redirectionContainer: "singleEdit",
      type: "catalog",
      catalogId: 11410,
      itemIds: [71610],
    };
    this.goToSingleEditCatalog(singleEditCatalogData);
  }

  redirectToSECollab() {
    // need to add these details to open a specific item in collab mode
    let singleEditCollabData = {
      redirectionContainer: "singleEdit",
      type: "collab",
      collabType: "item",
	  collabName: "",
      entryIds: [56641, 56642, 56645],
      collabId: 802,
      stepId: 807,
    };
    this.goToSingleEditCollab(singleEditCollabData);
  }

  redirectToMECollab() {
    // need these details to open multi-edit in collab
    let multiEditCollabData = {
      redirectionContainer: "multiEdit",
      type: "collab",
	  collabName: "",
      collabType: "item",
      collabId: 802,
      stepId: 807,
    };
    this.goToMultiEditCollab(multiEditCollabData);
  }

  redirectToMECatalog() {
    // need these details to open multi-edit in catalog
    let multiEditCatalogData = {
      redirectionContainer: "multiEdit",
      type: "catalog",
      catalogId: 11410,
      itemIds: [71610, 71612],
      searchType: "catalogwithitems",
    };
    this.goToMultiEditCatalog(multiEditCatalogData);
  }
}
