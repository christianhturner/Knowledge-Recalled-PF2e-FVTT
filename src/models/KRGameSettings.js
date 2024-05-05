import { BrowserSupports } from "#runtime/util/browser";
import { TJSThemeEditor } from "#standard/component";
import { TJSGameSettings } from "#runtime/svelte/store/fvtt/settings";
import { TJSThemeStore } from "#standard/store";
import { CONSTANTS } from "../constants/constants";
import { TJSSettings, sessionConstants } from "../constants/settings";

// Reference: https://github.com/typhonjs-fvtt/mce-everywhere/blob/main/src/model/mceGameSettings.js

class KRGameSettings extends TJSGameSettings {
   #themeStore;

   constructor() {
      super(CONSTANTS.moduleId);
   }

   init() {
      const namespace = this.namespace;

      this.#themeStore = new TJSThemeStore({
         namespace,
         key: TJSSettings.themeData,
         gameSettings: this,
         /* TODO: Add CSS style manager and themeStoreConfig */
         // styleManager: '....'
         // config: ''
      });

      /**
       * constants for setting scope type.
       *
       * @type {{world: string, client: string}}
       */
      const scope = {
         client: 'client',
         world: 'world'
      };

      const allSettings = [];

      // See line 50 if desire to add macro button exist


   }
}