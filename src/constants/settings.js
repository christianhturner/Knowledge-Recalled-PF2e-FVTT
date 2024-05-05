/**
 * @typedef {string} SettingsValue
 *
 * @property {string} DEBUG
 */

import { CONSTANTS } from "./constants";

export const SETTINGS = {
   DEBUG: "debug",

   GET_DEFAULT() {
      return foundry.utils.deepClone(SETTINGS.DEFAULTS());
   },

   DEFAULTS: () => ({
      [SETTINGS.DEBUG]: {
         name: "KNOWLEDGE-RECALLED.SETTINGS.DEBUG.title",
         hint: "KNOWLEDGE-RECALLED.SETTINGS.DEBUG.hint",
         scope: "client",
         config: "true",
         default: "ERROR",
         requiresReload: true,
         type: String,
         choices: {
            ERROR: "ERROR",
            INFO: "INFO",
            DEBUG: "DEBUG"
         },
      }
   }),
};

/**
 * @type {KRSessionConstants} Defines all the module session storage static constants.
 */
export const sessionConstants = {
   appState: `${CONSTANTS.moduleId}.settings.appState`
};

/**
 * @type {KRSettings} Defines all the module settings for world and clinet.
 */
export const TJSSettings = {
   button: "button",
   clientenabled: "clientenabled",
   cursor: "cursor",
   help: "help",
   highlightDocumentMatches: "highlightDocumentMatches",
   location: "location",
   themeData: "themeData",
   toolbar: "toolbar"
};

/**
 * @typedef {object} KRSessionConstants
 *
 * @property {string} appState - Stores the settings app state.
 */

/**
 * @typedef {object} KRSettings
 *
 * @property {string} button - Defines the settings button for GMs.
 *
 * @property {string} clientenabled - Is MCE Everywhere enabled on the particular client?
 *
 * @property {string} cursor - Sets the cursor position when editor is initialized.
 *
 * @property {string} help - Adds a help button to the editor toolbar.
 *
 * @property {string} highlightDocumentMatches - Defines default enabled state for the highlight matches "plugin".
 *
 * @property {string} location - Defines where MCE Everywhere replaces the editor; all, only journals, not journals.
 *
 * @property {string} themeData - Stores the theme data object.
 *
 * @property {string} toolbar - Defines the editor toolbar type: basic, dynamic, extended, default.
 */