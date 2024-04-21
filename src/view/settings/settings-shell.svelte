<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from "#runtime/svelte/component/core";
   import { getContext } from "svelte";
   import { getSetting, setSetting } from "../../control/utilities.js";
   import { localize } from "#runtime/svelte/helper";

   const { application } = getContext("#external");

   export let elementRoot;
   let form;

   export let settings = {};
   let userCanChangeSettings = game.user.hasPermssion("SETTINGS_MODIFY");

   getSettings();

   function getSettings() {
      settings = Object.fromEntries(
         Object.entries(SETTINGS.GET_DEFAULT()).map((entry) => {
            entry[1].value = getSetting(entry[0]);
         }),
      );
   }

   async function updateSettings() {
      let settingsToUpdate = Object.entries(settings).filter(
         (entry) => userCanChangeSettings || entry[1].scope === "client",
      );
      for (let [key, setting] of settingsToUpdate) {
         await setSetting(key, setting.value);
      }
      application.close();
   }
</script>

<ApplicationShell bind:elementRoot>
   <form autocomplete="off" bind:this={form} on:submit|once|preventDefault={updateSettings}>
      <h2 style="text-align: center; margin-bottom: 1rem;">
         {localize("KNOWLEDGE-RECALLED.APPLICATIONS.SETTINGS.title")}
      </h2>
   </form>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
</style>
