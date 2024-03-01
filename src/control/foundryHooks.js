import { insertKnowledgeRecalledbuttons } from "../foundryUiOverrides";
import { KnowledgeRecalled } from "../KnowledgeRecalled";
import { ViewManager } from "./ViewManager";
import { EncounterManager } from "./EncounterManager";
import { NPCManager } from "./NPCManager";
import { NPCModel } from "../models/NPCModel";
import { checkForExistingActor } from "./utilities";
import { SetupDebugger } from "../Debugger";

// Parameter should be able to be checked within the module settings.
let devMode = true;


export async function registerHooks() {
   Hooks.on("ready", () => {
      KnowledgeRecalled._onReady();
      //ViewManager._onReady();
      //ui.KnowledgeRecalled.ViewManager.init();
      NPCManager._onReady();
      EncounterManager._onReady();
   });

   Hooks.once('debugger.ready', () =>
      new SetupDebugger(devMode)
   );

   Hooks.on('getSceneControlButtons', (controls) => {
      insertKnowledgeRecalledbuttons(controls);
   });
   Hooks.on('closeApplication', (app, html) => {
      console.log(`Here is the application`, app);
      console.log(`Here is the html`, html);
   });

   Hooks.on('createActor', (actor, changes, userId) => {
      checkForExistingActor(actor);
   });
   // Hook will be used for updating the data between actor document and the NPCModel flag store
   Hooks.on('updateActor', (actor, changes) => {
      if (!changes) {
         console.debug("No changes occured.")
      };
      console.log("Knowledge Recalled Update Actor", actor, changes);
   });

   Hooks.on('createCombat', (encounter, changes) => {
      ui.KnowledgeRecalled.EncounterManager.updateEncounters();
      console.debug('Knowledge Recalled create combat.', encounter, changes);
   });

   Hooks.on('deleteCombat', (encounter, changes) => {
      ui.KnowledgeRecalled.EncounterManager.updateEncounters();
      console.debug('Knowledge Recalled delete combat.', encounter, changes);
   });

   Hooks.on('updateCombat', (encounter, changes) => {
      ui.KnowledgeRecalled.EncounterManager.updateEncounters();
      console.debug('Knowledge Recalled update combat.', encounter, changes);
   });

   Hooks.on('combatStart', (round, turn) => {
      ui.KnowledgeRecalled.EncounterManager.updateEncounters();
      console.debug('Knowledge recalled combat start.', round, turn);
   });

   // See combatTurn to see more advanced eents if and when needed

   Hooks.on('createItem', (item, options, userId) => {
      /*
      * We may instead want to do something like this:
      * const item = item; so we can pass into the constructAbilitiesFlags
      * const actorId = get this from the item
      * We can then const actor = NPCManager.GetActor(actorId); returns NPCModel
      * actor.constructAbilitiesFlags(item); Then we can more safely inject this into the model
      */

      const actorOwner = item.parent;
      if (actorOwner.type == 'npc') {
         const actorId = actorOwner.id;
         const NpcActor = ui.KnowledgeRecalled.NPCManager.createNPCObject(actorId);
         NpcActor.constructAbilitiesFlags(item);

      }

      // TODO: 
      // - Add this value to the flags for new items on create
      // - create method for deleting from flag
      // - Create method for updating and preserving portions of the data that shouldn't change as long
      // as the ID remains the same.
   });

   Hooks.on('updateItem', (item, options, userId) => {
      const actorOwner = item.parent;
      if (actorOwner.type == 'npc') {
         const actorId = actorOwner.id;
         const NpcActor = ui.KnowledgeRecalled.NPCManager.createNPCObject(actorId);
         NpcActor.updateAttacksFlags(item);
      }
      console.debug(`Item ${item.name} created`)

   });

   Hooks.on('deleteItem', (item, options, userId) => {
      console.debug(`Item ${item.name} deleted`)
   });


};