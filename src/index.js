import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import KRActor from "./models/knowledgeRecalledDataModel.js";
import KnowledgeRecalled from "./models/knowledgeRecalled.js";

console.log("loading knowledge recalled");
const npcActors = [];


Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));

Hooks.on("ready", () =>
{
   console.log("test");
   const activeEncounters = getActiveEncounters();
   console.log("activeEncounters: ", activeEncounters);
   console.log("npcActors: ", npcActors);
   for (let npcIndex = 0; npcIndex < activeEncounters.length; npcIndex++)
   {
      addNPCtoGlobalArray(activeEncounters[npcIndex]);
   }
   console.log("npcActors: ", npcActors);
   KnowledgeRecalled._onReady(npcActors);
});

/**
 *
 */
async function getNPCActorsFromEncounters()
{
   const encounters = await game.combats.turns;
   const activeEncounter = encounters.find((encounter) => encounter.active === true);

   if (!activeEncounter)
   {
      console.log("No active encounter found.");
      return [];
   }

   const npcCombatants = activeEncounter.filter(
    (combatant) => combatant.actor.data.type === "npc"
   );

   const npcActors = [];

   for (const npcCombatant of npcCombatants)
   {
      const foundryNPC = npcCombatant.actor;
      npcActors.push(foundryNPC);
   }

   return npcActors;
}