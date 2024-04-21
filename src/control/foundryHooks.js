import { insertKnowledgeRecalledbuttons } from "../foundryUiOverrides";
import { checkForExistingActor } from "./utilities";
import { API } from "../API/api";
import { CONSTANTS } from "../constants/constants";
import { setupTests } from "../quench";
import { log } from "../lib/debugger";
import { registerSettings } from "../settings";

/** @type {import('../API/api').API} */
let Api;


// Parameter should be able to be checked within the module settings.
const devMode = true;

/**
 *
 */
export async function registerHooks() {
   Hooks.on("init", () => {
      registerSettings();
   });
   Hooks.on("ready", () => {
      const moduleData = game.modules.get(CONSTANTS.moduleId);
      const api = new API();
      // @ts-ignore
      moduleData.public = api;
      // @ts-ignore
      Object.freeze(moduleData.public);
      // @ts-ignore
      Api = moduleData.public;
   });
   // Development Hooks
   // -- Debugger
   if (devMode) {
      // -- Quench - testing framework
      setupTests();
   }

   Hooks.on("getSceneControlButtons", (controls) => {
      Api.viewManager.init();
      insertKnowledgeRecalledbuttons(controls);
   });
   Hooks.on("closeApplication", (app, html) => {
      if (devMode) {
         log.debug(`Here is the application`, app);
         log.debug(`Here is the html`, html);
      }
   });

   Hooks.on("createActor", (actor, changes, userId) => {
      checkForExistingActor(actor);
      if (devMode) {
         log.debug(actor, changes, userId);
      }
   });
   // Hook will be used for updating the data between actor document and the NPCModel flag store
   Hooks.on("updateActor", (actor, changes) => {
      if (devMode) {
         if (!changes) {
            log.debug("No changes occured.");
         }
         log.log("Update Actor", actor, changes);
      }
   });

   Hooks.on("createCombat", (encounter, changes) => {
      Api.encounterManager.updateEncounters();
      if (devMode) {
         log.debug("create combat.", encounter, changes);
      }
   });

   Hooks.on("deleteCombat", (encounter, changes) => {
      Api.encounterManager.updateEncounters();
      if (devMode) {
         log.debug("delete combat.", encounter, changes);
      }
   });

   Hooks.on("updateCombat", (encounter, changes) => {
      Api.encoutnerManager.updateEncounters();
      if (devMode) {
         log.debug("update combat.", encounter, changes);
      }
   });

   Hooks.on("combatStart", (round, turn) => {
      Api.encounterManager.updateEncounters();
      if (devMode) {
         log.debug("combat start.", round, turn);
      }
   });

   // See combatTurn to see more advanced eents if and when needed

   Hooks.on("createItem", (item, options, userId) => {
      /*
* We may instead want to do something like this:
* const item = item; so we can pass into the constructAbilitiesFlags
* const actorId = get this from the item
* We can then const actor = NPCManager.GetActor(actorId); returns NPCModel
* actor.constructAbilitiesFlags(item); Then we can more safely inject this into the model
*/

      const actorOwner = item.parent;
      if (actorOwner.type === "npc") {

         const actorId = actorOwner.id;
         const NpcActor = Api.npcManager.createNPCObject(actorId);

         switch (item.type) {
            case 'melee' || 'ranged':
               NpcActor.constructAttacksFlags(item);
               break;
            case 'spell':
               NpcActor.constructSpellFlags(item);
               break;
            case 'action':
               NpcActor.constructAbilitiesFlags(item);
               break;
         }
         NpcActor.setFlags();
         if (devMode) {
            log.debug(item, options, userId);
         }
      }

      // TODO:
      // - Create method for updating and preserving portions of the data that shouldn't change as long
      // as the ID remains the same.
   });

   Hooks.on("updateItem", (item, options, userId) => {
      const actorOwner = item.parent;
      if (actorOwner.type === "npc") {
         const actorId = actorOwner.id;
         const NpcActor = Api.npcManager.createNPCObject(actorId);
         switch (item.type) {
            case 'melee' || 'ranged':
               NpcActor.updateAttacksFlags(item);
               break;
            case 'spell':
               NpcActor.updateSpellFlags(item);
               break;
            case 'action':
               NpcActor.updateAbilityFlags(item);
               break;
         }
         NpcActor.setFlags();
      }
      if (devMode) {
         log.debug(item, options, userId);
         log.info(`Item ${item.name} created`);
      }
   });

   Hooks.on("deleteItem", (item, options, userId) => {
      const actorOwner = item.parent;
      if (actorOwner.type === "npc") {
         const actorId = actorOwner.id;
         const NpcActor = Api.npcManager.createNPCObject(actorId);
         switch (item.type) {
            case 'melee' || 'ranged':
               NpcActor.deleteAttackFlags(item);
               break;
            case 'spell':
               NpcActor.deleteSpellFlags(item);
               break;
            case 'action':
               NpcActor.deleteAbilityFlags(item);
               break;
         }
         NpcActor.setFlags();
      }
      if (devMode) {
         log.debug(item, options, userId);
         log.info(`Item ${item.name} deleted`);
      }
   });
}