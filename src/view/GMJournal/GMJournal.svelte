<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import {
      POSTBackup,
      createInitBackupStore,
      fetchBackupFile
   } from "../../API/dataManager.js";

   export let elementRoot;
   const dataForTesting = {
      "test": "test",
      "test2": "test2"
   };

</script>

<!-- This is necessary for Svelte to generate accessors TRL can access for `elementRoot` -->
<svelte:options accessors={true}/>

<!-- ApplicationShell provides the popOut / application shell frame, header bar, content areas -->
<!-- ApplicationShell exports `elementRoot` which is the outer application shell element -->
<ApplicationShell bind:elementRoot>
   <main>
      <h1>This is a test</h1>
      <!-- create backup file button -->
      <button on:click={() => createInitBackupStore()}>Initialize Stores</button>
      <!-- text field for creating a data value to pass into back -->
      <!-- <input id="textBox" type="text" bind:value={cutomBackupData} /> -->
      <button on:click={() => fetchBackupFile()}>Fetch Backup</button>
      <button on:click={() => POSTBackup(dataForTesting)}>CreateBackup</button>

   </main>
</ApplicationShell>

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