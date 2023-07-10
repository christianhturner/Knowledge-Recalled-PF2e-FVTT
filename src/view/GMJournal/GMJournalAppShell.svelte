<script>
   import { flip }               from 'svelte/animate';

   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { TJSDocument }        from '@typhonjs-fvtt/runtime/svelte/store';

   import { rippleFocus }        from '@typhonjs-fvtt/svelte-standard/action';
   import { TJSInput }           from '@typhonjs-fvtt/svelte-standard/component';
   import { createFilterQuery }  from '@typhonjs-fvtt/svelte-standard/store';
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