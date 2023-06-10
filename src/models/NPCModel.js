import { dcByLevel, rarityMap } from "../constants/constants.js";
import {removeFlag} from "../control/data.js";

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
            creatureType: actor.system.details.creatureType,
            alliance: actor.alliance,
            actorImg: actor.img,
            description: actor.description,
            visibility: false,
         },
         rarity: {
            value: actor.rarity,
            visibility: false,
         },
         privateInfo: {
            privateDescription: actor.system.details.privateNotes,
            CR: this.actor.level,
            visibility: false,
         },
         traits: [],
         armorClass: {
            value: actor.attributes.ac.base,
            visibility: false,
         },
         fortSave: {
            value: actor.saves.fortitude.dc.value,
            visibility: false,
         },
         refSave: {
            value: actor.saves.reflex.dc.value,
            visibility: false,
         },
         willSave: {
            value: actor.saves.will.dc.value,
            visibility: false,
         },
         lowestSave: {
            lowestSaveValue: [],
            visibility: false,
         },
         immunities: {
            value: new Map(),
         },
         resistance: {
            value: new Map(),
         },
         weaknesses: {
            value: new Map(),
         },
         passiveAbilities: {
            value: new Map(),
         },
         difficultyAdjustmentByPlayerID: {
            adjustment: new Map(),
         },
      };
      console.log(`flaged actor ${JSON.stringify(actor.traits)}`);

      if (this.actor.type === "npc")
      {
         console.log(`flaged actor ${JSON.stringify(actor.traits)}`);
         const existingFlags = this.actor.getFlag("fvtt-knowledge-recalled-pf2e", "npcFlags");
         const mergedFlags = { ...existingFlags, ...this.flags };
         this.actor.setFlag("fvtt-knowledge-recalled-pf2e", "npcFlags", mergedFlags).then(() => console.log(`flaged actor ${JSON.stringify(actor.traits)}`));
      }
   }

   ConvertArrayToVisibilityMap(pathToConvert)
   {
      const traits = pathToConvert;
      const traitArray = [];
      for (const trait of traits)
      {
         traitArray.push({ value: trait, visibility: false });
      }
      return traitArray;
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
      const traits = this.ConvertArrayToVisibilityMap(this.actor.traits);
      const newFlags = {
         initialized: true,
         lowestSave: {
            lowestSaveValue: lowestSave,
         },
         defaultDC: baseDC,
         traits: [
            traits,
         ],
      };

      if (!this.flags.initialized)
      {
         try
         {
            this.updateFlags(newFlags).then((r) => console.log(r));
         }
         catch (error)
         {
            console.log(error);
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
            console.error(`Invalid property path: ${propertyPath}`);
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
            console.log(`Visibility toggled successfully for property: ${propertyPath}`);
         })
         .catch((error) =>
         {
            console.error(`Failed to toggle visibility for property: ${propertyPath}`, error);
         });
      }
      else
      {
         console.error(`Invalid visibility property: ${propertyPath}`);
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
         .catch((error) => console.error("Failed to set flags:", error));
      }
   }
      else
      {
         this.initializeFlags();
      }
   }
}
