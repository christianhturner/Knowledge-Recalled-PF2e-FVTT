import { dcByLevel, rarityMap } from "../constants/constants.js";
import { removeFlag } from "../control/data.js";

/**
 * Class to represent the NPCModel
 *
 * @class
 */
export default class NPCModel
{
   /**
    * Create an instance of NPCModel
    *
    * @constructor
    *
    * @param {Actor} actor - the actor object to be processed
    */
   constructor(actor)
   {
      /**
       * The actor object
       *
       * @type {Actor}
       */
      this.actor = actor;
      this.flags = {};
      const npcFlags = actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      if (npcFlags)
      {
         this.flags = npcFlags;
      }
      else
      {
         this.initializeFlags(actor);
      }
   }

   /**
    * Creates the Foundry flags on the NPC Actor object.
    *
    * @private
    */
   initializeFlags()
   {
      // {param} actor - Actor
      const actor = this.actor;
      this.flags = {
         initialized: false,
         actorID: actor.id,
         defaultDC: 0,
         modifiedDC: 0,
         baseCharacterInfo: {
            name: actor.name,
            size: actor.size,
            creatureType: actor.system.details.creatureType,
            alliance: actor.alliance,
            actorImg: actor.img,
            description: actor.description,
            visibility: false,
            discoveredByPC: "",
         },
         rarity: {
            value: actor.rarity,
            visibility: false,
            discoveredByPC: "",
         },
         privateInfo: {
            privateDescription: actor.system.details.privateNotes,
            CR: this.actor.level,
            visibility: false,
         },
         traits: this.ConvertArrayToVisibilityMap(this.actor.traits),
         armorClass: {
            value: actor.attributes.ac.value,
            visibility: false,
            discoveredByPC: "",
         },
         fortSave: {
            value: actor.saves.fortitude.dc.value,
            visibility: false,
            discoveredByPC: "",
         },
         refSave: {
            value: actor.saves.reflex.dc.value,
            visibility: false,
            discoveredByPC: "",
         },
         willSave: {
            value: actor.saves.will.dc.value,
            visibility: false,
            discoveredByPC: "",
         },
         lowestSave: {
            lowestSaveValue: [],
            visibility: false,
            discoveredByPC: "",
         },
         immunities: this.ConvertNestedPropertiesOfArraysToVisibilityObject(actor.attributes.immunities, "type"),
         resistance: this.ConvertNestedPropertiesOfArraysToVisibilityObject(actor.attributes.resistances, "type"),
         weaknesses: this.ConvertNestedPropertiesOfArraysToVisibilityObject(actor.attributes.weaknesses, "type"),
         passiveAbilities: [],
         actionAbilities: [],
         attackAbilities: [],
         spellAbilities: [],
         difficultyAdjustmentByPlayerID: {
            adjustment: new Map(),
         },
      };
      this.prepareAbilities(actor);

      if (this.actor.type === "npc")
      {
         const existingFlags = this.actor.getFlag("fvtt-knowledge-recalled-pf2e", "npcFlags");
         const mergedFlags = { ...existingFlags, ...this.flags };
         this.actor.setFlag("fvtt-knowledge-recalled-pf2e", "npcFlags", mergedFlags).then(() => console.log(`Knowledge Recalled: NPC finished Initializing`));
      }
   }

   /**
    * Converts an array of objects to an array of objects with a visibility property.
    * @param pathToConvert
    * @returns {[]}
    * @private
    * @constructor
    */
   ConvertArrayToVisibilityMap(pathToConvert)
   {
      const actorArrayObjectsPath = pathToConvert;
      // if (!actorArrayObjectsPath)
      // {
      //    return [];
      // }
      const arrayOfActorObjects = [];
      for (const actorObjects of actorArrayObjectsPath)
      {
         arrayOfActorObjects.push({ value: actorObjects, visibility: false, discoveredByPC: "" });
      }
      return arrayOfActorObjects;
   }
   ConvertNestedPropertiesOfArraysToVisibilityObject(pathToConvert, property)
   {
      if (!pathToConvert)
      {
         return [];
      }
      const actorArrayObjectsPath = pathToConvert;
      const arrayOfActorObjects = [];
      for (const actorObjects of actorArrayObjectsPath)
      {
         arrayOfActorObjects.push({ value: actorObjects?.[property], visibility: false, discoveredByPC: "" });
      }
      return arrayOfActorObjects;
   }

