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
         this.activeEncounters = this.listActiveEncounters();
         this.encounters = this.listAllEncounters();
         this.currentEncounter = this.listCurrentEncounter();
         return this;
      }
      return moduleData.public.encounterManager;
   }


   updateEncounters() {
      this.activeEncounters = this.listActiveEncounters();
      this.encounters = this.listAllEncounters();
      this.currentEncounter = this.listCurrentEncounter();
   }


   /**
    * List Foundry Encounters
    *
    * @function
    *
    * @returns {Array<game.combats>} - Returns an Array of encounters
    */
   listAllEncounters() {
      log.debug(game.combats);
      return game.combats;
   }
   /** 
    * List Active Foundry Encounters
    *
    * @function
    *
    * @returns {Array<game.combats.active} - Retuns an array of active encounters
    */
   // Fore each isn't working
   listActiveEncounters() {
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
   listCurrentEncounter() {
      log.debug(game.combat);
      return game.combat;
   }

}