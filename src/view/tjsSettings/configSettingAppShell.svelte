<svelte:options accessors={true} />

<script>
   import { getContext } from "svelte";
   import { TJSApplicationShell } from "#runtime/svelte/component/core";
   import { Timing } from "#runtime/util";
   import { TJSSettingsEdit } from "#standard/component";
   import SettingsFooter from "./SettingsFooter.svelte";
   import { sessionConstants } from "../../constants/settings";
   export let elementRoot;

   const { application } = getContext(`#external`);

   // Get a store that is synchronized with session storage.
   const stateStore = application.reactive.sessionStorage.getStore(sessionConstants);
</script>