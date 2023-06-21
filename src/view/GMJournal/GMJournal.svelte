<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import {arrayOfNPCs} from "../../index.js";

   export let elementRoot;

</script>

<!-- This is necessary for Svelte to generate accessors TRL can access for `elementRoot` -->
<svelte:options accessors={true}/>

<!-- ApplicationShell provides the popOut / application shell frame, header bar, content areas -->
<!-- ApplicationShell exports `elementRoot` which is the outer application shell element -->

<!--
Create a new ApplicationShell that will render the contents of NPCArray located in the GMJournal.js file
This should provide the ability to list all of the NPC data which can be located inside of the NPCModel.js file
-->
<ApplicationShell elementRoot={elementRoot} NPCToRender={arrayOfNPCs[0]} />
<!-- Data to render here -->
<main>
   <textarea id="textBox" bind:value={JSON.stringify(arrayOfNPCs, null, 2)}></textarea>
</main>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
   #textBox {
      width: 100%;
      height: 150px;
   }
</style>