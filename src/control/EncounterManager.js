import { log } from "../lib/debugger";
import { CONSTANTS } from "../constants/constants";

/**
 * API#encounterManager
 *
 * @class EncounterManager
 *
 * @memberof {API}
 * @instance
 *
 * @property {Map<key, encounter>} activeEncounters
 *
 * @property {Map<key, encounter>} encounters
 *
 * @property {Map<key, encounter>} currentEncounter
 */
export class EncounterManager {
   // encounters should be created at startup, and not stored.


   constructor() {
      const moduleData = game.modules.get(CONSTANTS.moduleId);
      if (!moduleData?.public?.encounterManager) {
         this.activeEncounters = this.getActiveEncounters();
         this.encounters = this.getAllEncounters();
         this.currentEncounter = this.getCurrentEncounter();
         return this;
      }
      return moduleData.public.encounterManager;
   }


   updateEncounters() {
      this.activeEncounters = this.getActiveEncounters();
      this.encounters = this.getAllEncounters();
      this.currentEncounter = this.getCurrentEncounter();
   }


   /**
    * List Foundry Encounters
    *
    * @function
    *
    * @returns {Array<game.combats>} - Returns an Array of encounters
    */
   getAllEncounters() {
      const allEncounters = Array.from(game.combats.entries()).map(([key, value]) => ({ key, value }));
      log.debug(allEncounters);
      return allEncounters;
   }
   /** 
    * List Active Foundry Encounters
    *
    * @function
    *
    * @returns {Array<game.combats.active} - Retuns an array of active encounters
    */
   // Fore each isn't working
   getActiveEncounters() {
      const encounters = game.combats;
      const activeEncounters = new Map();
      for (const [
         key, encounter
      ] of encounters.entries()) {
         if (encounter.round > 0) {
            activeEncounters.set(key, encounter);
         }
      }
      log.debug(activeEncounters);
      return activeEncounters;
   }

   /**
    * List currently viewed encounter.
    *
    * @function
    *
    * @returns {game.combat} - Returns the currently viewed encounter
    */
   getCurrentEncounter() {
      log.debug(game.combat);
      return game.combat;
   }

}