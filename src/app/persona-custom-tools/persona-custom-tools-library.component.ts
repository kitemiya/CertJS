import 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Compiler, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

declare var require: any;

@Component({
  selector: "mdmce-persona-custom-tools",
  templateUrl: "./persona-custom-tools-library.component.html",
  styleUrls: ["./persona-custom-tools-library.component.css"],
})
export class PersonaCustomToolsLibraryComponent implements OnInit {
  @ViewChild("act", { read: ViewContainerRef, static: true })
  private _container: ViewContainerRef;
  private _component: any;
  public inputData: any;

  constructor(
    private _compiler: Compiler,
    private http: HttpClient,
    private injector: Injector
  ) {
  
  }

  ngOnInit() {
    this.inputData = this.injector.get("toolInfo");
  }

  ngAfterViewInit() {
    let proxy = this;
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
    this.inputData = this.injector.get("tabInfo");

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
