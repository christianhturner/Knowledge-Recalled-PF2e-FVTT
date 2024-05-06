import { TJSGameSettings } from "#runtime/svelte/store/fvtt/settings";
import { CONSTANTS } from "../constants/constants";
import { TJSSettings } from "../constants/settings";
import { ConfigSettingsButton } from "../view/tjsSettings/ConfigSettingButton";

// Reference: https://github.com/typhonjs-fvtt/mce-everywhere/blob/main/src/model/mceGameSettings.js

class KRGameSettings extends TJSGameSettings {
   #themeStore;

   constructor() {
      super(CONSTANTS.moduleId);
   }

   init() {
      const namespace = this.namespace;

      // this.#themeStore = new TJSThemeStore({
      //    namespace,
      //    key: TJSSettings.themeData,
      //    gameSettings: this,
      //    /* TODO: Add CSS style manager and themeStoreConfig */
      //    // styleManager: '....'
      //    // config: ''
      // });

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

      game.settings.registerMenu(namespace, TJSSettings.button, {
         // TODO: REPLACE with localized strings
         name: 'Knowledge Recalled Settings',
         label: 'Configure Settings',
         icon: 'fas fa-dice-d20',
         type: ConfigSettingsButton,
         restricted: true
      });

      allSettings.push({
         namespace,
         key: TJSSettings.debug,
         options: {
            name: "Debug",
            hint: "Set logging level to ERROR | LOG | DEBUG",
            scope: scope.client,
            default: "ERROR",
            requiresReload: true,
            type: String,
            choices: {
               ERROR: "ERROR",
               INFO: "INFO",
               DEBUG: "DEBUG",
            },
         }
      });
      // Selectively register settings w/ core Foundry based on whether the user is GM.
      this.registerAll(allSettings, !game.user.isGM);

   }
}

export const krGameSettings = new KRGameSettings();