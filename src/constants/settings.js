
const SETTINGS = {

   PRELOAD_FILES = "preloadFiles",
   DEFAULT_DATA_DIRECTORY = "knowledgeRecalledData",

   GET_DEFAULT() {
      return foundry.utils.deepClone(SETTINGS.DEFAULTS());
   }
   DEFAULTS: () => ({
      
   })
};
Game.settings.register("knowledge-recalled", SETTINGS.PRELOAD_FILES, {
   name: "Preload Files",
   hint: "Preload files to improve performance",
   scope: "world",
   config: true,
   type: Boolean,
   default: true
});