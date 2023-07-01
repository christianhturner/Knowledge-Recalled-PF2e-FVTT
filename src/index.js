import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import KnowledgeRecalled from "./models/knowledgeRecalled.js";
import NPCFlagsManager from "./models/NPCValueProcessor.js";
import { initializeFlags, updateFlags } from "./control/data.js";
import NPCValueProcessor from "./models/NPCValueProcessor.js";
import NPCModel from "./models/NPCModel.js";
import { isEqual } from 'lodash';



//const npcActors = [];

KnowledgeRecalled._onReady();

// Remove for production
const isDev = true;
Hooks.once("init", () =>
{
   CONFIG.debug.hooks = isDev;
});



Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));

Hooks.on("ready", () =>
{
   getActiveEncounters();


});

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

   for (const element of activeEncounters)
   {
      addNPCtoKnowledgeRecalledEncounters(element);
   }

}

/**
 *
 */
function addNPCtoKnowledgeRecalledEncounters(encounter)
{
   const npcCombatants = encounter.turns;
   npcCombatants.forEach((actor) => 
   {
      const newActor = game.actors.get(actor.actorId);
      ui.KnowledgeRecalled.addToEncounteredActorArray(newActor);
   });
}

Hooks.on('createActor', (actor, options, userId) =>
{
   // Check if the actor is an NPC
   if (actor.type === 'npc')
   {
      initNPCModel(actor).then((r) => console.log(r));
   }
});

/**
 *
 */
function initNPCModel(actor)
{
   try
   {
      const KnowledgeRecalledNPCActors = new NPCModel(actor);
      KnowledgeRecalledNPCActors.processValues();
      ui.KnowledgeRecalled.addToNPCActorArray(KnowledgeRecalledNPCActors);
   }
   catch (error)
   {
      console.error("Error initializing NPCModel: ", error);
   }
}

Hooks.on("updateActor", async (actor, updatedData) =>
{
   // Check if the update is relevant to the NPC flags
   if (updatedData)
   {
      await updateNPCModelFlags(actor, updatedData);
   }
});

// Function to update the NPC model flags
async function updateNPCModelFlags(actor, updatedData)
{
   // Access the updated flags from the updateData object

   try
   {
      const existingFlags = actor.getFlag("fvtt-knowledge-recalled-pf2e", "npcFlags");
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

         updatedFlags.armorClass.value = actor.attributes.ac.base;
         updatedFlags.fortSave.value = actor.saves.fortitude.dc.value;
         updatedFlags.refSave.value = actor.saves.reflex.dc.value;
         updatedFlags.willSave.value = actor.saves.will.dc.value;
         // Repopulate other values as needed...

         if (!isEqual(existingFlags, updatedFlags))
         {
            await actor.setFlag("fvtt-knowledge-recalled-pf2e", "npcFlags", updatedFlags);
            console.log("Flags updated:", updatedFlags);
         }
         else
         {
            console.log("Flags have not changed. Skipping update.");
         }
      }
      else
      {
         console.log("No existing flags found. Initializing flags...");
         // Initialize flags if necessary
         // ...
      }
   }
   catch (error)
   {
      console.error("Error updating NPC flags:", error);
   }
}




