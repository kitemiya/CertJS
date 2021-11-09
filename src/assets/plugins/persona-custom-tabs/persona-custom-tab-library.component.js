import * as tslib_1 from "tslib";
import 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
var PersonaCustomTabsLibraryComponent = /** @class */ (function () {
    function PersonaCustomTabsLibraryComponent(_compiler, injector, http) {
        // If category selection changed
        this._compiler = _compiler;
        this.injector = injector;
        this.http = http;
        //  console.log(this.inputData);
        // this._compiler = new JitCompilerFactory([
        //   { useDebug: false, useJit: true }
        // ]).createCompiler();
        this._compiler = new JitCompilerFactory().createCompiler();
    }
    PersonaCustomTabsLibraryComponent.prototype.ngOnInit = function () { };
    PersonaCustomTabsLibraryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
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
    PersonaCustomTabsLibraryComponent.prototype.ngOnDestroy = function () {
        if (this._component) {
            this._component.destroy();
        }
    };
    tslib_1.__decorate([
        ViewChild("ct", { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], PersonaCustomTabsLibraryComponent.prototype, "_container", void 0);
    PersonaCustomTabsLibraryComponent = tslib_1.__decorate([
        Component({
            selector: "mdmce-persona-tabs",
            templateUrl: "./persona-custom-tab-library.component.html",
        }),
        tslib_1.__metadata("design:paramtypes", [Compiler,
            Injector,
            HttpClient])
    ], PersonaCustomTabsLibraryComponent);
    return PersonaCustomTabsLibraryComponent;
}());
export { PersonaCustomTabsLibraryComponent };
//# sourceMappingURL=persona-custom-tab-library.component.js.map