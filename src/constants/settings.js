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
   debug: "debug",
   themeData: "themeData",
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
 * @property {string} debug - Allows the selection of Logging level, and enables other development features.
 *
 * @property {string} themeData - Stores the theme data object.
 */