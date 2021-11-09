import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RedirectSEComponent } from "./components/redirectSE.component";
import { SampleTool1Component } from "./components/sample-tool1.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { KeyValuePipe } from "./pipes/key-value.pipe";
var PersonaCustomToolsModule = /** @class */ (function () {
    function PersonaCustomToolsModule() {
    }
    PersonaCustomToolsModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                SampleTool1Component,
                RedirectSEComponent,
                FilterPipe,
                KeyValuePipe,
            ],
            imports: [FormsModule, CommonModule, HttpClientModule],
            providers: [],
        })
    ], PersonaCustomToolsModule);
    return PersonaCustomToolsModule;
}());
export { PersonaCustomToolsModule };
//# sourceMappingURL=persona-custom-tools.module.js.map