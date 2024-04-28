import { CONSTANTS } from "../constants/constants";
import { log } from "../lib/debugger";

/**
 * @exports
 *
 * @function
 *
 * @param {string} key - check constants/settings.js
 *
 * @returns {*}
 */
export function getSetting(key) {
   return game.settings.get(CONSTANTS.moduleId, key);
}

/**
 * @exports
 *
 * @function
 *
 * @param {string} key - key value for module settings.
 *
 * @param {string} value - value for the key being set.
 *
 * @returns {*}
 */
export function setSetting(key, value) {
   if (value === undefined) {
      const error = new Error("SetSetting | value must not be undefinied!");
      log.catchError("Error at line 31 `src/control/utilities`", error);
      throw error;
   }
   return game.settings.set(CONSTANTS.moduleId, key, value);
}

/**
 * @exports
 *
 * @param single
 * 
 * @function
 *
 * @param {string} id - Application ID you wish to find and render
 */
export function getActiveApps(id, single = false) {
   const apps = Object.values(ui.windows).filter((app) => app.id.startsWith(id) && app._state > Application.RENDER_STATES.CLOSED);
   if (single) {
      return apps?.[0] ?? false;
   }
   return apps;
}

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
         activeEncounters.push(testEncounter);
      }
   }
   if (activeEncounters.length !== 0) {
      return activeEncounters;
   }
   log.info("No active encounters.");
}

/**
 * @function
 * A utility function that can take an array of actorIds and returns an array of 
 * actors from FoundryVTT.
 *
 * @param {Array<string>} actorIds 
 */
export function getActors(actorIds) {
   const arrayOfActors = [];
   for (let index = 0; index < actorIds.length; index++) {
      const actorId = actorIds[index];
      arrayOfActors.push(game.actors.get(actorId));
   }
   log.log(arrayOfActors);
}

/**
 * @function
 * A utility function that extends the foundry built in function to return an
 * an actor from their actorId.
 *
 * @param {string} actorId 
 */
export function getActor(actorId) {
   const actor = game.actors.get(actorId);
   log.log(actor);
   return actor;
}

/**
 * Gets the nested property value of an object
 *
 * @function
 *
 * @param {object} obj - The object to get the property from
 *
 * @param {string} path - The path to the property separated by dots
 *
 * @returns {*} The property value
 */
export function getThisProperty(obj, path) {
   const keys = path.split('.');
   let result = obj;
   for (const key of keys) {
      result = result[key];
   }
   return result;
}


/**
 * @function
 * A utility function to determine if Actor with matching name already exist.
 *
 * @param {Actor} actor 
 *
 * @returns {boolean | undefined}
 */

/**
 *
 * @param actor
 *
 * @returns {string} actorId
 */
export function checkForExistingActor(actor) {
   const actorsArray = game.actors;
   if (actorsArray.find((a) => a.name === actor.name)) {
      log.debug(`${actor.name}: ${actor.id} already exist`);
      return actor.id;
   }
   return undefined;
}

/**
 * @param object - Document object which the flag is stored.
 *
 * @param flagPath - Path to the flag under the object.flags namespace.
 *
 * @example
 * removeFlag(actor, 'npcFlags.lowestSave.value');
 */
export function removeFlag(object, flagPath) {
   const flag = object.getFlag('fvtt-knowledge-recalled-pf2e', `${flagPath}`);
   if (flag) {
      object.unsetFlag('fvtt-knowledge-recalled-pf2e', `${flagPath}`);
      log.log(`Knowledge Recalled: Flag npcFlags.${flagPath} removed from ${object.name}`);
   } else {
      log.log(`Knowledge Recalled Flag npcFlags.${flagPath} does not exist on ${object.name}`);
   }
}