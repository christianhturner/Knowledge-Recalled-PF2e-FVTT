<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from "#runtime/svelte/component/core";

   export let elementRoot;
</script>

<ApplicationShell bind:elementRoot>
   <main>
      <h1>Settings</h1>
   </main>
</ApplicationShell>

<style lang="scss">
   main {
      text-align: center;
      display: flex;
      flex-direction: column;
   }
</style>