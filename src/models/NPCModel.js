import { dcByLevel, rarityMap } from "../constants/constants"
import { removeFlag } from "../control/data.js"
import { getActor, getProperty } from "../control/utilities";

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

    initializeFlags(actorOrId) {
        let actor;
        let actorId;
        if (typeof actorOrId === Actor) {
            actor = actorOrId;
            actorId = actor.id;
            if (!this.getActor(actorId)) {
                this.registerActor(actor);
            };
        }
        if (typeof actorOrId === "string") {
            if (!this.getActor(actorId)) {
                this.registerActor(actorOrId);
            }
            actorId = actorOrId;
            actor = getActor(actorOrId);
        };
        if (actor.type != 'npc') {
            return console.debug(`Actor is not of the NPC type.`);
        }
        if (this.getFlags(actorId)) {
            return console.debug(`Actor flags are already initialized for ${actorId}`, actor);
        }
        const flags = {
            actorID: actor.id,
            defaultDC: 0,
            modifiedDC: 0,
            baseCharacterInfo: {
                visibility: false,
                discoveredBy: '',
            },
            rarity: {
                visibility: false,
                discoveredBy: '',
            },
            privateInfo: {
                visibility: false,
                discoveredBy: '',
            },
            traits: {},
            armorClass: {
                visibility: false,
                discoveredBy: '',
            },
            fortSave: {
                visibility: false,
                discoveredBy: '',
            },
            willSave: {
                visibility: false,
                discoveredBy: '',
            },
            refSave: {
                visibility: false,
                discoveredBy: '',
            },
            lowestSave: {
                visibility: false,
                discoveredBy: '',
            },
            immunities: {},
            resistances: {},
            weaknesses: {},
            passiveAbilities: {},
            actionAbilities: {},
            spellAbilities: {},
            difficultyAdjustmentByPlayerId: {
                adjustment: {},
            }
        };
        this.setFlags(flags, actor);

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
    * method for taking Actor object and changes diff, and updating the flags accordingly, intended to be attached
    * to the updateActor hook, and returns both the actor and the diff.
    * @method
    * @param {Actor} actor - actor object, can resolve if string of id is passed
    * @param {Object} diff - value passed by the updateActor hook as a diff of the changed values.
    * @returns {void} Updates flags on object
    */
    updateDiff(actor, diff) {
        if (typeof actor === 'string') {
            try {
                actor = getActor(actor);
            } catch (error) {
                return console.error(`Invalid actor or actorId`, error)
            };
        };
        const actorId = actor.id;
        for (let [key, value] of Object.entries(diff)) {
            // If value is an object call recursively
            if (typeof value === 'object') {
                this.updateDiff(actor, value);
            } else {
                let flag = this.getFlags(actorId);
                if (flag[key]) {
                    flag.value = getProperty(actor, key);
                }
            }
        }


    }

    getFlags(actorId) {
        const actor = getActor(actorId);
        const flags = actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
        if (!flags) {
            console.debug('No flags initialized, please initialize this actor.')
        }
        else {
            return flags;
        }
    };

    /**
    * Method to set the flags on NPC Actor objects
    * @method
    * @param {Object} flags - flags listed in the initializeFlags methods
    * @param {Actor} actor - Foundry Actor object.
    */
    setFlags(flags, actor) {
        actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', flags);
        console.debug(`Set flags on ${actor.name}:`, flags, actor);
    }

    calculateDC() {

    };

    checkForDuplicate() {

    }

}
