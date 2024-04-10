import { getActor, getThisProperty } from "../control/utilities";


// If this is the manager, it should be independent of any actor, but we can register actors? and maybew
// look them up based on their actorID?
/**
 * NPCModel
 *
 * @class
 *
 * @property {actor} actor - Foundry actor object
 */
export class NPCModel {
   // hasn't been tested
   constructor(actor) {
      /** @type {Actor} */
      this.actor = actor;
      /** @type {NpcFlags} */
      this.flags = {};
   }
   /*
    * Maybe the object itself should appear as object = {
    * actor: { PF2E Actor Object },
    * flags: { flags },
    *
    * TODO: IDEA
    * When we are working on the actual object itself we can reference the actor on the object
    * and the flags will apear under the actor key as well, but that represents the flags when 
    * stored on the object in the database at rest. When we are working the object during `edit`
    * we fetch that and store it at the top level of the object. Then our Set flags method can
    * simply merge down the flags at the top level into the actual actor object to be written to the
    * database.
    * }
    */

   /*
    * TODO: Maybe we should remove the static nature of the createAbilitiyItems??? I do think we
    * may need a static method getActor, which will provide a means to get an Actorby ID, and 
    * return the object we are pondering above. Then that could have the create done on itself
    * and then simply stored inside of the this.flags.
    */

   init() {
      if (this.actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags')) {
         this.flags = this.actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      } else {
         this.initializeFlags();
         /** @type {Array<object>} */
         const attacks = this.actor.items.filter((item) => item.type === 'melee');

         /** @type {Array<object>} */
         const actions = this.actor.items.filter((item) => item.type === 'action');

         /** @type {Array<object>} */
         const spells = this.actor.items.filter((item) => item.type === 'spell');

         if (attacks) {
            attacks.forEach((attack) => {
               this.constructAttacksFlags(attack);
            });
         }
         if (actions) {
            actions.forEach((action) => {
               this.constructAbilitiesFlags(action);
            });
         }
         if (spells) {
            spells.forEach((spell) => {
               this.constructSpellFlags(spell);
            });
         }
      }
      return this;
      /*
      if (this.getFlags(this.actor.id)) {
          return this;
      } else {
          this.initializeFlags(actor);
          console.debug(this);
          return this;
      }
      */
   }

   /**
    * @function
    *
    * @returns {void}
    *
    * @private
    */
   initializeFlags() {
      if (this.actor.type !== 'npc') {
         return console.debug(`Actor is not of the NPC type.`);
      }
      this.flags = {
         actorID: this.actor.id,
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
         attacks: [],
         passiveAbilities: [],
         actionAbilities: [],
         spellAbilities: [],
         difficultyAdjustmentByPlayerId: new Map(),
      };
   }


   /**
    * @function
    *
    * @param {Actor.id} actorOrId - Id for the Actor document
    * 
    * @returns {void | NpcFlags} - flags which make up the NPCModel data
    */
   getFlags(actorOrId) {
      let actor;
      let actorId;
      if (typeof actorOrId === 'string') {
         actorId = actorOrId;
         actor = game.actors.get(actorId);
      } else {
         actor = actorOrId;
         actorId = actor.id;
      }
      const flags = this.actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      if (!flags) {
         console.debug('No flags initialized, please initialize this actor.');
      } else {
         return flags;
      }
   }

   /**
    * Method to set the flags on NPC Actor objects
    *
    * @param actor - Foundry actor object
    *
    * @param KRObject - this object
    *
    * @function
    *
    * @returns {Promise<any>} - Returns document promise
    */
   async setFlags() {
      try {
         await this.actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', this.flags);
         console.info(`Set flags on ${this.actor.name}:`, this.flags, this.actor);
      } catch (error) {
         console.error(`Failed to update actor: {'${this.actor.id}: ${this.actor.name}'}`, error);
      }
   }

