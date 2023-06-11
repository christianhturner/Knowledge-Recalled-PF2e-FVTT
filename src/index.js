import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import KnowledgeRecalled from "./models/knowledgeRecalled.js";
import NPCFlagsManager from "./models/NPCValueProcessor.js";
import { initializeFlags, updateFlags } from "./control/data.js";
import NPCValueProcessor from "./models/NPCValueProcessor.js";
import NPCModel from "./models/NPCModel.js";

console.log("loading knowledge recalled");
const npcActors = [];

// Remove for production
const isDev = true;
Hooks.once("init", () =>
{
   CONFIG.debug.hooks = isDev;
});


Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));

Hooks.on("ready", () =>
{
   console.log("KnowledgeRecalled Activity ");
   const activeEncounters = getActiveEncounters();
   console.log("activeEncounters: ", activeEncounters);
   console.log("npcActors: ", npcActors);
   for (const element of activeEncounters)
   {
      addNPCtoGlobalArray(element);
   }
   KnowledgeRecalled._onReady(npcActors);
   const KnowledgeRecalledActors = KnowledgeRecalled.getActors();
   console.log("KnowledgeRecalledActors: ", KnowledgeRecalledActors);
});

Hooks.on('createActor', (actor, options, userId) =>
{
   // Check if the actor is an NPC
   if (actor.type === 'npc')
   {

      initNPCModel(actor).then((r) => console.log(r));


   }
});

async function initNPCModel(actor)
{
   try
   {
      const KRNPC = await new NPCModel(actor);
      console.log("Knowledge Recalled NPC: ", KRNPC);
      KRNPC.processValues();
      console.log("Knowledge Recalled NPC: ", KRNPC);
   }
   catch (error)
   {
      console.error("Error initializing NPCModel: ", error);
   }
}
async function updateNPCModelFlags(actor)
{
   try
   {
      const KRNPC = await new NPCModel(actor);
      await KRNPC.checkForChangesOnUpdate(actor);
      KRNPC.processValues();
      console.log("Knowledge Recalled NPC: ", KRNPC);
   }
   catch (error)
   {
      console.error("Error initializing NPCModel: ", error);
   }


   /*Hooks.on('updateActor', (actor, options, userId) =>
   {
      // Check if the actor is an NPC
      if (actor.type === 'npc')
      {
         updateNPCModelFlags(actor).then((r) => console.log(r));
      }
   });*/


   function getActiveEncounters()
   {
      const encounters = game.combats.combats;
      let activeEncounters = [];
      activeEncounters = encounters.filter((encounter) => encounter.active === true);
      if (!activeEncounters)
      {
         console.log("No active encounter found.");
         return [];
      }
      return activeEncounters;
   }

   async function addNPCtoGlobalArray(encounter)
   {
      const npcCombatants = encounter.turns;
      npcCombatants.forEach((actor) =>
      {
         if (
          !npcActors.find((npcActor) =>
          {
             return npcActor.actorId === actor.actorId;
          }) &&
          actor.isNPC === true
         )
         {
            const newActor = game.actors.get(actor.actorId);
            npcActors.push(newActor);
         }
      });
   }
}

