

export let getEncounters;
import NPCGlobalActor from "../models/ActorModel.js";
export let Encounters;
export let ActiveEncounters;
export let getActiveEncounters;


// getEncounters = async () =>
// {
//    Encounters = await ui.combat.combats;
//    console.log(Encounters);
// };
//
// getActiveEncounters = async () =>
// {
//    getEncounters.forEach((encounter) =>
//    {
//       if (encounter.isActive)
//       {
//          ActiveEncounters.push(encounter);
//          console.log(ActiveEncounters);
//          return ActiveEncounters;
//       }
//    });
// };

export async function getActorFromID(actorID) {
   return await game.actors.get(actorID);
}


 export async function getNPCActorFromEncounters() {
    const encounters = await ui.combat.combats;
    const activeEncounter = encounters.find((encounter) => encounter.active === true);

    if (!activeEncounter) {
       console.log("No active encounter found.");
       return [];
    }

    const npcCombatants = activeEncounter.combatants.filter(
     (combatant) => combatant.actor.data.type === "npc"
    );

    const npcActors = [];

    for (const npcCombatant of npcCombatants) {
       const foundryNPC = npcCombatant.actor;
       const npcActor = createNPCActor(foundryNPC);
       npcActors.push(npcActor);
    }

    return npcActors;
 }

function createNPCActor(foundryNPC) {
   const npcActor = new NPCGlobalActor();

   npcActor.name.value = foundryNPC.name;
   npcActor.level = foundryNPC.data.details.level.value;
   npcActor.description.value = foundryNPC.data.details.biography.value;
   npcActor.actorImg = foundryNPC.img;
   npcActor.traits.value = foundryNPC.data.details.race.value;
   npcActor.armorClass.value = foundryNPC.data.attributes.ac.value;
   npcActor.armorClass.beforeDC = foundryNPC.data.attributes.dex.mod;
   npcActor.armorClass.afterDC = npcActor.armorClass.beforeDC;
   npcActor.fortitudeSave.value = foundryNPC.data.saves.fort.value;
   npcActor.fortitudeSave.beforeDC = foundryNPC.data.attributes.con.mod;
   npcActor.fortitudeSave.afterDC = npcActor.fortitudeSave.beforeDC;
   npcActor.reflexSave.value = foundryNPC.data.saves.ref.value;
   npcActor.reflexSave.beforeDC = foundryNPC.data.attributes.dex.mod;
   npcActor.reflexSave.afterDC = npcActor.reflexSave.beforeDC;
   npcActor.willSave.value = foundryNPC.data.saves.will.value;
   npcActor.willSave.beforeDC = foundryNPC.data.attributes.wis.mod;
   npcActor.willSave.afterDC = npcActor.willSave.beforeDC;
   npcActor.immunities.value = foundryNPC.data.traits.di.value;
   npcActor.resistances.value = foundryNPC.data.traits.dr.value;
   npcActor.weaknesses.value = foundryNPC.data.traits.dv.value;


   return npcActor;
}

function KnowledgeRecalledActorFactory(foundryNPC) {
   return new KnowledgeRecalledActor(foundryNPC);
}

/*
   export function getNPCGlobalActor() {

}*/
