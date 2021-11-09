import * as tslib_1 from "tslib";
import "rxjs";
import { Compiler, Component, Injector, ViewChild, ViewContainerRef, } from "@angular/core";
import { JitCompilerFactory } from "@angular/platform-browser-dynamic";
import { previewScript } from "./models/preview-scripts";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
var PreviewScriptLibraryComponent = /** @class */ (function () {
    function PreviewScriptLibraryComponent(_compiler, injector, http) {
        this._compiler = _compiler;
        this.injector = injector;
        this.http = http;
        this._compiler = new JitCompilerFactory().createCompiler();
    }
    PreviewScriptLibraryComponent.prototype.onSelect = function (scriptPath) {
        var _this = this;
        require.ensure(["assets/plugins/preview-script/preview-script.module.js"], //NOT FOR MODIFICATION
        function (require) {
            var previewScript = require("assets/plugins/preview-script/preview-script.module.js"); //NOT FOR MODIFICATION
            _this._compiler
                .compileModuleAndAllComponentsAsync(previewScript.PreviewScriptModule)
                .then(function (compiled) {
                var factory = compiled.componentFactories.find(function (m) { return m.selector == scriptPath; });
                var comp = _this._container.createComponent(factory);
            });
        }, "custom/previewScriptLibrary" //NOT FOR MODIFICATION
        );
        this.inputData = this.injector.get("tabInfo");
        var proxy = this;
        require.ensure(["assets/plugins/persona-custom-tabs/persona-custom-tabs.module.js"], //NOT FOR MODIFICATION
        function (require) {
            var customTabs = require("assets/plugins/persona-custom-tabs/persona-custom-tabs.module.js");
            _this._compiler
                .compileModuleAndAllComponentsAsync(customTabs.PersonaCustomTabsModule)
                .then(function (compiled) {
                var factory = compiled.componentFactories.find(function (m) { return m.selector == _this.inputData.tabData.scriptPath; });
                var comp = _this._container.createComponent(factory);
            });
        }, "custom/personaCustomTabsLibrary" //NOT FOR MODIFICATION
        );
        require.ensure(["assets/plugins/persona-custom-tools/persona-custom-tools.module.js"], //NOT FOR MODIFICATION
        function (require) {
            var customTools = require("assets/plugins/persona-custom-tools/persona-custom-tools.module.js");
            _this._compiler
                .compileModuleAndAllComponentsAsync(customTools.PersonaCustomToolsModule)
                .then(function (compiled) {
                var factory = compiled.componentFactories.find(function (m) { return m.selector === _this.inputData.scriptPath; });
                var comp = _this._container.createComponent(factory);
            });
        }, "custom/personaCustomToolsLibrary" //NOT FOR MODIFICATION
        );
    };
    PreviewScriptLibraryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _scriptUrl = "./assets/json/preview-script.json";
        this.previewScripts = [];
        this.getCustomActions().subscribe(function (data) {
            for (var i = 0; i < data.scripts.length; i++) {
                _this.previewScripts.push(new previewScript(data.scripts[i].scriptDisplayName, "previewscript", data.scripts[i].scriptPath));
            }
        });
    };
    PreviewScriptLibraryComponent.prototype.getCustomActions = function () {
        var _scriptUrl = "assets/json/preview-script.json";
        return this.http.get(_scriptUrl).pipe(map(function (response) {
            return response;
        }));
    };
    tslib_1.__decorate([
        ViewChild("vc", { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], PreviewScriptLibraryComponent.prototype, "_container", void 0);
    PreviewScriptLibraryComponent = tslib_1.__decorate([
        Component({
            selector: "app-root",
            templateUrl: "./preview-script-library.component.html",
            styleUrls: ["./preview-script-library.component.css"],
        }),
        tslib_1.__metadata("design:paramtypes", [Compiler,
            Injector,
            HttpClient])
    ], PreviewScriptLibraryComponent);
    return PreviewScriptLibraryComponent;
}());
export { PreviewScriptLibraryComponent };
//# sourceMappingURL=preview-script-library.component.js.map