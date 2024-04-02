import { foundryUiOverrides } from "../foundryUiOverrides";
import { checkForExistingActor } from "./utilities";
import { SetupDebugger } from "../Debugger";
import { API } from "../API/api";
import { CONSTANTS } from "../constants/constants";

/** @type {import('../API/api').API} */
let Api;

/** @type {import('../Debugger').SetupDebugger} */
let Debug;

// Parameter should be able to be checked within the module settings.
let devMode = true;

/**
 *
 */
export async function registerHooks() {
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
      Hooks.on("debugger.ready", () => {
         const moduleData = game.modules.get(CONSTANTS.moduleId);
         moduleData.debugger = new SetupDebugger(devMode);
         Debug = moduleData.debugger;
      });
      // -- Quench - testing framework
      Hooks.on(
         "quenchReady",
         (/**@type {import('../../node_modules/@ethaks/fvtt-quench/lib/quench.d.ts').Quench}*/ quench) => {},
      );
   }

   Hooks.on("getSceneControlButtons", (controls) => {
      Api.viewManager.init();
      foundryUiOverrides.insertKnowledgeRecalledbuttons(controls);
   });
   Hooks.on("closeApplication", (app, html) => {
      console.log(`Here is the application`, app);
      console.log(`Here is the html`, html);
   });

   Hooks.on("createActor", (actor, changes, userId) => {
      checkForExistingActor(actor);
   });
   // Hook will be used for updating the data between actor document and the NPCModel flag store
   Hooks.on("updateActor", (actor, changes) => {
      if (!changes) {
         console.debug("No changes occured.");
      }
      console.log("Knowledge Recalled Update Actor", actor, changes);
   });

   Hooks.on("createCombat", (encounter, changes) => {
      Api.encounterManager.updateEncounters();
      console.debug("Knowledge Recalled create combat.", encounter, changes);
   });

   Hooks.on("deleteCombat", (encounter, changes) => {
      Api.encounterManager.updateEncounters();
      console.debug("Knowledge Recalled delete combat.", encounter, changes);
   });

   Hooks.on("updateCombat", (encounter, changes) => {
      Api.encoutnerManager.updateEncounters();
      console.debug("Knowledge Recalled update combat.", encounter, changes);
   });

   Hooks.on("combatStart", (round, turn) => {
      Api.encounterManager.updateEncounters();
      console.debug("Knowledge recalled combat start.", round, turn);
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
      if (actorOwner.type == "npc") {
         const actorId = actorOwner.id;
         const NpcActor = Api.npcManager.createNPCObject(actorId);
         NpcActor.constructAbilitiesFlags(item);
      }

      // TODO:
      // - Add this value to the flags for new items on create
      // - create method for deleting from flag
      // - Create method for updating and preserving portions of the data that shouldn't change as long
      // as the ID remains the same.
   });

   Hooks.on("updateItem", (item, options, userId) => {
      const actorOwner = item.parent;
      if (actorOwner.type == "npc") {
         const actorId = actorOwner.id;
         const NpcActor = Api.npcManager.createNPCObject(actorId);
         NpcActor.updateAttacksFlags(item);
      }
      console.debug(`Item ${item.name} created`);
   });

   Hooks.on("deleteItem", (item, options, userId) => {
      console.debug(`Item ${item.name} deleted`);
   });
}
