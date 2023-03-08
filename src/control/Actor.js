export let getEncounters;
export let Encounters;
export let ActiveEncounters;
export let getActiveEncounters;
const combatants =

getEncounters = async () =>
{
   Encounters = await ui.combat.combats;
   console.log(Encounters);
};

getActiveEncounters = async () =>
{
   getEncounters.forEach((encounter) =>
   {
      if (encounter.isActive)
      {
         ActiveEncounters.push(encounter);
         console.log(ActiveEncounters);
         return ActiveEncounters;
      }
   });
};
/*
   export function getNPCGlobalActor() {

}*/