   /**
    * Initializes passive abilities, action abilities, attack abilities, and spell abilities.
    * @returns {void} - Sets the values inside the object flag.
    * @private
    */
   prepareAbilities(actor)
   {
      const { flags } = this;
      const actionAbilities = flags.actionAbilities || [];
      const passiveAbilities = flags.passiveAbilities || [];
      const attackAbilities = flags.attackAbilities || [];
      const spellAbilities = flags.spellAbilities || [];

      const actions = actor.items.filter((item) => item.type === "action");
      const attacks = actor.items.filter((item) => item.type === "melee");
      const spells = actor.items.filter((item) => item.type === "spell" || item.type === "ritual");

      for (const action of actions)
      {
         if (action.system.actionType.value === "passive")
         {
            let existingAbility = passiveAbilities.find((ability) => ability.value === action.name);
            if (existingAbility)
            {
               existingAbility = { ...existingAbility, gmDescription: action.gmDescription };
            }
            else
            {
               existingAbility = { value: action.name, gmDescription: action.gmDescription, visibility: false, discoveredByPC: "" };
               passiveAbilities.push(existingAbility);
            }
            existingAbility.visibility = false; // Set visibility to false for newly added abilities
         }
         else
         {
            let existingAbility = actionAbilities.find((ability) => ability.value === action.name);
            if (existingAbility)
            {
               existingAbility = { ...existingAbility, gmDescription: action.gmDescription };
            }
            else
            {
               existingAbility = { value: action.name, gmDescription: action.gmDescription, visibility: false, discoveredByPC: "" };
               actionAbilities.push(existingAbility);
            }
            existingAbility.visibility = false; // Set visibility to false for newly added abilities
         }
      }

      for (const attack of attacks)
      {
         let attackType = "other";
         if (attack.isMelee)
         {
            attackType = "melee";
         }
         else if (attack.isRanged || attack.isThrown)
         {
            attackType = "ranged";
         }

         let existingAbility = attackAbilities.find((ability) => ability.value === attack.name);
         if (existingAbility)
         {
            existingAbility = { ...existingAbility, attackType, gmDescription: attack.gmDescription };
         }
         else
         {
            existingAbility = { value: attack.name, attackType, gmDescription: attack.gmDescription, visibility: false, discoveredByPC: "" };
            attackAbilities.push(existingAbility);
         }
         existingAbility.visibility = false; // Set visibility to false for newly added abilities
      }

      for (const spell of spells)
      {
         let existingAbility = spellAbilities.find((ability) => ability.value === spell.system.slug);
         if (existingAbility)
         {
            existingAbility = { ...existingAbility, tradition: spell.system.tradition, gmDescription: spell.gmDescription };
         }
         else
         {
            existingAbility = { value: spell.system.slug, tradition: spell.system.tradition, gmDescription: spell.gmDescription, visibility: false, discoveredByPC: "" };
            spellAbilities.push(existingAbility);
         }
         existingAbility.visibility = false; // Set visibility to false for newly added abilities
      }

      flags.actionAbilities = actionAbilities;
      flags.passiveAbilities = passiveAbilities;
      flags.attackAbilities = attackAbilities;
      flags.spellAbilities = spellAbilities;
   }

   /**
    * Determines the lowest save value from this.willSave, this.fortSave, and this.refSave.
    *
    * @returns {string[]} - an array of the lowest save(s) value(s)
    */
   getLowestSave()
   {
      const flags = this.flags;
      const fortitudeSaveValue = flags.fortSave.value;
      const willSaveValue = flags.willSave.value;
      const reflexSaveValue = flags.refSave.value;
      const lowestSave = Math.min(fortitudeSaveValue, willSaveValue, reflexSaveValue);
      const lowestSavesArray = [];

      removeFlag(this.actor, lowestSave.lowestSaveValue);

      if (fortitudeSaveValue === lowestSave)
      {
         lowestSavesArray.push("fortitude");
      }
      if (willSaveValue === lowestSave)
      {
         lowestSavesArray.push("will");
      }
      if (reflexSaveValue === lowestSave)
      {
         lowestSavesArray.push("reflex");
      }
      return lowestSavesArray;
   }

   /**
    * Determines the base DC for the NPC based on the NPC's CR and rarity. This value will further increase and decrease
    * based on the skill the player uses for the check and the number of subsequent attempts made.
    * @returns {number} - the base DC for the NPC
    */
   getBaseDC()
   {
      const flags = this.flags;
      const CR = flags.privateInfo.CR;
      const rarity = flags.rarity.value;
      const adjustDCByRarity = rarityMap.get(rarity);
      const DCFromCR = dcByLevel.get(CR);

      return (flags.defaultDC = DCFromCR + adjustDCByRarity);
   }

