import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FirstPreviewScriptComponent } from './components/first-preview-script.component';
import { RedirectSEComponent } from './components/redirectSE.component';
import { SecondPreviewScriptComponent } from './components/second-preview-script.component';
import { UpdateAttributeComponent } from './components/update-attribute-component';
import { CustomItemApiService } from './services/custom-item-api.service';

@NgModule({
  declarations: [
    FirstPreviewScriptComponent,
    SecondPreviewScriptComponent,
    UpdateAttributeComponent,
    RedirectSEComponent,
  ],
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [CustomItemApiService],
})
export class PreviewScriptModule {}
