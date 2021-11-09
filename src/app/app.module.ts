import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonaCustomTabsLibraryComponent } from './persona-custom-tabs/persona-custom-tab-library.component';
import { PersonaCustomToolsLibraryComponent } from './persona-custom-tools/persona-custom-tools-library.component';
import { PreviewScriptLibraryComponent } from './preview-script/preview-script-library.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaCustomTabsLibraryComponent,
    PersonaCustomToolsLibraryComponent,
    PreviewScriptLibraryComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [PreviewScriptLibraryComponent],
})
export class AppModule {}
