import { dcByLevel, rarityMap } from "../constants/constants"
import { removeFlag } from "../control/data.js"
import { getActor } from "../control/utilities";

// If this is the manager, it should be independent of any actor, but we can register actors? and maybew
// look them up based on their actorID?

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
    }

    initializeFlags() {

    };

    registerActor(actorOrId) {
        let actor;
        let actorId;
        if (typeof actorOrId === "object") {
            actor = actorOrId;
            actorId = actor.actorId;
        } else {
            actorId = actorOrId;
            actor = getActor(actorId);
        };

        if (!actor) {
            console.debug(`Knowledge Recalled: registerActor error, ${actorOrId} is not valid.
            Ensure you passed either the actor object or actorId.
            `, actorOrId)
        };

        if (this.npcActors.has(actorId)) {
            console.log("Knowledge recalled: registerActor Notice, ${actor.name} is already registered.", actorOrId);
        }

        this.npcActors.set(actor.id, actor);

    }

    getFlags() {

    };

    setFlags() {

    }

    calculateDC() {

    };

    checkForDuplicate() {

    }

}
