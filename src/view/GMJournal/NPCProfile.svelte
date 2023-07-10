<script>
import {setContext} from "svelte";


let elementRoot
let module = ui.knowledgeRecalled;
let npcArray = module?.npcActors;
let selectedNPC = npcArray ? npcArray[-1] : null;

function updateSelectedActor(actor) {
   selectedNPC = actor;
   setContext('selectedNPC', selectedNPC);
}
</script>


      {#if npcArray}
         {#each npcArray as npc}
            <button on:click={() => updateSelectedActor(npc)}>{npc.name}</button>
         {/each}

         <h2> Selected Actor: {selectedNPC.flags.name}</h2>
            <p> Actor Data: {selectedNPC.flags.defaultDC}</p>
      {/if}