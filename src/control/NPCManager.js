import { NPCModel } from "../models/NPCModel";
import { getActor } from "./utilities";

export class NPCManager {
    constructor() {
        if (!ui.KnowledgeRecalled.NPCManager) {
            ui.KnowledgeRecalled.NPCManager = this;
        }
        return ui.KnowledgeRecalled.NPCManager;
    }

    /**
     * Intnded to be called when Foundry is Ready i.e. Hooks.on Ready
     * @method
     * @static
     * @description
     * Embeds the View Manger into the applications primary class which is embeded in Foundry's UI global variable.
     * Accessible at ui.KnowledgeRecalled.ViewManager
     */
    static _onReady() {
        ui.KnowledgeRecalled.NPCManager = new NPCManager;
    };

    /**
    * Method to register new NPCs to the NPCManager by providing either an Actor Object or Actor.actorId string value
    * @method
    * @param {string | Actor } actorOrId
    * @returns void 
    */

    /**
     * Method for returning the implementation of the NPCModel
     * @method
     * @param {Actor} actorId - ActorId for foundry Actor object
     * @returns {NPCModel} - our custom Object
     */
    createNPCObject(actorId) {
        const actor = getActor(actorId)
        const NPCKRActor = new NPCModel(actor).init();
        // console.debug(`KnowledgeRecalled CreateNPCObject Method`, NPCKRActor)
        return NPCKRActor;
    };

    /**
     * Method for returning Abilities ItemDocuments
     * @method
     * @param {MeleePF2e} meleePF2e - ability and attack ItemDocuments
     * @returns {AbilityData}
     */
}