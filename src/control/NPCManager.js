import { CONSTANTS } from "../constants/constants";
import { NPCModel } from "../models/NPCModel";
import { getActor } from "./utilities";


/**
 * @class
 *
 * @alias ui.KnowledgeRecalled.NPCManager
 *
 * @implements NPCModel
 */
export class NPCManager {
   constructor() {
      const moduleData = game.modules.get(CONSTANTS.moduleId);
      if (!moduleData?.public?.npcManager) {
         return this;
      }
      return moduleData.public.npcManager;
   }

   /**
    * Intnded to be called when Foundry is Ready i.e. Hooks.on Ready
    *
    * @function
    *
    * @static
    *
    * @description
    * Embeds the View Manger into the applications primary class which is embeded in Foundry's UI global variable.
    * Accessible at ui.KnowledgeRecalled.ViewManager
    */

   /**
    * Method to register new NPCs to the NPCManager by providing either an Actor Object or Actor.actorId string value
    *
    * @function
    *
    * @param {string | Actor } actorOrId
    *
    * @returns void 
    */

   /**
    * Method for returning the implementation of the NPCModel
    *
    * @function
    *
    * @param {Actor} actorId - ActorId for foundry Actor object
    *
    * @returns {NPCModel} - our custom Object
    */
   createNPCObject(actorId) {
      const actor = getActor(actorId);
      const NPCKRActor = new NPCModel(actor).init();
      return NPCKRActor;
   }

   /**
    * Method for returning Abilities ItemDocuments
    *
    * @function
    *
    * @param {MeleePF2e} meleePF2e - ability and attack ItemDocuments
    *
    * @returns {AbilityData}
    */
}