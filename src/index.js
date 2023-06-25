import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import KnowledgeRecalled from "./models/knowledgeRecalled.js";
import NPCFlagsManager from "./models/NPCValueProcessor.js";
import { initializeFlags, updateFlags } from "./control/data.js";
import NPCValueProcessor from "./models/NPCValueProcessor.js";
import NPCModel from "./models/NPCModel.js";
import { isEqual } from 'lodash';



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
      console.log('begin initNPCModel');

      initNPCModel(actor).then((r) => console.log(r));

      console.log('end initNPCModel');
   }
});
Hooks.on("updateActor", async (actor, updateData) => {
   // Check if the update is relevant to the NPC flags
   console.log("updateData", updateData);
   console.log("actor", actor);

   if (updateData)
   {
      // Call the function to update the NPC model flags
      await updateNPCModelFlags(actor, updateData);
   }
});

// Function to update the NPC model flags
async function updateNPCModelFlags(actor, updateData) {
   // Access the updated flags from the updateData object
   console.log("updateData", updateData);

   try {
      const existingFlags = actor.getFlag("fvtt-knowledge-recalled-pf2e", "npcFlags");
      if (existingFlags) {
         // Exclude visibility properties from the existingFlags object

         const updatedFlags = Object.entries(existingFlags).reduce((flags, [key, value]) => {
            if (!key.endsWith(".visibility")) {
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

         updatedFlags.armorClass.value = actor.attributes.ac.base;
         updatedFlags.fortSave.value = actor.saves.fortitude.dc.value;
         updatedFlags.refSave.value = actor.saves.reflex.dc.value;
         updatedFlags.willSave.value = actor.saves.will.dc.value;
         // Repopulate other values as needed...

         if (!isEqual(existingFlags, updatedFlags)) {
            await actor.setFlag("fvtt-knowledge-recalled-pf2e", "npcFlags", updatedFlags);
            console.log("Flags updated:", updatedFlags);
         } else {
            console.log("Flags have not changed. Skipping update.");
         }
      } else {
         console.log("No existing flags found. Initializing flags...");
         // Initialize flags if necessary
         // ...
      }
   } catch (error) {
      console.error("Error updating NPC flags:", error);
   }
}



async function initNPCModel(actor)
{
   try
   {
      const KRNPC = new NPCModel(actor);
      console.log("Knowledge Recalled NPC: ", KRNPC);
      KRNPC.processValues();
      console.log("Knowledge Recalled NPC: ", KRNPC);
   }
   catch (error)
   {
      console.error("Error initializing NPCModel: ", error);
   }
}

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


