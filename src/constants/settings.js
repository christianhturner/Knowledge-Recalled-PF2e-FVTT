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
         default: "INFO",
         type: String,
         choices: {
            INFO: "INFO",
            ERROR: "ERROR",
            DEBUG: "DEBUG"
         },
      }
   }),
};