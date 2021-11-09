import * as tslib_1 from "tslib";
import 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
var PersonaCustomToolsLibraryComponent = /** @class */ (function () {
    function PersonaCustomToolsLibraryComponent(_compiler, http, injector) {
        this._compiler = _compiler;
        this.http = http;
        this.injector = injector;
    }
    PersonaCustomToolsLibraryComponent.prototype.ngOnInit = function () {
        this.inputData = this.injector.get("toolInfo");
    };
    PersonaCustomToolsLibraryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var proxy = this;
        require.ensure(["assets/plugins/preview-script/preview-script.module.js"], //NOT FOR MODIFICATION
        function (require) {
            var previewScript = require("assets/plugins/preview-script/preview-script.module.js"); //NOT FOR MODIFICATION
            var scriptPath = "dummy";
            _this._compiler
                .compileModuleAndAllComponentsAsync(previewScript.PreviewScriptModule)
                .then(function (compiled) {
                var factory = compiled.componentFactories.find(function (m) { return m.selector == scriptPath; });
                var comp = _this._container.createComponent(factory);
            });
        }, "custom/previewScriptLibrary" //NOT FOR MODIFICATION
        );
        this.inputData = this.injector.get("tabInfo");
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
    PersonaCustomToolsLibraryComponent.prototype.ngOnDestroy = function () {
        if (this._component) {
            this._component.destroy();
        }
    };
    tslib_1.__decorate([
        ViewChild("act", { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], PersonaCustomToolsLibraryComponent.prototype, "_container", void 0);
    PersonaCustomToolsLibraryComponent = tslib_1.__decorate([
        Component({
            selector: "mdmce-persona-custom-tools",
            templateUrl: "./persona-custom-tools-library.component.html",
            styleUrls: ["./persona-custom-tools-library.component.css"],
        }),
        tslib_1.__metadata("design:paramtypes", [Compiler,
            HttpClient,
            Injector])
    ], PersonaCustomToolsLibraryComponent);
    return PersonaCustomToolsLibraryComponent;
}());
export { PersonaCustomToolsLibraryComponent };
//# sourceMappingURL=persona-custom-tools-library.component.js.map