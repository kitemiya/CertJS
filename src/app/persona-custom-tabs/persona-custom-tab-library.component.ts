import 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Compiler, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { customTabs } from './models/custom-tabs';

declare var require: any;

@Component({
  selector: "mdmce-persona-tabs",
  templateUrl: "./persona-custom-tab-library.component.html",
})
export class PersonaCustomTabsLibraryComponent {
  @ViewChild("ct", { read: ViewContainerRef, static: true })
  private _container: ViewContainerRef;
  private _component: any;
  public inputData: any;

  constructor(
    private _compiler: Compiler,
    private injector: Injector,
    private http: HttpClient
  ) {
    // If category selection changed

    //  console.log(this.inputData);
    // this._compiler = new JitCompilerFactory([
    //   { useDebug: false, useJit: true }
    // ]).createCompiler();
    this._compiler = new JitCompilerFactory().createCompiler();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    let proxy = this;

    require.ensure(
      ["assets/plugins/persona-custom-tabs/persona-custom-tabs.module.js"], //NOT FOR MODIFICATION
      (require) => {
        let customTabs = require("assets/plugins/persona-custom-tabs/persona-custom-tabs.module.js");
        this._compiler
          .compileModuleAndAllComponentsAsync(
            customTabs.PersonaCustomTabsModule
          )
          .then((compiled) => {
            const factory = compiled.componentFactories.find(
              (m) => m.selector == this.inputData.tabData.scriptPath
            );
            let comp = this._container.createComponent(factory);
          });
      },
      "custom/personaCustomTabsLibrary" //NOT FOR MODIFICATION
    );

    require.ensure(
      ["assets/plugins/preview-script/preview-script.module.js"], //NOT FOR MODIFICATION
      (require) => {
        let previewScript = require("assets/plugins/preview-script/preview-script.module.js"); //NOT FOR MODIFICATION
        let scriptPath = "dummy";
        this._compiler
          .compileModuleAndAllComponentsAsync(previewScript.PreviewScriptModule)
          .then((compiled) => {
            const factory = compiled.componentFactories.find(
              (m) => m.selector == scriptPath
            );

            let comp = this._container.createComponent(factory);
          });
      },
      "custom/previewScriptLibrary" //NOT FOR MODIFICATION
    );
    require.ensure(
      ["assets/plugins/persona-custom-tools/persona-custom-tools.module.js"], //NOT FOR MODIFICATION
      (require) => {
        let customTools = require("assets/plugins/persona-custom-tools/persona-custom-tools.module.js");
        this._compiler
          .compileModuleAndAllComponentsAsync(
            customTools.PersonaCustomToolsModule
          )
          .then((compiled) => {
            const factory = compiled.componentFactories.find(
              (m) => m.selector === this.inputData.scriptPath
            );
            let comp = this._container.createComponent(factory);
          });
      },
      "custom/personaCustomToolsLibrary" //NOT FOR MODIFICATION
    );
  }

  ngOnDestroy() {
    if (this._component) {
      this._component.destroy();
    }
  }
}
