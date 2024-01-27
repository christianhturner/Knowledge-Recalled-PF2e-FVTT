import NPCModel from "../models/NPCModel";

export default class NPCManager {
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
    createNPCObject(actor) {
        const NPCKRActor = new NPCModel(actor);
        console.debug(`KnowledgeRecalled CreateNPCObject Method`, NPCKRActor)
        return NPCKRActor;
    }
}
