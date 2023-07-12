<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import {getContext, setContext} from "svelte";
   import NPCProfile from "./NPCProfile.svelte";

   const { application } = getContext("#external");
   let elementRoot;

</script>
<svelte:options accessors={true} />
<ApplicationShell bind:elementRoot>
   <NPCProfile />
</ApplicationShell>


<style>

</style>