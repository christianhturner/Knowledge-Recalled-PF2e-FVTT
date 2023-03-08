<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import {backupData} from "./GMJournal.js";
   import { createBackupFile, createInitBackupStore } from "../../control/dataManager.js";

   export let elementRoot;
</script>

<!-- This is necessary for Svelte to generate accessors TRL can access for `elementRoot` -->
<svelte:options accessors={true}/>

<!-- ApplicationShell provides the popOut / application shell frame, header bar, content areas -->
<!-- ApplicationShell exports `elementRoot` which is the outer application shell element -->
<ApplicationShell bind:elementRoot>
   <main>
      <h1>This is a test</h1>
      <!-- create backup file button -->
      <button on:click={() => createBackupFile(backupData)}>Create Backup File</button>
      <button on:click={() => createInitBackupStore()}>Initialize Stores</button>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
</style>