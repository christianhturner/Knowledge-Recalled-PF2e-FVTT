/**
 * @typedef {string} SettingsValue
 *
 * @property {string} DEBUG
 */

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