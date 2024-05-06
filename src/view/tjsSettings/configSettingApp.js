import { SvelteApplication } from "#runtime/svelte/application";
import { CONSTANTS } from "../../constants/constants";
import ConfigSettingAppShell from "./ConfigSettingAppShell.svelte";
import { sessionConstants } from "../../constants/settings";
// import { log } from "../../lib/debugger";

export class ConfigSettingsApp extends SvelteApplication {
   /** @inheritdoc */
   constructor(options) {
      super(options);

      try {
         this.state.set(JSON.parse(sessionStorage.getItem(sessionConstants.appState)));
      } catch (err) {
         // Attempt not throwing error?
         // log.catchError("Error occured at `/view/tjsSettings/configSettingsApp.js` @15", err);
      }
   }
   /**
    *
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         /* FIXME: Replace with localized*/
         title: "Knowledge Recalled Settings Configuration",
         id: CONSTANTS.moduleId,
         resizable: true,
         minimizable: true,
         width: 600,
         height: 700,
         minWidth: 550,

         svelte: {
            class: ConfigSettingAppShell,
            target: document.body
         }
      });
   }
}