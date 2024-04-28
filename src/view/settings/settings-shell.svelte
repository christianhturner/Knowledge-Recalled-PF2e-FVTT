<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from "#runtime/svelte/component/core";
   import { getContext } from "svelte";
   import { getSetting, setSetting } from "../../control/utilities.js";
   import { localize } from "#runtime/svelte/helper";
   import Setting from "./Setting.svelte";
   import { SETTINGS } from "../../constants/settings.js";
   import { log } from "../../lib/debugger.js";

   const { application } = getContext("#external");

   export let elementRoot;
   let form;

   export let settings = {};
   // FIXME: error stating this is not a function.
   let userCanChangeSettings = game.user.hasPermission("SETTINGS_MODIFY");

   getSettings();

   function getSettings() {
      try {
         settings = Object.fromEntries(
            Object.entries(SETTINGS.GET_DEFAULT()).map((entry) => {
               log.debug(entry);
               entry[1].value = getSetting(entry[0]);
               return entry;
            }),
         );
      } catch (error) {
         log.catchError(`Error at view/settings/settings-shell.svelte at line 31`, error, settings);
      }
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

   function requestSubmit() {
      form.requestSubmit();
   }

   let tabs = [
      {
         value: "local",
         label: localize("KNOWLEDGE-RECALLED.APPLICATIONS.SETTINGS.local"),
      },
   ];

   let activeTab = application?.options?.tab ?? tabs[0].value;

   // TODO:
   // inspiration - https://github.com/fantasycalendar/FoundryVTT-ItemPiles/blob/master/src/applications/settings-app/settings-shell.svelte
</script>

<ApplicationShell bind:elementRoot>
   <!-- <h2>Settings Test</h2> -->
   <form autocomplete="off" bind:this={form} on:submit|once|preventDefault={updateSettings}>
      <h2 style="text-align: center; margin-bottom: 1rem;">
         {localize("KNOWLEDGE-RECALLED.APPLICATIONS.SETTINGS.title")}
      </h2>
      <section class="tab-body">
         <div class="tab flex" class:active={activeTab === "local"} data-scope="primary" data-tab="local">
            <Setting bind:data={settings[SETTINGS.DEBUG]} key={SETTINGS.DEBUG} />
         </div>
      </section>
      <footer>
         <button on:click|once={requestSubmit} type="button">
            <i class="far fa-save"></i>
            {localize("KNOWLEDGE-RECALLED.APPLICATIONS.SETTINGS.submit")}
         </button>
      </footer>
   </form>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
</style>
