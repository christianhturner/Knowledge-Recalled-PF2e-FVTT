import { dcByLevel, rarityMap } from "../constants/constants"
import { removeFlag } from "../control/data.js"
import { getActor, getProperty } from "../control/utilities";

// If this is the manager, it should be independent of any actor, but we can register actors? and maybew
// look them up based on their actorID?
export default class NPCModel {
    // hasn't been tested
    constructor(actorId) {
        const actor = getActor(actorId);
        if (this.getFlags(actorId)) {
            this = actor;
            console.debug(this);
            return this;
        } else {
            this.initializeFlags(actor);
            this = actor;
            console.debug(this);
            return this;
        }
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
    };

    /**
     * Method for return flags on an actor Object.
     * @method
     * @param {Actor.id} actorId
     * @returns {flags}
     */
    getFlags(actorOrId) {
        let actor;
        let actorId
        if (typeof actorOrId === 'string') {
            actorId = actorId;
            actor = game.actors.get(actorId);
        } else {
            actor = actorOrId;
            actorId = actor.id;
        }
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
    };

    /**
    * Method for constructing flags for abilities. In pathfinder, this includes Attacks, abilities, passive abilities, and spells/rituals.
    * Expected as a response of the updateActors Hook.
    * @method
    * @param {MeleePF2e} meleePf2e - Returned from PreCreateItem Hook value[0] in the array
    * 
    */
    constructAbilitiesFlags(meleePf2e) {
        const id = meleePf2e.id;
        let type;
        if (meleePf2e.isMelee) {
            type = 'melee';
        }
        if (meleePf2e.isRanged || meleePf2e.isThrown) {
            type = 'ranged';
        };


    };

    calculateDC() {

    };

    checkForDuplicate() {

    }

}

/**
 * @typedef {{img: string, name: string, id: string, system: object, type: string, isMelee: boolean, isRanged: boolean, isThrown: boolean, description: string}} MeleePF2e
 * Item document for abilities, attacks, and passive abilities for the pathfinder2e system. @link https://github.com/foundryvtt/pf2e/blob/acd79e87c94b24b79d23ce7edb9ce4a027ffc636/src/module/item/melee/document.ts#L14
 */
