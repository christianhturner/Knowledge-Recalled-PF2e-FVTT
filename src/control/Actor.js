


export let getEncounters;
export let Encounters;
export let ActiveEncounters;


export async function getActorFromID(actorID) {
   return await game.actors.get(actorID);
}


