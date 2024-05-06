import { ConfigSettingsApp } from "./ConfigSettingApp";

export class ConfigSettingsButton extends FormApplication {
   static #krSettingsApp;

   static showSettings() {
      this.#krSettingsApp = this.#krSettingsApp ? this.#krSettingsApp : new ConfigSettingsApp();
      this.#krSettingsApp.render(true, { focus: true });

      return this.#krSettingsApp;
   }
   /**
    * @inheritDoc
    */
   constructor(options = {}) {
      super({}, options);
      ConfigSettingsButton.showSettings();
   }

   // eslint-disable-next-line no-unused-vars
   async _updateObject(event, formData) { }
   render() { this.close(); }
}