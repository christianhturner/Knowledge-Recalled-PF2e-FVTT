<svelte:options accessors={true} />

<script>
   import { getContext } from "svelte";
   import { TJSApplicationShell } from "#runtime/svelte/component/core";
   import { Timing } from "#runtime/util";
   import { TJSSettingsEdit } from "#standard/component";
   import SettingsFooter from "./SettingsFooter.svelte";
   import { sessionConstants } from "../../constants/settings";

   import { krGameSettings } from "../../models/KRGameSettings";
   export let elementRoot;

   const { application } = getContext(`#external`);

   // Get a store that is synchronized with session storage.
   const stateStore = application.reactive.sessionStorage.getStore(sessionConstants);

   // Application position store reference. Stores need to be top level variables to be accessible for reactivity.
   const position = application.position;

   // A debounce callback that serializes application state after  500-ms delay
   const storePosition = Timing.debounce(() => ($stateStore = application.state.get()), 500);

   // Reactive statement to invoke debounce callback on Position change.
   $: storePosition($position);
</script>

<TJSApplicationShell bind:elementRoot>
   <TJSSettingsEdit settings={krGameSettings} options={{ storage: application.reactive.sessionStorage }}
   ></TJSSettingsEdit>
</TJSApplicationShell>
