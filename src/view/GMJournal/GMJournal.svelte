<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { grabFile } from "./GMJournal.js";
   import {
      POSTBackup,
      createInitBackupStore,
      fetchFile,
      fetchIndexedBackupFiles, findCurrentWorldIDIndex
   } from "../../API/dataManager.js";

   export let elementRoot;
let testBackupData
let backupData
function updateBackupData() {
   if(testBackupData !== undefined) {
      console.log("setting Test Data to backupData")
      testBackupData = backupData
   } else {
      console.log("testBackupData is undefined")
   }
}

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
      <button on:click={() => fetchFile(FILES.moduleDataDirectory, "backup-manager.json")}>Fetch File</button>
      <button on:click={() => fetchIndexedBackupFiles()}>Fetch Backup</button>
      <h2>{testBackupData}</h2>
      <input id="textBox" type="text" bind:value={testBackupData} />
      <input id="submit" type="submit" value="Submit" on:click={() => updateBackupData} />
      <button on:click={() => POSTBackup(backupData)}>Create Backup</button>
      <button on:click={() => findCurrentWorldIDIndex()}>Find ID</button>

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