   /**
    * Processes the values which must wait until the actor is fully initialized.
    *
    * @returns {void} - Sets the values inside the object flag.
    *
    */
   processValues()
   {
      const lowestSave = this.getLowestSave();
      const baseDC = this.getBaseDC();
      const newFlags = {
         initialized: true,
         lowestSave: {
            lowestSaveValue: lowestSave,
         },
         defaultDC: baseDC,
         // traits: [
         //    traits,
         // ],
      };
      if (!this.flags.initialized)
      {
         try
         {
            this.updateFlags(newFlags).then((r) => console.log(`Knowledge Recalled: flags updated${r}`));
         }
         catch (error)
         {
            console.log(`Knowledge Recalled: ${error}`);
         }
      }
   }

   /**
    * Updates and sets Foundry flags when you wish to commit your changes.
    * You should pass the newFlags as a variable, and it will merge and set the new flags.
    * @param {object} newFlags - the new flags to be merged and set
    * @returns {Promise} - Sets the values inside the object flag.
    * @example
    * const newFlags = {
    *   actorID: this.actor.id,
    *   defaultDC: 0,
    *   modifiedDC: 0,
    *   baseCharacterInfo: {
    *    name: this.actor.name,
    *    alliance: this.actor.alliance,
    *    actorImg: this.actor.img,
    *    description: this.actor.description,
    *   ...
    *    }
    *   }
    *   await this.updateFlags(newFlags).then(() => console.log("Flags updated!"));
    *   or
    *   await this.updateFlags(newFlags);.then() => {).catch((error) => console.log(error);});
    */
   updateFlags(newFlags)
   {
      const mergedFlags = { ...this.flags, ...newFlags };
      return this.actor.setFlag(
       'fvtt-knowledge-recalled-pf2e',
       'npcFlags',
       mergedFlags
      );
   }

   /**
    * Toggles invisibility for the various flags that track player visibility.
    *
    * @param {string} propertyPath - starting at the root of the 'npcFlags' object.
    * @returns {Promise} - Toggles visibility {boolean} for the flag.
    * @example
    * await this.toggleVisibility('baseCharacterInfo.visibility');
    *
    */
   toggleVisibility(propertyPath)
   {
      const properties = propertyPath.split('.');
      let currentObject = this.flags;

      for (const property of properties)
      {
         if (Object.hasOwn(currentObject, property))
         {
            currentObject = currentObject[property];
         }
         else
         {
            console.error(`Knowledge Recalled: Invalid property path: ${propertyPath}`);
            // noinspection JSValidateTypes
            return;
         }
      }

      if (typeof currentObject.visibility === 'boolean')
      {
         currentObject.visibility = !currentObject.visibility;
         this.actor.setFlag('fvtt-knowledge-recalled-pf2e',
          'npcFlags',
          this.flags
         )
         .then(() =>
         {
            console.log(`Knowledge Recalled: Visibility toggled successfully for property: ${propertyPath}`);
         })
         .catch((error) =>
         {
            console.error(`Knowledge Recalled: Failed to toggle visibility for property: ${propertyPath}`, error);
         });
      }
      else
      {
         console.error(`Knowledge Recalled: Invalid visibility property: ${propertyPath}`);
      }
   }
   checkForChangesOnUpdate(actor)
   {
      const existingFlags = this.actor.getFlag("fvtt-knowledge-recalled-pf2e", "npcFlags");
      if (existingFlags)
      {
         // Exclude visibility properties from the existingFlags object
         const updatedFlags = Object.entries(existingFlags).reduce((flags, [key, value]) =>
         {
            if (!key.endsWith(".visibility"))
            {
               flags[key] = value;
            }
            return flags;
         }, {});

         // Repopulate the values that have path declarations
         updatedFlags.baseCharacterInfo.name = actor.name;
         updatedFlags.baseCharacterInfo.creatureType = actor.system.details.creatureType;
         updatedFlags.baseCharacterInfo.alliance = actor.alliance;
         updatedFlags.baseCharacterInfo.actorImg = actor.img;
         updatedFlags.baseCharacterInfo.description = actor.description;
         updatedFlags.rarity.value = actor.rarity;
         updatedFlags.privateInfo.privateDescription = actor.system.details.privateNotes;
         updatedFlags.privateInfo.CR = actor.level;
         // need to do traits once this works

         updatedFlags.armorClass.value = actor.attributes.ac.base;
         updatedFlags.fortSave.value = actor.saves.fortitude.dc.value;
         updatedFlags.refSave.value = actor.saves.reflex.dc.value;
         updatedFlags.willSave.value = actor.saves.will.dc.value;
         // Repopulate other values as needed...

         this.flags = updatedFlags;
         if (this.actor.type === "npc")
         {
            this.actor.setFlag("fvtt-knowledge-recalled-pf2e", "npcFlags", this.flags)
            .then(() => this.processValues())
            .catch((error) => console.error("Knowledge Recalled: Failed to set flags:", error));
         }
      }
      else
      {
         this.initializeFlags();
      }
   }
}