   /**
    * Method for constructing flags for attacks. In pathfinder, this includes Attacks, abilities, passive abilities, and spells/rituals.
    * Expected as a response of the updateActors Hook.
    *
    * @function
    *
    * @param {MeleePF2e} meleePf2e - Returned from PreCreateItem Hook value[0] in the array
    */
   constructAttacksFlags(meleePf2e) {
      const id = meleePf2e.id;
      if (this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} already exists`);
         return;
      }
      const visibility = false;
      const gmDescription = '';
      const discoveredBy = '';
      const name = meleePf2e.name;
      let type;
      if (meleePf2e.isMelee) {
         type = 'melee';
      }
      if (meleePf2e.isRanged || meleePf2e.isThrown) {
         type = 'ranged';
      }
      const data = {
         name,
         type,
         gmDescription,
         visibility,
         discoveredBy
      };
      // map does not work, throws an iterator error. This may be fine though
      // previously `const abilityData = new Map(id, data);`
      const abilityData = [
         id, data
      ];
      console.info(`Knowledge Recalled new attack property link created for ${id}, ${name}`,
         abilityData);
      this.flags.attacks.push(abilityData);
      // need to determin if we will set this, or hand
   }
   /**
    * Method for constructing flags for abilities. In pathfinder, this includes Attacks, abilities, passive abilities, and spells/rituals.
    * Expected as a response of the updateActors Hook.
    *
    * @function
    *
    * @param {AbilityItemPF2e} abilityItemPF2e - Returned from PreCreateItem Hook value[0] in the array
    */
   constructAbilitiesFlags(abilityItemPF2e) {
      const id = abilityItemPF2e.id;
      if (this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} already exists`);
         return;
      }
      const visibility = false;
      const gmDescription = '';
      const discoveredBy = '';
      const name = abilityItemPF2e.name;
      let isPassive = false;
      if (!abilityItemPF2e.actionCost) {
         isPassive = true;
      }
      const data = {
         name,
         isPassive,
         gmDescription,
         visibility,
         discoveredBy
      };
      // map does not work, throws an iterator error. This may be fine though
      // previously `const abilityData = new Map(id, data);`
      const abilityData = [
         id, data
      ];
      console.info(`Knowledge Recalled new ability property link created for ${id}, ${name}`,
         abilityData);
      this.flags.actionAbilities.push(abilityData);
      // need to determin if we will set this, or hand
   }
   /**
    * Method for constructing flags for abilities. In pathfinder, this includes Attacks, abilities, passive abilities, and spells/rituals.
    * Expected as a response of the updateActors Hook.
    *
    * @function
    *
    * @param {SpellItemPF2e} spellItemPF2e - Returned from PreCreateItem Hook value[0] in the array
    */
   constructSpellFlags(spellItemPF2e) {
      const id = spellItemPF2e.id;
      if (this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} already exists`);
         return;
      }
      const visibility = false;
      const gmDescription = '';
      const discoveredBy = '';
      const name = spellItemPF2e.name;
      const isConsumable = spellItemPF2e.isFromConsumable;
      const data = {
         name,
         isConsumable,
         gmDescription,
         visibility,
         discoveredBy
      };
      // map does not work, throws an iterator error. This may be fine though
      // previously `const abilityData = new Map(id, data);`
      const abilityData = [
         id, data
      ];
      console.info(`Knowledge Recalled new ability property link created for ${id}, ${name}`,
         abilityData);
      this.flags.spellAbilities.push(abilityData);
      // need to determin if we will set this, or hand
   }

   /**
    * Method to delete Attacks
    *
    * @function
    *
    * @param {MeleePF2e} meleePf2e - Returned from DeleteItem Hook value[0] in the array
    */
   deleteAttackFlags(meleePf2e) {
      const id = meleePf2e.id;
      if (!this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} doesn't exist please debug.`);
         return;
      }
      const filteredAttacks = this.flags.attacks.filter(([k]) => k !== id);
      this.flags.attacks = filteredAttacks;
   }
   /**
    * Method for updating Attacks
    *
    * @function
    *
    * @param {MeleePF2e} meleePf2e - Returned from UpdateCreateItem Hook value[0] in the array
    */
   updateAttacksFlags(meleePf2e) {
      const id = meleePf2e.id;
      if (!this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} doesn't exit please debug.`);
         return;
      }
      const name = meleePf2e.name;
      let type;
      if (meleePf2e.isMelee) {
         type = 'melee';
      }
      if (meleePf2e.isRanged || meleePf2e.isThrown) {
         type = 'ranged';
      }
      const tempData = {
         name,
         type,
      };
      // debug found error here
      const existingData = this.flags.attacks.find((item) => item[0] === id)[1];
      const mergedData = { ...existingData, ...tempData };
      this.flags.attacks = this.flags.attacks.map((item) => {
         if (item[0] === id) {
            return [
               id, mergedData
            ];
         }
         return item;
      });
      console.info(`Knowledge Recalled updated ability ${id}, ${name}`, mergedData);
   }

   /**
    * Method for checking against a map for a duplicate.
    *
    * @private
    * @param {string} documentId - Actor object we are checking for duplicate
    *
    * @param {string} property - Starting at the Actor, the dot notation path to the item
    *
    * @returns {boolean} - Returns true or false as to whether or not this documentId representation already exist.
    */
   checkForDuplicateDocuments(documentId, property) {
      /**
       @typedef {Array<string, object>} propertyCollection /*
      /** @type{Array<propertyCollection>}
       */
      const prop = this.flags[property];
      if (prop.length === 0) {
         return false;
      }
      const duplicateFlag = prop.some((item) => item[0].includes(documentId));
      if (duplicateFlag) {
         console.info(`Document with ${documentId} already exist`);
         return true;
      } else {
         return false;
      }

   }

   calculateDC() {

   }


}

