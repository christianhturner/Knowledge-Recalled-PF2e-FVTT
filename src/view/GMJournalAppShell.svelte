<!-- This is necessary for Svelte to generate accessors TRL can access for `elementRoot` -->
<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from "#runtime/svelte/component/core";
   import { log } from "../lib/debugger";
   import { EncounterManager } from "../control/EncounterManager";
   import { NPCManager } from "../control/NPCManager";
   import { TJSDocument } from "#runtime/svelte/store/fvtt/document";
   export let elementRoot;

   /**
    * @typedef Encounter
    * @prop {number} round - The numerical round the encounter is on
    *
    * @prop {number} sort - FIXME: NOT SURE
    *
    * @prop {null|number} turn - the turn within the round the encounter is on
    *
    * @prop {object[]} turns - an array of actor documents
    *
    * @prop {object} combatant - actor document whose active turn it is
    */

   const encounterManager = new EncounterManager();
   log.log(encounterManager.listCurrentEncounter()); //TODO: remove

   /**
    * @function
    * @param {Encounter} encounter
    * @returns {object[]} - TODO: May be an Array of Arrays
    */
   function actorsFromEncounter(encounter) {
      const combatants = encounter.contents[0].turns; // TODO: optimize the encounter so that we can simply call
      // encounter.turns
      const npcManager = new NPCManager();
      const npcArray = [];
      combatants.forEach((combatants) => {
         const npc = npcManager.createNPCObject(combatants.actorId);
         npcArray.push(new TJSDocument(npc.actor)); // TODO: think through TJSDOCUMENT
      });
      return npcArray;
   }
   log.log(actorsFromEncounter(encounterManager.listAllEncounters()));
</script>

<!-- ApplicationShell provides the popOut / application shell frame, header bar, content areas -->
<!-- ApplicationShell exports `elementRoot` which is the outer application shell element -->
<ApplicationShell bind:elementRoot>
   <main>
      <h1>Basic application</h1>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
</style>
