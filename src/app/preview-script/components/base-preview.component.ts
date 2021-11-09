import { EventEmitter, Output } from '@angular/core';

export abstract class BasePreview {
  @Output() redirectItem = new EventEmitter<any>();

  public inputData: any = {};
  public baseUrl: any = {};
  public goToSingleEditCatalog(catalogObj: any) {
    this.redirectItem.next(catalogObj);
  }
  public goToSingleEditCollab(collabObj: any) {
    this.redirectItem.next(collabObj);
  }
}
