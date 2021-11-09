import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RedirectSEComponent } from "./components/redirectSE.component";
import { SampleTab1Component } from "./components/sample-tab1.component";
import { SampleTab2Component } from "./components/sample-tab2.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { GroupKeyValuePipe } from "./pipes/grouping-key-value.pipe";
import { KeyValuePipe } from "./pipes/key-value.pipe";
var PersonaCustomTabsModule = /** @class */ (function () {
    function PersonaCustomTabsModule() {
    }
    PersonaCustomTabsModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                SampleTab1Component,
                SampleTab2Component,
                RedirectSEComponent,
                KeyValuePipe,
                GroupKeyValuePipe,
                FilterPipe,
            ],
            imports: [FormsModule, CommonModule, HttpClientModule],
            providers: [],
        })
    ], PersonaCustomTabsModule);
    return PersonaCustomTabsModule;
}());
export { PersonaCustomTabsModule };
//# sourceMappingURL=persona-custom-tabs.module.js.map