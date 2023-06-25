<script>
   import {SvelteApplication, TJSDialog as TSJDialog} from "@typhonjs-fvtt/runtime/svelte/application";
   import {getContext} from "svelte";
   import {ApplicationShell} from "@typhonjs-fvtt/runtime/svelte/component/core";
   import {scale} from "svelte/transition";
   import {arrayOfNPCs} from "../../index.js";

   export let elementRoot = void 0;
   export let message = void 0;

   const npc = arrayOfNPCs[0];

   const application = getContext('#external').application;

   let draggable = application.reactive.draggable;

   $: application.reactive.draggable = draggable;

   const storeMinimizable = application.reactive.storeAppOptions.minimizable;
   const storeResizable = application.reactive.storeAppOptions.resizable;
   const storeTitle = application.reactive.storeAppOptions.title;

   async function onClick()
   {
      /**
       * TJSDialog.prompt returns true when the button is selected or null if the dialog is closed without user selection.
       *
       * @type {boolean|null}
       */
      const result = await TSJDialog.prompt({
         title: 'Test Dialog',
         draggable: false,
         modal: true,
         content: 'A cool modal dialog',
         label: 'OK',
      }, { classes: ["tjs-essential-svelte-esm"] });
   }

</script>
<svelte:options accessors={true} />
<ApplicationShell bind:elementRoot transition={scale} transitionOptions={{duration: 1000}}>
<h1>{npc.flags.name}</h1>
   <div class="container">
   <h2>Stats</h2>
      {#each Object.entries(npc.flags.lowestSave.lowestSaveValue) as [key, value]}
         <label>
            <span>{key}</span>
            <input type="number" value={value} />
         </label>
      {/each}
   </div>
</ApplicationShell>


<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
      button, div.bottom {
         margin-top: auto;
      }
      div.container {
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 10px;
         border: 2px solid rgba(0, 0, 0, 0.2);
         padding: 10px;
         margin-top: auto;
      }
      h1 {
         color: #ff3e00;
         text-transform: uppercase;
         font-size: 4em;
         font-weight: 100;
      }
      label {
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
</style>