/**
 * @typedef {{img: string, name: string, id: string, system: object, type: string, isMelee: boolean, isRanged: boolean, isThrown: boolean, description: string}} MeleePF2e
 * Item document for abilities, attacks, and passive abilities for the pathfinder2e system. @link https://github.com/foundryvtt/pf2e/blob/acd79e87c94b24b79d23ce7edb9ce4a027ffc636/src/module/item/melee/document.ts#L14
 */

/**
 * @typedef {{img: string, name: string, id: string, system: object, type: string, description: string, actionCost:
 * undefined|object} AbilityItemPF2e
 * AbilityItems document from the pathfinder 2e system.
 */

/**
 * @typedef {{img: string, name: string, id: string, system: object, type: string, description: string, actionCost: undefined|object, isFromConsumable: boolean}} SpellItemPF2e
 * SpellItems document from the pathfinder 2e system.
 */

/**
 * @typedef abilityData
 *
 * @type {object}
 * @param {string} name
 *
 * @param {string} type
 *
 * @param {string} description
 *
 * @param {string} gmDescription
 *
 * @param {boolean} visibility
 *
 * @param {string} discoveredBy
 */

/**
 * @typedef AbilityData
 *
 * @type {Map<string, abilityData>}
 */


/**
 * @typedef NpcFlags - data object that represnts our data for NPCs
 *
 * @type {object}
 * @property {string} actorId - document Id for foundry's actor document
 *
 * @property {number} defaultDC - our calculation for enemies default DC
 *
 * @property {number} modifiedDC - modifiedDC for when things change; may remove
 *
 * @property {basicNpcEntry} baseCharacterInfo - visibility entry for things like name, descr, etc
 *
 * @property {basicNpcEntry} rarity - rarity value of the creature
 *
 * @property {basicNpcEntry} privateInfo - PrivateInformation typically only available to gm
 *
 * @property {arrayOfNpcTraitEntries} traits - array of traits
 *
 * @property {basicNpcEntry} armorClass - values for armor class
 *
 * @property {basicNpcEntry} fortSave - values for fort save
 *
 * @property {basicNpcEntry} willSave - values for will save
 *
 * @property {basicNpcEntry} refSave - values for ref save
 *
 * @property {lowestSave} lowestSave - value for lowestSave
 *
 * @property {arrayOfNpcTraitEntries} immunities - array of immunities
 *
 * @property {arrayOfNpcTraitEntries} resistances - array of resistances
 *
 * @property {arrayOfNpcTraitEntries} weaknesses - array of weaknesses
 *
 * @property {Map} attacks - map of attacks
 *
 * @property {Map} passiveAbilities - map of passiveAbilities
 *
 * @property {Map} actionAbilities - map of actionAbilities
 *
 * @property {Map} spellAbilities - map of spell abilities
 *
 * @property {Map} difficultyAdjustmentByPlayerId - map of difficultyAdjustmentByPlayerId
 */

/**
 * @typedef basicNpcEntry - simple entry representing visibility and discoveredBy
 *
 * @type {object}
 * @property {boolean} visibility - determines whether this can be seen by player
 *
 * @property {string} discoveredBy - record of which player discovered this value
 */

/**
 * @typedef npcTraitEntry - entry representing visibility and discovered by for array of traits
 *
 * @type {object}
 * @property {string} trait - trait name value; set list from pf2e system
 *
 * @property {basicNpcEntry} value - visibility and discovered by for each trait
 */

/**
 * @typedef arrayOfNpcTraitEntries - array of trait entries
 *
 * @type {Array}
 * @property {npcTraitEntry} traits - array of trait entries
 */

// TODO: Investigate the event where items are created, I noticed that we are creating every item
// which may be okay, but if their is a more effecient way lets try and use that. Let's inspect what
// events occur when an item is created, edited, and deleted and see if we can hone in on something that
// is more specific with the Actor itself.
//
// TODO: Let's investigate the observer pattern for keeping the store and the data at rest in sync
