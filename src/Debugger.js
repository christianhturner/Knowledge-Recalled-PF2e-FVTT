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
      if (!debugMode || ui.KnowledgeRecalled.Debugger) {
         return ui.KnowledgeRecalled.Debugger;
      }
      ui.KnowledgeRecalled.Debugger = new Debugger(CONSTANTS.moduleId, 'Knowledge-Recalled', true, true);
   };

   /**
   * @method log
   * @param {...*} params 
   * @memberof SetupDebugger
   * @returns void
   */
   log(...params) {
      ui.KnowledgeRecalled.Debugger.log(...params);
   };

   /**
   * Method acts same as console.log, but provides timestamp
   * and saves to log for exporting and stroage.
   * @method log
   * @param {...*} params 
   * @memberof SetupDebugger
   * @returns void
   */
   info(...params) {
      ui.KnowledgeRecalled.Debugger.info(...params);
   };

   /**
   * Method acts same as console.warn, but provides timestamp
   * and saves to log for exporting and stroage.
   * @method warn
   * @param {...*} params 
   * @memberof SetupDebugger
   * @returns void
   */
   warn(...params) {
      ui.KnowledgeRecalled.Debugger.warn(...params);
   };

   /**
   * Method acts same as console.error, but provides timestamp
   * and saves to log for exporting and stroage.
   * @method error
   * @param {...*} params 
   * @memberof SetupDebugger
   * @returns void
   */
   error(...params) {
      ui.KnowledgeRecalled.Debugger.error(...params);
   };

   /**
   * Creates a download of `fvtt-knowledge-recalled-pf2e.log` located 
   * at `./debugger/fvtt-knowledge-recalled-pf2e.log`.
   * @method
   * @memberof SetupDebugger
   * @returns void
   */
   exportLog() {
      ui.KnowledgeRecalled.Debugger.dump();
   };

}