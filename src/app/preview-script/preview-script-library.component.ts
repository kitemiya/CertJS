import "rxjs";

import {
  Compiler,
  Component,
  Injector,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { JitCompilerFactory } from "@angular/platform-browser-dynamic";

import { previewScript } from "./models/preview-scripts";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

declare var require: any;

declare var require: any;

@Component({
  selector: "app-root",
  templateUrl: "./preview-script-library.component.html",
  styleUrls: ["./preview-script-library.component.css"],
})
export class PreviewScriptLibraryComponent {
  @ViewChild("vc", { read: ViewContainerRef, static: true })
  _container: ViewContainerRef;
  selectedpreviewScript: any;
  previewScripts: any;
  public inputData: any;

  constructor(
    private _compiler: Compiler,
    private injector: Injector,
    private http: HttpClient
  ) {
    this._compiler = new JitCompilerFactory().createCompiler();
  }

  onSelect(scriptPath) {
    require.ensure(
      ["assets/plugins/preview-script/preview-script.module.js"], //NOT FOR MODIFICATION
      (require) => {
        let previewScript = require("assets/plugins/preview-script/preview-script.module.js"); //NOT FOR MODIFICATION

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

  ngOnInit() {
    const _scriptUrl = "./assets/json/preview-script.json";
    this.previewScripts = [];

    this.getCustomActions().subscribe((data) => {
      for (let i = 0; i < data.scripts.length; i++) {
        this.previewScripts.push(
          new previewScript(
            data.scripts[i].scriptDisplayName,
            "previewscript",
            data.scripts[i].scriptPath
          )
        );
      }
    });
  }

  getCustomActions(): Observable<any> {
    const _scriptUrl = "assets/json/preview-script.json";

    return this.http.get(_scriptUrl).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
