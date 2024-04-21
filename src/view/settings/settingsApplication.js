import { SvelteApplication } from '#runtime/svelte/application';
import { getActiveApps } from '../../control/utilities';
import SettingsShell from "./settings-shell.svelte";

export class SettingsApp extends SvelteApplication {

   static get defaultOptions() {


      return foundry.utils.mergeObject(super.defaultOptions, {
         id: `knowledge-recalled-settings-${randomID()}`,
         // only add classes here if they actually exist
         // classes: ["class-name"]
         width: 700,
         title: "KNOWLEDGE-RECALLED.APPLICATIONS.SETTINGS.title",
         zIndex: 100,

         svelte: {
            class: SettingsShell,
            target: document.body,
         },
         //   classes: ["knowledge-recalled-app"],
      })
   }

   static getActiveApp() {
      return getActiveApps("knowledge-recalled-settings", true);
   }

   static async show(options = {}, dialogData = {}) {
      const app = this.getActiveApp()
      if (app) return app.render(false, { focus: true });
      return new Promise((resolve) => {
         options.resolve = resolve;
         new this(options, dialogData).render(true, { focus: true });
      })
   }

};

export class SettingsShim extends FormApplication {
   constructor() {
      super({});
      SettingsApp.show();
   }

   async _updateObject(event, formData) {

   }

}