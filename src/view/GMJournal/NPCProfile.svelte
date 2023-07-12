<script>
import {setContext} from "svelte";
import {TJSDocument} from "#runtime/svelte/store/fvtt/document";


let elementRoot
let module = ui.knowledgeRecalled;
let npcArray = module?.npcActors;
let selectedNPC = npcArray ? npcArray[-1] : null;

const doc = TJSDocument;
// let actor = doc.
// function updateSelectedActor(actor) {
//    selectedNPC = actor;
//    setContext('selectedNPC', selectedNPC);
// }
</script>
<h1>Hello and Test</h1>

<!--      {#if npcArray}-->
<!--         {#each npcArray as npc}-->
<!--            <button on:click={() => updateSelectedActor(npc)}>{npc.name}</button>-->
<!--         {/each}-->

<!--         <h2> Selected Actor: {selectedNPC.flags.name}</h2>-->
<!--            <p> Actor Data: {selectedNPC.flags.defaultDC}</p>-->
<!--      {/if}-->