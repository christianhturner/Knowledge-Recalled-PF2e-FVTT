import { KnowledgeRecalled } from "../KnowledgeRecalled";
import { NPCManager } from "../control/NPCManager";
import { EncounterManager } from "../control/EncounterManager";
import { CONSTANTS } from "../constants/constants";
import { ViewManager } from "../control/ViewManager";

/**
 * @typedef {Module & object} ThisModule
 * @property {API} public
 */

/**
 * @class
 */
export class API {
   constructor() {
      /** @type {ThisModule} */
      const moduleData = game.modules.get(CONSTANTS.moduleId);
      if (moduleData?.public) {
         return moduleData.public;
      }
      /**
       * @type {KnowledgeRecalled}
       */
      this.knowledgeRecalled = new KnowledgeRecalled();
      /**
       * @type {NPCManager}
       */
      this.npcManager = new NPCManager();
      /**
       * @type {EncounterManager}
       */
      this.encounterManager = new EncounterManager();
      /**
       * @type {ViewManager}
       */
      this.viewManager = new ViewManager();
   }
}
