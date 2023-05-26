import GMJournalApplication from "./view/GMJournal/GMJournal.js";
import KRActor from "./models/knowledgeRecalledDataModel.js";
import KnowledgeRecalled from "./models/knowledgeRecalled.js";

console.log("loading knowledge recalled");
Hooks.on("init", () =>
{
   Object.assign(CONFIG.Actors.dataModels, {
      KRNPC: KRActor
   });
   console.log("appending to CONFIG.Actor.dataModels");
});

Hooks.once('ready', () => new GMJournalApplication().render(true, { focus: true }));
Hooks.once('ready', () => console.log("test!!!!!"));

Hooks.on("ready", () =>
{
   const listOfFoundryActors = getNPCActorsFromEncounters();
   KnowledgeRecalled._onReady(listOfFoundryActors);
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