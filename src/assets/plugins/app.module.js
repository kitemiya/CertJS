import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PersonaCustomTabsLibraryComponent } from './persona-custom-tabs/persona-custom-tab-library.component';
import { PersonaCustomToolsLibraryComponent } from './persona-custom-tools/persona-custom-tools-library.component';
import { PreviewScriptLibraryComponent } from './preview-script/preview-script-library.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map