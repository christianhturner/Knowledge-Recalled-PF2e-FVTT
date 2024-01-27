import NPCModel from "../models/NPCModel";

export default class NPCManager {
    constructor() {
        if (!ui.KnowledgeRecalled.NPCManager) {
            ui.KnowledgeRecalled.NPCManager = this;
            this.npcActors = new Map();
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
    registerActor(actorOrId) {
        let actor;
        let actorId;
        if (typeof actorOrId === Actor) {
            actor = actorOrId;
            actorId = actor.id;
        } else {
            actorId = actorOrId;
            actor = getActor(actorId);
        };

        if (!actor) {
            return console.debug(`Knowledge Recalled: registerActor error, ${actorOrId} is not valid.
            Ensure you passed either the actor object or actorId.
            `, actorOrId)
        };

        if (!actor.type == 'npc') {
            return console.log(`The actor provided is not an NPC`);
        }

        if (this.npcActors.has(actorId)) {
            return console.log("Knowledge recalled: registerActor Notice, ${actor.name} is already registered.", actorOrId);
        }

        this.npcActors.set(actor.id, actor);

    };
    /**
    * Method that returns an actor object that exist and is stored on the object.
    * @method
    * @param {string} actorId - ActorId for foundry Actor object
    * @returns {Actor | undefined}
    */
    getActor(actorId) {
        let actor;
        if (!this.npcActors.get(actorId)) {
            console.debug(`Knowledge Recalled: getActor can't find ${actorId}`);
        }
        actor = this.npcActors.get(actorId);
        return actor;
    };

    /**
     * Method for returning the implementation of the NPCModel
     * @method
     * @param {Actor} actorId - ActorId for foundry Actor object
     * @returns {NPCModel} - our custom Object
     */
    createNPCObject(actor) {
        return new NPCModel(actor);
    }
}
