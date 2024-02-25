import { CONSTANTS } from "../constants/constants";

/**
 * @function
 * A utility function that returns all active encounters registered in the combat tracker.
 */
export function getActiveEncounters() {
   const encounters = game.combats.combats;
   const activeEncounters = [];
   for (let index = 0; index < encounters.length; index++) {
      const testEncounter = encounters[index];
      if (testEncounter.isActive) {
         activeEncounters.push(testEncounter)
      }
   }
   if (activeEncounters.length != 0) {
      return activeEncounters;
   }
   console.error("No active encounters.");
};

/**
 * @function
 * A utility function that can take an array of actorIds and returns an array of 
 * actors from FoundryVTT.
 * @param {Array<string>} actorIds 
 */
export function getActors(actorIds) {
   const arrayOfActors = [];
   for (let index = 0; index < actorIds.length; index++) {
      const actorId = actorIds[index];
      arrayOfActors.push(game.actors.get(actorId));
   }
   console.log(arrayOfActors);
}

/**
 * @function
 * A utility function that extends the foundry built in function to return an
 * an actor from their actorId.
 * @param {string} actorId 
 */
export function getActor(actorId) {
   const actor = game.actors.get(actorId);
   console.log(actor);
   return actor;
}

/**
 * Gets the nested property value of an object
 * @function
 *
 * @param {object} obj - The object to get the property from
 * @param {string} path - The path to the property separated by dots
 * @returns {*} The property value
 */
export function getProperty(obj, path) {
   let keys = path.split('.');
   let result = obj;
   for (let key of keys) {
      result = result[key];
   }
   return result
};


/**
 * @function
 * A utility function to determine if Actor with matching name already exist.
 * @param {Actor} actor 
 *
 * @returns {boolean | undefined}
 */

export function checkForExistingActor(actor) {
   const actorsArray = game.actors;
   if (actorsArray.find(a => a.name === actor.name)) {
      console.debug(`${actor.name}: ${actor.id} already exist`);
      return actor.id;
   }
   return undefined
}

/**
 * @param object - Document object which the flag is stored.
 * @param flagPath - Path to the flag under the object.flags namespace.
 *
 * @example
 * removeFlag(actor, 'npcFlags.lowestSave.value');
 */
export function removeFlag(object, flagPath) {
   const flag = object.getFlag('fvtt-knowledge-recalled-pf2e', `${flagPath}`);
   if (flag) {
      object.unsetFlag('fvtt-knowledge-recalled-pf2e', `${flagPath}`);
      console.log(`Knowledge Recalled: Flag npcFlags.${flagPath} removed from ${object.name}`);
   }
   else {
      console.log(`Knowledge Recalled Flag npcFlags.${flagPath} does not exist on ${object.name}`);
   }
}