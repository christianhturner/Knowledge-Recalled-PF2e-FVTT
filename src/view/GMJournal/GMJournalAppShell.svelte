<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import {getContext, setContext} from "svelte";
   import NPCProfile from "./NPCProfile.svelte";

   const { application } = getContext("#external");
   export let elementRoot = void 0;

</script>
<svelte:options accessors={true} />
<ApplicationShell bind:elementRoot>
   <div>
   <NPCProfile />
   </div>
</ApplicationShell>


<style>
   div {
      width: 100%;
      height: 100%;
   }
</style>