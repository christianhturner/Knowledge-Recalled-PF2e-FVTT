<script>
    import { setContext } from "svelte";
    import { TJSDocument } from "#runtime/svelte/store/fvtt/document";

    //   let module = ui.knowledgeRecalled;
    //  let npcArray = module?.npcActors;
    // let selectedNPC = npcArray ? npcArray[-1] : null;
    //   let selectedNPC = npcArray[0];
    console.log("KnowledgeRecalled: ", module, npcArray, selectedNPC);

    const doc = TJSDocument;

    function updateSelectedActor(actor) {
        selectedNPC = doc(actor).embed.get();
        setContext("selectedNPC", selectedNPC);
    }
</script>

<h1>Hello and Test</h1>

{#if $npcArray}--> // {#each $npcArray as npc}--> // <button
            on:click={() => updateSelectedActor(npc)}>{npc.name}</button
        >--> //
    {/each}-->

    <h2>Selected Actor: {$selectedNPC.flags.name}</h2>
    -->
    <p>Actor Data: {$selectedNPC.flags.defaultDC}</p>
    -->
{:else}
    <p>No NPCs Found</p>
{/if}
