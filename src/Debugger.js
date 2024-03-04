import { CONSTANTS } from "./constants/constants";
/**
 * Function to set up debugger extends https://github.com/RPG-Made-Simple/FVTT-Debugger
 * @class SetupDebugger
 * @alias ui.KnowledgeRecalled.Debugger
 */

export class SetupDebugger {
   /**
   * @constructor
   * @param {boolean} debugMode
   */
   constructor(debugMode) {
      this.debugMode = debugMode;
      if (!debugMode) {
         return
      };
      const moduleData = game.modules.get(CONSTANTS.moduleId);
      if (moduleData?.public?.debugger) {
         return moduleData.public.debugger
      };
      return new Debugger(CONSTANTS.moduleId, 'Knowledge-Recalled', true, true);
   };

   /**
   * @method log
   * @param {...*} params 
   * @memberof Debugger
   * @returns void
   */
   log(...params) {
      this.log(...params);
   };

   /**
   * Method acts same as console.log, but provides timestamp
   * and saves to log for exporting and stroage.
   * @method log
   * @param {...*} params 
   * @memberof Debugger
   * @returns void
   */
   info(...params) {
      this.info(...params);
   };

   /**
   * Method acts same as console.warn, but provides timestamp
   * and saves to log for exporting and stroage.
   * @method warn
   * @param {...*} params 
   * @memberof Debugger
   * @returns void
   */
   warn(...params) {
      this.warn(...params);
   };

   /**
   * Method acts same as console.error, but provides timestamp
   * and saves to log for exporting and stroage.
   * @method error
   * @param {...*} params 
   * @memberof Debugger
   * @returns void
   */
   error(...params) {
      this.error(...params);
   };

   /**
   * Creates a download of `fvtt-knowledge-recalled-pf2e.log` located 
   * at `./debugger/fvtt-knowledge-recalled-pf2e.log`.
   * @method
   * @memberof Debugger
   * @returns void
   */
   exportLog() {
      this.dump();
   };

}