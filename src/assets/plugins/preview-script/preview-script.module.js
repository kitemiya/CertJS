import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirstPreviewScriptComponent } from './components/first-preview-script.component';
import { RedirectSEComponent } from './components/redirectSE.component';
import { SecondPreviewScriptComponent } from './components/second-preview-script.component';
import { UpdateAttributeComponent } from './components/update-attribute-component';
import { CustomItemApiService } from './services/custom-item-api.service';
var PreviewScriptModule = /** @class */ (function () {
    function PreviewScriptModule() {
    }
    PreviewScriptModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                FirstPreviewScriptComponent,
                SecondPreviewScriptComponent,
                UpdateAttributeComponent,
                RedirectSEComponent,
            ],
            imports: [FormsModule, CommonModule, HttpClientModule],
            providers: [CustomItemApiService],
        })
    ], PreviewScriptModule);
    return PreviewScriptModule;
}());
export { PreviewScriptModule };
//# sourceMappingURL=preview-script.module.js.map